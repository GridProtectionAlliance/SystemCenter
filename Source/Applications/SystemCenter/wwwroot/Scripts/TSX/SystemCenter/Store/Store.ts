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
//  10/20/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { configureStore } from '@reduxjs/toolkit';
import MeterReducer from './MeterSlice';
import AssetReducer from './AssetSlice';
import { GenericSlice } from '@gpa-gemstone/react-interactive'
import { EventChannelSlice } from './EventChannelSlice';
import { SystemCenter, OpenXDA, Application } from '@gpa-gemstone/application-typings';
import NoteSlice from './NoteSlice';
import AdditionalUserFieldSlice from './AdditionalUserFieldSlice';
import ConfigurationSlice from './ConfigurationSlice';
import { PQApplications } from '../ApplicationCategory/Applications';
import { DBCleanup } from '../DB/DBCleanup';
import { ApplicationCategory } from '../ApplicationCategory/ByApplicationCategory';
import { OpenXDA as LocalXDA, SystemCenter as LocalSystemCenter } from '../global'
import PQISlice from './PQISlice';
import { IApplicationRole, ISecurityGroup, IUserAccount } from '../User/Types';
import UserSettingsReducer from './UserSettings';
import { EventWidget } from '../../../../../EventWidgets/TSX/global';
import { IAPIAccessKey } from '../APIAccessKeys/APIAccessKeys'

declare var homePath: string;

//Dispatch and Selector Types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

/* Will combine those once we move to the generic ByPage */
export const ValueListGroupSlice = new GenericSlice<SystemCenter.Types.ValueListGroup>('ValueListGroup', `${homePath}api/ValueListGroup`, 'Name');
export const ValueListGroupViewSlice = new GenericSlice<LocalSystemCenter.ValueListGroupView>('ValueListGroupView', `${homePath}api/ValueListGroup`, 'Name');

export const ValueListSlice = new GenericSlice<SystemCenter.Types.ValueListItem>('ValueList', `${homePath}api/ValueList`, 'SortOrder');
export const LocationDrawingSlice = new GenericSlice<SystemCenter.Types.LocationDrawing>('LocationDrawing', `${homePath}api/LocationDrawing`, 'Name');

export const ChannelGroupSlice = new GenericSlice<SystemCenter.Types.ChannelGroup>('ChannelGroup', `${homePath}api/ChannelGroup`, 'Name');
export const ChannelGroupViewSlice = new GenericSlice<LocalSystemCenter.ChannelGroupView>('ChannelGroupView', `${homePath}api/ChannelGroup`, 'Name');

export const ChannelGroupDetailsSlice = new GenericSlice<SystemCenter.Types.ChannelGroupDetails>('ChannelGroupDetails', `${homePath}api/ChannelGroupDetails`, 'DisplayName');

export const SystemCenterSettingSlice = new GenericSlice<SystemCenter.Types.Setting>('SystemCenterSetting', `${homePath}api/Setting`, 'Name');
export const OpenXDASettingSlice = new GenericSlice<SystemCenter.Types.Setting>('OpenXDASetting', `${homePath}api/OpenXDA/Setting`, 'Name');
export const MiMDSettingSlice = new GenericSlice<SystemCenter.Types.Setting>('MiMDSetting', `${homePath}api/MiMD/Setting`, 'Name');
export const OpenSEESettingSlice = new GenericSlice<SystemCenter.Types.Setting>('OpenSEESetting', `${homePath}api/OpenSEE/Setting`, 'Name');


export const AssetConnectionTypeSlice = new GenericSlice<OpenXDA.Types.AssetConnectionType>("AssetConnectionType", `${homePath}api/OpenXDA/AssetConnectionType`, 'Name');
export const AssetTypeSlice = new GenericSlice<OpenXDA.Types.AssetType>("AssetType", `${homePath}api/OpenXDA/AssetType`, 'Name');
export const PhaseSlice = new GenericSlice<OpenXDA.Types.Phase>("Phase", `${homePath}api/OpenXDA/Phase`, 'Name');
export const MeasurmentTypeSlice = new GenericSlice<OpenXDA.Types.MeasurementType>("MeasurementType", `${homePath}api/OpenXDA/MeasurementType`, 'Name');
export const MeasurementCharacteristicSlice = new GenericSlice<OpenXDA.Types.MeasurementCharacteristic>("MeasurementCharacteristic", `${homePath}api/OpenXDA/MeasurementCharacteristic`, 'Name');

