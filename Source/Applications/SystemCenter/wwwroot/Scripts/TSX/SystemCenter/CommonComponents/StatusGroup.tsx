//******************************************************************************************************
//  StatusGroup.tsx - Gbtc
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
import StatusItem, { INamedStatusItem } from './StatusItem'
import { Application } from '@gpa-gemstone/application-typings'
import { ServerErrorIcon } from '@gpa-gemstone/react-interactive'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';


const StatusGroup = (props: { Name: string, URL: string, Verb?: 'GET' | 'POST', HoveredItem: String, SetHoveredItem: React.Dispatch<React.SetStateAction<String>> }) => {
    const [statusItems, setStatusItems] = React.useState<INamedStatusItem[]>([])
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')

    React.useEffect(() => {
        setStatus('loading')
        const h = $.ajax({
            type: props.Verb ?? 'GET',
            url: props.URL,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })

        h.done((d) => {
            setStatusItems(() => d)
            setStatus('idle')
        }).fail(() => {
            setStatus('error')
        })

        return () => {
            if (h.abort != null)
                h.abort();
        }
    }, [props.URL])

    return (
        <fieldset className="border h-100" style={{ padding: '10px', flex: '1 1 0%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <legend className="w-auto" style={{ fontSize: 'large' }}>{`${props.Name}:`}</legend>
            {status === "error" ? <div className="col-12"> <ServerErrorIcon Show={true} Label={"Server error occured."} /> </div> :
                status === "loading" ? <ReactIcons.SpiningIcon/> : 
                statusItems.map((statusItem, index) => (
                <StatusItem
                    Name={statusItem.Name}
                    StatusItem={statusItem}
                    HoveredItem={props.HoveredItem}
                    SetHoveredItem={props.SetHoveredItem}
                    key={index}
                />
                ))}
        </fieldset>
    )
}

export default StatusGroup;