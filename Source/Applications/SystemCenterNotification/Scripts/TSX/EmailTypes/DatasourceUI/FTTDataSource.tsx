//******************************************************************************************************
//  FTTDataSource.tsx - Gbtc
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
//  04/04/2024 - Stephen C. Wills
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import { DataSourceSettingUI, ISettingsUIProps } from './DataSourceModal';


declare var homePath;
declare var version;


const DefaultQuery = `SELECT
    ROW_NUMBER() OVER(ORDER BY FaultSummary.Inception) FaultNumber,
    Location.Name StationName,
    Asset.AssetKey LineKey,
    FORMAT(FaultSummary.Distance, '0.##########') Distance,
    DATEADD(MINUTE, -Event.TimeZoneOffset, FaultSummary.Inception) EventTime,
    NULL EndLatitude,
    NULL EndLongitude
FROM
    Event JOIN
    Meter ON Event.MeterID = Meter.ID JOIN
    Location ON Meter.LocationID = Location.ID JOIN
    Asset ON Event.AssetID = Asset.ID JOIN
    FaultSummary ON
        FaultSummary.EventID = Event.ID AND
        FaultSummary.IsSelectedAlgorithm <> 0
WHERE EventID = {0}`;

const DefaultURL = 'http://localhost/faulttracetool';
const DefaultCLIPath = 'FaultTraceTool\\FaultTraceToolInterop.exe';
const DefaultQueryStringFormat = 'lineid_{index}={line}&stationname_{index}={station}&distance_{index}={distance:0.######}&eventtime_{index}={eventTime:yyyy-MM-ddTHH:mm:ss.fffffff}';

const DefaultSettings = [
    {
        ID: 0, Name: 'FTTRecordSQL',
        Value: DefaultQuery,
        TriggeredEmailDataSourceEmailTypeID: 0
    },
    {
        ID: 0, Name: 'URL',
        Value: DefaultURL,
        TriggeredEmailDataSourceEmailTypeID: 0
    },
    {
        ID: 0, Name: 'URLOnly',
        Value: String(false),
        TriggeredEmailDataSourceEmailTypeID: 0
    },
    {
        ID: 0, Name: 'CLIPath',
        Value: DefaultCLIPath,
        TriggeredEmailDataSourceEmailTypeID: 0
    },
    {
        ID: 0, Name: 'QueryStringFormat',
        Value: DefaultQueryStringFormat,
        TriggeredEmailDataSourceEmailTypeID: 0
    },
    {
        ID: 0, Name: 'QueryTimeout',
        Value: String(60),
        TriggeredEmailDataSourceEmailTypeID: 0
    },
    {
        ID: 0, Name: 'IgnoreCertificateErrors',
        Value: String(false),
        TriggeredEmailDataSourceEmailTypeID: 0
    }
]

