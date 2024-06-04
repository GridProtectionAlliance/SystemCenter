//******************************************************************************************************
//  OpenMICIssuesPage.tsx - Gbtc
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
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import _ from 'lodash';
import * as React from 'react';
import { ConfigTable, GenericController } from '@gpa-gemstone/react-interactive';
import { ReactTable } from '@gpa-gemstone/react-table'
import Reason from './Reason';
import moment from 'moment';

const OpenMICDailyStatisticController = new GenericController<SC.OpenMICDailyStatistic>(`${homePath}api/SystemCenter/Statistics/OpenMIC`, "LastSuccessfulConnection", true);

function OpenMICIssuesPage(props: { Meter: OpenXDA.Types.Meter, OpenMICAcronym: string }) {
    const [data, setData] = React.useState<SC.OpenMICDailyStatistic[]>([]);
    const [sortField, setSortField] = React.useState<keyof SC.OpenMICDailyStatistic>('LastSuccessfulConnection');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const order = React.useCallback((data: SC.OpenMICDailyStatistic[]) => {
        return _.orderBy(data, [sortField], [ascending ? 'asc' : 'desc'])
    }, [sortField, ascending]);

    React.useEffect(() => {
        const handle = OpenMICDailyStatisticController.PagedSearch([], undefined, undefined, 0, props.Meter.AssetKey).done(result => {
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
                    <h4>openMIC Issues for {props.Meter?.Name} :</h4> 
                </div>
                <div className="col">
                    <Test {...props}/>
                </div>
            </div>
        </div>
        <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
            <ConfigTable.Table<SC.OpenMICDailyStatistic>
                LocalStorageKey="MiMDIssuesConfigTable"
                TableClass="table table-hover"
                Data={data}
                SortKey={sortField}
                Ascending={ascending}
                Selected={() => false}
                KeySelector={(item) => item.ID}
                TableStyle={{
                    padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                    tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                }}
                TheadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
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
                <ReactTable.Column<SC.OpenMICDailyStatistic>
                    Key={'Date'}
                    AllowSort={true}
                    Field={'Date'}
                    HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                    Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : ''}
                    RowStyle={{ width: 'auto', textAlign: 'center' }}
                >
                    Date
                </ReactTable.Column>
                <ConfigTable.Configurable Key='LastSuccessfulConnection' Label='Last Succ Conn' Default={true}>
                    <ReactTable.Column<SC.OpenMICDailyStatistic>
                        Key={'LastSuccessfulConnection'}
                        AllowSort={true}
                        Field={'LastSuccessfulConnection'}
                        Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : ''}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Last Succ Conn
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='LastUnsuccessfulConnection' Label='Last Unsucc Conn' Default={true}>
                    <ReactTable.Column<SC.OpenMICDailyStatistic>
                        Key={'LastUnsuccessfulConnection'}
                        AllowSort={true}
                        Field={'LastUnsuccessfulConnection'}
                        Content={({ item, field }) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : 'N/A'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Last Unsucc Conn
                    </ReactTable.Column>
                    <ReactTable.Column<SC.OpenMICDailyStatistic>
                        Key={'LastUnsuccessfulConnectionExplanation'}
                        AllowSort={true}
                        Field={'LastUnsuccessfulConnectionExplanation'}
                        Content={({ item, field }) => <Reason ID={item.ID} Text={item[field]?.toString() ?? ''} /> }
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Reason
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='TotalConnections' Label='Total Conn' Default={true}>
                    <ReactTable.Column<SC.OpenMICDailyStatistic>
                        Key={'TotalConnections'}
                        AllowSort={true}
                        Field={'TotalConnections'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Total Conn
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='TotalSuccessfulConnections' Label='Total Succ Conn' Default={true}>
                    <ReactTable.Column<SC.OpenMICDailyStatistic>
                        Key={'TotalSuccessfulConnections'}
                        AllowSort={true}
                        Field={'TotalSuccessfulConnections'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Total Succ Conn
                    </ReactTable.Column>
                </ConfigTable.Configurable>
                <ConfigTable.Configurable Key='TotalUnsuccessfulConnections' Label='Total Unsucc Conn' Default={true}>
                    <ReactTable.Column<SC.OpenMICDailyStatistic>
                        Key={'TotalUnsuccessfulConnections'}
                        AllowSort={true}
                        Field={'TotalUnsuccessfulConnections'}
                        HeaderStyle={{ width: 'auto', textAlign: 'center' }}
                        RowStyle={{ width: 'auto', textAlign: 'center' }}
                    >
                        Total Unsucc Conn
                    </ReactTable.Column>
                </ConfigTable.Configurable>
            </ConfigTable.Table>
        </div>
        <div className="card-footer"/>
    </div>
}

const Test = (props: { Meter: OpenXDA.Types.Meter }) => {
    const [flag, setFlag] = React.useState<boolean>(null);
    const [acronym, setAcronym] = React.useState<string>(undefined);

    React.useEffect(() => {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenMIC/Acronym/${props.Meter.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(d => setAcronym(d))

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [props.Meter]);

    function RunTest() {
        if (acronym == undefined) return null;
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenMIC/Test/${acronym}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(d => setFlag(d == "true"))
    }

    function Flag() {
        if (flag) return HeavyCheckMark;
        else if (flag != null) return CrossMark;
        else return null;
    }
        
    return (
        <div style={{width: 100, position: 'absolute', right: 0}}>
            <button className='btn btn-primary' onClick={RunTest}>Ping Device</button>
            <span style={{marginLeft: 20}}>{Flag()}</span>
        </div>
    );
}
export default OpenMICIssuesPage
