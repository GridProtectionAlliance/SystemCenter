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

export default function ConnectionPage(props: { Assets: Array<OpenXDA.Types.Asset>, AssetConnections: Array<OpenXDA.Types.AssetConnection>, UpdateAssetConnections: (record: OpenXDA.Types.AssetConnection[]) => void }) {

    const dispatch = useAppDispatch();
    const assetConnectionTypes = useAppSelector(AssetConnectionTypeSlice.SearchResults);
    const actStatus = useAppSelector(AssetConnectionTypeSlice.Status);
    const allConnectionTypes = useAppSelector(AssetConnectionTypeSlice.Data);

    const [selectedTypeID, setSelectedTypeID] = React.useState<number>(0);
    const [selectedAssetKey, setSelectedAssetKey] = React.useState<string>((props.Assets[0].AssetKey));

    const [showAssetConnection, setShowAssetConnection] = React.useState<boolean>(false);

    const [assetIndex, setAssetIndex] = React.useState<number>(0);

    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');
    const [currentConnections, setCurrentConnections] = React.useState<OpenXDA.Types.AssetConnection[]>([]);

    React.useEffect(() => {
        if (actStatus === 'unintiated' || actStatus === 'changed') {
            dispatch(AssetConnectionTypeSlice.Fetch());
        }
    }, []);

    React.useEffect(() => {
        const typeFilter: Search.IFilter<OpenXDA.Types.AssetConnection>[] = [
            { FieldName: 'ID', SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN AssetType ON AssetTypeID = AssetType.ID WHERE Name = '${props.Assets[assetIndex].AssetType}')`, Operator: 'IN', Type: 'number', isPivotColumn: false },
            { FieldName: 'ID', SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN AssetType ON AssetTypeID = AssetType.ID WHERE Name = '${props.Assets.find(a => a.AssetKey == selectedAssetKey).AssetType}')`, Operator: 'IN', Type: 'number', isPivotColumn: false }
        ]
        dispatch(AssetConnectionTypeSlice.DBSearch({ filter: typeFilter }));

        const connFilter: Search.IFilter<OpenXDA.Types.AssetConnection>[] = [
            { FieldName: 'ID', SearchText: `ParentID OR ChildID = ${props.Assets[assetIndex].ID}`, Operator: '=', Type: 'number', isPivotColumn: false },
        ];
        let handle = getAssetConnections(connFilter);
        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        };
    }, [assetIndex, selectedAssetKey]);

    React.useEffect(() => {
        if (assetIndex == 0 && props.Assets.length < 1)
            setSelectedAssetKey(props.Assets[1].AssetKey)
        else
            setSelectedAssetKey(props.Assets[0].AssetKey)
    }, [assetIndex]);

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
            let newConnections = props.AssetConnections.filter(ac => ac.ID >= 0 && (ac.Parent == currentAsset.AssetKey || ac.Child == currentAsset.AssetKey));
            let oldConnections = getRelevantConnections(JSON.parse(data.toString()));
            setCurrentConnections([...oldConnections, ...newConnections]);
        }).fail(() => setStatus('error'));
    }

    function getRelevantConnections(connections: AssetConnectionByID[]): OpenXDA.Types.AssetConnection[] {
        return connections.map((conn) => {
            let parentAsset = props.Assets.find((asset) => (conn.ParentID === asset.ID));
            let childAsset = props.Assets.find((asset) => (conn.ChildID === asset.ID));
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

    function next() {
        // Make sure currentStep is set to something reasonable
        if (assetIndex >= props.Assets.length - 1) {
            setAssetIndex( props.Assets.length - 1);
        } else {
            setAssetIndex(assetIndex + 1);
        }
    }

    function prev() {
        if (assetIndex <= 0) {
        } else {
            setAssetIndex(assetIndex - 1);
        }
    }

    function deleteAssetConnection(ac: OpenXDA.Types.AssetConnection): void {
        let list: Array<OpenXDA.Types.AssetConnection> = _.clone(props.AssetConnections);
        let index = list.findIndex(a => a == ac);
        list.splice(index, 1);
        props.UpdateAssetConnections(list);

        let currentList: Array<OpenXDA.Types.AssetConnection> = _.clone(currentConnections);
        let currentIndex = currentList.findIndex(a => a == ac);
        currentList.splice(currentIndex, 1);
        setCurrentConnections(currentList);
    }

    let currentAsset = props.Assets[assetIndex];

    let cardBody;
    if (status === 'loading' || actStatus === 'loading')
        cardBody = (
            <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <LoadingIcon Show={true} Size={40} />
                </div>
            </div>);
    else if (status === 'error' || actStatus === 'error')
        cardBody = (
            <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
                </div>
            </div>);
    else
        cardBody = (
            <div className="col" style={{ width: '100%', height: '100%' }}>
                <h4 style={{ width: '100%' }}>Connected Assets</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Type</th>
                            <th>Connection</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentConnections.map((ac: OpenXDA.Types.AssetConnection, index, array) => {
                                let connectionAsset;
                                if (ac.Parent == currentAsset.AssetKey) {
                                    connectionAsset = props.Assets.find(asset => asset.AssetKey == ac.Child);
                                    console.log(ac.Parent);
                                }
                                else {
                                    connectionAsset = props.Assets.find(asset => asset.AssetKey == ac.Parent);
                                    console.log(ac.Child);
                                }

                                let connectionType = allConnectionTypes.find(act => act.ID == ac.AssetRelationshipTypeID);
                                return (
                                    <tr key={index}>
                                        <td style={{ width: '20%' }}>{connectionAsset.AssetKey}</td>
                                        <td style={{ width: '20%' }}>{connectionAsset.AssetType}</td>
                                        <td style={{ width: '50%' }}>{connectionType != undefined ? connectionType.Name : ''}</td>
                                        <td style={{ width: '10%' }}>
                                            {ac.ID > 0 ? null : <button className="btn btn-sm" onClick={(e) => deleteAssetConnection(ac)}><span><i className="fa fa-times"></i></span></button>}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>);

    return (
        <>
            <div className="row" style={{ margin: -20, height: '100%' }}>
                <div className="col-lg-2" style={{height: '100%' }}>
                    <ul style={{ width: '100%', height: '100%', maxHeight: window.innerHeight - 285, overflowY: 'auto', padding: 0, margin: 0 }}>
                        {
                            props.Assets.map((asset, index) => <li style={{ textDecoration: (index <= assetIndex ? 'line-through' : null) }} key={index}>{asset.AssetKey}</li>)
                        }
                    </ul>
                </div>
                <div className="col" style={{ padding: 0, height: '100%' }}>
                    <div className="card" style={{ height: '100%' }}>
                        <div className="card-header">
                            <button className="btn btn-primary pull-right" onClick={() => setShowAssetConnection(true)} disabled={props.Assets.length <= 1}>Add Connection</button>
                            <h4 style={{ width: '100%' }}>{currentAsset.AssetType} - {currentAsset.AssetKey} </h4>
                        </div>
                        <div className="card-body" style={{ overflowY: 'scroll', maxHeight: window.innerHeight - 415 }}>
                            {cardBody}
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary pull-left" onClick={prev} hidden={false} disabled={assetIndex < 1}>Previous Asset</button>
                            <button className="btn btn-primary pull-right" onClick={next} disabled={assetIndex == props.Assets.length - 1}>Next Asset</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal Show={showAssetConnection} Size={'sm'} Title={'Add a Connection to ' + currentAsset.AssetKey}
                ConfirmText={'Save'} DisableConfirm={assetConnectionTypes.length == 0} ShowX={true} ShowCancel={false}
                CallBack={(confirmed) => {
                    setShowAssetConnection(false);
                    if (!confirmed)
                        return;

                    let childConnection = selectedAssetKey;
                    let connectionType = selectedTypeID;
                    let assetConnections: Array<OpenXDA.Types.AssetConnection> = _.clone(props.AssetConnections);
                    let newConnection: OpenXDA.Types.AssetConnection = { ID: 0, AssetRelationshipTypeID: connectionType, Parent: currentAsset.AssetKey, Child: childConnection };
                    setCurrentConnections([...currentConnections, newConnection]);
                    assetConnections.push(newConnection);
                    props.UpdateAssetConnections(assetConnections);

                }}
            >
                <div className="form-group">
                    <label>Select Connecting Asset</label>
                    <select value={selectedAssetKey} className="form-control" onChange={(evt) => { setSelectedAssetKey((evt.target.value) as string); }}>
                        {
                            props.Assets.filter(asset => asset.AssetKey != currentAsset.AssetKey).map((asset, index) => <option key={index} value={asset.AssetKey} >{asset.AssetKey}</option>)
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