export const DataFileSlice = new GenericSlice<OpenXDA.Types.DataFile>("DataFile", `${homePath}api/OpenXDA/DataFile`, "ProcessingEndTime", false);
export const EventTypeAssetTypeSlice = new GenericSlice<OpenXDA.Types.EventTypeAssetType>("EventTypeAssetType", `${homePath}api/OpenXDA/EventTypeAssetType`, "ID", false);
export const CustomerSlice = new GenericSlice<OpenXDA.Types.Customer>("Customer", `${homePath}api/SystemCenter/Customer`, "CustomerKey", false);
export const CustomerMeterSlice = new GenericSlice<LocalXDA.CustomerMeter>('CustomerMeter', `${homePath}api/SystemCenter/CustomerMeter`, 'MeterKey', false);
export const CustomerAssetSlice = new GenericSlice<LocalXDA.CustomerAsset>('CustomerAsset', `${homePath}api/SystemCenter/CustomerAsset`, 'AssetKey', false);


export const EventTypeSlice = new GenericSlice<OpenXDA.Types.EventType>("EventType", `${homePath}api/OpenXDA/EventType`, "Name");
export const LocationSlice = new GenericSlice<OpenXDA.Types.Location>("Location", `${homePath}api/OpenXDA/Location`, "LocationKey", true);
export const DataOperationSlice = new GenericSlice<OpenXDA.Types.DataOperation>("DataOperation", `${homePath}api/OpenXDA/DataOperation`, "LoadOrder");
export const DataReaderSlice = new GenericSlice<OpenXDA.Types.DataReader>("DataReader", `${homePath}api/OpenXDA/DataReader`, "LoadOrder");
export const ExternalDatabasesSlice = new GenericSlice<SystemCenter.Types.DetailedExternalDatabases>("ExternalDatabases", `${homePath}api/SystemCenter/ExternalDatabases`, "Name", false);
export const ExternalDBTablesSlice = new GenericSlice<SystemCenter.Types.DetailedExtDBTables>("ExternalDataBaseTable", `${homePath}api/SystemCenter/extDBTables`, "TableName", true);
export const AdditionalFieldsSlice = new GenericSlice<SystemCenter.Types.AdditionalFieldView>("AdditionalFields", `${homePath}api/SystemCenter/AdditionalFieldView`, "FieldName", true);
export const ExternalXDAFieldsSlice = new GenericSlice<SystemCenter.Types.ExternalOpenXDAField>("ExternalOpenXDAField", `${homePath}api/SystemCenter/ExternalOpenXDAField`, "FieldName", true);
export const ApplicationNodeSlice = new GenericSlice<Application.Types.iApplicationNode>("ApplicationNode", `${homePath}api/OpenXDA/ApplicationNode`, "Name", false);
export const LSCVSAccountSlice = new GenericSlice<SystemCenter.Types.LSCVSAccount>("LSCVSAccount", `${homePath}api/LSCVSAccount`, "AccountID", false);
export const DBCleanupSlice = new GenericSlice<DBCleanup>("DBCleanup", `${homePath}api/OpenXDA/DBCleanup`, "ID", true);
export const ApplicationCategorySlice = new GenericSlice<ApplicationCategory>("PQApplicationCategory", `${homePath}api/OpenXDA/ApplicationCategory`, "Name", true);
export const PQApplicationsSlice = new GenericSlice<PQApplications>("PQApplications", `${homePath}api/OpenXDA/PQApplications`, "Name", true);

export const AssetGroupSlice = new GenericSlice<OpenXDA.Types.AssetGroup>("AssetGroup", `${homePath}api/OpenXDA/AssetGroup`, "Name", true);
export const ByAssetSlice = new GenericSlice<SystemCenter.Types.DetailedAsset>("ByAsset", `${homePath}api/OpenXDA/ByAsset`, "AssetName", true);
export const ByLocationSlice = new GenericSlice<SystemCenter.Types.DetailedLocation>("ByLocation", `${homePath}api/OpenXDA/ByLocation`, "LocationKey", true);
export const ByMeterSlice = new GenericSlice<SystemCenter.Types.DetailedMeter>("ByMeter", `${homePath}api/OpenXDA/ByMeter`, "Name", true);

