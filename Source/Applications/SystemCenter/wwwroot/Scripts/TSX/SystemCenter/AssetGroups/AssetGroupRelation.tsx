//******************************************************************************************************
//  AssetGroupRelation.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  09/21/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import { GenericController, LoadingScreen, ServerErrorIcon, Search, SearchBar } from '@gpa-gemstone/react-interactive'
import { OpenXDA } from '@gpa-gemstone/application-typings';
import GenericRelation from '../CommonComponents/GenericRelation'
import { SystemCenter as SC } from '../global';
import { useControllerFetch } from '../hooks'
import ControllerSelectPopup from '../CommonComponents/ControllerSelectPopup';
import { Column } from '@gpa-gemstone/react-table';

interface IProps {
    Record: AssetGroupRecordType
}

interface MeterAssetGroup {
    ID: number
    MeterID: number
    AssetGroupID: number
}
interface AssetAssetGroup {
    ID: number
    AssetID: number
    AssetGroupID: number
}

type AssetGroupRecordType = OpenXDA.Types.Meter | OpenXDA.Types.Asset

const BlankMeterAssetGroup: MeterAssetGroup = { ID: -1, MeterID: -1, AssetGroupID: -1 }
const BlankAssetAssetGroup: AssetAssetGroup = { ID: -1, AssetID: -1, AssetGroupID: -1 }

const AssetGroupController = new GenericController<OpenXDA.Types.AssetGroup>(`${homePath}api/OpenXDA/AssetGroup`, "Name");
const MeterAssetGroupController = new GenericController<MeterAssetGroup>(`${homePath}api/OpenXDA/MeterAssetGroup`, "ID");
const AssetAssetGroupController = new GenericController<AssetAssetGroup>(`${homePath}api/OpenXDA/AssetAssetGroup`, "ID");

const AssetGroupSearchColumns: Search.IField<OpenXDA.Types.AssetGroup>[] = [
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Number of Meters', key: 'Meters', type: 'integer', isPivotField: false },
    { label: 'Number of Transmission Assets', key: 'Assets', type: 'integer', isPivotField: false },
    { label: 'Number of Asset Groups', key: 'AssetGroups', type: 'integer', isPivotField: false },
    { label: 'Show in PQ Dashboard', key: 'DisplayDashboard', type: 'boolean', isPivotField: false },
    { label: 'Show in Email Subscription', key: 'DisplayEmail', type: 'boolean', isPivotField: false }
]

