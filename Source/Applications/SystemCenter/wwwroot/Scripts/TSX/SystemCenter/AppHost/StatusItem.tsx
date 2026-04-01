//******************************************************************************************************
//  StatusItem.tsx - Gbtc
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
//  03/19/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import { Application } from '@gpa-gemstone/application-typings'
import { ToolTip } from '@gpa-gemstone/react-forms'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { SystemCenter as SC } from '../global'



const StatusItem = (props: {StatusItem: SC.StatusItem, Status: Application.Types.Status, HoveredItem: String, SetHoveredItem: React.Dispatch<React.SetStateAction<String>>}) => {
    return (

        <div className="row mb-2 mx-2"
        >
            <div className={`col-12 d-flex align-items-center alert-${GetStatusItemAlertClass(props.StatusItem.Status)}`}>
                <span className={"my-3"}>{GetStatusSymbol(props.StatusItem.Status)}</span>
                <h5
                    onMouseEnter={() => props.SetHoveredItem(props.StatusItem.Name)}
                    onMouseLeave={() => props.SetHoveredItem(null)}
                    data-tooltip={`statusbutton${props.StatusItem.Name}`}
                    className={"m-3"}
                >
                    {props.StatusItem.Name}
                </h5>
                {props.StatusItem.Status === "N/A" ? <p className={"my-3 mx-2"}> {props.StatusItem.Name} is disabled. </p> : null}
                {props.StatusItem.Status !== 'Error' ? null : <p className={"my-3 mx-2"}> {props.StatusItem.Details.find((detail) => detail.Status === 'Error')?.Description} </p>}
                <ToolTip
                    Show={props.HoveredItem === props.StatusItem.Name && props.Status === 'idle' && (props.StatusItem.Details.length ?? 0) > 0}
                    Position={'right'}
                    Target={`statusbutton${props.StatusItem.Name}`}
                >
                    {props.StatusItem.Details == null ? <ReactIcons.SpiningIcon /> :
                        props.StatusItem.Details.map((data, index) => (
                            <div
                                className={'d-flex align-items-center'}
                                key={index}
                            >
                                <span className={"my-1"}>{GetDetailStatusSymbol(data.Status)}</span>
                                <p className="m-1"> {data.Description} </p>
                            </div>
                        ))
                    }
                </ToolTip>
            </div>
        </div>
    )
}

export default StatusItem;


// helper functions
export const GetStatusSymbol = (status: Health) => {
    switch (status) {
        case 'Success':
            return <ReactIcons.CircleCheckMark Color="var(--success)" />
        case 'Error':
            return <ReactIcons.CircledX Color="var(--danger)" />
        case 'Warning':
            return <ReactIcons.QuestionMark />
        case 'Loading':
            return <ReactIcons.SpiningIcon />
        case 'N/A':
            return <ReactIcons.CrossMark />
        default:
            return <></>
    }
}

export const GetDetailStatusSymbol = (status: Health) => {
    switch (status) {
        case 'Success':
            return <ReactIcons.CheckMark Color="var(--success)" />
        case 'Error':
            return <ReactIcons.CrossMark Color="var(--danger)" />
        case 'Warning':
            return <ReactIcons.QuestionMark />
        case 'Loading':
            return <ReactIcons.SpiningIcon />
        default:
            return <></>
    }
}

export const GetStatusItemAlertClass = (status: Health) => {
    switch (status) {
        case 'Success':
            return 'success'
        case 'Error':
            return 'danger'
        case 'Warning':
            return 'warning'
        case 'Loading':
            return 'secondary'
        case 'N/A':
            return 'secondary'
    }
}

export type Health = 'Error' | 'N/A' | 'Success' | 'Warning' | 'Loading';