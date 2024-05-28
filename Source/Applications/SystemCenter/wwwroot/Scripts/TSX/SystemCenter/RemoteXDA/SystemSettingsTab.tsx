//******************************************************************************************************
//  AssetEventChannel.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  04/19/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { RemoteXDAInstanceSlice } from '../Store/Store';
import { LoadingScreen, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { CrossMark, Warning } from '@gpa-gemstone/gpa-symbols';
import { RemoteXDAInstanceForm, RemoteXDAInstanceComparator} from './RemoteXDAInstanceForm';

interface IProps { ID: number }


const SystemSettingsTab = (props: IProps) => {
    const [hover, setHover] = React.useState<('submit' | 'clear' | 'none')>('none');

    const dispatch = useAppDispatch();
    const instStatus = useAppSelector(RemoteXDAInstanceSlice.Status) as Application.Types.Status;
    const connection = useAppSelector((state) => RemoteXDAInstanceSlice.Datum(state, props.ID));

    const [newInstErrors, setNewInstErrors] = React.useState<string[]>([]);
    const [baseInstance, setBaseInstance] = React.useState<OpenXDA.Types.RemoteXDAInstance>(connection);
    const [formInstance, setFormInstance] = React.useState<OpenXDA.Types.RemoteXDAInstance>(connection);


    React.useEffect(() => {
        if (instStatus === 'unintiated' || instStatus === 'changed')
            dispatch(RemoteXDAInstanceSlice.Fetch());
    }, [dispatch, instStatus]);

    React.useEffect(() => {
        setFormInstance(connection);
        setBaseInstance(connection);
    }, [connection]);

    if (connection == null)
        return null;

    let cardBody;
    if (instStatus === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
    } else if (instStatus === 'loading') {
        cardBody = <LoadingScreen Show={true} />
    } else {
        cardBody = <RemoteXDAInstanceForm BaseInstance={baseInstance} SetInstance={setFormInstance} SetErrors={setNewInstErrors} />
    }

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '70vh', marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Remote openXDA Instance Connection Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: '1', overflowY: 'auto' }}>
                {cardBody}
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button
                        className={"btn btn-primary" + ((newInstErrors.length == 0 && RemoteXDAInstanceComparator(baseInstance, formInstance)) ? '' : ' disabled')}
                        type="submit"
                        onClick={() => {
                            if (newInstErrors.length == 0 && RemoteXDAInstanceComparator(baseInstance, formInstance)) {
                                dispatch(RemoteXDAInstanceSlice.DBAction({ verb: 'PATCH', record: formInstance }));
                            }
                        }}
                        data-tooltip='submit'
                        onMouseEnter={() => setHover('submit')}
                        onMouseLeave={() => setHover('none')}>
                        Save Changes
                    </button>
                </div>
                <ToolTip
                    Show={(newInstErrors.length != 0) && hover == 'submit'}
                    Position={'top'}
                    Theme={'dark'}
                    Target={"submit"}>
                    {newInstErrors.map((t, i) =>
                        <p key={i}> {CrossMark} {t} </p>
                    )}
                </ToolTip>
                <div className="btn-group mr-2">
                    <button
                        className={"btn btn-default" + (RemoteXDAInstanceComparator(baseInstance, formInstance) ? '' : ' disabled')}
                        data-tooltip="clear" onClick={() => {
                            setBaseInstance(_.cloneDeep(connection));
                        }}
                        onMouseEnter={() => setHover('clear')}
                        onMouseLeave={() => setHover('none')}>
                        Clear Changes
                    </button>
                </div>
                <ToolTip
                    Show={RemoteXDAInstanceComparator(baseInstance, formInstance) && hover == 'clear'}
                    Position={'top'}
                    Theme={'dark'}
                    Target={"clear"}>

                    {baseInstance.Name != formInstance.Name ? <p> {Warning} Changes to Name will be discarded.</p> : null}
                    {baseInstance.Address != formInstance.Address ? <p> {Warning} Changes to Address will be discarded.</p> : null}
                    {baseInstance.Frequency != formInstance.Frequency ? <p> {Warning} Changes to Frequency will be discarded.</p> : null}
                    {baseInstance.UserAccountID != formInstance.UserAccountID ? <p> {Warning} Changes to User will be discarded.</p> : null}
                </ToolTip>
            </div>

        </div>
    );


}

export default SystemSettingsTab;