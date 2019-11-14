//******************************************************************************************************
//  OpenXDADataWindow.tsx - Gbtc
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
//  10/14/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { AssetTypeFieldAndValue, OpenXDAMeterLocation } from "../global";
import * as React from 'react';
import * as _ from 'lodash';
import ValueListInput from "./ValueListInput";

declare var homePath: string;


export default class OpenXDAEDNADataWindow extends React.Component<{ lineID: number }, { points: Array<{ID: number, LineID: number, Point: string}>, collapsed: boolean, newPoint: string }, {}> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            points: [],
            collapsed: true,
            newPoint: ''
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        this.getEDNAPoints();
    }

    getEDNAPoints(): void {
        if (this.props.lineID == undefined) return;
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/EDNAPoint/${this.props.lineID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(ednaPoints => {
            this.setState({ points: ednaPoints })
        });
    }

    addEDNAPoint(): void {
        if (this.props.lineID == undefined) return;
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/EDNAPoint/Add`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ID:0, LineID: this.props.lineID, Point: this.state.newPoint}),
            cache: false,
            async: true
        }).done(() => {
            this.setState({ newPoint: '' }, () => this.getEDNAPoints());
        });
    }

    deleteEDNAPoint(point): void {
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/EDNAPoint/Delete`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(point),
            cache: false,
            async: true
        }).done(() => {
            this.getEDNAPoints();
        });
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>EDNA Breaker Point Information:</h4>
                        </div>
                        <div className="col">
                            <button className="btn btn-sm pull-right" onClick={(e) => this.setState({ collapsed: !this.state.collapsed })}><span><i className={(this.state.collapsed ? "fa fa-angle-left" : "fa fa-angle-down")}></i></span></button>
                        </div>
                    </div>
                </div>
                <div className={(this.state.collapsed ? "collapse in" : "collapse show")}>

                    <div className="card-body">
                        <table className="table">
                            <thead><tr><td>Breaker Point</td><td></td></tr></thead>
                            <tbody>
                                {this.state.points.map((point, index) => <tr key={point.ID}><td>{point.Point}</td><td> <button className="btn btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    this.deleteEDNAPoint(point);
                                }}><span><i className="fa fa-times"></i></span></button></td></tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <input value={this.state.newPoint} style={{ border: '1px solid grey'}} onChange={(evt) => {
                                this.setState({ newPoint: evt.target.value });
                            }} />
                            <button className='btn btn-primary' onClick={(evt) => {
                                evt.preventDefault()
                                this.addEDNAPoint();                             
                            }}>Add</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}