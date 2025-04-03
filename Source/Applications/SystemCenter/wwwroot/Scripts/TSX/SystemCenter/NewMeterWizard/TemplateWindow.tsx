//******************************************************************************************************
//  TemplateWindow.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  08/29/2021 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import CFGParser from '../../../TS/CFGParser';
import { CheckBox, Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import { Modal, ToolTip, Warning, ServerErrorIcon, LoadingIcon } from '@gpa-gemstone/react-interactive';
import PARParser from '../../../TS/PARParser';
import { TrashCan, CrossMark } from '@gpa-gemstone/gpa-symbols';
import ChannelScalingForm from '../Meter/ChannelScaling/ChannelScalingForm';
import { MeasurementCharacteristicSlice, MeasurmentTypeSlice, PhaseSlice, ChannelTemplateSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Table, Column } from '@gpa-gemstone/react-table';
import { SystemCenter } from '../global';

declare var homePath: string;

interface IProps {
    Upload: (data: ArrayBuffer, name: string) => void,
    IsEngineer: boolean,
    TrendChannels: boolean
}

const emptyTemplate = { ID: 0, Name: '', FileName: '', FileBlob: null, ShowEvents: true, ShowTrend: true, SortOrder: 0 };

export default function TemplateWindow(props: IProps) {
    const dispatch = useAppDispatch();

    const [show, setShow] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<boolean>(false);
    const [expand, setExpand] = React.useState<boolean>(false);
    const [template, setTemplate] = React.useState<SystemCenter.ChannelTemplateFile>({ ...emptyTemplate });
    const [availTemplates, setAvailTemplates] = React.useState<SystemCenter.ChannelTemplateFile[]>([]);

    const templates = useAppSelector(ChannelTemplateSlice.Data);
    const templateStatus = useAppSelector(ChannelTemplateSlice.Status);
    const sortField = useAppSelector(ChannelTemplateSlice.SortField);
    const asc = useAppSelector(ChannelTemplateSlice.Ascending);

    React.useEffect(() => {
        if (templateStatus == 'unintiated' || templateStatus == 'changed')
            dispatch(ChannelTemplateSlice.Fetch());
    }, [templateStatus]);

    React.useEffect(() => {
        if (!show)
            dispatch(ChannelTemplateSlice.Sort({ SortField: 'SortOrder', Ascending: false }));
    }, [show])

    React.useEffect(() => {
        setAvailTemplates(templates.filter(item => (item.ShowTrend && props.TrendChannels) || (item.ShowEvents && !props.TrendChannels)))
    }, [templates, props.TrendChannels]);

    const loading = templateStatus == 'loading';
    function UploadFile(file: SystemCenter.ChannelTemplateFile) {
            const blob = file.FileBlob.substr(2).match(/../g).map(h => parseInt(h, 16));
            props.Upload(new Uint8Array(blob).buffer, file.FileName);
    }
    const showEdit = props.IsEngineer;
    const hasDefault = availTemplates.length > 0;
    const showDropdown = (showEdit && hasDefault) || availTemplates.length > 1;

    return <>
        <div className="btn-group btn-group-sm">
            <button className={"btn btn-info" + ((!loading && (hasDefault || showEdit))? "" : " disabled")}
                data-tooltip='DefaultChannel'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => {
                    if (loading || (!hasDefault && !showEdit ))
                        return;
                    if (!hasDefault)
                        setShow(true);
                    else
                        UploadFile(templates[0]);
                        
                }}>
                {loading ? <LoadingIcon Show={true} /> : 
                    (hasDefault ? availTemplates[0].Name : "Manage Templates" )
                }
            </button>
            {showDropdown ? <>
                <button type="button"
                    className={"btn btn-info dropdown-toggle dropdown-toggle-split"}
                    onClick={() => { setExpand((x) => !x) } }>
                <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className={"dropdown-menu" + (expand? " show" : "")}>
                    {availTemplates.map((t, i) => i > 0 ? <a className="dropdown-item" key={t.ID}
                        onClick={() => { setExpand(false); UploadFile(t); } }>
                        {t.Name}
                    </a> : null)}
                    {showEdit ? <>
                        {availTemplates.length > 1 ? <div className="dropdown-divider"></div> : null}
                        <a className="dropdown-item" onClick={() => { setShow(true); setExpand(false); }}>Manage Templates</a>
                    </> : null}
                </div>
            </> : null}
        </div>
        <ToolTip Show={hover && !hasDefault} Position={'top'} Target={"DefaultChannel"}>
            <p>No template is available.</p>
            {!showEdit? <p> Contact an Administrator or SME to add a Template.</p> : null}
        </ToolTip>
        <Modal ShowCancel={false} ShowX={true} Show={show} Title={'Manage Templates'} Size={'lg'}
            DisableConfirm={template.Name == null || template.Name.length == 0 || template.FileBlob == null || templates.find(t => t.Name == template.Name) != undefined}
            ConfirmShowToolTip={template.Name == null || template.Name.length == 0 || template.FileBlob == null || templates.find(t => t.Name == template.Name) != undefined}
            CallBack={(_, b) => {
                if (!b)
                    setShow(false);
                else 
                    dispatch(ChannelTemplateSlice.DBAction({ verb: 'POST', record: template }));
                setTemplate({ ...emptyTemplate });
            }}
            ConfirmToolTipContent={<>
                {template.Name == null || template.Name.length == 0 ? <p> {CrossMark} A Name is required.</p> : null}
                {template.Name != null && templates.find(t => t.Name == template.Name) != undefined ? <p> {CrossMark} A Template with this Name already exists.</p> : null}
                {template.FileBlob == null ? <p> {CrossMark} A File needs to be uploaded.</p> : null}
            </>}
            ConfirmText={'Save'}
        >
            <div className="row">
                <div className="col">
                    <Table<SystemCenter.ChannelTemplateFile>
                        TableClass="table table-hover"
                        Data={templates}
                        SortKey={sortField}
                        Ascending={asc}
                        OnSort={(d) => {
                            if (d.colKey == 'btn')
                                return;

                            if (d.colKey === sortField)
                                dispatch(ChannelTemplateSlice.Sort({ SortField: sortField, Ascending: asc }));
                            else {
                                dispatch(ChannelTemplateSlice.Sort({ SortField: d.colField as keyof SystemCenter.ChannelTemplateFile, Ascending: true }));
                            }
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 450, width: '100%' }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <Column<SystemCenter.ChannelTemplateFile>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                        > Name
                        </Column>
                        <Column<SystemCenter.ChannelTemplateFile>
                            Key={'FileName'}
                            AllowSort={true}
                            Field={'FileName'}
                        > File
                        </Column>
                        <Column<SystemCenter.ChannelTemplateFile>
                            Key={'ShowEvents'}
                            AllowSort={true}
                            Field={'ShowEvents'}
                            HeaderStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                            RowStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                            Content={({ item }) => <CheckBox<SystemCenter.ChannelTemplateFile> Field='ShowEvents' Record={item}
                                Setter={(r) => dispatch(ChannelTemplateSlice.DBAction({ verb: 'PATCH', record: r }))} Label='' /> }
                        > Events
                        </Column>
                        <Column<SystemCenter.ChannelTemplateFile>
                            Key={'ShowTrend'}
                            AllowSort={true}
                            Field={'ShowTrend'}
                            HeaderStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                            RowStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                            Content={({ item }) => <CheckBox<SystemCenter.ChannelTemplateFile> Field='ShowTrend' Record={item}
                                Setter={(r) => dispatch(ChannelTemplateSlice.DBAction({ verb: 'PATCH', record: r }))} Label='' /> }
                        > Trend
                        </Column>
                        <Column<SystemCenter.ChannelTemplateFile>
                            Key={'SortOrder'}
                            AllowSort={true}
                            Field={'SortOrder'}
                            Content={({ item }) => <Input<SystemCenter.ChannelTemplateFile> Field='SortOrder' Type={'integer'} Valid={() => true} Record={item}
                                Setter={(r) => dispatch(ChannelTemplateSlice.DBAction({ verb: 'PATCH', record: r }))} Label='' /> }
                        > Sort Order
                        </Column>
                        <Column<SystemCenter.ChannelTemplateFile>
                            Key={'btn'}
                            AllowSort={false}
                            HeaderStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                            RowStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                            Content={({ item }) => <>
                                <button className="btn btn-sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(ChannelTemplateSlice.DBAction({ verb: 'DELETE', record: item }))
                                    }}><span>{TrashCan}</span></button>
                            </> }
                        > <p></p>
                        </Column>
                    </Table>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Input<SystemCenter.ChannelTemplateFile>
                        Record={template} Field={'Name'} Label={'Name'}
                        Valid={() => template.Name != null && template.Name.length > 0 && templates.find(t => t.Name == template.Name) == undefined}
                        Setter={(r) => setTemplate(r)}
                    />
                </div>
                <div className="col-6">
                    <div className="custom-file">
                        <div className="form-group">
                            <label>File</label>
                            <input type="file" className="custom-file-input" onChange={(evt: any) => {
                                let fileName = (evt as React.ChangeEvent<HTMLInputElement>).target.value.split("\\").pop();
                                if (fileName == "")
                                    return;
                                let r = new FileReader();
                                r.onload = async (e) => {
                                    const contents = [...new Uint8Array(e.target.result as ArrayBuffer)]
                                        .map(b => b.toString(16).padStart(2, "0"))
                                        .join("");

                                    setTemplate((t) => ({ ...t, FileName: fileName, FileBlob: contents }));
                                }

                                r.readAsArrayBuffer(evt.target.files[0]);
                            }} />
                            <label className={"custom-file-label" + (template.FileName.length > 0 ? " selected" : "")} style={{top: '2rem'}}>
                                {template.FileName.length > 0 ? template.FileName : `Choose file to use as template.`}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            </Modal>
            </>
}