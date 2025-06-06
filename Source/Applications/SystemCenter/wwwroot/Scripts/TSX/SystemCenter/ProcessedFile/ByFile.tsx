﻿//******************************************************************************************************
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

import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { CreateGuid } from '@gpa-gemstone/helper-functions';
import { LoadingIcon, LoadingScreen, Modal, Search, SearchBar } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { Column, Paging, Table } from '@gpa-gemstone/react-table';
import moment from 'moment';
import * as React from 'react';
import RestrictionTooltip from '../CommonComponents/RestrictionTooltip';
import { DefaultSearchField } from '../CommonComponents/SearchFields';
import { OpenXDA as GlobalXDA } from '../global';
import { useAppDispatch, useAppSelector } from '../hooks';
import { DataFileSlice } from '../Store/Store';

const filterableList: Search.IField<OpenXDA.Types.DataFile>[] = [
    { isPivotField: false, key: 'FilePath', label: 'File Path', type: 'string' },
    { isPivotField: false, key: 'CreationTime', label: 'File Processed', type: 'datetime' },
    { isPivotField: false, key: 'DataStartTime', label: 'Data Start', type: 'datetime' },
    {
        isPivotField: false, key: 'ProcessingState', label: 'Status', type: 'enum', enum: [
            { Value: "0", Label: "Unknown" },
            { Value: "1", Label: "Queued" },
            { Value: "2", Label: "Processing" },
            { Value: "3", Label: "Processed" },
            { Value: "4", Label: "Failure" },
            { Value: "5", Label: "Warning" }
        ]
    }
];

declare var homePath: string;

