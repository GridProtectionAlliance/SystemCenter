(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ByCompany"],{

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

/***/ "./TSX/SystemCenter/Company/ByCompany.tsx":
/*!************************************************!*\
  !*** ./TSX/SystemCenter/Company/ByCompany.tsx ***!
  \************************************************/
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
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _CompanyForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CompanyForm */ "./TSX/SystemCenter/Company/CompanyForm.tsx");
/* harmony import */ var _CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommonComponents/SearchFields */ "./TSX/SystemCenter/CommonComponents/SearchFields.tsx");
//******************************************************************************************************
//  ByCompany.tsx - Gbtc
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
//  10/16/2020 - Billy Ernest
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







var ByCompany = function (props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), search = _a[0], setSearch = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), data = _b[0], setData = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Name'), 2), sortField = _c[0], setSortField = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _d[0], setAscending = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getNewCompany()), 2), newCompany = _e[0], setNewCompany = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Idle'), 2), searchState = _f[0], setSearchState = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_6__["SearchFields"].Company), 2), filterableList = _g[0], setFilterableList = _g[1];
    var _h = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showNew = _h[0], setShowNew = _h[1];
    var _j = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), newCompanyErrors = _j[0], setNewCompanyErrors = _j[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return getData();
    }, [search, ascending, sortField]);
    function getData() {
        var handle = getCompanys();
        handle.done(function (data) {
            setSearchState('Idle');
            setData(JSON.parse(data));
        }).fail(function (d) { return setSearchState('Error'); });
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        };
    }
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getAdditionalFields();
        return function () {
            if (handle.abort != null)
                handle.abort();
        };
    }, []);
    function getAdditionalFields() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/AdditionalField/ParentTable/Company/FieldName/0",
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
            var ordered = lodash__WEBPACK_IMPORTED_MODULE_2__["orderBy"](_CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_6__["SearchFields"].Company.concat(d.map(function (item) { return (__assign({ label: "[AF" + (item.ExternalDB != undefined ? " " + item.ExternalDB : '') + "] " + item.FieldName, key: item.FieldName }, ConvertType(item.Type))); })), ['label'], ["asc"]);
            setFilterableList(ordered);
        });
        return handle;
    }
    function getCompanys() {
        setSearchState('Loading');
        return $.ajax({
            type: "Post",
            url: homePath + "api/SystemCenter/Company/ExtendedSearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: _CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_6__["TransformSearchFields"].Company(search), OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }
    function getNewCompany() {
        return {
            ID: 0,
            CompanyTypeID: 0,
            CompanyID: null,
            Name: null,
            Description: null
        };
    }
    function addNewCompany() {
        $.ajax({
            type: "POST",
            url: homePath + "api/SystemCenter/Company/Add",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newCompany),
            cache: false,
            async: true
        }).done(function (data) { return getData(); });
    }
    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Company&CompanyID=' + item.row.ID, state: {} });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: '100%' } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__["SearchBar"], { CollumnList: filterableList, SetFilter: function (flds) { return setSearch(flds); }, Direction: 'left', defaultCollumn: _CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_6__["DefaultSearchField"].Company, Width: '50%', Label: 'Search', ShowLoading: searchState == 'Loading', ResultNote: searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Companys', GetEnum: function (setOptions, field) {
                var handle = null;
                if (field.key == "CompanyTypeID")
                    return function () { };
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
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", hidden: props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0, onClick: function (event) {
                                event.preventDefault();
                                setNewCompany(getNewCompany());
                                setShowNew(true);
                            } }, "Add Company"))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: 'calc( 100% - 136px)' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_1___default.a, { cols: [
                    { key: 'Name', label: 'Name', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                    { key: 'CompanyTypeID', label: 'Type', headerStyle: { width: '15%' }, rowStyle: { width: '15%' } },
                    { key: 'CompanyID', label: 'CompanyID', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
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
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__["Modal"], { Show: showNew, Title: 'Edit Note', ShowCancel: true, CallBack: function (conf) { if (conf)
                addNewCompany(); setShowNew(false); }, DisableConfirm: newCompanyErrors.length > 0, ShowX: true, ConfirmShowToolTip: newCompanyErrors.length > 0, ConfirmToolTipContent: newCompanyErrors.map(function (t, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { key: i },
                " ",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                t,
                " "); }) },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CompanyForm__WEBPACK_IMPORTED_MODULE_5__["default"], { Company: newCompany, Setter: setNewCompany, setErrors: setNewCompanyErrors }))));
};
/* harmony default export */ __webpack_exports__["default"] = (ByCompany);


/***/ }),

/***/ "./TSX/SystemCenter/Company/CompanyForm.tsx":
/*!**************************************************!*\
  !*** ./TSX/SystemCenter/Company/CompanyForm.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CompanyForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CompanyTypeSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CompanyTypeSlice */ "./TSX/SystemCenter/Company/CompanyTypeSlice.ts");
//******************************************************************************************************
//  CompanyForm.tsx - Gbtc
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
//  10/20/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************




