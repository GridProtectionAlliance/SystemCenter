//******************************************************************************************************
//  MeterAsset.tsx - Gbtc
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
//  01/16/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Warning, Modal, LoadingScreen, ServerErrorIcon, GenericController } from '@gpa-gemstone/react-interactive';
import { DatePicker, Select, ToolTip } from '@gpa-gemstone/react-forms';
import moment from 'moment';
import { SelectRoles } from '../Store/UserSettings';
import { useAppSelector } from '../hooks';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter }

//TODO: Move to Gemstone when updating application typings
interface MaintenanceWindow {
    ID: number,
    MeterID: number,
    StartTime: string,
    EndTime: string
}

const MeterMaintenanceWindow = (props: IProps) => {
    const MeterMaintenanceController = new GenericController<MaintenanceWindow>(`${homePath}api/OpenXDA/MaintenanceWindow`, "ID", true);
    const PagingID = 'MeterMaintenancePage'
    // Table Consts
    const [sortKey, setSortKey] = React.useState<keyof MaintenanceWindow>('StartTime');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [tableData, setTableData] = React.useState<MaintenanceWindow[]>([]);

    // Modal Consts
    const [showEditNew, setShowEditNew] = React.useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = React.useState<boolean>(false);
    const [activeWindow, setActiveWindow] = React.useState<MaintenanceWindow>(null);
    const [reset, setReset] = React.useState<number>(0);

    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');

    const roles = useAppSelector(SelectRoles);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None' | 'Add')>('None');

    const defaultFormat = 'YYYY-MM-DD[T]hh:mm:ss';

    React.useEffect(() => {
            let storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
            if (storedInfo == null || storedInfo == 0) return; // page 0 means it's on a real page
            if (storedInfo + 1 > pageInfo.NumberOfPages) {
                storedInfo = Math.max(0, pageInfo.NumberOfPages - 1);
                localStorage.setItem(PagingID, `${storedInfo}`);
            }
            setPage(storedInfo);
    }, [pageInfo.TotalRecords]); // Make sure user is still on a real page when data is deleted or filtered out

    React.useEffect(() => {
        localStorage.setItem(PagingID, JSON.stringify(page));
    }, [page]);

    React.useEffect(() => {
        setPageState('loading');
        const handle = MeterMaintenanceController.PagedSearch([], sortKey, ascending, page, props.Meter.ID).done((result) => {
            setTableData(JSON.parse(result.Data as unknown as string));
            if (result.NumberOfPages == 0) result.NumberOfPages = 1;
            setPageInfo(result);
            setPageState('idle');
        }).fail(() => setPageState('error'));
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [sortKey, ascending, page, props.Meter.ID, reset])

    function dbMaintenanceWindow(verb: 'POST' | 'DELETE' | 'PATCH', record: MaintenanceWindow): JQuery.jqXHR<MaintenanceWindow[]> {
        setStatus('loading');
        let action = (verb === 'POST') ? 'Add' : ((verb === 'DELETE') ? 'Delete' : 'Update');
        let handle = $.ajax({
            type: verb,
            url: `${homePath}api/OpenXDA/MaintenanceWindow/${action}`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ...record }),
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done((_data) => {
            setReset(x => x + 1);
            setStatus('idle');
        }).fail(() => setStatus('error'));
        return handle;
    }

    function hasError(): boolean {
        return (
            activeWindow.StartTime !== null &&
            activeWindow.EndTime !== null &&
            moment(activeWindow.StartTime, defaultFormat).valueOf() > moment(activeWindow.EndTime, defaultFormat).valueOf()
        );
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    let cardBody;
    if (status === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
    } else if (status === 'loading') {
        cardBody = <LoadingScreen Show={true} />
    } else {
        cardBody = (
            <>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Table<MaintenanceWindow>
                        TableClass="table table-hover"
                        Data={tableData}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === 'EditDelete')
                                return;
                            if (d.colKey == sortKey)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortKey(d.colKey as keyof MaintenanceWindow);
                            }
                        }}
                        TableStyle={{ tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<MaintenanceWindow>
                            Key={'StartTime'}
                            AllowSort={true}
                            Field={'StartTime'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.StartTime ? moment(item.StartTime, defaultFormat).format('MM/DD/YYYY hh:mm A') : 'This window starts at meter creation'}
                        > Start Window Time
                        </Column>
                        <Column<MaintenanceWindow>
                            Key={'EndTime'}
                            AllowSort={true}
                            Field={'EndTime'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) => item.EndTime ? moment(item.EndTime, defaultFormat).format('MM/DD/YYYY hh:mm A') : 'This window has no end time'}
                        > End Window Time
                        </Column>
                        <Column<MaintenanceWindow>
                            Key={'EditDelete'}
                            AllowSort={false}
                            HeaderStyle={{ width: 'auto', paddingLeft: 0, paddingRight: 5 }}
                            RowStyle={{ width: 'auto', paddingLeft: 0, paddingRight: 5 }}
                            Content={({ item }) => <>
                                <button className="btn btn-sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveWindow(item);
                                        setShowEditNew(true);
                                    }}><span><ReactIcons.Pencil Color="var(--warning)" Size={20} /></span></button>
                                <button className="btn btn-sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveWindow(item);
                                        setShowDeleteWarning(true);
                                    }}><span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span></button>
                            </>}
                        > <p></p>
                        </Column>
                    </Table>
                    <LoadingScreen Show={pageState == 'loading'} />
                    <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                    <div className="row">
                        <div className="col">
                            <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                        </div>
                    </div>
                </div>
            </>
        );

        return (
            <>
                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Meter Maintenance Windows:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingBottom: 0, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                        {cardBody}
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-info pull-right" + (!hasPermissions() ? ' disabled' : '')} style={{ marginRight: 5 }} data-tooltip='NewWindow' onMouseEnter={() => setHover('Add')} onMouseLeave={() => setHover('None')} onClick={(e) => {
                                e.preventDefault();
                                setActiveWindow({
                                    ID: -1,
                                    MeterID: props.Meter.ID,
                                    StartTime: moment().format('YYYY-MM-DD'),
                                    EndTime: null
                                });
                                if (hasPermissions()) setShowEditNew(true);
                            }}>Add New Window</button>
                        </div>
                        <ToolTip Show={hover == 'Add' && !hasPermissions()} Position={'top'} Target={"NewWindow"}>
                            <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                        </ToolTip>
                    </div>
                </div>
                {activeWindow === null ? null : <>
                    <Warning Show={showDeleteWarning} Title={'Remove Maintenance Window from ' + (props.Meter?.Name ?? 'Meter')} Message={'This will permanently remove this Maintenance Window from the Meter.'}
                        CallBack={(confirmed) => {
                            setShowDeleteWarning(false);
                            if (confirmed) {
                                let handle = dbMaintenanceWindow('DELETE', activeWindow);
                                return () => {
                                    if (handle != null && handle.abort != null)
                                        handle.abort();
                                };
                            }
                        }}
                    />
                    <Modal Show={showEditNew}
                        Title={activeWindow.ID > 0 ? 'Edit Maintenance Window for ' + (props.Meter?.Name ?? 'Meter') : 'Add New Maintenance Window to ' + (props.Meter?.Name ?? 'Meter')}
                        Size={'lg'}
                        ShowX={true}
                        ShowCancel={false}
                        DisableConfirm={hasError()}
                        ConfirmShowToolTip={hasError()}
                        ConfirmToolTipContent={<p><ReactIcons.Warning Color="var(--warning)" /> Start Time cannot be after the End Time.</p>}
                        ConfirmText={'Save'}
                        CallBack={(confirmed) => {
                            setShowEditNew(false);
                            if (confirmed) {
                                let handle = dbMaintenanceWindow(activeWindow.ID > 0 ? 'PATCH' : 'POST', activeWindow);
                                return () => {
                                    if (handle != null && handle.abort != null)
                                        handle.abort();
                                };
                            }
                        }}
                    >
                        <EnableTimeElement<MaintenanceWindow> Record={activeWindow} Setter={setActiveWindow} Field={'StartTime'} SelectLabel={'Start at Meter Creation'} DateLabel={'Start at Specified Date'} />
                        <EnableTimeElement<MaintenanceWindow> Record={activeWindow} Setter={setActiveWindow} Field={'EndTime'} SelectLabel={'Have no End Date'} DateLabel={'End at Specified Date'} />
                    </Modal>
                </>}
            </>
        );
    }
}

