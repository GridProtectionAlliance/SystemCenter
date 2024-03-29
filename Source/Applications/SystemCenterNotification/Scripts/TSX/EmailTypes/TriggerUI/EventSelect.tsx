//******************************************************************************************************
//  EventSelect.tsx - Gbtc
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
//  07/26/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import * as $ from 'jquery';
import moment from 'moment';
import { ReactTable } from '@gpa-gemstone/react-table';
import EventFilter from '../../EventFilterComponents/EventFilter';
import { IEvent, IEventFilter } from '../../global';
import { LoadingIcon } from '@gpa-gemstone/react-interactive';

declare var homePath;
declare var version;

interface IProps { TriggerSQL: string, SetStatus: (valid: boolean, loading: boolean) => void, SetSelectedEvent: (id: number) => void, SelectedEventID: number, RenderPortalId?: string}


const EventSelect = (props: IProps) => {
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [suceeded, setSucceeded] = React.useState<boolean>(true);

    const [filter, setFilter] = React.useState<IEventFilter>({
        Start: moment.utc().subtract(7, 'd').toISOString(),
        End: moment.utc().toISOString(),
        EventTypes: [],
        MeterIDs: [],
        AssetIDs: [],
        SubstationIDs: [],
        GroupIDs: []
    });

    const [data, setData] = React.useState<IEvent[]>([]);

    React.useEffect(() => { props.SetStatus(suceeded, loading); }, [loading, suceeded])
    React.useEffect(() => {

        // Shortest possible is SELECT 1 which is 8 Characters
        if (props.TriggerSQL == null || props.TriggerSQL.length < 8) {
            setLoading(false);
            setSucceeded(false);
            return;
        }
        setLoading(true);
        setSucceeded(false);

        const handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/EmailType/GetEvents`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
            data: JSON.stringify({
                ...filter,
                TriggerSQL: props.TriggerSQL
            })
        }).then((d) => {
            setLoading(false);
            setSucceeded(true);
            setData(d);           
        }, () => {
            setLoading(false);
            setSucceeded(false);
        });

        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [props.TriggerSQL, filter]);

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6 align-self-center">
                                <h5>Notification Events:</h5>
                            </div>
                            <div className="col-6 align-self-center">
                                <button className="btn btn-primary float-right" style={{ marginLeft: 5 }} onClick={() => setShowModal(true)}>Filter</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden' }}>
                                    <LoadingIcon Show={loading} />
                                    <ReactTable.Table<IEvent>
                                        TableClass="table table-hover"
                                        Data={data}
                                        SortKey={'StartTime'}
                                        Ascending={false}
                                        OnSort={() => { }}
                                        OnClick={(item) => props.SetSelectedEvent(item.row.EventID)}
                                        TableStyle={{
                                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                                        }}
                                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        Selected={(item) => item.EventID == props.SelectedEventID }
                                        KeySelector={(item, index) => index }
                                    >
                                        <ReactTable.Column<IEvent>
                                            Key={'StartTime'}
                                            AllowSort={false}
                                            Field={'StartTime'}
                                            HeaderStyle={{ width: '20%' }}
                                            RowStyle={{ width: '20%' }}
                                            Content={({ item }) => <> {moment(item.StartTime).format("MM/DD/YYYY")} <br /> {moment(item.StartTime).format("HH:mm:ss.ssss")}  </>}
                                        > Time
                                        </ReactTable.Column>
                                        <ReactTable.Column<IEvent>
                                            Key={'Asset'}
                                            AllowSort={false}
                                            Field={'Asset'}
                                            HeaderStyle={{ width: '40%' }}
                                            RowStyle={{ width: '40%' }}
                                        > Asset
                                        </ReactTable.Column>
                                        <ReactTable.Column<IEvent>
                                            Key={'Meter'}
                                            AllowSort={false}
                                            Field={'Meter'}
                                            HeaderStyle={{ width: '40%' }}
                                            RowStyle={{ width: '40%' }}
                                        > Meter
                                        </ReactTable.Column>
                                        <ReactTable.Column<IEvent>
                                            Key={'EventType'}
                                            AllowSort={false}
                                            Field={'EventType'}
                                            HeaderStyle={{ width: '20%' }}
                                            RowStyle={{ width: '20%' }}
                                        > Type
                                        </ReactTable.Column>
                                        <ReactTable.Column<IEvent>
                                            Key={'Triggered'}
                                            AllowSort={false}
                                            Field={'Triggered'}
                                            HeaderStyle={{ width: '20%' }}
                                            RowStyle={{ width: '20%' }}
                                            Content={({ item }) => item.Triggered ? HeavyCheckMark : CrossMark }
                                        > Notified
                                        </ReactTable.Column>
                                    </ReactTable.Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EventFilter Show={showModal} Close={() => setShowModal(false)} SetFilter={setFilter} Filter={filter} RenderPortalId={props.RenderPortalId} />
        </div>
        )
}

export default EventSelect;