//******************************************************************************************************
//  TestEmail.tsx - Gbtc
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
//  05/05/2022 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { Warning, Modal } from '@gpa-gemstone/react-interactive'
import { Application } from '@gpa-gemstone/application-typings';
import { UserInfoSlice } from '../Store';
import { EmailType } from '../global';
import { CrossMark } from '@gpa-gemstone/gpa-symbols';
import EventSelect from './TriggerUI/EventSelect';
import * as $ from 'jquery';

declare var homePath;
declare var version;

interface IProps { show: boolean, record: EmailType, OnClose: () => void  }

const TestEmail = (props: IProps) => {
    const dispatch = useDispatch();
    const [eventID, setEventID] = React.useState<number>(-1);
    const [showWarning, setShowWarning] = React.useState<boolean>(false);
    const userID = useSelector(UserInfoSlice.UserAccountID);
    let portalID: string = "TestEmailOuter";

    React.useEffect(() => {
        if (!props.show)
            setEventID(-1);
    }, [props.show])

    function sendEmail() {
        const handle = $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/EmailType/Test/${eventID}/${props.record.ID}/${userID}`,
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true,
            
        })
    }

    return (
        <div id={portalID}>
            <Modal Show={props.show} ShowX={true} ShowCancel={false}
                ConfirmShowToolTip={eventID == -1}
                DisableConfirm={eventID == -1}
                Size={'lg'} Title={'Select an Event for Testing'}
                ConfirmToolTipContent={<p> {CrossMark} An Event has to be selected </p>}
                CallBack={(c) => { if (c) setShowWarning(true); else props.OnClose(); }}
                ConfirmText={'Send'}
            >
                <div style={{ height: innerHeight - 250 }}>
                    <EventSelect SelectedEventID={eventID} SetSelectedEvent={setEventID} SetStatus={() => { }} TriggerSQL={props.record.TriggerEmailSQL} RenderPortalId={portalID}/>
                </div>
            </Modal>
            <Warning Message={'This will send an email to the email address associated with your account.'} Show={showWarning} Title={'Send Test Email '}
                CallBack={(conf) => { if (conf) sendEmail(); setShowWarning(false);  props.OnClose(); }} />
        </div>)
}

export default TestEmail;