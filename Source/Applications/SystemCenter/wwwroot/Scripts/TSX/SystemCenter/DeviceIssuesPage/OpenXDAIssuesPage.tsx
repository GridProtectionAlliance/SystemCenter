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



import { OpenXDA } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global';
import _ from 'lodash';
import * as React from 'react';
import { GenericController } from '@gpa-gemstone/react-interactive';
import { ConfigurableTable, ConfigurableColumn, Column } from '@gpa-gemstone/react-table';
import Reason from '../CommonComponents/Reason';
import moment from 'moment';

const OpenXDADailyStatisticController = new GenericController<SC.OpenXDADailyStatistic>(`${homePath}api/SystemCenter/Statistics/OpenXDA`, "LastSuccessfulFileProcessed", false);

function OpenXDAIssuesPage(props: { Meter: OpenXDA.Types.Meter }) {
    const [data, setData] = React.useState<SC.OpenXDADailyStatistic[]>([]);
    const [sortField, setSortField] = React.useState<keyof SC.OpenXDADailyStatistic>('Date');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const order = React.useCallback((data: SC.OpenXDADailyStatistic[]) => {
        return _.orderBy(data, [sortField], [ascending ? 'asc' : 'desc'])
    }, [sortField, ascending]);

    React.useEffect(() => {
        const handle = OpenXDADailyStatisticController.PagedSearch([], undefined, undefined, 0, props.Meter.AssetKey).done(result => {
            const data = JSON.parse(result.Data as unknown as string);
            setData(order(data));
        });

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [props.Meter.AssetKey]);

    React.useEffect(() => {
        if (data.length === 0) return;
        setData(order(data));
    }, [order]);

    return <div className="card" style={{ width: '100%', height: '100%' }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>openXDA Daily Statistics:</h4>
                </div>
            </div>
        </div>
        <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
            <ConfigurableTable<SC.OpenXDADailyStatistic>
                LocalStorageKey="MiMDIssuesConfigTable"
                TableClass="table table-hover"
                Data={data}
                SortKey={sortField}
                Ascending={ascending}
                TableStyle={{
                    padding: 0, width: '100%', height: '100%',
                    tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                }}
                TheadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={() => false}
                KeySelector={(item) => item.ID}
                OnSort={(d) => {
                    if (d.colField == sortField) {
                        setAscending(!ascending);
                    }
                    else {
                        setAscending(true);
                        setSortField(d.colField);
                    }
                }}
            >
                <Column<SC.OpenXDADailyStatistic>
                    Key={'Date'}
                    AllowSort={true}
                    Field={'Date'}
                    HeaderStyle={{ width: 'auto' }}
                    Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : ''}
                    RowStyle={{ width: 'auto' }}
                >
                    Date
                </Column>
                <ConfigurableColumn Key='LastSuccessfulFileProcessed' Label='Last Succ' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'LastSuccessfulFileProcessed'}
                        AllowSort={true}
                        Field={'LastSuccessfulFileProcessed'}
                        Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : ''}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    >
                        Last Succ
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='LastUnsuccessfulFileProcessed' Label='Last Unsucc' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'LastUnsuccessfulFileProcessed'}
                        AllowSort={true}
                        Field={'LastUnsuccessfulFileProcessed'}
                        Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : 'N/A'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    >
                        Last Unsucc
                    </Column>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'LastUnsuccessfulFileProcessedExplanation'}
                        AllowSort={true}
                        Field={'LastUnsuccessfulFileProcessedExplanation'}
                        Content={({ item, field }) => <Reason ID={item.ID} Text={item[field]?.toString() ?? ''} />}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    >
                        Reason
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='TotalFilesProcessed' Label='Total' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'TotalFilesProcessed'}
                        AllowSort={true}
                        Field={'TotalFilesProcessed'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    >
                        Total
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='TotalSuccessfulFilesProcessed' Label='Total Succ' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'TotalSuccessfulFilesProcessed'}
                        AllowSort={true}
                        Field={'TotalSuccessfulFilesProcessed'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    >
                        Total Succ
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='TotalUnsuccessfulFilesProcessed' Label='Total Unsucc' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'TotalUnsuccessfulFilesProcessed'}
                        AllowSort={true}
                        Field={'TotalUnsuccessfulFilesProcessed'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    >
                        Total Unsucc
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='TotalEmailsSent' Label='Tot Emails Sent' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'TotalEmailsSent'}
                        AllowSort={true}
                        Field={'TotalEmailsSent'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    >
                        Tot Emails Sent
                    </Column>
                </ConfigurableColumn>

                <ConfigurableColumn Key='AverageDownloadLatency' Label='Avg Dnld Lat' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'AverageDownloadLatency'}
                        AllowSort={true}
                        Field={'AverageDownloadLatency'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                    >
                        Avg Dnld Lat
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='AverageProcessingStartLatency' Label='Avg Proc Start Lat' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'AverageProcessingStartLatency'}
                        AllowSort={true}
                        Field={'AverageProcessingStartLatency'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                    >
                        Avg Proc Start Lat
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='AverageProcessingEndLatency' Label='Avg Proc End Lat' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'AverageProcessingEndLatency'}
                        AllowSort={true}
                        Field={'AverageProcessingEndLatency'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                    >
                        Avg Proc End Lat
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='AverageEmailLatency' Label='Avg Email Lat' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'AverageEmailLatency'}
                        AllowSort={true}
                        Field={'AverageEmailLatency'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                    >
                        Avg Email Lat
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='AverageTotalProcessingLatency' Label='Avg Tot Proc Lat' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'AverageTotalProcessingLatency'}
                        AllowSort={true}
                        Field={'AverageTotalProcessingLatency'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                    >
                        Avg Tot Proc Lat
                    </Column>
                </ConfigurableColumn>
                <ConfigurableColumn Key='AverageTotalEmailLatency' Label='Avg Tot Email Lat' Default={true}>
                    <Column<SC.OpenXDADailyStatistic>
                        Key={'AverageTotalEmailLatency'}
                        AllowSort={true}
                        Field={'AverageTotalEmailLatency'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''}
                    >
                        Avg Tot Email Lat
                    </Column>
                </ConfigurableColumn>
            </ConfigurableTable>
        </div>
    </div>
}

export default OpenXDAIssuesPage
