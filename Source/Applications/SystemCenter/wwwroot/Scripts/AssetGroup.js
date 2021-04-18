(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AssetGroup"],{

/***/ "./TSX/SystemCenter/AssetGroups/AssetAssetGroup.tsx":
/*!**********************************************************!*\
  !*** ./TSX/SystemCenter/AssetGroups/AssetAssetGroup.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
/* harmony import */ var _AddToGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AddToGroup */ "./TSX/SystemCenter/AssetGroups/AddToGroup.tsx");
//******************************************************************************************************
//  AssetAssetGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
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





function AssetAssetGroupWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), assetList = _a[0], setAssetList = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Assetname'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), edit = _d[0], setEdit = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return getData();
    }, [props.AssetGroupID]);
    function getData() {
        if (props.AssetGroupID == null)
            return function () { };
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/AssetGroup/" + props.AssetGroupID + "/Assets",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) { return setAssetList(data); });
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        };
    }
    function AddAsset(toAdd) {
        var handle = $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/AssetGroup/" + props.AssetGroupID + "/AddAssets",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(toAdd),
            cache: false,
            async: true
        });
        handle.done(function (d) { history.go(0); });
        return handle;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Transmission Assets in Asset Group:")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, (edit) ?
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default pull-right", onClick: function () { setEdit(false); } }, "View") :
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () { setEdit(true); } }, "Edit")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_3__["default"], { cols: [
                        { key: 'AssetName', label: 'AssetKey', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'LongAssetName', label: 'Asset Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetLocation', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } }
                    ], tableClass: "table table-hover", data: assetList, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](assetList, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setAssetList(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](assetList, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setAssetList(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: function (data) { history.push({ pathname: homePath + 'index.cshtml', search: '?name=Asset&AssetID=' + data.row.AssetID, state: {} }); }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AddToGroup__WEBPACK_IMPORTED_MODULE_4__["default"], { type: 'Asset', onComplete: AddAsset }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#AddAsset", disabled: !edit }, "Add Transmission Asset")))));
}
/* harmony default export */ __webpack_exports__["default"] = (AssetAssetGroupWindow);


/***/ }),

/***/ "./TSX/SystemCenter/AssetGroups/AssetGroup.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/AssetGroups/AssetGroup.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AssetGroupInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AssetGroupInfo */ "./TSX/SystemCenter/AssetGroups/AssetGroupInfo.tsx");
/* harmony import */ var _AssetAssetGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AssetAssetGroup */ "./TSX/SystemCenter/AssetGroups/AssetAssetGroup.tsx");
/* harmony import */ var _MeterAssetGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MeterAssetGroup */ "./TSX/SystemCenter/AssetGroups/MeterAssetGroup.tsx");
/* harmony import */ var _UserAssetGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UserAssetGroup */ "./TSX/SystemCenter/AssetGroups/UserAssetGroup.tsx");
/* harmony import */ var _AssetgroupAssetGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AssetgroupAssetGroup */ "./TSX/SystemCenter/AssetGroups/AssetgroupAssetGroup.tsx");
/* harmony import */ var _CommonComponents_WarningModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CommonComponents/WarningModal */ "./TSX/SystemCenter/CommonComponents/WarningModal.tsx");
//******************************************************************************************************
//  AssetGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
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








function AssetGroup(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), assetGroup = _a[0], setAssetGroup = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), allAssetGroups = _b[0], setAllAssetGroups = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getTab()), 2), tab = _c[0], setTabState = _c[1];
    function getTab() {
        if (sessionStorage.hasOwnProperty('AssetGroup.Tab'))
            return JSON.parse(sessionStorage.getItem('AssetGroup.Tab'));
        else
            return 'info';
    }
    function setTab(tab) {
        sessionStorage.setItem('AssetGroup.Tab', JSON.stringify(tab));
        setTabState(tab);
    }
    function getAssetGroup() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/AssetGroup/One/" + props.AssetGroupID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) {
            setAssetGroup(data);
        });
        return handle;
    }
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return getData();
    }, [props.AssetGroupID]);
    function getAllAssetGroups() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/AssetGroup",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (aas) { return setAllAssetGroups(aas); });
        return handle;
    }
    function getData() {
        var handle1 = getAssetGroup();
        var handle2 = getAllAssetGroups();
        return function cleanup() {
            if (handle1.abort != null)
                handle1.abort();
            if (handle2.abort != null)
                handle2.abort();
        };
    }
    function deleteAssetGroup() {
        return $.ajax({
            type: "DELETE",
            url: homePath + "api/OpenXDA/AssetGroup/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(assetGroup),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (msg) {
            sessionStorage.clear();
            history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroups', state: {} });
        });
        return null;
    }
    if (assetGroup == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, assetGroup.Name)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", onClick: function () { return $('#deleteModal').show(); } }, "Delete Asset Group"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_WarningModal__WEBPACK_IMPORTED_MODULE_7__["default"], { Id: 'deleteModal', Title: 'Warning', Confirm: 'Delete', Deny: 'Cancel', Content: 'This will permanently delete this Asset Group. Are you sure you want to continue?', Action: function (result) { if (result)
                deleteAssetGroup(); } }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "info" ? " active" : ""), onClick: function () { return setTab('info'); }, "data-toggle": "tab", href: "#info" }, "Info")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "asset" ? " active" : ""), onClick: function () { return setTab('asset'); }, "data-toggle": "tab", href: "#asset" }, "Assets")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "meter" ? " active" : ""), onClick: function () { return setTab('meter'); }, "data-toggle": "tab", href: "#meter" }, "Meters")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "user" ? " active" : ""), onClick: function () { return setTab('user'); }, "data-toggle": "tab", href: "#user" }, "Users")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "assetgroup" ? " active" : ""), onClick: function () { return setTab('assetgroup'); }, "data-toggle": "tab", href: "#assetGroup" }, "Asset Groups"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 235, overflow: 'hidden' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "info" ? " active" : "fade"), id: "info" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetGroupInfo__WEBPACK_IMPORTED_MODULE_2__["default"], { AssetGroup: assetGroup, StateSetter: function (data) { return setAssetGroup(data); }, AllAssetGroups: allAssetGroups })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "asset" ? " active" : "fade"), id: "asset" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAssetGroup__WEBPACK_IMPORTED_MODULE_3__["default"], { AssetGroupID: props.AssetGroupID })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "meter" ? " active" : "fade"), id: "meter" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MeterAssetGroup__WEBPACK_IMPORTED_MODULE_4__["default"], { AssetGroupID: props.AssetGroupID })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "user" ? " active" : "fade"), id: "user" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_UserAssetGroup__WEBPACK_IMPORTED_MODULE_5__["default"], { AssetGroupID: props.AssetGroupID })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "assetgroup" ? " active" : "fade"), id: "assetgroup" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetgroupAssetGroup__WEBPACK_IMPORTED_MODULE_6__["default"], { AssetGroupID: props.AssetGroupID })))));
}
/* harmony default export */ __webpack_exports__["default"] = (AssetGroup);


