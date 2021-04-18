//******************************************************************************************************
//  Company.cs - Gbtc
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
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Web.Http;
using SystemCenter.Controllers;

namespace SystemCenter.Model
{
    public class Company
    {
        [PrimaryKey(true)]
        public int ID { get; set; }
        [Required]
        public string CompanyID { get; set; }
        public string CompanyTypeID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }


    [RoutePrefix("api/SystemCenter/Company")]
    public class CompanyController : ModelController<Company> {

        protected override string PostRoles { get; } = "Administrator, Transmission SME";
        protected override string PatchRoles { get; } = "Administrator, Transmission SME";
        protected override string DeleteRoles { get; } = "Administrator, Transmission SME";
        protected override bool AllowSearch => true;
        protected override string Connection => "dbOpenXDA";
        protected override string DefaultSort => "CompanyID";
        protected override string CustomView => @"SELECT
                    DISTINCT
                    Company.ID,
                    Company.CompanyID,
                    Company.Name,
                    Company.Description,
                    CompanyType.Name as CompanyTypeID,
                    COUNT(CompanyMeter.ID) as Meters
                FROM

                    Company JOIN
                    CompanyType ON Company.CompanyTypeID = CompanyType.ID LEFT JOIN
                    CompanyMeter ON Company.ID = CompanyMeter.CompanyID
                GROUP BY
                    Company.ID,
	                Company.CompanyID,
	                Company.Name,
	                Company.Description,
                    CompanyType.Name";

    }
}