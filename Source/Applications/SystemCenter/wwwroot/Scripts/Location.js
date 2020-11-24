(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Location"],{

/***/ "./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx":
/*!****************************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  ExternalDBUpdate.tsx - Gbtc
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
//  04/07/2020 - C. Lackner
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


function ExternalDataBaseWindow(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), externalDB = _a[0], setexternalDB = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), externalDBFields = _b[0], setFields = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), changed = _c[0], setChanged = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](""), 2), currentDB = _d[0], setCurrentDB = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        setChanged(false);
        setFields([]);
        return getExternalDBs();
    }, [props.ID, props.Type, props.Tab]);
    function getExternalDBs() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/" + props.Type + "/extDataBases",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) {
            setexternalDB(data);
        });
        return function () {
            if (handle.abort != undefined)
                handle.abort();
        };
    }
    function updateExternalDB(type) {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/ExternalDB/" + type + "/" + props.Type + "/Update/" + props.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) {
            setFields(data);
            setChanged(true);
            setCurrentDB(type);
            if (data.length < 1)
                cancelUpdate();
        });
        return function () {
            if (handle.abort != undefined)
                handle.abort();
        };
    }
    function cancelUpdate() {
        setFields([]);
        setChanged(false);
    }
    function checkUpdate(data) {
        if (data.length < 1) {
            cancelUpdate();
        }
        else {
            setFields(data);
        }
    }
    function submitUpdate() {
        var handle = $.ajax({
            type: "POST",
            url: homePath + "api/ExternalDB/" + currentDB + "/" + props.Type + "/ConfirmUpdate",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ "data": externalDBFields }),
            cache: false,
            async: true
        });
        setFields([]);
        setChanged(false);
        getExternalDBs();
        return function () {
            if (handle.abort != undefined)
                handle.abort();
        };
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, " External Data Base Connections:")),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } }, (changed ? (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { id: "fields", className: 'table' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        props.ID == -1 ?
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null,
                                " ",
                                props.Type,
                                " ") :
                            null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Field"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 300 } }, "Previous Value"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 300 } }, "Updated Value"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 30 } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 30 } }))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, externalDBFields.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](TableRowField, { key: i, ParentTableID: props.ID, Field: a, Values: externalDBFields, Setter: checkUpdate }); })))) : (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { id: "overview", className: 'table' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "External DB"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 250 } }, "Last Updated"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 300 } }))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, externalDB.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](TableRowInput, { key: i, ParentTableID: props.ID, ExternalDB: a.name, updated: a.lastupdate, Update: function (dbType) {
                        updateExternalDB(dbType);
                    } }); }))))))),
        (changed ?
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: submitUpdate }, "Save Changes")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: cancelUpdate }, "Cancel"))) : null)));
}
/* harmony default export */ __webpack_exports__["default"] = (ExternalDataBaseWindow);
function TableRowInput(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.ExternalDB),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, (props.updated == null ? "N/A" : moment(props.updated).format("MM/DD/YYYY"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function (e) { return props.Update(props.ExternalDB); } },
                "Update ",
                props.ExternalDB))));
}
function TableRowField(props) {
    var values = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Values);
    var value = values.find(function (value) { return value.AdditionalFieldID == props.Field.AdditionalFieldID && value.OpenXDAParentTableID == props.Field.OpenXDAParentTableID && value.isXDAField == props.Field.isXDAField; });
    function removeField() {
        values = values.filter(function (fld) { return !(fld.AdditionalFieldID == props.Field.AdditionalFieldID && fld.OpenXDAParentTableID == props.Field.OpenXDAParentTableID && fld.isXDAField == props.Field.isXDAField); });
        props.Setter(values);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
        props.ParentTableID == -1 ?
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.DisplayName)
            : null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.FieldName),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.PreviousValue == null ? "" : props.Field.PreviousValue),
        (props.Field.Error ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.Message) :
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (props.Field.Changed ? "form-control is-invalid" : "form-control"), onChange: function (evt) {
                        if (evt.target.value != "")
                            value.Value = evt.target.value;
                        else
                            value.Value = null;
                        value.Changed = true;
                        props.Setter(values);
                    }, value: value.Value == null ? '' : value.Value.toString() }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.Error ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-exclamation-triangle" })) : null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return removeField(); } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
}


/***/ }),

/***/ "./TSX/SystemCenter/CommonComponents/Table.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/Table.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  Table.tsx - Gbtc
//
//  Copyright © 2018, Grid Protection Alliance.  All Rights Reserved.
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
//  08/02/2018 - Billy Ernest
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


var AngleIcon = function (props) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { style: { width: 10, height: 10, margin: 3 }, className: "fa fa-angle-" + (props.ascending ? 'up' : 'down') }); };
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        return _super.call(this, props) || this;
    }
    Table.prototype.componentDidUpdate = function (prevProps, prevState) {
    };
    Table.prototype.render = function () {
        var rowComponents = this.generateRows();
        var headerComponents = this.generateHeaders();
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: (this.props.tableClass != undefined ? this.props.tableClass : ''), style: this.props.tableStyle },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", { style: this.props.theadStyle }, headerComponents),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", { style: this.props.tbodyStyle }, rowComponents)));
    };
    Table.prototype.generateHeaders = function () {
        var _this = this;
        if (this.props.cols.length == 0)
            return null;
        var cells = this.props.cols.map(function (colData, index) {
            var style;
            if (colData.headerStyle != undefined) {
                style = colData.headerStyle;
            }
            else
                style = {};
            if (style.cursor == undefined)
                style.cursor = 'pointer';
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { key: index, style: style, onClick: function (e) { return _this.handleSort({ col: colData.key, ascending: _this.props.ascending }, e); } },
                colData.label,
                (_this.props.sortField == colData.key ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](AngleIcon, { ascending: _this.props.ascending }) : null));
        });
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null, cells);
    };
    Table.prototype.generateRows = function () {
        var _this = this;
        if (this.props.data.length == 0)
            return null;
        return this.props.data.map(function (item, index) {
            var cells = _this.props.cols.map(function (colData) {
                var style = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](colData.rowStyle);
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { key: index.toString() + item[colData.key] + colData.key, style: style, onClick: _this.handleClick.bind(_this, { col: colData.key, row: item, data: item[colData.key] }) }, colData.content != undefined ? colData.content(item, colData.key, style) : item[colData.key]);
            });
            var style;
            if (_this.props.rowStyle != undefined) {
                style = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.rowStyle);
            }
            else
                style = {};
            if (style.cursor == undefined)
                style.cursor = 'pointer';
            if (_this.props.selected(item))
                style.backgroundColor = 'yellow';
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { style: style, key: index.toString() }, cells);
        });
    };
    Table.prototype.handleClick = function (data, event) {
        this.props.onClick(data, event);
    };
    Table.prototype.handleSort = function (data, event) {
        this.props.onSort(data);
    };
    return Table;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Table);
;


/***/ }),

/***/ "./TSX/SystemCenter/Location/Location.tsx":
/*!************************************************!*\
  !*** ./TSX/SystemCenter/Location/Location.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LocationInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LocationInfo */ "./TSX/SystemCenter/Location/LocationInfo.tsx");
/* harmony import */ var _LocationMeter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationMeter */ "./TSX/SystemCenter/Location/LocationMeter.tsx");
/* harmony import */ var _LocationAsset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LocationAsset */ "./TSX/SystemCenter/Location/LocationAsset.tsx");
/* harmony import */ var _CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/NoteWindow */ "./TSX/SystemCenter/CommonComponents/NoteWindow.tsx");
/* harmony import */ var _CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../CommonComponents/AdditionalFieldsWindow */ "./TSX/SystemCenter/CommonComponents/AdditionalFieldsWindow.tsx");
/* harmony import */ var _CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommonComponents/ExternalDBUpdate */ "./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx");
//******************************************************************************************************
//  Location.tsx - Gbtc
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
//  01/21/2020 - Billy Ernest
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







