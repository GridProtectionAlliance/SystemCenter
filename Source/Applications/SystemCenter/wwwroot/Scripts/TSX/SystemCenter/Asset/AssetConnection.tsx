//******************************************************************************************************
//  LocationMeter.tsx - Gbtc
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
//  01/21/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import _ from 'lodash';
import { Table, Column } from '@gpa-gemstone/react-table';
import { useHistory } from "react-router-dom";
import { LoadingIcon, Modal, Search, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { TrashCan } from '@gpa-gemstone/gpa-symbols'
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { useAppSelector, useAppDispatch } from '../hooks';
import { AssetConnectionTypeSlice } from '../Store/Store';
import { SelectRoles } from '../Store/UserSettings';
import LocationDrawingsButton from '../CommonComponents/LocationDrawingsButton';

interface AssetConnection {
    AssetRelationShipTypeID: number,
    Name: string,
    AssetID: number,
    AssetKey: string,
    AssetName: string
}

function AssetConnectionWindow(props: { Name: string, ID: number, TypeID: number }): JSX.Element {
    let history = useHistory();
    let dispatch = useAppDispatch();

    const [assetConnections, setAssetConnections] = React.useState<Array<AssetConnection>>([]);

    const assetConnectionTypes = useAppSelector(AssetConnectionTypeSlice.SearchResults);
    const [selectedAssetID, setSelectedAssetID] = React.useState<number>(0);
    const [selectedTypeID, setSelectedtypeID] = React.useState<number>(0);
    const [localAssets, setLocalAssets] = React.useState<Array<OpenXDA.Types.Asset>>([]);

    const [locations, setLocations] = React.useState<OpenXDA.Types.Location[]>([]);
    const [isLoadingLocations, setIsLoadingLocations] = React.useState<boolean>(false);

    const [sortKey, setSortKey] = React.useState<string>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const [status, setStatus] = React.useState<'idle' | 'loading' | 'error'>('idle');
    const [trigger, setTrigger] = React.useState<number>(0);
    const actStatus = useAppSelector(AssetConnectionTypeSlice.SearchStatus);

    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None' | 'Drawings')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        const handle = getAssetConnections();
        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, [props.ID, trigger])

    React.useEffect(() => {
        if (props.ID > 0) {
            let sqlString = `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN Asset ON `
            sqlString = sqlString + `Asset.AssetTypeID <> ${props.TypeID} AND Asset.AssetTypeID = AssetRelationshipTypeAssetType.assetTypeID AND `
            sqlString = sqlString + `Asset.ID IN (SELECT AssetID FROM AssetLocation WHERE LocationID IN (Select LocationID FROM AssetLocation WHERE AssetID = ${props.ID})) `
            sqlString = sqlString + `GROUP BY AssetRelationshipTypeAssetType.AssetTypeID, AssetRelationshipTypeAssetType.AssetRelationshipTypeID `
            sqlString = sqlString + `HAVING COUNT(Asset.ID) > 0)`
            const filter: Search.IFilter<OpenXDA.Types.AssetConnectionType>[] = [
                { FieldName: 'ID', SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType WHERE AssetTypeID = ${props.TypeID})`, Operator: 'IN', Type: 'query', IsPivotColumn: false },
                {
                    FieldName: 'ID', SearchText: sqlString, Operator: 'IN', Type: 'query', IsPivotColumn: false
                }
            ]
            dispatch(AssetConnectionTypeSlice.DBSearch({ filter: filter }))
        }
    }, [props.TypeID])

    React.useEffect(() => {
        if (selectedTypeID == 0) {
            setLocalAssets([]);
            return;
        }
        let handle = getAssets();
        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [selectedTypeID])

    React.useEffect(() => {
        let index = assetConnectionTypes.findIndex(t => t.ID == selectedTypeID);
        if (index == -1 && assetConnectionTypes.length > 0)
            setSelectedtypeID(assetConnectionTypes[0].ID)
    }, [assetConnectionTypes])

    React.useEffect(() => {
        let index = localAssets.findIndex(t => t.ID == selectedAssetID);
        if (index == -1 && localAssets.length > 0)
            setSelectedAssetID(localAssets[0].ID)
    }, [localAssets])

    React.useEffect(() => {
        setIsLoadingLocations(true);
        const h  = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${props.ID}/Locations`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(data => { setLocations(data); setIsLoadingLocations(false); });
        return () => { if (h!= null && h.abort != null) h.abort(); }
    }, [assetConnections])

    function getAssetConnections(): JQuery.jqXHR<OpenXDA.Types.AssetConnection> {
        setStatus('loading');
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${props.ID}/AssetConnections`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((d) => {
            setStatus('idle')
            const sortedConnections = sortData(sortKey, ascending, d);
            setAssetConnections(sortedConnections)
        }).fail(() => setStatus('error'));
    }

    function sortData(key: string, ascending: boolean, data: AssetConnection[]) {
        return _.orderBy(data, [key], [(ascending ? "asc" : "desc")]);
    }

    function getAssets(): JQuery.jqXHR<string> {
        const filter = [
            { FieldName: 'ID', SearchText: `(SELECT AssetID FROM AssetLocation WHERE LocationID IN (SELECT LocationID FROM AssetLocation WHERE AssetID = ${props.ID}))`, Operator: 'IN', Type: 'query', IsPivotColumn: false },
            { FieldName: 'AssetTypeID', SearchText: `(SELECT AssetTypeID FROM AssetRelationshipTypeAssetType WHERE AssetRelationshipTypeID = ${selectedTypeID} AND AssetTypeID <> ${props.TypeID})`, Operator: 'IN', Type: 'query', IsPivotColumn: false }
        ]
        setStatus('loading');
        return $.ajax({
            type: 'POST',
            url: `${homePath}api/OpenXDA/Asset/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: filter, OrderBy: 'AssetName', Ascending: false }),
            cache: false,
            async: true
        }).done((d) => {
            setStatus('idle')
            setLocalAssets(JSON.parse(d) as OpenXDA.Types.Asset[]);
        }).fail(() => setStatus('error'));
    }

    async function deleteAssetConnection(connection: AssetConnection) {
        setStatus('loading')
        return $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Asset/${props.ID}/AssetConnection/${connection.AssetID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(() => {
            setTrigger(x => x + 1);

        }).fail(() => {
            setStatus('error')
        });
    }

    function addConnection() {
        setStatus('loading')
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetConnection/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ ID: 0, AssetRelationshipTypeID: selectedTypeID, ParentID: props.ID, ChildID: selectedAssetID }),
            cache: false,
            async: true
        }).done(() => {
            setTrigger(x => x + 1);
        }).fail(() => {
            setStatus('error')
        });
    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + item.row.AssetID })
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    if (status == 'error' || actStatus == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assets:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                    </div>
                </div>
            </div>
        </div>

    if (status == 'loading' || actStatus == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assets:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} Label={''} />
                    </div>
                </div>
            </div>
        </div>

    const connectionsAvailable = !(assetConnectionTypes == undefined) && (assetConnectionTypes.length > 0);
    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row justify-content-between">
                    <div className="col-6">
                        <h4>Connections:</h4>
                    </div>
                    <div className="pr-4">
                        <LocationDrawingsButton
                            Locations={locations}
                            IsLoadingLocations={isLoadingLocations}
                        />
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', padding: 30, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <Table<AssetConnection>
                        TableClass="table table-hover"
                        Data={assetConnections}
                        SortKey={sortKey}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === "DeleteButton")
                                return;

                            if (d.colKey === sortKey) {
                                setAscending(!ascending);
                                const ordered = _.orderBy(assetConnections, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setAssetConnections(ordered);
                            }
                            else {
                                setAscending(true);
                                setSortKey(d.colKey);
                                const ordered = _.orderBy(assetConnections, [d.colKey], ["asc"]);
                                setAssetConnections(ordered);
                            }
                        }}
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        OnClick={handleSelect}
                        Selected={(item) => false}
                        KeySelector={(item) => item.AssetID}
                    >
                        <Column<AssetConnection>
                            Key={'AssetName'}
                            AllowSort={true}
                            Field={'AssetName'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Asset Name
                        </Column>
                        <Column<AssetConnection>
                            Key={'AssetKey'}
                            AllowSort={true}
                            Field={'AssetKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Asset Key
                        </Column>
                        <Column<AssetConnection>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Relationship
                        </Column>
                        <Column<AssetConnection>
                            Key={'DeleteButton'}
                            AllowSort={false}
                            HeaderStyle={{ width: '6%' }}
                            RowStyle={{ width: '6%' }}
                            Content={({ item }) => <>
                                <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')} onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (hasPermissions()) deleteAssetConnection(item);
                                }}><span>{TrashCan}</span></button>
                            </>}
                        > <p></p>
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-info pull-right" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='Connect'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={(evt) => { evt.preventDefault(); if (hasPermissions()) setShowModal(true); }}>Add Connection</button>
                </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"Connect"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>

            <Modal Show={showModal} Title={'Add Connection to ' + (props.Name ?? 'Asset')} ShowCancel={false} ShowX={true}
                CallBack={(conf) => {
                    if (conf)
                        addConnection();
                    setShowModal(false);
                }} ConfirmText={'Add'} DisableConfirm={!connectionsAvailable}>
                {connectionsAvailable ?
                    <>
                        <div className="alert alert-info" role="alert">
                            <p>Connected Assets must be located at the same Substation.</p>
                            <p>
                                If an Asset does not show up in the dropdown, the selected connection type is not valid for the two Assets,
                                or they are not located at the same Substation.
                            </p>
                        </div>
                        <div className="form-group">
                            <label>Select Connection Type:</label>
                            <select className="form-control" value={selectedTypeID} onChange={(evt) => {
                                setSelectedtypeID(parseInt(evt.target.value))
                            }}>
                                {assetConnectionTypes.map(als => <option value={als.ID} key={als.ID}>{als.Name}</option>)}
                            </select>

                            <label>Select Connecting Asset:</label>
                            <select className="form-control" value={selectedAssetID} onChange={(evt) => {
                                setSelectedAssetID(parseInt(evt.target.value));
                            }}>
                                {localAssets.map(als => <option value={als.ID} key={als.ID}>{als.AssetName} ({als.AssetKey})</option>)}
                            </select>
                        </div>
                    </> :
                    <div className="alert alert-warning" role="alert">
                        <p>There are no Assets at this Substation that can be connected to {props.Name}.</p>
                    </div>}
            </Modal>
        </div>
    );

}

export default AssetConnectionWindow;