//******************************************************************************************************
//  Page4.tsx - Gbtc
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
import { OpenXDA } from '../global';
declare var homePath: string;

interface Page4Props {
    Assets: Array<OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.Transformer>,
    Channels: Array<OpenXDA.Channel>
    UpdateState: (record) => void 
}
interface Page4State {
    NewEditAsset: OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.Transformer,
    AllAssets: Array<OpenXDA.Asset>,
    AssetTypes: Array<OpenXDA.AssetType>,
    NewEdit: NewEdit
}
enum NewEdit { New, Edit}
export default class Page4 extends React.Component<Page4Props, Page4State, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            NewEditAsset: this.getNewAsset('Line'),
            AllAssets: [],
            AssetTypes: [],
            NewEdit: NewEdit.New
        }
    }

    componentDidMount() {
        this.getAllAssets();
        this.getAssetTypes();
    }

    editAsset(index: number) {
        this.setState({ NewEdit: NewEdit.Edit,NewEditAsset: this.props.Assets[index] });
    }

    deleteAsset(index: number) {
        let list = _.clone(this.props.Assets, true);
        let record: Array<OpenXDA.Asset> = list.splice(index, 1);
        this.props.UpdateState({ Assets: list });
        let channels: Array<OpenXDA.Channel> = _.clone(this.props.Channels, true);

        $.each(channels, (index, channel) => {
            if (channel.Asset == record[0].AssetKey)
                channel.Asset = ''
        });

        this.props.UpdateState({ Channels: channels });

    }

    addAsset() {
    }

    changeAssetType(type: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer'): void {
        let asset = {
            ID: this.state.NewEditAsset.ID,
            AssetKey: this.state.NewEditAsset.AssetKey,
            AssetName: this.state.NewEditAsset.AssetName,
            AssetType: type,
            Description: this.state.NewEditAsset.Description,
            VoltageKV: this.state.NewEditAsset.VoltageKV,
            Channels: this.state.NewEditAsset.Channels,
            Spare: this.state.NewEditAsset.Spare
        }

        asset = this.getNewAssetAttributes(asset, type);
        this.setState({NewEditAsset: asset});
    }

    getNewAsset(type: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer'): OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.LineSegment | OpenXDA.Transformer {
        let asset: OpenXDA.Asset = {
            ID: 0,
            AssetKey: '',
            AssetName: '',
            AssetType: type,
            Description: '',
            VoltageKV: 0,
            Spare: false,
            Channels: []
        }

        asset = this.getNewAssetAttributes(asset, type);

        return asset;
    }

    getNewAssetAttributes(asset: OpenXDA.Asset, type: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer'): OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.LineSegment |  OpenXDA.Transformer
    {
        if (type == 'Line') {
            let record = asset as OpenXDA.Line;
            record.MaxFaultDistance = 0;
            record.MinFaultDistance = 0;
            record.Segment = this.getNewAsset('LineSegment') as OpenXDA.LineSegment;

            return record;
        }
        else if (type == 'Breaker') {
            let record = asset as OpenXDA.Breaker;
            record.ThermalRating = 0;
            record.Speed = 0;
            record.TripTime = 0;
            record.PickupTime = 0;
            record.TripCoilCondition = 0;
            return record;
        }
        else if (type == 'Bus') {
            let record = asset as OpenXDA.Bus;
            return record
        }
        else if (type == 'CapacitorBank') {
            let record = asset as OpenXDA.CapBank;
            record.NumberOfBanks = 0;
            record.CansPerBank = 0;
            record.CapacitancePerBank = 0;
            return record;

        }
        else if (type == 'LineSegment') {
            let record = asset as OpenXDA.LineSegment;
            record.R0 = 0;
            record.X0 = 0;
            record.R1 = 0;
            record.X1 = 0;
            record.ThermalRating = 0;
            record.Length = 0;
            return record
        }
        else {
            let record = asset as OpenXDA.Transformer;
            record.R0 = 0;
            record.X0 = 0;
            record.R1 = 0;
            record.X1 = 0;
            record.ThermalRating = 0;
            record.PrimaryVoltageKV = 0;
            record.SecondaryVoltageKV = 0;
            record.Tap = 0;
            return record
        }


    }

    getAllAssets(): void {
        if (sessionStorage.hasOwnProperty('NewMeterWizard.AllAssets'))
            this.setState({ AllAssets: JSON.parse(sessionStorage.getItem('NewMeterWizard.AllAssets')) });
        else
            $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/Asset`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done((assets: Array<OpenXDA.Asset>) => {
                this.setState({ AllAssets: assets });
                sessionStorage.setItem('NewMeterWizard.AllAssets', JSON.stringify(assets));
            });
    }

    getAssetTypes(): void {
        if (sessionStorage.hasOwnProperty('NewMeterWizard.AssetTypes'))
            this.setState({ AssetTypes: JSON.parse(sessionStorage.getItem('NewMeterWizard.AssetTypes')) });
        else
            $.ajax({
                type: "GET",
                url: `${homePath}api/OpenXDA/AssetType`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done((assetTypes: Array<OpenXDA.AssetType>) => {
                this.setState({ AssetTypes: assetTypes });
                sessionStorage.setItem('NewMeterWizard.AssetTypes', JSON.stringify(assetTypes));
            });
    }

    getDifferentAsset(assetID: number): void {
        let assetTypeID = this.state.AllAssets.find(a => a.ID == assetID)['AssetTypeID']; 
        let assetType = this.state.AssetTypes.find(at => at.ID == assetTypeID)
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/${assetType.Name}/One/${assetID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((asset: OpenXDA.Asset) => {
            asset.AssetType = assetType.Name;
            asset.Channels = [];

            if (assetType.Name == 'Line')
                (asset as OpenXDA.Line).Segment = this.getNewAsset('LineSegment') as OpenXDA.LineSegment;
            this.setState({ NewEditAsset: asset }, () => {
                if (this.state.NewEditAsset.AssetType == 'Breaker')
                    this.getEDNAPoint(this.state.NewEditAsset.ID);
            });
        });
    }

    getEDNAPoint(assetID: number): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${assetID}/EDNAPoint`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((ednaPoint: OpenXDA.EDNAPoint) => {
            let record: OpenXDA.Breaker = _.clone(this.state.NewEditAsset, true);
            if (ednaPoint != undefined) {
                record.EDNAPoint = ednaPoint.Point
                this.setState({ NewEditAsset: record });
            }
        });
    }


    render() {
        return (
            <>
                <div className="row" style={{margin: -20}}>
                    <div className="col-lg-4">
                        <ul style={{ width: '100%', height: window.innerHeight - 285, maxHeight: window.innerHeight - 285, overflowY: 'auto', padding: 0, margin: 0 }}>
                            {
                                this.props.Channels.map((channel, index) => <li style={{textDecoration: (channel.Asset.length > 0 ? 'line-through' : null)}} key={index}>{channel.Name + ' - ' + channel.Description}</li>)
                            }
                        </ul>
                    </div>
                    <div className="col" style={{padding: 20}}>
                        <div style={{ width: '100%', height: 38 }}>
                            <button className="btn btn-primary pull-right" data-toggle='modal' data-target='#assetModal' onClick={() => this.setState({NewEdit: NewEdit.New})}>Add Asset</button>
                        </div>

                        <div style={{ width: '100%', maxHeight: window.innerHeight - 350, padding: 30, overflowY: 'auto' }}>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Key</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>kV</th>
                                        <th>Channels</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.Assets.map((asset: OpenXDA.Asset, index, array) => {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: '10%' }}>{(asset.ID == 0 ? 'New' : 'Existing')}</td>
                                                    <td style={{ width: '20%' }}>{asset.AssetKey}</td>
                                                    <td style={{ width: '30%' }}>{asset.AssetName}</td>
                                                    <td style={{ width: '10%' }}>{asset.AssetType}</td>
                                                    <td style={{ width: '10%' }}>{asset.VoltageKV}</td>
                                                    <td style={{ width: '10%' }}>{asset.Channels.length}</td>
                                                    <td style={{ width: '10%' }}>
                                                        <button className="btn btn-sm" data-toggle='modal' data-target='#assetModal' onClick={(e) => this.editAsset(index)}><span><i className="fa fa-pencil"></i></span></button>
                                                        <button className="btn btn-sm" onClick={(e) => this.deleteAsset(index)}><span><i className="fa fa-times"></i></span></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div className="modal" id="assetModal">
                    <div className="modal-dialog" style={{maxWidth: '100%', width: '90%'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{this.state.NewEdit == NewEdit.New ? 'Add New Asset to Meter': 'Edit ' + this.state.NewEditAsset.AssetKey + ' for Meter' }</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label>Select Asset</label>
                                            <select className="form-control" value={this.state.NewEditAsset.ID.toString()} onChange={(evt) => {
                                                if (evt.target.value != "0")
                                                    this.getDifferentAsset(parseInt(evt.target.value));
                                                else
                                                    this.setState({ NewEditAsset: this.getNewAsset('Line') });
                                            }}>
                                                <option key={0} value="0">Add New</option>

                                                {
                                                    this.state.AllAssets.map((asset, index) => <option key={index + 1} value={asset.ID} >{asset.AssetKey}</option>)
                                                }

                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Type</label>
                                            <select className="form-control" value={this.state.NewEditAsset.AssetType} onChange={(evt) => {
                                                this.changeAssetType(evt.target.value as 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer')
                                            }} disabled={this.state.NewEditAsset.ID != 0}>
                                                {
                                                    this.state.AssetTypes.map(assetType => <option value={assetType.Name} key={assetType.ID} hidden={assetType.Name == 'LineSegment'}>{assetType.Name}</option>)
                                                }

                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Key</label>
                                            <input className={(this.state.NewEditAsset.AssetKey != null && this.state.NewEditAsset.AssetKey.length > 0 && this.state.AllAssets.map(asset => asset.AssetKey.toLowerCase()).indexOf(this.state.NewEditAsset.AssetKey.toLowerCase()) < 0 ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                                                let asset = _.clone(this.state.NewEditAsset, true);

                                                if (evt.target.value != "")
                                                    asset.AssetKey = evt.target.value;
                                                else
                                                    asset.AssetKey = null;

                                                this.setState({ NewEditAsset: asset });
                                            }} value={this.state.NewEditAsset.AssetKey == null ? '' : this.state.NewEditAsset.AssetKey} required={true} disabled={this.state.NewEdit == NewEdit.Edit ||this.state.NewEditAsset.ID != 0 } />
                                            <div className='invalid-feedback'>{(this.state.AllAssets.map(asset => asset.AssetKey.toLowerCase()).indexOf(this.state.NewEditAsset.AssetKey.toLowerCase()) < 0 ? 'A unique key is required.' : 'The key provided is not unique.')}</div>
                                        </div>

                                        <div className="form-group">
                                            <label>Name</label>
                                            <input className={(this.state.NewEditAsset.AssetName != null && this.state.NewEditAsset.AssetName.length > 0 ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                                                var asset = _.clone(this.state.NewEditAsset, true);
                                                if (evt.target.value != "")
                                                    asset.AssetName = evt.target.value;
                                                else
                                                    asset.AssetName = null;

                                                this.setState({ NewEditAsset: asset });
                                            }} value={this.state.NewEditAsset == null || this.state.NewEditAsset.AssetName == null ? '' : this.state.NewEditAsset.AssetName} disabled={this.state.NewEditAsset.ID != 0} />
                                            <div className='invalid-feedback'>Name is a required field.</div>
                                        </div>

                                        <div className="form-group">
                                            <label>Nominal Voltage (kV)</label>
                                            <input className={(this.state.NewEditAsset.VoltageKV != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                                                var asset = _.clone(this.state.NewEditAsset, true);
                                                if (evt.target.value != "")
                                                    asset.VoltageKV = evt.target.value;
                                                else
                                                    asset.VoltageKV = null;

                                                this.setState({ NewEditAsset: asset });
                                            }} value={this.state.NewEditAsset == null || this.state.NewEditAsset.VoltageKV == null ? '' : this.state.NewEditAsset.VoltageKV} disabled={this.state.NewEditAsset.ID != 0}/>
                                            <div className='invalid-feedback'>Nominal Voltage is a required field.</div>
                                        </div>


                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea rows={2} className="form-control" onChange={(evt) => {
                                                var asset: OpenXDA.Asset = _.clone(this.state.NewEditAsset, true);
                                                if (evt.target.value != "")
                                                    asset.Description = evt.target.value;
                                                else
                                                    asset.Description = null;

                                                this.setState({ NewEditAsset: asset });
                                            }} value={this.state.NewEditAsset == null || this.state.NewEditAsset.Description == null ? '' : this.state.NewEditAsset.Description} disabled={this.state.NewEditAsset.ID != 0} />
                                        </div>


                                    </div>
                                    <div className="col">
                                        { this.showAttributes() }
                                    </div>
                                    <div className="col">
                                        <select multiple style={{ height: '100%', width: '100%' }} onChange={(evt) => {
                                            let asset: OpenXDA.Asset = _.clone(this.state.NewEditAsset, true);
                                            asset.Channels = ($(evt.target).val() as Array<string>).map(a => this.props.Channels[parseInt(a)])
                                            this.setState({ NewEditAsset: asset });
                                        }} value={this.state.NewEditAsset.Channels.map(a => a.ID.toString())}>
                                            {
                                                this.props.Channels.map((channel, index) => <option key={index} value={index} hidden={ channel.Asset != this.state.NewEditAsset.AssetKey && channel.Asset.length> 0}>{channel.Name + ' - ' + channel.Description}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(evt) => {
                                    let record: OpenXDA.Asset = _.clone(this.state.NewEditAsset, true);
                                    let list = _.clone(this.props.Assets, true);
                                    let channels: Array<OpenXDA.Channel> = _.clone(this.props.Channels, true);

                                    $.each(channels, (index, channel) => {
                                        if (channel.Asset == record.AssetKey)
                                            channel.Asset = ''

                                        if (record.Channels.findIndex(c => c.ID == channel.ID) >= 0)
                                            channel.Asset = record.AssetKey
                                    });
                                    list.push(record);
                                    this.props.UpdateState({ Channels: channels });
                                    this.props.UpdateState({ Assets: list });
                                    this.setState({ NewEditAsset: this.getNewAsset('Line') });

                                }} hidden={this.state.NewEdit != NewEdit.New}>Save</button>

                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(evt) => {
                                    let record: OpenXDA.Asset = _.clone(this.state.NewEditAsset, true);
                                    let list = _.clone(this.props.Assets, true);
                                    let channels: Array<OpenXDA.Channel> = _.clone(this.props.Channels, true);
                                    let i = list.findIndex(r => r.AssetKey == record.AssetKey);
                                    list[i] = record;
                                    $.each(channels, (index, channel) => {
                                        if (channel.Asset == record.AssetKey)
                                            channel.Asset = ''

                                        if (record.Channels.findIndex(c => c.ID == channel.ID) >= 0)
                                            channel.Asset = record.AssetKey
                                    });

                                    this.props.UpdateState({ Channels: channels });
                                    this.props.UpdateState({ Assets: list });
                                    this.setState({ NewEditAsset: this.getNewAsset('Line') })
                                }} hidden={this.state.NewEdit != NewEdit.Edit}>Save</button>


                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => {
                                    this.setState({ NewEditAsset: this.getNewAsset('Line') })
                                }}>Close</button>
                            </div>

                        </div>
                    </div>
                </div>

        </>
        );
    }

    disableModalSave(): boolean {
        return $('.is-invalid').length > 0;
    }

    showAttributes(): JSX.Element {
        if (this.state.NewEditAsset.AssetType == 'Breaker')
            return this.showBreakerAttributes();
        else if (this.state.NewEditAsset.AssetType == 'Bus')
            return this.showBusAttributes();
        else if (this.state.NewEditAsset.AssetType == 'CapacitorBank')
            return this.showCapBankAttributes();
        else if (this.state.NewEditAsset.AssetType == 'Line')
            return this.showLineAttributes();
        else if (this.state.NewEditAsset.AssetType == 'Transformer')
            return this.showTransformerAttributes();
    }

    showBreakerAttributes(): JSX.Element {
        var record = this.state.NewEditAsset as OpenXDA.Breaker
        return (
            <>
                <div className="form-group">
                    <label>Thermal Rating</label>
                    <input className={(record.ThermalRating != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.ThermalRating = evt.target.value;
                        else
                            asset.ThermalRating = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.ThermalRating == null ? 0 : record.ThermalRating} type='number' disabled={this.state.NewEditAsset.ID != 0}/>
                    <div className='invalid-feedback'>Thermal rating is a required field.</div>
                </div>
                <div className="form-group">
                    <label>Speed</label>
                    <input className={(record.Speed != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.Speed = evt.target.value;
                        else
                            asset.Speed = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.Speed == null ? 0 : record.Speed} type='number' disabled={this.state.NewEditAsset.ID != 0}/>
                    <div className='invalid-feedback'>Speed is a required field.</div>
                </div>
                <div className="form-group">
                    <label>Trip Time</label>
                    <input className="form-control" onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.TripTime = evt.target.value;
                        else
                            asset.TripTime = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.TripTime == null ? 0 : record.TripTime} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                </div>
                <div className="form-group">
                    <label>Pickup Time</label>
                    <input className="form-control" onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.PickupTime = evt.target.value;
                        else
                            asset.PickupTime = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.PickupTime == null ? 0 : record.PickupTime} type='number' disabled={this.state.NewEditAsset.ID != 0}/>
                </div>

                <div className="form-group">
                    <label>TripCoil Condition</label>
                    <input className="form-control" onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.TripCoilCondition = evt.target.value;
                        else
                            asset.TripCoilCondition = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.TripCoilCondition == null ? 0 : record.TripCoilCondition} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                </div>

                <div className="form-group">
                    <label>EDNA Point</label>
                    <input className="form-control" onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.EDNAPoint = evt.target.value;
                        else
                            asset.EDNAPoint = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.EDNAPoint == null ? '' : record.EDNAPoint} type='text' disabled={this.state.NewEditAsset.ID != 0} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" style={{ left: 2, top: 6, zIndex: 1 }} checked={this.state.NewEditAsset.Spare} onChange={(evt) => {
                            var asset: OpenXDA.Asset = _.clone(this.state.NewEditAsset, true);
                            asset.Spare = evt.target.checked;

                            this.setState({ NewEditAsset: asset });
                        }} />
                        <label className="custom-control-label" >Spare</label>
                    </div>
                </div>


            </>
        );
    }

    showBusAttributes(): JSX.Element {
        var record = this.state.NewEditAsset as OpenXDA.Bus

        return <span>No Additional Attributes</span>;
    }

    showCapBankAttributes(): JSX.Element {
        var record = this.state.NewEditAsset as OpenXDA.CapBank

        return (
            <>
                <div className="form-group">
                    <label>Number of Banks</label>
                    <input className={(record.NumberOfBanks != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.NumberOfBanks = evt.target.value;
                        else
                            asset.NumberOfBanks = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.NumberOfBanks == null ? 0 : record.NumberOfBanks} type='number' disabled={this.state.NewEditAsset.ID != 0}/>
                    <div className='invalid-feedback'>Number Of Banks is a required field.</div>
                </div>

                <div className="form-group">
                    <label>Cans per Bank</label>
                    <input className={(record.CansPerBank != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.CansPerBank = evt.target.value;
                        else
                            asset.CansPerBank = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.CansPerBank == null ? 0 : record.CansPerBank} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>Cans Per Bank is a required field.</div>
                </div>

                <div className="form-group">
                    <label>Capacitance per Bank</label>
                    <input className={(record.CapacitancePerBank != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.CapacitancePerBank = evt.target.value;
                        else
                            asset.CapacitancePerBank = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.CapacitancePerBank == null ? 0 : record.CapacitancePerBank} type='number' disabled={this.state.NewEditAsset.ID != 0}/>
                    <div className='invalid-feedback'>Capacitance per Bank is a required field.</div>
                </div>

            </>
        );
    }

    showLineAttributes(): JSX.Element {
        var record = this.state.NewEditAsset as OpenXDA.Line

        return (
            <>
                <div className="form-group">
                    <label>Max Fault Distance</label>
                    <input className="form-control" onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.MaxFaultDistance = evt.target.value;
                        else
                            asset.MaxFaultDistance = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.MaxFaultDistance == null ? 0 : record.MaxFaultDistance} type='number' disabled={this.state.NewEditAsset.ID != 0}/>
                </div>

                <div className="form-group">
                    <label>MinFaultDistance</label>
                    <input className="form-control" onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.MinFaultDistance = evt.target.value;
                        else
                            asset.MinFaultDistance = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.MinFaultDistance == null ? 0 : record.MinFaultDistance} type='number' disabled={this.state.NewEditAsset.ID != 0}/>
                </div>

                <div className="form-group">
                    <label>Length</label>
                    <input className={(record.Segment != null && record.Segment.Length != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.Segment.Length = evt.target.value;
                        else
                            asset.Segment.Length = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.Segment == null || record.Segment.Length == null ? 0 : record.Segment.Length} type='number' disabled={this.state.NewEditAsset.ID != 0}/>
                    <div className='invalid-feedback'>Length is a required field.</div>
                </div>


                <div className="form-group">
                    <label>R0</label>
                    <input className={(record.Segment != null && record.Segment.R0 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.Segment.R0 = evt.target.value;
                        else
                            asset.Segment.R0 = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.Segment == null || record.Segment.R0 == null ? 0 : record.Segment.R0} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>R0 is a required field.</div>
                </div>

                <div className="form-group">
                    <label>X0</label>
                    <input className={(record.Segment != null && record.Segment.X0 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.Segment.X0 = evt.target.value;
                        else
                            asset.Segment.X0 = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.Segment == null || record.Segment.X0 == null ? 0 : record.Segment.X0} type='number' disabled={this.state.NewEditAsset.ID != 0}/>
                    <div className='invalid-feedback'>X0 is a required field.</div>
                </div>

                <div className="form-group">
                    <label>R1</label>
                    <input className={(record.Segment != null && record.Segment.R1 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.Segment.R1 = evt.target.value;
                        else
                            asset.Segment.R1 = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.Segment == null || record.Segment.R1 == null ? 0 : record.Segment.R1} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>R1 is a required field.</div>
                </div>

                <div className="form-group">
                    <label>X1</label>
                    <input className={(record.Segment != null && record.Segment.X1 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.Segment.X1 = evt.target.value;
                        else
                            asset.Segment.X1 = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.Segment == null || record.Segment.X1 == null ? 0 : record.Segment.X1} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>X1 is a required field.</div>
                </div>

                <div className="form-group">
                    <label>Thermal Rating</label>
                    <input className={(record.Segment != null && record.Segment.ThermalRating != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.Segment.ThermalRating = evt.target.value;
                        else
                            asset.Segment.ThermalRating = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.Segment == null || record.Segment.ThermalRating == null ? 0 : record.Segment.ThermalRating} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>Thermal Rating is a required field.</div>
                </div>


            </>
        );
    }

    showTransformerAttributes(): JSX.Element {
        var record = this.state.NewEditAsset as OpenXDA.Transformer

        return (
            <>
                <div className="form-group">
                    <label>R0</label>
                    <input className={(record.R0 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.R0 = evt.target.value;
                        else
                            asset.R0 = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.R0 == null ? 0 : record.R0} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>R0 is a required field.</div>
                </div>

                <div className="form-group">
                    <label>X0</label>
                    <input className={(record.X0 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.X0 = evt.target.value;
                        else
                            asset.X0 = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.X0 == null ? 0 : record.X0} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>X0 is a required field.</div>
                </div>

                <div className="form-group">
                    <label>R1</label>
                    <input className={(record.R1 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.R1 = evt.target.value;
                        else
                            asset.R1 = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.R1 == null ? 0 : record.R1} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>R1 is a required field.</div>
                </div>

                <div className="form-group">
                    <label>X1</label>
                    <input className={(record.X1 != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.X1 = evt.target.value;
                        else
                            asset.X1 = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.X1 == null ? 0 : record.X1} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>X1 is a required field.</div>
                </div>

                <div className="form-group">
                    <label>Thermal Rating</label>
                    <input className={(record.ThermalRating != null ? "form-control" : "form-control is-invalid")} onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.ThermalRating = evt.target.value;
                        else
                            asset.ThermalRating = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.ThermalRating == null ? 0 : record.ThermalRating} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                    <div className='invalid-feedback'>Thermal Rating is a required field.</div>
                </div>

                <div className="form-group">
                    <label>Primary Voltage (kV)</label>
                    <input className="form-control" onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.PrimaryVoltageKV = evt.target.value;
                        else
                            asset.PrimaryVoltageKV = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.PrimaryVoltageKV == null ? 0 : record.PrimaryVoltageKV} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                </div>

                <div className="form-group">
                    <label>Secondary Voltage (kV)</label>
                    <input className="form-control" onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.SecondaryVoltageKV = evt.target.value;
                        else
                            asset.SecondaryVoltageKV = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.SecondaryVoltageKV == null ? 0 : record.SecondaryVoltageKV} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                </div>

                <div className="form-group">
                    <label>Tap</label>
                    <input className="form-control" onChange={(evt) => {
                        var asset = _.clone(record, true);
                        if (evt.target.value != "")
                            asset.Tap = evt.target.value;
                        else
                            asset.Tap = null;

                        this.setState({ NewEditAsset: asset });
                    }} value={record == null || record.Tap == null ? 0 : record.Tap} type='number' disabled={this.state.NewEditAsset.ID != 0} />
                </div>

            </>
        );
    }

}

