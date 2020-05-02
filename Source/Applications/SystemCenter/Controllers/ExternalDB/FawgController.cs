//******************************************************************************************************
//  FAWGController.cs - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  04/20/2020 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using Newtonsoft.Json.Linq;
using Oracle.ManagedDataAccess.Client;
using openXDA.Model;
using System.Transactions;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/ExternalDB/FAWG/LineSegment")]
    public class FawgSegmentController : ExternalDBController<LineSegment>
    {
        protected override string extDBConnectionSetting { get { return "dbFawg"; } }
        protected override GSF.Data.DatabaseType extDBType { get { return DatabaseType.SQLServer; } }
        protected override string extDBName { get { return "Fawg"; } }

        protected override Model.ExternalDBField processExternalAdditionalField(LineSegment segment, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = segment.ID;
            field.DisplayName = segment.AssetKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(LineSegment segment, Model.ExternalDBField field)
        {
            field.OpenXDAParentTableID = segment.ID;
            field.DisplayName = segment.AssetKey;
            return field;
        }

        protected override string getDataQuery(LineSegment segment, string tablename)
        {
            return String.Format("Id = {0}", segment.ID);
        }

        // The call to get LineSegments from Fawg is seperate because this will override all previous Segment
        private class FawgSegmentData
        {
            public IEnumerable<LineSegment> segments;
            public IEnumerable<TempConnection> connections;
        }

        private class TempConnection
        {
            public string ParentKey;
            public string ChildKey;
        }

        [HttpGet, Route("UpdateSegments/{lineID:int}")]
        public IHttpActionResult GetLineSegmentsForLine(int lineID)
        {
            Line line;
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                line = (new TableOperations<Line>(connection)).QueryRecordWhere("ID = {0}", lineID);
            }

            int segment = 1;
            List<LineSegment> segments = new List<LineSegment>();
            List<int> fromBus = new List<int>();
            List<int> toBus = new List<int>();

            List<TempConnection> connections = new List<TempConnection>();

            string fawgQuery = "SELECT * FROM " + GetTableQuery("LineSegment") + " WHERE LNumber = {0}";
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(extDBConnectionSetting))
                {
                    DataTable dataTable = connection.RetrieveData(fawgQuery, line.AssetKey);

                    if (dataTable.Rows.Count == 0)
                        throw (new Exception($"Line {line.AssetKey} not found in FAWG data"));

                    foreach (DataRow row in dataTable.AsEnumerable())
                    {
                        segments.Add(new LineSegment()
                        {
                            AssetKey = String.Format("{0}-Segment-{1}", line.AssetKey, segment),
                            Length = double.Parse((row["LengthMiles"].ToString()==""? "0" : row["LengthMiles"].ToString())),
                            X0 = double.Parse((row["ZeroSeqReactance"].ToString() == "" ? "0" : row["ZeroSeqReactance"].ToString())),
                            X1 = double.Parse((row["PosSeqReactance"].ToString() == "" ? "0" : row["PosSeqReactance"].ToString())),
                            R0 = double.Parse((row["ZeroSeqResistance"].ToString() == "" ? "0" : row["ZeroSeqResistance"].ToString())),
                            R1 = double.Parse((row["PosSeqResistance"].ToString() == "" ? "0" : row["PosSeqResistance"].ToString())),
                            VoltageKV = double.Parse((row["VoltageValue"].ToString() == "" ? "0" : row["VoltageValue"].ToString())),
                            AssetName = line.AssetName + String.Format(" Segment {0}", segment),
                            ThermalRating = double.Parse((row["ConductorSummerContRating"].ToString() == "" ? "0" : row["ConductorSummerContRating"].ToString()))

                        });

                        segment++;
                        int bus1 = int.Parse(row["fromBusNumber"].ToString());
                        int bus2 = int.Parse(row["ToBusNumber"].ToString());

                        fromBus.Add(bus1);
                        toBus.Add(bus2);

                    }
                }

                for (int i = 0; i < segments.Count; i++)
                {
                    //Set end of Line Segments correctly
                    int nFromBus = fromBus.Count(item => item == fromBus[i]) + toBus.Count(item => item == fromBus[i]);
                    int nToBus = fromBus.Count(item => item == toBus[i]) + toBus.Count(item => item == toBus[i]);
                    if (nToBus == 1 || nFromBus == 1)
                        segments[i].IsEnd = true;

                    //Get all Connected Segments
                    List<LineSegment> connectedSegments = segments.Where((item, index) =>
                        (fromBus[index] == fromBus[i] || toBus[index] == fromBus[i] || fromBus[index] == toBus[i] || toBus[index] == toBus[i]) && (i != index)).ToList();

                    //Set Connections if they don't already exist
                    foreach (LineSegment seg in connectedSegments)
                    {
                        int nConnections = connections.Count(item => (
                        (item.ParentKey == segments[i].AssetKey && item.ChildKey == seg.AssetKey) ||
                        (item.ChildKey == segments[i].AssetKey && item.ParentKey == seg.AssetKey)));

                        if (nConnections == 0)
                            connections.Add(new TempConnection() { ChildKey = segments[i].AssetKey, ParentKey = seg.AssetKey });
                    }

                }

                return Ok(new FawgSegmentData()
                {
                    connections = connections,
                    segments = segments
                });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [Route("ConfirmSegments/{lineID:int}"), HttpPost]
        public IHttpActionResult ConfirmSegments(int lineID, [FromBody] JObject record)
        {
            try
            {
                JToken data = record.GetValue("data");
                FawgSegmentData updatedData = data.ToObject<FawgSegmentData>();

                using (TransactionScope scope = new TransactionScope())
                {
                    using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
                    {
                        Line line = (new TableOperations<Line>(connection)).QueryRecordWhere("ID = {0}", lineID);

                        TableOperations<AssetConnection> connectionTable = new TableOperations<AssetConnection>(connection);
                        TableOperations<LineSegment> segmentTable = new TableOperations<LineSegment>(connection);

                        foreach (AssetConnection con in connectionTable.QueryRecordsWhere("(ParentID = {0} OR ChildID = {0} ) AND AssetRelationshipTypeID = (SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment')",lineID).ToList())
                        {
                            LineSegment seg = segmentTable.QueryRecordWhere("ID = {0} OR ID = {1}", con.ParentID, con.ChildID);
                            connection.ExecuteNonQuery("DELETE FROM LineSegmentConnections WHERE ParentSegment = {0} OR ChildSegment = {0}", seg.ID);
                            int result = connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'Asset', 'ID = {seg.ID}'");

                        }

                        int assetType = connection.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'LineSegment'");
                        int assetConnectionType = connection.ExecuteScalar<int>("SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment'");
                        foreach (LineSegment seg in updatedData.segments)
                        {
                            seg.AssetTypeID = assetType;
                            segmentTable.AddNewRecord(seg);

                            int segmentID = connection.ExecuteScalar<int>("SELECT ID FROM LineSegment WHERE AssetKey = {0}", seg.AssetKey);

                            connectionTable.AddNewRecord(
                                new AssetConnection()
                                {
                                    AssetRelationshipTypeID = assetConnectionType,
                                    ChildID = lineID,
                                    ParentID = segmentID
                                });                            
                        }

                        updatedData.connections
                            .Where(item => updatedData.segments.Select(seg => seg.AssetKey).Contains(item.ChildKey) && updatedData.segments.Select(seg => seg.AssetKey).Contains(item.ParentKey))
                            .Select(con =>
                               connection.ExecuteNonQuery(
                                   "INSERT INTO LineSegmentConnections (ParentSegment, ChildSegment) VALUES ((SELECT ID FROM ASSET WHERE ASSETKEY = {0}),(SELECT ID FROM ASSET WHERE ASSETKEY = {1}))",
                                   con.ParentKey, con.ChildKey)
                        );
                    }

                    scope.Complete();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }

}