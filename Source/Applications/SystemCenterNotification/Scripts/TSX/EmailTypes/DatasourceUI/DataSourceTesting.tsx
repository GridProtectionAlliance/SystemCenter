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
import { EmailType, IDataSourceTriggeredEmailType, IEvent, ITriggeredDataSource, ITriggeredEmailDataSourceSetting } from '../../global';
import { TriggeredDataSourceSettingSlice, TriggeredDataSourceSlice, TriggeredEmailDataSourceSlice } from '../../Store';
import { Select } from '@gpa-gemstone/react-forms';
import SQLDataSource from './SQLDataSource';
import { cloneDeep } from 'lodash'
import EventSelect from '../TriggerUI/EventSelect';
import * as $ from 'jquery';
import { Application } from '@gpa-gemstone/application-typings';
import { pd } from 'pretty-data';
import Table from '@gpa-gemstone/react-table';

declare var homePath;
declare var version;

// #ToDO move to gpa-gemstone
const CircledX = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="feather feather-file-text">
        <circle stroke="rgb(139, 0, 0)" fill={'none'} cx="12" cy="12" r="11"/>
        <path stroke="rgb(139, 0, 0)" strokeWidth={3} d="M 6 6 L 18 18" />
        <path stroke="rgb(139, 0, 0)" strokeWidth={3} d="M 18 6 L 6 18" />
    </svg>

const CircleCheck = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
        <circle stroke="rgb(0, 100, 0)" fill={'none'} cx="12" cy="12" r="11" />
    <path stroke="rgb(0, 100, 0)" fill={'none'}  strokeWidth={3} d="M 5 15 L 10 20 L 18 5"/>
    </svg>

interface IProps {
    Record: EmailType,
    Show: boolean,
    OnClose: () => void
}

interface IResults {
      Success: boolean,
      Created: boolean,
      Data: string,   
      Exception: any,
      Model: ITriggeredDataSource
}

const DataSourceTesting = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [eventID, setEventID] = React.useState<number>(-1);
    const [data, setData] = React.useState<IResults[]>([]);
    const [step, setStep] = React.useState<number>(1);
    const [status, setStatus] = React.useState<Application.Types.Status>('idle');
    const [selectedSource, setSelectedSource] = React.useState<IResults>(null);

    React.useEffect(() => {
        if (!props.Show) {
            setStatus('idle');
            setStep(1);
            setEventID(-1);
            setData([]);
            setSelectedSource(null)
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
        }).then((d) => { setStatus('idle'); setData(d as IResults[]); }, (d) => { setStatus('error') })
    }
    //pd.xml(d)
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
                    <div className="row">
                        <div className="col-4">
                            <Table<IResults>
                                cols={[
                                    {
                                        key: 'Success', field: 'Success', label: '', headerStyle: { width: 'auto' },
                                        rowStyle: { width: 'auto' },
                                        content: (item) => (item.Created && item.Success) ? CircleCheck : CircledX
                                    },
                                    {
                                        key: 'Name', field: 'Model', label: '', headerStyle: { width: 'auto' },
                                        rowStyle: { width: 'auto', fontWeight: 'bold' },
                                        content: (item) => `${item.Model.Name}`
                                    },
                                ]}
                                data={data}
                                sortKey={'Error'}
                                ascending={false}
                                onSort={() => { }}
                                onClick={(item) => { setSelectedSource(item.row); }}
                                theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                tbodyStyle={{ display: 'block', overflowY: 'scroll', height: 'calc(100 % - 50 px)', width: '100%' }}
                                rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                selected={(item) => selectedSource !== null && selectedSource.Model.ID == item.Model.ID }
                            />
                        </div>
                        <div className="col-8">
                            {selectedSource != null ? (selectedSource.Success? < div className="form-group">
                                <label>Data</label>
                                <textarea
                                    rows={10}
                                    className={'form-control'}
                                    disabled={true}
                                    value={pd.Xml(selectedSource.Data)}
                                />
                            </div> :
                                <div className="alert alert-danger">
                                    An error occured processing this datasource: {selectedSource.Exception?.Message}
                                </div>) :
                                <div className="alert alert-info">
                                Select a DataSource on the left to see it's return
                            </div> }
                        </div>
                    </div>
                    : null}
            </div>
        </Modal>
        )
}

export default DataSourceTesting;
