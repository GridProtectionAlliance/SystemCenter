﻿//******************************************************************************************************
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
import React from 'react';
import 'moment';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../hooks';
import { EventAssetGroupSlice, EventAssetSlice, EventLocationSlice, EventMeterSlice } from '../Store';

interface IProps {
    IDs: number[],
    Type: ('Meter' | 'Asset' | 'AssetGroup' | 'Location'),
    OnClick: () => void
}

function EventFilterButton(props: IProps) {
    const dispatch = useAppDispatch();

    const [hover, setHover] = React.useState<boolean>(false);
    const [rows, setRows] = React.useState<JSX.Element[]>([]);
    const [header, setHeader] = React.useState<JSX.Element>(null);

    const meter = useAppSelector(EventMeterSlice.Data);
    const meterStatus = useAppSelector(EventMeterSlice.Status);

    const asset = useAppSelector(EventAssetSlice.Data);
    const assetStatus = useAppSelector(EventAssetSlice.Status);

    const location = useAppSelector(EventLocationSlice.Data);
    const locationStatus = useAppSelector(EventLocationSlice.Status);

    const group = useAppSelector(EventAssetGroupSlice.Data);
    const groupStatus = useAppSelector(EventAssetGroupSlice.Status);

    React.useEffect(() => {
        if (meterStatus == 'unintiated' || meterStatus == 'changed')
            dispatch(EventMeterSlice.Fetch());
    }, [meterStatus]);

    React.useEffect(() => {
        if (assetStatus == 'unintiated' || assetStatus == 'changed')
            dispatch(EventAssetSlice.Fetch());
    }, [assetStatus]);

    React.useEffect(() => {
        if (locationStatus == 'unintiated' || locationStatus == 'changed')
            dispatch(EventLocationSlice.Fetch());
    }, [locationStatus]);

    React.useEffect(() => {
        if (groupStatus == 'unintiated' || groupStatus == 'changed')
            dispatch(EventAssetGroupSlice.Fetch());
    }, [groupStatus]);

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
                setRows(props.IDs.filter((v, i) => i < 10).map((d) => meter.find(m => m.ID == d)).map((d) => <tr key={d.ID}>
                    <td>{d['Name']}</td>
                    <td>{d['AssetKey']}</td>
                    <td>{d['Location']}</td>
                    <td>{d['Make']}</td>
                    <td>{d['Model']}</td>
                </tr>));
                break;
            case ('Asset'):
                setRows(props.IDs.filter((v, i) => i < 10).map((d) => asset.find(m => m.ID == d)).map((d) => <tr key={d.ID}>
                    <td>{d['AssetKey']}</td>
                    <td>{d['AssetName']}</td>
                    <td>{d['AssetType']}</td>
                    <td>{d['VoltageKV']}</td>
                </tr>));
                break;
            case ('AssetGroup'):
                setRows(props.IDs.filter((v, i) => i < 10).map((d) => group.find(m => m.ID == d)).map((d) => <tr key={d.ID}>
                    <td>{d['Name']}</td>
                    <td>{d['Assets']}</td>
                    <td>{d['Meters']}</td>
                </tr>));
                break;
            default:
                setRows(props.IDs.filter((v, i) => i < 10).map((d) => location.find(m => m.ID == d)).map((d) => <tr key={d.ID}>
                    <td>{d['Name']}</td>
                    <td>{d['LocationKey']}</td>
                    <td>{d['Meters']}</td>
                    <td>{d['Assets']}</td>
                </tr>));
        }

    }, [props.IDs, props.Type])

    return (
        <>
            <button className={"btn btn-block btn-sm btn-" + (props.IDs.length > 0 ? "warning" : "primary")} style={{ marginBottom: 5 }} onClick={(evt) => { evt.preventDefault(); props.OnClick(); }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {props.Type} {props.IDs.length > 0 ? ('(' + props.IDs.length + ')') : ''}
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