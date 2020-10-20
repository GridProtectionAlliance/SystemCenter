//******************************************************************************************************
//  ParameterSearch.tsx - Gbtc
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
//  10/15/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
import * as React from 'react';
import * as _ from 'lodash';

export interface ISearch { Field: string, SearchText: string }
interface IProps { getData: (serachData: Array<ISearch>) => void, Fields: Array<{ key: string, label: string }>, defaultField?: string }

function ParameterSearch(props: IProps) {
    const [search, setSearch] = React.useState<Array<ISearch>>([{ Field: (props.defaultField != undefined ? props.defaultField : props.Fields[0].key), SearchText: '' }]);


    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ width: '100%' }}>
            <ul className="navbar-nav mr-auto" style={{ width: '100%' }}>
                <li className="nav-item" style={{ width: '60%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Search: </legend>
                        <form>
                            {
                                search.map((s, index, a) => {

                                    return (
                                        <div className="input-group" key={index} style={{ border: '1px solid lightgray' }}>
                                            <div className="input-group-prepend">
                                                <select className='form-control' style={{ height: '100%' }} value={s.Field as string} onChange={(evt) => {
                                                    let array = _.clone(a);
                                                    s.Field = evt.target.value;
                                                    setSearch(array);
                                                }}>
                                                    {props.Fields.map(item => <option key={item.key} value={item.key}>{item.label}</option>)}
                                                </select>
                                            </div>
                                            <input className='form-control' type='text' placeholder='Search...' value={s.SearchText} onChange={(evt) => {

                                                s.SearchText = evt.target.value;
                                                let array = _.clone(a);
                                                setSearch(array);
                                            }} onKeyDown={evt => {
                                                if (evt.keyCode == 13) {
                                                    evt.preventDefault();
                                                    props.getData(search);
                                                }
                                            }} />
                                            <div className="input-group-append">
                                                <button className="btn btn-danger" type="button" onClick={(evt) => {
                                                    let array = _.clone(a);
                                                    array.splice(index, 1);
                                                    setSearch(array);
                                                }}><span><i className="fa fa-times"></i></span></button>
                                            </div>
                                        </div>
                                    )
                                })

                            }
                        </form>
                    </fieldset>
                </li>
                <li className="nav-item" style={{ width: '40%', paddingRight: 10 }}>
                    <fieldset className="border" style={{ padding: '10px', height: '100%' }}>
                        <legend className="w-auto" style={{ fontSize: 'large' }}>Search Params:</legend>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-primary" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                    event.preventDefault();
                                    let array = _.clone(search);
                                    array.push({ Field: (props.defaultField != undefined ? props.defaultField : props.Fields[0].key), SearchText: '' });
                                    setSearch(array);
                                }}>Add Parameter</button>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                    event.preventDefault();
                                    props.getData(search);
                                }}>Update Search</button>
                            </div>
                        </form>
                    </fieldset>
                </li>
            </ul>
        </div>
    </nav>)
} 

export default ParameterSearch;