(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Asset~Company~Customer~Location~Meter"],{

/***/ "./TSX/SystemCenter/CommonComponents/AdditionalFieldsWindow.tsx":
/*!**********************************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/AdditionalFieldsWindow.tsx ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _FormInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _FormCheckBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FormCheckBox */ "./TSX/SystemCenter/CommonComponents/FormCheckBox.tsx");
/* harmony import */ var _FormSelect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormSelect */ "./TSX/SystemCenter/CommonComponents/FormSelect.tsx");
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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};






function AdditionalFieldsWindow(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), valueListGroups = _a[0], setValueListGroups = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), additionalFields = _b[0], setAdditionalFields = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), additionalFieldValues = _c[0], setAdditionalFieldVaules = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), edit = _d[0], setEdit = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), changed = _e[0], setChanged = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]({ ID: 0, FieldName: '', Type: 'string', OpenXDAParentTable: props.Type, ExternalDB: '', ExternalDBTable: '', ExternalDBTableKey: '', IsSecure: false }), 2), newField = _f[0], setNewField = _f[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return getData();
    }, [props.ID, props.Type, props.Tab]);
    function getData() {
        var handle1 = getFields();
        var handle2 = getFieldValues();
        var handle3 = getValueLists();
        setChanged(false);
        setNewField({ ID: 0, FieldName: '', Type: 'string', OpenXDAParentTable: props.Type, ExternalDB: '', ExternalDBTable: '', ExternalDBTableKey: '', IsSecure: false });
        return function () {
            if (handle1.abort != undefined)
                handle1.abort();
            if (handle2.abort != undefined)
                handle2.abort();
            if (handle3.abort != undefined)
                handle3.abort();
        };
    }
    function getFields() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/AdditionalField/ParentTable/" + props.Type,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.done(function (data) {
            setAdditionalFields(data);
        });
        return handle;
    }
    function getFieldValues() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/AdditionalFieldValue/" + props.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.done(function (data) {
            setAdditionalFieldVaules(data);
        });
        return handle;
    }
    function getValueLists() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/ValueListGroup",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.done(function (data) {
            setValueListGroups(data);
        });
        return handle;
    }
    function addOrUpdateValues() {
        $.ajax({
            type: "PATCH",
            url: homePath + "api/SystemCenter/AdditionalFieldValue/Array",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(additionalFieldValues),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (e) {
            getData();
        });
    }
    function addNewField() {
        $.ajax({
            type: "PATCH",
            url: homePath + "api/SystemCenter/AdditionalField/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(newField),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (e) {
            getData();
        });
    }
    function deleteField(field) {
        var response = confirm("This will delete the field '" + field.FieldName + "' from all " + props.Type + "s and will also delete all information assigned to these fields");
        if (!response)
            return;
        $.ajax({
            type: "DELETE",
            url: homePath + "api/SystemCenter/AdditionalField/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(field),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (e) {
            getData();
        });
    }
    function editField(field) {
        setNewField(field);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Additional Fields:")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, (edit) ?
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default pull-right", onClick: function () { return setEdit(false); } }, "View") :
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () { return setEdit(true); } }, "Edit")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: 'table' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Field"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 150 } }, "Ext DB"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 100 } }, "Type"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 300 } }, "Value"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 30 } }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 30 } }))),
                    (edit) ?
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, additionalFields.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](TableRowInput, { key: i, ParentTableID: props.ID, Field: a, Values: additionalFieldValues, Setter: function (values) {
                                setAdditionalFieldVaules(values);
                                setChanged(true);
                            }, DeleteField: deleteField, EditField: editField }); })) :
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, additionalFields.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ViewTableRowInput, { key: i, ParentTableID: props.ID, Field: a, Values: additionalFieldValues }); }))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#newField", disabled: !edit }, "Add Field")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: addOrUpdateValues, disabled: !changed || !edit }, "Save Changes")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: getFieldValues, disabled: !changed || !edit }, "Reset"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "newField" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, "Additional Field"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: newField, Field: 'FieldName', Valid: function (field) { return true; }, Label: "Field Name", Setter: setNewField }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FormSelect__WEBPACK_IMPORTED_MODULE_5__["default"], { Record: newField, Field: 'Type', Options: [{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }].concat(valueListGroups.filter(function (x) { return x.Enabled; }).map(function (x) { return { Value: x.Name, Label: x.Name }; })), Label: "Field Type", Setter: setNewField }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: newField, Field: 'ExternalDB', Valid: function (field) { return true; }, Label: "External Database", Setter: setNewField }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: newField, Field: 'ExternalDBTable', Valid: function (field) { return true; }, Label: "External Database Table", Setter: setNewField }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: newField, Field: 'ExternalDBTableKey', Valid: function (field) { return true; }, Label: "External Database Table Key", Setter: setNewField }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FormCheckBox__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: newField, Field: 'IsSecure', Label: "Secure Data", Setter: setNewField })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addNewField }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close")))))));
}
/* harmony default export */ __webpack_exports__["default"] = (AdditionalFieldsWindow);
function TableRowInput(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), valueListItems = _a[0], setValueListItems = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if ((["integer", "number", "boolean", "string"]).indexOf(props.Field.Type) < 0) {
            var handle_1 = $.ajax({
                type: "GET",
                url: homePath + "api/ValueList/Group/" + props.Field.Type,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            });
            handle_1.done(function (vl) {
                setValueListItems(vl);
            });
            return function () {
                if (handle_1.abort != undefined)
                    handle_1.abort();
            };
        }
    }, [props.Field.Type]);
    function Valid(type) {
        if (type == "integer")
            return value.Value == null || _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(value.Value);
        else if (type == "number")
            return value.Value == null || _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(value.Value);
        else if (type == "boolean")
            return true;
        else
            return true;
    }
    var values = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Values);
    var value = values.find(function (value) { return value.AdditionalFieldID == props.Field.ID; });
    if (value == null) {
        value = { ID: 0, AdditionalFieldID: props.Field.ID, OpenXDAParentTableID: props.ParentTableID, Value: null };
        values.push(value);
    }
    if ((["integer", "number", "boolean", "string"]).indexOf(props.Field.Type) < 0) {
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.FieldName),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.ExternalDB),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.Type),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, ((["integer", "number", "boolean", "string"]).indexOf(props.Field.Type) >= 0 ?
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (Valid(props.Field.Type) ? "form-control" : "form-control is-invalid"), onChange: function (evt) {
                    if (evt.target.value != "")
                        value.Value = evt.target.value;
                    else
                        value.Value = null;
                    props.Setter(values);
                }, value: value.Value == null ? '' : value.Value.toString() })
            :
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: (value.Value != null ? value.Value : ''), onChange: function (evt) {
                        if (evt.target.value != "")
                            value.Value = evt.target.value;
                        else
                            value.Value = null;
                        props.Setter(values);
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: '' }),
                    valueListItems.map(function (x) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: x.ID, value: x.Text }, x.Text); })))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", "data-toggle": 'modal', "data-target": "#newField", onClick: function (e) { return props.EditField(props.Field); } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-pencil" })))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return props.DeleteField(props.Field); } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
}
function ViewTableRowInput(props) {
    var values = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Values);
    var value = values.find(function (value) { return value.AdditionalFieldID == props.Field.ID; });
    if (value == null) {
        return (null);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.FieldName),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.ExternalDB),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.Type),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, value.Value != null ? value.Value.toString() : ''),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null)));
}


