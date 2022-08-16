//******************************************************************************************************
//  AssetGroupInfo.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { useHistory } from 'react-router-dom';
import { isEqual } from 'lodash';
import { Input, CheckBox } from '@gpa-gemstone/react-forms';

declare var homePath: string;

function AssetgroupInfoWindow(props: { AssetGroup: OpenXDA.Types.AssetGroup, StateSetter: (asset: OpenXDA.Types.AssetGroup) => void, AllAssetGroups: Array<OpenXDA.Types.AssetGroup> }) {
    let history = useHistory();
    const [assetGroup, setAssetGroup] = React.useState<OpenXDA.Types.AssetGroup>(null);

    React.useEffect(() => {
        setAssetGroup(props.AssetGroup);
        return () => { }
    }, [props.AssetGroup])

    function valid(field: keyof (OpenXDA.Types.AssetGroup)): boolean {
        if (field == 'Name') {
            if (assetGroup.Name == null || assetGroup.Name.length == 0) return false;

            if (isEqual(assetGroup.Name, props.AssetGroup.Name)) return true;

            return props.AllAssetGroups.map(item => item.Name.toLowerCase()).indexOf(assetGroup.Name.toLowerCase()) < 0; 
            
        }
        return true;
    }

    function editExistingAssetGroup() {

    }

    if (assetGroup == null) return null;
    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Asset Group Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row" style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    <div className="col">
                        <Input<OpenXDA.Types.AssetGroup> Record={assetGroup} Field={'Name'} Label={'Name'} Feedback={'A unique name of less than 50 characters is required.'} Valid={valid} Setter={setAssetGroup} Disabled={false} />
                        <CheckBox<OpenXDA.Types.AssetGroup> Record={assetGroup} Field={'DisplayDashboard'} Label={'Show Asset Group in Dashboard'} Setter={setAssetGroup} Disabled={false} />
                        <CheckBox<OpenXDA.Types.AssetGroup> Record={assetGroup} Field={'DisplayEmail'} Label={'Show Asset Group in Email Subscription'} Setter={setAssetGroup} Disabled={false} />
                    </div>
                    <div className="col">
                        <Input<OpenXDA.Types.AssetGroup> Record={assetGroup} Field={'Assets'} Label={'Num. of Transmission Assets'}  Valid={() => true} Setter={setAssetGroup} Disabled={true} />
                        <Input<OpenXDA.Types.AssetGroup> Record={assetGroup} Field={'Meters'} Label={'Num. of Meters'} Valid={() => true} Setter={setAssetGroup} Disabled={true} />
                        <Input<OpenXDA.Types.AssetGroup> Record={assetGroup} Field={'Users'} Label={'Num. of Users'} Valid={() => true} Setter={setAssetGroup} Disabled={true} />
                        <Input<OpenXDA.Types.AssetGroup> Record={assetGroup} Field={'AssetGroups'} Label={'Num. of Asset Groups'} Valid={() => true} Setter={setAssetGroup} Disabled={true} />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" type="submit" onClick={() => {
                        editExistingAssetGroup();
                        props.StateSetter(assetGroup);
                    }} disabled={isEqual(assetGroup, props.AssetGroup)}>Save Changes</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={() => setAssetGroup(props.AssetGroup)} disabled={isEqual(assetGroup, props.AssetGroup)}>Clear Changes</button>
                </div>
            </div>

        </div>
    );
}


export default AssetgroupInfoWindow;