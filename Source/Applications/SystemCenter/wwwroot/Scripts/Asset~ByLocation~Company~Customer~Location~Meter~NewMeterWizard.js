(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Asset~ByLocation~Company~Customer~Location~Meter~NewMeterWizard"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LXRhYmxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0Fzc2V0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ3ZGLDZCQUE2Qix1REFBdUQ7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxZQUFZLG1CQUFPLENBQUMsb0JBQU87QUFDM0Isa0NBQWtDLHNDQUFzQyxTQUFTLG1DQUFtQyxpRUFBaUUsR0FBRztBQUN4TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLDRHQUE0RztBQUMxSiwwQ0FBMEMsK0JBQStCO0FBQ3pFLDBDQUEwQywrQkFBK0I7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxrREFBa0QsMEJBQTBCLHFEQUFxRCxLQUFLLEVBQUUsRUFBRTtBQUN6TDtBQUNBLHdGQUF3RixtQ0FBbUM7QUFDM0gs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RUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUUsS0FBNkIsQ0FBQyxFQUFFLENBQUM7Z0JBQzdHLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUM7WUFDMUMsSUFBSyxLQUE2QixDQUFDLEVBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFFLEtBQTZCLENBQUMsRUFBRSxDQUFDO2dCQUM3RyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDO1lBQzFDLElBQUssS0FBNkIsQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBRSxLQUE2QixDQUFDLEVBQUUsQ0FBQztnQkFDN0csTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztZQUMxQyxJQUFLLEtBQTZCLENBQUMsRUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUUsS0FBNkIsQ0FBQyxFQUFFLENBQUM7Z0JBQzdHLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUM7WUFDM0MsSUFBSyxLQUE2QixDQUFDLGFBQWEsSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFFLEtBQTZCLENBQUMsYUFBYSxDQUFDO2dCQUNuSSxNQUFNLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDO1NBQ3hEO1FBR0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQXRCZSwwQkFBVSxhQXNCekI7QUFDTCxDQUFDLEVBeE5nQixlQUFlLEtBQWYsZUFBZSxRQXdOL0IiLCJmaWxlIjoiQXNzZXR+QnlMb2NhdGlvbn5Db21wYW55fkN1c3RvbWVyfkxvY2F0aW9ufk1ldGVyfk5ld01ldGVyV2l6YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vLyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgVGFibGUudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAxOCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDgvMDIvMjAxOCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIEFuZ2xlSWNvbiA9IGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHsgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBtYXJnaW46IDMgfSwgY2xhc3NOYW1lOiAnZmEgZmEtYW5nbGUtJyArIChwcm9wcy5hc2NlbmRpbmcgPyAndXAnIDogJ2Rvd24nKSB9KSk7IH07XG52YXIgVGFibGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRhYmxlKHByb3BzKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBwcm9wcykgfHwgdGhpcztcbiAgICB9XG4gICAgVGFibGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJvd0NvbXBvbmVudHMgPSB0aGlzLmdlbmVyYXRlUm93cygpO1xuICAgICAgICB2YXIgaGVhZGVyQ29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVIZWFkZXJzKCk7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLnRhYmxlQ2xhc3MgIT09IHVuZGVmaW5lZCA/IHRoaXMucHJvcHMudGFibGVDbGFzcyA6ICcnLCBzdHlsZTogdGhpcy5wcm9wcy50YWJsZVN0eWxlIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIiwgeyBzdHlsZTogdGhpcy5wcm9wcy50aGVhZFN0eWxlIH0sIGhlYWRlckNvbXBvbmVudHMpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIHsgc3R5bGU6IHRoaXMucHJvcHMudGJvZHlTdHlsZSB9LCByb3dDb21wb25lbnRzKSkpO1xuICAgIH07XG4gICAgVGFibGUucHJvdG90eXBlLmdlbmVyYXRlSGVhZGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY29scy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5wcm9wcy5jb2xzLm1hcChmdW5jdGlvbiAoY29sRGF0YSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZTtcbiAgICAgICAgICAgIGlmIChjb2xEYXRhLmhlYWRlclN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGNvbERhdGEuaGVhZGVyU3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCB7IGtleTogaW5kZXgsIHN0eWxlOiBzdHlsZSwgb25DbGljazogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLmhhbmRsZVNvcnQoeyBjb2w6IGNvbERhdGEua2V5LCBhc2NlbmRpbmc6IF90aGlzLnByb3BzLmFzY2VuZGluZyB9LCBlKTsgfSB9LFxuICAgICAgICAgICAgICAgIGNvbERhdGEubGFiZWwsXG4gICAgICAgICAgICAgICAgX3RoaXMucHJvcHMuc29ydEZpZWxkID09PSBjb2xEYXRhLmtleSA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoQW5nbGVJY29uLCB7IGFzY2VuZGluZzogX3RoaXMucHJvcHMuYXNjZW5kaW5nIH0pIDogbnVsbCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLCBjZWxscyk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuZ2VuZXJhdGVSb3dzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kYXRhLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhLm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IF90aGlzLnByb3BzLmNvbHMubWFwKGZ1bmN0aW9uIChjb2xEYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNzcztcbiAgICAgICAgICAgICAgICBpZiAoY29sRGF0YS5yb3dTdHlsZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBjc3MgPSB7fTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNzcyA9IF9fYXNzaWduKHt9LCBjb2xEYXRhLnJvd1N0eWxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCB7IGtleTogaW5kZXgudG9TdHJpbmcoKSArIGl0ZW1bY29sRGF0YS5rZXldICsgY29sRGF0YS5rZXksIHN0eWxlOiBjc3MsIG9uQ2xpY2s6IF90aGlzLmhhbmRsZUNsaWNrLmJpbmQoX3RoaXMsIHsgY29sOiBjb2xEYXRhLmtleSwgcm93OiBpdGVtLCBkYXRhOiBpdGVtW2NvbERhdGEua2V5XSB9KSB9LCBjb2xEYXRhLmNvbnRlbnQgIT09IHVuZGVmaW5lZCA/IGNvbERhdGEuY29udGVudChpdGVtLCBjb2xEYXRhLmtleSwgY3NzKSA6IGl0ZW1bY29sRGF0YS5rZXldKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBzdHlsZTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5wcm9wcy5yb3dTdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBfX2Fzc2lnbih7fSwgX3RoaXMucHJvcHMucm93U3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0eWxlID0ge307XG4gICAgICAgICAgICBpZiAoc3R5bGUuY3Vyc29yID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICAgICAgaWYgKF90aGlzLnByb3BzLnNlbGVjdGVkICE9PSB1bmRlZmluZWQgJiYgX3RoaXMucHJvcHMuc2VsZWN0ZWQoaXRlbSkpXG4gICAgICAgICAgICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCB7IHN0eWxlOiBzdHlsZSwga2V5OiBpbmRleC50b1N0cmluZygpIH0sIGNlbGxzKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVGFibGUucHJvdG90eXBlLmhhbmRsZUNsaWNrID0gZnVuY3Rpb24gKGRhdGEsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25DbGljayhkYXRhLCBldmVudCk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuaGFuZGxlU29ydCA9IGZ1bmN0aW9uIChkYXRhLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU29ydChkYXRhKTtcbiAgICB9O1xuICAgIHJldHVybiBUYWJsZTtcbn0oUmVhY3QuQ29tcG9uZW50KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBUYWJsZTtcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBBc3NldC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgSW5wdXQsIFNlbGVjdCwgVGV4dEFyZWEgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zJztcclxuXHJcbmludGVyZmFjZSBBc3NldEF0dHJpYnV0ZXNQcm9wcyB7XHJcbiAgICBBc3NldDogT3BlblhEQS5Bc3NldCxcclxuICAgIE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LFxyXG4gICAgVXBkYXRlU3RhdGU6IChBc3NldDogT3BlblhEQS5Bc3NldCkgPT4gdm9pZCxcclxuICAgIEFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPixcclxuICAgIEFsbEFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4sXHJcbiAgICBHZXREaWZmZXJlbnRBc3NldDogKGFzc2V0SUQ6IG51bWJlcikgPT4gdm9pZCxcclxuICAgIEhpZGVTZWxlY3RBc3NldDogYm9vbGVhbixcclxuICAgIEhpZGVBc3NldFR5cGU6IGJvb2xlYW4sXHJcbn1cclxuXHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIEFzc2V0QXR0cmlidXRlcyB7XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEFzc2V0QXR0cmlidXRlRmllbGRzKHByb3BzOiBBc3NldEF0dHJpYnV0ZXNQcm9wcyk6IEpTWC5FbGVtZW50IHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlQXNzZXRUeXBlKHR5cGU6IE9wZW5YREEuQXNzZXRUeXBlTmFtZSk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgYXNzZXQgPSB7XHJcbiAgICAgICAgICAgICAgICBJRDogcHJvcHMuQXNzZXQuSUQsXHJcbiAgICAgICAgICAgICAgICBBc3NldEtleTogcHJvcHMuQXNzZXQuQXNzZXRLZXksXHJcbiAgICAgICAgICAgICAgICBBc3NldE5hbWU6IHByb3BzLkFzc2V0LkFzc2V0TmFtZSxcclxuICAgICAgICAgICAgICAgIEFzc2V0VHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uOiBwcm9wcy5Bc3NldC5EZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIFZvbHRhZ2VLVjogcHJvcHMuQXNzZXQuVm9sdGFnZUtWLFxyXG4gICAgICAgICAgICAgICAgQ2hhbm5lbHM6IHByb3BzLkFzc2V0LkNoYW5uZWxzLFxyXG4gICAgICAgICAgICAgICAgU3BhcmU6IHByb3BzLkFzc2V0LlNwYXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFzc2V0ID0gQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0QXR0cmlidXRlcyhhc3NldCwgdHlwZSk7XHJcbiAgICAgICAgICAgIGFzc2V0WydBc3NldFR5cGVJRCddID0gcHJvcHMuQXNzZXRUeXBlcy5maW5kKGF0cyA9PiBhdHMuTmFtZSA9PSB0eXBlKS5JRDtcclxuICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoYXNzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkFzc2V0KSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQgPT0gJ0Fzc2V0S2V5Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3BzLkFzc2V0LkFzc2V0S2V5ID09IG51bGwgfHwgcHJvcHMuQXNzZXQuQXNzZXRLZXkubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb3BzLk5ld0VkaXQgPT0gJ05ldycpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHMuQXNzZXQuSUQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHMuQWxsQXNzZXRzLm1hcChhc3NldCA9PiBhc3NldC5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKS5pbmRleE9mKHByb3BzLkFzc2V0LkFzc2V0S2V5LnRvTG93ZXJDYXNlKCkpIDwgMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvbGRLZXkgPSBwcm9wcy5BbGxBc3NldHMuZmluZChhYSA9PiBhYS5JRCA9PT0gcHJvcHMuQXNzZXQuSUQpID09IHVuZGVmaW5lZCA/ICcnIDogcHJvcHMuQWxsQXNzZXRzLmZpbmQoYWEgPT4gYWEuSUQgPT09IHByb3BzLkFzc2V0LklEKS5Bc3NldEtleTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkS2V5ID09IHByb3BzLkFzc2V0LkFzc2V0S2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcy5BbGxBc3NldHMubWFwKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5LnRvTG93ZXJDYXNlKCkpLmluZGV4T2YocHJvcHMuQXNzZXQuQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkgPCAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdBc3NldE5hbWUnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkFzc2V0TmFtZSAhPSBudWxsICYmIHByb3BzLkFzc2V0LkFzc2V0TmFtZS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVm9sdGFnZUtWJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Wb2x0YWdlS1YgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlZvbHRhZ2VLVik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChwcm9wcy5Bc3NldCA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgcmV0dXJuICg8UmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgICAgIHsgIXByb3BzLkhpZGVTZWxlY3RBc3NldCA/XHJcbiAgICAgICAgICAgICAgICA8U2VsZWN0PE9wZW5YREEuQXNzZXQ+IFJlY29yZD17cHJvcHMuQXNzZXR9IExhYmVsPXsnU2VsZWN0IEFzc2V0J30gRmllbGQ9eydJRCd9XHJcbiAgICAgICAgICAgICAgICAgICAgT3B0aW9ucz17W3sgVmFsdWU6ICcwJywgTGFiZWw6ICdBZGQgTmV3JyB9LCAuLi5wcm9wcy5BbGxBc3NldHMubWFwKGEgPT4gKHsgVmFsdWU6IGEuSUQudG9TdHJpbmcoKSwgTGFiZWw6IGEuQXNzZXRLZXkgfSkpXX1cclxuICAgICAgICAgICAgICAgICAgICBTZXR0ZXI9eyhhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYXNzZXQuSUQudG9TdHJpbmcoKSkgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkdldERpZmZlcmVudEFzc2V0KHBhcnNlSW50KGFzc2V0LklELnRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ0VkaXQnfVxyXG4gICAgICAgICAgICAgICAgLz4gOiBudWxsfVxyXG4gICAgICAgICAgICB7ICFwcm9wcy5IaWRlQXNzZXRUeXBlID9cclxuICAgICAgICAgICAgICAgIDxTZWxlY3Q8T3BlblhEQS5Bc3NldD4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gTGFiZWw9eydUeXBlJ30gRmllbGQ9eydBc3NldFR5cGUnfVxyXG4gICAgICAgICAgICAgICAgICAgIE9wdGlvbnM9e3Byb3BzLkFzc2V0VHlwZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5OYW1lICE9ICdMaW5lU2VnbWVudCcpLm1hcCh0eXBlID0+ICh7IFZhbHVlOiB0eXBlLk5hbWUsIExhYmVsOiB0eXBlLk5hbWUgfSkpfVxyXG4gICAgICAgICAgICAgICAgICAgIFNldHRlcj17KGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUFzc2V0VHlwZShhc3NldC5Bc3NldFR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnRWRpdCcgfHwgcHJvcHMuQXNzZXQuSUQgIT0gMH1cclxuICAgICAgICAgICAgICAgIC8+IDogbnVsbH1cclxuICAgICAgICAgICAgPElucHV0PE9wZW5YREEuQXNzZXQ+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnQXNzZXRLZXknfSBMYWJlbD17J0tleSd9IEZlZWRiYWNrPXsnQSB1bmlxdWUga2V5IG9mIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPElucHV0PE9wZW5YREEuQXNzZXQ+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnQXNzZXROYW1lJ30gTGFiZWw9eydOYW1lJ30gRmVlZGJhY2s9eydOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBhbmQgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8SW5wdXQ8T3BlblhEQS5Bc3NldD4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydWb2x0YWdlS1YnfSBMYWJlbD17J05vbWluYWwgVm9sdGFnZSAoTC1MIGtWKSd9IEZlZWRiYWNrPXsnTm9taW5hbCBWb2x0YWdlIHJlcXVpcmVzIGEgbnVtZXJpY2FsIHZhbHVlLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPFRleHRBcmVhPE9wZW5YREEuQXNzZXQ+IFJvd3M9ezN9IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnRGVzY3JpcHRpb24nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgPC9SZWFjdC5GcmFnbWVudCA+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TmV3QXNzZXQodHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogT3BlblhEQS5EZXRhaWxlZEFzc2V0IHtcclxuICAgICAgICBsZXQgYXNzZXQ6IE9wZW5YREEuQXNzZXQgPSB7XHJcbiAgICAgICAgICAgIElEOiAwLFxyXG4gICAgICAgICAgICBBc3NldEtleTogbnVsbCxcclxuICAgICAgICAgICAgQXNzZXROYW1lOiBudWxsLFxyXG4gICAgICAgICAgICBBc3NldFR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgIERlc2NyaXB0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICBWb2x0YWdlS1Y6IG51bGwsXHJcbiAgICAgICAgICAgIFNwYXJlOiBmYWxzZSxcclxuICAgICAgICAgICAgQ2hhbm5lbHM6IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhc3NldCA9IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldEF0dHJpYnV0ZXMoYXNzZXQsIHR5cGUpO1xyXG4gICAgICAgIHJldHVybiBhc3NldDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TmV3TGluZURldGFpbHMoKTogT3BlblhEQS5MaW5lRGV0YWlsIHtcclxuICAgICAgICBsZXQgYXNzZXQ6IE9wZW5YREEuTGluZURldGFpbCA9IHtcclxuICAgICAgICAgICAgTGVuZ3RoOiAwLFxyXG4gICAgICAgICAgICBYMDogMCxcclxuICAgICAgICAgICAgUjA6IDAsXHJcbiAgICAgICAgICAgIFgxOiAwLFxyXG4gICAgICAgICAgICBSMTogMCxcclxuICAgICAgICAgICAgVGhlcm1hbFJhdGluZzogMCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhc3NldDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0TmV3QXNzZXRBdHRyaWJ1dGVzKGFzc2V0OiBPcGVuWERBLkFzc2V0LCB0eXBlOiBPcGVuWERBLkFzc2V0VHlwZU5hbWUpOiBPcGVuWERBLkRldGFpbGVkQXNzZXQge1xyXG4gICAgICAgIGlmICh0eXBlID09ICdMaW5lJykge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5MaW5lO1xyXG4gICAgICAgICAgICByZWNvcmQuTWF4RmF1bHREaXN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5NaW5GYXVsdERpc3RhbmNlID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLkRldGFpbCA9IHRoaXMuZ2V0TmV3QXNzZXQoJ0xpbmVTZWdtZW50JykgYXMgT3BlblhEQS5MaW5lU2VnbWVudDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ0JyZWFrZXInKSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLkJyZWFrZXI7XHJcbiAgICAgICAgICAgIHJlY29yZC5UaGVybWFsUmF0aW5nID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlNwZWVkID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlRyaXBUaW1lID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlBpY2t1cFRpbWUgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuVHJpcENvaWxDb25kaXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdCdXMnKSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLkJ1cztcclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdDYXBhY2l0b3JCYW5rUmVsYXknKSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLkNhcEJhbmtSZWxheTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdDYXBhY2l0b3JCYW5rJykge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rO1xyXG4gICAgICAgICAgICByZWNvcmQuTnVtYmVyT2ZCYW5rcyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5DYXBhY2l0YW5jZVBlckJhbmsgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnTGluZVNlZ21lbnQnKSB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50O1xyXG4gICAgICAgICAgICByZWNvcmQuUjAgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuWDAgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuUjEgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuWDEgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuVGhlcm1hbFJhdGluZyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5MZW5ndGggPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5UcmFuc2Zvcm1lcjtcclxuICAgICAgICAgICAgcmVjb3JkLlIwID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlgwID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlIxID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlgxID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlRoZXJtYWxSYXRpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuUHJpbWFyeVZvbHRhZ2VLViA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5TZWNvbmRhcnlWb2x0YWdlS1YgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuVGFwID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZFxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHZhciByZWdleCA9IC9eLT9bMC05XSskLztcclxuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS5tYXRjaChyZWdleCkgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaXNSZWFsTnVtYmVyKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB2YXIgcmVnZXggPSAvXi0/WzAtOV0rKFxcLlswLTldKyk/JC87XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkubWF0Y2gocmVnZXgpICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEF0dHJpYnV0ZUVycm9yKGFzc2V0OiBPcGVuWERBLkRldGFpbGVkQXNzZXQpOiBzdHJpbmdbXSAge1xyXG4gICAgICAgIGxldCBlcnJvcnMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGFzc2V0LkFzc2V0S2V5ID09IG51bGwgfHwgYXNzZXQuQXNzZXRLZXkubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKCdBIEtleSBpcyByZXF1aXJlZC4nKVxyXG4gICAgICAgIGlmIChhc3NldC5Bc3NldE5hbWUgPT0gbnVsbCB8fCBhc3NldC5Bc3NldE5hbWUubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKCdBIE5hbWUgaXMgcmVxdWlyZWQuJylcclxuICAgICAgICBpZiAoYXNzZXQuVm9sdGFnZUtWID09IG51bGwgfHwgIUFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIoYXNzZXQuVm9sdGFnZUtWKSlcclxuICAgICAgICAgICAgZXJyb3JzLnB1c2goJ0EgdmFsaWQgbm9taW5hbCBWb2x0YWdlIGlzIHJlcXVpcmVkLicpXHJcblxyXG4gICAgICAgIHJldHVybiBlcnJvcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBBc3NldEVycm9yKGFzc2V0OiBPcGVuWERBLkRldGFpbGVkQXNzZXQsIHR5cGU6IE9wZW5YREEuQXNzZXRUeXBlTmFtZSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIGVycm9ycyA9IEF0dHJpYnV0ZUVycm9yKGFzc2V0KTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gJ0xpbmVTZWdtZW50Jykge1xyXG4gICAgICAgICAgICBpZiAoKGFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnQpLkxlbmd0aCA9PSBudWxsIHx8ICFBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKChhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50KS5MZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goJ0EgdmFsaWQgTGVuZ3RoIGlzIHJlcXVpcmVkLicpXHJcbiAgICAgICAgICAgIGlmICgoYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudCkuUjAgPT0gbnVsbCB8fCAhQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcigoYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudCkuUjApKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goJ0EgdmFsaWQgUjAgaXMgcmVxdWlyZWQuJylcclxuICAgICAgICAgICAgaWYgKChhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50KS5YMCA9PSBudWxsIHx8ICFBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKChhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50KS5YMCkpXHJcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaCgnQSB2YWxpZCBYMCBpcyByZXF1aXJlZC4nKVxyXG4gICAgICAgICAgICBpZiAoKGFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnQpLlIxID09IG51bGwgfHwgIUFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIoKGFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnQpLlIxKSlcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKCdBIHZhbGlkIFIxIGlzIHJlcXVpcmVkLicpXHJcbiAgICAgICAgICAgIGlmICgoYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudCkuWDEgPT0gbnVsbCB8fCAhQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcigoYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudCkuWDEpKVxyXG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goJ0EgWDEgTGVuZ3RoIGlzIHJlcXVpcmVkLicpXHJcbiAgICAgICAgICAgIGlmICgoYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudCkuVGhlcm1hbFJhdGluZyA9PSBudWxsIHx8ICFBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKChhc3NldCBhcyBPcGVuWERBLkxpbmVTZWdtZW50KS5UaGVybWFsUmF0aW5nKSlcclxuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKCdBIHZhbGlkIFRoZXJtYWxSYXRpbmcgaXMgcmVxdWlyZWQuJylcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gZXJyb3JzO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9