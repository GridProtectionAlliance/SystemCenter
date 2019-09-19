//******************************************************************************************************
//  GeneralMeterInfoController.cs - Gbtc
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
//  09/09/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************



using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.SystemCenter.Meter
{
    //[RoutePrefix("api/SystemCenter/Meter/ConnectionInfo")]
    //public class ConnectionInfoController : ApiController
    //{
    //    [HttpGet, Route("{id}")]
    //    public IHttpActionResult Get(int id)
    //    {
    //        try
    //        {
    //            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
    //            {
    //                Model.Meter meter = new TableOperations<Model.Meter>(connection).QueryRecordWhere("ID = {0}", id);
    //                if (meter == null) return BadRequest("ID does not match any meter.");
    //                Dictionary<string, object> returnDict = new Dictionary<string, object>();

    //                string phone = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'Phone')", id);
    //                string connectionIP = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID =  (SELECT ID FROM MeterField WHERE Name = 'ConnectionIP')", id);
    //                string internalIP = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'InternalIP')", id);
    //                string gateway = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'Gateway')", id);
    //                string subnet = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'Subnet')", id);
    //                string unitID = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'UnitID')", id);
    //                string userID = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'UserID')", id);
    //                string password = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'Password')", id);
    //                string connectionType = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'ConnectionType')", id);
    //                string dLHost = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'DLHost')", id);
    //                string callback = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'Callback')", id);

    //                returnDict.Add("Phone", phone);
    //                returnDict.Add("ConnectionIP", connectionIP);
    //                returnDict.Add("InternalIP", internalIP);
    //                returnDict.Add("Gateway", gateway);
    //                returnDict.Add("Subnet", subnet);
    //                returnDict.Add("UnitID", unitID);
    //                returnDict.Add("UserID", userID);
    //                returnDict.Add("Password", password);
    //                returnDict.Add("ConnectionType", connectionType);
    //                returnDict.Add("DLHost", dLHost);
    //                returnDict.Add("Callback", callback);

    //                return Ok(returnDict);
    //            }
    //        }
    //        catch (Exception ex) {
    //            return InternalServerError(ex);
    //        }
    //    }

    //    [HttpPost, Route("Update")]
    //    public IHttpActionResult Post([FromBody]Dictionary<string,string> meterInfo)
    //    {
    //        try
    //        {

    //            Model.Meter meter = new Model.Meter();

    //            int meterId = int.Parse(meterInfo["ID"].ToString());
    //            using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
    //            {
    //                UpdateOrAddMeterFieldValue(connection, meterId, "Phone", meterInfo["Phone"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "ConnectionIP", meterInfo["ConnectionIP"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "InternalIP", meterInfo["InternalIP"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "Gateway", meterInfo["Gateway"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "Subnet", meterInfo["Subnet"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "UnitID", meterInfo["UnitID"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "UserID", meterInfo["UserID"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "Password", meterInfo["Password"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "ConnectionType", meterInfo["ConnectionType"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "DLHost", meterInfo["DLHost"]);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "Callback", meterInfo["Callback"]);
    //                meterInfo.Add("RevisedBy", Thread.CurrentPrincipal.Identity.Name);
    //                UpdateOrAddMeterFieldValue(connection, meterId, "RevisedBy", meterInfo["RevisedBy"]);

    //                return Ok(meterInfo);
    //            }
    //        }
    //        catch(Exception ex)
    //        {
    //            return InternalServerError(ex);
    //        }
    //    }

    //    private void UpdateOrAddMeterFieldValue(AdoDataConnection connection, int meterId, string field, string value) {
    //        MeterFieldValue record = new TableOperations<MeterFieldValue>(connection).QueryRecordWhere($"MeterID = {meterId} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = '{field}')", meterId);

    //        if (record != null)
    //        {
    //            record.Value = value;
    //            new TableOperations<MeterFieldValue>(connection).UpdateRecord(record);
    //        }
    //        else if (record == null && value != string.Empty)
    //        {
    //            record = new MeterFieldValue()
    //            {
    //                MeterID = meterId,
    //                Value = value,
    //                MeterFieldID = connection.ExecuteScalar<int>($"SELECT ID FROM MeterField WHERE Name = '{field}'")
    //            };
    //            new TableOperations<MeterFieldValue>(connection).AddNewRecord(record);
    //        }
    //    }
    //}
}