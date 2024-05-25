//******************************************************************************************************
//  AssetEventChannel.tsx - Gbtc
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
//  04/19/2022 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { PhaseSlice, MeasurmentTypeSlice } from '../Store/Store'
import { ReactTable } from '@gpa-gemstone/react-table';
import { useAppSelector } from '../hooks';
import { LoadingIcon, ServerErrorIcon } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

interface IProps { Name: string, ID: number }

interface ChannelDetail { //TODO: Move to Gemstone
    ID: number,
    MeterID: string,
    AssetID: string,
    MeasurementTypeID: string,
    MeasurementCharacteristicID: string,
    PhaseID: string,
    Name: string,
    Adder: number,
    Multiplier: number,
    SamplesPerHour: number,
    PerUnitValue: number,
    HarmonicGroup: number,
    Description: string,
    Enabled: boolean,
    ConnectionPriority: number,
    MeterKey: string,
    MeterName: string,
    AssetKey: string,
    AssetName: string,
    MeasurementType: string,
    MeasurementCharacteristic: string,
    Phase: string,
    Mapping: string,
    SeriesTypeID: string,
    SeriesType: string,
    ChannelTrend: boolean
}


const AssetChannelWindow = (props: IProps) => {

    const [assetChannels, setAssetChannels] = React.useState<ChannelDetail[]>([]);

    const pStatus = useAppSelector(PhaseSlice.Status) as Application.Types.Status;
    const mtStatus = useAppSelector(MeasurmentTypeSlice.Status) as Application.Types.Status;
    const [status, setStatus] = React.useState<Application.Types.Status>('idle');
    const [sortField, setSortField] = React.useState<keyof (ChannelDetail)>('Name');
    const [ascending, setAscending] = React.useState<boolean>(true);

    React.useEffect(() => {
        let channelHandle = getChannels();

        Promise.all([channelHandle]);

        return () => {
            if (channelHandle != null && channelHandle.abort != null)
                channelHandle.abort();
        }
    }, [props.ID]);

    function getChannels(): JQuery.jqXHR<ChannelDetail[]> {
        setStatus('loading');
        return $.ajax(
            {
                type: "GET",
                url: `${homePath}api/OpenXDA/Asset/${props.ID}/ConnectedChannels`,
                contentType: "application/json; charset=utf-A",
                dataType: 'json',
                cache: true,
                async: true
            }
        ).done(
            (d: Array<ChannelDetail>) => {
                setAssetChannels(d);
                setStatus('idle');
            }
        ).fail(() => setStatus('error'));
    }

    if (status == 'error' || pStatus == 'error' || mtStatus == 'error')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Channels:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
                    </div>
                </div>
            </div>
        </div>

    if (status == 'loading' || pStatus == 'loading' || mtStatus == 'loading')
        return <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Channels:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', height: '200px' }}>
                    <div style={{ height: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                        <LoadingIcon Show={true} Size={40} Label={''} />
                    </div>
                </div>
            </div>
        </div>

    return (
        <div className="card" style={{ marginBottom: 10, display: 'flex', flexDirection: 'column', maxHeight: '70vh' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Channels:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <ReactTable.Table<ChannelDetail>
                        TableClass="table table-hover"
                        Data={assetChannels}
                        SortKey={sortField}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey == sortField) {
                                var ordered = _.orderBy(assetChannels, [d.colKey], [(!ascending ? "asc" : "desc")]);
                                setAscending(!ascending);
                                setAssetChannels(ordered);
                            }
                            else {
                                var ordered = _.orderBy(assetChannels, [d.colKey], ["asc"]);
                                setAscending(!ascending);
                                setAssetChannels(ordered);
                                setSortField(d.colField);
                            }
                        }}
                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        TbodyStyle={{ display: 'block', overflowY: 'auto', width: '100%' }}
                        RowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        <ReactTable.Column<ChannelDetail>
                            Key={'Name'}
                            AllowSort={true}
                            Field={'Name'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                        > Channel Name
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelDetail>
                            Key={'MeterName'}
                            AllowSort={true}
                            Field={'MeterName'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                        > Meter Name
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelDetail>
                            Key={'AssetName'}
                            AllowSort={true}
                            Field={'AssetName'}
                            HeaderStyle={{ width: '15%' }}
                            RowStyle={{ width: '15%' }}
                        > Asset Name
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelDetail>
                            Key={'MeasurementType'}
                            AllowSort={true}
                            Field={'MeasurementType'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > Type
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelDetail>
                            Key={'Phase'}
                            AllowSort={true}
                            Field={'Phase'}
                            HeaderStyle={{ width: '10%' }}
                            RowStyle={{ width: '10%' }}
                        > Phase
                        </ReactTable.Column>
                        <ReactTable.Column<ChannelDetail>
                            Key={'Description'}
                            AllowSort={true}
                            Field={'Description'}
                            HeaderStyle={{ width: '35%' }}
                            RowStyle={{ width: '35%' }}
                        > Description
                        </ReactTable.Column>
                    </ReactTable.Table>
                </div>
            </div>
            <div className="card-footer">
            </div>
        </div>

    );
}

export default AssetChannelWindow
    ;