interface ITimeProps<T> {
    Record: T,
    Setter: (T) => void,
    Field: keyof T,
    SelectLabel: string,
    DateLabel: string
}
function EnableTimeElement<T>(props: ITimeProps<T>): React.ReactElement {
    const [showElement, setShowElement] = React.useState<{ checked: string }>({ checked: props.Record[props.Field] !== null ? '1' : '' });
    const options = [{ Value: '1', Label: props.DateLabel }, { Value: '', Label: props.SelectLabel }]
    return (
        <div className="row" style={{ paddingLeft: 20 }}>
            <div className="col" style={{ paddingRight: 20, width: '50%' }}>
                <Select<{ checked: string }> Record={showElement} Field='checked' Label={''} Setter={(newShow) => {
                    if (!newShow.checked)
                        props.Setter({ ...props.Record, [props.Field]: null });
                    else
                        props.Setter({ ...props.Record, [props.Field]: moment().format('YYYY-MM-DD') });
                    setShowElement(newShow);
                }} Options={options} />
            </div>
            <div className="col" style={{ paddingLeft: 20, width: '50%' }}>
                {showElement.checked ?
                    <DatePicker Record={props.Record} Field={props.Field} Setter={props.Setter} Valid={() => true} Label={''} Type='datetime-local' Disabled={!showElement.checked} />
                    : null}
            </div>
        </div>);
}

export default MeterMaintenanceWindow;