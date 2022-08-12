//******************************************************************************************************
//  DataSourceTesting.tsx - Gbtc
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
//  08/04/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch } from '../../hooks';
import * as React from 'react';
import { LoadingIcon, Modal, ToolTip, ServerErrorIcon } from '@gpa-gemstone/react-interactive'
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { EmailType, IDataSourceTriggeredEmailType, IEvent, ITriggeredEmailDataSourceSetting } from '../../global';
import { TriggeredDataSourceSettingSlice, TriggeredDataSourceSlice, TriggeredEmailDataSourceSlice } from '../../Store';
import { Select } from '@gpa-gemstone/react-forms';
import SQLDataSource from './SQLDataSource';
import { cloneDeep } from 'lodash'
import EventSelect from '../TriggerUI/EventSelect';
import * as $ from 'jquery';
import { Application } from '@gpa-gemstone/application-typings';

declare var homePath;
declare var version;

interface IProps {
    Record: EmailType,
    Show: boolean,
    OnClose: () => void
}


const DataSourceTesting = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [eventID, setEventID] = React.useState<number>(-1);
    const [data, setData] = React.useState<string>('');
    const [step, setStep] = React.useState<number>(1);
    const [status, setStatus] = React.useState<Application.Types.Status>('idle');

    React.useEffect(() => {
        if (!props.Show) {
            setStatus('idle');
            setStep(1);
            setEventID(-1);
            setData('');
        }
    }, [props.Show])

    React.useEffect(() => {
        if (step != 2)
            return;
        const handle = requestTest();
        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, [step])

    function requestTest() {
        setStatus('loading');
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/EmailType/GetData/${eventID}/${props.Record.ID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
        }).then((d) => { setStatus('idle'); setData(d); }, (d) => { setStatus('error') })
    }

    return (
        <Modal Show={props.Show} ShowX={true} ShowCancel={false}
            ConfirmShowToolTip={(eventID == -1 && step == 1)}
            DisableConfirm={step ==1 && eventID == -1}
            Size={'xlg'} Title={step == 1? 'Select an Event for Testing' : 'Notification Data'}
            ConfirmToolTipContent={<>
                {step == 1 ? <p> {CrossMark} An Event has to be selected </p> : null}
            </>}
            CallBack={(c) => {
                if (c && step == 1)
                    setStep(2);
                else
                    props.OnClose();
            }}
            ConfirmText={step == 1? 'Continue' : 'Close'}
        >
            <div style={{ height: innerHeight - 250 }}>
                {step == 1 ? <EventSelect SelectedEventID={eventID} SetSelectedEvent={setEventID} SetStatus={() => { }} TriggerSQL={props.Record.TriggerEmailSQL} /> : null}
                {step == 2 && status == 'loading' ? <LoadingIcon Show={true} /> : null}
                {step == 2 && status == 'error' ? <ServerErrorIcon Show={true} Label={'Unable to process this event. Please check your Data Sources.'} /> : null}
                {step == 2 && status == 'idle' ? 
                    <div className="form-group">
                        <label>Data</label>
                        <textarea
                            rows={10}
                            className={'form-control'}
                            disabled={true}
                            value={data}
                        />
                    </div>
                    : null}
            </div>
        </Modal>
        )
}

export default DataSourceTesting;
