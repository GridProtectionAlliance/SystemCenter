//******************************************************************************************************
//  LocationDrawings.tsx - Gbtc
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
//  06/17/2021 - Billy Ernest
//       Generated original version of source code.
//  09|25|2023 - Ariana Armstrong 
//       Modified original source code; Incorporated 'Number' and 'Category' fields into 
//       'Substation Drawings' table.
//******************************************************************************************************




import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { useAppSelector } from '../hooks';
import { Input, Select } from '@gpa-gemstone/react-forms';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { SelectRoles } from '../Store/UserSettings';
import { ToolTip, GenericController, LoadingScreen, ServerErrorIcon, Modal } from '@gpa-gemstone/react-interactive';


const LocationDrawingsWindow = (props: { Location: OpenXDA.Types.Location }) => {
    const LocationDrawingController = new GenericController<SystemCenter.Types.LocationDrawing>(`${homePath}api/LocationDrawing`, "Name", true);
    const PagingID = 'LocationDrawingPage'

    const [links, setLinks] = React.useState<SystemCenter.Types.LocationDrawing[]>([]);
    const [sortKey, setSortKey] = React.useState<keyof SystemCenter.Types.LocationDrawing>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const emptyRecord: SystemCenter.Types.LocationDrawing = { ID: 0, LocationID: 0, Name: '', Link: '', Description: '', Number: '', Category: '' };
    const [record, setRecord] = React.useState<SystemCenter.Types.LocationDrawing|undefined>(undefined);
    const [category, setCategory] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');

    React.useEffect(() => {
        const storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
        if (storedInfo != null) setPage(storedInfo);
    }, []);

    React.useEffect(() => {
        localStorage.setItem(PagingID, JSON.stringify(page));
    }, [page]);

    React.useEffect(() => {
        const handle = fetchDrawings(sortKey, ascending, page, props.Location.ID);
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [sortKey, ascending, page, props.Location.ID]);

    const fetchDrawings = (sortKey: keyof SystemCenter.Types.LocationDrawing, ascending: boolean, page: number, locationID: number) => {
        setPageState('loading');
        const handle = LocationDrawingController.PagedSearch([], sortKey, ascending, page, locationID)
            .done((result) => {
                setLinks(JSON.parse(result.Data as unknown as string));
                if (result.NumberOfPages === 0) result.NumberOfPages = 1;
                setPageInfo(result);
                setPageState('idle');
            })
            .fail(() => setPageState('error'));
        return handle;
    }

    React.useEffect(() => {
        let categoryHandle = getValueList("Category", setCategory);

        return () => {
            if (categoryHandle != null && categoryHandle.abort != null) categoryHandle.abort();
        }
    }, [])

    function getValueList(listName: string, setter: (value: Array<SystemCenter.Types.ValueListItem>) => void): JQuery.jqXHR<Array<SystemCenter.Types.ValueListItem>> {
        let h = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${listName}`,
            contentType: "application/json; charset=utf-8",
            dataType: `json`,
            cache: false,
            async: true
        });
        h.done((dCat: Array<SystemCenter.Types.ValueListItem>) => {
            setter(dCat);

        });
        return h;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    function valid(field: keyof (SystemCenter.Types.LocationDrawing)): boolean {
        if (field == 'Name')
            return record.Name != null && record.Name.length > 0 && record.Name.length <= 200;
        else if (field == 'Link')
            return record.Link != null && record.Link.length > 0;
        else if (field == 'Number')
            return record.Number == null || record.Number.length <=50;
        return true;
    }

    const handleSave = (r: SystemCenter.Types.LocationDrawing) => {
        setPageState('loading');
        LocationDrawingController.DBAction('PATCH', r)
            .then(() => {
                fetchDrawings(sortKey, ascending, page, props.Location.ID);
            })
            .catch(() => {
                setPageState('error');
            });
    };

    const handleDelete = (item: SystemCenter.Types.LocationDrawing) => {
        setPageState('loading');
        LocationDrawingController.DBAction('DELETE', item)
            .then(() => {
                fetchDrawings(sortKey, ascending, page, props.Location.ID);
            })
            .catch(() => {
                setPageState('error');
            });
    };

    return (
        <div className="card" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Substation Drawings:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ paddingBottom: 0, flex: 1, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Table<SystemCenter.Types.LocationDrawing>
                        TableClass="table table-hover"
                        Data={links}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === 'EditDelete')
                                return;
                            if (d.colKey == sortKey)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortKey(d.colKey as keyof SystemCenter.Types.LocationDrawing);
                            }
                        }}
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<SystemCenter.Types.LocationDrawing>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<SystemCenter.Types.LocationDrawing>
                            Key={'Link'}
                            AllowSort={true}
                            Field={'Link'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item, key }) => <a href={item[key] as string} target='_blank'>{item[key]}</a> }
                        > Link
                        </Column>
                        <Column<SystemCenter.Types.LocationDrawing>
                            Key={'Description'}
                            AllowSort={true}
                            Field={'Description'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Description
                        </Column>
                        <Column<SystemCenter.Types.LocationDrawing>
                            Key={'Number'}
                            AllowSort={true}
                            Field={'Number'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Number
                        </Column>
                        <Column<SystemCenter.Types.LocationDrawing>
                            Key={'Category'}
                            AllowSort={true}
                            Field={'Category'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Category
                        </Column>
                        <Column<SystemCenter.Types.LocationDrawing>
                            Key={'EditDelete'}
                            AllowSort={false}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                            Content={({ item }) =>
                                <span>
                                    <button title='Edit Link' className={"btn" + (!hasPermissions() ? ' disabled' : '')} data-toggle={"modal" + (!hasPermissions() ? ' disabled' : '')} data-target="#exampleModal" onClick={(e) => {setRecord(item) }}>{Pencil}</button>
                                    <button title='Delete Link' className={"btn" + (!hasPermissions() ? ' disabled' : '')} onClick={(e) => { if (hasPermissions()) handleDelete(item); }}>{TrashCan}</button>
                                </span>
                            }
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
            </div>
            <div className="card-footer">
                <button className={"btn btn-info pull-left" + (!hasPermissions() ? ' disabled' : '')}
                data-tooltip='AddDrawing' onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')}
                    onClick={() => { 
                        if (!hasPermissions()) return;
                        setRecord({ ...emptyRecord, LocationID: props.Location.ID }) }}>Add Drawing</button>
            </div>
            <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"AddDrawing"}>
                <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
            </ToolTip>
            <Modal Show={record !== undefined} Size={'lg'}
                Title={'Add New Drawing'}
                ShowCancel={false}
                ShowX={true}
                ConfirmText={'Save Changes'}
                CallBack={(c) => {
                    if (c && record !== undefined) handleSave(record);
                    setRecord(undefined);
                }}>
                    <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={valid} Setter={(r) => setRecord(r)} />
                    <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Link'} Feedback={'A Link is required.'} Valid={valid} Setter={(r) => setRecord(r)} />
                    <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Description'} Valid={valid} Setter={(r) => setRecord(r)} />
                    <Select<SystemCenter.Types.LocationDrawing> Record={record} Field={'Category'} Options={category.map(item => { return { Value: item.Value, Label: item.AltValue ?? item.Value } })} Label={'Category'} Setter={(r) => setRecord(r)} />
                    <Input<SystemCenter.Types.LocationDrawing> Record={record} Field={'Number'} Feedback={'Number must be less than 50 characters.'} Valid={valid} AllowNull={true} Setter={(r) => setRecord(r)} />

            </Modal>
        </div>

    );

}

export default LocationDrawingsWindow;