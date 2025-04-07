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

import { ReactIcons } from '@gpa-gemstone/gpa-symbols';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ServerErrorIcon } from '@gpa-gemstone/react-interactive';
import * as React from 'react';
import { OpenXDA as LocalXDA } from '../global';
import AdditionalFieldsTable from './AdditionalFieldsTable';

declare var homePath: string;

interface IProps {
    ID: number,
    Type: LocalXDA.AdditionalFieldType,
    Tab?: string
}

function AdditionalFieldsWindow(props: IProps): JSX.Element {
    const [hasPermissions, setHasPermissions] = React.useState<boolean>(true);
    const [changes, setChanges] = React.useState<string[]>([]);
    const [invalidChanges, setInvalidChanges] = React.useState<string[]>([]);

    const [hover, setHover] = React.useState<('None' | 'Save' | 'Clear')>('None');

    const saveCallback = React.useRef<{ cleanup: () => void, getHandle: () => Promise<void> }>({cleanup: undefined, getHandle: undefined});
    const resetCallback = React.useRef<() => (() => void)>(undefined);

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <h4>Additional Fields:</h4>
            </div>
            <div className="card-body" style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                <AdditionalFieldsTable
                    ID={props.ID}
                    Type={props.Type}
                    SaveFieldsCallback={saveCallback}
                    ResetFieldsCallback={resetCallback}
                    SetChangedMessageList={setChanges}
                    SetInvalidMessageList={setInvalidChanges}
                    SetHasEditPermissions={setHasPermissions}
                    HideExternal={false} />
            </div>
            <div className="card-footer">
                {hasPermissions ?
                    <>
                        <div className="btn-group mr-2">
                            <button
                                className={"btn btn-primary" + ((changes.length === 0 || invalidChanges.length > 0) ? ' disabled' : '')}
                                onClick={() => {
                                    if (changes.length > 0 && invalidChanges.length === 0 && saveCallback.current.getHandle != null)
                                        saveCallback.current.getHandle();
                                }}
                                onMouseEnter={() => setHover('Save')}
                                onMouseLeave={() => setHover('None')}
                                data-tooltip={'SaveValues'}
                            >Save Changes</button>
                            <ToolTip
                                Show={hover == 'Save' && (changes.length > 0 || !hasPermissions)}
                                Position={'top'}
                                Target={"SaveValues"}
                            >
                                {invalidChanges.map((change, index) => <p key={index}> <ReactIcons.CrossMark /> {change}</p>)}
                                {invalidChanges.length === 0 ? <p> <ReactIcons.CheckMark /> Save all changes made.</p> : <></>}
                            </ToolTip>
                        </div>
                        <div className="btn-group mr-2">
                            <button className={"btn btn-warning" + (changes.length === 0 ? ' disabled' : '')}
                                onClick={() => { if (changes.length > 0) resetCallback.current(); }}
                                onMouseEnter={() => setHover('Clear')}
                                onMouseLeave={() => setHover('None')}
                                data-tooltip={'Clear'}
                            >Clear Changes</button>
                            <ToolTip
                                Show={hover == 'Clear' && changes.length > 0}
                                Position={'top'}
                                Target={"Clear"}>
                                {changes.map((change, index) => <p key={index}> <ReactIcons.Warning /> {change}</p>)}
                            </ToolTip>
                        </div>
                    </> :
                    <ServerErrorIcon
                        Show={true}
                        Label={"Your role does not have permission. Please contact your Administrator if you believe this to be in error."}
                    />
                }
            </div>
        </div>);
}

export default AdditionalFieldsWindow;