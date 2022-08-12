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
import { Application as App, LoadingIcon, Page, Search } from '@gpa-gemstone/react-interactive'
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
    SetAssetGroupID: (id: number) => void,
    assetGroupID: number
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
   
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        {parentGroupState == 'loading' ? <LoadingIcon Show={true}/>:
                            <><label> Category </label>
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
                                { key: 'Meters', field: 'Meters', label: 'Num. Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                                { key: 'Assets', field: 'Assets', label: 'Num. Assets', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },

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
                            onClick={(x) => props.SetAssetGroupID(x.row.ID)}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => item.ID == props.assetGroupID}
                        />}
                </div>
            </div>
        </>
    );
}

export default AssetGroupSelection;