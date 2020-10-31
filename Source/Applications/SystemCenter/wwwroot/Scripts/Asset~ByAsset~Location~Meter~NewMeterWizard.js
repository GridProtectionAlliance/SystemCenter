(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Asset~ByAsset~Location~Meter~NewMeterWizard"],{

/***/ "./TS/Services/Asset.ts":
/*!******************************!*\
  !*** ./TS/Services/Asset.ts ***!
  \******************************/
/*! exports provided: getSpareBreakersForSubstation, getAssetTypes, getAllAssets, getAsset, getAssetWithAdditionalFields, editExistingAsset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSpareBreakersForSubstation", function() { return getSpareBreakersForSubstation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAssetTypes", function() { return getAssetTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllAssets", function() { return getAllAssets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAsset", function() { return getAsset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAssetWithAdditionalFields", function() { return getAssetWithAdditionalFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editExistingAsset", function() { return editExistingAsset; });
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
function getSpareBreaker(breaker) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/OpenXDA/Breaker/" + breaker.ID + "/SpareBreaker",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    }).promise();
}
function getLocationForBreaker(breaker) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/OpenXDA/Breaker/" + breaker.ID + "/Location",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    }).promise();
}
function getSparesForLocation(location) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/OpenXDA/Breaker/SpareBreakers/Substation/" + location.ID,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    }).promise();
}
function getSpareBreakersForSubstation(breaker) {
    return __awaiter(this, void 0, void 0, function () {
        var location, spares;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLocationForBreaker(breaker)];
                case 1:
                    location = _a.sent();
                    if (location == null)
                        return [2 /*return*/, []];
                    return [4 /*yield*/, getSparesForLocation(location)];
                case 2:
                    spares = _a.sent();
                    return [2 /*return*/, spares];
            }
        });
    });
}
function getAssetTypes() {
    return $.ajax({
        type: "GET",
        url: homePath + "api/OpenXDA/AssetType",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}
function getAllAssets() {
    return $.ajax({
        type: "GET",
        url: homePath + "api/OpenXDA/Asset",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        async: true
    });
}
function getAsset(assetID, assetType) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/OpenXDA/" + assetType + "/One/" + assetID,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    });
}
function getAssetWithAdditionalFields(assetID, assetType) {
    return __awaiter(this, void 0, void 0, function () {
        var asset, eDNAPoint, spareBreaker, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getAsset(assetID, assetType)];
                case 1:
                    asset = _c.sent();
                    asset.AssetType = assetType;
                    asset.Channels = [];
                    if (!(assetType == 'Breaker')) return [3 /*break*/, 5];
                    return [4 /*yield*/, getEDNAPoint(asset)];
                case 2:
                    eDNAPoint = _c.sent();
                    if (eDNAPoint != null)
                        asset['EDNAPoint'] = eDNAPoint.Point;
                    else
                        asset['EDNAPoint'] = null;
                    return [4 /*yield*/, getSpareBreaker(asset)];
                case 3: return [4 /*yield*/, _c.sent()];
                case 4:
                    spareBreaker = _c.sent();
                    if (spareBreaker != null)
                        asset['SpareBreakerID'] = spareBreaker.ID;
                    else
                        asset['SpareBreakerID'] = null;
                    return [3 /*break*/, 7];
                case 5:
                    if (!(assetType == 'Line')) return [3 /*break*/, 7];
                    _a = asset;
                    _b = 'Detail';
                    return [4 /*yield*/, getLineDetails(asset)];
                case 6:
                    _a[_b] = _c.sent();
                    _c.label = 7;
                case 7: return [2 /*return*/, asset];
            }
        });
    });
}
function getEDNAPoint(breaker) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/OpenXDA/Breaker/" + breaker.ID + "/EDNAPoint",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    }).promise();
}
function getLineDetails(line) {
    return $.ajax({
        type: "GET",
        url: homePath + "api/OpenXDA/Line/" + line.ID + "/LineSegment",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: true,
        async: true
    }).promise();
}
function editExistingAsset(asset) {
    return $.ajax({
        type: "POST",
        url: homePath + "api/OpenXDA/Asset/Edit",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({ Asset: asset }),
        cache: false,
        async: true
    }).promise();
}


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/Breaker.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/Breaker.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CommonComponents/FormCheckBox */ "./TSX/SystemCenter/CommonComponents/FormCheckBox.tsx");
/* harmony import */ var _TS_Services_Asset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../TS/Services/Asset */ "./TS/Services/Asset.ts");
//******************************************************************************************************
//  Breaker.tsx - Gbtc
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






