//******************************************************************************************************
//  LocationDrawings.tsx - Gbtc
//
//  Copyright © 2024, Grid Protection Alliance.  All Rights Reserved.
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
//  01/06/2024 - Collins Self
//       Generated original version of source code.
//
//******************************************************************************************************
import React from 'react';
import { BtnDropdown, GenericController, LoadingScreen, Modal, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import LocationDrawingsTable from '../Location/LocationDrawingsTable';

const LocationDrawingController = new GenericController(`${homePath}api/LocationDrawing`, "Name", true);
interface LocationDrawingsButtonProps {
    Locations: OpenXDA.Types.Location[];
    IsLoadingLocations?: boolean;
}

type DropDownOption = {
    Label: JSX.Element | string,
    Callback: () => void,
    Disabled: boolean
    ToolTipContent: JSX.Element,
    ShowToolTip: boolean,
    ToolTipLocation: ('top' | 'bottom' | 'left' | 'right'),
    Key: string | number
}

const isValid = (location: OpenXDA.Types.Location, drawingData) => {
    let e = "";

    if (location == null
        || (location.Alias === ""
            && location.Description === ""
            && location.ID === 0
            && location.Latitude == null
            && location.LocationKey === ""
            && location.Longitude == null
            && location.Name === ""))
        e = 'No location(s) have been set.';
    else if (drawingData.length == 0)
        e = 'No drawing(s) associated with location.';
    return e;
}

const LocationDrawingsButton: React.FC<LocationDrawingsButtonProps> = (props) => {
    const [hover, setHover] = React.useState<'none' | 'drawings'>('none');
    const [pageState, setPageState] = React.useState<"loading" | "error" | "idle">("idle");
    const [selectedLocation, setSelectedLocation] = React.useState<OpenXDA.Types.Location>();
    const multipleLocations = React.useMemo(() => props.Locations.length > 1, [props.Locations]);
    const [showDrawingsModal, setShowDrawingsModal] = React.useState<boolean>(false);
    const [locationOptions, setLocationOptions] = React.useState<DropDownOption[]>([]);

    React.useEffect(() => { // Generates the map of errors for each location
        setPageState('loading');
        setLocationOptions([]);

        const handles = props.Locations.map((location, i) => {
            if (location == null)
                return null;
            const handle = LocationDrawingController.DBSearch([], 'Name', true, location.ID)
                .done((result) => {
                    const error = isValid(location, result);
                    const option: DropDownOption = {
                        Label: location.Name,
                        Callback: () => handleShowDrawingsModal(location),
                        Disabled: error != "",
                        ToolTipContent: <p>{error}</p>,
                        ShowToolTip: error != "",
                        ToolTipLocation: "left",
                        Key: i
                    };
                    setLocationOptions(prev => [...prev, option]);
                })
                .fail(() => { throw new Error() });
            return handle;
        }).filter(handle => handle != null);

        Promise.all(handles)
            .then(() => setPageState('idle'),
                () => setPageState('error'));

        return () => handles.forEach(handle => () => { if (handle != null && handle?.abort != null) handle.abort() });
    }, [props.Locations]);

    const handleShowDrawingsModal = (loc) => {
        if (loc == undefined) return;
        setSelectedLocation(loc);
        setShowDrawingsModal(true);
    };

    return (
        <div>
            <LoadingScreen Show={pageState == 'loading' || props.IsLoadingLocations == true} />
            <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
            {!multipleLocations
            ? <>
            <button
                className={locationOptions[0]?.Disabled ? "btn btn-primary disabled" : "btn btn-primary"}
                onClick={() => locationOptions[0]?.Disabled ? null : handleShowDrawingsModal(props.Locations[0])}
                data-tooltip={"DrawingsModal"}
                onMouseEnter={() => setHover('drawings')}
                onMouseLeave={() => setHover('none')}
                >Open {props.Locations[0]?.Name} Drawings
            </button>
            <ToolTip
                Show={locationOptions[0]?.Disabled && hover === 'drawings'}
                Theme={'dark'}
                Position={'top'}
                Target={"DrawingsModal"}
                Zindex={9999}
                    ><p>{CrossMark} {locationOptions[0]?.ToolTipContent}</p>
            </ToolTip>
            </>
            : <BtnDropdown
                Label={'Open ' + props.Locations[0]?.Name + ' Drawings'}
                Callback={() => handleShowDrawingsModal(props.Locations[0])}
                TooltipContent={
                    <p>{CrossMark} {locationOptions[0]?.Disabled}</p>
                }
                ShowToolTip={locationOptions[0]?.ShowToolTip}
                Disabled={locationOptions[0]?.Disabled}
                BtnClass={'btn-primary'}
                Options={locationOptions.slice(1)}
            />
            }
            <Modal
                Show={showDrawingsModal}
                Title={'Drawings for ' + selectedLocation?.Name}
                ShowX={true} Size={'lg'}
                CallBack={() => setShowDrawingsModal(false)}
                ShowCancel={false}
                ShowConfirm={false}>
                <div className="row">
                    <div className="col-12">
                        <LocationDrawingsTable
                            LocationID={selectedLocation?.ID}
                            RefreshDrawings={0}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LocationDrawingsButton;