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
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import BreakerAttributes from '../AssetAttribute/Breaker';
import CapBankAttributes from '../AssetAttribute/CapBank';
import BusAttributes from '../AssetAttribute/Bus';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
import LineSegmentAttributes from '../AssetAttribute/LineSegment';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import CapBankRelayAttributes from '../AssetAttribute/CapBankRelay';
import { Search, Modal, LoadingIcon, ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table'
import { useAppDispatch, useAppSelector } from '../hooks';
import { SelectAssetStatus, FetchAsset, SelectAssets } from '../Store/AssetSlice';
import { AssetTypeSlice, ByAssetSlice } from '../Store/Store';
import { DefaultSearch } from '@gpa-gemstone/common-pages';
import DERAttributes from '../AssetAttribute/DER';



declare type AssetTab = 'Bus' | 'Line' | 'Transformer' | 'CapacitorBank' | 'Breaker'

declare var homePath: string;

const ByAsset: Application.Types.iByComponent = (props) => {

    let history = useHistory();
    const data = useAppSelector(ByAssetSlice.SearchResults);
    const byAssetStatus = useAppSelector(ByAssetSlice.SearchStatus);
    const sortKey = useAppSelector(ByAssetSlice.SortField);
    const ascending = useAppSelector(ByAssetSlice.Ascending);

    const [newAsset, setNewAsset] = React.useState<OpenXDA.Types.Asset>(AssetAttributes.getNewAsset('Line'));
    const [loadAssetKey, setLoadAssetKey] = React.useState<string>(null);

    const [showEXTModal, setShowExtModal] = React.useState<boolean>(false);
    const [showNewModal, setShowNewModal] = React.useState<boolean>(false);

    const [extDBtab, setextDBTab] = React.useState<string>(getextDBTab());

    const [assetErrors, setAssetErrors] = React.useState<string[]>([]);
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle')

    const assetType = useAppSelector(AssetTypeSlice.Data);
    const assetTypeStatus = useAppSelector(AssetTypeSlice.Status);
    const allAssets = useAppSelector(SelectAssets);
    const aStatus = useAppSelector(SelectAssetStatus);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (byAssetStatus == 'changed' || byAssetStatus == 'unintiated')
            dispatch(ByAssetSlice.Fetch());
    }, [byAssetStatus]);

    React.useEffect(() => {
        if (assetTypeStatus == 'changed' || assetTypeStatus == 'unintiated')
            dispatch(AssetTypeSlice.Fetch());
    }, [assetTypeStatus]);

    React.useEffect(() => {
        if (assetType.length == 0)
            return;
        let asset = AssetAttributes.getNewAsset('Line');
        asset['AssetTypeID'] = assetType.find(ats => ats.Name == 'Line').ID;
        setNewAsset(asset);
    }, [assetType])

    React.useEffect(() => {
        if (aStatus === 'unintiated' || aStatus === 'changed')
            dispatch(FetchAsset());
        else if (loadAssetKey !== null && aStatus === 'idle') {
            const asset = allAssets.find(asset => asset.AssetKey == loadAssetKey);
            if (asset != null) {
                handleSelect(asset.ID);
                setLoadAssetKey(null);
            }
        }
    }, [dispatch, aStatus, loadAssetKey]);

    React.useEffect(() => {
        const errors = AssetAttributes.AssetError(newAsset, newAsset.AssetType);
        if (newAsset.AssetKey != null && allAssets.map(asset => asset.AssetKey.toLowerCase()).indexOf(newAsset.AssetKey.toLowerCase()) > -1)
            errors.push('Key must be unique.')

        setAssetErrors(errors);
    }, [newAsset]);

    function getAdditionalFields(setFields) {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AdditionalFieldView/ParentTable/Asset/FieldName/0`,
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

        handle.done((d: Array<SystemCenter.Types.AdditionalFieldView>) => {

            let ordered = _.orderBy(d.filter(item => item.Searchable).map(item => (
                { label: `[AF${item.ExternalDB != undefined ? " " + item.ExternalDB : ''}] ${item.FieldName}`, key: item.FieldName, ...ConvertType(item.Type), isPivotField: true } as Search.IField<SystemCenter.Types.DetailedAsset>
                )), ['label'], ["asc"]);
                setFields(ordered);
        });
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }

    function getextDBTab(): AssetTab {
        if (sessionStorage.hasOwnProperty('AssetTab.AssetTab'))
            return JSON.parse(sessionStorage.getItem('Asset.AssetTab'));
        else
            return 'Bus';
    }

    function addNewAsset() {
        setPageState('loading');
        setLoadAssetKey(newAsset.AssetKey);

        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/${newAsset.AssetType}/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newAsset),
            cache: false,
            async: true
        }).done(() => {
            sessionStorage.clear();
            dispatch(FetchAsset());
            setPageState('idle');
        }).fail(() => {
            setPageState('error')
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
        else if (newAsset.AssetType == 'DER')
            return <DERAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.DER} UpdateState={setNewAsset} />;
    }


    function handleSelect(ID: number) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + ID})
    }

    function getEnum(setOptions, field) {
            let handle = null;

            if (field.key == 'AssetType') {
                setOptions(assetType.map((t) => ({ Value: t.Name, Label: t.Name })))
                return () => { }
            }

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
        }
    

    if (pageState == 'loading')
        return <div style={{ width: '100%', height: '100%' }}>
            <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                <div style={{ height: '100%', width: '100%', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                    <LoadingIcon Show={true} Size={40} />
                </div>
            </div>
        </div>
    if (pageState == 'error')
        return <div style={{ width: '100%', height: '100%' }}>
            <div style={{ width: '100%', height: '200px' }}>
            <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
            </div>
            </div>
        </div>


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <DefaultSearch.Asset Slice={ByAssetSlice} GetEnum={getEnum} GetAddlFields={getAdditionalFields}>
                    <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                        <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                            <form>
                            <div className="form-group">
                                <button className="btn btn-primary" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault(); setShowNewModal(true); }}>Add Asset</button>
                            </div>
                            </form>
                        </fieldset>
                </li>
            </DefaultSearch.Asset>
            <div style={{ width: '100%', height: 'calc( 100% - 180px)' }}>
                <Table
                    cols={[
                        { key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                        { key: 'AssetType', field: 'AssetType', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'VoltageKV', field: 'VoltageKV', label: 'Nominal Voltage (L-L kV)', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Meters', field: 'Meters', label: 'Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Locations', field: 'Locations', label: 'Substations', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === "Scroll")
                            return;

                        if (d.colKey === sortKey)
                            dispatch(ByAssetSlice.Sort({ SortField: sortKey, Ascending: ascending }));
                        else {
                            dispatch(ByAssetSlice.Sort({ SortField: d.colField as keyof SystemCenter.Types.DetailedAsset, Ascending: true }));
                        }
                    }}
                    onClick={item => handleSelect(item.row.ID)}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <Modal Show={showNewModal} Size={'lg'} Title={'Add New Asset'}
                ConfirmText={'Save'}
                DisableConfirm={assetErrors.length > 0}
                ConfirmShowToolTip={assetErrors.length > 0}
                ConfirmToolTipContent={
                    assetErrors.map((t, i) => <p key={i}> {CrossMark} {t} </p>)
                }
                CallBack={(conf) => {
                    if (conf) {
                        addNewAsset();
                    }
                    
                    const asset = AssetAttributes.getNewAsset('Line');
                    asset['AssetTypeID'] = assetType.find(ats => ats.Name == 'Line').ID;
                    setNewAsset(asset);
                    
                    setShowNewModal(false);
                }}
            >
                <div className="row" style={{ maxHeight: innerHeight - 300, overflow: 'auto' }}>
                    <div className="col">
                        <AssetAttributes.AssetAttributeFields Asset={newAsset} NewEdit={'New'} AssetTypes={assetType} AllAssets={allAssets} UpdateState={setNewAsset} GetDifferentAsset={(assetID) => { }} HideSelectAsset={true} HideAssetType={false} />
                    </div>
                    <div className="col">
                        {showAttributes()}
                    </div>
                </div>
            </Modal>
           
            <Modal Show={showEXTModal} Size={'xlg'} Title={'Asset External Database Fields'}
                ShowCancel={false} ConfirmText={'Close'} CallBack={() => { setShowExtModal(false); }}
            >
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
            </Modal>
            
        </div>
    )
}

export default ByAsset;

