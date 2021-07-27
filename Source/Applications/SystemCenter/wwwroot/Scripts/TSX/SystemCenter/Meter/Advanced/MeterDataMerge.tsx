//******************************************************************************************************
//  MeterDataDelete.tsx - Gbtc
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
//  06/07/2021 - Stephen C. Wills
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '@gpa-gemstone/react-table'
import { Search, SearchBar, Warning } from '@gpa-gemstone/react-interactive';
import { OpenXDA } from '@gpa-gemstone/application-typings';

declare let homePath: string;

interface Meter {
    ID: number;
    AssetKey: string;
    Name: string;
    Location: string;
    Make: string;
    Model: string;
}

const searchColumns: Array<Search.IField<Meter>> = [
    { label: 'AssetKey', key: 'AssetKey', type: 'string', isPivotField: false },
    { label: 'Name', key: 'Name', type: 'string', isPivotField: false },
    { label: 'Location', key: 'Location', type: 'string', isPivotField: false },
    { label: 'Make', key: 'Make', type: 'string', isPivotField: false },
    { label: 'Model', key: 'Model', type: 'string', isPivotField: false },
];

export default function DataMergeWindow(props: {
    Meter: OpenXDA.Types.Meter;
    OnMerge: () => void;
}) {
    const [meters, setMeters] = React.useState<Meter[]>([]);
    const [mergeMeter, setMergeMeter] = React.useState<Meter>();

    const [search, setSearch] = React.useState<Search.IFilter<Meter>[]>([]);
    const [searchState, setSearchState] = React.useState<('Idle' | 'Loading' | 'Error')>('Idle');
    const standardSearch: Search.IField<Meter> = { label: 'Name', key: 'Name', type: 'string', isPivotField: false };

    const [sortKey, setSortKey] = React.useState<string>('AssetKey');
    const [ascending, setAscending] = React.useState<boolean>(true);

    const [showMergeWarning, setShowMergeWarning] = React.useState<boolean>(false);

    function queryMeters(): [Promise<Meter[]>, () => void] {
        setSearchState('Loading');

        const searches = search.map(filter => {
            if (!searchColumns.some(column => column.key === filter.FieldName))
                return { ...filter, isPivotColumn: true };

            return filter;
        });

        const searchQuery = {
            Searches: searches,
            OrderBy: sortKey,
            Ascending: ascending
        };

        const request = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/MeterList/SearchableList`,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(searchQuery),
            cache: false,
            async: true
        });

        const promise = (async () => {
            const jsonString: string = await request;

            // HACK: SearchableList returns a JSON string with JSON in it
            //       This is an awful hack; the API call needs to be fixed
            return JSON.parse(jsonString);
        })();

        return [promise, request.abort];
    }

    function updateMeters() {
        const [meterQuery, cancel] = queryMeters();

        (async () => {
            try {
                const queriedMeters = await meterQuery;
                const filteredMeters = queriedMeters.filter((queriedMeter) => queriedMeter.ID !== props.Meter.ID);
                setMeters(filteredMeters);
                setSearchState("Idle");
            } catch (e) {
                setSearchState("Error");
            }
        })();

        return cancel;
    }

    React.useEffect(updateMeters, [sortKey, ascending, search]);

    function handleSort(data: { colKey: string }) {
        if (data.colKey === "Scroll")
            return;

        if (data.colKey === sortKey)
            setAscending(!ascending);
        else {
            setAscending(true);
            setSortKey(data.colKey);
        }
    }

    async function mergeMeters() {
        const query = {
            fromMeterID: props.Meter.ID,
            toMeterID: mergeMeter.ID
        };

        await $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/MeterData/Merge`,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(query),
            cache: true,
            async: true
        });
    }

    function merge(confirmed: boolean) {
        setShowMergeWarning(false);

        if (!confirmed)
            return;

        (async () => {
            await mergeMeters();
            props.OnMerge();
        })();
    }

    function confirmMerge() {
        setShowMergeWarning(true);
    }

    interface Option {
        Value: string;
        Label: string;
    }

    function getEnum(setOptions: (options: Option[]) => void, field: Search.IField<Meter>) {
        const noCancel = () => { /* Nothing to cancel */ };

        if (field.type !== 'enum' || field.enum === undefined || field.enum.length !== 1)
            return noCancel;

        const valueListQuery = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: true,
            async: true
        });

        if (valueListQuery === null)
            return noCancel;

        (async () => {
            interface ValueList { ID: number; Value: string }
            const valueList: ValueList[] = await valueListQuery;

            const options = valueList.map<Option>((item) => ({
                Value: item.ID.toString(),
                Label: item.Value
            }));

            setOptions(options);
        })();

        // Cleanup function
        if (valueListQuery.abort !== null)
            return valueListQuery.abort;
    }

    const getResultNote = () => searchState !== "Error"
        ? `Found ${meters.length} Meters`
        : "Could not complete Search";

    const mergeMeterName = (mergeMeter !== undefined)
        ? mergeMeter.Name
        : "Unknown";

    const mergeMeterKey = (mergeMeter !== undefined)
        ? mergeMeter.AssetKey
        : "UnknownKey";

    return <>
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Delete Data:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div style={{ maxHeight: window.innerHeight - 450, overflowX: "hidden", overflowY: "auto" }}>
                    <SearchBar<Meter>
                        CollumnList={searchColumns}
                        SetFilter={(flds) => setSearch(flds)}
                        Direction={"left"}
                        defaultCollumn={standardSearch}
                        Width={"50%"}
                        Label={"Search"}
                        ShowLoading={searchState === "Loading"}
                        ResultNote={getResultNote()}
                        GetEnum={getEnum}
                    >
                        {" "}
                    </SearchBar>
                    
                    <Table
                        cols={[
                            { key: 'Name', field: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'AssetKey', field: 'AssetKey', label: 'Key', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                            { key: 'Location', field: 'Location', label: 'Substation', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Make', field: 'Make', label: 'Make', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Model', field: 'Model', label: 'Model', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                            { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                        ]}
                        tableClass="table table-hover"
                        data={meters}
                        sortKey={sortKey}
                        ascending={ascending}
                        onSort={handleSort}
                        onClick={(data) => setMergeMeter(data.row)}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 660, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(meter) => meter === mergeMeter}
                    />
                </div>
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className="btn btn-danger pull-right" onClick={confirmMerge} disabled={mergeMeter === undefined}>Merge Data</button>
                </div>
            </div>
        </div>
        <Warning
            Message={`Merging with ${mergeMeterName} (${mergeMeterKey}). This cannot be undone.`}
            Title={"Merging data"}
            CallBack={merge}
            Show={showMergeWarning} />
    </>;
}