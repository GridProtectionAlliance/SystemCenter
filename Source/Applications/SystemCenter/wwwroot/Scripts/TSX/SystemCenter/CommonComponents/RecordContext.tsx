//******************************************************************************************************
//  RecordContext.tsx - Gbtc
//
//  Copyright (c) 2026, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA may license this file to you under the MIT License (MIT), the "License"; you may not use this
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
//  09/24/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import { SystemCenter as SC } from '../global'

export const RecordContext = React.createContext<SC.IRecordContext<any>>({
    OriginalRecord: null,
    SelectedRecord: null,
    SetSelectedRecord: () => { },
    Errors: [],
    SetErrors: () => { },
    Warnings: [],
    SetWarnings: () => { },
    RecordType: "",
    GetName: () => "",
    RefreshCount: 0,
    SetRefreshCount: () => { },
    ClearChanges: () => { },
    Patch: () => { }
})

export const useRecordContext = <T,>() => {
    const context = React.useContext(RecordContext)
    return context as SC.IRecordContext<T>
}