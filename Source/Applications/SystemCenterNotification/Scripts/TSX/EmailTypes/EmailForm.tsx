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

import * as React from 'react';
import { Application } from '@gpa-gemstone/application-typings';
import { IsNumber } from '@gpa-gemstone/helper-functions';
import { CheckBox, Input, Select } from '@gpa-gemstone/react-forms';
import { GenericController } from '@gpa-gemstone/react-interactive';
import { EmailCategory, EmailType } from '../global';

interface IProps { record: EmailType, setRecord: (d: EmailType) => void }

const EmailForm = (props: IProps) => {
    const [emails, setEmails] = React.useState<EmailType[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [categoryStatus, setCategoryStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [categories, setCategories] = React.useState<EmailCategory[]>([]);

    const emailCategoryController = React.useMemo(() => new GenericController<EmailCategory>(`${homePath}api/OpenXDA/EmailCategory`, "Name", true), []);
    const emailTypeController = React.useMemo(() => new GenericController<EmailType>(`${homePath}api/OpenXDA/EmailType`, "Name", true), []);

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
        setStatus('loading')
        const h = emailTypeController.Fetch();
        h.done((d) => {
            setEmails(d)
            setStatus('idle')
        });
        h.fail(() => setStatus('error'));

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [emailTypeController.Fetch]);

    function Valid(field: keyof EmailType) {
        if (field == 'Name')
            return props.record.Name != null && props.record.Name.length != 0 && props.record.Name.length <= 50 && emails.findIndex(e => e.Name == props.record.Name && props.record.ID != e.ID) == -1;
        if (field == 'MinDelay')
            return props.record.MinDelay != null && IsNumber(props.record.MinDelay) && props.record.MinDelay >= 0;
        if (field == 'MaxDelay')
            return props.record.MaxDelay != null && IsNumber(props.record.MaxDelay) && props.record.MaxDelay >= 0;
        if (field == 'FilePath')
            return props.record.FilePath ? props.record.FilePath.length <= 200 : true;
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
                    <CheckBox<EmailType> Record={props.record} Field={'ShowSubscription'} Label={'Allow Self Subscription'} Setter={(record) => props.setRecord(record)}
                        Disabled={!(categories.find(category => category.ID === props.record.EmailCategoryID)?.SelfSubscribe ?? false)}
                        Help={"Category must allow self-subscription to change this setting."} />
                    <CheckBox<EmailType> Record={props.record} Field={'RequireApproval'} Label={'Requires Approval'} Setter={(record) => props.setRecord(record)} />
                </div>
                <div className="col">
                    <Input<EmailType> Type={'number'} Record={props.record} Field={'MinDelay'} Label={'Minimum Delay'} Help={'The amount of time in seconds to delay sending the notification. Used to allow for additional analytics to be run prior to sending the notification.'} Feedback={"Minimum Delay is required"} Valid={Valid} Setter={(record) => props.setRecord(record)} />
                    <Input<EmailType> Type={'number'} Record={props.record} Field={'MaxDelay'} Label={'Maximum Delay'} Help={'The amount of time in seconds to delay sending the notification. Used to allow for additional analytics to be run prior to sending the notification.'} Feedback={"Maximum Delay is required"} Valid={Valid} Setter={(record) => props.setRecord(record)} />
                    <CheckBox<EmailType> Record={props.record} Field={'SMS'} Label={'Send as a Text'} Setter={(record) => props.setRecord(record)} />
                    <Input<EmailType> Record={props.record} Field={'FilePath'}
                        Label={'File Path'}
                        Help={'Specify the path to save this Notification as a file. The subject will be used for the file name. If File Path is left empty, no file will be saved.'}
                        Valid={Valid} Setter={(record) => props.setRecord(record)} />
                </div>
            </div>
            
        </>)
}

export default EmailForm;