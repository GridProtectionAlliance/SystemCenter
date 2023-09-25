﻿//******************************************************************************************************
//  EventTagForm.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  07/31/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { EventTagSlice } from '../Store/Store';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { Input, TextArea, CheckBox } from '@gpa-gemstone/react-forms';

export default function EventTagForm(props: { Record: OpenXDA.Types.EventTag, Setter: (record: OpenXDA.Types.EventTag) => void, setErrors?: (e: string[]) => void }) {
    const dispatch = useAppDispatch();

    const allTags = useAppSelector(EventTagSlice.Data);
    const allTagsStatus = useAppSelector(EventTagSlice.Status);

    React.useEffect(() => {
        if (allTagsStatus == 'unintiated' || allTagsStatus == 'changed')
            dispatch(EventTagSlice.Fetch());
    }, [allTagsStatus]);

    function Valid(field: keyof (OpenXDA.Types.EventTag)): boolean {
        if (field == 'Name')
            return props.Record.Name != null && props.Record.Name.length > 0 && props.Record.Name.length <= 200
                    && allTags.findIndex((t) => t.Name.toLowerCase() === props.Record.Name?.toLowerCase() && t.ID !== props.Record.ID) === -1;
        else if (field == 'Description')
            return true;
        return false;
    }

    return (
        <form>
            <Input<OpenXDA.Types.EventTag> Record={props.Record} Field={'Name'} Feedback={'A unique Name of less than 200 characters is required.'} Valid={Valid} Setter={props.Setter} />
            <TextArea<OpenXDA.Types.EventTag> Rows={3} Record={props.Record} Field={'Description'} Valid={Valid} Setter={props.Setter} />
            <CheckBox<OpenXDA.Types.EventTag> Record={props.Record} Field={'ShowInFilter'} Label={'Show in Filter'} Setter={props.Setter} />
        </form>

    );
}