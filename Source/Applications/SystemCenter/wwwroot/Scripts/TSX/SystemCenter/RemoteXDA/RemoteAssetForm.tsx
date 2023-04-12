//******************************************************************************************************
//  RemoteXDAAssetForm.tsx - Gbtc
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
//  5/16/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { CheckBox, Input } from '@gpa-gemstone/react-forms';
import { OpenXDA } from '@gpa-gemstone/application-typings';

const BlankRemoteXDAAsset: OpenXDA.Types.RemoteXDAAsset = {
    ID: -1,
    RemoteXDAInstanceID: -1,
    LocalXDAAssetID: -1,
    RemoteXDAAssetID: -1,
    RemoteXDAAssetKey: null,
    Obsfucate: false,
    Synced: false,
    RemoteAssetCreatedByDataPusher: false,
    LocalAssetName: null,
    LocalAssetKey: null
}


function RemoteAssetComparator(remoteAsset_1: OpenXDA.Types.RemoteXDAAsset, remoteAsset_2: OpenXDA.Types.RemoteXDAAsset): boolean {
    if ((remoteAsset_1 == null) || (remoteAsset_2 == null))
        return false;
    return (
        remoteAsset_1.ID != remoteAsset_2.ID ||
        remoteAsset_1.LocalXDAAssetID != remoteAsset_2.LocalXDAAssetID ||
        remoteAsset_1.RemoteXDAAssetKey != remoteAsset_2.RemoteXDAAssetKey ||
        remoteAsset_1.Obsfucate != remoteAsset_2.Obsfucate ||
        remoteAsset_1.LocalAssetName != remoteAsset_2.LocalAssetName ||
        remoteAsset_1.LocalAssetKey != remoteAsset_2.LocalAssetKey ||
        remoteAsset_1.RemoteXDAInstanceID != remoteAsset_2.RemoteXDAInstanceID)
}

interface IProps { OriginalAsset: OpenXDA.Types.RemoteXDAAsset, SetRemoteAsset: (instance: OpenXDA.Types.RemoteXDAAsset) => void, SetErrors?: (e: string[]) => void }

export default function RemoteAssetForm(props: IProps) {
    const [baseAsset, setBaseAsset] = React.useState<OpenXDA.Types.RemoteXDAAsset>(props.OriginalAsset);
    const [formAsset, setFormAsset] = React.useState<OpenXDA.Types.RemoteXDAAsset>(props.OriginalAsset);

    React.useEffect(() => {
        setFormAsset(props.OriginalAsset);
        setBaseAsset(props.OriginalAsset);
    }, [props.OriginalAsset]);

    React.useEffect(() => {
        let e = [];
        if (!valid('RemoteXDAAssetID')) {
            e.push('This remote asset is no longer editable!');
        } else {
            if (!RemoteAssetComparator(baseAsset, formAsset))
                e.push("No changes made.")
            if (!valid('RemoteXDAAssetKey'))
                e.push('Remote asset key is a required field (less than 200 characters)');
            if (props.SetErrors != undefined)
                props.SetErrors(e);
            props.SetRemoteAsset(formAsset);
        }
    }, [formAsset]);

    function valid(field: keyof (OpenXDA.Types.RemoteXDAAsset)): boolean {
        if (field == 'RemoteXDAAssetID')
            return formAsset.RemoteXDAAssetID != null && formAsset.RemoteXDAAssetID <= 0;
        else if (field == 'RemoteXDAAssetKey')
            return (formAsset.RemoteXDAAssetKey != null && formAsset.RemoteXDAAssetKey.length > 0 && formAsset.RemoteXDAAssetKey.length <= 200) || !formAsset.Obsfucate;
        else
            return false;
    }

    return (
        <div id='rAssetFormRoot'>
            <form>
                <div className="col" style={{ width: '50%', float: "left" }}>
                    <Input<OpenXDA.Types.RemoteXDAAsset> Record={formAsset} Field={'LocalAssetName'} Label={'Local Name'} Valid={() => true} Setter={() => { }} Disabled={true} />
                    <Input<OpenXDA.Types.RemoteXDAAsset> Record={formAsset} Field={'LocalAssetKey'} Label={'Local Key'} Valid={() => true} Setter={() => { }} Disabled={true} />
                </div>
                <div className="col" style={{ width: '50%', float: "right" }}>
                    <Input<OpenXDA.Types.RemoteXDAAsset> Record={formAsset} Field={'RemoteXDAAssetKey'} Label={'Remote Asset Name and Key'} Feedback={"A field of less than 200 characters is required."} Help={"Asset name and key on the remote side if obfuscated. Otherwise uses local name and key."} Valid={valid} Setter={setFormAsset} Disabled={!formAsset.Obsfucate} />
                    <CheckBox<OpenXDA.Types.RemoteXDAAsset> Record={formAsset} Field={'Obsfucate'} Label={'Obfuscate Remote Asset'} Setter={setFormAsset} Disabled={false} />
                </div>
            </form>
        </div>
    );
}

export { BlankRemoteXDAAsset, RemoteAssetForm, RemoteAssetComparator };