//******************************************************************************************************
//  MeterNote.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  09/04/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as moment from 'moment';
declare var homePath: string;

function MeterNoteWindow(props: { meterId: number }): JSX.Element {
    const [tableRows, setTableRows] = React.useState<Array<JSX.Element>>([]);
    const [note, setNote] = React.useState<string>('');
    const [collapsed, setCollapsed] = React.useState<boolean>(true);
    const [count, setCount] = React.useState<number>(0);
    var jqueryHandle: JQuery.jqXHR;

    React.useEffect(() => {
        createTableRows();
    }, [props.meterId]);

    function createTableRows() {
        getNotes().done(data => {
            var rows = data.map(d => <tr key={d.ID}><td>{d.Note}</td><td>{moment.utc(d.TimeStamp).format("MM/DD/YYYY HH:mm")}</td><td>{d.UserAccount}</td><td>
                <button className="btn btn-sm" onClick={(e) => handleEdit(d)}><span><i className="fa fa-pencil"></i></span></button>
                <button className="btn btn-sm" onClick={(e) => handleDelete(d)}><span><i className="fa fa-times"></i></span></button>
            </td></tr>)

            setTableRows(rows);
            setCount(rows.length);
        });
    }

    function handleAdd(): void {
        addNote().done(e => {
            setNote('');
            createTableRows();
        });
    }

    function handleDelete(d) {
        deleteNote(d.ID).done(() => createTableRows());
    }

    function handleEdit(d) {
        setNote(d.Note);
        deleteNote(d.ID).done(() => createTableRows());
    }

    function getNotes(): JQuery.jqXHR {
        if (jqueryHandle !== undefined)
            jqueryHandle.abort();

        jqueryHandle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/Meter/Notes/${props.meterId}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle;
    }

    function deleteNote(id:number): JQuery.jqXHR {
        if (jqueryHandle !== undefined)
            jqueryHandle.abort();

        jqueryHandle = $.ajax({
            type: "DELETE",
            url: `${homePath}api/SystemCenter/Meter/Notes/${id}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle;
    }


    function addNote(): JQuery.jqXHR {
        if (jqueryHandle !== undefined)
            jqueryHandle.abort();

        jqueryHandle = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/Meter/Notes/Add`,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ID:0, NoteTypeID: 0, ReferenceTableID: props.meterId, Note: note, Timestamp: null, UserAccount: '' }),
            dataType: 'json',
            cache: true,
            async: true
        });

        return jqueryHandle;
    }

    return (
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Notes:</h4>
                    </div>
                    <div className="col">
                        <button className="btn btn-sm pull-right" onClick={(e) => setCollapsed(!collapsed)}><span><i className={(collapsed ? "fa fa-angle-left" : "fa fa-angle-down")}></i></span></button>
                    </div>
                </div>
            </div>
            <div id="collapseNotes" className={(collapsed ? "collapse in" : "collapse show")}>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr><th style={{ width: '50%' }}>Note</th><th>Time</th><th>User</th><th></th></tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>

                    </table>
                    <textarea className="form-control" rows={4} value={note} onChange={(e) => setNote((e.target as any).value)}></textarea>


                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary" onClick={handleAdd} disabled={note.length == 0}>Add Note</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button className="btn btn-default" onClick={() => setNote('')} disabled={note.length == 0}>Clear</button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default MeterNoteWindow;