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
import UserSlice from './UserSlice';
import AdditionalUserFieldSlice from './AdditionalUserFieldSlice';
import SecurityRoleSlice from './SecurityRoleSlice';
import { PQApplications } from '../ApplicationCategory/Applications';
import { DBCleanup } from '../DB/DBCleanup';
import { ApplicationCategory } from '../ApplicationCategory/ByApplicationCategory';
import { OpenXDA as LocalXDA } from '../global'
import PQISlice from './PQISlice';


declare var homePath: string;

export const ValueListGroupSlice = new GenericSlice<SystemCenter.Types.ValueListGroup>('ValueListGroup', `${homePath}api/ValueListGroup`, 'Name');
export const ValueListSlice = new GenericSlice<SystemCenter.Types.ValueListItem>('ValueList', `${homePath}api/ValueList`, 'SortOrder');
export const LocationDrawingSlice = new GenericSlice<SystemCenter.Types.LocationDrawing>('LocationDrawing', `${homePath}api/LocationDrawing`, 'Name');

export const SystemCenterSettingSlice = new GenericSlice<SystemCenter.Types.Setting>('SystemCenterSetting', `${homePath}api/Setting`, 'Name');
export const OpenXDASettingSlice = new GenericSlice<SystemCenter.Types.Setting>('OpenXDASetting', `${homePath}api/OpenXDA/Setting`, 'Name');
export const MiMDSettingSlice = new GenericSlice<SystemCenter.Types.Setting>('MiMDSetting', `${homePath}api/MiMD/Setting`, 'Name');

export const AssetConnectionTypeSlice = new GenericSlice<OpenXDA.Types.AssetConnectionType>("AssetConnectionType", `${homePath}api/OpenXDA/AssetConnectionType`, 'Name');
export const AssetTypeSlice = new GenericSlice<OpenXDA.Types.AssetType>("AssetType", `${homePath}api/OpenXDA/AssetType`, 'Name');
export const PhaseSlice = new GenericSlice<OpenXDA.Types.Phase>("Phase", `${homePath}api/OpenXDA/Phase`, 'Name');
export const MeasurmentTypeSlice = new GenericSlice<OpenXDA.Types.MeasurementType>("MeasurementType", `${homePath}api/OpenXDA/MeasurementType`, 'Name');
export const MeasurementCharacteristicSlice = new GenericSlice<OpenXDA.Types.MeasurementCharacteristic>("MeasurementCharacteristic", `${homePath}api/OpenXDA/MeasurementCharacteristic`, 'Name');

export const DataFileSlice = new GenericSlice<OpenXDA.Types.DataFile>("DataFile", `${homePath}api/OpenXDA/DataFile`, "ProcessingEndTime", false);
export const CompanyTypeSlice = new GenericSlice<OpenXDA.Types.CompanyType>("CompanyType", `${homePath}api/OpenXDA/CompanyType`, "Name", false);
export const CustomerSlice = new GenericSlice<OpenXDA.Types.Customer>("Customer", `${homePath}api/SystemCenter/Customer`, "CustomerKey", false);
export const CustomerMeterSlice = new GenericSlice<LocalXDA.CustomerMeter>('CustomerMeter', `${homePath}api/SystemCenter/CustomerMeter`, 'MeterKey', false);
export const CustomerAssetSlice = new GenericSlice<LocalXDA.CustomerAsset>('CustomerAsset', `${homePath}api/SystemCenter/CustomerAsset`, 'AssetKey', false);


