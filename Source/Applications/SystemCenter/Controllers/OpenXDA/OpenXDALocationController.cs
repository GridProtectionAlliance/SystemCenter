//******************************************************************************************************
//  Meters.cs - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  08/26/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Transactions;
using System.Web;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using GSF.Reflection;
using GSF.Web.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using SystemCenter.Model;
using Setting = SystemCenter.Model.Setting;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/ByLocation")]
    public class ByLocationController : DetailedLocationController<DetailedLocation> {
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {

                        DetailedLocation newRecord = record.ToObject<DetailedLocation>();
                        Location location = new Location() { 
                            Alias = newRecord.Alias,
                            Name = newRecord.Name,
                            LocationKey = newRecord.LocationKey,
                            Latitude = newRecord.Latitude,
                            Longitude = newRecord.Longitude,
                            Description = newRecord.Description,
                            ShortName = newRecord.ShortName
                        };
                        int result = new TableOperations<Location>(connection).AddNewRecord(location);

                        return Ok(result);
                    }
                }
                else
                {
                    return Unauthorized();
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost, Route("RetrieveExternalRecord")]
        public IHttpActionResult RetrieveExternalRecord([FromBody] JObject query)
        {
            if (!PostAuthCheck())
                return Unauthorized();
            try
            {
                using (AdoDataConnection xdaConnection = new AdoDataConnection(Connection))
                    return Ok(ExternalModelController<DetailedAsset>.ExecuteExternalQuery(query, xdaConnection));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }





    [RoutePrefix("api/OpenXDA/Location")]
    public class OpenXDALocationController : ModelController<Location>
    {
        [HttpPost, Route("SearchableListIncludingMeter")]
        public IHttpActionResult GetMetersUsingSearchableList([FromBody] PostData searches)
        {

            if (!AllowSearch || (GetRoles != string.Empty && !User.IsInRole(GetRoles)))
                return Unauthorized();

            try
            {

                string whereClause = BuildWhereClause(searches.Searches, new List<object>());


                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    string addtionalFieldTableName = TableOperations<AdditionalField>.GetTableName();
                    string addtionalFieldValueTableName = TableOperations<AdditionalFieldValue>.GetTableName();

                    string meterTableName = TableOperations<Meter>.GetTableName();
                    string locationTableName = TableOperations<Location>.GetTableName();
                    string assetTableName = TableOperations<Asset>.GetTableName();
                    string assetLocationTableName = TableOperations<AssetLocation>.GetTableName();

                    string view = $@"
                    SELECT
                        DISTINCT
                        l.ID,
	                    l.LocationKey,
	                    l.Name,
	                    COUNT(DISTINCT m.ID) as Meters,
	                    COUNT(DISTINCT al.AssetID) as Assets
                    FROM
                        {locationTableName} as l LEFT JOIN
                        {meterTableName} as m ON l.ID = m.LocationID LEFT JOIN
                        {assetLocationTableName} as al ON l.ID = al.LocationID LEFT JOIN
                        {assetTableName} as a ON al.AssetID = a.ID
                    GROUP BY
                        l.ID,
	                    l.LocationKey,
	                    l.Name
                    ";

                    string sql = "";

                    sql = $@"
                        DECLARE @PivotColumns NVARCHAR(MAX) = N''

                        SELECT @PivotColumns = @PivotColumns + '[AFV_' + t.FieldName + '],'
                            FROM (Select DISTINCT FieldName FROM {addtionalFieldTableName} WHERE ParentTable = 'Location') AS t


                        DECLARE @SQLStatement NVARCHAR(MAX) = N''
                        
                        IF @PivotColumns != ''
                            SET @SQLStatement = N'
                            SELECT * INTO #Tbl FROM (
                            SELECT 
                                M.*,
                                (CONCAT(''AFV_'',af.FieldName)) AS FieldName,
	                            afv.Value
                            FROM ({view.Replace("'", "''")}) M LEFT JOIN 
                                {addtionalFieldTableName} af on af.ParentTable = ''Location'' LEFT JOIN
	                            {addtionalFieldValueTableName} afv ON m.ID = afv.ParentTableID AND af.ID = afv.AdditionalFieldID
                            ) as T PIVOT (
                                Max(T.Value) FOR T.FieldName IN ('+ SUBSTRING(@PivotColumns,0, LEN(@PivotColumns)) + ')) AS PVT
                            {whereClause.Replace("'", "''")}
                            ORDER BY { searches.OrderBy} {(searches.Ascending ? "ASC" : "DESC")};

                            DECLARE @NoNPivotColumns NVARCHAR(MAX) = N''''
                                SELECT @NoNPivotColumns = @NoNPivotColumns + ''[''+ name + ''],''
                                    FROM tempdb.sys.columns WHERE  object_id = Object_id(''tempdb..#Tbl'') AND name NOT LIKE ''AFV%''; 
		                    DECLARE @CleanSQL NVARCHAR(MAX) = N''SELECT '' + SUBSTRING(@NoNPivotColumns,0, LEN(@NoNPivotColumns)) + ''FROM #Tbl''

		                    exec sp_executesql @CleanSQL
                        '

                        ELSE 
                            SET @SQLStatement = 'SELECT * FROM ({view.Replace("'", "''")}) T {whereClause.Replace("'", "''")} ORDER BY { searches.OrderBy} {(searches.Ascending ? "ASC" : "DESC")}'
                        exec sp_executesql @SQLStatement";

                    DataTable table = connection.RetrieveData(sql, "");

                    return Ok(JsonConvert.SerializeObject(table));
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpGet, Route("{locationID:int}/Meters")]
        public IHttpActionResult GetMetersForLocation(int locationID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    try
                    {
                        IEnumerable<Meter> result = new TableOperations<Meter>(connection).QueryRecordsWhere("LocationID = {0}", locationID);
                        return Ok(result);
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            }
            else
                return Unauthorized();

        }

        [HttpGet, Route("{locationID:int}/Assets")]
        public IHttpActionResult GetAssetsForLocation(int locationID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {

                    string assetTableName = TableOperations<Asset>.GetTableName();
                    string assetTypeTableName = TableOperations<AssetTypes>.GetTableName();
                    string assetLocationTableName = TableOperations<AssetLocation>.GetTableName();

                    try
                    {
                        DataTable result = connection.RetrieveData($@"
                        SELECT 
	                        a.*,
	                        at.Name as AssetType
                        FROM
	                        {assetTableName} as a JOIN 
	                        {assetTypeTableName} as at ON a.AssetTypeID = at.ID JOIN
	                        {assetLocationTableName} as al ON a.ID = al.AssetID
                        WHERE
                            al.LocationID = {{0}}", locationID);
                        return Ok(result);
                    }
                    catch (Exception ex)
                    {
                        return InternalServerError(ex);
                    }
                }
            else
                return Unauthorized();
        }

        [HttpGet, Route("{locationID:int}/Images")]
        public IHttpActionResult GetImagesForLocation(int locationID)
        {
            try
            {
                if (GetRoles == string.Empty || User.IsInRole(GetRoles))

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        string key = new TableOperations<Location>(connection).QueryRecordWhere("ID = {0}", locationID).LocationKey;
                        string path = new TableOperations<Setting>(connection).QueryRecordWhere("Name = 'ImageDirectory.Path'")?.Value;
                        if (path == null) return BadRequest("ImageDirectory.Path not set in settings table.");

                        if (Directory.Exists(Path.Combine(path, key)))
                            return Ok(Directory.GetFiles(Path.Combine(path, key)).Select(fp => new FileInfo(fp).Name));
                        else
                            return Ok(new string[] { });
                    }
                else
                    return Unauthorized();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpGet, Route("{locationID:int}/Images/{file}")]
        public HttpResponseMessage GetImageForLocation(int locationID, string file)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    string key = new TableOperations<Location>(connection).QueryRecordWhere("ID = {0}", locationID).LocationKey;
                    string path = new TableOperations<Setting>(connection).QueryRecordWhere("Name = 'ImageDirectory.Path'")?.Value;
                    if (path == null) throw new Exception("ImageDirectory.Path not set in Settings table");

                    using (FileStream fileStream = new FileStream(Path.Combine(path, key, file), FileMode.Open))
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            fileStream.CopyTo(memoryStream);
                            Bitmap image = new Bitmap(1, 1);
                            image.Save(memoryStream, ImageFormat.Jpeg);
                            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                            result.Content = new ByteArrayContent(memoryStream.ToArray());
                            result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                            return result;

                        }
                    }

                }
            }
            else
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
        }
    }

}