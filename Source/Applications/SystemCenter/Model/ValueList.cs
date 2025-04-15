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

using System;
using System.Collections.Generic;
using System.Web.Http;
using GSF.Data;
using GSF.Data.Model;
using GSF.Web.Model;

namespace SystemCenter.Model
{

    public class RestrictedValueList 
   {
        public string Name { get; set; }
        public string CountSQL { get; set; }
        public string UpdateSQL { get; set;  }

        /// <summary>
        /// Default items in a <see cref="RestrictedValueList"/>.
        /// Objects may be either <see langword="string"/> or <see cref="Tuple"/> of two <see langword="string"/>,
        /// where the <see cref="Tuple"/> represents &lt;<see cref="ValueList.Value"/>, <see cref="ValueList.AltValue"/>&gt;
        /// </summary>
        public object[] DefaultItems { get; set; }

        public static List<RestrictedValueList> List = new List<RestrictedValueList>(){
            new RestrictedValueList() {
                Name = "TimeZones",
                CountSQL = @"SELECT COUNT(ID) FROM 
                        Meter
                        WHERE [TimeZone] = {0}",
                UpdateSQL = @"UPDATE Meter
                            SET [TimeZone] = {0} 
                        WHERE
                            [TimeZone] = {1}",
                DefaultItems = ["UTC"]
            },
             new RestrictedValueList() {
                Name = "Make",
                CountSQL = @"SELECT COUNT(ID) FROM 
                        Meter
                        WHERE [Make] = {0}",
                UpdateSQL = @"UPDATE 
                        Meter
                        SET [Make] = {0} 
                        WHERE
                        [Make] = {1}",
                DefaultItems = ["GPA"]
            },
             new RestrictedValueList() {
                Name = "Model",
                CountSQL = @"SELECT COUNT(ID) FROM 
                        Meter
                        WHERE [Model] = {0}",
                UpdateSQL = @"UPDATE 
                        Meter
                        SET [Model] = {0} 
                        WHERE
                        [Model] = {1}",
                DefaultItems =["PQMeter"]
            },
             new RestrictedValueList() {
                Name = "Unit",
                CountSQL = @"SELECT COUNT(ID) FROM  
                        ChannelGroupType
                        WHERE
                        [Unit] = {0}",
                UpdateSQL = @"UPDATE 
                        ChannelGroupType
                        SET [Unit] = {0} 
                        WHERE
                        [Unit] = {1}",
                DefaultItems = ["Unknown"]
            },
             new RestrictedValueList() {
                Name = "Category",
                CountSQL = @"SELECT COUNT(ID) FROM  
                        LocationDrawing
                        WHERE
                        [Category] = {0}",
                UpdateSQL = @"UPDATE 
                        LocationDrawing
                        SET [Category] = {0} 
                        WHERE
                        [Category] = {1}",
                DefaultItems = ["Oneline"]
            },
             new RestrictedValueList() {
                Name = "SpareChannel",
                DefaultItems = ["Spare Channel"]
            }
        };       
   }

    [AllowSearch, CustomView("" +
        "SELECT " +
        "ValueListGroup.*," +
        "(SELECT COUNT(*) FROM ValueList WHERE ValueList.GroupID = ValueListGroup.ID) AS ItemCount" +
        " FROM ValueListGroup")]
    public class ValueListGroupView : ValueListGroup
    {
        public int ItemCount { get; set; }
    }

    [RoutePrefix("api/ValueListGroup")]
    public class ValueListGroupController : ModelController<ValueListGroupView, ValueListGroup> 
    {
        public override IHttpActionResult Patch([FromBody] ValueListGroup newRecord)
        {
            if (!PatchAuthCheck())
            {
                return Unauthorized();
            }

            // Check if Value changed
            bool changeVal = false;
            ValueListGroup oldRecord;

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                oldRecord = new TableOperations<ValueListGroup>(connection).QueryRecordWhere("ID = {0}", newRecord.ID);
                changeVal = !(newRecord.Name == oldRecord.Name);
            }

            if (changeVal)
            {
                using (AdoDataConnection connection = new AdoDataConnection(Connection))
                {
                    // Wrapping is needed here, since C# tries to use the wrong method signature otherwise
                    object[] parameters = [newRecord.Name, oldRecord.Name];
                    // Update Additional Fields
                    connection.ExecuteScalar(@"UPDATE 
                        AdditionalField
                        SET [Type] = {0} 
                        WHERE
                        [Type] = {1}", parameters);
                }
            }
            return base.Patch(newRecord);

        }

        public override IHttpActionResult Delete(ValueListGroup record)
        {
            if (!DeleteAuthCheck())
            {
                return Unauthorized();
            }

            using (AdoDataConnection connection = new AdoDataConnection(Connection))
            {
                // Wrapping is needed here, since C# tries to use the wrong method signature otherwise
                object[] parameters = [record.Name];
                // Update Additional Fields
                connection.ExecuteScalar(@"UPDATE 
                    AdditionalField
                    SET [Type] = 'string' 
                    WHERE
                    [Type] = {0}", parameters);
            }
            return base.Delete(record);
        }
    }
}