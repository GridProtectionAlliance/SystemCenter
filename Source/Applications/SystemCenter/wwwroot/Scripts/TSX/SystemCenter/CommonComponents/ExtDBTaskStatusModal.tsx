//******************************************************************************************************
//  ExtDBTaskStatus.tsx - Gbtc
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
//  08/17/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Modal, Alert, StatusProgressBar } from '@gpa-gemstone/react-interactive';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SC } from '../global';

interface IProps {
    CallBack: () => void,
    Record: SystemCenter.Types.DetailedExternalDatabases | undefined,
    RecordType?: 'Asset' | 'Meter' | 'Location' | 'Customer' | OpenXDA.Types.AssetTypeName,
    ParentID?: number,
    SetStatus: (s: Application.Types.Status) => void
}

const ExtDBTaskStatusModal = (props: IProps) => {


    const [messages, setMesssages] = React.useState<SC.ExtDBTaskStatus[]>([]);
    const [complete, setComplete] = React.useState<boolean>(false);


    const recordsUpdated = React.useMemo(() => messages.length > 0? Math.max(...messages.map(m => m.RecordsAffected)) : 0, [messages]);
    const fieldsUpdated = React.useMemo(() => messages.length > 0 ? Math.max(...messages.map(m => m.RowsAffected)) : 0, [messages]);
    const percentComplete = React.useMemo(() => messages.length > 0 ? Math.max(...messages.map(m => m.PercentFinished)) : 0, [messages]);


    React.useEffect(() => {
        if (props.Record == undefined)
            return;


        props.SetStatus('loading');

        const path = `${homePath}api/SystemCenter/ExternalDatabases/UnscheduledUpdate/${props.Record.ID}/${(props.RecordType == 'CapacitorBank' ? 'CapBank' : (props.RecordType == 'CapacitorBankRelay' ? 'CapBankRelay' : props.RecordType)) ?? ''}${props.ParentID === undefined ? '' : "/" + props.ParentID}`;

        const abortController = new AbortController();

        const runUpdate = async () => {
            if (props.Record == undefined) return
            try {
                const response = await fetch(path, {
                    headers: { Accept: 'application/x-ndjson' },
                    signal: abortController.signal
                });

                if (!response.ok) {
                    throw new Error(`External database update failed with status ${response.status}.`);
                }

                const reader = response.body?.getReader();

                if (reader == null)
                    throw new Error('Streaming responses are not supported by this browser.');

                const decoder = new TextDecoder();
                let buffer = '';

                while (true) {
                    const { done, value } = await reader.read();
                    buffer += decoder.decode(value, { stream: !done });

                    const messages = buffer.split('\n');
                    buffer = messages.pop() ?? '';

                    messages.filter(message => message.trim().length > 0).forEach(message => {
                        const data: SC.ExtDBTaskStatus = JSON.parse(message);
                        setMesssages(prev => [data, ...prev]);
                    });

                    if (done) {
                        setComplete(true)
                        break;
                    }
                }

                if (buffer.trim().length > 0) {
                    const data: SC.ExtDBTaskStatus = JSON.parse(buffer);
                    setMesssages(prev => [data, ...prev]);
                }

                props.SetStatus('idle');
            }
            catch (error) {
                setComplete(true)
                if (abortController.signal.aborted)
                    return;

                console.log(error);
                props.SetStatus('error');
            }
        };

        runUpdate();

        return () => {
            setComplete(true)
            abortController.abort();
        }

    }, [props.RecordType, props.Record, props.ParentID, props.SetStatus]);

    

    return (
        <Modal
            Show={props.Record != undefined}
            Size={"lg"}
            Title={"External Database Update Status"}
            CallBack={() => {
                props.CallBack();
                setMesssages([]);
                setComplete(false)
            }}
            ShowX={complete}
            ShowCancel={false}
            ShowConfirm={false}
            BodyStyle={{ overflow: 'hidden', height: 'calc(100vh - 210px)', display: 'flex', flexDirection: 'column' }}
        >
            <div className="row" style={{ flex: '1 1 0%', overflow: 'hidden' }}>
                <div className="col-12 d-flex flex-column" style={{ height: '100%' }}>

                    <div className="row">
                        <div className='col-12'>
                        <StatusProgressBar
                            CurrentPercentage={percentComplete}
                            Class={"w-100"}
                            />
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col d-flex justify-content-center">
                            <h6>{`${props.RecordType ?? 'Record'}s updated: ${recordsUpdated}`}</h6>
                        </div>
                        <div className="col d-flex justify-content-center">
                            <h6>{`Fields updated: ${fieldsUpdated}`}</h6>
                        </div>
                    </div>
                    <div className="row" style={{ overflow: 'auto', flex: 1, paddingBottom: 40 }} >
                        <div className="col d-flex flex-column h-100" >
                            {messages.map((extDBTaskStatus) => {
                                    return (
                                        <div className="row" >
                                            <Alert
                                                Class={getAlertClass(extDBTaskStatus.Status)}
                                                Style={{ justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center', marginBottom: 0 }}
                                            >
                                                {extDBTaskStatus.Message}
                                            </Alert>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default ExtDBTaskStatusModal;

const getAlertClass = (taskStatusType: 'Error' | 'Warning' | 'Info' | 'Success') => {
    switch (taskStatusType) {
        case 'Error':
            return 'alert-danger';
        case 'Info':
            return 'alert-info';
        case 'Warning':
            return 'alert-warning'
        case 'Success':
            return 'alert-success'
    }
}