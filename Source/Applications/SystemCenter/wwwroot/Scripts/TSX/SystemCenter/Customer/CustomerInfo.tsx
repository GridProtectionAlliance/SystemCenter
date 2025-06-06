﻿//******************************************************************************************************
//  ConnectionInfo.tsx - Gbtc
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
import CustomerForm from './CustomerForm';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { OpenXDA } from '@gpa-gemstone/application-typings'
import AdditionalFieldsProperties from '../CommonComponents/AdditionalFieldsProperties';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

interface IProps { Customer: OpenXDA.Types.Customer, stateSetter: (customer: OpenXDA.Types.Customer) => void }


export default function CustomerInfo(props: IProps) {
    const [customer, setCustomer] = React.useState<OpenXDA.Types.Customer>(props.Customer);
    const [warnings, setWarning] = React.useState<string[]>([]);
    const [errors, setError] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('None' | 'Clear' | 'Submit')>('None');
    const roles = useAppSelector(SelectRoles);

    const saveAddl = React.useRef<() => Promise<void>>(undefined);
    const resetAddl = React.useRef<() => void>(undefined);
    const [addlFieldChanged, setAddlFieldChanged] = React.useState<string[]>([]);
    const [addlFieldError, setAddlFieldError] = React.useState<string[]>([]);

    React.useEffect(() => {
        setCustomer(props.Customer)
    },[props.Customer])

    React.useEffect(() => {
        let w = [];
        if (customer.CustomerKey != props.Customer.CustomerKey)
            w.push('Changes to Key will be lost.')
        if (customer.Name != props.Customer.Name)
            w.push('Changes to Name will be lost.')
        if (customer.Phone != props.Customer.Phone)
            w.push('Changes to Phone will be lost.')
        if (customer.Description != props.Customer.Description)
            w.push('Changes to Description will be lost.')
        if (customer.LSCVS != props.Customer.LSCVS)
            w.push('Changes to LSCVS Status will be lost.')
        if (customer.PQIFacilityID != props.Customer.PQIFacilityID)
            w.push('Changes to PQI Facility will be lost.')
        setWarning(w);
    }, [customer, props.Customer])

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Customer Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                <CustomerForm Customer={customer} stateSetter={setCustomer} setErrors={setError} />
                <AdditionalFieldsProperties ID={customer.ID} ParentTable={'Customer'} AddlFieldSaveRef={saveAddl} SetChangedList={setAddlFieldChanged} SetErrorList={setAddlFieldError} ResetAddlFieldRef={resetAddl} SingleColumn={true} />
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (((warnings.length == 0 && addlFieldChanged.length === 0) || errors.length > 0 || addlFieldError.length > 0) ? ' disabled' : '')} onClick={() => {
                        if ((warnings.length > 0 || addlFieldChanged.length > 0) && errors.length == 0 && addlFieldError.length === 0) {
                            props.stateSetter(customer);
                            if (saveAddl.current != null) saveAddl.current();
                        }
                    }}
                        onMouseEnter={() => setHover('Submit')} onMouseLeave={() => setHover('None')} data-tooltip={"Update"}
                    >Save Changes</button>
                </div>
                <ToolTip Show={hover == 'Submit' && (errors.length > 0 || addlFieldError.length > 0)} Position={'top'} Target={"Update"}>
                    {errors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
                    {addlFieldError.map((t, i) => <p key={`a_${i}`}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
                </ToolTip>
                <ToolTip Show={hover == 'Submit' && !hasPermissions()} Position={'top'} Target={"Update"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className="btn btn-warning" onClick={() => {
                        if (warnings.length > 0) setCustomer(props.Customer);
                        if (resetAddl.current !== undefined) resetAddl.current();
                    }
                    } disabled={warnings.length == 0 && addlFieldChanged.length === 0}
                        onMouseEnter={() => setHover('Clear')} onMouseLeave={() => setHover('None')} data-tooltip={"Clr"}
                    >Clear Changes</button>
                </div>
                <ToolTip Show={hover == 'Clear' && (warnings.length > 0 || addlFieldChanged.length > 0)} Position={'top'} Target={"Clr"}>
                    {warnings.map((t, i) => <p key={i}><ReactIcons.Warning Color="var(--warning)" /> {t}</p>)}
                    {addlFieldChanged.map((t, i) => <p key={`a_${i}`}><ReactIcons.Warning Color="var(--warning)" /> {t}</p>)}
                </ToolTip>
            </div>


        </div>
    );

}