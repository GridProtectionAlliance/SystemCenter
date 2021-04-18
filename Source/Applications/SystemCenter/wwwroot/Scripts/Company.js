(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Company"],{

/***/ "./TSX/SystemCenter/Company/Company.tsx":
/*!**********************************************!*\
  !*** ./TSX/SystemCenter/Company/Company.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Company; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommonComponents/NoteWindow */ "./TSX/SystemCenter/CommonComponents/NoteWindow.tsx");
/* harmony import */ var _CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/AdditionalFieldsWindow */ "./TSX/SystemCenter/CommonComponents/AdditionalFieldsWindow.tsx");
/* harmony import */ var _CompanyInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CompanyInfo */ "./TSX/SystemCenter/Company/CompanyInfo.tsx");
/* harmony import */ var _CompanyMeter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CompanyMeter */ "./TSX/SystemCenter/Company/CompanyMeter.tsx");
//******************************************************************************************************
//  Company.tsx - Gbtc
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





function Company(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), company = _a[0], setCompany = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getTab), 2), tab = _b[0], setTab = _b[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var promise = getCompany();
        promise.done(function (data) { return setCompany(data); });
        return function () {
            if (promise.abort != undefined)
                promise.abort();
        };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        sessionStorage.setItem('Company.Tab', JSON.stringify(tab));
    }, [tab]);
    function getTab() {
        if (sessionStorage.hasOwnProperty('Company.Tab'))
            return JSON.parse(sessionStorage.getItem('Company.Tab'));
        else
            return 'companyInfo';
    }
    function getCompany() {
        return $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/Company/One/" + props.CompanyID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }
    function deleteMeter() {
        var response = confirm("This will delete the Company Permanently");
        if (!response)
            return;
        return $.ajax({
            type: "DELETE",
            url: homePath + "api/SystemCenter/Company/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(company),
            dataType: 'json',
            cache: true,
            async: true
        });
    }
    if (company == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, company != null ? company.Name : '')),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", hidden: company == null, onClick: function () { return deleteMeter().done(function () { return window.location.href = homePath + 'index.cshtml?name=PCompanies'; }); } }, "Delete Company (Permanent)"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "companyInfo" ? " active" : ""), onClick: function () { return setTab('companyInfo'); }, "data-toggle": "tab", href: "#companyInfo" }, "Company Info")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "additionalFields" ? " active" : ""), onClick: function () { return setTab('additionalFields'); }, "data-toggle": "tab" }, "Additional Fields")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "meters" ? " active" : ""), onClick: function () { return setTab('meters'); }, "data-toggle": "tab", href: "#meters" }, "Assigned Meters")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "notes" ? " active" : ""), onClick: function () { return setTab('notes'); }, "data-toggle": "tab", href: "#notes" }, "Notes"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 235, overflow: 'hidden' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "companyInfo" ? " active" : "fade"), id: "companyInfo" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CompanyInfo__WEBPACK_IMPORTED_MODULE_3__["default"], { Company: company, stateSetter: setCompany })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "additionalFields" ? " active" : "fade"), id: "additionalFields" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_2__["default"], { ID: company.ID, Type: 'Company', Tab: tab })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "meters" ? " active" : "fade"), id: "meters" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CompanyMeter__WEBPACK_IMPORTED_MODULE_4__["default"], { Company: company })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "notes" ? " active" : "fade"), id: "notes" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_1__["default"], { ID: props.CompanyID, Type: 'Company' })))));
}


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


/***/ }),

/***/ "./TSX/SystemCenter/Company/CompanyInfo.tsx":
/*!**************************************************!*\
  !*** ./TSX/SystemCenter/Company/CompanyInfo.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CompanyForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CompanyForm */ "./TSX/SystemCenter/Company/CompanyForm.tsx");
//******************************************************************************************************
//  CompanyInfo.tsx - Gbtc
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



