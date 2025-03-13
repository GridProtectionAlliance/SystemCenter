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

import { OpenXDA } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global';
import * as React from 'react';
import { Table, Column } from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import moment from 'moment';
import { GenericController } from '@gpa-gemstone/react-interactive';

const MeterDataQualitySummaryController = new GenericController<SC.MeterDataQualitySummary>(`${homePath}api/OpenXDA/MeterDataQualitySummary`, "Date", false);

function DataQualityIssuesPage(props: { Meter: OpenXDA.Types.Meter }) {
    const [data, setData] = React.useState<SC.MeterDataQualitySummary[]>([]);
    const [sortField, setSortField] = React.useState<keyof SC.MeterDataQualitySummary>('Date');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const order = React.useCallback((data: SC.MeterDataQualitySummary[]) => {
        return _.orderBy(data, [sortField], [ascending ? 'asc' : 'desc'])
    }, [sortField, ascending]);

    React.useEffect(() => {
        const handle = MeterDataQualitySummaryController.PagedSearch([], undefined, undefined, 0, props.Meter.ID).done(result => {
            const data = JSON.parse(result.Data as unknown as string);
            setData(order(data));
        });

        return () => {
            if (handle.abort != undefined) handle.abort();
        }
    }, [props.Meter.ID]);

    React.useEffect(() => {
        if (data.length === 0) return;
        setData(order(data));
    }, [order]);

    return <div className="card" style={{ width: '100%', height: '100%' }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>Data Quality Daily Statistics:</h4>
                </div>
            </div>
        </div>
        <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
            <Table<SC.MeterDataQualitySummary>
                TableClass="table table-hover"
                Data={data}
                SortKey={sortField}
                Ascending={ascending}
                OnSort={(d) => {
                    if (d.colField == sortField) {
                        setAscending(!ascending);
                    }
                    else {
                        setAscending(true);
                        setSortField(d.colField);
                    }
                }}
                TableStyle={{
                    padding: 0, width: '100%', height: '100%',
                    tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                }}
                TheadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <Column<SC.MeterDataQualitySummary>
                    Key={'Date'}
                    AllowSort={true}
                    Field={'Date'}
                    HeaderStyle={{ width: 'auto', textAlign: 'left' }}
                    RowStyle={{ width: 'auto', textAlign: 'left' }}
                    Content={({ item, key }) => moment(item[key], "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY") }
                > Date
                </Column>
                <Column<SC.MeterDataQualitySummary>
                    Key={'ExpectedPoints'}
                    AllowSort={true}
                    Field={'ExpectedPoints'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                > Expected Points
                </Column>
                <Column<SC.MeterDataQualitySummary>
                    Key={'GoodPoints'}
                    AllowSort={true}
                    Field={'GoodPoints'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                > Good Points
                </Column>
                <Column<SC.MeterDataQualitySummary>
                    Key={'LatchedPoints'}
                    AllowSort={true}
                    Field={'LatchedPoints'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                > Latched Points
                </Column>
                <Column<SC.MeterDataQualitySummary>
                    Key={'UnreasonablePoints'}
                    AllowSort={true}
                    Field={'UnreasonablePoints'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                > Unreasonable Points
                </Column>
                <Column<SC.MeterDataQualitySummary>
                    Key={'NoncongruentPoints'}
                    AllowSort={true}
                    Field={'NoncongruentPoints'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                > Noncongruent Points
                </Column>
                <Column<SC.MeterDataQualitySummary>
                    Key={'DuplicatePoints'}
                    AllowSort={true}
                    Field={'DuplicatePoints'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                > Duplicate Points
                </Column>
            </Table>
        </div>
    </div>
}

export default DataQualityIssuesPage
