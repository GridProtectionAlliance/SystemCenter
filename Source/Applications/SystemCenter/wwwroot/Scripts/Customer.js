(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Customer"],{

/***/ "./TSX/SystemCenter/Customer/Customer.tsx":
/*!************************************************!*\
  !*** ./TSX/SystemCenter/Customer/Customer.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommonComponents/NoteWindow */ "./TSX/SystemCenter/CommonComponents/NoteWindow.tsx");
/* harmony import */ var _CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/AdditionalFieldsWindow */ "./TSX/SystemCenter/CommonComponents/AdditionalFieldsWindow.tsx");
/* harmony import */ var _CustomerInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CustomerInfo */ "./TSX/SystemCenter/Customer/CustomerInfo.tsx");
/* harmony import */ var _CustomerMeter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CustomerMeter */ "./TSX/SystemCenter/Customer/CustomerMeter.tsx");
//******************************************************************************************************
//  Meter.tsx - Gbtc
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
//  08/27/2019 - Billy Ernest
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





var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Customer: null,
            Tab: _this.getTab()
        };
        return _this;
    }
    Customer.prototype.getTab = function () {
        if (sessionStorage.hasOwnProperty('Customer.Tab'))
            return JSON.parse(sessionStorage.getItem('Customer.Tab'));
        else
            return 'customerInfo';
    };
    Customer.prototype.getCustomer = function () {
        var _this = this;
        if (this.props.CustomerID == undefined)
            return;
        $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/Customer/One/" + this.props.CustomerID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (data) { return _this.setState({ Customer: data }); });
    };
    Customer.prototype.deleteMeter = function () {
        var response = confirm("This will delete the Customer Permanently");
        if (!response)
            return;
        return $.ajax({
            type: "DELETE",
            url: homePath + "api/SystemCenter/Customer/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Customer),
            dataType: 'json',
            cache: true,
            async: true
        });
    };
    Customer.prototype.setTab = function (tab) {
        sessionStorage.setItem('Customer.Tab', JSON.stringify(tab));
        this.setState({ Tab: tab });
    };
    Customer.prototype.componentDidMount = function () {
        this.getCustomer();
    };
    Customer.prototype.componentWillUnmount = function () {
    };
    Customer.prototype.render = function () {
        var _this = this;
        if (this.state.Customer == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, this.state.Customer != null ? this.state.Customer.Name : '')),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", hidden: this.state.Customer == null, onClick: function () { return _this.deleteMeter().done(function () { return window.location.href = homePath + 'index.cshtml?name=PQViewCustomers'; }); } }, "Delete Customer (Permanent)"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "customerInfo" ? " active" : ""), onClick: function () { return _this.setTab('customerInfo'); }, "data-toggle": "tab", href: "#customerInfo" }, "Customer Info")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "additionalFields" ? " active" : ""), onClick: function () { return _this.setTab('additionalFields'); }, "data-toggle": "tab" }, "Additional Fields")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "meters" ? " active" : ""), onClick: function () { return _this.setTab('meters'); }, "data-toggle": "tab", href: "#meters" }, "Assigned Meters")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "notes" ? " active" : ""), onClick: function () { return _this.setTab('notes'); }, "data-toggle": "tab", href: "#notes" }, "Notes"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 235, overflow: 'hidden' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "customerInfo" ? " active" : "fade"), id: "customerInfo" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CustomerInfo__WEBPACK_IMPORTED_MODULE_3__["default"], { Customer: this.state.Customer, stateSetter: function (record) { return _this.setState({ Customer: record }); } })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "additionalFields" ? " active" : "fade"), id: "additionalFields" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_2__["default"], { ID: this.state.Customer.ID, Type: 'Customer', Tab: this.state.Tab })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "meters" ? " active" : "fade"), id: "meters" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CustomerMeter__WEBPACK_IMPORTED_MODULE_4__["default"], { Customer: this.state.Customer })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "notes" ? " active" : "fade"), id: "notes" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_1__["default"], { ID: this.props.CustomerID, Type: 'Customer' })))));
    };
    return Customer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Customer);


/***/ }),

