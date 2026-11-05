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
import { OpenXDA, Application } from '@gpa-gemstone/application-typings';
import GenericRelation from '../CommonComponents/GenericRelation'
import { SystemCenter as SC, OpenXDA as LocalXDA } from '../global';
import { useControllerFetch, useAppSelector } from '../hooks'
import ControllerSelectPopup from '../CommonComponents/ControllerSelectPopup';
import { Column } from '@gpa-gemstone/react-table';
import { SelectRoles } from '../Store/UserSettings';
import { OperationResult } from '../CommonComponents/ResultAlert';
import moment from 'moment';

type AssetGroupRecordType = OpenXDA.Types.Meter | OpenXDA.Types.Asset

interface IProps {
    Record: AssetGroupRecordType
    OperationResults: OperationResult[]
    SetOperationResults: React.Dispatch<React.SetStateAction<OperationResult[]>>
    ParentType: 'Meter' | 'Asset'
}

// record interface accepted by both AssetAssetGroupView and MeterAssetGroupView for posting new relations
interface AssetGroupPost {
    ID: number // meter or asset ID
    GroupIDs: number[] // asset groups to add
}

interface IAssetGroupRelation {
    ID: number,
    AssetGroupID: number
}

interface AssetGroupRelationBaseProps<R extends IAssetGroupRelation> {
    Controller: GenericController<R>
    BlankRecord: R
    ParentField: keyof R
}

const BlankMeterAssetGroup: LocalXDA.MeterAssetGroup = { ID: -1, MeterID: -1, AssetGroupID: -1, Name: "", DisplayDashboard: true, MeterName: "", Location: "" }
const BlankAssetAssetGroup: LocalXDA.AssetAssetGroup = { ID: -1, AssetID: -1, AssetGroupID: -1, Name: "", DisplayDashboard: true, AssetName: "", LongAssetName: "", AssetType: "", AssetLocation: ""}

const MeterAssetGroupController = new GenericController<LocalXDA.MeterAssetGroup>(`${homePath}api/SystemCenter/AssetGroupMeter`, "ID");
const AssetAssetGroupController = new GenericController<LocalXDA.AssetAssetGroup>(`${homePath}api/SystemCenter/AssetGroupAsset`, "ID");

const AssetGroupController = new GenericController<OpenXDA.Types.AssetGroup>(`${homePath}api/OpenXDA/AssetGroup`, "Name");
const AssetGroupSearchColumns: Search.IField<OpenXDA.Types.AssetGroup>[] = [ 
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Number of Meters', key: 'Meters', type: 'integer', isPivotField: false },
    { label: 'Number of Transmission Assets', key: 'Assets', type: 'integer', isPivotField: false },
    { label: 'Number of Asset Groups', key: 'AssetGroups', type: 'integer', isPivotField: false },
    { label: 'Show in PQ Dashboard', key: 'DisplayDashboard', type: 'boolean', isPivotField: false },
    { label: 'Show in Email Subscription', key: 'DisplayEmail', type: 'boolean', isPivotField: false }
]

