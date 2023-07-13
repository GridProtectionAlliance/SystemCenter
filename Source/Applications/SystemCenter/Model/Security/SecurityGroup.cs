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

using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using GSF.Diagnostics;
using GSF.Identity;
using GSF.Security;
using GSF.Security.Model;
using GSF.Web.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using SystemCenter.Controllers;
using Microsoft.Graph;

namespace SystemCenter.Model.Security
{
    [SettingsCategory("securityProvider")]
    [GetRoles("Administrator")]
    [PostRoles("Administrator")]
    [PatchRoles("Administrator"), AllowSearch]
    public class SecurityGroup : GSF.Security.Model.SecurityGroup
    {
        [NonRecordField]
        public string Type { get; set; }

        [NonRecordField]
        public string DisplayName { get; set; }
    }

    [RoutePrefix("api/SystemCenter/FullSecurityGroup")]
    public class SecurityGroupController : ModelController<SecurityGroup>
    {
        // #ToDo: Add Graph Connectivity once GSF is merged

        private AzureADSettings m_azureADSettings;
        private GraphServiceClient m_graphClient;

        // <summary>
        /// Gets Azure AD settings.
        /// </summary>
        public AzureADSettings AzureADSettings => m_azureADSettings ??= AzureADSettings.Load();

        /// <summary>
        /// Gets Graph client.
        /// </summary>
        public GraphServiceClient GraphClient => m_graphClient ??= AzureADSettings.GetGraphClient();

        [HttpGet]
        [Route("Roles/{groupID}")]
        public IHttpActionResult GetGroupRoles(string groupID)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
                return Ok(new TableOperations<ApplicationRole>(connection).QueryRecords("Name", new RecordRestriction(
                    "(SELECT COUNT(ID) FROM ApplicationRoleSecurityGroup WHERE SecurityGroupID = {0} AND ApplicationRoleID = ApplicationRole.ID) > 0", groupID)));
        }

        [HttpGet]
        [Route("Users/{groupID}")]
        public IHttpActionResult GetUsers(string groupID)
        {
            if (!GetAuthCheck())
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
                return Ok(new TableOperations<UserAccount>(connection).QueryRecords("Name", new RecordRestriction(
                    "(SELECT COUNT(ID) FROM SecurityGroupUserAccount WHERE SecurityGroupID = {0} AND UserAccountID = UserAccount.ID) > 0", groupID)));
        }

