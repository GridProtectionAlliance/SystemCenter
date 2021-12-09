//******************************************************************************************************
//  AssetAssetGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import { useHistory } from 'react-router-dom';
import Table from '@gpa-gemstone/react-table';
import AddToGroup from './AddToGroup';
import { ByAssetSlice } from '../Store/Store';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Modal } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

function AssetAssetGroupWindow(props: { AssetGroupID: number}) {
    let history = useHistory();
    const [assetList, setAssetList] = React.useState<Array<SystemCenter.Types.DetailedAsset>>([]);
    const [sortKey, setSortKey] = React.useState<string>('AssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() => {
        return getData();
    }, [props.AssetGroupID, counter])

    function getData() {
        if (props.AssetGroupID == null)
            return () => { };

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/Assets`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done((data: Array<SystemCenter.Types.DetailedAsset>) => setAssetList(data));
      
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }

    function AddAsset(toAdd) {
        let handle = $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/AddAssets`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(toAdd),
            cache: false,
            async: true
        });

        handle.done((d) => { setCounter((x) => x + 1) })
        return handle
    }

    return (
        <>
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Transmission Assets in Asset Group:</h4>
                    </div>
                    
                </div>
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <Table
                        cols={[
                            { key: 'AssetName', field: 'AssetKey', label: 'AssetKey', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'LongAssetName', field: 'AssetName', label: 'Asset Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'AssetType', field: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } }
                            
                        ]}
                        tableClass="table table-hover"
                        data={assetList}
                        sortKey={sortKey}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colKey === "Scroll")
                                return;

                            if (d.colKey === sortKey) {
                                let ordered = _.orderBy(assetList, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setAscending(!ascending);
                                setAssetList(ordered);
                            }
                            else {
                                let ordered = _.orderBy(assetList, [d.colKey], ["asc"]);
                                setAscending(!ascending);
                                setAssetList(ordered);
                                setSortKey(d.colKey);
                            }
                        }}
                        onClick={(data) => { history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + data.row.ID, state: {} }) }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 590, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                        />
                    </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={() => setShowAdd(true)}>Add Transmission Asset</button>
                </div>
            </div>
            </div>
            <Modal Show={showAdd} Size={'xlg'} ShowX={true} ShowCancel={false} ConfirmBtnClass={'btn-danger'} ConfirmText={'Close'} Title={'Add Transmission Asset'} CallBack={() => setShowAdd(false)}>
                <AddToGroup<SystemCenter.Types.DetailedAsset> Type='Asset' Slice={ByAssetSlice} InitialSortKey={'AssetName' as keyof SystemCenter.Types.DetailedAsset} Data={assetList} SetData={(d) => setAssetList(d)} StandardSearch={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                TableColumns={[
                    { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetType', field: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'VoltageKV', field: 'VoltageKV', label: 'Voltage (kV)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Locations', field: 'Locations', label: 'Substations', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                DefaultFilterList={[
                    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
                ]} />
            </Modal>
            </>
    )
}


export default AssetAssetGroupWindow;