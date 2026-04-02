//******************************************************************************************************
//  History.tsx - Gbtc
//
//  Copyright � 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  03/24/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { EmailType, SentEmail } from '../global';
import { LoadingScreen, GenericController, Breadcrumb } from '@gpa-gemstone/react-interactive'
import { Application } from '@gpa-gemstone/application-typings';
import moment from 'moment';
import SentEmailTimeline from './SentEmailTimeline'
import SentEmailTable from './SentEmailTable'

interface IStep {
    Label: string,
    ID: string | number,
    IsNavigable?: boolean,
}

interface IProps { Record: EmailType }

const History = (props: IProps) => {
    const [selectedEmailID, setSelectedEmailID] = React.useState<number | null>(null)
    const [selectedEmailLabel, setSelectedEmailLabel] = React.useState<string | null>(null);

    const steps: IStep[] = React.useMemo(() => {
        if ((selectedEmailLabel?.length ?? 0) == 0) 
            return []
        return [
            { Label: 'History', ID: "history", IsNavigable: true },
            { Label: selectedEmailLabel, ID: 'timeLine', IsNavigable: false }
        ]
    }, [selectedEmailLabel])

    const currentStep = { Label: '', ID: 'timeLine', IsNavigable: false }

    const resetToHistory = () => {
        setSelectedEmailID(null);
        setSelectedEmailLabel(null);
    }

    const handleOnHistoryTableClick = (data: SentEmail) => {

        setSelectedEmailID(data.ID);
        setSelectedEmailLabel(`[${data.TimeSent}] ${data.Subject}`)
    }

    return (
        <>
            <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="card" style={{ width: '100%', height: '100%' }}>
                        <div className="card-header">
                            <div className="row">
                                {selectedEmailID == null ? < div className="col-6 align-self-center">
                                    <h2>Email History</h2>
                                </div> :
                                    <div className="col">
                                        <Breadcrumb
                                            Steps={steps}
                                            CurrentStep={currentStep}
                                            OnClick={resetToHistory}
                                        />
                                    </div>}
                            </div>
                        </div>
                        <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                            <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                                {selectedEmailID == null ?
                                    <SentEmailTable
                                        EmailTypeID={props.Record?.ID}
                                        OnClick={handleOnHistoryTableClick}
                                    /> :
                                    <SentEmailTimeline
                                        SentEmailID={selectedEmailID}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default History;