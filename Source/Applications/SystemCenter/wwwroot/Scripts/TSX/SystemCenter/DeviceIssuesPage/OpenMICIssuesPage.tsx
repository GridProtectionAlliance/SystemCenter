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



import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global';
import { CrossMark, HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import { orderBy } from 'lodash';
import * as React from 'react';
import Table from '@gpa-gemstone/react-table';
import Reason from './Reason';
import moment from 'moment';

function OpenMICIssuesPage(props: { Meter: OpenXDA.Types.Meter }) {
    const [data, setData] = React.useState<SC.OpenMICDailyStatistic[]>([]);
    const [sortField, setSortField] = React.useState<keyof SC.OpenMICDailyStatistic>('Date');
    const [ascending, setAscending] = React.useState<boolean>(false);

    React.useEffect(() => {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Statistics/OpenMIC/${props.Meter.AssetKey}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }) as JQuery.jqXHR<SC.OpenMICDailyStatistic[]>;
        handle.done(d => setData(orderBy(d, [sortField], [ascending? "asc" : "desc"])))

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [props.Meter]);

    React.useEffect(() => {
        setData(orderBy(data, [sortField], [ascending ? "asc" : "desc"]))
    }, [sortField, ascending]);

    return <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>OpenMIC Issues for {props.Meter?.Name} :</h4> 
                </div>
                <div className="col">
                    <Test {...props}/>
                </div>
            </div>
        </div>
        <div className="card-body">
            <Table<SC.OpenMICDailyStatistic>
                cols={[
                    { key: 'Date', label: 'Date', field: 'Date', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' } },
                    { key: 'LastSuccessfulConnection', label: 'Last Succ Conn', field: 'LastSuccessfulConnection', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : '' },
                    { key: 'LastUnsuccessfulConnection', label: 'Last Unsucc Conn', field: 'LastUnsuccessfulConnection', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' }, content: (item, key, field, style) => item[field] != undefined ? moment(item[field]).format('MM/DD/YY HH:mm') : '' },
                    { key: 'LastUnsuccessfulConnectionExplanation', label: 'Reason', field: 'LastUnsuccessfulConnectionExplanation', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' }, content: (item, key, field, style) => <Reason ID={item.ID} Text={item[field]?.toString() ?? ''} /> },
                    { key: 'TotalConnections', label: 'Total Conn', field: 'TotalConnections', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' } },
                    { key: 'TotalUnsuccessfulConnections', label: 'Total Unsucc Conn', field: 'TotalUnsuccessfulConnections', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' } },
                    { key: 'TotalSuccessfulConnections', label: 'Total Succ Conn', field: 'TotalSuccessfulConnections', headerStyle: { width: '10%', textAlign: 'center' }, rowStyle: { width: '10%', textAlign: 'center' } },

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
                //theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                //tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 182, width: '100%' }}
                //rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                selected={() => false}
            />
        </div>
        <div className="card-footer">
        </div>

    </div>

}

const Test = (props: { Meter: OpenXDA.Types.Meter }) => {
    const [flag, setFlag] = React.useState<boolean>(null);
    const [acronym, setAcronym] = React.useState<string>(undefined);
    const [time, setTime] = React.useState<number>(0);

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
            <button className='btn btn-primary' onClick={RunTest}>Test</button>
            <span style={{marginLeft: 20}}>{Flag()}</span>
        </div>
    );
}
export default OpenMICIssuesPage
