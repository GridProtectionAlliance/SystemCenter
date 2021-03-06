﻿//******************************************************************************************************
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
import { SystemCenter } from '../global';
import CompanyForm from './CompanyForm';
declare var homePath: string;

export default class CompanyInfoWindow extends React.Component<{ Company: SystemCenter.Company, stateSetter: (company: SystemCenter.Company) => void }, { Company: SystemCenter.Company}, {}> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);
        this.state = {
            Company: this.props.Company
        }
    }


    componentDidMount() {
    }

    componentWillReceiveProps(nextProps): void {
        this.setState({ Company: nextProps.Company})
    }

    updateCompany(): JQuery.jqXHR {
        var company = _.clone(this.state.Company);

       return $.ajax({
            type: "PATCH",
           url: `${homePath}api/OpenXDA/Company/Update`,
            contentType: "application/json; charset=utf-8",
           data: JSON.stringify(this.state.Company),
            dataType: 'json',
            cache: true,
            async: true
       }).done((LocationID: number) => {
           this.props.stateSetter(company);
       });
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Company Information:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                     <CompanyForm Company={this.state.Company} Setter={(record) => this.setState({Company: record}) }/>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary" onClick={() => this.updateCompany()} hidden={this.state.Company.ID == 0} disabled={this.state.Company == this.props.Company}>Update</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={() => this.setState({ Company: this.props.Company })} disabled={this.state.Company == this.props.Company}>Reset</button>
                    </div>
                </div>


            </div>
        );
    }
}