//******************************************************************************************************
//  AzureDataSOurce.tsx - Gbtc
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
//  07/26/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import { DataSourceSettingUI, ISettingsUIProps } from './DataSourceModal';


declare var homePath;
declare var version;

const DefaultSettings = [
    {
        ID: 0, Name: 'AzureFieldName',
        Value: "JobTitle",
        ScheduledEmailDataSourceEmailTypeID: 0
    },
    {
        ID: 0, Name: 'XDAFieldName',
        Value: "Position",
        ScheduledEmailDataSourceEmailTypeID: 0
    }
];

const AzureDataSource: React.FC<ISettingsUIProps> = (props) => {
    React.useEffect(() => {
        let e = [];
        console.log(props.Settings.find(s => s.Name === 'AzureFieldName'));
        if ((props.Settings.find(s => s.Name === 'AzureFieldName')?.Value ?? []).length < 1)
            e.push("A azure field name is required");
        if ((props.Settings.find(s => s.Name === 'XDAFieldName')?.Value ?? []).length < 1)
            e.push('A XDA field name is required')
        props.SetErrors(e);
    }, [props.Settings])

    return (
        <div className="row">
            <div className="col">
                <div className="form-group">
                    <label>Azure Field Name</label>
                    <textarea
                        rows={1}
                        className={(props.Settings.find(s => s.Name === 'AzureFieldName')?.Value ?? []).length > 0 ? 'form-control' : 'form-control is-invalid'}
                        onChange={(evt) => {
                            props.SetSetting({
                                ID: 0, Name: 'AzureFieldName',
                                Value: evt.target.value,
                                ScheduledEmailDataSourceEmailTypeID: props.DataSourceID
                            });
                        }}
                        value={props.Settings.find(s => s.Name === 'AzureFieldName')?.Value ?? ''}
                    />
                    <div className="invalid-feedback">
                        The azure field name cannot be empty
                    </div>
                </div>
                <div className="form-group">
                    <label>XDA Field Name</label>
                    <textarea
                        rows={2}
                        className={(props.Settings.find(s => s.Name === 'XDAFieldName')?.Value ?? []).length > 0 ? 'form-control' : 'form-control is-invalid'}
                        onChange={(evt) => {
                            props.SetSetting({
                                ID: 0, Name: 'XDAFieldName',
                                Value: evt.target.value,
                                ScheduledEmailDataSourceEmailTypeID: props.DataSourceID
                            });
                        }}
                        value={props.Settings.find(s => s.Name === 'XDAFieldName')?.Value ?? ''}
                    />
                    <div className="invalid-feedback">
                        The XDA FieldName is required
                    </div>
                </div>
            </div>
        </div>);
}

export default { UI: AzureDataSource, Defaults: DefaultSettings } as DataSourceSettingUI
