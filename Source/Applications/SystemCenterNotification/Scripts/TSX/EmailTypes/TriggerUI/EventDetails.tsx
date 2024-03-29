//******************************************************************************************************
//  EventDetails.tsx - Gbtc
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
import * as $ from 'jquery';
import moment from 'moment';
import { ReactTable } from '@gpa-gemstone/react-table';
import { IEvent } from '../../global';

declare var homePath;
declare var version;

interface IProps {CombineSQL: string, SetStatus: (valid: boolean, loading: boolean) => void, SelectedEventID: number}


const EventDetails = (props: IProps) => {
 
    const [data, setData] = React.useState<IEvent[]>([]);

    React.useEffect(() => {
        if (props.SelectedEventID == -1)
            return;
        // Shortest possible is SELECT 1 which is 8 Characters
        if (props.CombineSQL == null || props.CombineSQL.length < 8) {
            props.SetStatus(false, false);
            return;
        }
        props.SetStatus(false, true);

        const handle = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/EmailType/GetCombined/${props.SelectedEventID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
            data: JSON.stringify({ sql: props.CombineSQL })
        }).then((d) => {
            props.SetStatus(true, false);
            setData(d);
        }, () => { props.SetStatus(false, false); });

        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [props.CombineSQL, props.SelectedEventID]);
    
    
    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h5>Suppressed Events </h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden' }}>
                                    <ReactTable.Table<IEvent>
                                        TableClass="table table-hover"
                                        Data={data}
                                        SortKey={'StartTime'}
                                        Ascending={false}
                                        OnSort={() => { }}
                                        TableStyle={{
                                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                                        }}
                                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        Selected={(item) => false}
                                        KeySelector={(item, index) => index}
                                    >
                                        <ReactTable.Column<IEvent>
                                            Key={'StartTime'}
                                            AllowSort={false}
                                            Field={'StartTime'}
                                            HeaderStyle={{ width: '20%' }}
                                            RowStyle={{ width: '20%' }}
                                            Content={({ item }) => <> {moment(item.StartTime).format("MM/DD/YYYY")} <br /> {moment(item.StartTime).format("HH:mm:ss.ssss")}  </> }
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
                                    </ReactTable.Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default EventDetails;