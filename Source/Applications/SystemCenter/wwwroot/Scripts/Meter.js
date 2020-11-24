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










var Meter = /** @class */ (function (_super) {
    __extends(Meter, _super);
    function Meter(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Meter: null,
            Tab: _this.getTab()
        };
        return _this;
    }
    Meter.prototype.getTab = function () {
        if (sessionStorage.hasOwnProperty('Meter.Tab'))
            return JSON.parse(sessionStorage.getItem('Meter.Tab'));
        else
            return 'notes';
    };
    Meter.prototype.getMeter = function () {
        var _this = this;
        if (this.props.MeterID == undefined)
            return;
        this.getMeterHandle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter/One/" + this.props.MeterID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
        this.getMeterHandle.done(function (data) { return _this.setState({ Meter: data }); });
    };
    Meter.prototype.deleteMeter = function () {
        var response = confirm("This will delete the Meter Permanently");
        if (!response)
            return;
        return $.ajax({
            type: "DELETE",
            url: homePath + "api/OpenXDA/Meter/Delete",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Meter),
            dataType: 'json',
            cache: true,
            async: true
        });
    };
    Meter.prototype.setTab = function (tab) {
        sessionStorage.setItem('Meter.Tab', JSON.stringify(tab));
        this.setState({ Tab: tab });
    };
    Meter.prototype.componentDidMount = function () {
        this.getMeter();
    };
    Meter.prototype.componentWillUnmount = function () {
        sessionStorage.clear();
        if (this.getMeterHandle.abort != undefined)
            this.getMeterHandle.abort();
    };
    Meter.prototype.render = function () {
        var _this = this;
        if (this.state.Meter == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, this.state.Meter != null ? this.state.Meter.AssetKey : '')),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", hidden: this.state.Meter == null, onClick: function () { return _this.deleteMeter().done(function () { return window.location.href = homePath + 'index.cshtml?name=Meters'; }); } }, "Delete Meter (Permanent)"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "notes" ? " active" : ""), onClick: function () { return _this.setTab('notes'); }, "data-toggle": "tab", href: "#notes" }, "Notes")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "meterInfo" ? " active" : ""), onClick: function () { return _this.setTab('meterInfo'); }, "data-toggle": "tab", href: "#meterInfo" }, "Meter Info")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "additionalFields" ? " active" : ""), onClick: function () { return _this.setTab('additionalFields'); }, "data-toggle": "tab", href: "#additionalFields" }, "Additional Fields")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "substation" ? " active" : ""), onClick: function () { return _this.setTab('substation'); }, "data-toggle": "tab", href: "#substation" }, "Substation")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "assets" ? " active" : ""), onClick: function () { return _this.setTab('assets'); }, "data-toggle": "tab", href: "#assets" }, "Assets")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "eventChannels" ? " active" : ""), onClick: function () { return _this.setTab('eventChannels'); }, "data-toggle": "tab", href: "#eventChannels" }, "Event Channels")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "trendChannels" ? " active" : ""), onClick: function () { return _this.setTab('trendChannels'); }, "data-toggle": "tab", href: "#trendChannels" }, "Trend Channels")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "configurationHistory" ? " active" : ""), onClick: function () { return _this.setTab('configurationHistory'); }, "data-toggle": "tab", href: "#configurationHistory" }, "Configuration History")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (this.state.Tab == "extDB" ? " active" : ""), onClick: function () { return _this.setTab('extDB'); }, "data-toggle": "tab", href: "#extDB" }, "External DB"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 235, overflow: 'hidden' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "notes" ? " active" : "fade"), id: "notes" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_NoteWindow__WEBPACK_IMPORTED_MODULE_6__["default"], { ID: this.props.MeterID, Type: 'Meter' })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "meterInfo" ? " active" : "fade"), id: "meterInfo" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MeterInfo__WEBPACK_IMPORTED_MODULE_2__["default"], { Meter: this.state.Meter, StateSetter: function (meter) { return _this.setState({ Meter: meter }); } })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "additionalFields" ? " active" : "fade"), id: "additionalFields" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_AdditionalFieldsWindow__WEBPACK_IMPORTED_MODULE_7__["default"], { ID: this.props.MeterID, Type: 'Meter', Tab: this.state.Tab })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "substation" ? " active" : "fade"), id: "substation" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_MeterLocation__WEBPACK_IMPORTED_MODULE_1__["default"], { Meter: this.state.Meter, StateSetter: function (meter) { return _this.setState({ Meter: meter }); } })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "eventChannels" ? " active" : "fade"), id: "eventChannels" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_MeterEventChannel__WEBPACK_IMPORTED_MODULE_3__["default"], { Meter: this.state.Meter })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "trendChannels" ? " active" : "fade"), id: "trendChannels" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_MeterTrendChannel__WEBPACK_IMPORTED_MODULE_4__["default"], { Meter: this.state.Meter })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "assets" ? " active" : "fade"), id: "assets" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_MeterAsset__WEBPACK_IMPORTED_MODULE_5__["default"], { Meter: this.state.Meter })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "configurationHistory" ? " active" : "fade"), id: "configurationHistory" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MeterConfigurationHistory__WEBPACK_IMPORTED_MODULE_8__["default"], { Meter: this.state.Meter })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (this.state.Tab == "extDB" ? " active" : "fade"), id: "extDB" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_ExternalDBUpdate__WEBPACK_IMPORTED_MODULE_9__["default"], { ID: this.props.MeterID, Type: 'Meter', Tab: this.state.Tab })))));
    };
    return Meter;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
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








var MeterAssetWindow = /** @class */ (function (_super) {
    __extends(MeterAssetWindow, _super);
    function MeterAssetWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["default"].getNewAsset('Line'),
            AllAssets: [],
            AssetTypes: [],
            NewEdit: 'New',
            Assets: []
        };
        _this.addNewAsset = _this.addNewAsset.bind(_this);
        _this.addExistingAsset = _this.addExistingAsset.bind(_this);
        _this.addNewButton = _this.addNewButton.bind(_this);
        return _this;
    }
    MeterAssetWindow.prototype.componentDidMount = function () {
        var _this = this;
        this.getMeterAssets();
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__["getAllAssets"])().done(function (assets) {
            _this.setState({ AllAssets: assets });
        });
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__["getAssetTypes"])().done(function (assetTypes) {
            _this.setState({ AssetTypes: assetTypes });
        });
    };
    MeterAssetWindow.prototype.deleteAsset = function (asset) {
        var _this = this;
        $.ajax({
            type: "DELETE",
            url: homePath + "api/OpenXDA/Meter/" + this.props.Meter.ID + "/Asset/" + asset.ID + "/" + this.props.Meter.LocationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (assets) {
            _this.getMeterAssets();
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                sessionStorage.clear();
                _this.componentDidMount();
            }
        });
    };
    MeterAssetWindow.prototype.addNewButton = function () {
        this.setState({ NewEdit: 'New', NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["default"].getNewAsset('Line') });
    };
    MeterAssetWindow.prototype.addNewAsset = function () {
        var _this = this;
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Asset/New/Meter/" + this.props.Meter.ID + "/" + this.props.Meter.LocationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: this.state.NewEditAsset }),
            cache: false,
            async: true
        }).done(function () {
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                sessionStorage.clear();
                _this.componentDidMount();
                _this.setState({ NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["default"].getNewAsset('Line') });
            }
        });
    };
    MeterAssetWindow.prototype.addExistingAsset = function () {
        var _this = this;
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Asset/Existing/Meter/" + this.props.Meter.ID + "/" + this.props.Meter.LocationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Asset: this.state.NewEditAsset }),
            cache: false,
            async: true
        }).done(function () {
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                sessionStorage.clear();
                _this.componentDidMount();
                _this.setState({ NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["default"].getNewAsset('Line') });
            }
        });
    };
    MeterAssetWindow.prototype.getMeterAssets = function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter/" + this.props.Meter.ID + "/Asset",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (assets) {
            _this.setState({ Assets: assets });
        });
    };
    MeterAssetWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Assets:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { margin: -20 } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { padding: 20 } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 420, padding: 30, overflowY: 'auto' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table table-hover" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Key"),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Name"),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Type"),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "kV"),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Channels"),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, this.state.Assets.map(function (asset, index, array) {
                                    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } }, asset.AssetKey),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '30%' } }, asset.AssetName),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, asset.AssetType),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, asset.VoltageKV),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, asset.Channels),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", "data-toggle": 'modal', "data-target": '#assetModal', onClick: function (e) {
                                                    var assetType = _this.state.AssetTypes.find(function (at) { return at.ID == asset['AssetTypeID']; });
                                                    Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__["getAssetWithAdditionalFields"])(asset.ID, assetType.Name).then(function (record) { return _this.setState({ NewEditAsset: record, NewEdit: 'Edit' }); });
                                                } },
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-pencil" }))),
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return _this.deleteAsset(asset); } },
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                                })))))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "assetModal" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '75%' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, this.state.NewEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + this.state.NewEditAsset.AssetKey + ' for Meter'),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal", onClick: function (evt) {
                                        _this.setState({ NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["default"].getNewAsset('Line') });
                                    } }, "\u00D7")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["default"], { Asset: this.state.NewEditAsset, NewEdit: this.state.NewEdit, AssetTypes: this.state.AssetTypes, AllAssets: this.state.AllAssets, UpdateState: function (asset) { return _this.setState({ NewEditAsset: asset }); }, GetDifferentAsset: function (assetID) {
                                                var asset = _this.state.AllAssets.find(function (a) { return a.ID == assetID; });
                                                var assetType = _this.state.AssetTypes.find(function (at) { return at.ID == asset['AssetTypeID']; });
                                                Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__["getAssetWithAdditionalFields"])(assetID, assetType.Name).then(function (asset) { return _this.setState({ NewEditAsset: asset }); });
                                            } })),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, this.showAttributes()))),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: this.addNewAsset, hidden: this.state.NewEdit == 'Edit' || this.state.NewEditAsset.ID != 0 }, "Save"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: this.addExistingAsset, hidden: this.state.NewEdit == 'Edit' || this.state.NewEditAsset.ID == 0 }, "Save"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function (e) {
                                        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_7__["editExistingAsset"])(_this.state.NewEditAsset).then(function (asset) {
                                            sessionStorage.clear();
                                            _this.componentDidMount();
                                            _this.setState({ NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["default"].getNewAsset('Line') });
                                        });
                                    }, hidden: this.state.NewEdit == 'New' }, "Save"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal", onClick: function (evt) {
                                        _this.setState({ NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_6__["default"].getNewAsset('Line') });
                                    } }, "Close")))))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", "data-toggle": 'modal', "data-target": '#assetModal', onClick: this.addNewButton }, "Add Asset")))));
    };
    MeterAssetWindow.prototype.showAttributes = function () {
        var _this = this;
        if (this.state.NewEditAsset.AssetType == 'Breaker')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_2__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); }, ShowSpare: true });
        else if (this.state.NewEditAsset.AssetType == 'Bus')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_1__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
        else if (this.state.NewEditAsset.AssetType == 'CapacitorBank')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_3__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
        else if (this.state.NewEditAsset.AssetType == 'Line')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_4__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
        else if (this.state.NewEditAsset.AssetType == 'Transformer')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_5__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
    };
    return MeterAssetWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MeterAssetWindow);


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
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
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




