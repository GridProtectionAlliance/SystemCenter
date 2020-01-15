//******************************************************************************************************
//  global.d.ts - Gbtc
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
//  10/04/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

// System Center Models
export interface AssetType { Name: string, ID: number }
export interface AssetTypeWithCount extends AssetType { Assets: number }
export interface AssetTypeField { Name: string, ID: number, Type: string, Description: string }
export interface Asset { ID: number, AssetKey: string, AssetTypeID: number }
export interface AssetTypeFieldAndValue { FieldName: string, FieldDescription: string, FieldType: string, AssetTypeFieldValueID: number, AssetTypeFieldValue: string }
export interface ValueListItem { ID: number, GroupID: number, Text: string, Value: number, Key: number, Hidden: boolean, IsDefault: boolean, SortOrder: number, AltText1: string, Enabled: boolean }
export interface Note { ID: number, AssetID: number, Note: string, UserAccount: string, Timestamp: string }

// OpenXDA Models
export namespace OpenXDA {
    interface Location { ID: number, LocationKey: string, Name: string, Alias: string, Latitude: number, Longitude: number, Description: string, ShortName: string }
    interface OldLine { ID: number, AssetKey: string, VoltageKV: number, ThermalRating: number, Length: number, MaxFaultDistance: number, MinFaultDistance: number, Description: string }
    interface MeterLine { ID: number, MeterID: number, LineID: number, LineName: string }
    interface LineImpedance { ID: number, LineID: number, R0: number, X0: number, R1: number, X1: number }
    interface EDNAPoint { ID: number, LineID: number, Point: number }
    interface Meter { ID: number, AssetKey: string, Alias: string, Make: string, Model: string, Name: string, ShortName: string, TimeZone: string, LocationID: number, Description: string }
    interface Channel { ID: number, Meter: string, Asset: string, MeasurementType: string, MeasurementCharacteristic: string, Phase: string, Name: string, SamplesPerHour: number, PerUnitValue: number, HarmonicGroup: number, Description: string, Enabled: boolean, Series: OpenXDA.Series }
    interface Series { ID: number, ChannelID: number, SeriesType: string, SourceIndexes: string }
    interface Note { ID: number, NoteTypeID: number, ReferenceTableID: number, Note: string, UserAccount: string, Timestamp: string }

    // Assets
    interface Asset { ID: number, VoltageKV: number, AssetKey: string, Description: string, AssetName: string, AssetType: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer', Spare:boolean, Channels: Array<OpenXDA.Channel> }
    interface Breaker extends Asset { ThermalRating: number, Speed: number, TripTime: number, PickupTime: number, TripCoilCondition: number }
    interface Bus extends Asset { }
    interface CapBank extends Asset { NumberOfBanks: number, CansPerBank: number, CapacitancePerBank: number }
    interface Line extends Asset { MaxFaultDistance: number, MinFaultDistance: number, Segment: LineSegment }
    interface LineSegment extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, Length: number }
    interface Transformer extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, PrimaryVoltageKV: number, SecondaryVoltageKV: number, Tap: number }

    // Links
    interface AssetConnection { ID: number, AssetRelationshipTypeID: number, Parent: string, Child: string }

    // Types
    interface Phase { ID: number, Name: string, Description: string }
    interface MeasurementType { ID: number, Name: string, Description: string }
    interface AssetType { ID: number, Name: 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer', Description: string }
    interface AssetConnectionType { ID: number, Name: string, Description: string, BiDirectional: boolean, JumpConnection: string, PassThrough: string }
    interface NoteType { ID: number, Name: string, ReferenceTableName: string }


    // System Center - OpenXDA Link models
    interface SCMeterLine extends OldLine { LineName: string, LineImpedanceID: number, R0: number, X0: number, R1: number, X1: number }
}
