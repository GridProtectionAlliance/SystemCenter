//******************************************************************************************************
//  CategoryForm.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  03/15/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings'
import { Select, TextArea, CheckBox } from '@gpa-gemstone/react-forms';
import { OpenXDA as LocalXDA } from '../global';

declare var homePath: string;

interface IProps {
    Widget: LocalXDA.IWidget,
    stateSetter: (tab: LocalXDA.IWidget) => void,
    setErrors?: (e: string[]) => void,
    allowTypeChange: boolean
}


export default function WidgetForm(props: IProps) {
    const [errors, setErrors] = React.useState<string[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');
    const [options, setOptions] = React.useState<LocalXDA.IWidget[]>([]);

    React.useEffect(() => {
        setStatus('loading')
        const handle = getAll();
        return () => { if (handle.abort != undefined) handle.abort(); }
    }, [])

    React.useEffect(() => {
        if (status != 'changed')
            return;
        setStatus('loading')
        const handle = getAll();
        return () => { if (handle.abort != undefined) handle.abort(); }
    }, [status])
    
    React.useEffect(() => {
        let e = [];
        if (props.Widget.Setting == null || props.Widget.Setting.length == 0 || !isJson(props.Widget.Setting))
            e.push('Settings are required. These need to be in a valid json format (e.g. {})')
        setErrors(e);
    }, [props.Widget])

    React.useEffect(() => {
        if (props.setErrors != undefined)
            props.setErrors(errors);
    }, [props.setErrors, errors])

    React.useEffect(() => {
        if (props.Widget.ID > 0)
            return;
        if (options.length == 0)
            return;
        props.stateSetter({ ...options[0], CategoryID: props.Widget.CategoryID });

    }, [props.Widget.ID, options])
    function getAll() {
        return $.ajax({
            type: 'GET',
            url: `${homePath}api/SystemCenter/WidgetView/All`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).done((d) => { setStatus('idle'); setOptions(d); }, () => setStatus('error'));
    }

    function isJson(text: string) {
        try { JSON.parse(text); } catch { return false; }
        return true;
    }


    function valid(field: keyof (LocalXDA.IWidget)): boolean {
        if (field == 'Setting')
            return props.Widget.Setting != null && props.Widget.Setting.length > 0 && isJson(props.Widget.Setting);
        return true;
    }

    return (
        <div className="col">
            <Select<LocalXDA.IWidget> Record={props.Widget} Field={'ID'}
                Label='Widget'
                Setter={(record) => {
                    if (props.Widget.ID == record.ID)
                        return;
                    props.stateSetter({ ...options.find((w) => w.ID == record.ID), CategoryID: props.Widget.CategoryID });
                }}
                Options={options.map(o => ({ Value: o.ID.toString(), Label: o.Name }))} Disabled={!props.allowTypeChange} />
            <div className="alert alert-primary">
                Any changes to Setting or Enabled will apply to all {props.Widget.Name} Widgets including those in other Tabs.
            </div>
            <TextArea<LocalXDA.IWidget>
                Rows={10} Record={props.Widget} Field={'Setting'}
                Feedback={'Settings are required. These need to be in a valid json format (e.g. {})'}
                Valid={valid} Setter={(record) => props.stateSetter(record)} />
            <CheckBox Record={props.Widget} Field={'Enabled'} Setter={(record) => props.stateSetter(record)} Label={'Enabled'} />
        </div>
    )

}
