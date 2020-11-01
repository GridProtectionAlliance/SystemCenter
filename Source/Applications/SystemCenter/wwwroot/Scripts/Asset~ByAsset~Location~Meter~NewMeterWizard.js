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
        var numbers = input.trim().split(",");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9TZXJ2aWNlcy9Bc3NldC50cyIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXIudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvQnVzLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmsudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvTGluZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9UcmFuc2Zvcm1lci50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL0Zvcm1DaGVja0JveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkEsU0FBUyxlQUFlLENBQUMsT0FBd0I7SUFDN0MsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1YsSUFBSSxFQUFFLEtBQUs7UUFDWCxHQUFHLEVBQUssUUFBUSw0QkFBdUIsT0FBTyxDQUFDLEVBQUUsa0JBQWU7UUFDaEUsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxRQUFRLEVBQUUsTUFBTTtRQUNoQixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLE9BQXdCO0lBQ25ELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxFQUFLLFFBQVEsNEJBQXVCLE9BQU8sQ0FBQyxFQUFFLGNBQVc7UUFDNUQsV0FBVyxFQUFFLGlDQUFpQztRQUM5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Q0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkcsSUFBSSxLQUFLLElBQUksSUFBSTtZQUNsQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLElBQUksOENBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDM0YsSUFBSSxLQUFLLElBQUksSUFBSTtZQUNsQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLElBQUksOENBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDM0YsSUFBSSxLQUFLLElBQUksSUFBSTtZQUNsQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLElBQUksOENBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDM0YsSUFBSSxLQUFLLElBQUksSUFBSTtZQUNsQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLElBQUksOENBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDNUYsSUFBSSxLQUFLLElBQUksZUFBZTtZQUM1QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxJQUFJLElBQUksOENBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdEgsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQVMsZ0JBQWdCLENBQUMsTUFBMEI7UUFDaEQsSUFBSSxLQUFL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QUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUk7WUFDbE0sK0RBQU8sU0FBUyxFQUFDLGtCQUFrQixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFTLENBRTNHLENBQUM7SUFDWCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLENBZDRDLCtDQUFlLEdBYzNEIiwiZmlsZSI6IkFzc2V0fkJ5QXNzZXR+TG9jYXRpb25+TWV0ZXJ+TmV3TWV0ZXJXaXphcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEFzc2V0U2VydmljZXMudHMgLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjMvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gXCIuLi8uLi9UU1gvU3lzdGVtQ2VudGVyL2dsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSBcIi4uLy4uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvQXNzZXRcIjtcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0U3BhcmVCcmVha2VyKGJyZWFrZXI6IE9wZW5YREEuQnJlYWtlcik6IFByb21pc2U8T3BlblhEQS5CcmVha2VyPiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQnJlYWtlci8ke2JyZWFrZXIuSUR9L1NwYXJlQnJlYWtlcmAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9jYXRpb25Gb3JCcmVha2VyKGJyZWFrZXI6IE9wZW5YREEuQnJlYWtlcik6IFByb21pc2U8T3BlblhEQS5Mb2NhdGlvbj4ge1xyXG4gICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0JyZWFrZXIvJHticmVha2VyLklEfS9Mb2NhdGlvbmAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxuXHJcbn1cclxuZnVuY3Rpb24gZ2V0U3BhcmVzRm9yTG9jYXRpb24obG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24pOiBQcm9taXNlPEFycmF5PE9wZW5YREEuQnJlYWtlcj4+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9CcmVha2VyL1NwYXJlQnJlYWtlcnMvU3Vic3RhdGlvbi8ke2xvY2F0aW9uLklEfWAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTcGFyZUJyZWFrZXJzRm9yU3Vic3RhdGlvbihicmVha2VyOiBPcGVuWERBLkJyZWFrZXIpOiBQcm9taXNlPEFycmF5PE9wZW5YREEuQnJlYWtlcj4+IHtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgZ2V0TG9jYXRpb25Gb3JCcmVha2VyKGJyZWFrZXIpO1xyXG4gICAgaWYgKGxvY2F0aW9uID09IG51bGwpIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHNwYXJlcyA9IGF3YWl0IGdldFNwYXJlc0ZvckxvY2F0aW9uKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiBzcGFyZXNcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBc3NldFR5cGVzKCk6IEpRdWVyeVhIUiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRUeXBlYCxcclxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxBc3NldHMoKTogSlF1ZXJ5WEhSe1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldGAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFzc2V0KGFzc2V0SUQ6IG51bWJlciwgYXNzZXRUeXBlOiBPcGVuWERBLkFzc2V0VHlwZU5hbWUpOiBQcm9taXNlPE9wZW5YREEuQXNzZXQ+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS8ke2Fzc2V0VHlwZX0vT25lLyR7YXNzZXRJRH1gLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMoYXNzZXRJRDogbnVtYmVyLCBhc3NldFR5cGU6IE9wZW5YREEuQXNzZXRUeXBlTmFtZSk6IFByb21pc2U8T3BlblhEQS5Bc3NldD4ge1xyXG4gICAgdmFyIGFzc2V0ID0gYXdhaXQgZ2V0QXNzZXQoYXNzZXRJRCwgYXNzZXRUeXBlKTtcclxuICAgIGFzc2V0LkFzc2V0VHlwZSA9IGFzc2V0VHlwZTtcclxuICAgIGFzc2V0LkNoYW5uZWxzID0gW107XHJcblxyXG4gICAgaWYgKGFzc2V0VHlwZSA9PSAnQnJlYWtlcicpIHtcclxuICAgICAgICBjb25zdCBlRE5BUG9pbnQgPSBhd2FpdCBnZXRFRE5BUG9pbnQoYXNzZXQgYXMgT3BlblhEQS5CcmVha2VyKVxyXG4gICAgICAgIGlmIChlRE5BUG9pbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgYXNzZXRbJ0VETkFQb2ludCddID0gZUROQVBvaW50LlBvaW50O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYXNzZXRbJ0VETkFQb2ludCddID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3Qgc3BhcmVCcmVha2VyID0gYXdhaXQgYXdhaXQgZ2V0U3BhcmVCcmVha2VyKGFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcilcclxuICAgICAgICBpZiAoc3BhcmVCcmVha2VyICE9IG51bGwpXHJcbiAgICAgICAgICAgIGFzc2V0WydTcGFyZUJyZWFrZXJJRCddID0gc3BhcmVCcmVha2VyLklEO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYXNzZXRbJ1NwYXJlQnJlYWtlcklEJ10gPSBudWxsO1xyXG4gICAgfSAgIFxyXG4gICAgZWxzZSBpZiAoYXNzZXRUeXBlID09ICdMaW5lJylcclxuICAgICAgICBhc3NldFsnRGV0YWlsJ10gPSBhd2FpdCBnZXRMaW5lRGV0YWlscyhhc3NldCBhcyBPcGVuWERBLkxpbmUpO1xyXG5cclxuICAgIHJldHVybiBhc3NldDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RUROQVBvaW50KGJyZWFrZXI6IE9wZW5YREEuQnJlYWtlcik6IFByb21pc2U8T3BlblhEQS5FRE5BUG9pbnQ+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9CcmVha2VyLyR7YnJlYWtlci5JRH0vRUROQVBvaW50YCxcclxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSkucHJvbWlzZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMaW5lRGV0YWlscyhsaW5lOiBPcGVuWERBLkxpbmUpOiBQcm9taXNlPE9wZW5YREEuTGluZURldGFpbD4ge1xyXG4gICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmUvJHtsaW5lLklEfS9MaW5lU2VnbWVudGAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlZGl0RXhpc3RpbmdBc3NldChhc3NldDogT3BlblhEQS5Bc3NldCk6IFByb21pc2U8T3BlblhEQS5Bc3NldD4ge1xyXG4gICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0L0VkaXRgLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgQXNzZXQ6IGFzc2V0IH0pLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSkucHJvbWlzZSgpO1xyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEJyZWFrZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzE3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuL0Fzc2V0JztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBGb3JtQ2hlY2tCb3ggZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtQ2hlY2tCb3gnO1xyXG5pbXBvcnQgeyBnZXRTcGFyZUJyZWFrZXJzRm9yU3Vic3RhdGlvbiB9IGZyb20gJy4uLy4uLy4uL1RTL1NlcnZpY2VzL0Fzc2V0JztcclxuXHJcbmZ1bmN0aW9uIEJyZWFrZXJBdHRyaWJ1dGVzKHByb3BzOiB7IE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LCBBc3NldDogT3BlblhEQS5CcmVha2VyLCBVcGRhdGVTdGF0ZTogKG5ld0VkaXRBc3NldDogT3BlblhEQS5CcmVha2VyKSA9PiB2b2lkLCBTaG93U3BhcmU/OiBib29sZWFuIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YoT3BlblhEQS5CcmVha2VyKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnVGhlcm1hbFJhdGluZycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5UaGVybWFsUmF0aW5nICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5UaGVybWFsUmF0aW5nKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU3BlZWQnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuU3BlZWQgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlNwZWVkKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVHJpcFRpbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVHJpcFRpbWUgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0LlRyaXBUaW1lKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUGlja3VwVGltZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5QaWNrdXBUaW1lID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5QaWNrdXBUaW1lKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVHJpcENvaWxDb25kaXRpb24nKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVHJpcENvaWxDb25kaXRpb24gPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlRyaXBDb2lsQ29uZGl0aW9uKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRUROQVBvaW50JykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1NwYXJlJykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1NwYXJlQnJlYWtlcklEJykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgW3NwYXJlcywgc2V0U3BhcmVzXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuQnJlYWtlcj4+KFtdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGdldFNwYXJlQnJlYWtlcnNGb3JTdWJzdGF0aW9uKHByb3BzLkFzc2V0KS50aGVuKHNwcyA9PiB7XHJcbiAgICAgICAgICAgIHNldFNwYXJlcyhzcHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSwgW3Byb3BzLkFzc2V0XSk7XHJcblxyXG4gICAgaWYgKHByb3BzLkFzc2V0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydUaGVybWFsUmF0aW5nJ30gTGFiZWw9eydUaGVybWFsIFJhdGluZyd9IEZlZWRiYWNrPXsnVGhlcm1hbCByYXRpbmcgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9eyBwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1NwZWVkJ30gRmVlZGJhY2s9eydTcGVlZCBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydUcmlwVGltZSd9IExhYmVsPXsnVHJpcCBUaW1lJ30gRmVlZGJhY2s9eydUcmlwIFRpbWUgaXMgYW4gaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1BpY2t1cFRpbWUnfSBMYWJlbD17J1BpY2t1cCBUaW1lJ30gRmVlZGJhY2s9eydQaWNrdXAgVGltZSBpcyBhbiBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkJyZWFrZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVHJpcENvaWxDb25kaXRpb24nfSBMYWJlbD17J1RyaXAgQ29pbCBDb25kaXRpb24nfSBGZWVkYmFjaz17J1RyaXAgQ29pbCBDb25kaXRpb24gaXMgYW4gbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0VETkFQb2ludCd9IExhYmVsPXsnRUROQSBQb2ludCd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiIGhpZGRlbj17cHJvcHMuU2hvd1NwYXJlICE9IHRydWV9PlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPlNwYXJlIEJyZWFrZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17cHJvcHMuQXNzZXQuU3BhcmVCcmVha2VySUQgPT0gbnVsbCA/IDAgOiBwcm9wcy5Bc3NldC5TcGFyZUJyZWFrZXJJRH0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkOiBPcGVuWERBLkJyZWFrZXIgPSBfLmNsb25lKHByb3BzLkFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSA9PSAnMCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC5TcGFyZUJyZWFrZXJJRCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQuU3BhcmVCcmVha2VySUQgPSBwYXJzZUludChldnQudGFyZ2V0LnZhbHVlIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUocmVjb3JkKVxyXG4gICAgICAgICAgICAgICAgfX0gZGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MH0ga2V5PXswfSA+Tm9uZTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhcmVzLm1hcChzcGFyZSA9PiA8b3B0aW9uIHZhbHVlPXtzcGFyZS5JRH0ga2V5PXtzcGFyZS5JRH0gPntzcGFyZS5Bc3NldEtleX08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPEZvcm1DaGVja0JveDxPcGVuWERBLkJyZWFrZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnU3BhcmUnfSBMYWJlbD17J0lzIFNwYXJlJ30gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnJlYWtlckF0dHJpYnV0ZXM7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEJ1cy50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuZnVuY3Rpb24gQnVzQXR0cmlidXRlcyhwcm9wczogeyBOZXdFZGl0OiBTeXN0ZW1DZW50ZXIuTmV3RWRpdCwgQXNzZXQ6IE9wZW5YREEuQnVzLCBVcGRhdGVTdGF0ZTogKG5ld0VkaXRBc3NldDogT3BlblhEQS5CdXMpID0+IHZvaWQgfSk6IEpTWC5FbGVtZW50IHtcclxuICAgIHJldHVybiA8c3Bhbj5ObyBBZGRpdGlvbmFsIEF0dHJpYnV0ZXM8L3NwYW4+O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXNBdHRyaWJ1dGVzOyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDYXBCYW5rLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi9Bc3NldCc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5pbXBvcnQgRm9ybUNoZWNrQm94IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUNoZWNrQm94JztcclxuZnVuY3Rpb24gQ2FwQmFua0F0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkNhcEJhbmssIFVwZGF0ZVN0YXRlOiAobmV3RWRpdEFzc2V0OiBPcGVuWERBLkNhcEJhbmspID0+IHZvaWQgfSk6IEpTWC5FbGVtZW50IHtcclxuICAgIGZ1bmN0aW9uIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5DYXBCYW5rKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnTnVtYmVyT2ZCYW5rcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OdW1iZXJPZkJhbmtzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5OdW1iZXJPZkJhbmtzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQ2FwYWNpdGFuY2VQZXJCYW5rJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkNhcGFjaXRhbmNlUGVyQmFuayAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuQ2FwYWNpdGFuY2VQZXJCYW5rKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTWF4S1YnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTWF4S1YgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0Lk1heEtWKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVW5pdEtWJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlVuaXRLViAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVW5pdEtWKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVW5pdEtWQXInKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVW5pdEtWQXIgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlVuaXRLVkFyKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUG9zUmVhY3RhbmNlVG9sJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlBvc1JlYWN0YW5jZVRvbCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuUG9zUmVhY3RhbmNlVG9sKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmVnUmVhY3RhbmNlVG9sJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5lZ1JlYWN0YW5jZVRvbCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTmVnUmVhY3RhbmNlVG9sKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnBhcmFsZWxsJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5wYXJhbGVsbCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTnBhcmFsZWxsKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnNlcmllcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Oc2VyaWVzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5Oc2VyaWVzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTlNlcmllc0dyb3VwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5TZXJpZXNHcm91cCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTlNlcmllc0dyb3VwKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTlBhcmFsZWxsR3JvdXAnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTlBhcmFsZWxsR3JvdXAgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk5QYXJhbGVsbEdyb3VwKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVlRyYXRpb0J1cycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5WVHJhdGlvQnVzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5WVHJhdGlvQnVzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnVtYmVyTFZDYXBzJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk51bWJlckxWQ2FwcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTnVtYmVyTFZDYXBzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnVtYmVyTFZVbml0cycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OdW1iZXJMVlVuaXRzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5OdW1iZXJMVlVuaXRzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTFZLVkFyJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkxWS1ZBciAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTFZLVkFyKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTFZLVicpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5MVktWICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5MVktWKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTFZOZWdSZWFjdGFuY2VUb2wnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTFZOZWdSZWFjdGFuY2VUb2wgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkxWTmVnUmVhY3RhbmNlVG9sKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTFZQb3NSZWFjdGFuY2VUb2wnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTFZQb3NSZWFjdGFuY2VUb2wgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkxWUG9zUmVhY3RhbmNlVG9sKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVXBwZXJYRlJSYXRpbycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5VcHBlclhGUlJhdGlvICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5VcHBlclhGUlJhdGlvKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTG93ZXJYRlJSYXRpbycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Mb3dlclhGUlJhdGlvICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5Mb3dlclhGUlJhdGlvKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnNob3J0ZWQnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTnNob3J0ZWQgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0Lk5zaG9ydGVkKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQmxvd25GdXNlcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5CbG93bkZ1c2VzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5CbG93bkZ1c2VzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQmxvd25Hcm91cHMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuQmxvd25Hcm91cHMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkJsb3duR3JvdXBzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUnYnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUnYgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlJ2KTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUmgnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUmggIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlJoKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTkxvd2VyR3JvdXBzJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5Mb3dlckdyb3VwcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTkxvd2VyR3JvdXBzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnRlZEdyb3VwcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5TaG9ydGVkR3JvdXBzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5TaG9ydGVkR3JvdXBzKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAocHJvcHMuQXNzZXQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxEZXNpZ25TZWxlY3QgUmVjb3JkPXtwcm9wcy5Bc3NldH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPFByZVN3aXRjaFNlbGVjdCBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnVtYmVyT2ZCYW5rcyd9IExhYmVsPXsnTnVtYmVyIE9mIEJhbmtzJ30gRmVlZGJhY2s9eydOdW1iZXIgT2YgQmFua3MgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnQ2FwYWNpdGFuY2VQZXJCYW5rJ30gTGFiZWw9eydDYXBhY2l0b3IgU3RlcCBTaXplIChrVkFSKSd9IEZlZWRiYWNrPXsnQ2FwYWNpdG9yIFN0ZXAgU2l6ZSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J01heEtWJ30gTGFiZWw9eydNYXhpbXVtIE9wZXJhdGluZyBWb2x0YWdlIChrViknfSBGZWVkYmFjaz17J01heGltdW0gT3BlcmF0aW5nIFZvbHRhZ2UgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1VuaXRLVid9IExhYmVsPXsnUmF0ZWQgVm9sdGFnZSBvZiBhIFVuaXQgKGtWKSd9IEZlZWRiYWNrPXsnUmF0ZWQgVm9sdGFnZSBvZiBhIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydVbml0S1ZBcid9IExhYmVsPXsnUmF0aW5nIG9mIGEgVW5pdCAoa1ZBUiknfSBGZWVkYmFjaz17J1JhdGluZyBvZiBhIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1Bvc1JlYWN0YW5jZVRvbCd9IExhYmVsPXsncG9zLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIGEgVW5pdCAoJSknfSBGZWVkYmFjaz17J3Bvcy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBhIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J05lZ1JlYWN0YW5jZVRvbCd9IExhYmVsPXsnbmVnLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIGEgVW5pdCAoJSknfSBGZWVkYmFjaz17J25lZy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBhIFVuaXQgKCUpIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnBhcmFsZWxsJ30gTGFiZWw9eyhwcm9wcy5Bc3NldC5GdXNlZCA/ICdOdW0uIG9mIFVuaXRzIHBlciBncm91cCcgOiAnTnVtLiBvZiBQYXJhbGxlbCBTdHJpbmdzJyl9IEZlZWRiYWNrPXsocHJvcHMuQXNzZXQuRnVzZWQgPyAnTnVtLiBvZiBDYXBzLiBwZXIgZ3JvdXAnIDogJ051bS4gb2YgUGFyYWxsZWwgU3RyaW5ncycpICsgJyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOc2VyaWVzJ30gTGFiZWw9eyhwcm9wcy5Bc3NldC5GdXNlZCA/ICdOdW0uIG9mIFNlcmllcyBHcm91cHMgcGVyIFBoYXNlJyA6ICdOdW0uIFVuaXRzIGluIGVhY2ggU3RyaW5nJyl9IEZlZWRiYWNrPXsocHJvcHMuQXNzZXQuRnVzZWQgPyAnTnVtLiBvZiBTZXJpZXMgR3JvdXBzIHBlciBQaGFzZScgOiAnTnVtLiBVbml0cyBpbiBlYWNoIFN0cmluZycpICsgJyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgeyghcHJvcHMuQXNzZXQuRnVzZWQgP1xyXG4gICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOU2VyaWVzR3JvdXAnfSBMYWJlbD17J051bS4gb2YgU2VyaWVzIEdyb3VwcyBpbiBlYWNoIFVuaXQnfSBGZWVkYmFjaz17J051bS4gb2YgU2VyaWVzIEdyb3VwcyBpbiBlYWNoIFVuaXQgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOUGFyYWxlbGxHcm91cCd9IExhYmVsPXsnTnVtLiBvZiBFbGVtZW50cyBpbiBlYWNoIEdyb3VwJ30gRmVlZGJhY2s9eydOdW0uIG9mIEVsZW1lbnRzIGluIGVhY2ggR3JvdXAgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgIDwvPiA6IG51bGwpfVxyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgeyhwcm9wcy5Bc3NldC5GdXNlZCA/IFxyXG4gICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydVcHBlclhGUlJhdGlvJ30gTGFiZWw9eydVcHBlciBHcm91cCBWVCBSYXRpbyd9IEZlZWRiYWNrPXsnVXBwZXIgR3JvdXAgVlQgUmF0aW8gaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydMb3dlclhGUlJhdGlvJ30gTGFiZWw9eydMb3dlciBHcm91cCBWVCBSYXRpbyd9IEZlZWRiYWNrPXsnTG93ZXIgR3JvdXAgVlQgUmF0aW8gaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J05zaG9ydGVkJ30gTGFiZWw9eydJbml0aWFsIGd1ZXNzIG9mIHNob3J0ZWQgZ3JvdXBzJ30gRmVlZGJhY2s9eydJbml0aWFsIGd1ZXNzIG9mIHNob3J0ZWQgZ3JvdXBzIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0Jsb3duRnVzZXMnfSBMYWJlbD17J0luaXRpYWwgR3Vlc3Mgb2YgYmxvd24gZnVzZXMgcGVyIGdyb3VwJ30gRmVlZGJhY2s9eydJbml0aWFsIEd1ZXNzIG9mIGJsb3duIGZ1c2VzIHBlciBncm91cCBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydCbG93bkdyb3Vwcyd9IExhYmVsPXsnSW5pdGlhbCBndWVzcyBvZiBHcm91cHMgd2l0aCBibG93biBGdXNlJ30gRmVlZGJhY2s9eydJbml0aWFsIGd1ZXNzIG9mIEdyb3VwcyB3aXRoIGJsb3duIEZ1c2UgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnU2hvcnRlZEdyb3Vwcyd9IExhYmVsPXsnSW5pdGlhbCBndWVzcyBvZiBHcm91cHMgd2l0aCBibG93biBGdXNlJ30gRmVlZGJhY2s9eydJbml0aWFsIGd1ZXNzIG9mIHNob3J0ZWQgR3JvdXBzIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgIDwvPiA6IDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVlRyYXRpb0J1cyd9IExhYmVsPXsnQnVzIFZUIFJhdGlvJ30gRmVlZGJhY2s9eydCdXMgVlQgUmF0aW8gaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnVtYmVyTFZDYXBzJ30gTGFiZWw9eydOdW0ub2YgUmVsYXkgQ2Fwcyd9IEZlZWRiYWNrPXsnTnVtLiBvZiBSZWxheSBDYXBzIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnVtYmVyTFZVbml0cyd9IExhYmVsPXsnTnVtLiBvZiBFbGVtZW50cyBwZXIgUmVsYXkgQ2FwJ30gRmVlZGJhY2s9eydOdW0uIG9mIEVsZW1lbnRzIHBlciBSZWxheSBDYXAgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydMVktWQXInfSBMYWJlbD17J0xvdyBWb2x0YWdlIENhcCBzaXplIChrVkFSKSd9IEZlZWRiYWNrPXsnTG93IFZvbHRhZ2UgQ2FwIHNpemUgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTFZLVid9IExhYmVsPXsnTG93IFZvbGF0YWdlIENhcCByYXRpbmcgKFYpJ30gRmVlZGJhY2s9eydMb3cgVm9sYXRhZ2UgQ2FwIHJhdGluZyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0xWTmVnUmVhY3RhbmNlVG9sJ30gTGFiZWw9eyduZWcuIFJlYWN0YW5jZSBUb2xlcmFuY2Ugb2YgTFYgVW5pdCAoJSknfSBGZWVkYmFjaz17J25lZy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBMViBVbml0aXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTFZQb3NSZWFjdGFuY2VUb2wnfSBMYWJlbD17J3Bvcy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBMViBVbml0ICglKSd9IEZlZWRiYWNrPXsncG9zLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIExWIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFBUUmF0aW9JbnB1dCBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1J2J30gTGFiZWw9eydWb2x0YWdlIERpdmlkZXIgb3V0cHV0IFIgKE9obSknfSBGZWVkYmFjaz17J1ZvbHRhZ2UgRGl2aWRlciBvdXRwdXQgUiBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydSaCd9IExhYmVsPXsnVm9sdGFnZSBEaXZpZGVyIGlucHV0IFInfSBGZWVkYmFjaz17J1ZvbHRhZ2UgRGl2aWRlciBpbnB1dCBSIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOc2hvcnRlZCd9IExhYmVsPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIGVsZW1lbnRzJ30gRmVlZGJhY2s9eydJbml0aWFsIGd1ZXNzIG9mIHNob3J0ZWQgZWxlbWVudHMgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPC8+KX1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICA8Lz5cclxuICAgICk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXBCYW5rQXR0cmlidXRlcztcclxuXHJcbmNsYXNzIERlc2lnblNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogT3BlblhEQS5DYXBCYW5rLCBTZXR0ZXI6IChyZWNvcmQ6IE9wZW5YREEuQ2FwQmFuaykgPT4gdm9pZCwgRGlzYWJsZWQ/OiBib29sZWFufSwge30sIHt9PntcclxuXHJcbiAgICBjb21wdXRCb29scyhzZWxlY3Rpb246IHN0cmluZykge1xyXG4gICAgICAgIHZhciByZWNvcmQ6IE9wZW5YREEuQ2FwQmFuayA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0aW9uID09ICcwJykge1xyXG4gICAgICAgICAgICByZWNvcmQuQ29tcGVuc2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZWNvcmQuRnVzZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0aW9uID09ICcxJykge1xyXG4gICAgICAgICAgICByZWNvcmQuQ29tcGVuc2F0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVjb3JkLkZ1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdGlvbiA9PSAnMicpIHtcclxuICAgICAgICAgICAgcmVjb3JkLkNvbXBlbnNhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlY29yZC5GdXNlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByb3BzLlNldHRlcihyZWNvcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVTZWxlY3Rpb24ocmVjb3JkOiBPcGVuWERBLkNhcEJhbmspOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChyZWNvcmQuQ29tcGVuc2F0ZWQpIFxyXG4gICAgICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICAgICAgZWxzZSBpZiAoIXJlY29yZC5GdXNlZCkgXHJcbiAgICAgICAgICAgIHJldHVybiBcIjFcIjtcclxuICAgICAgICByZXR1cm4gXCIyXCI7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWw+RGVzaWduPC9sYWJlbD5cclxuICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5jb21wdXRlU2VsZWN0aW9uKHRoaXMucHJvcHMuUmVjb3JkKX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZH0gb25DaGFuZ2U9eyhldnQpID0+IHRoaXMuY29tcHV0Qm9vbHMoZXZ0LnRhcmdldC52YWx1ZSl9PlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9ezB9IHZhbHVlPVwiMFwiPkZ1c2VsZXNzIENvbXBlbnNhdGVkPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17MX0gdmFsdWU9XCIxXCI+RnVzZWxlc3MgVW5jb21wZW5zYXRlZDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9ezJ9IHZhbHVlPVwiMlwiPkZ1c2VkPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUFRSYXRpb0lucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgUmVjb3JkOiBPcGVuWERBLkNhcEJhbmssIFNldHRlcjogKHJlY29yZDogT3BlblhEQS5DYXBCYW5rKSA9PiB2b2lkLCBEaXNhYmxlZD86IGJvb2xlYW4gfSwge2xvdzogc3RyaW5nLCBoaWdoOiBzdHJpbmd9LCB7fT57XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcblxyXG4gICAgICAgIGxldCByZWdleCA9IC9eKFswLTldKykgKFswLTldKykkLztcclxuICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlJlY29yZC5SZWxheVBUUmF0aW8gIT0gdW5kZWZpbmVkICYmIHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpby5tYXRjaChyZWdleCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0geyBsb3c6IHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpby5tYXRjaChyZWdleClbMV0sIGhpZ2g6IHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpby5tYXRjaChyZWdleClbMl0gfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7IGxvdzogXCJcIiwgaGlnaDogXCJcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmFsdWVzKGlucHV0OiBzdHJpbmcpIHtcclxuICAgICAgICBpbnB1dCA9IGlucHV0LnRyaW0oKTtcclxuXHJcbiAgICAgICAgbGV0IHJlZ2V4ID0gL14oWzAtOV0rKSAoWzAtOV0rKSQvO1xyXG4gICAgICAgIGlmIChpbnB1dC5tYXRjaChyZWdleCkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG93OiBpbnB1dC5tYXRjaChyZWdleClbMV0sIGhpZ2g6IGlucHV0Lm1hdGNoKHJlZ2V4KVsyXSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG93OiBcIjBcIiwgaGlnaDogXCIxMDBcIn0pXHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2cHJvcCwgcHJldnN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHByZXZwcm9wLlJlY29yZC5SZWxheVBUUmF0aW8gIT09IHRoaXMucHJvcHMuUmVjb3JkLlJlbGF5UFRSYXRpbykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcyh0aGlzLnByb3BzLlJlY29yZC5SZWxheVBUUmF0aW8pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgocHJldnN0YXRlLmxvdyAhPT0gdGhpcy5zdGF0ZS5sb3cgfHwgcHJldnN0YXRlLmhpZ2ggIT09IHRoaXMuc3RhdGUuaGlnaCkgJiYgdGhpcy5pc0ludGVnZXIodGhpcy5zdGF0ZS5sb3cpICYmIHRoaXMuaXNJbnRlZ2VyKHRoaXMuc3RhdGUuaGlnaCkpIHtcclxuICAgICAgICAgICAgdmFyIHJlY29yZDogT3BlblhEQS5DYXBCYW5rID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUludCh0aGlzLnN0YXRlLmxvdykgPiBwYXJzZUludCh0aGlzLnN0YXRlLmhpZ2gpKVxyXG4gICAgICAgICAgICAgICAgcmVjb3JkLlJlbGF5UFRSYXRpbyA9IHRoaXMuc3RhdGUubG93LnRvU3RyaW5nKCkgKyBcIiBcIiArIHRoaXMuc3RhdGUuaGlnaC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZWNvcmQuUmVsYXlQVFJhdGlvID0gdGhpcy5zdGF0ZS5oaWdoLnRvU3RyaW5nKCkgKyBcIiBcIiArIHRoaXMuc3RhdGUubG93LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSW50ZWdlcih2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdmFyIHJlZ2V4ID0gL14tP1swLTldKyQvO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLm1hdGNoKHJlZ2V4KSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD5SZWxheSBQVCBSYXRpbzwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9eyh0aGlzLmlzSW50ZWdlcih0aGlzLnN0YXRlLmhpZ2gpID8gXCJmb3JtLWNvbnRyb2xcIiA6IFwiZm9ybS1jb250cm9sIGlzLWludmFsaWRcIil9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGhpZ2g6IGV2dC50YXJnZXQudmFsdWUgYXMgc3RyaW5nfSlcclxuICAgICAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnN0YXRlLmhpZ2h9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9IC8+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXsodGhpcy5pc0ludGVnZXIodGhpcy5zdGF0ZS5sb3cpID8gXCJmb3JtLWNvbnRyb2xcIiA6IFwiZm9ybS1jb250cm9sIGlzLWludmFsaWRcIil9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvdzogZXZ0LnRhcmdldC52YWx1ZSBhcyBzdHJpbmcgfSlcclxuICAgICAgICAgICAgICAgICAgICB9fSB2YWx1ZT17dGhpcy5zdGF0ZS5sb3d9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0naW52YWxpZC1mZWVkYmFjayc+IFJlbGF5IFBUIFJhdGlvIGlzIGEgcmVxdWlyZWQgZmllbGQuPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQcmVTd2l0Y2hTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IE9wZW5YREEuQ2FwQmFuaywgU2V0dGVyOiAocmVjb3JkOiBPcGVuWERBLkNhcEJhbmspID0+IHZvaWQsIERpc2FibGVkPzogYm9vbGVhbiB9LCB7IHByZVN3aXRjaDogYm9vbGVhbltdIH0sIHt9PntcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgbGV0IG51bWJlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuUmVjb3JkLkNrdFN3aXRjaGVyICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgbnVtYmVycyA9IHRoaXMucHJvcHMuUmVjb3JkLkNrdFN3aXRjaGVyLnRyaW0oKS5zcGxpdChcIixcIik7XHJcblxyXG4gICAgICAgIGxldCBuQmFua3MgPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlJlY29yZC5OdW1iZXJPZkJhbmtzICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgbkJhbmtzID0gdGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcztcclxuXHJcbiAgICAgICAgaWYgKG51bWJlcnMubGVuZ3RoICE9PSBwYXJzZUludChuQmFua3MudG9TdHJpbmcoKSkpXHJcbiAgICAgICAgICAgIG51bWJlcnMgPSBBcnJheS5mcm9tKEFycmF5KHBhcnNlSW50KG5CYW5rcy50b1N0cmluZygpKSksIChlLCBpKSA9PiAnMCcpXHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IHByZVN3aXRjaDogbnVtYmVycy5tYXAoaXRlbSA9PiAoaXRlbS50cmltKCkgPT0gJzEnPyB0cnVlOiBmYWxzZSkpIH07XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmFsdWVzKGlucHV0OiBzdHJpbmcpIHtcclxuICAgICAgXHJcbiAgICAgICAgbGV0IG51bWJlcnMgPSBpbnB1dC50cmltKCkuc3BsaXQoXCIsXCIpO1xyXG5cclxuICAgICAgICBsZXQgbkJhbmtzID0gMTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIG5CYW5rcyA9IHRoaXMucHJvcHMuUmVjb3JkLk51bWJlck9mQmFua3M7XHJcblxyXG4gICAgICAgIGlmIChudW1iZXJzLmxlbmd0aCAhPT0gcGFyc2VJbnQobkJhbmtzLnRvU3RyaW5nKCkpKVxyXG4gICAgICAgICAgICBudW1iZXJzID0gQXJyYXkuZnJvbShBcnJheShwYXJzZUludChuQmFua3MudG9TdHJpbmcoKSkpLCAoZSwgaSkgPT4gJzAnKVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJlU3dpdGNoOiBudW1iZXJzLm1hcChpdGVtID0+IChpdGVtLnRyaW0oKSA9PSAnMScgPyB0cnVlIDogZmFsc2UpKSB9KVxyXG4gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2cHJvcCwgcHJldnN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHByZXZwcm9wLlJlY29yZC5OdW1iZXJPZkJhbmtzICE9PSB0aGlzLnByb3BzLlJlY29yZC5OdW1iZXJPZkJhbmtzIHx8IHByZXZwcm9wLlJlY29yZC5Da3RTd2l0Y2hlciAhPT0gdGhpcy5wcm9wcy5SZWNvcmQuQ2t0U3dpdGNoZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZXModGhpcy5wcm9wcy5SZWNvcmQuQ2t0U3dpdGNoZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghXy5pc0VxdWFsKHByZXZzdGF0ZSx0aGlzLnN0YXRlKSkge1xyXG4gICAgICAgICAgICB2YXIgcmVjb3JkOiBPcGVuWERBLkNhcEJhbmsgPSBfLmNsb25lKHRoaXMucHJvcHMuUmVjb3JkKTtcclxuXHJcbiAgICAgICAgICAgIHJlY29yZC5Da3RTd2l0Y2hlciA9IHRoaXMuc3RhdGUucHJlU3dpdGNoLm1hcChpdGVtID0+IChpdGVtID8gXCIxXCIgOiBcIjBcIikpLmpvaW4oXCIsXCIpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLlNldHRlcihyZWNvcmQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD5DYXBCYW5rIHdpdGggUHJlLWluc2VydGlvbiBTd2l0Y2hlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLnByZVN3aXRjaC5tYXAoKHYsIGkpID0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyb20tY2hlY2sgZm9ybS1jaGVjay1pbmxpbmVcIiBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNoZWNrLWlucHV0XCIgdHlwZT1cImNoZWNrYm94XCIgaWQ9e1wiaW5saW5lQ2hlY2tib3gtXCIraX0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxzdCA9IF8uY2xvbmUodGhpcy5zdGF0ZS5wcmVTd2l0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsc3RbaV0gPSAhbHN0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJlU3dpdGNoOiBsc3QgfSlcclxuICAgICAgICAgICAgICAgICAgICB9fSB2YWx1ZT17KHY/IDEgOiAwKX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1jaGVjay1sYWJlbFwiIGh0bWxGb3I9e1wiaW5saW5lQ2hlY2tib3gtXCIgKyBpfT57aSsxfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTGluZS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4vQXNzZXQnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuXHJcbmZ1bmN0aW9uIExpbmVBdHRyaWJ1dGVzKHByb3BzOiB7IE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LCBBc3NldDogT3BlblhEQS5MaW5lLCBVcGRhdGVTdGF0ZTogKG5ld0VkaXRBc3NldDogT3BlblhEQS5MaW5lKSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuTGluZSkgfCBrZXlvZihPcGVuWERBLkxpbmVEZXRhaWwpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdNYXhGYXVsdERpc3RhbmNlJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk1heEZhdWx0RGlzdGFuY2UgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0Lk1heEZhdWx0RGlzdGFuY2UpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdNaW5GYXVsdERpc3RhbmNlJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk1pbkZhdWx0RGlzdGFuY2UgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0Lk1pbkZhdWx0RGlzdGFuY2UpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdMZW5ndGgnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuRGV0YWlsLkxlbmd0aCA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuRGV0YWlsLkxlbmd0aCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1IwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkRldGFpbC5SMCA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuRGV0YWlsLlIwKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnWDAnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuRGV0YWlsLlgwID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5EZXRhaWwuWDApO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdSMScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5EZXRhaWwuUjEgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkRldGFpbC5SMSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1gxJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkRldGFpbC5YMSA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuRGV0YWlsLlgxKTtcclxuICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdUaGVybWFsUmF0aW5nJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkRldGFpbC5UaGVybWFsUmF0aW5nID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5EZXRhaWwuVGhlcm1hbFJhdGluZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVMaW5lRGV0YWlsKHJlY29yZDogT3BlblhEQS5MaW5lRGV0YWlsKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGFzc2V0OiBPcGVuWERBLkxpbmUgPSBfLmNsb25lKHByb3BzLkFzc2V0KTtcclxuICAgICAgICBhc3NldC5EZXRhaWwgPSByZWNvcmQ7XHJcbiAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoYXNzZXQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgfSwgW3Byb3BzLkFzc2V0XSk7XHJcblxyXG4gICAgaWYgKHByb3BzLkFzc2V0ID09IG51bGwgfHwgcHJvcHMuQXNzZXQuRGV0YWlsID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTGluZT4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydNYXhGYXVsdERpc3RhbmNlJ30gTGFiZWw9eydNYXggRmF1bHQgRGlzdGFuY2UnfSBGZWVkYmFjaz17J01heCBGYXVsdCBEaXN0YW5jZSBpcyBhIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTGluZT4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydNaW5GYXVsdERpc3RhbmNlJ30gTGFiZWw9eydNaW4gRmF1bHQgRGlzdGFuY2UnfSBGZWVkYmFjaz17J01pbiBGYXVsdCBEaXN0YW5jZSBpcyBhIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTGluZURldGFpbD4gUmVjb3JkPXtwcm9wcy5Bc3NldC5EZXRhaWx9IEZpZWxkPXsnTGVuZ3RoJ30gRmVlZGJhY2s9eydMZW5ndGggaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxpbmVEZXRhaWw+IFJlY29yZD17cHJvcHMuQXNzZXQuRGV0YWlsfSBGaWVsZD17J1IwJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3VwZGF0ZUxpbmVEZXRhaWx9IERpc2FibGVkPXt0cnVlfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTGluZURldGFpbD4gUmVjb3JkPXtwcm9wcy5Bc3NldC5EZXRhaWx9IEZpZWxkPXsnWDAnfSBWYWxpZD17dmFsaWR9IFNldHRlcj17dXBkYXRlTGluZURldGFpbH0gRGlzYWJsZWQ9e3RydWV9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydSMSd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxpbmVEZXRhaWw+IFJlY29yZD17cHJvcHMuQXNzZXQuRGV0YWlsfSBGaWVsZD17J1gxJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3VwZGF0ZUxpbmVEZXRhaWx9IERpc2FibGVkPXt0cnVlfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTGluZURldGFpbD4gUmVjb3JkPXtwcm9wcy5Bc3NldC5EZXRhaWx9IEZpZWxkPXsnVGhlcm1hbFJhdGluZyd9IExhYmVsPXsnVGhlcm1hbCBSYXRpbmcnfSBWYWxpZD17dmFsaWR9IFNldHRlcj17dXBkYXRlTGluZURldGFpbH0gRGlzYWJsZWQ9e3RydWV9IC8+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaW5lQXR0cmlidXRlczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgVHJhbnNmb3JtZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzE3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuL0Fzc2V0JztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmZ1bmN0aW9uIFRyYW5zZm9ybWVyQXR0cmlidXRlcyhwcm9wczogeyBOZXdFZGl0OiBTeXN0ZW1DZW50ZXIuTmV3RWRpdCwgQXNzZXQ6IE9wZW5YREEuVHJhbnNmb3JtZXIsIFVwZGF0ZVN0YXRlOiAobmV3RWRpdEFzc2V0OiBPcGVuWERBLlRyYW5zZm9ybWVyKSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuVHJhbnNmb3JtZXIpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdQcmltYXJ5Vm9sdGFnZUtWJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlByaW1hcnlWb2x0YWdlS1YgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlByaW1hcnlWb2x0YWdlS1YpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTZWNvbmRhcnlWb2x0YWdlS1YnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuU2Vjb25kYXJ5Vm9sdGFnZUtWID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5TZWNvbmRhcnlWb2x0YWdlS1YpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdUYXAnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVGFwID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5UYXApO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdSMCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5SMCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuUjApO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdYMCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5YMCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuWDApO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdSMScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5SMSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuUjEpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdYMScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5YMSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuWDEpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdUaGVybWFsUmF0aW5nJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlRoZXJtYWxSYXRpbmcgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlRoZXJtYWxSYXRpbmcpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb3BzLkFzc2V0ID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnUjAnfSBGZWVkYmFjaz17J1IwIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydYMCd9IEZlZWRiYWNrPXsnWDAgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1IxJ30gRmVlZGJhY2s9eydSMSBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnWDEnfSBGZWVkYmFjaz17J1gxIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydUaGVybWFsUmF0aW5nJ30gTGFiZWw9eydUaGVybWFsIFJhdGluZyd9IEZlZWRiYWNrPXsnVGhlcm1hbCBSYXRpbmcgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1ByaW1hcnlWb2x0YWdlS1YnfSBMYWJlbD17J1ByaW1hcnkgVm9sdGFnZSAoa1YpJ30gRmVlZGJhY2s9eydQcmltYXJ5IFZvbHRhZ2UgKGtWKSBpcyBhIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnU2Vjb25kYXJ5Vm9sdGFnZUtWJ30gTGFiZWw9eydTZWNvbmRhcnkgVm9sdGFnZSAoa1YpJ30gRmVlZGJhY2s9eydTZWNvbmRhcnkgVm9sdGFnZSAoa1YpIGlzIGEgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydUYXAnfSBGZWVkYmFjaz17J1RhcCBpcyBhIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgIDwvPlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVHJhbnNmb3JtZXJBdHRyaWJ1dGVzOyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBGb3JtQ2hlY2tCb3gudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzIyLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtQ2hlY2tCb3g8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IFQsIEZpZWxkOiBrZXlvZiAoVCksIFNldHRlcjogKHJlY29yZDogVCkgPT4gdm9pZCwgTGFiZWw/OiBzdHJpbmcsIERpc2FibGVkPzogYm9vbGVhbiB9LCB7fSwge30+e1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tY2hlY2tcIj5cclxuXHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJmb3JtLWNoZWNrLWlucHV0XCIgc3R5bGU9e3sgekluZGV4OiAxIH19IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkOiBUID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LmNoZWNrZWQgYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA/ICdvbicgOiAnb2ZmJ30gY2hlY2tlZD17dGhpcy5wcm9wcy5SZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPyB0cnVlIDogZmFsc2V9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9IC8+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWNoZWNrLWxhYmVsXCIgPnt0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbH08L2xhYmVsPlxyXG5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==