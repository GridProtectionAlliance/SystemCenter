//******************************************************************************************************
//  DataSourceWindow.tsx - Gbtc
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
//  07/26/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useAppDispatch, useAppSelector } from '../../hooks';
import * as React from 'react';
import {ToolTip, Warning } from '@gpa-gemstone/react-interactive'
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import {  EmailType, IDataSourceTriggeredEmailType, IEvent } from '../../global';
import {  EmailTypeSlice, TriggeredEmailDataSourceSlice } from '../../Store';
import DataSourceModal from './DataSourceModal';
import Table from '@gpa-gemstone/react-table';
import DataSourceTesting from './DataSourceTesting';


declare var homePath;
declare var version;

interface IProps { Record: EmailType}


const DataSourceWindow = (props: IProps) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(TriggeredEmailDataSourceSlice.Status);
    const data = useAppSelector(TriggeredEmailDataSourceSlice.Data);
    const emailID = useAppSelector(TriggeredEmailDataSourceSlice.ParentID);
    const [dataSource, setDataSource] = React.useState<null | IDataSourceTriggeredEmailType>(null);
    const [showTest, setShowTest] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || emailID !== props.Record.ID)
            dispatch(TriggeredEmailDataSourceSlice.Fetch(props.Record.ID));
    }, [status, props.Record.ID, emailID]);

    return ( <>
        <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>Data Sources:</h4>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary float-right" style={{ marginRight: 10 }} onClick={() => setShowTest(true)}>Test Data Sources</button>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <Table<IDataSourceTriggeredEmailType>
                            cols={[
                                { key: 'TriggeredEmailDataSourceName', field: 'TriggeredEmailDataSourceName', label: 'DataSource', headerStyle: { width: '100%' }, rowStyle: { width: '100%' } },
                            ]}
                            tableClass="table table-hover"
                            data={data}
                            sortKey={''}
                            ascending={false}
                            onSort={(d) => { }}
                            onClick={(item) => { setDataSource(item.row); }}
                            theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            tbodyStyle={{ display: 'block', overflowY: 'scroll', height: 'calc(100 % - 50 px)', width: '100%' }}
                            rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                            selected={() => false}
                        />
                   </div>      
                </div>
               
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary"}
                        type="submit"
                        onClick={() => setDataSource({ EmailTypeID: props.Record.ID, ID: -1, TriggeredEmailDataSourceID: -1, TriggeredEmailDataSourceName: '' })} >Add DataSource</button>
                </div>
            </div>

        </div>
        <DataSourceModal Record={dataSource} OnClose={() => setDataSource(null)} />
        <DataSourceTesting Record={props.Record} OnClose={() => setShowTest(false)} Show={showTest}/>;
        </>
        )
}

export default DataSourceWindow;
