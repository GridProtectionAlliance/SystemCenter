//******************************************************************************************************
//  WidgetForm.tsx - Gbtc
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
//  12/11/2025 - G. Santos
//      Migrated and refactored code to merge 2 similar pages.
//
//******************************************************************************************************

import { Application } from '@gpa-gemstone/application-typings';
import { Input, Select } from '@gpa-gemstone/react-forms';
import { Alert } from '@gpa-gemstone/react-interactive';
import * as _ from 'lodash';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import { EventWidget } from '../../../../../EventWidgets/TSX/global';
import { AllWidgets } from '../../../../../EventWidgets/TSX/WidgetWrapper';
import { useAppDispatch, useAppSelector } from '../hooks';
import { PQDigestWidgetSlice, SEBrowserWidgetSlice } from '../Store/Store';

interface IProps {
    Widget: EventWidget.IWidgetView,
    StateSetter: (tab: EventWidget.IWidgetView) => void,
    SetErrors?: (e: string[]) => void,
    Type: 'SEBrowser' | 'PQDigest'
}

export default function WidgetForm(props: IProps) {
    const dispatch = useAppDispatch();

    let allWidgets: EventWidget.IWidgetView[]; 
    switch (props.Type) {
        case 'SEBrowser':
            allWidgets = useAppSelector(SEBrowserWidgetSlice.Data);
        case 'PQDigest':
            allWidgets = useAppSelector(PQDigestWidgetSlice.Data);
    }

    let allWidgetStatus: Application.Types.Status;
    switch (props.Type) {
        case 'SEBrowser':
            allWidgetStatus = useAppSelector(SEBrowserWidgetSlice.Status);
        case 'PQDigest':
            allWidgetStatus = useAppSelector(PQDigestWidgetSlice.Status);
    }

    const [settingsErrors, setSettingsErrors] = React.useState<string[]>([]);
    const [validName, setValidName] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (allWidgetStatus == 'uninitiated' || allWidgetStatus == 'changed')
            dispatch(SEBrowserWidgetSlice.Fetch());
    }, [allWidgetStatus]);

    React.useEffect(() => {
        let e = [];
        if (props.Widget.Name == null || props.Widget.Name.length == 0)
            e.push('Name is required.');
        else if (allWidgets.find(w => w.Name.toLowerCase() == props.Widget.Name.toLowerCase() && w.ID != props.Widget.ID) != null)
            e.push('Name must be unique.');
        setValidName(e.length <= 0);

        // Add other errors and push out
        if (props.SetErrors != null) {
            e = e.concat(settingsErrors);
            props.SetErrors(e);
        }
    }, [props.Widget.Name, settingsErrors?.length ?? 0]);

    React.useEffect(() => {
        if (AllWidgets.findIndex(widget => widget.Name === props.Widget.Type) < 0)
            props.StateSetter({ ...props.Widget, Type: null })
    }, [props.Widget.Type]);

    return (
        <div className="col">
            <Input<EventWidget.IWidgetView> Record={props.Widget} Setter={props.StateSetter} Field={'Name'}
                Valid={() => validName} />
            <Select<EventWidget.IWidgetView> Record={props.Widget} Field={'Type'}
                Label='Type'
                Setter={(record) => props.StateSetter(record)}
                Options={_.orderBy(AllWidgets.map(o => ({ Value: o.Name, Label: o.Name })), [widget => widget.Label.toLowerCase()], ['asc'])}
                EmptyLabel=''
            />
            {props.Widget.Type == null ?
                <Alert Class="alert-danger">
                    This Widget is not available. Please ensure a valid Type is selected.
                </Alert> :
                <WidgetSetting Settings={JSON.parse(props.Widget.Setting ?? "")}
                    SetSetting={(s) => props.StateSetter({ ...props.Widget, Setting: JSON.stringify(s) })}
                    Type={props.Widget.Type} SetErrors={(e) => setSettingsErrors(e)} />
            }
        </div>
    );
}

const WidgetSetting = (props: { Settings: {}, Type: string, SetSetting: (s: {}) => void, SetErrors: (e: string[]) => void }) => {
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
            <Alert Class="alert-info">
                Widget could not be found, please contact your administrator.
            </Alert>
        );

    if (widget.Settings == null)
        return (
            <Alert Class="alert-info">
                This Widget has no settings.
            </Alert>
        );

    return <widget.Settings Settings={workingSettings} SetSettings={props.SetSetting} SetErrors={props.SetErrors} HomePath={homePath} />
}
