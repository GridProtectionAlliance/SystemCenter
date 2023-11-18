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
import Table, { SearchableTable } from '@gpa-gemstone/react-table';

declare var homePath: string;

interface IProps {
    KeyField: SystemCenter.Types.AdditionalFieldView,
    SetKeyFieldValue: (val: string) => void,
    Show: boolean,
    SetShow: (show: boolean) => void,
}

function AdditionalFieldsKeyModal(props: IProps): JSX.Element {
    const [status, setStatus] = React.useState<Application.Types.Status>('unintiated');
    const [externalData, setExternalData] = React.useState<any[]>([]);
    const [selectedExternal, setSelectedExternal] = React.useState<any>(undefined);
    const [ascExt, setAscExt] = React.useState<boolean>(false);
    const [sortExt, setSortExt] = React.useState<string>("");
    const [count, setCount] = React.useState<number>(0);

    React.useEffect(() => {
        if (props.Show)
            setStatus('changed');
    }, [props.Show]);

    React.useEffect(() => {
        if (status !== 'unintiated' && status !== 'changed')
            return;
        if (props.KeyField == null) 
            return;
        
        const dataHandle = getData();
        const countHandle = getCount();

        Promise.all([dataHandle, countHandle]).then(() => { setStatus('idle') }, () => setStatus('error'))
        return () => {
            if (dataHandle != null && dataHandle.abort != null) dataHandle.abort()
            if (countHandle != null && countHandle.abort != null) countHandle.abort()
        }
    }, [status]);

    React.useEffect(() => {
        setExternalData(_.orderBy(externalData, [sortExt], [ascExt ? 'asc' : 'desc']));
    }, [ascExt, sortExt]);

    const getData = () => {
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/extDBTables/RetrieveTable/${props.KeyField?.ExternalDBTableID ?? null}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.then((extData: any[]) => {
            setExternalData(extData);
        });

        return handle;
    };

    const getCount = () => {
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/extDBTables/RetrieveTableCount/${props.KeyField.ExternalDBTableID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
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
    if (status === 'error')
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
            ConfirmBtnClass={status !== 'error' ? undefined : 'btn btn-secondary'}
            ConfirmText={status !== 'error' ? 'Select' : 'Close'}>
            <ServerErrorIcon Show={status === 'error'} Size={40}
                Label={'Could not query external database table associated with this field. Please contact your administrator.'}
            />
            <LoadingIcon Show={status === 'loading'} Size={40} />
            {status == 'idle' ?
                <SearchableTable<any>
                    cols={
                        Object.keys(externalData[0]).map((field: string) => {
                            return { key: field, field: field, label: field }
                        })}
                    tableClass="table table-hover"
                    data={externalData}
                    sortKey={sortExt}
                    ascending={ascExt}
                    matchSearch={searchTable}
                    onSort={(d) => {
                        if (d.colKey === sortExt)
                            setAscExt(!ascExt);
                        else {
                            setAscExt(true);
                            setSortExt(d.colKey);
                        }
                    }}
                    onClick={(d) => { setSelectedExternal(d.row); }}
                    theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                    tbodyStyle={{ display: 'block', width: '100%', overflowX: 'scroll' }}
                    rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%', overflowX: 'scroll' }}
                    selected={(item) => _.isEqual(item, selectedExternal)}
                    lastRow={<p> found {count} records</p>}
                />
                    : null}
        </Modal>
    );
}

export default AdditionalFieldsKeyModal;