//******************************************************************************************************
//  CustomerMeter.tsx - Gbtc
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
//  02/04/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { PQView, OpenXDA as LocalXDA } from '../global';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings'
import { useDispatch, useSelector } from 'react-redux';
import { ByMeterSlice, CustomerMeterSlice } from '../Store/Store'
import Table from '@gpa-gemstone/react-table';
import { TrashCan } from '@gpa-gemstone/gpa-symbols';
import { LoadingIcon, Search, ServerErrorIcon, Warning } from '@gpa-gemstone/react-interactive';
import { DefaultSelects } from '@gpa-gemstone/common-pages';
declare var homePath: string;

interface IProps { Customer: OpenXDA.Types.Customer }
const CustomerMeterWindow = (props: IProps) => {
    const dispatch = useDispatch();
    const data = useSelector(CustomerMeterSlice.Data);
    const status = useSelector(CustomerMeterSlice.Status);
    const [showAdd, setShowAdd] = React.useState<boolean>(false);

    const sortField = useSelector(CustomerMeterSlice.SortField);
    const ascending = useSelector(CustomerMeterSlice.Ascending);

    const [removeRecord, setRemoveRecord] = React.useState<LocalXDA.CustomerMeter | null>(null);


    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(CustomerMeterSlice.Fetch());
    }, [status])

    function getEnum(setOptions, field) {
        let handle = null;
        if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
            return () => { };

        handle = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        }
    }

    function getAdditionalMeterFields(setFields) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/Meter/FieldName/0`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });

        function ConvertType(type: string) {
            if (type == 'string' || type == 'integer' || type == 'number' || type == 'datetime' || type == 'boolean')
                return { type: type }
            return {
                type: 'enum', enum: [{ Label: type, Value: type }]
            }
        }

        handle.done((d: Array<SystemCenter.Types.AdditionalField>) => {
            let ordered = _.orderBy(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<SystemCenter.Types.DetailedMeter>
            )), ['label'], ["asc"]);
            setFields(ordered)
        });

        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }

    function saveCustomerMeters(m: SystemCenter.Types.DetailedMeter[]) {
        m.forEach((meter) => {
            dispatch(CustomerMeterSlice.DBAction({
                verb: 'POST', record: {
                    ID: 0,
                    CustomerKey: props.Customer.CustomerKey,
                    CustomerName: props.Customer.Name,
                    CustomerID: props.Customer.ID,
                    MeterLocation: meter.Location,
                    MeterKey: meter.AssetKey,
                    MeterName: meter.Name,
                    MeterID: meter.ID
                }
            }))
        })
    }

    if (status == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assigned Meters:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
                    </div>
                </div>
            </div>
        </div>

    if (status == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assigned Meters:</h4>
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
                    <h4>Assigned Meters:</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
                <div style={{ width: '100%', height: window.innerHeight - 420 }}>
                    <Table<LocalXDA.CustomerMeter>
                    cols={[
                            {
                                key: 'MeterKey', field: 'MeterKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }
                            },
                            {
                                key: 'MeterName', field: 'MeterName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }
                            },
                            {
                                key: 'MeterLocation', field: 'MeterLocation', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }
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
                                dispatch(CustomerMeterSlice.Sort({ SortField: d.colField, Ascending: !ascending }));
                            else 
                                dispatch(CustomerMeterSlice.Sort({ SortField: d.colField, Ascending: true }));
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
                }}>Add Meter</button>
            </div>
        </div>
        </div>
        <Warning Message={'This will permanently remove the meter from this customer and can affect PQDigest, PQI results and LSCVS logic.'} Show={removeRecord != null} Title={'Remove Meter from Customer'} CallBack={(c) => { if (c) dispatch(CustomerMeterSlice.DBAction({ record: removeRecord, verb: 'DELETE' })); setRemoveRecord(null); }} />
        <DefaultSelects.Meter
            Slice={ByMeterSlice}
            Selection={[]}
            OnClose={(selected, conf) => {
                setShowAdd(false)
                if (!conf) return
                saveCustomerMeters(selected.filter(items => data.findIndex(g => g.MeterID == items.ID) < 0))
            }}
            Show={showAdd}
            Type={'multiple'}
            Columns={[
                { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Location', field: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'MappedAssets', field: 'MappedAssets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Make', field: 'Make', label: 'Make', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Model', field: 'Model', label: 'Model', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
            ]}
            Title={"Add Meters to Customer"}
            GetEnum={getEnum}
            GetAddlFields={getAdditionalMeterFields} />
    </>
}


export default CustomerMeterWindow;