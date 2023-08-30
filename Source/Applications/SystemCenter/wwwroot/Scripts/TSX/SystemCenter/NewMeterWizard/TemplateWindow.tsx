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
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import { ConfigurableTable, Modal, ToolTip, Warning, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import PARParser from '../../../TS/PARParser';
import { TrashCan, CrossMark } from '@gpa-gemstone/gpa-symbols';
import ChannelScalingForm from '../Meter/ChannelScaling/ChannelScalingForm';
import { MeasurementCharacteristicSlice, MeasurmentTypeSlice, PhaseSlice, ChannelTemplateSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import Table from '@gpa-gemstone/react-table';
import { SystemCenter } from '../global';

declare var homePath: string;

interface IProps {
    Upload: (data: ArrayBuffer, name: string) => void,
    IsEngineer: boolean
}

const emptyTemplate = { ID: 0, Name: '', FileName: '', FileBlob: null };

export default function TemplateWindow(props: IProps) {
    const dispatch = useAppDispatch();
    const fileInput = React.useRef(null);

    const [show, setShow] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<boolean>(false);
    const [expand, setExpand] = React.useState<boolean>(false);
    const [template, setTemplate] = React.useState<SystemCenter.ChannelTemplateFile>({ ...emptyTemplate });

    const templates = useAppSelector(ChannelTemplateSlice.Data);
    const templateStatus = useAppSelector(ChannelTemplateSlice.Status);

    React.useEffect(() => {
        if (templateStatus == 'unintiated' || templateStatus == 'changed')
            dispatch(ChannelTemplateSlice.Fetch());
    }, [templateStatus]);

    React.useEffect(() => {
        $(fileInput.current).on("change", (evt: any) => {
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
        });

        return () => {
            $(".custom-file-input").off('change');
        }
    }, [show]);

    const showEdit = props.IsEngineer;
    const hasDefault = templates.length > 0;
    const showDropdown = (showEdit && hasDefault) || templates.length > 1;

    return <>
        <div className="btn-group btn-group-sm">
            <button className={"btn btn-primary" + ((hasDefault || showEdit)? "" : " disabled")}
                data-tooltip='DefaultChannel'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => {
                    if (!hasDefault && !showEdit )
                        return;
                    if (!hasDefault)
                        setShow(true);
                    else
                        props.Upload(new Uint8Array(templates[0].FileBlob.match(/../g).map(h => parseInt(h, 16))).buffer , templates[0].FileName);
                }}>
                {hasDefault? templates[0].Name : "Manage Templates" }
            </button>
            {showDropdown ? <>
                <button type="button"
                    className={"btn btn-primary dropdown-toggle dropdown-toggle-split"}
                    data-toggle="dropdown" onClick={() => { setExpand((x) => !x) } }>
                <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className={"dropdown-menu" + (expand? " show" : "")}>
                    {templates.map((t, i) => i > 0 ? <a className="dropdown-item" key={t.ID}
                        onClick={() => { setExpand(false); props.Upload(new Uint8Array(t.FileBlob.match(/../g).map(h => parseInt(h, 16))).buffer, t.FileName); } }>
                        {t.Name}
                    </a> : null)}
                    {showEdit ? <>
                        { templates.length > 1 ? <div className="dropdown-divider"></div> : null}
                        <a className="dropdown-item" onClick={() => { setShow(true); setExpand(false); }}>Manage Templates</a>
                    </> : null}
                </div>
            </> : null}
        </div>
        <ToolTip Show={hover && !hasDefault} Position={'top'} Theme={'dark'} Target={"DefaultChannel"}>
            <p>No template is available.</p>
            {!showEdit? <p> Contact an Administrator or SME to add a template.</p> : null}
        </ToolTip>
        <Modal ShowCancel={false} ShowX={true} Show={show} Title={'Manage Templates'}
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
            ConfirmText={'Add Template'}
        >
            <div className="row">
            <div className="col">
            <Table<SystemCenter.ChannelTemplateFile>
                cols={[
                    { key: 'Name', field: 'Name', label: 'Name', headerStyle: {}, rowStyle: {} },
                    { key: 'FileName', field: 'FileName', label: 'File', headerStyle: {}, rowStyle: {} },
                    {
                        key: 'Btn', label: '', headerStyle: { width: 40, paddingLeft: 0, paddingRight: 5 }, rowStyle: { width: 40, paddingLeft: 0, paddingRight: 5 },
                        content: (item) => <>
                            <button className="btn btn-sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(ChannelTemplateSlice.DBAction({ verb: 'DELETE', record: item }))
                                }}><span>{TrashCan}</span></button>
                        </>
                    },
                    { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 17, padding: 0 } },
                ]}
                tableClass="table table-hover"
                data={templates}
                sortKey={''}
                ascending={false}
                onSort={(d) => {}}
                onClick={() => {}}
                theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 450, width: '100%' }}
                rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                selected={() => false}
                    />
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
                        <input type="file" className="custom-file-input" ref={fileInput} />
                        <label className={"custom-file-label" + (template.FileName.length > 0 ? " selected" : "")} >
                            {template.FileName.length > 0 ? template.FileName : `Choose file to use as template`}
                        </label>
                    </div>
                </div>
            </div>

            </Modal>
            </>
}