(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Customer"],{

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
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
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
        if (field == 'AccountName')
            return this.state.Customer.AccountName != null && this.state.Customer.AccountName.length > 0 && this.state.Customer.AccountName.length <= 25;
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
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.Customer, Field: 'AccountName', Feedback: 'AccountName of less than 25 characters is required.', Valid: this.valid, Setter: function (record) { return _this.setState({ Customer: record }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.Customer, Field: 'Name', Feedback: 'Name must be less than 100 characters.', Valid: this.valid, Setter: function (record) { return _this.setState({ Customer: record }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.Customer, Field: 'Phone', Feedback: 'Phone must be less than 20 characters.', Valid: this.valid, Setter: function (record) { return _this.setState({ Customer: record }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_2__["default"], { Rows: 3, Record: this.state.Customer, Field: 'Description', Feedback: 'Description must be less than 200 characters.', Valid: this.valid, Setter: function (record) { return _this.setState({ Customer: record }); } })))),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRm9ybUNoZWNrQm94LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0N1c3RvbWVyL0N1c3RvbWVyLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0N1c3RvbWVyL0N1c3RvbWVySW5mby50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9DdXN0b21lci9DdXN0b21lck1ldGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RywyQkFBMkI7QUFDM0IsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFDUjtBQUV2QjtJQUE2QyxnQ0FBeUg7SUFBdEs7O0lBY0EsQ0FBQztJQWJHLDZCQUFNLEdBQU47UUFBQSxpQkFZQztRQVhHLE9BQU8sNkRBQUssU0FBUyxFQUFDLFlBQVk7WUFFOUIsK0RBQU8sSUFBSSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFDLEdBQUc7b0JBQ3BGLElBQUksTUFBTSxHQUFNLDZDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JB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QUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsWUFBWSxJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQTVCLENBQTRCLENBQUMsSUFBSSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsRUFBRSxFQUE1QixDQUE0QixDQUFDLElBQUksSUFBSSxJQUFHLE9BQU8sQ0FBQyxJQUFJLENBQVUsRUFBek4sQ0FBeU4sQ0FBQyxDQUN6VixDQUNQLENBQ0osQ0FDSjtZQUNOLDZEQUFLLFNBQVMsRUFBQyxhQUFhO2dCQUN4Qiw2REFBSyxTQUFTLEVBQUMsZ0JBQWdCO29CQUMzQixnRUFBUSxTQUFTLEVBQUMsNEJBQTRCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLGdCQUFvQixDQUN2RixDQUNKLENBQ0osQ0FFVCxDQUFDO0lBQ04sQ0FBQztJQUVMLDBCQUFDO0FBQUQsQ0FBQyxDQWpJZ0QsK0NBQWUsR0FpSS9EIiwiZmlsZSI6IkN1c3RvbWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBGb3JtQ2hlY2tCb3gudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDEvMjIvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUNoZWNrQm94PFQ+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgUmVjb3JkOiBULCBGaWVsZDoga2V5b2YgKFQpLCBTZXR0ZXI6IChyZWNvcmQ6IFQpID0+IHZvaWQsIExhYmVsPzogc3RyaW5nLCBEaXNhYmxlZD86IGJvb2xlYW4gfSwge30sIHt9PntcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tY2hlY2tcIj5cblxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImZvcm0tY2hlY2staW5wdXRcIiBzdHlsZT17eyB6SW5kZXg6IDEgfX0gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkOiBUID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XG4gICAgICAgICAgICAgICAgcmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID0gZXZ0LnRhcmdldC5jaGVja2VkIGFzIGFueTtcblxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XG4gICAgICAgICAgICB9fSB2YWx1ZT17dGhpcy5wcm9wcy5SZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPyAnb24nIDogJ29mZid9IGNoZWNrZWQ9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID8gdHJ1ZSA6IGZhbHNlfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkfSAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tY2hlY2stbGFiZWxcIiA+e3RoaXMucHJvcHMuTGFiZWwgPT0gbnVsbCA/IHRoaXMucHJvcHMuRmllbGQgOiB0aGlzLnByb3BzLkxhYmVsfTwvbGFiZWw+XG5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn1cbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgTWV0ZXIudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDgvMjcvMjAxOSAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBOb3RlV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvTm90ZVdpbmRvdyc7XG5pbXBvcnQgQWRkaXRpb25hbEZpZWxkc1dpbmRvdyBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0FkZGl0aW9uYWxGaWVsZHNXaW5kb3cnO1xuaW1wb3J0IEN1c3RvbWVySW5mb1dpbmRvdyBmcm9tICcuL0N1c3RvbWVySW5mbyc7XG5pbXBvcnQgQ3VzdG9tZXJNZXRlcldpbmRvdyBmcm9tICcuL0N1c3RvbWVyTWV0ZXInO1xuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IEN1c3RvbWVySUQ6IG51bWJlciB9LCB7IEN1c3RvbWVyOiBTeXN0ZW1DZW50ZXIuQ3VzdG9tZXIsIFRhYjogc3RyaW5nfSwge30+e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgQ3VzdG9tZXI6IG51bGwsXG4gICAgICAgICAgICBUYWI6IHRoaXMuZ2V0VGFiKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRhYigpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ0N1c3RvbWVyLlRhYicpKVxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnQ3VzdG9tZXIuVGFiJykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gJ2N1c3RvbWVySW5mbyc7XG4gICAgfVxuXG4gICAgZ2V0Q3VzdG9tZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLkN1c3RvbWVySUQgPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9DdXN0b21lci9PbmUvJHt0aGlzLnByb3BzLkN1c3RvbWVySUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgIH0pLmRvbmUoKGRhdGE6IFN5c3RlbUNlbnRlci5DdXN0b21lcikgPT4gdGhpcy5zZXRTdGF0ZSh7IEN1c3RvbWVyOiBkYXRhIH0pKTtcbiAgICB9XG5cbiAgICBkZWxldGVNZXRlcigpOiBKUXVlcnkuanFYSFIge1xuXG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIlRoaXMgd2lsbCBkZWxldGUgdGhlIEN1c3RvbWVyIFBlcm1hbmVudGx5XCIpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9DdXN0b21lci9EZWxldGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5DdXN0b21lciksXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRUYWIodGFiOnN0cmluZyk6IHZvaWQge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdDdXN0b21lci5UYWInLCBKU09OLnN0cmluZ2lmeSh0YWIpKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7VGFiOiB0YWJ9KTtcbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0Q3VzdG9tZXIoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLkN1c3RvbWVyID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDYzLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDYzLCBvdmVyZmxvdzogJ2hpZGRlbicsIHBhZGRpbmc6IDE1IH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+e3RoaXMuc3RhdGUuQ3VzdG9tZXIgIT0gbnVsbCA/IHRoaXMuc3RhdGUuQ3VzdG9tZXIuTmFtZSA6ICcnfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBwdWxsLXJpZ2h0XCIgaGlkZGVuPXt0aGlzLnN0YXRlLkN1c3RvbWVyID09IG51bGx9IG9uQ2xpY2s9eygpID0+IHRoaXMuZGVsZXRlTWV0ZXIoKS5kb25lKCgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9UFFWaWV3Q3VzdG9tZXJzJyl9PkRlbGV0ZSBDdXN0b21lciAoUGVybWFuZW50KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICAgICAgPGhyIC8+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtdGFic1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiY3VzdG9tZXJJbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYignY3VzdG9tZXJJbmZvJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNjdXN0b21lckluZm9cIj5DdXN0b21lciBJbmZvPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiYWRkaXRpb25hbEZpZWxkc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRUYWIoJ2FkZGl0aW9uYWxGaWVsZHMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIj5BZGRpdGlvbmFsIEZpZWxkczwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcIm1ldGVyc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRUYWIoJ21ldGVycycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbWV0ZXJzXCI+QXNzaWduZWQgTWV0ZXJzPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRoaXMuc3RhdGUuVGFiID09IFwibm90ZXNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdub3RlcycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbm90ZXNcIj5Ob3RlczwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLWNvbnRlbnRcIiBzdHlsZT17e21heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjM1LCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiY3VzdG9tZXJJbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJjdXN0b21lckluZm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDdXN0b21lckluZm9XaW5kb3cgQ3VzdG9tZXI9e3RoaXMuc3RhdGUuQ3VzdG9tZXJ9IHN0YXRlU2V0dGVyPXsocmVjb3JkKSA9PiB0aGlzLnNldFN0YXRlKHsgQ3VzdG9tZXI6IHJlY29yZCB9KX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJhZGRpdGlvbmFsRmllbGRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJhZGRpdGlvbmFsRmllbGRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QWRkaXRpb25hbEZpZWxkc1dpbmRvdyBJRD17dGhpcy5zdGF0ZS5DdXN0b21lci5JRH0gVHlwZT0nQ3VzdG9tZXInIFRhYj17dGhpcy5zdGF0ZS5UYWJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwibWV0ZXJzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJtZXRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDdXN0b21lck1ldGVyV2luZG93IEN1c3RvbWVyPXt0aGlzLnN0YXRlLkN1c3RvbWVyfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJub3Rlc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwibm90ZXNcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Tm90ZVdpbmRvdyBJRD17dGhpcy5wcm9wcy5DdXN0b21lcklEfSBUeXBlPSdDdXN0b21lcicgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBDb25uZWN0aW9uSW5mby50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOS8xMS8yMDE5IC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xuaW1wb3J0IEZvcm1UZXh0QXJlYSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1UZXh0QXJlYSc7XG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbWVySW5mb1dpbmRvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IEN1c3RvbWVyOiBTeXN0ZW1DZW50ZXIuQ3VzdG9tZXIsIHN0YXRlU2V0dGVyOiAoY3VzdG9tZXI6IFN5c3RlbUNlbnRlci5DdXN0b21lcikgPT4gdm9pZCB9LCB7IEN1c3RvbWVyOiBTeXN0ZW1DZW50ZXIuQ3VzdG9tZXJ9LCB7fT4ge1xuICAgIGpxdWVyeUhhbmRsZTogSlF1ZXJ5LmpxWEhSO1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIEN1c3RvbWVyOiB0aGlzLnByb3BzLkN1c3RvbWVyXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWxpZCA9IHRoaXMudmFsaWQuYmluZCh0aGlzKTtcbiAgICB9XG5cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDdXN0b21lcjogbmV4dFByb3BzLkN1c3RvbWVyfSlcbiAgICB9XG5cbiAgICB1cGRhdGVDdXN0b21lcigpOiBKUXVlcnkuanFYSFIge1xuICAgICAgICB2YXIgY3VzdG9tZXIgPSBfLmNsb25lKHRoaXMuc3RhdGUuQ3VzdG9tZXIpO1xuXG4gICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9DdXN0b21lci9VcGRhdGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLkN1c3RvbWVyKSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgfSkuZG9uZSgoTG9jYXRpb25JRDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgIHRoaXMucHJvcHMuc3RhdGVTZXR0ZXIoY3VzdG9tZXIpO1xuICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhbGlkKGZpZWxkOiBrZXlvZiAoU3lzdGVtQ2VudGVyLkN1c3RvbWVyKSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmllbGQgPT0gJ0FjY291bnROYW1lJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkN1c3RvbWVyLkFjY291bnROYW1lICE9IG51bGwgJiYgdGhpcy5zdGF0ZS5DdXN0b21lci5BY2NvdW50TmFtZS5sZW5ndGggPiAwICYmIHRoaXMuc3RhdGUuQ3VzdG9tZXIuQWNjb3VudE5hbWUubGVuZ3RoIDw9IDI1O1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmFtZScpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5DdXN0b21lci5OYW1lID09IG51bGwgfHwgdGhpcy5zdGF0ZS5DdXN0b21lci5OYW1lLmxlbmd0aCA8PSAxMDA7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdQaG9uZScpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5DdXN0b21lci5QaG9uZSA9PSBudWxsIHx8IHRoaXMuc3RhdGUuQ3VzdG9tZXIuUGhvbmUubGVuZ3RoIDw9IDIwO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRGVzY3JpcHRpb24nKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuQ3VzdG9tZXIuRGVzY3JpcHRpb24gPT0gbnVsbCB8fCB0aGlzLnN0YXRlLkN1c3RvbWVyLkRlc2NyaXB0aW9uLmxlbmd0aCA8PSAyMDA7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkN1c3RvbWVyIEluZm9ybWF0aW9uOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuQ3VzdG9tZXI+IFJlY29yZD17dGhpcy5zdGF0ZS5DdXN0b21lcn0gRmllbGQ9eydBY2NvdW50TmFtZSd9IEZlZWRiYWNrPXsnQWNjb3VudE5hbWUgb2YgbGVzcyB0aGFuIDI1IGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5zZXRTdGF0ZSh7Q3VzdG9tZXI6IHJlY29yZH0pfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLkN1c3RvbWVyPiBSZWNvcmQ9e3RoaXMuc3RhdGUuQ3VzdG9tZXJ9IEZpZWxkPXsnTmFtZSd9IEZlZWRiYWNrPXsnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAxMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXsocmVjb3JkKSA9PiB0aGlzLnNldFN0YXRlKHsgQ3VzdG9tZXI6IHJlY29yZCB9KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5DdXN0b21lcj4gUmVjb3JkPXt0aGlzLnN0YXRlLkN1c3RvbWVyfSBGaWVsZD17J1Bob25lJ30gRmVlZGJhY2s9eydQaG9uZSBtdXN0IGJlIGxlc3MgdGhhbiAyMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMuc2V0U3RhdGUoeyBDdXN0b21lcjogcmVjb3JkIH0pfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtVGV4dEFyZWE8U3lzdGVtQ2VudGVyLkN1c3RvbWVyPiBSb3dzPXszfSBSZWNvcmQ9e3RoaXMuc3RhdGUuQ3VzdG9tZXJ9IEZpZWxkPXsnRGVzY3JpcHRpb24nfSBGZWVkYmFjaz17J0Rlc2NyaXB0aW9uIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMuc2V0U3RhdGUoeyBDdXN0b21lcjogcmVjb3JkIH0pfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlQ3VzdG9tZXIoKX0gaGlkZGVuPXt0aGlzLnN0YXRlLkN1c3RvbWVyLklEID09IDB9IGRpc2FibGVkPXt0aGlzLnN0YXRlLkN1c3RvbWVyID09IHRoaXMucHJvcHMuQ3VzdG9tZXJ9PlVwZGF0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgQ3VzdG9tZXI6IHRoaXMucHJvcHMuQ3VzdG9tZXIgfSl9IGRpc2FibGVkPXt0aGlzLnN0YXRlLkN1c3RvbWVyID09IHRoaXMucHJvcHMuQ3VzdG9tZXJ9PlJlc2V0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIEN1c3RvbWVyTWV0ZXIudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDIvMDQvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgU3lzdGVtQ2VudGVyLCBQUVZpZXcgfSBmcm9tICcuLi9nbG9iYWwnO1xuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21lck1ldGVyV2luZG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgQ3VzdG9tZXI6IFN5c3RlbUNlbnRlci5DdXN0b21lciB9LCB7IFNpdGVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuQ3VzdG9tZXJBY2Nlc3M+LCBBbGxTaXRlczogQXJyYXk8UFFWaWV3LlNpdGU+LCBTZWFyY2hUZXh0OiBzdHJpbmcsIFNlbGVjdGVkU2l0ZXM6IEFycmF5PG51bWJlcj4gfSwge30+e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIFNpdGVzOiBbXSxcbiAgICAgICAgICAgIEFsbFNpdGVzOiBbXSxcbiAgICAgICAgICAgIFNlbGVjdGVkU2l0ZXM6W10sXG4gICAgICAgICAgICBTZWFyY2hUZXh0OiAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZXRTaXRlcyA9IHRoaXMuZ2V0U2l0ZXMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hZGRTaXRlcyA9IHRoaXMuYWRkU2l0ZXMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRTaXRlcygpO1xuICAgICAgICB0aGlzLmdldEFsbFNpdGVzKCk7XG4gICAgfVxuXG4gICAgZ2V0U2l0ZXMoKTogdm9pZCB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL0N1c3RvbWVyQWNjZXNzLyR7dGhpcy5wcm9wcy5DdXN0b21lci5JRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgoc2l0ZXM6IEFycmF5PFN5c3RlbUNlbnRlci5DdXN0b21lckFjY2Vzcz4pID0+IHRoaXMuc2V0U3RhdGUoeyBTaXRlczogIHNpdGVzfSkpO1xuICAgIH1cblxuICAgIGFkZFNpdGVzKCk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvQ3VzdG9tZXJBY2Nlc3MvQWRkTXVsdGlwbGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuU2VsZWN0ZWRTaXRlcy5tYXAoc3MgPT4geyByZXR1cm4geyBJRDogMCwgQ3VzdG9tZXJJRDogdGhpcy5wcm9wcy5DdXN0b21lci5JRCwgUFFWaWV3U2l0ZUlEOiBwYXJzZUludChzcy50b1N0cmluZygpKSB9IGFzIFN5c3RlbUNlbnRlci5DdXN0b21lckFjY2Vzc30pKSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRTaXRlcygpO1xuICAgICAgICB9KS5mYWlsKG1zZyA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTaXRlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTs7XG4gICAgfVxuXG4gICAgZ2V0QWxsU2l0ZXMoKTogdm9pZCB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvUFFWaWV3L1NpdGUvYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKHNpdGVzOiBBcnJheTxQUVZpZXcuU2l0ZT4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBbGxTaXRlczogXy5vcmRlckJ5KHNpdGVzLCBbJ25hbWUnXSwgWydhc2MnXSkgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIGRlbGV0ZUN1c3RvbW1lckFjY2VzcyhyZWNvcmQ6IFN5c3RlbUNlbnRlci5DdXN0b21lckFjY2Vzcyk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9DdXN0b21lckFjY2Vzcy9EZWxldGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHJlY29yZCksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0U2l0ZXMoKTtcbiAgICAgICAgfSkuZmFpbChtc2cgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U2l0ZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7O1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5TaXRlczo8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA0MjEsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNDIxLCBwYWRkaW5nOiAwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+PHRyPjx0aD5Bc3NpZ25lZCBTaXRlczo8L3RoPjx0aD48L3RoPjwvdHI+PC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5BbGxTaXRlcy5sZW5ndGggPiAwID8gdGhpcy5zdGF0ZS5TaXRlcy5tYXAoKHNpdGUsIGkpID0+IDx0ciBrZXk9e2l9Pjx0ZD57dGhpcy5zdGF0ZS5BbGxTaXRlcy5maW5kKGFsbHNpdGUgPT4gYWxsc2l0ZS5pZCA9PSBzaXRlLlBRVmlld1NpdGVJRCkubmFtZX08L3RkPjx0ZD48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlQ3VzdG9tbWVyQWNjZXNzKHNpdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj48L3RkPjwvdHI+KSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmaWx0ZXIgZm9yIHNlbGVjdCBib3ggLi4uXCIgdmFsdWU9e3RoaXMuc3RhdGUuU2VhcmNoVGV4dH0gb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtTZWFyY2hUZXh0OiBlLnRhcmdldC52YWx1ZSB9KX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgc3R5bGU9e3sgcGFkZGluZ1RvcDogNSwgaGVpZ2h0OiAnY2FsYygxMDAlIC0gMzVweCknIH19IG11bHRpcGxlIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IFNlbGVjdGVkU2l0ZXM6ICQoZS50YXJnZXQpLnZhbCgpIGFzIGFueSB9KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLkFsbFNpdGVzLmZpbHRlcihhbGxzaXRlID0+IGFsbHNpdGUubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5zdGF0ZS5TZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCkpID49IDApLm1hcChhbGxzaXRlID0+IDxvcHRpb24ga2V5PXthbGxzaXRlLmlkfSB2YWx1ZT17YWxsc2l0ZS5pZH0gaGlkZGVuPXt0aGlzLnN0YXRlLlNpdGVzLmZpbmQocyA9PiBzLlBRVmlld1NpdGVJRCA9PSBhbGxzaXRlLmlkKSAhPSBudWxsfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5TaXRlcy5maW5kKHMgPT4gcy5QUVZpZXdTaXRlSUQgPT0gYWxsc2l0ZS5pZCkgIT0gbnVsbH0+e2FsbHNpdGUubmFtZX08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMuYWRkU2l0ZXN9PkFkZCBTaXRlczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICApO1xuICAgIH1cblxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9