var MeterInfoWindow = /** @class */ (function (_super) {
    __extends(MeterInfoWindow, _super);
    function MeterInfoWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            TimeZones: [],
            Meter: _this.props.Meter
        };
        _this.valid = _this.valid.bind(_this);
        return _this;
    }
    MeterInfoWindow.prototype.componentDidMount = function () {
        this.getTimeZones();
    };
    MeterInfoWindow.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({ Meter: nextProps.Meter });
    };
    MeterInfoWindow.prototype.getTimeZones = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('SystemCenter.TimeZones'))
            this.setState({ TimeZones: JSON.parse(sessionStorage.getItem('SystemCenter.TimeZones')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/ValueList/Group/TimeZones",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (tzs) {
                _this.setState({ TimeZones: tzs });
                sessionStorage.setItem('SystemCenter.TimeZones', JSON.stringify(tzs));
            });
    };
    MeterInfoWindow.prototype.updateMeter = function () {
        var _this = this;
        var meter = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.Meter);
        $.ajax({
            type: "PATCH",
            url: homePath + "api/OpenXDA/Meter/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Meter),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (meterID) {
            _this.props.StateSetter(meter);
        });
    };
    MeterInfoWindow.prototype.valid = function (field) {
        if (field == 'AssetKey')
            return this.props.Meter.AssetKey != null && this.props.Meter.AssetKey.length > 0 && this.props.Meter.AssetKey.length <= 50;
        else if (field == 'Name')
            return this.props.Meter.Name != null && this.props.Meter.Name.length > 0 && this.props.Meter.Name.length <= 200;
        else if (field == 'Alias')
            return this.props.Meter.Alias == null || this.props.Meter.Alias.length <= 200;
        else if (field == 'ShortName')
            return this.props.Meter.ShortName == null || this.props.Meter.ShortName.length <= 50;
        else if (field == 'Make')
            return this.props.Meter.Name != null && this.props.Meter.Make.length > 0 && this.props.Meter.Make.length <= 200;
        else if (field == 'Model')
            return this.props.Meter.Name != null && this.props.Meter.Model.length > 0 && this.props.Meter.Model.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    };
    MeterInfoWindow.prototype.render = function () {
        var _this = this;
        if (this.props.Meter == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Meter Information:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.Meter, Field: 'AssetKey', Feedback: 'A unique key of less than 50 characters is required.', Valid: this.valid, Setter: function (meter) { return _this.setState({ Meter: meter }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.Meter, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: this.valid, Setter: function (meter) { return _this.setState({ Meter: meter }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.Meter, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: this.valid, Setter: function (meter) { return _this.setState({ Meter: meter }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.Meter, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: this.valid, Setter: function (meter) { return _this.setState({ Meter: meter }); } })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.Meter, Field: 'Make', Feedback: 'Make must be less than 200 characters.', Valid: this.valid, Setter: function (meter) { return _this.setState({ Meter: meter }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.state.Meter, Field: 'Model', Feedback: 'Model must be less than 200 characters.', Valid: this.valid, Setter: function (meter) { return _this.setState({ Meter: meter }); } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Time Zone"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: this.state.Meter == null || this.state.Meter.TimeZone == null ? '-1' : this.state.Meter.TimeZone, onChange: function (evt) {
                                    var meter = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.Meter);
                                    if (evt.target.value != "-1")
                                        meter.TimeZone = evt.target.value;
                                    else
                                        meter.TimeZone = null;
                                    _this.setState({ Meter: meter });
                                } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "-1" }, "None Selected"),
                                (this.state.TimeZones != null ? this.state.TimeZones.sort(function (a, b) { return a.SortOrder - b.SortOrder; }).map(function (tz) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: tz.Text, key: tz.Text, disabled: !tz.Enabled, hidden: tz.Hidden }, tz.AltText1); }) : null)),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__["default"], { Rows: 3, Record: this.state.Meter, Field: 'Description', Valid: this.valid, Setter: function (meter) { return _this.setState({ Meter: meter }); } }))))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", type: "submit", onClick: function () { return _this.updateMeter(); }, disabled: this.state.Meter == this.props.Meter }, "Save Changes")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return _this.setState({ Meter: _this.props.Meter }); }, disabled: this.state.Meter == this.props.Meter }, "Clear Changes")))));
    };
    return MeterInfoWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MeterInfoWindow);


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
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
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





var LocationWindow = /** @class */ (function (_super) {
    __extends(LocationWindow, _super);
    function LocationWindow(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Location: {
                ID: 0,
                LocationKey: null,
                Name: null,
                Alias: null,
                ShortName: null,
                Latitude: null,
                Longitude: null,
                Description: null,
            },
            changed: false,
            Locations: []
        };
        _this.valid = _this.valid.bind(_this);
        _this.updateState = _this.updateState.bind(_this);
        return _this;
    }
    LocationWindow.prototype.componentDidMount = function () {
        this.getAllLocations();
        this.getLocation(this.props.Meter);
    };
    LocationWindow.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.state.Location.ID != nextProps.Meter.LocationID)
            this.getLocation(nextProps.Meter);
    };
    LocationWindow.prototype.getLocation = function (meter) {
        var _this = this;
        if (meter == null || meter.LocationID == null)
            return;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location/One/" + meter.LocationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (location) { return _this.setState({ Location: location, changed: false }); });
    };
    LocationWindow.prototype.getDifferentLocation = function (locationID) {
        var _this = this;
        var jqueryHandle = $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Location/One/" + locationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        return jqueryHandle.done(function (location) { return _this.setState({ Location: location, changed: true }); });
    };
    LocationWindow.prototype.getAllLocations = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('SystemCenter.Locations'))
            this.setState({ Locations: JSON.parse(sessionStorage.getItem('SystemCenter.Locations')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/Location",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (mls) {
                _this.setState({ Locations: mls });
                sessionStorage.setItem('SystemCenter.Locations', JSON.stringify(mls));
            });
    };
    LocationWindow.prototype.addNewLocation = function () {
        var _this = this;
        var location = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.Location);
        location.MeterID = this.props.Meter.ID;
        return $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Location/Add",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(location),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (location) {
            _this.setState({ Location: location, changed: false }, function () { return _this.getAllLocations(); });
        });
    };
    LocationWindow.prototype.updateLocation = function () {
        var _this = this;
        var location = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.state.Location);
        var meter = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.props.Meter);
        return $.ajax({
            type: "PATCH",
            url: homePath + "api/OpenXDA/Location/Update",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(this.state.Location),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (locationID) {
            if (location.ID != meter.LocationID) {
                meter.LocationID = _this.state.Location.ID;
                $.ajax({
                    type: "PATCH",
                    url: homePath + "api/OpenXDA/Meter/Update",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(meter),
                    dataType: 'json',
                    cache: true,
                    async: true
                }).done(function (msg) {
                    _this.props.StateSetter(meter);
                });
            }
            _this.setState({ changed: false }, function () { return _this.getAllLocations(); });
        });
    };
    LocationWindow.prototype.valid = function (field) {
        if (field == 'LocationKey')
            return this.state.Location.LocationKey != null && this.state.Location.LocationKey.length > 0 && this.state.Location.LocationKey.length <= 50;
        else if (field == 'Name')
            return this.state.Location.Name != null && this.state.Location.Name.length > 0 && this.state.Location.Name.length <= 200;
        else if (field == 'Alias')
            return this.state.Location.Alias == null || this.state.Location.Alias.length <= 200;
        else if (field == 'ShortName')
            return this.state.Location.ShortName == null || this.state.Location.ShortName.length <= 50;
        else if (field == 'Latitude')
            return this.state.Location.Latitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(this.state.Location.Latitude);
        else if (field == 'Longitude')
            return this.state.Location.Longitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(this.state.Location.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    };
    LocationWindow.prototype.updateState = function (location) {
        this.setState({ Location: location, changed: true });
    };
    LocationWindow.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { marginBottom: 10 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", null, "Meter Location / Substation Information:")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Select Location"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: this.state.Location.ID == null ? '0' : this.state.Location.ID, onChange: function (evt) {
                                    var location = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.Location);
                                    if (evt.target.value != "0")
                                        _this.getDifferentLocation(parseInt(evt.target.value));
                                    else
                                        _this.setState({
                                            Location: {
                                                ID: 0,
                                                LocationKey: null,
                                                Name: null,
                                                Alias: null,
                                                ShortName: null,
                                                Latitude: null,
                                                Longitude: null,
                                                Description: null,
                                            }, changed: true
                                        });
                                } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "0" }, "Add New"),
                                (this.state.Locations != null ? this.state.Locations.map(function (ml) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: ml.ID, key: ml.ID }, ml.LocationKey); }) : null))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.Location, Field: 'LocationKey', Label: 'Key', Feedback: 'A unique key of less than 50 characters is required.', Valid: this.valid, Setter: this.updateState }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.Location, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: this.valid, Setter: this.updateState }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.Location, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: this.valid, Setter: this.updateState })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.Location, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: this.valid, Setter: this.updateState }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.Location, Field: 'Latitude', Feedback: 'Latitude is a require numeric field.', Valid: this.valid, Setter: this.updateState }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: this.state.Location, Field: 'Longitude', Feedback: 'Longitude is a require numeric field.', Valid: this.valid, Setter: this.updateState }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_4__["default"], { Rows: 3, Record: this.state.Location, Field: 'Description', Valid: this.valid, Setter: this.updateState })))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () { return _this.addNewLocation(); }, hidden: this.state.Location.ID != 0, disabled: !this.state.changed }, "Add New")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () { return _this.updateLocation(); }, hidden: this.state.Location.ID == 0, disabled: !this.state.changed }, "Update")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-default", onClick: function () { return _this.getLocation(_this.props.Meter); }, disabled: !this.state.changed }, "Reset")))));
    };
    return LocationWindow;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9NZXRlci9NZXRlci50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9NZXRlci9NZXRlckFzc2V0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL01ldGVyL01ldGVyQ29uZmlndXJhdGlvbkhpc3RvcnkudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTWV0ZXIvTWV0ZXJFdmVudENoYW5uZWwudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTWV0ZXIvTWV0ZXJJbmZvLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL01ldGVyL01ldGVyTG9jYXRpb24udHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTWV0ZXIvTWV0ZXJUcmVuZENoYW5uZWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLCtCQUErQjtBQUMvQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsMkJBQTJCO0FBQzNCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBVzVCLFNBQVMsc0JBQXNCLENBQUMsS0FJL0I7SUFDUyxzRUFBZ0YsRUFBL0Usa0JBQVUsRUFB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UyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFxQjs0QkFDdmhCLElBQUksUUFBUSxHQUEyQiw0Q0FBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3BFLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3ZCLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDMUMsQ0FBQyxrQkFBc0IsQ0FDckI7Z0JBQ04sNkRBQUssU0FBUyxFQUFDLGdCQUFnQjtvQkFDM0IsZ0VBQVEsU0FBUyxFQUFDLDRCQUE0QixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxtQkFBdUIsQ0FDaEc7Z0JBQ04sNkRBQUssU0FBUyxFQUFDLGdCQUFnQjtvQkFDM0IsZ0VBQVEsU0FBUyxFQUFDLGlCQUFpQixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxvQkFBd0IsQ0FDbkYsQ0FDSixDQUNKLENBQ1QsQ0FBQztJQUNOLENBQUM7SUFDTCw4QkFBQztBQUFELENBQUMsQ0F0T29ELCtDQUFlLEdBc09uRSIsImZpbGUiOiJNZXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgRXh0ZXJuYWxEQlVwZGF0ZS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwNC8wNy8yMDIwIC0gQy4gTGFja25lclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtTeXN0ZW1DZW50ZXIsIE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4vRm9ybUlucHV0JztcbmltcG9ydCBGb3JtQ2hlY2tCb3ggZnJvbSAnLi9Gb3JtQ2hlY2tCb3gnO1xuaW1wb3J0IEZvcm1TZWxlY3QgZnJvbSAnLi9Gb3JtU2VsZWN0JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9tb21lbnQvbW9tZW50JztcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cblxuXG5mdW5jdGlvbiBFeHRlcm5hbERhdGFCYXNlV2luZG93KHByb3BzOiB7XG4gICAgSUQ6IG51bWJlcixcbiAgICBUeXBlOiAnQXNzZXQnIHwgJ01ldGVyJyB8ICdMb2NhdGlvbicgfCAnQ3VzdG9tZXInIHwgJ0xpbmUnIHwgJ0JyZWFrZXInIHwgJ0J1cycgfCAnTGluZVNlZ21lbnQnIHwgJ0NhcGFjaXRvckJhbmsnIHwgJ1RyYW5zZm9ybWVyJyB8ICdDYXBhY2l0b3JCYW5rUmVsYXknLFxuICAgIFRhYjogc3RyaW5nXG59KTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IFtleHRlcm5hbERCLCBzZXRleHRlcm5hbERCXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCPj4oW10pO1xuICAgIGNvbnN0IFtleHRlcm5hbERCRmllbGRzLCBzZXRGaWVsZHNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZD4+KFtdKTtcbiAgICBjb25zdCBbY2hhbmdlZCwgc2V0Q2hhbmdlZF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gICAgY29uc3QgW2N1cnJlbnREQiwgc2V0Q3VycmVudERCXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oXCJcIik7XG4gICBcbiAgICBcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRDaGFuZ2VkKGZhbHNlKTtcbiAgICAgICAgc2V0RmllbGRzKFtdKTtcbiAgICAgICAgcmV0dXJuIGdldEV4dGVybmFsREJzKCk7XG4gICAgfSwgW3Byb3BzLklELCBwcm9wcy5UeXBlLCBwcm9wcy5UYWJdKTsgXG5cbiAgICBmdW5jdGlvbiBnZXRFeHRlcm5hbERCcygpIHtcbiAgICAgICBsZXQgaGFuZGxlID0gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBLyR7cHJvcHMuVHlwZX0vZXh0RGF0YUJhc2VzYCwgXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICB9KVxuXG4gICAgICAgaGFuZGxlLmRvbmUoKGRhdGE6IEFycmF5PFN5c3RlbUNlbnRlci5FeHRlcm5hbERCPikgPT4ge1xuICAgICAgICAgICBzZXRleHRlcm5hbERCKGRhdGEpO1xuICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVFeHRlcm5hbERCKHR5cGU6IHN0cmluZykge1xuXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL0V4dGVybmFsREIvJHt0eXBlfS8ke3Byb3BzLlR5cGV9L1VwZGF0ZS8ke3Byb3BzLklEfWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSlcblxuICAgICAgICBoYW5kbGUuZG9uZSgoZGF0YTogQXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZD4pID0+IHtcbiAgICAgICAgICAgIHNldEZpZWxkcyhkYXRhKVxuICAgICAgICAgICAgc2V0Q2hhbmdlZCh0cnVlKVxuICAgICAgICAgICAgc2V0Q3VycmVudERCKHR5cGUpXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCAxKVxuICAgICAgICAgICAgICAgIGNhbmNlbFVwZGF0ZSgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcblxuICAgXG4gICAgXG4gICAgZnVuY3Rpb24gY2FuY2VsVXBkYXRlKCk6IHZvaWQge1xuICAgICAgICBzZXRGaWVsZHMoW10pXG4gICAgICAgIHNldENoYW5nZWQoZmFsc2UpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tVcGRhdGUoZGF0YTogQXJyYXk8U3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZD4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgIGNhbmNlbFVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2V0RmllbGRzKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VibWl0VXBkYXRlKCkge1xuXG4gICAgICAgIGxldCBoYW5kbGUgPSAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9FeHRlcm5hbERCLyR7Y3VycmVudERCfS8ke3Byb3BzLlR5cGV9L0NvbmZpcm1VcGRhdGVgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgXCJkYXRhXCI6IGV4dGVybmFsREJGaWVsZHMgfSksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KVxuXG4gICAgICAgIHNldEZpZWxkcyhbXSlcbiAgICAgICAgc2V0Q2hhbmdlZChmYWxzZSlcblxuICAgICAgICBnZXRFeHRlcm5hbERCcygpO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8aDQ+IEV4dGVybmFsIERhdGEgQmFzZSBDb25uZWN0aW9uczo8L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1NDAsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNTQwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgeyhjaGFuZ2VkPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgaWQ9XCJmaWVsZHNcIiBjbGFzc05hbWU9J3RhYmxlJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5JRCA9PSAtMSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPiB7cHJvcHMuVHlwZX0gPC90aD4gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+RmllbGQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAzMDAgfX0+UHJldmlvdXMgVmFsdWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHdpZHRoOiAzMDAgfX0+VXBkYXRlZCBWYWx1ZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDMwIH19PjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgd2lkdGg6IDMwIH19PjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtleHRlcm5hbERCRmllbGRzLm1hcCgoYSwgaSkgPT4gPFRhYmxlUm93RmllbGQga2V5PXtpfSBQYXJlbnRUYWJsZUlEPXtwcm9wcy5JRH0gRmllbGQ9e2F9IFZhbHVlcz17ZXh0ZXJuYWxEQkZpZWxkc30gU2V0dGVyPXtjaGVja1VwZGF0ZX0gLz4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPik6KFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGlkPVwib3ZlcnZpZXdcIiBjbGFzc05hbWU9J3RhYmxlJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGg+RXh0ZXJuYWwgREI8L3RoPjx0aCBzdHlsZT17eyB3aWR0aDogMjUwIH19Pkxhc3QgVXBkYXRlZDwvdGg+PHRoIHN0eWxlPXt7IHdpZHRoOiAzMDAgfX0+PC90aD48L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2V4dGVybmFsREIubWFwKChhLCBpKSA9PiA8VGFibGVSb3dJbnB1dCBrZXk9e2l9IFBhcmVudFRhYmxlSUQ9e3Byb3BzLklEfSBFeHRlcm5hbERCPXthLm5hbWV9IHVwZGF0ZWQ9e2EubGFzdHVwZGF0ZX0gVXBkYXRlPXsoZGJUeXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRXh0ZXJuYWxEQihkYlR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+KVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7KGNoYW5nZWQgP1xuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3N1Ym1pdFVwZGF0ZX0+U2F2ZSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e2NhbmNlbFVwZGF0ZX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgICAgIDwvZGl2PiA6IG51bGwpfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBFeHRlcm5hbERhdGFCYXNlV2luZG93O1xuXG5mdW5jdGlvbiBUYWJsZVJvd0lucHV0KHByb3BzOiB7IFBhcmVudFRhYmxlSUQ6IG51bWJlciwgRXh0ZXJuYWxEQjogc3RyaW5nLCB1cGRhdGVkOiBEYXRlLCBVcGRhdGU6IChleHRlcm5hbERCOiBzdHJpbmcpID0+IHZvaWQgfSkge1xuICAgXG4gICAgcmV0dXJuKFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+e3Byb3BzLkV4dGVybmFsREJ9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57KHByb3BzLnVwZGF0ZWQgPT0gbnVsbCA/IFwiTi9BXCIgOiBtb21lbnQocHJvcHMudXBkYXRlZCkuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSl9PC90ZD5cbiAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyhlKSA9PiBwcm9wcy5VcGRhdGUocHJvcHMuRXh0ZXJuYWxEQil9PlVwZGF0ZSB7cHJvcHMuRXh0ZXJuYWxEQn08L2J1dHRvbj48L3RkPlxuICAgICAgICA8L3RyPlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIFRhYmxlUm93RmllbGQocHJvcHM6IHsgUGFyZW50VGFibGVJRDogbnVtYmVyLCBGaWVsZDogU3lzdGVtQ2VudGVyLkV4dGVybmFsREJGaWVsZCwgVmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPiwgU2V0dGVyOiAodmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPikgPT4gdm9pZH0pIHtcbiAgICB2YXIgdmFsdWVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuRXh0ZXJuYWxEQkZpZWxkPiA9IF8uY2xvbmUocHJvcHMuVmFsdWVzKTtcbiAgICB2YXIgdmFsdWU6IFN5c3RlbUNlbnRlci5FeHRlcm5hbERCRmllbGQgPSB2YWx1ZXMuZmluZCh2YWx1ZSA9PiB2YWx1ZS5BZGRpdGlvbmFsRmllbGRJRCA9PSBwcm9wcy5GaWVsZC5BZGRpdGlvbmFsRmllbGRJRCAmJiB2YWx1ZS5PcGVuWERBUGFyZW50VGFibGVJRCA9PSBwcm9wcy5GaWVsZC5PcGVuWERBUGFyZW50VGFibGVJRCAmJiB2YWx1ZS5pc1hEQUZpZWxkID09IHByb3BzLkZpZWxkLmlzWERBRmllbGQpO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRmllbGQoKSB7XG4gICAgICAgIHZhbHVlcyA9IHZhbHVlcy5maWx0ZXIoZmxkID0+ICEoZmxkLkFkZGl0aW9uYWxGaWVsZElEID09IHByb3BzLkZpZWxkLkFkZGl0aW9uYWxGaWVsZElEICYmIGZsZC5PcGVuWERBUGFyZW50VGFibGVJRCA9PSBwcm9wcy5GaWVsZC5PcGVuWERBUGFyZW50VGFibGVJRCAmJiBmbGQuaXNYREFGaWVsZCA9PSBwcm9wcy5GaWVsZC5pc1hEQUZpZWxkKSlcbiAgICAgICAgcHJvcHMuU2V0dGVyKHZhbHVlcyk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtwcm9wcy5QYXJlbnRUYWJsZUlEID09IC0xID9cbiAgICAgICAgICAgICAgICA8dGQ+e3Byb3BzLkZpZWxkLkRpc3BsYXlOYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgOiBudWxsfVxuICAgICAgICAgICAgPHRkPntwcm9wcy5GaWVsZC5GaWVsZE5hbWV9PC90ZD5cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuRmllbGQuUHJldmlvdXNWYWx1ZSA9PSBudWxsID8gXCJcIiA6IHByb3BzLkZpZWxkLlByZXZpb3VzVmFsdWV9PC90ZD5cbiAgICAgICAgICAgIHsocHJvcHMuRmllbGQuRXJyb3IgPyA8dGQ+e3Byb3BzLkZpZWxkLk1lc3NhZ2V9PC90ZD4gOlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17KHByb3BzLkZpZWxkLkNoYW5nZWQgPyBcImZvcm0tY29udHJvbCBpcy1pbnZhbGlkXCIgOiBcImZvcm0tY29udHJvbFwiKX0gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LnZhbHVlICE9IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuVmFsdWUgPSBldnQudGFyZ2V0LnZhbHVlIGFzIGFueTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5WYWx1ZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLkNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICAgIH19IHZhbHVlPXt2YWx1ZS5WYWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZS5WYWx1ZS50b1N0cmluZygpfSAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDx0ZD57cHJvcHMuRmllbGQuRXJyb3IgPyA8c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi10cmlhbmdsZVwiPjwvaT48L3NwYW4+IDogbnVsbH08L3RkPlxuICAgICAgICAgICAgPHRkPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiByZW1vdmVGaWVsZCgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICApO1xufVxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBNZXRlci50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOC8yNy8yMDE5IC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vICAwNC8xNS8yMDIwIC0gQ2hyaXN0b3BoIExhY2tuZXJcbi8vICAgICAgIEFkZGVkIFRhYiBmb3IgZXh0ZXJuYWwgRGF0YWJhc2UgRmllbGRzXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IE1ldGVyTG9jYXRpb25XaW5kb3cgZnJvbSAnLi4vTWV0ZXIvTWV0ZXJMb2NhdGlvbic7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBNZXRlckluZm9XaW5kb3cgZnJvbSAnLi9NZXRlckluZm8nO1xuaW1wb3J0IE1ldGVyRXZlbnRDaGFubmVsV2luZG93IGZyb20gJy4uL01ldGVyL01ldGVyRXZlbnRDaGFubmVsJztcbmltcG9ydCBNZXRlclRyZW5kQ2hhbm5lbFdpbmRvdyBmcm9tICcuLi9NZXRlci9NZXRlclRyZW5kQ2hhbm5lbCc7XG5pbXBvcnQgTWV0ZXJBc3NldFdpbmRvdyBmcm9tICcuLi9NZXRlci9NZXRlckFzc2V0JztcbmltcG9ydCBOb3RlV2luZG93IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvTm90ZVdpbmRvdyc7XG5pbXBvcnQgQWRkaXRpb25hbEZpZWxkc1dpbmRvdyBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0FkZGl0aW9uYWxGaWVsZHNXaW5kb3cnO1xuaW1wb3J0IE1ldGVyQ29uZmlndXJhdGlvbkhpc3RvcnlXaW5kb3cgZnJvbSAnLi9NZXRlckNvbmZpZ3VyYXRpb25IaXN0b3J5JztcbmltcG9ydCBFeHRlcm5hbERCVXBkYXRlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRXh0ZXJuYWxEQlVwZGF0ZSc7XG5cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1ldGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgTWV0ZXJJRDogbnVtYmVyIH0sIHsgTWV0ZXI6IE9wZW5YREEuTWV0ZXIsIFRhYjogc3RyaW5nIH0sIHt9PntcbiAgICBnZXRNZXRlckhhbmRsZTogSlF1ZXJ5LmpxWEhSO1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgTWV0ZXI6IG51bGwsXG4gICAgICAgICAgICBUYWI6IHRoaXMuZ2V0VGFiKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRhYigpOiBzdHJpbmcge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ01ldGVyLlRhYicpKVxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnTWV0ZXIuVGFiJykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gJ25vdGVzJztcbiAgICB9XG5cbiAgICBnZXRNZXRlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuTWV0ZXJJRCA9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgICB0aGlzLmdldE1ldGVySGFuZGxlID0gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvT25lLyR7dGhpcy5wcm9wcy5NZXRlcklEfWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICB9KVxuXG4gICAgICAgdGhpcy5nZXRNZXRlckhhbmRsZS5kb25lKChkYXRhOiBPcGVuWERBLk1ldGVyKSA9PiB0aGlzLnNldFN0YXRlKHsgTWV0ZXI6IGRhdGEgfSkpO1xuICAgIH1cblxuICAgIGRlbGV0ZU1ldGVyKCk6IEpRdWVyeS5qcVhIUiB7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlID0gY29uZmlybShcIlRoaXMgd2lsbCBkZWxldGUgdGhlIE1ldGVyIFBlcm1hbmVudGx5XCIpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvRGVsZXRlYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUuTWV0ZXIpLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0VGFiKHRhYjpzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnTWV0ZXIuVGFiJywgSlNPTi5zdHJpbmdpZnkodGFiKSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1RhYjogdGFifSk7XG4gICAgfVxuICAgIFxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldE1ldGVyKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIGlmICh0aGlzLmdldE1ldGVySGFuZGxlLmFib3J0ICE9IHVuZGVmaW5lZCkgdGhpcy5nZXRNZXRlckhhbmRsZS5hYm9ydCgpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuTWV0ZXIgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNjMsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNjMsIG92ZXJmbG93OiAnaGlkZGVuJywgcGFkZGluZzogMTUgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj57dGhpcy5zdGF0ZS5NZXRlciAhPSBudWxsID8gdGhpcy5zdGF0ZS5NZXRlci5Bc3NldEtleSA6ICcnfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBwdWxsLXJpZ2h0XCIgaGlkZGVuPXt0aGlzLnN0YXRlLk1ldGVyID09IG51bGx9IG9uQ2xpY2s9eygpID0+IHRoaXMuZGVsZXRlTWV0ZXIoKS5kb25lKCgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9TWV0ZXJzJyl9PkRlbGV0ZSBNZXRlciAoUGVybWFuZW50KTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICAgICAgPGhyIC8+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtdGFic1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRoaXMuc3RhdGUuVGFiID09IFwibm90ZXNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdub3RlcycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbm90ZXNcIj5Ob3RlczwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcIm1ldGVySW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRUYWIoJ21ldGVySW5mbycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjbWV0ZXJJbmZvXCI+TWV0ZXIgSW5mbzwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFkZGl0aW9uYWxGaWVsZHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdhZGRpdGlvbmFsRmllbGRzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNhZGRpdGlvbmFsRmllbGRzXCI+QWRkaXRpb25hbCBGaWVsZHM8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJzdWJzdGF0aW9uXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYignc3Vic3RhdGlvbicpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjc3Vic3RhdGlvblwiPlN1YnN0YXRpb248L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJhc3NldHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdhc3NldHMnKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2Fzc2V0c1wiPkFzc2V0czwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImV2ZW50Q2hhbm5lbHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdldmVudENoYW5uZWxzJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNldmVudENoYW5uZWxzXCI+RXZlbnQgQ2hhbm5lbHM8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJ0cmVuZENoYW5uZWxzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldFRhYigndHJlbmRDaGFubmVscycpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjdHJlbmRDaGFubmVsc1wiPlRyZW5kIENoYW5uZWxzPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiY29uZmlndXJhdGlvbkhpc3RvcnlcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIil9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0VGFiKCdjb25maWd1cmF0aW9uSGlzdG9yeScpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjY29uZmlndXJhdGlvbkhpc3RvcnlcIj5Db25maWd1cmF0aW9uIEhpc3Rvcnk8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJleHREQlwiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gdGhpcy5zZXRUYWIoJ2V4dERCJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNleHREQlwiPkV4dGVybmFsIERCPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiIHN0eWxlPXt7bWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMzUsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJub3Rlc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwibm90ZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxOb3RlV2luZG93IElEPXt0aGlzLnByb3BzLk1ldGVySUR9IFR5cGU9J01ldGVyJy8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcIm1ldGVySW5mb1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwibWV0ZXJJbmZvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWV0ZXJJbmZvV2luZG93IE1ldGVyPXt0aGlzLnN0YXRlLk1ldGVyfSBTdGF0ZVNldHRlcj17KG1ldGVyOiBPcGVuWERBLk1ldGVyKSA9PiB0aGlzLnNldFN0YXRlKHsgTWV0ZXI6IG1ldGVyIH0pfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJhZGRpdGlvbmFsRmllbGRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJhZGRpdGlvbmFsRmllbGRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QWRkaXRpb25hbEZpZWxkc1dpbmRvdyBJRD17dGhpcy5wcm9wcy5NZXRlcklEfSBUeXBlPSdNZXRlcicgVGFiPXt0aGlzLnN0YXRlLlRhYn0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJzdWJzdGF0aW9uXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJzdWJzdGF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWV0ZXJMb2NhdGlvbldpbmRvdyBNZXRlcj17dGhpcy5zdGF0ZS5NZXRlcn0gU3RhdGVTZXR0ZXI9eyhtZXRlcjogT3BlblhEQS5NZXRlcikgPT4gdGhpcy5zZXRTdGF0ZSh7IE1ldGVyOiBtZXRlciB9KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiZXZlbnRDaGFubmVsc1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiZXZlbnRDaGFubmVsc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1ldGVyRXZlbnRDaGFubmVsV2luZG93IE1ldGVyPXt0aGlzLnN0YXRlLk1ldGVyfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGFiLXBhbmUgXCIgKyAodGhpcy5zdGF0ZS5UYWIgPT0gXCJ0cmVuZENoYW5uZWxzXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJ0cmVuZENoYW5uZWxzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWV0ZXJUcmVuZENoYW5uZWxXaW5kb3cgTWV0ZXI9e3RoaXMuc3RhdGUuTWV0ZXJ9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0aGlzLnN0YXRlLlRhYiA9PSBcImFzc2V0c1wiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiYXNzZXRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWV0ZXJBc3NldFdpbmRvdyBNZXRlcj17dGhpcy5zdGF0ZS5NZXRlcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiY29uZmlndXJhdGlvbkhpc3RvcnlcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImNvbmZpZ3VyYXRpb25IaXN0b3J5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWV0ZXJDb25maWd1cmF0aW9uSGlzdG9yeVdpbmRvdyBNZXRlcj17dGhpcy5zdGF0ZS5NZXRlcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRoaXMuc3RhdGUuVGFiID09IFwiZXh0REJcIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImV4dERCXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RXh0ZXJuYWxEQlVwZGF0ZSBJRD17dGhpcy5wcm9wcy5NZXRlcklEfSBUeXBlPSdNZXRlcicgVGFiPXt0aGlzLnN0YXRlLlRhYn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgTWV0ZXJBc3NldC50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8xNi8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xuXG5pbXBvcnQgQnVzQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9CdXMnO1xuaW1wb3J0IEJyZWFrZXJBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXInO1xuaW1wb3J0IENhcEJhbmtBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmsnO1xuaW1wb3J0IExpbmVBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0xpbmUnO1xuaW1wb3J0IFRyYW5zZm9ybWVyQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9UcmFuc2Zvcm1lcic7XG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcbmltcG9ydCB7IGdldEFzc2V0VHlwZXMsIGdldEFsbEFzc2V0cywgZ2V0QXNzZXRXaXRoQWRkaXRpb25hbEZpZWxkcywgZWRpdEV4aXN0aW5nQXNzZXQgfSBmcm9tICcuLi8uLi8uLi9UUy9TZXJ2aWNlcy9Bc3NldCc7XG5cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmludGVyZmFjZSBNZXRlckFzc2V0U3RhdGUge1xuICAgIEFzc2V0czogQXJyYXk8T3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLlRyYW5zZm9ybWVyPixcbiAgICBOZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lcixcbiAgICBBbGxBc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+LFxuICAgIEFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPixcbiAgICBOZXdFZGl0OiBTeXN0ZW1DZW50ZXIuTmV3RWRpdFxuXG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXRlckFzc2V0V2luZG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgTWV0ZXI6IE9wZW5YREEuTWV0ZXIgfSwgTWV0ZXJBc3NldFN0YXRlLCB7fT57XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgTmV3RWRpdEFzc2V0OiBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSxcbiAgICAgICAgICAgIEFsbEFzc2V0czogW10sXG4gICAgICAgICAgICBBc3NldFR5cGVzOiBbXSxcbiAgICAgICAgICAgIE5ld0VkaXQ6ICdOZXcnLFxuICAgICAgICAgICAgQXNzZXRzOiBbXVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZE5ld0Fzc2V0ID0gdGhpcy5hZGROZXdBc3NldC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmFkZEV4aXN0aW5nQXNzZXQgPSB0aGlzLmFkZEV4aXN0aW5nQXNzZXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hZGROZXdCdXR0b24gPSB0aGlzLmFkZE5ld0J1dHRvbi5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldE1ldGVyQXNzZXRzKCk7XG4gICAgICAgIGdldEFsbEFzc2V0cygpLmRvbmUoKGFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBbGxBc3NldHM6IGFzc2V0cyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdldEFzc2V0VHlwZXMoKS5kb25lKChhc3NldFR5cGVzOiBBcnJheTxPcGVuWERBLkFzc2V0VHlwZT4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBc3NldFR5cGVzOiBhc3NldFR5cGVzIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVBc3NldChhc3NldDogT3BlblhEQS5Bc3NldCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJERUxFVEVcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvJHt0aGlzLnByb3BzLk1ldGVyLklEfS9Bc3NldC8ke2Fzc2V0LklEfS8ke3RoaXMucHJvcHMuTWV0ZXIuTG9jYXRpb25JRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRNZXRlckFzc2V0cygpO1xuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGROZXdCdXR0b24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0OiAnTmV3JywgTmV3RWRpdEFzc2V0OiBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSB9KTtcbiAgICB9XG5cbiAgICBhZGROZXdBc3NldCgpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC9OZXcvTWV0ZXIvJHt0aGlzLnByb3BzLk1ldGVyLklEfS8ke3RoaXMucHJvcHMuTWV0ZXIuTG9jYXRpb25JRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtBc3NldDogdGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXR9KSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xuICAgICAgICB9KS5mYWlsKChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGFkZEV4aXN0aW5nQXNzZXQoKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvRXhpc3RpbmcvTWV0ZXIvJHt0aGlzLnByb3BzLk1ldGVyLklEfS8ke3RoaXMucHJvcHMuTWV0ZXIuTG9jYXRpb25JRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgQXNzZXQ6IHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0IH0pLFxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XG4gICAgICAgIH0pLmZhaWwoKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy5zdGF0dXMgPT0gNTAwKVxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICBnZXRNZXRlckFzc2V0cygpOiB2b2lkIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyLyR7dGhpcy5wcm9wcy5NZXRlci5JRH0vQXNzZXRgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEFzc2V0czogYXNzZXRzIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkFzc2V0czo8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9e3ttYXJnaW46IC0yMH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiBzdHlsZT17e3BhZGRpbmc6IDIwfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQyMCwgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtaG92ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5LZXk8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPmtWPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNoYW5uZWxzPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLkFzc2V0cy5tYXAoKGFzc2V0OiBPcGVuWERBLkFzc2V0LCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcyMCUnIH19Pnthc3NldC5Bc3NldEtleX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICczMCUnIH19Pnthc3NldC5Bc3NldE5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuQXNzZXRUeXBlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+e2Fzc2V0LlZvbHRhZ2VLVn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pnthc3NldC5DaGFubmVsc308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI2Fzc2V0TW9kYWwnIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0VHlwZSA9IHRoaXMuc3RhdGUuQXNzZXRUeXBlcy5maW5kKGF0ID0+IGF0LklEID09IGFzc2V0WydBc3NldFR5cGVJRCddKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMoYXNzZXQuSUQsIGFzc2V0VHlwZS5OYW1lKS50aGVuKHJlY29yZCA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiByZWNvcmQsIE5ld0VkaXQ6ICdFZGl0JyB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS1wZW5jaWxcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHRoaXMuZGVsZXRlQXNzZXQoYXNzZXQpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cImFzc2V0TW9kYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgc3R5bGU9e3ttYXhXaWR0aDogJzEwMCUnLCB3aWR0aDogJzc1JSd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnN0YXRlLk5ld0VkaXQgPT0gJ05ldycgPyAnQWRkIE5ldyBBc3NldCB0byBNZXRlcic6ICdFZGl0ICcgKyB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldEtleSArICcgZm9yIE1ldGVyJyB9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXNzZXRBdHRyaWJ1dGVzIEFzc2V0PXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldH0gTmV3RWRpdD17dGhpcy5zdGF0ZS5OZXdFZGl0fSBBc3NldFR5cGVzPXt0aGlzLnN0YXRlLkFzc2V0VHlwZXN9IEFsbEFzc2V0cz17dGhpcy5zdGF0ZS5BbGxBc3NldHN9IFVwZGF0ZVN0YXRlPXsoYXNzZXQpID0+IHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IGFzc2V0IH0pfSBHZXREaWZmZXJlbnRBc3NldD17KGFzc2V0SUQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldCA9IHRoaXMuc3RhdGUuQWxsQXNzZXRzLmZpbmQoYSA9PiBhLklEID09IGFzc2V0SUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0VHlwZSA9IHRoaXMuc3RhdGUuQXNzZXRUeXBlcy5maW5kKGF0ID0+IGF0LklEID09IGFzc2V0WydBc3NldFR5cGVJRCddKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QXNzZXRXaXRoQWRkaXRpb25hbEZpZWxkcyhhc3NldElELCBhc3NldFR5cGUuTmFtZSkudGhlbihhc3NldCA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBhc3NldCB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnNob3dBdHRyaWJ1dGVzKCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXt0aGlzLmFkZE5ld0Fzc2V0fSBoaWRkZW49e3RoaXMuc3RhdGUuTmV3RWRpdCA9PSAnRWRpdCcgfHwgdGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuSUQgIT0gMH0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXt0aGlzLmFkZEV4aXN0aW5nQXNzZXR9IGhpZGRlbj17dGhpcy5zdGF0ZS5OZXdFZGl0ID09ICdFZGl0JyB8fCB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5JRCA9PSAwIH0+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRFeGlzdGluZ0Fzc2V0KHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0KS50aGVuKChhc3NldCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudERpZE1vdW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gaGlkZGVuPXt0aGlzLnN0YXRlLk5ld0VkaXQgPT0gJ05ldyd9PlNhdmU8L2J1dHRvbj5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5DbG9zZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNhc3NldE1vZGFsJyBvbkNsaWNrPXt0aGlzLmFkZE5ld0J1dHRvbn0+QWRkIEFzc2V0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2hvd0F0dHJpYnV0ZXMoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCcmVha2VyJylcbiAgICAgICAgICAgIHJldHVybiA8QnJlYWtlckF0dHJpYnV0ZXMgTmV3RWRpdD17dGhpcy5zdGF0ZS5OZXdFZGl0fSBBc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5CcmVha2VyfSBVcGRhdGVTdGF0ZT17KG5ld0VkaXRBc3NldDogT3BlblhEQS5CcmVha2VyKSA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBuZXdFZGl0QXNzZXQgfSl9IFNob3dTcGFyZT17dHJ1ZX0gLz47XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQnVzJylcbiAgICAgICAgICAgIHJldHVybiA8QnVzQXR0cmlidXRlcyBOZXdFZGl0PXt0aGlzLnN0YXRlLk5ld0VkaXR9IEFzc2V0PXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldH0gVXBkYXRlU3RhdGU9eyhuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnVzKSA9PiB0aGlzLnNldFN0YXRlKHtOZXdFZGl0QXNzZXQ6IG5ld0VkaXRBc3NldH0pfSAvPjtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdDYXBhY2l0b3JCYW5rJylcbiAgICAgICAgICAgIHJldHVybiA8Q2FwQmFua0F0dHJpYnV0ZXMgTmV3RWRpdD17dGhpcy5zdGF0ZS5OZXdFZGl0fSBBc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rfSBVcGRhdGVTdGF0ZT17KG5ld0VkaXRBc3NldDogT3BlblhEQS5DYXBCYW5rKSA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBuZXdFZGl0QXNzZXQgfSl9IC8+O1xuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0xpbmUnKVxuICAgICAgICAgICAgcmV0dXJuIDxMaW5lQXR0cmlidXRlcyBOZXdFZGl0PXt0aGlzLnN0YXRlLk5ld0VkaXR9IEFzc2V0PXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkxpbmV9IFVwZGF0ZVN0YXRlPXsobmV3RWRpdEFzc2V0OiBPcGVuWERBLkxpbmUpID0+IHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IG5ld0VkaXRBc3NldCB9KX0gLz47XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnVHJhbnNmb3JtZXInKVxuICAgICAgICAgICAgcmV0dXJuIDxUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgTmV3RWRpdD17dGhpcy5zdGF0ZS5OZXdFZGl0fUFzc2V0PXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCBhcyBPcGVuWERBLlRyYW5zZm9ybWVyfSBVcGRhdGVTdGF0ZT17KG5ld0VkaXRBc3NldDogT3BlblhEQS5UcmFuc2Zvcm1lcikgPT4gdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogbmV3RWRpdEFzc2V0IH0pfSAvPjtcbiAgICB9XG59XG5cbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgTWV0ZXJDb25maWd1cmF0aW9uSGlzdG9yeS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8yOC8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuZGVjbGFyZSBpbnRlcmZhY2UgTWV0ZXJDb25maWd1cmF0aW9uIHtcbiAgICBJRDogbnVtYmVyLFxuICAgIFJldmlzaW9uOiBzdHJpbmcsXG4gICAgRmlsZXNQcm9jZXNzZWQ6IG51bWJlcixcbiAgICBMYXN0UHJvY2Vzc2VkVGltZTogc3RyaW5nXG59XG5mdW5jdGlvbiBNZXRlckNvbmZpZ3VyYXRpb25IaXN0b3J5V2luZG93KHByb3BzOiB7IE1ldGVyOiBPcGVuWERBLk1ldGVyIH0pIHtcbiAgICBjb25zdCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xuICAgIGNvbnN0IFttZXRlckNvbmZpZ3VyYXRpb25zLCBzZXRNZXRlckNvbmZpZ3VyYXRpb25zXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE1ldGVyQ29uZmlndXJhdGlvbj4+KFtdKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGdldERhdGEoKTtcbiAgICB9LCBbcHJvcHMuTWV0ZXJdKTtcblxuICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gICAgICAgIGdldE1ldGVyQ29uZmlndXJhdGlvbnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRNZXRlckNvbmZpZ3VyYXRpb25zKCk6IHZvaWQge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXJDb25maWd1cmF0aW9uL01ldGVyLyR7cHJvcHMuTWV0ZXIuSUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKChkYXRhOiBBcnJheTxNZXRlckNvbmZpZ3VyYXRpb24+KSA9PiBzZXRNZXRlckNvbmZpZ3VyYXRpb25zKGRhdGEpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxlY3QoaXRlbTogTWV0ZXJDb25maWd1cmF0aW9uKSB7XG4gICAgICAgIGhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiBgJHtob21lUGF0aH1pbmRleC5jc2h0bWxgLCBzZWFyY2g6IGA/bmFtZT1Db25maWd1cmF0aW9uSGlzdG9yeSZNZXRlcktleT0ke3Byb3BzLk1ldGVyLkFzc2V0S2V5fSZNZXRlckNvbmZpZ3VyYXRpb25JRD0ke2l0ZW0uSUR9YCwgc3RhdGU6IHt9IH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMTAgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+Q29uZmlndXJhdGlvbiBIaXN0b3J5OjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNDIwLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPSd0YWJsZSc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+PHRkPlJldmlzaW9uPC90ZD48dGQ+RmlsZXMgUHJvY2Vzc2VkPC90ZD48dGQ+TGFzdCBQcm9jZXNzZWQgVGltZTwvdGQ+PC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWV0ZXJDb25maWd1cmF0aW9ucy5tYXAoKGEsIGkpID0+IDx0ciBrZXk9e2l9IHN0eWxlPXt7Y3Vyc29yOiAncG9pbnRlcicgfX0gb25DbGljaz17KGUpID0+IGhhbmRsZVNlbGVjdChhKX0+PHRkPnthLlJldmlzaW9ufTwvdGQ+PHRkPnthLkZpbGVzUHJvY2Vzc2VkfTwvdGQ+PHRkPnthLkxhc3RQcm9jZXNzZWRUaW1lfTwvdGQ+PC90cj4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1ldGVyQ29uZmlndXJhdGlvbkhpc3RvcnlXaW5kb3c7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBNZXRlckV2ZW50Q2hhbm5lbC50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCB7IHRvTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcblxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0ZXJFdmVudENoYW5uZWxXaW5kb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBNZXRlcjogT3BlblhEQS5NZXRlciB9LCB7IENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+LCBQaGFzZXM6IEFycmF5PE9wZW5YREEuUGhhc2U+LCBNZWFzdXJlbWVudFR5cGVzOiBBcnJheTxPcGVuWERBLk1lYXN1cmVtZW50VHlwZT4sIEFsbEFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4gfSwge30+e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIENoYW5uZWxzOiBbXSxcbiAgICAgICAgICAgIFBoYXNlczogW10sXG4gICAgICAgICAgICBNZWFzdXJlbWVudFR5cGVzOiBbXSxcbiAgICAgICAgICAgIEFsbEFzc2V0czogW11cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0Q2hhbm5lbHMgPSB0aGlzLmdldENoYW5uZWxzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2hhbm5lbHMgPSB0aGlzLnVwZGF0ZUNoYW5uZWxzLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0UGhhc2VzKCk7XG4gICAgICAgIHRoaXMuZ2V0QXNzZXRzKCk7XG4gICAgICAgIHRoaXMuZ2V0TWVhc3VyZW1lbnRUeXBlcygpO1xuICAgICAgICB0aGlzLmdldENoYW5uZWxzKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2hhbm5lbHMoKTogdm9pZCB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci8ke3RoaXMucHJvcHMuTWV0ZXIuSUR9L0NoYW5uZWxzL0V2ZW50YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKGNoYW5uZWxzOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICBsZXQgbWFrZUNoYW5uZWxzID0gY2hhbm5lbHMubWFwKGNoYW5uZWwgPT4gY2hhbm5lbCBhcyBPcGVuWERBLkNoYW5uZWwpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6ICBtYWtlQ2hhbm5lbHN9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDaGFubmVscygpOiB2b2lkIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci8ke3RoaXMucHJvcHMuTWV0ZXIuSUR9L0NoYW5uZWwvVXBkYXRlL0V2ZW50YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Q2hhbm5lbHM6IHRoaXMuc3RhdGUuQ2hhbm5lbHN9KSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRDaGFubmVscygpO1xuICAgICAgICB9KS5mYWlsKG1zZyA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDaGFubmVscygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTs7XG4gICAgfVxuXG5cbiAgICBnZXRBc3NldHMoKTogdm9pZCB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci8ke3RoaXMucHJvcHMuTWV0ZXIuSUR9L0Fzc2V0YCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICAgICAgfSkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBbGxBc3NldHM6IGFzc2V0cyB9KVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIGdldFBoYXNlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdTeXN0ZW1DZW50ZXIuUGhhc2VzJykpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgUGhhc2VzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1N5c3RlbUNlbnRlci5QaGFzZXMnKSkgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL1BoYXNlYCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICAgICAgfSkuZG9uZSgocGhhc2VzOiBBcnJheTxPcGVuWERBLlBoYXNlPikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBQaGFzZXM6IHBoYXNlcyB9KVxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLlBoYXNlcycsIEpTT04uc3RyaW5naWZ5KHBoYXNlcykpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRNZWFzdXJlbWVudFR5cGVzKCk6IHZvaWQge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ09wZW5YREEuTWVhc3VyZW1lbnRUeXBlcycpKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1lYXN1cmVtZW50VHlwZXM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnT3BlblhEQS5NZWFzdXJlbWVudFR5cGVzJykpIH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZWFzdXJlbWVudFR5cGVgLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgICAgICB9KS5kb25lKChtZWFzdXJlbWVudFR5cGVzOiBBcnJheTxPcGVuWERBLk1lYXN1cmVtZW50VHlwZT4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTWVhc3VyZW1lbnRUeXBlczogbWVhc3VyZW1lbnRUeXBlcyB9KVxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ09wZW5YREEuTWVhc3VyZW1lbnRUeXBlcycsIEpTT04uc3RyaW5naWZ5KG1lYXN1cmVtZW50VHlwZXMpKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQ2hhbm5lbChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUodGhpcy5zdGF0ZS5DaGFubmVscyk7XG4gICAgICAgIGxldCByZWNvcmQ6IE9wZW5YREEuQ2hhbm5lbCA9IGNoYW5uZWxzLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogY2hhbm5lbHMgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5DaGFubmVsczo8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA0MjAsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNoYW5uZWw8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkRlc2M8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlBoYXNlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5BZGRlcjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+TXVsdGlwbGllcjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+QXNzZXQ8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuQ2hhbm5lbHMubWFwKChjaGFubmVsLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICc1JScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5TZXJpZXNbMF0uU291cmNlSW5kZXhlc30gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuU2VyaWVzWzBdLlNvdXJjZUluZGV4ZXMgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzE1JScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5OYW1lfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5OYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICczMCUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuRGVzY3JpcHRpb24gPT0gbnVsbCA/ICcnIDogY2hhbm5lbC5EZXNjcmlwdGlvbn0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuRGVzY3JpcHRpb24gPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk1lYXN1cmVtZW50VHlwZX0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuTWVhc3VyZW1lbnRUeXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT57dGhpcy5zdGF0ZS5NZWFzdXJlbWVudFR5cGVzLm1hcChhID0+IDxvcHRpb24ga2V5PXthLklEfSB2YWx1ZT17YS5OYW1lfT57YS5OYW1lfTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pns8c2VsZWN0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5QaGFzZX0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuUGhhc2UgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Pnt0aGlzLnN0YXRlLlBoYXNlcy5tYXAoYSA9PiA8b3B0aW9uIGtleT17YS5JRH0gdmFsdWU9e2EuTmFtZX0+e2EuTmFtZX08L29wdGlvbj4pfTwvc2VsZWN0Pn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNSUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuQWRkZXJ9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFkZGVyID0gdG9OdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNSUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuTXVsdGlwbGllcn0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuTXVsdGlwbGllciA9IHRvTnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLkFzc2V0fSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLkFsbEFzc2V0cy5tYXAoYSA9PiA8b3B0aW9uIGtleT17YS5JRH0gdmFsdWU9e2EuQXNzZXRLZXl9PnthLkFzc2V0S2V5fTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICc1JScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHRoaXMuZGVsZXRlQ2hhbm5lbChpbmRleCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbDogT3BlblhEQS5DaGFubmVsID0geyBJRDogMCwgTWV0ZXI6IHRoaXMucHJvcHMuTWV0ZXIuQXNzZXRLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnVm9sdGFnZScsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdBTicsIE5hbWU6ICdWQU4nLCBBZGRlcjogMCwgTXVsdGlwbGllcjogMSwgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdWb2x0YWdlIEFOJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiBbeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllc10gfSBhcyBPcGVuWERBLkNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBfLmNsb25lKHRoaXMuc3RhdGUuQ2hhbm5lbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PkFkZCBDaGFubmVsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17dGhpcy51cGRhdGVDaGFubmVsc30+U2F2ZSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuZ2V0Q2hhbm5lbHN9PkNsZWFyIENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cblxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBNZXRlckluZm8udHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDkvMDkvMjAxOSAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XG5pbXBvcnQgRm9ybVRleHRBcmVhIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybVRleHRBcmVhJztcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1ldGVySW5mb1dpbmRvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IE1ldGVyOiBPcGVuWERBLk1ldGVyLCBTdGF0ZVNldHRlcjogKG1ldGVyOiBPcGVuWERBLk1ldGVyKSA9PiB2b2lkIH0sIHsgTWV0ZXI6IE9wZW5YREEuTWV0ZXIsIFRpbWVab25lczogQXJyYXk8U3lzdGVtQ2VudGVyLlZhbHVlTGlzdEl0ZW0+IH0sIHt9PiB7XG4gICAganF1ZXJ5SGFuZGxlOiBKUXVlcnkuanFYSFI7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBUaW1lWm9uZXM6IFtdLFxuICAgICAgICAgICAgTWV0ZXI6IHRoaXMucHJvcHMuTWV0ZXJcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsaWQgPSB0aGlzLnZhbGlkLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZ2V0VGltZVpvbmVzKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1ldGVyOiBuZXh0UHJvcHMuTWV0ZXIgfSk7XG4gICAgfVxuXG4gICAgZ2V0VGltZVpvbmVzKCk6IHZvaWQge1xuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ1N5c3RlbUNlbnRlci5UaW1lWm9uZXMnKSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBUaW1lWm9uZXM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnU3lzdGVtQ2VudGVyLlRpbWVab25lcycpKSB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1ZhbHVlTGlzdC9Hcm91cC9UaW1lWm9uZXNgLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgICAgICB9KS5kb25lKCh0enM6IEFycmF5PFN5c3RlbUNlbnRlci5WYWx1ZUxpc3RJdGVtPikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBUaW1lWm9uZXM6IHR6cyB9KTtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdTeXN0ZW1DZW50ZXIuVGltZVpvbmVzJywgSlNPTi5zdHJpbmdpZnkodHpzKSk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZU1ldGVyKCk6IHZvaWQge1xuICAgICAgICB2YXIgbWV0ZXI6IE9wZW5YREEuTWV0ZXIgPSBfLmNsb25lKHRoaXMuc3RhdGUuTWV0ZXIpO1xuICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyL1VwZGF0ZWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLk1ldGVyKSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgfSkuZG9uZSgobWV0ZXJJRDogTnVtYmVyKSA9PiB7XG4gICAgICAgICAgIHRoaXMucHJvcHMuU3RhdGVTZXR0ZXIobWV0ZXIpO1xuICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5NZXRlcikpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpZWxkID09ICdBc3NldEtleScpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5NZXRlci5Bc3NldEtleSAhPSBudWxsICYmIHRoaXMucHJvcHMuTWV0ZXIuQXNzZXRLZXkubGVuZ3RoID4gMCAmJiB0aGlzLnByb3BzLk1ldGVyLkFzc2V0S2V5Lmxlbmd0aCA8PSA1MDtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTWV0ZXIuTmFtZSAhPSBudWxsICYmIHRoaXMucHJvcHMuTWV0ZXIuTmFtZS5sZW5ndGggPiAwICYmIHRoaXMucHJvcHMuTWV0ZXIuTmFtZS5sZW5ndGggPD0gMjAwO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQWxpYXMnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTWV0ZXIuQWxpYXMgPT0gbnVsbCB8fCB0aGlzLnByb3BzLk1ldGVyLkFsaWFzLmxlbmd0aCA8PSAyMDA7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTaG9ydE5hbWUnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTWV0ZXIuU2hvcnROYW1lID09IG51bGwgfHwgdGhpcy5wcm9wcy5NZXRlci5TaG9ydE5hbWUubGVuZ3RoIDw9IDUwO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTWFrZScpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5NZXRlci5OYW1lICE9IG51bGwgJiYgdGhpcy5wcm9wcy5NZXRlci5NYWtlLmxlbmd0aCA+IDAgJiYgdGhpcy5wcm9wcy5NZXRlci5NYWtlLmxlbmd0aCA8PSAyMDA7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdNb2RlbCcpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5NZXRlci5OYW1lICE9IG51bGwgJiYgdGhpcy5wcm9wcy5NZXRlci5Nb2RlbC5sZW5ndGggPiAwICYmIHRoaXMucHJvcHMuTWV0ZXIuTW9kZWwubGVuZ3RoIDw9IDIwMDtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLk1ldGVyID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5NZXRlciBJbmZvcm1hdGlvbjo8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXt0aGlzLnN0YXRlLk1ldGVyfSBGaWVsZD17J0Fzc2V0S2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KG1ldGVyOiBPcGVuWERBLk1ldGVyKSA9PiB0aGlzLnNldFN0YXRlKHsgTWV0ZXI6IG1ldGVyIH0pfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXt0aGlzLnN0YXRlLk1ldGVyfSBGaWVsZD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMgYW5kIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhtZXRlcjogT3BlblhEQS5NZXRlcikgPT4gdGhpcy5zZXRTdGF0ZSh7IE1ldGVyOiBtZXRlciB9KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17dGhpcy5zdGF0ZS5NZXRlcn0gRmllbGQ9eydTaG9ydE5hbWUnfSBGZWVkYmFjaz17J1Nob3J0TmFtZSBtdXN0IGJlIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhtZXRlcjogT3BlblhEQS5NZXRlcikgPT4gdGhpcy5zZXRTdGF0ZSh7IE1ldGVyOiBtZXRlciB9KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17dGhpcy5zdGF0ZS5NZXRlcn0gRmllbGQ9eydBbGlhcyd9IEZlZWRiYWNrPXsnQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17KG1ldGVyOiBPcGVuWERBLk1ldGVyKSA9PiB0aGlzLnNldFN0YXRlKHsgTWV0ZXI6IG1ldGVyIH0pfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3RoaXMuc3RhdGUuTWV0ZXJ9IEZpZWxkPXsnTWFrZSd9IEZlZWRiYWNrPXsnTWFrZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXsobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHRoaXMuc2V0U3RhdGUoeyBNZXRlcjogbWV0ZXIgfSl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3RoaXMuc3RhdGUuTWV0ZXJ9IEZpZWxkPXsnTW9kZWwnfSBGZWVkYmFjaz17J01vZGVsIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9eyhtZXRlcjogT3BlblhEQS5NZXRlcikgPT4gdGhpcy5zZXRTdGF0ZSh7IE1ldGVyOiBtZXRlciB9KX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+VGltZSBab25lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5zdGF0ZS5NZXRlciA9PSBudWxsIHx8IHRoaXMuc3RhdGUuTWV0ZXIuVGltZVpvbmUgPT0gbnVsbCA/ICctMScgOiB0aGlzLnN0YXRlLk1ldGVyLlRpbWVab25lfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGVyOiBPcGVuWERBLk1ldGVyID0gXy5jbG9uZSh0aGlzLnN0YXRlLk1ldGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LnZhbHVlICE9IFwiLTFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRlci5UaW1lWm9uZSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0ZXIuVGltZVpvbmUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1ldGVyOiBtZXRlciB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiLTFcIj5Ob25lIFNlbGVjdGVkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuc3RhdGUuVGltZVpvbmVzICE9IG51bGwgPyB0aGlzLnN0YXRlLlRpbWVab25lcy5zb3J0KChhLCBiKSA9PiBhLlNvcnRPcmRlciAtIGIuU29ydE9yZGVyKS5tYXAodHogPT4gPG9wdGlvbiB2YWx1ZT17dHouVGV4dH0ga2V5PXt0ei5UZXh0fSBkaXNhYmxlZD17IXR6LkVuYWJsZWR9IGhpZGRlbj17dHouSGlkZGVufT57dHouQWx0VGV4dDF9PC9vcHRpb24+KTogbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1UZXh0QXJlYTxPcGVuWERBLk1ldGVyPiBSb3dzPXszfSBSZWNvcmQ9e3RoaXMuc3RhdGUuTWV0ZXJ9IEZpZWxkPXsnRGVzY3JpcHRpb24nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXsobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHRoaXMuc2V0U3RhdGUoeyBNZXRlcjogbWV0ZXIgfSl9IC8+XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVNZXRlcigpfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5NZXRlciA9PSB0aGlzLnByb3BzLk1ldGVyfT5TYXZlIENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7IE1ldGVyOiB0aGlzLnByb3BzLk1ldGVyIH0pfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5NZXRlciA9PSB0aGlzLnByb3BzLk1ldGVyfT5DbGVhciBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIENvbm5lY3Rpb25JbmZvLnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMTksIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDA5LzExLzIwMTkgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XG5pbXBvcnQgRm9ybVRleHRBcmVhIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybVRleHRBcmVhJztcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvY2F0aW9uV2luZG93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgTWV0ZXI6IE9wZW5YREEuTWV0ZXIsIFN0YXRlU2V0dGVyOiAoT3BlblhEQU1ldGVyKSA9PiB2b2lkIH0sIHsgTG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24sIGNoYW5nZWQ6IGJvb2xlYW4sIExvY2F0aW9uczogQXJyYXk8T3BlblhEQS5Mb2NhdGlvbj59LCB7fT4ge1xuICAgIGpxdWVyeUhhbmRsZTogSlF1ZXJ5LmpxWEhSO1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgTG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICBJRDogMCxcbiAgICAgICAgICAgICAgICBMb2NhdGlvbktleTogbnVsbCxcbiAgICAgICAgICAgICAgICBOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgIEFsaWFzOiBudWxsLFxuICAgICAgICAgICAgICAgIFNob3J0TmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgICBMYXRpdHVkZTogbnVsbCxcbiAgICAgICAgICAgICAgICBMb25naXR1ZGU6IG51bGwsXG4gICAgICAgICAgICAgICAgRGVzY3JpcHRpb246IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlZDogZmFsc2UsXG4gICAgICAgICAgICBMb2NhdGlvbnM6IFtdXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy52YWxpZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlID0gdGhpcy51cGRhdGVTdGF0ZS5iaW5kKHRoaXMpO1xuXG4gICAgfVxuXG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy5nZXRBbGxMb2NhdGlvbnMoKTtcbiAgICAgICAgdGhpcy5nZXRMb2NhdGlvbih0aGlzLnByb3BzLk1ldGVyKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5Mb2NhdGlvbi5JRCAhPSBuZXh0UHJvcHMuTWV0ZXIuTG9jYXRpb25JRClcbiAgICAgICAgICAgIHRoaXMuZ2V0TG9jYXRpb24obmV4dFByb3BzLk1ldGVyKTtcbiAgICB9XG5cblxuICAgIGdldExvY2F0aW9uKG1ldGVyOiBPcGVuWERBLk1ldGVyKTogdm9pZCB7XG4gICAgICAgIGlmIChtZXRlciA9PSBudWxsIHx8IG1ldGVyLkxvY2F0aW9uSUQgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTG9jYXRpb24vT25lLyR7bWV0ZXIuTG9jYXRpb25JRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgobG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24pID0+IHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogbG9jYXRpb24sIGNoYW5nZWQ6IGZhbHNlIH0pKTtcbiAgICB9XG5cbiAgICBnZXREaWZmZXJlbnRMb2NhdGlvbihsb2NhdGlvbklEOiBudW1iZXIpOiBKUXVlcnkuanFYSFIge1xuICAgICAgICB2YXIganF1ZXJ5SGFuZGxlID0gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uL09uZS8ke2xvY2F0aW9uSUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBqcXVlcnlIYW5kbGUuZG9uZSgobG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24pID0+IHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogbG9jYXRpb24sIGNoYW5nZWQ6IHRydWUgfSkpO1xuICAgIH1cblxuICAgIGdldEFsbExvY2F0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdTeXN0ZW1DZW50ZXIuTG9jYXRpb25zJykpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb25zOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1N5c3RlbUNlbnRlci5Mb2NhdGlvbnMnKSkgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uYCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICAgICAgfSkuZG9uZShtbHMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbnM6IG1scyB9KVxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ1N5c3RlbUNlbnRlci5Mb2NhdGlvbnMnLCBKU09OLnN0cmluZ2lmeShtbHMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgYWRkTmV3TG9jYXRpb24oKTogSlF1ZXJ5LmpxWEhSIHtcbiAgICAgICAgdmFyIGxvY2F0aW9uOiBhbnkgPSBfLmNsb25lKHRoaXMuc3RhdGUuTG9jYXRpb24pO1xuICAgICAgICBsb2NhdGlvbi5NZXRlcklEID0gdGhpcy5wcm9wcy5NZXRlci5JRDtcblxuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Mb2NhdGlvbi9BZGRgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobG9jYXRpb24pLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgobG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24pID0+IHsgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbjogbG9jYXRpb24sIGNoYW5nZWQ6IGZhbHNlIH0sKCkgPT4gdGhpcy5nZXRBbGxMb2NhdGlvbnMoKSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVMb2NhdGlvbigpOiBKUXVlcnkuanFYSFIge1xuICAgICAgICB2YXIgbG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24gPSBfLmNsb25lKHRoaXMuc3RhdGUuTG9jYXRpb24pO1xuICAgICAgICB2YXIgbWV0ZXI6IE9wZW5YREEuTWV0ZXIgPSBfLmNsb25lKHRoaXMucHJvcHMuTWV0ZXIpO1xuXG4gICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIlBBVENIXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uL1VwZGF0ZWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlLkxvY2F0aW9uKSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgfSkuZG9uZSgobG9jYXRpb25JRDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgIGlmIChsb2NhdGlvbi5JRCAhPSBtZXRlci5Mb2NhdGlvbklEKSB7XG4gICAgICAgICAgICAgICBtZXRlci5Mb2NhdGlvbklEID0gdGhpcy5zdGF0ZS5Mb2NhdGlvbi5JRDtcbiAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgdHlwZTogXCJQQVRDSFwiLFxuICAgICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvVXBkYXRlYCxcbiAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWV0ZXIpLFxuICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgICAgICAgIH0pLmRvbmUoKG1zZykgPT4ge1xuICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU3RhdGVTZXR0ZXIobWV0ZXIpO1xuICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgfVxuXG4gICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjaGFuZ2VkOiBmYWxzZSB9LCAoKSA9PiB0aGlzLmdldEFsbExvY2F0aW9ucygpKVxuICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5Mb2NhdGlvbikpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpZWxkID09ICdMb2NhdGlvbktleScpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5Mb2NhdGlvbi5Mb2NhdGlvbktleSAhPSBudWxsICYmIHRoaXMuc3RhdGUuTG9jYXRpb24uTG9jYXRpb25LZXkubGVuZ3RoID4gMCAmJiB0aGlzLnN0YXRlLkxvY2F0aW9uLkxvY2F0aW9uS2V5Lmxlbmd0aCA8PSA1MDtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uTmFtZSAhPSBudWxsICYmIHRoaXMuc3RhdGUuTG9jYXRpb24uTmFtZS5sZW5ndGggPiAwICYmIHRoaXMuc3RhdGUuTG9jYXRpb24uTmFtZS5sZW5ndGggPD0gMjAwO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQWxpYXMnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uQWxpYXMgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLkxvY2F0aW9uLkFsaWFzLmxlbmd0aCA8PSAyMDA7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTaG9ydE5hbWUnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uU2hvcnROYW1lID09IG51bGwgfHwgdGhpcy5zdGF0ZS5Mb2NhdGlvbi5TaG9ydE5hbWUubGVuZ3RoIDw9IDUwO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTGF0aXR1ZGUnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuTG9jYXRpb24uTGF0aXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHRoaXMuc3RhdGUuTG9jYXRpb24uTGF0aXR1ZGUpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTG9uZ2l0dWRlJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkxvY2F0aW9uLkxvbmdpdHVkZSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIodGhpcy5zdGF0ZS5Mb2NhdGlvbi5Mb25naXR1ZGUpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRGVzY3JpcHRpb24nKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB1cGRhdGVTdGF0ZShsb2NhdGlvbjogT3BlblhEQS5Mb2NhdGlvbikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb246IGxvY2F0aW9uLCBjaGFuZ2VkOiB0cnVlIH0pO1xuICAgIH1cblxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAxMCB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5NZXRlciBMb2NhdGlvbiAvIFN1YnN0YXRpb24gSW5mb3JtYXRpb246PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2VsZWN0IExvY2F0aW9uPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5zdGF0ZS5Mb2NhdGlvbi5JRCA9PSBudWxsID8gJzAnIDogdGhpcy5zdGF0ZS5Mb2NhdGlvbi5JRH0gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NhdGlvbjogT3BlblhEQS5Mb2NhdGlvbiA9IF8uY2xvbmUodGhpcy5zdGF0ZS5Mb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPSBcIjBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERpZmZlcmVudExvY2F0aW9uKHBhcnNlSW50KGV2dC50YXJnZXQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25LZXk6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxpYXM6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG9ydE5hbWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYXRpdHVkZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvbmdpdHVkZTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uOiBudWxsLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGNoYW5nZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMFwiPkFkZCBOZXc8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5zdGF0ZS5Mb2NhdGlvbnMgIT0gbnVsbCA/IHRoaXMuc3RhdGUuTG9jYXRpb25zLm1hcChtbCA9PiA8b3B0aW9uIHZhbHVlPXttbC5JRH0ga2V5PXttbC5JRH0+e21sLkxvY2F0aW9uS2V5fTwvb3B0aW9uPik6IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydMb2NhdGlvbktleSd9IExhYmVsPXsnS2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy51cGRhdGVTdGF0ZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydOYW1lJ30gRmVlZGJhY2s9eydOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzIGFuZCBpcyByZXF1aXJlZC4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnN0YXRlLkxvY2F0aW9ufSBGaWVsZD17J1Nob3J0TmFtZSd9IEZlZWRiYWNrPXsnU2hvcnROYW1lIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy51cGRhdGVTdGF0ZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydBbGlhcyd9IEZlZWRiYWNrPXsnQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy51cGRhdGVTdGF0ZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydMYXRpdHVkZSd9IEZlZWRiYWNrPXsnTGF0aXR1ZGUgaXMgYSByZXF1aXJlIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy51cGRhdGVTdGF0ZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5zdGF0ZS5Mb2NhdGlvbn0gRmllbGQ9eydMb25naXR1ZGUnfSBGZWVkYmFjaz17J0xvbmdpdHVkZSBpcyBhIHJlcXVpcmUgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtVGV4dEFyZWE8T3BlblhEQS5Mb2NhdGlvbj4gUm93cz17M30gUmVjb3JkPXt0aGlzLnN0YXRlLkxvY2F0aW9ufSBGaWVsZD17J0Rlc2NyaXB0aW9uJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy51cGRhdGVTdGF0ZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KCkgPT4gdGhpcy5hZGROZXdMb2NhdGlvbigpfSBoaWRkZW49e3RoaXMuc3RhdGUuTG9jYXRpb24uSUQgIT0gMH0gZGlzYWJsZWQ9eyF0aGlzLnN0YXRlLmNoYW5nZWR9PkFkZCBOZXc8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGVMb2NhdGlvbigpfSBoaWRkZW49e3RoaXMuc3RhdGUuTG9jYXRpb24uSUQgPT0gMH0gZGlzYWJsZWQ9eyF0aGlzLnN0YXRlLmNoYW5nZWR9PlVwZGF0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLmdldExvY2F0aW9uKHRoaXMucHJvcHMuTWV0ZXIpfSBkaXNhYmxlZD17IXRoaXMuc3RhdGUuY2hhbmdlZH0+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBNZXRlclRyZW5kQ2hhbm5lbC50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCB7IHRvTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcblxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0ZXJUcmVuZENoYW5uZWxXaW5kb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBNZXRlcjogT3BlblhEQS5NZXRlciB9LCB7IENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+LCBQaGFzZXM6IEFycmF5PE9wZW5YREEuUGhhc2U+LCBNZWFzdXJlbWVudFR5cGVzOiBBcnJheTxPcGVuWERBLk1lYXN1cmVtZW50VHlwZT4sIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzOiBBcnJheTxPcGVuWERBLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM+LCBBbGxBc3NldHM6IEFycmF5PE9wZW5YREEuQXNzZXQ+IH0sIHt9PntcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBDaGFubmVsczogW10sXG4gICAgICAgICAgICBQaGFzZXM6IFtdLFxuICAgICAgICAgICAgTWVhc3VyZW1lbnRUeXBlczogW10sXG4gICAgICAgICAgICBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljczogW10sXG4gICAgICAgICAgICBBbGxBc3NldHM6IFtdXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmdldENoYW5uZWxzID0gdGhpcy5nZXRDaGFubmVscy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNoYW5uZWxzID0gdGhpcy51cGRhdGVDaGFubmVscy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmdldFBoYXNlcygpO1xuICAgICAgICB0aGlzLmdldEFzc2V0cygpO1xuICAgICAgICB0aGlzLmdldE1lYXN1cmVtZW50VHlwZXMoKTtcbiAgICAgICAgdGhpcy5nZXRNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljcygpO1xuICAgICAgICB0aGlzLmdldENoYW5uZWxzKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2hhbm5lbHMoKTogdm9pZCB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci8ke3RoaXMucHJvcHMuTWV0ZXIuSUR9L0NoYW5uZWxzL1RyZW5kYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKGNoYW5uZWxzOiBBcnJheTxhbnk+KSA9PiB7XG4gICAgICAgICAgICBsZXQgbWFrZUNoYW5uZWxzID0gY2hhbm5lbHMubWFwKGNoYW5uZWwgPT4gY2hhbm5lbCBhcyBPcGVuWERBLkNoYW5uZWwpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6ICBtYWtlQ2hhbm5lbHN9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVDaGFubmVscygpOiB2b2lkIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci8ke3RoaXMucHJvcHMuTWV0ZXIuSUR9L0NoYW5uZWwvVXBkYXRlL1RyZW5kYCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Q2hhbm5lbHM6IHRoaXMuc3RhdGUuQ2hhbm5lbHN9KSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRDaGFubmVscygpO1xuICAgICAgICB9KS5mYWlsKG1zZyA9PiB7XG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXG4gICAgICAgICAgICAgICAgYWxlcnQobXNnLnJlc3BvbnNlSlNPTi5FeGNlcHRpb25NZXNzYWdlKVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDaGFubmVscygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTs7XG4gICAgfVxuXG5cbiAgICBnZXRBc3NldHMoKTogdm9pZCB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci8ke3RoaXMucHJvcHMuTWV0ZXIuSUR9L0Fzc2V0YCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICAgICAgfSkuZG9uZSgoYXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBbGxBc3NldHM6IGFzc2V0cyB9KVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIGdldFBoYXNlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdTeXN0ZW1DZW50ZXIuUGhhc2VzJykpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgUGhhc2VzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ1N5c3RlbUNlbnRlci5QaGFzZXMnKSkgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL1BoYXNlYCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICAgICAgfSkuZG9uZSgocGhhc2VzOiBBcnJheTxPcGVuWERBLlBoYXNlPikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBQaGFzZXM6IHBoYXNlcyB9KVxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLlBoYXNlcycsIEpTT04uc3RyaW5naWZ5KHBoYXNlcykpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TWVhc3VyZW1lbnRUeXBlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdPcGVuWERBLk1lYXN1cmVtZW50VHlwZXMnKSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBNZWFzdXJlbWVudFR5cGVzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ09wZW5YREEuTWVhc3VyZW1lbnRUeXBlcycpKSB9KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWVhc3VyZW1lbnRUeXBlYCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICAgICAgfSkuZG9uZSgobWVhc3VyZW1lbnRUeXBlczogQXJyYXk8T3BlblhEQS5NZWFzdXJlbWVudFR5cGU+KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1lYXN1cmVtZW50VHlwZXM6IG1lYXN1cmVtZW50VHlwZXMgfSlcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdPcGVuWERBLk1lYXN1cmVtZW50VHlwZXMnLCBKU09OLnN0cmluZ2lmeShtZWFzdXJlbWVudFR5cGVzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdPcGVuWERBLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzJykpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTWVhc3VyZW1lbnRUeXBlczogSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdPcGVuWERBLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzJykpIH0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZWFzdXJlbWVudENoYXJhY3RlcmlzdGljYCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICAgICAgfSkuZG9uZSgobWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpY3M6IEFycmF5PE9wZW5YREEuTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYz4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpY3M6IG1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzIH0pXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnT3BlblhEQS5NZWFzdXJlbWVudENoYXJhY3RlcmlzdGljcycsIEpTT04uc3RyaW5naWZ5KG1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkZWxldGVDaGFubmVsKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZSh0aGlzLnN0YXRlLkNoYW5uZWxzKTtcbiAgICAgICAgbGV0IHJlY29yZDogT3BlblhEQS5DaGFubmVsID0gY2hhbm5lbHMuc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDEwIH19PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0PkNoYW5uZWxzOjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQyMCwgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+RGVzYzwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+VHlwZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q2hhcmFjdGVyaXN0aWM8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlBoYXNlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5IYXJtb25pYzwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+QWRkZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk11bHRpcGxpZXI8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkFzc2V0PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLkNoYW5uZWxzLm1hcCgoY2hhbm5lbCwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk5hbWV9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLk5hbWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5EZXNjcmlwdGlvbiA9PSBudWxsID8gJycgOiBjaGFubmVsLkRlc2NyaXB0aW9ufSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5EZXNjcmlwdGlvbiA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57PHNlbGVjdCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuTWVhc3VyZW1lbnRUeXBlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5NZWFzdXJlbWVudFR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Pnt0aGlzLnN0YXRlLk1lYXN1cmVtZW50VHlwZXMubWFwKGEgPT4gPG9wdGlvbiBrZXk9e2EuSUR9IHZhbHVlPXthLk5hbWV9PnthLk5hbWV9PC9vcHRpb24+KX08L3NlbGVjdD59PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWN9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWMgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Pnt0aGlzLnN0YXRlLk1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWNzLm1hcChhID0+IDxvcHRpb24ga2V5PXthLklEfSB2YWx1ZT17YS5OYW1lfT57YS5OYW1lfTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pns8c2VsZWN0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5QaGFzZX0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuUGhhc2UgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Pnt0aGlzLnN0YXRlLlBoYXNlcy5tYXAoYSA9PiA8b3B0aW9uIGtleT17YS5JRH0gdmFsdWU9e2EuTmFtZX0+e2EuTmFtZX08L29wdGlvbj4pfTwvc2VsZWN0Pn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNSUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuSGFybW9uaWNHcm91cH0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuSGFybW9uaWNHcm91cCA9IHRvTnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLkFkZGVyfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5BZGRlciA9IHRvTnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk11bHRpcGxpZXJ9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLk11bHRpcGxpZXIgPSB0b051bWJlcihldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pns8c2VsZWN0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5Bc3NldH0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj48L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5BbGxBc3NldHMubWFwKGEgPT4gPG9wdGlvbiBrZXk9e2EuSUR9IHZhbHVlPXthLkFzc2V0S2V5fT57YS5Bc3NldEtleX08L29wdGlvbj4pfTwvc2VsZWN0Pn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNSUnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRlbGV0ZUNoYW5uZWwoaW5kZXgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsOiBPcGVuWERBLkNoYW5uZWwgPSB7IElEOiAwLCBNZXRlcjogdGhpcy5wcm9wcy5NZXRlci5Bc3NldEtleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ1JNUycsIFBoYXNlOiAnQU4nLCBOYW1lOiAnVkFOIFJNUycsIEFkZGVyOiAwLCBNdWx0aXBsaWVyOiAxLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ1ZvbHRhZ2UgQU4gUk1TJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiBbeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnTWF4aW11bScsIFNvdXJjZUluZGV4ZXM6ICcnIH0sIHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ01pbmltdW0nLCBTb3VyY2VJbmRleGVzOiAnJyB9LCB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdBdmVyYWdlJywgU291cmNlSW5kZXhlczogJycgfV0gfSBhcyBPcGVuWERBLkNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBfLmNsb25lKHRoaXMuc3RhdGUuQ2hhbm5lbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PkFkZCBDaGFubmVsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17dGhpcy51cGRhdGVDaGFubmVsc30+U2F2ZSBDaGFuZ2VzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0bi1ncm91cCBtci0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMuZ2V0Q2hhbm5lbHN9PkNsZWFyIENoYW5nZXM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=