﻿//******************************************************************************************************
//  OpenXDAAccessLogController.cs - Gbtc
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
//  02/10/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data;
using GSF.Security.Model;
using GSF.Web.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SystemCenter.Controllers.OpenXDA
{
    [RoutePrefix("api/OpenXDA/AccessLog")]
    public class OpenXDAAccessLogController : ModelController<AccessLog>
    {
        [HttpGet, Route("Aggregates/{days:int}")]
        public IHttpActionResult GetAggregates(int days)
        {
            try
            {
                if (GetRoles == string.Empty || User.IsInRole(GetRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        DataTable table = connection.RetrieveData(@"
                        DECLARE @startDate Date = CAST( GETDATE() as DATE)
                        DECLARE @endDate DATE = DATEADD(DAY, -" + days + @", @startDate)

                        DECLARE @columns nvarchar(max) = N''

                        WHILE @endDate <= @startDate
                        BEGIN
	                        SET @columns = @columns +'[' + CAST(@endDate as varchar(max)) + '],'
	                        SET @endDate = DATEADD(DAY,1,@endDate)
                        END

                        SET @endDate = DATEADD(DAY, -30, @startDate)


                        DECLARE @sql nvarchar(max) = N'
                        SELECT '+SUBSTRING(@columns,0, LEN(@columns))+' 
                        FROM (
                        SELECT
	                        CAST(CreatedOn as Date) as CreatedOn,
                            AccessGranted
                        FROM
	                        AccessLog
                        WHERE
	                        AccessGranted = 1 AND CAST(CreatedOn as Date) BETWEEN @endDate AND @startDate
                        ) as tbl
                        PIVOT(
	                        COUNT(AccessGranted)
	                        FOR CreatedOn IN ('+SUBSTRING(@columns,0, LEN(@columns))+')
                        ) as pvt'


                        exec sp_executesql @sql, N'@startDate Date, @endDate Date', @startDate = @startDate, @endDate = @endDate

                    ", "");

                        var firstRow = table.Select().FirstOrDefault();
                        var dates = table.Columns.Cast<DataColumn>().Select(x => new { Date = x.ColumnName, Count = (firstRow == null ? 0 : firstRow[x.ColumnName]) });
                        return Ok(dates);
                    }
                }
                else
                    return Unauthorized();

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet, Route("Table/{days:int}")]
        public IHttpActionResult GetTable(int days)
        {
            try
            {
                if (GetRoles == string.Empty || User.IsInRole(GetRoles))
                {
                    using (AdoDataConnection connection = new AdoDataConnection(Connection))
                    {
                        DataTable table = connection.RetrieveData(@"
                        DECLARE @startDate Date = CAST( GETDATE() as DATE)
                        DECLARE @endDate DATE = DATEADD(DAY, -" + days + @", @startDate)

                        SELECT
	                        COUNT(AccessGranted) as Logins,
	                        Max(CreatedOn) as LastAccess,
	                        UserName
                        FROM
	                        AccessLog
                        WHERE
	                        AccessGranted = 1 AND CAST(CreatedOn as Date) BETWEEN @endDate AND @startDate          
                        GROUP BY
	                        UserName
                    ", "");
                        return Ok(table);
                    }
                }
                else
                    return Unauthorized();

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}