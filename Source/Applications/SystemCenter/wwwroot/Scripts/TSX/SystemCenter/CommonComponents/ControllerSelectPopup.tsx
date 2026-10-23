// ******************************************************************************************************
//  ControllerSelectPopup.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  08/12/2026 - Natalie Beatty
//       Generated original version of source code.
// ******************************************************************************************************

import { Table, Column, FilterableColumn, ConfigurableColumn } from "@gpa-gemstone/react-table";
import * as React from 'react';
import { Modal, GenericController, Search } from "@gpa-gemstone/react-interactive";
import * as _ from "lodash";
import { ReactIcons } from "@gpa-gemstone/gpa-symbols";
import { useStringMemonization } from '@gpa-gemstone/helper-functions';

interface IProps<T> {
    Controller: GenericController<T>,
    PrimaryKey: keyof T,
    Selection: T[],
    OnClose: (selected: T[], conf: boolean) => void
    Show: boolean,
    Searchbar: (children: React.ReactNode, setFilters: (filters: Search.IFilter<T>[]) => void) => React.ReactNode,
    Type?: 'single' | 'multiple',
    Title: string,
    MinSelection?: number,
    children?: React.ReactNode,
    DisableConfirm?: boolean
    Filters?: Search.IFilter<T>[]
    BaseFilters?: Search.IFilter<T>[]
}

export default function ControllerSelectPopup<T>({ Controller, PrimaryKey, Selection, OnClose, Show, Searchbar, Type, Title, MinSelection, children, DisableConfirm, Filters, BaseFilters }: IProps<T>) {
    const [searchFilters, setSearchFilters] = React.useState<Search.IFilter<T>[]>(Filters ?? []);
    const [sortField, setSortField] = React.useState<keyof T>(PrimaryKey)
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [data, setData] = React.useState<T[]>([]);
    const [selectedData, setSelectedData] = React.useState<T[]>(Selection);

    const [sortKeySelected, setSortKeySelected] = React.useState<string>('');
    const [ascendingSelected, setAscendingSelected] = React.useState<boolean>(false);
    const baseFilters = useStringMemonization<Search.IFilter<T>[] | undefined>(BaseFilters);

    const filters = React.useMemo(() => {
        if (baseFilters != null) return [...baseFilters, ...searchFilters];
        return searchFilters;
    }, [searchFilters, baseFilters])

    React.useEffect(() => {
        const handle = Controller.DBSearch(filters, sortField, ascending);
        handle.done((d) => setData(d));
        return () => { if (handle != null && handle.abort != null) handle.abort() }
    }, [Controller, ascending, sortField, filters])

    React.useEffect(() => {
        setSelectedData(Selection);
    }, [Selection])

    function AddCurrentList() {
        const updatedData = selectedData.concat(data);
        setSelectedData(_.uniqBy(updatedData, (d) => d[PrimaryKey]));
    }

    return (<>
        <Modal
            Show={Show}
            Title={Title}
            ShowX={true}
            Size={'xlg'}
            CallBack={(conf) => OnClose(selectedData, conf)}
            DisableConfirm={MinSelection !== undefined && selectedData.length < MinSelection || (DisableConfirm ?? false)}
            ConfirmShowToolTip={MinSelection !== undefined && selectedData.length < MinSelection}
            ConfirmToolTipContent={<p><ReactIcons.CrossMark /> At least {MinSelection} items must be selected. </p>}
        >
            <div className="row">
                <div className="col">
                    {Searchbar(
                        <>
                            {Type === 'multiple' ? <li className="nav-item" style={{ width: '20%', paddingRight: 10 }}>
                                <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                                    <legend className="w-auto" style={{ fontSize: 'large' }}>Quick Selects:</legend>
                                    <form>
                                        <div className="form-group">
                                            <div className="btn btn-primary" onClick={(event) => { event.preventDefault(); AddCurrentList(); }}>Add Current List to Selection</div>
                                        </div>
                                        <div className="form-group">
                                            <div className="btn btn-danger" onClick={(event) => { event.preventDefault(); setSelectedData([]) }}>Remove All</div>
                                        </div>
                                    </form>
                                </fieldset>
                            </li> : null}
                            {React.Children.map(children, (e) => {
                                if (React.isValidElement(e)) {
                                    if (((e as React.ReactElement).type === FilterableColumn) ||
                                        ((e as React.ReactElement).type === Column) ||
                                        ((e as React.ReactElement).type === ConfigurableColumn)
                                    ) return null;
                                    return e;
                                }
                                return null;
                            })}
                        </>, setSearchFilters
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col" style={{ width: (Type === undefined || Type === 'single' ? '100%' : '60%') }}>
                    <Table<T>
                        TableClass="table table-hover"
                        Data={data}
                        SortKey={sortField as string}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === "Scroll")
                                return;
                            if (d.colKey === sortField)
                                setAscending(asc => !asc);
                            else {
                                setSortField(d.colKey as keyof T)
                                setAscending(true);
                            }
                        }}
                        OnClick={(d) => {
                            if (Type === undefined || Type === 'single')
                                setSelectedData([d.row])
                            else
                                setSelectedData((s) => [...s.filter(item => item[PrimaryKey] !== d.row[PrimaryKey]), d.row])
                        }}
                        Selected={(item) => selectedData.findIndex(d => d[PrimaryKey] === item[PrimaryKey]) > -1}
                        KeySelector={item => item[PrimaryKey] as string|number}
                    >
                        {children}
                    </Table>
                </div>
                {Type === 'multiple' ? <div className="col" style={{ width: '40%' }}>
                    <div style={{ width: '100%' }}>
                        <h3> Current Selection </h3>
                    </div>
                    <Table<T>
                        TableClass="table table-hover"
                        Data={selectedData}
                        SortKey={sortKeySelected}
                        Ascending={ascendingSelected}
                        OnSort={(d) => {
                            if (d.colKey === sortKeySelected) {
                                const ordered = _.orderBy<T[]>(selectedData, [d.colKey], [(!ascendingSelected ? "asc" : "desc")]) as T[];
                                setAscendingSelected(!ascendingSelected);
                                setSelectedData(ordered);
                            }
                            else {
                                const ordered = _.orderBy(selectedData, [d.colKey], ["asc"]) as T[];
                                setAscendingSelected(!ascendingSelected);
                                setSelectedData(ordered);
                                setSortKeySelected(d.colKey);
                            }
                        }}
                        OnClick={(d) => setSelectedData([...selectedData.filter(item => item[PrimaryKey] !== d.row[PrimaryKey])])}
                        Selected={() => false}
                        KeySelector={item => item[PrimaryKey] as string|number}
                    >
                        {children}
                    </Table>
                </div> : null}
            </div>
        </Modal>
    </>)
}