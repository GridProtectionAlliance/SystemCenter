//******************************************************************************************************
//  ConfirmCarrier.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  08/08/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { UserInfoSlice } from '../Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Application } from '@gpa-gemstone/application-typings';
import { Select } from '@gpa-gemstone/react-forms';
import { GenericController } from '@gpa-gemstone/react-interactive';
import { ICellCarrier } from '../global';

const emptyCarrier: ICellCarrier = {
    ID: -1,
    Name: '',
    Transform: '',
};

interface IProps {}

const ConfirmPhoneCarrier = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [currentCarrier, setCurrentCarrier] = React.useState<ICellCarrier>(emptyCarrier);
    const userCarrier = useAppSelector(UserInfoSlice.CellCarrierID);

    const [carriers, setCarriers] = React.useState<ICellCarrier[]>([]);
    const [carrierStatus, setCarrierStatus] = React.useState<Application.Types.Status>('uninitiated');

    React.useEffect(() => {
        setCarrierStatus('loading');
        const h = new GenericController<ICellCarrier>(`${homePath}api/OpenXDA/CellCarrier`, "Name", true).Fetch();
        h.done((d) => {
            setCarrierStatus('idle');
            setCarriers(d);
        })
        h.fail(() => {
            setCarrierStatus('error');
        })
        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, []);

    React.useEffect(() => {
        if (userCarrier == null && carriers.length > 0)
            setCurrentCarrier(carriers[0])
        else if (userCarrier == null)
            setCurrentCarrier(emptyCarrier);
        else if (carriers.length > 0)
            setCurrentCarrier(carriers.find((c) => c.ID == userCarrier));
    }, [userCarrier, carriers]);

    React.useEffect(() => {
        if (currentCarrier.ID != userCarrier && currentCarrier.ID > 0)
            dispatch(UserInfoSlice.UpdateCarrier(currentCarrier.ID));
    }, [currentCarrier]);


    return (
        <div className="col">
            <div className="row">
                <div className="col">
                    <div className="alert alert-info" style={{ margin: 'auto' }}>
                    Please confirm your Cell Carrier.
                    </div>
                </div>
            </div>
            <div className="row" style={{ marginTop: 15 }}>
                <div className="col">
                    <Select<ICellCarrier> Record={currentCarrier} Field={'ID'} Label='Cell Carrier' Setter={(record) => setCurrentCarrier({ ...record, ID: typeof record.ID == 'string' ? parseInt(record.ID) : record.ID })}
                        Options={carriers.map((e) => { return { Label: e.Name, Value: e.ID.toString() } })} />
                </div>
            </div>
        </div>);
}

export default ConfirmPhoneCarrier;