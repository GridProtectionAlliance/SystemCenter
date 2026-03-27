//******************************************************************************************************
//  SentEmailTimeline.tsx - Gbtc
//
//  Copyright © 2026, Grid Protection Alliance.  All Rights Reserved.
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
//  03/25/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import { SentEmail } from '../global'
import * as $ from 'jquery'
import { Application } from '@gpa-gemstone/application-typings'
import { Table, Column } from '@gpa-gemstone/react-table'
import moment from 'moment';
import { Modal } from '@gpa-gemstone/react-interactive'
import { Plot } from '@gpa-gemstone/react-graph'

interface TimelineItem {
    Timestamp: string,
    Description: string,
    ID: number
}


interface IProps {
    SentEmail: SentEmail
    Show: boolean
    CallBack: ((confirmed: boolean, isButton: boolean, tertiary: boolean) => void)
}

const SentEmailTimeline = (props: IProps) => {

    const [emailTimeline, setEmailTimeline] = React.useState<TimelineItem[]>(null)
    const [state, setState] = React.useState<Application.Types.Status>("uninitiated")
    const [sortKey, setSortKey] = React.useState<keyof TimelineItem>('Timestamp')
    const [ascending, setAscending] = React.useState<boolean>(false)


    React.useEffect(() => {
        if (props.SentEmail == null) return;
        let handle = getTimeline();
        handle.done((dt: string) => {
            const eventResults = JSON.parse(dt) as TimelineItem[];
            setEmailTimeline(eventResults);
            setState('idle');
        }).fail((d) => setState('error'));

        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        }
    }, [props.SentEmail, sortKey, ascending])


    const getTimeline = () => {
        return $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/SentEmail/Timeline/${props.SentEmail.ID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
            data: JSON.stringify({"Ascending": ascending, "OrderBy": sortKey})
        });
    }

    return (
        <Modal
            Title={"Email Timeline"}
            Show={props.Show}
            CallBack={props.CallBack}
            Size={'xlg' }
        >
            {state !== 'idle' ? <></> :
                <Table<TimelineItem>
                    TableClass="table table-hover"
                    Data={emailTimeline}
                    SortKey={sortKey.toString()}
                    Ascending={ascending}
                    OnSort={(d) => {
                        if (d.colKey === sortKey.toString()) setAscending(ascending => !ascending);
                        else setSortKey(d.colField);
                    }}
                                KeySelector={(item) => item.ID}
                    TableStyle={{
                        padding: 0, width: 'calc(100%)', height: 'calc(100% - 16px)',
                        tableLayout: 'fixed', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                    }}
                    TheadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    TbodyStyle={{ display: 'block', overflowY: 'scroll', flex: 1 }}
                    RowStyle={{ display: 'table', tableLayout: 'fixed', width: '100%' }}
                    Selected={(item) => false}
                >
                    <Column<TimelineItem>
                        Key={'Description'}
                        AllowSort={true}
                        Field={'Description'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                    > Description
                    </Column>
                    <Column<TimelineItem>
                        Key={'Timestamp'}
                        AllowSort={true}
                        Field={'Timestamp'}
                        HeaderStyle={{ width: 'auto' }}
                        RowStyle={{ width: 'auto' }}
                        Content={({ item, field }) => {
                            return <span className={`badge badge-pill badge-light`}>{moment(item[field]).format('MM/DD/YYYY HH:mm:ss')}</span>
                        }}
                    > Timestamp
                    </Column>
                </Table>
            }
        </Modal>
    )
}

export default SentEmailTimeline;