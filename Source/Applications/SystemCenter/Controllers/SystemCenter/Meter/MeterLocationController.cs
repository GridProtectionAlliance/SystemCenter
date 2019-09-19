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

namespace SystemCeneter.Controllers.SystemCenter.Meter
{
    [RoutePrefix("api/SystemCenter/Meter/MeterLocation")]
    public class MeterLocationController : ApiController
    {
        //[HttpGet, Route("{id}")]
        //public IHttpActionResult Get(int id)
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            MeterLocation meterLocation = new TableOperations<MeterLocation>(connection).QueryRecordWhere("ID = (SELECT MeterLocationID FROM Meter WHERE ID = {0})", id);
        //            if (meterLocation == null) return BadRequest("ID does not match any meter.");
        //            Dictionary<string, object> returnDict = new Dictionary<string, object>();

        //            foreach(PropertyDescriptor property  in TypeDescriptor.GetProperties(meterLocation))
        //            {
        //                object value = property.GetValue(meterLocation);
        //                returnDict.Add(property.Name, value);
        //            }

        //            string eMPACName = connection.ExecuteScalar<string>("SELECT Value FROM MeterLocationFieldValue WHERE MeterLocationID = {0} AND MeterLocationFieldID = (SELECT ID FROM MeterLocationField WHERE Name = 'EMPACName')", meterLocation.ID);
        //            string tsc = connection.ExecuteScalar<string>("SELECT Value FROM MeterLocationFieldValue WHERE MeterLocationID = {0} AND MeterLocationFieldID =  (SELECT ID FROM MeterLocationField WHERE Name = 'TSC')", meterLocation.ID);
        //            string sector = connection.ExecuteScalar<string>("SELECT Value FROM MeterLocationFieldValue WHERE MeterLocationID = {0} AND MeterLocationFieldID = (SELECT ID FROM MeterLocationField WHERE Name = 'Sector')", meterLocation.ID);
        //            string locationType = connection.ExecuteScalar<string>("SELECT Value FROM MeterLocationFieldValue WHERE MeterLocationID = {0} AND MeterLocationFieldID = (SELECT ID FROM MeterLocationField WHERE Name = 'LocationType')", meterLocation.ID);

        //            returnDict.Add("EMPACName", eMPACName);
        //            returnDict.Add("TSC", tsc);
        //            returnDict.Add("Sector", sector);
        //            returnDict.Add("LocationType", locationType);

        //            return Ok(returnDict);
        //        }
        //    }
        //    catch (Exception ex) {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet, Route("MeterLocation/{id}")]
        //public IHttpActionResult GetMeterLocation(int id)
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            MeterLocation meterLocation = new TableOperations<MeterLocation>(connection).QueryRecordWhere("ID = {0}", id);
        //            if (meterLocation == null) return BadRequest("ID does not match any meter.");
        //            Dictionary<string, object> returnDict = new Dictionary<string, object>();

        //            foreach (PropertyDescriptor property in TypeDescriptor.GetProperties(meterLocation))
        //            {
        //                object value = property.GetValue(meterLocation);
        //                returnDict.Add(property.Name, value);
        //            }

        //            string eMPACName = connection.ExecuteScalar<string>("SELECT Value FROM MeterLocationFieldValue WHERE MeterLocationID = {0} AND MeterLocationFieldID = (SELECT ID FROM MeterLocationField WHERE Name = 'EMPACName')", id);
        //            string tsc = connection.ExecuteScalar<string>("SELECT Value FROM MeterLocationFieldValue WHERE MeterLocationID = {0} AND MeterLocationFieldID =  (SELECT ID FROM MeterLocationField WHERE Name = 'TSC')", id);
        //            string sector = connection.ExecuteScalar<string>("SELECT Value FROM MeterLocationFieldValue WHERE MeterLocationID = {0} AND MeterLocationFieldID = (SELECT ID FROM MeterLocationField WHERE Name = 'Sector')", id);
        //            string locationType = connection.ExecuteScalar<string>("SELECT Value FROM MeterLocationFieldValue WHERE MeterLocationID = {0} AND MeterLocationFieldID = (SELECT ID FROM MeterLocationField WHERE Name = 'LocationType')", id);