const ByFile: Application.Types.iByComponent = (props) => {
    let dispatch = useAppDispatch();

    const [inEnterprise, setInEnterprise] = React.useState<boolean>(false);

    const cState = useAppSelector(DataFileSlice.PagedStatus);
    const data = useAppSelector(DataFileSlice.SearchResults);

    const allPages = useAppSelector(DataFileSlice.TotalPages);
    const currentPage = useAppSelector(DataFileSlice.CurrentPage);

    const [eState, setEState] = React.useState<Application.Types.Status>('idle');
    const [selectedID, setSelectetID] = React.useState<OpenXDA.Types.DataFile|null>(null);
    const [evts, setEvts] = React.useState<GlobalXDA.Event[]>([]);

    const [showWarning, setShowWarning] = React.useState<'hide' | 'complete' | 'error' | 'loading'>('hide');

    const [search, setSearch] = React.useState<Array<Search.IFilter<OpenXDA.Types.DataFile>>>([]);

    const [hover, setHover] = React.useState<'None' | 'Bulk'>('None');
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.DataFile>('DataStartTime');
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(currentPage);
    const totalRecords = useAppSelector(DataFileSlice.TotalRecords);
    const [update, setUpdate] = React.useState<boolean>(false);

    React.useEffect(() => {
        const h = setTimeout(() => {
            setUpdate((a) => !a);
        }, 60000);

        return () => {
            if (h !== null) clearTimeout(h);
        };
    }, [update]);

    React.useEffect(() => {
        dispatch(DataFileSlice.PagedSearch({ sortField: sortKey, ascending, filter: search, page }))
    }, [search, ascending, sortKey, page, update]);

    React.useEffect(() => {
        if (cState == 'unintiated' || cState == 'changed')
            dispatch(DataFileSlice.PagedSearch({ sortField: sortKey, ascending, filter: search }))
    }, [cState]);

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
        setShowWarning('loading')
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/DataFile/Reprocess/${selectedID.FileGroupID}` ,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).fail(() => setShowWarning('error')).done((d) => { setShowWarning('complete'); });;
    }

    function reprocessAll() {
        setShowWarning('loading')
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataFile/ReprocessMany`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(data.map(d => d.FileGroupID)),
            cache: false,
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
            <div className="container-fluid d-flex h-100 flex-column">
                <div className="row">
                    <SearchBar<OpenXDA.Types.DataFile> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={DefaultSearchField.DataFile as Search.IField<OpenXDA.Types.DataFile>} Width={'100%'} Label={'Search'} StorageID="DataFilesFilter"
                        ShowLoading={cState === 'loading'}
                        ResultNote={(cState === 'error') ? 'Could not complete Search' : ('Displaying  Data File(s) ' + (totalRecords > 0? (50 * page + 1): 0 ) + ' - ' + (50 * page + data.length)) + ' out of ' + totalRecords}
                        GetEnum={(setOptions, field) => {
                            if (field.enum != null)
                            setOptions(field.enum);
                            return () => { };
                        }}

                    >
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <div className="form-group">
                                        <button className={`btn btn-info btn-block${inEnterprise ? '' : ' disabled'}`} hidden={props.Roles.indexOf('Administrator') < 0}
                                            onMouseEnter={() => setHover('Bulk')} onMouseLeave={() => setHover('None')} data-tooltip={"BulkReload"}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                if (inEnterprise) reprocessAll();
                                            }}>Reprocess All {data.length}</button>
                                    </div>
                                    <RestrictionTooltip
                                        SetMeetsRequirements={setInEnterprise}
                                        EditionRequirement={'Enterprise'}
                                        FeatureName={'Bulk Reprocessing'}
                                        Target={'BulkReload'}
                                        Show={hover === 'Bulk'}
                                    />
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
                <Table<OpenXDA.Types.DataFile>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colField);
                        }
                    }}
                    OnClick={(item) => setSelectetID(item.row)}
                    TheadStyle={{ fontSize: 'smaller' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <Column<OpenXDA.Types.DataFile>
                        Key={'FilePath'}
                        AllowSort={true}
                        Field={'FilePath'}
                        HeaderStyle={{ width: '60%' }}
                        RowStyle={{ width: '60%' }}
                        Content={({ item }) => item.FilePath.length > 100 ? `...${item.FilePath.substr(item.FilePath.length - 100, 100)}` : item.FilePath}
                    > File Path
                    </Column>
                    <Column<OpenXDA.Types.DataFile>
                        Key={'CreationTime'}
                        AllowSort={true}
                        Field={'CreationTime'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                        Content={({ item }) => moment(item.CreationTime).format('MM/DD/YYYY HH:mm.ss.SSS')}
                    > File Processed
                    </Column>
                    <Column<OpenXDA.Types.DataFile>
                        Key={'DataStartTime'}
                        AllowSort={true}
                        Field={'DataStartTime'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                        Content={({ item }) => ((moment(item.DataStartTime).isValid()) ? moment(item.DataStartTime).format('MM/DD/YYYY HH:mm.ss.SSS') : 'N/A')}
                    > Data Start
                    </Column>
                    <Column<OpenXDA.Types.DataFile>
                        Key={'ProcessingState'}
                        AllowSort={true}
                        Field={'ProcessingState'}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                        Content={({ item }) => <ProcessingStatus Status={item.ProcessingState} FileGroupID={item.FileGroupID} />}
                    > Status
                    </Column>
                </Table>
                <div className="row">
                    <div className="col">
                        <Paging Current={page + 1} Total={allPages} SetPage={(p) => setPage(p - 1)} />
                    </div>
                </div>
            </div>

            <Modal Show={selectedID != null} Title={'File Details'} CallBack={(c,b) => {
                if (c)
                    reprocess(selectedID);
                setSelectetID(null);
            }} ShowCancel={false} ShowX={true} ConfirmText={'Reprocess File'} ConfirmBtnClass={'btn-info'} >
                <div className="alert alert-primary" >
                    System Center only tracks files that have already been processed by openXDA. The information below is based on configuration when the file was processed 
                    and may not correspond to the file as currently stored in the Watch Directory.
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
                            TableClass="table table-hover"
                            Data={evts}
                            SortKey={'StartTime'}
                            Ascending={true}
                            OnSort={(d) => { }}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 600, width: '100%' }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<GlobalXDA.Event>
                                Key={'ID'}
                                AllowSort={false}
                                Field={'ID'}
                                HeaderStyle={{ width: '20%' }}
                                RowStyle={{ width: '20%' }}
                            > Event ID
                            </Column>
                            <Column<GlobalXDA.Event>
                                Key={'StartTime'}
                                AllowSort={false}
                                Field={'StartTime'}
                                HeaderStyle={{ width: '40%' }}
                                RowStyle={{ width: '40%' }}
                                Content={({ item }) => moment(item.StartTime).format('MM/DD/YYYY hh:mm.ss.ssss')}
                            > Event Start
                            </Column>
                            <Column<GlobalXDA.Event>
                                Key={'EndTime'}
                                AllowSort={false}
                                Field={'EndTime'}
                                HeaderStyle={{ width: '40%' }}
                                RowStyle={{ width: '40%' }}
                                Content={({ item }) => moment(item.EndTime).format('hh:mm.ss.ssss')}
                            > Event End
                            </Column>
                        </Table>}
                    </div>
                </div>
                
            </Modal>
            <Modal Show={showWarning == 'complete'} Size={'sm'} Title={'Started Reprocessing'} CallBack={(c) => setShowWarning('hide')} ShowCancel={false} ShowX={true} ConfirmText={'Close'}>
                openXDA has begun to reprocess the selected file(s). Note that this may take several minutes.
            </Modal>
            <Modal Show={showWarning == 'error'} Size={'sm'} Title={'Error Reprocessing'} CallBack={(c) => setShowWarning('hide')} ShowCancel={false} ShowX={true} ConfirmText={'Close'} ConfirmBtnClass={'btn-danger'}>
                openXDA was unable to reprocess the selected file(s). If this error continues to occur please contact your system administrator.
            </Modal>
        </div>
    )
}

