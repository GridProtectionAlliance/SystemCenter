//******************************************************************************************************
//  SecurityGroupInfo.tsx - Gbtc
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
//  10/21/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************



import * as React from 'react';
import * as _ from 'lodash';
import SecurityGroupForm from './SecurityGroupForm';
declare var homePath: string;
import { OpenXDA } from '@gpa-gemstone/application-typings'

export default class SecurityGroupWindow extends React.Component<{ SecurityGroup: OpenXDA.Types.SecurityGroup, stateSetter: (company: OpenXDA.Types.SecurityGroup) => void }, { SecurityGroup: OpenXDA.Types.SecurityGroup }, {}> {
    jqueryHandle: JQuery.jqXHR;
    constructor(props, context) {
        super(props, context);
        this.state = {
            SecurityGroup: this.props.SecurityGroup
        }
    }


    componentDidMount() {
    }

    componentWillReceiveProps(nextProps): void {
        this.setState({ SecurityGroup: nextProps.SecurityGroup })
    }

    updateSecurityGroup(): JQuery.jqXHR {
        var company = _.clone(this.state.SecurityGroup);

        return $.ajax({
            type: "PATCH",
            url: `${homePath}api/Security/SecurityGroups/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.SecurityGroup),
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
                    <SecurityGroupForm SecurityGroup={this.state.SecurityGroup} Setter={(record) => this.setState({ SecurityGroup: record })} />
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary" onClick={() => this.updateSecurityGroup()} hidden={this.state.SecurityGroup.ID == 0} disabled={this.state.SecurityGroup == this.props.SecurityGroup}>Update</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={() => this.setState({ SecurityGroup: this.props.SecurityGroup })} disabled={this.state.SecurityGroup == this.props.SecurityGroup}>Reset</button>
                    </div>
                </div>


            </div>
        );
    }
}