//******************************************************************************************************
//  ConnectionPage.tsx - Gbtc
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
import { ToolTip } from '@gpa-gemstone/react-forms';
import { Table, Column } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { cross } from 'd3';

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

interface IConnection {
    Asset: OpenXDA.Types.Asset,
    Connection: OpenXDA.Types.AssetConnection
}

export default function ConnectionPage(props: IProps) {

    const dispatch = useAppDispatch();
    const assetConnectionTypes = useAppSelector(AssetConnectionTypeSlice.SearchResults);

    const [selectedTypeID, setSelectedTypeID] = React.useState<number>(0);
    const [selectedAssetKey, setSelectedAssetKey] = React.useState<string>(undefined);

    const [showAssetConnection, setShowAssetConnection] = React.useState<boolean>(false);

    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [currentConnections, setCurrentConnections] = React.useState<IConnection[]>([]);

    const [asc, setAsc] = React.useState<boolean>(true);
    const [sortKey, setSortKey] = React.useState<string>('AssetName');

    React.useEffect(() => {
        if (selectedAssetKey === undefined) return;
        const selectedType = props.AllAssets.find(a => a.AssetKey == selectedAssetKey).AssetType;
        let typeFilter: Search.IFilter<OpenXDA.Types.AssetConnection>[] =
            [
                {
                    FieldName: 'ID',
                    SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN AssetType ON AssetTypeID = AssetType.ID ${selectedType !== props.CurrentAsset.AssetType ? "WHERE" : "GROUP BY AssetTypeID, AssetRelationshipTypeID, Name HAVING Count(Name) > 1 AND"} Name = '${props.CurrentAsset.AssetType}')`,
                    Operator: 'IN',
                    Type: 'query',
                    IsPivotColumn: false
                }
            ]
        if (selectedType !== props.CurrentAsset.AssetType)
            typeFilter.push(
                {
                    FieldName: 'ID',
                    SearchText: `(SELECT AssetRelationshipTypeID FROM AssetRelationshipTypeAssetType LEFT JOIN AssetType ON AssetTypeID = AssetType.ID WHERE Name = '${selectedType}')`,
                    Operator: 'IN',
                    Type: 'query',
                    IsPivotColumn: false
                });
        dispatch(AssetConnectionTypeSlice.DBSearch({ filter: typeFilter }));

    }, [props.CurrentAsset, selectedAssetKey]);

    React.useEffect(() => {
        // Asset Needs a default that isn't the current asset
        let selectedAsset = props.AllAssets.find(asset => asset.AssetKey !== props.CurrentAsset.AssetKey);
        if (selectedAsset === undefined)
            return;
        setSelectedAssetKey(selectedAsset.AssetKey);
        const connFilter: Search.IFilter<OpenXDA.Types.AssetConnection>[] = [
            { FieldName: 'ParentID', SearchText: `${props.CurrentAsset.ID} OR ChildID = ${props.CurrentAsset.ID}`, Operator: '=', Type: 'query', IsPivotColumn: false },
        ];
        let handle = getAssetConnections(connFilter);
        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        };
    }, [props.CurrentAsset])

    React.useEffect(() => {
        if (assetConnectionTypes.length == 0)
            return;
        if (selectedTypeID == 0)
            setSelectedTypeID(assetConnectionTypes[0].ID);
        const i = assetConnectionTypes.findIndex(act => act.ID == selectedTypeID);
        if (i < 0)
            setSelectedTypeID(assetConnectionTypes[0].ID);
    }, [assetConnectionTypes, selectedTypeID]);

    React.useEffect(() => {
        setCurrentConnections((c) => {
            const u = _.cloneDeep(c);
            if (sortKey == 'AssetName')
                u.sort((a, b) => (asc ? 1 : -1) * (a.Asset.AssetName > b.Asset.AssetName ? 1 : -1));
            if (sortKey == 'AssetKey')
                u.sort((a, b) => (asc ? 1 : -1) * (a.Asset.AssetKey > b.Asset.AssetKey ? 1 : -1));
            if (sortKey == 'VoltageKV')
                u.sort((a, b) => (asc ? 1 : -1) * (a.Asset.VoltageKV > b.Asset.VoltageKV ? 1 : -1));
            if (sortKey == 'AssetType')
                u.sort((a, b) => (asc ? 1 : -1) * (a.Asset.AssetType > b.Asset.AssetType ? 1 : -1));
            return u;
        })
    }, [asc, sortKey]);

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
            const createConn = (ac) => {
                if (ac.Parent == props.CurrentAsset.AssetKey)
                    return { Asset: props.AllAssets.find(asset => asset.AssetKey == ac.Child), Connection: ac };
                return { Asset: props.AllAssets.find(asset => asset.AssetKey == ac.Parent), Connection: ac };
            }
            const u = [...oldConnections.map(createConn), ...newConnections.map(createConn)];
            if (sortKey == 'AssetName')
                u.sort((a, b) => (asc ? 1 : -1) * (a.Asset.AssetName > b.Asset.AssetName ? 1 : -1));
            if (sortKey == 'AssetKey')
                u.sort((a, b) => (asc ? 1 : -1) * (a.Asset.AssetKey > b.Asset.AssetKey ? 1 : -1));
            if (sortKey == 'VoltageKV')
                u.sort((a, b) => (asc ? 1 : -1) * (a.Asset.VoltageKV > b.Asset.VoltageKV ? 1 : -1));
            if (sortKey == 'AssetType')
                u.sort((a, b) => (asc ? 1 : -1) * (a.Asset.AssetType > b.Asset.AssetType ? 1 : -1));
            setCurrentConnections(u);
        }).fail(() => setStatus('error'));
    }

    function getRelevantConnections(connections: AssetConnectionByID[]): OpenXDA.Types.AssetConnection[] {
        return connections.map((conn) => {
            const parentAsset = props.AllAssets.find((asset) => (conn.ParentID === asset.ID));
            const childAsset = props.AllAssets.find((asset) => (conn.ChildID === asset.ID));
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

    const deleteAssetConnection = React.useCallback((ac: OpenXDA.Types.AssetConnection) => {
        let list: Array<OpenXDA.Types.AssetConnection> = _.clone(props.AssetConnections);
        let index = list.findIndex(conn => conn == ac);
        list.splice(index, 1);
        props.UpdateAssetConnections(list);

        let currentList = _.clone(currentConnections);
        let currentIndex = currentList.findIndex(conn => conn.Connection == ac);
        currentList.splice(currentIndex, 1);
        setCurrentConnections(currentList);
    }, [props.AssetConnections, props.UpdateAssetConnections, currentConnections, setCurrentConnections]);

    if (status === 'loading')
        return <div style={{
            width: '100%', height: '200px',
            opacity: 0.5, backgroundColor: '#000000',
        }}>
            <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                <LoadingIcon Show={true} Size={40} />
            </div>
        </div>;

    if (status === 'error')
        return <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                </div>
        </div>;
        
    return <>
        <div className="row">
            <div className="d-none d-lg-block col-8 ">
                <h4>Assets Connected to Asset - {props.CurrentAsset.AssetName} </h4>
            </div>
            <div className="d-block d-lg-none col-6 ">
                <h4>Assets Connected</h4>
            </div>
            <div className="col-6 col-lg-4">
                <button className="btn btn-info pull-right" onClick={() => setShowAssetConnection(true)}
                    disabled={props.AllAssets.length <= 1}>Add Connection
                </button>
            </div>
        </div>
        <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="col d-none d-lg-block">
                <Table<IConnection>
                    TableClass="table table-hover"
                    Data={currentConnections}
                    SortKey={sortKey}
                    Ascending={asc}
                    OnSort={(d) => {
                        if (d.colKey == 'btns')
                            return;
                        if (d.colKey === sortKey)
                            setAsc((x) => !x);
                        else
                            setAsc(false);
                        setSortKey(d.colKey);
                    }}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }}
                    RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => `${item.Connection.ID}-${item.Asset.ID}`}
                >
                    <Column<IConnection>
                        Key={'AssetName'}
                        AllowSort={true}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => item.Asset.AssetName}
                    > Name
                    </Column>
                    <Column<IConnection>
                        Key={'AssetKey'}
                        AllowSort={true}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => item.Asset.AssetKey}
                    > Key
                    </Column>
                    <Column<IConnection>
                        Key={'AssetType'}
                        AllowSort={true}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => item.Asset.AssetType}
                    > Type
                    </Column>
                    <Column<IConnection>
                        Key={'VoltageKV'}
                        AllowSort={true}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => item.Asset.VoltageKV}
                    > Voltage (kV)
                    </Column>
                    <Column<IConnection>
                        Key={'btns'}
                        AllowSort={false}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({item}) => 
                            <StatefulButton
                                TargetID={item.Connection.ID}
                                OnClick={(e) => deleteAssetConnection(item.Connection)}
                            />
                        }
                    ><p></p>
                    </Column>
                </Table>
            </div>
        </div>
        <Modal Show={showAssetConnection} Size={'sm'} Title={'Add New Connection to ' + (props.CurrentAsset?.AssetKey ?? 'Asset')}
            ConfirmText={'Save'}
            DisableConfirm={assetConnectionTypes.length == 0 ||
                currentConnections.findIndex(c => c.Asset?.AssetKey == selectedAssetKey && c.Connection.AssetRelationshipTypeID == selectedTypeID) >= 0}
            ShowX={true}
            ShowCancel={false}
            ConfirmShowToolTip={currentConnections.findIndex(c => c.Asset?.AssetKey == selectedAssetKey && c.Connection.AssetRelationshipTypeID == selectedTypeID) >= 0}
            ConfirmToolTipContent={<p> <ReactIcons.CrossMark Color="var(--danger)" /> This connection already exists.</p>}
            CallBack={(confirmed) => {
                setShowAssetConnection(false);
                if (!confirmed)
                    return;
                let childConnection = selectedAssetKey;
                let connectionType = selectedTypeID;
                let assetConnections = _.clone(props.AssetConnections);
                let newConnection: OpenXDA.Types.AssetConnection = { ID: 0, AssetRelationshipTypeID: connectionType, Parent: props.CurrentAsset.AssetKey, Child: childConnection };

                const createConn = (ac) => {
                    if (ac.Parent == props.CurrentAsset.AssetKey)
                        return { Asset: props.AllAssets.find(asset => asset.AssetKey == ac.Child), Connection: ac };
                    return { Asset: props.AllAssets.find(asset => asset.AssetKey == ac.Parent), Connection: ac };
                }
                setCurrentConnections([...currentConnections, createConn(newConnection)]);
                assetConnections.push(newConnection);
                props.UpdateAssetConnections(assetConnections);

            }}
        >
            <div className="form-group">
                <label>Select Connecting Asset:</label>
                <select value={selectedAssetKey} className="form-control" onChange={(evt) => { setSelectedAssetKey((evt.target.value) as string); }}>
                    {
                        props.AllAssets.filter(asset => asset.AssetKey != props.CurrentAsset.AssetKey).map((asset, index) => <option key={index} value={asset.AssetKey} >{`${asset.AssetName} (${asset.AssetKey})`}</option>)
                    }
                </select>
            </div>
            {assetConnectionTypes.length > 0 ?
                < div className="form-group">
                    <label>Select Connection Type:</label>
                    <select value={selectedTypeID} className="form-control" onChange={(evt) => {
                        setSelectedTypeID(parseInt(evt.target.value))
                    }}>
                        {
                            assetConnectionTypes.map((act, index) => <option key={index} value={act.ID} >{act.Name}</option>)
                        }
                    </select>
                </div> : <div className="alert alert-warning" role="alert">
                    <p>There is no Asset Connection available to connect these Assets.</p>
                </div>}
        </Modal>
    </>;
}

interface IButtonProps {
    /**
     * Callback fn to provide onClick functionality to button.
     */
    OnClick: (e: any) => void;
    /**
     * Property to give the ToolTip a target. Won't display tooltip without eMessage.
     */
    TargetID: number;
}

const StatefulButton: React.FC<IButtonProps> = ({ TargetID, OnClick }) => {
    const [showToolTip, setShowToolTip] = React.useState(false);
    return (
        <>
            <button
                onMouseEnter={() => setShowToolTip(true)}
                onMouseLeave={() => setShowToolTip(false)}
                className={`btn btn-sm ${TargetID > 0 ? `disabled` : null}`}
                data-tooltip={`button-${TargetID}`}
                onClick={OnClick}
            >
                <ReactIcons.TrashCan Color="var(--danger)" Size={20} />
            </button>
            <ToolTip
                Show={showToolTip}
                Position={'bottom'}
                Target={`button-${TargetID}`}
                Zindex={99999}
            >
                <p>{`Existing connections cannot be deleted within New Meter Wizard`}</p>
            </ToolTip>
        </>
    );
};