//******************************************************************************************************
//  DetailedMeterAsset.cs - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  07/19/2023 - Stephen C. Wills
//       Generated original version of source code.
//
//******************************************************************************************************

using GSF.Data.Model;
using openXDA.Model;

namespace SystemCenter.Model
{
    [TableName("Asset"),
     CustomView(@"
    SELECT
        Asset.*,
        MeterAsset.MeterID,
        AssetType.Name AssetType,
        FaultDetectionLogic.Expression FaultDetectionLogic
    FROM 
        Asset JOIN
        AssetType ON Asset.AssetTypeID = AssetType.ID JOIN
        MeterAsset ON MeterAsset.AssetID = Asset.ID LEFT JOIN
        FaultDetectionLogic ON FaultDetectionLogic.MeterAssetID = MeterAsset.ID
    ")]
    public class DetailedMeterAsset : Asset
    {
        [ParentKey(typeof(Meter))]
        public int MeterID { get; set; }

        public string AssetType { get; set; }

        public string FaultDetectionLogic { get; set; }
    }
}