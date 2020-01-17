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
using System.Transactions;
using System.Data.SqlClient;
using System.Linq;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/AssetConnection")]
    public class AssetConnectionController : ModelController<AssetConnection>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/AssetConnectionType")]
    public class AssetConnectionTypeController : ModelController<AssetConnectionType>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/AssetType")]
    public class AssetTypeController : ModelController<AssetTypes>
    {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/Phase")]
    public class PhaseController:ModelController<Phase> {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/MeasurementType")]
    public class MeasurementTypeController:ModelController<MeasurementType> {
        protected override string Connection { get; } = "dbOpenXDA";
    }

    [RoutePrefix("api/OpenXDA/Location")]
    public class LocationController : ModelController<Location> {
        protected override string Connection { get; } = "dbOpenXDA";
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
            public MeterAsset MeterAsset { get; set; }
            //public LineImpedance LineImpedance { get; set; }
        }
        [HttpPost, Route("MeterLine")]
        public IHttpActionResult PostMeterLine([FromBody]PostMeterLineContent content)
        {
            using (AdoDataConnection connXDA = new AdoDataConnection("dbOpenXDA"))
            using (AdoDataConnection connSS = new AdoDataConnection("systemSettings"))
            {
                new TableOperations<Line>(connXDA).AddNewOrUpdateRecord(content.Line);

                //content.LineImpedance.LineID = content.MeterLine.LineID = content.Line.ID = new TableOperations<Line>(connXDA).QueryRecordWhere("AssetKey = {0}", content.Line.AssetKey).ID;
                //new TableOperations<LineImpedance>(connXDA).AddNewOrUpdateRecord(content.LineImpedance);

                //new TableOperations<MeterLine>(connXDA).AddNewRecord(content.MeterLine);


                //int assetTypeID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetType WHERE Name = 'Line'");
                //int assetTypeFieldID = connSS.ExecuteScalar<int>("SELECT ID FROM AssetTypeField WHERE Name = 'OpenXDA.Line.ID'");

                //new TableOperations<Asset>(connSS).AddNewRecord(new Asset() { AssetKey = content.Line.AssetKey, AssetTypeID = assetTypeID });
                //int assetID = connSS.ExecuteScalar<int>("SELECT ID FROM Asset WHERE AssetKey = {0}", content.Line.AssetKey);
                //new TableOperations<AssetTypeFieldValue>(connSS).AddNewRecord(new AssetTypeFieldValue() { AssetID = assetID, AssetTypeFieldID = assetTypeFieldID, Value = content.Line.ID.ToString() });

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
    }

    [RoutePrefix("api/OpenXDA/EDNAPoint")]
    public class EDNAPointController : ModelController<EDNAPoint>
    {
        EDNAPointController(): base(true, "LineID"){}
        protected override string Connection { get; } = "dbOpenXDA";        
    }


    [RoutePrefix("api/OpenXDA/Note")]
    public class NoteController : ModelController<Notes>
    {
        protected override string Connection { get; } = "dbOpenXDA";

        [HttpGet, Route("ForObject/{noteType}/{referenceTableID:int}")]
        public IHttpActionResult GetNotes(string noteType, int referenceTableID)
        {
            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                try
                {
                    IEnumerable<Notes> result = new TableOperations<Notes>(connection).QueryRecordsWhere("NoteTypeID = (SELECT ID FROM NoteType WHERE ReferenceTableName = {0}) AND ReferenceTableID = {1} ", noteType, referenceTableID).OrderByDescending(x => x.Timestamp);
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return InternalServerError(ex);
                }
            }
        }

        public override IHttpActionResult Post([FromBody] Notes record)
        {
            try
            {
                if (User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        record.UserAccount = User.Identity.Name;
                        int result = new TableOperations<Notes>(connection).AddNewRecord(record);
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


    }

    [RoutePrefix("api/OpenXDA/NoteType")]
    public class NoteTypeController : ModelController<NoteType>
    {
        protected override string Connection { get; } = "dbOpenXDA";

    }



}

