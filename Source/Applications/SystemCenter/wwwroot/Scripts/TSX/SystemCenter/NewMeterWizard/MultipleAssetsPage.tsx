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
import Table from '@gpa-gemstone/react-table';

interface IProps {
    Assets: Array<OpenXDA.Types.Asset>,
    GetInnerComponent: (
        Asset: OpenXDA.Types.Asset
    ) => JSX.Element,
    Style?: React.CSSProperties
}

export default function MultipleAssetsPage(props: IProps) {
    const [tableState, setTableState] = React.useState<Application.Types.Status>('unintiated');
    const [currentAsset, setCurrentAsset] = React.useState<OpenXDA.Types.Asset>(null);

    React.useEffect(() => {
        if (props.Assets === undefined) return;
        if (props.Assets.length === 0) {
            setCurrentAsset(null);
            setTableState('error');
        } else {
            setCurrentAsset(props.Assets[0]);
            setTableState('idle');
        }
    }, [props.Assets]);

    let tableBody;
    if (tableState == 'loading')
        tableBody = (
            <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <LoadingIcon Show={true} Size={40} />
                </div>
            </div>);
    else if (tableState == 'error' || currentAsset == null)
        tableBody = (
            <div style={{ width: '100%', height: '200px' }}>
                <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <ServerErrorIcon Show={true} Size={40} Label={currentAsset == null ? 'No Assets found for this Meter.' : 'A Server Error Occurred. Please Reload the Application.'} />
                </div>
            </div>);
    else
        tableBody = (props.GetInnerComponent(currentAsset));

    if (props.Assets === undefined) return;

    return (
        <>
            <div className="row" style={{ margin: -20, height: '100%' }}>
                <div className="col" style={{ ...props.Style, ...{ padding: 0, height: '100%' } }}>
                    <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540}}>
                        <h4 style={{ width: '100%', padding: '10px' }}>Select Asset: </h4>
                        <Table<OpenXDA.Types.Asset>
                            cols={[
                                { key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'AssetType', field: 'AssetType', label: 'Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'VoltageKV', field: 'VoltageKV', label: 'Voltage (kV)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } }
                            ]}
                            tableClass="table table-hover"
                            data={props.Assets}
                            sortKey={null}
                            ascending={true}
                            onSort={(d) => { }}
                            onClick={(item) => setCurrentAsset(item.row)}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: 'calc(100% - 16px)' }}
                            tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 400, width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => (item.ID === currentAsset?.ID)}
                        />
                    </div>
                </div>
                <div className="col" style={{ padding: 0, height: '100%' }}>
                    {tableBody}
                </div>
            </div>
        </>
    );

}

