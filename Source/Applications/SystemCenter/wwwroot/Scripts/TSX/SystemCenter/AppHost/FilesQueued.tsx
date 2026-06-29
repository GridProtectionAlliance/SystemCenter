//******************************************************************************************************
//  FilesQueued.tsx - Gbtc
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
//  05/19/2026 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import { useGetContainerPosition } from '@gpa-gemstone/helper-functions'
import FilesQueuedGraph from './FilesQueuedGraph'
import AnalysisTaskTable from './AnalysisTaskTable'

const FilesQueued = () => {
    const rowRef = React.useRef<HTMLDivElement>(null);

    const { offsetWidth, offsetHeight } = useGetContainerPosition(rowRef)

    return (
        <div className="row h-100">
            <div className="col h-100">
                <div className="row h-25" ref={rowRef} style={{ justifyContent: 'center' }}>
                        <FilesQueuedGraph
                        Height={offsetHeight}
                        Width={offsetWidth}
                        />
                </div>
                <div className="row d-flex flex-column h-75" style={{ flex: '1 1 0%' }}>
                    <AnalysisTaskTable />
                </div>
            </div>            
        </div>
    )
}

export default FilesQueued