        //            returnDict.Add("EMPACName", eMPACName);
        //            returnDict.Add("TSC", tsc);
        //            returnDict.Add("Sector", sector);
        //            returnDict.Add("LocationType", locationType);

        //            return Ok(returnDict);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}


        //[HttpGet, Route("LocationTypes")]
        //public IHttpActionResult GetLocationTypes()
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
        //                    GroupID = (SELECT ID FROM ValueListGroup WHERE Name = 'MeterLocationLocationType')
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

        //[HttpGet, Route("AllLocations")]
        //public IHttpActionResult GetAllLocations()
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            DataTable table = connection.RetrieveData(@"
        //                SELECT 
        //                    ID, AssetKey
        //                FROM
        //                    MeterLocation
        //            ");

        //            Dictionary<int, string> returnDict = table.Select().ToDictionary(x => int.Parse(x["ID"].ToString()), x => x["AssetKey"].ToString());
        //            return Ok(returnDict);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}



        //[HttpPost, Route("Update")]
        //public IHttpActionResult Post([FromBody]Dictionary<string,string> meterLocationInfo)
        //{
        //    try
        //    {

        //        MeterLocation meterLocation = new MeterLocation();
        //        foreach (PropertyDescriptor property in TypeDescriptor.GetProperties(meterLocation))
        //        {
        //            Type type = property.PropertyType;

        //            if(type == typeof(int))
        //                property.SetValue(meterLocation, int.Parse(meterLocationInfo[property.Name]));
        //            else if (type == typeof(double))
        //                property.SetValue(meterLocation, double.Parse(meterLocationInfo[property.Name]));
        //            else if (type == typeof(string))
        //                property.SetValue(meterLocation, meterLocationInfo[property.Name]);

        //        }

        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            Model.Meter meter = new TableOperations<Model.Meter>(connection).QueryRecordWhere("ID = {0}", int.Parse(meterLocationInfo["MeterID"].ToString()));
        //            if (meter.MeterLocationID != meterLocation.ID)
        //            {
        //                meter.MeterLocationID = meterLocation.ID;
        //                new TableOperations<Model.Meter>(connection).UpdateRecord(meter);
        //            }
        //            UpdateOrAddMeterLocationFieldValue(connection, meterLocation.ID, "EMPACName", meterLocationInfo["EMPACName"]);
        //            UpdateOrAddMeterLocationFieldValue(connection, meterLocation.ID, "TSC", meterLocationInfo["TSC"]);
        //            UpdateOrAddMeterLocationFieldValue(connection, meterLocation.ID, "Sector", meterLocationInfo["Sector"]);
        //            UpdateOrAddMeterLocationFieldValue(connection, meterLocation.ID, "LocationType", meterLocationInfo["LocationType"]);
        //            UpdateOrAddMeterFieldValue(connection, meter.ID, "RevisedBy", Thread.CurrentPrincipal.Identity.Name);
        //            new TableOperations<MeterLocation>(connection).UpdateRecord(meterLocation);
        //            meterLocationInfo["RevisedBy"] = Thread.CurrentPrincipal.Identity.Name;
        //            return Ok(meterLocationInfo);
        //        }
        //    }
        //    catch(Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpPost, Route("AddNew")]
        //public IHttpActionResult PostAddNew([FromBody]Dictionary<string, string> meterLocationInfo)
        //{
        //    try
        //    {

        //        MeterLocation meterLocation = new MeterLocation();

        //        foreach (PropertyDescriptor property in TypeDescriptor.GetProperties(meterLocation))
        //        {
        //            Type type = property.PropertyType;

        //            if (type == typeof(int))
        //                property.SetValue(meterLocation, int.Parse(meterLocationInfo[property.Name]));
        //            else if (type == typeof(double))
        //                property.SetValue(meterLocation, double.Parse(meterLocationInfo[property.Name]));
        //            else if (type == typeof(string))
        //                property.SetValue(meterLocation, meterLocationInfo[property.Name]);

        //        }

        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            new TableOperations<MeterLocation>(connection).AddNewRecord(meterLocation);
        //            int meterLocationID = connection.ExecuteScalar<int>("SELECT ID FROM MeterLocation WHERE AssetKey = {0}", meterLocation.AssetKey);
        //            UpdateOrAddMeterLocationFieldValue(connection, meterLocationID, "EMPACName", meterLocationInfo["EMPACName"]);
        //            UpdateOrAddMeterLocationFieldValue(connection, meterLocationID, "TSC", meterLocationInfo["TSC"]);
        //            UpdateOrAddMeterLocationFieldValue(connection, meterLocationID, "Sector", meterLocationInfo["Sector"]);
        //            UpdateOrAddMeterLocationFieldValue(connection, meterLocationID, "LocationType", meterLocationInfo["LocationType"]);
        //            UpdateOrAddMeterFieldValue(connection, int.Parse(meterLocationInfo["MeterID"].ToString()), "RevisedBy", Thread.CurrentPrincipal.Identity.Name);
        //            connection.ExecuteNonQuery("UPDATE Meter SET MeterLocationID = {0} WHERE ID = {1}", meterLocationID, int.Parse(meterLocationInfo["MeterID"].ToString()));
        //            meterLocationInfo["ID"] = meterLocationID.ToString();
        //            meterLocationInfo["RevisedBy"] = Thread.CurrentPrincipal.Identity.Name;
        //            return Ok(meterLocationInfo);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //private void UpdateOrAddMeterFieldValue(AdoDataConnection connection, int meterID, string field, string value) {
        //    MeterFieldValue record = new TableOperations<MeterFieldValue>(connection).QueryRecordWhere($"MeterID = {meterID} AND MeterFieldID = (SELECT ID FROM MeterLocationField WHERE Name = '{field}')", meterID);

        //    if (record != null)
        //    {
        //        record.Value = value;
        //        new TableOperations<MeterFieldValue>(connection).UpdateRecord(record);
        //    }
        //    else if (record == null && value != string.Empty && value != null)
        //    {
        //        record = new MeterFieldValue()
        //        {
        //            MeterID = meterID,
        //            Value = value,
        //            MeterFieldID = connection.ExecuteScalar<int>($"SELECT ID FROM MeterField WHERE Name = '{field}'")
        //        };
        //        new TableOperations<MeterFieldValue>(connection).AddNewRecord(record);
        //    }
        //}

        //private void UpdateOrAddMeterLocationFieldValue(AdoDataConnection connection, int meterLocationID, string field, string value)
        //{
        //    MeterLocationFieldValue record = new TableOperations<MeterLocationFieldValue>(connection).QueryRecordWhere($"MeterLocationID = {meterLocationID} AND MeterLocationFieldID = (SELECT ID FROM MeterLocationField WHERE Name = '{field}')", meterLocationID);

        //    if (record != null)
        //    {
        //        record.Value = value;
        //        new TableOperations<MeterLocationFieldValue>(connection).UpdateRecord(record);
        //    }
        //    else if (record == null && value != string.Empty)
        //    {
        //        record = new MeterLocationFieldValue()
        //        {
        //            MeterLocationID = meterLocationID,
        //            Value = value,
        //            MeterLocationFieldID = connection.ExecuteScalar<int>($"SELECT ID FROM MeterLocationField WHERE Name = '{field}'")
        //        };
        //        new TableOperations<MeterLocationFieldValue>(connection).AddNewRecord(record);
        //    }
        //}


        //[HttpDelete, Route("Delete/{id}")]
        //public IHttpActionResult Delete(int id)
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            int newMeterLocationID = connection.ExecuteScalar<int>("SELECT TOP 1 ID FROM MeterLocation WHERE ID != {0} ORDER BY ID", id);
        //            connection.ExecuteNonQuery("UPDATE Meter SET MeterLocationID = {0} WHERE MeterLocationID = {1}", newMeterLocationID, id);
        //            connection.ExecuteNonQuery($"EXEC UniversalCascadeDelete 'MeterLocation', 'ID = {id}'");

        //            return GetMeterLocation(newMeterLocationID);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

    }
}