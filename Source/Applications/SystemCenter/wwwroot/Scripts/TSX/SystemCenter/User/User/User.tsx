// ******************************************************************************************************
//  User.tsx - Gbtc
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
//  07/14/2021 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import * as React from 'react';
import { LoadingScreen, ServerErrorIcon, TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';
import UserInfo from './Info';
import UserPermissions from './Permissions';
import AdditionalField from '../AdditionalUserFieldsWindow'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CheckBox } from '@gpa-gemstone/react-forms';
import { UserAccountSlice } from '../../Store/Store';
import { useNavigate } from "react-router-dom";

declare type Tab = 'userInfo' | 'permissions' | 'additionalFields'

interface IProps { UserID: string, Tab: Tab }

function User(props: IProps) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => UserAccountSlice.Datum(state, props.UserID));
	const status: Application.Types.Status = useAppSelector(UserAccountSlice.Status);
	const [tab, setTab] = React.useState(getTab());
	const [showWarning, setShowWarning] = React.useState<boolean>(false);

	function getTab(): Tab {
		if (props.Tab != undefined) return props.Tab;
		else if (sessionStorage.hasOwnProperty('User.Tab'))
			return JSON.parse(sessionStorage.getItem('User.Tab'));
		else
			return 'userInfo';
	}

	React.useEffect(() => {
		const saved = getTab();
		if (saved !== tab)
			sessionStorage.setItem('User.Tab', JSON.stringify(tab));
	}, [tab]);

	React.useEffect(() => {
		if (status === 'unintiated' || status === 'changed')
			dispatch(UserAccountSlice.Fetch());
	}, [status]);

	if (status === 'error')
		return <div style={{ width: '100%', height: '100%' }}>
			<ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} />
		</div>;

	const Tabs = [
		{ Id: "userInfo", Label: "User Info" },
		{ Id: "permissions", Label: "Permissions" },
		{ Id: "additionalFields", Label: "Additional Fields" }
	];

	return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
			<div className="row p-2">
				<div className="col">
					<h2>{user != null ? `${user.FirstName} ${user.LastName} (${user.DisplayName})` : ''}</h2>
				</div>
				<div className="col">
					<button className="btn btn-danger pull-right" hidden={user == null} onClick={() => setShowWarning(true)}>Delete User</button>
				</div>
			</div>
			<LoadingScreen Show={status === 'loading'} />
			<hr />

			<TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
			{tab === "userInfo" ? <UserInfo AccountId={props.UserID} /> : null}
			{tab === "permissions" ? (user == null ? null : <UserPermissions UserID={user.ID} />) : null}
			{tab === "additionalFields" ? (
				<AdditionalField
					Id={props.UserID}
					EmptyField={{ ID: -1, IsSecure: false, FieldName: '', Type: 'string' }}
					GetFieldValueIndex={(field, values) => values.findIndex(v => v.AdditionalUserFieldID === field.ID)}
					GetFieldIndex={(value, fields) => fields.findIndex(f => f.ID === value.AdditionalUserFieldID)}
					FieldKeySelector={(field) => (field.ID === -1 ? 'new' : field.ID.toString())}
					ValidateField={() => []}
					FieldUI={(fld, setter) => <CheckBox<Application.Types.iAdditionalUserField> Record={fld} Field='IsSecure' Label="Secure Data" Setter={setter} />}
					CreateValue={(fld) => ({ Value: '', ID: 0, UserAccountID: props.UserID, AdditionalUserFieldID: fld.ID })}
				/>
			) : null}

			<Warning Message={
				(user == null || user.Type == 'Database' ? 'This will permanently remove the User. Are you sure you want to continue?' :
					'This will remove the User from openXDA. The User may still have rights and the ability to log in to the system if they are in an Azure or Active Directory group. Contact your domain administrator to have the User removed from Azure or AD.')
					} Title={'Delete ' + (user?.AccountName ?? 'User')} Show={showWarning} CallBack={(c) => {
				setShowWarning(false);
				if (c) {
					dispatch(UserAccountSlice.DBAction({ verb: 'DELETE', record: user }));
					navigate(`${homePath}index.cshtml?name=Users`);
				}
			}} />
		</div>
	)
}

export default User;
