//******************************************************************************************************
//  ByFile.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  06/27/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';

import { DefaultSearchField } from '../CommonComponents/SearchFields';
import { SearchBar, Search, Modal, LoadingIcon, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { useAppSelector, useAppDispatch } from '../hooks';
import { DataFileSlice } from '../Store/Store';
import { OpenXDA as GlobalXDA } from '../global';
import moment from 'moment';


declare var homePath: string;

const ByFile: Application.Types.iByComponent = (props) => {
    let dispatch = useAppDispatch();

    const cState = useAppSelector(DataFileSlice.SearchStatus);
    const data = useAppSelector(DataFileSlice.SearchResults);

    const [eState, setEState] = React.useState<Application.Types.Status>('idle');
    const [selectedID, setSelectetID] = React.useState<OpenXDA.Types.DataFile|null>(null);
    const [evts, setEvts] = React.useState<GlobalXDA.Event[]>([]);

    const [showWarning, setShowWarning] = React.useState<'hide' | 'complete' | 'error' | 'loading'>('hide');

    const [search, setSearch] = React.useState<Array<Search.IFilter<OpenXDA.Types.DataFile>>>([]);
    const filterableList: Search.IField<OpenXDA.Types.DataFile>[] = [
        { isPivotField: false, key: 'FilePath', label: 'File Path', type: 'string' },
        { isPivotField: false, key: 'CreationTime', label: 'File Created', type: 'datetime' },
        { isPivotField: false, key: 'DataStartTime', label: 'Data Start', type: 'datetime' }        
    ]

    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.DataFile>('DataStartTime');
    const [ascending, setAscending] = React.useState<boolean>(true);

    React.useEffect(() => {
        dispatch(DataFileSlice.DBSearch({ sortField: sortKey, ascending, filter: search }))
    }, [search, ascending, sortKey]);

    React.useEffect(() => {
        if (cState == 'unintiated' || cState == 'changed')
            dispatch(DataFileSlice.DBSearch({ sortField: sortKey, ascending, filter: search }))
    }, [cState, dispatch]);

    React.useEffect(() => {
        if (selectedID == null)
            return;
        const h = loadEvents(selectedID.ID);
        return () => { if (h !== null && h.abort != null) h.abort(); }
    }, [selectedID])

    function loadEvents(fileID: number) {
        if (fileID < 0)
            return null;

        setEState('loading');
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/DataFile/GetEvents/${fileID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).fail(() => setEState('error')).done((d) => { setEState('idle'); setEvts(d); });;
    }

    function reprocess(file: OpenXDA.Types.DataFile) {
       
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/DataFile/Reprocess/${selectedID.FileGroupID}` ,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).fail(() => setShowWarning('error')).done((d) => { setShowWarning('complete'); });;
    }

    function getFileName(file: OpenXDA.Types.DataFile) {
        if (file == null)
            return '';
        const path = file.FilePath.split('\\');
        return path[path.length - 1];
    }

    function getPath(file: OpenXDA.Types.DataFile) {
        if (file == null)
            return '';
        const path = file.FilePath.split('\\');
        return path.slice(0, path.length - 1).join('\\');
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <LoadingScreen Show={showWarning == 'loading'} />
            <SearchBar<OpenXDA.Types.DataFile> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={DefaultSearchField.DataFile as Search.IField<OpenXDA.Types.DataFile>} Width={'100%'} Label={'Search'}
                ShowLoading={cState == 'loading'} ResultNote={cState == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Data File(s)'}
                GetEnum={(setOptions, field) => {
                    let handle = null;
                   
                    if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
                        return () => { };

                    handle = $.ajax({
                        type: "GET",
                        url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: true,
                        async: true
                    });

                    handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
                    return () => { if (handle != null && handle.abort == null) handle.abort(); }
                }}

            >
                
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<OpenXDA.Types.DataFile>
                    cols={[
                        { key: 'Path', field: 'FilePath', label: 'File Path', headerStyle: { width: '70%' }, rowStyle: { width: '70%' }, content: (f) => f.FilePath.length > 100 ? f.FilePath.substr(f.FilePath.length - 100, 100) : f.FilePath },
                        { key: 'CreationTime', field: 'CreationTime', label: 'File Created', headerStyle: { width: '15%' }, rowStyle: { width: '15%' }, content: f => moment(f.CreationTime).format('MM/DD/YYYY HH:mm.ss.ssss') },
                        { key: 'DataStartTime', field: 'DataStartTime', label: 'Data Start', headerStyle: { width: '15%' }, rowStyle: { width: '15%' }, content: f => moment(f.DataStartTime).format('MM/DD/YYYY HH:mm.ss.ssss') },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === "Scroll")
                            return;

                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colField);
                        }
                    }}
                    onClick={(item) => setSelectetID(item.row)}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <Modal Show={selectedID != null} Title={'File Details'} CallBack={(c,b) => {
                if (c)
                    reprocess(selectedID);
                setSelectetID(null);
            }} ShowCancel={false} ShowX={true} ConfirmText={'Reprocess File'} >
                <div className="alert alert-primary" >
                    SystemCenter tracks processed files only. The information below was accurate when the file was processed by openXDA
                    and may not correspond to the file as currently stored on the fileShare.
                </div>
                <div className="row">
                    <div className="col">
                        <p><strong>Path</strong>: {getPath(selectedID)}</p>
                        <p><strong>Name</strong>: {getFileName(selectedID)}</p>
                        <p><strong>Size</strong>: {selectedID?.FileSize}</p>
                        <p><strong>Created</strong>: {selectedID?.CreationTime}</p>
                        <p><strong>Last Write</strong>: {selectedID?.LastWriteTime}</p>
                        <p><strong>Last Access</strong>: {selectedID?.LastAccessTime}</p>
                        <p><strong>Processed</strong>: {selectedID?.ProcessingEndTime}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <a href={`${homePath}api/OpenXDA/DataFile/Download/${(selectedID != null ? selectedID.ID : -1)}`} target="_blank" className="btn btn-info btn-block" role="button">
                            Get File
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {eState == 'loading' ? <LoadingIcon Show={true} /> : <Table<GlobalXDA.Event>
                            cols={[
                                { key: 'ID', field: 'ID', label: 'Event ID', headerStyle: { width: '20%' }, rowStyle: { width: '20%' }, content: (f) => f.ID },
                                { key: 'StartTime', field: 'StartTime', label: 'Event Start', headerStyle: { width: '40%' }, rowStyle: { width: '40%' }, content: (f) => moment(f.StartTime).format('MM/DD/YYYY hh:mm.ss.ssss') },
                                { key: 'EndTime', field: 'EndTime', label: 'Event End', headerStyle: { width: '40%' }, rowStyle: { width: '40%' }, content: f => moment(f.EndTime).format('hh:mm.ss.ssss') },
                                { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                            ]}
                            tableClass="table table-hover"
                            data={evts}
                            sortKey={'StartTime'}
                            ascending={true}
                            onSort={(d) => { }}
                            onClick={(item) => { }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 600, width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => false}
                        />}
                    </div>
                </div>
                
            </Modal>
            <Modal Show={showWarning == 'complete'} Size={'sm'} Title={'Started Reprocessing'} CallBack={(c) => setShowWarning('hide')} ShowCancel={false} ShowX={true} ConfirmText={'Close'}>
                openXDA has begun to reprocess this file. Note that this may take several minutes.
            </Modal>
            <Modal Show={showWarning == 'error'} Size={'sm'} Title={'Error Reprocessing'} CallBack={(c) => setShowWarning('hide')} ShowCancel={false} ShowX={true} ConfirmText={'Close'}>
                openXDA was unable to reprocess this file. If this error continues to occur please contact your system administrator.
            </Modal>
        </div>
    )
}

export default ByFile;

