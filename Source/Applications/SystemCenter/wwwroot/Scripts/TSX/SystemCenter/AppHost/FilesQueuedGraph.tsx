//******************************************************************************************************
//  FilesQueuedGraph.tsx - Gbtc
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
//  06/16/2026 - C Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react'
import moment from 'moment'
import { Application } from '@gpa-gemstone/application-typings';
import { Plot, Line } from '@gpa-gemstone/react-graph'
import { ErrorBoundary } from '@gpa-gemstone/common-pages'
import { LoadingIcon } from '@gpa-gemstone/react-interactive'

interface IQueueLength {
    Time: string,
    QueueLengthByPriority: [number, number][],
    TimeStamp?: number
}

interface IQueueData {
    Priority: number,
    Data: [number, number][]
}

interface IProps {
    Height: number
    Width: number,
}

const FilesProcessedGraph = (props: IProps) => {
    const [timeframe, setTimeframe] = React.useState<[number, number]>([moment().subtract(48, 'hour').startOf('hour').valueOf(), moment().add(1, 'hour').startOf('hour').valueOf()])
    const [status, setStatus] = React.useState<Application.Types.Status>('uninitiated')
    const [aggregateProcessedFiles, setAggregateProcessedFiles] = React.useState<IQueueData[]>([])

    React.useEffect(() => {

        setStatus('loading')

        const h = $.ajax({
            type: "GET",
            url: `${homePath}api/SystemCenter/AppHost/xda/AnalysisQueue/`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true,
        }).done((d) => {
            d = [{
                "Time": "2026-06-26T17:20:00.7262045Z", "QueueLengthByPriority": [[1,2],[2,4]]
            },
                { "Time": "2026-06-26T17:30:00.864999Z", "QueueLengthByPriority": [] },
                { "Time": "2026-06-26T17:40:00.9715697Z", "QueueLengthByPriority": [] },
                { "Time": "2026-06-26T17:50:01.0452418Z", "QueueLengthByPriority": [] },
                { "Time": "2026-06-26T18:00:01.1408426Z", "QueueLengthByPriority": [] },
                { "Time": "2026-06-26T18:10:01.2447126Z", "QueueLengthByPriority": [] },
                { "Time": "2026-06-26T18:20:01.3270705Z", "QueueLengthByPriority": [[1, 2], [2, 4]] },
                { "Time": "2026-06-26T18:30:01.4326519Z", "QueueLengthByPriority": [] },
                { "Time": "2026-06-26T18:40:01.5723178Z", "QueueLengthByPriority": [] },
                { "Time": "2026-06-26T18:50:01.6382969Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T19:00:01.7488933Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T19:10:01.8324206Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T19:20:01.9311452Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T19:30:02.0244847Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T19:40:02.0999393Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T19:50:02.1763185Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T20:00:02.3098917Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T20:10:02.4407199Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T20:20:02.5279963Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T20:30:02.6503604Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T20:40:02.7652884Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T20:50:02.9142392Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T21:00:02.983831Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T21:10:03.1087131Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T21:20:03.1919383Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T21:30:03.2849005Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T21:40:03.3994344Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T21:50:03.5074199Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T22:00:03.5931979Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T22:10:03.7024004Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T22:20:03.7897165Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T22:30:03.8731434Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T22:40:03.9773638Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T22:50:04.1024267Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T23:00:04.2048481Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T23:10:04.2699461Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T23:20:04.3402488Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T23:30:04.4485416Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T23:40:04.5714199Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-26T23:50:04.6884007Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T00:00:04.7887127Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T00:10:04.8964754Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T00:20:05.0039611Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T00:30:05.1036178Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T00:40:05.2020924Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T00:50:05.287831Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T01:00:05.4144441Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T01:10:05.5866953Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T01:20:05.7082338Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T01:30:05.8110138Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T01:40:05.9491209Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T01:50:06.0779423Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T02:00:06.1981536Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T02:10:06.2775759Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T02:20:06.3263541Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T02:30:06.454806Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T02:40:06.548903Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T02:50:06.6657157Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T03:00:06.761411Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T03:10:06.8741668Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T03:20:06.9712789Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T03:30:07.0921394Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T03:40:07.1804334Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T03:50:07.2692501Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T04:00:07.3617215Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T04:10:07.672013Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T04:20:07.5796843Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T04:30:07.6646013Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T04:40:07.8152153Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T04:50:07.8557734Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T05:00:08.0102508Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T05:10:08.0500638Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T05:20:09.7168005Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T05:30:08.281997Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T05:40:08.3914038Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T05:50:08.4794176Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T06:00:08.6079207Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T06:10:08.7363674Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T06:20:08.9475141Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T06:30:08.9719529Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T06:40:09.0807661Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T06:50:09.1503936Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T07:00:09.2833326Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T07:10:09.4227799Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T07:20:09.5245356Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T07:30:09.8151259Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T07:40:09.6844709Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T07:50:09.7812205Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T08:00:09.9491355Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T08:10:10.1321419Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T08:20:10.0921508Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T08:30:10.1748986Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T08:40:10.2575505Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T08:50:10.3484235Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T09:00:10.7028641Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T09:10:10.582765Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T09:20:10.9737533Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T09:30:10.761117Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T09:40:10.978689Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T09:50:11.0222829Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T10:00:11.1240583Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T10:10:11.2109949Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T10:20:11.338655Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T10:30:11.4692865Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T10:40:11.5170179Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T10:50:11.6034378Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T11:00:11.7027719Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T11:10:11.8016541Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T11:20:11.8894386Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T11:30:12.3112949Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T11:40:12.0867319Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T11:50:12.1713295Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T12:00:12.2841439Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T12:10:12.4300324Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T12:20:12.4857055Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T12:30:12.5802343Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T12:40:12.6768818Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T12:50:12.7414288Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T13:00:12.8411251Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T13:10:12.9066092Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T13:20:13.2456352Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T13:30:13.0162224Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T13:40:13.0697752Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T13:50:13.1404273Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T14:00:13.2170269Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T14:10:13.3212128Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T14:20:13.5694455Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T14:30:13.5766094Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T14:40:13.6665145Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T14:50:13.7783924Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T15:00:13.9792717Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T15:10:14.0206919Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T15:20:14.1658607Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T15:30:14.2362711Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T15:40:14.4417285Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T15:50:14.4592486Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T16:00:14.6198078Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T16:10:14.695471Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T16:20:14.926813Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T16:30:14.9262297Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T16:40:14.9965218Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T16:50:15.0793561Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T17:00:15.2800046Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T17:10:15.2579041Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T17:20:15.3850891Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T17:30:15.5569521Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T17:40:15.8537132Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T17:50:15.7455484Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T18:00:15.8494642Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T18:10:15.9897815Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T18:20:16.0536858Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T18:30:16.1406496Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T18:40:16.248855Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T18:50:16.3601212Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T19:00:16.4602694Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T19:10:16.5785358Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T19:20:16.7562021Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T19:30:16.7316254Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T19:40:16.8227481Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T19:50:16.907294Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T20:00:17.1290134Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T20:10:17.1891353Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T20:20:17.3206249Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T20:30:17.3977366Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T20:40:17.5866333Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T20:50:17.5783578Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T21:00:17.7969748Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T21:10:17.8318594Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T21:20:18.0682817Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T21:30:18.0722889Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T21:40:18.1721981Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T21:50:18.2771958Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T22:00:18.4938679Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T22:10:18.4897148Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T22:20:18.6763249Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T22:30:18.6770529Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T22:40:18.8972568Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T22:50:18.9085852Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T23:00:19.022452Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T23:10:19.1123135Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T23:20:19.3207205Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T23:30:19.3363925Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T23:40:19.4646319Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-27T23:50:19.5717701Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T00:00:19.6934416Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T00:10:19.9396049Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T00:20:19.9305748Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T00:30:19.9012003Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T00:40:20.1415526Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T00:50:20.1101701Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T01:00:20.2047244Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T01:10:20.43086Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T01:20:20.4447658Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T01:30:20.5643973Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T01:40:20.5982916Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T01:50:20.825242Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T02:00:20.8520911Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T02:10:20.923697Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T02:20:21.0003112Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T02:30:21.2654465Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T02:40:21.1677081Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T02:50:21.2850575Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T03:00:21.3884303Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T03:10:21.591254Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T03:20:21.583681Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T03:30:21.7296042Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T03:40:21.8286689Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T03:50:21.9462056Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T04:00:22.0782569Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T04:10:22.1500946Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T04:20:22.2244826Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T04:30:22.3514431Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T04:40:22.415968Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T04:50:22.5468615Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T05:00:22.6337226Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T05:10:22.8573378Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T05:20:22.8358676Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T05:30:22.9305497Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T05:40:23.1321502Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T05:50:23.2503334Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T06:00:23.2678145Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T06:10:23.4005163Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T06:20:23.4407644Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T06:30:23.767347Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T06:40:23.6803759Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T06:50:23.7735163Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T07:00:23.8277651Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T07:10:24.0072387Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T07:20:24.0321308Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T07:30:24.1519447Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T07:40:24.2754679Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T07:50:24.4782034Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T08:00:24.4731477Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T08:10:24.6761091Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T08:20:24.6935519Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T08:30:24.8858227Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T08:40:24.8417883Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T08:50:24.9960138Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T09:00:25.1171379Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T09:10:25.4747055Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T09:20:25.3907041Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T09:30:25.5090161Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T09:40:25.6170907Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T09:50:25.8486079Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T10:00:25.987839Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T10:10:26.0044945Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T10:20:26.121693Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T10:30:26.3463662Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T10:40:26.2690352Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T10:50:26.4643683Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T11:00:26.5521333Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T11:10:26.8932204Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T11:20:26.7493384Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T11:30:26.9216653Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T11:40:27.0820653Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T11:50:27.2241819Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T12:00:27.2042959Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T12:10:27.3222069Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T12:20:27.4245949Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T12:30:27.6564886Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T12:40:27.6364931Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T12:50:27.8674107Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T13:00:27.8552786Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T13:10:28.0025558Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T13:20:28.0037447Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T13:30:28.1355848Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T13:40:28.1733344Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T13:50:28.3853341Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T14:00:28.3857772Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T14:10:28.5012206Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T14:20:28.6718651Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T14:30:28.6646103Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T14:40:28.761586Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T14:50:28.8421301Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T15:00:28.9634448Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T15:10:29.0507465Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T15:20:29.1066891Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T15:30:29.3513247Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T15:40:29.3422015Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T15:50:29.4828568Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T16:00:29.5699829Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T16:10:29.6479846Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T16:20:29.7624545Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T16:30:29.9010543Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T16:40:30.0676775Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T16:50:30.185495Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T17:00:30.1476855Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T17:10:30.2316918Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T17:20:30.3621878Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T17:30:30.5749696Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T17:40:30.5509779Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T17:50:30.6575358Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T18:00:30.8134552Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T18:10:31.0600654Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T18:20:31.1535328Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T18:30:31.191157Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T18:40:31.2654643Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T18:50:31.4017308Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T19:00:31.558167Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T19:10:31.6767513Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T19:20:31.7054775Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T19:30:32.0112286Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T19:40:31.9312282Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T19:50:32.0398244Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T20:00:32.1196347Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T20:10:32.385348Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T20:20:32.3746662Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T20:30:32.4347155Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T20:40:32.5384055Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T20:50:32.7581343Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T21:00:32.7671207Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T21:10:32.8856737Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T21:20:33.0783446Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T21:30:33.1691595Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T21:40:33.1754741Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T21:50:33.2516963Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T22:00:33.3396605Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T22:10:33.5276513Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T22:20:33.5371682Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T22:30:33.6553099Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T22:40:33.755628Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T22:50:33.8779163Z", "QueueLengthByPriority": [] }, { "Time": "2026-06-28T23:00:34.0300774Z", "QueueLengthByPriority": [] }]

            const dat: IQueueData[] = [];
            let tmin = 0;
            let tmax = 0;
            d.forEach((c: IQueueLength) => {
                c.TimeStamp = moment.utc(c.Time).valueOf();
                if (tmin > c.TimeStamp || tmin == 0)
                    tmin = c.TimeStamp;
                if (tmax < c.TimeStamp)
                    tmax = c.TimeStamp;


                c.QueueLengthByPriority.forEach(qlbp => {
                    const i = dat.findIndex(item => item.Priority == qlbp[0])
                    if (i > -1)
                        dat[i].Data.push([c.TimeStamp, qlbp[1]]);
                    else
                        dat.push({ Priority: qlbp[0], Data: [[c.TimeStamp, qlbp[1]]] })
                });
            }
            )
            setTimeframe([tmin, tmax])
            setAggregateProcessedFiles(dat);
            setStatus('idle');
        }).fail(() => {
            setStatus('error')
        })

        return () => { if (h.abort != null) h.abort(); }

    }, [])

    return <ErrorBoundary
        ErrorMessage={"Files Queued Graph has encountered an error."}
    >
        {status === "loading" ?
            <LoadingIcon
                Show={true}
                Size={40}
            /> :
            <>
                <div className="row">
                    <div className="col">
                        <h6>Current Tasks Queued</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Plot
                            height={props.Height}
                            width={props.Width}
                            defaultTdomain={timeframe}
                            onTDomainChange={setTimeframe}
                            legend={'right'}
                            zoom={false}
                            yZoom={false}
                            xZoom={false}
                            Tmin={timeframe[0]}
                            Tmax={timeframe[1]}
                            yDomain={'HalfAutoValue'}
                            Ylabel={'Tasks Queued'}
                            pan={false}
                            useUTC={false}
                            Tlabel={''}
                        >
                            {aggregateProcessedFiles.map((a) =>
                                <Line
                                    legend={getPriorityText(a.Priority)}
                                    data={a.Data}
                                    color={getPriorityColor(a.Priority)}
                                    showPoints={true}
                                    key={a.Priority}
                                    lineStyle={'-'}
                                >
                                </Line>
                            )}
                        </Plot>
                    </div>
                </div>

            </>
        }
    </ErrorBoundary>
}


export default FilesProcessedGraph

const getPriorityText = (priority: number ) => {
    if (priority == 1)
        return "Enumeration";
    if (priority == 2)
        return "Normal";
    if (priority == 3)
        return "High";
    if (priority == 2)
        return "Manual";

    return "Unknown";
}


const getPriorityColor = (priority: number) => {
    if (priority == 3) // High Priority
        return "#f8f9fa";
    if (priority == 2) //Normal Priority
        return "#0dcaf0";
    if (priority == 1) // Enumeration
        return "#0d6efd";
    if (priority == 4) // Manual Requeue
        return "#ffc107";
    return "#ffc107";
}
