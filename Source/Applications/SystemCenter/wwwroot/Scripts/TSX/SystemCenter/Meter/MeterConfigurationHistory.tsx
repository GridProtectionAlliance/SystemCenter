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
import { ReactTable } from '@gpa-gemstone/react-table';
import { useHistory } from "react-router-dom";

declare var homePath: string;
declare interface MeterConfiguration {
    ID: number,
    Revision: string,
    FilesProcessed: number,
    LastProcessedTime: string
}
function MeterConfigurationHistoryWindow(props: { Meter: OpenXDA.Types.Meter }) {
    const history = useHistory();
    const [meterConfigurations, setMeterConfigurations] = React.useState<Array<MeterConfiguration>>([]);

    React.useEffect(() => {
        getData();
    }, [props.Meter]);

    function getData() {
        getMeterConfigurations();
    }

    function getMeterConfigurations(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/MeterConfiguration/Meter/${props.Meter.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((data: Array<MeterConfiguration>) => setMeterConfigurations(data));
    }

    function handleSelect(item: MeterConfiguration) {
        history.push({ pathname: `${homePath}index.cshtml`, search: `?name=ConfigurationHistory&MeterKey=${props.Meter.AssetKey}&MeterConfigurationID=${item.ID}` })
    }

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%', marginBottom: 10, overflow: 'hidden' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h4>Configuration History:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <ReactTable.Table<MeterConfiguration>
                            TableClass="table table-hover"
                            Data={meterConfigurations}
                            SortKey={''}
                            Ascending={false}
                            OnSort={(d) => { }}
                            OnClick={(d) => handleSelect(d.row)}
                            TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1, width: '100%' }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <ReactTable.Column<MeterConfiguration>
                                Key={'Revision'}
                                AllowSort={true}
                                Field={'Revision'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Revision
                            </ReactTable.Column>
                            <ReactTable.Column<MeterConfiguration>
                                Key={'FilesProcessed'}
                                AllowSort={true}
                                Field={'FilesProcessed'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Files Processed
                            </ReactTable.Column>
                            <ReactTable.Column<MeterConfiguration>
                                Key={'LastProcessedTime'}
                                AllowSort={true}
                                Field={'LastProcessedTime'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Last Processed Time
                            </ReactTable.Column>
                        </ReactTable.Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MeterConfigurationHistoryWindow;