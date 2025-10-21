//******************************************************************************************************
//  XDAAPICredentialRetriever.cs - Gbtc
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
//  10/21/2025 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.ComponentModel;
using GSF.Configuration;
using openXDA.APIAuthentication;
using SystemCenter.Model;

namespace SystemCenter.Controllers
{
    public class XDAAPICredentialRetriever : IAPICredentialRetriever
    {
        // Private Class
        private class APIHelperSettings
        {
            public APIHelperSettings(Action<object> configure) =>
                configure(this);

            [Category]
            [SettingName("XDA")]
            public APIConfiguration APISettings { get; } = new APIConfiguration();
        }

        public string Token { get; private set; }
        public string Key { get; private set; }
        public string Host { get; private set; }

        public bool TryRefreshSettings()
        {
            APIConfiguration config = new APIHelperSettings(new ConfigurationLoader(() => Program.Host.CreateDbConnection()).Configure).APISettings;
            Token = config.Token;
            Key = config.Key;
            Host = config.Host;
            return true;
        }
    }
}