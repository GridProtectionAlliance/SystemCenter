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
using GSF.Web.Model;
using PQView.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.OpenXDA
{

    [RoutePrefix("api/OpenXDA/AssetType")]
    public class AssetTypeController : ModelController<AssetTypes> {}

    [RoutePrefix("api/OpenXDA/Phase")]
    public class PhaseController:ModelController<Phase> {}

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

    [RoutePrefix("api/PQView/PQViewSite")]
    public class PQViewSiteCotnroller : ModelController<Site> { }
       
}





