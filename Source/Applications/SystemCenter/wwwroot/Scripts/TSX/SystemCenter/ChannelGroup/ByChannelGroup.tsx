//******************************************************************************************************
//  ByChannelGroup.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  06/30/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useAppDispatch } from '../hooks';
import { ChannelGroupSlice } from '../Store/Store';
import { SystemCenter as LocalSC } from '../global';
import * as _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { GenericController, Modal } from '@gpa-gemstone/react-interactive';
import ChannelGroupForm from './ChannelGroupForm';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import GenericByPage from '../CommonComponents/GenericByPage';

const fieldCols: LocalSC.IByCol<LocalSC.ChannelGroupView>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: '15%' },
    { Field: 'Description', Label: 'Description', Type: 'string', Width: 'auto' },
    { Field: 'ItemCount', Label: 'Items', Type: 'string', Width: '10%' }
];
const emptyRecord = { ID: 0, Name: '', Description: '' };
const controllerPath = `${homePath}api/ChannelGroup`;

const ChannelController = new GenericController<SystemCenter.Types.ChannelGroup>(controllerPath, "ID", true);

const ChannelGroups: Application.Types.iByComponent = () => {
    let navigate = useNavigate();

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [record, setRecord] = React.useState<SystemCenter.Types.ChannelGroup>(emptyRecord);
    const [refreshCount, refreshData] = React.useState<number>(0);

    React.useEffect(() => {
        let e = [];
        if (record.Name == null || record.Name.length == 0) {
            e.push('A Name is required.');
        }
        if (record.Name.length > 200) {
            e.push('A Name of less than 200 characters is required.')
        }

        setErrors(e);
    }, [record]);

    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=ChannelGroup&GroupID=${item.row.ID}`);
    }

    return (
        <GenericByPage<LocalSC.ChannelGroupView>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            Columns={fieldCols}
            PagingID='ChannelGroupView'
            DefaultSortKey='Name'
            DefaultSearchKey='Name'
            OnClick={(item) => { handleSelect(item); }}
            DefaultSearchAscending={false}
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button
                            className="btn btn-info btn-block"
                            onClick={(evt) => {
                                evt.preventDefault();
                                setRecord({ ...emptyRecord })
                                setShowNew(true);
                            }}
                        >Add Channel Group
                        </button>
                    </form>
                </fieldset>
            </li>
            <Modal Title={'Add New Channel Group'}
                CallBack={(c) => {
                    if (c)
                        ChannelController.DBAction('POST', record).done(() => refreshData(x => x + 1));
                    setShowNew(false);
                }}
                ShowCancel={false}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {e}</p>)}
                DisableConfirm={errors.length > 0}
                Show={showNew} >
                <ChannelGroupForm Record={record} Setter={setRecord} />
            </Modal>
        </GenericByPage>
    )
}

export default ChannelGroups;

