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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0R3JvdXBzL0FkZFRvR3JvdXAudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9Gb3JtQ2hlY2tCb3gudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9QYXJhbWV0ZXJTZWFyY2gudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQ29tbW9uQ29tcG9uZW50cy9UYWJsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLHlCQUF5QjtBQUN6QixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsMkJBQTJCO0FBQzNCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7OztBQUd6RTtBQUNIO0FBSWtCO0FBQ2lDO0FBSy9FLFNBQVMsZUFBZSxDQUFJLEtBQWdCO0lBQ2xDLHNFQUF3RCxFQUF2RCxjQUFNLEVBQUUsaUJBQStDLENBQUM7SUFDekQsc0VBQThDLEVBQTdDLFlBQUksRUFBRSxlQUF1QyxDQUFDO0lBRS9DLHNFQUE4RCxFQUE3RCxvQkFBWSxFQUFFLHVCQUErQyxDQUFDO0lBRS9ELDhFQUFvRSxFQUFuRSxvQkFBWSxFQUFFLHVCQUFx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ekIsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7WUFFckMsT0FBTyw0REFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUcsS0FBSyxDQUFNLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkJBQVcsR0FBWCxVQUFZLElBQTBDLEVBQUUsS0FBSztRQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDBCQUFVLEdBQVYsVUFBVyxJQUFJLEVBQUUsS0FBSztRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQ0EvRXFDLCtDQUFlLEdBK0VwRDs7QUFBQSxDQUFDIiwiZmlsZSI6IkFzc2V0R3JvdXB+QnlBc3NldEdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFkZFRvR3JvdXAudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDEwLzE0LzIwMjAgLSBDLiBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgdXNlSGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IFRhYmxlIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvVGFibGUnO1xyXG5pbXBvcnQgUGFyYW1ldGVyU2VhcmNoLCB7IElTZWFyY2ggfSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL1BhcmFtZXRlclNlYXJjaCc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5pbnRlcmZhY2UgSXByb3BzPFQ+IHsgaWQ6IHN0cmluZywgb25Db21wbGV0ZTogKGlkOiBBcnJheTxhbnk+KSA9PiBKUXVlcnlYSFIsIGdldERhdGE6IChzZWFyY2g6IEFycmF5PElTZWFyY2g+KSA9PiBKUXVlcnlYSFIsIHR5cGU6ICgnQXNzZXQnfCAnTWV0ZXInfCdHcm91cCcpLCBQcmltYXJ5S2V5OiBrZXlvZihUKSB9XHJcblxyXG5mdW5jdGlvbiBBZGRUb0Fzc2V0R3JvdXA8VD4ocHJvcHM6IElwcm9wczxUPikge1xyXG4gICAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PElTZWFyY2g+PihbXSk7XHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxUPj4oW10pO1xyXG5cclxuICAgIGNvbnN0IFtzZWxlY3RlZERhdGEsIHNldFNlbGVjdGVkRGF0YV0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxUPj4oW10pO1xyXG5cclxuICAgIGNvbnN0IFtzb3J0RmllbGRBbGwsIHNldFNvcnRGaWVsZEFsbF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCdBc3NldEtleScpO1xyXG4gICAgY29uc3QgW2FzY2VuZGluZ0FsbCwgc2V0QXNjZW5kaW5nQWxsXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xyXG5cclxuICAgIGNvbnN0IFtzb3J0RmllbGRTZWxlY3RlZCwgc2V0U29ydEZpZWxkU2VsZWN0ZWRdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignQXNzZXRLZXknKTtcclxuICAgIGNvbnN0IFthc2NlbmRpbmdTZWxlY3RlZCwgc2V0QXNjZW5kaW5nU2VsZWN0ZWRdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XHJcblxyXG4gICAgY29uc3QgW3Jlc3VsdCwgc2V0UmVzdWx0XSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PGFueT4+KFtdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7IH1cclxuICAgICAgICBsZXQgaGFuZGxlID0gcHJvcHMub25Db21wbGV0ZShyZXN1bHQpO1xyXG4gICAgICAgIGhhbmRsZS5kb25lKGQgPT4gc2V0UmVzdWx0KFtdKSlcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZSAhPSB1bmRlZmluZWQgJiYgaGFuZGxlLmFib3J0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICB9IFxyXG5cclxuICAgIH0sIFtyZXN1bHRdKVxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gcHJvcHMuZ2V0RGF0YShzZWFyY2gpO1xyXG4gICAgICAgIGhhbmRsZS5kb25lKGQgPT4gc2V0RGF0YShkKSApXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZSAhPSB1bmRlZmluZWQgJiYgaGFuZGxlLmFib3J0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbc2VhcmNoXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2VhcmNoRmllbGQoKSB7XHJcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2V0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldC5Bc3NldEtleScsIGxhYmVsOiAnS2V5JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXQuQXNzZXROYW1lJywgbGFiZWw6ICdOYW1lJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRUeXBlLk5hbWUnLCBsYWJlbDogJ0Fzc2V0VHlwZScgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0LlZvbHRhZ2VLVicsIGxhYmVsOiAnVm9sdGFnZUtWJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWV0ZXIuQXNzZXRLZXknLCBsYWJlbDogJ01ldGVyJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTG9jYXRpb24uTG9jYXRpb25LZXknLCBsYWJlbDogJ0xvY2F0aW9uJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTm90ZS5Ob3RlJywgbGFiZWw6ICdOb3RlJyB9LFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgY2FzZSAnTWV0ZXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01ldGVyLkFzc2V0S2V5JywgbGFiZWw6ICdLZXknIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNZXRlci5OYW1lJywgbGFiZWw6ICdOYW1lJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWV0ZXIuTG9jYXRpb24nLCBsYWJlbDogJ0xvY2F0aW9uJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWV0ZXIuTWFrZScsIGxhYmVsOiAnTWFrZScgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ01ldGVyLk1vZGVsJywgbGFiZWw6ICdNb2RlbCcgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0LkFzc2V0S2V5JywgbGFiZWw6ICdBc3NldCcgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05vdGUuTm90ZScsIGxhYmVsOiAnTm90ZScgfSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGNhc2UgJ0dyb3VwJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJywgbGFiZWw6ICdOYW1lJyB9LFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGFibGVDb2xsdW1ucygpIHtcclxuICAgICAgICBzd2l0Y2ggKHByb3BzLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnQXNzZXQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0S2V5JyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnS2V5JywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0TmFtZScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRUeXBlJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnQXNzZXQgVHlwZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdWb2x0YWdlS1YnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdWb2x0YWdlIChrViknLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWV0ZXJzJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTWV0ZXJzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xvY2F0aW9ucycgYXMga2V5b2YgKFQpLCBsYWJlbDogJ1N1YnN0YXRpb25zJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogMTcsIHBhZGRpbmc6IDAgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDAsIHBhZGRpbmc6IDAgfSB9LFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgY2FzZSAnTWV0ZXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0S2V5JyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnS2V5JywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05hbWUnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0xvY2F0aW9uJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnU3Vic3RhdGlvbicsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNYXBwZWRBc3NldHMnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdBc3NldHMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWFrZScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ01ha2UnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTW9kZWwnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdNb2RlbCcsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGNhc2UgJ0dyb3VwJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdOYW1lJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTmFtZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldHMnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdBc3NldHMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTWV0ZXJzJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnTWV0ZXJzJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ1VzZXJzJyBhcyBrZXlvZiAoVCksIGxhYmVsOiAnVXNlcnMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRHcm91cHMnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdTdWJHcm91cHMnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAxNywgcGFkZGluZzogMCB9LCByb3dTdHlsZTogeyB3aWR0aDogMCwgcGFkZGluZzogMCB9IH0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZENvbGx1bW4oKSB7XHJcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fzc2V0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldEtleScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ0tleScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBc3NldE5hbWUnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ0Fzc2V0VHlwZScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ0Fzc2V0IFR5cGUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiBudWxsLCBsYWJlbDogJycsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAxNywgcGFkZGluZzogMCB9LCByb3dTdHlsZTogeyB3aWR0aDogMCwgcGFkZGluZzogMCB9IH0sXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBjYXNlICdNZXRlcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnQXNzZXRLZXknIGFzIGtleW9mIChUKSwgbGFiZWw6ICdLZXknLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScgYXMga2V5b2YgKFQpLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnYXV0bycgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTG9jYXRpb24nIGFzIGtleW9mIChUKSwgbGFiZWw6ICdTdWJzdGF0aW9uJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogMTcsIHBhZGRpbmc6IDAgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDAsIHBhZGRpbmc6IDAgfSB9LFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgY2FzZSAnR3JvdXAnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogJ05hbWUnIGFzIGtleW9mIChUKSwgbGFiZWw6ICdOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICdhdXRvJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJ2F1dG8nIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGtleTogbnVsbCwgbGFiZWw6ICcnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogMTcsIHBhZGRpbmc6IDAgfSwgcm93U3R5bGU6IHsgd2lkdGg6IDAsIHBhZGRpbmc6IDAgfSB9LFxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgICAgIHNldFNlbGVjdGVkRGF0YShbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUoKSB7XHJcbiAgICAgICAgc3dpdGNoIChwcm9wcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgKCdBc3NldCcpOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdBZGQgVHJhbnNtaXNzaW9uIEFzc2V0cydcclxuICAgICAgICAgICAgY2FzZSAoJ01ldGVyJyk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0FkZCBNZXRlcnMnXHJcbiAgICAgICAgICAgIGNhc2UgKCdHcm91cCcpOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdBZGQgQXNzZXQgR3JvdXBzJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD17cHJvcHMuaWR9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgc3R5bGU9e3sgbWF4V2lkdGg6ICcxMDAlJywgd2lkdGg6ICc3NSUnIH19PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e2dldFRpdGxlKCl9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4geyAkKCcjJyArIHByb3BzLmlkKS5oaWRlKCk7IHJlc2V0KCk7IH19PiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQYXJhbWV0ZXJTZWFyY2ggRmllbGRzPXtnZXRTZWFyY2hGaWVsZCgpfSBnZXREYXRhPXsoc2VhcmNoRmllbGRzKSA9PiBzZXRTZWFyY2goc2VhcmNoRmllbGRzKX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiBzdHlsZT17eyB3aWR0aDogJzYwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPXtnZXRUYWJsZUNvbGx1bW5zKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17c29ydEZpZWxkQWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZz17YXNjZW5kaW5nQWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZEFsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9yZGVyZWQgPSBfLm9yZGVyQnkoZGF0YSwgW2QuY29sXSwgWyghYXNjZW5kaW5nQWxsID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nQWxsKCFhc2NlbmRpbmdBbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RGF0YShvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmRlcmVkID0gXy5vcmRlckJ5KGRhdGEsIFtkLmNvbF0sIFtcImFzY1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmdBbGwoIWFzY2VuZGluZ0FsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXREYXRhKG9yZGVyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U29ydEZpZWxkQWxsKGQuY29sIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhkKSA9PiB7IHNldFNlbGVjdGVkRGF0YSgobCkgPT4geyBsZXQgdXBkYXRlZCA9IF8uY2xvbmVEZWVwKGwpOyB1cGRhdGVkLnB1c2goZC5yb3cpOyByZXR1cm4gdXBkYXRlZDsgfSkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVhZFN0eWxlPXt7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHlTdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBvdmVyZmxvd1k6ICdzY3JvbGwnLCBtYXhIZWlnaHQ6ICc0MDBweCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXsoaXRlbSkgPT4gZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiBzdHlsZT17eyB3aWR0aDogJzQwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPiBTZWxlY3RlZCBBc3NldHMgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29scz17Z2V0U2VsZWN0ZWRDb2xsdW1uKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDbGFzcz1cInRhYmxlIHRhYmxlLWhvdmVyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtzZWxlY3RlZERhdGF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydEZpZWxkPXtzb3J0RmllbGRTZWxlY3RlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc2NlbmRpbmc9e2FzY2VuZGluZ1NlbGVjdGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU29ydD17KGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuY29sID09IHNvcnRGaWVsZFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3JkZXJlZCA9IF8ub3JkZXJCeShzZWxlY3RlZERhdGEsIFtkLmNvbF0sIFsoIWFzY2VuZGluZ1NlbGVjdGVkID8gXCJhc2NcIiA6IFwiZGVzY1wiKV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXNjZW5kaW5nU2VsZWN0ZWQoIWFzY2VuZGluZ1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkRGF0YShvcmRlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmRlcmVkID0gXy5vcmRlckJ5KHNlbGVjdGVkRGF0YSwgW2QuY29sXSwgW1wiYXNjXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZ1NlbGVjdGVkKCFhc2NlbmRpbmdTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZERhdGEob3JkZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTb3J0RmllbGRTZWxlY3RlZChkLmNvbCBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlYWRTdHlsZT17eyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5U3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgb3ZlcmZsb3dZOiAnc2Nyb2xsJywgbWF4SGVpZ2h0OiAnNDAwcHgnLCB3aWR0aDogJzEwMCUnIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93U3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KGl0ZW0pID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoKSA9PiB7ICQoJyMnICsgcHJvcHMuaWQpLmhpZGUoKTsgcmVzZXQoKTsgc2V0UmVzdWx0KHNlbGVjdGVkRGF0YS5tYXAoaXRlbSA9PiBpdGVtW3Byb3BzLlByaW1hcnlLZXldKSkgfX0+QWRkPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHsgJCgnIycgKyBwcm9wcy5pZCkuaGlkZSgpOyByZXNldCgpOyB9fT5DbG9zZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PilcclxuXHJcbn1cclxuXHJcbmludGVyZmFjZSBJVHJhbnNtaXNzaW9uQXNzZXQge1xyXG4gICAgSUQ6IG51bWJlciwgQXNzZXRLZXk6IHN0cmluZywgQXNzZXROYW1lOiBzdHJpbmcsIEFzc2V0VHlwZTogc3RyaW5nLCBWb2x0YWdlS1Y6IG51bWJlciwgTWV0ZXJzOiBudW1iZXIsIExvY2F0aW9uczogc3RyaW5nXHJcbn1cclxuaW50ZXJmYWNlIElNZXRlciB7XHJcbiAgICBJRDogbnVtYmVyLCBBc3NldEtleTogc3RyaW5nLCBOYW1lOiBzdHJpbmcsIExvY2F0aW9uOiBzdHJpbmcsIE1hcHBlZEFzc2V0czogbnVtYmVyLCBNYWtlOiBzdHJpbmcsIE1vZGVsOiBzdHJpbmdcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIEFkZFRvR3JvdXBQb3B1cChwcm9wczogeyBvbkNvbXBsZXRlOiAoaWQ6IEFycmF5PGFueT4pID0+IEpRdWVyeVhIUiwgdHlwZTogKCdBc3NldCcgfCAnTWV0ZXInIHwgJ0dyb3VwJykgfSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlYXJjaEFzc2V0KHNlYXJjaCk6IEpRdWVyeVhIUiB7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0L1NlYXJjaGFibGVMaXN0YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShzZWFyY2gpLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VhcmNoTWV0ZXJzKHNlYXJjaCk6IEpRdWVyeVhIUiB7XHJcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyL1NlYXJjaGFibGVMaXN0YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShzZWFyY2gpLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VhcmNoQXNzZXRHcm91cHMoc2VhcmNoKTogSlF1ZXJ5WEhSIHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRHcm91cC9TZWFyY2hhYmxlTGlzdGAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoc2VhcmNoKSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9wcy50eXBlID09ICdBc3NldCcpXHJcbiAgICAgICAgcmV0dXJuIDxBZGRUb0Fzc2V0R3JvdXA8SVRyYW5zbWlzc2lvbkFzc2V0PiBpZD0nQWRkQXNzZXQnIHR5cGU9J0Fzc2V0JyBQcmltYXJ5S2V5PSdJRCcgZ2V0RGF0YT17c2VhcmNoQXNzZXR9IG9uQ29tcGxldGU9e3Byb3BzLm9uQ29tcGxldGV9IC8+XHJcbiAgICBpZiAocHJvcHMudHlwZSA9PSAnTWV0ZXInKVxyXG4gICAgICAgIHJldHVybiA8QWRkVG9Bc3NldEdyb3VwPElNZXRlcj4gaWQ9J0FkZE1ldGVyJyB0eXBlPSdNZXRlcicgUHJpbWFyeUtleT0nSUQnIGdldERhdGE9e3NlYXJjaE1ldGVyc30gb25Db21wbGV0ZT17cHJvcHMub25Db21wbGV0ZX0gLz5cclxuICAgIGlmIChwcm9wcy50eXBlID09ICdHcm91cCcpXHJcbiAgICAgICAgcmV0dXJuIDxBZGRUb0Fzc2V0R3JvdXA8SU1ldGVyPiBpZD0nQWRkR3JvdXAnIHR5cGU9J0dyb3VwJyBQcmltYXJ5S2V5PSdJRCcgZ2V0RGF0YT17c2VhcmNoQXNzZXRHcm91cHN9IG9uQ29tcGxldGU9e3Byb3BzLm9uQ29tcGxldGV9IC8+XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZGRUb0dyb3VwUG9wdXA7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEZvcm1DaGVja0JveC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjIvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1DaGVja0JveDxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogVCwgRmllbGQ6IGtleW9mIChUKSwgU2V0dGVyOiAocmVjb3JkOiBUKSA9PiB2b2lkLCBMYWJlbD86IHN0cmluZywgRGlzYWJsZWQ/OiBib29sZWFuIH0sIHt9LCB7fT57XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1jaGVja1wiPlxyXG5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImZvcm0tY2hlY2staW5wdXRcIiBzdHlsZT17eyB6SW5kZXg6IDEgfX0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByZWNvcmQ6IFQgPSBfLmNsb25lKHRoaXMucHJvcHMuUmVjb3JkKTtcclxuICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQuY2hlY2tlZCBhcyBhbnk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID8gJ29uJyA6ICdvZmYnfSBjaGVja2VkPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA/IHRydWUgOiBmYWxzZX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZH0gLz5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tY2hlY2stbGFiZWxcIiA+e3RoaXMucHJvcHMuTGFiZWwgPT0gbnVsbCA/IHRoaXMucHJvcHMuRmllbGQgOiB0aGlzLnByb3BzLkxhYmVsfTwvbGFiZWw+XHJcblxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgRm9ybUlucHV0LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSW5wdXQ8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IFQsIEZpZWxkOiBrZXlvZiAoVCksIFNldHRlcjogKHJlY29yZDogVCkgPT4gdm9pZCwgVmFsaWQ6IChmaWVsZDoga2V5b2YgKFQpKSA9PiBib29sZWFuLCBMYWJlbD86IHN0cmluZywgRmVlZGJhY2s/OiBzdHJpbmcsIERpc2FibGVkPzogYm9vbGVhbiB9LCB7fSwge30+e1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPnt0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXsodGhpcy5wcm9wcy5WYWxpZCh0aGlzLnByb3BzLkZpZWxkKSA/IFwiZm9ybS1jb250cm9sXCIgOiBcImZvcm0tY29udHJvbCBpcy1pbnZhbGlkXCIpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZDogVCA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LnZhbHVlIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9PSBudWxsID8gJycgOiB0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXS50b1N0cmluZygpfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkIH0gLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ludmFsaWQtZmVlZGJhY2snPnt0aGlzLnByb3BzLkZlZWRiYWNrID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkICsgJyBpcyBhIHJlcXVpcmVkIGZpZWxkLicgOiB0aGlzLnByb3BzLkZlZWRiYWNrfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFyYW1ldGVyU2VhcmNoLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAxMC8xNS8yMDIwIC0gQy4gTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZWFyY2ggeyBGaWVsZDogc3RyaW5nLCBTZWFyY2hUZXh0OiBzdHJpbmcgfVxyXG5pbnRlcmZhY2UgSVByb3BzIHsgZ2V0RGF0YTogKHNlcmFjaERhdGE6IEFycmF5PElTZWFyY2g+KSA9PiB2b2lkLCBGaWVsZHM6IEFycmF5PHsga2V5OiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcgfT4sIGRlZmF1bHRGaWVsZD86IHN0cmluZyB9XHJcblxyXG5mdW5jdGlvbiBQYXJhbWV0ZXJTZWFyY2gocHJvcHM6IElQcm9wcykge1xyXG4gICAgY29uc3QgW3NlYXJjaCwgc2V0U2VhcmNoXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PElTZWFyY2g+PihbeyBGaWVsZDogKHByb3BzLmRlZmF1bHRGaWVsZCAhPSB1bmRlZmluZWQgPyBwcm9wcy5kZWZhdWx0RmllbGQgOiBwcm9wcy5GaWVsZHNbMF0ua2V5KSwgU2VhcmNoVGV4dDogJycgfV0pO1xyXG5cclxuXHJcbiAgICByZXR1cm4gKDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1leHBhbmQtbGcgbmF2YmFyLWxpZ2h0IGJnLWxpZ2h0XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD1cIm5hdmJhclN1cHBvcnRlZENvbnRlbnRcIiBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2YmFyLW5hdiBtci1hdXRvXCIgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiIHN0eWxlPXt7IHdpZHRoOiAnNjAlJywgcGFkZGluZ1JpZ2h0OiAxMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPVwiYm9yZGVyXCIgc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnLCBoZWlnaHQ6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZCBjbGFzc05hbWU9XCJ3LWF1dG9cIiBzdHlsZT17eyBmb250U2l6ZTogJ2xhcmdlJyB9fT5TZWFyY2g6IDwvbGVnZW5kPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2gubWFwKChzLCBpbmRleCwgYSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIiBrZXk9e2luZGV4fSBzdHlsZT17eyBib3JkZXI6ICcxcHggc29saWQgbGlnaHRncmF5JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgc3R5bGU9e3sgaGVpZ2h0OiAnMTAwJScgfX0gdmFsdWU9e3MuRmllbGQgYXMgc3RyaW5nfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5ID0gXy5jbG9uZShhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuRmllbGQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VhcmNoKGFycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuRmllbGRzLm1hcChpdGVtID0+IDxvcHRpb24ga2V5PXtpdGVtLmtleX0gdmFsdWU9e2l0ZW0ua2V5fT57aXRlbS5sYWJlbH08L29wdGlvbj4pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHR5cGU9J3RleHQnIHBsYWNlaG9sZGVyPSdTZWFyY2guLi4nIHZhbHVlPXtzLlNlYXJjaFRleHR9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLlNlYXJjaFRleHQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBfLmNsb25lKGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2goYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IG9uS2V5RG93bj17ZXZ0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC5rZXlDb2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLmdldERhdGEoc2VhcmNoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBfLmNsb25lKGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlYXJjaChhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiIHN0eWxlPXt7IHdpZHRoOiAnNDAlJywgcGFkZGluZ1JpZ2h0OiAxMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPVwiYm9yZGVyXCIgc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnLCBoZWlnaHQ6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxlZ2VuZCBjbGFzc05hbWU9XCJ3LWF1dG9cIiBzdHlsZT17eyBmb250U2l6ZTogJ2xhcmdlJyB9fT5TZWFyY2ggUGFyYW1zOjwvbGVnZW5kPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyYXkgPSBfLmNsb25lKHNlYXJjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goeyBGaWVsZDogKHByb3BzLmRlZmF1bHRGaWVsZCAhPSB1bmRlZmluZWQgPyBwcm9wcy5kZWZhdWx0RmllbGQgOiBwcm9wcy5GaWVsZHNbMF0ua2V5KSwgU2VhcmNoVGV4dDogJycgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlYXJjaChhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+QWRkIFBhcmFtZXRlcjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eyhldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudCwgTW91c2VFdmVudD4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuZ2V0RGF0YShzZWFyY2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlVwZGF0ZSBTZWFyY2g8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L25hdj4pXHJcbn0gXHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYXJhbWV0ZXJTZWFyY2g7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFRhYmxlLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE4LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOC8wMi8yMDE4IC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5jb25zdCBBbmdsZUljb246IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PHsgYXNjZW5kaW5nOiBib29sZWFuIH0+ID0gKHByb3BzKSA9PiA8c3BhbiBzdHlsZT17eyB3aWR0aDogMTAsIGhlaWdodDogMTAsIG1hcmdpbjogMyB9fSBjbGFzc05hbWU9e1wiZmEgZmEtYW5nbGUtXCIgKyAocHJvcHMuYXNjZW5kaW5nID8gJ3VwJyA6ICdkb3duJyl9Pjwvc3Bhbj5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVQcm9wczxUPiB7XHJcbiAgICBjb2xzOiBBcnJheTx7IGtleToga2V5b2YoVCkgfCBudWxsLCBsYWJlbDogc3RyaW5nLCBoZWFkZXJTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsIHJvd1N0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcywgY29udGVudD8oaXRlbTogVCwga2V5OiBrZXlvZihUKSwgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMpOiBSZWFjdC5SZWFjdE5vZGUgfT4sXHJcbiAgICBkYXRhOiBBcnJheTxUPixcclxuICAgIG9uQ2xpY2s6IChkYXRhOiB7IGNvbDoga2V5b2YgKFQpLCByb3c6IFQsIGRhdGE6IFRba2V5b2YoVCldIH0sIGV2ZW50OiBhbnkpID0+IHZvaWQsXHJcbiAgICBzb3J0RmllbGQ6IHN0cmluZyxcclxuICAgIGFzY2VuZGluZzogYm9vbGVhbixcclxuICAgIG9uU29ydChkYXRhOiB7IGNvbDoga2V5b2YgKFQpLCBhc2VuZGluZzogYm9vbGVhbn0pOiB2b2lkLFxyXG4gICAgdGFibGVDbGFzcz86IHN0cmluZyxcclxuICAgIHRhYmxlU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG4gICAgdGhlYWRTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsXHJcbiAgICB0aGVhZENsYXNzPzogc3RyaW5nLFxyXG4gICAgdGJvZHlTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXMsXHJcbiAgICB0Ym9keUNsYXNzPzogc3RyaW5nLFxyXG4gICAgc2VsZWN0ZWQ/KGRhdGE6IFQpOiBib29sZWFuLFxyXG4gICAgcm93U3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZTxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxUYWJsZVByb3BzPFQ+LCB7fT4ge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHZhciByb3dDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZVJvd3MoKTtcclxuICAgICAgICB2YXIgaGVhZGVyQ29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVIZWFkZXJzKCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17KHRoaXMucHJvcHMudGFibGVDbGFzcyAhPSB1bmRlZmluZWQgPyB0aGlzLnByb3BzLnRhYmxlQ2xhc3MgOiAnJyl9IHN0eWxlPXt0aGlzLnByb3BzLnRhYmxlU3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgPHRoZWFkIHN0eWxlPXt0aGlzLnByb3BzLnRoZWFkU3R5bGV9PntoZWFkZXJDb21wb25lbnRzfTwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHkgc3R5bGU9e3RoaXMucHJvcHMudGJvZHlTdHlsZX0+e3Jvd0NvbXBvbmVudHN9PC90Ym9keT5cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlSGVhZGVycygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xzLmxlbmd0aCA9PSAwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5wcm9wcy5jb2xzLm1hcCgoY29sRGF0YSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlO1xyXG4gICAgICAgICAgICBpZiAoY29sRGF0YS5oZWFkZXJTdHlsZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gY29sRGF0YS5oZWFkZXJTdHlsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17aW5kZXh9IHN0eWxlPXtzdHlsZX0gb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlU29ydCh7IGNvbDogY29sRGF0YS5rZXksIGFzY2VuZGluZzogdGhpcy5wcm9wcy5hc2NlbmRpbmcgfSwgZSl9Pntjb2xEYXRhLmxhYmVsfXsodGhpcy5wcm9wcy5zb3J0RmllbGQgPT0gY29sRGF0YS5rZXkgPyA8QW5nbGVJY29uIGFzY2VuZGluZz17dGhpcy5wcm9wcy5hc2NlbmRpbmd9IC8+IDogbnVsbCl9PC90aD5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIDx0cj57Y2VsbHN9PC90cj47XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVSb3dzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5wcm9wcy5jb2xzLm1hcChjb2xEYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IF8uY2xvbmUoY29sRGF0YS5yb3dTdHlsZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHRkXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleC50b1N0cmluZygpICsgaXRlbVtjb2xEYXRhLmtleV0gKyBjb2xEYXRhLmtleX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMsIHsgY29sOiBjb2xEYXRhLmtleSwgcm93OiBpdGVtLCBkYXRhOiBpdGVtW2NvbERhdGEua2V5XSB9KX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7Y29sRGF0YS5jb250ZW50ICE9IHVuZGVmaW5lZCA/IGNvbERhdGEuY29udGVudChpdGVtLCBjb2xEYXRhLmtleSwgc3R5bGUpIDogaXRlbVtjb2xEYXRhLmtleV19XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnJvd1N0eWxlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBfLmNsb25lKHRoaXMucHJvcHMucm93U3R5bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHN0eWxlID0ge307XHJcblxyXG4gICAgICAgICAgICBpZiAoc3R5bGUuY3Vyc29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkKGl0ZW0pKVxyXG4gICAgICAgICAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gPHRyIHN0eWxlPXtzdHlsZX0ga2V5PXtpbmRleC50b1N0cmluZygpfT57Y2VsbHN9PC90cj47XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2xpY2soZGF0YTogeyBjb2w6IGtleW9mKFQpLCByb3c6IFQsIGRhdGE6IGFueSB9LCBldmVudCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayhkYXRhLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU29ydChkYXRhLCBldmVudCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMub25Tb3J0KGRhdGEpO1xyXG4gICAgfVxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9