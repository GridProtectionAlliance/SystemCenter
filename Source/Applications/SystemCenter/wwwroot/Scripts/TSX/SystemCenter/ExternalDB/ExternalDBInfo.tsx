//******************************************************************************************************
//  CompanyInfo.tsx - Gbtc
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
//  10/16/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import ExternalDBForm from './ExternalDBForm';
declare var homePath: string;
import { OpenXDA } from '@gpa-gemstone/application-typings'

export default class ExternalDBWindow extends React.Component<{ ExternalDB: OpenXDA.Types.ExternalDataBase, stateSetter: (company: OpenXDA.Types.ExternalDataBase) => void }, { ExternalDB: OpenXDA.Types.ExternalDataBase}, { }> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);
        this.state = {
            ExternalDB: this.props.ExternalDB
        }
    }


    componentDidMount() {
    }

    componentWillReceiveProps(nextProps): void {
        this.setState({ ExternalDB: nextProps.ExternalDB })
    }

    updateExternalDB(): JQuery.jqXHR {
        var externalDBs = _.clone(this.state.ExternalDB);

        return $.ajax({
            type: "PATCH",
            url: `${homePath}api/SystemCenter/ExternalDBTables/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.ExternalDB),
            dataType: 'json',
            cache: true,
            async: true
        }).done((LocationID: number) => {
            this.props.stateSetter(externalDBs);
        });
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>External Database Info:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <ExternalDBForm ExternalDB={this.state.ExternalDB} Setter={(record) => this.setState({ ExternalDB: record })} />
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary" onClick={() => this.updateExternalDB()} hidden={this.state.ExternalDB.ID == 0} disabled={this.state.ExternalDB == this.props.ExternalDB}>Update</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={() => this.setState({ ExternalDB: this.props.ExternalDB })} disabled={this.state.ExternalDB == this.props.ExternalDB}>Reset</button>
                    </div>
                </div>


            </div>
        );
    }
}