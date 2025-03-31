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
import { Table, Column } from '@gpa-gemstone/react-table';
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

    React.useEffect(() => {
        let e = [];
        if (record.DisplayName == null || record.DisplayName.length == 0) {
            e.push('A Name is required.');
        }
        if (record.DisplayName.length > 200) {
            e.push('A Name of less than 200 characters is required.')
        }

        setErrors(e);
    }, [record]);

    function Delete() {
        dispatch(ChannelGroupDetailsSlice.DBAction({ verb: 'DELETE', record: { ...record } }));
        setShowWarning(false);
        setRecord(emptyRecord);
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Group Items:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Table<SystemCenter.Types.ChannelGroupDetails>
                            TableClass="table table-hover"
                            Data={data}
                            SortKey={sortKey}
                            Ascending={asc}
                            OnSort={(d) => {
                                if (d.colKey == 'btns')
                                    return;
                                dispatch(ChannelGroupDetailsSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                            }}
                            TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1, width: '100%' }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<SystemCenter.Types.ChannelGroupDetails>
                                Key={'DisplayName'}
                                AllowSort={true}
                                Field={'DisplayName'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Name
                            </Column>
                            <Column<SystemCenter.Types.ChannelGroupDetails>
                                Key={'MeasurementType'}
                                AllowSort={true}
                                Field={'MeasurementType'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Measurement Type
                            </Column>
                            <Column<SystemCenter.Types.ChannelGroupDetails>
                                Key={'MeasurementCharacteristic'}
                                AllowSort={true}
                                Field={'MeasurementCharacteristic'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Measurement Characteristic
                            </Column>
                            <Column<SystemCenter.Types.ChannelGroupDetails>
                                Key={'Unit'}
                                AllowSort={true}
                                Field={'Unit'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Unit
                            </Column>
                            <Column<SystemCenter.Types.ChannelGroupDetails>
                                Key={'btns'}
                                AllowSort={false}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item }) => <>
                                    <button className="btn btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        setRecord(item);
                                        setShowModal(true);
                                    }}>{Pencil}</button>
                                    <button className="btn btn-sm" onClick={(e) => {
                                        e.preventDefault();
                                        setRecord(item);
                                        setShowWarning(true);
                                    }}>{TrashCan}</button>
                                </> }
                            > <p></p>
                            </Column>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-info pull-right"
                        onClick={() => { setRecord({ ...emptyRecord, ChannelGroupID: props.Record.ID }); setShowModal(true); }}
                    >Add Item</button>
                </div>
            </div>
            <Warning
                Message={'This will permanently delete this Channel Group Item and cannot be undone.'}
                Show={showWarning} Title={'Delete ' + (record?.DisplayName ?? 'Channel Item')}
                CallBack={(conf) => { if (conf) Delete(); setShowWarning(false); }} />
            <Modal Title={record.ID == 0 ? 'Add New Channel Group Item' : 'Edit ' + (record?.DisplayName ?? 'Channel Item')} Show={showModal} ShowCancel={false} ConfirmText={'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
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

