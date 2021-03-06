﻿//******************************************************************************************************
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
import { OpenXDA } from '../global';
import { useDispatch, useSelector } from 'react-redux';
import { AssetConnectionTypeSlice } from '../Store/Store';
import { Modal, Search } from '@gpa-gemstone/react-interactive';

export default function Page5(props: { Assets: Array<OpenXDA.Asset>, AssetConnections: Array<OpenXDA.AssetConnection>, UpdateAssetConnections: (record: OpenXDA.AssetConnection[]) => void }) {

    const dispatch = useDispatch();
    const assetConnectionTypes = useSelector(AssetConnectionTypeSlice.SearchResults);
    const actStatus = useSelector(AssetConnectionTypeSlice.Status);
    const allConnectionTypes = useSelector(AssetConnectionTypeSlice.Data);

    const [selectedTypeID, setSelectedTypeID] = React.useState<number>(0);
    const [selectedAssetKey, setSelectedAssetKey] = React.useState<string>((props.Assets[1].AssetKey));

    const [showAssetConnection, setShowAssetConnection] = React.useState<boolean>(false);

    const [assetIndex, setAssetIndex] = React.useState<number>(0);

    React.useEffect(() => {
        if (actStatus === 'unintiated' || actStatus === 'changed') {
            dispatch(AssetConnectionTypeSlice.Fetch());
            
        }
    }, []);

    

    React.useEffect(() => {
        const filter: Search.IFilter<OpenXDA.AssetConnection>[] = [
            { FieldName: 'ID', SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN AssetType ON AssetTypeID = AssetType.ID WHERE Name = '${props.Assets[assetIndex].AssetType}')`, Operator: 'IN', Type: 'number', isPivotColumn: false },
            { FieldName: 'ID', SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN AssetType ON AssetTypeID = AssetType.ID WHERE Name = '${props.Assets.find(a => a.AssetKey == selectedAssetKey).AssetType}')`, Operator: 'IN', Type: 'number', isPivotColumn: false }
        ]
        dispatch(AssetConnectionTypeSlice.DBSearch({ filter }))

    }, [assetIndex, selectedAssetKey])

    React.useEffect(() => {
        if (assetIndex == 0)
            setSelectedAssetKey(props.Assets[1].AssetKey)
        else
            setSelectedAssetKey(props.Assets[0].AssetKey)
    }, [assetIndex])

    React.useEffect(() => {
        if (assetConnectionTypes.length == 0)
            return;
        if (selectedTypeID == 0)
            setSelectedTypeID(assetConnectionTypes[0].ID);
        const i = assetConnectionTypes.findIndex(act => act.ID == selectedTypeID);
        if (i < 0)
            setSelectedTypeID(assetConnectionTypes[0].ID);
    }, [assetConnectionTypes, selectedTypeID])

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

    function deleteAssetConnection(ac: OpenXDA.AssetConnection): void {
        let list: Array<OpenXDA.AssetConnection> = _.clone(props.AssetConnections);
        let index = list.findIndex(a => a == ac);
        let record: Array<OpenXDA.AssetConnection> = list.splice(index, 1);
        props.UpdateAssetConnections(list);
    }

    let currentAsset = props.Assets[assetIndex]
    return (
        <>
            <div className="row" style={{ margin: -20, height: '100%' }}>
                <div className="col-lg-4" style={{height: '100%' }}>
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
                        <div className="card-body" style={{overflowY:'scroll', maxHeight: window.innerHeight - 415}}>
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
                                        props.AssetConnections.filter( ac => ac.Parent == currentAsset.AssetKey  || ac.Child == currentAsset.AssetKey).map((ac: OpenXDA.AssetConnection, index, array) => {
                                            let connectionAsset;
                                            if (ac.Parent == currentAsset.AssetKey) {
                                                connectionAsset = props.Assets.find(asset => asset.AssetKey == ac.Child);
                                            }
                                            else
                                                connectionAsset = props.Assets.find(asset => asset.AssetKey == ac.Parent);

                                            let connectionType = allConnectionTypes.find(act => act.ID == ac.AssetRelationshipTypeID);
                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: '20%' }}>{connectionAsset.AssetKey}</td>
                                                    <td style={{ width: '20%' }}>{connectionAsset.AssetType}</td>
                                                    <td style={{ width: '50%' }}>{connectionType != undefined ? connectionType.Name : ''}</td>
                                                    <td style={{ width: '10%' }}>
                                                        <button className="btn btn-sm" onClick={(e) => deleteAssetConnection(ac)}><span><i className="fa fa-times"></i></span></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

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
                    let assetConnections: Array<OpenXDA.AssetConnection> = _.clone(props.AssetConnections);
                    assetConnections.push({ ID: 0, AssetRelationshipTypeID: connectionType, Parent: currentAsset.AssetKey, Child: childConnection });
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