export const CompanySlice = new GenericSlice<OpenXDA.Types.Company>("Company", `${homePath}api/OpenXDA/Company`, "CompanyID", false);
export const LocationSlice = new GenericSlice<OpenXDA.Types.Location>("Location", `${homePath}api/OpenXDA/Location`, "LocationKey", true);
export const DataOperationSlice = new GenericSlice<OpenXDA.Types.DataOperation>("DataOperation", `${homePath}api/OpenXDA/DataOperation`, "LoadOrder");
export const DataReaderSlice = new GenericSlice<OpenXDA.Types.DataReader>("DataReader", `${homePath}api/OpenXDA/DataReader`, "LoadOrder");
export const ExternalDBTablesSlice = new GenericSlice<SystemCenter.Types.ExternalDataBaseTable>("ExternalDataBaseTable", `${homePath}api/OpenXDA/ExternalDBTables`, "TableName", false);
export const ApplicationNodeSlice = new GenericSlice<Application.Types.iApplicationNode>("ApplicationNode", `${homePath}api/OpenXDA/ApplicationNode`, "Name", false);
export const DBCleanupSlice = new GenericSlice<DBCleanup>("DBCleanup", `${homePath}api/OpenXDA/DBCleanup`, "ID", true);
export const ApplicationCategorySlice = new GenericSlice<ApplicationCategory>("PQApplicationCategory", `${homePath}api/OpenXDA/ApplicationCategory`, "Name", true);
export const PQApplicationsSlice = new GenericSlice<PQApplications>("PQApplications", `${homePath}api/OpenXDA/PQApplications`, "Name", true);

export const AssetGroupSlice = new GenericSlice<OpenXDA.Types.AssetGroup>("AssetGroup", `${homePath}api/OpenXDA/AssetGroup`, "Name", true);
export const ByAssetSlice = new GenericSlice<SystemCenter.Types.DetailedAsset>("ByAsset", `${homePath}api/OpenXDA/ByAsset`, "AssetName", true);
export const ByLocationSlice = new GenericSlice<SystemCenter.Types.DetailedLocation>("ByLocation", `${homePath}api/OpenXDA/ByLocation`, "LocationKey", true);
export const ByMeterSlice = new GenericSlice<SystemCenter.Types.DetailedMeter>("ByMeter", `${homePath}api/OpenXDA/ByMeter`, "Name", true);

export const AssetNoteSlice = new NoteSlice('Asset');
export const MeterNoteSlice = new NoteSlice('Meter');
export const UserNoteSlice = new NoteSlice('User');
export const LocationNoteSlice = new NoteSlice('Location');
export const CustomerNoteSlice = new NoteSlice('Customer');
export const CompanyNoteSlice = new NoteSlice('Company');
export const UserAccountSlice = new UserSlice('UserAccounts', `${homePath}api/SystemCenter/UserAccount`);
export const UserAdditionalFieldSlice = new AdditionalUserFieldSlice('AdditionalUserFields', `${homePath}api/SystemCenter`);
export const SCSecurityRoleSlice = new SecurityRoleSlice('SCSecurityRole', `${homePath}api/SystemCenter`);

export default configureStore({
    reducer: {
        CompanyType: CompanyTypeSlice.Reducer,
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
        LocationDrawing: LocationDrawingSlice.Reducer,
        SystemCenterSetting: SystemCenterSettingSlice.Reducer,
        OpenXDASetting: OpenXDASettingSlice.Reducer,
        MiMDSetting: MiMDSettingSlice.Reducer,
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
        SCSecurityRole: SCSecurityRoleSlice.Reducer,
        Company: CompanySlice.Reducer,
        MeasurementCharacteristic: MeasurementCharacteristicSlice.Reducer,
        DataOperation: DataOperationSlice.Reducer,
        DataReader: DataReaderSlice.Reducer,
        ExternalDataBaseTable: ExternalDBTablesSlice.Reducer,
        ApplicationNode: ApplicationNodeSlice.Reducer,
        PQApplicationCategory: ApplicationCategorySlice.Reducer,
        PQApplications: PQApplicationsSlice.Reducer,
        DBCleanup: DBCleanupSlice.Reducer,
        EventChannels: EventChannelSlice.reducer,
        CustomerMeter: CustomerMeterSlice.Reducer,
        CustomerAsset: CustomerAssetSlice.Reducer,
        PQI: PQISlice,
    }
});
