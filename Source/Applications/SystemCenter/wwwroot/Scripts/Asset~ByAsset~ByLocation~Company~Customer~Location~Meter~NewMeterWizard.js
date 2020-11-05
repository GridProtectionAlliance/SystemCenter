(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Asset~ByAsset~ByLocation~Company~Customer~Location~Meter~NewMeterWizard"],{

/***/ "./TSX/SystemCenter/AssetAttribute/Asset.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/Asset.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
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



var AssetAttributes = /** @class */ (function (_super) {
    __extends(AssetAttributes, _super);
    function AssetAttributes(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.valid = _this.valid.bind(_this);
        return _this;
    }
    AssetAttributes.getNewAsset = function (type) {
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
    };
    AssetAttributes.getNewLineDetails = function () {
        var asset = {
            Length: 0,
            X0: 0,
            R0: 0,
            X1: 0,
            R1: 0,
            ThermalRating: 0,
        };
        return asset;
    };
    AssetAttributes.getNewAssetAttributes = function (asset, type) {
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
    };
    AssetAttributes.isInteger = function (value) {
        var regex = /^-?[0-9]+$/;
        return value.toString().match(regex) != null;
    };
    AssetAttributes.isRealNumber = function (value) {
        var regex = /^-?[0-9]+(\.[0-9]+)?$/;
        return value.toString().match(regex) != null;
    };
    AssetAttributes.prototype.changeAssetType = function (type) {
        var asset = {
            ID: this.props.Asset.ID,
            AssetKey: this.props.Asset.AssetKey,
            AssetName: this.props.Asset.AssetName,
            AssetType: type,
            Description: this.props.Asset.Description,
            VoltageKV: this.props.Asset.VoltageKV,
            Channels: this.props.Asset.Channels,
            Spare: this.props.Asset.Spare
        };
        asset = AssetAttributes.getNewAssetAttributes(asset, type);
        asset['AssetTypeID'] = this.props.AssetTypes.find(function (ats) { return ats.Name == type; }).ID;
        this.props.UpdateState(asset);
    };
    AssetAttributes.prototype.valid = function (field) {
        var _this = this;
        if (field == 'AssetKey') {
            if (this.props.Asset.AssetKey == null || this.props.Asset.AssetKey.length == 0)
                return false;
            else if (this.props.NewEdit == 'New') {
                if (this.props.Asset.ID == 0) {
                    return this.props.AllAssets.map(function (asset) { return asset.AssetKey.toLowerCase(); }).indexOf(this.props.Asset.AssetKey.toLowerCase()) < 0;
                }
                else {
                    return true;
                }
            }
            else {
                var oldKey = this.props.AllAssets.find(function (aa) { return aa.ID === _this.props.Asset.ID; }) == undefined ? '' : this.props.AllAssets.find(function (aa) { return aa.ID === _this.props.Asset.ID; }).AssetKey;
                if (oldKey == this.props.Asset.AssetKey)
                    return true;
                else
                    return this.props.AllAssets.map(function (asset) { return asset.AssetKey.toLowerCase(); }).indexOf(this.props.Asset.AssetKey.toLowerCase()) < 0;
            }
        }
        else if (field == 'AssetName')
            return this.props.Asset.AssetName != null && this.props.Asset.AssetName.length > 0;
        else if (field == 'VoltageKV')
            return this.props.Asset.VoltageKV != null && AssetAttributes.isRealNumber(this.props.Asset.VoltageKV);
        else if (field == 'Description')
            return true;
        return false;
    };
    AssetAttributes.prototype.render = function () {
        var _this = this;
        if (this.props.Asset == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group", hidden: this.props.NewEdit == 'Edit' || this.props.HideSelectAsset == true },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Select Asset"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: this.props.Asset.ID.toString(), disabled: this.props.NewEdit == 'Edit', onChange: function (evt) {
                        if (evt.target.value != "0")
                            _this.props.GetDifferentAsset(parseInt(evt.target.value));
                        else
                            _this.props.UpdateState(AssetAttributes.getNewAsset('Line'));
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: 0, value: "0" }, "Add New"),
                    this.props.AllAssets.map(function (asset, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index + 1, value: asset.ID }, asset.AssetKey); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Type"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: this.props.Asset.AssetType, onChange: function (evt) {
                        _this.changeAssetType(evt.target.value);
                    }, disabled: this.props.NewEdit == 'Edit' || this.props.Asset.ID != 0 }, this.props.AssetTypes.map(function (assetType) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: assetType.Name, key: assetType.ID, hidden: assetType.Name == 'LineSegment' }, assetType.Name); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.Asset, Field: 'AssetKey', Label: 'Key', Feedback: 'A unique key of less than 50 characters is required.', Valid: this.valid, Setter: this.props.UpdateState, Disabled: this.props.NewEdit == 'New' && this.props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.Asset, Field: 'AssetName', Label: 'Name', Feedback: 'Name must be less than 200 and is required.', Valid: this.valid, Setter: this.props.UpdateState, Disabled: this.props.NewEdit == 'New' && this.props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.Asset, Field: 'VoltageKV', Label: 'Nominal Voltage (L-L kV)', Feedback: 'Nominal Voltage requires a numerical value.', Valid: this.valid, Setter: this.props.UpdateState, Disabled: this.props.NewEdit == 'New' && this.props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_2__["default"], { Rows: 3, Record: this.props.Asset, Field: 'Description', Valid: this.valid, Setter: this.props.UpdateState, Disabled: this.props.NewEdit == 'New' && this.props.Asset.ID != 0 })));
    };
    return AssetAttributes;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (AssetAttributes);


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

