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
import { ReactTable } from '@gpa-gemstone/react-table';
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

    return <div className="card" style={{ width: '100%', height: '100%' }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>Data Quality Issues for { props.Meter?.Name} :</h4>
                </div>
            </div>
        </div>
        <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
            <ReactTable.Table<SC.MeterDataQualitySummary>
                TableClass="table table-hover"
                Data={data}
                SortKey={sortField}
                Ascending={ascending}
                OnSort={(d) => {
                    if (d.colField == sortField) {
                        setAscending(!ascending);
                    }
                    else {
                        setAscending(!ascending);
                        setSortField(d.colField);
                    }
                }}
                TableStyle={{
                    padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                    tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                }}
                TheadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <ReactTable.Column<SC.MeterDataQualitySummary>
                    Key={'Date'}
                    AllowSort={true}
                    Field={'Date'}
                    HeaderStyle={{ width: 'auto', textAlign: 'left' }}
                    RowStyle={{ width: 'auto', textAlign: 'left' }}
                    Content={({ item, key }) => moment(item[key], "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY") }
                > Date
                </ReactTable.Column>
                <ReactTable.Column<SC.MeterDataQualitySummary>
                    Key={'ExpectedPoints'}
                    AllowSort={true}
                    Field={'ExpectedPoints'}
                    HeaderStyle={{ width: '15%', textAlign: 'center' }}
                    RowStyle={{ width: '15%', textAlign: 'center' }}
                > Expected Points Succ
                </ReactTable.Column>
                <ReactTable.Column<SC.MeterDataQualitySummary>
                    Key={'GoodPoints'}
                    AllowSort={true}
                    Field={'GoodPoints'}
                    HeaderStyle={{ width: '15%', textAlign: 'center' }}
                    RowStyle={{ width: '15%', textAlign: 'center' }}
                > Good Points
                </ReactTable.Column>
                <ReactTable.Column<SC.MeterDataQualitySummary>
                    Key={'LatchedPoints'}
                    AllowSort={true}
                    Field={'LatchedPoints'}
                    HeaderStyle={{ width: '15%', textAlign: 'center' }}
                    RowStyle={{ width: '15%', textAlign: 'center' }}
                > Latched Points
                </ReactTable.Column>
                <ReactTable.Column<SC.MeterDataQualitySummary>
                    Key={'UnreasonablePoints'}
                    AllowSort={true}
                    Field={'UnreasonablePoints'}
                    HeaderStyle={{ width: '15%', textAlign: 'center' }}
                    RowStyle={{ width: '15%', textAlign: 'center' }}
                > Unreasonable Points
                </ReactTable.Column>
                <ReactTable.Column<SC.MeterDataQualitySummary>
                    Key={'NoncongruentPoints'}
                    AllowSort={true}
                    Field={'NoncongruentPoints'}
                    HeaderStyle={{ width: '15%', textAlign: 'center' }}
                    RowStyle={{ width: '15%', textAlign: 'center' }}
                > Noncongruent Points
                </ReactTable.Column>
                <ReactTable.Column<SC.MeterDataQualitySummary>
                    Key={'DuplicatePoints'}
                    AllowSort={true}
                    Field={'DuplicatePoints'}
                    HeaderStyle={{ width: '15%', textAlign: 'center' }}
                    RowStyle={{ width: '15%', textAlign: 'center' }}
                > Duplicate Points
                </ReactTable.Column>
            </ReactTable.Table>
        </div>
        <div className="card-footer">
        </div>

    </div>

}

export default DataQualityIssuesPage
