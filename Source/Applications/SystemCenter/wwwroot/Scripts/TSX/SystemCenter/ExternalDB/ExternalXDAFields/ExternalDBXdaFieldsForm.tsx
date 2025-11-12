//******************************************************************************************************
//  ExternalDBXdaFieldsForm.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  10/23/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Select } from '@gpa-gemstone/react-forms';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { ExternalXDAFieldsSlice } from '../../Store/Store';

interface IProps {
    Record: SystemCenter.Types.ExternalOpenXDAField,
    Setter: (record: SystemCenter.Types.ExternalOpenXDAField) => void,
    SetErrors?: (e: string[]) => void
}

const typeOptions = [
    { Label: 'Meter', Value: 'Meter' },
    { Label: 'Substation', Value: 'Location' },
    { Label: 'Customer', Value: 'Customer' },
    { Label: 'Line', Value: 'Line' },
    { Label: 'Line Segment', Value: 'Line Segment' },
    { Label: 'Breaker', Value: 'Breaker' },
    { Label: 'Bus', Value: 'Bus' },
    { Label: 'Transformer', Value: 'Transformer' },
    { Label: 'Capacitor Bank', Value: 'CapBank' },
    { Label: 'Capacitor Bank Relay', Value: 'CapBankRelay' },
    { Label: 'DER', Value: 'DER' },
    { Value: 'Generation', Label: 'Generation' },
    { Value: 'StationAux', Label: 'Station Auxiliary' },
    { Value: 'StationBattery', Label: 'Station Battery' }
];

export default function ExternalDBXdaFieldsForm(props: IProps) {
    const dispatch = useAppDispatch();

    const data = useAppSelector(ExternalXDAFieldsSlice.Data);
    const status = useAppSelector(ExternalXDAFieldsSlice.Status);
    const parentID = useAppSelector(ExternalXDAFieldsSlice.ParentID);

    React.useEffect(() => {
        if (props.SetErrors === undefined) return;
        const errors = [];
        if (props.Record.ParentTable == null || props.Record.ParentTable == '') errors.push("External XDA Field Must Have a Parent Type");
        if (props.Record.FieldName == null || props.Record.FieldName == '') errors.push("External XDA Field Must Have a XDA Field Associated.");
        if (props.Record.ExternalDBTableID < 0) errors.push("External XDA Field Must Have an External Table Associated.");
        if (data.findIndex(field => field.FieldName === props.Record.FieldName && field.ParentTable === props.Record.ParentTable && field.ID !== props.Record.ID) !== -1)
            errors.push("Duplicate External XDA Field Exists.");
        props.SetErrors(errors);
    }, [props.Record]);

    React.useEffect(() => {
        if (status == 'uninitiated' || status == 'changed' || parentID !== props.Record.ExternalDBTableID)
            dispatch(ExternalXDAFieldsSlice.Fetch(props.Record.ExternalDBTableID));
    }, [status, parentID, props.Record.ExternalDBTableID]);

    const fieldOptions = React.useMemo(() => {
        let fields = ["AssetName", "VoltageKV", "Spare", "Description"];
        switch (props.Record.ParentTable) {
            case 'Meter': fields = ["Name", "Alias", "Short Name", "Make", "Model", "Time Zone", "Description"]; break;
            case 'Location': fields = ["Name", "Alias", "Short Name", "Latitude", "Longitude", "Description"]; break;
            case 'Customer': fields = ["Name", "Phone", "Description", "LSCVS"]; break;
            // Assets already get set as 'default' fields, so other asset types can just push new ones
            case 'Asset': break;
            case 'Line': fields.push("Max Fault Distance", "Min Fault Distance"); break;
            case 'LineSegment': fields.push("Length", "R0", "X0", "R1", "X1", "Thermal Rating"); break;
            case 'Bus': break;
            case 'Transformer': fields.push("R0", "X0", "R1", "X1", "Thermal Rating", "Primary Voltage KV", "Secondary Voltage KV", "Tertiary Voltage KV",
                "Primary Winding", "Secondary Winding", "Tertiary Winding", "Tap"); break;
            case 'CapBank': fields.push("Number Of Banks", "Capacitance Per Bank", "Max KV", "Unit KV", "Unit KVAr", "Neg Reactance Tol", "Pos Reactance Tol"); break;
            case 'CapBankRelay': fields.push("On Voltage Threshhold", "Cap Bank Number"); break;
            case 'DER': fields.push("Full Rated Output Current", "Voltage Level"); break;
            case 'Generation': break;
            case 'StationAux': break;
            case 'StationBattery': break;
        }
        return fields.map(str => ({
            Value: str.replace(/\s/, ""),
            Label: str
        }));
    }, [props.Record.ParentTable]);

    return (
        <form>
            <Select<SystemCenter.Types.ExternalOpenXDAField> Record={props.Record} Field={'ParentTable'} Label={'Parent Type'} Setter={props.Setter} Options={typeOptions} />
            <Select<SystemCenter.Types.ExternalOpenXDAField> Record={props.Record} Field={'FieldName'} Label={'Linked Field'} Setter={props.Setter} Options={fieldOptions} />
        </form>

    );
}