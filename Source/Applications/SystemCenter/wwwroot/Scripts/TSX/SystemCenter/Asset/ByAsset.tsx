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
import { useNavigate } from "react-router-dom";
import { AssetAttributes } from '../AssetAttribute/Asset';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import BreakerAttributes from '../AssetAttribute/Breaker';
import CapBankAttributes from '../AssetAttribute/CapBank';
import BusAttributes from '../AssetAttribute/Bus';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import CapBankRelayAttributes from '../AssetAttribute/CapBankRelay';
import { Search, Modal, LoadingIcon, ServerErrorIcon, TabSelector, SearchBar, GenericController } from '@gpa-gemstone/react-interactive';
import { Paging, Table, Column } from '@gpa-gemstone/react-table';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SelectAssetStatus, FetchAsset, SelectAssets } from '../Store/AssetSlice';
import { AssetTypeSlice } from '../Store/Store';
import DERAttributes from '../AssetAttribute/DER';
import GenerationAttributes from '../AssetAttribute/Generation';
import StationAuxAttributes from '../AssetAttribute/StationAux';
import StationBatteryAttributes from '../AssetAttribute/StationBattery';



declare type AssetTab = 'Bus' | 'Line' | 'Transformer' | 'CapacitorBank' | 'Breaker' | 'Generation' | 'StationAux' | 'StationBattery';
const PagingID = 'ByAssetPage';
const extDBTabList = [
    { Label: 'Buses', Id: 'Bus' },
    { Label: 'Lines', Id: 'Line' },
    { Label: 'Breakers', Id: 'Breaker' },
    { Label: 'Transformers', Id: 'Transformer' },
    { Label: 'Cap Banks', Id: 'CapacitorBank' },
    { Label: 'Generation', Id: 'Generation' },
    { Label: 'Station Auxiliary', Id: 'StationAux' },
    { Label: 'Station Battery', Id: 'StationBattery' },
];
const AssetController = new GenericController<SystemCenter.Types.DetailedAsset>(`${homePath}api/OpenXDA/ByRestrictedDetailedAsset`, "AssetName", true);

declare var homePath: string;

