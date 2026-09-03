//******************************************************************************************************
//  FileGroupAnalysisJobPriority.tsx - Gbtc
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
//  09/03/2026 - Natalie Beatty
//       Moved original source code into common component.
//
//******************************************************************************************************

import * as React from 'react';

const FileGroupAnalysisJobPriority = ({ priority }: { priority: number }) => {

    const visual = React.useMemo(() => {
        if (priority == 3) // High Priority
            return "badge-light";
        if (priority == 2) //Normal Priority
            return "badge-info";
        if (priority == 1) // Enumeration
            return "badge-primary";
        if (priority == 4) // Manual Requeue
            return "badge-warning";
        return "badge-warning";
    }, [priority]);

    const text = React.useMemo(() => {
        if (priority == 1)
            return "Enumerator";
        if (priority == 2)
            return "Normal";
        if (priority == 3)
            return "High";
        if (priority == 4)
            return "Requeue";

        return "Unknown";
    }, [priority]);

    return <span className={`badge badge-pill ${visual}`}>
        {text}
    </span>
}

export default FileGroupAnalysisJobPriority;