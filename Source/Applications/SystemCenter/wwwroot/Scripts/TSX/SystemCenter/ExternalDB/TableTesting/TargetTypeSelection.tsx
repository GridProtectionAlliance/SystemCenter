//******************************************************************************************************
//  TargetTypeSelection.tsx - Gbtc
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
//  11/23/2023 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Select, CheckBox } from '@gpa-gemstone/react-forms';
import { useAppDispatch } from '../../hooks';
import { OpenXDA } from '@gpa-gemstone/application-typings';

interface IProps {
    SetTable: (table: string | undefined) => void;
}

const parentTableOptions = (OpenXDA.Lists.AssetTypes as string[]).concat(['Meter', 'Location', 'Customer', 'Asset']).map(name => { return { Value: name, Label: name } });

interface TableOptions { ShowTableSelect: boolean, TableName: string };

export default function TargetTypesSelection(props: IProps) {
   
    const [parentTable, setParentTable] = React.useState<TableOptions>({ ShowTableSelect: true, TableName: parentTableOptions[0].Value });

    React.useEffect(() => {
        if (parentTable.ShowTableSelect) props.SetTable(parentTable.TableName)
        else props.SetTable('');
    }, [parentTable])
    // Needed to Select Record for Query
   
    return (
        <>
            <div className="row">
                <div className="col">
                    <CheckBox<TableOptions> Label={'Use Parent Type'} Record={parentTable} Setter={setParentTable}
                        Field={'ShowTableSelect'} />
                </div>
            </div>
            <div className="row">
                <div className ="col">
                {parentTable.ShowTableSelect ?
                    <Select<TableOptions> Label={''} Record={parentTable} Setter={setParentTable}
                        Field={'TableName'} Options={parentTableOptions} />
                        : null}
                </div>
            </div>
        </>
    );
}
