//******************************************************************************************************
//  OpenXDAIssuesPage.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  07/09/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************



import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { orderBy } from 'lodash';
import * as React from 'react';
import { ConfigTable } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table'
import Reason from './Reason';
import moment from 'moment';

function OpenXDAIssuesPage(props: { Meter: OpenXDA.Types.Meter }) {
    const [data, setData] = React.useState<SC.OpenXDADailyStatistic[]>([]);
    const [sortField, setSortField] = React.useState<keyof SC.OpenXDADailyStatistic>('Date');
    const [ascending, setAscending] = React.useState<boolean>(false);

    React.useEffect(() => {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Statistics/OpenXDA/${props.Meter.AssetKey}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }) as JQuery.jqXHR<SC.OpenXDADailyStatistic[]>;
        handle.done(d => setData(orderBy(d, [sortField], [ascending ? "asc" : "desc"])))

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [props.Meter]);

    return <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>openXDA Issues for { props.Meter?.Name} :</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
            <ConfigTable.Table<SC.OpenXDADailyStatistic>
                LocalStorageKey="MiMDIssuesConfigTable"
                TableClass="table table-hover"
                Data={data}
                SortKey={sortField}
                Ascending={ascending}
                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'scroll' }}
                RowStyle={{ display: 'table', tableLayout: 'fixed', width: 'calc(100%)' }}
                Selected={() => false}
                KeySelector={(item) => item.ID}
                OnSort={(d) => {
                    if (d.colField == sortField) {
                        setAscending(!ascending);
                    }
                    else {
                        setAscending(!ascending);
                        setSortField(d.colField);
                    }
                }}
            >
                <ReactTable.Column<SC.OpenXDADailyStatistic>
                    Key={'Date'}
                    AllowSort={true}
                    Field={'Date'}
                    HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                    Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : ''}
                    RowStyle={{ width: 'auto', textAlign: 'center' }}
                >
                    Date
                </ReactTable.Column>
                <ConfigTable.Configurable Key='LastSuccessfulFileProcessed' Label='Last Succ' Default={true}>
                    <ReactTable.Column<SC.OpenXDADailyStatistic>
                        Key={'LastSuccessfulFileProcessed'}
                        AllowSort={true}
                        Field={'LastSuccessfulFileProcessed'}
                        Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : ''}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Last Succ
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='LastUnsuccessfulFileProcessed' Label='Last Unsucc' Default={true}>
                    <ReactTable.Column<SC.OpenXDADailyStatistic>
                        Key={'LastUnsuccessfulFileProcessed'}
                        AllowSort={true}
                        Field={'LastUnsuccessfulFileProcessed'}
                        Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : ''}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Last Unsucc
                    </ReactTable.Column>
                    <ReactTable.Column<SC.OpenXDADailyStatistic>
                        Key={'LastUnsuccessfulFileProcessedExplanation'}
                        AllowSort={true}
                        Field={'LastUnsuccessfulFileProcessedExplanation'}
                        Content={({ item, field }) => <Reason ID={item.ID} Text={item[field]?.toString() ?? ''} />}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Reason
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='TotalFilesProcessed' Label='Total' Default={true}>
                    <ReactTable.Column<SC.OpenXDADailyStatistic>
                        Key={'TotalFilesProcessed'}
                        AllowSort={true}
                        Field={'TotalFilesProcessed'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Total
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='TotalSuccessfulFilesProcessed' Label='Total Succ' Default={true}>
                    <ReactTable.Column<SC.OpenXDADailyStatistic>
                        Key={'TotalSuccessfulFilesProcessed'}
                        AllowSort={true}
                        Field={'TotalSuccessfulFilesProcessed'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Total Succ
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='TotalUnsuccessfulFilesProcessed' Label='Total Unsucc' Default={true}>
                    <ReactTable.Column<SC.OpenXDADailyStatistic>
                        Key={'TotalUnsuccessfulFilesProcessed'}
                        AllowSort={true}
                        Field={'TotalUnsuccessfulFilesProcessed'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Total Unsucc
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='TotalEmailsSent' Label='Tot Emails Sent' Default={true}>
                    <ReactTable.Column<SC.OpenXDADailyStatistic>
                        Key={'TotalEmailsSent'}
                        AllowSort={true}
                        Field={'TotalEmailsSent'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Tot Emails Sent
                    </ReactTable.Column>
                </ConfigTable.Configurable>

                <ConfigTable.Configurable Key='AverageDownloadLatency' Label='Avg Dnld Lat' Default={true}>
                    <ReactTable.Column<SC.OpenXDADailyStatistic>
                        Key={'AverageDownloadLatency'}
                        AllowSort={true}
                        Field={'AverageDownloadLatency'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                        Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                    >
                        Avg Dnld Lat
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='AverageProcessingStartLatency' Label='Avg Proc Start Lat' Default={true}>
                    <ReactTable.Column<SC.OpenXDADailyStatistic>
                        Key={'AverageProcessingStartLatency'}
                        AllowSort={true}
                        Field={'AverageProcessingStartLatency'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                        Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                    >
                        Avg Proc Start Lat
                    </ReactTable.Column>
                    <ConfigTable.Configurable Key='AverageProcessingEndLatency' Label='Avg Proc End Lat' Default={true}>
                        <ReactTable.Column<SC.OpenXDADailyStatistic>
                            Key={'AverageProcessingEndLatency'}
                            AllowSort={true}
                            Field={'AverageProcessingEndLatency'}
                            HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                            RowStyle={{ width: 'auto', textAlign: 'center' }}
                            Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                        >
                            Avg Proc End Lat
                        </ReactTable.Column>
                    </ConfigTable.Configurable>
                    <ConfigTable.Configurable Key='AverageEmailLatency' Label='Avg Email Lat' Default={true}>
                        <ReactTable.Column<SC.OpenXDADailyStatistic>
                            Key={'AverageEmailLatency'}
                            AllowSort={true}
                            Field={'AverageEmailLatency'}
                            HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                            RowStyle={{ width: 'auto', textAlign: 'center' }}
                            Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                        >
                            Avg Email Lat
                        </ReactTable.Column>
                    </ConfigTable.Configurable>
                    <ConfigTable.Configurable Key='AverageTotalProcessingLatency' Label='Avg Tot Proc Lat' Default={true}>
                        <ReactTable.Column<SC.OpenXDADailyStatistic>
                            Key={'AverageTotalProcessingLatency'}
                            AllowSort={true}
                            Field={'AverageTotalProcessingLatency'}
                            HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                            RowStyle={{ width: 'auto', textAlign: 'center' }}
                            Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                        >
                            Avg Tot Proc Lat
                        </ReactTable.Column>
                        <ConfigTable.Configurable Key='AverageTotalEmailLatency' Label='Avg Tot Email Lat' Default={true}>
                            <ReactTable.Column<SC.OpenXDADailyStatistic>
                                Key={'AverageTotalEmailLatency'}
                                AllowSort={true}
                                Field={'AverageTotalEmailLatency'}
                                HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                                RowStyle={{ width: 'auto', textAlign: 'center' }}
                                Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                            >
                                Avg Tot Email Lat
                            </ReactTable.Column>
                        </ConfigTable.Configurable>

                    </ConfigTable.Configurable>
                </ConfigTable.Configurable>
            </ConfigTable.Table>
        </div>
        <div className="card-footer">
        </div>

    </div>

}

export default OpenXDAIssuesPage