/***/ "./TSX/SystemCenter/Customer/CustomerInfo.tsx":
/*!****************************************************!*\
  !*** ./TSX/SystemCenter/Customer/CustomerInfo.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__);
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



var CustomerInfoWindow = /** @class */ (function (_super) {
    __extends(CustomerInfoWindow, _super);
    function CustomerInfoWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Customer: _this.props.Customer
        };
        _this.valid = _this.valid.bind(_this);
        return _this;
    }
    CustomerInfoWindow.prototype.componentDidMount = function () {
    };
    CustomerInfoWindow.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({ Customer: nextProps.Customer });
    };
    CustomerInfoWindow.prototype.updateCustomer = function () {
        var _this = this;
        var customer = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.Customer);
        return $.ajax({
            type: "PATCH",
            url: homePath + "api/SystemCenter/Customer/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Customer),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (LocationID) {
            _this.props.stateSetter(customer);
        });
    };
    CustomerInfoWindow.prototype.valid = function (field) {
        if (field == 'CustomerKey')
            return this.state.Customer.CustomerKey != null && this.state.Customer.CustomerKey.length > 0 && this.state.Customer.CustomerKey.length <= 25;
        else if (field == 'Name')
            return this.state.Customer.Name == null || this.state.Customer.Name.length <= 100;
        else if (field == 'Phone')
            return this.state.Customer.Phone == null || this.state.Customer.Phone.length <= 20;
        else if (field == 'Description')
            return this.state.Customer.Description == null || this.state.Customer.Description.length <= 200;
        return false;
    };
    CustomerInfoWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Customer Information:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__["Input"], { Record: this.state.Customer, Field: 'CustomerKey', Feedback: 'AccountName of less than 25 characters is required.', Valid: this.valid, Setter: function (record) { return _this.setState({ Customer: record }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__["Input"], { Record: this.state.Customer, Field: 'Name', Feedback: 'Name must be less than 100 characters.', Valid: this.valid, Setter: function (record) { return _this.setState({ Customer: record }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__["Input"], { Record: this.state.Customer, Field: 'Phone', Feedback: 'Phone must be less than 20 characters.', Valid: this.valid, Setter: function (record) { return _this.setState({ Customer: record }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_2__["TextArea"], { Rows: 3, Record: this.state.Customer, Field: 'Description', Feedback: 'Description must be less than 200 characters.', Valid: this.valid, Setter: function (record) { return _this.setState({ Customer: record }); } })))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () { return _this.updateCustomer(); }, hidden: this.state.Customer.ID == 0, disabled: this.state.Customer == this.props.Customer }, "Update")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return _this.setState({ Customer: _this.props.Customer }); }, disabled: this.state.Customer == this.props.Customer }, "Reset")))));
    };
    return CustomerInfoWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (CustomerInfoWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Customer/CustomerMeter.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/Customer/CustomerMeter.tsx ***!
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
//  CustomerMeter.tsx - Gbtc
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


var CustomerMeterWindow = /** @class */ (function (_super) {
    __extends(CustomerMeterWindow, _super);
    function CustomerMeterWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Sites: [],
            AllSites: [],
            SelectedSites: [],
            SearchText: ''
        };
        _this.getSites = _this.getSites.bind(_this);
        _this.addSites = _this.addSites.bind(_this);
        return _this;
    }
    CustomerMeterWindow.prototype.componentDidMount = function () {
        this.getSites();
        this.getAllSites();
    };
    CustomerMeterWindow.prototype.getSites = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/CustomerAccess/" + this.props.Customer.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (sites) { return _this.setState({ Sites: sites }); });
    };
    CustomerMeterWindow.prototype.addSites = function () {
        var _this = this;
        $.ajax({
            type: "POST",
            url: homePath + "api/SystemCenter/CustomerAccess/AddMultiple",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(this.state.SelectedSites.map(function (ss) { return { ID: 0, CustomerID: _this.props.Customer.ID, PQViewSiteID: parseInt(ss.toString()) }; })),
            cache: false,
            async: true
        }).done(function () {
            _this.getSites();
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                _this.getSites();
            }
        });
        ;
    };
    CustomerMeterWindow.prototype.getAllSites = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: homePath + "api/PQView/Site/",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (sites) {
            _this.setState({ AllSites: lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](sites, ['name'], ['asc']) });
        });
    };
    CustomerMeterWindow.prototype.deleteCustommerAccess = function (record) {
        var _this = this;
        $.ajax({
            type: "DELETE",
            url: homePath + "api/SystemCenter/CustomerAccess/Delete",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(record),
            cache: false,
            async: true
        }).done(function () {
            _this.getSites();
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                _this.getSites();
            }
        });
        ;
    };
    CustomerMeterWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Sites:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 421, maxHeight: window.innerHeight - 421, padding: 0, overflowY: 'auto' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Assigned Sites:"),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, this.state.AllSites.length > 0 ? this.state.Sites.map(function (site, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: i },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, _this.state.AllSites.find(function (allsite) { return allsite.id == site.PQViewSiteID; }).name),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                                e.preventDefault();
                                                _this.deleteCustommerAccess(site);
                                            } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))); }) : null)))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: "form-control", placeholder: "Search filter for select box ...", value: this.state.SearchText, onChange: function (e) { return _this.setState({ SearchText: e.target.value }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", style: { paddingTop: 5, height: 'calc(100% - 35px)' }, multiple: true, onChange: function (e) { return _this.setState({ SelectedSites: $(e.target).val() }); } }, this.state.AllSites.filter(function (allsite) { return allsite.name.toLowerCase().indexOf(_this.state.SearchText.toLowerCase()) >= 0; }).map(function (allsite) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: allsite.id, value: allsite.id, hidden: _this.state.Sites.find(function (s) { return s.PQViewSiteID == allsite.id; }) != null, disabled: _this.state.Sites.find(function (s) { return s.PQViewSiteID == allsite.id; }) != null }, allsite.name); }))))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: this.addSites }, "Add Sites")))));
    };
    return CustomerMeterWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (CustomerMeterWindow);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0N1c3RvbWVyL0N1c3RvbWVyLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0N1c3RvbWVyL0N1c3RvbWVySW5mby50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9DdXN0b21lci9DdXN0b21lck1ldGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsb0JBQW9CO0FBQ3BCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBR3lCO0FBQ3dCO0FBQ2hDO0FBQ0U7QUFJbEQ7SUFBc0MsNEJBQTRGO0lBQzlILGtCQUFZLEtBQUssRUFBRSxPQUFPO1FBQTFCLFlBQ0ksa0JBQU0sS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQU14QjtRQUpHLEtBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFFO1NBQ3JCOztJQUNMLENBQUM7SUFFRCx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztZQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOztZQUUxRCxPQUFPLGNB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QUFDO0FBQUQsQ0FBQyxDQWpJZ0QsK0NBQWUsR0FpSS9EIiwiZmlsZSI6IkN1c3RvbWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE1ldGVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOC8yNy8yMDE5IC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBOb3RlV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvTm90ZVdpbmRvdyc7XHJcbmltcG9ydCBBZGRpdGlvbmFsRmllbGRzV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvQWRkaXRpb25hbEZpZWxkc1dpbmRvdyc7XHJcbmltcG9ydCBDdXN0b21lckluZm9XaW5kb3cgZnJvbSAnLi9DdXN0b21lckluZm8nO1xyXG5pbXBvcnQgQ3VzdG9tZXJNZXRlcldpbmRvdyBmcm9tICcuL0N1c3RvbWVyTWV0ZXInO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbWVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgQ3VzdG9tZXJJRDogbnVtYmVyIH0sIHsgQ3VzdG9tZXI6IFN5c3RlbUNlbnRlci5DdXN0b21lciwgVGFiOiBzdHJpbmd9LCB7fT57XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgQ3VzdG9tZXI6IG51bGwsXHJcbiAgICAgICAgICAgIFRhYjogdGhpcy5nZXRUYWIoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWIoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ0N1c3RvbWVyLlRhYicpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdDdXN0b21lci5UYWInKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJ2N1c3RvbWVySW5mbyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VzdG9tZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuQ3VzdG9tZXJJRCA9PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0N1c3RvbWVyL09uZS8ke3RoaXMucHJvcHMuQ3VzdG9tZXJJRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgIH0pLmRvbmUoKGRhdGE6IFN5c3RlbUNlbnRlci5DdXN0b21lcikgPT4gdGhpcy5zZXRTdGF0ZSh7IEN1c3RvbWVyOiBkYXRhIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVNZXRlcigpOiBKUXVlcnkuanFYSFIge1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIlRoaXMgd2lsbCBkZWxldGUgdGhlIEN1c3RvbWVyIFBlcm1hbmVudGx5XCIpO1xyXG4gICAgICAgIGlmICghcmVzcG9uc2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9DdXN0b21lci9EZWxldGVgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuQ3VzdG9tZXIpLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUYWIodGFiOnN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ0N1c3RvbWVyLlRhYicsIEpTT04uc3RyaW5naWZ5KHRhYikpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1RhYjogdGFifSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuQ3VzdG9tZXIgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDYzLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDYzLCBvdmVyZmxvdzogJ2hpZGRlbicsIHBhZGRpbmc6IDE1IH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+e3RoaXMuc3RhdGUuQ3VzdG9tZXIgIT0gbnVsbCA/IHRoaXMuc3RhdGUuQ3VzdG9tZXIuTmFtZSA6ICcnfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBwdWxsLXJpZ2h0XCIgaGlkZGVuPXt0aGlzLnN0YXRlLkN1c3RvbWVyID09IG51bGx9IG9uQ2xpY2s9eygpID0+IHRoaXMuZGVsZXRlTWV0ZXIoKS5kb25lKCgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9UFFWaWV3Q3VzdG9tZXJzJyl9PkRlbGV0ZSBDdXN0b21lciAoUGVybWFuZW50KTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIDxociAvPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtdGFic1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImN1c3RvbWVySW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRUYWIoJ2N1c3RvbWVySW5mbycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjY3VzdG9tZXJJbmZvXCI+Q3VzdG9tZXIgSW5mbzwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdhZGRpdGlvbmFsRmllbGRzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCI+QWRkaXRpb25hbCBGaWVsZHM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJtZXRlcnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdtZXRlcnMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI21ldGVyc1wiPkFzc2lnbmVkIE1ldGVyczwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcIm5vdGVzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYignbm90ZXMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI25vdGVzXCI+Tm90ZXM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIiBzdHlsZT17e21heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjM1LCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJjdXN0b21lckluZm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImN1c3RvbWVySW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q3VzdG9tZXJJbmZvV2luZG93IEN1c3RvbWVyPXt0aGlzLnN0YXRlLkN1c3RvbWVyfSBzdGF0ZVNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5zZXRTdGF0ZSh7IEN1c3RvbWVyOiByZWNvcmQgfSl9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImFkZGl0aW9uYWxGaWVsZHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cgSUQ9e3RoaXMuc3RhdGUuQ3VzdG9tZXIuSUR9IFR5cGU9J0N1c3RvbWVyJyBUYWI9e3RoaXMuc3RhdGUuVGFifS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJtZXRlcnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cIm1ldGVyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q3VzdG9tZXJNZXRlcldpbmRvdyBDdXN0b21lcj17dGhpcy5zdGF0ZS5DdXN0b21lcn0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcIm5vdGVzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJub3Rlc1wiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE5vdGVXaW5kb3cgSUQ9e3RoaXMucHJvcHMuQ3VzdG9tZXJJRH0gVHlwZT0nQ3VzdG9tZXInIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDb25uZWN0aW9uSW5mby50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDkvMTEvMjAxOSAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IEFzc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcclxuaW1wb3J0IEZvcm1UZXh0QXJlYSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1UZXh0QXJlYSc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5pbXBvcnQgeyBJbnB1dCwgVGV4dEFyZWEgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zJztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbWVySW5mb1dpbmRvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IEN1c3RvbWVyOiBTeXN0ZW1DZW50ZXIuQ3VzdG9tZXIsIHN0YXRlU2V0dGVyOiAoY3VzdG9tZXI6IFN5c3RlbUNlbnRlci5DdXN0b21lcikgPT4gdm9pZCB9LCB7IEN1c3RvbWVyOiBTeXN0ZW1DZW50ZXIuQ3VzdG9tZXJ9LCB7fT4ge1xyXG4gICAganF1ZXJ5SGFuZGxlOiBKUXVlcnkuanFYSFI7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBDdXN0b21lcjogdGhpcy5wcm9wcy5DdXN0b21lclxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy52YWxpZC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDdXN0b21lcjogbmV4dFByb3BzLkN1c3RvbWVyfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDdXN0b21lcigpOiBKUXVlcnkuanFYSFIge1xyXG4gICAgICAgIHZhciBjdXN0b21lciA9IF8uY2xvbmUodGhpcy5zdGF0ZS5DdXN0b21lcik7XHJcblxyXG4gICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUEFUQ0hcIixcclxuICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQ3VzdG9tZXIvVXBkYXRlYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuQ3VzdG9tZXIpLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgIH0pLmRvbmUoKExvY2F0aW9uSUQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgIHRoaXMucHJvcHMuc3RhdGVTZXR0ZXIoY3VzdG9tZXIpO1xyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWQoZmllbGQ6IGtleW9mIChTeXN0ZW1DZW50ZXIuQ3VzdG9tZXIpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdDdXN0b21lcktleScpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkN1c3RvbWVyLkN1c3RvbWVyS2V5ICE9IG51bGwgJiYgdGhpcy5zdGF0ZS5DdXN0b21lci5DdXN0b21lcktleS5sZW5ndGggPiAwICYmIHRoaXMuc3RhdGUuQ3VzdG9tZXIuQ3VzdG9tZXJLZXkubGVuZ3RoIDw9IDI1O1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuQ3VzdG9tZXIuTmFtZSA9PSBudWxsIHx8IHRoaXMuc3RhdGUuQ3VzdG9tZXIuTmFtZS5sZW5ndGggPD0gMTAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdQaG9uZScpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkN1c3RvbWVyLlBob25lID09IG51bGwgfHwgdGhpcy5zdGF0ZS5DdXN0b21lci5QaG9uZS5sZW5ndGggPD0gMjA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuQ3VzdG9tZXIuRGVzY3JpcHRpb24gPT0gbnVsbCB8fCB0aGlzLnN0YXRlLkN1c3RvbWVyLkRlc2NyaXB0aW9uLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+Q3VzdG9tZXIgSW5mb3JtYXRpb246PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dDxTeXN0ZW1DZW50ZXIuQ3VzdG9tZXI+IFJlY29yZD17dGhpcy5zdGF0ZS5DdXN0b21lcn0gRmllbGQ9eydDdXN0b21lcktleSd9IEZlZWRiYWNrPXsnQWNjb3VudE5hbWUgb2YgbGVzcyB0aGFuIDI1IGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5zZXRTdGF0ZSh7Q3VzdG9tZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0PFN5c3RlbUNlbnRlci5DdXN0b21lcj4gUmVjb3JkPXt0aGlzLnN0YXRlLkN1c3RvbWVyfSBGaWVsZD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMTAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5zZXRTdGF0ZSh7IEN1c3RvbWVyOiByZWNvcmQgfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXQ8U3lzdGVtQ2VudGVyLkN1c3RvbWVyPiBSZWNvcmQ9e3RoaXMuc3RhdGUuQ3VzdG9tZXJ9IEZpZWxkPXsnUGhvbmUnfSBGZWVkYmFjaz17J1Bob25lIG11c3QgYmUgbGVzcyB0aGFuIDIwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5zZXRTdGF0ZSh7IEN1c3RvbWVyOiByZWNvcmQgfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dEFyZWE8U3lzdGVtQ2VudGVyLkN1c3RvbWVyPiBSb3dzPXszfSBSZWNvcmQ9e3RoaXMuc3RhdGUuQ3VzdG9tZXJ9IEZpZWxkPXsnRGVzY3JpcHRpb24nfSBGZWVkYmFjaz17J0Rlc2NyaXB0aW9uIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMuc2V0U3RhdGUoeyBDdXN0b21lcjogcmVjb3JkIH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVDdXN0b21lcigpfSBoaWRkZW49e3RoaXMuc3RhdGUuQ3VzdG9tZXIuSUQgPT0gMH0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuQ3VzdG9tZXIgPT0gdGhpcy5wcm9wcy5DdXN0b21lcn0+VXBkYXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBDdXN0b21lcjogdGhpcy5wcm9wcy5DdXN0b21lciB9KX0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuQ3VzdG9tZXIgPT0gdGhpcy5wcm9wcy5DdXN0b21lcn0+UmVzZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQ3VzdG9tZXJNZXRlci50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDIvMDQvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBTeXN0ZW1DZW50ZXIsIFBRVmlldyB9IGZyb20gJy4uL2dsb2JhbCc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tZXJNZXRlcldpbmRvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IEN1c3RvbWVyOiBTeXN0ZW1DZW50ZXIuQ3VzdG9tZXIgfSwgeyBTaXRlczogQXJyYXk8U3lzdGVtQ2VudGVyLkN1c3RvbWVyQWNjZXNzPiwgQWxsU2l0ZXM6IEFycmF5PFBRVmlldy5TaXRlPiwgU2VhcmNoVGV4dDogc3RyaW5nLCBTZWxlY3RlZFNpdGVzOiBBcnJheTxudW1iZXI+IH0sIHt9PntcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFNpdGVzOiBbXSxcclxuICAgICAgICAgICAgQWxsU2l0ZXM6IFtdLFxyXG4gICAgICAgICAgICBTZWxlY3RlZFNpdGVzOltdLFxyXG4gICAgICAgICAgICBTZWFyY2hUZXh0OiAnJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRTaXRlcyA9IHRoaXMuZ2V0U2l0ZXMuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZFNpdGVzID0gdGhpcy5hZGRTaXRlcy5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0U2l0ZXMoKTtcclxuICAgICAgICB0aGlzLmdldEFsbFNpdGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2l0ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0N1c3RvbWVyQWNjZXNzLyR7dGhpcy5wcm9wcy5DdXN0b21lci5JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKHNpdGVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuQ3VzdG9tZXJBY2Nlc3M+KSA9PiB0aGlzLnNldFN0YXRlKHsgU2l0ZXM6ICBzaXRlc30pKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRTaXRlcygpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0N1c3RvbWVyQWNjZXNzL0FkZE11bHRpcGxlYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLlNlbGVjdGVkU2l0ZXMubWFwKHNzID0+IHsgcmV0dXJuIHsgSUQ6IDAsIEN1c3RvbWVySUQ6IHRoaXMucHJvcHMuQ3VzdG9tZXIuSUQsIFBRVmlld1NpdGVJRDogcGFyc2VJbnQoc3MudG9TdHJpbmcoKSkgfSBhcyBTeXN0ZW1DZW50ZXIuQ3VzdG9tZXJBY2Nlc3N9KSksXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRTaXRlcygpO1xyXG4gICAgICAgIH0pLmZhaWwobXNnID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxyXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2l0ZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOztcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbGxTaXRlcygpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9QUVZpZXcvU2l0ZS9gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKHNpdGVzOiBBcnJheTxQUVZpZXcuU2l0ZT4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEFsbFNpdGVzOiBfLm9yZGVyQnkoc2l0ZXMsIFsnbmFtZSddLCBbJ2FzYyddKSB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZGVsZXRlQ3VzdG9tbWVyQWNjZXNzKHJlY29yZDogU3lzdGVtQ2VudGVyLkN1c3RvbWVyQWNjZXNzKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0N1c3RvbWVyQWNjZXNzL0RlbGV0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocmVjb3JkKSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldFNpdGVzKCk7XHJcbiAgICAgICAgfSkuZmFpbChtc2cgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXHJcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTaXRlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlNpdGVzOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNDIxLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQyMSwgcGFkZGluZzogMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD48dHI+PHRoPkFzc2lnbmVkIFNpdGVzOjwvdGg+PHRoPjwvdGg+PC90cj48L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5BbGxTaXRlcy5sZW5ndGggPiAwID8gdGhpcy5zdGF0ZS5TaXRlcy5tYXAoKHNpdGUsIGkpID0+IDx0ciBrZXk9e2l9Pjx0ZD57dGhpcy5zdGF0ZS5BbGxTaXRlcy5maW5kKGFsbHNpdGUgPT4gYWxsc2l0ZS5pZCA9PSBzaXRlLlBRVmlld1NpdGVJRCkubmFtZX08L3RkPjx0ZD48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUN1c3RvbW1lckFjY2VzcyhzaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj48L3RkPjwvdHI+KSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmaWx0ZXIgZm9yIHNlbGVjdCBib3ggLi4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuU2VhcmNoVGV4dH0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtTZWFyY2hUZXh0OiBlLnRhcmdldC52YWx1ZSB9KX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBzdHlsZT17eyBwYWRkaW5nVG9wOiA1LCBoZWlnaHQ6ICdjYWxjKDEwMCUgLSAzNXB4KScgfX0gbXVsdGlwbGUgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHsgU2VsZWN0ZWRTaXRlczogJChlLnRhcmdldCkudmFsKCkgYXMgYW55IH0pfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5BbGxTaXRlcy5maWx0ZXIoYWxsc2l0ZSA9PiBhbGxzaXRlLm5hbWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRoaXMuc3RhdGUuU2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpKSA+PSAwKS5tYXAoYWxsc2l0ZSA9PiA8b3B0aW9uIGtleT17YWxsc2l0ZS5pZH0gdmFsdWU9e2FsbHNpdGUuaWR9IGhpZGRlbj17dGhpcy5zdGF0ZS5TaXRlcy5maW5kKHMgPT4gcy5QUVZpZXdTaXRlSUQgPT0gYWxsc2l0ZS5pZCkgIT0gbnVsbH0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuU2l0ZXMuZmluZChzID0+IHMuUFFWaWV3U2l0ZUlEID09IGFsbHNpdGUuaWQpICE9IG51bGx9PnthbGxzaXRlLm5hbWV9PC9vcHRpb24+KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMuYWRkU2l0ZXN9PkFkZCBTaXRlczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=