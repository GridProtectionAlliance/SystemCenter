//******************************************************************************************************
//  EmailCategoryForm.tsx - Gbtc
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
import { EmailCategory } from '../global';
import { EmailCategorySlice } from '../Store';
import { CheckBox, Input } from '@gpa-gemstone/react-forms';


interface IProps { record: EmailCategory, setRecord: (d: EmailCategory) => void }

const EmailCategoryForm = (props: IProps) => {
    const dispatch = useAppDispatch();
    const emailCategories = useAppSelector(EmailCategorySlice.Data);
    const status = useAppSelector(EmailCategorySlice.Status);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed')
            dispatch(EmailCategorySlice.Fetch());
    }, [status]);

    return ( 
        <div className="row">
            <div className="col">
                <Input<EmailCategory> Record={props.record} Field={'Name'} Label='Name' Feedback={'A unique Name is required. 50 character limit.'}
                    Valid={() => props.record.Name != null && props.record.Name.length > 0 && props.record.Name.length <= 50 && emailCategories.findIndex(s => s.Name === props.record.Name && s.ID !== props.record.ID) < 0}
                    Setter={(record) => { props.setRecord(record) }}
                />
                <CheckBox<EmailCategory> Record={props.record} Field={'SelfSubscribe'} Label={'Show in Self Subscription'} Setter={(record) => props.setRecord(record)} />
            </div>
        </div>)
}

export default EmailCategoryForm;