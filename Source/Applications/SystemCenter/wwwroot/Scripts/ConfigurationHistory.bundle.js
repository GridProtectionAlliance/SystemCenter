(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ConfigurationHistory"],{

/***/ "./TSX/SystemCenter/ConfigurationHistory/ConfigurationHistory.tsx":
/*!************************************************************************!*\
  !*** ./TSX/SystemCenter/ConfigurationHistory/ConfigurationHistory.tsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
//******************************************************************************************************
//  Meter.tsx - Gbtc
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
//  08/27/2019 - Billy Ernest
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



function ConfigurationHistory(props) {
    var history = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useHistory"])();
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](null), 2), meterConfiguration = _a[0], setMeterConfiguration = _a[1];
    var _b = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]('configuration'), 2), tab = _b[0], setTab = _b[1];
    var _c = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), filesProcessed = _c[0], setFilesProcessed = _c[1];
    var _d = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"](false), 2), changed = _d[0], setChanged = _d[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"](function () { return getData(); }, [props.MeterConfigurationID]);
    function getData() {
        getFilesProcessed();
        getMeterConfiguration();
    }
    function getMeterConfiguration() {
        return $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/MeterConfiguration/One/" + props.MeterConfigurationID,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (record) {
            setMeterConfiguration(record);
            initializeAce(record);
        });
    }
    function getFilesProcessed() {
        $.ajax({
            type: "GET",
            url: homePath + "api/OpenXDA/MeterConfiguration/" + props.MeterConfigurationID + "/FilesProcessed",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        }).done(function (data) { return setFilesProcessed(data); });
    }
    function saveEdit() {
        var newRecord = lodash__WEBPACK_IMPORTED_MODULE_1__["clone"](meterConfiguration);
        newRecord.ID = 0;
        newRecord.ConfigText = ace.edit('template').getValue();
        newRecord.DiffID = null;
        $.ajax({
            type: "POST",
            url: homePath + "api/OpenXDA/MeterConfiguration/Add",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(newRecord),
            cache: false,
            async: true
        }).done(function (data) { return history.push({ pathname: homePath + "index.cshtml", search: "?name=ConfigurationHistory&MeterKey=" + props.MeterKey + "&MeterConfigurationID=" + data.ID, state: {} }); });
    }
    function initializeAce(record) {
        var editor = ace.edit("template");
        editor.getSession().setMode("ace/mode/xml");
        editor.setFontSize("14px");
        editor.setValue(record.ConfigText);
        editor.clearSelection();
        editor.gotoLine(0);
        editor.session.off('change');
        editor.session.on('change', function (delta) {
            setChanged(record.ConfigText != editor.getValue());
        });
    }
    if (meterConfiguration == null)
        return null;
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', height: window.innerHeight - 63, maxHeight: window.innerHeight - 63, overflow: 'hidden', padding: 15 } },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h2", null,
                    props.MeterKey,
                    " - Configuration Revision: ",
                    meterConfiguration.RevisionMajor + '.' + meterConfiguration.RevisionMinor))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "nav nav-tabs" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "configuration" ? " active" : ""), onClick: function () { return setTab('configuration'); }, "data-toggle": "tab", href: "#configuration" }, "Configuration")),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link" + (tab == "filesProcessed" ? " active" : ""), onClick: function () { return setTab('filesProcessed'); }, "data-toggle": "tab", href: "#filesProcessed" }, "Files Processed"))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-content", style: { maxHeight: window.innerHeight - 235, overflow: 'hidden' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "configuration" ? " active" : "fade"), id: "configuration" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { id: "template", style: { height: window.innerHeight - 275 } }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-primary pull-right", onClick: saveEdit, disabled: !changed }, "Save Edit")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "btn-group mr-2" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "btn btn-danger pull-right", onClick: getData, disabled: !changed }, "Reset"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "tab-pane " + (tab == "filesProcessed" ? " active" : "fade"), id: "filesProcessed" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', maxHeight: window.innerHeight - 275, padding: 30, overflowY: 'auto' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: 'table' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "File Path"),
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "Creation Time"))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, filesProcessed.map(function (a, i) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: i },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, a.FilePath),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, a.CreationTime)); }))))))));
}
/* harmony default export */ __webpack_exports__["default"] = (ConfigurationHistory);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbmZpZ3VyYXRpb25IaXN0b3J5L0NvbmZpZ3VyYXRpb25IaXN0b3J5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsb0JBQW9CO0FBQ3BCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBQ0g7QUFFa0I7QUFJOUMsU0FBUyxvQkFBb0IsQ0FBQyxLQUF5RDtJQUNuRixJQUFNLE9BQU8sR0FBRyxtRUFBVSxFQUFFLENBQUM7SUFDdkIsd0VBQThGLEVBQTdGLDBCQUFrQixFQUFFLDZCQUF5RSxDQUFDO0lBQy9GLG1GQUFtRixFQUFsRixXQUFHLEVBQUUsY0FBNkUsQ0FBQztJQUNwRixzRUFBaUYsRUFBaEYsc0JBQWMsRUFBRSx5QkFBZ0UsQ0FBQztJQUNsRix5RUFBc0QsRUFBckQsZUFBTyxFQUFFLGtCQUE0QyxDQUFDO0lBQzdELHFEQUFxQixDQUFDLGNBQU0sY0FBTyxFQUFFLEVBQVQsQ0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztJQUVyRSxTQUFTLE9BQU87UUFDWixpQkFBaUIsRUFBRSxDQUFDO1FBQ3BCLHFCQUFxQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFNBQVMscUJBQXFCO1FBQzNCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNULElBQUksRUFBRSxLQUFLO1lBQ1osR0FBRyxFQUFLLFFBQVEsMkNBQXNDLEtBQUssQ0FBQyxvQkFBc0I7WUFDakYsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDWCxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7WUFDN0IsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFCLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELFNBQVMsaUJBQWlCO1FBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBSyxRQUFRLHVDQUFrQyxLQUFLLENBQUMsb0JBQW9CLG9CQUFpQjtZQUM3RixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBNkIsSUFBSyx3QkFBaUIsQ0FBRSxJQUFJLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxTQUFTLFFBQVE7UUFDYixJQUFJLFNBQVMsR0FBK0IsNENBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hFLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2RCxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUssUUFBUSx1Q0FBb0M7WUFDcEQsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDL0IsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFnQyxJQUFLLGNBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUssUUFBUSxpQkFBYyxFQUFFLE1BQU0sRUFBRSx5Q0FBdUMsS0FBSyxDQUFDLFFBQVEsOEJBQXlCLElBQUksQ0FBQyxFQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQWpLLENBQWlLLENBQUMsQ0FBQztJQUNyTixDQUFDO0lBR0QsU0FBUyxhQUFhLENBQUMsTUFBa0M7UUFDckQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQUs7WUFDN0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUlELElBQUksa0JBQWtCLElBQUksSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzVDLE9BQU8sQ0FDSCw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQy9ILDZEQUFLLFNBQVMsRUFBQyxLQUFLO1lBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dCQUNoQjtvQkFBSyxLQUFLLENBQUMsUUFBUTs7b0JBQTZCLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsYUFBYSxDQUFNLENBQzdILENBQ0o7UUFHTiwrREFBTTtRQUNOLDREQUFJLFNBQVMsRUFBQyxjQUFjO1lBQ3hCLDREQUFJLFNBQVMsRUFBQyxVQUFVO2dCQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBTSxhQUFNLENBQUMsZUFBZSxDQUFDLEVBQXZCLENBQXVCLGlCQUFjLEtBQUssRUFBQyxJQUFJLEVBQUMsZ0JBQWdCLG9CQUFrQixDQUN0SztZQUNMLDREQUFJLFNBQVMsRUFBQyxVQUFVO2dCQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFNLGFBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUF4QixDQUF3QixpQkFBYyxLQUFLLEVBQUMsSUFBSSxFQUFDLGlCQUFpQixzQkFBb0IsQ0FDM0ssQ0FDSjtRQUVMLDZEQUFLLFNBQVMsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7WUFDM0YsNkRBQUssU0FBUyxFQUFFLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLGVBQWU7Z0JBQzNGLDZEQUFLLEVBQUUsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLEdBQVM7Z0JBQ3ZFLDZEQUFLLFNBQVMsRUFBQyxnQkFBZ0I7b0JBQzNCLGdFQUFRLFNBQVMsRUFBQyw0QkFBNEIsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLE9BQU8sZ0JBQW9CLENBQ3RHO2dCQUNOLDZEQUFLLFNBQVMsRUFBQyxnQkFBZ0I7b0JBQzNCLGdFQUFRLFNBQVMsRUFBQywyQkFBMkIsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLE9BQU8sWUFBZ0IsQ0FDaEcsQ0FDSjtZQUNOLDZEQUFLLFNBQVMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLGdCQUFnQjtnQkFDN0YsNkRBQUssS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO29CQUM5RiwrREFBTyxTQUFTLEVBQUMsT0FBTzt3QkFDcEI7NEJBQ0k7Z0NBQUksNEVBQWtCO2dDQUFBLGdGQUFzQixDQUFLLENBQzdDO3dCQUNSLG1FQUNLLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLG1FQUFJLEdBQUcsRUFBRSxDQUFDOzRCQUFFLGdFQUFLLENBQUMsQ0FBQyxRQUFRLENBQU07NEJBQUEsZ0VBQUssQ0FBQyxDQUFDLFlBQVksQ0FBTSxDQUFLLEVBQS9ELENBQStELENBQUMsQ0FDMUYsQ0FDSixDQUVOLENBQ0osQ0FDSixDQUNKLENBQ1Q7QUFDTCxDQUFDO0FBRWMsbUZBQW9CLEVBQUMiLCJmaWxlIjoiQ29uZmlndXJhdGlvbkhpc3RvcnkuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE1ldGVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOC8yNy8yMDE5IC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IE9wZW5YREEgfSBmcm9tICcuLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyB1c2VIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmRlY2xhcmUgdmFyIGhvbWVQYXRoOiBzdHJpbmc7XHJcbmRlY2xhcmUgdmFyIGFjZTogYW55O1xyXG5cclxuZnVuY3Rpb24gQ29uZmlndXJhdGlvbkhpc3RvcnkocHJvcHM6IHsgTWV0ZXJDb25maWd1cmF0aW9uSUQ6IG51bWJlciwgTWV0ZXJLZXk6IHN0cmluZyB9KSB7XHJcbiAgICBjb25zdCBoaXN0b3J5ID0gdXNlSGlzdG9yeSgpO1xyXG4gICAgY29uc3QgW21ldGVyQ29uZmlndXJhdGlvbiwgc2V0TWV0ZXJDb25maWd1cmF0aW9uXSA9IFJlYWN0LnVzZVN0YXRlPE9wZW5YREEuTWV0ZXJDb25maWd1cmF0aW9uPihudWxsKTtcclxuICAgIGNvbnN0IFt0YWIsIHNldFRhYl0gPSBSZWFjdC51c2VTdGF0ZTwnY29uZmlndXJhdGlvbicgfCAnZmlsZXNQcm9jZXNzZWQnPignY29uZmlndXJhdGlvbicpO1xyXG4gICAgY29uc3QgW2ZpbGVzUHJvY2Vzc2VkLCBzZXRGaWxlc1Byb2Nlc3NlZF0gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxPcGVuWERBLkRhdGFGaWxlPj4oW10pO1xyXG4gICAgY29uc3QgW2NoYW5nZWQsIHNldENoYW5nZWRdID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gICAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IGdldERhdGEoKSwgW3Byb3BzLk1ldGVyQ29uZmlndXJhdGlvbklEXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcclxuICAgICAgICBnZXRGaWxlc1Byb2Nlc3NlZCgpO1xyXG4gICAgICAgIGdldE1ldGVyQ29uZmlndXJhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1ldGVyQ29uZmlndXJhdGlvbigpOiBQcm9taXNlPE9wZW5YREEuTWV0ZXJDb25maWd1cmF0aW9uPiB7XHJcbiAgICAgICByZXR1cm4gJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyQ29uZmlndXJhdGlvbi9PbmUvJHtwcm9wcy5NZXRlckNvbmZpZ3VyYXRpb25JRH1gLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgIH0pLmRvbmUoKHJlY29yZCkgPT4ge1xyXG4gICAgICAgICAgIHNldE1ldGVyQ29uZmlndXJhdGlvbihyZWNvcmQpXHJcbiAgICAgICAgICAgaW5pdGlhbGl6ZUFjZShyZWNvcmQpO1xyXG5cclxuICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEZpbGVzUHJvY2Vzc2VkKCk6IHZvaWQge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXJDb25maWd1cmF0aW9uLyR7cHJvcHMuTWV0ZXJDb25maWd1cmF0aW9uSUR9L0ZpbGVzUHJvY2Vzc2VkYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZGF0YTogQXJyYXk8T3BlblhEQS5EYXRhRmlsZT4pID0+IHNldEZpbGVzUHJvY2Vzc2VkKCBkYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2F2ZUVkaXQoKTogdm9pZHtcclxuICAgICAgICBsZXQgbmV3UmVjb3JkOiBPcGVuWERBLk1ldGVyQ29uZmlndXJhdGlvbiA9IF8uY2xvbmUobWV0ZXJDb25maWd1cmF0aW9uKTtcclxuICAgICAgICBuZXdSZWNvcmQuSUQgPSAwO1xyXG4gICAgICAgIG5ld1JlY29yZC5Db25maWdUZXh0ID0gYWNlLmVkaXQoJ3RlbXBsYXRlJykuZ2V0VmFsdWUoKTtcclxuICAgICAgICBuZXdSZWNvcmQuRGlmZklEID0gbnVsbDtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlckNvbmZpZ3VyYXRpb24vQWRkYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShuZXdSZWNvcmQpLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSkuZG9uZSgoZGF0YTogT3BlblhEQS5NZXRlckNvbmZpZ3VyYXRpb24pID0+IGhpc3RvcnkucHVzaCh7IHBhdGhuYW1lOiBgJHtob21lUGF0aH1pbmRleC5jc2h0bWxgLCBzZWFyY2g6IGA/bmFtZT1Db25maWd1cmF0aW9uSGlzdG9yeSZNZXRlcktleT0ke3Byb3BzLk1ldGVyS2V5fSZNZXRlckNvbmZpZ3VyYXRpb25JRD0ke2RhdGEuSUR9YCwgc3RhdGU6IHt9IH0pKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUFjZShyZWNvcmQ6IE9wZW5YREEuTWV0ZXJDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgICAgbGV0IGVkaXRvciA9IGFjZS5lZGl0KFwidGVtcGxhdGVcIik7XHJcbiAgICAgICAgZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKFwiYWNlL21vZGUveG1sXCIpO1xyXG4gICAgICAgIGVkaXRvci5zZXRGb250U2l6ZShcIjE0cHhcIik7XHJcbiAgICAgICAgZWRpdG9yLnNldFZhbHVlKHJlY29yZC5Db25maWdUZXh0KTtcclxuICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICBlZGl0b3IuZ290b0xpbmUoMCk7XHJcbiAgICAgICAgZWRpdG9yLnNlc3Npb24ub2ZmKCdjaGFuZ2UnKTtcclxuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5vbignY2hhbmdlJywgZGVsdGEgPT4ge1xyXG4gICAgICAgICAgICBzZXRDaGFuZ2VkKHJlY29yZC5Db25maWdUZXh0ICE9IGVkaXRvci5nZXRWYWx1ZSgpKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbiAgICBpZiAobWV0ZXJDb25maWd1cmF0aW9uID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNjMsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gNjMsIG92ZXJmbG93OiAnaGlkZGVuJywgcGFkZGluZzogMTUgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMj57cHJvcHMuTWV0ZXJLZXl9IC0gQ29uZmlndXJhdGlvbiBSZXZpc2lvbjoge21ldGVyQ29uZmlndXJhdGlvbi5SZXZpc2lvbk1ham9yICsgJy4nICsgbWV0ZXJDb25maWd1cmF0aW9uLlJldmlzaW9uTWlub3J9PC9oMj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtdGFic1wiPlxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtcIm5hdi1saW5rXCIgKyAodGFiID09IFwiY29uZmlndXJhdGlvblwiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdjb25maWd1cmF0aW9uJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNjb25maWd1cmF0aW9uXCI+Q29uZmlndXJhdGlvbjwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJmaWxlc1Byb2Nlc3NlZFwiID8gXCIgYWN0aXZlXCIgOiBcIlwiKX0gb25DbGljaz17KCkgPT4gc2V0VGFiKCdmaWxlc1Byb2Nlc3NlZCcpfSBkYXRhLXRvZ2dsZT1cInRhYlwiIGhyZWY9XCIjZmlsZXNQcm9jZXNzZWRcIj5GaWxlcyBQcm9jZXNzZWQ8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItY29udGVudFwiIHN0eWxlPXt7IG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjM1LCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJjb25maWd1cmF0aW9uXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJjb25maWd1cmF0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInRlbXBsYXRlXCIgc3R5bGU9e3sgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyNzUgfX0gPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3NhdmVFZGl0fSBkaXNhYmxlZD17IWNoYW5nZWR9PlNhdmUgRWRpdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWdyb3VwIG1yLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBwdWxsLXJpZ2h0XCIgb25DbGljaz17Z2V0RGF0YX0gZGlzYWJsZWQ9eyFjaGFuZ2VkfT5SZXNldDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0YWItcGFuZSBcIiArICh0YWIgPT0gXCJmaWxlc1Byb2Nlc3NlZFwiID8gXCIgYWN0aXZlXCIgOiBcImZhZGVcIil9IGlkPVwiZmlsZXNQcm9jZXNzZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMjc1LCBwYWRkaW5nOiAzMCwgb3ZlcmZsb3dZOiAnYXV0bycgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9J3RhYmxlJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+PHRkPkZpbGUgUGF0aDwvdGQ+PHRkPkNyZWF0aW9uIFRpbWU8L3RkPjwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWxlc1Byb2Nlc3NlZC5tYXAoKGEsIGkpID0+IDx0ciBrZXk9e2l9Pjx0ZD57YS5GaWxlUGF0aH08L3RkPjx0ZD57YS5DcmVhdGlvblRpbWV9PC90ZD48L3RyPil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0aW9uSGlzdG9yeTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==