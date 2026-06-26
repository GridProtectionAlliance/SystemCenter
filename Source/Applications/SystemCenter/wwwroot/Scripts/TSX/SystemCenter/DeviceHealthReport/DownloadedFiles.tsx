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
import { Application } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA } from '../global';
import { Table, Column } from '@gpa-gemstone/react-table';
import moment from 'moment';
import { LoadingScreen, GenericController } from '@gpa-gemstone/react-interactive';

const DataFileController = new GenericController<LocalXDA.DataFileView>(`${homePath}api/OpenXDA/DataFile`, "LastProcessed", false);

function DownloadedFiles(props: { MeterID: number, MeterName: string }) {

    const [files, setFiles] = React.useState<LocalXDA.DataFileView[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('idle');

    React.useEffect(() => {
        if (props.MeterID == undefined)
            return;

        setStatus('loading')
        const handle = DataFileController.PagedSearch([], 'LastProcessed', false, 0, props.MeterID).done((result) => {
            setFiles(JSON.parse(result.Data.toString()));
            setStatus('idle');
        }).fail(() => setStatus('error'));
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [props.MeterID]);

    if (props.MeterID == undefined) return null;
    

    return (
        <div style={{ width: '100%', height: 'calc( 100% - 90px)' }}>
            <h3>Last 50 Processed Files for {props.MeterName}</h3>
            <LoadingScreen Show={status === 'loading'} />
            <Table<LocalXDA.DataFileView>
                TableClass="table table-hover"
                Data={files}
                SortKey={'LastProcessed'}
                Ascending={false}
                OnSort={(d) => { /* */}}
                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 160, width: '100%' }}
                RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <Column<LocalXDA.DataFileView>
                    Key={'FilePath'}
                    AllowSort={false}
                    Field={'FilePath'}
                    HeaderStyle={{ width: '30%' }}
                    RowStyle={{ width: '30%' }}
                > File
                </Column>
                <Column<LocalXDA.DataFileView>
                    Key={'DataStartTime'}
                    AllowSort={false}
                    Field={'DataStartTime'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                    Content={({ item, key }) => moment(item[key], "YYYY-MM-DDTHH:mm:ss.fffffff").format("MM/DD/YYYY HH:mm:ss")}
                > Date
                </Column>
                <Column<LocalXDA.DataFileView>
                    Key={'LastProcessed'}
                    AllowSort={false}
                    Field={'LastProcessed'}
                    HeaderStyle={{ width: '15%' }}
                    RowStyle={{ width: '15%' }}
                    Content={({ item, key }) => moment(item[key], "YYYY-MM-DDTHH:mm:ss.fffffff").format("MM/DD/YYYY HH:mm:ss")}
                > Last Processed
                </Column>
                <Column<LocalXDA.DataFileView>
                    Key={'FileSize'}
                    AllowSort={false}
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