(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Meter~NewMeterWizard"],{

/***/ "./TSX/SystemCenter/Meter/PropertyUI/MeterLocationProperties.tsx":
/*!***********************************************************************!*\
  !*** ./TSX/SystemCenter/Meter/PropertyUI/MeterLocationProperties.tsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../AssetAttribute/Asset */ "./TSX/SystemCenter/AssetAttribute/Asset.tsx");
//******************************************************************************************************
//  MeterLocationProperties.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  03/31/2021 - C. Lackner
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



var MeterLocationProperties = function (props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), validKey = _a[0], setValidKey = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var key = props.Location.LocationKey;
        if (key == null || key == '')
            return;
        var index = props.Locationlist.filter(function (item) { return item.LocationKey == key; });
        if (index.length == 0)
            setValidKey(true);
        else if (index.length > 1)
            setValidKey(false);
        else
            setValidKey(props.Location.ID == index[0].ID);
    }, [props.Location, props.Locationlist]);
    function valid(field) {
        if (field == 'LocationKey')
            return props.Location.LocationKey != null && props.Location.LocationKey.length > 0 && props.Location.LocationKey.length <= 50 && validKey;
        else if (field == 'Name')
            return props.Location.Name != null && props.Location.Name.length > 0 && props.Location.Name.length <= 200;
        else if (field == 'Alias')
            return props.Location.Alias == null || props.Location.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.Location.ShortName == null || props.Location.ShortName.length <= 50;
        else if (field == 'Latitude')
            return props.Location.Latitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Location.Latitude);
        else if (field == 'Longitude')
            return props.Location.Longitude != null && _AssetAttribute_Asset__WEBPACK_IMPORTED_MODULE_2__["AssetAttributes"].isRealNumber(props.Location.Longitude);
        else if (field == 'Description')
            return true;
        return false;
    }
    if (props.Location == null || props.Meter == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Select"], { Record: props.Meter, Field: 'LocationID', Label: 'Select location', Setter: function (m) { return props.UpdateMeter(m); }, Options: props.Locationlist.map(function (item) { return ({ Label: item.LocationKey, Value: item.ID.toString() }); }), EmptyOption: true, EmptyLabel: 'Add New' }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Location, Field: 'LocationKey', Label: 'Key', Feedback: 'A unique key of less than 50 characters is required.', Valid: valid, Setter: function (loc) { return props.SetLocation(loc); }, Disabled: props.DisableLocation }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Location, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: valid, Setter: function (loc) { return props.SetLocation(loc); }, Disabled: props.DisableLocation }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Location, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: valid, Setter: function (loc) { return props.SetLocation(loc); }, Disabled: props.DisableLocation })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Location, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: valid, Setter: function (loc) { return props.SetLocation(loc); }, Disabled: props.DisableLocation }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Location, Field: 'Latitude', Feedback: 'Latitude is a required numeric field.', Valid: valid, Setter: function (loc) { return props.SetLocation(loc); }, Disabled: props.DisableLocation }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Location, Field: 'Longitude', Feedback: 'Longitude is a required numeric field.', Valid: valid, Setter: function (loc) { return props.SetLocation(loc); }, Disabled: props.DisableLocation }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["TextArea"], { Rows: 3, Record: props.Location, Field: 'Description', Valid: valid, Setter: function (loc) { return props.SetLocation(loc); }, Disabled: props.DisableLocation }))));
};
/* harmony default export */ __webpack_exports__["default"] = (MeterLocationProperties);


/***/ }),

