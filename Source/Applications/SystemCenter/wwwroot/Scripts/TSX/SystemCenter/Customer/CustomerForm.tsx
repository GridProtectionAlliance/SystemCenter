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
import { useAppSelector, useAppDispatch } from '../hooks';
import { CustomerSlice } from '../Store/Store';
import { Input, Select, TextArea, CheckBox } from '@gpa-gemstone/react-forms';
import {
    FetchPQIFacilities, FetchPQIAddresses, FetchPQICompanies,
    SelectAddresses, SelectAddressStatus, SelectCompanies,
    SelectCompaniesStatus, SelectFacilities, SelectFacilityStatus,
    Address, Facility
} from '../Store/PQISlice';
import { cache } from 'webpack';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;

interface IProps { Customer: OpenXDA.Types.Customer, stateSetter: (customer: OpenXDA.Types.Customer) => void, setErrors?: (e: string[]) => void }

interface IPQISetup { Company: number, Address: number }

export default function CustomerForm(props: IProps) {
    const dispatch = useAppDispatch();

    const [errors, setErrors] = React.useState<string[]>([]);
    const allCustomerKeys = useAppSelector(CustomerSlice.Data) as OpenXDA.Types.Customer[];
    const acStatus = useAppSelector(CustomerSlice.Status) as Application.Types.Status;

    const pqiFacilityStatus = useAppSelector(SelectFacilityStatus);
    const pqiFacilities = useAppSelector(SelectFacilities);

    const pqiCompanyStatus = useAppSelector(SelectCompaniesStatus);
    const pqiCompanies = useAppSelector(SelectCompanies);

    const pqiAddressStatus = useAppSelector(SelectAddressStatus);
    const pqiAddresses = useAppSelector(SelectAddresses);

    const [pqiSetup, setPQISetup] = React.useState<IPQISetup>({ Company: -1, Address: -1 });

    const roles = useAppSelector(SelectRoles);

    const pqiAvailableAddress = React.useMemo(() => {
        if (pqiSetup.Company == -1)
            return pqiAddresses;
        return pqiAddresses.filter((a) => parseInt(pathToID(a.Company)) == pqiSetup.Company);
    }, [pqiSetup.Company, pqiAddresses]);


    const pqiAvailableFacilities = React.useMemo(() => {
        if (pqiSetup.Address == -1)
            return pqiFacilities;
        return pqiFacilities.filter((a) => parseInt(pathToID(a.Address)) == pqiSetup.Address);
    }, [pqiSetup.Address, pqiFacilities]);



    React.useEffect(() => {
        if (pqiFacilityStatus == 'unintiated' || pqiFacilityStatus == 'changed')
            dispatch(FetchPQIFacilities());
    }, [pqiFacilityStatus])

    React.useEffect(() => {
        if (pqiAddressStatus == 'unintiated' || pqiAddressStatus == 'changed')
            dispatch(FetchPQIAddresses());
    }, [pqiAddressStatus])

    React.useEffect(() => {
        if (pqiCompanyStatus == 'unintiated' || pqiCompanyStatus == 'changed')
            dispatch(FetchPQICompanies());
    }, [pqiCompanyStatus])

    React.useEffect(() => {
        if (acStatus == 'changed' || acStatus == 'unintiated')
            dispatch(CustomerSlice.Fetch());
    }, [])

    React.useEffect(() => {
        if (props.Customer.PQIFacilityID != -1 && pqiAddresses.length > 0 && pqiCompanies.length > 0) {
            const facility = pqiFacilities.find((d) => parseInt(pathToID(d.Path)) == props.Customer.PQIFacilityID);
            if (facility == null) {
                setPQISetup({ Address: -1, Company: -1 });
                return;
            }
            const address = pqiAddresses.find((a) => parseInt(pathToID(a.Path)) == parseInt(pathToID(facility.Address)));
            if (address == null) {
                setPQISetup({ Address: -1, Company: -1 });
                return;
            }
            const company = pqiCompanies.find((c) => parseInt(pathToID(c.Path)) == parseInt(pathToID(address.Company)))
            if (company == null) {
                setPQISetup({ Address: parseInt(pathToID(address.Path)), Company: -1 });
                return;
            }
            setPQISetup({ Address: parseInt(pathToID(address.Path)), Company: parseInt(pathToID(company.Path)) });
        }

    }, [props.Customer.PQIFacilityID, pqiAddresses, pqiCompanies]);

    function pathToID(path: string) {
        let id = path.substr(path.lastIndexOf('/') + 1);
        return id;
    }

    React.useEffect(() => {
        let e = [];
        if (props.Customer.CustomerKey == null || props.Customer.CustomerKey.length == 0)
            e.push('A Key is required.')
        if (props.Customer.CustomerKey != null && props.Customer.CustomerKey.length > 25)
            e.push('Key must be less than 25 characters.')
        if (allCustomerKeys.findIndex(c => c.CustomerKey == props.Customer.CustomerKey && c.ID != props.Customer.ID) > -1)
            e.push('Key must be unique.')
        if (props.Customer.Name != null && props.Customer.Name.length > 100)
            e.push('Name must be less than 100 characters.')
        if (props.Customer.Phone != null && props.Customer.Phone.length > 20)
            e.push('Phone must be less than 20 characters.')
        if (props.Customer.Description != null && props.Customer.Description.length > 200)
            e.push('Description must be less than 200 characters.')
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
        return true;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
            return false;
        return true;
    }

    const hasPQI = (pqiFacilityStatus == 'idle' && pqiAddressStatus == 'idle' && pqiCompanyStatus == 'idle');
    return (
        <div className="col">
            <Input<OpenXDA.Types.Customer> Record={props.Customer} Field={'CustomerKey'} Label='Key' Feedback={'A unique Key of less than 25 characters is required.'} Valid={valid} Setter={(record) => props.stateSetter(record)} Disabled={!hasPermissions()} />
            <Input<OpenXDA.Types.Customer> Record={props.Customer} Field={'Name'} Label='Name' Feedback={'Name must be less than 100 characters.'} Valid={valid} Setter={(record) => props.stateSetter(record)} Disabled={!hasPermissions()} />
            <Input<OpenXDA.Types.Customer> Record={props.Customer} Field={'Phone'} Label='Phone' Feedback={'Phone must be less than 20 characters.'} Valid={valid} Setter={(record) => props.stateSetter(record)} Disabled={!hasPermissions()} />
            {hasPQI ?
                <>
                    <Select<IPQISetup>
                        Record={pqiSetup}
                        Label={'PQI Company'}
                        Field={'Company'}
                        Setter={(record) => setPQISetup(record)}
                        Options={[...pqiCompanies.map((f) => ({ Label: f.Name, Value: pathToID(f.Path) })), { Label: 'None', Value: '-1' }]}
                        Disabled={!hasPermissions()}
                    />
                    <Select<IPQISetup>
                        Record={pqiSetup}
                        Label={'PQI Address'}
                        Field={'Address'}
                        Setter={(record) => setPQISetup(record)}
                        Options={[...pqiAvailableAddress.map((f) => ({
                            Label: `${f.AddressLine1 ?? ''} ${f.AdressLine2 ?? ''} ${f.City ?? ''}, ${f.Country ?? ''}`, Value: pathToID(f.Path)
                        })),
                            { Label: 'None', Value: '-1' }]} Disabled={!hasPermissions()}/>
                    <Select<OpenXDA.Types.Customer>
                        Record={props.Customer}
                        Label={'PQI Facility'}
                        Field={'PQIFacilityID'}
                        Setter={(record) => props.stateSetter(record)}
                        Options={[...pqiAvailableFacilities.map((f) => ({ Label: f.Name, Value: pathToID(f.Path) })), { Label: 'None', Value: '-1' }]}
                        Disabled={!hasPermissions()}
                    />
                </> :
                <div className="alert alert-warning" role="alert">
                    System is unable to connect to PQI.
                </div>
                }
            <TextArea<OpenXDA.Types.Customer> Rows={3} Record={props.Customer} Field={'Description'} Feedback={'Description must be less than 200 characters.'} Valid={valid} Setter={(record) => props.stateSetter(record)} Disabled={!hasPermissions()} />
            <CheckBox Record={props.Customer} Field={'LSCVS'} Setter={(record) => props.stateSetter(record)} Label={'LSCVS Customer'} Disabled={!hasPermissions()} />
        </div>
    )

}
