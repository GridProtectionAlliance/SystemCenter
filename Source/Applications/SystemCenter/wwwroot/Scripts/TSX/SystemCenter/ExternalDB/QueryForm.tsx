//******************************************************************************************************
//  QueryForm.tsx - Gbtc
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
//  10/25/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';

interface IProps { ExternalDB: OpenXDA.Types.ExternalDataBase, Setter: (externalDBTable: OpenXDA.Types.ExternalDataBase) => void, setErrors?: (e: string[]) => void }

export default function ExternalDBForm(props: IProps) {

    React.useEffect(() => {
        let e = [];
        if (props.ExternalDB.Query != null && props.ExternalDB.Query.length > 200)
            e.push('Query must be less than 200 characters.');
        if (props.setErrors != undefined)
            props.setErrors(e);
    }, [props.ExternalDB]);

    function Valid(field: keyof (OpenXDA.Types.ExternalDataBase)): boolean {
        if (field == 'Query')
            return props.ExternalDB.Query != null && props.ExternalDB.Query.length > 0 && props.ExternalDB.Query.length <= 200;
        return false;
    }


    return (
        <form>
            <TextArea<OpenXDA.Types.ExternalDataBase> Rows={10} Record={props.ExternalDB} Field={'Query'} Feedback={'Query must be greater than 0 characters.'} Valid={Valid} Setter={props.Setter} />
        </form>

    );
}