//******************************************************************************************************
//  ChannelGroupItem.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with  work for additional information regarding copyright ownership.
//  The GPA licenses  file to you under the MIT License (MIT), the "License"; you may not use 
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
//  07/05/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter } from '@gpa-gemstone/application-typings';

import { useAppSelector, useAppDispatch } from '../hooks';
import { ChannelGroupDetailsSlice } from '../Store/Store';
import ChannelGroupItemForm from './ChannelGroupItemForm';
import Table from '@gpa-gemstone/react-table';
import { CrossMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Modal, Warning } from '@gpa-gemstone/react-interactive';

interface IProps { Record: SystemCenter.Types.ChannelGroup }
export default function ChannelGroupDetails(props: IProps) {
    const dispatch = useAppDispatch();

    const data = useAppSelector(ChannelGroupDetailsSlice.Data);
    const sortKey = useAppSelector(ChannelGroupDetailsSlice.SortField);
    const asc = useAppSelector(ChannelGroupDetailsSlice.Ascending);
    const status = useAppSelector(ChannelGroupDetailsSlice.Status);
    const parentID= useAppSelector(ChannelGroupDetailsSlice.ParentID);

    const emptyRecord: SystemCenter.Types.ChannelGroupDetails =
    {
        ID: 0,
        ChannelGroupID: 0,
        ChannelGroup: '',
        MeasurementTypeID: 0,
        MeasurementType: '',
        MeasurementCharacteristicID: 0,
        MeasurementCharacteristic: '',
        DisplayName: '',
        Unit: ''
    };
    const [record, setRecord] = React.useState<SystemCenter.Types.ChannelGroupDetails>(emptyRecord);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || parentID != props.Record.ID)
            dispatch(ChannelGroupDetailsSlice.Fetch(props.Record.ID));
    }, [status, parentID, props.Record.ID]);

    function Delete() {
        dispatch(ChannelGroupDetailsSlice.DBAction({ verb: 'DELETE', record: { ...record } }));
        setShowWarning(false);
        setRecord(emptyRecord);
    }

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Group Items:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div style={{ width: '100%', height: window.innerHeight - 421, maxHeight: window.innerHeight - 421, padding: 0, overflowY: 'auto' }}>
                        <Table<SystemCenter.Types.ChannelGroupDetails>
                            cols={[
                                { key: 'DisplayName', field: 'DisplayName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'MeasurementType', field: 'MeasurementType', label: 'Measurement Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'MeasurementCharacteristic', field: 'MeasurementCharacteristic', label: 'Measurement Characteristic', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'Unit', field: 'Unit', label: 'Unit', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                {
                                    key: 'btns', field: 'ID', label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                    content: (item) => <>
                                        <button className="btn btn-sm" onClick={(e) => {
                                            e.preventDefault();
                                            setRecord(item);
                                            setShowModal(true);
                                        }}>{Pencil}</button>
                                        <button className="btn btn-sm" onClick={(e) => {
                                            e.preventDefault();
                                            setRecord(item);
                                            setShowWarning(true)
                                        }}>{TrashCan}</button>
                                    </>
                                },
                                { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                            ]}
                            tableClass="table table-hover"
                            data={data}
                            sortKey={sortKey}
                            ascending={asc}
                            onSort={(d) => {
                                if (d.colKey == 'btns' || d.colKey == 'scroll')
                                    return;
                                if (d.colKey === sortKey)
                                    dispatch(ChannelGroupDetailsSlice.Sort({ SortField: d.colField, Ascending: !asc }));
                                else
                                    dispatch(ChannelGroupDetailsSlice.Sort({ SortField: d.colField, Ascending: true }));
                            }}
                            onClick={() => { }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', maxHeight: window.innerHeight - 455, }}
                            rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={() => false}
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right"
                        onClick={() => { setRecord({ ...emptyRecord, ChannelGroupID: props.Record.ID }); setShowModal(true); }}
                    >Add Item</button>
                </div>
            </div>
            <Warning
                Message={'This will permanently delete this Channel Group Item and cannot be undone.'}
                Show={showWarning} Title={'Delete ' + (record?.DisplayName ?? 'Channel Item')}
                CallBack={(conf) => { if (conf) Delete(); setShowWarning(false); }} />
            <Modal Title={record.ID == 0 ? 'Add New Channel Group Item' : 'Edit ' + (record?.DisplayName ?? 'Channel Item')} Show={showModal} ShowCancel={false} ConfirmText={record.ID == 0 ? 'Add' : 'Save'}
                ConfirmShowToolTip={errors.length > 0}
                CancelToolTipContent={<> {errors.map(e => <p>{CrossMark} {e}</p>)}</>}
                DisableConfirm={errors.length > 0}
                ShowX={true} CallBack={(conf) => {
                    setShowModal(false);
                    if (conf && record.ID > 0)
                        dispatch(ChannelGroupDetailsSlice.DBAction({ verb: 'PATCH', record }));
                    else if (conf && record.ID == 0)
                        dispatch(ChannelGroupDetailsSlice.DBAction({ verb: 'POST', record }));
                }}
            >
                <ChannelGroupItemForm Record={record} Setter={setRecord} SetErrors={setErrors} />
            </Modal>
            </div>
        

    );

}