export const RemoteXDAInstanceSlice = new GenericSlice<OpenXDA.Types.RemoteXDAInstance>("remoteXDAInstance", `${homePath}api/OpenXDA/remoteXDAInstance`, "Name", false);
export const RemoteXDAMeterSlice = new GenericSlice<OpenXDA.Types.RemoteXDAMeter>("RemoteXDAMeter", `${homePath}api/OpenXDA/RemoteXDAMeter`, "LocalMeterName", false);
export const RemoteXDAAssetSlice = new GenericSlice<OpenXDA.Types.RemoteXDAAsset>("RemoteXDAAsset", `${homePath}api/OpenXDA/RemoteXDAAsset`, "LocalAssetName", false);
export const UserAccountSliceRemote = new GenericSlice<Application.Types.iUserAccount>("UserAccountRemote", `${homePath}api/SystemCenter/RemoteUserAccount`, "Name", false);

export const AssetNoteSlice = new NoteSlice('Asset');
export const MeterNoteSlice = new NoteSlice('Meter');
export const UserNoteSlice = new NoteSlice('User');
export const LocationNoteSlice = new NoteSlice('Location');
export const CustomerNoteSlice = new NoteSlice('Customer');
export const CompanyNoteSlice = new NoteSlice('Company');
export const UserAccountSlice = new GenericSlice<IUserAccount>('UserAccounts', `${homePath}api/SystemCenter/UserAccount`, "AccountName", false);
export const UserAdditionalFieldSlice = new AdditionalUserFieldSlice('AdditionalUserFields', `${homePath}api/SystemCenter`);

export const SourceImpedanceSlice = new GenericSlice<OpenXDA.Types.SourceImpedance>("SourceImpedance", `${homePath}api/OpenXDA/SourceImpedance`, "AssetLocationID", false);
export const SecurityGroupSlice = new GenericSlice<ISecurityGroup>("SecurityGroup", `${homePath}api/SystemCenter/FullSecurityGroup`, "Type", false)
export const ApplicationRoleSlice = new GenericSlice<IApplicationRole>("ApplicationRole", `${homePath}api/SystemCenter/ApplicationRole`, "Name", false)

export const WidgetCategorySlice = new GenericSlice<LocalXDA.IWidgetCategory>("WidgetCategory", `${homePath}api/SystemCenter/WidgetCategory`, "OrderBy", true)
export const SEBrowserWidgetSlice = new GenericSlice<LocalXDA.IWidget>("SEBrowserWidget", `${homePath}api/SEbrowser/Widget`, "Name", true);
export const SEBrowserWidgetViewSlice = new GenericSlice<EventWidget.IWidgetView>("SEBrowserWidgetView", `${homePath}api/SEbrowser/WidgetView`, "Name", true)
export const MagDurCurveSlice = new GenericSlice<OpenXDA.Types.MagDurCurve>('MagDurCurve', `${homePath}api/SystemCenter/StandardMagDurCurve`, 'Name');
export const APIAccessKeySlice = new GenericSlice<IAPIAccessKey>('APIAccessKey', `${homePath}api/OpenXDA/APIAccessKey`, 'RegistrationKey');


export const EventTagSlice = new GenericSlice<OpenXDA.Types.EventTag>("EventTag", `${homePath}api/OpenXDA/EventTag`, 'Name');
export const MATLABAnalyticSlice = new GenericSlice<OpenXDA.Types.MATLABAnalytic>("MATLABAnalytic", `${homePath}api/OpenXDA/MATLABAnalytic`, 'LoadOrder');
export const MATLABAnalyticEventTypeSlice = new GenericSlice<OpenXDA.Types.MATLABAnalyticEventType>("MATLABAnalyticEventType", `${homePath}api/OpenXDA/MATLABAnalyticEventType`, 'ID');
export const MATLABAnalyticAssetTypeSlice = new GenericSlice<OpenXDA.Types.MATLABAnalyticAssetType>("MATLABAnalyticAssetType", `${homePath}api/OpenXDA/MATLABAnalyticAssetType`, 'ID');
export const TrendChannelSlice = new GenericSlice<LocalXDA.TrendChannel>('TrendChannels', `${homePath}api/OpenXDA/TrendChannel`, 'Name');

export const ChannelTemplateSlice = new GenericSlice<LocalSystemCenter.ChannelTemplateFile>('ChannelTemplate', `${homePath}api/SystemCenter/ChannelTemplateFile`, 'ID', true);

export const ConfigSlice = new ConfigurationSlice("Config");

