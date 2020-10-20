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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL1VzZXIvVXNlci50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Vc2VyL1VzZXJJbmZvLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL1VzZXIvVXNlclBlcm1pc3Npb25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RyxvQkFBb0I7QUFDcEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFHUztBQUNjO0FBSXREO0lBQWtDLHdCQUF1RjtJQUNySCxjQUFZLEtBQUssRUFBRSxPQUFPO1FBQTFCLFlBQ0ksa0JBQU0sS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQU14QjtRQUpHLEtBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFFO1NBQ3JCOztJQUNMLENBQUM7SUFFRCxxQkFBTSxHQUFOO1FBQ0ksSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUN6QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOztZQUV0RCxPQUFPLFVBQVUsQ0FBQztJQUMxQixDQUFDO0lBRUQsc0JBQU8sR0FBUDtRQUFBLGlC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Qiw2REFBSyxTQUFTLEVBQUMsZ0JBQWdCO2dCQUMzQixnRUFBUSxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsT0FBTyxFQUFFLGNBQU0saUJBQVUsRUFBRSxFQUFaLENBQVksRUFBRSxRQUFRLEVBQUUsQ0FBQyxPQUFPLGFBQWlCLENBQ2xHO1lBQ04sNkRBQUssU0FBUyxFQUFDLGdCQUFnQjtnQkFDM0IsZ0VBQVEsU0FBUyxFQUFDLGlCQUFpQixFQUFDLE9BQU8sRUFBRSxjQUFNLGNBQU8sRUFBRSxFQUFULENBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxPQUFPLFlBQWdCLENBQzlGLENBQ0osQ0FHSixDQUNULENBQUM7QUFFTixDQUFDIiwiZmlsZSI6IlVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTWV0ZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMTksIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA4LzI3LzIwMTkgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IFVzZXJJbmZvV2luZG93IGZyb20gJy4vVXNlckluZm8nO1xyXG5pbXBvcnQgVXNlclBlcm1pc3Npb25zV2luZG93IGZyb20gJy4vVXNlclBlcm1pc3Npb25zJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgVXNlcklEOiBzdHJpbmcgfSwgeyBVc2VyOiBTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQsIFRhYjogc3RyaW5nfSwge30+e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFVzZXI6IG51bGwsXHJcbiAgICAgICAgICAgIFRhYjogdGhpcy5nZXRUYWIoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWIoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ1VzZXIuVGFiJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1VzZXIuVGFiJykpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuICd1c2VySW5mbyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5Vc2VySUQgPT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9Vc2VyQWNjb3VudC9PbmUvJHt0aGlzLnByb3BzLlVzZXJJRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgIH0pLmRvbmUoKGRhdGE6IFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCkgPT4gdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IGRhdGEgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVVzZXIoKTogSlF1ZXJ5LmpxWEhSIHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL1VzZXJBY2NvdW50L0RlbGV0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5Vc2VyKSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGFiKHRhYjpzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdVc2VyLlRhYicsIEpTT04uc3RyaW5naWZ5KHRhYikpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1RhYjogdGFifSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0VXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5Vc2VyID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2MywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2Mywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nOiAxNSB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPnt0aGlzLnN0YXRlLlVzZXIgIT0gbnVsbCA/IGAke3RoaXMuc3RhdGUuVXNlci5GaXJzdE5hbWV9ICR7dGhpcy5zdGF0ZS5Vc2VyLkxhc3ROYW1lfWAgIDogJyd9PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIHB1bGwtcmlnaHRcIiBoaWRkZW49e3RoaXMuc3RhdGUuVXNlciA9PSBudWxsfSBvbkNsaWNrPXsoKSA9PiB0aGlzLmRlbGV0ZVVzZXIoKS5kb25lKCgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9VXNlcnMnKX0+RGVsZXRlIFVzZXIgKFBlcm1hbmVudCk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICAgICAgPGhyIC8+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtdGFic1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcInVzZXJJbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYigndXNlckluZm8nKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI3VzZXJJbmZvXCI+VXNlciBJbmZvPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRoaXMuc3RhdGUuVGFiID09IFwicGVybWlzc2lvbnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdwZXJtaXNzaW9ucycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiPlBlcm1pc3Npb25zPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCIgc3R5bGU9e3ttYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDIzNSwgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwidXNlckluZm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cInVzZXJJbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxVc2VySW5mb1dpbmRvdyBVc2VyPXt0aGlzLnN0YXRlLlVzZXJ9IHN0YXRlU2V0dGVyPXsocmVjb3JkKSA9PiB0aGlzLnNldFN0YXRlKHtVc2VyOiByZWNvcmR9KX0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwicGVybWlzc2lvbnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cInBlcm1pc3Npb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxVc2VyUGVybWlzc2lvbnNXaW5kb3cgVXNlcj17dGhpcy5zdGF0ZS5Vc2VyfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDb25uZWN0aW9uSW5mby50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDkvMTEvMjAxOSAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5pbXBvcnQgRm9ybUNoZWNrQm94IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUNoZWNrQm94JztcclxuaW1wb3J0IEZvcm1EYXRlUGlja2VyIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybURhdGVQaWNrZXInO1xyXG5pbXBvcnQgeyBnZXRTSURGcm9tVXNlck5hbWUsIGdldElzVXNlciwgdmFsaWRVc2VyQWNjb3VudEZpZWxkLCBnZXRSb2xlcywgZ2V0VFNDcyB9IGZyb20gJy4vLi4vLi4vLi4vVFMvU2VydmljZXMvVXNlcic7XHJcbmltcG9ydCBGb3JtU2VsZWN0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybVNlbGVjdCc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG50eXBlIFVzZXJWYWxpZGF0aW9uID0gJ1Jlc29sdmluZycgfCAnVmFsaWQnIHwgJ0ludmFsaWQnIHwgJ1Vua25vd24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm9XaW5kb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBVc2VyOiBTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQsIHN0YXRlU2V0dGVyOiAodXNlcjogU3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50KSA9PiB2b2lkIH0sIHsgVXNlcjogU3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50LCBVc2VyVmFsaWRhdGlvbjogVXNlclZhbGlkYXRpb24sIFJvbGVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuUm9sZT4sIFRTQ3M6IEFycmF5PFN5c3RlbUNlbnRlci5UU0M+fSwge30+IHtcclxuICAgIGpxdWVyeUhhbmRsZTogSlF1ZXJ5LmpxWEhSO1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgVXNlcjogdGhpcy5wcm9wcy5Vc2VyLFxyXG4gICAgICAgICAgICBVc2VyVmFsaWRhdGlvbjogJ0ludmFsaWQnLFxyXG4gICAgICAgICAgICBSb2xlczogW10sXHJcbiAgICAgICAgICAgIFRTQ3M6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBsZXQgaGFuZGxlMiA9IGdldFJvbGVzKCk7XHJcbiAgICAgICAgaGFuZGxlMi5kb25lKHJzID0+IHRoaXMuc2V0U3RhdGUoeyBSb2xlczogcnMgfSkpO1xyXG5cclxuICAgICAgICBsZXQgaGFuZGxlMyA9IGdldFRTQ3MoKTtcclxuICAgICAgICBoYW5kbGUzLmRvbmUodHMgPT4gdGhpcy5zZXRTdGF0ZSh7IFRTQ3M6IHRzIH0pKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5Vc2VyLlVzZUFEQXV0aGVudGljYXRpb24pXHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVVc2VyKHRoaXMuc3RhdGUuVXNlci5BY2NvdW50TmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgVXNlcjogbmV4dFByb3BzLlVzZXJ9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVVzZXIoKTogSlF1ZXJ5LmpxWEhSIHtcclxuICAgICAgICB2YXIgdXNlciA9IF8uY2xvbmUodGhpcy5zdGF0ZS5Vc2VyKTtcclxuXHJcbiAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9Vc2VyQWNjb3VudC9VcGRhdGVgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5Vc2VyKSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICB9KS5kb25lKChMb2NhdGlvbklEOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICB0aGlzLnByb3BzLnN0YXRlU2V0dGVyKHVzZXIpO1xyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgdmFsaWRhdGVVc2VyKGFjY291bnROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoYWNjb3VudE5hbWUgPT0gbnVsbCB8fCBhY2NvdW50TmFtZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgVXNlclZhbGlkYXRpb246ICdJbnZhbGlkJyB9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFVzZXJWYWxpZGF0aW9uOiAnUmVzb2x2aW5nJyB9KTtcclxuXHJcbiAgICAgICAgbGV0IHNpZCA9IGF3YWl0IGdldFNJREZyb21Vc2VyTmFtZShhY2NvdW50TmFtZSk7XHJcbiAgICAgICAgaWYgKGFjY291bnROYW1lICE9PSBzaWQgJiYgYWNjb3VudE5hbWUuY291bnRPY2N1cnJlbmNlcyhcIlxcXFxcIikgPCAyKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBnZXRJc1VzZXIoc2lkKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFVzZXJWYWxpZGF0aW9uOiByZXN1bHQgPyAnVmFsaWQnIDogJ1Vua25vd24nIH0pOyAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFVzZXJWYWxpZGF0aW9uOiAnSW52YWxpZCcgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlVzZXIgSW5mb3JtYXRpb246PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydBY2NvdW50TmFtZSd9IExhYmVsPSdOYW1lJyBGZWVkYmFjaz17J0EgTmFtZSBvZiBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e2ZpZWxkID0+IHZhbGlkVXNlckFjY291bnRGaWVsZCh0aGlzLnN0YXRlLlVzZXIsIGZpZWxkKX0gU2V0dGVyPXsocmVjb3JkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuVXNlci5Vc2VBREF1dGhlbnRpY2F0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlVXNlcihyZWNvcmQuTmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC5OYW1lID0gcmVjb3JkLkFjY291bnROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBsZWZ0OiAxMDAgfX0gaGlkZGVuPXshdGhpcy5zdGF0ZS5Vc2VyLlVzZUFEQXV0aGVudGljYXRpb259PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwicmVzb2x2aW5nQWNjb3VudFwiIGhpZGRlbj17dGhpcy5zdGF0ZS5Vc2VyVmFsaWRhdGlvbiAgIT0gJ1Jlc29sdmluZyd9PjxpIHN0eWxlPXt7IGhlaWdodDogMTAsIHdpZHRoOiAxMCwgY29sb3I6ICdncmV5JyB9fSBjbGFzc05hbWU9XCJmYSBmYSBmYS1zcGluIGZhLXJlZnJlc2hcIj48L2k+Jm5ic3A7PGVtIGNsYXNzTmFtZT1cInNtYWxsXCI+UmVzb2x2aW5nIGFjY291bnQgZGV0YWlscy4uLjwvZW0+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiYWNjb3VudFZhbGlkXCIgaGlkZGVuPXt0aGlzLnN0YXRlLlVzZXJWYWxpZGF0aW9uICAhPSAnVmFsaWQnfT48aSBzdHlsZT17eyBoZWlnaHQ6IDIwLCB3aWR0aDogMjAsIGNvbG9yOiAnZ3JlZW4nIH19IGNsYXNzTmFtZT1cImZhIGZhLWNoZWNrLWNpcmNsZVwiPjwvaT4mbmJzcDs8ZW0gY2xhc3NOYW1lPVwic21hbGxcIj5SZXNvbHZlZCBhY2NvdW50IG5hbWU8L2VtPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cImFjY291bnRJbnZhbGlkXCIgaGlkZGVuPXt0aGlzLnN0YXRlLlVzZXJWYWxpZGF0aW9uICAhPSAnSW52YWxpZCd9PjxpIHN0eWxlPXt7IGhlaWdodDogMjAsIHdpZHRoOiAyMCwgY29sb3I6ICdyZWQnIH19IGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT4mbmJzcDs8ZW0gY2xhc3NOYW1lPVwic21hbGxcIj5DYW5ub3QgcmVzb2x2ZSBhY2NvdW50IG5hbWU8L2VtPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cImFjY291bnRVbmtub3duXCIgaGlkZGVuPXt0aGlzLnN0YXRlLlVzZXJWYWxpZGF0aW9uICAhPSAnVW5rbm93bid9PjxpIHN0eWxlPXt7IGhlaWdodDogMjAsIHdpZHRoOiAyMCwgY29sb3I6ICdvcmFuZ2UnIH19IGNsYXNzTmFtZT1cImZhIGZhLWV4Y2xhbWF0aW9uLWNpcmNsZVwiPjwvaT4mbmJzcDs8ZW0gY2xhc3NOYW1lPVwic21hbGxcIj5WYWxpZCBhY2NvdW50IG5hbWUgaXMgbm90IGEgdXNlciBvciBBY3RpdmUgRGlyZWN0b3J5IGFjY2VzcyBpcyBsaW1pdGVkPC9lbT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1jaGVjay1pbmxpbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tY2hlY2stbGFiZWxcIj48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNoZWNrLWlucHV0JyB0eXBlPSdyYWRpbycgY2hlY2tlZD17dGhpcy5zdGF0ZS5Vc2VyLlVzZUFEQXV0aGVudGljYXRpb259IG9uQ2hhbmdlPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZDogU3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50ID0gXy5jbG9uZSh0aGlzLnN0YXRlLlVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLlVzZUFEQXV0aGVudGljYXRpb24gPSBlLnRhcmdldC5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IHJlY29yZCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5BY3RpdmUgRGlyZWN0b3J5IFVzZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWNoZWNrLWlubGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1jaGVjay1sYWJlbFwiPjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY2hlY2staW5wdXQnIHR5cGU9J3JhZGlvJyBjaGVja2VkPXshdGhpcy5zdGF0ZS5Vc2VyLlVzZUFEQXV0aGVudGljYXRpb259IG9uQ2hhbmdlPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZDogU3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50ID0gXy5jbG9uZSh0aGlzLnN0YXRlLlVzZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLlVzZUFEQXV0aGVudGljYXRpb24gPSAhZS50YXJnZXQuY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+RGF0YWJhc2UgVXNlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIiBoaWRkZW49eyF0aGlzLnN0YXRlLlVzZXIuVXNlQURBdXRoZW50aWNhdGlvbn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydGaXJzdE5hbWUnfSBMYWJlbD0nRmlyc3QgTmFtZScgRmVlZGJhY2s9eydGaXJzdCBOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydMYXN0TmFtZSd9IExhYmVsPSdMYXN0IE5hbWUnIEZlZWRiYWNrPXsnTGFzdCBOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydUaXRsZSd9IEZlZWRiYWNrPXsnVGl0bGUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e2ZpZWxkID0+IHZhbGlkVXNlckFjY291bnRGaWVsZCh0aGlzLnN0YXRlLlVzZXIsIGZpZWxkKX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IHJlY29yZCB9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVNlbGVjdDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J1JvbGVJRCd9IExhYmVsPSdSb2xlJyBPcHRpb25zPXt0aGlzLnN0YXRlLlJvbGVzLm1hcChycyA9PiB7IHJldHVybiB7IFZhbHVlOiBycy5JRC50b1N0cmluZygpLCBMYWJlbDogcnMuTmFtZSB9IH0pfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pfSBFbXB0eU9wdGlvbj17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVNlbGVjdDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J1RTQ0lEJ30gTGFiZWw9J1RTQycgT3B0aW9ucz17dGhpcy5zdGF0ZS5UU0NzLm1hcChycyA9PiB7IHJldHVybiB7IFZhbHVlOiBycy5JRC50b1N0cmluZygpLCBMYWJlbDogcnMuTmFtZSB9IH0pfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pfSBFbXB0eU9wdGlvbj17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnUGhvbmUnfSBGZWVkYmFjaz17J1Bhc3N3b3JkIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydNb2JpbGVQaG9uZSd9IExhYmVsPSdNb2JpbGUgUGhvbmUnIEZlZWRiYWNrPXsnTW9iaWxlIFBob25lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J0VtYWlsJ30gRmVlZGJhY2s9eydQYXNzd29yZCBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17ZmllbGQgPT4gdmFsaWRVc2VyQWNjb3VudEZpZWxkKHRoaXMuc3RhdGUuVXNlciwgZmllbGQpfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCIgaGlkZGVuPXt0aGlzLnN0YXRlLlVzZXIuVXNlQURBdXRoZW50aWNhdGlvbn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydQYXNzd29yZCd9IEZlZWRiYWNrPXsnUGFzc3dvcmQgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e2ZpZWxkID0+IHZhbGlkVXNlckFjY291bnRGaWVsZCh0aGlzLnN0YXRlLlVzZXIsIGZpZWxkKX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7VXNlcjogcmVjb3JkfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J0ZpcnN0TmFtZSd9IExhYmVsPSdGaXJzdCBOYW1lJyBGZWVkYmFjaz17J0ZpcnN0IE5hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e2ZpZWxkID0+IHZhbGlkVXNlckFjY291bnRGaWVsZCh0aGlzLnN0YXRlLlVzZXIsIGZpZWxkKX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7VXNlcjogcmVjb3JkfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J0xhc3ROYW1lJ30gTGFiZWw9J0xhc3QgTmFtZScgRmVlZGJhY2s9eydMYXN0IE5hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e2ZpZWxkID0+IHZhbGlkVXNlckFjY291bnRGaWVsZCh0aGlzLnN0YXRlLlVzZXIsIGZpZWxkKX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7VXNlcjogcmVjb3JkfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J1RpdGxlJ30gRmVlZGJhY2s9eydUaXRsZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17ZmllbGQgPT4gdmFsaWRVc2VyQWNjb3VudEZpZWxkKHRoaXMuc3RhdGUuVXNlciwgZmllbGQpfSBTZXR0ZXI9e3JlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgVXNlcjogcmVjb3JkIH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtU2VsZWN0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnUm9sZUlEJ30gTGFiZWw9J1JvbGUnIE9wdGlvbnM9e3RoaXMuc3RhdGUuUm9sZXMubWFwKHJzID0+IHsgcmV0dXJuIHsgVmFsdWU6IHJzLklELnRvU3RyaW5nKCksIExhYmVsOiBycy5OYW1lIH0gfSl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSl9IEVtcHR5T3B0aW9uPXt0cnVlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtU2VsZWN0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnVFNDSUQnfSBMYWJlbD0nVFNDJyBPcHRpb25zPXt0aGlzLnN0YXRlLlRTQ3MubWFwKHJzID0+IHsgcmV0dXJuIHsgVmFsdWU6IHJzLklELnRvU3RyaW5nKCksIExhYmVsOiBycy5OYW1lIH0gfSl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSl9IEVtcHR5T3B0aW9uPXt0cnVlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gRmllbGQ9eydQaG9uZSd9IEZlZWRiYWNrPXsnUGFzc3dvcmQgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e2ZpZWxkID0+IHZhbGlkVXNlckFjY291bnRGaWVsZCh0aGlzLnN0YXRlLlVzZXIsIGZpZWxkKX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7VXNlcjogcmVjb3JkfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD17J01vYmlsZVBob25lJ30gTGFiZWw9J01vYmlsZSBQaG9uZScgRmVlZGJhY2s9eydNb2JpbGUgUGhvbmUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e2ZpZWxkID0+IHZhbGlkVXNlckFjY291bnRGaWVsZCh0aGlzLnN0YXRlLlVzZXIsIGZpZWxkKX0gU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IHJlY29yZCB9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnRW1haWwnfSBGZWVkYmFjaz17J1Bhc3N3b3JkIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXtmaWVsZCA9PiB2YWxpZFVzZXJBY2NvdW50RmllbGQodGhpcy5zdGF0ZS5Vc2VyLCBmaWVsZCl9IFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1EYXRlUGlja2VyPFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPXsnQ2hhbmdlUGFzc3dvcmRPbid9IExhYmVsPSdDaGFuZ2UgUGFzc3dvcmQgT24nIFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ2hlY2tCb3g8U3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50PiBSZWNvcmQ9e3RoaXMuc3RhdGUuVXNlcn0gTGFiZWw9J0xvY2tlZCBPdXQnIEZpZWxkPSdMb2NrZWRPdXQnIFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1DaGVja0JveDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBMYWJlbD0nUGhvbmUgQ29uZmlybWVkJyBGaWVsZD0nUGhvbmVDb25maXJtZWQnIFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1DaGVja0JveDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBMYWJlbD0nRW1haWwgQ29uZmlybWVkJyBGaWVsZD0nRW1haWxDb25maXJtZWQnIFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoe1VzZXI6IHJlY29yZH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1DaGVja0JveDxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IFJlY29yZD17dGhpcy5zdGF0ZS5Vc2VyfSBGaWVsZD0nQXBwcm92ZWQnIFNldHRlcj17cmVjb3JkID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiByZWNvcmQgfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUNoZWNrQm94PFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4gUmVjb3JkPXt0aGlzLnN0YXRlLlVzZXJ9IEZpZWxkPSdSZWNlaXZlTm90aWZpY2F0aW9ucycgTGFiZWw9J1JlY2VpdmUgTm90aWZpY2F0aW9ucycgU2V0dGVyPXtyZWNvcmQgPT4gdGhpcy5zZXRTdGF0ZSh7IFVzZXI6IHJlY29yZCB9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlVXNlcigpfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5Vc2VyID09IHRoaXMucHJvcHMuVXNlcn0+VXBkYXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBVc2VyOiB0aGlzLnByb3BzLlVzZXIgfSl9IGRpc2FibGVkPXt0aGlzLnN0YXRlLlVzZXIgPT0gdGhpcy5wcm9wcy5Vc2VyfT5SZXNldDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBVc2VyUGVybWlzc2lvbnMudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAyLzA3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEZvcm1DaGVja0JveCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1DaGVja0JveCc7XHJcbmltcG9ydCB7IGdldFNlY3VyaXR5Um9sZXMsIGdldFNlY3VyaXR5Um9sZXNGb3JVc2VyLCB1cGRhdGVTZWN1cml0eVJvbGVzRm9yVXNlciB9IGZyb20gJy4vLi4vLi4vLi4vVFMvU2VydmljZXMvVXNlcic7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVXNlclBlcm1pc3Npb25zV2luZG93KHByb3BzOiB7IFVzZXI6IFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCB9KSB7XHJcbiAgICBjb25zdCBbc2NSb2xlcywgc2V0U2NSb2xlc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxTeXN0ZW1DZW50ZXIuQXBwbGljYXRpb25Sb2xlPFN5c3RlbUNlbnRlci5TeXN0ZW1DZW5ldGVyU2VjdXJpdHlSb2xlTmFtZT4+PihbXSk7XHJcbiAgICBjb25zdCBbeGRhUm9sZXMsIHNldFhkYVJvbGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFN5c3RlbUNlbnRlci5BcHBsaWNhdGlvblJvbGU8U3lzdGVtQ2VudGVyLk9wZW5YREFTZWN1cml0eVJvbGVOYW1lPj4+KFtdKTtcclxuICAgIGNvbnN0IFtjaGFuZ2VkLCBzZXRDaGFuZ2VkXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIEdldERhdGEoKTtcclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBHZXREYXRhKCkge1xyXG4gICAgICAgIHNldENoYW5nZWQoZmFsc2UpO1xyXG4gICAgICAgIGxldCBzY3JzID0gYXdhaXQgZ2V0U2VjdXJpdHlSb2xlczxTeXN0ZW1DZW50ZXIuU3lzdGVtQ2VuZXRlclNlY3VyaXR5Um9sZU5hbWU+KCdTeXN0ZW1DZW50ZXInKTtcclxuICAgICAgICBsZXQgeGRhcnMgPSAgYXdhaXQgZ2V0U2VjdXJpdHlSb2xlczxTeXN0ZW1DZW50ZXIuT3BlblhEQVNlY3VyaXR5Um9sZU5hbWU+KCdPcGVuWERBJyk7XHJcbiAgICAgICAgbGV0IHVzZXJTY3JzID0gYXdhaXQgZ2V0U2VjdXJpdHlSb2xlc0ZvclVzZXIocHJvcHMuVXNlci5JRCwgJ1N5c3RlbUNlbnRlcicpO1xyXG4gICAgICAgIGxldCB1c2VyWGRhcnMgPSBhd2FpdCBnZXRTZWN1cml0eVJvbGVzRm9yVXNlcihwcm9wcy5Vc2VyLklELCAnT3BlblhEQScpO1xyXG5cclxuICAgICAgICBzZXRTY1JvbGVzKHNjcnMubWFwKHNyYyA9PiB7XHJcbiAgICAgICAgICAgIHNyYy5Bc3NpZ25lZCA9IHVzZXJTY3JzLmZpbmQodXNyYyA9PiB1c3JjLkFwcGxpY2F0aW9uUm9sZUlEID09IHNyYy5JRCkgIT0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICByZXR1cm4gc3JjO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgc2V0WGRhUm9sZXMoeGRhcnMubWFwKHhyYyA9PiB7XHJcbiAgICAgICAgICAgIHhyYy5Bc3NpZ25lZCA9IHVzZXJYZGFycy5maW5kKHVzcmMgPT4gdXNyYy5BcHBsaWNhdGlvblJvbGVJRCA9PSB4cmMuSUQpICE9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgcmV0dXJuIHhyYztcclxuICAgICAgICB9KSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gVXBkYXRlRGF0YSgpIHtcclxuICAgICAgICBsZXQgZG9uZTEgPSBhd2FpdCB1cGRhdGVTZWN1cml0eVJvbGVzRm9yVXNlcignU3lzdGVtQ2VudGVyJywgc2NSb2xlcy5maWx0ZXIoc2NyID0+IHNjci5Bc3NpZ25lZCkubWFwKHNjciA9PiB7IHJldHVybiB7IElEOiAnMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJywgQXBwbGljYXRpb25Sb2xlSUQ6IHNjci5JRCwgVXNlckFjY291bnRJRDogcHJvcHMuVXNlci5JRCB9IGFzIFN5c3RlbUNlbnRlci5BcHBsaWNhdGlvblJvbGVVc2VyQWNjb3VudCB9KSk7XHJcbiAgICAgICAgbGV0IGRvbmUyID0gYXdhaXQgdXBkYXRlU2VjdXJpdHlSb2xlc0ZvclVzZXIoJ09wZW5YREEnLCB4ZGFSb2xlcy5maWx0ZXIoc2NyID0+IHNjci5Bc3NpZ25lZCkubWFwKHNjciA9PiB7IHJldHVybiB7IElEOiAnMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwJywgQXBwbGljYXRpb25Sb2xlSUQ6IHNjci5JRCwgVXNlckFjY291bnRJRDogcHJvcHMuVXNlci5JRCB9IGFzIFN5c3RlbUNlbnRlci5BcHBsaWNhdGlvblJvbGVVc2VyQWNjb3VudCB9KSk7XHJcbiAgICAgICAgR2V0RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+VXNlciBQZXJtaXNzaW9uczo8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPVwiYm9yZGVyXCIgc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnLCBoZWlnaHQ6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQgY2xhc3NOYW1lPVwidy1hdXRvXCIgc3R5bGU9e3sgZm9udFNpemU6ICdsYXJnZScgfX0+U3lzdGVtIENlbnRlcjo8L2xlZ2VuZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NSb2xlcy5tYXAoKHNjciwgaSwgYXJyYXkpID0+IDxGb3JtQ2hlY2tCb3g8U3lzdGVtQ2VudGVyLkFwcGxpY2F0aW9uUm9sZTxTeXN0ZW1DZW50ZXIuU3lzdGVtQ2VuZXRlclNlY3VyaXR5Um9sZU5hbWU+PiBrZXk9e3Njci5JRH0gUmVjb3JkPXtzY3J9IEZpZWxkPSdBc3NpZ25lZCcgTGFiZWw9e3Njci5OYW1lfSBTZXR0ZXI9eyhyZWNvcmQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjci5Bc3NpZ25lZCA9IHJlY29yZC5Bc3NpZ25lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdBcnJheSA9IF8uY2xvbmUoYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2NSb2xlcyhuZXdBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDaGFuZ2VkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzTmFtZT1cImJvcmRlclwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4JywgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT1cInctYXV0b1wiIHN0eWxlPXt7IGZvbnRTaXplOiAnbGFyZ2UnIH19Pk9wZW5YREE6PC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhkYVJvbGVzLm1hcCgoc2NyLCBpLCBhcnJheSkgPT4gPEZvcm1DaGVja0JveDxTeXN0ZW1DZW50ZXIuQXBwbGljYXRpb25Sb2xlPFN5c3RlbUNlbnRlci5PcGVuWERBU2VjdXJpdHlSb2xlTmFtZT4+IGtleT17c2NyLklEfSBSZWNvcmQ9e3Njcn0gRmllbGQ9J0Fzc2lnbmVkJyBMYWJlbD17c2NyLk5hbWV9IFNldHRlcj17KHJlY29yZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NyLkFzc2lnbmVkID0gcmVjb3JkLkFzc2lnbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0FycmF5ID0gXy5jbG9uZShhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRYZGFSb2xlcyhuZXdBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDaGFuZ2VkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IFVwZGF0ZURhdGEoKX0gZGlzYWJsZWQ9eyFjaGFuZ2VkfT5VcGRhdGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gR2V0RGF0YSgpfSBkaXNhYmxlZD17IWNoYW5nZWR9PlJlc2V0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgICBcclxufSJdLCJzb3VyY2VSb290IjoiIn0=