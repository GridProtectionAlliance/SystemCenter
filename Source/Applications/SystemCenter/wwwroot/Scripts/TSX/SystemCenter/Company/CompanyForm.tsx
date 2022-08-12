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
import { useAppSelector, useAppDispatch } from '../hooks';
import { Input, TextArea, Select } from '@gpa-gemstone/react-forms';
import { CompanyTypeSlice, CompanySlice } from '../Store/Store';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';

interface IProps { Company: OpenXDA.Types.Company, Setter: (company: OpenXDA.Types.Company) => void, setErrors?: (e: string[]) => void }

export default function CompanyForm(props: IProps) {

    const dispatch = useAppDispatch();
    const companyTypes = useAppSelector(CompanyTypeSlice.Data) as OpenXDA.Types.CompanyType[];
    const companies = useAppSelector(CompanySlice.Data) as OpenXDA.Types.Company[];

    const ctStatus = useAppSelector(CompanyTypeSlice.Status) as Application.Types.Status;
    const cStatus = useAppSelector(CompanySlice.Status) as Application.Types.Status;

    React.useEffect(() => {
        let e = [];
        if (props.Company.CompanyID == null || props.Company.CompanyID.match(/[0-9, a-z, A-Z]{8}/) == null || props.Company.CompanyID.length > 8)
            e.push('CompanyID must be a 8 character alphanumeric Identifier.');
        if (props.Company.CompanyID !== null && props.Company.CompanyID.match(/[0-9, a-z, A-Z]{8}/) != null && props.Company.CompanyID.length == 8 && companies.findIndex(c => c.CompanyID == props.Company.CompanyID && c.ID != props.Company.ID) > -1)
            e.push('CompanyID must be unique.')
        if (props.Company.Name == null || props.Company.Name.length == 0)
            e.push('A name is required.');
        if (props.Company.Name != null && props.Company.Name.length > 200)
            e.push('Company Name must be less than 200 characters.');
        
        if (props.setErrors != undefined)
            props.setErrors(e);
    }, [props.Company]);

    React.useEffect(() => {
        if (ctStatus == 'unintiated' || ctStatus == 'changed') 
            dispatch(CompanyTypeSlice.Fetch());
    }, []);

    React.useEffect(() => {
        if (cStatus == 'unintiated' || cStatus == 'changed')
            dispatch(CompanySlice.Fetch());
    }, []);



    React.useEffect(() => {
        if (companyTypes.length == 0)
            return;

        if (props.Company.CompanyTypeID == 0)
            props.Setter({ ...props.Company, CompanyTypeID: companyTypes[0].ID })
    }, [companyTypes, props.Company])


    function Valid(field: keyof(OpenXDA.Types.Company)): boolean {
        if (field == 'CompanyID')
            return props.Company.CompanyID != null && props.Company.CompanyID.match(/[0-9,a-z,A-Z]{8}/) != null && props.Company.CompanyID.length < 9;
        else if (field == 'Name')
            return props.Company.Name != null && props.Company.Name.length > 0 && props.Company.Name.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }


    return (
        <form>
            <Select<OpenXDA.Types.Company> Record={props.Company} Label={'Company Type'} Field="CompanyTypeID" Options={companyTypes.map(ct => ({Value: ct.ID.toString(), Label: ct.Name}))} Setter={props.Setter} />
            <Input<OpenXDA.Types.Company> Record={props.Company} Field={'Name'} Feedback={'Name must be less than 200 characters.'} Valid={Valid} Setter={props.Setter} />
            <Input<OpenXDA.Types.Company> Record={props.Company} Field={'CompanyID'} Feedback={'CompanyID must be 8 alphanumeric characters.'} Valid={Valid} Setter={props.Setter} />
            <TextArea<OpenXDA.Types.Company> Rows={3} Record={props.Company} Field={'Description'} Valid={Valid} Setter={props.Setter} />
        </form>

        );
}