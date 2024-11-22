//******************************************************************************************************
//  LocationDrawings.tsx - Gbtc
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
//  11/06/2024 - Collins Self
//       Generated original version of source code.
//
//******************************************************************************************************
import { SystemCenter } from "@gpa-gemstone/application-typings";
import { Pencil, TrashCan } from "@gpa-gemstone/gpa-symbols";
import { GenericController, LoadingScreen, ServerErrorIcon } from "@gpa-gemstone/react-interactive";
import { ReactTable, Paging } from "@gpa-gemstone/react-table";
import React from "react";
import { useAppSelector } from "../hooks";
import { SelectRoles } from "../Store/UserSettings";

interface IProps {
    LocationID: number,
    Edit?: (record: SystemCenter.Types.LocationDrawing) => void,
    /**
     * @param UpdateTable Counter that triggers a fetchDrawings function
     */
    UpdateTable: number,
    /**
     * Used to pass number of drawings up to be used in relevant setters.
     * @param n number of records
     * @returns
     */
    SetTotalRecords: (n: number) => void;
}

const LocationDrawingsTable = (props: IProps) => {
    const [links, setLinks] = React.useState<SystemCenter.Types.LocationDrawing[]>([]);
    const [sortKey, setSortKey] = React.useState<keyof SystemCenter.Types.LocationDrawing>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');
    const [page, setPage] = React.useState<number>(0);

    const roles = useAppSelector(SelectRoles); // Deprecated
    const LocationDrawingController = new GenericController<SystemCenter.Types.LocationDrawing>(`${homePath}api/LocationDrawing`, "Name", true);
    const PagingID = 'LocationDrawingPage'

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

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

    const handleDelete = (item: SystemCenter.Types.LocationDrawing) => {
        setPageState('loading');
        LocationDrawingController.DBAction('DELETE', item)
            .then(() => {
                fetchDrawings(sortKey, ascending, page, props.LocationID);
            })
            .catch(() => {
                setPageState('error');
            });
    };

    React.useEffect(() => {
        props.SetTotalRecords(pageInfo.TotalRecords);
    }, [pageInfo.TotalRecords]);

    React.useEffect(() => {
        const storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
        if (storedInfo != null) setPage(storedInfo);
    }, []);

    React.useEffect(() => {
        localStorage.setItem(PagingID, JSON.stringify(page));
    }, [page]);

    React.useEffect(() => {
        fetchDrawings(sortKey, ascending, page, props.LocationID);
        const handle = fetchDrawings(sortKey, ascending, page, props.LocationID);
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [sortKey, ascending, page, props.LocationID, props.UpdateTable]);

    return <>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ReactTable.Table<SystemCenter.Types.LocationDrawing>
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
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Name'}
                    AllowSort={true}
                    Field={'Name'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Name
                </ReactTable.Column>
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Link'}
                    AllowSort={true}
                    Field={'Link'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item, key }) => <a href={item[key] as string} target='_blank'>{item[key]}</a>}
                > Link
                </ReactTable.Column>
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Description'}
                    AllowSort={true}
                    Field={'Description'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Description
                </ReactTable.Column>
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Number'}
                    AllowSort={true}
                    Field={'Number'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Number
                </ReactTable.Column>
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'Category'}
                    AllowSort={true}
                    Field={'Category'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Category
                </ReactTable.Column>
                {props.Edit ?
                <ReactTable.Column<SystemCenter.Types.LocationDrawing>
                    Key={'EditDelete'}
                    AllowSort={false}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) =>
                        <span>
                            <button title='Edit Link' className={"btn" + (!hasPermissions() ? ' disabled' : '')}
                                onClick={() => { props.Edit(item); }}>{Pencil}</button>
                            <button title='Delete Link' className={"btn" + (!hasPermissions() ? ' disabled' : '')}
                                onClick={() => { if (hasPermissions()) handleDelete(item); }}>{TrashCan}</button>
                        </span>
                    }
                > <p></p>
                </ReactTable.Column>
                : null}
            </ReactTable.Table>
            <LoadingScreen Show={pageState == 'loading'} />
            <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
            <div className="row">
                <div className="col">
                    <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                </div>
            </div>
        </div>
    </>
}

export default LocationDrawingsTable;