(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Asset~Customer~Location~Meter"],{

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
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), additionalFields = _a[0], setAdditionalFields = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), additionalFieldValues = _b[0], setAdditionalFieldVaules = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), changed = _c[0], setChanged = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]({ ID: 0, FieldName: '', Type: 'string', OpenXDAParentTable: props.Type, ExternalDB: '', ExternalDBTable: '', ExternalDBTableKey: '', IsSecure: false }), 2), newField = _d[0], setNewField = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getData();
    }, [props.ID]);
    function getData() {
        getFields();
        getFieldValues();
        setChanged(false);
        setNewField({ ID: 0, FieldName: '', Type: 'string', OpenXDAParentTable: props.Type, ExternalDB: '', ExternalDBTable: '', ExternalDBTableKey: '', IsSecure: false });
    }
    function getFields() {
        $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/AdditionalField/ParentTable/" + props.Type,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data) {
            setAdditionalFields(data);
        });
    }
    function getFieldValues() {
        $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/AdditionalFieldValue/" + props.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data) {
            setAdditionalFieldVaules(data);
        });
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
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Additional Fields:")),
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
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, additionalFields.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](TableRowInput, { key: i, ParentTableID: props.ID, Field: a, Values: additionalFieldValues, Setter: function (values) {
                            setAdditionalFieldVaules(values);
                            setChanged(true);
                        }, DeleteField: deleteField, EditField: editField }); }))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#newField" }, "Add Field")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: addOrUpdateValues, disabled: !changed }, "Save Changes")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: getFieldValues, disabled: !changed }, "Reset"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "newField" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, "Additional Field"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: newField, Field: 'FieldName', Valid: function (field) { return true; }, Label: "Field Name", Setter: setNewField }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FormSelect__WEBPACK_IMPORTED_MODULE_5__["default"], { Record: newField, Field: 'Type', Options: [{ Value: 'string', Label: 'string' }, { Value: 'integer', Label: 'integer' }, { Value: 'number', Label: 'number' }], Label: "External Database", Setter: setNewField }),
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
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.FieldName),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.ExternalDB),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.Type),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (Valid(props.Field.Type) ? "form-control" : "form-control is-invalid"), onChange: function (evt) {
                    if (evt.target.value != "")
                        value.Value = evt.target.value;
                    else
                        value.Value = null;
                    props.Setter(values);
                }, value: value.Value == null ? '' : value.Value.toString() })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", "data-toggle": 'modal', "data-target": "#newField", onClick: function (e) { return props.EditField(props.Field); } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-pencil" })))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return props.DeleteField(props.Field); } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
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
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvQWRkaXRpb25hbEZpZWxkc1dpbmRvdy50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL0Zvcm1TZWxlY3QudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9Ob3RlV2luZG93LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLHFDQUFxQztBQUNyQyxFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBRTBCO0FBQ2xCO0FBQ007QUFDSjtBQUd0QyxTQUFTLHNCQUFzQixDQUFDLEtBQXdFO0lBQzlGLHNFQUFpRyxFQUFoRyx3QkFBZ0IsRUFBRSwyQkFBOEUsQ0FBQztJQUNsRyxzRUFBZ0gsRUFBL0csNkJBQXFCLEVBQUUsZ0NBQXdGLENBQUM7SUFDakgseUVBQXNELEVBQXJELGVBQU8sRUFBRSxrQkFBNEMsQ0FBQztJQUN2RCwwTkFBNk4sRUFBNU4sZ0JBQVEsRUFBRSxtQkFBa04sQ0FBQztJQUNwTywrQ0FBZSxDQUFDO1FBQ1osT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENB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QUFFLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBbUIsQ0FDbEs7WUFDTiw2REFBSyxTQUFTLEVBQUMsZ0JBQWdCO2dCQUMzQixnRUFBUSxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsT0FBTyxFQUFFLGNBQU0sY0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFYLENBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxZQUFnQixDQUN6SyxDQUNKLENBQ0osQ0FDVCxDQUFDO0FBQ04sQ0FBQztBQUVjLHlFQUFVLEVBQUMiLCJmaWxlIjoiQXNzZXR+Q3VzdG9tZXJ+TG9jYXRpb25+TWV0ZXIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzI4LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBGb3JtQ2hlY2tCb3ggZnJvbSAnLi9Gb3JtQ2hlY2tCb3gnO1xyXG5pbXBvcnQgRm9ybVNlbGVjdCBmcm9tICcuL0Zvcm1TZWxlY3QnO1xyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gQWRkaXRpb25hbEZpZWxkc1dpbmRvdyhwcm9wczogeyBJRDogbnVtYmVyICwgVHlwZTogJ0Fzc2V0JyB8ICdNZXRlcicgfCAnTG9jYXRpb24nIHwgJ0N1c3RvbWVyJ30pOiBKU1guRWxlbWVudCB7XHJcbiAgICBjb25zdCBbYWRkaXRpb25hbEZpZWxkcywgc2V0QWRkaXRpb25hbEZpZWxkc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkPj4oW10pO1xyXG4gICAgY29uc3QgW2FkZGl0aW9uYWxGaWVsZFZhbHVlcywgc2V0QWRkaXRpb25hbEZpZWxkVmF1bGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGRWYWx1ZT4+KFtdKTtcclxuICAgIGNvbnN0IFtjaGFuZ2VkLCBzZXRDaGFuZ2VkXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuICAgIGNvbnN0IFtuZXdGaWVsZCwgc2V0TmV3RmllbGRdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZD4oe0lEOiAwLCBGaWVsZE5hbWU6ICcnLCBUeXBlOiAnc3RyaW5nJywgT3BlblhEQVBhcmVudFRhYmxlOiBwcm9wcy5UeXBlLCBFeHRlcm5hbERCOiAnJywgRXh0ZXJuYWxEQlRhYmxlOiAnJywgRXh0ZXJuYWxEQlRhYmxlS2V5OiAnJywgSXNTZWN1cmU6IGZhbHNlIH0pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXREYXRhKCk7XHJcbiAgICB9LCBbcHJvcHMuSURdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gICAgICAgIGdldEZpZWxkcygpO1xyXG4gICAgICAgIGdldEZpZWxkVmFsdWVzKClcclxuICAgICAgICBzZXRDaGFuZ2VkKGZhbHNlKTtcclxuICAgICAgICBzZXROZXdGaWVsZCh7IElEOiAwLCBGaWVsZE5hbWU6ICcnLCBUeXBlOiAnc3RyaW5nJywgT3BlblhEQVBhcmVudFRhYmxlOiBwcm9wcy5UeXBlLCBFeHRlcm5hbERCOiAnJywgRXh0ZXJuYWxEQlRhYmxlOiAnJywgRXh0ZXJuYWxEQlRhYmxlS2V5OiAnJywgSXNTZWN1cmU6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEZpZWxkcygpOiB2b2lkIHtcclxuICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0FkZGl0aW9uYWxGaWVsZC9QYXJlbnRUYWJsZS8ke3Byb3BzLlR5cGV9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgIH0pLmRvbmUoKGRhdGE6IEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQ+KSA9PiB7XHJcbiAgICAgICAgICAgc2V0QWRkaXRpb25hbEZpZWxkcyhkYXRhKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEZpZWxkVmFsdWVzKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9BZGRpdGlvbmFsRmllbGRWYWx1ZS8ke3Byb3BzLklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZGF0YTogQXJyYXk8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZFZhbHVlPikgPT4ge1xyXG4gICAgICAgICAgICBzZXRBZGRpdGlvbmFsRmllbGRWYXVsZXMoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkT3JVcGRhdGVWYWx1ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQWRkaXRpb25hbEZpZWxkVmFsdWUvQXJyYXlgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGFkZGl0aW9uYWxGaWVsZFZhbHVlcyksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoZSA9PiB7XHJcbiAgICAgICAgICAgIGdldERhdGEoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGROZXdGaWVsZCgpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBBVENIXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9BZGRpdGlvbmFsRmllbGQvVXBkYXRlYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShuZXdGaWVsZCksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoZSA9PiB7XHJcbiAgICAgICAgICAgIGdldERhdGEoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVGaWVsZChmaWVsZDogU3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZCk6IHZvaWQge1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGNvbmZpcm0oXCJUaGlzIHdpbGwgZGVsZXRlIHRoZSBmaWVsZCAnXCIgKyBmaWVsZC5GaWVsZE5hbWUgKyBcIicgZnJvbSBhbGwgXCIgKyBwcm9wcy5UeXBlICsgXCJzIGFuZCB3aWxsIGFsc28gZGVsZXRlIGFsbCBpbmZvcm1hdGlvbiBhc3NpZ25lZCB0byB0aGVzZSBmaWVsZHNcIik7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UpIHJldHVybjtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQWRkaXRpb25hbEZpZWxkL0RlbGV0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZmllbGQpLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKGUgPT4ge1xyXG4gICAgICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVkaXRGaWVsZChmaWVsZDogU3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZCk6IHZvaWQge1xyXG4gICAgICAgIHNldE5ld0ZpZWxkKGZpZWxkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxoND5BZGRpdGlvbmFsIEZpZWxkczo8L2g0PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPSd0YWJsZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGg+RmllbGQ8L3RoPjx0aCBzdHlsZT17eyB3aWR0aDogMTUwIH19PkV4dCBEQjwvdGg+PHRoIHN0eWxlPXt7IHdpZHRoOiAxMDB9fT5UeXBlPC90aD48dGggc3R5bGU9e3sgd2lkdGg6IDMwMCB9fT5WYWx1ZTwvdGg+PHRoIHN0eWxlPXt7IHdpZHRoOiAzMCB9fT48L3RoPjx0aCBzdHlsZT17e3dpZHRoOiAzMH19PjwvdGg+PC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FkZGl0aW9uYWxGaWVsZHMubWFwKChhLCBpKSA9PiA8VGFibGVSb3dJbnB1dCBrZXk9e2l9IFBhcmVudFRhYmxlSUQ9e3Byb3BzLklEfSBGaWVsZD17YX0gVmFsdWVzPXthZGRpdGlvbmFsRmllbGRWYWx1ZXN9IFNldHRlcj17KHZhbHVlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFkZGl0aW9uYWxGaWVsZFZhdWxlcyh2YWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENoYW5nZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBEZWxldGVGaWVsZD17ZGVsZXRlRmllbGR9IEVkaXRGaWVsZD17ZWRpdEZpZWxkfS8+KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PVwiI25ld0ZpZWxkXCI+QWRkIEZpZWxkPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXthZGRPclVwZGF0ZVZhbHVlc30gZGlzYWJsZWQ9eyFjaGFuZ2VkfT5TYXZlIENoYW5nZXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17Z2V0RmllbGRWYWx1ZXN9IGRpc2FibGVkPXshY2hhbmdlZH0+UmVzZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cIm5ld0ZpZWxkXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+QWRkaXRpb25hbCBGaWVsZDwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQ+IFJlY29yZD17bmV3RmllbGR9IEZpZWxkPSdGaWVsZE5hbWUnIFZhbGlkPXsoZmllbGQpID0+IHRydWV9IExhYmVsPVwiRmllbGQgTmFtZVwiIFNldHRlcj17c2V0TmV3RmllbGR9IC8+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1TZWxlY3Q8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZD4gUmVjb3JkPXtuZXdGaWVsZH0gRmllbGQ9J1R5cGUnIE9wdGlvbnM9e1t7IFZhbHVlOiAnc3RyaW5nJywgTGFiZWw6ICdzdHJpbmcnIH0sIHsgVmFsdWU6ICdpbnRlZ2VyJywgTGFiZWw6ICdpbnRlZ2VyJyB9LCB7IFZhbHVlOiAnbnVtYmVyJywgTGFiZWw6ICdudW1iZXInIH1dfSBMYWJlbD1cIkV4dGVybmFsIERhdGFiYXNlXCIgU2V0dGVyPXtzZXROZXdGaWVsZH0gLz4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQ+IFJlY29yZD17bmV3RmllbGR9IEZpZWxkPSdFeHRlcm5hbERCJyBWYWxpZD17KGZpZWxkKSA9PiB0cnVlfSBMYWJlbD1cIkV4dGVybmFsIERhdGFiYXNlXCIgU2V0dGVyPXtzZXROZXdGaWVsZH0gLz4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQ+IFJlY29yZD17bmV3RmllbGR9IEZpZWxkPSdFeHRlcm5hbERCVGFibGUnIFZhbGlkPXsoZmllbGQpID0+IHRydWV9IExhYmVsPVwiRXh0ZXJuYWwgRGF0YWJhc2UgVGFibGVcIiBTZXR0ZXI9e3NldE5ld0ZpZWxkfSAvPiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZD4gUmVjb3JkPXtuZXdGaWVsZH0gRmllbGQ9J0V4dGVybmFsREJUYWJsZUtleScgVmFsaWQ9eyhmaWVsZCkgPT4gdHJ1ZX0gTGFiZWw9XCJFeHRlcm5hbCBEYXRhYmFzZSBUYWJsZSBLZXlcIiBTZXR0ZXI9e3NldE5ld0ZpZWxkfSAvPiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ2hlY2tCb3g8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZD4gUmVjb3JkPXtuZXdGaWVsZH0gRmllbGQ9J0lzU2VjdXJlJyBMYWJlbD1cIlNlY3VyZSBEYXRhXCIgU2V0dGVyPXtzZXROZXdGaWVsZH0gLz4gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9e2FkZE5ld0ZpZWxkfSA+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWRkaXRpb25hbEZpZWxkc1dpbmRvdztcclxuXHJcbmZ1bmN0aW9uIFRhYmxlUm93SW5wdXQocHJvcHM6IHsgUGFyZW50VGFibGVJRDogbnVtYmVyLCBGaWVsZDogU3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZCwgVmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkVmFsdWU+LCBTZXR0ZXI6ICh2YWx1ZXM6IEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGRWYWx1ZT4pID0+IHZvaWQsIERlbGV0ZUZpZWxkOiAoZmllbGQ6IFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQpID0+IHZvaWQsIEVkaXRGaWVsZDogKGZpZWxkOiBTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkKSA9PiB2b2lkIH0pIHtcclxuICAgIGZ1bmN0aW9uIFZhbGlkKHR5cGU6IFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGRUeXBlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJpbnRlZ2VyXCIpXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5WYWx1ZSA9PSBudWxsIHx8ICBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHZhbHVlLlZhbHVlKTtcclxuICAgICAgICBlbHNlIGlmICh0eXBlID09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5WYWx1ZSA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIodmFsdWUuVmFsdWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJib29sZWFuXCIpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHZhbHVlczogQXJyYXk8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZFZhbHVlPiA9IF8uY2xvbmUocHJvcHMuVmFsdWVzKTtcclxuICAgIHZhciB2YWx1ZTogU3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZFZhbHVlID0gdmFsdWVzLmZpbmQodmFsdWUgPT4gdmFsdWUuQWRkaXRpb25hbEZpZWxkSUQgPT0gcHJvcHMuRmllbGQuSUQpO1xyXG5cclxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSB7IElEOiAwLCBBZGRpdGlvbmFsRmllbGRJRDogcHJvcHMuRmllbGQuSUQsIE9wZW5YREFQYXJlbnRUYWJsZUlEOiBwcm9wcy5QYXJlbnRUYWJsZUlELCBWYWx1ZTogbnVsbCB9O1xyXG4gICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybihcclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIDx0ZD57cHJvcHMuRmllbGQuRmllbGROYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57cHJvcHMuRmllbGQuRXh0ZXJuYWxEQn08L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e3Byb3BzLkZpZWxkLlR5cGV9PC90ZD5cclxuICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17KFZhbGlkKHByb3BzLkZpZWxkLlR5cGUpID8gXCJmb3JtLWNvbnRyb2xcIiA6IFwiZm9ybS1jb250cm9sIGlzLWludmFsaWRcIil9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuVmFsdWUgPSBldnQudGFyZ2V0LnZhbHVlIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLlZhbHVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKHZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICB9fSB2YWx1ZT17dmFsdWUuVmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWUuVmFsdWUudG9TdHJpbmcoKX0vPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8dGQ+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD1cIiNuZXdGaWVsZFwiICBvbkNsaWNrPXsoZSkgPT4gcHJvcHMuRWRpdEZpZWxkKHByb3BzLkZpZWxkKX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGVuY2lsXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj48L3RkPlxyXG4gICAgICAgICAgICA8dGQ+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHByb3BzLkRlbGV0ZUZpZWxkKHByb3BzLkZpZWxkKX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPjwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICk7XHJcbn1cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEZvcm1TZWxlY3QudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzI4LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1TZWxlY3Q8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IFQsIEZpZWxkOiBrZXlvZiAoVCksIE9wdGlvbnM6IEFycmF5PHtWYWx1ZTogc3RyaW5nLCBMYWJlbDogc3RyaW5nIH0+LCBTZXR0ZXI6IChyZWNvcmQ6IFQpID0+IHZvaWQsIExhYmVsPzogc3RyaW5nLCBEaXNhYmxlZD86IGJvb2xlYW4sIEVtcHR5T3B0aW9uPzogYm9vbGVhbiB9LCB7fSwge30+e1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPnt0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkOiBUID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQudmFsdWUgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID09IG51bGwgPyAnJyA6IHRoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdLnRvU3RyaW5nKCl9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9PlxyXG4gICAgICAgICAgICAgICAgeyh0aGlzLnByb3BzLkVtcHR5T3B0aW9uID8gPG9wdGlvbiB2YWx1ZT0nJz48L29wdGlvbj4gOiBudWxsKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLk9wdGlvbnMubWFwKChhLCBpKSA9PiA8b3B0aW9uIGtleT17aX0gdmFsdWU9e2EuVmFsdWV9PnthLkxhYmVsfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQXNzZXROb3RlLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmZ1bmN0aW9uIE5vdGVXaW5kb3cocHJvcHM6IHsgSUQ6IG51bWJlciAsIFR5cGU6ICdBc3NldCcgfCAnTWV0ZXInIHwgJ0xvY2F0aW9uJyB8ICdDdXN0b21lcicgfCAnVXNlcid9KTogSlNYLkVsZW1lbnQge1xyXG4gICAgY29uc3QgW25vdGVUeXBlSUQsIHNldE5vdGVUeXBlSURdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyPigwKTtcclxuICAgIGNvbnN0IFt0YWJsZVJvd3MsIHNldFRhYmxlUm93c10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxKU1guRWxlbWVudD4+KFtdKTtcclxuICAgIGNvbnN0IFtub3RlLCBzZXROb3RlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJycpO1xyXG4gICAgY29uc3QgW2NvdW50LCBzZXRDb3VudF0gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KDApO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgZ2V0Tm90ZVR5cGVJRCgpO1xyXG4gICAgICAgIGdldE5vdGVzKCk7XHJcbiAgICB9LCBbcHJvcHMuSURdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVFZGl0KGQ6IE9wZW5YREEuTm90ZSkge1xyXG4gICAgICAgIHNldE5vdGUoZC5Ob3RlKTtcclxuICAgICAgICBkZWxldGVOb3RlKGQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE5vdGVzKCk6IHZvaWQge1xyXG4gICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL05vdGUvRm9yT2JqZWN0LyR7cHJvcHMuVHlwZX0vJHtwcm9wcy5JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgfSkuZG9uZSgoZGF0YTogQXJyYXk8T3BlblhEQS5Ob3RlPikgPT4ge1xyXG4gICAgICAgICAgIHZhciByb3dzID0gZGF0YS5tYXAoZCA9PiA8dHIga2V5PXtkLklEfT48dGQ+e2QuTm90ZX08L3RkPjx0ZD57bW9tZW50LnV0YyhkLlRpbWVzdGFtcCkuZm9ybWF0KFwiTU0vREQvWVlZWSBISDptbVwiKX08L3RkPjx0ZD57ZC5Vc2VyQWNjb3VudH08L3RkPjx0ZD5cclxuICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IGhhbmRsZUVkaXQoZCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBlbmNpbFwiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiBkZWxldGVOb3RlKGQpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgPC90ZD48L3RyPilcclxuXHJcbiAgICAgICAgICAgc2V0VGFibGVSb3dzKHJvd3MpO1xyXG4gICAgICAgICAgIHNldENvdW50KHJvd3MubGVuZ3RoKTtcclxuICAgICAgIH0pOztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXROb3RlVHlwZUlEKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTm90ZVR5cGVgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKGRhdGE6IEFycmF5PE9wZW5YREEuTm90ZVR5cGU+KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciByZWNvcmQgPSBkYXRhLmZpbmQoZCA9PiBkLlJlZmVyZW5jZVRhYmxlTmFtZSA9PSBwcm9wcy5UeXBlKVxyXG4gICAgICAgICAgICBzZXROb3RlVHlwZUlEKHJlY29yZC5JRCk7XHJcbiAgICAgICAgfSk7O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlTm90ZShkOiBPcGVuWERBLk5vdGUpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL05vdGUvRGVsZXRlYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkKSxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiBnZXROb3RlcygpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTm90ZSgpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Ob3RlL0FkZGAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBJRDogMCwgTm90ZVR5cGVJRDogbm90ZVR5cGVJRCwgUmVmZXJlbmNlVGFibGVJRDogcHJvcHMuSUQsIE5vdGU6IG5vdGUsIFRpbWVzdGFtcDogbW9tZW50KCkuZm9ybWF0KCdNTS9ERC9ZWVlZIEhIOm1tJyksIFVzZXJBY2NvdW50OiAnJyB9IGFzIE9wZW5YREEuTm90ZSksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoZSA9PiB7XHJcbiAgICAgICAgICAgIHNldE5vdGUoJycpO1xyXG4gICAgICAgICAgICBnZXROb3RlcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+Tm90ZXM6PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGggc3R5bGU9e3sgd2lkdGg6ICc1MCUnIH19Pk5vdGU8L3RoPjx0aD5UaW1lPC90aD48dGg+VXNlcjwvdGg+PHRoPjwvdGg+PC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhYmxlUm93c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHJvd3M9ezR9IHZhbHVlPXtub3RlfSBvbkNoYW5nZT17KGUpID0+IHNldE5vdGUoKGUudGFyZ2V0IGFzIGFueSkudmFsdWUpfT48L3RleHRhcmVhPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17YWRkTm90ZX0gc3R5bGU9e3sgY3Vyc29yOiBub3RlLmxlbmd0aCA9PSAwID8gJ25vdC1hbGxvd2VkJyA6ICdwb2ludGVyJyB9fSBkaXNhYmxlZD17bm90ZS5sZW5ndGggPT0gMH0+QWRkIE5vdGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gc2V0Tm90ZSgnJyl9IHN0eWxlPXt7IGN1cnNvcjogbm90ZS5sZW5ndGggPT0gMCA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicgfX0gZGlzYWJsZWQ9e25vdGUubGVuZ3RoID09IDB9PkNsZWFyPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOb3RlV2luZG93OyJdLCJzb3VyY2VSb290IjoiIn0=