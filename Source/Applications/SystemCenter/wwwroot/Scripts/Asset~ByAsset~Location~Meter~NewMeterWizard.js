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
            return props.Asset.ThermalRating != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.ThermalRating);
        else if (field == 'Speed')
            return props.Asset.Speed != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Speed);
        else if (field == 'TripTime')
            return props.Asset.TripTime == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.TripTime);
        else if (field == 'PickupTime')
            return props.Asset.PickupTime == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.PickupTime);
        else if (field == 'TripCoilCondition')
            return props.Asset.TripCoilCondition == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.TripCoilCondition);
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
var __assign = (undefined && undefined.__assign) || function () {
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




function CapBankAttributes(props) {
    function valid(field) {
        if (field == 'NumberOfBanks')
            return props.Asset.NumberOfBanks != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.NumberOfBanks);
        else if (field == 'CapacitancePerBank')
            return props.Asset.CapacitancePerBank != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.CapacitancePerBank);
        else if (field == 'MaxKV')
            return props.Asset.MaxKV != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.MaxKV);
        else if (field == 'UnitKV')
            return props.Asset.UnitKV != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.UnitKV);
        else if (field == 'UnitKVAr')
            return props.Asset.UnitKVAr != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.UnitKVAr);
        else if (field == 'PosReactanceTol')
            return props.Asset.PosReactanceTol != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.PosReactanceTol);
        else if (field == 'NegReactanceTol')
            return props.Asset.NegReactanceTol != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.NegReactanceTol);
        else if (field == 'Nparalell')
            return props.Asset.Nparalell != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.Nparalell);
        else if (field == 'Nseries')
            return props.Asset.Nseries != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.Nseries);
        else if (field == 'NSeriesGroup')
            return props.Asset.NSeriesGroup != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.NSeriesGroup);
        else if (field == 'NParalellGroup')
            return props.Asset.NParalellGroup != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.NParalellGroup);
        else if (field == 'VTratioBus')
            return props.Asset.VTratioBus != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.VTratioBus);
        else if (field == 'NumberLVCaps')
            return props.Asset.NumberLVCaps != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.NumberLVCaps);
        else if (field == 'NumberLVUnits')
            return props.Asset.NumberLVUnits != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.NumberLVUnits);
        else if (field == 'LVKVAr')
            return props.Asset.LVKVAr != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.LVKVAr);
        else if (field == 'LVKV')
            return props.Asset.LVKV != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.LVKV);
        else if (field == 'LVNegReactanceTol')
            return props.Asset.LVNegReactanceTol != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.LVNegReactanceTol);
        else if (field == 'LVPosReactanceTol')
            return props.Asset.LVPosReactanceTol != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.LVPosReactanceTol);
        else if (field == 'LowerXFRRatio')
            return props.Asset.LowerXFRRatio != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.LowerXFRRatio);
        else if (field == 'Nshorted')
            return props.Asset.Nshorted != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Nshorted);
        else if (field == 'BlownFuses')
            return props.Asset.BlownFuses != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.BlownFuses);
        else if (field == 'BlownGroups')
            return props.Asset.BlownGroups != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.BlownGroups);
        else if (field == 'Rv')
            return props.Asset.Rv != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Rv);
        else if (field == 'Rh')
            return props.Asset.Rh != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Rh);
        else if (field == 'NLowerGroups')
            return props.Asset.NLowerGroups != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.NLowerGroups);
        else if (field == 'ShortedGroups')
            return props.Asset.ShortedGroups != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.ShortedGroups);
        else if (field == 'RelayPTRatioPrimary')
            return props.Asset.ShortedGroups != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.RelayPTRatioPrimary);
        else if (field == 'RelayPTRatioSecondary')
            return props.Asset.ShortedGroups != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isInteger(props.Asset.RelayPTRatioSecondary);
        else if (field == 'Sh')
            return props.Asset.ShortedGroups != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Sh);
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
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LowerXFRRatio', Label: 'Midgroup VT Ratio', Feedback: 'Midgroup VT Ratio is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Nshorted', Label: 'Initial guess of shorted elements', Feedback: 'Initial guess of shorted elements is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'BlownFuses', Label: 'Initial Guess of blown fuses per group', Feedback: 'Initial Guess of blown fuses per group is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'BlownGroups', Label: 'Initial guess of Groups with blown Fuse', Feedback: 'Initial guess of Groups with blown Fuse is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 })) : react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            (props.Asset.Compensated ?
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](DoubleInput, { Record: props.Asset, Field2: 'RelayPTRatioSecondary', Field1: 'RelayPTRatioPrimary', Label: 'Relay PT Ratio (primary - secondary V)', Feedback: 'Relay PT ratio  is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Rh', Label: 'Vt Input Resistor (Ohm)', Feedback: 'Vt input resistor is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Sh', Label: 'Vt Input Resistor Wattage (W)', Feedback: 'Vt input resistor wattage is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }))
                :
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Rv', Label: 'Voltage Divider output R (Ohm)', Feedback: 'Voltage Divider output R is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'Rh', Label: 'Voltage Divider input R (Ohm)', Feedback: 'Voltage Divider input R is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NSeriesGroup', Label: 'Num. of Series Groups in each Unit', Feedback: 'Num. of Series Groups in each Unit is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NParalellGroup', Label: 'Num. of Elements in each Group', Feedback: 'Num. of Elements in each Group is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'VTratioBus', Label: 'Bus VT Ratio', Feedback: 'Bus VT Ratio is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NumberLVCaps', Label: 'Num.of Relay Caps', Feedback: 'Num. of Relay Caps is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'NumberLVUnits', Label: 'Num. of Elements per Relay Cap', Feedback: 'Num. of Elements per Relay Cap is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVKVAr', Label: 'Low Voltage Cap size (kVAR)', Feedback: 'Low Voltage Cap size is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVKV', Label: 'Low Voltage Cap rating (V)', Feedback: 'Low Volatage Cap rating is a required integer field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVNegReactanceTol', Label: 'neg. Reactance Tolerance of LV Unit (%)', Feedback: 'neg. Reactance Tolerance of LV Unitis a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_3__["default"], { Record: props.Asset, Field: 'LVPosReactanceTol', Label: 'pos. Reactance Tolerance of LV Unit (%)', Feedback: 'pos. Reactance Tolerance of LV Unit is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
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
function DoubleInput(props) {
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, props.Label == null ? (props.Field1 + ' ' + props.Field2) : props.Label),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "input-group" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: props.Type === undefined ? 'text' : props.Type, className: props.Valid(props.Field1) ? 'form-control' : 'form-control is-invalid', onChange: function (evt) {
                    var _a;
                    return props.Setter(__assign(__assign({}, props.Record), (_a = {}, _a[props.Field1] = evt.target.value !== '' ? evt.target.value : null, _a)));
                }, value: props.Record[props.Field1] == null ? '' : props.Record[props.Field1].toString(), disabled: props.Disabled == null ? false : props.Disabled }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: props.Type === undefined ? 'text' : props.Type, className: props.Valid(props.Field2) ? 'form-control' : 'form-control is-invalid', onChange: function (evt) {
                    var _a;
                    return props.Setter(__assign(__assign({}, props.Record), (_a = {}, _a[props.Field2] = evt.target.value !== '' ? evt.target.value : null, _a)));
                }, value: props.Record[props.Field2] == null ? '' : props.Record[props.Field2].toString(), disabled: props.Disabled == null ? false : props.Disabled })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "invalid-feedback" }, props.Feedback == null ? (props.Field1 + ' ' + props.Field2 + ' is a required field.') : props.Feedback)));
}


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
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__);
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
            return props.Asset.MaxFaultDistance == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.MaxFaultDistance);
        else if (field == 'MinFaultDistance')
            return props.Asset.MinFaultDistance == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.MinFaultDistance);
        else if (field == 'Length')
            return props.Asset.Detail.Length == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Detail.Length);
        else if (field == 'R0')
            return props.Asset.Detail.R0 == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Detail.R0);
        else if (field == 'X0')
            return props.Asset.Detail.X0 == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Detail.X0);
        else if (field == 'R1')
            return props.Asset.Detail.R1 == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Detail.R1);
        else if (field == 'X1')
            return props.Asset.Detail.X1 == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Detail.X1);
        else if (field == 'ThermalRating')
            return props.Asset.Detail.ThermalRating == null || _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.Detail.ThermalRating);
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
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Record: props.Asset, Field: 'MaxFaultDistance', Label: 'Max Fault Distance', Feedback: 'Max Fault Distance is a numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Record: props.Asset, Field: 'MinFaultDistance', Label: 'Min Fault Distance', Feedback: 'Min Fault Distance is a numeric field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "alert alert-info", role: "alert" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "Reactance, Length and Thermal rating are based on the LineSegments associated with this Line."),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "To edit these values the properties of the LineSegement need to be changed.")),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Record: props.Asset.Detail, Field: 'Length', Feedback: 'Length is a required numeric field.', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Record: props.Asset.Detail, Field: 'R0', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Record: props.Asset.Detail, Field: 'X0', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Record: props.Asset.Detail, Field: 'R1', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Record: props.Asset.Detail, Field: 'X1', Valid: valid, Setter: updateLineDetail, Disabled: true }),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_3__["Input"], { Record: props.Asset.Detail, Field: 'ThermalRating', Label: 'Thermal Rating', Valid: valid, Setter: updateLineDetail, Disabled: true })));
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
            return props.Asset.PrimaryVoltageKV == null || _Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.Asset.PrimaryVoltageKV);
        else if (field == 'SecondaryVoltageKV')
            return props.Asset.SecondaryVoltageKV == null || _Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.Asset.SecondaryVoltageKV);
        else if (field == 'Tap')
            return props.Asset.Tap == null || _Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.Asset.Tap);
        else if (field == 'R0')
            return props.Asset.R0 != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.Asset.R0);
        else if (field == 'X0')
            return props.Asset.X0 != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.Asset.X0);
        else if (field == 'R1')
            return props.Asset.R1 != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.Asset.R1);
        else if (field == 'X1')
            return props.Asset.X1 != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.Asset.X1);
        else if (field == 'ThermalRating')
            return props.Asset.ThermalRating != null && _Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.Asset.ThermalRating);
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9TZXJ2aWNlcy9Bc3NldC50cyIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXIudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvQnVzLnRzeCIsIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmsudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvQXNzZXRBdHRyaWJ1dGUvTGluZS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9UcmFuc2Zvcm1lci50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL0Zvcm1DaGVja0JveC50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsU0FBUyxlQUFlLENBQUMsT0FBd0I7SUFDN0MsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1YsSUFBSSxFQUFFLEtBQUs7UUFDWCxHQUFHLEVBQUssUUFBUSw0QkFBdUIsT0FBTyxDQUFDLEVBQUUsa0JBQWU7UUFDaEUsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxRQUFRLEVBQUUsTUFBTTtRQUNoQixLQUFLLEVBQUUsSUFBSTtRQUNYLEtBQUssRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLE9BQXdCO0lBQ25ELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsR0FBRyxF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QUksc0RBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3pHLElBQUksS0FBSyxJQUFJLFFBQVE7WUFDdEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLHNEQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ25HLElBQUksS0FBSyxJQUFJLElBQUk7WUFDbEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLHNEQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzNGLElBQUksS0FBSyxJQUFJLElBQUk7WUFDbEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLHNEQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzNGLElBQUksS0FBSyxJQUFJLElBQUk7WUFDbEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLHNEQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzNGLElBQUksS0FBSyxJQUFJLElBQUk7WUFDbEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLHNEQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzVGLElBQUksS0FBSyxJQUFJLGVBQWU7WUFDNUIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLElB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LEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUs7WUFDckwsNkRBQUssU0FBUyxFQUFDLGtCQUFrQixJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFPLENBQ3RJLENBQUM7SUFDWCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLENBaEJ5QywrQ0FBZSxHQWdCeEQiLCJmaWxlIjoiQXNzZXR+QnlBc3NldH5Mb2NhdGlvbn5NZXRlcn5OZXdNZXRlcldpemFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQXNzZXRTZXJ2aWNlcy50cyAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSBcIi4uLy4uL1RTWC9TeXN0ZW1DZW50ZXIvZ2xvYmFsXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0U3BhcmVCcmVha2VyKGJyZWFrZXI6IE9wZW5YREEuQnJlYWtlcik6IFByb21pc2U8T3BlblhEQS5CcmVha2VyPiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQnJlYWtlci8ke2JyZWFrZXIuSUR9L1NwYXJlQnJlYWtlcmAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TG9jYXRpb25Gb3JCcmVha2VyKGJyZWFrZXI6IE9wZW5YREEuQnJlYWtlcik6IFByb21pc2U8T3BlblhEQS5Mb2NhdGlvbj4ge1xyXG4gICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0JyZWFrZXIvJHticmVha2VyLklEfS9Mb2NhdGlvbmAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxuXHJcbn1cclxuZnVuY3Rpb24gZ2V0U3BhcmVzRm9yTG9jYXRpb24obG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24pOiBQcm9taXNlPEFycmF5PE9wZW5YREEuQnJlYWtlcj4+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9CcmVha2VyL1NwYXJlQnJlYWtlcnMvU3Vic3RhdGlvbi8ke2xvY2F0aW9uLklEfWAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTcGFyZUJyZWFrZXJzRm9yU3Vic3RhdGlvbihicmVha2VyOiBPcGVuWERBLkJyZWFrZXIpOiBQcm9taXNlPEFycmF5PE9wZW5YREEuQnJlYWtlcj4+IHtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgZ2V0TG9jYXRpb25Gb3JCcmVha2VyKGJyZWFrZXIpO1xyXG4gICAgaWYgKGxvY2F0aW9uID09IG51bGwpIHJldHVybiBbXTtcclxuICAgIGNvbnN0IHNwYXJlcyA9IGF3YWl0IGdldFNwYXJlc0ZvckxvY2F0aW9uKGxvY2F0aW9uKTtcclxuICAgIHJldHVybiBzcGFyZXNcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBc3NldFR5cGVzKCk6IEpRdWVyeVhIUiB7XHJcbiAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQXNzZXRUeXBlYCxcclxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxBc3NldHMoKTogSlF1ZXJ5WEhSe1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldGAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFzc2V0KGFzc2V0SUQ6IG51bWJlciwgYXNzZXRUeXBlOiBPcGVuWERBLkFzc2V0VHlwZU5hbWUpOiBQcm9taXNlPE9wZW5YREEuQXNzZXQ+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS8ke2Fzc2V0VHlwZX0vT25lLyR7YXNzZXRJRH1gLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFzc2V0V2l0aEFkZGl0aW9uYWxGaWVsZHMoYXNzZXRJRDogbnVtYmVyLCBhc3NldFR5cGU6IE9wZW5YREEuQXNzZXRUeXBlTmFtZSk6IFByb21pc2U8T3BlblhEQS5Bc3NldD4ge1xyXG4gICAgdmFyIGFzc2V0ID0gYXdhaXQgZ2V0QXNzZXQoYXNzZXRJRCwgYXNzZXRUeXBlKTtcclxuICAgIGFzc2V0LkFzc2V0VHlwZSA9IGFzc2V0VHlwZTtcclxuICAgIGFzc2V0LkNoYW5uZWxzID0gW107XHJcblxyXG4gICAgaWYgKGFzc2V0VHlwZSA9PSAnQnJlYWtlcicpIHtcclxuICAgICAgICBjb25zdCBlRE5BUG9pbnQgPSBhd2FpdCBnZXRFRE5BUG9pbnQoYXNzZXQgYXMgT3BlblhEQS5CcmVha2VyKVxyXG4gICAgICAgIGlmIChlRE5BUG9pbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgYXNzZXRbJ0VETkFQb2ludCddID0gZUROQVBvaW50LlBvaW50O1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYXNzZXRbJ0VETkFQb2ludCddID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3Qgc3BhcmVCcmVha2VyID0gYXdhaXQgYXdhaXQgZ2V0U3BhcmVCcmVha2VyKGFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcilcclxuICAgICAgICBpZiAoc3BhcmVCcmVha2VyICE9IG51bGwpXHJcbiAgICAgICAgICAgIGFzc2V0WydTcGFyZUJyZWFrZXJJRCddID0gc3BhcmVCcmVha2VyLklEO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYXNzZXRbJ1NwYXJlQnJlYWtlcklEJ10gPSBudWxsO1xyXG4gICAgfSAgIFxyXG4gICAgZWxzZSBpZiAoYXNzZXRUeXBlID09ICdMaW5lJylcclxuICAgICAgICBhc3NldFsnRGV0YWlsJ10gPSBhd2FpdCBnZXRMaW5lRGV0YWlscyhhc3NldCBhcyBPcGVuWERBLkxpbmUpO1xyXG5cclxuICAgIHJldHVybiBhc3NldDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RUROQVBvaW50KGJyZWFrZXI6IE9wZW5YREEuQnJlYWtlcik6IFByb21pc2U8T3BlblhEQS5FRE5BUG9pbnQ+IHtcclxuICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9CcmVha2VyLyR7YnJlYWtlci5JRH0vRUROQVBvaW50YCxcclxuICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSkucHJvbWlzZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMaW5lRGV0YWlscyhsaW5lOiBPcGVuWERBLkxpbmUpOiBQcm9taXNlPE9wZW5YREEuTGluZURldGFpbD4ge1xyXG4gICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmUvJHtsaW5lLklEfS9MaW5lU2VnbWVudGAsXHJcbiAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgYXN5bmM6IHRydWVcclxuICAgIH0pLnByb21pc2UoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlZGl0RXhpc3RpbmdBc3NldChhc3NldDogT3BlblhEQS5Bc3NldCk6IFByb21pc2U8T3BlblhEQS5Bc3NldD4ge1xyXG4gICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0L0VkaXRgLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgQXNzZXQ6IGFzc2V0IH0pLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgfSkucHJvbWlzZSgpO1xyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEJyZWFrZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzE3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgQXNzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi9Bc3NldCc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5pbXBvcnQgRm9ybUNoZWNrQm94IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUNoZWNrQm94JztcclxuaW1wb3J0IHsgZ2V0U3BhcmVCcmVha2Vyc0ZvclN1YnN0YXRpb24gfSBmcm9tICcuLi8uLi8uLi9UUy9TZXJ2aWNlcy9Bc3NldCc7XHJcblxyXG5mdW5jdGlvbiBCcmVha2VyQXR0cmlidXRlcyhwcm9wczogeyBOZXdFZGl0OiBTeXN0ZW1DZW50ZXIuTmV3RWRpdCwgQXNzZXQ6IE9wZW5YREEuQnJlYWtlciwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnJlYWtlcikgPT4gdm9pZCwgU2hvd1NwYXJlPzogYm9vbGVhbiB9KTogSlNYLkVsZW1lbnQge1xyXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mKE9wZW5YREEuQnJlYWtlcikpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ1RoZXJtYWxSYXRpbmcnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVGhlcm1hbFJhdGluZyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVGhlcm1hbFJhdGluZyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1NwZWVkJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlNwZWVkICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5TcGVlZCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1RyaXBUaW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlRyaXBUaW1lID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5UcmlwVGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1BpY2t1cFRpbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUGlja3VwVGltZSA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuUGlja3VwVGltZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1RyaXBDb2lsQ29uZGl0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlRyaXBDb2lsQ29uZGl0aW9uID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5UcmlwQ29pbENvbmRpdGlvbik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0VETkFQb2ludCcpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTcGFyZScpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTcGFyZUJyZWFrZXJJRCcpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IFtzcGFyZXMsIHNldFNwYXJlc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkJyZWFrZXI+PihbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBnZXRTcGFyZUJyZWFrZXJzRm9yU3Vic3RhdGlvbihwcm9wcy5Bc3NldCkudGhlbihzcHMgPT4ge1xyXG4gICAgICAgICAgICBzZXRTcGFyZXMoc3BzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sIFtwcm9wcy5Bc3NldF0pO1xyXG5cclxuICAgIGlmIChwcm9wcy5Bc3NldCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkJyZWFrZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVGhlcm1hbFJhdGluZyd9IExhYmVsPXsnVGhlcm1hbCBSYXRpbmcnfSBGZWVkYmFjaz17J1RoZXJtYWwgcmF0aW5nIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXsgcHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydTcGVlZCd9IEZlZWRiYWNrPXsnU3BlZWQgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkJyZWFrZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVHJpcFRpbWUnfSBMYWJlbD17J1RyaXAgVGltZSd9IEZlZWRiYWNrPXsnVHJpcCBUaW1lIGlzIGFuIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydQaWNrdXBUaW1lJ30gTGFiZWw9eydQaWNrdXAgVGltZSd9IEZlZWRiYWNrPXsnUGlja3VwIFRpbWUgaXMgYW4gaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1RyaXBDb2lsQ29uZGl0aW9uJ30gTGFiZWw9eydUcmlwIENvaWwgQ29uZGl0aW9uJ30gRmVlZGJhY2s9eydUcmlwIENvaWwgQ29uZGl0aW9uIGlzIGFuIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQnJlYWtlcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydFRE5BUG9pbnQnfSBMYWJlbD17J0VETkEgUG9pbnQnfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIiBoaWRkZW49e3Byb3BzLlNob3dTcGFyZSAhPSB0cnVlfT5cclxuICAgICAgICAgICAgICAgIDxsYWJlbD5TcGFyZSBCcmVha2VyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3Byb3BzLkFzc2V0LlNwYXJlQnJlYWtlcklEID09IG51bGwgPyAwIDogcHJvcHMuQXNzZXQuU3BhcmVCcmVha2VySUR9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZDogT3BlblhEQS5CcmVha2VyID0gXy5jbG9uZShwcm9wcy5Bc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgPT0gJzAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQuU3BhcmVCcmVha2VySUQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkLlNwYXJlQnJlYWtlcklEID0gcGFyc2VJbnQoZXZ0LnRhcmdldC52YWx1ZSBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHJlY29yZClcclxuICAgICAgICAgICAgICAgIH19IGRpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezB9IGtleT17MH0gPk5vbmU8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXJlcy5tYXAoc3BhcmUgPT4gPG9wdGlvbiB2YWx1ZT17c3BhcmUuSUR9IGtleT17c3BhcmUuSUR9ID57c3BhcmUuQXNzZXRLZXl9PC9vcHRpb24+KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxGb3JtQ2hlY2tCb3g8T3BlblhEQS5CcmVha2VyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1NwYXJlJ30gTGFiZWw9eydJcyBTcGFyZSd9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgIDwvPlxyXG4gICAgKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJyZWFrZXJBdHRyaWJ1dGVzOyIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBCdXMudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzE3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmZ1bmN0aW9uIEJ1c0F0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkJ1cywgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnVzKSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICByZXR1cm4gPHNwYW4+Tm8gQWRkaXRpb25hbCBBdHRyaWJ1dGVzPC9zcGFuPjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVzQXR0cmlidXRlczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQ2FwQmFuay50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBBc3NldEF0dHJpYnV0ZXMgfSBmcm9tICcuL0Fzc2V0JztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBGb3JtQ2hlY2tCb3ggZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtQ2hlY2tCb3gnO1xyXG5cclxuZnVuY3Rpb24gQ2FwQmFua0F0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkNhcEJhbmssIFVwZGF0ZVN0YXRlOiAobmV3RWRpdEFzc2V0OiBPcGVuWERBLkNhcEJhbmspID0+IHZvaWQgfSk6IEpTWC5FbGVtZW50IHtcclxuICAgIGZ1bmN0aW9uIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5DYXBCYW5rKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnTnVtYmVyT2ZCYW5rcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OdW1iZXJPZkJhbmtzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5OdW1iZXJPZkJhbmtzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQ2FwYWNpdGFuY2VQZXJCYW5rJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkNhcGFjaXRhbmNlUGVyQmFuayAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuQ2FwYWNpdGFuY2VQZXJCYW5rKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTWF4S1YnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTWF4S1YgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0Lk1heEtWKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVW5pdEtWJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlVuaXRLViAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVW5pdEtWKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVW5pdEtWQXInKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVW5pdEtWQXIgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlVuaXRLVkFyKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUG9zUmVhY3RhbmNlVG9sJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlBvc1JlYWN0YW5jZVRvbCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuUG9zUmVhY3RhbmNlVG9sKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmVnUmVhY3RhbmNlVG9sJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5lZ1JlYWN0YW5jZVRvbCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTmVnUmVhY3RhbmNlVG9sKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnBhcmFsZWxsJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5wYXJhbGVsbCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTnBhcmFsZWxsKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnNlcmllcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Oc2VyaWVzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5Oc2VyaWVzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTlNlcmllc0dyb3VwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5TZXJpZXNHcm91cCAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTlNlcmllc0dyb3VwKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTlBhcmFsZWxsR3JvdXAnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTlBhcmFsZWxsR3JvdXAgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0Lk5QYXJhbGVsbEdyb3VwKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVlRyYXRpb0J1cycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5WVHJhdGlvQnVzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5WVHJhdGlvQnVzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnVtYmVyTFZDYXBzJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk51bWJlckxWQ2FwcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTnVtYmVyTFZDYXBzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnVtYmVyTFZVbml0cycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5OdW1iZXJMVlVuaXRzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5OdW1iZXJMVlVuaXRzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTFZLVkFyJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkxWS1ZBciAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuTFZLVkFyKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTFZLVicpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5MVktWICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5MVktWKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTFZOZWdSZWFjdGFuY2VUb2wnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTFZOZWdSZWFjdGFuY2VUb2wgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkxWTmVnUmVhY3RhbmNlVG9sKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTFZQb3NSZWFjdGFuY2VUb2wnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTFZQb3NSZWFjdGFuY2VUb2wgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkxWUG9zUmVhY3RhbmNlVG9sKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTG93ZXJYRlJSYXRpbycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5Mb3dlclhGUlJhdGlvICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5Mb3dlclhGUlJhdGlvKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTnNob3J0ZWQnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuTnNob3J0ZWQgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0Lk5zaG9ydGVkKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQmxvd25GdXNlcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5CbG93bkZ1c2VzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5CbG93bkZ1c2VzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQmxvd25Hcm91cHMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuQmxvd25Hcm91cHMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkJsb3duR3JvdXBzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUnYnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUnYgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlJ2KTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUmgnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUmggIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlJoKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTkxvd2VyR3JvdXBzJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0Lk5Mb3dlckdyb3VwcyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc0ludGVnZXIocHJvcHMuQXNzZXQuTkxvd2VyR3JvdXBzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnRlZEdyb3VwcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5TaG9ydGVkR3JvdXBzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5TaG9ydGVkR3JvdXBzKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUmVsYXlQVFJhdGlvUHJpbWFyeScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5TaG9ydGVkR3JvdXBzICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzSW50ZWdlcihwcm9wcy5Bc3NldC5SZWxheVBUUmF0aW9QcmltYXJ5KTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUmVsYXlQVFJhdGlvU2Vjb25kYXJ5JylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlNob3J0ZWRHcm91cHMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNJbnRlZ2VyKHByb3BzLkFzc2V0LlJlbGF5UFRSYXRpb1NlY29uZGFyeSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1NoJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlNob3J0ZWRHcm91cHMgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlNoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAocHJvcHMuQXNzZXQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxEZXNpZ25TZWxlY3QgUmVjb3JkPXtwcm9wcy5Bc3NldH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPFByZVN3aXRjaFNlbGVjdCBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnVtYmVyT2ZCYW5rcyd9IExhYmVsPXsnTnVtYmVyIE9mIEJhbmtzJ30gRmVlZGJhY2s9eydOdW1iZXIgT2YgQmFua3MgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnQ2FwYWNpdGFuY2VQZXJCYW5rJ30gTGFiZWw9eydDYXBhY2l0b3IgU3RlcCBTaXplIChrVkFSKSd9IEZlZWRiYWNrPXsnQ2FwYWNpdG9yIFN0ZXAgU2l6ZSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J01heEtWJ30gTGFiZWw9eydNYXhpbXVtIE9wZXJhdGluZyBWb2x0YWdlIChrViknfSBGZWVkYmFjaz17J01heGltdW0gT3BlcmF0aW5nIFZvbHRhZ2UgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1VuaXRLVid9IExhYmVsPXsnUmF0ZWQgVm9sdGFnZSBvZiBhIFVuaXQgKGtWKSd9IEZlZWRiYWNrPXsnUmF0ZWQgVm9sdGFnZSBvZiBhIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydVbml0S1ZBcid9IExhYmVsPXsnUmF0aW5nIG9mIGEgVW5pdCAoa1ZBUiknfSBGZWVkYmFjaz17J1JhdGluZyBvZiBhIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1Bvc1JlYWN0YW5jZVRvbCd9IExhYmVsPXsncG9zLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIGEgVW5pdCAoJSknfSBGZWVkYmFjaz17J3Bvcy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBhIFVuaXQgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J05lZ1JlYWN0YW5jZVRvbCd9IExhYmVsPXsnbmVnLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIGEgVW5pdCAoJSknfSBGZWVkYmFjaz17J25lZy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBhIFVuaXQgKCUpIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnBhcmFsZWxsJ30gTGFiZWw9eyhwcm9wcy5Bc3NldC5GdXNlZCA/ICdOdW0uIG9mIFVuaXRzIHBlciBncm91cCcgOiAnTnVtLiBvZiBQYXJhbGxlbCBTdHJpbmdzJyl9IEZlZWRiYWNrPXsocHJvcHMuQXNzZXQuRnVzZWQgPyAnTnVtLiBvZiBDYXBzLiBwZXIgZ3JvdXAnIDogJ051bS4gb2YgUGFyYWxsZWwgU3RyaW5ncycpICsgJyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydOc2VyaWVzJ30gTGFiZWw9eyhwcm9wcy5Bc3NldC5GdXNlZCA/ICdOdW0uIG9mIFNlcmllcyBHcm91cHMgcGVyIFBoYXNlJyA6ICdOdW0uIFVuaXRzIGluIGVhY2ggU3RyaW5nJyl9IEZlZWRiYWNrPXsocHJvcHMuQXNzZXQuRnVzZWQgPyAnTnVtLiBvZiBTZXJpZXMgR3JvdXBzIHBlciBQaGFzZScgOiAnTnVtLiBVbml0cyBpbiBlYWNoIFN0cmluZycpICsgJyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICB7KHByb3BzLkFzc2V0LkZ1c2VkID8gXHJcbiAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0xvd2VyWEZSUmF0aW8nfSBMYWJlbD17J01pZGdyb3VwIFZUIFJhdGlvJ30gRmVlZGJhY2s9eydNaWRncm91cCBWVCBSYXRpbyBpcyBhIHJlcXVpcmVkIGludGVnZXIgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnNob3J0ZWQnfSBMYWJlbD17J0luaXRpYWwgZ3Vlc3Mgb2Ygc2hvcnRlZCBlbGVtZW50cyd9IEZlZWRiYWNrPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIGVsZW1lbnRzIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0Jsb3duRnVzZXMnfSBMYWJlbD17J0luaXRpYWwgR3Vlc3Mgb2YgYmxvd24gZnVzZXMgcGVyIGdyb3VwJ30gRmVlZGJhY2s9eydJbml0aWFsIEd1ZXNzIG9mIGJsb3duIGZ1c2VzIHBlciBncm91cCBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydCbG93bkdyb3Vwcyd9IExhYmVsPXsnSW5pdGlhbCBndWVzcyBvZiBHcm91cHMgd2l0aCBibG93biBGdXNlJ30gRmVlZGJhY2s9eydJbml0aWFsIGd1ZXNzIG9mIEdyb3VwcyB3aXRoIGJsb3duIEZ1c2UgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPC8+IDogPD5cclxuICAgICAgICAgICAgICAgICAgICB7KHByb3BzLkFzc2V0LkNvbXBlbnNhdGVkID8gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RG91YmxlSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZDI9eydSZWxheVBUUmF0aW9TZWNvbmRhcnknfSBGaWVsZDE9eydSZWxheVBUUmF0aW9QcmltYXJ5J30gTGFiZWw9eydSZWxheSBQVCBSYXRpbyAocHJpbWFyeSAtIHNlY29uZGFyeSBWKSd9IEZlZWRiYWNrPXsnUmVsYXkgUFQgcmF0aW8gIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1JoJ30gTGFiZWw9eydWdCBJbnB1dCBSZXNpc3RvciAoT2htKSd9IEZlZWRiYWNrPXsnVnQgaW5wdXQgcmVzaXN0b3IgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydTaCd9IExhYmVsPXsnVnQgSW5wdXQgUmVzaXN0b3IgV2F0dGFnZSAoVyknfSBGZWVkYmFjaz17J1Z0IGlucHV0IHJlc2lzdG9yIHdhdHRhZ2UgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICA6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnUnYnfSBMYWJlbD17J1ZvbHRhZ2UgRGl2aWRlciBvdXRwdXQgUiAoT2htKSd9IEZlZWRiYWNrPXsnVm9sdGFnZSBEaXZpZGVyIG91dHB1dCBSIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnUmgnfSBMYWJlbD17J1ZvbHRhZ2UgRGl2aWRlciBpbnB1dCBSIChPaG0pJ30gRmVlZGJhY2s9eydWb2x0YWdlIERpdmlkZXIgaW5wdXQgUiBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTlNlcmllc0dyb3VwJ30gTGFiZWw9eydOdW0uIG9mIFNlcmllcyBHcm91cHMgaW4gZWFjaCBVbml0J30gRmVlZGJhY2s9eydOdW0uIG9mIFNlcmllcyBHcm91cHMgaW4gZWFjaCBVbml0IGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTlBhcmFsZWxsR3JvdXAnfSBMYWJlbD17J051bS4gb2YgRWxlbWVudHMgaW4gZWFjaCBHcm91cCd9IEZlZWRiYWNrPXsnTnVtLiBvZiBFbGVtZW50cyBpbiBlYWNoIEdyb3VwIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVlRyYXRpb0J1cyd9IExhYmVsPXsnQnVzIFZUIFJhdGlvJ30gRmVlZGJhY2s9eydCdXMgVlQgUmF0aW8gaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnVtYmVyTFZDYXBzJ30gTGFiZWw9eydOdW0ub2YgUmVsYXkgQ2Fwcyd9IEZlZWRiYWNrPXsnTnVtLiBvZiBSZWxheSBDYXBzIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnVtYmVyTFZVbml0cyd9IExhYmVsPXsnTnVtLiBvZiBFbGVtZW50cyBwZXIgUmVsYXkgQ2FwJ30gRmVlZGJhY2s9eydOdW0uIG9mIEVsZW1lbnRzIHBlciBSZWxheSBDYXAgaXMgYSByZXF1aXJlZCBpbnRlZ2VyIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydMVktWQXInfSBMYWJlbD17J0xvdyBWb2x0YWdlIENhcCBzaXplIChrVkFSKSd9IEZlZWRiYWNrPXsnTG93IFZvbHRhZ2UgQ2FwIHNpemUgaXMgYSByZXF1aXJlZCBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTFZLVid9IExhYmVsPXsnTG93IFZvbHRhZ2UgQ2FwIHJhdGluZyAoViknfSBGZWVkYmFjaz17J0xvdyBWb2xhdGFnZSBDYXAgcmF0aW5nIGlzIGEgcmVxdWlyZWQgaW50ZWdlciBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTFZOZWdSZWFjdGFuY2VUb2wnfSBMYWJlbD17J25lZy4gUmVhY3RhbmNlIFRvbGVyYW5jZSBvZiBMViBVbml0ICglKSd9IEZlZWRiYWNrPXsnbmVnLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIExWIFVuaXRpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFuaz4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydMVlBvc1JlYWN0YW5jZVRvbCd9IExhYmVsPXsncG9zLiBSZWFjdGFuY2UgVG9sZXJhbmNlIG9mIExWIFVuaXQgKCUpJ30gRmVlZGJhY2s9eydwb3MuIFJlYWN0YW5jZSBUb2xlcmFuY2Ugb2YgTFYgVW5pdCBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkNhcEJhbms+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnTnNob3J0ZWQnfSBMYWJlbD17J0luaXRpYWwgZ3Vlc3Mgb2Ygc2hvcnRlZCBlbGVtZW50cyd9IEZlZWRiYWNrPXsnSW5pdGlhbCBndWVzcyBvZiBzaG9ydGVkIGVsZW1lbnRzIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPC8+KX1cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICA8Lz5cclxuICAgICk7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXBCYW5rQXR0cmlidXRlcztcclxuXHJcbmNsYXNzIERlc2lnblNlbGVjdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogT3BlblhEQS5DYXBCYW5rLCBTZXR0ZXI6IChyZWNvcmQ6IE9wZW5YREEuQ2FwQmFuaykgPT4gdm9pZCwgRGlzYWJsZWQ/OiBib29sZWFufSwge30sIHt9PntcclxuXHJcbiAgICBjb21wdXRCb29scyhzZWxlY3Rpb246IHN0cmluZykge1xyXG4gICAgICAgIHZhciByZWNvcmQ6IE9wZW5YREEuQ2FwQmFuayA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0aW9uID09ICcwJykge1xyXG4gICAgICAgICAgICByZWNvcmQuQ29tcGVuc2F0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZWNvcmQuRnVzZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0aW9uID09ICcxJykge1xyXG4gICAgICAgICAgICByZWNvcmQuQ29tcGVuc2F0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVjb3JkLkZ1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdGlvbiA9PSAnMicpIHtcclxuICAgICAgICAgICAgcmVjb3JkLkNvbXBlbnNhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJlY29yZC5GdXNlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByb3BzLlNldHRlcihyZWNvcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVTZWxlY3Rpb24ocmVjb3JkOiBPcGVuWERBLkNhcEJhbmspOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChyZWNvcmQuQ29tcGVuc2F0ZWQpIFxyXG4gICAgICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICAgICAgZWxzZSBpZiAoIXJlY29yZC5GdXNlZCkgXHJcbiAgICAgICAgICAgIHJldHVybiBcIjFcIjtcclxuICAgICAgICByZXR1cm4gXCIyXCI7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWw+RGVzaWduPC9sYWJlbD5cclxuICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5jb21wdXRlU2VsZWN0aW9uKHRoaXMucHJvcHMuUmVjb3JkKX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZH0gb25DaGFuZ2U9eyhldnQpID0+IHRoaXMuY29tcHV0Qm9vbHMoZXZ0LnRhcmdldC52YWx1ZSl9PlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9ezB9IHZhbHVlPVwiMFwiPkZ1c2VsZXNzIENvbXBlbnNhdGVkPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17MX0gdmFsdWU9XCIxXCI+RnVzZWxlc3MgVW5jb21wZW5zYXRlZDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9ezJ9IHZhbHVlPVwiMlwiPkZ1c2VkPC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUHJlU3dpdGNoU2VsZWN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgUmVjb3JkOiBPcGVuWERBLkNhcEJhbmssIFNldHRlcjogKHJlY29yZDogT3BlblhEQS5DYXBCYW5rKSA9PiB2b2lkLCBEaXNhYmxlZD86IGJvb2xlYW4gfSwgeyBwcmVTd2l0Y2g6IGJvb2xlYW5bXSB9LCB7fT57XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcblxyXG4gICAgICAgIGxldCBudW1iZXJzID0gW107XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLlJlY29yZC5Da3RTd2l0Y2hlciAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIG51bWJlcnMgPSB0aGlzLnByb3BzLlJlY29yZC5Da3RTd2l0Y2hlci50cmltKCkuc3BsaXQoXCIsXCIpO1xyXG5cclxuICAgICAgICBsZXQgbkJhbmtzID0gMTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIG5CYW5rcyA9IHRoaXMucHJvcHMuUmVjb3JkLk51bWJlck9mQmFua3M7XHJcblxyXG4gICAgICAgIGlmIChudW1iZXJzLmxlbmd0aCAhPT0gcGFyc2VJbnQobkJhbmtzLnRvU3RyaW5nKCkpKVxyXG4gICAgICAgICAgICBudW1iZXJzID0gQXJyYXkuZnJvbShBcnJheShwYXJzZUludChuQmFua3MudG9TdHJpbmcoKSkpLCAoZSwgaSkgPT4gJzAnKVxyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0geyBwcmVTd2l0Y2g6IG51bWJlcnMubWFwKGl0ZW0gPT4gKGl0ZW0udHJpbSgpID09ICcxJz8gdHJ1ZTogZmFsc2UpKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZhbHVlcyhpbnB1dDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGxldCBudW1iZXJzID0gW11cclxuICAgICAgICBpZiAoaW5wdXQgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBudW1iZXJzID0gaW5wdXQudHJpbSgpLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0IG5CYW5rcyA9IDE7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuUmVjb3JkLk51bWJlck9mQmFua3MgIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBuQmFua3MgPSB0aGlzLnByb3BzLlJlY29yZC5OdW1iZXJPZkJhbmtzO1xyXG5cclxuICAgICAgICBpZiAobnVtYmVycy5sZW5ndGggIT09IHBhcnNlSW50KG5CYW5rcy50b1N0cmluZygpKSlcclxuICAgICAgICAgICAgbnVtYmVycyA9IEFycmF5LmZyb20oQXJyYXkocGFyc2VJbnQobkJhbmtzLnRvU3RyaW5nKCkpKSwgKGUsIGkpID0+ICcwJylcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByZVN3aXRjaDogbnVtYmVycy5tYXAoaXRlbSA9PiAoaXRlbS50cmltKCkgPT0gJzEnID8gdHJ1ZSA6IGZhbHNlKSkgfSlcclxuICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldnByb3AsIHByZXZzdGF0ZSkge1xyXG4gICAgICAgIGlmIChwcmV2cHJvcC5SZWNvcmQuTnVtYmVyT2ZCYW5rcyAhPT0gdGhpcy5wcm9wcy5SZWNvcmQuTnVtYmVyT2ZCYW5rcyB8fCBwcmV2cHJvcC5SZWNvcmQuQ2t0U3dpdGNoZXIgIT09IHRoaXMucHJvcHMuUmVjb3JkLkNrdFN3aXRjaGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWVzKHRoaXMucHJvcHMuUmVjb3JkLkNrdFN3aXRjaGVyKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIV8uaXNFcXVhbChwcmV2c3RhdGUsdGhpcy5zdGF0ZSkpIHtcclxuICAgICAgICAgICAgdmFyIHJlY29yZDogT3BlblhEQS5DYXBCYW5rID0gXy5jbG9uZSh0aGlzLnByb3BzLlJlY29yZCk7XHJcblxyXG4gICAgICAgICAgICByZWNvcmQuQ2t0U3dpdGNoZXIgPSB0aGlzLnN0YXRlLnByZVN3aXRjaC5tYXAoaXRlbSA9PiAoaXRlbSA/IFwiMVwiIDogXCIwXCIpKS5qb2luKFwiLFwiKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICA8bGFiZWw+Q2FwQmFuayB3aXRoIFByZS1pbnNlcnRpb24gU3dpdGNoZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5wcmVTd2l0Y2gubWFwKCh2LCBpKSA9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcm9tLWNoZWNrIGZvcm0tY2hlY2staW5saW5lXCIga2V5PXtpfT5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jaGVjay1pbnB1dFwiIHR5cGU9XCJjaGVja2JveFwiIGlkPXtcImlubGluZUNoZWNrYm94LVwiICsgaX0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxzdCA9IF8uY2xvbmUodGhpcy5zdGF0ZS5wcmVTd2l0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsc3RbaV0gPSAhbHN0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcHJlU3dpdGNoOiBsc3QgfSlcclxuICAgICAgICAgICAgICAgICAgICB9fSB2YWx1ZT17KHYgPyAxIDogMCl9IGNoZWNrZWQ9e3Z9IGRpc2FibGVkPXt0aGlzLnByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHRoaXMucHJvcHMuRGlzYWJsZWR9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tY2hlY2stbGFiZWxcIiBodG1sRm9yPXtcImlubGluZUNoZWNrYm94LVwiICsgaX0+e2krMX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+KX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+O1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBEb3VibGVJbnB1dDxUPihwcm9wczoge1xyXG4gICAgUmVjb3JkOiBUO1xyXG4gICAgRmllbGQxOiBrZXlvZiBUO1xyXG4gICAgRmllbGQyOiBrZXlvZiBUO1xyXG4gICAgU2V0dGVyOiAocmVjb3JkOiBUKSA9PiB2b2lkO1xyXG4gICAgVmFsaWQ6IChmaWVsZDoga2V5b2YgVCkgPT4gYm9vbGVhbjtcclxuICAgIExhYmVsPzogc3RyaW5nO1xyXG4gICAgRmVlZGJhY2s/OiBzdHJpbmc7XHJcbiAgICBEaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgICBUeXBlPzogJ251bWJlcicgfCAndGV4dCcgfCAncGFzc3dvcmQnIHwgJ2VtYWlsJyB8ICdjb2xvcic7XHJcbn0pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbD57cHJvcHMuTGFiZWwgPT0gbnVsbCA/IChwcm9wcy5GaWVsZDEgKyAnICcgKyBwcm9wcy5GaWVsZDIpIDogcHJvcHMuTGFiZWx9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT17cHJvcHMuVHlwZSA9PT0gdW5kZWZpbmVkID8gJ3RleHQnIDogcHJvcHMuVHlwZX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3Byb3BzLlZhbGlkKHByb3BzLkZpZWxkMSkgPyAnZm9ybS1jb250cm9sJyA6ICdmb3JtLWNvbnRyb2wgaXMtaW52YWxpZCd9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldnQpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcih7IC4uLnByb3BzLlJlY29yZCwgW3Byb3BzLkZpZWxkMV06IGV2dC50YXJnZXQudmFsdWUgIT09ICcnID8gZXZ0LnRhcmdldC52YWx1ZSA6IG51bGwgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Byb3BzLlJlY29yZFtwcm9wcy5GaWVsZDFdID09IG51bGwgPyAnJyA6IChwcm9wcy5SZWNvcmRbcHJvcHMuRmllbGQxXSBhcyBhbnkpLnRvU3RyaW5nKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Byb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHByb3BzLkRpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9e3Byb3BzLlR5cGUgPT09IHVuZGVmaW5lZCA/ICd0ZXh0JyA6IHByb3BzLlR5cGV9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtwcm9wcy5WYWxpZChwcm9wcy5GaWVsZDIpID8gJ2Zvcm0tY29udHJvbCcgOiAnZm9ybS1jb250cm9sIGlzLWludmFsaWQnfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZ0KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoeyAuLi5wcm9wcy5SZWNvcmQsIFtwcm9wcy5GaWVsZDJdOiBldnQudGFyZ2V0LnZhbHVlICE9PSAnJyA/IGV2dC50YXJnZXQudmFsdWUgOiBudWxsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwcm9wcy5SZWNvcmRbcHJvcHMuRmllbGQyXSA9PSBudWxsID8gJycgOiAocHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkMl0gYXMgYW55KS50b1N0cmluZygpfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtwcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiBwcm9wcy5EaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludmFsaWQtZmVlZGJhY2tcIj5cclxuICAgICAgICAgICAgICAgIHtwcm9wcy5GZWVkYmFjayA9PSBudWxsID8gKHByb3BzLkZpZWxkMSArICcgJyArIHByb3BzLkZpZWxkMiArICcgaXMgYSByZXF1aXJlZCBmaWVsZC4nKSA6IHByb3BzLkZlZWRiYWNrfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTGluZS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBBc3NldEF0dHJpYnV0ZXMgfSBmcm9tICcuL0Fzc2V0JztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC1mb3Jtcyc7XHJcblxyXG5mdW5jdGlvbiBMaW5lQXR0cmlidXRlcyhwcm9wczogeyBOZXdFZGl0OiBTeXN0ZW1DZW50ZXIuTmV3RWRpdCwgQXNzZXQ6IE9wZW5YREEuTGluZSwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuTGluZSkgPT4gdm9pZCB9KTogSlNYLkVsZW1lbnQge1xyXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkxpbmUpIHwga2V5b2YoT3BlblhEQS5MaW5lRGV0YWlsKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnTWF4RmF1bHREaXN0YW5jZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5NYXhGYXVsdERpc3RhbmNlID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5NYXhGYXVsdERpc3RhbmNlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTWluRmF1bHREaXN0YW5jZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5NaW5GYXVsdERpc3RhbmNlID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5NaW5GYXVsdERpc3RhbmNlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTGVuZ3RoJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkRldGFpbC5MZW5ndGggPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkRldGFpbC5MZW5ndGgpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdSMCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5EZXRhaWwuUjAgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkRldGFpbC5SMCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1gwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LkRldGFpbC5YMCA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuRGV0YWlsLlgwKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnUjEnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuRGV0YWlsLlIxID09IG51bGwgfHwgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5EZXRhaWwuUjEpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdYMScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5EZXRhaWwuWDEgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LkRldGFpbC5YMSk7XHJcbiAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnVGhlcm1hbFJhdGluZycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5EZXRhaWwuVGhlcm1hbFJhdGluZyA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuRGV0YWlsLlRoZXJtYWxSYXRpbmcpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlTGluZURldGFpbChyZWNvcmQ6IE9wZW5YREEuTGluZURldGFpbCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBhc3NldDogT3BlblhEQS5MaW5lID0gXy5jbG9uZShwcm9wcy5Bc3NldCk7XHJcbiAgICAgICAgYXNzZXQuRGV0YWlsID0gcmVjb3JkO1xyXG4gICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKGFzc2V0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIH0sIFtwcm9wcy5Bc3NldF0pO1xyXG5cclxuICAgIGlmIChwcm9wcy5Bc3NldCA9PSBudWxsIHx8IHByb3BzLkFzc2V0LkRldGFpbCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgPElucHV0PE9wZW5YREEuTGluZT4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydNYXhGYXVsdERpc3RhbmNlJ30gTGFiZWw9eydNYXggRmF1bHQgRGlzdGFuY2UnfSBGZWVkYmFjaz17J01heCBGYXVsdCBEaXN0YW5jZSBpcyBhIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8SW5wdXQ8T3BlblhEQS5MaW5lPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J01pbkZhdWx0RGlzdGFuY2UnfSBMYWJlbD17J01pbiBGYXVsdCBEaXN0YW5jZSd9IEZlZWRiYWNrPXsnTWluIEZhdWx0IERpc3RhbmNlIGlzIGEgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtaW5mb1wiIHJvbGU9XCJhbGVydFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+UmVhY3RhbmNlLCBMZW5ndGggYW5kIFRoZXJtYWwgcmF0aW5nIGFyZSBiYXNlZCBvbiB0aGUgTGluZVNlZ21lbnRzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIExpbmUuPC9wPlxyXG4gICAgICAgICAgICAgICAgPHA+VG8gZWRpdCB0aGVzZSB2YWx1ZXMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIExpbmVTZWdlbWVudCBuZWVkIHRvIGJlIGNoYW5nZWQuPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPElucHV0PE9wZW5YREEuTGluZURldGFpbD4gUmVjb3JkPXtwcm9wcy5Bc3NldC5EZXRhaWx9IEZpZWxkPXsnTGVuZ3RoJ30gRmVlZGJhY2s9eydMZW5ndGggaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgPElucHV0PE9wZW5YREEuTGluZURldGFpbD4gUmVjb3JkPXtwcm9wcy5Bc3NldC5EZXRhaWx9IEZpZWxkPXsnUjAnfSBWYWxpZD17dmFsaWR9IFNldHRlcj17dXBkYXRlTGluZURldGFpbH0gRGlzYWJsZWQ9e3RydWV9IC8+XHJcbiAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLkxpbmVEZXRhaWw+IFJlY29yZD17cHJvcHMuQXNzZXQuRGV0YWlsfSBGaWVsZD17J1gwJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3VwZGF0ZUxpbmVEZXRhaWx9IERpc2FibGVkPXt0cnVlfSAvPlxyXG4gICAgICAgICAgICA8SW5wdXQ8T3BlblhEQS5MaW5lRGV0YWlsPiBSZWNvcmQ9e3Byb3BzLkFzc2V0LkRldGFpbH0gRmllbGQ9eydSMSd9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXt1cGRhdGVMaW5lRGV0YWlsfSBEaXNhYmxlZD17dHJ1ZX0gLz5cclxuICAgICAgICAgICAgPElucHV0PE9wZW5YREEuTGluZURldGFpbD4gUmVjb3JkPXtwcm9wcy5Bc3NldC5EZXRhaWx9IEZpZWxkPXsnWDEnfSBWYWxpZD17dmFsaWR9IFNldHRlcj17dXBkYXRlTGluZURldGFpbH0gRGlzYWJsZWQ9e3RydWV9IC8+XHJcbiAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLkxpbmVEZXRhaWw+IFJlY29yZD17cHJvcHMuQXNzZXQuRGV0YWlsfSBGaWVsZD17J1RoZXJtYWxSYXRpbmcnfSBMYWJlbD17J1RoZXJtYWwgUmF0aW5nJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3VwZGF0ZUxpbmVEZXRhaWx9IERpc2FibGVkPXt0cnVlfSAvPlxyXG4gICAgICAgIDwvPlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGluZUF0dHJpYnV0ZXM7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFRyYW5zZm9ybWVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IEFzc2V0QXR0cmlidXRlcyB9IGZyb20gJy4vQXNzZXQnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuZnVuY3Rpb24gVHJhbnNmb3JtZXJBdHRyaWJ1dGVzKHByb3BzOiB7IE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LCBBc3NldDogT3BlblhEQS5UcmFuc2Zvcm1lciwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuVHJhbnNmb3JtZXIpID0+IHZvaWQgfSk6IEpTWC5FbGVtZW50IHtcclxuICAgIGZ1bmN0aW9uIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5UcmFuc2Zvcm1lcikpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ1ByaW1hcnlWb2x0YWdlS1YnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuUHJpbWFyeVZvbHRhZ2VLViA9PSBudWxsIHx8IEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuUHJpbWFyeVZvbHRhZ2VLVik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1NlY29uZGFyeVZvbHRhZ2VLVicpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5TZWNvbmRhcnlWb2x0YWdlS1YgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlNlY29uZGFyeVZvbHRhZ2VLVik7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1RhcCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5UYXAgPT0gbnVsbCB8fCBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkFzc2V0LlRhcCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1IwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlIwICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5SMCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1gwJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlgwICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5YMCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1IxJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlIxICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5SMSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1gxJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlgxICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5YMSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1RoZXJtYWxSYXRpbmcnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuVGhlcm1hbFJhdGluZyAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVGhlcm1hbFJhdGluZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvcHMuQXNzZXQgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydSMCd9IEZlZWRiYWNrPXsnUjAgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1gwJ30gRmVlZGJhY2s9eydYMCBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnUjEnfSBGZWVkYmFjaz17J1IxIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydYMSd9IEZlZWRiYWNrPXsnWDEgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1RoZXJtYWxSYXRpbmcnfSBMYWJlbD17J1RoZXJtYWwgUmF0aW5nJ30gRmVlZGJhY2s9eydUaGVybWFsIFJhdGluZyBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuVHJhbnNmb3JtZXI+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnUHJpbWFyeVZvbHRhZ2VLVid9IExhYmVsPXsnUHJpbWFyeSBWb2x0YWdlIChrViknfSBGZWVkYmFjaz17J1ByaW1hcnkgVm9sdGFnZSAoa1YpIGlzIGEgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5UcmFuc2Zvcm1lcj4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gRmllbGQ9eydTZWNvbmRhcnlWb2x0YWdlS1YnfSBMYWJlbD17J1NlY29uZGFyeSBWb2x0YWdlIChrViknfSBGZWVkYmFjaz17J1NlY29uZGFyeSBWb2x0YWdlIChrVikgaXMgYSBudW1lcmljIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLlRyYW5zZm9ybWVyPiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J1RhcCd9IEZlZWRiYWNrPXsnVGFwIGlzIGEgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUcmFuc2Zvcm1lckF0dHJpYnV0ZXM7IiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEZvcm1DaGVja0JveC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjIvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1DaGVja0JveDxUPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IFJlY29yZDogVCwgRmllbGQ6IGtleW9mIChUKSwgU2V0dGVyOiAocmVjb3JkOiBUKSA9PiB2b2lkLCBMYWJlbD86IHN0cmluZywgRGlzYWJsZWQ/OiBib29sZWFuIH0sIHt9LCB7fT57XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1jaGVja1wiPlxyXG5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImZvcm0tY2hlY2staW5wdXRcIiBzdHlsZT17eyB6SW5kZXg6IDEgfX0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByZWNvcmQ6IFQgPSBfLmNsb25lKHRoaXMucHJvcHMuUmVjb3JkKTtcclxuICAgICAgICAgICAgICAgIHJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQuY2hlY2tlZCBhcyBhbnk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID8gJ29uJyA6ICdvZmYnfSBjaGVja2VkPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA/IHRydWUgOiBmYWxzZX0gZGlzYWJsZWQ9e3RoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZH0gLz5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tY2hlY2stbGFiZWxcIiA+e3RoaXMucHJvcHMuTGFiZWwgPT0gbnVsbCA/IHRoaXMucHJvcHMuRmllbGQgOiB0aGlzLnByb3BzLkxhYmVsfTwvbGFiZWw+XHJcblxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgRm9ybUlucHV0LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSW5wdXQ8VD4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBSZWNvcmQ6IFQsIEZpZWxkOiBrZXlvZiAoVCksIFNldHRlcjogKHJlY29yZDogVCkgPT4gdm9pZCwgVmFsaWQ6IChmaWVsZDoga2V5b2YgKFQpKSA9PiBib29sZWFuLCBMYWJlbD86IHN0cmluZywgRmVlZGJhY2s/OiBzdHJpbmcsIERpc2FibGVkPzogYm9vbGVhbiB9LCB7fSwge30+e1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsPnt0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXsodGhpcy5wcm9wcy5WYWxpZCh0aGlzLnByb3BzLkZpZWxkKSA/IFwiZm9ybS1jb250cm9sXCIgOiBcImZvcm0tY29udHJvbCBpcy1pbnZhbGlkXCIpfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZDogVCA9IF8uY2xvbmUodGhpcy5wcm9wcy5SZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LnZhbHVlIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9PSBudWxsID8gJycgOiB0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXS50b1N0cmluZygpfSBkaXNhYmxlZD17dGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkIH0gLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ludmFsaWQtZmVlZGJhY2snPnt0aGlzLnByb3BzLkZlZWRiYWNrID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkICsgJyBpcyBhIHJlcXVpcmVkIGZpZWxkLicgOiB0aGlzLnByb3BzLkZlZWRiYWNrfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9