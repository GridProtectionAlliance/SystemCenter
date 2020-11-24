(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Company"],{

/***/ "./TSX/SystemCenter/CommonComponents/FormCheckBox.tsx":
/*!************************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/FormCheckBox.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  FormCheckBox.tsx - Gbtc
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


var FormCheckBox = /** @class */ (function (_super) {
    __extends(FormCheckBox, _super);
    function FormCheckBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormCheckBox.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-check" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "checkbox", className: "form-check-input", style: { zIndex: 1 }, onChange: function (evt) {
                    var record = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(_this.props.Record);
                    record[_this.props.Field] = evt.target.checked;
                    _this.props.Setter(record);
                }, value: this.props.Record[this.props.Field] ? 'on' : 'off', checked: this.props.Record[this.props.Field] ? true : false, disabled: this.props.Disabled == null ? false : this.props.Disabled }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: "form-check-label" }, this.props.Label == null ? this.props.Field : this.props.Label));
    };
    return FormCheckBox;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (FormCheckBox);


/***/ }),

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
        if (ctStatus != 'unintiated')
            return;
        var promise = dispatch(Object(_CompanyTypeSlice__WEBPACK_IMPORTED_MODULE_3__["FetchCompanyTypes"])());
        return function () {
            if (promise.abort() !== undefined)
                promise.abort();
        };
    }, [dispatch, ctStatus]);
    function Valid(field) {
        if (field == 'CompanyID')
            return props.Company.CompanyID != null && props.Company.CompanyID.match(/[0-9]{8}/) != null;
        else if (field == 'Name')
            return props.Company.Name == null || props.Company.Name.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__["Select"], { Record: props.Company, Field: "CompanyTypeID", Options: companyTypes.map(function (ct) { return ({ Value: ct.ID.toString(), Label: ct.Name }); }), Setter: props.Setter }),
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
            data: JSON.stringify(selectedSites.map(function (ss) { return ({ ID: 0, CompanyID: props.Company.ID, OpenXDAMeterID: parseInt(ss.ID.toString()), MeterName: ss.Name }); })),
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
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, sites.length > 0 ? sites.filter(function (s) { return s.MeterName.toLowerCase().indexOf(searchTextAS.toLowerCase()) >= 0; }).map(function (site, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: i },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, site.MeterName),
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
                        } }, allSites.filter(function (allsite) { return allsite.AssetKey.toLowerCase().indexOf(searchText.toLowerCase()) >= 0; }).map(function (allsite) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: allsite.ID, value: allsite.ID, hidden: sites.find(function (s) { return s.OpenXDAMeterID == allsite.ID; }) != null, disabled: sites.find(function (s) { return s.OpenXDAMeterID == allsite.ID; }) != null }, allsite.AssetKey); }))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: addSites }, "Add Sites")))));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRm9ybUNoZWNrQm94LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbXBhbnkvQ29tcGFueS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21wYW55L0NvbXBhbnlGb3JtLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbXBhbnkvQ29tcGFueUluZm8udHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tcGFueS9Db21wYW55TWV0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLDJCQUEyQjtBQUMzQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNSO0FBRXZCO0lBQTZDLGdDQUF5SDtJQUF0Szs7SUFjQSxDQUFDO0lBYkcsNkJBQU0sR0FBTjtRQUFBLGlCQVlDO1FBWEcsT0FBTyw2REFBSyxTQUFTLEVBQUMsWUFBWTtZQUU5QiwrREFBTyxJQUFJLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxrQkFBa0IsRUFBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQUMsR0FBRztvQkFDcEYsSUFBSSxNQUFNLEdBQU0sNkNBQUMsQ0FB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LElBQUksSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQTlCLENBQThCLENBQUMsSUFBSSxJQUFJLElBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBVSxFQUEzTSxDQUEyTSxDQUFDLENBQ3pULENBQ1AsQ0FDSixDQUNKO1FBQ04sNkRBQUssU0FBUyxFQUFDLGFBQWE7WUFDeEIsNkRBQUssU0FBUyxFQUFDLGdCQUFnQjtnQkFDM0IsZ0VBQVEsU0FBUyxFQUFDLDRCQUE0QixFQUFDLE9BQU8sRUFBRSxRQUFRLGdCQUFvQixDQUNsRixDQUNKLENBQ0osQ0FFVCxDQUFDO0FBRU4sQ0FBQyIsImZpbGUiOiJDb21wYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBGb3JtQ2hlY2tCb3gudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDEvMjIvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUNoZWNrQm94PFQ+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgUmVjb3JkOiBULCBGaWVsZDoga2V5b2YgKFQpLCBTZXR0ZXI6IChyZWNvcmQ6IFQpID0+IHZvaWQsIExhYmVsPzogc3RyaW5nLCBEaXNhYmxlZD86IGJvb2xlYW4gfSwge30sIHt9PntcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tY2hlY2tcIj5cblxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImZvcm0tY2hlY2staW5wdXRcIiBzdHlsZT17eyB6SW5kZXg6IDEgfX0gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkOiBUID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XG4gICAgICAgICAgICAgICAgcmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID0gZXZ0LnRhcmdldC5jaGVja2VkIGFzIGFueTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XG4gICAgICAgICAgICB9fSB2YWx1ZT17dGhpcy5wcm9wcy5SZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPyAnb24nIDogJ29mZid9IGNoZWNrZWQ9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID8gdHJ1ZSA6IGZhbHNlfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkfSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tY2hlY2stbGFiZWxcIiA+e3RoaXMucHJvcHMuTGFiZWwgPT0gbnVsbCA/IHRoaXMucHJvcHMuRmllbGQgOiB0aGlzLnByb3BzLkxhYmVsfTwvbGFiZWw+XG5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn1cbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQ29tcGFueS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAxMC8xNi8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBOb3RlV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvTm90ZVdpbmRvdyc7XG5pbXBvcnQgQWRkaXRpb25hbEZpZWxkc1dpbmRvdyBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0FkZGl0aW9uYWxGaWVsZHNXaW5kb3cnO1xuaW1wb3J0IENvbXBhbnlJbmZvV2luZG93IGZyb20gJy4vQ29tcGFueUluZm8nO1xuaW1wb3J0IENvbXBhbnlNZXRlcldpbmRvdyBmcm9tICcuL0NvbXBhbnlNZXRlcic7XG5cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBhbnkgKHByb3BzOiB7IENvbXBhbnlJRDogbnVtYmVyIH0pIHtcbiAgICBjb25zdCBbY29tcGFueSwgc2V0Q29tcGFueV0gPSBSZWFjdC51c2VTdGF0ZTxTeXN0ZW1DZW50ZXIuQ29tcGFueT4obnVsbCk7XG4gICAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IFJlYWN0LnVzZVN0YXRlKGdldFRhYik7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBsZXQgcHJvbWlzZSA9IGdldENvbXBhbnkoKTtcbiAgICAgICAgcHJvbWlzZS5kb25lKChkYXRhOiBTeXN0ZW1DZW50ZXIuQ29tcGFueSkgPT4gc2V0Q29tcGFueShkYXRhKSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5hYm9ydCAhPSB1bmRlZmluZWQpIHByb21pc2UuYWJvcnQoKTtcbiAgICAgICAgfTtcbiAgICB9LCBbXSk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdDb21wYW55LlRhYicsIEpTT04uc3RyaW5naWZ5KHRhYikpO1xuICAgIH0sIFt0YWJdKTtcblxuICAgIGZ1bmN0aW9uIGdldFRhYigpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ0NvbXBhbnkuVGFiJykpXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdDb21wYW55LlRhYicpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuICdjb21wYW55SW5mbyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29tcGFueSgpOiBKUXVlcnkuanFYSFI8U3lzdGVtQ2VudGVyLkNvbXBhbnk+IHtcbiAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9Db21wYW55L09uZS8ke3Byb3BzLkNvbXBhbnlJRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlTWV0ZXIoKTogSlF1ZXJ5LmpxWEhSIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIlRoaXMgd2lsbCBkZWxldGUgdGhlIENvbXBhbnkgUGVybWFuZW50bHlcIik7XG4gICAgICAgIGlmICghcmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0NvbXBhbnkvRGVsZXRlYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbXBhbnkpLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgICAgICBpZiAoY29tcGFueSA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2MywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2Mywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nOiAxNSB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPntjb21wYW55ICE9IG51bGwgPyBjb21wYW55Lk5hbWUgOiAnJ308L2gyPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgcHVsbC1yaWdodFwiIGhpZGRlbj17Y29tcGFueSA9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiBkZWxldGVNZXRlcigpLmRvbmUoKCkgPT4gd2luZG93LmxvY2F0aW9uLmhyZWYgPSBob21lUGF0aCArICdpbmRleC5jc2h0bWw/bmFtZT1QQ29tcGFuaWVzJyl9PkRlbGV0ZSBDb21wYW55IChQZXJtYW5lbnQpPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiY29tcGFueUluZm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignY29tcGFueUluZm8nKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2NvbXBhbnlJbmZvXCI+Q29tcGFueSBJbmZvPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignYWRkaXRpb25hbEZpZWxkcycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiPkFkZGl0aW9uYWwgRmllbGRzPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcIm1ldGVyc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdtZXRlcnMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI21ldGVyc1wiPkFzc2lnbmVkIE1ldGVyczwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJub3Rlc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdub3RlcycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbm90ZXNcIj5Ob3RlczwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIiBzdHlsZT17e21heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjM1LCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImNvbXBhbnlJbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJjb21wYW55SW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbXBhbnlJbmZvV2luZG93IENvbXBhbnk9e2NvbXBhbnl9IHN0YXRlU2V0dGVyPXtzZXRDb21wYW55fS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJhZGRpdGlvbmFsRmllbGRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJhZGRpdGlvbmFsRmllbGRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QWRkaXRpb25hbEZpZWxkc1dpbmRvdyBJRD17Y29tcGFueS5JRH0gVHlwZT0nQ29tcGFueScgVGFiPXt0YWJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcIm1ldGVyc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwibWV0ZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tcGFueU1ldGVyV2luZG93IENvbXBhbnk9e2NvbXBhbnl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJub3Rlc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwibm90ZXNcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Tm90ZVdpbmRvdyBJRD17cHJvcHMuQ29tcGFueUlEfSBUeXBlPSdDb21wYW55JyAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG59XG5cbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQ29tcGFueUZvcm0udHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMTAvMjAvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IsIHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCB7IElucHV0LCBUZXh0QXJlYSxTZWxlY3QgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zJztcbmltcG9ydCB7IFNlbGVjdENvbXBhbnlUeXBlcywgU2VsZWN0Q29tcGFueVR5cGVzU3RhdHVzLCBGZXRjaENvbXBhbnlUeXBlcyB9IGZyb20gJy4vQ29tcGFueVR5cGVTbGljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbXBhbnlGb3JtKHByb3BzOiB7IENvbXBhbnk6IFN5c3RlbUNlbnRlci5Db21wYW55LCBTZXR0ZXI6IChjb21wYW55OiBTeXN0ZW1DZW50ZXIuQ29tcGFueSkgPT4gdm9pZCB9KSB7XG4gICAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIGNvbnN0IGNvbXBhbnlUeXBlcyA9IHVzZVNlbGVjdG9yKFNlbGVjdENvbXBhbnlUeXBlcykgYXMgU3lzdGVtQ2VudGVyLkNvbXBhbnlUeXBlW107XG4gICAgY29uc3QgY3RTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RDb21wYW55VHlwZXNTdGF0dXMpIGFzIFN5c3RlbUNlbnRlci5TdGF0dXM7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoY3RTdGF0dXMgIT0gJ3VuaW50aWF0ZWQnKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHByb21pc2UgPSBkaXNwYXRjaChGZXRjaENvbXBhbnlUeXBlcygpKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlLmFib3J0KCkgIT09IHVuZGVmaW5lZCkgcHJvbWlzZS5hYm9ydCgpO1xuICAgICAgICB9XG4gICAgfSwgW2Rpc3BhdGNoLCBjdFN0YXR1c10pO1xuXG4gICAgZnVuY3Rpb24gVmFsaWQoZmllbGQ6IGtleW9mKFN5c3RlbUNlbnRlci5Db21wYW55KSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmllbGQgPT0gJ0NvbXBhbnlJRCcpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQ29tcGFueS5Db21wYW55SUQgIT0gbnVsbCAmJiBwcm9wcy5Db21wYW55LkNvbXBhbnlJRC5tYXRjaCgvWzAtOV17OH0vKSAhPSBudWxsO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmFtZScpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQ29tcGFueS5OYW1lID09IG51bGwgfHwgcHJvcHMuQ29tcGFueS5OYW1lLmxlbmd0aCA8PSAyMDA7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgPFNlbGVjdDxTeXN0ZW1DZW50ZXIuQ29tcGFueT4gUmVjb3JkPXtwcm9wcy5Db21wYW55fSBGaWVsZD1cIkNvbXBhbnlUeXBlSURcIiBPcHRpb25zPXtjb21wYW55VHlwZXMubWFwKGN0ID0+ICh7VmFsdWU6IGN0LklELnRvU3RyaW5nKCksIExhYmVsOiBjdC5OYW1lfSkpfSBTZXR0ZXI9e3Byb3BzLlNldHRlcn0gLz5cbiAgICAgICAgICAgIDxJbnB1dDxTeXN0ZW1DZW50ZXIuQ29tcGFueT4gUmVjb3JkPXtwcm9wcy5Db21wYW55fSBGaWVsZD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e1ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlNldHRlcn0gLz5cbiAgICAgICAgICAgIDxJbnB1dDxTeXN0ZW1DZW50ZXIuQ29tcGFueT4gUmVjb3JkPXtwcm9wcy5Db21wYW55fSBGaWVsZD17J0NvbXBhbnlJRCd9IEZlZWRiYWNrPXsnQ29tcGFueUlEIG11c3QgYmUgOCBudW1lcmljIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e1ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlNldHRlcn0gLz5cbiAgICAgICAgICAgIDxUZXh0QXJlYTxTeXN0ZW1DZW50ZXIuQ29tcGFueT4gUm93cz17M30gUmVjb3JkPXtwcm9wcy5Db21wYW55fSBGaWVsZD17J0Rlc2NyaXB0aW9uJ30gVmFsaWQ9e1ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlNldHRlcn0gLz5cbiAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgICk7XG59IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBDb21wYW55SW5mby50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAxMC8xNi8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgQ29tcGFueUZvcm0gZnJvbSAnLi9Db21wYW55Rm9ybSc7XG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wYW55SW5mb1dpbmRvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IENvbXBhbnk6IFN5c3RlbUNlbnRlci5Db21wYW55LCBzdGF0ZVNldHRlcjogKGNvbXBhbnk6IFN5c3RlbUNlbnRlci5Db21wYW55KSA9PiB2b2lkIH0sIHsgQ29tcGFueTogU3lzdGVtQ2VudGVyLkNvbXBhbnl9LCB7fT4ge1xuICAgIGpxdWVyeUhhbmRsZTogSlF1ZXJ5LmpxWEhSO1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIENvbXBhbnk6IHRoaXMucHJvcHMuQ29tcGFueVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ29tcGFueTogbmV4dFByb3BzLkNvbXBhbnl9KVxuICAgIH1cblxuICAgIHVwZGF0ZUNvbXBhbnkoKTogSlF1ZXJ5LmpxWEhSIHtcbiAgICAgICAgdmFyIGNvbXBhbnkgPSBfLmNsb25lKHRoaXMuc3RhdGUuQ29tcGFueSk7XG5cbiAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUEFUQ0hcIixcbiAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0NvbXBhbnkvVXBkYXRlYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5Db21wYW55KSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgfSkuZG9uZSgoTG9jYXRpb25JRDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgIHRoaXMucHJvcHMuc3RhdGVTZXR0ZXIoY29tcGFueSk7XG4gICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5Db21wYW55IEluZm9ybWF0aW9uOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgIDxDb21wYW55Rm9ybSBDb21wYW55PXt0aGlzLnN0YXRlLkNvbXBhbnl9IFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5zZXRTdGF0ZSh7Q29tcGFueTogcmVjb3JkfSkgfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQ29tcGFueSgpfSBoaWRkZW49e3RoaXMuc3RhdGUuQ29tcGFueS5JRCA9PSAwfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5Db21wYW55ID09IHRoaXMucHJvcHMuQ29tcGFueX0+VXBkYXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBDb21wYW55OiB0aGlzLnByb3BzLkNvbXBhbnkgfSl9IGRpc2FibGVkPXt0aGlzLnN0YXRlLkNvbXBhbnkgPT0gdGhpcy5wcm9wcy5Db21wYW55fT5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBDb21wYW55TWV0ZXIudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoICB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDIvMDQvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcblxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tcGFueU1ldGVyV2luZG93KHByb3BzOiB7IENvbXBhbnk6IFN5c3RlbUNlbnRlci5Db21wYW55IH0pe1xuICAgIGNvbnN0IFtzaXRlcywgc2V0U2l0ZXNdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLkNvbXBhbnlNZXRlcltdPihbXSk7XG4gICAgY29uc3QgW2FsbFNpdGVzLCBzZXRBbGxTaXRlc10gPSBSZWFjdC51c2VTdGF0ZTxhbnlbXT4oW10pO1xuICAgIGNvbnN0IFtzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0XSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJycpO1xuICAgIGNvbnN0IFtzZWFyY2hUZXh0QVMsIHNldFNlYXJjaFRleHRBU10gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCcnKTtcblxuICAgIGNvbnN0IFtzZWxlY3RlZFNpdGVzLCBzZXRTZWxlY3RlZFNpdGVzXSA9IFJlYWN0LnVzZVN0YXRlPHtJRDogbnVtYmVyLCBOYW1lOiBzdHJpbmd9W10+KFtdKTtcbiAgICBjb25zdCBbdXBkYXRlZCwgU3luY10gPSBSZWFjdC51c2VSZWR1Y2VyKHggPT4geCArIDEsIDApOyAvLyBpbnRlZ2VyIHN0YXRlIGZvciBpbmR1Y2luZyBkYXRhYmFzZSBzeW5jXG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBsZXQgcHJvbWlzZTEgPSBnZXRTaXRlcygpO1xuICAgICAgICBwcm9taXNlMS5kb25lKChzaXRlczogQXJyYXk8U3lzdGVtQ2VudGVyLkNvbXBhbnlNZXRlcj4pID0+IHNldFNpdGVzKHNpdGVzKSk7XG4gICAgICAgIGxldCBwcm9taXNlMiA9IGdldEFsbFNpdGVzKCk7XG4gICAgICAgIHByb21pc2UyLmRvbmUoKHNpdGVzOiBBcnJheTxhbnk+KSA9PiBzZXRBbGxTaXRlcyhfLm9yZGVyQnkoc2l0ZXMsIFsnQXNzZXRLZXknXSwgWydhc2MnXSkpKTtcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb21pc2UxLmFib3J0ICE9IHVuZGVmaW5lZCkgcHJvbWlzZTEuYWJvcnQoKTtcbiAgICAgICAgICAgIGlmIChwcm9taXNlMi5hYm9ydCAhPSB1bmRlZmluZWQpIHByb21pc2UyLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICB9LCBbdXBkYXRlZF0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0U2l0ZXMoKTogSlF1ZXJ5LmpxWEhSPFN5c3RlbUNlbnRlci5Db21wYW55TWV0ZXJbXT4ge1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQ29tcGFueU1ldGVyLyR7cHJvcHMuQ29tcGFueS5JRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU2l0ZXMoKTogdm9pZCB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9Db21wYW55TWV0ZXIvQWRkTXVsdGlwbGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkU2l0ZXMubWFwKHNzID0+ICh7IElEOiAwLCBDb21wYW55SUQ6IHByb3BzLkNvbXBhbnkuSUQsIE9wZW5YREFNZXRlcklEOiBwYXJzZUludChzcy5JRC50b1N0cmluZygpKSwgTWV0ZXJOYW1lIDogc3MuTmFtZSB9KSBhcyBTeXN0ZW1DZW50ZXIuQ29tcGFueU1ldGVyKSksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKCgpID0+IHtcbiAgICAgICAgICAgIFN5bmMoMSk7XG4gICAgICAgIH0pLmZhaWwobXNnID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBTeW5jKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBbGxTaXRlcygpOiBKUXVlcnkuanFYSFI8YW55W10+IHtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlcmAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVDdXN0b21tZXJBY2Nlc3MocmVjb3JkOiBTeXN0ZW1DZW50ZXIuQ29tcGFueU1ldGVyKTogdm9pZCB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0NvbXBhbnlNZXRlci9EZWxldGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHJlY29yZCksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKCgpID0+IHtcbiAgICAgICAgICAgIFN5bmMoMSk7XG4gICAgICAgIH0pLmZhaWwobXNnID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBTeW5jKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5TaXRlczo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQyMSwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA0MjEsIHBhZGRpbmc6IDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmaWx0ZXIgZm9yIHNlbGVjdCBib3ggLi4uXCIgdmFsdWU9e3NlYXJjaFRleHRBU30gb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hUZXh0QVMoZS50YXJnZXQudmFsdWUpfSAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD48dHI+PHRoPkFzc2lnbmVkIFNpdGVzOjwvdGg+PHRoPjwvdGg+PC90cj48L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2l0ZXMubGVuZ3RoID4gMCA/IHNpdGVzLmZpbHRlcihzID0+IHMuTWV0ZXJOYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hUZXh0QVMudG9Mb3dlckNhc2UoKSkgPj0gMCkubWFwKChzaXRlLCBpKSA9PiA8dHIga2V5PXtpfT48dGQ+e3NpdGUuTWV0ZXJOYW1lfTwvdGQ+PHRkPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUN1c3RvbW1lckFjY2VzcyhzaXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj48L3RkPjwvdHI+KSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmaWx0ZXIgZm9yIHNlbGVjdCBib3ggLi4uXCIgdmFsdWU9e3NlYXJjaFRleHR9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoVGV4dChlLnRhcmdldC52YWx1ZSl9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgc3R5bGU9e3sgcGFkZGluZ1RvcDogNSwgaGVpZ2h0OiAnY2FsYygxMDAlIC0gMzVweCknIH19IHZhbHVlPXtzZWxlY3RlZFNpdGVzLm1hcChzcyA9PiBzcy5JRC50b1N0cmluZygpKX0gbXVsdGlwbGUgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRTaXRlcyhBcnJheS5mcm9tKGUudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKG8gPT4gKHsgSUQ6IG8udmFsdWUsIE5hbWU6IG8udGV4dCB9KSkgYXMgYW55KVxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbFNpdGVzLmZpbHRlcihhbGxzaXRlID0+IGFsbHNpdGUuQXNzZXRLZXkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkgPj0gMCkubWFwKGFsbHNpdGUgPT4gPG9wdGlvbiBrZXk9e2FsbHNpdGUuSUR9IHZhbHVlPXthbGxzaXRlLklEfSBoaWRkZW49e3NpdGVzLmZpbmQocyA9PiBzLk9wZW5YREFNZXRlcklEID09IGFsbHNpdGUuSUQpICE9IG51bGx9IGRpc2FibGVkPXtzaXRlcy5maW5kKHMgPT4gcy5PcGVuWERBTWV0ZXJJRCA9PSBhbGxzaXRlLklEKSAhPSBudWxsfT57YWxsc2l0ZS5Bc3NldEtleX08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17YWRkU2l0ZXN9PkFkZCBTaXRlczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICk7XG5cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==