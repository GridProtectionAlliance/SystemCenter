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
import { ExternalDatabasesSlice, ExternalDBTablesSlice, ValueListGroupSlice } from '../Store/Store';
import { Input, Select, CheckBox } from '@gpa-gemstone/react-forms';

interface IProps {
    Record: SystemCenter.Types.AdditionalField,
    Setter: (record: SystemCenter.Types.AdditionalField) => void,
    SetErrors?: (e: string[]) => void
}

export default function AdditionalFieldForm(props: IProps) {

    const dispatch = useAppDispatch();

    const valueListGroupData = useAppSelector(ValueListGroupSlice.Data);
    const valueListGroupStatus = useAppSelector(ValueListGroupSlice.Status);

    const externalDBData = useAppSelector(ExternalDatabasesSlice.Data);
    const externalDBStatus = useAppSelector(ExternalDatabasesSlice.Status);
    const externalDBTablesData = useAppSelector(ExternalDBTablesSlice.Data);
    const externalDBTablesStatus = useAppSelector(ExternalDBTablesSlice.Status);
    const externalDBTableParentID = useAppSelector(ExternalDBTablesSlice.ParentID);

    const emptyExtDBRecord = { ID: 0, Name: '', Schedule: '', ConnectionString: '', DataProviderString: '', Encrypt: false };
    const [extDBRecord, setExtDBRecord] = React.useState<SystemCenter.Types.ExternalDatabases>(emptyExtDBRecord);
    const [showExtDBTables, setShowExtDBTables] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (valueListGroupStatus == 'unintiated' || valueListGroupStatus == 'changed')
            dispatch(ValueListGroupSlice.Fetch());
    }, [valueListGroupStatus]);

    React.useEffect(() => {
        if (externalDBStatus == 'unintiated' || externalDBStatus == 'changed')
            dispatch(ExternalDatabasesSlice.Fetch());
    }, [externalDBStatus]);

    React.useEffect(() => {
        if (externalDBTablesStatus == 'unintiated' || externalDBTablesStatus == 'changed' || (extDBRecord.ID != 0 && externalDBTableParentID != extDBRecord.ID))
            dispatch(ExternalDBTablesSlice.Fetch(extDBRecord.ID));

    }, [externalDBTablesStatus, externalDBTableParentID, extDBRecord]);

    React.useEffect(() => {
        if (extDBRecord.ID == 0 && props.Record.ExternalDBTableID !== null)
            props.Setter({ ...props.Record, ExternalDBTableID: null });
    }, [extDBRecord]);

    function Valid(field: keyof (SystemCenter.Types.AdditionalField)): boolean {
        if (field == 'FieldName')
            return props.Record.FieldName != null && props.Record.FieldName.length > 0 && props.Record.FieldName.length <= 200;

        return true;
    }

    function ExtDBTables() {
        if (showExtDBTables) {
            return <Select<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'ExternalDBTableID'} Label={'External DB Table'} Setter={props.Setter}
                       Options={[{ Label: '', Value: '0' }].concat(externalDBTablesData.map((e) => { return { Label: e.TableName, Value: e.ID.toString() } }))} />
        }

        return null;
    }

    React.useEffect(() => {
        setShowExtDBTables(extDBRecord.ID != 0);
    }, [extDBRecord.ID]);

    return (
        <form>
            <Input<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'FieldName'} Label={'Name'} Feedback={'A Name of less than 200 characters is required.'} Valid={Valid} Setter={props.Setter} />
            <Select<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'ParentTable'} Label={'Parent Type'} Setter={props.Setter}
                Options={[{ Value: 'Meter', Label: 'Meter' }, { Value: 'Location', Label: 'Location' }, { Value: 'Customer', Label: 'Customer' }, { Value: 'Company', Label: 'Company' }, { Value: 'Asset', Label: 'Asset' },
                    { Value: 'Line', Label: 'Line' }, { Value: 'LineSegment', Label: 'LineSegment' }, { Value: 'Breaker', Label: 'Breaker' }, { Value: 'CapacitorBank', Label: 'CapacitorBank' }, { Value: 'Transformer', Label: 'Transformer' }, { Value: 'CapacitorBankRelay', Label: 'CapacitorBankRelay' }, { Value: 'DER', Label: 'DER' }]} />
            <Select<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'Type'} Setter={props.Setter}
                Options={[{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }].concat(valueListGroupData.map(x => { return { Value: x.Name, Label: x.Name } }))} />
            <Select<SystemCenter.Types.ExternalDatabases> Record={extDBRecord} Field={'ID'} Label={'External DB'} Setter={setExtDBRecord}
                Options={[{ Label: '', Value: '0' }].concat(externalDBData.map((e) => { return { Label: e.Name, Value: e.ID.toString() } }))} />
            {ExtDBTables()}
            <CheckBox<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'Searchable'} Label={'Searchable'} Setter={props.Setter} />
            <CheckBox<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'IsSecure'} Label={'Secure'} Setter={props.Setter} />
            <CheckBox<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'IsInfo'} Label={'Info'} Setter={props.Setter} />
            <CheckBox<SystemCenter.Types.AdditionalField> Record={props.Record} Field={'IsKey'} Label={'Key'} Setter={props.Setter} />
        </form>

    );
}