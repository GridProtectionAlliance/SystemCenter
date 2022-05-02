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
import Table from '@gpa-gemstone/react-table';
import { useSelector } from 'react-redux';
import { LoadingIcon, ServerErrorIcon } from '@gpa-gemstone/react-interactive';

declare var homePath: string;

interface IProps { Asset: OpenXDA.Types.Asset }

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
    SeriesType: string
}


const AssetChannelWindow = (props: IProps) => {

    const [assetChannels, setAssetChannels] = React.useState<ChannelDetail[]>([]);

    const pStatus = useSelector(PhaseSlice.Status) as Application.Types.Status;
    const mtStatus = useSelector(MeasurmentTypeSlice.Status) as Application.Types.Status;
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
    }, [props.Asset]);

    function getChannels(): JQuery.jqXHR<ChannelDetail[]> {
        setStatus('loading');
        return $.ajax(
            {
                type: "GET",
                url: `${homePath}api/OpenXDA/Asset/${props.Asset.ID}/ConnectedChannels`,
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
                        <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application'} />
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
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Channels:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' }}>
                    <Table<ChannelDetail>
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Channel Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                            // TODO: These might need to change to meterkey and assetkey
                            { key: 'MeterName', field: 'MeterName', label: 'Meter Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                            { key: 'AssetName', field: 'AssetName', label: 'Asset Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                            { key: 'MeasurementType', field: 'MeasurementType', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Phase', field: 'Phase', label: 'Phase', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            // TODO: ADD NUMBER OF CONNECTIONS AWAY
                            { key: 'Description', field: 'Description', label: 'Description', headerStyle: { width: '35%' }, rowStyle: { width: '35%' } },
                        ]}
                        tableClass="table table-hover"
                        data={assetChannels}
                        sortKey={sortField}
                        ascending={ascending}
                        onSort={(d) => {
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
                        onClick={() => { }}
                        selected={() => false}
                    />

                </div>
            </div>
            <div className="card-footer">
            </div>
        </div>

    );
}

export default AssetChannelWindow
;

