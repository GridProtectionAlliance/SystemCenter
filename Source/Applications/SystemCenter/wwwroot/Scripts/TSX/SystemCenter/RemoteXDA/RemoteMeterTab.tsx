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
//  04/19/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter, OpenXDA } from '@gpa-gemstone/application-typings';
import { Column } from '@gpa-gemstone/react-table'
import { Modal, Search, GenericController, SearchBar, LoadingScreen } from '@gpa-gemstone/react-interactive';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { BlankRemoteXDAMeter, RemoteMeterForm } from './RemoteMeterForm';
import GenericRelation from '../CommonComponents/GenericRelation';
import { SystemCenter as SC } from '../global';
import ControllerSelectPopup from '../CommonComponents/ControllerSelectPopup'


interface IProps { ID: number }

const RemoteMeterController = new GenericController<OpenXDA.Types.RemoteXDAMeter>(`${homePath}api/OpenXDA/RemoteXDAMeter`, "LocalMeterName", false);
const MeterController = new GenericController<SystemCenter.Types.DetailedMeter>(`${homePath}api/OpenXDA/ByMeter`, "Name");

const columns: SC.IByCol<OpenXDA.Types.RemoteXDAMeter>[] = [
    { Label: "Local Name", Field: "LocalMeterName", Type: "string" },
    { Label: "Local Key", Field: "LocalAssetKey", Type: "string" },
    { Label: "Local Alias", Field: "LocalAlias", Type: "string" },
    { Label: "Remote XDA Name", Field: "RemoteXDAName", Type: "string", Content: ({ item }) => item.Obsfucate ? item.RemoteXDAName : item.LocalMeterName },
    { Label: "Remote Key", Field: "RemoteXDAAssetKey", Type: "string" },
    { Label: "Remote Alias", Field: "RemoteAlias", Type: "string" },
    { Label: "Obfuscated", Field: "Obsfucate", Type: "boolean", Content: ({ item }) => item.Obsfucate ? <ReactIcons.CheckMark Color="var(--success)" /> : null },
    { Label: "Synced", Field: "Synced", Type: "boolean", Content: ({ item }) => item.Synced ? <ReactIcons.CheckMark Color="var(--success)" /> : null }
]

const defaultSearchcols: Search.IField<SystemCenter.Types.DetailedMeter>[] = [
    { label: 'Key', key: 'AssetKey', type: 'string', isPivotField: false },
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Substation Name', key: 'Location', type: 'string', isPivotField: false },
    { label: 'Make', key: 'Make', type: 'string', isPivotField: false },
    { label: 'Model', key: 'Model', type: 'string', isPivotField: false },
    { label: 'Number of Assets', key: 'MappedAssets', type: 'number', isPivotField: false },
    { label: 'Description', key: 'Description', type: 'string', isPivotField: false },
];