/***/ }),

/***/ "./TSX/SystemCenter/CommonComponents/FormSelect.tsx":
/*!**********************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/FormSelect.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  FormSelect.tsx - Gbtc
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
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var FormSelect = /** @class */ (function (_super) {
    __extends(FormSelect, _super);
    function FormSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormSelect.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, this.props.Label == null ? this.props.Field : this.props.Label),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", onChange: function (evt) {
                    var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.Record);
                    if (evt.target.value != "")
                        record[_this.props.Field] = evt.target.value;
                    else
                        record[_this.props.Field] = null;
                    _this.props.Setter(record);
                }, value: this.props.Record[this.props.Field] == null ? '' : this.props.Record[this.props.Field].toString(), disabled: this.props.Disabled == null ? false : this.props.Disabled },
                (this.props.EmptyOption ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: '' }) : null),
                this.props.Options.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: i, value: a.Value }, a.Label); })));
    };
    return FormSelect;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (FormSelect);


/***/ }),

/***/ "./TSX/SystemCenter/CommonComponents/NoteWindow.tsx":
/*!**********************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/NoteWindow.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
//******************************************************************************************************
//  AssetNote.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};

function NoteWindow(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](0), 2), noteTypeID = _a[0], setNoteTypeID = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), tableRows = _b[0], setTableRows = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](''), 2), note = _c[0], setNote = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](0), 2), count = _d[0], setCount = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getNoteTypeID();
        getNotes();
    }, [props.ID]);
    function handleEdit(d) {
        setNote(d.Note);
        deleteNote(d);
    }
    function getNotes() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Note/ForObject/" + props.Type + "/" + props.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data) {
            var rows = data.map(function (d) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: d.ID },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, d.Note),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, moment.utc(d.Timestamp).format("MM/DD/YYYY HH:mm")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, d.UserAccount),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return handleEdit(d); } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-pencil" }))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return deleteNote(d); } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))); });
            setTableRows(rows);
            setCount(rows.length);
        });
        ;
    }
    function getNoteTypeID() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/NoteType",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data) {
            var record = data.find(function (d) { return d.ReferenceTableName == props.Type; });
            setNoteTypeID(record.ID);
        });
        ;
    }
    function deleteNote(d) {
        $.ajax({
            type: "DELETE",
            url: homePath + "api/OpenXDA/Note/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(d),
            cache: true,
            async: true
        }).done(function () { return getNotes(); });
    }
    function addNote() {
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Note/Add",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: 0, NoteTypeID: noteTypeID, ReferenceTableID: props.ID, Note: note, Timestamp: moment().format('MM/DD/YYYY HH:mm'), UserAccount: '' }),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (e) {
            setNote('');
            getNotes();
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Notes:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 420, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: '50%' } }, "Note"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Time"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "User"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, tableRows))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { className: "form-control", rows: 4, value: note, onChange: function (e) { return setNote(e.target.value); } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: addNote, style: { cursor: note.length == 0 ? 'not-allowed' : 'pointer' }, disabled: note.length == 0 }, "Add Note")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return setNote(''); }, style: { cursor: note.length == 0 ? 'not-allowed' : 'pointer' }, disabled: note.length == 0 }, "Clear")))));
}
/* harmony default export */ __webpack_exports__["default"] = (NoteWindow);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvQWRkaXRpb25hbEZpZWxkc1dpbmRvdy50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL0Zvcm1TZWxlY3QudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9Ob3RlV2luZG93LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLHFDQUFxQztBQUNyQyxFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBRTBCO0FBQ2xCO0FBQ007QUFDSjtBQUt0QyxTQUFTLHNCQUFzQixDQUFDLEtBQTZEO0lBRW5GLHNFQUE4RixFQUE3Rix1QkFBZSxFQUFFLDBCQUE0RSxDQUFDO0lBQy9GLHNFQUFpRyxFQUFoRyx3QkFBZ0IsRUFBRSwyQkFBOEUsQ0FBQztJQUNsRyxzRUFBZ0gsRUFBL0csNkJBQXFCLEVBQUUsZ0NBQXdGLENBQUM7SUFDakgseUVBQWdELEVBQS9DLFlBQUksRUFBRSxlQUF5QyxDQUFDO0lBQ2pELHlFQUFzRCxFQUFyRCxlQUFPLEVBQUUsa0JBQTRDLENBQUM7SUFDdkQsME5BQTZOLEVBQTVOLGdCQUFRLEVBQUUsbUJBQWtOLENB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RUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFtQixDQUNsSztZQUNOLDZEQUFLLFNBQVMsRUFBQyxnQkFBZ0I7Z0JBQzNCLGdFQUFRLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxPQUFPLEVBQUUsY0FBTSxjQUFPLENBQUMsRUFBRSxDQUFDLEVBQVgsQ0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQWdCLENBQ3pLLENBQ0osQ0FDSixDQUNULENBQUM7QUFDTixDQUFDO0FBRWMseUVBQVUsRUFBQyIsImZpbGUiOiJBc3NldH5Db21wYW55fkN1c3RvbWVyfkxvY2F0aW9ufk1ldGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBBZGRpdGlvbmFsRmllbGRzV2luZG93LnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzI4LzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7U3lzdGVtQ2VudGVyLCBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuL0Zvcm1JbnB1dCc7XG5pbXBvcnQgRm9ybUNoZWNrQm94IGZyb20gJy4vRm9ybUNoZWNrQm94JztcbmltcG9ydCBGb3JtU2VsZWN0IGZyb20gJy4vRm9ybVNlbGVjdCc7XG5cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5kZWNsYXJlIHR5cGUgQWRkaXRpb25hbEZpZWxkVHlwZSA9ICdNZXRlcicgfCAnTG9jYXRpb24nIHwgJ0N1c3RvbWVyJ3wgJ0NvbXBhbnknIHwgJ0xpbmUnIHwgJ0J1cycgfCAnQnJlYWtlcicgfCAnVHJhbnNmb3JtZXInIHwgJ0xpbmVTZWdtZW50JyB8ICdDYXBhY2l0b3JCYW5rJyB8ICdBc3NldCcgfCAnQ2FwYWNpdG9yQmFua1JlbGF5J1xuXG5mdW5jdGlvbiBBZGRpdGlvbmFsRmllbGRzV2luZG93KHByb3BzOiB7IElEOiBudW1iZXIsIFR5cGU6IEFkZGl0aW9uYWxGaWVsZFR5cGUsIFRhYjogc3RyaW5nIH0pOiBKU1guRWxlbWVudCB7XG5cbiAgICBjb25zdCBbdmFsdWVMaXN0R3JvdXBzLCBzZXRWYWx1ZUxpc3RHcm91cHNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U3lzdGVtQ2VudGVyLlZhbHVlTGlzdEdyb3VwPj4oW10pO1xuICAgIGNvbnN0IFthZGRpdGlvbmFsRmllbGRzLCBzZXRBZGRpdGlvbmFsRmllbGRzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQ+PihbXSk7XG4gICAgY29uc3QgW2FkZGl0aW9uYWxGaWVsZFZhbHVlcywgc2V0QWRkaXRpb25hbEZpZWxkVmF1bGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGRWYWx1ZT4+KFtdKTtcbiAgICBjb25zdCBbZWRpdCwgc2V0RWRpdF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2NoYW5nZWQsIHNldENoYW5nZWRdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNvbnN0IFtuZXdGaWVsZCwgc2V0TmV3RmllbGRdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZD4oe0lEOiAwLCBGaWVsZE5hbWU6ICcnLCBUeXBlOiAnc3RyaW5nJywgT3BlblhEQVBhcmVudFRhYmxlOiBwcm9wcy5UeXBlLCBFeHRlcm5hbERCOiAnJywgRXh0ZXJuYWxEQlRhYmxlOiAnJywgRXh0ZXJuYWxEQlRhYmxlS2V5OiAnJywgSXNTZWN1cmU6IGZhbHNlIH0pO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGdldERhdGEoKTtcbiAgICB9LCBbcHJvcHMuSUQsIHByb3BzLlR5cGUsIHByb3BzLlRhYl0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICAgICAgbGV0IGhhbmRsZTEgPSBnZXRGaWVsZHMoKTtcbiAgICAgICAgbGV0IGhhbmRsZTIgPSBnZXRGaWVsZFZhbHVlcygpO1xuICAgICAgICBsZXQgaGFuZGxlMyA9IGdldFZhbHVlTGlzdHMoKTtcblxuICAgICAgICBzZXRDaGFuZ2VkKGZhbHNlKTtcbiAgICAgICAgc2V0TmV3RmllbGQoeyBJRDogMCwgRmllbGROYW1lOiAnJywgVHlwZTogJ3N0cmluZycsIE9wZW5YREFQYXJlbnRUYWJsZTogcHJvcHMuVHlwZSwgRXh0ZXJuYWxEQjogJycsIEV4dGVybmFsREJUYWJsZTogJycsIEV4dGVybmFsREJUYWJsZUtleTogJycsIElzU2VjdXJlOiBmYWxzZSB9KTtcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGhhbmRsZTEuYWJvcnQgIT0gdW5kZWZpbmVkKSBoYW5kbGUxLmFib3J0KCk7XG4gICAgICAgICAgICBpZiAoaGFuZGxlMi5hYm9ydCAhPSB1bmRlZmluZWQpIGhhbmRsZTIuYWJvcnQoKTtcbiAgICAgICAgICAgIGlmIChoYW5kbGUzLmFib3J0ICE9IHVuZGVmaW5lZCkgaGFuZGxlMy5hYm9ydCgpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZHMoKTogSlF1ZXJ5LmpxWEhSIHtcbiAgICAgICAgbGV0IGhhbmRsZSA9ICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0FkZGl0aW9uYWxGaWVsZC9QYXJlbnRUYWJsZS8ke3Byb3BzLlR5cGV9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pXG5cbiAgICAgICAgaGFuZGxlLmRvbmUoKGRhdGE6IEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQ+KSA9PiB7XG4gICAgICAgICAgICBzZXRBZGRpdGlvbmFsRmllbGRzKGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkVmFsdWVzKCk6IEpRdWVyeS5qcVhIUiB7XG5cbiAgICAgICAgbGV0IGhhbmRsZSA9ICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0FkZGl0aW9uYWxGaWVsZFZhbHVlLyR7cHJvcHMuSUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pXG5cbiAgICAgICAgaGFuZGxlLmRvbmUoKGRhdGE6IEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGRWYWx1ZT4pID0+IHtcbiAgICAgICAgICAgIHNldEFkZGl0aW9uYWxGaWVsZFZhdWxlcyhkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRWYWx1ZUxpc3RzKCk6IEpRdWVyeS5qcVhIUiB7XG5cbiAgICAgICAgbGV0IGhhbmRsZSA9ICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvVmFsdWVMaXN0R3JvdXBgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSlcblxuICAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogQXJyYXk8U3lzdGVtQ2VudGVyLlZhbHVlTGlzdEdyb3VwPikgPT4ge1xuICAgICAgICAgICAgc2V0VmFsdWVMaXN0R3JvdXBzKGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gYWRkT3JVcGRhdGVWYWx1ZXMoKTogdm9pZCB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQWRkaXRpb25hbEZpZWxkVmFsdWUvQXJyYXlgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYWRkaXRpb25hbEZpZWxkVmFsdWVzKSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoZSA9PiB7XG4gICAgICAgICAgICBnZXREYXRhKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE5ld0ZpZWxkKCk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0FkZGl0aW9uYWxGaWVsZC9VcGRhdGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobmV3RmllbGQpLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZShlID0+IHtcbiAgICAgICAgICAgIGdldERhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlRmllbGQoZmllbGQ6IFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIlRoaXMgd2lsbCBkZWxldGUgdGhlIGZpZWxkICdcIiArIGZpZWxkLkZpZWxkTmFtZSArIFwiJyBmcm9tIGFsbCBcIiArIHByb3BzLlR5cGUgKyBcInMgYW5kIHdpbGwgYWxzbyBkZWxldGUgYWxsIGluZm9ybWF0aW9uIGFzc2lnbmVkIHRvIHRoZXNlIGZpZWxkc1wiKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlKSByZXR1cm47XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0FkZGl0aW9uYWxGaWVsZC9EZWxldGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZmllbGQpLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZShlID0+IHtcbiAgICAgICAgICAgIGdldERhdGEoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlZGl0RmllbGQoZmllbGQ6IFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQpOiB2b2lkIHtcbiAgICAgICAgc2V0TmV3RmllbGQoZmllbGQpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5BZGRpdGlvbmFsIEZpZWxkczo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoZWRpdCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0KGZhbHNlKX0+VmlldzwvYnV0dG9uPiA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+IHNldEVkaXQodHJ1ZSl9PkVkaXQ8L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT0ndGFibGUnPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGg+RmllbGQ8L3RoPjx0aCBzdHlsZT17eyB3aWR0aDogMTUwIH19PkV4dCBEQjwvdGg+PHRoIHN0eWxlPXt7IHdpZHRoOiAxMDB9fT5UeXBlPC90aD48dGggc3R5bGU9e3sgd2lkdGg6IDMwMCB9fT5WYWx1ZTwvdGg+PHRoIHN0eWxlPXt7IHdpZHRoOiAzMCB9fT48L3RoPjx0aCBzdHlsZT17e3dpZHRoOiAzMH19PjwvdGg+PC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICB7KGVkaXQpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRpdGlvbmFsRmllbGRzLm1hcCgoYSwgaSkgPT4gPFRhYmxlUm93SW5wdXQga2V5PXtpfSBQYXJlbnRUYWJsZUlEPXtwcm9wcy5JRH0gRmllbGQ9e2F9IFZhbHVlcz17YWRkaXRpb25hbEZpZWxkVmFsdWVzfSBTZXR0ZXI9eyh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFkZGl0aW9uYWxGaWVsZFZhdWxlcyh2YWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2hhbmdlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gRGVsZXRlRmllbGQ9e2RlbGV0ZUZpZWxkfSBFZGl0RmllbGQ9e2VkaXRGaWVsZH0gLz4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRpdGlvbmFsRmllbGRzLm1hcCgoYSwgaSkgPT4gPFZpZXdUYWJsZVJvd0lucHV0IGtleT17aX0gUGFyZW50VGFibGVJRD17cHJvcHMuSUR9IEZpZWxkPXthfSBWYWx1ZXM9e2FkZGl0aW9uYWxGaWVsZFZhbHVlc30gLz4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD1cIiNuZXdGaWVsZFwiIGRpc2FibGVkPXshZWRpdH0+QWRkIEZpZWxkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17YWRkT3JVcGRhdGVWYWx1ZXN9IGRpc2FibGVkPXshY2hhbmdlZCB8fCAhZWRpdH0+U2F2ZSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e2dldEZpZWxkVmFsdWVzfSBkaXNhYmxlZD17IWNoYW5nZWQgfHwgIWVkaXR9PlJlc2V0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIGlkPVwibmV3RmllbGRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+QWRkaXRpb25hbCBGaWVsZDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkPiBSZWNvcmQ9e25ld0ZpZWxkfSBGaWVsZD0nRmllbGROYW1lJyBWYWxpZD17KGZpZWxkKSA9PiB0cnVlfSBMYWJlbD1cIkZpZWxkIE5hbWVcIiBTZXR0ZXI9e3NldE5ld0ZpZWxkfSAvPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVNlbGVjdDxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkPiBSZWNvcmQ9e25ld0ZpZWxkfSBGaWVsZD0nVHlwZScgT3B0aW9ucz17W3sgVmFsdWU6ICdzdHJpbmcnLCBMYWJlbDogJ3N0cmluZycgfSwgeyBWYWx1ZTogJ2ludGVnZXInLCBMYWJlbDogJ2ludGVnZXInIH0sIHsgVmFsdWU6ICdudW1iZXInLCBMYWJlbDogJ251bWJlcicgfV0uY29uY2F0KHZhbHVlTGlzdEdyb3Vwcy5maWx0ZXIoeCA9PiB4LkVuYWJsZWQpLm1hcCh4ID0+IHsgcmV0dXJuIHsgVmFsdWU6IHguTmFtZSwgTGFiZWw6IHguTmFtZSB9IH0pKX0gTGFiZWw9XCJGaWVsZCBUeXBlXCIgU2V0dGVyPXtzZXROZXdGaWVsZH0gLz4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkPiBSZWNvcmQ9e25ld0ZpZWxkfSBGaWVsZD0nRXh0ZXJuYWxEQicgVmFsaWQ9eyhmaWVsZCkgPT4gdHJ1ZX0gTGFiZWw9XCJFeHRlcm5hbCBEYXRhYmFzZVwiIFNldHRlcj17c2V0TmV3RmllbGR9IC8+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZD4gUmVjb3JkPXtuZXdGaWVsZH0gRmllbGQ9J0V4dGVybmFsREJUYWJsZScgVmFsaWQ9eyhmaWVsZCkgPT4gdHJ1ZX0gTGFiZWw9XCJFeHRlcm5hbCBEYXRhYmFzZSBUYWJsZVwiIFNldHRlcj17c2V0TmV3RmllbGR9IC8+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZD4gUmVjb3JkPXtuZXdGaWVsZH0gRmllbGQ9J0V4dGVybmFsREJUYWJsZUtleScgVmFsaWQ9eyhmaWVsZCkgPT4gdHJ1ZX0gTGFiZWw9XCJFeHRlcm5hbCBEYXRhYmFzZSBUYWJsZSBLZXlcIiBTZXR0ZXI9e3NldE5ld0ZpZWxkfSAvPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNoZWNrQm94PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQ+IFJlY29yZD17bmV3RmllbGR9IEZpZWxkPSdJc1NlY3VyZScgTGFiZWw9XCJTZWN1cmUgRGF0YVwiIFNldHRlcj17c2V0TmV3RmllbGR9IC8+IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9e2FkZE5ld0ZpZWxkfSA+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFkZGl0aW9uYWxGaWVsZHNXaW5kb3c7XG5cbmZ1bmN0aW9uIFRhYmxlUm93SW5wdXQocHJvcHM6IHsgUGFyZW50VGFibGVJRDogbnVtYmVyLCBGaWVsZDogU3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZCwgVmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkVmFsdWU+LCBTZXR0ZXI6ICh2YWx1ZXM6IEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGRWYWx1ZT4pID0+IHZvaWQsIERlbGV0ZUZpZWxkOiAoZmllbGQ6IFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQpID0+IHZvaWQsIEVkaXRGaWVsZDogKGZpZWxkOiBTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkKSA9PiB2b2lkIH0pIHtcbiAgICBjb25zdCBbdmFsdWVMaXN0SXRlbXMsIHNldFZhbHVlTGlzdEl0ZW1zXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFN5c3RlbUNlbnRlci5WYWx1ZUxpc3RJdGVtPj4oW10pO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKChbXCJpbnRlZ2VyXCIsIFwibnVtYmVyXCIsIFwiYm9vbGVhblwiLCBcInN0cmluZ1wiXSkuaW5kZXhPZihwcm9wcy5GaWVsZC5UeXBlKSA8IDApIHtcbiAgICAgICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvVmFsdWVMaXN0L0dyb3VwLyR7cHJvcHMuRmllbGQuVHlwZX1gLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBoYW5kbGUuZG9uZSgodmw6IEFycmF5PFN5c3RlbUNlbnRlci5WYWx1ZUxpc3RJdGVtPikgPT4ge1xuICAgICAgICAgICAgICAgIHNldFZhbHVlTGlzdEl0ZW1zKHZsKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGhhbmRsZS5hYm9ydCAhPSB1bmRlZmluZWQpIGhhbmRsZS5hYm9ydCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0sIFtwcm9wcy5GaWVsZC5UeXBlXSk7XG5cbiAgICBmdW5jdGlvbiBWYWxpZCh0eXBlOiBTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkVHlwZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodHlwZSA9PSBcImludGVnZXJcIilcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5WYWx1ZSA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIodmFsdWUuVmFsdWUpO1xuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuVmFsdWUgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHZhbHVlLlZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkVmFsdWU+ID0gXy5jbG9uZShwcm9wcy5WYWx1ZXMpO1xuICAgIHZhciB2YWx1ZTogU3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZFZhbHVlID0gdmFsdWVzLmZpbmQodmFsdWUgPT4gdmFsdWUuQWRkaXRpb25hbEZpZWxkSUQgPT0gcHJvcHMuRmllbGQuSUQpO1xuXG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB7IElEOiAwLCBBZGRpdGlvbmFsRmllbGRJRDogcHJvcHMuRmllbGQuSUQsIE9wZW5YREFQYXJlbnRUYWJsZUlEOiBwcm9wcy5QYXJlbnRUYWJsZUlELCBWYWx1ZTogbnVsbCB9O1xuICAgICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKChbXCJpbnRlZ2VyXCIsIFwibnVtYmVyXCIsIFwiYm9vbGVhblwiLCBcInN0cmluZ1wiIF0pLmluZGV4T2YocHJvcHMuRmllbGQuVHlwZSkgPCAwKSB7XG4gICAgfVxuXG4gICAgcmV0dXJuKFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+e3Byb3BzLkZpZWxkLkZpZWxkTmFtZX08L3RkPlxuICAgICAgICAgICAgPHRkPntwcm9wcy5GaWVsZC5FeHRlcm5hbERCfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3Byb3BzLkZpZWxkLlR5cGV9PC90ZD5cbiAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICB7KChbXCJpbnRlZ2VyXCIsIFwibnVtYmVyXCIsIFwiYm9vbGVhblwiLCBcInN0cmluZ1wiXSkuaW5kZXhPZihwcm9wcy5GaWVsZC5UeXBlKSA+PSAwID8gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9eyhWYWxpZChwcm9wcy5GaWVsZC5UeXBlKSA/IFwiZm9ybS1jb250cm9sXCIgOiBcImZvcm0tY29udHJvbCBpcy1pbnZhbGlkXCIpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5WYWx1ZSA9IGV2dC50YXJnZXQudmFsdWUgYXMgYW55O1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLlZhbHVlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIH19IHZhbHVlPXt2YWx1ZS5WYWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZS5WYWx1ZS50b1N0cmluZygpfSAvPlxuICAgICAgICAgICAgICAgICAgICA6XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXsodmFsdWUuVmFsdWUgIT0gbnVsbCA/IHZhbHVlLlZhbHVlIDogJycpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5WYWx1ZSA9IGV2dC50YXJnZXQudmFsdWUgYXMgYW55O1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLlZhbHVlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIH19ID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9Jyc+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVMaXN0SXRlbXMubWFwKHggPT4gPG9wdGlvbiBrZXk9e3guSUR9IHZhbHVlPXt4LlRleHR9Pnt4LlRleHR9PC9vcHRpb24+KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PVwiI25ld0ZpZWxkXCIgIG9uQ2xpY2s9eyhlKSA9PiBwcm9wcy5FZGl0RmllbGQocHJvcHMuRmllbGQpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS1wZW5jaWxcIj48L2k+PC9zcGFuPjwvYnV0dG9uPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHByb3BzLkRlbGV0ZUZpZWxkKHByb3BzLkZpZWxkKX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gVmlld1RhYmxlUm93SW5wdXQocHJvcHM6IHsgUGFyZW50VGFibGVJRDogbnVtYmVyLCBGaWVsZDogU3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZCwgVmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkVmFsdWU+IH0pIHtcbiAgICBcblxuICAgIHZhciB2YWx1ZXM6IEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGRWYWx1ZT4gPSBfLmNsb25lKHByb3BzLlZhbHVlcyk7XG4gICAgdmFyIHZhbHVlOiBTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkVmFsdWUgPSB2YWx1ZXMuZmluZCh2YWx1ZSA9PiB2YWx1ZS5BZGRpdGlvbmFsRmllbGRJRCA9PSBwcm9wcy5GaWVsZC5JRCk7XG5cbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gKG51bGwpXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuRmllbGQuRmllbGROYW1lfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3Byb3BzLkZpZWxkLkV4dGVybmFsREJ9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuRmllbGQuVHlwZX08L3RkPlxuICAgICAgICAgICAgPHRkPnt2YWx1ZS5WYWx1ZSAhPSBudWxsID8gdmFsdWUuVmFsdWUudG9TdHJpbmcoKSA6ICcnfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+PC90ZD5cbiAgICAgICAgICAgIDx0ZD48L3RkPlxuICAgICAgICA8L3RyPlxuICAgICk7XG59IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEZvcm1TZWxlY3QudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzI4LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1TZWxlY3Q8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IFQsIEZpZWxkOiBrZXlvZiAoVCksIE9wdGlvbnM6IEFycmF5PHtWYWx1ZTogc3RyaW5nLCBMYWJlbDogc3RyaW5nIH0+LCBTZXR0ZXI6IChyZWNvcmQ6IFQpID0+IHZvaWQsIExhYmVsPzogc3RyaW5nLCBEaXNhYmxlZD86IGJvb2xlYW4sIEVtcHR5T3B0aW9uPzogYm9vbGVhbiB9LCB7fSwge30+e1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPnt0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkOiBUID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQudmFsdWUgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID09IG51bGwgPyAnJyA6IHRoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdLnRvU3RyaW5nKCl9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9PlxyXG4gICAgICAgICAgICAgICAgeyh0aGlzLnByb3BzLkVtcHR5T3B0aW9uID8gPG9wdGlvbiB2YWx1ZT0nJz48L29wdGlvbj4gOiBudWxsKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLk9wdGlvbnMubWFwKChhLCBpKSA9PiA8b3B0aW9uIGtleT17aX0gdmFsdWU9e2EuVmFsdWV9PnthLkxhYmVsfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQXNzZXROb3RlLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmZ1bmN0aW9uIE5vdGVXaW5kb3cocHJvcHM6IHsgSUQ6IG51bWJlciwgVHlwZTogJ0Fzc2V0JyB8ICdNZXRlcicgfCAnTG9jYXRpb24nIHwgJ0N1c3RvbWVyJyB8ICdDb21wYW55JyB8ICdVc2VyJ30pOiBKU1guRWxlbWVudCB7XHJcbiAgICBjb25zdCBbbm90ZVR5cGVJRCwgc2V0Tm90ZVR5cGVJRF0gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KDApO1xyXG4gICAgY29uc3QgW3RhYmxlUm93cywgc2V0VGFibGVSb3dzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PEpTWC5FbGVtZW50Pj4oW10pO1xyXG4gICAgY29uc3QgW25vdGUsIHNldE5vdGVdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignJyk7XHJcbiAgICBjb25zdCBbY291bnQsIHNldENvdW50XSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oMCk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXROb3RlVHlwZUlEKCk7XHJcbiAgICAgICAgZ2V0Tm90ZXMoKTtcclxuICAgIH0sIFtwcm9wcy5JRF0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUVkaXQoZDogT3BlblhEQS5Ob3RlKSB7XHJcbiAgICAgICAgc2V0Tm90ZShkLk5vdGUpO1xyXG4gICAgICAgIGRlbGV0ZU5vdGUoZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Tm90ZXMoKTogdm9pZCB7XHJcbiAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTm90ZS9Gb3JPYmplY3QvJHtwcm9wcy5UeXBlfS8ke3Byb3BzLklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICB9KS5kb25lKChkYXRhOiBBcnJheTxPcGVuWERBLk5vdGU+KSA9PiB7XHJcbiAgICAgICAgICAgdmFyIHJvd3MgPSBkYXRhLm1hcChkID0+IDx0ciBrZXk9e2QuSUR9Pjx0ZD57ZC5Ob3RlfTwvdGQ+PHRkPnttb21lbnQudXRjKGQuVGltZXN0YW1wKS5mb3JtYXQoXCJNTS9ERC9ZWVlZIEhIOm1tXCIpfTwvdGQ+PHRkPntkLlVzZXJBY2NvdW50fTwvdGQ+PHRkPlxyXG4gICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4gaGFuZGxlRWRpdChkKX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGVuY2lsXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IGRlbGV0ZU5vdGUoZCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICA8L3RkPjwvdHI+KVxyXG5cclxuICAgICAgICAgICBzZXRUYWJsZVJvd3Mocm93cyk7XHJcbiAgICAgICAgICAgc2V0Q291bnQocm93cy5sZW5ndGgpO1xyXG4gICAgICAgfSk7O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE5vdGVUeXBlSUQoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Ob3RlVHlwZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZGF0YTogQXJyYXk8T3BlblhEQS5Ob3RlVHlwZT4pID0+IHtcclxuICAgICAgICAgICAgdmFyIHJlY29yZCA9IGRhdGEuZmluZChkID0+IGQuUmVmZXJlbmNlVGFibGVOYW1lID09IHByb3BzLlR5cGUpXHJcbiAgICAgICAgICAgIHNldE5vdGVUeXBlSUQocmVjb3JkLklEKTtcclxuICAgICAgICB9KTs7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVOb3RlKGQ6IE9wZW5YREEuTm90ZSk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTm90ZS9EZWxldGVgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGQpLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKCgpID0+IGdldE5vdGVzKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBhZGROb3RlKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL05vdGUvQWRkYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IElEOiAwLCBOb3RlVHlwZUlEOiBub3RlVHlwZUlELCBSZWZlcmVuY2VUYWJsZUlEOiBwcm9wcy5JRCwgTm90ZTogbm90ZSwgVGltZXN0YW1wOiBtb21lbnQoKS5mb3JtYXQoJ01NL0REL1lZWVkgSEg6bW0nKSwgVXNlckFjY291bnQ6ICcnIH0gYXMgT3BlblhEQS5Ob3RlKSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZShlID0+IHtcclxuICAgICAgICAgICAgc2V0Tm90ZSgnJyk7XHJcbiAgICAgICAgICAgIGdldE5vdGVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5Ob3Rlczo8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQyMCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPjx0aCBzdHlsZT17eyB3aWR0aDogJzUwJScgfX0+Tm90ZTwvdGg+PHRoPlRpbWU8L3RoPjx0aD5Vc2VyPC90aD48dGg+PC90aD48L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFibGVSb3dzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcm93cz17NH0gdmFsdWU9e25vdGV9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0Tm90ZSgoZS50YXJnZXQgYXMgYW55KS52YWx1ZSl9PjwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXthZGROb3RlfSBzdHlsZT17eyBjdXJzb3I6IG5vdGUubGVuZ3RoID09IDAgPyAnbm90LWFsbG93ZWQnIDogJ3BvaW50ZXInIH19IGRpc2FibGVkPXtub3RlLmxlbmd0aCA9PSAwfT5BZGQgTm90ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXsoKSA9PiBzZXROb3RlKCcnKX0gc3R5bGU9e3sgY3Vyc29yOiBub3RlLmxlbmd0aCA9PSAwID8gJ25vdC1hbGxvd2VkJyA6ICdwb2ludGVyJyB9fSBkaXNhYmxlZD17bm90ZS5sZW5ndGggPT0gMH0+Q2xlYXI8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5vdGVXaW5kb3c7Il0sInNvdXJjZVJvb3QiOiIifQ==