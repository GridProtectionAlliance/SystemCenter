//******************************************************************************************************
//  EmailSelect.tsx - Gbtc
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

import { Select } from '@gpa-gemstone/react-forms';
import { GenericController, LoadingIcon } from '@gpa-gemstone/react-interactive';
import * as $ from 'jquery';
import * as React from 'react';
import { EmailTypeSlice } from '../../Store';
import { EmailCategory, EmailType } from '../../global';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Application } from '@gpa-gemstone/application-typings';


const emptyEmailType: EmailType = {
    ID: -1,
    EmailCategoryID: 0,
    Name: '',
    Template: '',
    TriggerEmailSQL: '',
    CombineEventsSQL: '',
    MinDelay: 0,
    MaxDelay: 0,
    SMS: false,
    ShowSubscription: false,
    RequireApproval: false,
    FilePath: ''
} as EmailType;

const emptyCategory: EmailCategory = { ID: -1, Name: '', SelfSubscribe: false };

interface IProps {
    SetEmailTypeID: (id: number) => void,
    emailTypeID: number
}

const EmailSelect = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [emailCategories, setEmailCategories] = React.useState<EmailCategory[]>([]);
    const [emailCategoryStatus, setEmailCategoryStatus] = React.useState<Application.Types.Status>('unintiated');
    const [selectedCategory, setSelectedCategory] = React.useState<EmailCategory>(emptyCategory);

    const emailTypeStatus = useAppSelector(EmailTypeSlice.Status);
    const emailTypes = useAppSelector(EmailTypeSlice.Data);
    const emailTypeParentID = useAppSelector(EmailTypeSlice.ParentID);

    const [selectedEmailType, setSelectedEmailType] = React.useState<EmailType>(emptyEmailType);

    React.useEffect(() => {
        setEmailCategoryStatus('loading')
        const handle = $.ajax<EmailCategory[]>({
            type: "GET",
            url: `${homePath}api/OpenXDA/EmailCategory/SubscribeDropdown/Event`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(categories => {
            setEmailCategories(categories);
            setEmailCategoryStatus('idle');
        });

        return () => { if (handle?.abort != null) handle.abort(); }
    }, []);

    React.useEffect(() => {
        if (emailCategories.length > 0) {
            const keys = localStorage.getItem("SystemCenter.Notifications.SelectedCategory");
            if (keys == null || emailCategories.findIndex(e => e.ID == parseInt(keys)) < 0)
                setSelectedCategory(emailCategories[0]);
            else
                setSelectedCategory(emailCategories.find(e => e.ID == parseInt(keys)));

        }
    }, [emailCategories]);

    React.useEffect(() => {
        if (selectedCategory.ID != emailTypeParentID || emailTypeStatus == 'unintiated' || emailTypeStatus == 'changed')
            dispatch(EmailTypeSlice.Fetch(selectedCategory.ID));
    }, [selectedCategory, emailTypeParentID, emailTypeStatus])

    React.useEffect(() => {
        if (emailTypes.filter(e => e.ShowSubscription).length > 0)
            props.SetEmailTypeID(emailTypes.filter(e => e.ShowSubscription)[0].ID)
        else
            props.SetEmailTypeID(-1);
    }, [emailTypes])

    React.useEffect(() => {
        if (selectedCategory.ID != -1)
            localStorage.setItem("SystemCenter.Notifications.SelectedCategory", selectedCategory.ID.toString());
    }, [selectedCategory]);

    React.useEffect(() => {
        props.SetEmailTypeID(selectedEmailType != null ? selectedEmailType.ID : -1);
    }, [selectedEmailType]);

    return (<>
        <LoadingIcon Show={emailCategoryStatus == 'loading' || emailTypeStatus == 'loading'} />
        <div className="col">
            <Select<EmailCategory> Record={selectedCategory} Field={'ID'} Label='Notification Category' Setter={(record) => setSelectedCategory({ ...record, ID: typeof record.ID == 'string' ? parseInt(record.ID) : record.ID })}
                Options={emailCategories
                    .map((e) => ({ Label: e.Name, Value: e.ID.toString() }))
                } />
            <Select<EmailType> Record={selectedEmailType} Field={'ID'} Label='Notification Template' Setter={(record) => setSelectedEmailType({ ...record, ID: typeof record.ID == 'string' ? parseInt(record.ID) : record.ID })}
                Options={emailTypes
                    .filter(e => e.ShowSubscription)
                    .map((e) => ({ Label: e.Name, Value: e.ID.toString() }))
                } />
        </div>
    </>);
}

export default EmailSelect;