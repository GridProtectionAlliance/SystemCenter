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
import { CheckBox, Input } from '@gpa-gemstone/react-forms';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { useAppDispatch, useAppSelector } from '../hooks';
import { createPortal } from "react-dom";
import { UserAccountSliceRemote } from '../Store/Store';
import { IsCron } from '@gpa-gemstone/helper-functions';
import { Modal, ToolTip } from '@gpa-gemstone/react-interactive';
import { LoadingScreen } from '@gpa-gemstone/react-interactive';
import { SelectRoles } from '../Store/UserSettings';

const BlankRemoteXDAInstance: OpenXDA.Types.RemoteXDAInstance = {
    ID: 0,
    Name: null,
    Address: null,
    Frequency: '*',
    UseApiAuth: true
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

interface IProps { BaseInstance: OpenXDA.Types.RemoteXDAInstance, SetInstance: (instance: OpenXDA.Types.RemoteXDAInstance) => void, SetErrors?: (e: string[]) => void, RenderPortalId?: string }

export default function RemoteXDAInstanceForm(props: IProps) {
    // UserAccount Slice const
    const dispatch = useAppDispatch();
    const userStatus = useAppSelector(UserAccountSliceRemote.Status) as Application.Types.Status;
    const user = useAppSelector((state) => UserAccountSliceRemote.Datum(state, props.BaseInstance.UserAccountID));

    // Portal rendering const
    const [domReady, setDomReady] = React.useState(false);
    const portalContainer = (props.RenderPortalId === undefined || props.RenderPortalId === null) ? document.getElementById('rXDAFormRoot') : document.getElementById(props.RenderPortalId);

    // State const
    const [instanceUser, setInstanceUser] = React.useState<Application.Types.iUserAccount>(BlankUser);
    const [formInstance, setFormInstance] = React.useState<OpenXDA.Types.RemoteXDAInstance>(props.BaseInstance);
    const [showUserSearch, setShowUserSearch] = React.useState<(boolean)>(false);
    const [userList, setUserList] = React.useState<Array<Application.Types.iUserAccount>>([]);

    // Test/Push Modal Const
    const [showTestResult, setShowTestResult] = React.useState<(boolean)>(false);
    const [testResult, setTestResult] = React.useState<(boolean)>(false);
    const [testErrorMessage, setTestErrorMessage] = React.useState("");

    // Test/Push Modal Const
    const [showConfigResult, setShowConfigResult] = React.useState<(boolean)>(false);
    const [configResult, setConfigResult] = React.useState<(boolean)>(false);

    const [showFailure, setShowFailure] = React.useState<(boolean)>(false);
    const [loading, setLoading] = React.useState<(boolean)>(false);

    const roles = useAppSelector(SelectRoles);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none' | 'reset')>('none');

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
        const formModified = !_.isEqual(props.BaseInstance, formInstance);

        if (formModified && !hasPermissions())
            e.push("Your role does not have permission. Please contact your Administrator if you believe this to be in error.");
        if (!formModified)
            e.push("No changes made.");
        if (!valid('Name'))
            e.push('A Name of less than 200 characters is required.');
        if (!valid('Address'))
            e.push('An Address of less than 200 characters is required.');
        if (!valid('Frequency'))
            e.push('A Frequency in a valid cron format is required.');
        if (formInstance.UseApiAuth) {
            if (!valid('APIToken'))
                e.push('An API Token for the remote XDA instance is required. This token must be less than 50 characters.');
            if (!valid('RegistrationKey'))
                e.push('A Registration Key for the remote XDA instance is required. This key must be less than 50 characters.');
        }
        else if (!valid('UserAccountID')) e.push('A User is required.');
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
        else if (field == 'APIToken')
            return formInstance.APIToken != null && formInstance.APIToken.length > 0 && formInstance.APIToken.length <= 50;
        else if (field == 'RegistrationKey')
            return formInstance.RegistrationKey != null && formInstance.RegistrationKey.length > 0 && formInstance.RegistrationKey.length <= 50;
        else
            return false;
    }

    function testConnection() {
        setLoading(true);
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/remoteXDAInstance/Alive/${formInstance.ID}`,
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done((response) => {
            const str = JSON.parse(response);
            setTestResult(str.Success == true);
            setTestErrorMessage(str.ErrorMessage);
            setShowTestResult(true);
            setLoading(false);
        }).fail(() => {
            setShowFailure(true);
            setLoading(false);
        });

        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }

    function pushRemoteConfig() {
        setLoading(true);
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/remoteXDAInstance/ConfigPush/${formInstance.ID}`,
            contentType: "text/plain; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done((str) => {
            setConfigResult(str === "1")
            setShowConfigResult(true);
            setLoading(false);
        }).fail(() => {
            setShowFailure(true);
            setLoading(false);
        });

        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0)
            return false;
        return true;
    }

    return (
        <div id='rXDAFormRoot'>
            {loading ? <LoadingScreen Show={true} /> :
                <form>
                    <div className="row">
                        <div className="col-6">
                            <Input<OpenXDA.Types.RemoteXDAInstance> Record={formInstance} Field={'Name'} Label={'Name'} Feedback={"A Name of less than 200 characters is required."} Valid={valid} Setter={setFormInstance} Disabled={!hasPermissions()} />
                            <Input<OpenXDA.Types.RemoteXDAInstance> Record={formInstance} Field={'Address'} Label={'URL'} Feedback={"A URL of less than 200 characters is required."} Valid={valid} Setter={setFormInstance} Disabled={!hasPermissions()} />
                            <Input<OpenXDA.Types.RemoteXDAInstance> Record={formInstance} Field={'Frequency'} Label={'Frequency'} Feedback={"Frequency in a valid cron format is required."} Valid={valid} Setter={setFormInstance} Help={'In order of minutes, hours, day of the month, month, weekday. For example, a Frequency of every midnight would be * 0 * * *'}
                                Disabled={!hasPermissions()} />
                        </div>
                        <div className="col-6">
                            <br />
                            <CheckBox<OpenXDA.Types.RemoteXDAInstance> Record={formInstance} Field={'UseApiAuth'} Label={'Use Api Authentication'} Setter={setFormInstance} Help="If unchecked, a user account must be supplied with datapusher roles." />
                            <br />
                            {
                                formInstance.UseApiAuth ? 
                                    <>
                                        <Input<OpenXDA.Types.RemoteXDAInstance> Record={formInstance} Field='RegistrationKey' Label='Registration Key'
                                            Feedback="A Registration Key for the remote XDA instance is required. This key must be less than 50 characters."
                                            Valid={valid} Setter={setFormInstance} Disabled={!hasPermissions()} />
                                        <Input<OpenXDA.Types.RemoteXDAInstance> Record={formInstance} Field='APIToken' Label='API Token'
                                            Feedback="An API Token for the remote XDA instance is required. This token must be less than 50 characters."
                                            Valid={valid} Setter={setFormInstance} Disabled={!hasPermissions()} />
                                    </> :
                                    <>
                                        <Input<Application.Types.iUserAccount> Record={instanceUser} Field={'Name'} Label={'User'} Valid={() => instanceUser.Name !== null} Setter={() => { }} Disabled={true} />
                                        <button type="button" className={"btn btn-primary btn-block" + (hasPermissions() ? '' : ' disabled')} data-tooltip='EditUser' onMouseEnter={() => setHover('clear')} onMouseLeave={() => setHover('none')}
                                            onClick={() => { if (hasPermissions()) setShowUserSearch(true); }}> Add or Change User </button>
                                    </>
                            }
                            {
                                formInstance.ID > 0 ? <>

                                <button type="button" className={"btn btn-primary btn-block" + (hasPermissions() ? '' : ' disabled')} data-tooltip='TestConnection' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}
                                    onClick={() => { if (hasPermissions()) testConnection() }}> Test Remote Connection </button>

                                <button type="button" className={"btn btn-primary btn-block" + (hasPermissions() ? '' : ' disabled')} data-tooltip='PushRemote' onMouseEnter={() => setHover('reset')} onMouseLeave={() => setHover('none')}
                                    onClick={() => { if (hasPermissions()) pushRemoteConfig() }}> Initiate Data Push </button>
                            </> : null}
                        </div>
                    </div>
                    <ToolTip Show={hover == 'submit' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"TestConnection"}>
                        {<p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>}
                    </ToolTip>
                    <ToolTip Show={hover == 'clear' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"EditUser"}>
                        {<p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>}
                    </ToolTip>
                    <ToolTip Show={hover == 'reset' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"PushRemote"}>
                        {<p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>}
                    </ToolTip>
                </form>
            }
            {domReady ? createPortal(<>
                <Modal Show={showTestResult} Title={`Test Connection ${testResult ? "Succeeded" : "Failed"}`}
                    ShowCancel={false}
                    CallBack={() => { setShowTestResult(false); }}
                    ShowX={true} Size={"sm"}
                    ConfirmText={"Close"}>
                    {testResult ? "Connection made to Remote openXDA server." : `Connection could not be made to remote XDA server. ${testErrorMessage}`}
                </Modal>
                <Modal Show={showConfigResult} Title={`Push Remote Config ${configResult ? "Succeeded" : "Failed"}`}
                    ShowCancel={false}
                    CallBack={() => { setShowConfigResult(false); }}
                    ShowX={true} Size={"sm"}
                    ConfirmText={"Close"}>
                    {configResult ? "Config push successfully intialized. Local openXDA is attempting to push the config to Remote openXDA. Check Local openXDA error log for any unpushed Remotes." : "Config push could not be commanded to Remote openXDA server."}
                </Modal>
                <Modal Show={showFailure} Title={'Command Failure'}
                    ShowCancel={false}
                    CallBack={() => { setShowFailure(false); }}
                    ShowX={true} Size={"sm"}
                    ConfirmText={"Close"}>
                    Connection to to Local openXDA server failed.
                </Modal>
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
                        { key: 'Name', field: 'Name', label: 'User', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    Title={"Select User for this Remote openXDA Instance: "}
                    GetEnum={() => () => { }}
                    GetAddlFields={() => () => { }}
                />
            </>, portalContainer) : null}
        </div>
    );
}

export { BlankRemoteXDAInstance, RemoteXDAInstanceForm, BlankUser };