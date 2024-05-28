//******************************************************************************************************
//  ReportSelect.tsx - Gbtc
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
//  04/05/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../../hooks';
import * as React from 'react';
import { LoadingIcon } from '@gpa-gemstone/react-interactive'
import { EmailCategorySlice, ScheduledEmailTypeSlice } from '../../Store';
import { Select } from '@gpa-gemstone/react-forms';
import { EmailCategory, ScheduledEmailType } from '../../global';

const emptyReport: ScheduledEmailType = {
    ID: -1,
    EmailCategoryID: 0,
    Name: '',
    Schedule: '',
    Template: '',
    TriggerEmailSQL: '',
    SMS: false,
    FilePath: '',
    ShowSubscription: false,
    RequireApproval: false
};

const emptyCategory = { ID: -1, Name: '', SelfSubscribe: false } as EmailCategory;

interface IProps {
    SetScheduledEmailTypeID: (id: number) => void,
    scheduledEmailTypeID: number
}

const ReportSelect = (props: IProps) => {
    const dispatch = useAppDispatch();
    const emailCategoryStatus = useAppSelector(EmailCategorySlice.Status);
    const emailCategories = useAppSelector(EmailCategorySlice.Data);

    const [selectedCategory, setSelectedCategory] = React.useState<EmailCategory>(emptyCategory);

    const reportTypeStatus = useAppSelector(ScheduledEmailTypeSlice.Status);
    const reportTypes = useAppSelector(ScheduledEmailTypeSlice.Data);
    const reportTypeParentID = useAppSelector(ScheduledEmailTypeSlice.ParentID);

    const [selectedReport, setSelectedReport] = React.useState<ScheduledEmailType>(emptyReport);

    React.useEffect(() => {
        if (emailCategoryStatus === 'unintiated' || emailCategoryStatus === 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [emailCategoryStatus])

    React.useEffect(() => {
        if (emailCategories.length > 0) {
            const keys = localStorage.getItem("SystemCenter.Notifications.SelectedCategory");
            if (keys == null || emailCategories.findIndex(e => e.ID == parseInt(keys)) < 0)
                setSelectedCategory(emailCategories[0]);
            else
                setSelectedCategory(emailCategories.find(e => e.ID == parseInt(keys)));
        }
    }, [])

    React.useEffect(() => {
        if (selectedCategory.ID !== reportTypeParentID || reportTypeStatus == 'unintiated' || reportTypeStatus == 'changed')
            dispatch(ScheduledEmailTypeSlice.Fetch(selectedCategory.ID));
    }, [selectedCategory, reportTypeParentID, reportTypeStatus])

    React.useEffect(() => {
        if (reportTypes.length > 0)
            props.SetScheduledEmailTypeID(reportTypes[0].ID)
        else
            props.SetScheduledEmailTypeID(-1);
    }, [reportTypes])

    React.useEffect(() => {
        if (selectedCategory.ID != -1)
            localStorage.setItem("SystemCenter.Notifications.SelectedCategory", selectedCategory.ID.toString());
    }, [selectedCategory]);

    React.useEffect(() => {
        props.SetScheduledEmailTypeID(selectedReport != null ? selectedReport.ID : -1);
    }, [selectedReport]);


    return (<>
        <LoadingIcon Show={emailCategoryStatus == 'loading' || reportTypeStatus == 'loading'} />
        <div className="row">
            <div className="col">
                <div className="form-group">
                    <Select<EmailCategory> Record={selectedCategory} Field={'ID'} Label='Notification Category' Setter={setSelectedCategory}
                        Options={emailCategories.map((e) => {
                            if (e.SelfSubscribe) return { Label: e.Name, Value: e.ID.toString() }
                        })} />
                </div>
            </div>
            <div className="col">
                <div className="form-group">
                    <Select<ScheduledEmailType> Record={selectedReport} Field={'ID'} Label='Notification Template' Setter={(record) => setSelectedReport({ ...record, ID: typeof record.ID == 'string' ? parseInt(record.ID) : record.ID })}
                        Options={reportTypes.map((e) => { return { Label: e.Name, Value: e.ID.toString() }})} />
                </div>
            </div>
        </div>
    </>);
}

export default ReportSelect;