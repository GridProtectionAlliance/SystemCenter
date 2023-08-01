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
import { ConfigurableTable } from '@gpa-gemstone/react-interactive';
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
            <ConfigurableTable<SC.OpenXDADailyStatistic>
                cols={[
                    { key: 'Date', label: 'Date', field: 'Date', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' } },
                    { key: 'LastSuccessfulFileProcessed', label: 'Last Succ', field: 'LastSuccessfulFileProcessed', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : '' },
                    { key: 'LastUnsuccessfulFileProcessed', label: 'Last Unsucc', field: 'LastUnsuccessfulFileProcessed', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : '' },
                    { key: 'LastUnsuccessfulFileProcessedExplanation', label: 'Reason', field: 'LastUnsuccessfulFileProcessedExplanation', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' }, content: (item, key, field, style) => <Reason ID={item.ID} Text={item[field]?.toString() ?? ''}/> },
                    { key: 'TotalFilesProcessed', label: 'Total', field: 'TotalFilesProcessed', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' } },
                    { key: 'TotalSuccessfulFilesProcessed', label: 'Tot Succ', field: 'TotalSuccessfulFilesProcessed', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' } },
                    { key: 'TotalUnsuccessfulFilesProcessed', label: 'Tot Unsucc', field: 'TotalUnsuccessfulFilesProcessed', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' } },
                    { key: 'TotalEmailsSent', label: 'Tot Emails Sent', field: 'TotalEmailsSent', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' } },
                    { key: 'AverageDownloadLatency', label: 'Avg Dnld Lat', field: 'AverageDownloadLatency', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? (item[field] as number).toFixed(2) : '' },
                    { key: 'AverageProcessingStartLatency', label: 'Avg Proc Start Lat', field: 'AverageProcessingStartLatency', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? (item[field] as number).toFixed(2) : '' },
                    { key: 'AverageProcessingEndLatency', label: 'Avg Proc End Lat', field: 'AverageProcessingEndLatency', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? (item[field] as number).toFixed(2) : '' },
                    { key: 'AverageEmailLatency', label: 'Avg Email Lat', field: 'AverageEmailLatency', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''  },
                    { key: 'AverageTotalProcessingLatency', label: 'Avg Tot Proc Lat', field: 'AverageTotalProcessingLatency', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? (item[field] as number).toFixed(2) : ''  },
                    { key: 'AverageTotalEmailLatency', label: 'Avg Tot Email Lat', field: 'AverageTotalEmailLatency', headerStyle: { width: 'auto', textAlign: 'center' }, rowStyle: { width: 'auto', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? (item[field] as number).toFixed(2) : '' },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                ]}
                defaultColumns={["Date", "LastSuccessfulFileProcessed", "LastUnsuccessfulFileProcessed", "LastUnsuccessfulFileProcessedExplanation", "TotalFilesProcessed", "TotalSuccessfulFilesProcessed", "TotalUnsuccessfulFilesProcessed", "TotalEmailsSent", "AverageDownloadLatency", "AverageProcessingStartLatency", "AverageProcessingEndLatency", "AverageEmailLatency", "AverageTotalProcessingLatency", "AverageTotalEmailLatency", "Scroll"]}
                requiredColumns={["Date", "Scroll"]}
                localStorageKey="XDAIssuesConfigTable"
                tableClass="table table-hover"
                data={data}
                sortKey={sortField}
                ascending={ascending}
                onSort={(d) => {
                    if (d.colField == sortField) {
                        setAscending(!ascending);
                    }
                    else {
                        setAscending(!ascending);
                        setSortField(d.colField);
                    }
                }}
                onClick={() => { }}
                theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 425, width: '100%' }}
                rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                selected={() => false}
            />

        </div>
        <div className="card-footer">
        </div>

    </div>

}

export default OpenXDAIssuesPage
