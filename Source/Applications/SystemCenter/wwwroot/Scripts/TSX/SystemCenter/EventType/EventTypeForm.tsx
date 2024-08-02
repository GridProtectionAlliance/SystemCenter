//******************************************************************************************************
//  EventTypeForm.tsx - Gbtc
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

import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Input, CheckBox, TextArea } from '@gpa-gemstone/react-forms';
import { AssetTypeSlice, EventTypeAssetTypeSlice, EventTypeSlice  } from '../Store/Store';
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';

interface IProps {
    Record: OpenXDA.Types.EventType,
    Setter: (record: OpenXDA.Types.EventType) => void,
    setErrors?: (e: string[]) => void,
    setAssetTypeETs: (records: OpenXDA.Types.EventTypeAssetType[]) => void
}

export default function EventTypeForm(props: IProps) {

    const dispatch = useAppDispatch();
    const assetTypes = useAppSelector(AssetTypeSlice.Data) as OpenXDA.Types.AssetType[];

    const eventTypeAssetTypeData = useAppSelector(EventTypeAssetTypeSlice.Data);
    const eventTypeAssettypeParentID = useAppSelector(EventTypeAssetTypeSlice.ParentID);
    const [etAt, setETAT] = React.useState<OpenXDA.Types.EventTypeAssetType[]>([]);

    const atStatus = useAppSelector(AssetTypeSlice.Status) as Application.Types.Status;
    const atetStatus = useAppSelector(EventTypeAssetTypeSlice.Status) as Application.Types.Status;

    React.useEffect(() => {
        let e = [];
        if (props.Record.Category != null && props.Record.Category.length > 50)
            e.push('Category must be less than 50 characters.');
        if (props.Record.Description == null || props.Record.Description.length > 50)
            e.push('A Label of less than 50 characters is required.')
               
        if (props.setErrors != undefined)
            props.setErrors(e);
    }, [props.Record]);

    React.useEffect(() => {
        if (atetStatus == 'unintiated' || atetStatus == 'changed' || eventTypeAssettypeParentID != props.Record?.ID)
            dispatch(EventTypeAssetTypeSlice.Fetch(props.Record?.ID));
    }, [atetStatus, props.Record]);

    React.useEffect(() => {
        if (atStatus == 'unintiated' || atStatus == 'changed')
            dispatch(AssetTypeSlice.Fetch());
    }, [atStatus]);

    React.useEffect(() => {
        setETAT(eventTypeAssetTypeData);
    }, [eventTypeAssetTypeData])

    React.useEffect(() => { props.setAssetTypeETs(etAt); }, [etAt])


    function Valid(field: keyof (OpenXDA.Types.EventType)): boolean {
        if (field == 'Category')
            return props.Record.Category == null || props.Record.Category.length <= 50;
        else if (field == 'Description')
            return props.Record.Description != null && props.Record.Description.length <= 50;
        return true;
    }

    function getFormRightSide(name: string) {
        let jsx =
        <fieldset className="border" style={{ padding: '10px' }}>
            <legend className="w-auto" style={{ fontSize: 'large' }}>
                Event Type valid for:
            </legend>
            <form>
                <ul style={{ listStyleType: 'none', padding: 0, position: 'relative', float: 'left' }}>
                    {assetTypes.map((item) => (
                        <li key={item.ID}>
                            <label>
                                <input type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setETAT((d) => [...d, { ID: 0, AssetTypeID: item.ID, EventTypeID: props.Record.ID }])
                                        else
                                            setETAT((d) => d.filter(t => t.AssetTypeID != item.ID))
                                    }} checked={etAt.find(i => i.AssetTypeID == item.ID) != null} />
                                {item.Description}
                            </label>
                        </li>
                    ))}
                </ul>
            </form>
        </fieldset>;

        if (name === 'Test') {
            jsx =
            <div className="alert alert-primary block">
                Any event recorded by a Meter in an active Maintenance Window will be classified as Test.
            </div>
        } 
        if (name === 'Other') {
            <div className="alert alert-primary block">
                Any event that cannot be identified will be recorded as Other.
            </div>
        }
        return jsx;
    }

    return (
        <div className="row" style={{ height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' }}>
            <div className="col">
                <Input<OpenXDA.Types.EventType> Record={props.Record} Field={'Name'} Label={'Name'} Disabled={true} Help={'Name cannot be changed. To change what is displayed in various visualization apps, use Label.'} Valid={() => true} Setter={() => { } } />
                <Input<OpenXDA.Types.EventType> Record={props.Record} Field={'Category'} Label={'Category'} Feedback={'Category must be less than 50 characters.'} Valid={Valid} Setter={props.Setter} />
                <Input<OpenXDA.Types.EventType> Label={'Label'} Record={props.Record} Field={'Description'} Valid={Valid} Setter={props.Setter} Feedback={'A Label of less than 50 characters is required.'} />
                <CheckBox<OpenXDA.Types.EventType> Label={'Show in User Interfaces'} Record={props.Record} Field={'ShowInFilter'} Setter={props.Setter} />
            </div>
            <div className="col">
                {getFormRightSide(props.Record.Name)}
            </div>
        </div>
    );
}