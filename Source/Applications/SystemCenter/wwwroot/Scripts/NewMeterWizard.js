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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommonComponents/FormInput */ "./TSX/SystemCenter/CommonComponents/FormInput.tsx");
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




var Page1 = /** @class */ (function (_super) {
    __extends(Page1, _super);
    function Page1(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            TimeZones: [],
            MeterKeys: []
        };
        _this.valid = _this.valid.bind(_this);
        return _this;
    }
    Page1.prototype.componentDidMount = function () {
        this.getMeterKeys();
        this.getTimeZones();
    };
    Page1.prototype.getTimeZones = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('SystemCenter.TimeZones'))
            this.setState({ TimeZones: JSON.parse(sessionStorage.getItem('SystemCenter.TimeZones')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/ValueList/Group/TimeZones",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (tzs) {
                _this.setState({ TimeZones: tzs });
                sessionStorage.setItem('SystemCenter.TimeZones', JSON.stringify(tzs));
            });
    };
    Page1.prototype.getMeterKeys = function () {
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
    Page1.prototype.valid = function (field) {
        if (field == 'AssetKey')
            return this.props.MeterInfo.AssetKey != null && this.state.MeterKeys.indexOf(this.props.MeterInfo.AssetKey.toLowerCase()) < 0 && this.props.MeterInfo.AssetKey.length > 0 && this.props.MeterInfo.AssetKey.length <= 50;
        else if (field == 'Name')
            return this.props.MeterInfo.Name != null && this.props.MeterInfo.Name.length > 0 && this.props.MeterInfo.Name.length <= 200;
        else if (field == 'Alias')
            return this.props.MeterInfo.Alias == null || this.props.MeterInfo.Alias.length <= 200;
        else if (field == 'ShortName')
            return this.props.MeterInfo.ShortName == null || this.props.MeterInfo.ShortName.length <= 50;
        else if (field == 'Make')
            return this.props.MeterInfo.Make != null && this.props.MeterInfo.Make.length > 0 && this.props.MeterInfo.Make.length <= 200;
        else if (field == 'Model')
            return this.props.MeterInfo.Model != null && this.props.MeterInfo.Model.length > 0 && this.props.MeterInfo.Model.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    };
    Page1.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.props.MeterInfo, Field: 'AssetKey', Feedback: 'A unique key of less than 50 characters is required.', Valid: this.valid, Setter: this.props.UpdateState }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.props.MeterInfo, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: this.valid, Setter: this.props.UpdateState }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.props.MeterInfo, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: this.valid, Setter: this.props.UpdateState }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.props.MeterInfo, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: this.valid, Setter: this.props.UpdateState })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.props.MeterInfo, Field: 'Make', Feedback: 'Make must be less than 200 characters.', Valid: this.valid, Setter: this.props.UpdateState }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormInput__WEBPACK_IMPORTED_MODULE_2__["default"], { Record: this.props.MeterInfo, Field: 'Model', Feedback: 'Model must be less than 200 characters.', Valid: this.valid, Setter: this.props.UpdateState }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Time Zone"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: "form-control", value: this.props.MeterInfo == null || this.props.MeterInfo.TimeZone == null ? '-1' : this.props.MeterInfo.TimeZone, onChange: function (evt) {
                            var meter = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.MeterInfo);
                            if (evt.target.value != "-1")
                                meter.TimeZone = evt.target.value;
                            else
                                meter.TimeZone = null;
                            _this.props.UpdateState(meter);
                        } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: "-1" }, "None Selected"),
                        (this.state.TimeZones != null ? this.state.TimeZones.sort(function (a, b) { return a.SortOrder - b.SortOrder; }).map(function (tz) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { value: tz.Text, key: tz.Text, disabled: !tz.Enabled, hidden: tz.Hidden }, tz.AltText1); }) : null))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_CommonComponents_FormTextArea__WEBPACK_IMPORTED_MODULE_3__["default"], { Rows: 3, Record: this.props.MeterInfo, Field: 'Description', Valid: this.valid, Setter: this.props.UpdateState }))));
    };
    return Page1;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Page1);


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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TS_CFGParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../TS/CFGParser */ "./TS/CFGParser.ts");
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



var Page3 = /** @class */ (function (_super) {
    __extends(Page3, _super);
    function Page3(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            Phases: [],
            MeasurementTypes: []
        };
        return _this;
    }
    Page3.prototype.componentDidMount = function () {
        var _this = this;
        this.getPhases();
        this.getMeasurementTypes();
        $(".custom-file-input").on("change", function (evt) {
            var fileName = evt.target.value.split("\\").pop();
            $(evt.target).siblings(".custom-file-label").addClass("selected").html(fileName);
            _this.readSingleFile(evt);
        });
    };
    Page3.prototype.getPhases = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('NewMeterWizard.Phases'))
            this.setState({ Phases: JSON.parse(sessionStorage.getItem('NewMeterWizard.Phases')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/Phase",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (phases) {
                _this.setState({ Phases: phases });
                sessionStorage.setItem('NewMeterWizard.Phases', JSON.stringify(phases));
            });
    };
    Page3.prototype.getMeasurementTypes = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('NewMeterWizard.MeasurementTypes'))
            this.setState({ MeasurementTypes: JSON.parse(sessionStorage.getItem('NewMeterWizard.MeasurementTypes')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/MeasurementType",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (measurementTypes) {
                _this.setState({ MeasurementTypes: measurementTypes });
                sessionStorage.setItem('NewMeterWizard.MeasurementTypes', JSON.stringify(measurementTypes));
            });
    };
    Page3.prototype.readSingleFile = function (evt) {
        var _this = this;
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];
        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                var contents = e.target.result;
                var parser;
                if (f.name.indexOf('.cfg') >= 0) {
                    parser = new _TS_CFGParser__WEBPACK_IMPORTED_MODULE_2__["default"](contents, _this.props.MeterKey);
                    _this.props.UpdateState({ Channels: parser.Channels });
                    _this.clearAssetsChannels();
                }
                else
                    alert('File is not of type cfg. Please only use comtrade standard cfg files.');
            };
            r.readAsText(f);
        }
    };
    Page3.prototype.componentWillUnmount = function () {
        $(".custom-file-input").off('change');
    };
    Page3.prototype.deleteChannel = function (index) {
        var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.props.Channels);
        var record = channels.splice(index, 1)[0];
        this.props.UpdateState({ Channels: channels });
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
            this.props.UpdateState({ Assets: assets });
        }
    };
    Page3.prototype.clearAssetsChannels = function () {
        var assets = JSON.parse(localStorage.getItem('NewMeterWizard.Assets'));
        if (assets != null && assets.length > 0) {
            $.each(assets, function (index, asset) {
                asset.Channels = [];
            });
            this.props.UpdateState({ Assets: assets });
        }
    };
    Page3.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary", onClick: function () {
                            var channels = [
                                { ID: 0, Meter: _this.props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                                { ID: 1, Meter: _this.props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'VBN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage BN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                                { ID: 2, Meter: _this.props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'VCN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage CN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                                { ID: 3, Meter: _this.props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'IA', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current A', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                                { ID: 4, Meter: _this.props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'BN', Name: 'IB', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current B', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                                { ID: 5, Meter: _this.props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'CN', Name: 'IC', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current C', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                                { ID: 6, Meter: _this.props.MeterKey, Asset: '', MeasurementType: 'Current', MeasurementCharacteristic: 'Instantaneous', Phase: 'NG', Name: 'IN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Current NG', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } },
                            ];
                            _this.props.UpdateState({ Channels: channels });
                            _this.clearAssetsChannels();
                        } }, "Default Setup")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group", style: { width: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "custom-file" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "file", className: "custom-file-input", ref: "customFile", accept: ".cfg,.par" }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { className: "custom-file-label" }, "Choose a comtrade standard cfg file if applicable")))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: function () {
                            var channel = { ID: _this.props.Channels.length, Meter: _this.props.MeterKey, Asset: '', MeasurementType: 'Voltage', MeasurementCharacteristic: 'Instantaneous', Phase: 'AN', Name: 'VAN', SamplesPerHour: 0, PerUnitValue: null, HarmonicGroup: 0, Description: 'Voltage AN', Enabled: true, Series: { ID: 0, ChannelID: 0, SeriesType: 'Values', SourceIndexes: '' } };
                            var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.Channels);
                            channels.push(channel);
                            _this.props.UpdateState({ Channels: channels });
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
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, this.props.Channels.map(function (channel, index, array) {
                        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '5%' } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Series.SourceIndexes, onChange: function (event) {
                                        channel.Series.SourceIndexes = event.target.value;
                                        _this.props.UpdateState({ Channels: array });
                                    } })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Name, onChange: function (event) {
                                        channel.Name = event.target.value;
                                        _this.props.UpdateState({ Channels: array });
                                    } })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '45%' } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { className: 'form-control', value: channel.Description, onChange: function (event) {
                                        channel.Description = event.target.value;
                                        _this.props.UpdateState({ Channels: array });
                                    } })),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.MeasurementType, onChange: function (event) {
                                    channel.MeasurementType = event.target.value;
                                    _this.props.UpdateState({ Channels: array });
                                } }, _this.state.MeasurementTypes.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { className: 'form-control', value: channel.Phase, onChange: function (event) {
                                    channel.Phase = event.target.value;
                                    _this.props.UpdateState({ Channels: array });
                                } }, _this.state.Phases.map(function (a) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: a.ID, value: a.Name }, a.Name); }))),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return _this.deleteChannel(index); } },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                    }))))));
    };
    return Page3;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Page3);


/***/ }),

/***/ "./TSX/SystemCenter/NewMeterWizard/Page4.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/NewMeterWizard/Page4.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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










var Page4 = /** @class */ (function (_super) {
    __extends(Page4, _super);
    function Page4(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAsset('Line'),
            AllAssets: [],
            AssetTypes: [],
            NewEdit: 'New'
        };
        _this.getDifferentAsset = _this.getDifferentAsset.bind(_this);
        return _this;
    }
    Page4.prototype.componentDidMount = function () {
        var _this = this;
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_8__["getAllAssets"])().done(function (aas) { return _this.setState({ AllAssets: aas }); });
        Object(_TS_Services_Asset__WEBPACK_IMPORTED_MODULE_8__["getAssetTypes"])().done(function (ats) { return _this.setState({ AssetTypes: ats }); });
    };
    Page4.prototype.editAsset = function (index) {
        this.setState({ NewEdit: 'Edit', NewEditAsset: this.props.Assets[index] });
    };
    Page4.prototype.deleteAsset = function (index) {
        var list = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.props.Assets);
        var record = list.splice(index, 1);
        var assetConnections = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.props.AssetConnections);
        var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.props.Channels);
        $.each(channels, function (index, channel) {
            if (channel.Asset == record[0].AssetKey)
                channel.Asset = '';
        });
        var index = assetConnections.findIndex(function (assetConnection) { return assetConnection.Parent == record[0].AssetKey || assetConnection.Child == record[0].AssetKey; });
        while (index >= 0) {
            assetConnections.splice(index, 1);
            index = assetConnections.findIndex(function (assetConnection) { return assetConnection.Parent == record[0].AssetKey || assetConnection.Child == record[0].AssetKey; });
        }
        this.props.UpdateState({ Assets: list });
        this.props.UpdateState({ Channels: channels });
        this.props.UpdateState({ AssetConnections: assetConnections });
    };
    Page4.prototype.addAsset = function () {
    };
    Page4.prototype.changeAssetType = function (type) {
        var asset = {
            ID: this.state.NewEditAsset.ID,
            AssetKey: this.state.NewEditAsset.AssetKey,
            AssetName: this.state.NewEditAsset.AssetName,
            AssetType: type,
            Description: this.state.NewEditAsset.Description,
            VoltageKV: this.state.NewEditAsset.VoltageKV,
            Channels: this.state.NewEditAsset.Channels,
            Spare: this.state.NewEditAsset.Spare
        };
        asset = _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAssetAttributes(asset, type);
        this.setState({ NewEditAsset: asset });
    };
    Page4.prototype.getDifferentAsset = function (assetID) {
        var _this = this;
        var assetTypeID = this.state.AllAssets.find(function (a) { return a.ID == assetID; })['AssetTypeID'];
        var assetType = this.state.AssetTypes.find(function (at) { return at.ID == assetTypeID; });
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
            _this.setState({ NewEditAsset: asset }, function () {
                if (_this.state.NewEditAsset.AssetType == 'Breaker')
                    _this.getEDNAPoint(_this.state.NewEditAsset.ID);
                else if (assetType.Name == 'Line')
                    _this.getLineSegment(_this.state.NewEditAsset.ID);
            });
        });
    };
    Page4.prototype.getLineSegment = function (lineID) {
        var _this = this;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Line/" + lineID + "/LineSegment",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (lineSegment) {
            var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.NewEditAsset);
            if (lineSegment != undefined) {
                record.Detail = lineSegment;
            }
            else {
                record.Detail = _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewLineDetails();
            }
            _this.setState({ NewEditAsset: record });
        });
    };
    Page4.prototype.getEDNAPoint = function (breakerID) {
        var _this = this;
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/Breaker/" + breakerID + "/EDNAPoint",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        }).done(function (ednaPoint) {
            var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.NewEditAsset);
            if (ednaPoint != undefined) {
                record.EDNAPoint = ednaPoint.Point;
                _this.setState({ NewEditAsset: record });
            }
        });
    };
    Page4.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { margin: -20 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col-lg-4" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { width: '100%', height: window.innerHeight - 285, maxHeight: window.innerHeight - 285, overflowY: 'auto', padding: 0, margin: 0 } }, this.props.Channels.map(function (channel, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { style: { textDecoration: (channel.Asset.length > 0 ? 'line-through' : null) }, key: index }, channel.Name + ' - ' + channel.Description); }))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { padding: 20 } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: 38 } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", "data-toggle": 'modal', "data-target": '#assetModal', onClick: function () { return _this.setState({ NewEdit: 'New' }); } }, "Add Asset")),
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
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, this.props.Assets.map(function (asset, index, array) {
                                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, (asset.ID == 0 ? 'New' : 'Existing')),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } }, asset.AssetKey),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '30%' } }, asset.AssetName),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, asset.AssetType),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, asset.VoltageKV),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } }, asset.Channels.length),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", "data-toggle": 'modal', "data-target": '#assetModal', onClick: function (e) { return _this.editAsset(index); } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-pencil" }))),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return _this.deleteAsset(index); } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                            })))))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal", id: "assetModal" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-dialog", style: { maxWidth: '100%', width: '90%' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-content" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-header" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { className: "modal-title" }, this.state.NewEdit == 'New' ? 'Add New Asset to Meter' : 'Edit ' + this.state.NewEditAsset.AssetKey + ' for Meter'),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "close", "data-dismiss": "modal" }, "\u00D7")),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-body" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"], { Asset: this.state.NewEditAsset, NewEdit: this.state.NewEdit, AssetTypes: this.state.AssetTypes, AllAssets: this.state.AllAssets, UpdateState: function (asset) { return _this.setState({ NewEditAsset: asset }); }, GetDifferentAsset: this.getDifferentAsset })),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" }, this.showAttributes()),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Associated Channels"),
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { multiple: true, style: { height: '100%', width: '100%' }, onChange: function (evt) {
                                            var asset = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.NewEditAsset);
                                            asset.Channels = $(evt.target).val().map(function (a) { return _this.props.Channels[parseInt(a)]; });
                                            _this.setState({ NewEditAsset: asset });
                                        }, value: this.state.NewEditAsset.Channels.map(function (a) { return a.ID.toString(); }) }, this.props.Channels.map(function (channel, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index, value: index, hidden: channel.Asset != _this.state.NewEditAsset.AssetKey && channel.Asset.length > 0 }, channel.Name + ' - ' + channel.Description); }))))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function (evt) {
                                    var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.NewEditAsset);
                                    var list = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.Assets);
                                    var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.Channels);
                                    $.each(channels, function (index, channel) {
                                        if (channel.Asset == record.AssetKey)
                                            channel.Asset = '';
                                        if (record.Channels.findIndex(function (c) { return c.ID == channel.ID; }) >= 0)
                                            channel.Asset = record.AssetKey;
                                    });
                                    list.push(record);
                                    _this.props.UpdateState({ Channels: channels });
                                    _this.props.UpdateState({ Assets: list });
                                    _this.setState({ NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAsset('Line') });
                                }, hidden: this.state.NewEdit != 'New' }, "Save"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function (evt) {
                                    var record = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.state.NewEditAsset);
                                    var list = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.Assets);
                                    var channels = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.Channels);
                                    var i = list.findIndex(function (r) { return r.AssetKey == record.AssetKey; });
                                    list[i] = record;
                                    $.each(channels, function (index, channel) {
                                        if (channel.Asset == record.AssetKey)
                                            channel.Asset = '';
                                        if (record.Channels.findIndex(function (c) { return c.ID == channel.ID; }) >= 0)
                                            channel.Asset = record.AssetKey;
                                    });
                                    _this.props.UpdateState({ Channels: channels });
                                    _this.props.UpdateState({ Assets: list });
                                    _this.setState({ NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAsset('Line') });
                                }, hidden: this.state.NewEdit != 'Edit' }, "Save"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal", onClick: function (evt) {
                                    _this.setState({ NewEditAsset: _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_7__["default"].getNewAsset('Line') });
                                } }, "Close")))))));
    };
    Page4.prototype.disableModalSave = function () {
        return $('.is-invalid').length > 0;
    };
    Page4.prototype.showAttributes = function () {
        var _this = this;
        if (this.state.NewEditAsset.AssetType == 'Breaker')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Breaker__WEBPACK_IMPORTED_MODULE_2__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
        else if (this.state.NewEditAsset.AssetType == 'Bus')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Bus__WEBPACK_IMPORTED_MODULE_3__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
        else if (this.state.NewEditAsset.AssetType == 'CapacitorBank')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBank__WEBPACK_IMPORTED_MODULE_4__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
        else if (this.state.NewEditAsset.AssetType == 'CapacitorBankRelay')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_CapBankRelay__WEBPACK_IMPORTED_MODULE_9__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
        else if (this.state.NewEditAsset.AssetType == 'Line')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Line__WEBPACK_IMPORTED_MODULE_5__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
        else if (this.state.NewEditAsset.AssetType == 'Transformer')
            return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_AssetAttribute_Transformer__WEBPACK_IMPORTED_MODULE_6__["default"], { NewEdit: this.state.NewEdit, Asset: this.state.NewEditAsset, UpdateState: function (newEditAsset) { return _this.setState({ NewEditAsset: newEditAsset }); } });
    };
    return Page4;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Page4);


