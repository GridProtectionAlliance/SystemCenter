(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Asset~ByAsset~ByAssetGroup~ByLocation~Company~Customer~Location~Meter~NewMeterWizard"],{

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
                return true;
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
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.Asset, Field: 'VoltageKV', Label: 'Nominal Voltage (kV)', Feedback: 'Nominal Voltage requires a numerical value.', Valid: this.valid, Setter: this.props.UpdateState, Disabled: this.props.NewEdit == 'New' && this.props.Asset.ID != 0 }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0Fzc2V0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0LnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbW1vbkNvbXBvbmVudHMvRm9ybVRleHRBcmVhLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RyxvQkFBb0I7QUFDcEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFJdUI7QUFDTTtBQVc1RDtJQUE2QyxtQ0FBNkM7SUFDdEYseUJBQVksS0FBSyxFQUFFLE9BQU87UUFBMUIsWUFDSSxrQkFBTSxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBRXhCO1FBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzs7SUFDdkMsQ0FBQztJQUVNLDJCQUFXLEdBQWxCLFVBQW1CLElBQTJCO1FBQzFDLElBQUksS0FBSyxHQUFrQjtZQUN2QixFQUFFLEVBQUUsQ0FBQztZQUNMLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLElBQUk7WUFDZixTQUFTLEVBQUUsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFNBQVMs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QUFDLEdBQUcsSUFBSSxDQUFDO29CQUVwQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUc7WUFDbkwsNkRBQUssU0FBUyxFQUFDLGtCQUFrQixJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFPLENBQ3RJLENBQUM7SUFDWCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLENBaEI0QywrQ0FBZSxHQWdCM0QiLCJmaWxlIjoiQXNzZXR+QnlBc3NldH5CeUFzc2V0R3JvdXB+QnlMb2NhdGlvbn5Db21wYW55fkN1c3RvbWVyfkxvY2F0aW9ufk1ldGVyfk5ld01ldGVyV2l6YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBBc3NldC50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8xNy8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCB7IFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcbmltcG9ydCBGb3JtVGV4dEFyZWEgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtVGV4dEFyZWEnO1xuXG5pbnRlcmZhY2UgQXNzZXRBdHRyaWJ1dGVzUHJvcHMge1xuICAgIEFzc2V0OiBPcGVuWERBLkFzc2V0LFxuICAgIE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LFxuICAgIFVwZGF0ZVN0YXRlOiAoQXNzZXQ6IE9wZW5YREEuQXNzZXQpID0+IHZvaWQsXG4gICAgQXNzZXRUeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldFR5cGU+LFxuICAgIEFsbEFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4sXG4gICAgR2V0RGlmZmVyZW50QXNzZXQ6IChhc3NldElEOiBudW1iZXIpID0+IHZvaWQsXG4gICAgSGlkZVNlbGVjdEFzc2V0PzogYm9vbGVhblxufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXNzZXRBdHRyaWJ1dGVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PEFzc2V0QXR0cmlidXRlc1Byb3BzLCB7fSwge30+e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZCA9IHRoaXMudmFsaWQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TmV3QXNzZXQodHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogT3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLkxpbmVTZWdtZW50IHwgT3BlblhEQS5UcmFuc2Zvcm1lciB8IE9wZW5YREEuQ2FwQmFua1JlbGF5IHtcbiAgICAgICAgbGV0IGFzc2V0OiBPcGVuWERBLkFzc2V0ID0ge1xuICAgICAgICAgICAgSUQ6IDAsXG4gICAgICAgICAgICBBc3NldEtleTogbnVsbCxcbiAgICAgICAgICAgIEFzc2V0TmFtZTogbnVsbCxcbiAgICAgICAgICAgIEFzc2V0VHlwZTogdHlwZSxcbiAgICAgICAgICAgIERlc2NyaXB0aW9uOiBudWxsLFxuICAgICAgICAgICAgVm9sdGFnZUtWOiBudWxsLFxuICAgICAgICAgICAgU3BhcmU6IGZhbHNlLFxuICAgICAgICAgICAgQ2hhbm5lbHM6IFtdXG4gICAgICAgIH1cblxuICAgICAgICBhc3NldCA9IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldEF0dHJpYnV0ZXMoYXNzZXQsIHR5cGUpO1xuICAgICAgICByZXR1cm4gYXNzZXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5ld0xpbmVEZXRhaWxzKCk6IE9wZW5YREEuTGluZURldGFpbHtcbiAgICAgICAgbGV0IGFzc2V0OiBPcGVuWERBLkxpbmVEZXRhaWwgPSB7XG4gICAgICAgICAgICBMZW5ndGg6IDAsXG4gICAgICAgICAgICBYMDogMCxcbiAgICAgICAgICAgIFIwOiAwLFxuICAgICAgICAgICAgWDE6IDAsXG4gICAgICAgICAgICBSMTogMCxcbiAgICAgICAgICAgIFRoZXJtYWxSYXRpbmc6IDAsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXNzZXQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5ld0Fzc2V0QXR0cmlidXRlcyhhc3NldDogT3BlblhEQS5Bc3NldCwgdHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogT3BlblhEQS5DYXBCYW5rUmVsYXkgfCBPcGVuWERBLkJyZWFrZXIgfCBPcGVuWERBLkJ1cyB8IE9wZW5YREEuQ2FwQmFuayB8IE9wZW5YREEuTGluZSB8IE9wZW5YREEuTGluZVNlZ21lbnQgfCBPcGVuWERBLlRyYW5zZm9ybWVyIHtcbiAgICAgICAgaWYgKHR5cGUgPT0gJ0xpbmUnKSB7XG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5MaW5lO1xuICAgICAgICAgICAgcmVjb3JkLk1heEZhdWx0RGlzdGFuY2UgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLk1pbkZhdWx0RGlzdGFuY2UgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLkRldGFpbCA9IHRoaXMuZ2V0TmV3QXNzZXQoJ0xpbmVTZWdtZW50JykgYXMgT3BlblhEQS5MaW5lU2VnbWVudDtcblxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdCcmVha2VyJykge1xuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcjtcbiAgICAgICAgICAgIHJlY29yZC5UaGVybWFsUmF0aW5nID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5TcGVlZCA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuVHJpcFRpbWUgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLlBpY2t1cFRpbWUgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLlRyaXBDb2lsQ29uZGl0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnQnVzJykge1xuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuQnVzO1xuICAgICAgICAgICAgcmV0dXJuIHJlY29yZFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ0NhcGFjaXRvckJhbmtSZWxheScpIHtcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBhc3NldCBhcyBPcGVuWERBLkNhcEJhbmtSZWxheTtcbiAgICAgICAgICAgIHJldHVybiByZWNvcmRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdDYXBhY2l0b3JCYW5rJykge1xuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuQ2FwQmFuaztcbiAgICAgICAgICAgIHJlY29yZC5OdW1iZXJPZkJhbmtzID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5DYXBhY2l0YW5jZVBlckJhbmsgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ0xpbmVTZWdtZW50Jykge1xuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuTGluZVNlZ21lbnQ7XG4gICAgICAgICAgICByZWNvcmQuUjAgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLlgwID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5SMSA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuWDEgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLlRoZXJtYWxSYXRpbmcgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLkxlbmd0aCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5UcmFuc2Zvcm1lcjtcbiAgICAgICAgICAgIHJlY29yZC5SMCA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuWDAgPSBudWxsO1xuICAgICAgICAgICAgcmVjb3JkLlIxID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5YMSA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuVGhlcm1hbFJhdGluZyA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuUHJpbWFyeVZvbHRhZ2VLViA9IG51bGw7XG4gICAgICAgICAgICByZWNvcmQuU2Vjb25kYXJ5Vm9sdGFnZUtWID0gbnVsbDtcbiAgICAgICAgICAgIHJlY29yZC5UYXAgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHJlY29yZFxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIHN0YXRpYyBpc0ludGVnZXIodmFsdWU6IGFueSkge1xuICAgICAgICB2YXIgcmVnZXggPSAvXi0/WzAtOV0rJC87XG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLm1hdGNoKHJlZ2V4KSAhPSBudWxsO1xuICAgIH1cbiAgICBzdGF0aWMgaXNSZWFsTnVtYmVyKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdmFyIHJlZ2V4ID0gL14tP1swLTldKyhcXC5bMC05XSspPyQvO1xuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS5tYXRjaChyZWdleCkgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBjaGFuZ2VBc3NldFR5cGUodHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogdm9pZCB7XG4gICAgICAgIGxldCBhc3NldCA9IHtcbiAgICAgICAgICAgIElEOiB0aGlzLnByb3BzLkFzc2V0LklELFxuICAgICAgICAgICAgQXNzZXRLZXk6IHRoaXMucHJvcHMuQXNzZXQuQXNzZXRLZXksXG4gICAgICAgICAgICBBc3NldE5hbWU6IHRoaXMucHJvcHMuQXNzZXQuQXNzZXROYW1lLFxuICAgICAgICAgICAgQXNzZXRUeXBlOiB0eXBlLFxuICAgICAgICAgICAgRGVzY3JpcHRpb246IHRoaXMucHJvcHMuQXNzZXQuRGVzY3JpcHRpb24sXG4gICAgICAgICAgICBWb2x0YWdlS1Y6IHRoaXMucHJvcHMuQXNzZXQuVm9sdGFnZUtWLFxuICAgICAgICAgICAgQ2hhbm5lbHM6IHRoaXMucHJvcHMuQXNzZXQuQ2hhbm5lbHMsXG4gICAgICAgICAgICBTcGFyZTogdGhpcy5wcm9wcy5Bc3NldC5TcGFyZVxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXQgPSBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXRBdHRyaWJ1dGVzKGFzc2V0LCB0eXBlKTtcbiAgICAgICAgYXNzZXRbJ0Fzc2V0VHlwZUlEJ10gPSB0aGlzLnByb3BzLkFzc2V0VHlwZXMuZmluZChhdHMgPT4gYXRzLk5hbWUgPT0gdHlwZSkuSUQ7XG4gICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoYXNzZXQpO1xuICAgIH1cblxuICAgIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5Bc3NldCkpOiBib29sZWFuIHsgICAgICAgXG4gICAgICAgIGlmIChmaWVsZCA9PSAnQXNzZXRLZXknKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5Bc3NldC5Bc3NldEtleSA9PSBudWxsIHx8IHRoaXMucHJvcHMuQXNzZXQuQXNzZXRLZXkubGVuZ3RoID09IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucHJvcHMuTmV3RWRpdCA9PSAnTmV3Jykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLkFzc2V0LklEID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuQWxsQXNzZXRzLm1hcChhc3NldCA9PiBhc3NldC5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKS5pbmRleE9mKHRoaXMucHJvcHMuQXNzZXQuQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkgPCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Fzc2V0TmFtZScpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5Bc3NldC5Bc3NldE5hbWUgIT0gbnVsbCAmJiB0aGlzLnByb3BzLkFzc2V0LkFzc2V0TmFtZS5sZW5ndGggPiAwO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVm9sdGFnZUtWJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLkFzc2V0LlZvbHRhZ2VLViAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIodGhpcy5wcm9wcy5Bc3NldC5Wb2x0YWdlS1YpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRGVzY3JpcHRpb24nKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLkFzc2V0ID09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIiBoaWRkZW49e3RoaXMucHJvcHMuTmV3RWRpdCA9PSAnRWRpdCcgfHwgdGhpcy5wcm9wcy5IaWRlU2VsZWN0QXNzZXQgPT0gdHJ1ZX0+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5TZWxlY3QgQXNzZXQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnByb3BzLkFzc2V0LklELnRvU3RyaW5nKCl9IGRpc2FibGVkPXt0aGlzLnByb3BzLk5ld0VkaXQgPT0gJ0VkaXQnfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCIwXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5HZXREaWZmZXJlbnRBc3NldChwYXJzZUludChldnQudGFyZ2V0LnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZShBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSk7XG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9ezB9IHZhbHVlPVwiMFwiPkFkZCBOZXc8L29wdGlvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuQWxsQXNzZXRzLm1hcCgoYXNzZXQsIGluZGV4KSA9PiA8b3B0aW9uIGtleT17aW5kZXggKyAxfSB2YWx1ZT17YXNzZXQuSUR9ID57YXNzZXQuQXNzZXRLZXl9PC9vcHRpb24+KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5UeXBlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5wcm9wcy5Bc3NldC5Bc3NldFR5cGV9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUFzc2V0VHlwZShldnQudGFyZ2V0LnZhbHVlIGFzICdMaW5lJyB8ICdMaW5lU2VnbWVudCcgfCAnQnJlYWtlcicgfCAnQnVzJyB8ICdDYXBhY2l0b3JCYW5rJyB8ICdUcmFuc2Zvcm1lcicgfCAnQ2FwYWNpdG9yQmFua1JlbGF5JylcbiAgICAgICAgICAgICAgICAgICAgfX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuTmV3RWRpdCA9PSAnRWRpdCcgfHwgdGhpcy5wcm9wcy5Bc3NldC5JRCAhPSAwfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkFzc2V0VHlwZXMubWFwKGFzc2V0VHlwZSA9PiA8b3B0aW9uIHZhbHVlPXthc3NldFR5cGUuTmFtZX0ga2V5PXthc3NldFR5cGUuSUR9IGhpZGRlbj17YXNzZXRUeXBlLk5hbWUgPT0gJ0xpbmVTZWdtZW50J30+e2Fzc2V0VHlwZS5OYW1lfTwvb3B0aW9uPilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Bc3NldD4gUmVjb3JkPXt0aGlzLnByb3BzLkFzc2V0fSBGaWVsZD17J0Fzc2V0S2V5J30gTGFiZWw9eydLZXknfSBGZWVkYmFjaz17J0EgdW5pcXVlIGtleSBvZiBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycyBpcyByZXF1aXJlZC4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXt0aGlzLnByb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17dGhpcy5wcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHRoaXMucHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQXNzZXQ+IFJlY29yZD17dGhpcy5wcm9wcy5Bc3NldH0gRmllbGQ9eydBc3NldE5hbWUnfSBMYWJlbD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGFuZCBpcyByZXF1aXJlZC4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXt0aGlzLnByb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17dGhpcy5wcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHRoaXMucHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQXNzZXQ+IFJlY29yZD17dGhpcy5wcm9wcy5Bc3NldH0gRmllbGQ9eydWb2x0YWdlS1YnfSBMYWJlbD17J05vbWluYWwgVm9sdGFnZSAoa1YpJ30gRmVlZGJhY2s9eydOb21pbmFsIFZvbHRhZ2UgcmVxdWlyZXMgYSBudW1lcmljYWwgdmFsdWUuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy5wcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3RoaXMucHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiB0aGlzLnByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgPEZvcm1UZXh0QXJlYTxPcGVuWERBLkFzc2V0PiBSb3dzPXszfSBSZWNvcmQ9e3RoaXMucHJvcHMuQXNzZXR9IEZpZWxkPXsnRGVzY3JpcHRpb24nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXt0aGlzLnByb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17dGhpcy5wcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHRoaXMucHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICApO1xuICAgIH1cbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgRm9ybUlucHV0LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSW5wdXQ8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IFQsIEZpZWxkOiBrZXlvZiAoVCksIFNldHRlcjogKHJlY29yZDogVCkgPT4gdm9pZCwgVmFsaWQ6IChmaWVsZDoga2V5b2YgKFQpKSA9PiBib29sZWFuLCBMYWJlbD86IHN0cmluZywgRmVlZGJhY2s/OiBzdHJpbmcsIERpc2FibGVkPzogYm9vbGVhbiB9LCB7fSwge30+e1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPnt0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXsodGhpcy5wcm9wcy5WYWxpZCh0aGlzLnByb3BzLkZpZWxkKSA/IFwiZm9ybS1jb250cm9sXCIgOiBcImZvcm0tY29udHJvbCBpcy1pbnZhbGlkXCIpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZDogVCA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LnZhbHVlIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9PSBudWxsID8gJycgOiB0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXS50b1N0cmluZygpfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkIH0gLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ludmFsaWQtZmVlZGJhY2snPnt0aGlzLnByb3BzLkZlZWRiYWNrID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkICsgJyBpcyBhIHJlcXVpcmVkIGZpZWxkLicgOiB0aGlzLnByb3BzLkZlZWRiYWNrfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgRm9ybVRleHRBcmVhLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1UZXh0QXJlYTxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJvd3M6IG51bWJlciwgUmVjb3JkOiBULCBGaWVsZDoga2V5b2YgKFQpLCBTZXR0ZXI6IChyZWNvcmQ6IFQpID0+IHZvaWQsIFZhbGlkOiAoZmllbGQ6IGtleW9mIChUKSkgPT4gYm9vbGVhbiwgTGFiZWw/OiBzdHJpbmcsIEZlZWRiYWNrPzogc3RyaW5nLCBEaXNhYmxlZD86IGJvb2xlYW4gfSwge30sIHt9PntcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD57dGhpcy5wcm9wcy5MYWJlbCA9PSBudWxsID8gdGhpcy5wcm9wcy5GaWVsZCA6IHRoaXMucHJvcHMuTGFiZWx9PC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9e3RoaXMucHJvcHMuUm93c30gY2xhc3NOYW1lPXsodGhpcy5wcm9wcy5WYWxpZCh0aGlzLnByb3BzLkZpZWxkKSA/IFwiZm9ybS1jb250cm9sXCIgOiBcImZvcm0tY29udHJvbCBpcy1pbnZhbGlkXCIpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZDogVCA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LnZhbHVlIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9PSBudWxsID8gJycgOiB0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXS50b1N0cmluZygpfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkfS8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdpbnZhbGlkLWZlZWRiYWNrJz57dGhpcy5wcm9wcy5GZWVkYmFjayA9PSBudWxsID8gdGhpcy5wcm9wcy5GaWVsZCArICcgaXMgYSByZXF1aXJlZCBmaWVsZC4nIDogdGhpcy5wcm9wcy5GZWVkYmFja308L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9