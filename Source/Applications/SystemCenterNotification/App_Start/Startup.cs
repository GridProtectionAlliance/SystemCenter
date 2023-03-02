//******************************************************************************************************
//  Startup.cs - Gbtc
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
//  08/21/2022 - J. Ritchie Carroll
//       Updated to enable GSF based authentication
//
//******************************************************************************************************

using GSF.Diagnostics;
using GSF.IO;
using GSF.Web.Security;
using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Routing;

using Resources = GSF.Web.Shared.Resources;
using AuthenticationOptions = GSF.Web.Security.AuthenticationOptions;

using static SystemCenter.Notifications.Common;
using System.Web.Hosting;
using System.Text.RegularExpressions;

[assembly: OwinStartup(typeof(SystemCenter.Notifications.Startup))]

namespace SystemCenter.Notifications
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Enable GSF role-based security authentication
            app.UseAuthentication(s_authenticationOptions);

            OwinLoaded = true;

            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();

            // Enable GSF session management
            config.EnableSessions(s_authenticationOptions);

            // Set configuration to use reflection to setup routes
            config.MapHttpAttributeRoutes(new CustomDirectRouteProvider());

            app.UseWebApi(config);
        }

        public class CustomDirectRouteProvider : DefaultDirectRouteProvider
        {
            protected override IReadOnlyList<IDirectRouteFactory>

            GetActionRouteFactories(HttpActionDescriptor actionDescriptor) =>
                actionDescriptor.GetCustomAttributes<IDirectRouteFactory>(inherit: true);
        }

        private static readonly AuthenticationOptions s_authenticationOptions;

        static Startup()
        {
            SetupTempPath();

            s_authenticationOptions = new AuthenticationOptions
            {
                LoginPage = LoginPage,
                LoginHeader = $"<h3><img src=\"{LoginIcon}\"/> {ApplicationName}</h3>",
                AnonymousResourceExpression = AnonymousResourceExpression,
                AuthFailureRedirectResourceExpression = @"^/$|^/.+$",
                AuthTestPage = AuthTestPage
            };

            AuthenticationOptions = CreateInstance<ReadonlyAuthenticationOptions>(s_authenticationOptions);
        }

        public static bool OwinLoaded { get; private set; }

        public static ReadonlyAuthenticationOptions AuthenticationOptions { get; }

        private static T CreateInstance<T>(params object[] args)
        {
            Type type = typeof(T);
            object instance = type.Assembly.CreateInstance(type.FullName, false, BindingFlags.Instance | BindingFlags.NonPublic, null, args, null, null);
            return (T)instance;
        }

        private static void SetupTempPath()
        {
            const string DynamicAssembliesFolderName = "DynamicAssemblies";
            string assemblyDirectory = null;

            try
            {
                // Setup custom temp folder so that dynamically compiled razor assemblies can be more easily managed
                assemblyDirectory = FilePath.GetAbsolutePath(DynamicAssembliesFolderName);

                if (!Directory.Exists(assemblyDirectory))
                    Directory.CreateDirectory(assemblyDirectory);

                Environment.SetEnvironmentVariable("TEMP", assemblyDirectory);
                Environment.SetEnvironmentVariable("TMP", assemblyDirectory);
            }
            catch (Exception ex)
            {
                // This is not catastrophic
                Logger.SwallowException(ex, $"Failed to assign temp folder location to: {assemblyDirectory}");
            }
        }
    }
}