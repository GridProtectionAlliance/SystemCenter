//******************************************************************************************************
//  CompanyForm.tsx - Gbtc
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
//  10/20/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SystemCenter } from '../global';
import { Input, TextArea,Select } from '@gpa-gemstone/react-forms';
import { SelectCompanyTypes, SelectCompanyTypesStatus, FetchCompanyTypes } from './CompanyTypeSlice';

export default function CompanyForm(props: { Company: SystemCenter.Company, Setter: (company: SystemCenter.Company) => void }) {
    const dispatch = useDispatch();
    const companyTypes = useSelector(SelectCompanyTypes) as SystemCenter.CompanyType[];
    const ctStatus = useSelector(SelectCompanyTypesStatus) as SystemCenter.Status;

    React.useEffect(() => {
        if (ctStatus != 'unintiated') return;

        let promise = dispatch(FetchCompanyTypes());
        return function () {
            if (promise.abort() !== undefined) promise.abort();
        }
    }, [dispatch, ctStatus]);

    function Valid(field: keyof(SystemCenter.Company)): boolean {
        if (field == 'CompanyID')
            return props.Company.CompanyID != null && props.Company.CompanyID.match(/[0-9]{8}/) != null;
        else if (field == 'Name')
            return props.Company.Name == null || props.Company.Name.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }

    return (
        <form>
            <Select<SystemCenter.Company> Record={props.Company} Field="CompanyTypeID" Options={companyTypes.map(ct => ({Value: ct.ID.toString(), Label: ct.Name}))} Setter={props.Setter} />
            <Input<SystemCenter.Company> Record={props.Company} Field={'Name'} Feedback={'Name must be less than 200 characters.'} Valid={Valid} Setter={props.Setter} />
            <Input<SystemCenter.Company> Record={props.Company} Field={'CompanyID'} Feedback={'CompanyID must be 8 numeric characters.'} Valid={Valid} Setter={props.Setter} />
            <TextArea<SystemCenter.Company> Rows={3} Record={props.Company} Field={'Description'} Valid={Valid} Setter={props.Setter} />
        </form>

        );
}