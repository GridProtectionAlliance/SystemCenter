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
import ExternalDBUpdate from '../CommonComponents/ExternalDBUpdate';
import { TabSelector, Warning, LoadingScreen } from '@gpa-gemstone/react-interactive';
import LocationImagesWindow from './LocationImages';
import LocationDrawingsWindow from './LocationDrawings';

declare var homePath: string;
type tab = 'notes' | 'locationInfo' | 'additionalFields' | 'meters' | 'assets' | 'extDB' | 'images' | 'drawings'

interface IProps { LocationID: number, Tab: tab }

function Location(props: IProps) {
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [loadDelete, setLoadDelete] = React.useState<boolean>(false);
    const [location, setLocation] = React.useState<OpenXDA.Types.Location>(null);
    const [tab, setTab] = React.useState<tab>(getTab());

    React.useEffect(() => {
        sessionStorage.setItem('Location.Tab', JSON.stringify(tab));

    }, [tab]);

    React.useEffect(() => {
        setTab(getTab());
        return () => { sessionStorage.clear(); }
    }, []);

    React.useEffect(() => {
        let handle = getLocation();
        handle.then((data: OpenXDA.Types.Location) => setLocation(data));
        return () => { if (handle != null && handle.abort != null) handle.abort(); }

    }, [props.LocationID]);

    function getTab(): tab {
        if (props.Tab != undefined) return props.Tab;
        else if (sessionStorage.hasOwnProperty('Location.Tab'))
            return JSON.parse(sessionStorage.getItem('Location.Tab'));
        else
            return 'notes';
    }

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
     
    if (location == null) return null;

    const Tabs: { Id: tab, Label: string }[] = [
        { Id: "notes", Label: "Notes" },
        { Id: "locationInfo", Label: "Substation Info" },
        { Id: "additionalFields", Label: "Additional Fields" },
        { Id: "meters", Label: "Meters" },
        { Id: "assets", Label: "Assets" },
        { Id: "extDB", Label: "External DB" },
        { Id: "images", Label: "Images" },
        { Id: "drawings", Label: "Drawings" },
    ];


    return (
        <div style={{ width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 }}>
            <div className="row">
                <div className="col">
                    <h2>{location != null ? location.Name + ' (' + location.LocationKey + ')' : ''}</h2>
                </div>
                <div className="col">
                    <button className="btn btn-danger pull-right" hidden={location == null} onClick={() => setShowDelete(true)}>Delete Substation</button>
                </div>
            </div>

            <hr />
            <TabSelector CurrentTab={tab} SetTab={(t: tab) => setTab(t)} Tabs={Tabs} />

            <div className="tab-content" style={{ maxHeight: window.innerHeight - 215, overflow: 'hidden' }}>
                <div className={"tab-pane " + (tab == "notes" ? " active" : "fade")} id="notes">
                    <NoteWindow ID={props.LocationID} Type='Location' />
                </div>
                <div className={"tab-pane " + (tab == "locationInfo" ? " active" : "fade")} id="locationInfo">
                    <LocationInfoWindow Location={location} stateSetter={(l: OpenXDA.Types.Location) => setLocation(l)} />
                </div>
                <div className={"tab-pane " + (tab == "additionalFields" ? " active" : "fade")} id="additionalFields">
                    <AdditionalFieldsWindow ID={props.LocationID} Type='Location' Tab={tab} />
                </div>
                <div className={"tab-pane " + (tab == "meters" ? " active" : "fade")} id="meters">
                    <LocationMeterWindow Location={location} />
                </div>
                <div className={"tab-pane " + (tab == "assets" ? " active" : "fade")} id="assets">
                    <LocationAssetWindow Location={location} />
                </div>
                <div className={"tab-pane " + (tab == "extDB" ? " active" : "fade")} id="extDB">
                    <ExternalDBUpdate ID={props.LocationID} Type='Location' Tab={tab} />
                </div>
                <div className={"tab-pane " + (tab == "images" ? " active" : "fade")} id="images">
                    <LocationImagesWindow Location={location} />
                </div>
                <div className={"tab-pane " + (tab == "drawings" ? " active" : "fade")} id="drawings">
                    <LocationDrawingsWindow Location={location} />
                </div>

            </div>
            <Warning Message={'This will permanently delete this Substation and cannot be undone.'} Show={showDelete} Title={'Delete Substation - ' + location.Name} CallBack={(conf) => { if (conf) deleteLocation(); setShowDelete(false); }} />
            <LoadingScreen Show={loadDelete} />
        </div>
    )
}
  

export default Location;