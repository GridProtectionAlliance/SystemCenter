﻿//******************************************************************************************************
//  AssetLocation.tsx - Gbtc
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
//  01/24/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { Table, Column } from '@gpa-gemstone/react-table';
import { useNavigate } from "react-router-dom";
import { ReactIcons } from '@gpa-gemstone/gpa-symbols'
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
import { Modal } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';

declare var homePath: string;

function AssetLocationWindow(props: { Asset: OpenXDA.Types.Asset }): JSX.Element{
    let navigate = useNavigate();
    const [locations, setLocations] = React.useState<Array<OpenXDA.Types.Location>>([]);
    const [sortField, setSortField] = React.useState<keyof (OpenXDA.Types.Location)>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [allLocations, setAllLocations] = React.useState<Array<OpenXDA.Types.Location>>([]);
    const [newLocation, setNewLocation] = React.useState<OpenXDA.Types.Location>();
    const [hover, setHover] = React.useState<string|undefined>(undefined);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const roles = useAppSelector(SelectRoles);

    const hasPermissions: boolean = React.useMemo(() => {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }, [roles]);

    React.useEffect(() => {
        getData();
    }, [props.Asset]);

    function getData() {
        getLocations();
        getAllOtherLocations();
    }

    function getLocations(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/Locations`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(data => {
            const sortedLocations = sortData(sortField, ascending, data);
            setLocations(sortedLocations);
        });
    }

    function sortData(key: keyof OpenXDA.Types.Location, ascending: boolean, data: OpenXDA.Types.Location[]) {
        return _.orderBy(data, [key], [(ascending ? "asc" : "desc")]);
    }

    function getAllOtherLocations(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/OtherLocations`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(data => {
            let records = _.orderBy(data, ['Name'], ['asc']);
            setAllLocations(records);
            setNewLocation(records[0]);
        });
    }


    async function deleteLocation(location: OpenXDA.Types.Location) {
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/Location/${location.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((assets: Array<OpenXDA.Types.Asset>) => {
            getData();
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });
    }

    async function addLocation() {
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/Location/${newLocation.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(record => {
            getData();
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });
    }

    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=Location&LocationID=${item.row.ID}`);
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Substations:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Table<OpenXDA.Types.Location>
                    TableClass="table table-hover"
                    Data={locations}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey == sortField) {
                            setAscending(!ascending);
                            const ordered = _.orderBy(locations, [d.colKey], [(!ascending ? "asc" : "desc")]);
                            setLocations(ordered);
                        }
                        else {
                            setAscending(true);
                            setSortField(d.colField);
                            const ordered = _.orderBy(locations, [d.colKey], ["asc"]);
                            setLocations(ordered);
                        }
                    }}
                    TableStyle={{ height: '100%' }}
                    TheadStyle={{ fontSize: 'smaller' }}
                    RowStyle={{ fontSize: 'smaller' }}
                    OnClick={handleSelect}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <Column<OpenXDA.Types.Location>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: '30%' }}
                        RowStyle={{ width: '30%' }}
                    > Name
                    </Column>
                    <Column<OpenXDA.Types.Location>
                        Key={'LocationKey'}
                        AllowSort={true}
                        Field={'LocationKey'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Key
                    </Column>
                    <Column<OpenXDA.Types.Location>
                        Key={'Latitude'}
                        AllowSort={true}
                        Field={'Latitude'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                    > Latitude
                    </Column>
                    <Column<OpenXDA.Types.Location>
                        Key={'Longitude'}
                        AllowSort={true}
                        Field={'Longitude'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                    > Longitude
                    </Column>
                    <Column<OpenXDA.Types.Location>
                        Key={'Delete'}
                        AllowSort={false}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                        Content={({ item }) => <>
                            <button className={"btn btn-sm" + (!hasPermissions ? ' disabled' : '')}
                                onClick={(e) => {
                                    if (hasPermissions) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        deleteLocation(item);
                                    }
                                }}
                                data-tooltip={item.ID.toString()}
                                onMouseEnter={() => setHover(item.ID.toString())} onMouseLeave={() => setHover(undefined)}
                            >
                                <span>
                                    <ReactIcons.TrashCan Color="var(--danger)" Size={20} />
                                </span>
                            </button>
                        </> }
                    > <p></p>
                    </Column>
                </Table>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-info pull-right" + (!hasPermissions ? ' disabled' : '')} data-tooltip='Update'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover(undefined)} onClick={(evt) => { if (hasPermissions) setShowModal(true); }}>Add Substation</button>
                </div>
                <ToolTip Show={hover != null && !hasPermissions} Position={hover === 'Update' ? "top" : "left"} Target={hover}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>

            <Modal Show={showModal} Title={'Add Substation to Asset'} ShowCancel={false} ShowX={true}
                CallBack={(conf) => {
                    if (conf) {
                        addLocation();
                    }
                    setShowModal(false)
                }}
                ConfirmText={'Save'} DisableConfirm={allLocations.length === 0}>
                    
                        <div className="form-group">
                            <label>Substation</label>
                            <select className="form-control" value={newLocation != null ? newLocation.ID : '0'} onChange={(evt) => {
                                setNewLocation(allLocations.find(l => l.ID.toString() == evt.target.value));
                            }}>
                                {allLocations.map(als => <option value={als.ID} key={als.ID}>{als.Name} ({als.LocationKey})</option>)}
                            </select>
                        </div>
            </Modal>

        </div>
                
    );

}

export default AssetLocationWindow;