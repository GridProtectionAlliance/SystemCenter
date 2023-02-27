// ******************************************************************************************************
//  Types.tsx - Gbtc
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
//  02/23/2023 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import { Application } from "@gpa-gemstone/application-typings";

export interface ISecurityGroup extends Application.Types.iSecurityGroup {
    DisplayName: string;
    Type: string;
}

export interface IApplicationRole extends Application.Types.iApplicationRole<Application.Types.SecurityRoleName> { }

export interface IUserAccount extends Application.Types.iUserAccount {
    Type: string,
    DisplayName: string
}