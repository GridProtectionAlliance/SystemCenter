//******************************************************************************************************
//  LocationMeter.tsx - Gbtc
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
//  01/21/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { ReactTable } from '@gpa-gemstone/react-table';
import { useHistory } from "react-router-dom";

declare var homePath: string;

function LocationMeterWindow(props: { Location: OpenXDA.Types.Location }): JSX.Element{
    let history = useHistory();
    const [meters, setMeters] = React.useState<Array<OpenXDA.Types.Meter>>([]);
    const [sortField, setSortField] = React.useState<keyof(OpenXDA.Types.Meter)>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);

    React.useEffect(() => {
        getMeters();
    }, [props.Location.ID]);

    function getMeters(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/${props.Location.ID}/Meters`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(meters => setMeters(meters));
    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID })
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Meters:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <ReactTable.Table<OpenXDA.Types.Meter>
                        TableClass="table table-hover"
                        Data={meters}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey == sortField) {
                                var ordered = _.orderBy(meters, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setAscending(!ascending);
                                setMeters(ordered);
                            }
                            else {
                                var ordered = _.orderBy(meters, [d.colKey], ["asc"]);
                                setAscending(!ascending);
                                setMeters(ordered);
                                setSortField(d.colField);
                            }
                        }}
                        OnClick={handleSelect}
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', width: '100%', overflowY: 'auto', flex: 1  }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'AssetKey'}
                            AllowSort={true}
                            Field={'AssetKey'}
                            HeaderStyle={{ width: '30%' }}
                            RowStyle={{ width: '30%' }}
                        > Key
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: '30%' }}
                            RowStyle={{ width: '30%' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'Make'}
                            AllowSort={true}
                            Field={'Make'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > Make
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'Model'}
                            AllowSort={true}
                            Field={'Model'}
                            HeaderStyle={{ width: '20%' }}
                            RowStyle={{ width: '20%' }}
                        > Model
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <div className="card-footer">
            </div>
        </div>
                
    );

}

export default LocationMeterWindow;