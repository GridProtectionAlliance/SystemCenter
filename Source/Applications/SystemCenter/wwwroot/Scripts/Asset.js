(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Asset"],{

/***/ "./TSX/SystemCenter/Asset/Asset.tsx":
/*!******************************************!*\
  !*** ./TSX/SystemCenter/Asset/Asset.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AssetInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssetInfo */ "./TSX/SystemCenter/Asset/AssetInfo.tsx");
/* harmony import */ var _AssetLocation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AssetLocation */ "./TSX/SystemCenter/Asset/AssetLocation.tsx");
/* harmony import */ var _AssetMeter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AssetMeter */ "./TSX/SystemCenter/Asset/AssetMeter.tsx");
/* harmony import */ var _CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/ExternalDBUpdate */ "./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommonComponents/NoteWindow */ "./TSX/SystemCenter/CommonComponents/NoteWindow.tsx");
/* harmony import */ var _AssetConnection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AssetConnection */ "./TSX/SystemCenter/Asset/AssetConnection.tsx");
/* harmony import */ var _CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../CommonComponents/AdditionalFieldsWindow */ "./TSX/SystemCenter/CommonComponents/AdditionalFieldsWindow.tsx");
/* harmony import */ var _TS_Services_Asset__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../TS/Services/Asset */ "./TS/Services/Asset.ts");
/* harmony import */ var _AssetAttribute_LineSegmentWindow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../AssetAttribute/LineSegmentWindow */ "./TSX/SystemCenter/AssetAttribute/LineSegmentWindow.tsx");
//******************************************************************************************************
//  Asset.tsx - Gbtc
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











function Asset(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), asset = _a[0], setAsset = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getTab()), 2), tab = _b[0], setTabState = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), assetType = _c[0], setAssetType = _c[1];
    function getTab() {
        if (sessionStorage.hasOwnProperty('Asset.Tab'))
            return JSON.parse(sessionStorage.getItem('Asset.Tab'));
        else
            return 'notes';
    }
    function setTab(tab) {
        sessionStorage.setItem('Asset.Tab', JSON.stringify(tab));
        setTabState(tab);
    }
    function getAsset() {
        if (props.AssetID == undefined)
            return function () { };
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Asset/One/" + props.AssetID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) {
            setAsset(data);
            getAssetType(data);
        });
        return function () {
            if (handle.abort != undefined)
                handle.abort();
        };
    }
    function getAssetType(asset) {
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_9__["getAssetTypes"])().done(function (assetTypes) {
            var assetType = assetTypes.find(function (at) { return at.ID == asset['AssetTypeID']; });
            setAssetType(assetType.Name);
        });
    }
    function deleteAsset() {
        var response = confirm("This will delete the Asset Permanently");
        if (!response)
            return;
        return $.ajax({
            type: "DELETE",
            url: homePath + "api/OpenXDA/Asset/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(asset),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (msg) {
            sessionStorage.clear();
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=Assets', state: {} });
        });
    }
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return getAsset();
    }, [props.AssetID]);
    if (asset == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, asset != null ? asset.AssetKey : '')),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", hidden: asset == null, onClick: function () { return deleteAsset(); } }, "Delete Asset (Permanent)"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "notes" ? " active" : ""), onClick: function () { return setTab('notes'); }, "data-toggle": "tab", href: "#notes" }, "Notes")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "assetInfo" ? " active" : ""), onClick: function () { return setTab('assetInfo'); }, "data-toggle": "tab", href: "#assetInfo" }, "Asset Info")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "additionalFields" ? " active" : ""), onClick: function () { return setTab('additionalFields'); }, "data-toggle": "tab", href: "#additionalFields" }, "Additional Fields")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "substations" ? " active" : ""), onClick: function () { return setTab('substations'); }, "data-toggle": "tab", href: "#substations" }, "Substations")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "meters" ? " active" : ""), onClick: function () { return setTab('meters'); }, "data-toggle": "tab", href: "#meters" }, "Meters")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "connections" ? " active" : ""), onClick: function () { return setTab('connections'); }, "data-toggle": "tab", href: "#connections" }, "Connections")),
            (assetType == 'Line') ?
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "Segments" ? " active" : ""), onClick: function () { return setTab('Segments'); }, "data-toggle": "tab", href: "#Segments" }, "Line Segments")) : null,
            (assetType == 'Breaker' || assetType == 'CapacitorBank' || assetType == 'Line' || assetType == 'Transformer' || assetType == 'Bus') ?
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "extDB" ? " active" : ""), onClick: function () { return setTab('extDB'); }, "data-toggle": "tab", href: "#extDB" }, "External DB")) : null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 235, overflow: 'hidden' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "notes" ? " active" : "fade"), id: "notes" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_6__["default"], { ID: asset.ID, Type: 'Asset' })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "assetInfo" ? " active" : "fade"), id: "assetInfo" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetInfo__WEBPACK_IMPORTED_MODULE_1__["default"], { Asset: asset, StateSetter: setAsset })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "additionalFields" ? " active" : "fade"), id: "additionalFields" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_8__["default"], { ID: asset.ID, Type: (assetType == null) ? "Asset" : assetType, Tab: tab })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "substations" ? " active" : "fade"), id: "substations" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetLocation__WEBPACK_IMPORTED_MODULE_2__["default"], { Asset: asset })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "meters" ? " active" : "fade"), id: "meters" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetMeter__WEBPACK_IMPORTED_MODULE_3__["default"], { Asset: asset })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "connections" ? " active" : "fade"), id: "connections" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetConnection__WEBPACK_IMPORTED_MODULE_7__["default"], { Asset: asset })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "extDB" ? " active" : "fade"), id: "extDB" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_4__["default"], { ID: asset.ID, Type: (assetType == null) ? "Asset" : assetType, Tab: tab })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "Segments" ? " active" : "fade"), id: "Segments" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_LineSegmentWindow__WEBPACK_IMPORTED_MODULE_10__["default"], { ID: asset.ID })))));
}
/* harmony default export */ __webpack_exports__["default"] = (Asset);


/***/ }),

/***/ "./TSX/SystemCenter/Asset/AssetConnection.tsx":
/*!****************************************************!*\
  !*** ./TSX/SystemCenter/Asset/AssetConnection.tsx ***!
  \****************************************************/
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




function AssetConnectionWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), assetConnections = _a[0], setAssetConnections = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), assetConnectionTypes = _b[0], setAssetConnectionTypes = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]({ ID: 0, AssetRelationshipTypeID: 0, Parent: '', Child: '' }), 2), newAssetConnection = _c[0], setNewAssetConnection = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), localAssets = _d[0], setLocalAssets = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortField = _e[0], setSortField = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _f[0], setAscending = _f[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getData();
    }, [props.Asset]);
    function getData() {
        getAssetConnectionTypes();
        getAssetConnections();
        getLocalAssets();
    }
    function getAssetConnections() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Asset/" + props.Asset.ID + "/AssetConnections",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (acs) { return setAssetConnections(acs); });
    }
    function getLocalAssets() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Asset/" + props.Asset.ID + "/AssetNear",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (las) { return setLocalAssets(las); });
    }
    function getAssetConnectionTypes() {
        if (sessionStorage.hasOwnProperty('OpenXDA.AssetConnectionTypes'))
            setAssetConnectionTypes(JSON.parse(sessionStorage.getItem('OpenXDA.AssetConnectionTypes')));
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/AssetConnectionType",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (acts) {
                setAssetConnectionTypes(acts);
                sessionStorage.setItem('OpenXDA.AssetConnectionTypes', JSON.stringify(acts));
            });
    }
    function deleteAssetConnection(connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, $.ajax({
                        type: "DELETE",
                        url: homePath + "api/OpenXDA/Asset/" + props.Asset.ID + "/Asset/" + connection.AssetID,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: true,
                        async: true
                    }).done(function (assets) {
                        getData();
                    }).fail(function (msg) {
                        if (msg.status == 500)
                            alert(msg.responseJSON.ExceptionMessage);
                    })];
            });
        });
    }
    function addConnection() {
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/AssetConnection/Add",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ ID: 0, AssetRelationshipTypeID: newAssetConnection.AssetRelationshipTypeID, ParentID: props.Asset.ID, ChildID: parseInt(newAssetConnection.Child) }),
            cache: false,
            async: true
        }).done(function (connection) {
            getData();
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
        });
    }
    function handleSelect(item) {
        history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + item.row.AssetID, state: {} });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Meters:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__["default"], { cols: [
                        { key: 'AssetKey', label: 'Asset', headerStyle: { width: '47%' }, rowStyle: { width: '47%' } },
                        { key: 'Name', label: 'Relationship', headerStyle: { width: '47%' }, rowStyle: { width: '47%' } },
                        {
                            key: null, label: '', headerStyle: { width: '6%' }, rowStyle: { width: '6%' }, content: function (asset, key, style) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                        e.preventDefault();
                                        deleteAssetConnection(asset);
                                    } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" })))); }
                        },
                    ], tableClass: "table table-hover", data: assetConnections, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.orderBy(assetConnections, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setAssetConnections(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.orderBy(assetConnections, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setAssetConnections(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: handleSelect, selected: function () { return false; } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", "data-toggle": 'modal', "data-target": '#connectionModal' }, "Add Connection"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "connectionModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, "Add Asset to Asset Connection"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Asset:"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: newAssetConnection != null ? newAssetConnection.Child : '0', onChange: function (evt) {
                                    var r = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(newAssetConnection);
                                    r.Child = evt.target.value;
                                    setNewAssetConnection(r);
                                } }, localAssets.map(function (als) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: als.ID, key: als.ID }, als.AssetKey); })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Asset Connection Type:"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: newAssetConnection != null ? newAssetConnection.AssetRelationshipTypeID : '0', onChange: function (evt) {
                                    var r = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(newAssetConnection);
                                    r.AssetRelationshipTypeID = assetConnectionTypes.find(function (l) { return l.ID.toString() == evt.target.value; }).ID;
                                    setNewAssetConnection(r);
                                } }, assetConnectionTypes.map(function (als) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: als.ID, key: als.ID }, als.Name); })))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addConnection }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close")))))));
}
/* harmony default export */ __webpack_exports__["default"] = (AssetConnectionWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Asset/AssetInfo.tsx":
/*!**********************************************!*\
  !*** ./TSX/SystemCenter/Asset/AssetInfo.tsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../TS/Services/Asset */ "./TS/Services/Asset.ts");
