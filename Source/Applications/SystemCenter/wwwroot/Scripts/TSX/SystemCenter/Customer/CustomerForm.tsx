//******************************************************************************************************
//  CustomerForm.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  09/11/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings'
import { useSelector, useDispatch } from 'react-redux';
import { CustomerSlice } from '../Store/Store';


import { CheckBox, Input, TextArea } from '@gpa-gemstone/react-forms';
declare var homePath: string;

interface IProps { Customer: OpenXDA.Types.Customer, stateSetter: (customer: OpenXDA.Types.Customer) => void, setErrors?: (e: string[]) => void }


export default function CustomerForm(props: IProps) {
    const dispatch = useDispatch();

    const [errors, setErrors] = React.useState<string[]>([]);
    const allCustomerKeys = useSelector(CustomerSlice.Data) as OpenXDA.Types.Customer[];
    const acStatus = useSelector(CustomerSlice.Status) as Application.Types.Status;

    React.useEffect(() => {
        if (acStatus == 'changed' || acStatus == 'unintiated')
            dispatch(CustomerSlice.Fetch());
    }, [])

    React.useEffect(() => {
        let e = [];
        if (props.Customer.CustomerKey == null || props.Customer.CustomerKey.length == 0)
            e.push('A Customer Key is required.')
        if (props.Customer.CustomerKey != null && props.Customer.CustomerKey.length > 25)
            e.push('The Customer Key needs to be less than 25 characters.')
        if (allCustomerKeys.findIndex(c => c.CustomerKey == props.Customer.CustomerKey && c.ID != props.Customer.ID) > -1)
            e.push('The Customer Key needs to be unique.')
        if (props.Customer.Name != null && props.Customer.Name.length > 100)
            e.push('The Name to be less than 100 characters.')
        if (props.Customer.Phone != null && props.Customer.Phone.length > 20)
            e.push('The Phone Number to be less than 20 characters.')
        if (props.Customer.Description != null && props.Customer.Description.length > 200)
            e.push('The Description to be less than 200 characters.')
        setErrors(e);
    }, [props.Customer, allCustomerKeys])

    React.useEffect(() => {
        if (props.setErrors != undefined)
            props.setErrors(errors);
    }, [props.setErrors, errors])

    function valid(field: keyof(OpenXDA.Types.Customer)): boolean {
        if (field == 'CustomerKey')
            return props.Customer.CustomerKey != null && props.Customer.CustomerKey.length > 0 && props.Customer.CustomerKey.length <= 25;
        else if (field == 'Name')
            return props.Customer.Name == null || props.Customer.Name.length <= 100;
        else if (field == 'Phone')
            return props.Customer.Phone == null || props.Customer.Phone.length <= 20;
        else if (field == 'Description')
            return props.Customer.Description == null || props.Customer.Description.length <= 200;
        return false;
    }

    
    return (<div className="row" style={{marginLeft: 0}}>
        <div className="col">
            <Input<OpenXDA.Types.Customer> Record={props.Customer} Field={'CustomerKey'} Feedback={'CustomerKey of less than 25 characters is required.'} Valid={valid} Setter={(record) => props.stateSetter(record)} />
            <Input<OpenXDA.Types.Customer> Record={props.Customer} Field={'Name'} Feedback={'Name must be less than 100 characters.'} Valid={valid} Setter={(record) => props.stateSetter(record)} />
            <Input<OpenXDA.Types.Customer> Record={props.Customer} Field={'Phone'} Feedback={'Phone must be less than 20 characters.'} Valid={valid} Setter={(record) => props.stateSetter(record)} />
            <TextArea<OpenXDA.Types.Customer> Rows={3} Record={props.Customer} Field={'Description'} Feedback={'Description must be less than 200 characters.'} Valid={valid} Setter={(record) => props.stateSetter(record)} />
            <CheckBox Record={props.Customer} Field={'LSCVS'} Setter={(record) => props.stateSetter(record)} Label={'LSCVS'} />
        </div>

    </div>)

}
