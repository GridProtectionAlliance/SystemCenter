//******************************************************************************************************
//  AlertDisplay.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  10/16/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import ResultAlert, { OperationResult } from './ResultAlert';

interface IProps {
    OperationResults: OperationResult[]
    SetOperationResults: React.Dispatch<React.SetStateAction<OperationResult[]>>
    ResultsToDisplay?: number
}

const AlertDisplay = ({OperationResults, SetOperationResults, ResultsToDisplay}: IProps) => {
    return (
        <div className="row m-0">
            <div className="col p-0">
                {OperationResults.slice(0, ResultsToDisplay ?? 3).map((opRes, index) => (
                    <ResultAlert
                        OperationResult={opRes}
                        OnClick={() => SetOperationResults(current => current.filter((_, i) => i != index))}
                        key={opRes.Timestamp}
                    />
                ))}
            </div>
        </div>
    )
}

export default AlertDisplay;