/* harmony import */ var _AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AssetAttribute/Breaker */ "./TSX/SystemCenter/AssetAttribute/Breaker.tsx");
/* harmony import */ var _AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AssetAttribute/Bus */ "./TSX/SystemCenter/AssetAttribute/Bus.tsx");
/* harmony import */ var _AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../AssetAttribute/CapBank */ "./TSX/SystemCenter/AssetAttribute/CapBank.tsx");
/* harmony import */ var _AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../AssetAttribute/Line */ "./TSX/SystemCenter/AssetAttribute/Line.tsx");
/* harmony import */ var _AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AssetAttribute/Transformer */ "./TSX/SystemCenter/AssetAttribute/Transformer.tsx");
/* harmony import */ var _AssetAttribute_LineSegment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../AssetAttribute/LineSegment */ "./TSX/SystemCenter/AssetAttribute/LineSegment.tsx");
/* harmony import */ var _AssetAttribute_CapBankRelay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../AssetAttribute/CapBankRelay */ "./TSX/SystemCenter/AssetAttribute/CapBankRelay.tsx");
//******************************************************************************************************
//  MeterInfo.tsx - Gbtc
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
//  09/09/2019 - Billy Ernest
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










var AssetInfoWindow = /** @class */ (function (_super) {
    __extends(AssetInfoWindow, _super);
    function AssetInfoWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Asset: _this.props.Asset,
            AssetTypes: [],
        };
        _this.updateState = _this.updateState.bind(_this);
        return _this;
    }
    AssetInfoWindow.prototype.componentDidMount = function () {
        var _this = this;
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__["getAssetTypes"])().done(function (assetTypes) {
            _this.setState({ AssetTypes: assetTypes });
            var assetType = assetTypes.find(function (at) { return at.ID == _this.state.Asset['AssetTypeID']; });
            Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__["getAssetWithAdditionalFields"])(_this.props.Asset.ID, assetType.Name).then(function (asset) { return _this.setState({ Asset: asset }); });
        });
    };
    AssetInfoWindow.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (nextProps.Asset != this.state.Asset)
            this.setState({ Asset: nextProps.Asset }, function () {
                var assetType = _this.state.AssetTypes.find(function (at) { return at.ID == _this.state.Asset['AssetTypeID']; });
                Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__["getAssetWithAdditionalFields"])(_this.state.Asset.ID, assetType.Name).then(function (asset) { return _this.setState({ Asset: asset }); });
            });
    };
    AssetInfoWindow.prototype.showAttributes = function () {
        if (this.state.Asset.AssetType == 'Breaker')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_3__["default"], { NewEdit: 'Edit', Asset: this.state.Asset, UpdateState: this.updateState, ShowSpare: true });
        else if (this.state.Asset.AssetType == 'Bus')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_4__["default"], { NewEdit: 'Edit', Asset: this.state.Asset, UpdateState: this.updateState });
        else if (this.state.Asset.AssetType == 'CapacitorBank')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_5__["default"], { NewEdit: 'Edit', Asset: this.state.Asset, UpdateState: this.updateState });
        else if (this.state.Asset.AssetType == 'CapacitorBankRelay')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBankRelay__WEBPACK_IMPORTED_MODULE_9__["default"], { NewEdit: 'Edit', Asset: this.state.Asset, UpdateState: this.updateState });
        else if (this.state.Asset.AssetType == 'Line')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_6__["default"], { NewEdit: 'Edit', Asset: this.state.Asset, UpdateState: this.updateState });
        else if (this.state.Asset.AssetType == 'Transformer')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_7__["default"], { NewEdit: 'Edit', Asset: this.state.Asset, UpdateState: this.updateState });
        else if (this.state.Asset.AssetType == 'LineSegment')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_LineSegment__WEBPACK_IMPORTED_MODULE_8__["default"], { NewEdit: 'Edit', Asset: this.state.Asset, UpdateState: this.updateState });
    };
    AssetInfoWindow.prototype.updateState = function (asset) {
        this.setState({ Asset: asset });
    };
    AssetInfoWindow.prototype.render = function () {
        var _this = this;
        if (this.props.Asset == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Asset Information:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["default"], { Asset: this.state.Asset, NewEdit: 'Edit', AssetTypes: this.state.AssetTypes, AllAssets: [], UpdateState: this.updateState, GetDifferentAsset: function () { } })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, this.showAttributes()))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", type: "submit", onClick: function () {
                            Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__["editExistingAsset"])(_this.state.Asset);
                            _this.props.StateSetter(_this.state.Asset);
                        }, disabled: this.state.Asset == this.props.Asset }, "Save Changes")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return _this.setState({ Asset: _this.props.Asset }); }, disabled: this.state.Asset == this.props.Asset }, "Clear Changes")))));
    };
    return AssetInfoWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (AssetInfoWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Asset/AssetLocation.tsx":
/*!**************************************************!*\
  !*** ./TSX/SystemCenter/Asset/AssetLocation.tsx ***!
  \**************************************************/
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
//  AssetLocation.tsx - Gbtc
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
//  01/24/2020 - Billy Ernest
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




function AssetLocationWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), locations = _a[0], setLocations = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('LocationKey'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), allLocations = _d[0], setAllLocations = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](), 2), newLocation = _e[0], setNewLocation = _e[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getData();
    }, [props.Asset]);
    function getData() {
        getLocations();
        getAllOtherLocations();
    }
    function getLocations() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Asset/" + props.Asset.ID + "/Locations",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data) { return setLocations(data); });
    }
    function getAllOtherLocations() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Asset/" + props.Asset.ID + "/OtherLocations",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data) {
            var records = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](data, ['LocationKey'], ['asc']);
            setAllLocations(records);
            setNewLocation(records[0]);
        });
    }
    function deleteLocation(location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, $.ajax({
                        type: "DELETE",
                        url: homePath + "api/OpenXDA/Asset/" + props.Asset.ID + "/Location/" + location.ID,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: true,
                        async: true
                    }).done(function (assets) {
                        getData();
                    }).fail(function (msg) {
                        if (msg.status == 500)
                            alert(msg.responseJSON.ExceptionMessage);
                    })];
            });
        });
    }
    function addLocation() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, $.ajax({
                        type: "POST",
                        url: homePath + "api/OpenXDA/Asset/" + props.Asset.ID + "/Location/" + newLocation.ID,
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        cache: true,
                        async: true
                    }).done(function (record) {
                        getData();
                    }).fail(function (msg) {
                        if (msg.status == 500)
                            alert(msg.responseJSON.ExceptionMessage);
                    })];
            });
        });
    }
    function handleSelect(item, event) {
        if (event.target.localName == 'td')
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=Location&LocationID=' + item.row.ID, state: {} });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Substations:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 381, padding: 30, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__["default"], { cols: [
                        { key: 'LocationKey', label: 'Key', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        { key: 'Name', label: 'Name', headerStyle: { width: '30%' }, rowStyle: { width: '30%' } },
                        { key: 'Latitude', label: 'Latitude', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Longitude', label: 'Longitude', headerStyle: { width: 'calc(10%)' }, rowStyle: { width: '10%' } },
                        {
                            key: null, label: '', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: function (asset, key, style) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                        e.preventDefault();
                                        deleteLocation(asset);
                                    } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" })))); }
                        },
                    ], tableClass: "table table-hover", data: locations, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](locations, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setLocations(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](locations, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setLocations(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: handleSelect, selected: function () { return false; } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", "data-toggle": 'modal', "data-target": '#locationModal' }, "Add Substation"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "locationModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, "Add Substation to Asset"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Substation"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: newLocation != null ? newLocation.ID : '0', onChange: function (evt) {
                                    setNewLocation(allLocations.find(function (l) { return l.ID.toString() == evt.target.value; }));
                                } }, allLocations.map(function (als) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: als.ID, key: als.ID }, als.LocationKey); })))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", hidden: allLocations.length == 0, onClick: addLocation }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close")))))));
}
/* harmony default export */ __webpack_exports__["default"] = (AssetLocationWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Asset/AssetMeter.tsx":
/*!***********************************************!*\
  !*** ./TSX/SystemCenter/Asset/AssetMeter.tsx ***!
  \***********************************************/
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




function AssetMeterWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), meters = _a[0], setMeters = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getMeters();
    }, [props.Asset]);
    function getMeters() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Asset/" + props.Asset.ID + "/Meters",
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
                    }, onClick: handleSelect, 
                    //theadStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    //tbodyStyle={{ display: 'block', overflowY: 'auto', maxHeight: window.innerHeight - 182, width: '100%' }}
                    //rowStyle={{ fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }}
                    selected: function () { return false; } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" })));
}
/* harmony default export */ __webpack_exports__["default"] = (AssetMeterWindow);


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/CapBankRelay.tsx":
/*!**********************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/CapBankRelay.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
//******************************************************************************************************
//  CapBankRelay.tsx - Gbtc
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
//  08/12/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************



function CapBankRelayAttributes(props) {
    function valid(field) {
        if (field == 'OnVoltageThreshhold')
            return props.Asset.OnVoltageThreshhold != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.OnVoltageThreshhold);
        return true;
    }
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: props.Asset, Field: 'OnVoltageThreshhold', Label: 'Relay On Voltage Threshhold (pu)', Feedback: 'Relay On Voltage Threshhold (pu) is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }));
}
/* harmony default export */ __webpack_exports__["default"] = (CapBankRelayAttributes);


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/LineSegmentWindow.tsx":
/*!***************************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/LineSegmentWindow.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../TS/Services/Asset */ "./TS/Services/Asset.ts");
/* harmony import */ var _LineSegment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LineSegment */ "./TSX/SystemCenter/AssetAttribute/LineSegment.tsx");
//******************************************************************************************************
//  LineSegmentWindow.tsx - Gbtc
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
//  04/17/2020 - Christoph Lackner
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




