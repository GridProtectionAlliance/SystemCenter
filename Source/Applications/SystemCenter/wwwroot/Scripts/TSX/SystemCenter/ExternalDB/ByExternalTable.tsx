//******************************************************************************************************
//  ByExternalTable.tsx - Gbtc
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
//  11/13/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Application, SystemCenter } from '@gpa-gemstone/application-typings';
import { GenericController, Modal } from '@gpa-gemstone/react-interactive';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import ExternalDBTableForm from './ExternalDBTableForm';
import { SystemCenter as SC } from '../global';
import GenericByPage from '../CommonComponents/GenericByPage';

declare var homePath: string;
const fieldCols: SC.IByCol<SystemCenter.Types.DetailedExtDBTables>[] = [
    { Field: 'TableName', Label: 'Name', Type: 'string', Width: 'auto' },
    { Field: 'ExternalDB', Label: 'External Database', Type: 'string', Width: 'auto' },
    { Field: 'MappedFields', Label: 'Number of Mapped Fields', Type: 'number', Width: 'auto' }
];
const controllerPath = `${homePath}api/SystemCenter/extDBTables`;
const emptyRecord = { ID: -1, TableName: '', ExtDBID: -1, Query: ''};

const ExternalTableController = new GenericController<SystemCenter.Types.DetailedExtDBTables>(controllerPath, "ID", true);

const ByExternalTable: Application.Types.iByComponent = (props) => {
    let navigate = useNavigate();

    const [showNew, setShowNew] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);

    const [record, setRecord] = React.useState<SystemCenter.Types.DetailedExtDBTables>(emptyRecord);
    const [refreshCount, refreshData] = React.useState<number>(0);

    React.useEffect(() => {
        let e = [];
        if (record.TableName == null || record.TableName.length == 0)
            e.push('A Name is required.');
        else if (record.TableName.length > 200)
            e.push('A Name of less than 200 characters is required.');
        if (record.Query == null || record.Query.length == 0)
            e.push('A Query is required.');

        setErrors(e);
    }, [record]);

    function handleSelect(item) {
        navigate(`${homePath}index.cshtml?name=ExternalTable&ID=${item.row.ID}`);
    }

    return (
        <GenericByPage<SystemCenter.Types.DetailedExtDBTables>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='TableName'
            PagingID='ByExternalTable'
            OnClick={(item) => { handleSelect(item); }}
            Columns={fieldCols}
            DefaultSearchAscending={true}
            DefaultSearchKey='TableName'
        >
            <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                    <form>
                        <button className="btn btn-primary" onClick={(event) => {
                            event.preventDefault()
                            setRecord({ ...emptyRecord });
                            setShowNew(true);
                        }}>Add External Table</button>
                    </form>
                </fieldset>
            </li>
            <Modal Title={'Add New External Table'}
                CallBack={(conf) => {
                    if (conf) ExternalTableController.DBAction('POST', record).done(() => refreshData(x => x + 1));
                    setShowNew(false);
                }}
                Show={showNew}
                ShowCancel={false}
                ShowX={true}
                ConfirmBtnClass={'btn-primary'}
                ConfirmText={'Add Table'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
                DisableConfirm={errors.length > 0} >
                <ExternalDBTableForm
                    Record={record}
                    Setter={setRecord}
                    SetErrors={setErrors}
                    ShowSelectExternalDB={true} />
            </Modal>
        </GenericByPage>
    )
}

export default ByExternalTable;

