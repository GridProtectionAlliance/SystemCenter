//******************************************************************************************************
//  Meters.cs - Gbtc
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
//  08/26/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Transactions;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using Newtonsoft.Json.Linq;
using openXDA.Model;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/Location")]
    public class OpenXDALocationController : ModelController<Location>
    {
        protected override string Connection { get; } = "dbOpenXDA";

        public class LocationSearch
        {
            public string Field { get; set; }
            public string SearchText { get; set; }
        }
        [HttpPost, Route("SearchableList")]
        public IHttpActionResult GetMetersUsingSearchableList([FromBody] IEnumerable<LocationSearch> searches)
        {
            string whereClause = string.Join(" AND ", searches.Select(search => search.Field + " LIKE '%" + search.SearchText + "%'"));
            if (searches.Any())
                whereClause = "WHERE \n" + whereClause;
            using (AdoDataConnection connection = new AdoDataConnection("dbOpenXDA"))
            {
                DataTable table = connection.RetrieveData(@"
                SELECT
	                DISTINCT
	                Location.LocationKey,
	                Location.Name,
	                COUNT(DISTINCT Meter.ID) as Meters,
	                COUNT(DISTINCT AssetLocation.AssetID) as Assets
                FROM
	                Location LEFT JOIN
	                Meter ON Location.ID = Meter.LocationID LEFT JOIN
	                AssetLocation ON Location.ID = AssetLocation.LocationID LEFT JOIN
	                Note ON Note.NoteTypeID = (SELECT ID FROM NoteType WHERE Name = 'Location') AND Note.ReferenceTableID = Meter.ID
                   " + whereClause + @"
                GROUP BY
	                Location.LocationKey,
	                Location.Name
                ");
                return Ok(table);
            }
        }


    }

}