/***/ }),

/***/ "./TSX/SystemCenter/AssetGroups/AssetGroupInfo.tsx":
/*!*********************************************************!*\
  !*** ./TSX/SystemCenter/AssetGroups/AssetGroupInfo.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/FormCheckBox */ "./TSX/SystemCenter/CommonComponents/FormCheckBox.tsx");
//******************************************************************************************************
//  AssetGroupInfo.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
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





function AssetgroupInfoWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), assetGroup = _a[0], setAssetGroup = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        setAssetGroup(props.AssetGroup);
        return function () { };
    }, [props.AssetGroup]);
    function valid(field) {
        if (field == 'Name') {
            if (assetGroup.Name == null || assetGroup.Name.length == 0)
                return false;
            if (Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEqual"])(assetGroup.Name, props.AssetGroup.Name))
                return true;
            return props.AllAssetGroups.map(function (item) { return item.Name.toLowerCase(); }).indexOf(assetGroup.Name.toLowerCase()) < 0;
        }
        return true;
    }
    function editExistingAssetGroup() {
    }
    if (assetGroup == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Asset Group Information:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: assetGroup, Field: 'Name', Label: 'Name', Feedback: 'A unique name of less than 50 characters is required.', Valid: valid, Setter: setAssetGroup, Disabled: false }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: assetGroup, Field: 'DisplayDashboard', Label: 'Show Asset Group in Dashboard', Setter: setAssetGroup, Disabled: false })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: assetGroup, Field: 'Assets', Label: 'Num. of Transmission Assets', Valid: function () { return true; }, Setter: setAssetGroup, Disabled: true }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: assetGroup, Field: 'Meters', Label: 'Num. of Meters', Valid: function () { return true; }, Setter: setAssetGroup, Disabled: true }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: assetGroup, Field: 'Users', Label: 'Num. of Users', Valid: function () { return true; }, Setter: setAssetGroup, Disabled: true }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: assetGroup, Field: 'AssetGroups', Label: 'Num. of Asset Groups', Valid: function () { return true; }, Setter: setAssetGroup, Disabled: true })))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", type: "submit", onClick: function () {
                        editExistingAssetGroup();
                        props.StateSetter(assetGroup);
                    }, disabled: Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEqual"])(assetGroup, props.AssetGroup) }, "Save Changes")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return setAssetGroup(props.AssetGroup); }, disabled: Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEqual"])(assetGroup, props.AssetGroup) }, "Clear Changes")))));
}
/* harmony default export */ __webpack_exports__["default"] = (AssetgroupInfoWindow);


/***/ }),

/***/ "./TSX/SystemCenter/AssetGroups/AssetgroupAssetGroup.tsx":
/*!***************************************************************!*\
  !*** ./TSX/SystemCenter/AssetGroups/AssetgroupAssetGroup.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
/* harmony import */ var _AddToGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AddToGroup */ "./TSX/SystemCenter/AssetGroups/AddToGroup.tsx");
//******************************************************************************************************
//  AssetAssetGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
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





function AssetGroupAssetGroupWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), groupList = _a[0], setGroupList = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Name'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), edit = _d[0], setEdit = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return getData();
    }, [props.AssetGroupID]);
    function getData() {
        if (props.AssetGroupID == null)
            return function () { };
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/AssetGroup/" + props.AssetGroupID + "/AssetGroups",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) { return setGroupList(data); });
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        };
    }
    function AddGroups(toAdd) {
        var handle = $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/AssetGroup/" + props.AssetGroupID + "/AddAssetGroups",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(toAdd),
            cache: false,
            async: true
        });
        handle.done(function (d) { history.go(0); });
        return handle;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Transmission Assets in Asset Group:")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, (edit) ?
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default pull-right", onClick: function () { setEdit(false); } }, "View") :
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () { setEdit(true); } }, "Edit")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_3__["default"], { cols: [
                        { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Assets', label: 'Num. of Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Meters', label: 'Num. of Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Users', label: 'Num. of Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'AssetGroups', label: 'Num. of Asset Groups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ], tableClass: "table table-hover", data: groupList, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](groupList, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setGroupList(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](groupList, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setGroupList(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: function (data) { history.push({ pathname: homePath + 'index.cshtml', search: '?name=AssetGroup&AssetGroupID=' + data.row.ID, state: {} }); }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AddToGroup__WEBPACK_IMPORTED_MODULE_4__["default"], { type: 'Group', onComplete: AddGroups })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#AddMeter", disabled: !edit }, "Add Meter"))));
}
/* harmony default export */ __webpack_exports__["default"] = (AssetGroupAssetGroupWindow);


/***/ }),

/***/ "./TSX/SystemCenter/AssetGroups/MeterAssetGroup.tsx":
/*!**********************************************************!*\
  !*** ./TSX/SystemCenter/AssetGroups/MeterAssetGroup.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
/* harmony import */ var _AddToGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AddToGroup */ "./TSX/SystemCenter/AssetGroups/AddToGroup.tsx");
//******************************************************************************************************
//  AssetAssetGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
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





function MeterAssetGroupWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), meterList = _a[0], setMeterList = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('MeterName'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), edit = _d[0], setEdit = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return getData();
    }, [props.AssetGroupID]);
    function getData() {
        if (props.AssetGroupID == null)
            return function () { };
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/AssetGroup/" + props.AssetGroupID + "/Meters",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) { return setMeterList(data); });
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        };
    }
    function AddMeter(toAdd) {
        var handle = $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/AssetGroup/" + props.AssetGroupID + "/AddMeters",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(toAdd),
            cache: false,
            async: true
        });
        handle.done(function (d) { history.go(0); });
        return handle;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Transmission Assets in Asset Group:")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, (edit) ?
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default pull-right", onClick: function () { setEdit(false); } }, "View") :
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () { setEdit(true); } }, "Edit")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_3__["default"], { cols: [
                        { key: 'MeterName', label: 'Meter', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ], tableClass: "table table-hover", data: meterList, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](meterList, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setMeterList(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](meterList, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setMeterList(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: function (data) { history.push({ pathname: homePath + 'index.cshtml', search: '?name=Meter&MeterID=' + data.row.MeterID, state: {} }); }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AddToGroup__WEBPACK_IMPORTED_MODULE_4__["default"], { type: 'Meter', onComplete: AddMeter })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", "data-toggle": 'modal', "data-target": "#AddMeter", disabled: !edit }, "Add Meter")))));
}
/* harmony default export */ __webpack_exports__["default"] = (MeterAssetGroupWindow);


/***/ }),

/***/ "./TSX/SystemCenter/AssetGroups/UserAssetGroup.tsx":
/*!*********************************************************!*\
  !*** ./TSX/SystemCenter/AssetGroups/UserAssetGroup.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CommonComponents_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/Table */ "./TSX/SystemCenter/CommonComponents/Table.tsx");
//******************************************************************************************************
//  AssetAssetGroup.tsx - Gbtc
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
//  10/14/2020 - C. Lackner
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




function UserAssetGroupWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), userList = _a[0], setUserList = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Username'), 2), sortField = _b[0], setSortField = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _c[0], setAscending = _c[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return getData();
    }, [props.AssetGroupID]);
    function getData() {
        if (props.AssetGroupID == null)
            return function () { };
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/AssetGroup/" + props.AssetGroupID + "/Users",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) { return setUserList(data); });
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        };
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "User Accounts in Asset Group:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_3__["default"], { cols: [
                        { key: 'Username', label: 'User Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ], tableClass: "table table-hover", data: userList, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col == sortField) {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](userList, [d.col], [(!ascending ? "asc" : "desc")]);
                            setAscending(!ascending);
                            setUserList(ordered);
                        }
                        else {
                            var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](userList, [d.col], ["asc"]);
                            setAscending(!ascending);
                            setUserList(ordered);
                            setSortField(d.col);
                        }
                    }, onClick: function (data) { }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" })));
}
/* harmony default export */ __webpack_exports__["default"] = (UserAssetGroupWindow);


/***/ }),

