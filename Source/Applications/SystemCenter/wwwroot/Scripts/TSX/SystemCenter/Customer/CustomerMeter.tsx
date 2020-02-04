//******************************************************************************************************
//  CustomerMeter.tsx - Gbtc
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
//  02/04/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter, PQView } from '../global';

declare var homePath: string;

export default class CustomerMeterWindow extends React.Component<{ Customer: SystemCenter.Customer }, { Sites: Array<SystemCenter.CustomerAccess>, AllSites: Array<PQView.Site> }, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            Sites: [],
            AllSites: [],
        }

        this.getSites = this.getSites.bind(this);
        this.updateChannels = this.updateChannels.bind(this);
    }

    componentDidMount() {
        this.getSites();
        this.getAllSites();
    }

    getSites(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/CustomerAccess/${this.props.Customer.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((sites: Array<SystemCenter.CustomerAccess>) => this.setState({ Sites:  sites}));
    }

    updateChannels(): void {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/SystemCenter/CustomerAccess/${this.props.Customer.ID}/Update`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(this.state.Sites),
            cache: false,
            async: true
        }).done(() => {
            this.getSites();
        }).fail(msg => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                this.getSites();
            }
        });;
    }

    getAllSites(): void {
            $.ajax({
                type: "GET",
                url: `${homePath}api/PQView/Site/`,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done((sites: Array<PQView.Site>) => {
                this.setState({ AllSites: sites })
            });
    }



    deleteCustommerAccess(index: number): void {
        let customerAccess: Array<SystemCenter.CustomerAccess> = _.clone(this.state.Sites, true);
        let record: SystemCenter.CustomerAccess = customerAccess.splice(index, 1)[0];
        this.setState({ Sites: customerAccess });
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Sites:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' }}>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary pull-right" onClick={() => {
                        }}>Add Channel</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary pull-right" onClick={this.updateChannels}>Save Changes</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={this.getSites}>Clear Changes</button>
                    </div>
                </div>
            </div>
                
        );
    }

}

