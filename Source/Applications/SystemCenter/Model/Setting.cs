﻿//******************************************************************************************************
//  Setting.cs - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  09/19/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data.Model;
using GSF.Web.Model;
using System.Web.Http;
using SystemCenter.Controllers;

namespace SystemCenter.Model
{
    [ConfigFileTableNamePrefix, TableName("Setting"), UseEscapedName]
    [PostRoles("Administrator")]
    [DeleteRoles("Administrator")]
    [PatchRoles("Administrator")]
    [AllowSearch]
    public class Setting
    {
        [PrimaryKey(true)]
        public int ID { get; set; }

        [Searchable]
        [DefaultSortOrder]
        public string Name { get; set; }

        [Searchable]
        public string Value { get; set; }

        [Searchable]
        public string DefaultValue { get; set; }

    }

    [RoutePrefix("api/SystemCenter/Setting")]
    public class SettingController : ModelController<Setting>
    {}
}