/***/ "./TSX/SystemCenter/CommonComponents/WarningModal.tsx":
/*!************************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/WarningModal.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
//******************************************************************************************************
//  WarningModal.tsx - Gbtc
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
//  10/15/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************

var Warning = function (props) {
    function confirmWarning() {
        $('#' + props.Id).hide();
        props.Action(true);
    }
    function cancelWarning() {
        $('#' + props.Id).hide();
        props.Action(false);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: props.Id },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog modal-sm" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, props.Title)),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, props.Content)),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-success", onClick: function () { return confirmWarning(); } }, props.Confirm),
                    props.Deny == undefined ? null : react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal", onClick: function () { return cancelWarning(); } }, props.Deny))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Warning);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0R3JvdXBzL0Fzc2V0QXNzZXRHcm91cC50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEdyb3Vwcy9Bc3NldEdyb3VwLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0R3JvdXBzL0Fzc2V0R3JvdXBJbmZvLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0R3JvdXBzL0Fzc2V0Z3JvdXBBc3NldEdyb3VwLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0R3JvdXBzL01ldGVyQXNzZXRHcm91cC50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEdyb3Vwcy9Vc2VyQXNzZXRHcm91cC50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL1dhcm5pbmdNb2RhbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4Ryw4QkFBOEI7QUFDOUIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDJCQUEyQjtBQUMzQixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHekU7QUFDSDtBQUVrQjtBQUVBO0FBQ0g7QUFNM0MsU0FBUyxxQkFBcUIsQ0FBQyxLQUE4QjtJQUN6RCxJQUFJ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LEtBQUssQ0FBQyxLQUFLLENBQU0sQ0FDNUM7Z0JBQ04sNkRBQUssU0FBUyxFQUFDLFlBQVk7b0JBQ3ZCLCtEQUFJLEtBQUssQ0FBQyxPQUFPLENBQUssQ0FDcEI7Z0JBQ04sNkRBQUssU0FBUyxFQUFDLGNBQWM7b0JBQ3pCLGdFQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFDLE9BQU8sRUFBRSxjQUFNLHFCQUFjLEVBQUUsRUFBaEIsQ0FBZ0IsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFVO29CQUMxRyxLQUFLLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxnQkFBZ0Isa0JBQWMsT0FBTyxFQUFDLE9BQU8sRUFBRSxjQUFNLG9CQUFhLEVBQUUsRUFBZixDQUFlLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBVSxDQUMzSixDQUNKLENBQ0osQ0FDSixDQUNUO0FBQ0wsQ0FBQztBQUVjLHNFQUFPLEVBQUMiLCJmaWxlIjoiQXNzZXRHcm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBBc3NldEFzc2V0R3JvdXAudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDEwLzE0LzIwMjAgLSBDLiBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IFRhYmxlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvVGFibGUnO1xyXG5pbXBvcnQgQWRkVG9Hcm91cFBvcHVwIGZyb20gJy4vQWRkVG9Hcm91cCc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5pbnRlcmZhY2UgQXNzZXQgeyBJRDogbnVtYmVyLCBBc3NldE5hbWU6IHN0cmluZywgTG9uZ0Fzc2V0TmFtZTogc3RyaW5nLCBBc3NldElEOiBudW1iZXIsIEFzc2V0R3JvdXBJRDogbnVtYmVyLCBBc3NldFR5cGU6IHN0cmluZywgQXNzZXRMb2NhdGlvbjogc3RyaW5nIH1cclxuXHJcblxyXG5mdW5jdGlvbiBBc3NldEFzc2V0R3JvdXBXaW5kb3cocHJvcHM6IHsgQXNzZXRHcm91cElEOiBudW1iZXJ9KSB7XHJcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcclxuICAgIGNvbnN0IFthc3NldExpc3QsIHNldEFzc2V0TGlzdF0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxBc3NldD4+KFtdKTtcclxuICAgIGNvbnN0IFtzb3J0RmllbGQsIHNldFNvcnRGaWVsZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCdBc3NldG5hbWUnKTtcclxuICAgIGNvbnN0IFthc2NlbmRpbmcsIHNldEFzY2VuZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuICAgIGNvbnN0IFtlZGl0LCBzZXRFZGl0XSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBnZXREYXRhKCk7XHJcbiAgICB9LCBbcHJvcHMuQXNzZXRHcm91cElEXSlcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gICAgICAgIGlmIChwcm9wcy5Bc3NldEdyb3VwSUQgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuICgpID0+IHsgfTtcclxuXHJcbiAgICAgICAgbGV0IGhhbmRsZSA9ICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRHcm91cC8ke3Byb3BzLkFzc2V0R3JvdXBJRH0vQXNzZXRzYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGhhbmRsZS5kb25lKChkYXRhOiBBcnJheTxBc3NldD4pID0+IHNldEFzc2V0TGlzdChkYXRhKSk7XHJcbiAgICAgIFxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gQWRkQXNzZXQodG9BZGQpIHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRHcm91cC8ke3Byb3BzLkFzc2V0R3JvdXBJRH0vQWRkQXNzZXRzYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0b0FkZCksXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaGFuZGxlLmRvbmUoKGQpID0+IHsgaGlzdG9yeS5nbygwKTsgfSlcclxuICAgICAgICByZXR1cm4gaGFuZGxlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5UcmFuc21pc3Npb24gQXNzZXRzIGluIEFzc2V0IEdyb3VwOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyhlZGl0KSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0XCIgb25DbGljaz17KCkgPT4geyBzZXRFZGl0KGZhbHNlKSB9fT5WaWV3PC9idXR0b24+IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXsoKSA9PiB7IHNldEVkaXQodHJ1ZSkgfX0+RWRpdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXROYW1lJywgbGFiZWw6ICdBc3NldEtleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xvbmdBc3NldE5hbWUnLCBsYWJlbDogJ0Fzc2V0IE5hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldFR5cGUnLCBsYWJlbDogJ0Fzc2V0IFR5cGUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldExvY2F0aW9uJywgbGFiZWw6ICdTdWJzdGF0aW9uJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAxNywgcGFkZGluZzogMCB9LCByb3dTdHlsZTogeyB3aWR0aDogMCwgcGFkZGluZzogMCB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXthc3NldExpc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmRlcmVkID0gXy5vcmRlckJ5KGFzc2V0TGlzdCwgW2QuY29sXSwgWyghYXNjZW5kaW5nID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc3NldExpc3Qob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JkZXJlZCA9IF8ub3JkZXJCeShhc3NldExpc3QsIFtkLmNvbF0sIFtcImFzY1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzc2V0TGlzdChvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTb3J0RmllbGQoZC5jb2wpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZGF0YSkgPT4geyBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9QXNzZXQmQXNzZXRJRD0nICsgZGF0YS5yb3cuQXNzZXRJRCwgc3RhdGU6IHt9IH0pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDMwMCwgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KGl0ZW0pID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPEFkZFRvR3JvdXBQb3B1cCB0eXBlPSdBc3NldCcgb25Db21wbGV0ZT17QWRkQXNzZXR9IC8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9XCIjQWRkQXNzZXRcIiBkaXNhYmxlZD17IWVkaXR9PkFkZCBUcmFuc21pc3Npb24gQXNzZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXNzZXRBc3NldEdyb3VwV2luZG93OyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBBc3NldEdyb3VwLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAxMC8xNC8yMDIwIC0gQy4gTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcblxyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBBc3NldGdyb3VwSW5mb1dpbmRvdyBmcm9tICcuL0Fzc2V0R3JvdXBJbmZvJztcclxuaW1wb3J0IEFzc2V0QXNzZXRHcm91cFdpbmRvdyBmcm9tICcuL0Fzc2V0QXNzZXRHcm91cCc7XHJcbmltcG9ydCBNZXRlckFzc2V0R3JvdXBXaW5kb3cgZnJvbSAnLi9NZXRlckFzc2V0R3JvdXAnO1xyXG5pbXBvcnQgVXNlckFzc2V0R3JvdXBXaW5kb3cgZnJvbSAnLi9Vc2VyQXNzZXRHcm91cCc7XHJcbmltcG9ydCBBc3NldEdyb3VwQXNzZXRHcm91cFdpbmRvdyBmcm9tICcuL0Fzc2V0Z3JvdXBBc3NldEdyb3VwJztcclxuaW1wb3J0IFdhcm5pbmcgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9XYXJuaW5nTW9kYWwnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuZGVjbGFyZSB0eXBlIFRhYiA9ICdpbmZvJyB8ICdtZXRlcicgfCAnYXNzZXQnIHwgJ2Fzc2V0Z3JvdXAnIHwgJ3VzZXInIFxyXG5cclxuZnVuY3Rpb24gQXNzZXRHcm91cChwcm9wczogeyBBc3NldEdyb3VwSUQ6IG51bWJlciB9KSB7XHJcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcclxuICAgIGNvbnN0IFthc3NldEdyb3VwLCBzZXRBc3NldEdyb3VwXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXRHcm91cD4obnVsbCk7XHJcbiAgICBjb25zdCBbYWxsQXNzZXRHcm91cHMsIHNldEFsbEFzc2V0R3JvdXBzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXRHcm91cD4+KFtdKTtcclxuICAgIGNvbnN0IFt0YWIsIHNldFRhYlN0YXRlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oZ2V0VGFiKCkpO1xyXG4gICAgXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGFiKCk6IFRhYiB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdBc3NldEdyb3VwLlRhYicpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdBc3NldEdyb3VwLlRhYicpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAnaW5mbyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0VGFiKHRhYjogVGFiKTogdm9pZCB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnQXNzZXRHcm91cC5UYWInLCBKU09OLnN0cmluZ2lmeSh0YWIpKTtcclxuICAgICAgICBzZXRUYWJTdGF0ZSh0YWIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFzc2V0R3JvdXAoKSB7XHJcbiAgICAgICBsZXQgaGFuZGxlID0gICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRHcm91cC9PbmUvJHtwcm9wcy5Bc3NldEdyb3VwSUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICB9KVxyXG5cclxuICAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogT3BlblhEQS5Bc3NldEdyb3VwKSA9PiB7XHJcbiAgICAgICAgICAgc2V0QXNzZXRHcm91cChkYXRhKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfVxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGdldERhdGEoKTtcclxuXHJcbiAgICB9LCBbcHJvcHMuQXNzZXRHcm91cElEXSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFsbEFzc2V0R3JvdXBzKCk6IEpRdWVyeVhIUiB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9ICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0R3JvdXBgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBoYW5kbGUuZG9uZShhYXMgPT4gc2V0QWxsQXNzZXRHcm91cHMoYWFzKSk7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xyXG5cclxuICAgICAgICBsZXQgaGFuZGxlMSA9IGdldEFzc2V0R3JvdXAoKTtcclxuICAgICAgICBsZXQgaGFuZGxlMiA9IGdldEFsbEFzc2V0R3JvdXBzKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlMS5hYm9ydCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlMS5hYm9ydCgpO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlMi5hYm9ydCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlMi5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVBc3NldEdyb3VwKCk6IEpRdWVyeS5qcVhIUiB7XHJcblxyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0R3JvdXAvRGVsZXRlYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShhc3NldEdyb3VwKSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiBob21lUGF0aCArICdpbmRleC5jc2h0bWwnLCBzZWFyY2g6ICc/bmFtZT1Bc3NldEdyb3VwcycsIHN0YXRlOiB7fSB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAoYXNzZXRHcm91cCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDYzLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDYzLCBvdmVyZmxvdzogJ2hpZGRlbicsIHBhZGRpbmc6IDE1IH19PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+e2Fzc2V0R3JvdXAuTmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+ICQoJyNkZWxldGVNb2RhbCcpLnNob3coKX0+RGVsZXRlIEFzc2V0IEdyb3VwPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxXYXJuaW5nIElkPXsnZGVsZXRlTW9kYWwnfSBUaXRsZT17J1dhcm5pbmcnfSBDb25maXJtPXsnRGVsZXRlJ30gRGVueT17J0NhbmNlbCd9IENvbnRlbnQ9eydUaGlzIHdpbGwgcGVybWFuZW50bHkgZGVsZXRlIHRoaXMgQXNzZXQgR3JvdXAuIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjb250aW51ZT8nfSBBY3Rpb249eyhyZXN1bHQpID0+IHsgaWYgKHJlc3VsdCkgZGVsZXRlQXNzZXRHcm91cCgpOyB9fS8+XHJcblxyXG4gICAgICAgICAgICA8aHIgLz5cclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtdGFic1wiPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiaW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdpbmZvJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNpbmZvXCI+SW5mbzwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJhc3NldFwiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdhc3NldCcpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjYXNzZXRcIj5Bc3NldHM8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwibWV0ZXJcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignbWV0ZXInKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI21ldGVyXCI+TWV0ZXJzPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcInVzZXJcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYigndXNlcicpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjdXNlclwiPlVzZXJzPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcImFzc2V0Z3JvdXBcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignYXNzZXRncm91cCcpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjYXNzZXRHcm91cFwiPkFzc2V0IEdyb3VwczwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiIHN0eWxlPXt7bWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMzUsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImluZm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImluZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8QXNzZXRncm91cEluZm9XaW5kb3cgQXNzZXRHcm91cD17YXNzZXRHcm91cH0gU3RhdGVTZXR0ZXI9eyhkYXRhKSA9PiBzZXRBc3NldEdyb3VwKGRhdGEpfSBBbGxBc3NldEdyb3Vwcz17YWxsQXNzZXRHcm91cHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImFzc2V0XCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJhc3NldFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxBc3NldEFzc2V0R3JvdXBXaW5kb3cgQXNzZXRHcm91cElEPXtwcm9wcy5Bc3NldEdyb3VwSUR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcIm1ldGVyXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJtZXRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxNZXRlckFzc2V0R3JvdXBXaW5kb3cgQXNzZXRHcm91cElEPXtwcm9wcy5Bc3NldEdyb3VwSUR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcInVzZXJcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cInVzZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VXNlckFzc2V0R3JvdXBXaW5kb3cgQXNzZXRHcm91cElEPXtwcm9wcy5Bc3NldEdyb3VwSUR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImFzc2V0Z3JvdXBcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImFzc2V0Z3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8QXNzZXRHcm91cEFzc2V0R3JvdXBXaW5kb3cgQXNzZXRHcm91cElEPXtwcm9wcy5Bc3NldEdyb3VwSUR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBc3NldEdyb3VwO1xyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIEFzc2V0R3JvdXBJbmZvLnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMTksIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDEwLzE0LzIwMjAgLSBDLiBMYWNrbmVyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcbmltcG9ydCBGb3JtQ2hlY2tCb3ggZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtQ2hlY2tCb3gnO1xuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5mdW5jdGlvbiBBc3NldGdyb3VwSW5mb1dpbmRvdyhwcm9wczogeyBBc3NldEdyb3VwOiBPcGVuWERBLkFzc2V0R3JvdXAsIFN0YXRlU2V0dGVyOiAoYXNzZXQ6IE9wZW5YREEuQXNzZXRHcm91cCkgPT4gdm9pZCwgQWxsQXNzZXRHcm91cHM6IEFycmF5PE9wZW5YREEuQXNzZXRHcm91cD4gfSkge1xuICAgIGxldCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xuICAgIGNvbnN0IFthc3NldEdyb3VwLCBzZXRBc3NldEdyb3VwXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXRHcm91cD4obnVsbCk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRBc3NldEdyb3VwKHByb3BzLkFzc2V0R3JvdXApO1xuICAgICAgICByZXR1cm4gKCkgPT4geyB9XG4gICAgfSwgW3Byb3BzLkFzc2V0R3JvdXBdKVxuXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkFzc2V0R3JvdXApKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaWVsZCA9PSAnTmFtZScpIHtcbiAgICAgICAgICAgIGlmIChhc3NldEdyb3VwLk5hbWUgPT0gbnVsbCB8fCBhc3NldEdyb3VwLk5hbWUubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGlzRXF1YWwoYXNzZXRHcm91cC5OYW1lLCBwcm9wcy5Bc3NldEdyb3VwLk5hbWUpKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFsbEFzc2V0R3JvdXBzLm1hcChpdGVtID0+IGl0ZW0uTmFtZS50b0xvd2VyQ2FzZSgpKS5pbmRleE9mKGFzc2V0R3JvdXAuTmFtZS50b0xvd2VyQ2FzZSgpKSA8IDA7IFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZWRpdEV4aXN0aW5nQXNzZXRHcm91cCgpIHtcblxuICAgIH1cblxuICAgIGlmIChhc3NldEdyb3VwID09IG51bGwpIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5Bc3NldCBHcm91cCBJbmZvcm1hdGlvbjo8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7IGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQXNzZXRHcm91cD4gUmVjb3JkPXthc3NldEdyb3VwfSBGaWVsZD17J05hbWUnfSBMYWJlbD17J05hbWUnfSBGZWVkYmFjaz17J0EgdW5pcXVlIG5hbWUgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3NldEFzc2V0R3JvdXB9IERpc2FibGVkPXtmYWxzZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtQ2hlY2tCb3g8T3BlblhEQS5Bc3NldEdyb3VwPiBSZWNvcmQ9e2Fzc2V0R3JvdXB9IEZpZWxkPXsnRGlzcGxheURhc2hib2FyZCd9IExhYmVsPXsnU2hvdyBBc3NldCBHcm91cCBpbiBEYXNoYm9hcmQnfSBTZXR0ZXI9e3NldEFzc2V0R3JvdXB9IERpc2FibGVkPXtmYWxzZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQXNzZXRHcm91cD4gUmVjb3JkPXthc3NldEdyb3VwfSBGaWVsZD17J0Fzc2V0cyd9IExhYmVsPXsnTnVtLiBvZiBUcmFuc21pc3Npb24gQXNzZXRzJ30gIFZhbGlkPXsoKSA9PiB0cnVlfSBTZXR0ZXI9e3NldEFzc2V0R3JvdXB9IERpc2FibGVkPXt0cnVlfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkFzc2V0R3JvdXA+IFJlY29yZD17YXNzZXRHcm91cH0gRmllbGQ9eydNZXRlcnMnfSBMYWJlbD17J051bS4gb2YgTWV0ZXJzJ30gVmFsaWQ9eygpID0+IHRydWV9IFNldHRlcj17c2V0QXNzZXRHcm91cH0gRGlzYWJsZWQ9e3RydWV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQXNzZXRHcm91cD4gUmVjb3JkPXthc3NldEdyb3VwfSBGaWVsZD17J1VzZXJzJ30gTGFiZWw9eydOdW0uIG9mIFVzZXJzJ30gVmFsaWQ9eygpID0+IHRydWV9IFNldHRlcj17c2V0QXNzZXRHcm91cH0gRGlzYWJsZWQ9e3RydWV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQXNzZXRHcm91cD4gUmVjb3JkPXthc3NldEdyb3VwfSBGaWVsZD17J0Fzc2V0R3JvdXBzJ30gTGFiZWw9eydOdW0uIG9mIEFzc2V0IEdyb3Vwcyd9IFZhbGlkPXsoKSA9PiB0cnVlfSBTZXR0ZXI9e3NldEFzc2V0R3JvdXB9IERpc2FibGVkPXt0cnVlfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdEV4aXN0aW5nQXNzZXRHcm91cCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU3RhdGVTZXR0ZXIoYXNzZXRHcm91cCk7XG4gICAgICAgICAgICAgICAgICAgIH19IGRpc2FibGVkPXtpc0VxdWFsKGFzc2V0R3JvdXAsIHByb3BzLkFzc2V0R3JvdXApfT5TYXZlIENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gc2V0QXNzZXRHcm91cChwcm9wcy5Bc3NldEdyb3VwKX0gZGlzYWJsZWQ9e2lzRXF1YWwoYXNzZXRHcm91cCwgcHJvcHMuQXNzZXRHcm91cCl9PkNsZWFyIENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQXNzZXRncm91cEluZm9XaW5kb3c7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFzc2V0QXNzZXRHcm91cC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMTAvMTQvMjAyMCAtIEMuIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9UYWJsZSc7XHJcbmltcG9ydCBBZGRUb0Fzc2V0R3JvdXAgZnJvbSAnLi9BZGRUb0dyb3VwJztcclxuaW1wb3J0IEFkZFRvR3JvdXBQb3B1cCBmcm9tICcuL0FkZFRvR3JvdXAnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmludGVyZmFjZSBJQXNzZXRHcm91cCB7XHJcbiAgICBJRDogbnVtYmVyLCBOYW1lOiBzdHJpbmcsIERpc3BsYXlEYXNoYm9hcmQ6IGJvb2xlYW4sIEFzc2V0R3JvdXBzOiBudW1iZXIsIE1ldGVyczogbnVtYmVyLCBBc3NldHM6IG51bWJlciwgVXNlcnM6IG51bWJlclxyXG59XHJcblxyXG5mdW5jdGlvbiBBc3NldEdyb3VwQXNzZXRHcm91cFdpbmRvdyhwcm9wczogeyBBc3NldEdyb3VwSUQ6IG51bWJlcn0pIHtcclxuICAgIGxldCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xyXG4gICAgY29uc3QgW2dyb3VwTGlzdCwgc2V0R3JvdXBMaXN0XSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQXNzZXRHcm91cD4+KFtdKTtcclxuICAgIGNvbnN0IFtzb3J0RmllbGQsIHNldFNvcnRGaWVsZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCdOYW1lJyk7XHJcbiAgICBjb25zdCBbYXNjZW5kaW5nLCBzZXRBc2NlbmRpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcbiAgICBjb25zdCBbZWRpdCwgc2V0RWRpdF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICByZXR1cm4gZ2V0RGF0YSgpO1xyXG4gICAgfSwgW3Byb3BzLkFzc2V0R3JvdXBJRF0pXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcclxuICAgICAgICBpZiAocHJvcHMuQXNzZXRHcm91cElEID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7IH07XHJcblxyXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0R3JvdXAvJHtwcm9wcy5Bc3NldEdyb3VwSUR9L0Fzc2V0R3JvdXBzYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGhhbmRsZS5kb25lKChkYXRhOiBBcnJheTxPcGVuWERBLkFzc2V0R3JvdXA+KSA9PiBzZXRHcm91cExpc3QoZGF0YSkpO1xyXG4gICAgICBcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY2xlYW51cCgpIHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEFkZEdyb3Vwcyh0b0FkZCkge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBvc3RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldEdyb3VwLyR7cHJvcHMuQXNzZXRHcm91cElEfS9BZGRBc3NldEdyb3Vwc2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodG9BZGQpLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGhhbmRsZS5kb25lKChkKSA9PiB7IGhpc3RvcnkuZ28oMCk7IH0pXHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5UcmFuc21pc3Npb24gQXNzZXRzIGluIEFzc2V0IEdyb3VwOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyhlZGl0KSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBwdWxsLXJpZ2h0XCIgb25DbGljaz17KCkgPT4geyBzZXRFZGl0KGZhbHNlKSB9fT5WaWV3PC9idXR0b24+IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXsoKSA9PiB7IHNldEVkaXQodHJ1ZSkgfX0+RWRpdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScsIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0cycsIGxhYmVsOiAnTnVtLiBvZiBBc3NldHMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNZXRlcnMnLCBsYWJlbDogJ051bS4gb2YgTWV0ZXJzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnVXNlcnMnLCBsYWJlbDogJ051bS4gb2YgVXNlcnMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldEdyb3VwcycsIGxhYmVsOiAnTnVtLiBvZiBBc3NldCBHcm91cHMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17Z3JvdXBMaXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JkZXJlZCA9IF8ub3JkZXJCeShncm91cExpc3QsIFtkLmNvbF0sIFsoIWFzY2VuZGluZyA/IFwiYXNjXCIgOiBcImRlc2NcIildKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0R3JvdXBMaXN0KG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9yZGVyZWQgPSBfLm9yZGVyQnkoZ3JvdXBMaXN0LCBbZC5jb2xdLCBbXCJhc2NcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRHcm91cExpc3Qob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkKGQuY29sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGRhdGEpID0+IHsgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJz9uYW1lPUFzc2V0R3JvdXAmQXNzZXRHcm91cElEPScgKyBkYXRhLnJvdy5JRCwgc3RhdGU6IHt9IH0pfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWRTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Ym9keVN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93WTogJ3Njcm9sbCcsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzAwLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1N0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoaXRlbSkgPT4gZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxBZGRUb0dyb3VwUG9wdXAgdHlwZT0nR3JvdXAnIG9uQ29tcGxldGU9e0FkZEdyb3Vwc30gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD1cIiNBZGRNZXRlclwiIGRpc2FibGVkPXshZWRpdH0+QWRkIE1ldGVyPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBc3NldEdyb3VwQXNzZXRHcm91cFdpbmRvdzsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQXNzZXRBc3NldEdyb3VwLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAxMC8xNC8yMDIwIC0gQy4gTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBUYWJsZSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1RhYmxlJztcclxuaW1wb3J0IEFkZFRvR3JvdXBQb3B1cCBmcm9tICcuL0FkZFRvR3JvdXAnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuaW50ZXJmYWNlIE1ldGVyIHsgSUQ6IG51bWJlciwgTWV0ZXJOYW1lOiBzdHJpbmcsIE1ldGVySUQ6IG51bWJlciwgQXNzZXRHcm91cElEOiBudW1iZXIsIExvY2F0aW9uOiBzdHJpbmcgfVxyXG5cclxuZnVuY3Rpb24gTWV0ZXJBc3NldEdyb3VwV2luZG93KHByb3BzOiB7IEFzc2V0R3JvdXBJRDogbnVtYmVyfSkge1xyXG4gICAgbGV0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XHJcbiAgICBjb25zdCBbbWV0ZXJMaXN0LCBzZXRNZXRlckxpc3RdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8TWV0ZXI+PihbXSk7XHJcbiAgICBjb25zdCBbc29ydEZpZWxkLCBzZXRTb3J0RmllbGRdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignTWV0ZXJOYW1lJyk7XHJcbiAgICBjb25zdCBbYXNjZW5kaW5nLCBzZXRBc2NlbmRpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcbiAgICBjb25zdCBbZWRpdCwgc2V0RWRpdF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICByZXR1cm4gZ2V0RGF0YSgpO1xyXG4gICAgfSwgW3Byb3BzLkFzc2V0R3JvdXBJRF0pXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcclxuICAgICAgICBpZiAocHJvcHMuQXNzZXRHcm91cElEID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7IH07XHJcblxyXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0R3JvdXAvJHtwcm9wcy5Bc3NldEdyb3VwSUR9L01ldGVyc2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogQXJyYXk8TWV0ZXI+KSA9PiBzZXRNZXRlckxpc3QoZGF0YSkpO1xyXG4gICAgICBcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY2xlYW51cCgpIHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIGZ1bmN0aW9uIEFkZE1ldGVyKHRvQWRkKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9ICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0R3JvdXAvJHtwcm9wcy5Bc3NldEdyb3VwSUR9L0FkZE1ldGVyc2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodG9BZGQpLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGhhbmRsZS5kb25lKChkKSA9PiB7IGhpc3RvcnkuZ28oMCk7IH0pXHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+VHJhbnNtaXNzaW9uIEFzc2V0cyBpbiBBc3NldCBHcm91cDo8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsoZWRpdCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+IHsgc2V0RWRpdChmYWxzZSkgfX0+VmlldzwvYnV0dG9uPiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17KCkgPT4geyBzZXRFZGl0KHRydWUpIH19PkVkaXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01ldGVyTmFtZScsIGxhYmVsOiAnTWV0ZXInLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdMb2NhdGlvbicsIGxhYmVsOiAnU3Vic3RhdGlvbicsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogMTcsIHBhZGRpbmc6IDAgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDAsIHBhZGRpbmc6IDAgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXttZXRlckxpc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmRlcmVkID0gXy5vcmRlckJ5KG1ldGVyTGlzdCwgW2QuY29sXSwgWyghYXNjZW5kaW5nID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXRlckxpc3Qob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JkZXJlZCA9IF8ub3JkZXJCeShtZXRlckxpc3QsIFtkLmNvbF0sIFtcImFzY1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1ldGVyTGlzdChvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTb3J0RmllbGQoZC5jb2wpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZGF0YSkgPT4geyBoaXN0b3J5LnB1c2goeyBwYXRobmFtZTogaG9tZVBhdGggKyAnaW5kZXguY3NodG1sJywgc2VhcmNoOiAnP25hbWU9TWV0ZXImTWV0ZXJJRD0nICsgZGF0YS5yb3cuTWV0ZXJJRCwgc3RhdGU6IHt9IH0pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDMwMCwgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KGl0ZW0pID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8QWRkVG9Hcm91cFBvcHVwIHR5cGU9J01ldGVyJyBvbkNvbXBsZXRlPXtBZGRNZXRlcn0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9XCIjQWRkTWV0ZXJcIiBkaXNhYmxlZD17IWVkaXR9PkFkZCBNZXRlcjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZXRlckFzc2V0R3JvdXBXaW5kb3c7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFzc2V0QXNzZXRHcm91cC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMTAvMTQvMjAyMCAtIEMuIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9UYWJsZSc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5pbnRlcmZhY2UgVXNlciB7IElEOiBudW1iZXIsIFVzZXJBY2NvdW50SUQ6IHN0cmluZywgQXNzZXRHcm91cElEOiBudW1iZXIsIERhc2hib2FyZDogYm9vbGVhbiwgRW1haWw6IGJvb2xlYW4sIFVzZXJuYW1lOiBzdHJpbmcsIEdyb3VwTmFtZTogc3RyaW5nfVxyXG5cclxuZnVuY3Rpb24gVXNlckFzc2V0R3JvdXBXaW5kb3cocHJvcHM6IHsgQXNzZXRHcm91cElEOiBudW1iZXJ9KSB7XHJcbiAgICBsZXQgaGlzdG9yeSA9IHVzZUhpc3RvcnkoKTtcclxuICAgIGNvbnN0IFt1c2VyTGlzdCwgc2V0VXNlckxpc3RdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8VXNlcj4+KFtdKTtcclxuICAgIGNvbnN0IFtzb3J0RmllbGQsIHNldFNvcnRGaWVsZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCdVc2VybmFtZScpO1xyXG4gICAgY29uc3QgW2FzY2VuZGluZywgc2V0QXNjZW5kaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGdldERhdGEoKTtcclxuICAgIH0sIFtwcm9wcy5Bc3NldEdyb3VwSURdKVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XHJcbiAgICAgICAgaWYgKHByb3BzLkFzc2V0R3JvdXBJRCA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4geyB9O1xyXG5cclxuICAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldEdyb3VwLyR7cHJvcHMuQXNzZXRHcm91cElEfS9Vc2Vyc2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogQXJyYXk8VXNlcj4pID0+IHNldFVzZXJMaXN0KGRhdGEpKTtcclxuICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNsZWFudXAoKSB7XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGUuYWJvcnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGhhbmRsZS5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0PlVzZXIgQWNjb3VudHMgaW4gQXNzZXQgR3JvdXA6PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXtbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ1VzZXJuYW1lJywgbGFiZWw6ICdVc2VyIE5hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dXNlckxpc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmRlcmVkID0gXy5vcmRlckJ5KHVzZXJMaXN0LCBbZC5jb2xdLCBbKCFhc2NlbmRpbmcgPyBcImFzY1wiIDogXCJkZXNjXCIpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVzZXJMaXN0KG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9yZGVyZWQgPSBfLm9yZGVyQnkodXNlckxpc3QsIFtkLmNvbF0sIFtcImFzY1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKCFhc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFVzZXJMaXN0KG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZChkLmNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhkYXRhKSA9PiB7fX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWRTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Ym9keVN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93WTogJ3Njcm9sbCcsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzAwLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd1N0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoaXRlbSkgPT4gZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJBc3NldEdyb3VwV2luZG93OyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBXYXJuaW5nTW9kYWwudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDEwLzE1LzIwMjAgLSBDLiBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMgeyBUaXRsZTogc3RyaW5nLCBDb250ZW50OiBzdHJpbmcsIENvbmZpcm06IHN0cmluZywgQWN0aW9uOiAocmVzdWx0OiBib29sZWFuKSA9PiB2b2lkLCBJZDogc3RyaW5nLCBEZW55Pzogc3RyaW5nIH1cclxuXHJcblxyXG5jb25zdCBXYXJuaW5nID0gKHByb3BzOiBJUHJvcHMpID0+IHtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlybVdhcm5pbmcoKSB7XHJcbiAgICAgICAgJCgnIycgKyBwcm9wcy5JZCkuaGlkZSgpO1xyXG4gICAgICAgIHByb3BzLkFjdGlvbih0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5jZWxXYXJuaW5nKCkge1xyXG4gICAgICAgICQoJyMnICsgcHJvcHMuSWQpLmhpZGUoKTtcclxuICAgICAgICBwcm9wcy5BY3Rpb24oZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIGlkPXtwcm9wcy5JZH0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIG1vZGFsLXNtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57cHJvcHMuVGl0bGV9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+e3Byb3BzLkNvbnRlbnR9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2Vzc1wiIG9uQ2xpY2s9eygpID0+IGNvbmZpcm1XYXJuaW5nKCl9Pntwcm9wcy5Db25maXJtfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuRGVueSA9PSB1bmRlZmluZWQgPyBudWxsIDogPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eygpID0+IGNhbmNlbFdhcm5pbmcoKX0+e3Byb3BzLkRlbnl9PC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXYXJuaW5nOyJdLCJzb3VyY2VSb290IjoiIn0=