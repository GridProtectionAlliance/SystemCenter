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
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using GSF.Security.Model;
using GSF.Web;
using GSF.Web.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using openXDA.Model;
using PQView.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/DataOperation")]
    public class DataOperationController : ModelController<DataOperation> { }
    [RoutePrefix("api/OpenXDA/DataReader")]
    public class DataReaderController : ModelController<DataReader> { }

    [RoutePrefix("api/OpenXDA/AssetType")]
    public class AssetTypeController : ModelController<AssetTypes> {}

    [RoutePrefix("api/OpenXDA/Phase")]
    public class PhaseController:ModelController<Phase> {}

    [RoutePrefix("api/OpenXDA/ByAsset")]
    public class OpenXDAByAssetController : DetailedAssetController<DetailedAsset>
    {
        private string findAssetsQuery = "ID not in (Select LocalXDAAssetID From AssetsToDataPush Where RemoteXDAInstanceID = {0}) and ID in (Select AssetID From MeterAsset Where MeterID = {1})";
        [HttpGet, Route("Associated/Count/{remoteInstanceID}/{meterID}")]
        public virtual IHttpActionResult GetAssociatedAssets(int remoteInstanceID, int meterID)
        {
            if (GetAuthCheck() && !AllowSearch)
                return Unauthorized();
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    return Ok(JsonConvert.SerializeObject(new TableOperations<Asset>(connection)
                        .QueryRecordsWhere(findAssetsQuery, remoteInstanceID, meterID)
                        .Count()));
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [HttpGet, Route("Associated/Add/{remoteInstanceID}/{meterID}")]
        public virtual IHttpActionResult AddAssociatedAssets(int remoteInstanceID, int meterID)
        {
            //Even though this is a get request, doing a post check
            if (PostAuthCheck() && !ViewOnly)
                return Unauthorized();
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    IEnumerable<Asset> additionalAssets = new TableOperations<Asset>(connection)
                        .QueryRecordsWhere(findAssetsQuery, remoteInstanceID, meterID);
                    TableOperations<AssetsToDataPush> assetDataPushTable = new TableOperations<AssetsToDataPush>(connection);
                    AssetsToDataPush newRecord = new AssetsToDataPush
                    {
                        RemoteXDAInstanceID = remoteInstanceID,
                        RemoteXDAAssetID = -1,
                        RemoteXDAAssetKey = "",
                        Obsfucate = false,
                        Synced = false,
                        // This will be set later by OpenXDA if it does not exist remotely already
                        RemoteAssetCreatedByDataPusher = false

                    };
                    int result = 0;
                    foreach (Asset asset in additionalAssets)
                    {
                        newRecord.LocalXDAAssetID = asset.ID;
                        result += assetDataPushTable.AddNewRecord(newRecord);
                    }
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }

    [RoutePrefix("api/OpenXDA/ByMeter")]
    public class OpenXDAByMeterController : ModelController<DetailedMeter> { }

    [RoutePrefix("api/OpenXDA/MeasurementType")]
    public class MeasurementTypeController:ModelController<MeasurementType> {}

    [RoutePrefix("api/OpenXDA/MeasurementCharacteristic")]
    public class MeasurementCharacteristicController : ModelController<MeasurementCharacteristic> {}

    [RoutePrefix("api/OpenXDA/AssetConnection")]
    public class OpenXDAAssetConnectionController : ModelController<AssetConnection> { }

    [RoutePrefix("api/OpenXDA/AssetConnectionType")]
    public class OpenXDAAssetConnectionTypeController : ModelController<AssetConnectionType> { }

    [RoutePrefix("api/OpenXDA/Note")]
    public class NoteController : ModelController<Notes> 
    {
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (User.IsInRole(PostRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        Notes newRecord = record.ToObject<Notes>();

                        newRecord.UserAccount = User.Identity.Name;
                        int result = new TableOperations<Notes>(connection).AddNewRecord(newRecord);
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
    [RoutePrefix("api/OpenXDA/ExternalDBTables")]
    public class ExtDBTablesController : ModelController<SystemCenter.Model.extDBTables> { }

    [RoutePrefix("api/OpenXDA/Bus")]
    public class OpenXDABusController : ModelController<Bus> 
    {
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
                                                        {afTbl}.ParentTable = 'Bus'
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

    [RoutePrefix("api/OpenXDA/CapacitorBank")]
    public class OpenXDACapBankController : ModelController<CapBank> 
    {
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
                                                        {afTbl}.ParentTable = 'CapBank'
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

    [RoutePrefix("api/OpenXDA/CapacitorBankRelay")]
    public class OpenXDACapBankRelayController : ModelController<CapBankRelay> {
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
                                                        {afTbl}.ParentTable = 'CapBankRelay'
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

    [RoutePrefix("api/OpenXDA/Transformer")]
    public class OpenXDATransformerController : ModelController<Transformer> 
    {
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
                                                        {afTbl}.ParentTable = 'Transformer'
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


    [RoutePrefix("api/OpenXDA/DER")]
    public class OpenXDADERController : ModelController<DER>
    {
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
                                                        {afTbl}.ParentTable = 'DER'
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


    [RoutePrefix("api/OpenXDA/NoteType")]
    public class NoteTypeController : ModelController<NoteType> {}

    [RoutePrefix("api/OpenXDA/NoteTag")]
    public class NoteTagController : ModelController<NoteTag> { }

    [RoutePrefix("api/OpenXDA/NoteApp")]
    public class NoteAppController : ModelController<NoteApplication> { }

    [RoutePrefix("api/OpenXDA/ApplicationRole")]
    public class OpenXDAApplicationRoleController : ModelController<ApplicationRole> {}

    [RoutePrefix("api/OpenXDA/ApplicationRoleUserAccount")]
    public class OpenXDAApplicationRoleUserAccountController : ModelController<ApplicationRoleUserAccount>
    {
        

        [HttpPatch, Route("UpdateArray")]
        public IHttpActionResult PatchArray([FromBody] IEnumerable<ApplicationRoleUserAccount> records)
        {
            try
            {
                if (PatchRoles == string.Empty || User.IsInRole(PatchRoles))
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        IEnumerable<ApplicationRoleUserAccount> applicationRoles = new TableOperations<ApplicationRoleUserAccount>(connection).QueryRecordsWhere("UserAccountID = {0}", records.First().UserAccountID);

                        foreach (ApplicationRoleUserAccount applicationRole in applicationRoles)
                        {
                            if (records.FirstOrDefault(r => r.ApplicationRoleID == applicationRole.ApplicationRoleID) == null)
                                new TableOperations<ApplicationRoleUserAccount>(connection).DeleteRecord(applicationRole);
                        }

                        foreach (ApplicationRoleUserAccount record in records)
                        {
                            if (applicationRoles.FirstOrDefault(r => r.ApplicationRoleID == record.ApplicationRoleID) == null)
                                new TableOperations<ApplicationRoleUserAccount>(connection).AddNewRecord(record);
                        }

                        return Ok("Updated Roles without error.");
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

    [RoutePrefix("api/OpenXDA/CompanyType")]
    public class CompanyTypeController : ModelController<CompanyType> { }



    [AllowSearch,TableName("Company")]
    public class SCCompany : Company { }
    [RoutePrefix("api/OpenXDA/Company")]
    public class CompanyController : ModelController<SCCompany> {}

    [RoutePrefix("api/OpenXDA/CompanyMeter")]
    public class CompanyMeterController : ModelController<CompanyMeter>
    {
        [HttpPost, Route("AddMultiple")]
        public IHttpActionResult AddMultipleCompanyMeter(IEnumerable<CompanyMeter> companyMeters)
        {
            try
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    foreach (CompanyMeter companyMeter in companyMeters)
                        new TableOperations<CompanyMeter>(connection).AddNewRecord(companyMeter);

                    return Ok("Added all records without error.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }

    [RoutePrefix("api/OpenXDA/PQViewSite")]
    public class PQViewSiteCotnroller : ModelController<Site> { }

    [RoutePrefix("api/OpenXDA/ApplicationNode")]
    public class ApplicationNodeController : ModelController<ApplicationNode> { }

    [RoutePrefix("api/OpenXDA/MeterDataQualitySummary")]
    public class MeterDataQualitySummaryController : ModelController<MeterDataQualitySummary> { }

    [RoutePrefix("api/OpenXDA/remoteXDAInstance")]
    public class RemoteXDAInstanceController : ModelController<RemoteXDAInstance> { }

    [RoutePrefix("api/OpenXDA/RemoteXDAAsset")]
    public class RemoteXDAAssetController : ModelController<RemoteXDAAsset>
    {
        /// <summary>
        /// Adds a new Record by casting RemoteXDAAsset to its base class AssetsToDataPush.
        /// </summary>
        /// <param name="record"> The <typeparamref name="RemoteXDAAsset"/> record to be added.</param>
        /// <returns><see cref="IHttpActionResult"/> containing the added record or <see cref="Exception"/> </returns>
        public override IHttpActionResult Patch([FromBody] RemoteXDAAsset record)
        {
            try
            {
                if (PatchAuthCheck())
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        if (record.RemoteXDAAssetID > 0)
                            throw new Exception("Unable to modifiy entry, entry already exists remotely.");
                        int result = new TableOperations<AssetsToDataPush>(connection).AddNewOrUpdateRecord(record);
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

        /// <summary>
        /// Deletes an existing Record by casting RemoteXDAAsset to its base class AssetsToDataPush
        /// </summary>
        /// <param name="record"> The <typeparamref name="RemoteXDAAsset"/> record to be deleted.</param>
        /// <returns><see cref="IHttpActionResult"/> containing the number of records deleted or <see cref="Exception"/> </returns>
        public override IHttpActionResult Delete(RemoteXDAAsset record)
        {
            try
            {
                if (DeleteAuthCheck())
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        if (record.RemoteXDAAssetID > 0)
                            throw new Exception("Unable to modifiy entry, entry already exists remotely.");
                        int result = new TableOperations<AssetsToDataPush>(connection).DeleteRecord(record.ID);
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

        /// <summary>
        /// Adds a new Record.
        /// </summary>
        /// <param name="record"> The <typeparamref name="RemoteXDAAsset"/> record to be added.</param>
        /// <returns><see cref="IHttpActionResult"/> containing the added record or <see cref="Exception"/> </returns>
        public virtual IHttpActionResult Post([FromBody] RemoteXDAAsset record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        // Add data push (or update)
                        int result = new TableOperations<AssetsToDataPush>(connection).AddNewOrUpdateRecord(record);
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

    [RoutePrefix("api/OpenXDA/RemoteXDAMeter")]
    public class RemoteXDAMeterController : ModelController<RemoteXDAMeter>
    {
        /// <summary>
        /// Updates a Record by casting RemoteXDAAsset to its base class AssetsToDataPush.
        /// </summary>
        /// <param name="record"> The <typeparamref name="RemoteXDAMeter"/> record to be added.</param>
        /// <returns><see cref="IHttpActionResult"/> containing the added record or <see cref="Exception"/> </returns>
        public override IHttpActionResult Patch([FromBody] RemoteXDAMeter record)
        {
            try
            {
                if (PatchAuthCheck())
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        if (record.RemoteXDAMeterID > 0)
                            throw new Exception("Unable to modifiy entry, entry already exists remotely.");
                        int result = new TableOperations<MetersToDataPush>(connection).AddNewOrUpdateRecord(record);
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

        /// <summary>
        /// Deletes an existing Record by casting RemoteXDAAsset to its base class AssetsToDataPush
        /// </summary>
        /// <param name="record"> The <typeparamref name="RemoteXDAMeter"/> record to be deleted.</param>
        /// <returns><see cref="IHttpActionResult"/> containing the number of records deleted or <see cref="Exception"/> </returns>
        public override IHttpActionResult Delete(RemoteXDAMeter record)
        {
            try
            {
                if (DeleteAuthCheck())
                {

                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        if (record.RemoteXDAMeterID > 0)
                            throw new Exception("Unable to modifiy entry, entry already exists remotely.");
                        int result = new TableOperations<MetersToDataPush>(connection).DeleteRecord(record.ID);
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

        /// <summary>
        /// Adds a new Record.
        /// </summary>
        /// <param name="record"> The <typeparamref name="RemoteXDAMeter"/> record to be added.</param>
        /// <returns><see cref="IHttpActionResult"/> containing the added record or <see cref="Exception"/> </returns>
        public virtual IHttpActionResult Post([FromBody] RemoteXDAMeter record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        int result = new TableOperations<MetersToDataPush>(connection).AddNewRecord(record);
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

    [RoutePrefix("api/OpenXDA/MetersToDataPush")]
    public class MetersToDataPushController : ModelController<MetersToDataPush> { }

    [RoutePrefix("api/OpenXDA/Alive")]
    public class AliveCheckerController : ApiController
    {
        public static string LocalXDAInstance
        {
            get
            {
                using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
                {
                    return new TableOperations<openXDA.Model.Setting>(connection).QueryRecordWhere("Name = 'LocalXDAInstance'").Value ?? "http://127.0.0.1:8989";
                }
            }
        }
        [HttpGet, Route("{instanceId:int}")]
        public IHttpActionResult TestRemoteXDAConnection(int instanceId)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(LocalXDAInstance);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    // client.DefaultRequestHeaders.Authorization = 

                    HttpResponseMessage response = client.GetAsync($"api/DataPusher/TestRemoteInstanceConnection/{instanceId}").Result;

                    if (!response.IsSuccessStatusCode)
                        throw new Exception("Could send request to local XDA instance.");

                    return Ok(0);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}





