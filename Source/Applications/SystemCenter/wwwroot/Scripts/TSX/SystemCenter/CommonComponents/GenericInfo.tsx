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
import { useAppSelector } from '../hooks';
import { SelectRoles } from '../Store/UserSettings';
import { ToolTip } from '@gpa-gemstone/react-forms';
import { ReactIcons } from '@gpa-gemstone/gpa-symbols';

interface IProps<T> {
    /**
     * The record as it exists in the database.
     */
    Record: T
    /**
     * User-facing name for the type of record.
     */
    RecordType: string
    /**
     * Callback for saving changes to the record
     * @param record
     * @returns
     */
    Patch: (record: T) => void
    /**
     * Callback for clearing changes to the record.
     * @returns
     */
    Clear?: () => void
    /**
     * Forms to display within the tab.
     */
    Forms: Array<(record: T, setter: React.Dispatch<React.SetStateAction<T>>, setErrors: React.Dispatch<React.SetStateAction<string[]>>, setChanged: React.Dispatch<React.SetStateAction<string[]>>) => React.ReactNode>
    /**
     * Errors outside of the record of type T. For example, additional fields would propagate their errors through this list.
     */
    AdditionalErrors: string[] 
    /**
     * Warnings of changed fields outside of the record of type T. For example, changed additional fields would add a warning to this list.
     */
    AdditionalWarnings: string[]
}

/**
 * A generic tab for record of type T for viewing and editing fields of the record.
 * @param props
 * @returns
 */
function GenericInfo<T,>(props: React.PropsWithChildren<IProps<T>>) {
    const [record, setRecord] = React.useState<T>(props.Record);
    const [warnings, setWarning] = React.useState<string[]>([]);
    const [errors, setError] = React.useState<string[]>([]);
    const [hover, setHover] = React.useState<('None' | 'Clear' | 'Submit')>('None');
    const roles = useAppSelector(SelectRoles);

    React.useEffect(() => {
        setRecord(props.Record)
    }, [props.Record])

    // look into checking key name against label.
    React.useEffect(() => {
        Object.keys(record).forEach((key) => {
            if (!(key in (record as object))) return
            const originalValue = props.Record[key];
            const warning = `Changes to ${key} will be lost.`;
            if (originalValue != record[key]) setWarning(warnings => warnings.findIndex(warn => warn === warning) < 0 ? [...warnings, warning] : warnings);
            else setWarning(warnings => warnings.filter(warn => warn != warning))
        })
    }, [record, props.Record])

    function hasPermissions(): boolean {
        if (roles.indexOf('Administrator') < 0 && roles.indexOf('Engineer') < 0)
            return false;
        return true;
    }

    return (
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <h4>{props.RecordType} Information:</h4>
                    </div>
                </div>
            </div>
            <div className="card-body" style={{ flex: 1, overflowY: 'auto' }}>
                {
                    props.Forms.map((form) => {
                        return form(record, setRecord, setError, setWarning)
                    })
                }
            </div>
            <div className="card-footer">
                <div className="btn-group mr-2">
                    <button className={"btn btn-primary" + (((warnings.length + props.AdditionalWarnings.length) == 0 || (errors.length + props.AdditionalErrors.length) > 0 ) ? ' disabled' : '')} onClick={() => {
                        if ((warnings.length + props.AdditionalWarnings.length) > 0  && (errors.length + props.AdditionalErrors.length) == 0) {
                            props.Patch(record);
                        }
                    }}
                        onMouseEnter={() => setHover('Submit')} onMouseLeave={() => setHover('None')} data-tooltip={"Update"}
                    >Save Changes</button>
                </div>
                <ToolTip Show={hover == 'Submit' && (errors.length + props.AdditionalErrors.length) > 0} Position={'top'} Target={"Update"}>
                    {errors.map((t, i) => <p key={i}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
                    {props.AdditionalErrors.map((t, i) => <p key={`a_${i}`}><ReactIcons.CrossMark Color="var(--danger)" /> {t}</p>)}
                </ToolTip>
                <ToolTip Show={hover == 'Submit' && !hasPermissions()} Position={'top'} Target={"Update"}>
                    <p>Your role does not have permission. Please contact your Administrator if you believe this to be in error.</p>
                </ToolTip>
                <div className="btn-group mr-2">
                    <button className="btn btn-warning" onClick={() => {
                        if ((warnings.length + props.AdditionalWarnings.length) > 0) {
                            if (props.Clear != null) props.Clear();
                            setRecord(props.Record);
                        }
                    }
                    } disabled={(warnings.length + props.AdditionalWarnings.length) == 0}
                        onMouseEnter={() => setHover('Clear')} onMouseLeave={() => setHover('None')} data-tooltip={"Clr"}
                    >Clear Changes</button>
                </div>
                <ToolTip Show={hover == 'Clear' && (warnings.length + props.AdditionalWarnings.length) > 0} Position={'top'} Target={"Clr"}>
                    {warnings.map((t, i) => <p key={i}><ReactIcons.Warning Color="var(--warning)" /> {t}</p>)}
                    {props.AdditionalWarnings.map((t, i) => <p key={`a_${i}`}><ReactIcons.Warning Color="var(--warning)" /> {t}</p>)}
                </ToolTip>
            </div>
        </div>
    );
}

export default GenericInfo;