        [HttpPost]
        [Route("{groupID}/PostRoles")]
        public IHttpActionResult PostGroupRoles([FromBody] IEnumerable<JObject> record, string groupID)
        {
            if (!PostAuthCheck())
            {
                return Unauthorized();
            }

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                TableOperations<ApplicationRoleSecurityGroup> tbl = new TableOperations<ApplicationRoleSecurityGroup>(connection);
                IEnumerable<ApplicationRole> roles = record.Select(r => r.ToObject<ApplicationRole>());
                foreach (ApplicationRole role in roles)
                {
                    ApplicationRoleSecurityGroup current = tbl
                        .QueryRecordWhere("ApplicationRoleID = {0} AND SecurityGroupID = {1}", role.ID, groupID);
                    if (current is null)
                        tbl.AddNewRecord(new ApplicationRoleSecurityGroup() { ApplicationRoleID = role.ID, SecurityGroupID = new Guid(groupID) });
                }

                foreach (ApplicationRoleSecurityGroup role in tbl.QueryRecordsWhere("SecurityGroupID = {0}", groupID))
                {
                    if (roles.FirstOrDefault(r => r.ID == role.ApplicationRoleID) is null)
                        tbl.DeleteRecord(role);
                }

                return Ok(1);
            }
           
        }

        [HttpPost]
        [Route("Verify")]
        public IHttpActionResult GetVerifyGroup([FromBody] string groupName)
        {
            if (groupName is null || !GetAuthCheck())
                return Unauthorized();

            string sid = UserInfo.GroupNameToSID(groupName);
            if (UserInfo.IsGroupSID(sid))
                return Ok(1);
           
            if (IsValidAzureADGroupName(groupName).Result)
                return Ok(1);

            return Ok(0);
        }

        [HttpPost]
        [Route("AddUser/{groupID}")]
        public IHttpActionResult PostGroupUser([FromBody] IEnumerable<JObject> record, string groupID)
        {
            if (!PostAuthCheck())
            {
                return Unauthorized();
            }

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                TableOperations<SecurityGroupUserAccount> tbl = new TableOperations<SecurityGroupUserAccount>(connection);
                IEnumerable<UserAccount> users = record.Select(r => r.ToObject<UserAccount>());
                foreach (UserAccount user in users)
                {
                    SecurityGroupUserAccount current = tbl
                        .QueryRecordWhere("UserAccountID = {0} AND SecurityGroupID = {1}", user.ID, groupID);
                    if (current is null)
                        tbl.AddNewRecord(new SecurityGroupUserAccount() { UserAccountID = user.ID, SecurityGroupID = new Guid(groupID) });
                }

                foreach (SecurityGroupUserAccount user in tbl.QueryRecordsWhere("SecurityGroupID = {0}", groupID))
                {
                    if (users.FirstOrDefault(r => r.ID == user.UserAccountID) is null)
                        tbl.DeleteRecord(user);
                }

                return GetUsers(groupID);
            }
        }
        public override IHttpActionResult Post([FromBody] JObject record)
        {
            if (!PostAuthCheck() || ViewOnly)
                return Unauthorized();

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                SecurityGroup newRecord = record.ToObject<SecurityGroup>();
                newRecord = new SecurityGroup()
                {
                    Name = newRecord.Name,
                    Description = newRecord.Description,
                    CreatedBy = User.Identity.Name,
                    CreatedOn = DateTime.UtcNow,
                    UpdatedBy = User.Identity.Name,
                    UpdatedOn = DateTime.UtcNow
                };
                int result = new TableOperations<SecurityGroup>(connection).AddNewRecord(newRecord);
                return Ok(result);
            }
        }

        protected override IEnumerable<SecurityGroup> QueryRecords(string sortBy, bool ascending) 
        {
            IEnumerable<SecurityGroup> baseResult;
            if (!IsInDatabase(sortBy))
                baseResult = base.QueryRecords("Name", ascending);
            else
                baseResult = base.QueryRecords(sortBy, ascending);

            baseResult = baseResult.Select(g => ExtendGrp(g));

            if (string.Equals(sortBy, "DisplayName", StringComparison.OrdinalIgnoreCase) && ascending)
                baseResult = baseResult.OrderBy(g => g.DisplayName);
            if (string.Equals(sortBy, "DisplayName", StringComparison.OrdinalIgnoreCase) && !ascending)
                baseResult = baseResult.OrderByDescending(g => g.DisplayName);

            if (string.Equals(sortBy, "Type", StringComparison.OrdinalIgnoreCase) && ascending)
                baseResult = baseResult.OrderBy(g => g.Type);
            if (string.Equals(sortBy, "Type", StringComparison.OrdinalIgnoreCase) && !ascending)
                baseResult = baseResult.OrderByDescending(g => g.Type);

            return baseResult;
        }

        protected override SecurityGroup QueryRecordWhere(string filterExpression, params object[] parameters) =>
            ExtendGrp(base.QueryRecordWhere(filterExpression, parameters));
        

        protected override IEnumerable<SecurityGroup> QueryRecordsWhere(string orderBy, bool ascending, string filterExpression, params object[] parameters)
        {
            IEnumerable<SecurityGroup> baseResult;
            if (!IsInDatabase(orderBy))
                baseResult = base.QueryRecordsWhere("Name", ascending, filterExpression, parameters);
            else
                baseResult = base.QueryRecordsWhere(orderBy, ascending, filterExpression, parameters);

            baseResult = baseResult.Select(g => ExtendGrp(g));

            if (string.Equals(orderBy, "DisplayName", StringComparison.OrdinalIgnoreCase) && ascending)
                baseResult = baseResult.OrderBy(g => g.DisplayName);
            if (string.Equals(orderBy, "DisplayName", StringComparison.OrdinalIgnoreCase) && !ascending)
                baseResult = baseResult.OrderByDescending(g => g.DisplayName);

            if (string.Equals(orderBy, "Type", StringComparison.OrdinalIgnoreCase) && ascending)
                baseResult = baseResult.OrderBy(g => g.Type);
            if (string.Equals(orderBy, "Type", StringComparison.OrdinalIgnoreCase) && !ascending)
                baseResult = baseResult.OrderByDescending(g => g.Type);

            return baseResult;

        }

        protected override DataTable GetSearchResults(PostData postData, int? page)
        {
            string orderBy = postData.OrderBy;
            if (!IsInDatabase(orderBy))
                orderBy = "Name";

            PostData filteredPostData = new ModelController<SecurityGroup>.PostData()
            {
                Ascending = postData.Ascending,
                OrderBy = orderBy,
                Searches = postData.Searches.Where(flt => IsInDatabase(flt.FieldName)),
            };

            DataTable dataTable = base.GetSearchResults(filteredPostData);
            dataTable.Columns.Add("DisplayName", typeof(string));
            dataTable.Columns.Add("Type", typeof(string));

            foreach (DataRow row in dataTable.Rows)
            {
                SecurityGroup group = ExtendGrp(TableOperations<SecurityGroup>.LoadRecordFunction()(row));
                row["Type"] = group.Type;
                row["DisplayName"] = group.DisplayName;
            }

            // #ToDo Add Filtering by DisplayName and Type

            if (!IsInDatabase(orderBy))
            {
                dataTable.DefaultView.Sort = orderBy + (postData.Ascending ? " ASC" : " DESC");
                dataTable = dataTable.DefaultView.ToTable();
            }

            return dataTable;
        }

        private SecurityGroup ExtendGrp(SecurityGroup group) {
            group.DisplayName = group.AccountName;
            group.Type = "Database";

            if (!string.Equals(group.Name, group.AccountName))
                group.Type = "AD";
            else if (IsValidAzureADGroupName(group.Name).Result)
                group.Type = "Azure";

            return group;
        }

        /// <summary>
        /// Gets flag that determines if specified group name can be found on Azure AD.
        /// </summary>
        /// <param name="groupName">Group name to lookup</param>
        /// <returns><c>true</c> if group name was found in Azure AD; otherwise, <c>false</c>.</returns>
        private async Task<bool> IsValidAzureADGroupName(string groupName)
        {
            GraphServiceClient graphClient = GraphClient;

            if (graphClient is null)
                return false;

            IGraphServiceGroupsCollectionPage groups = await graphClient.Groups.Request().GetAsync();

            while (groups.Count > 0)
            {
                if (groups.Any(group => group.DisplayName.Equals(groupName, StringComparison.OrdinalIgnoreCase)))
                    return true;

                if (groups.NextPageRequest is not null)
                    groups = await groups.NextPageRequest.GetAsync();
                else
                    break;
            }

            return false;
        }

        private bool IsInDatabase(string collumn)
        {
            return !string.Equals(collumn, "DisplayName", StringComparison.OrdinalIgnoreCase) &&
                !string.Equals(collumn, "Type", StringComparison.OrdinalIgnoreCase);
        }
    }  
}