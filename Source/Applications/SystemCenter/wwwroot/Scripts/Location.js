(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Location"],{

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

/***/ "./TSX/SystemCenter/Location/Location.tsx":
/*!************************************************!*\
  !*** ./TSX/SystemCenter/Location/Location.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LocationInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LocationInfo */ "./TSX/SystemCenter/Location/LocationInfo.tsx");
/* harmony import */ var _LocationMeter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LocationMeter */ "./TSX/SystemCenter/Location/LocationMeter.tsx");
/* harmony import */ var _LocationAsset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LocationAsset */ "./TSX/SystemCenter/Location/LocationAsset.tsx");
/* harmony import */ var _CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/NoteWindow */ "./TSX/SystemCenter/CommonComponents/NoteWindow.tsx");
/* harmony import */ var _CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../CommonComponents/AdditionalFieldsWindow */ "./TSX/SystemCenter/CommonComponents/AdditionalFieldsWindow.tsx");
/* harmony import */ var _CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommonComponents/ExternalDBUpdate */ "./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx");
//******************************************************************************************************
//  Location.tsx - Gbtc
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
//  01/21/2020 - Billy Ernest
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







var Location = /** @class */ (function (_super) {
    __extends(Location, _super);
    function Location(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Location: null,
            Tab: _this.getTab()
        };
        return _this;
    }
    Location.prototype.getTab = function () {
        if (sessionStorage.hasOwnProperty('Location.Tab'))
            return JSON.parse(sessionStorage.getItem('Location.Tab'));
        else
            return 'notes';
    };
    Location.prototype.getLocation = function () {
        var _this = this;
        if (this.props.LocationID == undefined)
            return;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location/One/" + this.props.LocationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (data) { return _this.setState({ Location: data }); });
    };
    Location.prototype.deleteLocation = function () {
        var response = confirm("This will delete the Substation Permanently");
        if (!response)
            return;
        return $.ajax({
            type: "DELETE",
            url: homePath + "api/OpenXDA/Location/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Location),
            dataType: 'json',
            cache: true,
            async: true
        });
    };
    Location.prototype.setTab = function (tab) {
        sessionStorage.setItem('Location.Tab', JSON.stringify(tab));
        this.setState({ Tab: tab });
    };
    Location.prototype.componentDidMount = function () {
        this.getLocation();
    };
    Location.prototype.componentWillUnmount = function () {
        sessionStorage.clear();
    };
    Location.prototype.render = function () {
        var _this = this;
        if (this.state.Location == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, this.state.Location != null ? this.state.Location.LocationKey : '')),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", hidden: this.state.Location == null, onClick: function () { return _this.deleteLocation().done(function () { return window.location.href = homePath + 'index.cshtml?name=Locations'; }); } }, "Delete Location (Permanent)"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "notes" ? " active" : ""), onClick: function () { return _this.setTab('notes'); }, "data-toggle": "tab", href: "#notes" }, "Notes")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "locationInfo" ? " active" : ""), onClick: function () { return _this.setTab('locationInfo'); }, "data-toggle": "tab", href: "#locationInfo" }, "Location Info")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "additionalFields" ? " active" : ""), onClick: function () { return _this.setTab('additionalFields'); }, "data-toggle": "tab", href: "#additionalFields" }, "Additional Fields")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "meters" ? " active" : ""), onClick: function () { return _this.setTab('meters'); }, "data-toggle": "tab", href: "#meters" }, "Meters")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "assets" ? " active" : ""), onClick: function () { return _this.setTab('assets'); }, "data-toggle": "tab", href: "#assets" }, "Assets")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "extDB" ? " active" : ""), onClick: function () { return _this.setTab('extDB'); }, "data-toggle": "tab", href: "#extDB" }, "External DB"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 215, overflow: 'hidden' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "notes" ? " active" : "fade"), id: "notes" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_4__["default"], { ID: this.props.LocationID, Type: 'Location' })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "locationInfo" ? " active" : "fade"), id: "locationInfo" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LocationInfo__WEBPACK_IMPORTED_MODULE_1__["default"], { Location: this.state.Location, stateSetter: function (Location) { return _this.setState({ Location: Location }); } })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "additionalFields" ? " active" : "fade"), id: "additionalFields" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_5__["default"], { ID: this.props.LocationID, Type: 'Location', Tab: this.state.Tab })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "meters" ? " active" : "fade"), id: "meters" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LocationMeter__WEBPACK_IMPORTED_MODULE_2__["default"], { Location: this.state.Location })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "assets" ? " active" : "fade"), id: "assets" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LocationAsset__WEBPACK_IMPORTED_MODULE_3__["default"], { Location: this.state.Location })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "extDB" ? " active" : "fade"), id: "extDB" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_6__["default"], { ID: this.props.LocationID, Type: 'Location', Tab: this.state.Tab })))));
    };
    return Location;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Location);


/***/ }),

/***/ "./TSX/SystemCenter/Location/LocationAsset.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/Location/LocationAsset.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../AssetAttribute/Breaker */ "./TSX/SystemCenter/AssetAttribute/Breaker.tsx");
/* harmony import */ var _AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../AssetAttribute/Bus */ "./TSX/SystemCenter/AssetAttribute/Bus.tsx");
/* harmony import */ var _AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AssetAttribute/CapBank */ "./TSX/SystemCenter/AssetAttribute/CapBank.tsx");
/* harmony import */ var _AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../AssetAttribute/Line */ "./TSX/SystemCenter/AssetAttribute/Line.tsx");
/* harmony import */ var _AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../AssetAttribute/Transformer */ "./TSX/SystemCenter/AssetAttribute/Transformer.tsx");
/* harmony import */ var _TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../TS/Services/Asset */ "./TS/Services/Asset.ts");
//******************************************************************************************************
//  LocationAsset.tsx - Gbtc
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
//  01/21/2020 - Billy Ernest
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











function LocationAssetWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), data = _a[0], setData = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["AssetAttributes"].getNewAsset('Line')), 2), newEditAsset = _d[0], setNewEditAsset = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('New'), 2), newEdit = _e[0], setNewEdit = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), assetTypes = _f[0], setAssetTypes = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), allAssets = _g[0], setAllAssets = _g[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getDatas();
    }, [props.Location.ID]);
    function getDatas() {
        getAssets();
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["getAllAssets"])().done(function (assets) {
            setAllAssets(assets);
        });
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["getAssetTypes"])().done(function (assetTypes) {
            setAssetTypes(assetTypes);
        });
    }
    function getAssets() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location/" + props.Location.ID + "/Assets",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data, _) { return setData(data); });
    }
    function addNewAsset() {
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Asset/New/Location/" + props.Location.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: newEditAsset }),
            cache: false,
            async: true
        }).done(function () {
            sessionStorage.clear();
            getDatas();
            setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["AssetAttributes"].getNewAsset('Line'));
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
        });
    }
    function addExistingAsset() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, $.ajax({
                        type: "POST",
                        url: homePath + "api/OpenXDA/Asset/Existing/Location/" + props.Location.ID,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        data: JSON.stringify({ Asset: newEditAsset }),
                        cache: false,
                        async: true
                    }).done(function () {
                    }).fail(function (msg) {
                        if (msg.status == 500)
                            alert(msg.responseJSON.ExceptionMessage);
                        else {
                            sessionStorage.clear();
                            getDatas();
                            setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["AssetAttributes"].getNewAsset('Line'));
                        }
                    })];
            });
        });
    }
    function deleteAsset(asset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, $.ajax({
                        type: "DELETE",
                        url: homePath + "api/OpenXDA/Asset/" + asset.ID + "/Location/" + props.Location.ID,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: true,
                        async: true
                    }).done(function (assets) {
                    }).fail(function (msg) {
                        if (msg.status == 500)
                            alert(msg.responseJSON.ExceptionMessage);
                        else {
                            sessionStorage.clear();
                            getDatas();
                        }
                    })];
            });
        });
    }
    function addNewButton() {
        setNewEdit('New');
        setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["AssetAttributes"].getNewAsset('Line'));
    }
    function saveButtonForExistingAssets() {
        return __awaiter(this, void 0, void 0, function () {
            var thing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["editExistingAsset"])(newEditAsset)];
                    case 1:
                        thing = _a.sent();
                        getDatas();
                        setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["AssetAttributes"].getNewAsset('Line'));
                        return [2 /*return*/];
                }
            });
        });
    }
    function showAttributes() {
        if (newEditAsset.AssetType == 'Breaker')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_5__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset, ShowSpare: true });
        else if (newEditAsset.AssetType == 'Bus')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_6__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'CapacitorBank')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_7__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'Line')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_8__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'Transformer')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_9__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
    }
    function handleSelect(item, event) {
        if (event.target.localName == 'td')
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + item.row.ID, state: {} });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Assets:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__["default"], { cols: [
                        { key: 'AssetKey', label: 'Key', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        { key: 'AssetName', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        { key: 'AssetType', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        {
                            key: null, label: '', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: function (asset, key, style) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", "data-toggle": 'modal', "data-target": '#assetModal', onClick: function (e) {
                                        e.preventDefault();
                                        var assetType = assetTypes.find(function (at) { return at.ID == asset['AssetTypeID']; });
                                        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["getAssetWithAdditionalFields"])(asset.ID, assetType.Name).then(function (asset) { return setNewEditAsset(asset); });
                                        setNewEdit('Edit');
                                    } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-pencil" }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                        e.preventDefault();
                                        deleteAsset(asset);
                                    } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" })))); }
                        },
                    ], tableClass: "table table-hover", data: data, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](data, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setData(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](data, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setData(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: handleSelect, selected: function (item) { return false; } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", "data-toggle": 'modal', "data-target": '#assetModal', onClick: addNewButton }, "Add Asset"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "assetModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '75%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, newEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + newEditAsset.AssetKey + ' for Meter'),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal", onClick: function (evt) { return setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["AssetAttributes"].getNewAsset('Line')); } }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["AssetAttributes"].AssetAttributeFields, { Asset: newEditAsset, NewEdit: newEdit, AssetTypes: assetTypes, AllAssets: allAssets, UpdateState: setNewEditAsset, GetDifferentAsset: function (assetID) {
                                        var asset = allAssets.find(function (a) { return a.ID == assetID; });
                                        var assetType = assetTypes.find(function (at) { return at.ID == asset['AssetTypeID']; });
                                        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_10__["getAssetWithAdditionalFields"])(assetID, assetType.Name).then(function (asset) { return setNewEditAsset(asset); });
                                    }, HideAssetType: false, HideSelectAsset: false })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, showAttributes()))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addNewAsset, hidden: newEdit == 'Edit' || newEditAsset.ID != 0 }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addExistingAsset, hidden: newEdit == 'Edit' || newEditAsset.ID == 0 }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function (evt) { return saveButtonForExistingAssets(); }, hidden: newEdit == 'New' }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal", onClick: function (evt) { return setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_4__["AssetAttributes"].getNewAsset('Line')); } }, "Close")))))));
}
/* harmony default export */ __webpack_exports__["default"] = (LocationAssetWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Location/LocationInfo.tsx":
/*!****************************************************!*\
  !*** ./TSX/SystemCenter/Location/LocationInfo.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
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





var LocationInfoWindow = /** @class */ (function (_super) {
    __extends(LocationInfoWindow, _super);
    function LocationInfoWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Location: _this.props.Location
        };
        _this.valid = _this.valid.bind(_this);
        return _this;
    }
    LocationInfoWindow.prototype.componentDidMount = function () {
    };
    LocationInfoWindow.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({ Location: nextProps.Location });
    };
    LocationInfoWindow.prototype.updateLocation = function () {
        var _this = this;
        var location = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.Location);
        return $.ajax({
            type: "PATCH",
            url: homePath + "api/OpenXDA/Location/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Location),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (LocationID) {
            _this.props.stateSetter(location);
        });
    };
    LocationInfoWindow.prototype.valid = function (field) {
        if (field == 'LocationKey')
            return this.state.Location.LocationKey != null && this.state.Location.LocationKey.length > 0 && this.state.Location.LocationKey.length <= 50;
        else if (field == 'Name')
            return this.state.Location.Name != null && this.state.Location.Name.length > 0 && this.state.Location.Name.length <= 200;
        else if (field == 'Alias')
            return this.state.Location.Alias == null || this.state.Location.Alias.length <= 200;
        else if (field == 'ShortName')
            return this.state.Location.ShortName == null || this.state.Location.ShortName.length <= 50;
        else if (field == 'Latitude')
            return this.state.Location.Latitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(this.state.Location.Latitude);
        else if (field == 'Longitude')
            return this.state.Location.Longitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(this.state.Location.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    };
    LocationInfoWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Substation Information:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'LocationKey', Feedback: 'A unique key of less than 50 characters is required.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'Latitude', Feedback: 'Latitude is a require numeric field.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: this.state.Location, Field: 'Longitude', Feedback: 'Longitude is a require numeric field.', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__["default"], { Rows: 3, Record: this.state.Location, Field: 'Description', Valid: this.valid, Setter: function (location) { return _this.setState({ Location: location }); } })))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () { return _this.updateLocation(); }, hidden: this.state.Location.ID == 0, disabled: this.state.Location == this.props.Location }, "Update")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return _this.setState({ Location: _this.props.Location }); }, disabled: this.state.Location == this.props.Location }, "Reset")))));
    };
    return LocationInfoWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (LocationInfoWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Location/LocationMeter.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/Location/LocationMeter.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
//******************************************************************************************************
//  LocationMeter.tsx - Gbtc
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
//  01/21/2020 - Billy Ernest
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




function LocationMeterWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), meters = _a[0], setMeters = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getMeters();
    }, [props.Location.ID]);
    function getMeters() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location/" + props.Location.ID + "/Meters",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (meters) { return setMeters(meters); });
    }
    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + item.row.ID, state: {} });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Meters:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__["default"], { cols: [
                        { key: 'AssetKey', label: 'Key', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        { key: 'Name', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        //{ key: 'Type', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Make', label: 'Meters', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Model', label: 'Assets', headerStyle: { width: 'calc(10%)' }, rowStyle: { width: '10%' } },
                    ], tableClass: "table table-hover", data: meters, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](meters, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setMeters(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](meters, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setMeters(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: handleSelect, selected: function () { return false; } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" })));
}
/* harmony default export */ __webpack_exports__["default"] = (LocationMeterWindow);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvVGFibGUudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTG9jYXRpb24vTG9jYXRpb24udHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTG9jYXRpb24vTG9jYXRpb25Bc3NldC50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Mb2NhdGlvbi9Mb2NhdGlvbkluZm8udHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTG9jYXRpb24vTG9jYXRpb25NZXRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsb0JBQW9CO0FBQ3BCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBQ0g7QUFFNUIsSUFBTSxTQUFTLEdBQW9ELFVBQUMsS0FBSyxJQUFLLHFFQUFNLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLGNBQWMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVMsRUFBekgsQ0FBeUg7QUFtQnZNO0lBQXNDLHlCQUFrQztJQUNwRSxlQUFZLEtBQUs7ZUFDYixrQkFBTSxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVELGtDQUFrQixHQUFsQixVQUFtQixTQUFTLEVBQUUsU0FBUztJQUN2QyxDQUFDO0lBRUQsc0JBQU0sR0FBTjtRQUNJLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM5QyxPQUFPLENBQ0gsK0RBQU8sU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtZQUM3RywrREFBTyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUcsZ0JBQWdCLENBQVM7WUFDL0QsK0RBQU8sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFHLGFBQWEsQ0FBUyxDQUN4RCxDQUNYLENBQUM7SUFDTixDQUFDO0lBRUQsK0JBQWUsR0FBZjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUs7WUFDM0MsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFFO2dCQUNsQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQzthQUMvQjs7Z0JBRUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUVmLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxTQUFTO2dCQUN6QixLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUU3QixPQUFPLDREQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBQyxDQUFDLElBQUssWUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUF6RSxDQUF5RTtnQkFBRyxPQUFPLENBQUMsS0FBSztnQkFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLG9EQUFDLFNBQVMsSUFBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU07UUFDdlAsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGdFQUFLLEtBQUssQ0FBTSxDQUFDO0lBQzVCLENBQUM7SUFFRCw0QkFBWSxHQUFaO1FBQUEsaUJBK0JDO1FBOUJHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUU3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLO1lBQ25DLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBTztnQkFDbkMsSUFBSSxLQUFLLEdBQUcsNENBQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sNERBQ0gsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQ3ZELEtBQUssRUFBRSxLQUFLLEVBQ1osT0FBTyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUU3RixPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDNUY7WUFDVCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksS0FBSyxDQUFDO1lBRVYsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUU7Z0JBQ2xDLEtBQUssR0FBRyw0Q0FBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDeEM7O2dCQUVHLEtBQUssR0FBRyxFQUFFLENBQUM7WUFFZixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksU0FBUztnQkFDekIsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFFN0IsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1lBRXJDLE9BQU8sNERBQUksS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFHLEtBQUssQ0FBTSxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDJCQUFXLEdBQVgsVUFBWSxJQUEwQyxFQUFFLEtBQUs7UUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCwwQkFBVSxHQUFWLFVBQVcsSUFBSSxFQUFFLEtBQUs7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLENBL0VxQywrQ0FBZSxHQStFcEQ7O0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzVIRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsdUJBQXVCO0FBQ3ZCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBR2lCO0FBQ0U7QUFDQTtBQUNNO0FBQ3dCO0FBQ1o7QUFJcEU7SUFBc0MsNEJBQXVGO0lBQ3pILGtCQUFZLEtBQUssRUFBRSxPQUFPO1FBQTFCLFlBQ0ksa0JBQU0sS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQU14QjtRQUpHLEtBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxRQUFRLEVBQUUsSUFBSTtZQUNkLEdBQUcsRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFFO1NBQ3JCOztJQUNMLENBQUM7SUFFRCx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztZQUM3QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOztZQUUxRCxPQUFPLE9BQU8sQ0FBQztJQUN2QixDQUFDO0lBRUQsOEJBQVcsR0FBWDtRQUFBLGlCQVVDO1FBVEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxTQUFTO1lBQUUsT0FBTztRQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ04sSUFBSSxFQUFFLEtBQUs7WUFDUixHQUFHLEVBQUssUUFBUSxpQ0FBNEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFZO1lBQ2xFLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFzQixJQUFLLFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxpQ0FBYyxHQUFkO1FBR0ksSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFFBQVE7WUFDVCxPQUFPO1FBRVgsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ1YsSUFBSSxFQUFFLFFBQVE7WUFDZCxHQUFHLEVBQUssUUFBUSxnQ0FBNkI7WUFDN0MsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUN6QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlCQUFNLEdBQU4sVUFBTyxHQUFVO1FBQ2IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsb0NBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx1Q0FBb0IsR0FBcEI7UUFDSSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFBQSxpQkEyREM7UUExREcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDN0MsT0FBTyxDQUNILDZEQUFLLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDL0gsNkRBQUssU0FBUyxFQUFDLEtBQUs7Z0JBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO29CQUNoQixnRUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFNLENBQzNFO2dCQUNOLDZEQUFLLFNBQVMsRUFBQyxLQUFLO29CQUNoQixnRUFBUSxTQUFTLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsY0FBTSxZQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQU0sYUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLDZCQUE2QixFQUEvRCxDQUErRCxDQUFDLEVBQWpHLENBQWlHLGtDQUFzQyxDQUN2TyxDQUNKO1lBR04sK0RBQU07WUFDTiw0REFBSSxTQUFTLEVBQUMsY0FBYztnQkFDeEIsNERBQUksU0FBUyxFQUFDLFVBQVU7b0JBQ3BCLDJEQUFHLFNBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQU0sWUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBcEIsQ0FBb0IsaUJBQWMsS0FBSyxFQUFDLElBQUksRUFBQyxRQUFRLFlBQVUsQ0FDdEo7Z0JBQ0wsNERBQUksU0FBUyxFQUFDLFVBQVU7b0JBQ3BCLDJEQUFHLFNBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQU0sWUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBM0IsQ0FBMkIsaUJBQWMsS0FBSyxFQUFDLElBQUksRUFBQyxlQUFlLG9CQUFrQixDQUNuTDtnQkFDTCw0REFBSSxTQUFTLEVBQUMsVUFBVTtvQkFDcEIsMkRBQUcsU0FBUyxFQUFFLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFNLFlBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBL0IsQ0FBK0IsaUJBQWMsS0FBSyxFQUFDLElBQUksRUFBQyxtQkFBbUIsd0JBQXNCLENBQ25NO2dCQUNMLDREQUFJLFNBQVMsRUFBQyxVQUFVO29CQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFNLFlBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQXJCLENBQXFCLGlCQUFjLEtBQUssRUFBQyxJQUFJLEVBQUMsU0FBUyxhQUFXLENBQzFKO2dCQUNMLDREQUFJLFNBQVMsRUFBQyxVQUFVO29CQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFNLFlBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQXJCLENBQXFCLGlCQUFjLEtBQUssRUFBQyxJQUFJLEVBQUMsU0FBUyxhQUFXLENBQzFKO2dCQUNMLDREQUFJLFNBQVMsRUFBQyxVQUFVO29CQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFNLFlBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQXBCLENBQW9CLGlCQUFjLEtBQUssRUFBQyxJQUFJLEVBQUMsUUFBUSxrQkFBZ0IsQ0FDNUosQ0FDSjtZQUVMLDZEQUFLLFNBQVMsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFFLEVBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7Z0JBQzFGLDZEQUFLLFNBQVMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLE9BQU87b0JBQ3RGLG9EQUFDLG9FQUFVLElBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxVQUFVLEdBQUUsQ0FDdEQ7Z0JBQ04sNkRBQUssU0FBUyxFQUFFLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUMsY0FBYztvQkFDcEcsb0RBQUMscURBQWtCLElBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFDLFFBQTBCLElBQUssWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFyQyxDQUFxQyxHQUFJLENBQ3ZJO2dCQUNOLDZEQUFLLFNBQVMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUMsa0JBQWtCO29CQUM1RyxvREFBQyxnRkFBc0IsSUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLFVBQVUsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUksQ0FDeEY7Z0JBQ04sNkRBQUssU0FBUyxFQUFFLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUMsUUFBUTtvQkFDeEYsb0RBQUMsc0RBQW1CLElBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFJLENBQ3BEO2dCQUNOLDZEQUFLLFNBQVMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLFFBQVE7b0JBQ3hGLG9EQUFDLHNEQUFtQixJQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBSSxDQUNwRDtnQkFDTiw2REFBSyxTQUFTLEVBQUUsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBQyxPQUFPO29CQUN0RixvREFBQywwRUFBZ0IsSUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLFVBQVUsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUksQ0FDbEYsQ0FFSixDQUNKLENBQ1Q7SUFDTCxDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQ0F4SHFDLCtDQUFlLEdBd0hwRDs7Ozs7Ozs7Ozs7Ozs7QUMzSkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLDRCQUE0QjtBQUM1QixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsb0dBQW9HO0FBQ3BHLDhGQUE4RjtBQUM5Rix3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBRWtCO0FBQ0E7QUFDWTtBQUNBO0FBQ1I7QUFDUTtBQUNOO0FBQ2M7QUFDd0Q7QUFjMUgsU0FBUyxtQkFBbUIsQ0FBQyxLQUFxQztJQUM5RCxJQUFJLE9BQU8sR0FBRyxtRUFBVSxFQUFFLENBQUM7SUFDckIsc0VBQTBELEVBQXpELFlBQUksRUFBRSxlQUFtRCxDQUFDO0lBQzNELDhFQUE0RSxFQUEzRSxpQkFBUyxFQUFFLG9CQUFnRSxDQUFDO0lBQzdFLHdFQUF5RCxFQUF4RCxpQkFBUyxFQUFFLG9CQUE2QyxDQUFDO0lBQzFELDZKQUEySyxFQUExSyxvQkFBWSxFQUFFLHVCQUE0SixDQUFDO0lBQzVLLHlFQUFtRSxFQUFsRSxlQUFPLEVBQUUsa0JBQXlELENBQUM7SUFDcEUsc0VBQTBFLEVBQXpFLGtCQUFVLEVBQUUscUJBQTZELENBQUM7SUFDM0Usc0VBQW9FLEVBQW5FLGlCQUFTLEVBQUUsb0JBQXdELENBQUM7SUFFM0UsK0NBQWUsQ0FBQztRQUNaLFFBQVEsRUFBRTtJQUNkLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV4QixTQUFTLFFBQVE7UUFDYixTQUFTLEVBQUUsQ0FBQztRQUNaLHdFQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUE0QjtZQUM3QyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSCx5RUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsVUFBb0M7WUFDdEQsYUFBYSxDQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsU0FBUztRQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBSyxRQUFRLDZCQUF3QixLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBUztZQUNsRSxXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUMsSUFBTSxjQUFPLENBQUMsSUFBSSxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUdELFNBQVMsV0FBVztRQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUssUUFBUSx1Q0FBa0MsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFJO1lBQ3JFLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsUUFBUSxFQUFFLE1BQU07WUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLENBQUM7WUFDN0MsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsUUFBUSxFQUFFLENBQUM7WUFDWCxlQUFlLENBQUMscUVBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztZQUNSLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHO2dCQUNqQixLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCxTQUFlLGdCQUFnQjs7O2dCQUMzQixzQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNWLElBQUksRUFBRSxNQUFNO3dCQUNaLEdBQUcsRUFBSyxRQUFRLDRDQUF1QyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUk7d0JBQzFFLFdBQVcsRUFBRSxpQ0FBaUM7d0JBQzlDLFFBQVEsRUFBRSxNQUFNO3dCQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsQ0FBQzt3QkFDN0MsS0FBSyxFQUFFLEtBQUs7d0JBQ1osS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDUixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO3dCQUNSLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHOzRCQUNqQixLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQzs2QkFDdkM7NEJBQ0QsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUN2QixRQUFRLEVBQUUsQ0FBQzs0QkFDWCxlQUFlLENBQUMscUVBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3ZEO29CQUVMLENBQUMsQ0FBQyxFQUFDOzs7S0FFTjtJQUVELFNBQWUsV0FBVyxDQUFDLEtBQW9COzs7Z0JBQzdDLHNCQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ1QsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsR0FBRyxFQUFLLFFBQVEsMEJBQXFCLEtBQUssQ0FBQyxFQUFFLGtCQUFhLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBSTt3QkFDN0UsV0FBVyxFQUFFLGlDQUFpQzt3QkFDOUMsUUFBUSxFQUFFLE1BQU07d0JBQ2hCLEtBQUssRUFBRSxJQUFJO3dCQUNYLEtBQUssRUFBRSxJQUFJO3FCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUE0QjtvQkFDckMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRzt3QkFDUixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRzs0QkFDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7NkJBQ3ZDOzRCQUNELGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFDdkIsUUFBUSxFQUFFLENBQUM7eUJBQ2Q7b0JBRUwsQ0FBQyxDQUFDLEVBQUM7OztLQUNOO0lBRUQsU0FBUyxZQUFZO1FBQ2pCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQixlQUFlLENBQUMscUVBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsU0FBZSwyQkFBMkI7Ozs7OzRCQUMxQixxQkFBTSw2RUFBaUIsQ0FBQyxZQUFZLENBQUM7O3dCQUE3QyxLQUFLLEdBQUcsU0FBcUM7d0JBQ2pELFFBQVEsRUFBRSxDQUFDO3dCQUNYLGVBQWUsQ0FBQyxxRUFBZSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7S0FDdkQ7SUFFRCxTQUFTLGNBQWM7UUFDbkIsSUFBSSxZQUFZLENBQUMsU0FBUyxJQUFJLFNBQVM7WUFDbkMsT0FBTyxvREFBQywrREFBaUIsSUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUErQixFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLElBQUksR0FBSSxDQUFDO2FBQ3JJLElBQUksWUFBWSxDQUFDLFNBQVMsSUFBSSxLQUFLO1lBQ3BDLE9BQU8sb0RBQUMsMkRBQWEsSUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsR0FBSSxDQUFDO2FBQzdGLElBQUksWUFBWSxDQUFDLFNBQVMsSUFBSSxlQUFlO1lBQzlDLE9BQU8sb0RBQUMsK0RBQWlCLElBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBK0IsRUFBRSxXQUFXLEVBQUUsZUFBZSxHQUFJLENBQUM7YUFDcEgsSUFBSSxZQUFZLENBQUMsU0FBUyxJQUFJLE1BQU07WUFDckMsT0FBTyxvREFBQyw0REFBYyxJQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQTRCLEVBQUUsV0FBVyxFQUFFLGVBQWUsR0FBSSxDQUFDO2FBQzlHLElBQUksWUFBWSxDQUFDLFNBQVMsSUFBSSxhQUFhO1lBQzVDLE9BQU8sb0RBQUMsbUVBQXFCLElBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBbUMsRUFBRSxXQUFXLEVBQUUsZUFBZSxHQUFJLENBQUM7SUFDckksQ0FBQztJQUNELFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLO1FBQzdCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSTtZQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxjQUFjLEVBQUUsTUFBTSxFQUFFLHNCQUFzQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN0SCxDQUFDO0lBRUQsT0FBTyxDQUNILDZEQUFLLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRTtRQUM3Qyw2REFBSyxTQUFTLEVBQUMsYUFBYTtZQUN4Qiw2REFBSyxTQUFTLEVBQUMsS0FBSztnQkFDaEIsNkRBQUssU0FBUyxFQUFDLEtBQUs7b0JBQ2hCLDBFQUFnQixDQUNkLENBQ0osQ0FDSjtRQUNOLDZEQUFLLFNBQVMsRUFBQyxXQUFXO1lBQ3RCLDZEQUFLLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtnQkFDOUYsb0RBQUMsK0RBQUssSUFDRixJQUFJLEVBQUU7d0JBQ0YsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDNUYsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDOUYsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDOUY7NEJBQ0ksR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLElBQUs7Z0NBQzdHLGdFQUFRLFNBQVMsRUFBQyxZQUFZLGlCQUFhLE9BQU8saUJBQWEsYUFBYSxFQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7d0NBQ3BGLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3Q0FDbkIsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFFLElBQUksU0FBRSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQTdCLENBQTZCLENBQUM7d0NBQ3BFLHdGQUE0QixDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFLLElBQUksc0JBQWUsQ0FBQyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO3dDQUM3RixVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7b0NBQ3ZCLENBQUM7b0NBQUU7d0NBQU0sMkRBQUcsU0FBUyxFQUFDLGNBQWMsR0FBSyxDQUFPLENBQVM7Z0NBQ3pELGdFQUFRLFNBQVMsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQzt3Q0FDdEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO3dDQUNuQixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQ3ZCLENBQUM7b0NBQUU7d0NBQU0sMkRBQUcsU0FBUyxFQUFDLGFBQWEsR0FBSyxDQUFPLENBQVMsQ0FDckQsRUFYMEcsQ0FXMUc7eUJBQ1Y7cUJBRUosRUFDRCxVQUFVLEVBQUMsbUJBQW1CLEVBQzlCLElBQUksRUFBRSxJQUFJLEVBQ1YsU0FBUyxFQUFFLFNBQVMsRUFDcEIsU0FBUyxFQUFFLFNBQVMsRUFDcEIsTUFBTSxFQUFFLFVBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksU0FBUyxFQUFFOzRCQUNwQixJQUFJLE9BQU8sR0FBRyw4Q0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4RSxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUNwQjs2QkFDSTs0QkFDRCxJQUFJLE9BQU8sR0FBRyw4Q0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ2hELFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ2pCLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ3ZCO29CQUNMLENBQUMsRUFDRCxPQUFPLEVBQUUsWUFBWSxFQUNyQixRQUFRLEVBQUUsVUFBQyxJQUFJLElBQUssWUFBSyxFQUFMLENBQUssR0FDM0IsQ0FFQSxDQUNKO1FBQ04sNkRBQUssU0FBUyxFQUFDLGFBQWE7WUFDeEIsNkRBQUssU0FBUyxFQUFDLGdCQUFnQjtnQkFDM0IsZ0VBQVEsU0FBUyxFQUFDLDRCQUE0QixpQkFBYSxPQUFPLGlCQUFhLGFBQWEsRUFBQyxPQUFPLEVBQUUsWUFBWSxnQkFBb0IsQ0FDcEksQ0FDSjtRQUVOLDZEQUFLLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLFlBQVk7WUFDbEMsNkRBQUssU0FBUyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ25FLDZEQUFLLFNBQVMsRUFBQyxlQUFlO29CQUMxQiw2REFBSyxTQUFTLEVBQUMsY0FBYzt3QkFDekIsNERBQUksU0FBUyxFQUFDLGFBQWEsSUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFNO3dCQUMvSCxnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxPQUFPLGtCQUFjLE9BQU8sRUFBQyxPQUFPLEVBQUUsVUFBQyxHQUFHLElBQUssc0JBQWUsQ0FBQyxxRUFBZSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFwRCxDQUFvRCxhQUFrQixDQUNuSjtvQkFDTiw2REFBSyxTQUFTLEVBQUMsWUFBWTt3QkFDdkIsNkRBQUssU0FBUyxFQUFDLEtBQUs7NEJBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dDQUNoQixvREFBQyxxRUFBZSxDQUFDLG9CQUFvQixJQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxVQUFDLE9BQU87d0NBQ2hMLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxFQUFmLENBQWUsQ0FBQyxDQUFDO3dDQUNqRCxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQUUsSUFBSSxTQUFFLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQzt3Q0FDcEUsd0ZBQTRCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBSyxJQUFJLHNCQUFlLENBQUMsS0FBSyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztvQ0FDaEcsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEtBQUssR0FBSSxDQUNqRDs0QkFDTiw2REFBSyxTQUFTLEVBQUMsS0FBSyxJQUNmLGNBQWMsRUFBRSxDQUNmLENBQ0osQ0FDSjtvQkFDTiw2REFBSyxTQUFTLEVBQUMsY0FBYzt3QkFDekIsZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLGtCQUFjLE9BQU8sRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLElBQUksTUFBTSxJQUFJLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFlO3dCQUM3SixnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsa0JBQWMsT0FBTyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsT0FBTyxJQUFJLE1BQU0sSUFBSSxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBZTt3QkFDbEssZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLGtCQUFjLE9BQU8sRUFBQyxPQUFPLEVBQUUsVUFBQyxHQUFHLElBQUssa0NBQTJCLEVBQUUsRUFBN0IsQ0FBNkIsRUFBRSxNQUFNLEVBQUUsT0FBTyxJQUFJLEtBQUssV0FBZTt3QkFHL0osZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsZ0JBQWdCLGtCQUFjLE9BQU8sRUFBQyxPQUFPLEVBQUUsVUFBQyxHQUFHLElBQUssc0JBQWUsQ0FBQyxxRUFBZSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFwRCxDQUFvRCxZQUFnQixDQUMxSixDQUVKLENBQ0osQ0FDSixDQUVKLENBRVQsQ0FBQztBQUNOLENBQUM7QUFFYyxrRkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BSbkMsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3pFO0FBQ0g7QUFFOEI7QUFDRTtBQUNOO0FBR3REO0lBQWdELHNDQUFxSTtJQUVqTCw0QkFBWSxLQUFLLEVBQUUsT0FBTztRQUExQixZQUNJLGtCQUFNLEtBQUssRUFBRSxPQUFPLENBQUMsU0FLeEI7UUFKRyxLQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsUUFBUSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtTQUNoQztRQUNELEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7O0lBQ3ZDLENBQUM7SUFHRCw4Q0FBaUIsR0FBakI7SUFDQSxDQUFDO0lBRUQsc0RBQXlCLEdBQXpCLFVBQTBCLFNBQVM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELDJDQUFjLEdBQWQ7UUFBQSxpQkFjQztRQWJHLElBQUksUUFBUSxHQUFxQiw0Q0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ1QsSUFBSSxFQUFFLE9BQU87WUFDYixHQUFHLEVBQUssUUFBUSxnQ0FBNkI7WUFDN0MsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUN6QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFVBQWtCO1lBQ3RCLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELGtDQUFLLEdBQUwsVUFBTSxLQUErQjtRQUNqQyxJQUFJLEtBQUssSUFBSSxhQUFhO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQzthQUM1SSxJQUFJLEtBQUssSUFBSSxNQUFNO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQzthQUN4SCxJQUFJLEtBQUssSUFBSSxPQUFPO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQzthQUNuRixJQUFJLEtBQUssSUFBSSxXQUFXO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQzthQUMxRixJQUFJLEtBQUssSUFBSSxVQUFVO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxxRUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6RyxJQUFJLEtBQUssSUFBSSxXQUFXO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxxRUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMzRyxJQUFJLEtBQUssSUFBSSxhQUFhO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQUEsaUJBcUNDO1FBcENHLE9BQU8sQ0FDSCw2REFBSyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUU7WUFDN0MsNkRBQUssU0FBUyxFQUFDLGFBQWE7Z0JBQ3hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO29CQUNoQiw2REFBSyxTQUFTLEVBQUMsS0FBSzt3QkFDaEIsMEZBQWdDLENBQzlCLENBQ0osQ0FDSjtZQUNOLDZEQUFLLFNBQVMsRUFBQyxXQUFXO2dCQUN0Qiw2REFBSyxTQUFTLEVBQUMsS0FBSztvQkFDaEIsNkRBQUssU0FBUyxFQUFDLEtBQUs7d0JBQ2hCLG9EQUFDLG1FQUFTLElBQW1CLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxzREFBc0QsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBQyxRQUFRLElBQUssWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFyQyxDQUFxQyxHQUFJO3dCQUNwTyxvREFBQyxtRUFBUyxJQUFtQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsd0RBQXdELEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQUMsUUFBUSxJQUFLLFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBckMsQ0FBcUMsR0FBSTt3QkFDL04sb0RBQUMsbUVBQVMsSUFBbUIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLDRDQUE0QyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFDLFFBQVEsSUFBSyxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQXJDLENBQXFDLEdBQUk7d0JBQ3hOLG9EQUFDLG1FQUFTLElBQW1CLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSx5Q0FBeUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBQyxRQUFRLElBQUssWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFyQyxDQUFxQyxHQUFJLENBQy9NO29CQUNOLDZEQUFLLFNBQVMsRUFBQyxLQUFLO3dCQUNoQixvREFBQyxtRUFBUyxJQUFtQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsc0NBQXNDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQUMsUUFBUSxJQUFLLFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBckMsQ0FBcUMsR0FBSTt3QkFDak4sb0RBQUMsbUVBQVMsSUFBbUIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLHVDQUF1QyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFDLFFBQVEsSUFBSyxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDLEVBQW5DLENBQW1DLEdBQUc7d0JBQ2hOLG9EQUFDLHNFQUFZLElBQW1CLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQUMsUUFBUSxJQUFLLFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBckMsQ0FBcUMsR0FBSSxDQUM1SyxDQUNKLENBQ0o7WUFDTiw2REFBSyxTQUFTLEVBQUMsYUFBYTtnQkFDeEIsNkRBQUssU0FBUyxFQUFDLGdCQUFnQjtvQkFDM0IsZ0VBQVEsU0FBUyxFQUFDLGlCQUFpQixFQUFDLE9BQU8sRUFBRSxjQUFNLFlBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLGFBQWlCLENBQ2xMO2dCQUNOLDZEQUFLLFNBQVMsRUFBQyxnQkFBZ0I7b0JBQzNCLGdFQUFRLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxPQUFPLEVBQUUsY0FBTSxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBaEQsQ0FBZ0QsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLFlBQWdCLENBQ3ZLLENBQ0osQ0FHSixDQUNULENBQUM7SUFDTixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDLENBMUYrQywrQ0FBZSxHQTBGOUQ7Ozs7Ozs7Ozs7Ozs7O0FDeEhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsNEJBQTRCO0FBQzVCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBQ0g7QUFFa0I7QUFDQTtBQUk5QyxTQUFTLG1CQUFtQixDQUFDLEtBQXFDO0lBQzlELElBQUksT0FBTyxHQUFHLG1FQUFVLEVBQUUsQ0FBQztJQUNyQixzRUFBOEQsRUFBN0QsY0FBTSxFQUFFLGlCQUFxRCxDQUFDO0lBQy9ELDhFQUE0RSxFQUEzRSxpQkFBUyxFQUFFLG9CQUFnRSxDQUFDO0lBQzdFLHdFQUF5RCxFQUF4RCxpQkFBUyxFQUFFLG9CQUE2QyxDQUFDO0lBRWhFLCtDQUFlLENBQUM7UUFDWixTQUFTLEVBQUUsQ0FBQztJQUNoQixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFeEIsU0FBUyxTQUFTO1FBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1gsR0FBRyxFQUFLLFFBQVEsNkJBQXdCLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFTO1lBQ2xFLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQU0sSUFBSSxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELFNBQVMsWUFBWSxDQUFDLElBQUk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEdBQUcsY0FBYyxFQUFFLE1BQU0sRUFBRSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEgsQ0FBQztJQUVELE9BQU8sQ0FDSCw2REFBSyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUU7UUFDN0MsNkRBQUssU0FBUyxFQUFDLGFBQWE7WUFDeEIsNkRBQUssU0FBUyxFQUFDLEtBQUs7Z0JBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO29CQUNoQiwwRUFBZ0IsQ0FDZCxDQUNKLENBQ0o7UUFDTiw2REFBSyxTQUFTLEVBQUMsV0FBVztZQUN0Qiw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7Z0JBQzlGLG9EQUFDLCtEQUFLLElBQ0YsSUFBSSxFQUFFO3dCQUNGLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQzVGLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQ3pGLDRGQUE0Rjt3QkFDNUYsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDM0YsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtxQkFDckcsRUFDRCxVQUFVLEVBQUMsbUJBQW1CLEVBQzlCLElBQUksRUFBRSxNQUFNLEVBQ1osU0FBUyxFQUFFLFNBQVMsRUFDcEIsU0FBUyxFQUFFLFNBQVMsRUFDcEIsTUFBTSxFQUFFLFVBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksU0FBUyxFQUFFOzRCQUNwQixJQUFJLE9BQU8sR0FBRyw4Q0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxRSxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDekIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUN0Qjs2QkFDSTs0QkFDRCxJQUFJLE9BQU8sR0FBRyw4Q0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ2xELFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUN6QixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ25CLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ3ZCO29CQUNMLENBQUMsRUFDRCxPQUFPLEVBQUUsWUFBWSxFQUNyQixRQUFRLEVBQUUsY0FBTSxZQUFLLEVBQUwsQ0FBSyxHQUN2QixDQUVBLENBQ0o7UUFDTiw2REFBSyxTQUFTLEVBQUMsYUFBYSxHQUN0QixDQUNKLENBRVQsQ0FBQztBQUVOLENBQUM7QUFFYyxrRkFBbUIsRUFBQyIsImZpbGUiOiJMb2NhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBUYWJsZS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAxOCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDgvMDIvMjAxOCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuY29uc3QgQW5nbGVJY29uOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDx7IGFzY2VuZGluZzogYm9vbGVhbiB9PiA9IChwcm9wcykgPT4gPHNwYW4gc3R5bGU9e3sgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBtYXJnaW46IDMgfX0gY2xhc3NOYW1lPXtcImZhIGZhLWFuZ2xlLVwiICsgKHByb3BzLmFzY2VuZGluZyA/ICd1cCcgOiAnZG93bicpfT48L3NwYW4+XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlUHJvcHM8VD4ge1xyXG4gICAgY29sczogQXJyYXk8eyBrZXk6IGtleW9mKFQpIHwgbnVsbCwgbGFiZWw6IHN0cmluZywgaGVhZGVyU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLCByb3dTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsIGNvbnRlbnQ/KGl0ZW06IFQsIGtleToga2V5b2YoVCksIHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzKTogUmVhY3QuUmVhY3ROb2RlIH0+LFxyXG4gICAgZGF0YTogQXJyYXk8VD4sXHJcbiAgICBvbkNsaWNrOiAoZGF0YTogeyBjb2w6IGtleW9mIChUKSwgcm93OiBULCBkYXRhOiBUW2tleW9mKFQpXSB9LCBldmVudDogYW55KSA9PiB2b2lkLFxyXG4gICAgc29ydEZpZWxkOiBzdHJpbmcsXHJcbiAgICBhc2NlbmRpbmc6IGJvb2xlYW4sXHJcbiAgICBvblNvcnQoZGF0YTogeyBjb2w6IGtleW9mIChUKSwgYXNlbmRpbmc6IGJvb2xlYW59KTogdm9pZCxcclxuICAgIHRhYmxlQ2xhc3M/OiBzdHJpbmcsXHJcbiAgICB0YWJsZVN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcyxcclxuICAgIHRoZWFkU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG4gICAgdGhlYWRDbGFzcz86IHN0cmluZyxcclxuICAgIHRib2R5U3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG4gICAgdGJvZHlDbGFzcz86IHN0cmluZyxcclxuICAgIHNlbGVjdGVkPyhkYXRhOiBUKTogYm9vbGVhbixcclxuICAgIHJvd1N0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcyxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGU8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8VGFibGVQcm9wczxUPiwge30+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICB2YXIgcm93Q29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVSb3dzKCk7XHJcbiAgICAgICAgdmFyIGhlYWRlckNvbXBvbmVudHMgPSB0aGlzLmdlbmVyYXRlSGVhZGVycygpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9eyh0aGlzLnByb3BzLnRhYmxlQ2xhc3MgIT0gdW5kZWZpbmVkID8gdGhpcy5wcm9wcy50YWJsZUNsYXNzIDogJycpfSBzdHlsZT17dGhpcy5wcm9wcy50YWJsZVN0eWxlfT5cclxuICAgICAgICAgICAgICAgIDx0aGVhZCBzdHlsZT17dGhpcy5wcm9wcy50aGVhZFN0eWxlfT57aGVhZGVyQ29tcG9uZW50c308L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5IHN0eWxlPXt0aGlzLnByb3BzLnRib2R5U3R5bGV9Pntyb3dDb21wb25lbnRzfTwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUhlYWRlcnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29scy5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIHZhciBjZWxscyA9IHRoaXMucHJvcHMuY29scy5tYXAoKGNvbERhdGEsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZTtcclxuICAgICAgICAgICAgaWYgKGNvbERhdGEuaGVhZGVyU3R5bGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGNvbERhdGEuaGVhZGVyU3R5bGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDx0aCBrZXk9e2luZGV4fSBzdHlsZT17c3R5bGV9IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZVNvcnQoeyBjb2w6IGNvbERhdGEua2V5LCBhc2NlbmRpbmc6IHRoaXMucHJvcHMuYXNjZW5kaW5nIH0sIGUpfT57Y29sRGF0YS5sYWJlbH17KHRoaXMucHJvcHMuc29ydEZpZWxkID09IGNvbERhdGEua2V5ID8gPEFuZ2xlSWNvbiBhc2NlbmRpbmc9e3RoaXMucHJvcHMuYXNjZW5kaW5nfSAvPiA6IG51bGwpfTwvdGg+XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiA8dHI+e2NlbGxzfTwvdHI+O1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlUm93cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjZWxscyA9IHRoaXMucHJvcHMuY29scy5tYXAoY29sRGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSBfLmNsb25lKGNvbERhdGEucm93U3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDx0ZFxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXgudG9TdHJpbmcoKSArIGl0ZW1bY29sRGF0YS5rZXldICsgY29sRGF0YS5rZXl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB7IGNvbDogY29sRGF0YS5rZXksIHJvdzogaXRlbSwgZGF0YTogaXRlbVtjb2xEYXRhLmtleV0gfSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge2NvbERhdGEuY29udGVudCAhPSB1bmRlZmluZWQgPyBjb2xEYXRhLmNvbnRlbnQoaXRlbSwgY29sRGF0YS5rZXksIHN0eWxlKSA6IGl0ZW1bY29sRGF0YS5rZXldfVxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5yb3dTdHlsZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXy5jbG9uZSh0aGlzLnByb3BzLnJvd1N0eWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZChpdGVtKSlcclxuICAgICAgICAgICAgICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDx0ciBzdHlsZT17c3R5bGV9IGtleT17aW5kZXgudG9TdHJpbmcoKX0+e2NlbGxzfTwvdHI+O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNsaWNrKGRhdGE6IHsgY29sOiBrZXlvZihUKSwgcm93OiBULCBkYXRhOiBhbnkgfSwgZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZGF0YSwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNvcnQoZGF0YSwgZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByb3BzLm9uU29ydChkYXRhKTtcclxuICAgIH1cclxufTtcclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIExvY2F0aW9uLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMS8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgTG9jYXRpb25JbmZvV2luZG93IGZyb20gJy4vTG9jYXRpb25JbmZvJztcclxuaW1wb3J0IExvY2F0aW9uTWV0ZXJXaW5kb3cgZnJvbSAnLi9Mb2NhdGlvbk1ldGVyJztcclxuaW1wb3J0IExvY2F0aW9uQXNzZXRXaW5kb3cgZnJvbSAnLi9Mb2NhdGlvbkFzc2V0JztcclxuaW1wb3J0IE5vdGVXaW5kb3cgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Ob3RlV2luZG93JztcclxuaW1wb3J0IEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9BZGRpdGlvbmFsRmllbGRzV2luZG93JztcclxuaW1wb3J0IEV4dGVybmFsREJVcGRhdGUgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9FeHRlcm5hbERCVXBkYXRlJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IExvY2F0aW9uSUQ6IG51bWJlciB9LCB7IExvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uLCBUYWI6IHN0cmluZ30sIHt9PntcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBMb2NhdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgVGFiOiB0aGlzLmdldFRhYigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFRhYigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTG9jYXRpb24uVGFiJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ0xvY2F0aW9uLlRhYicpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAnbm90ZXMnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExvY2F0aW9uKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucHJvcHMuTG9jYXRpb25JRCA9PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uL09uZS8ke3RoaXMucHJvcHMuTG9jYXRpb25JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChkYXRhOiBPcGVuWERBLkxvY2F0aW9uKSA9PiB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb246IGRhdGEgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUxvY2F0aW9uKCk6IEpRdWVyeS5qcVhIUiB7XHJcblxyXG5cclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBjb25maXJtKFwiVGhpcyB3aWxsIGRlbGV0ZSB0aGUgU3Vic3RhdGlvbiBQZXJtYW5lbnRseVwiKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uL0RlbGV0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5Mb2NhdGlvbiksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRhYih0YWI6c3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnTG9jYXRpb24uVGFiJywgSlNPTi5zdHJpbmdpZnkodGFiKSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7VGFiOiB0YWJ9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLkxvY2F0aW9uID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2MywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2Mywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nOiAxNSB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPnt0aGlzLnN0YXRlLkxvY2F0aW9uICE9IG51bGwgPyB0aGlzLnN0YXRlLkxvY2F0aW9uLkxvY2F0aW9uS2V5IDogJyd9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIHB1bGwtcmlnaHRcIiBoaWRkZW49e3RoaXMuc3RhdGUuTG9jYXRpb24gPT0gbnVsbH0gb25DbGljaz17KCkgPT4gdGhpcy5kZWxldGVMb2NhdGlvbigpLmRvbmUoKCkgPT4gd2luZG93LmxvY2F0aW9uLmhyZWYgPSBob21lUGF0aCArICdpbmRleC5jc2h0bWw/bmFtZT1Mb2NhdGlvbnMnKX0+RGVsZXRlIExvY2F0aW9uIChQZXJtYW5lbnQpPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRoaXMuc3RhdGUuVGFiID09IFwibm90ZXNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdub3RlcycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbm90ZXNcIj5Ob3RlczwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImxvY2F0aW9uSW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRUYWIoJ2xvY2F0aW9uSW5mbycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbG9jYXRpb25JbmZvXCI+TG9jYXRpb24gSW5mbzwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdhZGRpdGlvbmFsRmllbGRzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNhZGRpdGlvbmFsRmllbGRzXCI+QWRkaXRpb25hbCBGaWVsZHM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJtZXRlcnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdtZXRlcnMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI21ldGVyc1wiPk1ldGVyczwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFzc2V0c1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRUYWIoJ2Fzc2V0cycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjYXNzZXRzXCI+QXNzZXRzPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiZXh0REJcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdleHREQicpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjZXh0REJcIj5FeHRlcm5hbCBEQjwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiIHN0eWxlPXt7bWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMTUsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcIm5vdGVzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJub3Rlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Tm90ZVdpbmRvdyBJRD17dGhpcy5wcm9wcy5Mb2NhdGlvbklEfSBUeXBlPSdMb2NhdGlvbicvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwibG9jYXRpb25JbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJsb2NhdGlvbkluZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExvY2F0aW9uSW5mb1dpbmRvdyBMb2NhdGlvbj17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gc3RhdGVTZXR0ZXI9eyhMb2NhdGlvbjogT3BlblhEQS5Mb2NhdGlvbikgPT4gdGhpcy5zZXRTdGF0ZSh7IExvY2F0aW9uOiBMb2NhdGlvbiB9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImFkZGl0aW9uYWxGaWVsZHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cgSUQ9e3RoaXMucHJvcHMuTG9jYXRpb25JRH0gVHlwZT0nTG9jYXRpb24nIFRhYj17dGhpcy5zdGF0ZS5UYWJ9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJtZXRlcnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cIm1ldGVyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TG9jYXRpb25NZXRlcldpbmRvdyBMb2NhdGlvbj17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFzc2V0c1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiYXNzZXRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2NhdGlvbkFzc2V0V2luZG93IExvY2F0aW9uPXt0aGlzLnN0YXRlLkxvY2F0aW9ufSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiZXh0REJcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImV4dERCXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxFeHRlcm5hbERCVXBkYXRlIElEPXt0aGlzLnByb3BzLkxvY2F0aW9uSUR9IFR5cGU9J0xvY2F0aW9uJyBUYWI9e3RoaXMuc3RhdGUuVGFifSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTG9jYXRpb25Bc3NldC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoICB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyAgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSBcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjEvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9UYWJsZSc7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQgeyBBc3NldEF0dHJpYnV0ZXMgfSBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XHJcbmltcG9ydCBCcmVha2VyQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9CcmVha2VyJztcclxuaW1wb3J0IEJ1c0F0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQnVzJztcclxuaW1wb3J0IENhcEJhbmtBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmsnO1xyXG5pbXBvcnQgTGluZUF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvTGluZSc7XHJcbmltcG9ydCBUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvVHJhbnNmb3JtZXInO1xyXG5pbXBvcnQgeyBnZXRBbGxBc3NldHMsIGdldEFzc2V0VHlwZXMsIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMsIGVkaXRFeGlzdGluZ0Fzc2V0IH0gZnJvbSAnLi4vLi4vLi4vVFMvU2VydmljZXMvQXNzZXQnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmludGVyZmFjZSBMb2NhdGlvbkFzc2V0U3RhdGUge1xyXG4gICAgQXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PixcclxuICAgIE5ld0VkaXRBc3NldDogT3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLlRyYW5zZm9ybWVyLFxyXG4gICAgQWxsQXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PixcclxuICAgIEFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPixcclxuICAgIE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LFxyXG4gICAgU29ydGZpZWxkOiBrZXlvZiAoT3BlblhEQS5NZXRlciksIEFzY2VuZGluZzogYm9vbGVhblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gTG9jYXRpb25Bc3NldFdpbmRvdyhwcm9wczogeyBMb2NhdGlvbjogT3BlblhEQS5Mb2NhdGlvbiB9KTogSlNYLkVsZW1lbnR7XHJcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcclxuICAgIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXQ+PihbXSk7XHJcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8a2V5b2YoT3BlblhEQS5Bc3NldCk+KCdBc3NldEtleScpO1xyXG4gICAgY29uc3QgW2FzY2VuZGluZywgc2V0QXNjZW5kaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xyXG4gICAgY29uc3QgW25ld0VkaXRBc3NldCwgc2V0TmV3RWRpdEFzc2V0XSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lcj4oQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xyXG4gICAgY29uc3QgW25ld0VkaXQsIHNldE5ld0VkaXRdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLk5ld0VkaXQ+KCdOZXcnKTtcclxuICAgIGNvbnN0IFthc3NldFR5cGVzLCBzZXRBc3NldFR5cGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPj4oW10pO1xyXG4gICAgY29uc3QgW2FsbEFzc2V0cywgc2V0QWxsQXNzZXRzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXQ+PihbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXREYXRhcygpXHJcbiAgICB9LCBbcHJvcHMuTG9jYXRpb24uSURdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhcygpOiB2b2lkIHtcclxuICAgICAgICBnZXRBc3NldHMoKTtcclxuICAgICAgICBnZXRBbGxBc3NldHMoKS5kb25lKChhc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHNldEFsbEFzc2V0cyhhc3NldHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGdldEFzc2V0VHlwZXMoKS5kb25lKChhc3NldFR5cGVzOiBBcnJheTxPcGVuWERBLkFzc2V0VHlwZT4pID0+IHtcclxuICAgICAgICAgICAgc2V0QXNzZXRUeXBlcyggYXNzZXRUeXBlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QXNzZXRzKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTG9jYXRpb24vJHtwcm9wcy5Mb2NhdGlvbi5JRH0vQXNzZXRzYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChkYXRhLCBfICkgPT4gc2V0RGF0YShkYXRhKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZE5ld0Fzc2V0KCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0L05ldy9Mb2NhdGlvbi8ke3Byb3BzLkxvY2F0aW9uLklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBBc3NldDogbmV3RWRpdEFzc2V0IH0pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGdldERhdGFzKCk7XHJcbiAgICAgICAgICAgIHNldE5ld0VkaXRBc3NldChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSlcclxuXHJcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkRXhpc3RpbmdBc3NldCgpIHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvRXhpc3RpbmcvTG9jYXRpb24vJHtwcm9wcy5Mb2NhdGlvbi5JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgQXNzZXQ6IG5ld0VkaXRBc3NldCB9KSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXHJcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIGdldERhdGFzKCk7XHJcbiAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUFzc2V0KGFzc2V0OiBPcGVuWERBLkFzc2V0KSB7XHJcbiAgICAgIHJldHVybiAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC8ke2Fzc2V0LklEfS9Mb2NhdGlvbi8ke3Byb3BzLkxvY2F0aW9uLklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xyXG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXHJcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIGdldERhdGFzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTmV3QnV0dG9uKCk6IHZvaWQge1xyXG4gICAgICAgIHNldE5ld0VkaXQoJ05ldycpO1xyXG4gICAgICAgIHNldE5ld0VkaXRBc3NldChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2F2ZUJ1dHRvbkZvckV4aXN0aW5nQXNzZXRzKCkge1xyXG4gICAgICAgIGxldCB0aGluZyA9IGF3YWl0IGVkaXRFeGlzdGluZ0Fzc2V0KG5ld0VkaXRBc3NldCk7XHJcbiAgICAgICAgZ2V0RGF0YXMoKTtcclxuICAgICAgICBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd0F0dHJpYnV0ZXMoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCcmVha2VyJylcclxuICAgICAgICAgICAgcmV0dXJuIDxCcmVha2VyQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcn0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gU2hvd1NwYXJlPXt0cnVlfSAvPjtcclxuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCdXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gPEJ1c0F0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldH0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFuaycpXHJcbiAgICAgICAgICAgIHJldHVybiA8Q2FwQmFua0F0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLkNhcEJhbmt9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xyXG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0xpbmUnKVxyXG4gICAgICAgICAgICByZXR1cm4gPExpbmVBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5MaW5lfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcclxuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdUcmFuc2Zvcm1lcicpXHJcbiAgICAgICAgICAgIHJldHVybiA8VHJhbnNmb3JtZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5UcmFuc2Zvcm1lcn0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxlY3QoaXRlbSwgZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmxvY2FsTmFtZSA9PSAndGQnKVxyXG4gICAgICAgICAgICBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9QXNzZXQmQXNzZXRJRD0nICsgaXRlbS5yb3cuSUQsIHN0YXRlOiB7fSB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+QXNzZXRzOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzgxLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlPE9wZW5YREEuQXNzZXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRLZXknLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMzAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzMwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldE5hbWUnLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzMwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICczMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRUeXBlJywgbGFiZWw6ICdUeXBlJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgY29udGVudDogKGFzc2V0LCBrZXksIHN0eWxlKSA9PiA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PScjYXNzZXRNb2RhbCcgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldFR5cGUgPSBhc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gYXNzZXRbJ0Fzc2V0VHlwZUlEJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzKGFzc2V0LklELCBhc3NldFR5cGUuTmFtZSkudGhlbihhc3NldCA9PiBzZXROZXdFZGl0QXNzZXQoYXNzZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0VkaXQoJ0VkaXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGVuY2lsXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUFzc2V0KGFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShkYXRhLCBbZC5jb2xdLCBbKCFhc2NlbmRpbmcgPyBcImFzY1wiIDogXCJkZXNjXCIpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldERhdGEob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShkYXRhLCBbZC5jb2xdLCBbXCJhc2NcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXREYXRhKG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZChkLmNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eyhpdGVtKSA9PiBmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PScjYXNzZXRNb2RhbCcgb25DbGljaz17YWRkTmV3QnV0dG9ufT5BZGQgQXNzZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cImFzc2V0TW9kYWxcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDAlJywgd2lkdGg6ICc3NSUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e25ld0VkaXQgPT0gJ05ldycgPyAnQWRkIE5ldyBBc3NldCB0byBNZXRlcicgOiAnRWRpdCAnICsgbmV3RWRpdEFzc2V0LkFzc2V0S2V5ICsgJyBmb3IgTWV0ZXInfTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4gc2V0TmV3RWRpdEFzc2V0KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpKX0+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBc3NldEF0dHJpYnV0ZXMuQXNzZXRBdHRyaWJ1dGVGaWVsZHMgQXNzZXQ9e25ld0VkaXRBc3NldH0gTmV3RWRpdD17bmV3RWRpdH0gQXNzZXRUeXBlcz17YXNzZXRUeXBlc30gQWxsQXNzZXRzPXthbGxBc3NldHN9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IEdldERpZmZlcmVudEFzc2V0PXsoYXNzZXRJRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0ID0gYWxsQXNzZXRzLmZpbmQoYSA9PiBhLklEID09IGFzc2V0SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0VHlwZSA9IGFzc2V0VHlwZXMuZmluZChhdCA9PiBhdC5JRCA9PSBhc3NldFsnQXNzZXRUeXBlSUQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMoYXNzZXRJRCwgYXNzZXRUeXBlLk5hbWUpLnRoZW4oYXNzZXQgPT4gc2V0TmV3RWRpdEFzc2V0KGFzc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IEhpZGVBc3NldFR5cGU9e2ZhbHNlfSBIaWRlU2VsZWN0QXNzZXQ9e2ZhbHNlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93QXR0cmlidXRlcygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXthZGROZXdBc3NldH0gaGlkZGVuPXtuZXdFZGl0ID09ICdFZGl0JyB8fCBuZXdFZGl0QXNzZXQuSUQgIT0gMH0+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXthZGRFeGlzdGluZ0Fzc2V0fSBoaWRkZW49e25ld0VkaXQgPT0gJ0VkaXQnIHx8IG5ld0VkaXRBc3NldC5JRCA9PSAwfT5TYXZlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHNhdmVCdXR0b25Gb3JFeGlzdGluZ0Fzc2V0cygpfSBoaWRkZW49e25ld0VkaXQgPT0gJ05ldyd9PlNhdmU8L2J1dHRvbj5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHNldE5ld0VkaXRBc3NldChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSl9PkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvY2F0aW9uQXNzZXRXaW5kb3c7XHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDb25uZWN0aW9uSW5mby50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDkvMTEvMjAxOSAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBBc3NldEF0dHJpYnV0ZXMgfSBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XHJcbmltcG9ydCBGb3JtVGV4dEFyZWEgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtVGV4dEFyZWEnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2F0aW9uSW5mb1dpbmRvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IExvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uLCBzdGF0ZVNldHRlcjogKGxvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uKSA9PiB2b2lkIH0sIHsgTG9jYXRpb246IE9wZW5YREEuTG9jYXRpb259LCB7fT4ge1xyXG4gICAganF1ZXJ5SGFuZGxlOiBKUXVlcnkuanFYSFI7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBMb2NhdGlvbjogdGhpcy5wcm9wcy5Mb2NhdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy52YWxpZC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe0xvY2F0aW9uOiBuZXh0UHJvcHMuTG9jYXRpb259KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUxvY2F0aW9uKCk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uID0gXy5jbG9uZSh0aGlzLnN0YXRlLkxvY2F0aW9uKTtcclxuXHJcbiAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uL1VwZGF0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5Mb2NhdGlvbiksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgfSkuZG9uZSgoTG9jYXRpb25JRDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3RhdGVTZXR0ZXIobG9jYXRpb24pO1xyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkxvY2F0aW9uKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnTG9jYXRpb25LZXknKSBcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uTG9jYXRpb25LZXkgIT0gbnVsbCAmJiB0aGlzLnN0YXRlLkxvY2F0aW9uLkxvY2F0aW9uS2V5Lmxlbmd0aCA+IDAgJiYgdGhpcy5zdGF0ZS5Mb2NhdGlvbi5Mb2NhdGlvbktleS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5Mb2NhdGlvbi5OYW1lICE9IG51bGwgJiYgdGhpcy5zdGF0ZS5Mb2NhdGlvbi5OYW1lLmxlbmd0aCA+IDAgJiYgdGhpcy5zdGF0ZS5Mb2NhdGlvbi5OYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0FsaWFzJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uQWxpYXMgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLkxvY2F0aW9uLkFsaWFzLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Nob3J0TmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkxvY2F0aW9uLlNob3J0TmFtZSA9PSBudWxsIHx8IHRoaXMuc3RhdGUuTG9jYXRpb24uU2hvcnROYW1lLmxlbmd0aCA8PSA1MDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTGF0aXR1ZGUnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5Mb2NhdGlvbi5MYXRpdHVkZSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIodGhpcy5zdGF0ZS5Mb2NhdGlvbi5MYXRpdHVkZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xvbmdpdHVkZScpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkxvY2F0aW9uLkxvbmdpdHVkZSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIodGhpcy5zdGF0ZS5Mb2NhdGlvbi5Mb25naXR1ZGUpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlN1YnN0YXRpb24gSW5mb3JtYXRpb246PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnN0YXRlLkxvY2F0aW9ufSBGaWVsZD17J0xvY2F0aW9uS2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KGxvY2F0aW9uKSA9PiB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb246IGxvY2F0aW9uIH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3RoaXMuc3RhdGUuTG9jYXRpb259IEZpZWxkPXsnTmFtZSd9IEZlZWRiYWNrPXsnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycyBhbmQgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KGxvY2F0aW9uKSA9PiB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb246IGxvY2F0aW9uIH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3RoaXMuc3RhdGUuTG9jYXRpb259IEZpZWxkPXsnU2hvcnROYW1lJ30gRmVlZGJhY2s9eydTaG9ydE5hbWUgbXVzdCBiZSBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycy4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXsobG9jYXRpb24pID0+IHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogbG9jYXRpb24gfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydBbGlhcyd9IEZlZWRiYWNrPXsnQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KGxvY2F0aW9uKSA9PiB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb246IGxvY2F0aW9uIH0pfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnN0YXRlLkxvY2F0aW9ufSBGaWVsZD17J0xhdGl0dWRlJ30gRmVlZGJhY2s9eydMYXRpdHVkZSBpcyBhIHJlcXVpcmUgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXsobG9jYXRpb24pID0+IHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogbG9jYXRpb24gfSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydMb25naXR1ZGUnfSBGZWVkYmFjaz17J0xvbmdpdHVkZSBpcyBhIHJlcXVpcmUgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXsobG9jYXRpb24pID0+IHRoaXMuc2V0U3RhdGUoe0xvY2F0aW9uOiBsb2NhdGlvbn0pfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTG9jYXRpb24+IFJvd3M9ezN9IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydEZXNjcmlwdGlvbid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhsb2NhdGlvbikgPT4gdGhpcy5zZXRTdGF0ZSh7IExvY2F0aW9uOiBsb2NhdGlvbiB9KX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVMb2NhdGlvbigpfSBoaWRkZW49e3RoaXMuc3RhdGUuTG9jYXRpb24uSUQgPT0gMH0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuTG9jYXRpb24gPT0gdGhpcy5wcm9wcy5Mb2NhdGlvbn0+VXBkYXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogdGhpcy5wcm9wcy5Mb2NhdGlvbiB9KX0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuTG9jYXRpb24gPT0gdGhpcy5wcm9wcy5Mb2NhdGlvbn0+UmVzZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTG9jYXRpb25NZXRlci50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjEvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IFRhYmxlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvVGFibGUnO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5mdW5jdGlvbiBMb2NhdGlvbk1ldGVyV2luZG93KHByb3BzOiB7IExvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uIH0pOiBKU1guRWxlbWVudHtcclxuICAgIGxldCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xyXG4gICAgY29uc3QgW21ldGVycywgc2V0TWV0ZXJzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuTWV0ZXI+PihbXSk7XHJcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8a2V5b2YoT3BlblhEQS5NZXRlcik+KCdBc3NldEtleScpO1xyXG4gICAgY29uc3QgW2FzY2VuZGluZywgc2V0QXNjZW5kaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgZ2V0TWV0ZXJzKCk7XHJcbiAgICB9LCBbcHJvcHMuTG9jYXRpb24uSURdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNZXRlcnMoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Mb2NhdGlvbi8ke3Byb3BzLkxvY2F0aW9uLklEfS9NZXRlcnNgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUobWV0ZXJzID0+IHNldE1ldGVycyhtZXRlcnMpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxlY3QoaXRlbSkge1xyXG4gICAgICAgIGhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiBob21lUGF0aCArICdpbmRleC5jc2h0bWwnLCBzZWFyY2g6ICc/bmFtZT1NZXRlciZNZXRlcklEPScgKyBpdGVtLnJvdy5JRCwgc3RhdGU6IHt9IH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5NZXRlcnM6PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzODEsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFibGU8T3BlblhEQS5NZXRlcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29scz17W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldEtleScsIGxhYmVsOiAnS2V5JywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICczMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMzAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05hbWUnLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzMwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICczMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBrZXk6ICdUeXBlJywgbGFiZWw6ICdUeXBlJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01ha2UnLCBsYWJlbDogJ01ldGVycycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNb2RlbCcsIGxhYmVsOiAnQXNzZXRzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdjYWxjKDEwJSknIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ2xhc3M9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e21ldGVyc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydEZpZWxkPXtzb3J0RmllbGR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZz17YXNjZW5kaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNvcnQ9eyhkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5jb2wgPT0gc29ydEZpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyZWQgPSBfLm9yZGVyQnkobWV0ZXJzLCBbZC5jb2xdLCBbKCFhc2NlbmRpbmcgPyBcImFzY1wiIDogXCJkZXNjXCIpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1ldGVycyhvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KG1ldGVycywgW2QuY29sXSwgW1wiYXNjXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWV0ZXJzKG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZChkLmNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eygpID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICApO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25NZXRlcldpbmRvdzsiXSwic291cmNlUm9vdCI6IiJ9