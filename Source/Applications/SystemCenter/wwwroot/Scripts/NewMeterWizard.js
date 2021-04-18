(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["NewMeterWizard"],{

/***/ "./TS/CFGParser.ts":
/*!*************************!*\
  !*** ./TS/CFGParser.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//******************************************************************************************************
//  CFGParser.tsx - Gbtc
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
//  01/07/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
var CFGParser = /** @class */ (function () {
    function CFGParser(contents, meterKey) {
        var _this = this;
        var data = contents.split('\n').map(function (a) { return a.split(','); });
        var analogCounts = parseInt(data[1][1].slice(0, data[1][1].length - 1));
        var digitalCounts = parseInt(data[1][2].slice(0, data[1][2].length - 1));
        this.Analogs = data.slice(2, analogCounts + 2).map(function (a, index) { return { ID: index, Meter: meterKey, Asset: '', MeasurementType: _this.parseType(a[4]), MeasurementCharacteristic: 'Instantaneous', Phase: _this.parsePhase(a[2]), Name: a[1], SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: a[3], Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: a[0] }] }; });
        this.Digitals = data.slice(2 + analogCounts, 2 + analogCounts + digitalCounts).map(function (a, index) { return { ID: analogCounts + index, Meter: meterKey, Asset: '', MeasurementType: 'Digital', MeasurementCharacteristic: 'Instantaneous', Phase: _this.parsePhase(a[2]), Name: a[1], SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: a[3], Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: a[0] }] }; });
        this.Channels = this.Analogs.concat(this.Digitals);
    }
    CFGParser.prototype.parsePhase = function (value) {
        if (value.toLowerCase().indexOf('a') >= 0 && value.toLowerCase().indexOf('b') >= 0)
            return 'AB';
        else if (value.toLowerCase().indexOf('b') >= 0 && value.toLowerCase().indexOf('c') >= 0)
            return 'BC';
        else if (value.toLowerCase().indexOf('c') >= 0 && value.toLowerCase().indexOf('a') >= 0)
            return 'CA';
        else if (value.toLowerCase().indexOf('a') >= 0)
            return 'AN';
        else if (value.toLowerCase().indexOf('b') >= 0)
            return 'BN';
        else if (value.toLowerCase().indexOf('c') >= 0)
            return 'CN';
        else if (value.toLowerCase().indexOf('n') >= 0)
            return 'NG';
        else
            return 'None';
    };
    CFGParser.prototype.parseType = function (value) {
        if (value.toLowerCase().indexOf('v') >= 0)
            return 'Voltage';
        else
            return 'Current';
    };
    return CFGParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (CFGParser);


/***/ }),

/***/ "./TSX/SystemCenter/AssetAttribute/CapBankRelay.tsx":
/*!**********************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/CapBankRelay.tsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
//******************************************************************************************************
//  CapBankRelay.tsx - Gbtc
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
//  08/12/2020 - C. Lackner
//       Generated original version of source code.
//
//******************************************************************************************************



function CapBankRelayAttributes(props) {
    function valid(field) {
        if (field == 'OnVoltageThreshhold')
            return props.Asset.OnVoltageThreshhold != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.Asset.OnVoltageThreshhold);
        return true;
    }
    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: props.Asset, Field: 'OnVoltageThreshhold', Label: 'Relay On Voltage Threshhold (pu)', Feedback: 'Relay On Voltage Threshhold (pu) is a required field.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }));
}
/* harmony default export */ __webpack_exports__["default"] = (CapBankRelayAttributes);


/***/ }),

/***/ "./TSX/SystemCenter/NewMeterWizard/NewMeterWizard.tsx":
/*!************************************************************!*\
  !*** ./TSX/SystemCenter/NewMeterWizard/NewMeterWizard.tsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewMeterWizard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_MeterSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Store/MeterSlice */ "./TSX/SystemCenter/Store/MeterSlice.ts");
/* harmony import */ var _Store_LocationSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Store/LocationSlice */ "./TSX/SystemCenter/Store/LocationSlice.ts");
/* harmony import */ var _Page1__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Page1 */ "./TSX/SystemCenter/NewMeterWizard/Page1.tsx");
/* harmony import */ var _Page2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Page2 */ "./TSX/SystemCenter/NewMeterWizard/Page2.tsx");
/* harmony import */ var _Page3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Page3 */ "./TSX/SystemCenter/NewMeterWizard/Page3.tsx");
/* harmony import */ var _Page4__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Page4 */ "./TSX/SystemCenter/NewMeterWizard/Page4.tsx");
/* harmony import */ var _Page5__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Page5 */ "./TSX/SystemCenter/NewMeterWizard/Page5.tsx");
//******************************************************************************************************
//  NewMeterWizard.tsx - Gbtc
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
//  01/03/2020 - Billy Ernest
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









function NewMeterWizard(props) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
    var meterKeys = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_Store_MeterSlice__WEBPACK_IMPORTED_MODULE_2__["SelectMeterKeysLowerCase"]);
    var mStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_Store_MeterSlice__WEBPACK_IMPORTED_MODULE_2__["SelectMeterStatus"]);
    var locationKeys = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_Store_LocationSlice__WEBPACK_IMPORTED_MODULE_3__["SelectLocationKeysLowerCase"]);
    var lStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_Store_LocationSlice__WEBPACK_IMPORTED_MODULE_3__["SelectLocationStatus"]);
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getCurrentStep()), 2), currentStep = _a[0], setCurrentStep = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getMeterInfo()), 2), meterInfo = _b[0], setMeterInfo = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getLocationInfo()), 2), locationInfo = _c[0], setLocationInfo = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getChannels()), 2), channels = _d[0], setChannels = _d[1];
    var _e = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getAssets()), 2), assets = _e[0], setAssets = _e[1];
    var _f = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](getAssetConnections()), 2), assetConnections = _f[0], setAssetConnections = _f[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (mStatus === 'unintiated' || mStatus === 'changed') {
            dispatch(Object(_Store_MeterSlice__WEBPACK_IMPORTED_MODULE_2__["FetchMeter"])());
            return function () {
            };
        }
    }, [dispatch, mStatus]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (lStatus === 'unintiated' || lStatus === 'changed') {
            dispatch(Object(_Store_LocationSlice__WEBPACK_IMPORTED_MODULE_3__["FetchLocation"])());
            return function () {
            };
        }
    }, [dispatch, lStatus]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        localStorage.setItem('NewMeterWizard.CurrentStep', currentStep.toString());
    }, [currentStep]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        return function () {
            sessionStorage.clear();
        };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        localStorage.setItem('NewMeterWizard.MeterInfo', JSON.stringify(meterInfo));
    }, [meterInfo]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        localStorage.setItem('NewMeterWizard.LocationInfo', JSON.stringify(locationInfo));
    }, [locationInfo]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        localStorage.setItem('NewMeterWizard.Channels', JSON.stringify(channels));
    }, [channels]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        localStorage.setItem('NewMeterWizard.Assets', JSON.stringify(assets));
    }, [assets]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        localStorage.setItem('NewMeterWizard.AssetConnections', JSON.stringify(assetConnections));
    }, [assetConnections]);
    function getCurrentStep() {
        if (localStorage.hasOwnProperty('NewMeterWizard.CurrentStep'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.CurrentStep'));
        else
            return 1;
    }
    function getMeterInfo() {
        if (localStorage.hasOwnProperty('NewMeterWizard.MeterInfo'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.MeterInfo'));
        else
            return {
                ID: 0,
                AssetKey: null,
                Name: null,
                ShortName: null,
                Alias: null,
                Make: null,
                Model: null,
                TimeZone: null,
                Description: null,
                LocationID: 0
            };
    }
    function getLocationInfo() {
        if (localStorage.hasOwnProperty('NewMeterWizard.LocationInfo'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.LocationInfo'));
        else
            return {
                ID: 0,
                LocationKey: null,
                Name: null,
                Alias: null,
                ShortName: null,
                Latitude: null,
                Longitude: null,
                Description: null,
            };
    }
    function getChannels() {
        if (localStorage.hasOwnProperty('NewMeterWizard.Channels'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.Channels'));
        else
            return [];
    }
    function getAssets() {
        if (localStorage.hasOwnProperty('NewMeterWizard.Assets'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));
        else
            return [];
    }
    function getAssetConnections() {
        if (localStorage.hasOwnProperty('NewMeterWizard.AssetConnections'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.AssetConnections'));
        else
            return [];
    }
    function addNewMeter(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Meter/New",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                MeterInfo: meterInfo,
                LocationInfo: locationInfo,
                Channels: channels,
                Assets: assets,
                AssetConnections: assetConnections
            }),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function () {
            clearData();
            window.location.href = homePath + 'index.cshtml?name=Meters';
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                clearData();
                window.location.href = homePath + 'index.cshtml?name=Meters';
            }
        });
    }
    function next() {
        // Make sure currentStep is set to something reasonable
        if (currentStep >= 4) {
            setCurrentStep(5);
        }
        else {
            setCurrentStep(currentStep + 1);
        }
    }
    function prev() {
        if (currentStep <= 1) {
            setCurrentStep(1);
        }
        else {
            setCurrentStep(currentStep - 1);
        }
        localStorage.setItem('NewMeterWizard.CurrentStep', currentStep.toString());
    }
    function clearData() {
        clearLocalStorage();
        sessionStorage.clear();
        setMeterInfo(getMeterInfo());
        setLocationInfo(getLocationInfo());
        setChannels(getChannels());
        setCurrentStep(getCurrentStep());
        setAssets(getAssets());
    }
    function clearLocalStorage() {
        if (localStorage.hasOwnProperty('NewMeterWizard.MeterInfo'))
            localStorage.removeItem('NewMeterWizard.MeterInfo');
        if (localStorage.hasOwnProperty('NewMeterWizard.LocationInfo'))
            localStorage.removeItem('NewMeterWizard.LocationInfo');
        if (localStorage.hasOwnProperty('NewMeterWizard.Channels'))
            localStorage.removeItem('NewMeterWizard.Channels');
        if (localStorage.hasOwnProperty('NewMeterWizard.Assets'))
            localStorage.removeItem('NewMeterWizard.Assets');
        if (localStorage.hasOwnProperty('NewMeterWizard.AssetConnections'))
            localStorage.removeItem('NewMeterWizard.AssetConnections');
        if (localStorage.hasOwnProperty('NewMeterWizard.CurrentStep'))
            localStorage.removeItem('NewMeterWizard.CurrentStep');
    }
    function getHeader() {
        if (currentStep == 1)
            return "Step 1: General information about the new meter";
        else if (currentStep == 2)
            return "Step 2: Substation information for the new meter";
        else if (currentStep == 3)
            return "Step 3: Populate channels for the new meter";
        else if (currentStep == 4)
            return "Step 4: Populate assets monitored by the new meter";
        else if (currentStep == 5)
            return "Step 5: Add connection between the assets that are monitored by the new meter";
    }
    function getPage() {
        if (currentStep == 1)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page1__WEBPACK_IMPORTED_MODULE_4__["default"], { MeterInfo: meterInfo, UpdateMeterInfo: setMeterInfo });
        else if (currentStep == 2)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page2__WEBPACK_IMPORTED_MODULE_5__["default"], { LocationInfo: locationInfo, UpdateLocationInfo: setLocationInfo });
        else if (currentStep == 3)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page3__WEBPACK_IMPORTED_MODULE_6__["default"], { MeterKey: meterInfo.AssetKey, Channels: channels, UpdateChannels: setChannels, UpdateAssets: setAssets });
        else if (currentStep == 4)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page4__WEBPACK_IMPORTED_MODULE_7__["default"], { AssetConnections: assetConnections, Channels: channels, Assets: assets, UpdateChannels: setChannels, UpdateAssets: setAssets, UpdateAssetConnections: setAssetConnections });
        else if (currentStep == 5)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page5__WEBPACK_IMPORTED_MODULE_8__["default"], { Assets: assets, AssetConnections: assetConnections, UpdateAssetConnections: setAssetConnections });
    }
    function disableNext() {
        if (currentStep == 1) {
            var assetKey = meterInfo.AssetKey == null || meterInfo.AssetKey.length == 0 || meterKeys.indexOf(meterInfo.AssetKey.toLowerCase()) >= 0;
            var name = meterInfo.Name == null || meterInfo.Name.length == 0;
            var make = meterInfo.Make == null || meterInfo.Make.length == 0;
            var model = meterInfo.Model == null || meterInfo.Model.length == 0;
            return assetKey || name || make || model;
        }
        else if (currentStep == 2) {
            var key = locationInfo.LocationKey == null || locationInfo.LocationKey.length == 0 || (locationKeys.indexOf(locationInfo.LocationKey.toLowerCase()) >= 0 && locationInfo.ID == 0);
            var name = locationInfo.Name == null || locationInfo.Name.length == 0;
            var latitude = locationInfo.Latitude == null;
            var longitude = locationInfo.Longitude == null;
            return key || name || latitude || longitude;
        }
        else if (currentStep == 3)
            return channels.length == 0;
        else if (currentStep == 4)
            return assets.length == 0;
        return true;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { padding: 10, height: 'inherit', overflowY: 'hidden' } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "New Meter Wizard"),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { height: 'calc(100% - 75px)' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: clearData }, "Clear Data"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { style: { width: '90%' } }, getHeader())),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body", style: { maxHeight: 'calc(100% - 126px)' } }, getPage()),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-left", onClick: prev, hidden: currentStep <= 1 }, "Prev"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: next, hidden: currentStep >= 5, disabled: currentStep >= 5 || disableNext() }, "Next"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: addNewMeter, hidden: currentStep < 5 }, "Submit")))));
}


/***/ }),

