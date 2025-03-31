//******************************************************************************************************
//  ByCustomer.tsx - Gbtc
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
//  02/04/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { Modal, GenericController } from '@gpa-gemstone/react-interactive';
import CustomerForm from './CustomerForm';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import GenericByPage from '../CommonComponents/GenericByPage';
import { SystemCenter as SC } from '../global';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';

declare var homePath: string;

const fieldCols: SC.IByCol<OpenXDA.Types.Customer>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: '15%' },
    { Field: 'CustomerKey', Label: 'Key', Type: 'string', Width: '15%' },
    { Field: 'Phone', Label: 'Phone', Type: 'string', Width: '10%' },
    { Field: 'Description', Label: 'Description', Type: 'string', Width: 'auto' },
    { Field: 'LSCVS', Label: 'LSCVS', Type: 'boolean', Width: 'auto' }
];

const controllerPath = `${homePath}api/SystemCenter/Customer`;


const CustomerController = new GenericController<OpenXDA.Types.Customer>(`${homePath}api/SystemCenter/Customer`, "CustomerKey", false);
const emptyCustomer: OpenXDA.Types.Customer = { ID: 0, CustomerKey: '', Name: '', Phone: '', Description: '', LSCVS: false, PQIFacilityID: -1 };

const ByCustomer: Application.Types.iByComponent = (props) => {
    let navigate = useNavigate();
    const extDbUpdateAll = React.useRef<() => (() => void)>(undefined);

    const [newCustomer, setNewCustomer] = React.useState<OpenXDA.Types.Customer>(emptyCustomer);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [showEXTModal, setShowExtModal] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);
    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=Customer&CustomerID=${item.row.ID}`);
    }

    return (
        <GenericByPage<OpenXDA.Types.Customer>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='Name'
            PagingID='ByCustomer'
            OnClick={(item) => { handleSelect(item); }}
            Columns={fieldCols}
            DefaultSearchAscending={true} DefaultSearchKey='Name'
            QueryAdditionalFields={() => 
                $.ajax({
                    type: "GET",
                    url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/Customer/FieldName/0`,
                    contentType: "application/json; charset=utf-8",
                    cache: false,
                    async: true
                }) }
        >
            <li className="nav-item" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0} style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <div className="form-group">
                        <button className="btn btn-info btn-block" onClick={(event) => {
                            event.preventDefault();
                            setNewCustomer(emptyCustomer);
                            setShowModal(true);
                        }}>Add Customer</button>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-info btn-block"
                            onClick={(event) => { event.preventDefault(); setShowExtModal(true); }}>External Database</button>
                    </div>
                </fieldset>
            </li>
            <Modal Show={showModal} Title={'Add New Customer'} CallBack={(c) => {
                setShowModal(false);
                if (!c)
                    return;
                CustomerController.DBAction('POST', newCustomer).then(() => refreshData(x => x + 1))
            }}
                ShowCancel={false}
                ShowX={true}
                DisableConfirm={errors.length > 0}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color='var(--danger)'/> {t}</p>)} >
                <div className="row">
                    <CustomerForm Customer={newCustomer} stateSetter={setNewCustomer} setErrors={setErrors} />
                </div>
            </Modal>
            <Modal Show={showEXTModal} Size={'xlg'}
                Title={'Customer External Database Fields'}
                ShowCancel={false}
                ShowX={true}
                ConfirmText={'Update All'}
                ConfirmBtnClass={'btn-info'}
                CallBack={(c) => {
                    if (c && extDbUpdateAll.current !== undefined) extDbUpdateAll.current();
                    if (!c) setShowExtModal(false);
                }}>
                <ExternalDBUpdate Type='Customer' UpdateAll={extDbUpdateAll} />
            </Modal>
        </GenericByPage>
    )
}

export default ByCustomer;

