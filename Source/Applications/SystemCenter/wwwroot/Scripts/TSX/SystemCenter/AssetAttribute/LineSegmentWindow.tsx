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
import { ReactTable } from '@gpa-gemstone/react-table';
import { HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import LineSegmentWizard from './FawgLineSegmentWizard/LineSegmentWizard';
import moment from 'moment';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
import { ToolTip } from '@gpa-gemstone/react-interactive';

interface IProps { ID: number, InnerOnly?: boolean, OnChange?: () => void; LineKey: string; LineName: string; }
function LineSegmentWindow(props: IProps): JSX.Element {
    const [segments, setSegments] = React.useState<Array<OpenXDA.Types.LineSegment>>([]);
    const [sortKey, setSortKey] = React.useState<string>('AssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [showFawg, setShowFawg] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        const h = getSegments();
        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [props.ID]);

    function getSegments() {
       return $.ajax({
           type: "GET",
           url: `${homePath}api/OpenXDA/Line/${props.ID}/LineSegments?_=${moment()}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
       }).done((data: Array<OpenXDA.Types.LineSegment>) => {
           const sortedSegments = sortData(sortKey, ascending, data);
           setSegments(sortedSegments)
           props.OnChange();
       });
    }

    function sortData(key: string, ascending: boolean, data: OpenXDA.Types.LineSegment[]) {
        return _.orderBy(data, [key], [(ascending ? "asc" : "desc")]);
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    let header = (<h4 style={(props.InnerOnly ?? false) ? { width: '100%', padding: '10px' } : null}>{"Line Segments: "}</h4>);
    const tableContent = (
        <>
            <ReactTable.Table<OpenXDA.Types.LineSegment>
                TableClass="table table-hover"
                Data={segments}
                SortKey={sortKey}
                Ascending={ascending}
                OnSort={(d) => {
                    if (d.colKey == sortKey) {
                        setAscending(!ascending);
                        const ordered = _.orderBy(segments, [d.colKey], [(!ascending ? "asc" : "desc")]);
                        setSegments(ordered);
                    }
                    else {
                        setAscending(true);
                        setSortKey(d.colField);
                        const ordered = _.orderBy(segments, [d.colKey], ["asc"]);
                        setSegments(ordered);
                    }
                }}
                TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'AssetName'}
                    AllowSort={true}
                    Field={'AssetName'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Name
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'Length'}
                    AllowSort={true}
                    Field={'Length'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Length (miles)
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'R1'}
                    AllowSort={true}
                    Field={'R1'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > R1
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'X1'}
                    AllowSort={true}
                    Field={'X1'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > X1
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'R0'}
                    AllowSort={true}
                    Field={'R0'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > R0
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'X0'}
                    AllowSort={true}
                    Field={'X0'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > X0
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'ThermalRating'}
                    AllowSort={true}
                    Field={'ThermalRating'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Thermal Rating
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'FromBus'}
                    AllowSort={true}
                    Field={'FromBus'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > From Bus
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'ToBus'}
                    AllowSort={true}
                    Field={'ToBus'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > To Bus
                </ReactTable.Column>
                <ReactTable.Column<OpenXDA.Types.LineSegment>
                    Key={'IsEnd'}
                    AllowSort={true}
                    Field={'IsEnd'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.IsEnd ? HeavyCheckMark : null }
                > End?
                </ReactTable.Column>
            </ReactTable.Table>
            {showFawg ? <LineSegmentWizard LineID={props.ID} LineKey={props.LineKey} LineName={props.LineName} closeWizard={() => { setShowFawg(false); getSegments(); }} /> : null}
        </>);
    const wizardButton = (<button className={"btn btn-primary" + ((props.InnerOnly ?? false) ? " pull-right" : "") + (!hasPermissions() ? ' disabled' : '')} data-tooltip='LineSegWiz'
        onMouseEnter={() => setHover('Update')} onMouseLeave={() => setHover('None')} onClick={(evt) => { if (hasPermissions()) setShowFawg(true)}}>Line Segment Wizard</button>);

    if (props.InnerOnly ?? false) return (
        <>
            {wizardButton}
            {header}
            {tableContent}
        </>
        )

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                    {header}
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden' }}>
                    {tableContent}
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    {wizardButton}
                </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Theme={'dark'} Target={"LineSegWiz"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>
        </div>
    );
}

export default LineSegmentWindow;
