//******************************************************************************************************
//  MeterAsset.tsx - Gbtc
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
//  01/16/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA, SystemCenter } from '../global';

import BusAttributes from '../AssetAttribute/Bus';
import BreakerAttributes from '../AssetAttribute/Breaker';
import CapBankAttributes from '../AssetAttribute/CapBank';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
import { AssetAttributes } from '../AssetAttribute/Asset';
import { getAssetTypes, getAllAssets, getAssetWithAdditionalFields, editExistingAsset } from '../../../TS/Services/Asset';
import Table from '@gpa-gemstone/react-table';
import { Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import { Warning, Modal, LoadingScreen } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

interface IProps { Meter: OpenXDA.Meter }

const MeterAssetWindow = (props: IProps) => {

    const [meterAssets, setMeterAssets] = React.useState < Array<OpenXDA.DetailedAsset>>([]);
    const [newEditAsset, setNewEditAsset] = React.useState<OpenXDA.DetailedAsset>(AssetAttributes.getNewAsset('Line'));
    const [allAssets, setAllAssets] = React.useState<OpenXDA.Asset[]>([]);
    const [assetTypes, setAssetTypes] = React.useState<OpenXDA.AssetType[]>([]);
    const [newEdit, setNewEdit] = React.useState<SystemCenter.NewEdit>('New');
    const [activeAssetID, setActiveAssetID] = React.useState<number>(0);
    const [activeAssetType, setActiveAssetType] = React.useState<OpenXDA.AssetTypeName>('Line');

    const [showEditNew, setShoweditNew] = React.useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = React.useState<boolean>(false);

    const [sortField, setSortField] = React.useState<string>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showLoading, setShowLoading] = React.useState<boolean>(false);

    const [assetReloadCounter, forceAssetReload] = React.useState<number>(0);

    React.useEffect(() => {
        let h = getAssetTypes()
        h.done((data: Array<OpenXDA.AssetType>) => {
            setAssetTypes(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [])

    React.useEffect(() => {
        let h = getAllAssets()
        h.done((data: Array<OpenXDA.Asset>) => {
            setAllAssets(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [assetReloadCounter])

    React.useEffect(() => {
        let h = getAllAssets()
        h.done((data: Array<OpenXDA.Asset>) => {
            setAllAssets(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [])

    React.useEffect(() => {
        let h = getMeterAssets();
        h.done((data: Array<OpenXDA.Asset>) => {
            setMeterAssets(data);
        });

        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [props.Meter, ascending, sortField])

    React.useEffect(() => {
        if (activeAssetID == 0) {
            setNewEditAsset(AssetAttributes.getNewAsset(activeAssetType));
            setNewEdit('New');
            return;
        }

        let h = getAssetWithAdditionalFields(activeAssetID, activeAssetType);
        h.then(record => { setNewEditAsset(record); setNewEdit('Edit') });

    }, [activeAssetID, activeAssetType]);

    function getMeterAssets(): JQueryXHR {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Asset/${sortField}/${ascending? 1: 0}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        })
    }

    function deleteAsset() {
        setShowLoading(true);
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Meter/${props.Meter.ID}/Asset/${activeAssetID}/${props.Meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((assets: Array<OpenXDA.Asset>) => {
            setSortField('AssetKey');
            forceAssetReload((x) => x + 1);
            setShowLoading(false);
        }).fail((msg) => {
            setShowLoading(false);
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else 
                sessionStorage.clear();            
        });
    }
    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Assets:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row" style={{ margin: -20 }}>
                    <div className="col" style={{ padding: 20 }}>
                        <div style={{ width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' }}>
                            <Table<OpenXDA.Asset>
                                cols={[
                                    { key: 'AssetKey', label: 'Key', headerStyle: { width: 'calc(20%-16px)' }, rowStyle: { width: 'calc(20%-16px)' } },
                                    { key: 'AssetName', label: 'Name', headerStyle: { width: 'calc(30%-16px)' }, rowStyle: { width: 'calc(30%-16px)' } },
                                    { key: 'AssetType', label: 'Type', headerStyle: { width: 'calc(10%-16px)' }, rowStyle: { width: 'calc(10%-16px)' } },
                                    { key: 'VoltageKV', label: 'Base kV', headerStyle: { width: 'calc(10%-16x)' }, rowStyle: { width: 'calc(10%-16px)' } },
                                    { key: 'Channels', label: 'Channels', headerStyle: { width: 'calc(10%-16px)' }, rowStyle: { width: 'calc(10%-16px)' } },
                                    
                                    {
                                        key: null, label: '', headerStyle: { width: 80, paddingLeft: 0, paddingRight: 5 }, rowStyle: { width: 80, paddingLeft: 0, paddingRight: 5 },
                                        content: (item) => <> <button className="btn btn-sm"
                                            onClick={(e) => {
                                                setActiveAssetType(item.AssetType);
                                                setActiveAssetID(item.ID);
                                                setShoweditNew(true);
                                            }}><span>{Pencil}</span></button>
                                            <button className="btn btn-sm"
                                                onClick={(e) => {
                                                    setActiveAssetType(item.AssetType);
                                                    setActiveAssetID(item.ID);
                                                    setShowDeleteWarning(true)
                                                }}><span>{TrashCan}</span></button>
                                        </>
                                    }
                                ]}
                                tableClass="table table-hover"
                                data={meterAssets}
                                sortField={sortField}
                                ascending={ascending}
                                onSort={(d) => {
                                    if (d.col == null || d.col == 'ID')
                                        return;
                                    if (d.col == sortField)
                                        setAscending(!ascending);
                                    else {
                                        setAscending(true);
                                        setSortField(d.col);
                                    }
                                }}
                                onClick={(fld) => { }}
                                theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }}
                                rowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                selected={(item) => false}
                            />

                            <Warning Show={showDeleteWarning} CallBack={(confirmed) => { if (confirmed) deleteAsset(); setShowDeleteWarning(false); }} Title={'Remove this Asset'} Message={'This will permanently remove this Asset from the Meter.'} />
                            <LoadingScreen Show={showLoading} />
                            <Modal Show={showEditNew}
                                Title={newEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + newEditAsset.AssetKey + ' for Meter'}
                                Size={'lg'}
                                ShowX={true}
                                ShowCancel={false}
                                ConfirmText={'Save'}
                                CallBack={(confirm) => { setShoweditNew(false); if (!confirm) return; }}
                                ConfirmShowToolTip={AssetAttributes.AttributeError(newEditAsset).length > 0}
                                DisableConfirm={AssetAttributes.AttributeError(newEditAsset).length > 0}
                                ConfirmToolTipContent={
                                    AssetAttributes.AttributeError(newEditAsset).map((e, i) => <p key={i}><ErrorSymbol /> {e}</p>)
                                }
                            >
                                <div className="row">
                                    <div className="col">
                                        <AssetAttributes.AssetAttributeFields Asset={newEditAsset} NewEdit={newEdit} AssetTypes={assetTypes} AllAssets={allAssets}
                                            UpdateState={setNewEditAsset}
                                            GetDifferentAsset={(assetID) => {
                                                setActiveAssetID(assetID);
                                                setActiveAssetType(allAssets.find(a => a.ID == assetID).AssetType)
                                        }} />
                                    </div>
                                    <div className="col">
                                        {showAttributes()}
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary pull-right" onClick={() => {
                        setActiveAssetID(0); setActiveAssetType('Line'); setShoweditNew(true);
                    }}>Add Asset</button>
                </div>
            </div>
        </div>
    );


    function showAttributes(): JSX.Element {
        if (newEditAsset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Breaker} UpdateState={setNewEditAsset} ShowSpare={true} />;
        else if (newEditAsset.AssetType == 'Bus')
            return <BusAttributes NewEdit={newEdit} Asset={newEditAsset} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.CapBank} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Line')
            return <LineAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Line} UpdateState={setNewEditAsset} />;
        else if (newEditAsset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={newEdit} Asset={newEditAsset as OpenXDA.Transformer} UpdateState={setNewEditAsset} />;
    }
}

export default MeterAssetWindow;

const ErrorSymbol = () => <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i>

/*
export default class MeterAssetWindow extends React.Component<{ Meter: OpenXDA.Meter }, MeterAssetState, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            NewEditAsset: AssetAttributes.getNewAsset('Line'),
            AllAssets: [],
            AssetTypes: [],
            NewEdit: 'New',
            Assets: []

        }

        this.addNewAsset = this.addNewAsset.bind(this);
        this.addExistingAsset = this.addExistingAsset.bind(this);
        this.addNewButton = this.addNewButton.bind(this);
    }

    componentDidMount() {
        this.getMeterAssets();
        getAllAssets().done((assets: Array<OpenXDA.Asset>) => {
            this.setState({ AllAssets: assets });
        });
        getAssetTypes().done((assetTypes: Array<OpenXDA.AssetType>) => {
            this.setState({ AssetTypes: assetTypes });
        });
    }

    deleteAsset(asset: OpenXDA.Asset) {
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Meter/${this.props.Meter.ID}/Asset/${asset.ID}/${this.props.Meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((assets: Array<OpenXDA.Asset>) => {
            this.getMeterAssets();
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                sessionStorage.clear();
                this.componentDidMount();
            }

        });
    }

    addNewButton(): void {
        this.setState({ NewEdit: 'New', NewEditAsset: AssetAttributes.getNewAsset('Line') });
    }

    addNewAsset() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/New/Meter/${this.props.Meter.ID}/${this.props.Meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({Asset: this.state.NewEditAsset}),
            cache: false,
            async: true
        }).done(() => {
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                sessionStorage.clear();
                this.componentDidMount();
                this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') });
            }

        });

    }

    addExistingAsset() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/Existing/Meter/${this.props.Meter.ID}/${this.props.Meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: this.state.NewEditAsset }),
            cache: false,
            async: true
        }).done(() => {
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                sessionStorage.clear();
                this.componentDidMount();
                this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') });
            }

        });

    }


    getMeterAssets(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${this.props.Meter.ID}/Asset`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((assets: Array<OpenXDA.Asset>) => {
            this.setState({ Assets: assets });
        });
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Assets:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row" style={{margin: -20}}>
                        <div className="col" style={{padding: 20}}>
                            <div style={{ width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' }}>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
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
                                            this.state.Assets.map((asset: OpenXDA.Asset, index, array) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ width: '20%' }}>{asset.AssetKey}</td>
                                                        <td style={{ width: '30%' }}>{asset.AssetName}</td>
                                                        <td style={{ width: '10%' }}>{asset.AssetType}</td>
                                                        <td style={{ width: '10%' }}>{asset.VoltageKV}</td>
                                                        <td style={{ width: '10%' }}>{asset.Channels}</td>
                                                        <td style={{ width: '10%' }}>
                                                            <button className="btn btn-sm" data-toggle='modal' data-target='#assetModal' onClick={(e) => {
                                                                let assetType = this.state.AssetTypes.find(at => at.ID == asset['AssetTypeID'])
                                                                getAssetWithAdditionalFields(asset.ID, assetType.Name).then(record => this.setState({ NewEditAsset: record, NewEdit: 'Edit' }));
                                                            }}><span><i className="fa fa-pencil"></i></span></button>
                                                            <button className="btn btn-sm" onClick={(e) => this.deleteAsset(asset)}><span><i className="fa fa-times"></i></span></button>
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
                        <div className="modal-dialog" style={{maxWidth: '100%', width: '75%'}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">{this.state.NewEdit == 'New' ? 'Add New Asset to Meter': 'Edit ' + this.state.NewEditAsset.AssetKey + ' for Meter' }</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={(evt) => {
                                        this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') })
                                    }}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col">
                                            <AssetAttributes Asset={this.state.NewEditAsset} NewEdit={this.state.NewEdit} AssetTypes={this.state.AssetTypes} AllAssets={this.state.AllAssets} UpdateState={(asset) => this.setState({ NewEditAsset: asset })} GetDifferentAsset={(assetID) => {
                                                let asset = this.state.AllAssets.find(a => a.ID == assetID);
                                                let assetType = this.state.AssetTypes.find(at => at.ID == asset['AssetTypeID'])
                                                getAssetWithAdditionalFields(assetID, assetType.Name).then(asset => this.setState({ NewEditAsset: asset }));
                                            }} />
                                        </div>
                                        <div className="col">
                                            { this.showAttributes() }
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNewAsset} hidden={this.state.NewEdit == 'Edit' || this.state.NewEditAsset.ID != 0}>Save</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addExistingAsset} hidden={this.state.NewEdit == 'Edit' || this.state.NewEditAsset.ID == 0 }>Save</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => {
                                        editExistingAsset(this.state.NewEditAsset).then((asset) => {
                                            sessionStorage.clear();
                                            this.componentDidMount();
                                            this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') });
                                        });
                                    }} hidden={this.state.NewEdit == 'New'}>Save</button>


                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => {
                                        this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') })
                                    }}>Close</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary pull-right" data-toggle='modal' data-target='#assetModal' onClick={this.addNewButton}>Add Asset</button>
                    </div>
                </div>
            </div>
        );
    }

    showAttributes(): JSX.Element {
        if (this.state.NewEditAsset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={this.state.NewEdit} Asset={this.state.NewEditAsset as OpenXDA.Breaker} UpdateState={(newEditAsset: OpenXDA.Breaker) => this.setState({ NewEditAsset: newEditAsset })} ShowSpare={true} />;
        else if (this.state.NewEditAsset.AssetType == 'Bus')
            return <BusAttributes NewEdit={this.state.NewEdit} Asset={this.state.NewEditAsset} UpdateState={(newEditAsset: OpenXDA.Bus) => this.setState({NewEditAsset: newEditAsset})} />;
        else if (this.state.NewEditAsset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={this.state.NewEdit} Asset={this.state.NewEditAsset as OpenXDA.CapBank} UpdateState={(newEditAsset: OpenXDA.CapBank) => this.setState({ NewEditAsset: newEditAsset })} />;
        else if (this.state.NewEditAsset.AssetType == 'Line')
            return <LineAttributes NewEdit={this.state.NewEdit} Asset={this.state.NewEditAsset as OpenXDA.Line} UpdateState={(newEditAsset: OpenXDA.Line) => this.setState({ NewEditAsset: newEditAsset })} />;
        else if (this.state.NewEditAsset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={this.state.NewEdit}Asset={this.state.NewEditAsset as OpenXDA.Transformer} UpdateState={(newEditAsset: OpenXDA.Transformer) => this.setState({ NewEditAsset: newEditAsset })} />;
    }
}

*/