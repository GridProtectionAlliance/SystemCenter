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

import * as React from 'react';
import moment from 'moment';
import { OpenXDA } from '@gpa-gemstone/application-typings'
import { Note } from '@gpa-gemstone/common-pages'
import { ReactIcons } from '@gpa-gemstone/gpa-symbols'
import { MultiCheckBoxSelect, Select, TextArea, ToolTip } from '@gpa-gemstone/react-forms'
import { AssetNoteSlice, CustomerNoteSlice, LocationNoteSlice, MeterNoteSlice, UserNoteSlice } from '../Store/Store';
import { SelectRoles } from '../Store/UserSettings';
import { useAppDispatch, useAppSelector } from '../hooks';

declare var homePath: string;

type NoteType = 'Asset' | 'Meter' | 'Location' | 'Customer' | 'User'

interface IProps { ID: number, Type: NoteType }

const NoteWindow = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [noteType, setNoteType] = React.useState<OpenXDA.Types.NoteType>({ ID: -1, Name: 'Meter', ReferenceTableName: 'Meter' });
    const [selectedTags, setSelectedTags] = React.useState<number[]>([]);
    const [noteTags, setNoteTags] = React.useState<OpenXDA.Types.NoteTag[]>([]);
    const [noteApp, setNoteApp] = React.useState<OpenXDA.Types.NoteApplication>({ ID: -1, Name: 'SystemCenter' });
    const [note, setNote] = React.useState<OpenXDA.Types.Note>({ ID: -1, ReferenceTableID: props.ID, NoteTagID: -1, NoteTypeID: -1, NoteApplicationID: -1, Timestamp: '', UserAccount: '', Note: '' });
    const [hover, setHover] = React.useState<string | null>(null)
    const notesRef = React.useRef<HTMLDivElement>(null)
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        let typeHandle = getNoteType();
        typeHandle.done((d: OpenXDA.Types.NoteType[]) => {
            let record = d.find(r => r.ReferenceTableName == props.Type)
            setNoteType(record);
            setNote((note) => ({ ...note, NoteTypeID: record.ID }))
        });
        return () => { if (typeHandle != null && typeHandle.abort != null) typeHandle.abort(); }
    }, [props.Type]);

    React.useEffect(() => {
        let tagHandle = getNoteTag();
        tagHandle.done((d: OpenXDA.Types.NoteTag[]) => {
            setNoteTags(d)
            setSelectedTags(d.map((t) => t.ID))
            setNote((note) => ({ ...note, NoteTagID: d[0].ID }))
        });
        return () => { if (tagHandle != null && tagHandle.abort != null) tagHandle.abort(); }
    }, []);

    React.useEffect(() => {
        let appHandle = getNoteApp();
        appHandle.done((d: OpenXDA.Types.NoteApplication[]) => {
            let record = d.find(r => r.Name == "SystemCenter")
            setNoteApp(record);
            setNote((note) => ({ ...note, NoteApplicationID: record.ID }))
        });
        return () => { if (appHandle != null && appHandle.abort != null) appHandle.abort(); }
    }, []);

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    const handleAdd = React.useCallback((d: OpenXDA.Types.Note) => {
        const slice = getSlice(props.Type)
        dispatch(slice.DBAction({ verb: 'POST', record: { ...d, UserAccount: undefined, Timestamp: moment().format('MM/DD/YYYY HH:mm') } }))
        setNote(CreateNewNote(noteType, noteApp, noteTags, props.ID));
    }, [props.Type, noteType, noteTags, noteApp, props.ID])

    return (<>
        {hasPermissions() ?
            <div className="row mx-1 my-2">
                <div className="col">
                    <fieldset className="border">
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Add Note:</legend>
                        <div className="row mx-1">
                            <div className={"col-6"}>
                                <TextArea<OpenXDA.Types.Note> Record={note} Rows={4} Field={'Note'} Setter={(n) => setNote(n)} Valid={() => note.Note != null && note.Note.length > 0} Label={''} />
                            </div>
                            <div className="col-6">
                                {noteTags.length > 1 ?
                                    <Select<OpenXDA.Types.Note>
                                        Record={note} Field={'NoteTagID'}
                                        Label={'Type: '}
                                        Options={noteTags.map(r => ({ Value: r.ID.toString(), Label: r.Name }))}
                                        Setter={(record: OpenXDA.Types.Note) => setNote({ ...record, NoteTagID: parseInt(record.NoteTagID.toString(), 10) })} /> : null}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mx-3">
                                <button
                                    className={"btn btn-primary" + (note.Note === null || note.Note.length === 0 ? ' disabled' : '')}
                                    onClick={() => { if (note.Note !== null && note.Note.length > 0) handleAdd(note); }}
                                    data-tooltip={"Add"}
                                    style={{ cursor: note.Note === null || note.Note.length === 0 ? 'not-allowed' : 'pointer' }}
                                    onMouseOver={() => setHover('add')} onMouseOut={() => setHover('none')}>Add Note</button>
                                <ToolTip
                                    Show={hover === 'add' && (note.Note === null || note.Note.length === 0)}
                                    Position={'top'}
                                    Target={"Add"}>
                                    <p><ReactIcons.CrossMark /> A note needs to be entered. </p>
                                </ToolTip>
                                <button className={" btn btn-default" + (note.Note === null || note.Note.length === 0 ? ' disabled' : '')}
                                    onClick={() => setNote((n) => ({ ...n, Note: '' }))}
                                    style={{ cursor: note.Note === null || note.Note.length === 0 ? 'not-allowed' : 'pointer' }}
                                    data-tooltip={"Remove"}
                                    onMouseOver={() => setHover('clear')}
                                    onMouseOut={() => setHover('none')}>Clear</button>
                                <ToolTip Show={hover === 'clear' && (note.Note === null || note.Note.length === 0)}
                                    Position={'top'}
                                    Target={"Remove"}>
                                    <p><ReactIcons.CrossMark /> The note field is already empty. </p>
                                </ToolTip>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            : null}

        <div className="row mx-1 my-2">
            <div className="col">
                <fieldset className="border">
                    <legend className="w-auto" style={{ fontSize: 'large' }}>Filter Notes:</legend>
                    <div className='row mx-1'>
                        <div className='col'>
                            <MultiCheckBoxSelect Label={'Types:'}
                                Options={noteTags.map(t => ({ Selected: selectedTags.find(i => i == t.ID) != null, Label: t.Name, Value: t.ID }))}
                                OnChange={(evt, changed) => {
                                    setSelectedTags((st) => {
                                        const u = st.filter((t) => changed.findIndex(c => c.Value == t) == -1);
                                        u.push(...changed.filter(t => !t.Selected).map(t => parseInt(t.Value.toString())));
                                        return u;
                                    })
                                }}
                                ShowToolTip={true}
                            />
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
        <div className="row d-flex flex-column" style={{ flex: 1 }} ref={notesRef}>
            <div className="col-12 h-100">
                {selectedTags.length > 0 ?
                    <Note
                        MaxHeight={notesRef.current.offsetHeight + 200} // Note in gemstone subtracts 300 from the MaxHeight for the table height, but since we are putting nothing beneath the table, we add to offset it.
                        ReferenceTableID={props.ID}
                        NoteApplications={[noteApp]}
                        NoteTags={noteTags.filter((t) => selectedTags.find(i => i == t.ID) != null)}
                        NoteTypes={[noteType]}
                        NoteSlice={getSlice(props.Type) as any}
                        AllowAdd={false}
                        Title={''}
                        AllowEdit={hasPermissions()}
                        AllowRemove={hasPermissions()}
                        ShowCard={false}
                        Filter={(n) => selectedTags.find(i => i == n.NoteTagID) != null}
                    />
                    : <div className={'alert alert-warning'}>
                        <p>At least 1 Type needs to be selected.</p>
                    </div>}
            </div>
        </div>
    </>
    );
}

