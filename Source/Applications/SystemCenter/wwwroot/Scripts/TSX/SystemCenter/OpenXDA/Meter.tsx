//******************************************************************************************************
//  Meter.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  08/27/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import MeterLocationWindow from '../Meter/MeterLocation';
import { OpenXDA } from '../global';
import GeneralMeterInfoWindow from '../Meter/GeneralMeterInfo';
import NewMeterInfoWindow from '../Meter/NewMeter';
import TransmissionElementWindow from '../Meter/TransmissionElement';
declare var homePath: string;

export default class Meter extends React.Component<{ meterId: number}, { Meter: OpenXDA.Meter}, {}>{
    constructor(props, context) {
        super(props, context);

        this.state = {
            Meter: null
        }
    }

    getMeter(): void {
       if (this.props.meterId == undefined) return;
       $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/One/${this.props.meterId}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done((data: OpenXDA.Meter) => this.setState({ Meter: data }));
    }

    componentDidMount() {
        this.getMeter();
    }

    render() {

        if (this.props.meterId == undefined || this.props.meterId == 0)
            return (
                <div className="card-header accordian" id="accordianHead" style={{ width: '100%', height: '100%', maxHeight: '100%', overflowY: 'auto' }}>
                    <h2>Add New Meter</h2>
                    <hr />
                    <NewMeterInfoWindow />
                </div>
            )
        else if (this.state.Meter == null) return null;
        else
            return (
                <div className="card-header accordian" id="accordianHead" style={{ width: '100%',height: '100%', maxHeight: '100%', overflowY: 'auto' }}>
                    <h2>{this.state.Meter != null ? this.state.Meter.Name : ''}</h2>
                    <hr />
                    <GeneralMeterInfoWindow meter={this.state.Meter} stateSetter={(meter: OpenXDA.Meter) => this.setState({ Meter: meter })}/>
                    <MeterLocationWindow meter={this.state.Meter} stateSetter={(meter: OpenXDA.Meter) => this.setState({ Meter: meter })} />
                    <TransmissionElementWindow meter={this.state.Meter}/>
                </div>
            )
    }
}