const RemoteMeterTab = (props: IProps) => {
    const [showAddMeters, setShowAddMeters] = React.useState<(boolean)>(false);
    const [selectedMeter, setSelectedMeter] = React.useState<OpenXDA.Types.RemoteXDAMeter | null>(null)
    const [meterList, setMeterList] = React.useState<SystemCenter.Types.DetailedMeter[]>([]);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [searchResults, setSearchResults] = React.useState<OpenXDA.Types.RemoteXDAMeter[]>([]);
    const [assetCount, setAssetCount] = React.useState<number>(0);
    const [showLoading, setShowLoading] = React.useState<boolean>(false);

    const searchFilters: Search.IFilter<OpenXDA.Types.RemoteXDAMeter>[] = React.useMemo(() => [{ FieldName: 'RemoteXDAInstanceID', SearchText: props.ID.toString(), Operator: '=', Type: 'number', IsPivotColumn: false }], [props.ID])

    const noSameFilter: Search.IFilter<SystemCenter.Types.DetailedMeter> = React.useMemo(() => {
        const filter = {
            FieldName: 'ID',
            SearchText: searchResults.map((r) => r.LocalXDAMeterID).join(','),
            Operator: 'NOT IN' as Search.OperatorType,
            Type: 'string' as Search.FieldType,
            IsPivotColumn: false
        }
        return filter;
    }, [searchResults]);

    function getAssociatedAssetCount(meter: OpenXDA.Types.RemoteXDAMeter): JQuery.jqXHR<number> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/ByAsset/Associated/Count/${meter.RemoteXDAInstanceID}/${meter.LocalXDAMeterID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }
    function addAssociatedAssets(meter: OpenXDA.Types.RemoteXDAMeter): JQuery.jqXHR<number> {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/ByAsset/Associated/Add/${meter.RemoteXDAInstanceID}/${meter.LocalXDAMeterID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }

    return (<>
        <LoadingScreen Show={showLoading} />
        <GenericRelation<OpenXDA.Types.RemoteXDAMeter>
            RecordType={"Remote XDA Meter"}
            Controller={RemoteMeterController}
            Columns={columns}
            DefaultSort={'LocalMeterName'}
            AddNew={() => { setShowAddMeters(true) }}
            SetSearchResults={setSearchResults}
            EditForm={(record, setter, setErrors) => { return <RemoteMeterForm OriginalMeter={record} SetRemoteMeter={setter} SetErrors={setErrors} /> }}
            DeleteColumn={true}
            IsEditable={(item) => item.RemoteXDAMeterID <= 0}
            Filters={searchFilters}
            GetName={(record) => record.LocalMeterName}
            RefreshCount={refreshCount}
            BlankRecord={BlankRemoteXDAMeter}
        />
        <Modal Show={assetCount > 0} Title={'Add Associated Remote Assets?'}
            ShowCancel={true}
            CallBack={(conf) => {
                setAssetCount(0);
                if (conf) {
                    let addAssetHandle = addAssociatedAssets(selectedMeter);
                    addAssetHandle.then(() => refreshData(x => x + 1));
                    return () => {
                        if (addAssetHandle != null && addAssetHandle.abort != null) {
                            addAssetHandle.abort();
                        }
                    };

                }
            }}
            ShowX={true} Size={"sm"}
            ConfirmText={"Yes"}
            CancelText={"No"}>
            <p>Add {assetCount} Associated Assets?</p>
        </Modal>
        <ControllerSelectPopup<SystemCenter.Types.DetailedMeter>
            Controller={MeterController}
            Searchbar={(children, setFilters) => (
                <SearchBar<SystemCenter.Types.DetailedMeter>
                    CollumnList={defaultSearchcols}
                    SetFilter={setFilters}
                    Direction={'left'}
                    defaultCollumn={{ label: 'Name', key: 'Name', type: 'string', isPivotField: false }}
                    Width={'50%'}
                    Label={'Search'}
                >
                    {children}
                </SearchBar>)}
            Selection={meterList}
            OnClose={(selected, conf) => {
                setShowAddMeters(false);
                setMeterList([]);
                if (!conf) return;
                selected.forEach((meter) => {
                    setShowLoading(true);
                    let newRemote: OpenXDA.Types.RemoteXDAMeter = {
                        ID: -1,
                        RemoteXDAInstanceID: props.ID,
                        LocalXDAMeterID: meter.ID,
                        RemoteXDAMeterID: -1,
                        RemoteXDAName: "",
                        RemoteXDAAssetKey: meter.AssetKey,
                        Obsfucate: false,
                        Synced: false,
                        LocalAlias: "",
                        LocalMeterName: "",
                        LocalAssetKey: "",
                        RemoteAlias: ""
                    }
                    RemoteMeterController.DBAction("POST", newRemote);
                    setSelectedMeter(newRemote); // Technically, this is a race condition with setAssetCount
                    let fetchAssetHandle = getAssociatedAssetCount(newRemote);
                    fetchAssetHandle.then((data: number) => {
                        refreshData(x => x + 1);
                        setAssetCount(data);
                        setShowLoading(false);
                    });
                    return () => {
                        if (fetchAssetHandle != null && fetchAssetHandle.abort != null) {
                            fetchAssetHandle.abort();
                            setShowLoading(false);
                        }
                    };
                });
            }}
            Show={showAddMeters}
            Type={'single'}
            Title={"Add Meter to Remote openXDA Instance:"}
            Filters={[noSameFilter]}
        >
            <Column Key="Name" Field="Name" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Name</Column>
            <Column Key="AssetKey" Field="AssetKey" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Key</Column>
            <Column Key="Location" Field="Location" HeaderStyle={{ width: 'auto' }} RowStyle={{ width: 'auto' }}
            >Substation</Column>
        </ControllerSelectPopup>
    </>
    )
}

export default RemoteMeterTab;