function AssetGroupRelationBase<R extends IAssetGroupRelation>(props: IProps & AssetGroupRelationBaseProps<R>) {
    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [selectedAssetGroups, setSelectedAssetGroups] = React.useState<OpenXDA.Types.AssetGroup[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [addStatus, setAddStatus] = React.useState<Application.Types.Status>('uninitiated');
    const { Data: assetGroups, Status: assetGroupStatus } = useControllerFetch<OpenXDA.Types.AssetGroup>(AssetGroupController);
    const { Data: relations, Status: relationStatus } = useControllerFetch<R>(props.Controller, undefined, undefined, undefined, refreshCount);
    const relationColumns: SC.IByCol<R>[] = [
        { Label: "Asset Group", Field: "AssetGroupID", Type: "number", Content: ({item}) => <p>{assetGroups.find(assetGroup => assetGroup.ID === item.AssetGroupID)?.Name ?? "Unnamed Asset Group"}</p> }
    ];
    const relationFilters: Search.IFilter<R>[] = React.useMemo(() => [{ SearchText: props.Record.ID.toString(), FieldName: props.ParentField.toString(), Operator: "=", Type: "number", IsPivotColumn: false }], [props.Record, props.ParentField])

    const roles = useAppSelector(SelectRoles);

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    const noSameFilter: Search.IFilter<OpenXDA.Types.AssetGroup>[] = React.useMemo(() => {
        const filter = {
            FieldName: 'ID',
            SearchText: relations.filter(ag => ag[props.ParentField] == props.Record.ID).map((r) => r.AssetGroupID).join(','),
            Operator: 'NOT IN' as Search.OperatorType,
            Type: 'string' as Search.FieldType,
            IsPivotColumn: false
        }
        return [filter];
    }, [relations, props.Record, props.ParentField]);

    return (
        <>
            <LoadingScreen Show={assetGroupStatus === "loading" || noSameFilter == null} />
            <ServerErrorIcon Show={assetGroupStatus === "error"} />
            {assetGroupStatus === "idle" ?
                    <GenericRelation<R>
                        PrimaryKey={"ID"}
                        Controller={props.Controller}
                        RecordType={"Asset Group Relation"}
                        Columns={relationColumns}
                        BlankRecord={props.BlankRecord}
                        GetName={(record) => assetGroups.find(assetGroup => assetGroup.ID === record.AssetGroupID)?.Name ?? "Unnamed Asset Group"}
                        DeleteColumn={true}
                        IsEditable={(item) => true}
                        AddNew={() => setShowAdd(true)}
                        RefreshCount={refreshCount}
                        Filters={relationFilters}
                        HasPermissions={hasPermissions}
                        OperationResults={props.OperationResults}
                        SetOperationResults={props.SetOperationResults}
                        AddStatus={addStatus}
                        OnRefreshData={() => refreshData(x => x + 1)}
                    /> 
                : null}
            <ControllerSelectPopup<OpenXDA.Types.AssetGroup>
                PrimaryKey={"ID"}
                Controller={AssetGroupController}
                Show={showAdd}
                Type={'single'}
                Title={`Add ${props.ParentType} to Asset Group`}
                OnClose={(selectedData, conf) => {
                    setShowAdd(false);
                    setSelectedAssetGroups([]);
                    if (!conf) return;
                    setAddStatus('loading');
                    const newRecord: AssetGroupPost = { ID: props.Record.ID, GroupIDs: selectedData.map(ag => ag.ID) };
                    const postRequest = props.Controller.DBAction("POST", { ...props.BlankRecord, ...newRecord });
                    postRequest
                        .fail(() => {
                            props.SetOperationResults((opres) => [{ OperationType: "SAVE", RecordType: `Asset Group Relation`, Result: "failure", Timestamp: moment().valueOf() }, ...opres])
                            setAddStatus('error');
                        })
                        .done(() => {
                            props.SetOperationResults((opres) => [{ OperationType: "SAVE", RecordType: `Asset Group Relation`, Result: "success", Timestamp: moment().valueOf() }, ...opres])
                            setAddStatus('idle');
                        })
                        .always(() => refreshData(x => x + 1))
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
                BaseFilters={noSameFilter}
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

const AssetGroupRelation = (props: IProps) => {
    return (
        props.ParentType === 'Meter'
            ? <AssetGroupRelationBase<LocalXDA.MeterAssetGroup>
                {...props}
                Controller={MeterAssetGroupController}
                BlankRecord={BlankMeterAssetGroup}
                ParentField={"MeterID"}
            />
            : <AssetGroupRelationBase<LocalXDA.AssetAssetGroup>
                {...props}
                Controller={AssetAssetGroupController}
                BlankRecord={BlankAssetAssetGroup}
                ParentField={"AssetID"}
            />
    )
}

export default AssetGroupRelation;