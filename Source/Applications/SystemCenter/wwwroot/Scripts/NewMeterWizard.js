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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UUy9DRkdQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9OZXdNZXRlcldpemFyZC9OZXdNZXRlcldpemFyZC50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9OZXdNZXRlcldpemFyZC9QYWdlMS50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9OZXdNZXRlcldpemFyZC9QYWdlMi50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9OZXdNZXRlcldpemFyZC9QYWdlMy50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9OZXdNZXRlcldpemFyZC9QYWdlNC50c3giLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9OZXdNZXRlcldpemFyZC9QYWdlNS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLHdCQUF3QjtBQUN4QixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHO0FBSXhHO0lBSUksbUJBQVksUUFBZ0IsRUFBRSxRQUFnQjtRQUE5QyxpQkFRQztRQVBHLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO1FBQ3ZELElBQUksWUFBWSxH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QUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFFbEcsT0FBTyxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLLENBQUM7U0FDNUM7YUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRTtZQUNsQyxJQUFJLEdBQUcsR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbFAsSUFBSSxJQUFJLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUNyRyxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO1lBQ2pFLElBQUksU0FBUyxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7WUFFbkUsT0FBTyxHQUFHLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxTQUFTLENBQUM7U0FDL0M7YUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2FBQ3RDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxX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UUFBUSxFQUFDLFNBQVMsRUFBQyxnQkFBZ0Isa0JBQWMsT0FBTyxZQUFlLENBQ2xGLENBRUosQ0FDSixDQUVKLENBQ1AsQ0FDTixDQUFDO0lBQ04sQ0FBQztJQUVMLFlBQUM7QUFBRCxDQUFDLENBdExrQywrQ0FBZSxHQXNMakQiLCJmaWxlIjoiTmV3TWV0ZXJXaXphcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQ0ZHUGFyc2VyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wNy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gXCIuLi9UU1gvU3lzdGVtQ2VudGVyL2dsb2JhbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ0ZHUGFyc2VyIHtcclxuICAgIEFuYWxvZ3M6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD47XHJcbiAgICBEaWdpdGFsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPjtcclxuICAgIENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+O1xyXG4gICAgY29uc3RydWN0b3IoY29udGVudHM6IHN0cmluZywgbWV0ZXJLZXk6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkYXRhID0gY29udGVudHMuc3BsaXQoJ1xcbicpLm1hcChhID0+IGEuc3BsaXQoJywnKSk7XHJcbiAgICAgICAgbGV0IGFuYWxvZ0NvdW50cyA9IHBhcnNlSW50KGRhdGFbMV1bMV0uc2xpY2UoMCwgZGF0YVsxXVsxXS5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgbGV0IGRpZ2l0YWxDb3VudHMgPSBwYXJzZUludChkYXRhWzFdWzJdLnNsaWNlKDAsIGRhdGFbMV1bMl0ubGVuZ3RoIC0gMSkpO1xyXG5cclxuICAgICAgICB0aGlzLkFuYWxvZ3MgPSBkYXRhLnNsaWNlKDIsIGFuYWxvZ0NvdW50cyArIDIpLm1hcCgoYTogQXJyYXk8c3RyaW5nPiwgaW5kZXgpID0+IHsgcmV0dXJuIHsgSUQ6IGluZGV4LCBNZXRlcjogbWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiB0aGlzLnBhcnNlVHlwZShhWzRdKSwgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogdGhpcy5wYXJzZVBoYXNlKGFbMl0pLCBOYW1lOiBhWzFdLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogYVszXSwgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiBhWzBdIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwgfSk7XHJcbiAgICAgICAgdGhpcy5EaWdpdGFscyA9IGRhdGEuc2xpY2UoMiArIGFuYWxvZ0NvdW50cywgMiArIGFuYWxvZ0NvdW50cyArIGRpZ2l0YWxDb3VudHMpLm1hcCgoYTogQXJyYXk8c3RyaW5nPiwgaW5kZXgpID0+IHsgcmV0dXJuIHsgSUQ6IGFuYWxvZ0NvdW50cytpbmRleCwgTWV0ZXI6IG1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0RpZ2l0YWwnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiB0aGlzLnBhcnNlUGhhc2UoYVsyXSksIE5hbWU6IGFbMV0sIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiBhWzNdLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6IGFbMF0gfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCB9KVxyXG4gICAgICAgIHRoaXMuQ2hhbm5lbHMgPSB0aGlzLkFuYWxvZ3MuY29uY2F0KHRoaXMuRGlnaXRhbHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlUGhhc2UodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDAgJiYgdmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMClcclxuICAgICAgICAgICAgcmV0dXJuICdBQic7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdiJykgPj0gMCAmJiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gJ0JDJztcclxuICAgICAgICBlbHNlIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2MnKSA+PSAwICYmIHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ0EnO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYScpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQU4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQk4nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYycpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnQ04nO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignbicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnTkcnO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuICdOb25lJztcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZVR5cGUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndicpID49IDApXHJcbiAgICAgICAgICAgIHJldHVybiAnVm9sdGFnZSc7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gJ0N1cnJlbnQnO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE5ld01ldGVyV2l6YXJkLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgUGFnZTEgZnJvbSAnLi9QYWdlMSc7XHJcbmltcG9ydCBQYWdlMiBmcm9tICcuL1BhZ2UyJztcclxuaW1wb3J0IFBhZ2UzIGZyb20gJy4vUGFnZTMnO1xyXG5pbXBvcnQgUGFnZTQgZnJvbSAnLi9QYWdlNCc7XHJcbmltcG9ydCBQYWdlNSBmcm9tICcuL1BhZ2U1JztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcbmV4cG9ydCBpbnRlcmZhY2UgQXNzZXRMaXN0cyB7XHJcbiAgICBCcmVha2VyczogQXJyYXk8T3BlblhEQS5CcmVha2VyPixcclxuICAgIEJ1c2VzOiBBcnJheTxPcGVuWERBLkJyZWFrZXI+LFxyXG4gICAgQ2FwQmFua3M6IEFycmF5PE9wZW5YREEuQ2FwQmFuaz4sXHJcbiAgICBMaW5lczogQXJyYXk8T3BlblhEQS5MaW5lPixcclxuICAgIFRyYW5zZm9ybWVyczogQXJyYXk8T3BlblhEQS5UcmFuc2Zvcm1lcj5cclxufVxyXG5cclxuaW50ZXJmYWNlIFdpemFyZFN0YXRlIHtcclxuICAgIGN1cnJlbnRTdGVwOiBudW1iZXIsXHJcbiAgICBNZXRlckluZm86IE9wZW5YREEuTWV0ZXIsXHJcbiAgICBMb2NhdGlvbkluZm86IE9wZW5YREEuTG9jYXRpb24sXHJcbiAgICBDaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPixcclxuICAgIEFzc2V0czogQXJyYXk8T3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLlRyYW5zZm9ybWVyPixcclxuICAgIEFzc2V0Q29ubmVjdGlvbnM6IEFycmF5PE9wZW5YREEuQXNzZXRDb25uZWN0aW9uPixcclxuICAgIE1ldGVyS2V5czogQXJyYXk8c3RyaW5nPixcclxuICAgIExvY2F0aW9uS2V5czogQXJyYXk8c3RyaW5nPlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdNZXRlcldpemFyZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7fSwgV2l6YXJkU3RhdGUsIHt9PntcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBjdXJyZW50U3RlcDogdGhpcy5nZXRDdXJyZW50U3RlcCgpLCBcclxuICAgICAgICAgICAgTWV0ZXJJbmZvOiB0aGlzLmdldE1ldGVySW5mbygpLFxyXG4gICAgICAgICAgICBMb2NhdGlvbkluZm86IHRoaXMuZ2V0TG9jYXRpb25JbmZvKCkgLFxyXG4gICAgICAgICAgICBDaGFubmVsczogdGhpcy5nZXRDaGFubmVscygpLFxyXG4gICAgICAgICAgICBBc3NldHM6IHRoaXMuZ2V0QXNzZXRzKCksXHJcbiAgICAgICAgICAgIEFzc2V0Q29ubmVjdGlvbnM6IHRoaXMuZ2V0QXNzZXRDb25uZWN0aW9ucygpLFxyXG4gICAgICAgICAgICBNZXRlcktleXM6IFtdLFxyXG4gICAgICAgICAgICBMb2NhdGlvbktleXM6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5wcmV2LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jbGVhckRhdGEgPSB0aGlzLmNsZWFyRGF0YS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSB0aGlzLnVwZGF0ZVN0YXRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5nZXRIZWFkZXIgPSB0aGlzLmdldEhlYWRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZU5leHQgPSB0aGlzLmRpc2FibGVOZXh0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGROZXdNZXRlciA9IHRoaXMuYWRkTmV3TWV0ZXIuYmluZCh0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRNZXRlcktleXMoKTtcclxuICAgICAgICB0aGlzLmdldExvY2F0aW9uS2V5cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudFN0ZXAoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAxXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldE1ldGVySW5mbygpOiBPcGVuWERBLk1ldGVyIHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5NZXRlckluZm8nKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycpKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIElEOiAwLFxyXG4gICAgICAgICAgICAgICAgQXNzZXRLZXk6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBOYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgU2hvcnROYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgQWxpYXM6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBNYWtlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTW9kZWw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBUaW1lWm9uZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTG9jYXRpb25JRDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG9jYXRpb25JbmZvKCk6IE9wZW5YREEuTG9jYXRpb24ge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25JbmZvJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgSUQ6IDAsXHJcbiAgICAgICAgICAgICAgICBMb2NhdGlvbktleTogbnVsbCxcclxuICAgICAgICAgICAgICAgIE5hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBBbGlhczogbnVsbCxcclxuICAgICAgICAgICAgICAgIFNob3J0TmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIExhdGl0dWRlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgTG9uZ2l0dWRlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgRGVzY3JpcHRpb246IG51bGwsXHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFubmVscygpOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+IHtcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5DaGFubmVscycpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBc3NldHMoKTogQXJyYXk8T3BlblhEQS5CcmVha2VyIHwgT3BlblhEQS5CdXMgfCBPcGVuWERBLkNhcEJhbmsgfCBPcGVuWERBLkxpbmUgfCBPcGVuWERBLlRyYW5zZm9ybWVyPlxyXG4gICAge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpKVxyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXNzZXRDb25uZWN0aW9ucygpOiBBcnJheTxPcGVuWERBLkFzc2V0Q29ubmVjdGlvbj4ge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkFzc2V0Q29ubmVjdGlvbnMnKSlcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0Q29ubmVjdGlvbnMnKSlcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNZXRlcktleXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5NZXRlcktleXMnKSlcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE1ldGVyS2V5czogSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlcktleXMnKSkgfSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXJgLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICAgICAgfSkuZG9uZSgobWV0ZXJzOiBBcnJheTxPcGVuWERBLk1ldGVyPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBtZXRlcnMubWFwKGEgPT4gYS5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBNZXRlcktleXM6IGtleXMgfSk7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlcktleXMnLCBKU09OLnN0cmluZ2lmeShrZXlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExvY2F0aW9uS2V5cygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uS2V5cycpKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb25LZXlzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uS2V5cycpKSB9KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Mb2NhdGlvbmAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5kb25lKChtbHM6IEFycmF5PE9wZW5YREEuTG9jYXRpb24+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIga2V5cyA9IG1scy5tYXAoYSA9PiBhLkxvY2F0aW9uS2V5LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IExvY2F0aW9uS2V5czoga2V5c30pO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTG9jYXRpb25LZXlzJywgSlNPTi5zdHJpbmdpZnkoa2V5cykpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZE5ld01ldGVyKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50Pik6IHZvaWQge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyL05ld2AsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgTWV0ZXJJbmZvOiB0aGlzLnN0YXRlLk1ldGVySW5mbyxcclxuICAgICAgICAgICAgICAgIExvY2F0aW9uSW5mbzogdGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm8sXHJcbiAgICAgICAgICAgICAgICBDaGFubmVsczogdGhpcy5zdGF0ZS5DaGFubmVscyxcclxuICAgICAgICAgICAgICAgIEFzc2V0czogdGhpcy5zdGF0ZS5Bc3NldHMsXHJcbiAgICAgICAgICAgICAgICBBc3NldENvbm5lY3Rpb25zOiB0aGlzLnN0YXRlLkFzc2V0Q29ubmVjdGlvbnNcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbD9uYW1lPU1ldGVycyc7XHJcbiAgICAgICAgfSkuZmFpbChtc2cgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PSA1MDApXHJcbiAgICAgICAgICAgICAgICBhbGVydChtc2cucmVzcG9uc2VKU09OLkV4Y2VwdGlvbk1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaG9tZVBhdGggKyAnaW5kZXguY3NodG1sP25hbWU9TWV0ZXJzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTdGVwID0gdGhpcy5zdGF0ZS5jdXJyZW50U3RlcDtcclxuICAgICAgICAvLyBNYWtlIHN1cmUgY3VycmVudFN0ZXAgaXMgc2V0IHRvIHNvbWV0aGluZyByZWFzb25hYmxlXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwID49IDQpIHtcclxuICAgICAgICAgICAgY3VycmVudFN0ZXAgPSA1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwID0gY3VycmVudFN0ZXAgKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJywgY3VycmVudFN0ZXAudG9TdHJpbmcoKSlcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgY3VycmVudFN0ZXA6IGN1cnJlbnRTdGVwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJldigpIHtcclxuICAgICAgICBsZXQgY3VycmVudFN0ZXAgPSB0aGlzLnN0YXRlLmN1cnJlbnRTdGVwO1xyXG4gICAgICAgIGlmIChjdXJyZW50U3RlcCA8PSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXJyZW50U3RlcCA9IGN1cnJlbnRTdGVwIC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5DdXJyZW50U3RlcCcsIGN1cnJlbnRTdGVwLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTdGVwOiBjdXJyZW50U3RlcFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVN0YXRlKHN0YXRlKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZS5oYXNPd25Qcm9wZXJ0eSgnTWV0ZXJJbmZvJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5NZXRlckluZm8nLCBKU09OLnN0cmluZ2lmeShzdGF0ZS5NZXRlckluZm8pKVxyXG4gICAgICAgIGlmIChzdGF0ZS5oYXNPd25Qcm9wZXJ0eSgnTG9jYXRpb25JbmZvJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nLCBKU09OLnN0cmluZ2lmeShzdGF0ZS5Mb2NhdGlvbkluZm8pKVxyXG4gICAgICAgIGlmIChzdGF0ZS5oYXNPd25Qcm9wZXJ0eSgnQ2hhbm5lbHMnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkNoYW5uZWxzJywgSlNPTi5zdHJpbmdpZnkoc3RhdGUuQ2hhbm5lbHMpKVxyXG4gICAgICAgIGlmIChzdGF0ZS5oYXNPd25Qcm9wZXJ0eSgnQXNzZXRzJykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5Bc3NldHMnLCBKU09OLnN0cmluZ2lmeShzdGF0ZS5Bc3NldHMpKVxyXG4gICAgICAgIGlmIChzdGF0ZS5oYXNPd25Qcm9wZXJ0eSgnQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycsIEpTT04uc3RyaW5naWZ5KHN0YXRlLkFzc2V0Q29ubmVjdGlvbnMpKVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckRhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhckxvY2FsU3RvcmFnZSgpO1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBNZXRlckluZm86IHRoaXMuZ2V0TWV0ZXJJbmZvKCksIExvY2F0aW9uSW5mbzogdGhpcy5nZXRMb2NhdGlvbkluZm8oKSwgQ2hhbm5lbHM6IHRoaXMuZ2V0Q2hhbm5lbHMoKSwgY3VycmVudFN0ZXA6IHRoaXMuZ2V0Q3VycmVudFN0ZXAoKSwgQXNzZXRzOiB0aGlzLmdldEFzc2V0cygpIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyTG9jYWxTdG9yYWdlKCkge1xyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLk1ldGVySW5mbycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJJbmZvJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Mb2NhdGlvbkluZm8nKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkxvY2F0aW9uSW5mbycpXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ2hhbm5lbHMnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkNoYW5uZWxzJylcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KCdOZXdNZXRlcldpemFyZC5Bc3NldHMnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9ucycpXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQ3VycmVudFN0ZXAnKSlcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ05ld01ldGVyV2l6YXJkLkN1cnJlbnRTdGVwJylcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVhZGVyKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAxKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDE6IEdlbmVyYWwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG5ldyBtZXRlclwiXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAyKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDI6IFN1YnN0YXRpb24gaW5mb3JtYXRpb24gZm9yIHRoZSBuZXcgbWV0ZXJcIlxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gMylcclxuICAgICAgICAgICAgcmV0dXJuIFwiU3RlcCAzOiBQb3B1bGF0ZSBjaGFubmVscyBmb3IgdGhlIG5ldyBtZXRlclwiXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSA0KVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDQ6IFBvcHVsYXRlIGFzc2V0cyBtb25pdG9yZWQgYnkgdGhlIG5ldyBtZXRlclwiXHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSA1KVxyXG4gICAgICAgICAgICByZXR1cm4gXCJTdGVwIDU6IEFkZCBjb25uZWN0aW9uIGJldHdlZW4gdGhlIGFzc2V0cyB0aGF0IGFyZSBtb25pdG9yZWQgYnkgdGhlIG5ldyBtZXRlclwiXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFBhZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIDxQYWdlMSBNZXRlckluZm89e3RoaXMuc3RhdGUuTWV0ZXJJbmZvfSBVcGRhdGVTdGF0ZT17KG1ldGVyKSA9PiB0aGlzLnVwZGF0ZVN0YXRlKHtNZXRlckluZm86IG1ldGVyfSl9IC8+XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAyKVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2UyIExvY2F0aW9uSW5mbz17dGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm99IFVwZGF0ZVN0YXRlPXt0aGlzLnVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFN0ZXAgPT0gMylcclxuICAgICAgICAgICAgcmV0dXJuIDxQYWdlMyBNZXRlcktleT17dGhpcy5zdGF0ZS5NZXRlckluZm8uQXNzZXRLZXl9IENoYW5uZWxzPXt0aGlzLnN0YXRlLkNoYW5uZWxzfSBVcGRhdGVTdGF0ZT17dGhpcy51cGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDQpXHJcbiAgICAgICAgICAgIHJldHVybiA8UGFnZTQgQXNzZXRDb25uZWN0aW9ucz17dGhpcy5zdGF0ZS5Bc3NldENvbm5lY3Rpb25zfSBDaGFubmVscz17dGhpcy5zdGF0ZS5DaGFubmVsc30gQXNzZXRzPXt0aGlzLnN0YXRlLkFzc2V0c30gVXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSA1KVxyXG4gICAgICAgICAgICByZXR1cm4gPFBhZ2U1IEFzc2V0cz17dGhpcy5zdGF0ZS5Bc3NldHN9IEFzc2V0Q29ubmVjdGlvbnM9e3RoaXMuc3RhdGUuQXNzZXRDb25uZWN0aW9uc30gVXBkYXRlU3RhdGU9e3RoaXMudXBkYXRlU3RhdGV9IC8+XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVOZXh0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDEpIHtcclxuICAgICAgICAgICAgdmFyIGFzc2V0S2V5OiBib29sZWFuID0gdGhpcy5zdGF0ZS5NZXRlckluZm8uQXNzZXRLZXkgPT0gbnVsbCB8fCB0aGlzLnN0YXRlLk1ldGVySW5mby5Bc3NldEtleS5sZW5ndGggPT0gMCB8fCB0aGlzLnN0YXRlLk1ldGVyS2V5cy5pbmRleE9mKHRoaXMuc3RhdGUuTWV0ZXJJbmZvLkFzc2V0S2V5LnRvTG93ZXJDYXNlKCkpID49IDA7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBib29sZWFuID0gdGhpcy5zdGF0ZS5NZXRlckluZm8uTmFtZSA9PSBudWxsIHx8IHRoaXMuc3RhdGUuTWV0ZXJJbmZvLk5hbWUubGVuZ3RoID09IDA7XHJcbiAgICAgICAgICAgIHZhciBtYWtlOiBib29sZWFuID0gdGhpcy5zdGF0ZS5NZXRlckluZm8uTWFrZSA9PSBudWxsIHx8IHRoaXMuc3RhdGUuTWV0ZXJJbmZvLk1ha2UubGVuZ3RoID09IDA7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogYm9vbGVhbiA9IHRoaXMuc3RhdGUuTWV0ZXJJbmZvLk1vZGVsID09IG51bGwgfHwgdGhpcy5zdGF0ZS5NZXRlckluZm8uTW9kZWwubGVuZ3RoID09IDA7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYXNzZXRLZXkgfHwgbmFtZSB8fCBtYWtlIHx8IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDIpIHtcclxuICAgICAgICAgICAgdmFyIGtleTogYm9vbGVhbiA9IHRoaXMuc3RhdGUuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5ID09IG51bGwgfHwgdGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkubGVuZ3RoID09IDAgfHwgKHRoaXMuc3RhdGUuTG9jYXRpb25LZXlzLmluZGV4T2YodGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm8uTG9jYXRpb25LZXkudG9Mb3dlckNhc2UoKSkgPj0gMCAmJiB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5JRCA9PSAwKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IGJvb2xlYW4gPSB0aGlzLnN0YXRlLkxvY2F0aW9uSW5mby5OYW1lID09IG51bGwgfHwgdGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm8uTmFtZS5sZW5ndGggPT0gMDtcclxuICAgICAgICAgICAgdmFyIGxhdGl0dWRlOiBib29sZWFuID0gdGhpcy5zdGF0ZS5Mb2NhdGlvbkluZm8uTGF0aXR1ZGUgPT0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGxvbmdpdHVkZTogYm9vbGVhbiA9IHRoaXMuc3RhdGUuTG9jYXRpb25JbmZvLkxvbmdpdHVkZSA9PSBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGtleSB8fCBuYW1lIHx8IGxhdGl0dWRlIHx8IGxvbmdpdHVkZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA9PSAzKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5DaGFubmVscy5sZW5ndGggPT0gMDtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRTdGVwID09IDQpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLkFzc2V0cy5sZW5ndGggPT0gMDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7cGFkZGluZzogMTAsIGhlaWdodDogJ2luaGVyaXQnLCBvdmVyZmxvd1k6ICdoaWRkZW4nfX0+XHJcbiAgICAgICAgICAgICAgICA8aDI+TmV3IE1ldGVyIFdpemFyZDwvaDI+XHJcbiAgICAgICAgICAgICAgICA8aHIvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3toZWlnaHQ6ICdjYWxjKDEwMCUgLSA3NXB4KSd9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXt0aGlzLmNsZWFyRGF0YX0gPkNsZWFyIERhdGE8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IHN0eWxlPXt7d2lkdGg6ICc5MCUnfX0+e3RoaXMuZ2V0SGVhZGVyKCl9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiIHN0eWxlPXt7bWF4SGVpZ2h0OiAnY2FsYygxMDAlIC0gMTI2cHgpJ319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRQYWdlKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLWxlZnRcIiBvbkNsaWNrPXt0aGlzLnByZXZ9IGhpZGRlbj17dGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA8PSAxfT5QcmV2PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiBvbkNsaWNrPXt0aGlzLm5leHR9IGhpZGRlbj17dGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA+PSA1fSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5jdXJyZW50U3RlcCA+PSA1IHx8IHRoaXMuZGlzYWJsZU5leHQoKX0+TmV4dDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17dGhpcy5hZGROZXdNZXRlcn0gaGlkZGVuPXt0aGlzLnN0YXRlLmN1cnJlbnRTdGVwIDwgNX0+U3VibWl0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTEudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEZvcm1JbnB1dCBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1JbnB1dCc7XHJcbmltcG9ydCBGb3JtVGV4dEFyZWEgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtVGV4dEFyZWEnO1xyXG5cclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2UxIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgTWV0ZXJJbmZvOiBPcGVuWERBLk1ldGVyLCBVcGRhdGVTdGF0ZTogKHJlY29yZDogT3BlblhEQS5NZXRlcikgPT4gdm9pZCB9LCB7IFRpbWVab25lczogQXJyYXk8U3lzdGVtQ2VudGVyLlZhbHVlTGlzdEl0ZW0+LCBNZXRlcktleXM6IEFycmF5PHN0cmluZz4gfSwge30+e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgVGltZVpvbmVzOiBbXSxcclxuICAgICAgICAgICAgTWV0ZXJLZXlzOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy52YWxpZCA9IHRoaXMudmFsaWQuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmdldE1ldGVyS2V5cygpO1xyXG4gICAgICAgIHRoaXMuZ2V0VGltZVpvbmVzKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRUaW1lWm9uZXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdTeXN0ZW1DZW50ZXIuVGltZVpvbmVzJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBUaW1lWm9uZXM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnU3lzdGVtQ2VudGVyLlRpbWVab25lcycpKSB9KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvVmFsdWVMaXN0L0dyb3VwL1RpbWVab25lc2AsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5kb25lKCh0enM6IEFycmF5PFN5c3RlbUNlbnRlci5WYWx1ZUxpc3RJdGVtPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFRpbWVab25lczogdHpzIH0pO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnU3lzdGVtQ2VudGVyLlRpbWVab25lcycsIEpTT04uc3RyaW5naWZ5KHR6cykpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWV0ZXJLZXlzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJLZXlzJykpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBNZXRlcktleXM6IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJLZXlzJykpIH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyYCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKG1ldGVyczogQXJyYXk8T3BlblhEQS5NZXRlcj4pID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gbWV0ZXJzLm1hcChhID0+IGEuQXNzZXRLZXkudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTWV0ZXJLZXlzOiBrZXlzIH0pO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuTWV0ZXJLZXlzJywgSlNPTi5zdHJpbmdpZnkoa2V5cykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLk1ldGVyKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnQXNzZXRLZXknKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5NZXRlckluZm8uQXNzZXRLZXkgIT0gbnVsbCAmJiB0aGlzLnN0YXRlLk1ldGVyS2V5cy5pbmRleE9mKHRoaXMucHJvcHMuTWV0ZXJJbmZvLkFzc2V0S2V5LnRvTG93ZXJDYXNlKCkpIDwgMCAmJnRoaXMucHJvcHMuTWV0ZXJJbmZvLkFzc2V0S2V5Lmxlbmd0aCA+IDAgJiYgdGhpcy5wcm9wcy5NZXRlckluZm8uQXNzZXRLZXkubGVuZ3RoIDw9IDUwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdOYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTWV0ZXJJbmZvLk5hbWUgIT0gbnVsbCAmJiB0aGlzLnByb3BzLk1ldGVySW5mby5OYW1lLmxlbmd0aCA+IDAgJiYgdGhpcy5wcm9wcy5NZXRlckluZm8uTmFtZS5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdBbGlhcycpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLk1ldGVySW5mby5BbGlhcyA9PSBudWxsIHx8IHRoaXMucHJvcHMuTWV0ZXJJbmZvLkFsaWFzLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ1Nob3J0TmFtZScpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLk1ldGVySW5mby5TaG9ydE5hbWUgPT0gbnVsbCB8fCB0aGlzLnByb3BzLk1ldGVySW5mby5TaG9ydE5hbWUubGVuZ3RoIDw9IDUwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdNYWtlJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTWV0ZXJJbmZvLk1ha2UgIT0gbnVsbCAmJiB0aGlzLnByb3BzLk1ldGVySW5mby5NYWtlLmxlbmd0aCA+IDAgJiYgdGhpcy5wcm9wcy5NZXRlckluZm8uTWFrZS5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdNb2RlbCcpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLk1ldGVySW5mby5Nb2RlbCAhPSBudWxsICYmIHRoaXMucHJvcHMuTWV0ZXJJbmZvLk1vZGVsLmxlbmd0aCA+IDAgJiYgdGhpcy5wcm9wcy5NZXRlckluZm8uTW9kZWwubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnRGVzY3JpcHRpb24nKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXt0aGlzLnByb3BzLk1ldGVySW5mb30gRmllbGQ9eydBc3NldEtleSd9IEZlZWRiYWNrPXsnQSB1bmlxdWUga2V5IG9mIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9e3RoaXMucHJvcHMuVXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3RoaXMucHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMgYW5kIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9e3RoaXMucHJvcHMuVXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3RoaXMucHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J1Nob3J0TmFtZSd9IEZlZWRiYWNrPXsnU2hvcnROYW1lIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy5wcm9wcy5VcGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17dGhpcy5wcm9wcy5NZXRlckluZm99IEZpZWxkPXsnQWxpYXMnfSBGZWVkYmFjaz17J0FsaWFzIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9e3RoaXMucHJvcHMuVXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3RoaXMucHJvcHMuTWV0ZXJJbmZvfSBGaWVsZD17J01ha2UnfSBGZWVkYmFjaz17J01ha2UgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3RoaXMudmFsaWR9IFNldHRlcj17dGhpcy5wcm9wcy5VcGRhdGVTdGF0ZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17dGhpcy5wcm9wcy5NZXRlckluZm99IEZpZWxkPXsnTW9kZWwnfSBGZWVkYmFjaz17J01vZGVsIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt0aGlzLnZhbGlkfSBTZXR0ZXI9e3RoaXMucHJvcHMuVXBkYXRlU3RhdGV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5UaW1lIFpvbmU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnByb3BzLk1ldGVySW5mbyA9PSBudWxsIHx8IHRoaXMucHJvcHMuTWV0ZXJJbmZvLlRpbWVab25lID09IG51bGwgPyAnLTEnIDogdGhpcy5wcm9wcy5NZXRlckluZm8uVGltZVpvbmV9IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWV0ZXI6IE9wZW5YREEuTWV0ZXIgPSBfLmNsb25lKHRoaXMucHJvcHMuTWV0ZXJJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LnZhbHVlICE9IFwiLTFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRlci5UaW1lWm9uZSA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0ZXIuVGltZVpvbmUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZShtZXRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIi0xXCI+Tm9uZSBTZWxlY3RlZDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnN0YXRlLlRpbWVab25lcyAhPSBudWxsID8gdGhpcy5zdGF0ZS5UaW1lWm9uZXMuc29ydCgoYSwgYikgPT4gYS5Tb3J0T3JkZXIgLSBiLlNvcnRPcmRlcikubWFwKHR6ID0+IDxvcHRpb24gdmFsdWU9e3R6LlRleHR9IGtleT17dHouVGV4dH0gZGlzYWJsZWQ9eyF0ei5FbmFibGVkfSBoaWRkZW49e3R6LkhpZGRlbn0+e3R6LkFsdFRleHQxfTwvb3B0aW9uPikgOiBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybVRleHRBcmVhPE9wZW5YREEuTWV0ZXI+IFJvd3M9ezN9IFJlY29yZD17dGhpcy5wcm9wcy5NZXRlckluZm99IEZpZWxkPXsnRGVzY3JpcHRpb24nfSBWYWxpZD17dGhpcy52YWxpZH0gU2V0dGVyPXt0aGlzLnByb3BzLlVwZGF0ZVN0YXRlfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTEudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCBGb3JtSW5wdXQgZnJvbSAnLi4vQ29tbW9uQ29tcG9uZW50cy9Gb3JtSW5wdXQnO1xyXG5pbXBvcnQgQXNzZXRBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcclxuaW1wb3J0IEZvcm1UZXh0QXJlYSBmcm9tICcuLi9Db21tb25Db21wb25lbnRzL0Zvcm1UZXh0QXJlYSc7XHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlMiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IExvY2F0aW9uSW5mbzogT3BlblhEQS5Mb2NhdGlvbiwgVXBkYXRlU3RhdGU6IChyZWNvcmQpID0+IHZvaWQgfSwgeyBMb2NhdGlvbnM6IEFycmF5PE9wZW5YREEuTG9jYXRpb24+IH0sIHt9PntcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIExvY2F0aW9uczogW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWQgPSB0aGlzLnZhbGlkLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLmdldEFsbExvY2F0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRBbGxMb2NhdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdPcGVuWERBLkxvY2F0aW9ucycpKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTG9jYXRpb25zOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ09wZW5YREEuTG9jYXRpb25zJykpIH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9Mb2NhdGlvbmAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLmRvbmUoKG1sczogQXJyYXk8T3BlblhEQS5Mb2NhdGlvbj4pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBMb2NhdGlvbnM6IG1scyB9KVxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnT3BlblhEQS5Mb2NhdGlvbnMnLCBKU09OLnN0cmluZ2lmeShtbHMpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGlmZmVyZW50TWV0ZXJMb2NhdGlvbihtZXRlckxvY2F0aW9uSUQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHRoaXMuc3RhdGUuTG9jYXRpb25zLmZpbmQoKHZhbHVlLCBpbmRleCwgb2JqZWN0KSA9PiB2YWx1ZS5JRCA9PSBtZXRlckxvY2F0aW9uSUQpIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWQoZmllbGQ6IGtleW9mIChPcGVuWERBLkxvY2F0aW9uKSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSAnTG9jYXRpb25LZXknKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleSA9PSBudWxsIHx8IHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5Lmxlbmd0aCA9PSAwIHx8IHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxvY2F0aW9uS2V5Lmxlbmd0aCA+IDUwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEID09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5Mb2NhdGlvbnMuZmluZChsb2NzID0+IGxvY3MuTG9jYXRpb25LZXkudG9Mb3dlckNhc2UoKSA9PSB0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5Mb2NhdGlvbktleS50b0xvd2VyQ2FzZSgpKSA9PSBudWxsO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uTmFtZSAhPSBudWxsICYmIHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLk5hbWUubGVuZ3RoID4gMCAmJiB0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5OYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0FsaWFzJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkFsaWFzID09IG51bGwgfHwgdGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLlNob3J0TmFtZSA9PSBudWxsIHx8IHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLlNob3J0TmFtZS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xhdGl0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxhdGl0dWRlICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcih0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5MYXRpdHVkZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xvbmdpdHVkZScpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5Mb25naXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHRoaXMucHJvcHMuTG9jYXRpb25JbmZvLkxvbmdpdHVkZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBMb2NhdGlvbjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEID09IG51bGwgPyAnMCcgOiB0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5JRH0gb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LnZhbHVlICE9IFwiMFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGlmZmVyZW50TWV0ZXJMb2NhdGlvbihwYXJzZUludChldnQudGFyZ2V0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvY2F0aW9uSW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbktleTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFsaWFzOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNob3J0TmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYXRpdHVkZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvbmdpdHVkZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERlc2NyaXB0aW9uOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIwXCI+QWRkIE5ldzwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLnN0YXRlLkxvY2F0aW9ucyAhPSBudWxsID8gdGhpcy5zdGF0ZS5Mb2NhdGlvbnMubWFwKG1sID0+IDxvcHRpb24gdmFsdWU9e21sLklEfSBrZXk9e21sLklEfT57bWwuTG9jYXRpb25LZXl9PC9vcHRpb24+KSA6IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdMb2NhdGlvbktleScgTGFiZWw9J0tleScgU2V0dGVyPXsocmVjb3JkKSA9PiB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgTG9jYXRpb25JbmZvOiByZWNvcmQgfSl9IFZhbGlkPXt0aGlzLnZhbGlkfSBGZWVkYmFjaz0nQSB1bmlxdWUgS2V5IGlzIHJlcXVpcmVkIGFuZCBtdXN0IGJlIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzLicgRGlzYWJsZWQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdOYW1lJyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdOYW1lIGlzIHJlcXVpcmVkIGFuZCBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycy4nIERpc2FibGVkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1JbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nU2hvcnROYW1lJyBMYWJlbD0nU2hvcnQgTmFtZScgU2V0dGVyPXsocmVjb3JkKSA9PiB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgTG9jYXRpb25JbmZvOiByZWNvcmQgfSl9IFZhbGlkPXt0aGlzLnZhbGlkfSBGZWVkYmFjaz0nU2hvcnQgTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzLicgRGlzYWJsZWQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUlucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm99IEZpZWxkPSdBbGlhcycgU2V0dGVyPXsocmVjb3JkKSA9PiB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgTG9jYXRpb25JbmZvOiByZWNvcmQgfSl9IFZhbGlkPXt0aGlzLnZhbGlkfSBGZWVkYmFjaz0nQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJyBEaXNhYmxlZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mb30gRmllbGQ9J0xhdGl0dWRlJyBTZXR0ZXI9eyhyZWNvcmQpID0+IHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBMb2NhdGlvbkluZm86IHJlY29yZCB9KX0gVmFsaWQ9e3RoaXMudmFsaWR9IEZlZWRiYWNrPSdMYXRpdHVkZSBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJyBEaXNhYmxlZD17dGhpcy5wcm9wcy5Mb2NhdGlvbkluZm8uSUQgIT0gMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGb3JtSW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mb30gRmllbGQ9J0xvbmdpdHVkZScgU2V0dGVyPXsocmVjb3JkKSA9PiB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgTG9jYXRpb25JbmZvOiByZWNvcmQgfSl9IFZhbGlkPXt0aGlzLnZhbGlkfSBGZWVkYmFjaz0nTG9uZ2l0dWRlIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nIERpc2FibGVkPXt0aGlzLnByb3BzLkxvY2F0aW9uSW5mby5JRCAhPSAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPEZvcm1UZXh0QXJlYTxPcGVuWERBLkxvY2F0aW9uPiBSb3dzPXszfSBSZWNvcmQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvfSBGaWVsZD0nRGVzY3JpcHRpb24nIFNldHRlcj17KHJlY29yZCkgPT4gdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IExvY2F0aW9uSW5mbzogcmVjb3JkIH0pfSBWYWxpZD17dGhpcy52YWxpZH0gRmVlZGJhY2s9JycgRGlzYWJsZWQ9e3RoaXMucHJvcHMuTG9jYXRpb25JbmZvLklEICE9IDB9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFBhZ2UzLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wMy8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgQ0ZHUGFyc2VyIGZyb20gJy4uLy4uLy4uL1RTL0NGR1BhcnNlcic7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZTMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8eyBNZXRlcktleTogc3RyaW5nLCBDaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiwgVXBkYXRlU3RhdGU6IChyZWNvcmQpID0+IHZvaWQgfSwgeyBQaGFzZXM6IEFycmF5PE9wZW5YREEuUGhhc2U+LCBNZWFzdXJlbWVudFR5cGVzOiBBcnJheTxPcGVuWERBLk1lYXN1cmVtZW50VHlwZT4gfSwge30+e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgUGhhc2VzOiBbXSxcclxuICAgICAgICAgICAgTWVhc3VyZW1lbnRUeXBlczogW11cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQaGFzZXMoKTtcclxuICAgICAgICB0aGlzLmdldE1lYXN1cmVtZW50VHlwZXMoKTtcclxuXHJcbiAgICAgICAgJChcIi5jdXN0b20tZmlsZS1pbnB1dFwiKS5vbihcImNoYW5nZVwiLCAoZXZ0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gKGV2dCBhcyBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikudGFyZ2V0LnZhbHVlLnNwbGl0KFwiXFxcXFwiKS5wb3AoKTtcclxuICAgICAgICAgICAgJChldnQudGFyZ2V0KS5zaWJsaW5ncyhcIi5jdXN0b20tZmlsZS1sYWJlbFwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLmh0bWwoZmlsZU5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRTaW5nbGVGaWxlKChldnQgYXMgUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBoYXNlcygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuaGFzT3duUHJvcGVydHkoJ05ld01ldGVyV2l6YXJkLlBoYXNlcycpKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgUGhhc2VzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLlBoYXNlcycpKSB9KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9QaGFzZWAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5kb25lKChwaGFzZXM6IEFycmF5PE9wZW5YREEuUGhhc2U+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgUGhhc2VzOiBwaGFzZXMgfSlcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ05ld01ldGVyV2l6YXJkLlBoYXNlcycsIEpTT04uc3RyaW5naWZ5KHBoYXNlcykpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXRNZWFzdXJlbWVudFR5cGVzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuTWVhc3VyZW1lbnRUeXBlcycpKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTWVhc3VyZW1lbnRUeXBlczogSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdOZXdNZXRlcldpemFyZC5NZWFzdXJlbWVudFR5cGVzJykpIH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01lYXN1cmVtZW50VHlwZWAsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgICAgICB9KS5kb25lKChtZWFzdXJlbWVudFR5cGVzOiBBcnJheTxPcGVuWERBLk1lYXN1cmVtZW50VHlwZT4pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBNZWFzdXJlbWVudFR5cGVzOiBtZWFzdXJlbWVudFR5cGVzIH0pXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdOZXdNZXRlcldpemFyZC5NZWFzdXJlbWVudFR5cGVzJywgSlNPTi5zdHJpbmdpZnkobWVhc3VyZW1lbnRUeXBlcykpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVhZFNpbmdsZUZpbGUoZXZ0OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50Pikge1xyXG4gICAgICAgIC8vUmV0cmlldmUgdGhlIGZpcnN0IChhbmQgb25seSEpIEZpbGUgZnJvbSB0aGUgRmlsZUxpc3Qgb2JqZWN0XHJcbiAgICAgICAgdmFyIGYgPSBldnQudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgIGlmIChmKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICAgICAgci5vbmxvYWQgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRzID0gZS50YXJnZXQucmVzdWx0IGFzIHN0cmluZztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VyO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmLm5hbWUuaW5kZXhPZignLmNmZycpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBuZXcgQ0ZHUGFyc2VyKGNvbnRlbnRzLCB0aGlzLnByb3BzLk1ldGVyS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IHBhcnNlci5DaGFubmVscyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQXNzZXRzQ2hhbm5lbHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0ZpbGUgaXMgbm90IG9mIHR5cGUgY2ZnLiBQbGVhc2Ugb25seSB1c2UgY29tdHJhZGUgc3RhbmRhcmQgY2ZnIGZpbGVzLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHIucmVhZEFzVGV4dChmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAkKFwiLmN1c3RvbS1maWxlLWlucHV0XCIpLm9mZignY2hhbmdlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQ2hhbm5lbChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+ID0gXy5jbG9uZSh0aGlzLnByb3BzLkNoYW5uZWxzKTtcclxuICAgICAgICBsZXQgcmVjb3JkOiBPcGVuWERBLkNoYW5uZWwgPSBjaGFubmVscy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG4gICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBDaGFubmVsczogY2hhbm5lbHMgfSk7XHJcblxyXG4gICAgICAgIGlmIChyZWNvcmQuQXNzZXQgPT0gJycpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGFzc2V0czpBcnJheTxPcGVuWERBLkFzc2V0PiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0cycpKTtcclxuXHJcbiAgICAgICAgaWYgKGFzc2V0cyAhPSBudWxsICYmIGFzc2V0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBhc3NldCA9IGFzc2V0cy5maW5kKGEgPT4gYS5Bc3NldEtleSA9PSByZWNvcmQuQXNzZXQpXHJcbiAgICAgICAgICAgIGlmIChhc3NldCA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhbm5lbEluZGV4ID0gYXNzZXQuQ2hhbm5lbHMuZmluZEluZGV4KGMgPT4gYy5JRCA9IHJlY29yZC5JRCk7XHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsSW5kZXggPCAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBhc3NldC5DaGFubmVscy5zcGxpY2UoY2hhbm5lbEluZGV4LDEpXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldHM6IGFzc2V0cyB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQXNzZXRzQ2hhbm5lbHMoKTp2b2lkIHtcclxuICAgICAgICBsZXQgYXNzZXRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRzJykpO1xyXG5cclxuICAgICAgICBpZiAoYXNzZXRzICE9IG51bGwgJiYgYXNzZXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgJC5lYWNoKGFzc2V0cywgKGluZGV4LCBhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYXNzZXQuQ2hhbm5lbHMgPSBbXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IEFzc2V0czogYXNzZXRzIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMCwgTWV0ZXI6IHRoaXMucHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnVm9sdGFnZScsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdBTicsIE5hbWU6ICdWQU4nLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ1ZvbHRhZ2UgQU4nLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMSwgTWV0ZXI6IHRoaXMucHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnVm9sdGFnZScsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdCTicsIE5hbWU6ICdWQk4nLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ1ZvbHRhZ2UgQk4nLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMiwgTWV0ZXI6IHRoaXMucHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnVm9sdGFnZScsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdDTicsIE5hbWU6ICdWQ04nLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ1ZvbHRhZ2UgQ04nLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogMywgTWV0ZXI6IHRoaXMucHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnQ3VycmVudCcsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdBTicsIE5hbWU6ICdJQScsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnQ3VycmVudCBBJywgRW5hYmxlZDogdHJ1ZSwgU2VyaWVzOiB7IElEOiAwLCBDaGFubmVsSUQ6IDAsIFNlcmllc1R5cGU6ICdWYWx1ZXMnLCBTb3VyY2VJbmRleGVzOiAnJyB9IGFzIE9wZW5YREEuU2VyaWVzIH0gYXMgT3BlblhEQS5DaGFubmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgSUQ6IDQsIE1ldGVyOiB0aGlzLnByb3BzLk1ldGVyS2V5LCBBc3NldDogJycsIE1lYXN1cmVtZW50VHlwZTogJ0N1cnJlbnQnLCBNZWFzdXJlbWVudENoYXJhY3RlcmlzdGljOiAnSW5zdGFudGFuZW91cycsIFBoYXNlOiAnQk4nLCBOYW1lOiAnSUInLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ0N1cnJlbnQgQicsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IElEOiA1LCBNZXRlcjogdGhpcy5wcm9wcy5NZXRlcktleSwgQXNzZXQ6ICcnLCBNZWFzdXJlbWVudFR5cGU6ICdDdXJyZW50JywgTWVhc3VyZW1lbnRDaGFyYWN0ZXJpc3RpYzogJ0luc3RhbnRhbmVvdXMnLCBQaGFzZTogJ0NOJywgTmFtZTogJ0lDJywgU2FtcGxlc1BlckhvdXI6IDAsIFBlclVuaXRWYWx1ZTogbnVsbCwgSGFybW9uaWNHcm91cDogMCwgRGVzY3JpcHRpb246ICdDdXJyZW50IEMnLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBJRDogNiwgTWV0ZXI6IHRoaXMucHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnQ3VycmVudCcsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdORycsIE5hbWU6ICdJTicsIFNhbXBsZXNQZXJIb3VyOiAwLCBQZXJVbml0VmFsdWU6IG51bGwsIEhhcm1vbmljR3JvdXA6IDAsIERlc2NyaXB0aW9uOiAnQ3VycmVudCBORycsIEVuYWJsZWQ6IHRydWUsIFNlcmllczogeyBJRDogMCwgQ2hhbm5lbElEOiAwLCBTZXJpZXNUeXBlOiAnVmFsdWVzJywgU291cmNlSW5kZXhlczogJycgfSBhcyBPcGVuWERBLlNlcmllcyB9IGFzIE9wZW5YREEuQ2hhbm5lbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGNoYW5uZWxzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckFzc2V0c0NoYW5uZWxzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PkRlZmF1bHQgU2V0dXA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIiBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdXN0b20tZmlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGNsYXNzTmFtZT1cImN1c3RvbS1maWxlLWlucHV0XCIgcmVmPVwiY3VzdG9tRmlsZVwiIGFjY2VwdD1cIi5jZmcsLnBhclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImN1c3RvbS1maWxlLWxhYmVsXCI+Q2hvb3NlIGEgY29tdHJhZGUgc3RhbmRhcmQgY2ZnIGZpbGUgaWYgYXBwbGljYWJsZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsOiBPcGVuWERBLkNoYW5uZWwgPSB7IElEOiB0aGlzLnByb3BzLkNoYW5uZWxzLmxlbmd0aCwgTWV0ZXI6IHRoaXMucHJvcHMuTWV0ZXJLZXksIEFzc2V0OiAnJywgTWVhc3VyZW1lbnRUeXBlOiAnVm9sdGFnZScsIE1lYXN1cmVtZW50Q2hhcmFjdGVyaXN0aWM6ICdJbnN0YW50YW5lb3VzJywgUGhhc2U6ICdBTicsIE5hbWU6ICdWQU4nLCBTYW1wbGVzUGVySG91cjogMCwgUGVyVW5pdFZhbHVlOiBudWxsLCBIYXJtb25pY0dyb3VwOiAwLCBEZXNjcmlwdGlvbjogJ1ZvbHRhZ2UgQU4nLCBFbmFibGVkOiB0cnVlLCBTZXJpZXM6IHsgSUQ6IDAsIENoYW5uZWxJRDogMCwgU2VyaWVzVHlwZTogJ1ZhbHVlcycsIFNvdXJjZUluZGV4ZXM6ICcnIH0gYXMgT3BlblhEQS5TZXJpZXMgfSBhcyBPcGVuWERBLkNoYW5uZWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUodGhpcy5wcm9wcy5DaGFubmVscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVscy5wdXNoKGNoYW5uZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PkFkZCBDaGFubmVsPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogJ2NhbGMoMTAwJSAtIDM1cHgpJywgcGFkZGluZzogMzAsIG92ZXJmbG93WTogJ2F1dG8nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPkNoYW5uZWw8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+RGVzYzwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5QaGFzZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5DaGFubmVscy5tYXAoKGNoYW5uZWwsIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnICB2YWx1ZT17Y2hhbm5lbC5TZXJpZXMuU291cmNlSW5kZXhlc30gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLlNlcmllcy5Tb3VyY2VJbmRleGVzID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHtDaGFubmVsczogYXJyYXl9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT48aW5wdXQgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnIHZhbHVlPXtjaGFubmVsLk5hbWV9IG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5OYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzQ1JScgfX0+PGlucHV0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5EZXNjcmlwdGlvbn0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkRlc2NyaXB0aW9uID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+ezxzZWxlY3QgY2xhc3NOYW1lPSAnZm9ybS1jb250cm9sJyAgdmFsdWU9e2NoYW5uZWwuTWVhc3VyZW1lbnRUeXBlfSBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuTWVhc3VyZW1lbnRUeXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Pnt0aGlzLnN0YXRlLk1lYXN1cmVtZW50VHlwZXMubWFwKGEgPT4gPG9wdGlvbiBrZXk9e2EuSUR9IHZhbHVlPXthLk5hbWV9PnthLk5hbWV9PC9vcHRpb24+KX08L3NlbGVjdD59PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pns8c2VsZWN0IGNsYXNzTmFtZT0nZm9ybS1jb250cm9sJyB2YWx1ZT17Y2hhbm5lbC5QaGFzZX0gb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLlBoYXNlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQ2hhbm5lbHM6IGFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Pnt0aGlzLnN0YXRlLlBoYXNlcy5tYXAoYSA9PiA8b3B0aW9uIGtleT17YS5JRH0gdmFsdWU9e2EuTmFtZX0+e2EuTmFtZX08L29wdGlvbj4pfTwvc2VsZWN0Pn08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRlbGV0ZUNoYW5uZWwoaW5kZXgpfT48c3Bhbj48aSBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiPjwvaT48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgUGFnZTQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzAzLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IEJyZWFrZXJBdHRyaWJ1dGVzIGZyb20gJy4uL0Fzc2V0QXR0cmlidXRlL0JyZWFrZXInO1xyXG5pbXBvcnQgQnVzQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9CdXMnO1xyXG5pbXBvcnQgQ2FwQmFua0F0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQ2FwQmFuayc7XHJcbmltcG9ydCBMaW5lQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9MaW5lJztcclxuaW1wb3J0IFRyYW5zZm9ybWVyQXR0cmlidXRlcyBmcm9tICcuLi9Bc3NldEF0dHJpYnV0ZS9UcmFuc2Zvcm1lcic7XHJcbmltcG9ydCBBc3NldEF0dHJpYnV0ZXMgZnJvbSAnLi4vQXNzZXRBdHRyaWJ1dGUvQXNzZXQnO1xyXG5pbXBvcnQgeyBnZXRBc3NldFR5cGVzLCBnZXRBbGxBc3NldHMgfSBmcm9tICcuLi8uLi8uLi9UUy9TZXJ2aWNlcy9Bc3NldCc7XHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5pbnRlcmZhY2UgUGFnZTRQcm9wcyB7XHJcbiAgICBBc3NldHM6IEFycmF5PE9wZW5YREEuQnJlYWtlciB8IE9wZW5YREEuQnVzIHwgT3BlblhEQS5DYXBCYW5rIHwgT3BlblhEQS5MaW5lIHwgT3BlblhEQS5UcmFuc2Zvcm1lciB8IE9wZW5YREEuQ2FwQmFua1JlbGF5PixcclxuICAgIENoYW5uZWxzOiBBcnJheTxPcGVuWERBLkNoYW5uZWw+LFxyXG4gICAgQXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+LFxyXG4gICAgVXBkYXRlU3RhdGU6IChyZWNvcmQpID0+IHZvaWQgXHJcbn1cclxuaW50ZXJmYWNlIFBhZ2U0U3RhdGUge1xyXG4gICAgTmV3RWRpdEFzc2V0OiBPcGVuWERBLkJyZWFrZXIgfCBPcGVuWERBLkJ1cyB8IE9wZW5YREEuQ2FwQmFuayB8IE9wZW5YREEuTGluZSB8IE9wZW5YREEuVHJhbnNmb3JtZXIgfCBPcGVuWERBLkNhcEJhbmtSZWxheSxcclxuICAgIEFsbEFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4sXHJcbiAgICBBc3NldFR5cGVzOiBBcnJheTxPcGVuWERBLkFzc2V0VHlwZT4sXHJcbiAgICBOZXdFZGl0OiBTeXN0ZW1DZW50ZXIuTmV3RWRpdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlNCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQYWdlNFByb3BzLCBQYWdlNFN0YXRlLCB7fT57XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBOZXdFZGl0QXNzZXQ6IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpLFxyXG4gICAgICAgICAgICBBbGxBc3NldHM6IFtdLFxyXG4gICAgICAgICAgICBBc3NldFR5cGVzOiBbXSxcclxuICAgICAgICAgICAgTmV3RWRpdDogJ05ldydcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RGlmZmVyZW50QXNzZXQgPSB0aGlzLmdldERpZmZlcmVudEFzc2V0LmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgZ2V0QWxsQXNzZXRzKCkuZG9uZShhYXMgPT4gdGhpcy5zZXRTdGF0ZSh7IEFsbEFzc2V0czogYWFzIH0pKTtcclxuICAgICAgICBnZXRBc3NldFR5cGVzKCkuZG9uZShhdHMgPT4gdGhpcy5zZXRTdGF0ZSh7QXNzZXRUeXBlczogYXRzfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRBc3NldChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXQ6ICdFZGl0JyxOZXdFZGl0QXNzZXQ6IHRoaXMucHJvcHMuQXNzZXRzW2luZGV4XSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVBc3NldChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBfLmNsb25lKHRoaXMucHJvcHMuQXNzZXRzKTtcclxuICAgICAgICBsZXQgcmVjb3JkOiBBcnJheTxPcGVuWERBLkFzc2V0PiA9IGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBsZXQgYXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ID0gXy5jbG9uZSh0aGlzLnByb3BzLkFzc2V0Q29ubmVjdGlvbnMpO1xyXG4gICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUodGhpcy5wcm9wcy5DaGFubmVscyk7XHJcblxyXG4gICAgICAgICQuZWFjaChjaGFubmVscywgKGluZGV4LCBjaGFubmVsKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsLkFzc2V0ID09IHJlY29yZFswXS5Bc3NldEtleSlcclxuICAgICAgICAgICAgICAgIGNoYW5uZWwuQXNzZXQgPSAnJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgaW5kZXggPSBhc3NldENvbm5lY3Rpb25zLmZpbmRJbmRleChhc3NldENvbm5lY3Rpb24gPT4gYXNzZXRDb25uZWN0aW9uLlBhcmVudCA9PSByZWNvcmRbMF0uQXNzZXRLZXkgfHwgYXNzZXRDb25uZWN0aW9uLkNoaWxkID09IHJlY29yZFswXS5Bc3NldEtleSk7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgYXNzZXRDb25uZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBpbmRleCA9IGFzc2V0Q29ubmVjdGlvbnMuZmluZEluZGV4KGFzc2V0Q29ubmVjdGlvbiA9PiBhc3NldENvbm5lY3Rpb24uUGFyZW50ID09IHJlY29yZFswXS5Bc3NldEtleSB8fCBhc3NldENvbm5lY3Rpb24uQ2hpbGQgPT0gcmVjb3JkWzBdLkFzc2V0S2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldHM6IGxpc3QgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLlVwZGF0ZVN0YXRlKHsgQXNzZXRDb25uZWN0aW9uczogYXNzZXRDb25uZWN0aW9ucyB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWRkQXNzZXQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQXNzZXRUeXBlKHR5cGU6ICdMaW5lJyB8ICdMaW5lU2VnbWVudCcgfCAnQnJlYWtlcicgfCAnQnVzJyB8ICdDYXBhY2l0b3JCYW5rJyB8ICdUcmFuc2Zvcm1lcicgfCAnQ2FwYWNpdG9yQmFua1JlbGF5Jyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBhc3NldCA9IHtcclxuICAgICAgICAgICAgSUQ6IHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LklELFxyXG4gICAgICAgICAgICBBc3NldEtleTogdGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRLZXksXHJcbiAgICAgICAgICAgIEFzc2V0TmFtZTogdGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXROYW1lLFxyXG4gICAgICAgICAgICBBc3NldFR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgIERlc2NyaXB0aW9uOiB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5EZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgVm9sdGFnZUtWOiB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Wb2x0YWdlS1YsXHJcbiAgICAgICAgICAgIENoYW5uZWxzOiB0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5DaGFubmVscyxcclxuICAgICAgICAgICAgU3BhcmU6IHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LlNwYXJlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhc3NldCA9IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldEF0dHJpYnV0ZXMoYXNzZXQsIHR5cGUpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe05ld0VkaXRBc3NldDogYXNzZXR9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREaWZmZXJlbnRBc3NldChhc3NldElEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYXNzZXRUeXBlSUQgPSB0aGlzLnN0YXRlLkFsbEFzc2V0cy5maW5kKGEgPT4gYS5JRCA9PSBhc3NldElEKVsnQXNzZXRUeXBlSUQnXTsgXHJcbiAgICAgICAgbGV0IGFzc2V0VHlwZSA9IHRoaXMuc3RhdGUuQXNzZXRUeXBlcy5maW5kKGF0ID0+IGF0LklEID09IGFzc2V0VHlwZUlEKVxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvJHthc3NldFR5cGUuTmFtZX0vT25lLyR7YXNzZXRJRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pLmRvbmUoKGFzc2V0OiBPcGVuWERBLkFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGFzc2V0LkFzc2V0VHlwZSA9IGFzc2V0VHlwZS5OYW1lO1xyXG4gICAgICAgICAgICBhc3NldC5DaGFubmVscyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogYXNzZXQgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0LkFzc2V0VHlwZSA9PSAnQnJlYWtlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRFRE5BUG9pbnQodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuSUQpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXNzZXRUeXBlLk5hbWUgPT0gJ0xpbmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGluZVNlZ21lbnQodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuSUQpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGluZVNlZ21lbnQobGluZUlEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0xpbmUvJHtsaW5lSUR9L0xpbmVTZWdtZW50YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChsaW5lU2VnbWVudDogT3BlblhEQS5MaW5lRGV0YWlsKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWNvcmQgPSBfLmNsb25lKHRoaXMuc3RhdGUuTmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuTGluZSkgO1xyXG4gICAgICAgICAgICBpZiAobGluZVNlZ21lbnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZWNvcmQuRGV0YWlsID0gbGluZVNlZ21lbnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlY29yZC5EZXRhaWwgPSBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3TGluZURldGFpbHMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogcmVjb3JkIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFRE5BUG9pbnQoYnJlYWtlcklEOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0JyZWFrZXIvJHticmVha2VySUR9L0VETkFQb2ludGAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZWRuYVBvaW50OiBPcGVuWERBLkVETkFQb2ludCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkICA9IF8uY2xvbmUodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5CcmVha2VyKTtcclxuICAgICAgICAgICAgaWYgKGVkbmFQb2ludCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJlY29yZC5FRE5BUG9pbnQgPSBlZG5hUG9pbnQuUG9pbnRcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IHJlY29yZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7bWFyZ2luOiAtMjB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI4NSwgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyODUsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAwLCBtYXJnaW46IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5DaGFubmVscy5tYXAoKGNoYW5uZWwsIGluZGV4KSA9PiA8bGkgc3R5bGU9e3t0ZXh0RGVjb3JhdGlvbjogKGNoYW5uZWwuQXNzZXQubGVuZ3RoID4gMCA/ICdsaW5lLXRocm91Z2gnIDogbnVsbCl9fSBrZXk9e2luZGV4fT57Y2hhbm5lbC5OYW1lICsgJyAtICcgKyBjaGFubmVsLkRlc2NyaXB0aW9ufTwvbGk+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCIgc3R5bGU9e3twYWRkaW5nOiAyMH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogMzggfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI2Fzc2V0TW9kYWwnIG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0U3RhdGUoe05ld0VkaXQ6ICdOZXcnfSl9PkFkZCBBc3NldDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzNTAsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPlN0YXR1czwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+S2V5PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5OYW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5rVjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q2hhbm5lbHM8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuQXNzZXRzLm1hcCgoYXNzZXQ6IE9wZW5YREEuQXNzZXQsIGluZGV4LCBhcnJheSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+eyhhc3NldC5JRCA9PSAwID8gJ05ldycgOiAnRXhpc3RpbmcnKX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT57YXNzZXQuQXNzZXRLZXl9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzMwJScgfX0+e2Fzc2V0LkFzc2V0TmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT57YXNzZXQuQXNzZXRUeXBlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgd2lkdGg6ICcxMCUnIH19Pnthc3NldC5Wb2x0YWdlS1Z9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+e2Fzc2V0LkNoYW5uZWxzLmxlbmd0aH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMTAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBkYXRhLXRvZ2dsZT0nbW9kYWwnIGRhdGEtdGFyZ2V0PScjYXNzZXRNb2RhbCcgb25DbGljaz17KGUpID0+IHRoaXMuZWRpdEFzc2V0KGluZGV4KX0+PHNwYW4+PGkgY2xhc3NOYW1lPVwiZmEgZmEtcGVuY2lsXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc21cIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5kZWxldGVBc3NldChpbmRleCl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWxcIiBpZD1cImFzc2V0TW9kYWxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZ1wiIHN0eWxlPXt7bWF4V2lkdGg6ICcxMDAlJywgd2lkdGg6ICc5MCUnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGhpcy5zdGF0ZS5OZXdFZGl0ID09ICdOZXcnID8gJ0FkZCBOZXcgQXNzZXQgdG8gTWV0ZXInOiAnRWRpdCAnICsgdGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRLZXkgKyAnIGZvciBNZXRlcicgfTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBc3NldEF0dHJpYnV0ZXMgQXNzZXQ9e3RoaXMuc3RhdGUuTmV3RWRpdEFzc2V0fSBOZXdFZGl0PXt0aGlzLnN0YXRlLk5ld0VkaXR9IEFzc2V0VHlwZXM9e3RoaXMuc3RhdGUuQXNzZXRUeXBlc30gQWxsQXNzZXRzPXt0aGlzLnN0YXRlLkFsbEFzc2V0c30gVXBkYXRlU3RhdGU9eyhhc3NldCkgPT4gdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogYXNzZXQgfSl9IEdldERpZmZlcmVudEFzc2V0PXt0aGlzLmdldERpZmZlcmVudEFzc2V0fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zaG93QXR0cmlidXRlcygpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG11bHRpcGxlIHN0eWxlPXt7IGhlaWdodDogJzEwMCUnLCB3aWR0aDogJzEwMCUnIH19IG9uQ2hhbmdlPXsoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFzc2V0ICA9IF8uY2xvbmUodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5Bc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQuQ2hhbm5lbHMgPSAoJChldnQudGFyZ2V0KS52YWwoKSBhcyBBcnJheTxzdHJpbmc+KS5tYXAoYSA9PiB0aGlzLnByb3BzLkNoYW5uZWxzW3BhcnNlSW50KGEpXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBhc3NldCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHZhbHVlPXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5DaGFubmVscy5tYXAoYSA9PiBhLklELnRvU3RyaW5nKCkpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuQ2hhbm5lbHMubWFwKChjaGFubmVsLCBpbmRleCkgPT4gPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17aW5kZXh9IGhpZGRlbj17IGNoYW5uZWwuQXNzZXQgIT0gdGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRLZXkgJiYgY2hhbm5lbC5Bc3NldC5sZW5ndGg+IDB9PntjaGFubmVsLk5hbWUgKyAnIC0gJyArIGNoYW5uZWwuRGVzY3JpcHRpb259PC9vcHRpb24+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZDogT3BlblhEQS5Bc3NldCA9IF8uY2xvbmUodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IF8uY2xvbmUodGhpcy5wcm9wcy5Bc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHM6IEFycmF5PE9wZW5YREEuQ2hhbm5lbD4gPSBfLmNsb25lKHRoaXMucHJvcHMuQ2hhbm5lbHMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGNoYW5uZWxzLCAoaW5kZXgsIGNoYW5uZWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFubmVsLkFzc2V0ID09IHJlY29yZC5Bc3NldEtleSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFzc2V0ID0gJydcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkLkNoYW5uZWxzLmZpbmRJbmRleChjID0+IGMuSUQgPT0gY2hhbm5lbC5JRCkgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkFzc2V0ID0gcmVjb3JkLkFzc2V0S2V5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2gocmVjb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IENoYW5uZWxzOiBjaGFubmVscyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IEFzc2V0czogbGlzdCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogQXNzZXRBdHRyaWJ1dGVzLmdldE5ld0Fzc2V0KCdMaW5lJykgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGhpZGRlbj17dGhpcy5zdGF0ZS5OZXdFZGl0ICE9ICdOZXcnfT5TYXZlPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjb3JkOiBPcGVuWERBLkFzc2V0ID0gXy5jbG9uZSh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gXy5jbG9uZSh0aGlzLnByb3BzLkFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGFubmVsczogQXJyYXk8T3BlblhEQS5DaGFubmVsPiA9IF8uY2xvbmUodGhpcy5wcm9wcy5DaGFubmVscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gbGlzdC5maW5kSW5kZXgociA9PiByLkFzc2V0S2V5ID09IHJlY29yZC5Bc3NldEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RbaV0gPSByZWNvcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChjaGFubmVscywgKGluZGV4LCBjaGFubmVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbm5lbC5Bc3NldCA9PSByZWNvcmQuQXNzZXRLZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9ICcnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZC5DaGFubmVscy5maW5kSW5kZXgoYyA9PiBjLklEID09IGNoYW5uZWwuSUQpID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5Bc3NldCA9IHJlY29yZC5Bc3NldEtleVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBDaGFubmVsczogY2hhbm5lbHMgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldHM6IGxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gaGlkZGVuPXt0aGlzLnN0YXRlLk5ld0VkaXQgIT0gJ0VkaXQnfT5TYXZlPC9idXR0b24+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb25DbGljaz17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgTmV3RWRpdEFzc2V0OiBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXQoJ0xpbmUnKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PkNsb3NlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZU1vZGFsU2F2ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gJCgnLmlzLWludmFsaWQnKS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dBdHRyaWJ1dGVzKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCcmVha2VyJylcclxuICAgICAgICAgICAgcmV0dXJuIDxCcmVha2VyQXR0cmlidXRlcyBOZXdFZGl0PXt0aGlzLnN0YXRlLk5ld0VkaXR9IEFzc2V0PXt0aGlzLnN0YXRlLk5ld0VkaXRBc3NldCBhcyBPcGVuWERBLkJyZWFrZXJ9IFVwZGF0ZVN0YXRlPXsobmV3RWRpdEFzc2V0OiBPcGVuWERBLkJyZWFrZXIpID0+IHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IG5ld0VkaXRBc3NldCB9KX0gLz47XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQuQXNzZXRUeXBlID09ICdCdXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gPEJ1c0F0dHJpYnV0ZXMgTmV3RWRpdD17dGhpcy5zdGF0ZS5OZXdFZGl0fSBBc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXR9IFVwZGF0ZVN0YXRlPXsobmV3RWRpdEFzc2V0OiBPcGVuWERBLkJ1cykgPT4gdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogbmV3RWRpdEFzc2V0IH0pfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0NhcGFjaXRvckJhbmsnKVxyXG4gICAgICAgICAgICByZXR1cm4gPENhcEJhbmtBdHRyaWJ1dGVzIE5ld0VkaXQ9e3RoaXMuc3RhdGUuTmV3RWRpdH0gQXNzZXQ9e3RoaXMuc3RhdGUuTmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuQ2FwQmFua30gVXBkYXRlU3RhdGU9eyhuZXdFZGl0QXNzZXQ6IE9wZW5YREEuQ2FwQmFuaykgPT4gdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogbmV3RWRpdEFzc2V0IH0pfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ0xpbmUnKVxyXG4gICAgICAgICAgICByZXR1cm4gPExpbmVBdHRyaWJ1dGVzIE5ld0VkaXQ9e3RoaXMuc3RhdGUuTmV3RWRpdH0gQXNzZXQ9e3RoaXMuc3RhdGUuTmV3RWRpdEFzc2V0IGFzIE9wZW5YREEuTGluZX0gVXBkYXRlU3RhdGU9eyhuZXdFZGl0QXNzZXQ6IE9wZW5YREEuTGluZSkgPT4gdGhpcy5zZXRTdGF0ZSh7IE5ld0VkaXRBc3NldDogbmV3RWRpdEFzc2V0IH0pfSAvPjtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLk5ld0VkaXRBc3NldC5Bc3NldFR5cGUgPT0gJ1RyYW5zZm9ybWVyJylcclxuICAgICAgICAgICAgcmV0dXJuIDxUcmFuc2Zvcm1lckF0dHJpYnV0ZXMgTmV3RWRpdD17dGhpcy5zdGF0ZS5OZXdFZGl0fSBBc3NldD17dGhpcy5zdGF0ZS5OZXdFZGl0QXNzZXQgYXMgT3BlblhEQS5UcmFuc2Zvcm1lcn0gVXBkYXRlU3RhdGU9eyhuZXdFZGl0QXNzZXQ6IE9wZW5YREEuVHJhbnNmb3JtZXIpID0+IHRoaXMuc2V0U3RhdGUoeyBOZXdFZGl0QXNzZXQ6IG5ld0VkaXRBc3NldCB9KX0gLz47XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBQYWdlNS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTAvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2U1IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgQXNzZXRzOiBBcnJheTxPcGVuWERBLkFzc2V0PiwgQXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ICxVcGRhdGVTdGF0ZTogKHJlY29yZCkgPT4gdm9pZCB9LCB7QXNzZXRJbmRleDogbnVtYmVyLCBBc3NldENvbm5lY3Rpb25UeXBlczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb25UeXBlPiB9LCB7fT57XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBBc3NldEluZGV4OiAwLFxyXG4gICAgICAgICAgICBBc3NldENvbm5lY3Rpb25UeXBlczogW11cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5wcmV2LmJpbmQodGhpcyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0QXNzZXRDb25uZWN0aW9uVHlwZXMoKVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFzc2V0Q29ubmVjdGlvblR5cGVzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9uVHlwZXMnKSlcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEFzc2V0Q29ubmVjdGlvblR5cGVzOiBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ05ld01ldGVyV2l6YXJkLkFzc2V0Q29ubmVjdGlvblR5cGVzJykpIH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL0Fzc2V0Q29ubmVjdGlvblR5cGVgLFxyXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICAgICAgfSkuZG9uZSgoYWN0czogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb25UeXBlPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEFzc2V0Q29ubmVjdGlvblR5cGVzOiBhY3RzIH0pO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnTmV3TWV0ZXJXaXphcmQuQXNzZXRDb25uZWN0aW9uVHlwZXMnLCBKU09OLnN0cmluZ2lmeShhY3RzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIGxldCBhc3NldEluZGV4ID0gdGhpcy5zdGF0ZS5Bc3NldEluZGV4O1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBjdXJyZW50U3RlcCBpcyBzZXQgdG8gc29tZXRoaW5nIHJlYXNvbmFibGVcclxuICAgICAgICBpZiAoYXNzZXRJbmRleCA+PSB0aGlzLnByb3BzLkFzc2V0cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIGFzc2V0SW5kZXggPSB0aGlzLnByb3BzLkFzc2V0cy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFzc2V0SW5kZXggPSBhc3NldEluZGV4ICsgMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBBc3NldEluZGV4OiBhc3NldEluZGV4XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJldigpIHtcclxuICAgICAgICBsZXQgYXNzZXRJbmRleCA9IHRoaXMuc3RhdGUuQXNzZXRJbmRleDtcclxuICAgICAgICBpZiAoYXNzZXRJbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgIGFzc2V0SW5kZXggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFzc2V0SW5kZXggPSBhc3NldEluZGV4IC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBBc3NldEluZGV4OiBhc3NldEluZGV4XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQXNzZXRDb25uZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUFzc2V0Q29ubmVjdGlvbihhYzogT3BlblhEQS5Bc3NldENvbm5lY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ID0gXy5jbG9uZSh0aGlzLnByb3BzLkFzc2V0Q29ubmVjdGlvbnMpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IGxpc3QuZmluZEluZGV4KGEgPT4gYSA9PSBhYyk7XHJcbiAgICAgICAgbGV0IHJlY29yZDogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ID0gbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHRoaXMucHJvcHMuVXBkYXRlU3RhdGUoeyBBc3NldENvbm5lY3Rpb25zOiBsaXN0IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgY3VycmVudEFzc2V0ID0gdGhpcy5wcm9wcy5Bc3NldHNbdGhpcy5zdGF0ZS5Bc3NldEluZGV4XVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7IG1hcmdpbjogLTIwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjg1LCBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI4NSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6IDAsIG1hcmdpbjogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkFzc2V0cy5tYXAoKGFzc2V0LCBpbmRleCkgPT4gPGxpIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAoaW5kZXggPD0gdGhpcy5zdGF0ZS5Bc3NldEluZGV4ID8gJ2xpbmUtdGhyb3VnaCcgOiBudWxsKSB9fSBrZXk9e2luZGV4fT57YXNzZXQuQXNzZXRLZXl9PC9saT4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIiBzdHlsZT17eyBwYWRkaW5nOiAwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17eyBoZWlnaHQ6ICcxMDAlJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgZGF0YS10b2dnbGU9J21vZGFsJyBkYXRhLXRhcmdldD0nI25ld0Nvbm5lY3Rpb24nIGRpc2FibGVkPXt0aGlzLnByb3BzLkFzc2V0cy5sZW5ndGggPD0gMX0+QWRkIENvbm5lY3Rpb248L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJyB9fT57Y3VycmVudEFzc2V0LkFzc2V0S2V5fTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCIgc3R5bGU9e3tvdmVyZmxvd1k6J3Njcm9sbCcsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNDE1fX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+QXNzZXQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5UeXBlPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q29ubmVjdGlvbjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5Bc3NldENvbm5lY3Rpb25zLmZpbHRlciggYWMgPT4gYWMuUGFyZW50ID09IGN1cnJlbnRBc3NldC5Bc3NldEtleSAgfHwgYWMuQ2hpbGQgPT0gY3VycmVudEFzc2V0LkFzc2V0S2V5KS5tYXAoKGFjOiBPcGVuWERBLkFzc2V0Q29ubmVjdGlvbiwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb25uZWN0aW9uQXNzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhYy5QYXJlbnQgPT0gY3VycmVudEFzc2V0LkFzc2V0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uQXNzZXQgPSB0aGlzLnByb3BzLkFzc2V0cy5maW5kKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5ID09IGFjLkNoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uQXNzZXQgPSB0aGlzLnByb3BzLkFzc2V0cy5maW5kKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5ID09IGFjLlBhcmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvblR5cGUgPSB0aGlzLnN0YXRlLkFzc2V0Q29ubmVjdGlvblR5cGVzLmZpbmQoYWN0ID0+IGFjdC5JRCA9PSBhYy5Bc3NldFJlbGF0aW9uc2hpcFR5cGVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpbmRleH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT57Y29ubmVjdGlvbkFzc2V0LkFzc2V0S2V5fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHdpZHRoOiAnMjAlJyB9fT57Y29ubmVjdGlvbkFzc2V0LkFzc2V0VHlwZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzUwJScgfX0+e2Nvbm5lY3Rpb25UeXBlICE9IHVuZGVmaW5lZCA/IGNvbm5lY3Rpb25UeXBlLk5hbWUgOiAnJ308L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyB3aWR0aDogJzEwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbVwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmRlbGV0ZUFzc2V0Q29ubmVjdGlvbihhYyl9PjxzcGFuPjxpIGNsYXNzTmFtZT1cImZhIGZhLXRpbWVzXCI+PC9pPjwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLWxlZnRcIiBvbkNsaWNrPXt0aGlzLnByZXZ9IGhpZGRlbj17ZmFsc2V9IGRpc2FibGVkPXt0aGlzLnN0YXRlLkFzc2V0SW5kZXggPCAxfT5QcmV2PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMubmV4dH0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuQXNzZXRJbmRleCA9PSB0aGlzLnByb3BzLkFzc2V0cy5sZW5ndGggLSAxfT5OZXh0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsXCIgaWQ9XCJuZXdDb25uZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPkFkZCBhIENvbm5lY3Rpb24gdG8ge2N1cnJlbnRBc3NldC5Bc3NldEtleX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2VsZWN0IENvbm5lY3RpbmcgQXNzZXQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHJlZj0nYXNzZXRDb25uZWN0aW9uJyBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17KGV2dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLkFzc2V0cy5maWx0ZXIoYXNzZXQgPT4gYXNzZXQuQXNzZXRLZXkgIT0gY3VycmVudEFzc2V0LkFzc2V0S2V5KS5tYXAoKGFzc2V0LCBpbmRleCkgPT4gPG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17YXNzZXQuQXNzZXRLZXl9ID57YXNzZXQuQXNzZXRLZXl9PC9vcHRpb24+KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlbGVjdCBDb25uZWN0aW9uIFR5cGU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IHJlZj0nYXNzZXRDb25uZWN0aW9uVHlwZScgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgb25DaGFuZ2U9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5Bc3NldENvbm5lY3Rpb25UeXBlcy5tYXAoKGFjdCwgaW5kZXgpID0+IDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e2FjdC5JRH0gPnthY3QuTmFtZX08L29wdGlvbj4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uQ2xpY2s9eyhldnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkQ29ubmVjdGlvbiA9ICQodGhpcy5yZWZzLmFzc2V0Q29ubmVjdGlvbikudmFsKCkgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGlvblR5cGUgPSBwYXJzZUludCgkKHRoaXMucmVmcy5hc3NldENvbm5lY3Rpb25UeXBlKS52YWwoKSBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXRDb25uZWN0aW9uczogQXJyYXk8T3BlblhEQS5Bc3NldENvbm5lY3Rpb24+ID0gXy5jbG9uZSh0aGlzLnByb3BzLkFzc2V0Q29ubmVjdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldENvbm5lY3Rpb25zLnB1c2goeyBJRDogMCwgQXNzZXRSZWxhdGlvbnNoaXBUeXBlSUQ6IGNvbm5lY3Rpb25UeXBlLCBQYXJlbnQ6IGN1cnJlbnRBc3NldC5Bc3NldEtleSwgQ2hpbGQ6IGNoaWxkQ29ubmVjdGlvbiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5VcGRhdGVTdGF0ZSh7IEFzc2V0Q29ubmVjdGlvbnM6IGFzc2V0Q29ubmVjdGlvbnN9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19ID5TYXZlPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=