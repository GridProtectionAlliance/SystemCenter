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
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { GenericController, LoadingIcon, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import AssetSelect from '../Asset/AssetSelect';
import { OpenXDA as LocalXDA } from '../global';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
declare var homePath: string;

interface IProps { Customer: OpenXDA.Types.Customer }
const CustomerAssetWindow = (props: IProps) => {

    const [customerAssets, setCustomerAssets] = React.useState<LocalXDA.CustomerAsset[]>([]);
    const [customerAssetStatus, setCustomerAssetStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [sortField, setSortField] = React.useState<keyof LocalXDA.CustomerAsset>('AssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');

    const [showAdd, setShowAdd] = React.useState<boolean>(false);

    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ TotalPages: number, TotalRecords: number, RecordsPerPage: number }>({ TotalPages: 0, TotalRecords: 0, RecordsPerPage: 0 })

    const [removeRecord, setRemoveRecord] = React.useState<LocalXDA.CustomerAsset | null>(null);

    const roles = useAppSelector(SelectRoles)

    const customerAssetController = React.useMemo(() => new GenericController<LocalXDA.CustomerAsset>(`${homePath}api/SystemCenter/CustomerAsset`, 'AssetName', true), [])

    // fetch paged and sorted CustomerAssets
    React.useEffect(() => {

        setCustomerAssetStatus('loading')
        const handle = customerAssetController.PagedSearch([], sortField, ascending, page, props.Customer.ID);

        handle.done((d) => {
            setCustomerAssets(JSON.parse(d.Data as unknown as string))
            setPageInfo({ TotalPages: d.NumberOfPages, TotalRecords: d.TotalRecords, RecordsPerPage: d.RecordsPerPage });
            if (page >= d.NumberOfPages)
                setPage(Math.max(d.NumberOfPages - 1, 0));
            setCustomerAssetStatus('idle');
        })

        handle.fail(() => { setCustomerAssetStatus('error') });

        return () => {
            if (handle != null && handle.abort != null)
                handle.abort();
        }
    }, [customerAssetController, sortField, ascending, page, props.Customer.ID, refreshTrigger])

    function saveCustomerAssets(m: SystemCenter.Types.DetailedAsset[]) {
        Promise.all(m.map((asset) => {
            customerAssetController.DBAction(
                'POST', {
                    ID: 0,
                    CustomerKey: props.Customer.CustomerKey,
                    CustomerName: props.Customer.Name,
                    CustomerID: props.Customer.ID,
                    AssetKey: asset.AssetKey,
                    AssetName: asset.AssetName,
                    AssetType: asset.AssetType,
                    AssetID: asset.ID
        })
        })).then(() => setRefreshTrigger(val => !val));
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    if (customerAssetStatus == 'error')
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

    if (customerAssetStatus == 'loading')
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
                <div className="row">
                    <div className="col">
                        <p style={{ marginTop: 2, marginBottom: 2 }}>
                            {`Displaying Asset${customerAssets.length > 1 ? 's' : ''} ${pageInfo.TotalRecords > 0 ? (pageInfo.RecordsPerPage * page + 1) : 0} - ${pageInfo.RecordsPerPage * page + customerAssets.length} out of ${pageInfo.TotalRecords}`}
                        </p>
        </div>
                </div>

            </div>
            <div className="card-body d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="row d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
                <Table<LocalXDA.CustomerAsset>
                    TableClass="table table-hover"
                        Data={customerAssets}
                    SortKey={sortField}
                    Ascending={ascending}
                    OnSort={(d) => {
                            if (d.colKey === sortField) setAscending(a => !a);
                            else setSortField(d.colField);
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
                <div className="row">
                    <div className="col">
                        <Paging
                            SetPage={(p) => { setPage(p - 1) }}
                            Total={pageInfo.TotalPages}
                            Current={page + 1}
                        />
        </div>
                </div>
            </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                    <button
                        className={"btn btn-info pull-right" + (!hasPermissions() ? ' disabled' : '')}
                        data-tooltip='AssignedAssets'
                        onMouseEnter={() => setHover('Update')}
                        onMouseLeave={() => setHover('None')}
                        onClick={() => {
                            if (hasPermissions())
                        setShowAdd(true);
                }}>Add Assets</button>
            </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"AssignedAssets"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
        </div>
        </div>
        <Warning
            Message={'This will permanently remove the Asset from this Customer and can affect PQ Digest, PQI results, and LSCVS logic.'}
            Show={removeRecord != null}
            Title={'Remove ' + (removeRecord?.AssetName ?? 'Asset') + ' from ' + (props.Customer?.Name ?? 'Customer')}
            CallBack={(c) => { if (c) customerAssetController.DBAction('DELETE', removeRecord).done(() => { setRemoveRecord(null); setRefreshTrigger(val => !val) });  }}
        />
        <AssetSelect
            Type='multiple'
            StorageID='CustomerAsset'
            ShowModal={showAdd}
            SelectedAssets={[]}
            Title={"Add Assets to Customer"}
            OnCloseFunction={(selected, conf) => {
                setShowAdd(false)
                if (!conf) return
                saveCustomerAssets(selected.filter(items => customerAssets.findIndex(g => g.AssetID == items.ID) < 0));
            }} />
    </>
}


export default CustomerAssetWindow;