//******************************************************************************************************
//  EmailSelect.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import { LoadingIcon, Search, Warning } from '@gpa-gemstone/react-interactive'
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetGroupSlice } from '../Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import * as $ from 'jquery';
import { ReactTable } from '@gpa-gemstone/react-table';
import { Select } from '@gpa-gemstone/react-forms';

declare var homePath;
declare var version;

const otherParent: OpenXDA.Types.AssetGroup = {
    ID: -1,
    Name: 'Other',
    DisplayDashboard: false,
    AssetGroups: 0,
    Meters: 0,
    Assets: 0,
    Users: 0,
    DisplayEmail: false
};

interface IProps {
    SetAssetGroupID: (ids: number[]) => void,
    assetGroupID: number[]
}

const AssetGroupSelection = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [parentGroups, setParentGroups] = React.useState<OpenXDA.Types.AssetGroup[]>([]);
    const [parentGroupState, setParentGroupState] = React.useState<Application.Types.Status>('unintiated');

    const [selectedParent, setSelectedParent] = React.useState<OpenXDA.Types.AssetGroup>(otherParent);
    const assetGrpStatus = useAppSelector(AssetGroupSlice.Status);
    const assetGrps = useAppSelector(AssetGroupSlice.SearchResults);

    const [asc, setAsc] = React.useState<boolean>(false);
    const [sort, setSort] = React.useState<keyof OpenXDA.Types.AssetGroup>('Name');

    const [showWarning, setShowWarning] = React.useState<boolean>(false);

    React.useEffect(() => {
        let handle = getParents();
        return () => { if (handle != null && handle.abort != null) handle.abort();}
    }, [])

    React.useEffect(() => {
        const flt: Search.IFilter<OpenXDA.Types.AssetGroup> = { FieldName: 'ID', IsPivotColumn: false, SearchText: `(SELECT ChildAssetGroupID FROM AssetGroupAssetGroup WHERE ParentAssetGroupID = ${selectedParent.ID})`, Type: 'query', Operator: 'IN' }
        if (selectedParent.ID == -1) {
            flt.SearchText = " (SELECT ChildAssetGroupID FROM AssetGroupAssetGroup X WHERE X.ParentAssetGroupID IN (SELECT ID FROM AssetGroup Y WHERE Y.DisplayEmail =1))";
            flt.Operator = "NOT IN"
        }
        dispatch(AssetGroupSlice.DBSearch({ ascending: asc, sortField: sort, filter: [flt] }));
    }, [asc, sort, selectedParent])

    React.useEffect(() => {
        if (parentGroups.length > 0) {
            const keys = localStorage.getItem("SystemCenter.Notifications.SelectedGroup");
            if (keys == null || parentGroups.findIndex(e => e.ID == parseInt(keys)) < 0)
                setSelectedParent(otherParent);
            else
                setSelectedParent(parentGroups.find(p => p.ID == parseInt(keys)));
        }
    }, []);

    React.useEffect(() => {
        if (selectedParent.ID != -1)
            localStorage.setItem("SystemCenter.Notifications.SelectedGroup", selectedParent.ID.toString());
    }, [selectedParent]);

    React.useEffect(() => {
        if (assetGrpStatus == 'unintiated' || assetGrpStatus == 'changed') {
            dispatch(AssetGroupSlice.Fetch());
        }
    }, [assetGrpStatus]);

    function getParents() {
        setParentGroupState('loading');
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetGroup/SearchableList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                Searches: [{ FieldName: '(SELECT COUNT(X.ID) FROM AssetGroupAssetGroup X WHERE X.ParentAssetGroupID = FullTbl.ID )', IsPivotColumn: false, Operator: '>', SearchText: '0', Type: 'query' }],
                OrderBy: 'Name',
                Ascending: true,
            }),
            dataType: 'json',
            cache: true,
            async: true
        }).then((d) => {
            setParentGroupState('idle');
            setParentGroups(JSON.parse(d));
        }, () => { setParentGroupState('error'); })
    }

    function handleSelected(x) {
        if (props.assetGroupID.includes(x.row.ID)) {
            props.SetAssetGroupID(props.assetGroupID.filter(y => y != x.row.ID));
            return;
        }

        setShowWarning(props.assetGroupID.length > 5);
        props.SetAssetGroupID([...props.assetGroupID, x.row.ID]);    
    }

    return (<>
            <LoadingIcon Show={parentGroupState == 'loading' || assetGrpStatus == 'loading'} />
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <Select<OpenXDA.Types.AssetGroup> Record={selectedParent} Field={'ID'} Label='Asset Category' Setter={setSelectedParent}
                            Options={[{ Label: 'Other', Value: '-1' }].concat(parentGroups.map((p) => {
                                return { Label: p.Name, Value: p.ID.toString() }
                            }))} />
                    </div>
                </div>
                <div className='col'>
                    <ReactTable.Table<OpenXDA.Types.AssetGroup>
                        TableClass="table table-hover"
                        Data={assetGrps}
                        SortKey={sort}
                        Ascending={asc}
                        OnSort={(d) => {
                            if (d.colKey === sort)
                                setAsc(x => !x);
                            else {
                                setAsc(false);
                                setSort(d.colField);
                            }
                        }}
                        OnClick={handleSelected}
                        TableStyle={{
                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => props.assetGroupID.includes(item.ID)}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<OpenXDA.Types.AssetGroup>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Name
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.AssetGroup>
                            Key={'Meters'}
                            AllowSort={true}
                            Field={'Meters'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. Meters
                        </ReactTable.Column>
                        <ReactTable.Column<OpenXDA.Types.AssetGroup>
                            Key={'Assets'}
                            AllowSort={true}
                            Field={'Assets'}
                            HeaderStyle={{ width: 'auto' }}
                            RowStyle={{ width: 'auto' }}
                        > Num. Assets
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <Warning
                Message={`You are subscribing to ${props.assetGroupID.length} sets of notifications. For some events you may recieve one notification for each asset group selected.`}
                Title={`Subscribing to ${props.assetGroupID.length} Notifications`}
                Show={showWarning}
                CallBack={(c) => { setShowWarning(false); }}
            />
        </>
    );
}

export default AssetGroupSelection;