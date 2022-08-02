//******************************************************************************************************
//  global.d.ts - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  02/15/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

declare global {
    var homePath: string;
    var controllerViewPath: string;
    var version: string;

}

export interface EmailCategory {
    ID: number,
    Name: string,
    SelfSubscribe: boolean
}

export interface EmailType {
    ID: number,
    EmailCategoryID: number,
    Name: string,
    Template: string,
    TriggerEmailSQL: string,
    CombineEventsSQL: string,
    MinDelay: number,
    MaxDelay: number,
    SMS: boolean,
    ShowSubscription: boolean,
    RequireApproval: boolean,
    FilePath: string|null
}

export interface SubscibeEmails {
    ID: number,
    Approved: boolean,
    EmailID: number
    FirstName: string
    LastName: string
    Email: string,
    AssetGroup: string
}

export interface ActiveSubscription {
    ID: number|null,
    UserAccountEmailID: number,
    UserAccountID: string,
    Approved: boolean,
    AssetGroup: string, 
    EmailName: string,
    Category: string,
    EmailTypeID: number,
    Subject: string, 
    LastSent: string,
    UserName: string,
    Email: string
}

export interface IEventFilter {
    Start: string,
    End: string,
    EventTypes: number[],
    MeterIDs: number[],
    AssetIDs: number[],
    SubstationIDs: number[],
    GroupIDs: number[]
}

export interface IEvent {
    Meter: string,
    Asset: string,
    StartTime: string,
    EventID: number,
    Triggered: boolean,
    EventType: string
}

interface ITriggeredDataSource {
    ID: number,
    Name: string,
    AssemblyName: string,
    TypeName: string,
    ConfigUI: string
}


export interface IDataSourceTriggeredEmailType {
    ID: number,
    EmailTypeID: number,
    TriggeredEmailDataSourceID: number,
    TriggeredEmailDataSourceName: string,
    Settings?: ITriggeredEmailDataSourceSetting[]
}

export interface ITriggeredEmailDataSourceSetting {
    ID: number,
    TriggeredEmailDataSourceEmailTypeID: number,
    Value: string,
    Name: string
}
