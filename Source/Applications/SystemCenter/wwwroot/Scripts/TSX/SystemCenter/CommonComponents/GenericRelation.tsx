//******************************************************************************************************
//  GenericRelation.tsx - Gbtc
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
//  09/16/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************s

import * as React from 'react';
import { GenericController, Search, LoadingScreen, ServerErrorIcon, Warning, Modal } from '@gpa-gemstone/react-interactive';
import { Table, Column, Paging } from '@gpa-gemstone/react-table';
import { usePagedSearch, useAppSelector } from '../hooks';
import { SystemCenter as SC } from '../global';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { SelectRoles } from '../Store/UserSettings';

interface U {
    ID: number | string
}

interface IProps<T extends U> {
    /**
     * User-facing name for the relation, i.e. Customer Asset or Remote XDA Meter 
     */
    RecordType: string
    /**
     * Controller for relation.
     */
    Controller: GenericController<T>
    /**
     * Default filters for the table.
     */
    Filters?: Search.IFilter<T>[]
    /**
     * Default sort field for the table. If not provided, uses the default sort property of the controller.
     */
    DefaultSort?: keyof T
    /**
     * ParentID for the table.
     */
    ParentID?: string | number
    /**
     * Relation table's columns, except for the edit and delete columns.
     */
    Columns: SC.IByCol<T>[]
    /**
     * If provided, will add an edit column to the table, which displays the ReactElement resulting from this function.
     * 
     * @param record
     * @param recordSetter
     * @param setErrors
     * @returns
     */
    EditForm?: (record: T, recordSetter: (record: T) => void, setErrors: (errors: string[]) => void) => React.ReactElement;
    /**
     * Whether or not to include a delete column.
     */
    DeleteColumn?: boolean
    /**
     * If provided, adds an "Add New" button to the relation, and uses this prop as the callback.
     * @returns
     */
    AddNew?: () => void
    /**
     * A callback to push search results up to parent component.
     * @param results
     * @returns
     */
    SetSearchResults?: (results: T[]) => void
    /**
     * Function to use to determine whether or not a user may edit a relation.
     * @param item
     * @returns
     */
    IsEditable: (item: T) => boolean
    /**
     * Function to derive the user-facing name of the relation from the relation's record.
     * @param record
     * @returns
     */
    GetName: (record: T) => string
    /**
     * Refresh trigger for the table.
     */
    RefreshCount?: number
    /**
     * Blank record containing default values for the form provided in "Edit Form."
     */
    BlankRecord: T
}

/**
 * A tab for a System Center record for a record's relation (of type T) to other records.
 * Includes a sortable and paged table in the tabbed-card layout, with settings for a button to add new relations,
 * and also columns that allow for deleting or editing existing relations.
 * For example, an Asset Group record might have relation tabs for Meters, Assets, and Asset Groups,
 * each of which would feature a sortable and paged table of records in that group.
 * If there are special attributes to the relation, or if the user simply wants to edit the records in this context,
 * we can provide that functionality with the edit column. 
 * @param props
 * @returns
 */
