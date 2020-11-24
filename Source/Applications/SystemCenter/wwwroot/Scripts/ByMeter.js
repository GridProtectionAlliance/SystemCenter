(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ByMeter"],{

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

/***/ "./TSX/SystemCenter/Meter/ByMeter.tsx":
/*!********************************************!*\
  !*** ./TSX/SystemCenter/Meter/ByMeter.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/ExternalDBUpdate */ "./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx");
//******************************************************************************************************
//  ByMeter.tsx - Gbtc
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
//  08/22/2019 - Billy Ernest
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





var ByMeter = function (props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([{ Field: 'Meter.AssetKey', SearchText: '' }]), 2), search = _a[0], setSearch = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), data = _b[0], setData = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortField = _c[0], setSortField = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _d[0], setAscending = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getMeters();
        handle.done(function (data) { return setData(data); });
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        };
    }, []);
    function getMeters() {
        return $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/Meter/SearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(search),
            cache: false,
            async: true
        });
    }
    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID, state: {} });
    }
    function goNewMeterWizard() {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=NewMeterWizard', state: {} });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: '100%' } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("nav", { className: "navbar navbar-expand-lg navbar-light bg-light" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "collapse navbar-collapse", id: "navbarSupportedContent", style: { width: '100%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "navbar-nav mr-auto", style: { width: '100%' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item", style: { width: '50%', paddingRight: 10 } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "Search: "),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null, search.map(function (s, index, a) {
                                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "input-group", key: index, style: { border: '1px solid lightgray' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "input-group-prepend" },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', style: { height: '100%' }, value: s.Field, onChange: function (evt) {
                                                s.Field = evt.target.value;
                                                var array = lodash__WEBPACK_IMPORTED_MODULE_2__["clone"](a);
                                                setSearch(array);
                                            } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: 'Meter.AssetKey' }, "Key"),
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: 'Meter.Name' }, "Name"),
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: 'Location.LocationKey' }, "Location"),
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: 'Meter.Make' }, "Make"),
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: 'Meter.Model' }, "Model"),
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: 'Asset.AssetKey' }, "Asset"),
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: 'Note.Note' }, "Note"))),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', type: 'text', placeholder: 'Search...', value: s.SearchText, onChange: function (evt) {
                                            s.SearchText = evt.target.value;
                                            var array = lodash__WEBPACK_IMPORTED_MODULE_2__["clone"](a);
                                            setSearch(array);
                                        }, onKeyDown: function (evt) {
                                            if (evt.keyCode == 13) {
                                                evt.preventDefault();
                                                getMeters().done(function (ms) { return setData(ms); });
                                            }
                                        } }),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "input-group-append" },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger", type: "button", onClick: function (evt) {
                                                var array = lodash__WEBPACK_IMPORTED_MODULE_2__["clone"](a);
                                                array.splice(index, 1);
                                                setSearch(array);
                                            } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                            })))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item", style: { width: '15%', paddingRight: 10 } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "Search Params:"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function (event) {
                                            event.preventDefault();
                                            var array = lodash__WEBPACK_IMPORTED_MODULE_2__["clone"](search);
                                            array.push({ Field: 'Meter.AssetKey', SearchText: '' });
                                            setSearch(array);
                                        } }, "Add Parameter")),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function (event) {
                                            event.preventDefault();
                                            getMeters().done(function (ms) { return setData(ms); });
                                        } }, "Update Search"))))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item", style: { width: '15%', paddingRight: 10 } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "Wizards:"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: goNewMeterWizard, hidden: props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0 }, "New Meter")))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item", style: { width: '20%', paddingRight: 10 } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "Actions:"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#extDBModal", hidden: props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0, onClick: function (event) { event.preventDefault(); } }, "Update Ext DB ")))))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: 'calc( 100% - 136px)' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_1__["default"], { cols: [
                    { key: 'AssetKey', label: 'Key', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location', label: 'Substation', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'MappedAssets', label: 'Assets', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'Make', label: 'Make', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'Model', label: 'Model', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ], tableClass: "table table-hover", data: data, sortField: sortField, ascending: ascending, onSort: function (d) {
                    if (d.col == sortField) {
                        var ordered = lodash__WEBPACK_IMPORTED_MODULE_2__["orderBy"](data, [d.col], [(!ascending ? "asc" : "desc")]);
                        setAscending(!ascending);
                        setData(ordered);
                    }
                    else {
                        var ordered = lodash__WEBPACK_IMPORTED_MODULE_2__["orderBy"](data, [d.col], ["asc"]);
                        setAscending(!ascending);
                        setData(ordered);
                        setSortField(d.col);
                    }
                }, onClick: handleSelect, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "extDBModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '75%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, "Meter External Database Fields"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_4__["default"], { ID: -1, Type: 'Meter', Tab: "" })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close")))))));
};
/* harmony default export */ __webpack_exports__["default"] = (ByMeter);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL1RhYmxlLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL01ldGVyL0J5TWV0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLCtCQUErQjtBQUMvQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsMkJBQTJCO0FBQzNCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBVzVCLFNBQVMsc0JBQXNCLENBQUMsS0FJL0I7SUFDUyxzRUFBZ0YsRUFBL0Usa0JBQVUsRUFBRSxxQkFBbUUsQ0FBQztJQUNqRixzRUFBdUYsRUFBdEYsd0JBQWdCLEVBQUUsaUJBQW9FLENBQUM7SUFDeEYseUVBQXNELEVBQXJELGVBQU8sRUFBRSxrQkFBNEMsQ0FBQztJQUN2RCxzRUFBc0QsRUFBckQsaUJBQVMsRUFBRSxvQkFBMEMsQ0FBQztJQUc3RCwrQ0FBZSxDQUFDO1FBQ1osVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNkLE9BQU8sY0FBYyxFQUFFLENBQUM7SUFDNUIsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFL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RUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDNUYsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDM0YsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDbkcsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDbkcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDekYsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDM0YsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7aUJBRXZHLEVBQ0QsVUFBVSxFQUFDLG1CQUFtQixFQUM5QixJQUFJLEVBQUUsSUFBSSxFQUNWLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLE1BQU0sRUFBRSxVQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsRUFBRTt3QkFDcEIsSUFBSSxPQUFPLEdBQUcsOENBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEUsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDcEI7eUJBQ0k7d0JBQ0QsSUFBSSxPQUFPLEdBQUcsOENBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNqQixZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUN2QjtnQkFDTCxDQUFDLEVBQ0QsT0FBTyxFQUFFLFlBQVksRUFDckIsVUFBVSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUMxRixVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUcsRUFDMUcsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUN4RixRQUFRLEVBQUUsVUFBQyxJQUFJLElBQUssWUFBSyxFQUFMLENBQUssR0FDM0IsQ0FDQTtRQUVOLDZEQUFLLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFlBQVk7WUFDbEMsNkRBQUssU0FBUyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ25FLDZEQUFLLFNBQVMsRUFBQyxlQUFlO29CQUMxQiw2REFBSyxTQUFTLEVBQUMsY0FBYzt3QkFDekIsNERBQUksU0FBUyxFQUFDLGFBQWEscUNBQW9DO3dCQUMvRCxnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxPQUFPLGtCQUFjLE9BQU8sYUFBaUIsQ0FDM0U7b0JBQ04sNkRBQUssU0FBUyxFQUFDLFlBQVk7d0JBQ3ZCLG9EQUFDLDBFQUFnQixJQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBRyxFQUFFLEdBQUUsQ0FDL0M7b0JBQ04sNkRBQUssU0FBUyxFQUFDLGNBQWM7d0JBQ3pCLGdFQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLGdCQUFnQixrQkFBYyxPQUFPLFlBQWUsQ0FDbEYsQ0FFSixDQUNKLENBQ0osQ0FFSixDQUNUO0FBQ0wsQ0FBQztBQUVjLHNFQUFPLEVBQUMiLCJmaWxlIjoiQnlNZXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgRXh0ZXJuYWxEQlVwZGF0ZS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwNC8wNy8yMDIwIC0gQy4gTGFja25lclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtTeXN0ZW1DZW50ZXIsIE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4vRm9ybUlucHV0JztcbmltcG9ydCBGb3JtQ2hlY2tCb3ggZnJvbSAnLi9Gb3JtQ2hlY2tCb3gnO1xuaW1wb3J0IEZvcm1TZWxlY3QgZnJvbSAnLi9Gb3JtU2VsZWN0JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9tb21lbnQvbW9tZW50JztcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cblxuXG5mdW5jdGlvbiBFeHRlcm5hbERhdGFCYXNlV2luZG93KHByb3BzOiB7XG4gICAgSUQ6IG51bWJlcixcbiAgICBUeXBlOiAnQXNzZXQnIHwgJ01ldGVyJyB8ICdMb2NhdGlvbicgfCAnQ3VzdG9tZXInIHwgJ0xpbmUnIHwgJ0JyZWFrZXInIHwgJ0J1cycgfCAnTGluZVNlZ21lbnQnIHwgJ0NhcGFjaXRvckJhbmsnIHwgJ1RyYW5zZm9ybWVyJyB8ICdDYXBhY2l0b3JCYW5rUmVsYXknLFxuICAgIFRhYjogc3RyaW5nXG59KTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IFtleHRlcm5hbERCLCBzZXRleHRlcm5hbERCXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCPj4oW10pO1xuICAgIGNvbnN0IFtleHRlcm5hbERCRmllbGRzLCBzZXRGaWVsZHNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZD4+KFtdKTtcbiAgICBjb25zdCBbY2hhbmdlZCwgc2V0Q2hhbmdlZF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2N1cnJlbnREQiwgc2V0Q3VycmVudERCXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oXCJcIik7XG4gICBcbiAgICBcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRDaGFuZ2VkKGZhbHNlKTtcbiAgICAgICAgc2V0RmllbGRzKFtdKTtcbiAgICAgICAgcmV0dXJuIGdldEV4dGVybmFsREJzKCk7XG4gICAgfSwgW3Byb3BzLklELCBwcm9wcy5UeXBlLCBwcm9wcy5UYWJdKTsgXG5cbiAgICBmdW5jdGlvbiBnZXRFeHRlcm5hbERCcygpIHtcbiAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBLyR7cHJvcHMuVHlwZX0vZXh0RGF0YUJhc2VzYCwgXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICB9KVxuXG4gICAgICAgaGFuZGxlLmRvbmUoKGRhdGE6IEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCPikgPT4ge1xuICAgICAgICAgICBzZXRleHRlcm5hbERCKGRhdGEpO1xuICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVFeHRlcm5hbERCKHR5cGU6IHN0cmluZykge1xuXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL0V4dGVybmFsREIvJHt0eXBlfS8ke3Byb3BzLlR5cGV9L1VwZGF0ZS8ke3Byb3BzLklEfWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSlcblxuICAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogQXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZD4pID0+IHtcbiAgICAgICAgICAgIHNldEZpZWxkcyhkYXRhKVxuICAgICAgICAgICAgc2V0Q2hhbmdlZCh0cnVlKVxuICAgICAgICAgICAgc2V0Q3VycmVudERCKHR5cGUpXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCAxKVxuICAgICAgICAgICAgICAgIGNhbmNlbFVwZGF0ZSgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcblxuICAgXG4gICAgXG4gICAgZnVuY3Rpb24gY2FuY2VsVXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBzZXRGaWVsZHMoW10pXG4gICAgICAgIHNldENoYW5nZWQoZmFsc2UpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tVcGRhdGUoZGF0YTogQXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZD4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgIGNhbmNlbFVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0RmllbGRzKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VibWl0VXBkYXRlKCkge1xuXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9FeHRlcm5hbERCLyR7Y3VycmVudERCfS8ke3Byb3BzLlR5cGV9L0NvbmZpcm1VcGRhdGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgXCJkYXRhXCI6IGV4dGVybmFsREJGaWVsZHMgfSksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KVxuXG4gICAgICAgIHNldEZpZWxkcyhbXSlcbiAgICAgICAgc2V0Q2hhbmdlZChmYWxzZSlcblxuICAgICAgICBnZXRFeHRlcm5hbERCcygpO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8aDQ+IEV4dGVybmFsIERhdGEgQmFzZSBDb25uZWN0aW9uczo8L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgeyhjaGFuZ2VkPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgaWQ9XCJmaWVsZHNcIiBjbGFzc05hbWU9J3RhYmxlJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5JRCA9PSAtMSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPiB7cHJvcHMuVHlwZX0gPC90aD4gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+RmllbGQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAzMDAgfX0+UHJldmlvdXMgVmFsdWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAzMDAgfX0+VXBkYXRlZCBWYWx1ZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDMwIH19PjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDMwIH19PjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtleHRlcm5hbERCRmllbGRzLm1hcCgoYSwgaSkgPT4gPFRhYmxlUm93RmllbGQga2V5PXtpfSBQYXJlbnRUYWJsZUlEPXtwcm9wcy5JRH0gRmllbGQ9e2F9IFZhbHVlcz17ZXh0ZXJuYWxEQkZpZWxkc30gU2V0dGVyPXtjaGVja1VwZGF0ZX0gLz4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPik6KFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGlkPVwib3ZlcnZpZXdcIiBjbGFzc05hbWU9J3RhYmxlJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGg+RXh0ZXJuYWwgREI8L3RoPjx0aCBzdHlsZT17eyB3aWR0aDogMjUwIH19Pkxhc3QgVXBkYXRlZDwvdGg+PHRoIHN0eWxlPXt7IHdpZHRoOiAzMDAgfX0+PC90aD48L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2V4dGVybmFsREIubWFwKChhLCBpKSA9PiA8VGFibGVSb3dJbnB1dCBrZXk9e2l9IFBhcmVudFRhYmxlSUQ9e3Byb3BzLklEfSBFeHRlcm5hbERCPXthLm5hbWV9IHVwZGF0ZWQ9e2EubGFzdHVwZGF0ZX0gVXBkYXRlPXsoZGJUeXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRXh0ZXJuYWxEQihkYlR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+KVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7KGNoYW5nZWQgP1xuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3N1Ym1pdFVwZGF0ZX0+U2F2ZSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e2NhbmNlbFVwZGF0ZX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgICAgIDwvZGl2PiA6IG51bGwpfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBFeHRlcm5hbERhdGFCYXNlV2luZG93O1xuXG5mdW5jdGlvbiBUYWJsZVJvd0lucHV0KHByb3BzOiB7IFBhcmVudFRhYmxlSUQ6IG51bWJlciwgRXh0ZXJuYWxEQjogc3RyaW5nLCB1cGRhdGVkOiBEYXRlLCBVcGRhdGU6IChleHRlcm5hbERCOiBzdHJpbmcpID0+IHZvaWQgfSkge1xuICAgXG4gICAgcmV0dXJuKFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+e3Byb3BzLkV4dGVybmFsREJ9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57KHByb3BzLnVwZGF0ZWQgPT0gbnVsbCA/IFwiTi9BXCIgOiBtb21lbnQocHJvcHMudXBkYXRlZCkuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSl9PC90ZD5cbiAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyhlKSA9PiBwcm9wcy5VcGRhdGUocHJvcHMuRXh0ZXJuYWxEQil9PlVwZGF0ZSB7cHJvcHMuRXh0ZXJuYWxEQn08L2J1dHRvbj48L3RkPlxuICAgICAgICA8L3RyPlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIFRhYmxlUm93RmllbGQocHJvcHM6IHsgUGFyZW50VGFibGVJRDogbnVtYmVyLCBGaWVsZDogU3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZCwgVmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPiwgU2V0dGVyOiAodmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPikgPT4gdm9pZH0pIHtcbiAgICB2YXIgdmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPiA9IF8uY2xvbmUocHJvcHMuVmFsdWVzKTtcbiAgICB2YXIgdmFsdWU6IFN5c3RlbUNlbnRlci5FeHRlcm5hbERCRmllbGQgPSB2YWx1ZXMuZmluZCh2YWx1ZSA9PiB2YWx1ZS5BZGRpdGlvbmFsRmllbGRJRCA9PSBwcm9wcy5GaWVsZC5BZGRpdGlvbmFsRmllbGRJRCAmJiB2YWx1ZS5PcGVuWERBUGFyZW50VGFibGVJRCA9PSBwcm9wcy5GaWVsZC5PcGVuWERBUGFyZW50VGFibGVJRCAmJiB2YWx1ZS5pc1hEQUZpZWxkID09IHByb3BzLkZpZWxkLmlzWERBRmllbGQpO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRmllbGQoKSB7XG4gICAgICAgIHZhbHVlcyA9IHZhbHVlcy5maWx0ZXIoZmxkID0+ICEoZmxkLkFkZGl0aW9uYWxGaWVsZElEID09IHByb3BzLkZpZWxkLkFkZGl0aW9uYWxGaWVsZElEICYmIGZsZC5PcGVuWERBUGFyZW50VGFibGVJRCA9PSBwcm9wcy5GaWVsZC5PcGVuWERBUGFyZW50VGFibGVJRCAmJiBmbGQuaXNYREFGaWVsZCA9PSBwcm9wcy5GaWVsZC5pc1hEQUZpZWxkKSlcbiAgICAgICAgcHJvcHMuU2V0dGVyKHZhbHVlcyk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtwcm9wcy5QYXJlbnRUYWJsZUlEID09IC0xID9cbiAgICAgICAgICAgICAgICA8dGQ+e3Byb3BzLkZpZWxkLkRpc3BsYXlOYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgICAgPHRkPntwcm9wcy5GaWVsZC5GaWVsZE5hbWV9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuRmllbGQuUHJldmlvdXNWYWx1ZSA9PSBudWxsID8gXCJcIiA6IHByb3BzLkZpZWxkLlByZXZpb3VzVmFsdWV9PC90ZD5cbiAgICAgICAgICAgIHsocHJvcHMuRmllbGQuRXJyb3IgPyA8dGQ+e3Byb3BzLkZpZWxkLk1lc3NhZ2V9PC90ZD4gOlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17KHByb3BzLkZpZWxkLkNoYW5nZWQgPyBcImZvcm0tY29udHJvbCBpcy1pbnZhbGlkXCIgOiBcImZvcm0tY29udHJvbFwiKX0gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LnZhbHVlICE9IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuVmFsdWUgPSBldnQudGFyZ2V0LnZhbHVlIGFzIGFueTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5WYWx1ZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLkNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIH19IHZhbHVlPXt2YWx1ZS5WYWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZS5WYWx1ZS50b1N0cmluZygpfSAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuRmllbGQuRXJyb3IgPyA8c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZVwiPjwvaT48L3NwYW4+IDogbnVsbH08L3RkPlxuICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiByZW1vdmVGaWVsZCgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICApO1xufVxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBUYWJsZS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDE4LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOC8wMi8yMDE4IC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IEFuZ2xlSWNvbjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8eyBhc2NlbmRpbmc6IGJvb2xlYW4gfT4gPSAocHJvcHMpID0+IDxzcGFuIHN0eWxlPXt7IHdpZHRoOiAxMCwgaGVpZ2h0OiAxMCwgbWFyZ2luOiAzIH19IGNsYXNzTmFtZT17XCJmYSBmYS1hbmdsZS1cIiArIChwcm9wcy5hc2NlbmRpbmcgPyAndXAnIDogJ2Rvd24nKX0+PC9zcGFuPlxuXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlUHJvcHM8VD4ge1xuICAgIGNvbHM6IEFycmF5PHsga2V5OiBrZXlvZihUKSB8IG51bGwsIGxhYmVsOiBzdHJpbmcsIGhlYWRlclN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcywgcm93U3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLCBjb250ZW50PyhpdGVtOiBULCBrZXk6IGtleW9mKFQpLCBzdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyk6IFJlYWN0LlJlYWN0Tm9kZSB9PixcbiAgICBkYXRhOiBBcnJheTxUPixcbiAgICBvbkNsaWNrOiAoZGF0YTogeyBjb2w6IGtleW9mIChUKSwgcm93OiBULCBkYXRhOiBUW2tleW9mKFQpXSB9LCBldmVudDogYW55KSA9PiB2b2lkLFxuICAgIHNvcnRGaWVsZDogc3RyaW5nLFxuICAgIGFzY2VuZGluZzogYm9vbGVhbixcbiAgICBvblNvcnQoZGF0YTogeyBjb2w6IGtleW9mIChUKSwgYXNlbmRpbmc6IGJvb2xlYW59KTogdm9pZCxcbiAgICB0YWJsZUNsYXNzPzogc3RyaW5nLFxuICAgIHRhYmxlU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxuICAgIHRoZWFkU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxuICAgIHRoZWFkQ2xhc3M/OiBzdHJpbmcsXG4gICAgdGJvZHlTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsXG4gICAgdGJvZHlDbGFzcz86IHN0cmluZyxcbiAgICBzZWxlY3RlZD8oZGF0YTogVCk6IGJvb2xlYW4sXG4gICAgcm93U3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZTxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxUYWJsZVByb3BzPFQ+LCB7fT4ge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciByb3dDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZVJvd3MoKTtcbiAgICAgICAgdmFyIGhlYWRlckNvbXBvbmVudHMgPSB0aGlzLmdlbmVyYXRlSGVhZGVycygpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17KHRoaXMucHJvcHMudGFibGVDbGFzcyAhPSB1bmRlZmluZWQgPyB0aGlzLnByb3BzLnRhYmxlQ2xhc3MgOiAnJyl9IHN0eWxlPXt0aGlzLnByb3BzLnRhYmxlU3R5bGV9PlxuICAgICAgICAgICAgICAgIDx0aGVhZCBzdHlsZT17dGhpcy5wcm9wcy50aGVhZFN0eWxlfT57aGVhZGVyQ29tcG9uZW50c308L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBzdHlsZT17dGhpcy5wcm9wcy50Ym9keVN0eWxlfT57cm93Q29tcG9uZW50c308L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUhlYWRlcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbHMubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciBjZWxscyA9IHRoaXMucHJvcHMuY29scy5tYXAoKGNvbERhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgc3R5bGU7XG4gICAgICAgICAgICBpZiAoY29sRGF0YS5oZWFkZXJTdHlsZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGNvbERhdGEuaGVhZGVyU3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcblxuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17aW5kZXh9IHN0eWxlPXtzdHlsZX0gb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlU29ydCh7IGNvbDogY29sRGF0YS5rZXksIGFzY2VuZGluZzogdGhpcy5wcm9wcy5hc2NlbmRpbmcgfSwgZSl9Pntjb2xEYXRhLmxhYmVsfXsodGhpcy5wcm9wcy5zb3J0RmllbGQgPT0gY29sRGF0YS5rZXkgPyA8QW5nbGVJY29uIGFzY2VuZGluZz17dGhpcy5wcm9wcy5hc2NlbmRpbmd9IC8+IDogbnVsbCl9PC90aD5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIDx0cj57Y2VsbHN9PC90cj47XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVSb3dzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IHRoaXMucHJvcHMuY29scy5tYXAoY29sRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gXy5jbG9uZShjb2xEYXRhLnJvd1N0eWxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gPHRkXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXgudG9TdHJpbmcoKSArIGl0ZW1bY29sRGF0YS5rZXldICsgY29sRGF0YS5rZXl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHsgY29sOiBjb2xEYXRhLmtleSwgcm93OiBpdGVtLCBkYXRhOiBpdGVtW2NvbERhdGEua2V5XSB9KX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtjb2xEYXRhLmNvbnRlbnQgIT0gdW5kZWZpbmVkID8gY29sRGF0YS5jb250ZW50KGl0ZW0sIGNvbERhdGEua2V5LCBzdHlsZSkgOiBpdGVtW2NvbERhdGEua2V5XX1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBzdHlsZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMucm93U3R5bGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBfLmNsb25lKHRoaXMucHJvcHMucm93U3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0eWxlID0ge307XG5cbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWQoaXRlbSkpXG4gICAgICAgICAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG5cbiAgICAgICAgICAgIHJldHVybiA8dHIgc3R5bGU9e3N0eWxlfSBrZXk9e2luZGV4LnRvU3RyaW5nKCl9PntjZWxsc308L3RyPjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZGF0YTogeyBjb2w6IGtleW9mKFQpLCByb3c6IFQsIGRhdGE6IGFueSB9LCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZGF0YSwgZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZVNvcnQoZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNvcnQoZGF0YSk7XG4gICAgfVxufTtcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQnlNZXRlci50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOC8yMi8yMDE5IC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9UYWJsZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgRXh0ZXJuYWxEQlVwZGF0ZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0V4dGVybmFsREJVcGRhdGUnO1xuXG50eXBlIEZpZWxkTmFtZSA9ICdNZXRlci5Bc3NldEtleScgfCAnTWV0ZXIuTmFtZScgfCAnTWV0ZXIuTG9jYXRpb24nIHwgJ01ldGVyLk1ha2UnIHwgJ01ldGVyLk1vZGVsJyB8ICdBc3NldC5Bc3NldEtleScgfCAnTm90ZS5Ob3RlJztcbmludGVyZmFjZSBTZWFyY2gge1xuICAgIEZpZWxkOiBGaWVsZE5hbWUsXG4gICAgU2VhcmNoVGV4dDogc3RyaW5nXG59ICAgXG5pbnRlcmZhY2UgTWV0ZXIge1xuICAgIElEOiBudW1iZXIsIEFzc2V0S2V5OiBzdHJpbmcsIE5hbWU6IHN0cmluZywgTG9jYXRpb246IHN0cmluZywgTWFwcGVkQXNzZXRzOiBudW1iZXIsIE1ha2U6IHN0cmluZywgTW9kZWw6IHN0cmluZyBcbn1cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmNvbnN0IEJ5TWV0ZXI6IFN5c3RlbUNlbnRlci5CeUNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xuICAgIGxldCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xuXG4gICAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFNlYXJjaD4+KFt7IEZpZWxkOiAnTWV0ZXIuQXNzZXRLZXknLCBTZWFyY2hUZXh0OiAnJyB9XSk7XG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8TWV0ZXI+PihbXSk7XG4gICAgY29uc3QgW3NvcnRGaWVsZCwgc2V0U29ydEZpZWxkXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJ0Fzc2V0S2V5Jyk7XG4gICAgY29uc3QgW2FzY2VuZGluZywgc2V0QXNjZW5kaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbGV0IGhhbmRsZSA9IGdldE1ldGVycygpO1xuICAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogQXJyYXk8TWV0ZXI+KSA9PiBzZXREYXRhKGRhdGEpKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgaGFuZGxlLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBmdW5jdGlvbiBnZXRNZXRlcnMoKTogSlF1ZXJ5LmpxWEhSPEFycmF5PE1ldGVyPj57XG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQb3N0XCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyL1NlYXJjaGFibGVMaXN0YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShzZWFyY2gpLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0KGl0ZW0pIHtcbiAgICAgICAgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJz9uYW1lPU1ldGVyJk1ldGVySUQ9JyArIGl0ZW0ucm93LklELCBzdGF0ZToge30gfSlcbiAgICB9XG4gICAgZnVuY3Rpb24gZ29OZXdNZXRlcldpemFyZCgpIHtcbiAgICAgICAgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJz9uYW1lPU5ld01ldGVyV2l6YXJkJywgc3RhdGU6IHt9IH0pXG4gICAgfVxuXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItbGlnaHQgYmctbGlnaHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVwiIGlkPVwibmF2YmFyU3VwcG9ydGVkQ29udGVudFwiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+XG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXZiYXItbmF2IG1yLWF1dG9cIiBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCIgc3R5bGU9e3sgd2lkdGg6ICc1MCUnLCBwYWRkaW5nUmlnaHQ6IDEwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldCBjbGFzc05hbWU9XCJib3JkZXJcIiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCcsIGhlaWdodDogJzEwMCUnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT1cInctYXV0b1wiIHN0eWxlPXt7IGZvbnRTaXplOiAnbGFyZ2UnIH19PlNlYXJjaDogPC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaC5tYXAoKHMsIGluZGV4LCBhKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIiBrZXk9e2luZGV4fSBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgbGlnaHRncmF5J319PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyBzdHlsZT17e2hlaWdodDogJzEwMCUnfX0gdmFsdWU9e3MuRmllbGR9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLkZpZWxkID0gZXZ0LnRhcmdldC52YWx1ZSBhcyBGaWVsZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBfLmNsb25lKGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoKGFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdNZXRlci5Bc3NldEtleSc+S2V5PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdNZXRlci5OYW1lJz5OYW1lPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdMb2NhdGlvbi5Mb2NhdGlvbktleSc+TG9jYXRpb248L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J01ldGVyLk1ha2UnPk1ha2U8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J01ldGVyLk1vZGVsJz5Nb2RlbDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nQXNzZXQuQXNzZXRLZXknPkFzc2V0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSdOb3RlLk5vdGUnPk5vdGU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB0eXBlPSd0ZXh0JyBwbGFjZWhvbGRlcj0nU2VhcmNoLi4uJyB2YWx1ZT17cy5TZWFyY2hUZXh0fSBvbkNoYW5nZT17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLlNlYXJjaFRleHQgPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBfLmNsb25lKGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2goYXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IG9uS2V5RG93bj17ZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldE1ldGVycygpLmRvbmUobXMgPT4gc2V0RGF0YShtcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnJheSA9IF8uY2xvbmUoYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoKGFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiIHN0eWxlPXt7IHdpZHRoOiAnMTUlJywgcGFkZGluZ1JpZ2h0OiAxMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPVwiYm9yZGVyXCIgc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZCBjbGFzc05hbWU9XCJ3LWF1dG9cIiBzdHlsZT17eyBmb250U2l6ZTogJ2xhcmdlJyB9fT5TZWFyY2ggUGFyYW1zOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBfLmNsb25lKHNlYXJjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goeyBGaWVsZDogJ01ldGVyLkFzc2V0S2V5JywgU2VhcmNoVGV4dDogJycgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlYXJjaChhcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+QWRkIFBhcmFtZXRlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyhldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudCwgTW91c2VFdmVudD4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TWV0ZXJzKCkuZG9uZShtcyA9PiBzZXREYXRhKG1zKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+VXBkYXRlIFNlYXJjaDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiIHN0eWxlPXt7IHdpZHRoOiAnMTUlJywgcGFkZGluZ1JpZ2h0OiAxMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPVwiYm9yZGVyXCIgc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZCBjbGFzc05hbWU9XCJ3LWF1dG9cIiBzdHlsZT17eyBmb250U2l6ZTogJ2xhcmdlJyB9fT5XaXphcmRzOjwvbGVnZW5kPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17Z29OZXdNZXRlcldpemFyZH0gaGlkZGVuPXtwcm9wcy5Sb2xlcy5pbmRleE9mKCdBZG1pbmlzdHJhdG9yJykgPCAwICYmIHByb3BzLlJvbGVzLmluZGV4T2YoJ1RyYW5zbWlzc2lvbiBTTUUnKSA8IDB9Pk5ldyBNZXRlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIiBzdHlsZT17eyB3aWR0aDogJzIwJScsIHBhZGRpbmdSaWdodDogMTAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzTmFtZT1cImJvcmRlclwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4JywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQgY2xhc3NOYW1lPVwidy1hdXRvXCIgc3R5bGU9e3sgZm9udFNpemU6ICdsYXJnZScgfX0+QWN0aW9uczo8L2xlZ2VuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9XCIjZXh0REJNb2RhbFwiIGhpZGRlbj17cHJvcHMuUm9sZXMuaW5kZXhPZignQWRtaW5pc3RyYXRvcicpIDwgMCAmJiBwcm9wcy5Sb2xlcy5pbmRleE9mKCdUcmFuc21pc3Npb24gU01FJykgPCAwfSBvbkNsaWNrPXsoZXZlbnQpID0+IHsgZXZlbnQucHJldmVudERlZmF1bHQoKSB9fT5VcGRhdGUgRXh0IERCIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cblxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnY2FsYyggMTAwJSAtIDEzNnB4KScgfX0+XG4gICAgICAgICAgICAgICAgPFRhYmxlXG4gICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRLZXknLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTUlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzE1JScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJywgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTG9jYXRpb24nLCBsYWJlbDogJ1N1YnN0YXRpb24nLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWFwcGVkQXNzZXRzJywgbGFiZWw6ICdBc3NldHMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWFrZScsIGxhYmVsOiAnTWFrZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNb2RlbCcsIGxhYmVsOiAnTW9kZWwnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAxNywgcGFkZGluZzogMCB9LCByb3dTdHlsZTogeyB3aWR0aDogMCwgcGFkZGluZzogMCB9IH0sXG5cbiAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgc29ydEZpZWxkPXtzb3J0RmllbGR9XG4gICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZz17YXNjZW5kaW5nfVxuICAgICAgICAgICAgICAgICAgICBvblNvcnQ9eyhkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5jb2wgPT0gc29ydEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyZWQgPSBfLm9yZGVyQnkoZGF0YSwgW2QuY29sXSwgWyghYXNjZW5kaW5nID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXREYXRhKG9yZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyZWQgPSBfLm9yZGVyQnkoZGF0YSwgW2QuY29sXSwgW1wiYXNjXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RGF0YShvcmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTb3J0RmllbGQoZC5jb2wpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDMwMCwgd2lkdGg6ICcxMDAlJyAgfX1cbiAgICAgICAgICAgICAgICAgICAgcm93U3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eyhpdGVtKSA9PiBmYWxzZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cImV4dERCTW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIHdpZHRoOiAnNzUlJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPk1ldGVyIEV4dGVybmFsIERhdGFiYXNlIEZpZWxkczwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4dGVybmFsREJVcGRhdGUgSUQ9ey0xfSBUeXBlPSdNZXRlcicgVGFiID0gXCJcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQnlNZXRlcjtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==