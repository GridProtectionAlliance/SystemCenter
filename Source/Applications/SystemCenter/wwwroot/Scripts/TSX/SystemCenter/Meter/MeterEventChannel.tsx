//******************************************************************************************************
//  MeterEventChannel.tsx - Gbtc
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
//  01/03/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { SystemCenter } from '../global'
import { PhaseSlice, MeasurmentTypeSlice } from '../Store/Store'
import { forEach, toNumber } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingIcon, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { error } from 'console';
import { AssetAttributes } from '../AssetAttribute/Asset';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Types.Meter, IsVisible: boolean }

const MeterEventChannelWindow = (props: IProps) => {
    const dispatch = useDispatch();

    const [channels, setChannels] = React.useState<OpenXDA.Types.Channel[]>([]);
    const [meterChannels, setMeterChannels] = React.useState<OpenXDA.Types.Channel[]>([]);
    const phases = useSelector(PhaseSlice.Data) as OpenXDA.Types.Phase[];
    const measurementTypes = useSelector(MeasurmentTypeSlice.Data) as OpenXDA.Types.MeasurementType[];

    const [assets, setAssets] = React.useState<OpenXDA.Types.Asset[]>([]);

    const pStatus = useSelector(PhaseSlice.Status) as Application.Types.Status;
    const mtStatus = useSelector(MeasurmentTypeSlice.Status) as Application.Types.Status;
    const [status, setStatus] = React.useState<Application.Types.Status>('idle')
    const [trigger, setTrigger] = React.useState<number>(0);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [nChanges, setNChanges] = React.useState<number>(0);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None' | 'New')>('None');

    

    React.useEffect(() => {
        if (pStatus == 'unintiated')
            dispatch(PhaseSlice.Fetch());
    }, [])

    React.useEffect(() => {
        if (mtStatus == 'unintiated')
            dispatch(MeasurmentTypeSlice.Fetch());
    }, [])

    React.useEffect(() => {
        setNChanges(0);
        setChannels(_.cloneDeep(meterChannels));
    }, [meterChannels]);

    React.useEffect(() => {
        if (!props.IsVisible)
            return;

        let channelHandle = getChannels();
        let assetHandle = getAssets();

        Promise.all([channelHandle, assetHandle]).then(() => setStatus('idle'), () => setStatus('error'))
        return () => {
            if (channelHandle != null && channelHandle.abort != null)
                channelHandle.abort();
            if (assetHandle != null && assetHandle.abort != null)
                assetHandle.abort();
        }

    }, [props.IsVisible, props.Meter, trigger])

    React.useEffect(() => {
        const changed = channels.filter((c, i) => i < meterChannels.length && !_.isEqual(c, meterChannels[i]));
        setNChanges(changed.length + (channels.length - meterChannels.length));

        let e = [];
        changed.forEach((c) => {
            if (c.Adder != null && !AssetAttributes.isRealNumber(c.Adder))
                e.push('All Adders must be numeric values')
            if (c.Multiplier != null && !AssetAttributes.isRealNumber(c.Multiplier))
                e.push('All Multipliers must be numeric values')
            if (c.Name == null || c.Name.length == 0)
                e.push('All Channels must have a Name')
            if (c.Phase == null || c.Phase.length == 0)
                e.push('All Channels must have a Phase')
            if (c.MeasurementType == null || c.MeasurementType.length == 0)
                e.push('All Channels must have a Measurement Type')
        })
        setErrors(_.uniq(e));

    }, [channels])
    function getChannels(): JQuery.jqXHR<OpenXDA.Types.Channel[]> {
        setStatus('loading')
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Channels/Event`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((d: Array<OpenXDA.Types.Channel>) => {
            setMeterChannels(d);
        });
    }
    function getAssets(): JQuery.jqXHR<OpenXDA.Types.Asset[]> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Asset`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((d: Array<OpenXDA.Types.Asset>) => {
            setAssets(d)
        });
    }

    function applyUpdates(): void {
        setStatus('loading')
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Channel/Update/Event`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Channels: channels }),
            cache: false,
            async: true
        }).done(() => {
            setTrigger(x => x +1 )
        }).fail(msg => {
            setStatus('error')
        });
    }

    function deleteChannel(index: number) {
        setChannels((d) => {
            let u = _.clone(d);
            u.splice(index, 1);
            return u;
        })
    }

    if (status == 'error' || pStatus == 'error' || mtStatus == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Channels:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
                    </div>
                </div>
            </div>
        </div>

    if (status == 'loading' || pStatus == 'loading' || mtStatus == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Channels:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} Label={''} />
                    </div>
                </div>
            </div>
        </div>

    return <div className="card" style={{ marginBottom: 10 }}>
        <div className="card-header">
            <div className="row">
                <div className="col">
                    <h4>Channels:</h4>
                </div>
            </div>
        </div>
        <div className="card-body">
            <div style={{ width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Channel</th>
                            <th>Name</th>
                            <th>Desc</th>
                            <th>Type</th>
                            <th>Phase</th>
                            <th>Adder</th>
                            <th>Multiplier</th>
                            <th>Asset</th>
                            <th>Conn.</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            channels.map((c, index, array) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ width: '5%' }}><input className='form-control' value={c.Series[0].SourceIndexes} onChange={(event) => {
                                            c.Series[0].SourceIndexes = event.target.value;
                                            setChannels((d) => {
                                                let u = [...d];
                                                u[index] = c;
                                                return u;
                                            })
                                        }} /></td>
                                        <td style={{ width: '15%' }}><input className='form-control' value={c.Name} onChange={(event) => {
                                            c.Name = event.target.value;
                                            setChannels((d) => {
                                                let u = [...d];
                                                u[index] = c;
                                                return u;
                                            })
                                        }} /></td>
                                        <td style={{ width: '25%' }}><input className='form-control' value={c.Description == null ? '' : c.Description} onChange={(event) => {
                                            c.Description = event.target.value;
                                            setChannels((d) => {
                                                let u = [...d];
                                                u[index] = c;
                                                return u;
                                            })
                                        }} /></td>
                                        <td style={{ width: '10%' }}>{<select className='form-control' value={c.MeasurementType} onChange={(event) => {
                                            c.MeasurementType = event.target.value;
                                            setChannels((d) => {
                                                let u = [...d];
                                                u[index] = c;
                                                return u;
                                            })
                                        }}>{measurementTypes.map(a => <option key={a.Name} value={a.Name}>{a.Name}</option>)}</select>}</td>
                                        <td style={{ width: '10%' }}>{<select className='form-control' value={c.Phase} onChange={(event) => {
                                            c.Phase = event.target.value;
                                            setChannels((d) => {
                                                let u = [...d];
                                                u[index] = c;
                                                return u;
                                            })
                                        }}>{phases.map(a => <option key={a.ID} value={a.Name}>{a.Name}</option>)}</select>}</td>
                                        <td style={{ width: '5%' }}><input className='form-control' value={c.Adder} onChange={(event) => {
                                            c.Adder = parseFloat(event.target.value);
                                            setChannels((d) => {
                                                let u = [...d];
                                                u[index] = c;
                                                return u;
                                            })
                                        }} /></td>
                                        <td style={{ width: '5%' }}><input className='form-control' value={c.Multiplier} onChange={(event) => {
                                            c.Multiplier = parseFloat(event.target.value);
                                            setChannels((d) => {
                                                let u = [...d];
                                                u[index] = c;
                                                return u;
                                            })
                                        }} /></td>
                                        <td style={{ width: '10%' }}>{<select className='form-control' value={c.Asset} onChange={(event) => {
                                            c.Asset = event.target.value;
                                            setChannels((d) => {
                                                let u = [...d];
                                                u[index] = c;
                                                return u;
                                            })
                                        }}>
                                            <option value=""></option>
                                            {assets.map(a => <option key={a.ID} value={a.AssetKey}>{a.AssetKey}</option>)}</select>}</td>
                                        <td style={{ width: '5%' }}><input className='form-control' value={c.ConnectionPriority} onChange={(event) => {
                                            c.ConnectionPriority = parseInt(event.target.value);
                                            setChannels((d) => {
                                                let u = [...d];
                                                u[index] = c;
                                                return u;
                                            })
                                        }} /></td>
                                        <td style={{ width: '5%' }}>
                                            <button className="btn btn-sm" onClick={(e) => deleteChannel(index)}><span><i className="fa fa-times"></i></span></button>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div className="card-footer">
            <div className="btn-group mr-2">
                <button className="btn btn-primary pull-right" onClick={() => {
                    let channel: OpenXDA.Types.Channel = { ID: 0, Meter: props.Meter.AssetKey, ConnectionPriority: 0, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } as OpenXDA.Types.Series] }
                    setChannels((d) => [...d,channel])
                }}>Add Channel</button>
            </div>
            <div className="btn-group mr-2">
                <button className={"btn btn-primary" + (errors.length > 0 || nChanges == 0 ? ' disabled' : '')} onClick={() => { if (errors.length === 0 && nChanges > 0) applyUpdates() }}
                    onMouseEnter={() => setHover('New')} onMouseLeave={() => setHover('None')} data-tooltip={'save'}>Save Changes</button>
                <ToolTip Show={hover == 'New' && (errors.length > 0 || nChanges == 0)} Position={'top'} Theme={'dark'} Target={"save"}>
                    {nChanges == 0 ? <p> no changes have been made. </p> : null}
                    {errors.length > 0 ? errors.map((e, i) => <p key={i}><ErrorSymbol /> {e}</p>) : null}
                </ToolTip>
            </div>
            <div className="btn-group mr-2">
                <button className={"btn btn-primary" + (nChanges == 0 ? ' disabled' : '')} onClick={() => { if (nChanges > 0) setTrigger(x => x+1) }}
                    onMouseEnter={() => setHover('Reset')} onMouseLeave={() => setHover('None')} data-tooltip={"clr"}>Clear Changes</button>
                <ToolTip Show={hover == 'Reset' && (nChanges > 0)} Position={'top'} Theme={'dark'} Target={"clr"}>
                    <p> There are {nChanges} channels with changes that will be lost. </p>
                </ToolTip>
            </div>
        </div>
    </div>

}

const ErrorSymbol = () => <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i>

export default MeterEventChannelWindow
;

