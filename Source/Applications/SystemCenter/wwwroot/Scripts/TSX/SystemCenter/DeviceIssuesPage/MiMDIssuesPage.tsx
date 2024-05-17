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



import { OpenXDA } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global';
import * as React from 'react';
import { ConfigTable, GenericController } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table'
import Reason from './Reason';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SystemCenterSettingSlice } from '../Store/Store';

const MiMDDailyStatisticController = new GenericController<SC.MiMDDailyStatistic>(`${homePath}api/SystemCenter/Statistics/MiMD`, "LastSuccessfulFileProcessed", true);

function MiMDIssuesPage(props: { Meter: OpenXDA.Types.Meter }) {
    let dispatch = useAppDispatch();

    const [data, setData] = React.useState<SC.MiMDDailyStatistic[]>([]);
    const [sortField, setSortField] = React.useState<keyof SC.MiMDDailyStatistic>('LastSuccessfulFileProcessed');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const settings = useAppSelector(SystemCenterSettingSlice.Data);
    const settingStatus = useAppSelector(SystemCenterSettingSlice.Status);

    React.useEffect(() => {
        const handle = MiMDDailyStatisticController.Fetch(props.Meter.AssetKey, sortField, ascending).done(d => setData(d));

        return () => {
            if (handle != null || handle.abort != null) handle.abort();
        }
    }, [props.Meter, sortField, ascending]);

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
            <ConfigTable.Table<SC.MiMDDailyStatistic>
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
                        setAscending(true);
                        setSortField(d.colField);
                    }
                }}
            >
                <ReactTable.Column<SC.MiMDDailyStatistic>
                    Key={'Date'}
                    AllowSort={true}
                    Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : ''}
                    Field={'Date'}
                    HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                    RowStyle={{ width: 'auto', textAlign: 'center' }}
                >
                    Date
                </ReactTable.Column>
                <ConfigTable.Configurable Key='LastSuccessfulFileProcessed' Label='Last Succ' Default={true}>
                    <ReactTable.Column<SC.MiMDDailyStatistic>
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
                    <ReactTable.Column<SC.MiMDDailyStatistic>
                        Key={'LastUnsuccessfulFileProcessed'}
                        AllowSort={true}
                        Field={'LastUnsuccessfulFileProcessed'}
                        Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : 'N/A'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Last Unsucc
                    </ReactTable.Column>
                    <ReactTable.Column<SC.MiMDDailyStatistic>
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
                    <ReactTable.Column<SC.MiMDDailyStatistic>
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
                    <ReactTable.Column<SC.MiMDDailyStatistic>
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
                    <ReactTable.Column<SC.MiMDDailyStatistic>
                        Key={'TotalUnsuccessfulFilesProcessed'}
                        AllowSort={true}
                        Field={'TotalUnsuccessfulFilesProcessed'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Total Unsucc
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='ConfigChanges' Label='Config Changes' Default={true}>
                    <ReactTable.Column<SC.MiMDDailyStatistic>
                        Key={'ConfigChanges'}
                        AllowSort={true}
                        Field={'ConfigChanges'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Config Changes
                    </ReactTable.Column>
                    <ReactTable.Column<SC.MiMDDailyStatistic>
                        Key={'LastConfigFileChange'}
                        AllowSort={true}
                        Field={'LastConfigFileChange'}
                        Content={({ item }) => <a target='_blank' href={settings.find(s => s.Name == 'MiMD.Url')?.Value + `/Configuration/Meter/${props.Meter.ID}`}>{item.ConfigChanges}</a>}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Last Change
                    </ReactTable.Column>
                    <ReactTable.Column<SC.MiMDDailyStatistic>
                        Key={'DiagnosticAlarms'}
                        AllowSort={true}
                        Field={'DiagnosticAlarms'}
                        Content={({ item }) => <a target='_blank' href={settings.find(s => s.Name == 'MiMD.Url')?.Value + `/Diagnostic/Meter/${props.Meter.ID}`}>{item.DiagnosticAlarms}</a>}
                                    HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                                    RowStyle={{ width: 'auto', textAlign: 'center' }}
                                >
                        Diagnostic Alarms
                    </ReactTable.Column>     
                    <ReactTable.Column<SC.MiMDDailyStatistic>
                        Key={'ComplianceIssues'}
                        AllowSort={true}
                        Field={'ComplianceIssues'}
                        Content={({ item }) => <a target='_blank' href={settings.find(s => s.Name == 'MiMD.Url')?.Value + `/PRC002Overview/Meter/${props.Meter.ID}`}>{item.ComplianceIssues}</a>}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Compliance Issues
                    </ReactTable.Column>
                </ConfigTable.Configurable>
            </ConfigTable.Table>
        </div>
        <div className="card-footer"/>
    </div>
}

export default MiMDIssuesPage
