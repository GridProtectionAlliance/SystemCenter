//******************************************************************************************************
//  StatusDetails.tsx - Gbtc
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
//  04/06/2026 - Natalie Beatty
//      Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react'
import { SystemCenter } from '../global'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols'
import { GetStatusSymbol, GetStatusItemAlertClass } from './StatusItem'

interface IProps {
    StatusItem: SystemCenter.StatusItem
}

const StatusDetails = (props: IProps) => {
    return (
        <div>
            {props.StatusItem.Details.length == 0 ? <ReactIcons.SpiningIcon />
                : props.StatusItem.Details.map((d, i) => {
                    return (
                        <div className={'row mb-2 mx-2'} key={i}> 
                            <div className={`col-12 d-flex align-items-center alert-${GetStatusItemAlertClass(d.Status)}`}>
                                <span className={"my-3"}>{GetStatusSymbol(d.Status)}</span>
                                <h5 className={"m-3"} >
                                    {d.Description}
                                </h5>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default StatusDetails;