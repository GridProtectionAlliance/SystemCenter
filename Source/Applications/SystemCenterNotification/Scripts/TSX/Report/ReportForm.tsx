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
import { ScheduledEmailType } from '../global';
import { EmailCategorySlice, ScheduledEmailTypeSlice } from '../Store';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';
import { IsCron } from '@gpa-gemstone/helper-functions'

interface IProps { record: ScheduledEmailType, setRecord: (d: ScheduledEmailType) => void }

const ReportForm = (props: IProps) => {
    const dispatch = useAppDispatch();
    const emails = useAppSelector(ScheduledEmailTypeSlice.Data);
    const status = useAppSelector(ScheduledEmailTypeSlice.Status);

    const categoryStatus = useAppSelector(EmailCategorySlice.Status);
    const categories = useAppSelector(EmailCategorySlice.Data);


    React.useEffect(() => {
        if (categoryStatus == 'unintiated' || categoryStatus == 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [categoryStatus]);


    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
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
                    Feedback={'Schedule needs to be a valid Cron Syntax'} Help={'Schedule is the frequency and time when the report is sent. This field uses CRON syntax. Examples are: daily = "23 59 * * *", weekly = "23 59 * * 5", monthly = "0 0 1 * *"'}
                />
                <CheckBox<ScheduledEmailType> Record={props.record} Field={'ShowSubscription'} Label={'Allow Self Subscription'} Setter={(record) => props.setRecord(record)} />
                <CheckBox<ScheduledEmailType> Record={props.record} Field={'RequireApproval'} Label={'Requires Approval'} Setter={(record) => props.setRecord(record)} />
            </div>
            <div className="col">
                <CheckBox<ScheduledEmailType> Record={props.record} Field={'SMS'} Label={'Send as a Text'} Setter={(record) => props.setRecord(record)} Disabled={true} />
                <Input<ScheduledEmailType> Record={props.record} Field={'FilePath'}
                    Label={'File Path'}
                    Help={'If the path is empty the system will not save the report to a file. Otherwise the system will save the notification to the specified path with the subject as the filename.'}
                    Valid={Valid} Setter={(record) => props.setRecord(record)} />
            </div>
        </div>)
}

export default ReportForm;