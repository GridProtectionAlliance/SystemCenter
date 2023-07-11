//******************************************************************************************************
//  Meter.tsx - Gbtc
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
import Table from '@gpa-gemstone/react-table';
import { useHistory } from 'react-router-dom';
declare var homePath: string;
declare var ace: any;

function ConfigurationHistory(props: { MeterConfigurationID: number, MeterKey: string }) {
    const history = useHistory();
    const [meterConfiguration, setMeterConfiguration] = React.useState<OpenXDA.Types.MeterConfiguration>(null);
    const [Tab, setTab] = React.useState<string>('configuration');
    const [filesProcessed, setFilesProcessed] = React.useState<Array<OpenXDA.Types.DataFile>>([]);
    const [changed, setChanged] = React.useState<boolean>(false);
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.DataFile>('CreationTime');
    const [ascending, setAscending] = React.useState<boolean>(true);
    React.useLayoutEffect(() => getData(), [props.MeterConfigurationID]);

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
            url: `${homePath}api/OpenXDA/MeterConfiguration/${props.MeterConfigurationID}/FilesProcessed`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((data: Array<OpenXDA.Types.DataFile>) => setFilesProcessed(data));
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
        }).done((data: OpenXDA.Types.MeterConfiguration) => history.push({ pathname: `${homePath}index.cshtml`, search: `?name=ConfigurationHistory&MeterKey=${props.MeterKey}&MeterConfigurationID=${data.ID}` }));
    }


    function initializeAce(record: OpenXDA.Types.MeterConfiguration) {
        let editor = ace.edit("template");
        editor.getSession().setMode("ace/mode/xml");
        editor.setFontSize("14px");
        editor.setValue(record.ConfigText);
        editor.clearSelection();
        editor.gotoLine(0);
        editor.session.off('change');
        editor.session.on('change', delta => {
            setChanged(record.ConfigText != editor.getValue())
        });
    }
    
    const Tabs = [
        { Id: "configuration", Label: "Configuration" },
        { Id: "filesProcessed", Label: "Files Processed" }
    ];
    
    if (meterConfiguration == null) return null;

    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{props.MeterKey} - Configuration Revision: {meterConfiguration.RevisionMajor + '.' + meterConfiguration.RevisionMinor}</h2>
                </div>
            </div>

            <hr />
            <TabSelector CurrentTab={Tab} SetTab={setTab} Tabs={Tabs} />

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (Tab == "configuration" ? " active" : "fade")} id="configuration">
                    <div id="template" style={{ height: window.innerHeight - 275 }} ></div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary pull-right" onClick={saveEdit} disabled={!changed}>Save Edit</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-danger pull-right" onClick={getData} disabled={!changed}>Reset</button>
                    </div>
                </div>

                <div className={"tab-pane " + (Tab == "filesProcessed" ? " active" : "fade")} id="filesProcessed">
                    <div style={{ width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' }}>
                        <Table<OpenXDA.Types.DataFile>
                            cols={[
                                { key: 'FilePath', field: 'FilePath', label: 'File Path', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'CreationTime', field: 'CreationTime', label: 'Creation Time', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                            ]}
                            tableClass="table table-hover"
                            data={filesProcessed}
                            sortKey={sortKey}
                            ascending={ascending}
                            onSort={(d) => {
                                if (d.colKey == sortKey)
                                    setAscending(!ascending);
                                else {
                                    setAscending(true);
                                    setSortKey(d.colKey as keyof OpenXDA.Types.DataFile);
                                }
                            }}
                            onClick={() => { }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 500, }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfigurationHistory;