function BreakerAttributes(props) {
    function valid(field) {
        if (field == 'ThermalRating')
            return props.Asset.ThermalRating != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.ThermalRating);
        else if (field == 'Speed')
            return props.Asset.Speed != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Speed);
        else if (field == 'TripTime')
            return props.Asset.TripTime == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.TripTime);
        else if (field == 'PickupTime')
            return props.Asset.PickupTime == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.PickupTime);
        else if (field == 'TripCoilCondition')
            return props.Asset.TripCoilCondition == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.TripCoilCondition);
        else if (field == 'EDNAPoint')
            return true;
        else if (field == 'Spare')
            return true;
        else if (field == 'SpareBreakerID')
            return true;
        return false;
    }
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), spares = _a[0], setSpares = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_5__["getSpareBreakersForSubstation"])(props.Asset).then(function (sps) {
            setSpares(sps);
        });
    }, [props.Asset]);
    if (props.Asset == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'ThermalRating', Label: 'Thermal Rating', Feedback: 'Thermal rating is a required numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Speed', Feedback: 'Speed is a required numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'TripTime', Label: 'Trip Time', Feedback: 'Trip Time is an integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'PickupTime', Label: 'Pickup Time', Feedback: 'Pickup Time is an integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'TripCoilCondition', Label: 'Trip Coil Condition', Feedback: 'Trip Coil Condition is an numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'EDNAPoint', Label: 'EDNA Point', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group", hidden: props.ShowSpare != true },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Spare Breaker"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: props.Asset.SpareBreakerID == null ? 0 : props.Asset.SpareBreakerID, onChange: function (evt) {
                    var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Asset);
                    if (evt.target.value == '0')
                        record.SpareBreakerID = null;
                    else
                        record.SpareBreakerID = parseInt(evt.target.value);
                    props.UpdateState(record);
                }, disabled: props.NewEdit == 'New' && props.Asset.ID != 0 },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: 0, key: 0 }, "None"),
                spares.map(function (spare) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: spare.ID, key: spare.ID }, spare.AssetKey); }))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormCheckBox__WEBPACK_IMPORTED_MODULE_4__["default"], { Record: props.Asset, Field: 'Spare', Label: 'Is Spare', Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 })));
}
/* harmony default export */ __webpack_exports__["default"] = (BreakerAttributes);


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/Bus.tsx":
/*!*************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/Bus.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
//******************************************************************************************************
//  Bus.tsx - Gbtc
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

function BusAttributes(props) {
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "No Additional Attributes");
}
/* harmony default export */ __webpack_exports__["default"] = (BusAttributes);


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/CapBank.tsx":
/*!*****************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/CapBank.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
//******************************************************************************************************
//  CapBank.tsx - Gbtc
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




function CapBankAttributes(props) {
    function valid(field) {
        if (field == 'NumberOfBanks')
            return props.Asset.NumberOfBanks != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.NumberOfBanks);
        else if (field == 'CapacitancePerBank')
            return props.Asset.CapacitancePerBank != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.CapacitancePerBank);
        else if (field == 'MaxKV')
            return props.Asset.MaxKV != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.MaxKV);
        else if (field == 'UnitKV')
            return props.Asset.UnitKV != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.UnitKV);
        else if (field == 'UnitKVAr')
            return props.Asset.UnitKVAr != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.UnitKVAr);
        else if (field == 'PosReactanceTol')
            return props.Asset.PosReactanceTol != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.PosReactanceTol);
        else if (field == 'NegReactanceTol')
            return props.Asset.NegReactanceTol != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.NegReactanceTol);
        else if (field == 'Nparalell')
            return props.Asset.Nparalell != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.Nparalell);
        else if (field == 'Nseries')
            return props.Asset.Nseries != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.Nseries);
        else if (field == 'NSeriesGroup')
            return props.Asset.NSeriesGroup != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.NSeriesGroup);
        else if (field == 'NParalellGroup')
            return props.Asset.NParalellGroup != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.NParalellGroup);
        else if (field == 'VTratioBus')
            return props.Asset.VTratioBus != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.VTratioBus);
        else if (field == 'NumberLVCaps')
            return props.Asset.NumberLVCaps != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.NumberLVCaps);
        else if (field == 'NumberLVUnits')
            return props.Asset.NumberLVUnits != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.NumberLVUnits);
        else if (field == 'LVKVAr')
            return props.Asset.LVKVAr != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.LVKVAr);
        else if (field == 'LVKV')
            return props.Asset.LVKV != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.LVKV);
        else if (field == 'LVNegReactanceTol')
            return props.Asset.LVNegReactanceTol != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.LVNegReactanceTol);
        else if (field == 'LVPosReactanceTol')
            return props.Asset.LVPosReactanceTol != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.LVPosReactanceTol);
        else if (field == 'UpperXFRRatio')
            return props.Asset.UpperXFRRatio != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.UpperXFRRatio);
        else if (field == 'LowerXFRRatio')
            return props.Asset.LowerXFRRatio != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.LowerXFRRatio);
        else if (field == 'Nshorted')
            return props.Asset.Nshorted != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Nshorted);
        else if (field == 'BlownFuses')
            return props.Asset.BlownFuses != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.BlownFuses);
        else if (field == 'BlownGroups')
            return props.Asset.BlownGroups != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.BlownGroups);
        else if (field == 'Rv')
            return props.Asset.Rv != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Rv);
        else if (field == 'Rh')
            return props.Asset.Rh != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Rh);
        else if (field == 'NLowerGroups')
            return props.Asset.NLowerGroups != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isInteger(props.Asset.NLowerGroups);
        else if (field == 'ShortedGroups')
            return props.Asset.ShortedGroups != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.ShortedGroups);
        return false;
    }
    if (props.Asset == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](DesignSelect, { Record: props.Asset, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](PreSwitchSelect, { Record: props.Asset, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NumberOfBanks', Label: 'Number Of Banks', Feedback: 'Number Of Banks is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'CapacitancePerBank', Label: 'Capacitor Step Size (kVAR)', Feedback: 'Capacitor Step Size is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'MaxKV', Label: 'Maximum Operating Voltage (kV)', Feedback: 'Maximum Operating Voltage is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'UnitKV', Label: 'Rated Voltage of a Unit (kV)', Feedback: 'Rated Voltage of a Unit is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'UnitKVAr', Label: 'Rating of a Unit (kVAR)', Feedback: 'Rating of a Unit is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'PosReactanceTol', Label: 'pos. Reactance Tolerance of a Unit (%)', Feedback: 'pos. Reactance Tolerance of a Unit is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NegReactanceTol', Label: 'neg. Reactance Tolerance of a Unit (%)', Feedback: 'neg. Reactance Tolerance of a Unit (%) is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Nparalell', Label: (props.Asset.Fused ? 'Num. of Units per group' : 'Num. of Parallel Strings'), Feedback: (props.Asset.Fused ? 'Num. of Caps. per group' : 'Num. of Parallel Strings') + ' is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Nseries', Label: (props.Asset.Fused ? 'Num. of Series Groups per Phase' : 'Num. Units in each String'), Feedback: (props.Asset.Fused ? 'Num. of Series Groups per Phase' : 'Num. Units in each String') + ' is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        (!props.Asset.Fused ?
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NSeriesGroup', Label: 'Num. of Series Groups in each Unit', Feedback: 'Num. of Series Groups in each Unit is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NParalellGroup', Label: 'Num. of Elements in each Group', Feedback: 'Num. of Elements in each Group is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 })) : null),
        (props.Asset.Fused ?
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'UpperXFRRatio', Label: 'Upper Group VT Ratio', Feedback: 'Upper Group VT Ratio is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LowerXFRRatio', Label: 'Lower Group VT Ratio', Feedback: 'Lower Group VT Ratio is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Nshorted', Label: 'Initial guess of shorted groups', Feedback: 'Initial guess of shorted groups is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'BlownFuses', Label: 'Initial Guess of blown fuses per group', Feedback: 'Initial Guess of blown fuses per group is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'BlownGroups', Label: 'Initial guess of Groups with blown Fuse', Feedback: 'Initial guess of Groups with blown Fuse is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'ShortedGroups', Label: 'Initial guess of Groups with blown Fuse', Feedback: 'Initial guess of shorted Groups required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 })) : react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'VTratioBus', Label: 'Bus VT Ratio', Feedback: 'Bus VT Ratio is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NumberLVCaps', Label: 'Num.of Relay Caps', Feedback: 'Num. of Relay Caps is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NumberLVUnits', Label: 'Num. of Elements per Relay Cap', Feedback: 'Num. of Elements per Relay Cap is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVKVAr', Label: 'Low Voltage Cap size (kVAR)', Feedback: 'Low Voltage Cap size is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVKV', Label: 'Low Volatage Cap rating (V)', Feedback: 'Low Volatage Cap rating is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVNegReactanceTol', Label: 'neg. Reactance Tolerance of LV Unit (%)', Feedback: 'neg. Reactance Tolerance of LV Unitis a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVPosReactanceTol', Label: 'pos. Reactance Tolerance of LV Unit (%)', Feedback: 'pos. Reactance Tolerance of LV Unit is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](PTRatioInput, { Record: props.Asset, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Rv', Label: 'Voltage Divider output R (Ohm)', Feedback: 'Voltage Divider output R is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Rh', Label: 'Voltage Divider input R', Feedback: 'Voltage Divider input R is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Nshorted', Label: 'Initial guess of shorted elements', Feedback: 'Initial guess of shorted elements is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 })))));
}
/* harmony default export */ __webpack_exports__["default"] = (CapBankAttributes);
var DesignSelect = /** @class */ (function (_super) {
    __extends(DesignSelect, _super);
    function DesignSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DesignSelect.prototype.computBools = function (selection) {
        var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.props.Record);
        if (selection == '0') {
            record.Compensated = true;
            record.Fused = false;
        }
        else if (selection == '1') {
            record.Compensated = false;
            record.Fused = false;
        }
        else if (selection == '2') {
            record.Compensated = false;
            record.Fused = true;
        }
        this.props.Setter(record);
    };
    DesignSelect.prototype.computeSelection = function (record) {
        if (record.Compensated)
            return "0";
        else if (!record.Fused)
            return "1";
        return "2";
    };
    DesignSelect.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Design"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: this.computeSelection(this.props.Record), disabled: this.props.Disabled == null ? false : this.props.Disabled, onChange: function (evt) { return _this.computBools(evt.target.value); } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: 0, value: "0" }, "Fuseless Compensated"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: 1, value: "1" }, "Fuseless Uncompensated"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: 2, value: "2" }, "Fused")));
    };
    return DesignSelect;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
var PTRatioInput = /** @class */ (function (_super) {
    __extends(PTRatioInput, _super);
    function PTRatioInput(props, context) {
        var _this = _super.call(this, props, context) || this;
        var regex = /^([0-9]+) ([0-9]+)$/;
        if (_this.props.Record.RelayPTRatio.match(regex) != null) {
            _this.state = { low: _this.props.Record.RelayPTRatio.match(regex)[1], high: _this.props.Record.RelayPTRatio.match(regex)[2] };
        }
        else {
            _this.state = { low: "", high: "" };
        }
        return _this;
    }
    PTRatioInput.prototype.updateValues = function (input) {
        input = input.trim();
        var regex = /^([0-9]+) ([0-9]+)$/;
        if (input.match(regex) != null) {
            this.setState({ low: input.match(regex)[1], high: input.match(regex)[2] });
        }
        else {
            this.setState({ low: "0", high: "100" });
        }
    };
    PTRatioInput.prototype.componentDidUpdate = function (prevprop, prevstate) {
        if (prevprop.Record.RelayPTRatio !== this.props.Record.RelayPTRatio) {
            this.updateValues(this.props.Record.RelayPTRatio);
        }
        if ((prevstate.low !== this.state.low || prevstate.high !== this.state.high) && this.isInteger(this.state.low) && this.isInteger(this.state.high)) {
            var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.props.Record);
            if (parseInt(this.state.low) > parseInt(this.state.high))
                record.RelayPTRatio = this.state.low.toString() + " " + this.state.high.toString();
            else
                record.RelayPTRatio = this.state.high.toString() + " " + this.state.low.toString();
            this.props.Setter(record);
        }
    };
    PTRatioInput.prototype.isInteger = function (value) {
        var regex = /^-?[0-9]+$/;
        return value.toString().match(regex) != null;
    };
    PTRatioInput.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Relay PT Ratio"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "input-group" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (this.isInteger(this.state.high) ? "form-control" : "form-control is-invalid"), onChange: function (evt) {
                        _this.setState({ high: evt.target.value });
                    }, value: this.state.high, disabled: this.props.Disabled == null ? false : this.props.Disabled }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (this.isInteger(this.state.low) ? "form-control" : "form-control is-invalid"), onChange: function (evt) {
                        _this.setState({ low: evt.target.value });
                    }, value: this.state.low, disabled: this.props.Disabled == null ? false : this.props.Disabled })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'invalid-feedback' }, " Relay PT Ratio is a required field."));
    };
    return PTRatioInput;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
