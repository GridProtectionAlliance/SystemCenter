//******************************************************************************************************
//  EventFilterButton.tsx - Gbtc
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
//  10/05/2021 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import _ from 'lodash';
import 'moment';
import React from 'react';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { GenericController } from '@gpa-gemstone/react-interactive';

interface IProps {
    IDs: number[],
    Type: ('Meter' | 'Asset' | 'AssetGroup' | 'Location'),
    OnClick: () => void
}

function EventFilterButton(props: IProps) {

    const [hover, setHover] = React.useState<boolean>(false);
    const [rows, setRows] = React.useState<JSX.Element[]>([]);
    const [header, setHeader] = React.useState<JSX.Element>(null);

    const [meters, setMeters] = React.useState<SystemCenter.Types.DetailedMeter[]>([]);
    const [meterStatus, setMeterStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [assets, setAssets] = React.useState<SystemCenter.Types.DetailedAsset[]>([]);
    const [assetStatus, setAssetStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [locations, setLocations] = React.useState<SystemCenter.Types.DetailedLocation[]>([]);
    const [locationStatus, setLocationStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [groups, setGroups] = React.useState<OpenXDA.Types.AssetGroup[]>([]);
    const [groupStatus, setGroupStatus] = React.useState<Application.Types.Status>('uninitiated');


    React.useEffect(() => {
        if (props.Type != 'Meter') return;
        setMeterStatus('loading');
        const h = new GenericController<SystemCenter.Types.DetailedMeter>(`${homePath}api/OpenXDA/Event/Meter`, "Name", true).Fetch();
        h.done((d: SystemCenter.Types.DetailedMeter[]) => {
            setMeters(d);
            setMeterStatus('idle');
        })
        h.fail(() => setMeterStatus('error'))

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [props.Type]);

    React.useEffect(() => {
        if (props.Type != 'Asset') return;
        setAssetStatus('loading');
        const h = new GenericController<SystemCenter.Types.DetailedAsset>(`${homePath}api/OpenXDA/Event/Asset`, "AssetName", true).Fetch();
        h.done((d: SystemCenter.Types.DetailedAsset[]) => {
            setAssets(d);
            setAssetStatus('idle');
        })
        h.fail(() => setAssetStatus('error'))

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [props.Type]);

    React.useEffect(() => {
        if (props.Type != 'Location') return;
        setLocationStatus('loading');
        const h = new GenericController<SystemCenter.Types.DetailedLocation>(`${homePath}api/OpenXDA/Event/Location`, "LocationKey", true).Fetch();
        h.done((d: SystemCenter.Types.DetailedLocation[]) => {
            setLocations(d);
            setLocationStatus('idle');
        })
        h.fail(() => setLocationStatus('error'))

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [props.Type]);

    React.useEffect(() => {
        if (props.Type != 'AssetGroup') return;
        setGroupStatus('loading');
        const h = new GenericController<OpenXDA.Types.AssetGroup>(`${homePath}api/openXDA/Event/AssetGroup`, 'Name').Fetch();
        h.done((d: OpenXDA.Types.AssetGroup[]) => {
            setGroups(d);
            setGroupStatus('idle');
        })     
        h.fail(() => setGroupStatus('error'))

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [props.Type]);

    React.useEffect(() => {
        switch (props.Type) {
            case ('Meter'):
                setHeader(< tr ><th>Name</th><th>Key</th><th>Substation</th><th>Make</th><th>Model</th></tr >);
                break;
            case ('Asset'):
                setHeader(<tr><th>Key</th><th>Name</th><th>Asset Type</th><th>Voltage (kV)</th></tr>);
                break;
            case ('AssetGroup'):
                setHeader(<tr><th>Name</th><th>Assets</th><th>Meters</th></tr>);
                break;
            default:
                setHeader(<tr><th>Name</th><th>Key</th><th>Meters</th><th>Assets</th></tr>);
        }
    }, [props.Type]);

    React.useEffect(() => {
        switch (props.Type) {
            case ('Meter'):
                if (meterStatus !== 'idle') return
                setRows(props.IDs.filter((v, i) => i < 10).map((d) => meters.find(m => m.ID == d)).map((d) => <tr key={d.ID}>
                    <td>{d['Name']}</td>
                    <td>{d['AssetKey']}</td>
                    <td>{d['Location']}</td>
                    <td>{d['Make']}</td>
                    <td>{d['Model']}</td>
                </tr>));
                break;
            case ('Asset'):
                if (assetStatus !== 'idle') return
                setRows(props.IDs.filter((v, i) => i < 10).map((d) => assets.find(m => m.ID == d)).map((d) => <tr key={d.ID}>
                    <td>{d['AssetKey']}</td>
                    <td>{d['AssetName']}</td>
                    <td>{d['AssetType']}</td>
                    <td>{d['VoltageKV']}</td>
                </tr>));
                break;
            case ('AssetGroup'):
                if (groupStatus !== 'idle') return
                setRows(props.IDs.filter((v, i) => i < 10).map((d) => groups.find(m => m.ID == d)).map((d) => <tr key={d.ID}>
                    <td>{d['Name']}</td>
                    <td>{d['Assets']}</td>
                    <td>{d['Meters']}</td>
                </tr>));
                break;
            default:
                if (locationStatus !== 'idle') return
                setRows(props.IDs.filter((v, i) => i < 10).map((d) => locations.find(m => m.ID == d)).map((d) => <tr key={d.ID}>
                    <td>{d['Name']}</td>
                    <td>{d['LocationKey']}</td>
                    <td>{d['Meters']}</td>
                    <td>{d['Assets']}</td>
                </tr>));
        }

    }, [props.IDs, props.Type, meters, assets, groups, locations, meterStatus, groupStatus, locationStatus, assetStatus])

    return (
        <>
            <button className={"btn btn-block btn-sm btn-" + (props.IDs.length > 0 ? "warning" : "primary")} style={{ marginBottom: 5 }} onClick={(evt) => { evt.preventDefault(); props.OnClick(); }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {props.Type === 'Location' ? 'Substation' : props.Type} {props.IDs.length > 0 ? ('(' + props.IDs.length + ')') : ''}
            </button>
            <div style={{ width: window.innerWidth / 3, display: hover ? 'block' : 'none', position: 'absolute', backgroundColor: '#f1f1f1', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', zIndex: 1, right: 0 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <table className='table'>
                    <thead>
                        {header}
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>

                </table>
            </div>
        </>
    );
}

export default EventFilterButton;