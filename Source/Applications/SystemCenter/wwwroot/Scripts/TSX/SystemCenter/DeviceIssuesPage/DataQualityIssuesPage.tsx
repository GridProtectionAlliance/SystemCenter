//******************************************************************************************************
//  DataQualityIssuesPage.tsx - Gbtc
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
//  12/01/2021 - Billy Ernest
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

function DataQualityIssuesPage(props: { Meter: OpenXDA.Types.Meter }) {
    const [data, setData] = React.useState<SC.MeterDataQualitySummary[]>([]);
    const [sortField, setSortField] = React.useState<keyof SC.MeterDataQualitySummary>('Date');
    const [ascending, setAscending] = React.useState<boolean>(false);

    React.useEffect(() => {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/MeterDataQualitySummary/${props.Meter.ID}/Date/0`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }) as JQuery.jqXHR<SC.MeterDataQualitySummary[] | string>;
        handle.done(d => {
            let json = d;
            if (typeof (d) == 'string')
                json = JSON.parse(d);

            setData(orderBy(json as SC.MeterDataQualitySummary[], [sortField], [ascending ? "asc" : "desc"]))
        })

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [props.Meter]);

    return <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>Data Quality Issues for { props.Meter?.Name} :</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
            <Table<SC.MeterDataQualitySummary>
                cols={[
                    { key: 'Date', label: 'Date', field: 'Date', headerStyle: { width: 'auto', textAlign: 'left' }, rowStyle: { width: 'auto', textAlign: 'left' }, content: (item, key, style) => moment(item[key], "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY")},
                    { key: 'ExpectedPoints', label: 'Expected Points Succ', field: 'ExpectedPoints', headerStyle: { width: '15%', textAlign: 'center' }, rowStyle: { width: '15%', textAlign: 'center' }},
                    { key: 'GoodPoints', label: 'Good Points', field: 'GoodPoints', headerStyle: { width: '15%', textAlign: 'center' }, rowStyle: { width: '15%', textAlign: 'center' }},
                    { key: 'LatchedPoints', label: 'Latched Points', field: 'LatchedPoints', headerStyle: { width: '15%', textAlign: 'center' }, rowStyle: { width: '15%', textAlign: 'center' } },
                    { key: 'UnreasonablePoints', label: 'Unreasonable Points', field: 'UnreasonablePoints', headerStyle: { width: '15%', textAlign: 'center' }, rowStyle: { width: '15%', textAlign: 'center' } },
                    { key: 'NoncongruentPoints', label: 'Noncongruent Points', field: 'NoncongruentPoints', headerStyle: { width: '15%', textAlign: 'center' }, rowStyle: { width: '15%', textAlign: 'center' } },
                    { key: 'DuplicatePoints', label: 'Duplicate Points', field: 'DuplicatePoints', headerStyle: { width: '15%', textAlign: 'center' }, rowStyle: { width: '15%', textAlign: 'center' } },
                    { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
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
                tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 425, width: '100%' }}
                rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                selected={() => false}
            />

        </div>
        <div className="card-footer">
        </div>

    </div>

}

export default DataQualityIssuesPage
