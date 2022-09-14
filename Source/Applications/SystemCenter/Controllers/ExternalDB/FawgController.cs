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
            field.ParentTableID = segment.ID;
            field.DisplayName = segment.AssetKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(LineSegment segment, Model.ExternalDBField field)
        {
            field.ParentTableID = segment.ID;
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
            public IEnumerable<FawgLineSegment> segments;
            public IEnumerable<TempConnection> connections;
        }

        private class FawgLineSegment : LineSegment
        {
            public int FromBus { get; set; }
            public int ToBus { get; set; }
            public int LocationFromID { get; set; }
            public int LocationToID { get; set; }
            public string FromBusName { get; set; }
            public string ToBusName { get; set; }
            public bool Changed { get; set; }
        }

        private class TempConnection
        {
            public string ParentKey;
            public string ChildKey;
            public int BusNumber;
        }

        [HttpGet, Route("UpdateSegments/{lineID:int}")]
        public IHttpActionResult GetLineSegmentsForLine(int lineID)
        {
            Line line;
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                line = (new TableOperations<Line>(connection)).QueryRecordWhere("ID = {0}", lineID);
            }

            int segment = 1;
            List<FawgLineSegment> segments = new List<FawgLineSegment>();


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
                        segment++;

                        segments.Add(new FawgLineSegment()
                        {
                            AssetKey = String.Format("{0}-Segment-{1}", line.AssetKey, segment),
                            Length = double.Parse((row["LengthMiles"].ToString()==""? "0" : row["LengthMiles"].ToString())),
                            X0 = double.Parse((row["ZeroSeqReactance"].ToString() == "" ? "0" : row["ZeroSeqReactance"].ToString())),
                            X1 = double.Parse((row["PosSeqReactance"].ToString() == "" ? "0" : row["PosSeqReactance"].ToString())),
                            R0 = double.Parse((row["ZeroSeqResistance"].ToString() == "" ? "0" : row["ZeroSeqResistance"].ToString())),
                            R1 = double.Parse((row["PosSeqResistance"].ToString() == "" ? "0" : row["PosSeqResistance"].ToString())),
                            VoltageKV = double.Parse((row["VoltageValue"].ToString() == "" ? "0" : row["VoltageValue"].ToString())),
                            AssetName = line.AssetName + String.Format(" Segment {0}", segment),
                            ThermalRating = double.Parse((row["ConductorSummerContRating"].ToString() == "" ? "0" : row["ConductorSummerContRating"].ToString())),
                            FromBus = int.Parse(row["fromBusNumber"].ToString()),
                            ToBus = int.Parse(row["ToBusNumber"].ToString()),
                            FromBusName = row["fromBusName"].ToString(),
                            ToBusName = row["toBusName"].ToString()
                        });
                    }
                }

                for (int i = 0; i < segments.Count; i++)
                {
                    int assetID = ExistingSegment(segments[i], lineID);
                    if (assetID == -1)
                        segments[i].Changed = true;
                    else
                        segments[i].Changed = SegmentChanged(segments[i], assetID);

                    //Set end of Line Segments correctly
                    int nFromBus = segments.Count(item => item.FromBus == segments[i].FromBus) + segments.Count(item => item.ToBus == segments[i].FromBus);
                    int nToBus = segments.Count(item => item.FromBus == segments[i].ToBus) + segments.Count(item => item.ToBus == segments[i].ToBus);
                    if (nToBus == 1 || nFromBus == 1)
                        segments[i].IsEnd = true;

                    //Get all Connected Segments
                    List<FawgLineSegment> connectedSegments = segments.Where((item, index) =>
                        (item.FromBus == segments[i].FromBus || item.ToBus == segments[i].FromBus || item.FromBus == segments[i].ToBus || item.ToBus == segments[i].ToBus) && (i != index)).ToList();

                    //Set Connections if they don't already exist
                    foreach (FawgLineSegment seg in connectedSegments)
                    {
                        int nConnections = connections.Count(item => (
                        (item.ParentKey == segments[i].AssetKey && item.ChildKey == seg.AssetKey) ||
                        (item.ChildKey == segments[i].AssetKey && item.ParentKey == seg.AssetKey)));

                        int bus = (segments[i].FromBus == seg.FromBus || segments[i].ToBus == seg.FromBus) ? seg.FromBus : seg.ToBus;
                        if (nConnections == 0)
                            connections.Add(new TempConnection() { ChildKey = segments[i].AssetKey, ParentKey = seg.AssetKey, BusNumber=bus });
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
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
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
                        int i = 1;
                        foreach (FawgLineSegment seg in updatedData.segments)
                        {

                            LineSegment lseg = new LineSegment()
                            {
                                AssetKey = line.AssetKey + " Segment" + i,
                                R0 = seg.R0,
                                R1 = seg.R1,
                                X0 = seg.X0,
                                X1 = seg.X1,
                                ThermalRating = seg.ThermalRating,
                                Length = seg.Length,
                                IsEnd = seg.IsEnd,
                                Spare = false,
                                AssetTypeID = assetType,
                                AssetName = line.AssetName + " Segment " + i,
                                VoltageKV = line.VoltageKV
                            };

                            i++;

                            segmentTable.AddNewRecord(lseg);

                            int segmentID = connection.ExecuteScalar<int>("SELECT ID FROM LineSegment WHERE AssetKey = {0}", lseg.AssetKey);

                            connectionTable.AddNewRecord(
                                new AssetConnection()
                                {
                                    AssetRelationshipTypeID = assetConnectionType,
                                    ChildID = lineID,
                                    ParentID = segmentID
                                });
                            if (seg.IsEnd && seg.LocationFromID > 0)
                                connection.ExecuteNonQuery($"INSERT INTO AssetLocation (AssetID, LocationID) VALUES ({segmentID},{seg.LocationFromID})");
                            if (seg.IsEnd && seg.LocationToID > 0)
                                connection.ExecuteNonQuery($"INSERT INTO AssetLocation (AssetID, LocationID) VALUES ({segmentID},{seg.LocationToID})");
                           
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
                return Ok(1);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private int ExistingSegment(FawgLineSegment Segment, int LineID)
        {

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
                return connection.ExecuteScalar<int?>($@"
                    SELECT ID
                    FROM LineSegment
                    WHERE
                    (
	                    SELECT COUNT(AssetConnection.ID) 
	                    FROM AssetConnection
	                    WHERE
		                    AssetConnection.AssetRelationshipTypeID = (SELECT ID FROM AssetRelationshipType WHERE Name = 'Line-LineSegment' ) AND 
		                    ((AssetConnection.ParentID = LineSegment.ID AND AssetConnection.ChildID = {LineID}) OR (AssetConnection.ChildID = LineSegment.ID AND AssetConnection.ParentID = {LineID}))
		
                    ) > 0 AND
                    (
                        SELECT Value 
                        FROM [AdditionalFieldValue] AFV LEFT JOIN [AdditionalField] AF ON AFV.AdditionalFieldID = AF.ID
                        WHERE AF.ParentTable='LineSegment' and AF.FieldName = 'FromBus' AND AFV.ParentTableID = LineSegment.ID 
                    ) = '{Segment.FromBus}' AND 
                    (
                        SELECT Value
                        FROM [AdditionalFieldValue] AFV LEFT JOIN [AdditionalField] AF ON AFV.AdditionalFieldID = AF.ID
                        WHERE AF.ParentTable='LineSegment' and AF.FieldName = 'ToBus' AND AFV.ParentTableID = LineSegment.ID 
                    ) = '{Segment.ToBus}'") ?? -1;

        }

        private bool SegmentChanged(FawgLineSegment Segment, int SegmentID)
        {
            LineSegment original;
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
                original = new TableOperations<LineSegment>(connection).QueryRecordWhere("ID = {0}", SegmentID);
            if (original == null)
                return true;

            return original.Length != Segment.Length || original.R0 != Segment.R0 || original.R1 != Segment.R1 ||
                original.X0 != Segment.X0 || original.X1 != Segment.X1 || original.ThermalRating != Segment.ThermalRating || original.VoltageKV != Segment.VoltageKV;
        }

    }

    [RoutePrefix("api/ExternalDB/FAWG/Transformer")]
    public class FawgXFRController : ExternalDBController<Transformer>
    {
        protected override string extDBConnectionSetting { get { return "dbFawg"; } }
        protected override GSF.Data.DatabaseType extDBType { get { return DatabaseType.SQLServer; } }
        protected override string extDBName { get { return "Fawg"; } }

        protected override Model.ExternalDBField processExternalAdditionalField(Transformer xfr, Model.ExternalDBField field)
        {
            field.ParentTableID = xfr.ID;
            field.DisplayName = xfr.AssetKey;
            return field;
        }

        protected override Model.ExternalDBField processExternalopenXDAField(Transformer xfr, Model.ExternalDBField field)
        {
            field.ParentTableID = xfr.ID;
            field.DisplayName = xfr.AssetKey;
            return field;
        }

        protected override string getDataQuery(Transformer xfr, string tablename)
        {

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                Model.AdditionalField uidFieldhigh = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("ParentTable = 'Transformer' AND FieldName = 'FAWG High Side Bus'");
                if (uidFieldhigh == null)
                    throw (new Exception("Unable to Find High Side Bus Field"));

                Model.AdditionalFieldValue uiValueHigh = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("ParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldhigh.ID);
                if (uiValueHigh == null)
                    throw (new Exception("No valid High Side Bus Defined"));

                Model.AdditionalField uidFieldlow = new TableOperations<Model.AdditionalField>(connection).QueryRecordWhere("ParentTable = 'Transformer' AND FieldName = 'FAWG Low Side Bus'");
                if (uidFieldlow == null)
                    throw (new Exception("Unable to Find Low Side Bus Field"));

                Model.AdditionalFieldValue uiValueLow = new TableOperations<Model.AdditionalFieldValue>(connection).QueryRecordWhere("ParentTableID = {0} AND AdditionalFieldID = {1}", xfr.ID, uidFieldlow.ID);
                if (uiValueLow == null)
                    throw (new Exception("No valid Low Side Bus Defined"));

                return String.Format("BusHigh = '{0}' AND BusLow = '{1}'", uiValueHigh.Value, uiValueLow.Value);

            }
        }
    }


}