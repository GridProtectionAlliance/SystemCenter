(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AssetGroup~ByAssetGroup"],{

/***/ "../../node_modules/@gpa-gemstone/react-table/lib/index.js":
/*!*********************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-table/lib/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//  ******************************************************************************************************
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
//  ******************************************************************************************************
var __extends = (this && this.__extends) || (function () {
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var AngleIcon = function (props) { return (React.createElement("span", { style: { width: 10, height: 10, margin: 3 }, className: 'fa fa-angle-' + (props.ascending ? 'up' : 'down') })); };
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        return _super.call(this, props) || this;
    }
    Table.prototype.render = function () {
        var rowComponents = this.generateRows();
        var headerComponents = this.generateHeaders();
        return (React.createElement("table", { className: this.props.tableClass !== undefined ? this.props.tableClass : '', style: this.props.tableStyle },
            React.createElement("thead", { style: this.props.theadStyle }, headerComponents),
            React.createElement("tbody", { style: this.props.tbodyStyle }, rowComponents)));
    };
    Table.prototype.generateHeaders = function () {
        var _this = this;
        if (this.props.cols.length === 0)
            return null;
        var cells = this.props.cols.map(function (colData, index) {
            var style;
            if (colData.headerStyle !== undefined) {
                style = colData.headerStyle;
            }
            else
                style = {};
            if (style.cursor === undefined)
                style.cursor = 'pointer';
            return (React.createElement("th", { key: index, style: style, onClick: function (e) { return _this.handleSort({ col: colData.key, ascending: _this.props.ascending }, e); } },
                colData.label,
                _this.props.sortField === colData.key ? React.createElement(AngleIcon, { ascending: _this.props.ascending }) : null));
        });
        return React.createElement("tr", null, cells);
    };
    Table.prototype.generateRows = function () {
        var _this = this;
        if (this.props.data.length === 0)
            return null;
        return this.props.data.map(function (item, index) {
            var cells = _this.props.cols.map(function (colData) {
                var css;
                if (colData.rowStyle === undefined)
                    css = {};
                else
                    css = __assign({}, colData.rowStyle);
                return (React.createElement("td", { key: index.toString() + item[colData.key] + colData.key, style: css, onClick: _this.handleClick.bind(_this, { col: colData.key, row: item, data: item[colData.key] }) }, colData.content !== undefined ? colData.content(item, colData.key, css) : item[colData.key]));
            });
            var style;
            if (_this.props.rowStyle !== undefined) {
                style = __assign({}, _this.props.rowStyle);
            }
            else
                style = {};
            if (style.cursor === undefined)
                style.cursor = 'pointer';
            if (_this.props.selected !== undefined && _this.props.selected(item))
                style.backgroundColor = 'yellow';
            return (React.createElement("tr", { style: style, key: index.toString() }, cells));
        });
    };
    Table.prototype.handleClick = function (data, event) {
        this.props.onClick(data, event);
    };
    Table.prototype.handleSort = function (data, event) {
        this.props.onSort(data);
    };
    return Table;
}(React.Component));
exports.default = Table;


/***/ }),

/***/ "./TSX/SystemCenter/AssetGroups/AddToGroup.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/AssetGroups/AddToGroup.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @gpa-gemstone/react-table */ "../../node_modules/@gpa-gemstone/react-table/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3__);
//******************************************************************************************************
//  AddToGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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




