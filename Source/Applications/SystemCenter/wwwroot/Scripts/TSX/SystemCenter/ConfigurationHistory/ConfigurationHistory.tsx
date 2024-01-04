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
import { ReactTable } from '@gpa-gemstone/react-table';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
import { ToolTip } from '@gpa-gemstone/react-interactive';

declare var homePath: string;
declare var ace: any;

function ConfigurationHistory(props: { MeterConfigurationID: number, MeterKey: string }) {
    const history = useHistory();
    const [meterConfiguration, setMeterConfiguration] = React.useState<OpenXDA.Types.MeterConfiguration>(null);
    const [Tab, setTab] = React.useState<string>('configuration');
    const [filesProcessed, setFilesProcessed] = React.useState<Array<OpenXDA.Types.DataFile>>([]);
    const [changed, setChanged] = React.useState<boolean>(false);
    const roles = useAppSelector(SelectRoles);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
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

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
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
                <div className="col">
                    <button className="btn btn-primary pull-right" onClick={() => history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + meterConfiguration.MeterID, state: {} })}>Meter Details</button>
                </div>
            </div>


            <hr />
            <TabSelector CurrentTab={Tab} SetTab={setTab} Tabs={Tabs} />

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                <div className={"tab-pane " + (Tab == "configuration" ? " active" : "fade")} id="configuration">
                    <div id="template" style={{ height: window.innerHeight - 275 }} ></div>
                    <div className="btn-group mr-2">
                        <button className={"btn btn-primary pull-right" + (!hasPermissions() ? ' disabled' : '')} onClick={saveEdit} disabled={!changed} data-tooltip='SaveEdits'
                            onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')}>Save Edit</button>
                    </div>
                    <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"SaveEdits"}>
                        <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                    </ToolTip>
                    <div className="btn-group mr-2">
                        <button className="btn btn-danger pull-right" onClick={getData} disabled={!changed}>Reset</button>
                    </div>
                </div>
                <div className={"tab-pane " + (Tab == "filesProcessed" ? " active" : "fade")} id="filesProcessed">
                    <div style={{ width: '100%', maxHeight: window.innerHeight - 275, padding: 30, overflowY: 'auto' }}>
                        <ReactTable.Table<OpenXDA.Types.DataFile>
                            TableClass="table table-hover"
                            Data={filesProcessed}
                            SortKey={'FilePath'}
                            Ascending={false}
                            OnSort={(d) => { }}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <ReactTable.Column
                                Key={'FilePath'}
                                AllowSort={false}
                                Field={'FilePath'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > File Path
                            </ReactTable.Column>
                            <ReactTable.Column
                                Key={'CreationTime'}
                                AllowSort={false}
                                Field={'CreationTime'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Creation Time
                            </ReactTable.Column>
                        </ReactTable.Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfigurationHistory;
