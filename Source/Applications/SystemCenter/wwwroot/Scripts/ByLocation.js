(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ByLocation"],{

/***/ "./TSX/SystemCenter/CommonComponents/FormInput.tsx":
/*!*********************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/FormInput.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  FormInput.tsx - Gbtc
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


var FormInput = /** @class */ (function (_super) {
    __extends(FormInput, _super);
    function FormInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormInput.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, this.props.Label == null ? this.props.Field : this.props.Label),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (this.props.Valid(this.props.Field) ? "form-control" : "form-control is-invalid"), onChange: function (evt) {
                    var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.Record);
                    if (evt.target.value != "")
                        record[_this.props.Field] = evt.target.value;
                    else
                        record[_this.props.Field] = null;
                    _this.props.Setter(record);
                }, value: this.props.Record[this.props.Field] == null ? '' : this.props.Record[this.props.Field].toString(), disabled: this.props.Disabled == null ? false : this.props.Disabled }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'invalid-feedback' }, this.props.Feedback == null ? this.props.Field + ' is a required field.' : this.props.Feedback));
    };
    return FormInput;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (FormInput);


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

/***/ "./TSX/SystemCenter/Location/ByLocation.tsx":
/*!**************************************************!*\
  !*** ./TSX/SystemCenter/Location/ByLocation.tsx ***!
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
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CommonComponents/ExternalDBUpdate */ "./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../CommonComponents/SearchFields */ "./TSX/SystemCenter/CommonComponents/SearchFields.tsx");
//******************************************************************************************************
//  SystemCenter.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  08/22/2019 - Billy Ernest
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










