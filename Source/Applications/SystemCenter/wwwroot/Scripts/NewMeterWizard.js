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
        this.Analogs = data.slice(2, analogCounts + 2).map(function (a, index) { return { ID: index, Meter: meterKey, Asset: '', MeasurementType: _this.parseType(a[4]), MeasurementCharacteristic: 'Instantaneous', Phase: _this.parsePhase(a[2]), Name: a[1], SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: a[3], Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: a[0] } }; });
        this.Digitals = data.slice(2 + analogCounts, 2 + analogCounts + digitalCounts).map(function (a, index) { return { ID: analogCounts + index, Meter: meterKey, Asset: '', MeasurementType: 'Digital', MeasurementCharacteristic: 'Instantaneous', Phase: _this.parsePhase(a[2]), Name: a[1], SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: a[3], Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: a[0] } }; });
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
                            { ID: 0, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                            { ID: 1, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'VBN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage BN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                            { ID: 2, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'VCN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage CN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                            { ID: 3, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'IA', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current A', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                            { ID: 4, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'IB', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current B', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                            { ID: 5, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'IC', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current C', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                            { ID: 6, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'NG', Name: 'IN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current NG', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
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
                        var channel = { ID: props.Channels.length, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } };
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
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, props.Channels.map(function (channel, index, array) {
                    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Series.SourceIndexes, onChange: function (event) {
                                    channel.Series.SourceIndexes = event.target.value;
                                    props.UpdateChannels(array);
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Name, onChange: function (event) {
                                    channel.Name = event.target.value;
                                    props.UpdateChannels(array);
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '45%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Description, onChange: function (event) {
                                    channel.Description = event.target.value;
                                    props.UpdateChannels(array);
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.MeasurementType, onChange: function (event) {
                                channel.MeasurementType = event.target.value;
                                props.UpdateChannels(array);
                            } }, measurementTypes.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.Phase, onChange: function (event) {
                                channel.Phase = event.target.value;
                                props.UpdateChannels(array);
                            } }, phases.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9DRkdQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rUmVsYXkudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvTmV3TWV0ZXJXaXphcmQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTEudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTIudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTMudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBLHdHQUF3RztBQUN4Ryx3QkFBd0I7QUFDeEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3RztBQUl4RztJQUlJLG1CQUFZLFFBQWdCLEVBQUUsUUFBZ0I7UUFBOUMsaUJBUUM7UUFQRyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFB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QUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDL1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDL1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDN1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDN1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDN1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxF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LENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0NBQ3ZGLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dDQUNqSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs0QkFDbkQsQ0FBQyxXQUFnQjt3QkFFakIsZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsZ0JBQWdCLGtCQUFjLE9BQU8sWUFBZSxDQUNsRixDQUVKLENBQ0osQ0FFSixDQUNQLENBQ04sQ0FBQztBQUVOLENBQUMiLCJmaWxlIjoiTmV3TWV0ZXJXaXphcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQ0ZHUGFyc2VyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gXCIuLi9UU1gvU3lzdGVtQ2VudGVyL2dsb2JhbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ0ZHUGFyc2VyIHtcclxuICAgIEFuYWxvZ3M6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD47XHJcbiAgICBEaWdpdGFsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPjtcclxuICAgIENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+O1xyXG4gICAgY29uc3RydWN0b3IoY29udGVudHM6IHN0cmluZywgbWV0ZXJLZXk6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkYXRhID0gY29udGVudHMuc3BsaXQoJ1xcbicpLm1hcChhID0+IGEuc3BsaXQoJywnKSk7XHJcbiAgICAgICAgbGV0IGFuYWxvZ0NvdW50cyA9IHBhcnNlSW50KGRhdGFbMV1bMV0uc2xpY2UoMCwgZGF0YVsxXVsxXS5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgbGV0IGRpZ2l0YWxDb3VudHMgPSBwYXJzZUludChkYXRhWzFdWzJdLnNsaWNlKDAsIGRhdGFbMV1bMl0ubGVuZ3RoIC0gMSkpO1xyXG5cclxuICAgICAgICB0aGlzLkFuYWxvZ3MgPSBkYXRhLnNsaWNlKDIsIGFuYWxvZ0NvdW50cyArIDIpLm1hcCgoYTogQXJyYXk8c3RyaW5nPiwgaW5kZXgpID0+IHsgcmV0dXJuIHsgSUQ6IGluZGV4LCBNZXRlcjogbWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiB0aGlzLnBhcnNlVHlwZShhWzRdKSwgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogdGhpcy5wYXJzZVBoYXNlKGFbMl0pLCBOYW1lOiBhWzFdLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogYVszXSwgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiBhWzBdIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwgfSk7XHJcbiAgICAgICAgdGhpcy5EaWdpdGFscyA9IGRhdGEuc2xpY2UoMiArIGFuYWxvZ0NvdW50cywgMiArIGFuYWxvZ0NvdW50cyArIGRpZ2l0YWxDb3VudHMpLm1hcCgoYTogQXJyYXk8c3RyaW5nPiwgaW5kZXgpID0+IHsgcmV0dXJuIHsgSUQ6IGFuYWxvZ0NvdW50cytpbmRleCwgTWV0ZXI6IG1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0RpZ2l0YWwnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiB0aGlzLnBhcnNlUGhhc2UoYVsyXSksIE5hbWU6IGFbMV0sIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiBhWzNdLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6IGFbMF0gfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCB9KVxyXG4gICAgICAgIHRoaXMuQ2hhbm5lbHMgPSB0aGlzLkFuYWxvZ3MuY29uY2F0KHRoaXMuRGlnaXRhbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlUGhhc2UodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDAgJiYgdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdBQic7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMCAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gJ0JDJztcclxuICAgICAgICBlbHNlIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ0EnO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQU4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQk4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYycpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ04nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignbicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnTkcnO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuICdOb25lJztcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZVR5cGUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnVm9sdGFnZSc7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJ0N1cnJlbnQnO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBDYXBCYW5rUmVsYXkudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDgvMTIvMjAyMCAtIEMuIExhY2tuZXJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi9Bc3NldCc7XG5cbmZ1bmN0aW9uIENhcEJhbmtSZWxheUF0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkNhcEJhbmtSZWxheSwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQ2FwQmFua1JlbGF5KSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkNhcEJhbmtSZWxheSkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpZWxkID09ICdPblZvbHRhZ2VUaHJlc2hob2xkJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiA8PlxuICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFua1JlbGF5PiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J09uVm9sdGFnZVRocmVzaGhvbGQnfSBMYWJlbD17J1JlbGF5IE9uIFZvbHRhZ2UgVGhyZXNoaG9sZCAocHUpJ30gRmVlZGJhY2s9eydSZWxheSBPbiBWb2x0YWdlIFRocmVzaGhvbGQgKHB1KSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICA8Lz47XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FwQmFua1JlbGF5QXR0cmlidXRlczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTmV3TWV0ZXJXaXphcmQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgU2VsZWN0TWV0ZXJLZXlzTG93ZXJDYXNlLCBTZWxlY3RNZXRlclN0YXR1cywgRmV0Y2hNZXRlciB9IGZyb20gJy4uL1N0b3JlL01ldGVyU2xpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3RMb2NhdGlvbktleXNMb3dlckNhc2UsIFNlbGVjdExvY2F0aW9uU3RhdHVzLCBGZXRjaExvY2F0aW9uIH0gZnJvbSAnLi4vU3RvcmUvTG9jYXRpb25TbGljZSc7XHJcblxyXG5pbXBvcnQgUGFnZTEgZnJvbSAnLi9QYWdlMSc7XHJcbmltcG9ydCBQYWdlMiBmcm9tICcuL1BhZ2UyJztcclxuaW1wb3J0IFBhZ2UzIGZyb20gJy4vUGFnZTMnO1xyXG5pbXBvcnQgUGFnZTQgZnJvbSAnLi9QYWdlNCc7XHJcbmltcG9ydCBQYWdlNSBmcm9tICcuL1BhZ2U1JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXNzZXRMaXN0cyB7XHJcbiAgICBCcmVha2VyczogQXJyYXk8T3BlblhEQS5CcmVha2VyPixcclxuICAgIEJ1c2VzOiBBcnJheTxPcGVuWERBLkJyZWFrZXI+LFxyXG4gICAgQ2FwQmFua3M6IEFycmF5PE9wZW5YREEuQ2FwQmFuaz4sXHJcbiAgICBMaW5lczogQXJyYXk8T3BlblhEQS5MaW5lPixcclxuICAgIFRyYW5zZm9ybWVyczogQXJyYXk8T3BlblhEQS5UcmFuc2Zvcm1lcj5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmV3TWV0ZXJXaXphcmQocHJvcHM6IHt9KSB7XHJcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcblxyXG4gICAgY29uc3QgbWV0ZXJLZXlzID0gdXNlU2VsZWN0b3IoU2VsZWN0TWV0ZXJLZXlzTG93ZXJDYXNlKTtcclxuICAgIGNvbnN0IG1TdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RNZXRlclN0YXR1cyk7XHJcbiAgICBjb25zdCBsb2NhdGlvbktleXMgPSB1c2VTZWxlY3RvcihTZWxlY3RMb2NhdGlvbktleXNMb3dlckNhc2UpO1xyXG4gICAgY29uc3QgbFN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdExvY2F0aW9uU3RhdHVzKTtcclxuXHJcbiAgICBjb25zdCBbY3VycmVudFN0ZXAsIHNldEN1cnJlbnRTdGVwXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oZ2V0Q3VycmVudFN0ZXAoKSk7XHJcbiAgICBjb25zdCBbbWV0ZXJJbmZvLCBzZXRNZXRlckluZm9dID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5NZXRlcj4oZ2V0TWV0ZXJJbmZvKCkpO1xyXG4gICAgY29uc3QgW2xvY2F0aW9uSW5mbywgc2V0TG9jYXRpb25JbmZvXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuTG9jYXRpb24+KGdldExvY2F0aW9uSW5mbygpKTtcclxuICAgIGNvbnN0IFtjaGFubmVscywgc2V0Q2hhbm5lbHNdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5DaGFubmVsW10+KGdldENoYW5uZWxzKCkpO1xyXG4gICAgY29uc3QgW2Fzc2V0cywgc2V0QXNzZXRzXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXRbXT4oZ2V0QXNzZXRzKCkpO1xyXG4gICAgY29uc3QgW2Fzc2V0Q29ubmVjdGlvbnMsIHNldEFzc2V0Q29ubmVjdGlvbnNdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldENvbm5lY3Rpb25bXT4oZ2V0QXNzZXRDb25uZWN0aW9ucygpKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChtU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgbVN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoTWV0ZXIoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIG1TdGF0dXNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChsU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgbFN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoTG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIGxTdGF0dXNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcsIGN1cnJlbnRTdGVwLnRvU3RyaW5nKCkpXHJcbiAgICB9LCBbY3VycmVudFN0ZXBdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJywgSlNPTi5zdHJpbmdpZnkobWV0ZXJJbmZvKSk7XHJcbiAgICB9LCBbbWV0ZXJJbmZvXSk7XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nLCBKU09OLnN0cmluZ2lmeShsb2NhdGlvbkluZm8pKTtcclxuICAgIH0sIFsgbG9jYXRpb25JbmZvXSk7XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DaGFubmVscycsIEpTT04uc3RyaW5naWZ5KGNoYW5uZWxzKSk7XHJcbiAgICB9LCBbY2hhbm5lbHNdKTtcclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycsIEpTT04uc3RyaW5naWZ5KGFzc2V0cykpO1xyXG4gICAgfSwgW2Fzc2V0c10pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycsIEpTT04uc3RyaW5naWZ5KGFzc2V0Q29ubmVjdGlvbnMpKTtcclxuICAgIH0sIFsgYXNzZXRDb25uZWN0aW9uc10pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRTdGVwKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gMVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNZXRlckluZm8oKTogT3BlblhEQS5NZXRlciB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlckluZm8nKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgICAgIEFzc2V0S2V5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIFNob3J0TmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIEFsaWFzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTWFrZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIE1vZGVsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgVGltZVpvbmU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uSUQ6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldExvY2F0aW9uSW5mbygpOiBPcGVuWERBLkxvY2F0aW9uIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIElEOiAwLFxyXG4gICAgICAgICAgICAgICAgTG9jYXRpb25LZXk6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBOYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgQWxpYXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBTaG9ydE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBMYXRpdHVkZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIExvbmdpdHVkZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q2hhbm5lbHMoKTogQXJyYXk8T3BlblhEQS5DaGFubmVsPiB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkNoYW5uZWxzJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0QXNzZXRzKCk6IEFycmF5PE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lcj5cclxuICAgIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFzc2V0Q29ubmVjdGlvbnMoKTogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+IHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTmV3TWV0ZXIoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQsIE1vdXNlRXZlbnQ+KTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvTmV3YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBNZXRlckluZm86IG1ldGVySW5mbyxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uSW5mbzogbG9jYXRpb25JbmZvLFxyXG4gICAgICAgICAgICAgICAgQ2hhbm5lbHM6IGNoYW5uZWxzLFxyXG4gICAgICAgICAgICAgICAgQXNzZXRzOiBhc3NldHMsXHJcbiAgICAgICAgICAgICAgICBBc3NldENvbm5lY3Rpb25zOiBhc3NldENvbm5lY3Rpb25zXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9TWV0ZXJzJztcclxuICAgICAgICB9KS5mYWlsKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9TWV0ZXJzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIGN1cnJlbnRTdGVwIGlzIHNldCB0byBzb21ldGhpbmcgcmVhc29uYWJsZVxyXG4gICAgICAgIGlmIChjdXJyZW50U3RlcCA+PSA0KSB7XHJcbiAgICAgICAgICAgc2V0Q3VycmVudFN0ZXAoNSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudFN0ZXAoY3VycmVudFN0ZXAgKyAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZXYoKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwIDw9IDEpIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudFN0ZXAoMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0Q3VycmVudFN0ZXAoY3VycmVudFN0ZXAgLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcsIGN1cnJlbnRTdGVwLnRvU3RyaW5nKCkpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICBjbGVhckxvY2FsU3RvcmFnZSgpO1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIHNldE1ldGVySW5mbyhnZXRNZXRlckluZm8oKSk7XHJcbiAgICAgICAgc2V0TG9jYXRpb25JbmZvKGdldExvY2F0aW9uSW5mbygpKTtcclxuICAgICAgICBzZXRDaGFubmVscyhnZXRDaGFubmVscygpKTtcclxuICAgICAgICBzZXRDdXJyZW50U3RlcChnZXRDdXJyZW50U3RlcCgpKTtcclxuICAgICAgICBzZXRBc3NldHMoZ2V0QXNzZXRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycpXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkNoYW5uZWxzJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJylcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRIZWFkZXIoKTogc3RyaW5nIHtcclxuICAgICAgICBpZihjdXJyZW50U3RlcCA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDE6IEdlbmVyYWwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG5ldyBtZXRlclwiXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gMilcclxuICAgICAgICAgICAgcmV0dXJuIFwiU3RlcCAyOiBTdWJzdGF0aW9uIGluZm9ybWF0aW9uIGZvciB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDM6IFBvcHVsYXRlIGNoYW5uZWxzIGZvciB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSA0KVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDQ6IFBvcHVsYXRlIGFzc2V0cyBtb25pdG9yZWQgYnkgdGhlIG5ldyBtZXRlclwiXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gNSlcclxuICAgICAgICAgICAgcmV0dXJuIFwiU3RlcCA1OiBBZGQgY29ubmVjdGlvbiBiZXR3ZWVuIHRoZSBhc3NldHMgdGhhdCBhcmUgbW9uaXRvcmVkIGJ5IHRoZSBuZXcgbWV0ZXJcIlxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQYWdlKCkge1xyXG4gICAgICAgIGlmIChjdXJyZW50U3RlcCA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UxIE1ldGVySW5mbz17bWV0ZXJJbmZvfSBVcGRhdGVNZXRlckluZm89e3NldE1ldGVySW5mb30gLz5cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAyKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UyIExvY2F0aW9uSW5mbz17bG9jYXRpb25JbmZvfSBVcGRhdGVMb2NhdGlvbkluZm89e3NldExvY2F0aW9uSW5mb30gLz5cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UzIE1ldGVyS2V5PXttZXRlckluZm8uQXNzZXRLZXl9IENoYW5uZWxzPXtjaGFubmVsc30gVXBkYXRlQ2hhbm5lbHM9e3NldENoYW5uZWxzfSBVcGRhdGVBc3NldHM9e3NldEFzc2V0c30gLz5cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSA0KVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2U0IEFzc2V0Q29ubmVjdGlvbnM9e2Fzc2V0Q29ubmVjdGlvbnN9IENoYW5uZWxzPXtjaGFubmVsc30gQXNzZXRzPXthc3NldHN9IFVwZGF0ZUNoYW5uZWxzPXtzZXRDaGFubmVsc30gVXBkYXRlQXNzZXRzPXtzZXRBc3NldHN9IFVwZGF0ZUFzc2V0Q29ubmVjdGlvbnM9e3NldEFzc2V0Q29ubmVjdGlvbnN9IC8+XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gNSlcclxuICAgICAgICAgICAgcmV0dXJuIDxQYWdlNSBBc3NldHM9e2Fzc2V0c30gQXNzZXRDb25uZWN0aW9ucz17YXNzZXRDb25uZWN0aW9uc30gVXBkYXRlQXNzZXRDb25uZWN0aW9ucz17c2V0QXNzZXRDb25uZWN0aW9uc30gLz5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlzYWJsZU5leHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIGFzc2V0S2V5OiBib29sZWFuID0gbWV0ZXJJbmZvLkFzc2V0S2V5ID09IG51bGwgfHwgbWV0ZXJJbmZvLkFzc2V0S2V5Lmxlbmd0aCA9PSAwIHx8IG1ldGVyS2V5cy5pbmRleE9mKG1ldGVySW5mby5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKSA+PSAwO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogYm9vbGVhbiA9IG1ldGVySW5mby5OYW1lID09IG51bGwgfHwgbWV0ZXJJbmZvLk5hbWUubGVuZ3RoID09IDA7XHJcbiAgICAgICAgICAgIHZhciBtYWtlOiBib29sZWFuID0gbWV0ZXJJbmZvLk1ha2UgPT0gbnVsbCB8fCBtZXRlckluZm8uTWFrZS5sZW5ndGggPT0gMDtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBib29sZWFuID0gbWV0ZXJJbmZvLk1vZGVsID09IG51bGwgfHwgbWV0ZXJJbmZvLk1vZGVsLmxlbmd0aCA9PSAwO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFzc2V0S2V5IHx8IG5hbWUgfHwgbWFrZSB8fCBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gMikge1xyXG4gICAgICAgICAgICB2YXIga2V5OiBib29sZWFuID0gbG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5ID09IG51bGwgfHwgbG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5Lmxlbmd0aCA9PSAwIHx8IChsb2NhdGlvbktleXMuaW5kZXhPZihsb2NhdGlvbkluZm8uTG9jYXRpb25LZXkudG9Mb3dlckNhc2UoKSkgPj0gMCAmJiBsb2NhdGlvbkluZm8uSUQgPT0gMCk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBib29sZWFuID0gbG9jYXRpb25JbmZvLk5hbWUgPT0gbnVsbCB8fCBsb2NhdGlvbkluZm8uTmFtZS5sZW5ndGggPT0gMDtcclxuICAgICAgICAgICAgdmFyIGxhdGl0dWRlOiBib29sZWFuID0gbG9jYXRpb25JbmZvLkxhdGl0dWRlID09IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBsb25naXR1ZGU6IGJvb2xlYW4gPSBsb2NhdGlvbkluZm8uTG9uZ2l0dWRlID09IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ga2V5IHx8IG5hbWUgfHwgbGF0aXR1ZGUgfHwgbG9uZ2l0dWRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gY2hhbm5lbHMubGVuZ3RoID09IDA7XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gNClcclxuICAgICAgICAgICAgcmV0dXJuIGFzc2V0cy5sZW5ndGggPT0gMDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17e3BhZGRpbmc6IDEwLCBoZWlnaHQ6ICdpbmhlcml0Jywgb3ZlcmZsb3dZOiAnaGlkZGVuJ319PlxyXG4gICAgICAgICAgICA8aDI+TmV3IE1ldGVyIFdpemFyZDwvaDI+XHJcbiAgICAgICAgICAgIDxoci8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7aGVpZ2h0OiAnY2FsYygxMDAlIC0gNzVweCknfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e2NsZWFyRGF0YX0gPkNsZWFyIERhdGE8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQgc3R5bGU9e3t3aWR0aDogJzkwJSd9fT57Z2V0SGVhZGVyKCl9PC9oND5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIiBzdHlsZT17e21heEhlaWdodDogJ2NhbGMoMTAwJSAtIDEyNnB4KSd9fT5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0UGFnZSgpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1sZWZ0XCIgb25DbGljaz17cHJldn0gaGlkZGVuPXtjdXJyZW50U3RlcCA8PSAxfT5QcmV2PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e25leHR9IGhpZGRlbj17Y3VycmVudFN0ZXAgPj0gNX0gZGlzYWJsZWQ9e2N1cnJlbnRTdGVwID49IDUgfHwgZGlzYWJsZU5leHQoKX0+TmV4dDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXthZGROZXdNZXRlcn0gaGlkZGVuPXtjdXJyZW50U3RlcCA8IDV9PlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTEudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBGb3JtVGV4dEFyZWEgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtVGV4dEFyZWEnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdFZhbHVlTGlzdCwgU2VsZWN0VmFsdWVMaXN0U3RhdHVzLCBGZXRjaFZhbHVlTGlzdCB9IGZyb20gJy4uL1N0b3JlL1ZhbHVlTGlzdFNsaWNlJztcclxuaW1wb3J0IHsgU2VsZWN0TWV0ZXJLZXlzTG93ZXJDYXNlLCBTZWxlY3RNZXRlclN0YXR1cywgRmV0Y2hNZXRlciB9IGZyb20gJy4uL1N0b3JlL01ldGVyU2xpY2UnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UxKHByb3BzOiB7IE1ldGVySW5mbzogT3BlblhEQS5NZXRlciwgVXBkYXRlTWV0ZXJJbmZvOiAocmVjb3JkOiBPcGVuWERBLk1ldGVyKSA9PiB2b2lkIH0pIHtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIGNvbnN0IHRpbWVab25lcyA9IHVzZVNlbGVjdG9yKHN0YXRlID0+IFNlbGVjdFZhbHVlTGlzdChzdGF0ZSwgJ1RpbWVab25lcycpKTtcclxuICAgIGNvbnN0IHR6U3RhdHVzID0gdXNlU2VsZWN0b3Ioc3RhdGUgPT4gU2VsZWN0VmFsdWVMaXN0U3RhdHVzKHN0YXRlLCAnVGltZVpvbmVzJykpIGFzIFN5c3RlbUNlbnRlci5TdGF0dXM7XHJcbiAgICBjb25zdCBtZXRlcktleXMgPSB1c2VTZWxlY3RvcihTZWxlY3RNZXRlcktleXNMb3dlckNhc2UpO1xyXG4gICAgY29uc3QgbVN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdE1ldGVyU3RhdHVzKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChtU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgbVN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoTWV0ZXIoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIG1TdGF0dXNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0elN0YXR1cyA9PT0gJ3VuaW50aWF0ZWQnIHx8IHR6U3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hWYWx1ZUxpc3QoeyBncm91cDogJ1RpbWVab25lcycgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCB0elN0YXR1c10pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5NZXRlcikpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ0Fzc2V0S2V5JylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5Bc3NldEtleSAhPSBudWxsICYmIG1ldGVyS2V5cy5pbmRleE9mKHByb3BzLk1ldGVySW5mby5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKSA8IDAgJiZwcm9wcy5NZXRlckluZm8uQXNzZXRLZXkubGVuZ3RoID4gMCAmJiBwcm9wcy5NZXRlckluZm8uQXNzZXRLZXkubGVuZ3RoIDw9IDUwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5OYW1lICE9IG51bGwgJiYgcHJvcHMuTWV0ZXJJbmZvLk5hbWUubGVuZ3RoID4gMCAmJiBwcm9wcy5NZXRlckluZm8uTmFtZS5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdBbGlhcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlckluZm8uQWxpYXMgPT0gbnVsbCB8fCBwcm9wcy5NZXRlckluZm8uQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5TaG9ydE5hbWUgPT0gbnVsbCB8fCBwcm9wcy5NZXRlckluZm8uU2hvcnROYW1lLmxlbmd0aCA8PSA1MDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTWFrZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlckluZm8uTWFrZSAhPSBudWxsICYmIHByb3BzLk1ldGVySW5mby5NYWtlLmxlbmd0aCA+IDAgJiYgcHJvcHMuTWV0ZXJJbmZvLk1ha2UubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTW9kZWwnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTWV0ZXJJbmZvLk1vZGVsICE9IG51bGwgJiYgcHJvcHMuTWV0ZXJJbmZvLk1vZGVsLmxlbmd0aCA+IDAgJiYgcHJvcHMuTWV0ZXJJbmZvLk1vZGVsLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J0Fzc2V0S2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZU1ldGVySW5mb30gLz5cclxuICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMgYW5kIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVNZXRlckluZm99IC8+XHJcbiAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVySW5mb30gRmllbGQ9eydTaG9ydE5hbWUnfSBGZWVkYmFjaz17J1Nob3J0TmFtZSBtdXN0IGJlIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVNZXRlckluZm99IC8+XHJcbiAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVySW5mb30gRmllbGQ9eydBbGlhcyd9IEZlZWRiYWNrPXsnQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZU1ldGVySW5mb30gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J01ha2UnfSBGZWVkYmFjaz17J01ha2UgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZU1ldGVySW5mb30gLz5cclxuICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J01vZGVsJ30gRmVlZGJhY2s9eydNb2RlbCBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlTWV0ZXJJbmZvfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+VGltZSBab25lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17cHJvcHMuTWV0ZXJJbmZvID09IG51bGwgfHwgcHJvcHMuTWV0ZXJJbmZvLlRpbWVab25lID09IG51bGwgPyAnLTEnIDogcHJvcHMuTWV0ZXJJbmZvLlRpbWVab25lfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGVyOiBPcGVuWERBLk1ldGVyID0gXy5jbG9uZShwcm9wcy5NZXRlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCItMVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGVyLlRpbWVab25lID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRlci5UaW1lWm9uZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVNZXRlckluZm8obWV0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCItMVwiPk5vbmUgU2VsZWN0ZWQ8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGltZVpvbmVzICE9IG51bGwgPyB0aW1lWm9uZXMubWFwKHR6ID0+IDxvcHRpb24gdmFsdWU9e3R6LlRleHR9IGtleT17dHouVGV4dH0gZGlzYWJsZWQ9eyF0ei5FbmFibGVkfSBoaWRkZW49e3R6LkhpZGRlbn0+e3R6LkFsdFRleHQxfTwvb3B0aW9uPikgOiBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTWV0ZXI+IFJvd3M9ezN9IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J0Rlc2NyaXB0aW9uJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZU1ldGVySW5mb30gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFBhZ2UxLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XHJcbmltcG9ydCBGb3JtVGV4dEFyZWEgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtVGV4dEFyZWEnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdExvY2F0aW9ucywgU2VsZWN0TG9jYXRpb25TdGF0dXMsIEZldGNoTG9jYXRpb24gfSBmcm9tICcuLi9TdG9yZS9Mb2NhdGlvblNsaWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UyKHByb3BzOiB7IExvY2F0aW9uSW5mbzogT3BlblhEQS5Mb2NhdGlvbiwgVXBkYXRlTG9jYXRpb25JbmZvOiAocmVjb3JkOiBPcGVuWERBLkxvY2F0aW9uKSA9PiB2b2lkIH0pIHtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIGNvbnN0IGxvY2F0aW9ucyA9IHVzZVNlbGVjdG9yKFNlbGVjdExvY2F0aW9ucyk7XHJcbiAgICBjb25zdCBsU3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0TG9jYXRpb25TdGF0dXMpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGxTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBsU3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKHR6U3RhdHVzID09ICdsb2FkaW5nJykgcHJvbWlzZS5hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCBsU3RhdHVzXSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERpZmZlcmVudE1ldGVyTG9jYXRpb24obWV0ZXJMb2NhdGlvbklEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBwcm9wcy5VcGRhdGVMb2NhdGlvbkluZm8obG9jYXRpb25zLmZpbmQoKHZhbHVlLCBpbmRleCwgb2JqZWN0KSA9PiB2YWx1ZS5JRCA9PSBtZXRlckxvY2F0aW9uSUQpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuTG9jYXRpb24pKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdMb2NhdGlvbktleScpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BzLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleSA9PSBudWxsIHx8IHByb3BzLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleS5sZW5ndGggPT0gMCB8fCBwcm9wcy5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkubGVuZ3RoID4gNTApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAocHJvcHMuTG9jYXRpb25JbmZvLklEID09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRpb25zLmZpbmQobG9jcyA9PiBsb2NzLkxvY2F0aW9uS2V5LnRvTG93ZXJDYXNlKCkgPT0gcHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5LnRvTG93ZXJDYXNlKCkpID09IG51bGw7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Mb2NhdGlvbkluZm8uTmFtZSAhPSBudWxsICYmIHByb3BzLkxvY2F0aW9uSW5mby5OYW1lLmxlbmd0aCA+IDAgJiYgcHJvcHMuTG9jYXRpb25JbmZvLk5hbWUubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQWxpYXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTG9jYXRpb25JbmZvLkFsaWFzID09IG51bGwgfHwgcHJvcHMuTG9jYXRpb25JbmZvLkFsaWFzLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Nob3J0TmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Mb2NhdGlvbkluZm8uU2hvcnROYW1lID09IG51bGwgfHwgcHJvcHMuTG9jYXRpb25JbmZvLlNob3J0TmFtZS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xhdGl0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkxvY2F0aW9uSW5mby5MYXRpdHVkZSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuTG9jYXRpb25JbmZvLkxhdGl0dWRlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTG9uZ2l0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkxvY2F0aW9uSW5mby5Mb25naXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkxvY2F0aW9uSW5mby5Mb25naXR1ZGUpO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBMb2NhdGlvbjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3Byb3BzLkxvY2F0aW9uSW5mby5JRCA9PSBudWxsID8gJzAnIDogcHJvcHMuTG9jYXRpb25JbmZvLklEfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCIwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RGlmZmVyZW50TWV0ZXJMb2NhdGlvbihwYXJzZUludChldnQudGFyZ2V0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25LZXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbGlhczogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG9ydE5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGF0aXR1ZGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb25naXR1ZGU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIj5BZGQgTmV3PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGxvY2F0aW9ucyAhPSBudWxsID8gbG9jYXRpb25zLm1hcChtbCA9PiA8b3B0aW9uIHZhbHVlPXttbC5JRH0ga2V5PXttbC5JRH0+e21sLkxvY2F0aW9uS2V5fTwvb3B0aW9uPikgOiBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17cHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nTG9jYXRpb25LZXknIExhYmVsPSdLZXknIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfSBWYWxpZD17dmFsaWR9IEZlZWRiYWNrPSdBIHVuaXF1ZSBLZXkgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJyBEaXNhYmxlZD17cHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXtwcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdOYW1lJyBTZXR0ZXI9e3Byb3BzLlVwZGF0ZUxvY2F0aW9uSW5mb30gVmFsaWQ9e3ZhbGlkfSBGZWVkYmFjaz0nTmFtZSBpcyByZXF1aXJlZCBhbmQgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJyBEaXNhYmxlZD17cHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXtwcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdTaG9ydE5hbWUnIExhYmVsPSdTaG9ydCBOYW1lJyBTZXR0ZXI9e3Byb3BzLlVwZGF0ZUxvY2F0aW9uSW5mb30gVmFsaWQ9e3ZhbGlkfSBGZWVkYmFjaz0nU2hvcnQgTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzLicgRGlzYWJsZWQ9e3Byb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17cHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nQWxpYXMnIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfVZhbGlkPXt2YWxpZH0gRmVlZGJhY2s9J0FsaWFzIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLicgRGlzYWJsZWQ9e3Byb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17cHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nTGF0aXR1ZGUnIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfSBWYWxpZD17dmFsaWR9IEZlZWRiYWNrPSdMYXRpdHVkZSBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJyBEaXNhYmxlZD17cHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXtwcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdMb25naXR1ZGUnIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfSBWYWxpZD17dmFsaWR9IEZlZWRiYWNrPSdMb25naXR1ZGUgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLicgRGlzYWJsZWQ9e3Byb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTG9jYXRpb24+IFJvd3M9ezN9IFJlY29yZD17cHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nRGVzY3JpcHRpb24nIFNldHRlcj17cHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvfSBWYWxpZD17dmFsaWR9IEZlZWRiYWNrPScnIERpc2FibGVkPXtwcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcblxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTMudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IENGR1BhcnNlciBmcm9tICcuLi8uLi8uLi9UUy9DRkdQYXJzZXInO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdE1lYXN1cmVtZW50VHlwZXMsIFNlbGVjdE1lYXN1cmVtZW50VHlwZVN0YXR1cywgRmV0Y2hNZWFzdXJlbWVudFR5cGUgfSBmcm9tICcuLi9TdG9yZS9NZWFzdXJlbWVudFR5cGVTbGljZSc7XHJcbmltcG9ydCB7IFNlbGVjdFBoYXNlU3RhdHVzLCBTZWxlY3RQaGFzZXMsIEZldGNoUGhhc2UgfSBmcm9tICcuLi9TdG9yZS9QaGFzZVNsaWNlJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYWdlMyhwcm9wczogeyBNZXRlcktleTogc3RyaW5nLCBDaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiwgVXBkYXRlQ2hhbm5lbHM6IChyZWNvcmQ6IE9wZW5YREEuQ2hhbm5lbFtdKSA9PiB2b2lkLCBVcGRhdGVBc3NldHM6IChyZWNvcmQ6IE9wZW5YREEuQXNzZXRbXSkgPT4gdm9pZCAgfSkge1xyXG4gICAgY29uc3QgZmlsZUlucHV0ID0gUmVhY3QudXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG4gICAgY29uc3QgbWVhc3VyZW1lbnRUeXBlcyA9IHVzZVNlbGVjdG9yKFNlbGVjdE1lYXN1cmVtZW50VHlwZXMpO1xyXG4gICAgY29uc3QgbXRTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RNZWFzdXJlbWVudFR5cGVTdGF0dXMpIGFzIFN5c3RlbUNlbnRlci5TdGF0dXM7XHJcbiAgICBjb25zdCBwaGFzZXMgPSB1c2VTZWxlY3RvcihTZWxlY3RQaGFzZXMpO1xyXG4gICAgY29uc3QgcGhTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RQaGFzZVN0YXR1cykgYXMgU3lzdGVtQ2VudGVyLlN0YXR1cztcclxuXHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAkKFwiLmN1c3RvbS1maWxlLWlucHV0XCIpLm9uKFwiY2hhbmdlXCIsIChldnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZmlsZU5hbWUgPSAoZXZ0IGFzIFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KS50YXJnZXQudmFsdWUuc3BsaXQoXCJcXFxcXCIpLnBvcCgpO1xyXG4gICAgICAgICAgICAkKGZpbGVJbnB1dCkuc2libGluZ3MoXCIuY3VzdG9tLWZpbGUtbGFiZWxcIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5odG1sKGZpbGVOYW1lKTtcclxuICAgICAgICAgICAgcmVhZFNpbmdsZUZpbGUoKGV2dCBhcyBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgICQoXCIuY3VzdG9tLWZpbGUtaW5wdXRcIikub2ZmKCdjaGFuZ2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbXSlcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChtdFN0YXR1cyA9PT0gJ3VuaW50aWF0ZWQnIHx8IG10U3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hNZWFzdXJlbWVudFR5cGUoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIG10U3RhdHVzXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAocGhTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBwaFN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoUGhhc2UoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIHBoU3RhdHVzXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZFNpbmdsZUZpbGUoZXZ0OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG4gICAgICAgIC8vUmV0cmlldmUgdGhlIGZpcnN0IChhbmQgb25seSEpIEZpbGUgZnJvbSB0aGUgRmlsZUxpc3Qgb2JqZWN0XHJcbiAgICAgICAgdmFyIGYgPSBldnQudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgIGlmIChmKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgICAgci5vbmxvYWQgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRzID0gZS50YXJnZXQucmVzdWx0IGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VyO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmLm5hbWUuaW5kZXhPZignLmNmZycpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBuZXcgQ0ZHUGFyc2VyKGNvbnRlbnRzLCBwcm9wcy5NZXRlcktleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMocGFyc2VyLkNoYW5uZWxzKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckFzc2V0c0NoYW5uZWxzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdGaWxlIGlzIG5vdCBvZiB0eXBlIGNmZy4gUGxlYXNlIG9ubHkgdXNlIGNvbXRyYWRlIHN0YW5kYXJkIGNmZyBmaWxlcy4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByLnJlYWRBc1RleHQoZik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZUNoYW5uZWwoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUocHJvcHMuQ2hhbm5lbHMpO1xyXG4gICAgICAgIGxldCByZWNvcmQ6IE9wZW5YREEuQ2hhbm5lbCA9IGNoYW5uZWxzLnNwbGljZShpbmRleCwgMSlbMF07XHJcbiAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoY2hhbm5lbHMpO1xyXG5cclxuICAgICAgICBpZiAocmVjb3JkLkFzc2V0ID09ICcnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBhc3NldHM6QXJyYXk8T3BlblhEQS5Bc3NldD4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSk7XHJcblxyXG4gICAgICAgIGlmIChhc3NldHMgIT0gbnVsbCAmJiBhc3NldHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgYXNzZXQgPSBhc3NldHMuZmluZChhID0+IGEuQXNzZXRLZXkgPT0gcmVjb3JkLkFzc2V0KVxyXG4gICAgICAgICAgICBpZiAoYXNzZXQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYW5uZWxJbmRleCA9IGFzc2V0LkNoYW5uZWxzLmZpbmRJbmRleChjID0+IGMuSUQgPSByZWNvcmQuSUQpO1xyXG4gICAgICAgICAgICBpZiAoY2hhbm5lbEluZGV4IDwgMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgYXNzZXQuQ2hhbm5lbHMuc3BsaWNlKGNoYW5uZWxJbmRleCwxKVxyXG4gICAgICAgICAgICBwcm9wcy5VcGRhdGVBc3NldHMoYXNzZXRzKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyQXNzZXRzQ2hhbm5lbHMoKTp2b2lkIHtcclxuICAgICAgICBsZXQgYXNzZXRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpO1xyXG5cclxuICAgICAgICBpZiAoYXNzZXRzICE9IG51bGwgJiYgYXNzZXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgJC5lYWNoKGFzc2V0cywgKGluZGV4LCBhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXNzZXQuQ2hhbm5lbHMgPSBbXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcHJvcHMuVXBkYXRlQXNzZXRzKGFzc2V0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDAsIE1ldGVyOiBwcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0FOJywgTmFtZTogJ1ZBTicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBBTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDEsIE1ldGVyOiBwcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0JOJywgTmFtZTogJ1ZCTicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBCTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDIsIE1ldGVyOiBwcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0NOJywgTmFtZTogJ1ZDTicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBDTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDMsIE1ldGVyOiBwcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdDdXJyZW50JywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0FOJywgTmFtZTogJ0lBJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdDdXJyZW50IEEnLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiA0LCBNZXRlcjogcHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnQ3VycmVudCcsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdCTicsIE5hbWU6ICdJQicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnQ3VycmVudCBCJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogNSwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0N1cnJlbnQnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQ04nLCBOYW1lOiAnSUMnLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ0N1cnJlbnQgQycsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDYsIE1ldGVyOiBwcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdDdXJyZW50JywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ05HJywgTmFtZTogJ0lOJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdDdXJyZW50IE5HJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhjaGFubmVscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQXNzZXRzQ2hhbm5lbHMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9fT5EZWZhdWx0IFNldHVwPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCIgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdXN0b20tZmlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgY2xhc3NOYW1lPVwiY3VzdG9tLWZpbGUtaW5wdXRcIiByZWY9e2ZpbGVJbnB1dH0gYWNjZXB0PVwiLmNmZywucGFyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjdXN0b20tZmlsZS1sYWJlbFwiPkNob29zZSBhIGNvbXRyYWRlIHN0YW5kYXJkIGNmZyBmaWxlIGlmIGFwcGxpY2FibGU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbDogT3BlblhEQS5DaGFubmVsID0geyBJRDogcHJvcHMuQ2hhbm5lbHMubGVuZ3RoLCBNZXRlcjogcHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnVm9sdGFnZScsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdBTicsIE5hbWU6ICdWQU4nLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ1ZvbHRhZ2UgQU4nLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZShwcm9wcy5DaGFubmVscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUNoYW5uZWxzKGNoYW5uZWxzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+QWRkIENoYW5uZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiAnY2FsYygxMDAlIC0gMzVweCknLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtaG92ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5DaGFubmVsPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5EZXNjPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5QaGFzZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQ2hhbm5lbHMubWFwKChjaGFubmVsLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICc1JScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyAgdmFsdWU9e2NoYW5uZWwuU2VyaWVzLlNvdXJjZUluZGV4ZXN9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLlNlcmllcy5Tb3VyY2VJbmRleGVzID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUNoYW5uZWxzKGFycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5OYW1lfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5OYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUNoYW5uZWxzKGFycmF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNDUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLkRlc2NyaXB0aW9ufSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5EZXNjcmlwdGlvbiA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSAnZm9ybS1jb250cm9sJyAgdmFsdWU9e2NoYW5uZWwuTWVhc3VyZW1lbnRUeXBlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5NZWFzdXJlbWVudFR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoYXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e21lYXN1cmVtZW50VHlwZXMubWFwKGEgPT4gPG9wdGlvbiBrZXk9e2EuSUR9IHZhbHVlPXthLk5hbWV9PnthLk5hbWV9PC9vcHRpb24+KX08L3NlbGVjdD59PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLlBoYXNlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5QaGFzZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhhcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT57cGhhc2VzLm1hcChhID0+IDxvcHRpb24ga2V5PXthLklEfSB2YWx1ZT17YS5OYW1lfT57YS5OYW1lfTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiBkZWxldGVDaGFubmVsKGluZGV4KX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICA8Lz5cclxuICAgICAgICApO1xyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBQYWdlNC50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IEJyZWFrZXJBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXInO1xuaW1wb3J0IEJ1c0F0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQnVzJztcbmltcG9ydCBDYXBCYW5rQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rJztcbmltcG9ydCBMaW5lQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9MaW5lJztcbmltcG9ydCBUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvVHJhbnNmb3JtZXInO1xuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XG5pbXBvcnQgeyBnZXRBc3NldFR5cGVzLCBnZXRBbGxBc3NldHMgfSBmcm9tICcuLi8uLi8uLi9UUy9TZXJ2aWNlcy9Bc3NldCc7XG5pbXBvcnQgQ2FwQmFua1JlbGF5QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rUmVsYXknO1xuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgU2VsZWN0QXNzZXRUeXBlcywgU2VsZWN0QXNzZXRUeXBlU3RhdHVzLCBGZXRjaEFzc2V0VHlwZSB9IGZyb20gJy4uL1N0b3JlL0Fzc2V0VHlwZVNsaWNlJztcclxuaW1wb3J0IHsgU2VsZWN0QXNzZXRTdGF0dXMsIEZldGNoQXNzZXQsIFNlbGVjdEFzc2V0cyB9IGZyb20gJy4uL1N0b3JlL0Fzc2V0U2xpY2UnO1xyXG5cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmludGVyZmFjZSBQYWdlNFByb3BzIHtcbiAgICBBc3NldHM6IEFycmF5PE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lciB8IE9wZW5YREEuQ2FwQmFua1JlbGF5PixcbiAgICBDaGFubmVsczogT3BlblhEQS5DaGFubmVsW10sXG4gICAgQXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+LFxuICAgIFVwZGF0ZUNoYW5uZWxzOiAocmVjb3JkOiBPcGVuWERBLkNoYW5uZWxbXSkgPT4gdm9pZCxcbiAgICBVcGRhdGVBc3NldHM6IChyZWNvcmQ6IE9wZW5YREEuQXNzZXRbXSkgPT4gdm9pZCxcbiAgICBVcGRhdGVBc3NldENvbm5lY3Rpb25zOiAocmVjb3JkOiBPcGVuWERBLkFzc2V0Q29ubmVjdGlvbltdKSA9PiB2b2lkLFxuXG59XG5cbnR5cGUgQXNzZXRUeXBlID0gT3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLlRyYW5zZm9ybWVyIHwgT3BlblhEQS5DYXBCYW5rUmVsYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2U0KHByb3BzOiBQYWdlNFByb3BzKSB7XG4gICAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIGNvbnN0IGFzc2V0VHlwZXMgPSB1c2VTZWxlY3RvcihTZWxlY3RBc3NldFR5cGVzKTtcbiAgICBjb25zdCBhdFN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdEFzc2V0VHlwZVN0YXR1cyk7XG4gICAgY29uc3QgYXNzZXRzID0gdXNlU2VsZWN0b3IoU2VsZWN0QXNzZXRzKTtcbiAgICBjb25zdCBhU3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0QXNzZXRTdGF0dXMpO1xuXG4gICAgY29uc3QgW25ld0VkaXRBc3NldCwgc2V0TmV3RWRpdEFzc2V0XSA9IFJlYWN0LnVzZVN0YXRlPEFzc2V0VHlwZT4oQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xuICAgIGNvbnN0IFtuZXdFZGl0LCBzZXROZXdFZGl0XSA9IFJlYWN0LnVzZVN0YXRlPCdOZXcnIHwgJ0VkaXQnPignTmV3Jyk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChhdFN0YXR1cyA9PT0gJ3VuaW50aWF0ZWQnIHx8IGF0U3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hBc3NldFR5cGUoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIGF0U3RhdHVzXSk7XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChhU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgYVN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoQXNzZXQoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIGFTdGF0dXNdKTtcclxuXG5cblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCcmVha2VyJykge1xuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IGdldEVETkFQb2ludChuZXdFZGl0QXNzZXQuSUQpO1xuICAgICAgICAgICAgaGFuZGxlLmRvbmUoKGVkbmFQb2ludDogT3BlblhEQS5FRE5BUG9pbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVjb3JkID0geyAuLi5uZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5CcmVha2VyIH07XG4gICAgICAgICAgICAgICAgaWYgKGVkbmFQb2ludCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkLkVETkFQb2ludCA9IGVkbmFQb2ludC5Qb2ludFxuICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQocmVjb3JkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPT0gdW5kZWZpbmVkKSBoYW5kbGUuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0xpbmUnKXtcbiAgICAgICAgICAgIGxldCBoYW5kbGUgPSBnZXRMaW5lU2VnbWVudChuZXdFZGl0QXNzZXQuSUQpO1xuICAgICAgICAgICAgaGFuZGxlLmRvbmUoKGxpbmVTZWdtZW50OiBPcGVuWERBLkxpbmVEZXRhaWwpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVjb3JkID0gXy5jbG9uZShuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5MaW5lKTtcbiAgICAgICAgICAgICAgICBpZiAobGluZVNlZ21lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY29yZC5EZXRhaWwgPSBsaW5lU2VnbWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkLkRldGFpbCA9IEFzc2V0QXR0cmlidXRlcy5nZXROZXdMaW5lRGV0YWlscygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNldE5ld0VkaXRBc3NldChyZWNvcmQpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9PSB1bmRlZmluZWQpIGhhbmRsZS5hYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG5cbiAgICB9LCBbbmV3RWRpdEFzc2V0LkFzc2V0VHlwZV0pO1xuXG4gICAgZnVuY3Rpb24gZWRpdEFzc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgc2V0TmV3RWRpdCgnRWRpdCcpO1xuICAgICAgICBzZXROZXdFZGl0QXNzZXQocHJvcHMuQXNzZXRzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlQXNzZXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBsZXQgbGlzdCA9IF8uY2xvbmUocHJvcHMuQXNzZXRzKTtcbiAgICAgICAgbGV0IHJlY29yZDogQXJyYXk8T3BlblhEQS5Bc3NldD4gPSBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGxldCBhc3NldENvbm5lY3Rpb25zOiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbj4gPSBfLmNsb25lKHByb3BzLkFzc2V0Q29ubmVjdGlvbnMpO1xuICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBfLmNsb25lKHByb3BzLkNoYW5uZWxzKTtcblxuICAgICAgICAkLmVhY2goY2hhbm5lbHMsIChpbmRleCwgY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5uZWwuQXNzZXQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5KVxuICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSAnJ1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgaW5kZXggPSBhc3NldENvbm5lY3Rpb25zLmZpbmRJbmRleChhc3NldENvbm5lY3Rpb24gPT4gYXNzZXRDb25uZWN0aW9uLlBhcmVudCA9PSByZWNvcmRbMF0uQXNzZXRLZXkgfHwgYXNzZXRDb25uZWN0aW9uLkNoaWxkID09IHJlY29yZFswXS5Bc3NldEtleSk7XG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBhc3NldENvbm5lY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBpbmRleCA9IGFzc2V0Q29ubmVjdGlvbnMuZmluZEluZGV4KGFzc2V0Q29ubmVjdGlvbiA9PiBhc3NldENvbm5lY3Rpb24uUGFyZW50ID09IHJlY29yZFswXS5Bc3NldEtleSB8fCBhc3NldENvbm5lY3Rpb24uQ2hpbGQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3BzLlVwZGF0ZUFzc2V0cyhsaXN0KTtcbiAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoY2hhbm5lbHMpO1xuICAgICAgICBwcm9wcy5VcGRhdGVBc3NldENvbm5lY3Rpb25zKGFzc2V0Q29ubmVjdGlvbnMpO1xuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VBc3NldFR5cGUodHlwZTogJ0xpbmUnIHwgJ0xpbmVTZWdtZW50JyB8ICdCcmVha2VyJyB8ICdCdXMnIHwgJ0NhcGFjaXRvckJhbmsnIHwgJ1RyYW5zZm9ybWVyJyB8ICdDYXBhY2l0b3JCYW5rUmVsYXknKTogdm9pZCB7XG4gICAgICAgIGxldCBhc3NldCA9IHtcbiAgICAgICAgICAgIElEOiBuZXdFZGl0QXNzZXQuSUQsXG4gICAgICAgICAgICBBc3NldEtleTogbmV3RWRpdEFzc2V0LkFzc2V0S2V5LFxuICAgICAgICAgICAgQXNzZXROYW1lOiBuZXdFZGl0QXNzZXQuQXNzZXROYW1lLFxuICAgICAgICAgICAgQXNzZXRUeXBlOiB0eXBlLFxuICAgICAgICAgICAgRGVzY3JpcHRpb246IG5ld0VkaXRBc3NldC5EZXNjcmlwdGlvbixcbiAgICAgICAgICAgIFZvbHRhZ2VLVjogbmV3RWRpdEFzc2V0LlZvbHRhZ2VLVixcbiAgICAgICAgICAgIENoYW5uZWxzOiBuZXdFZGl0QXNzZXQuQ2hhbm5lbHMsXG4gICAgICAgICAgICBTcGFyZTogbmV3RWRpdEFzc2V0LlNwYXJlXG4gICAgICAgIH1cblxuICAgICAgICBhc3NldCA9IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldEF0dHJpYnV0ZXMoYXNzZXQsIHR5cGUpO1xuICAgICAgICBzZXROZXdFZGl0QXNzZXQoIGFzc2V0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREaWZmZXJlbnRBc3NldChhc3NldElEOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFzc2V0VHlwZUlEID0gYXNzZXRzLmZpbmQoYSA9PiBhLklEID09IGFzc2V0SUQpWydBc3NldFR5cGVJRCddOyBcbiAgICAgICAgbGV0IGFzc2V0VHlwZSA9IGFzc2V0VHlwZXMuZmluZChhdCA9PiBhdC5JRCA9PSBhc3NldFR5cGVJRClcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBLyR7YXNzZXRUeXBlLk5hbWV9L09uZS8ke2Fzc2V0SUR9YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pLmRvbmUoKGFzc2V0OiBPcGVuWERBLkFzc2V0KSA9PiB7XG4gICAgICAgICAgICBhc3NldC5Bc3NldFR5cGUgPSBhc3NldFR5cGUuTmFtZTtcbiAgICAgICAgICAgIGFzc2V0LkNoYW5uZWxzID0gW107XG4gICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoYXNzZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRMaW5lU2VnbWVudChsaW5lSUQ6IG51bWJlcik6IEpRdWVyeS5qcVhIUjxPcGVuWERBLkxpbmVTZWdtZW50PiB7XG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTGluZS8ke2xpbmVJRH0vTGluZVNlZ21lbnRgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RUROQVBvaW50KGJyZWFrZXJJRDogbnVtYmVyKTogSlF1ZXJ5LmpxWEhSPE9wZW5YREEuRUROQVBvaW50PiB7XG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQnJlYWtlci8ke2JyZWFrZXJJRH0vRUROQVBvaW50YCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzYWJsZU1vZGFsU2F2ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICQoJy5pcy1pbnZhbGlkJykubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93QXR0cmlidXRlcygpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCcmVha2VyJylcbiAgICAgICAgICAgIHJldHVybiA8QnJlYWtlckF0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLkJyZWFrZXJ9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCdXMnKVxuICAgICAgICAgICAgcmV0dXJuIDxCdXNBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXR9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9Lz47XG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0NhcGFjaXRvckJhbmsnKVxuICAgICAgICAgICAgcmV0dXJuIDxDYXBCYW5rQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua30gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0NhcGFjaXRvckJhbmtSZWxheScpXG4gICAgICAgICAgICByZXR1cm4gPENhcEJhbmtSZWxheUF0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLkNhcEJhbmtSZWxheX0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0xpbmUnKVxuICAgICAgICAgICAgcmV0dXJuIDxMaW5lQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuTGluZX0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ1RyYW5zZm9ybWVyJylcbiAgICAgICAgICAgIHJldHVybiA8VHJhbnNmb3JtZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5UcmFuc2Zvcm1lcn0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XG4gICAgfVxuXG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7bWFyZ2luOiAtMjB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjg1LCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI4NSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6IDAsIG1hcmdpbjogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkNoYW5uZWxzLm1hcCgoY2hhbm5lbCwgaW5kZXgpID0+IDxsaSBzdHlsZT17e3RleHREZWNvcmF0aW9uOiAoY2hhbm5lbC5Bc3NldC5sZW5ndGggPiAwID8gJ2xpbmUtdGhyb3VnaCcgOiBudWxsKX19IGtleT17aW5kZXh9PntjaGFubmVsLk5hbWUgKyAnIC0gJyArIGNoYW5uZWwuRGVzY3JpcHRpb259PC9saT4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCIgc3R5bGU9e3twYWRkaW5nOiAyMH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IDM4IH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PScjYXNzZXRNb2RhbCcgb25DbGljaz17KCkgPT4gc2V0TmV3RWRpdCgnTmV3Jyl9PkFkZCBBc3NldDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzNTAsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtaG92ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5TdGF0dXM8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5LZXk8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+VHlwZTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPmtWPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q2hhbm5lbHM8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkFzc2V0cy5tYXAoKGFzc2V0OiBPcGVuWERBLkFzc2V0LCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PnsoYXNzZXQuSUQgPT0gMCA/ICdOZXcnIDogJ0V4aXN0aW5nJyl9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcyMCUnIH19Pnthc3NldC5Bc3NldEtleX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzMwJScgfX0+e2Fzc2V0LkFzc2V0TmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+e2Fzc2V0LkFzc2V0VHlwZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+e2Fzc2V0LlZvbHRhZ2VLVn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+e2Fzc2V0LkNoYW5uZWxzLmxlbmd0aH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNhc3NldE1vZGFsJyBvbkNsaWNrPXsoZSkgPT4gZWRpdEFzc2V0KGluZGV4KX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGVuY2lsXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IGRlbGV0ZUFzc2V0KGluZGV4KX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIGlkPVwiYXNzZXRNb2RhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHN0eWxlPXt7bWF4V2lkdGg6ICcxMDAlJywgd2lkdGg6ICc5MCUnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57bmV3RWRpdCA9PSAnTmV3JyA/ICdBZGQgTmV3IEFzc2V0IHRvIE1ldGVyJzogJ0VkaXQgJyArIG5ld0VkaXRBc3NldC5Bc3NldEtleSArICcgZm9yIE1ldGVyJyB9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPiZ0aW1lczs8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFzc2V0QXR0cmlidXRlcyBBc3NldD17bmV3RWRpdEFzc2V0fSBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldFR5cGVzPXthc3NldFR5cGVzfSBBbGxBc3NldHM9e2Fzc2V0c30gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gR2V0RGlmZmVyZW50QXNzZXQ9e2dldERpZmZlcmVudEFzc2V0fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc2hvd0F0dHJpYnV0ZXMoKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFzc29jaWF0ZWQgQ2hhbm5lbHM8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgbXVsdGlwbGUgc3R5bGU9e3sgaGVpZ2h0OiAnMTAwJScsIHdpZHRoOiAnMTAwJScgfX0gb25DaGFuZ2U9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0ICA9IF8uY2xvbmUobmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5DaGFubmVscyA9ICgkKGV2dC50YXJnZXQpLnZhbCgpIGFzIEFycmF5PHN0cmluZz4pLm1hcChhID0+IHByb3BzLkNoYW5uZWxzW3BhcnNlSW50KGEpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KGFzc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSB2YWx1ZT17bmV3RWRpdEFzc2V0LkNoYW5uZWxzLm1hcChhID0+IGEuSUQudG9TdHJpbmcoKSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5DaGFubmVscy5tYXAoKGNoYW5uZWwsIGluZGV4KSA9PiA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0gaGlkZGVuPXsgY2hhbm5lbC5Bc3NldCAhPSBuZXdFZGl0QXNzZXQuQXNzZXRLZXkgJiYgY2hhbm5lbC5Bc3NldC5sZW5ndGg+IDB9PntjaGFubmVsLk5hbWUgKyAnIC0gJyArIGNoYW5uZWwuRGVzY3JpcHRpb259PC9vcHRpb24+KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkOiBPcGVuWERBLkFzc2V0ID0gXy5jbG9uZShuZXdFZGl0QXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSBfLmNsb25lKHByb3BzLkFzc2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBfLmNsb25lKHByb3BzLkNoYW5uZWxzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGNoYW5uZWxzLCAoaW5kZXgsIGNoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbm5lbC5Bc3NldCA9PSByZWNvcmQuQXNzZXRLZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSAnJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC5DaGFubmVscy5maW5kSW5kZXgoYyA9PiBjLklEID09IGNoYW5uZWwuSUQpID49IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSByZWNvcmQuQXNzZXRLZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKHJlY29yZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhjaGFubmVscyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVBc3NldHMobGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBoaWRkZW49e25ld0VkaXQgIT0gJ05ldyd9PlNhdmU8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmQ6IE9wZW5YREEuQXNzZXQgPSBfLmNsb25lKG5ld0VkaXRBc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IF8uY2xvbmUocHJvcHMuQXNzZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUocHJvcHMuQ2hhbm5lbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSBsaXN0LmZpbmRJbmRleChyID0+IHIuQXNzZXRLZXkgPT0gcmVjb3JkLkFzc2V0S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RbaV0gPSByZWNvcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goY2hhbm5lbHMsIChpbmRleCwgY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFubmVsLkFzc2V0ID09IHJlY29yZC5Bc3NldEtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9ICcnXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLkNoYW5uZWxzLmZpbmRJbmRleChjID0+IGMuSUQgPT0gY2hhbm5lbC5JRCkgPj0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9IHJlY29yZC5Bc3NldEtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUNoYW5uZWxzKGNoYW5uZWxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUFzc2V0cyhsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE5ld0VkaXRBc3NldChBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGhpZGRlbj17bmV3RWRpdCAhPSAnRWRpdCd9PlNhdmU8L2J1dHRvbj5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5DbG9zZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC8+XG4gICAgICAgICk7XG5cbn1cblxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFBhZ2U1LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xMC8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdEFzc2V0Q29ubmVjdGlvblR5cGVzLCBTZWxlY3RBc3NldENvbm5lY3Rpb25UeXBlU3RhdHVzLCBGZXRjaEFzc2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tICcuLi9TdG9yZS9Bc3NldENvbm5lY3Rpb25UeXBlU2xpY2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZTUocHJvcHM6IHsgQXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PiwgQXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+LCBVcGRhdGVBc3NldENvbm5lY3Rpb25zOiAocmVjb3JkOiBPcGVuWERBLkFzc2V0Q29ubmVjdGlvbltdKSA9PiB2b2lkIH0pIHtcclxuICAgIGNvbnN0IHNlbGVjdEFzc2V0ID0gUmVhY3QudXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3Qgc2VsZWN0VHlwZSA9IFJlYWN0LnVzZVJlZihudWxsKTtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIGNvbnN0IGFzc2V0Q29ubmVjdGlvblR5cGVzID0gdXNlU2VsZWN0b3IoU2VsZWN0QXNzZXRDb25uZWN0aW9uVHlwZXMpO1xyXG4gICAgY29uc3QgYWN0U3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0QXNzZXRDb25uZWN0aW9uVHlwZVN0YXR1cyk7XHJcblxyXG4gICAgY29uc3QgW2Fzc2V0SW5kZXgsIHNldEFzc2V0SW5kZXhdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyPigwKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChhY3RTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBhY3RTdGF0dXMgPT09ICdjaGFuZ2VkJykge1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGRpc3BhdGNoKEZldGNoQXNzZXRDb25uZWN0aW9uVHlwZSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKHR6U3RhdHVzID09ICdsb2FkaW5nJykgcHJvbWlzZS5hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCBhY3RTdGF0dXNdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBjdXJyZW50U3RlcCBpcyBzZXQgdG8gc29tZXRoaW5nIHJlYXNvbmFibGVcclxuICAgICAgICBpZiAoYXNzZXRJbmRleCA+PSBwcm9wcy5Bc3NldHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBzZXRBc3NldEluZGV4KCBwcm9wcy5Bc3NldHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0QXNzZXRJbmRleChhc3NldEluZGV4ICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZXYoKSB7XHJcbiAgICAgICAgaWYgKGFzc2V0SW5kZXggPD0gMCkge1xyXG4gICAgICAgICAgICBzZXRBc3NldEluZGV4KDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEFzc2V0SW5kZXgoYXNzZXRJbmRleCAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVBc3NldENvbm5lY3Rpb24oYWM6IE9wZW5YREEuQXNzZXRDb25uZWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiA9IF8uY2xvbmUocHJvcHMuQXNzZXRDb25uZWN0aW9ucyk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gbGlzdC5maW5kSW5kZXgoYSA9PiBhID09IGFjKTtcclxuICAgICAgICBsZXQgcmVjb3JkOiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbj4gPSBsaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgcHJvcHMuVXBkYXRlQXNzZXRDb25uZWN0aW9ucyhsaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY3VycmVudEFzc2V0ID0gcHJvcHMuQXNzZXRzW2Fzc2V0SW5kZXhdXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9e3sgbWFyZ2luOiAtMjAgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjg1LCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI4NSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6IDAsIG1hcmdpbjogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQXNzZXRzLm1hcCgoYXNzZXQsIGluZGV4KSA9PiA8bGkgc3R5bGU9e3sgdGV4dERlY29yYXRpb246IChpbmRleCA8PSBhc3NldEluZGV4ID8gJ2xpbmUtdGhyb3VnaCcgOiBudWxsKSB9fSBrZXk9e2luZGV4fT57YXNzZXQuQXNzZXRLZXl9PC9saT4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIHN0eWxlPXt7IHBhZGRpbmc6IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PScjbmV3Q29ubmVjdGlvbicgZGlzYWJsZWQ9e3Byb3BzLkFzc2V0cy5sZW5ndGggPD0gMX0+QWRkIENvbm5lY3Rpb248L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19PntjdXJyZW50QXNzZXQuQXNzZXRLZXl9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCIgc3R5bGU9e3tvdmVyZmxvd1k6J3Njcm9sbCcsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNDE1fX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtaG92ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Bc3NldDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+VHlwZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q29ubmVjdGlvbjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQXNzZXRDb25uZWN0aW9ucy5maWx0ZXIoIGFjID0+IGFjLlBhcmVudCA9PSBjdXJyZW50QXNzZXQuQXNzZXRLZXkgIHx8IGFjLkNoaWxkID09IGN1cnJlbnRBc3NldC5Bc3NldEtleSkubWFwKChhYzogT3BlblhEQS5Bc3NldENvbm5lY3Rpb24sIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb25uZWN0aW9uQXNzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjLlBhcmVudCA9PSBjdXJyZW50QXNzZXQuQXNzZXRLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbkFzc2V0ID0gcHJvcHMuQXNzZXRzLmZpbmQoYXNzZXQgPT4gYXNzZXQuQXNzZXRLZXkgPT0gYWMuQ2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25Bc3NldCA9IHByb3BzLkFzc2V0cy5maW5kKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5ID09IGFjLlBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb25uZWN0aW9uVHlwZSA9IGFzc2V0Q29ubmVjdGlvblR5cGVzLmZpbmQoYWN0ID0+IGFjdC5JRCA9PSBhYy5Bc3NldFJlbGF0aW9uc2hpcFR5cGVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT57Y29ubmVjdGlvbkFzc2V0LkFzc2V0S2V5fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcyMCUnIH19Pntjb25uZWN0aW9uQXNzZXQuQXNzZXRUeXBlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICc1MCUnIH19Pntjb25uZWN0aW9uVHlwZSAhPSB1bmRlZmluZWQgPyBjb25uZWN0aW9uVHlwZS5OYW1lIDogJyd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IGRlbGV0ZUFzc2V0Q29ubmVjdGlvbihhYyl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIG9uQ2xpY2s9e3ByZXZ9IGhpZGRlbj17ZmFsc2V9IGRpc2FibGVkPXthc3NldEluZGV4IDwgMX0+UHJldjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e25leHR9IGRpc2FibGVkPXthc3NldEluZGV4ID09IHByb3BzLkFzc2V0cy5sZW5ndGggLSAxfT5OZXh0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIGlkPVwibmV3Q29ubmVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPkFkZCBhIENvbm5lY3Rpb24gdG8ge2N1cnJlbnRBc3NldC5Bc3NldEtleX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBDb25uZWN0aW5nIEFzc2V0PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHJlZj17IHNlbGVjdEFzc2V0fSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5Bc3NldHMuZmlsdGVyKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5ICE9IGN1cnJlbnRBc3NldC5Bc3NldEtleSkubWFwKChhc3NldCwgaW5kZXgpID0+IDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2Fzc2V0LkFzc2V0S2V5fSA+e2Fzc2V0LkFzc2V0S2V5fTwvb3B0aW9uPilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2VsZWN0IENvbm5lY3Rpb24gVHlwZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCByZWY9e3NlbGVjdFR5cGV9IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0Q29ubmVjdGlvblR5cGVzLm1hcCgoYWN0LCBpbmRleCkgPT4gPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17YWN0LklEfSA+e2FjdC5OYW1lfTwvb3B0aW9uPilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZENvbm5lY3Rpb24gPSAkKHNlbGVjdEFzc2V0LmN1cnJlbnQpLnZhbCgpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvblR5cGUgPSBwYXJzZUludCgkKHNlbGVjdFR5cGUuY3VycmVudCkudmFsKCkgYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ID0gXy5jbG9uZShwcm9wcy5Bc3NldENvbm5lY3Rpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldENvbm5lY3Rpb25zLnB1c2goeyBJRDogMCwgQXNzZXRSZWxhdGlvbnNoaXBUeXBlSUQ6IGNvbm5lY3Rpb25UeXBlLCBQYXJlbnQ6IGN1cnJlbnRBc3NldC5Bc3NldEtleSwgQ2hpbGQ6IGNoaWxkQ29ubmVjdGlvbiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVBc3NldENvbm5lY3Rpb25zKGFzc2V0Q29ubmVjdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gPlNhdmU8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Lz5cclxuICAgICk7XHJcblxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9