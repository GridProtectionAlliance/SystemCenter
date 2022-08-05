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

import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import {Modal } from '@gpa-gemstone/react-interactive'
import {  IEventFilter } from '../global';
import {  EventTypeSlice } from '../Store';
import { DateRangePicker } from '@gpa-gemstone/react-forms';
import EventFilterButton from './EventFilterButton';
import FilterSelect from './FilterSelect';


declare var homePath;
declare var version;

interface IProps { Show: boolean, Close: () => void, Filter: IEventFilter, SetFilter: (f: IEventFilter) => void }


const EventFilter = (props: IProps) => {
    const dispatch = useDispatch();
    const [filter, setFilter] = React.useState<IEventFilter>(props.Filter);
    const [showFilter, setShowFilter] = React.useState<('Meter' | 'Asset' | 'AssetGroup' | 'Location' | 'None')>('None')

    const eventTypes = useSelector(EventTypeSlice.Data);
    const eventTypeStatus = useSelector(EventTypeSlice.Status);

    React.useEffect(() => {
        if (eventTypeStatus == 'unintiated' || eventTypeStatus == 'changed')
            dispatch(EventTypeSlice.Fetch());
    }, [eventTypeStatus]);

    React.useEffect(() => {
        if (props.Show)
            setFilter(props.Filter);
    }, [props.Show])

    React.useEffect(() => {
        if (filter.EventTypes.length == 0 && eventTypes.length > 0)
            setFilter((f) => ({ ...f, EventTypes: eventTypes.map(e => e.ID) }));
    }, [eventTypes, filter.EventTypes]);

    return (
        <>
        <Modal Title={'Event Filter'}
            Show={props.Show} ShowX={true} Size={'lg'} ShowCancel={false} ConfirmText={'Apply'}
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
                        <fieldset className="border" style={{ padding: '10px', height: '100%', width: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large', width: '50%' }}>Time Window:</legend>
                                <div className="">
                                    <DateRangePicker<IEventFilter> Label='' Record={filter} Setter={setFilter} FromField={'Start'} ToField={'End'} Type={'datetime-local'} Valid={() => true} Format={'YYYY-MM-DDTHH:mm:ssZ'} />
                            </div>
                        </fieldset>
                    </div>
                    <div className="row">
                        <fieldset className="border" style={{ padding: '10px', height: '100%', width: '100%' }}>
                            <legend className="w-auto" style={{ fontSize: 'large', width: '50%' }}>Event Types:</legend>
                            <form>
                                    <ul style={{ listStyleType: 'none', padding: 0, width: '33%', position: 'relative', float: 'left' }}>
                                        <li> <label><input type="checkbox" onChange={() => {
                                            if (filter.EventTypes.length == eventTypes.length)
                                                setFilter((f) => ({ ...f, EventTypes: [eventTypes[0].ID] }));
                                            else
                                                setFilter((f) => ({ ...f, EventTypes: eventTypes.map(e => e.ID) }));
                                        }} checked={filter.EventTypes.length == eventTypes.length} /> All </label></li>

                                        {eventTypes.map((et, i) => (i % 3 == 1 ? <li key={et.ID}> <label><input type="checkbox" onChange={() => {
                                            if (filter.EventTypes.find((i) => i == et.ID) != null)
                                                setFilter((f) => ({ ...f, EventTypes: f.EventTypes.filter(i => i != et.ID) }));
                                            else
                                                setFilter((f) => ({ ...f, EventTypes: [...f.EventTypes, et.ID] }));
                                        }} checked={filter.EventTypes.find((i) => i == et.ID) != null} disabled={filter.EventTypes.length == 1 && filter.EventTypes.find((i) => i == et.ID) != null}
                                        /> {et.Description} </label></li> : null))}
                                </ul>
                                <ul style={{ listStyleType: 'none', padding: 0, width: '34%', position: 'relative', float: 'left' }}>
                                    {eventTypes.map((et, i) => (i % 3 == 2 ?<li key={et.ID}> <label><input type="checkbox" onChange={() => {
                                        if (filter.EventTypes.find((i) => i == et.ID) != null)
                                            setFilter((f) => ({ ...f, EventTypes: f.EventTypes.filter(i => i != et.ID) }));
                                        else
                                            setFilter((f) => ({ ...f, EventTypes: [...f.EventTypes, et.ID] }));
                                    }} checked={filter.EventTypes.find((i) => i == et.ID) != null} disabled={filter.EventTypes.length == 1 && filter.EventTypes.find((i) => i == et.ID) != null}
                                    /> {et.Description} </label></li> : null))}
                                </ul>
                                <ul style={{ listStyleType: 'none', padding: 0, width: '33%', position: 'relative', float: 'right' }}>
                                    {eventTypes.map((et, i) => (i % 3 == 0 ?<li key={et.ID}> <label><input type="checkbox" onChange={() => {
                                        if (filter.EventTypes.find((i) => i == et.ID) != null)
                                            setFilter((f) => ({ ...f, EventTypes: f.EventTypes.filter(i => i != et.ID) }));
                                        else
                                            setFilter((f) => ({ ...f, EventTypes: [...f.EventTypes, et.ID] }));
                                    }} checked={filter.EventTypes.find((i) => i == et.ID) != null} disabled={filter.EventTypes.length == 1 && filter.EventTypes.find((i) => i == et.ID) != null}
                                    /> {et.Description} </label></li> : null))}
                                </ul>
                            </form>
                        </fieldset>                      
                    </div>
                    <div className="row">
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
                IDs={[]}
                OnConfirm={() => { }}
            />
        </>
        )
}
export default EventFilter;