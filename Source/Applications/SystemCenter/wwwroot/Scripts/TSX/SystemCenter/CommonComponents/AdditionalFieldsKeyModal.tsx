//******************************************************************************************************
//  AdditionalFieldsKeyModal.tsx - Gbtc
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
//  10/19/2023 - Gabriel Santos
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as _ from 'lodash';
import { SystemCenter, Application } from '@gpa-gemstone/application-typings';
import { FilterableTable, LoadingIcon, Modal, ServerErrorIcon, Search } from '@gpa-gemstone/react-interactive';
import { Paging } from '@gpa-gemstone/react-table';

declare var homePath: string;

interface IProps {
    KeyField: SystemCenter.Types.AdditionalFieldView,
    SetKeyFieldValue: (val: string) => void,
    Show: boolean,
    SetShow: (show: boolean) => void,
}

const RowsPerPage = 50;

function AdditionalFieldsKeyModal(props: IProps): JSX.Element {
    const [datastatus, setDataStatus] = React.useState<Application.Types.Status>('unintiated');
    const [countstatus, setCountStatus] = React.useState<Application.Types.Status>('unintiated');
    const [externalData, setExternalData] = React.useState<any[]>([]);
    const [selectedExternal, setSelectedExternal] = React.useState<any>(undefined);
    const [ascExt, setAscExt] = React.useState<boolean>(false);
    const [sortExt, setSortExt] = React.useState<string>("Hero");
    const [count, setCount] = React.useState<number>(0);
    const [page, setPage] = React.useState<number>(0);
    const [filters, setFilters] = React.useState<Search.IFilter<any>[]>([]);
    const [cols, setCols] = React.useState<any[]>([]);


    React.useEffect(() => {
        if (props.KeyField == null) 
            return;
        
        const countHandle = getCount();

        countHandle.then(() => { setCountStatus('idle') }, () => setCountStatus('error'))
        return () => {
            if (countHandle != null && countHandle.abort != null) countHandle.abort()
        }
    }, [props.KeyField, filters]);

    React.useEffect(() => {
        if (props.KeyField == null)
            return;

        const dataHandle = getData();

        dataHandle.then(() => { setDataStatus('idle') }, () => setDataStatus('error'))
        return () => {
            if (dataHandle != null && dataHandle.abort != null) dataHandle.abort()
        }
    }, [page, ascExt, sortExt, props.KeyField, filters]);

    React.useEffect(() => {
        if (externalData.length == 0)
            return;
        const updatedCols = Object.keys(externalData[0]).map((field: string) => {
            return { key: field, field: field, label: field, Type: 'string' }
        })
        if (!_.isEqual(updatedCols, cols))
            setCols(updatedCols);
    }, [externalData])

    const getData = () => {
        setDataStatus('loading');
        const handle = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/extDBTables/RetrieveTable/${props.KeyField?.ExternalDBTableID ?? null}/${page * RowsPerPage+1}/${(page + 1) * RowsPerPage}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Ascending: ascExt, OrderBy: sortExt, Searches: filters }),
            cache: true,
            async: true
        });
        handle.then((extData: any[]) => {
            setExternalData(extData);
        });

        return handle;
    };

    const getCount = () => {
        setCountStatus('loading');
        const handle = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/extDBTables/RetrieveTableCount/${props.KeyField.ExternalDBTableID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Ascending: false, OrderBy: '', Searches: filters }),
            cache: true,
            async: true
        })
        handle.then((d) => { setCount(d) })
        return handle;
    };

    const searchTable = React.useCallback((item, search) => {
        if (props.KeyField?.FieldName == null) return true;
        return item[props.KeyField.FieldName].match(search);
    }, [props.KeyField]);

  
    let title = `Select Key Field Value for ${props.KeyField?.FieldName}`;
    if (countstatus === 'error' || datastatus === 'error')
        title = "External Query Failure";
    return (
        <Modal
            Title={title}
            ShowCancel={false}
            ShowX={true}
            CallBack={(conf) => {
                props.SetShow(false);
                if (conf)
                    props.SetKeyFieldValue(selectedExternal[props.KeyField.FieldName]);
            }}
            Show={props.Show}
            Size={'xlg'}
            ConfirmBtnClass={countstatus === 'error' || datastatus === 'error' ? 'btn btn-danger' : 'btn btn-secondary'}
            ConfirmText={countstatus === 'error' || datastatus === 'error' ? 'Close' : 'Select'}>
            <ServerErrorIcon Show={countstatus === 'error' || datastatus === 'error'} Size={40}
                Label={'Could not query external database table associated with this field. Please contact your administrator.'}
            />
            <>
                <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                    <div className="col" style={{ flex: 1, overflow: 'hidden' }}>
                        {countstatus !== 'error' && datastatus !== 'error' ?
                            <FilterableTable<any>
                                cols={cols}
                                SetFilter={setFilters}
                                tableClass="table table-hover"
                                data={externalData}
                                sortKey={sortExt}
                                ascending={ascExt}
                                onSort={(d) => {
                                    if (d.colKey === sortExt)
                                        setAscExt(!ascExt);
                                    else {
                                        setAscExt(true);
                                        setSortExt(d.colKey);
                                    }
                                }}
                                onClick={(d) => { setSelectedExternal(d.row); }}
                                tableStyle={{
                                    padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                                    tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                                }}
                                theadStyle={{ fontSize: 'smaller', tableLayout: 'fixed', display: 'table', width: '100%' }}
                                tbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                                rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                                selected={(item) => _.isEqual(item, selectedExternal)}
                        /> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {count > 0 ? <Paging Current={page + 1} Total={Math.ceil(count / RowsPerPage)} SetPage={(p) => setPage(p - 1)} /> : null}
                    </div>
                </div>
            </>

        </Modal>
    );
}

export default AdditionalFieldsKeyModal;