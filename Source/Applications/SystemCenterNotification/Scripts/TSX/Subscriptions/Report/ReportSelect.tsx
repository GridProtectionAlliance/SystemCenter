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

interface IProps {
    SetScheduledEmailTypeID: (id: number) => void,
    scheduledEmailTypeID: number
}

const ReportSelect = (props: IProps) => {
    const dispatch = useAppDispatch();
    const emailCategoryStatus = useAppSelector(EmailCategorySlice.Status);
    const emailCategories = useAppSelector(EmailCategorySlice.Data);

    const [selectedCategory, setSelectedCategory] = React.useState<number>(-1);

    const reportTypeStatus = useAppSelector(ScheduledEmailTypeSlice.Status);
    const reportTypes = useAppSelector(ScheduledEmailTypeSlice.Data);
    const reportTypeParentID = useAppSelector(ScheduledEmailTypeSlice.ParentID);

    React.useEffect(() => {
        if (emailCategoryStatus === 'unintiated' || emailCategoryStatus === 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [emailCategoryStatus])

    React.useEffect(() => {
        if (emailCategories.length > 0) {
            const keys = localStorage.getItem("SystemCenter.Notifications.SelectedCategory");
            if (keys == null || emailCategories.findIndex(e => e.ID == parseInt(keys)) < 0)
                setSelectedCategory(emailCategories[0].ID);
            else
                setSelectedCategory(parseInt(keys));

        }
    }, [emailCategories])

    React.useEffect(() => {
        if (selectedCategory !== reportTypeParentID || reportTypeStatus == 'unintiated' || reportTypeStatus == 'changed')
            dispatch(ScheduledEmailTypeSlice.Fetch(selectedCategory));
    }, [selectedCategory, reportTypeParentID, reportTypeStatus])

    React.useEffect(() => {
        if (reportTypes.length > 0)
            props.SetScheduledEmailTypeID(reportTypes[0].ID)
        else
            props.SetScheduledEmailTypeID(-1);
    }, [reportTypes])

    React.useEffect(() => {
        if (selectedCategory !== -1)
            localStorage.setItem("SystemCenter.Notifications.SelectedCategory", selectedCategory.toString());
    }, [selectedCategory]);

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        {emailCategoryStatus == 'loading' ? <LoadingIcon Show={true}/>:
                            <><label> Notification Category </label>
                        <select
                            className="form-control"
                            onChange={(evt) => {
                                setSelectedCategory(parseInt((evt.target.value as any).toString()));
                            }}
                            value={selectedCategory}
                                >
                                    {emailCategories.map((c, i) => c.SelfSubscribe?
                                <option key={i} value={c.ID}>
                                    {c.Name}
                                </option>
                            : null)}
                        </select></>}
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        {reportTypeStatus == 'loading' ? <LoadingIcon Show={true} /> :
                            <><label> Notification Template </label>
                                <select
                                    className="form-control"
                                    onChange={(evt) => {
                                        props.SetScheduledEmailTypeID(parseInt((evt.target.value as any).toString()));
                                    }}
                                    value={props.scheduledEmailTypeID}
                                >
                                    {reportTypes.map((c, i) =>  
                                        <option key={i} value={c.ID}>
                                            {c.Name}
                                        </option>
                                     )}
                                </select></>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReportSelect;