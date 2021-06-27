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
using System.Net.Http;
using System.Transactions;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/Line")]
    public class OpenXDALineController : ModelController<Line>
    {
        private class LineDetails
        {
            public double Length;
            public double R0;
            public double R1;
            public double X0;
            public double X1;
            public double ThermalRating;
        }

        [HttpGet, Route("{lineID:int}/LineSegment")]
        public IHttpActionResult GetLineSegmentForLine(int lineID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    LineDetails result = new LineDetails();

                    List<LineSegment> record = new TableOperations<LineSegment>(connection).QueryRecordsWhere("ID in (select ChildID from AssetRelationship where AssetRelationshipTypeID = (SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment') AND ParentID = {0})", lineID).ToList();
                    record = record.Concat(new TableOperations<LineSegment>(connection).QueryRecordsWhere("ID in (select ParentID from AssetRelationship where AssetRelationshipTypeID = (SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment') AND ChildID = {0})", lineID)).ToList();

                    result.Length = record.Select(item => item.Length).Sum();
                    result.X0 = record.Select(item => item.X0).Sum();
                    result.R0 = record.Select(item => item.R0).Sum();
                    result.X1 = record.Select(item => item.X1).Sum();
                    result.R1 = record.Select(item => item.R1).Sum();
                    result.ThermalRating = record.Select(item => item.ThermalRating).Count() > 0 ? record.Select(item => item.ThermalRating).Min() : 0;

                    return Ok(result);
                }
            }
            else
                return Unauthorized();

        }

        [HttpGet, Route("{lineID:int}/LineSegments")]
        public IHttpActionResult GetLineSegmentsForLine(int lineID)
        {
            if (GetRoles == string.Empty || User.IsInRole(GetRoles))
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    List<LineSegment> record = new TableOperations<LineSegment>(connection).QueryRecordsWhere("ID in (select ChildID from AssetRelationship where AssetRelationshipTypeID = (SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment') AND ParentID = {0})", lineID).ToList();
                    record = record.Concat(new TableOperations<LineSegment>(connection).QueryRecordsWhere("ID in (select ParentID from AssetRelationship where AssetRelationshipTypeID = (SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment') AND ChildID = {0})", lineID)).ToList();
                    return Ok(record);
                }
            }
            else
                return Unauthorized();

        }

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (PostRoles == string.Empty || User.IsInRole(PostRoles))
            {
                base.Post(record).ExecuteAsync(new System.Threading.CancellationToken()).Result.Content.ReadAsAsync<Line>().Wait();
                Line lineRecord = record.ToObject<Line>();

                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    lineRecord = (new TableOperations<Line>(connection)).QueryRecordWhere("AssetKey = {0}", lineRecord.AssetKey);
                    LineSegment lineSegment = new LineSegment()
                    {
                        VoltageKV = record["VoltageKV"].ToObject<double>(),
                        AssetKey = record["AssetKey"].ToString() + "LineSegment",
                        Description = record["Description"].ToString(),
                        AssetName = record["AssetName"].ToString(),
                        R0 = 0,
                        X0 = 0,
                        R1 = 0,
                        X1 = 0,
                        Length = 0,
                    };
                    lineSegment.AssetTypeID = connection.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'LineSegment'");

                    new TableOperations<LineSegment>(connection).AddNewRecord(lineSegment);
                    lineSegment.ID = connection.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", lineSegment.AssetKey);

                    AssetConnection assetConnection = new AssetConnection()
                    {
                        AssetRelationshipTypeID = 0,
                        ParentID = lineRecord.ID,
                        ChildID = lineSegment.ID
                    };
                    assetConnection.AssetRelationshipTypeID = connection.ExecuteScalar<int>("SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment'");
                    new TableOperations<AssetConnection>(connection).AddNewRecord(assetConnection);

                }


                return Ok(lineRecord);
            }
            else
                return Unauthorized();
        }
        [HttpGet, Route("extDataBases")]
        public IHttpActionResult GetExternalDB()
        {
            try
            {
                if (GetRoles == string.Empty || User.IsInRole(GetRoles))
                {
                    string afTbl = TableOperations<AdditionalField>.GetTableName();
                    string afvTbl = TableOperations<AdditionalFieldValue>.GetTableName();

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        string query = $@"SELECT MIN(UpdatedOn) AS lastUpdate, {afTbl}.ExternalDB AS name  
                                                    FROM 
                                                    {afTbl} LEFT JOIN {afvTbl} ON {afTbl}.ID = {afvTbl}.AdditionalFieldID
                                                    WHERE 
                                                        {afTbl}.ParentTable = 'Line'
                                                        AND {afTbl}.ExternalDB IS NOT NULL AND {afTbl}.ExternalDB <> ''
                                                    GROUP BY {afTbl}.ExternalDB";

                        DataTable table = connection.RetrieveData(query);

                        return Ok(table);
                    }
                }
                else
                    return Unauthorized();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
    }
}