const ByAsset: Application.Types.iByComponent = (props) => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const assetType = useAppSelector(AssetTypeSlice.Data);
    const assetTypeStatus = useAppSelector(AssetTypeSlice.Status);

    const [data, setData] = React.useState<SystemCenter.Types.DetailedAsset[]>([]);
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [sortKey, setSortKey] = React.useState<keyof SystemCenter.Types.DetailedAsset>('AssetName');
    const [filters, setFilters] = React.useState<Search.IFilter<SystemCenter.Types.DetailedAsset>[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [pageInfo, setPageInfo] = React.useState<{ RecordsPerPage: number, NumberOfPages: number, TotalRecords: number }>({ RecordsPerPage: 0, NumberOfPages: 0, TotalRecords: 0 });
    const [pageState, setPageState] = React.useState<'error' | 'idle' | 'loading'>('idle');

    const allAssets = useAppSelector(SelectAssets);
    const aStatus = useAppSelector(SelectAssetStatus);

    const [addlFieldCols, setAddlFieldCols] = React.useState<Search.IField<SystemCenter.Types.DetailedAsset>[]>([]);

    const [newAsset, setNewAsset] = React.useState<OpenXDA.Types.Asset>(AssetAttributes.getNewAsset('Line'));
    const [loadAssetKey, setLoadAssetKey] = React.useState<string>(null);

    const [showEXTModal, setShowExtModal] = React.useState<boolean>(false);
    const [showNewModal, setShowNewModal] = React.useState<boolean>(false);

    const [extDBTab, setExtDBTab] = React.useState<OpenXDA.Types.AssetTypeName>(getExtDBTab());
    const extDbUpdateAll = React.useRef<() => (() => void)>(undefined);

    const [assetErrors, setAssetErrors] = React.useState<string[]>([]);

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
    }, [assetType]);

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
    }, [aStatus, loadAssetKey]);

    React.useEffect(() => {
        const errors = AssetAttributes.AssetError(newAsset, newAsset.AssetType);
        if (newAsset.AssetKey != null && allAssets.map(asset => asset.AssetKey.toLowerCase()).indexOf(newAsset.AssetKey.toLowerCase()) > -1)
            errors.push('Key must be unique.')

        setAssetErrors(errors);
    }, [newAsset]);

    React.useEffect(() => {
        let storedInfo = JSON.parse(localStorage.getItem(PagingID) as string);
        if (storedInfo == null || storedInfo == 0) return; // page 0 means it's on a real page
        if (storedInfo + 1 > pageInfo.NumberOfPages) {
            storedInfo = Math.max(0, pageInfo.NumberOfPages - 1);
            localStorage.setItem(PagingID, `${storedInfo}`);
        }
        setPage(storedInfo);
    }, [pageInfo.TotalRecords]); // Make sure user is still on a real page when data is deleted or filtered out

    React.useEffect(() => {
        localStorage.setItem(PagingID, JSON.stringify(page));
    }, [page]);

    React.useEffect(() => {
        setPageState('loading');
        const handle = AssetController.PagedSearch(filters, sortKey, ascending, page).done((result) => {
            setData(JSON.parse(result.Data as unknown as string));
            setPageInfo(result);
            setPageState('idle');
        }).fail(() => setPageState('error'));
        return () => { if (handle != null && handle?.abort != null) handle.abort(); }
    }, [filters, sortKey, ascending, page]);

    React.useEffect(() => {
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
            setAddlFieldCols(ordered);
        });
        return () => {
            if (handle != null && handle.abort == null) handle.abort();
        };
    }, []);

    function getExtDBTab(): AssetTab {
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
        else if (newAsset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.Transformer} UpdateState={setNewAsset} />;
        else if (newAsset.AssetType == 'DER')
            return <DERAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.DER} UpdateState={setNewAsset} />;
        else if (newAsset.AssetType == 'Generation')
            return <GenerationAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.Generation} UpdateState={setNewAsset} />;
        else if (newAsset.AssetType == 'StationAux')
            return <StationAuxAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.StationAux} UpdateState={setNewAsset} />;
        else if (newAsset.AssetType == 'StationBattery')
            return <StationBatteryAttributes NewEdit={'New'} Asset={newAsset as OpenXDA.Types.StationBattery} UpdateState={setNewAsset} />;
    }


    function handleSelect(ID: number) {
        navigate(`${homePath}index.cshtml?name=Asset&AssetID=${ID}`);
    }

    function getEnum(setOptions, field) {
            let handle = null;

        if (field.key == 'AssetType') {
                setOptions(assetType.filter(t => t.Name != 'LineSegment').map((t) => ({ Value: t.Name, Label: t.Name })))
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

    // ToDo: This search bar is not the default select. Default select should probably be paged in the future if it doesn't break anything else
    return (
        <div className="container-fluid d-flex h-100 flex-column">
            <SearchBar<SystemCenter.Types.DetailedAsset>
                CollumnList={[
                    { label: 'Key', key: 'AssetKey', type: 'string', isPivotField: false },
                    { label: 'Name', key: 'AssetName', type: 'string', isPivotField: false },
                    { label: 'Nominal Voltage (L-L kV)', key: 'VoltageKV', type: 'number', isPivotField: false },
                    { label: 'Type', key: 'AssetType', type: 'enum', isPivotField: false },
                    { label: 'Meter Key', key: 'Meter', type: 'string', isPivotField: false },
                    { label: 'Substation Key', key: 'Location', type: 'string', isPivotField: false },
                    { label: 'Number of Meters', key: 'Meters', type: 'integer', isPivotField: false },
                    { label: 'Number of Substations', key: 'Locations', type: 'integer', isPivotField: false },
                    { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
                    ...addlFieldCols]}
                SetFilter={setFilters} Direction='left' Width='50%' Label='Search' ShowLoading={pageState === 'loading'} GetEnum={getEnum} StorageID={'AssetFilter'}
                defaultCollumn={{ label: 'Name', key: 'AssetName', type: 'string', isPivotField: false }}
                ResultNote={pageState === 'error' ? 'Could not complete Search' :
                    ('Displaying Transmission Asset(s) ' + (pageInfo.TotalRecords > 0 ? (pageInfo.RecordsPerPage * page + 1) : 0) + ' - ' + (pageInfo.RecordsPerPage * page + data.length)) + ' out of ' + pageInfo.TotalRecords}
            >
                <li className="nav-item" hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Engineer') < 0} style={{ width: '15%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-info btn-block" 
                                    onClick={(event) => { event.preventDefault(); setShowNewModal(true); }}>Add Asset</button>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-info btn-block" 
                                    onClick={(event) => { event.preventDefault(); setShowExtModal(true); }}>External Database</button>
                            </div>
                        </form>
                    </fieldset>
                </li>
            </SearchBar>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                {
                    pageState === 'idle' ?
                        <Table<SystemCenter.Types.DetailedAsset>
                            TableClass="table table-hover"
                            Data={data}
                            SortKey={sortKey.toString()}
                            Ascending={ascending}
                            OnSort={(d) => {
                                if (d.colKey === sortKey) setAscending(a => !a);
                                else setSortKey(d.colField);
                            }}
                            TableStyle={{ height: '100%' }}
                            TheadStyle={{ fontSize: 'smaller' }}
                            RowStyle={{ fontSize: 'smaller' }}
                            OnClick={(item) => handleSelect(item.row.ID)}
                            Selected={(item) => false}
                            KeySelector={(item) => item.ID}
                        >
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'AssetName'}
                                AllowSort={true}
                                Field={'AssetName'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                            > Name
                            </Column>
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'AssetKey'}
                                AllowSort={true}
                                Field={'AssetKey'}
                                HeaderStyle={{ width: '15%' }}
                                RowStyle={{ width: '15%' }}
                            > Key
                            </Column>
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'AssetType'}
                                AllowSort={true}
                                Field={'AssetType'}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                            > Type
                            </Column>
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'VoltageKV'}
                                AllowSort={true}
                                Field={'VoltageKV'}
                                HeaderStyle={{ width: '20%' }}
                                RowStyle={{ width: '20%' }}
                            > Nominal Voltage (L-L kV)
                            </Column>
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'Meters'}
                                AllowSort={true}
                                Field={'Meters'}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                            > Meters
                            </Column>
                            <Column<SystemCenter.Types.DetailedAsset>
                                Key={'Locations'}
                                AllowSort={true}
                                Field={'Locations'}
                                HeaderStyle={{ width: '10%' }}
                                RowStyle={{ width: '10%' }}
                            > Substations
                            </Column>
                        </Table> :
                        <>
                            <LoadingIcon Show={pageState === 'loading'} Size={40} />
                            <ServerErrorIcon Show={pageState === 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                        </>
                }
            </div>
            <div className='row'>
                <div className="col">
                    <Paging Current={page + 1} Total={pageInfo.NumberOfPages} SetPage={(p) => setPage(p - 1)} />
                </div>
            </div>
            <Modal Show={showNewModal} Size={'xlg'} Title={'Add New Asset'}
                ShowX={true}
                ShowCancel={false}
                ConfirmText={'Save'}
                DisableConfirm={assetErrors.length > 0}
                ConfirmShowToolTip={assetErrors.length > 0}
                ConfirmToolTipContent={
                    assetErrors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color="var(--danger)" /> {t} </p>)
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
                <div className="container-fluid d-flex h-100 flex-column">
                    <div className="tab-content row" style={{ flex: 1, overflow: 'hidden' }}>
                        <div className="col">
                            <AssetAttributes.AssetAttributeFields Asset={newAsset} NewEdit={'New'} AssetTypes={assetType} AllAssets={allAssets} UpdateState={setNewAsset} GetDifferentAsset={(assetID) => { }} HideSelectAsset={true} HideAssetType={false} />
                        </div>
                        <div className="col">
                            {showAttributes()}
                        </div>
                    </div>
                </div>
            </Modal>
           
            <Modal Show={showEXTModal} Size={'xlg'} Title={'Update Asset External Fields'} ShowX={true}
                ShowCancel={false} ConfirmText={'Update All'} ConfirmBtnClass={'btn-info'} CallBack={(c) => {
                    if (c && extDbUpdateAll.current !== undefined) extDbUpdateAll.current();
                    if (!c) setShowExtModal(false);
                }}>
                <TabSelector
                    Tabs={extDBTabList}
                    SetTab={(tabId) => setExtDBTab(tabId as OpenXDA.Types.AssetTypeName)}
                    CurrentTab={extDBTab}
                />
                <div className="container-fluid d-flex h-100 flex-column">
                    <div className="tab-content row" style={{ flex: 1, overflow: 'hidden' }}>
                        <div className={"tab-pane active"}>
                            <ExternalDBUpdate Type={extDBTab} UpdateAll={extDbUpdateAll} />
                        </div>
                    </div>
                </div>
            </Modal>
            
        </div>
    )
}

export default ByAsset;

