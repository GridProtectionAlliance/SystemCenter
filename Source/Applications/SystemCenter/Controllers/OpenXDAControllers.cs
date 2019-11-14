//******************************************************************************************************
//  ModelBaseController.cs - Gbtc
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
//  10/04/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************


using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Web.Http;
using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Net.Security;
using GSF.Security.Model;
using GSF.Web;
using GSF.Web.Security;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers
{
    [RoutePrefix("api/OpenXDA/Meter")]
    public class MeterController : ModelController<Meter> {
        protected override string Connection { get; } = "dbOpenXDA";

        [HttpGet, Route("Line/{lineID:int}")]
        public IHttpActionResult GetMetersForLine(int lineID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Meter> records = new TableOperations<Meter>(connection).QueryRecordsWhere("ID IN ( SELECT MeterID FROM MeterLine WHERE LineID = {0})", lineID);
                return Ok(records);
            }
        }

        [HttpGet, Route("MeterLocation/{meterLocationID:int}")]
        public IHttpActionResult GetMetersForMeterLocation(int meterLocationID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Meter> records = new TableOperations<Meter>(connection).QueryRecordsWhere("MeterLocationID = {0}", meterLocationID);
                return Ok(records);
            }
        }

        public override IHttpActionResult Post([FromBody] Meter record)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                base.Post(record);
                record = new TableOperations<Meter>(connection).QueryRecordWhere("AssetKey = {0}", record.AssetKey);
                return Ok(record);
            }
        }

        [HttpPost, Route("New")]
        public IHttpActionResult PostNewMeter([FromBody] JObject record)
        {
            try
            {
                using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
                using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
                {
                    MeterLocation meterLocation = record["MeterLocation"].ToObject<MeterLocation>();
                    Meter meter = record["Meter"].ToObject<Meter>();

                    if (meterLocation.ID == 0)
                    {
                        new TableOperations<MeterLocation>(connXDA).AddNewRecord(meterLocation);
                        meter.MeterLocationID = new TableOperations<MeterLocation>(connXDA).QueryRecordWhere("AssetKey = {0}", meterLocation.AssetKey).ID;
                        int mlassetTypeID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'Station'");
                        int mlassetTypeFieldID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.MeterLocation.ID'");

                        new TableOperations<Asset>(connSS).AddNewRecord(new Asset() { AssetKey = meterLocation.AssetKey, AssetTypeID = mlassetTypeID });
                        int mlassetID = connSS.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", meterLocation.AssetKey);
                        new TableOperations<AssetTypeFieldValue>(connSS).AddNewRecord(new AssetTypeFieldValue() { AssetID = mlassetID, AssetTypeFieldID = mlassetTypeFieldID, Value = meter.MeterLocationID.ToString() });

                    }
                    base.Post(meter);
                    meter = new TableOperations<Meter>(connXDA).QueryRecordWhere("AssetKey = {0}", meter.AssetKey);


                    int assetTypeID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'Meter'");
                    int assetTypeFieldID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.Meter.ID'");

                    new TableOperations<Asset>(connSS).AddNewRecord(new Asset() { AssetKey = meter.AssetKey, AssetTypeID = assetTypeID});
                    int assetID = connSS.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", meter.AssetKey);
                    new TableOperations<AssetTypeFieldValue>(connSS).AddNewRecord(new AssetTypeFieldValue() { AssetID = assetID, AssetTypeFieldID = assetTypeFieldID, Value = meter.ID.ToString()});

                    return Ok(meter);
                }

            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("PQViewSite/{meterID:int}")]
        public IHttpActionResult GetPQViewSite(int meterID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                PQViewSite record = new TableOperations<PQViewSite>(connection).QueryRecordWhere("MeterID = {0}", meterID);
                return Ok(record);
            }
        }



        [HttpPost, Route("PQViewSite")]
        public IHttpActionResult PostPQViewSite([FromBody] PQViewSite record)
        {
            try
            {
                using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
                {

                    if (record.SiteID != string.Empty)
                    {
                        new TableOperations<PQViewSite>(connXDA).AddNewOrUpdateRecord(record);
                    }
                    else
                    {
                        connXDA.ExecuteNonQuery("DELETE FROM PQViewSite WHERE MeterID = {0}", record.MeterID);
                    }
                    return Ok();
                }

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpDelete, Route("MeterLocation/Delete")]
        public IHttpActionResult DeleteMeterLocation(Meter record)
        {
            try
            {
                using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
                using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
                {
                    int assetID = connSS.ExecuteScalar<int>("SELECT AssetID FROM AssetTypeFieldValue WHERE AssetTypeFieldID = (SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.MeterLocation.ID') AND Value = {0}", record.MeterLocationID.ToString());
                    connSS.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'Asset', 'ID = {assetID}'");
                    int tempMeterLocationID = connXDA.ExecuteScalar<int>("SELECT TOP 1 ID FROM MeterLocation");
                    connXDA.ExecuteNonQuery("UPDATE Meter SET MeterLocationID = {0} WHERE ID = {1}", tempMeterLocationID, record.ID);
                    MeterLocationController meterLocationController = new MeterLocationController();
                    MeterLocation meterLocation = new TableOperations<MeterLocation>(connXDA).QueryRecordWhere("ID = {0}", record.MeterLocationID);
                    meterLocationController.Delete(meterLocation);
                    MeterLocation newMeterLocation = new TableOperations<MeterLocation>(connXDA).QueryRecordWhere("ID = {0}", tempMeterLocationID);
                    return Ok(newMeterLocation);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        public override IHttpActionResult Delete(Meter record)
        {
            try
            {
                using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
                {
                    int assetID = connSS.ExecuteScalar<int>("SELECT AssetID FROM AssetTypeFieldValue WHERE AssetTypeFieldID = (SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.Meter.ID') AND Value = {0}", record.ID.ToString());
                    connSS.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'Asset', 'ID = {assetID}'");
                    return base.Delete(record);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }



    }

    [RoutePrefix("api/OpenXDA/MeterLocation")]
    public class MeterLocationController : ModelController<MeterLocation> {
        protected override string Connection { get; } = "dbOpenXDA";

        public override IHttpActionResult Post([FromBody] MeterLocation record)
        {
            using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
            using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
            {
                base.Post(record);
                record = new TableOperations<MeterLocation>(connXDA).QueryRecordWhere("AssetKey = {0}", record.AssetKey);

                int assetTypeID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'Station'");
                int assetTypeFieldID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.MeterLocation.ID'");

                new TableOperations<Asset>(connSS).AddNewRecord(new Asset() { AssetKey = record.AssetKey, AssetTypeID = assetTypeID });
                int assetID = connSS.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", record.AssetKey);
                new TableOperations<AssetTypeFieldValue>(connSS).AddNewRecord(new AssetTypeFieldValue() { AssetID = assetID, AssetTypeFieldID = assetTypeFieldID, Value = record.ID.ToString() });

                return Ok(record);
            }
        }
    }
    [RoutePrefix("api/OpenXDA/Line")]
    public class LineController : ModelController<Line> {
        protected override string Connection { get; } = "dbOpenXDA";

        [HttpGet, Route("Meter/{meterID:int}")]
        public IHttpActionResult GetLinesForMeter(int meterID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Line> records = new TableOperations<Line>(connection).QueryRecordsWhere("ID IN ( SELECT LineID FROM MeterLine WHERE MeterID = {0})", meterID);
                return Ok(records);
            }
        }

        [HttpGet, Route("AllLines")]
        public IHttpActionResult GetAllLines()
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                DataTable records = connection.RetrieveData(@"
                    SELECT
	                    Line.ID,
	                    Line.AssetKey,
	                    Line.VoltageKV,
	                    Line.ThermalRating,
	                    Line.Length,
	                    Line.Description,
	                    Line.MaxFaultDistance,
	                    Line.MinFaultDistance,
                        LineImpedance.ID as LineImpedanceID,
	                    LineImpedance.R0,
	                    LineImpedance.X0,
	                    LineImpedance.R1,
	                    LineImpedance.X1,
                        '' as LineName
                    FROM
	                    Line LEFT JOIN
	                    LineImpedance ON Line.ID = LineImpedance.LineID
                ");
                return Ok(records);
            }
        }


        [HttpGet, Route("MeterLocation/{meterLocationID:int}")]
        public IHttpActionResult GetMetersForMeterLocation(int meterLocationID)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                IEnumerable<Meter> records = new TableOperations<Meter>(connection).QueryRecordsWhere("MeterLocationID = {0}", meterLocationID);
                return Ok(records);
            }
        }

        public class PostMeterLineContent {
            public Line Line { get; set; }
            public MeterLine MeterLine { get; set; }
            public LineImpedance LineImpedance { get; set; }
        }
        [HttpPost, Route("MeterLine")]
        public IHttpActionResult PostMeterLine([FromBody]PostMeterLineContent content)
        {
            using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
            using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
            {
                new TableOperations<Line>(connXDA).AddNewOrUpdateRecord(content.Line);

                content.LineImpedance.LineID = content.MeterLine.LineID = content.Line.ID = new TableOperations<Line>(connXDA).QueryRecordWhere("AssetKey = {0}", content.Line.AssetKey).ID;
                new TableOperations<LineImpedance>(connXDA).AddNewOrUpdateRecord(content.LineImpedance);

                new TableOperations<MeterLine>(connXDA).AddNewRecord(content.MeterLine);


                int assetTypeID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'Line'");
                int assetTypeFieldID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.Line.ID'");

                new TableOperations<Asset>(connSS).AddNewRecord(new Asset() { AssetKey = content.Line.AssetKey, AssetTypeID = assetTypeID });
                int assetID = connSS.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", content.Line.AssetKey);
                new TableOperations<AssetTypeFieldValue>(connSS).AddNewRecord(new AssetTypeFieldValue() { AssetID = assetID, AssetTypeFieldID = assetTypeFieldID, Value = content.Line.ID.ToString() });

                return Ok();
            }
        }

        public override IHttpActionResult Post([FromBody] Line record)
        {
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                base.Post(record);
                record = new TableOperations<Line>(connection).QueryRecordWhere("AssetKey = {0}", record.AssetKey);
                return Ok(record);
            }
        }

        //[HttpGet, Route("EDNAPoints/{lineID:int}")]
        //public IHttpActionResult GetEDNAPointsForLine(int lineID)
        //{
        //    using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
        //    {
        //        IEnumerable<EDNAPoint> records = new TableOperations<EDNAPoint>(connection).QueryRecordsWhere("LineID = {0}", lineID);
        //        return Ok(records);
        //    }
        //}

    }

    [RoutePrefix("api/OpenXDA/EDNAPoint")]
    public class EDNAPointController : ModelController<EDNAPoint>
    {
        EDNAPointController(): base(true, "LineID"){}
        protected override string Connection { get; } = "dbOpenXDA";        
    }
}

