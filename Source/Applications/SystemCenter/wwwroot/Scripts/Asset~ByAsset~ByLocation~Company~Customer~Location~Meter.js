(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Asset~ByAsset~ByLocation~Company~Customer~Location~Meter"],{

/***/ "./TSX/SystemCenter/AssetAttribute/Asset.tsx":
/*!***************************************************!*\
  !*** ./TSX/SystemCenter/AssetAttribute/Asset.tsx ***!
  \***************************************************/
/*! exports provided: AssetAttributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetAttributes", function() { return AssetAttributes; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
/* harmony import */ var _gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__);
//******************************************************************************************************
//  Asset.tsx - Gbtc
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
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};


var AssetAttributes;
(function (AssetAttributes) {
    function AssetAttributeFields(props) {
        function changeAssetType(type) {
            var asset = {
                ID: props.Asset.ID,
                AssetKey: props.Asset.AssetKey,
                AssetName: props.Asset.AssetName,
                AssetType: type,
                Description: props.Asset.Description,
                VoltageKV: props.Asset.VoltageKV,
                Channels: props.Asset.Channels,
                Spare: props.Asset.Spare
            };
            asset = AssetAttributes.getNewAssetAttributes(asset, type);
            asset['AssetTypeID'] = props.AssetTypes.find(function (ats) { return ats.Name == type; }).ID;
            props.UpdateState(asset);
        }
        function valid(field) {
            if (field == 'AssetKey') {
                if (props.Asset.AssetKey == null || props.Asset.AssetKey.length == 0)
                    return false;
                else if (props.NewEdit == 'New') {
                    if (props.Asset.ID == 0) {
                        return props.AllAssets.map(function (asset) { return asset.AssetKey.toLowerCase(); }).indexOf(props.Asset.AssetKey.toLowerCase()) < 0;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    var oldKey = props.AllAssets.find(function (aa) { return aa.ID === props.Asset.ID; }) == undefined ? '' : props.AllAssets.find(function (aa) { return aa.ID === props.Asset.ID; }).AssetKey;
                    if (oldKey == props.Asset.AssetKey)
                        return true;
                    else
                        return props.AllAssets.map(function (asset) { return asset.AssetKey.toLowerCase(); }).indexOf(props.Asset.AssetKey.toLowerCase()) < 0;
                }
            }
            else if (field == 'AssetName')
                return props.Asset.AssetName != null && props.Asset.AssetName.length > 0;
            else if (field == 'VoltageKV')
                return props.Asset.VoltageKV != null && AssetAttributes.isRealNumber(props.Asset.VoltageKV);
            else if (field == 'Description')
                return true;
            return false;
        }
        if (props.Asset == null)
            return null;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Select"], { Record: props.Asset, Label: 'Select Asset', Field: 'ID', Options: __spread([{ Value: '0', Label: 'Add New' }], props.AllAssets.map(function (a) { return ({ Value: a.ID.toString(), Label: a.AssetKey }); })), Setter: function (asset) {
                    if (parseInt(asset.ID.toString()) != 0)
                        props.GetDifferentAsset(parseInt(asset.ID.toString()));
                    else
                        props.UpdateState(AssetAttributes.getNewAsset('Line'));
                }, Disabled: props.NewEdit == 'Edit' }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Select"], { Record: props.Asset, Label: 'Type', Field: 'AssetType', Options: props.AssetTypes.filter(function (item) { return item.Name != 'LineSegment'; }).map(function (type) { return ({ Value: type.Name, Label: type.Name }); }), Setter: function (asset) {
                    changeAssetType(asset.AssetType);
                }, Disabled: props.NewEdit == 'Edit' || props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Asset, Field: 'AssetKey', Label: 'Key', Feedback: 'A unique key of less than 50 characters is required.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Asset, Field: 'AssetName', Label: 'Name', Feedback: 'Name must be less than 200 and is required.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["Input"], { Record: props.Asset, Field: 'VoltageKV', Label: 'Nominal Voltage (L-L kV)', Feedback: 'Nominal Voltage requires a numerical value.', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_gpa_gemstone_react_forms__WEBPACK_IMPORTED_MODULE_1__["TextArea"], { Rows: 3, Record: props.Asset, Field: 'Description', Valid: valid, Setter: props.UpdateState, Disabled: props.NewEdit == 'New' && props.Asset.ID != 0 })));
    }
    AssetAttributes.AssetAttributeFields = AssetAttributeFields;
    function getNewAsset(type) {
        var asset = {
            ID: 0,
            AssetKey: null,
            AssetName: null,
            AssetType: type,
            Description: null,
            VoltageKV: null,
            Spare: false,
            Channels: []
        };
        asset = AssetAttributes.getNewAssetAttributes(asset, type);
        return asset;
    }
    AssetAttributes.getNewAsset = getNewAsset;
    function getNewLineDetails() {
        var asset = {
            Length: 0,
            X0: 0,
            R0: 0,
            X1: 0,
            R1: 0,
            ThermalRating: 0,
        };
        return asset;
    }
    AssetAttributes.getNewLineDetails = getNewLineDetails;
    function getNewAssetAttributes(asset, type) {
        if (type == 'Line') {
            var record = asset;
            record.MaxFaultDistance = null;
            record.MinFaultDistance = null;
            record.Detail = this.getNewAsset('LineSegment');
            return record;
        }
        else if (type == 'Breaker') {
            var record = asset;
            record.ThermalRating = null;
            record.Speed = null;
            record.TripTime = null;
            record.PickupTime = null;
            record.TripCoilCondition = null;
            return record;
        }
        else if (type == 'Bus') {
            var record = asset;
            return record;
        }
        else if (type == 'CapacitorBankRelay') {
            var record = asset;
            return record;
        }
        else if (type == 'CapacitorBank') {
            var record = asset;
            record.NumberOfBanks = null;
            record.CapacitancePerBank = null;
            return record;
        }
        else if (type == 'LineSegment') {
            var record = asset;
            record.R0 = null;
            record.X0 = null;
            record.R1 = null;
            record.X1 = null;
            record.ThermalRating = null;
            record.Length = null;
            return record;
        }
        else {
            var record = asset;
            record.R0 = null;
            record.X0 = null;
            record.R1 = null;
            record.X1 = null;
            record.ThermalRating = null;
            record.PrimaryVoltageKV = null;
            record.SecondaryVoltageKV = null;
            record.Tap = null;
            return record;
        }
    }
    AssetAttributes.getNewAssetAttributes = getNewAssetAttributes;
    function isInteger(value) {
        var regex = /^-?[0-9]+$/;
        return value.toString().match(regex) != null;
    }
    AssetAttributes.isInteger = isInteger;
    function isRealNumber(value) {
        var regex = /^-?[0-9]+(\.[0-9]+)?$/;
        return value.toString().match(regex) != null;
    }
    AssetAttributes.isRealNumber = isRealNumber;
    function AttributeError(asset) {
        var errors = [];
        if (asset.AssetKey == null || asset.AssetKey.length == 0)
            errors.push('A Key is required.');
        if (asset.AssetName == null || asset.AssetName.length == 0)
            errors.push('A Name is required.');
        if (asset.VoltageKV == null || !AssetAttributes.isRealNumber(asset.VoltageKV))
            errors.push('A valid nominal Voltage is required.');
        return errors;
    }
    AssetAttributes.AttributeError = AttributeError;
})(AssetAttributes || (AssetAttributes = {}));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0Fzc2V0QXR0cmlidXRlL0Fzc2V0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0dBQXdHO0FBQ3hHLG9CQUFvQjtBQUNwQixFQUFFO0FBQ0YscUVBQXFFO0FBQ3JFLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLHNHQUFzRztBQUN0Ryx3RkFBd0Y7QUFDeEYsRUFBRTtBQUNGLDBDQUEwQztBQUMxQyxFQUFFO0FBQ0Ysd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryw0RUFBNEU7QUFDNUUsRUFBRTtBQUNGLDhCQUE4QjtBQUM5Qix3R0FBd0c7QUFDeEcsNkJBQTZCO0FBQzdCLG1EQUFtRDtBQUNuRCxFQUFFO0FBQ0Ysd0dBQXdHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFekU7QUFJcUM7QUFhN0QsSUFBVSxlQUFlLENBK0wvQjtBQS9MRCxXQUFpQixlQUFlO0lBRTVCLFNBQWdCLG9CQUFvQixDQUFDLEtBQTJCO1FBRTVELFNBQVMsZUFBZSxDQUFDLElBQTJCO1lBQ2hELElBQUksS0FBSyxHQUFHO2dCQUNSLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xCLFFBQVEsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQzlCLFNBQVMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVM7Z0JBQ2hDLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFdBQVcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVc7Z0JBQ3BDLFNBQVMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVM7Z0JBQ2hDLFFBQVEsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQzlCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUs7YUFDM0I7WUFFRCxLQUFLLEdBQUcsZUFB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QUFJLENBQUM7WUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUNyQyxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUM7WUFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUM7UUFHdkQsT0FBTyxNQUFNLENBQUM7SUFFbEIsQ0FBQztJQWJlLDhCQUFjLGlCQWE3QjtBQUNMLENBQUMsRUEvTGdCLGVBQWUsS0FBZixlQUFlLFFBK0wvQiIsImZpbGUiOiJBc3NldH5CeUFzc2V0fkJ5TG9jYXRpb25+Q29tcGFueX5DdXN0b21lcn5Mb2NhdGlvbn5NZXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBBc3NldC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTcvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBPcGVuWERBIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi4vZ2xvYmFsJztcclxuaW1wb3J0IHsgSW5wdXQsIFNlbGVjdCwgVGV4dEFyZWEgfSBmcm9tICdAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zJztcclxuXHJcbmludGVyZmFjZSBBc3NldEF0dHJpYnV0ZXNQcm9wcyB7XHJcbiAgICBBc3NldDogT3BlblhEQS5Bc3NldCxcclxuICAgIE5ld0VkaXQ6IFN5c3RlbUNlbnRlci5OZXdFZGl0LFxyXG4gICAgVXBkYXRlU3RhdGU6IChBc3NldDogT3BlblhEQS5Bc3NldCkgPT4gdm9pZCxcclxuICAgIEFzc2V0VHlwZXM6IEFycmF5PE9wZW5YREEuQXNzZXRUeXBlPixcclxuICAgIEFsbEFzc2V0czogQXJyYXk8T3BlblhEQS5Bc3NldD4sXHJcbiAgICBHZXREaWZmZXJlbnRBc3NldDogKGFzc2V0SUQ6IG51bWJlcikgPT4gdm9pZCxcclxuICAgIEhpZGVTZWxlY3RBc3NldD86IGJvb2xlYW5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgQXNzZXRBdHRyaWJ1dGVzIHtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQXNzZXRBdHRyaWJ1dGVGaWVsZHMocHJvcHM6IEFzc2V0QXR0cmlidXRlc1Byb3BzKTogSlNYLkVsZW1lbnQge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VBc3NldFR5cGUodHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBhc3NldCA9IHtcclxuICAgICAgICAgICAgICAgIElEOiBwcm9wcy5Bc3NldC5JRCxcclxuICAgICAgICAgICAgICAgIEFzc2V0S2V5OiBwcm9wcy5Bc3NldC5Bc3NldEtleSxcclxuICAgICAgICAgICAgICAgIEFzc2V0TmFtZTogcHJvcHMuQXNzZXQuQXNzZXROYW1lLFxyXG4gICAgICAgICAgICAgICAgQXNzZXRUeXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgRGVzY3JpcHRpb246IHByb3BzLkFzc2V0LkRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgVm9sdGFnZUtWOiBwcm9wcy5Bc3NldC5Wb2x0YWdlS1YsXHJcbiAgICAgICAgICAgICAgICBDaGFubmVsczogcHJvcHMuQXNzZXQuQ2hhbm5lbHMsXHJcbiAgICAgICAgICAgICAgICBTcGFyZTogcHJvcHMuQXNzZXQuU3BhcmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXNzZXQgPSBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXRBdHRyaWJ1dGVzKGFzc2V0LCB0eXBlKTtcclxuICAgICAgICAgICAgYXNzZXRbJ0Fzc2V0VHlwZUlEJ10gPSBwcm9wcy5Bc3NldFR5cGVzLmZpbmQoYXRzID0+IGF0cy5OYW1lID09IHR5cGUpLklEO1xyXG4gICAgICAgICAgICBwcm9wcy5VcGRhdGVTdGF0ZShhc3NldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB2YWxpZChmaWVsZDoga2V5b2YgKE9wZW5YREEuQXNzZXQpKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZCA9PSAnQXNzZXRLZXknKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcHMuQXNzZXQuQXNzZXRLZXkgPT0gbnVsbCB8fCBwcm9wcy5Bc3NldC5Bc3NldEtleS5sZW5ndGggPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvcHMuTmV3RWRpdCA9PSAnTmV3Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wcy5Bc3NldC5JRCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcy5BbGxBc3NldHMubWFwKGFzc2V0ID0+IGFzc2V0LkFzc2V0S2V5LnRvTG93ZXJDYXNlKCkpLmluZGV4T2YocHJvcHMuQXNzZXQuQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkgPCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9sZEtleSA9IHByb3BzLkFsbEFzc2V0cy5maW5kKGFhID0+IGFhLklEID09PSBwcm9wcy5Bc3NldC5JRCkgPT0gdW5kZWZpbmVkID8gJycgOiBwcm9wcy5BbGxBc3NldHMuZmluZChhYSA9PiBhYS5JRCA9PT0gcHJvcHMuQXNzZXQuSUQpLkFzc2V0S2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRLZXkgPT0gcHJvcHMuQXNzZXQuQXNzZXRLZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFsbEFzc2V0cy5tYXAoYXNzZXQgPT4gYXNzZXQuQXNzZXRLZXkudG9Mb3dlckNhc2UoKSkuaW5kZXhPZihwcm9wcy5Bc3NldC5Bc3NldEtleS50b0xvd2VyQ2FzZSgpKSA8IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Fzc2V0TmFtZScpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHMuQXNzZXQuQXNzZXROYW1lICE9IG51bGwgJiYgcHJvcHMuQXNzZXQuQXNzZXROYW1lLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkID09ICdWb2x0YWdlS1YnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLkFzc2V0LlZvbHRhZ2VLViAhPSBudWxsICYmIEFzc2V0QXR0cmlidXRlcy5pc1JlYWxOdW1iZXIocHJvcHMuQXNzZXQuVm9sdGFnZUtWKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoZmllbGQgPT0gJ0Rlc2NyaXB0aW9uJylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHByb3BzLkFzc2V0ID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gKDxSZWFjdC5GcmFnbWVudD5cclxuICAgICAgICAgICAgPFNlbGVjdDxPcGVuWERBLkFzc2V0PiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBMYWJlbD17J1NlbGVjdCBBc3NldCd9IEZpZWxkPXsnSUQnfVxyXG4gICAgICAgICAgICAgICAgT3B0aW9ucz17W3sgVmFsdWU6ICcwJywgTGFiZWw6ICdBZGQgTmV3JyB9LCAuLi5wcm9wcy5BbGxBc3NldHMubWFwKGEgPT4gKHsgVmFsdWU6IGEuSUQudG9TdHJpbmcoKSwgTGFiZWw6IGEuQXNzZXRLZXkgfSkpXX1cclxuICAgICAgICAgICAgICAgIFNldHRlcj17KGFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGFzc2V0LklELnRvU3RyaW5nKCkpICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLkdldERpZmZlcmVudEFzc2V0KHBhcnNlSW50KGFzc2V0LklELnRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlVwZGF0ZVN0YXRlKEFzc2V0QXR0cmlidXRlcy5nZXROZXdBc3NldCgnTGluZScpKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnRWRpdCd9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxTZWxlY3Q8T3BlblhEQS5Bc3NldD4gUmVjb3JkPXtwcm9wcy5Bc3NldH0gTGFiZWw9eydUeXBlJ30gRmllbGQ9eydBc3NldFR5cGUnfVxyXG4gICAgICAgICAgICAgICAgT3B0aW9ucz17cHJvcHMuQXNzZXRUeXBlcy5maWx0ZXIoaXRlbSA9PiBpdGVtLk5hbWUgIT0gJ0xpbmVTZWdtZW50JykubWFwKHR5cGUgPT4gKHsgVmFsdWU6IHR5cGUuTmFtZSwgTGFiZWw6IHR5cGUuTmFtZSB9KSl9XHJcbiAgICAgICAgICAgICAgICBTZXR0ZXI9eyhhc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUFzc2V0VHlwZShhc3NldC5Bc3NldFR5cGUpXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ0VkaXQnIHx8IHByb3BzLkFzc2V0LklEICE9IDB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLkFzc2V0PiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0Fzc2V0S2V5J30gTGFiZWw9eydLZXknfSBGZWVkYmFjaz17J0EgdW5pcXVlIGtleSBvZiBsZXNzIHRoYW4gNTAgY2hhcmFjdGVycyBpcyByZXF1aXJlZC4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxJbnB1dDxPcGVuWERBLkFzc2V0PiBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0Fzc2V0TmFtZSd9IExhYmVsPXsnTmFtZSd9IEZlZWRiYWNrPXsnTmFtZSBtdXN0IGJlIGxlc3MgdGhhbiAyMDAgYW5kIGlzIHJlcXVpcmVkLid9IFZhbGlkPXt2YWxpZH0gU2V0dGVyPXtwcm9wcy5VcGRhdGVTdGF0ZX0gRGlzYWJsZWQ9e3Byb3BzLk5ld0VkaXQgPT0gJ05ldycgJiYgcHJvcHMuQXNzZXQuSUQgIT0gMH0gLz5cclxuICAgICAgICAgICAgPElucHV0PE9wZW5YREEuQXNzZXQ+IFJlY29yZD17cHJvcHMuQXNzZXR9IEZpZWxkPXsnVm9sdGFnZUtWJ30gTGFiZWw9eydOb21pbmFsIFZvbHRhZ2UgKEwtTCBrViknfSBGZWVkYmFjaz17J05vbWluYWwgVm9sdGFnZSByZXF1aXJlcyBhIG51bWVyaWNhbCB2YWx1ZS4nfSBWYWxpZD17dmFsaWR9IFNldHRlcj17cHJvcHMuVXBkYXRlU3RhdGV9IERpc2FibGVkPXtwcm9wcy5OZXdFZGl0ID09ICdOZXcnICYmIHByb3BzLkFzc2V0LklEICE9IDB9IC8+XHJcbiAgICAgICAgICAgIDxUZXh0QXJlYTxPcGVuWERBLkFzc2V0PiBSb3dzPXszfSBSZWNvcmQ9e3Byb3BzLkFzc2V0fSBGaWVsZD17J0Rlc2NyaXB0aW9uJ30gVmFsaWQ9e3ZhbGlkfSBTZXR0ZXI9e3Byb3BzLlVwZGF0ZVN0YXRlfSBEaXNhYmxlZD17cHJvcHMuTmV3RWRpdCA9PSAnTmV3JyAmJiBwcm9wcy5Bc3NldC5JRCAhPSAwfSAvPlxyXG4gICAgICAgIDwvUmVhY3QuRnJhZ21lbnQgPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldE5ld0Fzc2V0KHR5cGU6IE9wZW5YREEuQXNzZXRUeXBlTmFtZSk6IE9wZW5YREEuRGV0YWlsZWRBc3NldCB7XHJcbiAgICAgICAgbGV0IGFzc2V0OiBPcGVuWERBLkFzc2V0ID0ge1xyXG4gICAgICAgICAgICBJRDogMCxcclxuICAgICAgICAgICAgQXNzZXRLZXk6IG51bGwsXHJcbiAgICAgICAgICAgIEFzc2V0TmFtZTogbnVsbCxcclxuICAgICAgICAgICAgQXNzZXRUeXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBEZXNjcmlwdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgVm9sdGFnZUtWOiBudWxsLFxyXG4gICAgICAgICAgICBTcGFyZTogZmFsc2UsXHJcbiAgICAgICAgICAgIENoYW5uZWxzOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXNzZXQgPSBBc3NldEF0dHJpYnV0ZXMuZ2V0TmV3QXNzZXRBdHRyaWJ1dGVzKGFzc2V0LCB0eXBlKTtcclxuICAgICAgICByZXR1cm4gYXNzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldE5ld0xpbmVEZXRhaWxzKCk6IE9wZW5YREEuTGluZURldGFpbCB7XHJcbiAgICAgICAgbGV0IGFzc2V0OiBPcGVuWERBLkxpbmVEZXRhaWwgPSB7XHJcbiAgICAgICAgICAgIExlbmd0aDogMCxcclxuICAgICAgICAgICAgWDA6IDAsXHJcbiAgICAgICAgICAgIFIwOiAwLFxyXG4gICAgICAgICAgICBYMTogMCxcclxuICAgICAgICAgICAgUjE6IDAsXHJcbiAgICAgICAgICAgIFRoZXJtYWxSYXRpbmc6IDAsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldE5ld0Fzc2V0QXR0cmlidXRlcyhhc3NldDogT3BlblhEQS5Bc3NldCwgdHlwZTogT3BlblhEQS5Bc3NldFR5cGVOYW1lKTogT3BlblhEQS5EZXRhaWxlZEFzc2V0IHtcclxuICAgICAgICBpZiAodHlwZSA9PSAnTGluZScpIHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuTGluZTtcclxuICAgICAgICAgICAgcmVjb3JkLk1heEZhdWx0RGlzdGFuY2UgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuTWluRmF1bHREaXN0YW5jZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5EZXRhaWwgPSB0aGlzLmdldE5ld0Fzc2V0KCdMaW5lU2VnbWVudCcpIGFzIE9wZW5YREEuTGluZVNlZ21lbnQ7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdCcmVha2VyJykge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5CcmVha2VyO1xyXG4gICAgICAgICAgICByZWNvcmQuVGhlcm1hbFJhdGluZyA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5TcGVlZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5UcmlwVGltZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5QaWNrdXBUaW1lID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlRyaXBDb2lsQ29uZGl0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnQnVzJykge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5CdXM7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmRcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnQ2FwYWNpdG9yQmFua1JlbGF5Jykge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5DYXBCYW5rUmVsYXk7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmRcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnQ2FwYWNpdG9yQmFuaycpIHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuQ2FwQmFuaztcclxuICAgICAgICAgICAgcmVjb3JkLk51bWJlck9mQmFua3MgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuQ2FwYWNpdGFuY2VQZXJCYW5rID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ0xpbmVTZWdtZW50Jykge1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkID0gYXNzZXQgYXMgT3BlblhEQS5MaW5lU2VnbWVudDtcclxuICAgICAgICAgICAgcmVjb3JkLlIwID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlgwID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlIxID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlgxID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlRoZXJtYWxSYXRpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuTGVuZ3RoID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJlY29yZCA9IGFzc2V0IGFzIE9wZW5YREEuVHJhbnNmb3JtZXI7XHJcbiAgICAgICAgICAgIHJlY29yZC5SMCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5YMCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5SMSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5YMSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlY29yZC5UaGVybWFsUmF0aW5nID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlByaW1hcnlWb2x0YWdlS1YgPSBudWxsO1xyXG4gICAgICAgICAgICByZWNvcmQuU2Vjb25kYXJ5Vm9sdGFnZUtWID0gbnVsbDtcclxuICAgICAgICAgICAgcmVjb3JkLlRhcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmRcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB2YXIgcmVnZXggPSAvXi0/WzAtOV0rJC87XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkubWF0Y2gocmVnZXgpICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzUmVhbE51bWJlcih2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdmFyIHJlZ2V4ID0gL14tP1swLTldKyhcXC5bMC05XSspPyQvO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpLm1hdGNoKHJlZ2V4KSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBBdHRyaWJ1dGVFcnJvcihhc3NldDogT3BlblhEQS5EZXRhaWxlZEFzc2V0KTogc3RyaW5nW10gIHtcclxuICAgICAgICBsZXQgZXJyb3JzID0gW107XHJcblxyXG4gICAgICAgIGlmIChhc3NldC5Bc3NldEtleSA9PSBudWxsIHx8IGFzc2V0LkFzc2V0S2V5Lmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICBlcnJvcnMucHVzaCgnQSBLZXkgaXMgcmVxdWlyZWQuJylcclxuICAgICAgICBpZiAoYXNzZXQuQXNzZXROYW1lID09IG51bGwgfHwgYXNzZXQuQXNzZXROYW1lLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICBlcnJvcnMucHVzaCgnQSBOYW1lIGlzIHJlcXVpcmVkLicpXHJcbiAgICAgICAgaWYgKGFzc2V0LlZvbHRhZ2VLViA9PSBudWxsIHx8ICFBc3NldEF0dHJpYnV0ZXMuaXNSZWFsTnVtYmVyKGFzc2V0LlZvbHRhZ2VLVikpXHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKCdBIHZhbGlkIG5vbWluYWwgVm9sdGFnZSBpcyByZXF1aXJlZC4nKVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGVycm9ycztcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=