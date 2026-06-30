//******************************************************************************************************
//  NodeConnections.tsx - Gbtc
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
//  02/26/2026 - Natalie Beatty
//       Generated original version of source code.
//
//  04/03/2026 - Natalie Beatty
//       Renamed to NodeConnections.tsx
//
//******************************************************************************************************

import * as React from 'react'
import { SystemCenter as SC } from '../global'
import StatusGroup from '../CommonComponents/StatusGroup'
import StatusItem from '../CommonComponents/StatusItem'

const NodeConnections = (props: { ApplicationName: string, ApplicationType: SC.ApplicationType, Properties: { Name: string, Value: string }[] }) => {
    const [hoveredItem, setHoveredItem] = React.useState<string>(null)

    return (
        props.ApplicationType === 'SystemCenter' ?
            <div className="row h-100">
                <div className="col-6 h-100">
                    <StatusGroup
                        URL={`${homePath}api/SystemCenter/ExternalDatabases/TestAllConnections`}
                        Verb={"POST"}
                        HoveredItem={hoveredItem}
                        SetHoveredItem={setHoveredItem}
                        Name="External Database Connections"
                    />
                </div>
                <div className={`col-6 h-100`}>
                    <fieldset className="border h-100" style={{ padding: '10px', flex: '1 1 0%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Other Connections</legend>
                        <StatusItem
                            Verb={"POST"}
                            URL={`${homePath}api/LineSegmentWizard/TestConnection`}
                            HoveredItem={hoveredItem}
                            SetHoveredItem={setHoveredItem}
                            Name="FAWG"
                        />

                        <StatusItem
                            URL={`${homePath}api/SystemCenter/PQI/Test`}
                            HoveredItem={hoveredItem}
                            SetHoveredItem={setHoveredItem}
                            Name="PQI"
                        />
                    </fieldset>
                </div>
            </div >
            : props.ApplicationType === "XDA" ?
                <div className="row h-100">
                    <div className="col-6 h-100">
                        <StatusGroup
                            URL={`${homePath}api/OpenXDA/remoteXDAInstance/RemoteConnectionStatus/${props.Properties.find(prop => prop.Name === "ID").Value}` }
                            HoveredItem={hoveredItem}
                            SetHoveredItem={setHoveredItem}
                            Name="Remote openXDA Connections"
                        />
                    </div>
                    <div className={`col-6 h-100`}>
                        <StatusGroup
                            URL={`${homePath}api/OpenXDA/AllConnectionsHealth`}
                            HoveredItem={hoveredItem}
                            SetHoveredItem={setHoveredItem}
                            Name="Other Connections"
                        />
                    </div>
                </div>
                : null
    )
}

export default NodeConnections;