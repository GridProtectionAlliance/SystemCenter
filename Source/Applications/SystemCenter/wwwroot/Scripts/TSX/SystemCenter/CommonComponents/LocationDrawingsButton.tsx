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
    const [multipleLocations, setMultipleLocations] = React.useState<boolean>(false);
    const [showDrawingsModal, setShowDrawingsModal] = React.useState<boolean>(false);
    const [locationsWithErrors, setLocationsWithErrors] = React.useState<Map<OpenXDA.Types.Location, string[]>>(new Map())
    const LocationDrawingController = new GenericController(`${homePath}api/LocationDrawing`, "Name", true);

    const isValid = (location, drawingData) => {
        let e = [];

        if (location == undefined
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
        if (props.Locations.length > 1) setMultipleLocations(true);
        else setMultipleLocations(false); // TODO: check for undefined location isValid is not doing it
        for (const location of props.Locations) {
            if (location?.ID) {
                setPageState('loading');
                LocationDrawingController.PagedSearch([], 'Name', true, 1, location.ID)
                    .done((result) => {
                        const errors = isValid(location, result);
                        updateLocationErrors(location, errors);
                        setPageState('idle')
                    })
                    .fail(() => setPageState('error'));
            }
        }
    }, [props.Locations]);

    const handleAddLocationError = (locMap: Map<OpenXDA.Types.Location, string[]>) => {
        setLocationsWithErrors(prev => {
            const newMap = new Map(prev);
            locMap.forEach((errors, loc) => {
                if (newMap.has(loc)) {
                    const existingErrors = newMap.get(loc);
                    newMap.set(loc, Array.from(new Set([...existingErrors, ...errors])));
                } else {
                    newMap.set(loc, errors);
                }
            });
            return newMap;
        });
    }

    const handleRemoveLocationError = (loc: OpenXDA.Types.Location) => {
        setLocationsWithErrors(prev => {
            const newMap = new Map(prev);
            newMap.delete(loc);
            return newMap;
        });
    }

    const updateLocationErrors = (loc: OpenXDA.Types.Location, errors: string[]) => {
        if (errors.length > 0 && loc != undefined) {
            const locationErrorsMap = new Map<OpenXDA.Types.Location, string[]>();
            locationErrorsMap.set(loc, errors);
            handleAddLocationError(locationErrorsMap);
        } else {
            handleRemoveLocationError(loc);
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
                className={locationsWithErrors.size > 0 ? "btn btn-primary disabled" : "btn btn-primary"}
                onClick={() => locationsWithErrors.size > 0 ? null : setShowDrawingsModal(true)}
                data-tooltip={"DrawingsModal"}
                onMouseEnter={() => setHover('drawings')}
                onMouseLeave={() => setHover('none')}
                >Open {props.Locations[0]?.Name} Drawings
            </button>
            <ToolTip
                Show={locationsWithErrors.size > 0 && hover === 'drawings'}
                Theme={'dark'}
                Position={'top'}
                Target={"DrawingsModal"}
                Zindex={9999}
                > {locationsWithErrors.get(props.Locations[0])?.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}
            </ToolTip>
            </>
            : <BtnDropdown
                Label={'Open ' + props.Locations[0]?.Name + ' Drawings'}
                Callback={() => handleShowDrawingsModal(props.Locations[0])}
                TooltipContent={
                    <>{locationsWithErrors.get(props.Locations[0])?.map((e, i) => <p key={i}>{CrossMark} {e}</p>)}</>
                }
                ShowToolTip={locationsWithErrors.has(props.Locations[0])}
                Disabled={locationsWithErrors.has(props.Locations[0])}
                BtnClass={'btn-primary'}
                Options={props.Locations.slice(1).map((loc, i) => ({
                    Label: 'Open ' + loc?.Name + ' Drawings',
                    Callback: () => handleShowDrawingsModal(loc),
                    Disabled: locationsWithErrors.has(loc),
                    ToolTipContent: <>{
                        locationsWithErrors.get(loc)?.map((e, i) => <p key={i}>{CrossMark} {e}</p>)
                    }</>,
                    ShowToolTip: locationsWithErrors.has(loc),
                    ToolTipLocation: "left",
                    Key: i
                }))}
            />
            }
            <LocationDrawingsModal
                LocationID={selectedLocation?.ID}
                Show={showDrawingsModal}
                SetShow={setShowDrawingsModal}
            />
        </div>
    );
};

export default LocationDrawingsButton;