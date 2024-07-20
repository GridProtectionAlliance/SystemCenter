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
import { ReactTable, Paging } from '@gpa-gemstone/react-table';
import { ServerErrorIcon, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { useHistory } from "react-router-dom";

declare var homePath: string;

function LocationMeterWindow(props: { Location: OpenXDA.Types.Location }): JSX.Element{
    let history = useHistory();
    const [meters, setMeters] = React.useState<Array<OpenXDA.Types.Meter>>([]);
    const [sortField, setSortField] = React.useState<keyof(OpenXDA.Types.Meter)>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');

    React.useEffect(() => {
        getMeters();
    }, [props.Location.ID, page]);

    function getMeters(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/${props.Location.ID}/Meters/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((result) => {
            const records = JSON.parse(result.Result);
            setMeters(records);
            setPageInfo({
                RecordsPerPage: result.RecordsPerPage,
                NumberOfPages: result.NumberOfPages,
                TotalRecords: result.TotalRecords
            });
            setPageState('idle');
        }).fail(() => setPageState('error'));
    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID })
    }

    return (
        <div className="card" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Meters:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ paddingBottom: 0, flex: 1, overflow: 'hidden' }}>
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
                        TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}
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
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Key
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'Make'}
                            AllowSort={true}
                            Field={'Make'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Make
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.Meter>
                            Key={'Model'}
                            AllowSort={true}
                            Field={'Model'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Model
                        </ReactTable.Column>
                    </ReactTable.Table>
                    <LoadingScreen Show={pageState == 'loading'} />
                    <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                    <div className="row">
                        <div className="col">
                            <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
            </div>
        </div>
                
    );

}

export default LocationMeterWindow;