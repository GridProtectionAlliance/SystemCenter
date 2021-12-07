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
import { OpenXDA } from '../global';
import { useHistory } from 'react-router-dom';
import Table from '@gpa-gemstone/react-table';
import AddToGroup from './AddToGroup';
import { ByMeterSlice } from '../Store/Store';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Modal } from '@gpa-gemstone/react-interactive';

declare var homePath: string;
interface Meter { ID: number, MeterName: string, MeterID: number, AssetGroupID: number, Location: string }

function MeterAssetGroupWindow(props: { AssetGroupID: number}) {
    let history = useHistory();
    const [meterList, setMeterList] = React.useState<Array<SystemCenter.Types.DetailedMeter>>([]);
    const [sortField, setSortField] = React.useState<string>('MeterName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [counter, setCounter] = React.useState<number>(0);

    React.useEffect(() => {
        return getData();
    }, [props.AssetGroupID])

    function getData() {
        if (props.AssetGroupID == null)
            return () => { };

        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/Meters`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });

        handle.done((data: Array<SystemCenter.Types.DetailedMeter>) => setMeterList(data));
      
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }

    

    function AddMeter(toAdd) {
        let handle = $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/AssetGroup/${props.AssetGroupID}/AddMeters`,
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
                        <h4>Meters in Asset Group:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <Table
                        cols={[
                            { key: 'MeterName', field: 'Name', label: 'Meter', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Location', field: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={meterList}
                        sortKey={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.colKey == sortField) {
                                let ordered = _.orderBy(meterList, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setAscending(!ascending);
                                setMeterList(ordered);
                            }
                            else {
                                let ordered = _.orderBy(meterList, [d.colKey], ["asc"]);
                                setAscending(!ascending);
                                setMeterList(ordered);
                                setSortField(d.colKey);
                            }
                        }}
                        onClick={(data) => { history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + data.row.ID, state: {} }) }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => false}
                        />
                </div>
                
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>Add Meter</button>
                </div>
            </div>

            </div>
            <Modal Show={showAdd} Size={'xlg'} ShowX={true} ShowCancel={false} ConfirmBtnClass={'btn-danger'} ConfirmText={'Close'} Title={''} CallBack={() => setShowAdd(false)}>
            <AddToGroup<SystemCenter.Types.DetailedMeter> Type='Meter' Slice={ByMeterSlice} Data={meterList} SetData={(d) => setMeterList(d)} InitialSortKey={'Name' as keyof SystemCenter.Types.DetailedMeter} StandardSearch={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                TableColumns={[
                    { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location', field: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'MappedAssets', field: 'MappedAssets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Make', field: 'Make', label: 'Make', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Model', field: 'Model', label: 'Model', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ]}
                DefaultFilterList={[
                    { label: 'AssetKey', key: 'AssetKey', type: 'string', isPivotField: false },
                    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
                    { label: 'Location', key: 'Location', type: 'string', isPivotField: false },
                    { label: 'Make', key: 'Make', type: 'string', isPivotField: false },
                    { label: 'Model', key: 'Model', type: 'string', isPivotField: false },
                    { label: 'Number of Assets', key: 'MappedAssets', type: 'number', isPivotField: false },
                    ]} />
            </Modal>
        </>
    );
}


export default MeterAssetGroupWindow;