//******************************************************************************************************
//  LineSegmentWindow.tsx - Gbtc
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
//  04/17/2020 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { AssetAttributes } from './Asset';
import LineSegmentAttributes from './LineSegment';
import { LoadingScreen, Modal, Warning, Search, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { Table, Column } from '@gpa-gemstone/react-table';
import { CrossMark, HeavyCheckMark, Pencil, TrashCan } from '@gpa-gemstone/gpa-symbols';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../hooks';
import { LocationSlice, SourceImpedanceSlice } from '../Store/Store';
import { IsInteger, IsNumber } from '@gpa-gemstone/helper-functions';
import { Input, Select } from '@gpa-gemstone/react-forms';
import { SelectRoles } from '../Store/UserSettings';

const newImpedance: OpenXDA.Types.SourceImpedance = { RSrc: 0, XSrc: 0, AssetLocationID: null, ID: 0 }

function SourceImpedanceWindow(props: { ID: number }): JSX.Element {
    const dispatch = useAppDispatch();
    const locations = useAppSelector(LocationSlice.Data);
    const locationStatus = useAppSelector(LocationSlice.Status);

    const [assetLocations, setAssetLocations] = React.useState<OpenXDA.Types.AssetLocation[]>([]);
    const [aLStatus, setALStatus] = React.useState<Application.Types.Status>('unintiated');

    const sourceImpedances = useAppSelector(SourceImpedanceSlice.SearchResults);
    const sourceImpedanceStatus = useAppSelector(SourceImpedanceSlice.SearchStatus);

    const [ascending, setAscending] = React.useState<boolean>(true);
    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.SourceImpedance>('AssetLocationID');
    const [data, setData] = React.useState<OpenXDA.Types.SourceImpedance[]>([]);


    const [showAdd, setShowAdd] = React.useState<boolean>(false);
    const [showWarning, setshowWarning] = React.useState<boolean>(false);

    const [newEditImpedance, setNewEditImpedance] = React.useState<OpenXDA.Types.SourceImpedance>(newImpedance);
    const [newEdit, setNewEdit] = React.useState<Application.Types.NewEdit>('New');

    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    //#ToDo Swap Type to query
    React.useEffect(() => {
        const filter = [
            { FieldName: "AssetLocationID", Operator: "IN", Type: "query", IsPivotColumn: false, SearchText: `(SELECT ID FROM AssetLocation WHERE AssetID=${props.ID})` }
        ] as Search.IFilter<OpenXDA.Types.SourceImpedance>[]
        dispatch(SourceImpedanceSlice.DBSearch({ filter }))
    }, [props.ID]);

    React.useEffect(() => {
        const sortedData = sortData(sortKey, ascending, sourceImpedances);
        setData(sortedData);
    }, [sourceImpedances]);

    React.useEffect(() => {
        const h = getAssetLocations(props.ID);
        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [props.ID])

    React.useEffect(() => {
        if (locationStatus == 'changed' || locationStatus == 'unintiated')
            dispatch(LocationSlice.Fetch());
    }, [locationStatus])

    React.useEffect(() => {
        if (sourceImpedanceStatus == 'changed' || sourceImpedanceStatus == 'unintiated') {
            const filter = [
                { FieldName: "AssetLocationID", Operator: "IN", Type: "query", IsPivotColumn: false, SearchText: `(SELECT ID FROM AssetLocation WHERE AssetID=${props.ID})` }
            ] as Search.IFilter<OpenXDA.Types.SourceImpedance>[]
            dispatch(SourceImpedanceSlice.DBSearch({ filter }))
        }
    }, [sourceImpedanceStatus])

    function getAssetLocations(assetID: number) {
        setALStatus('loading');
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Asset/${assetID}/AssetLocations`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        }).done(d => {
            setAssetLocations(d);
            setALStatus('idle');
        }).fail(() => {
            setALStatus('error');
        });
    }

    function sortData(key: keyof OpenXDA.Types.SourceImpedance, ascending: boolean, data: OpenXDA.Types.SourceImpedance[]) {
        return _.orderBy(data, [key], [(ascending ? "asc" : "desc")]);
    }

    function getLocationName(si: OpenXDA.Types.SourceImpedance) {
        const al = assetLocations.find(al => al.ID == si.AssetLocationID);
        if (al == null)
            return "";

        const l = locations.find(l => al.LocationID == l.ID)
        if (l == null)
            return "";
        return l.Name;
    }

    if (aLStatus == 'error' || sourceImpedanceStatus == 'error' || locationStatus == 'error')
        return (<div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <h4>Line Source Impedances:</h4>
            </div>
            <div className="card-body">
                <ServerErrorIcon Show={true}/>
            </div>
        </div>)

    function validImpedance(si: OpenXDA.Types.SourceImpedance) {
        const e = [];
        if (!valid('XSrc'))
            e.push('X must be a numeric value.');
        if (!valid('RSrc'))
            e.push('R must be a numeric value.');
        if (!valid('AssetLocationID'))
            e.push('A valid Location must be selected.');

        return e;
    }

    function valid(key: keyof (OpenXDA.Types.SourceImpedance)) {
        if (key == 'XSrc')
            return newEditImpedance.XSrc != null && IsNumber(newEditImpedance.XSrc);
        if (key == 'RSrc')
            return newEditImpedance.RSrc != null && IsNumber(newEditImpedance.RSrc);
        if (key == 'AssetLocationID')
            return newEditImpedance.AssetLocationID != null && IsNumber(newEditImpedance.AssetLocationID);
        return true;

    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <h4>Line Source Impedances:</h4>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                <Table<OpenXDA.Types.SourceImpedance>
                    TableClass="table table-hover"
                    Data={data}
                    SortKey={sortKey}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey == sortKey) {
                            setAscending(!ascending);
                            const ordered = _.orderBy(data, [d.colKey], [(!ascending ? "asc" : "desc")]);
                            setData(ordered);
                        }
                        else {
                            setAscending(true);
                            setSortKey(d.colKey as keyof OpenXDA.Types.SourceImpedance);
                            const ordered = _.orderBy(data, [d.colKey], ["asc"]);
                            setData(ordered);
                        }
                    }}
                    TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%'}}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                    RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                    KeySelector={(item) => item.ID}
                >
                    <Column<OpenXDA.Types.SourceImpedance>
                        Key={'AssetLocationID'}
                        AllowSort={true}
                        Field={'AssetLocationID'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item }) => getLocationName(item)}
                    > Substation
                    </Column>
                    <Column<OpenXDA.Types.SourceImpedance>
                        Key={'RSrc'}
                        AllowSort={true}
                        Field={'RSrc'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > R (pu)
                    </Column>
                    <Column<OpenXDA.Types.SourceImpedance>
                        Key={'XSrc'}
                        AllowSort={true}
                        Field={'XSrc'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > X (pu)
                    </Column>
                    <Column<OpenXDA.Types.SourceImpedance>
                        Key={'EditDelete'}
                        AllowSort={false}
                        HeaderStyle={{ width: 80, paddingLeft: 0, paddingRight: 5 }}
                        RowStyle={{ width: 80, paddingLeft: 0, paddingRight: 5 }}
                        Content={({ item }) => <>
                            <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')}
                                onClick={(e) => {
                                    if (hasPermissions()) {
                                        setShowAdd(true);
                                        setNewEditImpedance(item);
                                        setNewEdit('Edit');
                                    }
                                }}><span>{Pencil}</span></button>
                            <button className={"btn btn-sm" + (!hasPermissions() ? ' disabled' : '')}
                                onClick={(e) => {
                                        if (hasPermissions()) {
                                            setNewEditImpedance(item);
                                            setshowWarning(true);
                                        }
                                }}><span>{TrashCan}</span></button>
                        </> }
                    > <p></p>
                    </Column>
                </Table>
            </div>
            <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className={"btn btn-info" + (!hasPermissions() ? ' disabled' : '')} data-tooltip='Source'
                            onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={() => { if (hasPermissions()) setShowAdd(true); setNewEditImpedance(newImpedance); }}>Add Source Impedance</button>
                    </div>
                    <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"Source"}>
                        <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                    </ToolTip>
            </div>
        </div>

            <Warning Show={showWarning} Title={'Remove Source Impedance'} Message={'This will permanently remove the Source Impedance and cannot be undone.'}
                CallBack={(confirm) => { if (confirm) dispatch(SourceImpedanceSlice.DBAction({ verb: 'DELETE', record: newEditImpedance })); setshowWarning(false); }} />
            <Modal Show={showAdd} Title={newEdit == 'New' ? 'Add New Source Impedance' : 'Edit Source Impedance at' + getLocationName(newEditImpedance)} Size={'lg'} ShowX={true}
                CallBack={(confirm) => {
                    if (confirm && newEdit == 'Edit')
                        dispatch(SourceImpedanceSlice.DBAction({ verb: 'PATCH', record: newEditImpedance }));
                    if (confirm && newEdit == 'New')
                        dispatch(SourceImpedanceSlice.DBAction({ verb: 'POST', record: newEditImpedance }));
                    setShowAdd(false);
                }}
                CancelText={'Close'}
                ConfirmText={'Save'}
                DisableConfirm={validImpedance(newEditImpedance).length > 0}
                ConfirmShowToolTip={validImpedance(newEditImpedance).length > 0}
                ConfirmToolTipContent={validImpedance(newEditImpedance).map((t, i) => <p key={i}> {CrossMark} {t}</p>)}
            >
            <div className="row">
                    <div className="col">
                        <Select<OpenXDA.Types.SourceImpedance> Record={newEditImpedance} Label={'Substation'} Field={'AssetLocationID'}
                            Options={assetLocations.map(al => ({
                                Label: (locations.find(l => al.LocationID == l.ID) == null ? '' : locations.find(l => al.LocationID == l.ID).Name),
                                Value: al.ID.toString()
                            }))}
                            EmptyOption={true} EmptyLabel={'Select Substation'}
                            Setter={(r) => setNewEditImpedance(r)}
                        />
                    </div>
                    <div className="col">
                        <Input<OpenXDA.Types.SourceImpedance> Record={newEditImpedance} Field={'RSrc'} Label={'R (pu)'} Feedback={'A valid Resistance is required.'} Valid={valid} Setter={(r) => setNewEditImpedance(r)} />

                </div>
                    <div className="col">
                        <Input<OpenXDA.Types.SourceImpedance> Record={newEditImpedance} Field={'XSrc'} Label={'X (pu)'} Feedback={'A valid Reactance is required.'} Valid={valid} Setter={(r) => setNewEditImpedance(r)} />
                    </div>
            </div>
            </Modal>
            <LoadingScreen Show={aLStatus == 'loading' || sourceImpedanceStatus == 'loading' || locationStatus == 'loading'} />
        </>
    );
}

export default SourceImpedanceWindow;
