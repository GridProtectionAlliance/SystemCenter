//******************************************************************************************************
//  TapSelect.tsx - Gbtc
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
//  12/19/2022 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { ReactTable } from '@gpa-gemstone/react-table';
import { Pencil, TrashCan, Warning } from '@gpa-gemstone/gpa-symbols';
import { Select, Input } from '@gpa-gemstone/react-forms';
import { ITap } from './Types';
import { release } from 'os';
import { WarningWTooltip } from './Common';


declare var homePath: string;
interface IProps {
    Taps: ITap[],
    AddTap: (tap: ITap) => void,
    SaveTap: (tap: ITap, index: number) => void,
    RemoveTap: (index: number) => void,
    Locations: OpenXDA.Types.Location[],
    External: boolean
}

function TapSelect(props: IProps): JSX.Element {

    function DisplayWarning(tap: ITap) {
        if (!props.External || tap.IsExternal && tap.IsXDA)
            return <></>

        const errors = [];
        if (props.Taps.filter(t => t.Bus == tap.Bus).length > 1)
            errors.push('This Tap must have a unique Bus Name.')

        if (tap.IsExternal)
            return <WarningWTooltip Errors={errors} Warnings={['This Tap exists in FAWG but cannot be found in openXDA.']} />

        return <WarningWTooltip Errors={errors} Warnings={['This Tap exists in openXDA but cannot be found in FAWG.']} />
    }

    return (
        <>
            <div className="row">
                <div className="col">
                    <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540 }}>
                        <ReactTable.Table<ITap>
                            TableClass="table table-hover"
                            Data={props.Taps}
                            SortKey={'IsXDA'}
                            Ascending={true}
                            OnSort={(d) => { }}
                            TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            TbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 600, width: '100%' }}
                            RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            Selected={(item) => item.StationID != null}
                            KeySelector={(item) => `${item.Bus}-${item.StationID}`}
                        >
                            <ReactTable.Column<ITap>
                                Key={'Bus'}
                                AllowSort={true}
                                Field={'Bus'}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, key, field, index }) => <>
                                    <Input<ITap>
                                        Label={''} Record={item} Field={'Bus'}
                                        Setter={(r) => props.SaveTap(r, index)}
                                        Valid={() => item.Bus != null && item.Bus.length > 0} />
                                </> }
                            > Bus
                            </ReactTable.Column>
                            <ReactTable.Column<ITap>
                                Key={'Location'}
                                AllowSort={true}
                                HeaderStyle={{ width: 'auto' }}
                                RowStyle={{ width: 'auto' }}
                                Content={({ item, key, field, index }) => <>
                                    <Select<ITap>
                                        Label={''} Field={'StationID'} Record={item} EmptyLabel={'N/A'} Setter={(r) => props.SaveTap(r, index)}
                                        Options={props.Locations.map(l => ({ Value: l.ID.toString(), Label: l.Name + '(' + l.LocationKey + ')' }))} EmptyOption={true} />
                                </> }
                            > Substation
                            </ReactTable.Column>
                            <ReactTable.Column<ITap>
                                Key={'Warning'}
                                AllowSort={false}
                                HeaderStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                RowStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                Content={({ item }) => DisplayWarning(item)}
                            > <p></p>
                            </ReactTable.Column>
                            <ReactTable.Column<ITap>
                                Key={'DeleteButton'}
                                AllowSort={false}
                                HeaderStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                RowStyle={{ width: 40, paddingLeft: 0, paddingRight: 5 }}
                                Content={({ item, key, field, index }) => <>
                                    <button className="btn btn-sm" disabled={props.Taps.length < 2}
                                        onClick={(e) => props.RemoveTap(index)}><span>{TrashCan}</span></button>
                                </> }
                            > <p></p>
                            </ReactTable.Column>
                        </ReactTable.Table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={() => {
                        props.AddTap({
                            IsXDA: true,
                            Bus: 'Bus',
                            StationID: null,
                            IsExternal: false,
                        })
                    }}>Add Tap or Endpoint</button>
                </div>
            </div>
        </>
    );
}

export default TapSelect;
