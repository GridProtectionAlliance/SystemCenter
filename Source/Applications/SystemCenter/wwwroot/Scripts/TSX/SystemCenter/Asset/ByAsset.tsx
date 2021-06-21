//******************************************************************************************************
//  ByAsset.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { AssetAttributes } from '../AssetAttribute/Asset';
import { getAssetTypes } from '../../../TS/Services/Asset';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { SystemCenter as SCGlobal } from '../global';
import BreakerAttributes from '../AssetAttribute/Breaker';
import CapBankAttributes from '../AssetAttribute/CapBank';
import BusAttributes from '../AssetAttribute/Bus';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
import LineSegmentAttributes from '../AssetAttribute/LineSegment';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import CapBankRelayAttributes from '../AssetAttribute/CapBankRelay';
import { SearchBar, Search } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table'
import { useDispatch, useSelector } from 'react-redux';
import { SelectAssetStatus, FetchAsset, SelectAssets } from '../Store/AssetSlice';


declare var homePath: string;
declare type AssetTab = 'Bus' | 'Line' | 'Transformer' | 'CapacitorBank' | 'Breaker'


const defaultSearchcols: Array<Search.IField<Asset>> = [
    { label: 'Name', key: 'Name', type: 'string' },
];


interface Asset {
    ID: number, AssetKey: string, AssetName: string, AssetType: string, VoltageKV: number, Meters: number, Locations: string
}
declare var homePath: string;

