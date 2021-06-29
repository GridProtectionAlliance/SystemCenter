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
declare global {
    var homePath: string;
    var version: string;
    interface String {
        countOccurrences: (chars: string) => number
    }

    namespace moment {
        function utc(timestamp: string): any;
    }
    function moment(inp?: any, format?: any, strict?: boolean): any;
    function moment(inp?: any, format?: any, language?: string, strict?: boolean): any;

}

export namespace SystemCenter {
    type Status = 'loading' | 'idle' | 'error' | 'changed' | 'unintiated';

    interface ByComponent { (props: { Roles: Array<SystemCeneterSecurityRoleName> }): JSX.Element; }
    interface ExternalDB { name: string, lastupdate: Date }
    interface ExternalDBField { DisplayName: string, FieldValueID: number, OpenXDAParentTableID: number, AdditionalFieldID: number, Value: string, FieldName: string, PreviousValue: string, Error: boolean, Message: string, isXDAField: boolean, Changed: boolean}

    interface Company { ID: number, CompanyTypeID: number, CompanyID: string, Name: string, Description: string }
    interface CompanyMeter { ID: number, CompanyID: number, MeterID: number, DisplayName: string, Enabled: boolean }
    interface CompanyType { ID: number, Name: string, Description: string }

    interface Customer { ID: number, CustomerKey: string, Name: string, Phone: string, Description: string }
    interface CustomerAccess { ID: number, CustomerID: number, PQViewSiteID: number }

    interface UserAccount { ID: string, Name: string, Password: string, FirstName: string, LastName: string, DefaultNodeID?: string, Phone: string, PhoneConfirmed: boolean, Email: string, EmailConfirmed: boolean, LockedOut: boolean, Approved: boolean, UseADAuthentication: boolean, ChangePasswordOn: Date, CreatedOn?: Date, CreatedBy?: string, UpdatedOn?: Date, AccountName?: string, Title: string, Department: string, DepartmentNumber: string, MobilePhone: string, ReceiveNotifications: boolean}
    interface AdditionalUserField { ID: number, FieldName: string, Type: string, IsSecure: boolean }
    interface AdditionalUserFieldValue { ID: number, UserAccountID: string, AdditionalUserFieldID: number, Value: string }


    interface ApplicationRole<T> { ID: string, Name: T, Description: string, NodeID: string, CreatedOn: Date, CreatedBy: string, UpdatedOn: Date, UpdatedBy: string, Assigned?: boolean }
    interface ApplicationRoleUserAccount { ID: string, ApplicationRoleID: string, UserAccountID: string }
    interface SecurityGroup { ID: string, Name: string, Description: string, CreatedOn: Date, CreatedBy: string, UpdatedOn: Date }
    interface ApplicationRoleSecurityGroup { ID: string, ApplicationRoleID: string, SecurityGroupID: string }
    interface TSC { ID: number, Name: string, Description: string, DepartmentNumber: string }
    interface Role { ID: number, Name: string, Description: string }

    interface DeviceHealthReport { ID: number, Name: string, Model: string, LocationID: number, LocationKey: string,  Substation: string, TSC: string, Sector: string, IP: string, LastGood: string,  BadDays: number, Status: string, LastConfigChange: string }

    type NewEdit = 'New' | 'Edit'
   
    type SystemCeneterSecurityRoleName = 'Administrator' | 'Transmission SME' | 'PQ Data Viewer';
    type OpenXDASecurityRoleName = 'Administrator' | 'DataPusher' | 'Developer' | 'Viewer' | 'Engineer';
    type AttachedDatabases = 'SystemCenter' | 'OpenXDA'
}

// OpenXDA Models
export namespace OpenXDA {
    interface Location { ID: number, LocationKey: string, Name: string, Alias: string, Latitude: number, Longitude: number, Description: string, ShortName: string }
    interface EDNAPoint { ID: number, BreakerID: number, Point: string }
    interface Meter { ID: number, AssetKey: string, Alias: string, Make: string, Model: string, Name: string, ShortName: string, TimeZone: string, LocationID: number, Description: string }
    interface Channel { ID: number, Meter: string, Asset: string, MeasurementType: string, MeasurementCharacteristic: string, Phase: string, Name: string, Adder: number, Multiplier: number, SamplesPerHour: number, PerUnitValue: number, HarmonicGroup: number, Description: string, Enabled: boolean, ConnectionPriority: number, Series: OpenXDA.Series[] }
    interface Series { ID: number, ChannelID: number, SeriesType: string, SourceIndexes: string }