/***/ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx":
/*!************************************************************!*\
  !*** ./TSX/SystemCenter/CommonComponents/FormTextArea.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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
//  FormTextArea.tsx - Gbtc
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


var FormTextArea = /** @class */ (function (_super) {
    __extends(FormTextArea, _super);
    function FormTextArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormTextArea.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, this.props.Label == null ? this.props.Field : this.props.Label),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("textarea", { rows: this.props.Rows, className: (this.props.Valid(this.props.Field) ? "form-control" : "form-control is-invalid"), onChange: function (evt) {
                    var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.Record);
                    if (evt.target.value != "")
                        record[_this.props.Field] = evt.target.value;
                    else
                        record[_this.props.Field] = null;
                    _this.props.Setter(record);
                }, value: this.props.Record[this.props.Field] == null ? '' : this.props.Record[this.props.Field].toString(), disabled: this.props.Disabled == null ? false : this.props.Disabled }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'invalid-feedback' }, this.props.Feedback == null ? this.props.Field + ' is a required field.' : this.props.Feedback));
    };
    return FormTextArea;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (FormTextArea);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0Fzc2V0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRm9ybVRleHRBcmVhLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RyxvQkFBb0I7QUFDcEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFJdUI7QUFDTTtBQVc1RDtJQUE2QyxtQ0FBNkM7SUFDdEYseUJBQVksS0FBSyxFQUFFLE9BQU87UUFBMUIsWUFDSSxrQkFBTSxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBRXhCO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzs7SUFDdkMsQ0FBQztJQUVNLDJCQUFXLEdBQWxCLFVBQW1CLElBQTJCO1FBQzFDLElBQUksS0FBSyxHQUFrQjtZQUN2QixFQUFFLEVBQUUsQ0FBQztZQUNMLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFNBQVMs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QUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUc7WUFDbkwsNkRBQUssU0FBUyxFQUFDLGtCQUFrQixJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFPLENBQ3RJLENBQUM7SUFDWCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLENBaEI0QywrQ0FBZSxHQWdCM0QiLCJmaWxlIjoiQXNzZXR+QnlBc3NldH5CeUxvY2F0aW9ufkNvbXBhbnl+Q3VzdG9tZXJ+TG9jYXRpb25+TWV0ZXJ+TmV3TWV0ZXJXaXphcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIEFzc2V0LnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzE3LzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xuaW1wb3J0IEZvcm1UZXh0QXJlYSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1UZXh0QXJlYSc7XG5cbmludGVyZmFjZSBBc3NldEF0dHJpYnV0ZXNQcm9wcyB7XG4gICAgQXNzZXQ6IE9wZW5YREEuQXNzZXQsXG4gICAgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsXG4gICAgVXBkYXRlU3RhdGU6IChBc3NldDogT3BlblhEQS5Bc3NldCkgPT4gdm9pZCxcbiAgICBBc3NldFR5cGVzOiBBcnJheTxPcGVuWERBLkFzc2V0VHlwZT4sXG4gICAgQWxsQXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PixcbiAgICBHZXREaWZmZXJlbnRBc3NldDogKGFzc2V0SUQ6IG51bWJlcikgPT4gdm9pZCxcbiAgICBIaWRlU2VsZWN0QXNzZXQ/OiBib29sZWFuXG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NldEF0dHJpYnV0ZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8QXNzZXRBdHRyaWJ1dGVzUHJvcHMsIHt9LCB7fT57XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy52YWxpZC5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXROZXdBc3NldCh0eXBlOiBPcGVuWERBLkFzc2V0VHlwZU5hbWUpOiBPcGVuWERBLkJyZWFrZXIgfCBPcGVuWERBLkJ1cyB8IE9wZW5YREEuQ2FwQmFuayB8IE9wZW5YREEuTGluZSB8IE9wZW5YREEuTGluZVNlZ21lbnQgfCBPcGVuWERBLlRyYW5zZm9ybWVyIHwgT3BlblhEQS5DYXBCYW5rUmVsYXkge1xuICAgICAgICBsZXQgYXNzZXQ6IE9wZW5YREEuQXNzZXQgPSB7XG4gICAgICAgICAgICBJRDogMCxcbiAgICAgICAgICAgIEFzc2V0S2V5OiBudWxsLFxuICAgICAgICAgICAgQXNzZXROYW1lOiBudWxsLFxuICAgICAgICAgICAgQXNzZXRUeXBlOiB0eXBlLFxuICAgICAgICAgICAgRGVzY3JpcHRpb246IG51bGwsXG4gICAgICAgICAgICBWb2x0YWdlS1Y6IG51bGwsXG4gICAgICAgICAgICBTcGFyZTogZmFsc2UsXG4gICAgICAgICAgICBDaGFubmVsczogW11cbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2V0ID0gQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0QXR0cmlidXRlcyhhc3NldCwgdHlwZSk7XG4gICAgICAgIHJldHVybiBhc3NldDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TmV3TGluZURldGFpbHMoKTogT3BlblhEQS5MaW5lRGV0YWlse1xuICAgICAgICBsZXQgYXNzZXQ6IE9wZW5YREEuTGluZURldGFpbCA9IHtcbiAgICAgICAgICAgIExlbmd0aDogMCxcbiAgICAgICAgICAgIFgwOiAwLFxuICAgICAgICAgICAgUjA6IDAsXG4gICAgICAgICAgICBYMTogMCxcbiAgICAgICAgICAgIFIxOiAwLFxuICAgICAgICAgICAgVGhlcm1hbFJhdGluZzogMCxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3NldDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TmV3QXNzZXRBdHRyaWJ1dGVzKGFzc2V0OiBPcGVuWERBLkFzc2V0LCB0eXBlOiBPcGVuWERBLkFzc2V0VHlwZU5hbWUpOiBPcGVuWERBLkNhcEJhbmtSZWxheSB8IE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5MaW5lU2VnbWVudCB8IE9wZW5YREEuVHJhbnNmb3JtZXIge1xuICAgICAgICBpZiAodHlwZSA9PSAnTGluZScpIHtcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLkxpbmU7XG4gICAgICAgICAgICByZWNvcmQuTWF4RmF1bHREaXN0YW5jZSA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuTWluRmF1bHREaXN0YW5jZSA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuRGV0YWlsID0gdGhpcy5nZXROZXdBc3NldCgnTGluZVNlZ21lbnQnKSBhcyBPcGVuWERBLkxpbmVTZWdtZW50O1xuXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ0JyZWFrZXInKSB7XG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5CcmVha2VyO1xuICAgICAgICAgICAgcmVjb3JkLlRoZXJtYWxSYXRpbmcgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLlNwZWVkID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5UcmlwVGltZSA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuUGlja3VwVGltZSA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuVHJpcENvaWxDb25kaXRpb24gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdCdXMnKSB7XG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5CdXM7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnQ2FwYWNpdG9yQmFua1JlbGF5Jykge1xuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua1JlbGF5O1xuICAgICAgICAgICAgcmV0dXJuIHJlY29yZFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ0NhcGFjaXRvckJhbmsnKSB7XG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rO1xuICAgICAgICAgICAgcmVjb3JkLk51bWJlck9mQmFua3MgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLkNhcGFjaXRhbmNlUGVyQmFuayA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnTGluZVNlZ21lbnQnKSB7XG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudDtcbiAgICAgICAgICAgIHJlY29yZC5SMCA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuWDAgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLlIxID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5YMSA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuVGhlcm1hbFJhdGluZyA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuTGVuZ3RoID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiByZWNvcmRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLlRyYW5zZm9ybWVyO1xuICAgICAgICAgICAgcmVjb3JkLlIwID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5YMCA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuUjEgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLlgxID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5UaGVybWFsUmF0aW5nID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5QcmltYXJ5Vm9sdGFnZUtWID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5TZWNvbmRhcnlWb2x0YWdlS1YgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLlRhcCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgc3RhdGljIGlzSW50ZWdlcih2YWx1ZTogYW55KSB7XG4gICAgICAgIHZhciByZWdleCA9IC9eLT9bMC05XSskLztcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkubWF0Y2gocmVnZXgpICE9IG51bGw7XG4gICAgfVxuICAgIHN0YXRpYyBpc1JlYWxOdW1iZXIodmFsdWU6IGFueSkge1xuICAgICAgICB2YXIgcmVnZXggPSAvXi0/WzAtOV0rKFxcLlswLTldKyk/JC87XG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLm1hdGNoKHJlZ2V4KSAhPSBudWxsO1xuICAgIH1cblxuICAgIGNoYW5nZUFzc2V0VHlwZSh0eXBlOiBPcGVuWERBLkFzc2V0VHlwZU5hbWUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFzc2V0ID0ge1xuICAgICAgICAgICAgSUQ6IHRoaXMucHJvcHMuQXNzZXQuSUQsXG4gICAgICAgICAgICBBc3NldEtleTogdGhpcy5wcm9wcy5Bc3NldC5Bc3NldEtleSxcbiAgICAgICAgICAgIEFzc2V0TmFtZTogdGhpcy5wcm9wcy5Bc3NldC5Bc3NldE5hbWUsXG4gICAgICAgICAgICBBc3NldFR5cGU6IHR5cGUsXG4gICAgICAgICAgICBEZXNjcmlwdGlvbjogdGhpcy5wcm9wcy5Bc3NldC5EZXNjcmlwdGlvbixcbiAgICAgICAgICAgIFZvbHRhZ2VLVjogdGhpcy5wcm9wcy5Bc3NldC5Wb2x0YWdlS1YsXG4gICAgICAgICAgICBDaGFubmVsczogdGhpcy5wcm9wcy5Bc3NldC5DaGFubmVscyxcbiAgICAgICAgICAgIFNwYXJlOiB0aGlzLnByb3BzLkFzc2V0LlNwYXJlXG4gICAgICAgIH1cblxuICAgICAgICBhc3NldCA9IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldEF0dHJpYnV0ZXMoYXNzZXQsIHR5cGUpO1xuICAgICAgICBhc3NldFsnQXNzZXRUeXBlSUQnXSA9IHRoaXMucHJvcHMuQXNzZXRUeXBlcy5maW5kKGF0cyA9PiBhdHMuTmFtZSA9PSB0eXBlKS5JRDtcbiAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZShhc3NldCk7XG4gICAgfVxuXG4gICAgdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkFzc2V0KSk6IGJvb2xlYW4geyAgICAgICBcbiAgICAgICAgaWYgKGZpZWxkID09ICdBc3NldEtleScpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLkFzc2V0LkFzc2V0S2V5ID09IG51bGwgfHwgdGhpcy5wcm9wcy5Bc3NldC5Bc3NldEtleS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy5OZXdFZGl0ID09ICdOZXcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuQXNzZXQuSUQgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5BbGxBc3NldHMubWFwKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5LnRvTG93ZXJDYXNlKCkpLmluZGV4T2YodGhpcy5wcm9wcy5Bc3NldC5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKSA8IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgb2xkS2V5ID0gdGhpcy5wcm9wcy5BbGxBc3NldHMuZmluZChhYSA9PiBhYS5JRCA9PT0gdGhpcy5wcm9wcy5Bc3NldC5JRCkgPT0gdW5kZWZpbmVkID8gJycgOiB0aGlzLnByb3BzLkFsbEFzc2V0cy5maW5kKGFhID0+IGFhLklEID09PSB0aGlzLnByb3BzLkFzc2V0LklEKS5Bc3NldEtleTtcbiAgICAgICAgICAgICAgICBpZiAob2xkS2V5ID09IHRoaXMucHJvcHMuQXNzZXQuQXNzZXRLZXkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuQWxsQXNzZXRzLm1hcChhc3NldCA9PiBhc3NldC5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKS5pbmRleE9mKHRoaXMucHJvcHMuQXNzZXQuQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkgPCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdBc3NldE5hbWUnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuQXNzZXQuQXNzZXROYW1lICE9IG51bGwgJiYgdGhpcy5wcm9wcy5Bc3NldC5Bc3NldE5hbWUubGVuZ3RoID4gMDtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1ZvbHRhZ2VLVicpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5Bc3NldC5Wb2x0YWdlS1YgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHRoaXMucHJvcHMuQXNzZXQuVm9sdGFnZUtWKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5Bc3NldCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCIgaGlkZGVuPXt0aGlzLnByb3BzLk5ld0VkaXQgPT0gJ0VkaXQnIHx8IHRoaXMucHJvcHMuSGlkZVNlbGVjdEFzc2V0ID09IHRydWV9PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2VsZWN0IEFzc2V0PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5wcm9wcy5Bc3NldC5JRC50b1N0cmluZygpfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5OZXdFZGl0ID09ICdFZGl0J30gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LnZhbHVlICE9IFwiMFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuR2V0RGlmZmVyZW50QXNzZXQocGFyc2VJbnQoZXZ0LnRhcmdldC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xuICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXswfSB2YWx1ZT1cIjBcIj5BZGQgTmV3PC9vcHRpb24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkFsbEFzc2V0cy5tYXAoKGFzc2V0LCBpbmRleCkgPT4gPG9wdGlvbiBrZXk9e2luZGV4ICsgMX0gdmFsdWU9e2Fzc2V0LklEfSA+e2Fzc2V0LkFzc2V0S2V5fTwvb3B0aW9uPilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+VHlwZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMucHJvcHMuQXNzZXQuQXNzZXRUeXBlfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBc3NldFR5cGUoZXZ0LnRhcmdldC52YWx1ZSBhcyAnTGluZScgfCAnTGluZVNlZ21lbnQnIHwgJ0JyZWFrZXInIHwgJ0J1cycgfCAnQ2FwYWNpdG9yQmFuaycgfCAnVHJhbnNmb3JtZXInIHwgJ0NhcGFjaXRvckJhbmtSZWxheScpXG4gICAgICAgICAgICAgICAgICAgIH19IGRpc2FibGVkPXt0aGlzLnByb3BzLk5ld0VkaXQgPT0gJ0VkaXQnIHx8IHRoaXMucHJvcHMuQXNzZXQuSUQgIT0gMH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5Bc3NldFR5cGVzLm1hcChhc3NldFR5cGUgPT4gPG9wdGlvbiB2YWx1ZT17YXNzZXRUeXBlLk5hbWV9IGtleT17YXNzZXRUeXBlLklEfSBoaWRkZW49e2Fzc2V0VHlwZS5OYW1lID09ICdMaW5lU2VnbWVudCd9Pnthc3NldFR5cGUuTmFtZX08L29wdGlvbj4pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQXNzZXQ+IFJlY29yZD17dGhpcy5wcm9wcy5Bc3NldH0gRmllbGQ9eydBc3NldEtleSd9IExhYmVsPXsnS2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy5wcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3RoaXMucHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiB0aGlzLnByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkFzc2V0PiBSZWNvcmQ9e3RoaXMucHJvcHMuQXNzZXR9IEZpZWxkPXsnQXNzZXROYW1lJ30gTGFiZWw9eydOYW1lJ30gRmVlZGJhY2s9eydOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBhbmQgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy5wcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3RoaXMucHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiB0aGlzLnByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkFzc2V0PiBSZWNvcmQ9e3RoaXMucHJvcHMuQXNzZXR9IEZpZWxkPXsnVm9sdGFnZUtWJ30gTGFiZWw9eydOb21pbmFsIFZvbHRhZ2UgKEwtTCBrViknfSBGZWVkYmFjaz17J05vbWluYWwgVm9sdGFnZSByZXF1aXJlcyBhIG51bWVyaWNhbCB2YWx1ZS4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXt0aGlzLnByb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17dGhpcy5wcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHRoaXMucHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuQXNzZXQ+IFJvd3M9ezN9IFJlY29yZD17dGhpcy5wcm9wcy5Bc3NldH0gRmllbGQ9eydEZXNjcmlwdGlvbid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9e3RoaXMucHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXt0aGlzLnByb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgdGhpcy5wcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICk7XG4gICAgfVxufSIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBGb3JtSW5wdXQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzIyLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1JbnB1dDxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogVCwgRmllbGQ6IGtleW9mIChUKSwgU2V0dGVyOiAocmVjb3JkOiBUKSA9PiB2b2lkLCBWYWxpZDogKGZpZWxkOiBrZXlvZiAoVCkpID0+IGJvb2xlYW4sIExhYmVsPzogc3RyaW5nLCBGZWVkYmFjaz86IHN0cmluZywgRGlzYWJsZWQ/OiBib29sZWFuIH0sIHt9LCB7fT57XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWw+e3RoaXMucHJvcHMuTGFiZWwgPT0gbnVsbCA/IHRoaXMucHJvcHMuRmllbGQgOiB0aGlzLnByb3BzLkxhYmVsfTwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9eyh0aGlzLnByb3BzLlZhbGlkKHRoaXMucHJvcHMuRmllbGQpID8gXCJmb3JtLWNvbnRyb2xcIiA6IFwiZm9ybS1jb250cm9sIGlzLWludmFsaWRcIil9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkOiBUID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQudmFsdWUgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID09IG51bGwgPyAnJyA6IHRoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdLnRvU3RyaW5nKCl9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWQgfSAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW52YWxpZC1mZWVkYmFjayc+e3RoaXMucHJvcHMuRmVlZGJhY2sgPT0gbnVsbCA/IHRoaXMucHJvcHMuRmllbGQgKyAnIGlzIGEgcmVxdWlyZWQgZmllbGQuJyA6IHRoaXMucHJvcHMuRmVlZGJhY2t9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBGb3JtVGV4dEFyZWEudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzIyLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVRleHRBcmVhPFQ+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgUm93czogbnVtYmVyLCBSZWNvcmQ6IFQsIEZpZWxkOiBrZXlvZiAoVCksIFNldHRlcjogKHJlY29yZDogVCkgPT4gdm9pZCwgVmFsaWQ6IChmaWVsZDoga2V5b2YgKFQpKSA9PiBib29sZWFuLCBMYWJlbD86IHN0cmluZywgRmVlZGJhY2s/OiBzdHJpbmcsIERpc2FibGVkPzogYm9vbGVhbiB9LCB7fSwge30+e1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPnt0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgcm93cz17dGhpcy5wcm9wcy5Sb3dzfSBjbGFzc05hbWU9eyh0aGlzLnByb3BzLlZhbGlkKHRoaXMucHJvcHMuRmllbGQpID8gXCJmb3JtLWNvbnRyb2xcIiA6IFwiZm9ybS1jb250cm9sIGlzLWludmFsaWRcIil9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkOiBUID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQudmFsdWUgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID09IG51bGwgPyAnJyA6IHRoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdLnRvU3RyaW5nKCl9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9Lz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ludmFsaWQtZmVlZGJhY2snPnt0aGlzLnByb3BzLkZlZWRiYWNrID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkICsgJyBpcyBhIHJlcXVpcmVkIGZpZWxkLicgOiB0aGlzLnByb3BzLkZlZWRiYWNrfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=