//******************************************************************************************************
//  DownloadedFiles.tsx - Gbtc
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
//  06/28/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************



import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { Table, Column } from '@gpa-gemstone/react-table';
import moment from 'moment';
import { GenericController } from '@gpa-gemstone/react-interactive';

const DataFileController = new GenericController<OpenXDA.Types.DataFile>(`${homePath}api/OpenXDA/DataFile`, "ProcessingEndTime", false);

function DownloadedFilesPage(props: { Meter: OpenXDA.Types.Meter }) {
    const [data, setData] = React.useState<OpenXDA.Types.DataFile[]>([]);
    const [sortField, setSortField] = React.useState<keyof OpenXDA.Types.DataFile>('ProcessingEndTime');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const order = React.useCallback((data: OpenXDA.Types.DataFile[]) => {
        return _.orderBy(data, [sortField], [ascending ? 'asc' : 'desc'])
    }, [sortField, ascending]);

    React.useEffect(() => {
        const handle = DataFileController.PagedSearch([], undefined, undefined, 0, props.Meter.ID).done(result => {
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

    if (props.Meter.ID == undefined) return null;

    return (
        <div className="card" style={{ width: '100%', height: '100%' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Last 50 Downloaded Files:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>      
                <Table<OpenXDA.Types.DataFile>
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
                    <Column<OpenXDA.Types.DataFile>
                        Key={'FilePath'}
                        AllowSort={true}
                        Field={'FilePath'}
                        HeaderStyle={{ width: '30%' }}
                        RowStyle={{ width: '30%' }}
                    > File
                    </Column>
                    <Column<OpenXDA.Types.DataFile>
                        Key={'DataStartTime'}
                        AllowSort={true}
                        Field={'DataStartTime'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                        Content={({ item, key }) => moment(item[key], "YYYY-MM-DDTHH:mm:ss.fffffff").format("MM/DD/YYYY HH:mm:ss") }
                    > Date
                    </Column>
                    <Column<OpenXDA.Types.DataFile>
                        Key={'ProcessingEndTime'}
                        AllowSort={true}
                        Field={'ProcessingEndTime'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                        Content={({ item, key }) => moment(item[key], "YYYY-MM-DDTHH:mm:ss.fffffff").format("MM/DD/YYYY HH:mm:ss") }
                    > Processed
                    </Column>
                    <Column<OpenXDA.Types.DataFile>
                        Key={'FileSize'}
                        AllowSort={true}
                        Field={'FileSize'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Size (kB)
                    </Column>
                </Table>
            </div>
        </div>
    )
}

export default DownloadedFilesPage;