    // Assets
    interface Asset { ID: number, VoltageKV: number, AssetKey: string, Description: string, AssetName: string, AssetType: AssetTypeName, Spare:boolean, Channels: Array<OpenXDA.Channel> }
    interface Breaker extends Asset { ThermalRating: number, Speed: number, TripTime: number, PickupTime: number, TripCoilCondition: number, EDNAPoint?: string, SpareBreakerID?: number }
    interface Bus extends Asset { }
    interface CapBank extends Asset {
        NumberOfBanks: number, CapacitancePerBank: number, CktSwitcher: string, MaxKV: number, UnitKV: number, UnitKVAr: number, NegReactanceTol: number, PosReactanceTol: number,
        Nparalell: number, Nseries: number, NSeriesGroup: number, NParalellGroup: number, Fused: boolean, VTratioBus: number, NumberLVCaps: number, NumberLVUnits: number, LVKVAr: number, LVKV: number,
        LVNegReactanceTol: number, LVPosReactanceTol: number, LowerXFRRatio: number, Nshorted: number, BlownFuses: number, BlownGroups: number, RelayPTRatioPrimary: number, Rv: number,
        Rh: number, Compensated: boolean, NLowerGroups: number, ShortedGroups: number, Sh: number, RelayPTRatioSecondary: number
    }
    interface CapBankRelay extends Asset { OnVoltageThreshhold: number, CapBankNumber: number  }
    interface Line extends Asset { MaxFaultDistance: number, MinFaultDistance: number, Detail: LineDetail }
    interface LineSegment extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, Length: number, IsEnd: boolean }
    interface Transformer extends Asset { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, PrimaryVoltageKV: number, SecondaryVoltageKV: number, Tap: number, TertiaryVoltageKV: number, SecondaryWinding: number, PrimaryWinding: number, TertiaryWinding: number   }
    interface LineDetail { R0: number, X0: number, R1: number, X1: number, ThermalRating: number, Length: number }
    // Links
    interface AssetConnection { ID: number, AssetRelationshipTypeID: number, Parent: string, Child: string }

    interface Phase { ID: number, Name: string, Description: string }
    interface MeasurementType { ID: number, Name: string, Description: string }
    interface MeasurementCharacteristic { ID: number, Name: string, Description: string }
    interface AssetType { ID: number, Name: AssetTypeName, Description: string }
    interface AssetConnectionType { ID: number, Name: string, Description: string, BiDirectional: boolean, JumpConnection: string, PassThrough: string }
    interface NoteType { ID: number, Name: string, ReferenceTableName: string }

    interface MeterConfiguration { ID: number, MeterID: number, DiffID: number, ConfigKey: string, ConfigText: string, RevisionMajor: number, RevisionMinor: number }
    interface DataFile { ID: number, FileGroupID: number, FilePath: string, FilePathHash: number, FileSize: number, CreationTime: string, LastWriteTime: string, LastAccessTime: string, MeterID: number, DataStartTime: string, ProcessingEndTime: string}

    // Types
    type AssetTypeName = 'Line' | 'LineSegment' | 'Breaker' | 'Bus' | 'CapacitorBank' | 'Transformer' | 'CapacitorBankRelay'

    type DetailedAsset = (OpenXDA.Breaker | OpenXDA.Bus | OpenXDA.CapBank | OpenXDA.Line | OpenXDA.Transformer | OpenXDA.CapBankRelay)

    // AssetGroups
    interface AssetGroup { ID: number, Name: string, DisplayDashboard: boolean, AssetGroups: number, Meters: number, Assets: number, Users: number }
}

export namespace PQView {
    interface Site { id: number, name: string, description: string, rank: number, parentID: number, utcOffset: number, dst: number, connectionTypeID: number, nominalBaseV: number, nominalFundFreq: number, upsize_ts: Date}
}
