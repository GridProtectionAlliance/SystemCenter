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
import Table from '@gpa-gemstone/react-table';
import { HeavyCheckMark } from '@gpa-gemstone/gpa-symbols';
import LineSegmentWizard from './FawgLineSegmentWizard/LineSegmentWizard';
import moment from 'moment';

function LineSegmentWindow(props: { ID: number, InnerOnly?: boolean }): JSX.Element {
    const [segments, setSegments] = React.useState<Array<OpenXDA.Types.LineSegment>>([]);
    const [showFawg, setShowFawg] = React.useState<boolean>(false);


    React.useEffect(() => {
        getData();
        
    }, [props.ID]);

    function getData(): void {
        getSegments();
    }

    function getSegments(): void {
       $.ajax({
           type: "GET",
           url: `${homePath}api/OpenXDA/Line/${props.ID}/LineSegments?_=${moment()}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
       }).done((data: Array<OpenXDA.Types.LineSegment>) => {
           setSegments(data);
       });
    }

    let header = (<h4 style={(props.InnerOnly ?? false) ? { width: '100%', padding: '10px' } : null}>{"Line Segments: "}</h4>);
    const tableContent = (
        <>
            <Table<OpenXDA.Types.LineSegment>
                cols={[
                    { key: 'AssetName', field: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Length', field: 'Length', label: 'Length (miles)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'R1', field: 'R1', label: 'R1', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'X1', field: 'X1', label: 'X1', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'R0', field: 'R0', label: 'R0', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'X0', field: 'X0', label: 'X0', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'ThermalRating', field: 'ThermalRating', label: 'Thermal Rating', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'FromBus', field: 'FromBus', label: 'From Bus', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'ToBus', field: 'ToBus', label: 'To Bus', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    {
                        key: 'IsEnd', field: 'IsEnd', label: 'End?', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                        content: (item) => item.IsEnd ? HeavyCheckMark : null
                    }
                ]}
                tableClass="table table-hover"
                data={segments}
                sortKey={'AssetName'}
                ascending={true}
                onSort={(d) => { }}
                onClick={() => { }}
                theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }}
                rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                selected={(item) => false}
            />
            {showFawg ? <LineSegmentWizard LineID={props.ID} closeWizard={() => { setShowFawg(false); getData(); }} LineKey={''} LineName={''} /> : null}
        </>);
    const wizardButton = (<button className={"btn btn-primary" + ((props.InnerOnly ?? false) ? " pull-right" : "")} onClick={(evt) => setShowFawg(true)}>Line Segment Wizard</button>);

    if (props.InnerOnly ?? false) return (
        <>
            {wizardButton}
            {header}
            {tableContent}
        </>
        )

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                    {header}
            </div>
            <div className="card-body">
                <div style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
                    {tableContent}
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    {wizardButton}
                </div>
            </div>
        </div>
    );
}

export default LineSegmentWindow;
