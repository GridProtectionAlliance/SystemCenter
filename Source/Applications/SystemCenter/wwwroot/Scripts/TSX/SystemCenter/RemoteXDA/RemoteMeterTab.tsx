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
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { SystemCenter, Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { RemoteXDAMeterSlice, ByMeterSlice, RemoteXDAAssetSlice } from '../Store/Store';
import { GenericController, LoadingScreen, Modal, Search, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { BlankRemoteXDAMeter, RemoteMeterForm } from './RemoteMeterForm';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
import { SelectRoles } from '../Store/UserSettings';

interface IProps { ID: number }


const RemoteMeterTab = (props: IProps) => {

    const dispatch = useAppDispatch();

    // Meters Table
    const [meters, setMeters] = React.useState<OpenXDA.Types.RemoteXDAMeter[]>([]);
    const [searchStatus, setSearchStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.RemoteXDAMeter>('LocalMeterName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    // Remote Meters pagination
    const [page, setPage] = React.useState<number>(0)
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);

    // Shared
    const [selectedMeter, setSelectedMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(BlankRemoteXDAMeter);

    // Edit and Delete Form
    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);
    const [remoteMeter, setRemoteMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(BlankRemoteXDAMeter);
    const [showEdit, setShowEdit] = React.useState<(boolean)>(false);
    const [showDelete, setShowDelete] = React.useState<(boolean)>(false);

    // Add New Meter
    const [meterStatus, setMeterStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [meterList, setMeterList] = React.useState<Array<SystemCenter.Types.DetailedMeter>>([]);
    const [showAddMeters, setShowAddMeters] = React.useState<(boolean)>(false);

    // Add New Assets for Meter
    const [showLoading, setShowLoading] = React.useState<(boolean)>(false);
    const [assetCount, setAssetCount] = React.useState<number>(0);

    // DB Actions
    const [remoteStatus, setRemoveStatus] = React.useState<Application.Types.Status>('idle');
    const [addMeterStatus, setAddMeterStatus] = React.useState<Application.Types.Status>('idle');
    const [addAssetStatus, setAddAssetStatus] = React.useState<Application.Types.Status>('idle');
    const [editStatus, setEditStatus] = React.useState<Application.Types.Status>('idle');

    const roles = useAppSelector(SelectRoles);

    const remoteMeterController = React.useMemo(() => new GenericController<OpenXDA.Types.RemoteXDAMeter>(`${homePath}api/OpenXDA/RemoteXDAMeter`, "LocalMeterName", false), [])

    const noSameFilter: Search.IFilter<OpenXDA.Types.RemoteXDAMeter> = {
        FieldName: 'ID',
        SearchText: meters.map((r) => r.LocalXDAMeterID).join(','),
        Operator: 'NOT IN',
        Type: 'number',
        IsPivotColumn: false
    };

    // fetch remote meters for the XDA node, paged and sorted
    React.useEffect(() => {
        setSearchStatus('loading');

        const searchFilters: Search.IFilter<OpenXDA.Types.RemoteXDAMeter>[] =
            [{
                FieldName: 'RemoteXDAInstanceID',
                SearchText: props.ID.toString(),
                Operator: '=',
                Type: 'number',
                IsPivotColumn: false
            }]

        const handle = remoteMeterController.PagedSearch(searchFilters, sortKey, ascending, page);

        handle.done((d) => {
            setMeters(JSON.parse(d.Data as unknown as string));
            setTotalPages(d.NumberOfPages);
            setTotalRecords(d.TotalRecords);
            setRecordsPerPage(d.RecordsPerPage);
            if (page >= d.NumberOfPages)
                setPage(Math.max(d.NumberOfPages - 1, 0));
            setSearchStatus('idle')
        })

        handle.fail(() => setSearchStatus('error'));

        return () => {
            if (handle != null && handle.abort)
                handle.abort()
        }
       
    }, [props.ID, ascending, sortKey, page, remoteMeterController, refreshTrigger]);

    React.useEffect(() => {
        setMeterStatus('loading');

        const handle = new GenericController<SystemCenter.Types.DetailedMeter>(`${homePath}api/OpenXDA/ByMeter`, "Name", true).Fetch();

        handle.done((d) => {
            setMeterList(d);
            setMeterStatus('idle')
        })

        handle.fail(() => setMeterStatus('error'));

        return () => {
            if (handle != null && handle.abort)
                handle.abort()
        }
    }, []);


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
    if (searchStatus === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
    } else if (searchStatus === 'loading' || showLoading) {
        cardBody = <LoadingScreen Show={true} />
    } else {
        cardBody =
            <>
            <div className="row d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
                    <Table<OpenXDA.Types.RemoteXDAMeter>
                        TableClass="table table-hover"
                        Data={meters}
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
                        TheadStyle={{ fontSize: 'smaller' }}
                        RowStyle={{ fontSize: 'smaller' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<OpenXDA.Types.RemoteXDAMeter>
                            Key={'LocalMeterName'}
                            AllowSort={true}
                            Field={'LocalMeterName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Local Name
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAMeter>
                            Key={'LocalAssetKey'}
                            AllowSort={true}
                            Field={'LocalAssetKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Local Key
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAMeter>
                            Key={'LocalAlias'}
                            AllowSort={true}
                            Field={'LocalAlias'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Local Alias
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAMeter>
                            Key={'RemoteXDAName'}
                            AllowSort={true}
                            Field={'RemoteXDAName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.Obsfucate ? item.RemoteXDAName : item.LocalMeterName}
                        > Remote Name
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAMeter>
                            Key={'RemoteXDAAssetKey'}
                            AllowSort={true}
                            Field={'RemoteXDAAssetKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Remote Key
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAMeter>
                            Key={'RemoteAlias'}
                            AllowSort={true}
                            Field={'RemoteAlias'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Remote Alias
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAMeter>
                            Key={'Obsfucate'}
                            AllowSort={true}
                            Field={'Obsfucate'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.Obsfucate ? <ReactIcons.CheckMark Color="var(--success)" /> : null}
                        > Obfuscated
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAMeter>
                            Key={'Synced'}
                            AllowSort={true}
                            Field={'Synced'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.Synced ? <ReactIcons.CheckMark Color="var(--success)" /> : null}
                        > Synced
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAMeter>
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
                                    <span><ReactIcons.Pencil Color="var(--warning)" Size={20} /></span>
                                </button> : null)
                            }
                        > <p></p>
                        </Column>
                        <Column<OpenXDA.Types.RemoteXDAMeter>
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
                                    <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                                </button> : null)
                            }
                        > <p></p>
                        </Column>
                    </Table>
                </div>
                <div className="row">
                    <div className="col">
                        <Paging
                            Current={page + 1}
                            SetPage={(page) => setPage(page - 1)}
                            Total={totalPages}
                        />
                    </div>
                </div>
            </>
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Remote openXDA Meters:</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p style={{ marginTop: 2, marginBottom: 2 }}>
                            {searchStatus === 'error' ? 'Could not complete Search' :
                                searchStatus === 'loading' ? 'Loading...' :
                                    `Displaying Meters(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + meters.length} out of ${totalRecords}`}

                        </p>
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
                <ToolTip Show={hover == 'submit' && !hasPermissions()} Position={'top'} Target={"AddMeters"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>
            <Warning Title={"Delete " + (selectedMeter?.RemoteXDAName ?? "Remote Meter")} Show={showDelete} Message={"Are you sure you want to delete the Remote Meter for " + (selectedMeter?.LocalMeterName ?? "No Local Name") + "?"}
                CallBack={(conf) => {
                    if (conf) {
                        setRemoveStatus('loading');
                        remoteMeterController.DBAction('DELETE', selectedMeter).done(() => { setRemoveStatus('idle'); setRefreshTrigger(val => !val); }).fail(() => setRemoveStatus('error'));
                    };
                    setShowDelete(false);
                }} />

            <Modal Show={showEdit} Title={'Edit ' + (selectedMeter?.LocalMeterName ?? 'Remote Meter')}
                ShowCancel={true}
                CallBack={(conf) => {
                    if (conf) {
                        setEditStatus('loading');
                        remoteMeterController.DBAction('PATCH', remoteMeter).done(() => { setEditStatus('idle'); setRefreshTrigger(val => !val); }).fail(() => setEditStatus('error'));
                    }
                    setShowEdit(false);
                }}
                DisableConfirm={newInstErrors.length > 0}
                ShowX={true}
                Size={"lg"}
                ConfirmShowToolTip={newInstErrors.length > 0}
                ConfirmToolTipContent={
                    newInstErrors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color="var(--danger)" /> {t} </p>)
                }>
                <RemoteMeterForm OriginalMeter={selectedMeter} SetRemoteMeter={setRemoteMeter} SetErrors={setNewInstErrors} />
            </Modal>

            <Modal Show={assetCount > 0} Title={'Add Associated Remote Assets?'}
                ShowCancel={true}
                CallBack={(conf) => {
                    setAssetCount(0);
                    if (conf) {
                        setAddAssetStatus('loading');
                        let addAssetHandle = addAssociatedAssets(selectedMeter);
                        addAssetHandle.done((data: number) => {
                            setAddAssetStatus('idle');
                        }).fail(() => setAddAssetStatus('error'));
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
                <p>Add {assetCount} Associated Assets?</p>
            </Modal>

            <DefaultSelects.Meter
                Slice={ByMeterSlice}
                Selection={meterList}
                OnClose={(selected, conf) => {
                    setShowAddMeters(false);
                    setMeterList([]);
                    if (!conf || selected.length == 0) return;
                    const meter = selected[0]
                    setAddMeterStatus('loading'); // this should become the dbaction status for add
                    const newRemote: OpenXDA.Types.RemoteXDAMeter = {
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
                    setSelectedMeter(newRemote);
                    remoteMeterController.DBAction('POST', newRemote).done(() => { setAddMeterStatus('idle'); setRefreshTrigger(val => !val); }).fail(() => setAddMeterStatus('error'));
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
                }}
                Show={showAddMeters}
                Type={'single'}
                Title={"Add Meter to Remote openXDA Instance:"}
                GetEnum={() => () => { }}
                GetAddlFields={() => () => { }}
                AddlFilters={[noSameFilter]}
            >
                <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Name</Column>
                <Column Key="AssetKey" Field="AssetKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Key</Column>
                <Column Key="Location" Field="Location" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
                >Substation</Column>
            </DefaultSelects.Meter>
        </div>
    );


}

export default RemoteMeterTab;