/***/ "./TSX/SystemCenter/NewMeterWizard/Page1.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/NewMeterWizard/Page1.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page1; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_ValueListSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Store/ValueListSlice */ "./TSX/SystemCenter/Store/ValueListSlice.ts");
/* harmony import */ var _Store_MeterSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Store/MeterSlice */ "./TSX/SystemCenter/Store/MeterSlice.ts");
//******************************************************************************************************
//  Page1.tsx - Gbtc
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
//  01/03/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************







function Page1(props) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
    var timeZones = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(function (state) { return Object(_Store_ValueListSlice__WEBPACK_IMPORTED_MODULE_5__["SelectValueList"])(state, 'TimeZones'); });
    var tzStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(function (state) { return Object(_Store_ValueListSlice__WEBPACK_IMPORTED_MODULE_5__["SelectValueListStatus"])(state, 'TimeZones'); });
    var meterKeys = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(_Store_MeterSlice__WEBPACK_IMPORTED_MODULE_6__["SelectMeterKeysLowerCase"]);
    var mStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(_Store_MeterSlice__WEBPACK_IMPORTED_MODULE_6__["SelectMeterStatus"]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (mStatus === 'unintiated' || mStatus === 'changed') {
            dispatch(Object(_Store_MeterSlice__WEBPACK_IMPORTED_MODULE_6__["FetchMeter"])());
            return function () {
            };
        }
    }, [dispatch, mStatus]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (tzStatus === 'unintiated' || tzStatus === 'changed') {
            dispatch(Object(_Store_ValueListSlice__WEBPACK_IMPORTED_MODULE_5__["FetchValueList"])({ group: 'TimeZones' }));
            return function () {
            };
        }
    }, [dispatch, tzStatus]);
    function valid(field) {
        if (field == 'AssetKey')
            return props.MeterInfo.AssetKey != null && meterKeys.indexOf(props.MeterInfo.AssetKey.toLowerCase()) < 0 && props.MeterInfo.AssetKey.length > 0 && props.MeterInfo.AssetKey.length <= 50;
        else if (field == 'Name')
            return props.MeterInfo.Name != null && props.MeterInfo.Name.length > 0 && props.MeterInfo.Name.length <= 200;
        else if (field == 'Alias')
            return props.MeterInfo.Alias == null || props.MeterInfo.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.MeterInfo.ShortName == null || props.MeterInfo.ShortName.length <= 50;
        else if (field == 'Make')
            return props.MeterInfo.Make != null && props.MeterInfo.Make.length > 0 && props.MeterInfo.Make.length <= 200;
        else if (field == 'Model')
            return props.MeterInfo.Model != null && props.MeterInfo.Model.length > 0 && props.MeterInfo.Model.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'AssetKey', Feedback: 'A unique key of less than 50 characters is required.', Valid: valid, Setter: props.UpdateMeterInfo }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: valid, Setter: props.UpdateMeterInfo }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: valid, Setter: props.UpdateMeterInfo }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: valid, Setter: props.UpdateMeterInfo })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'Make', Feedback: 'Make must be less than 200 characters.', Valid: valid, Setter: props.UpdateMeterInfo }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'Model', Feedback: 'Model must be less than 200 characters.', Valid: valid, Setter: props.UpdateMeterInfo }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Time Zone"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: props.MeterInfo == null || props.MeterInfo.TimeZone == null ? '-1' : props.MeterInfo.TimeZone, onChange: function (evt) {
                        var meter = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.MeterInfo);
                        if (evt.target.value != "-1")
                            meter.TimeZone = evt.target.value;
                        else
                            meter.TimeZone = null;
                        props.UpdateMeterInfo(meter);
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "-1" }, "None Selected"),
                    (timeZones != null ? timeZones.map(function (tz) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: tz.Text, key: tz.Text, disabled: !tz.Enabled, hidden: tz.Hidden }, tz.AltText1); }) : null))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__["default"], { Rows: 3, Record: props.MeterInfo, Field: 'Description', Valid: valid, Setter: props.UpdateMeterInfo }))));
}


/***/ }),

/***/ "./TSX/SystemCenter/NewMeterWizard/Page2.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/NewMeterWizard/Page2.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page2; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_LocationSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Store/LocationSlice */ "./TSX/SystemCenter/Store/LocationSlice.ts");
//******************************************************************************************************
//  Page1.tsx - Gbtc
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
//  01/03/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************






function Page2(props) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
    var locations = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(_Store_LocationSlice__WEBPACK_IMPORTED_MODULE_5__["SelectLocations"]);
    var lStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(_Store_LocationSlice__WEBPACK_IMPORTED_MODULE_5__["SelectLocationStatus"]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (lStatus === 'unintiated' || lStatus === 'changed') {
            dispatch(Object(_Store_LocationSlice__WEBPACK_IMPORTED_MODULE_5__["FetchLocation"])());
            return function () {
                //if (tzStatus == 'loading') promise.abort();
            };
        }
    }, [dispatch, lStatus]);
    function getDifferentMeterLocation(meterLocationID) {
        props.UpdateLocationInfo(locations.find(function (value, index, object) { return value.ID == meterLocationID; }));
    }
    function valid(field) {
        if (field == 'LocationKey') {
            if (props.LocationInfo.LocationKey == null || props.LocationInfo.LocationKey.length == 0 || props.LocationInfo.LocationKey.length > 50)
                return false;
            else if (props.LocationInfo.ID == 0)
                return locations.find(function (locs) { return locs.LocationKey.toLowerCase() == props.LocationInfo.LocationKey.toLowerCase(); }) == null;
            else
                return true;
        }
        else if (field == 'Name')
            return props.LocationInfo.Name != null && props.LocationInfo.Name.length > 0 && props.LocationInfo.Name.length <= 200;
        else if (field == 'Alias')
            return props.LocationInfo.Alias == null || props.LocationInfo.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.LocationInfo.ShortName == null || props.LocationInfo.ShortName.length <= 50;
        else if (field == 'Latitude')
            return props.LocationInfo.Latitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.LocationInfo.Latitude);
        else if (field == 'Longitude')
            return props.LocationInfo.Longitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(props.LocationInfo.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Select Location"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: props.LocationInfo.ID == null ? '0' : props.LocationInfo.ID, onChange: function (evt) {
                        if (evt.target.value != "0")
                            getDifferentMeterLocation(parseInt(evt.target.value));
                        else
                            props.UpdateLocationInfo({
                                ID: 0,
                                LocationKey: '',
                                Name: '',
                                Alias: '',
                                ShortName: '',
                                Latitude: 0,
                                Longitude: 0,
                                Description: '',
                            });
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "0" }, "Add New"),
                    (locations != null ? locations.map(function (ml) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: ml.ID, key: ml.ID }, ml.LocationKey); }) : null))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: props.LocationInfo, Field: 'LocationKey', Label: 'Key', Setter: props.UpdateLocationInfo, Valid: valid, Feedback: 'A unique Key is required and must be less than 50 characters.', Disabled: props.LocationInfo.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: props.LocationInfo, Field: 'Name', Setter: props.UpdateLocationInfo, Valid: valid, Feedback: 'Name is required and must be less than 200 characters.', Disabled: props.LocationInfo.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: props.LocationInfo, Field: 'ShortName', Label: 'Short Name', Setter: props.UpdateLocationInfo, Valid: valid, Feedback: 'Short Name must be less than 50 characters.', Disabled: props.LocationInfo.ID != 0 })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: props.LocationInfo, Field: 'Alias', Setter: props.UpdateLocationInfo, Valid: valid, Feedback: 'Alias must be less than 200 characters.', Disabled: props.LocationInfo.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: props.LocationInfo, Field: 'Latitude', Setter: props.UpdateLocationInfo, Valid: valid, Feedback: 'Latitude is a required numeric field.', Disabled: props.LocationInfo.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: props.LocationInfo, Field: 'Longitude', Setter: props.UpdateLocationInfo, Valid: valid, Feedback: 'Longitude is a required numeric field.', Disabled: props.LocationInfo.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__["default"], { Rows: 3, Record: props.LocationInfo, Field: 'Description', Setter: props.UpdateLocationInfo, Valid: valid, Feedback: '', Disabled: props.LocationInfo.ID != 0 }))));
}


/***/ }),

/***/ "./TSX/SystemCenter/NewMeterWizard/Page3.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/NewMeterWizard/Page3.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page3; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TS_CFGParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../TS/CFGParser */ "./TS/CFGParser.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_MeasurementTypeSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Store/MeasurementTypeSlice */ "./TSX/SystemCenter/Store/MeasurementTypeSlice.ts");
/* harmony import */ var _Store_PhaseSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Store/PhaseSlice */ "./TSX/SystemCenter/Store/PhaseSlice.ts");
//******************************************************************************************************
//  Page3.tsx - Gbtc
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
//  01/03/2020 - Billy Ernest
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







function Page3(props) {
    var fileInput = react__WEBPACK_IMPORTED_MODULE_0__["useRef"](null);
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
    var measurementTypes = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(_Store_MeasurementTypeSlice__WEBPACK_IMPORTED_MODULE_4__["SelectMeasurementTypes"]);
    var mtStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(_Store_MeasurementTypeSlice__WEBPACK_IMPORTED_MODULE_4__["SelectMeasurementTypeStatus"]);
    var phases = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(_Store_PhaseSlice__WEBPACK_IMPORTED_MODULE_5__["SelectPhases"]);
    var phStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(_Store_PhaseSlice__WEBPACK_IMPORTED_MODULE_5__["SelectPhaseStatus"]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        $(".custom-file-input").on("change", function (evt) {
            var fileName = evt.target.value.split("\\").pop();
            $(fileInput).siblings(".custom-file-label").addClass("selected").html(fileName);
            readSingleFile(evt);
        });
        return function () {
            $(".custom-file-input").off('change');
        };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (mtStatus === 'unintiated' || mtStatus === 'changed') {
            dispatch(Object(_Store_MeasurementTypeSlice__WEBPACK_IMPORTED_MODULE_4__["FetchMeasurementType"])());
            return function () {
            };
        }
    }, [dispatch, mtStatus]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (phStatus === 'unintiated' || phStatus === 'changed') {
            dispatch(Object(_Store_PhaseSlice__WEBPACK_IMPORTED_MODULE_5__["FetchPhase"])());
            return function () {
            };
        }
    }, [dispatch, phStatus]);
    function readSingleFile(evt) {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];
        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                var contents = e.target.result;
                var parser;
                if (f.name.indexOf('.cfg') >= 0) {
                    parser = new _TS_CFGParser__WEBPACK_IMPORTED_MODULE_2__["default"](contents, props.MeterKey);
                    props.UpdateChannels(parser.Channels);
                    clearAssetsChannels();
                }
                else
                    alert('File is not of type cfg. Please only use comtrade standard cfg files.');
            };
            r.readAsText(f);
        }
    }
    function deleteChannel(index) {
        var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Channels);
        var record = channels.splice(index, 1)[0];
        props.UpdateChannels(channels);
        if (record.Asset == '')
            return;
        var assets = JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));
        if (assets != null && assets.length > 0) {
            var asset = assets.find(function (a) { return a.AssetKey == record.Asset; });
            if (asset == null)
                return;
            var channelIndex = asset.Channels.findIndex(function (c) { return c.ID = record.ID; });
            if (channelIndex < 0)
                return;
            asset.Channels.splice(channelIndex, 1);
            props.UpdateAssets(assets);
        }
    }
    function clearAssetsChannels() {
        var assets = JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));
        if (assets != null && assets.length > 0) {
            $.each(assets, function (index, asset) {
                asset.Channels = [];
            });
            props.UpdateAssets(assets);
        }
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () {
                        var channels = [
                            { ID: 0, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] },
                            { ID: 1, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'VBN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage BN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] },
                            { ID: 2, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'VCN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage CN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] },
                            { ID: 3, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'IA', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current A', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] },
                            { ID: 4, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'IB', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current B', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] },
                            { ID: 5, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'IC', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current C', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] },
                            { ID: 6, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'NG', Name: 'IN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current NG', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] },
                        ];
                        props.UpdateChannels(channels);
                        clearAssetsChannels();
                    } }, "Default Setup")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group", style: { width: '100%' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "custom-file" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "file", className: "custom-file-input", ref: fileInput, accept: ".cfg,.par" }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: "custom-file-label" }, "Choose a comtrade standard cfg file if applicable")))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () {
                        var channel = { ID: props.Channels.length, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] };
                        var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Channels);
                        channels.push(channel);
                        props.UpdateChannels(channels);
                    } }, "Add Channel"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: 'calc(100% - 35px)', padding: 30, overflowY: 'auto' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table table-hover" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Channel"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Name"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Desc"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Type"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Phase"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Adder"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Multiplier"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, props.Channels.map(function (channel, index, array) {
                    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Series[0].SourceIndexes, onChange: function (event) {
                                    channel.Series[0].SourceIndexes = event.target.value;
                                    props.UpdateChannels(__spread(array));
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Name, onChange: function (event) {
                                    channel.Name = event.target.value;
                                    props.UpdateChannels(__spread(array));
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '35%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Description, onChange: function (event) {
                                    channel.Description = event.target.value;
                                    props.UpdateChannels(__spread(array));
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.MeasurementType, onChange: function (event) {
                                channel.MeasurementType = event.target.value;
                                props.UpdateChannels(__spread(array));
                            } }, measurementTypes.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.Phase, onChange: function (event) {
                                channel.Phase = event.target.value;
                                props.UpdateChannels(__spread(array));
                            } }, phases.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Adder, onChange: function (event) {
                                    channel.Adder = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["toNumber"])(event.target.value);
                                    props.UpdateChannels(__spread(array));
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Multiplier, onChange: function (event) {
                                    channel.Multiplier = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["toNumber"])(event.target.value);
                                    props.UpdateChannels(__spread(array));
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return deleteChannel(index); } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                }))))));
}


/***/ }),

