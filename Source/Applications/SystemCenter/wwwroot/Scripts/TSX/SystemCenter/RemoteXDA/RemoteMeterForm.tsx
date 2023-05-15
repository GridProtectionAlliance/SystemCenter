//******************************************************************************************************
//  RemoteXDAMeterForm.tsx - Gbtc
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
//  5/19/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Input, CheckBox } from '@gpa-gemstone/react-forms';
import { OpenXDA } from '@gpa-gemstone/application-typings';

const BlankRemoteXDAMeter: OpenXDA.Types.RemoteXDAMeter = {
    ID: -1,
    LocalXDAMeterID: -1,
    RemoteXDAMeterID: -1,
    RemoteXDAName: null,
    RemoteXDAAssetKey: null,
    Obsfucate: false,
    Synced: false,
    RemoteXDAInstanceID: -1,
    LocalAlias: null,
    LocalMeterName: null,
    LocalAssetKey: null
}

function RemoteMeterComparator(remoteMeter_1: OpenXDA.Types.RemoteXDAMeter, remoteMeter_2: OpenXDA.Types.RemoteXDAMeter): boolean {
    if ((remoteMeter_1 == null) || (remoteMeter_2 == null))
        return false;
    return (
        remoteMeter_1.ID != remoteMeter_2.ID ||
        remoteMeter_1.LocalXDAMeterID != remoteMeter_2.LocalXDAMeterID ||
        remoteMeter_1.RemoteXDAName != remoteMeter_2.RemoteXDAName ||
        remoteMeter_1.RemoteXDAAssetKey != remoteMeter_2.RemoteXDAAssetKey ||
        remoteMeter_1.RemoteXDAInstanceID != remoteMeter_2.RemoteXDAInstanceID ||
        remoteMeter_1.Obsfucate != remoteMeter_2.Obsfucate)
}

interface IProps { OriginalMeter: OpenXDA.Types.RemoteXDAMeter, SetRemoteMeter: (instance: OpenXDA.Types.RemoteXDAMeter) => void, SetErrors?: (e: string[]) => void }

export default function RemoteMeterForm(props: IProps) {
    const [baseMeter, setBaseMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(props.OriginalMeter);
    const [formMeter, setFormMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter>(props.OriginalMeter);

    React.useEffect(() => {
        setFormMeter(props.OriginalMeter);
        setBaseMeter(props.OriginalMeter);
    }, [props.OriginalMeter]);

    React.useEffect(() => {
        let e = [];
        if (!valid('RemoteXDAMeterID')) {
            e.push('This Remote Meter can no longer be edited.');
        } else {
            if (!RemoteMeterComparator(baseMeter, formMeter))
                e.push("No changes made.")
            if (!valid('RemoteXDAName'))
                e.push('A Remote Meter Name of less than 200 characters is required if obfuscated.');
            if (!valid('RemoteXDAAssetKey'))
                e.push('A Remote Meter Key of less than 50 characters is required.');
            if (props.SetErrors != undefined)
                props.SetErrors(e);
            props.SetRemoteMeter(formMeter);
        }
    }, [formMeter]);

    function valid(field: keyof (OpenXDA.Types.RemoteXDAMeter)): boolean {
        if (field == 'RemoteXDAMeterID')
            return formMeter.RemoteXDAMeterID != null && formMeter.RemoteXDAMeterID <= 0;
        else if (field == 'RemoteXDAName')
            return formMeter.RemoteXDAName != null && (formMeter.RemoteXDAName.length > 0 && formMeter.RemoteXDAName.length <= 200) || !formMeter.Obsfucate;
        else if (field == 'RemoteXDAAssetKey')
            return formMeter.RemoteXDAAssetKey != null && formMeter.RemoteXDAAssetKey.length > 0 && formMeter.RemoteXDAAssetKey.length <= 50;
        else
            return false;
    }

    return (
        <div id='rMeterFormRoot'>
            <form>
                <div className="col" style={{ width: '50%', float: "left" }}>
                    <Input<OpenXDA.Types.RemoteXDAMeter> Record={formMeter} Field={'LocalMeterName'} Label={'Local Meter Name'} Valid={() => true} Setter={() => { }} Disabled={true} />
                    <Input<OpenXDA.Types.RemoteXDAMeter> Record={formMeter} Field={'LocalAssetKey'} Label={'Local Meter Key'} Valid={() => true} Setter={() => { }} Disabled={true} />
                    <Input<OpenXDA.Types.RemoteXDAMeter> Record={formMeter} Field={'LocalAlias'} Label={'Local Alias'} Valid={() => true} Setter={() => { }} Disabled={true} />
                </div>
                <div className="col" style={{ width: '50%', float: "right" }}>
                    <Input<OpenXDA.Types.RemoteXDAMeter> Record={formMeter} Field={'RemoteXDAName'} Label={'Remote Meter Name'} Feedback={"A Remote Meter Name of less than 200 characters is required."} Help={"Also used for the Meter Alias on the Remote side if obfuscated. Otherwise uses Local Alias."}
                        Valid={(field) => {
                            return (valid(field) || !formMeter.Obsfucate);
                        }} Setter={setFormMeter} Disabled={!formMeter.Obsfucate} />
                    <Input<OpenXDA.Types.RemoteXDAMeter> Record={formMeter} Field={'RemoteXDAAssetKey'} Label={'Remote Meter Key'} Feedback={"A Remote Meter Key of less than 50 characters is required."} Valid={valid} Setter={setFormMeter} />
                    <CheckBox<OpenXDA.Types.RemoteXDAMeter> Record={formMeter} Field={'Obsfucate'} Label={'Obfuscate Remote Meter Alias'} Setter={setFormMeter} />
                </div>
            </form>
        </div>
    );
}

export { BlankRemoteXDAMeter, RemoteMeterForm, RemoteMeterComparator };