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
        return $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Asset/One/" + props.AssetID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
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
        if (props.AssetID == undefined)
            return function () { };
        var handle = getAsset();
        handle.done(function (data) {
            setAsset(data);
            getAssetType(data);
        });
        return function () {
            if (handle.abort != undefined)
                handle.abort();
        };
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
            AllAssets: []
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
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__["getAllAssets"])().done(function (aas) { return _this.setState({ AllAssets: aas }); });
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
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].AssetAttributeFields, { Asset: this.state.Asset, NewEdit: 'Edit', AssetTypes: this.state.AssetTypes, AllAssets: this.state.AllAssets, UpdateState: this.updateState, GetDifferentAsset: function () { }, HideAssetType: false, HideSelectAsset: true })),
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

/***/ "./TSX/SystemCenter/AssetAttribute/FawgLineSegmentWizard/LineSegmentWizard.tsx":
/*!*************************************************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/FawgLineSegmentWizard/LineSegmentWizard.tsx ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SectionSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SectionSelect */ "./TSX/SystemCenter/AssetAttribute/FawgLineSegmentWizard/SectionSelect.tsx");
/* harmony import */ var _SectionEdit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SectionEdit */ "./TSX/SystemCenter/AssetAttribute/FawgLineSegmentWizard/SectionEdit.tsx");
//******************************************************************************************************
//  LineSegmentWizard.tsx - Gbtc
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





function LineSegmentWizard(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), segments = _a[0], setSegments = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), segmentConnections = _b[0], setConnections = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), sections = _c[0], SetSections = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('SelectSection'), 2), step = _d[0], setStep = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](0), 2), currentSegment = _e[0], setCurrentSegment = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showWarning = _f[0], setShowWarning = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showConfirm = _g[0], setShowConfirm = _g[1];
    var _h = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showLoading = _h[0], setShowLoading = _h[1];
    var _j = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), errors = _j[0], setError = _j[1];
    var _k = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showError = _k[0], setShowError = _k[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getData();
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var e = [];
        if (sections.length == 0)
            e.push('At least one Section of the Line needs to be pulled from FAWG.');
        setError(e);
    }, [sections]);
    function getData() {
        $.ajax({
            type: "GET",
            url: homePath + "api/ExternalDB/FAWG/LineSegment/UpdateSegments/" + props.LineID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (data) {
            setSegments(data["segments"]);
            setConnections(data["connections"]);
        }).fail(function (msg) {
            setShowError(true);
            if (msg.status == 500)
                console.log(msg.responseJSON.ExceptionMessage);
        });
    }
    function next() {
        if (step == 'SelectSection') {
            setCurrentSegment(0);
            setStep('EditSection');
        }
        if (step == 'EditSection' && (currentSegment < (sections.length - 1)))
            setCurrentSegment(function (x) { return x + 1; });
        if (step == 'EditSection' && (currentSegment == (sections.length - 1)))
            setShowConfirm(true);
    }
    function back() {
        if (step == 'EditSection' && currentSegment == 0)
            setStep('SelectSection');
        if (step == 'EditSection' && currentSegment > 0)
            setCurrentSegment(function (x) { return x - 1; });
    }
    function submitUpdate() {
        setShowLoading(true);
        var finishedSegments = [];
        var finishedConnections = [];
        sections.forEach(function (sec, secIndex) {
            // start by adding the Segments
            if (sec.Segments.length == 1) {
                var segment = segments.find(function (item) { return item.AssetKey == sec.Segments[0]; });
                segment.LocationFromID = sec.startStationID;
                segment.LocationToID = sec.endStationID;
                segment.IsEnd = !sec.endTap || !sec.startTap;
                finishedSegments.push(segment);
            }
            else {
                var segment = segments.find(function (item) { return item.AssetKey == sec.Segments[0]; });
                segment.LocationFromID = sec.startStationID;
                segment.LocationToID = -1;
                segment.IsEnd = !sec.startTap;
                finishedSegments.push(segment);
                var _loop_1 = function (i) {
                    segment = segments.find(function (item) { return item.AssetKey == sec.Segments[i]; });
                    segment.LocationFromID = -1;
                    segment.LocationToID = -1;
                    segment.IsEnd = false;
                    finishedSegments.push(segment);
                    finishedConnections.push({ ChildKey: segment.AssetKey, ParentKey: finishedSegments[finishedSegments.length - 2].AssetKey, BusNumber: 0 });
                };
                for (var i = 1; i < (sec.Segments.length - 1); i++) {
                    _loop_1(i);
                }
                segment = segments.find(function (item) { return item.AssetKey == sec.Segments[sec.Segments.length - 1]; });
                segment.LocationFromID = -1;
                segment.LocationToID = sec.endStationID;
                segment.IsEnd = !sec.endTap;
                finishedSegments.push(segment);
                finishedConnections.push({ ChildKey: segment.AssetKey, ParentKey: finishedSegments[finishedSegments.length - 2].AssetKey, BusNumber: 0 });
            }
            //If this section goes to a Tap add all other connections....
            if (sec.startTap) {
                var connectedSections = sections.filter(function (item, i) { return (item.startBus == sec.startBus || item.endBus == sec.startBus) && secIndex != i; });
                var connectedSegments = connectedSections.map(function (item) { return item.startBus == sec.startBus ? item.Segments[0] : item.Segments[item.Segments.length - 1]; }).filter(function (item) { return finishedSegments.indexOf(function (s) { return s.Assetkey == item; }) > -1; });
                connectedSegments.forEach(function (cSeg) {
                    finishedConnections.push({ ChildKey: cSeg, ParentKey: sec.Segments[0], BusNumber: 0 });
                });
            }
            if (sec.endTap) {
                var connectedSections = sections.filter(function (item, i) { return (item.startBus == sec.endBus || item.endBus == sec.endBus) && secIndex != i; });
                var connectedSegments = connectedSections.map(function (item) { return item.startBus == sec.endBus ? item.Segments[0] : item.Segments[item.Segments.length - 1]; }).filter(function (item) { return finishedSegments.indexOf(function (s) { return s.Assetkey == item; }) > -1; });
                connectedSegments.forEach(function (cSeg) {
                    finishedConnections.push({ ChildKey: cSeg, ParentKey: sec.Segments[sec.Segments.length - 1], BusNumber: 0 });
                });
            }
        });
        $.ajax({
            type: "POST",
            url: homePath + "api/ExternalDB/FAWG/LineSegment/ConfirmSegments/" + props.LineID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ "data": { "segments": finishedSegments, "connections": finishedConnections } }),
            cache: false,
            async: true
        }).done(function () {
            setShowLoading(false);
            props.closeWizard();
        }).fail(function (msg) {
            setShowError(true);
            if (msg.status == 500)
                console.log(msg.responseJSON.ExceptionMessage);
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__["Modal"], { Title: 'FAWG Line Segment Update', ShowX: true, Show: true, Size: 'xlg', CancelText: 'Back', DisableCancel: step == 'SelectSection', ConfirmBtnClass: 'btn-success', ConfirmText: step == 'EditSection' && currentSegment == (segments.length - 1) ? 'Confirm' : 'Next', CallBack: function (conf, btn) {
                if (!btn)
                    setShowWarning(true);
                if (conf && btn)
                    next();
                if (!conf && btn)
                    back();
            }, DisableConfirm: errors.length > 0, ConfirmShowToolTip: errors.length > 0, ConfirmToolTipContent: errors.map(function (t, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { key: i },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                " ",
                t,
                " "); }) },
            step == 'SelectSection' ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_SectionSelect__WEBPACK_IMPORTED_MODULE_3__["default"], { Segments: segments, Connections: segmentConnections, Sections: sections, SetSections: SetSections, AddSection: function () { }, LineID: props.LineID }) : null,
            step == 'EditSection' ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_SectionEdit__WEBPACK_IMPORTED_MODULE_4__["default"], { Segments: segments, Section: sections[currentSegment], SetSection: function (s) { return SetSections(function (old) { var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](old); updated[currentSegment] = s; return updated; }); }, SetSegments: setSegments }) : null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__["Warning"], { Title: 'Cancel FAWG update', Message: 'This will cancel the update and keep the Segments currently in the openXDA', Show: showWarning, CallBack: function (conf) { setShowWarning(false); if (conf)
                props.closeWizard(); } }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__["Warning"], { Title: 'Confirm FAWG update', Message: 'This will override any current LineSegments and save the Configuration to openXDA.', Show: showConfirm, CallBack: function (conf) { setShowConfirm(false); if (conf) {
                submitUpdate();
            } } }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__["LoadingScreen"], { Show: showLoading }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__["Warning"], { Title: 'Error', Message: 'An error occurred while updating the Line Segment Configuration.', Show: showError, CallBack: function (conf) { setShowError(false); props.closeWizard(); } })));
}
/* harmony default export */ __webpack_exports__["default"] = (LineSegmentWizard);


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/FawgLineSegmentWizard/SectionEdit.tsx":
/*!*******************************************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/FawgLineSegmentWizard/SectionEdit.tsx ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @gpa-gemstone/gpa-symbols */ "../../node_modules/@gpa-gemstone/gpa-symbols/lib/index.js");
/* harmony import */ var _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__);
//******************************************************************************************************
//  SectionEdit.tsx - Gbtc
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
//  04/15/2021 - Christoph Lackner
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