/***/ "./TSX/SystemCenter/NewMeterWizard/Page4.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/NewMeterWizard/Page4.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page4; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AssetAttribute/Breaker */ "./TSX/SystemCenter/AssetAttribute/Breaker.tsx");
/* harmony import */ var _AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AssetAttribute/Bus */ "./TSX/SystemCenter/AssetAttribute/Bus.tsx");
/* harmony import */ var _AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AssetAttribute/CapBank */ "./TSX/SystemCenter/AssetAttribute/CapBank.tsx");
/* harmony import */ var _AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../AssetAttribute/Line */ "./TSX/SystemCenter/AssetAttribute/Line.tsx");
/* harmony import */ var _AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../AssetAttribute/Transformer */ "./TSX/SystemCenter/AssetAttribute/Transformer.tsx");
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _AssetAttribute_CapBankRelay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../AssetAttribute/CapBankRelay */ "./TSX/SystemCenter/AssetAttribute/CapBankRelay.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_AssetTypeSlice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Store/AssetTypeSlice */ "./TSX/SystemCenter/Store/AssetTypeSlice.ts");
/* harmony import */ var _Store_AssetSlice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Store/AssetSlice */ "./TSX/SystemCenter/Store/AssetSlice.ts");
//******************************************************************************************************
//  Page4.tsx - Gbtc
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
//  01/03/2020 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
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












function Page4(props) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["useDispatch"])();
    var assetTypes = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["useSelector"])(_Store_AssetTypeSlice__WEBPACK_IMPORTED_MODULE_10__["SelectAssetTypes"]);
    var atStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["useSelector"])(_Store_AssetTypeSlice__WEBPACK_IMPORTED_MODULE_10__["SelectAssetTypeStatus"]);
    var assets = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["useSelector"])(_Store_AssetSlice__WEBPACK_IMPORTED_MODULE_11__["SelectAssets"]);
    var aStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["useSelector"])(_Store_AssetSlice__WEBPACK_IMPORTED_MODULE_11__["SelectAssetStatus"]);
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAsset('Line')), 2), newEditAsset = _a[0], setNewEditAsset = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('New'), 2), newEdit = _b[0], setNewEdit = _b[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (atStatus === 'unintiated' || atStatus === 'changed') {
            dispatch(Object(_Store_AssetTypeSlice__WEBPACK_IMPORTED_MODULE_10__["FetchAssetType"])());
            return function () {
            };
        }
    }, [dispatch, atStatus]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (aStatus === 'unintiated' || aStatus === 'changed') {
            dispatch(Object(_Store_AssetSlice__WEBPACK_IMPORTED_MODULE_11__["FetchAsset"])());
            return function () {
            };
        }
    }, [dispatch, aStatus]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (newEditAsset.AssetType == 'Breaker') {
            var handle_1 = getEDNAPoint(newEditAsset.ID);
            handle_1.done(function (ednaPoint) {
                var record = __assign({}, newEditAsset);
                if (ednaPoint != undefined) {
                    record.EDNAPoint = ednaPoint.Point;
                    setNewEditAsset(record);
                }
            });
            return function () {
                if (handle_1.abort !== undefined)
                    handle_1.abort();
            };
        }
        else if (newEditAsset.AssetType == 'Line') {
            var handle_2 = getLineSegment(newEditAsset.ID);
            handle_2.done(function (lineSegment) {
                var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](newEditAsset);
                if (lineSegment != undefined) {
                    record.Detail = lineSegment;
                }
                else {
                    record.Detail = _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewLineDetails();
                }
                setNewEditAsset(record);
            });
            return function () {
                if (handle_2.abort !== undefined)
                    handle_2.abort();
            };
        }
    }, [newEditAsset.AssetType]);
    function editAsset(index) {
        setNewEdit('Edit');
        setNewEditAsset(props.Assets[index]);
    }
    function deleteAsset(index) {
        var list = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Assets);
        var record = list.splice(index, 1);
        var assetConnections = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.AssetConnections);
        var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Channels);
        $.each(channels, function (index, channel) {
            if (channel.Asset == record[0].AssetKey)
                channel.Asset = '';
        });
        var index = assetConnections.findIndex(function (assetConnection) { return assetConnection.Parent == record[0].AssetKey || assetConnection.Child == record[0].AssetKey; });
        while (index >= 0) {
            assetConnections.splice(index, 1);
            index = assetConnections.findIndex(function (assetConnection) { return assetConnection.Parent == record[0].AssetKey || assetConnection.Child == record[0].AssetKey; });
        }
        props.UpdateAssets(list);
        props.UpdateChannels(channels);
        props.UpdateAssetConnections(assetConnections);
    }
    function changeAssetType(type) {
        var asset = {
            ID: newEditAsset.ID,
            AssetKey: newEditAsset.AssetKey,
            AssetName: newEditAsset.AssetName,
            AssetType: type,
            Description: newEditAsset.Description,
            VoltageKV: newEditAsset.VoltageKV,
            Channels: newEditAsset.Channels,
            Spare: newEditAsset.Spare
        };
        asset = _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAssetAttributes(asset, type);
        setNewEditAsset(asset);
    }
    function getDifferentAsset(assetID) {
        var assetTypeID = assets.find(function (a) { return a.ID == assetID; })['AssetTypeID'];
        var assetType = assetTypes.find(function (at) { return at.ID == assetTypeID; });
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/" + assetType.Name + "/One/" + assetID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (asset) {
            asset.AssetType = assetType.Name;
            asset.Channels = [];
            setNewEditAsset(asset);
        });
    }
    function getLineSegment(lineID) {
        return $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Line/" + lineID + "/LineSegment",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }
    function getEDNAPoint(breakerID) {
        return $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Breaker/" + breakerID + "/EDNAPoint",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }
    function disableModalSave() {
        return $('.is-invalid').length > 0;
    }
    function showAttributes() {
        if (newEditAsset.AssetType == 'Breaker')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_2__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'Bus')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_3__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'CapacitorBank')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_4__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'CapacitorBankRelay')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBankRelay__WEBPACK_IMPORTED_MODULE_8__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'Line')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_5__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
        else if (newEditAsset.AssetType == 'Transformer')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_6__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { margin: -20 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col-lg-4" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { width: '100%', height: window.innerHeight - 285, maxHeight: window.innerHeight - 285, overflowY: 'auto', padding: 0, margin: 0 } }, props.Channels.map(function (channel, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { style: { textDecoration: (channel.Asset.length > 0 ? 'line-through' : null) }, key: index }, channel.Name + ' - ' + channel.Description); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { padding: 20 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: 38 } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", "data-toggle": 'modal', "data-target": '#assetModal', onClick: function () { return setNewEdit('New'); } }, "Add Asset")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 350, padding: 30, overflowY: 'auto' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table table-hover" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Status"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Key"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Name"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Type"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "kV"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Channels"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, props.Assets.map(function (asset, index, array) {
                            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, (asset.ID == 0 ? 'New' : 'Existing')),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } }, asset.AssetKey),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '30%' } }, asset.AssetName),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, asset.AssetType),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, asset.VoltageKV),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, asset.Channels.length),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", "data-toggle": 'modal', "data-target": '#assetModal', onClick: function (e) { return editAsset(index); } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-pencil" }))),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return deleteAsset(index); } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                        })))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "assetModal" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '90%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, newEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + newEditAsset.AssetKey + ' for Meter'),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"], { Asset: newEditAsset, NewEdit: newEdit, AssetTypes: assetTypes, AllAssets: assets, UpdateState: setNewEditAsset, GetDifferentAsset: getDifferentAsset })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, showAttributes()),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Associated Channels"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { multiple: true, style: { height: '100%', width: '100%' }, onChange: function (evt) {
                                        var asset = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](newEditAsset);
                                        asset.Channels = $(evt.target).val().map(function (a) { return props.Channels[parseInt(a)]; });
                                        setNewEditAsset(asset);
                                    }, value: newEditAsset.Channels.map(function (a) { return a.ID.toString(); }) }, props.Channels.map(function (channel, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index, value: index, hidden: channel.Asset != newEditAsset.AssetKey && channel.Asset.length > 0 }, channel.Name + ' - ' + channel.Description); }))))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function (evt) {
                                var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](newEditAsset);
                                var list = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Assets);
                                var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Channels);
                                $.each(channels, function (index, channel) {
                                    if (channel.Asset == record.AssetKey)
                                        channel.Asset = '';
                                    if (record.Channels.findIndex(function (c) { return c.ID == channel.ID; }) >= 0)
                                        channel.Asset = record.AssetKey;
                                });
                                list.push(record);
                                props.UpdateChannels(channels);
                                props.UpdateAssets(list);
                                setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAsset('Line'));
                            }, hidden: newEdit != 'New' }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function (evt) {
                                var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](newEditAsset);
                                var list = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Assets);
                                var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Channels);
                                var i = list.findIndex(function (r) { return r.AssetKey == record.AssetKey; });
                                list[i] = record;
                                $.each(channels, function (index, channel) {
                                    if (channel.Asset == record.AssetKey)
                                        channel.Asset = '';
                                    if (record.Channels.findIndex(function (c) { return c.ID == channel.ID; }) >= 0)
                                        channel.Asset = record.AssetKey;
                                });
                                props.UpdateChannels(channels);
                                props.UpdateAssets(list);
                                setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAsset('Line'));
                            }, hidden: newEdit != 'Edit' }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal", onClick: function (evt) {
                                setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAsset('Line'));
                            } }, "Close")))))));
}


/***/ }),

/***/ "./TSX/SystemCenter/NewMeterWizard/Page5.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/NewMeterWizard/Page5.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Page5; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_AssetConnectionTypeSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Store/AssetConnectionTypeSlice */ "./TSX/SystemCenter/Store/AssetConnectionTypeSlice.ts");
//******************************************************************************************************
//  Page5.tsx - Gbtc
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
//  01/10/2020 - Billy Ernest
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