var PreSwitchSelect = /** @class */ (function (_super) {
    __extends(PreSwitchSelect, _super);
    function PreSwitchSelect(props, context) {
        var _this = _super.call(this, props, context) || this;
        var numbers = _this.props.Record.CktSwitcher.trim().split(",");
        if (numbers.length !== parseInt(_this.props.Record.NumberOfBanks.toString()))
            numbers = Array.from(Array(parseInt(_this.props.Record.NumberOfBanks.toString())), function (e, i) { return '0'; });
        _this.state = { preSwitch: numbers.map(function (item) { return (item.trim() == '1' ? true : false); }) };
        return _this;
    }
    PreSwitchSelect.prototype.updateValues = function (input) {
        var numbers = input.trim().split(",");
        if (numbers.length !== parseInt(this.props.Record.NumberOfBanks.toString()))
            numbers = Array.from(Array(parseInt(this.props.Record.NumberOfBanks.toString())), function (e, i) { return '0'; });
        this.setState({ preSwitch: numbers.map(function (item) { return (item.trim() == '1' ? true : false); }) });
    };
    PreSwitchSelect.prototype.componentDidUpdate = function (prevprop, prevstate) {
        if (prevprop.Record.NumberOfBanks !== this.props.Record.NumberOfBanks || prevprop.Record.CktSwitcher !== this.props.Record.CktSwitcher) {
            this.updateValues(this.props.Record.CktSwitcher);
        }
        if (!lodash__WEBPACK_IMPORTED_MODULE_1__["isEqual"](prevstate, this.state)) {
            var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.props.Record);
            record.CktSwitcher = this.state.preSwitch.map(function (item) { return (item ? "1" : "0"); }).join(",");
            this.props.Setter(record);
        }
    };
    PreSwitchSelect.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "CapBank with Pre-insertion Switcher"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, this.state.preSwitch.map(function (v, i) {
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "from-check form-check-inline", key: i },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: "form-check-input", type: "checkbox", id: "inlineCheckbox-" + i, onChange: function (evt) {
                            var lst = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.preSwitch);
                            lst[i] = !lst[i];
                            _this.setState({ preSwitch: lst });
                        }, value: (v ? 1 : 0), disabled: _this.props.Disabled == null ? false : _this.props.Disabled }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: "form-check-label", htmlFor: "inlineCheckbox-" + i }, i + 1));
            })));
    };
    return PreSwitchSelect;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/Line.tsx":
