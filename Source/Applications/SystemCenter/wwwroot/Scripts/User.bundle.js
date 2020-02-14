(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["User"],{

/***/ "./TSX/SystemCenter/User/User.tsx":
/*!****************************************!*\
  !*** ./TSX/SystemCenter/User/User.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserInfo */ "./TSX/SystemCenter/User/UserInfo.tsx");
/* harmony import */ var _UserPermissions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserPermissions */ "./TSX/SystemCenter/User/UserPermissions.tsx");
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



var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            User: null,
            Tab: _this.getTab()
        };
        return _this;
    }
    User.prototype.getTab = function () {
        if (sessionStorage.hasOwnProperty('User.Tab'))
            return JSON.parse(sessionStorage.getItem('User.Tab'));
        else
            return 'userInfo';
    };
    User.prototype.getUser = function () {
        var _this = this;
        if (this.props.UserID == undefined)
            return;
        $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/UserAccount/One/" + this.props.UserID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (data) { return _this.setState({ User: data }); });
    };
    User.prototype.deleteUser = function () {
        return $.ajax({
            type: "DELETE",
            url: homePath + "api/SystemCenter/UserAccount/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.User),
            dataType: 'json',
            cache: true,
            async: true
        });
    };
    User.prototype.setTab = function (tab) {
        sessionStorage.setItem('User.Tab', JSON.stringify(tab));
        this.setState({ Tab: tab });
    };
    User.prototype.componentDidMount = function () {
        this.getUser();
    };
    User.prototype.componentWillUnmount = function () {
    };
    User.prototype.render = function () {
        var _this = this;
        if (this.state.User == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, this.state.User != null ? this.state.User.FirstName + " " + this.state.User.LastName : '')),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", hidden: this.state.User == null, onClick: function () { return _this.deleteUser().done(function () { return window.location.href = homePath + 'index.cshtml?name=Users'; }); } }, "Delete User (Permanent)"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "userInfo" ? " active" : ""), onClick: function () { return _this.setTab('userInfo'); }, "data-toggle": "tab", href: "#userInfo" }, "User Info")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "permissions" ? " active" : ""), onClick: function () { return _this.setTab('permissions'); }, "data-toggle": "tab" }, "Permissions"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 235, overflow: 'hidden' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "userInfo" ? " active" : "fade"), id: "userInfo" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_UserInfo__WEBPACK_IMPORTED_MODULE_1__["default"], { User: this.state.User, stateSetter: function (record) { return _this.setState({ User: record }); } })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "permissions" ? " active" : "fade"), id: "permissions" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_UserPermissions__WEBPACK_IMPORTED_MODULE_2__["default"], { User: this.state.User })))));
    };
    return User;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (User);


/***/ }),

/***/ "./TSX/SystemCenter/User/UserInfo.tsx":
/*!********************************************!*\
  !*** ./TSX/SystemCenter/User/UserInfo.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormCheckBox */ "./TSX/SystemCenter/CommonComponents/FormCheckBox.tsx");
/* harmony import */ var _CommonComponents_FormDatePicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/FormDatePicker */ "./TSX/SystemCenter/CommonComponents/FormDatePicker.tsx");
/* harmony import */ var _TS_Services_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../TS/Services/User */ "./TS/Services/User.ts");
/* harmony import */ var _CommonComponents_FormSelect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommonComponents/FormSelect */ "./TSX/SystemCenter/CommonComponents/FormSelect.tsx");
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







