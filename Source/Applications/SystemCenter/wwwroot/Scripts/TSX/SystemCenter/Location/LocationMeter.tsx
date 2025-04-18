﻿//******************************************************************************************************
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
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ServerErrorIcon, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { useNavigate } from "react-router-dom";

declare var homePath: string;
const PagingID = 'LocationMeterPage';

function LocationMeterWindow(props: { Location: OpenXDA.Types.Location }): JSX.Element{
    let navigate = useNavigate();
    const [meters, setMeters] = React.useState<Array<OpenXDA.Types.Meter>>([]);
    const [sortField, setSortField] = React.useState<keyof(OpenXDA.Types.Meter)>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');

    React.useEffect(() => {
        setPageState('loading');
        getMeters();
    }, [props.Location.ID, page, sortField, ascending]);

    React.useEffect(() => {
        let storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
        if (storedInfo == null || storedInfo == 0) return; // page 0 means it's on a real page
        if (storedInfo + 1 > pageInfo.NumberOfPages) {
            storedInfo = Math.max(0, pageInfo.NumberOfPages - 1);
            localStorage.setItem(PagingID, `${storedInfo}`);
        }
        setPage(storedInfo);
    }, [pageInfo.TotalRecords]); // Make sure user is still on a real page when data is deleted or filtered out

    function getMeters(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/${props.Location.ID}/Meters/${page}/${ascending ? 1 : 0}/${sortField}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((result) => {
            setMeters(result.Result);
            setPageInfo({
                RecordsPerPage: result.RecordsPerPage,
                NumberOfPages: result.NumberOfPages,
                TotalRecords: result.TotalRecords
            });
            setPageState('idle');
        }).fail(() => setPageState('error'));
    }

    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=Meter&MeterID=${item.row.ID}`);
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
                    <Table<OpenXDA.Types.Meter>
                        TableClass="table table-hover"
                        Data={meters}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === sortField) 
                                setAscending(a => !a);  
                            else {
                                setSortField(d.colField);
                                setAscending(true);
                            }
                        }}
                        OnClick={handleSelect}
                        TableStyle={{ height: '100%' }}
                        TheadStyle={{ fontSize: 'smaller' }}
                        RowStyle={{ fontSize: 'smaller' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<OpenXDA.Types.Meter>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </Column>
                        <Column<OpenXDA.Types.Meter>
                            Key={'AssetKey'}
                            AllowSort={true}
                            Field={'AssetKey'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Key
                        </Column>
                        <Column<OpenXDA.Types.Meter>
                            Key={'Make'}
                            AllowSort={true}
                            Field={'Make'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Make
                        </Column>
                        <Column<OpenXDA.Types.Meter>
                            Key={'Model'}
                            AllowSort={true}
                            Field={'Model'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Model
                        </Column>
                    </Table>
                    <LoadingScreen Show={pageState == 'loading'} />
                    <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                    <div className="row">
                        <div className="col">
                            <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
                
    );

}

export default LocationMeterWindow;