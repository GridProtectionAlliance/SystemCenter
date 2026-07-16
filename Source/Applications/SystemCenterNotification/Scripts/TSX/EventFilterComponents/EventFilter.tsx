//******************************************************************************************************
//  EventFilter.tsx - Gbtc
//
//  Copyright © 2022, Grid Protection Alliance.  All Rights Reserved.
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
//  07/26/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { createPortal } from "react-dom";
import { Application, OpenXDA } from '@gpa-gemstone/application-typings';
import { TimeFilter, EventTypeFilter } from '@gpa-gemstone/common-pages';
import { GenericController, Modal } from '@gpa-gemstone/react-interactive';
import EventFilterButton from './EventFilterButton';
import FilterSelect from './FilterSelect';
import { IEventFilter } from '../global';


declare var homePath;
declare var version;

interface IProps { Show: boolean, Close: () => void, Filter: IEventFilter, SetFilter: (f: IEventFilter) => void, RenderPortalId?: string }
type TimeUnit = 'y' | 'M' | 'w' | 'd' | 'h' | 'm' | 's' | 'ms'
type filterTypes = 'Meter' | 'Asset' | 'AssetGroup' | 'Location' | 'None'

const EventFilter = (props: IProps) => {
    const [filter, setFilter] = React.useState<IEventFilter>(props.Filter);
    const [showFilter, setShowFilter] = React.useState<filterTypes>('None')

    const [eventTypes, setEventTypes] = React.useState<OpenXDA.Types.EventType[]>([]);
    const [eventTypeStatus, setEventTypeStatus] = React.useState<Application.Types.Status>('uninitiated');

    // Portal rendering const
    const [domReady, setDomReady] = React.useState(false);
    const portalContainer = (props.RenderPortalId === undefined || props.RenderPortalId === null) ? document.getElementById('baseEventFilterPortal') : document.getElementById(props.RenderPortalId);

    const eventTypeController = React.useMemo(() => new GenericController(`${homePath}api/EventType`, 'Name'), [])

    React.useEffect(() => {
        setEventTypeStatus('loading');

        const h = eventTypeController.Fetch();
        h.done((d) => {
            setEventTypes(d);
            setEventTypeStatus('idle');
        })
        h.fail(() => setEventTypeStatus('error'))

        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [eventTypeController.Fetch]);

    React.useEffect(() => {
        if (props.Show)
            setFilter((f) => ({ ...filter, EventTypes: f.EventTypes }));
    }, [props.Show])

    React.useEffect(() => {
        if (filter.EventTypes.length == 0 && eventTypes.length > 0)
            setFilter((f) => ({ ...f, EventTypes: eventTypes.map(e => e.ID) }));
    }, [eventTypes]);

    React.useEffect(() => {
        setDomReady(true);
    })


    function setIDs(type: filterTypes, ids: number[]) {
        switch (type) {
            case 'Asset':
                setFilter((f) => ({ ...filter, AssetIDs: ids }))
                break
            case 'AssetGroup':
                setFilter((f) => ({ ...filter, GroupIDs: ids }))
                break
            case 'Meter':
                setFilter((f) => ({ ...filter, MeterIDs: ids }))
                break
            case 'Location':
                setFilter((f) => ({ ...filter, SubstationIDs: ids }))
                break
            case 'None':
                break
        }
    }

    function getIDs(type: filterTypes): number[] {
        switch (type) {
            case 'Asset':
                return filter.AssetIDs
            case 'AssetGroup':
                return filter.GroupIDs
            case 'Meter':
                return filter.MeterIDs
            case 'Location':
                return filter.SubstationIDs
            case 'None':
                return []
        }
    }

    return (
        <div id='baseEventFilterPortal'>
            {domReady ? createPortal(<>
                <Modal Title={'Event Filter'}
                    Show={props.Show} ShowX={true} Size={'lg'} ShowCancel={false} ConfirmText={'Apply'} BodyStyle={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto', overflowX: 'hidden' }}
                    CallBack={(conf, isBtn) => {
                        if (conf)
                            props.SetFilter(filter);
                        props.Close();
                    }}
                    DisableConfirm={false}
                >
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <TimeFilter filter={{ start: filter.Start, end: filter.End }} setFilter={(start: string, end: string, unit: TimeUnit, duration: number) => {
                                    setFilter((f) => ({ ...f, Start: start, End: end }));
                                }} showQuickSelect={true} timeZone={'UTC'} dateTimeSetting={'startEnd'} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <EventTypeFilter SetSelectedTypeIDs={(types: number[]) => setFilter((f) => ({ ...f, EventTypes: types }))} EventTypes={eventTypes}
                                    SelectedTypeID={filter.EventTypes} />
                            </div>
                            <div className="col-4">
                                <fieldset className="border" style={{ padding: '10px', height: '100%', width: '100%' }}>
                                    <legend className="w-auto" style={{ fontSize: 'large', width: '50%' }}>Other Filters:</legend>
                                    <div className={"row"}>
                                        <div className={'col'}>
                                            <EventFilterButton Type={'Meter'} OnClick={() => setShowFilter('Meter')} IDs={filter.MeterIDs} />
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={'col'}>
                                            <EventFilterButton Type={'Asset'} OnClick={() => setShowFilter('Asset')} IDs={filter.AssetIDs} />
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={'col'}>
                                            <EventFilterButton Type={'AssetGroup'} OnClick={() => setShowFilter('AssetGroup')} IDs={filter.GroupIDs} />
                                        </div>
                                    </div>
                                    <div className={"row"}>
                                        <div className={'col'}>
                                            <EventFilterButton Type={'Location'} OnClick={() => setShowFilter('Location')} IDs={filter.SubstationIDs} />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Modal>
                <FilterSelect Show={showFilter != 'None'}
                    OnClose={() => setShowFilter('None')}
                    Type={showFilter == 'None' ? 'Location' : showFilter}
                    IDs={getIDs(showFilter)}
                    OnConfirm={(ids) => { setIDs(showFilter, ids) }}
                />
            </>, portalContainer) : null}
        </div>
    )
}
export default EventFilter;