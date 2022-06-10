//******************************************************************************************************
//  RemoteXDAInstanceForm.tsx - Gbtc
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
//  5/9/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Input } from '@gpa-gemstone/react-forms';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from "react-dom";
import { UserAccountSliceRemote } from '../Store/Store';
import { IsCron } from '@gpa-gemstone/helper-functions';

const BlankRemoteXDAInstance: OpenXDA.Types.RemoteXDAInstance = {
    ID: 0,
    Name: null,
    Address: null,
    Frequency: '*',
    UserAccountID: null
}

const BlankUser: Application.Types.iUserAccount = {
    ID: null,
    Name: null,
    Password: null,
    FirstName: null,
    LastName: null,
    Phone: null,
    PhoneConfirmed: false,
    Email: null,
    EmailConfirmed: false,
    LockedOut: false,
    Approved: false,
    UseADAuthentication: false,
    ChangePasswordOn: null
}

function RemoteXDAInstanceComparator(connection: OpenXDA.Types.RemoteXDAInstance, tempConnection: OpenXDA.Types.RemoteXDAInstance): boolean {
    if (connection == null)
        return false;
    return (
        connection.Name != tempConnection.Name ||
        connection.Address != tempConnection.Address ||
        connection.Frequency != tempConnection.Frequency ||
        connection.UserAccountID != tempConnection.UserAccountID)
}

interface IProps { BaseInstance: OpenXDA.Types.RemoteXDAInstance, SetInstance: (instance: OpenXDA.Types.RemoteXDAInstance) => void, SetErrors?: (e: string[]) => void, RenderPortalId?: string }

export default function RemoteXDAInstanceForm(props: IProps) {
    // UserAccount Slice const
    const dispatch = useDispatch();
    const userStatus = useSelector(UserAccountSliceRemote.Status) as Application.Types.Status;
    const user = useSelector((state) => UserAccountSliceRemote.Datum(state, props.BaseInstance.UserAccountID));

    // Portal rendering const
    const [domReady, setDomReady] = React.useState(false);
    const portalContainer = (props.RenderPortalId === undefined || props.RenderPortalId === null) ? document.getElementById('rXDAFormRoot') : document.getElementById(props.RenderPortalId);

    // State const
    const [instanceUser, setInstanceUser] = React.useState<Application.Types.iUserAccount>(BlankUser);
    const [formInstance, setFormInstance] = React.useState<OpenXDA.Types.RemoteXDAInstance>(props.BaseInstance);
    const [showUserSearch, setShowUserSearch] = React.useState<(boolean)>(false);
    const [userList, setUserList] = React.useState<Array<Application.Types.iUserAccount>>([]);

    React.useEffect(() => {
        if (userStatus === 'unintiated' || userStatus === 'changed') {
            dispatch(UserAccountSliceRemote.Fetch());
        }
    }, [dispatch, userStatus]);

    React.useEffect(() => {
        setFormInstance(props.BaseInstance)
    }, [props.BaseInstance]);


    React.useEffect(() => {
        if (user == null)
            setInstanceUser(BlankUser);
        else
            setInstanceUser(user);
    }, [dispatch, user]);

    React.useEffect(() => {
        setDomReady(true)
    })

    React.useEffect(() => {
        let e = [];
        if (!RemoteXDAInstanceComparator(props.BaseInstance, formInstance))
            e.push("No changes made.")
        if (!valid('Name'))
            e.push('Name is a required field (less than 200 characters)');
        if (!valid('Address'))
            e.push('Address is a required field (less than 200 characters)');
        if (!valid('Frequency'))
            e.push('Frequency is a required field (must be a valid cron format)');
        if (!valid('UserAccountID'))
            e.push('A user is required.');
        if (props.SetErrors != undefined)
            props.SetErrors(e);
        props.SetInstance(formInstance);
    }, [formInstance]);


    function valid(field: keyof (OpenXDA.Types.RemoteXDAInstance)): boolean {
        if (field == 'Name')
            return formInstance.Name != null && formInstance.Name.length > 0 && formInstance.Name.length <= 200;
        else if (field == 'Address')
            return formInstance.Address != null && formInstance.Address.length > 0 && formInstance.Address.length <= 200;
        else if (field == 'Frequency')
            return formInstance.Frequency != null && formInstance.Frequency.length <= 20 && IsCron(formInstance.Frequency);
        else if (field == 'UserAccountID')
            return formInstance.UserAccountID != null; // Should be the only requirement, since it should be picked from non-typed in input
        else
            return false;
    }

    return (
        <div id='rXDAFormRoot'>
            <form>
                <div className="col" style={{width: '50%', float:"left"}}>
                    <Input<OpenXDA.Types.RemoteXDAInstance> Record={formInstance} Field={'Name'} Label={'Name'} Feedback={"A name of less than 200 characters is required."} Valid={valid} Setter={setFormInstance} />
                    <Input<OpenXDA.Types.RemoteXDAInstance> Record={formInstance} Field={'Address'} Label={'Address'} Feedback={"An address of less than 200 characters is required."} Valid={valid} Setter={setFormInstance} />
                    <Input<OpenXDA.Types.RemoteXDAInstance> Record={formInstance} Field={'Frequency'} Label={'Frequency'} Feedback={"A frequency that is a valid cron format is required."} Valid={valid} Setter={setFormInstance} Help={'In order of minutes, hours, day of the month, month, weekday. For example, a frequency of every midnight would be * 0 * * *'} />
                </div>
                <div className="col" style={{ width: '50%', float: "right" }}>
                    <Input<Application.Types.iUserAccount> Record={instanceUser} Field={'Name'} Label={'Username'} Valid={() => instanceUser.Name !== null} Setter={() => { }} Disabled={true} />
                    <button type="button" className="btn btn-primary btn-block" onClick={() => { setShowUserSearch(true); }}> Add or change user. </button>
                </div>
            </form>
            {domReady ? createPortal(
                <DefaultSelects.User
                    Slice={UserAccountSliceRemote}
                    Selection={userList}
                    OnClose={(selected, conf) => {
                        setShowUserSearch(false);
                        setUserList([])
                        if (!conf) return;
                        setFormInstance((vars) => {
                            let updated = _.cloneDeep(vars);
                            updated.UserAccountID = selected[0].ID;
                            return updated;
                        });
                        setInstanceUser((vars) => {
                            let updated = _.cloneDeep(vars);
                            updated.Name = selected[0].Name;
                            return updated;
                        });

                    }}
                    Show={showUserSearch}
                    Type={'single'}
                    Columns={[
                        { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    Title={"Select user for this remoteXDA instance: "}
                    GetEnum={() => () => { }}
                    GetAddlFields={() => () => { }}
                />, portalContainer) : null}
        </div>
    );
}

export { BlankRemoteXDAInstance, RemoteXDAInstanceForm, RemoteXDAInstanceComparator, BlankUser };