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
import { CellCarrierSlice, UserInfoSlice } from '../Store';
import { useAppDispatch, useAppSelector } from '../hooks';

interface IProps {}

const ConfirmPhoneCarrier = (props: IProps) => {
    const dispatch = useAppDispatch();

    const [currentCarrier, setCurrentCarrier] = React.useState<number>(-1);
    const userCarrier = useAppSelector(UserInfoSlice.CellCarrierID);

    const carriers = useAppSelector(CellCarrierSlice.Data);
    const carrierStatus = useAppSelector(CellCarrierSlice.Status);

    React.useEffect(() => {
        if (carrierStatus == 'unintiated' || carrierStatus == 'changed')
            dispatch(CellCarrierSlice.Fetch());
    }, [carrierStatus]);

    React.useEffect(() => {
        if (userCarrier == null && carriers.length > 0)
            setCurrentCarrier(carriers[0].ID)
        else if (userCarrier == null)
            setCurrentCarrier(-1);
        else
            setCurrentCarrier(userCarrier);
    }, [userCarrier, carriers])

    React.useEffect(() => {
        if (currentCarrier != userCarrier && currentCarrier > 0)
            dispatch(UserInfoSlice.UpdateCarrier(currentCarrier));
    }, [currentCarrier])

    return <> <div className="row">
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
                    <div className="form-group">
                            <label>Cell Carrier</label>
                        <select
                            className="form-control"
                            onChange={(evt) => {
                                setCurrentCarrier(parseInt(evt.target.value));
                            }}
                            value={currentCarrier.toString()}
                        >
                            {carriers.map((c, i) => (
                                <option key={i} value={c.ID}>
                                    {c.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>;
}

export default ConfirmPhoneCarrier;