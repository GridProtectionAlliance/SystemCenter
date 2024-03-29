﻿//******************************************************************************************************
//  ChannelGroupForm.tsx - Gbtc
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
//  07/07/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Input, TextArea } from '@gpa-gemstone/react-forms';

export default function ChannelGroupForm(props: { Record: SystemCenter.Types.ChannelGroup, Setter: (record: SystemCenter.Types.ChannelGroup) => void, setErrors?: (e: string[]) => void }) {
    function Valid(field: keyof (SystemCenter.Types.ChannelGroup)): boolean {
        if (field == 'Name')
            return props.Record.Name != null && props.Record.Name.length > 0 && props.Record.Name.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }

    return (
        <form>
            <Input<SystemCenter.Types.ChannelGroup> Record={props.Record} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={Valid} Setter={props.Setter} />
            <TextArea<SystemCenter.Types.ChannelGroup> Rows={3} Record={props.Record} Field={'Description'} Valid={Valid} Setter={props.Setter} />
        </form>

    );
}