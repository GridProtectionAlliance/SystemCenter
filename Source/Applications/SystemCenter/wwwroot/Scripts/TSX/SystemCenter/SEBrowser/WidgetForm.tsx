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
import { useAppSelector } from '../hooks';
import { SEBrowserWidgetSlice } from '../Store/Store';
import { cloneDeep } from 'lodash';


declare var homePath: string;

interface IProps {
    Widget: LocalXDA.IWidget,
    stateSetter: (tab: LocalXDA.IWidget) => void,
    setErrors?: (e: string[]) => void,
}


export default function WidgetForm(props: IProps) {
    const [errors, setErrors] = React.useState<string[]>([]);
    const allWidgets = useAppSelector(SEBrowserWidgetSlice.Data);

    React.useEffect(() => {
        let e = [];
        if (props.Widget.Name == null || props.Widget.Name.length == 0)
            e.push('Name is required.');
        if (props.Widget.Type == null || props.Widget.Type.length == 0)
            e.push('Type is required.');
        if (allWidgets.find(w => w.Name.toLowerCase() == props.Widget.Name.toLowerCase() && w.ID != props.Widget.ID) != null)
            e.push('Name must be unique.');
        
        setErrors(e);
    }, [props.Widget.Setting, props.Widget.Name, props.Widget.Type])

    React.useEffect(() => {
        if (props.setErrors != undefined)
            props.setErrors(errors);
    }, [props.setErrors, errors])

    React.useEffect(() => {
        if (AllWidgets.map(w => w.Name).indexOf(props.Widget.Type) < 0)
            props.stateSetter({ ...props.Widget, Type: null })
    }, [props.Widget.Type])


    return (
        <div className="col">
            <Input<LocalXDA.IWidget> Record={props.Widget} Setter={props.stateSetter} Field={'Name'}
                Valid={() => true} />
            <Select<LocalXDA.IWidget> Record={props.Widget} Field={'Type'}
                Label='Type'
                Setter={(record) => props.stateSetter(record)}
                Options={AllWidgets.map(o => ({ Value: o.Name, Label: o.Name }))}
                EmptyLabel=''
            />
            {props.Widget.Type == null ?
                <div className="alert alert-danger">
                    This Widget is not available. Please ensure a valid Type is selected.
                </div> :
                <WidgetSetting Settings={props.Widget.Setting}
                    SetSetting={(s) => props.stateSetter({ ...props.Widget, Setting: s })}
                    Type={props.Widget.Type} />
                }

        </div>
    )

}

const WidgetSetting = (props: { Settings: string, Type: string, SetSetting: (s: string) => void }) => {
    const [data, setData] = React.useState<object>({});
    const Jsx = React.useMemo(() => AllWidgets.find(w => w.Name == props.Type)?.Settings ?? null, [props.Type])
    const defaults = React.useMemo(() => AllWidgets.find(w => w.Name == props.Type)?.DefaultSettings ?? null, [props.Type])

    React.useEffect(() => {
        const settings = props.Settings == null || props.Settings.length == 0 ? {} : JSON.parse(props.Settings);
        const s = cloneDeep(defaults ?? {});
        for (const [k, v] of Object.entries(defaults ?? {})) {
            if (settings.hasOwnProperty(k))
                s[k] = cloneDeep(settings[k]);
        }
        setData(s);
    }, [props.Type, defaults]);

    React.useEffect(() => {
        const s = JSON.stringify(data);
        props.SetSetting(s);
    }, [data])

    if (Jsx == null || defaults == null)
        return <div className="alert alert-info">
            This Widget has no settings.
        </div>;

    return <Jsx Settings={(data ?? defaults) as any} SetSettings = {setData} />
}
