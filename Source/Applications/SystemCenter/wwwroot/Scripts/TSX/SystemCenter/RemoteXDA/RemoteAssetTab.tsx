//******************************************************************************************************
//  AssetEventChannel.tsx - Gbtc
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
import { OpenXDA, SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { Search, GenericController } from '@gpa-gemstone/react-interactive';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { BlankRemoteXDAAsset, RemoteAssetForm } from './RemoteAssetForm';
import AssetSelect from '../Asset/AssetSelect';
import GenericRelation from '../CommonComponents/GenericRelation';
import { SystemCenter as SC } from '../global';
import { SelectRoles } from '../Store/UserSettings';
import { OperationResult } from '../CommonComponents/ResultAlert';
import { useAppSelector } from '../hooks';
import moment from 'moment';

interface IProps { ID: number, OperationResults: OperationResult[], SetOperationResults: React.Dispatch<React.SetStateAction<OperationResult[]>> }

const RemoteXDAAssetController = new GenericController<OpenXDA.Types.RemoteXDAAsset>(`${homePath}api/OpenXDA/RemoteXDAAsset`, "LocalAssetName", true);

const Columns: SC.IByCol<OpenXDA.Types.RemoteXDAAsset>[] = [
    { Field: "LocalAssetName", Label: "Local Name", Type: "string" },
    { Field: "LocalAssetKey", Label: "Local Key", Type: "string" },
    { Field: "RemoteAssetName", Label: "Remote Name", Type: "string" },
    { Field: "RemoteAssetKey", Label: "Remote Key", Type: "string" },
    { Field: "Obsfucate", Label: "Obfuscated", Type: "boolean", Content: ({ item }) => item.Obsfucate ? <ReactIcons.CheckMark Color="var(--success)" /> : null },
    { Field: "Synced", Label: "Synced", Type: "boolean", Content: ({ item }) => item.Synced ? <ReactIcons.CheckMark Color="var(--success)" /> : null }
]

const RemoteAssetTab = (props: IProps) => {
    const [assetList, setAssetList] = React.useState<SystemCenter.Types.DetailedAsset[]>([]);
    const [showAddAssets, setShowAddAssets] = React.useState<boolean>(false);
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [postStatus, setPostStatus] = React.useState<Application.Types.Status>('uninitiated');

    const roles = useAppSelector(SelectRoles);
    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0)
            return false;
        return true;
    }

    const filters: Search.IFilter<OpenXDA.Types.RemoteXDAAsset>[] = React.useMemo(() => [{
        FieldName: 'RemoteXDAInstanceID',
        SearchText: props.ID.toString(),
        Operator: '=',
        Type: 'number',
        IsPivotColumn: false
    }], [props.ID])

    return (
        <>
            <GenericRelation<OpenXDA.Types.RemoteXDAAsset>
                Controller={RemoteXDAAssetController}
                RecordType={'Remote XDA Asset'}
                Columns={Columns}
                Filters={filters}
                IsEditable={(item) => item.RemoteXDAAssetID <= 0}
                DeleteColumn={true}
                GetName={(record) => record.LocalAssetName}
                BlankRecord={BlankRemoteXDAAsset}
                RefreshCount={refreshCount}
                AddNew={() => setShowAddAssets(true)}
                EditForm={(record, setter, setErrors) => <RemoteAssetForm OriginalAsset={record} SetRemoteAsset={setter} SetErrors={setErrors} />}
                HasPermissions={hasPermissions}
                PrimaryKey={'ID'}
                OperationResults={props.OperationResults}
                SetOperationResults={props.SetOperationResults}
                AddStatus={postStatus}
            />
            <AssetSelect Type='multiple' StorageID='RemoteAssetTab' ShowModal={showAddAssets} SelectedAssets={assetList}
                Title={"Add Assets to Remote openXDA Instance:"}
                OnCloseFunction={(selected, conf) => {
                    setShowAddAssets(false);
                    setAssetList([]);
                    if (!conf || selected.length === 0) return;
                    setPostStatus('loading')
                    Promise.allSettled(
                        selected.map((asset) => {
                            let newRemote: OpenXDA.Types.RemoteXDAAsset = {
                                ID: -1,
                                RemoteXDAInstanceID: props.ID,
                                LocalXDAAssetID: asset.ID,
                                RemoteXDAAssetID: -1,
                                RemoteXDAAssetKey: asset.AssetKey,
                                Obsfucate: false,
                                Synced: false,
                                RemoteAssetCreatedByDataPusher: false,
                                LocalAssetName: "",
                                LocalAssetKey: "",
                                RemoteAssetName: "",
                                RemoteAssetKey: ""
                            }
                            return RemoteXDAAssetController.DBAction("POST", newRemote)
                                .fail(() => {
                                    setPostStatus('error');
                                    props.SetOperationResults(opResults => [{ Result: 'failure', RecordType: "Remote XDA Asset", OperationType: "SAVE", Timestamp: moment().valueOf() }, ...opResults])
                                })
                        })
                    ).then((results) => {
                        const failed = results.some(r => r.status === 'rejected')
                        if (!failed) {
                            props.SetOperationResults(opResults => [{ Result: 'success', RecordType: "Remote XDA Asset", OperationType: "SAVE", Timestamp: moment().valueOf() }, ...opResults])
                            setPostStatus('idle');
                        }
                        refreshData(x => x + 1);
                    })
                }} />
        </>
    )

}

export default RemoteAssetTab;