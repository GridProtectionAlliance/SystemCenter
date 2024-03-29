﻿//******************************************************************************************************
//  HomeController.cs - Gbtc
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

using System.Web.Mvc;
using SystemCenter.Notifications.Model;

namespace SystemCenter.Notifications.Controllers
{
    /// <summary>
    /// Represents a MVC controller for the site's main pages.
    /// </summary>
    public class HomeController : Controller
    {
        private readonly AppModel m_appModel;

        public HomeController()
        {
            m_appModel = new AppModel();
            ViewData.Model = m_appModel;
            
        }
        
        #region [ Methods ]

        public ActionResult Index()
        {
            if (!(User.Identity?.IsAuthenticated ?? false))
                return RedirectToAction("Index", "Login");
            
            return View("Index");
        }

        #endregion
    }

}