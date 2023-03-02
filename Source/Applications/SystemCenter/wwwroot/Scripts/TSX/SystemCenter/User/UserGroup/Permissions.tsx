// ******************************************************************************************************
//  Permission.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  02/23/2023 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************
import { IApplicationRole } from '../Types';
import Permission from '../Permissions';

declare var homePath: string;

interface IProps {
    GroupID: string,
}

const GroupPermission = (props: IProps) => Permission({
    ID: props.GroupID,
    GetRoles: (id: string) => $.ajax({
        type: "GET",
        url: `${homePath}api/SystemCenter/FullSecurityGroup/Roles/${id}`,
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true
    }),
    SaveRoles: (id: string, roles: IApplicationRole[]) => $.ajax({
        type: "POST",
        url: `${homePath}api/SystemCenter/FullSecurityGroup/${id}/PostRoles`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(roles),
        cache: false,
        async: true
    })
});

export default GroupPermission;
