//******************************************************************************************************
//  MeterConfigurationHistory.tsx - Gbtc
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
//  01/28/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ServerErrorIcon, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
declare var homePath: string;
declare interface MeterConfiguration {
    ID: number,
    Revision: string,
    FilesProcessed: number,
    LastProcessedTime: string
}
function MeterConfigurationHistoryWindow(props: { Meter: OpenXDA.Types.Meter }) {
    const navigate = useNavigate();
    const [meterConfigurations, setMeterConfigurations] = React.useState<Array<MeterConfiguration>>([]);

    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');

    React.useEffect(() => {
        getData();
    }, [props.Meter, page]);

    function getData() {
        setPageState('loading');
        getMeterConfigurations();
    }

    function getMeterConfigurations(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/MeterConfiguration/Meter/${props.Meter.ID}/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((result) => {
            const records = JSON.parse(result.Records);
            setMeterConfigurations(records);
            setPageInfo(result);
            setPageState('idle');
        }).fail(() => setPageState('error'));
    };
    function handleSelect(item: MeterConfiguration) {
        navigate(`${homePath}index.cshtml?name=ConfigurationHistory&MeterKey=${props.Meter.AssetKey}&MeterConfigurationID=${item.ID}`);
    }

    return (
            <div className="card d-flex h-100 flex-column" style={{ overflow: 'hidden' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Configuration History:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingBottom: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <Table<MeterConfiguration>
                            TableClass="table table-hover"
                            Data={meterConfigurations}
                            SortKey={''}
                            Ascending={false}
                            OnSort={(d) => { }}
                            OnClick={(d) => handleSelect(d.row)}
                            TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1, width: '100%' }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<MeterConfiguration>
                                Key={'Revision'}
                                AllowSort={false}
                                Field={'Revision'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Revision
                            </Column>
                            <Column<MeterConfiguration>
                                Key={'FilesProcessed'}
                                AllowSort={false}
                                Field={'FilesProcessed'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Files Processed
                            </Column>
                            <Column<MeterConfiguration>
                                Key={'LastProcessedTime'}
                                AllowSort={false}
                                Field={'LastProcessedTime'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item }) => moment(item.LastProcessedTime).isValid() ? moment(item.LastProcessedTime).format('MM/DD/YYYY HH:mm:ss') : 'N/A'}
                            > Last Processed Time
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
    );
}

export default MeterConfigurationHistoryWindow;