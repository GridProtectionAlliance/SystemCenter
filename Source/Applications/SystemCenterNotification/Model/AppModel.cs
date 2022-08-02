//******************************************************************************************************
//  AppModel.cs - Gbtc
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

using System.Web.Routing;

namespace SystemCenter.Notifications.Model
{
    /// <summary>
    /// Defines a base application model with convenient global settings and functions.
    /// </summary>
    /// <remarks>
    /// Custom view models should inherit from AppModel because the "Global" property is used by _Layout.cshtml.
    /// </remarks>
    public class AppModel
    {
        #region [ Constructors ]

        /// <summary>
        /// Creates a new <see cref="AppModel"/>.
        /// </summary>
        public AppModel()
        {
            Global = MvcApplication.DefaultModel != null ? MvcApplication.DefaultModel.Global : new GlobalSettings();
        }

       
        #endregion

        #region [ Properties ]

        /// <summary>
        /// Gets global settings for application.
        /// </summary>
        public GlobalSettings Global
        {
            get;
        }

        #endregion

        #region [ Methods ]

        /// <summary>
        /// Configures a simple view with common view bag parameters based on page name.
        /// </summary>
        /// <param name="requestContext">Url.RequestContext for view.</param>
        /// <param name="pageName">Page name as defined in Page table.</param>
        /// <param name="viewBag">Current view bag.</param>
        /// <remarks>
        /// This is normally called from controller before returning view action result.
        /// </remarks>
        public void ConfigureView(RequestContext requestContext, string pageName, dynamic viewBag)
        {
            ConfigureView(pageName, viewBag);
        }

        /// <summary>
        /// Configures a view establishing user roles based on page name, modeled table <typeparamref name="TModel"/> and SignalR <see cref="DataHub"/>.
        /// </summary>
        /// <param name="requestContext">Url.RequestContext for view.</param>
        /// <param name="pageName">Page name as defined in Page table.</param>
        /// <param name="viewBag">Current view bag.</param>
        /// <remarks>
        /// This is normally called from controller before returning view action result.
        /// </remarks>
        public void ConfigureView<TModel>(RequestContext requestContext, string pageName, dynamic viewBag) where TModel : class, new()
        {
            ConfigureView(pageName, viewBag);
        }

        // Handles querying page details from Page table
        private void ConfigureView(string pageName, dynamic viewBag)
        {
            viewBag.PageName = pageName;
        }

        public bool IsDebug()
        {
            #if DEBUG 
                return true;
            #else
                return false;
            #endif

        }

        #endregion
    }
}