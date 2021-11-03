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
declare var homePath: string;
import { SystemCenter } from '@gpa-gemstone/application-typings'
import { TextArea } from '@gpa-gemstone/react-forms';
import { useDispatch } from 'react-redux';
import { ExternalDBTablesSlice } from '../Store/Store';

interface IProps {
    ExternalDB: SystemCenter.Types.ExternalDataBaseTable;
}

export default function QueryWindow(props: IProps) {

    const [extDBTable, setExtDBTable] = React.useState<SystemCenter.Types.ExternalDataBaseTable>(props.ExternalDB)
    const dispatch = useDispatch();

    React.useEffect(() => {
        setExtDBTable(props.ExternalDB)
    }, [props.ExternalDB]);

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
                        <TextArea<SystemCenter.Types.ExternalDataBaseTable> Rows={10} Record={extDBTable} Field={'Query'} Valid={() => true} Setter={setExtDBTable} />
                    </form>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary" onClick={() => dispatch(ExternalDBTablesSlice.DBAction({ verb: "PATCH", record: extDBTable }))} hidden={extDBTable.ID == 0} disabled={extDBTable == props.ExternalDB}>Save Changes</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={() => setExtDBTable(props.ExternalDB)} disabled={extDBTable.Query == props.ExternalDB.Query}>Clear Changes</button>
                    </div>
                </div>
            </div>
        );
    }
