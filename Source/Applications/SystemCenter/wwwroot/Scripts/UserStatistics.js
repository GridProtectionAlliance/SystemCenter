(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UserStatistics"],{

/***/ "./TS/Services/User.ts":
/*!*****************************!*\
  !*** ./TS/Services/User.ts ***!
  \*****************************/
/*! exports provided: getSIDFromUserName, getIsUser, getFilledUser, getRoles, getSecurityRoles, updateSecurityRolesForUser, getSecurityRolesForUser, getTSCs, validUserAccountField, GetAccessLogAggregates, GetAccessLogTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSIDFromUserName", function() { return getSIDFromUserName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIsUser", function() { return getIsUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilledUser", function() { return getFilledUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoles", function() { return getRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSecurityRoles", function() { return getSecurityRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSecurityRolesForUser", function() { return updateSecurityRolesForUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSecurityRolesForUser", function() { return getSecurityRolesForUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTSCs", function() { return getTSCs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validUserAccountField", function() { return validUserAccountField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetAccessLogAggregates", function() { return GetAccessLogAggregates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GetAccessLogTable", function() { return GetAccessLogTable; });
//******************************************************************************************************
//  User.ts - Gbtc
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
//  02/06/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
function getSIDFromUserName(accountName) {
    return $.ajax({
        type: "POST",
        url: homePath + "api/SystemCenter/UserAccount/SID",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(accountName),
        cache: false,
        async: true
    });
}
function getIsUser(sid) {
    return $.ajax({
        type: "POST",
        url: homePath + "api/SystemCenter/UserAccount/IsUser",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(sid),
        cache: false,
        async: true
    });
}
function getFilledUser(userAccount) {
    return $.ajax({
        type: "POST",
        url: homePath + "api/SystemCenter/UserAccount/FilledUserAccount",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(userAccount),
        cache: false,
        async: true
    });
}
function getRoles() {
    return $.ajax({
        type: "GET",
        url: homePath + "api/SystemCenter/Role",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}
function getSecurityRoles(applicationName) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/" + applicationName + "/ApplicationRole",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}
function updateSecurityRolesForUser(applicationName, data) {
    return $.ajax({
        type: "PATCH",
        url: homePath + "api/" + applicationName + "/ApplicationRoleUserAccount/UpdateArray",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(data),
        cache: true,
        async: true
    });
}
function getSecurityRolesForUser(id, applicationName) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/" + applicationName + "/ApplicationRoleUserAccount/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}
function getTSCs() {
    return $.ajax({
        type: "GET",
        url: homePath + "api/SystemCenter/TSC",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}
function validUserAccountField(user, field) {
    if (field == 'AccountName')
        return user.Name != null && user.Name.length > 0 && user.Name.length <= 200;
    if (field == 'Name')
        return user.Name != null && user.Name.length > 0 && user.Name.length <= 200;
    else if (field == 'Password')
        return user.Password == null || user.Password.length <= 200;
    else if (field == 'FirstName')
        return user.FirstName == null || user.FirstName.length <= 200;
    else if (field == 'LastName')
        return user.LastName == null || user.LastName.length <= 200;
    else if (field == 'Phone')
        return user.Phone == null || user.Phone.length <= 200;
    else if (field == 'Email')
        return user.Email == null || user.Email.length <= 200;
    else if (field == 'Title')
        return user.Title == null || user.Title.length <= 200;
    else if (field == 'MobilePhone')
        return user.MobilePhone == null || user.MobilePhone.length <= 200;
    return false;
}
function GetAccessLogAggregates(database, days) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/" + database + "/AccessLog/Aggregates/" + days,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}
function GetAccessLogTable(database, days) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/" + database + "/AccessLog/Table/" + days,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}


/***/ }),

/***/ "./TSX/SystemCenter/CommonComponents/Table.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/Table.tsx ***!
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


var AngleIcon = function (props) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { style: { width: 10, height: 10, margin: 3 }, className: "fa fa-angle-" + (props.ascending ? 'up' : 'down') }); };
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        return _super.call(this, props) || this;
    }
    Table.prototype.componentDidUpdate = function (prevProps, prevState) {
    };
    Table.prototype.render = function () {
        var rowComponents = this.generateRows();
        var headerComponents = this.generateHeaders();
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: (this.props.tableClass != undefined ? this.props.tableClass : ''), style: this.props.tableStyle },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", { style: this.props.theadStyle }, headerComponents),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", { style: this.props.tbodyStyle }, rowComponents)));
    };
    Table.prototype.generateHeaders = function () {
        var _this = this;
        if (this.props.cols.length == 0)
            return null;
        var cells = this.props.cols.map(function (colData, index) {
            var style;
            if (colData.headerStyle != undefined) {
                style = colData.headerStyle;
            }
            else
                style = {};
            if (style.cursor == undefined)
                style.cursor = 'pointer';
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { key: index, style: style, onClick: function (e) { return _this.handleSort({ col: colData.key, ascending: _this.props.ascending }, e); } },
                colData.label,
                (_this.props.sortField == colData.key ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](AngleIcon, { ascending: _this.props.ascending }) : null));
        });
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null, cells);
    };
    Table.prototype.generateRows = function () {
        var _this = this;
        if (this.props.data.length == 0)
            return null;
        return this.props.data.map(function (item, index) {
            var cells = _this.props.cols.map(function (colData) {
                var style = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](colData.rowStyle);
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { key: index.toString() + item[colData.key] + colData.key, style: style, onClick: _this.handleClick.bind(_this, { col: colData.key, row: item, data: item[colData.key] }) }, colData.content != undefined ? colData.content(item, colData.key, style) : item[colData.key]);
            });
            var style;
            if (_this.props.rowStyle != undefined) {
                style = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.rowStyle);
            }
            else
                style = {};
            if (style.cursor == undefined)
                style.cursor = 'pointer';
            if (_this.props.selected(item))
                style.backgroundColor = 'yellow';
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { style: style, key: index.toString() }, cells);
        });
    };
    Table.prototype.handleClick = function (data, event) {
        this.props.onClick(data, event);
    };
    Table.prototype.handleSort = function (data, event) {
        this.props.onSort(data);
    };
    return Table;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Table);
;


/***/ }),

/***/ "./TSX/SystemCenter/UserStatistics/UserStatistics.tsx":
/*!************************************************************!*\
  !*** ./TSX/SystemCenter/UserStatistics/UserStatistics.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3 */ "d3");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(d3__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _TS_Services_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../TS/Services/User */ "./TS/Services/User.ts");
//******************************************************************************************************
//  UserStatistics.tsx - Gbtc
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






