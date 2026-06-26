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

import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { LoadingIcon, LoadingScreen, Modal, Search, SearchBar, Warning, GenericController } from '@gpa-gemstone/react-interactive';
import { Column, Paging, Table } from '@gpa-gemstone/react-table';
import moment from 'moment';
import * as React from 'react';
import EditionRestrictionTooltip from '../CommonComponents/Restrictions/EditionRestrictionTooltip';
import { DefaultSearchField } from '../CommonComponents/SearchFields';
import { OpenXDA as GlobalXDA } from '../global';
import EditionLockModal from '../CommonComponents/Restrictions/EditionLockModal';
import ProcessingStatus from '../CommonComponents/ProcessingStatus'

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

interface IWarningModalInfo {
    Message?: string,
    Title?: string,
    State: "show" | "loading" | "idle"
}

declare var homePath: string;

const DataFileController = new GenericController<GlobalXDA.DataFileView>(`${homePath}api/OpenXDA/DataFile`, "DataStartTime", false);

const ByFile: Application.Types.iByComponent = (props) => {

    const [inEnterprise, setInEnterprise] = React.useState<boolean>(false);

    const [data, setData] = React.useState<GlobalXDA.DataFileView[]>([]);
    const [ascending, setAscending] = React.useState<boolean>(false);
    const [sortKey, setSortKey] = React.useState<keyof GlobalXDA.DataFileView>('DataStartTime');
    const [filters, setFilters] = React.useState<Search.IFilter<GlobalXDA.DataFileView>[]>([]);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [page, setPage] = React.useState<number>(0);
    const [pageStatus, setPageStatus] = React.useState<Application.Types.Status>('idle');


    const [eState, setEState] = React.useState<Application.Types.Status>('idle');
    const [selectedID, setSelectetID] = React.useState<GlobalXDA.DataFileView | null>(null);
    const [evts, setEvts] = React.useState<GlobalXDA.Event[]>([]);

    const [warningModal, setWarningModal] = React.useState<IWarningModalInfo>({ State: "idle" });


    const [hover, setHover] = React.useState<null | string>(null);
    
    const [update, setUpdate] = React.useState<boolean>(false);

    const [showEdition, setShowEdition] = React.useState<boolean>(false);

    React.useEffect(() => {
        const h = setTimeout(() => {
            setUpdate((a) => !a);
        }, 60000);

        return () => {
            if (h !== null) clearTimeout(h);
        };
    }, [update]);

    React.useEffect(() => {
        setPageStatus('loading')
        const handle = DataFileController.PagedSearch(filters, sortKey, ascending, page).done((result) => {
            setData(JSON.parse(result.Data.toString()));
            setPageInfo({
                RecordsPerPage: result.RecordsPerPage,
                NumberOfPages: result.NumberOfPages,
                TotalRecords: result.TotalRecords
            })
            setPageStatus('idle');
        }).fail(() => setPageStatus('error'));
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }

    }, [filters, ascending, sortKey, page, update]);


    React.useEffect(() => {
        if (selectedID == null)
            return;
        const h = loadEvents(selectedID.ID);
        return () => { if (h !== null && h.abort != null) h.abort(); }
    }, [selectedID]);

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
        }).fail(() => setEState('error')).done((d) => { setEState('idle'); setEvts(d); });
    }

    function reprocess() {
        setWarningModal({ State: "loading" });
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/DataFile/Reprocess/${selectedID.FileGroupID}` ,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).fail(() =>
            setWarningModal({
                Message: 'openXDA was unable to reprocess the selected file(s). If this error continues to occur please contact your system administrator.',
                Title: "Error Reprocessing",
                State: "show"
            })
        ).done(() =>
            setWarningModal({
                Message: 'openXDA has begun to reprocess the selected file(s). Note that this may take several minutes.',
                Title: "Started Reprocessing",
                State: "show"
            })
        );
    }

    function reprocessAll() {
        setWarningModal({ State: "loading" });
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/DataFile/ReprocessMany`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(data.map(d => d.FileGroupID)),
            cache: false,
            async: true
        }).fail(() =>
            setWarningModal({
                Message: 'openXDA was unable to reprocess the selected file(s). If this error continues to occur please contact your system administrator.',
                Title: "Error Reprocessing",
                State: "show"
            })
        ).done(() =>
            setWarningModal({
                Message: 'openXDA has begun to reprocess the selected file(s). Note that this may take several minutes.',
                Title: "Started Reprocessing",
                State: "show"
            })
        );
    }

    function getFileName(file: GlobalXDA.DataFileView) {
        if (file == null)
            return '';
        const path = file.FilePath.split('\\');
        return path[path.length - 1];
    }

    function getPath(file: GlobalXDA.DataFileView) {
        if (file == null)
            return '';
        const path = file.FilePath.split('\\');
        return path.slice(0, path.length - 1).join('\\');
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <LoadingScreen Show={warningModal.State === 'loading'} />
            <div className="container-fluid d-flex h-100 flex-column">
                <div className="row">
                    <SearchBar<GlobalXDA.DataFileView> CollumnList={filterableList} SetFilter={setFilters} Direction={'left'} defaultCollumn={DefaultSearchField.DataFile as Search.IField<OpenXDA.Types.DataFile>} Width={'100%'} Label={'Search'} StorageID="DataFilesFilter"
                        ShowLoading={pageStatus === 'loading'}
                        ResultNote={(pageStatus === 'error') ? 'Could not complete Search' : ('Displaying  Data File(s) ' + (pageInfo.TotalRecords > 0 ? (pageInfo.RecordsPerPage * page + 1) : 0) + ' - ' + (pageInfo.RecordsPerPage * page + data.length)) + ' out of ' + pageInfo.TotalRecords}
                        GetEnum={(setOptions, field) => {
                            if (field.enum != null)
                            setOptions(field.enum);
                            return () => { };
                        }}
                    >
                        <EditionRestrictionTooltip
                            SetMeetsRequirements={setInEnterprise}
                            EditionRequirement={'Enterprise'}
                            FeatureName={'Advanced File Watch Action'}
                            Target={hover}
                            Show={hover != null}
                        />
                        <EditionLockModal
                            SetShow={setShowEdition}
                            Show={showEdition}
                            EditionRequirement={'Enterprise'}
                        />
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <div className="form-group">
                                        <button className={`btn btn-info btn-block${inEnterprise ? '' : ' disabled'}`} hidden={props.Roles.indexOf('Administrator') < 0}
                                            onMouseEnter={() => setHover('Bulk')} onMouseLeave={() => setHover(null)} data-tooltip={"Bulk"}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                if (inEnterprise) reprocessAll();
                                                else setShowEdition(true);
                                            }}>Reprocess All {data.length}</button>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Scan:</legend>
                                <form>
                                    <div className="form-group">
                                        <button className={`btn btn-info btn-block${inEnterprise ? '' : ' disabled'}`} hidden={props.Roles.indexOf('Administrator') < 0}
                                            onMouseEnter={() => setHover('ScanUnprocessed')} onMouseLeave={() => setHover(null)} data-tooltip={"ScanUnprocessed"}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                if (inEnterprise) {
                                                    setWarningModal({ State: "loading" });
                                                    $.ajax({
                                                        type: "POST",
                                                        url: `${homePath}api/OpenXDA/DataFile/Enumerate`,
                                                        contentType: "application/json; charset=utf-8",
                                                        dataType: 'json',
                                                        cache: false,
                                                        async: true
                                                    }).fail(() =>
                                                        setWarningModal({
                                                            Message: 'openXDA File Watcher was unable to begin scanning. If this error continues to occur please contact your system administrator.',
                                                            Title: "Error Scanning",
                                                            State: "show"
                                                        })
                                                    ).done(() =>
                                                        setWarningModal({
                                                            Message: 'openXDA File Watcher has begun enumerating files contained in the Watch directorie(s). Note that this may take several minutes.',
                                                            Title: "Started Scanning",
                                                            State: "show"
                                                        })
                                                    );
                                                }
                                                else setShowEdition(true);
                                            }}>Scan Unprocessed Files</button>
                                    </div>
                                    <div className="form-group">
                                        <button className={`btn btn-info btn-block${inEnterprise ? '' : ' disabled'}`} hidden={props.Roles.indexOf('Administrator') < 0}
                                            onMouseEnter={() => setHover('ScanAll')} onMouseLeave={() => setHover(null)} data-tooltip={"ScanAll"}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                if (inEnterprise) {
                                                    setWarningModal({ State: "loading" });
                                                    $.ajax({
                                                        type: "POST",
                                                        url: `${homePath}api/OpenXDA/DataFile/FlushAndEnumerate`,
                                                        contentType: "application/json; charset=utf-8",
                                                        dataType: 'json',
                                                        cache: false,
                                                        async: true
                                                    }).fail(() =>
                                                        setWarningModal({
                                                            Message: 'openXDA File Watcher was unable to begin scanning. If this error continues to occur please contact your system administrator.',
                                                            Title: "Error Scanning",
                                                            State: "show"
                                                        })
                                                    ).done(() =>
                                                        setWarningModal({
                                                            Message: 'openXDA File Watcher has begun enumerating files contained in the Watch directorie(s). Note that this may take several minutes.',
                                                            Title: "Started Scanning",
                                                            State: "show"
                                                        })
                                                    );
                                                }
                                                else setShowEdition(true);
                                            }}>Scan All Files</button>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                    </SearchBar>
                </div>
                <Table<GlobalXDA.DataFileView>
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
                    <Column<GlobalXDA.DataFileView>
                        Key={'FilePath'}
                        AllowSort={true}
                        Field={'FilePath'}
                        HeaderStyle={{ width: '50%' }}
                        RowStyle={{ width: '50%' }}
                        Content={({ item }) => item.FilePath.length > 100 ? `...${item.FilePath.substr(item.FilePath.length - 100, 100)}` : item.FilePath}
                    > File Path
                    </Column>
                    <Column<GlobalXDA.DataFileView>
                        Key={'CreationTime'}
                        AllowSort={true}
                        Field={'CreationTime'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                        Content={({ item }) => moment(item.CreationTime).format('MM/DD/YYYY HH:mm.ss.SSS')}
                    > File Created
                    </Column>
                    <Column<GlobalXDA.DataFileView>
                        Key={'DataStartTime'}
                        AllowSort={true}
                        Field={'DataStartTime'}
                        HeaderStyle={{ width: '15%' }}
                        RowStyle={{ width: '15%' }}
                        Content={({ item }) => ((moment(item.DataStartTime).isValid()) ? moment(item.DataStartTime).format('MM/DD/YYYY HH:mm.ss.SSS') : 'N/A')}
                    > Data Start
                    </Column>
                    <Column<GlobalXDA.DataFileView>
                        Key={'NumberOfTimesProcessed'}
                        AllowSort={true}
                        Field={'NumberOfTimesProcessed'}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                    > Number of Times Processed
                    </Column>

                    <Column<GlobalXDA.DataFileView>
                        Key={'ProcessingState'}
                        AllowSort={true}
                        Field={'ProcessingState'}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                        Content={({ item }) => <ProcessingStatus Status={item.ProcessingState} DataFileID={item.ID} Interactive={true} />}
                    > Status
                    </Column>
                </Table>
                <div className="row">
                    <div className="col">
                        <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                    </div>
                </div>
            </div>

            <Modal Show={selectedID != null} Title={'File Details'} CallBack={(c,b) => {
                if (c)
                    reprocess();
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
                        <p><strong>Number of Times Processed</strong>: {selectedID?.NumberOfTimesProcessed}</p>
                        <p><strong>Created</strong>: {selectedID?.CreationTime}</p>
                        <p><strong>Last Write</strong>: {selectedID?.LastWriteTime}</p>
                        <p><strong>Last Access</strong>: {selectedID?.LastAccessTime}</p>
                        <p><strong>Last Processed</strong>: {selectedID?.LastProcessed}</p>
                        <p><strong>Last Processed Complete</strong>: {selectedID?.LastProcessedComplete}</p>
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
            <Warning
                Show={warningModal.State === "show"}
                Title={'Started Reprocessing'}
                CallBack={() => setWarningModal({State: "idle"})}
                ShowCancel={false}
                Message={warningModal.Message}
            />
        </div>
    )
}

export default ByFile;

