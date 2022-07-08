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
import { RemoteXDAMeterSlice, ByMeterSlice, RemoteXDAAssetSlice } from '../Store/Store';
import { LoadingScreen, Modal, Search, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
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

    // Shared Consts
    const [selectedMeter, setSelectedMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(BlankRemoteXDAMeter);

    // Edit and Delete Form Consts
    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);
    const [remoteMeter, setRemoteMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(BlankRemoteXDAMeter);
    const [showEdit, setShowEdit] = React.useState<(boolean)>(false);
    const [showDelete, setShowDelete] = React.useState<(boolean)>(false);

    // Add New Meter Consts
    const meterStatus = useSelector(ByMeterSlice.Status) as Application.Types.Status;
    const [meterList, setMeterList] = React.useState<Array<SystemCenter.Types.DetailedMeter>>([]);
    const [showAddMeters, setShowAddMeters] = React.useState<(boolean)>(false);

    // Add New Assets for Meter
    const [showLoading, setShowLoading] = React.useState<(boolean)>(false);
    const [assetCount, setAssetCount] = React.useState<number>(0);


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

    function getAssociatedAssetCount(meter: OpenXDA.Types.RemoteXDAMeter): JQuery.jqXHR<number> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/ByAsset/Associated/Count/${meter.RemoteXDAInstanceID}/${meter.LocalXDAMeterID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }

    function addAssociatedAssets(meter: OpenXDA.Types.RemoteXDAMeter): JQuery.jqXHR<number> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/ByAsset/Associated/Add/${meter.RemoteXDAInstanceID}/${meter.LocalXDAMeterID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }

    let cardBody;
    if (remoteMeterStatus === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
    } else if (remoteMeterStatus === 'loading' || showLoading) {
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
                                if (isEditable(item)) {
                                    setSelectedMeter(item);
                                    setShowDelete(true);
                                }
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
                        <h4>Remote XDA Meters:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                {cardBody}
            </div>
            <div className="card-footer">
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
            </div>
            <Warning Title={"Delete Remote Meter"} Show={showDelete} Message={"Are you sure you want to delete the remote meter for " + selectedMeter.LocalMeterName + "?"}
                CallBack={(conf) => {
                    if (conf) dispatch(RemoteXDAMeterSlice.DBAction({ verb: 'DELETE', record: selectedMeter }));
                    setShowDelete(false);
                }}/>
            <Modal Show={showEdit} Title={'Edit Remote Meter: ' + selectedMeter.LocalMeterName}
                ShowCancel={true}
                CallBack={(conf) => {
                    if (conf) dispatch(RemoteXDAMeterSlice.DBAction({ verb: 'PATCH', record: remoteMeter }));
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
            <Modal Show={assetCount > 0} Title={'Add Associated Remote Asset(s)?'}
                ShowCancel={true}
                CallBack={(conf) => {
                    setAssetCount(0);
                    if (conf) {
                        let addAssetHandle = addAssociatedAssets(selectedMeter);
                        addAssetHandle.then((data: number) => {
                            dispatch(RemoteXDAAssetSlice.Fetch()); // TODO: This doesn't properly reload the asset slice when switching tabs
                        });
                        return () => {
                            if (addAssetHandle != null && addAssetHandle.abort != null) {
                                addAssetHandle.abort();
                            }
                        };

                    }
                }}
                ShowX={true} Size={"sm"}
                ConfirmText={"Yes"}
                CancelText={"No"}>
                <p>Add { assetCount } Associated Asset(s)?</p>
            </Modal>
            <DefaultSelects.Meter
                Slice={ByMeterSlice}
                Selection={meterList}
                OnClose={(selected, conf) => {
                    setShowAddMeters(false);
                    setMeterList([]);
                    if (!conf) return;
                    selected.forEach((meter) => {
                        setShowLoading(true);
                        let newRemote: OpenXDA.Types.RemoteXDAMeter = {
                            ID: -1,
                            RemoteXDAInstanceID: props.ID,
                            LocalXDAMeterID: meter.ID,
                            RemoteXDAMeterID: -1,
                            RemoteXDAName: "",
                            RemoteXDAAssetKey: meter.AssetKey,
                            Obsfucate: false,
                            Synced: false,
                            LocalAlias: "",
                            LocalMeterName: "",
                            LocalAssetKey: ""
                        }
                        dispatch(RemoteXDAMeterSlice.DBAction({ verb: "POST", record: newRemote }));
                        setSelectedMeter(newRemote); // Technically, this is a race condition with setAssetCount
                        let fetchAssetHandle = getAssociatedAssetCount(newRemote);
                        fetchAssetHandle.then((data: number) => {
                            setAssetCount(data);
                            setShowLoading(false);
                        });
                        return () => {
                            if (fetchAssetHandle != null && fetchAssetHandle.abort != null) {
                                fetchAssetHandle.abort();
                                setShowLoading(false);
                            }
                        };
                    });
                }}
                Show={showAddMeters}
                Type={'single'}
                Columns={[
                    { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetKey', field: 'AssetKey', label: 'Asset Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location', field: 'Location', label: 'Location', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                Title={"Select Meter to Add for this remoteXDA Instance:"}
                GetEnum={() => () => { }}
                GetAddlFields={() => () => { }}
            />
        </div>
    );


}

export default RemoteMeterTab;