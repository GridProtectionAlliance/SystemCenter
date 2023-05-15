// ******************************************************************************************************
//  GroupForm.tsx - Gbtc
//
//  Copyright © 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  02/23/2023 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************

import * as React from 'react';
import { Input, TextArea } from '@gpa-gemstone/react-forms'
import * as _ from 'lodash';
import { SecurityGroupSlice } from '../../Store/Store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ISecurityGroup } from '../Types';

interface IProps {
    Group: ISecurityGroup,
    Setter: (record: ISecurityGroup) => void,
    Edit: boolean,
    SetErrors?: (e: string[]) => void,
}

function GroupForm(props: IProps) {
    const dispatch = useAppDispatch();
    
    const allGroups = useAppSelector(SecurityGroupSlice.Data);
    const groupStatus = useAppSelector(SecurityGroupSlice.Status);

    const [errors, setErrors] = React.useState<string[]>([]);
    const [valid, setValid] = React.useState<'valid' | 'resolving' | 'invalid' | 'unknown'>("valid")

    React.useEffect(() => {
        if (groupStatus === 'unintiated' || groupStatus === 'changed')
            dispatch(SecurityGroupSlice.Fetch());
    }, [groupStatus]);

    React.useEffect(() => {
        if (props.SetErrors !== undefined)
            props.SetErrors(errors);
    }, [errors, props.SetErrors]);

    React.useEffect(() => {
        const h = validate();
        return () => { if (h != null && h.abort != null) h.abort(); }
    }, [props.Group.DisplayName, props.Group.Type])

    React.useEffect(() => {
        if (props.Group == null)
            return
        const e = [];
        if (props.Group.DisplayName == null || props.Group.DisplayName.length === 0)
            e.push('A Group Name is required.')
        if (props.Group.DisplayName != null && props.Group.DisplayName.length >= 200)
            e.push('Group Name must be less than 200 characters.')
        if (props.Group.DisplayName != null && allGroups.findIndex(g =>
            g.DisplayName.toLocaleLowerCase() == props.Group.DisplayName.toLocaleLowerCase() && props.Group.ID != g.ID) >= 0)
            e.push('A Group with this Name already exists.')
        if (props.Group.DisplayName != null && valid != 'valid' && props.Group.Type != 'Database')
            e.push('Group Name not found in Azure or AD.')
        setErrors(e);
    }, [props.Group, valid])

    function validate() {
        if (props.Group.Type == 'Database' || props.Group.DisplayName == null)
            return;

        setValid('resolving');

        return $.ajax({
            type: "POST",
            url: `${homePath}api/SystemCenter/FullSecurityGroup/Verify`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(props.Group.DisplayName),
            cache: false,
            async: true
        }).done((d) => {
            if (d == 1)
                setValid('valid');
            else
                setValid('invalid');
        }).fail((d) => {
            setValid('unknown')
        });;
    }

    if (props.Group == null) return null;

    return (
        <>
            <form>
                <div className="row">
                    <div className="col">
                        <Input<ISecurityGroup> Record={props.Group}
                            Disabled={props.Edit && props.Group.Type != 'Database'}
                            Label={'Name'}
                            Field={'DisplayName'}
                            Feedback={'A Name of less than 200 characters is required.'}
                            Valid={field => true}
                            Setter={ props.Setter }
                         />

                        <div className="row" style={{ position: 'absolute', top: 0, left: 100 }} hidden={props.Group.Type == 'Database'}>
                            <span id="resolvingAccount" hidden={valid != 'resolving'}><i style={{ height: 10, width: 10, color: 'grey' }}
                                className="fa fa fa-spin fa-refresh"></i>&nbsp;<em className="small">Resolving group details...</em></span>
                            <span id="accountValid" hidden={valid != 'valid'}><i style={{ height: 20, width: 20, color: 'green' }}
                                className="fa fa-check-circle"></i>&nbsp;<em className="small">Resolved group name.</em></span>
                            <span id="accountInvalid" hidden={valid != 'invalid'}><i style={{ height: 20, width: 20, color: 'red' }}
                                className="fa fa-times-circle"></i>&nbsp;<em className="small">Cannot resolve group name.</em></span>
                            <span id="accountUnknown" hidden={valid != 'unknown'}><i style={{ height: 20, width: 20, color: 'orange' }}
                                className="fa fa-exclamation-circle"></i>&nbsp;<em className="small">Valid group name is not in Active Directory access is limited.</em></span>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input disabled={props.Edit}
                                            className='form-check-input' type='radio'
                                            checked={props.Group.Type != 'Database'} onChange={(e) => {
                                                props.Setter({ ...props.Group, Type: e.target.checked ? 'Azure' : 'Database' });
                                    }} />Active Directory or Azure Group</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input disabled={props.Edit}
                                            className='form-check-input' type='radio'
                                            checked={props.Group.Type == 'Database'} onChange={(e) => {
                                                props.Setter({ ...props.Group, Type: e.target.checked ? 'Database' : props.Group.Type });
                                    }} />Database Group</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className={'col'}>
                                    <TextArea<ISecurityGroup> Rows={5} Setter={props.Setter}
                                        Field={'Description'} Record={props.Group}
                                        Disabled={props.Group.Type != 'Database'}
                                        Label={'Description'} Valid={() => true} />
                            </div>
                        </div>

                        

                    </div>
                </div>
            </form>
        </>
    );
}

export default GroupForm;
