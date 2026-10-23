//******************************************************************************************************
//  MDMKeys.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  01/28/2022 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import { SystemCenter } from "@gpa-gemstone/application-typings";
import { ReactIcons } from "@gpa-gemstone/gpa-symbols";
import { Input, ToolTip } from "@gpa-gemstone/react-forms";
import { Modal, GenericController, LoadingScreen, ServerErrorIcon, Warning } from "@gpa-gemstone/react-interactive";
import { Table, Column } from "@gpa-gemstone/react-table";
import React from "react";
import { useAppSelector, useControllerFetch } from "../hooks";
import { SelectRoles } from "../Store/UserSettings";
import { select } from "d3-selection";

interface IProps {CustomerID: number}

const MDMKeyController = new GenericController<SystemCenter.Types.LSCVSAccount>(`${homePath}api/LSCVSAccount`, "AccountID", false);

function MDMKeys(props: IProps) {

    const emptyLSCVS = { ID: 0, AccountID: '', CustomerID: props.CustomerID };
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [newLSCVSAccount, setNewLSCVSAccount] = React.useState<SystemCenter.Types.LSCVSAccount>(emptyLSCVS);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [showEdit, setShowEdit] = React.useState<boolean>(false);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [selectedLSCVSAccount, setSelectedLSCVSAccount] = React.useState<SystemCenter.Types.LSCVSAccount | null>(null);
    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.LSCVSAccount>('AccountID');
    const [errors, setErrors] = React.useState<string[]>([]);
    const [patchErrors, setPatchErrors] = React.useState<string[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    const { Data: mdmKeys, Status: mdmKeyStatus } = useControllerFetch(MDMKeyController, sortField, ascending, props.CustomerID, refreshCount);

    React.useEffect(() => {
        const e: string[] = [];
        if (!Valid('AccountID', newLSCVSAccount))
            e.push('An Account ID is required.')
        setErrors(e);
        if (selectedLSCVSAccount == null) return
        const pe: string[] = [];
        if (!Valid('AccountID', selectedLSCVSAccount))
            pe.push('An Account ID is required');
        setPatchErrors(pe);
    }, [newLSCVSAccount, selectedLSCVSAccount])

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0)
            return false;
        return true;
    }

    return (
        <>
            <LoadingScreen Show={mdmKeyStatus === 'loading'} />
            <ServerErrorIcon Show={mdmKeyStatus === 'error' } />
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>MDM Keys</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Table<SystemCenter.Types.LSCVSAccount>
                            TableClass="table table-hover"
                            Data={mdmKeys}
                            SortKey={sortField}
                            Ascending={ascending}
                            OnSort={(d) => {
                                if (d.colField === sortField)
                                    setAscending(!ascending);
                                else {
                                    setAscending(true);
                                    setSortField(d.colField);
                                }
                            }}
                            TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<SystemCenter.Types.LSCVSAccount>
                                Key={'AccountID'}
                                AllowSort={true}
                                Field={'AccountID'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Account ID
                            </Column>
                            <Column<SystemCenter.Types.LSCVSAccount>
                                Key={'Edit'}
                                AllowSort={false}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                                Content={({ item }) => (item ?
                                    <button
                                        className={"btn btn-edit" + (hasPermissions() ? '' : ' disabled')}
                                        onClick={(e) => {
                                            if (hasPermissions()) {
                                                e.preventDefault();
                                                setSelectedLSCVSAccount(item);
                                                setShowEdit(true);
                                            }
                                        }}>
                                        <span><ReactIcons.Pencil Color="var(--warning)" Size={20} /></span>
                                    </button> : null)
                                }
                            > <p></p>
                            </Column>
                            <Column<SystemCenter.Types.LSCVSAccount>
                                Key={'Delete'}
                                AllowSort={false}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                                Content={({ item }) => (item ?
                                    <button
                                        className={"btn btn-delete" + (hasPermissions() ? '' : ' disabled')}
                                        onClick={(e) => {
                                            if (hasPermissions()) {
                                                e.preventDefault();
                                                setSelectedLSCVSAccount(item);
                                                setShowDelete(true);
                                            }
                                        }}>
                                        <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                                    </button> : null)
                                }
                            > <p></p>
                            </Column>
                        </Table>
                    </div>
                </div>
                <div className="card-footer">
                    <button className={"btn btn-info" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='AddID'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (hasPermissions()) { setNewLSCVSAccount(emptyLSCVS); setShowAdd(true); } }}>Add Account ID</button>
                </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"AddID"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
                <Modal Title={'Add Account ID'}
                    Show={showAdd}
                    Size={'lg'}
                    ShowX={true}
                    CallBack={(conf, isBtn) => {
                        if (conf && errors.length == 0)
                            MDMKeyController.DBAction('POST', newLSCVSAccount).then(() => refreshData(x => x + 1));
                        setShowAdd(false);
                    }}
                    DisableConfirm={errors.length > 0}
                    ConfirmShowToolTip={errors.length > 0}
                    ConfirmToolTipContent={
                        errors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t} </p>)
                    }
                >
                    <form>
                        <Input<SystemCenter.Types.LSCVSAccount> Record={newLSCVSAccount} Field={'AccountID'} Label={'Account ID'} Setter={setNewLSCVSAccount} Valid={(field) => Valid(field, newLSCVSAccount)} Feedback={"A valid Account ID is required."} />
                    </form>
                </Modal>
                <Modal
                    Title={"Edit MDM Key"}
                    Show={showEdit}
                    Size={'lg'}
                    ShowX={true}
                    CallBack={(conf, isBtn) => {
                        if (conf && patchErrors.length == 0 && hasPermissions())
                            MDMKeyController.DBAction('PATCH', selectedLSCVSAccount).then(() => refreshData(x => x + 1));
                        setShowEdit(false);
                    }}
                    DisableConfirm={patchErrors.length > 0}
                    ConfirmShowToolTip={patchErrors.length > 0}
                    ConfirmToolTipContent={
                        patchErrors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t} </p>)
                    }
                >
                    <form>
                        <Input<SystemCenter.Types.LSCVSAccount> Record={selectedLSCVSAccount} Field={'AccountID'} Label={'Account ID'} Setter={setSelectedLSCVSAccount} Valid={(field) => Valid(field, selectedLSCVSAccount)} Feedback={"A valid Account ID is required."} />
                    </form>
                </Modal>
                <Warning Title={"Delete MDM Key?"} Show={showDelete} Message={"Are you sure you want to delete the MDM Key?"}
                    CallBack={(conf) => {
                        if (conf && hasPermissions()) MDMKeyController.DBAction('DELETE', selectedLSCVSAccount).then(() => refreshData(x => x+1));
                        setShowDelete(false);
                    }} />
            </div>
        </>
    );
}

export default MDMKeys;

function Valid(field: keyof (SystemCenter.Types.LSCVSAccount), account: SystemCenter.Types.LSCVSAccount) {
    if (field == 'AccountID')
        return account.AccountID != null && account.AccountID.length > 0 && account.AccountID.length < 50;
}