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
import { BtnDropdown, GenericController, LoadingScreen, ServerErrorIcon, ToolTip } from '@gpa-gemstone/react-interactive';
import LocationDrawingsModal from './LocationDrawingsModal';
import { OpenXDA } from '@gpa-gemstone/application-typings';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';

interface LocationDrawingsButtonProps {
    Locations: OpenXDA.Types.Location[];
}

const LocationDrawingsButton: React.FC<LocationDrawingsButtonProps> = (props) => {
    const [hover, setHover] = React.useState<'none' | 'drawings'>('none');
    const [pageState, setPageState] = React.useState<"loading" | "error" | "idle">("idle");
    const [selectedLocation, setSelectedLocation] = React.useState<OpenXDA.Types.Location>();
    const multipleLocations = React.useMemo(() => props.Locations.length > 1, [props.Locations]);
    const [showDrawingsModal, setShowDrawingsModal] = React.useState<boolean>(false);
    const [locationsWithErrors, setLocationsWithErrors] = React.useState<Map<number, string[]>>(new Map())
    const LocationDrawingController = new GenericController(`${homePath}api/LocationDrawing`, "Name", true);

    const isValid = (location: OpenXDA.Types.Location, drawingData) => {
        let e = [];

        if (!location
            || (location.Alias == ""
                && location.Description == ""
                && location.ID == 0
                && location.Latitude == null
                && location.LocationKey == ""
                && location.Longitude == null
                && location.Name == ""))
            e.push('No locations have been set.');
        else if (drawingData.TotalRecords == 0)
            e.push('No drawings associated with location.');
        return e;
    }

    React.useEffect(() => { // Generates the map of errors for each location
        setPageState('loading');

        const handles = props.Locations.map(location => {
            if (location != null) {
                const handle = LocationDrawingController.PagedSearch([], 'Name', true, 1, location.ID)
                    .done((result) => {
                        const errors = isValid(location, result);
                        updateLocationErrors(location, errors);
                    })
                    .fail(() => { throw new Error() });
                return handle;
            }
            return null; // invalid location
        }).filter(handle => handle != null);

        Promise.all(handles)
            .then(() => {
                setPageState('idle');
            },
            () => {
                setPageState('error')
            });

        return () => {
            handles.forEach(handle => {
                return () => { if (handle != null && handle?.abort != null) handle.abort(); }
            })
        };
    }, [props.Locations]);

    const handleAddLocationError = (locMap: Map<number, string[]>) => {
        setLocationsWithErrors(prev => {
            const newMap = new Map(prev);
            locMap.forEach((errors, locID) => {
                if (newMap.has(locID)) {  // If the location already has errors
                    const existingErrors = newMap.get(locID);
                    newMap.set(locID, Array.from(new Set([...existingErrors, ...errors]))); // supresses duplicate values
                } else { // otherwise add new
                    newMap.set(locID, errors);
                }
            });
            return newMap;
        });
    }

    const handleRemoveLocationError = (locID: number) => {
        setLocationsWithErrors(prev => {
            const newMap = new Map(prev);
            newMap.delete(locID);
            return newMap;
        });
    }

    const updateLocationErrors = (loc: OpenXDA.Types.Location, errors: string[]) => {
        if (locationsWithErrors.has(loc?.ID)                             // Remove if the location has
            && locationsWithErrors.get(loc?.ID).length > errors.length) {// fewer errors than before
            handleRemoveLocationError(loc.ID);
        } else if (errors.length > 0) {
            const locationErrorsMap = new Map<number, string[]>();
            locationErrorsMap.set(loc?.ID, errors);
            handleAddLocationError(locationErrorsMap);
        }
    }

    const handleShowDrawingsModal = (loc) => {
        if (loc == undefined) return;
        setSelectedLocation(loc);
        setShowDrawingsModal(true);
    };

    return (
        <div>
            <LoadingScreen Show={pageState == 'loading'} />
            <ServerErrorIcon Show={pageState == 'error'} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
            {!multipleLocations
            ? <>
            <button
                className={locationsWithErrors.has(props.Locations[0]?.ID) ? "btn btn-primary disabled" : "btn btn-primary"}
                onClick={() => locationsWithErrors.has(props.Locations[0]?.ID) ? null : handleShowDrawingsModal(props.Locations[0])}
                data-tooltip={"DrawingsModal"}
                onMouseEnter={() => setHover('drawings')}
                onMouseLeave={() => setHover('none')}
                >Open {props.Locations[0]?.Name} Drawings
            </button>
            <ToolTip
                Show={locationsWithErrors.has(props.Locations[0]?.ID) && hover === 'drawings'}
                Theme={'dark'}
                Position={'top'}
                Target={"DrawingsModal"}
                Zindex={9999}
                > {locationsWithErrors.get(props.Locations[0]?.ID)?.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
            </ToolTip>
            </>
            : <BtnDropdown
                Label={'Open ' + props.Locations[0]?.Name + ' Drawings'}
                Callback={() => handleShowDrawingsModal(props.Locations[0])}
                TooltipContent={
                    <>{locationsWithErrors.get(props.Locations[0]?.ID)?.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}</>
                }
                ShowToolTip={locationsWithErrors.has(props.Locations[0]?.ID)}
                Disabled={locationsWithErrors.has(props.Locations[0]?.ID)}
                BtnClass={'btn-primary'}
                Options={props.Locations.slice(1).map((loc, i) => ({
                    Label: 'Open ' + loc?.Name + ' Drawings',
                    Callback: () => handleShowDrawingsModal(loc),
                    Disabled: locationsWithErrors.has(loc?.ID),
                    ToolTipContent: <>{
                        locationsWithErrors.get(loc?.ID)?.map((e, i) => <p key={i}>{CrossMark} {e}</p>)
                    }</>,
                    ShowToolTip: locationsWithErrors.has(loc?.ID),
                    ToolTipLocation: "left",
                    Key: i
                }))}
            />
            }
            <LocationDrawingsModal
                Location={selectedLocation}
                Show={showDrawingsModal}
                SetShow={setShowDrawingsModal}
            />
        </div>
    );
};

export default LocationDrawingsButton;