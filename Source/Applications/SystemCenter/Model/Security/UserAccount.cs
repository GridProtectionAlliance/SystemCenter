//******************************************************************************************************
//  UserAccount.cs - Gbtc
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
//  02/05/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data;
using GSF.Data.Model;
using GSF.Identity;
using GSF.Security;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Http;
using SystemCenter.Controllers;

namespace SystemCenter.Model.Security
{
    public class UserAccount : GSF.Security.Model.UserAccount {
        static UserAccount()
        {
            TableOperations<UserAccount>.TypeRegistry.RegisterType<AdoSecurityProvider>();
        }

        public bool PhoneConfirmed { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool Approved { get; set; }
    }

    [RoutePrefix("api/SystemCenter/UserAccount")]
    public class UserAccountController : ModelController<UserAccount> {
        protected override string GetRoles { get; } = "Administrator";

        [HttpPost, Route("SID")]
        public IHttpActionResult GetSIDFromUserName([FromBody] string userName) {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            try
            {
                return Ok(UserInfo.UserNameToSID(userName));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpPost, Route("IsUser")]
        public IHttpActionResult GetIsUser([FromBody] string sid)
        {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            try
            {

                return Ok(UserInfo.IsUserSID(sid));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }

        [HttpPost, Route("SearchableList")]
        public IHttpActionResult GetUserAccountsUsingSearchableList([FromBody] IEnumerable<Search> searches)
        {
            if (GetRoles != string.Empty && !User.IsInRole(GetRoles)) return Unauthorized();
            try
            {
                string whereClause = BuildWhereClause(searches.Where(search => search.Field != "UserAccount.Name"));

                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    DataTable table = connection.RetrieveData(@"
                SELECT
	                DISTINCT
	                UserAccount. *
                FROM
	                UserAccount LEFT JOIN
	                ApplicationRoleUserAccount ON UserAccount.ID = ApplicationRoleUserAccount.UserAccountID LEFT JOIN
	                ApplicationRole ON ApplicationRoleUserAccount.ApplicationRoleID = ApplicationRole.ID
                " + whereClause + @"
                ");

                    IEnumerable<UserAccount> records = table.Select().Select(row => new TableOperations<UserAccount>(connection).LoadRecord(row));
                    if (searches.Where(search => search.Field == "UserAccount.Name").Any())
                    {
                        string search = searches.First(s => s.Field == "UserAccount.Name").SearchText;
                        if (search == string.Empty)
                        {
                            Regex regex = new Regex("^.*$");
                            records = records.Where(userAccount => regex.IsMatch(userAccount.AccountName.ToLower()));
                        }
                        else if (search[0] == '!' || search[0] == '_')
                        {
                            search = search.Replace("*", ".*");
                            Regex regex = new Regex("^" + search + "$");
                            records = records.Where(userAccount => !regex.IsMatch(userAccount.AccountName.ToLower()));
                        }
                        else
                        {
                            search = search.Replace("*", ".*");
                            Regex regex = new Regex("^" + search + "$");
                            records = records.Where(userAccount => regex.IsMatch(userAccount.AccountName.ToLower()));
                        }
                    }

                    return Ok(records);
                }
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        public override IHttpActionResult Post([FromBody] JObject record)
        {
            UserAccount newRecord = record.ToObject<UserAccount>();
            if (newRecord.UseADAuthentication)
                newRecord.Name = UserInfo.UserNameToSID(newRecord.Name);
            newRecord.CreatedOn = DateTime.UtcNow;
            newRecord.UpdatedOn = DateTime.UtcNow;
            newRecord.CreatedBy = User.Identity.Name;
            newRecord.UpdatedBy = User.Identity.Name;

            return base.Post(JObject.FromObject(newRecord));
        }

    }
}