export default NoteWindow;

function getSlice(type: NoteType) {
    switch (type) {
        case 'Asset':
        return AssetNoteSlice;
        case 'Meter':
        return MeterNoteSlice;
        case 'Location':
        return LocationNoteSlice;
        case 'Customer':
        return CustomerNoteSlice;
        case 'User':
        return UserNoteSlice;
        default:
            throw new Error(`Unsupported note type: ${type}`);
    }
}

function getNoteType(): JQuery.jqXHR<OpenXDA.Types.NoteType[]> {
    let handle = $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/NoteType`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
    return handle;
}

function getNoteApp(): JQuery.jqXHR<OpenXDA.Types.NoteApplication[]> {
    let handle = $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/NoteApp`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
    return handle;
}

function getNoteTag(): JQuery.jqXHR<OpenXDA.Types.NoteTag[]> {
    let handle = $.ajax({
        type: "GET",
        url: `${homePath}api/OpenXDA/NoteTag`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
    return handle;
}

function CreateNewNote(noteType: OpenXDA.Types.NoteType, noteApp: OpenXDA.Types.NoteApplication, noteTags: OpenXDA.Types.NoteTag[], referenceTableID: number) {
    return { ID: -1, ReferenceTableID: referenceTableID, NoteTagID: noteTags[0].ID, NoteTypeID: noteType.ID, NoteApplicationID: noteApp.ID, Timestamp: '', UserAccount: '', Note: '' }
}
