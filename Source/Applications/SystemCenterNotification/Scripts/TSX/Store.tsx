//******************************************************************************************************
//  Store.ts - Gbtc
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { configureStore } from '@reduxjs/toolkit';
import {
    ActiveSubscription, EmailCategory, EmailType,
    IDataSourceTriggeredEmailType, ITriggeredDataSource,
    ITriggeredEmailDataSourceSetting, SubscribeEmails,
    ICellCarrier, ScheduledEmailType, ActiveReportSubscription,
    IScheduledDataSource, IScheduledEmailDataSourceSetting, IDataSourceScheduledEmailType,
    SubscribeReports
} from './global';
import { GenericSlice } from '@gpa-gemstone/react-interactive';
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import UserInfoSliceClass  from './Store/UserInfoSlice';

declare var homePath: string;

//Dispatch and Selector Types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export const EmailCategorySlice = new GenericSlice<EmailCategory>("EmailCategory", `${homePath}api/OpenXDA/EmailCategory`, "Name", true);
export const EmailTypeSlice = new GenericSlice<EmailType>("EmailType", `${homePath}api/OpenXDA/EmailType`, "Name", true);
export const ScheduledEmailTypeSlice = new GenericSlice<ScheduledEmailType>("ScheduledEmailType", `${homePath}api/OpenXDA/ScheduledEmailType`, "Name", true);
export const AssetGroupSlice = new GenericSlice<OpenXDA.Types.AssetGroup>("AssetGroup", `${homePath}api/OpenXDA/AssetGroup`, "Name", true);
export const SettingSlice = new GenericSlice<SystemCenter.Types.Setting>('Setting', `${homePath}api/Setting`, 'Name');
export const EventSubscriptionSlice = new GenericSlice<SubscribeEmails>('EventSubscription', `${homePath}api/EventSubscription`, 'FirstName');
export const ReportSubscriptionSlice = new GenericSlice<SubscribeReports>('ReportSubscription', `${homePath}api/ReportSubscription`, 'FirstName');
export const ActiveSubscriptionSlice = new GenericSlice<ActiveSubscription>('ActiveSubscription', `${homePath}api/ActiveSubscription`, 'Email');
export const ActiveReportSubscriptionSlice = new GenericSlice<ActiveReportSubscription>('ActiveReportSubscription', `${homePath}api/ActiveScheduleSubscription`, 'Email');

export const UserInfoSlice = new UserInfoSliceClass('UserInfo', `${homePath}api/UserInfo`);
export const EventTypeSlice = new GenericSlice<OpenXDA.Types.EventType>('EventType', `${homePath}api/EventType`, 'Name');

export const EventAssetGroupSlice = new GenericSlice<OpenXDA.Types.AssetGroup>('EventAssetGroup', `${homePath}api/openXDA/Event/AssetGroup`, 'Name');
export const EventMeterSlice = new GenericSlice<SystemCenter.Types.DetailedMeter>("EventMeter", `${homePath}api/OpenXDA/Event/Meter`, "Name", true);
export const EventAssetSlice = new GenericSlice<SystemCenter.Types.DetailedAsset>("EventAsset", `${homePath}api/OpenXDA/Event/Asset`, "AssetName", true);
export const EventLocationSlice = new GenericSlice<SystemCenter.Types.DetailedLocation>("EventLocation", `${homePath}api/OpenXDA/Event/Location`, "LocationKey", true);

export const TriggeredDataSourceSlice = new GenericSlice<ITriggeredDataSource>("TriggeredDataSource", `${homePath}api/OpenXDA/TriggeredEmailDataSource`, "Name", false);
export const TriggeredEmailDataSourceSlice = new GenericSlice<IDataSourceTriggeredEmailType>("TriggeredEmailDataSource", `${homePath}api/OpenXDA/TriggeredEmailDataSourceEmailType`, "TriggeredEmailDataSourceName", false);
export const TriggeredDataSourceSettingSlice = new GenericSlice<ITriggeredEmailDataSourceSetting>("TriggeredDataSourceSetting", `${homePath}api/OpenXDA/TriggeredEmailDataSourceSetting`, "Name", false);
export const UserAccountSlice = new GenericSlice<Application.Types.iUserAccount>("UserAccount", `${homePath}api/OpenXDA/UserAccount`, "Name", true);

export const ScheduledDataSourceSlice = new GenericSlice<IScheduledDataSource>("ScheduledDataSource", `${homePath}api/OpenXDA/ScheduledEmailDataSource`, "Name", false);
export const ScheduledEmailDataSourceSlice = new GenericSlice<IDataSourceScheduledEmailType>("ScheduledEmailDataSourceEmailType", `${homePath}api/OpenXDA/ScheduledEmailDataSourceEmailType`, "ScheduledEmailDataSourceName", false);
export const ScheduledDataSourceSettingSlice = new GenericSlice<IScheduledEmailDataSourceSetting>("ScheduledDataSourceSetting", `${homePath}api/OpenXDA/ScheduledEmailDataSourceSetting`, "Name", false);


export const CellCarrierSlice = new GenericSlice<ICellCarrier>("CellCarrier", `${homePath}api/OpenXDA/CellCarrier`, "Name", true);

const reducer = {
    EmailCategory: EmailCategorySlice.Reducer,
    EmailType: EmailTypeSlice.Reducer,
    AssetGroup: AssetGroupSlice.Reducer,
    Setting: SettingSlice.Reducer,
    EventSubscription: EventSubscriptionSlice.Reducer,
    ActiveSubscription: ActiveSubscriptionSlice.Reducer,
    UserInfo: UserInfoSlice.Reducer,
    EventType: EventTypeSlice.Reducer,
    EventAssetGroup: EventAssetGroupSlice.Reducer,
    EventMeter: EventMeterSlice.Reducer,
    EventAsset: EventAssetSlice.Reducer,
    EventLocation: EventLocationSlice.Reducer,
    TriggeredDataSourceSetting: TriggeredDataSourceSettingSlice.Reducer,
    TriggeredEmailDataSource: TriggeredEmailDataSourceSlice.Reducer,
    TriggeredDataSource: TriggeredDataSourceSlice.Reducer,
    UserAccount: UserAccountSlice.Reducer,
    CellCarrier: CellCarrierSlice.Reducer,
    ScheduledEmailType: ScheduledEmailTypeSlice.Reducer,
    ActiveReportSubscription: ActiveReportSubscriptionSlice.Reducer,
    ReportSubscription: ReportSubscriptionSlice.Reducer,
    ScheduledDataSourceSetting: ScheduledDataSourceSettingSlice.Reducer,
    ScheduledDataSource: ScheduledDataSourceSlice.Reducer,
    ScheduledEmailDataSourceEmailType: ScheduledEmailDataSourceSlice.Reducer
}

const store = configureStore({ reducer });
export default store;