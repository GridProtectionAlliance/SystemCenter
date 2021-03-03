//******************************************************************************************************
//  AssetNote.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import { TextArea } from '@gpa-gemstone/react-forms';
import { Modal, ToolTip } from '@gpa-gemstone/react-interactive';
import Table from '@gpa-gemstone/react-table';
import _ from 'lodash';
import * as React from 'react';
import { OpenXDA } from '../global';
declare var homePath: string;

function NoteWindow(props: { ID: number, Type: 'Asset' | 'Meter' | 'Location' | 'Customer' | 'Company' | 'User'}): JSX.Element {
    const [noteTypeID, setNoteTypeID] = React.useState<number>(0);
    const [note, setNote] = React.useState<OpenXDA.Note>({ ID: -1, UserAccount: '', Note: '', NoteTypeID: -1, ReferenceTableID: -1, Timestamp: '' });
    const [showEdit, setEdit] = React.useState<boolean>(false);

    const [noteList, setNoteList] = React.useState<Array<OpenXDA.Note>>([]);
    const [sortField, setSortField] = React.useState<keyof OpenXDA.Note>('Timestamp');
    const [ascending, setAscending] = React.useState<boolean>(false);

    const [hoverAdd, setHoverAdd] = React.useState<boolean>(false);
    const [hoverClear, setHoverClear] = React.useState<boolean>(false);


    React.useEffect(() => {
        let typeHandle = getNoteTypeID();
        getNotes();
        return () => { if (typeHandle != null && typeHandle.abort != null) typeHandle.abort(); }
    }, [props.Type]);

    React.useEffect(() => {
        let handle = getNotes();
        return () => { if (handle != null && handle.abort != null) handle.abort(); }
    }, [props.ID, sortField, ascending]);

    function handleEdit(d: OpenXDA.Note) {
        setNote(d);
        setEdit(true)
        //deleteNote(d);
    }

    function closeEdit(confirm: boolean) {
        if (note.Note.length == 0 && confirm)
            return;

        setEdit(false);
        if (confirm) {
            let n = _.cloneDeep(note)
            deleteNote(n);
            addNote(n);
        }
        setNote({ ID: -1, UserAccount: '', Note: '', NoteTypeID: -1, ReferenceTableID: -1, Timestamp: '' });
    }

    function getNotes(): JQuery.jqXHR<string> {
        let h = $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Note/ForObject/${props.Type}/${props.ID}/Search`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: [], OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
        h.done((data: string) => {
            let d = JSON.parse(data);
            setNoteList(d);
       });;

        return h;
    }

    function getNoteTypeID(): JQuery.jqXHR<Array<OpenXDA.NoteType>> {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/NoteType`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.then((d: Array<OpenXDA.NoteType>) => {
            let record = d.find(d => d.ReferenceTableName == props.Type)
            setNoteTypeID(record.ID);
        });

        return handle;
    }



    function deleteNote(d: OpenXDA.Note): void {
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Note/Delete`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(d),
            cache: true,
            async: true
        }).done(() => getNotes());
    }


    function addNote(currentNote: OpenXDA.Note): void {
        setNote({ ID: -1, UserAccount: '', Note: '', NoteTypeID: -1, ReferenceTableID: -1, Timestamp: '' });
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Note/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: 0, NoteTypeID: noteTypeID, ReferenceTableID: props.ID, Note: currentNote.Note, Timestamp: moment().format('MM/DD/YYYY HH:mm'), UserAccount: '' } as OpenXDA.Note),
            dataType: 'json',
            cache: true,
            async: true
        }).done(e => {
            getNotes();
        });
    }

    return (
        <div className="card" style={{ marginBottom: 10, maxHeight: window.innerHeight - 215}}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Notes:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ maxHeight: window.innerHeight - 315, overflowY: 'auto' }}>
                <div>
                    <Table<OpenXDA.Note>
                        
                        cols={[
                            { key: 'Note', label: 'Note', headerStyle: { width: '50%' }, rowStyle: { width: '50%' } },
                            { key: 'Timestamp', label: 'Time', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => moment.utc(item.Timestamp).format("MM/DD/YYYY HH:mm") },
                            { key: 'UserAccount', label: 'User', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            {
                                key: null, label: '', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: (item) => <>
                                    <button className="btn btn-sm" onClick={(e) => handleEdit(item)}><span><i className="fa fa-pencil"></i></span></button>
                                    <button className="btn btn-sm" onClick={(e) => deleteNote(item)}><span><i className="fa fa-times"></i></span></button>
                                </>
                            },

                        ]}
                        
                        tableClass="table table-hover"
                        data={noteList}
                        sortField={sortField}
                        ascending={ascending}
                        onSort={(d) => {
                            if (d.col == sortField)
                                setAscending(!ascending);
                            else {
                                setAscending(true);
                                setSortField(d.col);
                            }

                        }}
                        onClick={() => { }}
                        theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 615, width: '100%' }}
                        rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                        selected={(item) => item.ID == note.ID}
                    />
                    
                </div>
                <TextArea<OpenXDA.Note> Record={note} Rows={4} Field={'Note'} Setter={(n) => setNote(n)} Valid={() => note.Note.length > 0} Label={''} />
                <Modal Show={showEdit} Title={'Edit Note'}
                    ShowCancel={true}
                    CallBack={closeEdit}
                    DisableConfirm={note.Note.length == 0}
                    ShowX={true}
                    ConfirmShowToolTip={note.Note.length == 0}
                    ConfirmToolTipContent={
                        <p> <i style={{ marginRight: '10px', color: '#dc3545' }} className="fa fa-exclamation-circle"></i>
                        An empty Note can not be saved. </p>
                    }>                 
                    <TextArea<OpenXDA.Note> Record={note} Rows={4} Field={'Note'} Setter={(n) => { if (n.Note == null) setNote({...n, Note: ''}); else setNote(n); }} Valid={() => note.Note.length > 0} Label={''} />
                </Modal>
                
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (note.Note.length == 0 ? ' disabled' : '')} onClick={() => { if (note.Note.length > 0) addNote(note); }} data-tooltip={"Add"} style={{ cursor: note.Note.length == 0 ? 'not-allowed' : 'pointer' }} onMouseOver={() => setHoverAdd(true)} onMouseOut={() => setHoverAdd(false)}>Add Note</button>
                    <ToolTip Show={hoverAdd && note.Note.length == 0} Position={'top'} Theme={'dark'} Target={"Add"}>
                        <p> A note needs to be entered. </p>
                    </ToolTip>
                </div>
                <div className="btn-group mr-2">
                    <button className={"btn btn-default" + (note.Note.length == 0 ? ' disabled' : '')} onClick={() => setNote((note) => ({...note, Note: ''}))} style={{ cursor: note.Note.length == 0 ? 'not-allowed' : 'pointer' }} data-tooltip={"Remove"} onMouseOver={() => setHoverClear(true)} onMouseOut={() => setHoverClear(false)} >Clear</button>
                    <ToolTip Show={hoverClear && note.Note.length == 0} Position={'top'} Theme={'dark'} Target={"Remove"}>
                        <p> The note field is already empty. </p>
                    </ToolTip>
                </div>
            </div>
        </div>
    );
}

export default NoteWindow;