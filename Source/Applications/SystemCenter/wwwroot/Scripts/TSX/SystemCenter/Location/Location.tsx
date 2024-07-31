//******************************************************************************************************
//  Location.tsx - Gbtc
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
//  01/21/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { OpenXDA } from '@gpa-gemstone/application-typings'
import LocationInfoWindow from './LocationInfo';
import LocationMeterWindow from './LocationMeter';
import LocationAssetWindow from './LocationAsset';
import NoteWindow from '../CommonComponents/NoteWindow';
import AdditionalFieldsWindow from '../CommonComponents/AdditionalFieldsWindow';
import { TabSelector, Warning, LoadingScreen } from '@gpa-gemstone/react-interactive';
import LocationImagesWindow from './LocationImages';
import LocationDrawingsWindow from './LocationDrawings';
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';

declare var homePath: string;
type Tab = 'notes' | 'locationInfo' | 'additionalFields' | 'meters' | 'assets' | 'extDB' | 'images' | 'drawings'

interface IProps { LocationID: number, Tab: Tab }

function Location(props: IProps) {
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);
    const [location, setLocation] = React.useState<OpenXDA.Types.Location>(null);
    const [tab, setTab] = React.useState(getTab());
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        let handle = getLocation();
        handle.then((data: OpenXDA.Types.Location) => setLocation(data));
        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, [props.LocationID]);

    function getTab(): Tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('Location.Tab'))
            return JSON.parse(sessionStorage.getItem('Location.Tab'));
        else
            return 'notes';
    }

    React.useEffect(() => {
        const saved = getTab();
        if (saved !== tab)
            sessionStorage.setItem('Location.Tab', JSON.stringify(tab));
    }, [tab]);

    function getLocation(): JQuery.jqXHR<OpenXDA.Types.Location> {
        if(props.LocationID == undefined) return null;
        return $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Location/One/${props.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        })
    }

    function deleteLocation(): JQuery.jqXHR {
        let handle = $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Location/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(location),
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.done(() => {
            window.location.href = homePath + 'index.cshtml?name=Locations'
        })
        handle.then((d) => setLoadDelete(false))
        return handle;
    }

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }
     
    if (location == null) return null;

    const Tabs = [
        { Id: "notes", Label: "Notes" },
        { Id: "locationInfo", Label: "Substation Info" },
        { Id: "additionalFields", Label: "Additional Fields" },
        { Id: "meters", Label: "Meters" },
        { Id: "assets", Label: "Assets" },
        { Id: "images", Label: "Images" },
        { Id: "drawings", Label: "Drawings" },
    ];

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="row">
                <div className="col">
                    <h2>{location != null ? location.Name + ' (' + location.LocationKey + ')' : ''}</h2>
                </div>
                <div className="col">
                    <button className={"btn btn-danger pull-right" } hidden={(location == null) || !hasPermissions()} onClick={() => { if (hasPermissions()) setShowDelete(true) }}>Delete Substation</button>
                </div>
            </div>
            <hr />

            <TabSelector CurrentTab={tab} SetTab={(t: Tab) => setTab(t)} Tabs={Tabs} />
            <div className="tab-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: 'hidden' }}>
                {tab === 'notes' ? <NoteWindow ID={props.LocationID} Type='Location' /> : null}
                {tab === 'locationInfo' ? <LocationInfoWindow Location={location} stateSetter={(l) => setLocation(l)} /> : null}
                {tab === 'additionalFields' ? <AdditionalFieldsWindow ID={props.LocationID} Type='Location' Tab={tab} /> : null}
                {tab === 'meters' ? <LocationMeterWindow Location={location} /> : null}
                {tab === 'assets' ? <LocationAssetWindow Location={location} /> : null}
                {tab === 'images' ? <LocationImagesWindow Location={location} /> : null}
                {tab === 'drawings' ? <LocationDrawingsWindow Location={location} /> : null}
            </div>


            <Warning Message={'This will permanently delete this Substation and cannot be undone.'} Show={showDelete} Title={'Delete ' + (location?.Name ?? 'Substation')} CallBack={(conf) => { if (conf) deleteLocation(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
    )
}
  
export default Location;