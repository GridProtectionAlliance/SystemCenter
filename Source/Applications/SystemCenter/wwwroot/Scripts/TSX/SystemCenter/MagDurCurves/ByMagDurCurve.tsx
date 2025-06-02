//******************************************************************************************************
//  ByMagDurCurve.tsx - Gbtc
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
//  03/16/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import CurveForm from './CurveForm';
import GenericByPage from '../CommonComponents/GenericByPage';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { GenericController, Modal, Warning } from '@gpa-gemstone/react-interactive';
import { SystemCenter } from '../global';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';

declare var homePath: string;
const controllerPath = `${homePath}api/SystemCenter/StandardMagDurCurve`
const MagDurCurveController = new GenericController<OpenXDA.Types.MagDurCurve>(controllerPath, "ID", true);
const emptyCurve: OpenXDA.Types.MagDurCurve = {
    ID: -1,
    Name: '',
    Area: '0.00001 0, 1000 0, 1000 1, 0.00001 1, 0.00001 0',
    Color: '#000000'
};
const fieldCols: SystemCenter.IByCol<OpenXDA.Types.MagDurCurve>[] = [
    { Field: 'Name', Label: 'Name', Type: 'string', Width: 'auto' }
]

const ByMagDurCurve: Application.Types.iByComponent = () => {
    const [curve, setCurve] = React.useState<OpenXDA.Types.MagDurCurve>(emptyCurve);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);

    return (
        <GenericByPage<OpenXDA.Types.MagDurCurve>
            ControllerPath={controllerPath}
            RefreshData={refreshCount}
            DefaultSortKey='Name'
            PagingID='DBCleanup'
            OnClick={(item) => {
                setCurve(item.row);
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
                        <button className="btn btn-info btn-block" onClick={(event) => { event.preventDefault(); setShowModal(true); }}>Add Curve</button>
                    </form>
                </fieldset>
            </li>
            <Modal
                Show={showModal && !showDelete}
                Title={curve.ID >= 0
                    ? 'Edit ' + (curve?.Name ?? 'MagDur Curve')
                    : 'Add New MagDur Curve'}
                Size={'xlg'}
                CallBack={(conf,del) => {
                    if (del)
                        setShowDelete(true);
                    else {
                        if (conf) {
                            curve.ID >= 0
                                ? MagDurCurveController.DBAction('PATCH', curve).done(() => refreshData(x => x + 1))
                                : MagDurCurveController.DBAction("POST", curve).done(() => refreshData(x => x + 1))
                        }
                    setShowModal(false);
                        setCurve(emptyCurve);
                    }
                }}
                ShowCancel={curve.ID >= 0}
                ShowX={true}
                CancelText={'Delete'}
                DisableConfirm={errors.length > 0}
                ConfirmText={'Save'}
                ConfirmShowToolTip={errors.length > 0}
                ConfirmToolTipContent={errors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)} >
                <div className="row">
                    <CurveForm Curve={curve} stateSetter={setCurve} setErrors={setErrors} />
                </div>
            </Modal>
            <Warning
                Message={'This will permanently delete the Curve and cannot be undone.'}
                Show={showDelete}
                Title={'Delete ' + (curve?.Name ?? 'MagDur Curve')}
                CallBack={(c) => {
                    if (c) {
                        MagDurCurveController.DBAction('DELETE', curve).done(() => refreshData(x => x + 1));
                        setCurve(emptyCurve);
                    }
                    setShowDelete(false);
                }}
            />
        </GenericByPage>
    )
}

export default ByMagDurCurve;