const ByAsset: SCGlobal.ByComponent = (props) => {
    let history = useHistory();

    const [search, setSearch] = React.useState<Array<Search.IFilter<Asset>>>([]);
    const [data, setData] = React.useState<Array<Asset>>([]);
    const [sortField, setSortField] = React.useState<keyof Asset>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [newAsset, setNewAsset] = React.useState<OpenXDA.Types.Asset>(AssetAttributes.getNewAsset('Line'));


    const [assetTypes, setAssetTypes] = React.useState<Array<OpenXDA.Types.AssetType>>([]);
    const [extDBtab, setextDBTab] = React.useState<string>(getextDBTab());

    const [filterableList, setFilterableList] = React.useState<Array<Search.IField<Asset>>>(defaultSearchcols);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');

    const allAssets = useSelector(SelectAssets);
    const aStatus = useSelector(SelectAssetStatus);
    const dispatch = useDispatch();
   
    React.useEffect(() => {
        let handle = getAssets();
        handle.done((dt: string) => {
            setSearchState('Idle');
            setData(JSON.parse(dt) as Array<Asset>);
        }).fail((d) => setSearchState('Error'));

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }, [sortField, ascending, search]);

    React.useEffect(() => {
        let handle = getAssetTypes();
        handle.done(ats => {
            setAssetTypes(ats)
            let asset = AssetAttributes.getNewAsset('Line');
            asset['AssetTypeID'] = ats.find(ats => ats.Name == 'Line').ID;
            setNewAsset(asset);

        });

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }, [])

    React.useEffect(() => {
        setFilterableList(defaultSearchcols);
        let handleLine = getAdditionalFields('Line');
        let handleBreaker = getAdditionalFields('Breaker');
        let handleCapBank = getAdditionalFields('CapBank');
        let handleTransformer = getAdditionalFields('Transformer');
        let handleBus = getAdditionalFields('Bus');
        
        return () => {
            if (handleLine.abort != null) handleLine.abort();
            if (handleBreaker.abort != null) handleBreaker.abort();
            if (handleCapBank.abort != null) handleCapBank.abort();
            if (handleTransformer.abort != null) handleTransformer.abort();
            if (handleBus.abort != null) handleBus.abort();
        }
    }, []);

    React.useEffect(() => {
        if (aStatus === 'unintiated' || aStatus === 'changed') {
            dispatch(FetchAsset());
            return function () {
            }
        }
    }, [dispatch, aStatus]);

    function getAdditionalFields(Type: string): JQuery.jqXHR<Array<SystemCenter.Types.AdditionalField>> {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalField/ParentTable/${Type}/FieldName/0`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });

        function ConvertType(type: string) {
            if (type == 'string' || type == 'integer' || type == 'number' || type == 'datetime' || type == 'boolean')
                return { type: type }
            return {
                type: 'enum', enum: [{ Label: type, Value: type }]
            }
        }

        handle.done((d: Array<SystemCenter.Types.AdditionalField>) => {

            setFilterableList(lst => {
                let ordered = _.orderBy(lst.concat(d.map(item => (
                    { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type) } as Search.IField<Asset>
                ))), ['label'], ["asc"]);
                return ordered;
            }
            )
        });

        return handle;
    }

    function getextDBTab(): AssetTab {
        if (sessionStorage.hasOwnProperty('AssetTab.AssetTab'))
            return JSON.parse(sessionStorage.getItem('Asset.AssetTab'));
        else
            return 'Bus';
    }


    function getAssets(): JQueryXHR {
        setSearchState('Loading');
        let searches = search.map(s => { if (defaultSearchcols.findIndex(item => item.key == s.FieldName) == -1) return { ...s, isPivotColumn: true }; else return s; })

        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/Asset/SearchableListIncludingMeter`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }

    function addNewAsset() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/${newAsset.AssetType}/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newAsset),
            cache: false,
            async: true
        }).done((newAsset: OpenXDA.Types.Asset) => {
            sessionStorage.clear();
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + newAsset.ID, state: {} })
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });

    }

    function showAttributes(): JSX.Element {
        if (newAsset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.Breaker} UpdateState={setNewAsset} ShowSpare={true} />;
        else if (newAsset.AssetType == 'Bus')
            return <BusAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.Bus} UpdateState={setNewAsset} />;
        else if (newAsset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.CapBank} UpdateState={setNewAsset} />;
        else if (newAsset.AssetType == 'CapacitorBankRelay')
            return <CapBankRelayAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.CapBankRelay} UpdateState={setNewAsset} />;
        else if (newAsset.AssetType == 'Line')
            return <LineAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.Line} UpdateState={setNewAsset} />;
        else if (newAsset.AssetType == 'LineSegment')
            return <LineSegmentAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.LineSegment} UpdateState={setNewAsset} />;
        else if (newAsset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.Transformer} UpdateState={setNewAsset} />;
    }


    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + item.row.ID, state: {} })
    }

    const standardSearch: Search.IField<Asset> = { label: 'Name', key: 'Name', type: 'string' };
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<Asset> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={standardSearch} Width={'50%'} Label={'Search'}
                ShowLoading={searchState == 'Loading'} ResultNote={searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Transmission Assets'}
                GetEnum={(setOptions, field) => {
                    let handle = null;
                    if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
                        return () => { };

                    handle = $.ajax({
                        type: "GET",
                        url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: true,
                        async: true
                    });

                    handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
                    return () => { if (handle != null && handle.abort == null) handle.abort(); }
                }}

            >
             
                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                                <div className="form-group">
                                    <button className="btn btn-primary" data-toggle='modal' data-target="#assetModal" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault() }}>Add Asset</button>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary" data-toggle='modal' data-target="#extDBModal" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault() }}>Update Ext DB </button>
                                </div>
                                    
                            </form>
                        </fieldset>
                    </li>
                </SearchBar>
                   

            <div style={{ width: '100%', height: 'calc( 100% - 180px)' }}>
                <Table
                    cols={[
                        { key: 'AssetKey', label: 'Key', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetType', label: 'Asset Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'VoltageKV', label: 'Voltage (kV)', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Meters', label: 'Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Locations', label: 'Substations', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortField={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.col == sortField)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortField(d.col);
                        }
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <div className="modal" id="assetModal">
                <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add a New Asset</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={(evt) => {
                                let asset = AssetAttributes.getNewAsset('Line');
                                asset['AssetTypeID'] = assetTypes.find(ats => ats.Name == 'Line').ID;
                                setNewAsset(asset);
                            }}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <AssetAttributes.AssetAttributeFields Asset={newAsset} NewEdit={'New'} AssetTypes={assetTypes} AllAssets={allAssets} UpdateState={setNewAsset} GetDifferentAsset={(assetID) => { }} HideSelectAsset={true} HideAssetType={false} />
                                </div>
                                <div className="col">
                                    {showAttributes()}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewAsset}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => {
                                let asset = AssetAttributes.getNewAsset('Line');
                                asset['AssetTypeID'] = assetTypes.find(ats => ats.Name == 'Line').ID;
                                setNewAsset(asset);
                            }}>Close</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal" id="extDBModal">
                <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Assets External Database Fields</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className={"nav-link" + (extDBtab == "Bus" ? " active" : "")} onClick={() => setextDBTab('Bus')} data-toggle="tab" href="#extDBBus">Buses</a>
                                </li>
                                <li className="nav-item">
                                    <a className={"nav-link" + (extDBtab == "Line" ? " active" : "")} onClick={() => setextDBTab('Line')} data-toggle="tab" href="#extDBLine">Lines</a>
                                </li>
                                <li className="nav-item">
                                    <a className={"nav-link" + (extDBtab == "Breaker" ? " active" : "")} onClick={() => setextDBTab('Breaker')} data-toggle="tab" href="#extDBBreaker">Breakers</a>
                                </li>
                                <li className="nav-item">
                                    <a className={"nav-link" + (extDBtab == "Transformer" ? " active" : "")} onClick={() => setextDBTab('Transformer')} data-toggle="tab" href="#extDBXFR">Transformers</a>
                                </li>
                                <li className="nav-item">
                                    <a className={"nav-link" + (extDBtab == "CapacitorBank" ? " active" : "")} onClick={() => setextDBTab('CapacitorBank')} data-toggle="tab" href="#extDBCapacitorBank">CapBanks</a>
                                </li>
                            </ul>

                            <div className="tab-content" style={{ maxHeight: window.innerHeight - 235, overflow: 'hidden' }}>
                                <div className={"tab-pane " + (extDBtab == "Bus" ? " active" : "fade")} id="extDBBus">
                                    <ExternalDBUpdate ID={-1} Type='Bus' Tab={extDBtab} />
                                </div>
                                <div className={"tab-pane " + (extDBtab == "Line" ? " active" : "fade")} id="extDBLine">
                                    <ExternalDBUpdate ID={-1} Type='Line' Tab={extDBtab} />
                                </div>
                                <div className={"tab-pane " + (extDBtab == "Breaker" ? " active" : "fade")} id="extDBBreaker">
                                    <ExternalDBUpdate ID={-1} Type='Breaker' Tab={extDBtab} />
                                </div>
                                <div className={"tab-pane " + (extDBtab == "Transformer" ? " active" : "fade")} id="extDBXFR">
                                    <ExternalDBUpdate ID={-1} Type='Transformer' Tab={extDBtab} />
                                </div>
                                <div className={"tab-pane " + (extDBtab == "CapacitorBank" ? " active" : "fade")} id="extDBCapacitorBank">
                                    <ExternalDBUpdate ID={-1} Type={'CapacitorBank'} Tab={extDBtab} />
                                </div>
                                
                            </div>                
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
         

        </div>
    )
}

export default ByAsset;

