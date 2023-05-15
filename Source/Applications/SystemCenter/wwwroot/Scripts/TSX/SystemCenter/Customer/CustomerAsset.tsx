//******************************************************************************************************
//  CustomerAsset.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  07/16/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA as LocalXDA } from '../global';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import { useAppDispatch, useAppSelector } from '../hooks';
import { CustomerAssetSlice } from '../Store/Store'
import Table from '@gpa-gemstone/react-table';
import { TrashCan } from '@gpa-gemstone/gpa-symbols';
import { LoadingIcon, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import AssetSelect from '../Asset/AssetSelect';
declare var homePath: string;

interface IProps { Customer: OpenXDA.Types.Customer }
const CustomerAssetWindow = (props: IProps) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(CustomerAssetSlice.Data);
    const status = useAppSelector(CustomerAssetSlice.Status);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);

    const sortField = useAppSelector(CustomerAssetSlice.SortField);
    const ascending = useAppSelector(CustomerAssetSlice.Ascending);

    const [removeRecord, setRemoveRecord] = React.useState<LocalXDA.CustomerAsset | null>(null);


    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(CustomerAssetSlice.Fetch());
    }, [status]);

    function saveCustomerAssets(m: SystemCenter.Types.DetailedAsset[]) {
        m.forEach((asset) => {
            dispatch(CustomerAssetSlice.DBAction({
                verb: 'POST', record: {
                    ID: 0,
                    CustomerKey: props.Customer.CustomerKey,
                    CustomerName: props.Customer.Name,
                    CustomerID: props.Customer.ID,
                    AssetKey: asset.AssetKey,
                    AssetName: asset.AssetName,
                    AssetType: asset.AssetType,
                    AssetID: asset.ID
                }
            }))
        })
    }

    if (status == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assigned Assets:</h4>
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

    if (status == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assigned Assets:</h4>
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

    return <>
    <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>Assigned Assets:</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
                <div style={{ width: '100%', height: window.innerHeight - 420 }}>
                    <Table<LocalXDA.CustomerAsset>
                    cols={[
                            {
                            key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }
                            },
                            {
                                key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }
                            },
                            {
                                key: 'AssetType', field: 'AssetType', label: 'Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }
                            },
                            {
                                key: 'Remove', label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                content: (c) => <button className="btn btn-sm" onClick={(e) => setRemoveRecord(c)}><span>{TrashCan}</span></button>
                            },
                            { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortField}
                    ascending={ascending}
                        onSort={(d) => {

                            if (d.colKey === "Scroll" || d.colKey == 'Remove')
                                return;

                            if (d.colKey === sortField)
                                dispatch(CustomerAssetSlice.Sort({ SortField: d.colField, Ascending: !ascending }));
                            else 
                                dispatch(CustomerAssetSlice.Sort({ SortField: d.colField, Ascending: true }));
                        }}
                    onClick={() => { }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 500, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right" onClick={() => {
                        setShowAdd(true);
                }}>Add Asset</button>
            </div>
        </div>
        </div>
        <Warning Message={'This will permanently remove the Asset from this Customer and can affect PQ Digest, PQI results and LSCVS logic.'} Show={removeRecord != null} Title={'Remove Asset from Customer'} CallBack={(c) => { if (c) dispatch(CustomerAssetSlice.DBAction({ record: removeRecord, verb: 'DELETE' })); setRemoveRecord(null); }} />
        <AssetSelect Type='multiple' StorageID='CustomerAsset' ShowModal={showAdd} SelectedAssets={[]}
            Title={"Add Transmission Assets to Customer"}
            OnCloseFunction={(selected, conf) => {
                setShowAdd(false)
                if (!conf) return
                saveCustomerAssets(selected.filter(items => data.findIndex(g => g.AssetID == items.ID) < 0));
            }} />
    </>
}


export default CustomerAssetWindow;