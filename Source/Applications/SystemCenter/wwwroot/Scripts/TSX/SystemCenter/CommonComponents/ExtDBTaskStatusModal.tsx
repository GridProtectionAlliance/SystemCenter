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
import { SystemCenter as SC } from '../global'

interface IProps {
    Show: boolean
    ExtDBTaskStatuses: SC.ExtDBTaskStatus[]
    CallBack: () => void
    RecordType: string
}

const ExtDBTaskStatusModal = (props: IProps) => {

    const [recordsUpdated, setRecordsUpdated] = React.useState<number>(0);
    const [fieldsUpdated, setFieldsUpdated] = React.useState<number>(0);
    const [percentComplete, setPercentComplete] = React.useState<number>(0);

    React.useEffect(() => {
        if (props.ExtDBTaskStatuses.length == 0) return;
        const mostRecentStatus = props.ExtDBTaskStatuses[props.ExtDBTaskStatuses.length - 1];
        setRecordsUpdated(mostRecentStatus.RowsAffected);
        setFieldsUpdated(mostRecentStatus.RowsAffected);
        setPercentComplete(mostRecentStatus.PercentFinished);
    }, [props.ExtDBTaskStatuses])

    return (
        <Modal
            Show={props.Show}
            Size={"lg"}
            Title={"External Database Task Status"}
            CallBack={() => {
                props.CallBack();
                setRecordsUpdated(0);
                setFieldsUpdated(0);
                setPercentComplete(0);
            }}
            ShowX={percentComplete == 100}
            ShowCancel={false}
            ShowConfirm={false}
            BodyStyle={{ overflow: 'hidden', height: 'calc(100vh - 210px)', display: 'flex', flexDirection: 'column' }}
        >
            <div className="row" style={{ flex: '1 1 0%', overflow: 'hidden' }}>
                <div className="col-12" style={{ height: '100%' }}>

                    <div className="row">
                        <StatusProgressBar
                            CurrentPercentage={percentComplete}
                            Class={"w-100"}
                        />
                    </div>
                    <div className="row" >
                        <div className="col d-flex justify-content-center h-100">
                            <h6>{`${props.RecordType} updated: ${recordsUpdated}`}</h6>
                        </div>
                        <div className="col d-flex justify-content-center h-100">
                            <h6>{`Fields updated: ${fieldsUpdated}`}</h6>
                        </div>
                    </div>
                    <div className="row h-100" >
                        <div className="col d-flex flex-column h-100" style={{ overflow: 'auto', flex: 1, paddingBottom: 40}} >
                            {props.ExtDBTaskStatuses.length == 0 ? <></> :
                                props.ExtDBTaskStatuses.map((extDBTaskStatus) => {
                                    return (
                                        <div className="row my-0 d-flex align-items-center" >
                                            <Alert
                                                Class={getAlertClass(extDBTaskStatus.Status)}
                                                Style={{ justifyContent: 'center', width: '100%', height: '100%', alignItems: 'center', marginBottom: 0 }}
                                            >
                                                <h5>{extDBTaskStatus.Message}</h5>
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

const getAlertClass = (taskStatusType: 'Error' | 'Warning' | 'Info') => {
    switch (taskStatusType) {
        case 'Error':
            return 'alert-danger';
        case 'Info':
            return 'alert-info';
        case 'Warning':
            return 'alert-warning'
    }
}