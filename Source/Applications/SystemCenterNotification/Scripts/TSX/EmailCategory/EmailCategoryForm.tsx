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

import * as React from 'react';
import { EmailCategory } from '../global';
import { CheckBox, Input } from '@gpa-gemstone/react-forms';
import { GenericController } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';


interface IProps { record: EmailCategory, setRecord: (d: EmailCategory) => void }

const EmailCategoryForm = (props: IProps) => {
    const [emailCategories, setEmailCategories] = React.useState<EmailCategory[]>([]);
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated');

    React.useEffect(() => {
        setStatus('loading')
        const h = new GenericController<EmailCategory>(`${homePath}api/OpenXDA/EmailCategory`, "Name", true).Fetch();
        h.done((d) => {
            setEmailCategories(d)
            setStatus('idle')
        });
        h.fail(() => setStatus('error'));

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, []);

    return ( 
        <div className="row">
            <div className="col">
                <Input<EmailCategory> Record={props.record} Field={'Name'} Label='Name' Feedback={'A unique Name of less than 50 characters is required.'}
                    Valid={() => props.record.Name != null && props.record.Name.length > 0 && props.record.Name.length <= 50 && emailCategories.findIndex(s => s.Name === props.record.Name && s.ID !== props.record.ID) < 0}
                    Setter={(record) => { props.setRecord(record) }}
                />
                <CheckBox<EmailCategory> Record={props.record} Field={'SelfSubscribe'} Label={'Show in Self Subscription'} Setter={(record) => props.setRecord(record)} />
            </div>
        </div>)
}

export default EmailCategoryForm;