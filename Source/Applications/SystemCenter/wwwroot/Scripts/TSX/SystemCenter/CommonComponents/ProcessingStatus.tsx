//******************************************************************************************************
//  ProcessingStatus.tsx - Gbtc
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
//  05/08/2026 - Natalie Beatty
//       Moved from ProcessedFile/ByFile.tsx
//
//******************************************************************************************************

import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { CreateGuid } from '@gpa-gemstone/helper-functions';
import * as React from 'react';
import { ToolTip } from '@gpa-gemstone/react-forms';


enum ProcessingStatusEnum {
    Unknown = 0,
    Queued = 1,
    Processing = 2,
    Processed = 3,
    Error = 4,
    PartialSuccess = 5
}

interface IStatusProps {
    Status: ProcessingStatusEnum;
    DataFileID: number;
    Interactive: boolean;
}

const ProcessingStatus = (props: IStatusProps) => {
    const [hover, setHover] = React.useState<boolean>(false);
    const [guid, _setGuid] = React.useState<string>(CreateGuid());
   
    const onClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (!props.Interactive)
            return
        window.location.href = `${homePath}index.cshtml?name=DataOperationsFailures&FileGroupID=${props.DataFileID}`;
    }, [props.Status, props.DataFileID, props.Interactive]);

    const visual = React.useMemo(() => {
        if (props.Status == ProcessingStatusEnum.Unknown) //Added - Unknown
            return "badge-light";
        if (props.Status == ProcessingStatusEnum.Queued) //Queued
            return "badge-info";
        if (props.Status == ProcessingStatusEnum.Processing) // Processing
            return "badge-primary";
        if (props.Status == ProcessingStatusEnum.Processed) // Processed
            return "badge-success";
        if (props.Status == ProcessingStatusEnum.Error) // Error
            return "badge-danger";
        if (props.Status == ProcessingStatusEnum.PartialSuccess) // Partial Success
            return "badge-warning";
        return "badge-warning";
    }, [props.Status]);

    const text = React.useMemo(() => {
        if (props.Status == ProcessingStatusEnum.Unknown) //Added - Unknown
            return "Unknown";
        if (props.Status == ProcessingStatusEnum.Queued) //Queued
            return "Queued";
        if (props.Status == ProcessingStatusEnum.Processing) // Processing
            return "Processing";
        if (props.Status == ProcessingStatusEnum.Processed) // Processed
            return "Processed";
        if (props.Status == ProcessingStatusEnum.Error) // Error
            return "Failure";
        if (props.Status == ProcessingStatusEnum.PartialSuccess) // Partial Success
            return "Warning";
        return "Unknown";
    }, [props.Status]);

    const Symbol = React.useMemo(() => {
        if (props.Status == ProcessingStatusEnum.Unknown) //Added - Unknown
            return <ReactIcons.Warning Size={15} />;
        if (props.Status == ProcessingStatusEnum.Queued) //Queued
            return <ReactIcons.Document Size={15} />;
        if (props.Status == ProcessingStatusEnum.Processing) // Processing
            return <ReactIcons.SpiningIcon Size={15} />;
        if (props.Status == ProcessingStatusEnum.Processed) // Processed
            return <ReactIcons.CircleCheckMark Size={15} />
        if (props.Status == ProcessingStatusEnum.Error) // Error
            return <ReactIcons.CircledX Size={15} />;
        if (props.Status == ProcessingStatusEnum.PartialSuccess) // Partial Success
            return <ReactIcons.Alert Size={15} />;
        return <ReactIcons.Warning Size={15} />;
    }, [props.Status]);

    return (
        <>
            <span
                className={`"badge badge-pill ${visual}`}
                data-tooltip={guid}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={onClick}
            >
                {Symbol}  {text}
            </span>
            <ToolTip Show={hover && props.Interactive} Target={guid} Position={'top'}>
                Click to see details.
            </ToolTip>
            
        </>
    );
}

export default ProcessingStatus