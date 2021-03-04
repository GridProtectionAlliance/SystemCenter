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
//  10/14/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '../CommonComponents/Table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { AssetAttributes } from '../AssetAttribute/Asset';
import { getAllAssets, getAssetTypes } from '../../../TS/Services/Asset';
import { OpenXDA, SystemCenter } from '../global';
import BreakerAttributes from '../AssetAttribute/Breaker';
import CapBankAttributes from '../AssetAttribute/CapBank';
import BusAttributes from '../AssetAttribute/Bus';
import LineAttributes from '../AssetAttribute/Line';
import TransformerAttributes from '../AssetAttribute/Transformer';
import LineSegmentAttributes from '../AssetAttribute/LineSegment';
import FormInput from '../CommonComponents/FormInput';
import FormCheckBox from '../CommonComponents/FormCheckBox';
import AddToGroupPopup from './AddToGroup';

declare var homePath: string;

type FieldName = 'Name';
interface Search {
    Field: FieldName,
    SearchText: string
}
interface AssetGroup {
    ID: number, Name: string, DisplayDashboard: boolean, AssetGroups: number, Meters: number, Assets: number, Users: number
}

interface extendedAssetGroup extends AssetGroup { MeterList: Array<number>, AssetList: Array<number>, UserList: Array<number>, AssetGroupList: Array<number> }

const emptyAssetGroup: extendedAssetGroup = { ID: -1, Name: '', DisplayDashboard: true, AssetGroups: 0, Meters: 0, Assets: 0, Users: 0, MeterList: [], AssetList: [], UserList: [], AssetGroupList: [] };

declare var homePath: string;