function GenericRelation<T extends U>(props: IProps<T>) {
    const [filters, setFilters] = React.useState<Search.IFilter<T>[]>(props.Filters ?? []);
    const [ascending, setAscending] = React.useState<boolean>(props.Controller.Ascending);
    const [sortField, setSortField] = React.useState<keyof T>(props.DefaultSort ?? props.Controller.DefaultSort);
    const [page, setPage] = React.useState<number>(0);
    const [hover, setHover] = React.useState<string>("");
    const [refreshCount, refreshData] = React.useState<number>(0);
    const [showDelete, setShowDelete] = React.useState<boolean>(false);
    const [showEdit, setShowEdit] = React.useState<boolean>(false);
    const [selectedRecord, setSelectedRecord] = React.useState<T | null>(null);
    const [editRecord, setEditRecord] = React.useState<T>(props.BlankRecord);
    const [editRecordErrors, setEditRecordErrors] = React.useState<string[]>([]);

    const { Data: pagedData, Status: pagedStatus, RecordsPerPage: recordsPerPage, TotalPages: totalPages, TotalRecords: totalRecords } = usePagedSearch<T>(props.Controller, filters, sortField, ascending, page, props.ParentID, refreshCount);

    const roles = useAppSelector(SelectRoles);

    const getContent = React.useCallback((datum: SC.IColDatum<T>, col: SC.IByCol<T>) => {
        if (col?.Content != null) return col.Content(datum);
        else if (col.Type === 'boolean') return datum.item[datum.field] ? <ReactIcons.CheckMark Color="var(--success)" /> : <></>
        else return datum.item[datum.field] ?? <></>
    }, []);

    React.useEffect(() => {
        if (props.SetSearchResults != null) props.SetSearchResults(pagedData);
    }, [pagedData, props.SetSearchResults])

    React.useEffect(() => {
        setFilters(props.Filters ?? [])
    }, [props.Filters])

    React.useEffect(() => {
        refreshData(x => x + 1);
    }, [props.RefreshCount])

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0)
            return false;
        return true;
    }

    let cardBody;
    if (pagedStatus === 'error') {
        cardBody = <ServerErrorIcon Show={true} Size={40} Label={'A Server Error Occurred. Please Reload the Application.'} />
    } else if (pagedStatus === 'loading') {
        cardBody = <LoadingScreen Show={true} />
    } else {
        cardBody =
            <>
                <div className="row d-flex flex-column" style={{ flex: 1, overflow: 'hidden' }}>
                    <Table<T>
                        TableClass="table table-hover"
                        Data={pagedData}
                        SortKey={sortField.toString()}
                        Ascending={ascending}
                        OnSort={(d) => {
                            if (d.colKey == 'Edit' || d.colKey == 'Delete') return;
                            if (d.colKey === sortField)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortField(d.colField);
                            }
                        }}
                        TheadStyle={{ fontSize: 'smaller' }}
                        RowStyle={{ fontSize: 'smaller' }}
                        Selected={(item) => false}
                        KeySelector={(item) => item.ID}
                    >
                        {
                            ...props.Columns.map(col => (
                                <Column<T>
                                    Key={col.Field.toString()}
                                    AllowSort={col.AllowSort}
                                    Field={col.Field}
                                    HeaderStyle={{ width: col?.Width ?? 'auto' }}
                                    RowStyle={{ width: col?.Width ?? 'auto' }}
                                    Content={datum => getContent(datum, col)}
                                >{col.Label}
                                </Column>
                            ))
                    }
                    {props.DeleteColumn ?? false ? <Column<T>
                        Key={'Delete'}
                        AllowSort={false}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                        Content={({ item }) => (
                            (props.IsEditable != null ? props.IsEditable(item) : true) ?
                            <button
                                    className={"btn btn-delete" + (props.IsEditable(item) ? '' : ' disabled') + (hasPermissions() ? '' : ' disabled')}
                                onClick={(e) => {
                                    if (hasPermissions()) {
                                        e.preventDefault();
                                        if (props.IsEditable(item)) {
                                            setSelectedRecord(item);
                                            setShowDelete(true);
                                        }
                                    }
                                }}>
                                <span><ReactIcons.TrashCan Color="var(--danger)" Size={20} /></span>
                            </button> : null)
                        }
                    > <p></p>
                    </Column> : null}
                    {props.EditForm != null ? <Column<T>
                        Key={'Edit'}
                        AllowSort={false}
                        HeaderStyle={{ width: '10%' }}
                        RowStyle={{ width: '10%' }}
                        Content={({ item }) => (props.IsEditable(item) ?
                            <button
                                className={"btn btn-edit" + (props.IsEditable(item) ? '' : ' disabled') + (hasPermissions() ? '' : ' disabled')}
                                onClick={(e) => {
                                    if (hasPermissions()) {
                                        e.preventDefault();
                                        if (props.IsEditable(item)) {
                                            setSelectedRecord(item);
                                            setShowEdit(true);
                                        }
                                    }
                                }}>
                                <span><ReactIcons.Pencil Color="var(--warning)" Size={20} /></span>
                            </button> : null)
                        }
                    > <p></p>
                    </Column> : null }
                    </Table>
                </div>
                <div className="row">
                    <div className="col">
                        <Paging
                            Current={page + 1}
                            SetPage={(p) => setPage(p - 1)}
                            Total={totalPages}
                        />
                    </div>
                </div>
            </>

        return (
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>{props.RecordType}s:</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p style={{ marginTop: 2, marginBottom: 2 }}>
                                {`Displaying ${props.RecordType}(s) ${totalRecords > 0 ? (recordsPerPage * page + 1) : 0} - ${recordsPerPage * page + pagedData.length} out of ${totalRecords}`}
                            </p>
                        </div>
                    </div>

                </div>

                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                    {cardBody}
                </div >

                <div className="card-footer">
                    {props.AddNew != null ?
                        <>
                            <div className="add-new-meter">
                                <button
                                    className={"btn btn-info" + (hasPermissions() ? '' : ' disabled')}
                                    type="submit" data-tooltip='AddRecord' onMouseEnter={() => setHover('submit')} onMouseLeave={() => setHover('none')}
                                    onClick={(e) => {
                                        if (hasPermissions()) {
                                            e.preventDefault();
                                            props.AddNew();
                                        }
                                    }}>
                                    Add {props.RecordType}
                                </button>
                            </div>
                            <ToolTip Show={hover == 'submit' && !hasPermissions()} Position={'top'} Target={"AddRecord"}>
                                <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                            </ToolTip>
                        </>
                        : null}
                </div>
                {props.DeleteColumn ?? false ?
                    <Warning Title={"Delete " + (selectedRecord != null ? props.GetName(selectedRecord) : props.RecordType)} Show={showDelete} Message={`Are you sure you want to delete the ${props.RecordType} for ` + (selectedRecord != null ? props.GetName(selectedRecord) : "this " + props.RecordType) + "?"}
                        CallBack={(conf) => {
                            if (conf) props.Controller.DBAction('DELETE', selectedRecord).then(() => { refreshData(x => x+1)}); 
                            setShowDelete(false);
                        }} /> : null}
                {props.EditForm != null ? 
                    <Modal Show={showEdit} Title={'Edit ' + (selectedRecord != null ? props.GetName(selectedRecord) : props.RecordType)}
                        ShowCancel={true}
                        CallBack={(conf) => {
                            if (conf) props.Controller.DBAction('PATCH', editRecord).then(() => refreshData(x => x + 1));
                            setShowEdit(false);
                        }}
                        DisableConfirm={editRecordErrors.length > 0}
                        ShowX={true}
                        Size={"lg"}
                        ConfirmShowToolTip={editRecordErrors.length > 0}
                        ConfirmToolTipContent={
                            editRecordErrors.map((t, i) => <p key={i}> <ReactIcons.CrossMark Color="var(--danger)" /> {t} </p>)
                        }>
                        {props.EditForm(selectedRecord, setEditRecord, setEditRecordErrors)}
                    </Modal>
                    : null}
            </div>
        )
    }
}

export default GenericRelation;