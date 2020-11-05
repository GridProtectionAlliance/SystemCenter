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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Page1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page1 */ "./TSX/SystemCenter/NewMeterWizard/Page1.tsx");
/* harmony import */ var _Page2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Page2 */ "./TSX/SystemCenter/NewMeterWizard/Page2.tsx");
/* harmony import */ var _Page3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Page3 */ "./TSX/SystemCenter/NewMeterWizard/Page3.tsx");
/* harmony import */ var _Page4__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Page4 */ "./TSX/SystemCenter/NewMeterWizard/Page4.tsx");
/* harmony import */ var _Page5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Page5 */ "./TSX/SystemCenter/NewMeterWizard/Page5.tsx");
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






var NewMeterWizard = /** @class */ (function (_super) {
    __extends(NewMeterWizard, _super);
    function NewMeterWizard(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            currentStep: _this.getCurrentStep(),
            MeterInfo: _this.getMeterInfo(),
            LocationInfo: _this.getLocationInfo(),
            Channels: _this.getChannels(),
            Assets: _this.getAssets(),
            AssetConnections: _this.getAssetConnections(),
            MeterKeys: [],
            LocationKeys: []
        };
        _this.next = _this.next.bind(_this);
        _this.prev = _this.prev.bind(_this);
        _this.clearData = _this.clearData.bind(_this);
        _this.updateState = _this.updateState.bind(_this);
        _this.getHeader = _this.getHeader.bind(_this);
        _this.disableNext = _this.disableNext.bind(_this);
        _this.addNewMeter = _this.addNewMeter.bind(_this);
        return _this;
    }
    NewMeterWizard.prototype.componentDidMount = function () {
        this.getMeterKeys();
        this.getLocationKeys();
    };
    NewMeterWizard.prototype.componentWillUnmount = function () {
        sessionStorage.clear();
    };
    NewMeterWizard.prototype.getCurrentStep = function () {
        if (localStorage.hasOwnProperty('NewMeterWizard.CurrentStep'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.CurrentStep'));
        else
            return 1;
    };
    NewMeterWizard.prototype.getMeterInfo = function () {
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
    };
    NewMeterWizard.prototype.getLocationInfo = function () {
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
    };
    NewMeterWizard.prototype.getChannels = function () {
        if (localStorage.hasOwnProperty('NewMeterWizard.Channels'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.Channels'));
        else
            return [];
    };
    NewMeterWizard.prototype.getAssets = function () {
        if (localStorage.hasOwnProperty('NewMeterWizard.Assets'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));
        else
            return [];
    };
    NewMeterWizard.prototype.getAssetConnections = function () {
        if (localStorage.hasOwnProperty('NewMeterWizard.AssetConnections'))
            return JSON.parse(localStorage.getItem('NewMeterWizard.AssetConnections'));
        else
            return [];
    };
    NewMeterWizard.prototype.getMeterKeys = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('NewMeterWizard.MeterKeys'))
            this.setState({ MeterKeys: JSON.parse(sessionStorage.getItem('NewMeterWizard.MeterKeys')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/Meter",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (meters) {
                var keys = meters.map(function (a) { return a.AssetKey.toLowerCase(); });
                _this.setState({ MeterKeys: keys });
                sessionStorage.setItem('NewMeterWizard.MeterKeys', JSON.stringify(keys));
            });
    };
    NewMeterWizard.prototype.getLocationKeys = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('NewMeterWizard.LocationKeys'))
            this.setState({ LocationKeys: JSON.parse(sessionStorage.getItem('NewMeterWizard.LocationKeys')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/Location",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (mls) {
                var keys = mls.map(function (a) { return a.LocationKey.toLowerCase(); });
                _this.setState({ LocationKeys: keys });
                sessionStorage.setItem('NewMeterWizard.LocationKeys', JSON.stringify(keys));
            });
    };
    NewMeterWizard.prototype.addNewMeter = function (event) {
        var _this = this;
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/Meter/New",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                MeterInfo: this.state.MeterInfo,
                LocationInfo: this.state.LocationInfo,
                Channels: this.state.Channels,
                Assets: this.state.Assets,
                AssetConnections: this.state.AssetConnections
            }),
            dataType: 'json',
            cache: true,
            async: true
        }).done(function () {
            _this.clearData();
            window.location.href = homePath + 'index.cshtml?name=Meters';
        }).fail(function (msg) {
            if (msg.status == 500)
                alert(msg.responseJSON.ExceptionMessage);
            else {
                _this.clearData();
                window.location.href = homePath + 'index.cshtml?name=Meters';
            }
        });
    };
    NewMeterWizard.prototype.next = function () {
        var currentStep = this.state.currentStep;
        // Make sure currentStep is set to something reasonable
        if (currentStep >= 4) {
            currentStep = 5;
        }
        else {
            currentStep = currentStep + 1;
        }
        localStorage.setItem('NewMeterWizard.CurrentStep', currentStep.toString());
        this.setState({
            currentStep: currentStep
        });
    };
    NewMeterWizard.prototype.prev = function () {
        var currentStep = this.state.currentStep;
        if (currentStep <= 1) {
            currentStep = 1;
        }
        else {
            currentStep = currentStep - 1;
        }
        localStorage.setItem('NewMeterWizard.CurrentStep', currentStep.toString());
        this.setState({
            currentStep: currentStep
        });
    };
    NewMeterWizard.prototype.updateState = function (state) {
        if (state.hasOwnProperty('MeterInfo'))
            localStorage.setItem('NewMeterWizard.MeterInfo', JSON.stringify(state.MeterInfo));
        if (state.hasOwnProperty('LocationInfo'))
            localStorage.setItem('NewMeterWizard.LocationInfo', JSON.stringify(state.LocationInfo));
        if (state.hasOwnProperty('Channels'))
            localStorage.setItem('NewMeterWizard.Channels', JSON.stringify(state.Channels));
        if (state.hasOwnProperty('Assets'))
            localStorage.setItem('NewMeterWizard.Assets', JSON.stringify(state.Assets));
        if (state.hasOwnProperty('AssetConnections'))
            localStorage.setItem('NewMeterWizard.AssetConnections', JSON.stringify(state.AssetConnections));
        this.setState(state);
    };
    NewMeterWizard.prototype.clearData = function () {
        this.clearLocalStorage();
        sessionStorage.clear();
        this.setState({ MeterInfo: this.getMeterInfo(), LocationInfo: this.getLocationInfo(), Channels: this.getChannels(), currentStep: this.getCurrentStep(), Assets: this.getAssets() });
    };
    NewMeterWizard.prototype.clearLocalStorage = function () {
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
    };
    NewMeterWizard.prototype.getHeader = function () {
        if (this.state.currentStep == 1)
            return "Step 1: General information about the new meter";
        else if (this.state.currentStep == 2)
            return "Step 2: Substation information for the new meter";
        else if (this.state.currentStep == 3)
            return "Step 3: Populate channels for the new meter";
        else if (this.state.currentStep == 4)
            return "Step 4: Populate assets monitored by the new meter";
        else if (this.state.currentStep == 5)
            return "Step 5: Add connection between the assets that are monitored by the new meter";
    };
    NewMeterWizard.prototype.getPage = function () {
        var _this = this;
        if (this.state.currentStep == 1)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page1__WEBPACK_IMPORTED_MODULE_1__["default"], { MeterInfo: this.state.MeterInfo, UpdateState: function (meter) { return _this.updateState({ MeterInfo: meter }); } });
        else if (this.state.currentStep == 2)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page2__WEBPACK_IMPORTED_MODULE_2__["default"], { LocationInfo: this.state.LocationInfo, UpdateState: this.updateState });
        else if (this.state.currentStep == 3)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page3__WEBPACK_IMPORTED_MODULE_3__["default"], { MeterKey: this.state.MeterInfo.AssetKey, Channels: this.state.Channels, UpdateState: this.updateState });
        else if (this.state.currentStep == 4)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page4__WEBPACK_IMPORTED_MODULE_4__["default"], { AssetConnections: this.state.AssetConnections, Channels: this.state.Channels, Assets: this.state.Assets, UpdateState: this.updateState });
        else if (this.state.currentStep == 5)
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Page5__WEBPACK_IMPORTED_MODULE_5__["default"], { Assets: this.state.Assets, AssetConnections: this.state.AssetConnections, UpdateState: this.updateState });
    };
    NewMeterWizard.prototype.disableNext = function () {
        if (this.state.currentStep == 1) {
            var assetKey = this.state.MeterInfo.AssetKey == null || this.state.MeterInfo.AssetKey.length == 0 || this.state.MeterKeys.indexOf(this.state.MeterInfo.AssetKey.toLowerCase()) >= 0;
            var name = this.state.MeterInfo.Name == null || this.state.MeterInfo.Name.length == 0;
            var make = this.state.MeterInfo.Make == null || this.state.MeterInfo.Make.length == 0;
            var model = this.state.MeterInfo.Model == null || this.state.MeterInfo.Model.length == 0;
            return assetKey || name || make || model;
        }
        else if (this.state.currentStep == 2) {
            var key = this.state.LocationInfo.LocationKey == null || this.state.LocationInfo.LocationKey.length == 0 || (this.state.LocationKeys.indexOf(this.state.LocationInfo.LocationKey.toLowerCase()) >= 0 && this.state.LocationInfo.ID == 0);
            var name = this.state.LocationInfo.Name == null || this.state.LocationInfo.Name.length == 0;
            var latitude = this.state.LocationInfo.Latitude == null;
            var longitude = this.state.LocationInfo.Longitude == null;
            return key || name || latitude || longitude;
        }
        else if (this.state.currentStep == 3)
            return this.state.Channels.length == 0;
        else if (this.state.currentStep == 4)
            return this.state.Assets.length == 0;
        return true;
    };
    NewMeterWizard.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { padding: 10, height: 'inherit', overflowY: 'hidden' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null, "New Meter Wizard"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { height: 'calc(100% - 75px)' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: this.clearData }, "Clear Data"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { style: { width: '90%' } }, this.getHeader())),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body", style: { maxHeight: 'calc(100% - 126px)' } }, this.getPage()),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-left", onClick: this.prev, hidden: this.state.currentStep <= 1 }, "Prev"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: this.next, hidden: this.state.currentStep >= 5, disabled: this.state.currentStep >= 5 || this.disableNext() }, "Next"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: this.addNewMeter, hidden: this.state.currentStep < 5 }, "Submit")))));
    };
    return NewMeterWizard;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (NewMeterWizard);


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






