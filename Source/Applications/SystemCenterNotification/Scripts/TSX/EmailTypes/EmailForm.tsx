//******************************************************************************************************
//  EmailForm.tsx - Gbtc
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { EmailCategory, EmailType } from '../global';
import { EmailCategorySlice, EmailTypeSlice } from '../Store';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';
import { IsNumber } from '@gpa-gemstone/helper-functions'

interface IProps { record: EmailType, setRecord: (d: EmailType) => void }

const EmailForm = (props: IProps) => {
    const dispatch = useAppDispatch();
    const emails = useAppSelector(EmailTypeSlice.Data);
    const status = useAppSelector(EmailTypeSlice.Status);

    const categoryStatus = useAppSelector(EmailCategorySlice.Status);
    const categories = useAppSelector(EmailCategorySlice.Data);


    React.useEffect(() => {
        if (categoryStatus == 'unintiated' || categoryStatus == 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [categoryStatus]);


    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(EmailTypeSlice.Fetch());
    }, [status]);

    function Valid(field: keyof EmailType) {
        if (field == 'Name')
            return props.record.Name != null && props.record.Name.length != 0 && emails.findIndex(e => e.Name == props.record.Name && props.record.ID != e.ID) == -1;
        if (field == 'MinDelay')
            return props.record.MinDelay != null && IsNumber(props.record.MinDelay) && props.record.MinDelay >= 0;
        if (field == 'MaxDelay')
            return props.record.MaxDelay != null && IsNumber(props.record.MaxDelay) && props.record.MaxDelay >= 0;
        return true;
    }

    return (
        <>
            
        <div className="row">
                <div className="col">
                    <Input<EmailType> Record={props.record} Field={'Name'} Label={'Name'} Valid={Valid} Setter={(record) => props.setRecord(record)} />
                    <Select<EmailType> Record={props.record} Field={'EmailCategoryID'} Label={'Category'}
                        Options={categories.map(c => ({ Value: c.ID.toString(), Label: c.Name }))}
                        Setter={(record) => { record.EmailCategoryID = parseInt(record.EmailCategoryID.toString()); props.setRecord(record) }} />
                    <CheckBox<EmailType> Record={props.record} Field={'ShowSubscription'} Label={'Allow Self Subscription'} Setter={(record) => props.setRecord(record)} />
                    <CheckBox<EmailType> Record={props.record} Field={'RequireApproval'} Label={'Requires Approval'} Setter={(record) => props.setRecord(record)} />
                </div>
                <div className="col">
                    <Input<EmailType> Type={'number'} Record={props.record} Field={'MinDelay'} Label={'Minimum Delay'} Feedback={"Minimum Delay is required"} Valid={Valid} Setter={(record) => props.setRecord(record)} />
                    <Input<EmailType> Type={'number'} Record={props.record} Field={'MaxDelay'} Label={'Maximum Delay'} Feedback={"Maximum Delay is required"} Valid={Valid} Setter={(record) => props.setRecord(record)} />
                    <CheckBox<EmailType> Record={props.record} Field={'SMS'} Label={'Send as a Text'} Setter={(record) => props.setRecord(record)} />
                    <Input<EmailType> Record={props.record} Field={'FilePath'}
                        Label={'File Path'}
                        Help={'If the path is empty the system will not save the notification to a file. Otherwhise the system will save the notification to the specified path with the subject as filename.'}
                        Valid={Valid} Setter={(record) => props.setRecord(record)} />
                </div>
            </div>
            
        </>)
}

export default EmailForm;