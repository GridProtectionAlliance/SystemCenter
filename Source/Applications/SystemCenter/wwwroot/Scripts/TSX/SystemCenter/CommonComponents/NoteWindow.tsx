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
import { OpenXDA } from '@gpa-gemstone/application-typings'
import { Note } from '@gpa-gemstone/common-pages'
import { AssetNoteSlice, CompanyNoteSlice, CustomerNoteSlice, LocationNoteSlice, MeterNoteSlice, UserNoteSlice } from '../Store/Store';

declare var homePath: string;

interface IProps { ID: number, Type: 'Asset' | 'Meter' | 'Location' | 'Customer' | 'Company' | 'User' }

const NoteWindow = (props: IProps) => {

    const [noteType, setNoteType] = React.useState<OpenXDA.Types.NoteType>({ ID: -1, Name: 'Meter', ReferenceTableName: 'Meter' });
    const [noteTag, setNoteTag] = React.useState<OpenXDA.Types.NoteTag>({ ID: -1, Name: 'Configuration' });
    const [noteApp, setNoteApp] = React.useState<OpenXDA.Types.NoteApplication>({ ID: -1, Name: 'SystemCenter' });

    
    React.useEffect(() => {
        let typeHandle = getNoteType();
        return () => { if (typeHandle != null && typeHandle.abort != null) typeHandle.abort(); }
    }, [props.Type]);

    React.useEffect(() => {
        let tagHandle = getNoteTag();
        return () => { if (tagHandle != null && tagHandle.abort != null) tagHandle.abort(); }
    }, []);

    React.useEffect(() => {
        let appHandle = getNoteApp();
        return () => { if (appHandle != null && appHandle.abort != null) appHandle.abort(); }
    }, []);
    
  
    function getNoteType(): JQuery.jqXHR<OpenXDA.Types.NoteType[]> {
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/NoteType`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        handle.done((d: OpenXDA.Types.NoteType[]) => {
            
            let record = d.find(r => r.ReferenceTableName == props.Type)
            setNoteType(record);
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

        handle.done((d: OpenXDA.Types.NoteApplication[]) => {
            let record = d.find(r => r.Name == "SystemCenter")
            setNoteApp(record);
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

        handle.done((d: OpenXDA.Types.NoteTag[]) => {
            let record = d.find(r => r.Name == "Configuration")
            setNoteTag(record);
        });

        return handle;
    }

    let slice;
    if (props.Type == 'Asset')
        slice = AssetNoteSlice;
    if (props.Type == 'Meter')
        slice = MeterNoteSlice;
    if (props.Type == 'Location')
        slice = LocationNoteSlice;
    if (props.Type == 'Customer')
        slice = CustomerNoteSlice;
    if (props.Type == 'Company')
        slice = CompanyNoteSlice;
    if (props.Type == 'User')
        slice = UserNoteSlice;

    return (
        <Note MaxHeight={window.innerHeight - 215} ReferenceTableID={props.ID} NoteApplications={[noteApp]} NoteTags={[noteTag]} NoteTypes={[noteType]} NoteSlice={slice}
        />
    );
}

export default NoteWindow;