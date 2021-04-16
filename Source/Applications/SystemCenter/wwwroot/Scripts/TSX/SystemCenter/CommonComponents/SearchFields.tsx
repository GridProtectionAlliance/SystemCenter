//******************************************************************************************************
//  SearchFields.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  04/15/2021 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import {SystemCenter, OpenXDA } from '../global';

export namespace SearchFields {
    const Customer = [];

    export const Company = [
        { label: 'Name', key: 'Name', type: 'string' },
        { label: 'CompanyID', key: 'CompanyID', type: 'string' },
        { label: 'Description', key: 'Description', type: 'string' },
        { label: 'Company Type', key: 'CompanyTypeID', type: 'enum' },
    ];

}

export namespace DefaultSearchField {
    export const Company = { label: 'Name', key: 'Name', type: 'string' };
    const Customer = { label: 'Name', key: 'Name', type: 'string' };
}

export namespace TransformSearchFields {
    export function Company(search) {
        return search.map(s => {
            if (SearchFields.Company.findIndex(item => item.key == s.FieldName) == -1)
                return { ...s, isPivotColumn: true };
            else
                return s;
        })
    }

    function Customer() {}
}