function Page5(props) {
    var selectAsset = react__WEBPACK_IMPORTED_MODULE_0__["useRef"](null);
    var selectType = react__WEBPACK_IMPORTED_MODULE_0__["useRef"](null);
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
    var assetConnectionTypes = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(_Store_AssetConnectionTypeSlice__WEBPACK_IMPORTED_MODULE_3__["SelectAssetConnectionTypes"]);
    var actStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(_Store_AssetConnectionTypeSlice__WEBPACK_IMPORTED_MODULE_3__["SelectAssetConnectionTypeStatus"]);
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](0), 2), assetIndex = _a[0], setAssetIndex = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (actStatus === 'unintiated' || actStatus === 'changed') {
            var promise = dispatch(Object(_Store_AssetConnectionTypeSlice__WEBPACK_IMPORTED_MODULE_3__["FetchAssetConnectionType"])());
            return function () {
                //if (tzStatus == 'loading') promise.abort();
            };
        }
    }, [dispatch, actStatus]);
    function next() {
        // Make sure currentStep is set to something reasonable
        if (assetIndex >= props.Assets.length - 1) {
            setAssetIndex(props.Assets.length - 1);
        }
        else {
            setAssetIndex(assetIndex + 1);
        }
    }
    function prev() {
        if (assetIndex <= 0) {
            setAssetIndex(0);
        }
        else {
            setAssetIndex(assetIndex - 1);
        }
    }
    function deleteAssetConnection(ac) {
        var list = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.AssetConnections);
        var index = list.findIndex(function (a) { return a == ac; });
        var record = list.splice(index, 1);
        props.UpdateAssetConnections(list);
    }
    var currentAsset = props.Assets[assetIndex];
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { margin: -20 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col-lg-4" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { width: '100%', height: window.innerHeight - 285, maxHeight: window.innerHeight - 285, overflowY: 'auto', padding: 0, margin: 0 } }, props.Assets.map(function (asset, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { style: { textDecoration: (index <= assetIndex ? 'line-through' : null) }, key: index }, asset.AssetKey); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { padding: 0 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { height: '100%' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", "data-toggle": 'modal', "data-target": '#newConnection', disabled: props.Assets.length <= 1 }, "Add Connection"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { style: { width: '100%' } }, currentAsset.AssetKey)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body", style: { overflowY: 'scroll', maxHeight: window.innerHeight - 415 } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table table-hover" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Asset"),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Type"),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Connection"),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, props.AssetConnections.filter(function (ac) { return ac.Parent == currentAsset.AssetKey || ac.Child == currentAsset.AssetKey; }).map(function (ac, index, array) {
                                var connectionAsset;
                                if (ac.Parent == currentAsset.AssetKey) {
                                    connectionAsset = props.Assets.find(function (asset) { return asset.AssetKey == ac.Child; });
                                }
                                else
                                    connectionAsset = props.Assets.find(function (asset) { return asset.AssetKey == ac.Parent; });
                                var connectionType = assetConnectionTypes.find(function (act) { return act.ID == ac.AssetRelationshipTypeID; });
                                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } }, connectionAsset.AssetKey),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } }, connectionAsset.AssetType),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '50%' } }, connectionType != undefined ? connectionType.Name : ''),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return deleteAssetConnection(ac); } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                            })))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-left", onClick: prev, hidden: false, disabled: assetIndex < 1 }, "Prev"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: next, disabled: assetIndex == props.Assets.length - 1 }, "Next"))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "newConnection" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" },
                            "Add a Connection to ",
                            currentAsset.AssetKey),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Select Connecting Asset"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { ref: selectAsset, className: "form-control", onChange: function (evt) {
                                } }, props.Assets.filter(function (asset) { return asset.AssetKey != currentAsset.AssetKey; }).map(function (asset, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index, value: asset.AssetKey }, asset.AssetKey); }))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Select Connection Type"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { ref: selectType, className: "form-control", onChange: function (evt) {
                                } }, assetConnectionTypes.map(function (act, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index, value: act.ID }, act.Name); })))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function (evt) {
                                var childConnection = $(selectAsset.current).val();
                                var connectionType = parseInt($(selectType.current).val());
                                var assetConnections = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.AssetConnections);
                                assetConnections.push({ ID: 0, AssetRelationshipTypeID: connectionType, Parent: currentAsset.AssetKey, Child: childConnection });
                                props.UpdateAssetConnections(assetConnections);
                            } }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close")))))));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9DRkdQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rUmVsYXkudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvTmV3TWV0ZXJXaXphcmQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTEudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTIudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTMudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBLHdHQUF3RztBQUN4Ryx3QkFBd0I7QUFDeEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3RztBQUl4RztJQUlJLG1CQUFZLFFBQWdCLEVBQUUsUUFBZ0I7UUFBOUMsaUJBUUM7UUFQRyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFB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QyxHQUFHLEVBQVksQ0FBQztnQ0FDN0QsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFZLENBQUMsQ0FBQztnQ0FDckUsSUFBSSxnQkFBZ0IsR0FBbUMsNENBQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQ0FDdkYsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSx1QkFBdUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7Z0NBQ2pJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzRCQUNuRCxDQUFDLFdBQWdCO3dCQUVqQixnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxnQkFBZ0Isa0JBQWMsT0FBTyxZQUFlLENBQ2xGLENBRUosQ0FDSixDQUVKLENBQ1AsQ0FDTixDQUFDO0FBRU4sQ0FBQyIsImZpbGUiOiJOZXdNZXRlcldpemFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDRkdQYXJzZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzA3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSBcIi4uL1RTWC9TeXN0ZW1DZW50ZXIvZ2xvYmFsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDRkdQYXJzZXIge1xyXG4gICAgQW5hbG9nczogQXJyYXk8T3BlblhEQS5DaGFubmVsPjtcclxuICAgIERpZ2l0YWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+O1xyXG4gICAgQ2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD47XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50czogc3RyaW5nLCBtZXRlcktleTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBjb250ZW50cy5zcGxpdCgnXFxuJykubWFwKGEgPT4gYS5zcGxpdCgnLCcpKTtcclxuICAgICAgICBsZXQgYW5hbG9nQ291bnRzID0gcGFyc2VJbnQoZGF0YVsxXVsxXS5zbGljZSgwLCBkYXRhWzFdWzFdLmxlbmd0aCAtIDEpKTtcclxuICAgICAgICBsZXQgZGlnaXRhbENvdW50cyA9IHBhcnNlSW50KGRhdGFbMV1bMl0uc2xpY2UoMCwgZGF0YVsxXVsyXS5sZW5ndGggLSAxKSk7XHJcblxyXG4gICAgICAgIHRoaXMuQW5hbG9ncyA9IGRhdGEuc2xpY2UoMiwgYW5hbG9nQ291bnRzICsgMikubWFwKChhOiBBcnJheTxzdHJpbmc+LCBpbmRleCkgPT4geyByZXR1cm4geyBJRDogaW5kZXgsIE1ldGVyOiBtZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6IHRoaXMucGFyc2VUeXBlKGFbNF0pLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiB0aGlzLnBhcnNlUGhhc2UoYVsyXSksIE5hbWU6IGFbMV0sIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiBhWzNdLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IFt7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiBhWzBdIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsIH0pO1xyXG4gICAgICAgIHRoaXMuRGlnaXRhbHMgPSBkYXRhLnNsaWNlKDIgKyBhbmFsb2dDb3VudHMsIDIgKyBhbmFsb2dDb3VudHMgKyBkaWdpdGFsQ291bnRzKS5tYXAoKGE6IEFycmF5PHN0cmluZz4sIGluZGV4KSA9PiB7IHJldHVybiB7IElEOiBhbmFsb2dDb3VudHMraW5kZXgsIE1ldGVyOiBtZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdEaWdpdGFsJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogdGhpcy5wYXJzZVBoYXNlKGFbMl0pLCBOYW1lOiBhWzFdLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogYVszXSwgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiBbeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogYVswXSB9IGFzIE9wZW5YREEuU2VyaWVzXSB9IGFzIE9wZW5YREEuQ2hhbm5lbCB9KVxyXG4gICAgICAgIHRoaXMuQ2hhbm5lbHMgPSB0aGlzLkFuYWxvZ3MuY29uY2F0KHRoaXMuRGlnaXRhbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlUGhhc2UodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDAgJiYgdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdBQic7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMCAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gJ0JDJztcclxuICAgICAgICBlbHNlIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ0EnO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQU4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQk4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYycpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ04nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignbicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnTkcnO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuICdOb25lJztcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZVR5cGUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnVm9sdGFnZSc7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJ0N1cnJlbnQnO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBDYXBCYW5rUmVsYXkudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDgvMTIvMjAyMCAtIEMuIExhY2tuZXJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi9Bc3NldCc7XG5cbmZ1bmN0aW9uIENhcEJhbmtSZWxheUF0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkNhcEJhbmtSZWxheSwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQ2FwQmFua1JlbGF5KSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkNhcEJhbmtSZWxheSkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpZWxkID09ICdPblZvbHRhZ2VUaHJlc2hob2xkJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiA8PlxuICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFua1JlbGF5PiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J09uVm9sdGFnZVRocmVzaGhvbGQnfSBMYWJlbD17J1JlbGF5IE9uIFZvbHRhZ2UgVGhyZXNoaG9sZCAocHUpJ30gRmVlZGJhY2s9eydSZWxheSBPbiBWb2x0YWdlIFRocmVzaGhvbGQgKHB1KSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICA8Lz47XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FwQmFua1JlbGF5QXR0cmlidXRlczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTmV3TWV0ZXJXaXphcmQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgU2VsZWN0TWV0ZXJLZXlzTG93ZXJDYXNlLCBTZWxlY3RNZXRlclN0YXR1cywgRmV0Y2hNZXRlciB9IGZyb20gJy4uL1N0b3JlL01ldGVyU2xpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3RMb2NhdGlvbktleXNMb3dlckNhc2UsIFNlbGVjdExvY2F0aW9uU3RhdHVzLCBGZXRjaExvY2F0aW9uIH0gZnJvbSAnLi4vU3RvcmUvTG9jYXRpb25TbGljZSc7XHJcblxyXG5pbXBvcnQgUGFnZTEgZnJvbSAnLi9QYWdlMSc7XHJcbmltcG9ydCBQYWdlMiBmcm9tICcuL1BhZ2UyJztcclxuaW1wb3J0IFBhZ2UzIGZyb20gJy4vUGFnZTMnO1xyXG5pbXBvcnQgUGFnZTQgZnJvbSAnLi9QYWdlNCc7XHJcbmltcG9ydCBQYWdlNSBmcm9tICcuL1BhZ2U1JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXNzZXRMaXN0cyB7XHJcbiAgICBCcmVha2VyczogQXJyYXk8T3BlblhEQS5CcmVha2VyPixcclxuICAgIEJ1c2VzOiBBcnJheTxPcGVuWERBLkJyZWFrZXI+LFxyXG4gICAgQ2FwQmFua3M6IEFycmF5PE9wZW5YREEuQ2FwQmFuaz4sXHJcbiAgICBMaW5lczogQXJyYXk8T3BlblhEQS5MaW5lPixcclxuICAgIFRyYW5zZm9ybWVyczogQXJyYXk8T3BlblhEQS5UcmFuc2Zvcm1lcj5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmV3TWV0ZXJXaXphcmQocHJvcHM6IHt9KSB7XHJcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcblxyXG4gICAgY29uc3QgbWV0ZXJLZXlzID0gdXNlU2VsZWN0b3IoU2VsZWN0TWV0ZXJLZXlzTG93ZXJDYXNlKTtcclxuICAgIGNvbnN0IG1TdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RNZXRlclN0YXR1cyk7XHJcbiAgICBjb25zdCBsb2NhdGlvbktleXMgPSB1c2VTZWxlY3RvcihTZWxlY3RMb2NhdGlvbktleXNMb3dlckNhc2UpO1xyXG4gICAgY29uc3QgbFN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdExvY2F0aW9uU3RhdHVzKTtcclxuXHJcbiAgICBjb25zdCBbY3VycmVudFN0ZXAsIHNldEN1cnJlbnRTdGVwXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oZ2V0Q3VycmVudFN0ZXAoKSk7XHJcbiAgICBjb25zdCBbbWV0ZXJJbmZvLCBzZXRNZXRlckluZm9dID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5NZXRlcj4oZ2V0TWV0ZXJJbmZvKCkpO1xyXG4gICAgY29uc3QgW2xvY2F0aW9uSW5mbywgc2V0TG9jYXRpb25JbmZvXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuTG9jYXRpb24+KGdldExvY2F0aW9uSW5mbygpKTtcclxuICAgIGNvbnN0IFtjaGFubmVscywgc2V0Q2hhbm5lbHNdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5DaGFubmVsW10+KGdldENoYW5uZWxzKCkpO1xyXG4gICAgY29uc3QgW2Fzc2V0cywgc2V0QXNzZXRzXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXRbXT4oZ2V0QXNzZXRzKCkpO1xyXG4gICAgY29uc3QgW2Fzc2V0Q29ubmVjdGlvbnMsIHNldEFzc2V0Q29ubmVjdGlvbnNdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldENvbm5lY3Rpb25bXT4oZ2V0QXNzZXRDb25uZWN0aW9ucygpKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChtU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgbVN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoTWV0ZXIoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIG1TdGF0dXNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChsU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgbFN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoTG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIGxTdGF0dXNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcsIGN1cnJlbnRTdGVwLnRvU3RyaW5nKCkpXHJcbiAgICB9LCBbY3VycmVudFN0ZXBdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJywgSlNPTi5zdHJpbmdpZnkobWV0ZXJJbmZvKSk7XHJcbiAgICB9LCBbbWV0ZXJJbmZvXSk7XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nLCBKU09OLnN0cmluZ2lmeShsb2NhdGlvbkluZm8pKTtcclxuICAgIH0sIFsgbG9jYXRpb25JbmZvXSk7XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DaGFubmVscycsIEpTT04uc3RyaW5naWZ5KGNoYW5uZWxzKSk7XHJcbiAgICB9LCBbY2hhbm5lbHNdKTtcclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycsIEpTT04uc3RyaW5naWZ5KGFzc2V0cykpO1xyXG4gICAgfSwgW2Fzc2V0c10pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycsIEpTT04uc3RyaW5naWZ5KGFzc2V0Q29ubmVjdGlvbnMpKTtcclxuICAgIH0sIFsgYXNzZXRDb25uZWN0aW9uc10pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRTdGVwKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gMVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNZXRlckluZm8oKTogT3BlblhEQS5NZXRlciB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlckluZm8nKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgICAgIEFzc2V0S2V5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIFNob3J0TmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIEFsaWFzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTWFrZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIE1vZGVsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgVGltZVpvbmU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uSUQ6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldExvY2F0aW9uSW5mbygpOiBPcGVuWERBLkxvY2F0aW9uIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIElEOiAwLFxyXG4gICAgICAgICAgICAgICAgTG9jYXRpb25LZXk6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBOYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgQWxpYXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBTaG9ydE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBMYXRpdHVkZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIExvbmdpdHVkZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hhbm5lbHMoKTogQXJyYXk8T3BlblhEQS5DaGFubmVsPiB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkNoYW5uZWxzJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QXNzZXRzKCk6IEFycmF5PE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lcj5cclxuICAgIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFzc2V0Q29ubmVjdGlvbnMoKTogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+IHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTmV3TWV0ZXIoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQsIE1vdXNlRXZlbnQ+KTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvTmV3YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBNZXRlckluZm86IG1ldGVySW5mbyxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uSW5mbzogbG9jYXRpb25JbmZvLFxyXG4gICAgICAgICAgICAgICAgQ2hhbm5lbHM6IGNoYW5uZWxzLFxyXG4gICAgICAgICAgICAgICAgQXNzZXRzOiBhc3NldHMsXHJcbiAgICAgICAgICAgICAgICBBc3NldENvbm5lY3Rpb25zOiBhc3NldENvbm5lY3Rpb25zXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9TWV0ZXJzJztcclxuICAgICAgICB9KS5mYWlsKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9TWV0ZXJzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIGN1cnJlbnRTdGVwIGlzIHNldCB0byBzb21ldGhpbmcgcmVhc29uYWJsZVxyXG4gICAgICAgIGlmIChjdXJyZW50U3RlcCA+PSA0KSB7XHJcbiAgICAgICAgICAgc2V0Q3VycmVudFN0ZXAoNSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudFN0ZXAoY3VycmVudFN0ZXAgKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZXYoKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwIDw9IDEpIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudFN0ZXAoMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudFN0ZXAoY3VycmVudFN0ZXAgLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcsIGN1cnJlbnRTdGVwLnRvU3RyaW5nKCkpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBjbGVhckxvY2FsU3RvcmFnZSgpO1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIHNldE1ldGVySW5mbyhnZXRNZXRlckluZm8oKSk7XHJcbiAgICAgICAgc2V0TG9jYXRpb25JbmZvKGdldExvY2F0aW9uSW5mbygpKTtcclxuICAgICAgICBzZXRDaGFubmVscyhnZXRDaGFubmVscygpKTtcclxuICAgICAgICBzZXRDdXJyZW50U3RlcChnZXRDdXJyZW50U3RlcCgpKTtcclxuICAgICAgICBzZXRBc3NldHMoZ2V0QXNzZXRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycpXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkNoYW5uZWxzJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRIZWFkZXIoKTogc3RyaW5nIHtcclxuICAgICAgICBpZihjdXJyZW50U3RlcCA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDE6IEdlbmVyYWwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG5ldyBtZXRlclwiXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiU3RlcCAyOiBTdWJzdGF0aW9uIGluZm9ybWF0aW9uIGZvciB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDM6IFBvcHVsYXRlIGNoYW5uZWxzIGZvciB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSA0KVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDQ6IFBvcHVsYXRlIGFzc2V0cyBtb25pdG9yZWQgYnkgdGhlIG5ldyBtZXRlclwiXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gNSlcclxuICAgICAgICAgICAgcmV0dXJuIFwiU3RlcCA1OiBBZGQgY29ubmVjdGlvbiBiZXR3ZWVuIHRoZSBhc3NldHMgdGhhdCBhcmUgbW9uaXRvcmVkIGJ5IHRoZSBuZXcgbWV0ZXJcIlxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQYWdlKCkge1xyXG4gICAgICAgIGlmIChjdXJyZW50U3RlcCA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UxIE1ldGVySW5mbz17bWV0ZXJJbmZvfSBVcGRhdGVNZXRlckluZm89e3NldE1ldGVySW5mb30gLz5cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAyKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UyIExvY2F0aW9uSW5mbz17bG9jYXRpb25JbmZvfSBVcGRhdGVMb2NhdGlvbkluZm89e3NldExvY2F0aW9uSW5mb30gLz5cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UzIE1ldGVyS2V5PXttZXRlckluZm8uQXNzZXRLZXl9IENoYW5uZWxzPXtjaGFubmVsc30gVXBkYXRlQ2hhbm5lbHM9e3NldENoYW5uZWxzfSBVcGRhdGVBc3NldHM9e3NldEFzc2V0c30gLz5cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSA0KVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2U0IEFzc2V0Q29ubmVjdGlvbnM9e2Fzc2V0Q29ubmVjdGlvbnN9IENoYW5uZWxzPXtjaGFubmVsc30gQXNzZXRzPXthc3NldHN9IFVwZGF0ZUNoYW5uZWxzPXtzZXRDaGFubmVsc30gVXBkYXRlQXNzZXRzPXtzZXRBc3NldHN9IFVwZGF0ZUFzc2V0Q29ubmVjdGlvbnM9e3NldEFzc2V0Q29ubmVjdGlvbnN9IC8+XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gNSlcclxuICAgICAgICAgICAgcmV0dXJuIDxQYWdlNSBBc3NldHM9e2Fzc2V0c30gQXNzZXRDb25uZWN0aW9ucz17YXNzZXRDb25uZWN0aW9uc30gVXBkYXRlQXNzZXRDb25uZWN0aW9ucz17c2V0QXNzZXRDb25uZWN0aW9uc30gLz5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlzYWJsZU5leHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIGFzc2V0S2V5OiBib29sZWFuID0gbWV0ZXJJbmZvLkFzc2V0S2V5ID09IG51bGwgfHwgbWV0ZXJJbmZvLkFzc2V0S2V5Lmxlbmd0aCA9PSAwIHx8IG1ldGVyS2V5cy5pbmRleE9mKG1ldGVySW5mby5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKSA+PSAwO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogYm9vbGVhbiA9IG1ldGVySW5mby5OYW1lID09IG51bGwgfHwgbWV0ZXJJbmZvLk5hbWUubGVuZ3RoID09IDA7XHJcbiAgICAgICAgICAgIHZhciBtYWtlOiBib29sZWFuID0gbWV0ZXJJbmZvLk1ha2UgPT0gbnVsbCB8fCBtZXRlckluZm8uTWFrZS5sZW5ndGggPT0gMDtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBib29sZWFuID0gbWV0ZXJJbmZvLk1vZGVsID09IG51bGwgfHwgbWV0ZXJJbmZvLk1vZGVsLmxlbmd0aCA9PSAwO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFzc2V0S2V5IHx8IG5hbWUgfHwgbWFrZSB8fCBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gMikge1xyXG4gICAgICAgICAgICB2YXIga2V5OiBib29sZWFuID0gbG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5ID09IG51bGwgfHwgbG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5Lmxlbmd0aCA9PSAwIHx8IChsb2NhdGlvbktleXMuaW5kZXhPZihsb2NhdGlvbkluZm8uTG9jYXRpb25LZXkudG9Mb3dlckNhc2UoKSkgPj0gMCAmJiBsb2NhdGlvbkluZm8uSUQgPT0gMCk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBib29sZWFuID0gbG9jYXRpb25JbmZvLk5hbWUgPT0gbnVsbCB8fCBsb2NhdGlvbkluZm8uTmFtZS5sZW5ndGggPT0gMDtcclxuICAgICAgICAgICAgdmFyIGxhdGl0dWRlOiBib29sZWFuID0gbG9jYXRpb25JbmZvLkxhdGl0dWRlID09IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBsb25naXR1ZGU6IGJvb2xlYW4gPSBsb2NhdGlvbkluZm8uTG9uZ2l0dWRlID09IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ga2V5IHx8IG5hbWUgfHwgbGF0aXR1ZGUgfHwgbG9uZ2l0dWRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gY2hhbm5lbHMubGVuZ3RoID09IDA7XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gNClcclxuICAgICAgICAgICAgcmV0dXJuIGFzc2V0cy5sZW5ndGggPT0gMDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17e3BhZGRpbmc6IDEwLCBoZWlnaHQ6ICdpbmhlcml0Jywgb3ZlcmZsb3dZOiAnaGlkZGVuJ319PlxyXG4gICAgICAgICAgICA8aDI+TmV3IE1ldGVyIFdpemFyZDwvaDI+XHJcbiAgICAgICAgICAgIDxoci8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7aGVpZ2h0OiAnY2FsYygxMDAlIC0gNzVweCknfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e2NsZWFyRGF0YX0gPkNsZWFyIERhdGE8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQgc3R5bGU9e3t3aWR0aDogJzkwJSd9fT57Z2V0SGVhZGVyKCl9PC9oND5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIiBzdHlsZT17e21heEhlaWdodDogJ2NhbGMoMTAwJSAtIDEyNnB4KSd9fT5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0UGFnZSgpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1sZWZ0XCIgb25DbGljaz17cHJldn0gaGlkZGVuPXtjdXJyZW50U3RlcCA8PSAxfT5QcmV2PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e25leHR9IGhpZGRlbj17Y3VycmVudFN0ZXAgPj0gNX0gZGlzYWJsZWQ9e2N1cnJlbnRTdGVwID49IDUgfHwgZGlzYWJsZU5leHQoKX0+TmV4dDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXthZGROZXdNZXRlcn0gaGlkZGVuPXtjdXJyZW50U3RlcCA8IDV9PlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTEudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBGb3JtVGV4dEFyZWEgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtVGV4dEFyZWEnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdFZhbHVlTGlzdCwgU2VsZWN0VmFsdWVMaXN0U3RhdHVzLCBGZXRjaFZhbHVlTGlzdCB9IGZyb20gJy4uL1N0b3JlL1ZhbHVlTGlzdFNsaWNlJztcclxuaW1wb3J0IHsgU2VsZWN0TWV0ZXJLZXlzTG93ZXJDYXNlLCBTZWxlY3RNZXRlclN0YXR1cywgRmV0Y2hNZXRlciB9IGZyb20gJy4uL1N0b3JlL01ldGVyU2xpY2UnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UxKHByb3BzOiB7IE1ldGVySW5mbzogT3BlblhEQS5NZXRlciwgVXBkYXRlTWV0ZXJJbmZvOiAocmVjb3JkOiBPcGVuWERBLk1ldGVyKSA9PiB2b2lkIH0pIHtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIGNvbnN0IHRpbWVab25lcyA9IHVzZVNlbGVjdG9yKHN0YXRlID0+IFNlbGVjdFZhbHVlTGlzdChzdGF0ZSwgJ1RpbWVab25lcycpKTtcclxuICAgIGNvbnN0IHR6U3RhdHVzID0gdXNlU2VsZWN0b3Ioc3RhdGUgPT4gU2VsZWN0VmFsdWVMaXN0U3RhdHVzKHN0YXRlLCAnVGltZVpvbmVzJykpIGFzIFN5c3RlbUNlbnRlci5TdGF0dXM7XHJcbiAgICBjb25zdCBtZXRlcktleXMgPSB1c2VTZWxlY3RvcihTZWxlY3RNZXRlcktleXNMb3dlckNhc2UpO1xyXG4gICAgY29uc3QgbVN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdE1ldGVyU3RhdHVzKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChtU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgbVN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoTWV0ZXIoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIG1TdGF0dXNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0elN0YXR1cyA9PT0gJ3VuaW50aWF0ZWQnIHx8IHR6U3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hWYWx1ZUxpc3QoeyBncm91cDogJ1RpbWVab25lcycgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCB0elN0YXR1c10pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5NZXRlcikpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ0Fzc2V0S2V5JylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5Bc3NldEtleSAhPSBudWxsICYmIG1ldGVyS2V5cy5pbmRleE9mKHByb3BzLk1ldGVySW5mby5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKSA8IDAgJiZwcm9wcy5NZXRlckluZm8uQXNzZXRLZXkubGVuZ3RoID4gMCAmJiBwcm9wcy5NZXRlckluZm8uQXNzZXRLZXkubGVuZ3RoIDw9IDUwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5OYW1lICE9IG51bGwgJiYgcHJvcHMuTWV0ZXJJbmZvLk5hbWUubGVuZ3RoID4gMCAmJiBwcm9wcy5NZXRlckluZm8uTmFtZS5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdBbGlhcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlckluZm8uQWxpYXMgPT0gbnVsbCB8fCBwcm9wcy5NZXRlckluZm8uQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5TaG9ydE5hbWUgPT0gbnVsbCB8fCBwcm9wcy5NZXRlckluZm8uU2hvcnROYW1lLmxlbmd0aCA8PSA1MDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTWFrZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlckluZm8uTWFrZSAhPSBudWxsICYmIHByb3BzLk1ldGVySW5mby5NYWtlLmxlbmd0aCA+IDAgJiYgcHJvcHMuTWV0ZXJJbmZvLk1ha2UubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTW9kZWwnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTWV0ZXJJbmZvLk1vZGVsICE9IG51bGwgJiYgcHJvcHMuTWV0ZXJJbmZvLk1vZGVsLmxlbmd0aCA+IDAgJiYgcHJvcHMuTWV0ZXJJbmZvLk1vZGVsLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J0Fzc2V0S2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZU1ldGVySW5mb30gLz5cclxuICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMgYW5kIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVNZXRlckluZm99IC8+XHJcbiAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVySW5mb30gRmllbGQ9eydTaG9ydE5hbWUnfSBGZWVkYmFjaz17J1Nob3J0TmFtZSBtdXN0IGJlIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVNZXRlckluZm99IC8+XHJcbiAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVySW5mb30gRmllbGQ9eydBbGlhcyd9IEZlZWRiYWNrPXsnQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZU1ldGVySW5mb30gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J01ha2UnfSBGZWVkYmFjaz17J01ha2UgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZU1ldGVySW5mb30gLz5cclxuICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J01vZGVsJ30gRmVlZGJhY2s9eydNb2RlbCBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlTWV0ZXJJbmZvfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+VGltZSBab25lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17cHJvcHMuTWV0ZXJJbmZvID09IG51bGwgfHwgcHJvcHMuTWV0ZXJJbmZvLlRpbWVab25lID09IG51bGwgPyAnLTEnIDogcHJvcHMuTWV0ZXJJbmZvLlRpbWVab25lfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGVyOiBPcGVuWERBLk1ldGVyID0gXy5jbG9uZShwcm9wcy5NZXRlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCItMVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGVyLlRpbWVab25lID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRlci5UaW1lWm9uZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVNZXRlckluZm8obWV0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCItMVwiPk5vbmUgU2VsZWN0ZWQ8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGltZVpvbmVzICE9IG51bGwgPyB0aW1lWm9uZXMubWFwKHR6ID0+IDxvcHRpb24gdmFsdWU9e3R6LlRleHR9IGtleT17dHouVGV4dH0gZGlzYWJsZWQ9eyF0ei5FbmFibGVkfSBoaWRkZW49e3R6LkhpZGRlbn0+e3R6LkFsdFRleHQxfTwvb3B0aW9uPikgOiBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTWV0ZXI+IFJvd3M9ezN9IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J0Rlc2NyaXB0aW9uJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZU1ldGVySW5mb30gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFBhZ2UxLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XHJcbmltcG9ydCBGb3JtVGV4dEFyZWEgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtVGV4dEFyZWEnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdExvY2F0aW9ucywgU2VsZWN0TG9jYXRpb25TdGF0dXMsIEZldGNoTG9jYXRpb24gfSBmcm9tICcuLi9TdG9yZS9Mb2NhdGlvblNsaWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UyKHByb3BzOiB7IExvY2F0aW9uSW5mbzogT3BlblhEQS5Mb2NhdGlvbiwgVXBkYXRlTG9jYXRpb25JbmZvOiAocmVjb3JkOiBPcGVuWERBLkxvY2F0aW9uKSA9PiB2b2lkIH0pIHtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIGNvbnN0IGxvY2F0aW9ucyA9IHVzZVNlbGVjdG9yKFNlbGVjdExvY2F0aW9ucyk7XHJcbiAgICBjb25zdCBsU3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0TG9jYXRpb25TdGF0dXMpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGxTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBsU3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKHR6U3RhdHVzID09ICdsb2FkaW5nJykgcHJvbWlzZS5hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCBsU3RhdHVzXSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERpZmZlcmVudE1ldGVyTG9jYXRpb24obWV0ZXJMb2NhdGlvbklEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBwcm9wcy5VcGRhdGVMb2NhdGlvbkluZm8obG9jYXRpb25zLmZpbmQoKHZhbHVlLCBpbmRleCwgb2JqZWN0KSA9PiB2YWx1ZS5JRCA9PSBtZXRlckxvY2F0aW9uSUQpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuTG9jYXRpb24pKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdMb2NhdGlvbktleScpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BzLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleSA9PSBudWxsIHx8IHByb3BzLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleS5sZW5ndGggPT0gMCB8fCBwcm9wcy5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkubGVuZ3RoID4gNTApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAocHJvcHMuTG9jYXRpb25JbmZvLklEID09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRpb25zLmZpbmQobG9jcyA9PiBsb2NzLkxvY2F0aW9uS2V5LnRvTG93ZXJDYXNlKCkgPT0gcHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5LnRvTG93ZXJDYXNlKCkpID09IG51bGw7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Mb2NhdGlvbkluZm8uTmFtZSAhPSBudWxsICYmIHByb3BzLkxvY2F0aW9uSW5mby5OYW1lLmxlbmd0aCA+IDAgJiYgcHJvcHMuTG9jYXRpb25JbmZvLk5hbWUubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQWxpYXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTG9jYXRpb25JbmZvLkFsaWFzID09IG51bGwgfHwgcHJvcHMuTG9jYXRpb25JbmZvLkFsaWFzLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Nob3J0TmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Mb2NhdGlvbkluZm8uU2hvcnROYW1lID09IG51bGwgfHwgcHJvcHMuTG9jYXRpb25JbmZvLlNob3J0TmFtZS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xhdGl0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkxvY2F0aW9uSW5mby5MYXRpdHVkZSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuTG9jYXRpb25JbmZvLkxhdGl0dWRlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTG9uZ2l0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkxvY2F0aW9uSW5mby5Mb25naXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkxvY2F0aW9uSW5mby5Mb25naXR1ZGUpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBMb2NhdGlvbjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3Byb3BzLkxvY2F0aW9uSW5mby5JRCA9PSBudWxsID8gJzAnIDogcHJvcHMuTG9jYXRpb25JbmZvLklEfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCIwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RGlmZmVyZW50TWV0ZXJMb2NhdGlvbihwYXJzZUludChldnQudGFyZ2V0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25LZXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbGlhczogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG9ydE5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGF0aXR1ZGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb25naXR1ZGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIj5BZGQgTmV3PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxvY2F0aW9ucyAhPSBudWxsID8gbG9jYXRpb25zLm1hcChtbCA9PiA8b3B0aW9uIHZhbHVlPXttbC5JRH0ga2V5PXttbC5JRH0+e21sLkxvY2F0aW9uS2V5fTwvb3B0aW9uPikgOiBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17cHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nTG9jYXRpb25LZXknIExhYmVsPSdLZXknIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfSBWYWxpZD17dmFsaWR9IEZlZWRiYWNrPSdBIHVuaXF1ZSBLZXkgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJyBEaXNhYmxlZD17cHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXtwcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdOYW1lJyBTZXR0ZXI9e3Byb3BzLlVwZGF0ZUxvY2F0aW9uSW5mb30gVmFsaWQ9e3ZhbGlkfSBGZWVkYmFjaz0nTmFtZSBpcyByZXF1aXJlZCBhbmQgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJyBEaXNhYmxlZD17cHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXtwcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdTaG9ydE5hbWUnIExhYmVsPSdTaG9ydCBOYW1lJyBTZXR0ZXI9e3Byb3BzLlVwZGF0ZUxvY2F0aW9uSW5mb30gVmFsaWQ9e3ZhbGlkfSBGZWVkYmFjaz0nU2hvcnQgTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzLicgRGlzYWJsZWQ9e3Byb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17cHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nQWxpYXMnIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfVZhbGlkPXt2YWxpZH0gRmVlZGJhY2s9J0FsaWFzIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLicgRGlzYWJsZWQ9e3Byb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17cHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nTGF0aXR1ZGUnIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfSBWYWxpZD17dmFsaWR9IEZlZWRiYWNrPSdMYXRpdHVkZSBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJyBEaXNhYmxlZD17cHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXtwcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdMb25naXR1ZGUnIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfSBWYWxpZD17dmFsaWR9IEZlZWRiYWNrPSdMb25naXR1ZGUgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLicgRGlzYWJsZWQ9e3Byb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTG9jYXRpb24+IFJvd3M9ezN9IFJlY29yZD17cHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nRGVzY3JpcHRpb24nIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfSBWYWxpZD17dmFsaWR9IEZlZWRiYWNrPScnIERpc2FibGVkPXtwcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcblxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTMudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IENGR1BhcnNlciBmcm9tICcuLi8uLi8uLi9UUy9DRkdQYXJzZXInO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdE1lYXN1cmVtZW50VHlwZXMsIFNlbGVjdE1lYXN1cmVtZW50VHlwZVN0YXR1cywgRmV0Y2hNZWFzdXJlbWVudFR5cGUgfSBmcm9tICcuLi9TdG9yZS9NZWFzdXJlbWVudFR5cGVTbGljZSc7XHJcbmltcG9ydCB7IFNlbGVjdFBoYXNlU3RhdHVzLCBTZWxlY3RQaGFzZXMsIEZldGNoUGhhc2UgfSBmcm9tICcuLi9TdG9yZS9QaGFzZVNsaWNlJztcclxuaW1wb3J0IHsgdG9OdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UzKHByb3BzOiB7IE1ldGVyS2V5OiBzdHJpbmcsIENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+LCBVcGRhdGVDaGFubmVsczogKHJlY29yZDogT3BlblhEQS5DaGFubmVsW10pID0+IHZvaWQsIFVwZGF0ZUFzc2V0czogKHJlY29yZDogT3BlblhEQS5Bc3NldFtdKSA9PiB2b2lkICB9KSB7XHJcbiAgICBjb25zdCBmaWxlSW5wdXQgPSBSZWFjdC51c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcbiAgICBjb25zdCBtZWFzdXJlbWVudFR5cGVzID0gdXNlU2VsZWN0b3IoU2VsZWN0TWVhc3VyZW1lbnRUeXBlcyk7XHJcbiAgICBjb25zdCBtdFN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdE1lYXN1cmVtZW50VHlwZVN0YXR1cykgYXMgU3lzdGVtQ2VudGVyLlN0YXR1cztcclxuICAgIGNvbnN0IHBoYXNlcyA9IHVzZVNlbGVjdG9yKFNlbGVjdFBoYXNlcyk7XHJcbiAgICBjb25zdCBwaFN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdFBoYXNlU3RhdHVzKSBhcyBTeXN0ZW1DZW50ZXIuU3RhdHVzO1xyXG5cclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgICQoXCIuY3VzdG9tLWZpbGUtaW5wdXRcIikub24oXCJjaGFuZ2VcIiwgKGV2dDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmaWxlTmFtZSA9IChldnQgYXMgUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pLnRhcmdldC52YWx1ZS5zcGxpdChcIlxcXFxcIikucG9wKCk7XHJcbiAgICAgICAgICAgICQoZmlsZUlucHV0KS5zaWJsaW5ncyhcIi5jdXN0b20tZmlsZS1sYWJlbFwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLmh0bWwoZmlsZU5hbWUpO1xyXG4gICAgICAgICAgICByZWFkU2luZ2xlRmlsZSgoZXZ0IGFzIFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgJChcIi5jdXN0b20tZmlsZS1pbnB1dFwiKS5vZmYoJ2NoYW5nZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtdKVxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKG10U3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgbXRTdGF0dXMgPT09ICdjaGFuZ2VkJykge1xyXG4gICAgICAgICAgICBkaXNwYXRjaChGZXRjaE1lYXN1cmVtZW50VHlwZSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtkaXNwYXRjaCwgbXRTdGF0dXNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChwaFN0YXR1cyA9PT0gJ3VuaW50aWF0ZWQnIHx8IHBoU3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hQaGFzZSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtkaXNwYXRjaCwgcGhTdGF0dXNdKTtcclxuXHJcbiAgICBmdW5jdGlvbiByZWFkU2luZ2xlRmlsZShldnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgLy9SZXRyaWV2ZSB0aGUgZmlyc3QgKGFuZCBvbmx5ISkgRmlsZSBmcm9tIHRoZSBGaWxlTGlzdCBvYmplY3RcclxuICAgICAgICB2YXIgZiA9IGV2dC50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgICAgaWYgKGYpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICByLm9ubG9hZCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudHMgPSBlLnRhcmdldC5yZXN1bHQgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwYXJzZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGYubmFtZS5pbmRleE9mKCcuY2ZnJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlciA9IG5ldyBDRkdQYXJzZXIoY29udGVudHMsIHByb3BzLk1ldGVyS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhwYXJzZXIuQ2hhbm5lbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQXNzZXRzQ2hhbm5lbHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0ZpbGUgaXMgbm90IG9mIHR5cGUgY2ZnLiBQbGVhc2Ugb25seSB1c2UgY29tdHJhZGUgc3RhbmRhcmQgY2ZnIGZpbGVzLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHIucmVhZEFzVGV4dChmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlQ2hhbm5lbChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZShwcm9wcy5DaGFubmVscyk7XHJcbiAgICAgICAgbGV0IHJlY29yZDogT3BlblhEQS5DaGFubmVsID0gY2hhbm5lbHMuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhjaGFubmVscyk7XHJcblxyXG4gICAgICAgIGlmIChyZWNvcmQuQXNzZXQgPT0gJycpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGFzc2V0czpBcnJheTxPcGVuWERBLkFzc2V0PiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpKTtcclxuXHJcbiAgICAgICAgaWYgKGFzc2V0cyAhPSBudWxsICYmIGFzc2V0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBhc3NldCA9IGFzc2V0cy5maW5kKGEgPT4gYS5Bc3NldEtleSA9PSByZWNvcmQuQXNzZXQpXHJcbiAgICAgICAgICAgIGlmIChhc3NldCA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhbm5lbEluZGV4ID0gYXNzZXQuQ2hhbm5lbHMuZmluZEluZGV4KGMgPT4gYy5JRCA9IHJlY29yZC5JRCk7XHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsSW5kZXggPCAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBhc3NldC5DaGFubmVscy5zcGxpY2UoY2hhbm5lbEluZGV4LDEpXHJcbiAgICAgICAgICAgIHByb3BzLlVwZGF0ZUFzc2V0cyhhc3NldHMpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJBc3NldHNDaGFubmVscygpOnZvaWQge1xyXG4gICAgICAgIGxldCBhc3NldHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSk7XHJcblxyXG4gICAgICAgIGlmIChhc3NldHMgIT0gbnVsbCAmJiBhc3NldHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkLmVhY2goYXNzZXRzLCAoaW5kZXgsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhc3NldC5DaGFubmVscyA9IFtdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwcm9wcy5VcGRhdGVBc3NldHMoYXNzZXRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMCwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQU4nLCBOYW1lOiAnVkFOJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBBTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogW3sgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMSwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQk4nLCBOYW1lOiAnVkJOJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBCTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogW3sgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMiwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQ04nLCBOYW1lOiAnVkNOJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBDTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogW3sgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMywgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0N1cnJlbnQnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQU4nLCBOYW1lOiAnSUEnLCBBZGRlcjogMCwgTXVsdGlwbGllcjogMSwgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdDdXJyZW50IEEnLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IFt7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzXSB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDQsIE1ldGVyOiBwcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdDdXJyZW50JywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0JOJywgTmFtZTogJ0lCJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnQ3VycmVudCBCJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiBbeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllc10gfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiA1LCBNZXRlcjogcHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnQ3VycmVudCcsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdDTicsIE5hbWU6ICdJQycsIEFkZGVyOiAwLCBNdWx0aXBsaWVyOiAxLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ0N1cnJlbnQgQycsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogW3sgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogNiwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0N1cnJlbnQnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnTkcnLCBOYW1lOiAnSU4nLCBBZGRlcjogMCwgTXVsdGlwbGllcjogMSwgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdDdXJyZW50IE5HJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiBbeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllc10gfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUNoYW5uZWxzKGNoYW5uZWxzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJBc3NldHNDaGFubmVscygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH19PkRlZmF1bHQgU2V0dXA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIiBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN1c3RvbS1maWxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBjbGFzc05hbWU9XCJjdXN0b20tZmlsZS1pbnB1dFwiIHJlZj17ZmlsZUlucHV0fSBhY2NlcHQ9XCIuY2ZnLC5wYXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImN1c3RvbS1maWxlLWxhYmVsXCI+Q2hvb3NlIGEgY29tdHJhZGUgc3RhbmRhcmQgY2ZnIGZpbGUgaWYgYXBwbGljYWJsZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsOiBPcGVuWERBLkNoYW5uZWwgPSB7IElEOiBwcm9wcy5DaGFubmVscy5sZW5ndGgsIE1ldGVyOiBwcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0FOJywgTmFtZTogJ1ZBTicsIEFkZGVyOiAwLCBNdWx0aXBsaWVyOiAxLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ1ZvbHRhZ2UgQU4nLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IFt7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzXSB9IGFzIE9wZW5YREEuQ2hhbm5lbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBfLmNsb25lKHByb3BzLkNoYW5uZWxzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbHMucHVzaChjaGFubmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoY2hhbm5lbHMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9fT5BZGQgQ2hhbm5lbDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6ICdjYWxjKDEwMCUgLSAzNXB4KScsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNoYW5uZWw8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkRlc2M8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlBoYXNlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5BZGRlcjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+TXVsdGlwbGllcjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQ2hhbm5lbHMubWFwKChjaGFubmVsLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICc1JScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyAgdmFsdWU9e2NoYW5uZWwuU2VyaWVzWzBdLlNvdXJjZUluZGV4ZXN9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLlNlcmllc1swXS5Tb3VyY2VJbmRleGVzID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUNoYW5uZWxzKFsuLi5hcnJheV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk5hbWV9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLk5hbWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoWy4uLmFycmF5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzM1JScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5EZXNjcmlwdGlvbn0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuRGVzY3JpcHRpb24gPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoWy4uLmFycmF5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSAnZm9ybS1jb250cm9sJyAgdmFsdWU9e2NoYW5uZWwuTWVhc3VyZW1lbnRUeXBlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5NZWFzdXJlbWVudFR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoWy4uLmFycmF5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT57bWVhc3VyZW1lbnRUeXBlcy5tYXAoYSA9PiA8b3B0aW9uIGtleT17YS5JRH0gdmFsdWU9e2EuTmFtZX0+e2EuTmFtZX08L29wdGlvbj4pfTwvc2VsZWN0Pn08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57PHNlbGVjdCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuUGhhc2V9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLlBoYXNlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUNoYW5uZWxzKFsuLi5hcnJheV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e3BoYXNlcy5tYXAoYSA9PiA8b3B0aW9uIGtleT17YS5JRH0gdmFsdWU9e2EuTmFtZX0+e2EuTmFtZX08L29wdGlvbj4pfTwvc2VsZWN0Pn08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNSUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuQWRkZXJ9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFkZGVyID0gdG9OdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhbLi4uYXJyYXldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk11bHRpcGxpZXJ9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLk11bHRpcGxpZXIgPSB0b051bWJlcihldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUNoYW5uZWxzKFsuLi5hcnJheV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4gZGVsZXRlQ2hhbm5lbChpbmRleCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgPC8+XHJcbiAgICAgICAgKTtcclxuXHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgUGFnZTQudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDEvMDMvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcbmltcG9ydCBCcmVha2VyQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9CcmVha2VyJztcbmltcG9ydCBCdXNBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0J1cyc7XG5pbXBvcnQgQ2FwQmFua0F0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQ2FwQmFuayc7XG5pbXBvcnQgTGluZUF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvTGluZSc7XG5pbXBvcnQgVHJhbnNmb3JtZXJBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL1RyYW5zZm9ybWVyJztcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xuaW1wb3J0IHsgZ2V0QXNzZXRUeXBlcywgZ2V0QWxsQXNzZXRzIH0gZnJvbSAnLi4vLi4vLi4vVFMvU2VydmljZXMvQXNzZXQnO1xuaW1wb3J0IENhcEJhbmtSZWxheUF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQ2FwQmFua1JlbGF5JztcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFNlbGVjdEFzc2V0VHlwZXMsIFNlbGVjdEFzc2V0VHlwZVN0YXR1cywgRmV0Y2hBc3NldFR5cGUgfSBmcm9tICcuLi9TdG9yZS9Bc3NldFR5cGVTbGljZSc7XHJcbmltcG9ydCB7IFNlbGVjdEFzc2V0U3RhdHVzLCBGZXRjaEFzc2V0LCBTZWxlY3RBc3NldHMgfSBmcm9tICcuLi9TdG9yZS9Bc3NldFNsaWNlJztcclxuXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xuXG5pbnRlcmZhY2UgUGFnZTRQcm9wcyB7XG4gICAgQXNzZXRzOiBBcnJheTxPcGVuWERBLkJyZWFrZXIgfCBPcGVuWERBLkJ1cyB8IE9wZW5YREEuQ2FwQmFuayB8IE9wZW5YREEuTGluZSB8IE9wZW5YREEuVHJhbnNmb3JtZXIgfCBPcGVuWERBLkNhcEJhbmtSZWxheT4sXG4gICAgQ2hhbm5lbHM6IE9wZW5YREEuQ2hhbm5lbFtdLFxuICAgIEFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPixcbiAgICBVcGRhdGVDaGFubmVsczogKHJlY29yZDogT3BlblhEQS5DaGFubmVsW10pID0+IHZvaWQsXG4gICAgVXBkYXRlQXNzZXRzOiAocmVjb3JkOiBPcGVuWERBLkFzc2V0W10pID0+IHZvaWQsXG4gICAgVXBkYXRlQXNzZXRDb25uZWN0aW9uczogKHJlY29yZDogT3BlblhEQS5Bc3NldENvbm5lY3Rpb25bXSkgPT4gdm9pZCxcblxufVxuXG50eXBlIEFzc2V0VHlwZSA9IE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lciB8IE9wZW5YREEuQ2FwQmFua1JlbGF5O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYWdlNChwcm9wczogUGFnZTRQcm9wcykge1xuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcbiAgICBjb25zdCBhc3NldFR5cGVzID0gdXNlU2VsZWN0b3IoU2VsZWN0QXNzZXRUeXBlcyk7XG4gICAgY29uc3QgYXRTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RBc3NldFR5cGVTdGF0dXMpO1xuICAgIGNvbnN0IGFzc2V0cyA9IHVzZVNlbGVjdG9yKFNlbGVjdEFzc2V0cyk7XG4gICAgY29uc3QgYVN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdEFzc2V0U3RhdHVzKTtcblxuICAgIGNvbnN0IFtuZXdFZGl0QXNzZXQsIHNldE5ld0VkaXRBc3NldF0gPSBSZWFjdC51c2VTdGF0ZTxBc3NldFR5cGU+KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpKTtcbiAgICBjb25zdCBbbmV3RWRpdCwgc2V0TmV3RWRpdF0gPSBSZWFjdC51c2VTdGF0ZTwnTmV3JyB8ICdFZGl0Jz4oJ05ldycpO1xuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoYXRTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBhdFN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoQXNzZXRUeXBlKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCBhdFN0YXR1c10pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoYVN0YXR1cyA9PT0gJ3VuaW50aWF0ZWQnIHx8IGFTdGF0dXMgPT09ICdjaGFuZ2VkJykge1xyXG4gICAgICAgICAgICBkaXNwYXRjaChGZXRjaEFzc2V0KCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCBhU3RhdHVzXSk7XHJcblxuXG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQnJlYWtlcicpIHtcbiAgICAgICAgICAgIGxldCBoYW5kbGUgPSBnZXRFRE5BUG9pbnQobmV3RWRpdEFzc2V0LklEKTtcbiAgICAgICAgICAgIGhhbmRsZS5kb25lKChlZG5hUG9pbnQ6IE9wZW5YREEuRUROQVBvaW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlY29yZCA9IHsgLi4ubmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQnJlYWtlciB9O1xuICAgICAgICAgICAgICAgIGlmIChlZG5hUG9pbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZC5FRE5BUG9pbnQgPSBlZG5hUG9pbnQuUG9pbnRcbiAgICAgICAgICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KHJlY29yZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kbGUuYWJvcnQgIT09IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdMaW5lJyl7XG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gZ2V0TGluZVNlZ21lbnQobmV3RWRpdEFzc2V0LklEKTtcbiAgICAgICAgICAgIGhhbmRsZS5kb25lKChsaW5lU2VnbWVudDogT3BlblhEQS5MaW5lRGV0YWlsKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHJlY29yZCA9IF8uY2xvbmUobmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuTGluZSk7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmVTZWdtZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZWNvcmQuRGV0YWlsID0gbGluZVNlZ21lbnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZC5EZXRhaWwgPSBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3TGluZURldGFpbHMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQocmVjb3JkKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPT0gdW5kZWZpbmVkKSBoYW5kbGUuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgfSwgW25ld0VkaXRBc3NldC5Bc3NldFR5cGVdKTtcblxuICAgIGZ1bmN0aW9uIGVkaXRBc3NldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHNldE5ld0VkaXQoJ0VkaXQnKTtcbiAgICAgICAgc2V0TmV3RWRpdEFzc2V0KHByb3BzLkFzc2V0c1tpbmRleF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUFzc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGxpc3QgPSBfLmNsb25lKHByb3BzLkFzc2V0cyk7XG4gICAgICAgIGxldCByZWNvcmQ6IEFycmF5PE9wZW5YREEuQXNzZXQ+ID0gbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBsZXQgYXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ID0gXy5jbG9uZShwcm9wcy5Bc3NldENvbm5lY3Rpb25zKTtcbiAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZShwcm9wcy5DaGFubmVscyk7XG5cbiAgICAgICAgJC5lYWNoKGNoYW5uZWxzLCAoaW5kZXgsIGNoYW5uZWwpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFubmVsLkFzc2V0ID09IHJlY29yZFswXS5Bc3NldEtleSlcbiAgICAgICAgICAgICAgICBjaGFubmVsLkFzc2V0ID0gJydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGluZGV4ID0gYXNzZXRDb25uZWN0aW9ucy5maW5kSW5kZXgoYXNzZXRDb25uZWN0aW9uID0+IGFzc2V0Q29ubmVjdGlvbi5QYXJlbnQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5IHx8IGFzc2V0Q29ubmVjdGlvbi5DaGlsZCA9PSByZWNvcmRbMF0uQXNzZXRLZXkpO1xuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgYXNzZXRDb25uZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgaW5kZXggPSBhc3NldENvbm5lY3Rpb25zLmZpbmRJbmRleChhc3NldENvbm5lY3Rpb24gPT4gYXNzZXRDb25uZWN0aW9uLlBhcmVudCA9PSByZWNvcmRbMF0uQXNzZXRLZXkgfHwgYXNzZXRDb25uZWN0aW9uLkNoaWxkID09IHJlY29yZFswXS5Bc3NldEtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wcy5VcGRhdGVBc3NldHMobGlzdCk7XG4gICAgICAgIHByb3BzLlVwZGF0ZUNoYW5uZWxzKGNoYW5uZWxzKTtcbiAgICAgICAgcHJvcHMuVXBkYXRlQXNzZXRDb25uZWN0aW9ucyhhc3NldENvbm5lY3Rpb25zKTtcblxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gY2hhbmdlQXNzZXRUeXBlKHR5cGU6ICdMaW5lJyB8ICdMaW5lU2VnbWVudCcgfCAnQnJlYWtlcicgfCAnQnVzJyB8ICdDYXBhY2l0b3JCYW5rJyB8ICdUcmFuc2Zvcm1lcicgfCAnQ2FwYWNpdG9yQmFua1JlbGF5Jyk6IHZvaWQge1xuICAgICAgICBsZXQgYXNzZXQgPSB7XG4gICAgICAgICAgICBJRDogbmV3RWRpdEFzc2V0LklELFxuICAgICAgICAgICAgQXNzZXRLZXk6IG5ld0VkaXRBc3NldC5Bc3NldEtleSxcbiAgICAgICAgICAgIEFzc2V0TmFtZTogbmV3RWRpdEFzc2V0LkFzc2V0TmFtZSxcbiAgICAgICAgICAgIEFzc2V0VHlwZTogdHlwZSxcbiAgICAgICAgICAgIERlc2NyaXB0aW9uOiBuZXdFZGl0QXNzZXQuRGVzY3JpcHRpb24sXG4gICAgICAgICAgICBWb2x0YWdlS1Y6IG5ld0VkaXRBc3NldC5Wb2x0YWdlS1YsXG4gICAgICAgICAgICBDaGFubmVsczogbmV3RWRpdEFzc2V0LkNoYW5uZWxzLFxuICAgICAgICAgICAgU3BhcmU6IG5ld0VkaXRBc3NldC5TcGFyZVxuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXQgPSBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXRBdHRyaWJ1dGVzKGFzc2V0LCB0eXBlKTtcbiAgICAgICAgc2V0TmV3RWRpdEFzc2V0KCBhc3NldCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGlmZmVyZW50QXNzZXQoYXNzZXRJRDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBhc3NldFR5cGVJRCA9IGFzc2V0cy5maW5kKGEgPT4gYS5JRCA9PSBhc3NldElEKVsnQXNzZXRUeXBlSUQnXTsgXG4gICAgICAgIGxldCBhc3NldFR5cGUgPSBhc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gYXNzZXRUeXBlSUQpXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS8ke2Fzc2V0VHlwZS5OYW1lfS9PbmUvJHthc3NldElEfWAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KS5kb25lKChhc3NldDogT3BlblhEQS5Bc3NldCkgPT4ge1xuICAgICAgICAgICAgYXNzZXQuQXNzZXRUeXBlID0gYXNzZXRUeXBlLk5hbWU7XG4gICAgICAgICAgICBhc3NldC5DaGFubmVscyA9IFtdO1xuICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KGFzc2V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TGluZVNlZ21lbnQobGluZUlEOiBudW1iZXIpOiBKUXVlcnkuanFYSFI8T3BlblhEQS5MaW5lU2VnbWVudD4ge1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmUvJHtsaW5lSUR9L0xpbmVTZWdtZW50YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVETkFQb2ludChicmVha2VySUQ6IG51bWJlcik6IEpRdWVyeS5qcVhIUjxPcGVuWERBLkVETkFQb2ludD4ge1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0JyZWFrZXIvJHticmVha2VySUR9L0VETkFQb2ludGAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2FibGVNb2RhbFNhdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAkKCcuaXMtaW52YWxpZCcpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd0F0dHJpYnV0ZXMoKTogSlNYLkVsZW1lbnQge1xuICAgICAgICBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQnJlYWtlcicpXG4gICAgICAgICAgICByZXR1cm4gPEJyZWFrZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5CcmVha2VyfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcbiAgICAgICAgZWxzZSBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQnVzJylcbiAgICAgICAgICAgIHJldHVybiA8QnVzQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0fSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fS8+O1xuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdDYXBhY2l0b3JCYW5rJylcbiAgICAgICAgICAgIHJldHVybiA8Q2FwQmFua0F0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLkNhcEJhbmt9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdDYXBhY2l0b3JCYW5rUmVsYXknKVxuICAgICAgICAgICAgcmV0dXJuIDxDYXBCYW5rUmVsYXlBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rUmVsYXl9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdMaW5lJylcbiAgICAgICAgICAgIHJldHVybiA8TGluZUF0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLkxpbmV9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdUcmFuc2Zvcm1lcicpXG4gICAgICAgICAgICByZXR1cm4gPFRyYW5zZm9ybWVyQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuVHJhbnNmb3JtZXJ9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xuICAgIH1cblxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17e21hcmdpbjogLTIwfX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI4NSwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyODUsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAwLCBtYXJnaW46IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5DaGFubmVscy5tYXAoKGNoYW5uZWwsIGluZGV4KSA9PiA8bGkgc3R5bGU9e3t0ZXh0RGVjb3JhdGlvbjogKGNoYW5uZWwuQXNzZXQubGVuZ3RoID4gMCA/ICdsaW5lLXRocm91Z2gnIDogbnVsbCl9fSBrZXk9e2luZGV4fT57Y2hhbm5lbC5OYW1lICsgJyAtICcgKyBjaGFubmVsLkRlc2NyaXB0aW9ufTwvbGk+KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIHN0eWxlPXt7cGFkZGluZzogMjB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAzOCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI2Fzc2V0TW9kYWwnIG9uQ2xpY2s9eygpID0+IHNldE5ld0VkaXQoJ05ldycpfT5BZGQgQXNzZXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzUwLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+U3RhdHVzPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+S2V5PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5rVjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNoYW5uZWxzPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5Bc3NldHMubWFwKChhc3NldDogT3BlblhEQS5Bc3NldCwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57KGFzc2V0LklEID09IDAgPyAnTmV3JyA6ICdFeGlzdGluZycpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT57YXNzZXQuQXNzZXRLZXl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICczMCUnIH19Pnthc3NldC5Bc3NldE5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pnthc3NldC5Bc3NldFR5cGV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pnthc3NldC5Wb2x0YWdlS1Z9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pnthc3NldC5DaGFubmVscy5sZW5ndGh9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PScjYXNzZXRNb2RhbCcgb25DbGljaz17KGUpID0+IGVkaXRBc3NldChpbmRleCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBlbmNpbFwiPjwvaT48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiBkZWxldGVBc3NldChpbmRleCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cImFzc2V0TW9kYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiBzdHlsZT17e21heFdpZHRoOiAnMTAwJScsIHdpZHRoOiAnOTAlJ319PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cIm1vZGFsLXRpdGxlXCI+e25ld0VkaXQgPT0gJ05ldycgPyAnQWRkIE5ldyBBc3NldCB0byBNZXRlcic6ICdFZGl0ICcgKyBuZXdFZGl0QXNzZXQuQXNzZXRLZXkgKyAnIGZvciBNZXRlcicgfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBc3NldEF0dHJpYnV0ZXMgQXNzZXQ9e25ld0VkaXRBc3NldH0gTmV3RWRpdD17bmV3RWRpdH0gQXNzZXRUeXBlcz17YXNzZXRUeXBlc30gQWxsQXNzZXRzPXthc3NldHN9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IEdldERpZmZlcmVudEFzc2V0PXtnZXREaWZmZXJlbnRBc3NldH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNob3dBdHRyaWJ1dGVzKCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Bc3NvY2lhdGVkIENoYW5uZWxzPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG11bHRpcGxlIHN0eWxlPXt7IGhlaWdodDogJzEwMCUnLCB3aWR0aDogJzEwMCUnIH19IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldCAgPSBfLmNsb25lKG5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkFzc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQuQ2hhbm5lbHMgPSAoJChldnQudGFyZ2V0KS52YWwoKSBhcyBBcnJheTxzdHJpbmc+KS5tYXAoYSA9PiBwcm9wcy5DaGFubmVsc1twYXJzZUludChhKV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0VkaXRBc3NldChhc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gdmFsdWU9e25ld0VkaXRBc3NldC5DaGFubmVscy5tYXAoYSA9PiBhLklELnRvU3RyaW5nKCkpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQ2hhbm5lbHMubWFwKChjaGFubmVsLCBpbmRleCkgPT4gPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9IGhpZGRlbj17IGNoYW5uZWwuQXNzZXQgIT0gbmV3RWRpdEFzc2V0LkFzc2V0S2V5ICYmIGNoYW5uZWwuQXNzZXQubGVuZ3RoPiAwfT57Y2hhbm5lbC5OYW1lICsgJyAtICcgKyBjaGFubmVsLkRlc2NyaXB0aW9ufTwvb3B0aW9uPilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZDogT3BlblhEQS5Bc3NldCA9IF8uY2xvbmUobmV3RWRpdEFzc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gXy5jbG9uZShwcm9wcy5Bc3NldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZShwcm9wcy5DaGFubmVscyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChjaGFubmVscywgKGluZGV4LCBjaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5uZWwuQXNzZXQgPT0gcmVjb3JkLkFzc2V0S2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFzc2V0ID0gJydcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmQuQ2hhbm5lbHMuZmluZEluZGV4KGMgPT4gYy5JRCA9PSBjaGFubmVsLklEKSA+PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFzc2V0ID0gcmVjb3JkLkFzc2V0S2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChyZWNvcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoY2hhbm5lbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQXNzZXRzKGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gaGlkZGVuPXtuZXdFZGl0ICE9ICdOZXcnfT5TYXZlPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkOiBPcGVuWERBLkFzc2V0ID0gXy5jbG9uZShuZXdFZGl0QXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSBfLmNsb25lKHByb3BzLkFzc2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBfLmNsb25lKHByb3BzLkNoYW5uZWxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gbGlzdC5maW5kSW5kZXgociA9PiByLkFzc2V0S2V5ID09IHJlY29yZC5Bc3NldEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0W2ldID0gcmVjb3JkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGNoYW5uZWxzLCAoaW5kZXgsIGNoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbm5lbC5Bc3NldCA9PSByZWNvcmQuQXNzZXRLZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSAnJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC5DaGFubmVscy5maW5kSW5kZXgoYyA9PiBjLklEID09IGNoYW5uZWwuSUQpID49IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSByZWNvcmQuQXNzZXRLZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhjaGFubmVscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVBc3NldHMobGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBoaWRkZW49e25ld0VkaXQgIT0gJ0VkaXQnfT5TYXZlPC9idXR0b24+XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvPlxuICAgICAgICApO1xuXG59XG5cbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlNS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTAvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBTZWxlY3RBc3NldENvbm5lY3Rpb25UeXBlcywgU2VsZWN0QXNzZXRDb25uZWN0aW9uVHlwZVN0YXR1cywgRmV0Y2hBc3NldENvbm5lY3Rpb25UeXBlIH0gZnJvbSAnLi4vU3RvcmUvQXNzZXRDb25uZWN0aW9uVHlwZVNsaWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2U1KHByb3BzOiB7IEFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4sIEFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiwgVXBkYXRlQXNzZXRDb25uZWN0aW9uczogKHJlY29yZDogT3BlblhEQS5Bc3NldENvbm5lY3Rpb25bXSkgPT4gdm9pZCB9KSB7XHJcbiAgICBjb25zdCBzZWxlY3RBc3NldCA9IFJlYWN0LnVzZVJlZihudWxsKTtcclxuICAgIGNvbnN0IHNlbGVjdFR5cGUgPSBSZWFjdC51c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcbiAgICBjb25zdCBhc3NldENvbm5lY3Rpb25UeXBlcyA9IHVzZVNlbGVjdG9yKFNlbGVjdEFzc2V0Q29ubmVjdGlvblR5cGVzKTtcclxuICAgIGNvbnN0IGFjdFN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdEFzc2V0Q29ubmVjdGlvblR5cGVTdGF0dXMpO1xyXG5cclxuICAgIGNvbnN0IFthc3NldEluZGV4LCBzZXRBc3NldEluZGV4XSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oMCk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoYWN0U3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgYWN0U3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBkaXNwYXRjaChGZXRjaEFzc2V0Q29ubmVjdGlvblR5cGUoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL2lmICh0elN0YXR1cyA9PSAnbG9hZGluZycpIHByb21pc2UuYWJvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtkaXNwYXRjaCwgYWN0U3RhdHVzXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICAvLyBNYWtlIHN1cmUgY3VycmVudFN0ZXAgaXMgc2V0IHRvIHNvbWV0aGluZyByZWFzb25hYmxlXHJcbiAgICAgICAgaWYgKGFzc2V0SW5kZXggPj0gcHJvcHMuQXNzZXRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgc2V0QXNzZXRJbmRleCggcHJvcHMuQXNzZXRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEFzc2V0SW5kZXgoYXNzZXRJbmRleCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmV2KCkge1xyXG4gICAgICAgIGlmIChhc3NldEluZGV4IDw9IDApIHtcclxuICAgICAgICAgICAgc2V0QXNzZXRJbmRleCgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRBc3NldEluZGV4KGFzc2V0SW5kZXggLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlQXNzZXRDb25uZWN0aW9uKGFjOiBPcGVuWERBLkFzc2V0Q29ubmVjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0OiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbj4gPSBfLmNsb25lKHByb3BzLkFzc2V0Q29ubmVjdGlvbnMpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IGxpc3QuZmluZEluZGV4KGEgPT4gYSA9PSBhYyk7XHJcbiAgICAgICAgbGV0IHJlY29yZDogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ID0gbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHByb3BzLlVwZGF0ZUFzc2V0Q29ubmVjdGlvbnMobGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGN1cnJlbnRBc3NldCA9IHByb3BzLkFzc2V0c1thc3NldEluZGV4XVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7IG1hcmdpbjogLTIwIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI4NSwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyODUsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAwLCBtYXJnaW46IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkFzc2V0cy5tYXAoKGFzc2V0LCBpbmRleCkgPT4gPGxpIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAoaW5kZXggPD0gYXNzZXRJbmRleCA/ICdsaW5lLXRocm91Z2gnIDogbnVsbCkgfX0ga2V5PXtpbmRleH0+e2Fzc2V0LkFzc2V0S2V5fTwvbGk+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiBzdHlsZT17eyBwYWRkaW5nOiAwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI25ld0Nvbm5lY3Rpb24nIGRpc2FibGVkPXtwcm9wcy5Bc3NldHMubGVuZ3RoIDw9IDF9PkFkZCBDb25uZWN0aW9uPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJyB9fT57Y3VycmVudEFzc2V0LkFzc2V0S2V5fTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiIHN0eWxlPXt7b3ZlcmZsb3dZOidzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQxNX19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+QXNzZXQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNvbm5lY3Rpb248L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkFzc2V0Q29ubmVjdGlvbnMuZmlsdGVyKCBhYyA9PiBhYy5QYXJlbnQgPT0gY3VycmVudEFzc2V0LkFzc2V0S2V5ICB8fCBhYy5DaGlsZCA9PSBjdXJyZW50QXNzZXQuQXNzZXRLZXkpLm1hcCgoYWM6IE9wZW5YREEuQXNzZXRDb25uZWN0aW9uLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvbkFzc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhYy5QYXJlbnQgPT0gY3VycmVudEFzc2V0LkFzc2V0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25Bc3NldCA9IHByb3BzLkFzc2V0cy5maW5kKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5ID09IGFjLkNoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uQXNzZXQgPSBwcm9wcy5Bc3NldHMuZmluZChhc3NldCA9PiBhc3NldC5Bc3NldEtleSA9PSBhYy5QYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvblR5cGUgPSBhc3NldENvbm5lY3Rpb25UeXBlcy5maW5kKGFjdCA9PiBhY3QuSUQgPT0gYWMuQXNzZXRSZWxhdGlvbnNoaXBUeXBlSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+e2Nvbm5lY3Rpb25Bc3NldC5Bc3NldEtleX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT57Y29ubmVjdGlvbkFzc2V0LkFzc2V0VHlwZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNTAlJyB9fT57Y29ubmVjdGlvblR5cGUgIT0gdW5kZWZpbmVkID8gY29ubmVjdGlvblR5cGUuTmFtZSA6ICcnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiBkZWxldGVBc3NldENvbm5lY3Rpb24oYWMpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLWxlZnRcIiBvbkNsaWNrPXtwcmV2fSBoaWRkZW49e2ZhbHNlfSBkaXNhYmxlZD17YXNzZXRJbmRleCA8IDF9PlByZXY8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXtuZXh0fSBkaXNhYmxlZD17YXNzZXRJbmRleCA9PSBwcm9wcy5Bc3NldHMubGVuZ3RoIC0gMX0+TmV4dDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cIm5ld0Nvbm5lY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj5BZGQgYSBDb25uZWN0aW9uIHRvIHtjdXJyZW50QXNzZXQuQXNzZXRLZXl9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5TZWxlY3QgQ29ubmVjdGluZyBBc3NldDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCByZWY9eyBzZWxlY3RBc3NldH0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQXNzZXRzLmZpbHRlcihhc3NldCA9PiBhc3NldC5Bc3NldEtleSAhPSBjdXJyZW50QXNzZXQuQXNzZXRLZXkpLm1hcCgoYXNzZXQsIGluZGV4KSA9PiA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXthc3NldC5Bc3NldEtleX0gPnthc3NldC5Bc3NldEtleX08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBDb25uZWN0aW9uIFR5cGU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgcmVmPXtzZWxlY3RUeXBlfSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldENvbm5lY3Rpb25UeXBlcy5tYXAoKGFjdCwgaW5kZXgpID0+IDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2FjdC5JRH0gPnthY3QuTmFtZX08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRDb25uZWN0aW9uID0gJChzZWxlY3RBc3NldC5jdXJyZW50KS52YWwoKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gcGFyc2VJbnQoJChzZWxlY3RUeXBlLmN1cnJlbnQpLnZhbCgpIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiA9IF8uY2xvbmUocHJvcHMuQXNzZXRDb25uZWN0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRDb25uZWN0aW9ucy5wdXNoKHsgSUQ6IDAsIEFzc2V0UmVsYXRpb25zaGlwVHlwZUlEOiBjb25uZWN0aW9uVHlwZSwgUGFyZW50OiBjdXJyZW50QXNzZXQuQXNzZXRLZXksIENoaWxkOiBjaGlsZENvbm5lY3Rpb24gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQXNzZXRDb25uZWN0aW9ucyhhc3NldENvbm5lY3Rpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19ID5TYXZlPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG5cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==