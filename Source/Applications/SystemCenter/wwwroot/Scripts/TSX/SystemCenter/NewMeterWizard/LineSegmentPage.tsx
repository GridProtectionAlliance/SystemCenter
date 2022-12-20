//******************************************************************************************************
//  LineSegmentPage.tsx - Gbtc
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
//  01/10/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import LineSegmentWindow from '../AssetAttribute/LineSegmentWindow';

interface IProps {
    Assets: Array<OpenXDA.Types.Asset>,
}

export default function LineSegmentPage(props: IProps) {
    const [lineAssets, setLineAssets] = React.useState<Array<OpenXDA.Types.Asset>>([]);
    const [currentAsset, setCurrentAsset] = React.useState<OpenXDA.Types.Asset>(null);
    const [assetIndex, setAssetIndex] = React.useState<number>(0);

    React.useEffect(() => {
        setLineAssets(props.Assets.filter(item => item.AssetType.toString() == 'Line'));
        setAssetIndex(0);
    }, [props.Assets]);

    React.useEffect(() => {
        setCurrentAsset(lineAssets.length === 0 || lineAssets.length <= assetIndex ? null : lineAssets[assetIndex]);
    }, [assetIndex, lineAssets]);

    function next() {
        // Make sure currentStep is set to something reasonable
        if (assetIndex >= lineAssets.length - 1)
            setAssetIndex( lineAssets.length - 1);
        else
            setAssetIndex(assetIndex + 1);
    }

    function prev() {
        if (assetIndex <= 0)
            setAssetIndex(0);
        else
            setAssetIndex(assetIndex - 1);
    }

    return (
        <>
            <div className="row" style={{ margin: -20, height: '100%' }}>
                <div className="col-lg-2" style={{ padding: 0, height: '100%' }}>
                    <div className="card" style={{ marginBottom: 10 }}>
                        <div className="card-header">
                            <h4 style={{ width: '100%' }}>{"Line Assets List:"}</h4>
                        </div>
                        <div className="card-body" style={{ overflowY: 'auto', maxHeight: window.innerHeight - 415 }}>
                            {lineAssets.map((asset, index) => <li style={{ textDecoration: (index <= assetIndex ? 'line-through' : null) }} key={index}>{asset.AssetKey}</li>)}
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary pull-left" onClick={prev} hidden={false} disabled={assetIndex < 1}>Previous Asset</button>
                            <button className="btn btn-primary pull-right" onClick={next} disabled={assetIndex == lineAssets.length - 1}>Next Asset</button>
                        </div>
                    </div>
                </div>
                <div className="col" style={{ padding: 0, height: '100%' }}>
                    {currentAsset != null ? <LineSegmentWindow ID={currentAsset.ID} AssetName={currentAsset.AssetName}/> :
                        <div className="card" style={{ height: '100%' }}>
                            <div className="card-header">
                                <h4 style={{ width: '100%' }}>{"No line type assets found for this meter."}</h4>
                            </div>
                            <div className="card-body" style={{ overflowY: 'scroll', maxHeight: window.innerHeight - 415 }}>
                            </div>
                            <div className="card-footer">
                            </div>
                        </div>}
                </div>
            </div>
        </>
    );

}

