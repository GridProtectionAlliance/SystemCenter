﻿//******************************************************************************************************
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
import { Table, Column } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { LoadingIcon, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import AssetSelect from '../Asset/AssetSelect';
import { SelectRoles } from '../Store/UserSettings';
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

    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles)

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

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
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
    <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>Assigned Assets:</h4>
                </div>
            </div>
        </div>
        <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Table<LocalXDA.CustomerAsset>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey == 'Remove')
                            return;
                        dispatch(CustomerAssetSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                    }}
                    TheadStyle={{ fontSize: 'smaller' }}
                    RowStyle={{ fontSize: 'smaller' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <Column<LocalXDA.CustomerAsset>
                        Key={'AssetName'}
                        AllowSort={true}
                        Field={'AssetName'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </Column>
                    <Column<LocalXDA.CustomerAsset>
                        Key={'AssetKey'}
                        AllowSort={true}
                        Field={'AssetKey'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Key
                    </Column>
                    <Column<LocalXDA.CustomerAsset>
                        Key={'AssetType'}
                        AllowSort={true}
                        Field={'AssetType'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Type
                    </Column>
                    <Column<LocalXDA.CustomerAsset>
                        Key={'Remove'}
                        AllowSort={false}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) =>
                            <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')}
                                onClick={(e) => { if (hasPermissions()) setRemoveRecord(item) }}>
                                <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                            </button>
                        }
                    > <p></p>
                    </Column>
                </Table>
            </div>
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                    <button className={"btn btn-info pull-right" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='AssignedAssets'
                        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (hasPermissions())
                        setShowAdd(true);
                }}>Add Assets</button>
            </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"AssignedAssets"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
        </div>
        </div>
        <Warning Message={'This will permanently remove the Asset from this Customer and can affect PQ Digest, PQI results, and LSCVS logic.'} Show={removeRecord != null} Title={'Remove ' + (removeRecord?.AssetName ?? 'Asset') + ' from ' + (props.Customer?.Name ?? 'Customer')} CallBack={(c) => { if (c) dispatch(CustomerAssetSlice.DBAction({ record: removeRecord, verb: 'DELETE' })); setRemoveRecord(null); }} />
        <AssetSelect Type='multiple' StorageID='CustomerAsset' ShowModal={showAdd} SelectedAssets={[]}
            Title={"Add Assets to Customer"}
            OnCloseFunction={(selected, conf) => {
                setShowAdd(false)
                if (!conf) return
                saveCustomerAssets(selected.filter(items => data.findIndex(g => g.AssetID == items.ID) < 0));
            }} />
    </>
}


export default CustomerAssetWindow;