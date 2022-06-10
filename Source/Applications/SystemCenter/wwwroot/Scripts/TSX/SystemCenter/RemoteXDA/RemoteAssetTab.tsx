//******************************************************************************************************
//  AssetEventChannel.tsx - Gbtc
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
//  04/19/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@gpa-gemstone/react-table';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { RemoteXDAAssetSlice } from '../Store/Store';
import { LoadingScreen, Modal, Search, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark, HeavyCheckMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { BlankRemoteXDAAsset, RemoteAssetForm } from './RemoteAssetForm';

interface IProps { ID: number }


const RemoteAssetTab = (props: IProps) => {
    // Display Remote Assets Consts
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.RemoteXDAAsset>('LocalAssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const dispatch = useDispatch();
    const remoteAssetStatus = useSelector(RemoteXDAAssetSlice.Status);
    const searchResults = useSelector(RemoteXDAAssetSlice.SearchResults);
    const searchState = useSelector(RemoteXDAAssetSlice.SearchStatus);

    const searchFilters: Search.IFilter<OpenXDA.Types.RemoteXDAAsset>[] =
    [{
        FieldName: 'RemoteXDAInstanceID',
        SearchText: props.ID.toString(),
        Operator: '=',
        Type: 'number',
        isPivotColumn: false
    }]

    // Edit and Delete Form Consts
    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);
    const [remoteAsset, setRemoteAsset] = React.useState<OpenXDA.Types.RemoteXDAAsset>(BlankRemoteXDAAsset);
    const [selectedAsset, setSelectedAsset] = React.useState<OpenXDA.Types.RemoteXDAAsset>(BlankRemoteXDAAsset);
    const [showEdit, setShowEdit] = React.useState<(boolean)>(false);

    React.useEffect(() => {
        if (remoteAssetStatus === 'unintiated' || remoteAssetStatus === 'changed')
            dispatch(RemoteXDAAssetSlice.Fetch());
    }, [dispatch, remoteAssetStatus]);

    React.useEffect(() => {
        if (searchState === 'unintiated' || searchState === 'changed')
            dispatch(RemoteXDAAssetSlice.DBSearch({ filter: searchFilters, ascending: ascending, sortField: sortKey }));
    }, [dispatch, searchState]);

    React.useEffect(() => {
        dispatch(RemoteXDAAssetSlice.DBSearch({ sortField: sortKey, ascending, filter: searchFilters }))
    }, [ascending, sortKey]);

    function isEditable(item: OpenXDA.Types.RemoteXDAAsset): boolean {
        return item.RemoteXDAAssetID <= 0;
    }

    let cardBody;
    if (remoteAssetStatus === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
    } else if (remoteAssetStatus === 'loading') {
        cardBody = <LoadingScreen Show={true} />
    } else {
        cardBody =
            <Table<OpenXDA.Types.RemoteXDAAsset>
                cols={[
                { key: 'LocalAssetName', field: 'LocalAssetName', label: 'Name (local)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'LocalAssetKey', field: 'LocalAssetKey', label: 'Key (local)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                {
                    key: 'RemoteAssetName', field: 'RemoteXDAAssetKey', label: 'Name (remote)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                    content: (item) => (item.Obsfucate ? item.RemoteXDAAssetKey : item.LocalAssetName)
                },
                {
                    key: 'RemoteXDAAssetKey', field: 'RemoteXDAAssetKey', label: 'Key (remote)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                    content: (item) => (item.Obsfucate ? item.RemoteXDAAssetKey : item.LocalAssetKey)
                },

                {
                    key: 'Obfuscated', field: 'Obsfucate', label: 'Obfuscated', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                    content: (item) => (item.Obsfucate ? HeavyCheckMark : null)
                },
                {
                    key: 'Synced', field: 'Synced', label: 'Synced', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                    content: (item) => (item.Synced ? HeavyCheckMark : null)
                },
                {
                    key: 'Edit', label: '', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
                    content: (item) => (isEditable(item) ? 
                        <button
                            className={"btn btn-edit" + (isEditable(item) ? '' : ' disabled')}
                            onClick={(e) => {
                                e.preventDefault();
                                if (isEditable(item)) {
                                    setSelectedAsset(item);
                                    setShowEdit(true);
                                }
                            }}>
                            <span>{Pencil}</span>
                        </button> : null)
                },
                {
                    key: 'Delete', label: '', headerStyle: { width: '10%' }, rowStyle: { width: '10%' },
                    content: (item) => (isEditable(item) ? 
                        <button
                            className={"btn btn-delete" + (isEditable(item) ? '' : ' disabled')}
                            onClick={(e) => {
                                e.preventDefault();
                                if (isEditable(item)) dispatch(RemoteXDAAssetSlice.DBAction({ verb: 'DELETE', record: item }));
                            }}>
                            <span>{TrashCan}</span>
                        </button> : null)
                },
                { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                tableClass="table table-hover"
                data={searchResults}
                sortKey={sortKey}
                ascending={ascending}
                onSort={(d) => {
                    if (d.colKey === "Scroll")
                        return;
                    if (d.colKey === sortKey)
                        setAscending(!ascending);
                    else {
                        setAscending(true);
                        setSortKey(d.colField);
                    }
                }}
                onClick={(item) => { }}
                theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                selected={(item) => false}
            />
    }

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Remote XDA Assets::</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                {cardBody}
            </div>
            <Modal Show={showEdit} Title={'Edit Remote Asset: ' + selectedAsset.LocalAssetName}
                ShowCancel={true}
                CallBack={(conf) => {
                    if (conf) {
                        dispatch(RemoteXDAAssetSlice.DBAction({ verb: 'PATCH', record: remoteAsset }));
                    }
                    setShowEdit(false);
                }}
                DisableConfirm={newInstErrors.length > 0}
                ShowX={true}
                Size={"lg"}
                ConfirmShowToolTip={newInstErrors.length > 0}
                ConfirmToolTipContent={
                    newInstErrors.map((t, i) => <p key={i}> {CrossMark} {t} </p>)
                }>
                <RemoteAssetForm OriginalAsset={selectedAsset} SetRemoteAsset={setRemoteAsset} SetErrors={setNewInstErrors} />
            </Modal>
        </div>
    );


}

export default RemoteAssetTab;