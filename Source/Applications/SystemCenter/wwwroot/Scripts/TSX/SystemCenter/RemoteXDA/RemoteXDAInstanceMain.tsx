//******************************************************************************************************
//  RemoteXDAInstanceMain.tsx - Gbtc
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
//  05/03/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { GenericController, Modal } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { RemoteXDAInstanceForm, BlankRemoteXDAInstance } from './RemoteXDAInstanceForm';
import GenericByPage from '../CommonComponents/GenericByPage';
import { SystemCenter } from '../global';

declare var homePath: string;

const controllerPath = `${homePath}api/OpenXDA/remoteXDAInstance`
const RemoteXDAInstanceController = new GenericController<OpenXDA.Types.RemoteXDAInstance>(controllerPath, "ID", true);
const fieldCols: SystemCenter.IByCol<OpenXDA.Types.RemoteXDAInstance>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: 'auto' },
    { Field: 'Address', Label: 'Address', Type: 'string', Width: 'auto' }
]

const RemoteXDAInstanceMain: Application.Types.iByComponent = (props) => {
    const navigate = useNavigate();
    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [formInstance, setFormInstance] = React.useState<OpenXDA.Types.RemoteXDAInstance>(BlankRemoteXDAInstance);
    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);

    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=RemoteXDAInstance&ID=${item.row.ID}`);
    }

    return <>
        <GenericByPage<OpenXDA.Types.RemoteXDAInstance>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='Name'
            PagingID='RemoteXDAInstanceMain'
            OnClick={(item) => { handleSelect(item); }}
            Columns={fieldCols}
            DefaultSearchAscending={true}
            DefaultSearchKey='Name'
        >
            <li className="nav-item" hidden={props.Roles.indexOf('Administrator') < 0} style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button className="btn btn-primary" onClick={(event) => {
                            if (props.Roles.indexOf('Administrator') > -1) {
                                event.preventDefault();
                                setShowNew(true);
                            }
                        }}>Add Remote Connection</button>
                    </form>
                </fieldset>
            </li>
            <Modal
                Show={showNew}
                Title={'New Remote openXDA Instance Connection'}
                ShowCancel={true}
                CallBack={(conf) => {
                    if (conf)
                        RemoteXDAInstanceController.DBAction("POST", formInstance).done(() => {
                            refreshData(x => x + 1);
                        });
                    setShowNew(false);
                }}
                DisableConfirm={newInstErrors.length > 0}
                ShowX={true}
                ConfirmShowToolTip={newInstErrors.length > 0}
                ConfirmToolTipContent={newInstErrors.map((t, i) =>
                    <p key={i}> {CrossMark} {t} </p>
                )}>
                <RemoteXDAInstanceForm
                    BaseInstance={BlankRemoteXDAInstance}
                    SetInstance={setFormInstance}
                    SetErrors={setNewInstErrors}
                    RenderPortalId={'userModal'}
                />
            </Modal>
            { /* Portal endpoint for inner modal for new remote instance connection */ }
            <div id='userModal' />
        </GenericByPage>
    </>
}

export default RemoteXDAInstanceMain;

