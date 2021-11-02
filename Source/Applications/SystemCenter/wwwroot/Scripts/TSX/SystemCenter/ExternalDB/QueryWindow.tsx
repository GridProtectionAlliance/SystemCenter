//******************************************************************************************************
//  QueryWindow.tsx - Gbtc
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
//  10/25/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************


import * as React from 'react';
import * as _ from 'lodash';
import ExternalDBForm from './ExternalDBForm';
declare var homePath: string;
import { SystemCenter } from '@gpa-gemstone/application-typings'
import { TextArea } from '@gpa-gemstone/react-forms';

interface IProps {
    ExternalDB: SystemCenter.Types.ExternalDataBaseTable;
    stateSetter: (externalDB: SystemCenter.Types.ExternalDataBaseTable) => void
    setErrors?: (e: string[]) => void
}

export default function QueryWindow(props: IProps) {

    const [extDBTable, setExtDBTable] = React.useState<SystemCenter.Types.ExternalDataBaseTable>(props.ExternalDB)

    React.useEffect(() => {
        let e = [];
        if (props.ExternalDB.Query != null && props.ExternalDB.Query.length > 200)
            e.push('Query must be less than 200 characters.');
        if (props.setErrors != undefined)
            props.setErrors(e);
    }, [props.ExternalDB]);

    function updateExternalDatabase(): JQuery.jqXHR {
        var externalDB = _.clone(extDBTable);

       return $.ajax({
            type: "PATCH",
           url: `${homePath}api/OpenXDA/ExternalDBTables/Update`,
            contentType: "application/json; charset=utf-8",
           data: JSON.stringify(extDBTable),
            dataType: 'json',
            cache: true,
            async: true
       }).done((LocationID: number) => {
           props.stateSetter(externalDB);
       });
    }

    function Valid(field: keyof (SystemCenter.Types.ExternalDataBaseTable)): boolean {
        if (field == 'Query')
            return props.ExternalDB.Query != null && props.ExternalDB.Query.length > 0 && props.ExternalDB.Query.length <= 200;
        return false;
    }

        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Query Information:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <TextArea<SystemCenter.Types.ExternalDataBaseTable> Rows={10} Record={props.ExternalDB} Field={'Query'} Feedback={props.ExternalDB.Query == null ? 'Query must be greater than 0 characters.' : 'Query must be less than 200 characters'} Valid={Valid} Setter={props.stateSetter} />
                    </form>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary" onClick={() => updateExternalDatabase()} hidden={extDBTable.ID == 0} disabled={extDBTable == props.ExternalDB}>Save Changes</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={() => setExtDBTable(props.ExternalDB)} disabled={extDBTable == props.ExternalDB}>Clear Changes</button>
                    </div>
                </div>
            </div>
        );
    }