var UserInfoWindow = /** @class */ (function (_super) {
    __extends(UserInfoWindow, _super);
    function UserInfoWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            User: _this.props.User,
            UserValidation: 'Invalid',
            Roles: [],
            TSCs: []
        };
        return _this;
    }
    UserInfoWindow.prototype.componentDidMount = function () {
        var _this = this;
        var handle2 = Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["getRoles"])();
        handle2.done(function (rs) { return _this.setState({ Roles: rs }); });
        var handle3 = Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["getTSCs"])();
        handle3.done(function (ts) { return _this.setState({ TSCs: ts }); });
        if (this.state.User.UseADAuthentication)
            this.validateUser(this.state.User.AccountName);
    };
    UserInfoWindow.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({ User: nextProps.User });
    };
    UserInfoWindow.prototype.updateUser = function () {
        var _this = this;
        var user = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.User);
        return $.ajax({
            type: "PATCH",
            url: homePath + "api/SystemCenter/UserAccount/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.User),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (LocationID) {
            _this.props.stateSetter(user);
        });
    };
    UserInfoWindow.prototype.validateUser = function (accountName) {
        return __awaiter(this, void 0, void 0, function () {
            var sid, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (accountName == null || accountName.length == 0) {
                            this.setState({ UserValidation: 'Invalid' });
                            return [2 /*return*/];
                        }
                        this.setState({ UserValidation: 'Resolving' });
                        return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["getSIDFromUserName"])(accountName)];
                    case 1:
                        sid = _a.sent();
                        if (!(accountName !== sid && accountName.countOccurrences("\\") < 2)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["getIsUser"])(sid)];
                    case 2:
                        result = _a.sent();
                        this.setState({ UserValidation: result ? 'Valid' : 'Unknown' });
                        return [3 /*break*/, 4];
                    case 3:
                        this.setState({ UserValidation: 'Invalid' });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserInfoWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "User Information:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'AccountName', Label: 'Name', Feedback: 'A Name of less than 200 characters is required.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) {
                                if (_this.state.User.UseADAuthentication)
                                    _this.validateUser(record.Name);
                                record.Name = record.AccountName;
                                _this.setState({ User: record });
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { position: 'absolute', top: 0, left: 100 }, hidden: !this.state.User.UseADAuthentication },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { id: "resolvingAccount", hidden: this.state.UserValidation != 'Resolving' },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { height: 10, width: 10, color: 'grey' }, className: "fa fa fa-spin fa-refresh" }),
                                "\u00A0",
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", { className: "small" }, "Resolving account details...")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { id: "accountValid", hidden: this.state.UserValidation != 'Valid' },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { height: 20, width: 20, color: 'green' }, className: "fa fa-check-circle" }),
                                "\u00A0",
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", { className: "small" }, "Resolved account name")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { id: "accountInvalid", hidden: this.state.UserValidation != 'Invalid' },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { height: 20, width: 20, color: 'red' }, className: "fa fa-times-circle" }),
                                "\u00A0",
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", { className: "small" }, "Cannot resolve account name")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { id: "accountUnknown", hidden: this.state.UserValidation != 'Unknown' },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { height: 20, width: 20, color: 'orange' }, className: "fa fa-exclamation-circle" }),
                                "\u00A0",
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", { className: "small" }, "Valid account name is not a user or Active Directory access is limited"))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col-xs-4" },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-check-inline" },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: "form-check-label" },
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-check-input', type: 'radio', checked: this.state.User.UseADAuthentication, onChange: function (e) {
                                                        var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.User);
                                                        record.UseADAuthentication = e.target.checked;
                                                        _this.setState({ User: record });
                                                    } }),
                                                "Active Directory User"))),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col-xs-4" },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-check-inline" },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: "form-check-label" },
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-check-input', type: 'radio', checked: !this.state.User.UseADAuthentication, onChange: function (e) {
                                                        var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.User);
                                                        record.UseADAuthentication = !e.target.checked;
                                                        _this.setState({ User: record });
                                                    } }),
                                                "Database User"))))),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body", hidden: !this.state.User.UseADAuthentication },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'FirstName', Label: 'First Name', Feedback: 'First Name must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'LastName', Label: 'Last Name', Feedback: 'Last Name must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'Title', Feedback: 'Title must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormSelect__WEBPACK_IMPORTED_MODULE_6__["default"], { Record: this.state.User, Field: 'RoleID', Label: 'Role', Options: this.state.Roles.map(function (rs) { return { Value: rs.ID.toString(), Label: rs.Name }; }), Setter: function (record) { return _this.setState({ User: record }); }, EmptyOption: true })),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormSelect__WEBPACK_IMPORTED_MODULE_6__["default"], { Record: this.state.User, Field: 'TSCID', Label: 'TSC', Options: this.state.TSCs.map(function (rs) { return { Value: rs.ID.toString(), Label: rs.Name }; }), Setter: function (record) { return _this.setState({ User: record }); }, EmptyOption: true }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'Phone', Feedback: 'Password must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'MobilePhone', Label: 'Mobile Phone', Feedback: 'Mobile Phone must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'Email', Feedback: 'Password must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } })))),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body", hidden: this.state.User.UseADAuthentication },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'Password', Feedback: 'Password must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'FirstName', Label: 'First Name', Feedback: 'First Name must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'LastName', Label: 'Last Name', Feedback: 'Last Name must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'Title', Feedback: 'Title must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormSelect__WEBPACK_IMPORTED_MODULE_6__["default"], { Record: this.state.User, Field: 'RoleID', Label: 'Role', Options: this.state.Roles.map(function (rs) { return { Value: rs.ID.toString(), Label: rs.Name }; }), Setter: function (record) { return _this.setState({ User: record }); }, EmptyOption: true })),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormSelect__WEBPACK_IMPORTED_MODULE_6__["default"], { Record: this.state.User, Field: 'TSCID', Label: 'TSC', Options: this.state.TSCs.map(function (rs) { return { Value: rs.ID.toString(), Label: rs.Name }; }), Setter: function (record) { return _this.setState({ User: record }); }, EmptyOption: true }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'Phone', Feedback: 'Password must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'MobilePhone', Label: 'Mobile Phone', Feedback: 'Mobile Phone must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.User, Field: 'Email', Feedback: 'Password must be less than 200 characters.', Valid: function (field) { return Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["validUserAccountField"])(_this.state.User, field); }, Setter: function (record) { return _this.setState({ User: record }); } }),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormDatePicker__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.User, Field: 'ChangePasswordOn', Label: 'Change Password On', Setter: function (record) { return _this.setState({ User: record }); } })))),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col-lg-2" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.User, Label: 'Locked Out', Field: 'LockedOut', Setter: function (record) { return _this.setState({ User: record }); } }),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.User, Label: 'Phone Confirmed', Field: 'PhoneConfirmed', Setter: function (record) { return _this.setState({ User: record }); } }),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.User, Label: 'Email Confirmed', Field: 'EmailConfirmed', Setter: function (record) { return _this.setState({ User: record }); } }),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.User, Field: 'Approved', Setter: function (record) { return _this.setState({ User: record }); } }),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.User, Field: 'ReceiveNotifications', Label: 'Receive Notifications', Setter: function (record) { return _this.setState({ User: record }); } }))))))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () { return _this.updateUser(); }, disabled: this.state.User == this.props.User }, "Update")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return _this.setState({ User: _this.props.User }); }, disabled: this.state.User == this.props.User }, "Reset")))));
    };
    return UserInfoWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (UserInfoWindow);


