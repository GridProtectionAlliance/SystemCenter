(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ByCustomer"],{

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

/***/ "./TSX/SystemCenter/CommonComponents/SearchFields.tsx":
/*!************************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/SearchFields.tsx ***!
  \************************************************************/
/*! exports provided: SearchFields, DefaultSearchField, TransformSearchFields */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchFields", function() { return SearchFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultSearchField", function() { return DefaultSearchField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformSearchFields", function() { return TransformSearchFields; });
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
var SearchFields;
(function (SearchFields) {
    SearchFields.Customer = [
        { label: 'Account Name', key: 'CustomerKey', type: 'string' },
        { label: 'Name', key: 'Name', type: 'string' },
        { label: 'Phone', key: 'Phone', type: 'string' },
        { label: 'Description', key: 'Description', type: 'string' },
        { label: 'PQView Site Name', key: 'PQViewSite', type: 'string' },
        { label: 'Number of Assigned Meters', key: 'Meters', type: 'integer' },
    ];
    SearchFields.Company = [
        { label: 'Name', key: 'Name', type: 'string' },
        { label: 'CompanyID', key: 'CompanyID', type: 'string' },
        { label: 'Description', key: 'Description', type: 'string' },
        { label: 'Company Type', key: 'CompanyTypeID', type: 'enum' },
    ];
    SearchFields.UserAccount = [
        { label: 'First Name', key: 'UserAccount.FirstName', type: 'string' },
        { label: 'Last Name', key: 'UserAccount.LastName', type: 'string' },
        { label: 'Phone', key: 'UserAccount.Phone', type: 'string' },
        { label: 'Mobile Phone', key: 'UserAccount.MobilePhone', type: 'string' },
        { label: 'Email', key: 'UserAccount.Email', type: 'string' },
        { label: 'TSC', key: 'UserAccount.TSC', type: 'string' },
        { label: 'Role', key: 'Role.Name', type: 'string' },
        { label: 'Security Role', key: 'ApplicationRole.Name', type: 'string' }
    ];
    SearchFields.Location = [
        { label: 'Name', key: 'Name', type: 'string' },
        { label: 'Key', key: 'LocationKey', type: 'string' },
        { label: 'Asset', key: 'Asset', type: 'string' },
        { label: 'Meter', key: 'Meter', type: 'string' },
        { label: 'Number of Assets', key: 'Assets', type: 'integer' },
        { label: 'Number of Meters', key: 'Meters', type: 'integer' },
    ];
})(SearchFields || (SearchFields = {}));
var DefaultSearchField;
(function (DefaultSearchField) {
    DefaultSearchField.Company = { label: 'Name', key: 'Name', type: 'string' };
    DefaultSearchField.Customer = { label: 'Account Name', key: 'CustomerKey', type: 'string' };
    DefaultSearchField.UserAccount = { label: 'First Name', key: 'UserAccount.FirstName', type: 'string' };
    DefaultSearchField.Location = { label: 'Name', key: 'Name', type: 'string' };
})(DefaultSearchField || (DefaultSearchField = {}));
var TransformSearchFields;
(function (TransformSearchFields) {
    function Company(search) {
        return search.map(function (s) {
            if (SearchFields.Company.findIndex(function (item) { return item.key == s.FieldName; }) == -1)
                return __assign(__assign({}, s), { isPivotColumn: true });
            else
                return s;
        });
    }
    TransformSearchFields.Company = Company;
    function Customer(search) {
        var pqViewQuery = '(SELECT Customer.ID FROM PQViewSite LEFT JOIN [systemCenter.CustomerAccess] ON' +
            '[systemCenter.CustomerAccess].PQViewSiteID = PQViewSite.ID LEFT JOIN Customer C ON C.ID = [systemCenter.CustomerAccess].CustomerID WHERE ' +
            ' PQViewSite.Name ';
        var afv = search.map(function (s) {
            if (s.FieldName == 'PQViewSite') {
                var text = s.SearchText;
                if (text.length == 0)
                    text = '%';
                text.replace('*', '%');
                text = "'" + text + "'";
                return { FieldName: 'ID', SearchText: pqViewQuery + s.Operator + text + ' )', Operator: 'IN', Type: 'number', isPivotColumn: false };
            }
            if (SearchFields.Customer.findIndex(function (item) { return item.key == s.FieldName; }) == -1)
                return __assign(__assign({}, s), { isPivotColumn: true });
            else
                return s;
        });
        return afv;
    }
    TransformSearchFields.Customer = Customer;
    function Location(search) {
        var assetQuery = '(SELECT AssetLocation.LocationID FROM Asset LEFT JOIN AssetLocation ON ' +
            'AssetLocation.AssetID = Asset.ID WHERE ' +
            ' Asset.AssetName ';
        var meterQuery = '(SELECT Meter.LocationID FROM Meter WHERE ' +
            ' Meter.AssetKey ';
        return search.map(function (s) {
            if (s.FieldName == 'Meter') {
                var text = s.SearchText;
                if (text.length == 0)
                    text = '%';
                text.replace('*', '%');
                text = " '" + text + "'";
                return { FieldName: 'ID', SearchText: meterQuery + s.Operator + text + ' or Meter.Name ' + s.Operator + text + ' )', Operator: 'IN', Type: 'number', isPivotColumn: false };
            }
            if (s.FieldName == 'Asset') {
                var text = s.SearchText;
                if (text.length == 0)
                    text = '%';
                text.replace('*', '%');
                text = " '" + text + "'";
                return { FieldName: 'ID', SearchText: assetQuery + s.Operator + text + ' or Asset.AssetKey ' + s.Operator + text + ' )', Operator: 'IN', Type: 'number', isPivotColumn: false };
            }
            if (SearchFields.Location.findIndex(function (item) { return item.key == s.FieldName; }) == -1)
                return __assign(__assign({}, s), { isPivotColumn: true });
            else
                return s;
        });
    }
    TransformSearchFields.Location = Location;
})(TransformSearchFields || (TransformSearchFields = {}));


/***/ }),

