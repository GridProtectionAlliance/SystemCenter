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
using System.Linq;
using System.Transactions;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using openXDA.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/Location")]
    public class OpenXDALocationController : ModelController<Location>
    {
        protected override string PostRoles { get; } = "Administrator, Transmission SME";
        protected override string PatchRoles { get; } = "Administrator, Transmission SME";
        protected override string DeleteRoles { get; } = "Administrator, Transmission SME";

        protected override string Connection { get; } = "dbOpenXDA";
        protected override string DefaultSort { get; } = "LocationKey";

        protected override bool AllowSearch => true;

        [HttpPost, Route("SearchableListIncludingMeter")]
        public IHttpActionResult GetMetersUsingSearchableList([FromBody] PostData searches)
        {

            if (!AllowSearch || (GetRoles != string.Empty && !User.IsInRole(GetRoles)))
                return Unauthorized();

            try
            {

                string whereClause = BuildWhereClause(searches.Searches);


                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {

                    string view = @"SELECT

                        DISTINCT
                        Location.ID,
	                    Location.LocationKey,
	                    Location.Name,
	                    COUNT(DISTINCT Meter.ID) as Meters,
	                    COUNT(DISTINCT AssetLocation.AssetID) as Assets
                    FROM
                        Location LEFT JOIN

                        Meter ON Location.ID = Meter.LocationID LEFT JOIN

                        AssetLocation ON Location.ID = AssetLocation.LocationID LEFT JOIN
                        Asset ON AssetLocation.AssetID = Asset.ID

                    GROUP BY
                        Location.ID,
	                    Location.LocationKey,
	                    Location.Name
                    ";

                    string sql = "";

                    sql = $@"
                        DECLARE @PivotColumns NVARCHAR(MAX) = N''
                        SELECT @PivotColumns = @PivotColumns + '[AFV_' + t.FieldName + '],'
                            FROM (Select DISTINCT FieldName FROM [SystemCenter.AdditionalField] WHERE ParentTable = 'Location') AS t

                        DECLARE @SQLStatement NVARCHAR(MAX) = N'
                            SELECT * INTO #Tbl FROM (
                            SELECT 
                                M.*,
                                (CONCAT(''AFV_'',af.FieldName)) AS FieldName,
	                            afv.Value
                            FROM ({view.Replace("'", "''")}) M LEFT JOIN 
                                [SystemCenter.AdditionalField] af on af.ParentTable = ''Location'' LEFT JOIN
	                            [SystemCenter.AdditionalFieldValue] afv ON m.ID = afv.ParentTableID AND af.ID = afv.AdditionalFieldID
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

        [HttpGet, Route("{locationID:int}/Assets")]
        public IHttpActionResult GetAssetsForLocation(int locationID)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                try
                {
                    DataTable result = connection.RetrieveData(@"
                    SELECT 
	                    Asset.*,
	                    AssetType.Name as AssetType
                    FROM
	                    Asset JOIN 
	                    AssetType ON Asset.AssetTypeID = AssetType.ID JOIN
	                    AssetLocation ON Asset.ID = AssetLocation.AssetID
                    WHERE
                        AssetLocation.LocationID = {0}", locationID);
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
        }

    }

}