(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AssetGroup~ByAssetGroup"],{

/***/ "./TSX/SystemCenter/AssetGroups/AddToGroup.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/AssetGroups/AddToGroup.tsx ***!
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
/* harmony import */ var _CommonComponents_ParameterSearch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/ParameterSearch */ "./TSX/SystemCenter/CommonComponents/ParameterSearch.tsx");
//******************************************************************************************************
//  AddToGroup.tsx - Gbtc
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




function AddToAssetGroup(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), search = _a[0], setSearch = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), data = _b[0], setData = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), selectedData = _c[0], setSelectedData = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortFieldAll = _d[0], setSortFieldAll = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascendingAll = _e[0], setAscendingAll = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('AssetKey'), 2), sortFieldSelected = _f[0], setSortFieldSelected = _f[1];
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), ascendingSelected = _g[0], setAscendingSelected = _g[1];
    var _h = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), result = _h[0], setResult = _h[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (result.length == 0)
            return function () { };
        var handle = props.onComplete(result);
        handle.done(function (d) { return setResult([]); });
        return function () {
            if (handle != undefined && handle.abort != null)
                handle.abort();
        };
    }, [result]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = props.getData(search);
        handle.done(function (d) { return setData(d); });
        return function () {
            if (handle != undefined && handle.abort != null)
                handle.abort();
        };
    }, [search]);
    function getSearchField() {
        switch (props.type) {
            case 'Asset':
                return [
                    { key: 'Asset.AssetKey', label: 'Key' },
                    { key: 'Asset.AssetName', label: 'Name' },
                    { key: 'AssetType.Name', label: 'AssetType' },
                    { key: 'Asset.VoltageKV', label: 'VoltageKV' },
                    { key: 'Meter.AssetKey', label: 'Meter' },
                    { key: 'Location.LocationKey', label: 'Location' },
                    { key: 'Note.Note', label: 'Note' },
                ];
            case 'Meter':
                return [
                    { key: 'Meter.AssetKey', label: 'Key' },
                    { key: 'Meter.Name', label: 'Name' },
                    { key: 'Meter.Location', label: 'Location' },
                    { key: 'Meter.Make', label: 'Make' },
                    { key: 'Meter.Model', label: 'Model' },
                    { key: 'Asset.AssetKey', label: 'Asset' },
                    { key: 'Note.Note', label: 'Note' },
                ];
            case 'Group':
                return [
                    { key: 'Name', label: 'Name' },
                ];
        }
    }
    function getTableCollumns() {
        switch (props.type) {
            case 'Asset':
                return [
                    { key: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'VoltageKV', label: 'Voltage (kV)', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Locations', label: 'Substations', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Meter':
                return [
                    { key: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'MappedAssets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Make', label: 'Make', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Model', label: 'Model', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Group':
                return [
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Assets', label: 'Assets', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Meters', label: 'Meters', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Users', label: 'Users', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetGroups', label: 'SubGroups', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
        }
    }
    function getSelectedCollumn() {
        switch (props.type) {
            case 'Asset':
                return [
                    { key: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetName', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'AssetType', label: 'Asset Type', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Meter':
                return [
                    { key: 'AssetKey', label: 'Key', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: 'Location', label: 'Substation', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
            case 'Group':
                return [
                    { key: 'Name', label: 'Name', headerStyle: { width: 'auto' }, rowStyle: { width: 'auto' } },
                    { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                ];
        }
        return [];
    }
    function reset() {
        setSelectedData([]);
    }
    function getTitle() {
        switch (props.type) {
            case ('Asset'):
                return 'Add Transmission Assets';
            case ('Meter'):
                return 'Add Meters';
            case ('Group'):
                return 'Add Asset Groups';
        }
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: props.id },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '75%' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, getTitle()),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal", onClick: function (evt) { $('#' + props.id).hide(); reset(); } }, "\u00D7")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_ParameterSearch__WEBPACK_IMPORTED_MODULE_3__["default"], { Fields: getSearchField(), getData: function (searchFields) { return setSearch(searchFields); } }))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { width: '60%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__["default"], { cols: getTableCollumns(), tableClass: "table table-hover", data: data, sortField: sortFieldAll, ascending: ascendingAll, onSort: function (d) {
                                    if (d.col == sortFieldAll) {
                                        var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](data, [d.col], [(!ascendingAll ? "asc" : "desc")]);
                                        setAscendingAll(!ascendingAll);
                                        setData(ordered);
                                    }
                                    else {
                                        var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](data, [d.col], ["asc"]);
                                        setAscendingAll(!ascendingAll);
                                        setData(ordered);
                                        setSortFieldAll(d.col);
                                    }
                                }, onClick: function (d) { setSelectedData(function (l) { var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](l); updated.push(d.row); return updated; }); }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: '400px', width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { width: '40%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%' } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h3", null, " Selected Assets ")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_Table__WEBPACK_IMPORTED_MODULE_2__["default"], { cols: getSelectedCollumn(), tableClass: "table table-hover", data: selectedData, sortField: sortFieldSelected, ascending: ascendingSelected, onSort: function (d) {
                                    if (d.col == sortFieldSelected) {
                                        var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](selectedData, [d.col], [(!ascendingSelected ? "asc" : "desc")]);
                                        setAscendingSelected(!ascendingSelected);
                                        setSelectedData(ordered);
                                    }
                                    else {
                                        var ordered = lodash__WEBPACK_IMPORTED_MODULE_1__["orderBy"](selectedData, [d.col], ["asc"]);
                                        setAscendingSelected(!ascendingSelected);
                                        setSelectedData(ordered);
                                        setSortFieldSelected(d.col);
                                    }
                                }, onClick: function () { }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: '400px', width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function () { $('#' + props.id).hide(); reset(); setResult(selectedData.map(function (item) { return item[props.PrimaryKey]; })); } }, "Add"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal", onClick: function (evt) { $('#' + props.id).hide(); reset(); } }, "Close"))))));
}
function AddToGroupPopup(props) {
    function searchAsset(search) {
        return $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/Asset/SearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(search),
            cache: false,
            async: true
        });
    }
    function searchMeters(search) {
        return $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/Meter/SearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(search),
            cache: false,
            async: true
        });
    }
    function searchAssetGroups(search) {
        return $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/AssetGroup/SearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(search),
            cache: false,
            async: true
        });
    }
    if (props.type == 'Asset')
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](AddToAssetGroup, { id: 'AddAsset', type: 'Asset', PrimaryKey: 'ID', getData: searchAsset, onComplete: props.onComplete });
    if (props.type == 'Meter')
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](AddToAssetGroup, { id: 'AddMeter', type: 'Meter', PrimaryKey: 'ID', getData: searchMeters, onComplete: props.onComplete });
    if (props.type == 'Group')
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](AddToAssetGroup, { id: 'AddGroup', type: 'Group', PrimaryKey: 'ID', getData: searchAssetGroups, onComplete: props.onComplete });
}
/* harmony default export */ __webpack_exports__["default"] = (AddToGroupPopup);


