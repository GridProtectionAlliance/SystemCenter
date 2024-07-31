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

import { useAppDispatch, useAppSelector } from '../hooks';
import * as React from 'react';
import { createPortal } from "react-dom";
import {Modal } from '@gpa-gemstone/react-interactive'
import {  IEventFilter } from '../global';
import {  EventTypeSlice } from '../Store';
import { TimeFilter, EventTypeFilter } from '@gpa-gemstone/common-pages';
import EventFilterButton from './EventFilterButton';
import FilterSelect from './FilterSelect';


declare var homePath;
declare var version;

interface IProps { Show: boolean, Close: () => void, Filter: IEventFilter, SetFilter: (f: IEventFilter) => void, RenderPortalId?: string }
type TimeUnit = 'y' | 'M' | 'w' | 'd' | 'h' | 'm' | 's' | 'ms'


const EventFilter = (props: IProps) => {
    const dispatch = useAppDispatch();
    const colRef = React.useRef(null);

    const [filter, setFilter] = React.useState<IEventFilter>(props.Filter);
    const [showFilter, setShowFilter] = React.useState<('Meter' | 'Asset' | 'AssetGroup' | 'Location' | 'None')>('None')
    const [height, setHeight] = React.useState<number>(0);

    const eventTypes = useAppSelector(EventTypeSlice.Data);
    const eventTypeStatus = useAppSelector(EventTypeSlice.Status);

    // Portal rendering const
    const [domReady, setDomReady] = React.useState(false);
    const portalContainer = (props.RenderPortalId === undefined || props.RenderPortalId === null) ? document.getElementById('baseEventFilterPortal') : document.getElementById(props.RenderPortalId);

    React.useLayoutEffect(() => setHeight(colRef?.current?.offsetHeight ?? 0))

    React.useEffect(() => {
        if (eventTypeStatus == 'unintiated' || eventTypeStatus == 'changed')
            dispatch(EventTypeSlice.Fetch());
    }, [eventTypeStatus]);

    React.useEffect(() => {
        if (props.Show)
            setFilter(props.Filter);
    }, [props.Show])

    React.useEffect(() => {
        setDomReady(true);
    })

    return (
        <div id='baseEventFilterPortal'>
            {domReady ? createPortal(<>
                <Modal Title={'Event Filter'}
                    Show={props.Show} ShowX={true} Size={'lg'} ShowCancel={false} ConfirmText={'Apply'} BodyStyle={{ overflow: "hidden" }}
                    CallBack={(conf, isBtn) => {
                        if (conf)
                            props.SetFilter(filter);
                        props.Close();
                    }}
                    DisableConfirm={false}
                >
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <TimeFilter filter={{ start: filter.Start, end: filter.End }} setFilter={(center: string, start: string, end: string, unit: TimeUnit, duration: number) => {
                                    setFilter((f) => ({ ...f, Start: start, End: end }));
                                }} showQuickSelect={true} timeZone={'UTC'} dateTimeSetting={'startEnd'} isHorizontal={false} />
                            </div>
                            <div className="row">
                                <div className="col-8 p-1" ref={colRef}>
                                    <EventTypeFilter SetSelectedTypeIDs={(types: number[]) => setFilter((f) => ({ ...f, EventTypes: types }))} EventTypes={eventTypes} SelectedTypeID={filter.EventTypes} Height={height} />
                                </div>
                                <div className="col-4 p-1">
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
                </div>
                </Modal>
            <FilterSelect Show={showFilter != 'None'}
                OnClose={() => setShowFilter('None')}
                Type={showFilter == 'None' ? 'Location' : showFilter}
                IDs={[]}
                OnConfirm={() => { }}
                />
            </>, portalContainer) : null}
        </div>
        )
}
export default EventFilter;