var CompanyInfoWindow = /** @class */ (function (_super) {
    __extends(CompanyInfoWindow, _super);
    function CompanyInfoWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Company: _this.props.Company
        };
        return _this;
    }
    CompanyInfoWindow.prototype.componentDidMount = function () {
    };
    CompanyInfoWindow.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({ Company: nextProps.Company });
    };
    CompanyInfoWindow.prototype.updateCompany = function () {
        var _this = this;
        var company = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.Company);
        return $.ajax({
            type: "PATCH",
            url: homePath + "api/SystemCenter/Company/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Company),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (LocationID) {
            _this.props.stateSetter(company);
        });
    };
    CompanyInfoWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Company Information:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CompanyForm__WEBPACK_IMPORTED_MODULE_2__["default"], { Company: this.state.Company, Setter: function (record) { return _this.setState({ Company: record }); } })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () { return _this.updateCompany(); }, hidden: this.state.Company.ID == 0, disabled: this.state.Company == this.props.Company }, "Update")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return _this.setState({ Company: _this.props.Company }); }, disabled: this.state.Company == this.props.Company }, "Reset")))));
    };
    return CompanyInfoWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (CompanyInfoWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Company/CompanyMeter.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/Company/CompanyMeter.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CompanyMeterWindow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  CompanyMeter.tsx - Gbtc
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
//  02/04/2020 - Billy Ernest
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


function CompanyMeterWindow(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), sites = _a[0], setSites = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), allSites = _b[0], setAllSites = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](''), 2), searchText = _c[0], setSearchText = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](''), 2), searchTextAS = _d[0], setSearchTextAS = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), selectedSites = _e[0], setSelectedSites = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"](function (x) { return x + 1; }, 0), 2), updated = _f[0], Sync = _f[1]; // integer state for inducing database sync
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var promise1 = getSites();
        promise1.done(function (sites) { return setSites(sites); });
        var promise2 = getAllSites();
        promise2.done(function (sites) { return setAllSites(lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](sites, ['AssetKey'], ['asc'])); });
        return function () {
            if (promise1.abort != undefined)
                promise1.abort();
            if (promise2.abort != undefined)
                promise2.abort();
        };
    }, [updated]);
    function getSites() {
        return $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/CompanyMeter/" + props.Company.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }
    function addSites() {
        $.ajax({
            type: "POST",
            url: homePath + "api/SystemCenter/CompanyMeter/AddMultiple",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(selectedSites.map(function (ss) { return ({ ID: 0, CompanyID: props.Company.ID, MeterID: parseInt(ss.ID.toString()), DisplayName: ss.Name, Enabled: true }); })),
            cache: false,
            async: true
        }).done(function () {
            Sync(1);
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                Sync(1);
            }
        });
    }
    function getAllSites() {
        return $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }
    function deleteCustommerAccess(record) {
        $.ajax({
            type: "DELETE",
            url: homePath + "api/SystemCenter/CompanyMeter/Delete",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(record),
            cache: false,
            async: true
        }).done(function () {
            Sync(1);
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                Sync(1);
            }
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Sites:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 421, maxHeight: window.innerHeight - 421, padding: 0, overflowY: 'auto' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: "form-control", placeholder: "Search filter for select box ...", value: searchTextAS, onChange: function (e) { return setSearchTextAS(e.target.value); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Assigned Sites:"),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, sites.length > 0 ? sites.filter(function (s) { return s.DisplayName.toLowerCase().indexOf(searchTextAS.toLowerCase()) >= 0; }).map(function (site, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: i },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, site.DisplayName),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                            e.preventDefault();
                                            deleteCustommerAccess(site);
                                        } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))); }) : null)))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: "form-control", placeholder: "Search filter for select box ...", value: searchText, onChange: function (e) { return setSearchText(e.target.value); } }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", style: { paddingTop: 5, height: 'calc(100% - 35px)' }, value: selectedSites.map(function (ss) { return ss.ID.toString(); }), multiple: true, onChange: function (e) {
                            setSelectedSites(Array.from(e.target.selectedOptions).map(function (o) { return ({ ID: o.value, Name: o.text }); }));
                        } }, allSites.filter(function (allsite) { return allsite.AssetKey.toLowerCase().indexOf(searchText.toLowerCase()) >= 0; }).map(function (allsite) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: allsite.ID, value: allsite.ID, hidden: sites.find(function (s) { return s.MeterID == allsite.ID; }) != null, disabled: sites.find(function (s) { return s.MeterID == allsite.ID; }) != null }, allsite.AssetKey); }))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: addSites }, "Add Sites")))));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbXBhbnkvQ29tcGFueS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21wYW55L0NvbXBhbnlGb3JtLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbXBhbnkvQ29tcGFueUluZm8udHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tcGFueS9Db21wYW55TWV0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLHNCQUFzQjtBQUN0QixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUl6RTtBQUd5QjtBQUN3QjtBQUNsQztBQUNFO0FBSWpDLFNBQVMsT0FBTyxDQUFFLEtBQTRCO0lBQ25ELHdFQUFrRSxFQUFqRSxlQUFPLEVBQUUsa0JBQXdELENBQUM7SUFDbkUsMEVBQXNDLEVBQXJDLFdBQUcsRUFBRSxjQUFnQyxDQUFDO0lBRTdDLCtDQUFlLENBQUM7UUFDWixJQUFJLE9BQU8sR0FBRyxVQUFVLEVBQUUsQ0FBQztRQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBMEIsSUFBSyxpQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7UUFDL0QsT0FBTztZQUNILElBQUksT0FB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RSxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFPLElBQUksdUVBQVEsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBdkIsQ0FBdUIsQ0FBQyxJQUFJLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxFQUF2QixDQUF1QixDQUFDLElBQUksSUFBSSxJQUFHLE9BQU8sQ0FBQyxRQUFRLENBQVUsRUFBN0wsQ0FBNkwsQ0FBQyxDQUMzUyxDQUNQLENBQ0osQ0FDSjtRQUNOLDZEQUFLLFNBQVMsRUFBQyxhQUFhO1lBQ3hCLDZEQUFLLFNBQVMsRUFBQyxnQkFBZ0I7Z0JBQzNCLGdFQUFRLFNBQVMsRUFBQyw0QkFBNEIsRUFBQyxPQUFPLEVBQUUsUUFBUSxnQkFBb0IsQ0FDbEYsQ0FDSixDQUNKLENBRVQsQ0FBQztBQUVOLENBQUMiLCJmaWxlIjoiQ29tcGFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDb21wYW55LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAxMC8xNi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IE5vdGVXaW5kb3cgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Ob3RlV2luZG93JztcclxuaW1wb3J0IEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9BZGRpdGlvbmFsRmllbGRzV2luZG93JztcclxuaW1wb3J0IENvbXBhbnlJbmZvV2luZG93IGZyb20gJy4vQ29tcGFueUluZm8nO1xyXG5pbXBvcnQgQ29tcGFueU1ldGVyV2luZG93IGZyb20gJy4vQ29tcGFueU1ldGVyJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21wYW55IChwcm9wczogeyBDb21wYW55SUQ6IG51bWJlciB9KSB7XHJcbiAgICBjb25zdCBbY29tcGFueSwgc2V0Q29tcGFueV0gPSBSZWFjdC51c2VTdGF0ZTxTeXN0ZW1DZW50ZXIuQ29tcGFueT4obnVsbCk7XHJcbiAgICBjb25zdCBbdGFiLCBzZXRUYWJdID0gUmVhY3QudXNlU3RhdGUoZ2V0VGFiKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gZ2V0Q29tcGFueSgpO1xyXG4gICAgICAgIHByb21pc2UuZG9uZSgoZGF0YTogU3lzdGVtQ2VudGVyLkNvbXBhbnkpID0+IHNldENvbXBhbnkoZGF0YSkpO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwcm9taXNlLmFib3J0ICE9IHVuZGVmaW5lZCkgcHJvbWlzZS5hYm9ydCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdDb21wYW55LlRhYicsIEpTT04uc3RyaW5naWZ5KHRhYikpO1xyXG4gICAgfSwgW3RhYl0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRhYigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnQ29tcGFueS5UYWInKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnQ29tcGFueS5UYWInKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJ2NvbXBhbnlJbmZvJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRDb21wYW55KCk6IEpRdWVyeS5qcVhIUjxTeXN0ZW1DZW50ZXIuQ29tcGFueT4ge1xyXG4gICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0NvbXBhbnkvT25lLyR7cHJvcHMuQ29tcGFueUlEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlTWV0ZXIoKTogSlF1ZXJ5LmpxWEhSIHtcclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBjb25maXJtKFwiVGhpcyB3aWxsIGRlbGV0ZSB0aGUgQ29tcGFueSBQZXJtYW5lbnRseVwiKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQ29tcGFueS9EZWxldGVgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbXBhbnkpLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmIChjb21wYW55ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2MywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2Mywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nOiAxNSB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPntjb21wYW55ICE9IG51bGwgPyBjb21wYW55Lk5hbWUgOiAnJ308L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgcHVsbC1yaWdodFwiIGhpZGRlbj17Y29tcGFueSA9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiBkZWxldGVNZXRlcigpLmRvbmUoKCkgPT4gd2luZG93LmxvY2F0aW9uLmhyZWYgPSBob21lUGF0aCArICdpbmRleC5jc2h0bWw/bmFtZT1QQ29tcGFuaWVzJyl9PkRlbGV0ZSBDb21wYW55IChQZXJtYW5lbnQpPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcImNvbXBhbnlJbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2NvbXBhbnlJbmZvJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNjb21wYW55SW5mb1wiPkNvbXBhbnkgSW5mbzwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJhZGRpdGlvbmFsRmllbGRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2FkZGl0aW9uYWxGaWVsZHMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIj5BZGRpdGlvbmFsIEZpZWxkczwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJtZXRlcnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignbWV0ZXJzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNtZXRlcnNcIj5Bc3NpZ25lZCBNZXRlcnM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwibm90ZXNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignbm90ZXMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI25vdGVzXCI+Tm90ZXM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIiBzdHlsZT17e21heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjM1LCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwiY29tcGFueUluZm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImNvbXBhbnlJbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21wYW55SW5mb1dpbmRvdyBDb21wYW55PXtjb21wYW55fSBzdGF0ZVNldHRlcj17c2V0Q29tcGFueX0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImFkZGl0aW9uYWxGaWVsZHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cgSUQ9e2NvbXBhbnkuSUR9IFR5cGU9J0NvbXBhbnknIFRhYj17dGFifS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwibWV0ZXJzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJtZXRlcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbXBhbnlNZXRlcldpbmRvdyBDb21wYW55PXtjb21wYW55fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcIm5vdGVzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJub3Rlc1wiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE5vdGVXaW5kb3cgSUQ9e3Byb3BzLkNvbXBhbnlJRH0gVHlwZT0nQ29tcGFueScgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIENvbXBhbnlGb3JtLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAxMC8yMC8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VTZWxlY3RvciwgdXNlRGlzcGF0Y2ggfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IElucHV0LCBUZXh0QXJlYSxTZWxlY3QgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zJztcclxuaW1wb3J0IHsgU2VsZWN0Q29tcGFueVR5cGVzLCBTZWxlY3RDb21wYW55VHlwZXNTdGF0dXMsIEZldGNoQ29tcGFueVR5cGVzIH0gZnJvbSAnLi9Db21wYW55VHlwZVNsaWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBhbnlGb3JtKHByb3BzOiB7IENvbXBhbnk6IFN5c3RlbUNlbnRlci5Db21wYW55LCBTZXR0ZXI6IChjb21wYW55OiBTeXN0ZW1DZW50ZXIuQ29tcGFueSkgPT4gdm9pZCwgc2V0RXJyb3JzPzogKGU6IHN0cmluZ1tdKSA9PiB2b2lkIH0pIHtcclxuXHJcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcbiAgICBjb25zdCBjb21wYW55VHlwZXMgPSB1c2VTZWxlY3RvcihTZWxlY3RDb21wYW55VHlwZXMpIGFzIFN5c3RlbUNlbnRlci5Db21wYW55VHlwZVtdO1xyXG4gICAgY29uc3QgY3RTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RDb21wYW55VHlwZXNTdGF0dXMpIGFzIFN5c3RlbUNlbnRlci5TdGF0dXM7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgZSA9IFtdO1xyXG4gICAgICAgIGlmIChwcm9wcy5Db21wYW55LkNvbXBhbnlJRCA9PSBudWxsIHx8IHByb3BzLkNvbXBhbnkuQ29tcGFueUlELm1hdGNoKC9bMC05XXs4fS8pID09IG51bGwpXHJcbiAgICAgICAgICAgIGUucHVzaCgnQ29tcGFueUlEIG11c3QgYmUgYSA4IGNoYXJhY3RlciBhbHBoYW51bWVyaWMgSWRlbnRpZmllci4nKTtcclxuICAgICAgICBpZiAocHJvcHMuQ29tcGFueS5OYW1lID09IG51bGwgfHwgcHJvcHMuQ29tcGFueS5OYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICBlLnB1c2goJ0EgbmFtZSBpcyByZXF1aXJlZC4nKTtcclxuICAgICAgICBpZiAocHJvcHMuQ29tcGFueS5OYW1lICE9IG51bGwgJiYgcHJvcHMuQ29tcGFueS5OYW1lLmxlbmd0aCA+IDIwMClcclxuICAgICAgICAgICAgZS5wdXNoKCdDb21wYW55IE5hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJyk7XHJcblxyXG4gICAgICAgIGlmIChwcm9wcy5zZXRFcnJvcnMgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBwcm9wcy5zZXRFcnJvcnMoZSk7XHJcbiAgICB9LCBbcHJvcHMuQ29tcGFueV0pO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGN0U3RhdHVzICE9ICd1bmludGlhdGVkJykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgcHJvbWlzZSA9IGRpc3BhdGNoKEZldGNoQ29tcGFueVR5cGVzKCkpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9taXNlLmFib3J0KCkgIT09IHVuZGVmaW5lZCkgcHJvbWlzZS5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBWYWxpZChmaWVsZDoga2V5b2YoU3lzdGVtQ2VudGVyLkNvbXBhbnkpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdDb21wYW55SUQnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQ29tcGFueS5Db21wYW55SUQgIT0gbnVsbCAmJiBwcm9wcy5Db21wYW55LkNvbXBhbnlJRC5tYXRjaCgvWzAtOSxhLXosQS1aXXs4fS8pICE9IG51bGw7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQ29tcGFueS5OYW1lICE9IG51bGwgJiYgcHJvcHMuQ29tcGFueS5OYW1lLmxlbmd0aCA+IDAgJiYgcHJvcHMuQ29tcGFueS5OYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgIDxTZWxlY3Q8U3lzdGVtQ2VudGVyLkNvbXBhbnk+IFJlY29yZD17cHJvcHMuQ29tcGFueX0gTGFiZWw9eydDb21wYW55IFR5cGUnfSBGaWVsZD1cIkNvbXBhbnlUeXBlSURcIiBPcHRpb25zPXtjb21wYW55VHlwZXMubWFwKGN0ID0+ICh7VmFsdWU6IGN0LklELnRvU3RyaW5nKCksIExhYmVsOiBjdC5OYW1lfSkpfSBTZXR0ZXI9e3Byb3BzLlNldHRlcn0gLz5cclxuICAgICAgICAgICAgPElucHV0PFN5c3RlbUNlbnRlci5Db21wYW55PiBSZWNvcmQ9e3Byb3BzLkNvbXBhbnl9IEZpZWxkPXsnTmFtZSd9IEZlZWRiYWNrPXsnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17VmFsaWR9IFNldHRlcj17cHJvcHMuU2V0dGVyfSAvPlxyXG4gICAgICAgICAgICA8SW5wdXQ8U3lzdGVtQ2VudGVyLkNvbXBhbnk+IFJlY29yZD17cHJvcHMuQ29tcGFueX0gRmllbGQ9eydDb21wYW55SUQnfSBGZWVkYmFjaz17J0NvbXBhbnlJRCBtdXN0IGJlIDggbnVtZXJpYyBjaGFyYWN0ZXJzLid9IFZhbGlkPXtWYWxpZH0gU2V0dGVyPXtwcm9wcy5TZXR0ZXJ9IC8+XHJcbiAgICAgICAgICAgIDxUZXh0QXJlYTxTeXN0ZW1DZW50ZXIuQ29tcGFueT4gUm93cz17M30gUmVjb3JkPXtwcm9wcy5Db21wYW55fSBGaWVsZD17J0Rlc2NyaXB0aW9uJ30gVmFsaWQ9e1ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlNldHRlcn0gLz5cclxuICAgICAgICA8L2Zvcm0+XHJcblxyXG4gICAgICAgICk7XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQ29tcGFueUluZm8udHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDEwLzE2LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBDb21wYW55Rm9ybSBmcm9tICcuL0NvbXBhbnlGb3JtJztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBhbnlJbmZvV2luZG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgQ29tcGFueTogU3lzdGVtQ2VudGVyLkNvbXBhbnksIHN0YXRlU2V0dGVyOiAoY29tcGFueTogU3lzdGVtQ2VudGVyLkNvbXBhbnkpID0+IHZvaWQgfSwgeyBDb21wYW55OiBTeXN0ZW1DZW50ZXIuQ29tcGFueX0sIHt9PiB7XHJcbiAgICBqcXVlcnlIYW5kbGU6IEpRdWVyeS5qcVhIUjtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIENvbXBhbnk6IHRoaXMucHJvcHMuQ29tcGFueVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ29tcGFueTogbmV4dFByb3BzLkNvbXBhbnl9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNvbXBhbnkoKTogSlF1ZXJ5LmpxWEhSIHtcclxuICAgICAgICB2YXIgY29tcGFueSA9IF8uY2xvbmUodGhpcy5zdGF0ZS5Db21wYW55KTtcclxuXHJcbiAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9Db21wYW55L1VwZGF0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLkNvbXBhbnkpLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgIH0pLmRvbmUoKExvY2F0aW9uSUQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgIHRoaXMucHJvcHMuc3RhdGVTZXR0ZXIoY29tcGFueSk7XHJcbiAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkNvbXBhbnkgSW5mb3JtYXRpb246PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxDb21wYW55Rm9ybSBDb21wYW55PXt0aGlzLnN0YXRlLkNvbXBhbnl9IFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5zZXRTdGF0ZSh7Q29tcGFueTogcmVjb3JkfSkgfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVDb21wYW55KCl9IGhpZGRlbj17dGhpcy5zdGF0ZS5Db21wYW55LklEID09IDB9IGRpc2FibGVkPXt0aGlzLnN0YXRlLkNvbXBhbnkgPT0gdGhpcy5wcm9wcy5Db21wYW55fT5VcGRhdGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IENvbXBhbnk6IHRoaXMucHJvcHMuQ29tcGFueSB9KX0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuQ29tcGFueSA9PSB0aGlzLnByb3BzLkNvbXBhbnl9PlJlc2V0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIENvbXBhbnlNZXRlci50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoICB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyAgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSBcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDIvMDQvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBhbnlNZXRlcldpbmRvdyhwcm9wczogeyBDb21wYW55OiBTeXN0ZW1DZW50ZXIuQ29tcGFueSB9KXtcclxuICAgIGNvbnN0IFtzaXRlcywgc2V0U2l0ZXNdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLkNvbXBhbnlNZXRlcltdPihbXSk7XHJcbiAgICBjb25zdCBbYWxsU2l0ZXMsIHNldEFsbFNpdGVzXSA9IFJlYWN0LnVzZVN0YXRlPGFueVtdPihbXSk7XHJcbiAgICBjb25zdCBbc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCcnKTtcclxuICAgIGNvbnN0IFtzZWFyY2hUZXh0QVMsIHNldFNlYXJjaFRleHRBU10gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCcnKTtcclxuXHJcbiAgICBjb25zdCBbc2VsZWN0ZWRTaXRlcywgc2V0U2VsZWN0ZWRTaXRlc10gPSBSZWFjdC51c2VTdGF0ZTx7SUQ6IG51bWJlciwgTmFtZTogc3RyaW5nfVtdPihbXSk7XHJcbiAgICBjb25zdCBbdXBkYXRlZCwgU3luY10gPSBSZWFjdC51c2VSZWR1Y2VyKHggPT4geCArIDEsIDApOyAvLyBpbnRlZ2VyIHN0YXRlIGZvciBpbmR1Y2luZyBkYXRhYmFzZSBzeW5jXHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgcHJvbWlzZTEgPSBnZXRTaXRlcygpO1xyXG4gICAgICAgIHByb21pc2UxLmRvbmUoKHNpdGVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuQ29tcGFueU1ldGVyPikgPT4gc2V0U2l0ZXMoc2l0ZXMpKTtcclxuICAgICAgICBsZXQgcHJvbWlzZTIgPSBnZXRBbGxTaXRlcygpO1xyXG4gICAgICAgIHByb21pc2UyLmRvbmUoKHNpdGVzOiBBcnJheTxhbnk+KSA9PiBzZXRBbGxTaXRlcyhfLm9yZGVyQnkoc2l0ZXMsIFsnQXNzZXRLZXknXSwgWydhc2MnXSkpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByb21pc2UxLmFib3J0ICE9IHVuZGVmaW5lZCkgcHJvbWlzZTEuYWJvcnQoKTtcclxuICAgICAgICAgICAgaWYgKHByb21pc2UyLmFib3J0ICE9IHVuZGVmaW5lZCkgcHJvbWlzZTIuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbdXBkYXRlZF0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNpdGVzKCk6IEpRdWVyeS5qcVhIUjxTeXN0ZW1DZW50ZXIuQ29tcGFueU1ldGVyW10+IHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0NvbXBhbnlNZXRlci8ke3Byb3BzLkNvbXBhbnkuSUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTaXRlcygpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0NvbXBhbnlNZXRlci9BZGRNdWx0aXBsZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoc2VsZWN0ZWRTaXRlcy5tYXAoc3MgPT4gKHsgSUQ6IDAsIENvbXBhbnlJRDogcHJvcHMuQ29tcGFueS5JRCwgTWV0ZXJJRDogcGFyc2VJbnQoc3MuSUQudG9TdHJpbmcoKSksIERpc3BsYXlOYW1lIDogc3MuTmFtZSwgRW5hYmxlZDogdHJ1ZSB9KSBhcyBTeXN0ZW1DZW50ZXIuQ29tcGFueU1ldGVyKSksXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgU3luYygxKTtcclxuICAgICAgICB9KS5mYWlsKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBTeW5jKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QWxsU2l0ZXMoKTogSlF1ZXJ5LmpxWEhSPGFueVtdPiB7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXJgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZUN1c3RvbW1lckFjY2VzcyhyZWNvcmQ6IFN5c3RlbUNlbnRlci5Db21wYW55TWV0ZXIpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQ29tcGFueU1ldGVyL0RlbGV0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocmVjb3JkKSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBTeW5jKDEpO1xyXG4gICAgICAgIH0pLmZhaWwobXNnID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxyXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFN5bmMoMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5TaXRlczo8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNDIxLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQyMSwgcGFkZGluZzogMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZmlsdGVyIGZvciBzZWxlY3QgYm94IC4uLlwiIHZhbHVlPXtzZWFyY2hUZXh0QVN9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoVGV4dEFTKGUudGFyZ2V0LnZhbHVlKX0gLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+PHRyPjx0aD5Bc3NpZ25lZCBTaXRlczo8L3RoPjx0aD48L3RoPjwvdHI+PC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzaXRlcy5sZW5ndGggPiAwID8gc2l0ZXMuZmlsdGVyKHMgPT4gcy5EaXNwbGF5TmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGV4dEFTLnRvTG93ZXJDYXNlKCkpID49IDApLm1hcCgoc2l0ZSwgaSkgPT4gPHRyIGtleT17aX0+PHRkPntzaXRlLkRpc3BsYXlOYW1lfTwvdGQ+PHRkPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVDdXN0b21tZXJBY2Nlc3Moc2l0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj48L3RkPjwvdHI+KSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmaWx0ZXIgZm9yIHNlbGVjdCBib3ggLi4uXCIgdmFsdWU9e3NlYXJjaFRleHR9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoVGV4dChlLnRhcmdldC52YWx1ZSl9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBzdHlsZT17eyBwYWRkaW5nVG9wOiA1LCBoZWlnaHQ6ICdjYWxjKDEwMCUgLSAzNXB4KScgfX0gdmFsdWU9e3NlbGVjdGVkU2l0ZXMubWFwKHNzID0+IHNzLklELnRvU3RyaW5nKCkpfSBtdWx0aXBsZSBvbkNoYW5nZT17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkU2l0ZXMoQXJyYXkuZnJvbShlLnRhcmdldC5zZWxlY3RlZE9wdGlvbnMpLm1hcChvID0+ICh7IElEOiBvLnZhbHVlLCBOYW1lOiBvLnRleHQgfSkpIGFzIGFueSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YWxsU2l0ZXMuZmlsdGVyKGFsbHNpdGUgPT4gYWxsc2l0ZS5Bc3NldEtleS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpKSA+PSAwKS5tYXAoYWxsc2l0ZSA9PiA8b3B0aW9uIGtleT17YWxsc2l0ZS5JRH0gdmFsdWU9e2FsbHNpdGUuSUR9IGhpZGRlbj17c2l0ZXMuZmluZChzID0+IHMuTWV0ZXJJRCA9PSBhbGxzaXRlLklEKSAhPSBudWxsfSBkaXNhYmxlZD17c2l0ZXMuZmluZChzID0+IHMuTWV0ZXJJRCA9PSBhbGxzaXRlLklEKSAhPSBudWxsfT57YWxsc2l0ZS5Bc3NldEtleX08L29wdGlvbj4pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXthZGRTaXRlc30+QWRkIFNpdGVzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICk7XHJcblxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9