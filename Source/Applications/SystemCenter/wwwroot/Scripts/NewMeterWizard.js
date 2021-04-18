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
        this.Analogs = data.slice(2, analogCounts + 2).map(function (a, index) { return { ID: index, Meter: meterKey, Asset: '', MeasurementType: _this.parseType(a[4]), MeasurementCharacteristic: 'Instantaneous', Phase: _this.parsePhase(a[2]), Name: a[1], SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: a[3], Enabled: true, Adder: 0, Multiplier: 1, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: a[0] }] }; });
        this.Digitals = data.slice(2 + analogCounts, 2 + analogCounts + digitalCounts).map(function (a, index) { return { ID: analogCounts + index, Meter: meterKey, Asset: '', MeasurementType: 'Digital', MeasurementCharacteristic: 'Instantaneous', Phase: _this.parsePhase(a[2]), Name: a[1], SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Adder: 0, Multiplier: 1, Description: a[3], Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: a[0] }] }; });
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
        else if (value.toLowerCase().indexOf('r') >= 0)
            return 'RES';
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
            return props.Asset.OnVoltageThreshhold != null && _Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Asset.OnVoltageThreshhold);
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
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_9__);
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
    var _g = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), error = _g[0], setError = _g[1];
    var _h = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), hoverNext = _h[0], setHoverNext = _h[1];
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
        if (disableNext())
            return;
        setError([]);
        // Make sure currentStep is set to something reasonable
        if (currentStep >= 4) {
            setCurrentStep(5);
        }
        else {
            setCurrentStep(currentStep + 1);
        }
    }
    function prev() {
        setError([]);
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
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page1__WEBPACK_IMPORTED_MODULE_4__["default"], { MeterInfo: meterInfo, UpdateMeterInfo: setMeterInfo, SetError: setError });
        else if (currentStep == 2)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page2__WEBPACK_IMPORTED_MODULE_5__["default"], { LocationInfo: locationInfo, UpdateLocationInfo: setLocationInfo, SetError: function (e) { setError(e); } });
        else if (currentStep == 3)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page3__WEBPACK_IMPORTED_MODULE_6__["default"], { MeterKey: meterInfo.AssetKey, Channels: channels, UpdateChannels: setChannels, UpdateAssets: setAssets, SetError: setError });
        else if (currentStep == 4)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page4__WEBPACK_IMPORTED_MODULE_7__["default"], { AssetConnections: assetConnections, Channels: channels, Assets: assets, UpdateChannels: setChannels, UpdateAssets: setAssets, UpdateAssetConnections: setAssetConnections, SetError: setError });
        else if (currentStep == 5)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page5__WEBPACK_IMPORTED_MODULE_8__["default"], { Assets: assets, AssetConnections: assetConnections, UpdateAssetConnections: setAssetConnections });
    }
    function disableNext() {
        if (currentStep == 1) {
            return error.length > 0;
        }
        else if (currentStep == 2) {
            return error.length > 0;
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
                currentStep > 1 ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-left", onClick: prev }, "Prev") : null,
                currentStep < 5 ? react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-success pull-right" + (disableNext() ? ' disabled' : ''), onClick: next, "data-tooltip": 'Next', onMouseEnter: function () { return setHoverNext(true); }, onMouseLeave: function () { return setHoverNext(false); } }, "Next") : null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-success pull-right", onClick: addNewMeter, hidden: currentStep < 5 }, "Submit")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_9__["ToolTip"], { Show: hoverNext && error.length > 0, Position: 'top', Theme: 'dark', Target: "Next" }, error.map(function (item, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { key: index },
                " ",
                ErrorSymbol(),
                " ",
                item,
                " "); })))));
}
var ErrorSymbol = function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }); };


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
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_MeterSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Store/MeterSlice */ "./TSX/SystemCenter/Store/MeterSlice.ts");
/* harmony import */ var _Meter_PropertyUI_MeterProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Meter/PropertyUI/MeterProperties */ "./TSX/SystemCenter/Meter/PropertyUI/MeterProperties.tsx");
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
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
    var meterKeys = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_Store_MeterSlice__WEBPACK_IMPORTED_MODULE_2__["SelectMeterKeysLowerCase"]);
    var mStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_Store_MeterSlice__WEBPACK_IMPORTED_MODULE_2__["SelectMeterStatus"]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (mStatus === 'unintiated' || mStatus === 'changed') {
            dispatch(Object(_Store_MeterSlice__WEBPACK_IMPORTED_MODULE_2__["FetchMeter"])());
            return function () {
            };
        }
    }, [dispatch, mStatus]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var error = [];
        if (!valid('AssetKey'))
            error.push('A unique AssetKey of less than 50 characters is required.');
        if (!valid('Name'))
            error.push('Name must be less than 200 characters and is required.');
        if (!valid('ShortName'))
            error.push('ShortName must be less than 50 characters.');
        if (!valid('Alias'))
            error.push('Alias must be less than 200 characters.');
        if (!valid('Make'))
            error.push('Make must be less than 200 characters.');
        if (!valid('Model'))
            error.push('Model must be less than 200 characters.');
        props.SetError(error);
    }, [props.MeterInfo, meterKeys]);
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
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_PropertyUI_MeterProperties__WEBPACK_IMPORTED_MODULE_3__["default"], { Meter: props.MeterInfo, StateSetter: props.UpdateMeterInfo }));
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
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_LocationSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Store/LocationSlice */ "./TSX/SystemCenter/Store/LocationSlice.ts");
/* harmony import */ var _Meter_PropertyUI_MeterLocationProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Meter/PropertyUI/MeterLocationProperties */ "./TSX/SystemCenter/Meter/PropertyUI/MeterLocationProperties.tsx");
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
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
    var locations = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(_Store_LocationSlice__WEBPACK_IMPORTED_MODULE_3__["SelectLocations"]);
    var lStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(_Store_LocationSlice__WEBPACK_IMPORTED_MODULE_3__["SelectLocationStatus"]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (lStatus === 'unintiated' || lStatus === 'changed') {
            dispatch(Object(_Store_LocationSlice__WEBPACK_IMPORTED_MODULE_3__["FetchLocation"])());
            return function () {
                //if (tzStatus == 'loading') promise.abort();
            };
        }
    }, [dispatch, lStatus]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var error = [];
        if (props.LocationInfo.LocationKey == null || props.LocationInfo.LocationKey.length == 0 || props.LocationInfo.LocationKey.length > 50)
            error.push('Key is required and needs to be less than 50 characters.');
        else if (props.LocationInfo.ID == 0 && locations.find(function (locs) { return locs.LocationKey.toLowerCase() == props.LocationInfo.LocationKey.toLowerCase(); }) != null)
            error.push('Key needs to be unique.');
        if (props.LocationInfo.Name == null || props.LocationInfo.Name.length == 0 || props.LocationInfo.Name.length > 200)
            error.push('Name is required and needs to be less than 200 characters.');
        if (props.LocationInfo.ShortName != null && props.LocationInfo.ShortName.length > 50)
            error.push('ShortName needs to be less than 50 characters.');
        if (props.LocationInfo.Alias != null && props.LocationInfo.Alias.length > 200)
            error.push('Alias needs to be less than 200 characters.');
        if (props.LocationInfo.Latitude == null || !_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.LocationInfo.Latitude))
            error.push('Latitude is required.');
        if (props.LocationInfo.Longitude == null || !_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_1__["AssetAttributes"].isRealNumber(props.LocationInfo.Longitude))
            error.push('Longitude is required.');
        props.SetError(error);
    }, [props.LocationInfo, props.SetError]);
    function getDifferentMeterLocation(meterLocationID) {
        props.UpdateLocationInfo(locations.find(function (value, index, object) { return value.ID == meterLocationID; }));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Meter_PropertyUI_MeterLocationProperties__WEBPACK_IMPORTED_MODULE_4__["default"], { Meter: { LocationID: props.LocationInfo.ID == null ? '0' : props.LocationInfo.ID }, Location: props.LocationInfo, SetLocation: props.UpdateLocationInfo, UpdateMeter: function (m) {
            if (m.LocationID != 0)
                getDifferentMeterLocation(m.LocationID);
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
        }, Locationlist: locations != null ? locations : [], DisableLocation: props.LocationInfo.ID != 0 }));
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
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @gpa-gemstone/react-table */ "../../node_modules/@gpa-gemstone/react-table/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_8__);
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
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showCFGError = _a[0], setShowCFGError = _a[1];
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
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var e = [];
        if (props.Channels.length == 0)
            e.push('At Least 1 Channel has to be set up.');
        props.SetError(e);
    }, [props.Channels]);
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
                    setShowCFGError(true);
            };
            r.readAsText(f);
        }
    }
    function deleteChannel(id) {
        var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Channels);
        var index = channels.findIndex(function (ch) { return ch.ID == id; });
        if (index == -1)
            return;
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
    function editChannel(channel) {
        var index = props.Channels.findIndex(function (ch) { return ch.ID == channel.ID; });
        var updated = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](props.Channels);
        if (index > -1)
            updated[index] = channel;
        else
            updated.push(channel);
        props.UpdateChannels(updated);
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
                            { ID: 6, Meter: props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'RES', Name: 'IR', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current RES', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] },
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
                        var channel = { ID: props.Channels.length == 0 ? 1 : Math.max.apply(Math, __spread(props.Channels.map(function (ch) { return ch.ID; }))) + 1, Meter: props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', Adder: 0, Multiplier: 1, SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: [{ ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' }] };
                        var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Channels);
                        channels.push(channel);
                        props.UpdateChannels(channels);
                    } }, "Add Channel"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: innerHeight - 380, padding: 30 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_table__WEBPACK_IMPORTED_MODULE_6___default.a, { cols: [
                    {
                        key: 'Series', label: 'Channel', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7__["Input"], { Field: 'SourceIndexes', Record: item.Series[0], Setter: function (series) {
                                item.Series[0].SourceIndexes = series.SourceIndexes;
                                editChannel(item);
                            }, Label: '', Valid: function () { return true; } }); }
                    },
                    {
                        key: 'Name', label: 'Name', headerStyle: { width: '20%' }, rowStyle: { width: '20%' }, content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7__["Input"], { Field: 'Name', Record: item, Valid: function () { return true; }, Setter: function (ch) { return editChannel(ch); }, Label: '' }); }
                    },
                    {
                        key: 'Description', label: 'Desc', headerStyle: { width: '33%' }, rowStyle: { width: '33%' }, content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7__["Input"], { Field: 'Description', Record: item, Valid: function () { return true; }, Setter: function (ch) { return editChannel(ch); }, Label: '' }); }
                    },
                    {
                        key: 'MeasurementType', label: 'Type', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7__["Select"], { Field: 'MeasurementType', Record: item, Setter: function (ch) { return editChannel(ch); }, Label: '', Options: measurementTypes.map(function (t) { return ({ Value: t.Name, Label: t.Name }); }) }); }
                    },
                    {
                        key: 'Phase', label: 'Phase', headerStyle: { width: '10%' }, rowStyle: { width: '10%' }, content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7__["Select"], { Field: 'Phase', Record: item, Setter: function (ch) { return editChannel(ch); }, Label: '', Options: phases.map(function (t) { return ({ Value: t.Name, Label: t.Name }); }) }); }
                    },
                    { key: 'Adder', label: 'Adder', headerStyle: { width: '5%' }, rowStyle: { width: '5%' }, content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7__["Input"], { Field: 'Adder', Type: 'number', Record: item, Valid: function () { return true; }, Setter: function (ch) { return editChannel(ch); }, Label: '' }); } },
                    { key: 'Multiplier', label: 'Multiplier', headerStyle: { width: '7%' }, rowStyle: { width: '7%' }, content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_7__["Input"], { Field: 'Multiplier', Type: 'number', Record: item, Valid: function () { return true; }, Setter: function (ch) { return editChannel(ch); }, Label: '' }); } },
                    { key: null, label: '', headerStyle: { width: '10%' }, rowStyle: { width: '10%', paddingTop: 36, paddingBottom: 36 }, content: function (item) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return deleteChannel(item.ID); } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))); } },
                ], tableClass: "table table-hover", data: props.Channels, sortField: 'SourceIndexes', ascending: false, onSort: function (d) { }, onClick: function (fld) { }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: innerHeight - 460, }, rowStyle: { display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_8__["Warning"], { Show: showCFGError, Title: 'Error Parsing File', Message: 'File is not of type cfg. Please only use comtrade standard cfg files.', CallBack: function () { return setShowCFGError(false); } })));
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
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_12__);
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
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["AssetAttributes"].getNewAsset('Line')), 2), newEditAsset = _a[0], setNewEditAsset = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('New'), 2), newEdit = _b[0], setNewEdit = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showAssetModal = _c[0], setShowAssetModal = _c[1];
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
        var e = [];
        if (props.Assets.length == 0)
            e.push('At least 1 Assets needs to be set up.');
        props.SetError(e);
    }, [props.Assets.length]);
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
                    record.Detail = _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["AssetAttributes"].getNewLineDetails();
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
        setShowAssetModal(true);
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
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { width: '100%', height: window.innerHeight - 305, maxHeight: window.innerHeight - 305, overflowY: 'auto', padding: 0, margin: 0 } }, props.Channels.map(function (channel, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { style: { textDecoration: (channel.Asset.length > 0 ? 'line-through' : null) }, key: index }, channel.Name + ' - ' + channel.Description); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { padding: 20 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: 38 } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () { setNewEdit('New'); setShowAssetModal(true); } }, "Add Asset")),
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
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_12__["Modal"], { Show: showAssetModal, Title: newEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + newEditAsset.AssetKey + ' for Meter', ConfirmBtnClass: 'btn-success', ConfirmText: newEdit == 'Edit' ? 'Add' : 'Save', CancelBtnClass: 'btn-danger', CancelText: 'Close', Size: 'xlg', CallBack: function (confirm) {
                setShowAssetModal(false);
                if (!confirm) {
                    setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["AssetAttributes"].getNewAsset('Line'));
                    return;
                }
                var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](newEditAsset);
                var list = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Assets);
                var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.Channels);
                $.each(channels, function (index, channel) {
                    if (channel.Asset == record.AssetKey)
                        channel.Asset = '';
                    if (record.Channels.findIndex(function (c) { return c.ID == channel.ID; }) >= 0)
                        channel.Asset = record.AssetKey;
                });
                if (newEdit == 'New')
                    list.push(record);
                props.UpdateChannels(channels);
                props.UpdateAssets(list);
                setNewEditAsset(_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["AssetAttributes"].getNewAsset('Line'));
            }, DisableConfirm: newEdit == 'New' && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["AssetAttributes"].AttributeError(newEditAsset).length > 0, ConfirmShowToolTip: newEdit == 'New' && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["AssetAttributes"].AttributeError(newEditAsset).length > 0, ConfirmToolTipContent: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["AssetAttributes"].AttributeError(newEditAsset).map(function (e, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { key: i },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ErrorSymbol, null),
                " ",
                e); }) },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { maxHeight: innerHeight - 300, overflow: 'auto' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["AssetAttributes"].AssetAttributeFields, { Asset: newEditAsset, NewEdit: newEdit, AssetTypes: assetTypes, AllAssets: assets, UpdateState: setNewEditAsset, GetDifferentAsset: getDifferentAsset, HideAssetType: newEdit == 'Edit', HideSelectAsset: false })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, showAttributes()),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Associated Channels"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { multiple: true, style: { height: innerHeight - 330, width: '100%' }, onChange: function (evt) {
                            var asset = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](newEditAsset);
                            asset.Channels = $(evt.target).val().map(function (a) { return props.Channels[parseInt(a)]; });
                            setNewEditAsset(asset);
                        }, value: newEditAsset.Channels.map(function (a) { return a.ID.toString(); }) }, props.Channels.map(function (channel, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index, value: index, hidden: channel.Asset != newEditAsset.AssetKey && channel.Asset.length > 0 }, channel.Name + ' - ' + channel.Description); })))))));
}
var ErrorSymbol = function () { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { style: { marginRight: '10px', color: '#dc3545' }, className: "fa fa-exclamation-circle" }); };


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
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__);
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
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), showAssetConnection = _a[0], setShowAssetConnection = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](0), 2), assetIndex = _b[0], setAssetIndex = _b[1];
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
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { margin: -20, height: '100%' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col-lg-4", style: { height: '100%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { width: '100%', height: '100%', maxHeight: window.innerHeight - 285, overflowY: 'auto', padding: 0, margin: 0 } }, props.Assets.map(function (asset, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { style: { textDecoration: (index <= assetIndex ? 'line-through' : null) }, key: index }, asset.AssetKey); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { padding: 0, height: '100%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { height: '100%' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () { return setShowAssetConnection(true); }, disabled: props.Assets.length <= 1 }, "Add Connection"),
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
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-left", onClick: prev, hidden: false, disabled: assetIndex < 1 }, "Previous Asset"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: next, disabled: assetIndex == props.Assets.length - 1 }, "Next Asset"))))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_interactive__WEBPACK_IMPORTED_MODULE_4__["Modal"], { Show: showAssetConnection, Size: 'sm', Title: 'Add a Connection to ' + currentAsset.AssetKey, CancelText: 'Close', ConfirmText: 'Save', CallBack: function (confirmed) {
                setShowAssetConnection(false);
                if (!confirmed)
                    return;
                var childConnection = $(selectAsset.current).val();
                var connectionType = parseInt($(selectType.current).val());
                var assetConnections = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.AssetConnections);
                assetConnections.push({ ID: 0, AssetRelationshipTypeID: connectionType, Parent: currentAsset.AssetKey, Child: childConnection });
                props.UpdateAssetConnections(assetConnections);
            } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Select Connecting Asset"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { ref: selectAsset, className: "form-control", onChange: function (evt) { } }, props.Assets.filter(function (asset) { return asset.AssetKey != currentAsset.AssetKey; }).map(function (asset, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index, value: asset.AssetKey }, asset.AssetKey); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Select Connection Type"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { ref: selectType, className: "form-control", onChange: function (evt) {
                    } }, assetConnectionTypes.map(function (act, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index, value: act.ID }, act.Name); }))))));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9DRkdQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rUmVsYXkudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvTmV3TWV0ZXJXaXphcmQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTEudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTIudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTMudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBLHdHQUF3RztBQUN4Ryx3QkFBd0I7QUFDeEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3RztBQUl4RztJQUlJLG1CQUFZLFFBQWdCLEVBQUUsUUFBZ0I7UUFBOUMsaUJBUUM7UUFQRyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFB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V0FBVyxFQUFFLFNBQVMsRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFFLFVBQUMsR0FBRyxJQUFNLENBQUMsSUFFaEUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBSyxJQUFJLFlBQUssQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLElBQUssdUVBQVEsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFVLEVBQXJFLENBQXFFLENBQUMsQ0FFakssQ0FDUDtZQUNOLDZEQUFLLFNBQVMsRUFBQyxZQUFZO2dCQUN2Qiw0RkFBcUM7Z0JBQ3JDLGdFQUFRLEdBQUcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUUsVUFBQyxHQUFHO29CQUNoRSxDQUFDLElBRU8sb0JBQW9CLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLEtBQUssSUFBSyx1RUFBUSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQVUsRUFBdkQsQ0FBdUQsQ0FBQyxDQUVoRyxDQUNQLENBQ0YsQ0FDVCxDQUNOLENBQUM7QUFFTixDQUFDIiwiZmlsZSI6Ik5ld01ldGVyV2l6YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIENGR1BhcnNlci50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tIFwiLi4vVFNYL1N5c3RlbUNlbnRlci9nbG9iYWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENGR1BhcnNlciB7XHJcbiAgICBBbmFsb2dzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+O1xyXG4gICAgRGlnaXRhbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD47XHJcbiAgICBDaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPjtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnRzOiBzdHJpbmcsIG1ldGVyS2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IGNvbnRlbnRzLnNwbGl0KCdcXG4nKS5tYXAoYSA9PiBhLnNwbGl0KCcsJykpO1xyXG4gICAgICAgIGxldCBhbmFsb2dDb3VudHMgPSBwYXJzZUludChkYXRhWzFdWzFdLnNsaWNlKDAsIGRhdGFbMV1bMV0ubGVuZ3RoIC0gMSkpO1xyXG4gICAgICAgIGxldCBkaWdpdGFsQ291bnRzID0gcGFyc2VJbnQoZGF0YVsxXVsyXS5zbGljZSgwLCBkYXRhWzFdWzJdLmxlbmd0aCAtIDEpKTtcclxuXHJcbiAgICAgICAgdGhpcy5BbmFsb2dzID0gZGF0YS5zbGljZSgyLCBhbmFsb2dDb3VudHMgKyAyKS5tYXAoKGE6IEFycmF5PHN0cmluZz4sIGluZGV4KSA9PiB7IHJldHVybiB7IElEOiBpbmRleCwgTWV0ZXI6IG1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogdGhpcy5wYXJzZVR5cGUoYVs0XSksIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6IHRoaXMucGFyc2VQaGFzZShhWzJdKSwgTmFtZTogYVsxXSwgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246IGFbM10sIEVuYWJsZWQ6IHRydWUsIEFkZGVyOiAwLCBNdWx0aXBsaWVyOiAxLCBTZXJpZXM6IFt7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiBhWzBdIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsIH0pO1xyXG4gICAgICAgIHRoaXMuRGlnaXRhbHMgPSBkYXRhLnNsaWNlKDIgKyBhbmFsb2dDb3VudHMsIDIgKyBhbmFsb2dDb3VudHMgKyBkaWdpdGFsQ291bnRzKS5tYXAoKGE6IEFycmF5PHN0cmluZz4sIGluZGV4KSA9PiB7IHJldHVybiB7IElEOiBhbmFsb2dDb3VudHMgKyBpbmRleCwgTWV0ZXI6IG1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0RpZ2l0YWwnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiB0aGlzLnBhcnNlUGhhc2UoYVsyXSksIE5hbWU6IGFbMV0sIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIEFkZGVyOiAwLCBNdWx0aXBsaWVyOiAxLCBEZXNjcmlwdGlvbjogYVszXSwgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiBbeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogYVswXSB9IGFzIE9wZW5YREEuU2VyaWVzXSB9IGFzIE9wZW5YREEuQ2hhbm5lbCB9KVxyXG4gICAgICAgIHRoaXMuQ2hhbm5lbHMgPSB0aGlzLkFuYWxvZ3MuY29uY2F0KHRoaXMuRGlnaXRhbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlUGhhc2UodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDAgJiYgdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdBQic7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMCAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gJ0JDJztcclxuICAgICAgICBlbHNlIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ0EnO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQU4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQk4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYycpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ04nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignbicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnTkcnO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigncicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnUkVTJztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAnTm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2VUeXBlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3YnKSA+PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gJ1ZvbHRhZ2UnO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuICdDdXJyZW50JztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDYXBCYW5rUmVsYXkudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA4LzEyLzIwMjAgLSBDLiBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5pbXBvcnQgeyBBc3NldEF0dHJpYnV0ZXMgfSBmcm9tICcuL0Fzc2V0JztcclxuXHJcbmZ1bmN0aW9uIENhcEJhbmtSZWxheUF0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkNhcEJhbmtSZWxheSwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQ2FwQmFua1JlbGF5KSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuQ2FwQmFua1JlbGF5KSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnT25Wb2x0YWdlVGhyZXNoaG9sZCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiA8PlxyXG4gICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rUmVsYXk+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnT25Wb2x0YWdlVGhyZXNoaG9sZCd9IExhYmVsPXsnUmVsYXkgT24gVm9sdGFnZSBUaHJlc2hob2xkIChwdSknfSBGZWVkYmFjaz17J1JlbGF5IE9uIFZvbHRhZ2UgVGhyZXNoaG9sZCAocHUpIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgPC8+O1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FwQmFua1JlbGF5QXR0cmlidXRlczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTmV3TWV0ZXJXaXphcmQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgU2VsZWN0TWV0ZXJLZXlzTG93ZXJDYXNlLCBTZWxlY3RNZXRlclN0YXR1cywgRmV0Y2hNZXRlciB9IGZyb20gJy4uL1N0b3JlL01ldGVyU2xpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3RMb2NhdGlvbktleXNMb3dlckNhc2UsIFNlbGVjdExvY2F0aW9uU3RhdHVzLCBGZXRjaExvY2F0aW9uIH0gZnJvbSAnLi4vU3RvcmUvTG9jYXRpb25TbGljZSc7XHJcblxyXG5pbXBvcnQgUGFnZTEgZnJvbSAnLi9QYWdlMSc7XHJcbmltcG9ydCBQYWdlMiBmcm9tICcuL1BhZ2UyJztcclxuaW1wb3J0IFBhZ2UzIGZyb20gJy4vUGFnZTMnO1xyXG5pbXBvcnQgUGFnZTQgZnJvbSAnLi9QYWdlNCc7XHJcbmltcG9ydCBQYWdlNSBmcm9tICcuL1BhZ2U1JztcclxuaW1wb3J0IHsgVG9vbFRpcCB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBc3NldExpc3RzIHtcclxuICAgIEJyZWFrZXJzOiBBcnJheTxPcGVuWERBLkJyZWFrZXI+LFxyXG4gICAgQnVzZXM6IEFycmF5PE9wZW5YREEuQnJlYWtlcj4sXHJcbiAgICBDYXBCYW5rczogQXJyYXk8T3BlblhEQS5DYXBCYW5rPixcclxuICAgIExpbmVzOiBBcnJheTxPcGVuWERBLkxpbmU+LFxyXG4gICAgVHJhbnNmb3JtZXJzOiBBcnJheTxPcGVuWERBLlRyYW5zZm9ybWVyPlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOZXdNZXRlcldpemFyZChwcm9wczoge30pIHtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuXHJcbiAgICBjb25zdCBtZXRlcktleXMgPSB1c2VTZWxlY3RvcihTZWxlY3RNZXRlcktleXNMb3dlckNhc2UpO1xyXG4gICAgY29uc3QgbVN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdE1ldGVyU3RhdHVzKTtcclxuICAgIGNvbnN0IGxvY2F0aW9uS2V5cyA9IHVzZVNlbGVjdG9yKFNlbGVjdExvY2F0aW9uS2V5c0xvd2VyQ2FzZSk7XHJcbiAgICBjb25zdCBsU3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0TG9jYXRpb25TdGF0dXMpO1xyXG5cclxuICAgIGNvbnN0IFtjdXJyZW50U3RlcCwgc2V0Q3VycmVudFN0ZXBdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyPihnZXRDdXJyZW50U3RlcCgpKTtcclxuICAgIGNvbnN0IFttZXRlckluZm8sIHNldE1ldGVySW5mb10gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLk1ldGVyPihnZXRNZXRlckluZm8oKSk7XHJcbiAgICBjb25zdCBbbG9jYXRpb25JbmZvLCBzZXRMb2NhdGlvbkluZm9dID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Mb2NhdGlvbj4oZ2V0TG9jYXRpb25JbmZvKCkpO1xyXG4gICAgY29uc3QgW2NoYW5uZWxzLCBzZXRDaGFubmVsc10gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLkNoYW5uZWxbXT4oZ2V0Q2hhbm5lbHMoKSk7XHJcbiAgICBjb25zdCBbYXNzZXRzLCBzZXRBc3NldHNdID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5Bc3NldFtdPihnZXRBc3NldHMoKSk7XHJcbiAgICBjb25zdCBbYXNzZXRDb25uZWN0aW9ucywgc2V0QXNzZXRDb25uZWN0aW9uc10gPSBSZWFjdC51c2VTdGF0ZTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbltdPihnZXRBc3NldENvbm5lY3Rpb25zKCkpO1xyXG5cclxuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nW10+KFtdKTtcclxuICAgIGNvbnN0IFtob3Zlck5leHQsIHNldEhvdmVyTmV4dF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcbiAgICBcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChtU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgbVN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoTWV0ZXIoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIG1TdGF0dXNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChsU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgbFN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoTG9jYXRpb24oKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIGxTdGF0dXNdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcsIGN1cnJlbnRTdGVwLnRvU3RyaW5nKCkpXHJcbiAgICB9LCBbY3VycmVudFN0ZXBdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycsIEpTT04uc3RyaW5naWZ5KG1ldGVySW5mbykpO1xyXG4gICAgfSwgW21ldGVySW5mb10pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25JbmZvJywgSlNPTi5zdHJpbmdpZnkobG9jYXRpb25JbmZvKSk7XHJcbiAgICB9LCBbIGxvY2F0aW9uSW5mb10pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnLCBKU09OLnN0cmluZ2lmeShjaGFubmVscykpO1xyXG4gICAgfSwgW2NoYW5uZWxzXSk7XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldHMnLCBKU09OLnN0cmluZ2lmeShhc3NldHMpKTtcclxuICAgIH0sIFthc3NldHNdKTtcclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0Q29ubmVjdGlvbnMnLCBKU09OLnN0cmluZ2lmeShhc3NldENvbm5lY3Rpb25zKSk7XHJcbiAgICB9LCBbIGFzc2V0Q29ubmVjdGlvbnNdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRDdXJyZW50U3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIDFcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TWV0ZXJJbmZvKCk6IE9wZW5YREEuTWV0ZXIge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgSUQ6IDAsXHJcbiAgICAgICAgICAgICAgICBBc3NldEtleTogbnVsbCxcclxuICAgICAgICAgICAgICAgIE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBTaG9ydE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBBbGlhczogbnVsbCxcclxuICAgICAgICAgICAgICAgIE1ha2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBNb2RlbDogbnVsbCxcclxuICAgICAgICAgICAgICAgIFRpbWVab25lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgRGVzY3JpcHRpb246IG51bGwsXHJcbiAgICAgICAgICAgICAgICBMb2NhdGlvbklEOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRMb2NhdGlvbkluZm8oKTogT3BlblhEQS5Mb2NhdGlvbiB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25JbmZvJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uS2V5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIEFsaWFzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgU2hvcnROYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTGF0aXR1ZGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBMb25naXR1ZGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldENoYW5uZWxzKCk6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4ge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkNoYW5uZWxzJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DaGFubmVscycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEFzc2V0cygpOiBBcnJheTxPcGVuWERBLkJyZWFrZXIgfCBPcGVuWERBLkJ1cyB8IE9wZW5YREEuQ2FwQmFuayB8IE9wZW5YREEuTGluZSB8IE9wZW5YREEuVHJhbnNmb3JtZXI+XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRBc3NldENvbm5lY3Rpb25zKCk6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZE5ld01ldGVyKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50Pik6IHZvaWQge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyL05ld2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgTWV0ZXJJbmZvOiBtZXRlckluZm8sXHJcbiAgICAgICAgICAgICAgICBMb2NhdGlvbkluZm86IGxvY2F0aW9uSW5mbyxcclxuICAgICAgICAgICAgICAgIENoYW5uZWxzOiBjaGFubmVscyxcclxuICAgICAgICAgICAgICAgIEFzc2V0czogYXNzZXRzLFxyXG4gICAgICAgICAgICAgICAgQXNzZXRDb25uZWN0aW9uczogYXNzZXRDb25uZWN0aW9uc1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbD9uYW1lPU1ldGVycyc7XHJcbiAgICAgICAgfSkuZmFpbChtc2cgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXHJcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbD9uYW1lPU1ldGVycyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIGlmIChkaXNhYmxlTmV4dCgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc2V0RXJyb3IoW10pO1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBjdXJyZW50U3RlcCBpcyBzZXQgdG8gc29tZXRoaW5nIHJlYXNvbmFibGVcclxuICAgICAgICBpZiAoY3VycmVudFN0ZXAgPj0gNCkge1xyXG4gICAgICAgICAgIHNldEN1cnJlbnRTdGVwKDUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEN1cnJlbnRTdGVwKGN1cnJlbnRTdGVwICsgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmV2KCkge1xyXG4gICAgICAgIHNldEVycm9yKFtdKTtcclxuICAgICAgICBpZiAoY3VycmVudFN0ZXAgPD0gMSkge1xyXG4gICAgICAgICAgICBzZXRDdXJyZW50U3RlcCgxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRDdXJyZW50U3RlcChjdXJyZW50U3RlcCAtIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJywgY3VycmVudFN0ZXAudG9TdHJpbmcoKSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJEYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGNsZWFyTG9jYWxTdG9yYWdlKCk7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgc2V0TWV0ZXJJbmZvKGdldE1ldGVySW5mbygpKTtcclxuICAgICAgICBzZXRMb2NhdGlvbkluZm8oZ2V0TG9jYXRpb25JbmZvKCkpO1xyXG4gICAgICAgIHNldENoYW5uZWxzKGdldENoYW5uZWxzKCkpO1xyXG4gICAgICAgIHNldEN1cnJlbnRTdGVwKGdldEN1cnJlbnRTdGVwKCkpO1xyXG4gICAgICAgIHNldEFzc2V0cyhnZXRBc3NldHMoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJMb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlckluZm8nKVxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25JbmZvJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5DaGFubmVscycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnKVxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEhlYWRlcigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKGN1cnJlbnRTdGVwID09IDEpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgMTogR2VuZXJhbCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDI6IFN1YnN0YXRpb24gaW5mb3JtYXRpb24gZm9yIHRoZSBuZXcgbWV0ZXJcIlxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRTdGVwID09IDMpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgMzogUG9wdWxhdGUgY2hhbm5lbHMgZm9yIHRoZSBuZXcgbWV0ZXJcIlxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRTdGVwID09IDQpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgNDogUG9wdWxhdGUgYXNzZXRzIG1vbml0b3JlZCBieSB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSA1KVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDU6IEFkZCBjb25uZWN0aW9uIGJldHdlZW4gdGhlIGFzc2V0cyB0aGF0IGFyZSBtb25pdG9yZWQgYnkgdGhlIG5ldyBtZXRlclwiXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBhZ2UoKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwID09IDEpXHJcbiAgICAgICAgICAgIHJldHVybiA8UGFnZTEgTWV0ZXJJbmZvPXttZXRlckluZm99IFVwZGF0ZU1ldGVySW5mbz17c2V0TWV0ZXJJbmZvfSBTZXRFcnJvcj17c2V0RXJyb3J9IC8+XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gMilcclxuICAgICAgICAgICAgcmV0dXJuIDxQYWdlMiBMb2NhdGlvbkluZm89e2xvY2F0aW9uSW5mb30gVXBkYXRlTG9jYXRpb25JbmZvPXtzZXRMb2NhdGlvbkluZm99IFNldEVycm9yPXsoZSkgPT4geyBzZXRFcnJvcihlKSB9fS8+XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gMylcclxuICAgICAgICAgICAgcmV0dXJuIDxQYWdlMyBNZXRlcktleT17bWV0ZXJJbmZvLkFzc2V0S2V5fSBDaGFubmVscz17Y2hhbm5lbHN9IFVwZGF0ZUNoYW5uZWxzPXtzZXRDaGFubmVsc30gVXBkYXRlQXNzZXRzPXtzZXRBc3NldHN9IFNldEVycm9yPXtzZXRFcnJvcn0vPlxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRTdGVwID09IDQpXHJcbiAgICAgICAgICAgIHJldHVybiA8UGFnZTQgQXNzZXRDb25uZWN0aW9ucz17YXNzZXRDb25uZWN0aW9uc30gQ2hhbm5lbHM9e2NoYW5uZWxzfSBBc3NldHM9e2Fzc2V0c30gVXBkYXRlQ2hhbm5lbHM9e3NldENoYW5uZWxzfSBVcGRhdGVBc3NldHM9e3NldEFzc2V0c30gVXBkYXRlQXNzZXRDb25uZWN0aW9ucz17c2V0QXNzZXRDb25uZWN0aW9uc30gU2V0RXJyb3I9e3NldEVycm9yfS8+XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gNSlcclxuICAgICAgICAgICAgcmV0dXJuIDxQYWdlNSBBc3NldHM9e2Fzc2V0c30gQXNzZXRDb25uZWN0aW9ucz17YXNzZXRDb25uZWN0aW9uc30gVXBkYXRlQXNzZXRDb25uZWN0aW9ucz17c2V0QXNzZXRDb25uZWN0aW9uc30gLz5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlzYWJsZU5leHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwID09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yLmxlbmd0aCA+IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IubGVuZ3RoID4gMFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gY2hhbm5lbHMubGVuZ3RoID09IDA7XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFN0ZXAgPT0gNClcclxuICAgICAgICAgICAgcmV0dXJuIGFzc2V0cy5sZW5ndGggPT0gMDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17e3BhZGRpbmc6IDEwLCBoZWlnaHQ6ICdpbmhlcml0Jywgb3ZlcmZsb3dZOiAnaGlkZGVuJ319PlxyXG4gICAgICAgICAgICA8aDI+TmV3IE1ldGVyIFdpemFyZDwvaDI+XHJcbiAgICAgICAgICAgIDxoci8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7aGVpZ2h0OiAnY2FsYygxMDAlIC0gNzVweCknfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e2NsZWFyRGF0YX0gPkNsZWFyIERhdGE8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQgc3R5bGU9e3t3aWR0aDogJzkwJSd9fT57Z2V0SGVhZGVyKCl9PC9oND5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIiBzdHlsZT17e21heEhlaWdodDogJ2NhbGMoMTAwJSAtIDEyNnB4KSd9fT5cclxuICAgICAgICAgICAgICAgICAgICB7Z2V0UGFnZSgpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge2N1cnJlbnRTdGVwID4gMSA/IDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgcHVsbC1sZWZ0XCIgb25DbGljaz17cHJldn0+UHJldjwvYnV0dG9uPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAge2N1cnJlbnRTdGVwIDwgNSA/IDxidXR0b24gY2xhc3NOYW1lPXtcImJ0biBidG4tc3VjY2VzcyBwdWxsLXJpZ2h0XCIgKyAoZGlzYWJsZU5leHQoKSA/ICcgZGlzYWJsZWQnIDogJycpfSBvbkNsaWNrPXtuZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLXRvb2x0aXA9J05leHQnIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0SG92ZXJOZXh0KHRydWUpfSBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyTmV4dChmYWxzZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPk5leHQ8L2J1dHRvbj4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIHB1bGwtcmlnaHRcIiBvbkNsaWNrPXthZGROZXdNZXRlcn0gaGlkZGVuPXtjdXJyZW50U3RlcCA8IDV9PlN1Ym1pdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8VG9vbFRpcCBTaG93PXtob3Zlck5leHQgJiYgZXJyb3IubGVuZ3RoID4gMH0gUG9zaXRpb249eyd0b3AnfSBUaGVtZT17J2RhcmsnfSBUYXJnZXQ9e1wiTmV4dFwifT5cclxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3IubWFwKChpdGVtLCBpbmRleCkgPT4gPHAga2V5PXtpbmRleH0+IHtFcnJvclN5bWJvbCgpfSB7aXRlbX0gPC9wPil9XHJcbiAgICAgICAgICAgICAgICA8L1Rvb2xUaXA+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn1cclxuXHJcbmNvbnN0IEVycm9yU3ltYm9sID0gKCkgPT4gPGkgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JywgY29sb3I6ICcjZGMzNTQ1JyB9fSBjbGFzc05hbWU9XCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+XHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlMS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDMvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBTZWxlY3RNZXRlcktleXNMb3dlckNhc2UsIFNlbGVjdE1ldGVyU3RhdHVzLCBGZXRjaE1ldGVyIH0gZnJvbSAnLi4vU3RvcmUvTWV0ZXJTbGljZSc7XHJcbmltcG9ydCBNZXRlclByb3BlcnRpZXMgZnJvbSAnLi4vTWV0ZXIvUHJvcGVydHlVSS9NZXRlclByb3BlcnRpZXMnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UxKHByb3BzOiB7IE1ldGVySW5mbzogT3BlblhEQS5NZXRlciwgVXBkYXRlTWV0ZXJJbmZvOiAocmVjb3JkOiBPcGVuWERBLk1ldGVyKSA9PiB2b2lkICwgU2V0RXJyb3I6IChlOiBzdHJpbmdbXSkgPT4gdm9pZH0pIHtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIGNvbnN0IG1ldGVyS2V5cyA9IHVzZVNlbGVjdG9yKFNlbGVjdE1ldGVyS2V5c0xvd2VyQ2FzZSk7XHJcbiAgICBjb25zdCBtU3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0TWV0ZXJTdGF0dXMpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKG1TdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBtU3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hNZXRlcigpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtkaXNwYXRjaCwgbVN0YXR1c10pO1xyXG5cclxuICAgIFxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSBbXTtcclxuICAgICAgICBpZiAoIXZhbGlkKCdBc3NldEtleScpKVxyXG4gICAgICAgICAgICBlcnJvci5wdXNoKCdBIHVuaXF1ZSBBc3NldEtleSBvZiBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycyBpcyByZXF1aXJlZC4nKTtcclxuICAgIFxyXG4gICAgICAgIGlmICghdmFsaWQoJ05hbWUnKSlcclxuICAgICAgICAgICAgZXJyb3IucHVzaCgnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycyBhbmQgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICBcclxuICAgICAgICBpZiAoIXZhbGlkKCdTaG9ydE5hbWUnKSlcclxuICAgICAgICAgICAgZXJyb3IucHVzaCgnU2hvcnROYW1lIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJyk7XHJcblxyXG4gICAgICAgIGlmICghdmFsaWQoJ0FsaWFzJykpXHJcbiAgICAgICAgICAgIGVycm9yLnB1c2goJ0FsaWFzIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLicpO1xyXG4gICAgICAgIGlmICghdmFsaWQoJ01ha2UnKSlcclxuICAgICAgICAgICAgZXJyb3IucHVzaCgnTWFrZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nKTtcclxuICAgICAgICBpZiAoIXZhbGlkKCdNb2RlbCcpKVxyXG4gICAgICAgICAgICBlcnJvci5wdXNoKCdNb2RlbCBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nKTtcclxuXHJcbiAgICAgICAgcHJvcHMuU2V0RXJyb3IoZXJyb3IpO1xyXG4gICAgfSwgW3Byb3BzLk1ldGVySW5mbywgbWV0ZXJLZXlzXSlcclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuTWV0ZXIpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdBc3NldEtleScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlckluZm8uQXNzZXRLZXkgIT0gbnVsbCAmJiBtZXRlcktleXMuaW5kZXhPZihwcm9wcy5NZXRlckluZm8uQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkgPCAwICYmcHJvcHMuTWV0ZXJJbmZvLkFzc2V0S2V5Lmxlbmd0aCA+IDAgJiYgcHJvcHMuTWV0ZXJJbmZvLkFzc2V0S2V5Lmxlbmd0aCA8PSA1MDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlckluZm8uTmFtZSAhPSBudWxsICYmIHByb3BzLk1ldGVySW5mby5OYW1lLmxlbmd0aCA+IDAgJiYgcHJvcHMuTWV0ZXJJbmZvLk5hbWUubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQWxpYXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTWV0ZXJJbmZvLkFsaWFzID09IG51bGwgfHwgcHJvcHMuTWV0ZXJJbmZvLkFsaWFzLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Nob3J0TmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlckluZm8uU2hvcnROYW1lID09IG51bGwgfHwgcHJvcHMuTWV0ZXJJbmZvLlNob3J0TmFtZS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01ha2UnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTWV0ZXJJbmZvLk1ha2UgIT0gbnVsbCAmJiBwcm9wcy5NZXRlckluZm8uTWFrZS5sZW5ndGggPiAwICYmIHByb3BzLk1ldGVySW5mby5NYWtlLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01vZGVsJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5Nb2RlbCAhPSBudWxsICYmIHByb3BzLk1ldGVySW5mby5Nb2RlbC5sZW5ndGggPiAwICYmIHByb3BzLk1ldGVySW5mby5Nb2RlbC5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8TWV0ZXJQcm9wZXJ0aWVzIE1ldGVyPXtwcm9wcy5NZXRlckluZm99IFN0YXRlU2V0dGVyPXtwcm9wcy5VcGRhdGVNZXRlckluZm99IC8+XHJcbiAgICAgICAgKTtcclxuXHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlMS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDMvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgQXNzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdExvY2F0aW9ucywgU2VsZWN0TG9jYXRpb25TdGF0dXMsIEZldGNoTG9jYXRpb24gfSBmcm9tICcuLi9TdG9yZS9Mb2NhdGlvblNsaWNlJztcclxuaW1wb3J0IE1ldGVyTG9jYXRpb25Qcm9wZXJ0aWVzIGZyb20gJy4uL01ldGVyL1Byb3BlcnR5VUkvTWV0ZXJMb2NhdGlvblByb3BlcnRpZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZTIocHJvcHM6IHsgTG9jYXRpb25JbmZvOiBPcGVuWERBLkxvY2F0aW9uLCBVcGRhdGVMb2NhdGlvbkluZm86IChyZWNvcmQ6IE9wZW5YREEuTG9jYXRpb24pID0+IHZvaWQsIFNldEVycm9yOiAoZTogc3RyaW5nW10pID0+IHZvaWQgIH0pIHtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIGNvbnN0IGxvY2F0aW9ucyA9IHVzZVNlbGVjdG9yKFNlbGVjdExvY2F0aW9ucyk7XHJcbiAgICBjb25zdCBsU3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0TG9jYXRpb25TdGF0dXMpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGxTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBsU3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKHR6U3RhdHVzID09ICdsb2FkaW5nJykgcHJvbWlzZS5hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCBsU3RhdHVzXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBlcnJvciA9IFtdO1xyXG5cclxuICAgICAgICBpZiAocHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5ID09IG51bGwgfHwgcHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5Lmxlbmd0aCA9PSAwIHx8IHByb3BzLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleS5sZW5ndGggPiA1MClcclxuICAgICAgICAgICAgZXJyb3IucHVzaCgnS2V5IGlzIHJlcXVpcmVkIGFuZCBuZWVkcyB0byBiZSBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycy4nKVxyXG4gICAgICAgIGVsc2UgaWYgKHByb3BzLkxvY2F0aW9uSW5mby5JRCA9PSAwICYmIGxvY2F0aW9ucy5maW5kKGxvY3MgPT4gbG9jcy5Mb2NhdGlvbktleS50b0xvd2VyQ2FzZSgpID09IHByb3BzLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleS50b0xvd2VyQ2FzZSgpKSAhPSBudWxsKVxyXG4gICAgICAgICAgICBlcnJvci5wdXNoKCdLZXkgbmVlZHMgdG8gYmUgdW5pcXVlLicpO1xyXG4gICAgICAgIGlmIChwcm9wcy5Mb2NhdGlvbkluZm8uTmFtZSA9PSBudWxsIHx8IHByb3BzLkxvY2F0aW9uSW5mby5OYW1lLmxlbmd0aCA9PSAwIHx8IHByb3BzLkxvY2F0aW9uSW5mby5OYW1lLmxlbmd0aCA+IDIwMClcclxuICAgICAgICAgICAgZXJyb3IucHVzaCgnTmFtZSBpcyByZXF1aXJlZCBhbmQgbmVlZHMgdG8gYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLicpO1xyXG4gICAgICAgIGlmIChwcm9wcy5Mb2NhdGlvbkluZm8uU2hvcnROYW1lICE9IG51bGwgJiYgcHJvcHMuTG9jYXRpb25JbmZvLlNob3J0TmFtZS5sZW5ndGggPiA1MClcclxuICAgICAgICAgICAgZXJyb3IucHVzaCgnU2hvcnROYW1lIG5lZWRzIHRvIGJlIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzLicpO1xyXG4gICAgICAgIGlmIChwcm9wcy5Mb2NhdGlvbkluZm8uQWxpYXMgIT0gbnVsbCAmJiBwcm9wcy5Mb2NhdGlvbkluZm8uQWxpYXMubGVuZ3RoID4yMDApXHJcbiAgICAgICAgICAgIGVycm9yLnB1c2goJ0FsaWFzIG5lZWRzIHRvIGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nKTtcclxuICAgICAgICBpZiAocHJvcHMuTG9jYXRpb25JbmZvLkxhdGl0dWRlID09IG51bGwgfHwgIUFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuTG9jYXRpb25JbmZvLkxhdGl0dWRlKSlcclxuICAgICAgICAgICAgZXJyb3IucHVzaCgnTGF0aXR1ZGUgaXMgcmVxdWlyZWQuJylcclxuICAgICAgICBpZiAocHJvcHMuTG9jYXRpb25JbmZvLkxvbmdpdHVkZSA9PSBudWxsIHx8ICFBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkxvY2F0aW9uSW5mby5Mb25naXR1ZGUpKVxyXG4gICAgICAgICAgICBlcnJvci5wdXNoKCdMb25naXR1ZGUgaXMgcmVxdWlyZWQuJylcclxuXHJcbiAgICAgICAgcHJvcHMuU2V0RXJyb3IoZXJyb3IpO1xyXG5cclxuICAgIH0sIFtwcm9wcy5Mb2NhdGlvbkluZm8sIHByb3BzLlNldEVycm9yXSk7XHJcblxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREaWZmZXJlbnRNZXRlckxvY2F0aW9uKG1ldGVyTG9jYXRpb25JRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgcHJvcHMuVXBkYXRlTG9jYXRpb25JbmZvKGxvY2F0aW9ucy5maW5kKCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkgPT4gdmFsdWUuSUQgPT0gbWV0ZXJMb2NhdGlvbklEKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPE1ldGVyTG9jYXRpb25Qcm9wZXJ0aWVzIE1ldGVyPXt7TG9jYXRpb25JRDogcHJvcHMuTG9jYXRpb25JbmZvLklEID09IG51bGwgPyAnMCcgOiBwcm9wcy5Mb2NhdGlvbkluZm8uSUR9IGFzIE9wZW5YREEuTWV0ZXJ9IExvY2F0aW9uPXtwcm9wcy5Mb2NhdGlvbkluZm99IFNldExvY2F0aW9uPXtwcm9wcy5VcGRhdGVMb2NhdGlvbkluZm99IFxyXG4gICAgICAgICAgICBVcGRhdGVNZXRlcj17KG0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtLkxvY2F0aW9uSUQgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICBnZXREaWZmZXJlbnRNZXRlckxvY2F0aW9uKG0uTG9jYXRpb25JRClcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVMb2NhdGlvbkluZm8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25LZXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWxpYXM6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTaG9ydE5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMYXRpdHVkZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9uZ2l0dWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIExvY2F0aW9ubGlzdD17bG9jYXRpb25zICE9IG51bGwgPyBsb2NhdGlvbnMgOiBbXX0gRGlzYWJsZUxvY2F0aW9uPXtwcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0gLz5cclxuICAgICAgICAgXHJcbiAgICAgICAgKTtcclxuXHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlMy50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDMvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgQ0ZHUGFyc2VyIGZyb20gJy4uLy4uLy4uL1RTL0NGR1BhcnNlcic7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgU2VsZWN0TWVhc3VyZW1lbnRUeXBlcywgU2VsZWN0TWVhc3VyZW1lbnRUeXBlU3RhdHVzLCBGZXRjaE1lYXN1cmVtZW50VHlwZSB9IGZyb20gJy4uL1N0b3JlL01lYXN1cmVtZW50VHlwZVNsaWNlJztcclxuaW1wb3J0IHsgU2VsZWN0UGhhc2VTdGF0dXMsIFNlbGVjdFBoYXNlcywgRmV0Y2hQaGFzZSB9IGZyb20gJy4uL1N0b3JlL1BoYXNlU2xpY2UnO1xyXG5pbXBvcnQgVGFibGUgZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC10YWJsZSdcclxuaW1wb3J0IHsgSW5wdXQsIFNlbGVjdCB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtZm9ybXMnO1xyXG5pbXBvcnQgeyBXYXJuaW5nIH0gZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZSc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZTMocHJvcHM6IHsgTWV0ZXJLZXk6IHN0cmluZywgQ2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4sIFVwZGF0ZUNoYW5uZWxzOiAocmVjb3JkOiBPcGVuWERBLkNoYW5uZWxbXSkgPT4gdm9pZCwgVXBkYXRlQXNzZXRzOiAocmVjb3JkOiBPcGVuWERBLkFzc2V0W10pID0+IHZvaWQsIFNldEVycm9yOiAoZTogc3RyaW5nW10pID0+IHZvaWQgIH0pIHtcclxuICAgIGNvbnN0IGZpbGVJbnB1dCA9IFJlYWN0LnVzZVJlZihudWxsKTtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIGNvbnN0IG1lYXN1cmVtZW50VHlwZXMgPSB1c2VTZWxlY3RvcihTZWxlY3RNZWFzdXJlbWVudFR5cGVzKTtcclxuICAgIGNvbnN0IG10U3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0TWVhc3VyZW1lbnRUeXBlU3RhdHVzKSBhcyBTeXN0ZW1DZW50ZXIuU3RhdHVzO1xyXG4gICAgY29uc3QgcGhhc2VzID0gdXNlU2VsZWN0b3IoU2VsZWN0UGhhc2VzKTtcclxuICAgIGNvbnN0IHBoU3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0UGhhc2VTdGF0dXMpIGFzIFN5c3RlbUNlbnRlci5TdGF0dXM7XHJcbiAgICBjb25zdCBbc2hvd0NGR0Vycm9yLCBzZXRTaG93Q0ZHRXJyb3JdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgJChcIi5jdXN0b20tZmlsZS1pbnB1dFwiKS5vbihcImNoYW5nZVwiLCAoZXZ0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGZpbGVOYW1lID0gKGV2dCBhcyBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikudGFyZ2V0LnZhbHVlLnNwbGl0KFwiXFxcXFwiKS5wb3AoKTtcclxuICAgICAgICAgICAgJChmaWxlSW5wdXQpLnNpYmxpbmdzKFwiLmN1c3RvbS1maWxlLWxhYmVsXCIpLmFkZENsYXNzKFwic2VsZWN0ZWRcIikuaHRtbChmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgIHJlYWRTaW5nbGVGaWxlKChldnQgYXMgUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICAkKFwiLmN1c3RvbS1maWxlLWlucHV0XCIpLm9mZignY2hhbmdlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW10pXHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAobXRTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBtdFN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKEZldGNoTWVhc3VyZW1lbnRUeXBlKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCBtdFN0YXR1c10pO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHBoU3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgcGhTdGF0dXMgPT09ICdjaGFuZ2VkJykge1xyXG4gICAgICAgICAgICBkaXNwYXRjaChGZXRjaFBoYXNlKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2Rpc3BhdGNoLCBwaFN0YXR1c10pO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGUgPSBbXTtcclxuICAgICAgICBpZiAocHJvcHMuQ2hhbm5lbHMubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIGUucHVzaCgnQXQgTGVhc3QgMSBDaGFubmVsIGhhcyB0byBiZSBzZXQgdXAuJyk7XHJcbiAgICAgICAgcHJvcHMuU2V0RXJyb3IoZSk7XHJcbiAgICB9LCBbcHJvcHMuQ2hhbm5lbHNdKTtcclxuXHJcbiAgICBmdW5jdGlvbiByZWFkU2luZ2xlRmlsZShldnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgLy9SZXRyaWV2ZSB0aGUgZmlyc3QgKGFuZCBvbmx5ISkgRmlsZSBmcm9tIHRoZSBGaWxlTGlzdCBvYmplY3RcclxuICAgICAgICB2YXIgZiA9IGV2dC50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgICAgaWYgKGYpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICByLm9ubG9hZCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudHMgPSBlLnRhcmdldC5yZXN1bHQgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwYXJzZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGYubmFtZS5pbmRleE9mKCcuY2ZnJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlciA9IG5ldyBDRkdQYXJzZXIoY29udGVudHMsIHByb3BzLk1ldGVyS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhwYXJzZXIuQ2hhbm5lbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQXNzZXRzQ2hhbm5lbHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0NGR0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgci5yZWFkQXNUZXh0KGYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVDaGFubmVsKGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBfLmNsb25lKHByb3BzLkNoYW5uZWxzKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBjaGFubmVscy5maW5kSW5kZXgoY2ggPT4gY2guSUQgPT0gaWQpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCByZWNvcmQ6IE9wZW5YREEuQ2hhbm5lbCA9IGNoYW5uZWxzLnNwbGljZShpbmRleCwgMSlbMF07XHJcbiAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoY2hhbm5lbHMpO1xyXG5cclxuICAgICAgICBpZiAocmVjb3JkLkFzc2V0ID09ICcnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBhc3NldHM6QXJyYXk8T3BlblhEQS5Bc3NldD4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSk7XHJcblxyXG4gICAgICAgIGlmIChhc3NldHMgIT0gbnVsbCAmJiBhc3NldHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgYXNzZXQgPSBhc3NldHMuZmluZChhID0+IGEuQXNzZXRLZXkgPT0gcmVjb3JkLkFzc2V0KVxyXG4gICAgICAgICAgICBpZiAoYXNzZXQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoYW5uZWxJbmRleCA9IGFzc2V0LkNoYW5uZWxzLmZpbmRJbmRleChjID0+IGMuSUQgPSByZWNvcmQuSUQpO1xyXG4gICAgICAgICAgICBpZiAoY2hhbm5lbEluZGV4IDwgMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgYXNzZXQuQ2hhbm5lbHMuc3BsaWNlKGNoYW5uZWxJbmRleCwxKVxyXG4gICAgICAgICAgICBwcm9wcy5VcGRhdGVBc3NldHMoYXNzZXRzKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyQXNzZXRzQ2hhbm5lbHMoKTp2b2lkIHtcclxuICAgICAgICBsZXQgYXNzZXRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpO1xyXG5cclxuICAgICAgICBpZiAoYXNzZXRzICE9IG51bGwgJiYgYXNzZXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgJC5lYWNoKGFzc2V0cywgKGluZGV4LCBhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXNzZXQuQ2hhbm5lbHMgPSBbXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcHJvcHMuVXBkYXRlQXNzZXRzKGFzc2V0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVkaXRDaGFubmVsKGNoYW5uZWw6IE9wZW5YREEuQ2hhbm5lbCkge1xyXG4gICAgICAgIGxldCBpbmRleCA9IHByb3BzLkNoYW5uZWxzLmZpbmRJbmRleChjaCA9PiBjaC5JRCA9PSBjaGFubmVsLklEKTtcclxuICAgICAgICBsZXQgdXBkYXRlZCA9IF8uY2xvbmVEZWVwKHByb3BzLkNoYW5uZWxzKVxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKVxyXG4gICAgICAgICAgICB1cGRhdGVkW2luZGV4XSA9IGNoYW5uZWw7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB1cGRhdGVkLnB1c2goY2hhbm5lbCk7XHJcbiAgICAgXHJcbiAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHModXBkYXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMCwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQU4nLCBOYW1lOiAnVkFOJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBBTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogW3sgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMSwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQk4nLCBOYW1lOiAnVkJOJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBCTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogW3sgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMiwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQ04nLCBOYW1lOiAnVkNOJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBDTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogW3sgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMywgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0N1cnJlbnQnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQU4nLCBOYW1lOiAnSUEnLCBBZGRlcjogMCwgTXVsdGlwbGllcjogMSwgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdDdXJyZW50IEEnLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IFt7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzXSB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDQsIE1ldGVyOiBwcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdDdXJyZW50JywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0JOJywgTmFtZTogJ0lCJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnQ3VycmVudCBCJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiBbeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllc10gfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiA1LCBNZXRlcjogcHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnQ3VycmVudCcsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdDTicsIE5hbWU6ICdJQycsIEFkZGVyOiAwLCBNdWx0aXBsaWVyOiAxLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ0N1cnJlbnQgQycsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogW3sgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogNiwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0N1cnJlbnQnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnUkVTJywgTmFtZTogJ0lSJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnQ3VycmVudCBSRVMnLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IFt7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzXSB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoY2hhbm5lbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFzc2V0c0NoYW5uZWxzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0+RGVmYXVsdCBTZXR1cDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VzdG9tLWZpbGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGNsYXNzTmFtZT1cImN1c3RvbS1maWxlLWlucHV0XCIgcmVmPXtmaWxlSW5wdXR9IGFjY2VwdD1cIi5jZmcsLnBhclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY3VzdG9tLWZpbGUtbGFiZWxcIj5DaG9vc2UgYSBjb210cmFkZSBzdGFuZGFyZCBjZmcgZmlsZSBpZiBhcHBsaWNhYmxlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWw6IE9wZW5YREEuQ2hhbm5lbCA9IHsgSUQ6IHByb3BzLkNoYW5uZWxzLmxlbmd0aCA9PSAwID8gMSA6IE1hdGgubWF4KC4uLnByb3BzLkNoYW5uZWxzLm1hcChjaCA9PiBjaC5JRCkpICsgMSwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQU4nLCBOYW1lOiAnVkFOJywgQWRkZXI6IDAsIE11bHRpcGxpZXI6IDEsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBBTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogW3sgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXNdIH0gYXMgT3BlblhEQS5DaGFubmVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUocHJvcHMuQ2hhbm5lbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVscy5wdXNoKGNoYW5uZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhjaGFubmVscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0+QWRkIENoYW5uZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiBpbm5lckhlaWdodCAtIDM4MCwgcGFkZGluZzogMzAgfX0+XHJcbiAgICAgICAgICAgICAgICA8VGFibGU8T3BlblhEQS5DaGFubmVsPiBjb2xzPXtbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdTZXJpZXMnLCBsYWJlbDogJ0NoYW5uZWwnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzUlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzUlJyB9LCBjb250ZW50OiAoaXRlbSkgPT4gPElucHV0PE9wZW5YREEuU2VyaWVzPiBGaWVsZD17J1NvdXJjZUluZGV4ZXMnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVjb3JkPXtpdGVtLlNlcmllc1swXX0gU2V0dGVyPXsoc2VyaWVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLlNlcmllc1swXS5Tb3VyY2VJbmRleGVzID0gc2VyaWVzLlNvdXJjZUluZGV4ZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlZGl0Q2hhbm5lbChpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fSBMYWJlbD17Jyd9IFZhbGlkPXsoKSA9PiB0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ05hbWUnLCBsYWJlbDogJ05hbWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzIwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcyMCUnIH0sIGNvbnRlbnQ6IChpdGVtKSA9PiA8SW5wdXQ8T3BlblhEQS5DaGFubmVsPiBGaWVsZD17J05hbWUnfSBSZWNvcmQ9e2l0ZW19IFZhbGlkPXsoKSA9PiB0cnVlfSBTZXR0ZXI9eyhjaCkgPT4gZWRpdENoYW5uZWwoY2gpfSBMYWJlbD17Jyd9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ0Rlc2NyaXB0aW9uJywgbGFiZWw6ICdEZXNjJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICczMyUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMzMlJyB9LCBjb250ZW50OiAoaXRlbSkgPT4gPElucHV0PE9wZW5YREEuQ2hhbm5lbD4gRmllbGQ9eydEZXNjcmlwdGlvbid9IFJlY29yZD17aXRlbX0gVmFsaWQ9eygpID0+IHRydWV9IFNldHRlcj17KGNoKSA9PiBlZGl0Q2hhbm5lbChjaCl9IExhYmVsPXsnJ30gLz5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnTWVhc3VyZW1lbnRUeXBlJywgbGFiZWw6ICdUeXBlJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCBjb250ZW50OiAoaXRlbSkgPT4gPFNlbGVjdDxPcGVuWERBLkNoYW5uZWw+IEZpZWxkPXsnTWVhc3VyZW1lbnRUeXBlJ30gUmVjb3JkPXtpdGVtfSBTZXR0ZXI9eyhjaCkgPT4gZWRpdENoYW5uZWwoY2gpfSBMYWJlbD17Jyd9IE9wdGlvbnM9eyhtZWFzdXJlbWVudFR5cGVzIGFzIE9wZW5YREEuTWVhc3VyZW1lbnRUeXBlW10pLm1hcCgodCkgPT4gKHsgVmFsdWU6IHQuTmFtZSwgTGFiZWw6IHQuTmFtZSB9KSl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ1BoYXNlJywgbGFiZWw6ICdQaGFzZScsIGhlYWRlclN0eWxlOiB7IHdpZHRoOiAnMTAlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgY29udGVudDogKGl0ZW0pID0+IDxTZWxlY3Q8T3BlblhEQS5DaGFubmVsPiBGaWVsZD17J1BoYXNlJ30gUmVjb3JkPXtpdGVtfSBTZXR0ZXI9eyhjaCkgPT4gZWRpdENoYW5uZWwoY2gpfSBMYWJlbD17Jyd9IE9wdGlvbnM9eyhwaGFzZXMgYXMgT3BlblhEQS5QaGFzZVtdKS5tYXAoKHQpID0+ICh7IFZhbHVlOiB0Lk5hbWUsIExhYmVsOiB0Lk5hbWUgfSkpfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdBZGRlcicsIGxhYmVsOiAnQWRkZXInLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzUlJyB9LCByb3dTdHlsZTogeyB3aWR0aDogJzUlJyB9LCBjb250ZW50OiAoaXRlbSkgPT4gPElucHV0PE9wZW5YREEuQ2hhbm5lbD4gRmllbGQ9eydBZGRlcid9IFR5cGU9eydudW1iZXInfSBSZWNvcmQ9e2l0ZW19IFZhbGlkPXsoKSA9PiB0cnVlfSBTZXR0ZXI9eyhjaCkgPT4gZWRpdENoYW5uZWwoY2gpfSBMYWJlbD17Jyd9IC8+IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdNdWx0aXBsaWVyJywgbGFiZWw6ICdNdWx0aXBsaWVyJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICc3JScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICc3JScgfSwgY29udGVudDogKGl0ZW0pID0+IDxJbnB1dDxPcGVuWERBLkNoYW5uZWw+IEZpZWxkPXsnTXVsdGlwbGllcid9IFR5cGU9eydudW1iZXInfSBSZWNvcmQ9e2l0ZW19IFZhbGlkPXsoKSA9PiB0cnVlfSBTZXR0ZXI9eyhjaCkgPT4gZWRpdENoYW5uZWwoY2gpfSBMYWJlbD17Jyd9IC8+IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJywgcGFkZGluZ1RvcDogMzYsIHBhZGRpbmdCb3R0b206IDM2IH0sIGNvbnRlbnQ6IChpdGVtKSA9PiA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4gZGVsZXRlQ2hhbm5lbChpdGVtLklEKX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICB0YWJsZUNsYXNzPVwidGFibGUgdGFibGUtaG92ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE9e3Byb3BzLkNoYW5uZWxzfVxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRGaWVsZD17J1NvdXJjZUluZGV4ZXMnfVxyXG4gICAgICAgICAgICAgICAgICAgIGFzY2VuZGluZz17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Tb3J0PXsoZCkgPT4ge319XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGZsZCkgPT4geyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHRoZWFkU3R5bGU9e3sgZm9udFNpemU6ICdzbWFsbGVyJywgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICB0Ym9keVN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93WTogJ3Njcm9sbCcsIG1heEhlaWdodDogaW5uZXJIZWlnaHQgLSA0NjAsIH19XHJcbiAgICAgICAgICAgICAgICAgICAgcm93U3R5bGU9e3sgZGlzcGxheTogJ3RhYmxlJywgdGFibGVMYXlvdXQ6ICdmaXhlZCcsIHdpZHRoOiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17KGl0ZW0pID0+IGZhbHNlfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxXYXJuaW5nIFNob3c9e3Nob3dDRkdFcnJvcn0gVGl0bGU9eydFcnJvciBQYXJzaW5nIEZpbGUnfSBNZXNzYWdlPXsnRmlsZSBpcyBub3Qgb2YgdHlwZSBjZmcuIFBsZWFzZSBvbmx5IHVzZSBjb210cmFkZSBzdGFuZGFyZCBjZmcgZmlsZXMuJ30gQ2FsbEJhY2s9eygpID0+IHNldFNob3dDRkdFcnJvcihmYWxzZSl9IC8+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICA8Lz5cclxuICAgICAgICApO1xyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFBhZ2U0LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgQnJlYWtlckF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQnJlYWtlcic7XHJcbmltcG9ydCBCdXNBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0J1cyc7XHJcbmltcG9ydCBDYXBCYW5rQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rJztcclxuaW1wb3J0IExpbmVBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0xpbmUnO1xyXG5pbXBvcnQgVHJhbnNmb3JtZXJBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL1RyYW5zZm9ybWVyJztcclxuaW1wb3J0IHsgQXNzZXRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xyXG5pbXBvcnQgQ2FwQmFua1JlbGF5QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rUmVsYXknO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdEFzc2V0VHlwZXMsIFNlbGVjdEFzc2V0VHlwZVN0YXR1cywgRmV0Y2hBc3NldFR5cGUgfSBmcm9tICcuLi9TdG9yZS9Bc3NldFR5cGVTbGljZSc7XHJcbmltcG9ydCB7IFNlbGVjdEFzc2V0U3RhdHVzLCBGZXRjaEFzc2V0LCBTZWxlY3RBc3NldHMgfSBmcm9tICcuLi9TdG9yZS9Bc3NldFNsaWNlJztcclxuaW1wb3J0IHsgTW9kYWwgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWludGVyYWN0aXZlJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5pbnRlcmZhY2UgUGFnZTRQcm9wcyB7XHJcbiAgICBBc3NldHM6IEFycmF5PE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lciB8IE9wZW5YREEuQ2FwQmFua1JlbGF5PixcclxuICAgIENoYW5uZWxzOiBPcGVuWERBLkNoYW5uZWxbXSxcclxuICAgIEFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPixcclxuICAgIFVwZGF0ZUNoYW5uZWxzOiAocmVjb3JkOiBPcGVuWERBLkNoYW5uZWxbXSkgPT4gdm9pZCxcclxuICAgIFVwZGF0ZUFzc2V0czogKHJlY29yZDogT3BlblhEQS5Bc3NldFtdKSA9PiB2b2lkLFxyXG4gICAgVXBkYXRlQXNzZXRDb25uZWN0aW9uczogKHJlY29yZDogT3BlblhEQS5Bc3NldENvbm5lY3Rpb25bXSkgPT4gdm9pZCxcclxuICAgIFNldEVycm9yOiAoZTogc3RyaW5nW10pID0+IHZvaWRcclxuXHJcbn1cclxuXHJcbnR5cGUgQXNzZXRUeXBlID0gT3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLlRyYW5zZm9ybWVyIHwgT3BlblhEQS5DYXBCYW5rUmVsYXk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYWdlNChwcm9wczogUGFnZTRQcm9wcykge1xyXG4gICAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG4gICAgY29uc3QgYXNzZXRUeXBlcyA9IHVzZVNlbGVjdG9yKFNlbGVjdEFzc2V0VHlwZXMpO1xyXG4gICAgY29uc3QgYXRTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RBc3NldFR5cGVTdGF0dXMpO1xyXG4gICAgY29uc3QgYXNzZXRzID0gdXNlU2VsZWN0b3IoU2VsZWN0QXNzZXRzKTtcclxuICAgIGNvbnN0IGFTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RBc3NldFN0YXR1cyk7XHJcblxyXG4gICAgY29uc3QgW25ld0VkaXRBc3NldCwgc2V0TmV3RWRpdEFzc2V0XSA9IFJlYWN0LnVzZVN0YXRlPEFzc2V0VHlwZT4oQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xyXG4gICAgY29uc3QgW25ld0VkaXQsIHNldE5ld0VkaXRdID0gUmVhY3QudXNlU3RhdGU8J05ldycgfCAnRWRpdCc+KCdOZXcnKTtcclxuICAgIGNvbnN0IFtzaG93QXNzZXRNb2RhbCwgc2V0U2hvd0Fzc2V0TW9kYWxdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGF0U3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgYXRTdGF0dXMgPT09ICdjaGFuZ2VkJykge1xyXG4gICAgICAgICAgICBkaXNwYXRjaChGZXRjaEFzc2V0VHlwZSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtkaXNwYXRjaCwgYXRTdGF0dXNdKTtcclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGFTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBhU3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgZGlzcGF0Y2goRmV0Y2hBc3NldCgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtkaXNwYXRjaCwgYVN0YXR1c10pO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGUgPSBbXTtcclxuICAgICAgICBpZiAocHJvcHMuQXNzZXRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICBlLnB1c2goJ0F0IGxlYXN0IDEgQXNzZXRzIG5lZWRzIHRvIGJlIHNldCB1cC4nKTtcclxuICAgICAgICBwcm9wcy5TZXRFcnJvcihlKVxyXG4gICAgfSwgW3Byb3BzLkFzc2V0cy5sZW5ndGhdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCcmVha2VyJykge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gZ2V0RUROQVBvaW50KG5ld0VkaXRBc3NldC5JRCk7XHJcbiAgICAgICAgICAgIGhhbmRsZS5kb25lKChlZG5hUG9pbnQ6IE9wZW5YREEuRUROQVBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjb3JkID0geyAuLi5uZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5CcmVha2VyIH07XHJcbiAgICAgICAgICAgICAgICBpZiAoZWRuYVBvaW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZC5FRE5BUG9pbnQgPSBlZG5hUG9pbnQuUG9pbnRcclxuICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQocmVjb3JkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9PSB1bmRlZmluZWQpIGhhbmRsZS5hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdMaW5lJyl7XHJcbiAgICAgICAgICAgIGxldCBoYW5kbGUgPSBnZXRMaW5lU2VnbWVudChuZXdFZGl0QXNzZXQuSUQpO1xyXG4gICAgICAgICAgICBoYW5kbGUuZG9uZSgobGluZVNlZ21lbnQ6IE9wZW5YREEuTGluZURldGFpbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY29yZCA9IF8uY2xvbmUobmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuTGluZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGluZVNlZ21lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkLkRldGFpbCA9IGxpbmVTZWdtZW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmQuRGV0YWlsID0gQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0xpbmVEZXRhaWxzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KHJlY29yZCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPT0gdW5kZWZpbmVkKSBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgfSwgW25ld0VkaXRBc3NldC5Bc3NldFR5cGVdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBlZGl0QXNzZXQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHNldE5ld0VkaXQoJ0VkaXQnKTtcclxuICAgICAgICBzZXROZXdFZGl0QXNzZXQocHJvcHMuQXNzZXRzW2luZGV4XSk7XHJcbiAgICAgICAgc2V0U2hvd0Fzc2V0TW9kYWwodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlQXNzZXQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBsaXN0ID0gXy5jbG9uZShwcm9wcy5Bc3NldHMpO1xyXG4gICAgICAgIGxldCByZWNvcmQ6IEFycmF5PE9wZW5YREEuQXNzZXQ+ID0gbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIGxldCBhc3NldENvbm5lY3Rpb25zOiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbj4gPSBfLmNsb25lKHByb3BzLkFzc2V0Q29ubmVjdGlvbnMpO1xyXG4gICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUocHJvcHMuQ2hhbm5lbHMpO1xyXG5cclxuICAgICAgICAkLmVhY2goY2hhbm5lbHMsIChpbmRleCwgY2hhbm5lbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hhbm5lbC5Bc3NldCA9PSByZWNvcmRbMF0uQXNzZXRLZXkpXHJcbiAgICAgICAgICAgICAgICBjaGFubmVsLkFzc2V0ID0gJydcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGluZGV4ID0gYXNzZXRDb25uZWN0aW9ucy5maW5kSW5kZXgoYXNzZXRDb25uZWN0aW9uID0+IGFzc2V0Q29ubmVjdGlvbi5QYXJlbnQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5IHx8IGFzc2V0Q29ubmVjdGlvbi5DaGlsZCA9PSByZWNvcmRbMF0uQXNzZXRLZXkpO1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGFzc2V0Q29ubmVjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgaW5kZXggPSBhc3NldENvbm5lY3Rpb25zLmZpbmRJbmRleChhc3NldENvbm5lY3Rpb24gPT4gYXNzZXRDb25uZWN0aW9uLlBhcmVudCA9PSByZWNvcmRbMF0uQXNzZXRLZXkgfHwgYXNzZXRDb25uZWN0aW9uLkNoaWxkID09IHJlY29yZFswXS5Bc3NldEtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm9wcy5VcGRhdGVBc3NldHMobGlzdCk7XHJcbiAgICAgICAgcHJvcHMuVXBkYXRlQ2hhbm5lbHMoY2hhbm5lbHMpO1xyXG4gICAgICAgIHByb3BzLlVwZGF0ZUFzc2V0Q29ubmVjdGlvbnMoYXNzZXRDb25uZWN0aW9ucyk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREaWZmZXJlbnRBc3NldChhc3NldElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYXNzZXRUeXBlSUQgPSBhc3NldHMuZmluZChhID0+IGEuSUQgPT0gYXNzZXRJRClbJ0Fzc2V0VHlwZUlEJ107IFxyXG4gICAgICAgIGxldCBhc3NldFR5cGUgPSBhc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gYXNzZXRUeXBlSUQpXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS8ke2Fzc2V0VHlwZS5OYW1lfS9PbmUvJHthc3NldElEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoYXNzZXQ6IE9wZW5YREEuQXNzZXQpID0+IHtcclxuICAgICAgICAgICAgYXNzZXQuQXNzZXRUeXBlID0gYXNzZXRUeXBlLk5hbWU7XHJcbiAgICAgICAgICAgIGFzc2V0LkNoYW5uZWxzID0gW107XHJcbiAgICAgICAgICAgIHNldE5ld0VkaXRBc3NldChhc3NldCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TGluZVNlZ21lbnQobGluZUlEOiBudW1iZXIpOiBKUXVlcnkuanFYSFI8T3BlblhEQS5MaW5lU2VnbWVudD4ge1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmUvJHtsaW5lSUR9L0xpbmVTZWdtZW50YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRFRE5BUG9pbnQoYnJlYWtlcklEOiBudW1iZXIpOiBKUXVlcnkuanFYSFI8T3BlblhEQS5FRE5BUG9pbnQ+IHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9CcmVha2VyLyR7YnJlYWtlcklEfS9FRE5BUG9pbnRgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcbiAgICBmdW5jdGlvbiBzaG93QXR0cmlidXRlcygpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0JyZWFrZXInKVxyXG4gICAgICAgICAgICByZXR1cm4gPEJyZWFrZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5CcmVha2VyfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcclxuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCdXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gPEJ1c0F0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldH0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0vPjtcclxuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdDYXBhY2l0b3JCYW5rJylcclxuICAgICAgICAgICAgcmV0dXJuIDxDYXBCYW5rQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua30gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFua1JlbGF5JylcclxuICAgICAgICAgICAgcmV0dXJuIDxDYXBCYW5rUmVsYXlBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rUmVsYXl9IFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9IC8+O1xyXG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0xpbmUnKVxyXG4gICAgICAgICAgICByZXR1cm4gPExpbmVBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5MaW5lfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcclxuICAgICAgICBlbHNlIGlmIChuZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdUcmFuc2Zvcm1lcicpXHJcbiAgICAgICAgICAgIHJldHVybiA8VHJhbnNmb3JtZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5UcmFuc2Zvcm1lcn0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9e3ttYXJnaW46IC0yMH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzA1LCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDMwNSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6IDAsIG1hcmdpbjogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5DaGFubmVscy5tYXAoKGNoYW5uZWwsIGluZGV4KSA9PiA8bGkgc3R5bGU9e3t0ZXh0RGVjb3JhdGlvbjogKGNoYW5uZWwuQXNzZXQubGVuZ3RoID4gMCA/ICdsaW5lLXRocm91Z2gnIDogbnVsbCl9fSBrZXk9e2luZGV4fT57Y2hhbm5lbC5OYW1lICsgJyAtICcgKyBjaGFubmVsLkRlc2NyaXB0aW9ufTwvbGk+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCIgc3R5bGU9e3twYWRkaW5nOiAyMH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogMzggfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17KCkgPT4geyBzZXROZXdFZGl0KCdOZXcnKTsgc2V0U2hvd0Fzc2V0TW9kYWwodHJ1ZSk7IH19PkFkZCBBc3NldDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzNTAsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXR1czwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+S2V5PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5rVjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q2hhbm5lbHM8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkFzc2V0cy5tYXAoKGFzc2V0OiBPcGVuWERBLkFzc2V0LCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PnsoYXNzZXQuSUQgPT0gMCA/ICdOZXcnIDogJ0V4aXN0aW5nJyl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+e2Fzc2V0LkFzc2V0S2V5fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICczMCUnIH19Pnthc3NldC5Bc3NldE5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+e2Fzc2V0LkFzc2V0VHlwZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuVm9sdGFnZUtWfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pnthc3NldC5DaGFubmVscy5sZW5ndGh9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI2Fzc2V0TW9kYWwnIG9uQ2xpY2s9eyhlKSA9PiBlZGl0QXNzZXQoaW5kZXgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS1wZW5jaWxcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiBkZWxldGVBc3NldChpbmRleCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxNb2RhbCBTaG93PXtzaG93QXNzZXRNb2RhbH1cclxuICAgICAgICAgICAgICAgICAgICBUaXRsZT17bmV3RWRpdCA9PSAnTmV3JyA/ICdBZGQgTmV3IEFzc2V0IHRvIE1ldGVyJyA6ICdFZGl0ICcgKyBuZXdFZGl0QXNzZXQuQXNzZXRLZXkgKyAnIGZvciBNZXRlcid9XHJcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlybUJ0bkNsYXNzPXsnYnRuLXN1Y2Nlc3MnfVxyXG4gICAgICAgICAgICAgICAgICAgIENvbmZpcm1UZXh0PXtuZXdFZGl0ID09ICdFZGl0JyA/ICdBZGQnIDogJ1NhdmUnfVxyXG4gICAgICAgICAgICAgICAgICAgIENhbmNlbEJ0bkNsYXNzPXsnYnRuLWRhbmdlcid9XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuY2VsVGV4dD17J0Nsb3NlJ31cclxuICAgICAgICAgICAgICAgICAgICBTaXplPXsneGxnJ31cclxuICAgICAgICAgICAgICAgICAgICBDYWxsQmFjaz17KGNvbmZpcm0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0Fzc2V0TW9kYWwoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkOiBPcGVuWERBLkFzc2V0ID0gXy5jbG9uZShuZXdFZGl0QXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IF8uY2xvbmUocHJvcHMuQXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZShwcm9wcy5DaGFubmVscyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goY2hhbm5lbHMsIChpbmRleCwgY2hhbm5lbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5uZWwuQXNzZXQgPT0gcmVjb3JkLkFzc2V0S2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSAnJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmQuQ2hhbm5lbHMuZmluZEluZGV4KGMgPT4gYy5JRCA9PSBjaGFubmVsLklEKSA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSByZWNvcmQuQXNzZXRLZXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3RWRpdCA9PSAnTmV3JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChyZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVDaGFubmVscyhjaGFubmVscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZUFzc2V0cyhsaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIERpc2FibGVDb25maXJtPXtuZXdFZGl0ID09ICdOZXcnICYmIEFzc2V0QXR0cmlidXRlcy5BdHRyaWJ1dGVFcnJvcihuZXdFZGl0QXNzZXQpLmxlbmd0aCA+IDAgfVxyXG4gICAgICAgICAgICAgICAgICAgIENvbmZpcm1TaG93VG9vbFRpcD17bmV3RWRpdCA9PSAnTmV3JyAmJiBBc3NldEF0dHJpYnV0ZXMuQXR0cmlidXRlRXJyb3IobmV3RWRpdEFzc2V0KS5sZW5ndGggPiAwfVxyXG4gICAgICAgICAgICAgICAgICAgIENvbmZpcm1Ub29sVGlwQ29udGVudD17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0QXR0cmlidXRlcy5BdHRyaWJ1dGVFcnJvcihuZXdFZGl0QXNzZXQpLm1hcCgoZSwgaSkgPT4gPHAga2V5PXtpfT48RXJyb3JTeW1ib2wgLz4ge2V9PC9wPilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17eyBtYXhIZWlnaHQ6IGlubmVySGVpZ2h0IC0gMzAwLCBvdmVyZmxvdzonYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXNzZXRBdHRyaWJ1dGVzLkFzc2V0QXR0cmlidXRlRmllbGRzIEFzc2V0PXtuZXdFZGl0QXNzZXR9IE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0VHlwZXM9e2Fzc2V0VHlwZXN9IEFsbEFzc2V0cz17YXNzZXRzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVwZGF0ZVN0YXRlPXtzZXROZXdFZGl0QXNzZXR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2V0RGlmZmVyZW50QXNzZXQ9e2dldERpZmZlcmVudEFzc2V0fSBIaWRlQXNzZXRUeXBlPXtuZXdFZGl0ID09ICdFZGl0J30gSGlkZVNlbGVjdEFzc2V0PXtmYWxzZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0F0dHJpYnV0ZXMoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+QXNzb2NpYXRlZCBDaGFubmVsczwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG11bHRpcGxlIHN0eWxlPXt7IGhlaWdodDogaW5uZXJIZWlnaHQgLSAzMzAsIHdpZHRoOiAnMTAwJScgfX0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXQgPSBfLmNsb25lKG5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5DaGFubmVscyA9ICgkKGV2dC50YXJnZXQpLnZhbCgpIGFzIEFycmF5PHN0cmluZz4pLm1hcChhID0+IHByb3BzLkNoYW5uZWxzW3BhcnNlSW50KGEpXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gdmFsdWU9e25ld0VkaXRBc3NldC5DaGFubmVscy5tYXAoYSA9PiBhLklELnRvU3RyaW5nKCkpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkNoYW5uZWxzLm1hcCgoY2hhbm5lbCwgaW5kZXgpID0+IDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2luZGV4fSBoaWRkZW49e2NoYW5uZWwuQXNzZXQgIT0gbmV3RWRpdEFzc2V0LkFzc2V0S2V5ICYmIGNoYW5uZWwuQXNzZXQubGVuZ3RoID4gMH0+e2NoYW5uZWwuTmFtZSArICcgLSAnICsgY2hhbm5lbC5EZXNjcmlwdGlvbn08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgICA8Lz5cclxuICAgICAgICApO1xyXG5cclxufVxyXG5jb25zdCBFcnJvclN5bWJvbCA9ICgpID0+IDxpIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnMTBweCcsIGNvbG9yOiAnI2RjMzU0NScgfX0gY2xhc3NOYW1lPVwiZmEgZmEtZXhjbGFtYXRpb24tY2lyY2xlXCI+PC9pPlxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFBhZ2U1LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xMC8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdEFzc2V0Q29ubmVjdGlvblR5cGVzLCBTZWxlY3RBc3NldENvbm5lY3Rpb25UeXBlU3RhdHVzLCBGZXRjaEFzc2V0Q29ubmVjdGlvblR5cGUgfSBmcm9tICcuLi9TdG9yZS9Bc3NldENvbm5lY3Rpb25UeXBlU2xpY2UnO1xyXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJ0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZTUocHJvcHM6IHsgQXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PiwgQXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+LCBVcGRhdGVBc3NldENvbm5lY3Rpb25zOiAocmVjb3JkOiBPcGVuWERBLkFzc2V0Q29ubmVjdGlvbltdKSA9PiB2b2lkIH0pIHtcclxuICAgIGNvbnN0IHNlbGVjdEFzc2V0ID0gUmVhY3QudXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3Qgc2VsZWN0VHlwZSA9IFJlYWN0LnVzZVJlZihudWxsKTtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIGNvbnN0IGFzc2V0Q29ubmVjdGlvblR5cGVzID0gdXNlU2VsZWN0b3IoU2VsZWN0QXNzZXRDb25uZWN0aW9uVHlwZXMpO1xyXG4gICAgY29uc3QgYWN0U3RhdHVzID0gdXNlU2VsZWN0b3IoU2VsZWN0QXNzZXRDb25uZWN0aW9uVHlwZVN0YXR1cyk7XHJcblxyXG4gICAgY29uc3QgW3Nob3dBc3NldENvbm5lY3Rpb24sIHNldFNob3dBc3NldENvbm5lY3Rpb25dID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICAgIGNvbnN0IFthc3NldEluZGV4LCBzZXRBc3NldEluZGV4XSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oMCk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoYWN0U3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgYWN0U3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBkaXNwYXRjaChGZXRjaEFzc2V0Q29ubmVjdGlvblR5cGUoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL2lmICh0elN0YXR1cyA9PSAnbG9hZGluZycpIHByb21pc2UuYWJvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtkaXNwYXRjaCwgYWN0U3RhdHVzXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICAvLyBNYWtlIHN1cmUgY3VycmVudFN0ZXAgaXMgc2V0IHRvIHNvbWV0aGluZyByZWFzb25hYmxlXHJcbiAgICAgICAgaWYgKGFzc2V0SW5kZXggPj0gcHJvcHMuQXNzZXRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgc2V0QXNzZXRJbmRleCggcHJvcHMuQXNzZXRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEFzc2V0SW5kZXgoYXNzZXRJbmRleCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmV2KCkge1xyXG4gICAgICAgIGlmIChhc3NldEluZGV4IDw9IDApIHtcclxuICAgICAgICAgICAgc2V0QXNzZXRJbmRleCgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRBc3NldEluZGV4KGFzc2V0SW5kZXggLSAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlQXNzZXRDb25uZWN0aW9uKGFjOiBPcGVuWERBLkFzc2V0Q29ubmVjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0OiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbj4gPSBfLmNsb25lKHByb3BzLkFzc2V0Q29ubmVjdGlvbnMpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IGxpc3QuZmluZEluZGV4KGEgPT4gYSA9PSBhYyk7XHJcbiAgICAgICAgbGV0IHJlY29yZDogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ID0gbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHByb3BzLlVwZGF0ZUFzc2V0Q29ubmVjdGlvbnMobGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGN1cnJlbnRBc3NldCA9IHByb3BzLkFzc2V0c1thc3NldEluZGV4XVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7IG1hcmdpbjogLTIwLCBoZWlnaHQ6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTRcIiBzdHlsZT17e2hlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyODUsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAwLCBtYXJnaW46IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkFzc2V0cy5tYXAoKGFzc2V0LCBpbmRleCkgPT4gPGxpIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAoaW5kZXggPD0gYXNzZXRJbmRleCA/ICdsaW5lLXRocm91Z2gnIDogbnVsbCkgfX0ga2V5PXtpbmRleH0+e2Fzc2V0LkFzc2V0S2V5fTwvbGk+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiBzdHlsZT17eyBwYWRkaW5nOiAwLCBoZWlnaHQ6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+IHNldFNob3dBc3NldENvbm5lY3Rpb24odHJ1ZSl9IGRpc2FibGVkPXtwcm9wcy5Bc3NldHMubGVuZ3RoIDw9IDF9PkFkZCBDb25uZWN0aW9uPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJyB9fT57Y3VycmVudEFzc2V0LkFzc2V0S2V5fTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiIHN0eWxlPXt7b3ZlcmZsb3dZOidzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQxNX19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+QXNzZXQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNvbm5lY3Rpb248L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkFzc2V0Q29ubmVjdGlvbnMuZmlsdGVyKCBhYyA9PiBhYy5QYXJlbnQgPT0gY3VycmVudEFzc2V0LkFzc2V0S2V5ICB8fCBhYy5DaGlsZCA9PSBjdXJyZW50QXNzZXQuQXNzZXRLZXkpLm1hcCgoYWM6IE9wZW5YREEuQXNzZXRDb25uZWN0aW9uLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvbkFzc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhYy5QYXJlbnQgPT0gY3VycmVudEFzc2V0LkFzc2V0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25Bc3NldCA9IHByb3BzLkFzc2V0cy5maW5kKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5ID09IGFjLkNoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uQXNzZXQgPSBwcm9wcy5Bc3NldHMuZmluZChhc3NldCA9PiBhc3NldC5Bc3NldEtleSA9PSBhYy5QYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvblR5cGUgPSBhc3NldENvbm5lY3Rpb25UeXBlcy5maW5kKGFjdCA9PiBhY3QuSUQgPT0gYWMuQXNzZXRSZWxhdGlvbnNoaXBUeXBlSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+e2Nvbm5lY3Rpb25Bc3NldC5Bc3NldEtleX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT57Y29ubmVjdGlvbkFzc2V0LkFzc2V0VHlwZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNTAlJyB9fT57Y29ubmVjdGlvblR5cGUgIT0gdW5kZWZpbmVkID8gY29ubmVjdGlvblR5cGUuTmFtZSA6ICcnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiBkZWxldGVBc3NldENvbm5lY3Rpb24oYWMpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLWxlZnRcIiBvbkNsaWNrPXtwcmV2fSBoaWRkZW49e2ZhbHNlfSBkaXNhYmxlZD17YXNzZXRJbmRleCA8IDF9PlByZXZpb3VzIEFzc2V0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17bmV4dH0gZGlzYWJsZWQ9e2Fzc2V0SW5kZXggPT0gcHJvcHMuQXNzZXRzLmxlbmd0aCAtIDF9Pk5leHQgQXNzZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8TW9kYWwgU2hvdz17c2hvd0Fzc2V0Q29ubmVjdGlvbn0gU2l6ZT17J3NtJ30gVGl0bGU9eydBZGQgYSBDb25uZWN0aW9uIHRvICcgKyBjdXJyZW50QXNzZXQuQXNzZXRLZXl9XHJcbiAgICAgICAgICAgICAgICBDYW5jZWxUZXh0PXsnQ2xvc2UnfSBDb25maXJtVGV4dD17J1NhdmUnfVxyXG4gICAgICAgICAgICAgICAgQ2FsbEJhY2s9eyhjb25maXJtZWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRTaG93QXNzZXRDb25uZWN0aW9uKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbmZpcm1lZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRDb25uZWN0aW9uID0gJChzZWxlY3RBc3NldC5jdXJyZW50KS52YWwoKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gcGFyc2VJbnQoJChzZWxlY3RUeXBlLmN1cnJlbnQpLnZhbCgpIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiA9IF8uY2xvbmUocHJvcHMuQXNzZXRDb25uZWN0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzZXRDb25uZWN0aW9ucy5wdXNoKHsgSUQ6IDAsIEFzc2V0UmVsYXRpb25zaGlwVHlwZUlEOiBjb25uZWN0aW9uVHlwZSwgUGFyZW50OiBjdXJyZW50QXNzZXQuQXNzZXRLZXksIENoaWxkOiBjaGlsZENvbm5lY3Rpb24gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlQXNzZXRDb25uZWN0aW9ucyhhc3NldENvbm5lY3Rpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2VsZWN0IENvbm5lY3RpbmcgQXNzZXQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgcmVmPXtzZWxlY3RBc3NldH0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9eyhldnQpID0+IHt9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQXNzZXRzLmZpbHRlcihhc3NldCA9PiBhc3NldC5Bc3NldEtleSAhPSBjdXJyZW50QXNzZXQuQXNzZXRLZXkpLm1hcCgoYXNzZXQsIGluZGV4KSA9PiA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXthc3NldC5Bc3NldEtleX0gPnthc3NldC5Bc3NldEtleX08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBDb25uZWN0aW9uIFR5cGU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgcmVmPXtzZWxlY3RUeXBlfSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldENvbm5lY3Rpb25UeXBlcy5tYXAoKGFjdCwgaW5kZXgpID0+IDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2FjdC5JRH0gPnthY3QuTmFtZX08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgIDwvPlxyXG4gICAgKTtcclxuXHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=