/*!**************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/Line.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
//******************************************************************************************************
//  Line.tsx - Gbtc
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




function LineAttributes(props) {
    function valid(field) {
        if (field == 'MaxFaultDistance')
            return props.Asset.MaxFaultDistance == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.MaxFaultDistance);
        else if (field == 'MinFaultDistance')
            return props.Asset.MinFaultDistance == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.MinFaultDistance);
        else if (field == 'Length')
            return props.Asset.Detail.Length == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Detail.Length);
        else if (field == 'R0')
            return props.Asset.Detail.R0 == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Detail.R0);
        else if (field == 'X0')
            return props.Asset.Detail.X0 == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Detail.X0);
        else if (field == 'R1')
            return props.Asset.Detail.R1 == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Detail.R1);
        else if (field == 'X1')
            return props.Asset.Detail.X1 == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Detail.X1);
        else if (field == 'ThermalRating')
            return props.Asset.Detail.ThermalRating == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.Detail.ThermalRating);
        return false;
    }
    function updateLineDetail(record) {
        var asset = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Asset);
        asset.Detail = record;
        props.UpdateState(asset);
    }
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
    }, [props.Asset]);
    if (props.Asset == null || props.Asset.Detail == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'MaxFaultDistance', Label: 'Max Fault Distance', Feedback: 'Max Fault Distance is a numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'MinFaultDistance', Label: 'Min Fault Distance', Feedback: 'Min Fault Distance is a numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset.Detail, Field: 'Length', Feedback: 'Length is a required numeric field.', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset.Detail, Field: 'R0', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset.Detail, Field: 'X0', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset.Detail, Field: 'R1', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset.Detail, Field: 'X1', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset.Detail, Field: 'ThermalRating', Label: 'Thermal Rating', Valid: valid, Setter: updateLineDetail, Disabled: true })));
}
/* harmony default export */ __webpack_exports__["default"] = (LineAttributes);


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/Transformer.tsx":
/*!*********************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/Transformer.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
//******************************************************************************************************
//  Transformer.tsx - Gbtc
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



function TransformerAttributes(props) {
    function valid(field) {
        if (field == 'PrimaryVoltageKV')
            return props.Asset.PrimaryVoltageKV == null || _Asset__WEBPACK_IMPORTED_MODULE_1__["default"].isRealNumber(props.Asset.PrimaryVoltageKV);
        else if (field == 'SecondaryVoltageKV')
            return props.Asset.SecondaryVoltageKV == null || _Asset__WEBPACK_IMPORTED_MODULE_1__["default"].isRealNumber(props.Asset.SecondaryVoltageKV);
        else if (field == 'Tap')
            return props.Asset.Tap == null || _Asset__WEBPACK_IMPORTED_MODULE_1__["default"].isRealNumber(props.Asset.Tap);
        else if (field == 'R0')
            return props.Asset.R0 != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["default"].isRealNumber(props.Asset.R0);
        else if (field == 'X0')
            return props.Asset.X0 != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["default"].isRealNumber(props.Asset.X0);
        else if (field == 'R1')
            return props.Asset.R1 != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["default"].isRealNumber(props.Asset.R1);
        else if (field == 'X1')
            return props.Asset.X1 != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["default"].isRealNumber(props.Asset.X1);
        else if (field == 'ThermalRating')
            return props.Asset.ThermalRating != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["default"].isRealNumber(props.Asset.ThermalRating);
        return false;
    }
    if (props.Asset == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.Asset, Field: 'R0', Feedback: 'R0 is a required numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.Asset, Field: 'X0', Feedback: 'X0 is a required numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.Asset, Field: 'R1', Feedback: 'R1 is a required numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.Asset, Field: 'X1', Feedback: 'X1 is a required numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.Asset, Field: 'ThermalRating', Label: 'Thermal Rating', Feedback: 'Thermal Rating is a required numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.Asset, Field: 'PrimaryVoltageKV', Label: 'Primary Voltage (kV)', Feedback: 'Primary Voltage (kV) is a numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.Asset, Field: 'SecondaryVoltageKV', Label: 'Secondary Voltage (kV)', Feedback: 'Secondary Voltage (kV) is a numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.Asset, Field: 'Tap', Feedback: 'Tap is a numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 })));
}
/* harmony default export */ __webpack_exports__["default"] = (TransformerAttributes);


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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9TZXJ2aWNlcy9Bc3NldC50cyIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXIudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvQnVzLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmsudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvTGluZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9UcmFuc2Zvcm1lci50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL0Zvcm1DaGVja0JveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkEsU0FBUyxlQUFlLENBQUMsT0FBd0I7SUFDN0MsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1YsSUFBSSxFQUFFLEtBQUs7UUFDWCxHQUFHLEVBQUssUUFBUSw0QkFBdUIsT0FBTyxDQUFDLEVBQUUsa0JBQWU7UUFDaEUsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxRQUFRLEVBQUUsTUFBTTtRQUNoQixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLE9BQXdCO0lBQ25ELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFLLFFBQVEsNEJBQXVCLE9BQU8sQ0FBQyxFQUFFLGNBQVc7UUFDNUQsV0FBVyxFQUFFLGlDQUFpQztRQUM5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aW9ufk1ldGVyfk5ld01ldGVyV2l6YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBBc3NldFNlcnZpY2VzLnRzIC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzIzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tIFwiLi4vLi4vVFNYL1N5c3RlbUNlbnRlci9nbG9iYWxcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gXCIuLi8uLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0Fzc2V0XCI7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFNwYXJlQnJlYWtlcihicmVha2VyOiBPcGVuWERBLkJyZWFrZXIpOiBQcm9taXNlPE9wZW5YREEuQnJlYWtlcj4ge1xyXG4gICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0JyZWFrZXIvJHticmVha2VyLklEfS9TcGFyZUJyZWFrZXJgLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExvY2F0aW9uRm9yQnJlYWtlcihicmVha2VyOiBPcGVuWERBLkJyZWFrZXIpOiBQcm9taXNlPE9wZW5YREEuTG9jYXRpb24+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9CcmVha2VyLyR7YnJlYWtlci5JRH0vTG9jYXRpb25gLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcblxyXG59XHJcbmZ1bmN0aW9uIGdldFNwYXJlc0ZvckxvY2F0aW9uKGxvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uKTogUHJvbWlzZTxBcnJheTxPcGVuWERBLkJyZWFrZXI+PiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQnJlYWtlci9TcGFyZUJyZWFrZXJzL1N1YnN0YXRpb24vJHtsb2NhdGlvbi5JRH1gLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3BhcmVCcmVha2Vyc0ZvclN1YnN0YXRpb24oYnJlYWtlcjogT3BlblhEQS5CcmVha2VyKTogUHJvbWlzZTxBcnJheTxPcGVuWERBLkJyZWFrZXI+PiB7XHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IGF3YWl0IGdldExvY2F0aW9uRm9yQnJlYWtlcihicmVha2VyKTtcclxuICAgIGlmIChsb2NhdGlvbiA9PSBudWxsKSByZXR1cm4gW107XHJcbiAgICBjb25zdCBzcGFyZXMgPSBhd2FpdCBnZXRTcGFyZXNGb3JMb2NhdGlvbihsb2NhdGlvbik7XHJcbiAgICByZXR1cm4gc3BhcmVzXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXNzZXRUeXBlcygpOiBKUXVlcnlYSFIge1xyXG4gICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0VHlwZWAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsQXNzZXRzKCk6IEpRdWVyeVhIUntcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRgLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBc3NldChhc3NldElEOiBudW1iZXIsIGFzc2V0VHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogUHJvbWlzZTxPcGVuWERBLkFzc2V0PiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvJHthc3NldFR5cGV9L09uZS8ke2Fzc2V0SUR9YCxcclxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBc3NldFdpdGhBZGRpdGlvbmFsRmllbGRzKGFzc2V0SUQ6IG51bWJlciwgYXNzZXRUeXBlOiBPcGVuWERBLkFzc2V0VHlwZU5hbWUpOiBQcm9taXNlPE9wZW5YREEuQXNzZXQ+IHtcclxuICAgIHZhciBhc3NldCA9IGF3YWl0IGdldEFzc2V0KGFzc2V0SUQsIGFzc2V0VHlwZSk7XHJcbiAgICBhc3NldC5Bc3NldFR5cGUgPSBhc3NldFR5cGU7XHJcbiAgICBhc3NldC5DaGFubmVscyA9IFtdO1xyXG5cclxuICAgIGlmIChhc3NldFR5cGUgPT0gJ0JyZWFrZXInKSB7XHJcbiAgICAgICAgY29uc3QgZUROQVBvaW50ID0gYXdhaXQgZ2V0RUROQVBvaW50KGFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcilcclxuICAgICAgICBpZiAoZUROQVBvaW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgIGFzc2V0WydFRE5BUG9pbnQnXSA9IGVETkFQb2ludC5Qb2ludDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFzc2V0WydFRE5BUG9pbnQnXSA9IG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IHNwYXJlQnJlYWtlciA9IGF3YWl0IGF3YWl0IGdldFNwYXJlQnJlYWtlcihhc3NldCBhcyBPcGVuWERBLkJyZWFrZXIpXHJcbiAgICAgICAgaWYgKHNwYXJlQnJlYWtlciAhPSBudWxsKVxyXG4gICAgICAgICAgICBhc3NldFsnU3BhcmVCcmVha2VySUQnXSA9IHNwYXJlQnJlYWtlci5JRDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGFzc2V0WydTcGFyZUJyZWFrZXJJRCddID0gbnVsbDtcclxuICAgIH0gICBcclxuICAgIGVsc2UgaWYgKGFzc2V0VHlwZSA9PSAnTGluZScpXHJcbiAgICAgICAgYXNzZXRbJ0RldGFpbCddID0gYXdhaXQgZ2V0TGluZURldGFpbHMoYXNzZXQgYXMgT3BlblhEQS5MaW5lKTtcclxuXHJcbiAgICByZXR1cm4gYXNzZXQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEVETkFQb2ludChicmVha2VyOiBPcGVuWERBLkJyZWFrZXIpOiBQcm9taXNlPE9wZW5YREEuRUROQVBvaW50PiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQnJlYWtlci8ke2JyZWFrZXIuSUR9L0VETkFQb2ludGAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TGluZURldGFpbHMobGluZTogT3BlblhEQS5MaW5lKTogUHJvbWlzZTxPcGVuWERBLkxpbmVEZXRhaWw+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9MaW5lLyR7bGluZS5JRH0vTGluZVNlZ21lbnRgLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICB9KS5wcm9taXNlKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZWRpdEV4aXN0aW5nQXNzZXQoYXNzZXQ6IE9wZW5YREEuQXNzZXQpOiBQcm9taXNlPE9wZW5YREEuQXNzZXQ+IHtcclxuICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldC9FZGl0YCxcclxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IEFzc2V0OiBhc3NldCB9KSxcclxuICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxuXHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBCcmVha2VyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi9Bc3NldCc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5pbXBvcnQgRm9ybUNoZWNrQm94IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUNoZWNrQm94JztcclxuaW1wb3J0IHsgZ2V0U3BhcmVCcmVha2Vyc0ZvclN1YnN0YXRpb24gfSBmcm9tICcuLi8uLi8uLi9UUy9TZXJ2aWNlcy9Bc3NldCc7XHJcblxyXG5mdW5jdGlvbiBCcmVha2VyQXR0cmlidXRlcyhwcm9wczogeyBOZXdFZGl0OiBTeXN0ZW1DZW50ZXIuTmV3RWRpdCwgQXNzZXQ6IE9wZW5YREEuQnJlYWtlciwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnJlYWtlcikgPT4gdm9pZCwgU2hvd1NwYXJlPzogYm9vbGVhbiB9KTogSlNYLkVsZW1lbnQge1xyXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mKE9wZW5YREEuQnJlYWtlcikpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ1RoZXJtYWxSYXRpbmcnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVGhlcm1hbFJhdGluZyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVGhlcm1hbFJhdGluZyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1NwZWVkJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlNwZWVkICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5TcGVlZCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1RyaXBUaW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlRyaXBUaW1lID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5UcmlwVGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1BpY2t1cFRpbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUGlja3VwVGltZSA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuUGlja3VwVGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1RyaXBDb2lsQ29uZGl0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlRyaXBDb2lsQ29uZGl0aW9uID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5UcmlwQ29pbENvbmRpdGlvbik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0VETkFQb2ludCcpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTcGFyZScpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTcGFyZUJyZWFrZXJJRCcpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IFtzcGFyZXMsIHNldFNwYXJlc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkJyZWFrZXI+PihbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXRTcGFyZUJyZWFrZXJzRm9yU3Vic3RhdGlvbihwcm9wcy5Bc3NldCkudGhlbihzcHMgPT4ge1xyXG4gICAgICAgICAgICBzZXRTcGFyZXMoc3BzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sIFtwcm9wcy5Bc3NldF0pO1xyXG5cclxuICAgIGlmIChwcm9wcy5Bc3NldCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkJyZWFrZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVGhlcm1hbFJhdGluZyd9IExhYmVsPXsnVGhlcm1hbCBSYXRpbmcnfSBGZWVkYmFjaz17J1RoZXJtYWwgcmF0aW5nIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXsgcHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydTcGVlZCd9IEZlZWRiYWNrPXsnU3BlZWQgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkJyZWFrZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVHJpcFRpbWUnfSBMYWJlbD17J1RyaXAgVGltZSd9IEZlZWRiYWNrPXsnVHJpcCBUaW1lIGlzIGFuIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydQaWNrdXBUaW1lJ30gTGFiZWw9eydQaWNrdXAgVGltZSd9IEZlZWRiYWNrPXsnUGlja3VwIFRpbWUgaXMgYW4gaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1RyaXBDb2lsQ29uZGl0aW9uJ30gTGFiZWw9eydUcmlwIENvaWwgQ29uZGl0aW9uJ30gRmVlZGJhY2s9eydUcmlwIENvaWwgQ29uZGl0aW9uIGlzIGFuIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydFRE5BUG9pbnQnfSBMYWJlbD17J0VETkEgUG9pbnQnfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIiBoaWRkZW49e3Byb3BzLlNob3dTcGFyZSAhPSB0cnVlfT5cclxuICAgICAgICAgICAgICAgIDxsYWJlbD5TcGFyZSBCcmVha2VyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3Byb3BzLkFzc2V0LlNwYXJlQnJlYWtlcklEID09IG51bGwgPyAwIDogcHJvcHMuQXNzZXQuU3BhcmVCcmVha2VySUR9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZDogT3BlblhEQS5CcmVha2VyID0gXy5jbG9uZShwcm9wcy5Bc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgPT0gJzAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQuU3BhcmVCcmVha2VySUQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLlNwYXJlQnJlYWtlcklEID0gcGFyc2VJbnQoZXZ0LnRhcmdldC52YWx1ZSBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHJlY29yZClcclxuICAgICAgICAgICAgICAgIH19IGRpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezB9IGtleT17MH0gPk5vbmU8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXJlcy5tYXAoc3BhcmUgPT4gPG9wdGlvbiB2YWx1ZT17c3BhcmUuSUR9IGtleT17c3BhcmUuSUR9ID57c3BhcmUuQXNzZXRLZXl9PC9vcHRpb24+KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxGb3JtQ2hlY2tCb3g8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1NwYXJlJ30gTGFiZWw9eydJcyBTcGFyZSd9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgIDwvPlxyXG4gICAgKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJyZWFrZXJBdHRyaWJ1dGVzOyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBCdXMudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzE3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmZ1bmN0aW9uIEJ1c0F0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkJ1cywgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnVzKSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICByZXR1cm4gPHNwYW4+Tm8gQWRkaXRpb25hbCBBdHRyaWJ1dGVzPC9zcGFuPjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVzQXR0cmlidXRlczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQ2FwQmFuay50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4vQXNzZXQnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuaW1wb3J0IEZvcm1DaGVja0JveCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1DaGVja0JveCc7XHJcbmZ1bmN0aW9uIENhcEJhbmtBdHRyaWJ1dGVzKHByb3BzOiB7IE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LCBBc3NldDogT3BlblhEQS5DYXBCYW5rLCBVcGRhdGVTdGF0ZTogKG5ld0VkaXRBc3NldDogT3BlblhEQS5DYXBCYW5rKSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuQ2FwQmFuaykpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ051bWJlck9mQmFua3MnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTnVtYmVyT2ZCYW5rcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTnVtYmVyT2ZCYW5rcyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0NhcGFjaXRhbmNlUGVyQmFuaycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5DYXBhY2l0YW5jZVBlckJhbmsgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkNhcGFjaXRhbmNlUGVyQmFuayk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01heEtWJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk1heEtWICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5NYXhLVik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1VuaXRLVicpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Vbml0S1YgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlVuaXRLVik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1VuaXRLVkFyJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlVuaXRLVkFyICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5Vbml0S1ZBcik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Bvc1JlYWN0YW5jZVRvbCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Qb3NSZWFjdGFuY2VUb2wgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlBvc1JlYWN0YW5jZVRvbCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05lZ1JlYWN0YW5jZVRvbCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OZWdSZWFjdGFuY2VUb2wgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0Lk5lZ1JlYWN0YW5jZVRvbCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05wYXJhbGVsbCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OcGFyYWxlbGwgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk5wYXJhbGVsbCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05zZXJpZXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTnNlcmllcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTnNlcmllcyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05TZXJpZXNHcm91cCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OU2VyaWVzR3JvdXAgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk5TZXJpZXNHcm91cCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05QYXJhbGVsbEdyb3VwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5QYXJhbGVsbEdyb3VwICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5OUGFyYWxlbGxHcm91cCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1ZUcmF0aW9CdXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVlRyYXRpb0J1cyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVlRyYXRpb0J1cyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ051bWJlckxWQ2FwcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OdW1iZXJMVkNhcHMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk51bWJlckxWQ2Fwcyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ051bWJlckxWVW5pdHMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTnVtYmVyTFZVbml0cyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTnVtYmVyTFZVbml0cyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xWS1ZBcicpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5MVktWQXIgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkxWS1ZBcik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xWS1YnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTFZLViAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTFZLVik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xWTmVnUmVhY3RhbmNlVG9sJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkxWTmVnUmVhY3RhbmNlVG9sICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5MVk5lZ1JlYWN0YW5jZVRvbCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xWUG9zUmVhY3RhbmNlVG9sJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkxWUG9zUmVhY3RhbmNlVG9sICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5MVlBvc1JlYWN0YW5jZVRvbCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1VwcGVyWEZSUmF0aW8nKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVXBwZXJYRlJSYXRpbyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVXBwZXJYRlJSYXRpbyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xvd2VyWEZSUmF0aW8nKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTG93ZXJYRlJSYXRpbyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTG93ZXJYRlJSYXRpbyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05zaG9ydGVkJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5zaG9ydGVkICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5Oc2hvcnRlZCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Jsb3duRnVzZXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuQmxvd25GdXNlcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuQmxvd25GdXNlcyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Jsb3duR3JvdXBzJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkJsb3duR3JvdXBzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5CbG93bkdyb3Vwcyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1J2JylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlJ2ICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5Sdik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1JoJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlJoICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5SaCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05Mb3dlckdyb3VwcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OTG93ZXJHcm91cHMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk5Mb3dlckdyb3Vwcyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Nob3J0ZWRHcm91cHMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuU2hvcnRlZEdyb3VwcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuU2hvcnRlZEdyb3Vwcyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKHByb3BzLkFzc2V0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8RGVzaWduU2VsZWN0IFJlY29yZD17cHJvcHMuQXNzZXR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxQcmVTd2l0Y2hTZWxlY3QgUmVjb3JkPXtwcm9wcy5Bc3NldH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J051bWJlck9mQmFua3MnfSBMYWJlbD17J051bWJlciBPZiBCYW5rcyd9IEZlZWRiYWNrPXsnTnVtYmVyIE9mIEJhbmtzIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0NhcGFjaXRhbmNlUGVyQmFuayd9IExhYmVsPXsnQ2FwYWNpdG9yIFN0ZXAgU2l6ZSAoa1ZBUiknfSBGZWVkYmFjaz17J0NhcGFjaXRvciBTdGVwIFNpemUgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydNYXhLVid9IExhYmVsPXsnTWF4aW11bSBPcGVyYXRpbmcgVm9sdGFnZSAoa1YpJ30gRmVlZGJhY2s9eydNYXhpbXVtIE9wZXJhdGluZyBWb2x0YWdlIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydVbml0S1YnfSBMYWJlbD17J1JhdGVkIFZvbHRhZ2Ugb2YgYSBVbml0IChrViknfSBGZWVkYmFjaz17J1JhdGVkIFZvbHRhZ2Ugb2YgYSBVbml0IGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVW5pdEtWQXInfSBMYWJlbD17J1JhdGluZyBvZiBhIFVuaXQgKGtWQVIpJ30gRmVlZGJhY2s9eydSYXRpbmcgb2YgYSBVbml0IGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydQb3NSZWFjdGFuY2VUb2wnfSBMYWJlbD17J3Bvcy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBhIFVuaXQgKCUpJ30gRmVlZGJhY2s9eydwb3MuIFJlYWN0YW5jZSBUb2xlcmFuY2Ugb2YgYSBVbml0IGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOZWdSZWFjdGFuY2VUb2wnfSBMYWJlbD17J25lZy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBhIFVuaXQgKCUpJ30gRmVlZGJhY2s9eyduZWcuIFJlYWN0YW5jZSBUb2xlcmFuY2Ugb2YgYSBVbml0ICglKSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J05wYXJhbGVsbCd9IExhYmVsPXsocHJvcHMuQXNzZXQuRnVzZWQgPyAnTnVtLiBvZiBVbml0cyBwZXIgZ3JvdXAnIDogJ051bS4gb2YgUGFyYWxsZWwgU3RyaW5ncycpfSBGZWVkYmFjaz17KHByb3BzLkFzc2V0LkZ1c2VkID8gJ051bS4gb2YgQ2Fwcy4gcGVyIGdyb3VwJyA6ICdOdW0uIG9mIFBhcmFsbGVsIFN0cmluZ3MnKSArICcgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnNlcmllcyd9IExhYmVsPXsocHJvcHMuQXNzZXQuRnVzZWQgPyAnTnVtLiBvZiBTZXJpZXMgR3JvdXBzIHBlciBQaGFzZScgOiAnTnVtLiBVbml0cyBpbiBlYWNoIFN0cmluZycpfSBGZWVkYmFjaz17KHByb3BzLkFzc2V0LkZ1c2VkID8gJ051bS4gb2YgU2VyaWVzIEdyb3VwcyBwZXIgUGhhc2UnIDogJ051bS4gVW5pdHMgaW4gZWFjaCBTdHJpbmcnKSArICcgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHsoIXByb3BzLkFzc2V0LkZ1c2VkID9cclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTlNlcmllc0dyb3VwJ30gTGFiZWw9eydOdW0uIG9mIFNlcmllcyBHcm91cHMgaW4gZWFjaCBVbml0J30gRmVlZGJhY2s9eydOdW0uIG9mIFNlcmllcyBHcm91cHMgaW4gZWFjaCBVbml0IGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTlBhcmFsZWxsR3JvdXAnfSBMYWJlbD17J051bS4gb2YgRWxlbWVudHMgaW4gZWFjaCBHcm91cCd9IEZlZWRiYWNrPXsnTnVtLiBvZiBFbGVtZW50cyBpbiBlYWNoIEdyb3VwIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICA8Lz4gOiBudWxsKX1cclxuXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHsocHJvcHMuQXNzZXQuRnVzZWQgPyBcclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVXBwZXJYRlJSYXRpbyd9IExhYmVsPXsnVXBwZXIgR3JvdXAgVlQgUmF0aW8nfSBGZWVkYmFjaz17J1VwcGVyIEdyb3VwIFZUIFJhdGlvIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTG93ZXJYRlJSYXRpbyd9IExhYmVsPXsnTG93ZXIgR3JvdXAgVlQgUmF0aW8nfSBGZWVkYmFjaz17J0xvd2VyIEdyb3VwIFZUIFJhdGlvIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOc2hvcnRlZCd9IExhYmVsPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIGdyb3Vwcyd9IEZlZWRiYWNrPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIGdyb3VwcyBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydCbG93bkZ1c2VzJ30gTGFiZWw9eydJbml0aWFsIEd1ZXNzIG9mIGJsb3duIGZ1c2VzIHBlciBncm91cCd9IEZlZWRiYWNrPXsnSW5pdGlhbCBHdWVzcyBvZiBibG93biBmdXNlcyBwZXIgZ3JvdXAgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnQmxvd25Hcm91cHMnfSBMYWJlbD17J0luaXRpYWwgZ3Vlc3Mgb2YgR3JvdXBzIHdpdGggYmxvd24gRnVzZSd9IEZlZWRiYWNrPXsnSW5pdGlhbCBndWVzcyBvZiBHcm91cHMgd2l0aCBibG93biBGdXNlIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1Nob3J0ZWRHcm91cHMnfSBMYWJlbD17J0luaXRpYWwgZ3Vlc3Mgb2YgR3JvdXBzIHdpdGggYmxvd24gRnVzZSd9IEZlZWRiYWNrPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIEdyb3VwcyByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICA8Lz4gOiA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1ZUcmF0aW9CdXMnfSBMYWJlbD17J0J1cyBWVCBSYXRpbyd9IEZlZWRiYWNrPXsnQnVzIFZUIFJhdGlvIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J051bWJlckxWQ2Fwcyd9IExhYmVsPXsnTnVtLm9mIFJlbGF5IENhcHMnfSBGZWVkYmFjaz17J051bS4gb2YgUmVsYXkgQ2FwcyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J051bWJlckxWVW5pdHMnfSBMYWJlbD17J051bS4gb2YgRWxlbWVudHMgcGVyIFJlbGF5IENhcCd9IEZlZWRiYWNrPXsnTnVtLiBvZiBFbGVtZW50cyBwZXIgUmVsYXkgQ2FwIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTFZLVkFyJ30gTGFiZWw9eydMb3cgVm9sdGFnZSBDYXAgc2l6ZSAoa1ZBUiknfSBGZWVkYmFjaz17J0xvdyBWb2x0YWdlIENhcCBzaXplIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0xWS1YnfSBMYWJlbD17J0xvdyBWb2xhdGFnZSBDYXAgcmF0aW5nIChWKSd9IEZlZWRiYWNrPXsnTG93IFZvbGF0YWdlIENhcCByYXRpbmcgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydMVk5lZ1JlYWN0YW5jZVRvbCd9IExhYmVsPXsnbmVnLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIExWIFVuaXQgKCUpJ30gRmVlZGJhY2s9eyduZWcuIFJlYWN0YW5jZSBUb2xlcmFuY2Ugb2YgTFYgVW5pdGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0xWUG9zUmVhY3RhbmNlVG9sJ30gTGFiZWw9eydwb3MuIFJlYWN0YW5jZSBUb2xlcmFuY2Ugb2YgTFYgVW5pdCAoJSknfSBGZWVkYmFjaz17J3Bvcy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBMViBVbml0IGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxQVFJhdGlvSW5wdXQgUmVjb3JkPXtwcm9wcy5Bc3NldH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydSdid9IExhYmVsPXsnVm9sdGFnZSBEaXZpZGVyIG91dHB1dCBSIChPaG0pJ30gRmVlZGJhY2s9eydWb2x0YWdlIERpdmlkZXIgb3V0cHV0IFIgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnUmgnfSBMYWJlbD17J1ZvbHRhZ2UgRGl2aWRlciBpbnB1dCBSJ30gRmVlZGJhY2s9eydWb2x0YWdlIERpdmlkZXIgaW5wdXQgUiBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnNob3J0ZWQnfSBMYWJlbD17J0luaXRpYWwgZ3Vlc3Mgb2Ygc2hvcnRlZCBlbGVtZW50cyd9IEZlZWRiYWNrPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIGVsZW1lbnRzIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG5cclxuICAgICAgICAgICAgICAgIDwvPil9XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FwQmFua0F0dHJpYnV0ZXM7XHJcblxyXG5jbGFzcyBEZXNpZ25TZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IE9wZW5YREEuQ2FwQmFuaywgU2V0dGVyOiAocmVjb3JkOiBPcGVuWERBLkNhcEJhbmspID0+IHZvaWQsIERpc2FibGVkPzogYm9vbGVhbn0sIHt9LCB7fT57XHJcblxyXG4gICAgY29tcHV0Qm9vbHMoc2VsZWN0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgcmVjb3JkOiBPcGVuWERBLkNhcEJhbmsgPSBfLmNsb25lKHRoaXMucHJvcHMuUmVjb3JkKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbiA9PSAnMCcpIHtcclxuICAgICAgICAgICAgcmVjb3JkLkNvbXBlbnNhdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVjb3JkLkZ1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdGlvbiA9PSAnMScpIHtcclxuICAgICAgICAgICAgcmVjb3JkLkNvbXBlbnNhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlY29yZC5GdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZWxlY3Rpb24gPT0gJzInKSB7XHJcbiAgICAgICAgICAgIHJlY29yZC5Db21wZW5zYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZWNvcmQuRnVzZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlU2VsZWN0aW9uKHJlY29yZDogT3BlblhEQS5DYXBCYW5rKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAocmVjb3JkLkNvbXBlbnNhdGVkKSBcclxuICAgICAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgICAgIGVsc2UgaWYgKCFyZWNvcmQuRnVzZWQpIFxyXG4gICAgICAgICAgICByZXR1cm4gXCIxXCI7XHJcbiAgICAgICAgcmV0dXJuIFwiMlwiO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPkRlc2lnbjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuY29tcHV0ZVNlbGVjdGlvbih0aGlzLnByb3BzLlJlY29yZCl9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB0aGlzLmNvbXB1dEJvb2xzKGV2dC50YXJnZXQudmFsdWUpfT5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXswfSB2YWx1ZT1cIjBcIj5GdXNlbGVzcyBDb21wZW5zYXRlZDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9ezF9IHZhbHVlPVwiMVwiPkZ1c2VsZXNzIFVuY29tcGVuc2F0ZWQ8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXsyfSB2YWx1ZT1cIjJcIj5GdXNlZDwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBUUmF0aW9JbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogT3BlblhEQS5DYXBCYW5rLCBTZXR0ZXI6IChyZWNvcmQ6IE9wZW5YREEuQ2FwQmFuaykgPT4gdm9pZCwgRGlzYWJsZWQ/OiBib29sZWFuIH0sIHtsb3c6IHN0cmluZywgaGlnaDogc3RyaW5nfSwge30+e1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICBsZXQgcmVnZXggPSAvXihbMC05XSspIChbMC05XSspJC87XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpby5tYXRjaChyZWdleCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0geyBsb3c6IHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpby5tYXRjaChyZWdleClbMV0sIGhpZ2g6IHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpby5tYXRjaChyZWdleClbMl0gfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7IGxvdzogXCJcIiwgaGlnaDogXCJcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmFsdWVzKGlucHV0OiBzdHJpbmcpIHtcclxuICAgICAgICBpbnB1dCA9IGlucHV0LnRyaW0oKTtcclxuXHJcbiAgICAgICAgbGV0IHJlZ2V4ID0gL14oWzAtOV0rKSAoWzAtOV0rKSQvO1xyXG4gICAgICAgIGlmIChpbnB1dC5tYXRjaChyZWdleCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG93OiBpbnB1dC5tYXRjaChyZWdleClbMV0sIGhpZ2g6IGlucHV0Lm1hdGNoKHJlZ2V4KVsyXSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG93OiBcIjBcIiwgaGlnaDogXCIxMDBcIn0pXHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2cHJvcCwgcHJldnN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHByZXZwcm9wLlJlY29yZC5SZWxheVBUUmF0aW8gIT09IHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpbykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcyh0aGlzLnByb3BzLlJlY29yZC5SZWxheVBUUmF0aW8pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgocHJldnN0YXRlLmxvdyAhPT0gdGhpcy5zdGF0ZS5sb3cgfHwgcHJldnN0YXRlLmhpZ2ggIT09IHRoaXMuc3RhdGUuaGlnaCkgJiYgdGhpcy5pc0ludGVnZXIodGhpcy5zdGF0ZS5sb3cpICYmIHRoaXMuaXNJbnRlZ2VyKHRoaXMuc3RhdGUuaGlnaCkpIHtcclxuICAgICAgICAgICAgdmFyIHJlY29yZDogT3BlblhEQS5DYXBCYW5rID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUludCh0aGlzLnN0YXRlLmxvdykgPiBwYXJzZUludCh0aGlzLnN0YXRlLmhpZ2gpKVxyXG4gICAgICAgICAgICAgICAgcmVjb3JkLlJlbGF5UFRSYXRpbyA9IHRoaXMuc3RhdGUubG93LnRvU3RyaW5nKCkgKyBcIiBcIiArIHRoaXMuc3RhdGUuaGlnaC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZWNvcmQuUmVsYXlQVFJhdGlvID0gdGhpcy5zdGF0ZS5oaWdoLnRvU3RyaW5nKCkgKyBcIiBcIiArIHRoaXMuc3RhdGUubG93LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSW50ZWdlcih2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdmFyIHJlZ2V4ID0gL14tP1swLTldKyQvO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLm1hdGNoKHJlZ2V4KSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD5SZWxheSBQVCBSYXRpbzwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9eyh0aGlzLmlzSW50ZWdlcih0aGlzLnN0YXRlLmhpZ2gpID8gXCJmb3JtLWNvbnRyb2xcIiA6IFwiZm9ybS1jb250cm9sIGlzLWludmFsaWRcIil9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGhpZ2g6IGV2dC50YXJnZXQudmFsdWUgYXMgc3RyaW5nfSlcclxuICAgICAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnN0YXRlLmhpZ2h9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9IC8+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXsodGhpcy5pc0ludGVnZXIodGhpcy5zdGF0ZS5sb3cpID8gXCJmb3JtLWNvbnRyb2xcIiA6IFwiZm9ybS1jb250cm9sIGlzLWludmFsaWRcIil9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvdzogZXZ0LnRhcmdldC52YWx1ZSBhcyBzdHJpbmcgfSlcclxuICAgICAgICAgICAgICAgICAgICB9fSB2YWx1ZT17dGhpcy5zdGF0ZS5sb3d9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW52YWxpZC1mZWVkYmFjayc+IFJlbGF5IFBUIFJhdGlvIGlzIGEgcmVxdWlyZWQgZmllbGQuPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQcmVTd2l0Y2hTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IE9wZW5YREEuQ2FwQmFuaywgU2V0dGVyOiAocmVjb3JkOiBPcGVuWERBLkNhcEJhbmspID0+IHZvaWQsIERpc2FibGVkPzogYm9vbGVhbiB9LCB7IHByZVN3aXRjaDogYm9vbGVhbltdIH0sIHt9PntcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgbGV0IG51bWJlcnMgPSB0aGlzLnByb3BzLlJlY29yZC5Da3RTd2l0Y2hlci50cmltKCkuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgIGlmIChudW1iZXJzLmxlbmd0aCAhPT0gcGFyc2VJbnQodGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcy50b1N0cmluZygpKSlcclxuICAgICAgICAgICAgbnVtYmVycyA9IEFycmF5LmZyb20oQXJyYXkocGFyc2VJbnQodGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcy50b1N0cmluZygpKSksIChlLCBpKSA9PiAnMCcpXHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IHByZVN3aXRjaDogbnVtYmVycy5tYXAoaXRlbSA9PiAoaXRlbS50cmltKCkgPT0gJzEnPyB0cnVlOiBmYWxzZSkpIH07XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmFsdWVzKGlucHV0OiBzdHJpbmcpIHtcclxuICAgICAgXHJcbiAgICAgICAgbGV0IG51bWJlcnMgPSBpbnB1dC50cmltKCkuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgIGlmIChudW1iZXJzLmxlbmd0aCAhPT0gcGFyc2VJbnQodGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcy50b1N0cmluZygpKSlcclxuICAgICAgICAgICAgbnVtYmVycyA9IEFycmF5LmZyb20oQXJyYXkocGFyc2VJbnQodGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcy50b1N0cmluZygpKSksIChlLCBpKSA9PiAnMCcpXHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmVTd2l0Y2g6IG51bWJlcnMubWFwKGl0ZW0gPT4gKGl0ZW0udHJpbSgpID09ICcxJyA/IHRydWUgOiBmYWxzZSkpIH0pXHJcbiAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZwcm9wLCBwcmV2c3RhdGUpIHtcclxuICAgICAgICBpZiAocHJldnByb3AuUmVjb3JkLk51bWJlck9mQmFua3MgIT09IHRoaXMucHJvcHMuUmVjb3JkLk51bWJlck9mQmFua3MgfHwgcHJldnByb3AuUmVjb3JkLkNrdFN3aXRjaGVyICE9PSB0aGlzLnByb3BzLlJlY29yZC5Da3RTd2l0Y2hlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcyh0aGlzLnByb3BzLlJlY29yZC5Da3RTd2l0Y2hlcilcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFfLmlzRXF1YWwocHJldnN0YXRlLHRoaXMuc3RhdGUpKSB7XHJcbiAgICAgICAgICAgIHZhciByZWNvcmQ6IE9wZW5YREEuQ2FwQmFuayA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xyXG5cclxuICAgICAgICAgICAgcmVjb3JkLkNrdFN3aXRjaGVyID0gdGhpcy5zdGF0ZS5wcmVTd2l0Y2gubWFwKGl0ZW0gPT4gKGl0ZW0gPyBcIjFcIiA6IFwiMFwiKSkuam9pbihcIixcIik7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPkNhcEJhbmsgd2l0aCBQcmUtaW5zZXJ0aW9uIFN3aXRjaGVyPC9sYWJlbD5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAge3RoaXMuc3RhdGUucHJlU3dpdGNoLm1hcCgodiwgaSkgPT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnJvbS1jaGVjayBmb3JtLWNoZWNrLWlubGluZVwiIGtleT17aX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY2hlY2staW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiBpZD17XCJpbmxpbmVDaGVja2JveC1cIitpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbHN0ID0gXy5jbG9uZSh0aGlzLnN0YXRlLnByZVN3aXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxzdFtpXSA9ICFsc3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmVTd2l0Y2g6IGxzdCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH19IHZhbHVlPXsodj8gMSA6IDApfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWNoZWNrLWxhYmVsXCIgaHRtbEZvcj17XCJpbmxpbmVDaGVja2JveC1cIiArIGl9PntpKzF9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pil9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufSIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBMaW5lLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi9Bc3NldCc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5cclxuZnVuY3Rpb24gTGluZUF0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkxpbmUsIFVwZGF0ZVN0YXRlOiAobmV3RWRpdEFzc2V0OiBPcGVuWERBLkxpbmUpID0+IHZvaWQgfSk6IEpTWC5FbGVtZW50IHtcclxuICAgIGZ1bmN0aW9uIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5MaW5lKSB8IGtleW9mKE9wZW5YREEuTGluZURldGFpbCkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ01heEZhdWx0RGlzdGFuY2UnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTWF4RmF1bHREaXN0YW5jZSA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTWF4RmF1bHREaXN0YW5jZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01pbkZhdWx0RGlzdGFuY2UnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTWluRmF1bHREaXN0YW5jZSA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTWluRmF1bHREaXN0YW5jZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xlbmd0aCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5EZXRhaWwuTGVuZ3RoID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5EZXRhaWwuTGVuZ3RoKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUjAnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuRGV0YWlsLlIwID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5EZXRhaWwuUjApO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdYMCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5EZXRhaWwuWDAgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkRldGFpbC5YMCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1IxJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkRldGFpbC5SMSA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuRGV0YWlsLlIxKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnWDEnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuRGV0YWlsLlgxID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5EZXRhaWwuWDEpO1xyXG4gICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1RoZXJtYWxSYXRpbmcnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuRGV0YWlsLlRoZXJtYWxSYXRpbmcgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkRldGFpbC5UaGVybWFsUmF0aW5nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpbmVEZXRhaWwocmVjb3JkOiBPcGVuWERBLkxpbmVEZXRhaWwpOiB2b2lkIHtcclxuICAgICAgICB2YXIgYXNzZXQ6IE9wZW5YREEuTGluZSA9IF8uY2xvbmUocHJvcHMuQXNzZXQpO1xyXG4gICAgICAgIGFzc2V0LkRldGFpbCA9IHJlY29yZDtcclxuICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZShhc3NldCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB9LCBbcHJvcHMuQXNzZXRdKTtcclxuXHJcbiAgICBpZiAocHJvcHMuQXNzZXQgPT0gbnVsbCB8fCBwcm9wcy5Bc3NldC5EZXRhaWwgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J01heEZhdWx0RGlzdGFuY2UnfSBMYWJlbD17J01heCBGYXVsdCBEaXN0YW5jZSd9IEZlZWRiYWNrPXsnTWF4IEZhdWx0IERpc3RhbmNlIGlzIGEgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J01pbkZhdWx0RGlzdGFuY2UnfSBMYWJlbD17J01pbiBGYXVsdCBEaXN0YW5jZSd9IEZlZWRiYWNrPXsnTWluIEZhdWx0IERpc3RhbmNlIGlzIGEgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydMZW5ndGgnfSBGZWVkYmFjaz17J0xlbmd0aCBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3VwZGF0ZUxpbmVEZXRhaWx9IERpc2FibGVkPXt0cnVlfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTGluZURldGFpbD4gUmVjb3JkPXtwcm9wcy5Bc3NldC5EZXRhaWx9IEZpZWxkPXsnUjAnfSBWYWxpZD17dmFsaWR9IFNldHRlcj17dXBkYXRlTGluZURldGFpbH0gRGlzYWJsZWQ9e3RydWV9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydYMCd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxpbmVEZXRhaWw+IFJlY29yZD17cHJvcHMuQXNzZXQuRGV0YWlsfSBGaWVsZD17J1IxJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3VwZGF0ZUxpbmVEZXRhaWx9IERpc2FibGVkPXt0cnVlfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTGluZURldGFpbD4gUmVjb3JkPXtwcm9wcy5Bc3NldC5EZXRhaWx9IEZpZWxkPXsnWDEnfSBWYWxpZD17dmFsaWR9IFNldHRlcj17dXBkYXRlTGluZURldGFpbH0gRGlzYWJsZWQ9e3RydWV9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydUaGVybWFsUmF0aW5nJ30gTGFiZWw9eydUaGVybWFsIFJhdGluZyd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cclxuICAgICAgICA8Lz5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmVBdHRyaWJ1dGVzOyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBUcmFuc2Zvcm1lci50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4vQXNzZXQnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuZnVuY3Rpb24gVHJhbnNmb3JtZXJBdHRyaWJ1dGVzKHByb3BzOiB7IE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LCBBc3NldDogT3BlblhEQS5UcmFuc2Zvcm1lciwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuVHJhbnNmb3JtZXIpID0+IHZvaWQgfSk6IEpTWC5FbGVtZW50IHtcclxuICAgIGZ1bmN0aW9uIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5UcmFuc2Zvcm1lcikpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ1ByaW1hcnlWb2x0YWdlS1YnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUHJpbWFyeVZvbHRhZ2VLViA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuUHJpbWFyeVZvbHRhZ2VLVik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1NlY29uZGFyeVZvbHRhZ2VLVicpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5TZWNvbmRhcnlWb2x0YWdlS1YgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlNlY29uZGFyeVZvbHRhZ2VLVik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1RhcCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5UYXAgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlRhcCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1IwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlIwICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5SMCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1gwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlgwICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5YMCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1IxJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlIxICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5SMSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1gxJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlgxICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5YMSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1RoZXJtYWxSYXRpbmcnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVGhlcm1hbFJhdGluZyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVGhlcm1hbFJhdGluZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvcHMuQXNzZXQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydSMCd9IEZlZWRiYWNrPXsnUjAgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1gwJ30gRmVlZGJhY2s9eydYMCBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnUjEnfSBGZWVkYmFjaz17J1IxIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydYMSd9IEZlZWRiYWNrPXsnWDEgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1RoZXJtYWxSYXRpbmcnfSBMYWJlbD17J1RoZXJtYWwgUmF0aW5nJ30gRmVlZGJhY2s9eydUaGVybWFsIFJhdGluZyBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnUHJpbWFyeVZvbHRhZ2VLVid9IExhYmVsPXsnUHJpbWFyeSBWb2x0YWdlIChrViknfSBGZWVkYmFjaz17J1ByaW1hcnkgVm9sdGFnZSAoa1YpIGlzIGEgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydTZWNvbmRhcnlWb2x0YWdlS1YnfSBMYWJlbD17J1NlY29uZGFyeSBWb2x0YWdlIChrViknfSBGZWVkYmFjaz17J1NlY29uZGFyeSBWb2x0YWdlIChrVikgaXMgYSBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1RhcCd9IEZlZWRiYWNrPXsnVGFwIGlzIGEgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUcmFuc2Zvcm1lckF0dHJpYnV0ZXM7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEZvcm1DaGVja0JveC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjIvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1DaGVja0JveDxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogVCwgRmllbGQ6IGtleW9mIChUKSwgU2V0dGVyOiAocmVjb3JkOiBUKSA9PiB2b2lkLCBMYWJlbD86IHN0cmluZywgRGlzYWJsZWQ/OiBib29sZWFuIH0sIHt9LCB7fT57XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1jaGVja1wiPlxyXG5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImZvcm0tY2hlY2staW5wdXRcIiBzdHlsZT17eyB6SW5kZXg6IDEgfX0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByZWNvcmQ6IFQgPSBfLmNsb25lKHRoaXMucHJvcHMuUmVjb3JkKTtcclxuICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQuY2hlY2tlZCBhcyBhbnk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID8gJ29uJyA6ICdvZmYnfSBjaGVja2VkPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA/IHRydWUgOiBmYWxzZX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZH0gLz5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tY2hlY2stbGFiZWxcIiA+e3RoaXMucHJvcHMuTGFiZWwgPT0gbnVsbCA/IHRoaXMucHJvcHMuRmllbGQgOiB0aGlzLnByb3BzLkxhYmVsfTwvbGFiZWw+XHJcblxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9