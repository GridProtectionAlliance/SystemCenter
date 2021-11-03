//******************************************************************************************************
//  CompanyForm.tsx - Gbtc
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
//  10/20/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { Input, Select} from '@gpa-gemstone/react-forms';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import { ExternalDBTablesSlice } from '../Store/Store';
import { useSelector } from 'react-redux';

interface IProps { ExternalDB: SystemCenter.Types.ExternalDataBaseTable, Setter: (externalDBTable: SystemCenter.Types.ExternalDataBaseTable) => void, setErrors?: (e: string[]) => void }

export default function ExternalDBForm(props: IProps) {

    const data = useSelector(ExternalDBTablesSlice.Data) as SystemCenter.Types.ExternalDataBaseTable[];

    let Options = [{
        Value: "Maximo",
        Label: "Maximo"
        }, {
        Value: "PQView",
        Label: "PQView"
        }, {
        Value: "Fawg",
        Label: "Fawg"
        }]

    React.useEffect(() => {
        let e = [];
        if (props.ExternalDB.TableName == null || props.ExternalDB.TableName.length == 0)
            e.push('A valid Name is required.');
        if (props.ExternalDB.TableName != null && props.ExternalDB.TableName.length > 200)
            e.push('Name must be less than 200 characters.');
        if (props.ExternalDB.TableName != null && data.map(eDBTables => eDBTables.ID != props.ExternalDB.ID && eDBTables.TableName.toLowerCase()).indexOf(props.ExternalDB.TableName.toLowerCase()) > -1)
            e.push('Name must be unique.');
        if (props.setErrors != undefined)
            props.setErrors(e);
    }, [props.ExternalDB]);

    function Valid(field: keyof (SystemCenter.Types.ExternalDataBaseTable)): boolean {
        if (field == 'TableName') {
            if (props.ExternalDB.TableName != null && data.map(eDBTables => eDBTables.ID != props.ExternalDB.ID && eDBTables.TableName.toLowerCase()).indexOf(props.ExternalDB.TableName.toLowerCase()) > -1)
                return false
            else
                return props.ExternalDB.TableName != null && props.ExternalDB.TableName.length > 0 && props.ExternalDB.TableName.length <= 200;
        }
        else if (field == 'ExternalDB')
            return props.ExternalDB.ExternalDB != null && props.ExternalDB.ExternalDB.length > 0 && props.ExternalDB.ExternalDB.length <= 200;
        return false;
    }

    return (
        <form>
            <Input<SystemCenter.Types.ExternalDataBaseTable> Record={props.ExternalDB} Field={'TableName'} Label={'Name'} Feedback={"A unique Name of less than 200 characters is required."} Valid={Valid} Setter={props.Setter} />
            <Select<SystemCenter.Types.ExternalDataBaseTable> Record={props.ExternalDB} Field={'ExternalDB'} Label={'External Database'} Options={Options} Setter={props.Setter} />
        </form>

    );
}