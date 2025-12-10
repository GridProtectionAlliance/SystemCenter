//******************************************************************************************************
//  ByMagDurCurve.tsx - Gbtc
//
//  Copyright � 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  08/08/2024 - Ali Karrar
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { CreateGuid } from '@gpa-gemstone/helper-functions';
import { Alert, GenericController, Modal, Warning } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import GenericByPage from '../CommonComponents/GenericByPage';
import { SystemCenter } from '../global';
import { useAppDispatch } from '../hooks';
import { APIAccessKeySlice } from '../Store/Store';
import APIKeyForm from './APIKeyForm';

export interface IAPIAccessKey {
    ID: number;
    RegistrationKey: string;
    APIToken: string;
    Expires: string;
    AllowImpersonation: boolean;
}

const emptyKey: IAPIAccessKey = {
    ID: -1,
    RegistrationKey: '',
    APIToken: '',
    Expires: null,
    AllowImpersonation: false
};

const fieldCols: SystemCenter.IByCol<IAPIAccessKey>[] = [
    { Field: 'RegistrationKey', Label: 'Registration Key', Type: 'string' },
    { Field: 'Expires', Label: 'Key Expiration', Type: 'datetime' },
    { Field: 'AllowImpersonation', Label: 'Allow Impersonation', Type: 'boolean' }
];
const controllerPath = `${homePath}api/OpenXDA/APIAccessKey`;
const controller = new GenericController<IAPIAccessKey>(
    controllerPath, "RegistrationKey", true
);

const ByAPIAccessKeys: Application.Types.iByComponent = (props) => {
    const dispatch = useAppDispatch();

    const [APIKey, setAPIKey] = React.useState<IAPIAccessKey>(emptyKey);

    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [showKeyWarning, setShowKeyWarning] = React.useState<boolean>(false);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);

    return (
        <GenericByPage<IAPIAccessKey>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='RegistrationKey'
            PagingID='APIAccessKey'
            OnClick={(item) => {
                setAPIKey({ ...item.row, Expires: item.row.Expires ?? '' });
                setShowModal(true);
            }}
            Columns={fieldCols}
            DefaultSearchAscending={true}
            DefaultSearchKey='Name'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button
                            className="btn btn-info btn-block"
                            onClick={(event) => {
                                setAPIKey(emptyKey);
                                setShowModal(true);
                                event.preventDefault()
                            }}
                        >Add API Key</button>
                    </form>
                </fieldset>
            </li>
            <Modal
                Show={showModal}
                Title={APIKey.ID >= 0 ? 'Edit ' + APIKey.RegistrationKey : 'Add New API Key'}
                CallBack={(confirmed, isButton) => {
                    // back button is clicked
                    if (!isButton) {
                        setShowModal(false);
                        setShowKeyWarning(false);
                        return;
                    }

                    // Generate key button is clicked
                    if (confirmed && APIKey.ID < 0 && isButton) {
                        const newKey = ({ ...APIKey, APIToken: CreateGuid() })
                        setShowKeyWarning(true);
                        setAPIKey(newKey);
                        controller.DBAction("POST", newKey).done(() => {
                            refreshData(d => d + 1);
                            dispatch(APIAccessKeySlice.SetChanged());
                        });
                        return;
                    }

                    // save button is clicked on edit form
                    if (confirmed && APIKey.ID >= 0 && isButton) {
                        controller.DBAction("PATCH", APIKey).done(() => {
                            refreshData(d => d + 1);
                            dispatch(APIAccessKeySlice.SetChanged());
                        });
                        setShowModal(false);
                        return;
                    }

                    // delete button pressed
                    if (!confirmed && isButton) {
                        setShowDelete(true);
                        setShowModal(false);
                        return;
                    }
                }}
                ShowCancel={APIKey.ID >= 0}
                ShowConfirm={APIKey.ID >= 0 || !showKeyWarning}
                ShowX={true}
                CancelText={'Delete'}
                DisableConfirm={errors.length > 0}
                ConfirmText={APIKey.ID >= 0 ? 'Save' : 'Generate New Key'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
            >
                {showKeyWarning ?
                    <Alert Class={'alert-info'} ShowX={false}>
                        You will only be able to view this API Key once. If it is lost, you will need to generate a new one.
                    </Alert> :
                    <></>
                }
                <div className="row">
                    <APIKeyForm
                        Key={APIKey}
                        stateSetter={setAPIKey}
                        setErrors={setErrors}
                        disableForm={showKeyWarning}
                    />
                </div>
            </Modal>
            <Warning
                Message={'This will permanently delete the API Key and cannot be undone.'}
                Show={showDelete}
                Title={'Delete ' + APIKey.RegistrationKey}
                CallBack={(confirmed) => {
                    if (confirmed)
                        controller.DBAction("DELETE", APIKey).done(() => {
                            refreshData(d => d + 1);
                            dispatch(APIAccessKeySlice.SetChanged());
                        });
                    setShowDelete(false);
                }}
            />
        </GenericByPage>
    )
}

export default ByAPIAccessKeys;

