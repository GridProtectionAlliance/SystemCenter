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
import { LoadingIcon, Modal, ServerErrorIcon, Search } from '@gpa-gemstone/react-interactive';
import { result } from 'lodash';
import ResultDisplay from '../ExternalDB/TableTesting/ResultDisplay';

declare var homePath: string;

interface IProps {
    KeyField?: SystemCenter.Types.AdditionalFieldView,
    SetKeyFieldValue: (val: string) => void,
    Show: boolean,
    SetShow: (show: boolean) => void
}


function AdditionalFieldsKeyModal(props: IProps): JSX.Element {
    const [selectedExternal, setSelectedExternal] = React.useState<any>(undefined);

    const [dataStatus, setDataStatus] = React.useState<Application.Types.Status>('unintiated');
    const [countStatus, setCountStatus] = React.useState<Application.Types.Status>('unintiated');
    
    const getData = (start: number, end: number, filters: Search.IFilter<any>[], orderBy: string, asc: boolean) => {
        setDataStatus('loading');
        const handle = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/extDBTables/RetrieveTable/${props.KeyField?.ExternalDBTableID ?? null}/${start}/${end}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Ascending: asc, OrderBy: orderBy, Searches: filters }),
            cache: true,
            async: true
        })
            .done((d) => { if (d.length > 0 && d[0][props.KeyField.FieldName] === undefined) setDataStatus('error')
            else setDataStatus('idle'); return d }).fail((d) => { setDataStatus('error') });

        return handle
    };

    const getCount = (filters: Search.IFilter<any>[]) => {
        setCountStatus('loading');
        const handle = $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/extDBTables/RetrieveTableCount/${props.KeyField.ExternalDBTableID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Ascending: false, OrderBy: '', Searches: filters }),
            cache: true,
            async: true
        }).done((d) => { setCountStatus('idle'); return d }).fail((d) => { setCountStatus('error') })
        return handle;
    };
  
    React.useEffect(() => {
        if (props.Show && dataStatus === 'error') {
            setDataStatus('unintiated');
        }
    }, [props.Show])

    let title = `Select Key Field Value for ${props.KeyField?.FieldName}`;
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
            ConfirmBtnClass={countStatus === 'error' || dataStatus === 'error' ? 'btn btn-danger' : 'btn btn-primary'}
            DisableConfirm={selectedExternal === undefined}
            ConfirmText={countStatus === 'error' || dataStatus === 'error' ? 'Close' : 'Select'}
            BodyStyle={{ maxHeight: 'calc(100vh - 210px)', display: 'flex', flexDirection: 'column' }}
        >
            {dataStatus !== 'error' ? <ResultDisplay
                TableID={props.KeyField?.ExternalDBTableID}
                GetCount={getCount}
                GetTable={getData}
                Selected={(item) => _.isEqual(item, selectedExternal)}
                OnSelection={setSelectedExternal}
                ForceReload={props.Show} />
            : <ServerErrorIcon Show={dataStatus === 'error'} Label={'The external table is not set up properly. Please check the external database and table configuration'} />
            }
        </Modal>
    );
}

export default AdditionalFieldsKeyModal;