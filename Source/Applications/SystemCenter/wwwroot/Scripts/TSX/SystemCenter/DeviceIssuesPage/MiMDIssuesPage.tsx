//******************************************************************************************************
//  MiMDIssuesPage.tsx - Gbtc
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
import Table from '@gpa-gemstone/react-table';
import Reason from './Reason';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SystemCenterSettingSlice } from '../Store/Store';

function MiMDIssuesPage(props: { Meter: OpenXDA.Types.Meter }) {
    let dispatch = useAppDispatch();

    const [data, setData] = React.useState<SC.MiMDDailyStatistic[]>([]);
    const [sortField, setSortField] = React.useState<keyof SC.MiMDDailyStatistic>('Date');
    const [ascending, setAscending] = React.useState<boolean>(false);
    const settings = useAppSelector(SystemCenterSettingSlice.Data);
    const settingStatus = useAppSelector(SystemCenterSettingSlice.Status);

    React.useEffect(() => {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Statistics/MiMD/${props.Meter.AssetKey}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }) as JQuery.jqXHR<SC.MiMDDailyStatistic[]>;
        handle.done(d => setData(orderBy(d, [sortField], [ascending ? "asc" : "desc"])))

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [props.Meter]);

    React.useEffect(() => {
        if (settingStatus == 'unintiated' || settingStatus == 'changed')
            dispatch(SystemCenterSettingSlice.Fetch());
    }, [settingStatus]);

    return <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>miMD Issues for {props.Meter?.Name} :</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
            <Table<SC.MiMDDailyStatistic>
                cols={[
                    { key: 'Date', label: 'Date', field: 'Date', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' } },
                    { key: 'LastSuccessfulFileProcessed', label: 'Last Succ', field: 'LastSuccessfulFileProcessed', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : '' },
                    { key: 'LastUnsuccessfulFileProcessed', label: 'Last Unsucc', field: 'LastUnsuccessfulFileProcessed', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : '' },
                    { key: 'LastUnsuccessfulFileProcessedExplanation', label: 'Reason', field: 'LastUnsuccessfulFileProcessedExplanation', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' }, content: (item, key, field, style) => <Reason ID={item.ID} Text={item[field]?.toString() ?? ''} /> },
                    { key: 'TotalFilesProcessed', label: 'Total', field: 'TotalFilesProcessed', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' } },
                    { key: 'TotalSuccessfulFilesProcessed', label: 'Total Unsucc', field: 'TotalSuccessfulFilesProcessed', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' } },
                    { key: 'TotalUnsuccessfulFilesProcessed', label: 'Total Succ', field: 'TotalUnsuccessfulFilesProcessed', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' } },
                    { key: 'ConfigChanges', label: 'Config Changes', field: 'ConfigChanges', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' } },
                    { key: 'LastConfigFileChange', label: 'Last Change', field: 'LastConfigFileChange', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' }, content: (item, key, field, style, index) => <a target='_blank' href={settings.find(s => s.Name == 'MiMD.Url')?.Value + `/index.cshtml?name=Configuration&MeterID=${props.Meter.ID}` }>{item.ConfigChanges}</a> },
                    { key: 'DiagnosticAlarms', label: 'Diagnostic Alarms', field: 'DiagnosticAlarms', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' }, content: (item, key, field, style, index) => <a target='_blank' href={settings.find(s => s.Name == 'MiMD.Url')?.Value + `/index.cshtml?name=Diagnostic&MeterID=${props.Meter.ID}`}>{item.DiagnosticAlarms}</a> },
                    { key: 'ComplianceIssues', label: 'Compliance Issues', field: 'ComplianceIssues', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' }, content: (item, key, field, style, index) => <a target='_blank' href={settings.find(s => s.Name == 'MiMD.Url')?.Value + `/index.cshtml?name=Compliance&MeterID=${props.Meter.ID}`}>{item.ComplianceIssues}</a> },


                ]}
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
                tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 182, width: '100%' }}
                rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                selected={() => false}
            />

        </div>
        <div className="card-footer">
        </div>

    </div>

}

export default MiMDIssuesPage
