//******************************************************************************************************
//  ByEventType.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  01/30/2023 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ReactTable } from '@gpa-gemstone/react-table'
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { Modal } from '@gpa-gemstone/react-interactive';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols'
import EventTypeForm from './EventTypeForm';
import { useAppSelector, useAppDispatch } from '../hooks';
import { EventTypeAssetTypeSlice, EventTypeSlice } from '../Store/Store';

declare var homePath: string;

const ByEventType: Application.Types.iByComponent = (props) => {
    let history = useHistory();

    const dispatch = useAppDispatch();
    const eventTypes = useAppSelector(EventTypeSlice.Data) as OpenXDA.Types.EventType[];
    const status = useAppSelector(EventTypeSlice.Status) as Application.Types.Status;
    const [selected, setSelected] = React.useState<OpenXDA.Types.EventType>(null);
  
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.EventType>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [assetTypeET, setAssettypeET] = React.useState<OpenXDA.Types.EventTypeAssetType[]>([])
    const eventTypeAssetTypeData = useAppSelector(EventTypeAssetTypeSlice.Data);
    const eventTypeAssettypeParentID = useAppSelector(EventTypeAssetTypeSlice.ParentID);
    const atetStatus = useAppSelector(EventTypeAssetTypeSlice.Status) as Application.Types.Status;

    React.useEffect(() => {
        if (atetStatus == 'unintiated' || atetStatus == 'changed' || eventTypeAssettypeParentID != selected?.ID)
            dispatch(EventTypeAssetTypeSlice.Fetch(selected?.ID));
    }, [atetStatus, selected]);

    React.useEffect(() => {
        dispatch(EventTypeSlice.Sort({ SortField: sortKey, Ascending: ascending }))
    }, [ascending, sortKey]);

  
    React.useEffect(() => {
        if (status != 'unintiated' && status != 'changed') return;
        dispatch(EventTypeSlice.Fetch());
    }, [status]);

    function saveChange() {
        dispatch(EventTypeSlice.DBAction({ verb: 'PATCH', record: selected }))

        eventTypeAssetTypeData.filter(item => assetTypeET.findIndex(a => a.AssetTypeID == item.AssetTypeID) < 0)
            .forEach(item => dispatch(EventTypeAssetTypeSlice.DBAction({ verb: 'DELETE', record: item })))

        assetTypeET.filter(item => eventTypeAssetTypeData.findIndex(a => a.AssetTypeID == item.AssetTypeID) < 0)
            .forEach(item => dispatch(EventTypeAssetTypeSlice.DBAction({ verb: 'POST', record: item })))
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ width: '100%' }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" style={{ width: '100%' }}>
                        <ul className="navbar-nav mr-auto" style={{ width: '100%' }}>
                        </ul>
                    </div>
                </nav>
            </div>            
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <ReactTable.Table<OpenXDA.Types.EventType>
                    TableClass="table table-hover"
                    Data={eventTypes}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colField);
                        }
                    }}
                    OnClick={(item) => setSelected(item.row) }
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <ReactTable.Column<OpenXDA.Types.EventType>
                        Key={'Name'}
                        AllowSort={true}
                        Field={'Name'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Name
                    </ReactTable.Column>
                    <ReactTable.Column<OpenXDA.Types.EventType>
                        Key={'Category'}
                        AllowSort={true}
                        Field={'Category'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Category
                    </ReactTable.Column>
                    <ReactTable.Column<OpenXDA.Types.EventType>
                        Key={'Description'}
                        AllowSort={true}
                        Field={'Description'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Description
                    </ReactTable.Column>
                    <ReactTable.Column<OpenXDA.Types.EventType>
                        Key={'ShowInFilter'}
                        AllowSort={true}
                        Field={'ShowInFilter'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => item.ShowInFilter ? HeavyCheckMark : CrossMark }
                    > Show in UI
                    </ReactTable.Column>
                </ReactTable.Table>
            </div>

            <Modal Show={selected != null} Title={'Edit ' + (selected?.Name ?? 'Event Type')}
                ShowCancel={true}
                CallBack={(conf) => { if (conf) saveChange(); setSelected(null); }}
                DisableConfirm={errors.length > 0}
                ShowX={true}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={
                    errors.map((t, i) => <p key={i}> {CrossMark} {t} </p>)
                }>
                <EventTypeForm Record={selected} Setter={setSelected} setErrors={setErrors} setAssetTypeETs={setAssettypeET} />
            </Modal>
            
        </div>
    )
}

export default ByEventType;

