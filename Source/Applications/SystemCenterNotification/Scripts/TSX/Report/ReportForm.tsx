//******************************************************************************************************
//  ReportForm.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  04/14/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { ScheduledEmailType, EmailCategory } from '../global';
import { ScheduledEmailTypeSlice } from '../Store';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';
import { IsCron } from '@gpa-gemstone/helper-functions';
import { Application } from '@gpa-gemstone/application-typings';
import { GenericController } from '@gpa-gemstone/react-interactive';

interface IProps { record: ScheduledEmailType, setRecord: (d: ScheduledEmailType) => void }

const ReportForm = (props: IProps) => {
    const dispatch = useAppDispatch();
    const emails = useAppSelector(ScheduledEmailTypeSlice.Data);
    const status = useAppSelector(ScheduledEmailTypeSlice.Status);

    const [categoryStatus, setCategoryStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [categories, setCategories] = React.useState<EmailCategory[]>([]);

    const emailCategoryController = React.useMemo(() => new GenericController<EmailCategory>(`${homePath}api/OpenXDA/EmailCategory`, "Name", true), [])

    React.useEffect(() => {
        setCategoryStatus('loading')
        const h = emailCategoryController.Fetch();
        h.done((d) => {
            setCategories(d)
            setCategoryStatus('idle')
        });
        h.fail(() => setCategoryStatus('error'));

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }

    }, [emailCategoryController.Fetch]);


    React.useEffect(() => {
        if (status == 'uninitiated' || status == 'changed')
            dispatch(ScheduledEmailTypeSlice.Fetch());
    }, [status]);

    function Valid(field: keyof ScheduledEmailType) {
        if (field == 'Name')
            return props.record.Name != null && props.record.Name.length != 0 && emails.findIndex(e => e.Name == props.record.Name && props.record.ID != e.ID) == -1;
        if (field == 'Schedule')
            return props.record.Schedule != null && IsCron(props.record.Schedule);

        return true;
    }

    return (  
        <div className="row">
            <div className="col">
                <Input<ScheduledEmailType> Record={props.record} Field={'Name'} Label={'Name'} Valid={Valid} Setter={(record) => props.setRecord(record)} />
                <Select<ScheduledEmailType> Record={props.record} Field={'EmailCategoryID'} Label={'Category'}
                    Options={categories.map(c => ({ Value: c.ID.toString(), Label: c.Name }))}
                    Setter={(record) => { record.EmailCategoryID = parseInt(record.EmailCategoryID.toString()); props.setRecord(record) }} />
                <Input<ScheduledEmailType> Record={props.record} Field={'Schedule'} Label={'Schedule'} Valid={Valid} Setter={(record) => props.setRecord(record)}
                    Feedback={'Schedule needs to be a valid Cron Syntax'} Help={'Cron-formatted schedule indicating report frequency. Syntax is minutes, hours, day of the month, month, and weekday. A schedule of 11:59pm each Sunday would be 59 23 * * 0.'}
                />
            </div>
            <div className="col">
                <Input<ScheduledEmailType> Record={props.record} Field={'FilePath'}
                    Label={'File Path'}
                    Help={'Specify the path to save this Report as a file. The subject will be used for the file name. If File Path is left empty, no file will be saved.'}
                    Valid={Valid} Setter={(record) => props.setRecord(record)} />
                <CheckBox<ScheduledEmailType> Record={props.record} Field={'ShowSubscription'} Label={'Allow Self Subscription'} Setter={(record) => props.setRecord(record)}
                    Disabled={!(categories.find(category => category.ID === props.record.EmailCategoryID)?.SelfSubscribe ?? false)}
                    Help={"Category must allow self-subscription to change this setting."} />
                <CheckBox<ScheduledEmailType> Record={props.record} Field={'RequireApproval'} Label={'Requires Approval'} Setter={(record) => props.setRecord(record)} />
                <CheckBox<ScheduledEmailType> Record={props.record} Field={'SMS'} Label={'Send as a Text'} Setter={(record) => props.setRecord(record)} />
            </div>
        </div>)
}

export default ReportForm;