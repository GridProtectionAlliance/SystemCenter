//******************************************************************************************************
//  MeterEventChannel.tsx - Gbtc
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
import { SystemCenter, Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { RemoteXDAMeterSlice, ByMeterSlice } from '../Store/Store';
import { LoadingScreen, Modal, Search, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { CrossMark, HeavyCheckMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { BlankRemoteXDAMeter, RemoteMeterForm } from './RemoteMeterForm';
import { DefaultSelects } from '@gpa-gemstone/common-pages';

interface IProps { ID: number }


const RemoteMeterTab = (props: IProps) => {
    // Display Remote Meters Consts
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.RemoteXDAMeter>('LocalMeterName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const dispatch = useDispatch();
    const remoteMeterStatus = useSelector(RemoteXDAMeterSlice.Status) as Application.Types.Status;
    const searchResults = useSelector(RemoteXDAMeterSlice.SearchResults);
    const searchState = useSelector(RemoteXDAMeterSlice.SearchStatus);

    const searchFilters: Search.IFilter<OpenXDA.Types.RemoteXDAMeter>[] =
        [{
            FieldName: 'RemoteXDAInstanceID',
            SearchText: props.ID.toString(),
            Operator: '=',
            Type: 'number',
            isPivotColumn: false
        }]

    // Edit and Delete Form Consts
    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);
    const [remoteMeter, setRemoteMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(BlankRemoteXDAMeter);
    const [selectedMeter, setSelectedMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(BlankRemoteXDAMeter);
    const [showEdit, setShowEdit] = React.useState<(boolean)>(false);

    // Add New Meter Consts
    const meterStatus = useSelector(ByMeterSlice.Status) as Application.Types.Status;
    const [meterList, setMeterList] = React.useState<Array<SystemCenter.Types.DetailedMeter>>([]);
    const [showAddMeters, setShowAddMeters] = React.useState<(boolean)>(false);

    React.useEffect(() => {
        if (remoteMeterStatus === 'unintiated' || remoteMeterStatus === 'changed')
            dispatch(RemoteXDAMeterSlice.Fetch());
    }, [dispatch, remoteMeterStatus]);

    React.useEffect(() => {
        if (meterStatus === 'unintiated' || meterStatus === 'changed')
            dispatch(ByMeterSlice.Fetch());
    }, [dispatch, meterStatus]);

    React.useEffect(() => {
        if (searchState === 'unintiated' || searchState === 'changed')
            dispatch(RemoteXDAMeterSlice.DBSearch({ filter: searchFilters, ascending: ascending, sortField: sortKey }));
    }, [dispatch, searchState]);

    React.useEffect(() => {
        dispatch(RemoteXDAMeterSlice.DBSearch({ sortField: sortKey, ascending, filter: searchFilters }))
    }, [ascending, sortKey]);

    function isEditable(item: OpenXDA.Types.RemoteXDAMeter): boolean {
        return item.RemoteXDAMeterID <= 0;
    }

    let cardBody;
    if (remoteMeterStatus === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
    } else if (remoteMeterStatus === 'loading') {
        cardBody = <LoadingScreen Show={true} />
    } else {
        cardBody =
            <Table<OpenXDA.Types.RemoteXDAMeter>
                cols={[
                { key: 'LocalMeterName', field: 'LocalMeterName', label: 'Name (Local)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'LocalAssetKey', field: 'LocalAssetKey', label: 'Asset Key (Local)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'LocalAlias', field: 'LocalAlias', label: 'Alias (Local)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'RemoteXDAName', field: 'RemoteXDAName', label: 'Name (Remote)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'RemoteXDAAssetKey', field: 'RemoteXDAAssetKey', label: 'Asset Key (Remote)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                {
                    key: 'RemoteAlias', field: 'RemoteXDAName', label: 'Alias (Remote)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                    content: (item) => item.Obsfucate ? item.RemoteXDAName : item.LocalAlias
                },
                {
                    key: 'Obsfucate', field: 'Obsfucate', label: 'Obfuscated', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
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
                                    setSelectedMeter(item);
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
                                if (isEditable(item)) dispatch(RemoteXDAMeterSlice.DBAction({ verb: 'DELETE', record: item }));
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
                        <h4>Remote XDA Meters::</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                {cardBody}
            </div>
            <div className="card-footer">
            </div>
            <div className="add-new-meter">
                <button
                    className={"btn btn-primary"}
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowAddMeters(true);
                    }}>
                    Add Meters
                </button>
            </div>
            <Modal Show={showEdit} Title={'Edit Remote Meter: ' + selectedMeter.LocalMeterName}
                ShowCancel={true}
                CallBack={(conf) => {
                    if (conf) {
                        dispatch(RemoteXDAMeterSlice.DBAction({ verb: 'PATCH', record: remoteMeter }));
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
                <RemoteMeterForm OriginalMeter={selectedMeter} SetRemoteMeter={setRemoteMeter} SetErrors={setNewInstErrors} />
            </Modal>
            <DefaultSelects.Meter
                Slice={ByMeterSlice}
                Selection={meterList}
                OnClose={(selected, conf) => {
                    setShowAddMeters(false);
                    setMeterList([]);
                    if (!conf) return;
                    let newRemotes: Array<SystemCenter.Types.DetailedMeter> = [];
                    selected.forEach((meter) => { })

                }}
                Show={showAddMeters}
                Type={'multiple'}
                Columns={[
                    { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Email', field: 'Email', label: 'Email', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                Title={"Select user for this remoteXDA instance: "}
                GetEnum={() => () => { }}
                GetAddlFields={() => () => { }}
            />
        </div>
    );


}

export default RemoteMeterTab;