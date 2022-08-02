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

import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { LoadingIcon } from '@gpa-gemstone/react-interactive'
import { EmailCategorySlice, EmailTypeSlice } from '../Store';

declare var homePath;
declare var version;

interface IProps {
    SetEmailTypeID: (id: number) => void,
    emailTypeID: number
}

const EmailSelect = (props: IProps) => {
    const dispatch = useDispatch();
    const emailCategoryStatus = useSelector(EmailCategorySlice.Status);
    const emailCategories = useSelector(EmailCategorySlice.Data);

    const [selectedCategory, setSelectedCategory] = React.useState<number>(-1);

    const emailTypeStatus = useSelector(EmailTypeSlice.Status);
    const emailTypes = useSelector(EmailTypeSlice.Data);
    const emailTypeParentID = useSelector(EmailTypeSlice.ParentID);

    React.useEffect(() => {
        if (emailCategoryStatus === 'unintiated' || emailCategoryStatus === 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [emailCategoryStatus])

    React.useEffect(() => {
        if (emailCategories.length > 0)
            setSelectedCategory(emailCategories[0].ID);
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
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        {emailCategoryStatus == 'loading' ? <LoadingIcon Show={true}/>:
                            <><label> Category </label>
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
                            <><label> Notification </label>
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