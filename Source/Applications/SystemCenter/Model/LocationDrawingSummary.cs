//******************************************************************************************************
//  ValueList.cs - Gbtc
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

using GSF.ComponentModel.DataAnnotations;
using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;
using GSF.Web.Security;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Http;
using SystemCenter.Controllers;

namespace SystemCenter.Model
{
    [AllowSearch, CustomView("" +
        "SELECT " +
        "COUNT(LocationDrawing.ID) AS NumDrawings," +
        "Location.Name AS LocationName," +
        "Location.ID AS LocationID," +
        " FROM Location LEFT JOIN LocationDrawing ON Location.ID = LocationDrawing.LocationID" +
        " GROUP BY Location.Name, Location.ID")]
    public class LocationDrawingSummaryView
    {
            [PrimaryKey()]
            public int LocationID { get; set; }
            public string LocationName { get; set;  }
            public int NumDrawings { get; set;  }
    }
    
    [RoutePrefix("api/LocationDrawingSummary")]
    public class LocationDrawingSummaryController : ModelControler<LocationDrawingSummary, LocationDrawingSummary> 
    {
        
    }
}