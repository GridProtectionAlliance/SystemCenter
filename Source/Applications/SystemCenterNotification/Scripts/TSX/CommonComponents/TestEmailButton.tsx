//******************************************************************************************************
//  TestEmailButton.tsx - Gbtc
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
//  02/07/2025 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import * as $ from 'jquery';
import { LoadingIcon, Modal, SearchBar, Warning } from '@gpa-gemstone/react-interactive';
import { Application } from '@gpa-gemstone/application-typings';

const TestEmailButton = (props: {}) => {
    const [showTest, setShowTest] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string | undefined>(undefined);
    const [status, setStatus] = React.useState<Application.Types.Status>('idle');

    return (
        <>
            <button className="btn btn-info btn-block" onClick={(event) => {
                setShowTest(true);
                event.preventDefault();
            }}>
                Send Test Email
            </button>
            <Warning Title={'Send Test Email'} CallBack={confirmed => {
                if (confirmed) {
                    setStatus('loading');
                    $.ajax({
                        type: "GET",
                        url: `${homePath}api/Setting/TestSMTPServer`,
                        contentType: "application/json; charset=utf-8",
                        cache: false,
                        async: true
                    }).then((response: string) => {
                        if (response != '1') {
                            setMessage(response);
                            setStatus('changed');
                        } else {
                            setMessage("Email has been successfully sent, please check your inbox.");
                            setStatus("changed");
                        }
                    }, () => {
                        setMessage("Unable to contact SystemCenter Notifications.");
                        setStatus('changed');
                    })
                }
                setShowTest(false);
            }} Show={showTest} Message={'Really Send Email?'} />
            <Modal Show={status !== 'idle'}
                Title={status !== 'loading' ? 'Operation Complete' : 'Sending email...'}
                ShowX={true}
                ShowCancel={false}
                ShowConfirm={false}
                CallBack={() => { setStatus('idle'); setMessage(undefined); }}>
                {status !== 'loading' ? message : <LoadingIcon Show={true} />}
            </Modal>
        </>
    );
}

export default TestEmailButton;