const store = configureStore({
    reducer: {
        UserSettings: UserSettingsReducer,
        LSCVSAccount: LSCVSAccountSlice.Reducer,
        EventTypeAssetType: EventTypeAssetTypeSlice.Reducer,
        AssetGroup: AssetGroupSlice.Reducer,
        ByAsset: ByAssetSlice.Reducer,
        ByMeter: ByMeterSlice.Reducer,
        ByLocation: ByLocationSlice.Reducer,
        MeasurementType: MeasurmentTypeSlice.Reducer,
        Phase: PhaseSlice.Reducer,
        AssetConnectionType: AssetConnectionTypeSlice.Reducer,
        Meter: MeterReducer,
        Asset: AssetReducer,
        Location: LocationSlice.Reducer,
        ValueListGroup: ValueListGroupSlice.Reducer,
        ValueList: ValueListSlice.Reducer,
        ChannelGroup: ChannelGroupSlice.Reducer,
        ChannelGroupDetails: ChannelGroupDetailsSlice.Reducer,
        LocationDrawing: LocationDrawingSlice.Reducer,
        SystemCenterSetting: SystemCenterSettingSlice.Reducer,
        OpenXDASetting: OpenXDASettingSlice.Reducer,
        MiMDSetting: MiMDSettingSlice.Reducer,
        OpenSEESetting: OpenSEESettingSlice.Reducer,
        AssetType: AssetTypeSlice.Reducer,
        DataFile: DataFileSlice.Reducer,
        Customer: CustomerSlice.Reducer,
        AssetNote: AssetNoteSlice.Reducer,
        MeterNote: MeterNoteSlice.Reducer,
        UserNote: UserNoteSlice.Reducer,
        LocationNote: LocationNoteSlice.Reducer,
        CustomerNote: CustomerNoteSlice.Reducer,
        CompanyNote: CompanyNoteSlice.Reducer,
        UserAccounts: UserAccountSlice.Reducer,
        AdditionalUserFields: UserAdditionalFieldSlice.Reducer,
        EventType: EventTypeSlice.Reducer,
        MeasurementCharacteristic: MeasurementCharacteristicSlice.Reducer,
        DataOperation: DataOperationSlice.Reducer,
        DataReader: DataReaderSlice.Reducer,
        ExternalDataBaseTable: ExternalDBTablesSlice.Reducer,
        remoteXDAInstance: RemoteXDAInstanceSlice.Reducer,
        RemoteXDAAsset: RemoteXDAAssetSlice.Reducer,
        RemoteXDAMeter: RemoteXDAMeterSlice.Reducer,
        UserAccountRemote: UserAccountSliceRemote.Reducer,
        ApplicationNode: ApplicationNodeSlice.Reducer,
        PQApplicationCategory: ApplicationCategorySlice.Reducer,
        PQApplications: PQApplicationsSlice.Reducer,
        DBCleanup: DBCleanupSlice.Reducer,
        EventChannels: EventChannelSlice.reducer,
        CustomerMeter: CustomerMeterSlice.Reducer,
        CustomerAsset: CustomerAssetSlice.Reducer,
        PQI: PQISlice,
        SourceImpedance: SourceImpedanceSlice.Reducer,
        SecurityGroup: SecurityGroupSlice.Reducer,
        WidgetCategory: WidgetCategorySlice.Reducer,
        ApplicationRole: ApplicationRoleSlice.Reducer,
        SEBrowserWidget: SEBrowserWidgetSlice.Reducer,
        SEBrowserWidgetView: SEBrowserWidgetViewSlice.Reducer,
        MagDurCurve: MagDurCurveSlice.Reducer,
        APIAccessKey: APIAccessKeySlice.Reducer,
        ExternalDatabases: ExternalDatabasesSlice.Reducer,
        AdditionalFields: AdditionalFieldsSlice.Reducer,
        ExternalOpenXDAField: ExternalXDAFieldsSlice.Reducer,
        EventTag: EventTagSlice.Reducer,
        MATLABAnalytic: MATLABAnalyticSlice.Reducer,
        MATLABAnalyticEventType: MATLABAnalyticEventTypeSlice.Reducer,
        MATLABAnalyticAssetType: MATLABAnalyticAssetTypeSlice.Reducer,
        TrendChannels: TrendChannelSlice.Reducer,
        ChannelTemplate: ChannelTemplateSlice.Reducer,
        ChannelGroupView: ChannelGroupViewSlice.Reducer,
        ValueListGroupView: ValueListGroupViewSlice.Reducer,
        Config: ConfigSlice.Reducer
    }
});
export default store;