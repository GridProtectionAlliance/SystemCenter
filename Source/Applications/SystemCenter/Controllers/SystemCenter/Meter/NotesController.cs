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
using System.Threading;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using SystemCenter.Model;

namespace SystemCenter.Controllers.SystemCenter.Meter
{
    [RoutePrefix("api/SystemCenter/Meter/Notes")]
    public class NotesController : ApiController
    {
        //[HttpGet, Route("{id}")]
        //public IEnumerable<Notes> Get(int id)
        //{
        //    using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //    {
        //        return new TableOperations<Notes>(connection).QueryRecordsWhere("ReferenceTableID ={0} AND NoteTypeID = (SELECT ID FROM NoteType WHERE Name = 'Meter')", id);
        //    }
        //}

        //[HttpPost, Route("Add")]
        //public IHttpActionResult Post([FromBody]Notes note)
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            string timeZone = connection.ExecuteScalar<string>("SELECT Value FROM Setting WHERE Name = 'XDATimeZone'");
        //            note.NoteTypeID = connection.ExecuteScalar<int>("SELECT ID FROM NoteType WHERE Name = 'Meter'");
        //            note.TimeStamp = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById(timeZone));
        //            note.UserAccount = Thread.CurrentPrincipal.Identity.Name;
        //            new TableOperations<Notes>(connection).AddNewRecord(note);

        //            return Ok(note);
        //        }
        //    }
        //    catch(Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpDelete, Route("{id}")]
        //public IHttpActionResult Delete(int id)
        //{
        //    try
        //    {
        //        using (AdoDataConnection connection = new AdoDataConnection("systemSettings"))
        //        {
        //            new TableOperations<Notes>(connection).DeleteRecord(id);

        //            return Ok(id);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

    }
}