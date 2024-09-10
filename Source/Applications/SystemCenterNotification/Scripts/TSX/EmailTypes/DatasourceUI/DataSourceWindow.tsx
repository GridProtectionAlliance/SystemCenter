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
import { EmailType, IDataSourceTriggeredEmailType } from '../../global';
import { TriggeredEmailDataSourceSlice } from '../../Store';
import DataSourceModal from './DataSourceModal';
import { ReactTable } from '@gpa-gemstone/react-table';
import DataSourceTesting from './DataSourceTesting';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { Warning } from '@gpa-gemstone/react-interactive';


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
    const [showRemoveWarning, setShowRemoveWarning] = React.useState<boolean>(false);
    const [showDataSourceModal, setShowDataSourceModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (status == 'unintiated' || status == 'changed' || emailID !== props.Record.ID)
            dispatch(TriggeredEmailDataSourceSlice.Fetch(props.Record.ID));
    }, [status, props.Record.ID, emailID, dataSource]);

    return (
        <div className="container-fluid d-flex h-100 flex-column" style={{ height: 'inherit' }}>
            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                <div className="card" style={{ width: '100%', height: '100%' }}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-6">
                                <h4>Data Sources:</h4>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-info float-right" style={{ marginRight: 10 }} onClick={() => setShowTest(true)}>Test Data Sources</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ paddingTop: 10, paddingBottom: 0, overflow: 'hidden' }}>
                        <div className="container-fluid d-flex h-100 flex-column" style={{ padding: 0 }}>
                            <div className="row" style={{ flex: 1, overflow: 'hidden' }}>
                                <div className="col-12" style={{ height: '100%', overflow: 'hidden' }}>
                                    <ReactTable.Table<IDataSourceTriggeredEmailType>
                                        TableClass="table table-hover"
                                        Data={data}
                                        SortKey={''}
                                        Ascending={false}
                                        OnSort={() => { }}
                                        OnClick={(item) => {setDataSource(item.row); /*setShowDataSourceModal(true)*/}}
                                        TableStyle={{
                                            padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                                            tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                                        }}
                                        TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                                        RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                                        Selected={(item) => false}
                                        KeySelector={(item, index) => index}
                                    >
                                        <ReactTable.Column<IDataSourceTriggeredEmailType>
                                            Key={'TriggeredEmailDataSourceName'}
                                            AllowSort={false}
                                            Field={'TriggeredEmailDataSourceName'}
                                            HeaderStyle={{ width: '100%' }}
                                            RowStyle={{ width: '100%' }}
                                        > Data Source
                                        </ReactTable.Column>
                                        <ReactTable.Column<IDataSourceTriggeredEmailType>
                                            Key={'Remove'}
                                            AllowSort={true}
                                            HeaderStyle={{ width: '20%' }}
                                            RowStyle={{ width: '20%' }}
                                            Content={({ item }) => <>
                                                <button className="btn btn-sm mr-1"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setDataSource(item);
                                                        setShowRemoveWarning(true);
                                                    }
                                                }><span><ReactIcons.TrashCan /></span>
                                                </button>
                                                <button className="btn btn-sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setDataSource(item);
                                                        setShowDataSourceModal(true);
                                                    }
                                                }><span><ReactIcons.Pencil /></span>
                                                </button>
                                            </>}
                                        >
                                        </ReactTable.Column>
                                    </ReactTable.Table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group mr-2">
                            <button className={"btn btn-info"} type="submit"
                                onClick={() => {
                                    setDataSource({ 
                                        EmailTypeID: props.Record.ID, 
                                        ID: -1, TriggeredEmailDataSourceID: -1, 
                                        TriggeredEmailDataSourceName: '' }
                                    );
                                    setShowDataSourceModal(true);
                                }
                            }>Add Data Source
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Warning Show={showRemoveWarning} Title={'Remove Source'} Message={`Are you sure you want to remove this data source?`}
                CallBack={(c) => {
                    if (c) 
                        dispatch(TriggeredEmailDataSourceSlice.DBAction({
                            verb: 'DELETE', record: dataSource
                        }));
                   setShowRemoveWarning(false);
                    
                }}
            ></Warning>
            <DataSourceModal Show={showDataSourceModal} Record={dataSource} OnClose={() => {setShowDataSourceModal(false)}} /> {/* //!Shows when delete is pressed */}
            <DataSourceTesting Show={showTest} Record={props.Record} OnClose={() => setShowTest(false)} />
        </div>
    )
}

export default DataSourceWindow;
