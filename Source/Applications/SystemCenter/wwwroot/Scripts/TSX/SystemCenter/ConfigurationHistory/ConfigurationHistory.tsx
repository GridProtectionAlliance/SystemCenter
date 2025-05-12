//******************************************************************************************************
//  ConfigurationHistory.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  08/27/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { TabSelector } from '@gpa-gemstone/react-interactive';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
import { ServerErrorIcon, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { ToolTip } from '@gpa-gemstone/react-forms';

declare var homePath: string;
declare var ace: any;
const PagingID = 'ConfigHistPage'

function ConfigurationHistory(props: { MeterConfigurationID: number, MeterKey: string }) {
    const navigate = useNavigate();
    const aceRef = React.useRef<HTMLDivElement>(null)

    const [sortField, setSortField] = React.useState<string>('CreationTime');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const [meterConfiguration, setMeterConfiguration] = React.useState<OpenXDA.Types.MeterConfiguration>(null);
    const [tab, setTab] = React.useState<string>('configuration');
    const [filesProcessed, setFilesProcessed] = React.useState<Array<OpenXDA.Types.DataFile>>([]);
    const [changed, setChanged] = React.useState<boolean>(false);
    const roles = useAppSelector(SelectRoles);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');

    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');

    const [height, setHeight] = React.useState<number>(0);

        React.useEffect(() => {
        let storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
        if (storedInfo == null || storedInfo == 0) return; // page 0 means it's on a real page
        if (storedInfo + 1 > pageInfo.NumberOfPages) {
            storedInfo = Math.max(0, pageInfo.NumberOfPages - 1);
            localStorage.setItem(PagingID, `${storedInfo}`);
        }
        setPage(storedInfo);
    }, [pageInfo.TotalRecords]); // Make sure user is still on a real page when data is deleted or filtered out

    React.useLayoutEffect(() => {
        if (aceRef.current == null)
            return;
        setHeight(aceRef.current.offsetHeight)
    })

    React.useEffect(() => {
        getData();
    }, [props.MeterConfigurationID, tab, page])

    React.useEffect(() => {
        const ordered = _.orderBy(filesProcessed, [sortField], [(ascending ? "asc" : "desc")]);
        setFilesProcessed(ordered);
    }, [sortField, ascending])

    function getData() {
        getFilesProcessed();
        getMeterConfiguration();
    }

    function getMeterConfiguration(): void {
       $.ajax({
            type: "GET",
           url: `${homePath}api/OpenXDA/MeterConfiguration/One/${props.MeterConfigurationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
       }).done((record) => {
           setMeterConfiguration(record)
           initializeAce(record);

       });
    }

    function getFilesProcessed(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/MeterConfiguration/${props.MeterConfigurationID}/FilesProcessed/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((result) => {
            const records = JSON.parse(result.Records);
            const orderedRecords = _.orderBy(records, [sortField], [(ascending ? "asc" : "desc")])
            setFilesProcessed(orderedRecords)
            setPageInfo(result);
            setPageState('idle');
        }).fail(() => setPageState('error'));
    }

    function saveEdit(): void {
        let newRecord: OpenXDA.Types.MeterConfiguration = _.clone(meterConfiguration);
        newRecord.ID = 0;
        newRecord.ConfigText = ace.edit('template').getValue();
        newRecord.DiffID = null;
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/MeterConfiguration/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newRecord),
            cache: false,
            async: true
        }).done((data: OpenXDA.Types.MeterConfiguration) =>
            navigate(`${homePath}index.cshtml?name=ConfigurationHistory&MeterKey=${props.MeterKey}&MeterConfigurationID=${data.ID}`)
        );
    }


    function initializeAce(record: OpenXDA.Types.MeterConfiguration) {
        let editor = ace.edit("template");
        editor.getSession().setMode("ace/mode/xml");
        editor.setFontSize("14px");
        editor.setPrintMarginColumn(false);
        editor.setValue(record.ConfigText);
        editor.clearSelection();
        editor.gotoLine(0);
        editor.session.off('change');
        editor.session.on('change', delta => {
            setChanged(record.ConfigText != editor.getValue())
        });

    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }
    
    const Tabs = [
        { Id: "configuration", Label: "Configuration" },
        { Id: "filesProcessed", Label: "Files Processed" }
    ];
    
    if (meterConfiguration == null) return null;

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row">
                <div className="col-8 align-self-center">
                    <h2>{props.MeterKey} - Configuration Revision: {meterConfiguration.RevisionMajor + '.' + meterConfiguration.RevisionMinor}</h2>
                </div>
                <div className="col-4 align-self-center">
                    <button className="btn btn-secondary pull-right" onClick={() =>
                        navigate(`${homePath}index.cshtml?name=Meter&MeterID=${meterConfiguration.MeterID}`)
                    }>Meter Details</button>
                </div>
            </div>

            <div className="row">
                <TabSelector CurrentTab={tab} SetTab={setTab} Tabs={Tabs} />
            </div>

            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="col-12  d-flex flex-column" style={{height: "100%" }}>
                {tab == "configuration" ?
                        <>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" ref={aceRef} style={{ height: '100%' }}>
                                        {/*Have to keep window.innerHeight here because ace won't auto-adjust the height of the div when generated */}
                                        <div id="template" style={{ height: height}}></div>
                                    </div>
                                </div>
                            <div className="row" style={{marginBottom: 5}}>
                                    <div className="col-12" style={{ paddingTop: 10 }}>
                                        <div className="btn-group mr-2">
                                            <button className={"btn btn-primary pull-right" + (!hasPermissions() ? ' disabled' : '')} onClick={saveEdit} disabled={!changed} data-tooltip='SaveEdits'
                                                onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')}>Save Changes</button>
                                        </div>
                                        <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"SaveEdits"}>
                                            <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                                        </ToolTip>
                                        <div className="btn-group mr-2">
                                            <button className="btn btn-warning pull-right" onClick={getData} disabled={!changed}>Clear Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        : null}
                        {tab == "filesProcessed" ?
                            <div className="tab-pane active" style={{ height: '100%',display: 'flex', flexDirection: 'column' }}>
                                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                    <div className='col-12' style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                                        <Table<OpenXDA.Types.DataFile>
                                            TableClass="table table-hover"
                                            Data={filesProcessed}
                                            SortKey={sortField}
                                            Ascending={ascending}
                                            OnSort={(d) => {
                                                if (d.colKey == sortField)
                                                    setAscending(!ascending)
                                                else {
                                                    setSortField(d.colKey);
                                                    setAscending(true);
                                                }
                                            }}
                                            Selected={(item) => false}
                                            KeySelector={(item) => item.ID}
                                        >
                                            <Column
                                                Key={'FilePath'}
                                                AllowSort={true}
                                                Field={'FilePath'}
                                                HeaderStyle={{ width: 'auto' }}
                                                RowStyle={{ width: 'auto' }}
                                            > File Path
                                            </Column>
                                            <Column
                                                Key={'CreationTime'}
                                                AllowSort={true}
                                                Field={'CreationTime'}
                                                HeaderStyle={{ width: 'auto' }}
                                                RowStyle={{ width: 'auto' }}
                                            > Creation Time
                                            </Column>
                                        </Table>
                                        <LoadingScreen Show={pageState == 'loading'} />
                                        <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                                        <div className="row">
                                            <div className="col">
                                                <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : null}
                </div>
            </div>
        </div>
    )
}

export default ConfigurationHistory;
