//******************************************************************************************************
//  Common.tsx - Gbtc
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
//  01/31/2023 - Christoph Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import { CreateGuid } from '@gpa-gemstone/helper-functions'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ToolTip } from '@gpa-gemstone/react-interactive';

interface IWarningProps {
    Errors: string[],
    Warnings: string[]
}
export const WarningWTooltip = (props: IWarningProps) => {
    const [hover, setHover] = React.useState<boolean>(false);
    const [guid, setGuid] = React.useState<string>(CreateGuid());

    return <>
        <div style={{ height: 40, width: 40, fontSize: 24 }}
            data-tooltip={guid}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        > <ReactIcons.Warning Color="var(--warning)" /> </div>
        <ToolTip Show={hover} Position={'bottom'} Target={guid} Zindex={9999}>
            {props.Warnings.map((w, i) => <><ReactIcons.Warning Color="var(--warning)" /> <p key={`w-${i}`}> {w} </p></>)}
            {props.Errors.map((e, i) => <> <ReactIcons.CrossMark Color="var(--danger)" /> <p key={`i-${i}`}> {e}</p></>)}
        </ToolTip>
    </>
}