var UserStatistics = function (props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["useHistory"])();
    var svgWidth = window.innerWidth - 250 - 30;
    var svgHeight = (window.innerHeight - 75) * .33;
    var margin = { top: 20, right: 20, bottom: 20, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    //let svg = d3.select('svg').attr("width", svgWidth).attr("height", svgHeight);
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), scAggregates = _a[0], setScAggregates = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), xdaAggregates = _b[0], setXDAAggregates = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](30), 2), days = _c[0], setDays = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), x = _d[0], setX = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), Y = _e[0], setY = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('SystemCenter'), 2), tab = _f[0], setTab = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), tableData = _g[0], setTableData = _g[1];
    var _h = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Logins'), 2), sortField = _h[0], setSortField = _h[1];
    var _j = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), ascending = _j[0], setAscending = _j[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        GetData(days, tab);
    }, []);
    function GetData(d, t) {
        return __awaiter(this, void 0, void 0, function () {
            var sca, xdaa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["GetAccessLogAggregates"])("SystemCenter", d)];
                    case 1:
                        sca = _a.sent();
                        return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["GetAccessLogAggregates"])("OpenXDA", d)];
                    case 2:
                        xdaa = _a.sent();
                        DrawChart(sca, xdaa);
                        GetTableData(t);
                        return [2 /*return*/];
                }
            });
        });
    }
    function GetTableData(db) {
        return __awaiter(this, void 0, void 0, function () {
            var table, ordered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(_TS_Services_User__WEBPACK_IMPORTED_MODULE_5__["GetAccessLogTable"])(db, days)];
                    case 1:
                        table = _a.sent();
                        ordered = lodash__WEBPACK_IMPORTED_MODULE_2__["orderBy"](table, [sortField], [(ascending ? "asc" : "desc")]);
                        setTableData(ordered);
                        return [2 /*return*/];
                }
            });
        });
    }
    function DrawChart(sca, xdaa) {
        var maxCounts = sca.map(function (value, index) { return Math.max(sca[index].Count, xdaa[index].Count); });
        var x = d3__WEBPACK_IMPORTED_MODULE_3__["scaleTime"]().rangeRound([0, width]);
        var y = d3__WEBPACK_IMPORTED_MODULE_3__["scaleLinear"]().rangeRound([height - 15, 0]);
        var line = d3__WEBPACK_IMPORTED_MODULE_3__["line"]().x(function (d) { return x(moment(d.Date)); }).y(function (d) { return y(d.Count); });
        y.domain(d3__WEBPACK_IMPORTED_MODULE_3__["extent"](maxCounts, function (d) { return d; }));
        x.domain(d3__WEBPACK_IMPORTED_MODULE_3__["extent"](sca, function (d) { return moment(d.Date); }));
        d3__WEBPACK_IMPORTED_MODULE_3__["select"]('#yaxis').call(d3__WEBPACK_IMPORTED_MODULE_3__["axisLeft"](y)).call(function (g) { return g.select(".domain").remove(); });
        d3__WEBPACK_IMPORTED_MODULE_3__["select"]('#xaxis').call(d3__WEBPACK_IMPORTED_MODULE_3__["axisBottom"](x)).call(function (g) { return g.select(".domain").remove(); });
        d3__WEBPACK_IMPORTED_MODULE_3__["select"]('#scapath').datum(sca).attr('d', line);
        d3__WEBPACK_IMPORTED_MODULE_3__["select"]('#xdapath').datum(xdaa).attr('d', line);
    }
    if (props.Roles.indexOf('Administrator') < 0)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: '100%', padding: '10px 10px 10px 20px' } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "User Statistics")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: days, onChange: function (e) {
                        setDays(parseInt(e.target.value));
                        GetData(parseInt(e.target.value), tab);
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: '30' }, "Last 30 days"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: '60' }, "Last 60 days"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: '90' }, "Last 90 days"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: '180' }, "Last 180 days"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: '365' }, "Last 365 days")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: 'calc( 100%)' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { width: svgWidth, height: svgHeight, style: { border: '1px solid lightgray' /*, position: "absolute", left: 20*/ } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { id: 'xaxis', transform: "translate(" + (margin.left - 20) + "," + (height + 10) + ")" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { id: 'yaxis', transform: "translate(" + (margin.left - 20) + ",25)" }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("g", { transform: "translate(" + (margin.left - 20) + ",25)" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { id: 'scapath', fill: 'none', strokeLinejoin: 'round', strokeWidth: '1.5', stroke: 'steelblue' }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("path", { id: 'xdapath', fill: 'none', strokeLinejoin: 'round', strokeWidth: '1.5', stroke: 'red' }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: "calc(100% - " + svgHeight + "px)" } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "SystemCenter" ? " active" : ""), onClick: function () {
                                setTab('SystemCenter');
                                GetTableData('SystemCenter');
                            } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { width: "20", height: "20" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { width: "20", height: "20", fill: 'steelblue', strokeWidth: '3', stroke: 'rgb(0,0,0)' })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { style: { marginLeft: 10 } }, "System Center"))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "OpenXDA" ? " active" : ""), onClick: function () {
                                setTab('OpenXDA');
                                GetTableData('OpenXDA');
                            } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { width: "20", height: "20" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("rect", { width: "20", height: "20", fill: 'red', strokeWidth: '3', stroke: 'rgb(0,0,0)' })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { style: { marginLeft: 10 } }, "OpenXDA")))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 235, overflow: 'hidden' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane  active" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_1__["default"], { cols: [
                                { key: 'UserName', label: 'User', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                                { key: 'Logins', label: 'Logins for Period', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                                { key: 'LastAccess', label: 'Last Access Time ', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            ], tableClass: "table table-hover", data: tableData, sortField: sortField, ascending: ascending, onSort: function (d) {
                                if (d.col == sortField) {
                                    var ordered = lodash__WEBPACK_IMPORTED_MODULE_2__["orderBy"](tableData, [d.col], [(!ascending ? "asc" : "desc")]);
                                    setTableData(ordered);
                                }
                                else {
                                    var ordered = lodash__WEBPACK_IMPORTED_MODULE_2__["orderBy"](tableData, [d.col], ["asc"]);
                                    setTableData(ordered);
                                    setSortField(d.col);
                                }
                                setAscending(!ascending);
                            }, onClick: function () { }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })))))));
};
/* harmony default export */ __webpack_exports__["default"] = (UserStatistics);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9TZXJ2aWNlcy9Vc2VyLnRzIiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9UYWJsZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Vc2VyU3RhdGlzdGljcy9Vc2VyU3RhdGlzdGljcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RyxrQkFBa0I7QUFDbEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3RztBQU1qRyxTQUFTLGtCQUFrQixDQUFDLFdBQW1CO0lBQ2xELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFLLFFBQVEscUNBQWtDO1FBQ2xELFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsUUFBUSxFQUFFLE1BQU07UUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ2pDLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7QUFFUCxDQUFDO0FBRU0sU0FBUyxTQUFTLENBQUMsR0FBVztJQUNqQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDVixJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBSyxRQUFRLHdDQUFxQztRQUNyRCxXQUFXLEVBQUUsaUNBQWlDO1FBQzlDLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUN6QixLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDO0FBRVAsQ0FBQztBQUVNLFNBQVMsYUFBYSxDQUFDLFdBQXFDO0lBQy9ELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFLLFFBQVEsbURBQWdEO1FBQ2hFLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsUUFBUSxFQUFFLE1BQU07UUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ2pDLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7QUFFUCxDQUFDO0FBRU0sU0FBUyxRQUFRO0lBQ3BCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFLLFFBQVEsMEJBQXVCO1FBQ3ZDLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsUUFBUSxFQUFFLE1BQU07UUFDaEIsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFTSxTQUFTLGdCQUFnQixDQUFJLGVBQTJDO0lBQzNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFLLFFBQVEsWUFBTyxlQUFlLHFCQUFrQjtRQUN4RCxXQUFXLEVBQUUsaUNBQWlDO1FBQzlDLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRU0sU0FBUywwQkFBMEIsQ0FBQyxlQUEyQyxFQUFFLElBQW9EO0lBQ3hJLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxPQUFPO1FBQ2IsR0FBRyxFQUFLLFFBQVEsWUFBTyxlQUFlLDRDQUF5QztRQUMvRSxXQUFXLEVBQUUsaUNBQWlDO1FBQzlDLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUMxQixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUdNLFNBQVMsdUJBQXVCLENBQUMsRUFBVSxFQUFFLGVBQTJDO0lBQzNGLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFLLFFBQVEsWUFBTyxlQUFlLG9DQUErQixFQUFJO1FBQ3pFLFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsUUFBUSxFQUFFLE1BQU07UUFDaEIsS0FBSyxFQUFFLElBQUk7UUFDWCxLQUFLLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFTSxTQUFTLE9BQU87SUFDbkIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1YsSUFBSSxFQUFFLEtBQUs7UUFDWCxHQUFHLEVBQUssUUFBUSx5QkFBc0I7UUFDdEMsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxRQUFRLEVBQUUsTUFBTTtRQUNoQixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVNLFNBQVMscUJBQXFCLENBQUMsSUFBOEIsRUFBQyxLQUF1QztJQUN4RyxJQUFJLEtBQUssSUFBSSxhQUFhO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztJQUNoRixJQUFJLEtBQUssSUFBSSxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1NBQzNFLElBQUksS0FBSyxJQUFJLFVBQVU7UUFDeEIsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7U0FDM0QsSUFBSSxLQUFLLElBQUksV0FBVztRQUN6QixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztTQUM3RCxJQUFJLEtBQUssSUFBSSxVQUFVO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1NBQzNELElBQUksS0FBSyxJQUFJLE9BQU87UUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7U0FDckQsSUFBSSxLQUFLLElBQUksT0FBTztRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQztTQUNyRCxJQUFJLEtBQUssSUFBSSxPQUFPO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1NBQ3JELElBQUksS0FBSyxJQUFJLGFBQWE7UUFDM0IsT0FBTyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7SUFFdEUsT0FBTyxLQUFLLENBQUM7QUFFakIsQ0FBQztBQUVNLFNBQVMsc0JBQXNCLENBQUMsUUFBd0MsRUFBRSxJQUFZO0lBQ3pGLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFLLFFBQVEsWUFBTyxRQUFRLDhCQUF5QixJQUFNO1FBQzlELFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsUUFBUSxFQUFFLE1BQU07UUFDaEIsS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FBQztBQUVQLENBQUM7QUFFTSxTQUFTLGlCQUFpQixDQUFDLFFBQXdDLEVBQUUsSUFBWTtJQUNwRixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDVixJQUFJLEVBQUUsS0FBSztRQUNYLEdBQUcsRUFBSyxRQUFRLFlBQU8sUUFBUSx5QkFBb0IsSUFBTTtRQUN6RCxXQUFXLEVBQUUsaUNBQWlDO1FBQzlDLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7QUFFUCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDektEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsb0JBQW9CO0FBQ3BCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBQ0g7QUFFNUIsSUFBTSxTQUFTLEdBQW9ELFVBQUMsS0FBSyxJQUFLLHFFQUFNLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLGNBQWMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVMsRUFBekgsQ0FBeUg7QUFtQnZNO0lBQXNDLHlCQUFrQztJQUNwRSxlQUFZLEtBQUs7ZUFDYixrQkFBTSxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVELGtDQUFrQixHQUFsQixVQUFtQixTQUFTLEVBQUUsU0FBUztJQUN2QyxDQUFDO0lBRUQsc0JBQU0sR0FBTjtRQUNJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM5QyxPQUFPLENBQ0gsK0RBQU8sU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtZQUM3RywrREFBTyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUcsZ0JBQWdCLENBQVM7WUFDL0QsK0RBQU8sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFHLGFBQWEsQ0FBUyxDQUN4RCxDQUNYLENBQUM7SUFDTixDQUFDO0lBRUQsK0JBQWUsR0FBZjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUs7WUFDM0MsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFFO2dCQUNsQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQzthQUMvQjs7Z0JBRUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUVmLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxTQUFTO2dCQUN6QixLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUU3QixPQUFPLDREQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBQyxDQUFDLElBQUssWUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUF6RSxDQUF5RTtnQkFBRyxPQUFPLENBQUMsS0FBSztnQkFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG9EQUFDLFNBQVMsSUFBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU07UUFDdlAsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGdFQUFLLEtBQUssQ0FBTSxDQUFDO0lBQzVCLENBQUM7SUFFRCw0QkFBWSxHQUFaO1FBQUEsaUJBK0JDO1FBOUJHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUU3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQ25DLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBTztnQkFDbkMsSUFBSSxLQUFLLEdBQUcsNENBQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sNERBQ0gsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQ3ZELEtBQUssRUFBRSxLQUFLLEVBQ1osT0FBTyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUU3RixPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDNUY7WUFDVCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksS0FBSyxDQUFDO1lBRVYsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUU7Z0JBQ2xDLEtBQUssR0FBRyw0Q0FBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDeEM7O2dCQUVHLEtBQUssR0FBRyxFQUFFLENBQUM7WUFFZixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksU0FBUztnQkFDekIsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFFN0IsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1lBRXJDLE9BQU8sNERBQUksS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFHLEtBQUssQ0FBTSxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJCQUFXLEdBQVgsVUFBWSxJQUEwQyxFQUFFLEtBQUs7UUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCwwQkFBVSxHQUFWLFVBQVcsSUFBSSxFQUFFLEtBQUs7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLENBL0VxQywrQ0FBZSxHQStFcEQ7O0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzVIRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNlO0FBQ2xCO0FBQ0g7QUFDcUI7QUFFMkM7QUFjekYsSUFBTSxjQUFjLEdBQTZCLFVBQUMsS0FBSztJQUNuRCxJQUFJLE9BQU8sR0FBRyxtRUFBVSxFQUFFLENBQUM7SUFDM0IsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQzVDLElBQUksU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDaEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDMUQsSUFBSSxLQUFLLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNsRCxJQUFJLE1BQU0sR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3BELCtFQUErRTtJQUV6RSxzRUFBc0UsRUFBckUsb0JBQVksRUFBRSx1QkFBdUQsQ0FBQztJQUN2RSxzRUFBd0UsRUFBdkUscUJBQWEsRUFBRSx3QkFBd0QsQ0FBQztJQUN6RSxzRUFBNEMsRUFBM0MsWUFBSSxFQUFFLGVBQXFDLENBQUM7SUFDN0Msd0VBQThELEVBQTdELFNBQUMsRUFBRSxZQUEwRCxDQUFDO0lBQy9ELHdFQUFnRSxFQUEvRCxTQUFDLEVBQUUsWUFBNEQsQ0FBQztJQUNqRSxrRkFBOEUsRUFBN0UsV0FBRyxFQUFFLGNBQXdFLENBQUM7SUFDL0Usc0VBQW9FLEVBQW5FLGlCQUFTLEVBQUUsb0JBQXdELENBQUM7SUFDckUsNEVBQTRELEVBQTNELGlCQUFTLEVBQUUsb0JBQWdELENBQUM7SUFDN0QseUVBQTBELEVBQXpELGlCQUFTLEVBQUUsb0JBQThDLENBQUM7SUFFakUsK0NBQWUsQ0FBQztRQUNaLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsU0FBZSxPQUFPLENBQUMsQ0FBUyxFQUFFLENBQWlDOzs7Ozs0QkFDckQscUJBQU0sZ0ZBQXNCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQzs7d0JBQXJELEdBQUcsR0FBRyxTQUErQzt3QkFDOUMscUJBQU0sZ0ZBQXNCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzs7d0JBQWpELElBQUksR0FBRyxTQUEwQzt3QkFDckQsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDckIsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Ozs7S0FDbEI7SUFFRCxTQUFlLFlBQVksQ0FBQyxFQUFrQzs7Ozs7NEJBQzlDLHFCQUFNLDJFQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUM7O3dCQUF6QyxLQUFLLEdBQUcsU0FBaUM7d0JBQ3pDLE9BQU8sR0FBRyw4Q0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDM0UsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7OztLQUN6QjtJQUVELFNBQVMsU0FBUyxDQUFDLEdBQXFCLEVBQUUsSUFBc0I7UUFDNUQsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLElBQUssV0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQyxDQUFDO1FBRXpGLElBQUksQ0FBQyxHQUFHLDRDQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyw4Q0FBYyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRELElBQUksSUFBSSxHQUFHLHVDQUFPLEVBQWEsQ0FBQyxDQUFDLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFDN0UsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx5Q0FBUyxDQUFDLFNBQVMsRUFBRSxXQUFDLElBQUksUUFBQyxFQUFELENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx5Q0FBUyxDQUFDLEdBQUcsRUFBRSxXQUFDLElBQUksYUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBZCxDQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzlDLHlDQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLDJDQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQTVCLENBQTRCLENBQUMsQ0FBQztRQUNqRix5Q0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyw2Q0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUE1QixDQUE0QixDQUFDLENBQUM7UUFDbkYseUNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7UUFDaEQseUNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7SUFFckQsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzFELE9BQU8sQ0FDSCw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFO1FBQ3pFLDZEQUFLLFNBQVMsRUFBQyxLQUFLO1lBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dCQUNoQixrRkFBd0IsQ0FDdEI7WUFDTiw2REFBSyxTQUFTLEVBQUMsS0FBSztnQkFDaEIsZ0VBQVEsU0FBUyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFDLENBQUM7d0JBQ3RELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBQ0csZ0VBQVEsS0FBSyxFQUFDLElBQUksbUJBQXNCO29CQUN4QyxnRUFBUSxLQUFLLEVBQUMsSUFBSSxtQkFBc0I7b0JBQ3hDLGdFQUFRLEtBQUssRUFBQyxJQUFJLG1CQUFzQjtvQkFDeEMsZ0VBQVEsS0FBSyxFQUFDLEtBQUssb0JBQXVCO29CQUMxQyxnRUFBUSxLQUFLLEVBQUMsS0FBSyxvQkFBdUIsQ0FDckMsQ0FDUCxDQUVKO1FBQ04sK0RBQUs7UUFDTCw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUU7WUFDaEQsNkRBQUssS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFHLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxxQkFBcUIscUNBQW9DLEVBQUU7Z0JBQ2xILDJEQUFHLEVBQUUsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFFLGdCQUFhLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxXQUFJLE1BQU0sR0FBRyxFQUFFLE9BQUcsR0FBTTtnQkFDOUUsMkRBQUcsRUFBRSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQU07Z0JBQ3pFLDJEQUFHLFNBQVMsRUFBRSxZQUFZLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLE1BQU07b0JBQ3BELDhEQUFNLEVBQUUsRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFdBQVcsR0FBRTtvQkFDNUYsOERBQU0sRUFBRSxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLGNBQWMsRUFBQyxPQUFPLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxHQUFFLENBQ3RGLENBQ0Y7WUFDTiw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxpQkFBZSxTQUFTLFFBQUssRUFBRTtnQkFDaEUsNERBQUksU0FBUyxFQUFDLGNBQWM7b0JBQ3hCLDREQUFJLFNBQVMsRUFBQyxVQUFVO3dCQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUU7Z0NBQzFFLE1BQU0sQ0FBQyxjQUFjLENBQUM7Z0NBQ3RCLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDakMsQ0FBQzs0QkFDRyw2REFBSyxLQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJO2dDQUN2Qiw4REFBTSxLQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxZQUFZLEdBQUcsQ0FDbEY7NEJBQ04sOERBQU0sS0FBSyxFQUFFLEVBQUMsVUFBVSxFQUFFLEVBQUUsRUFBQyxvQkFBc0IsQ0FDbkQsQ0FDSDtvQkFDTCw0REFBSSxTQUFTLEVBQUMsVUFBVTt3QkFDcEIsMkRBQUcsU0FBUyxFQUFFLFVBQVUsR0FBRyxDQUFDLEdBQUcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFO2dDQUNyRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dDQUNqQixZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQzVCLENBQUM7NEJBQ0csNkRBQUssS0FBSyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsSUFBSTtnQ0FDdkIsOERBQU0sS0FBSyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsWUFBWSxHQUFHLENBQzVFOzRCQUNOLDhEQUFNLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsY0FBZ0IsQ0FDL0MsQ0FDSCxDQUNKO2dCQUVMLDZEQUFLLFNBQVMsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7b0JBQzNGLDZEQUFLLFNBQVMsRUFBQyxrQkFBa0I7d0JBQzdCLG9EQUFDLCtEQUFLLElBQ0YsSUFBSSxFQUFFO2dDQUNGLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0NBQzdGLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtnQ0FDeEcsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFOzZCQUNqSCxFQUNELFVBQVUsRUFBQyxtQkFBbUIsRUFDOUIsSUFBSSxFQUFFLFNBQVMsRUFDZixTQUFTLEVBQUUsU0FBUyxFQUNwQixTQUFTLEVBQUUsU0FBUyxFQUNwQixNQUFNLEVBQUUsVUFBQyxDQUFDO2dDQUNOLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxTQUFTLEVBQUU7b0NBQ3BCLElBQUksT0FBTyxHQUFHLDhDQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQzdFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQ0FDekI7cUNBQ0k7b0NBQ0QsSUFBSSxPQUFPLEdBQUcsOENBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29DQUNyRCxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7b0NBQ3RCLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7aUNBQ3ZCO2dDQUNELFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUU3QixDQUFDLEVBQ0QsT0FBTyxFQUFFLGNBQVEsQ0FBQyxFQUNsQixVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQzFGLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUN6RyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQ3hGLFFBQVEsRUFBRSxVQUFDLElBQUksSUFBSyxZQUFLLEVBQUwsQ0FBSyxHQUMzQixDQUVBLENBQ0osQ0FFSixDQUNKLENBQ0osQ0FDVDtBQUVMLENBQUM7QUFFYyw2RUFBYyxFQUFDIiwiZmlsZSI6IlVzZXJTdGF0aXN0aWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFVzZXIudHMgLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDIvMDYvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gXCIuLi8uLi9UU1gvU3lzdGVtQ2VudGVyL2dsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U0lERnJvbVVzZXJOYW1lKGFjY291bnROYW1lOiBzdHJpbmcpOiBKUXVlcnkuanFYSFI8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvVXNlckFjY291bnQvU0lEYCxcclxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShhY2NvdW50TmFtZSksXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJc1VzZXIoc2lkOiBzdHJpbmcpOiBKUXVlcnkuanFYSFI8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL1VzZXJBY2NvdW50L0lzVXNlcmAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoc2lkKSxcclxuICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGxlZFVzZXIodXNlckFjY291bnQ6IFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCk6IEpRdWVyeS5qcVhIUjxTeXN0ZW1DZW50ZXIuVXNlckFjY291bnQ+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9Vc2VyQWNjb3VudC9GaWxsZWRVc2VyQWNjb3VudGAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlckFjY291bnQpLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9sZXMoKTogSlF1ZXJ5LmpxWEhSPEFycmF5PFN5c3RlbUNlbnRlci5Sb2xlPj4ge1xyXG4gICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvUm9sZWAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VjdXJpdHlSb2xlczxUPihhcHBsaWNhdGlvbk5hbWU6ICdTeXN0ZW1DZW50ZXInIHwgJ09wZW5YREEnKTogSlF1ZXJ5LmpxWEhSPEFycmF5PFN5c3RlbUNlbnRlci5BcHBsaWNhdGlvblJvbGU8VD4+PiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpLyR7YXBwbGljYXRpb25OYW1lfS9BcHBsaWNhdGlvblJvbGVgLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNlY3VyaXR5Um9sZXNGb3JVc2VyKGFwcGxpY2F0aW9uTmFtZTogJ1N5c3RlbUNlbnRlcicgfCAnT3BlblhEQScsIGRhdGE6IEFycmF5PFN5c3RlbUNlbnRlci5BcHBsaWNhdGlvblJvbGVVc2VyQWNjb3VudD4pOiBKUXVlcnkuanFYSFI8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIlBBVENIXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvJHthcHBsaWNhdGlvbk5hbWV9L0FwcGxpY2F0aW9uUm9sZVVzZXJBY2NvdW50L1VwZGF0ZUFycmF5YCxcclxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VjdXJpdHlSb2xlc0ZvclVzZXIoaWQ6IHN0cmluZywgYXBwbGljYXRpb25OYW1lOiAnU3lzdGVtQ2VudGVyJyB8ICdPcGVuWERBJyk6IEpRdWVyeS5qcVhIUjxBcnJheTxTeXN0ZW1DZW50ZXIuQXBwbGljYXRpb25Sb2xlVXNlckFjY291bnQ+PiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpLyR7YXBwbGljYXRpb25OYW1lfS9BcHBsaWNhdGlvblJvbGVVc2VyQWNjb3VudC8ke2lkfWAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VFNDcygpOiBKUXVlcnkuanFYSFI8QXJyYXk8U3lzdGVtQ2VudGVyLlRTQz4+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL1RTQ2AsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRVc2VyQWNjb3VudEZpZWxkKHVzZXI6IFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCxmaWVsZDoga2V5b2YgKFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCkpOiBib29sZWFuIHtcclxuICAgIGlmIChmaWVsZCA9PSAnQWNjb3VudE5hbWUnKVxyXG4gICAgICAgIHJldHVybiB1c2VyLk5hbWUgIT0gbnVsbCAmJiB1c2VyLk5hbWUubGVuZ3RoID4gMCAmJiB1c2VyLk5hbWUubGVuZ3RoIDw9IDIwMDtcclxuICAgIGlmIChmaWVsZCA9PSAnTmFtZScpXHJcbiAgICAgICAgcmV0dXJuIHVzZXIuTmFtZSAhPSBudWxsICYmIHVzZXIuTmFtZS5sZW5ndGggPiAwICYmIHVzZXIuTmFtZS5sZW5ndGggPD0gMjAwO1xyXG4gICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Bhc3N3b3JkJylcclxuICAgICAgICByZXR1cm4gdXNlci5QYXNzd29yZCA9PSBudWxsIHx8IHVzZXIuUGFzc3dvcmQubGVuZ3RoIDw9IDIwMDtcclxuICAgIGVsc2UgaWYgKGZpZWxkID09ICdGaXJzdE5hbWUnKVxyXG4gICAgICAgIHJldHVybiB1c2VyLkZpcnN0TmFtZSA9PSBudWxsIHx8IHVzZXIuRmlyc3ROYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICBlbHNlIGlmIChmaWVsZCA9PSAnTGFzdE5hbWUnKVxyXG4gICAgICAgIHJldHVybiB1c2VyLkxhc3ROYW1lID09IG51bGwgfHwgdXNlci5MYXN0TmFtZS5sZW5ndGggPD0gMjAwO1xyXG4gICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Bob25lJylcclxuICAgICAgICByZXR1cm4gdXNlci5QaG9uZSA9PSBudWxsIHx8IHVzZXIuUGhvbmUubGVuZ3RoIDw9IDIwMDtcclxuICAgIGVsc2UgaWYgKGZpZWxkID09ICdFbWFpbCcpXHJcbiAgICAgICAgcmV0dXJuIHVzZXIuRW1haWwgPT0gbnVsbCB8fCB1c2VyLkVtYWlsLmxlbmd0aCA8PSAyMDA7XHJcbiAgICBlbHNlIGlmIChmaWVsZCA9PSAnVGl0bGUnKVxyXG4gICAgICAgIHJldHVybiB1c2VyLlRpdGxlID09IG51bGwgfHwgdXNlci5UaXRsZS5sZW5ndGggPD0gMjAwO1xyXG4gICAgZWxzZSBpZiAoZmllbGQgPT0gJ01vYmlsZVBob25lJylcclxuICAgICAgICByZXR1cm4gdXNlci5Nb2JpbGVQaG9uZSA9PSBudWxsIHx8IHVzZXIuTW9iaWxlUGhvbmUubGVuZ3RoIDw9IDIwMDtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2V0QWNjZXNzTG9nQWdncmVnYXRlcyhkYXRhYmFzZTogU3lzdGVtQ2VudGVyLkF0dGFjaGVkRGF0YWJhc2VzLCBkYXlzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvJHtkYXRhYmFzZX0vQWNjZXNzTG9nL0FnZ3JlZ2F0ZXMvJHtkYXlzfWAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHZXRBY2Nlc3NMb2dUYWJsZShkYXRhYmFzZTogU3lzdGVtQ2VudGVyLkF0dGFjaGVkRGF0YWJhc2VzLCBkYXlzOiBudW1iZXIpIHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvJHtkYXRhYmFzZX0vQWNjZXNzTG9nL1RhYmxlLyR7ZGF5c31gLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG59XHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBUYWJsZS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAxOCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDgvMDIvMjAxOCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuY29uc3QgQW5nbGVJY29uOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDx7IGFzY2VuZGluZzogYm9vbGVhbiB9PiA9IChwcm9wcykgPT4gPHNwYW4gc3R5bGU9e3sgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBtYXJnaW46IDMgfX0gY2xhc3NOYW1lPXtcImZhIGZhLWFuZ2xlLVwiICsgKHByb3BzLmFzY2VuZGluZyA/ICd1cCcgOiAnZG93bicpfT48L3NwYW4+XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlUHJvcHM8VD4ge1xyXG4gICAgY29sczogQXJyYXk8eyBrZXk6IGtleW9mKFQpIHwgbnVsbCwgbGFiZWw6IHN0cmluZywgaGVhZGVyU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLCByb3dTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsIGNvbnRlbnQ/KGl0ZW06IFQsIGtleToga2V5b2YoVCksIHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzKTogUmVhY3QuUmVhY3ROb2RlIH0+LFxyXG4gICAgZGF0YTogQXJyYXk8VD4sXHJcbiAgICBvbkNsaWNrOiAoZGF0YTogeyBjb2w6IGtleW9mIChUKSwgcm93OiBULCBkYXRhOiBUW2tleW9mKFQpXSB9LCBldmVudDogYW55KSA9PiB2b2lkLFxyXG4gICAgc29ydEZpZWxkOiBzdHJpbmcsXHJcbiAgICBhc2NlbmRpbmc6IGJvb2xlYW4sXHJcbiAgICBvblNvcnQoZGF0YTogeyBjb2w6IGtleW9mIChUKSwgYXNlbmRpbmc6IGJvb2xlYW59KTogdm9pZCxcclxuICAgIHRhYmxlQ2xhc3M/OiBzdHJpbmcsXHJcbiAgICB0YWJsZVN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcyxcclxuICAgIHRoZWFkU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG4gICAgdGhlYWRDbGFzcz86IHN0cmluZyxcclxuICAgIHRib2R5U3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG4gICAgdGJvZHlDbGFzcz86IHN0cmluZyxcclxuICAgIHNlbGVjdGVkPyhkYXRhOiBUKTogYm9vbGVhbixcclxuICAgIHJvd1N0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcyxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGU8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8VGFibGVQcm9wczxUPiwge30+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICB2YXIgcm93Q29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVSb3dzKCk7XHJcbiAgICAgICAgdmFyIGhlYWRlckNvbXBvbmVudHMgPSB0aGlzLmdlbmVyYXRlSGVhZGVycygpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9eyh0aGlzLnByb3BzLnRhYmxlQ2xhc3MgIT0gdW5kZWZpbmVkID8gdGhpcy5wcm9wcy50YWJsZUNsYXNzIDogJycpfSBzdHlsZT17dGhpcy5wcm9wcy50YWJsZVN0eWxlfT5cclxuICAgICAgICAgICAgICAgIDx0aGVhZCBzdHlsZT17dGhpcy5wcm9wcy50aGVhZFN0eWxlfT57aGVhZGVyQ29tcG9uZW50c308L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5IHN0eWxlPXt0aGlzLnByb3BzLnRib2R5U3R5bGV9Pntyb3dDb21wb25lbnRzfTwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUhlYWRlcnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29scy5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIHZhciBjZWxscyA9IHRoaXMucHJvcHMuY29scy5tYXAoKGNvbERhdGEsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZTtcclxuICAgICAgICAgICAgaWYgKGNvbERhdGEuaGVhZGVyU3R5bGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGNvbERhdGEuaGVhZGVyU3R5bGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDx0aCBrZXk9e2luZGV4fSBzdHlsZT17c3R5bGV9IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZVNvcnQoeyBjb2w6IGNvbERhdGEua2V5LCBhc2NlbmRpbmc6IHRoaXMucHJvcHMuYXNjZW5kaW5nIH0sIGUpfT57Y29sRGF0YS5sYWJlbH17KHRoaXMucHJvcHMuc29ydEZpZWxkID09IGNvbERhdGEua2V5ID8gPEFuZ2xlSWNvbiBhc2NlbmRpbmc9e3RoaXMucHJvcHMuYXNjZW5kaW5nfSAvPiA6IG51bGwpfTwvdGg+XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiA8dHI+e2NlbGxzfTwvdHI+O1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlUm93cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjZWxscyA9IHRoaXMucHJvcHMuY29scy5tYXAoY29sRGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSBfLmNsb25lKGNvbERhdGEucm93U3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDx0ZFxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXgudG9TdHJpbmcoKSArIGl0ZW1bY29sRGF0YS5rZXldICsgY29sRGF0YS5rZXl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB7IGNvbDogY29sRGF0YS5rZXksIHJvdzogaXRlbSwgZGF0YTogaXRlbVtjb2xEYXRhLmtleV0gfSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge2NvbERhdGEuY29udGVudCAhPSB1bmRlZmluZWQgPyBjb2xEYXRhLmNvbnRlbnQoaXRlbSwgY29sRGF0YS5rZXksIHN0eWxlKSA6IGl0ZW1bY29sRGF0YS5rZXldfVxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5yb3dTdHlsZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXy5jbG9uZSh0aGlzLnByb3BzLnJvd1N0eWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZChpdGVtKSlcclxuICAgICAgICAgICAgICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDx0ciBzdHlsZT17c3R5bGV9IGtleT17aW5kZXgudG9TdHJpbmcoKX0+e2NlbGxzfTwvdHI+O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGRhdGE6IHsgY29sOiBrZXlvZihUKSwgcm93OiBULCBkYXRhOiBhbnkgfSwgZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZGF0YSwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNvcnQoZGF0YSwgZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU29ydChkYXRhKTtcclxuICAgIH1cclxufTtcclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFVzZXJTdGF0aXN0aWNzLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMi8wNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9UYWJsZSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgR2V0QWNjZXNzTG9nQWdncmVnYXRlcywgR2V0QWNjZXNzTG9nVGFibGUsIH0gZnJvbSAnLi8uLi8uLi8uLi9UUy9TZXJ2aWNlcy9Vc2VyJztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmludGVyZmFjZSBBZ2dyZWdhdGUge1xyXG4gICAgRGF0ZTogc3RyaW5nLFxyXG4gICAgQ291bnQ6IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgQWNjZXNMb2dUYWJsZSB7XHJcbiAgICBVc2VyTmFtZTogc3RyaW5nLFxyXG4gICAgTG9naW5zOiBudW1iZXIsXHJcbiAgICBMYXN0QWNjZXNzOiBzdHJpbmdcclxufVxyXG5cclxuY29uc3QgVXNlclN0YXRpc3RpY3M6IFN5c3RlbUNlbnRlci5CeUNvbXBvbmVudCA9IChwcm9wcykgPT4ge1xyXG4gICAgbGV0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XHJcbiAgICBsZXQgc3ZnV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIDI1MCAtIDMwO1xyXG4gICAgbGV0IHN2Z0hlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSA3NSkgKiAuMzM7XHJcbiAgICBsZXQgbWFyZ2luID0geyB0b3A6IDIwLCByaWdodDogMjAsIGJvdHRvbTogMjAsIGxlZnQ6IDUwIH07XHJcbiAgICBsZXQgd2lkdGggPSBzdmdXaWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xyXG4gICAgbGV0IGhlaWdodCA9IHN2Z0hlaWdodCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xyXG4gICAgLy9sZXQgc3ZnID0gZDMuc2VsZWN0KCdzdmcnKS5hdHRyKFwid2lkdGhcIiwgc3ZnV2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgc3ZnSGVpZ2h0KTtcclxuICAgIFxyXG4gICAgY29uc3QgW3NjQWdncmVnYXRlcywgc2V0U2NBZ2dyZWdhdGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PEFnZ3JlZ2F0ZT4+KFtdKTtcclxuICAgIGNvbnN0IFt4ZGFBZ2dyZWdhdGVzLCBzZXRYREFBZ2dyZWdhdGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PEFnZ3JlZ2F0ZT4+KFtdKTtcclxuICAgIGNvbnN0IFtkYXlzLCBzZXREYXlzXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oMzApO1xyXG4gICAgY29uc3QgW3gsIHNldFhdID0gUmVhY3QudXNlU3RhdGU8ZDMuU2NhbGVUaW1lPG51bWJlciwgbnVtYmVyPj4obnVsbCk7XHJcbiAgICBjb25zdCBbWSwgc2V0WV0gPSBSZWFjdC51c2VTdGF0ZTxkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4+KG51bGwpO1xyXG4gICAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IFJlYWN0LnVzZVN0YXRlPFN5c3RlbUNlbnRlci5BdHRhY2hlZERhdGFiYXNlcz4oJ1N5c3RlbUNlbnRlcicpO1xyXG4gICAgY29uc3QgW3RhYmxlRGF0YSwgc2V0VGFibGVEYXRhXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PEFjY2VzTG9nVGFibGU+PihbXSk7XHJcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignTG9naW5zJyk7XHJcbiAgICBjb25zdCBbYXNjZW5kaW5nLCBzZXRBc2NlbmRpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgR2V0RGF0YShkYXlzLCB0YWIpO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIEdldERhdGEoZDogbnVtYmVyLCB0OiBTeXN0ZW1DZW50ZXIuQXR0YWNoZWREYXRhYmFzZXMpIHtcclxuICAgICAgICBsZXQgc2NhID0gYXdhaXQgR2V0QWNjZXNzTG9nQWdncmVnYXRlcyhcIlN5c3RlbUNlbnRlclwiLCBkKTtcclxuICAgICAgICBsZXQgeGRhYSA9IGF3YWl0IEdldEFjY2Vzc0xvZ0FnZ3JlZ2F0ZXMoXCJPcGVuWERBXCIsIGQpO1xyXG4gICAgICAgIERyYXdDaGFydChzY2EsIHhkYWEpO1xyXG4gICAgICAgIEdldFRhYmxlRGF0YSh0KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIEdldFRhYmxlRGF0YShkYjogU3lzdGVtQ2VudGVyLkF0dGFjaGVkRGF0YWJhc2VzICkge1xyXG4gICAgICAgIGxldCB0YWJsZSA9IGF3YWl0IEdldEFjY2Vzc0xvZ1RhYmxlKGRiLCBkYXlzKTtcclxuICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeSh0YWJsZSwgW3NvcnRGaWVsZF0sIFsoYXNjZW5kaW5nID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pXHJcbiAgICAgICAgc2V0VGFibGVEYXRhKG9yZGVyZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIERyYXdDaGFydChzY2E6IEFycmF5PEFnZ3JlZ2F0ZT4sIHhkYWE6IEFycmF5PEFnZ3JlZ2F0ZT4pIHtcclxuICAgICAgICBsZXQgbWF4Q291bnRzID0gc2NhLm1hcCgodmFsdWUsIGluZGV4KSA9PiBNYXRoLm1heChzY2FbaW5kZXhdLkNvdW50LCB4ZGFhW2luZGV4XS5Db3VudCkpO1xyXG5cclxuICAgICAgICBsZXQgeCA9IGQzLnNjYWxlVGltZSgpLnJhbmdlUm91bmQoWzAsIHdpZHRoXSk7XHJcbiAgICAgICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlUm91bmQoW2hlaWdodCAtIDE1LCAwXSk7XHJcblxyXG4gICAgICAgIGxldCBsaW5lID0gZDMubGluZTxBZ2dyZWdhdGU+KCkueChkID0+IHgobW9tZW50KGQuRGF0ZSkpKS55KGQgPT4geShkLkNvdW50KSk7XHJcbiAgICAgICAgeS5kb21haW4oZDMuZXh0ZW50KG1heENvdW50cywgZCA9PiBkKSk7XHJcbiAgICAgICAgeC5kb21haW4oZDMuZXh0ZW50KHNjYSwgZCA9PiBtb21lbnQoZC5EYXRlKSkpO1xyXG4gICAgICAgIGQzLnNlbGVjdCgnI3lheGlzJykuY2FsbChkMy5heGlzTGVmdCh5KSkuY2FsbChnID0+IGcuc2VsZWN0KFwiLmRvbWFpblwiKS5yZW1vdmUoKSk7XHJcbiAgICAgICAgZDMuc2VsZWN0KCcjeGF4aXMnKS5jYWxsKGQzLmF4aXNCb3R0b20oeCkpLmNhbGwoZyA9PiBnLnNlbGVjdChcIi5kb21haW5cIikucmVtb3ZlKCkpO1xyXG4gICAgICAgIGQzLnNlbGVjdCgnI3NjYXBhdGgnKS5kYXR1bShzY2EpLmF0dHIoJ2QnLCBsaW5lKVxyXG4gICAgICAgIGQzLnNlbGVjdCgnI3hkYXBhdGgnKS5kYXR1bSh4ZGFhKS5hdHRyKCdkJywgbGluZSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb3BzLlJvbGVzLmluZGV4T2YoJ0FkbWluaXN0cmF0b3InKSA8IDApIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBwYWRkaW5nOiAnMTBweCAxMHB4IDEwcHggMjBweCcgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMj5Vc2VyIFN0YXRpc3RpY3M8L2gyPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e2RheXN9IG9uQ2hhbmdlPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXREYXlzKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdldERhdGEocGFyc2VJbnQoZS50YXJnZXQudmFsdWUpLCB0YWIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSczMCc+TGFzdCAzMCBkYXlzPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9JzYwJz5MYXN0IDYwIGRheXM8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nOTAnPkxhc3QgOTAgZGF5czwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPScxODAnPkxhc3QgMTgwIGRheXM8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0nMzY1Jz5MYXN0IDM2NSBkYXlzPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aHIvPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJ2NhbGMoIDEwMCUpJyB9fT5cclxuICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9e3N2Z1dpZHRofSBoZWlnaHQ9e3N2Z0hlaWdodCB9IHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCBsaWdodGdyYXknLyosIHBvc2l0aW9uOiBcImFic29sdXRlXCIsIGxlZnQ6IDIwKi8gfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J3hheGlzJyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW4ubGVmdCAtIDIwfSwke2hlaWdodCArIDEwfSlgfT48L2c+XHJcbiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J3lheGlzJyB0cmFuc2Zvcm09e1widHJhbnNsYXRlKFwiICsgKG1hcmdpbi5sZWZ0IC0gMjApICsgXCIsMjUpXCJ9PjwvZz5cclxuICAgICAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09e1widHJhbnNsYXRlKFwiICsgKG1hcmdpbi5sZWZ0IC0gMjApICsgXCIsMjUpXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0nc2NhcGF0aCcgZmlsbD0nbm9uZScgc3Ryb2tlTGluZWpvaW49J3JvdW5kJyBzdHJva2VXaWR0aD0nMS41JyBzdHJva2U9J3N0ZWVsYmx1ZScvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0neGRhcGF0aCcgZmlsbD0nbm9uZScgc3Ryb2tlTGluZWpvaW49J3JvdW5kJyBzdHJva2VXaWR0aD0nMS41JyBzdHJva2U9J3JlZCcvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IGBjYWxjKDEwMCUgLSAke3N2Z0hlaWdodH1weClgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+ICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiU3lzdGVtQ2VudGVyXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGFiKCdTeXN0ZW1DZW50ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdldFRhYmxlRGF0YSgnU3lzdGVtQ2VudGVyJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPSdzdGVlbGJsdWUnIHN0cm9rZVdpZHRoPSczJyBzdHJva2U9J3JnYigwLDAsMCknIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3ttYXJnaW5MZWZ0OiAxMH19PlN5c3RlbSBDZW50ZXI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiT3BlblhEQVwiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRhYignT3BlblhEQScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2V0VGFibGVEYXRhKCdPcGVuWERBJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPSdyZWQnIHN0cm9rZVdpZHRoPSczJyBzdHJva2U9J3JnYigwLDAsMCknIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogMTAgfX0+T3BlblhEQTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCIgc3R5bGU9e3sgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMzUsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItcGFuZSAgYWN0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFibGU8QWNjZXNMb2dUYWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnVXNlck5hbWUnLCBsYWJlbDogJ1VzZXInLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdMb2dpbnMnLCBsYWJlbDogJ0xvZ2lucyBmb3IgUGVyaW9kJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTGFzdEFjY2VzcycsIGxhYmVsOiAnTGFzdCBBY2Nlc3MgVGltZSAnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0YWJsZURhdGF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydEZpZWxkPXtzb3J0RmllbGR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5jb2wgPT0gc29ydEZpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeSh0YWJsZURhdGEsIFtkLmNvbF0sIFsoIWFzY2VuZGluZyA/IFwiYXNjXCIgOiBcImRlc2NcIildKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRhYmxlRGF0YShvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KHRhYmxlRGF0YSwgW2QuY29sXSwgW1wiYXNjXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRhYmxlRGF0YShvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZChkLmNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVhZFN0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDMwMCwgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd1N0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eyhpdGVtKSA9PiBmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVXNlclN0YXRpc3RpY3M7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=