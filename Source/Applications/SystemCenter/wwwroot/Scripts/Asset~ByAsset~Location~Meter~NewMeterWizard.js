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
        (props.Asset.Fused ?
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'UpperXFRRatio', Label: 'Bus VT Ratio', Feedback: 'Bus VT Ratio is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LowerXFRRatio', Label: 'Midgroup VT Ratio', Feedback: 'Midgroup VT Ratio is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Nshorted', Label: 'Initial guess of shorted elements', Feedback: 'Initial guess of shorted elements is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'BlownFuses', Label: 'Initial Guess of blown fuses per group', Feedback: 'Initial Guess of blown fuses per group is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'BlownGroups', Label: 'Initial guess of Groups with blown Fuse', Feedback: 'Initial guess of Groups with blown Fuse is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'ShortedGroups', Label: 'Initial guess of shorted Groups', Feedback: 'Initial guess of shorted Groups required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 })) : react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            (props.Asset.Compensated ?
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](PTRatioInput, { Record: props.Asset, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }))
                :
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Rh', Label: 'Voltage Divider input R', Feedback: 'Voltage Divider input R is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NSeriesGroup', Label: 'Num. of Series Groups in each Unit', Feedback: 'Num. of Series Groups in each Unit is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NParalellGroup', Label: 'Num. of Elements in each Group', Feedback: 'Num. of Elements in each Group is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'VTratioBus', Label: 'Bus VT Ratio', Feedback: 'Bus VT Ratio is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NumberLVCaps', Label: 'Num.of Relay Caps', Feedback: 'Num. of Relay Caps is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NumberLVUnits', Label: 'Num. of Elements per Relay Cap', Feedback: 'Num. of Elements per Relay Cap is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVKVAr', Label: 'Low Voltage Cap size (kVAR)', Feedback: 'Low Voltage Cap size is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVKV', Label: 'Low Voltage Cap rating (V)', Feedback: 'Low Volatage Cap rating is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVNegReactanceTol', Label: 'neg. Reactance Tolerance of LV Unit (%)', Feedback: 'neg. Reactance Tolerance of LV Unitis a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVPosReactanceTol', Label: 'pos. Reactance Tolerance of LV Unit (%)', Feedback: 'pos. Reactance Tolerance of LV Unit is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Rv', Label: (props.Asset.Compensated ? 'Vt input Resistor (Ohm)' : 'Voltage Divider output R (Ohm)'), Feedback: (props.Asset.Compensated ? 'Vt input Resistor (Ohm)' : 'Voltage Divider output R (Ohm)') + ' is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
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
        if (_this.props.Record.RelayPTRatio != undefined && _this.props.Record.RelayPTRatio.match(regex) != null) {
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
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Relay PT Ratio (Primary/Secondary)"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "input-group" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (this.isInteger(this.state.high) ? "form-control" : "form-control is-invalid"), onChange: function (evt) {
                        _this.setState({ high: evt.target.value });
                    }, value: this.state.high, disabled: this.props.Disabled == null ? false : this.props.Disabled, placeholder: 'Primary' }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: (this.isInteger(this.state.low) ? "form-control" : "form-control is-invalid"), onChange: function (evt) {
                        _this.setState({ low: evt.target.value });
                    }, value: this.state.low, disabled: this.props.Disabled == null ? false : this.props.Disabled, placeholder: 'Secondary' })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'invalid-feedback' }, " Relay PT Ratio is a required field."));
    };
    return PTRatioInput;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
