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
}

export namespace SystemCenter {
        
    interface TSC { ID: number, Name: string, Description: string, DepartmentNumber: string }
    interface Role { ID: number, Name: string, Description: string }

    interface DeviceHealthReport {
        ID: number, OpenMIC: string, Name: string, Model: string, LocationID: number, LocationKey: string, Substation: string, TSCID: number, TSC: string,
        SectorID: number, Sector: string, IP: string, LastGood: string, BadDays: number, Status: string, LastConfigChange: string
    }

    interface OpenMICDailyStatistic { ID: number, Date: string, Meter: string, LastSuccessfulConnection: string, LastUnsuccessfulConnection: string, LastUnsuccessfulConnectionExplanation: string, TotalConnections: number, TotalUnsuccessfulConnections: number, TotalSuccessfulConnections: number }
    interface MiMDDailyStatistic { ID: number, Date: string, Meter: string, LastSuccessfulFileProcessed: string, LastUnsuccessfulFileProcessed: string, LastUnsuccessfulFileProcessedExplanation: string, TotalFilesProcessed: number, TotalUnsuccessfulFilesProcessed: number, TotalSuccessfulFilesProcessed: number, ConfigChanges: number, DiagnosticAlarms: number, ComplianceIssues: number, LastConfigFileChange: string }
    interface OpenXDADailyStatistic { ID: number, Date: string, Meter: string, LastSuccessfulFileProcessed: string, LastUnsuccessfulFileProcessed: string, LastUnsuccessfulFileProcessedExplanation: string, TotalFilesProcessed: number, TotalUnsuccessfulFilesProcessed: number, TotalSuccessfulFilesProcessed: number, TotalEmailsSent: number, AverageDownloadLatency: number, AverageProcessingStartLatency: number, AverageProcessingEndLatency: number, AverageEmailLatency: number, AverageTotalProcessingLatency: number, AverageTotalEmailLatency: number }

}

// OpenXDA Models
export namespace OpenXDA {


    // Data Rescue
    interface DataRescueOperation { ID: number, MeterID: number, StartTime: Date, EndTime: Date, TimeShift: number, TimeShiftUnits: string, ChannelAdjustments: DataRescueChannelAdjustment[] }
    interface DataRescueChannelAdjustment { ID: number, ChannelID: number, Channel: string, Multiplier: number, Adder: number }
}

export namespace PQView {
    interface Site { id: number, name: string, description: string, rank: number, parentID: number, utcOffset: number, dst: number, connectionTypeID: number, nominalBaseV: number, nominalFundFreq: number, upsize_ts: Date}
}