/***/ }),

/***/ "./TSX/SystemCenter/User/UserPermissions.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/User/UserPermissions.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserPermissionsWindow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/FormCheckBox */ "./TSX/SystemCenter/CommonComponents/FormCheckBox.tsx");
/* harmony import */ var _TS_Services_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../TS/Services/User */ "./TS/Services/User.ts");
//******************************************************************************************************
//  UserPermissions.tsx - Gbtc
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
//  02/07/2020 - Billy Ernest
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




function UserPermissionsWindow(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), scRoles = _a[0], setScRoles = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), xdaRoles = _b[0], setXdaRoles = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), changed = _c[0], setChanged = _c[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        GetData();
    }, []);
    function GetData() {
        return __awaiter(this, void 0, void 0, function () {
            var scrs, xdars, userScrs, userXdars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setChanged(false);
                        return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_3__["getSecurityRoles"])('SystemCenter')];
                    case 1:
                        scrs = _a.sent();
                        return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_3__["getSecurityRoles"])('OpenXDA')];
                    case 2:
                        xdars = _a.sent();
                        return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_3__["getSecurityRolesForUser"])(props.User.ID, 'SystemCenter')];
                    case 3:
                        userScrs = _a.sent();
                        return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_3__["getSecurityRolesForUser"])(props.User.ID, 'OpenXDA')];
                    case 4:
                        userXdars = _a.sent();
                        setScRoles(scrs.map(function (src) {
                            src.Assigned = userScrs.find(function (usrc) { return usrc.ApplicationRoleID == src.ID; }) != undefined;
                            return src;
                        }));
                        setXdaRoles(xdars.map(function (xrc) {
                            xrc.Assigned = userXdars.find(function (usrc) { return usrc.ApplicationRoleID == xrc.ID; }) != undefined;
                            return xrc;
                        }));
                        return [2 /*return*/];
                }
            });
        });
    }
    function UpdateData() {
        return __awaiter(this, void 0, void 0, function () {
            var done1, done2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_3__["updateSecurityRolesForUser"])('SystemCenter', scRoles.filter(function (scr) { return scr.Assigned; }).map(function (scr) { return { ID: '00000000-0000-0000-0000-000000000000', ApplicationRoleID: scr.ID, UserAccountID: props.User.ID }; }))];
                    case 1:
                        done1 = _a.sent();
                        return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_3__["updateSecurityRolesForUser"])('OpenXDA', xdaRoles.filter(function (scr) { return scr.Assigned; }).map(function (scr) { return { ID: '00000000-0000-0000-0000-000000000000', ApplicationRoleID: scr.ID, UserAccountID: props.User.ID }; }))];
                    case 2:
                        done2 = _a.sent();
                        GetData();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "User Permissions:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "System Center:"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null, scRoles.map(function (scr, i, array) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_2__["default"], { key: scr.ID, Record: scr, Field: 'Assigned', Label: scr.Name, Setter: function (record) {
                                scr.Assigned = record.Assigned;
                                var newArray = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](array);
                                setScRoles(newArray);
                                setChanged(true);
                            } }); })))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "OpenXDA:"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null, xdaRoles.map(function (scr, i, array) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_2__["default"], { key: scr.ID, Record: scr, Field: 'Assigned', Label: scr.Name, Setter: function (record) {
                                scr.Assigned = record.Assigned;
                                var newArray = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](array);
                                setXdaRoles(newArray);
                                setChanged(true);
                            } }); })))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () { return UpdateData(); }, disabled: !changed }, "Update")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return GetData(); }, disabled: !changed }, "Reset")))));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL1VzZXIvVXNlci50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Vc2VyL1VzZXJJbmZvLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL1VzZXIvVXNlclBlcm1pc3Npb25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RyxvQkFBb0I7QUFDcEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFHUztBQUNjO0FBSXREO0lBQWtDLHdCQUF1RjtJQUNySCxjQUFZLEtBQUssRUFBRSxPQUFPO1FBQTFCLFlBQ0ksa0JBQU0sS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQU14QjtRQUpHLEtBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFFO1NBQ3JCOztJQUNMLENBQUM7SUFFRCxxQkFBTSxHQUFOO1FBQ0ksSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUN6QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOztZQUV0RCxPQUFPLFVBQVUsQ0FBQztJQUMxQixDQUFDO0lBRUQsc0JBQU8sR0FBUDtRQUFBLGlC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Qiw2REFBSyxTQUFTLEVBQUMsZ0JBQWdCO2dCQUMzQixnRUFBUSxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsT0FBTyxFQUFFLGNBQU0saUJBQVUsRUFBRSxFQUFaLENBQVksRUFBRSxRQUFRLEVBQUUsQ0FBQyxPQUFPLGFBQWlCLENBQ2xHO1lBQ04sNkRBQUssU0FBUyxFQUFDLGdCQUFnQjtnQkFDM0IsZ0VBQVEsU0FBUyxFQUFDLGlCQUFpQixFQUFDLE9BQU8sRUFBRSxjQUFNLGNBQU8sRUFBRSxFQUFULENBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxPQUFPLFlBQWdCLENBQzlGLENBQ0osQ0FHSixDQUNULENBQUM7QUFFTixDQUFDIiwiZmlsZSI6IlVzZXIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE1ldGVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOC8yNy8yMDE5IC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBVc2VySW5mb1dpbmRvdyBmcm9tICcuL1VzZXJJbmZvJztcclxuaW1wb3J0IFVzZXJQZXJtaXNzaW9uc1dpbmRvdyBmcm9tICcuL1VzZXJQZXJtaXNzaW9ucyc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFVzZXJJRDogc3RyaW5nIH0sIHsgVXNlcjogU3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50LCBUYWI6IHN0cmluZ30sIHt9PntcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBVc2VyOiBudWxsLFxyXG4gICAgICAgICAgICBUYWI6IHRoaXMuZ2V0VGFiKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGFiKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdVc2VyLlRhYicpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdVc2VyLlRhYicpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAndXNlckluZm8nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuVXNlcklEID09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvVXNlckFjY291bnQvT25lLyR7dGhpcy5wcm9wcy5Vc2VySUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICB9KS5kb25lKChkYXRhOiBTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQpID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiBkYXRhIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVVc2VyKCk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9Vc2VyQWNjb3VudC9EZWxldGVgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuVXNlciksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhYih0YWI6c3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnVXNlci5UYWInLCBKU09OLnN0cmluZ2lmeSh0YWIpKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtUYWI6IHRhYn0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmdldFVzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuVXNlciA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNjMsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNjMsIG92ZXJmbG93OiAnaGlkZGVuJywgcGFkZGluZzogMTUgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj57dGhpcy5zdGF0ZS5Vc2VyICE9IG51bGwgPyBgJHt0aGlzLnN0YXRlLlVzZXIuRmlyc3ROYW1lfSAke3RoaXMuc3RhdGUuVXNlci5MYXN0TmFtZX1gICA6ICcnfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBwdWxsLXJpZ2h0XCIgaGlkZGVuPXt0aGlzLnN0YXRlLlVzZXIgPT0gbnVsbH0gb25DbGljaz17KCkgPT4gdGhpcy5kZWxldGVVc2VyKCkuZG9uZSgoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbD9uYW1lPVVzZXJzJyl9PkRlbGV0ZSBVc2VyIChQZXJtYW5lbnQpPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJ1c2VySW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRUYWIoJ3VzZXJJbmZvJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiN1c2VySW5mb1wiPlVzZXIgSW5mbzwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcInBlcm1pc3Npb25zXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYigncGVybWlzc2lvbnMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIj5QZXJtaXNzaW9uczwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiIHN0eWxlPXt7bWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMzUsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcInVzZXJJbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJ1c2VySW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VXNlckluZm9XaW5kb3cgVXNlcj17dGhpcy5zdGF0ZS5Vc2VyfSBzdGF0ZVNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5zZXRTdGF0ZSh7VXNlcjogcmVjb3JkfSl9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcInBlcm1pc3Npb25zXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJwZXJtaXNzaW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VXNlclBlcm1pc3Npb25zV2luZG93IFVzZXI9e3RoaXMuc3RhdGUuVXNlcn0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQ29ubmVjdGlvbkluZm8udHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMTksIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA5LzExLzIwMTkgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuaW1wb3J0IEZvcm1DaGVja0JveCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1DaGVja0JveCc7XHJcbmltcG9ydCBGb3JtRGF0ZVBpY2tlciBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1EYXRlUGlja2VyJztcclxuaW1wb3J0IHsgZ2V0U0lERnJvbVVzZXJOYW1lLCBnZXRJc1VzZXIsIHZhbGlkVXNlckFjY291bnRGaWVsZCwgZ2V0Um9sZXMsIGdldFRTQ3MgfSBmcm9tICcuLy4uLy4uLy4uL1RTL1NlcnZpY2VzL1VzZXInO1xyXG5pbXBvcnQgRm9ybVNlbGVjdCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1TZWxlY3QnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxudHlwZSBVc2VyVmFsaWRhdGlvbiA9ICdSZXNvbHZpbmcnIHwgJ1ZhbGlkJyB8ICdJbnZhbGlkJyB8ICdVbmtub3duJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvV2luZG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgVXNlcjogU3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50LCBzdGF0ZVNldHRlcjogKHVzZXI6IFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCkgPT4gdm9pZCB9LCB7IFVzZXI6IFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCwgVXNlclZhbGlkYXRpb246IFVzZXJWYWxpZGF0aW9uLCBSb2xlczogQXJyYXk8U3lzdGVtQ2VudGVyLlJvbGU+LCBUU0NzOiBBcnJheTxTeXN0ZW1DZW50ZXIuVFNDPn0sIHt9PiB7XHJcbiAgICBqcXVlcnlIYW5kbGU6IEpRdWVyeS5qcVhIUjtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFVzZXI6IHRoaXMucHJvcHMuVXNlcixcclxuICAgICAgICAgICAgVXNlclZhbGlkYXRpb246ICdJbnZhbGlkJyxcclxuICAgICAgICAgICAgUm9sZXM6IFtdLFxyXG4gICAgICAgICAgICBUU0NzOiBbXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZTIgPSBnZXRSb2xlcygpO1xyXG4gICAgICAgIGhhbmRsZTIuZG9uZShycyA9PiB0aGlzLnNldFN0YXRlKHsgUm9sZXM6IHJzIH0pKTtcclxuXHJcbiAgICAgICAgbGV0IGhhbmRsZTMgPSBnZXRUU0NzKCk7XHJcbiAgICAgICAgaGFuZGxlMy5kb25lKHRzID0+IHRoaXMuc2V0U3RhdGUoeyBUU0NzOiB0cyB9KSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc3RhdGUuVXNlci5Vc2VBREF1dGhlbnRpY2F0aW9uKVxyXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlVXNlcih0aGlzLnN0YXRlLlVzZXIuQWNjb3VudE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IG5leHRQcm9wcy5Vc2VyfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVVc2VyKCk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgdmFyIHVzZXIgPSBfLmNsb25lKHRoaXMuc3RhdGUuVXNlcik7XHJcblxyXG4gICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUEFUQ0hcIixcclxuICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvVXNlckFjY291bnQvVXBkYXRlYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuVXNlciksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgfSkuZG9uZSgoTG9jYXRpb25JRDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgdGhpcy5wcm9wcy5zdGF0ZVNldHRlcih1c2VyKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHZhbGlkYXRlVXNlcihhY2NvdW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGFjY291bnROYW1lID09IG51bGwgfHwgYWNjb3VudE5hbWUubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFVzZXJWYWxpZGF0aW9uOiAnSW52YWxpZCcgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBVc2VyVmFsaWRhdGlvbjogJ1Jlc29sdmluZycgfSk7XHJcblxyXG4gICAgICAgIGxldCBzaWQgPSBhd2FpdCBnZXRTSURGcm9tVXNlck5hbWUoYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIGlmIChhY2NvdW50TmFtZSAhPT0gc2lkICYmIGFjY291bnROYW1lLmNvdW50T2NjdXJyZW5jZXMoXCJcXFxcXCIpIDwgMikge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgZ2V0SXNVc2VyKHNpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBVc2VyVmFsaWRhdGlvbjogcmVzdWx0ID8gJ1ZhbGlkJyA6ICdVbmtub3duJyB9KTsgICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBVc2VyVmFsaWRhdGlvbjogJ0ludmFsaWQnIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5Vc2VyIEluZm9ybWF0aW9uOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnQWNjb3VudE5hbWUnfSBMYWJlbD0nTmFtZScgRmVlZGJhY2s9eydBIE5hbWUgb2YgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzIGlzIHJlcXVpcmVkLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17KHJlY29yZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLlVzZXIuVXNlQURBdXRoZW50aWNhdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZVVzZXIocmVjb3JkLk5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQuTmFtZSA9IHJlY29yZC5BY2NvdW50TmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgbGVmdDogMTAwIH19IGhpZGRlbj17IXRoaXMuc3RhdGUuVXNlci5Vc2VBREF1dGhlbnRpY2F0aW9ufT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cInJlc29sdmluZ0FjY291bnRcIiBoaWRkZW49e3RoaXMuc3RhdGUuVXNlclZhbGlkYXRpb24gICE9ICdSZXNvbHZpbmcnfT48aSBzdHlsZT17eyBoZWlnaHQ6IDEwLCB3aWR0aDogMTAsIGNvbG9yOiAnZ3JleScgfX0gY2xhc3NOYW1lPVwiZmEgZmEgZmEtc3BpbiBmYS1yZWZyZXNoXCI+PC9pPiZuYnNwOzxlbSBjbGFzc05hbWU9XCJzbWFsbFwiPlJlc29sdmluZyBhY2NvdW50IGRldGFpbHMuLi48L2VtPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cImFjY291bnRWYWxpZFwiIGhpZGRlbj17dGhpcy5zdGF0ZS5Vc2VyVmFsaWRhdGlvbiAgIT0gJ1ZhbGlkJ30+PGkgc3R5bGU9e3sgaGVpZ2h0OiAyMCwgd2lkdGg6IDIwLCBjb2xvcjogJ2dyZWVuJyB9fSBjbGFzc05hbWU9XCJmYSBmYS1jaGVjay1jaXJjbGVcIj48L2k+Jm5ic3A7PGVtIGNsYXNzTmFtZT1cInNtYWxsXCI+UmVzb2x2ZWQgYWNjb3VudCBuYW1lPC9lbT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJhY2NvdW50SW52YWxpZFwiIGhpZGRlbj17dGhpcy5zdGF0ZS5Vc2VyVmFsaWRhdGlvbiAgIT0gJ0ludmFsaWQnfT48aSBzdHlsZT17eyBoZWlnaHQ6IDIwLCB3aWR0aDogMjAsIGNvbG9yOiAncmVkJyB9fSBjbGFzc05hbWU9XCJmYSBmYS10aW1lcy1jaXJjbGVcIj48L2k+Jm5ic3A7PGVtIGNsYXNzTmFtZT1cInNtYWxsXCI+Q2Fubm90IHJlc29sdmUgYWNjb3VudCBuYW1lPC9lbT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJhY2NvdW50VW5rbm93blwiIGhpZGRlbj17dGhpcy5zdGF0ZS5Vc2VyVmFsaWRhdGlvbiAgIT0gJ1Vua25vd24nfT48aSBzdHlsZT17eyBoZWlnaHQ6IDIwLCB3aWR0aDogMjAsIGNvbG9yOiAnb3JhbmdlJyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+Jm5ic3A7PGVtIGNsYXNzTmFtZT1cInNtYWxsXCI+VmFsaWQgYWNjb3VudCBuYW1lIGlzIG5vdCBhIHVzZXIgb3IgQWN0aXZlIERpcmVjdG9yeSBhY2Nlc3MgaXMgbGltaXRlZDwvZW0+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tY2hlY2staW5saW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWNoZWNrLWxhYmVsXCI+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jaGVjay1pbnB1dCcgdHlwZT0ncmFkaW8nIGNoZWNrZWQ9e3RoaXMuc3RhdGUuVXNlci5Vc2VBREF1dGhlbnRpY2F0aW9ufSBvbkNoYW5nZT17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQ6IFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCA9IF8uY2xvbmUodGhpcy5zdGF0ZS5Vc2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC5Vc2VBREF1dGhlbnRpY2F0aW9uID0gZS50YXJnZXQuY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+QWN0aXZlIERpcmVjdG9yeSBVc2VyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1jaGVjay1pbmxpbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tY2hlY2stbGFiZWxcIj48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNoZWNrLWlucHV0JyB0eXBlPSdyYWRpbycgY2hlY2tlZD17IXRoaXMuc3RhdGUuVXNlci5Vc2VBREF1dGhlbnRpY2F0aW9ufSBvbkNoYW5nZT17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQ6IFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCA9IF8uY2xvbmUodGhpcy5zdGF0ZS5Vc2VyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC5Vc2VBREF1dGhlbnRpY2F0aW9uID0gIWUudGFyZ2V0LmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPkRhdGFiYXNlIFVzZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCIgaGlkZGVuPXshdGhpcy5zdGF0ZS5Vc2VyLlVzZUFEQXV0aGVudGljYXRpb259PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnRmlyc3ROYW1lJ30gTGFiZWw9J0ZpcnN0IE5hbWUnIEZlZWRiYWNrPXsnRmlyc3QgTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17ZmllbGQgPT4gdmFsaWRVc2VyQWNjb3VudEZpZWxkKHRoaXMuc3RhdGUuVXNlciwgZmllbGQpfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHtVc2VyOiByZWNvcmR9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnTGFzdE5hbWUnfSBMYWJlbD0nTGFzdCBOYW1lJyBGZWVkYmFjaz17J0xhc3QgTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17ZmllbGQgPT4gdmFsaWRVc2VyQWNjb3VudEZpZWxkKHRoaXMuc3RhdGUuVXNlciwgZmllbGQpfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHtVc2VyOiByZWNvcmR9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnVGl0bGUnfSBGZWVkYmFjaz17J1RpdGxlIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1TZWxlY3Q8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydSb2xlSUQnfSBMYWJlbD0nUm9sZScgT3B0aW9ucz17dGhpcy5zdGF0ZS5Sb2xlcy5tYXAocnMgPT4geyByZXR1cm4geyBWYWx1ZTogcnMuSUQudG9TdHJpbmcoKSwgTGFiZWw6IHJzLk5hbWUgfSB9KX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IHJlY29yZCB9KX0gRW1wdHlPcHRpb249e3RydWV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1TZWxlY3Q8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydUU0NJRCd9IExhYmVsPSdUU0MnIE9wdGlvbnM9e3RoaXMuc3RhdGUuVFNDcy5tYXAocnMgPT4geyByZXR1cm4geyBWYWx1ZTogcnMuSUQudG9TdHJpbmcoKSwgTGFiZWw6IHJzLk5hbWUgfSB9KX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IHJlY29yZCB9KX0gRW1wdHlPcHRpb249e3RydWV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J1Bob25lJ30gRmVlZGJhY2s9eydQYXNzd29yZCBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17ZmllbGQgPT4gdmFsaWRVc2VyQWNjb3VudEZpZWxkKHRoaXMuc3RhdGUuVXNlciwgZmllbGQpfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHtVc2VyOiByZWNvcmR9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnTW9iaWxlUGhvbmUnfSBMYWJlbD0nTW9iaWxlIFBob25lJyBGZWVkYmFjaz17J01vYmlsZSBQaG9uZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17ZmllbGQgPT4gdmFsaWRVc2VyQWNjb3VudEZpZWxkKHRoaXMuc3RhdGUuVXNlciwgZmllbGQpfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydFbWFpbCd9IEZlZWRiYWNrPXsnUGFzc3dvcmQgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e2ZpZWxkID0+IHZhbGlkVXNlckFjY291bnRGaWVsZCh0aGlzLnN0YXRlLlVzZXIsIGZpZWxkKX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IHJlY29yZCB9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiIGhpZGRlbj17dGhpcy5zdGF0ZS5Vc2VyLlVzZUFEQXV0aGVudGljYXRpb259PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnUGFzc3dvcmQnfSBGZWVkYmFjaz17J1Bhc3N3b3JkIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydGaXJzdE5hbWUnfSBMYWJlbD0nRmlyc3QgTmFtZScgRmVlZGJhY2s9eydGaXJzdCBOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydMYXN0TmFtZSd9IExhYmVsPSdMYXN0IE5hbWUnIEZlZWRiYWNrPXsnTGFzdCBOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydUaXRsZSd9IEZlZWRiYWNrPXsnVGl0bGUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e2ZpZWxkID0+IHZhbGlkVXNlckFjY291bnRGaWVsZCh0aGlzLnN0YXRlLlVzZXIsIGZpZWxkKX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IHJlY29yZCB9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVNlbGVjdDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J1JvbGVJRCd9IExhYmVsPSdSb2xlJyBPcHRpb25zPXt0aGlzLnN0YXRlLlJvbGVzLm1hcChycyA9PiB7IHJldHVybiB7IFZhbHVlOiBycy5JRC50b1N0cmluZygpLCBMYWJlbDogcnMuTmFtZSB9IH0pfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pfSBFbXB0eU9wdGlvbj17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVNlbGVjdDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J1RTQ0lEJ30gTGFiZWw9J1RTQycgT3B0aW9ucz17dGhpcy5zdGF0ZS5UU0NzLm1hcChycyA9PiB7IHJldHVybiB7IFZhbHVlOiBycy5JRC50b1N0cmluZygpLCBMYWJlbDogcnMuTmFtZSB9IH0pfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pfSBFbXB0eU9wdGlvbj17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnUGhvbmUnfSBGZWVkYmFjaz17J1Bhc3N3b3JkIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydNb2JpbGVQaG9uZSd9IExhYmVsPSdNb2JpbGUgUGhvbmUnIEZlZWRiYWNrPXsnTW9iaWxlIFBob25lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J0VtYWlsJ30gRmVlZGJhY2s9eydQYXNzd29yZCBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17ZmllbGQgPT4gdmFsaWRVc2VyQWNjb3VudEZpZWxkKHRoaXMuc3RhdGUuVXNlciwgZmllbGQpfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtRGF0ZVBpY2tlcjxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J0NoYW5nZVBhc3N3b3JkT24nfSBMYWJlbD0nQ2hhbmdlIFBhc3N3b3JkIE9uJyBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHtVc2VyOiByZWNvcmR9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNoZWNrQm94PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IExhYmVsPSdMb2NrZWQgT3V0JyBGaWVsZD0nTG9ja2VkT3V0JyBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHtVc2VyOiByZWNvcmR9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ2hlY2tCb3g8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gTGFiZWw9J1Bob25lIENvbmZpcm1lZCcgRmllbGQ9J1Bob25lQ29uZmlybWVkJyBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHtVc2VyOiByZWNvcmR9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ2hlY2tCb3g8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gTGFiZWw9J0VtYWlsIENvbmZpcm1lZCcgRmllbGQ9J0VtYWlsQ29uZmlybWVkJyBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHtVc2VyOiByZWNvcmR9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ2hlY2tCb3g8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9J0FwcHJvdmVkJyBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1DaGVja0JveDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD0nUmVjZWl2ZU5vdGlmaWNhdGlvbnMnIExhYmVsPSdSZWNlaXZlIE5vdGlmaWNhdGlvbnMnIFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZVVzZXIoKX0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuVXNlciA9PSB0aGlzLnByb3BzLlVzZXJ9PlVwZGF0ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogdGhpcy5wcm9wcy5Vc2VyIH0pfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5Vc2VyID09IHRoaXMucHJvcHMuVXNlcn0+UmVzZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgVXNlclBlcm1pc3Npb25zLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMi8wNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBGb3JtQ2hlY2tCb3ggZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtQ2hlY2tCb3gnO1xyXG5pbXBvcnQgeyBnZXRTZWN1cml0eVJvbGVzLCBnZXRTZWN1cml0eVJvbGVzRm9yVXNlciwgdXBkYXRlU2VjdXJpdHlSb2xlc0ZvclVzZXIgfSBmcm9tICcuLy4uLy4uLy4uL1RTL1NlcnZpY2VzL1VzZXInO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVzZXJQZXJtaXNzaW9uc1dpbmRvdyhwcm9wczogeyBVc2VyOiBTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQgfSkge1xyXG4gICAgY29uc3QgW3NjUm9sZXMsIHNldFNjUm9sZXNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U3lzdGVtQ2VudGVyLkFwcGxpY2F0aW9uUm9sZTxTeXN0ZW1DZW50ZXIuU3lzdGVtQ2VuZXRlclNlY3VyaXR5Um9sZU5hbWU+Pj4oW10pO1xyXG4gICAgY29uc3QgW3hkYVJvbGVzLCBzZXRYZGFSb2xlc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxTeXN0ZW1DZW50ZXIuQXBwbGljYXRpb25Sb2xlPFN5c3RlbUNlbnRlci5PcGVuWERBU2VjdXJpdHlSb2xlTmFtZT4+PihbXSk7XHJcbiAgICBjb25zdCBbY2hhbmdlZCwgc2V0Q2hhbmdlZF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBHZXREYXRhKCk7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gR2V0RGF0YSgpIHtcclxuICAgICAgICBzZXRDaGFuZ2VkKGZhbHNlKTtcclxuICAgICAgICBsZXQgc2NycyA9IGF3YWl0IGdldFNlY3VyaXR5Um9sZXM8U3lzdGVtQ2VudGVyLlN5c3RlbUNlbmV0ZXJTZWN1cml0eVJvbGVOYW1lPignU3lzdGVtQ2VudGVyJyk7XHJcbiAgICAgICAgbGV0IHhkYXJzID0gIGF3YWl0IGdldFNlY3VyaXR5Um9sZXM8U3lzdGVtQ2VudGVyLk9wZW5YREFTZWN1cml0eVJvbGVOYW1lPignT3BlblhEQScpO1xyXG4gICAgICAgIGxldCB1c2VyU2NycyA9IGF3YWl0IGdldFNlY3VyaXR5Um9sZXNGb3JVc2VyKHByb3BzLlVzZXIuSUQsICdTeXN0ZW1DZW50ZXInKTtcclxuICAgICAgICBsZXQgdXNlclhkYXJzID0gYXdhaXQgZ2V0U2VjdXJpdHlSb2xlc0ZvclVzZXIocHJvcHMuVXNlci5JRCwgJ09wZW5YREEnKTtcclxuXHJcbiAgICAgICAgc2V0U2NSb2xlcyhzY3JzLm1hcChzcmMgPT4ge1xyXG4gICAgICAgICAgICBzcmMuQXNzaWduZWQgPSB1c2VyU2Nycy5maW5kKHVzcmMgPT4gdXNyYy5BcHBsaWNhdGlvblJvbGVJRCA9PSBzcmMuSUQpICE9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgcmV0dXJuIHNyYztcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIHNldFhkYVJvbGVzKHhkYXJzLm1hcCh4cmMgPT4ge1xyXG4gICAgICAgICAgICB4cmMuQXNzaWduZWQgPSB1c2VyWGRhcnMuZmluZCh1c3JjID0+IHVzcmMuQXBwbGljYXRpb25Sb2xlSUQgPT0geHJjLklEKSAhPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiB4cmM7XHJcbiAgICAgICAgfSkpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIFVwZGF0ZURhdGEoKSB7XHJcbiAgICAgICAgbGV0IGRvbmUxID0gYXdhaXQgdXBkYXRlU2VjdXJpdHlSb2xlc0ZvclVzZXIoJ1N5c3RlbUNlbnRlcicsIHNjUm9sZXMuZmlsdGVyKHNjciA9PiBzY3IuQXNzaWduZWQpLm1hcChzY3IgPT4geyByZXR1cm4geyBJRDogJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCcsIEFwcGxpY2F0aW9uUm9sZUlEOiBzY3IuSUQsIFVzZXJBY2NvdW50SUQ6IHByb3BzLlVzZXIuSUQgfSBhcyBTeXN0ZW1DZW50ZXIuQXBwbGljYXRpb25Sb2xlVXNlckFjY291bnQgfSkpO1xyXG4gICAgICAgIGxldCBkb25lMiA9IGF3YWl0IHVwZGF0ZVNlY3VyaXR5Um9sZXNGb3JVc2VyKCdPcGVuWERBJywgeGRhUm9sZXMuZmlsdGVyKHNjciA9PiBzY3IuQXNzaWduZWQpLm1hcChzY3IgPT4geyByZXR1cm4geyBJRDogJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCcsIEFwcGxpY2F0aW9uUm9sZUlEOiBzY3IuSUQsIFVzZXJBY2NvdW50SUQ6IHByb3BzLlVzZXIuSUQgfSBhcyBTeXN0ZW1DZW50ZXIuQXBwbGljYXRpb25Sb2xlVXNlckFjY291bnQgfSkpO1xyXG4gICAgICAgIEdldERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlVzZXIgUGVybWlzc2lvbnM6PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzTmFtZT1cImJvcmRlclwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4JywgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT1cInctYXV0b1wiIHN0eWxlPXt7IGZvbnRTaXplOiAnbGFyZ2UnIH19PlN5c3RlbSBDZW50ZXI6PC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjUm9sZXMubWFwKChzY3IsIGksIGFycmF5KSA9PiA8Rm9ybUNoZWNrQm94PFN5c3RlbUNlbnRlci5BcHBsaWNhdGlvblJvbGU8U3lzdGVtQ2VudGVyLlN5c3RlbUNlbmV0ZXJTZWN1cml0eVJvbGVOYW1lPj4ga2V5PXtzY3IuSUR9IFJlY29yZD17c2NyfSBGaWVsZD0nQXNzaWduZWQnIExhYmVsPXtzY3IuTmFtZX0gU2V0dGVyPXsocmVjb3JkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3IuQXNzaWduZWQgPSByZWNvcmQuQXNzaWduZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3QXJyYXkgPSBfLmNsb25lKGFycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjUm9sZXMobmV3QXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2hhbmdlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldCBjbGFzc05hbWU9XCJib3JkZXJcIiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCcsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZCBjbGFzc05hbWU9XCJ3LWF1dG9cIiBzdHlsZT17eyBmb250U2l6ZTogJ2xhcmdlJyB9fT5PcGVuWERBOjwvbGVnZW5kPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4ZGFSb2xlcy5tYXAoKHNjciwgaSwgYXJyYXkpID0+IDxGb3JtQ2hlY2tCb3g8U3lzdGVtQ2VudGVyLkFwcGxpY2F0aW9uUm9sZTxTeXN0ZW1DZW50ZXIuT3BlblhEQVNlY3VyaXR5Um9sZU5hbWU+PiBrZXk9e3Njci5JRH0gUmVjb3JkPXtzY3J9IEZpZWxkPSdBc3NpZ25lZCcgTGFiZWw9e3Njci5OYW1lfSBTZXR0ZXI9eyhyZWNvcmQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjci5Bc3NpZ25lZCA9IHJlY29yZC5Bc3NpZ25lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdBcnJheSA9IF8uY2xvbmUoYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0WGRhUm9sZXMobmV3QXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2hhbmdlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoKSA9PiBVcGRhdGVEYXRhKCl9IGRpc2FibGVkPXshY2hhbmdlZH0+VXBkYXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9eygpID0+IEdldERhdGEoKX0gZGlzYWJsZWQ9eyFjaGFuZ2VkfT5SZXNldDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gICAgXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9