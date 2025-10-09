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
import { Select, Input } from '@gpa-gemstone/react-forms';
import { OpenXDA as LocalXDA } from '../global';
import { AllWidgets } from '../../../../../EventWidgets/TSX/WidgetWrapper';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SEBrowserWidgetSlice } from '../Store/Store';
import { cloneDeep } from 'lodash';
import { EventWidget } from '../../../../../EventWidgets/TSX/global';

interface IProps {
    Widget: LocalXDA.IWidget,
    stateSetter: (tab: LocalXDA.IWidget) => void,
    setErrors?: (e: string[]) => void,
}

export default function WidgetForm(props: IProps) {
    const dispatch = useAppDispatch();
    const allWidgets = useAppSelector(SEBrowserWidgetSlice.Data);
    const allWidgetStatus = useAppSelector(SEBrowserWidgetSlice.Status);

    React.useEffect(() => {
        if (allWidgetStatus == 'unintiated' || allWidgetStatus == 'changed')
            dispatch(SEBrowserWidgetSlice.Fetch());
    }, [allWidgetStatus]);

    React.useEffect(() => {
        if (props.setErrors == null)
            return;

        let e = [];
        if (props.Widget.Name == null || props.Widget.Name.length == 0)
            e.push('Name is required.');
        if (allWidgets.find(w => w.Name.toLowerCase() == props.Widget.Name.toLowerCase() && w.ID != props.Widget.ID) != null)
            e.push('Name must be unique.');

        props.setErrors(e);
    }, [props.Widget.Setting, props.Widget.Name, props.Widget.Type]);

    React.useEffect(() => {
        if (AllWidgets.findIndex(widget => widget.Name === props.Widget.Type) < 0)
            props.stateSetter({ ...props.Widget, Type: null })
    }, [props.Widget.Type]);


    return (
        <div className="col">
            <Input<LocalXDA.IWidget> Record={props.Widget} Setter={props.stateSetter} Field={'Name'}
                Valid={() => true} />
            <Select<LocalXDA.IWidget> Record={props.Widget} Field={'Type'}
                Label='Type'
                Setter={(record) => props.stateSetter(record)}
                Options={_.orderBy(AllWidgets.map(o => ({ Value: o.Name, Label: o.Name })), [widget => widget.Label.toLowerCase()], ['asc'])}
                EmptyLabel=''
            />
            {props.Widget.Type == null ?
                <div className="alert alert-danger">
                    This Widget is not available. Please ensure a valid Type is selected.
                </div> :
                <WidgetSetting Settings={JSON.parse(props.Widget.Setting ?? "")}
                    SetSetting={(s) => props.stateSetter({ ...props.Widget, Setting: JSON.stringify(s) })}
                    Type={props.Widget.Type} />
                }

        </div>
    )

}

const WidgetSetting = (props: { Settings: {}, Type: string, SetSetting: (s: {}) => void }) => {
    const widget: EventWidget.IWidget<unknown> | undefined = React.useMemo(() => AllWidgets.find(w => w.Name == props.Type), [props.Type]);

    const workingSettings = React.useMemo(() => {
        if (widget == null) return undefined;

        const settings = props.Settings == null ? {} : props.Settings;
        const newSettings = cloneDeep(widget.DefaultSettings);

        for (const k of Object.keys(newSettings))
            if (settings.hasOwnProperty(k))
                newSettings[k] = cloneDeep(settings[k]);

        return newSettings;
    }, [widget, props.Settings]);

    if (widget == null)
        return (
            <div className="alert alert-info">
                Widget could not be found, please contact your administrator.
            </div>
        );

    if (widget.Settings == null)
        return (
            <div className="alert alert-info">
                This Widget has no settings.
            </div>
        );

    return <widget.Settings Settings={workingSettings} SetSettings={props.SetSetting} />
}
