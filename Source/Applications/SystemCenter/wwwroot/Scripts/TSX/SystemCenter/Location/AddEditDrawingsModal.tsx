//******************************************************************************************************
//  LocationDrawings.tsx - Gbtc
//
//  Copyright � 2023, Grid Protection Alliance.  All Rights Reserved.
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
//  11/06/2024 - Collins Self
//       Generated original version of source code.
//
//******************************************************************************************************
import { SystemCenter } from "@gpa-gemstone/application-typings";
import { Input, Select } from "@gpa-gemstone/react-forms";
import { Modal } from "@gpa-gemstone/react-interactive";
import React from "react";

interface IProps {
    Record: SystemCenter.Types.LocationDrawing,
    Setter: (record) => void,
    Valid: (field) => boolean,
    HandleSave: () => void,
    Show: boolean,
    SetShow: (show: boolean) => void,
}

const AddEditDrawingsModal = (props: IProps) => { // Change to modal
    const [category, setCategory] = React.useState<Array<SystemCenter.Types.ValueListItem>>([]);

    function getValueList(listName: string, setter: (value: Array<SystemCenter.Types.ValueListItem>) => void): JQuery.jqXHR<Array<SystemCenter.Types.ValueListItem>> {
        let h = $.ajax({
            type: "GET",
            url: `${homePath}api/ValueList/Group/${listName}`,
            contentType: "application/json; charset=utf-8",
            dataType: `json`,
            cache: false,
            async: true
        });
        h.done((dCat: Array<SystemCenter.Types.ValueListItem>) => {
            setter(dCat);

        });
        return h;
    }

    React.useEffect(() => {
        let categoryHandle = getValueList("Category", setCategory);

        return () => {
            if (categoryHandle != null && categoryHandle.abort != null) categoryHandle.abort();
        }
    }, [])

    return <>
        <Modal
            Show={props.Show}
            Title={'Add/Edit Drawing'}
            ShowX={true} Size={'sm'}
            CallBack={(conf) => {
                props.SetShow(false);
                if (conf) props.HandleSave();
            }}
            ShowCancel={true}
            ConfirmText={'Save Changes'}>
            <Input<SystemCenter.Types.LocationDrawing>
                Record={props.Record}
                Field={'Name'}
                Feedback={'A Name of less than 200 characters is required.'}
                Valid={props.Valid}
                Setter={(r) => props.Setter(r)} />
            <Input<SystemCenter.Types.LocationDrawing>
                Record={props.Record}
                Field={'Link'}
                Feedback={'A Link is required.'}
                Valid={props.Valid}
                Setter={(r) => props.Setter(r)} />
            <Input<SystemCenter.Types.LocationDrawing>
                Record={props.Record}
                Field={'Description'}
                Valid={props.Valid}
                Setter={(r) => props.Setter(r)} />
            <Select<SystemCenter.Types.LocationDrawing>
                Record={props.Record}
                Field={'Category'}
                Options={category.map(item => { return { Value: item.Value, Label: item.AltValue ?? item.Value } })}
                Label={'Category'}
                Setter={(r) => props.Setter(r)} />
            <Input<SystemCenter.Types.LocationDrawing>
                Record={props.Record}
                Field={'Number'}
                Feedback={'Number must be less than 50 characters.'}
                Valid={props.Valid}
                AllowNull={true}
                Setter={(r) => props.Setter(r)} />
        </Modal>
    </>
}
export default AddEditDrawingsModal;