/***/ }),

/***/ "./TSX/SystemCenter/CommonComponents/FormCheckBox.tsx":
/*!************************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/FormCheckBox.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  FormCheckBox.tsx - Gbtc
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


var FormCheckBox = /** @class */ (function (_super) {
    __extends(FormCheckBox, _super);
    function FormCheckBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormCheckBox.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-check" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "checkbox", className: "form-check-input", style: { zIndex: 1 }, onChange: function (evt) {
                    var record = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(_this.props.Record);
                    record[_this.props.Field] = evt.target.checked;
                    _this.props.Setter(record);
                }, value: this.props.Record[this.props.Field] ? 'on' : 'off', checked: this.props.Record[this.props.Field] ? true : false, disabled: this.props.Disabled == null ? false : this.props.Disabled }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: "form-check-label" }, this.props.Label == null ? this.props.Field : this.props.Label));
    };
    return FormCheckBox;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (FormCheckBox);


/***/ }),

/***/ "./TSX/SystemCenter/CommonComponents/FormInput.tsx":
/*!*********************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/FormInput.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  FormInput.tsx - Gbtc
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


var FormInput = /** @class */ (function (_super) {
    __extends(FormInput, _super);
    function FormInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormInput.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, this.props.Label == null ? this.props.Field : this.props.Label),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (this.props.Valid(this.props.Field) ? "form-control" : "form-control is-invalid"), onChange: function (evt) {
                    var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.Record);
                    if (evt.target.value != "")
                        record[_this.props.Field] = evt.target.value;
                    else
                        record[_this.props.Field] = null;
                    _this.props.Setter(record);
                }, value: this.props.Record[this.props.Field] == null ? '' : this.props.Record[this.props.Field].toString(), disabled: this.props.Disabled == null ? false : this.props.Disabled }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'invalid-feedback' }, this.props.Feedback == null ? this.props.Field + ' is a required field.' : this.props.Feedback));
    };
    return FormInput;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (FormInput);


/***/ }),

/***/ "./TSX/SystemCenter/CommonComponents/ParameterSearch.tsx":
/*!***************************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/ParameterSearch.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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
//******************************************************************************************************
//  ParameterSearch.tsx - Gbtc
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


function ParameterSearch(props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([{ Field: (props.defaultField != undefined ? props.defaultField : props.Fields[0].key), SearchText: '' }]), 2), search = _a[0], setSearch = _a[1];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("nav", { className: "navbar navbar-expand-lg navbar-light bg-light" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "collapse navbar-collapse", id: "navbarSupportedContent", style: { width: '100%' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "navbar-nav mr-auto", style: { width: '100%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item", style: { width: '60%', paddingRight: 10 } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "Search: "),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null, search.map(function (s, index, a) {
                            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "input-group", key: index, style: { border: '1px solid lightgray' } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "input-group-prepend" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', style: { height: '100%' }, value: s.Field, onChange: function (evt) {
                                            var array = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](a);
                                            s.Field = evt.target.value;
                                            setSearch(array);
                                        } }, props.Fields.map(function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: item.key, value: item.key }, item.label); }))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', type: 'text', placeholder: 'Search...', value: s.SearchText, onChange: function (evt) {
                                        s.SearchText = evt.target.value;
                                        var array = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](a);
                                        setSearch(array);
                                    }, onKeyDown: function (evt) {
                                        if (evt.keyCode == 13) {
                                            evt.preventDefault();
                                            props.getData(search);
                                        }
                                    } }),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "input-group-append" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger", type: "button", onClick: function (evt) {
                                            var array = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](a);
                                            array.splice(index, 1);
                                            setSearch(array);
                                        } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                        })))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item", style: { width: '40%', paddingRight: 10 } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("legend", { className: "w-auto", style: { fontSize: 'large' } }, "Search Params:"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("form", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function (event) {
                                        event.preventDefault();
                                        var array = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](search);
                                        array.push({ Field: (props.defaultField != undefined ? props.defaultField : props.Fields[0].key), SearchText: '' });
                                        setSearch(array);
                                    } }, "Add Parameter")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function (event) {
                                        event.preventDefault();
                                        props.getData(search);
                                    } }, "Update Search")))))))));
}
/* harmony default export */ __webpack_exports__["default"] = (ParameterSearch);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0R3JvdXBzL0FkZFRvR3JvdXAudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9Gb3JtQ2hlY2tCb3gudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9QYXJhbWV0ZXJTZWFyY2gudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9UYWJsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLHlCQUF5QjtBQUN6QixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsMkJBQTJCO0FBQzNCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUd6RTtBQUNIO0FBSWtCO0FBQ2lDO0FBSy9FLFNBQVMsZUFBZSxDQUFJLEtBQWdCO0lBQ2xDLHNFQUF3RCxFQUF2RCxjQUFNLEVBQUUsaUJBQStDLENBQUM7SUFDekQsc0VBQThDLEVBQTdDLFlBQUksRUFBRSxlQUF1QyxDQUFDO0lBRS9DLHNFQUE4RCxFQUE3RCxvQkFBWSxFQUFFLHVCQUErQyxDQUFDO0lBRS9ELDhFQUFvRSxFQUFuRSxvQkFBWSxFQUFFLHVCQUFx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ekIsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7WUFFckMsT0FBTyw0REFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUcsS0FBSyxDQUFNLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkJBQVcsR0FBWCxVQUFZLElBQTBDLEVBQUUsS0FBSztRQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDBCQUFVLEdBQVYsVUFBVyxJQUFJLEVBQUUsS0FBSztRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQ0EvRXFDLCtDQUFlLEdBK0VwRDs7QUFBQSxDQUFDIiwiZmlsZSI6IkFzc2V0R3JvdXB+QnlBc3NldEdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBBZGRUb0dyb3VwLnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDEwLzE0LzIwMjAgLSBDLiBMYWNrbmVyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgVGFibGUgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9UYWJsZSc7XG5pbXBvcnQgUGFyYW1ldGVyU2VhcmNoLCB7IElTZWFyY2ggfSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1BhcmFtZXRlclNlYXJjaCc7XG5cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5pbnRlcmZhY2UgSXByb3BzPFQ+IHsgaWQ6IHN0cmluZywgb25Db21wbGV0ZTogKGlkOiBBcnJheTxhbnk+KSA9PiBKUXVlcnlYSFIsIGdldERhdGE6IChzZWFyY2g6IEFycmF5PElTZWFyY2g+KSA9PiBKUXVlcnlYSFIsIHR5cGU6ICgnQXNzZXQnfCAnTWV0ZXInfCdHcm91cCcpLCBQcmltYXJ5S2V5OiBrZXlvZihUKSB9XG5cbmZ1bmN0aW9uIEFkZFRvQXNzZXRHcm91cDxUPihwcm9wczogSXByb3BzPFQ+KSB7XG4gICAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PElTZWFyY2g+PihbXSk7XG4gICAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8VD4+KFtdKTtcblxuICAgIGNvbnN0IFtzZWxlY3RlZERhdGEsIHNldFNlbGVjdGVkRGF0YV0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxUPj4oW10pO1xuXG4gICAgY29uc3QgW3NvcnRGaWVsZEFsbCwgc2V0U29ydEZpZWxkQWxsXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJ0Fzc2V0S2V5Jyk7XG4gICAgY29uc3QgW2FzY2VuZGluZ0FsbCwgc2V0QXNjZW5kaW5nQWxsXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuXG4gICAgY29uc3QgW3NvcnRGaWVsZFNlbGVjdGVkLCBzZXRTb3J0RmllbGRTZWxlY3RlZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCdBc3NldEtleScpO1xuICAgIGNvbnN0IFthc2NlbmRpbmdTZWxlY3RlZCwgc2V0QXNjZW5kaW5nU2VsZWN0ZWRdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgICBjb25zdCBbcmVzdWx0LCBzZXRSZXN1bHRdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8YW55Pj4oW10pO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7IH1cbiAgICAgICAgbGV0IGhhbmRsZSA9IHByb3BzLm9uQ29tcGxldGUocmVzdWx0KTtcbiAgICAgICAgaGFuZGxlLmRvbmUoZCA9PiBzZXRSZXN1bHQoW10pKVxuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlICE9IHVuZGVmaW5lZCAmJiBoYW5kbGUuYWJvcnQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWJvcnQoKTtcbiAgICAgICAgfSBcblxuICAgIH0sIFtyZXN1bHRdKVxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGxldCBoYW5kbGUgPSBwcm9wcy5nZXREYXRhKHNlYXJjaCk7XG4gICAgICAgIGhhbmRsZS5kb25lKGQgPT4gc2V0RGF0YShkKSApXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlICE9IHVuZGVmaW5lZCAmJiBoYW5kbGUuYWJvcnQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH0sIFtzZWFyY2hdKTtcblxuICAgIGZ1bmN0aW9uIGdldFNlYXJjaEZpZWxkKCkge1xuICAgICAgICBzd2l0Y2ggKHByb3BzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2V0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0LkFzc2V0S2V5JywgbGFiZWw6ICdLZXknIH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXQuQXNzZXROYW1lJywgbGFiZWw6ICdOYW1lJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0VHlwZS5OYW1lJywgbGFiZWw6ICdBc3NldFR5cGUnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXQuVm9sdGFnZUtWJywgbGFiZWw6ICdWb2x0YWdlS1YnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWV0ZXIuQXNzZXRLZXknLCBsYWJlbDogJ01ldGVyJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xvY2F0aW9uLkxvY2F0aW9uS2V5JywgbGFiZWw6ICdMb2NhdGlvbicgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOb3RlLk5vdGUnLCBsYWJlbDogJ05vdGUnIH0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGNhc2UgJ01ldGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01ldGVyLkFzc2V0S2V5JywgbGFiZWw6ICdLZXknIH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWV0ZXIuTmFtZScsIGxhYmVsOiAnTmFtZScgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNZXRlci5Mb2NhdGlvbicsIGxhYmVsOiAnTG9jYXRpb24nIH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWV0ZXIuTWFrZScsIGxhYmVsOiAnTWFrZScgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNZXRlci5Nb2RlbCcsIGxhYmVsOiAnTW9kZWwnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXQuQXNzZXRLZXknLCBsYWJlbDogJ0Fzc2V0JyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05vdGUuTm90ZScsIGxhYmVsOiAnTm90ZScgfSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgY2FzZSAnR3JvdXAnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScsIGxhYmVsOiAnTmFtZScgfSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGFibGVDb2xsdW1ucygpIHtcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdBc3NldCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldEtleScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXROYW1lJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRUeXBlJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnQXNzZXQgVHlwZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnVm9sdGFnZUtWJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnVm9sdGFnZSAoa1YpJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNZXRlcnMnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdNZXRlcnMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xvY2F0aW9ucycgYXMga2V5b2YgKFQpLCBsYWJlbDogJ1N1YnN0YXRpb25zJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgY2FzZSAnTWV0ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRLZXknIGFzIGtleW9mIChUKSwgbGFiZWw6ICdLZXknLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05hbWUnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdMb2NhdGlvbicgYXMga2V5b2YgKFQpLCBsYWJlbDogJ1N1YnN0YXRpb24nLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01hcHBlZEFzc2V0cycgYXMga2V5b2YgKFQpLCBsYWJlbDogJ0Fzc2V0cycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWFrZScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ01ha2UnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01vZGVsJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTW9kZWwnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogMTcsIHBhZGRpbmc6IDAgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDAsIHBhZGRpbmc6IDAgfSB9LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICBjYXNlICdHcm91cCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRzJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnQXNzZXRzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNZXRlcnMnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdNZXRlcnMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ1VzZXJzJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnVXNlcnMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0R3JvdXBzJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnU3ViR3JvdXBzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkQ29sbHVtbigpIHtcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdBc3NldCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldEtleScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXROYW1lJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRUeXBlJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnQXNzZXQgVHlwZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAxNywgcGFkZGluZzogMCB9LCByb3dTdHlsZTogeyB3aWR0aDogMCwgcGFkZGluZzogMCB9IH0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGNhc2UgJ01ldGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0S2V5JyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnS2V5JywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTG9jYXRpb24nIGFzIGtleW9mIChUKSwgbGFiZWw6ICdTdWJzdGF0aW9uJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgY2FzZSAnR3JvdXAnOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgICAgICB7IGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogMTcsIHBhZGRpbmc6IDAgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDAsIHBhZGRpbmc6IDAgfSB9LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFxuICAgICAgICBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIHNldFNlbGVjdGVkRGF0YShbXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUoKSB7XG4gICAgICAgIHN3aXRjaCAocHJvcHMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAoJ0Fzc2V0Jyk6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdBZGQgVHJhbnNtaXNzaW9uIEFzc2V0cydcbiAgICAgICAgICAgIGNhc2UgKCdNZXRlcicpOlxuICAgICAgICAgICAgICAgIHJldHVybiAnQWRkIE1ldGVycydcbiAgICAgICAgICAgIGNhc2UgKCdHcm91cCcpOlxuICAgICAgICAgICAgICAgIHJldHVybiAnQWRkIEFzc2V0IEdyb3VwcydcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD17cHJvcHMuaWR9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHN0eWxlPXt7IG1heFdpZHRoOiAnMTAwJScsIHdpZHRoOiAnNzUlJyB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPntnZXRUaXRsZSgpfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiB7ICQoJyMnICsgcHJvcHMuaWQpLmhpZGUoKTsgcmVzZXQoKTsgfX0+JnRpbWVzOzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGFyYW1ldGVyU2VhcmNoIEZpZWxkcz17Z2V0U2VhcmNoRmllbGQoKX0gZ2V0RGF0YT17KHNlYXJjaEZpZWxkcykgPT4gc2V0U2VhcmNoKHNlYXJjaEZpZWxkcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIHN0eWxlPXt7IHdpZHRoOiAnNjAlJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17Z2V0VGFibGVDb2xsdW1ucygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0RmllbGQ9e3NvcnRGaWVsZEFsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNjZW5kaW5nPXthc2NlbmRpbmdBbGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGRBbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JkZXJlZCA9IF8ub3JkZXJCeShkYXRhLCBbZC5jb2xdLCBbKCFhc2NlbmRpbmdBbGwgPyBcImFzY1wiIDogXCJkZXNjXCIpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nQWxsKCFhc2NlbmRpbmdBbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldERhdGEob3JkZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JkZXJlZCA9IF8ub3JkZXJCeShkYXRhLCBbZC5jb2xdLCBbXCJhc2NcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZ0FsbCghYXNjZW5kaW5nQWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXREYXRhKG9yZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNvcnRGaWVsZEFsbChkLmNvbCBhcyBzdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZCkgPT4geyBzZXRTZWxlY3RlZERhdGEoKGwpID0+IHsgbGV0IHVwZGF0ZWQgPSBfLmNsb25lRGVlcChsKTsgdXBkYXRlZC5wdXNoKGQucm93KTsgcmV0dXJuIHVwZGF0ZWQ7IH0pIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6ICc0MDBweCcsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93U3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eyhpdGVtKSA9PiBmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIHN0eWxlPXt7IHdpZHRoOiAnNDAlJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz4gU2VsZWN0ZWQgQXNzZXRzIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHM9e2dldFNlbGVjdGVkQ29sbHVtbigpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtzZWxlY3RlZERhdGF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkU2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZz17YXNjZW5kaW5nU2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmNvbCA9PSBzb3J0RmllbGRTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmRlcmVkID0gXy5vcmRlckJ5KHNlbGVjdGVkRGF0YSwgW2QuY29sXSwgWyghYXNjZW5kaW5nU2VsZWN0ZWQgPyBcImFzY1wiIDogXCJkZXNjXCIpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nU2VsZWN0ZWQoIWFzY2VuZGluZ1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZERhdGEob3JkZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JkZXJlZCA9IF8ub3JkZXJCeShzZWxlY3RlZERhdGEsIFtkLmNvbF0sIFtcImFzY1wiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nU2VsZWN0ZWQoIWFzY2VuZGluZ1NlbGVjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZERhdGEob3JkZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkU2VsZWN0ZWQoZC5jb2wgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVhZFN0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5U3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgb3ZlcmZsb3dZOiAnc2Nyb2xsJywgbWF4SGVpZ2h0OiAnNDAwcHgnLCB3aWR0aDogJzEwMCUnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd1N0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoaXRlbSkgPT4gZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eygpID0+IHsgJCgnIycgKyBwcm9wcy5pZCkuaGlkZSgpOyByZXNldCgpOyBzZXRSZXN1bHQoc2VsZWN0ZWREYXRhLm1hcChpdGVtID0+IGl0ZW1bcHJvcHMuUHJpbWFyeUtleV0pKSB9fT5BZGQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHsgJCgnIycgKyBwcm9wcy5pZCkuaGlkZSgpOyByZXNldCgpOyB9fT5DbG9zZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KVxuXG59XG5cbmludGVyZmFjZSBJVHJhbnNtaXNzaW9uQXNzZXQge1xuICAgIElEOiBudW1iZXIsIEFzc2V0S2V5OiBzdHJpbmcsIEFzc2V0TmFtZTogc3RyaW5nLCBBc3NldFR5cGU6IHN0cmluZywgVm9sdGFnZUtWOiBudW1iZXIsIE1ldGVyczogbnVtYmVyLCBMb2NhdGlvbnM6IHN0cmluZ1xufVxuaW50ZXJmYWNlIElNZXRlciB7XG4gICAgSUQ6IG51bWJlciwgQXNzZXRLZXk6IHN0cmluZywgTmFtZTogc3RyaW5nLCBMb2NhdGlvbjogc3RyaW5nLCBNYXBwZWRBc3NldHM6IG51bWJlciwgTWFrZTogc3RyaW5nLCBNb2RlbDogc3RyaW5nXG59XG5cblxuZnVuY3Rpb24gQWRkVG9Hcm91cFBvcHVwKHByb3BzOiB7IG9uQ29tcGxldGU6IChpZDogQXJyYXk8YW55PikgPT4gSlF1ZXJ5WEhSLCB0eXBlOiAoJ0Fzc2V0JyB8ICdNZXRlcicgfCAnR3JvdXAnKSB9KSB7XG5cbiAgICBmdW5jdGlvbiBzZWFyY2hBc3NldChzZWFyY2gpOiBKUXVlcnlYSFIge1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zdFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC9TZWFyY2hhYmxlTGlzdGAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoc2VhcmNoKSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlYXJjaE1ldGVycyhzZWFyY2gpOiBKUXVlcnlYSFIge1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zdFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlci9TZWFyY2hhYmxlTGlzdGAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoc2VhcmNoKSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlYXJjaEFzc2V0R3JvdXBzKHNlYXJjaCk6IEpRdWVyeVhIUiB7XG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJQb3N0XCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0R3JvdXAvU2VhcmNoYWJsZUxpc3RgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHNlYXJjaCksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocHJvcHMudHlwZSA9PSAnQXNzZXQnKVxuICAgICAgICByZXR1cm4gPEFkZFRvQXNzZXRHcm91cDxJVHJhbnNtaXNzaW9uQXNzZXQ+IGlkPSdBZGRBc3NldCcgdHlwZT0nQXNzZXQnIFByaW1hcnlLZXk9J0lEJyBnZXREYXRhPXtzZWFyY2hBc3NldH0gb25Db21wbGV0ZT17cHJvcHMub25Db21wbGV0ZX0gLz5cbiAgICBpZiAocHJvcHMudHlwZSA9PSAnTWV0ZXInKVxuICAgICAgICByZXR1cm4gPEFkZFRvQXNzZXRHcm91cDxJTWV0ZXI+IGlkPSdBZGRNZXRlcicgdHlwZT0nTWV0ZXInIFByaW1hcnlLZXk9J0lEJyBnZXREYXRhPXtzZWFyY2hNZXRlcnN9IG9uQ29tcGxldGU9e3Byb3BzLm9uQ29tcGxldGV9IC8+XG4gICAgaWYgKHByb3BzLnR5cGUgPT0gJ0dyb3VwJylcbiAgICAgICAgcmV0dXJuIDxBZGRUb0Fzc2V0R3JvdXA8SU1ldGVyPiBpZD0nQWRkR3JvdXAnIHR5cGU9J0dyb3VwJyBQcmltYXJ5S2V5PSdJRCcgZ2V0RGF0YT17c2VhcmNoQXNzZXRHcm91cHN9IG9uQ29tcGxldGU9e3Byb3BzLm9uQ29tcGxldGV9IC8+XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQWRkVG9Hcm91cFBvcHVwOyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgRm9ybUNoZWNrQm94LnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzIyLzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1DaGVja0JveDxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogVCwgRmllbGQ6IGtleW9mIChUKSwgU2V0dGVyOiAocmVjb3JkOiBUKSA9PiB2b2lkLCBMYWJlbD86IHN0cmluZywgRGlzYWJsZWQ/OiBib29sZWFuIH0sIHt9LCB7fT57XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWNoZWNrXCI+XG5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJmb3JtLWNoZWNrLWlucHV0XCIgc3R5bGU9e3sgekluZGV4OiAxIH19IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZDogVCA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xuICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQuY2hlY2tlZCBhcyBhbnk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlNldHRlcihyZWNvcmQpO1xuICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID8gJ29uJyA6ICdvZmYnfSBjaGVja2VkPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA/IHRydWUgOiBmYWxzZX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZH0gLz5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWNoZWNrLWxhYmVsXCIgPnt0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbH08L2xhYmVsPlxuXG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59XG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIEZvcm1JbnB1dC50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1JbnB1dDxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogVCwgRmllbGQ6IGtleW9mIChUKSwgU2V0dGVyOiAocmVjb3JkOiBUKSA9PiB2b2lkLCBWYWxpZDogKGZpZWxkOiBrZXlvZiAoVCkpID0+IGJvb2xlYW4sIExhYmVsPzogc3RyaW5nLCBGZWVkYmFjaz86IHN0cmluZywgRGlzYWJsZWQ/OiBib29sZWFuIH0sIHt9LCB7fT57XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWw+e3RoaXMucHJvcHMuTGFiZWwgPT0gbnVsbCA/IHRoaXMucHJvcHMuRmllbGQgOiB0aGlzLnByb3BzLkxhYmVsfTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXsodGhpcy5wcm9wcy5WYWxpZCh0aGlzLnByb3BzLkZpZWxkKSA/IFwiZm9ybS1jb250cm9sXCIgOiBcImZvcm0tY29udHJvbCBpcy1pbnZhbGlkXCIpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmQ6IFQgPSBfLmNsb25lKHRoaXMucHJvcHMuUmVjb3JkKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPSBcIlwiKVxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LnZhbHVlIGFzIGFueTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlNldHRlcihyZWNvcmQpO1xuICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID09IG51bGwgPyAnJyA6IHRoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdLnRvU3RyaW5nKCl9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWQgfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ludmFsaWQtZmVlZGJhY2snPnt0aGlzLnByb3BzLkZlZWRiYWNrID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkICsgJyBpcyBhIHJlcXVpcmVkIGZpZWxkLicgOiB0aGlzLnByb3BzLkZlZWRiYWNrfTwvZGl2PlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxufVxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBQYXJhbWV0ZXJTZWFyY2gudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMTAvMTUvMjAyMCAtIEMuIExhY2tuZXJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlYXJjaCB7IEZpZWxkOiBzdHJpbmcsIFNlYXJjaFRleHQ6IHN0cmluZyB9XG5pbnRlcmZhY2UgSVByb3BzIHsgZ2V0RGF0YTogKHNlcmFjaERhdGE6IEFycmF5PElTZWFyY2g+KSA9PiB2b2lkLCBGaWVsZHM6IEFycmF5PHsga2V5OiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcgfT4sIGRlZmF1bHRGaWVsZD86IHN0cmluZyB9XG5cbmZ1bmN0aW9uIFBhcmFtZXRlclNlYXJjaChwcm9wczogSVByb3BzKSB7XG4gICAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PElTZWFyY2g+PihbeyBGaWVsZDogKHByb3BzLmRlZmF1bHRGaWVsZCAhPSB1bmRlZmluZWQgPyBwcm9wcy5kZWZhdWx0RmllbGQgOiBwcm9wcy5GaWVsZHNbMF0ua2V5KSwgU2VhcmNoVGV4dDogJycgfV0pO1xuXG5cbiAgICByZXR1cm4gKDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1leHBhbmQtbGcgbmF2YmFyLWxpZ2h0IGJnLWxpZ2h0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIgaWQ9XCJuYXZiYXJTdXBwb3J0ZWRDb250ZW50XCIgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJyB9fT5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXZiYXItbmF2IG1yLWF1dG9cIiBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19PlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiIHN0eWxlPXt7IHdpZHRoOiAnNjAlJywgcGFkZGluZ1JpZ2h0OiAxMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0IGNsYXNzTmFtZT1cImJvcmRlclwiIHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4JywgaGVpZ2h0OiAnMTAwJScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGVnZW5kIGNsYXNzTmFtZT1cInctYXV0b1wiIHN0eWxlPXt7IGZvbnRTaXplOiAnbGFyZ2UnIH19PlNlYXJjaDogPC9sZWdlbmQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaC5tYXAoKHMsIGluZGV4LCBhKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiIGtleT17aW5kZXh9IHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCBsaWdodGdyYXknIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHN0eWxlPXt7IGhlaWdodDogJzEwMCUnIH19IHZhbHVlPXtzLkZpZWxkIGFzIHN0cmluZ30gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBfLmNsb25lKGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuRmllbGQgPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlYXJjaChhcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuRmllbGRzLm1hcChpdGVtID0+IDxvcHRpb24ga2V5PXtpdGVtLmtleX0gdmFsdWU9e2l0ZW0ua2V5fT57aXRlbS5sYWJlbH08L29wdGlvbj4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHR5cGU9J3RleHQnIHBsYWNlaG9sZGVyPSdTZWFyY2guLi4nIHZhbHVlPXtzLlNlYXJjaFRleHR9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuU2VhcmNoVGV4dCA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBfLmNsb25lKGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoKGFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gb25LZXlEb3duPXtldnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuZ2V0RGF0YShzZWFyY2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gXy5jbG9uZShhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlYXJjaChhcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCIgc3R5bGU9e3sgd2lkdGg6ICc0MCUnLCBwYWRkaW5nUmlnaHQ6IDEwIH19PlxuICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPVwiYm9yZGVyXCIgc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnLCBoZWlnaHQ6ICcxMDAlJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsZWdlbmQgY2xhc3NOYW1lPVwidy1hdXRvXCIgc3R5bGU9e3sgZm9udFNpemU6ICdsYXJnZScgfX0+U2VhcmNoIFBhcmFtczo8L2xlZ2VuZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyhldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudCwgTW91c2VFdmVudD4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBfLmNsb25lKHNlYXJjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHsgRmllbGQ6IChwcm9wcy5kZWZhdWx0RmllbGQgIT0gdW5kZWZpbmVkID8gcHJvcHMuZGVmYXVsdEZpZWxkIDogcHJvcHMuRmllbGRzWzBdLmtleSksIFNlYXJjaFRleHQ6ICcnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoKGFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+QWRkIFBhcmFtZXRlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyhldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudCwgTW91c2VFdmVudD4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5nZXREYXRhKHNlYXJjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlVwZGF0ZSBTZWFyY2g8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uYXY+KVxufSBcblxuZXhwb3J0IGRlZmF1bHQgUGFyYW1ldGVyU2VhcmNoOyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgVGFibGUudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAxOCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDgvMDIvMjAxOCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBBbmdsZUljb246IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PHsgYXNjZW5kaW5nOiBib29sZWFuIH0+ID0gKHByb3BzKSA9PiA8c3BhbiBzdHlsZT17eyB3aWR0aDogMTAsIGhlaWdodDogMTAsIG1hcmdpbjogMyB9fSBjbGFzc05hbWU9e1wiZmEgZmEtYW5nbGUtXCIgKyAocHJvcHMuYXNjZW5kaW5nID8gJ3VwJyA6ICdkb3duJyl9Pjwvc3Bhbj5cblxuZXhwb3J0IGludGVyZmFjZSBUYWJsZVByb3BzPFQ+IHtcbiAgICBjb2xzOiBBcnJheTx7IGtleToga2V5b2YoVCkgfCBudWxsLCBsYWJlbDogc3RyaW5nLCBoZWFkZXJTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsIHJvd1N0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcywgY29udGVudD8oaXRlbTogVCwga2V5OiBrZXlvZihUKSwgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMpOiBSZWFjdC5SZWFjdE5vZGUgfT4sXG4gICAgZGF0YTogQXJyYXk8VD4sXG4gICAgb25DbGljazogKGRhdGE6IHsgY29sOiBrZXlvZiAoVCksIHJvdzogVCwgZGF0YTogVFtrZXlvZihUKV0gfSwgZXZlbnQ6IGFueSkgPT4gdm9pZCxcbiAgICBzb3J0RmllbGQ6IHN0cmluZyxcbiAgICBhc2NlbmRpbmc6IGJvb2xlYW4sXG4gICAgb25Tb3J0KGRhdGE6IHsgY29sOiBrZXlvZiAoVCksIGFzZW5kaW5nOiBib29sZWFufSk6IHZvaWQsXG4gICAgdGFibGVDbGFzcz86IHN0cmluZyxcbiAgICB0YWJsZVN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcyxcbiAgICB0aGVhZFN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcyxcbiAgICB0aGVhZENsYXNzPzogc3RyaW5nLFxuICAgIHRib2R5U3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxuICAgIHRib2R5Q2xhc3M/OiBzdHJpbmcsXG4gICAgc2VsZWN0ZWQ/KGRhdGE6IFQpOiBib29sZWFuLFxuICAgIHJvd1N0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGU8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8VGFibGVQcm9wczxUPiwge30+IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgcm93Q29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVSb3dzKCk7XG4gICAgICAgIHZhciBoZWFkZXJDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZUhlYWRlcnMoKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9eyh0aGlzLnByb3BzLnRhYmxlQ2xhc3MgIT0gdW5kZWZpbmVkID8gdGhpcy5wcm9wcy50YWJsZUNsYXNzIDogJycpfSBzdHlsZT17dGhpcy5wcm9wcy50YWJsZVN0eWxlfT5cbiAgICAgICAgICAgICAgICA8dGhlYWQgc3R5bGU9e3RoaXMucHJvcHMudGhlYWRTdHlsZX0+e2hlYWRlckNvbXBvbmVudHN9PC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHkgc3R5bGU9e3RoaXMucHJvcHMudGJvZHlTdHlsZX0+e3Jvd0NvbXBvbmVudHN9PC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVIZWFkZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xzLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICB2YXIgY2VsbHMgPSB0aGlzLnByb3BzLmNvbHMubWFwKChjb2xEYXRhLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdmFyIHN0eWxlO1xuICAgICAgICAgICAgaWYgKGNvbERhdGEuaGVhZGVyU3R5bGUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBjb2xEYXRhLmhlYWRlclN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0eWxlID0ge307XG5cbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICAgICAgcmV0dXJuIDx0aCBrZXk9e2luZGV4fSBzdHlsZT17c3R5bGV9IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZVNvcnQoeyBjb2w6IGNvbERhdGEua2V5LCBhc2NlbmRpbmc6IHRoaXMucHJvcHMuYXNjZW5kaW5nIH0sIGUpfT57Y29sRGF0YS5sYWJlbH17KHRoaXMucHJvcHMuc29ydEZpZWxkID09IGNvbERhdGEua2V5ID8gPEFuZ2xlSWNvbiBhc2NlbmRpbmc9e3RoaXMucHJvcHMuYXNjZW5kaW5nfSAvPiA6IG51bGwpfTwvdGg+XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiA8dHI+e2NlbGxzfTwvdHI+O1xuICAgIH1cblxuICAgIGdlbmVyYXRlUm93cygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICB2YXIgY2VsbHMgPSB0aGlzLnByb3BzLmNvbHMubWFwKGNvbERhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IF8uY2xvbmUoY29sRGF0YS5yb3dTdHlsZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDx0ZFxuICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4LnRvU3RyaW5nKCkgKyBpdGVtW2NvbERhdGEua2V5XSArIGNvbERhdGEua2V5fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCB7IGNvbDogY29sRGF0YS5rZXksIHJvdzogaXRlbSwgZGF0YTogaXRlbVtjb2xEYXRhLmtleV0gfSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7Y29sRGF0YS5jb250ZW50ICE9IHVuZGVmaW5lZCA/IGNvbERhdGEuY29udGVudChpdGVtLCBjb2xEYXRhLmtleSwgc3R5bGUpIDogaXRlbVtjb2xEYXRhLmtleV19XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgc3R5bGU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnJvd1N0eWxlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gXy5jbG9uZSh0aGlzLnByb3BzLnJvd1N0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xuXG4gICAgICAgICAgICBpZiAoc3R5bGUuY3Vyc29yID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkKGl0ZW0pKVxuICAgICAgICAgICAgICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuXG4gICAgICAgICAgICByZXR1cm4gPHRyIHN0eWxlPXtzdHlsZX0ga2V5PXtpbmRleC50b1N0cmluZygpfT57Y2VsbHN9PC90cj47XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGRhdGE6IHsgY29sOiBrZXlvZihUKSwgcm93OiBULCBkYXRhOiBhbnkgfSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGRhdGEsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBoYW5kbGVTb3J0KGRhdGEsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25Tb3J0KGRhdGEpO1xuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9