const ByAssetGroup: SystemCenter.ByComponent = (props) => {
    let history = useHistory();

    const [search, setSearch] = React.useState<Array<Search>>([{ Field: 'Name', SearchText: '' }]);
    const [data, setData] = React.useState<Array<AssetGroup>>([]);
    const [sortField, setSortField] = React.useState<string>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [newAssetGroup, setNewAssetGroup] = React.useState<extendedAssetGroup>(_.cloneDeep(emptyAssetGroup));
    const [allAssetGroups, setAllAssetGroups] = React.useState<Array<AssetGroup>>([]);

    React.useEffect(() => {
        return getData();
    }, []);


    function getData() {

        let handle1 = getAssetGroups();
        let handle2 = getAllAssetGroups();

        handle1.done((data: Array<AssetGroup>) => setData(data));
        handle2.done(aas => setAllAssetGroups(aas));
        

        return function cleanup() {
            if (handle1.abort != null)
                handle1.abort();
            if (handle2.abort != null)
                handle2.abort();
        }
    }

    function getAssetGroups(): JQueryXHR {
        return $.ajax({
            type: "Post",
            url: `${homePath}api/OpenXDA/AssetGroup/SearchableList`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(search),
            cache: false,
            async: true
        });
    }

    function getAllAssetGroups(): JQueryXHR {
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/AssetGroup`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })
    }

    function addNewAssetGroup() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Assetgroup/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newAssetGroup),
            cache: false,
            async: true
        }).done((newAssetGroup: OpenXDA.AssetGroup) => {
            sessionStorage.clear();
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + newAssetGroup.ID, state: {} })
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
        });

    }

    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + item.row.ID, state: {} })
    }

    function valid(field: keyof (OpenXDA.AssetGroup)): boolean {
        if (field == 'Name') {
            if (newAssetGroup.Name == null || newAssetGroup.Name.length == 0) return false;
            return allAssetGroups.map(item => item.Name.toLowerCase()).indexOf(newAssetGroup.Name.toLowerCase()) < 0;
        }
        return true;
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ width: '100%' }}>
                    <ul className="navbar-nav mr-auto" style={{ width: '100%' }}>
                        <li className="nav-item" style={{ width: '50%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Search: </legend>
                                <form>
                                    {
                                        search.map((s, index, a) => {

                                            return (
                                                <div className="input-group" key={index} style={{ border: '1px solid lightgray' }}>
                                                    <div className="input-group-prepend">
                                                        <select className='form-control' style={{ height: '100%' }} value={s.Field} onChange={(evt) => {
                                                            let array = _.clone(a);
                                                            s.Field = evt.target.value as FieldName;
                                                            setSearch(array);
                                                        }}>
                                                            <option value='Name'>Name</option>
                                                        </select>
                                                    </div>
                                                    <input className='form-control' type='text' placeholder='Search...' value={s.SearchText} onChange={(evt) => {
                                                        
                                                        s.SearchText = evt.target.value;
                                                        let array = _.clone(a);
                                                        setSearch(array);
                                                    }} onKeyDown={evt => {
                                                        if (evt.keyCode == 13) {
                                                            evt.preventDefault();
                                                            getAssetGroups().done(ms => setData(ms));
                                                        }
                                                    }}/>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-danger" type="button" onClick={(evt) => {
                                                            let array = _.clone(a);
                                                            array.splice(index, 1);
                                                            setSearch(array);
                                                        }}><span><i className="fa fa-times"></i></span></button>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                </form>
                            </fieldset>
                        </li>
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Search Params:</legend>
                                <form>
                                    <div className="form-group">
                                        <button className="btn btn-primary" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                            event.preventDefault();
                                            let array = _.clone(search);
                                            array.push({ Field: 'Name', SearchText: '' });
                                            setSearch(array);
                                        }}>Add Parameter</button>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                            event.preventDefault();
                                            getAssetGroups().done((data: Array<AssetGroup>) => setData(data));
                                        }}>Update Search</button>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                        <li className="nav-item" style={{ width: '15%', paddingRight: 10 }}>
                            <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                <legend className="w-auto" style={{ fontSize: 'large' }}>Actions:</legend>
                                <form>
                                    <div className="form-group">
                                        <button className="btn btn-primary" data-toggle='modal' data-target="#assetGroupModal" disabled={true} hidden={props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0} onClick={(event) => { event.preventDefault() }}>Add New AssetGroup</button>
                                    </div>
                                </form>
                            </fieldset>
                        </li>
                        
                    </ul>
                </div>
            </nav>

            <div style={{ width: '100%', height: 'calc( 100% - 180px)' }}>
                <Table
                    cols={[
                        { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Assets', label: 'Num. of Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', label: 'Num. of Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Users', label: 'Num. of Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetGroups', label: 'Num. of Asset Groups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortField={sortField}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.col == sortField) {
                            let ordered = _.orderBy(data, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setData(ordered);
                        }
                        else {
                            let ordered = _.orderBy(data, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setData(ordered);
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

            <div className="modal" id="assetGroupModal">
                <div className="modal-dialog" style={{ maxWidth: '100%', width: '75%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add a New Asset</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={(evt) => { setNewAssetGroup(_.cloneDeep(emptyAssetGroup)) }}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <FormInput<extendedAssetGroup> Record={newAssetGroup} Field={'Name'} Label={'Name'} Feedback={'A unique name of less than 50 characters is required.'} Valid={valid}
                                        Setter={setNewAssetGroup} Disabled={false} />
                                    <FormCheckBox<extendedAssetGroup> Record={newAssetGroup} Field={'DisplayDashboard'} Label={'Show Asset Group in Dashboard'} Setter={setNewAssetGroup} Disabled={false} />

                                </div>
                                <div className="col">
                                    <FormInput<extendedAssetGroup> Record={newAssetGroup} Field={'Assets'} Label={'Num. of Transmission Assets'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                                    <button type="button" className="btn btn-primary btn-block" data-toggle='modal' data-target="#AddAsset"> Add Transmission Asset </button>
                                    <AddToGroupPopup type='Asset' onComplete={(list) => {
                                        setNewAssetGroup((grp) => {
                                            let updated = _.cloneDeep(grp);
                                            updated.AssetList.push(...list);
                                            updated.AssetList = _.uniq(updated.AssetList);
                                            updated.Assets = updated.AssetList.length;
                                            return updated;
                                        });
                                        return null;
                                    }} />
                                    <FormInput<extendedAssetGroup> Record={newAssetGroup} Field={'Meters'} Label={'Num. of Meters'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                                    <button type="button" className="btn btn-primary btn-block" data-toggle='modal' data-target="#AddMeter"> Add Meter </button>
                                    <AddToGroupPopup type='Meter' onComplete={(list) => {
                                        setNewAssetGroup((grp) => {
                                            let updated = _.cloneDeep(grp);
                                            updated.MeterList.push(...list);
                                            updated.MeterList = _.uniq(updated.MeterList);
                                            updated.Meters = updated.MeterList.length;
                                            return updated;
                                        });
                                        return null;
                                    }} />
                                    <FormInput<extendedAssetGroup> Record={newAssetGroup} Field={'Users'} Label={'Num. of Users'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                                    <button type="button" className="btn btn-primary btn-block" disabled={true}> Add User Account </button>
                                    <FormInput<extendedAssetGroup> Record={newAssetGroup} Field={'AssetGroups'} Label={'Num. of Asset Groups'} Valid={() => true} Setter={setNewAssetGroup} Disabled={true} />
                                    <button type="button" className="btn btn-primary btn-block" data-toggle='modal' data-target="#AddGroup"> Add Asset Group </button>
                                    <AddToGroupPopup type='Group' onComplete={(list) => {
                                        setNewAssetGroup((grp) => {
                                            let updated = _.cloneDeep(grp);
                                            updated.AssetGroupList.push(...list);
                                            updated.AssetGroupList = _.uniq(updated.AssetGroupList);
                                            updated.AssetGroups = updated.AssetGroupList.length;
                                            return updated;
                                        });
                                        return null;
                                    }} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addNewAssetGroup}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => { setNewAssetGroup(_.cloneDeep(emptyAssetGroup))}}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ByAssetGroup;

