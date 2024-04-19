//******************************************************************************************************
//  PQIDataSource.tsx - Gbtc
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


const DefaultSettings = []

const PQIDataSource: React.FC<ISettingsUIProps> = (props) => {

    return (
        <div className="row">
            <div className="col">
                {props.children}
                <div className="row">
                    <div className="col">
                        <div className="alert alert-primary" role="alert">
                            PQI requires a Subscription to the EPRI PQI System. Credentials are set in the openXDA Settings.
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
}

export default { UI: PQIDataSource, Defaults: DefaultSettings, Name: 'pqi'} as DataSourceSettingUI
