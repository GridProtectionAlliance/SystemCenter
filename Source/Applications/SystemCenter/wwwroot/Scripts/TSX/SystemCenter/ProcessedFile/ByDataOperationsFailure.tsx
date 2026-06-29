//******************************************************************************************************
//  DataOperationsFailures.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  07/02/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application } from '@gpa-gemstone/application-typings';
import { OpenXDA as LocalXDA } from '../global';
import { LoadingScreen } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import AnalysisTask from './AnalysisTask';
import DataOperationsFailures from './DataOperationsFailures';

//#TODO This is really the DataFileID but changing the URL will require a larger rework and search so leaving it for now
interface IProps { FileGroupID: number }

function ByDataOperationsFailure(props: IProps) {
    const [fileGroup, setFileGroup] = React.useState<LocalXDA.DataFileView>(null);
    const [status, setStatus] = React.useState<Application.Types.Status>('idle');
    const [analysisJob, setAnalysisJob] = React.useState<LocalXDA.FileGroupAnalysisJob|undefined>(undefined);

    React.useEffect(() => {
        if (props.FileGroupID == undefined) return null;
        setStatus('loading')
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/DataFile/One/${props.FileGroupID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((data) => {
            setFileGroup(data);
            setStatus('idle');
            })
            .fail(() => setStatus('error'));
        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [props.FileGroupID]);

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row">
                <div className="col">
                    <h2>{fileGroup?.FilePath ?? "Unknow File Group"}</h2>
                </div>
            </div>
            <hr />
            <LoadingScreen Show={status === 'loading'} />
            <div className="row" style={{ flex: 1 }}>
                <AnalysisTask FileGroupID={fileGroup?.FileGroupID} SetAnalysisJob={setAnalysisJob} AnalysisJobID={analysisJob?.ID} />
                <DataOperationsFailures AnalysisTaskID={analysisJob?.ID} />
            </div>
            
        </div>
    );
}

export default ByDataOperationsFailure;