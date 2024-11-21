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
import { useAppDispatch, useAppSelector } from '../hooks';
import { ReactTable } from '@gpa-gemstone/react-table';
import { SystemCenter, Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { RemoteXDAMeterSlice, ByMeterSlice, RemoteXDAAssetSlice } from '../Store/Store';
import { LoadingScreen, Modal, Search, ServerErrorIcon, ToolTip, Warning } from '@gpa-gemstone/react-interactive';
import { CrossMark, HeavyCheckMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { BlankRemoteXDAMeter, RemoteMeterForm } from './RemoteMeterForm';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { SelectRoles } from '../Store/UserSettings';

interface IProps { ID: number }


const RemoteMeterTab = (props: IProps) => {
    // Display Remote Meters Consts
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.RemoteXDAMeter>('LocalMeterName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const dispatch = useAppDispatch();
    const remoteMeterStatus = useAppSelector(RemoteXDAMeterSlice.Status) as Application.Types.Status;
    const searchResults = useAppSelector(RemoteXDAMeterSlice.SearchResults);
    const searchState = useAppSelector(RemoteXDAMeterSlice.SearchStatus);

    const searchFilters: Search.IFilter<OpenXDA.Types.RemoteXDAMeter>[] =
        [{
            FieldName: 'RemoteXDAInstanceID',
            SearchText: props.ID.toString(),
            Operator: '=',
            Type: 'number',
            IsPivotColumn: false
        }]

    const noSameFilter: Search.IFilter<OpenXDA.Types.RemoteXDAMeter> = {
        FieldName: 'ID',
        SearchText: searchResults.map((r) => r.LocalXDAMeterID).join(','),
        Operator: 'NOT IN',
        Type: 'number',
        IsPivotColumn: false
    };
    // Shared Consts
    const [selectedMeter, setSelectedMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(BlankRemoteXDAMeter);

    // Edit and Delete Form Consts
    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);
    const [remoteMeter, setRemoteMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(BlankRemoteXDAMeter);
    const [showEdit, setShowEdit] = React.useState<(boolean)>(false);
    const [showDelete, setShowDelete] = React.useState<(boolean)>(false);

    // Add New Meter Consts
    const meterStatus = useAppSelector(ByMeterSlice.Status) as Application.Types.Status;
    const [meterList, setMeterList] = React.useState<Array<SystemCenter.Types.DetailedMeter>>([]);
    const [showAddMeters, setShowAddMeters] = React.useState<(boolean)>(false);

    // Add New Assets for Meter
    const [showLoading, setShowLoading] = React.useState<(boolean)>(false);
    const [assetCount, setAssetCount] = React.useState<number>(0);

    const roles = useAppSelector(SelectRoles);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

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

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0)
            return false;
        return true;
    }

    let cardBody;
    if (remoteMeterStatus === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
    } else if (remoteMeterStatus === 'loading' || showLoading) {
        cardBody = <LoadingScreen Show={true} />
    } else {
        cardBody =
            <ReactTable.Table<OpenXDA.Types.RemoteXDAMeter>
                TableClass="table table-hover"
                Data={searchResults}
                SortKey={sortKey}
                Ascending={ascending}
                OnSort={(d) => {
                    if (d.colKey == 'Edit' || d.colKey == 'Delete') return;
                    if (d.colKey === sortKey)
                        setAscending(!ascending);
                    else {
                        setAscending(true);
                        setSortKey(d.colField);
                    }
                }}
                TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
                RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'LocalMeterName'}
                    AllowSort={true}
                    Field={'LocalMeterName'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Local Meter Name
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'LocalAssetKey'}
                    AllowSort={true}
                    Field={'LocalAssetKey'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Local Meter Key
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'LocalAlias'}
                    AllowSort={true}
                    Field={'LocalAlias'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Local Meter Alias
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'RemoteXDAName'}
                    AllowSort={true}
                    Field={'RemoteXDAName'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.Obsfucate ? item.RemoteXDAName : item.LocalMeterName}
                > Remote Meter Name
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'RemoteXDAAssetKey'}
                    AllowSort={true}
                    Field={'RemoteXDAAssetKey'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Remote Meter Key
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'RemoteAlias'}
                    AllowSort={true}
                    Field={'RemoteAlias'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Remote Meter Alias
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'Obsfucate'}
                    AllowSort={true}
                    Field={'Obsfucate'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.Obsfucate ? HeavyCheckMark : null }
                > Obfuscated
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'Synced'}
                    AllowSort={true}
                    Field={'Synced'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.Synced ? HeavyCheckMark : null }
                > Synced
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'Edit'}
                    AllowSort={false}
                    HeaderStyle={{ width: '10%' }}
                    RowStyle={{ width: '10%' }}
                    Content={({ item }) => (isEditable(item) ?
                        <button
                            className={"btn btn-edit" + (isEditable(item) ? '' : ' disabled') + (hasPermissions() ? '' : ' disabled')}
                            onClick={(e) => {
                                if (hasPermissions()) {
                                    e.preventDefault();
                                    if (isEditable(item)) {
                                        setSelectedMeter(item);
                                        setShowEdit(true);
                                    }
                                }
                            }}>
                            <span>{Pencil}</span>
                        </button> : null)
                    }
                > <p></p>
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.RemoteXDAMeter>
                    Key={'Delete'}
                    AllowSort={false}
                    HeaderStyle={{ width: '10%' }}
                    RowStyle={{ width: '10%' }}
                    Content={({ item }) => (isEditable(item) ?
                        <button
                            className={"btn btn-delete" + (isEditable(item) ? '' : ' disabled') + (hasPermissions() ? '' : ' disabled')}
                            onClick={(e) => {
                                if (hasPermissions()) {
                                    e.preventDefault();
                                    if (isEditable(item)) {
                                        setSelectedMeter(item);
                                        setShowDelete(true);
                                    }
                                }
                            }}>
                            <span>{TrashCan}</span>
                        </button> : null)
                    }
                > <p></p>
                </ReactTable.Column>
            </ReactTable.Table>
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Remote openXDA Meters:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                {cardBody}
            </div>
            <div className="card-footer">
                <div className="add-new-meter">
                    <button
                        className={"btn btn-info" + (hasPermissions() ? '' : ' disabled')}
                        type="submit" data-tooltip='AddMeters' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}
                        onClick={(e) => {
                            if (hasPermissions()) {
                                e.preventDefault();
                                setShowAddMeters(true);
                            }
                        }}>
                        Add Meter
                    </button>
                </div>
                <ToolTip Show={hover == 'submit' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"AddMeters"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>
            <Warning Title={"Delete " + (selectedMeter?.RemoteXDAName ?? "Remote Meter")} Show={showDelete} Message={"Are you sure you want to delete the Remote Meter for " + (selectedMeter?.LocalMeterName ?? "No Local Name") + "?"}
                CallBack={(conf) => {
                    if (conf) dispatch(RemoteXDAMeterSlice.DBAction({ verb: 'DELETE', record: selectedMeter }));
                    setShowDelete(false);
                }}/>
            <Modal Show={showEdit} Title={'Edit ' + (selectedMeter?.LocalMeterName ?? 'Remote Meter')}
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
            <Modal Show={assetCount > 0} Title={'Add Associated Remote Assets?'}
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
                <p>Add { assetCount } Associated Assets?</p>
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
                            LocalAssetKey: "",
                            RemoteAlias: ""
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
                    { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location', field: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                Title={"Add Meter to Remote openXDA Instance:"}
                GetEnum={() => () => { }}
                GetAddlFields={() => () => { }}
                AddlFilters={[noSameFilter]}
            />
        </div>
    );


}

export default RemoteMeterTab;