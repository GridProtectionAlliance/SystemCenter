//******************************************************************************************************
//  ApplicationCategoryForm.tsx - Gbtc
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
//  11/16/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import { Application } from "@gpa-gemstone/application-typings";
import { Input } from "@gpa-gemstone/react-forms";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ApplicationCategorySlice } from "../Store/Store";
import { ApplicationCategory } from "./ByApplicationCategory";
interface IProps { ApplicationCat: ApplicationCategory, stateSetter: (appcat: ApplicationCategory) => void, setErrors?: (e: string[]) => void }


export default function ApplicationCategoryForm(props: IProps) {
    const dispatch = useAppDispatch();
    const acStatus = useAppSelector(ApplicationCategorySlice.Status) as Application.Types.Status;
    const allApplicationCategories: ApplicationCategory[] = useAppSelector(ApplicationCategorySlice.Data);
    const [errors, setErrors] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (acStatus == 'changed' || acStatus == 'unintiated')
            dispatch(ApplicationCategorySlice.Fetch());
    }, [])

    React.useEffect(() => {
        let e = [];
        if (props.ApplicationCat.Name != null && props.ApplicationCat.Name.length > 0 && allApplicationCategories.findIndex(s => s.Name.toLowerCase() === props.ApplicationCat.Name.toLowerCase() && s.ID !== props.ApplicationCat.ID) > -1)
            e.push('An Application Category with this name already exists.');
        setErrors(e);
    }, [props.ApplicationCat, allApplicationCategories])

    React.useEffect(() => {
        if (props.setErrors != undefined)
            props.setErrors(errors);
    }, [props.setErrors, errors])

    function Valid(field: keyof (ApplicationCategory)): boolean {
        if (field == 'Name')
            return props.ApplicationCat.Name != null && props.ApplicationCat.Name.length > 0 && props.ApplicationCat.Name.length < 200;
        if (field == 'SortOrder')
            return props.ApplicationCat.SortOrder % 1 == 0 && props.ApplicationCat.SortOrder > 0 && props.ApplicationCat.SortOrder != null;
        return false;
    }

    return (
            <div className="col">
                <Input<ApplicationCategory> Record={props.ApplicationCat} Field={'Name'} Label={'Name'} Feedback={'A unique Name is required.'} Valid={Valid} Setter={(record) => props.stateSetter(record)} />
                <Input<ApplicationCategory> Record={props.ApplicationCat} Field={'SortOrder'} Label={'Sort Order'} Feedback={'A valid Sort Order is required.'} Valid={Valid} Setter={(record) => props.stateSetter(record)} />
            </div>
        )
}