/***/ }),

/***/ "./TSX/SystemCenter/NewMeterWizard/Page5.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/NewMeterWizard/Page5.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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


var Page5 = /** @class */ (function (_super) {
    __extends(Page5, _super);
    function Page5(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            AssetIndex: 0,
            AssetConnectionTypes: []
        };
        _this.next = _this.next.bind(_this);
        _this.prev = _this.prev.bind(_this);
        return _this;
    }
    Page5.prototype.componentDidMount = function () {
        this.getAssetConnectionTypes();
    };
    Page5.prototype.getAssetConnectionTypes = function () {
        var _this = this;
        if (sessionStorage.hasOwnProperty('NewMeterWizard.AssetConnectionTypes'))
            this.setState({ AssetConnectionTypes: JSON.parse(sessionStorage.getItem('NewMeterWizard.AssetConnectionTypes')) });
        else
            $.ajax({
                type: "GET",
                url: homePath + "api/OpenXDA/AssetConnectionType",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                cache: true,
                async: true
            }).done(function (acts) {
                _this.setState({ AssetConnectionTypes: acts });
                sessionStorage.setItem('NewMeterWizard.AssetConnectionTypes', JSON.stringify(acts));
            });
    };
    Page5.prototype.next = function () {
        var assetIndex = this.state.AssetIndex;
        // Make sure currentStep is set to something reasonable
        if (assetIndex >= this.props.Assets.length - 1) {
            assetIndex = this.props.Assets.length - 1;
        }
        else {
            assetIndex = assetIndex + 1;
        }
        this.setState({
            AssetIndex: assetIndex
        });
    };
    Page5.prototype.prev = function () {
        var assetIndex = this.state.AssetIndex;
        if (assetIndex <= 0) {
            assetIndex = 0;
        }
        else {
            assetIndex = assetIndex - 1;
        }
        this.setState({
            AssetIndex: assetIndex
        });
    };
    Page5.prototype.addAssetConnection = function () {
    };
    Page5.prototype.deleteAssetConnection = function (ac) {
        var list = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](this.props.AssetConnections);
        var index = list.findIndex(function (a) { return a == ac; });
        var record = list.splice(index, 1);
        this.props.UpdateState({ AssetConnections: list });
    };
    Page5.prototype.render = function () {
        var _this = this;
        var currentAsset = this.props.Assets[this.state.AssetIndex];
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { margin: -20 } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col-lg-4" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { width: '100%', height: window.innerHeight - 285, maxHeight: window.innerHeight - 285, overflowY: 'auto', padding: 0, margin: 0 } }, this.props.Assets.map(function (asset, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { style: { textDecoration: (index <= _this.state.AssetIndex ? 'line-through' : null) }, key: index }, asset.AssetKey); }))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { padding: 0 } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card", style: { height: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-header" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", "data-toggle": 'modal', "data-target": '#newConnection', disabled: this.props.Assets.length <= 1 }, "Add Connection"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h4", { style: { width: '100%' } }, currentAsset.AssetKey)),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-body", style: { overflowY: 'scroll', maxHeight: window.innerHeight - 415 } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: "table table-hover" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Asset"),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Type"),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Connection"),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null))),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, this.props.AssetConnections.filter(function (ac) { return ac.Parent == currentAsset.AssetKey || ac.Child == currentAsset.AssetKey; }).map(function (ac, index, array) {
                                    var connectionAsset;
                                    if (ac.Parent == currentAsset.AssetKey) {
                                        connectionAsset = _this.props.Assets.find(function (asset) { return asset.AssetKey == ac.Child; });
                                    }
                                    else
                                        connectionAsset = _this.props.Assets.find(function (asset) { return asset.AssetKey == ac.Parent; });
                                    var connectionType = _this.state.AssetConnectionTypes.find(function (act) { return act.ID == ac.AssetRelationshipTypeID; });
                                    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: index },
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } }, connectionAsset.AssetKey),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '20%' } }, connectionAsset.AssetType),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '50%' } }, connectionType != undefined ? connectionType.Name : ''),
                                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { style: { width: '10%' } },
                                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-sm", onClick: function (e) { return _this.deleteAssetConnection(ac); } },
                                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                                                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fa fa-times" }))))));
                                })))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "card-footer" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-left", onClick: this.prev, hidden: false, disabled: this.state.AssetIndex < 1 }, "Prev"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: this.next, disabled: this.state.AssetIndex == this.props.Assets.length - 1 }, "Next"))))),
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
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { ref: 'assetConnection', className: "form-control", onChange: function (evt) {
                                    } }, this.props.Assets.filter(function (asset) { return asset.AssetKey != currentAsset.AssetKey; }).map(function (asset, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index, value: asset.AssetKey }, asset.AssetKey); }))),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "form-group" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", null, "Select Connection Type"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("select", { ref: 'assetConnectionType', className: "form-control", onChange: function (evt) {
                                    } }, this.state.AssetConnectionTypes.map(function (act, index) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("option", { key: index, value: act.ID }, act.Name); })))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "modal-footer" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary", "data-dismiss": "modal", onClick: function (evt) {
                                    var childConnection = $(_this.refs.assetConnection).val();
                                    var connectionType = parseInt($(_this.refs.assetConnectionType).val());
                                    var assetConnections = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](_this.props.AssetConnections);
                                    assetConnections.push({ ID: 0, AssetRelationshipTypeID: connectionType, Parent: currentAsset.AssetKey, Child: childConnection });
                                    _this.props.UpdateState({ AssetConnections: assetConnections });
                                } }, "Save"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-danger", "data-dismiss": "modal" }, "Close")))))));
    };
    return Page5;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Page5);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9DRkdQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rUmVsYXkudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvTmV3TWV0ZXJXaXphcmQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTEudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTIudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTMudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTQudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTmV3TWV0ZXJXaXphcmQvUGFnZTUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBLHdHQUF3RztBQUN4Ryx3QkFBd0I7QUFDeEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3RztBQUl4RztJQUlJLG1CQUFZLFFBQWdCLEVBQUUsUUFBZ0I7UUFBOUMsaUJBUUM7UUFQRyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFB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LENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFFbEcsT0FBTyxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLENBQUM7U0FDNUM7YUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRTtZQUNsQyxJQUFJLEdBQUcsR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbFAsSUFBSSxJQUFJLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUNyRyxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1lBQ2pFLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7WUFFbkUsT0FBTyxHQUFHLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxTQUFTLENBQUM7U0FDL0M7YUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2FBQ3RDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksQ0FBQztZQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFHekMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDSSxPQUFPLENBQ0gsNkRBQUssS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUM7WUFDN0QsbUZBQXlCO1lBQ3pCLCtEQUFLO1lBQ0wsNkRBQUssU0FBUyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsbUJBQW1CLEVBQUM7Z0JBQ3RELDZEQUFLLFNBQVMsRUFBQyxhQUFhO29CQUN4QixnRUFBUSxTQUFTLEVBQUMsNEJBQTRCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLGlCQUFzQjtvQkFDNUYsNERBQUksS0FBSyxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBTSxDQUNoRDtnQkFDTiw2REFBSyxTQUFTLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBRSxvQkFBb0IsRUFBQyxJQUM5RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQ2I7Z0JBQ04sNkRBQUssU0FBUyxFQUFDLGFBQWE7b0JBQ3hCLGdFQUFRLFNBQVMsRUFBQywyQkFBMkIsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFlO29CQUNwSCxnRUFBUSxTQUFTLEVBQUMsNEJBQTRCLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBZTtvQkFDbEwsZ0VBQVEsU0FBUyxFQUFDLDRCQUE0QixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLGFBQWlCLENBQzNILENBQ0osQ0FFSixDQUNULENBQUM7SUFDTixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLENBdlQyQywrQ0FBZSxHQXVUMUQ7Ozs7Ozs7Ozs7Ozs7O0FDM1dEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLG9CQUFvQjtBQUNwQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBRTBCO0FBQ007QUFJNUQ7SUFBbUMseUJBQTJLO0lBQzFNLGVBQVksS0FBSyxFQUFFLE9BQU87UUFBMUIsWUFDSSxrQkFBTSxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBT3hCO1FBTkcsS0FBSSxDQUFDLEtBQUssR0FBRztZQUNULFNBQVMsRUFBRSxFQUFFO1lBQ2IsU0FBUyxFQUFFLEVBQUU7U0FDaEI7UUFFRCxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDOztJQUN2QyxDQUFDO0lBRUQsaUNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUV4QixDQUFDO0lBR0QsNEJBQVksR0FBWjtRQUFBLGlCQWdCQztRQWZHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQztZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUUzRixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNILElBQUksRUFBRSxLQUFLO2dCQUNYLEdBQUcsRUFBSyxRQUFRLGtDQUErQjtnQkFDL0MsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQXNDO2dCQUMzQyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLGNBQWMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTFFLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELDRCQUFZLEdBQVo7UUFBQSxpQkFnQkM7UUFmRyxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQUM7WUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7WUFFN0YsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDSCxJQUFJLEVBQUUsS0FBSztnQkFDWCxHQUFHLEVBQUssUUFBUSxzQkFBbUI7Z0JBQ25DLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixLQUFLLEVBQUUsSUFBSTtnQkFDWCxLQUFLLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUE0QjtnQkFDakMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO2dCQUNyRCxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ25DLGNBQWMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUdELHFCQUFLLEdBQUwsVUFBTSxLQUE0QjtRQUM5QixJQUFJLEtBQUssSUFBSSxVQUFVO1lBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO2FBQ3ROLElBQUksS0FBSyxJQUFJLE1BQU07WUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO2FBQzNILElBQUksS0FBSyxJQUFJLE9BQU87WUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO2FBQ3JGLElBQUksS0FBSyxJQUFJLFdBQVc7WUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO2FBQzVGLElBQUksS0FBSyxJQUFJLE1BQU07WUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO2FBQzNILElBQUksS0FBSyxJQUFJLE9BQU87WUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO2FBQzlILElBQUksS0FBSyxJQUFJLGFBQWE7WUFDM0IsT0FBTyxJQUFJLENBQUM7UUFDaEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHNCQUFNLEdBQU47UUFBQSxpQkFnQ0M7UUEvQkcsT0FBTyxDQUNILDZEQUFLLFNBQVMsRUFBQyxLQUFLO1lBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dCQUNoQixvREFBQyxtRUFBUyxJQUFnQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsc0RBQXNELEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFJO2dCQUNsTSxvREFBQyxtRUFBUyxJQUFnQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsd0RBQXdELEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFJO2dCQUNoTSxvREFBQyxtRUFBUyxJQUFnQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsNENBQTRDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFJO2dCQUN6TCxvREFBQyxtRUFBUyxJQUFnQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUseUNBQXlDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFJLENBQ2hMO1lBQ04sNkRBQUssU0FBUyxFQUFDLEtBQUs7Z0JBQ2hCLG9EQUFDLG1FQUFTLElBQWdCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSx3Q0FBd0MsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUk7Z0JBQ2hMLG9EQUFDLG1FQUFTLElBQWdCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSx5Q0FBeUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUk7Z0JBQ2xMLDZEQUFLLFNBQVMsRUFBQyxZQUFZO29CQUN2QiwrRUFBd0I7b0JBQ3hCLGdFQUFRLFNBQVMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBQyxHQUFHOzRCQUNoSyxJQUFJLEtBQUssR0FBa0IsNENBQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUN6RCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUk7Z0NBQ3hCLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7O2dDQUVsQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs0QkFDMUIsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2xDLENBQUM7d0JBQ0csZ0VBQVEsS0FBSyxFQUFDLElBQUksb0JBQXVCO3dCQUVyQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxRQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQXpCLENBQXlCLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBRSxJQUFJLHVFQUFRLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLElBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBVSxFQUF0RyxDQUFzRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUV2TixDQUNQO2dCQUNOLG9EQUFDLHNFQUFZLElBQWdCLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFJLENBQzdJLENBQ0osQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVMLFlBQUM7QUFBRCxDQUFDLENBM0drQywrQ0FBZSxHQTJHakQ7Ozs7Ozs7Ozs7Ozs7O0FDMUlEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdHQUF3RztBQUN4RyxvQkFBb0I7QUFDcEIsRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4RyxzR0FBc0c7QUFDdEcsd0ZBQXdGO0FBQ3hGLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsNEVBQTRFO0FBQzVFLEVBQUU7QUFDRiw4QkFBOEI7QUFDOUIsd0dBQXdHO0FBQ3hHLDZCQUE2QjtBQUM3QixtREFBbUQ7QUFDbkQsRUFBRTtBQUNGLHdHQUF3Rzs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFHdUI7QUFDQTtBQUNNO0FBRzVEO0lBQW1DLHlCQUE4SDtJQUM3SixlQUFZLEtBQUssRUFBRSxPQUFPO1FBQTFCLFlBQ0ksa0JBQU0sS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQU14QjtRQUxHLEtBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxTQUFTLEVBQUUsRUFBRTtTQUNoQjtRQUVELEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7O0lBQ3ZDLENBQUM7SUFDRCxpQ0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUdELCtCQUFlLEdBQWY7UUFBQSxpQkFlQztRQWRHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQztZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUV0RixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNQLElBQUksRUFBRSxLQUFLO2dCQUNYLEdBQUcsRUFBSyxRQUFRLHlCQUFzQjtnQkFDdEMsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRSxJQUFJO2FBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQTRCO2dCQUNqQyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNqQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx5Q0FBeUIsR0FBekIsVUFBMEIsZUFBdUI7UUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLElBQUssWUFBSyxDQUFDLEVBQUUsSUFBSSxlQUFlLEVBQTNCLENBQTJCLENBQUMsRUFBRSxDQUFDO0lBQzlILENBQUM7SUFFRCxxQkFBSyxHQUFMLFVBQU0sS0FBK0I7UUFBckMsaUJBcUJDO1FBcEJHLElBQUksS0FBSyxJQUFJLGFBQWEsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxFQUFFO2dCQUFFLE9BQU8sS0FBSyxDQUFDO2lCQUMvSixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDO2dCQUNwQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFJLElBQUksV0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQW5GLENBQW1GLENBQUMsSUFBSSxJQUFJLENBQUM7O2dCQUV0SSxPQUFPLElBQUksQ0FBQztTQUNuQjthQUNJLElBQUksS0FBSyxJQUFJLE1BQU07WUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO2FBQ3BJLElBQUksS0FBSyxJQUFJLE9BQU87WUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO2FBQzNGLElBQUksS0FBSyxJQUFJLFdBQVc7WUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO2FBQ2xHLElBQUksS0FBSyxJQUFJLFVBQVU7WUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLDZEQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pILElBQUksS0FBSyxJQUFJLFdBQVc7WUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLDZEQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ25ILElBQUksS0FBSyxJQUFJLGFBQWE7WUFDM0IsT0FBTyxJQUFJLENBQUM7UUFDaEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUlELHNCQUFNLEdBQU47UUFBQSxpQkEyQ0M7UUExQ0csT0FBTyxDQUNILDZEQUFLLFNBQVMsRUFBQyxLQUFLO1lBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dCQUNoQiw2REFBSyxTQUFTLEVBQUMsWUFBWTtvQkFFdkIscUZBQThCO29CQUM5QixnRUFBUSxTQUFTLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBQyxHQUFHOzRCQUN6SCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEdBQUc7Z0NBQ3ZCLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztnQ0FFM0QsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7b0NBQ25CLFlBQVksRUFBRTt3Q0FDVixFQUFFLEVBQUUsQ0FBQzt3Q0FDTCxXQUFXLEVBQUUsRUFBRTt3Q0FDZixJQUFJLEVBQUUsRUFBRTt3Q0FDUixLQUFLLEVBQUUsRUFBRTt3Q0FDVCxTQUFTLEVBQUUsRUFBRTt3Q0FDYixRQUFRLEVBQUUsQ0FBQzt3Q0FDWCxTQUFTLEVBQUUsQ0FBQzt3Q0FDWixXQUFXLEVBQUUsRUFBRTtxQ0FDbEI7aUNBQ0osQ0FBQyxDQUFDO3dCQUNYLENBQUM7d0JBQ0csZ0VBQVEsS0FBSyxFQUFDLEdBQUcsY0FBaUI7d0JBRTlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBRSxJQUFJLHVFQUFRLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFHLEVBQUUsQ0FBQyxXQUFXLENBQVUsRUFBM0QsQ0FBMkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FHbEksQ0FDUDtnQkFDTixvREFBQyxtRUFBUyxJQUFtQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBRSxVQUFDLE1BQU0sSUFBSyxZQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFoRCxDQUFnRCxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQywrREFBK0QsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRztnQkFDNVMsb0RBQUMsbUVBQVMsSUFBbUIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFFLFVBQUMsTUFBTSxJQUFLLFlBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQWhELENBQWdELEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLHdEQUF3RCxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNsUixvREFBQyxtRUFBUyxJQUFtQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBRSxVQUFDLE1BQU0sSUFBSyxZQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFoRCxDQUFnRCxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyw2Q0FBNkMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUM3UjtZQUNOLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dCQUNoQixvREFBQyxtRUFBUyxJQUFtQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBQyxNQUFNLElBQUssWUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBaEQsQ0FBZ0QsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMseUNBQXlDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0JBQ3BRLG9EQUFDLG1FQUFTLElBQW1CLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBRSxVQUFDLE1BQU0sSUFBSyxZQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFoRCxDQUFnRCxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyx1Q0FBdUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRztnQkFDclEsb0RBQUMsbUVBQVMsSUFBbUIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFFLFVBQUMsTUFBTSxJQUFLLFlBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQWhELENBQWdELEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFDLHdDQUF3QyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUN2USxvREFBQyxzRUFBWSxJQUFtQixJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBRSxVQUFDLE1BQU0sSUFBSyxZQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFoRCxDQUFnRCxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FDN08sQ0FDSixDQUNULENBQUM7SUFDTixDQUFDO0lBRUwsWUFBQztBQUFELENBQUMsQ0F6R2tDLCtDQUFlLEdBeUdqRDs7Ozs7Ozs7Ozs7Ozs7QUN4SUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLG9CQUFvQjtBQUNwQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBRWtCO0FBSTlDO0lBQW1DLHlCQUE4TDtJQUM3TixlQUFZLEtBQUssRUFBRSxPQUFPO1FBQTFCLFlBQ0ksa0JBQU0sS0FBSyxFQUFFLE9BQU8sQ0FBQyxTQUt4QjtRQUpHLEtBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxNQUFNLEVBQUUsRUFBRTtZQUNWLGdCQUFnQixFQUFFLEVBQUU7U0FDdkI7O0lBQ0wsQ0FBQztJQUVELGlDQUFpQixHQUFqQjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTNCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQyxHQUFRO1lBQzFDLElBQUksUUFBUSxHQUFJLEdBQTJDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDM0YsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pGLEtBQUksQ0FBQyxjQUFjLENBQUUsR0FBMkMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx5QkFBUyxHQUFUO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxjQUFjLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDO1lBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O1lBRXZGLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsR0FBRyxFQUFLLFFBQVEsc0JBQW1CO2dCQUNuQyxXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBNEI7Z0JBQ2pDLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7Z0JBQ2pDLGNBQWMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBRTVFLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELG1DQUFtQixHQUFuQjtRQUFBLGlCQWdCQztRQWZHLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxpQ0FBaUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7O1lBRTNHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ0gsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsR0FBRyxFQUFLLFFBQVEsZ0NBQTZCO2dCQUM3QyxXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsZ0JBQWdEO2dCQUNyRCxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDckQsY0FBYyxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUVoRyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCw4QkFBYyxHQUFkLFVBQWUsR0FBd0M7UUFBdkQsaUJBcUJDO1FBcEJHLDhEQUE4RDtRQUM5RCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsRUFBRTtZQUNILElBQUksQ0FBQyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxVQUFDLENBQUM7Z0JBQ1QsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFnQixDQUFDO2dCQUV6QyxJQUFJLE1BQU0sQ0FBQztnQkFFWCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDN0IsTUFBTSxHQUFHLElBQUkscURBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEQsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ3RELEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2lCQUU5Qjs7b0JBRUcsS0FBSyxDQUFDLHVFQUF1RSxDQUFDLENBQUM7WUFDdkYsQ0FBQztZQUNELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0Qsb0NBQW9CLEdBQXBCO1FBQ0ksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCw2QkFBYSxHQUFiLFVBQWMsS0FBYTtRQUN2QixJQUFJLFFBQVEsR0FBMkIsNENBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BFLElBQUksTUFBTSxHQUFvQixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQUUsT0FBTztRQUUvQixJQUFJLE1BQU0sR0FBd0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztRQUU1RixJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUExQixDQUEwQixDQUFDO1lBQ3hELElBQUksS0FBSyxJQUFJLElBQUk7Z0JBQUUsT0FBTztZQUUxQixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUM7WUFDbkUsSUFBSSxZQUFZLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1lBRTdCLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUU5QztJQUNMLENBQUM7SUFFRCxtQ0FBbUIsR0FBbkI7UUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1FBRXZFLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQUssRUFBRSxLQUFLO2dCQUN4QixLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUU7WUFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVELHNCQUFNLEdBQU47UUFBQSxpQkEwRkM7UUF6RkcsT0FBTyxDQUNIO1lBQ0ksNkRBQUssU0FBUyxFQUFDLEtBQUs7Z0JBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO29CQUNoQixnRUFBUSxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsT0FBTyxFQUFFOzRCQUN6QyxJQUFJLFFBQVEsR0FBMkI7Z0NBQ25DLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQW9CLEVBQXFCO2dDQUNwVyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjtnQ0FDcFcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUseUJBQXlCLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBb0IsRUFBcUI7Z0NBQ3BXLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQW9CLEVBQXFCO2dDQUNsVyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSx5QkFBeUIsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFvQixFQUFxQjtnQ0FDbFcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUseUJBQXlCLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBb0IsRUFBcUI7Z0NBQ2xXLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQW9CLEVBQXFCOzZCQUV0Vzs0QkFDRCxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDOzRCQUMvQyxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzt3QkFDL0IsQ0FBQyxvQkFBd0IsQ0FDdkI7Z0JBQ04sNkRBQUssU0FBUyxFQUFDLEtBQUs7b0JBQ2hCLDZEQUFLLFNBQVMsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTt3QkFDaEQsNkRBQUssU0FBUyxFQUFDLGFBQWE7NEJBQ3hCLCtEQUFPLElBQUksRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEdBQUcsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFdBQVcsR0FBRzs0QkFDdkYsK0RBQU8sU0FBUyxFQUFDLG1CQUFtQix3REFBMEQsQ0FDNUYsQ0FDSixDQUNKO2dCQUNOLDZEQUFLLFNBQVMsRUFBQyxLQUFLO29CQUNoQixnRUFBUSxTQUFTLEVBQUMsNEJBQTRCLEVBQUMsT0FBTyxFQUFFOzRCQUNwRCxJQUFJLE9BQU8sR0FBb0IsRUFBRSxFQUFFLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUseUJBQXlCLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBb0IsRUFBcUI7NEJBQzVaLElBQUksUUFBUSxHQUEyQiw0Q0FBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3BFLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3ZCLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7d0JBRW5ELENBQUMsa0JBQXNCLENBQ3JCLENBRUo7WUFDTiw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7Z0JBQ3pGLCtEQUFPLFNBQVMsRUFBQyxtQkFBbUI7b0JBQ2hDO3dCQUNJOzRCQUNJLDBFQUFnQjs0QkFDaEIsdUVBQWE7NEJBQ2IsdUVBQWE7NEJBQ2IsdUVBQWE7NEJBQ2Isd0VBQWM7NEJBQ2QsK0RBQVMsQ0FDUixDQUNEO29CQUNSLG1FQUVRLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSzt3QkFDMUMsT0FBTyxDQUNILDREQUFJLEdBQUcsRUFBRSxLQUFLOzRCQUNWLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7Z0NBQUUsK0RBQU8sU0FBUyxFQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLFVBQUMsS0FBSzt3Q0FDOUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7d0NBQ2xELEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7b0NBQzlDLENBQUMsR0FBSSxDQUFLOzRCQUNWLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0NBQUUsK0RBQU8sU0FBUyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBQyxLQUFLO3dDQUM5RixPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3dDQUNsQyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29DQUNoRCxDQUFDLEdBQUcsQ0FBSzs0QkFDVCw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2dDQUFFLCtEQUFPLFNBQVMsRUFBQyxjQUFjLEVBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFVBQUMsS0FBSzt3Q0FDckcsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzt3Q0FDekMsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQ0FDaEQsQ0FBQyxHQUFHLENBQUs7NEJBQ1QsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFHLGdFQUFRLFNBQVMsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLFVBQUMsS0FBSztvQ0FDN0csT0FBTyxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztvQ0FDN0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQ0FDaEQsQ0FBQyxJQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFdBQUMsSUFBSSx1RUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBRyxDQUFDLENBQUMsSUFBSSxDQUFVLEVBQW5ELENBQW1ELENBQUMsQ0FBVSxDQUFNOzRCQUM3Ryw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUcsZ0VBQVEsU0FBUyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBQyxLQUFLO29DQUNqRyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO29DQUNuQyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dDQUNoRCxDQUFDLElBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQUMsSUFBSSx1RUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBRyxDQUFDLENBQUMsSUFBSSxDQUFVLEVBQW5ELENBQW1ELENBQUMsQ0FBVSxDQUFNOzRCQUNuRyw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2dDQUN2QixnRUFBUSxTQUFTLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsSUFBSyxZQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QjtvQ0FBRTt3Q0FBTSwyREFBRyxTQUFTLEVBQUMsYUFBYSxHQUFLLENBQU8sQ0FBUyxDQUM5SCxDQUVKLENBQ1I7b0JBQ0wsQ0FBQyxDQUFDLENBRUYsQ0FDSixDQUNOLENBRVAsQ0FDTixDQUFDO0lBQ04sQ0FBQztJQUVMLFlBQUM7QUFBRCxDQUFDLENBOU1rQywrQ0FBZSxHQThNakQ7Ozs7Ozs7Ozs7Ozs7O0FDNU9EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLG9CQUFvQjtBQUNwQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7OztBQUV6RTtBQUNIO0FBRThCO0FBQ1I7QUFDUTtBQUNOO0FBQ2M7QUFDWjtBQUNtQjtBQUNMO0FBZ0JwRTtJQUFtQyx5QkFBMkM7SUFDMUUsZUFBWSxLQUFLLEVBQUUsT0FBTztRQUExQixZQUNJLGtCQUFNLEtBQUssRUFBRSxPQUFPLENBQUMsU0FTeEI7UUFSRyxLQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsWUFBWSxFQUFFLDZEQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUNqRCxTQUFTLEVBQUUsRUFBRTtZQUNiLFVBQVUsRUFBRSxFQUFFO1lBQ2QsT0FBTyxFQUFFLEtBQUs7U0FDakI7UUFFRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzs7SUFDL0QsQ0FBQztJQUVELGlDQUFpQixHQUFqQjtRQUFBLGlCQUdDO1FBRkcsdUVBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFHLElBQUksWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDOUQsd0VBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFHLElBQUksWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELHlCQUFTLEdBQVQsVUFBVSxLQUFhO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELDJCQUFXLEdBQVgsVUFBWSxLQUFhO1FBQ3JCLElBQUksSUFBSSxHQUFHLDRDQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxJQUFJLE1BQU0sR0FBeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxnQkFBZ0IsR0FBbUMsNENBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDNUYsSUFBSSxRQUFRLEdBQTJCLDRDQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUssRUFBRSxPQUFPO1lBQzVCLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtnQkFDbkMsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLHlCQUFlLElBQUksc0JBQWUsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQTNGLENBQTJGLENBQUMsQ0FBQztRQUN2SixPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDZixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMseUJBQWUsSUFBSSxzQkFBZSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBM0YsQ0FBMkYsQ0FBQyxDQUFDO1NBQ3RKO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBRW5FLENBQUM7SUFFRCx3QkFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELCtCQUFlLEdBQWYsVUFBZ0IsSUFBeUc7UUFDckgsSUFBSSxLQUFLLEdBQUc7WUFDUixFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUTtZQUMxQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUztZQUM1QyxTQUFTLEVBQUUsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXO1lBQ2hELFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTO1lBQzVDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRO1lBQzFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLO1NBQ3ZDO1FBRUQsS0FBSyxHQUFHLDZEQUFlLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsaUNBQWlCLEdBQWpCLFVBQWtCLE9BQWU7UUFBakMsaUJBc0JDO1FBckJHLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQWYsQ0FBZSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakYsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQUUsSUFBSSxTQUFFLENBQUMsRUFBRSxJQUFJLFdBQVcsRUFBcEIsQ0FBb0IsQ0FBQztRQUN0RSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLEtBQUs7WUFDWCxHQUFHLEVBQUssUUFBUSxvQkFBZSxTQUFTLENBQUMsSUFBSSxhQUFRLE9BQVM7WUFDOUQsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsSUFBSTtZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQW9CO1lBQ3pCLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNqQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUVwQixLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNuQyxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxTQUFTO29CQUM5QyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUM3QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUksTUFBTTtvQkFDN0IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV4RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDhCQUFjLEdBQWQsVUFBZSxNQUFjO1FBQTdCLGlCQW9CQztRQW5CRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLEtBQUs7WUFDWCxHQUFHLEVBQUssUUFBUSx5QkFBb0IsTUFBTSxpQkFBYztZQUN4RCxXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsV0FBK0I7WUFDcEMsSUFBSSxNQUFNLEdBQUcsNENBQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQTRCLENBQUMsQ0FBRTtZQUMvRCxJQUFJLFdBQVcsSUFBSSxTQUFTLEVBQUU7Z0JBQzFCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsV0FBVzthQUM5QjtpQkFDSTtnQkFDRCxNQUFNLENBQUMsTUFBTSxHQUFHLDZEQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUN2RDtZQUVELEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUU1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0QkFBWSxHQUFaLFVBQWEsU0FBaUI7UUFBOUIsaUJBZUM7UUFkRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLEtBQUs7WUFDWCxHQUFHLEVBQUssUUFBUSw0QkFBdUIsU0FBUyxlQUFZO1lBQzVELFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUMsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxTQUE0QjtZQUNqQyxJQUFJLE1BQU0sR0FBSSw0Q0FBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBK0IsQ0FBQyxDQUFDO1lBQ2xFLElBQUksU0FBUyxJQUFJLFNBQVMsRUFBRTtnQkFDeEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSztnQkFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQzNDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBSUQsc0JBQU0sR0FBTjtRQUFBLGlCQXNJQztRQXJJRyxPQUFPLENBQ0g7WUFDSSw2REFBSyxTQUFTLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDckMsNkRBQUssU0FBUyxFQUFDLFVBQVU7b0JBQ3JCLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUVySSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPLEVBQUUsS0FBSyxJQUFLLG1FQUFJLEtBQUssRUFBRSxFQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLElBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBTSxFQUE5SSxDQUE4SSxDQUFDLENBRTlMLENBQ0g7Z0JBQ04sNkRBQUssU0FBUyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFDO29CQUNyQyw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7d0JBQ3JDLGdFQUFRLFNBQVMsRUFBQyw0QkFBNEIsaUJBQWEsT0FBTyxpQkFBYSxhQUFhLEVBQUMsT0FBTyxFQUFFLGNBQU0sWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUEvQixDQUErQixnQkFBb0IsQ0FDN0o7b0JBRU4sNkRBQUssS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO3dCQUM5RiwrREFBTyxTQUFTLEVBQUMsbUJBQW1COzRCQUNoQztnQ0FDSTtvQ0FDSSx5RUFBZTtvQ0FDZixzRUFBWTtvQ0FDWix1RUFBYTtvQ0FDYix1RUFBYTtvQ0FDYixxRUFBVztvQ0FDWCwyRUFBaUI7b0NBQ2pCLCtEQUFTLENBQ1IsQ0FDRDs0QkFDUixtRUFFUSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFvQixFQUFFLEtBQUssRUFBRSxLQUFLO2dDQUNyRCxPQUFPLENBQ0gsNERBQUksR0FBRyxFQUFFLEtBQUs7b0NBQ1YsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQU07b0NBQ3hFLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBRyxLQUFLLENBQUMsUUFBUSxDQUFNO29DQUNsRCw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBTTtvQ0FDbkQsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFHLEtBQUssQ0FBQyxTQUFTLENBQU07b0NBQ25ELDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBRyxLQUFLLENBQUMsU0FBUyxDQUFNO29DQUNuRCw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQU07b0NBQ3pELDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7d0NBQ3ZCLGdFQUFRLFNBQVMsRUFBQyxZQUFZLGlCQUFhLE9BQU8saUJBQWEsYUFBYSxFQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsSUFBSyxZQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQjs0Q0FBRTtnREFBTSwyREFBRyxTQUFTLEVBQUMsY0FBYyxHQUFLLENBQU8sQ0FBUzt3Q0FDMUssZ0VBQVEsU0FBUyxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLElBQUssWUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBdkIsQ0FBdUI7NENBQUU7Z0RBQU0sMkRBQUcsU0FBUyxFQUFDLGFBQWEsR0FBSyxDQUFPLENBQVMsQ0FDNUgsQ0FDSixDQUNSOzRCQUNMLENBQUMsQ0FBQyxDQUVGLENBQ0osQ0FDTixDQUNKLENBRUo7WUFDTiw2REFBSyxTQUFTLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBQyxZQUFZO2dCQUNsQyw2REFBSyxTQUFTLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBRSxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQztvQkFDakUsNkRBQUssU0FBUyxFQUFDLGVBQWU7d0JBQzFCLDZEQUFLLFNBQVMsRUFBQyxjQUFjOzRCQUN6Qiw0REFBSSxTQUFTLEVBQUMsYUFBYSxJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBTzs0QkFDckosZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsT0FBTyxrQkFBYyxPQUFPLGFBQWlCLENBQzNFO3dCQUNOLDZEQUFLLFNBQVMsRUFBQyxZQUFZOzRCQUN2Qiw2REFBSyxTQUFTLEVBQUMsS0FBSztnQ0FDaEIsNkRBQUssU0FBUyxFQUFDLEtBQUs7b0NBQ2hCLG9EQUFDLDZEQUFlLElBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFDLEtBQUssSUFBSyxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQXRDLENBQXNDLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixHQUFJLENBQzdQO2dDQUNOLDZEQUFLLFNBQVMsRUFBQyxLQUFLLElBQ2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUNyQjtnQ0FDTiw2REFBSyxTQUFTLEVBQUMsS0FBSztvQ0FDaEIseUZBQWtDO29DQUNsQyxnRUFBUSxRQUFRLFFBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQUMsR0FBRzs0Q0FDckUsSUFBSSxLQUFLLEdBQUksNENBQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQTZCLENBQUMsQ0FBQzs0Q0FDL0QsS0FBSyxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBb0IsQ0FBQyxHQUFHLENBQUMsV0FBQyxJQUFJLFlBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDOzRDQUNsRyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7d0NBQzNDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBZixDQUFlLENBQUMsSUFFNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUssSUFBSyx1RUFBUSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFFLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFVLEVBQTlLLENBQThLLENBQUMsQ0FFMU4sQ0FDUCxDQUNKLENBQ0o7d0JBQ04sNkRBQUssU0FBUyxFQUFDLGNBQWM7NEJBQ3pCLGdFQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixrQkFBYyxPQUFPLEVBQUMsT0FBTyxFQUFFLFVBQUMsR0FBRztvQ0FDaEYsSUFBSSxNQUFNLEdBQWtCLDRDQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztvQ0FDN0QsSUFBSSxJQUFJLEdBQUcsNENBQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29DQUN0QyxJQUFJLFFBQVEsR0FBMkIsNENBQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29DQUVwRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUssRUFBRSxPQUFPO3dDQUM1QixJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFFBQVE7NENBQ2hDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRTt3Q0FFdEIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxFQUFsQixDQUFrQixDQUFDLElBQUksQ0FBQzs0Q0FDdkQsT0FBTyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUTtvQ0FDdkMsQ0FBQyxDQUFDLENBQUM7b0NBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDbEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQ0FDL0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQ0FDekMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFlBQVksRUFBRSw2REFBZSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0NBRXpFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxXQUFlOzRCQUVyRCxnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsa0JBQWMsT0FBTyxFQUFDLE9BQU8sRUFBRSxVQUFDLEdBQUc7b0NBQ2hGLElBQUksTUFBTSxHQUFrQiw0Q0FBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7b0NBQzdELElBQUksSUFBSSxHQUFHLDRDQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQ0FDdEMsSUFBSSxRQUFRLEdBQTJCLDRDQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztvQ0FDcEUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUE3QixDQUE2QixDQUFDLENBQUM7b0NBQzNELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7b0NBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFFLE9BQU87d0NBQzVCLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsUUFBUTs0Q0FDaEMsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFO3dDQUV0QixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsRUFBRSxJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQWxCLENBQWtCLENBQUMsSUFBSSxDQUFDOzRDQUN2RCxPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRO29DQUN2QyxDQUFDLENBQUMsQ0FBQztvQ0FFSCxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO29DQUMvQyxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29DQUN6QyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLDZEQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0NBQ3hFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksTUFBTSxXQUFlOzRCQUd0RCxnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxnQkFBZ0Isa0JBQWMsT0FBTyxFQUFDLE9BQU8sRUFBRSxVQUFDLEdBQUc7b0NBQy9FLEtBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsNkRBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQ0FDeEUsQ0FBQyxZQUFnQixDQUNmLENBRUosQ0FDSixDQUNKLENBRVgsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVELGdDQUFnQixHQUFoQjtRQUNJLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDhCQUFjLEdBQWQ7UUFBQSxpQkFhQztRQVpHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLFNBQVM7WUFDOUMsT0FBTyxvREFBQywrREFBaUIsSUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBK0IsRUFBRSxXQUFXLEVBQUUsVUFBQyxZQUE2QixJQUFLLFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBN0MsQ0FBNkMsR0FBSSxDQUFDO2FBQzNNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLEtBQUs7WUFDL0MsT0FBTyxvREFBQywyREFBYSxJQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQUMsWUFBeUIsSUFBSyxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQTdDLENBQTZDLEdBQUksQ0FBQzthQUNoTCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxlQUFlO1lBQ3pELE9BQU8sb0RBQUMsK0RBQWlCLElBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQStCLEVBQUUsV0FBVyxFQUFFLFVBQUMsWUFBNkIsSUFBSyxZQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQTdDLENBQTZDLEdBQUksQ0FBQzthQUMzTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxvQkFBb0I7WUFDOUQsT0FBTyxvREFBQyxvRUFBc0IsSUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBb0MsRUFBRSxXQUFXLEVBQUUsVUFBQyxZQUFrQyxJQUFLLFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBN0MsQ0FBNkMsR0FBSSxDQUFDO2FBQzFOLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLE1BQU07WUFDaEQsT0FBTyxvREFBQyw0REFBYyxJQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUE0QixFQUFFLFdBQVcsRUFBRSxVQUFDLFlBQTBCLElBQUssWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUE3QyxDQUE2QyxHQUFJLENBQUM7YUFDbE0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLElBQUksYUFBYTtZQUN2RCxPQUFPLG9EQUFDLG1FQUFxQixJQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFtQyxFQUFFLFdBQVcsRUFBRSxVQUFDLFlBQWlDLElBQUssWUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUE3QyxDQUE2QyxHQUFJLENBQUM7SUFDaE8sQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLENBM1JrQywrQ0FBZSxHQTJSakQ7Ozs7Ozs7Ozs7Ozs7O0FDNVVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsb0JBQW9CO0FBQ3BCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBQ0g7QUFJNUI7SUFBbUMseUJBQXVOO0lBQ3RQLGVBQVksS0FBSyxFQUFFLE9BQU87UUFBMUIsWUFDSSxrQkFBTSxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBUXhCO1FBUEcsS0FBSSxDQUFDLEtBQUssR0FBRztZQUNULFVBQVUsRUFBRSxDQUFDO1lBQ2Isb0JBQW9CLEVBQUUsRUFBRTtTQUMzQjtRQUNELEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDakMsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzs7SUFFckMsQ0FBQztJQUVELGlDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtJQUNsQyxDQUFDO0lBRUQsdUNBQXVCLEdBQXZCO1FBQUEsaUJBZUM7UUFkRyxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMscUNBQXFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLG9CQUFvQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUVuSCxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNILElBQUksRUFBRSxLQUFLO2dCQUNYLEdBQUcsRUFBSyxRQUFRLG9DQUFpQztnQkFDakQsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLEtBQUssRUFBRSxJQUFJO2dCQUNYLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQXdDO2dCQUM3QyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDOUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEYsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBR0Qsb0JBQUksR0FBSjtRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLHVEQUF1RDtRQUN2RCxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDSCxVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUM7WUFDVixVQUFVLEVBQUUsVUFBVTtTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0JBQUksR0FBSjtRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRTtZQUNqQixVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO2FBQU07WUFDSCxVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUM7WUFDVixVQUFVLEVBQUUsVUFBVTtTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsa0NBQWtCLEdBQWxCO0lBQ0EsQ0FBQztJQUVELHFDQUFxQixHQUFyQixVQUFzQixFQUEyQjtRQUM3QyxJQUFJLElBQUksR0FBbUMsNENBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFDLElBQUksUUFBQyxJQUFJLEVBQUUsRUFBUCxDQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLE1BQU0sR0FBbUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxzQkFBTSxHQUFOO1FBQUEsaUJBNkdDO1FBNUdHLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQzNELE9BQU8sQ0FDSDtZQUNJLDZEQUFLLFNBQVMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2Qyw2REFBSyxTQUFTLEVBQUMsVUFBVTtvQkFDckIsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBRXJJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLElBQUssbUVBQUksS0FBSyxFQUFFLEVBQUUsY0FBYyxFQUFFLENBQUMsS0FBSyxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssSUFBRyxLQUFLLENBQUMsUUFBUSxDQUFNLEVBQTFILENBQTBILENBQUMsQ0FFdEssQ0FDSDtnQkFDTiw2REFBSyxTQUFTLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7b0JBQ3RDLDZEQUFLLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTt3QkFDM0MsNkRBQUssU0FBUyxFQUFDLGFBQWE7NEJBQ3hCLGdFQUFRLFNBQVMsRUFBQyw0QkFBNEIsaUJBQWEsT0FBTyxpQkFBYSxnQkFBZ0IsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMscUJBQXlCOzRCQUNoSyw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBTSxDQUN4RDt3QkFDTiw2REFBSyxTQUFTLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBRSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFDOzRCQUN2RiwrREFBTyxTQUFTLEVBQUMsbUJBQW1CO2dDQUNoQztvQ0FDSTt3Q0FDSSx3RUFBYzt3Q0FDZCx1RUFBYTt3Q0FDYiw2RUFBbUI7d0NBQ25CLCtEQUFTLENBQ1IsQ0FDRDtnQ0FDUixtRUFFUSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBRSxZQUFFLElBQUksU0FBRSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsUUFBUSxJQUFLLEVBQUUsQ0FBQyxLQUFLLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBeEUsQ0FBd0UsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQTJCLEVBQUUsS0FBSyxFQUFFLEtBQUs7b0NBQzlKLElBQUksZUFBZSxDQUFDO29DQUNwQixJQUFJLEVBQUUsQ0FBQyxNQUFNLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRTt3Q0FDcEMsZUFBZSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFLLElBQUksWUFBSyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUExQixDQUEwQixDQUFDLENBQUM7cUNBQ2pGOzt3Q0FFRyxlQUFlLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQUssSUFBSSxZQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQTNCLENBQTJCLENBQUMsQ0FBQztvQ0FFbkYsSUFBSSxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsYUFBRyxJQUFJLFVBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLHVCQUF1QixFQUFwQyxDQUFvQyxDQUFDLENBQUM7b0NBQ3ZHLE9BQU8sQ0FDSCw0REFBSSxHQUFHLEVBQUUsS0FBSzt3Q0FDViw0REFBSSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBTTt3Q0FDNUQsNERBQUksS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFHLGVBQWUsQ0FBQyxTQUFTLENBQU07d0NBQzdELDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBRyxjQUFjLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQU07d0NBQzFGLDREQUFJLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7NENBQ3ZCLGdFQUFRLFNBQVMsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQyxJQUFLLFlBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBOUIsQ0FBOEI7Z0RBQUU7b0RBQU0sMkRBQUcsU0FBUyxFQUFDLGFBQWEsR0FBSyxDQUFPLENBQVMsQ0FDbkksQ0FDSixDQUNSO2dDQUNMLENBQUMsQ0FBQyxDQUVGLENBQ0osQ0FFTjt3QkFDTiw2REFBSyxTQUFTLEVBQUMsYUFBYTs0QkFDeEIsZ0VBQVEsU0FBUyxFQUFDLDJCQUEyQixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsV0FBZTs0QkFDbkksZ0VBQVEsU0FBUyxFQUFDLDRCQUE0QixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxXQUFlLENBQy9JLENBQ0osQ0FDSixDQUNKO1lBRU4sNkRBQUssU0FBUyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsZUFBZTtnQkFDckMsNkRBQUssU0FBUyxFQUFDLGNBQWM7b0JBQ3pCLDZEQUFLLFNBQVMsRUFBQyxlQUFlO3dCQUMxQiw2REFBSyxTQUFTLEVBQUMsY0FBYzs0QkFDekIsNERBQUksU0FBUyxFQUFDLGFBQWE7O2dDQUFzQixZQUFZLENBQUMsUUFBUSxDQUFNOzRCQUM1RSxnRUFBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxPQUFPLGtCQUFjLE9BQU8sYUFBaUIsQ0FDM0U7d0JBQ04sNkRBQUssU0FBUyxFQUFDLFlBQVk7NEJBQ3ZCLDZEQUFLLFNBQVMsRUFBQyxZQUFZO2dDQUN2Qiw2RkFBc0M7Z0NBQ3RDLGdFQUFRLEdBQUcsRUFBQyxpQkFBaUIsRUFBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLFFBQVEsRUFBRSxVQUFDLEdBQUc7b0NBQ3JFLENBQUMsSUFFTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBSyxJQUFJLFlBQUssQ0FBQyxRQUFRLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLElBQUssdUVBQVEsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFVLEVBQXJFLENBQXFFLENBQUMsQ0FFdEssQ0FDUDs0QkFDTiw2REFBSyxTQUFTLEVBQUMsWUFBWTtnQ0FDdkIsNEZBQXFDO2dDQUNyQyxnRUFBUSxHQUFHLEVBQUMscUJBQXFCLEVBQUMsU0FBUyxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUUsVUFBQyxHQUFHO29DQUN6RSxDQUFDLElBRU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLEVBQUUsS0FBSyxJQUFLLHVFQUFRLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBVSxFQUF2RCxDQUF1RCxDQUFDLENBRTNHLENBQ1AsQ0FDSjt3QkFFTiw2REFBSyxTQUFTLEVBQUMsY0FBYzs0QkFDekIsZ0VBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLGtCQUFjLE9BQU8sRUFBQyxPQUFPLEVBQUUsVUFBQyxHQUFHO29DQUNoRixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLEVBQVksQ0FBQztvQ0FDbkUsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxFQUFZLENBQUMsQ0FBQztvQ0FDaEYsSUFBSSxnQkFBZ0IsR0FBbUMsNENBQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0NBQzVGLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO29DQUNqSSxLQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLENBQUM7Z0NBQ2pFLENBQUMsV0FBZ0I7NEJBRWpCLGdFQUFRLElBQUksRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLGdCQUFnQixrQkFBYyxPQUFPLFlBQWUsQ0FDbEYsQ0FFSixDQUNKLENBRUosQ0FDUCxDQUNOLENBQUM7SUFDTixDQUFDO0lBRUwsWUFBQztBQUFELENBQUMsQ0F0TGtDLCtDQUFlLEdBc0xqRCIsImZpbGUiOiJOZXdNZXRlcldpemFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDRkdQYXJzZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzA3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSBcIi4uL1RTWC9TeXN0ZW1DZW50ZXIvZ2xvYmFsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDRkdQYXJzZXIge1xyXG4gICAgQW5hbG9nczogQXJyYXk8T3BlblhEQS5DaGFubmVsPjtcclxuICAgIERpZ2l0YWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+O1xyXG4gICAgQ2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD47XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50czogc3RyaW5nLCBtZXRlcktleTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBjb250ZW50cy5zcGxpdCgnXFxuJykubWFwKGEgPT4gYS5zcGxpdCgnLCcpKTtcclxuICAgICAgICBsZXQgYW5hbG9nQ291bnRzID0gcGFyc2VJbnQoZGF0YVsxXVsxXS5zbGljZSgwLCBkYXRhWzFdWzFdLmxlbmd0aCAtIDEpKTtcclxuICAgICAgICBsZXQgZGlnaXRhbENvdW50cyA9IHBhcnNlSW50KGRhdGFbMV1bMl0uc2xpY2UoMCwgZGF0YVsxXVsyXS5sZW5ndGggLSAxKSk7XHJcblxyXG4gICAgICAgIHRoaXMuQW5hbG9ncyA9IGRhdGEuc2xpY2UoMiwgYW5hbG9nQ291bnRzICsgMikubWFwKChhOiBBcnJheTxzdHJpbmc+LCBpbmRleCkgPT4geyByZXR1cm4geyBJRDogaW5kZXgsIE1ldGVyOiBtZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6IHRoaXMucGFyc2VUeXBlKGFbNF0pLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiB0aGlzLnBhcnNlUGhhc2UoYVsyXSksIE5hbWU6IGFbMV0sIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiBhWzNdLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6IGFbMF0gfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCB9KTtcclxuICAgICAgICB0aGlzLkRpZ2l0YWxzID0gZGF0YS5zbGljZSgyICsgYW5hbG9nQ291bnRzLCAyICsgYW5hbG9nQ291bnRzICsgZGlnaXRhbENvdW50cykubWFwKChhOiBBcnJheTxzdHJpbmc+LCBpbmRleCkgPT4geyByZXR1cm4geyBJRDogYW5hbG9nQ291bnRzK2luZGV4LCBNZXRlcjogbWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnRGlnaXRhbCcsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6IHRoaXMucGFyc2VQaGFzZShhWzJdKSwgTmFtZTogYVsxXSwgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246IGFbM10sIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogYVswXSB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsIH0pXHJcbiAgICAgICAgdGhpcy5DaGFubmVscyA9IHRoaXMuQW5hbG9ncy5jb25jYXQodGhpcy5EaWdpdGFscyk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2VQaGFzZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhJykgPj0gMCAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2InKSA+PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gJ0FCJztcclxuICAgICAgICBlbHNlIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2InKSA+PSAwICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYycpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQkMnO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYycpID49IDAgJiYgdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdDQSc7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdBTic7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdCTic7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdjJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdDTic7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCduJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdORyc7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJ05vbmUnO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlVHlwZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCd2JykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdWb2x0YWdlJztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAnQ3VycmVudCc7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQ2FwQmFua1JlbGF5LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOC8xMi8yMDIwIC0gQy4gTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuL0Fzc2V0JztcclxuXHJcbmZ1bmN0aW9uIENhcEJhbmtSZWxheUF0dHJpYnV0ZXMocHJvcHM6IHsgTmV3RWRpdDogU3lzdGVtQ2VudGVyLk5ld0VkaXQsIEFzc2V0OiBPcGVuWERBLkNhcEJhbmtSZWxheSwgVXBkYXRlU3RhdGU6IChuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQ2FwQmFua1JlbGF5KSA9PiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XHJcbiAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuQ2FwQmFua1JlbGF5KSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnT25Wb2x0YWdlVGhyZXNoaG9sZCcpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Bc3NldC5PblZvbHRhZ2VUaHJlc2hob2xkKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiA8PlxyXG4gICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5DYXBCYW5rUmVsYXk+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnT25Wb2x0YWdlVGhyZXNoaG9sZCd9IExhYmVsPXsnUmVsYXkgT24gVm9sdGFnZSBUaHJlc2hob2xkIChwdSknfSBGZWVkYmFjaz17J1JlbGF5IE9uIFZvbHRhZ2UgVGhyZXNoaG9sZCAocHUpIGlzIGEgcmVxdWlyZWQgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgPC8+O1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FwQmFua1JlbGF5QXR0cmlidXRlczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTmV3TWV0ZXJXaXphcmQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBQYWdlMSBmcm9tICcuL1BhZ2UxJztcclxuaW1wb3J0IFBhZ2UyIGZyb20gJy4vUGFnZTInO1xyXG5pbXBvcnQgUGFnZTMgZnJvbSAnLi9QYWdlMyc7XHJcbmltcG9ydCBQYWdlNCBmcm9tICcuL1BhZ2U0JztcclxuaW1wb3J0IFBhZ2U1IGZyb20gJy4vUGFnZTUnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuZXhwb3J0IGludGVyZmFjZSBBc3NldExpc3RzIHtcclxuICAgIEJyZWFrZXJzOiBBcnJheTxPcGVuWERBLkJyZWFrZXI+LFxyXG4gICAgQnVzZXM6IEFycmF5PE9wZW5YREEuQnJlYWtlcj4sXHJcbiAgICBDYXBCYW5rczogQXJyYXk8T3BlblhEQS5DYXBCYW5rPixcclxuICAgIExpbmVzOiBBcnJheTxPcGVuWERBLkxpbmU+LFxyXG4gICAgVHJhbnNmb3JtZXJzOiBBcnJheTxPcGVuWERBLlRyYW5zZm9ybWVyPlxyXG59XHJcblxyXG5pbnRlcmZhY2UgV2l6YXJkU3RhdGUge1xyXG4gICAgY3VycmVudFN0ZXA6IG51bWJlcixcclxuICAgIE1ldGVySW5mbzogT3BlblhEQS5NZXRlcixcclxuICAgIExvY2F0aW9uSW5mbzogT3BlblhEQS5Mb2NhdGlvbixcclxuICAgIENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+LFxyXG4gICAgQXNzZXRzOiBBcnJheTxPcGVuWERBLkJyZWFrZXIgfCBPcGVuWERBLkJ1cyB8IE9wZW5YREEuQ2FwQmFuayB8IE9wZW5YREEuTGluZSB8IE9wZW5YREEuVHJhbnNmb3JtZXI+LFxyXG4gICAgQXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+LFxyXG4gICAgTWV0ZXJLZXlzOiBBcnJheTxzdHJpbmc+LFxyXG4gICAgTG9jYXRpb25LZXlzOiBBcnJheTxzdHJpbmc+XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld01ldGVyV2l6YXJkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHt9LCBXaXphcmRTdGF0ZSwge30+e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwOiB0aGlzLmdldEN1cnJlbnRTdGVwKCksIFxyXG4gICAgICAgICAgICBNZXRlckluZm86IHRoaXMuZ2V0TWV0ZXJJbmZvKCksXHJcbiAgICAgICAgICAgIExvY2F0aW9uSW5mbzogdGhpcy5nZXRMb2NhdGlvbkluZm8oKSAsXHJcbiAgICAgICAgICAgIENoYW5uZWxzOiB0aGlzLmdldENoYW5uZWxzKCksXHJcbiAgICAgICAgICAgIEFzc2V0czogdGhpcy5nZXRBc3NldHMoKSxcclxuICAgICAgICAgICAgQXNzZXRDb25uZWN0aW9uczogdGhpcy5nZXRBc3NldENvbm5lY3Rpb25zKCksXHJcbiAgICAgICAgICAgIE1ldGVyS2V5czogW10sXHJcbiAgICAgICAgICAgIExvY2F0aW9uS2V5czogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLm5leHQgPSB0aGlzLm5leHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnByZXYgPSB0aGlzLnByZXYuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YSA9IHRoaXMuY2xlYXJEYXRhLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSA9IHRoaXMudXBkYXRlU3RhdGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmdldEhlYWRlciA9IHRoaXMuZ2V0SGVhZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlTmV4dCA9IHRoaXMuZGlzYWJsZU5leHQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZE5ld01ldGVyID0gdGhpcy5hZGROZXdNZXRlci5iaW5kKHRoaXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmdldE1ldGVyS2V5cygpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9jYXRpb25LZXlzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50U3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIDFcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWV0ZXJJbmZvKCk6IE9wZW5YREEuTWV0ZXIge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgSUQ6IDAsXHJcbiAgICAgICAgICAgICAgICBBc3NldEtleTogbnVsbCxcclxuICAgICAgICAgICAgICAgIE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBTaG9ydE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBBbGlhczogbnVsbCxcclxuICAgICAgICAgICAgICAgIE1ha2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBNb2RlbDogbnVsbCxcclxuICAgICAgICAgICAgICAgIFRpbWVab25lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgRGVzY3JpcHRpb246IG51bGwsXHJcbiAgICAgICAgICAgICAgICBMb2NhdGlvbklEOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMb2NhdGlvbkluZm8oKTogT3BlblhEQS5Mb2NhdGlvbiB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25JbmZvJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uS2V5OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIEFsaWFzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgU2hvcnROYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTGF0aXR1ZGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBMb25naXR1ZGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBEZXNjcmlwdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENoYW5uZWxzKCk6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4ge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkNoYW5uZWxzJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DaGFubmVscycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2V0cygpOiBBcnJheTxPcGVuWERBLkJyZWFrZXIgfCBPcGVuWERBLkJ1cyB8IE9wZW5YREEuQ2FwQmFuayB8IE9wZW5YREEuTGluZSB8IE9wZW5YREEuVHJhbnNmb3JtZXI+XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NldENvbm5lY3Rpb25zKCk6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1ldGVyS2V5cygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLk1ldGVyS2V5cycpKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTWV0ZXJLZXlzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1ldGVyS2V5cycpKSB9KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlcmAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5kb25lKChtZXRlcnM6IEFycmF5PE9wZW5YREEuTWV0ZXI+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5cyA9IG1ldGVycy5tYXAoYSA9PiBhLkFzc2V0S2V5LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1ldGVyS2V5czoga2V5cyB9KTtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1ldGVyS2V5cycsIEpTT04uc3RyaW5naWZ5KGtleXMpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG9jYXRpb25LZXlzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25LZXlzJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbktleXM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25LZXlzJykpIH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKG1sczogQXJyYXk8T3BlblhEQS5Mb2NhdGlvbj4pID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gbWxzLm1hcChhID0+IGEuTG9jYXRpb25LZXkudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb25LZXlzOiBrZXlzfSk7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbktleXMnLCBKU09OLnN0cmluZ2lmeShrZXlzKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYWRkTmV3TWV0ZXIoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQsIE1vdXNlRXZlbnQ+KTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXIvTmV3YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBNZXRlckluZm86IHRoaXMuc3RhdGUuTWV0ZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgTG9jYXRpb25JbmZvOiB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mbyxcclxuICAgICAgICAgICAgICAgIENoYW5uZWxzOiB0aGlzLnN0YXRlLkNoYW5uZWxzLFxyXG4gICAgICAgICAgICAgICAgQXNzZXRzOiB0aGlzLnN0YXRlLkFzc2V0cyxcclxuICAgICAgICAgICAgICAgIEFzc2V0Q29ubmVjdGlvbnM6IHRoaXMuc3RhdGUuQXNzZXRDb25uZWN0aW9uc1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9TWV0ZXJzJztcclxuICAgICAgICB9KS5mYWlsKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuc3RhdHVzID09IDUwMClcclxuICAgICAgICAgICAgICAgIGFsZXJ0KG1zZy5yZXNwb25zZUpTT04uRXhjZXB0aW9uTWVzc2FnZSlcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBob21lUGF0aCArICdpbmRleC5jc2h0bWw/bmFtZT1NZXRlcnMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICBsZXQgY3VycmVudFN0ZXAgPSB0aGlzLnN0YXRlLmN1cnJlbnRTdGVwO1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBjdXJyZW50U3RlcCBpcyBzZXQgdG8gc29tZXRoaW5nIHJlYXNvbmFibGVcclxuICAgICAgICBpZiAoY3VycmVudFN0ZXAgPj0gNCkge1xyXG4gICAgICAgICAgICBjdXJyZW50U3RlcCA9IDU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudFN0ZXAgPSBjdXJyZW50U3RlcCArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnLCBjdXJyZW50U3RlcC50b1N0cmluZygpKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjdXJyZW50U3RlcDogY3VycmVudFN0ZXBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2KCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50U3RlcCA9IHRoaXMuc3RhdGUuY3VycmVudFN0ZXA7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwIDw9IDEpIHtcclxuICAgICAgICAgICAgY3VycmVudFN0ZXAgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwID0gY3VycmVudFN0ZXAgLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJywgY3VycmVudFN0ZXAudG9TdHJpbmcoKSlcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY3VycmVudFN0ZXA6IGN1cnJlbnRTdGVwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU3RhdGUoc3RhdGUpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdNZXRlckluZm8nKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycsIEpTT04uc3RyaW5naWZ5KHN0YXRlLk1ldGVySW5mbykpXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdMb2NhdGlvbkluZm8nKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycsIEpTT04uc3RyaW5naWZ5KHN0YXRlLkxvY2F0aW9uSW5mbykpXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdDaGFubmVscycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnLCBKU09OLnN0cmluZ2lmeShzdGF0ZS5DaGFubmVscykpXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdBc3NldHMnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycsIEpTT04uc3RyaW5naWZ5KHN0YXRlLkFzc2V0cykpXHJcbiAgICAgICAgaWYgKHN0YXRlLmhhc093blByb3BlcnR5KCdBc3NldENvbm5lY3Rpb25zJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJywgSlNPTi5zdHJpbmdpZnkoc3RhdGUuQXNzZXRDb25uZWN0aW9ucykpXHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyTG9jYWxTdG9yYWdlKCk7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1ldGVySW5mbzogdGhpcy5nZXRNZXRlckluZm8oKSwgTG9jYXRpb25JbmZvOiB0aGlzLmdldExvY2F0aW9uSW5mbygpLCBDaGFubmVsczogdGhpcy5nZXRDaGFubmVscygpLCBjdXJyZW50U3RlcDogdGhpcy5nZXRDdXJyZW50U3RlcCgpLCBBc3NldHM6IHRoaXMuZ2V0QXNzZXRzKCkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJMb2NhbFN0b3JhZ2UoKSB7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlckluZm8nKVxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25JbmZvJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5DaGFubmVscycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnKVxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25zJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRIZWFkZXIoKTogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDEpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgMTogR2VuZXJhbCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDIpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgMjogU3Vic3RhdGlvbiBpbmZvcm1hdGlvbiBmb3IgdGhlIG5ldyBtZXRlclwiXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDM6IFBvcHVsYXRlIGNoYW5uZWxzIGZvciB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDQpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgNDogUG9wdWxhdGUgYXNzZXRzIG1vbml0b3JlZCBieSB0aGUgbmV3IG1ldGVyXCJcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDUpXHJcbiAgICAgICAgICAgIHJldHVybiBcIlN0ZXAgNTogQWRkIGNvbm5lY3Rpb24gYmV0d2VlbiB0aGUgYXNzZXRzIHRoYXQgYXJlIG1vbml0b3JlZCBieSB0aGUgbmV3IG1ldGVyXCJcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFnZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UxIE1ldGVySW5mbz17dGhpcy5zdGF0ZS5NZXRlckluZm99IFVwZGF0ZVN0YXRlPXsobWV0ZXIpID0+IHRoaXMudXBkYXRlU3RhdGUoe01ldGVySW5mbzogbWV0ZXJ9KX0gLz5cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDIpXHJcbiAgICAgICAgICAgIHJldHVybiA8UGFnZTIgTG9jYXRpb25JbmZvPXt0aGlzLnN0YXRlLkxvY2F0aW9uSW5mb30gVXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UzIE1ldGVyS2V5PXt0aGlzLnN0YXRlLk1ldGVySW5mby5Bc3NldEtleX0gQ2hhbm5lbHM9e3RoaXMuc3RhdGUuQ2hhbm5lbHN9IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gNClcclxuICAgICAgICAgICAgcmV0dXJuIDxQYWdlNCBBc3NldENvbm5lY3Rpb25zPXt0aGlzLnN0YXRlLkFzc2V0Q29ubmVjdGlvbnN9IENoYW5uZWxzPXt0aGlzLnN0YXRlLkNoYW5uZWxzfSBBc3NldHM9e3RoaXMuc3RhdGUuQXNzZXRzfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDUpXHJcbiAgICAgICAgICAgIHJldHVybiA8UGFnZTUgQXNzZXRzPXt0aGlzLnN0YXRlLkFzc2V0c30gQXNzZXRDb25uZWN0aW9ucz17dGhpcy5zdGF0ZS5Bc3NldENvbm5lY3Rpb25zfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZU5leHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgYXNzZXRLZXk6IGJvb2xlYW4gPSB0aGlzLnN0YXRlLk1ldGVySW5mby5Bc3NldEtleSA9PSBudWxsIHx8IHRoaXMuc3RhdGUuTWV0ZXJJbmZvLkFzc2V0S2V5Lmxlbmd0aCA9PSAwIHx8IHRoaXMuc3RhdGUuTWV0ZXJLZXlzLmluZGV4T2YodGhpcy5zdGF0ZS5NZXRlckluZm8uQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkgPj0gMDtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IGJvb2xlYW4gPSB0aGlzLnN0YXRlLk1ldGVySW5mby5OYW1lID09IG51bGwgfHwgdGhpcy5zdGF0ZS5NZXRlckluZm8uTmFtZS5sZW5ndGggPT0gMDtcclxuICAgICAgICAgICAgdmFyIG1ha2U6IGJvb2xlYW4gPSB0aGlzLnN0YXRlLk1ldGVySW5mby5NYWtlID09IG51bGwgfHwgdGhpcy5zdGF0ZS5NZXRlckluZm8uTWFrZS5sZW5ndGggPT0gMDtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBib29sZWFuID0gdGhpcy5zdGF0ZS5NZXRlckluZm8uTW9kZWwgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLk1ldGVySW5mby5Nb2RlbC5sZW5ndGggPT0gMDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhc3NldEtleSB8fCBuYW1lIHx8IG1ha2UgfHwgbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gMikge1xyXG4gICAgICAgICAgICB2YXIga2V5OiBib29sZWFuID0gdGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleS5sZW5ndGggPT0gMCB8fCAodGhpcy5zdGF0ZS5Mb2NhdGlvbktleXMuaW5kZXhPZih0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleS50b0xvd2VyQ2FzZSgpKSA+PSAwICYmIHRoaXMuc3RhdGUuTG9jYXRpb25JbmZvLklEID09IDApO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogYm9vbGVhbiA9IHRoaXMuc3RhdGUuTG9jYXRpb25JbmZvLk5hbWUgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5OYW1lLmxlbmd0aCA9PSAwO1xyXG4gICAgICAgICAgICB2YXIgbGF0aXR1ZGU6IGJvb2xlYW4gPSB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5MYXRpdHVkZSA9PSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgbG9uZ2l0dWRlOiBib29sZWFuID0gdGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm8uTG9uZ2l0dWRlID09IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ga2V5IHx8IG5hbWUgfHwgbGF0aXR1ZGUgfHwgbG9uZ2l0dWRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDMpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkNoYW5uZWxzLmxlbmd0aCA9PSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gNClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuQXNzZXRzLmxlbmd0aCA9PSAwO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nOiAxMCwgaGVpZ2h0OiAnaW5oZXJpdCcsIG92ZXJmbG93WTogJ2hpZGRlbid9fT5cclxuICAgICAgICAgICAgICAgIDxoMj5OZXcgTWV0ZXIgV2l6YXJkPC9oMj5cclxuICAgICAgICAgICAgICAgIDxoci8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17e2hlaWdodDogJ2NhbGMoMTAwJSAtIDc1cHgpJ319PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMuY2xlYXJEYXRhfSA+Q2xlYXIgRGF0YTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgc3R5bGU9e3t3aWR0aDogJzkwJSd9fT57dGhpcy5nZXRIZWFkZXIoKX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCIgc3R5bGU9e3ttYXhIZWlnaHQ6ICdjYWxjKDEwMCUgLSAxMjZweCknfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldFBhZ2UoKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIG9uQ2xpY2s9e3RoaXMucHJldn0gaGlkZGVuPXt0aGlzLnN0YXRlLmN1cnJlbnRTdGVwIDw9IDF9PlByZXY8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMubmV4dH0gaGlkZGVuPXt0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID49IDV9IGRpc2FibGVkPXt0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID49IDUgfHwgdGhpcy5kaXNhYmxlTmV4dCgpfT5OZXh0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXt0aGlzLmFkZE5ld01ldGVyfSBoaWRkZW49e3RoaXMuc3RhdGUuY3VycmVudFN0ZXAgPCA1fT5TdWJtaXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlMS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDMvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgRm9ybUlucHV0IGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybUlucHV0JztcclxuaW1wb3J0IEZvcm1UZXh0QXJlYSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1UZXh0QXJlYSc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZTEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBNZXRlckluZm86IE9wZW5YREEuTWV0ZXIsIFVwZGF0ZVN0YXRlOiAocmVjb3JkOiBPcGVuWERBLk1ldGVyKSA9PiB2b2lkIH0sIHsgVGltZVpvbmVzOiBBcnJheTxTeXN0ZW1DZW50ZXIuVmFsdWVMaXN0SXRlbT4sIE1ldGVyS2V5czogQXJyYXk8c3RyaW5nPiB9LCB7fT57XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBUaW1lWm9uZXM6IFtdLFxyXG4gICAgICAgICAgICBNZXRlcktleXM6IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZhbGlkID0gdGhpcy52YWxpZC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0TWV0ZXJLZXlzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRUaW1lWm9uZXMoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFRpbWVab25lcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ1N5c3RlbUNlbnRlci5UaW1lWm9uZXMnKSlcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFRpbWVab25lczogSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdTeXN0ZW1DZW50ZXIuVGltZVpvbmVzJykpIH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9WYWx1ZUxpc3QvR3JvdXAvVGltZVpvbmVzYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKHR6czogQXJyYXk8U3lzdGVtQ2VudGVyLlZhbHVlTGlzdEl0ZW0+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgVGltZVpvbmVzOiB0enMgfSk7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdTeXN0ZW1DZW50ZXIuVGltZVpvbmVzJywgSlNPTi5zdHJpbmdpZnkodHpzKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNZXRlcktleXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5NZXRlcktleXMnKSlcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1ldGVyS2V5czogSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlcktleXMnKSkgfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXJgLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICAgICAgfSkuZG9uZSgobWV0ZXJzOiBBcnJheTxPcGVuWERBLk1ldGVyPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBtZXRlcnMubWFwKGEgPT4gYS5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBNZXRlcktleXM6IGtleXMgfSk7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlcktleXMnLCBKU09OLnN0cmluZ2lmeShrZXlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuTWV0ZXIpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdBc3NldEtleScpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLk1ldGVySW5mby5Bc3NldEtleSAhPSBudWxsICYmIHRoaXMuc3RhdGUuTWV0ZXJLZXlzLmluZGV4T2YodGhpcy5wcm9wcy5NZXRlckluZm8uQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkgPCAwICYmdGhpcy5wcm9wcy5NZXRlckluZm8uQXNzZXRLZXkubGVuZ3RoID4gMCAmJiB0aGlzLnByb3BzLk1ldGVySW5mby5Bc3NldEtleS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5NZXRlckluZm8uTmFtZSAhPSBudWxsICYmIHRoaXMucHJvcHMuTWV0ZXJJbmZvLk5hbWUubGVuZ3RoID4gMCAmJiB0aGlzLnByb3BzLk1ldGVySW5mby5OYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0FsaWFzJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTWV0ZXJJbmZvLkFsaWFzID09IG51bGwgfHwgdGhpcy5wcm9wcy5NZXRlckluZm8uQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTWV0ZXJJbmZvLlNob3J0TmFtZSA9PSBudWxsIHx8IHRoaXMucHJvcHMuTWV0ZXJJbmZvLlNob3J0TmFtZS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01ha2UnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5NZXRlckluZm8uTWFrZSAhPSBudWxsICYmIHRoaXMucHJvcHMuTWV0ZXJJbmZvLk1ha2UubGVuZ3RoID4gMCAmJiB0aGlzLnByb3BzLk1ldGVySW5mby5NYWtlLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01vZGVsJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTWV0ZXJJbmZvLk1vZGVsICE9IG51bGwgJiYgdGhpcy5wcm9wcy5NZXRlckluZm8uTW9kZWwubGVuZ3RoID4gMCAmJiB0aGlzLnByb3BzLk1ldGVySW5mby5Nb2RlbC5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3RoaXMucHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J0Fzc2V0S2V5J30gRmVlZGJhY2s9eydBIHVuaXF1ZSBrZXkgb2YgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy5wcm9wcy5VcGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17dGhpcy5wcm9wcy5NZXRlckluZm99IEZpZWxkPXsnTmFtZSd9IEZlZWRiYWNrPXsnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycyBhbmQgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy5wcm9wcy5VcGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17dGhpcy5wcm9wcy5NZXRlckluZm99IEZpZWxkPXsnU2hvcnROYW1lJ30gRmVlZGJhY2s9eydTaG9ydE5hbWUgbXVzdCBiZSBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycy4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXt0aGlzLnByb3BzLlVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXt0aGlzLnByb3BzLk1ldGVySW5mb30gRmllbGQ9eydBbGlhcyd9IEZlZWRiYWNrPXsnQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy5wcm9wcy5VcGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17dGhpcy5wcm9wcy5NZXRlckluZm99IEZpZWxkPXsnTWFrZSd9IEZlZWRiYWNrPXsnTWFrZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXt0aGlzLnByb3BzLlVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXt0aGlzLnByb3BzLk1ldGVySW5mb30gRmllbGQ9eydNb2RlbCd9IEZlZWRiYWNrPXsnTW9kZWwgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy5wcm9wcy5VcGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlRpbWUgWm9uZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMucHJvcHMuTWV0ZXJJbmZvID09IG51bGwgfHwgdGhpcy5wcm9wcy5NZXRlckluZm8uVGltZVpvbmUgPT0gbnVsbCA/ICctMScgOiB0aGlzLnByb3BzLk1ldGVySW5mby5UaW1lWm9uZX0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXRlcjogT3BlblhEQS5NZXRlciA9IF8uY2xvbmUodGhpcy5wcm9wcy5NZXRlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCItMVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGVyLlRpbWVab25lID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRlci5UaW1lWm9uZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKG1ldGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiLTFcIj5Ob25lIFNlbGVjdGVkPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuc3RhdGUuVGltZVpvbmVzICE9IG51bGwgPyB0aGlzLnN0YXRlLlRpbWVab25lcy5zb3J0KChhLCBiKSA9PiBhLlNvcnRPcmRlciAtIGIuU29ydE9yZGVyKS5tYXAodHogPT4gPG9wdGlvbiB2YWx1ZT17dHouVGV4dH0ga2V5PXt0ei5UZXh0fSBkaXNhYmxlZD17IXR6LkVuYWJsZWR9IGhpZGRlbj17dHouSGlkZGVufT57dHouQWx0VGV4dDF9PC9vcHRpb24+KSA6IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtVGV4dEFyZWE8T3BlblhEQS5NZXRlcj4gUm93cz17M30gUmVjb3JkPXt0aGlzLnByb3BzLk1ldGVySW5mb30gRmllbGQ9eydEZXNjcmlwdGlvbid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9e3RoaXMucHJvcHMuVXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlMS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDMvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xyXG5pbXBvcnQgRm9ybVRleHRBcmVhIGZyb20gJy4uL0NvbW1vbkNvbXBvbmVudHMvRm9ybVRleHRBcmVhJztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2UyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgTG9jYXRpb25JbmZvOiBPcGVuWERBLkxvY2F0aW9uLCBVcGRhdGVTdGF0ZTogKHJlY29yZCkgPT4gdm9pZCB9LCB7IExvY2F0aW9uczogQXJyYXk8T3BlblhEQS5Mb2NhdGlvbj4gfSwge30+e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgTG9jYXRpb25zOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWxpZCA9IHRoaXMudmFsaWQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0QWxsTG9jYXRpb25zKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEFsbExvY2F0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ09wZW5YREEuTG9jYXRpb25zJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbnM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnT3BlblhEQS5Mb2NhdGlvbnMnKSkgfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xvY2F0aW9uYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICAgICAgfSkuZG9uZSgobWxzOiBBcnJheTxPcGVuWERBLkxvY2F0aW9uPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IExvY2F0aW9uczogbWxzIH0pXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdPcGVuWERBLkxvY2F0aW9ucycsIEpTT04uc3RyaW5naWZ5KG1scykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREaWZmZXJlbnRNZXRlckxvY2F0aW9uKG1ldGVyTG9jYXRpb25JRDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IExvY2F0aW9uSW5mbzogdGhpcy5zdGF0ZS5Mb2NhdGlvbnMuZmluZCgodmFsdWUsIGluZGV4LCBvYmplY3QpID0+IHZhbHVlLklEID09IG1ldGVyTG9jYXRpb25JRCkgfSlcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuTG9jYXRpb24pKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdMb2NhdGlvbktleScpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5ID09IG51bGwgfHwgdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkubGVuZ3RoID09IDAgfHwgdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkubGVuZ3RoID4gNTApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgPT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkxvY2F0aW9ucy5maW5kKGxvY3MgPT4gbG9jcy5Mb2NhdGlvbktleS50b0xvd2VyQ2FzZSgpID09IHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5LnRvTG93ZXJDYXNlKCkpID09IG51bGw7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5OYW1lICE9IG51bGwgJiYgdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTmFtZS5sZW5ndGggPiAwICYmIHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLk5hbWUubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnQWxpYXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uQWxpYXMgPT0gbnVsbCB8fCB0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5BbGlhcy5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdTaG9ydE5hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uU2hvcnROYW1lID09IG51bGwgfHwgdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uU2hvcnROYW1lLmxlbmd0aCA8PSA1MDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTGF0aXR1ZGUnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTGF0aXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxhdGl0dWRlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnTG9uZ2l0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxvbmdpdHVkZSAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIodGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTG9uZ2l0dWRlKTtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRGVzY3JpcHRpb24nKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2VsZWN0IExvY2F0aW9uPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgPT0gbnVsbCA/ICcwJyA6IHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEfSBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT0gXCIwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXREaWZmZXJlbnRNZXRlckxvY2F0aW9uKHBhcnNlSW50KGV2dC50YXJnZXQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9jYXRpb25JbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvY2F0aW9uS2V5OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxpYXM6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2hvcnROYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhdGl0dWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9uZ2l0dWRlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVzY3JpcHRpb246ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIj5BZGQgTmV3PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMuc3RhdGUuTG9jYXRpb25zICE9IG51bGwgPyB0aGlzLnN0YXRlLkxvY2F0aW9ucy5tYXAobWwgPT4gPG9wdGlvbiB2YWx1ZT17bWwuSUR9IGtleT17bWwuSUR9PnttbC5Mb2NhdGlvbktleX08L29wdGlvbj4pIDogbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mb30gRmllbGQ9J0xvY2F0aW9uS2V5JyBMYWJlbD0nS2V5JyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdBIHVuaXF1ZSBLZXkgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJyBEaXNhYmxlZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mb30gRmllbGQ9J05hbWUnIFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IExvY2F0aW9uSW5mbzogcmVjb3JkIH0pfSBWYWxpZD17dGhpcy52YWxpZH0gRmVlZGJhY2s9J05hbWUgaXMgcmVxdWlyZWQgYW5kIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLicgRGlzYWJsZWQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdTaG9ydE5hbWUnIExhYmVsPSdTaG9ydCBOYW1lJyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdTaG9ydCBOYW1lIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJyBEaXNhYmxlZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mb30gRmllbGQ9J0FsaWFzJyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdBbGlhcyBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nIERpc2FibGVkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nTGF0aXR1ZGUnIFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IExvY2F0aW9uSW5mbzogcmVjb3JkIH0pfSBWYWxpZD17dGhpcy52YWxpZH0gRmVlZGJhY2s9J0xhdGl0dWRlIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nIERpc2FibGVkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nTG9uZ2l0dWRlJyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdMb25naXR1ZGUgaXMgYSByZXF1aXJlZCBudW1lcmljIGZpZWxkLicgRGlzYWJsZWQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTG9jYXRpb24+IFJvd3M9ezN9IFJlY29yZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdEZXNjcmlwdGlvbicgU2V0dGVyPXsocmVjb3JkKSA9PiB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgTG9jYXRpb25JbmZvOiByZWNvcmQgfSl9IFZhbGlkPXt0aGlzLnZhbGlkfSBGZWVkYmFjaz0nJyBEaXNhYmxlZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTMudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBDRkdQYXJzZXIgZnJvbSAnLi4vLi4vLi4vVFMvQ0ZHUGFyc2VyJztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlMyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IE1ldGVyS2V5OiBzdHJpbmcsIENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+LCBVcGRhdGVTdGF0ZTogKHJlY29yZCkgPT4gdm9pZCB9LCB7IFBoYXNlczogQXJyYXk8T3BlblhEQS5QaGFzZT4sIE1lYXN1cmVtZW50VHlwZXM6IEFycmF5PE9wZW5YREEuTWVhc3VyZW1lbnRUeXBlPiB9LCB7fT57XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBQaGFzZXM6IFtdLFxyXG4gICAgICAgICAgICBNZWFzdXJlbWVudFR5cGVzOiBbXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmdldFBoYXNlcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0TWVhc3VyZW1lbnRUeXBlcygpO1xyXG5cclxuICAgICAgICAkKFwiLmN1c3RvbS1maWxlLWlucHV0XCIpLm9uKFwiY2hhbmdlXCIsIChldnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSAoZXZ0IGFzIFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KS50YXJnZXQudmFsdWUuc3BsaXQoXCJcXFxcXCIpLnBvcCgpO1xyXG4gICAgICAgICAgICAkKGV2dC50YXJnZXQpLnNpYmxpbmdzKFwiLmN1c3RvbS1maWxlLWxhYmVsXCIpLmFkZENsYXNzKFwic2VsZWN0ZWRcIikuaHRtbChmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVhZFNpbmdsZUZpbGUoKGV2dCBhcyBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGhhc2VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuUGhhc2VzJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBQaGFzZXM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuUGhhc2VzJykpIH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL1BoYXNlYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKHBoYXNlczogQXJyYXk8T3BlblhEQS5QaGFzZT4pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBQaGFzZXM6IHBoYXNlcyB9KVxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuUGhhc2VzJywgSlNPTi5zdHJpbmdpZnkocGhhc2VzKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldE1lYXN1cmVtZW50VHlwZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5NZWFzdXJlbWVudFR5cGVzJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBNZWFzdXJlbWVudFR5cGVzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1lYXN1cmVtZW50VHlwZXMnKSkgfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWVhc3VyZW1lbnRUeXBlYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKG1lYXN1cmVtZW50VHlwZXM6IEFycmF5PE9wZW5YREEuTWVhc3VyZW1lbnRUeXBlPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1lYXN1cmVtZW50VHlwZXM6IG1lYXN1cmVtZW50VHlwZXMgfSlcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1lYXN1cmVtZW50VHlwZXMnLCBKU09OLnN0cmluZ2lmeShtZWFzdXJlbWVudFR5cGVzKSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWFkU2luZ2xlRmlsZShldnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgLy9SZXRyaWV2ZSB0aGUgZmlyc3QgKGFuZCBvbmx5ISkgRmlsZSBmcm9tIHRoZSBGaWxlTGlzdCBvYmplY3RcclxuICAgICAgICB2YXIgZiA9IGV2dC50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgICAgaWYgKGYpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICByLm9ubG9hZCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudHMgPSBlLnRhcmdldC5yZXN1bHQgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwYXJzZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGYubmFtZS5pbmRleE9mKCcuY2ZnJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlciA9IG5ldyBDRkdQYXJzZXIoY29udGVudHMsIHRoaXMucHJvcHMuTWV0ZXJLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBDaGFubmVsczogcGFyc2VyLkNoYW5uZWxzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJBc3NldHNDaGFubmVscygpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnRmlsZSBpcyBub3Qgb2YgdHlwZSBjZmcuIFBsZWFzZSBvbmx5IHVzZSBjb210cmFkZSBzdGFuZGFyZCBjZmcgZmlsZXMuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgci5yZWFkQXNUZXh0KGYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgICQoXCIuY3VzdG9tLWZpbGUtaW5wdXRcIikub2ZmKCdjaGFuZ2UnKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVDaGFubmVsKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBfLmNsb25lKHRoaXMucHJvcHMuQ2hhbm5lbHMpO1xyXG4gICAgICAgIGxldCByZWNvcmQ6IE9wZW5YREEuQ2hhbm5lbCA9IGNoYW5uZWxzLnNwbGljZShpbmRleCwgMSlbMF07XHJcbiAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlY29yZC5Bc3NldCA9PSAnJykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgYXNzZXRzOkFycmF5PE9wZW5YREEuQXNzZXQ+ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpO1xyXG5cclxuICAgICAgICBpZiAoYXNzZXRzICE9IG51bGwgJiYgYXNzZXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGFzc2V0ID0gYXNzZXRzLmZpbmQoYSA9PiBhLkFzc2V0S2V5ID09IHJlY29yZC5Bc3NldClcclxuICAgICAgICAgICAgaWYgKGFzc2V0ID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGFubmVsSW5kZXggPSBhc3NldC5DaGFubmVscy5maW5kSW5kZXgoYyA9PiBjLklEID0gcmVjb3JkLklEKTtcclxuICAgICAgICAgICAgaWYgKGNoYW5uZWxJbmRleCA8IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGFzc2V0LkNoYW5uZWxzLnNwbGljZShjaGFubmVsSW5kZXgsMSlcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IEFzc2V0czogYXNzZXRzIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJBc3NldHNDaGFubmVscygpOnZvaWQge1xyXG4gICAgICAgIGxldCBhc3NldHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSk7XHJcblxyXG4gICAgICAgIGlmIChhc3NldHMgIT0gbnVsbCAmJiBhc3NldHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkLmVhY2goYXNzZXRzLCAoaW5kZXgsIGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhc3NldC5DaGFubmVscyA9IFtdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQXNzZXRzOiBhc3NldHMgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiAwLCBNZXRlcjogdGhpcy5wcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0FOJywgTmFtZTogJ1ZBTicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBBTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiAxLCBNZXRlcjogdGhpcy5wcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0JOJywgTmFtZTogJ1ZCTicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBCTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiAyLCBNZXRlcjogdGhpcy5wcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0NOJywgTmFtZTogJ1ZDTicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBDTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiAzLCBNZXRlcjogdGhpcy5wcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdDdXJyZW50JywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0FOJywgTmFtZTogJ0lBJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdDdXJyZW50IEEnLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogNCwgTWV0ZXI6IHRoaXMucHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnQ3VycmVudCcsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdCTicsIE5hbWU6ICdJQicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnQ3VycmVudCBCJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDUsIE1ldGVyOiB0aGlzLnByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0N1cnJlbnQnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQ04nLCBOYW1lOiAnSUMnLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ0N1cnJlbnQgQycsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiA2LCBNZXRlcjogdGhpcy5wcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdDdXJyZW50JywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ05HJywgTmFtZTogJ0lOJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdDdXJyZW50IE5HJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBDaGFubmVsczogY2hhbm5lbHMgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQXNzZXRzQ2hhbm5lbHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+RGVmYXVsdCBTZXR1cDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN1c3RvbS1maWxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgY2xhc3NOYW1lPVwiY3VzdG9tLWZpbGUtaW5wdXRcIiByZWY9XCJjdXN0b21GaWxlXCIgYWNjZXB0PVwiLmNmZywucGFyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY3VzdG9tLWZpbGUtbGFiZWxcIj5DaG9vc2UgYSBjb210cmFkZSBzdGFuZGFyZCBjZmcgZmlsZSBpZiBhcHBsaWNhYmxlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWw6IE9wZW5YREEuQ2hhbm5lbCA9IHsgSUQ6IHRoaXMucHJvcHMuQ2hhbm5lbHMubGVuZ3RoLCBNZXRlcjogdGhpcy5wcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdWb2x0YWdlJywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0FOJywgTmFtZTogJ1ZBTicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnVm9sdGFnZSBBTicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZSh0aGlzLnByb3BzLkNoYW5uZWxzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+QWRkIENoYW5uZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiAnY2FsYygxMDAlIC0gMzVweCknLCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q2hhbm5lbDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5EZXNjPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+VHlwZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlBoYXNlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkNoYW5uZWxzLm1hcCgoY2hhbm5lbCwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNSUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgIHZhbHVlPXtjaGFubmVsLlNlcmllcy5Tb3VyY2VJbmRleGVzfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuU2VyaWVzLlNvdXJjZUluZGV4ZXMgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoe0NoYW5uZWxzOiBhcnJheX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcyMCUnIH19PjxpbnB1dCBjbGFzc05hbWU9J2Zvcm0tY29udHJvbCcgdmFsdWU9e2NoYW5uZWwuTmFtZX0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLk5hbWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnNDUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLkRlc2NyaXB0aW9ufSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuRGVzY3JpcHRpb24gPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57PHNlbGVjdCBjbGFzc05hbWU9ICdmb3JtLWNvbnRyb2wnICB2YWx1ZT17Y2hhbm5lbC5NZWFzdXJlbWVudFR5cGV9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5NZWFzdXJlbWVudFR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e3RoaXMuc3RhdGUuTWVhc3VyZW1lbnRUeXBlcy5tYXAoYSA9PiA8b3B0aW9uIGtleT17YS5JRH0gdmFsdWU9e2EuTmFtZX0+e2EuTmFtZX08L29wdGlvbj4pfTwvc2VsZWN0Pn08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLlBoYXNlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuUGhhc2UgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBDaGFubmVsczogYXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e3RoaXMuc3RhdGUuUGhhc2VzLm1hcChhID0+IDxvcHRpb24ga2V5PXthLklEfSB2YWx1ZT17YS5OYW1lfT57YS5OYW1lfTwvb3B0aW9uPil9PC9zZWxlY3Q+fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXNtXCIgb25DbGljaz17KGUpID0+IHRoaXMuZGVsZXRlQ2hhbm5lbChpbmRleCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlNC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDMvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBLCBTeXN0ZW1DZW50ZXIgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgQnJlYWtlckF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQnJlYWtlcic7XHJcbmltcG9ydCBCdXNBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0J1cyc7XHJcbmltcG9ydCBDYXBCYW5rQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9DYXBCYW5rJztcclxuaW1wb3J0IExpbmVBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0xpbmUnO1xyXG5pbXBvcnQgVHJhbnNmb3JtZXJBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL1RyYW5zZm9ybWVyJztcclxuaW1wb3J0IEFzc2V0QXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9Bc3NldCc7XHJcbmltcG9ydCB7IGdldEFzc2V0VHlwZXMsIGdldEFsbEFzc2V0cyB9IGZyb20gJy4uLy4uLy4uL1RTL1NlcnZpY2VzL0Fzc2V0JztcclxuaW1wb3J0IENhcEJhbmtSZWxheUF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQ2FwQmFua1JlbGF5JztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmludGVyZmFjZSBQYWdlNFByb3BzIHtcclxuICAgIEFzc2V0czogQXJyYXk8T3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLlRyYW5zZm9ybWVyIHwgT3BlblhEQS5DYXBCYW5rUmVsYXk+LFxyXG4gICAgQ2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4sXHJcbiAgICBBc3NldENvbm5lY3Rpb25zOiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbj4sXHJcbiAgICBVcGRhdGVTdGF0ZTogKHJlY29yZCkgPT4gdm9pZCBcclxufVxyXG5pbnRlcmZhY2UgUGFnZTRTdGF0ZSB7XHJcbiAgICBOZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lciB8IE9wZW5YREEuQ2FwQmFua1JlbGF5LFxyXG4gICAgQWxsQXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PixcclxuICAgIEFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPixcclxuICAgIE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2U0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFBhZ2U0UHJvcHMsIFBhZ2U0U3RhdGUsIHt9PntcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIE5ld0VkaXRBc3NldDogQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJyksXHJcbiAgICAgICAgICAgIEFsbEFzc2V0czogW10sXHJcbiAgICAgICAgICAgIEFzc2V0VHlwZXM6IFtdLFxyXG4gICAgICAgICAgICBOZXdFZGl0OiAnTmV3J1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXREaWZmZXJlbnRBc3NldCA9IHRoaXMuZ2V0RGlmZmVyZW50QXNzZXQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBnZXRBbGxBc3NldHMoKS5kb25lKGFhcyA9PiB0aGlzLnNldFN0YXRlKHsgQWxsQXNzZXRzOiBhYXMgfSkpO1xyXG4gICAgICAgIGdldEFzc2V0VHlwZXMoKS5kb25lKGF0cyA9PiB0aGlzLnNldFN0YXRlKHtBc3NldFR5cGVzOiBhdHN9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdEFzc2V0KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdDogJ0VkaXQnLE5ld0VkaXRBc3NldDogdGhpcy5wcm9wcy5Bc3NldHNbaW5kZXhdIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUFzc2V0KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IF8uY2xvbmUodGhpcy5wcm9wcy5Bc3NldHMpO1xyXG4gICAgICAgIGxldCByZWNvcmQ6IEFycmF5PE9wZW5YREEuQXNzZXQ+ID0gbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIGxldCBhc3NldENvbm5lY3Rpb25zOiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbj4gPSBfLmNsb25lKHRoaXMucHJvcHMuQXNzZXRDb25uZWN0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZSh0aGlzLnByb3BzLkNoYW5uZWxzKTtcclxuXHJcbiAgICAgICAgJC5lYWNoKGNoYW5uZWxzLCAoaW5kZXgsIGNoYW5uZWwpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNoYW5uZWwuQXNzZXQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5KVxyXG4gICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9ICcnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBpbmRleCA9IGFzc2V0Q29ubmVjdGlvbnMuZmluZEluZGV4KGFzc2V0Q29ubmVjdGlvbiA9PiBhc3NldENvbm5lY3Rpb24uUGFyZW50ID09IHJlY29yZFswXS5Bc3NldEtleSB8fCBhc3NldENvbm5lY3Rpb24uQ2hpbGQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5KTtcclxuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBhc3NldENvbm5lY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGluZGV4ID0gYXNzZXRDb25uZWN0aW9ucy5maW5kSW5kZXgoYXNzZXRDb25uZWN0aW9uID0+IGFzc2V0Q29ubmVjdGlvbi5QYXJlbnQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5IHx8IGFzc2V0Q29ubmVjdGlvbi5DaGlsZCA9PSByZWNvcmRbMF0uQXNzZXRLZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IEFzc2V0czogbGlzdCB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldENvbm5lY3Rpb25zOiBhc3NldENvbm5lY3Rpb25zIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZGRBc3NldCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VBc3NldFR5cGUodHlwZTogJ0xpbmUnIHwgJ0xpbmVTZWdtZW50JyB8ICdCcmVha2VyJyB8ICdCdXMnIHwgJ0NhcGFjaXRvckJhbmsnIHwgJ1RyYW5zZm9ybWVyJyB8ICdDYXBhY2l0b3JCYW5rUmVsYXknKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGFzc2V0ID0ge1xyXG4gICAgICAgICAgICBJRDogdGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuSUQsXHJcbiAgICAgICAgICAgIEFzc2V0S2V5OiB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldEtleSxcclxuICAgICAgICAgICAgQXNzZXROYW1lOiB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldE5hbWUsXHJcbiAgICAgICAgICAgIEFzc2V0VHlwZTogdHlwZSxcclxuICAgICAgICAgICAgRGVzY3JpcHRpb246IHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LkRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBWb2x0YWdlS1Y6IHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LlZvbHRhZ2VLVixcclxuICAgICAgICAgICAgQ2hhbm5lbHM6IHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LkNoYW5uZWxzLFxyXG4gICAgICAgICAgICBTcGFyZTogdGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuU3BhcmVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFzc2V0ID0gQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0QXR0cmlidXRlcyhhc3NldCwgdHlwZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7TmV3RWRpdEFzc2V0OiBhc3NldH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERpZmZlcmVudEFzc2V0KGFzc2V0SUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBhc3NldFR5cGVJRCA9IHRoaXMuc3RhdGUuQWxsQXNzZXRzLmZpbmQoYSA9PiBhLklEID09IGFzc2V0SUQpWydBc3NldFR5cGVJRCddOyBcclxuICAgICAgICBsZXQgYXNzZXRUeXBlID0gdGhpcy5zdGF0ZS5Bc3NldFR5cGVzLmZpbmQoYXQgPT4gYXQuSUQgPT0gYXNzZXRUeXBlSUQpXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS8ke2Fzc2V0VHlwZS5OYW1lfS9PbmUvJHthc3NldElEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoYXNzZXQ6IE9wZW5YREEuQXNzZXQpID0+IHtcclxuICAgICAgICAgICAgYXNzZXQuQXNzZXRUeXBlID0gYXNzZXRUeXBlLk5hbWU7XHJcbiAgICAgICAgICAgIGFzc2V0LkNoYW5uZWxzID0gW107XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBhc3NldCB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCcmVha2VyJylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEVETkFQb2ludCh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5JRCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhc3NldFR5cGUuTmFtZSA9PSAnTGluZScpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRMaW5lU2VnbWVudCh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5JRCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaW5lU2VnbWVudChsaW5lSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTGluZS8ke2xpbmVJRH0vTGluZVNlZ21lbnRgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKGxpbmVTZWdtZW50OiBPcGVuWERBLkxpbmVEZXRhaWwpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IF8uY2xvbmUodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5MaW5lKSA7XHJcbiAgICAgICAgICAgIGlmIChsaW5lU2VnbWVudCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJlY29yZC5EZXRhaWwgPSBsaW5lU2VnbWVudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkLkRldGFpbCA9IEFzc2V0QXR0cmlidXRlcy5nZXROZXdMaW5lRGV0YWlscygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiByZWNvcmQgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVETkFQb2ludChicmVha2VySUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvQnJlYWtlci8ke2JyZWFrZXJJRH0vRUROQVBvaW50YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChlZG5hUG9pbnQ6IE9wZW5YREEuRUROQVBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgID0gXy5jbG9uZSh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkJyZWFrZXIpO1xyXG4gICAgICAgICAgICBpZiAoZWRuYVBvaW50ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkLkVETkFQb2ludCA9IGVkbmFQb2ludC5Qb2ludFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogcmVjb3JkIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9e3ttYXJnaW46IC0yMH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjg1LCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI4NSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6IDAsIG1hcmdpbjogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkNoYW5uZWxzLm1hcCgoY2hhbm5lbCwgaW5kZXgpID0+IDxsaSBzdHlsZT17e3RleHREZWNvcmF0aW9uOiAoY2hhbm5lbC5Bc3NldC5sZW5ndGggPiAwID8gJ2xpbmUtdGhyb3VnaCcgOiBudWxsKX19IGtleT17aW5kZXh9PntjaGFubmVsLk5hbWUgKyAnIC0gJyArIGNoYW5uZWwuRGVzY3JpcHRpb259PC9saT4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiBzdHlsZT17e3BhZGRpbmc6IDIwfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAzOCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PScjYXNzZXRNb2RhbCcgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7TmV3RWRpdDogJ05ldyd9KX0+QWRkIEFzc2V0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDM1MCwgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+U3RhdHVzPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5LZXk8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPmtWPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5DaGFubmVsczwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5Bc3NldHMubWFwKChhc3NldDogT3BlblhEQS5Bc3NldCwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57KGFzc2V0LklEID09IDAgPyAnTmV3JyA6ICdFeGlzdGluZycpfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcyMCUnIH19Pnthc3NldC5Bc3NldEtleX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMzAlJyB9fT57YXNzZXQuQXNzZXROYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pnthc3NldC5Bc3NldFR5cGV9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+e2Fzc2V0LlZvbHRhZ2VLVn08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuQ2hhbm5lbHMubGVuZ3RofTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNhc3NldE1vZGFsJyBvbkNsaWNrPXsoZSkgPT4gdGhpcy5lZGl0QXNzZXQoaW5kZXgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS1wZW5jaWxcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRlbGV0ZUFzc2V0KGluZGV4KX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIj48L2k+PC9zcGFuPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIGlkPVwiYXNzZXRNb2RhbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgc3R5bGU9e3ttYXhXaWR0aDogJzEwMCUnLCB3aWR0aDogJzkwJSd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnN0YXRlLk5ld0VkaXQgPT0gJ05ldycgPyAnQWRkIE5ldyBBc3NldCB0byBNZXRlcic6ICdFZGl0ICcgKyB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldEtleSArICcgZm9yIE1ldGVyJyB9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFzc2V0QXR0cmlidXRlcyBBc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXR9IE5ld0VkaXQ9e3RoaXMuc3RhdGUuTmV3RWRpdH0gQXNzZXRUeXBlcz17dGhpcy5zdGF0ZS5Bc3NldFR5cGVzfSBBbGxBc3NldHM9e3RoaXMuc3RhdGUuQWxsQXNzZXRzfSBVcGRhdGVTdGF0ZT17KGFzc2V0KSA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBhc3NldCB9KX0gR2V0RGlmZmVyZW50QXNzZXQ9e3RoaXMuZ2V0RGlmZmVyZW50QXNzZXR9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnNob3dBdHRyaWJ1dGVzKCkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Bc3NvY2lhdGVkIENoYW5uZWxzPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgbXVsdGlwbGUgc3R5bGU9e3sgaGVpZ2h0OiAnMTAwJScsIHdpZHRoOiAnMTAwJScgfX0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXQgID0gXy5jbG9uZSh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5DaGFubmVscyA9ICgkKGV2dC50YXJnZXQpLnZhbCgpIGFzIEFycmF5PHN0cmluZz4pLm1hcChhID0+IHRoaXMucHJvcHMuQ2hhbm5lbHNbcGFyc2VJbnQoYSldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IGFzc2V0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gdmFsdWU9e3RoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LkNoYW5uZWxzLm1hcChhID0+IGEuSUQudG9TdHJpbmcoKSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5DaGFubmVscy5tYXAoKGNoYW5uZWwsIGluZGV4KSA9PiA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtpbmRleH0gaGlkZGVuPXsgY2hhbm5lbC5Bc3NldCAhPSB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldEtleSAmJiBjaGFubmVsLkFzc2V0Lmxlbmd0aD4gMH0+e2NoYW5uZWwuTmFtZSArICcgLSAnICsgY2hhbm5lbC5EZXNjcmlwdGlvbn08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkOiBPcGVuWERBLkFzc2V0ID0gXy5jbG9uZSh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gXy5jbG9uZSh0aGlzLnByb3BzLkFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUodGhpcy5wcm9wcy5DaGFubmVscyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goY2hhbm5lbHMsIChpbmRleCwgY2hhbm5lbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5uZWwuQXNzZXQgPT0gcmVjb3JkLkFzc2V0S2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSAnJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmQuQ2hhbm5lbHMuZmluZEluZGV4KGMgPT4gYy5JRCA9PSBjaGFubmVsLklEKSA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSByZWNvcmQuQXNzZXRLZXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChyZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQXNzZXRzOiBsaXN0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gaGlkZGVuPXt0aGlzLnN0YXRlLk5ld0VkaXQgIT0gJ05ldyd9PlNhdmU8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmQ6IE9wZW5YREEuQXNzZXQgPSBfLmNsb25lKHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSBfLmNsb25lKHRoaXMucHJvcHMuQXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZSh0aGlzLnByb3BzLkNoYW5uZWxzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSBsaXN0LmZpbmRJbmRleChyID0+IHIuQXNzZXRLZXkgPT0gcmVjb3JkLkFzc2V0S2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFtpXSA9IHJlY29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGNoYW5uZWxzLCAoaW5kZXgsIGNoYW5uZWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFubmVsLkFzc2V0ID09IHJlY29yZC5Bc3NldEtleSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFzc2V0ID0gJydcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLkNoYW5uZWxzLmZpbmRJbmRleChjID0+IGMuSUQgPT0gY2hhbm5lbC5JRCkgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFzc2V0ID0gcmVjb3JkLkFzc2V0S2V5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IEFzc2V0czogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBoaWRkZW49e3RoaXMuc3RhdGUuTmV3RWRpdCAhPSAnRWRpdCd9PlNhdmU8L2J1dHRvbj5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlTW9kYWxTYXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAkKCcuaXMtaW52YWxpZCcpLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0F0dHJpYnV0ZXMoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0JyZWFrZXInKVxyXG4gICAgICAgICAgICByZXR1cm4gPEJyZWFrZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e3RoaXMuc3RhdGUuTmV3RWRpdH0gQXNzZXQ9e3RoaXMuc3RhdGUuTmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQnJlYWtlcn0gVXBkYXRlU3RhdGU9eyhuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnJlYWtlcikgPT4gdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogbmV3RWRpdEFzc2V0IH0pfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0J1cycpXHJcbiAgICAgICAgICAgIHJldHVybiA8QnVzQXR0cmlidXRlcyBOZXdFZGl0PXt0aGlzLnN0YXRlLk5ld0VkaXR9IEFzc2V0PXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldH0gVXBkYXRlU3RhdGU9eyhuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQnVzKSA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBuZXdFZGl0QXNzZXQgfSl9IC8+O1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFuaycpXHJcbiAgICAgICAgICAgIHJldHVybiA8Q2FwQmFua0F0dHJpYnV0ZXMgTmV3RWRpdD17dGhpcy5zdGF0ZS5OZXdFZGl0fSBBc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rfSBVcGRhdGVTdGF0ZT17KG5ld0VkaXRBc3NldDogT3BlblhEQS5DYXBCYW5rKSA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBuZXdFZGl0QXNzZXQgfSl9IC8+O1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQ2FwYWNpdG9yQmFua1JlbGF5JylcclxuICAgICAgICAgICAgcmV0dXJuIDxDYXBCYW5rUmVsYXlBdHRyaWJ1dGVzIE5ld0VkaXQ9e3RoaXMuc3RhdGUuTmV3RWRpdH0gQXNzZXQ9e3RoaXMuc3RhdGUuTmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua1JlbGF5fSBVcGRhdGVTdGF0ZT17KG5ld0VkaXRBc3NldDogT3BlblhEQS5DYXBCYW5rUmVsYXkpID0+IHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IG5ld0VkaXRBc3NldCB9KX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdMaW5lJylcclxuICAgICAgICAgICAgcmV0dXJuIDxMaW5lQXR0cmlidXRlcyBOZXdFZGl0PXt0aGlzLnN0YXRlLk5ld0VkaXR9IEFzc2V0PXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkxpbmV9IFVwZGF0ZVN0YXRlPXsobmV3RWRpdEFzc2V0OiBPcGVuWERBLkxpbmUpID0+IHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IG5ld0VkaXRBc3NldCB9KX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdUcmFuc2Zvcm1lcicpXHJcbiAgICAgICAgICAgIHJldHVybiA8VHJhbnNmb3JtZXJBdHRyaWJ1dGVzIE5ld0VkaXQ9e3RoaXMuc3RhdGUuTmV3RWRpdH0gQXNzZXQ9e3RoaXMuc3RhdGUuTmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuVHJhbnNmb3JtZXJ9IFVwZGF0ZVN0YXRlPXsobmV3RWRpdEFzc2V0OiBPcGVuWERBLlRyYW5zZm9ybWVyKSA9PiB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBuZXdFZGl0QXNzZXQgfSl9IC8+O1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTUudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzEwLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlNSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IEFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4sIEFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiAsVXBkYXRlU3RhdGU6IChyZWNvcmQpID0+IHZvaWQgfSwge0Fzc2V0SW5kZXg6IG51bWJlciwgQXNzZXRDb25uZWN0aW9uVHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uVHlwZT4gfSwge30+e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgQXNzZXRJbmRleDogMCxcclxuICAgICAgICAgICAgQXNzZXRDb25uZWN0aW9uVHlwZXM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmV4dCA9IHRoaXMubmV4dC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucHJldiA9IHRoaXMucHJldi5iaW5kKHRoaXMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmdldEFzc2V0Q29ubmVjdGlvblR5cGVzKClcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NldENvbm5lY3Rpb25UeXBlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkFzc2V0Q29ubmVjdGlvblR5cGVzJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBc3NldENvbm5lY3Rpb25UeXBlczogSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldENvbm5lY3Rpb25UeXBlcycpKSB9KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Bc3NldENvbm5lY3Rpb25UeXBlYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKGFjdHM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uVHlwZT4pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBBc3NldENvbm5lY3Rpb25UeXBlczogYWN0cyB9KTtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0Q29ubmVjdGlvblR5cGVzJywgSlNPTi5zdHJpbmdpZnkoYWN0cykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICBsZXQgYXNzZXRJbmRleCA9IHRoaXMuc3RhdGUuQXNzZXRJbmRleDtcclxuICAgICAgICAvLyBNYWtlIHN1cmUgY3VycmVudFN0ZXAgaXMgc2V0IHRvIHNvbWV0aGluZyByZWFzb25hYmxlXHJcbiAgICAgICAgaWYgKGFzc2V0SW5kZXggPj0gdGhpcy5wcm9wcy5Bc3NldHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBhc3NldEluZGV4ID0gdGhpcy5wcm9wcy5Bc3NldHMubGVuZ3RoIC0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhc3NldEluZGV4ID0gYXNzZXRJbmRleCArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgQXNzZXRJbmRleDogYXNzZXRJbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXYoKSB7XHJcbiAgICAgICAgbGV0IGFzc2V0SW5kZXggPSB0aGlzLnN0YXRlLkFzc2V0SW5kZXg7XHJcbiAgICAgICAgaWYgKGFzc2V0SW5kZXggPD0gMCkge1xyXG4gICAgICAgICAgICBhc3NldEluZGV4ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhc3NldEluZGV4ID0gYXNzZXRJbmRleCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgQXNzZXRJbmRleDogYXNzZXRJbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEFzc2V0Q29ubmVjdGlvbigpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBc3NldENvbm5lY3Rpb24oYWM6IE9wZW5YREEuQXNzZXRDb25uZWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiA9IF8uY2xvbmUodGhpcy5wcm9wcy5Bc3NldENvbm5lY3Rpb25zKTtcclxuICAgICAgICBsZXQgaW5kZXggPSBsaXN0LmZpbmRJbmRleChhID0+IGEgPT0gYWMpO1xyXG4gICAgICAgIGxldCByZWNvcmQ6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiA9IGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQXNzZXRDb25uZWN0aW9uczogbGlzdCB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRBc3NldCA9IHRoaXMucHJvcHMuQXNzZXRzW3RoaXMuc3RhdGUuQXNzZXRJbmRleF1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17eyBtYXJnaW46IC0yMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI4NSwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyODUsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAwLCBtYXJnaW46IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5Bc3NldHMubWFwKChhc3NldCwgaW5kZXgpID0+IDxsaSBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogKGluZGV4IDw9IHRoaXMuc3RhdGUuQXNzZXRJbmRleCA/ICdsaW5lLXRocm91Z2gnIDogbnVsbCkgfX0ga2V5PXtpbmRleH0+e2Fzc2V0LkFzc2V0S2V5fTwvbGk+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCIgc3R5bGU9e3sgcGFkZGluZzogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3sgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIGRhdGEtdG9nZ2xlPSdtb2RhbCcgZGF0YS10YXJnZXQ9JyNuZXdDb25uZWN0aW9uJyBkaXNhYmxlZD17dGhpcy5wcm9wcy5Bc3NldHMubGVuZ3RoIDw9IDF9PkFkZCBDb25uZWN0aW9uPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+e2N1cnJlbnRBc3NldC5Bc3NldEtleX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiIHN0eWxlPXt7b3ZlcmZsb3dZOidzY3JvbGwnLCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDQxNX19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkFzc2V0PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+VHlwZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNvbm5lY3Rpb248L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuQXNzZXRDb25uZWN0aW9ucy5maWx0ZXIoIGFjID0+IGFjLlBhcmVudCA9PSBjdXJyZW50QXNzZXQuQXNzZXRLZXkgIHx8IGFjLkNoaWxkID09IGN1cnJlbnRBc3NldC5Bc3NldEtleSkubWFwKChhYzogT3BlblhEQS5Bc3NldENvbm5lY3Rpb24sIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvbkFzc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWMuUGFyZW50ID09IGN1cnJlbnRBc3NldC5Bc3NldEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbkFzc2V0ID0gdGhpcy5wcm9wcy5Bc3NldHMuZmluZChhc3NldCA9PiBhc3NldC5Bc3NldEtleSA9PSBhYy5DaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbkFzc2V0ID0gdGhpcy5wcm9wcy5Bc3NldHMuZmluZChhc3NldCA9PiBhc3NldC5Bc3NldEtleSA9PSBhYy5QYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gdGhpcy5zdGF0ZS5Bc3NldENvbm5lY3Rpb25UeXBlcy5maW5kKGFjdCA9PiBhY3QuSUQgPT0gYWMuQXNzZXRSZWxhdGlvbnNoaXBUeXBlSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+e2Nvbm5lY3Rpb25Bc3NldC5Bc3NldEtleX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzIwJScgfX0+e2Nvbm5lY3Rpb25Bc3NldC5Bc3NldFR5cGV9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICc1MCUnIH19Pntjb25uZWN0aW9uVHlwZSAhPSB1bmRlZmluZWQgPyBjb25uZWN0aW9uVHlwZS5OYW1lIDogJyd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5kZWxldGVBc3NldENvbm5lY3Rpb24oYWMpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1sZWZ0XCIgb25DbGljaz17dGhpcy5wcmV2fSBoaWRkZW49e2ZhbHNlfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5Bc3NldEluZGV4IDwgMX0+UHJldjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXt0aGlzLm5leHR9IGRpc2FibGVkPXt0aGlzLnN0YXRlLkFzc2V0SW5kZXggPT0gdGhpcy5wcm9wcy5Bc3NldHMubGVuZ3RoIC0gMX0+TmV4dDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbFwiIGlkPVwibmV3Q29ubmVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj5BZGQgYSBDb25uZWN0aW9uIHRvIHtjdXJyZW50QXNzZXQuQXNzZXRLZXl9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBDb25uZWN0aW5nIEFzc2V0PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCByZWY9J2Fzc2V0Q29ubmVjdGlvbicgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5Bc3NldHMuZmlsdGVyKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5ICE9IGN1cnJlbnRBc3NldC5Bc3NldEtleSkubWFwKChhc3NldCwgaW5kZXgpID0+IDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2Fzc2V0LkFzc2V0S2V5fSA+e2Fzc2V0LkFzc2V0S2V5fTwvb3B0aW9uPilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5TZWxlY3QgQ29ubmVjdGlvbiBUeXBlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCByZWY9J2Fzc2V0Q29ubmVjdGlvblR5cGUnIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuQXNzZXRDb25uZWN0aW9uVHlwZXMubWFwKChhY3QsIGluZGV4KSA9PiA8b3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXthY3QuSUR9ID57YWN0Lk5hbWV9PC9vcHRpb24+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbkNsaWNrPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZENvbm5lY3Rpb24gPSAkKHRoaXMucmVmcy5hc3NldENvbm5lY3Rpb24pLnZhbCgpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbm5lY3Rpb25UeXBlID0gcGFyc2VJbnQoJCh0aGlzLnJlZnMuYXNzZXRDb25uZWN0aW9uVHlwZSkudmFsKCkgYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPiA9IF8uY2xvbmUodGhpcy5wcm9wcy5Bc3NldENvbm5lY3Rpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRDb25uZWN0aW9ucy5wdXNoKHsgSUQ6IDAsIEFzc2V0UmVsYXRpb25zaGlwVHlwZUlEOiBjb25uZWN0aW9uVHlwZSwgUGFyZW50OiBjdXJyZW50QXNzZXQuQXNzZXRLZXksIENoaWxkOiBjaGlsZENvbm5lY3Rpb24gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldENvbm5lY3Rpb25zOiBhc3NldENvbm5lY3Rpb25zfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSA+U2F2ZTwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2xvc2U8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9