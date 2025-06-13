//******************************************************************************************************
//  Reason.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  08/04/2021 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import { Modal } from '@gpa-gemstone/react-interactive';

const Reason = React.memo((props: { ID: number, Text: string, Disabled?: boolean, OnHover?: (ID: string | undefined) => void, OnClick?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, disabled: boolean) => void }) => {
    const [show, setShow] = React.useState<boolean>(false);

    const handleMouse = React.useCallback((id: string|undefined) => {
        if (props.OnHover == null) return;
        props.OnHover(id);
    }, [props.OnHover]);

    if (props.Text == '') return <>N/A</>;

    return (
        <div onMouseEnter={() => handleMouse(props.ID.toString())} onMouseLeave={() => handleMouse(undefined)}>
            <button className={`btn${props.Disabled ? ' disabled' : ''}`}
                onClick={evt => {
                    evt.preventDefault();
                    evt.stopPropagation();
                    if (props.OnClick != null) props.OnClick(evt, props.Disabled);
                    if (!props.Disabled) setShow(true);
                }}
                data-tooltip={(props.OnHover == null) ? undefined : props.ID.toString()}
            >...</button>
            <Modal
                Title={''}
                Show={show}
                ShowCancel={false}
                ShowConfirm={false}
                ShowX={true}
                Size='lg'
                CallBack={() => setShow(false)}
            >
                <p>{props.Text}</p>
            </Modal>
        </div>
    );
});

export default Reason;