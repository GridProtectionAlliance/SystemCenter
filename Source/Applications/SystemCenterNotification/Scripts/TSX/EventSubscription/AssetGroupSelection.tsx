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

import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Application as App, LoadingIcon, Page, Search, Warning } from '@gpa-gemstone/react-interactive'
import { SVGIcons } from '@gpa-gemstone/gpa-symbols';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { EmailType } from '../global';
import { AssetGroupSlice, EmailCategorySlice, EmailTypeSlice } from '../Store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Select } from '@gpa-gemstone/react-forms';
import * as $ from 'jquery';
import Table from '@gpa-gemstone/react-table';

declare var homePath;
declare var version;

interface IProps {
    SetAssetGroupID: (ids: number[]) => void,
    assetGroupID: number[]
}

const AssetGroupSelection = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [parentGroups, setParentGroups] = React.useState<OpenXDA.Types.AssetGroup[]>([]);
    const [parentGroupState, setParentGroupState] = React.useState<Application.Types.Status>('unintiated');

    const [selectedParent, setSelectedParent] = React.useState<number>(-1);
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
        const flt: Search.IFilter<OpenXDA.Types.AssetGroup> = { FieldName: 'ID', isPivotColumn: false, SearchText: `(SELECT ChildAssetGroupID FROM AssetGroupAssetGroup WHERE ParentAssetGroupID = ${selectedParent})`, Type: 'number', Operator: 'IN' }
        if (selectedParent == -1) {
            flt.SearchText = " (SELECT ChildAssetGroupID FROM AssetGroupAssetGroup X WHERE X.ParentAssetGroupID IN (SELECT ID FROM AssetGroup Y WHERE Y.DisplayEmail =1))";
            flt.Operator = "NOT IN"
            }
        dispatch(AssetGroupSlice.DBSearch({ ascending: asc, sortField: sort, filter: [flt] }));
    }, [asc, sort, selectedParent])

    React.useEffect(() => {
        if (parentGroups.length > 0) {
            const keys = localStorage.getItem("SystemCenter.Notifications.SelectedGroup");
            if (keys == null || parentGroups.findIndex(e => e.ID == parseInt(keys)) < 0)
                setSelectedParent(parentGroups[0].ID);
            else
                setSelectedParent(parseInt(keys));
        }
    }, [selectedParent])

    React.useEffect(() => {
        if (selectedParent !== -1)
            localStorage.setItem("SystemCenter.Notifications.SelectedGroup", selectedParent.toString());
    }, [selectedParent]);

    function getParents() {
        setParentGroupState('loading');
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/AssetGroup/SearchableList`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                Searches: [{ FieldName: '(SELECT COUNT(X.ID) FROM AssetGroupAssetGroup X WHERE X.ParentAssetGroupID = FullTbl.ID )', isPivotColumn: false, Operator: '>', SearchText: '0', Type: 'query' }],
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

    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        {parentGroupState == 'loading' ? <LoadingIcon Show={true}/>:
                            <><label> Asset Category </label>
                        <select
                            className="form-control"
                            onChange={(evt) => {
                                setSelectedParent(parseInt((evt.target.value as any).toString()));
                            }}
                            value={selectedParent}
                        >
                            {parentGroups.map((c, i) => (
                                <option key={i} value={c.ID}>
                                    {c.Name}
                                </option>
                            ))}
                            <option value={-1}>
                                Other
                            </option>
                        </select></>}
                    </div>
                </div>
                <div className="col">
                    {assetGrpStatus == 'loading' ? <LoadingIcon Show={true} /> :
                        <Table<OpenXDA.Types.AssetGroup>
                            cols={[
                                { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'Meters', field: 'Meters', label: 'Num. Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'Assets', field: 'Assets', label: 'Num. Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                                { key: 'scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                            ]}
                            tableClass="table table-hover"
                            data={assetGrps}
                            sortKey={sort}
                            ascending={asc}
                            onSort={(d) => {
                                if (d.colKey === "Scroll")
                                    return;

                                if (d.colKey === sort)
                                    setAsc(x => !x);
                                else {
                                    setAsc(false);
                                    setSort(d.colField);
                                }
                            }}
                            onClick={handleSelected}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', height: window.innerHeight - 550, width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => props.assetGroupID.includes(item.ID)}
                        />}
                </div>
            </div>
            <Warning
                Message={`You are subscribing to ${props.assetGroupID.length} sets of notifications. For some events you may recieve one notifications for each asset group selected.`}
                Title={`Subscribing to ${props.assetGroupID.length} Notifications`}
                Show={showWarning}
                CallBack={(c) => { setShowWarning(false); }}
            />
        </>
    );
}

export default AssetGroupSelection;