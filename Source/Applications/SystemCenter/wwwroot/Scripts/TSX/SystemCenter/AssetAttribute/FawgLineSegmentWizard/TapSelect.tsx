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
import Table from '@gpa-gemstone/react-table';
import { Pencil, TrashCan, Warning } from '@gpa-gemstone/gpa-symbols';
import { Select, Input } from '@gpa-gemstone/react-forms';
import { ITap } from './Types';


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
        return '';
    }
    //ToDo Add warnings when a Tap does not exists in XDA but in Fawg, vice versa

    return (
        <>
            <div className="row">
                <div className="col">
                    <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                        <Table<ITap>
                            cols={[
                                {
                                    key: 'Bus',
                                    label: 'Bus',
                                    headerStyle: { width: 'auto' },
                                    rowStyle: { width: 'auto' },
                                    field: 'Bus',
                                    content: (item, key, fld, style, i) => <Input<ITap> Label={''}  Record={item} Field={'Bus'} Setter={(r) => props.SaveTap(r, i)} Valid={() => item.Bus != null && item.Bus.length > 0} />
                                },
                                {
                                    key: 'location', label: 'Substation',
                                    headerStyle: { width: 'auto' },
                                    rowStyle: { width: 'auto' },
                                    content: (item, key, fld, style, i) => <Select<ITap> Label={''} Field={'StationID'} Record={item} EmptyLabel={'N/A'} Setter={(r) => props.SaveTap(r, i)}
                                        Options={props.Locations.map(l => ({ Value: l.ID.toString(), Label: l.Name + '(' + l.LocationKey + ')' }))} EmptyOption={true} />
                                },
                                {
                                    key: 'warning',
                                    label: '',
                                    headerStyle: { width: 40, paddingLeft: 0, paddingRight: 5 },
                                    rowStyle: { width: 40, paddingLeft: 0, paddingRight: 5 },
                                    content: (item) => DisplayWarning(item).length > 0 ? <>{Warning}</> : <></>
                                },
                                {
                                    key: 'DeleteButton',
                                    label: '',
                                    headerStyle: { width: 40, paddingLeft: 0, paddingRight: 5 },
                                    rowStyle: { width: 40, paddingLeft: 0, paddingRight: 5 },
                                    content: (item, key, fld, style, i) => <>
                                        <button className="btn btn-sm" disabled={props.Taps.length < 2} onClick={(e) => props.RemoveTap(i)}><span>{TrashCan}</span></button>
                                    </>
                                }                                

                            ]}
                            tableClass="table table-hover"
                            data={props.Taps}
                            sortKey={'IsXDA'}
                            ascending={true}
                            onSort={(d) => { }}
                            onClick={() => { }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={(item) => item.StationID != null}
                        />
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
                            Warnings: []
                        })
                    }}>Add Tap or Endpoint</button>
                </div>
            </div>
        </>
    );
}

export default TapSelect;
