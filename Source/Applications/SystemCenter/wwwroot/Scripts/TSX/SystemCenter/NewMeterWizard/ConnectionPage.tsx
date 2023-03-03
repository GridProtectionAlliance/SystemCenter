//******************************************************************************************************
//  Page5.tsx - Gbtc
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
//  01/10/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AssetConnectionTypeSlice } from '../Store/Store';
import { LoadingIcon, Modal, Search, ServerErrorIcon } from '@gpa-gemstone/react-interactive';

interface AssetConnectionByID {
    ID: number,
    ParentID: number,
    ChildID: number,
    AssetRelationshipTypeID: number
}

interface IProps {
    AllAssets: Array<OpenXDA.Types.Asset>,
    CurrentAsset: OpenXDA.Types.Asset,
    AssetConnections: Array<OpenXDA.Types.AssetConnection>,
    UpdateAssetConnections: (record: OpenXDA.Types.AssetConnection[]) => void
}

export default function ConnectionPage(props: IProps) {

    const dispatch = useAppDispatch();
    const assetConnectionTypes = useAppSelector(AssetConnectionTypeSlice.SearchResults);

    const [selectedTypeID, setSelectedTypeID] = React.useState<number>(0);
    const [selectedAssetKey, setSelectedAssetKey] = React.useState<string>((props.CurrentAsset.AssetKey));

    const [showAssetConnection, setShowAssetConnection] = React.useState<boolean>(false);

    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');
    const [currentConnections, setCurrentConnections] = React.useState<OpenXDA.Types.AssetConnection[]>([]);

    React.useEffect(() => {
        const typeFilter: Search.IFilter<OpenXDA.Types.AssetConnection>[] = [
            { FieldName: 'ID', SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN AssetType ON AssetTypeID = AssetType.ID WHERE Name = '${props.CurrentAsset.AssetType}')`, Operator: 'IN', Type: 'number', isPivotColumn: false },
            { FieldName: 'ID', SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN AssetType ON AssetTypeID = AssetType.ID WHERE Name = '${props.AllAssets.find(a => a.AssetKey == selectedAssetKey).AssetType}')`, Operator: 'IN', Type: 'number', isPivotColumn: false }
        ]
        dispatch(AssetConnectionTypeSlice.DBSearch({ filter: typeFilter }));

        const connFilter: Search.IFilter<OpenXDA.Types.AssetConnection>[] = [
            { FieldName: 'ID', SearchText: `ParentID OR ChildID = ${props.CurrentAsset.ID}`, Operator: '=', Type: 'number', isPivotColumn: false },
        ];
        let handle = getAssetConnections(connFilter);
        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        };
    }, [props.CurrentAsset, selectedAssetKey]);

    React.useEffect(() => {
        if (assetConnectionTypes.length == 0)
            return;
        if (selectedTypeID == 0)
            setSelectedTypeID(assetConnectionTypes[0].ID);
        const i = assetConnectionTypes.findIndex(act => act.ID == selectedTypeID);
        if (i < 0)
            setSelectedTypeID(assetConnectionTypes[0].ID);
    }, [assetConnectionTypes, selectedTypeID]);

    function getAssetConnections(filter: Search.IFilter<AssetConnectionByID>[]): JQuery.jqXHR<AssetConnectionByID> {
        setStatus('loading');
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetConnection/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({
               Searches: filter,
               OrderBy: 'ID',
               Ascending: true
            }),
            cache: true,
            async: true
        }).done((data: AssetConnectionByID) => {
            setStatus('idle');
            let newConnections = props.AssetConnections.filter(ac => ac.ID >= 0 && (ac.Parent == props.CurrentAsset.AssetKey || ac.Child == props.CurrentAsset.AssetKey));
            let oldConnections = getRelevantConnections(JSON.parse(data.toString()));
            setCurrentConnections([...oldConnections, ...newConnections]);
        }).fail(() => setStatus('error'));
    }

    function getRelevantConnections(connections: AssetConnectionByID[]): OpenXDA.Types.AssetConnection[] {
        return connections.map((conn) => {
            let parentAsset = props.AllAssets.find((asset) => (conn.ParentID === asset.ID));
            let childAsset = props.AllAssets.find((asset) => (conn.ChildID === asset.ID));
            //This means that this is irrelevant, since one asset exists outside of what we care about
            if (parentAsset === undefined || childAsset === undefined) return null;
            return {
                ID: conn.ID,
                Parent: parentAsset.AssetKey,
                Child: childAsset.AssetKey,
                AssetRelationshipTypeID: conn.AssetRelationshipTypeID
            }
        }).filter((newConn) => newConn !== null);
    }

    function deleteAssetConnection(ac: OpenXDA.Types.AssetConnection): void {
        let list: Array<OpenXDA.Types.AssetConnection> = _.clone(props.AssetConnections);
        let index = list.findIndex(conn => conn == ac);
        list.splice(index, 1);
        props.UpdateAssetConnections(list);

        let currentList: Array<OpenXDA.Types.AssetConnection> = _.clone(currentConnections);
        let currentIndex = currentList.findIndex(conn => conn == ac);
        currentList.splice(currentIndex, 1);
        setCurrentConnections(currentList);
    }

    let tableBody;
    if (status === 'loading')
        tableBody = (
            <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <LoadingIcon Show={true} Size={40} />
                </div>
            </div>);
    else if (status === 'error')
        tableBody = (
            <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
                </div>
            </div>);
    else
        tableBody = (
            <div className="col" style={{ width: '100%', height: '100%' }}>
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540}}>
                    <button className="btn btn-primary pull-right" onClick={() => setShowAssetConnection(true)} disabled={props.AllAssets.length <= 1}>Add Connection</button>
                    <h4 style={{ width: '100%', padding: '10px' }}>Assets Connected to Asset - {props.CurrentAsset.AssetName} </h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Asset Key</th>
                                <th>Asset Type</th>
                                <th>Voltage (kV)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody style={{ overflowY: 'auto' }}>
                            {
                                currentConnections.map((ac: OpenXDA.Types.AssetConnection, index, array) => {
                                    let connectionAsset;
                                    if (ac.Parent == props.CurrentAsset.AssetKey)
                                        connectionAsset = props.AllAssets.find(asset => asset.AssetKey == ac.Child);
                                    else
                                        connectionAsset = props.AllAssets.find(asset => asset.AssetKey == ac.Parent);

                                    if (connectionAsset === undefined) {
                                        setStatus('error');
                                        return;
                                    }
                                    return (
                                        <tr key={index}>
                                            <td style={{ width: '25%' }}>{connectionAsset.AssetName}</td>
                                            <td style={{ width: '25%' }}>{connectionAsset.AssetKey}</td>
                                            <td style={{ width: '20%' }}>{connectionAsset.AssetType}</td>
                                            <td style={{ width: '20%' }}>{connectionAsset.VoltageKV}</td>
                                            <td style={{ width: '10%' }}>
                                                {ac.ID > 0 ? null : <button className="btn btn-sm" onClick={(e) => deleteAssetConnection(ac)}><span><i className="fa fa-times"></i></span></button>}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>);

    return (
        <>
            {tableBody}
            <Modal Show={showAssetConnection} Size={'sm'} Title={'Add a Connection to ' + props.CurrentAsset.AssetKey}
                ConfirmText={'Save'} DisableConfirm={assetConnectionTypes.length == 0} ShowX={true} ShowCancel={false}
                CallBack={(confirmed) => {
                    setShowAssetConnection(false);
                    if (!confirmed)
                        return;

                    let childConnection = selectedAssetKey;
                    let connectionType = selectedTypeID;
                    let assetConnections: Array<OpenXDA.Types.AssetConnection> = _.clone(props.AssetConnections);
                    let newConnection: OpenXDA.Types.AssetConnection = { ID: 0, AssetRelationshipTypeID: connectionType, Parent: props.CurrentAsset.AssetKey, Child: childConnection };
                    setCurrentConnections([...currentConnections, newConnection]);
                    assetConnections.push(newConnection);
                    props.UpdateAssetConnections(assetConnections);

                }}
            >
                <div className="form-group">
                    <label>Select Connecting Asset</label>
                    <select value={selectedAssetKey} className="form-control" onChange={(evt) => { setSelectedAssetKey((evt.target.value) as string); }}>
                        {
                            props.AllAssets.filter(asset => asset.AssetKey != props.CurrentAsset.AssetKey).map((asset, index) => <option key={index} value={asset.AssetKey} >{`${asset.AssetName} (${asset.AssetKey})`}</option>)
                        }
                    </select>
                </div>
                {assetConnectionTypes.length > 0 ?
                    < div className="form-group">
                    <label>Select Connection Type</label>
                    <select value={selectedTypeID} className="form-control" onChange={(evt) => {
                        setSelectedTypeID(parseInt(evt.target.value))
                    }}>
                        {
                            assetConnectionTypes.map((act, index) => <option key={index} value={act.ID} >{act.Name}</option>)
                        }
                    </select>
                    </div> : <div className="alert alert-warning" role="alert">
                        <p>There is no Asset Connection available to connect these two Assets.</p>
                    </div>}
            </Modal>
        </>
    );

}