const FTTDataSource: React.FC<ISettingsUIProps> = (props) => {

    const getSettingValue = (name: string, defaultValue?: string) => {
        const setting = props.Settings.find(s => s.Name == name);
        return setting != null ? setting.Value : defaultValue;
    };

    const isSettingSpecified = (name: string) => {
        const value = getSettingValue(name, '');
        return value.length > 0;
    };

    const isURLOnly = () => {
        const value = getSettingValue('URLOnly', DefaultSettings[3].Value);
        return value != String(false);
    };

    React.useEffect(() => {
        let e = [];
        if (!isSettingSpecified('FTTRecordSQL'))
            e.push('A SQL query is required');
        if (!isSettingSpecified('URL'))
            e.push('A URL to reach FTT is required');
        if (isURLOnly()) {
            if (isSettingSpecified('CLIPath'))
                e.push('Path to the FTT CLI is required');
            if (isSettingSpecified('QueryStringFormat'))
                e.push('A format string for the FTT query is required');
            if (isSettingSpecified('ImageWidth'))
                e.push('A width for the FTT image is required');
            if (isSettingSpecified('ImageHeight'))
                e.push('A height for the FTT image is required');
        }
        props.SetErrors(e);
    }, [props.Settings]);

    return (
        <div className="row">
            <div className="col">
                {props.children}
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label>Fault Trace Tool URL</label>
                            <textarea
                                rows={1}
                                className={isSettingSpecified('URL') ? 'form-control' : 'form-control is-invalid'}
                                onChange={(evt) => {
                                    props.SetSetting({
                                        ID: 0, Name: 'URL',
                                        Value: evt.target.value,
                                        TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                    });
                                }}
                                value={getSettingValue('URL', '')}
                            />
                            <div className="invalid-feedback">
                                The URL cannot be empty.
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Fault Data SQL</label>
                            <textarea
                                rows={4}
                                className={isSettingSpecified('FTTRecordSQL') ? 'form-control' : 'form-control is-invalid'}
                                onChange={(evt) => {
                                    props.SetSetting({
                                        ID: 0, Name: 'FTTRecordSQL',
                                        Value: evt.target.value,
                                        TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                    });
                                }}
                                value={getSettingValue('FTTRecordSQL', '')}
                            />
                            <div className="invalid-feedback">
                                The SQL query cannot be empty.
                            </div>
                        </div>
                        <div className={isURLOnly() ? "form-check" : "form-check mb-4"}>
                            <input
                                id="url-only-checkbox"
                                type="checkbox"
                                className={'form-check-input'}
                                onChange={(evt) => {
                                    props.SetSetting({
                                        ID: 0, Name: 'URLOnly',
                                        Value: String(!evt.target.checked),
                                        TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                    });
                                }}
                                checked={!isURLOnly()}
                            />
                            <label htmlFor="url-only-checkbox" className="form-check-label">Include Image Data</label>
                        </div>
                        {isURLOnly() ? '' : <div className="ml-4">
                            <div className="form-group">
                                <label>Path to FaultTraceToolInterop CLI</label>
                                <textarea
                                    rows={1}
                                    className={isSettingSpecified('CLIPath') ? 'form-control' : 'form-control is-invalid'}
                                    onChange={(evt) => {
                                        props.SetSetting({
                                            ID: 0, Name: 'CLIPath',
                                            Value: evt.target.value,
                                            TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                        });
                                    }}
                                    value={getSettingValue('CLIPath', '')}
                                />
                                <div className="invalid-feedback">
                                    Path to the FTT CLI cannot be empty.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>FTT Query String Format</label>
                                <textarea
                                    rows={2}
                                    className={isSettingSpecified('QueryStringFormat') ? 'form-control' : 'form-control is-invalid'}
                                    onChange={(evt) => {
                                        props.SetSetting({
                                            ID: 0, Name: 'QueryStringFormat',
                                            Value: evt.target.value,
                                            TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                        });
                                    }}
                                    value={getSettingValue('QueryStringFormat', '')}
                                />
                                <div className="invalid-feedback">
                                    The format string for the FTT query cannot be empty.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>FTT Query Timeout</label>
                                <input
                                    type="number"
                                    className={'form-control'}
                                    onChange={(evt) => {
                                        props.SetSetting({
                                            ID: 0, Name: 'QueryTimeout',
                                            Value: evt.target.value,
                                            TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                        });
                                    }}
                                    value={getSettingValue('QueryTimeout', DefaultSettings[5].Value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Image Width</label>
                                <input
                                    type="number"
                                    className={isSettingSpecified('ImageWidth') ? 'form-control' : 'form-control is-invalid'}
                                    onChange={(evt) => {
                                        props.SetSetting({
                                            ID: 0, Name: 'ImageWidth',
                                            Value: evt.target.value,
                                            TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                        });
                                    }}
                                    value={getSettingValue('ImageWidth', '')}
                                />
                                <div className="invalid-feedback">
                                    The width of the FTT image cannot be empty.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Image Height</label>
                                <input
                                    type="number"
                                    className={isSettingSpecified('ImageHeight') ? 'form-control' : 'form-control is-invalid'}
                                    onChange={(evt) => {
                                        props.SetSetting({
                                            ID: 0, Name: 'ImageHeight',
                                            Value: evt.target.value,
                                            TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                        });
                                    }}
                                    value={getSettingValue('ImageHeight', '')}
                                />
                                <div className="invalid-feedback">
                                    The height of the FTT image cannot be empty.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Browser Arguments</label>
                                <textarea
                                    className={'form-control'}
                                    onChange={(evt) => {
                                        props.SetSetting({
                                            ID: 0, Name: 'BrowserArguments',
                                            Value: evt.target.value,
                                            TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                        });
                                    }}
                                    value={getSettingValue('BrowserArguments')}
                                />
                            </div>
                            <div className="form-check">
                                <input
                                    id="ignore-certificate-errors-checkbox"
                                    type="checkbox"
                                    className={'form-check-input'}
                                    onChange={(evt) => {
                                        props.SetSetting({
                                            ID: 0, Name: 'IgnoreCertificateErrors',
                                            Value: String(!evt.target.checked),
                                            TriggeredEmailDataSourceEmailTypeID: props.DataSourceID
                                        });
                                    }}
                                    checked={getSettingValue('IgnoreCertificateErrors', DefaultSettings[6].Value) != String(false)}
                                />
                                <label htmlFor="ignore-certificate-errors-checkbox" className="form-check-label">Ignore Certificate Errors</label>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default { UI: FTTDataSource, Defaults: DefaultSettings, Name: 'ftt'} as DataSourceSettingUI
