//******************************************************************************************************
//  ExternalDBForm.tsx - Gbtc
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
//  11/4/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Input, TextArea, CheckBox } from '@gpa-gemstone/react-forms';

export default function ExternalDBForm(props: { Record: SystemCenter.Types.ExternalDatabases, Setter: (record: SystemCenter.Types.ExternalDatabases) => void, setErrors?: (e: string[]) => void }) {

    const [showDataProvider, setShowDataProvider] = React.useState<boolean>(false);

    function Valid(field: keyof (SystemCenter.Types.ExternalDatabases)): boolean {
        if (field == 'Name')
            return props.Record.Name != null && props.Record.Name.length > 0 && props.Record.Name.length <= 200;
        else if (field == 'Schedule')
            return props.Record.Schedule != null && props.Record.Schedule.length > 0 && props.Record.Schedule.length <= 50;
        else if (field == 'ConnectionString' || field == 'DataProviderString')
            return true;
        return false;
    }

    function DataProvider() {
        if (showDataProvider) {
            return <TextArea<SystemCenter.Types.ExternalDatabases> Rows={3} Record={props.Record} Field={'DataProviderString'} Valid={Valid} Setter={props.Setter} />
        }

        return null;
    }

    React.useEffect(() => {
        setShowDataProvider(props.Record.Encrypt);
    }, [props.Record.Encrypt]);


    return (
        <form>
            <Input<SystemCenter.Types.ExternalDatabases> Record={props.Record} Field={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={Valid} Setter={props.Setter} />
            <Input<SystemCenter.Types.ExternalDatabases> Record={props.Record} Field={'Schedule'} Feedback={'A Schedule of less than 50 characters is required.'} Valid={Valid} Setter={props.Setter} />
            <TextArea<SystemCenter.Types.ExternalDatabases> Rows={3} Record={props.Record} Field={'ConnectionString'} Valid={Valid} Setter={props.Setter} />
            <CheckBox<SystemCenter.Types.ExternalDatabases> Record={props.Record} Field={'Encrypt'} Label={'Encrypted'} Setter={props.Setter} />
            <br/>
            {DataProvider()}
        </form>
    );
}