function SectionEdit(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), data = _a[0], setData = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        CreateTableData();
    }, [props.Segments, props.Section]);
    function CreateTableData() {
        if (props.Segments.length == 0)
            return;
        var data = [];
        props.Section.Segments.forEach(function (item) {
            var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](props.Segments.find(function (seg) { return seg.AssetKey == item; }));
            var lastBus = props.Section.startBus;
            if (data.length > 0)
                lastBus = data[data.length - 1].ToBus;
            if (lastBus != updated.FromBus)
                updated.ToBus = updated.FromBus;
            updated.FromBus = lastBus;
            data.push(updated);
        });
        setData(data);
    }
    function RemoveSegment(assetKey) {
        var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](props.Section);
        var index = updated.Segments.findIndex(function (a) { return a == assetKey; });
        if (index == -1)
            return;
        updated.Segments.splice(index, 1);
        props.SetSection(updated);
    }
    function updateSegment(segment) {
        var index = props.Segments.findIndex(function (seg) { return seg.AssetKey == segment.AssetKey; });
        if (index == -1)
            return;
        var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](props.Segments);
        updated[index].R0 = segment.R0;
        updated[index].R1 = segment.R1;
        updated[index].X0 = segment.X0;
        updated[index].X1 = segment.X1;
        updated[index].Length = segment.Length;
        updated[index].ThermalRating = segment.ThermalRating;
        props.SetSegments(updated);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "alert alert-primary", role: "alert" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "alert-heading" },
                        "Line Section ",
                        props.Section.startTap ? 'Tap' : props.Section.NameFrom,
                        " (Bus ",
                        props.Section.startBus,
                        ") to ",
                        props.Section.endTap ? 'Tap' : props.Section.NameTo,
                        " (Bus ",
                        props.Section.endBus,
                        ")")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: 'table' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "Segment"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "Length"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { colSpan: 2, style: { width: 'auto' } }, "FAWG Bus"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { colSpan: 4, style: { width: 'auto' } }, "Zero Seq (Ohm/deg)"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { colSpan: 4, style: { width: 'auto' } }, "Positive Seq (Ohm/deg)"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { colSpan: 4, style: { width: 'auto' } }, "Loop (LG) (Ohm/deg)"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "Thermal Rating"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "From"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "To"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "Z0"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "<"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "R0"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "X0"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "Z1"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "<"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "R1"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "X1"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "Zs"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "<"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "Rs"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }, "Xs"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 'auto' } }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 40 } }))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, data.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](TableRowInput, { key: i, Segment: a, remove: RemoveSegment, index: i, edit: updateSegment }); })))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }))));
}
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
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } },
            "Segment ",
            props.index + 1),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Label: 'Length (miles)', Record: props.Segment, Field: 'Length', Type: 'number', Setter: props.edit, Valid: function () { return true; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, props.Segment.FromBus),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, props.Segment.ToBus),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, Z0.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, a0.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Label: 'R0 (pu)', Record: props.Segment, Field: 'R0', Type: 'number', Setter: props.edit, Valid: function () { return true; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Label: 'X0 (pu)', Record: props.Segment, Field: 'X0', Type: 'number', Setter: props.edit, Valid: function () { return true; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, Z1.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, a1.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Label: 'R1 (pu)', Record: props.Segment, Field: 'R1', Type: 'number', Setter: props.edit, Valid: function () { return true; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Label: 'X1 (pu)', Record: props.Segment, Field: 'X1', Type: 'number', Setter: props.edit, Valid: function () { return true; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, Zs.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, as.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, Rs.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { verticalAlign: 'middle' } }, Xs.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Label: 'Thermal Rating', Record: props.Segment, Field: 'ThermalRating', Type: 'number', Setter: props.edit, Valid: function () { return true; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: 40 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return props.remove(props.Segment.AssetKey); } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_2__["TrashCan"])))));
}
/* harmony default export */ __webpack_exports__["default"] = (SectionEdit);


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/FawgLineSegmentWizard/SectionSelect.tsx":
/*!*********************************************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/FawgLineSegmentWizard/SectionSelect.tsx ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @gpa-gemstone/react-table */ "../../node_modules/@gpa-gemstone/react-table/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @gpa-gemstone/gpa-symbols */ "../../node_modules/@gpa-gemstone/gpa-symbols/lib/index.js");
/* harmony import */ var _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_4__);
//******************************************************************************************************
//  SectionSelect.tsx - Gbtc
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
//  04/13/2021 - Christoph Lackner
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





