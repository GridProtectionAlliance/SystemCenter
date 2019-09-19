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
using System.Data;
using System.Linq;
using System.Threading;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.SystemCenter.Meter
{
    [RoutePrefix("api/SystemCenter/Meter/GeneralInfo")]
    public class GeneralMeterInfoController : ApiController
    {
        //[HttpGet, Route("{id}")]
        //public IHttpActionResult Get(int id)
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            Model.Meter meter = new TableOperations<Model.Meter>(connection).QueryRecordWhere("ID = {0}", id);
        //            if (meter == null) return BadRequest("ID does not match any meter.");
        //            Dictionary<string, object> returnDict = new Dictionary<string, object>();

        //            foreach(PropertyDescriptor property  in TypeDescriptor.GetProperties(meter))
        //            {
        //                object value = property.GetValue(meter);
        //                returnDict.Add(property.Name, value);
        //            }

        //            string dataFolder = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'DataFolder')", id);
        //            string inServiceDate = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID =  (SELECT ID FROM MeterField WHERE Name = 'InServiceDate')", id);
        //            string currentStatus = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'CurrentStatus')", id);
        //            string revisedBy = connection.ExecuteScalar<string>("SELECT Value FROM MeterFieldValue WHERE MeterID = {0} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = 'RevisedBy')", id);

        //            returnDict.Add("DataFolder", dataFolder);
        //            returnDict.Add("InServiceDate", inServiceDate);
        //            returnDict.Add("CurrentStatus", currentStatus);
        //            returnDict.Add("RevisedBy", revisedBy);

        //            return Ok(returnDict);
        //        }
        //    }
        //    catch (Exception ex) {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet, Route("TimeZones")]
        //public IHttpActionResult GetTimeZones()
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            DataTable table = connection.RetrieveData(@"
        //                SELECT 
        //                    *
        //                FROM
        //                    ValueList
        //                WHERE
        //                    GroupID = (SELECT ID FROM ValueListGroup WHERE Name = 'MeterTimeZone')
        //            ");

        //            Dictionary<string, string> returnDict = table.Select().ToDictionary(x => x["Value"].ToString(), x => x["Text"].ToString());
        //            return Ok(returnDict);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet, Route("CurrentStatuses")]
        //public IHttpActionResult GetCurrentStatuses()
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            DataTable table = connection.RetrieveData(@"
        //                SELECT 
        //                    *
        //                FROM
        //                    ValueList
        //                WHERE
        //                    GroupID = (SELECT ID FROM ValueListGroup WHERE Name = 'MeterCurrentStatus')
        //            ");

        //            Dictionary<string, string> returnDict = table.Select().ToDictionary(x => x["Value"].ToString(), x => x["Text"].ToString());
        //            return Ok(returnDict);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}



        //[HttpPost, Route("Update")]
        //public IHttpActionResult Post([FromBody]Dictionary<string,string> meterInfo)
        //{
        //    try
        //    {

        //        Model.Meter meter = new Model.Meter();

        //        foreach (PropertyDescriptor property in TypeDescriptor.GetProperties(meter))
        //        {
        //            Type type = property.PropertyType;

        //            if(type == typeof(int))
        //                property.SetValue(meter, int.Parse(meterInfo[property.Name]));
        //            else if (type == typeof(string))
        //                property.SetValue(meter, meterInfo[property.Name]);

        //        }

        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            UpdateOrAddMeterFieldValue(connection, meter, "DataFolder", meterInfo["DataFolder"]);
        //            UpdateOrAddMeterFieldValue(connection, meter, "InServiceDate", meterInfo["InServiceDate"]);
        //            UpdateOrAddMeterFieldValue(connection, meter, "CurrentStatus", meterInfo["CurrentStatus"]);
        //            UpdateOrAddMeterFieldValue(connection, meter, "RevisedBy", Thread.CurrentPrincipal.Identity.Name);
        //            new TableOperations<Model.Meter>(connection).UpdateRecord(meter);
        //            meterInfo["RevisedBy"] = Thread.CurrentPrincipal.Identity.Name;
        //            return Ok(meterInfo);
        //        }
        //    }
        //    catch(Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //private void UpdateOrAddMeterFieldValue(AdoDataConnection connection, Model.Meter meter, string field, string value) {
        //    MeterFieldValue record = new TableOperations<MeterFieldValue>(connection).QueryRecordWhere($"MeterID = {meter.ID} AND MeterFieldID = (SELECT ID FROM MeterField WHERE Name = '{field}')", meter.ID);

        //    if (record != null)
        //    {
        //        record.Value = value;
        //        new TableOperations<MeterFieldValue>(connection).UpdateRecord(record);
        //    }
        //    else if (record == null && value != string.Empty)
        //    {
        //        record = new MeterFieldValue()
        //        {
        //            MeterID = meter.ID,
        //            Value = value,
        //            MeterFieldID = connection.ExecuteScalar<int>($"SELECT ID FROM MeterField WHERE Name = '{field}'")
        //        };
        //        new TableOperations<MeterFieldValue>(connection).AddNewRecord(record);
        //    }
        //}

        //[HttpDelete, Route("{id}")]
        //public IHttpActionResult Delete(int id)
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'Meter', 'ID = {id}'");

        //            return Ok(id);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

    }
}