function Page1(props) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
    var timeZones = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(function (state) { return Object(_Store_ValueListSlice__WEBPACK_IMPORTED_MODULE_5__["SelectValueList"])(state, 'TimeZones'); });
    var tzStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(function (state) { return Object(_Store_ValueListSlice__WEBPACK_IMPORTED_MODULE_5__["SelectValueListStatus"])(state, 'TimeZones'); });
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), meterKeys = _a[0], setMeterKeys = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getMeterKeys();
        handle.done(function (meters) {
            var keys = meters.map(function (a) { return a.AssetKey.toLowerCase(); });
            setMeterKeys(keys);
        });
        return function () {
            if (handle.abort !== undefined)
                handle.abort();
        };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (tzStatus === 'unintiated' || tzStatus === 'changed') {
            var promise = dispatch(Object(_Store_ValueListSlice__WEBPACK_IMPORTED_MODULE_5__["FetchValueList"])({ group: 'TimeZones' }));
            return function () {
                //if (tzStatus == 'loading') promise.abort();
            };
        }
    }, [dispatch, tzStatus]);
    function getMeterKeys() {
        return $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Meter",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
    }
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
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'AssetKey', Feedback: 'A unique key of less than 50 characters is required.', Valid: valid, Setter: props.UpdateState }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: valid, Setter: props.UpdateState }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: valid, Setter: props.UpdateState }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: valid, Setter: props.UpdateState })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'Make', Feedback: 'Make must be less than 200 characters.', Valid: valid, Setter: props.UpdateState }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: props.MeterInfo, Field: 'Model', Feedback: 'Model must be less than 200 characters.', Valid: valid, Setter: props.UpdateState }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Time Zone"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: props.MeterInfo == null || props.MeterInfo.TimeZone == null ? '-1' : props.MeterInfo.TimeZone, onChange: function (evt) {
                        var meter = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](props.MeterInfo);
                        if (evt.target.value != "-1")
                            meter.TimeZone = evt.target.value;
                        else
                            meter.TimeZone = null;
                        props.UpdateState(meter);
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "-1" }, "None Selected"),
                    (timeZones != null ? timeZones.map(function (tz) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: tz.Text, key: tz.Text, disabled: !tz.Enabled, hidden: tz.Hidden }, tz.AltText1); }) : null))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__["default"], { Rows: 3, Record: props.MeterInfo, Field: 'Description', Valid: valid, Setter: props.UpdateState }))));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
/* harmony import */ var _CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CommonComponents/FormTextArea */ "./TSX/SystemCenter/CommonComponents/FormTextArea.tsx");
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




