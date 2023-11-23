//******************************************************************************************************
//  TargetSelection.tsx - Gbtc
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
//  11/23/2023 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { Select, CheckBox } from '@gpa-gemstone/react-forms';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ByAssetSlice, ByLocationSlice, ByMeterSlice, CustomerSlice } from '../../Store/Store';
import { OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';
import FilterSelect from '../../CommonComponents/FilterSelect';

interface IProps {
    SetSelectedID: (id: number | undefined) => void;
    OnBack: () => void;
    Table: string;
}

export type RecordTypes = SystemCenter.Types.DetailedMeter | SystemCenter.Types.DetailedAsset | OpenXDA.Types.Customer | SystemCenter.Types.DetailedLocation;

export default function TargetSelection(props: IProps) {
    const storageID = "ExternalDB_QueryTestDialog";

    const filterType = React.useMemo(() => {
        switch (props.Table) {
            case "Meter": case "Location": case "Customer": case "Asset":
                localStorage.removeItem(storageID);
                return props.Table;
            default:
                localStorage.setItem(storageID, JSON.stringify([{
                    FieldName: "AssetType",
                    SearchText: `(${props.Table.replace(/\s/g, "")})`,
                    Operator: "IN",
                    Type: "enum",
                    isPivotColumn: false
                }]));
                return 'Asset';
        }
    }, [props.Table]);

    return (
        <>
            <FilterSelect OnCloseFunction={(set, confirmed) => { if (!confirmed) props.OnBack(); else props.SetSelectedID(set[0]) }} Selected={new Set<number>()}
                ShowModal={true} Type={filterType} Single={true} StorageID={storageID} Title='Select Record' />
        </>
    );
   
}
