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
    export const Customer = [
        { label: 'Account Name', key: 'CustomerKey', type: 'string' },
        { label: 'Name', key: 'Name', type: 'string' },
        { label: 'Phone', key: 'Phone', type: 'string' },
        { label: 'Description', key: 'Description', type: 'string' },
        { label: 'PQView Site Name', key: 'PQViewSite', type: 'string' },
        { label: 'Number of Assigned Meters', key: 'Meters', type: 'integer' },
    ];

    export const Company = [
        { label: 'Name', key: 'Name', type: 'string' },
        { label: 'CompanyID', key: 'CompanyID', type: 'string' },
        { label: 'Description', key: 'Description', type: 'string' },
        { label: 'Company Type', key: 'CompanyTypeID', type: 'enum' },
    ];

}

export namespace DefaultSearchField {
    export const Company = { label: 'Name', key: 'Name', type: 'string' };
    export const Customer = { label: 'Account Name', key: 'CustomerKey', type: 'string' };
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

    export function Customer(search) {
        const pqViewQuery = '(SELECT Customer.ID FROM PQViewSite LEFT JOIN [systemCenter.CustomerAccess] ON' +
            '[systemCenter.CustomerAccess].PQViewSiteID = PQViewSite.ID LEFT JOIN Customer C ON C.ID = [systemCenter.CustomerAccess].CustomerID WHERE ' + 
        ' PQViewSite.Name '

        let afv = search.map(s => {
            if (s.key == 'PQViewSite') {
                let text: string = s.SearchText;
                if (text.length == 0)
                    text = '%';
                text.replace('*', '%');
                text = "'" + text + "'";
                return { FieldName: 'ID', SearchText: pqViewQuery + s.Operator + text + ' )', Operator: 'IN', Type: 'number', isPivotColumn: false }
            }
                
            if (SearchFields.Company.findIndex(item => item.key == s.FieldName) == -1)
                return { ...s, isPivotColumn: true };
            else
                return s;
        });

        return afv;

    }
}