;
;
function SectionSelect(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), locations = _a[0], setLocations = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        ProcessSegments();
    }, [props.Segments, props.Connections]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getLocations();
        return function () { if (handle != null && handle.abort != null)
            handle.abort(); };
    }, [props.LineID]);
    function getLocations() {
        return $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Asset/" + props.LineID + "/Locations",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (data) { return setLocations(data); });
    }
    function ProcessSegments() {
        if (props.Segments.length == 0)
            return;
        if (props.Segments.length > 1 && props.Connections.length == 0)
            return;
        var Taps = [];
        // Find all real Taps...
        Taps = lodash__WEBPACK_IMPORTED_MODULE_1__["uniq"](props.Connections.map(function (c) { return c.BusNumber; }).filter(function (b) { return props.Connections.filter(function (con) { return con.BusNumber == b; }).length > 1; })).map(function (b, index) { return ({ Bus: b, IsEnd: false }); });
        // Find all "Taps" at the end of the Line
        Taps = Taps.concat(props.Segments.filter(function (s) { return s.IsEnd; }).map(function (s) { return props.Connections.filter(function (con) { return con.BusNumber == s.FromBus; }).length > 0 ? s.ToBus : s.FromBus; }).map(function (b, index) { return ({ Bus: b, IsEnd: true }); }));
        // update Taps with locationID as available (-1) otherwise and add connected Segments
        Taps.forEach(function (item, index) {
            item.ConnectedSegments = [];
            item.ProcessedSegments = [];
            item.LocationID = -1;
            item.ConnectedSegments = props.Segments.filter(function (seg) { return seg.FromBus == item.Bus || seg.ToBus == item.Bus; }).map(function (seg) { return seg.AssetKey; });
            if (item.ConnectedSegments.length == 1) {
                var segment = props.Segments.find(function (seg) { return seg.FromBus == item.Bus; });
                if (segment != null)
                    item.LocationID = segment.LocationFromID;
                else
                    item.LocationID = props.Segments.find(function (seg) { return seg.ToBus == item.Bus; }).LocationToID;
            }
        });
        // Process Segments and taps into Sections
        var currentTap = Taps.find(function (t) { return t.ConnectedSegments.length > t.ProcessedSegments.length; });
        var CompletedSections = [];
        var _loop_1 = function () {
            var currentSection = { startBus: currentTap.Bus, startStationID: currentTap.LocationID, Segments: [], endBus: -1, endStationID: -1, startTap: !currentTap.IsEnd, endTap: true, NameFrom: '', NameTo: '' };
            var currentSegment = currentTap.ConnectedSegments.find(function (s) { return currentTap.ProcessedSegments.findIndex(function (ps) { return ps == s; }) == -1; });
            var nextBus = props.Segments.find(function (s) { return s.AssetKey == currentSegment; }).FromBus;
            if (nextBus == currentTap.Bus)
                nextBus = props.Segments.find(function (s) { return s.AssetKey == currentSegment; }).ToBus;
            currentSection.Segments.push(currentSegment);
            currentTap.ProcessedSegments.push(currentSegment);
            while (true) {
                if (Taps.findIndex(function (t) { return t.Bus == nextBus; }) > -1)
                    break;
                var nextConnection = props.Connections.find(function (item) { return (item.ChildKey == currentSegment || item.ParentKey == currentSegment) && item.BusNumber == nextBus; });
                currentSegment = (nextConnection.ChildKey == currentSegment) ? nextConnection.ParentKey : nextConnection.ChildKey;
                nextBus = props.Segments.find(function (s) { return s.AssetKey == currentSegment; }).ToBus;
                if (nextBus == nextConnection.BusNumber)
                    nextBus = props.Segments.find(function (s) { return s.AssetKey == currentSegment; }).FromBus;
                currentSection.Segments.push(currentSegment);
            }
            currentSection.endBus = nextBus;
            currentSection.endStationID = Taps.find(function (t) { return t.Bus == nextBus; }).LocationID;
            currentSection.endTap = !Taps.find(function (t) { return t.Bus == nextBus; }).IsEnd;
            CompletedSections.push(currentSection);
            Taps.find(function (t) { return t.Bus == nextBus; }).ProcessedSegments.push(currentSegment);
            currentTap = Taps.find(function (t) { return t.ConnectedSegments.length > t.ProcessedSegments.length; });
        };
        while (currentTap != null) {
            _loop_1();
        }
        props.SetSections(CompletedSections);
    }
    function RemoveSection(firstSegment) {
        var index = props.Sections.findIndex(function (sec) { return sec.Segments[0] == firstSegment; });
        if (index == -1)
            return;
        var bus1 = props.Sections[index].startBus;
        var bus2 = props.Sections[index].endBus;
        var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](props.Sections);
        updated.splice(index, 1);
        //re-calculate affected Sections to make them endpoints as necessary
        updated.forEach(function (section) {
            if (section.endBus == bus1 || section.endBus == bus2)
                section.endTap = updated.filter(function (s) { return s.endBus == section.endBus || s.startBus == section.endBus; }).length > 1;
            if (section.startBus == bus1 || section.startBus == bus2)
                section.startTap = updated.filter(function (s) { return s.endBus == section.startBus || s.startBus == section.startBus; }).length > 1;
        });
        props.SetSections(updated);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "alert alert-info", role: "alert" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "alert-heading" }, "Selecting Line Sections"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "Note that only Substations associated with this Line are available for endpoints."),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "If an Endpoint is left blank the system can only perform single ended Fault Location algorithms towards that end of the Line."),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "Removing a Section will remove all line segments that were found in FAWG for that Section.")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_2___default.a, { cols: [
                            {
                                key: 'startBus', label: 'Start', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' },
                                content: function (item) { return item.startTap ? 'Tap (Bus ' + item.startBus + ')' : react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_4__["Select"], { Label: "Substation (Bus " + item.startBus + " )", Field: 'startStationID', Record: item, EmptyLabel: 'N/A', Setter: function (r) {
                                        var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](props.Sections);
                                        var index = props.Sections.findIndex(function (sec) { return sec.Segments[0] == item.Segments[0]; });
                                        if (r.startStationID == null) {
                                            updated[index].startStationID = -1;
                                            updated[index].NameFrom = '';
                                        }
                                        else {
                                            updated[index].startStationID = parseInt(r.startStationID);
                                            updated[index].NameFrom = locations.find(function (l) { return l.ID == updated[index].startStationID; }).LocationKey;
                                        }
                                        props.SetSections(updated);
                                    }, Options: locations.map(function (l) { return ({ Value: l.ID.toString(), Label: l.LocationKey }); }), EmptyOption: true }); }
                            },
                            {
                                key: 'endBus', label: 'End', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: function (item) { return item.endTap ? 'Tap (Bus ' + item.endBus + ')' : react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_4__["Select"], { Label: "Substation (Bus " + item.endBus + " )", Field: 'endStationID', Record: item, EmptyLabel: 'N / A', Setter: function (r) {
                                        var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](props.Sections);
                                        var index = props.Sections.findIndex(function (sec) { return sec.Segments[0] == item.Segments[0]; });
                                        if (r.endStationID == null) {
                                            updated[index].endStationID = -1;
                                            updated[index].NameTo = '';
                                        }
                                        else {
                                            updated[index].endStationID = parseInt(r.endStationID);
                                            updated[index].NameTo = locations.find(function (l) { return l.ID == updated[index].endStationID; }).LocationKey;
                                        }
                                        props.SetSections(updated);
                                    }, Options: locations.map(function (l) { return ({ Value: l.ID.toString(), Label: l.LocationKey }); }), EmptyOption: true }); }
                            },
                            { key: 'Segments', label: '# of Segments', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: function (item) { return item.Segments.length; } },
                            { key: 'endStationID', label: 'Length (miles)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' }, content: function (item) { return item.Segments.map(function (v) { return props.Segments.find(function (seg) { return seg.AssetKey == v; }).Length; }).reduce(function (a, v) { return a = a + v; }); } },
                            {
                                key: null, label: '', headerStyle: { width: 40, paddingLeft: 0, paddingRight: 5 }, rowStyle: { width: 40, paddingLeft: 0, paddingRight: 5 },
                                content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                            RemoveSection(item.Segments[0]);
                                        } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_3__["TrashCan"]))); }
                            }
                        ], tableClass: "table table-hover", data: props.Sections, sortField: 'startBus', ascending: true, onSort: function (d) { }, onClick: function () { }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }))));
}
/* harmony default export */ __webpack_exports__["default"] = (SectionSelect);


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
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @gpa-gemstone/react-table */ "../../node_modules/@gpa-gemstone/react-table/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @gpa-gemstone/gpa-symbols */ "../../node_modules/@gpa-gemstone/gpa-symbols/lib/index.js");
/* harmony import */ var _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _FawgLineSegmentWizard_LineSegmentWizard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FawgLineSegmentWizard/LineSegmentWizard */ "./TSX/SystemCenter/AssetAttribute/FawgLineSegmentWizard/LineSegmentWizard.tsx");
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
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showAdd = _b[0], setShowAdd = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showFawg = _c[0], setShowFawg = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showWarning = _d[0], setshowWarning = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showLoading = _e[0], setShowLoading = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].getNewAsset('LineSegment')), 2), newEditSegment = _f[0], setNewEditSegment = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('New'), 2), newEdit = _g[0], setNewEdit = _g[1];
    var _h = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), assetTypes = _h[0], setAssetTypes = _h[1];
    var _j = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), allAssets = _j[0], setAllAssets = _j[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getData();
    }, [props.ID]);
    function getData() {
        getSegments();
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
            url: homePath + "api/OpenXDA/Line/" + props.ID + "/LineSegments?_=" + moment(),
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
            setNewEditSegment(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].getNewAsset('LineSegment'));
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
            setNewEditSegment(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].getNewAsset('LineSegment'));
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
        });
    }
    function deleteSegment() {
        if (newEditSegment.ID == 0)
            return;
        setShowLoading(true);
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/LineSegment/" + newEditSegment.ID + "/Disconnect/" + props.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (e) {
            setShowLoading(false);
            getData();
        });
    }
    function UpdateSegment() {
        $.ajax({
            type: "Patch",
            url: homePath + "api/OpenXDA/LineSegment/Update",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newEditSegment),
            cache: false,
            async: true
        }).done(function (data) { return getData(); });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Line Segments:")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_5___default.a, { cols: [
                            { key: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'Length', label: 'Length (miles)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'R1', label: 'R1', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'X1', label: 'X1', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'R0', label: 'R0', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            { key: 'X0', label: 'X0', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                            {
                                key: null, label: '', headerStyle: { width: 80, paddingLeft: 0, paddingRight: 5 }, rowStyle: { width: 80, paddingLeft: 0, paddingRight: 5 },
                                content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                                    " ",
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                            setShowAdd(true);
                                            setNewEditSegment(item);
                                            setNewEdit('Edit');
                                        } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_6__["Pencil"])),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                            setNewEditSegment(item);
                                            setshowWarning(true);
                                        } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_6__["TrashCan"]))); }
                            }
                        ], tableClass: "table table-hover", data: segments, sortField: 'AssetName', ascending: true, onSort: function (d) { }, onClick: function () { }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () { return setShowAdd(true); } }, "Add Segement")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function (evt) { return setShowFawg(true); } }, "Update from FAWG")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__["Warning"], { Show: showWarning, Title: 'Remove this Segment From the Line', Message: 'This will permanently remove the Segment.', CallBack: function (confirm) { if (confirm)
                deleteSegment(); setshowWarning(false); } }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__["LoadingScreen"], { Show: showLoading }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__["Modal"], { Show: showAdd, Title: newEdit == 'New' ? 'Add New LineSegment to Line' : 'Edit ' + newEditSegment.AssetKey + ' for Meter', Size: 'lg', ShowX: true, CallBack: function (confirm) {
                if (confirm && newEdit == 'Edit')
                    UpdateSegment();
                if (confirm && newEdit == 'New' && newEditSegment.ID == 0)
                    addNewSegment();
                if (confirm && newEdit == 'New' && newEditSegment.ID != 0)
                    addExistingSegment();
                setNewEditSegment(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].getNewAsset('LineSegment'));
                setShowAdd(false);
            }, CancelText: 'Close', ConfirmText: 'Save', DisableConfirm: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].AssetError(newEditSegment, 'LineSegment').length > 0, ConfirmShowToolTip: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].AssetError(newEditSegment, 'LineSegment').length > 0, ConfirmToolTipContent: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].AssetError(newEditSegment, 'LineSegment').map(function (i, t) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { key: i },
                " ",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                " ",
                t); }) },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].AssetAttributeFields, { Asset: newEditSegment, NewEdit: newEdit, AssetTypes: assetTypes, AllAssets: allAssets, UpdateState: setNewEditSegment, GetDifferentAsset: function (assetID) {
                            if (newEdit == 'Edit')
                                return;
                            var asset = allAssets.find(function (a) { return a.ID == assetID; });
                            var assetType = assetTypes.find(function (at) { return at.ID == asset['AssetTypeID']; });
                            Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_2__["getAssetWithAdditionalFields"])(assetID, assetType.Name).then(function (asset) { return setNewEditSegment(asset); });
                        }, HideAssetType: true, HideSelectAsset: false })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LineSegment__WEBPACK_IMPORTED_MODULE_3__["default"], { Asset: newEditSegment, NewEdit: newEdit, UpdateState: setNewEditSegment })))),
        showFawg ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_FawgLineSegmentWizard_LineSegmentWizard__WEBPACK_IMPORTED_MODULE_7__["default"], { LineID: props.ID, closeWizard: function () { return setShowFawg(false); } }) : null));
}
/* harmony default export */ __webpack_exports__["default"] = (LineSegmentWindow);


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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0L0Fzc2V0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0L0Fzc2V0Q29ubmVjdGlvbi50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldC9Bc3NldEluZm8udHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXQvQXNzZXRMb2NhdGlvbi50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldC9Bc3NldE1ldGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0xpbmVTZWdtZW50V2luZG93LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RyxvQkFBb0I7QUFDcEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFHVztBQUNRO0FBQ047QUFDd0I7QUFFdEI7QUFDVTtBQUNGO0FBQzBCO0FBQ3JCO0FBQ1M7QUFJcEUsU0FBUyxLQUFLLENBQUMsS0FBMEI7SUFDckMsSUFBSSxPQUFPLEdBQUcsbUVBQVUsRUFBRSxDQUFDO0lBQ3JCLHdFQUF1RCxFQUF0RCxhQUFLLEVBQUUs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LEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUYsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRSxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUMzRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzVELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3pELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3pELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFFOUMsT0FBTSxDQUNGO1FBQ0k7WUFBSyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVM7O1lBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRO2dCQUFPO1FBQzdELGdFQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFNO1FBQy9CLGdFQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDeEIsZ0VBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBTTtRQUN4QixnRUFBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDdEMsZ0VBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFNO1FBQ3RDLGdFQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDeEIsZ0VBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBTTtRQUN4QixnRUFBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDdEMsZ0VBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFNO1FBQ3RDLGdFQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDeEIsZ0VBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBTTtRQUN4QixnRUFBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFNO1FBQ3hCLGdFQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDeEIsZ0VBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQU07UUFDdEM7WUFBSSxnRUFBUSxTQUFTLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsSUFBSyxZQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQTlCLENBQThCO2dCQUFFO29CQUFNLDJEQUFHLFNBQVMsRUFBQyxhQUFhLEdBQUssQ0FBTyxDQUFTLENBQUssQ0FDNUksQ0FDUixDQUFDO0FBQ04sQ0FBQyIsImZpbGUiOiJBc3NldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQXNzZXQudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDEvMjIvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IEFzc2V0SW5mb1dpbmRvdyBmcm9tICcuL0Fzc2V0SW5mbyc7XG5pbXBvcnQgQXNzZXRMb2NhdGlvbldpbmRvdyBmcm9tICcuL0Fzc2V0TG9jYXRpb24nO1xuaW1wb3J0IEFzc2V0TWV0ZXJXaW5kb3cgZnJvbSAnLi9Bc3NldE1ldGVyJztcbmltcG9ydCBFeHRlcm5hbERCVXBkYXRlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZSc7XG5cbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBOb3RlV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvTm90ZVdpbmRvdyc7XG5pbXBvcnQgQXNzZXRDb25uZWN0aW9uV2luZG93IGZyb20gJy4vQXNzZXRDb25uZWN0aW9uJztcbmltcG9ydCBBZGRpdGlvbmFsRmllbGRzV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvQWRkaXRpb25hbEZpZWxkc1dpbmRvdyc7XG5pbXBvcnQgeyBnZXRBc3NldFR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vVFMvU2VydmljZXMvQXNzZXQnO1xuaW1wb3J0IExpbmVTZWdtZW50V2luZG93IGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0xpbmVTZWdtZW50V2luZG93JztcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5kZWNsYXJlIHR5cGUgVGFiID0gJ25vdGVzJyB8ICdhc3NldEluZm8nIHwgJ3N1YnN0YXRpb25zJyB8ICdtZXRlcnMnIHwgJ2Nvbm5lY3Rpb25zJyB8ICdhZGRpdGlvbmFsRmllbGRzJyB8ICdleHREQicgfCAnU2VnbWVudHMnXG5cbmZ1bmN0aW9uIEFzc2V0KHByb3BzOiB7IEFzc2V0SUQ6IG51bWJlciB9KSB7XG4gICAgbGV0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XG4gICAgY29uc3QgW2Fzc2V0LCBzZXRBc3NldF0gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLkFzc2V0PihudWxsKTtcbiAgICBjb25zdCBbdGFiLCBzZXRUYWJTdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KGdldFRhYigpKTtcbiAgICBjb25zdCBbYXNzZXRUeXBlLCBzZXRBc3NldFR5cGVdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldFR5cGVOYW1lPihudWxsKTtcblxuICAgIGZ1bmN0aW9uIGdldFRhYigpOiBUYWIge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ0Fzc2V0LlRhYicpKVxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnQXNzZXQuVGFiJykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gJ25vdGVzJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUYWIodGFiOiBUYWIpOiB2b2lkIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnQXNzZXQuVGFiJywgSlNPTi5zdHJpbmdpZnkodGFiKSk7XG4gICAgICAgIHNldFRhYlN0YXRlKHRhYik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QXNzZXQoKSB7XG4gICAgICAgIHJldHVybiAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvT25lLyR7cHJvcHMuQXNzZXRJRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgfSlcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFzc2V0VHlwZShhc3NldDogT3BlblhEQS5Bc3NldCk6IHZvaWQge1xuICAgICAgICBnZXRBc3NldFR5cGVzKCkuZG9uZSgoYXNzZXRUeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+KSA9PiB7XG4gICAgICAgICAgICBsZXQgYXNzZXRUeXBlID0gYXNzZXRUeXBlcy5maW5kKGF0ID0+IGF0LklEID09IGFzc2V0WydBc3NldFR5cGVJRCddKVxuICAgICAgICAgICAgc2V0QXNzZXRUeXBlKGFzc2V0VHlwZS5OYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlQXNzZXQoKTogSlF1ZXJ5LmpxWEhSIHtcblxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBjb25maXJtKFwiVGhpcyB3aWxsIGRlbGV0ZSB0aGUgQXNzZXQgUGVybWFuZW50bHlcIik7XG4gICAgICAgIGlmICghcmVzcG9uc2UpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC9EZWxldGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYXNzZXQpLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgobXNnKSA9PiB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJz9uYW1lPUFzc2V0cycsIHN0YXRlOiB7fSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLkFzc2V0SUQgPT0gdW5kZWZpbmVkKSByZXR1cm4gKCkgPT4geyB9O1xuICAgICAgICBsZXQgaGFuZGxlID0gZ2V0QXNzZXQoKTtcblxuICAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogT3BlblhEQS5Bc3NldCkgPT4ge1xuICAgICAgICAgICAgc2V0QXNzZXQoZGF0YSlcbiAgICAgICAgICAgIGdldEFzc2V0VHlwZShkYXRhKVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPSB1bmRlZmluZWQpIGhhbmRsZS5hYm9ydCgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICB9LCBbcHJvcHMuQXNzZXRJRF0pO1xuXG4gICAgaWYgKGFzc2V0ID09IG51bGwpIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2MywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2Mywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nOiAxNSB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPnthc3NldCAhPSBudWxsID8gYXNzZXQuQXNzZXRLZXkgOiAnJ308L2gyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgcHVsbC1yaWdodFwiIGhpZGRlbj17YXNzZXQgPT0gbnVsbH0gb25DbGljaz17KCkgPT4gZGVsZXRlQXNzZXQoKX0+RGVsZXRlIEFzc2V0IChQZXJtYW5lbnQpPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIj5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwibm90ZXNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignbm90ZXMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI25vdGVzXCI+Tm90ZXM8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiYXNzZXRJbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2Fzc2V0SW5mbycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjYXNzZXRJbmZvXCI+QXNzZXQgSW5mbzwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJhZGRpdGlvbmFsRmllbGRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2FkZGl0aW9uYWxGaWVsZHMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2FkZGl0aW9uYWxGaWVsZHNcIj5BZGRpdGlvbmFsIEZpZWxkczwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJzdWJzdGF0aW9uc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdzdWJzdGF0aW9ucycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjc3Vic3RhdGlvbnNcIj5TdWJzdGF0aW9uczwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJtZXRlcnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignbWV0ZXJzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNtZXRlcnNcIj5NZXRlcnM8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiY29ubmVjdGlvbnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignY29ubmVjdGlvbnMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2Nvbm5lY3Rpb25zXCI+Q29ubmVjdGlvbnM8L2E+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICB7KGFzc2V0VHlwZSA9PSAnTGluZScpP1xuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcIlNlZ21lbnRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ1NlZ21lbnRzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNTZWdtZW50c1wiPkxpbmUgU2VnbWVudHM8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+IDogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7KGFzc2V0VHlwZSA9PSAnQnJlYWtlcicgfHwgYXNzZXRUeXBlID09ICdDYXBhY2l0b3JCYW5rJyB8fCBhc3NldFR5cGUgPT0gJ0xpbmUnIHx8IGFzc2V0VHlwZSA9PSAnVHJhbnNmb3JtZXInIHx8IGFzc2V0VHlwZSA9PSAnQnVzJykgP1xuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcImV4dERCXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2V4dERCJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNleHREQlwiPkV4dGVybmFsIERCPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPiA6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiIHN0eWxlPXt7bWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMzUsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJub3Rlc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwibm90ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPE5vdGVXaW5kb3cgSUQ9e2Fzc2V0LklEfSBUeXBlPSdBc3NldCcgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJhc3NldEluZm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImFzc2V0SW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICA8QXNzZXRJbmZvV2luZG93IEFzc2V0PXthc3NldH0gU3RhdGVTZXR0ZXI9e3NldEFzc2V0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImFkZGl0aW9uYWxGaWVsZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cgSUQ9e2Fzc2V0LklEfSBUeXBlPXsoYXNzZXRUeXBlID09IG51bGwpID8gXCJBc3NldFwiIDogYXNzZXRUeXBlfSBUYWI9e3RhYn0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcInN1YnN0YXRpb25zXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJzdWJzdGF0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8QXNzZXRMb2NhdGlvbldpbmRvdyBBc3NldD17YXNzZXR9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwibWV0ZXJzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJtZXRlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEFzc2V0TWV0ZXJXaW5kb3cgQXNzZXQ9e2Fzc2V0fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImNvbm5lY3Rpb25zXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJjb25uZWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8QXNzZXRDb25uZWN0aW9uV2luZG93IEFzc2V0PXthc3NldH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJleHREQlwiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiZXh0REJcIj5cbiAgICAgICAgICAgICAgICAgICAgPEV4dGVybmFsREJVcGRhdGUgSUQ9e2Fzc2V0LklEfSBUeXBlPXsoYXNzZXRUeXBlID09IG51bGwpID8gXCJBc3NldFwiIDogYXNzZXRUeXBlfSBUYWI9e3RhYn0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJTZWdtZW50c1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiU2VnbWVudHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPExpbmVTZWdtZW50V2luZG93IElEPXthc3NldC5JRH0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzc2V0O1xuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBMb2NhdGlvbk1ldGVyLnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzIxLzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1RhYmxlJztcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5pbnRlcmZhY2UgQXNzZXRDb25uZWN0aW9uIHtcbiAgICBBc3NldFJlbGF0aW9uU2hpcFR5cGVJRDogbnVtYmVyLFxuICAgIE5hbWU6IHN0cmluZyxcbiAgICBBc3NldElEOiBudW1iZXIsXG4gICAgQXNzZXRLZXk6IHN0cmluZ1xufVxuZnVuY3Rpb24gQXNzZXRDb25uZWN0aW9uV2luZG93KHByb3BzOiB7IEFzc2V0OiBPcGVuWERBLkFzc2V0IH0pOiBKU1guRWxlbWVudHtcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcbiAgICBjb25zdCBbYXNzZXRDb25uZWN0aW9ucywgc2V0QXNzZXRDb25uZWN0aW9uc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxBc3NldENvbm5lY3Rpb24+PihbXSk7XG4gICAgY29uc3QgW2Fzc2V0Q29ubmVjdGlvblR5cGVzLCBzZXRBc3NldENvbm5lY3Rpb25UeXBlc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvblR5cGU+PihbXSk7XG4gICAgY29uc3QgW25ld0Fzc2V0Q29ubmVjdGlvbiwgc2V0TmV3QXNzZXRDb25uZWN0aW9uXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPih7SUQ6IDAsIEFzc2V0UmVsYXRpb25zaGlwVHlwZUlEOiAwLCBQYXJlbnQ6ICcnLCBDaGlsZDogJyd9KTtcbiAgICBjb25zdCBbbG9jYWxBc3NldHMsIHNldExvY2FsQXNzZXRzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXQ+PihbXSk7XG5cbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8a2V5b2YgKEFzc2V0Q29ubmVjdGlvbik+KCdBc3NldEtleScpO1xuICAgIGNvbnN0IFthc2NlbmRpbmcsIHNldEFzY2VuZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGdldERhdGEoKTtcbiAgICB9LCBbcHJvcHMuQXNzZXRdKTtcblxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIGdldEFzc2V0Q29ubmVjdGlvblR5cGVzKCk7XG4gICAgICAgIGdldEFzc2V0Q29ubmVjdGlvbnMoKTtcbiAgICAgICAgZ2V0TG9jYWxBc3NldHMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBc3NldENvbm5lY3Rpb25zKCk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvJHtwcm9wcy5Bc3NldC5JRH0vQXNzZXRDb25uZWN0aW9uc2AsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKGFjcyA9PiBzZXRBc3NldENvbm5lY3Rpb25zKGFjcykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldExvY2FsQXNzZXRzKCk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvJHtwcm9wcy5Bc3NldC5JRH0vQXNzZXROZWFyYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUobGFzID0+IHNldExvY2FsQXNzZXRzKGxhcykpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2V0QXNzZXRDb25uZWN0aW9uVHlwZXMoKTogdm9pZCB7XG4gICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdPcGVuWERBLkFzc2V0Q29ubmVjdGlvblR5cGVzJykpXG4gICAgICAgICAgICBzZXRBc3NldENvbm5lY3Rpb25UeXBlcyhKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ09wZW5YREEuQXNzZXRDb25uZWN0aW9uVHlwZXMnKSkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRDb25uZWN0aW9uVHlwZWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKChhY3RzOiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvblR5cGU+KSA9PiB7XG4gICAgICAgICAgICBzZXRBc3NldENvbm5lY3Rpb25UeXBlcyhhY3RzKTtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ09wZW5YREEuQXNzZXRDb25uZWN0aW9uVHlwZXMnLCBKU09OLnN0cmluZ2lmeShhY3RzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUFzc2V0Q29ubmVjdGlvbihjb25uZWN0aW9uOiBBc3NldENvbm5lY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC8ke3Byb3BzLkFzc2V0LklEfS9Bc3NldC8ke2Nvbm5lY3Rpb24uQXNzZXRJRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xuICAgICAgICAgICAgZ2V0RGF0YSgpO1xuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZENvbm5lY3Rpb24oKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRDb25uZWN0aW9uL0FkZGAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe0lEOiAwLCBBc3NldFJlbGF0aW9uc2hpcFR5cGVJRDogbmV3QXNzZXRDb25uZWN0aW9uLkFzc2V0UmVsYXRpb25zaGlwVHlwZUlELCBQYXJlbnRJRDogcHJvcHMuQXNzZXQuSUQsIENoaWxkSUQ6IHBhcnNlSW50KG5ld0Fzc2V0Q29ubmVjdGlvbi5DaGlsZCl9KSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGdldERhdGEoKTtcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdChpdGVtKSB7XG4gICAgICAgIGhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiBob21lUGF0aCArICdpbmRleC5jc2h0bWwnLCBzZWFyY2g6ICc/bmFtZT1Bc3NldCZBc3NldElEPScgKyBpdGVtLnJvdy5Bc3NldElELCBzdGF0ZToge30gfSlcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+TWV0ZXJzOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzODEsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlPEFzc2V0Q29ubmVjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0S2V5JywgbGFiZWw6ICdBc3NldCcsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnNDclJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzQ3JScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScsIGxhYmVsOiAnUmVsYXRpb25zaGlwJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICc0NyUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnNDclJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICc2JScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICc2JScgfSwgY29udGVudDogKGFzc2V0LCBrZXksIHN0eWxlKSA9PiA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQXNzZXRDb25uZWN0aW9uKGFzc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ2xhc3M9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXthc3NldENvbm5lY3Rpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydEZpZWxkPXtzb3J0RmllbGR9XG4gICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5jb2wgPT0gc29ydEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KGFzc2V0Q29ubmVjdGlvbnMsIFtkLmNvbF0sIFsoIWFzY2VuZGluZyA/IFwiYXNjXCIgOiBcImRlc2NcIildKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc3NldENvbm5lY3Rpb25zKG9yZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyZWQgPSBfLm9yZGVyQnkoYXNzZXRDb25uZWN0aW9ucywgW2QuY29sXSwgW1wiYXNjXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc3NldENvbm5lY3Rpb25zKG9yZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTb3J0RmllbGQoZC5jb2wpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KCkgPT4gZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNjb25uZWN0aW9uTW9kYWwnPkFkZCBDb25uZWN0aW9uPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgaWQ9XCJjb25uZWN0aW9uTW9kYWxcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+QWRkIEFzc2V0IHRvIEFzc2V0IENvbm5lY3Rpb248L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+QXNzZXQ6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17bmV3QXNzZXRDb25uZWN0aW9uICE9IG51bGwgPyBuZXdBc3NldENvbm5lY3Rpb24uQ2hpbGQgOiAnMCd9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgciA9IF8uY2xvbmUobmV3QXNzZXRDb25uZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuQ2hpbGQgPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TmV3QXNzZXRDb25uZWN0aW9uKHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsb2NhbEFzc2V0cy5tYXAoYWxzID0+IDxvcHRpb24gdmFsdWU9e2Fscy5JRH0ga2V5PXthbHMuSUR9PnthbHMuQXNzZXRLZXl9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFzc2V0IENvbm5lY3Rpb24gVHlwZTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXtuZXdBc3NldENvbm5lY3Rpb24gIT0gbnVsbCA/IG5ld0Fzc2V0Q29ubmVjdGlvbi5Bc3NldFJlbGF0aW9uc2hpcFR5cGVJRCA6ICcwJ30gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByID0gXy5jbG9uZShuZXdBc3NldENvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5Bc3NldFJlbGF0aW9uc2hpcFR5cGVJRCA9IGFzc2V0Q29ubmVjdGlvblR5cGVzLmZpbmQobCA9PiBsLklELnRvU3RyaW5nKCkgPT0gZXZ0LnRhcmdldC52YWx1ZSkuSURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0Fzc2V0Q29ubmVjdGlvbihyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YXNzZXRDb25uZWN0aW9uVHlwZXMubWFwKGFscyA9PiA8b3B0aW9uIHZhbHVlPXthbHMuSUR9IGtleT17YWxzLklEfT57YWxzLk5hbWV9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXthZGRDb25uZWN0aW9ufT5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBBc3NldENvbm5lY3Rpb25XaW5kb3c7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBNZXRlckluZm8udHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDkvMDkvMjAxOSAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xuaW1wb3J0IHsgZ2V0QWxsQXNzZXRzLCBnZXRBc3NldFR5cGVzLCBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzLCBlZGl0RXhpc3RpbmdBc3NldH0gZnJvbSAnLi4vLi4vLi4vVFMvU2VydmljZXMvQXNzZXQnO1xuaW1wb3J0IEJyZWFrZXJBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXInO1xuaW1wb3J0IEJ1c0F0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQnVzJztcbmltcG9ydCBDYXBCYW5rQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rJztcbmltcG9ydCBMaW5lQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9MaW5lJztcbmltcG9ydCBUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvVHJhbnNmb3JtZXInO1xuaW1wb3J0IExpbmVTZWdtZW50QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9MaW5lU2VnbWVudCc7XG5pbXBvcnQgQ2FwQmFua1JlbGF5QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rUmVsYXknO1xuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NldEluZm9XaW5kb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBBc3NldDogT3BlblhEQS5Bc3NldCwgU3RhdGVTZXR0ZXI6IChhc3NldDogT3BlblhEQS5Bc3NldCkgPT4gdm9pZCB9LCB7IEFzc2V0OiBPcGVuWERBLkFzc2V0LCBBc3NldFR5cGVzOiBBcnJheTxPcGVuWERBLkFzc2V0VHlwZT4sIEFsbEFzc2V0czogT3BlblhEQS5Bc3NldFtdfSwge30+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIEFzc2V0OiB0aGlzLnByb3BzLkFzc2V0LFxuICAgICAgICAgICAgQXNzZXRUeXBlczogW10sXG4gICAgICAgICAgICBBbGxBc3NldHM6IFtdXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gdGhpcy51cGRhdGVTdGF0ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBnZXRBc3NldFR5cGVzKCkuZG9uZSgoYXNzZXRUeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQXNzZXRUeXBlczogYXNzZXRUeXBlcyB9KTtcbiAgICAgICAgICAgIGxldCBhc3NldFR5cGUgPSBhc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gdGhpcy5zdGF0ZS5Bc3NldFsnQXNzZXRUeXBlSUQnXSlcblxuICAgICAgICAgICAgZ2V0QXNzZXRXaXRoQWRkaXRpb25hbEZpZWxkcyh0aGlzLnByb3BzLkFzc2V0LklELCBhc3NldFR5cGUuTmFtZSkudGhlbihhc3NldCA9PiB0aGlzLnNldFN0YXRlKHtBc3NldDogYXNzZXR9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZXRBbGxBc3NldHMoKS5kb25lKGFhcyA9PiB0aGlzLnNldFN0YXRlKHsgQWxsQXNzZXRzOiBhYXMgfSkpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTogdm9pZCB7XG4gICAgICAgIGlmIChuZXh0UHJvcHMuQXNzZXQgIT0gdGhpcy5zdGF0ZS5Bc3NldClcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBc3NldDogbmV4dFByb3BzLkFzc2V0IH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXNzZXRUeXBlID0gdGhpcy5zdGF0ZS5Bc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gdGhpcy5zdGF0ZS5Bc3NldFsnQXNzZXRUeXBlSUQnXSlcbiAgICAgICAgICAgICAgICBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzKHRoaXMuc3RhdGUuQXNzZXQuSUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKGFzc2V0ID0+IHRoaXMuc2V0U3RhdGUoeyBBc3NldDogYXNzZXQgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd0F0dHJpYnV0ZXMoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ0JyZWFrZXInKVxuICAgICAgICAgICAgcmV0dXJuIDxCcmVha2VyQXR0cmlidXRlcyBOZXdFZGl0PXsnRWRpdCd9IEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcn0gVXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IFNob3dTcGFyZT17dHJ1ZX0gLz47XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuQXNzZXQuQXNzZXRUeXBlID09ICdCdXMnKVxuICAgICAgICAgICAgcmV0dXJuIDxCdXNBdHRyaWJ1dGVzIE5ld0VkaXQ9eydFZGl0J30gQXNzZXQ9e3RoaXMuc3RhdGUuQXNzZXR9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ0NhcGFjaXRvckJhbmsnKVxuICAgICAgICAgICAgcmV0dXJuIDxDYXBCYW5rQXR0cmlidXRlcyBOZXdFZGl0PXsnRWRpdCd9IEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua30gVXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+O1xuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLkFzc2V0LkFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFua1JlbGF5JylcbiAgICAgICAgICAgIHJldHVybiA8Q2FwQmFua1JlbGF5QXR0cmlidXRlcyBOZXdFZGl0PXsnRWRpdCd9IEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua1JlbGF5fSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz47XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuQXNzZXQuQXNzZXRUeXBlID09ICdMaW5lJylcbiAgICAgICAgICAgIHJldHVybiA8TGluZUF0dHJpYnV0ZXMgTmV3RWRpdD17J0VkaXQnfSBBc3NldD17dGhpcy5zdGF0ZS5Bc3NldCBhcyBPcGVuWERBLkxpbmV9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ1RyYW5zZm9ybWVyJylcbiAgICAgICAgICAgIHJldHVybiA8VHJhbnNmb3JtZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9eydFZGl0J30gQXNzZXQ9e3RoaXMuc3RhdGUuQXNzZXQgYXMgT3BlblhEQS5UcmFuc2Zvcm1lcn0gVXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+O1xuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLkFzc2V0LkFzc2V0VHlwZSA9PSAnTGluZVNlZ21lbnQnKVxuICAgICAgICAgICAgcmV0dXJuIDxMaW5lU2VnbWVudEF0dHJpYnV0ZXMgTmV3RWRpdD17J0VkaXQnfSBBc3NldD17dGhpcy5zdGF0ZS5Bc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50fSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz47XG5cbiAgICB9XG5cblxuICAgIHVwZGF0ZVN0YXRlKGFzc2V0OiBPcGVuWERBLkFzc2V0KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBc3NldDogYXNzZXQgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5Bc3NldCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+QXNzZXQgSW5mb3JtYXRpb246PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXNzZXRBdHRyaWJ1dGVzIEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0fSBOZXdFZGl0PSdFZGl0JyBBc3NldFR5cGVzPXt0aGlzLnN0YXRlLkFzc2V0VHlwZXN9IEFsbEFzc2V0cz17dGhpcy5zdGF0ZS5BbGxBc3NldHN9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSBHZXREaWZmZXJlbnRBc3NldD17KCkgPT4geyB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnNob3dBdHRyaWJ1dGVzKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdEV4aXN0aW5nQXNzZXQodGhpcy5zdGF0ZS5Bc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5TdGF0ZVNldHRlcih0aGlzLnN0YXRlLkFzc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19IGRpc2FibGVkPXt0aGlzLnN0YXRlLkFzc2V0ID09IHRoaXMucHJvcHMuQXNzZXR9PlNhdmUgQ2hhbmdlczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgQXNzZXQ6IHRoaXMucHJvcHMuQXNzZXQgfSl9IGRpc2FibGVkPXt0aGlzLnN0YXRlLkFzc2V0ID09IHRoaXMucHJvcHMuQXNzZXR9PkNsZWFyIENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQXNzZXRMb2NhdGlvbi50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8yNC8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1RhYmxlJztcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5mdW5jdGlvbiBBc3NldExvY2F0aW9uV2luZG93KHByb3BzOiB7IEFzc2V0OiBPcGVuWERBLkFzc2V0IH0pOiBKU1guRWxlbWVudHtcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcbiAgICBjb25zdCBbbG9jYXRpb25zLCBzZXRMb2NhdGlvbnNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5Mb2NhdGlvbj4+KFtdKTtcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8a2V5b2YgKE9wZW5YREEuTG9jYXRpb24pPignTG9jYXRpb25LZXknKTtcbiAgICBjb25zdCBbYXNjZW5kaW5nLCBzZXRBc2NlbmRpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gICAgY29uc3QgW2FsbExvY2F0aW9ucywgc2V0QWxsTG9jYXRpb25zXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuTG9jYXRpb24+PihbXSk7XG4gICAgY29uc3QgW25ld0xvY2F0aW9uLCBzZXROZXdMb2NhdGlvbl0gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLkxvY2F0aW9uPigpO1xuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGdldERhdGEoKTtcbiAgICB9LCBbcHJvcHMuQXNzZXRdKTtcblxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIGdldExvY2F0aW9ucygpO1xuICAgICAgICBnZXRBbGxPdGhlckxvY2F0aW9ucygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldExvY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7cHJvcHMuQXNzZXQuSUR9L0xvY2F0aW9uc2AsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKGRhdGEgPT4gc2V0TG9jYXRpb25zKGRhdGEpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBbGxPdGhlckxvY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7cHJvcHMuQXNzZXQuSUR9L090aGVyTG9jYXRpb25zYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVjb3JkcyA9IF8ub3JkZXJCeShkYXRhLCBbJ0xvY2F0aW9uS2V5J10sIFsnYXNjJ10pO1xuICAgICAgICAgICAgc2V0QWxsTG9jYXRpb25zKHJlY29yZHMpO1xuICAgICAgICAgICAgc2V0TmV3TG9jYXRpb24ocmVjb3Jkc1swXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTG9jYXRpb24obG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24pIHtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC8ke3Byb3BzLkFzc2V0LklEfS9Mb2NhdGlvbi8ke2xvY2F0aW9uLklEfWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKChhc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+KSA9PiB7XG4gICAgICAgICAgICBnZXREYXRhKCk7XG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkTG9jYXRpb24oKSB7XG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7cHJvcHMuQXNzZXQuSUR9L0xvY2F0aW9uLyR7bmV3TG9jYXRpb24uSUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUocmVjb3JkID0+IHtcbiAgICAgICAgICAgIGdldERhdGEoKTtcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxlY3QoaXRlbSwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5sb2NhbE5hbWUgPT0gJ3RkJylcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiBob21lUGF0aCArICdpbmRleC5jc2h0bWwnLCBzZWFyY2g6ICc/bmFtZT1Mb2NhdGlvbiZMb2NhdGlvbklEPScgKyBpdGVtLnJvdy5JRCwgc3RhdGU6IHt9IH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlN1YnN0YXRpb25zOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzODEsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlPE9wZW5YREEuTG9jYXRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdMb2NhdGlvbktleScsIGxhYmVsOiAnS2V5JywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICczMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMzAlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJywgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICczMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMzAlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdMYXRpdHVkZScsIGxhYmVsOiAnTGF0aXR1ZGUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xvbmdpdHVkZScsIGxhYmVsOiAnTG9uZ2l0dWRlJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdjYWxjKDEwJSknIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCBjb250ZW50OiAoYXNzZXQsIGtleSwgc3R5bGUpID0+IDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVMb2NhdGlvbihhc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17bG9jYXRpb25zfVxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydEZpZWxkPXtzb3J0RmllbGR9XG4gICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5jb2wgPT0gc29ydEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KGxvY2F0aW9ucywgW2QuY29sXSwgWyghYXNjZW5kaW5nID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExvY2F0aW9ucyhvcmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KGxvY2F0aW9ucywgW2QuY29sXSwgW1wiYXNjXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRMb2NhdGlvbnMob3JkZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZChkLmNvbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoKSA9PiBmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI2xvY2F0aW9uTW9kYWwnPkFkZCBTdWJzdGF0aW9uPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgaWQ9XCJsb2NhdGlvbk1vZGFsXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPkFkZCBTdWJzdGF0aW9uIHRvIEFzc2V0PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlN1YnN0YXRpb248L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXtuZXdMb2NhdGlvbiAhPSBudWxsID8gbmV3TG9jYXRpb24uSUQgOiAnMCd9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdMb2NhdGlvbihhbGxMb2NhdGlvbnMuZmluZChsID0+IGwuSUQudG9TdHJpbmcoKSA9PSBldnQudGFyZ2V0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbExvY2F0aW9ucy5tYXAoYWxzID0+IDxvcHRpb24gdmFsdWU9e2Fscy5JRH0ga2V5PXthbHMuSUR9PnthbHMuTG9jYXRpb25LZXl9PC9vcHRpb24+KX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBoaWRkZW49e2FsbExvY2F0aW9ucy5sZW5ndGggPT0gMH0gb25DbGljaz17YWRkTG9jYXRpb259PlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBBc3NldExvY2F0aW9uV2luZG93OyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgTG9jYXRpb25NZXRlci50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8yMS8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1RhYmxlJztcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5mdW5jdGlvbiBBc3NldE1ldGVyV2luZG93KHByb3BzOiB7IEFzc2V0OiBPcGVuWERBLkFzc2V0IH0pOiBKU1guRWxlbWVudHtcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcbiAgICBjb25zdCBbbWV0ZXJzLCBzZXRNZXRlcnNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5NZXRlcj4+KFtdKTtcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8a2V5b2YoT3BlblhEQS5NZXRlcik+KCdBc3NldEtleScpO1xuICAgIGNvbnN0IFthc2NlbmRpbmcsIHNldEFzY2VuZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGdldE1ldGVycygpO1xuICAgIH0sIFtwcm9wcy5Bc3NldF0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0TWV0ZXJzKCk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvJHtwcm9wcy5Bc3NldC5JRH0vTWV0ZXJzYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUobWV0ZXJzID0+IHNldE1ldGVycyhtZXRlcnMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxlY3QoaXRlbSkge1xuICAgICAgICBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9TWV0ZXImTWV0ZXJJRD0nICsgaXRlbS5yb3cuSUQsIHN0YXRlOiB7fSB9KVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5NZXRlcnM6PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDM4MSwgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICA8VGFibGU8T3BlblhEQS5NZXRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0S2V5JywgbGFiZWw6ICdLZXknLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzMwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICczMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05hbWUnLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzMwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICczMCUnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sga2V5OiAnVHlwZScsIGxhYmVsOiAnVHlwZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWFrZScsIGxhYmVsOiAnTWV0ZXJzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNb2RlbCcsIGxhYmVsOiAnQXNzZXRzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdjYWxjKDEwJSknIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e21ldGVyc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblNvcnQ9eyhkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShtZXRlcnMsIFtkLmNvbF0sIFsoIWFzY2VuZGluZyA/IFwiYXNjXCIgOiBcImRlc2NcIildKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXRlcnMob3JkZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShtZXRlcnMsIFtkLmNvbF0sIFtcImFzY1wiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWV0ZXJzKG9yZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTb3J0RmllbGQoZC5jb2wpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdhdXRvJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAxODIsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcm93U3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoKSA9PiBmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBBc3NldE1ldGVyV2luZG93OyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgTGluZVNlZ21lbnRXaW5kb3cudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDQvMTcvMjAyMCAtIENocmlzdG9waCBMYWNrbmVyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1N5c3RlbUNlbnRlciwgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xuaW1wb3J0IEZvcm1DaGVja0JveCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1DaGVja0JveCc7XG5pbXBvcnQgRm9ybVNlbGVjdCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1TZWxlY3QnO1xuaW1wb3J0IHsgZ2V0QWxsQXNzZXRzLCBnZXRBc3NldFR5cGVzLCBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vVFMvU2VydmljZXMvQXNzZXQnO1xuaW1wb3J0IExpbmVTZWdtZW50QXR0cmlidXRlcyBmcm9tICcuL0xpbmVTZWdtZW50JztcblxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcblxuZnVuY3Rpb24gTGluZVNlZ21lbnRXaW5kb3cocHJvcHM6IHsgSUQ6IG51bWJlciB9KTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IFtzZWdtZW50cywgc2V0U2VnbWVudHNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8T3BlblhEQS5MaW5lU2VnbWVudD4+KFtdKTtcbiAgICBjb25zdCBbdXBkYXRlZCwgc2V0VXBkYXRlZF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgICBjb25zdCBbbmV3RWRpdFNlZ21lbnQsIHNldE5ld0VkaXRTZWdtZW50XSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXQ+KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZVNlZ21lbnQnKSBhcyBPcGVuWERBLkxpbmVTZWdtZW50KTtcbiAgICBjb25zdCBbbmV3RWRpdCwgc2V0TmV3RWRpdF0gPSBSZWFjdC51c2VTdGF0ZTxTeXN0ZW1DZW50ZXIuTmV3RWRpdD4oJ05ldycpO1xuICAgIGNvbnN0IFthc3NldFR5cGVzLCBzZXRBc3NldFR5cGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPj4oW10pO1xuICAgIGNvbnN0IFthbGxBc3NldHMsIHNldEFsbEFzc2V0c10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkFzc2V0Pj4oW10pO1xuICAgIGNvbnN0IFtzZWdtZW50Q29ubmVjdGlvbnMsIHNldENvbm5lY3Rpb25zXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PGFueT4+KFtdKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGdldERhdGEoKTtcbiAgICAgICAgXG4gICAgfSwgW3Byb3BzLklEXSk7XG5cbiAgICBmdW5jdGlvbiBnZXREYXRhKCk6IHZvaWQge1xuICAgICAgICBnZXRTZWdtZW50cygpO1xuICAgICAgICBzZXRVcGRhdGVkKGZhbHNlKTtcblxuICAgICAgICBnZXRBbGxBc3NldHMoKS5kb25lKChhc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+KSA9PiB7XG4gICAgICAgICAgICBnZXRBc3NldFR5cGVzKCkuZG9uZSgoYXNzZXRUeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdCA9IGFzc2V0VHlwZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5OYW1lID09ICdMaW5lU2VnbWVudCcpXG4gICAgICAgICAgICAgICAgc2V0QXNzZXRUeXBlcyhkYXQpO1xuICAgICAgICAgICAgICAgIHNldEFsbEFzc2V0cyhhc3NldHMuZmlsdGVyKGl0ZW0gPT4gaXRlbVsnQXNzZXRUeXBlSUQnXSA9PSBkYXRbMF0uSUQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgIFxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VnbWVudHMoKTogdm9pZCB7XG4gICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTGluZS8ke3Byb3BzLklEfS9MaW5lU2VnbWVudHNgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgfSkuZG9uZSgoZGF0YTogQXJyYXk8T3BlblhEQS5MaW5lU2VnbWVudD4pID0+IHtcbiAgICAgICAgICAgc2V0U2VnbWVudHMoZGF0YSk7XG4gICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRXhpc3RpbmdTZWdtZW50KCk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTGluZVNlZ21lbnQvJHtuZXdFZGl0U2VnbWVudC5JRH0vQWRkVG9MaW5lLyR7cHJvcHMuSUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KCcnKSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoZSA9PiB7XG4gICAgICAgICAgICBnZXREYXRhKCk7XG4gICAgICAgICAgICBzZXROZXdFZGl0U2VnbWVudChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmVTZWdtZW50JykpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE5ld1NlZ21lbnQoKTogdm9pZHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9MaW5lU2VnbWVudC9OZXcvTGluZS8ke3Byb3BzLklEfWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBBc3NldDogbmV3RWRpdFNlZ21lbnQgfSksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKCgpID0+IHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICBnZXREYXRhKCk7XG4gICAgICAgICAgICBzZXROZXdFZGl0U2VnbWVudChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmVTZWdtZW50JykpXG5cbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVTZWdtZW50KGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIlRoaXMgd2lsbCBkZWxldGUgdGhlIFNlZ21lbnQgZnJvbSB0aGUgTGluZVwiKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlKSByZXR1cm47XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9MaW5lU2VnbWVudC8ke2lkfS9EaXNjb25uZWN0LyR7cHJvcHMuSUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoZSA9PiB7XG4gICAgICAgICAgICBnZXREYXRhKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmF3Z1VwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9FeHRlcm5hbERCL0ZBV0cvTGluZVNlZ21lbnQvVXBkYXRlU2VnbWVudHMvJHtwcm9wcy5JRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoJycpLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICBzZXRVcGRhdGVkKHRydWUpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHNldFNlZ21lbnRzKGRhdGFbXCJzZWdtZW50c1wiXSk7XG4gICAgICAgICAgICBzZXRDb25uZWN0aW9ucyhkYXRhW1wiY29ubmVjdGlvbnNcIl0pXG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5jZWxVcGRhdGUoKTogdm9pZCB7XG4gICAgICAgIHNldFVwZGF0ZWQoZmFsc2UpXG4gICAgICAgIGdldFNlZ21lbnRzKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJtaXRVcGRhdGUoKTogdm9pZCB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL0V4dGVybmFsREIvRkFXRy9MaW5lU2VnbWVudC9Db25maXJtU2VnbWVudHMvJHtwcm9wcy5JRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgXCJkYXRhXCI6IHsgXCJzZWdtZW50c1wiOiBzZWdtZW50cywgXCJjb25uZWN0aW9uc1wiOiBzZWdtZW50Q29ubmVjdGlvbnMgfSB9KSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xuICAgICAgICAgICAgY2FuY2VsVXBkYXRlKClcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGg0PkFkZGl0aW9uYWwgRmllbGRzOjwvaDQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPSd0YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDE1MCB9fT5TZWdtZW50PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA1MCB9fT5MZW5ndGg8L3RoPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY29sU3Bhbj17NH0gc3R5bGU9e3sgd2lkdGg6IDE2MCB9fT5aZXJvIFNlcSAoT2htL2RlZyk8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY29sU3Bhbj17NH0gc3R5bGU9e3sgd2lkdGg6IDE2MCB9fT5Qb3NpdGl2ZSBTZXEgKE9obS9kZWcpPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNvbFNwYW49ezR9IHN0eWxlPXt7IHdpZHRoOiAxNjAgfX0+TG9vcCAoTEcpIChPaG0vZGVnKTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogNzUgfX0+VGhlcm1hbCBSYXRpbmc8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDMwIH19PjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogMTAwfX0+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA1MCB9fT48L3RoPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogNDAgfX0+WjA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PiZsdDs8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PlIwPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT5YMDwvdGg+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT5aMTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogNDAgfX0+Jmx0OzwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogNDAgfX0+UjE8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PlgxPC90aD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PlpzPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT4mbHQ7PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT5SczwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogNDAgfX0+WHM8L3RoPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogNzUgfX0+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAzMCB9fT48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWdtZW50cy5tYXAoKGEsIGkpID0+IDxUYWJsZVJvd0lucHV0IGtleT17aX0gUGFyZW50TGluZUlEPXtwcm9wcy5JRH0gU2VnbWVudD17YX0gcmVtb3ZlPXtkZWxldGVTZWdtZW50fSAvPil9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9XCIjYXNzZXRNb2RhbFwiIGhpZGRlbj17dXBkYXRlZH0gPkFkZCBTZWdlbWVudDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoZXZ0KSA9PiBmYXdnVXBkYXRlKCl9IGhpZGRlbj17dXBkYXRlZH0+VXBkYXRlIGZyb20gRkFXRzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyhldnQpID0+IHN1Ym1pdFVwZGF0ZSgpfSBoaWRkZW49eyF1cGRhdGVkfSA+U2F2ZSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9eyhldnQpID0+IGNhbmNlbFVwZGF0ZSgpfSBoaWRkZW49eyF1cGRhdGVkfSA+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgaWQ9XCJhc3NldE1vZGFsXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiBzdHlsZT17eyBtYXhXaWR0aDogJzEwMCUnLCB3aWR0aDogJzc1JScgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57bmV3RWRpdCA9PSAnTmV3JyA/ICdBZGQgTmV3IExpbmVTZWdtZW50IHRvIExpbmUnIDogJ0VkaXQgJyArIG5ld0VkaXRTZWdtZW50LkFzc2V0S2V5ICsgJyBmb3IgTWV0ZXInfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHNldE5ld0VkaXRTZWdtZW50KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZVNlZ21lbnQnKSBhcyBPcGVuWERBLkxpbmVTZWdtZW50KX0+JnRpbWVzOzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFzc2V0QXR0cmlidXRlcyBBc3NldD17bmV3RWRpdFNlZ21lbnR9IE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0VHlwZXM9e2Fzc2V0VHlwZXN9IEFsbEFzc2V0cz17YWxsQXNzZXRzfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdFNlZ21lbnR9IEdldERpZmZlcmVudEFzc2V0PXsoYXNzZXRJRCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldCA9IGFsbEFzc2V0cy5maW5kKGEgPT4gYS5JRCA9PSBhc3NldElEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYXNzZXRJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWxsQXNzZXRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldFR5cGUgPSBhc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gYXNzZXRbJ0Fzc2V0VHlwZUlEJ10pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QXNzZXRXaXRoQWRkaXRpb25hbEZpZWxkcyhhc3NldElELCBhc3NldFR5cGUuTmFtZSkudGhlbihhc3NldCA9PiBzZXROZXdFZGl0U2VnbWVudChhc3NldCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluZVNlZ21lbnRBdHRyaWJ1dGVzIEFzc2V0PXtuZXdFZGl0U2VnbWVudCBhcyBPcGVuWERBLkxpbmVTZWdtZW50fSBOZXdFZGl0PXtuZXdFZGl0fSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdFNlZ21lbnR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17YWRkTmV3U2VnbWVudH0gIGhpZGRlbj17bmV3RWRpdCA9PSAnRWRpdCcgfHwgbmV3RWRpdFNlZ21lbnQuSUQgIT0gMH0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17YWRkRXhpc3RpbmdTZWdtZW50fSBoaWRkZW49e25ld0VkaXQgPT0gJ0VkaXQnIHx8IG5ld0VkaXRTZWdtZW50LklEID09IDB9PlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4gc2V0TmV3RWRpdFNlZ21lbnQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lU2VnbWVudCcpKX0+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZVNlZ21lbnRXaW5kb3c7XG5cbmZ1bmN0aW9uIFRhYmxlUm93SW5wdXQocHJvcHM6IHsgUGFyZW50TGluZUlEOiBudW1iZXIsIFNlZ21lbnQ6IE9wZW5YREEuTGluZVNlZ21lbnQsIHJlbW92ZTogKGlkOiBudW1iZXIpID0+IHZvaWQgfSkge1xuICAgIGxldCBaMSA9IE1hdGguc3FydChwcm9wcy5TZWdtZW50LlIxICogcHJvcHMuU2VnbWVudC5SMSArIHByb3BzLlNlZ21lbnQuWDEgKiBwcm9wcy5TZWdtZW50LlgxKTtcbiAgICBsZXQgWjAgPSBNYXRoLnNxcnQocHJvcHMuU2VnbWVudC5SMCAqIHByb3BzLlNlZ21lbnQuUjAgKyBwcm9wcy5TZWdtZW50LlgwICogcHJvcHMuU2VnbWVudC5YMCk7XG4gICAgbGV0IGEwID0gTWF0aC5hY29zKHByb3BzLlNlZ21lbnQuUjAvIFowKSAqIDE4MC4wIC8gTWF0aC5QSTtcbiAgICBsZXQgYTEgPSBNYXRoLmFjb3MocHJvcHMuU2VnbWVudC5SMSAvIFoxKSAqIDE4MC4wIC8gTWF0aC5QSTtcbiAgICBsZXQgWHMgPSAoMiAqIHByb3BzLlNlZ21lbnQuWDEgKyBwcm9wcy5TZWdtZW50LlgwKSAvIDMuMDtcbiAgICBsZXQgUnMgPSAoMiAqIHByb3BzLlNlZ21lbnQuUjEgKyBwcm9wcy5TZWdtZW50LlIwKSAvIDMuMDtcbiAgICBsZXQgWnMgPSBNYXRoLnNxcnQoUnMqUnMgKyBYcypYcyk7XG4gICAgbGV0IGFzID0gTWF0aC5hY29zKFJzIC8gWnMpICogMTgwLjAgLyBNYXRoLlBJO1xuXG4gICAgcmV0dXJuKFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+e3Byb3BzLlNlZ21lbnQuQXNzZXROYW1lfSAoe3Byb3BzLlNlZ21lbnQuQXNzZXRLZXl9KTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e3Byb3BzLlNlZ21lbnQuTGVuZ3RofTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e1owLnRvRml4ZWQoMil9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57YTAudG9GaXhlZCgyKX08L3RkPlxuICAgICAgICAgICAgPHRkPntwcm9wcy5TZWdtZW50LlIwLnRvRml4ZWQoMil9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuU2VnbWVudC5YMC50b0ZpeGVkKDIpfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e1oxLnRvRml4ZWQoMil9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57YTEudG9GaXhlZCgyKX08L3RkPlxuICAgICAgICAgICAgPHRkPntwcm9wcy5TZWdtZW50LlIxLnRvRml4ZWQoMil9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuU2VnbWVudC5YMS50b0ZpeGVkKDIpfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e1pzLnRvRml4ZWQoMil9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57YXMudG9GaXhlZCgyKX08L3RkPlxuICAgICAgICAgICAgPHRkPntScy50b0ZpeGVkKDIpfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+e1hzLnRvRml4ZWQoMil9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuU2VnbWVudC5UaGVybWFsUmF0aW5nfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHByb3BzLnJlbW92ZShwcm9wcy5TZWdtZW50LklEKX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=