var PreSwitchSelect = /** @class */ (function (_super) {
    __extends(PreSwitchSelect, _super);
    function PreSwitchSelect(props, context) {
        var _this = _super.call(this, props, context) || this;
        var numbers = [];
        if (_this.props.Record.CktSwitcher != undefined)
            numbers = _this.props.Record.CktSwitcher.trim().split(",");
        var nBanks = 1;
        if (_this.props.Record.NumberOfBanks != undefined)
            nBanks = _this.props.Record.NumberOfBanks;
        if (numbers.length !== parseInt(nBanks.toString()))
            numbers = Array.from(Array(parseInt(nBanks.toString())), function (e, i) { return '0'; });
        _this.state = { preSwitch: numbers.map(function (item) { return (item.trim() == '1' ? true : false); }) };
        return _this;
    }
    PreSwitchSelect.prototype.updateValues = function (input) {
        var numbers = [];
        if (input != undefined)
            numbers = input.trim().split(",");
        var nBanks = 1;
        if (this.props.Record.NumberOfBanks != undefined)
            nBanks = this.props.Record.NumberOfBanks;
        if (numbers.length !== parseInt(nBanks.toString()))
            numbers = Array.from(Array(parseInt(nBanks.toString())), function (e, i) { return '0'; });
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
                        }, value: (v ? 1 : 0), checked: v, disabled: _this.props.Disabled == null ? false : _this.props.Disabled }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9TZXJ2aWNlcy9Bc3NldC50cyIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXIudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvQnVzLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmsudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvTGluZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9UcmFuc2Zvcm1lci50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL0Zvcm1DaGVja0JveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkEsU0FBUyxlQUFlLENBQUMsT0FBd0I7SUFDN0MsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1YsSUFBSSxFQUFFLEtBQUs7UUFDWCxHQUFHLEVBQUssUUFBUSw0QkFBdUIsT0FBTyxDQUFDLEVBQUUsa0JBQWU7UUFDaEUsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxRQUFRLEVBQUUsTUFBTTtRQUNoQixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLE9BQXdCO0lBQ25ELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFLLFFBQVEsNEJBQXVCLE9BQU8sQ0FBQyxFQUFFLGNBQVc7UUFDNUQsV0FBVyxFQUFFLGlDQUFpQztRQUM5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QUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUk7WUFDbE0sK0RBQU8sU0FBUyxFQUFDLGtCQUFrQixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFTLENBRTNHLENBQUM7SUFDWCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLENBZDRDLCtDQUFlLEdBYzNEIiwiZmlsZSI6IkFzc2V0fkJ5QXNzZXR+TG9jYXRpb25+TWV0ZXJ+TmV3TWV0ZXJXaXphcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQXNzZXRTZXJ2aWNlcy50cyAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzIzLzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSBcIi4uLy4uL1RTWC9TeXN0ZW1DZW50ZXIvZ2xvYmFsXCI7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gXCIuLi8uLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0Fzc2V0XCI7XG5cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cblxuZnVuY3Rpb24gZ2V0U3BhcmVCcmVha2VyKGJyZWFrZXI6IE9wZW5YREEuQnJlYWtlcik6IFByb21pc2U8T3BlblhEQS5CcmVha2VyPiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQnJlYWtlci8ke2JyZWFrZXIuSUR9L1NwYXJlQnJlYWtlcmAsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgIGFzeW5jOiB0cnVlXG4gICAgfSkucHJvbWlzZSgpO1xufVxuXG5mdW5jdGlvbiBnZXRMb2NhdGlvbkZvckJyZWFrZXIoYnJlYWtlcjogT3BlblhEQS5CcmVha2VyKTogUHJvbWlzZTxPcGVuWERBLkxvY2F0aW9uPiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQnJlYWtlci8ke2JyZWFrZXIuSUR9L0xvY2F0aW9uYCxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KS5wcm9taXNlKCk7XG5cbn1cbmZ1bmN0aW9uIGdldFNwYXJlc0ZvckxvY2F0aW9uKGxvY2F0aW9uOiBPcGVuWERBLkxvY2F0aW9uKTogUHJvbWlzZTxBcnJheTxPcGVuWERBLkJyZWFrZXI+PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQnJlYWtlci9TcGFyZUJyZWFrZXJzL1N1YnN0YXRpb24vJHtsb2NhdGlvbi5JRH1gLFxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICBhc3luYzogdHJ1ZVxuICAgIH0pLnByb21pc2UoKTtcblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3BhcmVCcmVha2Vyc0ZvclN1YnN0YXRpb24oYnJlYWtlcjogT3BlblhEQS5CcmVha2VyKTogUHJvbWlzZTxBcnJheTxPcGVuWERBLkJyZWFrZXI+PiB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBhd2FpdCBnZXRMb2NhdGlvbkZvckJyZWFrZXIoYnJlYWtlcik7XG4gICAgaWYgKGxvY2F0aW9uID09IG51bGwpIHJldHVybiBbXTtcbiAgICBjb25zdCBzcGFyZXMgPSBhd2FpdCBnZXRTcGFyZXNGb3JMb2NhdGlvbihsb2NhdGlvbik7XG4gICAgcmV0dXJuIHNwYXJlc1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBc3NldFR5cGVzKCk6IEpRdWVyeVhIUiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRUeXBlYCxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbEFzc2V0cygpOiBKUXVlcnlYSFJ7XG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0YCxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBc3NldChhc3NldElEOiBudW1iZXIsIGFzc2V0VHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogUHJvbWlzZTxPcGVuWERBLkFzc2V0PiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvJHthc3NldFR5cGV9L09uZS8ke2Fzc2V0SUR9YCxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMoYXNzZXRJRDogbnVtYmVyLCBhc3NldFR5cGU6IE9wZW5YREEuQXNzZXRUeXBlTmFtZSk6IFByb21pc2U8T3BlblhEQS5Bc3NldD4ge1xuICAgIHZhciBhc3NldCA9IGF3YWl0IGdldEFzc2V0KGFzc2V0SUQsIGFzc2V0VHlwZSk7XG4gICAgYXNzZXQuQXNzZXRUeXBlID0gYXNzZXRUeXBlO1xuICAgIGFzc2V0LkNoYW5uZWxzID0gW107XG5cbiAgICBpZiAoYXNzZXRUeXBlID09ICdCcmVha2VyJykge1xuICAgICAgICBjb25zdCBlRE5BUG9pbnQgPSBhd2FpdCBnZXRFRE5BUG9pbnQoYXNzZXQgYXMgT3BlblhEQS5CcmVha2VyKVxuICAgICAgICBpZiAoZUROQVBvaW50ICE9IG51bGwpXG4gICAgICAgICAgICBhc3NldFsnRUROQVBvaW50J10gPSBlRE5BUG9pbnQuUG9pbnQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGFzc2V0WydFRE5BUG9pbnQnXSA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgc3BhcmVCcmVha2VyID0gYXdhaXQgYXdhaXQgZ2V0U3BhcmVCcmVha2VyKGFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcilcbiAgICAgICAgaWYgKHNwYXJlQnJlYWtlciAhPSBudWxsKVxuICAgICAgICAgICAgYXNzZXRbJ1NwYXJlQnJlYWtlcklEJ10gPSBzcGFyZUJyZWFrZXIuSUQ7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGFzc2V0WydTcGFyZUJyZWFrZXJJRCddID0gbnVsbDtcbiAgICB9ICAgXG4gICAgZWxzZSBpZiAoYXNzZXRUeXBlID09ICdMaW5lJylcbiAgICAgICAgYXNzZXRbJ0RldGFpbCddID0gYXdhaXQgZ2V0TGluZURldGFpbHMoYXNzZXQgYXMgT3BlblhEQS5MaW5lKTtcblxuICAgIHJldHVybiBhc3NldDtcbn1cblxuZnVuY3Rpb24gZ2V0RUROQVBvaW50KGJyZWFrZXI6IE9wZW5YREEuQnJlYWtlcik6IFByb21pc2U8T3BlblhEQS5FRE5BUG9pbnQ+IHtcbiAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9CcmVha2VyLyR7YnJlYWtlci5JRH0vRUROQVBvaW50YCxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KS5wcm9taXNlKCk7XG59XG5cbmZ1bmN0aW9uIGdldExpbmVEZXRhaWxzKGxpbmU6IE9wZW5YREEuTGluZSk6IFByb21pc2U8T3BlblhEQS5MaW5lRGV0YWlsPiB7XG4gICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTGluZS8ke2xpbmUuSUR9L0xpbmVTZWdtZW50YCxcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KS5wcm9taXNlKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRFeGlzdGluZ0Fzc2V0KGFzc2V0OiBPcGVuWERBLkFzc2V0KTogUHJvbWlzZTxPcGVuWERBLkFzc2V0PiB7XG4gICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXQvRWRpdGAsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBBc3NldDogYXNzZXQgfSksXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgYXN5bmM6IHRydWVcbiAgICB9KS5wcm9taXNlKCk7XG5cbn1cblxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEJyZWFrZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzE3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuL0Fzc2V0JztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBGb3JtQ2hlY2tCb3ggZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtQ2hlY2tCb3gnO1xyXG5pbXBvcnQgeyBnZXRTcGFyZUJyZWFrZXJzRm9yU3Vic3RhdGlvbiB9IGZyb20gJy4uLy4uLy4uL1RTL1NlcnZpY2VzL0Fzc2V0JztcclxuXHJcbmZ1bmN0aW9uIEJyZWFrZXJBdHRyaWJ1dGVzKHByb3BzOiB7IE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LCBBc3NldDogT3BlblhEQS5CcmVha2VyLCBVcGRhdGVTdGF0ZTogKG5ld0VkaXRBc3NldDogT3BlblhEQS5CcmVha2VyKSA9PiB2b2lkLCBTaG93U3BhcmU/OiBib29sZWFuIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YoT3BlblhEQS5CcmVha2VyKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnVGhlcm1hbFJhdGluZycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5UaGVybWFsUmF0aW5nICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5UaGVybWFsUmF0aW5nKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU3BlZWQnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuU3BlZWQgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlNwZWVkKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVHJpcFRpbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVHJpcFRpbWUgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0LlRyaXBUaW1lKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUGlja3VwVGltZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5QaWNrdXBUaW1lID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5QaWNrdXBUaW1lKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVHJpcENvaWxDb25kaXRpb24nKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVHJpcENvaWxDb25kaXRpb24gPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlRyaXBDb2lsQ29uZGl0aW9uKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRUROQVBvaW50JykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1NwYXJlJykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1NwYXJlQnJlYWtlcklEJykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgW3NwYXJlcywgc2V0U3BhcmVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQnJlYWtlcj4+KFtdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGdldFNwYXJlQnJlYWtlcnNGb3JTdWJzdGF0aW9uKHByb3BzLkFzc2V0KS50aGVuKHNwcyA9PiB7XHJcbiAgICAgICAgICAgIHNldFNwYXJlcyhzcHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgW3Byb3BzLkFzc2V0XSk7XHJcblxyXG4gICAgaWYgKHByb3BzLkFzc2V0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydUaGVybWFsUmF0aW5nJ30gTGFiZWw9eydUaGVybWFsIFJhdGluZyd9IEZlZWRiYWNrPXsnVGhlcm1hbCByYXRpbmcgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9eyBwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1NwZWVkJ30gRmVlZGJhY2s9eydTcGVlZCBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydUcmlwVGltZSd9IExhYmVsPXsnVHJpcCBUaW1lJ30gRmVlZGJhY2s9eydUcmlwIFRpbWUgaXMgYW4gaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1BpY2t1cFRpbWUnfSBMYWJlbD17J1BpY2t1cCBUaW1lJ30gRmVlZGJhY2s9eydQaWNrdXAgVGltZSBpcyBhbiBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkJyZWFrZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVHJpcENvaWxDb25kaXRpb24nfSBMYWJlbD17J1RyaXAgQ29pbCBDb25kaXRpb24nfSBGZWVkYmFjaz17J1RyaXAgQ29pbCBDb25kaXRpb24gaXMgYW4gbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0VETkFQb2ludCd9IExhYmVsPXsnRUROQSBQb2ludCd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiIGhpZGRlbj17cHJvcHMuU2hvd1NwYXJlICE9IHRydWV9PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPlNwYXJlIEJyZWFrZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17cHJvcHMuQXNzZXQuU3BhcmVCcmVha2VySUQgPT0gbnVsbCA/IDAgOiBwcm9wcy5Bc3NldC5TcGFyZUJyZWFrZXJJRH0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkOiBPcGVuWERBLkJyZWFrZXIgPSBfLmNsb25lKHByb3BzLkFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSA9PSAnMCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC5TcGFyZUJyZWFrZXJJRCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQuU3BhcmVCcmVha2VySUQgPSBwYXJzZUludChldnQudGFyZ2V0LnZhbHVlIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUocmVjb3JkKVxyXG4gICAgICAgICAgICAgICAgfX0gZGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MH0ga2V5PXswfSA+Tm9uZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhcmVzLm1hcChzcGFyZSA9PiA8b3B0aW9uIHZhbHVlPXtzcGFyZS5JRH0ga2V5PXtzcGFyZS5JRH0gPntzcGFyZS5Bc3NldEtleX08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPEZvcm1DaGVja0JveDxPcGVuWERBLkJyZWFrZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnU3BhcmUnfSBMYWJlbD17J0lzIFNwYXJlJ30gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnJlYWtlckF0dHJpYnV0ZXM7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEJ1cy50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuZnVuY3Rpb24gQnVzQXR0cmlidXRlcyhwcm9wczogeyBOZXdFZGl0OiBTeXN0ZW1DZW50ZXIuTmV3RWRpdCwgQXNzZXQ6IE9wZW5YREEuQnVzLCBVcGRhdGVTdGF0ZTogKG5ld0VkaXRBc3NldDogT3BlblhEQS5CdXMpID0+IHZvaWQgfSk6IEpTWC5FbGVtZW50IHtcclxuICAgIHJldHVybiA8c3Bhbj5ObyBBZGRpdGlvbmFsIEF0dHJpYnV0ZXM8L3NwYW4+O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXNBdHRyaWJ1dGVzOyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgQ2FwQmFuay50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8xNy8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuL0Fzc2V0JztcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xuaW1wb3J0IEZvcm1DaGVja0JveCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1DaGVja0JveCc7XG5pbXBvcnQgeyBudW1iZXIgfSBmcm9tICdwcm9wLXR5cGVzJztcbmZ1bmN0aW9uIENhcEJhbmtBdHRyaWJ1dGVzKHByb3BzOiB7IE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LCBBc3NldDogT3BlblhEQS5DYXBCYW5rLCBVcGRhdGVTdGF0ZTogKG5ld0VkaXRBc3NldDogT3BlblhEQS5DYXBCYW5rKSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkNhcEJhbmspKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaWVsZCA9PSAnTnVtYmVyT2ZCYW5rcycpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTnVtYmVyT2ZCYW5rcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTnVtYmVyT2ZCYW5rcyk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdDYXBhY2l0YW5jZVBlckJhbmsnKVxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkNhcGFjaXRhbmNlUGVyQmFuayAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuQ2FwYWNpdGFuY2VQZXJCYW5rKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01heEtWJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5NYXhLViAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTWF4S1YpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVW5pdEtWJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Vbml0S1YgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlVuaXRLVik7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdVbml0S1ZBcicpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVW5pdEtWQXIgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlVuaXRLVkFyKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Bvc1JlYWN0YW5jZVRvbCcpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUG9zUmVhY3RhbmNlVG9sICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5Qb3NSZWFjdGFuY2VUb2wpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmVnUmVhY3RhbmNlVG9sJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OZWdSZWFjdGFuY2VUb2wgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0Lk5lZ1JlYWN0YW5jZVRvbCk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOcGFyYWxlbGwnKVxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5wYXJhbGVsbCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTnBhcmFsZWxsKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05zZXJpZXMnKVxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5zZXJpZXMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk5zZXJpZXMpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTlNlcmllc0dyb3VwJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OU2VyaWVzR3JvdXAgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk5TZXJpZXNHcm91cCk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOUGFyYWxlbGxHcm91cCcpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTlBhcmFsZWxsR3JvdXAgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk5QYXJhbGVsbEdyb3VwKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1ZUcmF0aW9CdXMnKVxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlZUcmF0aW9CdXMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlZUcmF0aW9CdXMpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnVtYmVyTFZDYXBzJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OdW1iZXJMVkNhcHMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk51bWJlckxWQ2Fwcyk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOdW1iZXJMVlVuaXRzJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OdW1iZXJMVlVuaXRzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5OdW1iZXJMVlVuaXRzKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xWS1ZBcicpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTFZLVkFyICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5MVktWQXIpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTFZLVicpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTFZLViAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTFZLVik7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdMVk5lZ1JlYWN0YW5jZVRvbCcpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTFZOZWdSZWFjdGFuY2VUb2wgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkxWTmVnUmVhY3RhbmNlVG9sKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xWUG9zUmVhY3RhbmNlVG9sJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5MVlBvc1JlYWN0YW5jZVRvbCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTFZQb3NSZWFjdGFuY2VUb2wpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVXBwZXJYRlJSYXRpbycpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVXBwZXJYRlJSYXRpbyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVXBwZXJYRlJSYXRpbyk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdMb3dlclhGUlJhdGlvJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Mb3dlclhGUlJhdGlvICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5Mb3dlclhGUlJhdGlvKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05zaG9ydGVkJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Oc2hvcnRlZCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTnNob3J0ZWQpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQmxvd25GdXNlcycpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuQmxvd25GdXNlcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuQmxvd25GdXNlcyk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdCbG93bkdyb3VwcycpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuQmxvd25Hcm91cHMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkJsb3duR3JvdXBzKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1J2JylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5SdiAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuUnYpO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUmgnKVxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlJoICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5SaCk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOTG93ZXJHcm91cHMnKVxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5Mb3dlckdyb3VwcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTkxvd2VyR3JvdXBzKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Nob3J0ZWRHcm91cHMnKVxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlNob3J0ZWRHcm91cHMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlNob3J0ZWRHcm91cHMpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChwcm9wcy5Bc3NldCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPERlc2lnblNlbGVjdCBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxuICAgICAgICAgICAgPFByZVN3aXRjaFNlbGVjdCBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOdW1iZXJPZkJhbmtzJ30gTGFiZWw9eydOdW1iZXIgT2YgQmFua3MnfSBGZWVkYmFjaz17J051bWJlciBPZiBCYW5rcyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnQ2FwYWNpdGFuY2VQZXJCYW5rJ30gTGFiZWw9eydDYXBhY2l0b3IgU3RlcCBTaXplIChrVkFSKSd9IEZlZWRiYWNrPXsnQ2FwYWNpdG9yIFN0ZXAgU2l6ZSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cblxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTWF4S1YnfSBMYWJlbD17J01heGltdW0gT3BlcmF0aW5nIFZvbHRhZ2UgKGtWKSd9IEZlZWRiYWNrPXsnTWF4aW11bSBPcGVyYXRpbmcgVm9sdGFnZSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1VuaXRLVid9IExhYmVsPXsnUmF0ZWQgVm9sdGFnZSBvZiBhIFVuaXQgKGtWKSd9IEZlZWRiYWNrPXsnUmF0ZWQgVm9sdGFnZSBvZiBhIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG5cbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1VuaXRLVkFyJ30gTGFiZWw9eydSYXRpbmcgb2YgYSBVbml0IChrVkFSKSd9IEZlZWRiYWNrPXsnUmF0aW5nIG9mIGEgVW5pdCBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1Bvc1JlYWN0YW5jZVRvbCd9IExhYmVsPXsncG9zLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIGEgVW5pdCAoJSknfSBGZWVkYmFjaz17J3Bvcy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBhIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOZWdSZWFjdGFuY2VUb2wnfSBMYWJlbD17J25lZy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBhIFVuaXQgKCUpJ30gRmVlZGJhY2s9eyduZWcuIFJlYWN0YW5jZSBUb2xlcmFuY2Ugb2YgYSBVbml0ICglKSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cblxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnBhcmFsZWxsJ30gTGFiZWw9eyhwcm9wcy5Bc3NldC5GdXNlZCA/ICdOdW0uIG9mIFVuaXRzIHBlciBncm91cCcgOiAnTnVtLiBvZiBQYXJhbGxlbCBTdHJpbmdzJyl9IEZlZWRiYWNrPXsocHJvcHMuQXNzZXQuRnVzZWQgPyAnTnVtLiBvZiBDYXBzLiBwZXIgZ3JvdXAnIDogJ051bS4gb2YgUGFyYWxsZWwgU3RyaW5ncycpICsgJyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnNlcmllcyd9IExhYmVsPXsocHJvcHMuQXNzZXQuRnVzZWQgPyAnTnVtLiBvZiBTZXJpZXMgR3JvdXBzIHBlciBQaGFzZScgOiAnTnVtLiBVbml0cyBpbiBlYWNoIFN0cmluZycpfSBGZWVkYmFjaz17KHByb3BzLkFzc2V0LkZ1c2VkID8gJ051bS4gb2YgU2VyaWVzIEdyb3VwcyBwZXIgUGhhc2UnIDogJ051bS4gVW5pdHMgaW4gZWFjaCBTdHJpbmcnKSArICcgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgIFxuICAgICAgICAgICAgeyhwcm9wcy5Bc3NldC5GdXNlZCA/IFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1VwcGVyWEZSUmF0aW8nfSBMYWJlbD17J0J1cyBWVCBSYXRpbyd9IEZlZWRiYWNrPXsnQnVzIFZUIFJhdGlvIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0xvd2VyWEZSUmF0aW8nfSBMYWJlbD17J01pZGdyb3VwIFZUIFJhdGlvJ30gRmVlZGJhY2s9eydNaWRncm91cCBWVCBSYXRpbyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxuXG5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnNob3J0ZWQnfSBMYWJlbD17J0luaXRpYWwgZ3Vlc3Mgb2Ygc2hvcnRlZCBlbGVtZW50cyd9IEZlZWRiYWNrPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIGVsZW1lbnRzIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydCbG93bkZ1c2VzJ30gTGFiZWw9eydJbml0aWFsIEd1ZXNzIG9mIGJsb3duIGZ1c2VzIHBlciBncm91cCd9IEZlZWRiYWNrPXsnSW5pdGlhbCBHdWVzcyBvZiBibG93biBmdXNlcyBwZXIgZ3JvdXAgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0Jsb3duR3JvdXBzJ30gTGFiZWw9eydJbml0aWFsIGd1ZXNzIG9mIEdyb3VwcyB3aXRoIGJsb3duIEZ1c2UnfSBGZWVkYmFjaz17J0luaXRpYWwgZ3Vlc3Mgb2YgR3JvdXBzIHdpdGggYmxvd24gRnVzZSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnU2hvcnRlZEdyb3Vwcyd9IExhYmVsPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIEdyb3Vwcyd9IEZlZWRiYWNrPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIEdyb3VwcyByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgPC8+IDogPD5cbiAgICAgICAgICAgICAgICAgICAgeyhwcm9wcy5Bc3NldC5Db21wZW5zYXRlZCA/IFxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UFRSYXRpb0lucHV0IFJlY29yZD17cHJvcHMuQXNzZXR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgOiBcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnUmgnfSBMYWJlbD17J1ZvbHRhZ2UgRGl2aWRlciBpbnB1dCBSJ30gRmVlZGJhY2s9eydWb2x0YWdlIERpdmlkZXIgaW5wdXQgUiBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOU2VyaWVzR3JvdXAnfSBMYWJlbD17J051bS4gb2YgU2VyaWVzIEdyb3VwcyBpbiBlYWNoIFVuaXQnfSBGZWVkYmFjaz17J051bS4gb2YgU2VyaWVzIEdyb3VwcyBpbiBlYWNoIFVuaXQgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTlBhcmFsZWxsR3JvdXAnfSBMYWJlbD17J051bS4gb2YgRWxlbWVudHMgaW4gZWFjaCBHcm91cCd9IEZlZWRiYWNrPXsnTnVtLiBvZiBFbGVtZW50cyBpbiBlYWNoIEdyb3VwIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1ZUcmF0aW9CdXMnfSBMYWJlbD17J0J1cyBWVCBSYXRpbyd9IEZlZWRiYWNrPXsnQnVzIFZUIFJhdGlvIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOdW1iZXJMVkNhcHMnfSBMYWJlbD17J051bS5vZiBSZWxheSBDYXBzJ30gRmVlZGJhY2s9eydOdW0uIG9mIFJlbGF5IENhcHMgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnVtYmVyTFZVbml0cyd9IExhYmVsPXsnTnVtLiBvZiBFbGVtZW50cyBwZXIgUmVsYXkgQ2FwJ30gRmVlZGJhY2s9eydOdW0uIG9mIEVsZW1lbnRzIHBlciBSZWxheSBDYXAgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTFZLVkFyJ30gTGFiZWw9eydMb3cgVm9sdGFnZSBDYXAgc2l6ZSAoa1ZBUiknfSBGZWVkYmFjaz17J0xvdyBWb2x0YWdlIENhcCBzaXplIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydMVktWJ30gTGFiZWw9eydMb3cgVm9sdGFnZSBDYXAgcmF0aW5nIChWKSd9IEZlZWRiYWNrPXsnTG93IFZvbGF0YWdlIENhcCByYXRpbmcgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTFZOZWdSZWFjdGFuY2VUb2wnfSBMYWJlbD17J25lZy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBMViBVbml0ICglKSd9IEZlZWRiYWNrPXsnbmVnLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIExWIFVuaXRpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTFZQb3NSZWFjdGFuY2VUb2wnfSBMYWJlbD17J3Bvcy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBMViBVbml0ICglKSd9IEZlZWRiYWNrPXsncG9zLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIExWIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1J2J30gTGFiZWw9eyhwcm9wcy5Bc3NldC5Db21wZW5zYXRlZCA/ICdWdCBpbnB1dCBSZXNpc3RvciAoT2htKScgOiAnVm9sdGFnZSBEaXZpZGVyIG91dHB1dCBSIChPaG0pJyl9IEZlZWRiYWNrPXsocHJvcHMuQXNzZXQuQ29tcGVuc2F0ZWQgPyAnVnQgaW5wdXQgUmVzaXN0b3IgKE9obSknIDogJ1ZvbHRhZ2UgRGl2aWRlciBvdXRwdXQgUiAoT2htKScpKycgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J05zaG9ydGVkJ30gTGFiZWw9eydJbml0aWFsIGd1ZXNzIG9mIHNob3J0ZWQgZWxlbWVudHMnfSBGZWVkYmFjaz17J0luaXRpYWwgZ3Vlc3Mgb2Ygc2hvcnRlZCBlbGVtZW50cyBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cblxuICAgICAgICAgICAgICAgIDwvPil9XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIDwvPlxuICAgICk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FwQmFua0F0dHJpYnV0ZXM7XG5cbmNsYXNzIERlc2lnblNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogT3BlblhEQS5DYXBCYW5rLCBTZXR0ZXI6IChyZWNvcmQ6IE9wZW5YREEuQ2FwQmFuaykgPT4gdm9pZCwgRGlzYWJsZWQ/OiBib29sZWFufSwge30sIHt9PntcblxuICAgIGNvbXB1dEJvb2xzKHNlbGVjdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHZhciByZWNvcmQ6IE9wZW5YREEuQ2FwQmFuayA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xuXG4gICAgICAgIGlmIChzZWxlY3Rpb24gPT0gJzAnKSB7XG4gICAgICAgICAgICByZWNvcmQuQ29tcGVuc2F0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVjb3JkLkZ1c2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0aW9uID09ICcxJykge1xuICAgICAgICAgICAgcmVjb3JkLkNvbXBlbnNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZWNvcmQuRnVzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxlY3Rpb24gPT0gJzInKSB7XG4gICAgICAgICAgICByZWNvcmQuQ29tcGVuc2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJlY29yZC5GdXNlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb3BzLlNldHRlcihyZWNvcmQpO1xuICAgIH1cblxuICAgIGNvbXB1dGVTZWxlY3Rpb24ocmVjb3JkOiBPcGVuWERBLkNhcEJhbmspOiBzdHJpbmcge1xuICAgICAgICBpZiAocmVjb3JkLkNvbXBlbnNhdGVkKSBcbiAgICAgICAgICAgIHJldHVybiBcIjBcIjtcbiAgICAgICAgZWxzZSBpZiAoIXJlY29yZC5GdXNlZCkgXG4gICAgICAgICAgICByZXR1cm4gXCIxXCI7XG4gICAgICAgIHJldHVybiBcIjJcIjtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWw+RGVzaWduPC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuY29tcHV0ZVNlbGVjdGlvbih0aGlzLnByb3BzLlJlY29yZCl9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB0aGlzLmNvbXB1dEJvb2xzKGV2dC50YXJnZXQudmFsdWUpfT5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17MH0gdmFsdWU9XCIwXCI+RnVzZWxlc3MgQ29tcGVuc2F0ZWQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17MX0gdmFsdWU9XCIxXCI+RnVzZWxlc3MgVW5jb21wZW5zYXRlZDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXsyfSB2YWx1ZT1cIjJcIj5GdXNlZDwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59XG5cbmNsYXNzIFBUUmF0aW9JbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogT3BlblhEQS5DYXBCYW5rLCBTZXR0ZXI6IChyZWNvcmQ6IE9wZW5YREEuQ2FwQmFuaykgPT4gdm9pZCwgRGlzYWJsZWQ/OiBib29sZWFuIH0sIHtsb3c6IHN0cmluZywgaGlnaDogc3RyaW5nfSwge30+e1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIGxldCByZWdleCA9IC9eKFswLTldKykgKFswLTldKykkLztcbiAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpbyAhPSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5SZWNvcmQuUmVsYXlQVFJhdGlvLm1hdGNoKHJlZ2V4KSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0geyBsb3c6IHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpby5tYXRjaChyZWdleClbMV0sIGhpZ2g6IHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpby5tYXRjaChyZWdleClbMl0gfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7IGxvdzogXCJcIiwgaGlnaDogXCJcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlcyhpbnB1dDogc3RyaW5nKSB7XG4gICAgICAgIGlucHV0ID0gaW5wdXQudHJpbSgpO1xuXG4gICAgICAgIGxldCByZWdleCA9IC9eKFswLTldKykgKFswLTldKykkLztcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKHJlZ2V4KSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG93OiBpbnB1dC5tYXRjaChyZWdleClbMV0sIGhpZ2g6IGlucHV0Lm1hdGNoKHJlZ2V4KVsyXSB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG93OiBcIjBcIiwgaGlnaDogXCIxMDBcIn0pXG4gICAgICAgIH0gICAgICAgICBcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldnByb3AsIHByZXZzdGF0ZSkge1xuICAgICAgICBpZiAocHJldnByb3AuUmVjb3JkLlJlbGF5UFRSYXRpbyAhPT0gdGhpcy5wcm9wcy5SZWNvcmQuUmVsYXlQVFJhdGlvKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcyh0aGlzLnByb3BzLlJlY29yZC5SZWxheVBUUmF0aW8pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKChwcmV2c3RhdGUubG93ICE9PSB0aGlzLnN0YXRlLmxvdyB8fCBwcmV2c3RhdGUuaGlnaCAhPT0gdGhpcy5zdGF0ZS5oaWdoKSAmJiB0aGlzLmlzSW50ZWdlcih0aGlzLnN0YXRlLmxvdykgJiYgdGhpcy5pc0ludGVnZXIodGhpcy5zdGF0ZS5oaWdoKSkge1xuICAgICAgICAgICAgdmFyIHJlY29yZDogT3BlblhEQS5DYXBCYW5rID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XG4gICAgICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5zdGF0ZS5sb3cpID4gcGFyc2VJbnQodGhpcy5zdGF0ZS5oaWdoKSlcbiAgICAgICAgICAgICAgICByZWNvcmQuUmVsYXlQVFJhdGlvID0gdGhpcy5zdGF0ZS5sb3cudG9TdHJpbmcoKSArIFwiIFwiICsgdGhpcy5zdGF0ZS5oaWdoLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVjb3JkLlJlbGF5UFRSYXRpbyA9IHRoaXMuc3RhdGUuaGlnaC50b1N0cmluZygpICsgXCIgXCIgKyB0aGlzLnN0YXRlLmxvdy50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzSW50ZWdlcih2YWx1ZTogYW55KSB7XG4gICAgICAgIHZhciByZWdleCA9IC9eLT9bMC05XSskLztcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkubWF0Y2gocmVnZXgpICE9IG51bGw7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWw+UmVsYXkgUFQgUmF0aW8gKFByaW1hcnkvU2Vjb25kYXJ5KTwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17KHRoaXMuaXNJbnRlZ2VyKHRoaXMuc3RhdGUuaGlnaCkgPyBcImZvcm0tY29udHJvbFwiIDogXCJmb3JtLWNvbnRyb2wgaXMtaW52YWxpZFwiKX0gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGhpZ2g6IGV2dC50YXJnZXQudmFsdWUgYXMgc3RyaW5nfSlcbiAgICAgICAgICAgICAgICB9fSB2YWx1ZT17dGhpcy5zdGF0ZS5oaWdofSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkfSBwbGFjZWhvbGRlcj0nUHJpbWFyeScgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXsodGhpcy5pc0ludGVnZXIodGhpcy5zdGF0ZS5sb3cpID8gXCJmb3JtLWNvbnRyb2xcIiA6IFwiZm9ybS1jb250cm9sIGlzLWludmFsaWRcIil9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb3c6IGV2dC50YXJnZXQudmFsdWUgYXMgc3RyaW5nIH0pXG4gICAgICAgICAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnN0YXRlLmxvd30gZGlzYWJsZWQ9e3RoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZH0gcGxhY2Vob2xkZXI9J1NlY29uZGFyeScvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW52YWxpZC1mZWVkYmFjayc+IFJlbGF5IFBUIFJhdGlvIGlzIGEgcmVxdWlyZWQgZmllbGQuPC9kaXY+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59XG5cbmNsYXNzIFByZVN3aXRjaFNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogT3BlblhEQS5DYXBCYW5rLCBTZXR0ZXI6IChyZWNvcmQ6IE9wZW5YREEuQ2FwQmFuaykgPT4gdm9pZCwgRGlzYWJsZWQ/OiBib29sZWFuIH0sIHsgcHJlU3dpdGNoOiBib29sZWFuW10gfSwge30+e1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIGxldCBudW1iZXJzID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuUmVjb3JkLkNrdFN3aXRjaGVyICE9IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG51bWJlcnMgPSB0aGlzLnByb3BzLlJlY29yZC5Da3RTd2l0Y2hlci50cmltKCkuc3BsaXQoXCIsXCIpO1xuXG4gICAgICAgIGxldCBuQmFua3MgPSAxO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcyAhPSB1bmRlZmluZWQpXG4gICAgICAgICAgICBuQmFua3MgPSB0aGlzLnByb3BzLlJlY29yZC5OdW1iZXJPZkJhbmtzO1xuXG4gICAgICAgIGlmIChudW1iZXJzLmxlbmd0aCAhPT0gcGFyc2VJbnQobkJhbmtzLnRvU3RyaW5nKCkpKVxuICAgICAgICAgICAgbnVtYmVycyA9IEFycmF5LmZyb20oQXJyYXkocGFyc2VJbnQobkJhbmtzLnRvU3RyaW5nKCkpKSwgKGUsIGkpID0+ICcwJylcblxuICAgICAgICB0aGlzLnN0YXRlID0geyBwcmVTd2l0Y2g6IG51bWJlcnMubWFwKGl0ZW0gPT4gKGl0ZW0udHJpbSgpID09ICcxJz8gdHJ1ZTogZmFsc2UpKSB9O1xuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlcyhpbnB1dDogc3RyaW5nKSB7XG5cbiAgICAgICAgbGV0IG51bWJlcnMgPSBbXVxuICAgICAgICBpZiAoaW5wdXQgIT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbnVtYmVycyA9IGlucHV0LnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICBcbiAgICAgICAgbGV0IG5CYW5rcyA9IDE7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLlJlY29yZC5OdW1iZXJPZkJhbmtzICE9IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG5CYW5rcyA9IHRoaXMucHJvcHMuUmVjb3JkLk51bWJlck9mQmFua3M7XG5cbiAgICAgICAgaWYgKG51bWJlcnMubGVuZ3RoICE9PSBwYXJzZUludChuQmFua3MudG9TdHJpbmcoKSkpXG4gICAgICAgICAgICBudW1iZXJzID0gQXJyYXkuZnJvbShBcnJheShwYXJzZUludChuQmFua3MudG9TdHJpbmcoKSkpLCAoZSwgaSkgPT4gJzAnKVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwcmVTd2l0Y2g6IG51bWJlcnMubWFwKGl0ZW0gPT4gKGl0ZW0udHJpbSgpID09ICcxJyA/IHRydWUgOiBmYWxzZSkpIH0pXG4gICAgIFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2cHJvcCwgcHJldnN0YXRlKSB7XG4gICAgICAgIGlmIChwcmV2cHJvcC5SZWNvcmQuTnVtYmVyT2ZCYW5rcyAhPT0gdGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcyB8fCBwcmV2cHJvcC5SZWNvcmQuQ2t0U3dpdGNoZXIgIT09IHRoaXMucHJvcHMuUmVjb3JkLkNrdFN3aXRjaGVyKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcyh0aGlzLnByb3BzLlJlY29yZC5Da3RTd2l0Y2hlcilcbiAgICAgICAgfVxuICAgICAgICBpZiAoIV8uaXNFcXVhbChwcmV2c3RhdGUsdGhpcy5zdGF0ZSkpIHtcbiAgICAgICAgICAgIHZhciByZWNvcmQ6IE9wZW5YREEuQ2FwQmFuayA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xuXG4gICAgICAgICAgICByZWNvcmQuQ2t0U3dpdGNoZXIgPSB0aGlzLnN0YXRlLnByZVN3aXRjaC5tYXAoaXRlbSA9PiAoaXRlbSA/IFwiMVwiIDogXCIwXCIpKS5qb2luKFwiLFwiKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnByb3BzLlNldHRlcihyZWNvcmQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWw+Q2FwQmFuayB3aXRoIFByZS1pbnNlcnRpb24gU3dpdGNoZXI8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLnByZVN3aXRjaC5tYXAoKHYsIGkpID0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcm9tLWNoZWNrIGZvcm0tY2hlY2staW5saW5lXCIga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY2hlY2staW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiBpZD17XCJpbmxpbmVDaGVja2JveC1cIiArIGl9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbHN0ID0gXy5jbG9uZSh0aGlzLnN0YXRlLnByZVN3aXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsc3RbaV0gPSAhbHN0W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZVN3aXRjaDogbHN0IH0pXG4gICAgICAgICAgICAgICAgICAgIH19IHZhbHVlPXsodiA/IDEgOiAwKX0gY2hlY2tlZD17dn0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tY2hlY2stbGFiZWxcIiBodG1sRm9yPXtcImlubGluZUNoZWNrYm94LVwiICsgaX0+e2krMX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2Pil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIExpbmUudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi9Bc3NldCc7XG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcblxuZnVuY3Rpb24gTGluZUF0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkxpbmUsIFVwZGF0ZVN0YXRlOiAobmV3RWRpdEFzc2V0OiBPcGVuWERBLkxpbmUpID0+IHZvaWQgfSk6IEpTWC5FbGVtZW50IHtcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuTGluZSkgfCBrZXlvZihPcGVuWERBLkxpbmVEZXRhaWwpKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaWVsZCA9PSAnTWF4RmF1bHREaXN0YW5jZScpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTWF4RmF1bHREaXN0YW5jZSA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTWF4RmF1bHREaXN0YW5jZSk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdNaW5GYXVsdERpc3RhbmNlJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5NaW5GYXVsdERpc3RhbmNlID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5NaW5GYXVsdERpc3RhbmNlKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xlbmd0aCcpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuRGV0YWlsLkxlbmd0aCA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuRGV0YWlsLkxlbmd0aCk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdSMCcpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuRGV0YWlsLlIwID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5EZXRhaWwuUjApO1xuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnWDAnKVxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkRldGFpbC5YMCA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuRGV0YWlsLlgwKTtcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1IxJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5EZXRhaWwuUjEgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkRldGFpbC5SMSk7XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdYMScpXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuRGV0YWlsLlgxID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5EZXRhaWwuWDEpO1xuICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdUaGVybWFsUmF0aW5nJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5EZXRhaWwuVGhlcm1hbFJhdGluZyA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuRGV0YWlsLlRoZXJtYWxSYXRpbmcpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMaW5lRGV0YWlsKHJlY29yZDogT3BlblhEQS5MaW5lRGV0YWlsKTogdm9pZCB7XG4gICAgICAgIHZhciBhc3NldDogT3BlblhEQS5MaW5lID0gXy5jbG9uZShwcm9wcy5Bc3NldCk7XG4gICAgICAgIGFzc2V0LkRldGFpbCA9IHJlY29yZDtcbiAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoYXNzZXQpO1xuXG4gICAgfVxuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICB9LCBbcHJvcHMuQXNzZXRdKTtcblxuICAgIGlmIChwcm9wcy5Bc3NldCA9PSBudWxsIHx8IHByb3BzLkFzc2V0LkRldGFpbCA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxpbmU+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTWF4RmF1bHREaXN0YW5jZSd9IExhYmVsPXsnTWF4IEZhdWx0IERpc3RhbmNlJ30gRmVlZGJhY2s9eydNYXggRmF1bHQgRGlzdGFuY2UgaXMgYSBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J01pbkZhdWx0RGlzdGFuY2UnfSBMYWJlbD17J01pbiBGYXVsdCBEaXN0YW5jZSd9IEZlZWRiYWNrPXsnTWluIEZhdWx0IERpc3RhbmNlIGlzIGEgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTGluZURldGFpbD4gUmVjb3JkPXtwcm9wcy5Bc3NldC5EZXRhaWx9IEZpZWxkPXsnTGVuZ3RoJ30gRmVlZGJhY2s9eydMZW5ndGggaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydSMCd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydYMCd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydSMSd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydYMSd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydUaGVybWFsUmF0aW5nJ30gTGFiZWw9eydUaGVybWFsIFJhdGluZyd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cbiAgICAgICAgPC8+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZUF0dHJpYnV0ZXM7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFRyYW5zZm9ybWVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi9Bc3NldCc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5mdW5jdGlvbiBUcmFuc2Zvcm1lckF0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLlRyYW5zZm9ybWVyLCBVcGRhdGVTdGF0ZTogKG5ld0VkaXRBc3NldDogT3BlblhEQS5UcmFuc2Zvcm1lcikgPT4gdm9pZCB9KTogSlNYLkVsZW1lbnQge1xyXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLlRyYW5zZm9ybWVyKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnUHJpbWFyeVZvbHRhZ2VLVicpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5QcmltYXJ5Vm9sdGFnZUtWID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5QcmltYXJ5Vm9sdGFnZUtWKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2Vjb25kYXJ5Vm9sdGFnZUtWJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlNlY29uZGFyeVZvbHRhZ2VLViA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuU2Vjb25kYXJ5Vm9sdGFnZUtWKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVGFwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlRhcCA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVGFwKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUjAnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUjAgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlIwKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnWDAnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuWDAgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlgwKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUjEnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUjEgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlIxKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnWDEnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuWDEgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlgxKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVGhlcm1hbFJhdGluZycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5UaGVybWFsUmF0aW5nICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5UaGVybWFsUmF0aW5nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9wcy5Bc3NldCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1IwJ30gRmVlZGJhY2s9eydSMCBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnWDAnfSBGZWVkYmFjaz17J1gwIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydSMSd9IEZlZWRiYWNrPXsnUjEgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1gxJ30gRmVlZGJhY2s9eydYMSBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVGhlcm1hbFJhdGluZyd9IExhYmVsPXsnVGhlcm1hbCBSYXRpbmcnfSBGZWVkYmFjaz17J1RoZXJtYWwgUmF0aW5nIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydQcmltYXJ5Vm9sdGFnZUtWJ30gTGFiZWw9eydQcmltYXJ5IFZvbHRhZ2UgKGtWKSd9IEZlZWRiYWNrPXsnUHJpbWFyeSBWb2x0YWdlIChrVikgaXMgYSBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1NlY29uZGFyeVZvbHRhZ2VLVid9IExhYmVsPXsnU2Vjb25kYXJ5IFZvbHRhZ2UgKGtWKSd9IEZlZWRiYWNrPXsnU2Vjb25kYXJ5IFZvbHRhZ2UgKGtWKSBpcyBhIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVGFwJ30gRmVlZGJhY2s9eydUYXAgaXMgYSBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICA8Lz5cclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRyYW5zZm9ybWVyQXR0cmlidXRlczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgRm9ybUNoZWNrQm94LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUNoZWNrQm94PFQ+IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgUmVjb3JkOiBULCBGaWVsZDoga2V5b2YgKFQpLCBTZXR0ZXI6IChyZWNvcmQ6IFQpID0+IHZvaWQsIExhYmVsPzogc3RyaW5nLCBEaXNhYmxlZD86IGJvb2xlYW4gfSwge30sIHt9PntcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWNoZWNrXCI+XHJcblxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3NOYW1lPVwiZm9ybS1jaGVjay1pbnB1dFwiIHN0eWxlPXt7IHpJbmRleDogMSB9fSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZDogVCA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID0gZXZ0LnRhcmdldC5jaGVja2VkIGFzIGFueTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlNldHRlcihyZWNvcmQpO1xyXG4gICAgICAgICAgICB9fSB2YWx1ZT17dGhpcy5wcm9wcy5SZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPyAnb24nIDogJ29mZid9IGNoZWNrZWQ9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID8gdHJ1ZSA6IGZhbHNlfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkfSAvPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1jaGVjay1sYWJlbFwiID57dGhpcy5wcm9wcy5MYWJlbCA9PSBudWxsID8gdGhpcy5wcm9wcy5GaWVsZCA6IHRoaXMucHJvcHMuTGFiZWx9PC9sYWJlbD5cclxuXHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=