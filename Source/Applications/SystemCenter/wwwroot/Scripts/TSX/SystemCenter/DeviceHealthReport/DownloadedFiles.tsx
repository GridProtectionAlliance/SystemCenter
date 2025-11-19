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
import { useAppDispatch, useAppSelector } from '../hooks';
import { DataFileSlice } from '../Store/Store';
import { Table, Column } from '@gpa-gemstone/react-table';
import moment from 'moment';

function DownloadedFiles(props: { MeterID: number, MeterName: string }) {
    const dispatch = useAppDispatch();
    const files = useAppSelector(DataFileSlice.Data);
    const status = useAppSelector(DataFileSlice.Status);
    const sortKey = useAppSelector(DataFileSlice.SortField);
    const ascending = useAppSelector(DataFileSlice.Ascending);
    const meterID = useAppSelector(DataFileSlice.ParentID);

    React.useEffect(() => {
        if (status == 'uninitiated' || status == 'changed' || meterID != props.MeterID)
            dispatch(DataFileSlice.Fetch(props.MeterID));
        return () => { }
    }, [dispatch, status, props.MeterID]);

    if (props.MeterID == undefined) return null;

    return (
        <div style={{ width: '100%', height: 'calc( 100% - 90px)' }}>
            <h3>Last 50 Downloaded Files for {props.MeterName}</h3>
            <Table<OpenXDA.Types.DataFile>
                TableClass="table table-hover"
                Data={files}
                SortKey={sortKey}
                Ascending={ascending}
                OnSort={(d) => {
                    dispatch(DataFileSlice.Sort({ SortField: d.colField, Ascending: d.ascending }));
                }}
                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 160, width: '100%' }}
                RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
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
                    Content={({ item, key }) => moment(item[key], "YYYY-MM-DDTHH:mm:ss.fffffff").format("MM/DD/YYYY HH:mm:ss")}
                > Date
                </Column>
                <Column<OpenXDA.Types.DataFile>
                    Key={'ProcessingEndTime'}
                    AllowSort={true}
                    Field={'ProcessingEndTime'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                    Content={({ item, key }) => moment(item[key], "YYYY-MM-DDTHH:mm:ss.fffffff").format("MM/DD/YYYY HH:mm:ss")}
                > Processed
                </Column>
                <Column<OpenXDA.Types.DataFile>
                    Key={'FileSize'}
                    AllowSort={true}
                    Field={'FileSize'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Size(kB)
                </Column>
            </Table>
        </div>

            )
}

export default DownloadedFiles;