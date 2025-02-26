//******************************************************************************************************
//  ByExternalDB.tsx - Gbtc
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
//  10/12/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { GenericController, Modal } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import { IsCron } from '@gpa-gemstone/helper-functions';
import ExternalDBForm from './ExternalDBForm';
import { SystemCenter as SC } from '../global';
import GenericByPage from '../CommonComponents/GenericByPage';

declare var homePath: string;
const controllerPath = `${homePath}api/SystemCenter/ExternalDatabases`
const fieldCols: SC.IByCol<SystemCenter.Types.DetailedExternalDatabases>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: 'auto' },
    { Field: 'MappedTables', Label: 'Number of Mapped Tables', Type: 'number', Width: 'auto' },
    { Field: 'MappedFields', Label: 'Number of Mapped Fields', Type: 'number', Width: 'auto' },
    { Field: 'LastDataUpdate', Label: 'Date of Last Data Update', Type: 'datetime', Width: 'auto' }
]

const emptyRecord = { ID: 0, Name: '', Schedule: '', ConnectionString: '', DataProviderString: '', Encrypt: false };

const ExternalDBController = new GenericController<SystemCenter.Types.DetailedExternalDatabases>(controllerPath, "ID", true);

const ByExternalDB: Application.Types.iByComponent = (props) => {
    let navigate = useNavigate();

    const [errors, setErrors] = React.useState<string[]>([]);
    const [record, setRecord] = React.useState<SystemCenter.Types.ExternalDatabases>(emptyRecord);
    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);

    React.useEffect(() => {
        let e = [];
        if (record.Name == null || record.Name.length == 0)
            e.push('A Name is required.');
        else if (record.Name.length > 200)
            e.push('A Name of less than 200 characters is required.');
        if (record.Schedule?.length != 0 && (record.Schedule != null && !IsCron(record.Schedule)))
            e.push('Schedule must be in cron format.');

        setErrors(e);
    }, [record]);

    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=ExternalDB&ID=${item.row.ID}`);
    }

    return <>
        <GenericByPage<SystemCenter.Types.DetailedExternalDatabases>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='Name'
            PagingID='ByExternalDB'
            OnClick={handleSelect}
            Columns={fieldCols}
            DefaultSearchAscending={true}
            DefaultSearchKey='Name'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button className="btn btn-primary" onClick={(event) => {
                            event.preventDefault()
                            setRecord({ ...emptyRecord });
                            setShowNew(true);
                        }}>Add External Database</button>
                    </form>
                </fieldset>
            </li>
            <Modal Title={'Add New External Database'}
                CallBack={(conf) => {
                    if (conf) {
                        record.Schedule = record.Schedule?.length == 0 ? null : record.Schedule;
                        ExternalDBController.DBAction('POST', record).done(() => refreshData(x => x + 1))
                    }
                    setShowNew(false);
                }}
                Show={showNew}
                ShowCancel={false}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Add ExternalDB'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                DisableConfirm={errors.length > 0} >
                <ExternalDBForm Record={record} Setter={setRecord} setErrors={setErrors} />
            </Modal>
        </GenericByPage>
    </>
}

export default ByExternalDB;

