//******************************************************************************************************
//  SQLDataSource.tsx - Gbtc
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


const DefaultDataProvider = "AssemblyName={System.Data, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089}; ConnectionType=System.Data.SqlClient.SqlConnection; AdapterType=System.Data.SqlClient.SqlDataAdapter";
const DefaultQuery = 'SELECT NULL FOR XML PATH(\'Data\')';
const DefaultSettings = [
    {
        ID: 0, Name: 'SQLStatement',
        Value: DefaultQuery,
        ScheduledEmailDataSourceEmailTypeID: 0
    },
    {
        ID: 0, Name: 'DataProviderString',
        Value: DefaultDataProvider,
        ScheduledEmailDataSourceEmailTypeID: 0
    }
]

const SQLDataSource: React.FC<ISettingsUIProps> = (props) => {

    React.useEffect(() => {
        let e = [];
        if ((props.Settings.find(s => s.Name === 'DataProviderString')?.Value ?? []).length < 1)
            e.push("A Data Provider String is required");
        if ((props.Settings.find(s => s.Name === 'SQLStatement')?.Value ?? []).length < 1)
            e.push('A SQL Query is required')
        props.SetErrors(e);
    }, [props.Settings])

    return (
        <div className="row">
            <div className="col">
                <div className="form-group">
                    <label>Connection String</label>
                    <textarea
                        rows={2}
                        className={'form-control'}
                        onChange={(evt) => {
                            if (evt.target.value !== '')
                                props.SetSetting({
                                    ID: 0, Name: 'ConnectionString',
                                    Value: evt.target.value,
                                    ScheduledEmailDataSourceEmailTypeID: props.DataSourceID
                                });
                            else
                                props.SetSetting({
                                    ID: 0, Name: 'ConnectionString',
                                    Value: null,
                                    ScheduledEmailDataSourceEmailTypeID: props.DataSourceID
                                });
                        }}
                        value={props.Settings.find(s => s.Name == 'ConnectionString')?.Value ?? ''}
                    />
                </div>
                <div className="form-group">
                    <label>Data Provider String</label>
                    <textarea
                        rows={2}
                        className={(props.Settings.find(s => s.Name === 'DataProviderString')?.Value ?? []).length > 0 ? 'form-control' : 'form-control is-invalid'}
                        onChange={(evt) => {
                            props.SetSetting({
                                ID: 0, Name: 'DataProviderString',
                                Value: evt.target.value,
                                ScheduledEmailDataSourceEmailTypeID: props.DataSourceID
                            });
                        }}
                        value={props.Settings.find(s => s.Name == 'DataProviderString')?.Value ?? ''}
                    />
                    <div className="invalid-feedback">
                        The Data Provider String can not be empty
                    </div>
                </div>
                <div className="form-group">
                    <label>SQL Query</label>
                    <textarea
                        rows={4}
                        className={(props.Settings.find(s => s.Name === 'SQLStatement')?.Value ?? []).length > 0 ? 'form-control' : 'form-control is-invalid'}
                        onChange={(evt) => {
                            props.SetSetting({
                                ID: 0, Name: 'SQLStatement',
                                Value: evt.target.value,
                                ScheduledEmailDataSourceEmailTypeID: props.DataSourceID
                            });
                        }}
                        value={props.Settings.find(s => s.Name == 'SQLStatement')?.Value ?? ''}
                    />
                    <div className="invalid-feedback">
                        The SQL Query can not be empty.
                    </div>
                </div>
            </div>
        </div>);
}

export default { UI: SQLDataSource, Defaults: DefaultSettings} as DataSourceSettingUI
