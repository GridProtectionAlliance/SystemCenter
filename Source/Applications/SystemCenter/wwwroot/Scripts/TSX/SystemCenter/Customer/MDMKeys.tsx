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

import { Application, OpenXDA, SystemCenter } from "@gpa-gemstone/application-typings";
import { CrossMark } from "@gpa-gemstone/gpa-symbols";
import { Input } from "@gpa-gemstone/react-forms";
import { Modal, Search, ToolTip } from "@gpa-gemstone/react-interactive";
import { ReactTable } from "@gpa-gemstone/react-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { LSCVSAccountSlice } from "../Store/Store";
import { SelectRoles } from "../Store/UserSettings";

interface IProps {CustomerID: number}

function MDMKeys(props: IProps) {

    const searchStatus: Application.Types.Status = useAppSelector(LSCVSAccountSlice.SearchStatus);
    const search: Search.IFilter<SystemCenter.Types.LSCVSAccount>[] = useAppSelector(LSCVSAccountSlice.SearchFilters);
    const status: Application.Types.Status = useAppSelector(LSCVSAccountSlice.Status);
    const data: SystemCenter.Types.LSCVSAccount[] = useAppSelector(LSCVSAccountSlice.SearchResults);
    const parentID = useAppSelector(LSCVSAccountSlice.ParentID);
    const dispatch = useAppDispatch();


    const emptyLSCVS = { ID: 0, AccountID: '', CustomerID: props.CustomerID };
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [newLSCVSAccount, setNewLSCVSAccount] = React.useState<SystemCenter.Types.LSCVSAccount>(emptyLSCVS)
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.LSCVSAccount>('AccountID');
    const [errors, setErrors] = React.useState<string[]>([]);

    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        if (status === 'unintiated' || status === 'changed' || parentID != props.CustomerID)
            dispatch(LSCVSAccountSlice.Fetch(props.CustomerID));
    }, [status, props.CustomerID, parentID]);

    React.useEffect(() => {
        if (searchStatus === 'unintiated' || status === 'changed')
            dispatch(LSCVSAccountSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [searchStatus, status]);

    React.useEffect(() => {
            dispatch(LSCVSAccountSlice.DBSearch({ filter: search, sortField, ascending }));
    }, [ascending]);

    React.useEffect(() => {
        const e: string[] = [];
        if (newLSCVSAccount.AccountID == null || newLSCVSAccount.AccountID.length === 0)
            e.push('An Account ID is required.')
        setErrors(e);
    }, [newLSCVSAccount])

    function Valid(field: keyof (SystemCenter.Types.LSCVSAccount)) {
        if (field == 'AccountID')
            return newLSCVSAccount.AccountID != null && newLSCVSAccount.AccountID.length > 0 && newLSCVSAccount.AccountID.length < 50;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    return (
        <>
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>MDM Keys</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540 }}>
                        <ReactTable.Table<SystemCenter.Types.LSCVSAccount>
                            TableClass="table table-hover"
                            Data={data}
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
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <ReactTable.Column<SystemCenter.Types.LSCVSAccount>
                                Key={'AccountID'}
                                AllowSort={true}
                                Field={'AccountID'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Account ID
                            </ReactTable.Column>
                        </ReactTable.Table>
                    </div>
                </div>
                <div className="card-footer">
                    <button className={"btn btn-primary" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='AddID'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (hasPermissions()) setShowAdd(true) }}>Add Account ID</button>
                </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"AddID"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
                <Modal Title={'Add Account ID'}
                    Show={showAdd} Size={'lg'}
                    ShowX={true}
                    CallBack={(conf, isBtn) => {
                        if (conf && errors.length == 0)
                            dispatch(LSCVSAccountSlice.DBAction({ verb: 'POST', record: newLSCVSAccount }))
                        setShowAdd(false);
                    }}
                    DisableConfirm={errors.length > 0}
                    ConfirmShowToolTip={errors.length > 0}
                    ConfirmToolTipContent={
                        errors.map((t, i) => <p key={i}>{CrossMark} {t} </p>)
                    }
                >
                    <form>
                        <Input<SystemCenter.Types.LSCVSAccount> Record={newLSCVSAccount} Field={'AccountID'} Label={'Account ID'} Setter={setNewLSCVSAccount} Valid={Valid} Feedback={"A valid Account ID is required."} />
                    </form>
                </Modal>
            </div>
        </>
    );
}

export default MDMKeys