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
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import LineSegmentWizard from './FawgLineSegmentWizard/LineSegmentWizard';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
import { ToolTip } from '@gpa-gemstone/react-forms';

interface IProps { ID: number, InnerOnly?: boolean, OnChange?: () => void; LineKey: string; LineName: string; }
function LineSegmentWindow(props: IProps): JSX.Element {
    const [segments, setSegments] = React.useState<Array<OpenXDA.Types.LineSegment>>([]);
    const [sortKey, setSortKey] = React.useState<string>('AssetName');
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [page, setPage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = React.useState<number>(0);
    const [refreshTrigger, setRefreshTrigger] = React.useState<boolean>(false);
    const [segmentStatus, setSegmentStatus] = React.useState<Application.Types.Status>('uninitiated');
    const [showFawg, setShowFawg] = React.useState<boolean>(false);
    const [hover, setHover] = React.useState<('Update' | 'Reset' | 'None')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        setSegmentStatus('loading');
        const h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Line/${props.ID}/LineSegments/${page}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({ orderBy: sortKey, ascending: ascending, searches: [] })
        }).done((d) => {
            setTotalPages(d.NumberOfPages);
            setTotalRecords(d.TotalRecords);
            setRecordsPerPage(d.RecordsPerPage);
            if (page >= d.NumberOfPages)
                setPage(Math.max(d.NumberOfPages - 1, 0));
            setSegments(JSON.parse(d.Data))
            setSegmentStatus('idle');
           props.OnChange();
        }).fail(() => setSegmentStatus('error'));
        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [props.ID, page, ascending, sortKey, refreshTrigger]);

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    let header = ( <>
        <div className="row">
            <div className="col">
                <h4 style={(props.InnerOnly ?? false) ? { width: '100%', padding: '10px' } : null}>{"Line Segments: "}</h4>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <p style={{ marginTop: 2, marginBottom: 2 }}>
                    {segmentStatus === 'error' ? 'Could not complete Search' :
                        segmentStatus === 'loading' ? 'Loading...' :
                            `Displaying Line Segment(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + segments.length} out of ${totalRecords}`}
                </p>
            </div>
        </div>
    </>)
    const tableContent = (
        <>
            <Table<OpenXDA.Types.LineSegment>
                TableClass="table table-hover"
                Data={segments}
                SortKey={sortKey}
                Ascending={ascending}
                OnSort={(d) => {
                    if (d.colKey == sortKey) {
                        setAscending(!ascending);
                    }
                    else {
                        setAscending(true);
                        setSortKey(d.colField);
                    }
                }}
                TableStyle={{ padding: 0, width: '100%', tableLayout: 'fixed', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                TbodyStyle={{ display: 'block', overflowY: 'auto', flex: 1 }}
                RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                Selected={(item) => false}
                KeySelector={(item) => item.ID}
            >
                <Column<OpenXDA.Types.LineSegment>
                    Key={'AssetName'}
                    AllowSort={true}
                    Field={'AssetName'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Name
                </Column>
                <Column<OpenXDA.Types.LineSegment>
                    Key={'Length'}
                    AllowSort={true}
                    Field={'Length'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Length (miles)
                </Column>
                <Column<OpenXDA.Types.LineSegment>
                    Key={'R1'}
                    AllowSort={true}
                    Field={'R1'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > R1
                </Column>
                <Column<OpenXDA.Types.LineSegment>
                    Key={'X1'}
                    AllowSort={true}
                    Field={'X1'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > X1
                </Column>
                <Column<OpenXDA.Types.LineSegment>
                    Key={'R0'}
                    AllowSort={true}
                    Field={'R0'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > R0
                </Column>
                <Column<OpenXDA.Types.LineSegment>
                    Key={'X0'}
                    AllowSort={true}
                    Field={'X0'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > X0
                </Column>
                <Column<OpenXDA.Types.LineSegment>
                    Key={'ThermalRating'}
                    AllowSort={true}
                    Field={'ThermalRating'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > Thermal Rating
                </Column>
                <Column<OpenXDA.Types.LineSegment>
                    Key={'FromBus'}
                    AllowSort={true}
                    Field={'FromBus'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > From Bus
                </Column>
                <Column<OpenXDA.Types.LineSegment>
                    Key={'ToBus'}
                    AllowSort={true}
                    Field={'ToBus'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                > To Bus
                </Column>
                <Column<OpenXDA.Types.LineSegment>
                    Key={'IsEnd'}
                    AllowSort={true}
                    Field={'IsEnd'}
                    HeaderStyle={{ width: 'auto' }}
                    RowStyle={{ width: 'auto' }}
                    Content={({ item }) => item.IsEnd ? <ReactIcons.CheckMark Color="var(--success)" /> : null }
                > End?
                </Column>
            </Table>
            {showFawg ? <LineSegmentWizard LineID={props.ID} LineKey={props.LineKey} LineName={props.LineName} closeWizard={() => { setShowFawg(false); setRefreshTrigger(val => !val)}} /> : null}
        </>);
    const wizardButton = (<button className={"btn btn-info" + ((props.InnerOnly ?? false) ? " pull-right" : "") + (!hasPermissions() ? ' disabled' : '')} data-tooltip='LineSegWiz'
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
            <div className="card-body" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="row d-flex flex-column" style={{ flex: '1 1 0%', overflow: 'hidden' }}>
                    <div className="col d-flex flex-column" style={{ overflow: 'hidden' }}>
                    {tableContent}
            </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Paging
                            Current={page + 1}
                            Total={totalPages}
                            SetPage={(p) => setPage(p -1)}
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    {wizardButton}
                </div>
                <ToolTip Show={hover == 'Update' && !hasPermissions()} Position={'top'} Target={"LineSegWiz"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
            </div>
        </div>
    );
}

export default LineSegmentWindow;
