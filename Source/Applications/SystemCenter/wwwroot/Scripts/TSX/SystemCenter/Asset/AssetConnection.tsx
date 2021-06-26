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
import Table from '@gpa-gemstone/react-table';
import { useHistory } from "react-router-dom";
import { LoadingIcon, Modal, Search, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { useSelector, useDispatch } from 'react-redux';
import { AssetConnectionTypeSlice } from '../Store/Store';
import { getAsset } from '../../../TS/Services/Asset';

interface AssetConnection {
    AssetRelationShipTypeID: number,
    Name: string,
    AssetID: number,
    AssetKey: string
}

function AssetConnectionWindow(props: { Asset: OpenXDA.Types.Asset }): JSX.Element{
    let history = useHistory();
    let dispatch = useDispatch();

    const [assetConnections, setAssetConnections] = React.useState<Array<AssetConnection>>([]);

    const assetConnectionTypes = useSelector(AssetConnectionTypeSlice.SearchResults);
    const [selectedAssetID, setSelectedAssetID] = React.useState<number>(0);
    const [selectedTypeID, setSelectedtypeID] = React.useState<number>(0);
    const [localAssets, setLocalAssets] = React.useState<Array<OpenXDA.Types.Asset>>([]);

    const [sortField, setSortField] = React.useState<keyof (AssetConnection)>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const [status, setStatus] = React.useState<'idle' | 'loading' | 'error'>('idle');
    const actStatus = useSelector(AssetConnectionTypeSlice.SearchStatus);
    const [trigger, setTrigger] = React.useState<number>(0);

    React.useEffect(() => {
        let handle = getAssetConnections();
        return () => { if (handle != null || handle.abort != null) handle.abort();}
    }, [props.Asset, trigger])

    React.useEffect(() => {
        if (props.Asset.ID > 0) {
            let sqlString = `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN Asset ON `
            sqlString = sqlString +  `Asset.AssetTypeID <> ${props.Asset["AssetTypeID"]} AND Asset.AssetTypeID = AssetRelationshipTypeAssetType.assetTypeID AND `
            sqlString = sqlString +  `Asset.ID IN (SELECT AssetID FROM AssetLocation WHERE LocationID IN (Select LocationID FROM AssetLocation WHERE AssetID = ${props.Asset.ID})) `
            sqlString = sqlString +  `GROUP BY AssetRelationshipTypeAssetType.AssetTypeID, AssetRelationshipTypeAssetType.AssetRelationshipTypeID `
            sqlString = sqlString +  `HAVING COUNT(Asset.ID) > 0)`
            const filter: Search.IFilter<OpenXDA.Types.AssetConnectionType>[] = [
                { FieldName: 'ID', SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType WHERE AssetTypeID = ${props.Asset["AssetTypeID"]})`, Operator: 'IN', Type: 'number', isPivotColumn: false },
                {
                    FieldName: 'ID', SearchText: sqlString, Operator: 'IN', Type: 'number', isPivotColumn: false
                }
                ]
            dispatch(AssetConnectionTypeSlice.DBSearch({ filter: filter }))
        }
        }, [props.Asset])

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
        if (index == -1 && assetConnectionTypes.length> 0)
            setSelectedtypeID(assetConnectionTypes[0].ID)
    }, [assetConnectionTypes])

    React.useEffect(() => {
        let index = localAssets.findIndex(t => t.ID == selectedAssetID);
        if (index == -1 && localAssets.length > 0)
            setSelectedAssetID(localAssets[0].ID)
    }, [localAssets])
   
    function getAssetConnections(): JQuery.jqXHR<OpenXDA.Types.AssetConnection> {
        setStatus('loading');
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/AssetConnections`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((d) => {
            setStatus('idle')
            setAssetConnections(d);
        }).fail(() => setStatus('error'));
    }

    function getAssets(): JQuery.jqXHR<string> {
        const filter = [
            { FieldName: 'ID', SearchText: `(SELECT AssetID FROM AssetLocation WHERE LocationID IN (SELECT LocationID FROM AssetLocation WHERE AssetID = ${props.Asset.ID}))`, Operator: 'IN', Type: 'number', isPivotColumn: false },
            { FieldName: 'AssetTypeID', SearchText: `(SELECT AssetTypeID FROM AssetRelationshipTypeAssetType WHERE AssetRelationshipTypeID = ${selectedTypeID} AND AssetTypeID <> ${props.Asset["AssetTypeID"]})`, Operator: 'IN', Type: 'number', isPivotColumn: false }
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
            url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/AssetConnection/${connection.AssetID}`,
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
            data: JSON.stringify({ ID: 0, AssetRelationshipTypeID: selectedTypeID, ParentID: props.Asset.ID, ChildID: selectedAssetID}),
            cache: false,
            async: true
        }).done(() => {
            setTrigger(x => x + 1);
        }).fail(() => {
            setStatus('error')
        });
    }


    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + item.row.AssetID, state: {} })
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
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
                    </div>
                </div>
            </div>
        </div>

    if (status == 'loading' || actStatus == 'loading' )
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
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Connections:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' }}>
                    <Table<AssetConnection>
                        cols={[
                            { key: 'AssetKey', label: 'Asset', headerStyle: { width: '47%' }, rowStyle: { width: '47%' } },
                            { key: 'Name', label: 'Relationship', headerStyle: { width: '47%' }, rowStyle: { width: '47%' } },
                            {
                                key: null, label: '', headerStyle: { width: '6%' }, rowStyle: { width: '6%' }, content: (asset, key, style) => <>
                                    <button className="btn btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        deleteAssetConnection(asset);
                                    }}><span><i className="fa fa-times"></i></span></button>
                                </>
                            },

                        ]}
                        tableClass="table table-hover"
                        data={assetConnections}
                        sortField={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.col == sortField) {
                                var ordered = _.orderBy(assetConnections, [d.col], [(!ascending ? "asc" : "desc")]);
                                setAscending(!ascending);
                                setAssetConnections(ordered);
                            }
                            else {
                                var ordered = _.orderBy(assetConnections, [d.col], ["asc"]);
                                setAscending(!ascending);
                                setAssetConnections(ordered);
                                setSortField(d.col);
                            }
                        }}
                        onClick={handleSelect}
                        selected={() => false}
                    />

                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right" onClick={(evt) => { evt.preventDefault(); setShowModal(true); }}>Add Connection</button>
                </div>

            </div>

            <Modal Show={showModal} Title={'Add Asset to Asset Connection'} ShowCancel={false} ShowX={true}
                CallBack={(conf) => {
                    if (conf)
                        addConnection();
                    setShowModal(false);
                }} ConfirmText={'Add'} DisableConfirm={!connectionsAvailable}>
                {connectionsAvailable ?
                    <>
                        <div className="alert alert-info" role="alert">
                            <p>Assets that are connected have to be located in the same SubStation.</p>
                            <p>
                                If an Asset does not show up in the list it is not possible to add the selected connection type between the two Assets
                                or they are not located in the same Substation.
                            </p>
                        </div>
                        <div className="form-group">
                            <label>Asset Connection Type:</label>
                            <select className="form-control" value={selectedTypeID} onChange={(evt) => {
                                setSelectedtypeID(parseInt(evt.target.value))
                            }}>
                                {assetConnectionTypes.map(als => <option value={als.ID} key={als.ID}>{als.Name}</option>)}
                            </select>

                            <label>Asset:</label>
                            <select className="form-control" value={selectedAssetID} onChange={(evt) => {
                                setSelectedAssetID(parseInt(evt.target.value));
                            }}>
                                {localAssets.map(als => <option value={als.ID} key={als.ID}>{als.AssetKey}</option>)}
                            </select>
                        </div>
                    </> :
                    <div className="alert alert-warning" role="alert">
                        <p>There are no assets at this Substation that can be connected to {props.Asset.AssetName}.</p>
                    </div>}
            </Modal>
        </div>
                
    );

}

export default AssetConnectionWindow;