/***/ "./TSX/SystemCenter/Meter/PropertyUI/MeterProperties.tsx":
/*!***************************************************************!*\
  !*** ./TSX/SystemCenter/Meter/PropertyUI/MeterProperties.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  MeterProperties.tsx - Gbtc
//
//  Copyright © 2019, Grid Protection Alliance.  All Rights Reserved.
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
//  03/31/2021 - C. Lackner
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


var MeterProperties = function (props) {
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](true), 2), assetKeyValid = _a[0], setAssetKeyValid = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](props.Meter.AssetKey), 2), assetKey = _b[0], setAssetKey = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), timeZones = _c[0], setTimeZones = _c[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getTimeZones();
        return function () { if (handle != null && handle.abort != null)
            handle.abort(); };
    }, []);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        if (assetKey != props.Meter.AssetKey)
            setAssetKey(props.Meter.AssetKey);
    }, [props.Meter]);
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = validateAssetKey();
        return function () { if (handle != null && handle.abort != null)
            handle.abort(); };
    }, [assetKey]);
    function getTimeZones() {
        if (sessionStorage.hasOwnProperty('SystemCenter.TimeZones')) {
            setTimeZones(JSON.parse(sessionStorage.getItem('SystemCenter.TimeZones')));
            return null;
        }
        var h = $.ajax({
            type: "GET",
            url: homePath + "api/ValueList/Group/TimeZones",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: true,
            async: true
        });
        h.done(function (tzs) {
            setTimeZones(tzs);
            sessionStorage.setItem('SystemCenter.TimeZones', JSON.stringify(tzs));
        });
        return h;
    }
    function validateAssetKey() {
        if (assetKey == null || assetKey.length == 0 || assetKey.length > 50)
            return null;
        var h = $.ajax({
            type: "Post",
            url: homePath + "api/OpenXDA/MeterList/SearchableList",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify({ Searches: [{ FieldName: 'AssetKey', Operator: "=", SearchText: assetKey, Type: 'string' }], OrderBy: "AssetKey", Ascending: true }),
            cache: false,
            async: true
        });
        h.done(function (d) {
            var meters = JSON.parse(d);
            if (meters.length == 0)
                setAssetKeyValid(true);
            else if (meters.length > 1)
                setAssetKeyValid(false);
            else if (meters[0].ID == props.Meter.ID)
                setAssetKeyValid(true);
            else
                setAssetKeyValid(false);
        });
        return h;
    }
    function valid(field) {
        if (field == 'AssetKey')
            return props.Meter.AssetKey != null && props.Meter.AssetKey.length > 0 && props.Meter.AssetKey.length <= 50 && assetKeyValid;
        else if (field == 'Name')
            return props.Meter.Name != null && props.Meter.Name.length > 0 && props.Meter.Name.length <= 200;
        else if (field == 'Alias')
            return props.Meter.Alias == null || props.Meter.Alias.length <= 200;
        else if (field == 'ShortName')
            return props.Meter.ShortName == null || props.Meter.ShortName.length <= 50;
        else if (field == 'Make')
            return props.Meter.Make != null && props.Meter.Make.length > 0 && props.Meter.Make.length <= 200;
        else if (field == 'Model')
            return props.Meter.Model != null && props.Meter.Model.length > 0 && props.Meter.Model.length <= 200;
        else if (field == 'Description')
            return true;
        return false;
    }
    if (props.Meter == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Meter, Field: 'AssetKey', Feedback: 'A unique key of less than 50 characters is required.', Valid: valid, Setter: function (meter) { return props.StateSetter(meter); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Meter, Field: 'Name', Feedback: 'Name must be less than 200 characters and is required.', Valid: valid, Setter: function (meter) { return props.StateSetter(meter); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Meter, Field: 'ShortName', Feedback: 'ShortName must be less than 50 characters.', Valid: valid, Setter: function (meter) { return props.StateSetter(meter); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Meter, Field: 'Alias', Feedback: 'Alias must be less than 200 characters.', Valid: valid, Setter: function (meter) { return props.StateSetter(meter); } })),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Meter, Field: 'Make', Feedback: 'Make must be less than 200 characters.', Valid: valid, Setter: function (meter) { return props.StateSetter(meter); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Meter, Field: 'Model', Feedback: 'Model must be less than 200 characters.', Valid: valid, Setter: function (meter) { return props.StateSetter(meter); } }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Select"], { Record: props.Meter, Field: 'TimeZone', Options: timeZones.map(function (item) { return { Value: item.Text, Label: item.AltText1 }; }), Label: 'Time Zone', Setter: function (meter) { return props.StateSetter(meter); }, EmptyOption: true, EmptyLabel: 'None Selected' }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["TextArea"], { Rows: 3, Record: props.Meter, Field: 'Description', Valid: valid, Setter: function (meter) { return props.StateSetter(meter); } }))));
};
/* harmony default export */ __webpack_exports__["default"] = (MeterProperties);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL01ldGVyL1Byb3BlcnR5VUkvTWV0ZXJMb2NhdGlvblByb3BlcnRpZXMudHN4Iiwid2VicGFjazovLy8uL1RTWC9TeXN0ZW1DZW50ZXIvTWV0ZXIvUHJvcGVydHlVSS9NZXRlclByb3BlcnRpZXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsc0NBQXNDO0FBQ3RDLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4RywyQkFBMkI7QUFDM0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR3pFO0FBR3FDO0FBQ1A7QUFhN0QsSUFBTSx1QkFBdUIsR0FBRyxVQUFDLEtBQWE7SUFDcEMsd0VBQXVELEVBQXRELGdCQUFRLEVBQUUsbUJBQTRDLENBQUM7SUFFOUQsK0NBQWUsQ0FBQztRQUNaLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtZQUN4QixPQUFPO1FBQ1gsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsY0FBSSxJQUFJLFdBQUksQ0FBQyxXQUFXLElBQUksR0FBRyxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDekUsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDakIsV0FBVyxDQUFDLElBQUksQ0FB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LENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLHlDQUF5QyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQUMsS0FBb0IsSUFBSyxZQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUF3QixHQUFJO1lBQzVMLG9EQUFDLGdFQUFNLElBQWdCLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBSSxJQUFNLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUNoSixLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxVQUFDLEtBQUssSUFBSyxZQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUF3QixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGVBQWUsR0FBSTtZQUV2SCxvREFBQyxrRUFBUSxJQUFnQixJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBQyxLQUFvQixJQUFLLFlBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQXhCLENBQXdCLEdBQUksQ0FDbkosQ0FDSixDQUNiLENBQUM7QUFHTixDQUFDO0FBRWMsOEVBQWUsRUFBQyIsImZpbGUiOiJNZXRlcn5OZXdNZXRlcldpemFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBNZXRlckxvY2F0aW9uUHJvcGVydGllcy50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAxOSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDMvMzEvMjAyMSAtIEMuIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEsIFN5c3RlbUNlbnRlciB9IGZyb20gJy4uLy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IElucHV0LCBTZWxlY3QsIFRleHRBcmVhIH0gZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC1mb3Jtcyc7XHJcbmltcG9ydCB7IEFzc2V0QXR0cmlidXRlcyB9IGZyb20gJy4uLy4uL0Fzc2V0QXR0cmlidXRlL0Fzc2V0JztcclxuXHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcblxyXG5pbnRlcmZhY2UgSVByb3BzIHtcclxuICAgIE1ldGVyOiBPcGVuWERBLk1ldGVyLFxyXG4gICAgVXBkYXRlTWV0ZXI6IChtZXRlcjogT3BlblhEQS5NZXRlcikgPT4gdm9pZCxcclxuICAgIExvY2F0aW9ubGlzdDogT3BlblhEQS5Mb2NhdGlvbltdLFxyXG4gICAgTG9jYXRpb246IE9wZW5YREEuTG9jYXRpb24sXHJcbiAgICBTZXRMb2NhdGlvbjogKGxvYzogT3BlblhEQS5Mb2NhdGlvbikgPT4gdm9pZCxcclxuICAgIERpc2FibGVMb2NhdGlvbjogYm9vbGVhblxyXG59XHJcblxyXG5jb25zdCBNZXRlckxvY2F0aW9uUHJvcGVydGllcyA9IChwcm9wczogSVByb3BzKSA9PiB7XHJcbiAgICBjb25zdCBbdmFsaWRLZXksIHNldFZhbGlkS2V5XSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gcHJvcHMuTG9jYXRpb24uTG9jYXRpb25LZXk7XHJcbiAgICAgICAgaWYgKGtleSA9PSBudWxsIHx8IGtleSA9PSAnJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gcHJvcHMuTG9jYXRpb25saXN0LmZpbHRlcihpdGVtID0+IGl0ZW0uTG9jYXRpb25LZXkgPT0ga2V5KTtcclxuICAgICAgICBpZiAoaW5kZXgubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHNldFZhbGlkS2V5KHRydWUpO1xyXG4gICAgICAgIGVsc2UgaWYgKGluZGV4Lmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgIHNldFZhbGlkS2V5KGZhbHNlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNldFZhbGlkS2V5KHByb3BzLkxvY2F0aW9uLklEID09IGluZGV4WzBdLklEKTtcclxuXHJcbiAgICB9LCBbcHJvcHMuTG9jYXRpb24sIHByb3BzLkxvY2F0aW9ubGlzdF0pO1xyXG5cclxuIFxyXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mIE9wZW5YREEuTG9jYXRpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmllbGQgPT0gJ0xvY2F0aW9uS2V5JylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkxvY2F0aW9uLkxvY2F0aW9uS2V5ICE9IG51bGwgJiYgcHJvcHMuTG9jYXRpb24uTG9jYXRpb25LZXkubGVuZ3RoID4gMCAmJiBwcm9wcy5Mb2NhdGlvbi5Mb2NhdGlvbktleS5sZW5ndGggPD0gNTAgJiYgdmFsaWRLZXk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTG9jYXRpb24uTmFtZSAhPSBudWxsICYmIHByb3BzLkxvY2F0aW9uLk5hbWUubGVuZ3RoID4gMCAmJiBwcm9wcy5Mb2NhdGlvbi5OYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0FsaWFzJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkxvY2F0aW9uLkFsaWFzID09IG51bGwgfHwgcHJvcHMuTG9jYXRpb24uQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkxvY2F0aW9uLlNob3J0TmFtZSA9PSBudWxsIHx8IHByb3BzLkxvY2F0aW9uLlNob3J0TmFtZS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xhdGl0dWRlJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkxvY2F0aW9uLkxhdGl0dWRlICE9IG51bGwgJiYgQXNzZXRBdHRyaWJ1dGVzLmlzUmVhbE51bWJlcihwcm9wcy5Mb2NhdGlvbi5MYXRpdHVkZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0xvbmdpdHVkZScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5Mb2NhdGlvbi5Mb25naXR1ZGUgIT0gbnVsbCAmJiBBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKHByb3BzLkxvY2F0aW9uLkxvbmdpdHVkZSk7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9wcy5Mb2NhdGlvbiA9PSBudWxsIHx8IHByb3BzLk1ldGVyID09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgPFNlbGVjdDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVyfSBGaWVsZD17J0xvY2F0aW9uSUQnfSBMYWJlbD17J1NlbGVjdCBsb2NhdGlvbid9IFNldHRlcj17KG0pID0+IHByb3BzLlVwZGF0ZU1ldGVyKG0pfVxyXG4gICAgICAgICAgICAgICAgICAgIE9wdGlvbnM9e3Byb3BzLkxvY2F0aW9ubGlzdC5tYXAoaXRlbSA9PiAoeyBMYWJlbDogaXRlbS5Mb2NhdGlvbktleSwgVmFsdWU6IGl0ZW0uSUQudG9TdHJpbmcoKSB9KSl9IEVtcHR5T3B0aW9uPXt0cnVlfSBFbXB0eUxhYmVsPXsnQWRkIE5ldyd9IC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPElucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17cHJvcHMuTG9jYXRpb259IEZpZWxkPXsnTG9jYXRpb25LZXknfSBMYWJlbD17J0tleSd9IEZlZWRiYWNrPXsnQSB1bmlxdWUga2V5IG9mIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXsobG9jKSA9PiBwcm9wcy5TZXRMb2NhdGlvbihsb2MpfSBEaXNhYmxlZD17cHJvcHMuRGlzYWJsZUxvY2F0aW9ufSAvPlxyXG4gICAgICAgICAgICAgICAgPElucHV0PE9wZW5YREEuTG9jYXRpb24+IFJlY29yZD17cHJvcHMuTG9jYXRpb259IEZpZWxkPXsnTmFtZSd9IEZlZWRiYWNrPXsnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgY2hhcmFjdGVycyBhbmQgaXMgcmVxdWlyZWQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9eyhsb2MpID0+IHByb3BzLlNldExvY2F0aW9uKGxvYyl9IERpc2FibGVkPXtwcm9wcy5EaXNhYmxlTG9jYXRpb259Lz5cclxuICAgICAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3Byb3BzLkxvY2F0aW9ufSBGaWVsZD17J1Nob3J0TmFtZSd9IEZlZWRiYWNrPXsnU2hvcnROYW1lIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9eyhsb2MpID0+IHByb3BzLlNldExvY2F0aW9uKGxvYyl9IERpc2FibGVkPXtwcm9wcy5EaXNhYmxlTG9jYXRpb259Lz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XHJcbiAgICAgICAgICAgICAgICA8SW5wdXQ8T3BlblhEQS5Mb2NhdGlvbj4gUmVjb3JkPXtwcm9wcy5Mb2NhdGlvbn0gRmllbGQ9eydBbGlhcyd9IEZlZWRiYWNrPXsnQWxpYXMgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9eyhsb2MpID0+IHByb3BzLlNldExvY2F0aW9uKGxvYyl9IERpc2FibGVkPXtwcm9wcy5EaXNhYmxlTG9jYXRpb259Lz5cclxuICAgICAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3Byb3BzLkxvY2F0aW9ufSBGaWVsZD17J0xhdGl0dWRlJ30gRmVlZGJhY2s9eydMYXRpdHVkZSBpcyBhIHJlcXVpcmVkIG51bWVyaWMgZmllbGQuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9eyhsb2MpID0+IHByb3BzLlNldExvY2F0aW9uKGxvYyl9IERpc2FibGVkPXtwcm9wcy5EaXNhYmxlTG9jYXRpb259Lz5cclxuICAgICAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLkxvY2F0aW9uPiBSZWNvcmQ9e3Byb3BzLkxvY2F0aW9ufSBGaWVsZD17J0xvbmdpdHVkZSd9IEZlZWRiYWNrPXsnTG9uZ2l0dWRlIGlzIGEgcmVxdWlyZWQgbnVtZXJpYyBmaWVsZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17KGxvYykgPT4gcHJvcHMuU2V0TG9jYXRpb24obG9jKX0gRGlzYWJsZWQ9e3Byb3BzLkRpc2FibGVMb2NhdGlvbn0vPlxyXG4gICAgICAgICAgICAgICAgPFRleHRBcmVhPE9wZW5YREEuTG9jYXRpb24+IFJvd3M9ezN9IFJlY29yZD17cHJvcHMuTG9jYXRpb259IEZpZWxkPXsnRGVzY3JpcHRpb24nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17KGxvYykgPT4gcHJvcHMuU2V0TG9jYXRpb24obG9jKX0gRGlzYWJsZWQ9e3Byb3BzLkRpc2FibGVMb2NhdGlvbn0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgKTtcclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNZXRlckxvY2F0aW9uUHJvcGVydGllczsiLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTWV0ZXJQcm9wZXJ0aWVzLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMy8zMS8yMDIxIC0gQy4gTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSwgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgSW5wdXQsIFNlbGVjdCwgVGV4dEFyZWEgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zJztcclxuaW1wb3J0IHsgTG9hZGluZ1NjcmVlbiwgU2VhcmNoLCBUb29sVGlwIH0gZnJvbSAnQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZSc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5cclxuaW50ZXJmYWNlIElQcm9wcyB7IE1ldGVyOiBPcGVuWERBLk1ldGVyLCBTdGF0ZVNldHRlcjogKG1ldGVyOiBPcGVuWERBLk1ldGVyKSA9PiB2b2lkIH1cclxuXHJcbmNvbnN0IE1ldGVyUHJvcGVydGllcyA9IChwcm9wczogSVByb3BzKSA9PiB7XHJcbiAgICBjb25zdCBbYXNzZXRLZXlWYWxpZCwgc2V0QXNzZXRLZXlWYWxpZF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcclxuICAgIGNvbnN0IFthc3NldEtleSwgc2V0QXNzZXRLZXldID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPihwcm9wcy5NZXRlci5Bc3NldEtleSk7XHJcbiAgICBjb25zdCBbdGltZVpvbmVzLCBzZXRUaW1lWm9uZXNdID0gUmVhY3QudXNlU3RhdGU8QXJyYXk8U3lzdGVtQ2VudGVyLlZhbHVlTGlzdEl0ZW0+PihbXSk7XHJcbiAgIFxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhhbmRsZSA9IGdldFRpbWVab25lcygpO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4geyBpZiAoaGFuZGxlICE9IG51bGwgJiYgaGFuZGxlLmFib3J0ICE9IG51bGwpIGhhbmRsZS5hYm9ydCgpO31cclxuICAgIH0sIFtdKVxyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGFzc2V0S2V5ICE9IHByb3BzLk1ldGVyLkFzc2V0S2V5KVxyXG4gICAgICAgICAgICBzZXRBc3NldEtleShwcm9wcy5NZXRlci5Bc3NldEtleSk7XHJcbiAgICB9LCBbcHJvcHMuTWV0ZXJdKTtcclxuXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxldCBoYW5kbGUgPSB2YWxpZGF0ZUFzc2V0S2V5KCk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHsgaWYgKGhhbmRsZSAhPSBudWxsICYmIGhhbmRsZS5hYm9ydCAhPSBudWxsKSBoYW5kbGUuYWJvcnQoKTsgfVxyXG5cclxuICAgIH0sIFthc3NldEtleV0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRpbWVab25lcygpOiBKUXVlcnkuanFYSFI8QXJyYXk8U3lzdGVtQ2VudGVyLlZhbHVlTGlzdEl0ZW0+PiB7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmhhc093blByb3BlcnR5KCdTeXN0ZW1DZW50ZXIuVGltZVpvbmVzJykpIHtcclxuICAgICAgICAgICAgc2V0VGltZVpvbmVzKEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnU3lzdGVtQ2VudGVyLlRpbWVab25lcycpKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGggPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9WYWx1ZUxpc3QvR3JvdXAvVGltZVpvbmVzYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBoLmRvbmUoKHR6czogQXJyYXk8U3lzdGVtQ2VudGVyLlZhbHVlTGlzdEl0ZW0+KSA9PiB7XHJcbiAgICAgICAgICAgIHNldFRpbWVab25lcyh0enMpO1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdTeXN0ZW1DZW50ZXIuVGltZVpvbmVzJywgSlNPTi5zdHJpbmdpZnkodHpzKSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBoO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUFzc2V0S2V5KCk6IEpRdWVyeS5qcVhIUjxzdHJpbmc+IHtcclxuICAgICAgICBpZiAoYXNzZXRLZXkgPT0gbnVsbCB8fCBhc3NldEtleS5sZW5ndGggPT0gMCB8fCBhc3NldEtleS5sZW5ndGggPiA1MClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGxldCBoID0gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXJMaXN0L1NlYXJjaGFibGVMaXN0YCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IFNlYXJjaGVzOiBbeyBGaWVsZE5hbWU6ICdBc3NldEtleScsIE9wZXJhdG9yOiBcIj1cIiwgU2VhcmNoVGV4dDogYXNzZXRLZXksIFR5cGU6ICdzdHJpbmcnIH0gYXMgU2VhcmNoLklGaWx0ZXI8T3BlblhEQS5NZXRlcj5dLCBPcmRlckJ5OiBcIkFzc2V0S2V5XCIsIEFzY2VuZGluZzogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGguZG9uZSgoZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtZXRlcnMgPSBKU09OLnBhcnNlKGQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1ldGVycy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgIHNldEFzc2V0S2V5VmFsaWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1ldGVycy5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgc2V0QXNzZXRLZXlWYWxpZChmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1ldGVyc1swXS5JRCA9PSBwcm9wcy5NZXRlci5JRClcclxuICAgICAgICAgICAgICAgIHNldEFzc2V0S2V5VmFsaWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHNldEFzc2V0S2V5VmFsaWQoZmFsc2UpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWQoZmllbGQ6IGtleW9mKE9wZW5YREEuTWV0ZXIpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09ICdBc3NldEtleScpXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wcy5NZXRlci5Bc3NldEtleSAhPSBudWxsICYmIHByb3BzLk1ldGVyLkFzc2V0S2V5Lmxlbmd0aCA+IDAgJiYgcHJvcHMuTWV0ZXIuQXNzZXRLZXkubGVuZ3RoIDw9IDUwICYmIGFzc2V0S2V5VmFsaWQ7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ05hbWUnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTWV0ZXIuTmFtZSAhPSBudWxsICYmIHByb3BzLk1ldGVyLk5hbWUubGVuZ3RoID4gMCAmJiBwcm9wcy5NZXRlci5OYW1lLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0FsaWFzJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVyLkFsaWFzID09IG51bGwgfHwgcHJvcHMuTWV0ZXIuQWxpYXMubGVuZ3RoIDw9IDIwMDtcclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PSAnU2hvcnROYW1lJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVyLlNob3J0TmFtZSA9PSBudWxsIHx8IHByb3BzLk1ldGVyLlNob3J0TmFtZS5sZW5ndGggPD0gNTA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01ha2UnKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuTWV0ZXIuTWFrZSAhPSBudWxsICYmIHByb3BzLk1ldGVyLk1ha2UubGVuZ3RoID4gMCAmJiBwcm9wcy5NZXRlci5NYWtlLmxlbmd0aCA8PSAyMDA7XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ01vZGVsJylcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLk1ldGVyLk1vZGVsICE9IG51bGwgJiYgcHJvcHMuTWV0ZXIuTW9kZWwubGVuZ3RoID4gMCAmJiBwcm9wcy5NZXRlci5Nb2RlbC5sZW5ndGggPD0gMjAwO1xyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdEZXNjcmlwdGlvbicpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvcHMuTWV0ZXIgPT0gbnVsbClcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8SW5wdXQ8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXtwcm9wcy5NZXRlcn0gRmllbGQ9eydBc3NldEtleSd9IEZlZWRiYWNrPXsnQSB1bmlxdWUga2V5IG9mIGxlc3MgdGhhbiA1MCBjaGFyYWN0ZXJzIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXsobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHByb3BzLlN0YXRlU2V0dGVyKG1ldGVyKX0gLz5cclxuICAgICAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVyfSBGaWVsZD17J05hbWUnfSBGZWVkYmFjaz17J05hbWUgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMgYW5kIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXsobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHByb3BzLlN0YXRlU2V0dGVyKG1ldGVyKX0gLz5cclxuICAgICAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVyfSBGaWVsZD17J1Nob3J0TmFtZSd9IEZlZWRiYWNrPXsnU2hvcnROYW1lIG11c3QgYmUgbGVzcyB0aGFuIDUwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9eyhtZXRlcjogT3BlblhEQS5NZXRlcikgPT4gcHJvcHMuU3RhdGVTZXR0ZXIobWV0ZXIpfSAvPlxyXG4gICAgICAgICAgICAgICAgPElucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJ9IEZpZWxkPXsnQWxpYXMnfSBGZWVkYmFjaz17J0FsaWFzIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXsobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHByb3BzLlN0YXRlU2V0dGVyKG1ldGVyKX0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLk1ldGVyPiBSZWNvcmQ9e3Byb3BzLk1ldGVyfSBGaWVsZD17J01ha2UnfSBGZWVkYmFjaz17J01ha2UgbXVzdCBiZSBsZXNzIHRoYW4gMjAwIGNoYXJhY3RlcnMuJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9eyhtZXRlcjogT3BlblhEQS5NZXRlcikgPT4gcHJvcHMuU3RhdGVTZXR0ZXIobWV0ZXIpfSAvPlxyXG4gICAgICAgICAgICAgICAgPElucHV0PE9wZW5YREEuTWV0ZXI+IFJlY29yZD17cHJvcHMuTWV0ZXJ9IEZpZWxkPXsnTW9kZWwnfSBGZWVkYmFjaz17J01vZGVsIG11c3QgYmUgbGVzcyB0aGFuIDIwMCBjaGFyYWN0ZXJzLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXsobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHByb3BzLlN0YXRlU2V0dGVyKG1ldGVyKX0gLz5cclxuICAgICAgICAgICAgICAgIDxTZWxlY3Q8T3BlblhEQS5NZXRlcj4gUmVjb3JkPXtwcm9wcy5NZXRlcn0gRmllbGQ9eydUaW1lWm9uZSd9IE9wdGlvbnM9e3RpbWVab25lcy5tYXAoaXRlbSA9PiB7IHJldHVybiB7IFZhbHVlOiBpdGVtLlRleHQsIExhYmVsOiBpdGVtLkFsdFRleHQxIH0gfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgTGFiZWw9eydUaW1lIFpvbmUnfSBTZXR0ZXI9eyhtZXRlcikgPT4gcHJvcHMuU3RhdGVTZXR0ZXIobWV0ZXIpfSBFbXB0eU9wdGlvbj17dHJ1ZX0gRW1wdHlMYWJlbD17J05vbmUgU2VsZWN0ZWQnfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8VGV4dEFyZWE8T3BlblhEQS5NZXRlcj4gUm93cz17M30gUmVjb3JkPXtwcm9wcy5NZXRlcn0gRmllbGQ9eydEZXNjcmlwdGlvbid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXsobWV0ZXI6IE9wZW5YREEuTWV0ZXIpID0+IHByb3BzLlN0YXRlU2V0dGVyKG1ldGVyKX0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWV0ZXJQcm9wZXJ0aWVzOyJdLCJzb3VyY2VSb290IjoiIn0=