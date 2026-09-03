//******************************************************************************************************
//  ControllerSelects.tsx - Gbtc
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
//  07/15/2026 - N. Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import _ from "lodash";
import * as React from 'react';
import { Application } from '@gpa-gemstone/application-typings';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { GenericController, Modal, Search } from '@gpa-gemstone/react-interactive';
import { Column, ConfigurableColumn, FilterableColumn, Paging, Table } from '@gpa-gemstone/react-table';

interface IProps<T> {
    Controller: GenericController<T>,
    Show: boolean,
    Title: string,
    Selection: T[],
    PrimaryKey: keyof T,
    OnClose: (selected: T[], conf: boolean) => void,
    Searchbar: (children: React.ReactNode, SetFilter: (filters: Search.IFilter<T>[]) => void, SearchStatus: Application.Types.Status, ResultCount: number) => React.ReactNode,
    MinSelection: number,
    Type?: 'single' | 'multiple',
    DefaultSortField: keyof T,
    children?: React.ReactNode
}

export const ControllerSelects = <T,>(props: IProps<T>) => {
    const [data, setData] = React.useState<T[]>([]);
    const [filters, setFilters] = React.useState<Search.IFilter<T>[]>([]);
    const [sortField, setSortField] = React.useState<keyof T>(props.DefaultSortField);
    const [ascending, setAscending] = React.useState<boolean>(true);
    const [activePage, setActivePage] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(0);
    const [totalRecords, setTotalRecords] = React.useState<number>(0);
    const [searchStatus, setSearchStatus] = React.useState<Application.Types.Status>('uninitiated');

    const [selectedData, setSelectedData] = React.useState<T[]>(props.Selection);
    const [sortKeySelected, setSortKeySelected] = React.useState<string>('');
    const [ascendingSelected, setAscendingSelected] = React.useState<boolean>(false);

    //keep the active page valid when the filtered result set shrinks
    React.useEffect(() => {
        if (totalPages > 0 && activePage >= totalPages)
            setActivePage(totalPages - 1);
    }, [totalPages, activePage]);

    React.useEffect(() => {
        setSelectedData(props.Selection);
    }, [props.Selection])

    // when controller is changed, use default sort field.
    React.useEffect(() => {
        setSortField(props.DefaultSortField);
    },[props.Controller, props.DefaultSortField])

    React.useEffect(() => {
        setSearchStatus('loading')
        const h = props.Controller.PagedSearch(filters, sortField, ascending, activePage);
        h.done((d) => {
            setData(JSON.parse(d.Data));
            setTotalPages(d.NumberOfPages);
            setTotalRecords(d.TotalRecords);
            setSearchStatus('idle')
        })
        h.fail(() => setSearchStatus('error'))
        return function cleanup() {
            if (h != null && h.abort != null)
                h.abort();
        }
    }, [props.Controller, filters, sortField, ascending, activePage]) 

    return (
        <Modal
            Show={props.Show}
            Title={props.Title}
            CallBack={(conf) => props.OnClose(selectedData, conf)}
            ShowX={true}
            Size={'xlg'}
            BodyStyle={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 210px)', overflow: 'hidden' }}
            DisableConfirm={props.MinSelection !== undefined && selectedData.length < props.MinSelection}
            ConfirmShowToolTip={props.MinSelection !== undefined && selectedData.length < props.MinSelection}
            ConfirmToolTipContent={
                <p>
                    <ReactIcons.CrossMark /> At least {props.MinSelection} items must be selected.
                </p>
            }
        >

            <div className="row" style={{ flexShrink: 0 }}>
                <div className="col" style={{ width: (props.Type === undefined || props.Type === 'single' ? '100%' : '60%') }}>
                    {props.Searchbar(
                        <>
                            {React.Children.map(props.children, (e) => {
                                if (React.isValidElement(e)) {
                                    if (((e as React.ReactElement).type === FilterableColumn) ||
                                        ((e as React.ReactElement).type === Column) ||
                                        ((e as React.ReactElement).type === ConfigurableColumn)
                                    ) return null;
                                    return e;
                                }
                                return null;
                            })}
                        </>, setFilters, searchStatus, totalRecords)}
                </div>
                {props.Type === 'multiple' ? <div className="col" style={{ width: '40%', borderLeft: '1px solid #dee2e6' }}>
                    <h3> Current Selection </h3> 
                </div> : null}
            </div>
            <div className="row d-flex" style={{ flex: 1, overflow: 'hidden'}}>
                <div className="col d-flex h-100" style={{ width: (props.Type === undefined || props.Type === 'single' ? '100%' : '60%') }}>
                    <Table<T>
                        TableClass="table table-hover h-100"
                        Data={data}
                        SortKey={sortField as string}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey === "Scroll")
                                return;
                            if (d.colKey === sortField)
                                setAscending(!ascending);
                            else {
                                setSortField(d.colField as keyof T);
                                setAscending(true);
                            }
                        }}
                        OnClick={(d, e) => {
                            //the table fires OnClick for both the clicked cell and the bubbled row, so stop
                            //propagation to avoid a double toggle that would immediately deselect the row
                            e.stopPropagation();
                            setSelectedData((s) => {
                                const isSelected = s.findIndex(item => item[props.PrimaryKey] === d.row[props.PrimaryKey]) > -1;

                                if (isSelected)
                                    return s.filter(item => item[props.PrimaryKey] !== d.row[props.PrimaryKey]);

                                if (props.Type === undefined || props.Type === 'single')
                                    return [d.row]

                                return [...s, d.row]
                            })
                        }}
                        Selected={(item) => selectedData.findIndex(d => d[props.PrimaryKey] === item[props.PrimaryKey]) > -1}
                        KeySelector={item => item[props.PrimaryKey] as string | number}
                    >
                        {props.children}
                    </Table>
                </div>
                {props.Type === 'multiple' ? <div className="col h-100" style={{ width: '40%', borderLeft: '1px solid #dee2e6' }}>
                    <Table<T>
                        TableClass="table table-hover h-100"
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
                        OnClick={(d) => setSelectedData([...selectedData.filter(item => item[props.PrimaryKey] !== d.row[props.PrimaryKey])])}
                        Selected={() => false}
                        KeySelector={item => item[props.PrimaryKey] as string | number}
                    >
                        {props.children}
                    </Table>
                </div> : null}
            </div>
            <div className="row" style={{ flexShrink: 0 }}>
                <div className="col" style={{ width: (props.Type === undefined || props.Type === 'single' ? '100%' : '60%') }}>
                    <Paging
                        Current={activePage + 1}
                        Total={totalPages}
                        SetPage={(p) => setActivePage(p - 1)}
                    />
                </div>
                {props.Type === 'multiple' ?
                    <div className="col" style={{ width: '40%' }} />
                    : null
                }
            </div>
        </Modal>
    )
}