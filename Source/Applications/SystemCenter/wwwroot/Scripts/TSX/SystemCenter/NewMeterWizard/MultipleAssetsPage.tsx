//******************************************************************************************************
//  AdditionalFieldsPage.tsx - Gbtc
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
//  01/10/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { LoadingIcon, ServerErrorIcon } from '@gpa-gemstone/react-interactive';

interface IProps {
    Assets: Array<OpenXDA.Types.Asset>,
    GetInnerComponent: (Asset: OpenXDA.Types.Asset) => JSX.Element 
}

export default function MultipleAssetsPage(props: IProps) {
    const [state, setState] = React.useState<Application.Types.Status>('unintiated');
    const [currentAsset, setCurrentAsset] = React.useState<OpenXDA.Types.Asset>(null);
    const [assetIndex, setAssetIndex] = React.useState<number>(0);

    React.useEffect(() => {
        setAssetIndex(0);
    }, [props.Assets]);

    React.useEffect(() => {
        if (props.Assets.length === 0 || props.Assets.length <= assetIndex) {
            setCurrentAsset(null);
            setState('error');
        }
        else if (props.Assets[assetIndex].ID === 0) {
            let assetHandle = reloadAsset(props.Assets[assetIndex]);
            return () => {
                if (assetHandle != null && assetHandle.abort != null)
                    assetHandle.abort();
            };
        }
        else
            setCurrentAsset(props.Assets[assetIndex]);
    }, [assetIndex]);

    function next() {
        // Make sure currentStep is set to something reasonable
        if (assetIndex >= props.Assets.length - 1)
            setAssetIndex( props.Assets.length - 1);
        else
            setAssetIndex(assetIndex + 1);
    }

    function prev() {
        if (assetIndex <= 0)
            setAssetIndex(0);
        else
            setAssetIndex(assetIndex - 1);
    }

    function reloadAsset(asset: OpenXDA.Types.Asset): JQuery.jqXHR<OpenXDA.Types.Asset[]> {
        setState('loading');
        let handle = $.ajax({
            type: 'POST',
            url: `${homePath}api/OpenXDA/Asset/SearchableList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                Searches: [{ FieldName: "AssetKey", Operator: "=", SearchText: asset.AssetKey, Type: 'string', isPivotColumn: false }],
                OrderBy: "ID",
                Ascending: "true"
            }),
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done((data) => {
            setCurrentAsset(JSON.parse(data.toString())[0]);
            setState('idle');
        }).fail(() => {
            setCurrentAsset(asset);
            setState('error');
        });
        return handle;
    }

    let card;
    if (state == 'loading')
        card = (
            <div className="card" style={{ height: '100%' }}>
                <div className="card-header">
                    <h4 style={{ width: '100%' }}>{"No assets found for this meter."}</h4>
                </div>
                <div className="card-body" style={{ overflowY: 'scroll', maxHeight: window.innerHeight - 415 }}>
                    <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                        <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                            <LoadingIcon Show={true} Size={40} />
                        </div>
                    </div>
                </div>
            </div>);
    else if (state == 'error' || currentAsset == null)
        card = (
            <div className="card" style={{ height: '100%' }}>
                <div className="card-header">
                    <h4 style={{ width: '100%' }}>{"No assets found for this meter."}</h4>
                </div>
                <div className="card-body" style={{ overflowY: 'scroll', maxHeight: window.innerHeight - 415 }}>
                    <div style={{ width: '100%', height: '200px' }}>
                        <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                            <ServerErrorIcon Show={true} Size={40} Label={currentAsset == null ? 'No Assets Found for this Meter.' : 'A Server Error Occurred. Please Reload the Application'} />
                        </div>
                    </div>
                </div>
            </div>);
    else
        card = (props.GetInnerComponent(currentAsset));

    return (
        <>
            <div className="row" style={{ margin: -20, height: '100%' }}>
                <div className="col-lg-2" style={{ padding: 0, height: '100%' }}>
                    <div className="card" style={{ marginBottom: 10, height: '100%' }}>
                        <div className="card-header">
                            <h4 style={{ width: '100%' }}>{"Assets List:"}</h4>
                        </div>
                        <div className="card-body" style={{ overflowY: 'auto', maxHeight: window.innerHeight - 415 }}>
                            {props.Assets.map((asset, index) => <li style={{ textDecoration: (index <= assetIndex ? 'line-through' : null) }} key={index}>{asset.AssetKey}</li>)}
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary pull-left" onClick={prev} hidden={false} disabled={assetIndex < 1}>Previous Asset</button>
                            <button className="btn btn-primary pull-right" onClick={next} disabled={assetIndex == props.Assets.length - 1}>Next Asset</button>
                        </div>
                    </div>
                </div>
                <div className="col" style={{ padding: 0, height: '100%' }}>
                    {card}
                </div>
            </div>
        </>
    );

}

