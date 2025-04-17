//******************************************************************************************************
//  RestrictedDetailedAsset.cs - Gbtc
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
//  05/15/2024 - G. Santos
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data.Model;
using System.Collections.Generic;
using SystemCenter.Model;

[RootQueryRestriction("AssetType <> {0}", "LineSegment")]
public class RestrictedDetailedAsset : DetailedAsset
{
    [SQLSearchModifier()]
    public static string TransformSQL(SQLSearchFilter filter, List<object> parameters)
    {
        if (filter.FieldName == "Meter")
        {
            parameters.Add(filter.SearchText);
            return "(SELECT Count(*) FROM Meter LEFT JOIN MeterAsset ON Meter.ID = MeterAsset.MeterID " +
                $"WHERE Meter.AssetKey {{{parameters.Count - 1}}} AND MeterAsset.AssetID = FullTbl.ID) > 0";
        }
        if (filter.FieldName == "Location")
        {
            parameters.Add(filter.SearchText);
            return "(SELECT Count(*) FROM Location LEFT JOIN AssetLocation ON AssetLocation.LocationID = Location.ID " +
                $"WHERE Location.LocationKey {{{parameters.Count - 1}}} AND AssetLocation.AssetID = FullTbl.ID) > 0";
        }

        return filter.GenerateConditional(parameters);
    }
}