interface IStatusProps {
    Status: number;
    FileGroupID: number;
}

const ProcessingStatus = (props: IStatusProps) => {
    const [message, setMessage] = React.useState<string | undefined>(undefined);
    const [hover, setHover] = React.useState<boolean>(false);
    const [guid, _setGuid] = React.useState<string>(CreateGuid());

    React.useEffect(() => {
        switch (props.Status) {
            case 5:
                setMessage("Click to see issues.");
                break;
            default:
                setMessage(undefined);
        }
    }, [props.Status]);

    const onClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (props.Status === 5)
            window.location.href = `${homePath}index.cshtml?name=DataOperationsFailures&FileGroupID=${props.FileGroupID}`;
    }, [props.Status, props.FileGroupID]);

    const visual = React.useMemo(() => {
        if (props.Status == 0) //Added - Unknown
            return "badge-light";
        if (props.Status == 1) //Queued
            return "badge-info";
        if (props.Status == 2) // Processing
            return "badge-primary";
        if (props.Status == 3) // Processed
            return "badge-success";
        if (props.Status == 4) // Error
            return "badge-danger";
        if (props.Status == 5) // Partial Success
            return "badge-warning";
        return "badge-warning";
    }, [props.Status]);

    const text = React.useMemo(() => {
        if (props.Status == 0) //Added - Unknown
            return "Unknown";
        if (props.Status == 1) //Queued
            return "Queued";
        if (props.Status == 2) // Processing
            return "Processing";
        if (props.Status == 3) // Processed
            return "Processed";
        if (props.Status == 4) // Error
            return "Failure";
        if (props.Status == 5) // Partial Success
            return "Warning";
        return "Unknwown";
    }, [props.Status]);

    const Symbol = React.useMemo(() => {
        if (props.Status == 0) //Added - Unknown
            return <ReactIcons.Warning Size={15} />;
        if (props.Status == 1) //Queued
            return <ReactIcons.Document Size={15} />;
        if (props.Status == 2) // Processing
            return <ReactIcons.SpiningIcon Size={15} />;
        if (props.Status == 3) // Processed
            return <ReactIcons.CircleCheckMark Size={15} />
        if (props.Status == 4) // Error
            return <ReactIcons.CircledX Size={15} />;
        if (props.Status == 5) // Partial Success
            return <ReactIcons.Alert Size={15} />;
        return <ReactIcons.Warning Size={15} />;
    }, [props.Status]);

    return (
        <>
            <span
                className={`"badge badge-pill ${visual}`}
                data-tooltip={guid}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={onClick}
            >
                {Symbol}  {text}
            </span>
            {
                message === undefined ? null :
                    <ToolTip Show={hover} Target={guid} Position={'top'}>
                        {message}
                    </ToolTip>
            }
        </>
    );
}

export default ByFile;

