//******************************************************************************************************
//  AdditionalFieldsWindow.tsx - Gbtc
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
//  01/28/2020 - Billy Ernest
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
    const [externalData, setExternalData] = React.useState<any[]>(undefined);
    const [selectedExternal, setSelectedExternal] = React.useState<any>(undefined);
    const [ascExt, setAscExt] = React.useState<boolean>(false);
    const [sortExt, setSortExt] = React.useState<string>("");

    React.useEffect(() => {
        if (props.Show)
            setStatus('unintiated');
    }, [props.Show]);

    React.useEffect(() => {
        if (props.Show && status === 'unintiated' || status === 'changed') {
            const handle = getExternalData();
            // ToDo: Cleanup function running unexecptedly before component close
            // return (() => { if (handle != null && handle.abort != null) handle.abort(); });
        }
    }, [props.Show, status]);

    React.useEffect(() => {
        setExternalData(_.orderBy(externalData, [sortExt], [ascExt ? 'asc' : 'desc']));
    }, [ascExt, sortExt]);

    const getExternalData = React.useCallback(() => {
        if (props.KeyField?.ExternalDBTableID == null) {
            setStatus('error');
            return;
        };
        setStatus('loading');
        let handle = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/extDBTables/RetrieveTable/${props.KeyField.ExternalDBTableID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((extData: any[]) => {
            console.log(extData);
            if (extData != null && extData.length !== 0) {
                setStatus('idle');
                setExternalData(extData);
            } else
                setStatus('error');
        });
        handle.fail(() => {
            setStatus('error');
        });
        return handle;
    }, [homePath, setStatus, setExternalData, props.KeyField]);

    const searchTable = React.useCallback((item, search) => {
        if (props.KeyField?.FieldName == null) return true;
        return item[props.KeyField.FieldName].match(search);
    }, [props.KeyField]);

    const getModalInner = React.useCallback(() => {
        switch (status) {
            case 'error':
                return (
                    <div style={{ width: '100%', height: '200px' }}>
                        <div style={{ height: '40px', marginLeft: 'auto', marginRight: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                            <ServerErrorIcon Show={true} Size={40}
                                Label={'Could not query external database table associated with this field. Please contact your administrator.'} />
                        </div>
                    </div>);
            default: case 'loading':
                return (
                    <div style={{ width: '100%', height: '200px', opacity: 0.5, backgroundColor: '#000000', }}>
                        <div style={{ height: '40px', width: '40px', margin: 'auto', marginTop: 'calc(50% - 20 px)' }}>
                            <LoadingIcon Show={true} Size={40} />
                        </div>
                    </div>);
            case 'idle':
                if (externalData == null || externalData.length === 0) return null;
                return (
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
                        selected={(item) => _.isEqual(item, selectedExternal) } />);
        }
    }, [status, externalData, setSelectedExternal, selectedExternal, sortExt, ascExt, searchTable]);

    return (
        <Modal Title={status !== 'error' ? `Select External Record to Key to Local Record Using Field ${props.KeyField?.FieldName}` : "External Query Failure"} ShowCancel={status !== 'error'} ShowX={true} CallBack={(conf) => {
            props.SetShow(false);
            if (conf) props.SetKeyFieldValue(selectedExternal[props.KeyField.FieldName]);
        }} Show={props.Show} Size={'xlg'} ConfirmBtnClass={status !== 'error' ? undefined : 'btn btn-secondary'} ConfirmText={status !== 'error' ? undefined : 'Close'}>
            {getModalInner()}
        </Modal>
    );
}

export default AdditionalFieldsKeyModal;