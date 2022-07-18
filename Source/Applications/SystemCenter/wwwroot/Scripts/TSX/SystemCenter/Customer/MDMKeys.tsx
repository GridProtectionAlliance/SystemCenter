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
import { Modal, Search } from "@gpa-gemstone/react-interactive";
import Table from "@gpa-gemstone/react-table";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LSCVSAccountSlice } from "../Store/Store";

interface IProps {CustomerID: number}

function MDMKeys(props: IProps) {

    const searchStatus: Application.Types.Status = useSelector(LSCVSAccountSlice.SearchStatus);
    const search: Search.IFilter<SystemCenter.Types.LSCVSAccount>[] = useSelector(LSCVSAccountSlice.SearchFilters);
    const status: Application.Types.Status = useSelector(LSCVSAccountSlice.Status);
    const data: SystemCenter.Types.LSCVSAccount[] = useSelector(LSCVSAccountSlice.SearchResults);
    const parentID = useSelector(LSCVSAccountSlice.ParentID);
    const dispatch = useDispatch();


    const emptyLSCVS = { ID: 0, AccountID: '', CustomerID: props.CustomerID };
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [newLSCVSAccount, setNewLSCVSAccount] = React.useState<SystemCenter.Types.LSCVSAccount>(emptyLSCVS)
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [sortField, setSortField] = React.useState<keyof SystemCenter.Types.LSCVSAccount>('AccountID');
    const [errors, setErrors] = React.useState<string[]>([]);

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
                    <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                        <Table<SystemCenter.Types.LSCVSAccount>
                            cols={[
                                { key: 'AccountID', field: 'AccountID', label: 'Account IDs', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                            ]}
                            tableClass="table table-hover"
                            data={data}
                            sortKey={sortField}
                            ascending={ascending}
                            onSort={(d) => {
                                if (d.colKey === 'scroll' || d.colField === undefined)
                                    return;
                                if (d.colField === sortField)
                                    setAscending(!ascending);
                                else {
                                    setAscending(true);
                                    setSortField(d.colField);
                                }
                            }}
                            onClick={() => true}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => false}
                        />
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" onClick={() => setShowAdd(true)}>Add Account ID</button>
                </div>
                <Modal Title={'Add an Account ID'}
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
                        <Input<SystemCenter.Types.LSCVSAccount> Record={newLSCVSAccount} Field={'AccountID'} Label={'Account ID'} Setter={setNewLSCVSAccount} Valid={Valid} Feedback={"A Valid Account ID is needed."} />
                    </form>
                </Modal>
            </div>
        </>
    );
}

export default MDMKeys