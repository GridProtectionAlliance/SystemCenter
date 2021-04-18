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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0L0Fzc2V0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0L0Fzc2V0Q29ubmVjdGlvbi50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldC9Bc3NldEluZm8udHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXQvQXNzZXRMb2NhdGlvbi50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldC9Bc3NldE1ldGVyLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0Zhd2dMaW5lU2VnbWVudFdpemFyZC9MaW5lU2VnbWVudFdpemFyZC50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9GYXdnTGluZVNlZ21lbnRXaXphcmQvU2VjdGlvbkVkaXQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvRmF3Z0xpbmVTZWdtZW50V2l6YXJkL1NlY3Rpb25TZWxlY3QudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvTGluZVNlZ21lbnRXaW5kb3cudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9UYWJsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsb0JBQW9CO0FBQ3BCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBR1c7QUFDUTtBQUNOO0FBQ3dCO0FBRXRCO0FBQ1U7QUFDRjtBQUMwQjtBQUNyQjtBQUNTO0FBSXBFLFNBQVMsS0FBSyxDQUFDLEtBQTBCO0lBQ3JDLElBQUksT0FBTyxHQUFHLG1FQUFVLEVBQUUsQ0FBQztJQUNyQix3RUFBdUQsRUFBdEQsYUFBSyxFQUFFLGdCQUErQyxDQUFDO0lBQ3hELDRFQUFxRCxFQUFwRCxXQUFHLEVBQUUsbUJBQStDLENBQUM7SUFDdEQsd0VBQXVFLEVBQXRFLGlCQUFTLEVBQUUsb0JBQTJELENBQUM7SUFFOUUsU0FBUyxNQUFNO1FBQ1gsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztZQUMxQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztZQUV2RCxPQUFPLE9BQU8sQ0FBQztJQUN2QixDQUFDO0lBRUQsU0FBUyxNQUFNLENBQUMsR0FBUTtRQUNwQixjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekQsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxTQUFTLFFBQVE7UUFDYixPQUFVLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDYixJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBSyxRQUFRLDhCQUF5QixLQUFLLENBQUMsT0FBUztZQUN4RCxXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLElBQUk7U0FDZixDQUFDO0lBRUwsQ0FBQztJQUVELFNBQVMsWUFBWSxDQUFDLEtBQW9CO1FBQ3RDLHdFQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxVQUFvQztZQUN0RCxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQUUsSUFBSSxTQUFFLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQztZQUNwRSxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsV0FBVztRQUVoQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsUUFBUTtZQUNULE9BQU87UUFFWCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDVixJQUFJLEVBQUUsUUFBUTtZQUNkLEdBQUcsRUFBSyxRQUFRLDZCQUEwQjtZQUMxQyxXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUMzQixRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDUixjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEdBQUcsY0FBYyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0NBQWUsQ0FBQztRQUNaLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxTQUFTO1lBQUUsT0FBTyxjQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLE1BQU0sR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUV4QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBbUI7WUFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNkLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPO1lBQ0gsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLFNBQVM7Z0JBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWxELENBQUM7SUFHTCxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUVwQixJQUFJLEtBQUssSUFBSSxJQUFJO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDL0IsT0FBTyxDQUNILDZEQUFLLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7UUFDL0gsNkRBQUssU0FBUyxFQUFDLEtBQUs7WUFDaEIsNkRBQUssU0FBUyxFQUFDLEtBQUs7Z0JBQ2hCLGdFQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBTSxDQUM1QztZQUNOLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dCQUNoQixnRUFBUSxTQUFTLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsT0FBTyxFQUFFLGNBQU0sa0JBQVcsRUFBRSxFQUFiLENBQWEsK0JBQW1DLENBQ2xJLENBQ0o7UUFHTiwrREFBTTtRQUNOLDREQUFJLFNBQVMsRUFBQyxjQUFjO1lBQ3hCLDREQUFJLFNBQVMsRUFBQyxVQUFVO2dCQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBTSxhQUFNLENBQUMsT0FBTyxDQUFDLEVBQWYsQ0FBZSxpQkFBYyxLQUFLLEVBQUMsSUFBSSxFQUFDLFFBQVEsWUFBVSxDQUN0STtZQUNMLDREQUFJLFNBQVMsRUFBQyxVQUFVO2dCQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBTSxhQUFNLENBQUMsV0FBVyxDQUFDLEVBQW5CLENBQW1CLGlCQUFjLEtBQUssRUFBQyxJQUFJLEVBQUMsWUFBWSxpQkFBZSxDQUN2SjtZQUNMLDREQUFJLFNBQVMsRUFBQyxVQUFVO2dCQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFNLGFBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUExQixDQUEwQixpQkFBYyxLQUFLLEVBQUMsSUFBSSxFQUFDLG1CQUFtQix3QkFBc0IsQ0FDbkw7WUFDTCw0REFBSSxTQUFTLEVBQUMsVUFBVTtnQkFDcEIsMkRBQUcsU0FBUyxFQUFFLFVBQVUsR0FBRyxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQU0sYUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFyQixDQUFxQixpQkFBYyxLQUFLLEVBQUMsSUFBSSxFQUFDLGNBQWMsa0JBQWdCLENBQzlKO1lBQ0wsNERBQUksU0FBUyxFQUFDLFVBQVU7Z0JBQ3BCLDJEQUFHLFNBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFNLGFBQU0sQ0FBQyxRQUFRLENBQUMsRUFBaEIsQ0FBZ0IsaUJBQWMsS0FBSyxFQUFDLElBQUksRUFBQyxTQUFTLGFBQVcsQ0FDMUk7WUFDTCw0REFBSSxTQUFTLEVBQUMsVUFBVTtnQkFDcEIsMkRBQUcsU0FBUyxFQUFFLFVBQVUsR0FBRyxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQU0sYUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFyQixDQUFxQixpQkFBYyxLQUFLLEVBQUMsSUFBSSxFQUFDLGNBQWMsa0JBQWdCLENBQzlKO1lBQ0osQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLEVBQUM7Z0JBQ25CLDREQUFJLFNBQVMsRUFBQyxVQUFVO29CQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBTSxhQUFNLENBQUMsVUFBVSxDQUFDLEVBQWxCLENBQWtCLGlCQUFjLEtBQUssRUFBQyxJQUFJLEVBQUMsV0FBVyxvQkFBa0IsQ0FDdkosQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUVmLENBQUMsU0FBUyxJQUFJLFNBQVMsSUFBSSxTQUFTLElBQUksZUFBZSxJQUFJLFNBQVMsSUFBSSxNQUFNLElBQUksU0FBUyxJQUFJLGFBQWEsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEksNERBQUksU0FBUyxFQUFDLFVBQVU7b0JBQ3BCLDJEQUFHLFNBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFNLGFBQU0sQ0FBQyxPQUFPLENBQUMsRUFBZixDQUFlLGlCQUFjLEtBQUssRUFBQyxJQUFJLEVBQUMsUUFBUSxrQkFBZ0IsQ0FDNUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUVmO1FBRUwsNkRBQUssU0FBUyxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtZQUMxRiw2REFBSyxTQUFTLEVBQUUsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUMsT0FBTztnQkFDM0Usb0RBQUMsb0VBQVUsSUFBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUMsT0FBTyxHQUFHLENBQ3ZDO1lBQ04sNkRBQUssU0FBUyxFQUFFLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLFdBQVc7Z0JBQ25GLG9EQUFDLGtEQUFlLElBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsUUFBUSxHQUFJLENBQ3REO1lBQ04sNkRBQUssU0FBUyxFQUFFLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUMsa0JBQWtCO2dCQUNqRyxvREFBQyxnRkFBc0IsSUFBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FDaEc7WUFDTiw2REFBSyxTQUFTLEVBQUUsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUMsYUFBYTtnQkFDdkYsb0RBQUMsc0RBQW1CLElBQUMsS0FBSyxFQUFFLEtBQUssR0FBSSxDQUNuQztZQUNOLDZEQUFLLFNBQVMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBQyxRQUFRO2dCQUM3RSxvREFBQyxtREFBZ0IsSUFBQyxLQUFLLEVBQUUsS0FBSyxHQUFJLENBQ2hDO1lBQ04sNkRBQUssU0FBUyxFQUFFLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLGFBQWE7Z0JBQ3ZGLG9EQUFDLHdEQUFxQixJQUFDLEtBQUssRUFBRSxLQUFLLEdBQUksQ0FDckM7WUFDTiw2REFBSyxTQUFTLEVBQUUsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUMsT0FBTztnQkFDM0Usb0RBQUMsMEVBQWdCLElBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFJLENBQzNGO1lBQ04sNkRBQUssU0FBUyxFQUFFLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLFVBQVU7Z0JBQ2pGLG9EQUFDLDBFQUFpQixJQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxHQUFHLENBQ2hDLENBQ0osQ0FDSixDQUNUO0FBQ0wsQ0FBQztBQUVjLG9FQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM3THJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsNEJBQTRCO0FBQzVCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBQ1I7QUFFdUI7QUFDQTtBQVU5QyxTQUFTLHFCQUFxQixDQUFDLEtBQStCO0lBQzFELElBQUksT0FBTyxHQUFHLG1FQUFVLEVBQUUsQ0FBQztJQUNyQixzRUFBb0YsRUFBbkYsd0JBQWdCLEVBQUUsMkJBQWlFLENBQUM7SUFDckYsc0VBQXdHLEVBQXZHLDRCQUFvQixFQUFFLCtCQUFpRixDQUFDO0lBQ3pHLGdJQUFpSixFQUFoSiwwQkFBa0IsRUFBRSw2QkFBNEgsQ0FBQztJQUNsSixzRUFBd0UsRUFBdkUsbUJBQVcsRUFBRSxzQkFBMEQsQ0FBQztJQUV6RSw4RUFBK0UsRUFBOUUsaUJBQVMsRUFBRSxvQkFBbUUsQ0FBQztJQUNoRix3RUFBeUQsRUFBeEQsaUJBQVMsRUFBRSxvQkFBNkMsQ0FBQztJQUVoRSwrQ0FBZSxDQUFDO1FBQ1osT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUVsQixTQUFTLE9BQU87UUFDWix1QkFBdUIsRUFBRSxDQUFDO1FBQzFCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsY0FBYyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELFNBQVMsbUJBQW1CO1FBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBSyxRQUFRLDBCQUFxQixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsc0JBQW1CO1lBQ3RFLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBRyxJQUFJLDBCQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFNBQVMsY0FBYztRQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLEtBQUs7WUFDWCxHQUFHLEVBQUssUUFBUSwwQkFBcUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLGVBQVk7WUFDL0QsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFHLElBQUkscUJBQWMsQ0FBQyxHQUFHLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFHRCxTQUFTLHVCQUF1QjtRQUM1QixJQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUMsOEJBQThCLENBQUM7WUFDNUQsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUU1RixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNQLElBQUksRUFBRSxLQUFLO2dCQUNYLEdBQUcsRUFBSyxRQUFRLG9DQUFpQztnQkFDakQsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQXdDO2dCQUM3Qyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsY0FBYyxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBZSxxQkFBcUIsQ0FBQyxVQUEyQjs7O2dCQUM1RCxzQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNWLElBQUksRUFBRSxRQUFRO3dCQUNkLEdBQUcsRUFBSyxRQUFRLDBCQUFxQixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsZUFBVSxVQUFVLENBQUMsT0FBUzt3QkFDakYsV0FBVyxFQUFFLGlDQUFpQzt3QkFDOUMsUUFBUSxFQUFFLE1BQU07d0JBQ2hCLEtBQUssRUFBRSxJQUFJO3dCQUNYLEtBQUssRUFBRSxJQUFJO3FCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUE0Qjt3QkFDakMsT0FBTyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRzt3QkFDUixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRzs0QkFDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2hELENBQUMsQ0FBQyxFQUFDOzs7S0FDTjtJQUVELFNBQVMsYUFBYTtRQUNsQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUssUUFBUSxvQ0FBaUM7WUFDakQsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsa0JBQWtCLENBQUMsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztZQUN6SyxLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFVBQVU7WUFDZixPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDUixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRztnQkFDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsU0FBUyxZQUFZLENBQUMsSUFBSTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxjQUFjLEVBQUUsTUFBTSxFQUFFLHNCQUFzQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN2SCxDQUFDO0lBRUQsT0FBTyxDQUNILDZEQUFLLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRTtRQUM3Qyw2REFBSyxTQUFTLEVBQUMsYUFBYTtZQUN4Qiw2REFBSyxTQUFTLEVBQUMsS0FBSztnQkFDaEIsNkRBQUssU0FBUyxFQUFDLEtBQUs7b0JBQ2hCLDBFQUFnQixDQUNkLENBQ0osQ0FDSjtRQUNOLDZEQUFLLFNBQVMsRUFBQyxXQUFXO1lBQ3RCLDZEQUFLLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtnQkFDOUYsb0RBQUMsK0RBQUssSUFDRixJQUFJLEVBQUU7d0JBQ0YsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDOUYsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDakc7NEJBQ0ksR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLElBQUs7Z0NBQzNHLGdFQUFRLFNBQVMsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQzt3Q0FDdEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO3dDQUNuQixxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FDakMsQ0FBQztvQ0FBRTt3Q0FBTSwyREFBRyxTQUFTLEVBQUMsYUFBYSxHQUFLLENBQU8sQ0FBUyxDQUN6RCxFQUw0RyxDQUs1Rzt5QkFDTjtxQkFFSixFQUNELFVBQVUsRUFBQyxtQkFBbUIsRUFDOUIsSUFBSSxFQUFFLGdCQUFnQixFQUN0QixTQUFTLEVBQUUsU0FBUyxFQUNwQixTQUFTLEVBQUUsU0FBUyxFQUNwQixNQUFNLEVBQUUsVUFBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxTQUFTLEVBQUU7NEJBQ3BCLElBQUksT0FBTyxHQUFHLDZDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3BGLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUN6QixtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDaEM7NkJBQ0k7NEJBQ0QsSUFBSSxPQUFPLEdBQUcsNkNBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUM1RCxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDekIsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzdCLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ3ZCO29CQUNMLENBQUMsRUFDRCxPQUFPLEVBQUUsWUFBWSxFQUNyQixRQUFRLEVBQUUsY0FBTSxZQUFLLEVBQUwsQ0FBSyxHQUN2QixDQUVBLENBQ0o7UUFDTiw2REFBSyxTQUFTLEVBQUMsYUFBYTtZQUN4Qiw2REFBSyxTQUFTLEVBQUMsZ0JBQWdCO2dCQUMzQixnRUFBUSxTQUFTLEVBQUMsNEJBQTRCLGlCQUFhLE9BQU8saUJBQWEsa0JBQWtCLHFCQUF3QixDQUN2SCxDQUVKO1FBRU4sNkRBQUssU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsaUJBQWlCO1lBQ3ZDLDZEQUFLLFNBQVMsRUFBQyxjQUFjO2dCQUN6Qiw2REFBSyxTQUFTLEVBQUMsZUFBZTtvQkFDMUIsNkRBQUssU0FBUyxFQUFDLGNBQWM7d0JBQ3pCLDREQUFJLFNBQVMsRUFBQyxhQUFhLG9DQUFtQzt3QkFDOUQsZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsT0FBTyxrQkFBYyxPQUFPLGFBQWlCLENBQzNFO29CQUNOLDZEQUFLLFNBQVMsRUFBQyxZQUFZO3dCQUN2Qiw2REFBSyxTQUFTLEVBQUMsWUFBWTs0QkFDdkIsNEVBQXFCOzRCQUNyQixnRUFBUSxTQUFTLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBRSxrQkFBa0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFDLEdBQUc7b0NBQy9HLElBQUksQ0FBQyxHQUFHLDZDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0NBQ3BDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0NBQzNCLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUM3QixDQUFDLElBQ0ksV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFHLElBQUksdUVBQVEsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBVSxFQUEzRCxDQUEyRCxDQUFDLENBQy9FOzRCQUVULDRGQUFxQzs0QkFDckMsZ0VBQVEsU0FBUyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUUsa0JBQWtCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFDLEdBQUc7b0NBQ2pJLElBQUksQ0FBQyxHQUFHLDZDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0NBQ3BDLENBQUMsQ0FBQyx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQW5DLENBQW1DLENBQUMsQ0FBQyxFQUFFO29DQUNsRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDN0IsQ0FBQyxJQUNJLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxhQUFHLElBQUksdUVBQVEsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUcsR0FBRyxDQUFDLElBQUksQ0FBVSxFQUF2RCxDQUF1RCxDQUFDLENBQ3BGLENBQ1AsQ0FDSjtvQkFDTiw2REFBSyxTQUFTLEVBQUMsY0FBYzt3QkFDekIsZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLGtCQUFjLE9BQU8sRUFBQyxPQUFPLEVBQUUsYUFBYSxXQUFlO3dCQUM1RyxnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxnQkFBZ0Isa0JBQWMsT0FBTyxZQUFlLENBQ2xGLENBRUosQ0FDSixDQUNKLENBR0osQ0FFVCxDQUFDO0FBRU4sQ0FBQztBQUVjLG9GQUFxQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDMU9yQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsd0JBQXdCO0FBQ3hCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7O0FBR3pFO0FBRzJCO0FBQytEO0FBQy9EO0FBQ1I7QUFDUTtBQUNOO0FBQ2M7QUFDQTtBQUNFO0FBSXBFO0lBQTZDLG1DQUFxTDtJQUM5Tix5QkFBWSxLQUFLLEVBQUUsT0FBTztRQUExQixZQUNJLGtCQUFNLEtBQUssRUFBRSxPQUFPLENBQUMsU0FTeEI7UUFQRyxLQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixVQUFVLEVBQUUsRUFBRTtZQUNkLFNBQVMsRUFBRSxFQUFFO1NBQ2hCO1FBRUQsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzs7SUFDbkQsQ0FBQztJQUVELDJDQUFpQixHQUFqQjtRQUFBLGlCQVFDO1FBUEcsd0VBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLFVBQW9DO1lBQ3RELEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUMxQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQUUsSUFBSSxTQUFFLENBQUMsRUFBRSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO1lBRS9FLHVGQUE0QixDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQUssSUFBSSxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQTdCLENBQTZCLENBQUMsQ0FBQztRQUNuSCxDQUFDLENBQUMsQ0FBQztRQUNILHVFQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBRyxJQUFJLFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxtREFBeUIsR0FBekIsVUFBMEIsU0FBUztRQUFuQyxpQkFNQztRQUxHLElBQUksU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksU0FBUyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFFLElBQUksU0FBRSxDQUFDLEVBQUUsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQztnQkFDMUYsdUZBQTRCLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBSyxJQUFJLFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1lBQ3JILENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELHdDQUFjLEdBQWQ7UUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxTQUFTO1lBQ3ZDLE9BQU8sb0RBQUMsK0RBQWlCLElBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUF3QixFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEdBQUksQ0FBQzthQUN6SSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLO1lBQ3hDLE9BQU8sb0RBQUMsMkRBQWEsSUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBSSxDQUFDO2FBQ2pHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLGVBQWU7WUFDbEQsT0FBTyxvREFBQywrREFBaUIsSUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQXdCLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUksQ0FBQzthQUN4SCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxvQkFBb0I7WUFDdkQsT0FBTyxvREFBQyxvRUFBc0IsSUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQTZCLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUksQ0FBQzthQUNsSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxNQUFNO1lBQ3pDLE9BQU8sb0RBQUMsNERBQWMsSUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQXFCLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUksQ0FBQzthQUNsSCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxhQUFhO1lBQ2hELE9BQU8sb0RBQUMsbUVBQXFCLElBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUE0QixFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFJLENBQUM7YUFDaEksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksYUFBYTtZQUNoRCxPQUFPLG9EQUFDLG1FQUFxQixJQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBNEIsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBSSxDQUFDO0lBRXpJLENBQUM7SUFHRCxxQ0FBVyxHQUFYLFVBQVksS0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxnQ0FBTSxHQUFOO1FBQUEsaUJBbUNDO1FBbENHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzFDLE9BQU8sQ0FDSCw2REFBSyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUU7WUFDN0MsNkRBQUssU0FBUyxFQUFDLGFBQWE7Z0JBQ3hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO29CQUNoQiw2REFBSyxTQUFTLEVBQUMsS0FBSzt3QkFDaEIscUZBQTJCLENBQ3pCLENBQ0osQ0FDSjtZQUNOLDZEQUFLLFNBQVMsRUFBQyxXQUFXO2dCQUNsQiw2REFBSyxTQUFTLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtvQkFDeEgsNkRBQUssU0FBUyxFQUFDLEtBQUs7d0JBQ2hCLG9EQUFDLHFFQUFlLENBQUMsb0JBQW9CLElBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxjQUFRLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxJQUFJLEdBQUksQ0FDNVA7b0JBQ04sNkRBQUssU0FBUyxFQUFDLEtBQUssSUFDZixJQUFJLENBQUMsY0FBYyxFQUFFLENBQ3BCLENBQ0osQ0FDSjtZQUNOLDZEQUFLLFNBQVMsRUFBQyxhQUFhO2dCQUN4Qiw2REFBSyxTQUFTLEVBQUMsZ0JBQWdCO29CQUMzQixnRUFBUSxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUU7NEJBQ3ZELDRFQUFpQixDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ3BDLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzdDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLG1CQUF1QixDQUN0RTtnQkFDTiw2REFBSyxTQUFTLEVBQUMsZ0JBQWdCO29CQUMzQixnRUFBUSxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsT0FBTyxFQUFFLGNBQU0sWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQTFDLENBQTBDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxvQkFBd0IsQ0FDbkssQ0FDSixDQUVKLENBQ1QsQ0FBQztJQUNOLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQ0ExRjRDLCtDQUFlLEdBMEYzRDs7Ozs7Ozs7Ozs7Ozs7QUNqSUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4Ryw0QkFBNEI7QUFDNUIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFDSDtBQUVrQjtBQUNBO0FBSTlDLFNBQVMsbUJBQW1CLENBQUMsS0FBK0I7SUFDeEQsSUFBSSxPQUFPLEdBQUcsbUVBQVUsRUFBRSxDQUFDO0lBQ3JCLHNFQUF1RSxFQUF0RSxpQkFBUyxFQUFFLG9CQUEyRCxDQUFDO0lBQ3hFLGlGQUFtRixFQUFsRixpQkFBUyxFQUFFLG9CQUF1RSxDQUFDO0lBQ3BGLHdFQUF5RCxFQUF4RCxpQkFBUyxFQUFFLG9CQUE2QyxDQUFDO0lBQzFELHNFQUE2RSxFQUE1RSxvQkFBWSxFQUFFLHVCQUE4RCxDQUFDO0lBQzlFLG9FQUFrRSxFQUFqRSxtQkFBVyxFQUFFLHNCQUFvRCxDQUFDO0lBQ3pFLCtDQUFlLENBQUM7UUFDWixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRWxCLFNBQVMsT0FBTztRQUNaLFlBQVksRUFBRSxDQUFDO1FBQ2Ysb0JBQW9CLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUyxZQUFZO1FBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBSyxRQUFRLDBCQUFxQixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsZUFBWTtZQUMvRCxXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQUksSUFBSSxtQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFNBQVMsb0JBQW9CO1FBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBSyxRQUFRLDBCQUFxQixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsb0JBQWlCO1lBQ3BFLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBSTtZQUNSLElBQUksT0FBTyxHQUFHLDhDQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hELGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBR0QsU0FBZSxjQUFjLENBQUMsUUFBMEI7OztnQkFDcEQsc0JBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDVixJQUFJLEVBQUUsUUFBUTt3QkFDZCxHQUFHLEVBQUssUUFBUSwwQkFBcUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLGtCQUFhLFFBQVEsQ0FBQyxFQUFJO3dCQUM3RSxXQUFXLEVBQUUsaUNBQWlDO3dCQUM5QyxRQUFRLEVBQUUsTUFBTTt3QkFDaEIsS0FBSyxFQUFFLElBQUk7d0JBQ1gsS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQTRCO3dCQUNqQyxPQUFPLEVBQUUsQ0FBQztvQkFDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO3dCQUNSLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHOzRCQUNqQixLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDaEQsQ0FBQyxDQUFDLEVBQUM7OztLQUNOO0lBRUQsU0FBZSxXQUFXOzs7Z0JBQ3RCLHNCQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ1YsSUFBSSxFQUFFLE1BQU07d0JBQ1osR0FBRyxFQUFLLFFBQVEsMEJBQXFCLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxrQkFBYSxXQUFXLENBQUMsRUFBSTt3QkFDaEYsV0FBVyxFQUFFLGlDQUFpQzt3QkFDOUMsUUFBUSxFQUFFLE1BQU07d0JBQ2hCLEtBQUssRUFBRSxJQUFJO3dCQUNYLEtBQUssRUFBRSxJQUFJO3FCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQU07d0JBQ1YsT0FBTyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRzt3QkFDUixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRzs0QkFDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2hELENBQUMsQ0FBQyxFQUFDOzs7S0FDTjtJQUVELFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLO1FBQzdCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSTtZQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxjQUFjLEVBQUUsTUFBTSxFQUFFLDRCQUE0QixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUM1SCxDQUFDO0lBRUQsT0FBTyxDQUNILDZEQUFLLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRTtRQUM3Qyw2REFBSyxTQUFTLEVBQUMsYUFBYTtZQUN4Qiw2REFBSyxTQUFTLEVBQUMsS0FBSztnQkFDaEIsNkRBQUssU0FBUyxFQUFDLEtBQUs7b0JBQ2hCLCtFQUFxQixDQUNuQixDQUNKLENBQ0o7UUFDTiw2REFBSyxTQUFTLEVBQUMsV0FBVztZQUN0Qiw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7Z0JBQzlGLG9EQUFDLCtEQUFLLElBQ0YsSUFBSSxFQUFFO3dCQUNGLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQy9GLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQ3pGLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQ2pHLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQ3pHOzRCQUNJLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxJQUFLO2dDQUM3RyxnRUFBUSxTQUFTLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBRSxVQUFDLENBQUM7d0NBQ3RDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3Q0FDbkIsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO29DQUMxQixDQUFDO29DQUFFO3dDQUFNLDJEQUFHLFNBQVMsRUFBQyxhQUFhLEdBQUssQ0FBTyxDQUFTLENBQ3pELEVBTDhHLENBSzlHO3lCQUNOO3FCQUVKLEVBQ0QsVUFBVSxFQUFDLG1CQUFtQixFQUM5QixJQUFJLEVBQUUsU0FBUyxFQUNmLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLE1BQU0sRUFBRSxVQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsRUFBRTs0QkFDcEIsSUFBSSxPQUFPLEdBQUcsOENBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDN0UsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3pCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDekI7NkJBQ0k7NEJBQ0QsSUFBSSxPQUFPLEdBQUcsOENBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNyRCxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDekIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUN0QixZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUN2QjtvQkFDTCxDQUFDLEVBQ0QsT0FBTyxFQUFFLFlBQVksRUFDckIsUUFBUSxFQUFFLGNBQU0sWUFBSyxFQUFMLENBQUssR0FDdkIsQ0FFQSxDQUNKO1FBQ04sNkRBQUssU0FBUyxFQUFDLGFBQWE7WUFDeEIsNkRBQUssU0FBUyxFQUFDLGdCQUFnQjtnQkFDM0IsZ0VBQVEsU0FBUyxFQUFDLDRCQUE0QixpQkFBYSxPQUFPLGlCQUFhLGdCQUFnQixxQkFBd0IsQ0FDckgsQ0FFSjtRQUVOLDZEQUFLLFNBQVMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLGVBQWU7WUFDckMsNkRBQUssU0FBUyxFQUFDLGNBQWM7Z0JBQ3pCLDZEQUFLLFNBQVMsRUFBQyxlQUFlO29CQUMxQiw2REFBSyxTQUFTLEVBQUMsY0FBYzt3QkFDekIsNERBQUksU0FBUyxFQUFDLGFBQWEsOEJBQTZCO3dCQUN4RCxnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxPQUFPLGtCQUFjLE9BQU8sYUFBaUIsQ0FDM0U7b0JBQ04sNkRBQUssU0FBUyxFQUFDLFlBQVk7d0JBQ3ZCLDZEQUFLLFNBQVMsRUFBQyxZQUFZOzRCQUN2QixnRkFBeUI7NEJBQ3pCLGdFQUFRLFNBQVMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFFLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsVUFBQyxHQUFHO29DQUM5RixjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2hGLENBQUMsSUFDSSxZQUFZLENBQUMsR0FBRyxDQUFDLGFBQUcsSUFBSSx1RUFBUSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBRyxHQUFHLENBQUMsV0FBVyxDQUFVLEVBQTlELENBQThELENBQUMsQ0FDbkYsQ0FDUCxDQUNKO29CQUNOLDZEQUFLLFNBQVMsRUFBQyxjQUFjO3dCQUN6QixnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsa0JBQWMsT0FBTyxFQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxXQUFlO3dCQUM1SSxnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxnQkFBZ0Isa0JBQWMsT0FBTyxZQUFlLENBQ2xGLENBRUosQ0FDSixDQUNKLENBRUosQ0FFVCxDQUFDO0FBRU4sQ0FBQztBQUVjLGtGQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7O0FDeE1uQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLDRCQUE0QjtBQUM1QixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBRWtCO0FBQ0E7QUFJOUMsU0FBUyxnQkFBZ0IsQ0FBQyxLQUErQjtJQUNyRCxJQUFJLE9BQU8sR0FBRyxtRUFBVSxFQUFFLENBQUM7SUFDckIsc0VBQThELEVBQTdELGNBQU0sRUFBRSxpQkFBcUQsQ0FBQztJQUMvRCw4RUFBNEUsRUFBM0UsaUJBQVMsRUFBRSxvQkFBZ0UsQ0FBQztJQUM3RSx3RUFBeUQsRUFBeEQsaUJBQVMsRUFBRSxvQkFBNkMsQ0FBQztJQUVoRSwrQ0FBZSxDQUFDO1FBQ1osU0FBUyxFQUFFLENBQUM7SUFDaEIsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFbEIsU0FBUyxTQUFTO1FBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILElBQUksRUFBRSxLQUFLO1lBQ1gsR0FBRyxFQUFLLFFBQVEsMEJBQXFCLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxZQUFTO1lBQzVELFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQU0sSUFBSSxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELFNBQVMsWUFBWSxDQUFDLElBQUk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEdBQUcsY0FBYyxFQUFFLE1BQU0sRUFBRSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbEgsQ0FBQztJQUVELE9BQU8sQ0FDSCw2REFBSyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUU7UUFDN0MsNkRBQUssU0FBUyxFQUFDLGFBQWE7WUFDeEIsNkRBQUssU0FBUyxFQUFDLEtBQUs7Z0JBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO29CQUNoQiwwRUFBZ0IsQ0FDZCxDQUNKLENBQ0o7UUFDTiw2REFBSyxTQUFTLEVBQUMsV0FBVztZQUN0Qiw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7Z0JBQzlGLG9EQUFDLCtEQUFLLElBQ0YsSUFBSSxFQUFFO3dCQUNGLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQzVGLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQ3pGLDRGQUE0Rjt3QkFDNUYsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDM0YsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtxQkFDckcsRUFDRCxVQUFVLEVBQUMsbUJBQW1CLEVBQzlCLElBQUksRUFBRSxNQUFNLEVBQ1osU0FBUyxFQUFFLFNBQVMsRUFDcEIsU0FBUyxFQUFFLFNBQVMsRUFDcEIsTUFBTSxFQUFFLFVBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksU0FBUyxFQUFFOzRCQUNwQixJQUFJLE9BQU8sR0FBRyw4Q0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxRSxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDekIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUN0Qjs2QkFDSTs0QkFDRCxJQUFJLE9BQU8sR0FBRyw4Q0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ2xELFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUN6QixTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ25CLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ3ZCO29CQUNMLENBQUMsRUFDRCxPQUFPLEVBQUUsWUFBWTtvQkFDckIsNkZBQTZGO29CQUM3RiwwR0FBMEc7b0JBQzFHLDJGQUEyRjtvQkFDM0YsUUFBUSxFQUFFLGNBQU0sWUFBSyxFQUFMLENBQUssR0FDdkIsQ0FFQSxDQUNKO1FBQ04sNkRBQUssU0FBUyxFQUFDLGFBQWEsR0FDdEIsQ0FDSixDQUVULENBQUM7QUFFTixDQUFDO0FBRWMsK0VBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM3R2hDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RyxnQ0FBZ0M7QUFDaEMsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLGtDQUFrQztBQUNsQyxtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFDSDtBQUdvRDtBQUNVO0FBRWxEO0FBWXhDLFNBQVMsaUJBQWlCLENBQUMsS0FBYTtJQUM5QixzRUFBMkQsRUFBMUQsZ0JBQVEsRUFBRSxtQkFBZ0QsQ0FBQztJQUM1RCxzRUFBZ0YsRUFBL0UsMEJBQWtCLEVBQUUsc0JBQTJELENBQUM7SUFDakYsc0VBQTJELEVBQTFELGdCQUFRLEVBQUUsbUJBQWdELENBQUM7SUFFNUQsbUZBQTZELEVBQTVELFlBQUksRUFBRSxlQUFzRCxDQUFDO0lBQzlELHFFQUErRCxFQUE5RCxzQkFBYyxFQUFFLHlCQUE4QyxDQUFDO0lBQ2hFLHlFQUE4RCxFQUE3RCxtQkFBVyxFQUFFLHNCQUFnRCxDQUFDO0lBQy9ELHlFQUE4RCxFQUE3RCxtQkFBVyxFQUFFLHNCQUFnRCxDQUFDO0lBQy9ELHlFQUE4RCxFQUE3RCxtQkFBVyxFQUFFLHNCQUFnRCxDQUFDO0lBQy9ELHNFQUFpRCxFQUFoRCxjQUFNLEVBQUUsZ0JBQXdDLENBQUM7SUFDbEQseUVBQTBELEVBQXpELGlCQUFTLEVBQUUsb0JBQThDLENBQUM7SUFDakUsK0NBQWUsQ0FBQztRQUNaLE9BQU8sRUFBRSxDQUFDO0lBRWQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsK0NBQWUsQ0FBQztRQUNaLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0VBQWdFLENBQUM7UUFDNUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFZixTQUFTLE9BQU87UUFDWixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLEtBQUs7WUFDWCxHQUFHLEVBQUssUUFBUSx1REFBa0QsS0FBSyxDQUFDLE1BQVE7WUFDaEYsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQVM7WUFDZCxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQ1IsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNsQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBSVAsQ0FBQztJQUVELFNBQVMsSUFBSTtRQUNULElBQUksSUFBSSxJQUFJLGVBQWUsRUFBRTtZQUN6QixpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsSUFBSSxJQUFJLElBQUksYUFBYSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqRSxpQkFBaUIsQ0FBQyxVQUFDLENBQUMsSUFBSyxRQUFDLEdBQUcsQ0FBQyxFQUFMLENBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksSUFBSSxJQUFJLGFBQWEsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEUsY0FBYyxDQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsU0FBUyxJQUFJO1FBQ1QsSUFBSSxJQUFJLElBQUksYUFBYSxJQUFJLGNBQWMsSUFBSSxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixJQUFJLElBQUksSUFBSSxhQUFhLElBQUksY0FBYyxHQUFHLENBQUM7WUFDM0MsaUJBQWlCLENBQUMsVUFBQyxDQUFDLElBQUssUUFBQyxHQUFHLENBQUMsRUFBTCxDQUFLLENBQUMsQ0FBQztJQUd4QyxDQUFDO0lBRUQsU0FBUyxZQUFZO1FBQ2pCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUU3QixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFDLFFBQVE7WUFDMUIsK0JBQStCO1lBQy9CLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUMxQixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQUksSUFBSSxXQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQWhDLENBQWdDLENBQUMsQ0FBQztnQkFDdEUsT0FBTyxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDO2dCQUM1QyxPQUFPLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDN0MsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2xDO2lCQUNJO2dCQUNELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBSSxJQUFJLFdBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO2dCQUN0RSxPQUFPLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUM7Z0JBQzVDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO2dCQUM5QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7d0NBRXRCLENBQUM7b0JBQ04sT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBSSxJQUFJLFdBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO29CQUNsRSxPQUFPLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUM1QixPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMxQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDdEIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMvQixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFvQixDQUFDOztnQkFOL0osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFOzRCQUF6QyxDQUFDO2lCQU9UO2dCQUNELE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQUksSUFBSSxXQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQXRELENBQXNELENBQUMsQ0FBQztnQkFDeEYsT0FBTyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO2dCQUN4QyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDNUIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFvQixDQUFDO2FBQzlKO1lBRUQsNkRBQTZEO1lBQzdELElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtnQkFDZCxJQUFJLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsQ0FBQyxJQUFLLFFBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQS9FLENBQStFLENBQUMsQ0FBQztnQkFDdEksSUFBSSxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsY0FBSSxJQUFJLFdBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBMUYsQ0FBMEYsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFJLElBQUksdUJBQWdCLENBQUMsT0FBTyxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsUUFBUSxJQUFJLElBQUksRUFBbEIsQ0FBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUF0RCxDQUFzRCxDQUFDLENBQUM7Z0JBQ3pOLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxjQUFJO29CQUMxQixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQW9CLENBQUM7Z0JBQzVHLENBQUMsQ0FBQzthQUNMO1lBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUNaLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDLElBQUssUUFBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsRUFBM0UsQ0FBMkUsQ0FBQyxDQUFDO2dCQUNsSSxJQUFJLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxjQUFJLElBQUksV0FBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUF4RixDQUF3RixDQUFDLENBQUMsTUFBTSxDQUFDLGNBQUksSUFBSSx1QkFBZ0IsQ0FBQyxPQUFPLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFsQixDQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQXRELENBQXNELENBQUMsQ0FBQztnQkFDdk4saUJBQWlCLENBQUMsT0FBTyxDQUFDLGNBQUk7b0JBQzFCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBb0IsQ0FBQztnQkFDbEksQ0FBQyxDQUFDO2FBQ0w7UUFFTCxDQUFDLENBQUM7UUFDRixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUssUUFBUSx3REFBbUQsS0FBSyxDQUFDLE1BQVE7WUFDakYsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO1lBQ3RHLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0osY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQ1IsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNsQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELE9BQU8sQ0FDSDtRQUVJLG9EQUFDLHFFQUFLLElBQUMsS0FBSyxFQUFFLDBCQUEwQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUMxRSxVQUFVLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxJQUFJLElBQUksZUFBZSxFQUMxRCxlQUFlLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxJQUFJLElBQUksYUFBYSxJQUFJLGNBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUNoSSxRQUFRLEVBQUUsVUFBQyxJQUFJLEVBQUUsR0FBRztnQkFDaEIsSUFBSSxDQUFDLEdBQUc7b0JBQ0osY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixJQUFJLElBQUksSUFBSSxHQUFHO29CQUNYLElBQUksRUFBRSxDQUFDO2dCQUNYLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRztvQkFDWixJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsRUFDRCxjQUFjLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ2pDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNyQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxrRUFBRyxHQUFHLEVBQUUsQ0FBQztnQkFBRSwyREFBRyxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUMsMEJBQTBCLEdBQUs7O2dCQUFFLENBQUM7b0JBQU0sRUFBbEgsQ0FBa0gsQ0FBQztZQUU5SixJQUFJLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxvREFBQyxzREFBYSxJQUFDLFFBQVEsRUFBRSxRQUFRLEVBQ3hELFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGNBQVEsQ0FBQyxFQUNwRyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ2xDLElBQUksSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLG9EQUFDLG9EQUFXLElBQUMsUUFBUSxFQUFFLFFBQVEsRUFDcEQsT0FBTyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBQyxDQUFDLElBQUssa0JBQVcsQ0FBQyxVQUFDLEdBQUcsSUFBTyxJQUFJLE9BQU8sR0FBRyxnREFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXRHLENBQXNHLEVBQUUsV0FBVyxFQUFFLFdBQVcsR0FDcEwsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNUO1FBQ1Isb0RBQUMsdUVBQU8sSUFBQyxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLDRFQUE0RSxFQUN2SCxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxVQUFDLElBQUksSUFBTyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUk7Z0JBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFJO1FBQ3hHLG9EQUFDLHVFQUFPLElBQUMsS0FBSyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxvRkFBb0YsRUFDaEksSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBQyxJQUFJLElBQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQUUsWUFBWSxFQUFFLENBQUM7YUFBRSxDQUFDLENBQUMsR0FBSTtRQUN2RyxvREFBQyw2RUFBYSxJQUFDLElBQUksRUFBRSxXQUFXLEdBQUk7UUFDcEMsb0RBQUMsdUVBQU8sSUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxrRUFBa0UsRUFDaEcsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBQyxJQUFJLElBQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFLLENBQzVGLENBQUMsQ0FBQztBQUViLENBQUM7QUFFYyxnRkFBaUIsRUFBQzs7Ozs7Ozs7Ozs7OztBQ3pOakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLDBCQUEwQjtBQUMxQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsa0NBQWtDO0FBQ2xDLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBQ3lCO0FBQ0g7QUFhbEQsU0FBUyxXQUFXLENBQUMsS0FBYTtJQUN4QixzRUFBbUQsRUFBbEQsWUFBSSxFQUFFLGVBQTRDLENBQUM7SUFFMUQsK0NBQWUsQ0FBQztRQUNaLGVBQWUsRUFBRSxDQUFDO0lBQ3RCLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFHcEMsU0FBUyxlQUFlO1FBQ3BCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUMxQixPQUFPO1FBRVgsSUFBSSxJQUFJLEdBQWtCLEVBQUUsQ0FBQztRQUU3QixLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ2hDLElBQUksT0FBTyxHQUFHLGdEQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBRyxJQUFJLFVBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQztZQUM1RSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDZixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRTFDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPO2dCQUMxQixPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDcEMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQVMsYUFBYSxDQUFDLFFBQWdCO1FBQ25DLElBQUksT0FBTyxHQUFHLGdEQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQUMsSUFBSSxRQUFDLElBQUksUUFBUSxFQUFiLENBQWEsQ0FBQyxDQUFDO1FBQzNELElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztZQUNYLE9BQU87UUFDWCxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsU0FBUyxhQUFhLENBQUMsT0FBb0I7UUFDdkMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsYUFBRyxJQUFJLFVBQUcsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlFLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztZQUNYLE9BQU87UUFDWCxJQUFJLE9BQU8sR0FBRyxnREFBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBRS9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFFL0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUVyRCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxPQUFPLENBQ0g7UUFDSSw2REFBSyxTQUFTLEVBQUMsS0FBSztZQUNoQiw2REFBSyxTQUFTLEVBQUMsS0FBSztnQkFDaEIsNkRBQUssU0FBUyxFQUFDLHFCQUFxQixFQUFDLElBQUksRUFBQyxPQUFPO29CQUM3Qyw0REFBSSxTQUFTLEVBQUMsZUFBZTs7d0JBQWUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFROzt3QkFBUSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVE7O3dCQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTTs7d0JBQVEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNOzRCQUFPLENBQzVOLENBQ0osQ0FDSjtRQUNOLDZEQUFLLFNBQVMsRUFBQyxLQUFLO1lBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dCQUNoQiw2REFBSyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7b0JBQ3BHLCtEQUFPLFNBQVMsRUFBQyxPQUFPO3dCQUNwQjs0QkFDSTtnQ0FDSSw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGNBQWM7Z0NBQzFDLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYTtnQ0FDekMsNERBQUksT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGVBQWU7Z0NBRXZELDREQUFJLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSx5QkFBeUI7Z0NBQ2pFLDREQUFJLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSw2QkFBNkI7Z0NBQ3JFLDREQUFJLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSwwQkFBMEI7Z0NBQ2xFLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUscUJBQXFCO2dDQUNqRCw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQU8sQ0FDOUI7NEJBQ0w7Z0NBQ0ksNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFPO2dDQUNuQyw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQU87Z0NBRW5DLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVztnQ0FDdkMsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTO2dDQUVyQyw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVM7Z0NBQ3JDLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBVztnQ0FDdkMsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTO2dDQUNyQyw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVM7Z0NBRXJDLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUztnQ0FDckMsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFXO2dDQUN2Qyw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVM7Z0NBQ3JDLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUztnQ0FFckMsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTO2dDQUNyQyw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVc7Z0NBQ3ZDLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUztnQ0FDckMsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTO2dDQUVyQyw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQU87Z0NBQ25DLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBTyxDQUM5QixDQUNEO3dCQUNSLG1FQUNLLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLDJEQUFDLGFBQWEsSUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUksRUFBM0YsQ0FBMkYsQ0FBQyxDQUM1RyxDQUNKLENBQ04sQ0FDSixDQUNKO1FBQ04sNkRBQUssU0FBUyxFQUFDLEtBQUs7WUFDaEIsNkRBQUssU0FBUyxFQUFDLEtBQUssR0FFZCxDQUNKLENBQ1AsQ0FDTixDQUFDO0FBQ04sQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLEtBQXNIO0lBQ3pJLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5RixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUYsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUM1RCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzVELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3pELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3pELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7SUFFOUMsT0FBTyxDQUNIO1FBQ0ksNERBQUksS0FBSyxFQUFFLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQzs7WUFBVyxLQUFLLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBTTtRQUNsRTtZQUFJLG9EQUFDLCtEQUFLLElBQWMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBTSxXQUFJLEVBQUosQ0FBSSxHQUFJLENBQUs7UUFDdkosNERBQUksS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFNO1FBQ3BFLDREQUFJLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBTTtRQUVsRSw0REFBSSxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBTTtRQUM1RCw0REFBSSxLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBTTtRQUM1RDtZQUFJLG9EQUFDLCtEQUFLLElBQWMsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQU0sV0FBSSxFQUFKLENBQUksR0FBSSxDQUFLO1FBQzVJO1lBQUksb0RBQUMsK0RBQUssSUFBYyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBTSxXQUFJLEVBQUosQ0FBSSxHQUFJLENBQUs7UUFDNUksNERBQUksS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDNUQsNERBQUksS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQU07UUFDNUQ7WUFBSSxvREFBQywrREFBSyxJQUFjLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFNLFdBQUksRUFBSixDQUFJLEdBQUksQ0FBSztRQUM1STtZQUFJLG9EQUFDLCtEQUFLLElBQWMsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQU0sV0FBSSxFQUFKLENBQUksR0FBSSxDQUFLO1FBQzVJLDREQUFJLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFNO1FBQzVELDREQUFJLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFNO1FBQzVELDREQUFJLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFNO1FBQzVELDREQUFJLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFNO1FBQzVEO1lBQUksb0RBQUMsK0RBQUssSUFBYyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFNLFdBQUksRUFBSixDQUFJLEdBQUksQ0FBSztRQUM5Siw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1lB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OlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFzc2V0LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEFzc2V0SW5mb1dpbmRvdyBmcm9tICcuL0Fzc2V0SW5mbyc7XHJcbmltcG9ydCBBc3NldExvY2F0aW9uV2luZG93IGZyb20gJy4vQXNzZXRMb2NhdGlvbic7XHJcbmltcG9ydCBBc3NldE1ldGVyV2luZG93IGZyb20gJy4vQXNzZXRNZXRlcic7XHJcbmltcG9ydCBFeHRlcm5hbERCVXBkYXRlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZSc7XHJcblxyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBOb3RlV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvTm90ZVdpbmRvdyc7XHJcbmltcG9ydCBBc3NldENvbm5lY3Rpb25XaW5kb3cgZnJvbSAnLi9Bc3NldENvbm5lY3Rpb24nO1xyXG5pbXBvcnQgQWRkaXRpb25hbEZpZWxkc1dpbmRvdyBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0FkZGl0aW9uYWxGaWVsZHNXaW5kb3cnO1xyXG5pbXBvcnQgeyBnZXRBc3NldFR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vVFMvU2VydmljZXMvQXNzZXQnO1xyXG5pbXBvcnQgTGluZVNlZ21lbnRXaW5kb3cgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvTGluZVNlZ21lbnRXaW5kb3cnO1xyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5kZWNsYXJlIHR5cGUgVGFiID0gJ25vdGVzJyB8ICdhc3NldEluZm8nIHwgJ3N1YnN0YXRpb25zJyB8ICdtZXRlcnMnIHwgJ2Nvbm5lY3Rpb25zJyB8ICdhZGRpdGlvbmFsRmllbGRzJyB8ICdleHREQicgfCAnU2VnbWVudHMnXHJcblxyXG5mdW5jdGlvbiBBc3NldChwcm9wczogeyBBc3NldElEOiBudW1iZXIgfSkge1xyXG4gICAgbGV0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XHJcbiAgICBjb25zdCBbYXNzZXQsIHNldEFzc2V0XSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXQ+KG51bGwpO1xyXG4gICAgY29uc3QgW3RhYiwgc2V0VGFiU3RhdGVdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPihnZXRUYWIoKSk7XHJcbiAgICBjb25zdCBbYXNzZXRUeXBlLCBzZXRBc3NldFR5cGVdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldFR5cGVOYW1lPihudWxsKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUYWIoKTogVGFiIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ0Fzc2V0LlRhYicpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdBc3NldC5UYWInKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJ25vdGVzJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRUYWIodGFiOiBUYWIpOiB2b2lkIHtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdBc3NldC5UYWInLCBKU09OLnN0cmluZ2lmeSh0YWIpKTtcclxuICAgICAgICBzZXRUYWJTdGF0ZSh0YWIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFzc2V0KCkge1xyXG4gICAgICAgIHJldHVybiAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0L09uZS8ke3Byb3BzLkFzc2V0SUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBc3NldFR5cGUoYXNzZXQ6IE9wZW5YREEuQXNzZXQpOiB2b2lkIHtcclxuICAgICAgICBnZXRBc3NldFR5cGVzKCkuZG9uZSgoYXNzZXRUeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhc3NldFR5cGUgPSBhc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gYXNzZXRbJ0Fzc2V0VHlwZUlEJ10pXHJcbiAgICAgICAgICAgIHNldEFzc2V0VHlwZShhc3NldFR5cGUuTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlQXNzZXQoKTogSlF1ZXJ5LmpxWEhSIHtcclxuXHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIlRoaXMgd2lsbCBkZWxldGUgdGhlIEFzc2V0IFBlcm1hbmVudGx5XCIpO1xyXG4gICAgICAgIGlmICghcmVzcG9uc2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvRGVsZXRlYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShhc3NldCksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9QXNzZXRzJywgc3RhdGU6IHt9IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHByb3BzLkFzc2V0SUQgPT0gdW5kZWZpbmVkKSByZXR1cm4gKCkgPT4geyB9O1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSBnZXRBc3NldCgpO1xyXG5cclxuICAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogT3BlblhEQS5Bc3NldCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRBc3NldChkYXRhKVxyXG4gICAgICAgICAgICBnZXRBc3NldFR5cGUoZGF0YSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPSB1bmRlZmluZWQpIGhhbmRsZS5hYm9ydCgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfSwgW3Byb3BzLkFzc2V0SURdKTtcclxuXHJcbiAgICBpZiAoYXNzZXQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2MywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2Mywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nOiAxNSB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPnthc3NldCAhPSBudWxsID8gYXNzZXQuQXNzZXRLZXkgOiAnJ308L2gyPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgcHVsbC1yaWdodFwiIGhpZGRlbj17YXNzZXQgPT0gbnVsbH0gb25DbGljaz17KCkgPT4gZGVsZXRlQXNzZXQoKX0+RGVsZXRlIEFzc2V0IChQZXJtYW5lbnQpPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIj5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcIm5vdGVzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ25vdGVzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNub3Rlc1wiPk5vdGVzPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcImFzc2V0SW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdhc3NldEluZm8nKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2Fzc2V0SW5mb1wiPkFzc2V0IEluZm88L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiYWRkaXRpb25hbEZpZWxkc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdhZGRpdGlvbmFsRmllbGRzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNhZGRpdGlvbmFsRmllbGRzXCI+QWRkaXRpb25hbCBGaWVsZHM8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwic3Vic3RhdGlvbnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignc3Vic3RhdGlvbnMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI3N1YnN0YXRpb25zXCI+U3Vic3RhdGlvbnM8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwibWV0ZXJzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ21ldGVycycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbWV0ZXJzXCI+TWV0ZXJzPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcImNvbm5lY3Rpb25zXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2Nvbm5lY3Rpb25zJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNjb25uZWN0aW9uc1wiPkNvbm5lY3Rpb25zPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIHsoYXNzZXRUeXBlID09ICdMaW5lJyk/XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcIlNlZ21lbnRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ1NlZ21lbnRzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNTZWdtZW50c1wiPkxpbmUgU2VnbWVudHM8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT4gOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB7KGFzc2V0VHlwZSA9PSAnQnJlYWtlcicgfHwgYXNzZXRUeXBlID09ICdDYXBhY2l0b3JCYW5rJyB8fCBhc3NldFR5cGUgPT0gJ0xpbmUnIHx8IGFzc2V0VHlwZSA9PSAnVHJhbnNmb3JtZXInIHx8IGFzc2V0VHlwZSA9PSAnQnVzJykgP1xyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJleHREQlwiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdleHREQicpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjZXh0REJcIj5FeHRlcm5hbCBEQjwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPiA6IG51bGxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCIgc3R5bGU9e3ttYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDIzNSwgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwibm90ZXNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cIm5vdGVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5vdGVXaW5kb3cgSUQ9e2Fzc2V0LklEfSBUeXBlPSdBc3NldCcgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwiYXNzZXRJbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJhc3NldEluZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8QXNzZXRJbmZvV2luZG93IEFzc2V0PXthc3NldH0gU3RhdGVTZXR0ZXI9e3NldEFzc2V0fSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJhZGRpdGlvbmFsRmllbGRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJhZGRpdGlvbmFsRmllbGRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFkZGl0aW9uYWxGaWVsZHNXaW5kb3cgSUQ9e2Fzc2V0LklEfSBUeXBlPXsoYXNzZXRUeXBlID09IG51bGwpID8gXCJBc3NldFwiIDogYXNzZXRUeXBlfSBUYWI9e3RhYn0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJzdWJzdGF0aW9uc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwic3Vic3RhdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8QXNzZXRMb2NhdGlvbldpbmRvdyBBc3NldD17YXNzZXR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcIm1ldGVyc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwibWV0ZXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFzc2V0TWV0ZXJXaW5kb3cgQXNzZXQ9e2Fzc2V0fSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJjb25uZWN0aW9uc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiY29ubmVjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8QXNzZXRDb25uZWN0aW9uV2luZG93IEFzc2V0PXthc3NldH0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwiZXh0REJcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImV4dERCXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEV4dGVybmFsREJVcGRhdGUgSUQ9e2Fzc2V0LklEfSBUeXBlPXsoYXNzZXRUeXBlID09IG51bGwpID8gXCJBc3NldFwiIDogYXNzZXRUeXBlfSBUYWI9e3RhYn0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGFiID09IFwiU2VnbWVudHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cIlNlZ21lbnRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmVTZWdtZW50V2luZG93IElEPXthc3NldC5JRH0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgICAgICBcclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXNzZXQ7XHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBMb2NhdGlvbk1ldGVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMS8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IFRhYmxlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvVGFibGUnO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5pbnRlcmZhY2UgQXNzZXRDb25uZWN0aW9uIHtcclxuICAgIEFzc2V0UmVsYXRpb25TaGlwVHlwZUlEOiBudW1iZXIsXHJcbiAgICBOYW1lOiBzdHJpbmcsXHJcbiAgICBBc3NldElEOiBudW1iZXIsXHJcbiAgICBBc3NldEtleTogc3RyaW5nXHJcbn1cclxuZnVuY3Rpb24gQXNzZXRDb25uZWN0aW9uV2luZG93KHByb3BzOiB7IEFzc2V0OiBPcGVuWERBLkFzc2V0IH0pOiBKU1guRWxlbWVudHtcclxuICAgIGxldCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xyXG4gICAgY29uc3QgW2Fzc2V0Q29ubmVjdGlvbnMsIHNldEFzc2V0Q29ubmVjdGlvbnNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8QXNzZXRDb25uZWN0aW9uPj4oW10pO1xyXG4gICAgY29uc3QgW2Fzc2V0Q29ubmVjdGlvblR5cGVzLCBzZXRBc3NldENvbm5lY3Rpb25UeXBlc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvblR5cGU+PihbXSk7XHJcbiAgICBjb25zdCBbbmV3QXNzZXRDb25uZWN0aW9uLCBzZXROZXdBc3NldENvbm5lY3Rpb25dID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+KHtJRDogMCwgQXNzZXRSZWxhdGlvbnNoaXBUeXBlSUQ6IDAsIFBhcmVudDogJycsIENoaWxkOiAnJ30pO1xyXG4gICAgY29uc3QgW2xvY2FsQXNzZXRzLCBzZXRMb2NhbEFzc2V0c10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkFzc2V0Pj4oW10pO1xyXG5cclxuICAgIGNvbnN0IFtzb3J0RmllbGQsIHNldFNvcnRGaWVsZF0gPSBSZWFjdC51c2VTdGF0ZTxrZXlvZiAoQXNzZXRDb25uZWN0aW9uKT4oJ0Fzc2V0S2V5Jyk7XHJcbiAgICBjb25zdCBbYXNjZW5kaW5nLCBzZXRBc2NlbmRpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXREYXRhKCk7XHJcbiAgICB9LCBbcHJvcHMuQXNzZXRdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gICAgICAgIGdldEFzc2V0Q29ubmVjdGlvblR5cGVzKCk7XHJcbiAgICAgICAgZ2V0QXNzZXRDb25uZWN0aW9ucygpO1xyXG4gICAgICAgIGdldExvY2FsQXNzZXRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QXNzZXRDb25uZWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7cHJvcHMuQXNzZXQuSUR9L0Fzc2V0Q29ubmVjdGlvbnNgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoYWNzID0+IHNldEFzc2V0Q29ubmVjdGlvbnMoYWNzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TG9jYWxBc3NldHMoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC8ke3Byb3BzLkFzc2V0LklEfS9Bc3NldE5lYXJgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUobGFzID0+IHNldExvY2FsQXNzZXRzKGxhcykpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBc3NldENvbm5lY3Rpb25UeXBlcygpOiB2b2lkIHtcclxuICAgICAgICBpZihzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnT3BlblhEQS5Bc3NldENvbm5lY3Rpb25UeXBlcycpKVxyXG4gICAgICAgICAgICBzZXRBc3NldENvbm5lY3Rpb25UeXBlcyhKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ09wZW5YREEuQXNzZXRDb25uZWN0aW9uVHlwZXMnKSkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldENvbm5lY3Rpb25UeXBlYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChhY3RzOiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvblR5cGU+KSA9PiB7XHJcbiAgICAgICAgICAgIHNldEFzc2V0Q29ubmVjdGlvblR5cGVzKGFjdHMpO1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdPcGVuWERBLkFzc2V0Q29ubmVjdGlvblR5cGVzJywgSlNPTi5zdHJpbmdpZnkoYWN0cykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUFzc2V0Q29ubmVjdGlvbihjb25uZWN0aW9uOiBBc3NldENvbm5lY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC8ke3Byb3BzLkFzc2V0LklEfS9Bc3NldC8ke2Nvbm5lY3Rpb24uQXNzZXRJRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKGFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4pID0+IHtcclxuICAgICAgICAgICAgZ2V0RGF0YSgpO1xyXG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXHJcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ29ubmVjdGlvbigpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldENvbm5lY3Rpb24vQWRkYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7SUQ6IDAsIEFzc2V0UmVsYXRpb25zaGlwVHlwZUlEOiBuZXdBc3NldENvbm5lY3Rpb24uQXNzZXRSZWxhdGlvbnNoaXBUeXBlSUQsIFBhcmVudElEOiBwcm9wcy5Bc3NldC5JRCwgQ2hpbGRJRDogcGFyc2VJbnQobmV3QXNzZXRDb25uZWN0aW9uLkNoaWxkKX0pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoY29ubmVjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0KGl0ZW0pIHtcclxuICAgICAgICBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9QXNzZXQmQXNzZXRJRD0nICsgaXRlbS5yb3cuQXNzZXRJRCwgc3RhdGU6IHt9IH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5NZXRlcnM6PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzODEsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFibGU8QXNzZXRDb25uZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0S2V5JywgbGFiZWw6ICdBc3NldCcsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnNDclJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzQ3JScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJywgbGFiZWw6ICdSZWxhdGlvbnNoaXAnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzQ3JScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICc0NyUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICc2JScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICc2JScgfSwgY29udGVudDogKGFzc2V0LCBrZXksIHN0eWxlKSA9PiA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQXNzZXRDb25uZWN0aW9uKGFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ2xhc3M9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2Fzc2V0Q29ubmVjdGlvbnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KGFzc2V0Q29ubmVjdGlvbnMsIFtkLmNvbF0sIFsoIWFzY2VuZGluZyA/IFwiYXNjXCIgOiBcImRlc2NcIildKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNzZXRDb25uZWN0aW9ucyhvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KGFzc2V0Q29ubmVjdGlvbnMsIFtkLmNvbF0sIFtcImFzY1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzc2V0Q29ubmVjdGlvbnMob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkKGQuY29sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KCkgPT4gZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI2Nvbm5lY3Rpb25Nb2RhbCc+QWRkIENvbm5lY3Rpb248L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgaWQ9XCJjb25uZWN0aW9uTW9kYWxcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj5BZGQgQXNzZXQgdG8gQXNzZXQgQ29ubmVjdGlvbjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+QXNzZXQ6PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXtuZXdBc3NldENvbm5lY3Rpb24gIT0gbnVsbCA/IG5ld0Fzc2V0Q29ubmVjdGlvbi5DaGlsZCA6ICcwJ30gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHIgPSBfLmNsb25lKG5ld0Fzc2V0Q29ubmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuQ2hpbGQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdBc3NldENvbm5lY3Rpb24ocik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsb2NhbEFzc2V0cy5tYXAoYWxzID0+IDxvcHRpb24gdmFsdWU9e2Fscy5JRH0ga2V5PXthbHMuSUR9PnthbHMuQXNzZXRLZXl9PC9vcHRpb24+KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFzc2V0IENvbm5lY3Rpb24gVHlwZTo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e25ld0Fzc2V0Q29ubmVjdGlvbiAhPSBudWxsID8gbmV3QXNzZXRDb25uZWN0aW9uLkFzc2V0UmVsYXRpb25zaGlwVHlwZUlEIDogJzAnfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgciA9IF8uY2xvbmUobmV3QXNzZXRDb25uZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgci5Bc3NldFJlbGF0aW9uc2hpcFR5cGVJRCA9IGFzc2V0Q29ubmVjdGlvblR5cGVzLmZpbmQobCA9PiBsLklELnRvU3RyaW5nKCkgPT0gZXZ0LnRhcmdldC52YWx1ZSkuSURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TmV3QXNzZXRDb25uZWN0aW9uKHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YXNzZXRDb25uZWN0aW9uVHlwZXMubWFwKGFscyA9PiA8b3B0aW9uIHZhbHVlPXthbHMuSUR9IGtleT17YWxzLklEfT57YWxzLk5hbWV9PC9vcHRpb24+KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17YWRkQ29ubmVjdGlvbn0+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICApO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXNzZXRDb25uZWN0aW9uV2luZG93OyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBNZXRlckluZm8udHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMTksIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA5LzA5LzIwMTkgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBBc3NldEF0dHJpYnV0ZXMgfSBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XHJcbmltcG9ydCB7IGdldEFsbEFzc2V0cywgZ2V0QXNzZXRUeXBlcywgZ2V0QXNzZXRXaXRoQWRkaXRpb25hbEZpZWxkcywgZWRpdEV4aXN0aW5nQXNzZXR9IGZyb20gJy4uLy4uLy4uL1RTL1NlcnZpY2VzL0Fzc2V0JztcclxuaW1wb3J0IEJyZWFrZXJBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXInO1xyXG5pbXBvcnQgQnVzQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9CdXMnO1xyXG5pbXBvcnQgQ2FwQmFua0F0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQ2FwQmFuayc7XHJcbmltcG9ydCBMaW5lQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9MaW5lJztcclxuaW1wb3J0IFRyYW5zZm9ybWVyQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9UcmFuc2Zvcm1lcic7XHJcbmltcG9ydCBMaW5lU2VnbWVudEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvTGluZVNlZ21lbnQnO1xyXG5pbXBvcnQgQ2FwQmFua1JlbGF5QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rUmVsYXknO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzc2V0SW5mb1dpbmRvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IEFzc2V0OiBPcGVuWERBLkFzc2V0LCBTdGF0ZVNldHRlcjogKGFzc2V0OiBPcGVuWERBLkFzc2V0KSA9PiB2b2lkIH0sIHsgQXNzZXQ6IE9wZW5YREEuQXNzZXQsIEFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPiwgQWxsQXNzZXRzOiBPcGVuWERBLkFzc2V0W119LCB7fT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIEFzc2V0OiB0aGlzLnByb3BzLkFzc2V0LFxyXG4gICAgICAgICAgICBBc3NldFR5cGVzOiBbXSxcclxuICAgICAgICAgICAgQWxsQXNzZXRzOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IHRoaXMudXBkYXRlU3RhdGUuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBnZXRBc3NldFR5cGVzKCkuZG9uZSgoYXNzZXRUeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBc3NldFR5cGVzOiBhc3NldFR5cGVzIH0pO1xyXG4gICAgICAgICAgICBsZXQgYXNzZXRUeXBlID0gYXNzZXRUeXBlcy5maW5kKGF0ID0+IGF0LklEID09IHRoaXMuc3RhdGUuQXNzZXRbJ0Fzc2V0VHlwZUlEJ10pXHJcblxyXG4gICAgICAgICAgICBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzKHRoaXMucHJvcHMuQXNzZXQuSUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKGFzc2V0ID0+IHRoaXMuc2V0U3RhdGUoe0Fzc2V0OiBhc3NldH0pKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBnZXRBbGxBc3NldHMoKS5kb25lKGFhcyA9PiB0aGlzLnNldFN0YXRlKHsgQWxsQXNzZXRzOiBhYXMgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG5leHRQcm9wcy5Bc3NldCAhPSB0aGlzLnN0YXRlLkFzc2V0KVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQXNzZXQ6IG5leHRQcm9wcy5Bc3NldCB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXNzZXRUeXBlID0gdGhpcy5zdGF0ZS5Bc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gdGhpcy5zdGF0ZS5Bc3NldFsnQXNzZXRUeXBlSUQnXSlcclxuICAgICAgICAgICAgICAgIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHModGhpcy5zdGF0ZS5Bc3NldC5JRCwgYXNzZXRUeXBlLk5hbWUpLnRoZW4oYXNzZXQgPT4gdGhpcy5zZXRTdGF0ZSh7IEFzc2V0OiBhc3NldCB9KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBdHRyaWJ1dGVzKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5Bc3NldC5Bc3NldFR5cGUgPT0gJ0JyZWFrZXInKVxyXG4gICAgICAgICAgICByZXR1cm4gPEJyZWFrZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9eydFZGl0J30gQXNzZXQ9e3RoaXMuc3RhdGUuQXNzZXQgYXMgT3BlblhEQS5CcmVha2VyfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gU2hvd1NwYXJlPXt0cnVlfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLkFzc2V0LkFzc2V0VHlwZSA9PSAnQnVzJylcclxuICAgICAgICAgICAgcmV0dXJuIDxCdXNBdHRyaWJ1dGVzIE5ld0VkaXQ9eydFZGl0J30gQXNzZXQ9e3RoaXMuc3RhdGUuQXNzZXR9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLkFzc2V0LkFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFuaycpXHJcbiAgICAgICAgICAgIHJldHVybiA8Q2FwQmFua0F0dHJpYnV0ZXMgTmV3RWRpdD17J0VkaXQnfSBBc3NldD17dGhpcy5zdGF0ZS5Bc3NldCBhcyBPcGVuWERBLkNhcEJhbmt9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLkFzc2V0LkFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFua1JlbGF5JylcclxuICAgICAgICAgICAgcmV0dXJuIDxDYXBCYW5rUmVsYXlBdHRyaWJ1dGVzIE5ld0VkaXQ9eydFZGl0J30gQXNzZXQ9e3RoaXMuc3RhdGUuQXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rUmVsYXl9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLkFzc2V0LkFzc2V0VHlwZSA9PSAnTGluZScpXHJcbiAgICAgICAgICAgIHJldHVybiA8TGluZUF0dHJpYnV0ZXMgTmV3RWRpdD17J0VkaXQnfSBBc3NldD17dGhpcy5zdGF0ZS5Bc3NldCBhcyBPcGVuWERBLkxpbmV9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLkFzc2V0LkFzc2V0VHlwZSA9PSAnVHJhbnNmb3JtZXInKVxyXG4gICAgICAgICAgICByZXR1cm4gPFRyYW5zZm9ybWVyQXR0cmlidXRlcyBOZXdFZGl0PXsnRWRpdCd9IEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0IGFzIE9wZW5YREEuVHJhbnNmb3JtZXJ9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLkFzc2V0LkFzc2V0VHlwZSA9PSAnTGluZVNlZ21lbnQnKVxyXG4gICAgICAgICAgICByZXR1cm4gPExpbmVTZWdtZW50QXR0cmlidXRlcyBOZXdFZGl0PXsnRWRpdCd9IEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnR9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPjtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZVN0YXRlKGFzc2V0OiBPcGVuWERBLkFzc2V0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEFzc2V0OiBhc3NldCB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuQXNzZXQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkFzc2V0IEluZm9ybWF0aW9uOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7IGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXNzZXRBdHRyaWJ1dGVzLkFzc2V0QXR0cmlidXRlRmllbGRzIEFzc2V0PXt0aGlzLnN0YXRlLkFzc2V0fSBOZXdFZGl0PSdFZGl0JyBBc3NldFR5cGVzPXt0aGlzLnN0YXRlLkFzc2V0VHlwZXN9IEFsbEFzc2V0cz17dGhpcy5zdGF0ZS5BbGxBc3NldHN9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSBHZXREaWZmZXJlbnRBc3NldD17KCkgPT4geyB9fSBIaWRlQXNzZXRUeXBlPXtmYWxzZX0gSGlkZVNlbGVjdEFzc2V0PXt0cnVlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnNob3dBdHRyaWJ1dGVzKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0RXhpc3RpbmdBc3NldCh0aGlzLnN0YXRlLkFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU3RhdGVTZXR0ZXIodGhpcy5zdGF0ZS5Bc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19IGRpc2FibGVkPXt0aGlzLnN0YXRlLkFzc2V0ID09IHRoaXMucHJvcHMuQXNzZXR9PlNhdmUgQ2hhbmdlczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFN0YXRlKHsgQXNzZXQ6IHRoaXMucHJvcHMuQXNzZXQgfSl9IGRpc2FibGVkPXt0aGlzLnN0YXRlLkFzc2V0ID09IHRoaXMucHJvcHMuQXNzZXR9PkNsZWFyIENoYW5nZXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQXNzZXRMb2NhdGlvbi50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjQvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IFRhYmxlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvVGFibGUnO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5mdW5jdGlvbiBBc3NldExvY2F0aW9uV2luZG93KHByb3BzOiB7IEFzc2V0OiBPcGVuWERBLkFzc2V0IH0pOiBKU1guRWxlbWVudHtcclxuICAgIGxldCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xyXG4gICAgY29uc3QgW2xvY2F0aW9ucywgc2V0TG9jYXRpb25zXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuTG9jYXRpb24+PihbXSk7XHJcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8a2V5b2YgKE9wZW5YREEuTG9jYXRpb24pPignTG9jYXRpb25LZXknKTtcclxuICAgIGNvbnN0IFthc2NlbmRpbmcsIHNldEFzY2VuZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuICAgIGNvbnN0IFthbGxMb2NhdGlvbnMsIHNldEFsbExvY2F0aW9uc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkxvY2F0aW9uPj4oW10pO1xyXG4gICAgY29uc3QgW25ld0xvY2F0aW9uLCBzZXROZXdMb2NhdGlvbl0gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLkxvY2F0aW9uPigpO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXREYXRhKCk7XHJcbiAgICB9LCBbcHJvcHMuQXNzZXRdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gICAgICAgIGdldExvY2F0aW9ucygpO1xyXG4gICAgICAgIGdldEFsbE90aGVyTG9jYXRpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TG9jYXRpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvJHtwcm9wcy5Bc3NldC5JRH0vTG9jYXRpb25zYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKGRhdGEgPT4gc2V0TG9jYXRpb25zKGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBbGxPdGhlckxvY2F0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7cHJvcHMuQXNzZXQuSUR9L090aGVyTG9jYXRpb25zYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkcyA9IF8ub3JkZXJCeShkYXRhLCBbJ0xvY2F0aW9uS2V5J10sIFsnYXNjJ10pO1xyXG4gICAgICAgICAgICBzZXRBbGxMb2NhdGlvbnMocmVjb3Jkcyk7XHJcbiAgICAgICAgICAgIHNldE5ld0xvY2F0aW9uKHJlY29yZHNbMF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBkZWxldGVMb2NhdGlvbihsb2NhdGlvbjogT3BlblhEQS5Mb2NhdGlvbikge1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7cHJvcHMuQXNzZXQuSUR9L0xvY2F0aW9uLyR7bG9jYXRpb24uSUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChhc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+KSA9PiB7XHJcbiAgICAgICAgICAgIGdldERhdGEoKTtcclxuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxyXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGFkZExvY2F0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC8ke3Byb3BzLkFzc2V0LklEfS9Mb2NhdGlvbi8ke25ld0xvY2F0aW9uLklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZShyZWNvcmQgPT4ge1xyXG4gICAgICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxlY3QoaXRlbSwgZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmxvY2FsTmFtZSA9PSAndGQnKVxyXG4gICAgICAgICAgICBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9TG9jYXRpb24mTG9jYXRpb25JRD0nICsgaXRlbS5yb3cuSUQsIHN0YXRlOiB7fSB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+U3Vic3RhdGlvbnM6PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzODEsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8VGFibGU8T3BlblhEQS5Mb2NhdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29scz17W1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdMb2NhdGlvbktleScsIGxhYmVsOiAnS2V5JywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICczMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMzAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05hbWUnLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzMwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICczMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTGF0aXR1ZGUnLCBsYWJlbDogJ0xhdGl0dWRlJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xvbmdpdHVkZScsIGxhYmVsOiAnTG9uZ2l0dWRlJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdjYWxjKDEwJSknIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgY29udGVudDogKGFzc2V0LCBrZXksIHN0eWxlKSA9PiA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlTG9jYXRpb24oYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17bG9jYXRpb25zfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShsb2NhdGlvbnMsIFtkLmNvbF0sIFsoIWFzY2VuZGluZyA/IFwiYXNjXCIgOiBcImRlc2NcIildKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TG9jYXRpb25zKG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyZWQgPSBfLm9yZGVyQnkobG9jYXRpb25zLCBbZC5jb2xdLCBbXCJhc2NcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRMb2NhdGlvbnMob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkKGQuY29sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KCkgPT4gZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI2xvY2F0aW9uTW9kYWwnPkFkZCBTdWJzdGF0aW9uPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIGlkPVwibG9jYXRpb25Nb2RhbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPkFkZCBTdWJzdGF0aW9uIHRvIEFzc2V0PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5TdWJzdGF0aW9uPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXtuZXdMb2NhdGlvbiAhPSBudWxsID8gbmV3TG9jYXRpb24uSUQgOiAnMCd9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0xvY2F0aW9uKGFsbExvY2F0aW9ucy5maW5kKGwgPT4gbC5JRC50b1N0cmluZygpID09IGV2dC50YXJnZXQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2FsbExvY2F0aW9ucy5tYXAoYWxzID0+IDxvcHRpb24gdmFsdWU9e2Fscy5JRH0ga2V5PXthbHMuSUR9PnthbHMuTG9jYXRpb25LZXl9PC9vcHRpb24+KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgaGlkZGVuPXthbGxMb2NhdGlvbnMubGVuZ3RoID09IDB9IG9uQ2xpY2s9e2FkZExvY2F0aW9ufT5TYXZlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzc2V0TG9jYXRpb25XaW5kb3c7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIExvY2F0aW9uTWV0ZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzIxLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1RhYmxlJztcclxuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZnVuY3Rpb24gQXNzZXRNZXRlcldpbmRvdyhwcm9wczogeyBBc3NldDogT3BlblhEQS5Bc3NldCB9KTogSlNYLkVsZW1lbnR7XHJcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcclxuICAgIGNvbnN0IFttZXRlcnMsIHNldE1ldGVyc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLk1ldGVyPj4oW10pO1xyXG4gICAgY29uc3QgW3NvcnRGaWVsZCwgc2V0U29ydEZpZWxkXSA9IFJlYWN0LnVzZVN0YXRlPGtleW9mKE9wZW5YREEuTWV0ZXIpPignQXNzZXRLZXknKTtcclxuICAgIGNvbnN0IFthc2NlbmRpbmcsIHNldEFzY2VuZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGdldE1ldGVycygpO1xyXG4gICAgfSwgW3Byb3BzLkFzc2V0XSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TWV0ZXJzKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvJHtwcm9wcy5Bc3NldC5JRH0vTWV0ZXJzYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKG1ldGVycyA9PiBzZXRNZXRlcnMobWV0ZXJzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0KGl0ZW0pIHtcclxuICAgICAgICBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9TWV0ZXImTWV0ZXJJRD0nICsgaXRlbS5yb3cuSUQsIHN0YXRlOiB7fSB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+TWV0ZXJzOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzgxLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlPE9wZW5YREEuTWV0ZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRLZXknLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMzAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzMwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJywgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICczMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMzAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3sga2V5OiAnVHlwZScsIGxhYmVsOiAnVHlwZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNYWtlJywgbGFiZWw6ICdNZXRlcnMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTW9kZWwnLCBsYWJlbDogJ0Fzc2V0cycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnY2FsYygxMCUpJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXttZXRlcnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5vcmRlckJ5KG1ldGVycywgW2QuY29sXSwgWyghYXNjZW5kaW5nID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXRlcnMob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJlZCA9IF8ub3JkZXJCeShtZXRlcnMsIFtkLmNvbF0sIFtcImFzY1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1ldGVycyhvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTb3J0RmllbGQoZC5jb2wpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTZWxlY3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlYWRTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Rib2R5U3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgb3ZlcmZsb3dZOiAnYXV0bycsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMTgyLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcm93U3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eygpID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICApO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXNzZXRNZXRlcldpbmRvdzsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTGluZVNlZ21lbnRXaXphcmQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA0LzE3LzIwMjAgLSBDaHJpc3RvcGggTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge1N5c3RlbUNlbnRlciwgT3BlblhEQSB9IGZyb20gJy4uLy4uL2dsb2JhbCc7XHJcblxyXG5pbXBvcnQgeyBMb2FkaW5nU2NyZWVuLCBNb2RhbCwgV2FybmluZyB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5pbXBvcnQgU2VjdGlvblNlbGVjdCwgeyBGYXdnQ29ubmVjdGlvbiwgRmF3Z1NlY3Rpb24sIEZhd2dTZWdtZW50IH0gZnJvbSAnLi9TZWN0aW9uU2VsZWN0JztcclxuaW1wb3J0IHsgZXJyb3IgfSBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgU2VjdGlvbkVkaXQgZnJvbSAnLi9TZWN0aW9uRWRpdCc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5pbnRlcmZhY2UgSVByb3BzIHtcclxuICAgIExpbmVJRDogbnVtYmVyLFxyXG4gICAgY2xvc2VXaXphcmQ6ICgpID0+IHZvaWQsXHJcbn1cclxuXHJcbnR5cGUgV2l6YXJkU3RlcCA9ICdTZWxlY3RTZWN0aW9uJyB8ICdFZGl0U2VjdGlvbic7XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIExpbmVTZWdtZW50V2l6YXJkKHByb3BzOiBJUHJvcHMpOiBKU1guRWxlbWVudCB7XHJcbiAgICBjb25zdCBbc2VnbWVudHMsIHNldFNlZ21lbnRzXSA9IFJlYWN0LnVzZVN0YXRlPEZhd2dTZWdtZW50W10+KFtdKTtcclxuICAgIGNvbnN0IFtzZWdtZW50Q29ubmVjdGlvbnMsIHNldENvbm5lY3Rpb25zXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PEZhd2dDb25uZWN0aW9uPj4oW10pO1xyXG4gICAgY29uc3QgW3NlY3Rpb25zLCBTZXRTZWN0aW9uc10gPSBSZWFjdC51c2VTdGF0ZTxGYXdnU2VjdGlvbltdPihbXSk7XHJcblxyXG4gICAgY29uc3QgW3N0ZXAsIHNldFN0ZXBdID0gUmVhY3QudXNlU3RhdGU8V2l6YXJkU3RlcD4oJ1NlbGVjdFNlY3Rpb24nKTtcclxuICAgIGNvbnN0IFtjdXJyZW50U2VnbWVudCwgc2V0Q3VycmVudFNlZ21lbnRdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyPigwKTtcclxuICAgIGNvbnN0IFtzaG93V2FybmluZywgc2V0U2hvd1dhcm5pbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gICAgY29uc3QgW3Nob3dDb25maXJtLCBzZXRTaG93Q29uZmlybV0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcbiAgICBjb25zdCBbc2hvd0xvYWRpbmcsIHNldFNob3dMb2FkaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuICAgIGNvbnN0IFtlcnJvcnMsIHNldEVycm9yXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XHJcbiAgICBjb25zdCBbc2hvd0Vycm9yLCBzZXRTaG93RXJyb3JdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgZSA9IFtdO1xyXG4gICAgICAgIGlmIChzZWN0aW9ucy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgZS5wdXNoKCdBdCBsZWFzdCBvbmUgU2VjdGlvbiBvZiB0aGUgTGluZSBuZWVkcyB0byBiZSBwdWxsZWQgZnJvbSBGQVdHLicpXHJcbiAgICAgICAgc2V0RXJyb3IoZSk7XHJcbiAgICB9LCBbc2VjdGlvbnNdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL0V4dGVybmFsREIvRkFXRy9MaW5lU2VnbWVudC9VcGRhdGVTZWdtZW50cy8ke3Byb3BzLkxpbmVJRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc2V0U2VnbWVudHMoZGF0YVtcInNlZ21lbnRzXCJdKTtcclxuICAgICAgICAgICAgc2V0Q29ubmVjdGlvbnMoZGF0YVtcImNvbm5lY3Rpb25zXCJdKVxyXG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBzZXRTaG93RXJyb3IodHJ1ZSlcclxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbmV4dCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc3RlcCA9PSAnU2VsZWN0U2VjdGlvbicpIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudFNlZ21lbnQoMClcclxuICAgICAgICAgICAgc2V0U3RlcCgnRWRpdFNlY3Rpb24nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGVwID09ICdFZGl0U2VjdGlvbicgJiYgKGN1cnJlbnRTZWdtZW50IDwgKHNlY3Rpb25zLmxlbmd0aCAtIDEpKSlcclxuICAgICAgICAgICAgc2V0Q3VycmVudFNlZ21lbnQoKHgpID0+IHggKyAxKTtcclxuICAgICAgICBpZiAoc3RlcCA9PSAnRWRpdFNlY3Rpb24nICYmIChjdXJyZW50U2VnbWVudCA9PSAoc2VjdGlvbnMubGVuZ3RoIC0gMSkpKVxyXG4gICAgICAgICAgICBzZXRTaG93Q29uZmlybSh0cnVlKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGJhY2soKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gJ0VkaXRTZWN0aW9uJyAmJiBjdXJyZW50U2VnbWVudCA9PSAwKVxyXG4gICAgICAgICAgICBzZXRTdGVwKCdTZWxlY3RTZWN0aW9uJyk7XHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gJ0VkaXRTZWN0aW9uJyAmJiBjdXJyZW50U2VnbWVudCA+IDApXHJcbiAgICAgICAgICAgIHNldEN1cnJlbnRTZWdtZW50KCh4KSA9PiB4IC0gMSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VibWl0VXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHNldFNob3dMb2FkaW5nKHRydWUpO1xyXG4gICAgICAgIGxldCBmaW5pc2hlZFNlZ21lbnRzID0gW107XHJcbiAgICAgICAgbGV0IGZpbmlzaGVkQ29ubmVjdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjLHNlY0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHN0YXJ0IGJ5IGFkZGluZyB0aGUgU2VnbWVudHNcclxuICAgICAgICAgICAgaWYgKHNlYy5TZWdtZW50cy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlZ21lbnQgPSBzZWdtZW50cy5maW5kKGl0ZW0gPT4gaXRlbS5Bc3NldEtleSA9PSBzZWMuU2VnbWVudHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5Mb2NhdGlvbkZyb21JRCA9IHNlYy5zdGFydFN0YXRpb25JRDtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuTG9jYXRpb25Ub0lEID0gc2VjLmVuZFN0YXRpb25JRDtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuSXNFbmQgPSAhc2VjLmVuZFRhcCB8fCAhc2VjLnN0YXJ0VGFwO1xyXG4gICAgICAgICAgICAgICAgZmluaXNoZWRTZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlZ21lbnQgPSBzZWdtZW50cy5maW5kKGl0ZW0gPT4gaXRlbS5Bc3NldEtleSA9PSBzZWMuU2VnbWVudHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5Mb2NhdGlvbkZyb21JRCA9IHNlYy5zdGFydFN0YXRpb25JRDtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuTG9jYXRpb25Ub0lEID0gLTE7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LklzRW5kID0gIXNlYy5zdGFydFRhcDtcclxuICAgICAgICAgICAgICAgIGZpbmlzaGVkU2VnbWVudHMucHVzaChzZWdtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IChzZWMuU2VnbWVudHMubGVuZ3RoIC0gMSk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQgPSBzZWdtZW50cy5maW5kKGl0ZW0gPT4gaXRlbS5Bc3NldEtleSA9PSBzZWMuU2VnbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuTG9jYXRpb25Gcm9tSUQgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LkxvY2F0aW9uVG9JRCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuSXNFbmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBmaW5pc2hlZFNlZ21lbnRzLnB1c2goc2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoZWRDb25uZWN0aW9ucy5wdXNoKHsgQ2hpbGRLZXk6IHNlZ21lbnQuQXNzZXRLZXksIFBhcmVudEtleTogZmluaXNoZWRTZWdtZW50c1tmaW5pc2hlZFNlZ21lbnRzLmxlbmd0aCAtIDJdLkFzc2V0S2V5LCBCdXNOdW1iZXI6IDAgfSBhcyBGYXdnQ29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlZ21lbnQgPSBzZWdtZW50cy5maW5kKGl0ZW0gPT4gaXRlbS5Bc3NldEtleSA9PSBzZWMuU2VnbWVudHNbc2VjLlNlZ21lbnRzLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuTG9jYXRpb25Gcm9tSUQgPSAtMTtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuTG9jYXRpb25Ub0lEID0gc2VjLmVuZFN0YXRpb25JRDtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuSXNFbmQgPSAhc2VjLmVuZFRhcDtcclxuICAgICAgICAgICAgICAgIGZpbmlzaGVkU2VnbWVudHMucHVzaChzZWdtZW50KTtcclxuICAgICAgICAgICAgICAgIGZpbmlzaGVkQ29ubmVjdGlvbnMucHVzaCh7IENoaWxkS2V5OiBzZWdtZW50LkFzc2V0S2V5LCBQYXJlbnRLZXk6IGZpbmlzaGVkU2VnbWVudHNbZmluaXNoZWRTZWdtZW50cy5sZW5ndGggLSAyXS5Bc3NldEtleSwgQnVzTnVtYmVyOiAwIH0gYXMgRmF3Z0Nvbm5lY3Rpb24pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vSWYgdGhpcyBzZWN0aW9uIGdvZXMgdG8gYSBUYXAgYWRkIGFsbCBvdGhlciBjb25uZWN0aW9ucy4uLi5cclxuICAgICAgICAgICAgaWYgKHNlYy5zdGFydFRhcCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbm5lY3RlZFNlY3Rpb25zID0gc2VjdGlvbnMuZmlsdGVyKChpdGVtLCBpKSA9PiAoaXRlbS5zdGFydEJ1cyA9PSBzZWMuc3RhcnRCdXMgfHwgaXRlbS5lbmRCdXMgPT0gc2VjLnN0YXJ0QnVzKSAmJiBzZWNJbmRleCAhPSBpKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0ZWRTZWdtZW50cyA9IGNvbm5lY3RlZFNlY3Rpb25zLm1hcChpdGVtID0+IGl0ZW0uc3RhcnRCdXMgPT0gc2VjLnN0YXJ0QnVzID8gaXRlbS5TZWdtZW50c1swXSA6IGl0ZW0uU2VnbWVudHNbaXRlbS5TZWdtZW50cy5sZW5ndGggLSAxXSkuZmlsdGVyKGl0ZW0gPT4gZmluaXNoZWRTZWdtZW50cy5pbmRleE9mKHMgPT4gcy5Bc3NldGtleSA9PSBpdGVtKSA+IC0xKTtcclxuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFNlZ21lbnRzLmZvckVhY2goY1NlZyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmluaXNoZWRDb25uZWN0aW9ucy5wdXNoKHsgQ2hpbGRLZXk6IGNTZWcsIFBhcmVudEtleTogc2VjLlNlZ21lbnRzWzBdLCBCdXNOdW1iZXI6IDAgfSBhcyBGYXdnQ29ubmVjdGlvbilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlYy5lbmRUYXApIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0ZWRTZWN0aW9ucyA9IHNlY3Rpb25zLmZpbHRlcigoaXRlbSwgaSkgPT4gKGl0ZW0uc3RhcnRCdXMgPT0gc2VjLmVuZEJ1cyB8fCBpdGVtLmVuZEJ1cyA9PSBzZWMuZW5kQnVzKSAmJiBzZWNJbmRleCAhPSBpKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0ZWRTZWdtZW50cyA9IGNvbm5lY3RlZFNlY3Rpb25zLm1hcChpdGVtID0+IGl0ZW0uc3RhcnRCdXMgPT0gc2VjLmVuZEJ1cyA/IGl0ZW0uU2VnbWVudHNbMF0gOiBpdGVtLlNlZ21lbnRzW2l0ZW0uU2VnbWVudHMubGVuZ3RoIC0gMV0pLmZpbHRlcihpdGVtID0+IGZpbmlzaGVkU2VnbWVudHMuaW5kZXhPZihzID0+IHMuQXNzZXRrZXkgPT0gaXRlbSkgPiAtMSk7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRTZWdtZW50cy5mb3JFYWNoKGNTZWcgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaGVkQ29ubmVjdGlvbnMucHVzaCh7IENoaWxkS2V5OiBjU2VnLCBQYXJlbnRLZXk6IHNlYy5TZWdtZW50c1tzZWMuU2VnbWVudHMubGVuZ3RoIC0gMV0sIEJ1c051bWJlcjogMCB9IGFzIEZhd2dDb25uZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9FeHRlcm5hbERCL0ZBV0cvTGluZVNlZ21lbnQvQ29uZmlybVNlZ21lbnRzLyR7cHJvcHMuTGluZUlEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBcImRhdGFcIjogeyBcInNlZ21lbnRzXCI6IGZpbmlzaGVkU2VnbWVudHMsIFwiY29ubmVjdGlvbnNcIjogZmluaXNoZWRDb25uZWN0aW9ucyB9IH0pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFNob3dMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgcHJvcHMuY2xvc2VXaXphcmQoKTtcclxuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcclxuICAgICAgICAgICAgc2V0U2hvd0Vycm9yKHRydWUpXHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcblxyXG4gICAgICAgICAgICA8TW9kYWwgVGl0bGU9eydGQVdHIExpbmUgU2VnbWVudCBVcGRhdGUnfSBTaG93WD17dHJ1ZX0gU2hvdz17dHJ1ZX0gU2l6ZT17J3hsZyd9XHJcbiAgICAgICAgICAgICAgICBDYW5jZWxUZXh0PXsnQmFjayd9IERpc2FibGVDYW5jZWw9e3N0ZXAgPT0gJ1NlbGVjdFNlY3Rpb24nfVxyXG4gICAgICAgICAgICAgICAgQ29uZmlybUJ0bkNsYXNzPXsnYnRuLXN1Y2Nlc3MnfSBDb25maXJtVGV4dD17c3RlcCA9PSAnRWRpdFNlY3Rpb24nICYmIGN1cnJlbnRTZWdtZW50ID09IChzZWdtZW50cy5sZW5ndGgtMSkgPyAnQ29uZmlybScgOiAnTmV4dCd9XHJcbiAgICAgICAgICAgICAgICBDYWxsQmFjaz17KGNvbmYsIGJ0bikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYnRuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93V2FybmluZyh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZiAmJiBidG4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbmYgJiYgYnRuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgRGlzYWJsZUNvbmZpcm09e2Vycm9ycy5sZW5ndGggPiAwfVxyXG4gICAgICAgICAgICAgICAgQ29uZmlybVNob3dUb29sVGlwPXtlcnJvcnMubGVuZ3RoID4gMH1cclxuICAgICAgICAgICAgICAgIENvbmZpcm1Ub29sVGlwQ29udGVudD17ZXJyb3JzLm1hcCgodCwgaSkgPT4gPHAga2V5PXtpfT48aSBzdHlsZT17eyBtYXJnaW5SaWdodDogJzEwcHgnLCBjb2xvcjogJyNkYzM1NDUnIH19IGNsYXNzTmFtZT1cImZhIGZhLWV4Y2xhbWF0aW9uLWNpcmNsZVwiPjwvaT4ge3R9IDwvcD4pIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge3N0ZXAgPT0gJ1NlbGVjdFNlY3Rpb24nID8gPFNlY3Rpb25TZWxlY3QgU2VnbWVudHM9e3NlZ21lbnRzfVxyXG4gICAgICAgICAgICAgICAgICAgIENvbm5lY3Rpb25zPXtzZWdtZW50Q29ubmVjdGlvbnN9IFNlY3Rpb25zPXtzZWN0aW9uc30gU2V0U2VjdGlvbnM9e1NldFNlY3Rpb25zfSBBZGRTZWN0aW9uPXsoKSA9PiB7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgTGluZUlEPXtwcm9wcy5MaW5lSUR9IC8+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgIHtzdGVwID09ICdFZGl0U2VjdGlvbicgPyA8U2VjdGlvbkVkaXQgU2VnbWVudHM9e3NlZ21lbnRzfVxyXG4gICAgICAgICAgICAgICAgICAgIFNlY3Rpb249e3NlY3Rpb25zW2N1cnJlbnRTZWdtZW50XX0gU2V0U2VjdGlvbj17KHMpID0+IFNldFNlY3Rpb25zKChvbGQpID0+IHsgbGV0IHVwZGF0ZWQgPSBfLmNsb25lRGVlcChvbGQpOyB1cGRhdGVkW2N1cnJlbnRTZWdtZW50XSA9IHM7IHJldHVybiB1cGRhdGVkOyB9KX0gU2V0U2VnbWVudHM9e3NldFNlZ21lbnRzfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+IDogbnVsbH1cclxuICAgICAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgICAgICAgPFdhcm5pbmcgVGl0bGU9eydDYW5jZWwgRkFXRyB1cGRhdGUnfSBNZXNzYWdlPXsnVGhpcyB3aWxsIGNhbmNlbCB0aGUgdXBkYXRlIGFuZCBrZWVwIHRoZSBTZWdtZW50cyBjdXJyZW50bHkgaW4gdGhlIG9wZW5YREEnfVxyXG4gICAgICAgICAgICAgICAgU2hvdz17c2hvd1dhcm5pbmd9IENhbGxCYWNrPXsoY29uZikgPT4geyBzZXRTaG93V2FybmluZyhmYWxzZSk7IGlmIChjb25mKSBwcm9wcy5jbG9zZVdpemFyZCgpOyB9fSAvPlxyXG4gICAgICAgICAgICA8V2FybmluZyBUaXRsZT17J0NvbmZpcm0gRkFXRyB1cGRhdGUnfSBNZXNzYWdlPXsnVGhpcyB3aWxsIG92ZXJyaWRlIGFueSBjdXJyZW50IExpbmVTZWdtZW50cyBhbmQgc2F2ZSB0aGUgQ29uZmlndXJhdGlvbiB0byBvcGVuWERBLid9XHJcbiAgICAgICAgICAgICAgICBTaG93PXtzaG93Q29uZmlybX0gQ2FsbEJhY2s9eyhjb25mKSA9PiB7IHNldFNob3dDb25maXJtKGZhbHNlKTsgaWYgKGNvbmYpIHsgc3VibWl0VXBkYXRlKCk7IH0gfX0gLz5cclxuICAgICAgICAgICAgPExvYWRpbmdTY3JlZW4gU2hvdz17c2hvd0xvYWRpbmd9IC8+XHJcbiAgICAgICAgICAgIDxXYXJuaW5nIFRpdGxlPXsnRXJyb3InfSBNZXNzYWdlPXsnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgdXBkYXRpbmcgdGhlIExpbmUgU2VnbWVudCBDb25maWd1cmF0aW9uLid9XHJcbiAgICAgICAgICAgICAgICBTaG93PXtzaG93RXJyb3J9IENhbGxCYWNrPXsoY29uZikgPT4geyBzZXRTaG93RXJyb3IoZmFsc2UpOyBwcm9wcy5jbG9zZVdpemFyZCgpOyB9IH0gLz5cclxuICAgICAgICA8Lz4pO1xyXG4gICAgICAgICAgIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5lU2VnbWVudFdpemFyZDtcclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBTZWN0aW9uRWRpdC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDQvMTUvMjAyMSAtIENocmlzdG9waCBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IFRyYXNoQ2FuIH0gZnJvbSAnQGdwYS1nZW1zdG9uZS9ncGEtc3ltYm9scyc7XHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC1mb3Jtcyc7XHJcbmltcG9ydCB7IEZhd2dTZWN0aW9uLCBGYXdnU2VnbWVudCB9IGZyb20gJy4vU2VjdGlvblNlbGVjdCc7XHJcblxyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgICBTZWdtZW50czogRmF3Z1NlZ21lbnRbXSxcclxuICAgIFNlY3Rpb246IEZhd2dTZWN0aW9uLFxyXG4gICAgU2V0U2VjdGlvbjogKHNlYzogRmF3Z1NlY3Rpb24pID0+IHZvaWRcclxuICAgIFNldFNlZ21lbnRzOiAoc2VjdGlvbnM6IEZhd2dTZWdtZW50W10pID0+IHZvaWRcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIFNlY3Rpb25FZGl0KHByb3BzOiBJUHJvcHMpOiBKU1guRWxlbWVudCB7XHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSBSZWFjdC51c2VTdGF0ZTxGYXdnU2VnbWVudFtdPihbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBDcmVhdGVUYWJsZURhdGEoKTtcclxuICAgIH0sIFtwcm9wcy5TZWdtZW50cywgcHJvcHMuU2VjdGlvbl0pO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBDcmVhdGVUYWJsZURhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHByb3BzLlNlZ21lbnRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBkYXRhOiBGYXdnU2VnbWVudFtdID0gW107XHJcblxyXG4gICAgICAgIHByb3BzLlNlY3Rpb24uU2VnbWVudHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXBkYXRlZCA9IF8uY2xvbmVEZWVwKHByb3BzLlNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy5Bc3NldEtleSA9PSBpdGVtKSk7XHJcbiAgICAgICAgICAgIGxldCBsYXN0QnVzID0gcHJvcHMuU2VjdGlvbi5zdGFydEJ1cztcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIGxhc3RCdXMgPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV0uVG9CdXM7XHJcblxyXG4gICAgICAgICAgICBpZiAobGFzdEJ1cyAhPSB1cGRhdGVkLkZyb21CdXMpXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkLlRvQnVzID0gdXBkYXRlZC5Gcm9tQnVzO1xyXG4gICAgICAgICAgICB1cGRhdGVkLkZyb21CdXMgPSBsYXN0QnVzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF0YS5wdXNoKHVwZGF0ZWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZXREYXRhKGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gUmVtb3ZlU2VnbWVudChhc3NldEtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHVwZGF0ZWQgPSBfLmNsb25lRGVlcChwcm9wcy5TZWN0aW9uKTtcclxuICAgICAgICBsZXQgaW5kZXggPSB1cGRhdGVkLlNlZ21lbnRzLmZpbmRJbmRleChhID0+IGEgPT0gYXNzZXRLZXkpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHVwZGF0ZWQuU2VnbWVudHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBwcm9wcy5TZXRTZWN0aW9uKHVwZGF0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlZ21lbnQoc2VnbWVudDogRmF3Z1NlZ21lbnQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaW5kZXggPSBwcm9wcy5TZWdtZW50cy5maW5kSW5kZXgoc2VnID0+IHNlZy5Bc3NldEtleSA9PSBzZWdtZW50LkFzc2V0S2V5KTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgdXBkYXRlZCA9IF8uY2xvbmVEZWVwKHByb3BzLlNlZ21lbnRzKTtcclxuICAgICAgICB1cGRhdGVkW2luZGV4XS5SMCA9IHNlZ21lbnQuUjA7XHJcbiAgICAgICAgdXBkYXRlZFtpbmRleF0uUjEgPSBzZWdtZW50LlIxO1xyXG5cclxuICAgICAgICB1cGRhdGVkW2luZGV4XS5YMCA9IHNlZ21lbnQuWDA7XHJcbiAgICAgICAgdXBkYXRlZFtpbmRleF0uWDEgPSBzZWdtZW50LlgxO1xyXG5cclxuICAgICAgICB1cGRhdGVkW2luZGV4XS5MZW5ndGggPSBzZWdtZW50Lkxlbmd0aDtcclxuICAgICAgICB1cGRhdGVkW2luZGV4XS5UaGVybWFsUmF0aW5nID0gc2VnbWVudC5UaGVybWFsUmF0aW5nO1xyXG5cclxuICAgICAgICBwcm9wcy5TZXRTZWdtZW50cyh1cGRhdGVkKTtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbGVydCBhbGVydC1wcmltYXJ5XCIgcm9sZT1cImFsZXJ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJhbGVydC1oZWFkaW5nXCI+TGluZSBTZWN0aW9uIHtwcm9wcy5TZWN0aW9uLnN0YXJ0VGFwID8gJ1RhcCcgOiBwcm9wcy5TZWN0aW9uLk5hbWVGcm9tfSAoQnVzIHtwcm9wcy5TZWN0aW9uLnN0YXJ0QnVzfSkgdG8ge3Byb3BzLlNlY3Rpb24uZW5kVGFwID8gJ1RhcCcgOiBwcm9wcy5TZWN0aW9uLk5hbWVUb30gKEJ1cyB7cHJvcHMuU2VjdGlvbi5lbmRCdXN9KTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT0ndGFibGUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAnYXV0bycgfX0+U2VnbWVudDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19Pkxlbmd0aDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjb2xTcGFuPXsyfSBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19PkZBV0cgQnVzPC90aD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjb2xTcGFuPXs0fSBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19Plplcm8gU2VxIChPaG0vZGVnKTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjb2xTcGFuPXs0fSBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19PlBvc2l0aXZlIFNlcSAoT2htL2RlZyk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY29sU3Bhbj17NH0gc3R5bGU9e3sgd2lkdGg6ICdhdXRvJyB9fT5Mb29wIChMRykgKE9obS9kZWcpPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAnYXV0bycgfX0+VGhlcm1hbCBSYXRpbmc8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDQwIH19PjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19PjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19PjwvdGg+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6ICdhdXRvJyB9fT5Gcm9tPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAnYXV0bycgfX0+VG88L3RoPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAnYXV0bycgfX0+WjA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6ICdhdXRvJyB9fT4mbHQ7PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAnYXV0bycgfX0+UjA8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6ICdhdXRvJyB9fT5YMDwvdGg+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6ICdhdXRvJyB9fT5aMTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19PiZsdDs8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6ICdhdXRvJyB9fT5SMTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19PlgxPC90aD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19PlpzPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAnYXV0bycgfX0+Jmx0OzwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogJ2F1dG8nIH19PlJzPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAnYXV0bycgfX0+WHM8L3RoPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAnYXV0bycgfX0+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiA0MCB9fT48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRhLm1hcCgoYSwgaSkgPT4gPFRhYmxlUm93SW5wdXQga2V5PXtpfSBTZWdtZW50PXthfSByZW1vdmU9e1JlbW92ZVNlZ21lbnR9IGluZGV4PXtpfSBlZGl0PXt1cGRhdGVTZWdtZW50fSAvPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICB7LyogQWRkIG5ldyBTZWdtZW50IEJ1dHRvbiB0byBiZSBhZGRlZCBpbiBGdXR1cmUgKi99XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBUYWJsZVJvd0lucHV0KHByb3BzOiB7IFNlZ21lbnQ6IEZhd2dTZWdtZW50LCByZW1vdmU6IChhc3NldEtleTogc3RyaW5nKSA9PiB2b2lkLCBlZGl0OiAoYXNzZXQ6IEZhd2dTZWdtZW50KSA9PiB2b2lkLCBpbmRleDogbnVtYmVyIH0pIHtcclxuICAgIGxldCBaMSA9IE1hdGguc3FydChwcm9wcy5TZWdtZW50LlIxICogcHJvcHMuU2VnbWVudC5SMSArIHByb3BzLlNlZ21lbnQuWDEgKiBwcm9wcy5TZWdtZW50LlgxKTtcclxuICAgIGxldCBaMCA9IE1hdGguc3FydChwcm9wcy5TZWdtZW50LlIwICogcHJvcHMuU2VnbWVudC5SMCArIHByb3BzLlNlZ21lbnQuWDAgKiBwcm9wcy5TZWdtZW50LlgwKTtcclxuICAgIGxldCBhMCA9IE1hdGguYWNvcyhwcm9wcy5TZWdtZW50LlIwIC8gWjApICogMTgwLjAgLyBNYXRoLlBJO1xyXG4gICAgbGV0IGExID0gTWF0aC5hY29zKHByb3BzLlNlZ21lbnQuUjEgLyBaMSkgKiAxODAuMCAvIE1hdGguUEk7XHJcbiAgICBsZXQgWHMgPSAoMiAqIHByb3BzLlNlZ21lbnQuWDEgKyBwcm9wcy5TZWdtZW50LlgwKSAvIDMuMDtcclxuICAgIGxldCBScyA9ICgyICogcHJvcHMuU2VnbWVudC5SMSArIHByb3BzLlNlZ21lbnQuUjApIC8gMy4wO1xyXG4gICAgbGV0IFpzID0gTWF0aC5zcXJ0KFJzICogUnMgKyBYcyAqIFhzKTtcclxuICAgIGxldCBhcyA9IE1hdGguYWNvcyhScyAvIFpzKSAqIDE4MC4wIC8gTWF0aC5QSTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7dmVydGljYWxBbGlnbjogJ21pZGRsZSd9fT5TZWdtZW50IHtwcm9wcy5pbmRleCsxfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD48SW5wdXQ8RmF3Z1NlZ21lbnQ+IExhYmVsPXsnTGVuZ3RoIChtaWxlcyknfSBSZWNvcmQ9e3Byb3BzLlNlZ21lbnR9IEZpZWxkPXsnTGVuZ3RoJ30gVHlwZT17J251bWJlcid9IFNldHRlcj17cHJvcHMuZWRpdH0gVmFsaWQ9eygpID0+IHRydWV9IC8+PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnIH19Pntwcm9wcy5TZWdtZW50LkZyb21CdXN9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnIH19Pntwcm9wcy5TZWdtZW50LlRvQnVzfTwvdGQ+XHJcblxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgdmVydGljYWxBbGlnbjogJ21pZGRsZScgfX0+e1owLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnIH19PnthMC50b0ZpeGVkKDIpfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD48SW5wdXQ8RmF3Z1NlZ21lbnQ+IExhYmVsPXsnUjAgKHB1KSd9IFJlY29yZD17cHJvcHMuU2VnbWVudH0gRmllbGQ9eydSMCd9IFR5cGU9eydudW1iZXInfSBTZXR0ZXI9e3Byb3BzLmVkaXR9IFZhbGlkPXsoKSA9PiB0cnVlfSAvPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD48SW5wdXQ8RmF3Z1NlZ21lbnQ+IExhYmVsPXsnWDAgKHB1KSd9IFJlY29yZD17cHJvcHMuU2VnbWVudH0gRmllbGQ9eydYMCd9IFR5cGU9eydudW1iZXInfSBTZXR0ZXI9e3Byb3BzLmVkaXR9IFZhbGlkPXsoKSA9PiB0cnVlfSAvPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyB9fT57WjEudG9GaXhlZCgyKX08L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgdmVydGljYWxBbGlnbjogJ21pZGRsZScgfX0+e2ExLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICAgICAgPHRkPjxJbnB1dDxGYXdnU2VnbWVudD4gTGFiZWw9eydSMSAocHUpJ30gUmVjb3JkPXtwcm9wcy5TZWdtZW50fSBGaWVsZD17J1IxJ30gVHlwZT17J251bWJlcid9IFNldHRlcj17cHJvcHMuZWRpdH0gVmFsaWQ9eygpID0+IHRydWV9IC8+PC90ZD5cclxuICAgICAgICAgICAgPHRkPjxJbnB1dDxGYXdnU2VnbWVudD4gTGFiZWw9eydYMSAocHUpJ30gUmVjb3JkPXtwcm9wcy5TZWdtZW50fSBGaWVsZD17J1gxJ30gVHlwZT17J251bWJlcid9IFNldHRlcj17cHJvcHMuZWRpdH0gVmFsaWQ9eygpID0+IHRydWV9IC8+PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnIH19Pntacy50b0ZpeGVkKDIpfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyB9fT57YXMudG9GaXhlZCgyKX08L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgdmVydGljYWxBbGlnbjogJ21pZGRsZScgfX0+e1JzLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnIH19PntYcy50b0ZpeGVkKDIpfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD48SW5wdXQ8RmF3Z1NlZ21lbnQ+IExhYmVsPXsnVGhlcm1hbCBSYXRpbmcnfSBSZWNvcmQ9e3Byb3BzLlNlZ21lbnR9IEZpZWxkPXsnVGhlcm1hbFJhdGluZyd9IFR5cGU9eydudW1iZXInfSBTZXR0ZXI9e3Byb3BzLmVkaXR9IFZhbGlkPXsoKSA9PiB0cnVlfSAvPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogNDAgfX0+PGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHByb3BzLnJlbW92ZShwcm9wcy5TZWdtZW50LkFzc2V0S2V5KX0+PHNwYW4+e1RyYXNoQ2FufTwvc3Bhbj48L2J1dHRvbj48L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICApO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFNlY3Rpb25FZGl0O1xyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgU2VjdGlvblNlbGVjdC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDQvMTMvMjAyMSAtIENocmlzdG9waCBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7T3BlblhEQSB9IGZyb20gJy4uLy4uL2dsb2JhbCc7XHJcbmltcG9ydCBUYWJsZSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LXRhYmxlJztcclxuaW1wb3J0IHsgUGVuY2lsLCBUcmFzaENhbiB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvZ3BhLXN5bWJvbHMnO1xyXG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zJztcclxuXHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5pbnRlcmZhY2UgSVByb3BzIHtcclxuICAgIFNlZ21lbnRzOiBGYXdnU2VnbWVudFtdLFxyXG4gICAgQ29ubmVjdGlvbnM6IEZhd2dDb25uZWN0aW9uW10sXHJcbiAgICBTZWN0aW9uczogRmF3Z1NlY3Rpb25bXSxcclxuICAgIFNldFNlY3Rpb25zOiAoc2VjdGlvbnM6IEZhd2dTZWN0aW9uW10pID0+IHZvaWRcclxuICAgIEFkZFNlY3Rpb246ICgpID0+IHZvaWQsXHJcbiAgICBMaW5lSUQ6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZhd2dTZWN0aW9uIHtcclxuICAgIHN0YXJ0QnVzOiBudW1iZXIsXHJcbiAgICBlbmRCdXM6IG51bWJlcixcclxuICAgIHN0YXJ0U3RhdGlvbklEOiAobnVtYmVyIHwgbnVsbCksXHJcbiAgICBlbmRTdGF0aW9uSUQ6IChudW1iZXIgfCBudWxsKSxcclxuICAgIFNlZ21lbnRzOiBzdHJpbmdbXSxcclxuICAgIHN0YXJ0VGFwOiBib29sZWFuLFxyXG4gICAgZW5kVGFwOiBib29sZWFuLFxyXG4gICAgTmFtZUZyb206IHN0cmluZyxcclxuICAgIE5hbWVUbzogc3RyaW5nXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmF3Z1NlZ21lbnQgZXh0ZW5kcyBPcGVuWERBLkxpbmVTZWdtZW50IHtcclxuICAgIEZyb21CdXM6IG51bWJlcixcclxuICAgIFRvQnVzOiBudW1iZXIsXHJcbiAgICBMb2NhdGlvbkZyb21JRDogbnVtYmVyLFxyXG4gICAgTG9jYXRpb25Ub0lEOiBudW1iZXIsXHJcbiAgICBDaGFuZ2VkOiBib29sZWFuXHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZhd2dDb25uZWN0aW9uIHtcclxuICAgIFBhcmVudEtleTogc3RyaW5nLFxyXG4gICAgQ2hpbGRLZXk6IHN0cmluZyxcclxuICAgIEJ1c051bWJlcjogbnVtYmVyXHJcbn07XHJcblxyXG5pbnRlcmZhY2UgRmF3Z1RhcCB7XHJcbiAgICBCdXM6IG51bWJlcixcclxuICAgIExvY2F0aW9uSUQ6IG51bWJlcixcclxuICAgIFByb2Nlc3NlZFNlZ21lbnRzOiBzdHJpbmdbXSxcclxuICAgIENvbm5lY3RlZFNlZ21lbnRzOiBzdHJpbmdbXSxcclxuICAgIElzRW5kOiBib29sZWFuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNlY3Rpb25TZWxlY3QocHJvcHM6IElQcm9wcyk6IEpTWC5FbGVtZW50IHtcclxuICAgIGNvbnN0IFtsb2NhdGlvbnMsIHNldExvY2F0aW9uc10gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLkxvY2F0aW9uW10+KFtdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIFByb2Nlc3NTZWdtZW50cygpO1xyXG5cclxuICAgIH0sIFtwcm9wcy5TZWdtZW50cywgcHJvcHMuQ29ubmVjdGlvbnNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSBnZXRMb2NhdGlvbnMoKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4geyBpZiAoaGFuZGxlICE9IG51bGwgJiYgaGFuZGxlLmFib3J0ICE9IG51bGwpIGhhbmRsZS5hYm9ydCgpO31cclxuICAgIH0sIFtwcm9wcy5MaW5lSURdKVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldExvY2F0aW9ucygpOiBKUXVlcnkuanFYSFI8T3BlblhEQS5Mb2NhdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0LyR7cHJvcHMuTGluZUlEfS9Mb2NhdGlvbnNgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoZGF0YSA9PiBzZXRMb2NhdGlvbnMoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFByb2Nlc3NTZWdtZW50cygpOiB2b2lkIHtcclxuICAgICAgICBpZiAocHJvcHMuU2VnbWVudHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAocHJvcHMuU2VnbWVudHMubGVuZ3RoID4gMSAmJiBwcm9wcy5Db25uZWN0aW9ucy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgVGFwczogRmF3Z1RhcFtdID0gW107XHJcbiAgICAgICAgLy8gRmluZCBhbGwgcmVhbCBUYXBzLi4uXHJcbiAgICAgICAgVGFwcyA9IF8udW5pcShwcm9wcy5Db25uZWN0aW9ucy5tYXAoYyA9PiBjLkJ1c051bWJlcikuZmlsdGVyKGIgPT4gcHJvcHMuQ29ubmVjdGlvbnMuZmlsdGVyKGNvbiA9PiBjb24uQnVzTnVtYmVyID09IGIpLmxlbmd0aCA+IDEpKS5tYXAoKGIsIGluZGV4KSA9PiAoeyBCdXM6IGIsICBJc0VuZDogZmFsc2V9IGFzIEZhd2dUYXApKVxyXG4gICAgICAgIC8vIEZpbmQgYWxsIFwiVGFwc1wiIGF0IHRoZSBlbmQgb2YgdGhlIExpbmVcclxuICAgICAgICBUYXBzID0gVGFwcy5jb25jYXQocHJvcHMuU2VnbWVudHMuZmlsdGVyKHMgPT4gcy5Jc0VuZCkubWFwKHMgPT4gcHJvcHMuQ29ubmVjdGlvbnMuZmlsdGVyKGNvbiA9PiBjb24uQnVzTnVtYmVyID09IHMuRnJvbUJ1cykubGVuZ3RoID4gMCA/IHMuVG9CdXMgOiBzLkZyb21CdXMpLm1hcCgoYiwgaW5kZXgpID0+ICh7IEJ1czogYiwgSXNFbmQ6IHRydWUgfSBhcyBGYXdnVGFwKSkpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgVGFwcyB3aXRoIGxvY2F0aW9uSUQgYXMgYXZhaWxhYmxlICgtMSkgb3RoZXJ3aXNlIGFuZCBhZGQgY29ubmVjdGVkIFNlZ21lbnRzXHJcbiAgICAgICAgVGFwcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLkNvbm5lY3RlZFNlZ21lbnRzID0gW107XHJcbiAgICAgICAgICAgIGl0ZW0uUHJvY2Vzc2VkU2VnbWVudHMgPSBbXTtcclxuICAgICAgICAgICAgaXRlbS5Mb2NhdGlvbklEID0gLTE7XHJcblxyXG4gICAgICAgICAgICBpdGVtLkNvbm5lY3RlZFNlZ21lbnRzID0gcHJvcHMuU2VnbWVudHMuZmlsdGVyKHNlZyA9PiBzZWcuRnJvbUJ1cyA9PSBpdGVtLkJ1cyB8fCBzZWcuVG9CdXMgPT0gaXRlbS5CdXMpLm1hcChzZWcgPT4gc2VnLkFzc2V0S2V5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtLkNvbm5lY3RlZFNlZ21lbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gcHJvcHMuU2VnbWVudHMuZmluZChzZWcgPT4gc2VnLkZyb21CdXMgPT0gaXRlbS5CdXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlZ21lbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLkxvY2F0aW9uSUQgPSBzZWdtZW50LkxvY2F0aW9uRnJvbUlEO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uTG9jYXRpb25JRCA9IHByb3BzLlNlZ21lbnRzLmZpbmQoc2VnID0+IHNlZy5Ub0J1cyA9PSBpdGVtLkJ1cykuTG9jYXRpb25Ub0lEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFByb2Nlc3MgU2VnbWVudHMgYW5kIHRhcHMgaW50byBTZWN0aW9uc1xyXG4gICAgICAgIGxldCBjdXJyZW50VGFwID0gVGFwcy5maW5kKHQgPT4gdC5Db25uZWN0ZWRTZWdtZW50cy5sZW5ndGggPiB0LlByb2Nlc3NlZFNlZ21lbnRzLmxlbmd0aClcclxuICAgICAgICBsZXQgQ29tcGxldGVkU2VjdGlvbnM6IEZhd2dTZWN0aW9uW10gPSBbXTtcclxuICAgICAgICB3aGlsZSAoY3VycmVudFRhcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2VjdGlvbjogRmF3Z1NlY3Rpb24gPSB7IHN0YXJ0QnVzOiBjdXJyZW50VGFwLkJ1cywgc3RhcnRTdGF0aW9uSUQ6IGN1cnJlbnRUYXAuTG9jYXRpb25JRCwgU2VnbWVudHM6IFtdLCBlbmRCdXM6IC0xLCBlbmRTdGF0aW9uSUQ6IC0xLCBzdGFydFRhcDogIWN1cnJlbnRUYXAuSXNFbmQsIGVuZFRhcDogdHJ1ZSwgTmFtZUZyb206ICcnLCBOYW1lVG86ICcnIH07XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2VnbWVudCA9IGN1cnJlbnRUYXAuQ29ubmVjdGVkU2VnbWVudHMuZmluZChzID0+IGN1cnJlbnRUYXAuUHJvY2Vzc2VkU2VnbWVudHMuZmluZEluZGV4KHBzID0+IHBzID09IHMpID09IC0xKTtcclxuICAgICAgICAgICAgbGV0IG5leHRCdXMgPSBwcm9wcy5TZWdtZW50cy5maW5kKHMgPT4gcy5Bc3NldEtleSA9PSBjdXJyZW50U2VnbWVudCkuRnJvbUJ1cztcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXh0QnVzID09IGN1cnJlbnRUYXAuQnVzKVxyXG4gICAgICAgICAgICAgICAgbmV4dEJ1cyA9IHByb3BzLlNlZ21lbnRzLmZpbmQocyA9PiBzLkFzc2V0S2V5ID09IGN1cnJlbnRTZWdtZW50KS5Ub0J1cztcclxuICAgICAgICAgICAgY3VycmVudFNlY3Rpb24uU2VnbWVudHMucHVzaChjdXJyZW50U2VnbWVudCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUYXAuUHJvY2Vzc2VkU2VnbWVudHMucHVzaChjdXJyZW50U2VnbWVudCk7XHJcbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVGFwcy5maW5kSW5kZXgodCA9PiB0LkJ1cyA9PSBuZXh0QnVzKSA+IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRDb25uZWN0aW9uID0gcHJvcHMuQ29ubmVjdGlvbnMuZmluZChpdGVtID0+IChpdGVtLkNoaWxkS2V5ID09IGN1cnJlbnRTZWdtZW50IHx8IGl0ZW0uUGFyZW50S2V5ID09IGN1cnJlbnRTZWdtZW50KSAmJiBpdGVtLkJ1c051bWJlciA9PSBuZXh0QnVzKVxyXG5cclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTZWdtZW50ID0gKG5leHRDb25uZWN0aW9uLkNoaWxkS2V5ID09IGN1cnJlbnRTZWdtZW50KSA/IG5leHRDb25uZWN0aW9uLlBhcmVudEtleSA6IG5leHRDb25uZWN0aW9uLkNoaWxkS2V5O1xyXG4gICAgICAgICAgICAgICAgbmV4dEJ1cyA9IHByb3BzLlNlZ21lbnRzLmZpbmQocyA9PiBzLkFzc2V0S2V5ID09IGN1cnJlbnRTZWdtZW50KS5Ub0J1cztcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0QnVzID09IG5leHRDb25uZWN0aW9uLkJ1c051bWJlcilcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QnVzID0gcHJvcHMuU2VnbWVudHMuZmluZChzID0+IHMuQXNzZXRLZXkgPT0gY3VycmVudFNlZ21lbnQpLkZyb21CdXM7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50U2VjdGlvbi5TZWdtZW50cy5wdXNoKGN1cnJlbnRTZWdtZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY3VycmVudFNlY3Rpb24uZW5kQnVzID0gbmV4dEJ1cztcclxuICAgICAgICAgICAgY3VycmVudFNlY3Rpb24uZW5kU3RhdGlvbklEID0gVGFwcy5maW5kKHQgPT4gdC5CdXMgPT0gbmV4dEJ1cykuTG9jYXRpb25JRDtcclxuICAgICAgICAgICAgY3VycmVudFNlY3Rpb24uZW5kVGFwID0gIVRhcHMuZmluZCh0ID0+IHQuQnVzID09IG5leHRCdXMpLklzRW5kO1xyXG4gICAgICAgICAgICBDb21wbGV0ZWRTZWN0aW9ucy5wdXNoKGN1cnJlbnRTZWN0aW9uKTtcclxuICAgICAgICAgICAgVGFwcy5maW5kKHQgPT4gdC5CdXMgPT0gbmV4dEJ1cykuUHJvY2Vzc2VkU2VnbWVudHMucHVzaChjdXJyZW50U2VnbWVudCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUYXAgPSBUYXBzLmZpbmQodCA9PiB0LkNvbm5lY3RlZFNlZ21lbnRzLmxlbmd0aCA+IHQuUHJvY2Vzc2VkU2VnbWVudHMubGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3BzLlNldFNlY3Rpb25zKENvbXBsZXRlZFNlY3Rpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBSZW1vdmVTZWN0aW9uKGZpcnN0U2VnbWVudDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gcHJvcHMuU2VjdGlvbnMuZmluZEluZGV4KHNlYyA9PiBzZWMuU2VnbWVudHNbMF0gPT0gZmlyc3RTZWdtZW50KTtcclxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgYnVzMSA9IHByb3BzLlNlY3Rpb25zW2luZGV4XS5zdGFydEJ1cztcclxuICAgICAgICBsZXQgYnVzMiA9IHByb3BzLlNlY3Rpb25zW2luZGV4XS5lbmRCdXM7XHJcblxyXG4gICAgICAgIGxldCB1cGRhdGVkID0gXy5jbG9uZURlZXAocHJvcHMuU2VjdGlvbnMpO1xyXG4gICAgICAgIHVwZGF0ZWQuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgLy9yZS1jYWxjdWxhdGUgYWZmZWN0ZWQgU2VjdGlvbnMgdG8gbWFrZSB0aGVtIGVuZHBvaW50cyBhcyBuZWNlc3NhcnlcclxuICAgICAgICB1cGRhdGVkLmZvckVhY2goKHNlY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlY3Rpb24uZW5kQnVzID09IGJ1czEgfHwgc2VjdGlvbi5lbmRCdXMgPT0gYnVzMilcclxuICAgICAgICAgICAgICAgIHNlY3Rpb24uZW5kVGFwID0gdXBkYXRlZC5maWx0ZXIocyA9PiBzLmVuZEJ1cyA9PSBzZWN0aW9uLmVuZEJ1cyB8fCBzLnN0YXJ0QnVzID09IHNlY3Rpb24uZW5kQnVzKS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICBpZiAoc2VjdGlvbi5zdGFydEJ1cyA9PSBidXMxIHx8IHNlY3Rpb24uc3RhcnRCdXMgPT0gYnVzMilcclxuICAgICAgICAgICAgICAgIHNlY3Rpb24uc3RhcnRUYXAgPSB1cGRhdGVkLmZpbHRlcihzID0+IHMuZW5kQnVzID09IHNlY3Rpb24uc3RhcnRCdXMgfHwgcy5zdGFydEJ1cyA9PSBzZWN0aW9uLnN0YXJ0QnVzKS5sZW5ndGggPiAxO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwcm9wcy5TZXRTZWN0aW9ucyh1cGRhdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtaW5mb1wiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiYWxlcnQtaGVhZGluZ1wiPlNlbGVjdGluZyBMaW5lIFNlY3Rpb25zPC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+Tm90ZSB0aGF0IG9ubHkgU3Vic3RhdGlvbnMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgTGluZSBhcmUgYXZhaWxhYmxlIGZvciBlbmRwb2ludHMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aHIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5JZiBhbiBFbmRwb2ludCBpcyBsZWZ0IGJsYW5rIHRoZSBzeXN0ZW0gY2FuIG9ubHkgcGVyZm9ybSBzaW5nbGUgZW5kZWQgRmF1bHQgTG9jYXRpb24gYWxnb3JpdGhtcyB0b3dhcmRzIHRoYXQgZW5kIG9mIHRoZSBMaW5lLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlJlbW92aW5nIGEgU2VjdGlvbiB3aWxsIHJlbW92ZSBhbGwgbGluZSBzZWdtZW50cyB0aGF0IHdlcmUgZm91bmQgaW4gRkFXRyBmb3IgdGhhdCBTZWN0aW9uLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGU8RmF3Z1NlY3Rpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdzdGFydEJ1cycsIGxhYmVsOiAnU3RhcnQnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogKGl0ZW0pID0+IGl0ZW0uc3RhcnRUYXAgPyAnVGFwIChCdXMgJyArIGl0ZW0uc3RhcnRCdXMgKyAnKScgOiA8U2VsZWN0PEZhd2dTZWN0aW9uPiBMYWJlbD17YFN1YnN0YXRpb24gKEJ1cyAke2l0ZW0uc3RhcnRCdXN9IClgfSBGaWVsZD17J3N0YXJ0U3RhdGlvbklEJ30gUmVjb3JkPXtpdGVtfSBFbXB0eUxhYmVsPXsnTi9BJ30gU2V0dGVyPXsocikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVwZGF0ZWQgPSBfLmNsb25lRGVlcChwcm9wcy5TZWN0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBwcm9wcy5TZWN0aW9ucy5maW5kSW5kZXgoc2VjID0+IHNlYy5TZWdtZW50c1swXSA9PSBpdGVtLlNlZ21lbnRzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLnN0YXJ0U3RhdGlvbklEID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkW2luZGV4XS5zdGFydFN0YXRpb25JRCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRbaW5kZXhdLk5hbWVGcm9tID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkW2luZGV4XS5zdGFydFN0YXRpb25JRCA9IHBhcnNlSW50KHIuc3RhcnRTdGF0aW9uSUQgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkW2luZGV4XS5OYW1lRnJvbSA9IGxvY2F0aW9ucy5maW5kKGwgPT4gbC5JRCA9PSB1cGRhdGVkW2luZGV4XS5zdGFydFN0YXRpb25JRCkuTG9jYXRpb25LZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXRTZWN0aW9ucyh1cGRhdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gT3B0aW9ucz17bG9jYXRpb25zLm1hcChsID0+ICh7IFZhbHVlOiBsLklELnRvU3RyaW5nKCksIExhYmVsOiBsLkxvY2F0aW9uS2V5IH0pKX0gRW1wdHlPcHRpb249e3RydWV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2VuZEJ1cycsIGxhYmVsOiAnRW5kJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIGNvbnRlbnQ6IChpdGVtKSA9PiBpdGVtLmVuZFRhcCA/ICdUYXAgKEJ1cyAnICsgaXRlbS5lbmRCdXMgKyAnKScgOiA8U2VsZWN0PEZhd2dTZWN0aW9uPiBMYWJlbD17YFN1YnN0YXRpb24gKEJ1cyAke2l0ZW0uZW5kQnVzfSApYH0gRmllbGQ9eydlbmRTdGF0aW9uSUQnfSBSZWNvcmQ9e2l0ZW19IEVtcHR5TGFiZWw9eydOIC8gQSd9IFNldHRlcj17KHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cGRhdGVkID0gXy5jbG9uZURlZXAocHJvcHMuU2VjdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBwcm9wcy5TZWN0aW9ucy5maW5kSW5kZXgoc2VjID0+IHNlYy5TZWdtZW50c1swXSA9PSBpdGVtLlNlZ21lbnRzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmVuZFN0YXRpb25JRCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFtpbmRleF0uZW5kU3RhdGlvbklEID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFtpbmRleF0uTmFtZVRvID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkW2luZGV4XS5lbmRTdGF0aW9uSUQgPSBwYXJzZUludChyLmVuZFN0YXRpb25JRCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRbaW5kZXhdLk5hbWVUbyA9IGxvY2F0aW9ucy5maW5kKGwgPT4gbC5JRCA9PSB1cGRhdGVkW2luZGV4XS5lbmRTdGF0aW9uSUQpLkxvY2F0aW9uS2V5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0U2VjdGlvbnModXBkYXRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IE9wdGlvbnM9e2xvY2F0aW9ucy5tYXAobCA9PiAoeyBWYWx1ZTogbC5JRC50b1N0cmluZygpLCBMYWJlbDogbC5Mb2NhdGlvbktleSB9KSl9IEVtcHR5T3B0aW9uPXt0cnVlfS8+ICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnU2VnbWVudHMnLCBsYWJlbDogJyMgb2YgU2VnbWVudHMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgY29udGVudDogKGl0ZW0pID0+IGl0ZW0uU2VnbWVudHMubGVuZ3RoIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdlbmRTdGF0aW9uSUQnLCBsYWJlbDogJ0xlbmd0aCAobWlsZXMpJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIGNvbnRlbnQ6IChpdGVtKSA9PiBpdGVtLlNlZ21lbnRzLm1hcCgodikgPT4gcHJvcHMuU2VnbWVudHMuZmluZChzZWcgPT4gc2VnLkFzc2V0S2V5ID09IHYpLkxlbmd0aCkucmVkdWNlKChhLHYpID0+IGE9YSt2KSB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogNDAsIHBhZGRpbmdMZWZ0OiAwLCBwYWRkaW5nUmlnaHQ6IDUgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDQwLCBwYWRkaW5nTGVmdDogMCwgcGFkZGluZ1JpZ2h0OiA1IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChpdGVtKSA9PiA8PiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVtb3ZlU2VjdGlvbihpdGVtLlNlZ21lbnRzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT48c3Bhbj57VHJhc2hDYW59PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ2xhc3M9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtwcm9wcy5TZWN0aW9uc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17J3N0YXJ0QnVzJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZz17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5U3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgb3ZlcmZsb3dZOiAnc2Nyb2xsJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzMDAsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd1N0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KGl0ZW0pID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICB7LyogQWRkIG5ldyBTZWN0aW9uIEJ1dHRvbiB0byBiZSBhZGRlZCBpbiBGdXR1cmUgKi99XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uU2VsZWN0O1xyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTGluZVNlZ21lbnRXaW5kb3cudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA0LzE3LzIwMjAgLSBDaHJpc3RvcGggTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQge1N5c3RlbUNlbnRlciwgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IEFzc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcclxuaW1wb3J0IHsgZ2V0QWxsQXNzZXRzLCBnZXRBc3NldFR5cGVzLCBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vVFMvU2VydmljZXMvQXNzZXQnO1xyXG5pbXBvcnQgTGluZVNlZ21lbnRBdHRyaWJ1dGVzIGZyb20gJy4vTGluZVNlZ21lbnQnO1xyXG5pbXBvcnQgeyBMb2FkaW5nU2NyZWVuLCBNb2RhbCwgV2FybmluZyB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC10YWJsZSc7XHJcbmltcG9ydCB7IFBlbmNpbCwgVHJhc2hDYW4gfSBmcm9tICdAZ3BhLWdlbXN0b25lL2dwYS1zeW1ib2xzJztcclxuaW1wb3J0IExpbmVTZWdtZW50V2l6YXJkIGZyb20gJy4vRmF3Z0xpbmVTZWdtZW50V2l6YXJkL0xpbmVTZWdtZW50V2l6YXJkJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5mdW5jdGlvbiBMaW5lU2VnbWVudFdpbmRvdyhwcm9wczogeyBJRDogbnVtYmVyIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICBjb25zdCBbc2VnbWVudHMsIHNldFNlZ21lbnRzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuTGluZVNlZ21lbnQ+PihbXSk7XHJcblxyXG4gICAgY29uc3QgW3Nob3dBZGQsIHNldFNob3dBZGRdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gICAgY29uc3QgW3Nob3dGYXdnLCBzZXRTaG93RmF3Z10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcbiAgICBjb25zdCBbc2hvd1dhcm5pbmcsIHNldHNob3dXYXJuaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuICAgIGNvbnN0IFtzaG93TG9hZGluZywgc2V0U2hvd0xvYWRpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAgIGNvbnN0IFtuZXdFZGl0U2VnbWVudCwgc2V0TmV3RWRpdFNlZ21lbnRdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldD4oQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lU2VnbWVudCcpIGFzIE9wZW5YREEuTGluZVNlZ21lbnQpO1xyXG4gICAgY29uc3QgW25ld0VkaXQsIHNldE5ld0VkaXRdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLk5ld0VkaXQ+KCdOZXcnKTtcclxuICAgIGNvbnN0IFthc3NldFR5cGVzLCBzZXRBc3NldFR5cGVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPj4oW10pO1xyXG4gICAgY29uc3QgW2FsbEFzc2V0cywgc2V0QWxsQXNzZXRzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXQ+PihbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgXHJcbiAgICB9LCBbcHJvcHMuSURdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGdldFNlZ21lbnRzKCk7XHJcblxyXG4gICAgICAgIGdldEFsbEFzc2V0cygpLmRvbmUoKGFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4pID0+IHtcclxuICAgICAgICAgICAgZ2V0QXNzZXRUeXBlcygpLmRvbmUoKGFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdCA9IGFzc2V0VHlwZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5OYW1lID09ICdMaW5lU2VnbWVudCcpXHJcbiAgICAgICAgICAgICAgICBzZXRBc3NldFR5cGVzKGRhdCk7XHJcbiAgICAgICAgICAgICAgICBzZXRBbGxBc3NldHMoYXNzZXRzLmZpbHRlcihpdGVtID0+IGl0ZW1bJ0Fzc2V0VHlwZUlEJ10gPT0gZGF0WzBdLklEKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWdtZW50cygpOiB2b2lkIHtcclxuICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmUvJHtwcm9wcy5JRH0vTGluZVNlZ21lbnRzP189JHttb21lbnQoKX1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgIH0pLmRvbmUoKGRhdGE6IEFycmF5PE9wZW5YREEuTGluZVNlZ21lbnQ+KSA9PiB7XHJcbiAgICAgICAgICAgc2V0U2VnbWVudHMoZGF0YSk7XHJcbiAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRFeGlzdGluZ1NlZ21lbnQoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9MaW5lU2VnbWVudC8ke25ld0VkaXRTZWdtZW50LklEfS9BZGRUb0xpbmUvJHtwcm9wcy5JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KCcnKSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZShlID0+IHtcclxuICAgICAgICAgICAgZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICBzZXROZXdFZGl0U2VnbWVudChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmVTZWdtZW50JykpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTmV3U2VnbWVudCgpOiB2b2lke1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmVTZWdtZW50L05ldy9MaW5lLyR7cHJvcHMuSUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IEFzc2V0OiBuZXdFZGl0U2VnbWVudCB9KSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgICAgIHNldE5ld0VkaXRTZWdtZW50KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZVNlZ21lbnQnKSlcclxuXHJcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVTZWdtZW50KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChuZXdFZGl0U2VnbWVudC5JRCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc2V0U2hvd0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9MaW5lU2VnbWVudC8ke25ld0VkaXRTZWdtZW50LklEfS9EaXNjb25uZWN0LyR7cHJvcHMuSUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZShlID0+IHtcclxuICAgICAgICAgICAgc2V0U2hvd0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICBnZXREYXRhKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIFVwZGF0ZVNlZ21lbnQoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQYXRjaFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmVTZWdtZW50L1VwZGF0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobmV3RWRpdFNlZ21lbnQpLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZGF0YSkgPT4gZ2V0RGF0YSgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGg0PkxpbmUgU2VnbWVudHM6PC9oND5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlPE9wZW5YREEuTGluZVNlZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXROYW1lJywgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTGVuZ3RoJywgbGFiZWw6ICdMZW5ndGggKG1pbGVzKScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ1IxJywgbGFiZWw6ICdSMScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ1gxJywgbGFiZWw6ICdYMScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ1IwJywgbGFiZWw6ICdSMCcsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ1gwJywgbGFiZWw6ICdYMCcsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiA4MCwgcGFkZGluZ0xlZnQ6IDAsIHBhZGRpbmdSaWdodDogNSB9LCByb3dTdHlsZTogeyB3aWR0aDogODAsIHBhZGRpbmdMZWZ0OiAwLCBwYWRkaW5nUmlnaHQ6IDUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAoaXRlbSkgPT4gPD4gPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dBZGQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0U2VnbWVudChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0VkaXQoJ0VkaXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4+e1BlbmNpbH08L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0VkaXRTZWdtZW50KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHNob3dXYXJuaW5nKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+PHNwYW4+e1RyYXNoQ2FufTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ2xhc3M9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3NlZ21lbnRzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9eydBc3NldE5hbWUnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDMwMCwgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KGl0ZW0pID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dBZGQodHJ1ZSl9PkFkZCBTZWdlbWVudDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoZXZ0KSA9PiBzZXRTaG93RmF3Zyh0cnVlKX0+VXBkYXRlIGZyb20gRkFXRzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPFdhcm5pbmcgU2hvdz17c2hvd1dhcm5pbmd9IFRpdGxlPXsnUmVtb3ZlIHRoaXMgU2VnbWVudCBGcm9tIHRoZSBMaW5lJ30gTWVzc2FnZT17J1RoaXMgd2lsbCBwZXJtYW5lbnRseSByZW1vdmUgdGhlIFNlZ21lbnQuJ30gQ2FsbEJhY2s9eyhjb25maXJtKSA9PiB7IGlmIChjb25maXJtKSBkZWxldGVTZWdtZW50KCk7IHNldHNob3dXYXJuaW5nKGZhbHNlKTsgfX0gLz5cclxuICAgICAgICAgICAgPExvYWRpbmdTY3JlZW4gU2hvdz17c2hvd0xvYWRpbmd9IC8+XHJcbiAgICAgICAgICAgIDxNb2RhbCBTaG93PXtzaG93QWRkfSBUaXRsZT17bmV3RWRpdCA9PSAnTmV3JyA/ICdBZGQgTmV3IExpbmVTZWdtZW50IHRvIExpbmUnIDogJ0VkaXQgJyArIG5ld0VkaXRTZWdtZW50LkFzc2V0S2V5ICsgJyBmb3IgTWV0ZXInfSBTaXplPXsnbGcnfSBTaG93WD17dHJ1ZX1cclxuICAgICAgICAgICAgICAgIENhbGxCYWNrPXsoY29uZmlybSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maXJtICYmIG5ld0VkaXQgPT0gJ0VkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBVcGRhdGVTZWdtZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0gJiYgbmV3RWRpdCA9PSAnTmV3JyAmJiBuZXdFZGl0U2VnbWVudC5JRCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGROZXdTZWdtZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0gJiYgbmV3RWRpdCA9PSAnTmV3JyAmJiBuZXdFZGl0U2VnbWVudC5JRCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRFeGlzdGluZ1NlZ21lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0U2VnbWVudChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmVTZWdtZW50JykgYXMgT3BlblhEQS5MaW5lU2VnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0FkZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgQ2FuY2VsVGV4dD17J0Nsb3NlJ31cclxuICAgICAgICAgICAgICAgIENvbmZpcm1UZXh0PXsnU2F2ZSd9XHJcbiAgICAgICAgICAgICAgICBEaXNhYmxlQ29uZmlybT17QXNzZXRBdHRyaWJ1dGVzLkFzc2V0RXJyb3IobmV3RWRpdFNlZ21lbnQsICdMaW5lU2VnbWVudCcpLmxlbmd0aCA+IDB9XHJcbiAgICAgICAgICAgICAgICBDb25maXJtU2hvd1Rvb2xUaXA9e0Fzc2V0QXR0cmlidXRlcy5Bc3NldEVycm9yKG5ld0VkaXRTZWdtZW50LCAnTGluZVNlZ21lbnQnKS5sZW5ndGggPiAwfVxyXG4gICAgICAgICAgICAgICAgQ29uZmlybVRvb2xUaXBDb250ZW50PXtBc3NldEF0dHJpYnV0ZXMuQXNzZXRFcnJvcihuZXdFZGl0U2VnbWVudCwgJ0xpbmVTZWdtZW50JykubWFwKChpLCB0KSA9PiA8cCBrZXk9e2l9PiA8aSBzdHlsZT17eyBtYXJnaW5SaWdodDogJzEwcHgnLCBjb2xvcjogJyNkYzM1NDUnIH19IGNsYXNzTmFtZT1cImZhIGZhLWV4Y2xhbWF0aW9uLWNpcmNsZVwiPjwvaT4ge3R9PC9wPil9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEFzc2V0QXR0cmlidXRlcy5Bc3NldEF0dHJpYnV0ZUZpZWxkcyBBc3NldD17bmV3RWRpdFNlZ21lbnR9IE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0VHlwZXM9e2Fzc2V0VHlwZXN9IEFsbEFzc2V0cz17YWxsQXNzZXRzfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdFNlZ21lbnR9IEdldERpZmZlcmVudEFzc2V0PXsoYXNzZXRJRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0VkaXQgPT0gJ0VkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldCA9IGFsbEFzc2V0cy5maW5kKGEgPT4gYS5JRCA9PSBhc3NldElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldFR5cGUgPSBhc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gYXNzZXRbJ0Fzc2V0VHlwZUlEJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzKGFzc2V0SUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKGFzc2V0ID0+IHNldE5ld0VkaXRTZWdtZW50KGFzc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19IEhpZGVBc3NldFR5cGU9e3RydWV9IEhpZGVTZWxlY3RBc3NldD17ZmFsc2V9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmVTZWdtZW50QXR0cmlidXRlcyBBc3NldD17bmV3RWRpdFNlZ21lbnQgYXMgT3BlblhEQS5MaW5lU2VnbWVudH0gTmV3RWRpdD17bmV3RWRpdH0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRTZWdtZW50fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvTW9kYWw+XHJcbiAgICAgICAgICAgIHtzaG93RmF3ZyA/IDxMaW5lU2VnbWVudFdpemFyZCBMaW5lSUQ9e3Byb3BzLklEfSBjbG9zZVdpemFyZD17KCkgPT4gc2V0U2hvd0Zhd2coZmFsc2UpfSAvPiA6IG51bGx9XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5lU2VnbWVudFdpbmRvdztcclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFRhYmxlLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE4LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOC8wMi8yMDE4IC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5jb25zdCBBbmdsZUljb246IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PHsgYXNjZW5kaW5nOiBib29sZWFuIH0+ID0gKHByb3BzKSA9PiA8c3BhbiBzdHlsZT17eyB3aWR0aDogMTAsIGhlaWdodDogMTAsIG1hcmdpbjogMyB9fSBjbGFzc05hbWU9e1wiZmEgZmEtYW5nbGUtXCIgKyAocHJvcHMuYXNjZW5kaW5nID8gJ3VwJyA6ICdkb3duJyl9Pjwvc3Bhbj5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVQcm9wczxUPiB7XHJcbiAgICBjb2xzOiBBcnJheTx7IGtleToga2V5b2YoVCkgfCBudWxsLCBsYWJlbDogc3RyaW5nLCBoZWFkZXJTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsIHJvd1N0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcywgY29udGVudD8oaXRlbTogVCwga2V5OiBrZXlvZihUKSwgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMpOiBSZWFjdC5SZWFjdE5vZGUgfT4sXHJcbiAgICBkYXRhOiBBcnJheTxUPixcclxuICAgIG9uQ2xpY2s6IChkYXRhOiB7IGNvbDoga2V5b2YgKFQpLCByb3c6IFQsIGRhdGE6IFRba2V5b2YoVCldIH0sIGV2ZW50OiBhbnkpID0+IHZvaWQsXHJcbiAgICBzb3J0RmllbGQ6IHN0cmluZyxcclxuICAgIGFzY2VuZGluZzogYm9vbGVhbixcclxuICAgIG9uU29ydChkYXRhOiB7IGNvbDoga2V5b2YgKFQpLCBhc2VuZGluZzogYm9vbGVhbn0pOiB2b2lkLFxyXG4gICAgdGFibGVDbGFzcz86IHN0cmluZyxcclxuICAgIHRhYmxlU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG4gICAgdGhlYWRTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsXHJcbiAgICB0aGVhZENsYXNzPzogc3RyaW5nLFxyXG4gICAgdGJvZHlTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsXHJcbiAgICB0Ym9keUNsYXNzPzogc3RyaW5nLFxyXG4gICAgc2VsZWN0ZWQ/KGRhdGE6IFQpOiBib29sZWFuLFxyXG4gICAgcm93U3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZTxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxUYWJsZVByb3BzPFQ+LCB7fT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHZhciByb3dDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZVJvd3MoKTtcclxuICAgICAgICB2YXIgaGVhZGVyQ29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVIZWFkZXJzKCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17KHRoaXMucHJvcHMudGFibGVDbGFzcyAhPSB1bmRlZmluZWQgPyB0aGlzLnByb3BzLnRhYmxlQ2xhc3MgOiAnJyl9IHN0eWxlPXt0aGlzLnByb3BzLnRhYmxlU3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgPHRoZWFkIHN0eWxlPXt0aGlzLnByb3BzLnRoZWFkU3R5bGV9PntoZWFkZXJDb21wb25lbnRzfTwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHkgc3R5bGU9e3RoaXMucHJvcHMudGJvZHlTdHlsZX0+e3Jvd0NvbXBvbmVudHN9PC90Ym9keT5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlSGVhZGVycygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xzLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5wcm9wcy5jb2xzLm1hcCgoY29sRGF0YSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlO1xyXG4gICAgICAgICAgICBpZiAoY29sRGF0YS5oZWFkZXJTdHlsZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gY29sRGF0YS5oZWFkZXJTdHlsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17aW5kZXh9IHN0eWxlPXtzdHlsZX0gb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlU29ydCh7IGNvbDogY29sRGF0YS5rZXksIGFzY2VuZGluZzogdGhpcy5wcm9wcy5hc2NlbmRpbmcgfSwgZSl9Pntjb2xEYXRhLmxhYmVsfXsodGhpcy5wcm9wcy5zb3J0RmllbGQgPT0gY29sRGF0YS5rZXkgPyA8QW5nbGVJY29uIGFzY2VuZGluZz17dGhpcy5wcm9wcy5hc2NlbmRpbmd9IC8+IDogbnVsbCl9PC90aD5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIDx0cj57Y2VsbHN9PC90cj47XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVSb3dzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5wcm9wcy5jb2xzLm1hcChjb2xEYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IF8uY2xvbmUoY29sRGF0YS5yb3dTdHlsZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHRkXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleC50b1N0cmluZygpICsgaXRlbVtjb2xEYXRhLmtleV0gKyBjb2xEYXRhLmtleX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHsgY29sOiBjb2xEYXRhLmtleSwgcm93OiBpdGVtLCBkYXRhOiBpdGVtW2NvbERhdGEua2V5XSB9KX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7Y29sRGF0YS5jb250ZW50ICE9IHVuZGVmaW5lZCA/IGNvbERhdGEuY29udGVudChpdGVtLCBjb2xEYXRhLmtleSwgc3R5bGUpIDogaXRlbVtjb2xEYXRhLmtleV19XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnJvd1N0eWxlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBfLmNsb25lKHRoaXMucHJvcHMucm93U3R5bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHN0eWxlID0ge307XHJcblxyXG4gICAgICAgICAgICBpZiAoc3R5bGUuY3Vyc29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkKGl0ZW0pKVxyXG4gICAgICAgICAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gPHRyIHN0eWxlPXtzdHlsZX0ga2V5PXtpbmRleC50b1N0cmluZygpfT57Y2VsbHN9PC90cj47XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2xpY2soZGF0YTogeyBjb2w6IGtleW9mKFQpLCByb3c6IFQsIGRhdGE6IGFueSB9LCBldmVudCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayhkYXRhLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU29ydChkYXRhLCBldmVudCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25Tb3J0KGRhdGEpO1xyXG4gICAgfVxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9