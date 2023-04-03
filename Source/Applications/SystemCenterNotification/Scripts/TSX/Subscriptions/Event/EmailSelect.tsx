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

import { useAppDispatch, useAppSelector } from '../../hooks';
import * as React from 'react';
import { LoadingIcon } from '@gpa-gemstone/react-interactive'
import { EmailCategorySlice, EmailTypeSlice } from '../../Store';

interface IProps {
    SetEmailTypeID: (id: number) => void,
    emailTypeID: number
}

const EmailSelect = (props: IProps) => {
    const dispatch = useAppDispatch();
    const emailCategoryStatus = useAppSelector(EmailCategorySlice.Status);
    const emailCategories = useAppSelector(EmailCategorySlice.Data);

    const [selectedCategory, setSelectedCategory] = React.useState<number>(-1);

    const emailTypeStatus = useAppSelector(EmailTypeSlice.Status);
    const emailTypes = useAppSelector(EmailTypeSlice.Data);
    const emailTypeParentID = useAppSelector(EmailTypeSlice.ParentID);

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
        if (selectedCategory !== emailTypeParentID || emailTypeStatus == 'unintiated' || emailTypeStatus == 'changed')
            dispatch(EmailTypeSlice.Fetch(selectedCategory));
    }, [selectedCategory, emailTypeParentID, emailTypeStatus])

    React.useEffect(() => {
        if (emailTypes.filter(e => e.ShowSubscription).length > 0)
            props.SetEmailTypeID(emailTypes.filter(e => e.ShowSubscription)[0].ID)
        else
            props.SetEmailTypeID(-1);
    }, [emailTypes])

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
                        {emailTypeStatus == 'loading' ? <LoadingIcon Show={true} /> :
                            <><label> Notification Template </label>
                                <select
                                    className="form-control"
                                    onChange={(evt) => {
                                        props.SetEmailTypeID(parseInt((evt.target.value as any).toString()));
                                    }}
                                    value={props.emailTypeID}
                                >
                                    {emailTypes.map((c, i) => (c.ShowSubscription? 
                                        <option key={i} value={c.ID}>
                                            {c.Name}
                                        </option>
                                     : null))}
                                </select></>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmailSelect;