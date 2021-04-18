(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Meter"],{

/***/ "./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx":
/*!****************************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  ExternalDBUpdate.tsx - Gbtc
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
//  04/07/2020 - C. Lackner
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


function ExternalDataBaseWindow(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), externalDB = _a[0], setexternalDB = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), externalDBFields = _b[0], setFields = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), changed = _c[0], setChanged = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](""), 2), currentDB = _d[0], setCurrentDB = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        setChanged(false);
        setFields([]);
        return getExternalDBs();
    }, [props.ID, props.Type, props.Tab]);
    function getExternalDBs() {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/" + props.Type + "/extDataBases",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) {
            setexternalDB(data);
        });
        return function () {
            if (handle.abort != undefined)
                handle.abort();
        };
    }
    function updateExternalDB(type) {
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/ExternalDB/" + type + "/" + props.Type + "/Update/" + props.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        handle.done(function (data) {
            setFields(data);
            setChanged(true);
            setCurrentDB(type);
            if (data.length < 1)
                cancelUpdate();
        });
        return function () {
            if (handle.abort != undefined)
                handle.abort();
        };
    }
    function cancelUpdate() {
        setFields([]);
        setChanged(false);
    }
    function checkUpdate(data) {
        if (data.length < 1) {
            cancelUpdate();
        }
        else {
            setFields(data);
        }
    }
    function submitUpdate() {
        var handle = $.ajax({
            type: "POST",
            url: homePath + "api/ExternalDB/" + currentDB + "/" + props.Type + "/ConfirmUpdate",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ "data": externalDBFields }),
            cache: false,
            async: true
        });
        setFields([]);
        setChanged(false);
        getExternalDBs();
        return function () {
            if (handle.abort != undefined)
                handle.abort();
        };
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, " External Data Base Connections:")),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { height: window.innerHeight - 540, maxHeight: window.innerHeight - 540, overflowY: 'auto' } }, (changed ? (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { id: "fields", className: 'table' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        props.ID == -1 ?
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null,
                                " ",
                                props.Type,
                                " ") :
                            null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Field"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 300 } }, "Previous Value"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 300 } }, "Updated Value"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 30 } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 30 } }))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, externalDBFields.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](TableRowField, { key: i, ParentTableID: props.ID, Field: a, Values: externalDBFields, Setter: checkUpdate }); })))) : (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { id: "overview", className: 'table' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "External DB"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 250 } }, "Last Updated"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", { style: { width: 300 } }))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, externalDB.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](TableRowInput, { key: i, ParentTableID: props.ID, ExternalDB: a.name, updated: a.lastupdate, Update: function (dbType) {
                        updateExternalDB(dbType);
                    } }); }))))))),
        (changed ?
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: submitUpdate }, "Save Changes")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: cancelUpdate }, "Cancel"))) : null)));
}
/* harmony default export */ __webpack_exports__["default"] = (ExternalDataBaseWindow);
function TableRowInput(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.ExternalDB),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, (props.updated == null ? "N/A" : moment(props.updated).format("MM/DD/YYYY"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function (e) { return props.Update(props.ExternalDB); } },
                "Update ",
                props.ExternalDB))));
}
function TableRowField(props) {
    var values = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Values);
    var value = values.find(function (value) { return value.AdditionalFieldID == props.Field.AdditionalFieldID && value.OpenXDAParentTableID == props.Field.OpenXDAParentTableID && value.isXDAField == props.Field.isXDAField; });
    function removeField() {
        values = values.filter(function (fld) { return !(fld.AdditionalFieldID == props.Field.AdditionalFieldID && fld.OpenXDAParentTableID == props.Field.OpenXDAParentTableID && fld.isXDAField == props.Field.isXDAField); });
        props.Setter(values);
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
        props.ParentTableID == -1 ?
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.DisplayName)
            : null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.FieldName),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.PreviousValue == null ? "" : props.Field.PreviousValue),
        (props.Field.Error ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.Message) :
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (props.Field.Changed ? "form-control is-invalid" : "form-control"), onChange: function (evt) {
                        if (evt.target.value != "")
                            value.Value = evt.target.value;
                        else
                            value.Value = null;
                        value.Changed = true;
                        props.Setter(values);
                    }, value: value.Value == null ? '' : value.Value.toString() }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, props.Field.Error ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-exclamation-triangle" })) : null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return removeField(); } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
}


/***/ }),

/***/ "./TSX/SystemCenter/Meter/Meter.tsx":
/*!******************************************!*\
  !*** ./TSX/SystemCenter/Meter/Meter.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Meter_MeterLocation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Meter/MeterLocation */ "./TSX/SystemCenter/Meter/MeterLocation.tsx");
/* harmony import */ var _MeterInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MeterInfo */ "./TSX/SystemCenter/Meter/MeterInfo.tsx");
/* harmony import */ var _Meter_MeterEventChannel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Meter/MeterEventChannel */ "./TSX/SystemCenter/Meter/MeterEventChannel.tsx");
/* harmony import */ var _Meter_MeterTrendChannel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Meter/MeterTrendChannel */ "./TSX/SystemCenter/Meter/MeterTrendChannel.tsx");
/* harmony import */ var _Meter_MeterAsset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Meter/MeterAsset */ "./TSX/SystemCenter/Meter/MeterAsset.tsx");
/* harmony import */ var _CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommonComponents/NoteWindow */ "./TSX/SystemCenter/CommonComponents/NoteWindow.tsx");
/* harmony import */ var _CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CommonComponents/AdditionalFieldsWindow */ "./TSX/SystemCenter/CommonComponents/AdditionalFieldsWindow.tsx");
/* harmony import */ var _MeterConfigurationHistory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MeterConfigurationHistory */ "./TSX/SystemCenter/Meter/MeterConfigurationHistory.tsx");
/* harmony import */ var _CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../CommonComponents/ExternalDBUpdate */ "./TSX/SystemCenter/CommonComponents/ExternalDBUpdate.tsx");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10__);
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
//  04/15/2020 - Christoph Lackner
//       Added Tab for external Database Fields
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











function Meter(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), meter = _a[0], setMeter = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), Tab = _b[0], setTab = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showDelete = _c[0], setShowDelete = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), loadDelete = _d[0], setLoadDelete = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        setTab(getTab());
        return function () { sessionStorage.clear(); };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (Tab == null)
            return;
        sessionStorage.setItem('Meter.Tab', JSON.stringify(Tab));
    }, [Tab]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getMeter();
        handle.then(function (data) { return setMeter(data); });
        return function () { if (handle != null && handle.abort != null)
            handle.abort(); };
    }, [props.MeterID]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () { }, []);
    function getTab() {
        if (sessionStorage.hasOwnProperty('Meter.Tab'))
            return JSON.parse(sessionStorage.getItem('Meter.Tab'));
        else
            return 'notes';
    }
    function getMeter() {
        if (props.MeterID == undefined)
            return null;
        return $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter/One/" + props.MeterID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }
    function deleteMeter() {
        setLoadDelete(true);
        var handle = $.ajax({
            type: "DELETE",
            url: homePath + "api/OpenXDA/Meter/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(meter),
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.done(function () {
            window.location.href = homePath + 'index.cshtml?name=Meters';
        });
        handle.then(function (d) { return setLoadDelete(false); });
        return handle;
    }
    if (meter == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: '100%', overflow: 'hidden', padding: 15 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, meter.AssetKey)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { maxHeight: 50 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", onClick: function () { return setShowDelete(true); } }, "Delete Meter (Permanent)"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs", style: { maxHeight: 38 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (Tab == "notes" ? " active" : ""), onClick: function () { return setTab('notes'); }, "data-toggle": "tab", href: "#notes" }, "Notes")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (Tab == "meterInfo" ? " active" : ""), onClick: function () { return setTab('meterInfo'); }, "data-toggle": "tab", href: "#meterInfo" }, "Meter Info")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (Tab == "additionalFields" ? " active" : ""), onClick: function () { return setTab('additionalFields'); }, "data-toggle": "tab", href: "#additionalFields" }, "Additional Fields")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (Tab == "substation" ? " active" : ""), onClick: function () { return setTab('substation'); }, "data-toggle": "tab", href: "#substation" }, "Substation")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (Tab == "assets" ? " active" : ""), onClick: function () { return setTab('assets'); }, "data-toggle": "tab", href: "#assets" }, "Assets")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (Tab == "eventChannels" ? " active" : ""), onClick: function () { return setTab('eventChannels'); }, "data-toggle": "tab", href: "#eventChannels" }, "Event Channels")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (Tab == "trendChannels" ? " active" : ""), onClick: function () { return setTab('trendChannels'); }, "data-toggle": "tab", href: "#trendChannels" }, "Trend Channels")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (Tab == "configurationHistory" ? " active" : ""), onClick: function () { return setTab('configurationHistory'); }, "data-toggle": "tab", href: "#configurationHistory" }, "Configuration History")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (Tab == "extDB" ? " active" : ""), onClick: function () { return setTab('extDB'); }, "data-toggle": "tab", href: "#extDB" }, "External DB"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 215, overflow: 'hidden' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (Tab == "notes" ? " active" : "fade"), id: "notes", style: { maxHeight: window.innerHeight - 215 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_6__["default"], { ID: props.MeterID, Type: 'Meter' })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (Tab == "meterInfo" ? " active" : "fade"), id: "meterInfo", style: { maxHeight: window.innerHeight - 215 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MeterInfo__WEBPACK_IMPORTED_MODULE_2__["default"], { Meter: meter, StateSetter: function (meter) { return setMeter(meter); } })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (Tab == "additionalFields" ? " active" : "fade"), id: "additionalFields", style: { maxHeight: window.innerHeight - 215 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_7__["default"], { ID: props.MeterID, Type: 'Meter', Tab: Tab })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (Tab == "substation" ? " active" : "fade"), id: "substation", style: { maxHeight: window.innerHeight - 215 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_MeterLocation__WEBPACK_IMPORTED_MODULE_1__["default"], { Meter: meter, StateSetter: function (meter) { return setMeter(meter); } })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (Tab == "eventChannels" ? " active" : "fade"), id: "eventChannels" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_MeterEventChannel__WEBPACK_IMPORTED_MODULE_3__["default"], { Meter: meter })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (Tab == "trendChannels" ? " active" : "fade"), id: "trendChannels" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_MeterTrendChannel__WEBPACK_IMPORTED_MODULE_4__["default"], { Meter: meter })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (Tab == "assets" ? " active" : "fade"), id: "assets" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_MeterAsset__WEBPACK_IMPORTED_MODULE_5__["default"], { Meter: meter })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (Tab == "configurationHistory" ? " active" : "fade"), id: "configurationHistory" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MeterConfigurationHistory__WEBPACK_IMPORTED_MODULE_8__["default"], { Meter: meter })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (Tab == "extDB" ? " active" : "fade"), id: "extDB" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_9__["default"], { ID: props.MeterID, Type: 'Meter', Tab: Tab }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10__["Warning"], { Message: 'This will permanently Delete this meter and can not be undone.', Show: showDelete, Title: 'Delete Meter ' + meter.AssetKey, CallBack: function (conf) { if (conf)
                deleteMeter(); setShowDelete(false); } }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10__["LoadingScreen"], { Show: loadDelete })));
}
/* harmony default export */ __webpack_exports__["default"] = (Meter);


/***/ }),

/***/ "./TSX/SystemCenter/Meter/MeterAsset.tsx":
/*!***********************************************!*\
  !*** ./TSX/SystemCenter/Meter/MeterAsset.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AssetAttribute/Bus */ "./TSX/SystemCenter/AssetAttribute/Bus.tsx");
/* harmony import */ var _AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AssetAttribute/Breaker */ "./TSX/SystemCenter/AssetAttribute/Breaker.tsx");
/* harmony import */ var _AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AssetAttribute/CapBank */ "./TSX/SystemCenter/AssetAttribute/CapBank.tsx");
/* harmony import */ var _AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AssetAttribute/Line */ "./TSX/SystemCenter/AssetAttribute/Line.tsx");
/* harmony import */ var _AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../AssetAttribute/Transformer */ "./TSX/SystemCenter/AssetAttribute/Transformer.tsx");
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../TS/Services/Asset */ "./TS/Services/Asset.ts");
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @gpa-gemstone/react-table */ "../../node_modules/@gpa-gemstone/react-table/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @gpa-gemstone/gpa-symbols */ "../../node_modules/@gpa-gemstone/gpa-symbols/lib/index.js");
/* harmony import */ var _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10__);
//******************************************************************************************************
//  MeterAsset.tsx - Gbtc
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
//  01/16/2020 - Billy Ernest
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











var MeterAssetWindow = function (props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), meterAssets = _a[0], setMeterAssets = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["AssetAttributes"].getNewAsset('Line')), 2), newEditAsset = _b[0], setNewEditAsset = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), allAssets = _c[0], setAllAssets = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), assetTypes = _d[0], setAssetTypes = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('New'), 2), newEdit = _e[0], setNewEdit = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](0), 2), activeAssetID = _f[0], setActiveAssetID = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('Line'), 2), activeAssetType = _g[0], setActiveAssetType = _g[1];
    var _h = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showEditNew = _h[0], setShoweditNew = _h[1];
    var _j = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showDeleteWarning = _j[0], setShowDeleteWarning = _j[1];
    var _k = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortField = _k[0], setSortField = _k[1];
    var _l = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascending = _l[0], setAscending = _l[1];
    var _m = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showLoading = _m[0], setShowLoading = _m[1];
    var _o = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](0), 2), assetReloadCounter = _o[0], forceAssetReload = _o[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var h = Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__["getAssetTypes"])();
        h.done(function (data) {
            setAssetTypes(data);
        });
        return function () { if (h != null && h.abort != null)
            h.abort(); };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var h = Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__["getAllAssets"])();
        h.done(function (data) {
            setAllAssets(data);
        });
        return function () { if (h != null && h.abort != null)
            h.abort(); };
    }, [assetReloadCounter]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var h = Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__["getAllAssets"])();
        h.done(function (data) {
            setAllAssets(data);
        });
        return function () { if (h != null && h.abort != null)
            h.abort(); };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var h = getMeterAssets();
        h.done(function (data) {
            setMeterAssets(data);
        });
        return function () { if (h != null && h.abort != null)
            h.abort(); };
    }, [props.Meter, ascending, sortField]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (activeAssetID == 0) {
            setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["AssetAttributes"].getNewAsset(activeAssetType));
            setNewEdit('New');
            return;
        }
        var h = Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__["getAssetWithAdditionalFields"])(activeAssetID, activeAssetType);
        h.then(function (record) { setNewEditAsset(record); setNewEdit('Edit'); });
    }, [activeAssetID, activeAssetType]);
    function getMeterAssets() {
        return $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter/" + props.Meter.ID + "/Asset/" + sortField + "/" + (ascending ? 1 : 0),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }
    function deleteAsset() {
        setShowLoading(true);
        $.ajax({
            type: "DELETE",
            url: homePath + "api/OpenXDA/Meter/" + props.Meter.ID + "/Asset/" + activeAssetID + "/" + props.Meter.LocationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (assets) {
            setSortField('AssetKey');
            forceAssetReload(function (x) { return x + 1; });
            setShowLoading(false);
        }).fail(function (msg) {
            setShowLoading(false);
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else
                sessionStorage.clear();
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Assets:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { margin: -20 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { padding: 20 } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_8___default.a, { cols: [
                                { key: 'AssetKey', label: 'Key', headerStyle: { width: 'calc(20%-16px)' }, rowStyle: { width: 'calc(20%-16px)' } },
                                { key: 'AssetName', label: 'Name', headerStyle: { width: 'calc(30%-16px)' }, rowStyle: { width: 'calc(30%-16px)' } },
                                { key: 'AssetType', label: 'Type', headerStyle: { width: 'calc(10%-16px)' }, rowStyle: { width: 'calc(10%-16px)' } },
                                { key: 'VoltageKV', label: 'Base kV', headerStyle: { width: 'calc(10%-16x)' }, rowStyle: { width: 'calc(10%-16px)' } },
                                { key: 'Channels', label: 'Channels', headerStyle: { width: 'calc(10%-16px)' }, rowStyle: { width: 'calc(10%-16px)' } },
                                {
                                    key: null, label: '', headerStyle: { width: 80, paddingLeft: 0, paddingRight: 5 }, rowStyle: { width: 80, paddingLeft: 0, paddingRight: 5 },
                                    content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                                        " ",
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                                setActiveAssetType(item.AssetType);
                                                setActiveAssetID(item.ID);
                                                setShoweditNew(true);
                                            } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_9__["Pencil"])),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) {
                                                setActiveAssetType(item.AssetType);
                                                setActiveAssetID(item.ID);
                                                setShowDeleteWarning(true);
                                            } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, _gpa_gemstone_gpa_symbols__WEBPACK_IMPORTED_MODULE_9__["TrashCan"]))); }
                                }
                            ], tableClass: "table table-hover", data: meterAssets, sortField: sortField, ascending: ascending, onSort: function (d) {
                                if (d.col == null || d.col == 'ID')
                                    return;
                                if (d.col == sortField)
                                    setAscending(!ascending);
                                else {
                                    setAscending(true);
                                    setSortField(d.col);
                                }
                            }, onClick: function (fld) { }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 455, }, rowStyle: { display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10__["Warning"], { Show: showDeleteWarning, CallBack: function (confirmed) { if (confirmed)
                                deleteAsset(); setShowDeleteWarning(false); }, Title: 'Remove this Asset', Message: 'This will permanently remove this Asset from the Meter.' }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10__["LoadingScreen"], { Show: showLoading }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_10__["Modal"], { Show: showEditNew, Title: newEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + newEditAsset.AssetKey + ' for Meter', Size: 'lg', ShowX: true, ShowCancel: false, ConfirmText: 'Save', CallBack: function (confirm) { setShoweditNew(false); if (!confirm)
                                return; }, ConfirmShowToolTip: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["AssetAttributes"].AttributeError(newEditAsset).length > 0, DisableConfirm: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["AssetAttributes"].AttributeError(newEditAsset).length > 0, ConfirmToolTipContent: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["AssetAttributes"].AttributeError(newEditAsset).map(function (e, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { key: i },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ErrorSymbol, null),
                                " ",
                                e); }) },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["AssetAttributes"].AssetAttributeFields, { Asset: newEditAsset, NewEdit: newEdit, AssetTypes: assetTypes, AllAssets: allAssets, UpdateState: setNewEditAsset, GetDifferentAsset: function (assetID) {
                                            setActiveAssetID(assetID);
                                            setActiveAssetType(allAssets.find(function (a) { return a.ID == assetID; }).AssetType);
                                        }, HideSelectAsset: false, HideAssetType: false })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, showAttributes()))))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () {
                        setActiveAssetID(0);
                        setActiveAssetType('Line');
                        setShoweditNew(true);
                    } }, "Add Asset")))));
    function showAttributes() {
        if (newEditAsset.AssetType == 'Breaker')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_2__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset, ShowSpare: true });
        else if (newEditAsset.AssetType == 'Bus')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_1__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'CapacitorBank')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_3__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'Line')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_4__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'Transformer')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_5__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
    }
};
/* harmony default export */ __webpack_exports__["default"] = (MeterAssetWindow);
var ErrorSymbol = function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }); };
/*
export default class MeterAssetWindow extends React.Component<{ Meter: OpenXDA.Meter }, MeterAssetState, {}>{
    constructor(props, context) {
        super(props, context);
        this.state = {
            NewEditAsset: AssetAttributes.getNewAsset('Line'),
            AllAssets: [],
            AssetTypes: [],
            NewEdit: 'New',
            Assets: []

        }

        this.addNewAsset = this.addNewAsset.bind(this);
        this.addExistingAsset = this.addExistingAsset.bind(this);
        this.addNewButton = this.addNewButton.bind(this);
    }

    componentDidMount() {
        this.getMeterAssets();
        getAllAssets().done((assets: Array<OpenXDA.Asset>) => {
            this.setState({ AllAssets: assets });
        });
        getAssetTypes().done((assetTypes: Array<OpenXDA.AssetType>) => {
            this.setState({ AssetTypes: assetTypes });
        });
    }

    deleteAsset(asset: OpenXDA.Asset) {
        $.ajax({
            type: "DELETE",
            url: `${homePath}api/OpenXDA/Meter/${this.props.Meter.ID}/Asset/${asset.ID}/${this.props.Meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((assets: Array<OpenXDA.Asset>) => {
            this.getMeterAssets();
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                sessionStorage.clear();
                this.componentDidMount();
            }

        });
    }

    addNewButton(): void {
        this.setState({ NewEdit: 'New', NewEditAsset: AssetAttributes.getNewAsset('Line') });
    }

    addNewAsset() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/New/Meter/${this.props.Meter.ID}/${this.props.Meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({Asset: this.state.NewEditAsset}),
            cache: false,
            async: true
        }).done(() => {
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                sessionStorage.clear();
                this.componentDidMount();
                this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') });
            }

        });

    }

    addExistingAsset() {
        $.ajax({
            type: "POST",
            url: `${homePath}api/OpenXDA/Asset/Existing/Meter/${this.props.Meter.ID}/${this.props.Meter.LocationID}`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: this.state.NewEditAsset }),
            cache: false,
            async: true
        }).done(() => {
        }).fail((msg) => {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage)
            else {
                sessionStorage.clear();
                this.componentDidMount();
                this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') });
            }

        });

    }


    getMeterAssets(): void {
        $.ajax({
            type: "GET",
            url: `${homePath}api/OpenXDA/Meter/${this.props.Meter.ID}/Asset`,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done((assets: Array<OpenXDA.Asset>) => {
            this.setState({ Assets: assets });
        });
    }

    render() {
        return (
            <div className="card" style={{ marginBottom: 10 }}>
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h4>Assets:</h4>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row" style={{margin: -20}}>
                        <div className="col" style={{padding: 20}}>
                            <div style={{ width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' }}>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Key</th>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>kV</th>
                                            <th>Channels</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.Assets.map((asset: OpenXDA.Asset, index, array) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ width: '20%' }}>{asset.AssetKey}</td>
                                                        <td style={{ width: '30%' }}>{asset.AssetName}</td>
                                                        <td style={{ width: '10%' }}>{asset.AssetType}</td>
                                                        <td style={{ width: '10%' }}>{asset.VoltageKV}</td>
                                                        <td style={{ width: '10%' }}>{asset.Channels}</td>
                                                        <td style={{ width: '10%' }}>
                                                            <button className="btn btn-sm" data-toggle='modal' data-target='#assetModal' onClick={(e) => {
                                                                let assetType = this.state.AssetTypes.find(at => at.ID == asset['AssetTypeID'])
                                                                getAssetWithAdditionalFields(asset.ID, assetType.Name).then(record => this.setState({ NewEditAsset: record, NewEdit: 'Edit' }));
                                                            }}><span><i className="fa fa-pencil"></i></span></button>
                                                            <button className="btn btn-sm" onClick={(e) => this.deleteAsset(asset)}><span><i className="fa fa-times"></i></span></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div className="modal" id="assetModal">
                        <div className="modal-dialog" style={{maxWidth: '100%', width: '75%'}}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">{this.state.NewEdit == 'New' ? 'Add New Asset to Meter': 'Edit ' + this.state.NewEditAsset.AssetKey + ' for Meter' }</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={(evt) => {
                                        this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') })
                                    }}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col">
                                            <AssetAttributes Asset={this.state.NewEditAsset} NewEdit={this.state.NewEdit} AssetTypes={this.state.AssetTypes} AllAssets={this.state.AllAssets} UpdateState={(asset) => this.setState({ NewEditAsset: asset })} GetDifferentAsset={(assetID) => {
                                                let asset = this.state.AllAssets.find(a => a.ID == assetID);
                                                let assetType = this.state.AssetTypes.find(at => at.ID == asset['AssetTypeID'])
                                                getAssetWithAdditionalFields(assetID, assetType.Name).then(asset => this.setState({ NewEditAsset: asset }));
                                            }} />
                                        </div>
                                        <div className="col">
                                            { this.showAttributes() }
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNewAsset} hidden={this.state.NewEdit == 'Edit' || this.state.NewEditAsset.ID != 0}>Save</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addExistingAsset} hidden={this.state.NewEdit == 'Edit' || this.state.NewEditAsset.ID == 0 }>Save</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => {
                                        editExistingAsset(this.state.NewEditAsset).then((asset) => {
                                            sessionStorage.clear();
                                            this.componentDidMount();
                                            this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') });
                                        });
                                    }} hidden={this.state.NewEdit == 'New'}>Save</button>


                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={(evt) => {
                                        this.setState({ NewEditAsset: AssetAttributes.getNewAsset('Line') })
                                    }}>Close</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="btn-group mr-2">
                        <button className="btn btn-primary pull-right" data-toggle='modal' data-target='#assetModal' onClick={this.addNewButton}>Add Asset</button>
                    </div>
                </div>
            </div>
        );
    }

    showAttributes(): JSX.Element {
        if (this.state.NewEditAsset.AssetType == 'Breaker')
            return <BreakerAttributes NewEdit={this.state.NewEdit} Asset={this.state.NewEditAsset as OpenXDA.Breaker} UpdateState={(newEditAsset: OpenXDA.Breaker) => this.setState({ NewEditAsset: newEditAsset })} ShowSpare={true} />;
        else if (this.state.NewEditAsset.AssetType == 'Bus')
            return <BusAttributes NewEdit={this.state.NewEdit} Asset={this.state.NewEditAsset} UpdateState={(newEditAsset: OpenXDA.Bus) => this.setState({NewEditAsset: newEditAsset})} />;
        else if (this.state.NewEditAsset.AssetType == 'CapacitorBank')
            return <CapBankAttributes NewEdit={this.state.NewEdit} Asset={this.state.NewEditAsset as OpenXDA.CapBank} UpdateState={(newEditAsset: OpenXDA.CapBank) => this.setState({ NewEditAsset: newEditAsset })} />;
        else if (this.state.NewEditAsset.AssetType == 'Line')
            return <LineAttributes NewEdit={this.state.NewEdit} Asset={this.state.NewEditAsset as OpenXDA.Line} UpdateState={(newEditAsset: OpenXDA.Line) => this.setState({ NewEditAsset: newEditAsset })} />;
        else if (this.state.NewEditAsset.AssetType == 'Transformer')
            return <TransformerAttributes NewEdit={this.state.NewEdit}Asset={this.state.NewEditAsset as OpenXDA.Transformer} UpdateState={(newEditAsset: OpenXDA.Transformer) => this.setState({ NewEditAsset: newEditAsset })} />;
    }
}

*/ 


/***/ }),

/***/ "./TSX/SystemCenter/Meter/MeterConfigurationHistory.tsx":
/*!**************************************************************!*\
  !*** ./TSX/SystemCenter/Meter/MeterConfigurationHistory.tsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  MeterConfigurationHistory.tsx - Gbtc
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
//  01/28/2020 - Billy Ernest
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


function MeterConfigurationHistoryWindow(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), meterConfigurations = _a[0], setMeterConfigurations = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        getData();
    }, [props.Meter]);
    function getData() {
        getMeterConfigurations();
    }
    function getMeterConfigurations() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/MeterConfiguration/Meter/" + props.Meter.ID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (data) { return setMeterConfigurations(data); });
    }
    function handleSelect(item) {
        history.push({ pathname: homePath + "index.cshtml", search: "?name=ConfigurationHistory&MeterKey=" + props.Meter.AssetKey + "&MeterConfigurationID=" + item.ID, state: {} });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Configuration History:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: 'table' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "Revision"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "Files Processed"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "Last Processed Time"))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, meterConfigurations.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: i, style: { cursor: 'pointer' }, onClick: function (e) { return handleSelect(a); } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, a.Revision),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, a.FilesProcessed),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, a.LastProcessedTime)); })))))));
}
/* harmony default export */ __webpack_exports__["default"] = (MeterConfigurationHistoryWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Meter/MeterEventChannel.tsx":
/*!******************************************************!*\
  !*** ./TSX/SystemCenter/Meter/MeterEventChannel.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  MeterEventChannel.tsx - Gbtc
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
//  01/03/2020 - Billy Ernest
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



var MeterEventChannelWindow = /** @class */ (function (_super) {
    __extends(MeterEventChannelWindow, _super);
    function MeterEventChannelWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Channels: [],
            Phases: [],
            MeasurementTypes: [],
            AllAssets: []
        };
        _this.getChannels = _this.getChannels.bind(_this);
        _this.updateChannels = _this.updateChannels.bind(_this);
        return _this;
    }
    MeterEventChannelWindow.prototype.componentDidMount = function () {
        this.getPhases();
        this.getAssets();
        this.getMeasurementTypes();
        this.getChannels();
    };
    MeterEventChannelWindow.prototype.getChannels = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter/" + this.props.Meter.ID + "/Channels/Event",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (channels) {
            var makeChannels = channels.map(function (channel) { return channel; });
            _this.setState({ Channels: makeChannels });
        });
    };
    MeterEventChannelWindow.prototype.updateChannels = function () {
        var _this = this;
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Meter/" + this.props.Meter.ID + "/Channel/Update/Event",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Channels: this.state.Channels }),
            cache: false,
            async: true
        }).done(function () {
            _this.getChannels();
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                _this.getChannels();
            }
        });
        ;
    };
    MeterEventChannelWindow.prototype.getAssets = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter/" + this.props.Meter.ID + "/Asset",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (assets) {
            _this.setState({ AllAssets: assets });
        });
    };
    MeterEventChannelWindow.prototype.getPhases = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('SystemCenter.Phases'))
            this.setState({ Phases: JSON.parse(sessionStorage.getItem('SystemCenter.Phases')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/Phase",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (phases) {
                _this.setState({ Phases: phases });
                sessionStorage.setItem('NewMeterWizard.Phases', JSON.stringify(phases));
            });
    };
    MeterEventChannelWindow.prototype.getMeasurementTypes = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('OpenXDA.MeasurementTypes'))
            this.setState({ MeasurementTypes: JSON.parse(sessionStorage.getItem('OpenXDA.MeasurementTypes')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/MeasurementType",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (measurementTypes) {
                _this.setState({ MeasurementTypes: measurementTypes });
                sessionStorage.setItem('OpenXDA.MeasurementTypes', JSON.stringify(measurementTypes));
            });
    };
    MeterEventChannelWindow.prototype.deleteChannel = function (index) {
        var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.Channels);
        var record = channels.splice(index, 1)[0];
        this.setState({ Channels: channels });
    };
    MeterEventChannelWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Channels:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table table-hover" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Channel"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Name"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Desc"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Type"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Phase"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Adder"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Multiplier"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Asset"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, this.state.Channels.map(function (channel, index, array) {
                            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Series[0].SourceIndexes, onChange: function (event) {
                                            channel.Series[0].SourceIndexes = event.target.value;
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '15%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Name, onChange: function (event) {
                                            channel.Name = event.target.value;
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '30%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Description == null ? '' : channel.Description, onChange: function (event) {
                                            channel.Description = event.target.value;
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.MeasurementType, onChange: function (event) {
                                        channel.MeasurementType = event.target.value;
                                        _this.setState({ Channels: array });
                                    } }, _this.state.MeasurementTypes.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.Phase, onChange: function (event) {
                                        channel.Phase = event.target.value;
                                        _this.setState({ Channels: array });
                                    } }, _this.state.Phases.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Adder, onChange: function (event) {
                                            channel.Adder = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["toNumber"])(event.target.value);
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Multiplier, onChange: function (event) {
                                            channel.Multiplier = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["toNumber"])(event.target.value);
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.Asset, onChange: function (event) {
                                        channel.Asset = event.target.value;
                                        _this.setState({ Channels: array });
                                    } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "" }),
                                    _this.state.AllAssets.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.AssetKey }, a.AssetKey); }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return _this.deleteChannel(index); } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                        }))))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () {
                            var channel = { ID: 0, Meter: _this.props.Meter.AssetKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] };
                            var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.Channels);
                            channels.push(channel);
                            _this.setState({ Channels: channels });
                        } }, "Add Channel")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: this.updateChannels }, "Save Changes")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: this.getChannels }, "Clear Changes")))));
    };
    return MeterEventChannelWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MeterEventChannelWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Meter/MeterInfo.tsx":
/*!**********************************************!*\
  !*** ./TSX/SystemCenter/Meter/MeterInfo.tsx ***!
  \**********************************************/
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
/* harmony import */ var _PropertyUI_MeterProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PropertyUI/MeterProperties */ "./TSX/SystemCenter/Meter/PropertyUI/MeterProperties.tsx");
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




var MeterInforWindow = function (props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](props.Meter), 2), meter = _a[0], setMeter = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), loading = _b[0], setLoading = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), assetKeyValid = _c[0], setAssetKeyValid = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](props.Meter.AssetKey), 2), assetKey = _d[0], setAssetKey = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('none'), 2), hover = _e[0], setHover = _e[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () { setMeter(props.Meter); }, [props.Meter]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (assetKey != meter.AssetKey)
            setAssetKey(meter.AssetKey);
    }, [meter]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = validateAssetKey();
        return function () { if (handle != null && handle.abort != null)
            handle.abort(); };
    }, [assetKey]);
    function updateMeter() {
        setLoading(true);
        var updatedMeter = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](meter);
        $.ajax({
            type: "PATCH",
            url: homePath + "api/OpenXDA/Meter/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(updatedMeter),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (meterID) {
            props.StateSetter(updatedMeter);
            setLoading(false);
        });
    }
    function validateAssetKey() {
        if (assetKey == null || assetKey.length == 0 || assetKey.length > 50)
            return null;
        var h = $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/MeterList/SearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: [{ FieldName: 'AssetKey', Operator: "=", SearchText: assetKey, Type: 'string' }], OrderBy: "AssetKey", Ascending: true }),
            cache: false,
            async: true
        });
        h.done(function (d) {
            var meters = JSON.parse(d);
            if (meters.length == 0)
                setAssetKeyValid(true);
            else if (meters.length > 1)
                setAssetKeyValid(false);
            else if (meters[0].ID == meter.ID)
                setAssetKeyValid(true);
            else
                setAssetKeyValid(false);
        });
        return h;
    }
    function valid(field) {
        if (field == 'AssetKey')
            return meter.AssetKey != null && meter.AssetKey.length > 0 && meter.AssetKey.length <= 50 && assetKeyValid;
        else if (field == 'Name')
            return meter.Name != null && meter.Name.length > 0 && meter.Name.length <= 200;
        else if (field == 'Alias')
            return meter.Alias == null || meter.Alias.length <= 200;
        else if (field == 'ShortName')
            return meter.ShortName == null || meter.ShortName.length <= 50;
        else if (field == 'Make')
            return meter.Make != null && meter.Make.length > 0 && meter.Make.length <= 200;
        else if (field == 'Model')
            return meter.Model != null && meter.Model.length > 0 && meter.Model.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }
    function validMeter() {
        return (valid('AssetKey') && valid('Name') && valid('ShortName') && valid('Alias') && valid('Make') && valid('Model'));
    }
    function hasChanged() {
        if (props.Meter == null)
            return false;
        return props.Meter.AssetKey != meter.AssetKey ||
            props.Meter.Name != meter.Name ||
            props.Meter.ShortName != meter.ShortName ||
            props.Meter.Alias != meter.Alias ||
            props.Meter.Make != meter.Make ||
            props.Meter.Model != meter.Model ||
            props.Meter.TimeZone != meter.TimeZone ||
            props.Meter.Description != meter.Description;
    }
    if (meter == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10, maxHeight: window.innerHeight - 215 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Meter Information:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body", style: { maxHeight: window.innerHeight - 315, overflowY: 'auto' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PropertyUI_MeterProperties__WEBPACK_IMPORTED_MODULE_3__["default"], { Meter: meter, StateSetter: setMeter }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__["LoadingScreen"], { Show: loading })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary" + (validMeter() && hasChanged() ? '' : ' disabled'), type: "submit", onClick: function () { if (validMeter() && hasChanged())
                        updateMeter(); }, "data-tooltip": 'submit', onMouseEnter: function () { return setHover('submit'); }, onMouseLeave: function () { return setHover('none'); } }, "Save Changes")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__["ToolTip"], { Show: (!validMeter() || !hasChanged()) && hover == 'submit', Position: 'top', Theme: 'dark', Target: "submit" },
                !hasChanged() ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, " No changes made.") : null,
                !valid('AssetKey') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ErrorSymbol, null),
                    " A unique AssetKey of less than 50 characters is required.") : null,
                !valid('Name') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ErrorSymbol, null),
                    " Name must be less than 200 characters and is required.") : null,
                !valid('ShortName') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ErrorSymbol, null),
                    "ShortName must be less than 50 characters.") : null,
                !valid('Alias') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ErrorSymbol, null),
                    "Alias must be less than 200 characters.") : null,
                !valid('Make') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ErrorSymbol, null),
                    "Make must be less than 200 characters.") : null,
                !valid('Model') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ErrorSymbol, null),
                    " Model must be less than 200 characters.") : null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default" + (hasChanged() ? '' : ' disabled'), "data-tooltip": "clear", onClick: function () { return setMeter(props.Meter); }, onMouseEnter: function () { return setHover('clear'); }, onMouseLeave: function () { return setHover('none'); } }, "Clear Changes")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_2__["ToolTip"], { Show: hasChanged() && hover == 'clear', Position: 'top', Theme: 'dark', Target: "clear" },
                props.Meter.AssetKey != meter.AssetKey ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WarningSymbol, null),
                    " Changes to assetKey will be discarded.") : null,
                props.Meter.Name != meter.Name ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WarningSymbol, null),
                    " Changes to Name will be discarded.") : null,
                props.Meter.ShortName != meter.ShortName ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WarningSymbol, null),
                    " Changes to ShortName will be discarded.") : null,
                props.Meter.Alias != meter.Alias ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WarningSymbol, null),
                    " Changes to Alias will be discarded.") : null,
                props.Meter.Make != meter.Make ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WarningSymbol, null),
                    " Changes to Make will be discarded.") : null,
                props.Meter.Model != meter.Model ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WarningSymbol, null),
                    " Changes to Model will be discarded.") : null,
                props.Meter.TimeZone != meter.TimeZone ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WarningSymbol, null),
                    " Changes to TimeZone will be discarded.") : null,
                props.Meter.Description != meter.Description ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WarningSymbol, null),
                    " Changes to Description will be discarded.") : null))));
};
var ErrorSymbol = function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }); };
var WarningSymbol = function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#ffc107' }, className: "fa fa-exclamation-triangle" }); };
/* harmony default export */ __webpack_exports__["default"] = (MeterInforWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Meter/MeterLocation.tsx":
/*!**************************************************!*\
  !*** ./TSX/SystemCenter/Meter/MeterLocation.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _PropertyUI_MeterLocationProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PropertyUI/MeterLocationProperties */ "./TSX/SystemCenter/Meter/PropertyUI/MeterLocationProperties.tsx");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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






var LocationWindow = function (props) {
    var newLocation = {
        ID: 0,
        LocationKey: null,
        Name: null,
        Alias: null,
        ShortName: null,
        Latitude: null,
        Longitude: null,
        Description: null,
    };
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](newLocation), 2), location = _a[0], setLocation = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](props.Meter), 2), meter = _b[0], setMeter = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), locationList = _c[0], setLocationList = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), validKey = _d[0], setValidKey = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), hasChanged = _e[0], setHasChanged = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('None'), 2), hover = _f[0], setHover = _f[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getAllLocations();
        return function () { if (handle != null && handle.abort != null)
            handle.abort(); };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var h1 = getLocation();
        var h2 = getAllLocations();
        return function () {
            if (h1 != null && h1.abort != null)
                h1.abort();
            if (h2 != null && h2.abort != null)
                h2.abort();
        };
    }, [meter]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        setMeter(props.Meter);
    }, [props.Meter]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (locationList.length > 0)
            sessionStorage.setItem('SystemCenter.Locations', JSON.stringify(locationList));
    }, [locationList]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var key = location.LocationKey;
        if (key == null || key == '')
            return;
        var index = locationList.filter(function (item) { return item.LocationKey == key; });
        if (index.length == 0)
            setValidKey(true);
        else if (index.length > 1)
            setValidKey(false);
        else
            setValidKey(location.ID == index[0].ID);
    }, [location, locationList]);
    function getAllLocations() {
        if (sessionStorage.hasOwnProperty('SystemCenter.Locations')) {
            setLocationList(JSON.parse(sessionStorage.getItem('SystemCenter.Locations')));
            return null;
        }
        var h = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        h.done(function (mls) {
            setLocationList(mls);
            sessionStorage.setItem('SystemCenter.Locations', JSON.stringify(mls));
        });
        return h;
    }
    function getLocation() {
        if (meter == null || meter.LocationID == null)
            return null;
        if (meter.LocationID == 0) {
            setLocation(newLocation);
            return;
        }
        var handle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location/One/" + meter.LocationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        handle.done(function (d) {
            setLocation(d);
            setLocationList(function (lst) {
                var index = lst.findIndex(function (item) { return item.ID == d.ID; });
                if (index == -1)
                    return __spread(lst, [d]);
                var ulst = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](lst);
                ulst[index] = d;
                return ulst;
            });
        });
        return handle;
    }
    function valid(field) {
        if (field == 'LocationKey')
            return location.LocationKey != null && location.LocationKey.length > 0 && location.LocationKey.length <= 50 && validKey;
        else if (field == 'Name')
            return location.Name != null && location.Name.length > 0 && location.Name.length <= 200;
        else if (field == 'Alias')
            return location.Alias == null || location.Alias.length <= 200;
        else if (field == 'ShortName')
            return location.ShortName == null || location.ShortName.length <= 50;
        else if (field == 'Latitude')
            return location.Latitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(location.Latitude);
        else if (field == 'Longitude')
            return location.Longitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(location.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    }
    var isValidLocation = valid('LocationKey') && valid('Name') && valid('Alias') && valid('ShortName') && valid('Latitude') && valid('Longitude');
    function addNewLocation() {
        var newLocation = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](location);
        newLocation.MeterID = this.props.Meter.ID;
        return $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Location/Add",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(location),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (location) {
            setHasChanged(false);
            setLocation(location);
            props.StateSetter(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(props.Meter));
        });
    }
    function updateLocation() {
        return $.ajax({
            type: "PATCH",
            url: homePath + "api/OpenXDA/Location/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(location),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (d) {
            if (location.ID != props.Meter.LocationID) {
                var m_1 = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(props.Meter);
                m_1.LocationID = location.ID;
                $.ajax({
                    type: "PATCH",
                    url: homePath + "api/OpenXDA/Meter/Update",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(m_1),
                    dataType: 'json',
                    cache: true,
                    async: true
                }).done(function (msg) {
                    props.StateSetter(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(m_1));
                });
            }
            setHasChanged(false);
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10, maxHeight: window.innerHeight - 215 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Meter Location / Substation Information:")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body", style: { maxHeight: window.innerHeight - 315, overflowY: 'auto' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_PropertyUI_MeterLocationProperties__WEBPACK_IMPORTED_MODULE_4__["default"], { Meter: meter, Location: location, Locationlist: locationList, SetLocation: function (loc) { setLocation(loc); setHasChanged(true); }, UpdateMeter: function (m) { setHasChanged(props.Meter.LocationID != (m.LocationID != null ? parseInt(m.LocationID.toString()) : 0)); setMeter(__assign(__assign({}, m), { LocationID: (m.LocationID != null ? parseInt(m.LocationID.toString()) : 0) })); }, DisableLocation: false })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary" + (!hasChanged || !isValidLocation ? ' disabled' : ''), onClick: function () { if (isValidLocation && hasChanged)
                        addNewLocation(); }, hidden: location.ID != 0, onMouseEnter: function () { return setHover('New'); }, onMouseLeave: function () { return setHover('None'); }, "data-tooltip": 'NewLocation' }, "Add New"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3__["ToolTip"], { Show: hover == 'New' && (!hasChanged || !isValidLocation), Position: 'top', Theme: 'dark', Target: "NewLocation" },
                    !validKey ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Key needs to be unique.  ") : null,
                    !valid('LocationKey') && validKey ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Key is required and needs to be less than 50 characters. ") : null,
                    !valid('Name') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Name is required and needs to be less than 200 characters. ") : null,
                    !valid('ShortName') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " ShortName needs to be less than 50 characters. ") : null,
                    !valid('Latitude') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Latitude is required. ") : null,
                    !valid('Longitude') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Longtitude is required. ") : null)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary" + (!hasChanged || !isValidLocation ? ' disabled' : ''), onClick: function () { if (isValidLocation && hasChanged)
                        updateLocation(); }, hidden: location.ID == 0, onMouseEnter: function () { return setHover('Update'); }, onMouseLeave: function () { return setHover('None'); }, "data-tooltip": 'UpdateLocation' }, "Update"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3__["ToolTip"], { Show: hover == 'Update' && (!hasChanged || !isValidLocation), Position: 'top', Theme: 'dark', Target: "UpdateLocation" },
                    !hasChanged ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, " No Changes have been made. ") : null,
                    !validKey ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Key needs to be unique. ") : null,
                    !valid('LocationKey') && validKey ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Key is required and needs to be less than 50 characters. ") : null,
                    !valid('Name') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Name is required and needs to be less than 200 characters. ") : null,
                    !valid('ShortName') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " ShortName needs to be less than 50 characters. ") : null,
                    !valid('Latitude') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Latitude is required. ") : null,
                    !valid('Longitude') ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }),
                        " Longtitude is required. ") : null)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default" + (hasChanged ? '' : ' disabled'), "data-tooltip": 'ResetLocation', onMouseEnter: function () { return setHover('Reset'); }, onMouseLeave: function () { return setHover('None'); }, onClick: function () { if (hasChanged) {
                        setMeter(props.Meter);
                        setHasChanged(false);
                    } } }, "Reset"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_3__["ToolTip"], { Show: hover == 'Reset' && !hasChanged, Position: 'top', Theme: 'dark', Target: "ResetLocation" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, " No Changes have been made."))))));
};
/* harmony default export */ __webpack_exports__["default"] = (LocationWindow);


/***/ }),

/***/ "./TSX/SystemCenter/Meter/MeterTrendChannel.tsx":
/*!******************************************************!*\
  !*** ./TSX/SystemCenter/Meter/MeterTrendChannel.tsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  MeterTrendChannel.tsx - Gbtc
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
//  01/03/2020 - Billy Ernest
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



var MeterTrendChannelWindow = /** @class */ (function (_super) {
    __extends(MeterTrendChannelWindow, _super);
    function MeterTrendChannelWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Channels: [],
            Phases: [],
            MeasurementTypes: [],
            MeasurementCharacteristics: [],
            AllAssets: []
        };
        _this.getChannels = _this.getChannels.bind(_this);
        _this.updateChannels = _this.updateChannels.bind(_this);
        return _this;
    }
    MeterTrendChannelWindow.prototype.componentDidMount = function () {
        this.getPhases();
        this.getAssets();
        this.getMeasurementTypes();
        this.getMeasurementCharacteristics();
        this.getChannels();
    };
    MeterTrendChannelWindow.prototype.getChannels = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter/" + this.props.Meter.ID + "/Channels/Trend",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (channels) {
            var makeChannels = channels.map(function (channel) { return channel; });
            _this.setState({ Channels: makeChannels });
        });
    };
    MeterTrendChannelWindow.prototype.updateChannels = function () {
        var _this = this;
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Meter/" + this.props.Meter.ID + "/Channel/Update/Trend",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Channels: this.state.Channels }),
            cache: false,
            async: true
        }).done(function () {
            _this.getChannels();
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                _this.getChannels();
            }
        });
        ;
    };
    MeterTrendChannelWindow.prototype.getAssets = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter/" + this.props.Meter.ID + "/Asset",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (assets) {
            _this.setState({ AllAssets: assets });
        });
    };
    MeterTrendChannelWindow.prototype.getPhases = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('SystemCenter.Phases'))
            this.setState({ Phases: JSON.parse(sessionStorage.getItem('SystemCenter.Phases')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/Phase",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (phases) {
                _this.setState({ Phases: phases });
                sessionStorage.setItem('NewMeterWizard.Phases', JSON.stringify(phases));
            });
    };
    MeterTrendChannelWindow.prototype.getMeasurementTypes = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('OpenXDA.MeasurementTypes'))
            this.setState({ MeasurementTypes: JSON.parse(sessionStorage.getItem('OpenXDA.MeasurementTypes')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/MeasurementType",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (measurementTypes) {
                _this.setState({ MeasurementTypes: measurementTypes });
                sessionStorage.setItem('OpenXDA.MeasurementTypes', JSON.stringify(measurementTypes));
            });
    };
    MeterTrendChannelWindow.prototype.getMeasurementCharacteristics = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('OpenXDA.MeasurementCharacteristics'))
            this.setState({ MeasurementTypes: JSON.parse(sessionStorage.getItem('OpenXDA.MeasurementCharacteristics')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/MeasurementCharacteristic",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (measurementCharacteristics) {
                _this.setState({ MeasurementCharacteristics: measurementCharacteristics });
                sessionStorage.setItem('OpenXDA.MeasurementCharacteristics', JSON.stringify(measurementCharacteristics));
            });
    };
    MeterTrendChannelWindow.prototype.deleteChannel = function (index) {
        var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.Channels);
        var record = channels.splice(index, 1)[0];
        this.setState({ Channels: channels });
    };
    MeterTrendChannelWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Channels:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table table-hover" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Name"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Desc"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Type"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Characteristic"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Phase"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Harmonic"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Adder"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Multiplier"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Asset"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, this.state.Channels.map(function (channel, index, array) {
                            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '15%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Name, onChange: function (event) {
                                            channel.Name = event.target.value;
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Description == null ? '' : channel.Description, onChange: function (event) {
                                            channel.Description = event.target.value;
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.MeasurementType, onChange: function (event) {
                                        channel.MeasurementType = event.target.value;
                                        _this.setState({ Channels: array });
                                    } }, _this.state.MeasurementTypes.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.MeasurementCharacteristic, onChange: function (event) {
                                        channel.MeasurementCharacteristic = event.target.value;
                                        _this.setState({ Channels: array });
                                    } }, _this.state.MeasurementCharacteristics.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.Phase, onChange: function (event) {
                                        channel.Phase = event.target.value;
                                        _this.setState({ Channels: array });
                                    } }, _this.state.Phases.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.HarmonicGroup, onChange: function (event) {
                                            channel.HarmonicGroup = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["toNumber"])(event.target.value);
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Adder, onChange: function (event) {
                                            channel.Adder = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["toNumber"])(event.target.value);
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Multiplier, onChange: function (event) {
                                            channel.Multiplier = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["toNumber"])(event.target.value);
                                            _this.setState({ Channels: array });
                                        } })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.Asset, onChange: function (event) {
                                        channel.Asset = event.target.value;
                                        _this.setState({ Channels: array });
                                    } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "" }),
                                    _this.state.AllAssets.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.AssetKey }, a.AssetKey); }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return _this.deleteChannel(index); } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                        }))))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () {
                            var channel = { ID: 0, Meter: _this.props.Meter.AssetKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'RMS', Phase: 'AN', Name: 'VAN RMS', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN RMS', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Maximum', SourceIndexes: '' }, { ID: 0, ChannelID: 0, SeriesType: 'Minimum', SourceIndexes: '' }, { ID: 0, ChannelID: 0, SeriesType: 'Average', SourceIndexes: '' }] };
                            var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.Channels);
                            channels.push(channel);
                            _this.setState({ Channels: channels });
                        } }, "Add Channel")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: this.updateChannels }, "Save Changes")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: this.getChannels }, "Clear Changes")))));
    };
    return MeterTrendChannelWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MeterTrendChannelWindow);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9NZXRlci9NZXRlci50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9NZXRlci9NZXRlckFzc2V0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL01ldGVyL01ldGVyQ29uZmlndXJhdGlvbkhpc3RvcnkudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTWV0ZXIvTWV0ZXJFdmVudENoYW5uZWwudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTWV0ZXIvTWV0ZXJJbmZvLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL01ldGVyL01ldGVyTG9jYXRpb24udHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTWV0ZXIvTWV0ZXJUcmVuZENoYW5uZWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLCtCQUErQjtBQUMvQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsMkJBQTJCO0FBQzNCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBVzVCLFNBQVMsc0JBQXNCLENBQUMsS0FJL0I7SUFDUyxzRUFBZ0YsRUFBL0Usa0JBQVUsRUFB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RSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBcUI7NEJBQ3ZoQixJQUFJLFFBQVEsR0FBMkIsNENBQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNwRSxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUN2QixLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7d0JBQzFDLENBQUMsa0JBQXNCLENBQ3JCO2dCQUNOLDZEQUFLLFNBQVMsRUFBQyxnQkFBZ0I7b0JBQzNCLGdFQUFRLFNBQVMsRUFBQyw0QkFBNEIsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsbUJBQXVCLENBQ2hHO2dCQUNOLDZEQUFLLFNBQVMsRUFBQyxnQkFBZ0I7b0JBQzNCLGdFQUFRLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsb0JBQXdCLENBQ25GLENBQ0osQ0FDSixDQUNULENBQUM7SUFDTixDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQUFDLENBdE9vRCwrQ0FBZSxHQXNPbkUiLCJmaWxlIjoiTWV0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgRXh0ZXJuYWxEQlVwZGF0ZS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDQvMDcvMjAyMCAtIEMuIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtTeXN0ZW1DZW50ZXIsIE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBBc3NldEF0dHJpYnV0ZXMgfSBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi9Gb3JtSW5wdXQnO1xyXG5pbXBvcnQgRm9ybUNoZWNrQm94IGZyb20gJy4vRm9ybUNoZWNrQm94JztcclxuaW1wb3J0IEZvcm1TZWxlY3QgZnJvbSAnLi9Gb3JtU2VsZWN0JztcclxuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL21vbWVudC9tb21lbnQnO1xyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBFeHRlcm5hbERhdGFCYXNlV2luZG93KHByb3BzOiB7XHJcbiAgICBJRDogbnVtYmVyLFxyXG4gICAgVHlwZTogJ0Fzc2V0JyB8ICdNZXRlcicgfCAnTG9jYXRpb24nIHwgJ0N1c3RvbWVyJyB8ICdMaW5lJyB8ICdCcmVha2VyJyB8ICdCdXMnIHwgJ0xpbmVTZWdtZW50JyB8ICdDYXBhY2l0b3JCYW5rJyB8ICdUcmFuc2Zvcm1lcicgfCAnQ2FwYWNpdG9yQmFua1JlbGF5JyxcclxuICAgIFRhYjogc3RyaW5nXHJcbn0pOiBKU1guRWxlbWVudCB7XHJcbiAgICBjb25zdCBbZXh0ZXJuYWxEQiwgc2V0ZXh0ZXJuYWxEQl0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQj4+KFtdKTtcclxuICAgIGNvbnN0IFtleHRlcm5hbERCRmllbGRzLCBzZXRGaWVsZHNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZD4+KFtdKTtcclxuICAgIGNvbnN0IFtjaGFuZ2VkLCBzZXRDaGFuZ2VkXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuICAgIGNvbnN0IFtjdXJyZW50REIsIHNldEN1cnJlbnREQl0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KFwiXCIpO1xyXG4gICBcclxuICAgIFxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBzZXRDaGFuZ2VkKGZhbHNlKTtcclxuICAgICAgICBzZXRGaWVsZHMoW10pO1xyXG4gICAgICAgIHJldHVybiBnZXRFeHRlcm5hbERCcygpO1xyXG4gICAgfSwgW3Byb3BzLklELCBwcm9wcy5UeXBlLCBwcm9wcy5UYWJdKTsgXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RXh0ZXJuYWxEQnMoKSB7XHJcbiAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS8ke3Byb3BzLlR5cGV9L2V4dERhdGFCYXNlc2AsIFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgIH0pXHJcblxyXG4gICAgICAgaGFuZGxlLmRvbmUoKGRhdGE6IEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCPikgPT4ge1xyXG4gICAgICAgICAgIHNldGV4dGVybmFsREIoZGF0YSk7XHJcbiAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPSB1bmRlZmluZWQpIGhhbmRsZS5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVFeHRlcm5hbERCKHR5cGU6IHN0cmluZykge1xyXG5cclxuICAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvRXh0ZXJuYWxEQi8ke3R5cGV9LyR7cHJvcHMuVHlwZX0vVXBkYXRlLyR7cHJvcHMuSUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaGFuZGxlLmRvbmUoKGRhdGE6IEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCRmllbGQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHNldEZpZWxkcyhkYXRhKVxyXG4gICAgICAgICAgICBzZXRDaGFuZ2VkKHRydWUpXHJcbiAgICAgICAgICAgIHNldEN1cnJlbnREQih0eXBlKVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCAxKVxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVXBkYXRlKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPSB1bmRlZmluZWQpIGhhbmRsZS5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgIFxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBjYW5jZWxVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgc2V0RmllbGRzKFtdKVxyXG4gICAgICAgIHNldENoYW5nZWQoZmFsc2UpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tVcGRhdGUoZGF0YTogQXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZD4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEZpZWxkcyhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VibWl0VXBkYXRlKCkge1xyXG5cclxuICAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL0V4dGVybmFsREIvJHtjdXJyZW50REJ9LyR7cHJvcHMuVHlwZX0vQ29uZmlybVVwZGF0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBcImRhdGFcIjogZXh0ZXJuYWxEQkZpZWxkcyB9KSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHNldEZpZWxkcyhbXSlcclxuICAgICAgICBzZXRDaGFuZ2VkKGZhbHNlKVxyXG5cclxuICAgICAgICBnZXRFeHRlcm5hbERCcygpO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxoND4gRXh0ZXJuYWwgRGF0YSBCYXNlIENvbm5lY3Rpb25zOjwvaDQ+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDU0MCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHsoY2hhbmdlZD8gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgaWQ9XCJmaWVsZHNcIiBjbGFzc05hbWU9J3RhYmxlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5JRCA9PSAtMSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+IHtwcm9wcy5UeXBlfSA8L3RoPiA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+RmllbGQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDMwMCB9fT5QcmV2aW91cyBWYWx1ZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogMzAwIH19PlVwZGF0ZWQgVmFsdWU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDMwIH19PjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyB3aWR0aDogMzAgfX0+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXh0ZXJuYWxEQkZpZWxkcy5tYXAoKGEsIGkpID0+IDxUYWJsZVJvd0ZpZWxkIGtleT17aX0gUGFyZW50VGFibGVJRD17cHJvcHMuSUR9IEZpZWxkPXthfSBWYWx1ZXM9e2V4dGVybmFsREJGaWVsZHN9IFNldHRlcj17Y2hlY2tVcGRhdGV9IC8+KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+KTooXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBpZD1cIm92ZXJ2aWV3XCIgY2xhc3NOYW1lPSd0YWJsZSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPjx0aD5FeHRlcm5hbCBEQjwvdGg+PHRoIHN0eWxlPXt7IHdpZHRoOiAyNTAgfX0+TGFzdCBVcGRhdGVkPC90aD48dGggc3R5bGU9e3sgd2lkdGg6IDMwMCB9fT48L3RoPjwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXh0ZXJuYWxEQi5tYXAoKGEsIGkpID0+IDxUYWJsZVJvd0lucHV0IGtleT17aX0gUGFyZW50VGFibGVJRD17cHJvcHMuSUR9IEV4dGVybmFsREI9e2EubmFtZX0gdXBkYXRlZD17YS5sYXN0dXBkYXRlfSBVcGRhdGU9eyhkYlR5cGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUV4dGVybmFsREIoZGJUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPilcclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7KGNoYW5nZWQgP1xyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17c3VibWl0VXBkYXRlfT5TYXZlIENoYW5nZXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17Y2FuY2VsVXBkYXRlfT5DYW5jZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgIDwvZGl2PiA6IG51bGwpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXh0ZXJuYWxEYXRhQmFzZVdpbmRvdztcclxuXHJcbmZ1bmN0aW9uIFRhYmxlUm93SW5wdXQocHJvcHM6IHsgUGFyZW50VGFibGVJRDogbnVtYmVyLCBFeHRlcm5hbERCOiBzdHJpbmcsIHVwZGF0ZWQ6IERhdGUsIFVwZGF0ZTogKGV4dGVybmFsREI6IHN0cmluZykgPT4gdm9pZCB9KSB7XHJcbiAgIFxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRkPntwcm9wcy5FeHRlcm5hbERCfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57KHByb3BzLnVwZGF0ZWQgPT0gbnVsbCA/IFwiTi9BXCIgOiBtb21lbnQocHJvcHMudXBkYXRlZCkuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSl9PC90ZD5cclxuICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KGUpID0+IHByb3BzLlVwZGF0ZShwcm9wcy5FeHRlcm5hbERCKX0+VXBkYXRlIHtwcm9wcy5FeHRlcm5hbERCfTwvYnV0dG9uPjwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFRhYmxlUm93RmllbGQocHJvcHM6IHsgUGFyZW50VGFibGVJRDogbnVtYmVyLCBGaWVsZDogU3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZCwgVmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPiwgU2V0dGVyOiAodmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPikgPT4gdm9pZH0pIHtcclxuICAgIHZhciB2YWx1ZXM6IEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCRmllbGQ+ID0gXy5jbG9uZShwcm9wcy5WYWx1ZXMpO1xyXG4gICAgdmFyIHZhbHVlOiBTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkID0gdmFsdWVzLmZpbmQodmFsdWUgPT4gdmFsdWUuQWRkaXRpb25hbEZpZWxkSUQgPT0gcHJvcHMuRmllbGQuQWRkaXRpb25hbEZpZWxkSUQgJiYgdmFsdWUuT3BlblhEQVBhcmVudFRhYmxlSUQgPT0gcHJvcHMuRmllbGQuT3BlblhEQVBhcmVudFRhYmxlSUQgJiYgdmFsdWUuaXNYREFGaWVsZCA9PSBwcm9wcy5GaWVsZC5pc1hEQUZpZWxkKTtcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVGaWVsZCgpIHtcclxuICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuZmlsdGVyKGZsZCA9PiAhKGZsZC5BZGRpdGlvbmFsRmllbGRJRCA9PSBwcm9wcy5GaWVsZC5BZGRpdGlvbmFsRmllbGRJRCAmJiBmbGQuT3BlblhEQVBhcmVudFRhYmxlSUQgPT0gcHJvcHMuRmllbGQuT3BlblhEQVBhcmVudFRhYmxlSUQgJiYgZmxkLmlzWERBRmllbGQgPT0gcHJvcHMuRmllbGQuaXNYREFGaWVsZCkpXHJcbiAgICAgICAgcHJvcHMuU2V0dGVyKHZhbHVlcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgICAge3Byb3BzLlBhcmVudFRhYmxlSUQgPT0gLTEgP1xyXG4gICAgICAgICAgICAgICAgPHRkPntwcm9wcy5GaWVsZC5EaXNwbGF5TmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgOiBudWxsfVxyXG4gICAgICAgICAgICA8dGQ+e3Byb3BzLkZpZWxkLkZpZWxkTmFtZX08L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e3Byb3BzLkZpZWxkLlByZXZpb3VzVmFsdWUgPT0gbnVsbCA/IFwiXCIgOiBwcm9wcy5GaWVsZC5QcmV2aW91c1ZhbHVlfTwvdGQ+XHJcbiAgICAgICAgICAgIHsocHJvcHMuRmllbGQuRXJyb3IgPyA8dGQ+e3Byb3BzLkZpZWxkLk1lc3NhZ2V9PC90ZD4gOlxyXG4gICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9eyhwcm9wcy5GaWVsZC5DaGFuZ2VkID8gXCJmb3JtLWNvbnRyb2wgaXMtaW52YWxpZFwiIDogXCJmb3JtLWNvbnRyb2xcIil9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LnZhbHVlICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5WYWx1ZSA9IGV2dC50YXJnZXQudmFsdWUgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5WYWx1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5DaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKHZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0gdmFsdWU9e3ZhbHVlLlZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlLlZhbHVlLnRvU3RyaW5nKCl9IC8+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPHRkPntwcm9wcy5GaWVsZC5FcnJvciA/IDxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlXCI+PC9pPjwvc3Bhbj4gOiBudWxsfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4gcmVtb3ZlRmllbGQoKX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPjwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICk7XHJcbn1cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE1ldGVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOC8yNy8yMDE5IC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vLyAgMDQvMTUvMjAyMCAtIENocmlzdG9waCBMYWNrbmVyXHJcbi8vICAgICAgIEFkZGVkIFRhYiBmb3IgZXh0ZXJuYWwgRGF0YWJhc2UgRmllbGRzXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IE1ldGVyTG9jYXRpb25XaW5kb3cgZnJvbSAnLi4vTWV0ZXIvTWV0ZXJMb2NhdGlvbic7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgTWV0ZXJJbmZvV2luZG93IGZyb20gJy4vTWV0ZXJJbmZvJztcclxuaW1wb3J0IE1ldGVyRXZlbnRDaGFubmVsV2luZG93IGZyb20gJy4uL01ldGVyL01ldGVyRXZlbnRDaGFubmVsJztcclxuaW1wb3J0IE1ldGVyVHJlbmRDaGFubmVsV2luZG93IGZyb20gJy4uL01ldGVyL01ldGVyVHJlbmRDaGFubmVsJztcclxuaW1wb3J0IE1ldGVyQXNzZXRXaW5kb3cgZnJvbSAnLi4vTWV0ZXIvTWV0ZXJBc3NldCc7XHJcbmltcG9ydCBOb3RlV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvTm90ZVdpbmRvdyc7XHJcbmltcG9ydCBBZGRpdGlvbmFsRmllbGRzV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvQWRkaXRpb25hbEZpZWxkc1dpbmRvdyc7XHJcbmltcG9ydCBNZXRlckNvbmZpZ3VyYXRpb25IaXN0b3J5V2luZG93IGZyb20gJy4vTWV0ZXJDb25maWd1cmF0aW9uSGlzdG9yeSc7XHJcbmltcG9ydCBFeHRlcm5hbERCVXBkYXRlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZSc7XHJcbmltcG9ydCB7IE1vZGFsLCBXYXJuaW5nLCBMb2FkaW5nSWNvbiwgTG9hZGluZ1NjcmVlbiB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMgeyBNZXRlcklEOiBudW1iZXIgfVxyXG5cclxuZnVuY3Rpb24gTWV0ZXIocHJvcHM6IElQcm9wcykge1xyXG4gICAgY29uc3QgW21ldGVyLCBzZXRNZXRlcl0gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLk1ldGVyPihudWxsKTtcclxuICAgIGNvbnN0IFtUYWIsIHNldFRhYl0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KG51bGwpO1xyXG4gICAgY29uc3QgW3Nob3dEZWxldGUsIHNldFNob3dEZWxldGVdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gICAgY29uc3QgW2xvYWREZWxldGUsIHNldExvYWREZWxldGVdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgc2V0VGFiKGdldFRhYigpKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4geyBzZXNzaW9uU3RvcmFnZS5jbGVhcigpOyB9XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoVGFiID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdNZXRlci5UYWInLCBKU09OLnN0cmluZ2lmeShUYWIpKTtcclxuICAgIH0sIFtUYWJdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSBnZXRNZXRlcigpO1xyXG4gICAgICAgIGhhbmRsZS50aGVuKChkYXRhOiBPcGVuWERBLk1ldGVyKSA9PiBzZXRNZXRlcihkYXRhKSk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHsgaWYgKGhhbmRsZSAhPSBudWxsICYmIGhhbmRsZS5hYm9ydCAhPSBudWxsKSBoYW5kbGUuYWJvcnQoKTsgfVxyXG5cclxuICAgIH0sIFtwcm9wcy5NZXRlcklEXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHsgfSwgW10pXHJcbiAgICBmdW5jdGlvbiBnZXRUYWIoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ01ldGVyLlRhYicpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdNZXRlci5UYWInKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJ25vdGVzJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNZXRlcigpOiBKUXVlcnkuanFYSFI8T3BlblhEQS5NZXRlcj4ge1xyXG4gICAgICAgIGlmIChwcm9wcy5NZXRlcklEID09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvT25lLyR7cHJvcHMuTWV0ZXJJRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZU1ldGVyKCk6IEpRdWVyeS5qcVhIUiB7XHJcblxyXG4gICAgICAgIHNldExvYWREZWxldGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyL0RlbGV0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWV0ZXIpLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaGFuZGxlLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbD9uYW1lPU1ldGVycydcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBoYW5kbGUudGhlbigoZCkgPT4gc2V0TG9hZERlbGV0ZShmYWxzZSkpXHJcblxyXG4gICAgICAgIHJldHVybiBoYW5kbGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1ldGVyID09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nOiAxNSB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPnttZXRlci5Bc3NldEtleX08L2gyPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIHN0eWxlPXt7bWF4SGVpZ2h0OiA1MH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dEZWxldGUodHJ1ZSl9PkRlbGV0ZSBNZXRlciAoUGVybWFuZW50KTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGhyIC8+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIiBzdHlsZT17eyBtYXhIZWlnaHQ6IDM4IH19PlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAoVGFiID09IFwibm90ZXNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignbm90ZXMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI25vdGVzXCI+Tm90ZXM8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAoVGFiID09IFwibWV0ZXJJbmZvXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ21ldGVySW5mbycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbWV0ZXJJbmZvXCI+TWV0ZXIgSW5mbzwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArIChUYWIgPT0gXCJhZGRpdGlvbmFsRmllbGRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2FkZGl0aW9uYWxGaWVsZHMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2FkZGl0aW9uYWxGaWVsZHNcIj5BZGRpdGlvbmFsIEZpZWxkczwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArIChUYWIgPT0gXCJzdWJzdGF0aW9uXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ3N1YnN0YXRpb24nKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI3N1YnN0YXRpb25cIj5TdWJzdGF0aW9uPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKFRhYiA9PSBcImFzc2V0c1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdhc3NldHMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2Fzc2V0c1wiPkFzc2V0czwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArIChUYWIgPT0gXCJldmVudENoYW5uZWxzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2V2ZW50Q2hhbm5lbHMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2V2ZW50Q2hhbm5lbHNcIj5FdmVudCBDaGFubmVsczwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArIChUYWIgPT0gXCJ0cmVuZENoYW5uZWxzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ3RyZW5kQ2hhbm5lbHMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI3RyZW5kQ2hhbm5lbHNcIj5UcmVuZCBDaGFubmVsczwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArIChUYWIgPT0gXCJjb25maWd1cmF0aW9uSGlzdG9yeVwiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdjb25maWd1cmF0aW9uSGlzdG9yeScpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjY29uZmlndXJhdGlvbkhpc3RvcnlcIj5Db25maWd1cmF0aW9uIEhpc3Rvcnk8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAoVGFiID09IFwiZXh0REJcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHNldFRhYignZXh0REInKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2V4dERCXCI+RXh0ZXJuYWwgREI8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiIHN0eWxlPXt7IG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjE1LCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArIChUYWIgPT0gXCJub3Rlc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwibm90ZXNcIiBzdHlsZT17eyBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDIxNSB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8Tm90ZVdpbmRvdyBJRD17cHJvcHMuTWV0ZXJJRH0gVHlwZT0nTWV0ZXInIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKFRhYiA9PSBcIm1ldGVySW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwibWV0ZXJJbmZvXCIgc3R5bGU9e3sgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMTUgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPE1ldGVySW5mb1dpbmRvdyBNZXRlcj17bWV0ZXJ9IFN0YXRlU2V0dGVyPXsobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHNldE1ldGVyKG1ldGVyKX0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAoVGFiID09IFwiYWRkaXRpb25hbEZpZWxkc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiYWRkaXRpb25hbEZpZWxkc1wiIHN0eWxlPXt7IG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjE1IH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxBZGRpdGlvbmFsRmllbGRzV2luZG93IElEPXtwcm9wcy5NZXRlcklEfSBUeXBlPSdNZXRlcicgVGFiPXtUYWJ9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKFRhYiA9PSBcInN1YnN0YXRpb25cIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cInN1YnN0YXRpb25cIiBzdHlsZT17eyBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDIxNSB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8TWV0ZXJMb2NhdGlvbldpbmRvdyBNZXRlcj17bWV0ZXJ9IFN0YXRlU2V0dGVyPXsobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHNldE1ldGVyKG1ldGVyKX0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAoVGFiID09IFwiZXZlbnRDaGFubmVsc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiZXZlbnRDaGFubmVsc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxNZXRlckV2ZW50Q2hhbm5lbFdpbmRvdyBNZXRlcj17bWV0ZXJ9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKFRhYiA9PSBcInRyZW5kQ2hhbm5lbHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cInRyZW5kQ2hhbm5lbHNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8TWV0ZXJUcmVuZENoYW5uZWxXaW5kb3cgTWV0ZXI9e21ldGVyfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArIChUYWIgPT0gXCJhc3NldHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImFzc2V0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxNZXRlckFzc2V0V2luZG93IE1ldGVyPXttZXRlcn0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAoVGFiID09IFwiY29uZmlndXJhdGlvbkhpc3RvcnlcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImNvbmZpZ3VyYXRpb25IaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPE1ldGVyQ29uZmlndXJhdGlvbkhpc3RvcnlXaW5kb3cgTWV0ZXI9e21ldGVyfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArIChUYWIgPT0gXCJleHREQlwiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiZXh0REJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8RXh0ZXJuYWxEQlVwZGF0ZSBJRD17cHJvcHMuTWV0ZXJJRH0gVHlwZT0nTWV0ZXInIFRhYj17VGFifSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8V2FybmluZyBNZXNzYWdlPXsnVGhpcyB3aWxsIHBlcm1hbmVudGx5IERlbGV0ZSB0aGlzIG1ldGVyIGFuZCBjYW4gbm90IGJlIHVuZG9uZS4nfSBTaG93PXtzaG93RGVsZXRlfSBUaXRsZT17J0RlbGV0ZSBNZXRlciAnICsgbWV0ZXIuQXNzZXRLZXl9IENhbGxCYWNrPXsoY29uZikgPT4geyBpZiAoY29uZikgZGVsZXRlTWV0ZXIoKTsgc2V0U2hvd0RlbGV0ZShmYWxzZSk7IH19IC8+XHJcbiAgICAgICAgICAgIDxMb2FkaW5nU2NyZWVuIFNob3c9e2xvYWREZWxldGV9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgICAgIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWV0ZXI7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE1ldGVyQXNzZXQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzE2LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuXHJcbmltcG9ydCBCdXNBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0J1cyc7XHJcbmltcG9ydCBCcmVha2VyQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9CcmVha2VyJztcclxuaW1wb3J0IENhcEJhbmtBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmsnO1xyXG5pbXBvcnQgTGluZUF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvTGluZSc7XHJcbmltcG9ydCBUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvVHJhbnNmb3JtZXInO1xyXG5pbXBvcnQgeyBBc3NldEF0dHJpYnV0ZXMgfSBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XHJcbmltcG9ydCB7IGdldEFzc2V0VHlwZXMsIGdldEFsbEFzc2V0cywgZ2V0QXNzZXRXaXRoQWRkaXRpb25hbEZpZWxkcywgZWRpdEV4aXN0aW5nQXNzZXQgfSBmcm9tICcuLi8uLi8uLi9UUy9TZXJ2aWNlcy9Bc3NldCc7XHJcbmltcG9ydCBUYWJsZSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LXRhYmxlJztcclxuaW1wb3J0IHsgUGVuY2lsLCBUcmFzaENhbiB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvZ3BhLXN5bWJvbHMnO1xyXG5pbXBvcnQgeyBXYXJuaW5nLCBNb2RhbCwgTG9hZGluZ1NjcmVlbiB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmludGVyZmFjZSBJUHJvcHMgeyBNZXRlcjogT3BlblhEQS5NZXRlciB9XHJcblxyXG5jb25zdCBNZXRlckFzc2V0V2luZG93ID0gKHByb3BzOiBJUHJvcHMpID0+IHtcclxuXHJcbiAgICBjb25zdCBbbWV0ZXJBc3NldHMsIHNldE1ldGVyQXNzZXRzXSA9IFJlYWN0LnVzZVN0YXRlIDwgQXJyYXk8T3BlblhEQS5EZXRhaWxlZEFzc2V0Pj4oW10pO1xyXG4gICAgY29uc3QgW25ld0VkaXRBc3NldCwgc2V0TmV3RWRpdEFzc2V0XSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuRGV0YWlsZWRBc3NldD4oQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xyXG4gICAgY29uc3QgW2FsbEFzc2V0cywgc2V0QWxsQXNzZXRzXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXRbXT4oW10pO1xyXG4gICAgY29uc3QgW2Fzc2V0VHlwZXMsIHNldEFzc2V0VHlwZXNdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldFR5cGVbXT4oW10pO1xyXG4gICAgY29uc3QgW25ld0VkaXQsIHNldE5ld0VkaXRdID0gUmVhY3QudXNlU3RhdGU8U3lzdGVtQ2VudGVyLk5ld0VkaXQ+KCdOZXcnKTtcclxuICAgIGNvbnN0IFthY3RpdmVBc3NldElELCBzZXRBY3RpdmVBc3NldElEXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oMCk7XHJcbiAgICBjb25zdCBbYWN0aXZlQXNzZXRUeXBlLCBzZXRBY3RpdmVBc3NldFR5cGVdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldFR5cGVOYW1lPignTGluZScpO1xyXG5cclxuICAgIGNvbnN0IFtzaG93RWRpdE5ldywgc2V0U2hvd2VkaXROZXddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gICAgY29uc3QgW3Nob3dEZWxldGVXYXJuaW5nLCBzZXRTaG93RGVsZXRlV2FybmluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gICAgY29uc3QgW3NvcnRGaWVsZCwgc2V0U29ydEZpZWxkXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJ0Fzc2V0S2V5Jyk7XHJcbiAgICBjb25zdCBbYXNjZW5kaW5nLCBzZXRBc2NlbmRpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcbiAgICBjb25zdCBbc2hvd0xvYWRpbmcsIHNldFNob3dMb2FkaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuXHJcbiAgICBjb25zdCBbYXNzZXRSZWxvYWRDb3VudGVyLCBmb3JjZUFzc2V0UmVsb2FkXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oMCk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgaCA9IGdldEFzc2V0VHlwZXMoKVxyXG4gICAgICAgIGguZG9uZSgoZGF0YTogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+KSA9PiB7XHJcbiAgICAgICAgICAgIHNldEFzc2V0VHlwZXMoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7IGlmIChoICE9IG51bGwgJiYgaC5hYm9ydCAhPSBudWxsKSBoLmFib3J0KCk7IH1cclxuICAgIH0sIFtdKVxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGggPSBnZXRBbGxBc3NldHMoKVxyXG4gICAgICAgIGguZG9uZSgoZGF0YTogQXJyYXk8T3BlblhEQS5Bc3NldD4pID0+IHtcclxuICAgICAgICAgICAgc2V0QWxsQXNzZXRzKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4geyBpZiAoaCAhPSBudWxsICYmIGguYWJvcnQgIT0gbnVsbCkgaC5hYm9ydCgpOyB9XHJcbiAgICB9LCBbYXNzZXRSZWxvYWRDb3VudGVyXSlcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxldCBoID0gZ2V0QWxsQXNzZXRzKClcclxuICAgICAgICBoLmRvbmUoKGRhdGE6IEFycmF5PE9wZW5YREEuQXNzZXQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHNldEFsbEFzc2V0cyhkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHsgaWYgKGggIT0gbnVsbCAmJiBoLmFib3J0ICE9IG51bGwpIGguYWJvcnQoKTsgfVxyXG4gICAgfSwgW10pXHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgaCA9IGdldE1ldGVyQXNzZXRzKCk7XHJcbiAgICAgICAgaC5kb25lKChkYXRhOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xyXG4gICAgICAgICAgICBzZXRNZXRlckFzc2V0cyhkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHsgaWYgKGggIT0gbnVsbCAmJiBoLmFib3J0ICE9IG51bGwpIGguYWJvcnQoKTsgfVxyXG4gICAgfSwgW3Byb3BzLk1ldGVyLCBhc2NlbmRpbmcsIHNvcnRGaWVsZF0pXHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoYWN0aXZlQXNzZXRJRCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHNldE5ld0VkaXRBc3NldChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoYWN0aXZlQXNzZXRUeXBlKSk7XHJcbiAgICAgICAgICAgIHNldE5ld0VkaXQoJ05ldycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaCA9IGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMoYWN0aXZlQXNzZXRJRCwgYWN0aXZlQXNzZXRUeXBlKTtcclxuICAgICAgICBoLnRoZW4ocmVjb3JkID0+IHsgc2V0TmV3RWRpdEFzc2V0KHJlY29yZCk7IHNldE5ld0VkaXQoJ0VkaXQnKSB9KTtcclxuXHJcbiAgICB9LCBbYWN0aXZlQXNzZXRJRCwgYWN0aXZlQXNzZXRUeXBlXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TWV0ZXJBc3NldHMoKTogSlF1ZXJ5WEhSIHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci8ke3Byb3BzLk1ldGVyLklEfS9Bc3NldC8ke3NvcnRGaWVsZH0vJHthc2NlbmRpbmc/IDE6IDB9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZUFzc2V0KCkge1xyXG4gICAgICAgIHNldFNob3dMb2FkaW5nKHRydWUpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvJHtwcm9wcy5NZXRlci5JRH0vQXNzZXQvJHthY3RpdmVBc3NldElEfS8ke3Byb3BzLk1ldGVyLkxvY2F0aW9uSUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChhc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHNldFNvcnRGaWVsZCgnQXNzZXRLZXknKTtcclxuICAgICAgICAgICAgZm9yY2VBc3NldFJlbG9hZCgoeCkgPT4geCArIDEpO1xyXG4gICAgICAgICAgICBzZXRTaG93TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFNob3dMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxyXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxyXG4gICAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTsgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+QXNzZXRzOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7IG1hcmdpbjogLTIwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCIgc3R5bGU9e3sgcGFkZGluZzogMjAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA0MjAsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZTxPcGVuWERBLkFzc2V0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e1tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldEtleScsIGxhYmVsOiAnS2V5JywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdjYWxjKDIwJS0xNnB4KScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdjYWxjKDIwJS0xNnB4KScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0TmFtZScsIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnY2FsYygzMCUtMTZweCknIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnY2FsYygzMCUtMTZweCknIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldFR5cGUnLCBsYWJlbDogJ1R5cGUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2NhbGMoMTAlLTE2cHgpJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2NhbGMoMTAlLTE2cHgpJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnVm9sdGFnZUtWJywgbGFiZWw6ICdCYXNlIGtWJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdjYWxjKDEwJS0xNngpJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2NhbGMoMTAlLTE2cHgpJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQ2hhbm5lbHMnLCBsYWJlbDogJ0NoYW5uZWxzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdjYWxjKDEwJS0xNnB4KScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdjYWxjKDEwJS0xNnB4KScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiA4MCwgcGFkZGluZ0xlZnQ6IDAsIHBhZGRpbmdSaWdodDogNSB9LCByb3dTdHlsZTogeyB3aWR0aDogODAsIHBhZGRpbmdMZWZ0OiAwLCBwYWRkaW5nUmlnaHQ6IDUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IChpdGVtKSA9PiA8PiA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZUFzc2V0VHlwZShpdGVtLkFzc2V0VHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZUFzc2V0SUQoaXRlbS5JRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dlZGl0TmV3KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPntQZW5jaWx9PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVBc3NldFR5cGUoaXRlbS5Bc3NldFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlQXNzZXRJRChpdGVtLklEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dEZWxldGVXYXJuaW5nKHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPntUcmFzaENhbn08L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXttZXRlckFzc2V0c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNvcnQ9eyhkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBudWxsIHx8IGQuY29sID09ICdJRCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcoIWFzY2VuZGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkKGQuY29sKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGZsZCkgPT4geyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Ym9keVN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93WTogJ3Njcm9sbCcsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNDU1LCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd1N0eWxlPXt7IGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eyhpdGVtKSA9PiBmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFdhcm5pbmcgU2hvdz17c2hvd0RlbGV0ZVdhcm5pbmd9IENhbGxCYWNrPXsoY29uZmlybWVkKSA9PiB7IGlmIChjb25maXJtZWQpIGRlbGV0ZUFzc2V0KCk7IHNldFNob3dEZWxldGVXYXJuaW5nKGZhbHNlKTsgfX0gVGl0bGU9eydSZW1vdmUgdGhpcyBBc3NldCd9IE1lc3NhZ2U9eydUaGlzIHdpbGwgcGVybWFuZW50bHkgcmVtb3ZlIHRoaXMgQXNzZXQgZnJvbSB0aGUgTWV0ZXIuJ30gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nU2NyZWVuIFNob3c9e3Nob3dMb2FkaW5nfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1vZGFsIFNob3c9e3Nob3dFZGl0TmV3fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRpdGxlPXtuZXdFZGl0ID09ICdOZXcnID8gJ0FkZCBOZXcgQXNzZXQgdG8gTWV0ZXInIDogJ0VkaXQgJyArIG5ld0VkaXRBc3NldC5Bc3NldEtleSArICcgZm9yIE1ldGVyJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXplPXsnbGcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3dYPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3dDYW5jZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpcm1UZXh0PXsnU2F2ZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FsbEJhY2s9eyhjb25maXJtKSA9PiB7IHNldFNob3dlZGl0TmV3KGZhbHNlKTsgaWYgKCFjb25maXJtKSByZXR1cm47IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29uZmlybVNob3dUb29sVGlwPXtBc3NldEF0dHJpYnV0ZXMuQXR0cmlidXRlRXJyb3IobmV3RWRpdEFzc2V0KS5sZW5ndGggPiAwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpc2FibGVDb25maXJtPXtBc3NldEF0dHJpYnV0ZXMuQXR0cmlidXRlRXJyb3IobmV3RWRpdEFzc2V0KS5sZW5ndGggPiAwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmZpcm1Ub29sVGlwQ29udGVudD17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0QXR0cmlidXRlcy5BdHRyaWJ1dGVFcnJvcihuZXdFZGl0QXNzZXQpLm1hcCgoZSwgaSkgPT4gPHAga2V5PXtpfT48RXJyb3JTeW1ib2wgLz4ge2V9PC9wPilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBc3NldEF0dHJpYnV0ZXMuQXNzZXRBdHRyaWJ1dGVGaWVsZHMgQXNzZXQ9e25ld0VkaXRBc3NldH0gTmV3RWRpdD17bmV3RWRpdH0gQXNzZXRUeXBlcz17YXNzZXRUeXBlc30gQWxsQXNzZXRzPXthbGxBc3NldHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZXREaWZmZXJlbnRBc3NldD17KGFzc2V0SUQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlQXNzZXRJRChhc3NldElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlQXNzZXRUeXBlKGFsbEFzc2V0cy5maW5kKGEgPT4gYS5JRCA9PSBhc3NldElEKS5Bc3NldFR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gSGlkZVNlbGVjdEFzc2V0PXtmYWxzZX0gSGlkZUFzc2V0VHlwZT17ZmFsc2V9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Nob3dBdHRyaWJ1dGVzKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVBc3NldElEKDApOyBzZXRBY3RpdmVBc3NldFR5cGUoJ0xpbmUnKTsgc2V0U2hvd2VkaXROZXcodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0+QWRkIEFzc2V0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzaG93QXR0cmlidXRlcygpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0JyZWFrZXInKVxyXG4gICAgICAgICAgICByZXR1cm4gPEJyZWFrZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5CcmVha2VyfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSBTaG93U3BhcmU9e3RydWV9IC8+O1xyXG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0J1cycpXHJcbiAgICAgICAgICAgIHJldHVybiA8QnVzQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0fSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcclxuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdDYXBhY2l0b3JCYW5rJylcclxuICAgICAgICAgICAgcmV0dXJuIDxDYXBCYW5rQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua30gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnTGluZScpXHJcbiAgICAgICAgICAgIHJldHVybiA8TGluZUF0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLkxpbmV9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xyXG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ1RyYW5zZm9ybWVyJylcclxuICAgICAgICAgICAgcmV0dXJuIDxUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLlRyYW5zZm9ybWVyfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWV0ZXJBc3NldFdpbmRvdztcclxuXHJcbmNvbnN0IEVycm9yU3ltYm9sID0gKCkgPT4gPGkgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JywgY29sb3I6ICcjZGMzNTQ1JyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+XHJcblxyXG4vKlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXRlckFzc2V0V2luZG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgTWV0ZXI6IE9wZW5YREEuTWV0ZXIgfSwgTWV0ZXJBc3NldFN0YXRlLCB7fT57XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBOZXdFZGl0QXNzZXQ6IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpLFxyXG4gICAgICAgICAgICBBbGxBc3NldHM6IFtdLFxyXG4gICAgICAgICAgICBBc3NldFR5cGVzOiBbXSxcclxuICAgICAgICAgICAgTmV3RWRpdDogJ05ldycsXHJcbiAgICAgICAgICAgIEFzc2V0czogW11cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZE5ld0Fzc2V0ID0gdGhpcy5hZGROZXdBc3NldC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkRXhpc3RpbmdBc3NldCA9IHRoaXMuYWRkRXhpc3RpbmdBc3NldC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkTmV3QnV0dG9uID0gdGhpcy5hZGROZXdCdXR0b24uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmdldE1ldGVyQXNzZXRzKCk7XHJcbiAgICAgICAgZ2V0QWxsQXNzZXRzKCkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQWxsQXNzZXRzOiBhc3NldHMgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ2V0QXNzZXRUeXBlcygpLmRvbmUoKGFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQXNzZXRUeXBlczogYXNzZXRUeXBlcyB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBc3NldChhc3NldDogT3BlblhEQS5Bc3NldCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvJHt0aGlzLnByb3BzLk1ldGVyLklEfS9Bc3NldC8ke2Fzc2V0LklEfS8ke3RoaXMucHJvcHMuTWV0ZXIuTG9jYXRpb25JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKGFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRNZXRlckFzc2V0cygpO1xyXG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXHJcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50RGlkTW91bnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGROZXdCdXR0b24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXQ6ICdOZXcnLCBOZXdFZGl0QXNzZXQ6IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE5ld0Fzc2V0KCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0L05ldy9NZXRlci8ke3RoaXMucHJvcHMuTWV0ZXIuSUR9LyR7dGhpcy5wcm9wcy5NZXRlci5Mb2NhdGlvbklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe0Fzc2V0OiB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldH0pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFkZEV4aXN0aW5nQXNzZXQoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvRXhpc3RpbmcvTWV0ZXIvJHt0aGlzLnByb3BzLk1ldGVyLklEfS8ke3RoaXMucHJvcHMuTWV0ZXIuTG9jYXRpb25JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgQXNzZXQ6IHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0IH0pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgfSkuZmFpbCgobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRNZXRlckFzc2V0cygpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyLyR7dGhpcy5wcm9wcy5NZXRlci5JRH0vQXNzZXRgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKGFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEFzc2V0czogYXNzZXRzIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+QXNzZXRzOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9e3ttYXJnaW46IC0yMH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIHN0eWxlPXt7cGFkZGluZzogMjB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA0MjAsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtaG92ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5LZXk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+VHlwZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPmtWPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q2hhbm5lbHM8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuQXNzZXRzLm1hcCgoYXNzZXQ6IE9wZW5YREEuQXNzZXQsIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+e2Fzc2V0LkFzc2V0S2V5fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMzAlJyB9fT57YXNzZXQuQXNzZXROYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuQXNzZXRUeXBlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuVm9sdGFnZUtWfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuQ2hhbm5lbHN9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PScjYXNzZXRNb2RhbCcgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldFR5cGUgPSB0aGlzLnN0YXRlLkFzc2V0VHlwZXMuZmluZChhdCA9PiBhdC5JRCA9PSBhc3NldFsnQXNzZXRUeXBlSUQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMoYXNzZXQuSUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKHJlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiByZWNvcmQsIE5ld0VkaXQ6ICdFZGl0JyB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBlbmNpbFwiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRlbGV0ZUFzc2V0KGFzc2V0KX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgaWQ9XCJhc3NldE1vZGFsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgc3R5bGU9e3ttYXhXaWR0aDogJzEwMCUnLCB3aWR0aDogJzc1JSd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnN0YXRlLk5ld0VkaXQgPT0gJ05ldycgPyAnQWRkIE5ldyBBc3NldCB0byBNZXRlcic6ICdFZGl0ICcgKyB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldEtleSArICcgZm9yIE1ldGVyJyB9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFzc2V0QXR0cmlidXRlcyBBc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXR9IE5ld0VkaXQ9e3RoaXMuc3RhdGUuTmV3RWRpdH0gQXNzZXRUeXBlcz17dGhpcy5zdGF0ZS5Bc3NldFR5cGVzfSBBbGxBc3NldHM9e3RoaXMuc3RhdGUuQWxsQXNzZXRzfSBVcGRhdGVTdGF0ZT17KGFzc2V0KSA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBhc3NldCB9KX0gR2V0RGlmZmVyZW50QXNzZXQ9eyhhc3NldElEKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldCA9IHRoaXMuc3RhdGUuQWxsQXNzZXRzLmZpbmQoYSA9PiBhLklEID09IGFzc2V0SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXRUeXBlID0gdGhpcy5zdGF0ZS5Bc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gYXNzZXRbJ0Fzc2V0VHlwZUlEJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMoYXNzZXRJRCwgYXNzZXRUeXBlLk5hbWUpLnRoZW4oYXNzZXQgPT4gdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogYXNzZXQgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnNob3dBdHRyaWJ1dGVzKCkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17dGhpcy5hZGROZXdBc3NldH0gaGlkZGVuPXt0aGlzLnN0YXRlLk5ld0VkaXQgPT0gJ0VkaXQnIHx8IHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LklEICE9IDB9PlNhdmU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXt0aGlzLmFkZEV4aXN0aW5nQXNzZXR9IGhpZGRlbj17dGhpcy5zdGF0ZS5OZXdFZGl0ID09ICdFZGl0JyB8fCB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5JRCA9PSAwIH0+U2F2ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0RXhpc3RpbmdBc3NldCh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCkudGhlbigoYXNzZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50RGlkTW91bnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBoaWRkZW49e3RoaXMuc3RhdGUuTmV3RWRpdCA9PSAnTmV3J30+U2F2ZTwvYnV0dG9uPlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5DbG9zZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNhc3NldE1vZGFsJyBvbkNsaWNrPXt0aGlzLmFkZE5ld0J1dHRvbn0+QWRkIEFzc2V0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QXR0cmlidXRlcygpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQnJlYWtlcicpXHJcbiAgICAgICAgICAgIHJldHVybiA8QnJlYWtlckF0dHJpYnV0ZXMgTmV3RWRpdD17dGhpcy5zdGF0ZS5OZXdFZGl0fSBBc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5CcmVha2VyfSBVcGRhdGVTdGF0ZT17KG5ld0VkaXRBc3NldDogT3BlblhEQS5CcmVha2VyKSA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBuZXdFZGl0QXNzZXQgfSl9IFNob3dTcGFyZT17dHJ1ZX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCdXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gPEJ1c0F0dHJpYnV0ZXMgTmV3RWRpdD17dGhpcy5zdGF0ZS5OZXdFZGl0fSBBc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXR9IFVwZGF0ZVN0YXRlPXsobmV3RWRpdEFzc2V0OiBPcGVuWERBLkJ1cykgPT4gdGhpcy5zZXRTdGF0ZSh7TmV3RWRpdEFzc2V0OiBuZXdFZGl0QXNzZXR9KX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdDYXBhY2l0b3JCYW5rJylcclxuICAgICAgICAgICAgcmV0dXJuIDxDYXBCYW5rQXR0cmlidXRlcyBOZXdFZGl0PXt0aGlzLnN0YXRlLk5ld0VkaXR9IEFzc2V0PXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkNhcEJhbmt9IFVwZGF0ZVN0YXRlPXsobmV3RWRpdEFzc2V0OiBPcGVuWERBLkNhcEJhbmspID0+IHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IG5ld0VkaXRBc3NldCB9KX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdMaW5lJylcclxuICAgICAgICAgICAgcmV0dXJuIDxMaW5lQXR0cmlidXRlcyBOZXdFZGl0PXt0aGlzLnN0YXRlLk5ld0VkaXR9IEFzc2V0PXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkxpbmV9IFVwZGF0ZVN0YXRlPXsobmV3RWRpdEFzc2V0OiBPcGVuWERBLkxpbmUpID0+IHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IG5ld0VkaXRBc3NldCB9KX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdUcmFuc2Zvcm1lcicpXHJcbiAgICAgICAgICAgIHJldHVybiA8VHJhbnNmb3JtZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e3RoaXMuc3RhdGUuTmV3RWRpdH1Bc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5UcmFuc2Zvcm1lcn0gVXBkYXRlU3RhdGU9eyhuZXdFZGl0QXNzZXQ6IE9wZW5YREEuVHJhbnNmb3JtZXIpID0+IHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IG5ld0VkaXRBc3NldCB9KX0gLz47XHJcbiAgICB9XHJcbn1cclxuXHJcbiovIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE1ldGVyQ29uZmlndXJhdGlvbkhpc3RvcnkudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzI4LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuZGVjbGFyZSBpbnRlcmZhY2UgTWV0ZXJDb25maWd1cmF0aW9uIHtcclxuICAgIElEOiBudW1iZXIsXHJcbiAgICBSZXZpc2lvbjogc3RyaW5nLFxyXG4gICAgRmlsZXNQcm9jZXNzZWQ6IG51bWJlcixcclxuICAgIExhc3RQcm9jZXNzZWRUaW1lOiBzdHJpbmdcclxufVxyXG5mdW5jdGlvbiBNZXRlckNvbmZpZ3VyYXRpb25IaXN0b3J5V2luZG93KHByb3BzOiB7IE1ldGVyOiBPcGVuWERBLk1ldGVyIH0pIHtcclxuICAgIGNvbnN0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XHJcbiAgICBjb25zdCBbbWV0ZXJDb25maWd1cmF0aW9ucywgc2V0TWV0ZXJDb25maWd1cmF0aW9uc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxNZXRlckNvbmZpZ3VyYXRpb24+PihbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXREYXRhKCk7XHJcbiAgICB9LCBbcHJvcHMuTWV0ZXJdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gICAgICAgIGdldE1ldGVyQ29uZmlndXJhdGlvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNZXRlckNvbmZpZ3VyYXRpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXJDb25maWd1cmF0aW9uL01ldGVyLyR7cHJvcHMuTWV0ZXIuSUR9YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZGF0YTogQXJyYXk8TWV0ZXJDb25maWd1cmF0aW9uPikgPT4gc2V0TWV0ZXJDb25maWd1cmF0aW9ucyhkYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0KGl0ZW06IE1ldGVyQ29uZmlndXJhdGlvbikge1xyXG4gICAgICAgIGhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiBgJHtob21lUGF0aH1pbmRleC5jc2h0bWxgLCBzZWFyY2g6IGA/bmFtZT1Db25maWd1cmF0aW9uSGlzdG9yeSZNZXRlcktleT0ke3Byb3BzLk1ldGVyLkFzc2V0S2V5fSZNZXRlckNvbmZpZ3VyYXRpb25JRD0ke2l0ZW0uSUR9YCwgc3RhdGU6IHt9IH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkNvbmZpZ3VyYXRpb24gSGlzdG9yeTo8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA0MjAsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT0ndGFibGUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGQ+UmV2aXNpb248L3RkPjx0ZD5GaWxlcyBQcm9jZXNzZWQ8L3RkPjx0ZD5MYXN0IFByb2Nlc3NlZCBUaW1lPC90ZD48L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttZXRlckNvbmZpZ3VyYXRpb25zLm1hcCgoYSwgaSkgPT4gPHRyIGtleT17aX0gc3R5bGU9e3tjdXJzb3I6ICdwb2ludGVyJyB9fSBvbkNsaWNrPXsoZSkgPT4gaGFuZGxlU2VsZWN0KGEpfT48dGQ+e2EuUmV2aXNpb259PC90ZD48dGQ+e2EuRmlsZXNQcm9jZXNzZWR9PC90ZD48dGQ+e2EuTGFzdFByb2Nlc3NlZFRpbWV9PC90ZD48L3RyPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1ldGVyQ29uZmlndXJhdGlvbkhpc3RvcnlXaW5kb3c7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE1ldGVyRXZlbnRDaGFubmVsLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyB0b051bWJlciB9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0ZXJFdmVudENoYW5uZWxXaW5kb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBNZXRlcjogT3BlblhEQS5NZXRlciB9LCB7IENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+LCBQaGFzZXM6IEFycmF5PE9wZW5YREEuUGhhc2U+LCBNZWFzdXJlbWVudFR5cGVzOiBBcnJheTxPcGVuWERBLk1lYXN1cmVtZW50VHlwZT4sIEFsbEFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4gfSwge30+e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgQ2hhbm5lbHM6IFtdLFxyXG4gICAgICAgICAgICBQaGFzZXM6IFtdLFxyXG4gICAgICAgICAgICBNZWFzdXJlbWVudFR5cGVzOiBbXSxcclxuICAgICAgICAgICAgQWxsQXNzZXRzOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRDaGFubmVscyA9IHRoaXMuZ2V0Q2hhbm5lbHMuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoYW5uZWxzID0gdGhpcy51cGRhdGVDaGFubmVscy5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UGhhc2VzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRBc3NldHMoKTtcclxuICAgICAgICB0aGlzLmdldE1lYXN1cmVtZW50VHlwZXMoKTtcclxuICAgICAgICB0aGlzLmdldENoYW5uZWxzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhbm5lbHMoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci8ke3RoaXMucHJvcHMuTWV0ZXIuSUR9L0NoYW5uZWxzL0V2ZW50YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChjaGFubmVsczogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWFrZUNoYW5uZWxzID0gY2hhbm5lbHMubWFwKGNoYW5uZWwgPT4gY2hhbm5lbCBhcyBPcGVuWERBLkNoYW5uZWwpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogIG1ha2VDaGFubmVsc30pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hhbm5lbHMoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvJHt0aGlzLnByb3BzLk1ldGVyLklEfS9DaGFubmVsL1VwZGF0ZS9FdmVudGAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe0NoYW5uZWxzOiB0aGlzLnN0YXRlLkNoYW5uZWxzfSksXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDaGFubmVscygpO1xyXG4gICAgICAgIH0pLmZhaWwobXNnID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxyXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2hhbm5lbHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pOztcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0QXNzZXRzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvJHt0aGlzLnByb3BzLk1ldGVyLklEfS9Bc3NldGAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5kb25lKChhc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQWxsQXNzZXRzOiBhc3NldHMgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBnZXRQaGFzZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdTeXN0ZW1DZW50ZXIuUGhhc2VzJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBQaGFzZXM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnU3lzdGVtQ2VudGVyLlBoYXNlcycpKSB9KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9QaGFzZWAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5kb25lKChwaGFzZXM6IEFycmF5PE9wZW5YREEuUGhhc2U+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgUGhhc2VzOiBwaGFzZXMgfSlcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLlBoYXNlcycsIEpTT04uc3RyaW5naWZ5KHBoYXNlcykpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVhc3VyZW1lbnRUeXBlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ09wZW5YREEuTWVhc3VyZW1lbnRUeXBlcycpKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTWVhc3VyZW1lbnRUeXBlczogSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdPcGVuWERBLk1lYXN1cmVtZW50VHlwZXMnKSkgfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWVhc3VyZW1lbnRUeXBlYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKG1lYXN1cmVtZW50VHlwZXM6IEFycmF5PE9wZW5YREEuTWVhc3VyZW1lbnRUeXBlPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1lYXN1cmVtZW50VHlwZXM6IG1lYXN1cmVtZW50VHlwZXMgfSlcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ09wZW5YREEuTWVhc3VyZW1lbnRUeXBlcycsIEpTT04uc3RyaW5naWZ5KG1lYXN1cmVtZW50VHlwZXMpKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUNoYW5uZWwoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUodGhpcy5zdGF0ZS5DaGFubmVscyk7XHJcbiAgICAgICAgbGV0IHJlY29yZDogT3BlblhEQS5DaGFubmVsID0gY2hhbm5lbHMuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+Q2hhbm5lbHM6PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQyMCwgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtaG92ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5DaGFubmVsPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+RGVzYzwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlBoYXNlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkFkZGVyPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk11bHRpcGxpZXI8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+QXNzZXQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuQ2hhbm5lbHMubWFwKChjaGFubmVsLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICc1JScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5TZXJpZXNbMF0uU291cmNlSW5kZXhlc30gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5TZXJpZXNbMF0uU291cmNlSW5kZXhlcyA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk5hbWV9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuTmFtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMzAlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLkRlc2NyaXB0aW9uID09IG51bGwgPyAnJyA6IGNoYW5uZWwuRGVzY3JpcHRpb259IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuRGVzY3JpcHRpb24gPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk1lYXN1cmVtZW50VHlwZX0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5NZWFzdXJlbWVudFR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT57dGhpcy5zdGF0ZS5NZWFzdXJlbWVudFR5cGVzLm1hcChhID0+IDxvcHRpb24ga2V5PXthLklEfSB2YWx1ZT17YS5OYW1lfT57YS5OYW1lfTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLlBoYXNlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLlBoYXNlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e3RoaXMuc3RhdGUuUGhhc2VzLm1hcChhID0+IDxvcHRpb24ga2V5PXthLklEfSB2YWx1ZT17YS5OYW1lfT57YS5OYW1lfTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLkFkZGVyfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFkZGVyID0gdG9OdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNSUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuTXVsdGlwbGllcn0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5NdWx0aXBsaWVyID0gdG9OdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57PHNlbGVjdCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuQXNzZXR9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj48L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLkFsbEFzc2V0cy5tYXAoYSA9PiA8b3B0aW9uIGtleT17YS5JRH0gdmFsdWU9e2EuQXNzZXRLZXl9PnthLkFzc2V0S2V5fTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRlbGV0ZUNoYW5uZWwoaW5kZXgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsOiBPcGVuWERBLkNoYW5uZWwgPSB7IElEOiAwLCBNZXRlcjogdGhpcy5wcm9wcy5NZXRlci5Bc3NldEtleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0FOJywgTmFtZTogJ1ZBTicsIEFkZGVyOiAwLCBNdWx0aXBsaWVyOiAxLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ1ZvbHRhZ2UgQU4nLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IFt7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzXSB9IGFzIE9wZW5YREEuQ2hhbm5lbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZSh0aGlzLnN0YXRlLkNoYW5uZWxzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5BZGQgQ2hhbm5lbDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMudXBkYXRlQ2hhbm5lbHN9PlNhdmUgQ2hhbmdlczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmdldENoYW5uZWxzfT5DbGVhciBDaGFuZ2VzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE1ldGVySW5mby50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDkvMDkvMjAxOSAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgSW5wdXQsIFNlbGVjdCwgVGV4dEFyZWEgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zJztcclxuaW1wb3J0IHsgTG9hZGluZ1NjcmVlbiwgU2VhcmNoLCBUb29sVGlwIH0gZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZSc7XHJcbmltcG9ydCBNZXRlclByb3BlcnRpZXMgZnJvbSAnLi9Qcm9wZXJ0eVVJL01ldGVyUHJvcGVydGllcyc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuaW50ZXJmYWNlIElQcm9wcyB7IE1ldGVyOiBPcGVuWERBLk1ldGVyLCBTdGF0ZVNldHRlcjogKG1ldGVyOiBPcGVuWERBLk1ldGVyKSA9PiB2b2lkIH1cclxuXHJcbmNvbnN0IE1ldGVySW5mb3JXaW5kb3cgPSAocHJvcHM6IElQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgW21ldGVyLCBzZXRNZXRlcl0gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLk1ldGVyPihwcm9wcy5NZXRlcik7XHJcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcbiAgICBjb25zdCBbYXNzZXRLZXlWYWxpZCwgc2V0QXNzZXRLZXlWYWxpZF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuICAgIGNvbnN0IFthc3NldEtleSwgc2V0QXNzZXRLZXldID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPihwcm9wcy5NZXRlci5Bc3NldEtleSk7XHJcbiAgICBjb25zdCBbaG92ZXIsIHNldEhvdmVyXSA9IFJlYWN0LnVzZVN0YXRlPCgnc3VibWl0JyB8ICdjbGVhcicgfCAnbm9uZScpPignbm9uZScpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7IHNldE1ldGVyKHByb3BzLk1ldGVyKSB9LCBbcHJvcHMuTWV0ZXJdKTtcclxuXHJcbiAgIFxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGFzc2V0S2V5ICE9IG1ldGVyLkFzc2V0S2V5KVxyXG4gICAgICAgICAgICBzZXRBc3NldEtleShtZXRlci5Bc3NldEtleSk7XHJcbiAgICB9LCBbbWV0ZXJdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB2YWxpZGF0ZUFzc2V0S2V5KCk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHsgaWYgKGhhbmRsZSAhPSBudWxsICYmIGhhbmRsZS5hYm9ydCAhPSBudWxsKSBoYW5kbGUuYWJvcnQoKTsgfVxyXG5cclxuICAgIH0sIFthc3NldEtleV0pO1xyXG5cclxuICBcclxuICAgIGZ1bmN0aW9uIHVwZGF0ZU1ldGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICAgICAgbGV0IHVwZGF0ZWRNZXRlcjogT3BlblhEQS5NZXRlciA9IF8uY2xvbmUobWV0ZXIpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUEFUQ0hcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci9VcGRhdGVgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRNZXRlciksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKG1ldGVySUQ6IE51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBwcm9wcy5TdGF0ZVNldHRlcih1cGRhdGVkTWV0ZXIpO1xyXG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUFzc2V0S2V5KCk6IEpRdWVyeS5qcVhIUjxzdHJpbmc+IHtcclxuICAgICAgICBpZiAoYXNzZXRLZXkgPT0gbnVsbCB8fCBhc3NldEtleS5sZW5ndGggPT0gMCB8fCBhc3NldEtleS5sZW5ndGggPiA1MClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGxldCBoID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXJMaXN0L1NlYXJjaGFibGVMaXN0YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IFNlYXJjaGVzOiBbeyBGaWVsZE5hbWU6ICdBc3NldEtleScsIE9wZXJhdG9yOiBcIj1cIiwgU2VhcmNoVGV4dDogYXNzZXRLZXksIFR5cGU6ICdzdHJpbmcnIH0gYXMgU2VhcmNoLklGaWx0ZXI8T3BlblhEQS5NZXRlcj5dLCBPcmRlckJ5OiBcIkFzc2V0S2V5XCIsIEFzY2VuZGluZzogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGguZG9uZSgoZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtZXRlcnMgPSBKU09OLnBhcnNlKGQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1ldGVycy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgIHNldEFzc2V0S2V5VmFsaWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1ldGVycy5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgc2V0QXNzZXRLZXlWYWxpZChmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1ldGVyc1swXS5JRCA9PSBtZXRlci5JRClcclxuICAgICAgICAgICAgICAgIHNldEFzc2V0S2V5VmFsaWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHNldEFzc2V0S2V5VmFsaWQoZmFsc2UpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mKE9wZW5YREEuTWV0ZXIpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdBc3NldEtleScpXHJcbiAgICAgICAgICAgIHJldHVybiBtZXRlci5Bc3NldEtleSAhPSBudWxsICYmIG1ldGVyLkFzc2V0S2V5Lmxlbmd0aCA+IDAgJiYgbWV0ZXIuQXNzZXRLZXkubGVuZ3RoIDw9IDUwICYmIGFzc2V0S2V5VmFsaWQ7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gbWV0ZXIuTmFtZSAhPSBudWxsICYmIG1ldGVyLk5hbWUubGVuZ3RoID4gMCAmJiBtZXRlci5OYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0FsaWFzJylcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGVyLkFsaWFzID09IG51bGwgfHwgbWV0ZXIuQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGVyLlNob3J0TmFtZSA9PSBudWxsIHx8IG1ldGVyLlNob3J0TmFtZS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01ha2UnKVxyXG4gICAgICAgICAgICByZXR1cm4gbWV0ZXIuTWFrZSAhPSBudWxsICYmIG1ldGVyLk1ha2UubGVuZ3RoID4gMCAmJiBtZXRlci5NYWtlLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01vZGVsJylcclxuICAgICAgICAgICAgcmV0dXJuIG1ldGVyLk1vZGVsICE9IG51bGwgJiYgbWV0ZXIuTW9kZWwubGVuZ3RoID4gMCAmJiBtZXRlci5Nb2RlbC5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZE1ldGVyKCkge1xyXG4gICAgICAgIHJldHVybiAodmFsaWQoJ0Fzc2V0S2V5JykgJiYgdmFsaWQoJ05hbWUnKSAmJiB2YWxpZCgnU2hvcnROYW1lJykgJiYgdmFsaWQoJ0FsaWFzJykgJiYgdmFsaWQoJ01ha2UnKSAmJiB2YWxpZCgnTW9kZWwnKSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBmdW5jdGlvbiBoYXNDaGFuZ2VkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChwcm9wcy5NZXRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVyLkFzc2V0S2V5ICE9IG1ldGVyLkFzc2V0S2V5IHx8XHJcbiAgICAgICAgICAgIHByb3BzLk1ldGVyLk5hbWUgIT0gbWV0ZXIuTmFtZSB8fFxyXG4gICAgICAgICAgICBwcm9wcy5NZXRlci5TaG9ydE5hbWUgIT0gbWV0ZXIuU2hvcnROYW1lIHx8XHJcbiAgICAgICAgICAgIHByb3BzLk1ldGVyLkFsaWFzICE9IG1ldGVyLkFsaWFzIHx8XHJcbiAgICAgICAgICAgIHByb3BzLk1ldGVyLk1ha2UgIT0gbWV0ZXIuTWFrZSB8fFxyXG4gICAgICAgICAgICBwcm9wcy5NZXRlci5Nb2RlbCAhPSBtZXRlci5Nb2RlbCB8fFxyXG4gICAgICAgICAgICBwcm9wcy5NZXRlci5UaW1lWm9uZSAhPSBtZXRlci5UaW1lWm9uZSB8fFxyXG4gICAgICAgICAgICBwcm9wcy5NZXRlci5EZXNjcmlwdGlvbiAhPSBtZXRlci5EZXNjcmlwdGlvbiBcclxuICAgIH1cclxuICAgIGlmIChtZXRlciA9PSBudWxsKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMTUgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0Pk1ldGVyIEluZm9ybWF0aW9uOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCIgc3R5bGU9e3sgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzMTUsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgPE1ldGVyUHJvcGVydGllcyBNZXRlcj17bWV0ZXJ9IFN0YXRlU2V0dGVyPXtzZXRNZXRlcn0gLz5cclxuICAgICAgICAgICAgICAgIDxMb2FkaW5nU2NyZWVuIFNob3c9e2xvYWRpbmd9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wiYnRuIGJ0bi1wcmltYXJ5XCIgKyAodmFsaWRNZXRlcigpICYmIGhhc0NoYW5nZWQoKSA/ICcnIDogJyBkaXNhYmxlZCcpfSB0eXBlPVwic3VibWl0XCIgb25DbGljaz17KCkgPT4geyBpZiAodmFsaWRNZXRlcigpICYmIGhhc0NoYW5nZWQoKSkgdXBkYXRlTWV0ZXIoKSB9fSBkYXRhLXRvb2x0aXA9J3N1Ym1pdCcgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRIb3Zlcignc3VibWl0Jyl9IG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXIoJ25vbmUnKX0+U2F2ZSBDaGFuZ2VzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxUb29sVGlwIFNob3c9eyghdmFsaWRNZXRlcigpIHx8ICFoYXNDaGFuZ2VkKCkpICYmIGhvdmVyID09ICdzdWJtaXQnIH0gUG9zaXRpb249eyd0b3AnfSBUaGVtZT17J2RhcmsnfSBUYXJnZXQ9e1wic3VibWl0XCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIHshaGFzQ2hhbmdlZCgpID8gPHA+IE5vIGNoYW5nZXMgbWFkZS48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7IXZhbGlkKCdBc3NldEtleScpID8gPHA+IDxFcnJvclN5bWJvbCAvPiBBIHVuaXF1ZSBBc3NldEtleSBvZiBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycyBpcyByZXF1aXJlZC48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7IXZhbGlkKCdOYW1lJykgPyA8cD4gPEVycm9yU3ltYm9sIC8+IE5hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMgYW5kIGlzIHJlcXVpcmVkLjwvcD4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgIHshdmFsaWQoJ1Nob3J0TmFtZScpID8gPHA+IDxFcnJvclN5bWJvbCAvPlNob3J0TmFtZSBtdXN0IGJlIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzLjwvcD4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgIHshdmFsaWQoJ0FsaWFzJykgPyA8cD4gPEVycm9yU3ltYm9sIC8+QWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuPC9wPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgeyF2YWxpZCgnTWFrZScpID8gPHA+IDxFcnJvclN5bWJvbCAvPk1ha2UgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuPC9wPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgeyF2YWxpZCgnTW9kZWwnKSA/IDxwPiA8RXJyb3JTeW1ib2wgLz4gTW9kZWwgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuPC9wPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICA8L1Rvb2xUaXA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wiYnRuIGJ0bi1kZWZhdWx0XCIgKyAoaGFzQ2hhbmdlZCgpID8gJycgOiAnIGRpc2FibGVkJyl9IGRhdGEtdG9vbHRpcD1cImNsZWFyXCIgb25DbGljaz17KCkgPT4gc2V0TWV0ZXIocHJvcHMuTWV0ZXIpfSBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyKCdjbGVhcicpfSBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyKCdub25lJyl9ID5DbGVhciBDaGFuZ2VzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxUb29sVGlwIFNob3c9e2hhc0NoYW5nZWQoKSAmJiBob3ZlciA9PSAnY2xlYXInfSBQb3NpdGlvbj17J3RvcCd9IFRoZW1lPXsnZGFyayd9IFRhcmdldD17XCJjbGVhclwifT5cclxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuTWV0ZXIuQXNzZXRLZXkgIT0gbWV0ZXIuQXNzZXRLZXkgPyA8cD4gPFdhcm5pbmdTeW1ib2wgLz4gQ2hhbmdlcyB0byBhc3NldEtleSB3aWxsIGJlIGRpc2NhcmRlZC48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuTWV0ZXIuTmFtZSAhPSBtZXRlci5OYW1lID8gPHA+IDxXYXJuaW5nU3ltYm9sIC8+IENoYW5nZXMgdG8gTmFtZSB3aWxsIGJlIGRpc2NhcmRlZC48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuTWV0ZXIuU2hvcnROYW1lICE9IG1ldGVyLlNob3J0TmFtZSA/IDxwPiA8V2FybmluZ1N5bWJvbCAvPiBDaGFuZ2VzIHRvIFNob3J0TmFtZSB3aWxsIGJlIGRpc2NhcmRlZC48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuTWV0ZXIuQWxpYXMgIT0gbWV0ZXIuQWxpYXMgPyA8cD4gPFdhcm5pbmdTeW1ib2wgLz4gQ2hhbmdlcyB0byBBbGlhcyB3aWxsIGJlIGRpc2NhcmRlZC48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuTWV0ZXIuTWFrZSAhPSBtZXRlci5NYWtlID8gPHA+IDxXYXJuaW5nU3ltYm9sIC8+IENoYW5nZXMgdG8gTWFrZSB3aWxsIGJlIGRpc2NhcmRlZC48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuTWV0ZXIuTW9kZWwgIT0gbWV0ZXIuTW9kZWwgPyA8cD4gPFdhcm5pbmdTeW1ib2wgLz4gQ2hhbmdlcyB0byBNb2RlbCB3aWxsIGJlIGRpc2NhcmRlZC48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuTWV0ZXIuVGltZVpvbmUgIT0gbWV0ZXIuVGltZVpvbmUgPyA8cD4gPFdhcm5pbmdTeW1ib2wgLz4gQ2hhbmdlcyB0byBUaW1lWm9uZSB3aWxsIGJlIGRpc2NhcmRlZC48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuTWV0ZXIuRGVzY3JpcHRpb24gIT0gbWV0ZXIuRGVzY3JpcHRpb24gPyA8cD4gPFdhcm5pbmdTeW1ib2wgLz4gQ2hhbmdlcyB0byBEZXNjcmlwdGlvbiB3aWxsIGJlIGRpc2NhcmRlZC48L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgIDwvVG9vbFRpcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuXHJcblxyXG59XHJcblxyXG5jb25zdCBFcnJvclN5bWJvbCA9ICgpID0+IDxpIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnMTBweCcsIGNvbG9yOiAnI2RjMzU0NScgfX0gY2xhc3NOYW1lPVwiZmEgZmEtZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9pPlxyXG5jb25zdCBXYXJuaW5nU3ltYm9sID0gKCkgPT4gPGkgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JywgY29sb3I6ICcjZmZjMTA3JyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZVwiPjwvaT5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1ldGVySW5mb3JXaW5kb3c7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIENvbm5lY3Rpb25JbmZvLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOS8xMS8yMDE5IC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IEFzc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcclxuaW1wb3J0IHsgY2xvbmVEZWVwIH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgVG9vbFRpcCB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5pbXBvcnQgTWV0ZXJMb2NhdGlvblByb3BlcnRpZXMgZnJvbSAnLi9Qcm9wZXJ0eVVJL01ldGVyTG9jYXRpb25Qcm9wZXJ0aWVzJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5pbnRlcmZhY2UgSVByb3BzIHsgTWV0ZXI6IE9wZW5YREEuTWV0ZXIsIFN0YXRlU2V0dGVyOiAobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHZvaWQgfVxyXG5cclxuY29uc3QgTG9jYXRpb25XaW5kb3cgPSAocHJvcHM6IElQcm9wcykgPT4ge1xyXG4gICAgY29uc3QgbmV3TG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24gPSB7XHJcbiAgICAgICAgSUQ6IDAsXHJcbiAgICAgICAgTG9jYXRpb25LZXk6IG51bGwsXHJcbiAgICAgICAgTmFtZTogbnVsbCxcclxuICAgICAgICBBbGlhczogbnVsbCxcclxuICAgICAgICBTaG9ydE5hbWU6IG51bGwsXHJcbiAgICAgICAgTGF0aXR1ZGU6IG51bGwsXHJcbiAgICAgICAgTG9uZ2l0dWRlOiBudWxsLFxyXG4gICAgICAgIERlc2NyaXB0aW9uOiBudWxsLFxyXG4gICAgfVxyXG4gICAgY29uc3QgW2xvY2F0aW9uLCBzZXRMb2NhdGlvbl0gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLkxvY2F0aW9uPihuZXdMb2NhdGlvbik7XHJcbiAgICBjb25zdCBbbWV0ZXIsIHNldE1ldGVyXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuTWV0ZXI+KHByb3BzLk1ldGVyKTtcclxuXHJcbiAgICBjb25zdCBbbG9jYXRpb25MaXN0LCBzZXRMb2NhdGlvbkxpc3RdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Mb2NhdGlvbltdPihbXSk7XHJcbiAgIFxyXG4gICAgY29uc3QgW3ZhbGlkS2V5LCBzZXRWYWxpZEtleV0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuICAgIGNvbnN0IFtoYXNDaGFuZ2VkLCBzZXRIYXNDaGFuZ2VkXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuICAgIGNvbnN0IFtob3Zlciwgc2V0SG92ZXJdID0gUmVhY3QudXNlU3RhdGU8KCdVcGRhdGUnIHwgJ1Jlc2V0JyB8ICdOb25lJyB8ICdOZXcnKT4oJ05vbmUnKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSBnZXRBbGxMb2NhdGlvbnMoKTtcclxuICAgICAgICByZXR1cm4gKCkgPT4geyBpZiAoaGFuZGxlICE9IG51bGwgJiYgaGFuZGxlLmFib3J0ICE9IG51bGwpIGhhbmRsZS5hYm9ydCgpO31cclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxldCBoMSA9IGdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgbGV0IGgyID0gZ2V0QWxsTG9jYXRpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGgxICE9IG51bGwgJiYgaDEuYWJvcnQgIT0gbnVsbCkgaDEuYWJvcnQoKTtcclxuICAgICAgICAgICAgaWYgKGgyICE9IG51bGwgJiYgaDIuYWJvcnQgIT0gbnVsbCkgaDIuYWJvcnQoKTtcclxuICAgICAgICB9IFxyXG4gICAgfSwgW21ldGVyXSlcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHNldE1ldGVyKHByb3BzLk1ldGVyKTtcclxuICAgIH0sIFtwcm9wcy5NZXRlcl0pXHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAobG9jYXRpb25MaXN0Lmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ1N5c3RlbUNlbnRlci5Mb2NhdGlvbnMnLCBKU09OLnN0cmluZ2lmeShsb2NhdGlvbkxpc3QpKTtcclxuICAgIH0sIFtsb2NhdGlvbkxpc3RdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGxvY2F0aW9uLkxvY2F0aW9uS2V5O1xyXG4gICAgICAgIGlmIChrZXkgPT0gbnVsbCB8fCBrZXkgPT0gJycpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGxvY2F0aW9uTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLkxvY2F0aW9uS2V5ID09IGtleSk7XHJcbiAgICAgICAgaWYgKGluZGV4Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICBzZXRWYWxpZEtleSh0cnVlKTtcclxuICAgICAgICBlbHNlIGlmIChpbmRleC5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICBzZXRWYWxpZEtleShmYWxzZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzZXRWYWxpZEtleShsb2NhdGlvbi5JRCA9PSBpbmRleFswXS5JRCk7XHJcblxyXG4gICAgfSwgW2xvY2F0aW9uLCBsb2NhdGlvbkxpc3RdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBbGxMb2NhdGlvbnMoKTogSlF1ZXJ5LmpxWEhSPE9wZW5YREEuTG9jYXRpb25bXT4ge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnU3lzdGVtQ2VudGVyLkxvY2F0aW9ucycpKSB7XHJcbiAgICAgICAgICAgIHNldExvY2F0aW9uTGlzdChKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1N5c3RlbUNlbnRlci5Mb2NhdGlvbnMnKSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGggPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTG9jYXRpb25gLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBoLmRvbmUobWxzID0+IHtcclxuICAgICAgICAgICAgc2V0TG9jYXRpb25MaXN0KG1scyk7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ1N5c3RlbUNlbnRlci5Mb2NhdGlvbnMnLCBKU09OLnN0cmluZ2lmeShtbHMpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TG9jYXRpb24oKTogSlF1ZXJ5LmpxWEhSPE9wZW5YREEuTG9jYXRpb24+IHtcclxuICAgICAgICBpZiAobWV0ZXIgPT0gbnVsbCB8fCBtZXRlci5Mb2NhdGlvbklEID09IG51bGwpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBpZiAobWV0ZXIuTG9jYXRpb25JRCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHNldExvY2F0aW9uKG5ld0xvY2F0aW9uKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Mb2NhdGlvbi9PbmUvJHttZXRlci5Mb2NhdGlvbklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICBoYW5kbGUuZG9uZSgoZDogT3BlblhEQS5Mb2NhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICBzZXRMb2NhdGlvbihkKTtcclxuICAgICAgICAgICAgc2V0TG9jYXRpb25MaXN0KChsc3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGxzdC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLklEID09IGQuSUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4ubHN0LCBkXTtcclxuICAgICAgICAgICAgICAgIGxldCB1bHN0ID0gXy5jbG9uZURlZXAobHN0KTtcclxuICAgICAgICAgICAgICAgIHVsc3RbaW5kZXhdID0gZDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bHN0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIE9wZW5YREEuTG9jYXRpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ0xvY2F0aW9uS2V5JylcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLkxvY2F0aW9uS2V5ICE9IG51bGwgJiYgbG9jYXRpb24uTG9jYXRpb25LZXkubGVuZ3RoID4gMCAmJiBsb2NhdGlvbi5Mb2NhdGlvbktleS5sZW5ndGggPD0gNTAgJiYgdmFsaWRLZXk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb24uTmFtZSAhPSBudWxsICYmIGxvY2F0aW9uLk5hbWUubGVuZ3RoID4gMCAmJiBsb2NhdGlvbi5OYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0FsaWFzJylcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLkFsaWFzID09IG51bGwgfHwgbG9jYXRpb24uQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLlNob3J0TmFtZSA9PSBudWxsIHx8bG9jYXRpb24uU2hvcnROYW1lLmxlbmd0aCA8PSA1MDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTGF0aXR1ZGUnKVxyXG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb24uTGF0aXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKGxvY2F0aW9uLkxhdGl0dWRlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTG9uZ2l0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLkxvbmdpdHVkZSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIobG9jYXRpb24uTG9uZ2l0dWRlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRGVzY3JpcHRpb24nKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNWYWxpZExvY2F0aW9uID0gdmFsaWQoJ0xvY2F0aW9uS2V5JykgJiYgdmFsaWQoJ05hbWUnKSAmJiB2YWxpZCgnQWxpYXMnKSAmJiB2YWxpZCgnU2hvcnROYW1lJykgJiYgdmFsaWQoJ0xhdGl0dWRlJykgJiYgdmFsaWQoJ0xvbmdpdHVkZScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZE5ld0xvY2F0aW9uKCk6IEpRdWVyeS5qcVhIUiB7XHJcbiAgICAgICAgY29uc3QgbmV3TG9jYXRpb246IGFueSA9IF8uY2xvbmUobG9jYXRpb24pO1xyXG4gICAgICAgIG5ld0xvY2F0aW9uLk1ldGVySUQgPSB0aGlzLnByb3BzLk1ldGVyLklEO1xyXG5cclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTG9jYXRpb24vQWRkYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShsb2NhdGlvbiksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKGxvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHNldEhhc0NoYW5nZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICBzZXRMb2NhdGlvbihsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHByb3BzLlN0YXRlU2V0dGVyKGNsb25lRGVlcChwcm9wcy5NZXRlcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2F0aW9uKCk6IEpRdWVyeS5qcVhIUiB7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uL1VwZGF0ZWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobG9jYXRpb24pLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChkOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLklEICE9IHByb3BzLk1ldGVyLkxvY2F0aW9uSUQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG0gPSBjbG9uZURlZXAocHJvcHMuTWV0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbS5Mb2NhdGlvbklEID0gbG9jYXRpb24uSUQ7XHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUEFUQ0hcIixcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyL1VwZGF0ZWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pLmRvbmUoKG1zZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLlN0YXRlU2V0dGVyKGNsb25lRGVlcChtKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0SGFzQ2hhbmdlZChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDIxNSB9fT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+TWV0ZXIgTG9jYXRpb24gLyBTdWJzdGF0aW9uIEluZm9ybWF0aW9uOjwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCIgc3R5bGU9e3sgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzMTUsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgPE1ldGVyTG9jYXRpb25Qcm9wZXJ0aWVzIE1ldGVyPXttZXRlcn0gTG9jYXRpb249e2xvY2F0aW9ufSBMb2NhdGlvbmxpc3Q9e2xvY2F0aW9uTGlzdH1cclxuICAgICAgICAgICAgICAgICAgICBTZXRMb2NhdGlvbj17KGxvYykgPT4geyBzZXRMb2NhdGlvbihsb2MpOyBzZXRIYXNDaGFuZ2VkKHRydWUpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIFVwZGF0ZU1ldGVyPXsobSkgPT4geyBzZXRIYXNDaGFuZ2VkKHByb3BzLk1ldGVyLkxvY2F0aW9uSUQgIT0gKG0uTG9jYXRpb25JRCAhPSBudWxsID8gcGFyc2VJbnQobS5Mb2NhdGlvbklELnRvU3RyaW5nKCkpIDogMCkpOyBzZXRNZXRlcih7IC4uLm0sIExvY2F0aW9uSUQ6IChtLkxvY2F0aW9uSUQgIT0gbnVsbCA/IHBhcnNlSW50KG0uTG9jYXRpb25JRC50b1N0cmluZygpKSA6IDApIH0pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgRGlzYWJsZUxvY2F0aW9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImJ0biBidG4tcHJpbWFyeVwiICsgKCFoYXNDaGFuZ2VkIHx8ICFpc1ZhbGlkTG9jYXRpb24gPyAnIGRpc2FibGVkJyA6ICcnKX0gb25DbGljaz17KCkgPT4geyBpZiAoaXNWYWxpZExvY2F0aW9uICYmIGhhc0NoYW5nZWQpIGFkZE5ld0xvY2F0aW9uKCkgfX0gaGlkZGVuPXtsb2NhdGlvbi5JRCAhPSAwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyKCdOZXcnKX0gb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRIb3ZlcignTm9uZScpfSBkYXRhLXRvb2x0aXA9eydOZXdMb2NhdGlvbid9PkFkZCBOZXc8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8VG9vbFRpcCBTaG93PXtob3ZlciA9PSAnTmV3JyAmJiAoIWhhc0NoYW5nZWQgfHwgIWlzVmFsaWRMb2NhdGlvbil9IFBvc2l0aW9uPXsndG9wJ30gVGhlbWU9eydkYXJrJ30gVGFyZ2V0PXtcIk5ld0xvY2F0aW9uXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IXZhbGlkS2V5ID8gPHA+IDxpIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnMTBweCcsIGNvbG9yOiAnI2RjMzU0NScgfX0gY2xhc3NOYW1lPVwiZmEgZmEtZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9pPiBLZXkgbmVlZHMgdG8gYmUgdW5pcXVlLiAgPC9wPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdmFsaWQoJ0xvY2F0aW9uS2V5JykgJiYgdmFsaWRLZXkgPyA8cD4gPGkgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JywgY29sb3I6ICcjZGMzNTQ1JyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+IEtleSBpcyByZXF1aXJlZCBhbmQgbmVlZHMgdG8gYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuIDwvcD4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IXZhbGlkKCdOYW1lJykgPyA8cD4gPGkgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JywgY29sb3I6ICcjZGMzNTQ1JyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+IE5hbWUgaXMgcmVxdWlyZWQgYW5kIG5lZWRzIHRvIGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4gPC9wPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdmFsaWQoJ1Nob3J0TmFtZScpID8gPHA+IDxpIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnMTBweCcsIGNvbG9yOiAnI2RjMzU0NScgfX0gY2xhc3NOYW1lPVwiZmEgZmEtZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9pPiBTaG9ydE5hbWUgbmVlZHMgdG8gYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuIDwvcD4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IXZhbGlkKCdMYXRpdHVkZScpID8gPHA+IDxpIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnMTBweCcsIGNvbG9yOiAnI2RjMzU0NScgfX0gY2xhc3NOYW1lPVwiZmEgZmEtZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9pPiBMYXRpdHVkZSBpcyByZXF1aXJlZC4gPC9wPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdmFsaWQoJ0xvbmdpdHVkZScpID8gPHA+IDxpIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnMTBweCcsIGNvbG9yOiAnI2RjMzU0NScgfX0gY2xhc3NOYW1lPVwiZmEgZmEtZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9pPiBMb25ndGl0dWRlIGlzIHJlcXVpcmVkLiA8L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Ub29sVGlwPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImJ0biBidG4tcHJpbWFyeVwiICsgKCFoYXNDaGFuZ2VkIHx8ICFpc1ZhbGlkTG9jYXRpb24gPyAnIGRpc2FibGVkJyA6ICcnKX0gb25DbGljaz17KCkgPT4geyBpZiAoaXNWYWxpZExvY2F0aW9uICYmIGhhc0NoYW5nZWQpIHVwZGF0ZUxvY2F0aW9uKCkgfX0gaGlkZGVuPXtsb2NhdGlvbi5JRCA9PSAwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyKCdVcGRhdGUnKX0gb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRIb3ZlcignTm9uZScpfSBkYXRhLXRvb2x0aXA9eydVcGRhdGVMb2NhdGlvbid9PlVwZGF0ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUb29sVGlwIFNob3c9e2hvdmVyID09ICdVcGRhdGUnICYmICghaGFzQ2hhbmdlZCB8fCAhaXNWYWxpZExvY2F0aW9uKX0gUG9zaXRpb249eyd0b3AnfSBUaGVtZT17J2RhcmsnfSBUYXJnZXQ9e1wiVXBkYXRlTG9jYXRpb25cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshaGFzQ2hhbmdlZCA/IDxwPiBObyBDaGFuZ2VzIGhhdmUgYmVlbiBtYWRlLiA8L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyF2YWxpZEtleSA/IDxwPiA8aSBzdHlsZT17eyBtYXJnaW5SaWdodDogJzEwcHgnLCBjb2xvcjogJyNkYzM1NDUnIH19IGNsYXNzTmFtZT1cImZhIGZhLWV4Y2xhbWF0aW9uLWNpcmNsZVwiPjwvaT4gS2V5IG5lZWRzIHRvIGJlIHVuaXF1ZS4gPC9wPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdmFsaWQoJ0xvY2F0aW9uS2V5JykgJiYgdmFsaWRLZXkgPyA8cD4gPGkgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JywgY29sb3I6ICcjZGMzNTQ1JyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+IEtleSBpcyByZXF1aXJlZCBhbmQgbmVlZHMgdG8gYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuIDwvcD4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IXZhbGlkKCdOYW1lJyk/IDxwPiA8aSBzdHlsZT17eyBtYXJnaW5SaWdodDogJzEwcHgnLCBjb2xvcjogJyNkYzM1NDUnIH19IGNsYXNzTmFtZT1cImZhIGZhLWV4Y2xhbWF0aW9uLWNpcmNsZVwiPjwvaT4gTmFtZSBpcyByZXF1aXJlZCBhbmQgbmVlZHMgdG8gYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLiA8L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyF2YWxpZCgnU2hvcnROYW1lJykgPyA8cD4gPGkgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JywgY29sb3I6ICcjZGMzNTQ1JyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+IFNob3J0TmFtZSBuZWVkcyB0byBiZSBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycy4gPC9wPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdmFsaWQoJ0xhdGl0dWRlJykgPyA8cD4gPGkgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JywgY29sb3I6ICcjZGMzNTQ1JyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+IExhdGl0dWRlIGlzIHJlcXVpcmVkLiA8L3A+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyF2YWxpZCgnTG9uZ2l0dWRlJykgPyA8cD4gPGkgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JywgY29sb3I6ICcjZGMzNTQ1JyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+IExvbmd0aXR1ZGUgaXMgcmVxdWlyZWQuIDwvcD4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVG9vbFRpcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidG4gYnRuLWRlZmF1bHRcIiArIChoYXNDaGFuZ2VkPyAnJyA6ICcgZGlzYWJsZWQnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS10b29sdGlwPSdSZXNldExvY2F0aW9uJyBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyKCdSZXNldCcpfSBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyKCdOb25lJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgaWYgKGhhc0NoYW5nZWQpIHsgc2V0TWV0ZXIocHJvcHMuTWV0ZXIpOyBzZXRIYXNDaGFuZ2VkKGZhbHNlKTsgfSB9IH0+UmVzZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8VG9vbFRpcCBTaG93PXtob3ZlciA9PSAnUmVzZXQnICYmICFoYXNDaGFuZ2VkfSBQb3NpdGlvbj17J3RvcCd9IFRoZW1lPXsnZGFyayd9IFRhcmdldD17XCJSZXNldExvY2F0aW9uXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHA+IE5vIENoYW5nZXMgaGF2ZSBiZWVuIG1hZGUuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvVG9vbFRpcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9jYXRpb25XaW5kb3c7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE1ldGVyVHJlbmRDaGFubmVsLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyB0b051bWJlciB9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0ZXJUcmVuZENoYW5uZWxXaW5kb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBNZXRlcjogT3BlblhEQS5NZXRlciB9LCB7IENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+LCBQaGFzZXM6IEFycmF5PE9wZW5YREEuUGhhc2U+LCBNZWFzdXJlbWVudFR5cGVzOiBBcnJheTxPcGVuWERBLk1lYXN1cmVtZW50VHlwZT4sIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzOiBBcnJheTxPcGVuWERBLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM+LCBBbGxBc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+IH0sIHt9PntcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIENoYW5uZWxzOiBbXSxcclxuICAgICAgICAgICAgUGhhc2VzOiBbXSxcclxuICAgICAgICAgICAgTWVhc3VyZW1lbnRUeXBlczogW10sXHJcbiAgICAgICAgICAgIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzOiBbXSxcclxuICAgICAgICAgICAgQWxsQXNzZXRzOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRDaGFubmVscyA9IHRoaXMuZ2V0Q2hhbm5lbHMuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoYW5uZWxzID0gdGhpcy51cGRhdGVDaGFubmVscy5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0UGhhc2VzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRBc3NldHMoKTtcclxuICAgICAgICB0aGlzLmdldE1lYXN1cmVtZW50VHlwZXMoKTtcclxuICAgICAgICB0aGlzLmdldE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRDaGFubmVscygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoYW5uZWxzKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvJHt0aGlzLnByb3BzLk1ldGVyLklEfS9DaGFubmVscy9UcmVuZGAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoY2hhbm5lbHM6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgICAgbGV0IG1ha2VDaGFubmVscyA9IGNoYW5uZWxzLm1hcChjaGFubmVsID0+IGNoYW5uZWwgYXMgT3BlblhEQS5DaGFubmVsKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6ICBtYWtlQ2hhbm5lbHN9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYW5uZWxzKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyLyR7dGhpcy5wcm9wcy5NZXRlci5JRH0vQ2hhbm5lbC9VcGRhdGUvVHJlbmRgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtDaGFubmVsczogdGhpcy5zdGF0ZS5DaGFubmVsc30pLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2hhbm5lbHMoKTtcclxuICAgICAgICB9KS5mYWlsKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENoYW5uZWxzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTs7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEFzc2V0cygpOiB2b2lkIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyLyR7dGhpcy5wcm9wcy5NZXRlci5JRH0vQXNzZXRgLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICAgICAgfSkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEFsbEFzc2V0czogYXNzZXRzIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZ2V0UGhhc2VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnU3lzdGVtQ2VudGVyLlBoYXNlcycpKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgUGhhc2VzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1N5c3RlbUNlbnRlci5QaGFzZXMnKSkgfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvUGhhc2VgLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICAgICAgfSkuZG9uZSgocGhhc2VzOiBBcnJheTxPcGVuWERBLlBoYXNlPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFBoYXNlczogcGhhc2VzIH0pXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5QaGFzZXMnLCBKU09OLnN0cmluZ2lmeShwaGFzZXMpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVhc3VyZW1lbnRUeXBlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ09wZW5YREEuTWVhc3VyZW1lbnRUeXBlcycpKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTWVhc3VyZW1lbnRUeXBlczogSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdPcGVuWERBLk1lYXN1cmVtZW50VHlwZXMnKSkgfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWVhc3VyZW1lbnRUeXBlYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKG1lYXN1cmVtZW50VHlwZXM6IEFycmF5PE9wZW5YREEuTWVhc3VyZW1lbnRUeXBlPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1lYXN1cmVtZW50VHlwZXM6IG1lYXN1cmVtZW50VHlwZXMgfSlcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ09wZW5YREEuTWVhc3VyZW1lbnRUeXBlcycsIEpTT04uc3RyaW5naWZ5KG1lYXN1cmVtZW50VHlwZXMpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpY3MoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdPcGVuWERBLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBNZWFzdXJlbWVudFR5cGVzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ09wZW5YREEuTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpY3MnKSkgfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpY2AsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5kb25lKChtZWFzdXJlbWVudENoYXJhY3RlcmlzdGljczogQXJyYXk8T3BlblhEQS5NZWFzdXJlbWVudENoYXJhY3RlcmlzdGljPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzOiBtZWFzdXJlbWVudENoYXJhY3RlcmlzdGljcyB9KVxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnT3BlblhEQS5NZWFzdXJlbWVudENoYXJhY3RlcmlzdGljcycsIEpTT04uc3RyaW5naWZ5KG1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUNoYW5uZWwoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUodGhpcy5zdGF0ZS5DaGFubmVscyk7XHJcbiAgICAgICAgbGV0IHJlY29yZDogT3BlblhEQS5DaGFubmVsID0gY2hhbm5lbHMuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+Q2hhbm5lbHM6PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQyMCwgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtaG92ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkRlc2M8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+VHlwZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5DaGFyYWN0ZXJpc3RpYzwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5QaGFzZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5IYXJtb25pYzwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5BZGRlcjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5NdWx0aXBsaWVyPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkFzc2V0PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLkNoYW5uZWxzLm1hcCgoY2hhbm5lbCwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk5hbWV9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuTmFtZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLkRlc2NyaXB0aW9uID09IG51bGwgPyAnJyA6IGNoYW5uZWwuRGVzY3JpcHRpb259IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuRGVzY3JpcHRpb24gPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk1lYXN1cmVtZW50VHlwZX0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5NZWFzdXJlbWVudFR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT57dGhpcy5zdGF0ZS5NZWFzdXJlbWVudFR5cGVzLm1hcChhID0+IDxvcHRpb24ga2V5PXthLklEfSB2YWx1ZT17YS5OYW1lfT57YS5OYW1lfTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWN9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYyA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Pnt0aGlzLnN0YXRlLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzLm1hcChhID0+IDxvcHRpb24ga2V5PXthLklEfSB2YWx1ZT17YS5OYW1lfT57YS5OYW1lfTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLlBoYXNlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLlBoYXNlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e3RoaXMuc3RhdGUuUGhhc2VzLm1hcChhID0+IDxvcHRpb24ga2V5PXthLklEfSB2YWx1ZT17YS5OYW1lfT57YS5OYW1lfTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLkhhcm1vbmljR3JvdXB9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuSGFybW9uaWNHcm91cCA9IHRvTnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLkFkZGVyfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFkZGVyID0gdG9OdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNSUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuTXVsdGlwbGllcn0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5NdWx0aXBsaWVyID0gdG9OdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57PHNlbGVjdCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuQXNzZXR9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj48L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLkFsbEFzc2V0cy5tYXAoYSA9PiA8b3B0aW9uIGtleT17YS5JRH0gdmFsdWU9e2EuQXNzZXRLZXl9PnthLkFzc2V0S2V5fTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRlbGV0ZUNoYW5uZWwoaW5kZXgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWw6IE9wZW5YREEuQ2hhbm5lbCA9IHsgSUQ6IDAsIE1ldGVyOiB0aGlzLnByb3BzLk1ldGVyLkFzc2V0S2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnUk1TJywgUGhhc2U6ICdBTicsIE5hbWU6ICdWQU4gUk1TJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBBTiBSTVMnLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IFt7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdNYXhpbXVtJywgU291cmNlSW5kZXhlczogJycgfSwgeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnTWluaW11bScsIFNvdXJjZUluZGV4ZXM6ICcnIH0sIHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ0F2ZXJhZ2UnLCBTb3VyY2VJbmRleGVzOiAnJyB9XSB9IGFzIE9wZW5YREEuQ2hhbm5lbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZSh0aGlzLnN0YXRlLkNoYW5uZWxzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5BZGQgQ2hhbm5lbDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMudXBkYXRlQ2hhbm5lbHN9PlNhdmUgQ2hhbmdlczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmdldENoYW5uZWxzfT5DbGVhciBDaGFuZ2VzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==