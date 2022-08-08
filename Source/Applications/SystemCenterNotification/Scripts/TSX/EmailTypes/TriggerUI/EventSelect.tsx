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
import Table from '@gpa-gemstone/react-table';
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

    return (<>
        <div className="card" style={{ width: '100%' }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h5>Notification Events:</h5>
                        </div>
                        <div className="col">
                        <button className="btn btn-primary float-right" style={{ marginLeft: 5 }} onClick={() => setShowModal(true)}>Filter</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                {loading ? <LoadingIcon Show={true} /> :<Table<IEvent>
                    cols={[
                        {
                            key: 'StartTime', field: 'StartTime', label: 'Time', headerStyle: { width: '20%' }, rowStyle: { width: '20%' },
                            content: (r) => <> {moment(r.StartTime).format("MM/DD/YYYY")} <br /> {moment(r.StartTime).format("HH:mm:ss.ssss")}  </>
                        },
                        { key: 'Asset', field: 'Asset', label: 'Asset', headerStyle: { width: '40%' }, rowStyle: { width: '40%' } },
                        { key: 'Meter', field: 'Meter', label: 'Meter', headerStyle: { width: '40%' }, rowStyle: { width: '40%' } },
                        { key: 'EventType', field: 'EventType', label: 'Type', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
                        { key: 'Triggered', field: 'Triggered', label: 'Notified', headerStyle: { width: '20%' }, rowStyle: { width: '20%' }, content: (r) => r.Triggered ? HeavyCheckMark : CrossMark }
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={'StartTime'}
                    ascending={false}
                    onSort={(d) => { }}
                    onClick={(item) => { props.SetSelectedEvent(item.row.EventID); }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', height: 'calc(100 % - 50 px)', width: '100%', maxHeight: 200 }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(record) => record.EventID == props.SelectedEventID}
                />}
                </div>
        </div>
        <EventFilter Show={showModal} Close={() => setShowModal(false)} SetFilter={setFilter} Filter={filter} RenderPortalId={props.RenderPortalId} />
        </>
                  
        )
}

export default EventSelect;