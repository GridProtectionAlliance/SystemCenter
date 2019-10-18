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
import OpenXDAMeterLocationDataWindow from "./OpenXDAMeterLocationDataWindow";
import OpenXDALineDataWindow from "./OpenXDALineDataWindow";
import OpenXDAMeterDataWindow from "./OpenXDAMeterDataWindow";

declare var homePath: string;

export default class OpenXDADataWindow extends React.Component<{ fields: Array<AssetTypeFieldAndValue>, getData(): void, class: '' | 'Meter' | 'MeterLocation' | 'Line' }, { fields: Array<AssetTypeFieldAndValue>, collapsed: boolean }, {}> {
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


    disableButton(): boolean {
        return JSON.stringify(this.state.fields) == JSON.stringify(this.props.fields);
    }

    editAssetFields(): void {
        $.ajax({
            type: "PATCH",
            url: `${homePath}api/Assets/Update`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.fields),
            cache: true,
            async: true
        }).done(() => this.props.getData()).fail((msg) => {
            alert('Unable to update type.  Ensure you are not adding a duplicate name to the list of types.');
            console.log(msg.responseJSON)
        });
    }

    render() {
        if (this.props.class == 'MeterLocation')
            return <OpenXDAMeterLocationDataWindow fields={this.props.fields} getData={this.props.getData} />;
        else if (this.props.class == 'Line')
            return <OpenXDALineDataWindow fields={this.props.fields} getData={this.props.getData} />;
        else if (this.props.class == 'Meter')
            return <OpenXDAMeterDataWindow fields={this.props.fields} getData={this.props.getData} />;
        else
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
                                    }} disabled={false}/>
                                )
                            }
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className='btn btn-primary pull-right' onClick={(evt) => {
                                evt.preventDefault()
                                this.editAssetFields();
                            }} style={{ cursor: this.disableButton() ? 'not-allowed' : 'pointer' }} disabled={this.disableButton()} >Update OpenXDA Data</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}