var Location = /** @class */ (function (_super) {
    __extends(Location, _super);
    function Location(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Location: null,
            Tab: _this.getTab()
        };
        return _this;
    }
    Location.prototype.getTab = function () {
        if (sessionStorage.hasOwnProperty('Location.Tab'))
            return JSON.parse(sessionStorage.getItem('Location.Tab'));
        else
            return 'notes';
    };
    Location.prototype.getLocation = function () {
        var _this = this;
        if (this.props.LocationID == undefined)
            return;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location/One/" + this.props.LocationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (data) { return _this.setState({ Location: data }); });
    };
    Location.prototype.deleteLocation = function () {
        var response = confirm("This will delete the Substation Permanently");
        if (!response)
            return;
        return $.ajax({
            type: "DELETE",
            url: homePath + "api/OpenXDA/Location/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Location),
            dataType: 'json',
            cache: true,
            async: true
        });
    };
    Location.prototype.setTab = function (tab) {
        sessionStorage.setItem('Location.Tab', JSON.stringify(tab));
        this.setState({ Tab: tab });
    };
    Location.prototype.componentDidMount = function () {
        this.getLocation();
    };
    Location.prototype.componentWillUnmount = function () {
        sessionStorage.clear();
    };
    Location.prototype.render = function () {
        var _this = this;
        if (this.state.Location == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, this.state.Location != null ? this.state.Location.LocationKey : '')),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", hidden: this.state.Location == null, onClick: function () { return _this.deleteLocation().done(function () { return window.location.href = homePath + 'index.cshtml?name=Locations'; }); } }, "Delete Location (Permanent)"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "notes" ? " active" : ""), onClick: function () { return _this.setTab('notes'); }, "data-toggle": "tab", href: "#notes" }, "Notes")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "locationInfo" ? " active" : ""), onClick: function () { return _this.setTab('locationInfo'); }, "data-toggle": "tab", href: "#locationInfo" }, "Location Info")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "additionalFields" ? " active" : ""), onClick: function () { return _this.setTab('additionalFields'); }, "data-toggle": "tab", href: "#additionalFields" }, "Additional Fields")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "meters" ? " active" : ""), onClick: function () { return _this.setTab('meters'); }, "data-toggle": "tab", href: "#meters" }, "Meters")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "assets" ? " active" : ""), onClick: function () { return _this.setTab('assets'); }, "data-toggle": "tab", href: "#assets" }, "Assets")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "extDB" ? " active" : ""), onClick: function () { return _this.setTab('extDB'); }, "data-toggle": "tab", href: "#extDB" }, "External DB"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 215, overflow: 'hidden' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "notes" ? " active" : "fade"), id: "notes" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_4__["default"], { ID: this.props.LocationID, Type: 'Location' })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "locationInfo" ? " active" : "fade"), id: "locationInfo" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LocationInfo__WEBPACK_IMPORTED_MODULE_1__["default"], { Location: this.state.Location, stateSetter: function (Location) { return _this.setState({ Location: Location }); } })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "additionalFields" ? " active" : "fade"), id: "additionalFields" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_5__["default"], { ID: this.props.LocationID, Type: 'Location', Tab: this.state.Tab })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "meters" ? " active" : "fade"), id: "meters" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LocationMeter__WEBPACK_IMPORTED_MODULE_2__["default"], { Location: this.state.Location })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "assets" ? " active" : "fade"), id: "assets" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LocationAsset__WEBPACK_IMPORTED_MODULE_3__["default"], { Location: this.state.Location })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "extDB" ? " active" : "fade"), id: "extDB" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_6__["default"], { ID: this.props.LocationID, Type: 'Location', Tab: this.state.Tab })))));
    };
    return Location;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Location);


/***/ }),

/***/ "./TSX/SystemCenter/Location/LocationAsset.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/Location/LocationAsset.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../AssetAttribute/Breaker */ "./TSX/SystemCenter/AssetAttribute/Breaker.tsx");
/* harmony import */ var _AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../AssetAttribute/Bus */ "./TSX/SystemCenter/AssetAttribute/Bus.tsx");
/* harmony import */ var _AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AssetAttribute/CapBank */ "./TSX/SystemCenter/AssetAttribute/CapBank.tsx");
/* harmony import */ var _AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../AssetAttribute/Line */ "./TSX/SystemCenter/AssetAttribute/Line.tsx");
/* harmony import */ var _AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../AssetAttribute/Transformer */ "./TSX/SystemCenter/AssetAttribute/Transformer.tsx");
/* harmony import */ var _TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../TS/Services/Asset */ "./TS/Services/Asset.ts");
//******************************************************************************************************
//  LocationAsset.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with  work for additional information regarding copyright ownership.
//  The GPA licenses  file to you under the MIT License (MIT), the "License"; you may not use 
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
//  01/21/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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











function LocationAssetWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), data = _a[0], setData = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["default"].getNewAsset('Line')), 2), newEditAsset = _d[0], setNewEditAsset = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('New'), 2), newEdit = _e[0], setNewEdit = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), assetTypes = _f[0], setAssetTypes = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), allAssets = _g[0], setAllAssets = _g[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getDatas();
    }, [props.Location.ID]);
    function getDatas() {
        getAssets();
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["getAllAssets"])().done(function (assets) {
            setAllAssets(assets);
        });
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["getAssetTypes"])().done(function (assetTypes) {
            setAssetTypes(assetTypes);
        });
    }
    function getAssets() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location/" + props.Location.ID + "/Assets",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data, _) { return setData(data); });
    }
    function addNewAsset() {
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Asset/New/Location/" + props.Location.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: newEditAsset }),
            cache: false,
            async: true
        }).done(function () {
            sessionStorage.clear();
            getDatas();
            setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["default"].getNewAsset('Line'));
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
        });
    }
    function addExistingAsset() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, $.ajax({
                        type: "POST",
                        url: homePath + "api/OpenXDA/Asset/Existing/Location/" + props.Location.ID,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        data: JSON.stringify({ Asset: newEditAsset }),
                        cache: false,
                        async: true
                    }).done(function () {
                    }).fail(function (msg) {
                        if (msg.status == 500)
                            alert(msg.responseJSON.ExceptionMessage);
                        else {
                            sessionStorage.clear();
                            getDatas();
                            setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["default"].getNewAsset('Line'));
                        }
                    })];
            });
        });
    }
    function deleteAsset(asset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, $.ajax({
                        type: "DELETE",
                        url: homePath + "api/OpenXDA/Asset/" + asset.ID + "/Location/" + props.Location.ID,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: true,
                        async: true
                    }).done(function (assets) {
                    }).fail(function (msg) {
                        if (msg.status == 500)
                            alert(msg.responseJSON.ExceptionMessage);
                        else {
                            sessionStorage.clear();
                            getDatas();
                        }
                    })];
            });
        });
    }
    function addNewButton() {
        setNewEdit('New');
        setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["default"].getNewAsset('Line'));
    }
    function saveButtonForExistingAssets() {
        return __awaiter(this, void 0, void 0, function () {
            var thing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["editExistingAsset"])(newEditAsset)];
                    case 1:
                        thing = _a.sent();
                        getDatas();
                        setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["default"].getNewAsset('Line'));
                        return [2 /*return*/];
                }
            });
        });
    }
    function showAttributes() {
        if (newEditAsset.AssetType == 'Breaker')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_5__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset, ShowSpare: true });
        else if (newEditAsset.AssetType == 'Bus')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_6__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'CapacitorBank')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_7__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'Line')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_8__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'Transformer')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_9__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
    }
    function handleSelect(item, event) {
        if (event.target.localName == 'td')
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + item.row.ID, state: {} });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Assets:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__["default"], { cols: [
                        { key: 'AssetKey', label: 'Key', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        { key: 'AssetName', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        { key: 'AssetType', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        {
                            key: null, label: '', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: function (asset, key, style) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", "data-toggle": 'modal', "data-target": '#assetModal', onClick: function (e) {
                                        e.preventDefault();
                                        var assetType = assetTypes.find(function (at) { return at.ID == asset['AssetTypeID']; });
                                        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["getAssetWithAdditionalFields"])(asset.ID, assetType.Name).then(function (asset) { return setNewEditAsset(asset); });
                                        setNewEdit('Edit');
                                    } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-pencil" }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                        e.preventDefault();
                                        deleteAsset(asset);
                                    } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" })))); }
                        },
                    ], tableClass: "table table-hover", data: data, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](data, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setData(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](data, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setData(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: handleSelect, selected: function (item) { return false; } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", "data-toggle": 'modal', "data-target": '#assetModal', onClick: addNewButton }, "Add Asset"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "assetModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '75%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, newEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + newEditAsset.AssetKey + ' for Meter'),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal", onClick: function (evt) { return setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["default"].getNewAsset('Line')); } }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["default"], { Asset: newEditAsset, NewEdit: newEdit, AssetTypes: assetTypes, AllAssets: allAssets, UpdateState: setNewEditAsset, GetDifferentAsset: function (assetID) {
                                        var asset = allAssets.find(function (a) { return a.ID == assetID; });
                                        var assetType = assetTypes.find(function (at) { return at.ID == asset['AssetTypeID']; });
                                        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["getAssetWithAdditionalFields"])(assetID, assetType.Name).then(function (asset) { return setNewEditAsset(asset); });
                                    } })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, showAttributes()))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addNewAsset, hidden: newEdit == 'Edit' || newEditAsset.ID != 0 }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addExistingAsset, hidden: newEdit == 'Edit' || newEditAsset.ID == 0 }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function (evt) { return saveButtonForExistingAssets(); }, hidden: newEdit == 'New' }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal", onClick: function (evt) { return setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["default"].getNewAsset('Line')); } }, "Close")))))));
}
/* harmony default export */ __webpack_exports__["default"] = (LocationAssetWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Location/LocationInfo.tsx":
/*!****************************************************!*\
  !*** ./TSX/SystemCenter/Location/LocationInfo.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
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
//******************************************************************************************************
//  ConnectionInfo.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  09/11/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************





var LocationInfoWindow = /** @class */ (function (_super) {
    __extends(LocationInfoWindow, _super);
    function LocationInfoWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Location: _this.props.Location
        };
        _this.valid = _this.valid.bind(_this);
        return _this;
    }
    LocationInfoWindow.prototype.componentDidMount = function () {
    };
    LocationInfoWindow.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({ Location: nextProps.Location });
    };
    LocationInfoWindow.prototype.updateLocation = function () {
        var _this = this;
        var location = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.Location);
        return $.ajax({
            type: "PATCH",
            url: homePath + "api/OpenXDA/Location/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Location),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (LocationID) {
            _this.props.stateSetter(location);
        });
    };
    LocationInfoWindow.prototype.valid = function (field) {
        if (field == 'LocationKey')
            return this.state.Location.LocationKey != null && this.state.Location.LocationKey.length > 0 && this.state.Location.LocationKey.length <= 50;
        else if (field == 'Name')
            return this.state.Location.Name != null && this.state.Location.Name.length > 0 && this.state.Location.Name.length <= 200;
        else if (field == 'Alias')
            return this.state.Location.Alias == null || this.state.Location.Alias.length <= 200;
        else if (field == 'ShortName')
            return this.state.Location.ShortName == null || this.state.Location.ShortName.length <= 50;
        else if (field == 'Latitude')
            return this.state.Location.Latitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(this.state.Location.Latitude);
        else if (field == 'Longitude')
            return this.state.Location.Longitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(this.state.Location.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    };
    LocationInfoWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Substation Information:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'LocationKey', Feedback: 'A unique key of less than 50 characters is required.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'Latitude', Feedback: 'Latitude is a require numeric field.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'Longitude', Feedback: 'Longitude is a require numeric field.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__["default"], { Rows: 3, Record: this.state.Location, Field: 'Description', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } })))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () { return _this.updateLocation(); }, hidden: this.state.Location.ID == 0, disabled: this.state.Location == this.props.Location }, "Update")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return _this.setState({ Location: _this.props.Location }); }, disabled: this.state.Location == this.props.Location }, "Reset")))));
    };
    return LocationInfoWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (LocationInfoWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Location/LocationMeter.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/Location/LocationMeter.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
//******************************************************************************************************
//  LocationMeter.tsx - Gbtc
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
//  01/21/2020 - Billy Ernest
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




function LocationMeterWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), meters = _a[0], setMeters = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getMeters();
    }, [props.Location.ID]);
    function getMeters() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location/" + props.Location.ID + "/Meters",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (meters) { return setMeters(meters); });
    }
    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID, state: {} });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Meters:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__["default"], { cols: [
                        { key: 'AssetKey', label: 'Key', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        { key: 'Name', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        //{ key: 'Type', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Make', label: 'Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Model', label: 'Assets', headerStyle: { width: 'calc(10%)' }, rowStyle: { width: '10%' } },
                    ], tableClass: "table table-hover", data: meters, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](meters, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setMeters(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](meters, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setMeters(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: handleSelect, selected: function () { return false; } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" })));
}
/* harmony default export */ __webpack_exports__["default"] = (LocationMeterWindow);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL1RhYmxlLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0xvY2F0aW9uL0xvY2F0aW9uLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0xvY2F0aW9uL0xvY2F0aW9uQXNzZXQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTG9jYXRpb24vTG9jYXRpb25JbmZvLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0xvY2F0aW9uL0xvY2F0aW9uTWV0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLCtCQUErQjtBQUMvQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsMkJBQTJCO0FBQzNCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBVzVCLFNBQVMsc0JBQXNCLENBQUMsS0FJL0I7SUFDUyxzRUFBZ0YsRUFBL0Usa0JBQVUsRUFBRSxxQkFBbUUsQ0FBQztJQUNqRixzRUFBdUYsRUFBdEYsd0JBQWdCLEVBQUUsaUJBQW9FLENBQUM7SUFDeEYseUVBQXNELEVBQXJELGVBQU8sRUFBRSxrQkFBNEMsQ0FBQztJQUN2RCxzRUFB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QyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDbEQsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDbkIsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDdkI7b0JBQ0wsQ0FBQyxFQUNELE9BQU8sRUFBRSxZQUFZLEVBQ3JCLFFBQVEsRUFBRSxjQUFNLFlBQUssRUFBTCxDQUFLLEdBQ3ZCLENBRUEsQ0FDSjtRQUNOLDZEQUFLLFNBQVMsRUFBQyxhQUFhLEdBQ3RCLENBQ0osQ0FFVCxDQUFDO0FBRU4sQ0FBQztBQUVjLGtGQUFtQixFQUFDIiwiZmlsZSI6IkxvY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBFeHRlcm5hbERCVXBkYXRlLnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDA0LzA3LzIwMjAgLSBDLiBMYWNrbmVyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1N5c3RlbUNlbnRlciwgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi9Gb3JtSW5wdXQnO1xuaW1wb3J0IEZvcm1DaGVja0JveCBmcm9tICcuL0Zvcm1DaGVja0JveCc7XG5pbXBvcnQgRm9ybVNlbGVjdCBmcm9tICcuL0Zvcm1TZWxlY3QnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21vbWVudC9tb21lbnQnO1xuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcblxuXG5cbmZ1bmN0aW9uIEV4dGVybmFsRGF0YUJhc2VXaW5kb3cocHJvcHM6IHtcbiAgICBJRDogbnVtYmVyLFxuICAgIFR5cGU6ICdBc3NldCcgfCAnTWV0ZXInIHwgJ0xvY2F0aW9uJyB8ICdDdXN0b21lcicgfCAnTGluZScgfCAnQnJlYWtlcicgfCAnQnVzJyB8ICdMaW5lU2VnbWVudCcgfCAnQ2FwYWNpdG9yQmFuaycgfCAnVHJhbnNmb3JtZXInIHwgJ0NhcGFjaXRvckJhbmtSZWxheScsXG4gICAgVGFiOiBzdHJpbmdcbn0pOiBKU1guRWxlbWVudCB7XG4gICAgY29uc3QgW2V4dGVybmFsREIsIHNldGV4dGVybmFsREJdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREI+PihbXSk7XG4gICAgY29uc3QgW2V4dGVybmFsREJGaWVsZHMsIHNldEZpZWxkc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPj4oW10pO1xuICAgIGNvbnN0IFtjaGFuZ2VkLCBzZXRDaGFuZ2VkXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgICBjb25zdCBbY3VycmVudERCLCBzZXRDdXJyZW50REJdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgIFxuICAgIFxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNldENoYW5nZWQoZmFsc2UpO1xuICAgICAgICBzZXRGaWVsZHMoW10pO1xuICAgICAgICByZXR1cm4gZ2V0RXh0ZXJuYWxEQnMoKTtcbiAgICB9LCBbcHJvcHMuSUQsIHByb3BzLlR5cGUsIHByb3BzLlRhYl0pOyBcblxuICAgIGZ1bmN0aW9uIGdldEV4dGVybmFsREJzKCkge1xuICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvJHtwcm9wcy5UeXBlfS9leHREYXRhQmFzZXNgLCBcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgIH0pXG5cbiAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogQXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREI+KSA9PiB7XG4gICAgICAgICAgIHNldGV4dGVybmFsREIoZGF0YSk7XG4gICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChoYW5kbGUuYWJvcnQgIT0gdW5kZWZpbmVkKSBoYW5kbGUuYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUV4dGVybmFsREIodHlwZTogc3RyaW5nKSB7XG5cbiAgICAgICAgbGV0IGhhbmRsZSA9ICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvRXh0ZXJuYWxEQi8ke3R5cGV9LyR7cHJvcHMuVHlwZX0vVXBkYXRlLyR7cHJvcHMuSUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KVxuXG4gICAgICAgIGhhbmRsZS5kb25lKChkYXRhOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPikgPT4ge1xuICAgICAgICAgICAgc2V0RmllbGRzKGRhdGEpXG4gICAgICAgICAgICBzZXRDaGFuZ2VkKHRydWUpXG4gICAgICAgICAgICBzZXRDdXJyZW50REIodHlwZSlcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IDEpXG4gICAgICAgICAgICAgICAgY2FuY2VsVXBkYXRlKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChoYW5kbGUuYWJvcnQgIT0gdW5kZWZpbmVkKSBoYW5kbGUuYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuXG4gICBcbiAgICBcbiAgICBmdW5jdGlvbiBjYW5jZWxVcGRhdGUoKTogdm9pZCB7XG4gICAgICAgIHNldEZpZWxkcyhbXSlcbiAgICAgICAgc2V0Q2hhbmdlZChmYWxzZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1VwZGF0ZShkYXRhOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPik6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgY2FuY2VsVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXRGaWVsZHMoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJtaXRVcGRhdGUoKSB7XG5cbiAgICAgICAgbGV0IGhhbmRsZSA9ICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL0V4dGVybmFsREIvJHtjdXJyZW50REJ9LyR7cHJvcHMuVHlwZX0vQ29uZmlybVVwZGF0ZWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBcImRhdGFcIjogZXh0ZXJuYWxEQkZpZWxkcyB9KSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pXG5cbiAgICAgICAgc2V0RmllbGRzKFtdKVxuICAgICAgICBzZXRDaGFuZ2VkKGZhbHNlKVxuXG4gICAgICAgIGdldEV4dGVybmFsREJzKCk7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChoYW5kbGUuYWJvcnQgIT0gdW5kZWZpbmVkKSBoYW5kbGUuYWJvcnQoKTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxoND4gRXh0ZXJuYWwgRGF0YSBCYXNlIENvbm5lY3Rpb25zOjwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICB7KGNoYW5nZWQ/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBpZD1cImZpZWxkc1wiIGNsYXNzTmFtZT0ndGFibGUnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLklEID09IC0xID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+IHtwcm9wcy5UeXBlfSA8L3RoPiA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5GaWVsZDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDMwMCB9fT5QcmV2aW91cyBWYWx1ZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDMwMCB9fT5VcGRhdGVkIFZhbHVlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogMzAgfX0+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogMzAgfX0+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2V4dGVybmFsREJGaWVsZHMubWFwKChhLCBpKSA9PiA8VGFibGVSb3dGaWVsZCBrZXk9e2l9IFBhcmVudFRhYmxlSUQ9e3Byb3BzLklEfSBGaWVsZD17YX0gVmFsdWVzPXtleHRlcm5hbERCRmllbGRzfSBTZXR0ZXI9e2NoZWNrVXBkYXRlfSAvPil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+KTooXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgaWQ9XCJvdmVydmlld1wiIGNsYXNzTmFtZT0ndGFibGUnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPjx0aD5FeHRlcm5hbCBEQjwvdGg+PHRoIHN0eWxlPXt7IHdpZHRoOiAyNTAgfX0+TGFzdCBVcGRhdGVkPC90aD48dGggc3R5bGU9e3sgd2lkdGg6IDMwMCB9fT48L3RoPjwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXh0ZXJuYWxEQi5tYXAoKGEsIGkpID0+IDxUYWJsZVJvd0lucHV0IGtleT17aX0gUGFyZW50VGFibGVJRD17cHJvcHMuSUR9IEV4dGVybmFsREI9e2EubmFtZX0gdXBkYXRlZD17YS5sYXN0dXBkYXRlfSBVcGRhdGU9eyhkYlR5cGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVFeHRlcm5hbERCKGRiVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT4pXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsoY2hhbmdlZCA/XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17c3VibWl0VXBkYXRlfT5TYXZlIENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17Y2FuY2VsVXBkYXRlfT5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxuICAgICAgICAgICAgPC9kaXY+IDogbnVsbCl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4dGVybmFsRGF0YUJhc2VXaW5kb3c7XG5cbmZ1bmN0aW9uIFRhYmxlUm93SW5wdXQocHJvcHM6IHsgUGFyZW50VGFibGVJRDogbnVtYmVyLCBFeHRlcm5hbERCOiBzdHJpbmcsIHVwZGF0ZWQ6IERhdGUsIFVwZGF0ZTogKGV4dGVybmFsREI6IHN0cmluZykgPT4gdm9pZCB9KSB7XG4gICBcbiAgICByZXR1cm4oXG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuRXh0ZXJuYWxEQn08L3RkPlxuICAgICAgICAgICAgPHRkPnsocHJvcHMudXBkYXRlZCA9PSBudWxsID8gXCJOL0FcIiA6IG1vbWVudChwcm9wcy51cGRhdGVkKS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpKX08L3RkPlxuICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KGUpID0+IHByb3BzLlVwZGF0ZShwcm9wcy5FeHRlcm5hbERCKX0+VXBkYXRlIHtwcm9wcy5FeHRlcm5hbERCfTwvYnV0dG9uPjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gVGFibGVSb3dGaWVsZChwcm9wczogeyBQYXJlbnRUYWJsZUlEOiBudW1iZXIsIEZpZWxkOiBTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkLCBWYWx1ZXM6IEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCRmllbGQ+LCBTZXR0ZXI6ICh2YWx1ZXM6IEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCRmllbGQ+KSA9PiB2b2lkfSkge1xuICAgIHZhciB2YWx1ZXM6IEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCRmllbGQ+ID0gXy5jbG9uZShwcm9wcy5WYWx1ZXMpO1xuICAgIHZhciB2YWx1ZTogU3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZCA9IHZhbHVlcy5maW5kKHZhbHVlID0+IHZhbHVlLkFkZGl0aW9uYWxGaWVsZElEID09IHByb3BzLkZpZWxkLkFkZGl0aW9uYWxGaWVsZElEICYmIHZhbHVlLk9wZW5YREFQYXJlbnRUYWJsZUlEID09IHByb3BzLkZpZWxkLk9wZW5YREFQYXJlbnRUYWJsZUlEICYmIHZhbHVlLmlzWERBRmllbGQgPT0gcHJvcHMuRmllbGQuaXNYREFGaWVsZCk7XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGaWVsZCgpIHtcbiAgICAgICAgdmFsdWVzID0gdmFsdWVzLmZpbHRlcihmbGQgPT4gIShmbGQuQWRkaXRpb25hbEZpZWxkSUQgPT0gcHJvcHMuRmllbGQuQWRkaXRpb25hbEZpZWxkSUQgJiYgZmxkLk9wZW5YREFQYXJlbnRUYWJsZUlEID09IHByb3BzLkZpZWxkLk9wZW5YREFQYXJlbnRUYWJsZUlEICYmIGZsZC5pc1hEQUZpZWxkID09IHByb3BzLkZpZWxkLmlzWERBRmllbGQpKVxuICAgICAgICBwcm9wcy5TZXR0ZXIodmFsdWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge3Byb3BzLlBhcmVudFRhYmxlSUQgPT0gLTEgP1xuICAgICAgICAgICAgICAgIDx0ZD57cHJvcHMuRmllbGQuRGlzcGxheU5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICA8dGQ+e3Byb3BzLkZpZWxkLkZpZWxkTmFtZX08L3RkPlxuICAgICAgICAgICAgPHRkPntwcm9wcy5GaWVsZC5QcmV2aW91c1ZhbHVlID09IG51bGwgPyBcIlwiIDogcHJvcHMuRmllbGQuUHJldmlvdXNWYWx1ZX08L3RkPlxuICAgICAgICAgICAgeyhwcm9wcy5GaWVsZC5FcnJvciA/IDx0ZD57cHJvcHMuRmllbGQuTWVzc2FnZX08L3RkPiA6XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXsocHJvcHMuRmllbGQuQ2hhbmdlZCA/IFwiZm9ybS1jb250cm9sIGlzLWludmFsaWRcIiA6IFwiZm9ybS1jb250cm9sXCIpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5WYWx1ZSA9IGV2dC50YXJnZXQudmFsdWUgYXMgYW55O1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLlZhbHVlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIodmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgfX0gdmFsdWU9e3ZhbHVlLlZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlLlZhbHVlLnRvU3RyaW5nKCl9IC8+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPHRkPntwcm9wcy5GaWVsZC5FcnJvciA/IDxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlXCI+PC9pPjwvc3Bhbj4gOiBudWxsfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHJlbW92ZUZpZWxkKCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj48L3RkPlxuICAgICAgICA8L3RyPlxuICAgICk7XG59XG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIFRhYmxlLnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMTgsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDA4LzAyLzIwMTggLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuY29uc3QgQW5nbGVJY29uOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDx7IGFzY2VuZGluZzogYm9vbGVhbiB9PiA9IChwcm9wcykgPT4gPHNwYW4gc3R5bGU9e3sgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBtYXJnaW46IDMgfX0gY2xhc3NOYW1lPXtcImZhIGZhLWFuZ2xlLVwiICsgKHByb3BzLmFzY2VuZGluZyA/ICd1cCcgOiAnZG93bicpfT48L3NwYW4+XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVQcm9wczxUPiB7XG4gICAgY29sczogQXJyYXk8eyBrZXk6IGtleW9mKFQpIHwgbnVsbCwgbGFiZWw6IHN0cmluZywgaGVhZGVyU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLCByb3dTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsIGNvbnRlbnQ/KGl0ZW06IFQsIGtleToga2V5b2YoVCksIHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzKTogUmVhY3QuUmVhY3ROb2RlIH0+LFxuICAgIGRhdGE6IEFycmF5PFQ+LFxuICAgIG9uQ2xpY2s6IChkYXRhOiB7IGNvbDoga2V5b2YgKFQpLCByb3c6IFQsIGRhdGE6IFRba2V5b2YoVCldIH0sIGV2ZW50OiBhbnkpID0+IHZvaWQsXG4gICAgc29ydEZpZWxkOiBzdHJpbmcsXG4gICAgYXNjZW5kaW5nOiBib29sZWFuLFxuICAgIG9uU29ydChkYXRhOiB7IGNvbDoga2V5b2YgKFQpLCBhc2VuZGluZzogYm9vbGVhbn0pOiB2b2lkLFxuICAgIHRhYmxlQ2xhc3M/OiBzdHJpbmcsXG4gICAgdGFibGVTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsXG4gICAgdGhlYWRTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsXG4gICAgdGhlYWRDbGFzcz86IHN0cmluZyxcbiAgICB0Ym9keVN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcyxcbiAgICB0Ym9keUNsYXNzPzogc3RyaW5nLFxuICAgIHNlbGVjdGVkPyhkYXRhOiBUKTogYm9vbGVhbixcbiAgICByb3dTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlPFQ+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFRhYmxlUHJvcHM8VD4sIHt9PiB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHJvd0NvbXBvbmVudHMgPSB0aGlzLmdlbmVyYXRlUm93cygpO1xuICAgICAgICB2YXIgaGVhZGVyQ29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVIZWFkZXJzKCk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXsodGhpcy5wcm9wcy50YWJsZUNsYXNzICE9IHVuZGVmaW5lZCA/IHRoaXMucHJvcHMudGFibGVDbGFzcyA6ICcnKX0gc3R5bGU9e3RoaXMucHJvcHMudGFibGVTdHlsZX0+XG4gICAgICAgICAgICAgICAgPHRoZWFkIHN0eWxlPXt0aGlzLnByb3BzLnRoZWFkU3R5bGV9PntoZWFkZXJDb21wb25lbnRzfTwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5IHN0eWxlPXt0aGlzLnByb3BzLnRib2R5U3R5bGV9Pntyb3dDb21wb25lbnRzfTwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdlbmVyYXRlSGVhZGVycygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29scy5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5wcm9wcy5jb2xzLm1hcCgoY29sRGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHZhciBzdHlsZTtcbiAgICAgICAgICAgIGlmIChjb2xEYXRhLmhlYWRlclN0eWxlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gY29sRGF0YS5oZWFkZXJTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xuXG4gICAgICAgICAgICBpZiAoc3R5bGUuY3Vyc29yID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgICAgIHJldHVybiA8dGgga2V5PXtpbmRleH0gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVTb3J0KHsgY29sOiBjb2xEYXRhLmtleSwgYXNjZW5kaW5nOiB0aGlzLnByb3BzLmFzY2VuZGluZyB9LCBlKX0+e2NvbERhdGEubGFiZWx9eyh0aGlzLnByb3BzLnNvcnRGaWVsZCA9PSBjb2xEYXRhLmtleSA/IDxBbmdsZUljb24gYXNjZW5kaW5nPXt0aGlzLnByb3BzLmFzY2VuZGluZ30gLz4gOiBudWxsKX08L3RoPlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gPHRyPntjZWxsc308L3RyPjtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVJvd3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGEubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5wcm9wcy5jb2xzLm1hcChjb2xEYXRhID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSBfLmNsb25lKGNvbERhdGEucm93U3R5bGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiA8dGRcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleC50b1N0cmluZygpICsgaXRlbVtjb2xEYXRhLmtleV0gKyBjb2xEYXRhLmtleX1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgeyBjb2w6IGNvbERhdGEua2V5LCByb3c6IGl0ZW0sIGRhdGE6IGl0ZW1bY29sRGF0YS5rZXldIH0pfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2NvbERhdGEuY29udGVudCAhPSB1bmRlZmluZWQgPyBjb2xEYXRhLmNvbnRlbnQoaXRlbSwgY29sRGF0YS5rZXksIHN0eWxlKSA6IGl0ZW1bY29sRGF0YS5rZXldfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHN0eWxlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5yb3dTdHlsZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IF8uY2xvbmUodGhpcy5wcm9wcy5yb3dTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcblxuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZChpdGVtKSlcbiAgICAgICAgICAgICAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcblxuICAgICAgICAgICAgcmV0dXJuIDx0ciBzdHlsZT17c3R5bGV9IGtleT17aW5kZXgudG9TdHJpbmcoKX0+e2NlbGxzfTwvdHI+O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhkYXRhOiB7IGNvbDoga2V5b2YoVCksIHJvdzogVCwgZGF0YTogYW55IH0sIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayhkYXRhLCBldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlU29ydChkYXRhLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU29ydChkYXRhKTtcbiAgICB9XG59O1xuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBMb2NhdGlvbi50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8yMS8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBMb2NhdGlvbkluZm9XaW5kb3cgZnJvbSAnLi9Mb2NhdGlvbkluZm8nO1xuaW1wb3J0IExvY2F0aW9uTWV0ZXJXaW5kb3cgZnJvbSAnLi9Mb2NhdGlvbk1ldGVyJztcbmltcG9ydCBMb2NhdGlvbkFzc2V0V2luZG93IGZyb20gJy4vTG9jYXRpb25Bc3NldCc7XG5pbXBvcnQgTm90ZVdpbmRvdyBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL05vdGVXaW5kb3cnO1xuaW1wb3J0IEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9BZGRpdGlvbmFsRmllbGRzV2luZG93JztcbmltcG9ydCBFeHRlcm5hbERCVXBkYXRlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZSc7XG5cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2F0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgTG9jYXRpb25JRDogbnVtYmVyIH0sIHsgTG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24sIFRhYjogc3RyaW5nfSwge30+e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgTG9jYXRpb246IG51bGwsXG4gICAgICAgICAgICBUYWI6IHRoaXMuZ2V0VGFiKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRhYigpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ0xvY2F0aW9uLlRhYicpKVxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnTG9jYXRpb24uVGFiJykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gJ25vdGVzJztcbiAgICB9XG5cbiAgICBnZXRMb2NhdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wcm9wcy5Mb2NhdGlvbklEID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTG9jYXRpb24vT25lLyR7dGhpcy5wcm9wcy5Mb2NhdGlvbklEfWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgoZGF0YTogT3BlblhEQS5Mb2NhdGlvbikgPT4gdGhpcy5zZXRTdGF0ZSh7IExvY2F0aW9uOiBkYXRhIH0pKTtcbiAgICB9XG5cbiAgICBkZWxldGVMb2NhdGlvbigpOiBKUXVlcnkuanFYSFIge1xuXG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIlRoaXMgd2lsbCBkZWxldGUgdGhlIFN1YnN0YXRpb24gUGVybWFuZW50bHlcIik7XG4gICAgICAgIGlmICghcmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Mb2NhdGlvbi9EZWxldGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5Mb2NhdGlvbiksXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRUYWIodGFiOnN0cmluZyk6IHZvaWQge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdMb2NhdGlvbi5UYWInLCBKU09OLnN0cmluZ2lmeSh0YWIpKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7VGFiOiB0YWJ9KTtcbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0TG9jYXRpb24oKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLkxvY2F0aW9uID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDYzLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDYzLCBvdmVyZmxvdzogJ2hpZGRlbicsIHBhZGRpbmc6IDE1IH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+e3RoaXMuc3RhdGUuTG9jYXRpb24gIT0gbnVsbCA/IHRoaXMuc3RhdGUuTG9jYXRpb24uTG9jYXRpb25LZXkgOiAnJ308L2gyPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgcHVsbC1yaWdodFwiIGhpZGRlbj17dGhpcy5zdGF0ZS5Mb2NhdGlvbiA9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB0aGlzLmRlbGV0ZUxvY2F0aW9uKCkuZG9uZSgoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbD9uYW1lPUxvY2F0aW9ucycpfT5EZWxldGUgTG9jYXRpb24gKFBlcm1hbmVudCk8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcIm5vdGVzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYignbm90ZXMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI25vdGVzXCI+Tm90ZXM8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJsb2NhdGlvbkluZm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdsb2NhdGlvbkluZm8nKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2xvY2F0aW9uSW5mb1wiPkxvY2F0aW9uIEluZm88L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJhZGRpdGlvbmFsRmllbGRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYignYWRkaXRpb25hbEZpZWxkcycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjYWRkaXRpb25hbEZpZWxkc1wiPkFkZGl0aW9uYWwgRmllbGRzPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRoaXMuc3RhdGUuVGFiID09IFwibWV0ZXJzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYignbWV0ZXJzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNtZXRlcnNcIj5NZXRlcnM8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJhc3NldHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdhc3NldHMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2Fzc2V0c1wiPkFzc2V0czwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImV4dERCXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYignZXh0REInKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2V4dERCXCI+RXh0ZXJuYWwgREI8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCIgc3R5bGU9e3ttYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDIxNSwgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcIm5vdGVzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJub3Rlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE5vdGVXaW5kb3cgSUQ9e3RoaXMucHJvcHMuTG9jYXRpb25JRH0gVHlwZT0nTG9jYXRpb24nLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwibG9jYXRpb25JbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJsb2NhdGlvbkluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2NhdGlvbkluZm9XaW5kb3cgTG9jYXRpb249e3RoaXMuc3RhdGUuTG9jYXRpb259IHN0YXRlU2V0dGVyPXsoTG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24pID0+IHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogTG9jYXRpb24gfSl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImFkZGl0aW9uYWxGaWVsZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBZGRpdGlvbmFsRmllbGRzV2luZG93IElEPXt0aGlzLnByb3BzLkxvY2F0aW9uSUR9IFR5cGU9J0xvY2F0aW9uJyBUYWI9e3RoaXMuc3RhdGUuVGFifSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJtZXRlcnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cIm1ldGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvY2F0aW9uTWV0ZXJXaW5kb3cgTG9jYXRpb249e3RoaXMuc3RhdGUuTG9jYXRpb259IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFzc2V0c1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiYXNzZXRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TG9jYXRpb25Bc3NldFdpbmRvdyBMb2NhdGlvbj17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiZXh0REJcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImV4dERCXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXh0ZXJuYWxEQlVwZGF0ZSBJRD17dGhpcy5wcm9wcy5Mb2NhdGlvbklEfSBUeXBlPSdMb2NhdGlvbicgVGFiPXt0aGlzLnN0YXRlLlRhYn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBMb2NhdGlvbkFzc2V0LnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCAgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzICBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIFxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzIxLzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9UYWJsZSc7XG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xuaW1wb3J0IEJyZWFrZXJBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXInO1xuaW1wb3J0IEJ1c0F0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQnVzJztcbmltcG9ydCBDYXBCYW5rQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rJztcbmltcG9ydCBMaW5lQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9MaW5lJztcbmltcG9ydCBUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvVHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgZ2V0QWxsQXNzZXRzLCBnZXRBc3NldFR5cGVzLCBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzLCBlZGl0RXhpc3RpbmdBc3NldCB9IGZyb20gJy4uLy4uLy4uL1RTL1NlcnZpY2VzL0Fzc2V0JztcblxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcblxuaW50ZXJmYWNlIExvY2F0aW9uQXNzZXRTdGF0ZSB7XG4gICAgQXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PixcbiAgICBOZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lcixcbiAgICBBbGxBc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+LFxuICAgIEFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPixcbiAgICBOZXdFZGl0OiBTeXN0ZW1DZW50ZXIuTmV3RWRpdCxcbiAgICBTb3J0ZmllbGQ6IGtleW9mIChPcGVuWERBLk1ldGVyKSwgQXNjZW5kaW5nOiBib29sZWFuXG5cbn1cblxuZnVuY3Rpb24gTG9jYXRpb25Bc3NldFdpbmRvdyhwcm9wczogeyBMb2NhdGlvbjogT3BlblhEQS5Mb2NhdGlvbiB9KTogSlNYLkVsZW1lbnR7XG4gICAgbGV0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5Bc3NldD4+KFtdKTtcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8a2V5b2YoT3BlblhEQS5Bc3NldCk+KCdBc3NldEtleScpO1xuICAgIGNvbnN0IFthc2NlbmRpbmcsIHNldEFzY2VuZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgICBjb25zdCBbbmV3RWRpdEFzc2V0LCBzZXROZXdFZGl0QXNzZXRdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLlRyYW5zZm9ybWVyPihBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSk7XG4gICAgY29uc3QgW25ld0VkaXQsIHNldE5ld0VkaXRdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLk5ld0VkaXQ+KCdOZXcnKTtcbiAgICBjb25zdCBbYXNzZXRUeXBlcywgc2V0QXNzZXRUeXBlc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkFzc2V0VHlwZT4+KFtdKTtcbiAgICBjb25zdCBbYWxsQXNzZXRzLCBzZXRBbGxBc3NldHNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5Bc3NldD4+KFtdKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGdldERhdGFzKClcbiAgICB9LCBbcHJvcHMuTG9jYXRpb24uSURdKTtcblxuICAgIGZ1bmN0aW9uIGdldERhdGFzKCk6IHZvaWQge1xuICAgICAgICBnZXRBc3NldHMoKTtcbiAgICAgICAgZ2V0QWxsQXNzZXRzKCkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xuICAgICAgICAgICAgc2V0QWxsQXNzZXRzKGFzc2V0cyk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZXRBc3NldFR5cGVzKCkuZG9uZSgoYXNzZXRUeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+KSA9PiB7XG4gICAgICAgICAgICBzZXRBc3NldFR5cGVzKCBhc3NldFR5cGVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QXNzZXRzKCk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTG9jYXRpb24vJHtwcm9wcy5Mb2NhdGlvbi5JRH0vQXNzZXRzYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKGRhdGEsIF8gKSA9PiBzZXREYXRhKGRhdGEpKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGFkZE5ld0Fzc2V0KCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0L05ldy9Mb2NhdGlvbi8ke3Byb3BzLkxvY2F0aW9uLklEfWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBBc3NldDogbmV3RWRpdEFzc2V0IH0pLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgZ2V0RGF0YXMoKTtcbiAgICAgICAgICAgIHNldE5ld0VkaXRBc3NldChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSlcblxuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkRXhpc3RpbmdBc3NldCgpIHtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvRXhpc3RpbmcvTG9jYXRpb24vJHtwcm9wcy5Mb2NhdGlvbi5JRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgQXNzZXQ6IG5ld0VkaXRBc3NldCB9KSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIGdldERhdGFzKCk7XG4gICAgICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQXNzZXQoYXNzZXQ6IE9wZW5YREEuQXNzZXQpIHtcbiAgICAgIHJldHVybiAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7YXNzZXQuSUR9L0xvY2F0aW9uLyR7cHJvcHMuTG9jYXRpb24uSUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKGFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4pID0+IHtcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBnZXREYXRhcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE5ld0J1dHRvbigpOiB2b2lkIHtcbiAgICAgICAgc2V0TmV3RWRpdCgnTmV3Jyk7XG4gICAgICAgIHNldE5ld0VkaXRBc3NldChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gc2F2ZUJ1dHRvbkZvckV4aXN0aW5nQXNzZXRzKCkge1xuICAgICAgICBsZXQgdGhpbmcgPSBhd2FpdCBlZGl0RXhpc3RpbmdBc3NldChuZXdFZGl0QXNzZXQpO1xuICAgICAgICBnZXREYXRhcygpO1xuICAgICAgICBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd0F0dHJpYnV0ZXMoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQnJlYWtlcicpXG4gICAgICAgICAgICByZXR1cm4gPEJyZWFrZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5CcmVha2VyfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSBTaG93U3BhcmU9e3RydWV9IC8+O1xuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCdXMnKVxuICAgICAgICAgICAgcmV0dXJuIDxCdXNBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXR9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdDYXBhY2l0b3JCYW5rJylcbiAgICAgICAgICAgIHJldHVybiA8Q2FwQmFua0F0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLkNhcEJhbmt9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdMaW5lJylcbiAgICAgICAgICAgIHJldHVybiA8TGluZUF0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLkxpbmV9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdUcmFuc2Zvcm1lcicpXG4gICAgICAgICAgICByZXR1cm4gPFRyYW5zZm9ybWVyQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuVHJhbnNmb3JtZXJ9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxlY3QoaXRlbSwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5sb2NhbE5hbWUgPT0gJ3RkJylcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiBob21lUGF0aCArICdpbmRleC5jc2h0bWwnLCBzZWFyY2g6ICc/bmFtZT1Bc3NldCZBc3NldElEPScgKyBpdGVtLnJvdy5JRCwgc3RhdGU6IHt9IH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkFzc2V0czo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzgxLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZTxPcGVuWERBLkFzc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgY29scz17W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRLZXknLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMzAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzMwJScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXROYW1lJywgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICczMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMzAlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldFR5cGUnLCBsYWJlbDogJ1R5cGUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIGNvbnRlbnQ6IChhc3NldCwga2V5LCBzdHlsZSkgPT4gPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNhc3NldE1vZGFsJyBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXRUeXBlID0gYXNzZXRUeXBlcy5maW5kKGF0ID0+IGF0LklEID09IGFzc2V0WydBc3NldFR5cGVJRCddKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMoYXNzZXQuSUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKGFzc2V0ID0+IHNldE5ld0VkaXRBc3NldChhc3NldCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0VkaXQoJ0VkaXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBlbmNpbFwiPjwvaT48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVBc3NldChhc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZz17YXNjZW5kaW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyZWQgPSBfLm9yZGVyQnkoZGF0YSwgW2QuY29sXSwgWyghYXNjZW5kaW5nID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldERhdGEob3JkZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShkYXRhLCBbZC5jb2xdLCBbXCJhc2NcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldERhdGEob3JkZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZChkLmNvbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoaXRlbSkgPT4gZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNhc3NldE1vZGFsJyBvbkNsaWNrPXthZGROZXdCdXR0b259PkFkZCBBc3NldDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cImFzc2V0TW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIHdpZHRoOiAnNzUlJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPntuZXdFZGl0ID09ICdOZXcnID8gJ0FkZCBOZXcgQXNzZXQgdG8gTWV0ZXInIDogJ0VkaXQgJyArIG5ld0VkaXRBc3NldC5Bc3NldEtleSArICcgZm9yIE1ldGVyJ308L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpfT4mdGltZXM7PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXNzZXRBdHRyaWJ1dGVzIEFzc2V0PXtuZXdFZGl0QXNzZXR9IE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0VHlwZXM9e2Fzc2V0VHlwZXN9IEFsbEFzc2V0cz17YWxsQXNzZXRzfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSBHZXREaWZmZXJlbnRBc3NldD17KGFzc2V0SUQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXQgPSBhbGxBc3NldHMuZmluZChhID0+IGEuSUQgPT0gYXNzZXRJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0VHlwZSA9IGFzc2V0VHlwZXMuZmluZChhdCA9PiBhdC5JRCA9PSBhc3NldFsnQXNzZXRUeXBlSUQnXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzKGFzc2V0SUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKGFzc2V0ID0+IHNldE5ld0VkaXRBc3NldChhc3NldCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0F0dHJpYnV0ZXMoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXthZGROZXdBc3NldH0gaGlkZGVuPXtuZXdFZGl0ID09ICdFZGl0JyB8fCBuZXdFZGl0QXNzZXQuSUQgIT0gMH0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17YWRkRXhpc3RpbmdBc3NldH0gaGlkZGVuPXtuZXdFZGl0ID09ICdFZGl0JyB8fCBuZXdFZGl0QXNzZXQuSUQgPT0gMH0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4gc2F2ZUJ1dHRvbkZvckV4aXN0aW5nQXNzZXRzKCl9IGhpZGRlbj17bmV3RWRpdCA9PSAnTmV3J30+U2F2ZTwvYnV0dG9uPlxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4gc2V0TmV3RWRpdEFzc2V0KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpKX0+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25Bc3NldFdpbmRvdztcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQ29ubmVjdGlvbkluZm8udHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDkvMTEvMjAxOSAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XG5pbXBvcnQgRm9ybVRleHRBcmVhIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybVRleHRBcmVhJztcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9jYXRpb25JbmZvV2luZG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgTG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24sIHN0YXRlU2V0dGVyOiAobG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24pID0+IHZvaWQgfSwgeyBMb2NhdGlvbjogT3BlblhEQS5Mb2NhdGlvbn0sIHt9PiB7XG4gICAganF1ZXJ5SGFuZGxlOiBKUXVlcnkuanFYSFI7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgTG9jYXRpb246IHRoaXMucHJvcHMuTG9jYXRpb25cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy52YWxpZC5iaW5kKHRoaXMpO1xuICAgIH1cblxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7TG9jYXRpb246IG5leHRQcm9wcy5Mb2NhdGlvbn0pXG4gICAgfVxuXG4gICAgdXBkYXRlTG9jYXRpb24oKTogSlF1ZXJ5LmpxWEhSIHtcbiAgICAgICAgdmFyIGxvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uID0gXy5jbG9uZSh0aGlzLnN0YXRlLkxvY2F0aW9uKTtcblxuICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Mb2NhdGlvbi9VcGRhdGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5Mb2NhdGlvbiksXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgIH0pLmRvbmUoKExvY2F0aW9uSUQ6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zdGF0ZVNldHRlcihsb2NhdGlvbik7XG4gICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkxvY2F0aW9uKSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmllbGQgPT0gJ0xvY2F0aW9uS2V5JykgXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5Mb2NhdGlvbi5Mb2NhdGlvbktleSAhPSBudWxsICYmIHRoaXMuc3RhdGUuTG9jYXRpb24uTG9jYXRpb25LZXkubGVuZ3RoID4gMCAmJiB0aGlzLnN0YXRlLkxvY2F0aW9uLkxvY2F0aW9uS2V5Lmxlbmd0aCA8PSA1MDtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uTmFtZSAhPSBudWxsICYmIHRoaXMuc3RhdGUuTG9jYXRpb24uTmFtZS5sZW5ndGggPiAwICYmIHRoaXMuc3RhdGUuTG9jYXRpb24uTmFtZS5sZW5ndGggPD0gMjAwO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQWxpYXMnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uQWxpYXMgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLkxvY2F0aW9uLkFsaWFzLmxlbmd0aCA8PSAyMDA7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTaG9ydE5hbWUnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uU2hvcnROYW1lID09IG51bGwgfHwgdGhpcy5zdGF0ZS5Mb2NhdGlvbi5TaG9ydE5hbWUubGVuZ3RoIDw9IDUwO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTGF0aXR1ZGUnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uTGF0aXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHRoaXMuc3RhdGUuTG9jYXRpb24uTGF0aXR1ZGUpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTG9uZ2l0dWRlJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkxvY2F0aW9uLkxvbmdpdHVkZSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIodGhpcy5zdGF0ZS5Mb2NhdGlvbi5Mb25naXR1ZGUpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRGVzY3JpcHRpb24nKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlN1YnN0YXRpb24gSW5mb3JtYXRpb246PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydMb2NhdGlvbktleSd9IEZlZWRiYWNrPXsnQSB1bmlxdWUga2V5IG9mIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhsb2NhdGlvbikgPT4gdGhpcy5zZXRTdGF0ZSh7IExvY2F0aW9uOiBsb2NhdGlvbiB9KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydOYW1lJ30gRmVlZGJhY2s9eydOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzIGFuZCBpcyByZXF1aXJlZC4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXsobG9jYXRpb24pID0+IHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogbG9jYXRpb24gfSl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3RoaXMuc3RhdGUuTG9jYXRpb259IEZpZWxkPXsnU2hvcnROYW1lJ30gRmVlZGJhY2s9eydTaG9ydE5hbWUgbXVzdCBiZSBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycy4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXsobG9jYXRpb24pID0+IHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogbG9jYXRpb24gfSl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3RoaXMuc3RhdGUuTG9jYXRpb259IEZpZWxkPXsnQWxpYXMnfSBGZWVkYmFjaz17J0FsaWFzIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhsb2NhdGlvbikgPT4gdGhpcy5zZXRTdGF0ZSh7IExvY2F0aW9uOiBsb2NhdGlvbiB9KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydMYXRpdHVkZSd9IEZlZWRiYWNrPXsnTGF0aXR1ZGUgaXMgYSByZXF1aXJlIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KGxvY2F0aW9uKSA9PiB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb246IGxvY2F0aW9uIH0pfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnN0YXRlLkxvY2F0aW9ufSBGaWVsZD17J0xvbmdpdHVkZSd9IEZlZWRiYWNrPXsnTG9uZ2l0dWRlIGlzIGEgcmVxdWlyZSBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhsb2NhdGlvbikgPT4gdGhpcy5zZXRTdGF0ZSh7TG9jYXRpb246IGxvY2F0aW9ufSl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTG9jYXRpb24+IFJvd3M9ezN9IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydEZXNjcmlwdGlvbid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhsb2NhdGlvbikgPT4gdGhpcy5zZXRTdGF0ZSh7IExvY2F0aW9uOiBsb2NhdGlvbiB9KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVMb2NhdGlvbigpfSBoaWRkZW49e3RoaXMuc3RhdGUuTG9jYXRpb24uSUQgPT0gMH0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuTG9jYXRpb24gPT0gdGhpcy5wcm9wcy5Mb2NhdGlvbn0+VXBkYXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogdGhpcy5wcm9wcy5Mb2NhdGlvbiB9KX0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuTG9jYXRpb24gPT0gdGhpcy5wcm9wcy5Mb2NhdGlvbn0+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgTG9jYXRpb25NZXRlci50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8yMS8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1RhYmxlJztcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5mdW5jdGlvbiBMb2NhdGlvbk1ldGVyV2luZG93KHByb3BzOiB7IExvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uIH0pOiBKU1guRWxlbWVudHtcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcbiAgICBjb25zdCBbbWV0ZXJzLCBzZXRNZXRlcnNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5NZXRlcj4+KFtdKTtcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8a2V5b2YoT3BlblhEQS5NZXRlcik+KCdBc3NldEtleScpO1xuICAgIGNvbnN0IFthc2NlbmRpbmcsIHNldEFzY2VuZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGdldE1ldGVycygpO1xuICAgIH0sIFtwcm9wcy5Mb2NhdGlvbi5JRF0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0TWV0ZXJzKCk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTG9jYXRpb24vJHtwcm9wcy5Mb2NhdGlvbi5JRH0vTWV0ZXJzYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUobWV0ZXJzID0+IHNldE1ldGVycyhtZXRlcnMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxlY3QoaXRlbSkge1xuICAgICAgICBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9TWV0ZXImTWV0ZXJJRD0nICsgaXRlbS5yb3cuSUQsIHN0YXRlOiB7fSB9KVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5NZXRlcnM6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDM4MSwgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICA8VGFibGU8T3BlblhEQS5NZXRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0S2V5JywgbGFiZWw6ICdLZXknLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzMwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICczMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05hbWUnLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzMwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICczMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sga2V5OiAnVHlwZScsIGxhYmVsOiAnVHlwZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWFrZScsIGxhYmVsOiAnTWV0ZXJzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNb2RlbCcsIGxhYmVsOiAnQXNzZXRzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdjYWxjKDEwJSknIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e21ldGVyc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblNvcnQ9eyhkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShtZXRlcnMsIFtkLmNvbF0sIFsoIWFzY2VuZGluZyA/IFwiYXNjXCIgOiBcImRlc2NcIildKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXRlcnMob3JkZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShtZXRlcnMsIFtkLmNvbF0sIFtcImFzY1wiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWV0ZXJzKG9yZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTb3J0RmllbGQoZC5jb2wpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KCkgPT4gZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25NZXRlcldpbmRvdzsiXSwic291cmNlUm9vdCI6IiJ9