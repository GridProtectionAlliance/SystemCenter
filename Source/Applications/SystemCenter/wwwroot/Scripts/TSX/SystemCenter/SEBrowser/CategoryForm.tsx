//******************************************************************************************************
//  CategoryForm.tsx - Gbtc
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
//  03/15/2023 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings'
import { useAppSelector, useAppDispatch } from '../hooks';
import { CustomerSlice, WidgetCategorySlice } from '../Store/Store';
import { Input, Select, TextArea, CheckBox } from '@gpa-gemstone/react-forms';
import { OpenXDA as LocalXDA } from '../global';
import { IsNumber } from '@gpa-gemstone/helper-functions';

declare var homePath: string;

interface IProps { Category: LocalXDA.IWidgetCategory, stateSetter: (tab: LocalXDA.IWidgetCategory) => void, setErrors?: (e: string[]) => void }


export default function CategoryForm(props: IProps) {
    const dispatch = useAppDispatch();

    const [errors, setErrors] = React.useState<string[]>([]);
    const allTabs = useAppSelector(WidgetCategorySlice.Data) as LocalXDA.IWidgetCategory[];
    const acStatus = useAppSelector(WidgetCategorySlice.Status) as Application.Types.Status;

  
    React.useEffect(() => {
        if (acStatus == 'changed' || acStatus == 'uninitiated')
            dispatch(WidgetCategorySlice.Fetch());
    }, [acStatus])

    
    React.useEffect(() => {
        let e = [];
        if (props.Category.Name == null || props.Category.Name.length == 0)
            e.push('A Name is required.')
        if (props.Category.OrderBy != null && !IsNumber(props.Category.OrderBy))
            e.push('A valid Order By is required.')
        if (allTabs.findIndex(c => c.Name == props.Category.Name && c.ID != props.Category.ID) > -1)
            e.push('A Tab with this Name already exists.')
       
        setErrors(e);
    }, [props.Category, allTabs])

    React.useEffect(() => {
        if (props.setErrors != undefined)
            props.setErrors(errors);
    }, [props.setErrors, errors])

    function valid(field: keyof (LocalXDA.IWidgetCategory)): boolean {
        if (field == 'Name')
            return props.Category.Name != null && props.Category.Name.length > 0 && props.Category.Name.length <= 30;
        else if (field == 'OrderBy')
            return props.Category.OrderBy != null && IsNumber(props.Category.OrderBy);
        return true;
    }

    
    return (
        <div className="col">
            <Input<LocalXDA.IWidgetCategory> Record={props.Category} Field={'Name'} Label='Name' Feedback={'A unique Name is required.'} Valid={valid} Setter={(record) => props.stateSetter(record)} />
            <Input<LocalXDA.IWidgetCategory> Record={props.Category} Field={'OrderBy'} Label='Order By' Feedback={'Order By must be a numeric value.'} Valid={valid} Setter={(record) => props.stateSetter(record)} />
        </div>
    )

}
