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

import type { Application, OpenXDA as GemstoneXDA } from '@gpa-gemstone/application-typings';

// System Center Models
declare global {
    var homePath: string;
    var version: string;
    interface String {
        countOccurrences: (chars: string) => number
    }
}

export namespace SystemCenter {
    interface UserAccount extends Application.Types.iUserAccount { Title: string, MobilePhone: string, ReceiveNotifications: boolean}
    interface TSC { ID: number, Name: string, Description: string, DepartmentNumber: string }
    interface Role { ID: number, Name: string, Description: string }

    interface DeviceHealthReport {
        ID: number, OpenMIC: string, Name: string, Model: string, LocationID: number, LocationKey: string, Substation: string, TSCID: number, TSC: string,
        SectorID: number, Sector: string, IP: string, LastGood: string, BadDays: number, MiMDBadDays: number, XDABadDays: number, MICBadDays: number, XDAStatus: 'Error' | 'Warning' | '',
        MICStatus: 'Error' | 'Warning' | '', MiMDStatus: 'Error' | 'Warning' | '', LastConfigChange: string, DQStatus: 'Error' | 'Warning' | ''
    }

    interface OpenMICDailyStatistic { ID: number, Date: string, Meter: string, LastSuccessfulConnection: string, LastUnsuccessfulConnection: string, LastUnsuccessfulConnectionExplanation: string, TotalConnections: number, TotalUnsuccessfulConnections: number, TotalSuccessfulConnections: number }
    interface MiMDDailyStatistic { ID: number, Date: string, Meter: string, LastSuccessfulFileProcessed: string, LastUnsuccessfulFileProcessed: string, LastUnsuccessfulFileProcessedExplanation: string, TotalFilesProcessed: number, TotalUnsuccessfulFilesProcessed: number, TotalSuccessfulFilesProcessed: number, ConfigChanges: number, DiagnosticAlarms: number, ComplianceIssues: number, LastConfigFileChange: string }
    interface OpenXDADailyStatistic { ID: number, Date: string, Meter: string, LastSuccessfulFileProcessed: string, LastUnsuccessfulFileProcessed: string, LastUnsuccessfulFileProcessedExplanation: string, TotalFilesProcessed: number, TotalUnsuccessfulFilesProcessed: number, TotalSuccessfulFilesProcessed: number, TotalEmailsSent: number, AverageDownloadLatency: number, AverageProcessingStartLatency: number, AverageProcessingEndLatency: number, AverageEmailLatency: number, AverageTotalProcessingLatency: number, AverageTotalEmailLatency: number }
    interface MeterDataQualitySummary { ID: number, Date: string, MeterID: number, ExpectedPoints: number, GoodPoints: number, LatchedPoints: number, UnreasonablePoints: number, NoncongruentPoints: number, DuplicatePoints: number }
    interface ChannelTemplateFile { ID: number, Name: string, FileBlob: string, FileName: string, ShowTrend: boolean, ShowEvents: boolean, SortOrder: number }
}

// OpenXDA Models
export namespace OpenXDA {
    //Events
    interface Event { UpdatedBy: string, FileVersion: number, Description: string, SamplesPerCycle: number, SamplesPerSecond: number, TimeZoneOffset: number, Samples: number, EndTime: string, StartTime: string, Alias: string, Name: string, EventDataID: number | null, EventTypeID: number, AssetID: number, MeterID: number, FileGroupID: number, ID: number, ShortName: string }

    interface EventChannel extends GemstoneXDA.Types.Channel { SourceIndices: string, MeterID: number, AssetID: number, PhaseID: number, MeasurementTypeID: number }
    interface TrendChannel extends GemstoneXDA.Types.Channel { SourceIndices: string, MeterID: number, AssetID: number, PhaseID: number, MeasurementTypeID: number, MeasurementCharacteristicID: number }

    // Data Rescue
    interface DataRescueOperation { ID: number, MeterID: number, StartTime: Date, EndTime: Date, TimeShift: number, TimeShiftUnits: string, ChannelAdjustments: DataRescueChannelAdjustment[] }
    interface DataRescueChannelAdjustment { ID: number, ChannelID: number, Channel: string, Multiplier: number, Adder: number }

    //Todo: Move the following to application typings in gemstone?
    interface CustomerAsset {
        ID: number,
        CustomerKey: string,
        CustomerName: string
        AssetKey: string,
        AssetName: string,
        AssetType: string,
        AssetID: number,
        CustomerID: number
    }

    interface CustomerMeter {
        ID: number,
        CustomerKey: string,
        CustomerName: string
        MeterKey: string,
        MeterName: string,
        MeterLocation: string,
        CustomerID: number,
        MeterID: number
    }

    interface AssetAssetGroup {
        ID: number,
        AssetID: number,
        AssetGroupID: number,
        Name: string,
        DisplayDashboard: boolean,
        AssetName: string,
        LongAssetName: string,
        AssetType: string,
        AssetLocation: string
    }

    interface MeterAssetGroup {
        ID: number,
        MeterID: number,
        AssetGroupID: number,
        Name: string,
        DisplayDashboard: boolean,
        MeterName: string,
        Location: string
    }

    interface IWidgetCategory {
        ID: number,
        Name: string,
        OrderBy: number
    }

    interface IWidget {
        ID: number,
        Name: string,
        Type: string,
        Setting: string,
        Enabled: boolean
    }

    interface IMagDurCurve {
        ID: number,
        Name: string,
        XHigh: number,
        XLow: number,
        YHigh: number,
        YLow: number,
        UpperCurve: string,
        LowerCurve: string,
        Area: string
    }

}

export namespace PQView {
    interface Site { id: number, name: string, description: string, rank: number, parentID: number, utcOffset: number, dst: number, connectionTypeID: number, nominalBaseV: number, nominalFundFreq: number, upsize_ts: Date}
}
