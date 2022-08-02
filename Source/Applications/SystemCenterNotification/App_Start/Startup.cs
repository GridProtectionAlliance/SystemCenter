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

[assembly: OwinStartup(typeof(SystemCenter.Notifications.Startup))]

namespace SystemCenter.Notifications
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Enable GSF role-based security authentication
            app.UseAuthentication(s_authenticationOptions);

            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();

            // Set configuration to use reflection to setup routes
            config.MapHttpAttributeRoutes(new CustomDirectRouteProvider());

            app.UseWebApi(config);

            OwinLoaded = true;
        }

        public class CustomDirectRouteProvider : DefaultDirectRouteProvider
        {
            protected override IReadOnlyList<IDirectRouteFactory>

            GetActionRouteFactories(HttpActionDescriptor actionDescriptor)
            {
                return actionDescriptor.GetCustomAttributes<IDirectRouteFactory>(inherit: true);
            }
        }

        private static readonly AuthenticationOptions s_authenticationOptions;
        private static Dictionary<string, Assembly> s_assemblyCache;
        private static bool s_addedResolver;

        static Startup()
        {
            // Steps to properly load desired version of AjaxMin (prevents version conflict between GSF and WebGrease):
            //   1) Reference new GSF version of AjaxMin via NuGet
            //   2) Set AjaxMin reference property "Copy Local" to false
            //   3) Add AjaxMin to project as an embedded resource
            //   4) Load AjaxMin into AppDomain from embedded resource
            LoadAssemblyFromResource("AjaxMin");
            SetupTempPath();

            s_authenticationOptions = new AuthenticationOptions
            {
                LoginPage = "/Login",
                LoginHeader = $"<h3><img src=\"{Resources.Root}/Shared/Images/gpa-smalllock.png\"/> {ApplicationName}</h3>",
                AnonymousResourceExpression = AnonymousResourceExpression,
                AuthFailureRedirectResourceExpression = @"^/$|^/.+$",
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

        private static void LoadAssemblyFromResource(string assemblyName)
        {
            if (!s_addedResolver)
            {
                // Hook into assembly resolve event for current domain so it can load assembly from embedded resource
                AppDomain.CurrentDomain.AssemblyResolve += ResolveAssemblyFromResource;
                s_addedResolver = true;
            }

            // Load the assembly (this will invoke event that will resolve assembly from resource)
            AppDomain.CurrentDomain.Load(assemblyName);
        }

        private static Assembly ResolveAssemblyFromResource(object sender, ResolveEventArgs e)
        {
            string shortName = e.Name.Split(',')[0];

            if (s_assemblyCache is null)
                s_assemblyCache = new Dictionary<string, Assembly>();

            if (s_assemblyCache.TryGetValue(shortName, out Assembly resourceAssembly) && !(resourceAssembly is null))
                return resourceAssembly;

            Assembly entryAssembly = typeof(Startup).Assembly;

            // Loops through all of the resources in the executing assembly
            foreach (string name in entryAssembly.GetManifestResourceNames())
            {
                // See if the embedded resource name matches the assembly trying to be loaded
                if (string.Compare(FilePath.GetFileNameWithoutExtension(name), $"{nameof(SystemCenter)}.{nameof(Notifications)}.{shortName}", StringComparison.OrdinalIgnoreCase) != 0)
                    continue;

                // If so, load embedded resource assembly into a binary buffer
                Stream resourceStream = entryAssembly.GetManifestResourceStream(name);

                if (resourceStream is null)
                    continue;

                byte[] buffer = new byte[resourceStream.Length];
                resourceStream.Read(buffer, 0, (int)resourceStream.Length);
                resourceStream.Close();

                // Load assembly from binary buffer
                resourceAssembly = Assembly.Load(buffer);

                // Add assembly to the cache
                s_assemblyCache.Add(shortName, resourceAssembly);
                break;
            }

            return resourceAssembly;
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