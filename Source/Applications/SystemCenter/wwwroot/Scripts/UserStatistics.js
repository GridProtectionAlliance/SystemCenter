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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9TZXJ2aWNlcy9Vc2VyLnRzIiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9UYWJsZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Vc2VyU3RhdGlzdGljcy9Vc2VyU3RhdGlzdGljcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RyxrQkFBa0I7QUFDbEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3RztBQU1qRyxTQUFTLGtCQUFrQixDQUFDLFdBQW1CO0lBQ2xELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFLLFFBQVEscUNBQWtDO1FBQ2xELFdBQVcsRUFBRSxpQ0FBaUM7UUFDOUMsUUFBUSxFQUFFLE1BQU07UUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ2pDLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7QUFFUCxDQUFDO0FBRU0sU0FBUyxTQUFTLENBQUMsR0FBVztJQUNqQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDVixJQUFJLEVBQUUsTUFBTTtRQUNaLEdBQUcsRUFBSyxR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QUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUN6RyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQ3hGLFFBQVEsRUFBRSxVQUFDLElBQUksSUFBSyxZQUFLLEVBQUwsQ0FBSyxHQUMzQixDQUVBLENBQ0osQ0FFSixDQUNKLENBQ0osQ0FDVDtBQUVMLENBQUM7QUFFYyw2RUFBYyxFQUFDIiwiZmlsZSI6IlVzZXJTdGF0aXN0aWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBVc2VyLnRzIC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDIvMDYvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSBcIi4uLy4uL1RTWC9TeXN0ZW1DZW50ZXIvZ2xvYmFsXCI7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U0lERnJvbVVzZXJOYW1lKGFjY291bnROYW1lOiBzdHJpbmcpOiBKUXVlcnkuanFYSFI8c3RyaW5nPiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvVXNlckFjY291bnQvU0lEYCxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShhY2NvdW50TmFtZSksXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXNVc2VyKHNpZDogc3RyaW5nKTogSlF1ZXJ5LmpxWEhSPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9Vc2VyQWNjb3VudC9Jc1VzZXJgLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHNpZCksXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsbGVkVXNlcih1c2VyQWNjb3VudDogU3lzdGVtQ2VudGVyLlVzZXJBY2NvdW50KTogSlF1ZXJ5LmpxWEhSPFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudD4ge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvU3lzdGVtQ2VudGVyL1VzZXJBY2NvdW50L0ZpbGxlZFVzZXJBY2NvdW50YCxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyQWNjb3VudCksXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9sZXMoKTogSlF1ZXJ5LmpxWEhSPEFycmF5PFN5c3RlbUNlbnRlci5Sb2xlPj4ge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9TeXN0ZW1DZW50ZXIvUm9sZWAsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgIGFzeW5jOiB0cnVlXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWN1cml0eVJvbGVzPFQ+KGFwcGxpY2F0aW9uTmFtZTogJ1N5c3RlbUNlbnRlcicgfCAnT3BlblhEQScpOiBKUXVlcnkuanFYSFI8QXJyYXk8U3lzdGVtQ2VudGVyLkFwcGxpY2F0aW9uUm9sZTxUPj4+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvJHthcHBsaWNhdGlvbk5hbWV9L0FwcGxpY2F0aW9uUm9sZWAsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgIGFzeW5jOiB0cnVlXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTZWN1cml0eVJvbGVzRm9yVXNlcihhcHBsaWNhdGlvbk5hbWU6ICdTeXN0ZW1DZW50ZXInIHwgJ09wZW5YREEnLCBkYXRhOiBBcnJheTxTeXN0ZW1DZW50ZXIuQXBwbGljYXRpb25Sb2xlVXNlckFjY291bnQ+KTogSlF1ZXJ5LmpxWEhSPHN0cmluZz4ge1xuICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpLyR7YXBwbGljYXRpb25OYW1lfS9BcHBsaWNhdGlvblJvbGVVc2VyQWNjb3VudC9VcGRhdGVBcnJheWAsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICBhc3luYzogdHJ1ZVxuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWN1cml0eVJvbGVzRm9yVXNlcihpZDogc3RyaW5nLCBhcHBsaWNhdGlvbk5hbWU6ICdTeXN0ZW1DZW50ZXInIHwgJ09wZW5YREEnKTogSlF1ZXJ5LmpxWEhSPEFycmF5PFN5c3RlbUNlbnRlci5BcHBsaWNhdGlvblJvbGVVc2VyQWNjb3VudD4+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvJHthcHBsaWNhdGlvbk5hbWV9L0FwcGxpY2F0aW9uUm9sZVVzZXJBY2NvdW50LyR7aWR9YCxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRTQ3MoKTogSlF1ZXJ5LmpxWEhSPEFycmF5PFN5c3RlbUNlbnRlci5UU0M+PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9UU0NgLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICBhc3luYzogdHJ1ZVxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRVc2VyQWNjb3VudEZpZWxkKHVzZXI6IFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCxmaWVsZDoga2V5b2YgKFN5c3RlbUNlbnRlci5Vc2VyQWNjb3VudCkpOiBib29sZWFuIHtcbiAgICBpZiAoZmllbGQgPT0gJ0FjY291bnROYW1lJylcbiAgICAgICAgcmV0dXJuIHVzZXIuTmFtZSAhPSBudWxsICYmIHVzZXIuTmFtZS5sZW5ndGggPiAwICYmIHVzZXIuTmFtZS5sZW5ndGggPD0gMjAwO1xuICAgIGlmIChmaWVsZCA9PSAnTmFtZScpXG4gICAgICAgIHJldHVybiB1c2VyLk5hbWUgIT0gbnVsbCAmJiB1c2VyLk5hbWUubGVuZ3RoID4gMCAmJiB1c2VyLk5hbWUubGVuZ3RoIDw9IDIwMDtcbiAgICBlbHNlIGlmIChmaWVsZCA9PSAnUGFzc3dvcmQnKVxuICAgICAgICByZXR1cm4gdXNlci5QYXNzd29yZCA9PSBudWxsIHx8IHVzZXIuUGFzc3dvcmQubGVuZ3RoIDw9IDIwMDtcbiAgICBlbHNlIGlmIChmaWVsZCA9PSAnRmlyc3ROYW1lJylcbiAgICAgICAgcmV0dXJuIHVzZXIuRmlyc3ROYW1lID09IG51bGwgfHwgdXNlci5GaXJzdE5hbWUubGVuZ3RoIDw9IDIwMDtcbiAgICBlbHNlIGlmIChmaWVsZCA9PSAnTGFzdE5hbWUnKVxuICAgICAgICByZXR1cm4gdXNlci5MYXN0TmFtZSA9PSBudWxsIHx8IHVzZXIuTGFzdE5hbWUubGVuZ3RoIDw9IDIwMDtcbiAgICBlbHNlIGlmIChmaWVsZCA9PSAnUGhvbmUnKVxuICAgICAgICByZXR1cm4gdXNlci5QaG9uZSA9PSBudWxsIHx8IHVzZXIuUGhvbmUubGVuZ3RoIDw9IDIwMDtcbiAgICBlbHNlIGlmIChmaWVsZCA9PSAnRW1haWwnKVxuICAgICAgICByZXR1cm4gdXNlci5FbWFpbCA9PSBudWxsIHx8IHVzZXIuRW1haWwubGVuZ3RoIDw9IDIwMDtcbiAgICBlbHNlIGlmIChmaWVsZCA9PSAnVGl0bGUnKVxuICAgICAgICByZXR1cm4gdXNlci5UaXRsZSA9PSBudWxsIHx8IHVzZXIuVGl0bGUubGVuZ3RoIDw9IDIwMDtcbiAgICBlbHNlIGlmIChmaWVsZCA9PSAnTW9iaWxlUGhvbmUnKVxuICAgICAgICByZXR1cm4gdXNlci5Nb2JpbGVQaG9uZSA9PSBudWxsIHx8IHVzZXIuTW9iaWxlUGhvbmUubGVuZ3RoIDw9IDIwMDtcblxuICAgIHJldHVybiBmYWxzZTtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gR2V0QWNjZXNzTG9nQWdncmVnYXRlcyhkYXRhYmFzZTogU3lzdGVtQ2VudGVyLkF0dGFjaGVkRGF0YWJhc2VzLCBkYXlzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvJHtkYXRhYmFzZX0vQWNjZXNzTG9nL0FnZ3JlZ2F0ZXMvJHtkYXlzfWAsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBhc3luYzogdHJ1ZVxuICAgIH0pO1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHZXRBY2Nlc3NMb2dUYWJsZShkYXRhYmFzZTogU3lzdGVtQ2VudGVyLkF0dGFjaGVkRGF0YWJhc2VzLCBkYXlzOiBudW1iZXIpIHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvJHtkYXRhYmFzZX0vQWNjZXNzTG9nL1RhYmxlLyR7ZGF5c31gLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KTtcblxufVxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBUYWJsZS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDE4LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOC8wMi8yMDE4IC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IEFuZ2xlSWNvbjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8eyBhc2NlbmRpbmc6IGJvb2xlYW4gfT4gPSAocHJvcHMpID0+IDxzcGFuIHN0eWxlPXt7IHdpZHRoOiAxMCwgaGVpZ2h0OiAxMCwgbWFyZ2luOiAzIH19IGNsYXNzTmFtZT17XCJmYSBmYS1hbmdsZS1cIiArIChwcm9wcy5hc2NlbmRpbmcgPyAndXAnIDogJ2Rvd24nKX0+PC9zcGFuPlxuXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlUHJvcHM8VD4ge1xuICAgIGNvbHM6IEFycmF5PHsga2V5OiBrZXlvZihUKSB8IG51bGwsIGxhYmVsOiBzdHJpbmcsIGhlYWRlclN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcywgcm93U3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLCBjb250ZW50PyhpdGVtOiBULCBrZXk6IGtleW9mKFQpLCBzdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyk6IFJlYWN0LlJlYWN0Tm9kZSB9PixcbiAgICBkYXRhOiBBcnJheTxUPixcbiAgICBvbkNsaWNrOiAoZGF0YTogeyBjb2w6IGtleW9mIChUKSwgcm93OiBULCBkYXRhOiBUW2tleW9mKFQpXSB9LCBldmVudDogYW55KSA9PiB2b2lkLFxuICAgIHNvcnRGaWVsZDogc3RyaW5nLFxuICAgIGFzY2VuZGluZzogYm9vbGVhbixcbiAgICBvblNvcnQoZGF0YTogeyBjb2w6IGtleW9mIChUKSwgYXNlbmRpbmc6IGJvb2xlYW59KTogdm9pZCxcbiAgICB0YWJsZUNsYXNzPzogc3RyaW5nLFxuICAgIHRhYmxlU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxuICAgIHRoZWFkU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxuICAgIHRoZWFkQ2xhc3M/OiBzdHJpbmcsXG4gICAgdGJvZHlTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsXG4gICAgdGJvZHlDbGFzcz86IHN0cmluZyxcbiAgICBzZWxlY3RlZD8oZGF0YTogVCk6IGJvb2xlYW4sXG4gICAgcm93U3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZTxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxUYWJsZVByb3BzPFQ+LCB7fT4ge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciByb3dDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZVJvd3MoKTtcbiAgICAgICAgdmFyIGhlYWRlckNvbXBvbmVudHMgPSB0aGlzLmdlbmVyYXRlSGVhZGVycygpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17KHRoaXMucHJvcHMudGFibGVDbGFzcyAhPSB1bmRlZmluZWQgPyB0aGlzLnByb3BzLnRhYmxlQ2xhc3MgOiAnJyl9IHN0eWxlPXt0aGlzLnByb3BzLnRhYmxlU3R5bGV9PlxuICAgICAgICAgICAgICAgIDx0aGVhZCBzdHlsZT17dGhpcy5wcm9wcy50aGVhZFN0eWxlfT57aGVhZGVyQ29tcG9uZW50c308L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBzdHlsZT17dGhpcy5wcm9wcy50Ym9keVN0eWxlfT57cm93Q29tcG9uZW50c308L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUhlYWRlcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbHMubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciBjZWxscyA9IHRoaXMucHJvcHMuY29scy5tYXAoKGNvbERhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgc3R5bGU7XG4gICAgICAgICAgICBpZiAoY29sRGF0YS5oZWFkZXJTdHlsZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGNvbERhdGEuaGVhZGVyU3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcblxuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17aW5kZXh9IHN0eWxlPXtzdHlsZX0gb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlU29ydCh7IGNvbDogY29sRGF0YS5rZXksIGFzY2VuZGluZzogdGhpcy5wcm9wcy5hc2NlbmRpbmcgfSwgZSl9Pntjb2xEYXRhLmxhYmVsfXsodGhpcy5wcm9wcy5zb3J0RmllbGQgPT0gY29sRGF0YS5rZXkgPyA8QW5nbGVJY29uIGFzY2VuZGluZz17dGhpcy5wcm9wcy5hc2NlbmRpbmd9IC8+IDogbnVsbCl9PC90aD5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIDx0cj57Y2VsbHN9PC90cj47XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVSb3dzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IHRoaXMucHJvcHMuY29scy5tYXAoY29sRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gXy5jbG9uZShjb2xEYXRhLnJvd1N0eWxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gPHRkXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXgudG9TdHJpbmcoKSArIGl0ZW1bY29sRGF0YS5rZXldICsgY29sRGF0YS5rZXl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHsgY29sOiBjb2xEYXRhLmtleSwgcm93OiBpdGVtLCBkYXRhOiBpdGVtW2NvbERhdGEua2V5XSB9KX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtjb2xEYXRhLmNvbnRlbnQgIT0gdW5kZWZpbmVkID8gY29sRGF0YS5jb250ZW50KGl0ZW0sIGNvbERhdGEua2V5LCBzdHlsZSkgOiBpdGVtW2NvbERhdGEua2V5XX1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBzdHlsZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMucm93U3R5bGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBfLmNsb25lKHRoaXMucHJvcHMucm93U3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0eWxlID0ge307XG5cbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWQoaXRlbSkpXG4gICAgICAgICAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG5cbiAgICAgICAgICAgIHJldHVybiA8dHIgc3R5bGU9e3N0eWxlfSBrZXk9e2luZGV4LnRvU3RyaW5nKCl9PntjZWxsc308L3RyPjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZGF0YTogeyBjb2w6IGtleW9mKFQpLCByb3c6IFQsIGRhdGE6IGFueSB9LCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZGF0YSwgZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZVNvcnQoZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNvcnQoZGF0YSk7XG4gICAgfVxufTtcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgVXNlclN0YXRpc3RpY3MudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDIvMDcvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRhYmxlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvVGFibGUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IHsgR2V0QWNjZXNzTG9nQWdncmVnYXRlcywgR2V0QWNjZXNzTG9nVGFibGUsIH0gZnJvbSAnLi8uLi8uLi8uLi9UUy9TZXJ2aWNlcy9Vc2VyJztcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmludGVyZmFjZSBBZ2dyZWdhdGUge1xuICAgIERhdGU6IHN0cmluZyxcbiAgICBDb3VudDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBBY2Nlc0xvZ1RhYmxlIHtcbiAgICBVc2VyTmFtZTogc3RyaW5nLFxuICAgIExvZ2luczogbnVtYmVyLFxuICAgIExhc3RBY2Nlc3M6IHN0cmluZ1xufVxuXG5jb25zdCBVc2VyU3RhdGlzdGljczogU3lzdGVtQ2VudGVyLkJ5Q29tcG9uZW50ID0gKHByb3BzKSA9PiB7XG4gICAgbGV0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XG4gICAgbGV0IHN2Z1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSAyNTAgLSAzMDtcbiAgICBsZXQgc3ZnSGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIDc1KSAqIC4zMztcbiAgICBsZXQgbWFyZ2luID0geyB0b3A6IDIwLCByaWdodDogMjAsIGJvdHRvbTogMjAsIGxlZnQ6IDUwIH07XG4gICAgbGV0IHdpZHRoID0gc3ZnV2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgICBsZXQgaGVpZ2h0ID0gc3ZnSGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG4gICAgLy9sZXQgc3ZnID0gZDMuc2VsZWN0KCdzdmcnKS5hdHRyKFwid2lkdGhcIiwgc3ZnV2lkdGgpLmF0dHIoXCJoZWlnaHRcIiwgc3ZnSGVpZ2h0KTtcbiAgICBcbiAgICBjb25zdCBbc2NBZ2dyZWdhdGVzLCBzZXRTY0FnZ3JlZ2F0ZXNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8QWdncmVnYXRlPj4oW10pO1xuICAgIGNvbnN0IFt4ZGFBZ2dyZWdhdGVzLCBzZXRYREFBZ2dyZWdhdGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PEFnZ3JlZ2F0ZT4+KFtdKTtcbiAgICBjb25zdCBbZGF5cywgc2V0RGF5c10gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KDMwKTtcbiAgICBjb25zdCBbeCwgc2V0WF0gPSBSZWFjdC51c2VTdGF0ZTxkMy5TY2FsZVRpbWU8bnVtYmVyLCBudW1iZXI+PihudWxsKTtcbiAgICBjb25zdCBbWSwgc2V0WV0gPSBSZWFjdC51c2VTdGF0ZTxkMy5TY2FsZUxpbmVhcjxudW1iZXIsIG51bWJlcj4+KG51bGwpO1xuICAgIGNvbnN0IFt0YWIsIHNldFRhYl0gPSBSZWFjdC51c2VTdGF0ZTxTeXN0ZW1DZW50ZXIuQXR0YWNoZWREYXRhYmFzZXM+KCdTeXN0ZW1DZW50ZXInKTtcbiAgICBjb25zdCBbdGFibGVEYXRhLCBzZXRUYWJsZURhdGFdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8QWNjZXNMb2dUYWJsZT4+KFtdKTtcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignTG9naW5zJyk7XG4gICAgY29uc3QgW2FzY2VuZGluZywgc2V0QXNjZW5kaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIEdldERhdGEoZGF5cywgdGFiKTtcbiAgICB9LCBbXSk7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBHZXREYXRhKGQ6IG51bWJlciwgdDogU3lzdGVtQ2VudGVyLkF0dGFjaGVkRGF0YWJhc2VzKSB7XG4gICAgICAgIGxldCBzY2EgPSBhd2FpdCBHZXRBY2Nlc3NMb2dBZ2dyZWdhdGVzKFwiU3lzdGVtQ2VudGVyXCIsIGQpO1xuICAgICAgICBsZXQgeGRhYSA9IGF3YWl0IEdldEFjY2Vzc0xvZ0FnZ3JlZ2F0ZXMoXCJPcGVuWERBXCIsIGQpO1xuICAgICAgICBEcmF3Q2hhcnQoc2NhLCB4ZGFhKTtcbiAgICAgICAgR2V0VGFibGVEYXRhKHQpXG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gR2V0VGFibGVEYXRhKGRiOiBTeXN0ZW1DZW50ZXIuQXR0YWNoZWREYXRhYmFzZXMgKSB7XG4gICAgICAgIGxldCB0YWJsZSA9IGF3YWl0IEdldEFjY2Vzc0xvZ1RhYmxlKGRiLCBkYXlzKTtcbiAgICAgICAgdmFyIG9yZGVyZWQgPSBfLm9yZGVyQnkodGFibGUsIFtzb3J0RmllbGRdLCBbKGFzY2VuZGluZyA/IFwiYXNjXCIgOiBcImRlc2NcIildKVxuICAgICAgICBzZXRUYWJsZURhdGEob3JkZXJlZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gRHJhd0NoYXJ0KHNjYTogQXJyYXk8QWdncmVnYXRlPiwgeGRhYTogQXJyYXk8QWdncmVnYXRlPikge1xuICAgICAgICBsZXQgbWF4Q291bnRzID0gc2NhLm1hcCgodmFsdWUsIGluZGV4KSA9PiBNYXRoLm1heChzY2FbaW5kZXhdLkNvdW50LCB4ZGFhW2luZGV4XS5Db3VudCkpO1xuXG4gICAgICAgIGxldCB4ID0gZDMuc2NhbGVUaW1lKCkucmFuZ2VSb3VuZChbMCwgd2lkdGhdKTtcbiAgICAgICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpLnJhbmdlUm91bmQoW2hlaWdodCAtIDE1LCAwXSk7XG5cbiAgICAgICAgbGV0IGxpbmUgPSBkMy5saW5lPEFnZ3JlZ2F0ZT4oKS54KGQgPT4geChtb21lbnQoZC5EYXRlKSkpLnkoZCA9PiB5KGQuQ291bnQpKTtcbiAgICAgICAgeS5kb21haW4oZDMuZXh0ZW50KG1heENvdW50cywgZCA9PiBkKSk7XG4gICAgICAgIHguZG9tYWluKGQzLmV4dGVudChzY2EsIGQgPT4gbW9tZW50KGQuRGF0ZSkpKTtcbiAgICAgICAgZDMuc2VsZWN0KCcjeWF4aXMnKS5jYWxsKGQzLmF4aXNMZWZ0KHkpKS5jYWxsKGcgPT4gZy5zZWxlY3QoXCIuZG9tYWluXCIpLnJlbW92ZSgpKTtcbiAgICAgICAgZDMuc2VsZWN0KCcjeGF4aXMnKS5jYWxsKGQzLmF4aXNCb3R0b20oeCkpLmNhbGwoZyA9PiBnLnNlbGVjdChcIi5kb21haW5cIikucmVtb3ZlKCkpO1xuICAgICAgICBkMy5zZWxlY3QoJyNzY2FwYXRoJykuZGF0dW0oc2NhKS5hdHRyKCdkJywgbGluZSlcbiAgICAgICAgZDMuc2VsZWN0KCcjeGRhcGF0aCcpLmRhdHVtKHhkYWEpLmF0dHIoJ2QnLCBsaW5lKVxuXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLlJvbGVzLmluZGV4T2YoJ0FkbWluaXN0cmF0b3InKSA8IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScsIHBhZGRpbmc6ICcxMHB4IDEwcHggMTBweCAyMHB4JyB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPlVzZXIgU3RhdGlzdGljczwvaDI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17ZGF5c30gb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXREYXlzKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBHZXREYXRhKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSwgdGFiKTtcbiAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSczMCc+TGFzdCAzMCBkYXlzPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSc2MCc+TGFzdCA2MCBkYXlzPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSc5MCc+TGFzdCA5MCBkYXlzPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPScxODAnPkxhc3QgMTgwIGRheXM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9JzM2NSc+TGFzdCAzNjUgZGF5czwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICdjYWxjKCAxMDAlKScgfX0+XG4gICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD17c3ZnV2lkdGh9IGhlaWdodD17c3ZnSGVpZ2h0IH0gc3R5bGU9e3sgYm9yZGVyOiAnMXB4IHNvbGlkIGxpZ2h0Z3JheScvKiwgcG9zaXRpb246IFwiYWJzb2x1dGVcIiwgbGVmdDogMjAqLyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9J3hheGlzJyB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttYXJnaW4ubGVmdCAtIDIwfSwke2hlaWdodCArIDEwfSlgfT48L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIGlkPSd5YXhpcycgdHJhbnNmb3JtPXtcInRyYW5zbGF0ZShcIiArIChtYXJnaW4ubGVmdCAtIDIwKSArIFwiLDI1KVwifT48L2c+XG4gICAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT17XCJ0cmFuc2xhdGUoXCIgKyAobWFyZ2luLmxlZnQgLSAyMCkgKyBcIiwyNSlcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0nc2NhcGF0aCcgZmlsbD0nbm9uZScgc3Ryb2tlTGluZWpvaW49J3JvdW5kJyBzdHJva2VXaWR0aD0nMS41JyBzdHJva2U9J3N0ZWVsYmx1ZScvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9J3hkYXBhdGgnIGZpbGw9J25vbmUnIHN0cm9rZUxpbmVqb2luPSdyb3VuZCcgc3Ryb2tlV2lkdGg9JzEuNScgc3Ryb2tlPSdyZWQnLz5cbiAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiBgY2FsYygxMDAlIC0gJHtzdmdIZWlnaHR9cHgpYCB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtdGFic1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+ICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcIlN5c3RlbUNlbnRlclwiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUYWIoJ1N5c3RlbUNlbnRlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdldFRhYmxlRGF0YSgnU3lzdGVtQ2VudGVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiBmaWxsPSdzdGVlbGJsdWUnIHN0cm9rZVdpZHRoPSczJyBzdHJva2U9J3JnYigwLDAsMCknIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e21hcmdpbkxlZnQ6IDEwfX0+U3lzdGVtIENlbnRlcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiT3BlblhEQVwiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUYWIoJ09wZW5YREEnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZXRUYWJsZURhdGEoJ09wZW5YREEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIGZpbGw9J3JlZCcgc3Ryb2tlV2lkdGg9JzMnIHN0cm9rZT0ncmdiKDAsMCwwKScgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19Pk9wZW5YREE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCIgc3R5bGU9e3sgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMzUsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFiLXBhbmUgIGFjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZTxBY2Nlc0xvZ1RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ1VzZXJOYW1lJywgbGFiZWw6ICdVc2VyJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xvZ2lucycsIGxhYmVsOiAnTG9naW5zIGZvciBQZXJpb2QnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTGFzdEFjY2VzcycsIGxhYmVsOiAnTGFzdCBBY2Nlc3MgVGltZSAnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt0YWJsZURhdGF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KHRhYmxlRGF0YSwgW2QuY29sXSwgWyghYXNjZW5kaW5nID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRhYmxlRGF0YShvcmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KHRhYmxlRGF0YSwgW2QuY29sXSwgW1wiYXNjXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUYWJsZURhdGEob3JkZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkKGQuY29sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDMwMCwgd2lkdGg6ICcxMDAlJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KGl0ZW0pID0+IGZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApXG4gICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgVXNlclN0YXRpc3RpY3M7XG4iXSwic291cmNlUm9vdCI6IiJ9