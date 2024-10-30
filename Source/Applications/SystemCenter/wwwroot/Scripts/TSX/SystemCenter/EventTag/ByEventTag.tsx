﻿//******************************************************************************************************
//  ByEventTag.tsx - Gbtc
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
//  07/31/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter as SC } from '../global';
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import { Modal, Warning, GenericController } from '@gpa-gemstone/react-interactive';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import EventTagForm from './EventTagForm';
import GenericByPage from '../CommonComponents/GenericByPage';

const emptyRecord: OpenXDA.Types.EventTag = { ID: 0, Name: '', Description: '', ShowInFilter: false };
const fieldCols: SC.IByCol<OpenXDA.Types.EventTag>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string' },
    { Field: 'Description', Label: 'Description', Type: 'string' },
    { Field: 'ShowInFilter', Label: 'Show In Filter', Type: 'boolean' }
];
const controllerPath = `${homePath}api/OpenXDA/EventTag`;
const eventTagController = new GenericController<OpenXDA.Types.EventTag>(controllerPath, 'Name', false);


const EventTags: Application.Types.iByComponent = (props) => {
    const [mode, setMode] = React.useState<'View'|'Add'|'Edit'>('View');
    const [errors, setErrors] = React.useState<string[]>([]);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const [record, setRecord] = React.useState<OpenXDA.Types.EventTag>(emptyRecord);
    const [allTags, setAllTags] = React.useState<OpenXDA.Types.EventTag[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);

    React.useEffect(() => {
        eventTagController.Fetch().done((d: OpenXDA.Types.EventTag[]) => {
            setAllTags(d);
        })
    }, [refreshCount]);

    React.useEffect(() => {
        const e: string[] = [];
        if (record.Name === null || record.Name.length === 0)
            e.push('A Name is required.');
        if (record.Name?.length > 200)
            e.push('A Name of less than 200 characters is required.');
        if (allTags.findIndex((t) => t.Name.toLowerCase() === record.Name?.toLowerCase() && t.ID !== record.ID) !== -1) 
            e.push('A unique Name is required.');

        setErrors(e);
    }, [record]);


    return (
        <GenericByPage<OpenXDA.Types.EventTag>
            ControllerPath={controllerPath} RefreshData={refreshCount}
            DefaultSortKey='Name' PagingID='ByEventTag' OnClick={(item) => { setRecord(item.row); setMode('Edit'); }}
            Columns={fieldCols} DefaultSearchAscending={false} DefaultSearchKey='Name'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button className="btn btn-info"
                            onClick={(evt) => { evt.preventDefault(); setRecord({ ...emptyRecord }); setMode('Add'); }}>Add Tag</button>
                    </form>
                </fieldset>
            </li>
            <Modal Title={mode === 'Add' ? 'Add New Event Tag' : 'Edit ' + record.Name}
                CallBack={(conf, isBtn) => {
                    setMode('View');
                    if (conf)
                        eventTagController.DBAction(mode === 'Add' ? 'POST' : 'PATCH', record)
                            .done(() => refreshData(c => c + 1));
                    else if (isBtn) setShowWarning(true);
                }}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={mode === 'Add' ? 'Add Tag' : 'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}><ReactIcons.CrossMark Color="red" /> {e}</p>)}
                DisableConfirm={errors.length > 0}
                ShowCancel={mode === 'Edit'}
                CancelText={'Delete'}
                Show={mode === 'Add' || mode === 'Edit'} >
                <EventTagForm Record={record} Setter={setRecord} />
            </Modal>
            <Warning
                Title={`Delete ${record.Name}`}
                Show={showWarning}
                Message={'This will permanently delete this Event Tag and cannot be undone.'}
                CallBack={(c) => {
                    if (c)
                        eventTagController.DBAction("DELETE", record)
                            .done(() => refreshData(c => c + 1));
                    setShowWarning(false);
                }}
            />
        </GenericByPage>
    )
}

export default EventTags;
