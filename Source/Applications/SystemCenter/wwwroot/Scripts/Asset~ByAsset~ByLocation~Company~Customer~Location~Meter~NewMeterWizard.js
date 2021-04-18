(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Asset~ByAsset~ByLocation~Company~Customer~Location~Meter~NewMeterWizard"],{

/***/ "../../node_modules/@gpa-gemstone/react-table/lib/index.js":
/*!*********************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-table/lib/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//  ******************************************************************************************************
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
//  ******************************************************************************************************
var __extends = (this && this.__extends) || (function () {
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
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var AngleIcon = function (props) { return (React.createElement("span", { style: { width: 10, height: 10, margin: 3 }, className: 'fa fa-angle-' + (props.ascending ? 'up' : 'down') })); };
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        return _super.call(this, props) || this;
    }
    Table.prototype.render = function () {
        var rowComponents = this.generateRows();
        var headerComponents = this.generateHeaders();
        return (React.createElement("table", { className: this.props.tableClass !== undefined ? this.props.tableClass : '', style: this.props.tableStyle },
            React.createElement("thead", { style: this.props.theadStyle }, headerComponents),
            React.createElement("tbody", { style: this.props.tbodyStyle }, rowComponents)));
    };
    Table.prototype.generateHeaders = function () {
        var _this = this;
        if (this.props.cols.length === 0)
            return null;
        var cells = this.props.cols.map(function (colData, index) {
            var style;
            if (colData.headerStyle !== undefined) {
                style = colData.headerStyle;
            }
            else
                style = {};
            if (style.cursor === undefined)
                style.cursor = 'pointer';
            return (React.createElement("th", { key: index, style: style, onClick: function (e) { return _this.handleSort({ col: colData.key, ascending: _this.props.ascending }, e); } },
                colData.label,
                _this.props.sortField === colData.key ? React.createElement(AngleIcon, { ascending: _this.props.ascending }) : null));
        });
        return React.createElement("tr", null, cells);
    };
    Table.prototype.generateRows = function () {
        var _this = this;
        if (this.props.data.length === 0)
            return null;
        return this.props.data.map(function (item, index) {
            var cells = _this.props.cols.map(function (colData) {
                var css;
                if (colData.rowStyle === undefined)
                    css = {};
                else
                    css = __assign({}, colData.rowStyle);
                return (React.createElement("td", { key: index.toString() + item[colData.key] + colData.key, style: css, onClick: _this.handleClick.bind(_this, { col: colData.key, row: item, data: item[colData.key] }) }, colData.content !== undefined ? colData.content(item, colData.key, css) : item[colData.key]));
            });
            var style;
            if (_this.props.rowStyle !== undefined) {
                style = __assign({}, _this.props.rowStyle);
            }
            else
                style = {};
            if (style.cursor === undefined)
                style.cursor = 'pointer';
            if (_this.props.selected !== undefined && _this.props.selected(item))
                style.backgroundColor = 'yellow';
            return (React.createElement("tr", { style: style, key: index.toString() }, cells));
        });
    };
    Table.prototype.handleClick = function (data, event) {
        this.props.onClick(data, event);
    };
    Table.prototype.handleSort = function (data, event) {
        this.props.onSort(data);
    };
    return Table;
}(React.Component));
exports.default = Table;


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/Asset.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/Asset.tsx ***!
  \***************************************************/
/*! exports provided: AssetAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetAttributes", function() { return AssetAttributes; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__);
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
//  01/17/2020 - Billy Ernest
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
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};


var AssetAttributes;
(function (AssetAttributes) {
    function AssetAttributeFields(props) {
        function changeAssetType(type) {
            var asset = {
                ID: props.Asset.ID,
                AssetKey: props.Asset.AssetKey,
                AssetName: props.Asset.AssetName,
                AssetType: type,
                Description: props.Asset.Description,
                VoltageKV: props.Asset.VoltageKV,
                Channels: props.Asset.Channels,
                Spare: props.Asset.Spare
            };
            asset = AssetAttributes.getNewAssetAttributes(asset, type);
            asset['AssetTypeID'] = props.AssetTypes.find(function (ats) { return ats.Name == type; }).ID;
            props.UpdateState(asset);
        }
        function valid(field) {
            if (field == 'AssetKey') {
                if (props.Asset.AssetKey == null || props.Asset.AssetKey.length == 0)
                    return false;
                else if (props.NewEdit == 'New') {
                    if (props.Asset.ID == 0) {
                        return props.AllAssets.map(function (asset) { return asset.AssetKey.toLowerCase(); }).indexOf(props.Asset.AssetKey.toLowerCase()) < 0;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    var oldKey = props.AllAssets.find(function (aa) { return aa.ID === props.Asset.ID; }) == undefined ? '' : props.AllAssets.find(function (aa) { return aa.ID === props.Asset.ID; }).AssetKey;
                    if (oldKey == props.Asset.AssetKey)
                        return true;
                    else
                        return props.AllAssets.map(function (asset) { return asset.AssetKey.toLowerCase(); }).indexOf(props.Asset.AssetKey.toLowerCase()) < 0;
                }
            }
            else if (field == 'AssetName')
                return props.Asset.AssetName != null && props.Asset.AssetName.length > 0;
            else if (field == 'VoltageKV')
                return props.Asset.VoltageKV != null && AssetAttributes.isRealNumber(props.Asset.VoltageKV);
            else if (field == 'Description')
                return true;
            return false;
        }
        if (props.Asset == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            !props.HideSelectAsset ?
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Select"], { Record: props.Asset, Label: 'Select Asset', Field: 'ID', Options: __spread([{ Value: '0', Label: 'Add New' }], props.AllAssets.map(function (a) { return ({ Value: a.ID.toString(), Label: a.AssetKey }); })), Setter: function (asset) {
                        if (parseInt(asset.ID.toString()) != 0)
                            props.GetDifferentAsset(parseInt(asset.ID.toString()));
                        else
                            props.UpdateState(AssetAttributes.getNewAsset('Line'));
                    }, Disabled: props.NewEdit == 'Edit' }) : null,
            !props.HideAssetType ?
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Select"], { Record: props.Asset, Label: 'Type', Field: 'AssetType', Options: props.AssetTypes.filter(function (item) { return item.Name != 'LineSegment'; }).map(function (type) { return ({ Value: type.Name, Label: type.Name }); }), Setter: function (asset) {
                        changeAssetType(asset.AssetType);
                    }, Disabled: props.NewEdit == 'Edit' || props.Asset.ID != 0 }) : null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Asset, Field: 'AssetKey', Label: 'Key', Feedback: 'A unique key of less than 50 characters is required.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Asset, Field: 'AssetName', Label: 'Name', Feedback: 'Name must be less than 200 and is required.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Asset, Field: 'VoltageKV', Label: 'Nominal Voltage (L-L kV)', Feedback: 'Nominal Voltage requires a numerical value.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["TextArea"], { Rows: 3, Record: props.Asset, Field: 'Description', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 })));
    }
    AssetAttributes.AssetAttributeFields = AssetAttributeFields;
    function getNewAsset(type) {
        var asset = {
            ID: 0,
            AssetKey: null,
            AssetName: null,
            AssetType: type,
            Description: null,
            VoltageKV: null,
            Spare: false,
            Channels: []
        };
        asset = AssetAttributes.getNewAssetAttributes(asset, type);
        return asset;
    }
    AssetAttributes.getNewAsset = getNewAsset;
    function getNewLineDetails() {
        var asset = {
            Length: 0,
            X0: 0,
            R0: 0,
            X1: 0,
            R1: 0,
            ThermalRating: 0,
        };
        return asset;
    }
    AssetAttributes.getNewLineDetails = getNewLineDetails;
    function getNewAssetAttributes(asset, type) {
        if (type == 'Line') {
            var record = asset;
            record.MaxFaultDistance = null;
            record.MinFaultDistance = null;
            record.Detail = this.getNewAsset('LineSegment');
            return record;
        }
        else if (type == 'Breaker') {
            var record = asset;
            record.ThermalRating = null;
            record.Speed = null;
            record.TripTime = null;
            record.PickupTime = null;
            record.TripCoilCondition = null;
            return record;
        }
        else if (type == 'Bus') {
            var record = asset;
            return record;
        }
        else if (type == 'CapacitorBankRelay') {
            var record = asset;
            return record;
        }
        else if (type == 'CapacitorBank') {
            var record = asset;
            record.NumberOfBanks = null;
            record.CapacitancePerBank = null;
            return record;
        }
        else if (type == 'LineSegment') {
            var record = asset;
            record.R0 = null;
            record.X0 = null;
            record.R1 = null;
            record.X1 = null;
            record.ThermalRating = null;
            record.Length = null;
            return record;
        }
        else {
            var record = asset;
            record.R0 = null;
            record.X0 = null;
            record.R1 = null;
            record.X1 = null;
            record.ThermalRating = null;
            record.PrimaryVoltageKV = null;
            record.SecondaryVoltageKV = null;
            record.Tap = null;
            return record;
        }
    }
    AssetAttributes.getNewAssetAttributes = getNewAssetAttributes;
    function isInteger(value) {
        var regex = /^-?[0-9]+$/;
        return value.toString().match(regex) != null;
    }
    AssetAttributes.isInteger = isInteger;
    function isRealNumber(value) {
        var regex = /^-?[0-9]+(\.[0-9]+)?$/;
        return value.toString().match(regex) != null;
    }
    AssetAttributes.isRealNumber = isRealNumber;
    function AttributeError(asset) {
        var errors = [];
        if (asset.AssetKey == null || asset.AssetKey.length == 0)
            errors.push('A Key is required.');
        if (asset.AssetName == null || asset.AssetName.length == 0)
            errors.push('A Name is required.');
        if (asset.VoltageKV == null || !AssetAttributes.isRealNumber(asset.VoltageKV))
            errors.push('A valid nominal Voltage is required.');
        return errors;
    }
    AssetAttributes.AttributeError = AttributeError;
    function AssetError(asset, type) {
        var errors = [];
        errors = AttributeError(asset);
        if (type == 'LineSegment') {
            if (asset.Length == null || !AssetAttributes.isRealNumber(asset.Length))
                errors.push('A valid Length is required.');
            if (asset.R0 == null || !AssetAttributes.isRealNumber(asset.R0))
                errors.push('A valid R0 is required.');
            if (asset.X0 == null || !AssetAttributes.isRealNumber(asset.X0))
                errors.push('A valid X0 is required.');
            if (asset.R1 == null || !AssetAttributes.isRealNumber(asset.R1))
                errors.push('A valid R1 is required.');
            if (asset.X1 == null || !AssetAttributes.isRealNumber(asset.X1))
                errors.push('A X1 Length is required.');
            if (asset.ThermalRating == null || !AssetAttributes.isRealNumber(asset.ThermalRating))
                errors.push('A valid ThermalRating is required.');
        }
        return errors;
    }
    AssetAttributes.AssetError = AssetError;
})(AssetAttributes || (AssetAttributes = {}));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LXRhYmxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0Fzc2V0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ3ZGLDZCQUE2Qix1REFBdUQ7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxZQUFZLG1CQUFPLENBQUMsb0JBQU87QUFDM0Isa0NBQWtDLHNDQUFzQyxTQUFTLG1DQUFtQyxpRUFBaUUsR0FBRztBQUN4TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLDRHQUE0RztBQUMxSiwwQ0FBMEMsK0JBQStCO0FBQ3pFLDBDQUEwQywrQkFBK0I7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxrREFBa0QsMEJBQTBCLHFEQUFxRCxLQUFLLEVBQUUsRUFBRTtBQUN6TDtBQUNBLHdGQUF3RixtQ0FBbUM7QUFDM0gs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RUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUUsS0FBNkIsQ0FBQyxFQUFFLENBQUM7Z0JBQzdHLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUM7WUFDMUMsSUFBSyxLQUE2QixDQUFDLEVBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFFLEtBQTZCLENBQUMsRUFBRSxDQUFDO2dCQUM3RyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDO1lBQzFDLElBQUssS0FBNkIsQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBRSxLQUE2QixDQUFDLEVBQUUsQ0FBQztnQkFDN0csTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztZQUMxQyxJQUFLLEtBQTZCLENBQUMsRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUUsS0FBNkIsQ0FBQyxFQUFFLENBQUM7Z0JBQzdHLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUM7WUFDM0MsSUFBSyxLQUE2QixDQUFDLGFBQWEsSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFFLEtBQTZCLENBQUMsYUFBYSxDQUFDO2dCQUNuSSxNQUFNLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDO1NBQ3hEO1FBR0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQXRCZSwwQkFBVSxhQXNCekI7QUFDTCxDQUFDLEVBeE5nQixlQUFlLEtBQWYsZUFBZSxRQXdOL0IiLCJmaWxlIjoiQXNzZXR+QnlBc3NldH5CeUxvY2F0aW9ufkNvbXBhbnl+Q3VzdG9tZXJ+TG9jYXRpb25+TWV0ZXJ+TmV3TWV0ZXJXaXphcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBUYWJsZS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDE4LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOC8wMi8yMDE4IC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgQW5nbGVJY29uID0gZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZTogeyB3aWR0aDogMTAsIGhlaWdodDogMTAsIG1hcmdpbjogMyB9LCBjbGFzc05hbWU6ICdmYSBmYS1hbmdsZS0nICsgKHByb3BzLmFzY2VuZGluZyA/ICd1cCcgOiAnZG93bicpIH0pKTsgfTtcbnZhciBUYWJsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFibGUocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBUYWJsZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm93Q29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVSb3dzKCk7XG4gICAgICAgIHZhciBoZWFkZXJDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZUhlYWRlcnMoKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgeyBjbGFzc05hbWU6IHRoaXMucHJvcHMudGFibGVDbGFzcyAhPT0gdW5kZWZpbmVkID8gdGhpcy5wcm9wcy50YWJsZUNsYXNzIDogJycsIHN0eWxlOiB0aGlzLnByb3BzLnRhYmxlU3R5bGUgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiLCB7IHN0eWxlOiB0aGlzLnByb3BzLnRoZWFkU3R5bGUgfSwgaGVhZGVyQ29tcG9uZW50cyksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgeyBzdHlsZTogdGhpcy5wcm9wcy50Ym9keVN0eWxlIH0sIHJvd0NvbXBvbmVudHMpKSk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuZ2VuZXJhdGVIZWFkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgY2VsbHMgPSB0aGlzLnByb3BzLmNvbHMubWFwKGZ1bmN0aW9uIChjb2xEYXRhLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlO1xuICAgICAgICAgICAgaWYgKGNvbERhdGEuaGVhZGVyU3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gY29sRGF0YS5oZWFkZXJTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIHsga2V5OiBpbmRleCwgc3R5bGU6IHN0eWxlLCBvbkNsaWNrOiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuaGFuZGxlU29ydCh7IGNvbDogY29sRGF0YS5rZXksIGFzY2VuZGluZzogX3RoaXMucHJvcHMuYXNjZW5kaW5nIH0sIGUpOyB9IH0sXG4gICAgICAgICAgICAgICAgY29sRGF0YS5sYWJlbCxcbiAgICAgICAgICAgICAgICBfdGhpcy5wcm9wcy5zb3J0RmllbGQgPT09IGNvbERhdGEua2V5ID8gUmVhY3QuY3JlYXRlRWxlbWVudChBbmdsZUljb24sIHsgYXNjZW5kaW5nOiBfdGhpcy5wcm9wcy5hc2NlbmRpbmcgfSkgOiBudWxsKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIGNlbGxzKTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5nZW5lcmF0ZVJvd3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGEubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGNlbGxzID0gX3RoaXMucHJvcHMuY29scy5tYXAoZnVuY3Rpb24gKGNvbERhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3NzO1xuICAgICAgICAgICAgICAgIGlmIChjb2xEYXRhLnJvd1N0eWxlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIGNzcyA9IHt9O1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY3NzID0gX19hc3NpZ24oe30sIGNvbERhdGEucm93U3R5bGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIHsga2V5OiBpbmRleC50b1N0cmluZygpICsgaXRlbVtjb2xEYXRhLmtleV0gKyBjb2xEYXRhLmtleSwgc3R5bGU6IGNzcywgb25DbGljazogX3RoaXMuaGFuZGxlQ2xpY2suYmluZChfdGhpcywgeyBjb2w6IGNvbERhdGEua2V5LCByb3c6IGl0ZW0sIGRhdGE6IGl0ZW1bY29sRGF0YS5rZXldIH0pIH0sIGNvbERhdGEuY29udGVudCAhPT0gdW5kZWZpbmVkID8gY29sRGF0YS5jb250ZW50KGl0ZW0sIGNvbERhdGEua2V5LCBjc3MpIDogaXRlbVtjb2xEYXRhLmtleV0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHN0eWxlO1xuICAgICAgICAgICAgaWYgKF90aGlzLnByb3BzLnJvd1N0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IF9fYXNzaWduKHt9LCBfdGhpcy5wcm9wcy5yb3dTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2VsZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiBfdGhpcy5wcm9wcy5zZWxlY3RlZChpdGVtKSlcbiAgICAgICAgICAgICAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHsgc3R5bGU6IHN0eWxlLCBrZXk6IGluZGV4LnRvU3RyaW5nKCkgfSwgY2VsbHMpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiAoZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGRhdGEsIGV2ZW50KTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5oYW5kbGVTb3J0ID0gZnVuY3Rpb24gKGRhdGEsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25Tb3J0KGRhdGEpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlO1xufShSZWFjdC5Db21wb25lbnQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRhYmxlO1xuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFzc2V0LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBJbnB1dCwgU2VsZWN0LCBUZXh0QXJlYSB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtZm9ybXMnO1xyXG5cclxuaW50ZXJmYWNlIEFzc2V0QXR0cmlidXRlc1Byb3BzIHtcclxuICAgIEFzc2V0OiBPcGVuWERBLkFzc2V0LFxyXG4gICAgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsXHJcbiAgICBVcGRhdGVTdGF0ZTogKEFzc2V0OiBPcGVuWERBLkFzc2V0KSA9PiB2b2lkLFxyXG4gICAgQXNzZXRUeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+LFxyXG4gICAgQWxsQXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PixcclxuICAgIEdldERpZmZlcmVudEFzc2V0OiAoYXNzZXRJRDogbnVtYmVyKSA9PiB2b2lkLFxyXG4gICAgSGlkZVNlbGVjdEFzc2V0OiBib29sZWFuLFxyXG4gICAgSGlkZUFzc2V0VHlwZTogYm9vbGVhbixcclxufVxyXG5cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgQXNzZXRBdHRyaWJ1dGVzIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQXNzZXRBdHRyaWJ1dGVGaWVsZHMocHJvcHM6IEFzc2V0QXR0cmlidXRlc1Byb3BzKTogSlNYLkVsZW1lbnQge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VBc3NldFR5cGUodHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBhc3NldCA9IHtcclxuICAgICAgICAgICAgICAgIElEOiBwcm9wcy5Bc3NldC5JRCxcclxuICAgICAgICAgICAgICAgIEFzc2V0S2V5OiBwcm9wcy5Bc3NldC5Bc3NldEtleSxcclxuICAgICAgICAgICAgICAgIEFzc2V0TmFtZTogcHJvcHMuQXNzZXQuQXNzZXROYW1lLFxyXG4gICAgICAgICAgICAgICAgQXNzZXRUeXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgRGVzY3JpcHRpb246IHByb3BzLkFzc2V0LkRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgVm9sdGFnZUtWOiBwcm9wcy5Bc3NldC5Wb2x0YWdlS1YsXHJcbiAgICAgICAgICAgICAgICBDaGFubmVsczogcHJvcHMuQXNzZXQuQ2hhbm5lbHMsXHJcbiAgICAgICAgICAgICAgICBTcGFyZTogcHJvcHMuQXNzZXQuU3BhcmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXNzZXQgPSBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXRBdHRyaWJ1dGVzKGFzc2V0LCB0eXBlKTtcclxuICAgICAgICAgICAgYXNzZXRbJ0Fzc2V0VHlwZUlEJ10gPSBwcm9wcy5Bc3NldFR5cGVzLmZpbmQoYXRzID0+IGF0cy5OYW1lID09IHR5cGUpLklEO1xyXG4gICAgICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZShhc3NldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuQXNzZXQpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZCA9PSAnQXNzZXRLZXknKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcHMuQXNzZXQuQXNzZXRLZXkgPT0gbnVsbCB8fCBwcm9wcy5Bc3NldC5Bc3NldEtleS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvcHMuTmV3RWRpdCA9PSAnTmV3Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wcy5Bc3NldC5JRCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcy5BbGxBc3NldHMubWFwKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5LnRvTG93ZXJDYXNlKCkpLmluZGV4T2YocHJvcHMuQXNzZXQuQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkgPCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9sZEtleSA9IHByb3BzLkFsbEFzc2V0cy5maW5kKGFhID0+IGFhLklEID09PSBwcm9wcy5Bc3NldC5JRCkgPT0gdW5kZWZpbmVkID8gJycgOiBwcm9wcy5BbGxBc3NldHMuZmluZChhYSA9PiBhYS5JRCA9PT0gcHJvcHMuQXNzZXQuSUQpLkFzc2V0S2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRLZXkgPT0gcHJvcHMuQXNzZXQuQXNzZXRLZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFsbEFzc2V0cy5tYXAoYXNzZXQgPT4gYXNzZXQuQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkuaW5kZXhPZihwcm9wcy5Bc3NldC5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKSA8IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Fzc2V0TmFtZScpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuQXNzZXROYW1lICE9IG51bGwgJiYgcHJvcHMuQXNzZXQuQXNzZXROYW1lLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdWb2x0YWdlS1YnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlZvbHRhZ2VLViAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVm9sdGFnZUtWKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHByb3BzLkFzc2V0ID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gKDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICAgICAgeyAhcHJvcHMuSGlkZVNlbGVjdEFzc2V0ID9cclxuICAgICAgICAgICAgICAgIDxTZWxlY3Q8T3BlblhEQS5Bc3NldD4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gTGFiZWw9eydTZWxlY3QgQXNzZXQnfSBGaWVsZD17J0lEJ31cclxuICAgICAgICAgICAgICAgICAgICBPcHRpb25zPXtbeyBWYWx1ZTogJzAnLCBMYWJlbDogJ0FkZCBOZXcnIH0sIC4uLnByb3BzLkFsbEFzc2V0cy5tYXAoYSA9PiAoeyBWYWx1ZTogYS5JRC50b1N0cmluZygpLCBMYWJlbDogYS5Bc3NldEtleSB9KSldfVxyXG4gICAgICAgICAgICAgICAgICAgIFNldHRlcj17KGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChhc3NldC5JRC50b1N0cmluZygpKSAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuR2V0RGlmZmVyZW50QXNzZXQocGFyc2VJbnQoYXNzZXQuSUQudG9TdHJpbmcoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZShBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnRWRpdCd9XHJcbiAgICAgICAgICAgICAgICAvPiA6IG51bGx9XHJcbiAgICAgICAgICAgIHsgIXByb3BzLkhpZGVBc3NldFR5cGUgP1xyXG4gICAgICAgICAgICAgICAgPFNlbGVjdDxPcGVuWERBLkFzc2V0PiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBMYWJlbD17J1R5cGUnfSBGaWVsZD17J0Fzc2V0VHlwZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW9ucz17cHJvcHMuQXNzZXRUeXBlcy5maWx0ZXIoaXRlbSA9PiBpdGVtLk5hbWUgIT0gJ0xpbmVTZWdtZW50JykubWFwKHR5cGUgPT4gKHsgVmFsdWU6IHR5cGUuTmFtZSwgTGFiZWw6IHR5cGUuTmFtZSB9KSl9XHJcbiAgICAgICAgICAgICAgICAgICAgU2V0dGVyPXsoYXNzZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlQXNzZXRUeXBlKGFzc2V0LkFzc2V0VHlwZSlcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdFZGl0JyB8fCBwcm9wcy5Bc3NldC5JRCAhPSAwfVxyXG4gICAgICAgICAgICAgICAgLz4gOiBudWxsfVxyXG4gICAgICAgICAgICA8SW5wdXQ8T3BlblhEQS5Bc3NldD4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydBc3NldEtleSd9IExhYmVsPXsnS2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8SW5wdXQ8T3BlblhEQS5Bc3NldD4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydBc3NldE5hbWUnfSBMYWJlbD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGFuZCBpcyByZXF1aXJlZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLkFzc2V0PiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1ZvbHRhZ2VLVid9IExhYmVsPXsnTm9taW5hbCBWb2x0YWdlIChMLUwga1YpJ30gRmVlZGJhY2s9eydOb21pbmFsIFZvbHRhZ2UgcmVxdWlyZXMgYSBudW1lcmljYWwgdmFsdWUuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8VGV4dEFyZWE8T3BlblhEQS5Bc3NldD4gUm93cz17M30gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydEZXNjcmlwdGlvbid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICA8L1JlYWN0LkZyYWdtZW50ID5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXROZXdBc3NldCh0eXBlOiBPcGVuWERBLkFzc2V0VHlwZU5hbWUpOiBPcGVuWERBLkRldGFpbGVkQXNzZXQge1xyXG4gICAgICAgIGxldCBhc3NldDogT3BlblhEQS5Bc3NldCA9IHtcclxuICAgICAgICAgICAgSUQ6IDAsXHJcbiAgICAgICAgICAgIEFzc2V0S2V5OiBudWxsLFxyXG4gICAgICAgICAgICBBc3NldE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgIEFzc2V0VHlwZTogdHlwZSxcclxuICAgICAgICAgICAgRGVzY3JpcHRpb246IG51bGwsXHJcbiAgICAgICAgICAgIFZvbHRhZ2VLVjogbnVsbCxcclxuICAgICAgICAgICAgU3BhcmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBDaGFubmVsczogW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFzc2V0ID0gQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0QXR0cmlidXRlcyhhc3NldCwgdHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIGFzc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXROZXdMaW5lRGV0YWlscygpOiBPcGVuWERBLkxpbmVEZXRhaWwge1xyXG4gICAgICAgIGxldCBhc3NldDogT3BlblhEQS5MaW5lRGV0YWlsID0ge1xyXG4gICAgICAgICAgICBMZW5ndGg6IDAsXHJcbiAgICAgICAgICAgIFgwOiAwLFxyXG4gICAgICAgICAgICBSMDogMCxcclxuICAgICAgICAgICAgWDE6IDAsXHJcbiAgICAgICAgICAgIFIxOiAwLFxyXG4gICAgICAgICAgICBUaGVybWFsUmF0aW5nOiAwLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFzc2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXROZXdBc3NldEF0dHJpYnV0ZXMoYXNzZXQ6IE9wZW5YREEuQXNzZXQsIHR5cGU6IE9wZW5YREEuQXNzZXRUeXBlTmFtZSk6IE9wZW5YREEuRGV0YWlsZWRBc3NldCB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gJ0xpbmUnKSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLkxpbmU7XHJcbiAgICAgICAgICAgIHJlY29yZC5NYXhGYXVsdERpc3RhbmNlID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLk1pbkZhdWx0RGlzdGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuRGV0YWlsID0gdGhpcy5nZXROZXdBc3NldCgnTGluZVNlZ21lbnQnKSBhcyBPcGVuWERBLkxpbmVTZWdtZW50O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnQnJlYWtlcicpIHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcjtcclxuICAgICAgICAgICAgcmVjb3JkLlRoZXJtYWxSYXRpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuU3BlZWQgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuVHJpcFRpbWUgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuUGlja3VwVGltZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5UcmlwQ29pbENvbmRpdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ0J1cycpIHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuQnVzO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ0NhcGFjaXRvckJhbmtSZWxheScpIHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua1JlbGF5O1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ0NhcGFjaXRvckJhbmsnKSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLkNhcEJhbms7XHJcbiAgICAgICAgICAgIHJlY29yZC5OdW1iZXJPZkJhbmtzID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLkNhcGFjaXRhbmNlUGVyQmFuayA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdMaW5lU2VnbWVudCcpIHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnQ7XHJcbiAgICAgICAgICAgIHJlY29yZC5SMCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5YMCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5SMSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5YMSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5UaGVybWFsUmF0aW5nID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLkxlbmd0aCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmRcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLlRyYW5zZm9ybWVyO1xyXG4gICAgICAgICAgICByZWNvcmQuUjAgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuWDAgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuUjEgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuWDEgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuVGhlcm1hbFJhdGluZyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5QcmltYXJ5Vm9sdGFnZUtWID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlNlY29uZGFyeVZvbHRhZ2VLViA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5UYXAgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdmFyIHJlZ2V4ID0gL14tP1swLTldKyQvO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLm1hdGNoKHJlZ2V4KSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc1JlYWxOdW1iZXIodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHZhciByZWdleCA9IC9eLT9bMC05XSsoXFwuWzAtOV0rKT8kLztcclxuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS5tYXRjaChyZWdleCkgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQXR0cmlidXRlRXJyb3IoYXNzZXQ6IE9wZW5YREEuRGV0YWlsZWRBc3NldCk6IHN0cmluZ1tdICB7XHJcbiAgICAgICAgbGV0IGVycm9ycyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoYXNzZXQuQXNzZXRLZXkgPT0gbnVsbCB8fCBhc3NldC5Bc3NldEtleS5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgZXJyb3JzLnB1c2goJ0EgS2V5IGlzIHJlcXVpcmVkLicpXHJcbiAgICAgICAgaWYgKGFzc2V0LkFzc2V0TmFtZSA9PSBudWxsIHx8IGFzc2V0LkFzc2V0TmFtZS5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgZXJyb3JzLnB1c2goJ0EgTmFtZSBpcyByZXF1aXJlZC4nKVxyXG4gICAgICAgIGlmIChhc3NldC5Wb2x0YWdlS1YgPT0gbnVsbCB8fCAhQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihhc3NldC5Wb2x0YWdlS1YpKVxyXG4gICAgICAgICAgICBlcnJvcnMucHVzaCgnQSB2YWxpZCBub21pbmFsIFZvbHRhZ2UgaXMgcmVxdWlyZWQuJylcclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEFzc2V0RXJyb3IoYXNzZXQ6IE9wZW5YREEuRGV0YWlsZWRBc3NldCwgdHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgZXJyb3JzID0gQXR0cmlidXRlRXJyb3IoYXNzZXQpO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PSAnTGluZVNlZ21lbnQnKSB7XHJcbiAgICAgICAgICAgIGlmICgoYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudCkuTGVuZ3RoID09IG51bGwgfHwgIUFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIoKGFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnQpLkxlbmd0aCkpXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaCgnQSB2YWxpZCBMZW5ndGggaXMgcmVxdWlyZWQuJylcclxuICAgICAgICAgICAgaWYgKChhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50KS5SMCA9PSBudWxsIHx8ICFBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKChhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50KS5SMCkpXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaCgnQSB2YWxpZCBSMCBpcyByZXF1aXJlZC4nKVxyXG4gICAgICAgICAgICBpZiAoKGFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnQpLlgwID09IG51bGwgfHwgIUFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIoKGFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnQpLlgwKSlcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKCdBIHZhbGlkIFgwIGlzIHJlcXVpcmVkLicpXHJcbiAgICAgICAgICAgIGlmICgoYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudCkuUjEgPT0gbnVsbCB8fCAhQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcigoYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudCkuUjEpKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goJ0EgdmFsaWQgUjEgaXMgcmVxdWlyZWQuJylcclxuICAgICAgICAgICAgaWYgKChhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50KS5YMSA9PSBudWxsIHx8ICFBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKChhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50KS5YMSkpXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaCgnQSBYMSBMZW5ndGggaXMgcmVxdWlyZWQuJylcclxuICAgICAgICAgICAgaWYgKChhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50KS5UaGVybWFsUmF0aW5nID09IG51bGwgfHwgIUFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIoKGFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnQpLlRoZXJtYWxSYXRpbmcpKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goJ0EgdmFsaWQgVGhlcm1hbFJhdGluZyBpcyByZXF1aXJlZC4nKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=