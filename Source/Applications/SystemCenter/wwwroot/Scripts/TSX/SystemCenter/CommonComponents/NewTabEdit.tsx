//******************************************************************************************************
//  ByCustomer.tsx - Gbtc
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
//  08/16/2024 - Collins Self
//       Generated original version of source code.
//
//******************************************************************************************************

import { ReactIcons } from "@gpa-gemstone/gpa-symbols";
import * as React from 'react'

interface IProps {
    ItemID: number;
    PageLinkName: string;
    IDLinkName: string;
}

const NewTabEdit: React.FC<IProps> = (props) => {
    const [newTabLinkColor, setNewTabLinkColor] = React.useState('black');
    const [pencilLinkColor, setPencilLinkColor] = React.useState('black');
    const link: string = `${homePath}index.cshtml?name=${props.PageLinkName}&${props.IDLinkName}=${props.ItemID}`;

    return (
        <div className={"btn-group btn-group-sm"}>
            <button type="button" className={"btn"} onClick={() => setPencilLinkColor('#007bff')}>
                <a href={link}>
                    <ReactIcons.Pencil Color={pencilLinkColor} />
                </a>
            </button>
            <button type="button" className={"btn dropdown-toggle-split"} onClick={() => setNewTabLinkColor('#007bff')}>
                <a href={link} target='_blank'>
                    <ReactIcons.LinkNewTab  Color={newTabLinkColor} />
                </a>
            </button>
        </div>
    );
}

export default NewTabEdit