/***/ "./TSX/SystemCenter/Customer/ByCustomer.tsx":
/*!**************************************************!*\
  !*** ./TSX/SystemCenter/Customer/ByCustomer.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gpa-gemstone/react-table */ "../../node_modules/@gpa-gemstone/react-table/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/SearchFields */ "./TSX/SystemCenter/CommonComponents/SearchFields.tsx");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_6__);
//******************************************************************************************************
//  ByCustomer.tsx - Gbtc
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
//  02/04/2020 - Billy Ernest
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







var ByCustomer = function (props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), search = _a[0], setSearch = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Idle'), 2), searchState = _b[0], setSearchState = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_4__["SearchFields"].Customer), 2), filterableList = _c[0], setFilterableList = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), data = _d[0], setData = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('CustomerKey'), 2), sortField = _e[0], setSortField = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _f[0], setAscending = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getNewCustomer()), 2), newCustomer = _g[0], setNewCustomer = _g[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return getData();
    }, [search, ascending, sortField]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getAdditionalFields();
        return function () {
            if (handle.abort != null)
                handle.abort();
        };
    }, []);
    function getData() {
        var handle = getCustomers();
        handle.done(function (data) { setData(JSON.parse(data)); setSearchState('Idle'); }).fail(function (d) { return setSearchState('Error'); });
        ;
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        };
    }
    function getCustomers() {
        setSearchState('Loading');
        return $.ajax({
            type: "Post",
            url: homePath + "api/SystemCenter/Customer/SearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: _CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_4__["TransformSearchFields"].Customer(search), OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }
    function getNewCustomer() {
        return {
            ID: 0,
            CustomerKey: null,
            Name: null,
            Phone: null,
            Description: null
        };
    }
    function addNewCustomer() {
        $.ajax({
            type: "POST",
            url: homePath + "api/SystemCenter/Customer/Add",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newCustomer),
            cache: false,
            async: true
        }).done(function (data) { return getData(); });
    }
    function getAdditionalFields() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/AdditionalField/ParentTable/Customer/FieldName/0",
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
            var ordered = lodash__WEBPACK_IMPORTED_MODULE_2__["orderBy"](_CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_4__["SearchFields"].Customer.concat(d.map(function (item) { return (__assign({ label: "[AF" + (item.ExternalDB != undefined ? " " + item.ExternalDB : '') + "] " + item.FieldName, key: item.FieldName }, ConvertType(item.Type))); })), ['label'], ["asc"]);
            setFilterableList(ordered);
        });
        return handle;
    }
    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Customer&CustomerID=' + item.row.ID, state: {} });
    }
    function valid(field) {
        if (field == 'CustomerKey')
            return newCustomer.CustomerKey != null && newCustomer.CustomerKey.length > 0 && newCustomer.CustomerKey.length <= 25;
        else if (field == 'Name')
            return newCustomer.Name == null || newCustomer.Name.length <= 100;
        else if (field == 'Phone')
            return newCustomer.Phone == null || newCustomer.Phone.length <= 20;
        else if (field == 'Description')
            return newCustomer.Description == null || newCustomer.Description.length <= 200;
        return false;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: '100%' } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_5__["SearchBar"], { CollumnList: filterableList, SetFilter: function (flds) { return setSearch(flds); }, Direction: 'left', defaultCollumn: _CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_4__["DefaultSearchField"].Customer, Width: '50%', Label: 'Search', ShowLoading: searchState == 'Loading', ResultNote: searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Customers', GetEnum: function (setOptions, field) {
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
            } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item", style: { width: '15%', paddingRight: 10 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "Actions:"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#customerModal", hidden: props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0, onClick: function (event) { event.preventDefault(); } }, "Add Customer"))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: 'calc( 100% - 136px)' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_1___default.a, { cols: [
                    { key: 'CustomerKey', label: 'Account Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                    { key: 'Name', label: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                    { key: 'Phone', label: 'Phone', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'Description', label: 'Description', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', label: 'Assigned Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ], tableClass: "table table-hover", data: data, sortField: sortField, ascending: ascending, onSort: function (d) {
                    if (d.col == sortField)
                        setAscending(!ascending);
                    else {
                        setAscending(true);
                        setSortField(d.col);
                    }
                }, onClick: handleSelect, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "customerModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '75%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, "Add Customer"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_6__["Input"], { Record: newCustomer, Field: 'CustomerKey', Feedback: 'AccountName of less than 25 characters is required.', Valid: valid, Setter: setNewCustomer }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_6__["Input"], { Record: newCustomer, Field: 'Name', Feedback: 'Name must be less than 100 characters.', Valid: valid, Setter: setNewCustomer }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_6__["Input"], { Record: newCustomer, Field: 'Phone', Feedback: 'Phone must be less than 20 characters.', Valid: valid, Setter: setNewCustomer }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_6__["TextArea"], { Rows: 3, Record: newCustomer, Field: 'Description', Feedback: 'Description must be less than 200 characters.', Valid: valid, Setter: setNewCustomer })))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addNewCustomer }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close")))))));
};
/* harmony default export */ __webpack_exports__["default"] = (ByCustomer);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LXRhYmxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvU2VhcmNoRmllbGRzLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0N1c3RvbWVyL0J5Q3VzdG9tZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDdkYsNkJBQTZCLHVEQUF1RDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELFlBQVksbUJBQU8sQ0FBQyxvQkFBTztBQUMzQixrQ0FBa0Msc0NBQXNDLFNBQVMsbUNBQW1DLGlFQUFpRSxHQUFHO0FBQ3hMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsNEdBQTRHO0FBQzFKLDBDQUEwQywrQkFBK0I7QUFDekUsMENBQTBDLCtCQUErQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGtE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IiwiZmlsZSI6IkJ5Q3VzdG9tZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBUYWJsZS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDE4LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOC8wMi8yMDE4IC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgQW5nbGVJY29uID0gZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZTogeyB3aWR0aDogMTAsIGhlaWdodDogMTAsIG1hcmdpbjogMyB9LCBjbGFzc05hbWU6ICdmYSBmYS1hbmdsZS0nICsgKHByb3BzLmFzY2VuZGluZyA/ICd1cCcgOiAnZG93bicpIH0pKTsgfTtcbnZhciBUYWJsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFibGUocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBUYWJsZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm93Q29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVSb3dzKCk7XG4gICAgICAgIHZhciBoZWFkZXJDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZUhlYWRlcnMoKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgeyBjbGFzc05hbWU6IHRoaXMucHJvcHMudGFibGVDbGFzcyAhPT0gdW5kZWZpbmVkID8gdGhpcy5wcm9wcy50YWJsZUNsYXNzIDogJycsIHN0eWxlOiB0aGlzLnByb3BzLnRhYmxlU3R5bGUgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiLCB7IHN0eWxlOiB0aGlzLnByb3BzLnRoZWFkU3R5bGUgfSwgaGVhZGVyQ29tcG9uZW50cyksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgeyBzdHlsZTogdGhpcy5wcm9wcy50Ym9keVN0eWxlIH0sIHJvd0NvbXBvbmVudHMpKSk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuZ2VuZXJhdGVIZWFkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgY2VsbHMgPSB0aGlzLnByb3BzLmNvbHMubWFwKGZ1bmN0aW9uIChjb2xEYXRhLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlO1xuICAgICAgICAgICAgaWYgKGNvbERhdGEuaGVhZGVyU3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gY29sRGF0YS5oZWFkZXJTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIHsga2V5OiBpbmRleCwgc3R5bGU6IHN0eWxlLCBvbkNsaWNrOiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuaGFuZGxlU29ydCh7IGNvbDogY29sRGF0YS5rZXksIGFzY2VuZGluZzogX3RoaXMucHJvcHMuYXNjZW5kaW5nIH0sIGUpOyB9IH0sXG4gICAgICAgICAgICAgICAgY29sRGF0YS5sYWJlbCxcbiAgICAgICAgICAgICAgICBfdGhpcy5wcm9wcy5zb3J0RmllbGQgPT09IGNvbERhdGEua2V5ID8gUmVhY3QuY3JlYXRlRWxlbWVudChBbmdsZUljb24sIHsgYXNjZW5kaW5nOiBfdGhpcy5wcm9wcy5hc2NlbmRpbmcgfSkgOiBudWxsKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIGNlbGxzKTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5nZW5lcmF0ZVJvd3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGEubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGNlbGxzID0gX3RoaXMucHJvcHMuY29scy5tYXAoZnVuY3Rpb24gKGNvbERhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3NzO1xuICAgICAgICAgICAgICAgIGlmIChjb2xEYXRhLnJvd1N0eWxlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIGNzcyA9IHt9O1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY3NzID0gX19hc3NpZ24oe30sIGNvbERhdGEucm93U3R5bGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIHsga2V5OiBpbmRleC50b1N0cmluZygpICsgaXRlbVtjb2xEYXRhLmtleV0gKyBjb2xEYXRhLmtleSwgc3R5bGU6IGNzcywgb25DbGljazogX3RoaXMuaGFuZGxlQ2xpY2suYmluZChfdGhpcywgeyBjb2w6IGNvbERhdGEua2V5LCByb3c6IGl0ZW0sIGRhdGE6IGl0ZW1bY29sRGF0YS5rZXldIH0pIH0sIGNvbERhdGEuY29udGVudCAhPT0gdW5kZWZpbmVkID8gY29sRGF0YS5jb250ZW50KGl0ZW0sIGNvbERhdGEua2V5LCBjc3MpIDogaXRlbVtjb2xEYXRhLmtleV0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHN0eWxlO1xuICAgICAgICAgICAgaWYgKF90aGlzLnByb3BzLnJvd1N0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IF9fYXNzaWduKHt9LCBfdGhpcy5wcm9wcy5yb3dTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2VsZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiBfdGhpcy5wcm9wcy5zZWxlY3RlZChpdGVtKSlcbiAgICAgICAgICAgICAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHsgc3R5bGU6IHN0eWxlLCBrZXk6IGluZGV4LnRvU3RyaW5nKCkgfSwgY2VsbHMpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiAoZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGRhdGEsIGV2ZW50KTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5oYW5kbGVTb3J0ID0gZnVuY3Rpb24gKGRhdGEsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25Tb3J0KGRhdGEpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlO1xufShSZWFjdC5Db21wb25lbnQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRhYmxlO1xuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFNlYXJjaEZpZWxkcy50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDQvMTUvMjAyMSAtIEMuIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbmltcG9ydCB7U3lzdGVtQ2VudGVyLCBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgU2VhcmNoRmllbGRzIHtcclxuICAgIGV4cG9ydCBjb25zdCBDdXN0b21lciA9IFtcclxuICAgICAgICB7IGxhYmVsOiAnQWNjb3VudCBOYW1lJywga2V5OiAnQ3VzdG9tZXJLZXknLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdOYW1lJywga2V5OiAnTmFtZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1Bob25lJywga2V5OiAnUGhvbmUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdEZXNjcmlwdGlvbicsIGtleTogJ0Rlc2NyaXB0aW9uJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnUFFWaWV3IFNpdGUgTmFtZScsIGtleTogJ1BRVmlld1NpdGUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdOdW1iZXIgb2YgQXNzaWduZWQgTWV0ZXJzJywga2V5OiAnTWV0ZXJzJywgdHlwZTogJ2ludGVnZXInIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIGV4cG9ydCBjb25zdCBDb21wYW55ID0gW1xyXG4gICAgICAgIHsgbGFiZWw6ICdOYW1lJywga2V5OiAnTmFtZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0NvbXBhbnlJRCcsIGtleTogJ0NvbXBhbnlJRCcsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0Rlc2NyaXB0aW9uJywga2V5OiAnRGVzY3JpcHRpb24nLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdDb21wYW55IFR5cGUnLCBrZXk6ICdDb21wYW55VHlwZUlEJywgdHlwZTogJ2VudW0nIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIGV4cG9ydCBjb25zdCBVc2VyQWNjb3VudCA9IFtcclxuICAgICAgICB7IGxhYmVsOiAnRmlyc3QgTmFtZScsIGtleTogJ1VzZXJBY2NvdW50LkZpcnN0TmFtZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0xhc3QgTmFtZScsIGtleTogJ1VzZXJBY2NvdW50Lkxhc3ROYW1lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnUGhvbmUnLCBrZXk6ICdVc2VyQWNjb3VudC5QaG9uZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ01vYmlsZSBQaG9uZScsIGtleTogJ1VzZXJBY2NvdW50Lk1vYmlsZVBob25lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnRW1haWwnLCBrZXk6ICdVc2VyQWNjb3VudC5FbWFpbCcsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1RTQycsIGtleTogJ1VzZXJBY2NvdW50LlRTQycsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1JvbGUnLCBrZXk6ICdSb2xlLk5hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdTZWN1cml0eSBSb2xlJywga2V5OiAnQXBwbGljYXRpb25Sb2xlLk5hbWUnLCB0eXBlOiAnc3RyaW5nJyB9XHJcbiAgICBdO1xyXG5cclxuICAgIGV4cG9ydCBjb25zdCBMb2NhdGlvbiA9IFtcclxuICAgICAgICB7IGxhYmVsOiAnTmFtZScsIGtleTogJ05hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdLZXknLCBrZXk6ICdMb2NhdGlvbktleScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0Fzc2V0Jywga2V5OiAnQXNzZXQnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdNZXRlcicsIGtleTogJ01ldGVyJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnTnVtYmVyIG9mIEFzc2V0cycsIGtleTogJ0Fzc2V0cycsIHR5cGU6ICdpbnRlZ2VyJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdOdW1iZXIgb2YgTWV0ZXJzJywga2V5OiAnTWV0ZXJzJywgdHlwZTogJ2ludGVnZXInIH0sXHJcbiAgICBdO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBEZWZhdWx0U2VhcmNoRmllbGQge1xyXG4gICAgZXhwb3J0IGNvbnN0IENvbXBhbnkgPSB7IGxhYmVsOiAnTmFtZScsIGtleTogJ05hbWUnLCB0eXBlOiAnc3RyaW5nJyB9O1xyXG4gICAgZXhwb3J0IGNvbnN0IEN1c3RvbWVyID0geyBsYWJlbDogJ0FjY291bnQgTmFtZScsIGtleTogJ0N1c3RvbWVyS2V5JywgdHlwZTogJ3N0cmluZycgfTtcclxuICAgIGV4cG9ydCBjb25zdCBVc2VyQWNjb3VudCA9IHsgbGFiZWw6ICdGaXJzdCBOYW1lJywga2V5OiAnVXNlckFjY291bnQuRmlyc3ROYW1lJywgdHlwZTogJ3N0cmluZycgfTtcclxuICAgIGV4cG9ydCBjb25zdCBMb2NhdGlvbiA9IHsgbGFiZWw6ICdOYW1lJywga2V5OiAnTmFtZScsIHR5cGU6ICdzdHJpbmcnIH07XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNmb3JtU2VhcmNoRmllbGRzIHtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb21wYW55KHNlYXJjaCkge1xyXG4gICAgICAgIHJldHVybiBzZWFyY2gubWFwKHMgPT4ge1xyXG4gICAgICAgICAgICBpZiAoU2VhcmNoRmllbGRzLkNvbXBhbnkuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5rZXkgPT0gcy5GaWVsZE5hbWUpID09IC0xKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucywgaXNQaXZvdENvbHVtbjogdHJ1ZSB9O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDdXN0b21lcihzZWFyY2gpIHtcclxuICAgICAgICBjb25zdCBwcVZpZXdRdWVyeSA9ICcoU0VMRUNUIEN1c3RvbWVyLklEIEZST00gUFFWaWV3U2l0ZSBMRUZUIEpPSU4gW3N5c3RlbUNlbnRlci5DdXN0b21lckFjY2Vzc10gT04nICtcclxuICAgICAgICAgICAgJ1tzeXN0ZW1DZW50ZXIuQ3VzdG9tZXJBY2Nlc3NdLlBRVmlld1NpdGVJRCA9IFBRVmlld1NpdGUuSUQgTEVGVCBKT0lOIEN1c3RvbWVyIEMgT04gQy5JRCA9IFtzeXN0ZW1DZW50ZXIuQ3VzdG9tZXJBY2Nlc3NdLkN1c3RvbWVySUQgV0hFUkUgJyArIFxyXG4gICAgICAgICcgUFFWaWV3U2l0ZS5OYW1lICdcclxuXHJcbiAgICAgICAgbGV0IGFmdiA9IHNlYXJjaC5tYXAocyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzLkZpZWxkTmFtZSA9PSAnUFFWaWV3U2l0ZScpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSBzLlNlYXJjaFRleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJyUnO1xyXG4gICAgICAgICAgICAgICAgdGV4dC5yZXBsYWNlKCcqJywgJyUnKTtcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIidcIiArIHRleHQgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IEZpZWxkTmFtZTogJ0lEJywgU2VhcmNoVGV4dDogcHFWaWV3UXVlcnkgKyBzLk9wZXJhdG9yICsgdGV4dCArICcgKScsIE9wZXJhdG9yOiAnSU4nLCBUeXBlOiAnbnVtYmVyJywgaXNQaXZvdENvbHVtbjogZmFsc2UgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKFNlYXJjaEZpZWxkcy5DdXN0b21lci5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmtleSA9PSBzLkZpZWxkTmFtZSkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5zLCBpc1Bpdm90Q29sdW1uOiB0cnVlIH07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYWZ2O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gTG9jYXRpb24oc2VhcmNoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGFzc2V0UXVlcnkgPSAnKFNFTEVDVCBBc3NldExvY2F0aW9uLkxvY2F0aW9uSUQgRlJPTSBBc3NldCBMRUZUIEpPSU4gQXNzZXRMb2NhdGlvbiBPTiAnICtcclxuICAgICAgICAgICAgJ0Fzc2V0TG9jYXRpb24uQXNzZXRJRCA9IEFzc2V0LklEIFdIRVJFICcgK1xyXG4gICAgICAgICAgICAnIEFzc2V0LkFzc2V0TmFtZSAnXHJcblxyXG4gICAgICAgIGNvbnN0IG1ldGVyUXVlcnkgPSAnKFNFTEVDVCBNZXRlci5Mb2NhdGlvbklEIEZST00gTWV0ZXIgV0hFUkUgJyArXHJcbiAgICAgICAgICAgICcgTWV0ZXIuQXNzZXRLZXkgJ1xyXG5cclxuICAgICAgICByZXR1cm4gc2VhcmNoLm1hcChzID0+IHtcclxuICAgICAgICAgICAgaWYgKHMuRmllbGROYW1lID09ICdNZXRlcicpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSBzLlNlYXJjaFRleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJyUnO1xyXG4gICAgICAgICAgICAgICAgdGV4dC5yZXBsYWNlKCcqJywgJyUnKTtcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIiAnXCIgKyB0ZXh0ICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBGaWVsZE5hbWU6ICdJRCcsIFNlYXJjaFRleHQ6IG1ldGVyUXVlcnkgKyBzLk9wZXJhdG9yICsgdGV4dCArICcgb3IgTWV0ZXIuTmFtZSAnICsgcy5PcGVyYXRvciArIHRleHQgKyAnICknLCBPcGVyYXRvcjogJ0lOJywgVHlwZTogJ251bWJlcicsIGlzUGl2b3RDb2x1bW46IGZhbHNlIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocy5GaWVsZE5hbWUgPT0gJ0Fzc2V0Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHQ6IHN0cmluZyA9IHMuU2VhcmNoVGV4dDtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAnJSc7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LnJlcGxhY2UoJyonLCAnJScpO1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiICdcIiArIHRleHQgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IEZpZWxkTmFtZTogJ0lEJywgU2VhcmNoVGV4dDogYXNzZXRRdWVyeSArIHMuT3BlcmF0b3IgKyB0ZXh0ICsgJyBvciBBc3NldC5Bc3NldEtleSAnICsgcy5PcGVyYXRvciArIHRleHQgKyAnICknLCBPcGVyYXRvcjogJ0lOJywgVHlwZTogJ251bWJlcicsIGlzUGl2b3RDb2x1bW46IGZhbHNlIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoU2VhcmNoRmllbGRzLkxvY2F0aW9uLmZpbmRJbmRleChpdGVtID0+IGl0ZW0ua2V5ID09IHMuRmllbGROYW1lKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IC4uLnMsIGlzUGl2b3RDb2x1bW46IHRydWUgfTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBCeUN1c3RvbWVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMi8wNC8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC10YWJsZSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcblxyXG5pbXBvcnQgeyBEZWZhdWx0U2VhcmNoRmllbGQsIFNlYXJjaEZpZWxkcywgVHJhbnNmb3JtU2VhcmNoRmllbGRzIH0gZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9TZWFyY2hGaWVsZHMnO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIsIFNlYXJjaCB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5pbXBvcnQgeyBJbnB1dCwgVGV4dEFyZWEgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zJztcclxuXHJcblxyXG5pbnRlcmZhY2UgQ3VzdG9tZXIgZXh0ZW5kcyBTeXN0ZW1DZW50ZXIuQ3VzdG9tZXIge1xyXG4gICAgTWV0ZXJzOiBudW1iZXJcclxufVxyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmNvbnN0IEJ5Q3VzdG9tZXI6IFN5c3RlbUNlbnRlci5CeUNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgbGV0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XHJcbiAgICBcclxuICAgIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxTZWFyY2guSUZpbHRlcjxDdXN0b21lcj4+PihbXSk7XHJcbiAgICBjb25zdCBbc2VhcmNoU3RhdGUsIHNldFNlYXJjaFN0YXRlXSA9IFJlYWN0LnVzZVN0YXRlPCgnSWRsZScgfCAnTG9hZGluZycgfCAnRXJyb3InKT4oJ0lkbGUnKTtcclxuICAgIGNvbnN0IFtmaWx0ZXJhYmxlTGlzdCwgc2V0RmlsdGVyYWJsZUxpc3RdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U2VhcmNoLklGaWVsZDxDdXN0b21lcj4+PihTZWFyY2hGaWVsZHMuQ3VzdG9tZXIgYXMgU2VhcmNoLklGaWVsZDxDdXN0b21lcj5bXSk7XHJcblxyXG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8Q3VzdG9tZXI+PihbXSk7XHJcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignQ3VzdG9tZXJLZXknKTtcclxuICAgIGNvbnN0IFthc2NlbmRpbmcsIHNldEFzY2VuZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuICAgIGNvbnN0IFtuZXdDdXN0b21lciwgc2V0TmV3Q3VzdG9tZXJdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLkN1c3RvbWVyPihnZXROZXdDdXN0b21lcigpKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBnZXREYXRhKCk7XHJcbiAgICB9LCBbc2VhcmNoLCBhc2NlbmRpbmcsIHNvcnRGaWVsZF0pO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IGdldEFkZGl0aW9uYWxGaWVsZHMoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPSBudWxsKSBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gZ2V0Q3VzdG9tZXJzKCk7XHJcbiAgICAgICAgaGFuZGxlLmRvbmUoKGRhdGE6IHN0cmluZykgPT4geyBzZXREYXRhKEpTT04ucGFyc2UoZGF0YSkpOyBzZXRTZWFyY2hTdGF0ZSgnSWRsZScpOyB9KS5mYWlsKChkKSA9PiBzZXRTZWFyY2hTdGF0ZSgnRXJyb3InKSk7O1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEN1c3RvbWVycygpOiBKUXVlcnkuanFYSFI8c3RyaW5nPntcclxuXHJcbiAgICAgICAgc2V0U2VhcmNoU3RhdGUoJ0xvYWRpbmcnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQ3VzdG9tZXIvU2VhcmNoYWJsZUxpc3RgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgU2VhcmNoZXM6IFRyYW5zZm9ybVNlYXJjaEZpZWxkcy5DdXN0b21lcihzZWFyY2gpLCBPcmRlckJ5OiBzb3J0RmllbGQsIEFzY2VuZGluZzogYXNjZW5kaW5nIH0pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TmV3Q3VzdG9tZXIoKTogU3lzdGVtQ2VudGVyLkN1c3RvbWVyIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgQ3VzdG9tZXJLZXk6IG51bGwsXHJcbiAgICAgICAgICAgIE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgIFBob25lOiBudWxsLFxyXG4gICAgICAgICAgICBEZXNjcmlwdGlvbjogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGROZXdDdXN0b21lcigpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0N1c3RvbWVyL0FkZGAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobmV3Q3VzdG9tZXIpLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZGF0YSkgPT4gZ2V0RGF0YSgpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QWRkaXRpb25hbEZpZWxkcygpOiBKUXVlcnkuanFYSFI8QXJyYXk8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZD4+IHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0FkZGl0aW9uYWxGaWVsZC9QYXJlbnRUYWJsZS9DdXN0b21lci9GaWVsZE5hbWUvMGAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBDb252ZXJ0VHlwZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnaW50ZWdlcicgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdkYXRldGltZScgfHwgdHlwZSA9PSAnYm9vbGVhbicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB0eXBlOiB0eXBlIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdlbnVtJywgZW51bTogW3sgTGFiZWw6IHR5cGUsIFZhbHVlOiB0eXBlIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhhbmRsZS5kb25lKChkOiBBcnJheTxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkPikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgb3JkZXJlZCA9IF8ub3JkZXJCeSgoU2VhcmNoRmllbGRzLkN1c3RvbWVyIGFzIFNlYXJjaC5JRmllbGQ8Q3VzdG9tZXI+W10pLmNvbmNhdChkLm1hcChpdGVtID0+IChcclxuICAgICAgICAgICAgICAgIHsgbGFiZWw6IGBbQUYke2l0ZW0uRXh0ZXJuYWxEQiAhPSB1bmRlZmluZWQgPyBcIiBcIiArIGl0ZW0uRXh0ZXJuYWxEQiA6ICcnfV0gJHtpdGVtLkZpZWxkTmFtZX1gLCBrZXk6IGl0ZW0uRmllbGROYW1lLCAuLi5Db252ZXJ0VHlwZShpdGVtLlR5cGUpIH0gYXMgU2VhcmNoLklGaWVsZDxDdXN0b21lcj5cclxuICAgICAgICAgICAgKSkpLCBbJ2xhYmVsJ10sIFtcImFzY1wiXSk7XHJcbiAgICAgICAgICAgIHNldEZpbHRlcmFibGVMaXN0KG9yZGVyZWQpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYW5kbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0KGl0ZW0pIHtcclxuICAgICAgICBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9Q3VzdG9tZXImQ3VzdG9tZXJJRD0nICsgaXRlbS5yb3cuSUQsIHN0YXRlOiB7fSB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkKGZpZWxkOiBrZXlvZiAoU3lzdGVtQ2VudGVyLkN1c3RvbWVyKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnQ3VzdG9tZXJLZXknKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3Q3VzdG9tZXIuQ3VzdG9tZXJLZXkgIT0gbnVsbCAmJiBuZXdDdXN0b21lci5DdXN0b21lcktleS5sZW5ndGggPiAwICYmIG5ld0N1c3RvbWVyLkN1c3RvbWVyS2V5Lmxlbmd0aCA8PSAyNTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdDdXN0b21lci5OYW1lID09IG51bGwgfHwgbmV3Q3VzdG9tZXIuTmFtZS5sZW5ndGggPD0gMTAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdQaG9uZScpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdDdXN0b21lci5QaG9uZSA9PSBudWxsIHx8IG5ld0N1c3RvbWVyLlBob25lLmxlbmd0aCA8PSAyMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRGVzY3JpcHRpb24nKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3Q3VzdG9tZXIuRGVzY3JpcHRpb24gPT0gbnVsbCB8fCBuZXdDdXN0b21lci5EZXNjcmlwdGlvbi5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICA8U2VhcmNoQmFyPEN1c3RvbWVyPiBDb2xsdW1uTGlzdD17ZmlsdGVyYWJsZUxpc3R9IFNldEZpbHRlcj17KGZsZHMpID0+IHNldFNlYXJjaChmbGRzKX0gRGlyZWN0aW9uPXsnbGVmdCd9IGRlZmF1bHRDb2xsdW1uPXtEZWZhdWx0U2VhcmNoRmllbGQuQ3VzdG9tZXIgYXMgU2VhcmNoLklGaWVsZDxDdXN0b21lcj59IFdpZHRoPXsnNTAlJ30gTGFiZWw9eydTZWFyY2gnfVxyXG4gICAgICAgICAgICAgICAgU2hvd0xvYWRpbmc9e3NlYXJjaFN0YXRlID09ICdMb2FkaW5nJ30gUmVzdWx0Tm90ZT17c2VhcmNoU3RhdGUgPT0gJ0Vycm9yJyA/ICdDb3VsZCBub3QgY29tcGxldGUgU2VhcmNoJyA6ICdGb3VuZCAnICsgZGF0YS5sZW5ndGggKyAnIEN1c3RvbWVycyd9XHJcbiAgICAgICAgICAgICAgICBHZXRFbnVtPXsoc2V0T3B0aW9ucywgZmllbGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGFuZGxlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZC50eXBlICE9ICdlbnVtJyB8fCBmaWVsZC5lbnVtID09IHVuZGVmaW5lZCB8fCBmaWVsZC5lbnVtLmxlbmd0aCAhPSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4geyB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9WYWx1ZUxpc3QvR3JvdXAvJHtmaWVsZC5lbnVtWzBdLlZhbHVlfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5kb25lKGQgPT4gc2V0T3B0aW9ucyhkLm1hcChpdGVtID0+ICh7IFZhbHVlOiBpdGVtLlZhbHVlLnRvU3RyaW5nKCksIExhYmVsOiBpdGVtLlRleHQgfSkpKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4geyBpZiAoaGFuZGxlICE9IG51bGwgJiYgaGFuZGxlLmFib3J0ID09IG51bGwpIGhhbmRsZS5hYm9ydCgpOyB9XHJcbiAgICAgICAgICAgICAgICB9fVxyXG5cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCIgc3R5bGU9e3sgd2lkdGg6ICcxNSUnLCBwYWRkaW5nUmlnaHQ6IDEwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldCBjbGFzc05hbWU9XCJib3JkZXJcIiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCcsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT1cInctYXV0b1wiIHN0eWxlPXt7IGZvbnRTaXplOiAnbGFyZ2UnIH19PkFjdGlvbnM6PC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PVwiI2N1c3RvbWVyTW9kYWxcIiBoaWRkZW49e3Byb3BzLlJvbGVzLmluZGV4T2YoJ0FkbWluaXN0cmF0b3InKSA8IDAgJiYgcHJvcHMuUm9sZXMuaW5kZXhPZignVHJhbnNtaXNzaW9uIFNNRScpIDwgMH0gb25DbGljaz17KGV2ZW50KSA9PiB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgfX0+QWRkIEN1c3RvbWVyPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC9TZWFyY2hCYXI+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnY2FsYyggMTAwJSAtIDEzNnB4KScgfX0+XHJcbiAgICAgICAgICAgICAgICA8VGFibGU8Q3VzdG9tZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgY29scz17W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0N1c3RvbWVyS2V5JywgbGFiZWw6ICdBY2NvdW50IE5hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzE1JScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxNSUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJywgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxNSUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTUlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnUGhvbmUnLCBsYWJlbDogJ1Bob25lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnRGVzY3JpcHRpb24nLCBsYWJlbDogJ0Rlc2NyaXB0aW9uJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNZXRlcnMnLCBsYWJlbDogJ0Fzc2lnbmVkIE1ldGVycycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogMTcsIHBhZGRpbmc6IDAgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDAsIHBhZGRpbmc6IDAgfSB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlQ2xhc3M9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cclxuICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZH1cclxuICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cclxuICAgICAgICAgICAgICAgICAgICBvblNvcnQ9eyhkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkKGQuY29sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICB0Ym9keVN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93WTogJ3Njcm9sbCcsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzAwLCB3aWR0aDogJzEwMCUnICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHJvd1N0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eyhpdGVtKSA9PiBmYWxzZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIGlkPVwiY3VzdG9tZXJNb2RhbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiBzdHlsZT17eyBtYXhXaWR0aDogJzEwMCUnLCB3aWR0aDogJzc1JScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj5BZGQgQ3VzdG9tZXI8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXQ8U3lzdGVtQ2VudGVyLkN1c3RvbWVyPiBSZWNvcmQ9e25ld0N1c3RvbWVyfSBGaWVsZD17J0N1c3RvbWVyS2V5J30gRmVlZGJhY2s9eydBY2NvdW50TmFtZSBvZiBsZXNzIHRoYW4gMjUgY2hhcmFjdGVycyBpcyByZXF1aXJlZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17c2V0TmV3Q3VzdG9tZXJ9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dDxTeXN0ZW1DZW50ZXIuQ3VzdG9tZXI+IFJlY29yZD17bmV3Q3VzdG9tZXJ9IEZpZWxkPXsnTmFtZSd9IEZlZWRiYWNrPXsnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAxMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17c2V0TmV3Q3VzdG9tZXJ9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dDxTeXN0ZW1DZW50ZXIuQ3VzdG9tZXI+IFJlY29yZD17bmV3Q3VzdG9tZXJ9IEZpZWxkPXsnUGhvbmUnfSBGZWVkYmFjaz17J1Bob25lIG11c3QgYmUgbGVzcyB0aGFuIDIwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3NldE5ld0N1c3RvbWVyfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dEFyZWE8U3lzdGVtQ2VudGVyLkN1c3RvbWVyPiBSb3dzPXszfSBSZWNvcmQ9e25ld0N1c3RvbWVyfSBGaWVsZD17J0Rlc2NyaXB0aW9uJ30gRmVlZGJhY2s9eydEZXNjcmlwdGlvbiBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17c2V0TmV3Q3VzdG9tZXJ9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXthZGROZXdDdXN0b21lcn0+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ5Q3VzdG9tZXI7XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9