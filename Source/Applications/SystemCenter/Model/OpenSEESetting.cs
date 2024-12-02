﻿//******************************************************************************************************
//  OpenSEESetting.cs - Gbtc
//
//  Copyright © 2016, Grid Protection Alliance.  All Rights Reserved.
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
//  11/25/2024 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

using System.Text;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using GSF.Identity;
using GSF.Web;
using GSF.Web.Model;

namespace SystemCenter.Model
{
    [AllowSearch]
    [DeleteRoles("Administrator")]
    [PatchRoles("Administrator")]
    [PostRoles("Administrator")]
    [TableName("OpenSEE.Setting")]
    [UseEscapedName]
    public class OpenSEESetting : openXDA.Model.Setting { };


    [RoutePrefix("api/OpenSEE/Setting")]
    public class OpenSEESettingController : ModelController<OpenSEESetting> { }
}
