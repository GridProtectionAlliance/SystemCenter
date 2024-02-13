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
    [PrimaryLabel("Text")]
    [TableName("ValueList"), UseEscapedName]

    public class ValueList
    {

        [PrimaryKey(true)]
        public int ID { get; set; }
        [ParentKey(typeof(ValueListGroup))]
        public int GroupID { get; set; }
        public string Value { get; set; }
        public string AltValue { get; set; }
        public int SortOrder { get; set; }
    }

   public class RestrictedValueList 
   {
        public string Name { get; }
        public string CountSQL { get; }
        public string UpdateSQL { get; }
        public string[] DefaultItems { get; }

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
                DefaultItems = new string[] {"UTC"}
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
                DefaultItems = new string[] {"GPA"}
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
                DefaultItems = new string[] {"PQMeter"}
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
                DefaultItems = new string[] {"Unknown"}
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
                DefaultItems = new string[] {"Oneline"}
            }
        };       
   }
}