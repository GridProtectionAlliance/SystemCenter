//******************************************************************************************************
//  ExternalDBTableForm.tsx - Gbtc
//
//  Copyright � 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  09/28/2023 - Parker Dinsdale
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { SystemCenter } from '@gpa-gemstone/application-typings';
import { Input, Select, TextArea } from '@gpa-gemstone/react-forms';
import QueryTestDialog from './TableTesting/QueryTestDialog';
import { ExternalDatabasesSlice } from '../Store/Store';
import { useAppDispatch, useAppSelector } from '../hooks';

interface IProps {
    Record: SystemCenter.Types.extDBTables,
    Setter: (record: SystemCenter.Types.extDBTables) => void,
    SetErrors?: (e: string[]) => void,
    ShowTestButton?: boolean,
    ShowSelectExternalDB?: boolean
}

export default function ExternalDBTableForm(props: IProps) {
    const [showDialog, setShowDialog] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const extDbData = useAppSelector(ExternalDatabasesSlice.Data);
    const extDbStatus = useAppSelector(ExternalDatabasesSlice.Status);

    React.useEffect(() => {
        if (extDbStatus === 'uninitiated' || extDbStatus === 'changed')
            dispatch(ExternalDatabasesSlice.Fetch());
    }, [extDbStatus]);

    const dbOptions = React.useMemo(() => {
        return extDbData.map(db => { return { Label: db.Name, Value: db.ID.toString()} })
    }, [extDbData])

    function Valid(field: keyof (SystemCenter.Types.extDBTables)): boolean {
        if (field == 'TableName')
            return props.Record.TableName != null && props.Record.TableName.length > 0 && props.Record.TableName.length <= 200;
        else if (field == 'Query')
            return props.Record.Query != null && props.Record.Query.length > 0;

        return true;
    }

    return (
        <>
            {(props.ShowSelectExternalDB ?? false) ?
                <Select<SystemCenter.Types.extDBTables> Record={props.Record} Field={'ExtDBID'} Label='External Database' Setter={props.Setter} Options={dbOptions} />
                : null}
            <Input<SystemCenter.Types.extDBTables> Record={props.Record} Field={'TableName'} Label='Name' Feedback={'A Name of less than 200 characters is required.'} Valid={Valid} Setter={props.Setter} />
            <TextArea<SystemCenter.Types.extDBTables> Rows={8} Record={props.Record} Field={'Query'} Valid={Valid} Setter={props.Setter} Help={'SQL query where {XDA properties} should be in curly braces, e.g. {key} or {meter.Name}'} />
            <button className="btn btn-info pull-left" hidden={!(props.ShowTestButton ?? false)}
                onClick={() => { setShowDialog(true); }}>Test Table Query</button>
            <QueryTestDialog ExtTable={props.Record} Show={showDialog} SetShow={setShowDialog} />
        </>
    );
}