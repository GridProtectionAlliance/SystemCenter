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

using GSF.Data.Model;
using GSF.Web.Model;
using System.Web.Http;

namespace SystemCenter.Model.Security
{
    [TableName("UserAccount"), CustomView(@"
	Select
		ID,
		Name,
		'' as Password,
		FirstName,
		LastName,
		DefaultNodeID,
		Phone,
		PhoneConfirmed,
		Email,
		EmailConfirmed,
		LockedOut,
		Approved,
		UseADAuthentication,
		TSCID,
		RoleID,
		Title,
		Department,
		DepartmentNumber,
		MobilePhone,
		ReceiveNotifications,
		ChangePasswordOn,
		CreatedOn,
		CreatedBy,
		UpdatedOn,
		UpdatedBy
	From
		UserAccount
	")]
    [SettingsCategory("SystemSettings")]
    [GetRoles("Administrator")]
    [PostRoles("Administrator")]
    [PatchRoles("Administrator"), AllowSearch,
        AdditionalFieldSearch("", @"
            (SELECT
	        AdditionalUserFieldValue.ID,
                AdditionalUserField.FieldName,
                AdditionalUserFieldValue.Value,
                AdditionalUserFieldValue.UserAccountID
        FROM
	        AdditionalUserField JOIN
	        AdditionalUserFieldValue ON AdditionalUserField.ID = AdditionalUserFieldValue.AdditionalUserFieldID)
    ", "UserAccountID", "Value", "FieldName")]
    [ViewOnly]
    [RootQueryRestriction("UseADAuthentication={0}", false)]
    public class RemoteUserAccount : UserAccount { }
	[RoutePrefix("api/SystemCenter/RemoteUserAccount")]
	public class RemoteUserAccountController : ModelController<RemoteUserAccount> { }
}