function AddToAssetGroup(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), search = _a[0], setSearch = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), data = _b[0], setData = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), selectedData = _c[0], setSelectedData = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortFieldAll = _d[0], setSortFieldAll = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascendingAll = _e[0], setAscendingAll = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortFieldSelected = _f[0], setSortFieldSelected = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascendingSelected = _g[0], setAscendingSelected = _g[1];
    var _h = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getSearchField()), 2), filterableList = _h[0], setFilterableList = _h[1];
    var _j = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Idle'), 2), searchState = _j[0], setSearchState = _j[1];
    var _k = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), result = _k[0], setResult = _k[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (result.length == 0)
            return function () { };
        var handle = props.onComplete(result);
        handle.done(function (d) { return setResult([]); });
        return function () {
            if (handle != undefined && handle.abort != null)
                handle.abort();
        };
    }, [result]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        setSearchState('Loading');
        var handle = props.getData(search, ascendingAll, sortFieldAll);
        handle.done(function (d) { setSearchState('Idle'); setData(JSON.parse(d)); });
        handle.fail(function (msg) { return setSearchState('Error'); });
        return function () {
            if (handle != undefined && handle.abort != null)
                handle.abort();
        };
    }, [search, sortFieldAll, ascendingAll]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        setFilterableList(getSearchField());
        var handles = [];
        if (props.type == 'Asset')
            handles.push(getAdditionalFields('Line'));
        if (props.type == 'Asset')
            handles.push(getAdditionalFields('Breaker'));
        if (props.type == 'Asset')
            handles.push(getAdditionalFields('CapBank'));
        if (props.type == 'Asset')
            handles.push(getAdditionalFields('Transformer'));
        if (props.type == 'Asset')
            handles.push(getAdditionalFields('Bus'));
        if (props.type == 'Meter')
            handles.push(getAdditionalFields('Meter'));
        return function () {
            handles.forEach(function (h) { if (h.abort != null)
                h.abort(); });
        };
    }, []);
    function getSearchField() {
        switch (props.type) {
            case 'Asset':
                return [
                    { label: 'Name', key: 'Name', type: 'string' },
                ];
            case 'Meter':
                return [
                    { label: 'AssetKey', key: 'AssetKey', type: 'string' },
                    { label: 'Name', key: 'Name', type: 'string' },
                    { label: 'Location', key: 'Location', type: 'string' },
                    { label: 'Make', key: 'Make', type: 'string' },
                    { label: 'Model', key: 'Model', type: 'string' },
                    { label: 'Number of Assets', key: 'MappedAssets', type: 'number' },
                ];
            case 'Group':
                return [
                    { label: 'Name', key: 'Name', type: 'string' },
                    { label: 'Number of Meter', key: 'Meters', type: 'integer' },
                    { label: 'Number of Transmission Assets', key: 'Assets', type: 'integer' },
                    { label: 'Number of Users', key: 'Users', type: 'integer' },
                    { label: 'Show in PQ Dashboard', key: 'DisplayDashboard', type: 'boolean' },
                ];
        }
    }
    function getStandardSearch() {
        switch (props.type) {
            case 'Asset':
                return { label: 'Name', key: 'Name', type: 'string' };
            case 'Meter':
                return { label: 'Name', key: 'Name', type: 'string' };
            case 'Group':
                return { label: 'Name', key: 'Name', type: 'string' };
        }
    }
    function getTableCollumns() {
        switch (props.type) {
            case 'Asset':
                return [
                    { key: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'VoltageKV', label: 'Voltage (kV)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Locations', label: 'Substations', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Meter':
                return [
                    { key: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'MappedAssets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Make', label: 'Make', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Model', label: 'Model', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Group':
                return [
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Assets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Users', label: 'Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetGroups', label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
        }
    }
    function getSelectedCollumn() {
        switch (props.type) {
            case 'Asset':
                return [
                    { key: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Meter':
                return [
                    { key: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Group':
                return [
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
        }
        return [];
    }
    function reset() {
        setSelectedData([]);
    }
    function getTitle() {
        switch (props.type) {
            case ('Asset'):
                return 'Add Transmission Assets';
            case ('Meter'):
                return 'Add Meters';
            case ('Group'):
                return 'Add Asset Groups';
        }
    }
    function getTypeLabel() {
        switch (props.type) {
            case ('Asset'):
                return 'Transmission Assets';
            case ('Meter'):
                return 'Meters';
            case ('Group'):
                return 'Asset Groups';
        }
    }
    function getAdditionalFields(Type) {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/AdditionalField/ParentTable/" + Type + "/FieldName/0",
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: true
        });
        function ConvertType(type) {
            if (type == 'string' || type == 'integer' || type == 'number' || type == 'datetime' || type == 'boolean')
                return { type: type };
            return {
                type: 'enum', enum: [{ Label: type, Value: type }]
            };
        }
        handle.done(function (d) {
            setFilterableList(function (lst) {
                var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](lst.concat(d.map(function (item) { return (__assign({ label: "[AF" + (item.ExternalDB != undefined ? " " + item.ExternalDB : '') + "]" + item.FieldName, key: item.FieldName }, ConvertType(item.Type))); })), ['label'], ["asc"]);
                return ordered;
            });
        });
        return handle;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3__["Modal"], { Show: props.Show, Title: getTitle(), ShowX: true, Size: 'xlg', CallBack: function (conf) { props.setShow(false); reset(); if (conf)
                setResult(selectedData.map(function (item) { return item[props.PrimaryKey]; })); } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3__["SearchBar"], { CollumnList: filterableList, SetFilter: function (flds) { return setSearch(flds); }, Direction: 'left', defaultCollumn: getStandardSearch(), Width: '50%', Label: 'Search', ShowLoading: searchState == 'Loading', ResultNote: searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + getTypeLabel(), GetEnum: function (setOptions, field) {
                            var handle = null;
                            if (field.type != 'enum' || field.enum == undefined || field.enum.length != 1)
                                return function () { };
                            handle = $.ajax({
                                type: "GET",
                                url: homePath + "api/ValueList/Group/" + field.enum[0].Value,
                                contentType: "application/json; charset=utf-8",
                                dataType: 'json',
                                cache: true,
                                async: true
                            });
                            handle.done(function (d) { return setOptions(d.map(function (item) { return ({ Value: item.Value.toString(), Label: item.Text }); })); });
                            return function () { if (handle != null && handle.abort == null)
                                handle.abort(); };
                        } }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { width: '60%' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_2___default.a, { cols: getTableCollumns(), tableClass: "table table-hover", data: data, sortField: sortFieldAll, ascending: ascendingAll, onSort: function (d) {
                            if (d.col == sortFieldAll)
                                setAscendingAll(!ascendingAll);
                            else {
                                setAscendingAll(true);
                                setSortFieldAll(d.col);
                            }
                        }, onClick: function (d) { setSelectedData(function (l) { var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](l); updated.push(d.row); return updated; }); }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: '400px', width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { width: '40%' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h3", null, " Selected Assets ")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_2___default.a, { cols: getSelectedCollumn(), tableClass: "table table-hover", data: selectedData, sortField: sortFieldSelected, ascending: ascendingSelected, onSort: function (d) {
                            if (d.col == sortFieldSelected) {
                                var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](selectedData, [d.col], [(!ascendingSelected ? "asc" : "desc")]);
                                setAscendingSelected(!ascendingSelected);
                                setSelectedData(ordered);
                            }
                            else {
                                var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](selectedData, [d.col], ["asc"]);
                                setAscendingSelected(!ascendingSelected);
                                setSelectedData(ordered);
                                setSortFieldSelected(d.col);
                            }
                        }, onClick: function () { }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: '400px', width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } }))))));
}
function AddToGroupPopup(props) {
    function searchAsset(search, ascending, sortField) {
        var defaults = [
            { label: 'Name', key: 'Name', type: 'string' },
        ];
        var searches = search.map(function (s) { if (defaults.findIndex(function (item) { return item.key == s.FieldName; }) == -1)
            return __assign(__assign({}, s), { isPivotColumn: true });
        else
            return s; });
        return $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/Asset/SearchableListIncludingMeter",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }
    function searchMeters(search, ascending, sortField) {
        var defaults = [
            { label: 'AssetKey', key: 'AssetKey', type: 'string' },
            { label: 'Name', key: 'Name', type: 'string' },
            { label: 'Location', key: 'Location', type: 'string' },
            { label: 'Make', key: 'Make', type: 'string' },
            { label: 'Model', key: 'Model', type: 'string' },
            { label: 'Number of Assets', key: 'MappedAssets', type: 'number' },
        ];
        var searches = search.map(function (s) { if (defaults.findIndex(function (item) { return item.key == s.FieldName; }) == -1)
            return __assign(__assign({}, s), { isPivotColumn: true });
        else
            return s; });
        return $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/MeterList/ExtendedSearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }
    function searchAssetGroups(search, ascending, sortField) {
        var searches = search;
        return $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/AssetGroup/SearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: searches, OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }
    if (props.type == 'Asset')
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](AddToAssetGroup, { Show: props.Show, setShow: function () { return props.Close(); }, type: 'Asset', PrimaryKey: 'ID', getData: searchAsset, onComplete: props.onComplete });
    if (props.type == 'Meter')
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](AddToAssetGroup, { Show: props.Show, setShow: function () { return props.Close(); }, type: 'Meter', PrimaryKey: 'ID', getData: searchMeters, onComplete: props.onComplete });
    if (props.type == 'Group')
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](AddToAssetGroup, { Show: props.Show, setShow: function () { return props.Close(); }, type: 'Group', PrimaryKey: 'ID', getData: searchAssetGroups, onComplete: props.onComplete });
}
/* harmony default export */ __webpack_exports__["default"] = (AddToGroupPopup);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LXRhYmxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0R3JvdXBzL0FkZFRvR3JvdXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDdkYsNkJBQTZCLHVEQUF1RDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELFlBQVksbUJBQU8sQ0FBQyxvQkFBTztBQUMzQixrQ0FBa0Msc0NBQXNDLFNBQVMsbUNBQW1DLGlFQUFpRSxHQUFHO0FBQ3hMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsNEdBQTRHO0FBQzFKLDBDQUEwQywrQkFBK0I7QUFDekUsMENBQTBDLCtCQUErQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGtEQUFrRCwwQkFBMEIscURBQXFELEtBQUssRUFBRSxFQUFFO0FBQ3pMO0FBQ0Esd0ZBQXdGLG1DQUFtQztBQUMz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QUNuTCxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTztRQUNyQixPQUFPLG9EQUFDLGVBQWUsSUFBUyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsY0FBTSxZQUFLLENBQUMsS0FBSyxFQUFFLEVBQWIsQ0FBYSxFQUFFLElBQUksRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxHQUFJO0lBQ3hLLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPO1FBQ3JCLE9BQU8sb0RBQUMsZUFBZSxJQUFxQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsY0FBTSxZQUFLLENBQUMsS0FBSyxFQUFFLEVBQWIsQ0FBYSxFQUFFLElBQUksRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLEdBQUk7QUFDN0wsQ0FBQztBQUdjLDhFQUFlLEVBQUMiLCJmaWxlIjoiQXNzZXRHcm91cH5CeUFzc2V0R3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBUYWJsZS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDE4LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOC8wMi8yMDE4IC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgQW5nbGVJY29uID0gZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZTogeyB3aWR0aDogMTAsIGhlaWdodDogMTAsIG1hcmdpbjogMyB9LCBjbGFzc05hbWU6ICdmYSBmYS1hbmdsZS0nICsgKHByb3BzLmFzY2VuZGluZyA/ICd1cCcgOiAnZG93bicpIH0pKTsgfTtcbnZhciBUYWJsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFibGUocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBUYWJsZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm93Q29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVSb3dzKCk7XG4gICAgICAgIHZhciBoZWFkZXJDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZUhlYWRlcnMoKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgeyBjbGFzc05hbWU6IHRoaXMucHJvcHMudGFibGVDbGFzcyAhPT0gdW5kZWZpbmVkID8gdGhpcy5wcm9wcy50YWJsZUNsYXNzIDogJycsIHN0eWxlOiB0aGlzLnByb3BzLnRhYmxlU3R5bGUgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiLCB7IHN0eWxlOiB0aGlzLnByb3BzLnRoZWFkU3R5bGUgfSwgaGVhZGVyQ29tcG9uZW50cyksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgeyBzdHlsZTogdGhpcy5wcm9wcy50Ym9keVN0eWxlIH0sIHJvd0NvbXBvbmVudHMpKSk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuZ2VuZXJhdGVIZWFkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgY2VsbHMgPSB0aGlzLnByb3BzLmNvbHMubWFwKGZ1bmN0aW9uIChjb2xEYXRhLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlO1xuICAgICAgICAgICAgaWYgKGNvbERhdGEuaGVhZGVyU3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gY29sRGF0YS5oZWFkZXJTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIHsga2V5OiBpbmRleCwgc3R5bGU6IHN0eWxlLCBvbkNsaWNrOiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuaGFuZGxlU29ydCh7IGNvbDogY29sRGF0YS5rZXksIGFzY2VuZGluZzogX3RoaXMucHJvcHMuYXNjZW5kaW5nIH0sIGUpOyB9IH0sXG4gICAgICAgICAgICAgICAgY29sRGF0YS5sYWJlbCxcbiAgICAgICAgICAgICAgICBfdGhpcy5wcm9wcy5zb3J0RmllbGQgPT09IGNvbERhdGEua2V5ID8gUmVhY3QuY3JlYXRlRWxlbWVudChBbmdsZUljb24sIHsgYXNjZW5kaW5nOiBfdGhpcy5wcm9wcy5hc2NlbmRpbmcgfSkgOiBudWxsKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIGNlbGxzKTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5nZW5lcmF0ZVJvd3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGEubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGNlbGxzID0gX3RoaXMucHJvcHMuY29scy5tYXAoZnVuY3Rpb24gKGNvbERhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3NzO1xuICAgICAgICAgICAgICAgIGlmIChjb2xEYXRhLnJvd1N0eWxlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIGNzcyA9IHt9O1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY3NzID0gX19hc3NpZ24oe30sIGNvbERhdGEucm93U3R5bGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIHsga2V5OiBpbmRleC50b1N0cmluZygpICsgaXRlbVtjb2xEYXRhLmtleV0gKyBjb2xEYXRhLmtleSwgc3R5bGU6IGNzcywgb25DbGljazogX3RoaXMuaGFuZGxlQ2xpY2suYmluZChfdGhpcywgeyBjb2w6IGNvbERhdGEua2V5LCByb3c6IGl0ZW0sIGRhdGE6IGl0ZW1bY29sRGF0YS5rZXldIH0pIH0sIGNvbERhdGEuY29udGVudCAhPT0gdW5kZWZpbmVkID8gY29sRGF0YS5jb250ZW50KGl0ZW0sIGNvbERhdGEua2V5LCBjc3MpIDogaXRlbVtjb2xEYXRhLmtleV0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHN0eWxlO1xuICAgICAgICAgICAgaWYgKF90aGlzLnByb3BzLnJvd1N0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IF9fYXNzaWduKHt9LCBfdGhpcy5wcm9wcy5yb3dTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2VsZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiBfdGhpcy5wcm9wcy5zZWxlY3RlZChpdGVtKSlcbiAgICAgICAgICAgICAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHsgc3R5bGU6IHN0eWxlLCBrZXk6IGluZGV4LnRvU3RyaW5nKCkgfSwgY2VsbHMpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiAoZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGRhdGEsIGV2ZW50KTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5oYW5kbGVTb3J0ID0gZnVuY3Rpb24gKGRhdGEsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25Tb3J0KGRhdGEpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlO1xufShSZWFjdC5Db21wb25lbnQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRhYmxlO1xuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFkZFRvR3JvdXAudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDEwLzE0LzIwMjAgLSBDLiBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC10YWJsZSc7XHJcbmltcG9ydCB7IFNlYXJjaEJhciwgU2VhcmNoLCBNb2RhbCB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuaW50ZXJmYWNlIElwcm9wczxUPiB7XHJcbiAgICBTaG93OiBib29sZWFuLFxyXG4gICAgb25Db21wbGV0ZTogKGlkOiBBcnJheTxhbnk+KSA9PiBKUXVlcnlYSFIsXHJcbiAgICBzZXRTaG93OiAoc2hvdzogYm9vbGVhbikgPT4gdm9pZCxcclxuICAgIGdldERhdGE6IChzZWFyY2g6IEFycmF5PFNlYXJjaC5JRmlsdGVyPFQ+PiwgYXNjZW5kaW5nOiBib29sZWFuLCBzb3J0RmllbGQ6IHN0cmluZykgPT4gSlF1ZXJ5WEhSLFxyXG4gICAgdHlwZTogKCdBc3NldCcgfCAnTWV0ZXInIHwgJ0dyb3VwJyksXHJcbiAgICBQcmltYXJ5S2V5OiBrZXlvZiAoVCksXHJcbiAgICBcclxufVxyXG5cclxuZnVuY3Rpb24gQWRkVG9Bc3NldEdyb3VwPFQ+KHByb3BzOiBJcHJvcHM8VD4pIHtcclxuICAgIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxTZWFyY2guSUZpbHRlcjxUPj4+KFtdKTtcclxuICAgIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFQ+PihbXSk7XHJcblxyXG4gICAgY29uc3QgW3NlbGVjdGVkRGF0YSwgc2V0U2VsZWN0ZWREYXRhXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFQ+PihbXSk7XHJcblxyXG4gICAgY29uc3QgW3NvcnRGaWVsZEFsbCwgc2V0U29ydEZpZWxkQWxsXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJ0Fzc2V0S2V5Jyk7XHJcbiAgICBjb25zdCBbYXNjZW5kaW5nQWxsLCBzZXRBc2NlbmRpbmdBbGxdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcblxyXG4gICAgY29uc3QgW3NvcnRGaWVsZFNlbGVjdGVkLCBzZXRTb3J0RmllbGRTZWxlY3RlZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCdBc3NldEtleScpO1xyXG4gICAgY29uc3QgW2FzY2VuZGluZ1NlbGVjdGVkLCBzZXRBc2NlbmRpbmdTZWxlY3RlZF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuXHJcbiAgICBjb25zdCBbZmlsdGVyYWJsZUxpc3QsIHNldEZpbHRlcmFibGVMaXN0XSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFNlYXJjaC5JRmllbGQ8VD4+PihnZXRTZWFyY2hGaWVsZCgpKTtcclxuICAgIGNvbnN0IFtzZWFyY2hTdGF0ZSwgc2V0U2VhcmNoU3RhdGVdID0gUmVhY3QudXNlU3RhdGU8KCdJZGxlJyB8ICdMb2FkaW5nJyB8ICdFcnJvcicpPignSWRsZScpO1xyXG5cclxuICAgIGNvbnN0IFtyZXN1bHQsIHNldFJlc3VsdF0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxhbnk+PihbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4geyB9XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IHByb3BzLm9uQ29tcGxldGUocmVzdWx0KTtcclxuICAgICAgICBoYW5kbGUuZG9uZShkID0+IHNldFJlc3VsdChbXSkpXHJcblxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGUgIT0gdW5kZWZpbmVkICYmIGhhbmRsZS5hYm9ydCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sIFtyZXN1bHRdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHNldFNlYXJjaFN0YXRlKCdMb2FkaW5nJylcclxuICAgICAgICBsZXQgaGFuZGxlID0gcHJvcHMuZ2V0RGF0YShzZWFyY2gsIGFzY2VuZGluZ0FsbCwgc29ydEZpZWxkQWxsKTtcclxuICAgICAgICBoYW5kbGUuZG9uZShkID0+IHsgc2V0U2VhcmNoU3RhdGUoJ0lkbGUnKTsgc2V0RGF0YShKU09OLnBhcnNlKGQpKSB9KTtcclxuICAgICAgICBoYW5kbGUuZmFpbChtc2cgPT4gc2V0U2VhcmNoU3RhdGUoJ0Vycm9yJykpO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlICE9IHVuZGVmaW5lZCAmJiBoYW5kbGUuYWJvcnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGhhbmRsZS5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtzZWFyY2gsIHNvcnRGaWVsZEFsbCwgYXNjZW5kaW5nQWxsXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBzZXRGaWx0ZXJhYmxlTGlzdChnZXRTZWFyY2hGaWVsZCgpKTtcclxuXHJcbiAgICAgICAgbGV0IGhhbmRsZXMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHByb3BzLnR5cGUgPT0gJ0Fzc2V0JylcclxuICAgICAgICAgICAgaGFuZGxlcy5wdXNoKGdldEFkZGl0aW9uYWxGaWVsZHMoJ0xpbmUnKSk7XHJcbiAgICAgICAgaWYgKHByb3BzLnR5cGUgPT0gJ0Fzc2V0JylcclxuICAgICAgICAgICAgaGFuZGxlcy5wdXNoKGdldEFkZGl0aW9uYWxGaWVsZHMoJ0JyZWFrZXInKSk7XHJcbiAgICAgICAgaWYgKHByb3BzLnR5cGUgPT0gJ0Fzc2V0JylcclxuICAgICAgICAgICAgaGFuZGxlcy5wdXNoKGdldEFkZGl0aW9uYWxGaWVsZHMoJ0NhcEJhbmsnKSk7XHJcbiAgICAgICAgaWYgKHByb3BzLnR5cGUgPT0gJ0Fzc2V0JylcclxuICAgICAgICAgICAgaGFuZGxlcy5wdXNoKGdldEFkZGl0aW9uYWxGaWVsZHMoJ1RyYW5zZm9ybWVyJykpO1xyXG4gICAgICAgIGlmIChwcm9wcy50eXBlID09ICdBc3NldCcpXHJcbiAgICAgICAgICAgIGhhbmRsZXMucHVzaChnZXRBZGRpdGlvbmFsRmllbGRzKCdCdXMnKSk7XHJcbiAgICAgICAgaWYgKHByb3BzLnR5cGUgPT0gJ01ldGVyJylcclxuICAgICAgICAgICAgaGFuZGxlcy5wdXNoKGdldEFkZGl0aW9uYWxGaWVsZHMoJ01ldGVyJykpO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGhhbmRsZXMuZm9yRWFjaChoID0+IHsgaWYgKGguYWJvcnQgIT0gbnVsbCkgaC5hYm9ydCgpO30pXHJcbiAgICAgICAgfVxyXG4gICAgfSwgW10pO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWFyY2hGaWVsZCgpOiBBcnJheTxTZWFyY2guSUZpZWxkPFQ+PiB7XHJcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2V0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ05hbWUnLCBrZXk6ICdOYW1lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGNhc2UgJ01ldGVyJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ0Fzc2V0S2V5Jywga2V5OiAnQXNzZXRLZXknLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdOYW1lJywga2V5OiAnTmFtZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ0xvY2F0aW9uJywga2V5OiAnTG9jYXRpb24nLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdNYWtlJywga2V5OiAnTWFrZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ01vZGVsJywga2V5OiAnTW9kZWwnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdOdW1iZXIgb2YgQXNzZXRzJywga2V5OiAnTWFwcGVkQXNzZXRzJywgdHlwZTogJ251bWJlcicgfSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGNhc2UgJ0dyb3VwJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ05hbWUnLCBrZXk6ICdOYW1lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGxhYmVsOiAnTnVtYmVyIG9mIE1ldGVyJywga2V5OiAnTWV0ZXJzJywgdHlwZTogJ2ludGVnZXInIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBUcmFuc21pc3Npb24gQXNzZXRzJywga2V5OiAnQXNzZXRzJywgdHlwZTogJ2ludGVnZXInIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBVc2VycycsIGtleTogJ1VzZXJzJywgdHlwZTogJ2ludGVnZXInIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogJ1Nob3cgaW4gUFEgRGFzaGJvYXJkJywga2V5OiAnRGlzcGxheURhc2hib2FyZCcsIHR5cGU6ICdib29sZWFuJyB9LFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3RhbmRhcmRTZWFyY2goKTogU2VhcmNoLklGaWVsZDxUPiB7XHJcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2V0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGxhYmVsOiAnTmFtZScsIGtleTogJ05hbWUnLCB0eXBlOiAnc3RyaW5nJyB9O1xyXG4gICAgICAgICAgICBjYXNlICdNZXRlcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBsYWJlbDogJ05hbWUnLCBrZXk6ICdOYW1lJywgdHlwZTogJ3N0cmluZycgfTtcclxuICAgICAgICAgICAgY2FzZSAnR3JvdXAnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbGFiZWw6ICdOYW1lJywga2V5OiAnTmFtZScsIHR5cGU6ICdzdHJpbmcnIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRhYmxlQ29sbHVtbnMoKSB7XHJcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2V0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldEtleScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldE5hbWUnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0VHlwZScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ0Fzc2V0IFR5cGUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnVm9sdGFnZUtWJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnVm9sdGFnZSAoa1YpJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01ldGVycycgYXMga2V5b2YgKFQpLCBsYWJlbDogJ01ldGVycycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdMb2NhdGlvbnMnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdTdWJzdGF0aW9ucycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGNhc2UgJ01ldGVyJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldEtleScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdMb2NhdGlvbicgYXMga2V5b2YgKFQpLCBsYWJlbDogJ1N1YnN0YXRpb24nLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWFwcGVkQXNzZXRzJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnQXNzZXRzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01ha2UnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdNYWtlJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01vZGVsJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTW9kZWwnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAxNywgcGFkZGluZzogMCB9LCByb3dTdHlsZTogeyB3aWR0aDogMCwgcGFkZGluZzogMCB9IH0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBjYXNlICdHcm91cCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRzJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnQXNzZXRzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01ldGVycycgYXMga2V5b2YgKFQpLCBsYWJlbDogJ01ldGVycycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdVc2VycycgYXMga2V5b2YgKFQpLCBsYWJlbDogJ1VzZXJzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0R3JvdXBzJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnU3ViR3JvdXBzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogMTcsIHBhZGRpbmc6IDAgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDAsIHBhZGRpbmc6IDAgfSB9LFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRDb2xsdW1uKCkge1xyXG4gICAgICAgIHN3aXRjaCAocHJvcHMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdBc3NldCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRLZXknIGFzIGtleW9mIChUKSwgbGFiZWw6ICdLZXknLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXROYW1lJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldFR5cGUnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdBc3NldCBUeXBlJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogMTcsIHBhZGRpbmc6IDAgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDAsIHBhZGRpbmc6IDAgfSB9LFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgY2FzZSAnTWV0ZXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0S2V5JyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnS2V5JywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05hbWUnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xvY2F0aW9uJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnU3Vic3RhdGlvbicsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGNhc2UgJ0dyb3VwJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgICAgICBzZXRTZWxlY3RlZERhdGEoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRpdGxlKCkge1xyXG4gICAgICAgIHN3aXRjaCAocHJvcHMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICgnQXNzZXQnKTpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnQWRkIFRyYW5zbWlzc2lvbiBBc3NldHMnXHJcbiAgICAgICAgICAgIGNhc2UgKCdNZXRlcicpOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdBZGQgTWV0ZXJzJ1xyXG4gICAgICAgICAgICBjYXNlICgnR3JvdXAnKTpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnQWRkIEFzc2V0IEdyb3VwcydcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VHlwZUxhYmVsKCkge1xyXG4gICAgICAgIHN3aXRjaCAocHJvcHMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICgnQXNzZXQnKTpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnVHJhbnNtaXNzaW9uIEFzc2V0cydcclxuICAgICAgICAgICAgY2FzZSAoJ01ldGVyJyk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ01ldGVycydcclxuICAgICAgICAgICAgY2FzZSAoJ0dyb3VwJyk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0Fzc2V0IEdyb3VwcydcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFkZGl0aW9uYWxGaWVsZHMoVHlwZTogc3RyaW5nKTogSlF1ZXJ5LmpxWEhSPEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQ+PiB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9ICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9BZGRpdGlvbmFsRmllbGQvUGFyZW50VGFibGUvJHtUeXBlfS9GaWVsZE5hbWUvMGAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBDb252ZXJ0VHlwZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnaW50ZWdlcicgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdkYXRldGltZScgfHwgdHlwZSA9PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB0eXBlOiB0eXBlIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdlbnVtJywgZW51bTogW3sgTGFiZWw6IHR5cGUsIFZhbHVlOiB0eXBlIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhhbmRsZS5kb25lKChkOiBBcnJheTxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkPikgPT4ge1xyXG5cclxuICAgICAgICAgICAgc2V0RmlsdGVyYWJsZUxpc3QobHN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcmRlcmVkID0gXy5vcmRlckJ5KGxzdC5jb25jYXQoZC5tYXAoaXRlbSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgeyBsYWJlbDogYFtBRiR7aXRlbS5FeHRlcm5hbERCICE9IHVuZGVmaW5lZCA/IFwiIFwiICsgaXRlbS5FeHRlcm5hbERCIDogJyd9XSR7aXRlbS5GaWVsZE5hbWV9YCwga2V5OiBpdGVtLkZpZWxkTmFtZSwgLi4uQ29udmVydFR5cGUoaXRlbS5UeXBlKSB9IGFzIFNlYXJjaC5JRmllbGQ8VD5cclxuICAgICAgICAgICAgICAgICkpKSwgWydsYWJlbCddLCBbXCJhc2NcIl0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9yZGVyZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4gKDw+XHJcbiAgICAgICAgPE1vZGFsIFNob3c9e3Byb3BzLlNob3d9IFRpdGxlPXtnZXRUaXRsZSgpfSBTaG93WD17dHJ1ZX0gU2l6ZT17J3hsZyd9IENhbGxCYWNrPXsoY29uZikgPT4geyBwcm9wcy5zZXRTaG93KGZhbHNlKTsgcmVzZXQoKTsgaWYgKGNvbmYpIHNldFJlc3VsdChzZWxlY3RlZERhdGEubWFwKGl0ZW0gPT4gaXRlbVtwcm9wcy5QcmltYXJ5S2V5XSkpOyB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNlYXJjaEJhcjxUPiBDb2xsdW1uTGlzdD17ZmlsdGVyYWJsZUxpc3R9IFNldEZpbHRlcj17KGZsZHMpID0+IHNldFNlYXJjaChmbGRzKX0gRGlyZWN0aW9uPXsnbGVmdCd9IGRlZmF1bHRDb2xsdW1uPXtnZXRTdGFuZGFyZFNlYXJjaCgpfSBXaWR0aD17JzUwJSd9IExhYmVsPXsnU2VhcmNoJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgU2hvd0xvYWRpbmc9e3NlYXJjaFN0YXRlID09ICdMb2FkaW5nJ30gUmVzdWx0Tm90ZT17c2VhcmNoU3RhdGUgPT0gJ0Vycm9yJyA/ICdDb3VsZCBub3QgY29tcGxldGUgU2VhcmNoJyA6ICdGb3VuZCAnICsgZGF0YS5sZW5ndGggKyBnZXRUeXBlTGFiZWwoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgR2V0RW51bT17KHNldE9wdGlvbnMsIGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFuZGxlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZC50eXBlICE9ICdlbnVtJyB8fCBmaWVsZC5lbnVtID09IHVuZGVmaW5lZCB8fCBmaWVsZC5lbnVtLmxlbmd0aCAhPSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKSA9PiB7IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlID0gJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1ZhbHVlTGlzdC9Hcm91cC8ke2ZpZWxkLmVudW1bMF0uVmFsdWV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmRvbmUoZCA9PiBzZXRPcHRpb25zKGQubWFwKGl0ZW0gPT4gKHsgVmFsdWU6IGl0ZW0uVmFsdWUudG9TdHJpbmcoKSwgTGFiZWw6IGl0ZW0uVGV4dCB9KSkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgpID0+IHsgaWYgKGhhbmRsZSAhPSBudWxsICYmIGhhbmRsZS5hYm9ydCA9PSBudWxsKSBoYW5kbGUuYWJvcnQoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9TZWFyY2hCYXI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIHN0eWxlPXt7IHdpZHRoOiAnNjAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29scz17Z2V0VGFibGVDb2xsdW1ucygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZEFsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmdBbGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGRBbGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nQWxsKCFhc2NlbmRpbmdBbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nQWxsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZEFsbChkLmNvbCBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZCkgPT4geyBzZXRTZWxlY3RlZERhdGEoKGwpID0+IHsgbGV0IHVwZGF0ZWQgPSBfLmNsb25lRGVlcChsKTsgdXBkYXRlZC5wdXNoKGQucm93KTsgcmV0dXJuIHVwZGF0ZWQ7IH0pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6ICc0MDBweCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93U3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eyhpdGVtKSA9PiBmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIHN0eWxlPXt7IHdpZHRoOiAnNDAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz4gU2VsZWN0ZWQgQXNzZXRzIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e2dldFNlbGVjdGVkQ29sbHVtbigpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtzZWxlY3RlZERhdGF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkU2VsZWN0ZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZz17YXNjZW5kaW5nU2VsZWN0ZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmRlcmVkID0gXy5vcmRlckJ5KHNlbGVjdGVkRGF0YSwgW2QuY29sXSwgWyghYXNjZW5kaW5nU2VsZWN0ZWQgPyBcImFzY1wiIDogXCJkZXNjXCIpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nU2VsZWN0ZWQoIWFzY2VuZGluZ1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZERhdGEob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JkZXJlZCA9IF8ub3JkZXJCeShzZWxlY3RlZERhdGEsIFtkLmNvbF0sIFtcImFzY1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nU2VsZWN0ZWQoIWFzY2VuZGluZ1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZERhdGEob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkU2VsZWN0ZWQoZC5jb2wgYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVhZFN0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5U3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgb3ZlcmZsb3dZOiAnc2Nyb2xsJywgbWF4SGVpZ2h0OiAnNDAwcHgnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1N0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoaXRlbSkgPT4gZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgIDwvPilcclxuXHJcbn1cclxuXHJcbmludGVyZmFjZSBJVHJhbnNtaXNzaW9uQXNzZXQge1xyXG4gICAgSUQ6IG51bWJlciwgQXNzZXRLZXk6IHN0cmluZywgQXNzZXROYW1lOiBzdHJpbmcsIEFzc2V0VHlwZTogc3RyaW5nLCBWb2x0YWdlS1Y6IG51bWJlciwgTWV0ZXJzOiBudW1iZXIsIExvY2F0aW9uczogc3RyaW5nXHJcbn1cclxuaW50ZXJmYWNlIElNZXRlciB7XHJcbiAgICBJRDogbnVtYmVyLCBBc3NldEtleTogc3RyaW5nLCBOYW1lOiBzdHJpbmcsIExvY2F0aW9uOiBzdHJpbmcsIE1hcHBlZEFzc2V0czogbnVtYmVyLCBNYWtlOiBzdHJpbmcsIE1vZGVsOiBzdHJpbmdcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIEFkZFRvR3JvdXBQb3B1cChwcm9wczogeyBvbkNvbXBsZXRlOiAoaWQ6IEFycmF5PGFueT4pID0+IEpRdWVyeVhIUiwgdHlwZTogKCdBc3NldCcgfCAnTWV0ZXInIHwgJ0dyb3VwJyksIFNob3c6IGJvb2xlYW4sIENsb3NlOiAoKSA9PiB2b2lkOyB9KSB7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VhcmNoQXNzZXQoc2VhcmNoOiBTZWFyY2guSUZpbHRlcjxJVHJhbnNtaXNzaW9uQXNzZXQ+W10sIGFzY2VuZGluZzogYm9vbGVhbiwgc29ydEZpZWxkOiBzdHJpbmcpOiBKUXVlcnlYSFIge1xyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRzID0gW1xyXG4gICAgICAgICAgICB7IGxhYmVsOiAnTmFtZScsIGtleTogJ05hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGxldCBzZWFyY2hlcyA9IHNlYXJjaC5tYXAocyA9PiB7IGlmIChkZWZhdWx0cy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmtleSA9PSBzLkZpZWxkTmFtZSkgPT0gLTEpIHJldHVybiB7IC4uLnMsIGlzUGl2b3RDb2x1bW46IHRydWUgfTsgZWxzZSByZXR1cm4gczsgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0L1NlYXJjaGFibGVMaXN0SW5jbHVkaW5nTWV0ZXJgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgU2VhcmNoZXM6IHNlYXJjaGVzLCBPcmRlckJ5OiBzb3J0RmllbGQsIEFzY2VuZGluZzogYXNjZW5kaW5nIH0pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VhcmNoTWV0ZXJzKHNlYXJjaDogU2VhcmNoLklGaWx0ZXI8SU1ldGVyPltdLCBhc2NlbmRpbmc6IGJvb2xlYW4sIHNvcnRGaWVsZDogc3RyaW5nKTogSlF1ZXJ5WEhSIHtcclxuICAgICAgICBjb25zdCBkZWZhdWx0czogQXJyYXk8U2VhcmNoLklGaWVsZDxJTWV0ZXI+PiA9IFtcclxuICAgICAgICAgICAgeyBsYWJlbDogJ0Fzc2V0S2V5Jywga2V5OiAnQXNzZXRLZXknLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnTmFtZScsIGtleTogJ05hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgICAgICB7IGxhYmVsOiAnTG9jYXRpb24nLCBrZXk6ICdMb2NhdGlvbicsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgICAgIHsgbGFiZWw6ICdNYWtlJywga2V5OiAnTWFrZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgICAgIHsgbGFiZWw6ICdNb2RlbCcsIGtleTogJ01vZGVsJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBBc3NldHMnLCBrZXk6ICdNYXBwZWRBc3NldHMnLCB0eXBlOiAnbnVtYmVyJyB9LFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGxldCBzZWFyY2hlcyA9IHNlYXJjaC5tYXAocyA9PiB7IGlmIChkZWZhdWx0cy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmtleSA9PSBzLkZpZWxkTmFtZSkgPT0gLTEpIHJldHVybiB7IC4uLnMsIGlzUGl2b3RDb2x1bW46IHRydWUgfTsgZWxzZSByZXR1cm4gczsgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyTGlzdC9FeHRlbmRlZFNlYXJjaGFibGVMaXN0YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IFNlYXJjaGVzOiBzZWFyY2hlcywgT3JkZXJCeTogc29ydEZpZWxkLCBBc2NlbmRpbmc6IGFzY2VuZGluZyB9KSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlYXJjaEFzc2V0R3JvdXBzKHNlYXJjaDogU2VhcmNoLklGaWx0ZXI8T3BlblhEQS5Bc3NldEdyb3VwPltdLCBhc2NlbmRpbmc6IGJvb2xlYW4sIHNvcnRGaWVsZDogc3RyaW5nKTogSlF1ZXJ5WEhSIHtcclxuICAgICAgICBsZXQgc2VhcmNoZXMgPSBzZWFyY2g7XHJcblxyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBvc3RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldEdyb3VwL1NlYXJjaGFibGVMaXN0YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IFNlYXJjaGVzOiBzZWFyY2hlcywgT3JkZXJCeTogc29ydEZpZWxkLCBBc2NlbmRpbmc6IGFzY2VuZGluZyB9KSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvcHMudHlwZSA9PSAnQXNzZXQnKVxyXG4gICAgICAgIHJldHVybiA8QWRkVG9Bc3NldEdyb3VwPElUcmFuc21pc3Npb25Bc3NldD4gU2hvdz17cHJvcHMuU2hvd30gc2V0U2hvdz17KCkgPT4gcHJvcHMuQ2xvc2UoKX0gdHlwZT0nQXNzZXQnIFByaW1hcnlLZXk9J0lEJyBnZXREYXRhPXtzZWFyY2hBc3NldH0gb25Db21wbGV0ZT17cHJvcHMub25Db21wbGV0ZX0gLz5cclxuICAgIGlmIChwcm9wcy50eXBlID09ICdNZXRlcicpXHJcbiAgICAgICAgcmV0dXJuIDxBZGRUb0Fzc2V0R3JvdXA8SU1ldGVyPiBTaG93PXtwcm9wcy5TaG93fSBzZXRTaG93PXsoKSA9PiBwcm9wcy5DbG9zZSgpfSB0eXBlPSdNZXRlcicgUHJpbWFyeUtleT0nSUQnIGdldERhdGE9e3NlYXJjaE1ldGVyc30gb25Db21wbGV0ZT17cHJvcHMub25Db21wbGV0ZX0gLz5cclxuICAgIGlmIChwcm9wcy50eXBlID09ICdHcm91cCcpXHJcbiAgICAgICAgcmV0dXJuIDxBZGRUb0Fzc2V0R3JvdXA8T3BlblhEQS5Bc3NldEdyb3VwPiBTaG93PXtwcm9wcy5TaG93fSBzZXRTaG93PXsoKSA9PiBwcm9wcy5DbG9zZSgpfSB0eXBlPSdHcm91cCcgUHJpbWFyeUtleT0nSUQnIGdldERhdGE9e3NlYXJjaEFzc2V0R3JvdXBzfSBvbkNvbXBsZXRlPXtwcm9wcy5vbkNvbXBsZXRlfSAvPlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWRkVG9Hcm91cFBvcHVwOyJdLCJzb3VyY2VSb290IjoiIn0=