function LineSegmentWindow(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), segments = _a[0], setSegments = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), updated = _b[0], setUpdated = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["default"].getNewAsset('LineSegment')), 2), newEditSegment = _c[0], setNewEditSegment = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('New'), 2), newEdit = _d[0], setNewEdit = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), assetTypes = _e[0], setAssetTypes = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), allAssets = _f[0], setAllAssets = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), segmentConnections = _g[0], setConnections = _g[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getData();
    }, [props.ID]);
    function getData() {
        getSegments();
        setUpdated(false);
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__["getAllAssets"])().done(function (assets) {
            Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__["getAssetTypes"])().done(function (assetTypes) {
                var dat = assetTypes.filter(function (item) { return item.Name == 'LineSegment'; });
                setAssetTypes(dat);
                setAllAssets(assets.filter(function (item) { return item['AssetTypeID'] == dat[0].ID; }));
            });
        });
    }
    function getSegments() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Line/" + props.ID + "/LineSegments",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (data) {
            setSegments(data);
        });
    }
    function addExistingSegment() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/LineSegment/" + newEditSegment.ID + "/AddToLine/" + props.ID,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(''),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (e) {
            getData();
            setNewEditSegment(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["default"].getNewAsset('LineSegment'));
        });
    }
    function addNewSegment() {
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/LineSegment/New/Line/" + props.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: newEditSegment }),
            cache: false,
            async: true
        }).done(function () {
            sessionStorage.clear();
            getData();
            setNewEditSegment(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["default"].getNewAsset('LineSegment'));
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
        });
    }
    function deleteSegment(id) {
        var response = confirm("This will delete the Segment from the Line");
        if (!response)
            return;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/LineSegment/" + id + "/Disconnect/" + props.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (e) {
            getData();
        });
    }
    function fawgUpdate() {
        $.ajax({
            type: "GET",
            url: homePath + "api/ExternalDB/FAWG/LineSegment/UpdateSegments/" + props.ID,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(''),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data) {
            setUpdated(true);
            console.log(data);
            setSegments(data["segments"]);
            setConnections(data["connections"]);
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
        });
    }
    function cancelUpdate() {
        setUpdated(false);
        getSegments();
    }
    function submitUpdate() {
        $.ajax({
            type: "POST",
            url: homePath + "api/ExternalDB/FAWG/LineSegment/ConfirmSegments/" + props.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ "data": { "segments": segments, "connections": segmentConnections } }),
            cache: false,
            async: true
        }).done(function () {
            cancelUpdate();
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Additional Fields:")),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: 'table' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 150 } }, "Segment"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 50 } }, "Length"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { colSpan: 4, style: { width: 160 } }, "Zero Seq (Ohm/deg)"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { colSpan: 4, style: { width: 160 } }, "Positive Seq (Ohm/deg)"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { colSpan: 4, style: { width: 160 } }, "Loop (LG) (Ohm/deg)"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 75 } }, "Thermal Rating"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 30 } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 100 } }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 50 } }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "Z0"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "<"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "R0"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "X0"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "Z1"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "<"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "R1"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "X1"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "Zs"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "<"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "Rs"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }, "Xs"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 75 } }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 30 } }))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, segments.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](TableRowInput, { key: i, ParentLineID: props.ID, Segment: a, remove: deleteSegment }); }))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#assetModal", hidden: updated }, "Add Segement")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function (evt) { return fawgUpdate(); }, hidden: updated }, "Update from FAWG")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function (evt) { return submitUpdate(); }, hidden: !updated }, "Save Changes")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function (evt) { return cancelUpdate(); }, hidden: !updated }, "Reset"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "assetModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '75%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, newEdit == 'New' ? 'Add New LineSegment to Line' : 'Edit ' + newEditSegment.AssetKey + ' for Meter'),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal", onClick: function (evt) { return setNewEditSegment(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["default"].getNewAsset('LineSegment')); } }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["default"], { Asset: newEditSegment, NewEdit: newEdit, AssetTypes: assetTypes, AllAssets: allAssets, UpdateState: setNewEditSegment, GetDifferentAsset: function (assetID) {
                                        var asset = allAssets.find(function (a) { return a.ID == assetID; });
                                        console.log(asset);
                                        console.log(assetID);
                                        console.log(allAssets);
                                        var assetType = assetTypes.find(function (at) { return at.ID == asset['AssetTypeID']; });
                                        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__["getAssetWithAdditionalFields"])(assetID, assetType.Name).then(function (asset) { return setNewEditSegment(asset); });
                                    } })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LineSegment__WEBPACK_IMPORTED_MODULE_3__["default"], { Asset: newEditSegment, NewEdit: newEdit, UpdateState: setNewEditSegment })))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addNewSegment, hidden: newEdit == 'Edit' || newEditSegment.ID != 0 }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: addExistingSegment, hidden: newEdit == 'Edit' || newEditSegment.ID == 0 }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal", onClick: function (evt) { return setNewEditSegment(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["default"].getNewAsset('LineSegment')); } }, "Close")))))));
}
/* harmony default export */ __webpack_exports__["default"] = (LineSegmentWindow);
function TableRowInput(props) {
    var Z1 = Math.sqrt(props.Segment.R1 * props.Segment.R1 + props.Segment.X1 * props.Segment.X1);
    var Z0 = Math.sqrt(props.Segment.R0 * props.Segment.R0 + props.Segment.X0 * props.Segment.X0);
    var a0 = Math.acos(props.Segment.R0 / Z0) * 180.0 / Math.PI;
    var a1 = Math.acos(props.Segment.R1 / Z1) * 180.0 / Math.PI;
    var Xs = (2 * props.Segment.X1 + props.Segment.X0) / 3.0;
    var Rs = (2 * props.Segment.R1 + props.Segment.R0) / 3.0;
    var Zs = Math.sqrt(Rs * Rs + Xs * Xs);
    var as = Math.acos(Rs / Zs) * 180.0 / Math.PI;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            props.Segment.AssetName,
            " (",
            props.Segment.AssetKey,
            ")"),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Segment.Length),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, Z0.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, a0.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Segment.R0.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Segment.X0.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, Z1.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, a1.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Segment.R1.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Segment.X1.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, Zs.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, as.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, Rs.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, Xs.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Segment.ThermalRating),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return props.remove(props.Segment.ID); } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0L0Fzc2V0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0L0Fzc2V0Q29ubmVjdGlvbi50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldC9Bc3NldEluZm8udHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXQvQXNzZXRMb2NhdGlvbi50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldC9Bc3NldE1ldGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmtSZWxheS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9MaW5lU2VnbWVudFdpbmRvdy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsb0JBQW9CO0FBQ3BCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBR1c7QUFDUTtBQUNOO0FBQ3dCO0FBR3RCO0FBQ1U7QUFDRjtBQUMwQjtBQUNyQjtBQUNTO0FBSXBFLFNBQVMsS0FBSyxDQUFDLEtBQTBCO0lB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QUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDdEMsZ0VBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBTTtRQUN4QixnRUFBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFNO1FBQ3hCLGdFQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBTTtRQUN0QyxnRUFBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDdEMsZ0VBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBTTtRQUN4QixnRUFBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFNO1FBQ3hCLGdFQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDeEIsZ0VBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBTTtRQUN4QixnRUFBSyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBTTtRQUN0QztZQUFJLGdFQUFRLFNBQVMsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxJQUFLLFlBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBOUIsQ0FBOEI7Z0JBQUU7b0JBQU0sMkRBQUcsU0FBUyxFQUFDLGFBQWEsR0FBSyxDQUFPLENBQVMsQ0FBSyxDQUM1SSxDQUNSLENBQUM7QUFDTixDQUFDIiwiZmlsZSI6IkFzc2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFzc2V0LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEFzc2V0SW5mb1dpbmRvdyBmcm9tICcuL0Fzc2V0SW5mbyc7XHJcbmltcG9ydCBBc3NldExvY2F0aW9uV2luZG93IGZyb20gJy4vQXNzZXRMb2NhdGlvbic7XHJcbmltcG9ydCBBc3NldE1ldGVyV2luZG93IGZyb20gJy4vQXNzZXRNZXRlcic7XHJcbmltcG9ydCBFeHRlcm5hbERCVXBkYXRlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZSc7XHJcblxyXG5cclxuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgTm90ZVdpbmRvdyBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL05vdGVXaW5kb3cnO1xyXG5pbXBvcnQgQXNzZXRDb25uZWN0aW9uV2luZG93IGZyb20gJy4vQXNzZXRDb25uZWN0aW9uJztcclxuaW1wb3J0IEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9BZGRpdGlvbmFsRmllbGRzV2luZG93JztcclxuaW1wb3J0IHsgZ2V0QXNzZXRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL1RTL1NlcnZpY2VzL0Fzc2V0JztcclxuaW1wb3J0IExpbmVTZWdtZW50V2luZG93IGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0xpbmVTZWdtZW50V2luZG93JztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuZGVjbGFyZSB0eXBlIFRhYiA9ICdub3RlcycgfCAnYXNzZXRJbmZvJyB8ICdzdWJzdGF0aW9ucycgfCAnbWV0ZXJzJyB8ICdjb25uZWN0aW9ucycgfCAnYWRkaXRpb25hbEZpZWxkcycgfCAnZXh0REInIHwgJ1NlZ21lbnRzJ1xyXG5cclxuZnVuY3Rpb24gQXNzZXQocHJvcHM6IHsgQXNzZXRJRDogbnVtYmVyIH0pIHtcclxuICAgIGxldCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xyXG4gICAgY29uc3QgW2Fzc2V0LCBzZXRBc3NldF0gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLkFzc2V0PihudWxsKTtcclxuICAgIGNvbnN0IFt0YWIsIHNldFRhYlN0YXRlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oZ2V0VGFiKCkpO1xyXG4gICAgY29uc3QgW2Fzc2V0VHlwZSwgc2V0QXNzZXRUeXBlXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXRUeXBlTmFtZT4obnVsbCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGFiKCk6IFRhYiB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdBc3NldC5UYWInKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnQXNzZXQuVGFiJykpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuICdub3Rlcyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0VGFiKHRhYjogVGFiKTogdm9pZCB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnQXNzZXQuVGFiJywgSlNPTi5zdHJpbmdpZnkodGFiKSk7XHJcbiAgICAgICAgc2V0VGFiU3RhdGUodGFiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBc3NldCgpIHtcclxuICAgICAgICBpZiAocHJvcHMuQXNzZXRJRCA9PSB1bmRlZmluZWQpIHJldHVybiAoKSA9PiB7IH07XHJcbiAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC9PbmUvJHtwcm9wcy5Bc3NldElEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgfSlcclxuXHJcbiAgICAgICAgaGFuZGxlLmRvbmUoKGRhdGE6IE9wZW5YREEuQXNzZXQpID0+IHtcclxuICAgICAgICAgICBzZXRBc3NldChkYXRhKVxyXG4gICAgICAgICAgIGdldEFzc2V0VHlwZShkYXRhKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFzc2V0VHlwZShhc3NldDogT3BlblhEQS5Bc3NldCk6IHZvaWQge1xyXG4gICAgICAgIGdldEFzc2V0VHlwZXMoKS5kb25lKChhc3NldFR5cGVzOiBBcnJheTxPcGVuWERBLkFzc2V0VHlwZT4pID0+IHtcclxuICAgICAgICAgICAgbGV0IGFzc2V0VHlwZSA9IGFzc2V0VHlwZXMuZmluZChhdCA9PiBhdC5JRCA9PSBhc3NldFsnQXNzZXRUeXBlSUQnXSlcclxuICAgICAgICAgICAgc2V0QXNzZXRUeXBlKGFzc2V0VHlwZS5OYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVBc3NldCgpOiBKUXVlcnkuanFYSFIge1xyXG5cclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBjb25maXJtKFwiVGhpcyB3aWxsIGRlbGV0ZSB0aGUgQXNzZXQgUGVybWFuZW50bHlcIik7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC9EZWxldGVgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGFzc2V0KSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiBob21lUGF0aCArICdpbmRleC5jc2h0bWwnLCBzZWFyY2g6ICc/bmFtZT1Bc3NldHMnLCBzdGF0ZToge30gfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICByZXR1cm4gZ2V0QXNzZXQoKTtcclxuICAgICAgICBcclxuICAgIH0sIFtwcm9wcy5Bc3NldElEXSk7XHJcblxyXG4gICAgaWYgKGFzc2V0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNjMsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNjMsIG92ZXJmbG93OiAnaGlkZGVuJywgcGFkZGluZzogMTUgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMj57YXNzZXQgIT0gbnVsbCA/IGFzc2V0LkFzc2V0S2V5IDogJyd9PC9oMj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIHB1bGwtcmlnaHRcIiBoaWRkZW49e2Fzc2V0ID09IG51bGx9IG9uQ2xpY2s9eygpID0+IGRlbGV0ZUFzc2V0KCl9PkRlbGV0ZSBBc3NldCAoUGVybWFuZW50KTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgIDxociAvPlxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJub3Rlc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdub3RlcycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbm90ZXNcIj5Ob3RlczwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJhc3NldEluZm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignYXNzZXRJbmZvJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNhc3NldEluZm9cIj5Bc3NldCBJbmZvPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignYWRkaXRpb25hbEZpZWxkcycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjYWRkaXRpb25hbEZpZWxkc1wiPkFkZGl0aW9uYWwgRmllbGRzPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcInN1YnN0YXRpb25zXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ3N1YnN0YXRpb25zJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNzdWJzdGF0aW9uc1wiPlN1YnN0YXRpb25zPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcIm1ldGVyc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdtZXRlcnMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI21ldGVyc1wiPk1ldGVyczwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJjb25uZWN0aW9uc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdjb25uZWN0aW9ucycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjY29ubmVjdGlvbnNcIj5Db25uZWN0aW9uczwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICB7KGFzc2V0VHlwZSA9PSAnTGluZScpP1xyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJTZWdtZW50c1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdTZWdtZW50cycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjU2VnbWVudHNcIj5MaW5lIFNlZ21lbnRzPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+IDogbnVsbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgeyhhc3NldFR5cGUgPT0gJ0JyZWFrZXInIHx8IGFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFuaycgfHwgYXNzZXRUeXBlID09ICdMaW5lJyB8fCBhc3NldFR5cGUgPT0gJ1RyYW5zZm9ybWVyJyB8fCBhc3NldFR5cGUgPT0gJ0J1cycpID9cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiZXh0REJcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignZXh0REInKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2V4dERCXCI+RXh0ZXJuYWwgREI8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT4gOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiIHN0eWxlPXt7bWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMzUsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcIm5vdGVzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJub3Rlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxOb3RlV2luZG93IElEPXthc3NldC5JRH0gVHlwZT0nQXNzZXQnIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImFzc2V0SW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiYXNzZXRJbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFzc2V0SW5mb1dpbmRvdyBBc3NldD17YXNzZXR9IFN0YXRlU2V0dGVyPXtzZXRBc3NldH0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwiYWRkaXRpb25hbEZpZWxkc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiYWRkaXRpb25hbEZpZWxkc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxBZGRpdGlvbmFsRmllbGRzV2luZG93IElEPXthc3NldC5JRH0gVHlwZT17KGFzc2V0VHlwZSA9PSBudWxsKSA/IFwiQXNzZXRcIiA6IGFzc2V0VHlwZX0gVGFiPXt0YWJ9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwic3Vic3RhdGlvbnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cInN1YnN0YXRpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFzc2V0TG9jYXRpb25XaW5kb3cgQXNzZXQ9e2Fzc2V0fSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJtZXRlcnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cIm1ldGVyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxBc3NldE1ldGVyV2luZG93IEFzc2V0PXthc3NldH0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwiY29ubmVjdGlvbnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImNvbm5lY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFzc2V0Q29ubmVjdGlvbldpbmRvdyBBc3NldD17YXNzZXR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImV4dERCXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJleHREQlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxFeHRlcm5hbERCVXBkYXRlIElEPXthc3NldC5JRH0gVHlwZT17KGFzc2V0VHlwZSA9PSBudWxsKSA/IFwiQXNzZXRcIiA6IGFzc2V0VHlwZX0gVGFiPXt0YWJ9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcIlNlZ21lbnRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJTZWdtZW50c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5lU2VnbWVudFdpbmRvdyBJRD17YXNzZXQuSUR9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzc2V0O1xyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTG9jYXRpb25NZXRlci50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjEvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1RhYmxlJztcclxuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuaW50ZXJmYWNlIEFzc2V0Q29ubmVjdGlvbiB7XHJcbiAgICBBc3NldFJlbGF0aW9uU2hpcFR5cGVJRDogbnVtYmVyLFxyXG4gICAgTmFtZTogc3RyaW5nLFxyXG4gICAgQXNzZXRJRDogbnVtYmVyLFxyXG4gICAgQXNzZXRLZXk6IHN0cmluZ1xyXG59XHJcbmZ1bmN0aW9uIEFzc2V0Q29ubmVjdGlvbldpbmRvdyhwcm9wczogeyBBc3NldDogT3BlblhEQS5Bc3NldCB9KTogSlNYLkVsZW1lbnR7XHJcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcclxuICAgIGNvbnN0IFthc3NldENvbm5lY3Rpb25zLCBzZXRBc3NldENvbm5lY3Rpb25zXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PEFzc2V0Q29ubmVjdGlvbj4+KFtdKTtcclxuICAgIGNvbnN0IFthc3NldENvbm5lY3Rpb25UeXBlcywgc2V0QXNzZXRDb25uZWN0aW9uVHlwZXNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb25UeXBlPj4oW10pO1xyXG4gICAgY29uc3QgW25ld0Fzc2V0Q29ubmVjdGlvbiwgc2V0TmV3QXNzZXRDb25uZWN0aW9uXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPih7SUQ6IDAsIEFzc2V0UmVsYXRpb25zaGlwVHlwZUlEOiAwLCBQYXJlbnQ6ICcnLCBDaGlsZDogJyd9KTtcclxuICAgIGNvbnN0IFtsb2NhbEFzc2V0cywgc2V0TG9jYWxBc3NldHNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5Bc3NldD4+KFtdKTtcclxuXHJcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8a2V5b2YgKEFzc2V0Q29ubmVjdGlvbik+KCdBc3NldEtleScpO1xyXG4gICAgY29uc3QgW2FzY2VuZGluZywgc2V0QXNjZW5kaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgZ2V0RGF0YSgpO1xyXG4gICAgfSwgW3Byb3BzLkFzc2V0XSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcclxuICAgICAgICBnZXRBc3NldENvbm5lY3Rpb25UeXBlcygpO1xyXG4gICAgICAgIGdldEFzc2V0Q29ubmVjdGlvbnMoKTtcclxuICAgICAgICBnZXRMb2NhbEFzc2V0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFzc2V0Q29ubmVjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC8ke3Byb3BzLkFzc2V0LklEfS9Bc3NldENvbm5lY3Rpb25zYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKGFjcyA9PiBzZXRBc3NldENvbm5lY3Rpb25zKGFjcykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldExvY2FsQXNzZXRzKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvJHtwcm9wcy5Bc3NldC5JRH0vQXNzZXROZWFyYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKGxhcyA9PiBzZXRMb2NhbEFzc2V0cyhsYXMpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QXNzZXRDb25uZWN0aW9uVHlwZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ09wZW5YREEuQXNzZXRDb25uZWN0aW9uVHlwZXMnKSlcclxuICAgICAgICAgICAgc2V0QXNzZXRDb25uZWN0aW9uVHlwZXMoSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdPcGVuWERBLkFzc2V0Q29ubmVjdGlvblR5cGVzJykpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRDb25uZWN0aW9uVHlwZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoYWN0czogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb25UeXBlPikgPT4ge1xyXG4gICAgICAgICAgICBzZXRBc3NldENvbm5lY3Rpb25UeXBlcyhhY3RzKTtcclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnT3BlblhEQS5Bc3NldENvbm5lY3Rpb25UeXBlcycsIEpTT04uc3RyaW5naWZ5KGFjdHMpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBkZWxldGVBc3NldENvbm5lY3Rpb24oY29ubmVjdGlvbjogQXNzZXRDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvJHtwcm9wcy5Bc3NldC5JRH0vQXNzZXQvJHtjb25uZWN0aW9uLkFzc2V0SUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChhc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+KSA9PiB7XHJcbiAgICAgICAgICAgIGdldERhdGEoKTtcclxuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxyXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZENvbm5lY3Rpb24oKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRDb25uZWN0aW9uL0FkZGAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe0lEOiAwLCBBc3NldFJlbGF0aW9uc2hpcFR5cGVJRDogbmV3QXNzZXRDb25uZWN0aW9uLkFzc2V0UmVsYXRpb25zaGlwVHlwZUlELCBQYXJlbnRJRDogcHJvcHMuQXNzZXQuSUQsIENoaWxkSUQ6IHBhcnNlSW50KG5ld0Fzc2V0Q29ubmVjdGlvbi5DaGlsZCl9KSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKGNvbm5lY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgZ2V0RGF0YSgpO1xyXG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXHJcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdChpdGVtKSB7XHJcbiAgICAgICAgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJz9uYW1lPUFzc2V0JkFzc2V0SUQ9JyArIGl0ZW0ucm93LkFzc2V0SUQsIHN0YXRlOiB7fSB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+TWV0ZXJzOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzgxLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlPEFzc2V0Q29ubmVjdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29scz17W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldEtleScsIGxhYmVsOiAnQXNzZXQnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzQ3JScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICc0NyUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScsIGxhYmVsOiAnUmVsYXRpb25zaGlwJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICc0NyUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnNDclJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnNiUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnNiUnIH0sIGNvbnRlbnQ6IChhc3NldCwga2V5LCBzdHlsZSkgPT4gPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUFzc2V0Q29ubmVjdGlvbihhc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXthc3NldENvbm5lY3Rpb25zfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShhc3NldENvbm5lY3Rpb25zLCBbZC5jb2xdLCBbKCFhc2NlbmRpbmcgPyBcImFzY1wiIDogXCJkZXNjXCIpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzc2V0Q29ubmVjdGlvbnMob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShhc3NldENvbm5lY3Rpb25zLCBbZC5jb2xdLCBbXCJhc2NcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc3NldENvbm5lY3Rpb25zKG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZChkLmNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eygpID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNjb25uZWN0aW9uTW9kYWwnPkFkZCBDb25uZWN0aW9uPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIGlkPVwiY29ubmVjdGlvbk1vZGFsXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+QWRkIEFzc2V0IHRvIEFzc2V0IENvbm5lY3Rpb248L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFzc2V0OjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17bmV3QXNzZXRDb25uZWN0aW9uICE9IG51bGwgPyBuZXdBc3NldENvbm5lY3Rpb24uQ2hpbGQgOiAnMCd9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByID0gXy5jbG9uZShuZXdBc3NldENvbm5lY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByLkNoaWxkID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TmV3QXNzZXRDb25uZWN0aW9uKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bG9jYWxBc3NldHMubWFwKGFscyA9PiA8b3B0aW9uIHZhbHVlPXthbHMuSUR9IGtleT17YWxzLklEfT57YWxzLkFzc2V0S2V5fTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Bc3NldCBDb25uZWN0aW9uIFR5cGU6PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXtuZXdBc3NldENvbm5lY3Rpb24gIT0gbnVsbCA/IG5ld0Fzc2V0Q29ubmVjdGlvbi5Bc3NldFJlbGF0aW9uc2hpcFR5cGVJRCA6ICcwJ30gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHIgPSBfLmNsb25lKG5ld0Fzc2V0Q29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuQXNzZXRSZWxhdGlvbnNoaXBUeXBlSUQgPSBhc3NldENvbm5lY3Rpb25UeXBlcy5maW5kKGwgPT4gbC5JRC50b1N0cmluZygpID09IGV2dC50YXJnZXQudmFsdWUpLklEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0Fzc2V0Q29ubmVjdGlvbihyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Fzc2V0Q29ubmVjdGlvblR5cGVzLm1hcChhbHMgPT4gPG9wdGlvbiB2YWx1ZT17YWxzLklEfSBrZXk9e2Fscy5JRH0+e2Fscy5OYW1lfTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9e2FkZENvbm5lY3Rpb259PlNhdmU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzc2V0Q29ubmVjdGlvbldpbmRvdzsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTWV0ZXJJbmZvLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOS8wOS8yMDE5IC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XHJcbmltcG9ydCB7IGdldEFzc2V0VHlwZXMsIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMsIGVkaXRFeGlzdGluZ0Fzc2V0fSBmcm9tICcuLi8uLi8uLi9UUy9TZXJ2aWNlcy9Bc3NldCc7XHJcbmltcG9ydCBCcmVha2VyQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9CcmVha2VyJztcclxuaW1wb3J0IEJ1c0F0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQnVzJztcclxuaW1wb3J0IENhcEJhbmtBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmsnO1xyXG5pbXBvcnQgTGluZUF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvTGluZSc7XHJcbmltcG9ydCBUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvVHJhbnNmb3JtZXInO1xyXG5pbXBvcnQgTGluZVNlZ21lbnRBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0xpbmVTZWdtZW50JztcclxuaW1wb3J0IENhcEJhbmtSZWxheUF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQ2FwQmFua1JlbGF5JztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NldEluZm9XaW5kb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBBc3NldDogT3BlblhEQS5Bc3NldCwgU3RhdGVTZXR0ZXI6IChhc3NldDogT3BlblhEQS5Bc3NldCkgPT4gdm9pZCB9LCB7IEFzc2V0OiBPcGVuWERBLkFzc2V0LCBBc3NldFR5cGVzOiBBcnJheTxPcGVuWERBLkFzc2V0VHlwZT4sIH0sIHt9PiB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgQXNzZXQ6IHRoaXMucHJvcHMuQXNzZXQsXHJcbiAgICAgICAgICAgIEFzc2V0VHlwZXM6IFtdLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IHRoaXMudXBkYXRlU3RhdGUuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBnZXRBc3NldFR5cGVzKCkuZG9uZSgoYXNzZXRUeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBc3NldFR5cGVzOiBhc3NldFR5cGVzIH0pO1xyXG4gICAgICAgICAgICBsZXQgYXNzZXRUeXBlID0gYXNzZXRUeXBlcy5maW5kKGF0ID0+IGF0LklEID09IHRoaXMuc3RhdGUuQXNzZXRbJ0Fzc2V0VHlwZUlEJ10pXHJcblxyXG4gICAgICAgICAgICBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzKHRoaXMucHJvcHMuQXNzZXQuSUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKGFzc2V0ID0+IHRoaXMuc2V0U3RhdGUoe0Fzc2V0OiBhc3NldH0pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChuZXh0UHJvcHMuQXNzZXQgIT0gdGhpcy5zdGF0ZS5Bc3NldClcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEFzc2V0OiBuZXh0UHJvcHMuQXNzZXQgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFzc2V0VHlwZSA9IHRoaXMuc3RhdGUuQXNzZXRUeXBlcy5maW5kKGF0ID0+IGF0LklEID09IHRoaXMuc3RhdGUuQXNzZXRbJ0Fzc2V0VHlwZUlEJ10pXHJcbiAgICAgICAgICAgICAgICBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzKHRoaXMuc3RhdGUuQXNzZXQuSUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKGFzc2V0ID0+IHRoaXMuc2V0U3RhdGUoeyBBc3NldDogYXNzZXQgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QXR0cmlidXRlcygpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuQXNzZXQuQXNzZXRUeXBlID09ICdCcmVha2VyJylcclxuICAgICAgICAgICAgcmV0dXJuIDxCcmVha2VyQXR0cmlidXRlcyBOZXdFZGl0PXsnRWRpdCd9IEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcn0gVXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IFNob3dTcGFyZT17dHJ1ZX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ0J1cycpXHJcbiAgICAgICAgICAgIHJldHVybiA8QnVzQXR0cmlidXRlcyBOZXdFZGl0PXsnRWRpdCd9IEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0fSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ0NhcGFjaXRvckJhbmsnKVxyXG4gICAgICAgICAgICByZXR1cm4gPENhcEJhbmtBdHRyaWJ1dGVzIE5ld0VkaXQ9eydFZGl0J30gQXNzZXQ9e3RoaXMuc3RhdGUuQXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ0NhcGFjaXRvckJhbmtSZWxheScpXHJcbiAgICAgICAgICAgIHJldHVybiA8Q2FwQmFua1JlbGF5QXR0cmlidXRlcyBOZXdFZGl0PXsnRWRpdCd9IEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua1JlbGF5fSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ0xpbmUnKVxyXG4gICAgICAgICAgICByZXR1cm4gPExpbmVBdHRyaWJ1dGVzIE5ld0VkaXQ9eydFZGl0J30gQXNzZXQ9e3RoaXMuc3RhdGUuQXNzZXQgYXMgT3BlblhEQS5MaW5lfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ1RyYW5zZm9ybWVyJylcclxuICAgICAgICAgICAgcmV0dXJuIDxUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgTmV3RWRpdD17J0VkaXQnfSBBc3NldD17dGhpcy5zdGF0ZS5Bc3NldCBhcyBPcGVuWERBLlRyYW5zZm9ybWVyfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ0xpbmVTZWdtZW50JylcclxuICAgICAgICAgICAgcmV0dXJuIDxMaW5lU2VnbWVudEF0dHJpYnV0ZXMgTmV3RWRpdD17J0VkaXQnfSBBc3NldD17dGhpcy5zdGF0ZS5Bc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50fSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz47XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVTdGF0ZShhc3NldDogT3BlblhEQS5Bc3NldCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBc3NldDogYXNzZXQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLkFzc2V0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5Bc3NldCBJbmZvcm1hdGlvbjo8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFzc2V0QXR0cmlidXRlcyBBc3NldD17dGhpcy5zdGF0ZS5Bc3NldH0gTmV3RWRpdD0nRWRpdCcgQXNzZXRUeXBlcz17dGhpcy5zdGF0ZS5Bc3NldFR5cGVzfSBBbGxBc3NldHM9e1tdfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gR2V0RGlmZmVyZW50QXNzZXQ9eygpID0+IHsgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zaG93QXR0cmlidXRlcygpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdEV4aXN0aW5nQXNzZXQodGhpcy5zdGF0ZS5Bc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlN0YXRlU2V0dGVyKHRoaXMuc3RhdGUuQXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5Bc3NldCA9PSB0aGlzLnByb3BzLkFzc2V0fT5TYXZlIENoYW5nZXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IEFzc2V0OiB0aGlzLnByb3BzLkFzc2V0IH0pfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5Bc3NldCA9PSB0aGlzLnByb3BzLkFzc2V0fT5DbGVhciBDaGFuZ2VzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFzc2V0TG9jYXRpb24udHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzI0LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1RhYmxlJztcclxuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gQXNzZXRMb2NhdGlvbldpbmRvdyhwcm9wczogeyBBc3NldDogT3BlblhEQS5Bc3NldCB9KTogSlNYLkVsZW1lbnR7XHJcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcclxuICAgIGNvbnN0IFtsb2NhdGlvbnMsIHNldExvY2F0aW9uc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkxvY2F0aW9uPj4oW10pO1xyXG4gICAgY29uc3QgW3NvcnRGaWVsZCwgc2V0U29ydEZpZWxkXSA9IFJlYWN0LnVzZVN0YXRlPGtleW9mIChPcGVuWERBLkxvY2F0aW9uKT4oJ0xvY2F0aW9uS2V5Jyk7XHJcbiAgICBjb25zdCBbYXNjZW5kaW5nLCBzZXRBc2NlbmRpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcbiAgICBjb25zdCBbYWxsTG9jYXRpb25zLCBzZXRBbGxMb2NhdGlvbnNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5Mb2NhdGlvbj4+KFtdKTtcclxuICAgIGNvbnN0IFtuZXdMb2NhdGlvbiwgc2V0TmV3TG9jYXRpb25dID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Mb2NhdGlvbj4oKTtcclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgZ2V0RGF0YSgpO1xyXG4gICAgfSwgW3Byb3BzLkFzc2V0XSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcclxuICAgICAgICBnZXRMb2NhdGlvbnMoKTtcclxuICAgICAgICBnZXRBbGxPdGhlckxvY2F0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldExvY2F0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7cHJvcHMuQXNzZXQuSUR9L0xvY2F0aW9uc2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZShkYXRhID0+IHNldExvY2F0aW9ucyhkYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QWxsT3RoZXJMb2NhdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC8ke3Byb3BzLkFzc2V0LklEfS9PdGhlckxvY2F0aW9uc2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZShkYXRhID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZHMgPSBfLm9yZGVyQnkoZGF0YSwgWydMb2NhdGlvbktleSddLCBbJ2FzYyddKTtcclxuICAgICAgICAgICAgc2V0QWxsTG9jYXRpb25zKHJlY29yZHMpO1xyXG4gICAgICAgICAgICBzZXROZXdMb2NhdGlvbihyZWNvcmRzWzBdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTG9jYXRpb24obG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC8ke3Byb3BzLkFzc2V0LklEfS9Mb2NhdGlvbi8ke2xvY2F0aW9uLklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xyXG4gICAgICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBhZGRMb2NhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvJHtwcm9wcy5Bc3NldC5JRH0vTG9jYXRpb24vJHtuZXdMb2NhdGlvbi5JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUocmVjb3JkID0+IHtcclxuICAgICAgICAgICAgZ2V0RGF0YSgpO1xyXG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXHJcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0KGl0ZW0sIGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5sb2NhbE5hbWUgPT0gJ3RkJylcclxuICAgICAgICAgICAgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJz9uYW1lPUxvY2F0aW9uJkxvY2F0aW9uSUQ9JyArIGl0ZW0ucm93LklELCBzdGF0ZToge30gfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlN1YnN0YXRpb25zOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzgxLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlPE9wZW5YREEuTG9jYXRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTG9jYXRpb25LZXknLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMzAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzMwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJywgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICczMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMzAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xhdGl0dWRlJywgbGFiZWw6ICdMYXRpdHVkZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdMb25naXR1ZGUnLCBsYWJlbDogJ0xvbmdpdHVkZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnY2FsYygxMCUpJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIGNvbnRlbnQ6IChhc3NldCwga2V5LCBzdHlsZSkgPT4gPD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUxvY2F0aW9uKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ2xhc3M9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2xvY2F0aW9uc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydEZpZWxkPXtzb3J0RmllbGR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZz17YXNjZW5kaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblNvcnQ9eyhkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5jb2wgPT0gc29ydEZpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyZWQgPSBfLm9yZGVyQnkobG9jYXRpb25zLCBbZC5jb2xdLCBbKCFhc2NlbmRpbmcgPyBcImFzY1wiIDogXCJkZXNjXCIpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExvY2F0aW9ucyhvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KGxvY2F0aW9ucywgW2QuY29sXSwgW1wiYXNjXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TG9jYXRpb25zKG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZChkLmNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eygpID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNsb2NhdGlvbk1vZGFsJz5BZGQgU3Vic3RhdGlvbjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cImxvY2F0aW9uTW9kYWxcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj5BZGQgU3Vic3RhdGlvbiB0byBBc3NldDwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U3Vic3RhdGlvbjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17bmV3TG9jYXRpb24gIT0gbnVsbCA/IG5ld0xvY2F0aW9uLklEIDogJzAnfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdMb2NhdGlvbihhbGxMb2NhdGlvbnMuZmluZChsID0+IGwuSUQudG9TdHJpbmcoKSA9PSBldnQudGFyZ2V0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthbGxMb2NhdGlvbnMubWFwKGFscyA9PiA8b3B0aW9uIHZhbHVlPXthbHMuSUR9IGtleT17YWxzLklEfT57YWxzLkxvY2F0aW9uS2V5fTwvb3B0aW9uPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGhpZGRlbj17YWxsTG9jYXRpb25zLmxlbmd0aCA9PSAwfSBvbkNsaWNrPXthZGRMb2NhdGlvbn0+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBc3NldExvY2F0aW9uV2luZG93OyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBMb2NhdGlvbk1ldGVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMS8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9UYWJsZSc7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmZ1bmN0aW9uIEFzc2V0TWV0ZXJXaW5kb3cocHJvcHM6IHsgQXNzZXQ6IE9wZW5YREEuQXNzZXQgfSk6IEpTWC5FbGVtZW50e1xyXG4gICAgbGV0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XHJcbiAgICBjb25zdCBbbWV0ZXJzLCBzZXRNZXRlcnNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5NZXRlcj4+KFtdKTtcclxuICAgIGNvbnN0IFtzb3J0RmllbGQsIHNldFNvcnRGaWVsZF0gPSBSZWFjdC51c2VTdGF0ZTxrZXlvZihPcGVuWERBLk1ldGVyKT4oJ0Fzc2V0S2V5Jyk7XHJcbiAgICBjb25zdCBbYXNjZW5kaW5nLCBzZXRBc2NlbmRpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXRNZXRlcnMoKTtcclxuICAgIH0sIFtwcm9wcy5Bc3NldF0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1ldGVycygpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7cHJvcHMuQXNzZXQuSUR9L01ldGVyc2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZShtZXRlcnMgPT4gc2V0TWV0ZXJzKG1ldGVycykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdChpdGVtKSB7XHJcbiAgICAgICAgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJz9uYW1lPU1ldGVyJk1ldGVySUQ9JyArIGl0ZW0ucm93LklELCBzdGF0ZToge30gfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0Pk1ldGVyczo8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDM4MSwgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZTxPcGVuWERBLk1ldGVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0S2V5JywgbGFiZWw6ICdLZXknLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzMwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICczMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScsIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMzAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzMwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy97IGtleTogJ1R5cGUnLCBsYWJlbDogJ1R5cGUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWFrZScsIGxhYmVsOiAnTWV0ZXJzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01vZGVsJywgbGFiZWw6ICdBc3NldHMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2NhbGMoMTAlKScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17bWV0ZXJzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShtZXRlcnMsIFtkLmNvbF0sIFsoIWFzY2VuZGluZyA/IFwiYXNjXCIgOiBcImRlc2NcIildKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWV0ZXJzKG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyZWQgPSBfLm9yZGVyQnkobWV0ZXJzLCBbZC5jb2xdLCBbXCJhc2NcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXRlcnMob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkKGQuY29sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90Ym9keVN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93WTogJ2F1dG8nLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDE4Miwgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jvd1N0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoKSA9PiBmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzc2V0TWV0ZXJXaW5kb3c7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIENhcEJhbmtSZWxheS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDgvMTIvMjAyMCAtIEMuIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi9Bc3NldCc7XHJcblxyXG5mdW5jdGlvbiBDYXBCYW5rUmVsYXlBdHRyaWJ1dGVzKHByb3BzOiB7IE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LCBBc3NldDogT3BlblhEQS5DYXBCYW5rUmVsYXksIFVwZGF0ZVN0YXRlOiAobmV3RWRpdEFzc2V0OiBPcGVuWERBLkNhcEJhbmtSZWxheSkgPT4gdm9pZCB9KTogSlNYLkVsZW1lbnQge1xyXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkNhcEJhbmtSZWxheSkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ09uVm9sdGFnZVRocmVzaGhvbGQnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuT25Wb2x0YWdlVGhyZXNoaG9sZCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuT25Wb2x0YWdlVGhyZXNoaG9sZCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gPD5cclxuICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFua1JlbGF5PiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J09uVm9sdGFnZVRocmVzaGhvbGQnfSBMYWJlbD17J1JlbGF5IE9uIFZvbHRhZ2UgVGhyZXNoaG9sZCAocHUpJ30gRmVlZGJhY2s9eydSZWxheSBPbiBWb2x0YWdlIFRocmVzaGhvbGQgKHB1KSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgIDwvPjtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhcEJhbmtSZWxheUF0dHJpYnV0ZXM7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIExpbmVTZWdtZW50V2luZG93LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwNC8xNy8yMDIwIC0gQ2hyaXN0b3BoIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtTeXN0ZW1DZW50ZXIsIE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBGb3JtQ2hlY2tCb3ggZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtQ2hlY2tCb3gnO1xyXG5pbXBvcnQgRm9ybVNlbGVjdCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1TZWxlY3QnO1xyXG5pbXBvcnQgeyBnZXRBbGxBc3NldHMsIGdldEFzc2V0VHlwZXMsIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9UUy9TZXJ2aWNlcy9Bc3NldCc7XHJcbmltcG9ydCBMaW5lU2VnbWVudEF0dHJpYnV0ZXMgZnJvbSAnLi9MaW5lU2VnbWVudCc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gTGluZVNlZ21lbnRXaW5kb3cocHJvcHM6IHsgSUQ6IG51bWJlciB9KTogSlNYLkVsZW1lbnQge1xyXG4gICAgY29uc3QgW3NlZ21lbnRzLCBzZXRTZWdtZW50c10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkxpbmVTZWdtZW50Pj4oW10pO1xyXG4gICAgY29uc3QgW3VwZGF0ZWQsIHNldFVwZGF0ZWRdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAgIGNvbnN0IFtuZXdFZGl0U2VnbWVudCwgc2V0TmV3RWRpdFNlZ21lbnRdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldD4oQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lU2VnbWVudCcpIGFzIE9wZW5YREEuTGluZVNlZ21lbnQpO1xyXG4gICAgY29uc3QgW25ld0VkaXQsIHNldE5ld0VkaXRdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLk5ld0VkaXQ+KCdOZXcnKTtcclxuICAgIGNvbnN0IFthc3NldFR5cGVzLCBzZXRBc3NldFR5cGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPj4oW10pO1xyXG4gICAgY29uc3QgW2FsbEFzc2V0cywgc2V0QWxsQXNzZXRzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXQ+PihbXSk7XHJcbiAgICBjb25zdCBbc2VnbWVudENvbm5lY3Rpb25zLCBzZXRDb25uZWN0aW9uc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxhbnk+PihbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICB9LCBbcHJvcHMuSURdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGdldFNlZ21lbnRzKCk7XHJcbiAgICAgICAgc2V0VXBkYXRlZChmYWxzZSk7XHJcblxyXG4gICAgICAgIGdldEFsbEFzc2V0cygpLmRvbmUoKGFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4pID0+IHtcclxuICAgICAgICAgICAgZ2V0QXNzZXRUeXBlcygpLmRvbmUoKGFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdCA9IGFzc2V0VHlwZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5OYW1lID09ICdMaW5lU2VnbWVudCcpXHJcbiAgICAgICAgICAgICAgICBzZXRBc3NldFR5cGVzKGRhdCk7XHJcbiAgICAgICAgICAgICAgICBzZXRBbGxBc3NldHMoYXNzZXRzLmZpbHRlcihpdGVtID0+IGl0ZW1bJ0Fzc2V0VHlwZUlEJ10gPT0gZGF0WzBdLklEKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWdtZW50cygpOiB2b2lkIHtcclxuICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9MaW5lLyR7cHJvcHMuSUR9L0xpbmVTZWdtZW50c2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgfSkuZG9uZSgoZGF0YTogQXJyYXk8T3BlblhEQS5MaW5lU2VnbWVudD4pID0+IHtcclxuICAgICAgICAgICBzZXRTZWdtZW50cyhkYXRhKTtcclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEV4aXN0aW5nU2VnbWVudCgpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmVTZWdtZW50LyR7bmV3RWRpdFNlZ21lbnQuSUR9L0FkZFRvTGluZS8ke3Byb3BzLklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoJycpLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKGUgPT4ge1xyXG4gICAgICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgICAgIHNldE5ld0VkaXRTZWdtZW50KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZVNlZ21lbnQnKSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGROZXdTZWdtZW50KCk6IHZvaWR7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTGluZVNlZ21lbnQvTmV3L0xpbmUvJHtwcm9wcy5JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgQXNzZXQ6IG5ld0VkaXRTZWdtZW50IH0pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGdldERhdGEoKTtcclxuICAgICAgICAgICAgc2V0TmV3RWRpdFNlZ21lbnQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lU2VnbWVudCcpKVxyXG5cclxuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxyXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVNlZ21lbnQoaWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGNvbmZpcm0oXCJUaGlzIHdpbGwgZGVsZXRlIHRoZSBTZWdtZW50IGZyb20gdGhlIExpbmVcIik7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UpIHJldHVybjtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmVTZWdtZW50LyR7aWR9L0Rpc2Nvbm5lY3QvJHtwcm9wcy5JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoZSA9PiB7XHJcbiAgICAgICAgICAgIGdldERhdGEoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmF3Z1VwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9FeHRlcm5hbERCL0ZBV0cvTGluZVNlZ21lbnQvVXBkYXRlU2VnbWVudHMvJHtwcm9wcy5JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KCcnKSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNldFVwZGF0ZWQodHJ1ZSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIHNldFNlZ21lbnRzKGRhdGFbXCJzZWdtZW50c1wiXSk7XHJcbiAgICAgICAgICAgIHNldENvbm5lY3Rpb25zKGRhdGFbXCJjb25uZWN0aW9uc1wiXSlcclxuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxyXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuY2VsVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHNldFVwZGF0ZWQoZmFsc2UpXHJcbiAgICAgICAgZ2V0U2VnbWVudHMoKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1Ym1pdFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvRXh0ZXJuYWxEQi9GQVdHL0xpbmVTZWdtZW50L0NvbmZpcm1TZWdtZW50cy8ke3Byb3BzLklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBcImRhdGFcIjogeyBcInNlZ21lbnRzXCI6IHNlZ21lbnRzLCBcImNvbm5lY3Rpb25zXCI6IHNlZ21lbnRDb25uZWN0aW9ucyB9IH0pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNhbmNlbFVwZGF0ZSgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aDQ+QWRkaXRpb25hbCBGaWVsZHM6PC9oND5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT0ndGFibGUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAxNTAgfX0+U2VnbWVudDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA1MCB9fT5MZW5ndGg8L3RoPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY29sU3Bhbj17NH0gc3R5bGU9e3sgd2lkdGg6IDE2MCB9fT5aZXJvIFNlcSAoT2htL2RlZyk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjb2xTcGFuPXs0fSBzdHlsZT17eyB3aWR0aDogMTYwIH19PlBvc2l0aXZlIFNlcSAoT2htL2RlZyk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjb2xTcGFuPXs0fSBzdHlsZT17eyB3aWR0aDogMTYwIH19Pkxvb3AgKExHKSAoT2htL2RlZyk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogNzUgfX0+VGhlcm1hbCBSYXRpbmc8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogMzAgfX0+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAxMDB9fT48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogNTAgfX0+PC90aD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT5aMDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT4mbHQ7PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PlIwPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PlgwPC90aD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT5aMTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT4mbHQ7PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PlIxPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PlgxPC90aD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT5aczwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT4mbHQ7PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PlJzPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PlhzPC90aD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA3NSB9fT48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogMzAgfX0+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWdtZW50cy5tYXAoKGEsIGkpID0+IDxUYWJsZVJvd0lucHV0IGtleT17aX0gUGFyZW50TGluZUlEPXtwcm9wcy5JRH0gU2VnbWVudD17YX0gcmVtb3ZlPXtkZWxldGVTZWdtZW50fSAvPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD1cIiNhc3NldE1vZGFsXCIgaGlkZGVuPXt1cGRhdGVkfSA+QWRkIFNlZ2VtZW50PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyhldnQpID0+IGZhd2dVcGRhdGUoKX0gaGlkZGVuPXt1cGRhdGVkfT5VcGRhdGUgZnJvbSBGQVdHPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoZXZ0KSA9PiBzdWJtaXRVcGRhdGUoKX0gaGlkZGVuPXshdXBkYXRlZH0gPlNhdmUgQ2hhbmdlczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXsoZXZ0KSA9PiBjYW5jZWxVcGRhdGUoKX0gaGlkZGVuPXshdXBkYXRlZH0gPlJlc2V0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgaWQ9XCJhc3NldE1vZGFsXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIHdpZHRoOiAnNzUlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPntuZXdFZGl0ID09ICdOZXcnID8gJ0FkZCBOZXcgTGluZVNlZ21lbnQgdG8gTGluZScgOiAnRWRpdCAnICsgbmV3RWRpdFNlZ21lbnQuQXNzZXRLZXkgKyAnIGZvciBNZXRlcid9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiBzZXROZXdFZGl0U2VnbWVudChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmVTZWdtZW50JykgYXMgT3BlblhEQS5MaW5lU2VnbWVudCl9PiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXNzZXRBdHRyaWJ1dGVzIEFzc2V0PXtuZXdFZGl0U2VnbWVudH0gTmV3RWRpdD17bmV3RWRpdH0gQXNzZXRUeXBlcz17YXNzZXRUeXBlc30gQWxsQXNzZXRzPXthbGxBc3NldHN9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0U2VnbWVudH0gR2V0RGlmZmVyZW50QXNzZXQ9eyhhc3NldElEKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXQgPSBhbGxBc3NldHMuZmluZChhID0+IGEuSUQgPT0gYXNzZXRJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhc3NldElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbEFzc2V0cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldFR5cGUgPSBhc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gYXNzZXRbJ0Fzc2V0VHlwZUlEJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzKGFzc2V0SUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKGFzc2V0ID0+IHNldE5ld0VkaXRTZWdtZW50KGFzc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpbmVTZWdtZW50QXR0cmlidXRlcyBBc3NldD17bmV3RWRpdFNlZ21lbnQgYXMgT3BlblhEQS5MaW5lU2VnbWVudH0gTmV3RWRpdD17bmV3RWRpdH0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRTZWdtZW50fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXthZGROZXdTZWdtZW50fSAgaGlkZGVuPXtuZXdFZGl0ID09ICdFZGl0JyB8fCBuZXdFZGl0U2VnbWVudC5JRCAhPSAwfT5TYXZlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9e2FkZEV4aXN0aW5nU2VnbWVudH0gaGlkZGVuPXtuZXdFZGl0ID09ICdFZGl0JyB8fCBuZXdFZGl0U2VnbWVudC5JRCA9PSAwfT5TYXZlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4gc2V0TmV3RWRpdFNlZ21lbnQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lU2VnbWVudCcpKX0+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmVTZWdtZW50V2luZG93O1xyXG5cclxuZnVuY3Rpb24gVGFibGVSb3dJbnB1dChwcm9wczogeyBQYXJlbnRMaW5lSUQ6IG51bWJlciwgU2VnbWVudDogT3BlblhEQS5MaW5lU2VnbWVudCwgcmVtb3ZlOiAoaWQ6IG51bWJlcikgPT4gdm9pZCB9KSB7XHJcbiAgICBsZXQgWjEgPSBNYXRoLnNxcnQocHJvcHMuU2VnbWVudC5SMSAqIHByb3BzLlNlZ21lbnQuUjEgKyBwcm9wcy5TZWdtZW50LlgxICogcHJvcHMuU2VnbWVudC5YMSk7XHJcbiAgICBsZXQgWjAgPSBNYXRoLnNxcnQocHJvcHMuU2VnbWVudC5SMCAqIHByb3BzLlNlZ21lbnQuUjAgKyBwcm9wcy5TZWdtZW50LlgwICogcHJvcHMuU2VnbWVudC5YMCk7XHJcbiAgICBsZXQgYTAgPSBNYXRoLmFjb3MocHJvcHMuU2VnbWVudC5SMC8gWjApICogMTgwLjAgLyBNYXRoLlBJO1xyXG4gICAgbGV0IGExID0gTWF0aC5hY29zKHByb3BzLlNlZ21lbnQuUjEgLyBaMSkgKiAxODAuMCAvIE1hdGguUEk7XHJcbiAgICBsZXQgWHMgPSAoMiAqIHByb3BzLlNlZ21lbnQuWDEgKyBwcm9wcy5TZWdtZW50LlgwKSAvIDMuMDtcclxuICAgIGxldCBScyA9ICgyICogcHJvcHMuU2VnbWVudC5SMSArIHByb3BzLlNlZ21lbnQuUjApIC8gMy4wO1xyXG4gICAgbGV0IFpzID0gTWF0aC5zcXJ0KFJzKlJzICsgWHMqWHMpO1xyXG4gICAgbGV0IGFzID0gTWF0aC5hY29zKFJzIC8gWnMpICogMTgwLjAgLyBNYXRoLlBJO1xyXG5cclxuICAgIHJldHVybihcclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIDx0ZD57cHJvcHMuU2VnbWVudC5Bc3NldE5hbWV9ICh7cHJvcHMuU2VnbWVudC5Bc3NldEtleX0pPC90ZD5cclxuICAgICAgICAgICAgPHRkPntwcm9wcy5TZWdtZW50Lkxlbmd0aH08L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e1owLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICAgICAgPHRkPnthMC50b0ZpeGVkKDIpfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57cHJvcHMuU2VnbWVudC5SMC50b0ZpeGVkKDIpfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57cHJvcHMuU2VnbWVudC5YMC50b0ZpeGVkKDIpfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57WjEudG9GaXhlZCgyKX08L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e2ExLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICAgICAgPHRkPntwcm9wcy5TZWdtZW50LlIxLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICAgICAgPHRkPntwcm9wcy5TZWdtZW50LlgxLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICAgICAgPHRkPntacy50b0ZpeGVkKDIpfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57YXMudG9GaXhlZCgyKX08L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e1JzLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICAgICAgPHRkPntYcy50b0ZpeGVkKDIpfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57cHJvcHMuU2VnbWVudC5UaGVybWFsUmF0aW5nfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4gcHJvcHMucmVtb3ZlKHByb3BzLlNlZ21lbnQuSUQpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9