function CompanyForm(props) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
    var companyTypes = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_CompanyTypeSlice__WEBPACK_IMPORTED_MODULE_3__["SelectCompanyTypes"]);
    var ctStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_CompanyTypeSlice__WEBPACK_IMPORTED_MODULE_3__["SelectCompanyTypesStatus"]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var e = [];
        if (props.Company.CompanyID == null || props.Company.CompanyID.match(/[0-9]{8}/) == null)
            e.push('CompanyID must be a 8 character alphanumeric Identifier.');
        if (props.Company.Name == null || props.Company.Name.length == 0)
            e.push('A name is required.');
        if (props.Company.Name != null && props.Company.Name.length > 200)
            e.push('Company Name must be less than 200 characters.');
        if (props.setErrors != undefined)
            props.setErrors(e);
    }, [props.Company]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (ctStatus != 'unintiated')
            return;
        var promise = dispatch(Object(_CompanyTypeSlice__WEBPACK_IMPORTED_MODULE_3__["FetchCompanyTypes"])());
        return function () {
            if (promise.abort() !== undefined)
                promise.abort();
        };
    }, []);
    function Valid(field) {
        if (field == 'CompanyID')
            return props.Company.CompanyID != null && props.Company.CompanyID.match(/[0-9,a-z,A-Z]{8}/) != null;
        else if (field == 'Name')
            return props.Company.Name != null && props.Company.Name.length > 0 && props.Company.Name.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__["Select"], { Record: props.Company, Label: 'Company Type', Field: "CompanyTypeID", Options: companyTypes.map(function (ct) { return ({ Value: ct.ID.toString(), Label: ct.Name }); }), Setter: props.Setter }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__["Input"], { Record: props.Company, Field: 'Name', Feedback: 'Name must be less than 200 characters.', Valid: Valid, Setter: props.Setter }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__["Input"], { Record: props.Company, Field: 'CompanyID', Feedback: 'CompanyID must be 8 numeric characters.', Valid: Valid, Setter: props.Setter }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__["TextArea"], { Rows: 3, Record: props.Company, Field: 'Description', Valid: Valid, Setter: props.Setter })));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LXRhYmxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvU2VhcmNoRmllbGRzLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbXBhbnkvQnlDb21wYW55LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbXBhbnkvQ29tcGFueUZvcm0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDdkYsNkJBQTZCLHVEQUF1RDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELFlBQVksbUJBQU8sQ0FBQyxvQkFBTztBQUMzQixrQ0FBa0Msc0NBQXNDLFNBQVMsbUNBQW1DLGlFQUFpRSxHQUFHO0FBQ3hMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsNEdBQTRHO0FBQzFKLDBDQUEwQywrQkFBK0I7QUFDekUsMENBQTBDLCtCQUErQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUMzQixPQUFPLElBQUksQ0FBQztRQUNoQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTyxDQUNIO1FBQ0ksb0RBQUMsZ0VBQU0sSUFBdUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUMsZUFBZSxFQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQUUsSUFBSSxRQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUEzQyxDQUEyQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUk7UUFDeE0sb0RBQUMsK0RBQUssSUFBdUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsd0NBQXdDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBSTtRQUM3SixvREFBQywrREFBSyxJQUF1QixNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSx5Q0FBeUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFJO1FBQ25LLG9EQUFDLGtFQUFRLElBQXVCLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFJLENBQ3pILENBRU4sQ0FBQztBQUNWLENBQUMiLCJmaWxlIjoiQnlDb21wYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgVGFibGUudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAxOCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDgvMDIvMjAxOCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIEFuZ2xlSWNvbiA9IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHsgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBtYXJnaW46IDMgfSwgY2xhc3NOYW1lOiAnZmEgZmEtYW5nbGUtJyArIChwcm9wcy5hc2NlbmRpbmcgPyAndXAnIDogJ2Rvd24nKSB9KSk7IH07XG52YXIgVGFibGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYmxlKHByb3BzKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBwcm9wcykgfHwgdGhpcztcbiAgICB9XG4gICAgVGFibGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJvd0NvbXBvbmVudHMgPSB0aGlzLmdlbmVyYXRlUm93cygpO1xuICAgICAgICB2YXIgaGVhZGVyQ29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVIZWFkZXJzKCk7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLnRhYmxlQ2xhc3MgIT09IHVuZGVmaW5lZCA/IHRoaXMucHJvcHMudGFibGVDbGFzcyA6ICcnLCBzdHlsZTogdGhpcy5wcm9wcy50YWJsZVN0eWxlIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIiwgeyBzdHlsZTogdGhpcy5wcm9wcy50aGVhZFN0eWxlIH0sIGhlYWRlckNvbXBvbmVudHMpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIHsgc3R5bGU6IHRoaXMucHJvcHMudGJvZHlTdHlsZSB9LCByb3dDb21wb25lbnRzKSkpO1xuICAgIH07XG4gICAgVGFibGUucHJvdG90eXBlLmdlbmVyYXRlSGVhZGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29scy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5wcm9wcy5jb2xzLm1hcChmdW5jdGlvbiAoY29sRGF0YSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZTtcbiAgICAgICAgICAgIGlmIChjb2xEYXRhLmhlYWRlclN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGNvbERhdGEuaGVhZGVyU3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCB7IGtleTogaW5kZXgsIHN0eWxlOiBzdHlsZSwgb25DbGljazogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLmhhbmRsZVNvcnQoeyBjb2w6IGNvbERhdGEua2V5LCBhc2NlbmRpbmc6IF90aGlzLnByb3BzLmFzY2VuZGluZyB9LCBlKTsgfSB9LFxuICAgICAgICAgICAgICAgIGNvbERhdGEubGFiZWwsXG4gICAgICAgICAgICAgICAgX3RoaXMucHJvcHMuc29ydEZpZWxkID09PSBjb2xEYXRhLmtleSA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQW5nbGVJY29uLCB7IGFzY2VuZGluZzogX3RoaXMucHJvcHMuYXNjZW5kaW5nIH0pIDogbnVsbCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBjZWxscyk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuZ2VuZXJhdGVSb3dzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IF90aGlzLnByb3BzLmNvbHMubWFwKGZ1bmN0aW9uIChjb2xEYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNzcztcbiAgICAgICAgICAgICAgICBpZiAoY29sRGF0YS5yb3dTdHlsZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBjc3MgPSB7fTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNzcyA9IF9fYXNzaWduKHt9LCBjb2xEYXRhLnJvd1N0eWxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCB7IGtleTogaW5kZXgudG9TdHJpbmcoKSArIGl0ZW1bY29sRGF0YS5rZXldICsgY29sRGF0YS5rZXksIHN0eWxlOiBjc3MsIG9uQ2xpY2s6IF90aGlzLmhhbmRsZUNsaWNrLmJpbmQoX3RoaXMsIHsgY29sOiBjb2xEYXRhLmtleSwgcm93OiBpdGVtLCBkYXRhOiBpdGVtW2NvbERhdGEua2V5XSB9KSB9LCBjb2xEYXRhLmNvbnRlbnQgIT09IHVuZGVmaW5lZCA/IGNvbERhdGEuY29udGVudChpdGVtLCBjb2xEYXRhLmtleSwgY3NzKSA6IGl0ZW1bY29sRGF0YS5rZXldKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBzdHlsZTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5wcm9wcy5yb3dTdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBfX2Fzc2lnbih7fSwgX3RoaXMucHJvcHMucm93U3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0eWxlID0ge307XG4gICAgICAgICAgICBpZiAoc3R5bGUuY3Vyc29yID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICAgICAgaWYgKF90aGlzLnByb3BzLnNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiYgX3RoaXMucHJvcHMuc2VsZWN0ZWQoaXRlbSkpXG4gICAgICAgICAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCB7IHN0eWxlOiBzdHlsZSwga2V5OiBpbmRleC50b1N0cmluZygpIH0sIGNlbGxzKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVGFibGUucHJvdG90eXBlLmhhbmRsZUNsaWNrID0gZnVuY3Rpb24gKGRhdGEsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayhkYXRhLCBldmVudCk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuaGFuZGxlU29ydCA9IGZ1bmN0aW9uIChkYXRhLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU29ydChkYXRhKTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZTtcbn0oUmVhY3QuQ29tcG9uZW50KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBUYWJsZTtcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBTZWFyY2hGaWVsZHMudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjEsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA0LzE1LzIwMjEgLSBDLiBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5pbXBvcnQge1N5c3RlbUNlbnRlciwgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFNlYXJjaEZpZWxkcyB7XHJcbiAgICBleHBvcnQgY29uc3QgQ3VzdG9tZXIgPSBbXHJcbiAgICAgICAgeyBsYWJlbDogJ0FjY291bnQgTmFtZScsIGtleTogJ0N1c3RvbWVyS2V5JywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnTmFtZScsIGtleTogJ05hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdQaG9uZScsIGtleTogJ1Bob25lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnRGVzY3JpcHRpb24nLCBrZXk6ICdEZXNjcmlwdGlvbicsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1BRVmlldyBTaXRlIE5hbWUnLCBrZXk6ICdQUVZpZXdTaXRlJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnTnVtYmVyIG9mIEFzc2lnbmVkIE1ldGVycycsIGtleTogJ01ldGVycycsIHR5cGU6ICdpbnRlZ2VyJyB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBleHBvcnQgY29uc3QgQ29tcGFueSA9IFtcclxuICAgICAgICB7IGxhYmVsOiAnTmFtZScsIGtleTogJ05hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdDb21wYW55SUQnLCBrZXk6ICdDb21wYW55SUQnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdEZXNjcmlwdGlvbicsIGtleTogJ0Rlc2NyaXB0aW9uJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnQ29tcGFueSBUeXBlJywga2V5OiAnQ29tcGFueVR5cGVJRCcsIHR5cGU6ICdlbnVtJyB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBleHBvcnQgY29uc3QgVXNlckFjY291bnQgPSBbXHJcbiAgICAgICAgeyBsYWJlbDogJ0ZpcnN0IE5hbWUnLCBrZXk6ICdVc2VyQWNjb3VudC5GaXJzdE5hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdMYXN0IE5hbWUnLCBrZXk6ICdVc2VyQWNjb3VudC5MYXN0TmFtZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1Bob25lJywga2V5OiAnVXNlckFjY291bnQuUGhvbmUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdNb2JpbGUgUGhvbmUnLCBrZXk6ICdVc2VyQWNjb3VudC5Nb2JpbGVQaG9uZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0VtYWlsJywga2V5OiAnVXNlckFjY291bnQuRW1haWwnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdUU0MnLCBrZXk6ICdVc2VyQWNjb3VudC5UU0MnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdSb2xlJywga2V5OiAnUm9sZS5OYW1lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnU2VjdXJpdHkgUm9sZScsIGtleTogJ0FwcGxpY2F0aW9uUm9sZS5OYW1lJywgdHlwZTogJ3N0cmluZycgfVxyXG4gICAgXTtcclxuXHJcbiAgICBleHBvcnQgY29uc3QgTG9jYXRpb24gPSBbXHJcbiAgICAgICAgeyBsYWJlbDogJ05hbWUnLCBrZXk6ICdOYW1lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnS2V5Jywga2V5OiAnTG9jYXRpb25LZXknLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdBc3NldCcsIGtleTogJ0Fzc2V0JywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnTWV0ZXInLCBrZXk6ICdNZXRlcicsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBBc3NldHMnLCBrZXk6ICdBc3NldHMnLCB0eXBlOiAnaW50ZWdlcicgfSxcclxuICAgICAgICB7IGxhYmVsOiAnTnVtYmVyIG9mIE1ldGVycycsIGtleTogJ01ldGVycycsIHR5cGU6ICdpbnRlZ2VyJyB9LFxyXG4gICAgXTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgRGVmYXVsdFNlYXJjaEZpZWxkIHtcclxuICAgIGV4cG9ydCBjb25zdCBDb21wYW55ID0geyBsYWJlbDogJ05hbWUnLCBrZXk6ICdOYW1lJywgdHlwZTogJ3N0cmluZycgfTtcclxuICAgIGV4cG9ydCBjb25zdCBDdXN0b21lciA9IHsgbGFiZWw6ICdBY2NvdW50IE5hbWUnLCBrZXk6ICdDdXN0b21lcktleScsIHR5cGU6ICdzdHJpbmcnIH07XHJcbiAgICBleHBvcnQgY29uc3QgVXNlckFjY291bnQgPSB7IGxhYmVsOiAnRmlyc3QgTmFtZScsIGtleTogJ1VzZXJBY2NvdW50LkZpcnN0TmFtZScsIHR5cGU6ICdzdHJpbmcnIH07XHJcbiAgICBleHBvcnQgY29uc3QgTG9jYXRpb24gPSB7IGxhYmVsOiAnTmFtZScsIGtleTogJ05hbWUnLCB0eXBlOiAnc3RyaW5nJyB9O1xyXG59XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zZm9ybVNlYXJjaEZpZWxkcyB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ29tcGFueShzZWFyY2gpIHtcclxuICAgICAgICByZXR1cm4gc2VhcmNoLm1hcChzID0+IHtcclxuICAgICAgICAgICAgaWYgKFNlYXJjaEZpZWxkcy5Db21wYW55LmZpbmRJbmRleChpdGVtID0+IGl0ZW0ua2V5ID09IHMuRmllbGROYW1lKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IC4uLnMsIGlzUGl2b3RDb2x1bW46IHRydWUgfTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ3VzdG9tZXIoc2VhcmNoKSB7XHJcbiAgICAgICAgY29uc3QgcHFWaWV3UXVlcnkgPSAnKFNFTEVDVCBDdXN0b21lci5JRCBGUk9NIFBRVmlld1NpdGUgTEVGVCBKT0lOIFtzeXN0ZW1DZW50ZXIuQ3VzdG9tZXJBY2Nlc3NdIE9OJyArXHJcbiAgICAgICAgICAgICdbc3lzdGVtQ2VudGVyLkN1c3RvbWVyQWNjZXNzXS5QUVZpZXdTaXRlSUQgPSBQUVZpZXdTaXRlLklEIExFRlQgSk9JTiBDdXN0b21lciBDIE9OIEMuSUQgPSBbc3lzdGVtQ2VudGVyLkN1c3RvbWVyQWNjZXNzXS5DdXN0b21lcklEIFdIRVJFICcgKyBcclxuICAgICAgICAnIFBRVmlld1NpdGUuTmFtZSAnXHJcblxyXG4gICAgICAgIGxldCBhZnYgPSBzZWFyY2gubWFwKHMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocy5GaWVsZE5hbWUgPT0gJ1BRVmlld1NpdGUnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gcy5TZWFyY2hUZXh0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICclJztcclxuICAgICAgICAgICAgICAgIHRleHQucmVwbGFjZSgnKicsICclJyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCInXCIgKyB0ZXh0ICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBGaWVsZE5hbWU6ICdJRCcsIFNlYXJjaFRleHQ6IHBxVmlld1F1ZXJ5ICsgcy5PcGVyYXRvciArIHRleHQgKyAnICknLCBPcGVyYXRvcjogJ0lOJywgVHlwZTogJ251bWJlcicsIGlzUGl2b3RDb2x1bW46IGZhbHNlIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChTZWFyY2hGaWVsZHMuQ3VzdG9tZXIuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5rZXkgPT0gcy5GaWVsZE5hbWUpID09IC0xKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucywgaXNQaXZvdENvbHVtbjogdHJ1ZSB9O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFmdjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIExvY2F0aW9uKHNlYXJjaCkge1xyXG5cclxuICAgICAgICBjb25zdCBhc3NldFF1ZXJ5ID0gJyhTRUxFQ1QgQXNzZXRMb2NhdGlvbi5Mb2NhdGlvbklEIEZST00gQXNzZXQgTEVGVCBKT0lOIEFzc2V0TG9jYXRpb24gT04gJyArXHJcbiAgICAgICAgICAgICdBc3NldExvY2F0aW9uLkFzc2V0SUQgPSBBc3NldC5JRCBXSEVSRSAnICtcclxuICAgICAgICAgICAgJyBBc3NldC5Bc3NldE5hbWUgJ1xyXG5cclxuICAgICAgICBjb25zdCBtZXRlclF1ZXJ5ID0gJyhTRUxFQ1QgTWV0ZXIuTG9jYXRpb25JRCBGUk9NIE1ldGVyIFdIRVJFICcgK1xyXG4gICAgICAgICAgICAnIE1ldGVyLkFzc2V0S2V5ICdcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlYXJjaC5tYXAocyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzLkZpZWxkTmFtZSA9PSAnTWV0ZXInKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gcy5TZWFyY2hUZXh0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICclJztcclxuICAgICAgICAgICAgICAgIHRleHQucmVwbGFjZSgnKicsICclJyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCIgJ1wiICsgdGV4dCArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgRmllbGROYW1lOiAnSUQnLCBTZWFyY2hUZXh0OiBtZXRlclF1ZXJ5ICsgcy5PcGVyYXRvciArIHRleHQgKyAnIG9yIE1ldGVyLk5hbWUgJyArIHMuT3BlcmF0b3IgKyB0ZXh0ICsgJyApJywgT3BlcmF0b3I6ICdJTicsIFR5cGU6ICdudW1iZXInLCBpc1Bpdm90Q29sdW1uOiBmYWxzZSB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHMuRmllbGROYW1lID09ICdBc3NldCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSBzLlNlYXJjaFRleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gJyUnO1xyXG4gICAgICAgICAgICAgICAgdGV4dC5yZXBsYWNlKCcqJywgJyUnKTtcclxuICAgICAgICAgICAgICAgIHRleHQgPSBcIiAnXCIgKyB0ZXh0ICsgXCInXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBGaWVsZE5hbWU6ICdJRCcsIFNlYXJjaFRleHQ6IGFzc2V0UXVlcnkgKyBzLk9wZXJhdG9yICsgdGV4dCArICcgb3IgQXNzZXQuQXNzZXRLZXkgJyArIHMuT3BlcmF0b3IgKyB0ZXh0ICsgJyApJywgT3BlcmF0b3I6ICdJTicsIFR5cGU6ICdudW1iZXInLCBpc1Bpdm90Q29sdW1uOiBmYWxzZSB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFNlYXJjaEZpZWxkcy5Mb2NhdGlvbi5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmtleSA9PSBzLkZpZWxkTmFtZSkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5zLCBpc1Bpdm90Q29sdW1uOiB0cnVlIH07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQnlDb21wYW55LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAxMC8xNi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC10YWJsZSdcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgU2VhcmNoQmFyLCBTZWFyY2gsIE1vZGFsIH0gZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZSc7XHJcbmltcG9ydCBDb21wYW55Rm9ybSBmcm9tICcuL0NvbXBhbnlGb3JtJztcclxuaW1wb3J0IHsgRGVmYXVsdFNlYXJjaEZpZWxkLCBTZWFyY2hGaWVsZHMsIFRyYW5zZm9ybVNlYXJjaEZpZWxkcyB9IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvU2VhcmNoRmllbGRzJztcclxuXHJcblxyXG5pbnRlcmZhY2UgQ29tcGFueSBleHRlbmRzIFN5c3RlbUNlbnRlci5Db21wYW55IHtcclxuICAgIE1ldGVyczogbnVtYmVyXHJcbn1cclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5cclxuY29uc3QgQnlDb21wYW55OiBTeXN0ZW1DZW50ZXIuQnlDb21wb25lbnQgPSAocHJvcHMpID0+IHtcclxuICAgIGxldCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xyXG4gICAgXHJcbiAgICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U2VhcmNoLklGaWx0ZXI8Q29tcGFueT4+PihbXSk7XHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxDb21wYW55Pj4oW10pO1xyXG4gICAgY29uc3QgW3NvcnRGaWVsZCwgc2V0U29ydEZpZWxkXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJ05hbWUnKTtcclxuICAgIGNvbnN0IFthc2NlbmRpbmcsIHNldEFzY2VuZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuICAgIGNvbnN0IFtuZXdDb21wYW55LCBzZXROZXdDb21wYW55XSA9IFJlYWN0LnVzZVN0YXRlPFN5c3RlbUNlbnRlci5Db21wYW55PihnZXROZXdDb21wYW55KCkpO1xyXG4gICAgY29uc3QgW3NlYXJjaFN0YXRlLCBzZXRTZWFyY2hTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZTwoJ0lkbGUnIHwgJ0xvYWRpbmcnIHwgJ0Vycm9yJyk+KCdJZGxlJyk7XHJcbiAgICBjb25zdCBbZmlsdGVyYWJsZUxpc3QsIHNldEZpbHRlcmFibGVMaXN0XSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFNlYXJjaC5JRmllbGQ8Q29tcGFueT4+PihTZWFyY2hGaWVsZHMuQ29tcGFueSBhcyBTZWFyY2guSUZpZWxkPENvbXBhbnk+W10pO1xyXG4gICAgY29uc3QgW3Nob3dOZXcsIHNldFNob3dOZXddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gICAgY29uc3QgW25ld0NvbXBhbnlFcnJvcnMsIHNldE5ld0NvbXBhbnlFcnJvcnNdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nW10+KFtdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBnZXREYXRhKCk7XHJcbiAgICB9LCBbc2VhcmNoLCBhc2NlbmRpbmcsIHNvcnRGaWVsZF0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IGdldENvbXBhbnlzKCk7XHJcbiAgICAgICAgaGFuZGxlLmRvbmUoKGRhdGE6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBzZXRTZWFyY2hTdGF0ZSgnSWRsZScpO1xyXG4gICAgICAgICAgICBzZXREYXRhKEpTT04ucGFyc2UoZGF0YSkgYXMgQ29tcGFueVtdKTtcclxuXHJcbiAgICAgICAgfSkuZmFpbCgoZCkgPT4gc2V0U2VhcmNoU3RhdGUoJ0Vycm9yJykpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gZ2V0QWRkaXRpb25hbEZpZWxkcygpO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IG51bGwpIGhhbmRsZS5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBZGRpdGlvbmFsRmllbGRzKCk6IEpRdWVyeS5qcVhIUjxBcnJheTxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkPj4ge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQWRkaXRpb25hbEZpZWxkL1BhcmVudFRhYmxlL0NvbXBhbnkvRmllbGROYW1lLzBgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gQ29udmVydFR5cGUodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ2ludGVnZXInIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnZGF0ZXRpbWUnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogdHlwZSB9XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZW51bScsIGVudW06IFt7IExhYmVsOiB0eXBlLCBWYWx1ZTogdHlwZSB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoYW5kbGUuZG9uZSgoZDogQXJyYXk8U3lzdGVtQ2VudGVyLkFkZGl0aW9uYWxGaWVsZD4pID0+IHtcclxuICAgICAgICAgICAgbGV0IG9yZGVyZWQgPSBfLm9yZGVyQnkoKFNlYXJjaEZpZWxkcy5Db21wYW55IGFzIFNlYXJjaC5JRmllbGQ8Q29tcGFueT5bXSkuY29uY2F0KGQubWFwKGl0ZW0gPT4gKFxyXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogYFtBRiR7aXRlbS5FeHRlcm5hbERCICE9IHVuZGVmaW5lZCA/IFwiIFwiICsgaXRlbS5FeHRlcm5hbERCIDogJyd9XSAke2l0ZW0uRmllbGROYW1lfWAsIGtleTogaXRlbS5GaWVsZE5hbWUsIC4uLkNvbnZlcnRUeXBlKGl0ZW0uVHlwZSkgfSBhcyBTZWFyY2guSUZpZWxkPExvY2F0aW9uPlxyXG4gICAgICAgICAgICApKSksIFsnbGFiZWwnXSwgW1wiYXNjXCJdKTtcclxuICAgICAgICAgICAgc2V0RmlsdGVyYWJsZUxpc3Qob3JkZXJlZClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRDb21wYW55cygpOiBKUXVlcnkuanFYSFI8c3RyaW5nPntcclxuICAgICAgICBzZXRTZWFyY2hTdGF0ZSgnTG9hZGluZycpO1xyXG5cclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9Db21wYW55L0V4dGVuZGVkU2VhcmNoYWJsZUxpc3RgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgU2VhcmNoZXM6IFRyYW5zZm9ybVNlYXJjaEZpZWxkcy5Db21wYW55KHNlYXJjaCksIE9yZGVyQnk6IHNvcnRGaWVsZCwgQXNjZW5kaW5nOiBhc2NlbmRpbmcgfSksXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXROZXdDb21wYW55KCk6IFN5c3RlbUNlbnRlci5Db21wYW55IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgQ29tcGFueVR5cGVJRDogMCxcclxuICAgICAgICAgICAgQ29tcGFueUlEOiBudWxsLFxyXG4gICAgICAgICAgICBOYW1lOiBudWxsLFxyXG4gICAgICAgICAgICBEZXNjcmlwdGlvbjogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGROZXdDb21wYW55KCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQ29tcGFueS9BZGRgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG5ld0NvbXBhbnkpLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZGF0YSkgPT4gZ2V0RGF0YSgpKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdChpdGVtKSB7XHJcbiAgICAgICAgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJz9uYW1lPUNvbXBhbnkmQ29tcGFueUlEPScgKyBpdGVtLnJvdy5JRCwgc3RhdGU6IHt9IH0pXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgIDxTZWFyY2hCYXI8Q29tcGFueT4gQ29sbHVtbkxpc3Q9e2ZpbHRlcmFibGVMaXN0fSBTZXRGaWx0ZXI9eyhmbGRzKSA9PiBzZXRTZWFyY2goZmxkcyl9IERpcmVjdGlvbj17J2xlZnQnfSBkZWZhdWx0Q29sbHVtbj17RGVmYXVsdFNlYXJjaEZpZWxkLkNvbXBhbnkgYXMgU2VhcmNoLklGaWVsZDxDb21wYW55Pn0gV2lkdGg9eyc1MCUnfSBMYWJlbD17J1NlYXJjaCd9XHJcbiAgICAgICAgICAgICAgICBTaG93TG9hZGluZz17c2VhcmNoU3RhdGUgPT0gJ0xvYWRpbmcnfSBSZXN1bHROb3RlPXtzZWFyY2hTdGF0ZSA9PSAnRXJyb3InID8gJ0NvdWxkIG5vdCBjb21wbGV0ZSBTZWFyY2gnIDogJ0ZvdW5kICcgKyBkYXRhLmxlbmd0aCArICcgQ29tcGFueXMnfVxyXG4gICAgICAgICAgICAgICAgR2V0RW51bT17KHNldE9wdGlvbnMsIGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhbmRsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLmtleSA9PSBcIkNvbXBhbnlUeXBlSURcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgpID0+IHsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZC50eXBlICE9ICdlbnVtJyB8fCBmaWVsZC5lbnVtID09IHVuZGVmaW5lZCB8fCBmaWVsZC5lbnVtLmxlbmd0aCAhPSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4geyB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGUgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9WYWx1ZUxpc3QvR3JvdXAvJHtmaWVsZC5lbnVtWzBdLlZhbHVlfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5kb25lKGQgPT4gc2V0T3B0aW9ucyhkLm1hcChpdGVtID0+ICh7IFZhbHVlOiBpdGVtLlZhbHVlLnRvU3RyaW5nKCksIExhYmVsOiBpdGVtLlRleHQgfSkpKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4geyBpZiAoaGFuZGxlICE9IG51bGwgJiYgaGFuZGxlLmFib3J0ID09IG51bGwpIGhhbmRsZS5hYm9ydCgpOyB9XHJcbiAgICAgICAgICAgICAgICB9fVxyXG5cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgey8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9J0NvbXBhbnlNZXRlci5Bc3NldEtleSc+TWV0ZXI8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nQ29tcGFueVR5cGUuTmFtZSc+VHlwZTwvb3B0aW9uPiovfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCIgc3R5bGU9e3sgd2lkdGg6ICcxNSUnLCBwYWRkaW5nUmlnaHQ6IDEwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldCBjbGFzc05hbWU9XCJib3JkZXJcIiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCcsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT1cInctYXV0b1wiIHN0eWxlPXt7IGZvbnRTaXplOiAnbGFyZ2UnIH19PkFjdGlvbnM6PC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBoaWRkZW49e3Byb3BzLlJvbGVzLmluZGV4T2YoJ0FkbWluaXN0cmF0b3InKSA8IDAgJiYgcHJvcHMuUm9sZXMuaW5kZXhPZignVHJhbnNtaXNzaW9uIFNNRScpIDwgMH0gb25DbGljaz17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0NvbXBhbnkoZ2V0TmV3Q29tcGFueSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93TmV3KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+QWRkIENvbXBhbnk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L1NlYXJjaEJhcj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnY2FsYyggMTAwJSAtIDEzNnB4KScgfX0+XHJcbiAgICAgICAgICAgICAgICA8VGFibGU8Q29tcGFueT5cclxuICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScsIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTUlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzE1JScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0NvbXBhbnlUeXBlSUQnLCBsYWJlbDogJ1R5cGUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzE1JScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxNSUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdDb21wYW55SUQnLCBsYWJlbDogJ0NvbXBhbnlJRCcsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Rlc2NyaXB0aW9uJywgbGFiZWw6ICdEZXNjcmlwdGlvbicsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWV0ZXJzJywgbGFiZWw6ICdBc3NpZ25lZCBNZXRlcnMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE9e2RhdGF9XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydEZpZWxkPXtzb3J0RmllbGR9XHJcbiAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5jb2wgPT0gc29ydEZpZWxkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZChkLmNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICB0aGVhZFN0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDMwMCwgd2lkdGg6ICcxMDAlJyAgfX1cclxuICAgICAgICAgICAgICAgICAgICByb3dTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoaXRlbSkgPT4gZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxNb2RhbCBTaG93PXtzaG93TmV3fSBUaXRsZT17J0VkaXQgTm90ZSd9XHJcbiAgICAgICAgICAgICAgICBTaG93Q2FuY2VsPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgQ2FsbEJhY2s9eyhjb25mKSA9PiB7IGlmIChjb25mKSBhZGROZXdDb21wYW55KCk7IHNldFNob3dOZXcoZmFsc2UpOyB9fVxyXG4gICAgICAgICAgICAgICAgRGlzYWJsZUNvbmZpcm09e25ld0NvbXBhbnlFcnJvcnMubGVuZ3RoID4gMH1cclxuICAgICAgICAgICAgICAgIFNob3dYPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgQ29uZmlybVNob3dUb29sVGlwPXtuZXdDb21wYW55RXJyb3JzLmxlbmd0aCA+IDB9XHJcbiAgICAgICAgICAgICAgICBDb25maXJtVG9vbFRpcENvbnRlbnQ9e1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0NvbXBhbnlFcnJvcnMubWFwKCh0LCBpKSA9PiA8cCBrZXk9e2l9PiA8aSBzdHlsZT17eyBtYXJnaW5SaWdodDogJzEwcHgnLCBjb2xvcjogJyNkYzM1NDUnIH19IGNsYXNzTmFtZT1cImZhIGZhLWV4Y2xhbWF0aW9uLWNpcmNsZVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3R9IDwvcD4pXHJcbiAgICAgICAgICAgICAgICB9PlxyXG4gICAgICAgICAgICAgICAgPENvbXBhbnlGb3JtIENvbXBhbnk9e25ld0NvbXBhbnl9IFNldHRlcj17c2V0TmV3Q29tcGFueX0gc2V0RXJyb3JzPXtzZXROZXdDb21wYW55RXJyb3JzfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ5Q29tcGFueTtcclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDb21wYW55Rm9ybS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMTAvMjAvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlU2VsZWN0b3IsIHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBJbnB1dCwgVGV4dEFyZWEsU2VsZWN0IH0gZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC1mb3Jtcyc7XHJcbmltcG9ydCB7IFNlbGVjdENvbXBhbnlUeXBlcywgU2VsZWN0Q29tcGFueVR5cGVzU3RhdHVzLCBGZXRjaENvbXBhbnlUeXBlcyB9IGZyb20gJy4vQ29tcGFueVR5cGVTbGljZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21wYW55Rm9ybShwcm9wczogeyBDb21wYW55OiBTeXN0ZW1DZW50ZXIuQ29tcGFueSwgU2V0dGVyOiAoY29tcGFueTogU3lzdGVtQ2VudGVyLkNvbXBhbnkpID0+IHZvaWQsIHNldEVycm9ycz86IChlOiBzdHJpbmdbXSkgPT4gdm9pZCB9KSB7XHJcblxyXG4gICAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG4gICAgY29uc3QgY29tcGFueVR5cGVzID0gdXNlU2VsZWN0b3IoU2VsZWN0Q29tcGFueVR5cGVzKSBhcyBTeXN0ZW1DZW50ZXIuQ29tcGFueVR5cGVbXTtcclxuICAgIGNvbnN0IGN0U3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0Q29tcGFueVR5cGVzU3RhdHVzKSBhcyBTeXN0ZW1DZW50ZXIuU3RhdHVzO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGUgPSBbXTtcclxuICAgICAgICBpZiAocHJvcHMuQ29tcGFueS5Db21wYW55SUQgPT0gbnVsbCB8fCBwcm9wcy5Db21wYW55LkNvbXBhbnlJRC5tYXRjaCgvWzAtOV17OH0vKSA9PSBudWxsKVxyXG4gICAgICAgICAgICBlLnB1c2goJ0NvbXBhbnlJRCBtdXN0IGJlIGEgOCBjaGFyYWN0ZXIgYWxwaGFudW1lcmljIElkZW50aWZpZXIuJyk7XHJcbiAgICAgICAgaWYgKHByb3BzLkNvbXBhbnkuTmFtZSA9PSBudWxsIHx8IHByb3BzLkNvbXBhbnkuTmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgZS5wdXNoKCdBIG5hbWUgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICAgICAgaWYgKHByb3BzLkNvbXBhbnkuTmFtZSAhPSBudWxsICYmIHByb3BzLkNvbXBhbnkuTmFtZS5sZW5ndGggPiAyMDApXHJcbiAgICAgICAgICAgIGUucHVzaCgnQ29tcGFueSBOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLicpO1xyXG5cclxuICAgICAgICBpZiAocHJvcHMuc2V0RXJyb3JzICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcHJvcHMuc2V0RXJyb3JzKGUpO1xyXG4gICAgfSwgW3Byb3BzLkNvbXBhbnldKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChjdFN0YXR1cyAhPSAndW5pbnRpYXRlZCcpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBkaXNwYXRjaChGZXRjaENvbXBhbnlUeXBlcygpKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocHJvbWlzZS5hYm9ydCgpICE9PSB1bmRlZmluZWQpIHByb21pc2UuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gVmFsaWQoZmllbGQ6IGtleW9mKFN5c3RlbUNlbnRlci5Db21wYW55KSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnQ29tcGFueUlEJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkNvbXBhbnkuQ29tcGFueUlEICE9IG51bGwgJiYgcHJvcHMuQ29tcGFueS5Db21wYW55SUQubWF0Y2goL1swLTksYS16LEEtWl17OH0vKSAhPSBudWxsO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkNvbXBhbnkuTmFtZSAhPSBudWxsICYmIHByb3BzLkNvbXBhbnkuTmFtZS5sZW5ndGggPiAwICYmIHByb3BzLkNvbXBhbnkuTmFtZS5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxmb3JtPlxyXG4gICAgICAgICAgICA8U2VsZWN0PFN5c3RlbUNlbnRlci5Db21wYW55PiBSZWNvcmQ9e3Byb3BzLkNvbXBhbnl9IExhYmVsPXsnQ29tcGFueSBUeXBlJ30gRmllbGQ9XCJDb21wYW55VHlwZUlEXCIgT3B0aW9ucz17Y29tcGFueVR5cGVzLm1hcChjdCA9PiAoe1ZhbHVlOiBjdC5JRC50b1N0cmluZygpLCBMYWJlbDogY3QuTmFtZX0pKX0gU2V0dGVyPXtwcm9wcy5TZXR0ZXJ9IC8+XHJcbiAgICAgICAgICAgIDxJbnB1dDxTeXN0ZW1DZW50ZXIuQ29tcGFueT4gUmVjb3JkPXtwcm9wcy5Db21wYW55fSBGaWVsZD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e1ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlNldHRlcn0gLz5cclxuICAgICAgICAgICAgPElucHV0PFN5c3RlbUNlbnRlci5Db21wYW55PiBSZWNvcmQ9e3Byb3BzLkNvbXBhbnl9IEZpZWxkPXsnQ29tcGFueUlEJ30gRmVlZGJhY2s9eydDb21wYW55SUQgbXVzdCBiZSA4IG51bWVyaWMgY2hhcmFjdGVycy4nfSBWYWxpZD17VmFsaWR9IFNldHRlcj17cHJvcHMuU2V0dGVyfSAvPlxyXG4gICAgICAgICAgICA8VGV4dEFyZWE8U3lzdGVtQ2VudGVyLkNvbXBhbnk+IFJvd3M9ezN9IFJlY29yZD17cHJvcHMuQ29tcGFueX0gRmllbGQ9eydEZXNjcmlwdGlvbid9IFZhbGlkPXtWYWxpZH0gU2V0dGVyPXtwcm9wcy5TZXR0ZXJ9IC8+XHJcbiAgICAgICAgPC9mb3JtPlxyXG5cclxuICAgICAgICApO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==