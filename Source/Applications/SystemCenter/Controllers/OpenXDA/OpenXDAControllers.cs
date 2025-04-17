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
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Security.Model;
using GSF.Web.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using openXDA.APIAuthentication;
using openXDA.Configuration;
using openXDA.Model;
using PQView.Model;
using SEBrowser.Controllers.OpenXDA;
using SystemCenter.Model;
using ConfigurationLoader = SystemCenter.Model.ConfigurationLoader;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/SourceImpedance")]
    public class SourceImpedanceController : ModelController<SourceImpedance> { }
    [RoutePrefix("api/OpenXDA/EventType")]
    public class EventTypeController : ModelController<EventType> { }
    
    [RoutePrefix("api/OpenXDA/EventTypeAssetType")]
    public class EventTypeAssetTypeController : ModelController<EventTypeAssetType> { }

    [RoutePrefix("api/OpenXDA/DataOperation")]
    public class DataOperationController : ModelController<DataOperation> { }
    [RoutePrefix("api/OpenXDA/DataOperationFailure")]
    public class DataOperationFailureController : ModelController<DataOperationFailureDetails> { }
    [RoutePrefix("api/OpenXDA/DataReader")]
    public class DataReaderController : ModelController<DataReader> { }

    [RoutePrefix("api/OpenXDA/AssetType")]
    public class AssetTypeController : ModelController<AssetTypes> {}

    [RoutePrefix("api/OpenXDA/Phase")]
    public class PhaseController:ModelController<Phase> {}

    [RoutePrefix("api/OpenXDA/ByLineSegment")]
    public class ByLineSegmentController : ModelController<LineSegment> { }

    // ToDo: ByAsset and ByRestrictedDetailedAsset should eventually be combined, but only when it is assured that this combination will not break things
    [RoutePrefix("api/OpenXDA/ByRestrictedDetailedAsset")]
    public class RestrictedDetailedAssetController : ModelController<RestrictedDetailedAsset> { }

    [RoutePrefix("api/OpenXDA/ByAsset")]
    public class OpenXDAByAssetController : DetailedAssetController<DetailedAsset> // use ModelController instead of DAC<>
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
                        Obsfucate = false,
                        Synced = false,
                        // This will be set later by OpenXDA if it does not exist remotely already
                        RemoteAssetCreatedByDataPusher = false

                    };
                    int result = 0;
                    foreach (Asset asset in additionalAssets)
                    {
                        newRecord.LocalXDAAssetID = asset.ID;
                        newRecord.RemoteXDAAssetKey = asset.AssetKey;
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
        [HttpPost, Route("RetrieveExternalRecord")]
        public IHttpActionResult RetrieveExternalRecord([FromBody] JObject query)
        {
            if (!PostAuthCheck())
                return Unauthorized();
            try
            {
                using (AdoDataConnection xdaConnection = new AdoDataConnection(Connection))
                    return Ok(ExternalModelController<DetailedAsset>.ExecuteExternalQuery(query, xdaConnection));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }

    [RoutePrefix("api/OpenXDA/ByMeter")]
    public class OpenXDAByMeterController : ExternalModelController<DetailedMeter> { }

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

    [RoutePrefix("api/OpenXDA/Bus")]
    public class OpenXDABusController : ModelController<Bus> { }

    [RoutePrefix("api/OpenXDA/Generation")]
    public class OpenXDAGenController : ModelController<Generation> { }

    [RoutePrefix("api/OpenXDA/StationAux")]
    public class OpenXDAAuxController : ModelController<StationAux> { }

    [RoutePrefix("api/OpenXDA/StationBattery")]
    public class OpenXDABatteryController : ModelController<StationBattery> { }

    [RoutePrefix("api/OpenXDA/CapacitorBank")]
    public class OpenXDACapBankController : ModelController<CapBank> { }

    [RoutePrefix("api/OpenXDA/CapacitorBankRelay")]
    public class OpenXDACapBankRelayController : ModelController<CapBankRelay> { }

    [RoutePrefix("api/OpenXDA/Transformer")]
    public class OpenXDATransformerController : ModelController<Transformer> { }

    [RoutePrefix("api/OpenXDA/DER")]
    public class OpenXDADERController : ModelController<DER> { }

    [RoutePrefix("api/OpenXDA/NoteType")]
    public class NoteTypeController : ModelController<NoteType> {}

    [RoutePrefix("api/OpenXDA/NoteTag")]
    public class NoteTagController : ModelController<NoteTag> { }

    [RoutePrefix("api/OpenXDA/NoteApp")]
    public class NoteAppController : ModelController<NoteApplication> { }

    [AllowSearch]
    [PostRoles("Administrator")]
    [DeleteRoles("Administrator")]
    [PatchRoles("Administrator")]
    public class APIAccessKey
    {
        [PrimaryKey(true)]
        public int ID { get; set; }
        public string RegistrationKey { get; set; }
        public string APIToken { get; set; }
        public DateTime? Expires { get; set; }
        public bool AllowImpersonation { get; set; }
    }
    [RoutePrefix("api/OpenXDA/APIAccessKey")]
    public class APIAccessKeyController : ModelController<APIAccessKey>
    {
        //Mask API Tokens before returning data
        protected override IEnumerable<APIAccessKey> QueryRecords(string sortBy, bool ascending)
        {
            return base.QueryRecords(sortBy, ascending).Select(MaskAPIToken);
        }
        protected override DataTable GetSearchResults(PostData postData, int? page = null)
        {
            DataTable table = base.GetSearchResults(postData, page);
            foreach (DataRow row in table.Rows)
                MaskAPIToken(row);
            return table;
        }
        protected override APIAccessKey QueryRecordWhere(string filterExpression, params object[] parameters) 
        { 
            return MaskAPIToken(base.QueryRecordWhere(filterExpression, parameters));
        }
        protected override IEnumerable<APIAccessKey> QueryRecordsWhere(string orderBy, bool ascending, string filterExpression, params object[] parameters) 
        {
            return base.QueryRecordsWhere(orderBy, ascending, filterExpression, parameters).Select(MaskAPIToken);
        }
        // Helper method to mask APIToken
        private APIAccessKey MaskAPIToken(APIAccessKey record)
        {
            record.APIToken = "**************************";
            return record;
        }
        private DataRow MaskAPIToken(DataRow record)
        {
            record["APIToken"] = "**************************";
            return record;
        }

    }


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

    [RoutePrefix("api/OpenXDA/PQViewSite")]
    public class PQViewSiteCotnroller : ModelController<Site> { }

    [RoutePrefix("api/OpenXDA/ApplicationNode")]
    public class ApplicationNodeController : ModelController<ApplicationNode> { }

    [RoutePrefix("api/OpenXDA/MeterDataQualitySummary")]
    public class MeterDataQualitySummaryController : ModelController<MeterDataQualitySummary> { }

    [RoutePrefix("api/OpenXDA/remoteXDAInstance"), HttpEditionFilter(Edition.Enterprise)]
    public class RemoteXDAInstanceController : ModelController<RemoteXDAInstance>
    {
        #region [Properties]
        private class Settings
        {
            public Settings(Action<object> configure) =>
                configure(this);

            [Category]
            [SettingName("XDA")]
            public APIConfiguration APISettings { get; } = new APIConfiguration();
        }
        #endregion

        #region [HttpMethods]
        [HttpGet, Route("Alive/{remoteInstanceID}")]
        public IHttpActionResult TestRemoteXDAConnection(int remoteInstanceID)
        {
            if (GetAuthCheck() && !AllowSearch)
                return Unauthorized();
            try
            {
                Task<string> responseTask = SendGetRequest($"/api/DataPusher/TestConnection/{remoteInstanceID}");
                return Ok(responseTask.Result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // #ToDo check what ClienID is used for on the openXDA side.. most likely not necessary
        [HttpGet, Route("ConfigPush/{remoteInstanceID}")]
        public virtual IHttpActionResult PushRemoteConfig(int remoteInstanceID)
        {
            if (GetAuthCheck() && !AllowSearch)
                return Unauthorized();
            try
            {
                Task<string> responseTask = SendGetRequest($"/api/DataPusher/SyncInstanceConfig/SystemCenter/{remoteInstanceID}");
                return Ok("1");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        //Todo: Think about moving this into API Auth Module
        public async Task<string> SendGetRequest(string requestURI)
        {
            APIConfiguration settings = new Settings(new ConfigurationLoader(CreateDbConnection).Configure).APISettings;

            APIQuery query = new APIQuery(settings.Key, settings.Token, settings.Host.Split(';'));
            void ConfigureRequest(HttpRequestMessage request)
            {
                request.Method = HttpMethod.Get;
            }
            HttpResponseMessage responseMessage = await query.SendWebRequestAsync(ConfigureRequest, requestURI).ConfigureAwait(false);
            if (!responseMessage.IsSuccessStatusCode)
            {
                throw new Exception("Status code " + responseMessage.StatusCode + ": " + responseMessage.ReasonPhrase);
            }

            return await responseMessage.Content.ReadAsStringAsync().ConfigureAwait(false);

        }

        private AdoDataConnection CreateDbConnection()
        {
            AdoDataConnection connection = new AdoDataConnection(Connection);
            connection.DefaultTimeout = DataExtensions.DefaultTimeoutDuration;
            return connection;
        }
        #endregion
    }

    [RoutePrefix("api/OpenXDA")]
    public class GeneralController : ApiController
    {
        OpenXDAApi api = new OpenXDAApi();

        [HttpGet, Route("Tiles/GetAll")]
        public IHttpActionResult GetAllTiles()
        {
            try
            {
                Task<string> responseTask = api.GetAsync($"/api/TileList/GetAll");
                object json_obj = JsonConvert.DeserializeObject(responseTask.Result);
                return Json(json_obj);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("GetEditionComparitor")]
        public IHttpActionResult GetEditionComparitor()
        {
            // Ensuring XDA is in lockstep with us
            Task<string> responseTask = api.GetAsync($"/api/GetEdition");
            EditionChecker.UpdateEdition();
            // Build comparitor object for typescript
            JObject editionComparitor = new JObject();
            foreach (Edition edition in Enum.GetValues(typeof(Edition))) editionComparitor.Add(edition.ToString(), EditionChecker.CheckEdition(edition));
            return Ok(editionComparitor);
        }

        //Note: if we make a SCADA point model controller, we may want move this to that
        [Route("SCADAPoint/SCADAPointSearch"), HttpPost]
        public async Task<IHttpActionResult> QuerySCADADataPoints([FromBody] JObject query, CancellationToken token)
        {
            OpenXDAApi.RefreshSettings();
            using (HttpResponseMessage response = api
                .GetResponseTask($"api/SystemCenter/SCADAPoint/SCADAPointSearch", new StringContent(query.ToString(), Encoding.UTF8, "application/json"))
                .Result)
            {
                response.EnsureSuccessStatusCode();
                string result = await response.Content.ReadAsStringAsync();
                return Ok(result);
            };
        }
    }

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
                        int result = new TableOperations<AssetsToDataPush>(connection).UpdateRecord(record);
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
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        AssetsToDataPush newRecord = record.ToObject<AssetsToDataPush>();
                        // Add data push (or update)
                        int result = new TableOperations<AssetsToDataPush>(connection).AddNewRecord(newRecord);
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
                        int result = new TableOperations<MetersToDataPush>(connection).UpdateRecord(record);
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
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            try
            {
                if (PostAuthCheck())
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        MetersToDataPush newRecord = record.ToObject<MetersToDataPush>();
                        int result = new TableOperations<MetersToDataPush>(connection).AddNewRecord(newRecord);
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

    [RoutePrefix("api/OpenXDA/MaintenanceWindow")]
    public class MaintenanceWindowController : ModelController<MaintenanceWindow> { }
}





