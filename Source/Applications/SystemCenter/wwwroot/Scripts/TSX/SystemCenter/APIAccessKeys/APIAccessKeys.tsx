//******************************************************************************************************
//  ByMagDurCurve.tsx - Gbtc
//
//  Copyright � 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  08/08/2024 - Ali Karrar
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { Application } from '@gpa-gemstone/application-typings';
import { SearchBar, Search, Modal, Warning } from '@gpa-gemstone/react-interactive';
import { useAppSelector, useAppDispatch } from '../hooks';
import { APIAccessKeySlice } from '../Store/Store';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import APIKeyForm from './APIKeyForm';
import moment from 'moment';
import { CreateGuid } from '@gpa-gemstone/helper-functions'


declare var homePath: string;

export interface IAPIAccessKey {
    ID: number;
    RegistrationKey: string;
    APIToken: string;
    Expires: string;
    AllowImpersonation: boolean;
}

const emptyKey: IAPIAccessKey = {
    ID: 0,
    RegistrationKey: '',
    APIToken: '',
    Expires: '',
    AllowImpersonation: false
};

const ByAPIAccessKeys: Application.Types.iByComponent = (props) => {
    let dispatch = useAppDispatch();

    const state = useAppSelector(APIAccessKeySlice.SearchStatus);
    const data = useAppSelector(APIAccessKeySlice.SearchResults);

    const sortKey = useAppSelector(APIAccessKeySlice.SortField);
    const filters = useAppSelector(APIAccessKeySlice.SearchFilters);
    const ascending = useAppSelector(APIAccessKeySlice.Ascending);

    const [APIKey, setAPIKey] = React.useState<IAPIAccessKey>(emptyKey);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [formDisabled, setFormDisabled] = React.useState<boolean>(false);
    
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [showKeyWarning, setShowKeyWarning] = React.useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [newEdit, setNewEdit] = React.useState<Application.Types.NewEdit>('Edit');


    React.useEffect(() => {
        if (state == 'unintiated' || state == 'changed')
            dispatch(APIAccessKeySlice.DBSearch({ filter: filters }));
    }, [state]);

    function handleSelect(item) {
        setAPIKey({...item.row, Expires: item.row.Expires ?? ''});
        setShowModal(true);
        setNewEdit('Edit');
    }

    const searchFields: Search.IField<IAPIAccessKey>[] = [
        { key: 'RegistrationKey', isPivotField: false, label: 'Registration Key', type: 'string' },
        { key: 'Expires', isPivotField: false, label: 'Key Expiration', type: 'datetime' }
    ]
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<IAPIAccessKey> CollumnList={searchFields}
                SetFilter={(flds) => dispatch(APIAccessKeySlice.DBSearch({ ascending, filter: flds }))}
                Direction={'left'}
                defaultCollumn={{ key: 'RegistrationKey', isPivotField: false, label: 'RegistrationKey', type: 'string' }}
                Width={'50%'} Label={'Search'}
                StorageID="APIAccessKeysFilter"
                ShowLoading={state == 'loading'}
                ResultNote={state == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Key(s)'}
            >
                <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <button className="btn btn-primary" onClick={(event) => { setAPIKey(emptyKey); setNewEdit('New'); setShowModal(true); event.preventDefault() }}>Add API Key</button>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <ReactTable.Table<IAPIAccessKey>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => dispatch(APIAccessKeySlice.Sort({ SortField: d.colField, Ascending: d.ascending }))}
                    OnClick={handleSelect}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<IAPIAccessKey>
                        Key={'RegistrationKey'}
                        AllowSort={true}
                        Field={'RegistrationKey'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Registration Key
                    </ReactTable.Column>
                    <ReactTable.Column<IAPIAccessKey>
                        Key={'APIToken'}
                        AllowSort={false}
                        Field={'APIToken'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > API Token
                    </ReactTable.Column>
                    <ReactTable.Column<IAPIAccessKey>
                        Key={'Expires'}
                        AllowSort={true}
                        Field={'Expires'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => item.Expires == null ? 'N/A' : moment(item.Expires).format("YYYY-MM-DD HH:mm:ss")}
                    > Expires
                    </ReactTable.Column>
                    <ReactTable.Column<IAPIAccessKey>
                        Key={'AllowImpersonation'}
                        AllowSort={false}
                        Field={'AllowImpersonation'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => item.AllowImpersonation ? HeavyCheckMark : CrossMark}
                    > Allow Impersonation
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Show={showModal} Title={newEdit == 'Edit' ? 'Edit ' + APIKey.RegistrationKey : 'Add New API Key'} CallBack={(c, b) => {
                if (newEdit == 'Edit' || !b) { setShowModal(false); setFormDisabled(false); setAPIKey(emptyKey); }          // X button is clicked

                if (!c && b)        // delete button is clicked
                    setShowDelete(true)
                if (c && newEdit == 'New') {        // Generate key button is clicked
                    const newToken = CreateGuid();
                    setAPIKey((key) => ({ ...key, APIToken: newToken })); setFormDisabled(true); setShowKeyWarning(true); dispatch(APIAccessKeySlice.DBAction({ verb: 'POST', record: {...APIKey, APIToken: newToken} }));
                }
                if (c && newEdit == 'Edit')           // save button is clicked on edit form
                    dispatch(APIAccessKeySlice.DBAction({ verb: 'PATCH', record: APIKey }));
            }}
                ShowCancel={newEdit == 'Edit'}
                ShowX={true}
                CancelText={'Delete'}
                DisableConfirm={errors.length > 0 || formDisabled}
                ConfirmText={newEdit == 'Edit' ? 'Save' : 'Generate New Key'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}> {CrossMark} {t}</p>)} >
                <div className="row">
                    <APIKeyForm Key={APIKey} formDisabled={formDisabled} stateSetter={setAPIKey} setErrors={setErrors} />
                </div>
            </Modal>

            <Warning Message={'This will permanently delete the API Key and cannot be undone.'} Show={showDelete} Title={'Delete ' + APIKey.RegistrationKey }
                CallBack={(c) => { if (c) { dispatch(APIAccessKeySlice.DBAction({ record: APIKey, verb: 'DELETE' })); setShowDelete(false); setAPIKey(emptyKey); } else setShowDelete(false)}}
            />

            <Warning Message={'You will only be able to view this API key once. If it is lost, you will need to generate a new one.'} Show={showKeyWarning} Title={'Attention: Save Your Key'}
                ShowCancel={false} CallBack={(c) => { if (c) setShowKeyWarning(false) }}
            />


        </div>
    )
}

export default ByAPIAccessKeys;
