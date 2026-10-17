//******************************************************************************************************
//  GenericInfo.tsx - Gbtc
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
//  09/10/2026 - Natalie Beatty
//       Generated original version of source code.
//
//******************************************************************************************************

import * as React from 'react';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';

interface IProps<T> {
    /**
     * Forms to display within the tab.
     */
    Forms: Array<(record: T, setter: React.Dispatch<React.SetStateAction<T>>, setErrors: React.Dispatch<React.SetStateAction<string[]>>) => React.ReactNode>
    /**
     * Determine whether the user has permissions to edit the record.
     */
    HasPermissions: () => boolean
    /**
     * User-facing name for the record type.
     */
    RecordType: string
    /**
     * Record to edit in the form and send as the new version of the model in a patch.
     */
    SelectedRecord: T
    /**
     * Setter for the selected record.
     */
    SetSelectedRecord: React.Dispatch<React.SetStateAction<T>>
    /**
     * List of errors for the selected record.
     */
    Errors: string[]
    /**
     * Setter for the errors
     */
    SetErrors: React.Dispatch<React.SetStateAction<string[]>>
    /**
     * List of warnings for the selected record.
     */
    Warnings: string[]
    /**
     * Callback to set Selected Record back to its original state.
     */
    ClearChanges: () => void;
    /**
     * Callback to patch the original record to reflect changes made on the selected record.
     */
    Patch: () => void;
}

/**
 * A generic tab for record of type T for viewing and editing fields of the record.
 * @param props
 * @returns
 */
function GenericInfo<T,>({
    Forms,
    HasPermissions,
    RecordType,
    SelectedRecord,
    SetSelectedRecord,
    Errors,
    SetErrors,
    Warnings,
    ClearChanges,
    Patch
}: React.PropsWithChildren<IProps<T>>) {
    const [hover, setHover] = React.useState<('None' | 'Clear' | 'Submit')>('None');

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>{RecordType} Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                {
                    Forms.map((form) => {
                        return form(SelectedRecord, SetSelectedRecord, SetErrors)
                    })
                }
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (Warnings.length == 0 || Errors.length > 0 ? ' disabled' : '')} onClick={() => {
                        if (Warnings.length > 0 && Errors.length == 0) {
                           Patch();
                        }
                    }}
                        onMouseEnter={() => setHover('Submit')} onMouseLeave={() => setHover('None')} data-tooltip={"Update"}
                    >Save Changes</button>
                </div>
                <ToolTip Show={hover == 'Submit' && Errors.length > 0} Position={'top'} Target={"Update"}>
                    {Errors.map((t, i) => <p key={`a_${i}`}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
                </ToolTip>
                <ToolTip Show={hover == 'Submit' && !HasPermissions()} Position={'top'} Target={"Update"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className="btn btn-warning" onClick={() => {
                        if (Warnings.length > 0) {
                            ClearChanges();
                        }
                    }
                    } disabled={Warnings.length == 0}
                        onMouseEnter={() => setHover('Clear')} onMouseLeave={() => setHover('None')} data-tooltip={"Clr"}
                    >Clear Changes</button>
                </div>
                <ToolTip Show={hover == 'Clear' && Warnings.length > 0} Position={'top'} Target={"Clr"}>
                    {Warnings.map((t, i) => <p key={`a_${i}`}><ReactIcons.Warning Color="var(--warning)" /> {t}</p>)}
                </ToolTip>
            </div>
        </div>
    );
}

export default GenericInfo;