//******************************************************************************************************
//  AdditionalFieldsPage.tsx - Gbtc
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
//  01/10/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { LoadingIcon, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import { Table, Column } from '@gpa-gemstone/react-table';

interface IProps {
    Assets: Array<OpenXDA.Types.Asset>,
    GetInnerComponent: (
        Asset: OpenXDA.Types.Asset
    ) => JSX.Element,
    SkipExisting: boolean
}

const MultipleAssetsPage: React.FC<IProps> = (props) => {
    const [tableState, setTableState] = React.useState<Application.Types.Status>('uninitiated');
    const [currentAsset, setCurrentAsset] = React.useState<OpenXDA.Types.Asset>(null);

    const [sortKey, setSortKey] = React.useState<string>('AssetName');
    const [asc, setAsc] = React.useState<boolean>(true);

    const tableData = React.useMemo(() => _.orderBy(props.Assets, [sortKey], [(!asc ? "asc" : "desc")]),
        [props.Assets, sortKey, asc]);
    React.useEffect(() => {
        if (props.Assets === undefined) return;
        if (props.Assets.length === 0) {
            setCurrentAsset(null);
            setTableState('error');
        } else {
            const u = _.cloneDeep(props.Assets);
            _.orderBy(u, [sortKey], [(!asc ? "asc" : "desc")]);
            const index = u.findIndex(item => item.ID === currentAsset?.ID && item.AssetKey === currentAsset?.AssetKey);
            setCurrentAsset(index >= 0 ? u[index] : u[0]);
            setTableState('idle');
        }
    }, [props.Assets]);

    if (tableState == 'error' || currentAsset == null || props.Assets === undefined)
        return <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={currentAsset == null ? 'No Assets found for this Meter.' : 'A Server Error Occurred. Please Reload the Application.'} />
                </div>
            </div>

  
    return (
        <>
            <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="col-6 d-none d-xl-flex" style={{
                        height: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div className="row">
                            <div className="col">
                                <h4>Select Asset: </h4>
                            </div>
                        </div>
                        <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                            <div className="col" style={{
                                height: '100%', overflow: 'hidden',
                                display: 'flex', flexDirection: 'column'
                            }}>
                                <Table<OpenXDA.Types.Asset>
                                    TableClass="table table-hover"
                                    Data={tableData}
                                    SortKey={sortKey}
                                    Ascending={asc}
                                    OnSort={(d) => {
                                        if (d.colKey === sortKey)
                                            setAsc((x) => !x);
                                        else
                                            setAsc(false);
                                        setSortKey(d.colKey);
                                    }}
                                    TableStyle={{
                                        padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                                        tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                                    }}
                                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                    TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                                    RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                    Selected={(item) => (item.ID === currentAsset?.ID && item.AssetKey === currentAsset?.AssetKey)}
                                    KeySelector={(item) => item.AssetKey}
                                    OnClick={(item) => setCurrentAsset(item.row)}
                                >
                                    <Column<OpenXDA.Types.Asset>
                                        Key={'AssetName'}
                                        AllowSort={true}
                                        Field={'AssetName'}
                                        HeaderStyle={{ width: 'auto' }}
                                        RowStyle={{ width: 'auto' }}
                                    > Name
                                    </Column>
                                    <Column<OpenXDA.Types.Asset>
                                        Key={'AssetKey'}
                                        AllowSort={true}
                                        Field={'AssetKey'}
                                        HeaderStyle={{ width: 'auto' }}
                                        RowStyle={{ width: 'auto' }}
                                    > Key
                                    </Column>
                                    <Column<OpenXDA.Types.Asset>
                                        Key={'AssetType'}
                                        AllowSort={true}
                                        Field={'AssetType'}
                                        HeaderStyle={{ width: 'auto' }}
                                        RowStyle={{ width: 'auto' }}
                                    > Type
                                    </Column>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                        {props.SkipExisting && currentAsset?.ID === 0? <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className={'row'} style={{ flex: 1, overflow: 'hidden' }}>
                                <div className={'col-12'} style={{ height: '100%', overflow: 'hidden' }}>
                                        <h3> This cannot be edited in the New Meter Wizard for Existing Assets.</h3>
                                </div>
                            </div> 
                        </div> : props.GetInnerComponent(currentAsset)}
                    </div>
                </div>
            </div>
        </>
    );

}

export default MultipleAssetsPage;