const AssetGroupRelation = (props: IProps) => {

    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [selectedAssetGroups, setSelectedAssetGroups] = React.useState<OpenXDA.Types.AssetGroup[]>([]);
    const [searchResults, setSearchResults] = React.useState<MeterAssetGroup[] | AssetAssetGroup[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const { Data: assetGroups, Status: assetGroupStatus } = useControllerFetch<OpenXDA.Types.AssetGroup>(AssetGroupController);

    const recordType = props.Record['Make'] != undefined ? "Meter" : "Asset"

    const meterAssetGroupColumns: SC.IByCol<MeterAssetGroup>[] = [
        { Label: "Asset Group", Field: "AssetGroupID", Type: "number", Content: (item) => <p>{assetGroups.find(assetGroup => assetGroup.ID === item.item.AssetGroupID)?.Name ?? "Unnamed Asset Group"}</p> }
    ];
    const assetAssetGroupColumns: SC.IByCol<AssetAssetGroup>[] = [
        { Label: "Asset Group", Field: "AssetGroupID", Type: "number", Content: (item) => <p>{assetGroups.find(assetGroup => assetGroup.ID === item.item.AssetGroupID)?.Name ?? "Unnamed Asset Group"}</p> }
    ];

    const meterAssetGroupFilters: Search.IFilter<MeterAssetGroup>[] = React.useMemo(() => [{ SearchText: props.Record.ID.toString(), FieldName: "MeterID", Operator: "=", Type: "number", IsPivotColumn: false }], [props.Record])
    const assetAssetGroupFilters: Search.IFilter<AssetAssetGroup>[] = React.useMemo(() => [{ SearchText: props.Record.ID.toString(), FieldName: "AssetID", Operator: "=", Type: "number", IsPivotColumn: false }], [props.Record])

    const noSameFilter: Search.IFilter<OpenXDA.Types.AssetGroup>[] = React.useMemo(() => {
        const filter = {
            FieldName: 'ID',
            SearchText: searchResults.map((r) => r.AssetGroupID).join(','),
            Operator: 'NOT IN' as Search.OperatorType,
            Type: 'string' as Search.FieldType,
            IsPivotColumn: false
        }
        return [filter];
    }, [searchResults]);

    return (
        <>
            <LoadingScreen Show={assetGroupStatus === "loading"} />
            <ServerErrorIcon Show={assetGroupStatus === "error"} />
            {assetGroupStatus === "idle" ?
                recordType === "Meter" ?
                    <GenericRelation<MeterAssetGroup>
                        Controller={MeterAssetGroupController}
                        RecordType={"Asset Group"}
                        Columns={meterAssetGroupColumns}
                        BlankRecord={BlankMeterAssetGroup}
                        GetName={(record) => assetGroups.find(assetGroup => assetGroup.ID === record.AssetGroupID)?.Name ?? "Unnamed Asset Group"}
                        DeleteColumn={true}
                        IsEditable={(item) => true}
                        AddNew={() => setShowAdd(true)}
                        SetSearchResults={setSearchResults}
                        RefreshCount={refreshCount}
                        Filters={meterAssetGroupFilters}
                    /> :
                    <GenericRelation<AssetAssetGroup>
                        Controller={AssetAssetGroupController}
                        RecordType={"Asset Group"}
                        Columns={assetAssetGroupColumns}
                        BlankRecord={BlankAssetAssetGroup}
                        GetName={(record) => assetGroups.find(assetGroup => assetGroup.ID === record.AssetGroupID)?.Name ?? "Unnamed Asset Group"}
                        DeleteColumn={true}
                        IsEditable={(item) => true}
                        AddNew={() => setShowAdd(true)}
                        SetSearchResults={setSearchResults}
                        RefreshCount={refreshCount}
                        Filters={assetAssetGroupFilters}
                    />
                : null}
            <ControllerSelectPopup<OpenXDA.Types.AssetGroup>
                Controller={AssetGroupController}
                Show={showAdd}
                Title={`Add ${recordType} to Asset Group`}
                OnClose={(selectedData, conf) => {
                    setShowAdd(false);
                    setSelectedAssetGroups([]);
                    if (!conf) return; 
                    switch (recordType) {
                        case 'Meter':
                            Promise.all(
                                selectedData.map((assetGroup) => {
                                    const newRelation: MeterAssetGroup = {
                                        ID: -1,
                                        MeterID: props.Record.ID,
                                        AssetGroupID: assetGroup.ID
                                    }
                                    return MeterAssetGroupController.DBAction("POST", newRelation)
                                })
                            ).then(() => refreshData(x => x + 1))
                            break;
                        default:
                            Promise.all(
                                selectedData.map((assetGroup) => {
                                    const newRelation: AssetAssetGroup = {
                                        ID: -1,
                                        AssetID: props.Record.ID,
                                        AssetGroupID: assetGroup.ID
                                    }
                                    return AssetAssetGroupController.DBAction("POST", newRelation)
                                })
                            ).then(() => refreshData(x => x + 1))
                            break;
                    }
                }}
                Selection={selectedAssetGroups}
                Searchbar={(children, setFilters) => (
                    <SearchBar<OpenXDA.Types.AssetGroup>
                        SetFilter={setFilters}
                        CollumnList={AssetGroupSearchColumns}
                        Direction={'left'}
                        defaultCollumn={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                        Width={'50%'}
                        Label={'Search'}
                    >
                        {children}
                    </SearchBar>)}
                Type={'single'}
                Filters={noSameFilter}
            >
                <Column<OpenXDA.Types.AssetGroup>
                    Key={"Name"}
                    AllowSort={true}
                    Field={"Name"}
                >
                    Name
                </Column>
                <Column<OpenXDA.Types.AssetGroup>
                    Key={"Meters"}
                    AllowSort={true}
                    Field={"Meters"}
                >
                    Meters
                </Column>
                <Column<OpenXDA.Types.AssetGroup>
                    Key={"Assets"}
                    AllowSort={true}
                    Field={"Assets"}
                >
                    Assets
                </Column>
                <Column<OpenXDA.Types.AssetGroup>
                    Key={"AssetGroups"}
                    AllowSort={true}
                    Field={"AssetGroups"}
                >
                    AssetGroups
                </Column>
            </ControllerSelectPopup>
        </>
    )
}

export default AssetGroupRelation