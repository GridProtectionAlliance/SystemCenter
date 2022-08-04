//******************************************************************************************************
//  ConfigurationLoader.cs - Gbtc
//
//  Copyright © 2018, Grid Protection Alliance.  All Rights Reserved.
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
//  09/10/2018 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Configuration;
using GSF.Data;
using GSF.Data.Model;
using openXDA.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using GSF;

namespace SystemCenter.Notifications.Model
{
    
    public class APIConfiguration
    {
        /// <summary>
        /// Gets or sets openXDA Host
        /// </summary>
        [Setting]
        [DefaultValue("http://localhost:8989")]
        [SettingName("Url")]
        public string Host { get; set; }

        /// <summary>
        /// Gets or sets openXDA API Key
        /// </summary>
        [Setting]
        [DefaultValue("SystemCenter")]
        [SettingName("APIKey")]
        public string Key { get; set; }

        /// <summary>
        /// Gets or sets openXDA API Token
        /// </summary>
        [Setting]
        [DefaultValue("")]
        [SettingName("APIToken")]
        public string Token { get; set; }
    }
}
