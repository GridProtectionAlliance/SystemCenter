//******************************************************************************************************
//  AdditionalFieldForm.tsx - Gbtc
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
//  10/18/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { useAppSelector, useAppDispatch } from '../hooks';
import { AdditionalFieldsSlice, ExternalDatabasesSlice, ExternalDBTablesSlice, ValueListGroupSlice } from '../Store/Store';
import { Input, Select, CheckBox } from '@gpa-gemstone/react-forms';

interface IProps {
    Record: SystemCenter.Types.AdditionalField,
    Setter: (record: SystemCenter.Types.AdditionalField) => void,
    SetErrors?: (e: string[]) => void,
    SetWarnings?: (w: string[]) => void,
    ShowDatabaseSelect?: boolean
}

export default function AdditionalFieldForm(props: IProps) {
    const dispatch = useAppDispatch();

    // Additional Fields
    const allAddlFields = useAppSelector(AdditionalFieldsSlice.Data);
    const allAddlFieldsStatus = useAppSelector(AdditionalFieldsSlice.Status);

    // Additional Field Value List
    const valueListGroupData = useAppSelector(ValueListGroupSlice.Data);
    const valueListGroupStatus = useAppSelector(ValueListGroupSlice.Status);

    // For External DB Selection
    const externalDBData = useAppSelector(ExternalDatabasesSlice.Data);
    const externalDBStatus = useAppSelector(ExternalDatabasesSlice.Status);

    // For External Table Selection
    const externalDBTablesData = useAppSelector(ExternalDBTablesSlice.Data);
    const externalDBTablesStatus = useAppSelector(ExternalDBTablesSlice.Status);
    const externalDBTableParentID = useAppSelector(ExternalDBTablesSlice.ParentID);

    const [showExt, setShowExt] = React.useState<boolean>(props.ShowDatabaseSelect ?? false);
    const [extDBId, setExtDbId] = React.useState<{ ID: number }>({ ID: -1 });

    React.useEffect(() => {
        if (showExt && (externalDBTableParentID !== null || externalDBTablesStatus === 'unintiated' || externalDBTablesStatus === 'changed'))
            dispatch(ExternalDBTablesSlice.Fetch());
    }, [showExt]);

    React.useEffect(() => {
        if (externalDBStatus !== 'idle' || externalDBTablesStatus !== 'idle' || externalDBTableParentID !== null) return;
        if (props.Record.ExternalDBTableID === null || props.Record.ExternalDBTableID < 0) {
            setExtDbId({ ID: -1 });
        }
        else {
            setExtDbId({ ID: externalDBTablesData.find(extTbl => extTbl.ID === props.Record.ExternalDBTableID)?.ExtDBID });
        }
    }, [externalDBTableParentID, externalDBTablesStatus, externalDBStatus]);

    React.useEffect(() => {
        if (allAddlFieldsStatus === 'unintiated' || allAddlFieldsStatus === 'changed')
            dispatch(AdditionalFieldsSlice.Fetch());
    }, [allAddlFieldsStatus]);

    React.useEffect(() => {
        if (valueListGroupStatus === 'unintiated' || valueListGroupStatus === 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [valueListGroupStatus]);

    React.useEffect(() => {
        if (showExt && (externalDBStatus === 'unintiated' || externalDBStatus === 'changed'))
            dispatch(ExternalDatabasesSlice.Fetch());
    }, [externalDBStatus, showExt]);

    React.useEffect(() => {
        if (showExt && extDBId.ID > -1 &&
            (externalDBTablesStatus === 'unintiated' || externalDBTablesStatus === 'changed' || externalDBTableParentID !== extDBId.ID))
            dispatch(ExternalDBTablesSlice.Fetch(extDBId.ID));
    }, [externalDBTablesStatus, externalDBTableParentID, extDBId, showExt]);

    React.useEffect(() => {
        if (showExt && extDBId.ID > -1 &&
            props.Record.ExternalDBTableID !== null &&
            // Ensure the ext table has finsihed loading
            externalDBTablesStatus === 'idle' &&
            extDBId.ID === externalDBTableParentID &&
            externalDBTablesData.findIndex(table => table.ExtDBID === extDBId.ID) === -1)
            props.Setter({ ...props.Record, ExternalDBTableID: null });
    }, [extDBId, externalDBTablesStatus]);

    React.useEffect(() => {
        setShowExt(props.ShowDatabaseSelect ?? false);
    }, [props.ShowDatabaseSelect]);

    React.useEffect(() => {
        if (props.SetErrors === undefined) return;
        let e = [];
        if (!Valid('FieldName'))
            e.push('A Field Name under 200 characters is required.');
        if (!Valid('ExternalDBTableID'))
            e.push('If an External Database is selected, then an External Database Table is required.');
        if (allAddlFields.findIndex((a) =>
                a.ID !== props.Record.ID &&
                a.FieldName.toLowerCase() === props.Record.FieldName?.toLowerCase()
                && a.ParentTable === props.Record.ParentTable)
            !== -1)
            e.push('An Additional Field with this Parent Type and Field Name already exists.');

        props.SetErrors(e);
    }, [props.Record, extDBId]);

    React.useEffect(() => {
        if (props.SetWarnings === undefined) return;
        let w = [];
        if (props.Record.IsKey && allAddlFields.findIndex((d) => (d.ID != props.Record.ID) && (d.ExternalDBTableID == props.Record.ExternalDBTableID) && d.IsKey) > -1)
            w.push(`A key field already exists for this External Database.`);
        props.SetWarnings(w);
    }, [props.Record]);

    const Valid = React.useCallback((field: keyof (SystemCenter.Types.AdditionalField)) => {
        if (field === 'FieldName')
            return props.Record.FieldName != null && props.Record.FieldName.length > 0 && props.Record.FieldName.length <= 200;
        if (field === 'ExternalDBTableID')
            return !props.ShowDatabaseSelect || (props.Record.ExternalDBTableID === null && extDBId.ID < 0) || (props.Record.ExternalDBTableID !== null && extDBId.ID > -1);
        return true;
    }, [props.Record, props.ShowDatabaseSelect, extDBId]);

    return (
        <form>
            <Input<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'FieldName'} Label={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={Valid} Setter={props.Setter} Help={'The Field Name must match the alias in the table query.'} />
            <Select<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'ParentTable'} Label={'Parent Type'} Setter={props.Setter}
                Options={[{ Value: 'Meter', Label: 'Meter' }, { Value: 'Location', Label: 'Substation' }, { Value: 'Customer', Label: 'Customer' },
                    { Value: 'Line', Label: 'Line' }, { Value: 'LineSegment', Label: 'Line Segment' }, { Value: 'Breaker', Label: 'Breaker' }, { Value: 'CapBank', Label: 'Capacitor Bank' }, { Value: 'Transformer', Label: 'Transformer' }, { Value: 'CapBankRelay', Label: 'Capacitor Bank Relay' }, { Value: 'DER', Label: 'DER' },
                    { Value: 'Generation', Label: 'Generation' }, { Value: 'StationAux', Label: 'Station Auxiliary' }, { Value: 'StationBattery', Label: 'Station Battery' }]} />
            <Select<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'Type'} Label={'Field Type'} Setter={props.Setter}
                Options={[{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }].concat(valueListGroupData.map(x => { return { Value: x.Name, Label: x.Name } }))} />
            {showExt ?
                <>
                    <Select<{ID: number}> Record={extDBId} Field={'ID'} Label={'External DB'} Setter={setExtDbId}
                            Options={[{ Label: '', Value: '-1' }].concat(externalDBData.map((e) => { return { Label: e.Name, Value: e.ID.toString() } }))} />
                    {extDBId.ID > -1 ?
                        <Select<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'ExternalDBTableID'} Label={'External DB Table'} Setter={props.Setter} EmptyOption={true}
                            Options={externalDBTablesData.map((e) => { return { Label: e.TableName, Value: e.ID.toString() } })} />
                        : null}
                </>
                : null}
            <CheckBox<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'Searchable'} Label={'Searchable'} Setter={props.Setter} Help={'Enable to use this field as a Search Filter.'} />
            <CheckBox<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'IsSecure'} Label={'Secure'} Setter={props.Setter} Help={'Enable to make this field only visible to admins.'} />
            <CheckBox<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'IsInfo'} Label={'Info'} Setter={props.Setter} Help={'Enable to display this field and its Value in the Info tab.'} />
            <CheckBox<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'IsKey'} Label={'Key'} Setter={props.Setter} Help={'Enable if this is an External Database Key.'} />
        </form>

    );
}