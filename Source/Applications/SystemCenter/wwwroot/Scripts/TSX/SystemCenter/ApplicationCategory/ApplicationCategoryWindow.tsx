//******************************************************************************************************
//  ApplicationCategoryWindow.tsx - Gbtc
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
//  11/15/2021 - Samuel Robinson
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { ApplicationCategory } from './ByApplicationCategory';
import { Input } from '@gpa-gemstone/react-forms';
import { useDispatch } from 'react-redux';
import { ApplicationCategorySlice } from '../Store/Store';

interface IProps { ApplicationCat: ApplicationCategory, stateSetter: (appcat: ApplicationCategory) => void }

export default function ApplicationCategoryWindow(props: IProps) {
    const [applicationCategory, setApplicationCategory] = React.useState<ApplicationCategory>(props.ApplicationCat);
    const dispatch = useDispatch();
    function Valid(field: keyof (ApplicationCategory)): boolean {
        if (field == 'Name')
            return props.ApplicationCat.Name != null && props.ApplicationCat.Name.length > 0 && props.ApplicationCat.Name.length < 200;
        if (field == 'SortOrder')
            return props.ApplicationCat.SortOrder % 1 == 0 && props.ApplicationCat.SortOrder > 0 && props.ApplicationCat.SortOrder != null;
        return false;
    }

    return (
        <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Application Category Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <Input<ApplicationCategory> Record={applicationCategory} Field={'Name'} Label={'Name'} Feedback={'a unique Name is required.'} Valid={Valid} Setter={setApplicationCategory} />
                </div>
                <div className="row">
                    <Input<ApplicationCategory> Record={applicationCategory} Field={'SortOrder'} Label={'SortOrder'} Feedback={'A valid SortOrder number is required.'} Valid={Valid} Setter={setApplicationCategory} />
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={() => { dispatch(ApplicationCategorySlice.DBAction({ verb: "PATCH", record: applicationCategory })); window.location.href = homePath + 'index.cshtml?name=ByApplicationCategory' }} hidden={props.ApplicationCat.ID == 0}>Update</button>
                </div>
                <div className="btn-group mr-2">
                    <button className="btn btn-default" onClick={() => props.stateSetter(props.ApplicationCat)} >Reset</button>
                </div>
            </div>
        </div> 
    )

}

