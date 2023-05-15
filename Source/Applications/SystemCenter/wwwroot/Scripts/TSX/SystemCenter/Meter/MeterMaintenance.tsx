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
import Table from '@gpa-gemstone/react-table';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Warning, Modal, LoadingScreen, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { Warning as WarningIcon } from '@gpa-gemstone/gpa-symbols';
import { DatePicker, Select } from '@gpa-gemstone/react-forms';
import moment from 'moment';

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
    // Table Consts
    const [sortKey, setSortKey] = React.useState<keyof MaintenanceWindow>('StartTime');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');
    const [tableData, setTableData] = React.useState<MaintenanceWindow[]>([]);

    // Modal Consts
    const [showEditNew, setShowEditNew] = React.useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = React.useState<boolean>(false);
    const [activeWindow, setActiveWindow] = React.useState<MaintenanceWindow>(null);
    const [reset, setReset] = React.useState<number>(0);

    const defaultFormat = 'YYYY-MM-DD[T]hh:mm:ss';

    React.useEffect(() => {
        let handle = getMaintenanceWindows();
        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        };
    }, [ascending, sortKey, props.Meter, reset]);

    function getMaintenanceWindows(): JQuery.jqXHR<MaintenanceWindow[]> {
        setStatus('loading');
        let handle = $.ajax({
            type: 'POST',
            url: `${homePath}api/OpenXDA/MaintenanceWindow/SearchableList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                Searches: [{ FieldName: 'MeterID', Operator: "=", SearchText: props.Meter.ID, Type: 'string', isPivotColumn: false }],
                OrderBy: sortKey,
                Ascending: ascending
            }),
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done((data) => {
            setTableData(JSON.parse(data.toString()));
            setStatus('idle');
        }).fail(() => setStatus('error'));
        return handle;
    }

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
        handle.done((data) => {
            setReset(x => x + 1);
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

    let cardBody;
    if (status === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
    } else if (status === 'loading') {
        cardBody = <LoadingScreen Show={true} />
    } else {
        cardBody = (
            <div className="row" style={{ margin: -20 }}>
                <div className="col" style={{ padding: 20 }}>
                    <div style={{ width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' }}>
                        <Table<MaintenanceWindow>
                            cols={[
                                {
                                    key: 'StartTime', field: 'StartTime', label: 'Start Window Time', headerStyle: { width: 'calc(50%-40px)' }, rowStyle: { width: 'calc(50%-40px)' },
                                    content: (item) => item.StartTime ? moment(item.StartTime, defaultFormat).format('MM/DD/YYYY hh:mm A') : 'This window starts at meter creation'
                                },
                                {
                                    key: 'EndTime', field: 'EndTime', label: 'End Window Time', headerStyle: { width: 'calc(50%-40x)' }, rowStyle: { width: 'calc(50%-40x)' },
                                    content: (item) => item.EndTime ? moment(item.EndTime, defaultFormat).format('MM/DD/YYYY hh:mm A') : 'This window has no end time'
                                },
                                {
                                    key: 'EditDelete', label: '', headerStyle: { width: 80, paddingLeft: 0, paddingRight: 5 }, rowStyle: { width: 80, paddingLeft: 0, paddingRight: 5 },
                                    content: (item) => <>
                                        <button className="btn btn-sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActiveWindow(item);
                                                setShowEditNew(true);
                                            }}><span>{Pencil}</span></button>
                                        <button className="btn btn-sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActiveWindow(item);
                                                setShowDeleteWarning(true);
                                            }}><span>{TrashCan}</span></button>
                                    </>
                                }
                            ]}
                            tableClass="table table-hover"
                            data={tableData}
                            sortKey={sortKey}
                            ascending={ascending}
                            onSort={(d) => {
                                if (d.colKey === 'EditDelete')
                                    return;
                                if (d.colKey == sortKey)
                                    setAscending(!ascending);
                                else {
                                    setAscending(true);
                                    setSortKey(d.colKey as keyof MaintenanceWindow);
                                }
                            }}
                            onClick={(fld) => { }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }}
                            rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => false}
                        />
                    </div>
                </div>
            </div>);

        return (
            <>
                <div className="card" style={{ marginBottom: 10 }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Meter Maintenance Windows:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {cardBody}
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className="btn btn-primary pull-left" style={{ marginRight: 5 }} onClick={(e) => {
                                e.preventDefault();
                                setActiveWindow({
                                    ID: -1,
                                    MeterID: props.Meter.ID,
                                    StartTime: moment().format('YYYY-MM-DD'),
                                    EndTime: null
                                });
                                setShowEditNew(true);
                            }}>Add New Window</button>
                        </div>
                    </div>
                </div>
                {activeWindow === null ? null : <>
                    <Warning Show={showDeleteWarning} Title={'Remove Maintenance Window'} Message={'This will permanently remove this Maintenance Window from the Meter.'}
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
                        Title={activeWindow.ID > 0 ? 'Edit Maintenance Window for ' + props.Meter.Name : 'Add New Maintenance Window to ' + props.Meter.Name}
                        Size={'lg'}
                        ShowX={true}
                        ShowCancel={false}
                        DisableConfirm={hasError()}
                        ConfirmShowToolTip={hasError()}
                        ConfirmToolTipContent={<p>{WarningIcon} Start Time cannot be after the End Time.</p>}
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
    const [showElement, setShowElement] = React.useState<{ checked: string }>({ checked: props.Record[props.Field] !== null ? '1' : ''});
    const options = [{ Value: '1', Label: props.DateLabel }, {Value: '', Label: props.SelectLabel}]
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