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
import { useDispatch, useSelector } from 'react-redux';
import { DataFileSlice } from '../Store/Store';
import Table from '@gpa-gemstone/react-table';
import moment from 'moment';

function DownloadedFilesPage(props: { Meter: OpenXDA.Types.Meter }) {
    const dispatch = useDispatch();
    const files = useSelector(DataFileSlice.Data);
    const status = useSelector(DataFileSlice.Status);
    const sortKey = useSelector(DataFileSlice.SortField);
    const ascending = useSelector(DataFileSlice.Ascending);
    const meterID = useSelector(DataFileSlice.ParentID);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || meterID != props.Meter.ID)
            dispatch(DataFileSlice.Fetch(props.Meter.ID));
        return () => { }
    }, [dispatch, status, props.Meter.ID]);

    if (props.Meter.ID == undefined) return null;

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Last 50 downloaded files for {props.Meter?.Name} :</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">      
                <Table<OpenXDA.Types.DataFile>
                    cols={[
                        { key: 'FilePath', field: 'FilePath', label: 'File', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        { key: 'DataStartTime', field: 'DataStartTime', label: 'Date', headerStyle: { width: '15%' }, rowStyle: { width: '15%' }, content: (item, key, style) => moment(item[key], "YYYY-MM-DDTHH:mm:ss.fffffff").format("MM/DD/YYYY HH:mm:ss") },
                        { key: 'ProcessingEndTime', field: 'ProcessingEndTime', label: 'Processed', headerStyle: { width: '15%' }, rowStyle: { width: '15%' }, content: (item, key, style) => moment(item[key], "YYYY-MM-DDTHH:mm:ss.fffffff").format("MM/DD/YYYY HH:mm:ss") },
                        { key: 'FileSize', field: 'FileSize', label: 'Size( kB)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },

                    ]}
                    tableClass="table table-hover"
                    data={files}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={({ colField, colKey, ascending }) => {
                        if (colKey === "Scroll")
                            return;
                        dispatch(DataFileSlice.Sort({ SortField: colField, Ascending: ascending }));
                    }}
                    onClick={() => { }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 425, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>
            <div className="card-footer">
            </div>

        </div>


    )
}

export default DownloadedFilesPage;