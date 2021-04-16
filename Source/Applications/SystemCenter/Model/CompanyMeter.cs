//******************************************************************************************************
//  CompanyMeter.cs - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
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
//  10/16/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************



using GSF.Data;
using GSF.Data.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Http;
using SystemCenter.Controllers;

namespace SystemCenter.Model
{
    public class CompanyMeter
    {
        [PrimaryKey(true)]
        public int ID { get; set; }
        public int CompanyID { get; set; }
        public int MeterID { get; set; }
        public string DisplayName { get; set; }
        public bool Enabled { get; set; }
    }

    [RoutePrefix("api/SystemCenter/CompanyMeter")]
    public class CompanyMeterController : ModelController<CompanyMeter> {
        protected override string PostRoles { get; } = "Administrator, Transmission SME";
        protected override string PatchRoles { get; } = "Administrator, Transmission SME";
        protected override string DeleteRoles { get; } = "Administrator, Transmission SME";
        protected override string Connection => "dbOpenXDA";
        public CompanyMeterController() : base(true, "CompanyID")
        {

        }

        [HttpPost, Route("AddMultiple")]
        public IHttpActionResult AddMultipleCompanyMeter(IEnumerable<CompanyMeter> companyMeters) {
            try
            {
                using(AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    foreach (CompanyMeter companyMeter in companyMeters)
                        new TableOperations<CompanyMeter>(connection).AddNewRecord(companyMeter);

                    return Ok("Added all records without error.");
                }
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }
    }
}