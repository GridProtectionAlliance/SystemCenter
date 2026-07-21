//******************************************************************************************************
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

import * as _ from 'lodash';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols'
import { ToolTip } from '@gpa-gemstone/react-forms';
import { LoadingIcon, LoadingScreen, Modal, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { Column, Paging, Table } from '@gpa-gemstone/react-table';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

function AssetLocationWindow(props: { Asset: OpenXDA.Types.Asset }): JSX.Element {

    let navigate = useNavigate();

    // substation table
    const [locations, setLocations] = React.useState<Array<OpenXDA.Types.Location>>([]);
    const [locationStatus, setLocationStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [sortField, setSortField] = React.useState<keyof (OpenXDA.Types.Location)>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [hover, setHover] = React.useState<string | undefined>(undefined);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false); // also used by other substation select

    // substation pagination
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);

    // other substation select
    const [allOtherLocations, setAllOtherLocations] = React.useState<Array<OpenXDA.Types.Location>>([]);
    const [otherLocationStatus, setOtherLocationStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [newLocation, setNewLocation] = React.useState<OpenXDA.Types.Location>();
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const roles = useAppSelector(SelectRoles);

    // database action
    const [actionStatus, setActionStatus] = React.useState<Application.Types.Status>('uninitiated');

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    // keep fresh data in the locaction table, sorted and paged
    React.useEffect(() => {
        setLocationStatus('loading');

        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/Locations/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true,
            data: JSON.stringify({ OrderBy: sortField, Ascending: ascending })
        })

        h.done(d => {
            setLocations(JSON.parse(d.Data));
            setTotalPages(d.NumberOfPages);
            setTotalRecords(d.TotalRecords);
            setRecordsPerPage(d.RecordsPerPage);
            if (d.NumberOfPages == 0)
                setPage(0);
            else if (page >= d.NumberOfPages)
                setPage(d.NumberOfPages - 1);
            setLocationStatus('idle');
        });

        h.fail(() => setLocationStatus('error'))

        return () => {
            if (h != null && h.abort != null)
                h.abort();
        }

    }, [ascending, sortField, page, props.Asset.ID, refreshTrigger])

    // keep fresh options in the Other Location Select
    React.useEffect(() => {
        setOtherLocationStatus('loading');
        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/OtherLocations`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })

        h.done(data => {
            let records = _.orderBy(data, ['Name'], ['asc']);
            setAllOtherLocations(records);
            setNewLocation(records[0]);
            setOtherLocationStatus('idle');
        });

        h.fail(() => setOtherLocationStatus('error'))

        return () => {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [props.Asset.ID, refreshTrigger]);


    async function deleteLocation(location: OpenXDA.Types.Location) {
        setActionStatus('loading');
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/Location/${location.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((assets: Array<OpenXDA.Types.Asset>) => {
            setRefreshTrigger(val => !val);
            setActionStatus('idle');
        }).fail((msg) => {
            setActionStatus('error');
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });
    }

    async function addLocation() {
        setActionStatus('loading');
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/Location/${newLocation.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(record => {
            setRefreshTrigger(val => !val);
            setActionStatus('idle');
        }).fail((msg) => {
            setActionStatus('error');
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
                <div className="row">
                    <div className="col">
                        <p style={{ marginTop: 2, marginBottom: 2 }}>
                            {locationStatus === 'error' ? 'Could not complete Search' :
                                locationStatus === 'loading' ? 'Loading...' :
                                    `Displaying Substation(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + locations.length} out of ${totalRecords}`}
                        </p>
                    </div>
                </div>
            </div>
            {locationStatus === 'idle' && (actionStatus === 'idle' || actionStatus === 'uninitiated') ?
                <div className="card-body d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="row d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
                        <Table<OpenXDA.Types.Location>
                            TableClass="table table-hover"
                            Data={locations}
                            SortKey={sortField}
                            Ascending={ascending}
                            OnSort={(d) => {
                                if (d.colKey == sortField) {
                                    setAscending(!ascending);
                                }
                                else {
                                    setAscending(true);
                                    setSortField(d.colField);
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
                                    <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')}
                                        onClick={(e) => {
                                            if (hasPermissions()) {
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
                                </>}
                            > <p></p>
                            </Column>
                        </Table>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Paging
                                Total={totalPages}
                                Current={page + 1}
                                SetPage={(page) => setPage(page - 1)}
                            />
                        </div>
                    </div>
                </div> :
                <>
                    <LoadingScreen Show={actionStatus != 'error' && locationStatus != 'error'} />
                    <ServerErrorIcon Show={ locationStatus === 'error'} />
                </>
            }

            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-info pull-right" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='Update'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover(undefined)} onClick={(evt) => { if (hasPermissions()) setShowModal(true); }}>Add Substation</button>
                </div>
                <ToolTip Show={hover != null && !hasPermissions()} Position={hover === 'Update' ? "top" : "left"} Target={hover}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>

            <Modal
                Show={showModal}
                Title={'Add Substation to Asset'}
                ShowCancel={false}
                ShowX={true}
                CallBack={(conf) => {
                    if (conf) {
                        addLocation();
                    }
                    setShowModal(false)
                }}
                ConfirmText={'Save'}
                DisableConfirm={allOtherLocations.length === 0}>

                <div className="form-group">
                    <label>Substation</label>
                    {otherLocationStatus === 'idle' ?
                        <select
                            className="form-control"
                            value={newLocation != null ? newLocation.ID : '0'}
                            onChange={(evt) => {
                                setNewLocation(allOtherLocations.find(l => l.ID.toString() == evt.target.value));
                            }}
                        >
                            {allOtherLocations.map(als => <option value={als.ID} key={als.ID}>{als.Name} ({als.LocationKey})</option>)}
                        </select> :
                        <>
                            <LoadingIcon Show={otherLocationStatus != 'error'} />
                            <ServerErrorIcon Show={otherLocationStatus === 'error'} />
                        </>
                    }
                </div>
            </Modal>

        </div>

    );

}

export default AssetLocationWindow;