//******************************************************************************************************
//  FileWatcher.tsx - Gbtc
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
//  05/04/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react'
import moment from 'moment'
import { ToolTip } from '@gpa-gemstone/react-forms'
import { OpenXDA } from '@gpa-gemstone/application-typings';


export interface INamedDataOperationFailure extends OpenXDA.Types.DataOperationFailure {
    DataFileName: string
}
interface IProps {
    NamedDataOperationFailure: INamedDataOperationFailure
    SelectedFile: string
    Hovered: string
    HandleViewMoreClick: (info: string, evt: React.MouseEvent) => void
    HandleDataOperationFailureClick: (dataOperationFailure: INamedDataOperationFailure, evt: React.MouseEvent) => void
    SetHovered: React.Dispatch<React.SetStateAction<string>>
}

const DataOperationFailure = (props: IProps) => {
    return <div className={`row alert-${props.NamedDataOperationFailure.DataFileName === props.SelectedFile ? 'warning' : 'danger'} m-2`}
        key={props.NamedDataOperationFailure.ID}
        onClick={(evt) => { props.HandleDataOperationFailureClick(props.NamedDataOperationFailure, evt) }}>
        <div className={'col-2 d-flex justify-content-center align-items-center'}>
            <span className={`badge badge-pill badge-secondary`}>{moment(props.NamedDataOperationFailure.TimeOfFailure).format('MM/DD/YYYY hh:mm')}</span>
        </div>
        <div className={'col-3 d-flex justify-content-center align-items-center'}>
            <h6>{props.NamedDataOperationFailure.DataOperationTypeName.split('.')[props.NamedDataOperationFailure.DataOperationTypeName.split('.').length - 1]}</h6>
        </div>
        <div className={'col-3 d-flex justify-content-center align-items-center'}>{props.NamedDataOperationFailure.DataFileName}</div>
        <div className={'col-2 d-flex justify-content-around align-items-center'}>
            <div className={'btn btn-primary'}
                onMouseEnter={() => props.SetHovered(`failurelog${props.NamedDataOperationFailure.ID.toString()}`)}
                onMouseLeave={() => props.SetHovered('')}
                data-tooltip={`failurelog${props.NamedDataOperationFailure.ID.toString()}`}
            >
                View Log
            </div>
            <ToolTip
                Show={props.Hovered === `failurelog${props.NamedDataOperationFailure.ID.toString()}`}
                Target={`failurelog${props.NamedDataOperationFailure.ID.toString()}`}
            >
                {props.NamedDataOperationFailure.Log.length > 100
                    ? <>
                        <p>{`${props.NamedDataOperationFailure.Log.slice(0, 100)}...`}</p>
                        <a href="#" onClick={(evt) => { props.HandleViewMoreClick(props.NamedDataOperationFailure.Log, evt) }}>View more</a>
                    </>
                    : <p>{props.NamedDataOperationFailure.Log}</p>}
            </ToolTip>
        </div>
        <div className={'col-2 d-flex justify-content-around align-items-center'}>
            <div className={'btn btn-primary'}
                onMouseEnter={() => props.SetHovered(`failurestacktrace${props.NamedDataOperationFailure.ID.toString()}`)}
                onMouseLeave={() => props.SetHovered('')}
                data-tooltip={`failurestacktrace${props.NamedDataOperationFailure.ID.toString()}`}
            >
                View Stack Trace
            </div>
            <ToolTip
                Show={props.Hovered === `failurestacktrace${props.NamedDataOperationFailure.ID.toString()}`}
                Target={`failurestacktrace${props.NamedDataOperationFailure.ID.toString()}`}
            >
                {props.NamedDataOperationFailure.StackTrace.length > 100
                    ? <>
                        <p>{`${props.NamedDataOperationFailure.StackTrace.slice(0, 100)}...`}</p>
                        <a href="#" onClick={(evt) => { props.HandleViewMoreClick(props.NamedDataOperationFailure.StackTrace, evt) }}>View more</a>
                    </>
                    : <p>{props.NamedDataOperationFailure.StackTrace}</p>}
            </ToolTip>
        </div>
    </div>
}

export default DataOperationFailure