var ByLocation = function (props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), search = _a[0], setSearch = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), data = _b[0], setData = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getNewLocation()), 2), newLocation = _c[0], setNewLocation = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('LocationKey'), 2), sortField = _d[0], setSortField = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_9__["SearchFields"].Location), 2), filterableList = _e[0], setFilterableList = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Idle'), 2), searchState = _f[0], setSearchState = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _g[0], setAscending = _g[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getLocations();
        handle.done(function (dt) {
            setSearchState('Idle');
            setData(JSON.parse(dt));
        }).fail(function (d) { return setSearchState('Error'); });
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        };
    }, [sortField, ascending, search]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        setNewLocation(getNewLocation());
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getAdditionalFields();
        return function () {
            if (handle.abort != null)
                handle.abort();
        };
    }, []);
    function getNewLocation() {
        return {
            ID: 0,
            LocationKey: null,
            Name: null,
            Alias: null,
            Description: null,
            Latitude: null,
            Longitude: null,
            ShortName: null
        };
    }
    function getLocations() {
        setSearchState('Loading');
        return $.ajax({
            type: "Post",
            url: homePath + "api/openXDA/Location/SearchableListIncludingMeter",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: _CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_9__["TransformSearchFields"].Location(search), OrderBy: sortField, Ascending: ascending }),
            cache: false,
            async: true
        });
    }
    function getAdditionalFields() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/AdditionalField/ParentTable/Location/FieldName/0",
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
            var ordered = lodash__WEBPACK_IMPORTED_MODULE_2__["orderBy"](_CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_9__["SearchFields"].Location.concat(d.map(function (item) { return (__assign({ label: "[AF" + (item.ExternalDB != undefined ? " " + item.ExternalDB : '') + "] " + item.FieldName, key: item.FieldName }, ConvertType(item.Type))); })), ['label'], ["asc"]);
            setFilterableList(ordered);
        });
        return handle;
    }
    function addNewLocation() {
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Location/Add",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newLocation),
            cache: false,
            async: true
        });
        //.done((data) => getData());
    }
    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Location&LocationID=' + item.row.ID, state: {} });
    }
    function valid(field) {
        if (field == 'LocationKey')
            return newLocation.LocationKey != null;
        else if (field == 'Name')
            return newLocation.Name != null && newLocation.Name.length > 0 && newLocation.Name.length <= 200;
        else if (field == 'Alias')
            return newLocation.Alias == null || newLocation.Alias.length <= 200;
        else if (field == 'ShortName')
            return newLocation.ShortName == null || newLocation.ShortName.length <= 50;
        else if (field == 'Latitude')
            return newLocation.Latitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["AssetAttributes"].isRealNumber(newLocation.Latitude);
        else if (field == 'Longitude')
            return newLocation.Longitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["AssetAttributes"].isRealNumber(newLocation.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: '100%' } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_8__["SearchBar"], { CollumnList: filterableList, SetFilter: function (flds) { return setSearch(flds); }, Direction: 'left', defaultCollumn: _CommonComponents_SearchFields__WEBPACK_IMPORTED_MODULE_9__["DefaultSearchField"].Location, Width: '50%', Label: 'Search', ShowLoading: searchState == 'Loading', ResultNote: searchState == 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Locations', GetEnum: function (setOptions, field) {
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
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item", style: { width: '20%', paddingRight: 10 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "Actions:"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#locationModal", hidden: props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0, onClick: function (event) { event.preventDefault(); } }, "Add Substation")),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#extDBModal", hidden: props.Roles.indexOf('Administrator') < 0 && props.Roles.indexOf('Transmission SME') < 0, onClick: function (event) { event.preventDefault(); } }, "Update Ext DB ")))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: 'calc( 100% - 136px)' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_1___default.a, { cols: [
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'LocationKey', label: 'Key', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                    //{ key: 'Type', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'Meters', label: 'Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: 'Assets', label: 'Assets', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ], tableClass: "table table-hover", data: data, sortField: sortField, ascending: ascending, onSort: function (d) {
                    if (d.col == sortField)
                        setAscending(!ascending);
                    else {
                        setAscending(true);
                        setSortField(d.col);
                    }
                }, onClick: handleSelect, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "locationModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '75%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, "Add Substation"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: newLocation, Field: 'LocationKey', Feedback: 'A unique key of less than 50 characters is required.', Valid: valid, Setter: setNewLocation }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: newLocation, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: valid, Setter: setNewLocation }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: newLocation, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: valid, Setter: setNewLocation }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: newLocation, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: valid, Setter: setNewLocation })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: newLocation, Field: 'Latitude', Feedback: 'Latitude is a require numeric field.', Valid: valid, Setter: setNewLocation }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: newLocation, Field: 'Longitude', Feedback: 'Longitude is a require numeric field.', Valid: valid, Setter: setNewLocation }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_5__["default"], { Rows: 3, Record: newLocation, Field: 'Description', Valid: valid, Setter: setNewLocation })))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addNewLocation }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close"))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "extDBModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '75%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, "Substation External Database Fields"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_7__["default"], { ID: -1, Type: 'Location', Tab: "" })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close")))))));
};
/* harmony default export */ __webpack_exports__["default"] = (ByLocation);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvU2VhcmNoRmllbGRzLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0xvY2F0aW9uL0J5TG9jYXRpb24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLHdCQUF3QjtBQUN4QixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBRTVCO0lBQTBDLDZCQUFrTDtJQUE1Tjs7SUFnQkEsQ0FBQztJQWZHLDBCQUFNLEdBQU47UUFBQSxpQkFjQztRQWJHLE9BQU8sNkRBQUssU0FBUyxFQUFDLFlBQVk7WUFDOUIsbUVBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQVM7WUFDL0UsK0RBQU8sU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFDLEdBQUc7b0JBQy9HLElBQUksTUFBTSxHQUFNLDRDQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO3dCQUN0QixNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQVksQ0FBQzs7d0JBRW5ELE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFFcEMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFLO1lBQ3JMLDZEQUFLLFNBQVMsRUFBQyxrQkFBa0IsSUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBTyxDQUN0SSxDQUFDO0lBQ1gsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxDQWhCeUMsK0NBQWUsR0FnQnhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCTSxJQUFVLFlBQVksQ0FxQzVCO0FBckNELFdBQWlCLFlBQVk7SUFDWixxQkFBUSxHQUFHO1FBQ3BCLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDN0QsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUM5QyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQ2hELEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDNUQsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQ2hFLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtLQUN6RSxDQUFDO0lBRVcsb0JBQU8sR0FBRztRQUNuQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQzlDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDeEQsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUM1RCxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0tBQ2hFLENBQUM7SUFFVyx3QkFBVyxHQUFHO1FBQ3ZCLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUNyRSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDbkUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQzVELEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUN6RSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDNUQsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQ3hELEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDbkQsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0tBQzFFLENBQUM7SUFFVyxxQkFBUSxHQUFHO1FBQ3BCLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDOUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUNwRCxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQ2hELEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDaEQsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO1FBQzdELEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtLQUNoRSxDQUFDO0FBRU4sQ0FBQyxFQXJDZ0IsWUFBWSxLQUFaLFlBQVksUUFxQzVCO0FBRU0sSUFBVSxrQkFBa0IsQ0FLbEM7QUFMRCxXQUFpQixrQkFBa0I7SUFDbEIsMEJBQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDekQsMkJBQVEsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDekUsOEJBQVcsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUNwRiwyQkFBUSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUMzRSxDQUFDLEVBTGdCLGtCQUFrQixLQUFsQixrQkFBa0IsUUFLbEM7QUFFTSxJQUFVLHFCQUFxQixDQW1FckM7QUFuRUQsV0FBaUIscUJBQXFCO0lBQ2xDLFNBQWdCLE9BQU8sQ0FBQyxNQUFNO1FBQzFCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFDO1lBQ2YsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFJLElBQUksV0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUF2QixDQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyRSw2QkFBWSxDQUFDLEtBQUUsYUFBYSxFQUFFLElBQUksSUFBRzs7Z0JBRXJDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQztJQUNOLENBQUM7SUFQZSw2QkFBTyxVQU90QjtJQUVELFNBQWdCLFFBQVEsQ0FBQyxNQUFNO1FBQzNCLElBQU0sV0FBVyxHQUFHLGdGQUFnRjtZQUNoRywySUFBMkk7WUFDL0ksbUJBQW1CO1FBRW5CLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBQztZQUNsQixJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksWUFBWSxFQUFFO2dCQUM3QixJQUFJLElBQUksR0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDaEIsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsV0FBVyxHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRTthQUN2STtZQUVELElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBSSxJQUFJLFdBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBdkIsQ0FBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEUsNkJBQVksQ0FBQyxLQUFFLGFBQWEsRUFBRSxJQUFJLElBQUc7O2dCQUVyQyxPQUFPLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBRWYsQ0FBQztJQXZCZSw4QkFBUSxXQXVCdkI7SUFFRCxTQUFnQixRQUFRLENBQUMsTUFBTTtRQUUzQixJQUFNLFVBQVUsR0FBRyx5RUFBeUU7WUFDeEYseUNBQXlDO1lBQ3pDLG1CQUFtQjtRQUV2QixJQUFNLFVBQVUsR0FBRyw0Q0FBNEM7WUFDM0Qsa0JBQWtCO1FBRXRCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFDO1lBQ2YsSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLE9BQU8sRUFBRTtnQkFDeEIsSUFBSSxJQUFJLEdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztnQkFDaEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7b0JBQ2hCLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDekIsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUU7YUFDOUs7WUFDRCxJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxFQUFFO2dCQUN4QixJQUFJLElBQUksR0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDaEIsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBVSxHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRTthQUNsTDtZQUNELElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBSSxJQUFJLFdBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBdkIsQ0FBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEUsNkJBQVksQ0FBQyxLQUFFLGFBQWEsRUFBRSxJQUFJLElBQUc7O2dCQUVyQyxPQUFPLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUM7SUFDTixDQUFDO0lBL0JlLDhCQUFRLFdBK0J2QjtBQUNMLENBQUMsRUFuRWdCLHFCQUFxQixLQUFyQixxQkFBcUIsUUFtRXJDOzs7Ozs7Ozs7Ozs7O0FDeklEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLDJCQUEyQjtBQUMzQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsb0dBQW9HO0FBQ3BHLDhGQUE4RjtBQUM5Rix3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBQ2M7QUFDakI7QUFDa0I7QUFDUTtBQUNNO0FBRUY7QUFDVTtBQUNBO0FBQ3VDO0FBVTNHLElBQU0sVUFBVSxHQUE2QixVQUFDLEtBQUs7SUFDL0MsSUFBSSxPQUFPLEdBQUcsbUVBQVUsRUFBRSxDQUFDO0lBQ3JCLHNFQUF5RSxFQUF4RSxjQUFNLEVBQUUsaUJBQWdFLENBQUM7SUFDMUUsc0VBQXFELEVBQXBELFlBQUksRUFBRSxlQUE4QyxDQUFDO0lBRXRELG9GQUFrRixFQUFqRixtQkFBVyxFQUFFLHNCQUFvRSxDQUFDO0lBR25GLGlGQUFpRSxFQUFoRSxpQkFBUyxFQUFFLG9CQUFxRCxDQUFDO0lBQ2xFLHdKQUF3SSxFQUF2SSxzQkFBYyxFQUFFLHlCQUF1SCxDQUFDO0lBQ3pJLDBFQUFzRixFQUFyRixtQkFBVyxFQUFFLHNCQUF3RSxDQUFDO0lBRXZGLHdFQUF5RCxFQUF4RCxpQkFBUyxFQUFFLG9CQUE2QyxDQUFDO0lBRWhFLCtDQUFlLENBQUM7UUFDWixJQUFJLE1BQU0sR0FBRyxZQUFZLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBVTtZQUNuQixjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFvQixDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLHFCQUFjLENBQUMsT0FBTyxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQztRQUV4QyxPQUFPLFNBQVMsT0FBTztZQUNuQixJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSTtnQkFDcEIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLENBQUM7SUFDTCxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFHbkMsK0NBQWUsQ0FBQztRQUNaLGNBQWMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVQLCtDQUFlLENBQUM7UUFDWixJQUFJLE1BQU0sR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLE9BQU87WUFDSCxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSTtnQkFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsQ0FBQztJQUNMLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVQLFNBQVMsY0FBYztRQUNuQixPQUFPO1lBQ0gsRUFBRSxFQUFFLENBQUM7WUFDTCxXQUFXLEVBQUUsSUFBSTtZQUNqQixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJO1lBQ1gsV0FBVyxFQUFFLElBQUk7WUFDakIsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1NBQ2xCO0lBQ0wsQ0FBQztJQUdELFNBQVMsWUFBWTtRQUNqQixjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFMUIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUssUUFBUSxzREFBbUQ7WUFDbkUsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvRkFBcUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUM7WUFDcEgsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFTLG1CQUFtQjtRQUN4QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2hCLElBQUksRUFBRSxLQUFLO1lBQ1gsR0FBRyxFQUFLLFFBQVEsc0VBQW1FO1lBQ25GLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQztRQUVILFNBQVMsV0FBVyxDQUFDLElBQVk7WUFDN0IsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxTQUFTO2dCQUNwRyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtZQUN6QixPQUFPO2dCQUNILElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUNyRDtRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBc0M7WUFDL0MsSUFBSSxPQUFPLEdBQUcsOENBQVMsQ0FBRSwyRUFBWSxDQUFDLFFBQXNDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBSSxJQUFJLFFBQzlGLFdBQUUsS0FBSyxFQUFFLFNBQU0sSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQUssSUFBSSxDQUFDLFNBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNoSixHQUZpRyxDQUVqRyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixpQkFBaUIsQ0FBQyxPQUFPLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsU0FBUyxjQUFjO1FBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsTUFBTTtZQUNaLEdBQUcsRUFBSyxRQUFRLDZCQUEwQjtZQUMxQyxXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUNqQyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQztRQUNFLDZCQUE2QjtJQUVyQyxDQUFDO0lBRUQsU0FBUyxZQUFZLENBQUMsSUFBSTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxjQUFjLEVBQUUsTUFBTSxFQUFFLDRCQUE0QixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN4SCxDQUFDO0lBRUQsU0FBUyxLQUFLLENBQUMsS0FBOEI7UUFDekMsSUFBSSxLQUFLLElBQUksYUFBYTtZQUN0QixPQUFPLFdBQVcsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO2FBQ3RDLElBQUksS0FBSyxJQUFJLE1BQU07WUFDcEIsT0FBTyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO2FBQ2hHLElBQUksS0FBSyxJQUFJLE9BQU87WUFDckIsT0FBTyxXQUFXLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7YUFDbkUsSUFBSSxLQUFLLElBQUksV0FBVztZQUN6QixPQUFPLFdBQVcsQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQzthQUMxRSxJQUFJLEtBQUssSUFBSSxVQUFVO1lBQ3hCLE9BQU8sV0FBVyxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUkscUVBQWUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pGLElBQUksS0FBSyxJQUFJLFdBQVc7WUFDekIsT0FBTyxXQUFXLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxxRUFBZSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDM0YsSUFBSSxLQUFLLElBQUksYUFBYTtZQUMzQixPQUFPLElBQUksQ0FBQztRQUNoQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBR0QsT0FBTyxDQUNILDZEQUFLLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtRQUV6QyxvREFBQyx5RUFBUyxJQUFXLFdBQVcsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLFVBQUMsSUFBSSxJQUFLLGdCQUFTLENBQUMsSUFBSSxDQUFDLEVBQWYsQ0FBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLGlGQUFrQixDQUFDLFFBQW1DLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUM1TSxXQUFXLEVBQUUsV0FBVyxJQUFJLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksRUFDL0ksT0FBTyxFQUFFLFVBQUMsVUFBVSxFQUFFLEtBQUs7Z0JBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO29CQUN6RSxPQUFPLGNBQVEsQ0FBQyxDQUFDO2dCQUVyQixNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDWixJQUFJLEVBQUUsS0FBSztvQkFDWCxHQUFHLEVBQUssUUFBUSw0QkFBdUIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFPO29CQUM1RCxXQUFXLEVBQUUsaUNBQWlDO29CQUM5QyxRQUFRLEVBQUUsTUFBTTtvQkFDaEIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsS0FBSyxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDO2dCQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLGlCQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFJLElBQUksUUFBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDLEVBQS9FLENBQStFLENBQUM7Z0JBQ2pHLE9BQU8sY0FBUSxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJO29CQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEYsQ0FBQztZQUlMLDREQUFJLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFO2dCQUM5RCxrRUFBVSxTQUFTLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtvQkFDbkUsZ0VBQVEsU0FBUyxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGVBQW1CO29CQUMxRTt3QkFDSSw2REFBSyxTQUFTLEVBQUMsWUFBWTs0QkFDdkIsZ0VBQVEsU0FBUyxFQUFDLGlCQUFpQixpQkFBYSxPQUFPLGlCQUFhLGdCQUFnQixFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQUMsS0FBSyxJQUFPLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBQyxDQUFDLHFCQUF5QixDQUMzUDt3QkFDTiw2REFBSyxTQUFTLEVBQUMsWUFBWTs0QkFDbkIsZ0VBQVEsU0FBUyxFQUFDLGlCQUFpQixpQkFBYSxPQUFPLGlCQUFhLGFBQWEsRUFBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQUssSUFBTyxLQUFLLENBQUMsY0FBYyxFQUFFLEVBQUMsQ0FBQyxxQkFBeUIsQ0FDNVAsQ0FDSCxDQUNBLENBQ1YsQ0FDTztRQUVaLDZEQUFLLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixFQUFFO1lBQ3hELG9EQUFDLGdFQUFLLElBQ0YsSUFBSSxFQUFFO29CQUNGLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQzNGLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQy9GLDRGQUE0RjtvQkFDNUYsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDN0YsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDN0YsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7aUJBQ3ZHLEVBQ0QsVUFBVSxFQUFDLG1CQUFtQixFQUM5QixJQUFJLEVBQUUsSUFBSSxFQUNWLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLE1BQU0sRUFBRSxVQUFDLENBQUM7b0JBQ04sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVM7d0JBQ2xCLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUN4Qjt3QkFDRCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25CLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3ZCO2dCQUNMLENBQUMsRUFDRCxPQUFPLEVBQUUsWUFBWSxFQUNyQixVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzFGLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUN6RyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQ3hGLFFBQVEsRUFBRSxVQUFDLElBQUksSUFBSyxZQUFLLEVBQUwsQ0FBSyxHQUMzQixDQUNBO1FBRU4sNkRBQUssU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsZUFBZTtZQUNyQyw2REFBSyxTQUFTLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDbkUsNkRBQUssU0FBUyxFQUFDLGVBQWU7b0JBQzFCLDZEQUFLLFNBQVMsRUFBQyxjQUFjO3dCQUN6Qiw0REFBSSxTQUFTLEVBQUMsYUFBYSxxQkFBb0I7d0JBQy9DLGdFQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLE9BQU8sa0JBQWMsT0FBTyxhQUFpQixDQUMzRTtvQkFDTiw2REFBSyxTQUFTLEVBQUMsWUFBWTt3QkFDdkIsNkRBQUssU0FBUyxFQUFDLEtBQUs7NEJBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dDQUNoQixvREFBQyxtRUFBUyxJQUFtQixNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLHNEQUFzRCxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGNBQWMsR0FBSTtnQ0FDbEwsb0RBQUMsbUVBQVMsSUFBbUIsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSx3REFBd0QsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxjQUFjLEdBQUk7Z0NBQzdLLG9EQUFDLG1FQUFTLElBQW1CLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsNENBQTRDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsY0FBYyxHQUFJO2dDQUN0SyxvREFBQyxtRUFBUyxJQUFtQixNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLHlDQUF5QyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGNBQWMsR0FBSSxDQUM3Sjs0QkFDTiw2REFBSyxTQUFTLEVBQUMsS0FBSztnQ0FDaEIsb0RBQUMsbUVBQVMsSUFBbUIsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxzQ0FBc0MsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxjQUFjLEdBQUk7Z0NBQy9KLG9EQUFDLG1FQUFTLElBQW1CLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsdUNBQXVDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsY0FBYyxHQUFJO2dDQUNqSyxvREFBQyxzRUFBWSxJQUFtQixJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxjQUFjLEdBQUksQ0FDMUgsQ0FDSixDQUVKO29CQUNOLDZEQUFLLFNBQVMsRUFBQyxjQUFjO3dCQUN6QixnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsa0JBQWMsT0FBTyxFQUFDLE9BQU8sRUFBRSxjQUFjLFdBQWU7d0JBQzdHLGdFQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLGdCQUFnQixrQkFBYyxPQUFPLFlBQWUsQ0FDbEYsQ0FFSixDQUNKLENBQ0o7UUFFTiw2REFBSyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxZQUFZO1lBQ2xDLDZEQUFLLFNBQVMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2dCQUNuRSw2REFBSyxTQUFTLEVBQUMsZUFBZTtvQkFDMUIsNkRBQUssU0FBUyxFQUFDLGNBQWM7d0JBQ3pCLDREQUFJLFNBQVMsRUFBQyxhQUFhLDBDQUF5Qzt3QkFDcEUsZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsT0FBTyxrQkFBYyxPQUFPLGFBQWlCLENBQzNFO29CQUNOLDZEQUFLLFNBQVMsRUFBQyxZQUFZO3dCQUN2QixvREFBQywwRUFBZ0IsSUFBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFDLFVBQVUsRUFBQyxHQUFHLEVBQUcsRUFBRSxHQUFFLENBQ2xEO29CQUNOLDZEQUFLLFNBQVMsRUFBQyxjQUFjO3dCQUN6QixnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxnQkFBZ0Isa0JBQWMsT0FBTyxZQUFlLENBQ2xGLENBRUosQ0FDSixDQUNKLENBR0osQ0FDVDtBQUVMLENBQUM7QUFFYyx5RUFBVSxFQUFDIiwiZmlsZSI6IkJ5TG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgRm9ybUlucHV0LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSW5wdXQ8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IFQsIEZpZWxkOiBrZXlvZiAoVCksIFNldHRlcjogKHJlY29yZDogVCkgPT4gdm9pZCwgVmFsaWQ6IChmaWVsZDoga2V5b2YgKFQpKSA9PiBib29sZWFuLCBMYWJlbD86IHN0cmluZywgRmVlZGJhY2s/OiBzdHJpbmcsIERpc2FibGVkPzogYm9vbGVhbiB9LCB7fSwge30+e1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPnt0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXsodGhpcy5wcm9wcy5WYWxpZCh0aGlzLnByb3BzLkZpZWxkKSA/IFwiZm9ybS1jb250cm9sXCIgOiBcImZvcm0tY29udHJvbCBpcy1pbnZhbGlkXCIpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZDogVCA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LnZhbHVlIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9PSBudWxsID8gJycgOiB0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXS50b1N0cmluZygpfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkIH0gLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ludmFsaWQtZmVlZGJhY2snPnt0aGlzLnByb3BzLkZlZWRiYWNrID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkICsgJyBpcyBhIHJlcXVpcmVkIGZpZWxkLicgOiB0aGlzLnByb3BzLkZlZWRiYWNrfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgU2VhcmNoRmllbGRzLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIxLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwNC8xNS8yMDIxIC0gQy4gTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuaW1wb3J0IHtTeXN0ZW1DZW50ZXIsIE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBTZWFyY2hGaWVsZHMge1xyXG4gICAgZXhwb3J0IGNvbnN0IEN1c3RvbWVyID0gW1xyXG4gICAgICAgIHsgbGFiZWw6ICdBY2NvdW50IE5hbWUnLCBrZXk6ICdDdXN0b21lcktleScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ05hbWUnLCBrZXk6ICdOYW1lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnUGhvbmUnLCBrZXk6ICdQaG9uZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0Rlc2NyaXB0aW9uJywga2V5OiAnRGVzY3JpcHRpb24nLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdQUVZpZXcgU2l0ZSBOYW1lJywga2V5OiAnUFFWaWV3U2l0ZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBBc3NpZ25lZCBNZXRlcnMnLCBrZXk6ICdNZXRlcnMnLCB0eXBlOiAnaW50ZWdlcicgfSxcclxuICAgIF07XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IENvbXBhbnkgPSBbXHJcbiAgICAgICAgeyBsYWJlbDogJ05hbWUnLCBrZXk6ICdOYW1lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnQ29tcGFueUlEJywga2V5OiAnQ29tcGFueUlEJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnRGVzY3JpcHRpb24nLCBrZXk6ICdEZXNjcmlwdGlvbicsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0NvbXBhbnkgVHlwZScsIGtleTogJ0NvbXBhbnlUeXBlSUQnLCB0eXBlOiAnZW51bScgfSxcclxuICAgIF07XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IFVzZXJBY2NvdW50ID0gW1xyXG4gICAgICAgIHsgbGFiZWw6ICdGaXJzdCBOYW1lJywga2V5OiAnVXNlckFjY291bnQuRmlyc3ROYW1lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnTGFzdCBOYW1lJywga2V5OiAnVXNlckFjY291bnQuTGFzdE5hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdQaG9uZScsIGtleTogJ1VzZXJBY2NvdW50LlBob25lJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnTW9iaWxlIFBob25lJywga2V5OiAnVXNlckFjY291bnQuTW9iaWxlUGhvbmUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdFbWFpbCcsIGtleTogJ1VzZXJBY2NvdW50LkVtYWlsJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnVFNDJywga2V5OiAnVXNlckFjY291bnQuVFNDJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnUm9sZScsIGtleTogJ1JvbGUuTmFtZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ1NlY3VyaXR5IFJvbGUnLCBrZXk6ICdBcHBsaWNhdGlvblJvbGUuTmFtZScsIHR5cGU6ICdzdHJpbmcnIH1cclxuICAgIF07XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IExvY2F0aW9uID0gW1xyXG4gICAgICAgIHsgbGFiZWw6ICdOYW1lJywga2V5OiAnTmFtZScsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ0tleScsIGtleTogJ0xvY2F0aW9uS2V5JywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGxhYmVsOiAnQXNzZXQnLCBrZXk6ICdBc3NldCcsIHR5cGU6ICdzdHJpbmcnIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ01ldGVyJywga2V5OiAnTWV0ZXInLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsgbGFiZWw6ICdOdW1iZXIgb2YgQXNzZXRzJywga2V5OiAnQXNzZXRzJywgdHlwZTogJ2ludGVnZXInIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBNZXRlcnMnLCBrZXk6ICdNZXRlcnMnLCB0eXBlOiAnaW50ZWdlcicgfSxcclxuICAgIF07XHJcblxyXG59XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIERlZmF1bHRTZWFyY2hGaWVsZCB7XHJcbiAgICBleHBvcnQgY29uc3QgQ29tcGFueSA9IHsgbGFiZWw6ICdOYW1lJywga2V5OiAnTmFtZScsIHR5cGU6ICdzdHJpbmcnIH07XHJcbiAgICBleHBvcnQgY29uc3QgQ3VzdG9tZXIgPSB7IGxhYmVsOiAnQWNjb3VudCBOYW1lJywga2V5OiAnQ3VzdG9tZXJLZXknLCB0eXBlOiAnc3RyaW5nJyB9O1xyXG4gICAgZXhwb3J0IGNvbnN0IFVzZXJBY2NvdW50ID0geyBsYWJlbDogJ0ZpcnN0IE5hbWUnLCBrZXk6ICdVc2VyQWNjb3VudC5GaXJzdE5hbWUnLCB0eXBlOiAnc3RyaW5nJyB9O1xyXG4gICAgZXhwb3J0IGNvbnN0IExvY2F0aW9uID0geyBsYWJlbDogJ05hbWUnLCBrZXk6ICdOYW1lJywgdHlwZTogJ3N0cmluZycgfTtcclxufVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2Zvcm1TZWFyY2hGaWVsZHMge1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvbXBhbnkoc2VhcmNoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlYXJjaC5tYXAocyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChTZWFyY2hGaWVsZHMuQ29tcGFueS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmtleSA9PSBzLkZpZWxkTmFtZSkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5zLCBpc1Bpdm90Q29sdW1uOiB0cnVlIH07XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEN1c3RvbWVyKHNlYXJjaCkge1xyXG4gICAgICAgIGNvbnN0IHBxVmlld1F1ZXJ5ID0gJyhTRUxFQ1QgQ3VzdG9tZXIuSUQgRlJPTSBQUVZpZXdTaXRlIExFRlQgSk9JTiBbc3lzdGVtQ2VudGVyLkN1c3RvbWVyQWNjZXNzXSBPTicgK1xyXG4gICAgICAgICAgICAnW3N5c3RlbUNlbnRlci5DdXN0b21lckFjY2Vzc10uUFFWaWV3U2l0ZUlEID0gUFFWaWV3U2l0ZS5JRCBMRUZUIEpPSU4gQ3VzdG9tZXIgQyBPTiBDLklEID0gW3N5c3RlbUNlbnRlci5DdXN0b21lckFjY2Vzc10uQ3VzdG9tZXJJRCBXSEVSRSAnICsgXHJcbiAgICAgICAgJyBQUVZpZXdTaXRlLk5hbWUgJ1xyXG5cclxuICAgICAgICBsZXQgYWZ2ID0gc2VhcmNoLm1hcChzID0+IHtcclxuICAgICAgICAgICAgaWYgKHMuRmllbGROYW1lID09ICdQUVZpZXdTaXRlJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHQ6IHN0cmluZyA9IHMuU2VhcmNoVGV4dDtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAnJSc7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LnJlcGxhY2UoJyonLCAnJScpO1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiJ1wiICsgdGV4dCArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgRmllbGROYW1lOiAnSUQnLCBTZWFyY2hUZXh0OiBwcVZpZXdRdWVyeSArIHMuT3BlcmF0b3IgKyB0ZXh0ICsgJyApJywgT3BlcmF0b3I6ICdJTicsIFR5cGU6ICdudW1iZXInLCBpc1Bpdm90Q29sdW1uOiBmYWxzZSB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoU2VhcmNoRmllbGRzLkN1c3RvbWVyLmZpbmRJbmRleChpdGVtID0+IGl0ZW0ua2V5ID09IHMuRmllbGROYW1lKSA9PSAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IC4uLnMsIGlzUGl2b3RDb2x1bW46IHRydWUgfTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhZnY7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBMb2NhdGlvbihzZWFyY2gpIHtcclxuXHJcbiAgICAgICAgY29uc3QgYXNzZXRRdWVyeSA9ICcoU0VMRUNUIEFzc2V0TG9jYXRpb24uTG9jYXRpb25JRCBGUk9NIEFzc2V0IExFRlQgSk9JTiBBc3NldExvY2F0aW9uIE9OICcgK1xyXG4gICAgICAgICAgICAnQXNzZXRMb2NhdGlvbi5Bc3NldElEID0gQXNzZXQuSUQgV0hFUkUgJyArXHJcbiAgICAgICAgICAgICcgQXNzZXQuQXNzZXROYW1lICdcclxuXHJcbiAgICAgICAgY29uc3QgbWV0ZXJRdWVyeSA9ICcoU0VMRUNUIE1ldGVyLkxvY2F0aW9uSUQgRlJPTSBNZXRlciBXSEVSRSAnICtcclxuICAgICAgICAgICAgJyBNZXRlci5Bc3NldEtleSAnXHJcblxyXG4gICAgICAgIHJldHVybiBzZWFyY2gubWFwKHMgPT4ge1xyXG4gICAgICAgICAgICBpZiAocy5GaWVsZE5hbWUgPT0gJ01ldGVyJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleHQ6IHN0cmluZyA9IHMuU2VhcmNoVGV4dDtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSAnJSc7XHJcbiAgICAgICAgICAgICAgICB0ZXh0LnJlcGxhY2UoJyonLCAnJScpO1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IFwiICdcIiArIHRleHQgKyBcIidcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IEZpZWxkTmFtZTogJ0lEJywgU2VhcmNoVGV4dDogbWV0ZXJRdWVyeSArIHMuT3BlcmF0b3IgKyB0ZXh0ICsgJyBvciBNZXRlci5OYW1lICcgKyBzLk9wZXJhdG9yICsgdGV4dCArICcgKScsIE9wZXJhdG9yOiAnSU4nLCBUeXBlOiAnbnVtYmVyJywgaXNQaXZvdENvbHVtbjogZmFsc2UgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzLkZpZWxkTmFtZSA9PSAnQXNzZXQnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gcy5TZWFyY2hUZXh0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICclJztcclxuICAgICAgICAgICAgICAgIHRleHQucmVwbGFjZSgnKicsICclJyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gXCIgJ1wiICsgdGV4dCArIFwiJ1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgRmllbGROYW1lOiAnSUQnLCBTZWFyY2hUZXh0OiBhc3NldFF1ZXJ5ICsgcy5PcGVyYXRvciArIHRleHQgKyAnIG9yIEFzc2V0LkFzc2V0S2V5ICcgKyBzLk9wZXJhdG9yICsgdGV4dCArICcgKScsIE9wZXJhdG9yOiAnSU4nLCBUeXBlOiAnbnVtYmVyJywgaXNQaXZvdENvbHVtbjogZmFsc2UgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChTZWFyY2hGaWVsZHMuTG9jYXRpb24uZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5rZXkgPT0gcy5GaWVsZE5hbWUpID09IC0xKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucywgaXNQaXZvdENvbHVtbjogdHJ1ZSB9O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFN5c3RlbUNlbnRlci50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoICB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyAgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSBcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDgvMjIvMjAxOSAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFRhYmxlIGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtdGFibGUnXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5pbXBvcnQgRm9ybVRleHRBcmVhIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybVRleHRBcmVhJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgQXNzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xyXG5pbXBvcnQgRXh0ZXJuYWxEQlVwZGF0ZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0V4dGVybmFsREJVcGRhdGUnO1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIsIFNlYXJjaCB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5pbXBvcnQgeyBEZWZhdWx0U2VhcmNoRmllbGQsIFNlYXJjaEZpZWxkcywgVHJhbnNmb3JtU2VhcmNoRmllbGRzIH0gZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9TZWFyY2hGaWVsZHMnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcblxyXG5pbnRlcmZhY2UgTG9jYXRpb24ge1xyXG4gICAgSUQ6IG51bWJlciwgTG9jYXRpb25LZXk6IHN0cmluZywgTmFtZTogc3RyaW5nLCBBc3NldHM6IG51bWJlciwgTWV0ZXJzOiBudW1iZXJcclxufVxyXG5cclxuXHJcbmNvbnN0IEJ5TG9jYXRpb246IFN5c3RlbUNlbnRlci5CeUNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgbGV0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XHJcbiAgICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U2VhcmNoLklGaWx0ZXI8TG9jYXRpb24+Pj4oW10pO1xyXG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8TG9jYXRpb24+PihbXSk7XHJcblxyXG4gICAgY29uc3QgW25ld0xvY2F0aW9uLCBzZXROZXdMb2NhdGlvbl0gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLkxvY2F0aW9uPihnZXROZXdMb2NhdGlvbigpKTtcclxuXHJcblxyXG4gICAgY29uc3QgW3NvcnRGaWVsZCwgc2V0U29ydEZpZWxkXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJ0xvY2F0aW9uS2V5Jyk7XHJcbiAgICBjb25zdCBbZmlsdGVyYWJsZUxpc3QsIHNldEZpbHRlcmFibGVMaXN0XSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFNlYXJjaC5JRmllbGQ8TG9jYXRpb24+Pj4oU2VhcmNoRmllbGRzLkxvY2F0aW9uIGFzIFNlYXJjaC5JRmllbGQ8TG9jYXRpb24+W10pO1xyXG4gICAgY29uc3QgW3NlYXJjaFN0YXRlLCBzZXRTZWFyY2hTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZTwoJ0lkbGUnIHwgJ0xvYWRpbmcnIHwgJ0Vycm9yJyk+KCdJZGxlJyk7XHJcblxyXG4gICAgY29uc3QgW2FzY2VuZGluZywgc2V0QXNjZW5kaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IGdldExvY2F0aW9ucygpO1xyXG4gICAgICAgIGhhbmRsZS5kb25lKChkdDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFNlYXJjaFN0YXRlKCdJZGxlJyk7XHJcbiAgICAgICAgICAgIHNldERhdGEoSlNPTi5wYXJzZShkdCkgYXMgQXJyYXk8TG9jYXRpb24+KTtcclxuICAgICAgICB9KS5mYWlsKChkKSA9PiBzZXRTZWFyY2hTdGF0ZSgnRXJyb3InKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbc29ydEZpZWxkLCBhc2NlbmRpbmcsIHNlYXJjaF0pO1xyXG5cclxuICAgXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHNldE5ld0xvY2F0aW9uKGdldE5ld0xvY2F0aW9uKCkpO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IGdldEFkZGl0aW9uYWxGaWVsZHMoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPSBudWxsKSBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TmV3TG9jYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgSUQ6IDAsXHJcbiAgICAgICAgICAgIExvY2F0aW9uS2V5OiBudWxsLFxyXG4gICAgICAgICAgICBOYW1lOiBudWxsLFxyXG4gICAgICAgICAgICBBbGlhczogbnVsbCxcclxuICAgICAgICAgICAgRGVzY3JpcHRpb246IG51bGwsXHJcbiAgICAgICAgICAgIExhdGl0dWRlOiBudWxsLFxyXG4gICAgICAgICAgICBMb25naXR1ZGU6IG51bGwsXHJcbiAgICAgICAgICAgIFNob3J0TmFtZTogbnVsbFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TG9jYXRpb25zKCk6IEpRdWVyeS5qcVhIUjxzdHJpbmc+IHtcclxuICAgICAgICBzZXRTZWFyY2hTdGF0ZSgnTG9hZGluZycpO1xyXG5cclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL29wZW5YREEvTG9jYXRpb24vU2VhcmNoYWJsZUxpc3RJbmNsdWRpbmdNZXRlcmAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBTZWFyY2hlczogVHJhbnNmb3JtU2VhcmNoRmllbGRzLkxvY2F0aW9uKHNlYXJjaCksIE9yZGVyQnk6IHNvcnRGaWVsZCwgQXNjZW5kaW5nOiBhc2NlbmRpbmcgfSksXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBZGRpdGlvbmFsRmllbGRzKCk6IEpRdWVyeS5qcVhIUjxBcnJheTxTeXN0ZW1DZW50ZXIuQWRkaXRpb25hbEZpZWxkPj4ge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQWRkaXRpb25hbEZpZWxkL1BhcmVudFRhYmxlL0xvY2F0aW9uL0ZpZWxkTmFtZS8wYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIENvbnZlcnRUeXBlKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdpbnRlZ2VyJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2RhdGV0aW1lJyB8fCB0eXBlID09ICdib29sZWFuJylcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IHR5cGUgfVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2VudW0nLCBlbnVtOiBbeyBMYWJlbDogdHlwZSwgVmFsdWU6IHR5cGUgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFuZGxlLmRvbmUoKGQ6IEFycmF5PFN5c3RlbUNlbnRlci5BZGRpdGlvbmFsRmllbGQ+KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBvcmRlcmVkID0gXy5vcmRlckJ5KChTZWFyY2hGaWVsZHMuTG9jYXRpb24gYXMgU2VhcmNoLklGaWVsZDxMb2NhdGlvbj5bXSkuY29uY2F0KGQubWFwKGl0ZW0gPT4gKFxyXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogYFtBRiR7aXRlbS5FeHRlcm5hbERCICE9IHVuZGVmaW5lZCA/IFwiIFwiICsgaXRlbS5FeHRlcm5hbERCIDogJyd9XSAke2l0ZW0uRmllbGROYW1lfWAsIGtleTogaXRlbS5GaWVsZE5hbWUsIC4uLkNvbnZlcnRUeXBlKGl0ZW0uVHlwZSkgfSBhcyBTZWFyY2guSUZpZWxkPExvY2F0aW9uPlxyXG4gICAgICAgICAgICApKSksIFsnbGFiZWwnXSwgW1wiYXNjXCJdKTtcclxuICAgICAgICAgICAgc2V0RmlsdGVyYWJsZUxpc3Qob3JkZXJlZClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGROZXdMb2NhdGlvbigpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Mb2NhdGlvbi9BZGRgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG5ld0xvY2F0aW9uKSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vLmRvbmUoKGRhdGEpID0+IGdldERhdGEoKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdChpdGVtKSB7XHJcbiAgICAgICAgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJz9uYW1lPUxvY2F0aW9uJkxvY2F0aW9uSUQ9JyArIGl0ZW0ucm93LklELCBzdGF0ZToge30gfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YoT3BlblhEQS5Mb2NhdGlvbikpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ0xvY2F0aW9uS2V5JylcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0xvY2F0aW9uLkxvY2F0aW9uS2V5ICE9IG51bGw7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3TG9jYXRpb24uTmFtZSAhPSBudWxsICYmIG5ld0xvY2F0aW9uLk5hbWUubGVuZ3RoID4gMCAmJiBuZXdMb2NhdGlvbi5OYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0FsaWFzJylcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0xvY2F0aW9uLkFsaWFzID09IG51bGwgfHwgbmV3TG9jYXRpb24uQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0xvY2F0aW9uLlNob3J0TmFtZSA9PSBudWxsIHx8IG5ld0xvY2F0aW9uLlNob3J0TmFtZS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xhdGl0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0xvY2F0aW9uLkxhdGl0dWRlICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihuZXdMb2NhdGlvbi5MYXRpdHVkZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xvbmdpdHVkZScpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdMb2NhdGlvbi5Mb25naXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKG5ld0xvY2F0aW9uLkxvbmdpdHVkZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH19PlxyXG5cclxuICAgICAgICAgICAgPFNlYXJjaEJhcjxMb2NhdGlvbj4gQ29sbHVtbkxpc3Q9e2ZpbHRlcmFibGVMaXN0fSBTZXRGaWx0ZXI9eyhmbGRzKSA9PiBzZXRTZWFyY2goZmxkcyl9IERpcmVjdGlvbj17J2xlZnQnfSBkZWZhdWx0Q29sbHVtbj17RGVmYXVsdFNlYXJjaEZpZWxkLkxvY2F0aW9uIGFzIFNlYXJjaC5JRmllbGQ8TG9jYXRpb24+fSBXaWR0aD17JzUwJSd9IExhYmVsPXsnU2VhcmNoJ31cclxuICAgICAgICAgICAgICAgIFNob3dMb2FkaW5nPXtzZWFyY2hTdGF0ZSA9PSAnTG9hZGluZyd9IFJlc3VsdE5vdGU9e3NlYXJjaFN0YXRlID09ICdFcnJvcicgPyAnQ291bGQgbm90IGNvbXBsZXRlIFNlYXJjaCcgOiAnRm91bmQgJyArIGRhdGEubGVuZ3RoICsgJyBMb2NhdGlvbnMnfVxyXG4gICAgICAgICAgICAgICAgR2V0RW51bT17KHNldE9wdGlvbnMsIGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhbmRsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkLnR5cGUgIT0gJ2VudW0nIHx8IGZpZWxkLmVudW0gPT0gdW5kZWZpbmVkIHx8IGZpZWxkLmVudW0ubGVuZ3RoICE9IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKSA9PiB7IH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZSA9ICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1ZhbHVlTGlzdC9Hcm91cC8ke2ZpZWxkLmVudW1bMF0uVmFsdWV9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmRvbmUoZCA9PiBzZXRPcHRpb25zKGQubWFwKGl0ZW0gPT4gKHsgVmFsdWU6IGl0ZW0uVmFsdWUudG9TdHJpbmcoKSwgTGFiZWw6IGl0ZW0uVGV4dCB9KSkpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoKSA9PiB7IGlmIChoYW5kbGUgIT0gbnVsbCAmJiBoYW5kbGUuYWJvcnQgPT0gbnVsbCkgaGFuZGxlLmFib3J0KCk7IH1cclxuICAgICAgICAgICAgICAgIH19XHJcblxyXG4gICAgICAgICAgICA+XHJcbiAgIFxyXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIiBzdHlsZT17eyB3aWR0aDogJzIwJScsIHBhZGRpbmdSaWdodDogMTAgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPVwiYm9yZGVyXCIgc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnLCBoZWlnaHQ6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT1cInctYXV0b1wiIHN0eWxlPXt7IGZvbnRTaXplOiAnbGFyZ2UnIH19PkFjdGlvbnM6PC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PVwiI2xvY2F0aW9uTW9kYWxcIiBoaWRkZW49e3Byb3BzLlJvbGVzLmluZGV4T2YoJ0FkbWluaXN0cmF0b3InKSA8IDAgJiYgcHJvcHMuUm9sZXMuaW5kZXhPZignVHJhbnNtaXNzaW9uIFNNRScpIDwgMH0gb25DbGljaz17KGV2ZW50KSA9PiB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCkgfX0+QWRkIFN1YnN0YXRpb248L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD1cIiNleHREQk1vZGFsXCIgaGlkZGVuPXtwcm9wcy5Sb2xlcy5pbmRleE9mKCdBZG1pbmlzdHJhdG9yJykgPCAwICYmIHByb3BzLlJvbGVzLmluZGV4T2YoJ1RyYW5zbWlzc2lvbiBTTUUnKSA8IDB9IG9uQ2xpY2s9eyhldmVudCkgPT4geyBldmVudC5wcmV2ZW50RGVmYXVsdCgpIH19PlVwZGF0ZSBFeHQgREIgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvU2VhcmNoQmFyPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICdjYWxjKCAxMDAlIC0gMTM2cHgpJyB9fT5cclxuICAgICAgICAgICAgICAgIDxUYWJsZTxMb2NhdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScsIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTG9jYXRpb25LZXknLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMzAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzMwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3sga2V5OiAnVHlwZScsIGxhYmVsOiAnVHlwZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01ldGVycycsIGxhYmVsOiAnTWV0ZXJzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRzJywgbGFiZWw6ICdBc3NldHMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlQ2xhc3M9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cclxuICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZH1cclxuICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cclxuICAgICAgICAgICAgICAgICAgICBvblNvcnQ9eyhkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkKGQuY29sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICB0Ym9keVN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93WTogJ3Njcm9sbCcsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzAwLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgcm93U3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KGl0ZW0pID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgaWQ9XCJsb2NhdGlvbk1vZGFsXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIHdpZHRoOiAnNzUlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPkFkZCBTdWJzdGF0aW9uPC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e25ld0xvY2F0aW9ufSBGaWVsZD17J0xvY2F0aW9uS2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3NldE5ld0xvY2F0aW9ufSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17bmV3TG9jYXRpb259IEZpZWxkPXsnTmFtZSd9IEZlZWRiYWNrPXsnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycyBhbmQgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3NldE5ld0xvY2F0aW9ufSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17bmV3TG9jYXRpb259IEZpZWxkPXsnU2hvcnROYW1lJ30gRmVlZGJhY2s9eydTaG9ydE5hbWUgbXVzdCBiZSBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycy4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17c2V0TmV3TG9jYXRpb259IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXtuZXdMb2NhdGlvbn0gRmllbGQ9eydBbGlhcyd9IEZlZWRiYWNrPXsnQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3NldE5ld0xvY2F0aW9ufSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXtuZXdMb2NhdGlvbn0gRmllbGQ9eydMYXRpdHVkZSd9IEZlZWRiYWNrPXsnTGF0aXR1ZGUgaXMgYSByZXF1aXJlIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3NldE5ld0xvY2F0aW9ufSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17bmV3TG9jYXRpb259IEZpZWxkPXsnTG9uZ2l0dWRlJ30gRmVlZGJhY2s9eydMb25naXR1ZGUgaXMgYSByZXF1aXJlIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3NldE5ld0xvY2F0aW9ufSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTG9jYXRpb24+IFJvd3M9ezN9IFJlY29yZD17bmV3TG9jYXRpb259IEZpZWxkPXsnRGVzY3JpcHRpb24nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17c2V0TmV3TG9jYXRpb259IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXthZGROZXdMb2NhdGlvbn0+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cImV4dERCTW9kYWxcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDAlJywgd2lkdGg6ICc3NSUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+U3Vic3RhdGlvbiBFeHRlcm5hbCBEYXRhYmFzZSBGaWVsZHM8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEV4dGVybmFsREJVcGRhdGUgSUQ9ey0xfSBUeXBlPSdMb2NhdGlvbicgVGFiID0gXCJcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnlMb2NhdGlvbjtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==