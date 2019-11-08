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

export default class OpenXDADataWindow extends React.Component<{ assetKey: string, fields: Array<AssetTypeFieldAndValue>, getData(): void, class: '' | 'Meter' | 'MeterLocation' | 'Line' }, { fields: Array<AssetTypeFieldAndValue>, collapsed: boolean }, {}> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            fields: _.cloneDeep(this.props.fields),
            collapsed: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.state.fields) != JSON.stringify(nextProps.fields))
            this.setState({ fields: _.cloneDeep(nextProps.fields) });
    }

    getRecordID(): number {
        return this.state.fields.filter(x => x.FieldName == 'OpenXDA.' + this.props.class + '.ID')[0].AssetTypeFieldValue == null ? 0 : parseInt(this.state.fields.filter(x => x.FieldName == 'OpenXDA.' + this.props.class +'.ID')[0].AssetTypeFieldValue);
    }

    render() {
        var recordID = this.getRecordID();
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>OpenXDA:</h4>
                        </div>
                        <div className="col">
                            <button className="btn btn-sm pull-right" onClick={(e) => this.setState({ collapsed: !this.state.collapsed })}><span><i className={(this.state.collapsed ? "fa fa-angle-left" : "fa fa-angle-down")}></i></span></button>
                        </div>
                    </div>
                </div>
                <div className={(this.state.collapsed ? "collapse in" : "collapse show")}>

                    <div className="card-body">
                        <form>
                            {
                                this.state.fields.map(field =>
                                    <ValueListInput key={field.FieldName} valueListGroupID={1} field={field} onChange={(evt, fieldName, result) => {
                                        var obj: Array<AssetTypeFieldAndValue> = _.clone(this.state.fields);
                                        obj[obj.findIndex(x => x.FieldName == fieldName)].AssetTypeFieldValue = result;
                                        this.setState({ fields: obj })
                                    }} disabled={true}/>
                                )
                            }
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className='btn btn-primary' onClick={(evt) => {
                                evt.preventDefault()
                                if (this.props.class == 'Meter')
                                    window.location.href = `${homePath}index.cshtml?name=Meter&meterID=${recordID}`
                                else if (this.props.class == 'MeterLocation')
                                    window.location.href = `${homePath}index.cshtml?name=MeterLocations&meterLocationID=${recordID}&AssetKey=${this.props.assetKey}`
                                else if (this.props.class == 'Line')
                                    window.location.href = `${homePath}index.cshtml?name=Lines&lineID=${recordID}`
                            }} style={{ cursor: recordID == null ? 'not-allowed' : 'pointer' }} disabled={recordID == null} >View Associated OpenXDA Meter{(this.props.class == 'Meter' ? '': 's')}</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}