var Page2 = /** @class */ (function (_super) {
    __extends(Page2, _super);
    function Page2(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Locations: []
        };
        _this.valid = _this.valid.bind(_this);
        return _this;
    }
    Page2.prototype.componentDidMount = function () {
        this.getAllLocations();
    };
    Page2.prototype.getAllLocations = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('OpenXDA.Locations'))
            this.setState({ Locations: JSON.parse(sessionStorage.getItem('OpenXDA.Locations')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/Location",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (mls) {
                _this.setState({ Locations: mls });
                sessionStorage.setItem('OpenXDA.Locations', JSON.stringify(mls));
            });
    };
    Page2.prototype.getDifferentMeterLocation = function (meterLocationID) {
        this.props.UpdateState({ LocationInfo: this.state.Locations.find(function (value, index, object) { return value.ID == meterLocationID; }) });
    };
    Page2.prototype.valid = function (field) {
        var _this = this;
        if (field == 'LocationKey') {
            if (this.props.LocationInfo.LocationKey == null || this.props.LocationInfo.LocationKey.length == 0 || this.props.LocationInfo.LocationKey.length > 50)
                return false;
            else if (this.props.LocationInfo.ID == 0)
                return this.state.Locations.find(function (locs) { return locs.LocationKey.toLowerCase() == _this.props.LocationInfo.LocationKey.toLowerCase(); }) == null;
            else
                return true;
        }
        else if (field == 'Name')
            return this.props.LocationInfo.Name != null && this.props.LocationInfo.Name.length > 0 && this.props.LocationInfo.Name.length <= 200;
        else if (field == 'Alias')
            return this.props.LocationInfo.Alias == null || this.props.LocationInfo.Alias.length <= 200;
        else if (field == 'ShortName')
            return this.props.LocationInfo.ShortName == null || this.props.LocationInfo.ShortName.length <= 50;
        else if (field == 'Latitude')
            return this.props.LocationInfo.Latitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(this.props.LocationInfo.Latitude);
        else if (field == 'Longitude')
            return this.props.LocationInfo.Longitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["default"].isRealNumber(this.props.LocationInfo.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    };
    Page2.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Select Location"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: this.props.LocationInfo.ID == null ? '0' : this.props.LocationInfo.ID, onChange: function (evt) {
                            if (evt.target.value != "0")
                                _this.getDifferentMeterLocation(parseInt(evt.target.value));
                            else
                                _this.props.UpdateState({
                                    LocationInfo: {
                                        ID: 0,
                                        LocationKey: '',
                                        Name: '',
                                        Alias: '',
                                        ShortName: '',
                                        Latitude: 0,
                                        Longitude: 0,
                                        Description: '',
                                    }
                                });
                        } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "0" }, "Add New"),
                        (this.state.Locations != null ? this.state.Locations.map(function (ml) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: ml.ID, key: ml.ID }, ml.LocationKey); }) : null))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.LocationInfo, Field: 'LocationKey', Label: 'Key', Setter: function (record) { return _this.props.UpdateState({ LocationInfo: record }); }, Valid: this.valid, Feedback: 'A unique Key is required and must be less than 50 characters.', Disabled: this.props.LocationInfo.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.LocationInfo, Field: 'Name', Setter: function (record) { return _this.props.UpdateState({ LocationInfo: record }); }, Valid: this.valid, Feedback: 'Name is required and must be less than 200 characters.', Disabled: this.props.LocationInfo.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.LocationInfo, Field: 'ShortName', Label: 'Short Name', Setter: function (record) { return _this.props.UpdateState({ LocationInfo: record }); }, Valid: this.valid, Feedback: 'Short Name must be less than 50 characters.', Disabled: this.props.LocationInfo.ID != 0 })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.LocationInfo, Field: 'Alias', Setter: function (record) { return _this.props.UpdateState({ LocationInfo: record }); }, Valid: this.valid, Feedback: 'Alias must be less than 200 characters.', Disabled: this.props.LocationInfo.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.LocationInfo, Field: 'Latitude', Setter: function (record) { return _this.props.UpdateState({ LocationInfo: record }); }, Valid: this.valid, Feedback: 'Latitude is a required numeric field.', Disabled: this.props.LocationInfo.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_1__["default"], { Record: this.props.LocationInfo, Field: 'Longitude', Setter: function (record) { return _this.props.UpdateState({ LocationInfo: record }); }, Valid: this.valid, Feedback: 'Longitude is a required numeric field.', Disabled: this.props.LocationInfo.ID != 0 }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__["default"], { Rows: 3, Record: this.props.LocationInfo, Field: 'Description', Setter: function (record) { return _this.props.UpdateState({ LocationInfo: record }); }, Valid: this.valid, Feedback: '', Disabled: this.props.LocationInfo.ID != 0 }))));
    };
    return Page2;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Page2);


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
            var promise = dispatch(Object(_Store_MeasurementTypeSlice__WEBPACK_IMPORTED_MODULE_4__["FetchMeasurementType"])());
            return function () {
                //if (promise.abort() !== undefined) promise.abort();
            };
        }
    }, [dispatch, mtStatus]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (phStatus === 'unintiated' || phStatus === 'changed') {
            var promise = dispatch(Object(_Store_PhaseSlice__WEBPACK_IMPORTED_MODULE_5__["FetchPhase"])());
            return function () {
                //if (promise.abort() !== undefined) promise.abort();
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
                    props.UpdateState({ Channels: parser.Channels });
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
        props.UpdateState({ Channels: channels });
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
            props.UpdateState({ Assets: assets });
        }
    }
    function clearAssetsChannels() {
        var assets = JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));
        if (assets != null && assets.length > 0) {
            $.each(assets, function (index, asset) {
                asset.Channels = [];
            });
            props.UpdateState({ Assets: assets });
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
                        props.UpdateState({ Channels: channels });
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
                        props.UpdateState({ Channels: channels });
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
                                    props.UpdateState({ Channels: array });
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Name, onChange: function (event) {
                                    channel.Name = event.target.value;
                                    props.UpdateState({ Channels: array });
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '45%' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Description, onChange: function (event) {
                                    channel.Description = event.target.value;
                                    props.UpdateState({ Channels: array });
                                } })),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.MeasurementType, onChange: function (event) {
                                channel.MeasurementType = event.target.value;
                                props.UpdateState({ Channels: array });
                            } }, measurementTypes.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.Phase, onChange: function (event) {
                                channel.Phase = event.target.value;
                                props.UpdateState({ Channels: array });
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
/* harmony import */ var _TS_Services_Asset__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../TS/Services/Asset */ "./TS/Services/Asset.ts");
/* harmony import */ var _AssetAttribute_CapBankRelay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../AssetAttribute/CapBankRelay */ "./TSX/SystemCenter/AssetAttribute/CapBankRelay.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ "../../node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_AssetTypeSlice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Store/AssetTypeSlice */ "./TSX/SystemCenter/Store/AssetTypeSlice.ts");
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
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_10__["useDispatch"])();
    var assetTypes = Object(react_redux__WEBPACK_IMPORTED_MODULE_10__["useSelector"])(_Store_AssetTypeSlice__WEBPACK_IMPORTED_MODULE_11__["SelectAssetTypes"]);
    var atStatus = Object(react_redux__WEBPACK_IMPORTED_MODULE_10__["useSelector"])(_Store_AssetTypeSlice__WEBPACK_IMPORTED_MODULE_11__["SelectAssetTypeStatus"]);
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAsset('Line')), 2), newEditAsset = _a[0], setNewEditAsset = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), allAssets = _b[0], setAllAssets = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('New'), 2), newEdit = _c[0], setNewEdit = _c[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle1 = Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_8__["getAllAssets"])();
        handle1.done(function (aas) { return setAllAssets(aas); });
        return function () {
            if (handle1.abort != undefined)
                handle1.abort();
        };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (atStatus === 'unintiated' || atStatus === 'changed') {
            var promise = dispatch(Object(_Store_AssetTypeSlice__WEBPACK_IMPORTED_MODULE_11__["FetchAssetType"])());
            return function () {
                //if (tzStatus == 'loading') promise.abort();
            };
        }
    }, [dispatch, atStatus]);
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
        props.UpdateState({ Assets: list });
        props.UpdateState({ Channels: channels });
        props.UpdateState({ AssetConnections: assetConnections });
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
        var assetTypeID = allAssets.find(function (a) { return a.ID == assetID; })['AssetTypeID'];
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
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBankRelay__WEBPACK_IMPORTED_MODULE_9__["default"], { NewEdit: newEdit, Asset: newEditAsset, UpdateState: setNewEditAsset });
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
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"], { Asset: newEditAsset, NewEdit: newEdit, AssetTypes: assetTypes, AllAssets: allAssets, UpdateState: setNewEditAsset, GetDifferentAsset: getDifferentAsset })),
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
                                props.UpdateState({ Channels: channels });
                                props.UpdateState({ Assets: list });
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
                                props.UpdateState({ Channels: channels });
                                props.UpdateState({ Assets: list });
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
        props.UpdateState({ AssetConnections: list });
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
                                props.UpdateState({ AssetConnections: assetConnections });
                            } }, "Save"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close")))))));
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9DRkdQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rUmVsYXkudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvTmV3TWV0ZXJXaXphcmQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTEudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTIudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTMudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBLHdHQUF3RztBQUN4Ryx3QkFBd0I7QUFDeEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3RztBQUl4RztJQUlJLG1CQUFZLFFBQWdCLEVBQUUsUUFBZ0I7UUFBOUMsaUJBUUM7UUFQRyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFB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LENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFFbEcsT0FBTyxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLENBQUM7U0FDNUM7YUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRTtZQUNsQyxJQUFJLEdBQUcsR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbFAsSUFBSSxJQUFJLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUNyRyxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1lBQ2pFLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7WUFFbkUsT0FBTyxHQUFHLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxTQUFTLENBQUM7U0FDL0M7YUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2FBQ3RDLElBQUksSUFBSSxDQUFD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LFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDL1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDL1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDL1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDN1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjs0QkFDN1YsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFF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LENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dDQUNqSSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQzs0QkFDNUQsQ0FBQyxXQUFnQjt3QkFFakIsZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsZ0JBQWdCLGtCQUFjLE9BQU8sWUFBZSxDQUNsRixDQUVKLENBQ0osQ0FFSixDQUNQLENBQ04sQ0FBQztBQUVOLENBQUMiLCJmaWxlIjoiTmV3TWV0ZXJXaXphcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQ0ZHUGFyc2VyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gXCIuLi9UU1gvU3lzdGVtQ2VudGVyL2dsb2JhbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ0ZHUGFyc2VyIHtcclxuICAgIEFuYWxvZ3M6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD47XHJcbiAgICBEaWdpdGFsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPjtcclxuICAgIENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+O1xyXG4gICAgY29uc3RydWN0b3IoY29udGVudHM6IHN0cmluZywgbWV0ZXJLZXk6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkYXRhID0gY29udGVudHMuc3BsaXQoJ1xcbicpLm1hcChhID0+IGEuc3BsaXQoJywnKSk7XHJcbiAgICAgICAgbGV0IGFuYWxvZ0NvdW50cyA9IHBhcnNlSW50KGRhdGFbMV1bMV0uc2xpY2UoMCwgZGF0YVsxXVsxXS5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgbGV0IGRpZ2l0YWxDb3VudHMgPSBwYXJzZUludChkYXRhWzFdWzJdLnNsaWNlKDAsIGRhdGFbMV1bMl0ubGVuZ3RoIC0gMSkpO1xyXG5cclxuICAgICAgICB0aGlzLkFuYWxvZ3MgPSBkYXRhLnNsaWNlKDIsIGFuYWxvZ0NvdW50cyArIDIpLm1hcCgoYTogQXJyYXk8c3RyaW5nPiwgaW5kZXgpID0+IHsgcmV0dXJuIHsgSUQ6IGluZGV4LCBNZXRlcjogbWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiB0aGlzLnBhcnNlVHlwZShhWzRdKSwgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogdGhpcy5wYXJzZVBoYXNlKGFbMl0pLCBOYW1lOiBhWzFdLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogYVszXSwgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiBhWzBdIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwgfSk7XHJcbiAgICAgICAgdGhpcy5EaWdpdGFscyA9IGRhdGEuc2xpY2UoMiArIGFuYWxvZ0NvdW50cywgMiArIGFuYWxvZ0NvdW50cyArIGRpZ2l0YWxDb3VudHMpLm1hcCgoYTogQXJyYXk8c3RyaW5nPiwgaW5kZXgpID0+IHsgcmV0dXJuIHsgSUQ6IGFuYWxvZ0NvdW50cytpbmRleCwgTWV0ZXI6IG1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0RpZ2l0YWwnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiB0aGlzLnBhcnNlUGhhc2UoYVsyXSksIE5hbWU6IGFbMV0sIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiBhWzNdLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6IGFbMF0gfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCB9KVxyXG4gICAgICAgIHRoaXMuQ2hhbm5lbHMgPSB0aGlzLkFuYWxvZ3MuY29uY2F0KHRoaXMuRGlnaXRhbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlUGhhc2UodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDAgJiYgdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdBQic7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMCAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gJ0JDJztcclxuICAgICAgICBlbHNlIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ0EnO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQU4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQk4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYycpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ04nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignbicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnTkcnO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuICdOb25lJztcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZVR5cGUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnVm9sdGFnZSc7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJ0N1cnJlbnQnO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBDYXBCYW5rUmVsYXkudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDgvMTIvMjAyMCAtIEMuIExhY2tuZXJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi9Bc3NldCc7XG5cbmZ1bmN0aW9uIENhcEJhbmtSZWxheUF0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkNhcEJhbmtSZWxheSwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQ2FwQmFua1JlbGF5KSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkNhcEJhbmtSZWxheSkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpZWxkID09ICdPblZvbHRhZ2VUaHJlc2hob2xkJylcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiA8PlxuICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuQ2FwQmFua1JlbGF5PiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J09uVm9sdGFnZVRocmVzaGhvbGQnfSBMYWJlbD17J1JlbGF5IE9uIFZvbHRhZ2UgVGhyZXNoaG9sZCAocHUpJ30gRmVlZGJhY2s9eydSZWxheSBPbiBWb2x0YWdlIFRocmVzaGhvbGQgKHB1KSBpcyBhIHJlcXVpcmVkIGZpZWxkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cbiAgICA8Lz47XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FwQmFua1JlbGF5QXR0cmlidXRlczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTmV3TWV0ZXJXaXphcmQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBQYWdlMSBmcm9tICcuL1BhZ2UxJztcclxuaW1wb3J0IFBhZ2UyIGZyb20gJy4vUGFnZTInO1xyXG5pbXBvcnQgUGFnZTMgZnJvbSAnLi9QYWdlMyc7XHJcbmltcG9ydCBQYWdlNCBmcm9tICcuL1BhZ2U0JztcclxuaW1wb3J0IFBhZ2U1IGZyb20gJy4vUGFnZTUnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuZXhwb3J0IGludGVyZmFjZSBBc3NldExpc3RzIHtcclxuICAgIEJyZWFrZXJzOiBBcnJheTxPcGVuWERBLkJyZWFrZXI+LFxyXG4gICAgQnVzZXM6IEFycmF5PE9wZW5YREEuQnJlYWtlcj4sXHJcbiAgICBDYXBCYW5rczogQXJyYXk8T3BlblhEQS5DYXBCYW5rPixcclxuICAgIExpbmVzOiBBcnJheTxPcGVuWERBLkxpbmU+LFxyXG4gICAgVHJhbnNmb3JtZXJzOiBBcnJheTxPcGVuWERBLlRyYW5zZm9ybWVyPlxyXG59XHJcblxyXG5pbnRlcmZhY2UgV2l6YXJkU3RhdGUge1xyXG4gICAgY3VycmVudFN0ZXA6IG51bWJlcixcclxuICAgIE1ldGVySW5mbzogT3BlblhEQS5NZXRlcixcclxuICAgIExvY2F0aW9uSW5mbzogT3BlblhEQS5Mb2NhdGlvbixcclxuICAgIENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+LFxyXG4gICAgQXNzZXRzOiBBcnJheTxPcGVuWERBLkJyZWFrZXIgfCBPcGVuWERBLkJ1cyB8IE9wZW5YREEuQ2FwQmFuayB8IE9wZW5YREEuTGluZSB8IE9wZW5YREEuVHJhbnNmb3JtZXI+LFxyXG4gICAgQXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+LFxyXG4gICAgTWV0ZXJLZXlzOiBBcnJheTxzdHJpbmc+LFxyXG4gICAgTG9jYXRpb25LZXlzOiBBcnJheTxzdHJpbmc+XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld01ldGVyV2l6YXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCBXaXphcmRTdGF0ZSwge30+e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwOiB0aGlzLmdldEN1cnJlbnRTdGVwKCksIFxyXG4gICAgICAgICAgICBNZXRlckluZm86IHRoaXMuZ2V0TWV0ZXJJbmZvKCksXHJcbiAgICAgICAgICAgIExvY2F0aW9uSW5mbzogdGhpcy5nZXRMb2NhdGlvbkluZm8oKSAsXHJcbiAgICAgICAgICAgIENoYW5uZWxzOiB0aGlzLmdldENoYW5uZWxzKCksXHJcbiAgICAgICAgICAgIEFzc2V0czogdGhpcy5nZXRBc3NldHMoKSxcclxuICAgICAgICAgICAgQXNzZXRDb25uZWN0aW9uczogdGhpcy5nZXRBc3NldENvbm5lY3Rpb25zKCksXHJcbiAgICAgICAgICAgIE1ldGVyS2V5czogW10sXHJcbiAgICAgICAgICAgIExvY2F0aW9uS2V5czogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm5leHQgPSB0aGlzLm5leHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnByZXYgPSB0aGlzLnByZXYuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YSA9IHRoaXMuY2xlYXJEYXRhLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IHRoaXMudXBkYXRlU3RhdGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmdldEhlYWRlciA9IHRoaXMuZ2V0SGVhZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlTmV4dCA9IHRoaXMuZGlzYWJsZU5leHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZE5ld01ldGVyID0gdGhpcy5hZGROZXdNZXRlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmdldE1ldGVyS2V5cygpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9jYXRpb25LZXlzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50U3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIDFcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWV0ZXJJbmZvKCk6IE9wZW5YREEuTWV0ZXIge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgSUQ6IDAsXHJcbiAgICAgICAgICAgICAgICBBc3NldEtleTogbnVsbCxcclxuICAgICAgICAgICAgICAgIE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBTaG9ydE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBBbGlhczogbnVsbCxcclxuICAgICAgICAgICAgICAgIE1ha2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBNb2RlbDogbnVsbCxcclxuICAgICAgICAgICAgICAgIFRpbWVab25lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgRGVzY3JpcHRpb246IG51bGwsXHJcbiAgICAgICAgICAgICAgICBMb2NhdGlvbklEOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMb2NhdGlvbkluZm8oKTogT3BlblhEQS5Mb2NhdGlvbiB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25JbmZvJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uS2V5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIEFsaWFzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgU2hvcnROYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTGF0aXR1ZGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBMb25naXR1ZGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENoYW5uZWxzKCk6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4ge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkNoYW5uZWxzJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DaGFubmVscycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2V0cygpOiBBcnJheTxPcGVuWERBLkJyZWFrZXIgfCBPcGVuWERBLkJ1cyB8IE9wZW5YREEuQ2FwQmFuayB8IE9wZW5YREEuTGluZSB8IE9wZW5YREEuVHJhbnNmb3JtZXI+XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NldENvbm5lY3Rpb25zKCk6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1ldGVyS2V5cygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLk1ldGVyS2V5cycpKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTWV0ZXJLZXlzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1ldGVyS2V5cycpKSB9KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlcmAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5kb25lKChtZXRlcnM6IEFycmF5PE9wZW5YREEuTWV0ZXI+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5cyA9IG1ldGVycy5tYXAoYSA9PiBhLkFzc2V0S2V5LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1ldGVyS2V5czoga2V5cyB9KTtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1ldGVyS2V5cycsIEpTT04uc3RyaW5naWZ5KGtleXMpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG9jYXRpb25LZXlzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25LZXlzJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbktleXM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25LZXlzJykpIH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKG1sczogQXJyYXk8T3BlblhEQS5Mb2NhdGlvbj4pID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gbWxzLm1hcChhID0+IGEuTG9jYXRpb25LZXkudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb25LZXlzOiBrZXlzfSk7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbktleXMnLCBKU09OLnN0cmluZ2lmeShrZXlzKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYWRkTmV3TWV0ZXIoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQsIE1vdXNlRXZlbnQ+KTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvTmV3YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBNZXRlckluZm86IHRoaXMuc3RhdGUuTWV0ZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgTG9jYXRpb25JbmZvOiB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mbyxcclxuICAgICAgICAgICAgICAgIENoYW5uZWxzOiB0aGlzLnN0YXRlLkNoYW5uZWxzLFxyXG4gICAgICAgICAgICAgICAgQXNzZXRzOiB0aGlzLnN0YXRlLkFzc2V0cyxcclxuICAgICAgICAgICAgICAgIEFzc2V0Q29ubmVjdGlvbnM6IHRoaXMuc3RhdGUuQXNzZXRDb25uZWN0aW9uc1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9TWV0ZXJzJztcclxuICAgICAgICB9KS5mYWlsKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBob21lUGF0aCArICdpbmRleC5jc2h0bWw/bmFtZT1NZXRlcnMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICBsZXQgY3VycmVudFN0ZXAgPSB0aGlzLnN0YXRlLmN1cnJlbnRTdGVwO1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBjdXJyZW50U3RlcCBpcyBzZXQgdG8gc29tZXRoaW5nIHJlYXNvbmFibGVcclxuICAgICAgICBpZiAoY3VycmVudFN0ZXAgPj0gNCkge1xyXG4gICAgICAgICAgICBjdXJyZW50U3RlcCA9IDU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudFN0ZXAgPSBjdXJyZW50U3RlcCArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnLCBjdXJyZW50U3RlcC50b1N0cmluZygpKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjdXJyZW50U3RlcDogY3VycmVudFN0ZXBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2KCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50U3RlcCA9IHRoaXMuc3RhdGUuY3VycmVudFN0ZXA7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwIDw9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudFN0ZXAgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwID0gY3VycmVudFN0ZXAgLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJywgY3VycmVudFN0ZXAudG9TdHJpbmcoKSlcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY3VycmVudFN0ZXA6IGN1cnJlbnRTdGVwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU3RhdGUoc3RhdGUpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdNZXRlckluZm8nKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycsIEpTT04uc3RyaW5naWZ5KHN0YXRlLk1ldGVySW5mbykpXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdMb2NhdGlvbkluZm8nKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycsIEpTT04uc3RyaW5naWZ5KHN0YXRlLkxvY2F0aW9uSW5mbykpXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdDaGFubmVscycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnLCBKU09OLnN0cmluZ2lmeShzdGF0ZS5DaGFubmVscykpXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdBc3NldHMnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycsIEpTT04uc3RyaW5naWZ5KHN0YXRlLkFzc2V0cykpXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdBc3NldENvbm5lY3Rpb25zJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJywgSlNPTi5zdHJpbmdpZnkoc3RhdGUuQXNzZXRDb25uZWN0aW9ucykpXHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyTG9jYWxTdG9yYWdlKCk7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1ldGVySW5mbzogdGhpcy5nZXRNZXRlckluZm8oKSwgTG9jYXRpb25JbmZvOiB0aGlzLmdldExvY2F0aW9uSW5mbygpLCBDaGFubmVsczogdGhpcy5nZXRDaGFubmVscygpLCBjdXJyZW50U3RlcDogdGhpcy5nZXRDdXJyZW50U3RlcCgpLCBBc3NldHM6IHRoaXMuZ2V0QXNzZXRzKCkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJMb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlckluZm8nKVxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25JbmZvJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5DaGFubmVscycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnKVxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRIZWFkZXIoKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDEpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgMTogR2VuZXJhbCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDIpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgMjogU3Vic3RhdGlvbiBpbmZvcm1hdGlvbiBmb3IgdGhlIG5ldyBtZXRlclwiXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDM6IFBvcHVsYXRlIGNoYW5uZWxzIGZvciB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDQpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgNDogUG9wdWxhdGUgYXNzZXRzIG1vbml0b3JlZCBieSB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDUpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgNTogQWRkIGNvbm5lY3Rpb24gYmV0d2VlbiB0aGUgYXNzZXRzIHRoYXQgYXJlIG1vbml0b3JlZCBieSB0aGUgbmV3IG1ldGVyXCJcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFnZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UxIE1ldGVySW5mbz17dGhpcy5zdGF0ZS5NZXRlckluZm99IFVwZGF0ZVN0YXRlPXsobWV0ZXIpID0+IHRoaXMudXBkYXRlU3RhdGUoe01ldGVySW5mbzogbWV0ZXJ9KX0gLz5cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDIpXHJcbiAgICAgICAgICAgIHJldHVybiA8UGFnZTIgTG9jYXRpb25JbmZvPXt0aGlzLnN0YXRlLkxvY2F0aW9uSW5mb30gVXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UzIE1ldGVyS2V5PXt0aGlzLnN0YXRlLk1ldGVySW5mby5Bc3NldEtleX0gQ2hhbm5lbHM9e3RoaXMuc3RhdGUuQ2hhbm5lbHN9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gNClcclxuICAgICAgICAgICAgcmV0dXJuIDxQYWdlNCBBc3NldENvbm5lY3Rpb25zPXt0aGlzLnN0YXRlLkFzc2V0Q29ubmVjdGlvbnN9IENoYW5uZWxzPXt0aGlzLnN0YXRlLkNoYW5uZWxzfSBBc3NldHM9e3RoaXMuc3RhdGUuQXNzZXRzfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDUpXHJcbiAgICAgICAgICAgIHJldHVybiA8UGFnZTUgQXNzZXRzPXt0aGlzLnN0YXRlLkFzc2V0c30gQXNzZXRDb25uZWN0aW9ucz17dGhpcy5zdGF0ZS5Bc3NldENvbm5lY3Rpb25zfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZU5leHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgYXNzZXRLZXk6IGJvb2xlYW4gPSB0aGlzLnN0YXRlLk1ldGVySW5mby5Bc3NldEtleSA9PSBudWxsIHx8IHRoaXMuc3RhdGUuTWV0ZXJJbmZvLkFzc2V0S2V5Lmxlbmd0aCA9PSAwIHx8IHRoaXMuc3RhdGUuTWV0ZXJLZXlzLmluZGV4T2YodGhpcy5zdGF0ZS5NZXRlckluZm8uQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkgPj0gMDtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IGJvb2xlYW4gPSB0aGlzLnN0YXRlLk1ldGVySW5mby5OYW1lID09IG51bGwgfHwgdGhpcy5zdGF0ZS5NZXRlckluZm8uTmFtZS5sZW5ndGggPT0gMDtcclxuICAgICAgICAgICAgdmFyIG1ha2U6IGJvb2xlYW4gPSB0aGlzLnN0YXRlLk1ldGVySW5mby5NYWtlID09IG51bGwgfHwgdGhpcy5zdGF0ZS5NZXRlckluZm8uTWFrZS5sZW5ndGggPT0gMDtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBib29sZWFuID0gdGhpcy5zdGF0ZS5NZXRlckluZm8uTW9kZWwgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLk1ldGVySW5mby5Nb2RlbC5sZW5ndGggPT0gMDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhc3NldEtleSB8fCBuYW1lIHx8IG1ha2UgfHwgbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gMikge1xyXG4gICAgICAgICAgICB2YXIga2V5OiBib29sZWFuID0gdGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleS5sZW5ndGggPT0gMCB8fCAodGhpcy5zdGF0ZS5Mb2NhdGlvbktleXMuaW5kZXhPZih0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleS50b0xvd2VyQ2FzZSgpKSA+PSAwICYmIHRoaXMuc3RhdGUuTG9jYXRpb25JbmZvLklEID09IDApO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogYm9vbGVhbiA9IHRoaXMuc3RhdGUuTG9jYXRpb25JbmZvLk5hbWUgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5OYW1lLmxlbmd0aCA9PSAwO1xyXG4gICAgICAgICAgICB2YXIgbGF0aXR1ZGU6IGJvb2xlYW4gPSB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5MYXRpdHVkZSA9PSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgbG9uZ2l0dWRlOiBib29sZWFuID0gdGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm8uTG9uZ2l0dWRlID09IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ga2V5IHx8IG5hbWUgfHwgbGF0aXR1ZGUgfHwgbG9uZ2l0dWRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDMpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkNoYW5uZWxzLmxlbmd0aCA9PSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gNClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuQXNzZXRzLmxlbmd0aCA9PSAwO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nOiAxMCwgaGVpZ2h0OiAnaW5oZXJpdCcsIG92ZXJmbG93WTogJ2hpZGRlbid9fT5cclxuICAgICAgICAgICAgICAgIDxoMj5OZXcgTWV0ZXIgV2l6YXJkPC9oMj5cclxuICAgICAgICAgICAgICAgIDxoci8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17e2hlaWdodDogJ2NhbGMoMTAwJSAtIDc1cHgpJ319PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMuY2xlYXJEYXRhfSA+Q2xlYXIgRGF0YTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgc3R5bGU9e3t3aWR0aDogJzkwJSd9fT57dGhpcy5nZXRIZWFkZXIoKX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCIgc3R5bGU9e3ttYXhIZWlnaHQ6ICdjYWxjKDEwMCUgLSAxMjZweCknfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldFBhZ2UoKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIG9uQ2xpY2s9e3RoaXMucHJldn0gaGlkZGVuPXt0aGlzLnN0YXRlLmN1cnJlbnRTdGVwIDw9IDF9PlByZXY8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMubmV4dH0gaGlkZGVuPXt0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID49IDV9IGRpc2FibGVkPXt0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID49IDUgfHwgdGhpcy5kaXNhYmxlTmV4dCgpfT5OZXh0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXt0aGlzLmFkZE5ld01ldGVyfSBoaWRkZW49e3RoaXMuc3RhdGUuY3VycmVudFN0ZXAgPCA1fT5TdWJtaXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlMS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDMvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuaW1wb3J0IEZvcm1UZXh0QXJlYSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1UZXh0QXJlYSc7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgU2VsZWN0VmFsdWVMaXN0LCBTZWxlY3RWYWx1ZUxpc3RTdGF0dXMsIEZldGNoVmFsdWVMaXN0IH0gZnJvbSAnLi4vU3RvcmUvVmFsdWVMaXN0U2xpY2UnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UxKHByb3BzOiB7IE1ldGVySW5mbzogT3BlblhEQS5NZXRlciwgVXBkYXRlU3RhdGU6IChyZWNvcmQ6IE9wZW5YREEuTWV0ZXIpID0+IHZvaWQgfSkge1xyXG4gICAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG4gICAgY29uc3QgdGltZVpvbmVzID0gdXNlU2VsZWN0b3Ioc3RhdGUgPT4gU2VsZWN0VmFsdWVMaXN0KHN0YXRlLCAnVGltZVpvbmVzJykpO1xyXG4gICAgY29uc3QgdHpTdGF0dXMgPSB1c2VTZWxlY3RvcihzdGF0ZSA9PiBTZWxlY3RWYWx1ZUxpc3RTdGF0dXMoc3RhdGUsICdUaW1lWm9uZXMnKSkgYXMgU3lzdGVtQ2VudGVyLlN0YXR1cztcclxuICAgIGNvbnN0IFttZXRlcktleXMsIHNldE1ldGVyS2V5c10gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xyXG5cclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSBnZXRNZXRlcktleXMoKTtcclxuICAgICAgICBoYW5kbGUuZG9uZSgobWV0ZXJzOiBBcnJheTxPcGVuWERBLk1ldGVyPikgPT4ge1xyXG4gICAgICAgIHZhciBrZXlzID0gbWV0ZXJzLm1hcChhID0+IGEuQXNzZXRLZXkudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIHNldE1ldGVyS2V5cyhrZXlzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPT0gdW5kZWZpbmVkKSBoYW5kbGUuYWJvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFtdKVxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAodHpTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCB0elN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gZGlzcGF0Y2goRmV0Y2hWYWx1ZUxpc3QoeyBncm91cDogJ1RpbWVab25lcycgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9pZiAodHpTdGF0dXMgPT0gJ2xvYWRpbmcnKSBwcm9taXNlLmFib3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIHR6U3RhdHVzXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TWV0ZXJLZXlzKCk6IEpRdWVyeS5qcVhIUjxPcGVuWERBLk1ldGVyW10+IHtcclxuICAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlcmAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkKGZpZWxkOiBrZXlvZiAoT3BlblhEQS5NZXRlcikpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ0Fzc2V0S2V5JylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5Bc3NldEtleSAhPSBudWxsICYmIG1ldGVyS2V5cy5pbmRleE9mKHByb3BzLk1ldGVySW5mby5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKSA8IDAgJiZwcm9wcy5NZXRlckluZm8uQXNzZXRLZXkubGVuZ3RoID4gMCAmJiBwcm9wcy5NZXRlckluZm8uQXNzZXRLZXkubGVuZ3RoIDw9IDUwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5OYW1lICE9IG51bGwgJiYgcHJvcHMuTWV0ZXJJbmZvLk5hbWUubGVuZ3RoID4gMCAmJiBwcm9wcy5NZXRlckluZm8uTmFtZS5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdBbGlhcycpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlckluZm8uQWxpYXMgPT0gbnVsbCB8fCBwcm9wcy5NZXRlckluZm8uQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVySW5mby5TaG9ydE5hbWUgPT0gbnVsbCB8fCBwcm9wcy5NZXRlckluZm8uU2hvcnROYW1lLmxlbmd0aCA8PSA1MDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTWFrZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlckluZm8uTWFrZSAhPSBudWxsICYmIHByb3BzLk1ldGVySW5mby5NYWtlLmxlbmd0aCA+IDAgJiYgcHJvcHMuTWV0ZXJJbmZvLk1ha2UubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTW9kZWwnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTWV0ZXJJbmZvLk1vZGVsICE9IG51bGwgJiYgcHJvcHMuTWV0ZXJJbmZvLk1vZGVsLmxlbmd0aCA+IDAgJiYgcHJvcHMuTWV0ZXJJbmZvLk1vZGVsLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J0Fzc2V0S2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXtwcm9wcy5NZXRlckluZm99IEZpZWxkPXsnTmFtZSd9IEZlZWRiYWNrPXsnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycyBhbmQgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXtwcm9wcy5NZXRlckluZm99IEZpZWxkPXsnU2hvcnROYW1lJ30gRmVlZGJhY2s9eydTaG9ydE5hbWUgbXVzdCBiZSBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycy4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVySW5mb30gRmllbGQ9eydBbGlhcyd9IEZlZWRiYWNrPXsnQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXtwcm9wcy5NZXRlckluZm99IEZpZWxkPXsnTWFrZSd9IEZlZWRiYWNrPXsnTWFrZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVySW5mb30gRmllbGQ9eydNb2RlbCd9IEZlZWRiYWNrPXsnTW9kZWwgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+VGltZSBab25lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17cHJvcHMuTWV0ZXJJbmZvID09IG51bGwgfHwgcHJvcHMuTWV0ZXJJbmZvLlRpbWVab25lID09IG51bGwgPyAnLTEnIDogcHJvcHMuTWV0ZXJJbmZvLlRpbWVab25lfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGVyOiBPcGVuWERBLk1ldGVyID0gXy5jbG9uZShwcm9wcy5NZXRlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCItMVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGVyLlRpbWVab25lID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRlci5UaW1lWm9uZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZShtZXRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIi0xXCI+Tm9uZSBTZWxlY3RlZDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aW1lWm9uZXMgIT0gbnVsbCA/IHRpbWVab25lcy5tYXAodHogPT4gPG9wdGlvbiB2YWx1ZT17dHouVGV4dH0ga2V5PXt0ei5UZXh0fSBkaXNhYmxlZD17IXR6LkVuYWJsZWR9IGhpZGRlbj17dHouSGlkZGVufT57dHouQWx0VGV4dDF9PC9vcHRpb24+KSA6IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtVGV4dEFyZWE8T3BlblhEQS5NZXRlcj4gUm93cz17M30gUmVjb3JkPXtwcm9wcy5NZXRlckluZm99IEZpZWxkPXsnRGVzY3JpcHRpb24nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuXHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlMS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDMvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xyXG5pbXBvcnQgRm9ybVRleHRBcmVhIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybVRleHRBcmVhJztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2UyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgTG9jYXRpb25JbmZvOiBPcGVuWERBLkxvY2F0aW9uLCBVcGRhdGVTdGF0ZTogKHJlY29yZCkgPT4gdm9pZCB9LCB7IExvY2F0aW9uczogQXJyYXk8T3BlblhEQS5Mb2NhdGlvbj4gfSwge30+e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgTG9jYXRpb25zOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWxpZCA9IHRoaXMudmFsaWQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsTG9jYXRpb25zKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEFsbExvY2F0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ09wZW5YREEuTG9jYXRpb25zJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbnM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnT3BlblhEQS5Mb2NhdGlvbnMnKSkgfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICAgICAgfSkuZG9uZSgobWxzOiBBcnJheTxPcGVuWERBLkxvY2F0aW9uPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IExvY2F0aW9uczogbWxzIH0pXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdPcGVuWERBLkxvY2F0aW9ucycsIEpTT04uc3RyaW5naWZ5KG1scykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREaWZmZXJlbnRNZXRlckxvY2F0aW9uKG1ldGVyTG9jYXRpb25JRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IExvY2F0aW9uSW5mbzogdGhpcy5zdGF0ZS5Mb2NhdGlvbnMuZmluZCgodmFsdWUsIGluZGV4LCBvYmplY3QpID0+IHZhbHVlLklEID09IG1ldGVyTG9jYXRpb25JRCkgfSlcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuTG9jYXRpb24pKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdMb2NhdGlvbktleScpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5ID09IG51bGwgfHwgdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkubGVuZ3RoID09IDAgfHwgdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkubGVuZ3RoID4gNTApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgPT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkxvY2F0aW9ucy5maW5kKGxvY3MgPT4gbG9jcy5Mb2NhdGlvbktleS50b0xvd2VyQ2FzZSgpID09IHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5LnRvTG93ZXJDYXNlKCkpID09IG51bGw7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5OYW1lICE9IG51bGwgJiYgdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTmFtZS5sZW5ndGggPiAwICYmIHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLk5hbWUubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQWxpYXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uQWxpYXMgPT0gbnVsbCB8fCB0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5BbGlhcy5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTaG9ydE5hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uU2hvcnROYW1lID09IG51bGwgfHwgdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uU2hvcnROYW1lLmxlbmd0aCA8PSA1MDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTGF0aXR1ZGUnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTGF0aXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxhdGl0dWRlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTG9uZ2l0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxvbmdpdHVkZSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIodGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTG9uZ2l0dWRlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRGVzY3JpcHRpb24nKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2VsZWN0IExvY2F0aW9uPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgPT0gbnVsbCA/ICcwJyA6IHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCIwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREaWZmZXJlbnRNZXRlckxvY2F0aW9uKHBhcnNlSW50KGV2dC50YXJnZXQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25JbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvY2F0aW9uS2V5OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxpYXM6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2hvcnROYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhdGl0dWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9uZ2l0dWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb246ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIj5BZGQgTmV3PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuc3RhdGUuTG9jYXRpb25zICE9IG51bGwgPyB0aGlzLnN0YXRlLkxvY2F0aW9ucy5tYXAobWwgPT4gPG9wdGlvbiB2YWx1ZT17bWwuSUR9IGtleT17bWwuSUR9PnttbC5Mb2NhdGlvbktleX08L29wdGlvbj4pIDogbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mb30gRmllbGQ9J0xvY2F0aW9uS2V5JyBMYWJlbD0nS2V5JyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdBIHVuaXF1ZSBLZXkgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJyBEaXNhYmxlZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mb30gRmllbGQ9J05hbWUnIFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IExvY2F0aW9uSW5mbzogcmVjb3JkIH0pfSBWYWxpZD17dGhpcy52YWxpZH0gRmVlZGJhY2s9J05hbWUgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLicgRGlzYWJsZWQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdTaG9ydE5hbWUnIExhYmVsPSdTaG9ydCBOYW1lJyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdTaG9ydCBOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJyBEaXNhYmxlZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mb30gRmllbGQ9J0FsaWFzJyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdBbGlhcyBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nIERpc2FibGVkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nTGF0aXR1ZGUnIFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IExvY2F0aW9uSW5mbzogcmVjb3JkIH0pfSBWYWxpZD17dGhpcy52YWxpZH0gRmVlZGJhY2s9J0xhdGl0dWRlIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nIERpc2FibGVkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nTG9uZ2l0dWRlJyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdMb25naXR1ZGUgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLicgRGlzYWJsZWQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTG9jYXRpb24+IFJvd3M9ezN9IFJlY29yZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdEZXNjcmlwdGlvbicgU2V0dGVyPXsocmVjb3JkKSA9PiB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgTG9jYXRpb25JbmZvOiByZWNvcmQgfSl9IFZhbGlkPXt0aGlzLnZhbGlkfSBGZWVkYmFjaz0nJyBEaXNhYmxlZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTMudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IENGR1BhcnNlciBmcm9tICcuLi8uLi8uLi9UUy9DRkdQYXJzZXInO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFNlbGVjdE1lYXN1cmVtZW50VHlwZXMsIFNlbGVjdE1lYXN1cmVtZW50VHlwZVN0YXR1cywgRmV0Y2hNZWFzdXJlbWVudFR5cGUgfSBmcm9tICcuLi9TdG9yZS9NZWFzdXJlbWVudFR5cGVTbGljZSc7XHJcbmltcG9ydCB7IFNlbGVjdFBoYXNlU3RhdHVzLCBTZWxlY3RQaGFzZXMsIEZldGNoUGhhc2UgfSBmcm9tICcuLi9TdG9yZS9QaGFzZVNsaWNlJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYWdlMyhwcm9wczogeyBNZXRlcktleTogc3RyaW5nLCBDaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiwgVXBkYXRlU3RhdGU6IChyZWNvcmQpID0+IHZvaWQgfSkge1xyXG4gICAgY29uc3QgZmlsZUlucHV0ID0gUmVhY3QudXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG4gICAgY29uc3QgbWVhc3VyZW1lbnRUeXBlcyA9IHVzZVNlbGVjdG9yKFNlbGVjdE1lYXN1cmVtZW50VHlwZXMpO1xyXG4gICAgY29uc3QgbXRTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RNZWFzdXJlbWVudFR5cGVTdGF0dXMpIGFzIFN5c3RlbUNlbnRlci5TdGF0dXM7XHJcbiAgICBjb25zdCBwaGFzZXMgPSB1c2VTZWxlY3RvcihTZWxlY3RQaGFzZXMpO1xyXG4gICAgY29uc3QgcGhTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RQaGFzZVN0YXR1cykgYXMgU3lzdGVtQ2VudGVyLlN0YXR1cztcclxuXHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAkKFwiLmN1c3RvbS1maWxlLWlucHV0XCIpLm9uKFwiY2hhbmdlXCIsIChldnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZmlsZU5hbWUgPSAoZXZ0IGFzIFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KS50YXJnZXQudmFsdWUuc3BsaXQoXCJcXFxcXCIpLnBvcCgpO1xyXG4gICAgICAgICAgICAkKGZpbGVJbnB1dCkuc2libGluZ3MoXCIuY3VzdG9tLWZpbGUtbGFiZWxcIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5odG1sKGZpbGVOYW1lKTtcclxuICAgICAgICAgICAgcmVhZFNpbmdsZUZpbGUoKGV2dCBhcyBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgICQoXCIuY3VzdG9tLWZpbGUtaW5wdXRcIikub2ZmKCdjaGFuZ2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbXSlcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChtdFN0YXR1cyA9PT0gJ3VuaW50aWF0ZWQnIHx8IG10U3RhdHVzID09PSAnY2hhbmdlZCcpIHtcclxuICAgICAgICAgICAgbGV0IHByb21pc2UgPSBkaXNwYXRjaChGZXRjaE1lYXN1cmVtZW50VHlwZSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKHByb21pc2UuYWJvcnQoKSAhPT0gdW5kZWZpbmVkKSBwcm9taXNlLmFib3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIG10U3RhdHVzXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAocGhTdGF0dXMgPT09ICd1bmludGlhdGVkJyB8fCBwaFN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gZGlzcGF0Y2goRmV0Y2hQaGFzZSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKHByb21pc2UuYWJvcnQoKSAhPT0gdW5kZWZpbmVkKSBwcm9taXNlLmFib3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIHBoU3RhdHVzXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVhZFNpbmdsZUZpbGUoZXZ0OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG4gICAgICAgIC8vUmV0cmlldmUgdGhlIGZpcnN0IChhbmQgb25seSEpIEZpbGUgZnJvbSB0aGUgRmlsZUxpc3Qgb2JqZWN0XHJcbiAgICAgICAgdmFyIGYgPSBldnQudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgIGlmIChmKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgICAgci5vbmxvYWQgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRzID0gZS50YXJnZXQucmVzdWx0IGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VyO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmLm5hbWUuaW5kZXhPZignLmNmZycpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBuZXcgQ0ZHUGFyc2VyKGNvbnRlbnRzLCBwcm9wcy5NZXRlcktleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoeyBDaGFubmVsczogcGFyc2VyLkNoYW5uZWxzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQXNzZXRzQ2hhbm5lbHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0ZpbGUgaXMgbm90IG9mIHR5cGUgY2ZnLiBQbGVhc2Ugb25seSB1c2UgY29tdHJhZGUgc3RhbmRhcmQgY2ZnIGZpbGVzLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHIucmVhZEFzVGV4dChmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlQ2hhbm5lbChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZShwcm9wcy5DaGFubmVscyk7XHJcbiAgICAgICAgbGV0IHJlY29yZDogT3BlblhEQS5DaGFubmVsID0gY2hhbm5lbHMuc3BsaWNlKGluZGV4LCAxKVswXTtcclxuICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlY29yZC5Bc3NldCA9PSAnJykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgYXNzZXRzOkFycmF5PE9wZW5YREEuQXNzZXQ+ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpO1xyXG5cclxuICAgICAgICBpZiAoYXNzZXRzICE9IG51bGwgJiYgYXNzZXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGFzc2V0ID0gYXNzZXRzLmZpbmQoYSA9PiBhLkFzc2V0S2V5ID09IHJlY29yZC5Bc3NldClcclxuICAgICAgICAgICAgaWYgKGFzc2V0ID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGFubmVsSW5kZXggPSBhc3NldC5DaGFubmVscy5maW5kSW5kZXgoYyA9PiBjLklEID0gcmVjb3JkLklEKTtcclxuICAgICAgICAgICAgaWYgKGNoYW5uZWxJbmRleCA8IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGFzc2V0LkNoYW5uZWxzLnNwbGljZShjaGFubmVsSW5kZXgsMSlcclxuICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldHM6IGFzc2V0cyB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyQXNzZXRzQ2hhbm5lbHMoKTp2b2lkIHtcclxuICAgICAgICBsZXQgYXNzZXRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpO1xyXG5cclxuICAgICAgICBpZiAoYXNzZXRzICE9IG51bGwgJiYgYXNzZXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgJC5lYWNoKGFzc2V0cywgKGluZGV4LCBhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXNzZXQuQ2hhbm5lbHMgPSBbXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldHM6IGFzc2V0cyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMCwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQU4nLCBOYW1lOiAnVkFOJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdWb2x0YWdlIEFOJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMSwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQk4nLCBOYW1lOiAnVkJOJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdWb2x0YWdlIEJOJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMiwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQ04nLCBOYW1lOiAnVkNOJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdWb2x0YWdlIENOJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMywgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0N1cnJlbnQnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQU4nLCBOYW1lOiAnSUEnLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ0N1cnJlbnQgQScsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDQsIE1ldGVyOiBwcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdDdXJyZW50JywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0JOJywgTmFtZTogJ0lCJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdDdXJyZW50IEInLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiA1LCBNZXRlcjogcHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnQ3VycmVudCcsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdDTicsIE5hbWU6ICdJQycsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnQ3VycmVudCBDJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogNiwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0N1cnJlbnQnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnTkcnLCBOYW1lOiAnSU4nLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ0N1cnJlbnQgTkcnLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFzc2V0c0NoYW5uZWxzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0+RGVmYXVsdCBTZXR1cDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VzdG9tLWZpbGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGNsYXNzTmFtZT1cImN1c3RvbS1maWxlLWlucHV0XCIgcmVmPXtmaWxlSW5wdXR9IGFjY2VwdD1cIi5jZmcsLnBhclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY3VzdG9tLWZpbGUtbGFiZWxcIj5DaG9vc2UgYSBjb210cmFkZSBzdGFuZGFyZCBjZmcgZmlsZSBpZiBhcHBsaWNhYmxlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWw6IE9wZW5YREEuQ2hhbm5lbCA9IHsgSUQ6IHByb3BzLkNoYW5uZWxzLmxlbmd0aCwgTWV0ZXI6IHByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ1ZvbHRhZ2UnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQU4nLCBOYW1lOiAnVkFOJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdWb2x0YWdlIEFOJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUocHJvcHMuQ2hhbm5lbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVscy5wdXNoKGNoYW5uZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+QWRkIENoYW5uZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiAnY2FsYygxMDAlIC0gMzVweCknLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtaG92ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5DaGFubmVsPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5EZXNjPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5QaGFzZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQ2hhbm5lbHMubWFwKChjaGFubmVsLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICc1JScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyAgdmFsdWU9e2NoYW5uZWwuU2VyaWVzLlNvdXJjZUluZGV4ZXN9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLlNlcmllcy5Tb3VyY2VJbmRleGVzID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHtDaGFubmVsczogYXJyYXl9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5OYW1lfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5OYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICc0NSUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuRGVzY3JpcHRpb259IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkRlc2NyaXB0aW9uID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pns8c2VsZWN0IGNsYXNzTmFtZT0gJ2Zvcm0tY29udHJvbCcgIHZhbHVlPXtjaGFubmVsLk1lYXN1cmVtZW50VHlwZX0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuTWVhc3VyZW1lbnRUeXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e21lYXN1cmVtZW50VHlwZXMubWFwKGEgPT4gPG9wdGlvbiBrZXk9e2EuSUR9IHZhbHVlPXthLk5hbWV9PnthLk5hbWV9PC9vcHRpb24+KX08L3NlbGVjdD59PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLlBoYXNlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5QaGFzZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZSh7IENoYW5uZWxzOiBhcnJheSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PntwaGFzZXMubWFwKGEgPT4gPG9wdGlvbiBrZXk9e2EuSUR9IHZhbHVlPXthLk5hbWV9PnthLk5hbWV9PC9vcHRpb24+KX08L3NlbGVjdD59PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IGRlbGV0ZUNoYW5uZWwoaW5kZXgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIDwvPlxyXG4gICAgICAgICk7XHJcblxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIFBhZ2U0LnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uL2dsb2JhbCc7XG5pbXBvcnQgQnJlYWtlckF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQnJlYWtlcic7XG5pbXBvcnQgQnVzQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9CdXMnO1xuaW1wb3J0IENhcEJhbmtBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmsnO1xuaW1wb3J0IExpbmVBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0xpbmUnO1xuaW1wb3J0IFRyYW5zZm9ybWVyQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9UcmFuc2Zvcm1lcic7XG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcbmltcG9ydCB7IGdldEFzc2V0VHlwZXMsIGdldEFsbEFzc2V0cyB9IGZyb20gJy4uLy4uLy4uL1RTL1NlcnZpY2VzL0Fzc2V0JztcbmltcG9ydCBDYXBCYW5rUmVsYXlBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0NhcEJhbmtSZWxheSc7XG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBTZWxlY3RBc3NldFR5cGVzLCBTZWxlY3RBc3NldFR5cGVTdGF0dXMsIEZldGNoQXNzZXRUeXBlIH0gZnJvbSAnLi4vU3RvcmUvQXNzZXRUeXBlU2xpY2UnO1xyXG5cbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XG5cbmludGVyZmFjZSBQYWdlNFByb3BzIHtcbiAgICBBc3NldHM6IEFycmF5PE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lciB8IE9wZW5YREEuQ2FwQmFua1JlbGF5PixcbiAgICBDaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPixcbiAgICBBc3NldENvbm5lY3Rpb25zOiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbj4sXG4gICAgVXBkYXRlU3RhdGU6IChyZWNvcmQpID0+IHZvaWQgXG59XG5cbnR5cGUgQXNzZXRUeXBlID0gT3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLlRyYW5zZm9ybWVyIHwgT3BlblhEQS5DYXBCYW5rUmVsYXk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2U0KHByb3BzOiBQYWdlNFByb3BzKSB7XG4gICAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICAgIGNvbnN0IGFzc2V0VHlwZXMgPSB1c2VTZWxlY3RvcihTZWxlY3RBc3NldFR5cGVzKTtcbiAgICBjb25zdCBhdFN0YXR1cyA9IHVzZVNlbGVjdG9yKFNlbGVjdEFzc2V0VHlwZVN0YXR1cyk7XG5cbiAgICBjb25zdCBbbmV3RWRpdEFzc2V0LCBzZXROZXdFZGl0QXNzZXRdID0gUmVhY3QudXNlU3RhdGU8QXNzZXRUeXBlPihBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSk7XG4gICAgY29uc3QgW2FsbEFzc2V0cywgc2V0QWxsQXNzZXRzXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuQXNzZXRbXT4oW10pO1xuICAgIGNvbnN0IFtuZXdFZGl0LCBzZXROZXdFZGl0XSA9IFJlYWN0LnVzZVN0YXRlPCdOZXcnIHwgJ0VkaXQnPignTmV3Jyk7XG5cbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBsZXQgaGFuZGxlMSA9IGdldEFsbEFzc2V0cygpO1xuXG4gICAgICAgIGhhbmRsZTEuZG9uZShhYXMgPT4gc2V0QWxsQXNzZXRzKGFhcykpO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaGFuZGxlMS5hYm9ydCAhPSB1bmRlZmluZWQpIGhhbmRsZTEuYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcblxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGF0U3RhdHVzID09PSAndW5pbnRpYXRlZCcgfHwgYXRTdGF0dXMgPT09ICdjaGFuZ2VkJykge1xyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IGRpc3BhdGNoKEZldGNoQXNzZXRUeXBlKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9pZiAodHpTdGF0dXMgPT0gJ2xvYWRpbmcnKSBwcm9taXNlLmFib3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIGF0U3RhdHVzXSk7XHJcblxuXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0JyZWFrZXInKSB7XG4gICAgICAgICAgICBsZXQgaGFuZGxlID0gZ2V0RUROQVBvaW50KG5ld0VkaXRBc3NldC5JRCk7XG4gICAgICAgICAgICBoYW5kbGUuZG9uZSgoZWRuYVBvaW50OiBPcGVuWERBLkVETkFQb2ludCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZWNvcmQgPSB7IC4uLm5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkJyZWFrZXIgfTtcbiAgICAgICAgICAgICAgICBpZiAoZWRuYVBvaW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZWNvcmQuRUROQVBvaW50ID0gZWRuYVBvaW50LlBvaW50XG4gICAgICAgICAgICAgICAgICAgIHNldE5ld0VkaXRBc3NldChyZWNvcmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlLmFib3J0ICE9PSB1bmRlZmluZWQpIGhhbmRsZS5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnTGluZScpe1xuICAgICAgICAgICAgbGV0IGhhbmRsZSA9IGdldExpbmVTZWdtZW50KG5ld0VkaXRBc3NldC5JRCk7XG4gICAgICAgICAgICBoYW5kbGUuZG9uZSgobGluZVNlZ21lbnQ6IE9wZW5YREEuTGluZURldGFpbCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZWNvcmQgPSBfLmNsb25lKG5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkxpbmUpO1xuICAgICAgICAgICAgICAgIGlmIChsaW5lU2VnbWVudCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkLkRldGFpbCA9IGxpbmVTZWdtZW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWNvcmQuRGV0YWlsID0gQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0xpbmVEZXRhaWxzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KHJlY29yZCk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGUuYWJvcnQgIT09IHVuZGVmaW5lZCkgaGFuZGxlLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cblxuICAgIH0sIFtuZXdFZGl0QXNzZXQuQXNzZXRUeXBlXSk7XG5cbiAgICBmdW5jdGlvbiBlZGl0QXNzZXQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBzZXROZXdFZGl0KCdFZGl0Jyk7XG4gICAgICAgIHNldE5ld0VkaXRBc3NldChwcm9wcy5Bc3NldHNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVBc3NldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBsaXN0ID0gXy5jbG9uZShwcm9wcy5Bc3NldHMpO1xuICAgICAgICBsZXQgcmVjb3JkOiBBcnJheTxPcGVuWERBLkFzc2V0PiA9IGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgbGV0IGFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiA9IF8uY2xvbmUocHJvcHMuQXNzZXRDb25uZWN0aW9ucyk7XG4gICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUocHJvcHMuQ2hhbm5lbHMpO1xuXG4gICAgICAgICQuZWFjaChjaGFubmVscywgKGluZGV4LCBjaGFubmVsKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbm5lbC5Bc3NldCA9PSByZWNvcmRbMF0uQXNzZXRLZXkpXG4gICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9ICcnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBpbmRleCA9IGFzc2V0Q29ubmVjdGlvbnMuZmluZEluZGV4KGFzc2V0Q29ubmVjdGlvbiA9PiBhc3NldENvbm5lY3Rpb24uUGFyZW50ID09IHJlY29yZFswXS5Bc3NldEtleSB8fCBhc3NldENvbm5lY3Rpb24uQ2hpbGQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5KTtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGFzc2V0Q29ubmVjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGluZGV4ID0gYXNzZXRDb25uZWN0aW9ucy5maW5kSW5kZXgoYXNzZXRDb25uZWN0aW9uID0+IGFzc2V0Q29ubmVjdGlvbi5QYXJlbnQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5IHx8IGFzc2V0Q29ubmVjdGlvbi5DaGlsZCA9PSByZWNvcmRbMF0uQXNzZXRLZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldHM6IGxpc3QgfSk7XG4gICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZSh7IEFzc2V0Q29ubmVjdGlvbnM6IGFzc2V0Q29ubmVjdGlvbnMgfSk7XG5cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGNoYW5nZUFzc2V0VHlwZSh0eXBlOiAnTGluZScgfCAnTGluZVNlZ21lbnQnIHwgJ0JyZWFrZXInIHwgJ0J1cycgfCAnQ2FwYWNpdG9yQmFuaycgfCAnVHJhbnNmb3JtZXInIHwgJ0NhcGFjaXRvckJhbmtSZWxheScpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFzc2V0ID0ge1xuICAgICAgICAgICAgSUQ6IG5ld0VkaXRBc3NldC5JRCxcbiAgICAgICAgICAgIEFzc2V0S2V5OiBuZXdFZGl0QXNzZXQuQXNzZXRLZXksXG4gICAgICAgICAgICBBc3NldE5hbWU6IG5ld0VkaXRBc3NldC5Bc3NldE5hbWUsXG4gICAgICAgICAgICBBc3NldFR5cGU6IHR5cGUsXG4gICAgICAgICAgICBEZXNjcmlwdGlvbjogbmV3RWRpdEFzc2V0LkRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgVm9sdGFnZUtWOiBuZXdFZGl0QXNzZXQuVm9sdGFnZUtWLFxuICAgICAgICAgICAgQ2hhbm5lbHM6IG5ld0VkaXRBc3NldC5DaGFubmVscyxcbiAgICAgICAgICAgIFNwYXJlOiBuZXdFZGl0QXNzZXQuU3BhcmVcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2V0ID0gQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0QXR0cmlidXRlcyhhc3NldCwgdHlwZSk7XG4gICAgICAgIHNldE5ld0VkaXRBc3NldCggYXNzZXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldERpZmZlcmVudEFzc2V0KGFzc2V0SUQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgYXNzZXRUeXBlSUQgPSBhbGxBc3NldHMuZmluZChhID0+IGEuSUQgPT0gYXNzZXRJRClbJ0Fzc2V0VHlwZUlEJ107IFxuICAgICAgICBsZXQgYXNzZXRUeXBlID0gYXNzZXRUeXBlcy5maW5kKGF0ID0+IGF0LklEID09IGFzc2V0VHlwZUlEKVxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvJHthc3NldFR5cGUuTmFtZX0vT25lLyR7YXNzZXRJRH1gLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSkuZG9uZSgoYXNzZXQ6IE9wZW5YREEuQXNzZXQpID0+IHtcbiAgICAgICAgICAgIGFzc2V0LkFzc2V0VHlwZSA9IGFzc2V0VHlwZS5OYW1lO1xuICAgICAgICAgICAgYXNzZXQuQ2hhbm5lbHMgPSBbXTtcbiAgICAgICAgICAgIHNldE5ld0VkaXRBc3NldChhc3NldCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldExpbmVTZWdtZW50KGxpbmVJRDogbnVtYmVyKTogSlF1ZXJ5LmpxWEhSPE9wZW5YREEuTGluZVNlZ21lbnQ+IHtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9MaW5lLyR7bGluZUlEfS9MaW5lU2VnbWVudGAsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFRE5BUG9pbnQoYnJlYWtlcklEOiBudW1iZXIpOiBKUXVlcnkuanFYSFI8T3BlblhEQS5FRE5BUG9pbnQ+IHtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9CcmVha2VyLyR7YnJlYWtlcklEfS9FRE5BUG9pbnRgLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgYXN5bmM6IHRydWVcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNhYmxlTW9kYWxTYXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gJCgnLmlzLWludmFsaWQnKS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dBdHRyaWJ1dGVzKCk6IEpTWC5FbGVtZW50IHtcbiAgICAgICAgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0JyZWFrZXInKVxuICAgICAgICAgICAgcmV0dXJuIDxCcmVha2VyQXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcn0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0gLz47XG4gICAgICAgIGVsc2UgaWYgKG5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0J1cycpXG4gICAgICAgICAgICByZXR1cm4gPEJ1c0F0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldH0gVXBkYXRlU3RhdGU9e3NldE5ld0VkaXRBc3NldH0vPjtcbiAgICAgICAgZWxzZSBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFuaycpXG4gICAgICAgICAgICByZXR1cm4gPENhcEJhbmtBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcbiAgICAgICAgZWxzZSBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFua1JlbGF5JylcbiAgICAgICAgICAgIHJldHVybiA8Q2FwQmFua1JlbGF5QXR0cmlidXRlcyBOZXdFZGl0PXtuZXdFZGl0fSBBc3NldD17bmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua1JlbGF5fSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcbiAgICAgICAgZWxzZSBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnTGluZScpXG4gICAgICAgICAgICByZXR1cm4gPExpbmVBdHRyaWJ1dGVzIE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0PXtuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5MaW5lfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcbiAgICAgICAgZWxzZSBpZiAobmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnVHJhbnNmb3JtZXInKVxuICAgICAgICAgICAgcmV0dXJuIDxUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgTmV3RWRpdD17bmV3RWRpdH0gQXNzZXQ9e25ld0VkaXRBc3NldCBhcyBPcGVuWERBLlRyYW5zZm9ybWVyfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSAvPjtcbiAgICB9XG5cblxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9e3ttYXJnaW46IC0yMH19PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyODUsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjg1LCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogMCwgbWFyZ2luOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQ2hhbm5lbHMubWFwKChjaGFubmVsLCBpbmRleCkgPT4gPGxpIHN0eWxlPXt7dGV4dERlY29yYXRpb246IChjaGFubmVsLkFzc2V0Lmxlbmd0aCA+IDAgPyAnbGluZS10aHJvdWdoJyA6IG51bGwpfX0ga2V5PXtpbmRleH0+e2NoYW5uZWwuTmFtZSArICcgLSAnICsgY2hhbm5lbC5EZXNjcmlwdGlvbn08L2xpPilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiBzdHlsZT17e3BhZGRpbmc6IDIwfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogMzggfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNhc3NldE1vZGFsJyBvbkNsaWNrPXsoKSA9PiBzZXROZXdFZGl0KCdOZXcnKX0+QWRkIEFzc2V0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDM1MCwgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXR1czwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPktleTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+a1Y8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5DaGFubmVsczwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQXNzZXRzLm1hcCgoYXNzZXQ6IE9wZW5YREEuQXNzZXQsIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+eyhhc3NldC5JRCA9PSAwID8gJ05ldycgOiAnRXhpc3RpbmcnKX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+e2Fzc2V0LkFzc2V0S2V5fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMzAlJyB9fT57YXNzZXQuQXNzZXROYW1lfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuQXNzZXRUeXBlfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuVm9sdGFnZUtWfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuQ2hhbm5lbHMubGVuZ3RofTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI2Fzc2V0TW9kYWwnIG9uQ2xpY2s9eyhlKSA9PiBlZGl0QXNzZXQoaW5kZXgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS1wZW5jaWxcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4gZGVsZXRlQXNzZXQoaW5kZXgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgaWQ9XCJhc3NldE1vZGFsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgc3R5bGU9e3ttYXhXaWR0aDogJzEwMCUnLCB3aWR0aDogJzkwJSd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPntuZXdFZGl0ID09ICdOZXcnID8gJ0FkZCBOZXcgQXNzZXQgdG8gTWV0ZXInOiAnRWRpdCAnICsgbmV3RWRpdEFzc2V0LkFzc2V0S2V5ICsgJyBmb3IgTWV0ZXInIH08L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXNzZXRBdHRyaWJ1dGVzIEFzc2V0PXtuZXdFZGl0QXNzZXR9IE5ld0VkaXQ9e25ld0VkaXR9IEFzc2V0VHlwZXM9e2Fzc2V0VHlwZXN9IEFsbEFzc2V0cz17YWxsQXNzZXRzfSBVcGRhdGVTdGF0ZT17c2V0TmV3RWRpdEFzc2V0fSBHZXREaWZmZXJlbnRBc3NldD17Z2V0RGlmZmVyZW50QXNzZXR9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzaG93QXR0cmlidXRlcygpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+QXNzb2NpYXRlZCBDaGFubmVsczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBtdWx0aXBsZSBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJywgd2lkdGg6ICcxMDAlJyB9fSBvbkNoYW5nZT17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXQgID0gXy5jbG9uZShuZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5Bc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0LkNoYW5uZWxzID0gKCQoZXZ0LnRhcmdldCkudmFsKCkgYXMgQXJyYXk8c3RyaW5nPikubWFwKGEgPT4gcHJvcHMuQ2hhbm5lbHNbcGFyc2VJbnQoYSldKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoYXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHZhbHVlPXtuZXdFZGl0QXNzZXQuQ2hhbm5lbHMubWFwKGEgPT4gYS5JRC50b1N0cmluZygpKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkNoYW5uZWxzLm1hcCgoY2hhbm5lbCwgaW5kZXgpID0+IDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2luZGV4fSBoaWRkZW49eyBjaGFubmVsLkFzc2V0ICE9IG5ld0VkaXRBc3NldC5Bc3NldEtleSAmJiBjaGFubmVsLkFzc2V0Lmxlbmd0aD4gMH0+e2NoYW5uZWwuTmFtZSArICcgLSAnICsgY2hhbm5lbC5EZXNjcmlwdGlvbn08L29wdGlvbj4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmQ6IE9wZW5YREEuQXNzZXQgPSBfLmNsb25lKG5ld0VkaXRBc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IF8uY2xvbmUocHJvcHMuQXNzZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUocHJvcHMuQ2hhbm5lbHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goY2hhbm5lbHMsIChpbmRleCwgY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFubmVsLkFzc2V0ID09IHJlY29yZC5Bc3NldEtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9ICcnXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLkNoYW5uZWxzLmZpbmRJbmRleChjID0+IGMuSUQgPT0gY2hhbm5lbC5JRCkgPj0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9IHJlY29yZC5Bc3NldEtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2gocmVjb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldHM6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBoaWRkZW49e25ld0VkaXQgIT0gJ05ldyd9PlNhdmU8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmQ6IE9wZW5YREEuQXNzZXQgPSBfLmNsb25lKG5ld0VkaXRBc3NldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IF8uY2xvbmUocHJvcHMuQXNzZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUocHJvcHMuQ2hhbm5lbHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSBsaXN0LmZpbmRJbmRleChyID0+IHIuQXNzZXRLZXkgPT0gcmVjb3JkLkFzc2V0S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RbaV0gPSByZWNvcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goY2hhbm5lbHMsIChpbmRleCwgY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFubmVsLkFzc2V0ID09IHJlY29yZC5Bc3NldEtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9ICcnXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLkNoYW5uZWxzLmZpbmRJbmRleChjID0+IGMuSUQgPT0gY2hhbm5lbC5JRCkgPj0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9IHJlY29yZC5Bc3NldEtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldHM6IGxpc3QgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROZXdFZGl0QXNzZXQoQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBoaWRkZW49e25ld0VkaXQgIT0gJ0VkaXQnfT5TYXZlPC9idXR0b24+XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TmV3RWRpdEFzc2V0KEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+Q2xvc2U8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvPlxuICAgICAgICApO1xuXG59XG5cbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlNS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTAvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBTZWxlY3RBc3NldENvbm5lY3Rpb25UeXBlcywgU2VsZWN0QXNzZXRDb25uZWN0aW9uVHlwZVN0YXR1cywgRmV0Y2hBc3NldENvbm5lY3Rpb25UeXBlIH0gZnJvbSAnLi4vU3RvcmUvQXNzZXRDb25uZWN0aW9uVHlwZVNsaWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2U1KHByb3BzOiB7IEFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4sIEFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiwgVXBkYXRlU3RhdGU6IChyZWNvcmQpID0+IHZvaWQgfSkge1xyXG4gICAgY29uc3Qgc2VsZWN0QXNzZXQgPSBSZWFjdC51c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCBzZWxlY3RUeXBlID0gUmVhY3QudXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG4gICAgY29uc3QgYXNzZXRDb25uZWN0aW9uVHlwZXMgPSB1c2VTZWxlY3RvcihTZWxlY3RBc3NldENvbm5lY3Rpb25UeXBlcyk7XHJcbiAgICBjb25zdCBhY3RTdGF0dXMgPSB1c2VTZWxlY3RvcihTZWxlY3RBc3NldENvbm5lY3Rpb25UeXBlU3RhdHVzKTtcclxuXHJcbiAgICBjb25zdCBbYXNzZXRJbmRleCwgc2V0QXNzZXRJbmRleF0gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KDApO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGFjdFN0YXR1cyA9PT0gJ3VuaW50aWF0ZWQnIHx8IGFjdFN0YXR1cyA9PT0gJ2NoYW5nZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gZGlzcGF0Y2goRmV0Y2hBc3NldENvbm5lY3Rpb25UeXBlKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9pZiAodHpTdGF0dXMgPT0gJ2xvYWRpbmcnKSBwcm9taXNlLmFib3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbZGlzcGF0Y2gsIGFjdFN0YXR1c10pO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIGN1cnJlbnRTdGVwIGlzIHNldCB0byBzb21ldGhpbmcgcmVhc29uYWJsZVxyXG4gICAgICAgIGlmIChhc3NldEluZGV4ID49IHByb3BzLkFzc2V0cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHNldEFzc2V0SW5kZXgoIHByb3BzLkFzc2V0cy5sZW5ndGggLSAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRBc3NldEluZGV4KGFzc2V0SW5kZXggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJldigpIHtcclxuICAgICAgICBpZiAoYXNzZXRJbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHNldEFzc2V0SW5kZXgoMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0QXNzZXRJbmRleChhc3NldEluZGV4IC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlbGV0ZUFzc2V0Q29ubmVjdGlvbihhYzogT3BlblhEQS5Bc3NldENvbm5lY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ID0gXy5jbG9uZShwcm9wcy5Bc3NldENvbm5lY3Rpb25zKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBsaXN0LmZpbmRJbmRleChhID0+IGEgPT0gYWMpO1xyXG4gICAgICAgIGxldCByZWNvcmQ6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiA9IGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZSh7IEFzc2V0Q29ubmVjdGlvbnM6IGxpc3QgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGN1cnJlbnRBc3NldCA9IHByb3BzLkFzc2V0c1thc3NldEluZGV4XVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7IG1hcmdpbjogLTIwIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI4NSwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyODUsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAwLCBtYXJnaW46IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkFzc2V0cy5tYXAoKGFzc2V0LCBpbmRleCkgPT4gPGxpIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAoaW5kZXggPD0gYXNzZXRJbmRleCA/ICdsaW5lLXRocm91Z2gnIDogbnVsbCkgfX0ga2V5PXtpbmRleH0+e2Fzc2V0LkFzc2V0S2V5fTwvbGk+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiBzdHlsZT17eyBwYWRkaW5nOiAwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXt7IGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI25ld0Nvbm5lY3Rpb24nIGRpc2FibGVkPXtwcm9wcy5Bc3NldHMubGVuZ3RoIDw9IDF9PkFkZCBDb25uZWN0aW9uPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJyB9fT57Y3VycmVudEFzc2V0LkFzc2V0S2V5fTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiIHN0eWxlPXt7b3ZlcmZsb3dZOidzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQxNX19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+QXNzZXQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNvbm5lY3Rpb248L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkFzc2V0Q29ubmVjdGlvbnMuZmlsdGVyKCBhYyA9PiBhYy5QYXJlbnQgPT0gY3VycmVudEFzc2V0LkFzc2V0S2V5ICB8fCBhYy5DaGlsZCA9PSBjdXJyZW50QXNzZXQuQXNzZXRLZXkpLm1hcCgoYWM6IE9wZW5YREEuQXNzZXRDb25uZWN0aW9uLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvbkFzc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhYy5QYXJlbnQgPT0gY3VycmVudEFzc2V0LkFzc2V0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25Bc3NldCA9IHByb3BzLkFzc2V0cy5maW5kKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5ID09IGFjLkNoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uQXNzZXQgPSBwcm9wcy5Bc3NldHMuZmluZChhc3NldCA9PiBhc3NldC5Bc3NldEtleSA9PSBhYy5QYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvblR5cGUgPSBhc3NldENvbm5lY3Rpb25UeXBlcy5maW5kKGFjdCA9PiBhY3QuSUQgPT0gYWMuQXNzZXRSZWxhdGlvbnNoaXBUeXBlSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+e2Nvbm5lY3Rpb25Bc3NldC5Bc3NldEtleX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT57Y29ubmVjdGlvbkFzc2V0LkFzc2V0VHlwZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNTAlJyB9fT57Y29ubmVjdGlvblR5cGUgIT0gdW5kZWZpbmVkID8gY29ubmVjdGlvblR5cGUuTmFtZSA6ICcnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiBkZWxldGVBc3NldENvbm5lY3Rpb24oYWMpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLWxlZnRcIiBvbkNsaWNrPXtwcmV2fSBoaWRkZW49e2ZhbHNlfSBkaXNhYmxlZD17YXNzZXRJbmRleCA8IDF9PlByZXY8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXtuZXh0fSBkaXNhYmxlZD17YXNzZXRJbmRleCA9PSBwcm9wcy5Bc3NldHMubGVuZ3RoIC0gMX0+TmV4dDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cIm5ld0Nvbm5lY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj5BZGQgYSBDb25uZWN0aW9uIHRvIHtjdXJyZW50QXNzZXQuQXNzZXRLZXl9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5TZWxlY3QgQ29ubmVjdGluZyBBc3NldDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCByZWY9eyBzZWxlY3RBc3NldH0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuQXNzZXRzLmZpbHRlcihhc3NldCA9PiBhc3NldC5Bc3NldEtleSAhPSBjdXJyZW50QXNzZXQuQXNzZXRLZXkpLm1hcCgoYXNzZXQsIGluZGV4KSA9PiA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXthc3NldC5Bc3NldEtleX0gPnthc3NldC5Bc3NldEtleX08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBDb25uZWN0aW9uIFR5cGU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgcmVmPXtzZWxlY3RUeXBlfSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldENvbm5lY3Rpb25UeXBlcy5tYXAoKGFjdCwgaW5kZXgpID0+IDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2FjdC5JRH0gPnthY3QuTmFtZX08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRDb25uZWN0aW9uID0gJChzZWxlY3RBc3NldC5jdXJyZW50KS52YWwoKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gcGFyc2VJbnQoJChzZWxlY3RUeXBlLmN1cnJlbnQpLnZhbCgpIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiA9IF8uY2xvbmUocHJvcHMuQXNzZXRDb25uZWN0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRDb25uZWN0aW9ucy5wdXNoKHsgSUQ6IDAsIEFzc2V0UmVsYXRpb25zaGlwVHlwZUlEOiBjb25uZWN0aW9uVHlwZSwgUGFyZW50OiBjdXJyZW50QXNzZXQuQXNzZXRLZXksIENoaWxkOiBjaGlsZENvbm5lY3Rpb24gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldENvbm5lY3Rpb25zOiBhc3NldENvbm5lY3Rpb25zfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19ID5TYXZlPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG5cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==