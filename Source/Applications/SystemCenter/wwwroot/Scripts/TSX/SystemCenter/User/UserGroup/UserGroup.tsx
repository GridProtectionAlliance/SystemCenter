// ******************************************************************************************************
//  UserGroup.tsx - Gbtc
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
//  02/23/2023 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import * as React from 'react';
import { LoadingScreen, ServerErrorIcon, TabSelector, Warning } from '@gpa-gemstone/react-interactive';
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import * as _ from 'lodash';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { CheckBox } from '@gpa-gemstone/react-forms';
import { useHistory } from "react-router-dom";
import { SecurityGroupSlice } from '../../Store/Store';
import { ISecurityGroup } from '../Types';
import GroupInfo from './Info';
import GroupUser from './GroupUsers';
import GroupPermission from './Permissions';

interface IProps {
	GroupID: string
}

function UserGroup(props: IProps) {
	const history = useHistory();
	const dispatch = useAppDispatch();

	const group: ISecurityGroup = useAppSelector((state) => SecurityGroupSlice.Datum(state, props.GroupID) as ISecurityGroup);
	const status = useAppSelector(SecurityGroupSlice.Status);

	const [tab, setTab] = React.useState<string>('info')

	const [showWarning, setShowWarning] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (status == 'unintiated' || status == 'changed')
			dispatch(SecurityGroupSlice.Fetch());
	}, [status])

	if (status === 'error')
		return <div style={{ width: '100%', height: '100%' }}>
			<ServerErrorIcon Show={true} Label={'A Server Error Occurred. Please Reload the Application.'} />
		</div>;

	const Tabs = [
		{ Id: "info", Label: "Info" },
		{ Id: "users", Label: "Users" },
		{ Id: "roles", Label: "Roles" }
	];

	return (
		<div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
			<div className="row">
				<div className="col">
					<h2>{group != null ? `${group.DisplayName} (${group.Type})` : 'Groups'}</h2>
				</div>
				<div className="col">
					<button className="btn btn-danger pull-right" hidden={group == null} onClick={() => setShowWarning(true)}>Delete Group</button>
				</div>
			</div>
			<LoadingScreen Show={status === 'loading'} />
			<hr />
			<TabSelector CurrentTab={tab} SetTab={(t) => setTab(t)} Tabs={Tabs} />
			<div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
				<div className={"tab-pane " + (tab === "info" ? " active" : "fade")}>
					<GroupInfo Group={group} />
				</div>
				<div className={"tab-pane " + (tab === "users" ? " active" : "fade")}>
					{group == null ? null : <GroupUser Group={group} />}
				</div>
				<div className={"tab-pane " + (tab === "roles" ? " active" : "fade")} style={{ maxHeight: window.innerHeight - 215 }}>
					{group != null ? <GroupPermission GroupID={group.ID} /> : null }
				</div>

			</div>
			<Warning Message={'This will permanently delete the User Group. Users in this Group will not be deleted, but may lose their roles. Are you sure you want to continue?'} Title={'Delete ' + (group?.DisplayName ?? 'User Group')} Show={showWarning} CallBack={(c) => {
				setShowWarning(false);
				if (c) {
					dispatch(SecurityGroupSlice.DBAction({ verb: 'DELETE', record: group }));
					history.push({ pathname: homePath + 'index.cshtml', search: '?name=Groups', state: {} });
				}
			}} />
		</div>
	)


}

export default UserGroup;
