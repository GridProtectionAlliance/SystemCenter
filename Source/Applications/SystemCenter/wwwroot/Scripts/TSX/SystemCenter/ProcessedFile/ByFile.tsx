//******************************************************************************************************
//  ByFile.tsx - Gbtc
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
//  06/27/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import Table from '@gpa-gemstone/react-table';
import * as _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Application, OpenXDA, SystemCenter } from '@gpa-gemstone/application-typings';

import { DefaultSearchField, SearchFields, TransformSearchFields } from '../CommonComponents/SearchFields';
import { SearchBar, Search, Modal } from '@gpa-gemstone/react-interactive';
import { Input, TextArea } from '@gpa-gemstone/react-forms';
import { useSelector, useDispatch } from 'react-redux';
import { DataFileSlice } from '../Store/Store';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import moment from 'moment';


declare var homePath: string;

const ByFile: Application.Types.iByComponent = (props) => {
    let dispatch = useDispatch();
    let history = useHistory();

    const cState = useSelector(DataFileSlice.SearchStatus);
    const data = useSelector(DataFileSlice.SearchResults);

    const [search, setSearch] = React.useState<Array<Search.IFilter<OpenXDA.Types.DataFile>>>([]);
    const filterableList: Search.IField<OpenXDA.Types.DataFile>[] = [
        { isPivotField: false, key: 'Path', label: 'Path', type: 'string' },
        { isPivotField: false, key: 'CreationTime', label: 'File Created', type: 'datetime' },
        { isPivotField: false, key: 'DataStartTime', label: 'Data Start', type: 'datetime' }        
    ]

    const [sortKey, setSortKey] = React.useState<keyof OpenXDA.Types.DataFile>('DataStartTime');
    const [ascending, setAscending] = React.useState<boolean>(true);
    
    const [showModal, setShowModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        dispatch(DataFileSlice.DBSearch({ sortField: sortKey, ascending, filter: search }))
    }, [search, ascending, sortKey]);

   

    React.useEffect(() => {
        if (cState == 'unintiated' || cState == 'changed')
            dispatch(DataFileSlice.DBSearch({ sortField: sortKey, ascending, filter: search }))
    }, [cState, dispatch]);


    
    function handleSelect(item) {
        //history.push({ pathname: homePath + 'index.cshtml', search: '?name=Customer&CustomerID=' + item.row.ID, state: {} })
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <SearchBar<OpenXDA.Types.DataFile> CollumnList={filterableList} SetFilter={(flds) => setSearch(flds)} Direction={'left'} defaultCollumn={DefaultSearchField.DataFile as Search.IField<OpenXDA.Types.DataFile>} Width={'100%'} Label={'Search'}
                ShowLoading={cState == 'loading'} ResultNote={cState == 'error' ? 'Could not complete Search' : 'Found ' + data.length + ' Data Files'}
                GetEnum={(setOptions, field) => {
                    let handle = null;
                   
                    if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
                        return () => { };

                    handle = $.ajax({
                        type: "GET",
                        url: `${homePath}api/ValueList/Group/${field.enum[0].Value}`,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: true,
                        async: true
                    });

                    handle.done(d => setOptions(d.map(item => ({ Value: item.Value.toString(), Label: item.Text }))))
                    return () => { if (handle != null && handle.abort == null) handle.abort(); }
                }}

            >
                
            </SearchBar>
            <div style={{ width: '100%', height: 'calc( 100% - 136px)' }}>
                <Table<OpenXDA.Types.DataFile>
                    cols={[
                        { key: 'Path', field: 'FilePath', label: 'Path', headerStyle: { width: '70%' }, rowStyle: { width: '70%' }, content: (f) => f.FilePath.length > 100 ? f.FilePath.substr(f.FilePath.length - 100, 100) : f.FilePath },
                        { key: 'CreationTime', field: 'CreationTime', label: 'File Created', headerStyle: { width: '15%' }, rowStyle: { width: '15%' }, content: f => moment(f.CreationTime).format('MM/DD/YYYY hh:mm.ss.ssss') },
                        { key: 'DataStartTime', field: 'DataStartTime', label: 'Data Start', headerStyle: { width: '15%' }, rowStyle: { width: '15%' }, content: f => moment(f.DataStartTime).format('MM/DD/YYYY hh:mm.ss.ssss') },
                        { key: 'Scroll', label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ]}
                    tableClass="table table-hover"
                    data={data}
                    sortKey={sortKey}
                    ascending={ascending}
                    onSort={(d) => {
                        if (d.colKey === "Scroll")
                            return;

                        if (d.colKey === sortKey)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortKey(d.colField);
                        }
                    }}
                    onClick={handleSelect}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    tbodyStyle={{ display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%'  }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected={(item) => false}
                />
            </div>

            <Modal Show={showModal} Title={'Events'} CallBack={(c) => {
                setShowModal(false);
                // Logic to re-process the File.
            }} ShowCancel={false} ShowX={true}>
                <div className="row">
                    { /* Show a list of Events for event files. maybe with Link to openSEE? Add Process Button  */}
                </div>
            </Modal>
            

        </div>
    )
}

export default ByFile;

