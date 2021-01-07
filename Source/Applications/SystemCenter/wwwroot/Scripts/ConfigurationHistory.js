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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9UU1gvU3lzdGVtQ2VudGVyL0NvbmZpZ3VyYXRpb25IaXN0b3J5L0NvbmZpZ3VyYXRpb25IaXN0b3J5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3R0FBd0c7QUFDeEcsb0JBQW9CO0FBQ3BCLEVBQUU7QUFDRixxRUFBcUU7QUFDckUsRUFBRTtBQUNGLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDeEcsc0dBQXNHO0FBQ3RHLHdGQUF3RjtBQUN4RixFQUFFO0FBQ0YsMENBQTBDO0FBQzFDLEVBQUU7QUFDRix3R0FBd0c7QUFDeEcsd0dBQXdHO0FBQ3hHLDRFQUE0RTtBQUM1RSxFQUFFO0FBQ0YsOEJBQThCO0FBQzlCLHdHQUF3RztBQUN4Ryw2QkFBNkI7QUFDN0IsbURBQW1EO0FBQ25ELEVBQUU7QUFDRix3R0FBd0c7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXpFO0FBQ0g7QUFFa0I7QUFJOUMsU0FBUyxvQkFBb0IsQ0FBQyxLQUF5RDtJQUNuRixJQUFNLE9BQU8sR0FBRyxtRUFBVSxFQUFFLENBQUM7SUFDdkIsd0VBQThGLEVBQTdGLDBCQUFrQixFQUFFLDZCQUF5RSxDQUFDO0lBQy9GLG1GQUFtRixFQUFsRixXQUFHLEVBQUUsY0FBNkUsQ0FBQztJQUNwRixzRUFBaUYsRUFBaEYsc0JBQWMsRUFBRSx5QkFBZ0UsQ0FBQztJQUNsRix5RUFBc0QsRUFBckQsZUFBTyxFQUFFLGtCQUE0QyxDQUFDO0lBQzdELHFEQUFxQixDQUFDLGNBQU0sY0FBTyxFQUFFLEVBQVQsQ0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztJQUVyRSxTQUFTLE9BQU87UUFDWixpQkFBaUIsRUFBRSxDQUFDO1FBQ3BCLHFCQUFxQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFNBQVMscUJBQXFCO1FBQzNCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNULElBQUksRUFBRSxLQUFLO1lBQ1osR0FBRyxFQUFLLFFBQVEsMkNBQXNDLEtBQUssQ0FBQyxvQkFBc0I7WUFDakYsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLLEVBQUUsS0FBSztZQUNaLEtBQUssRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDWCxxQkFBcUIsQ0FBQyxNQUFNLENBQUM7WUFDN0IsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTFCLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELFNBQVMsaUJBQWlCO1FBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLEdBQUcsRUFBSyxRQUFRLHVDQUFrQyxLQUFLLENBQUMsb0JBQW9CLG9CQUFpQjtZQUM3RixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxLQUFLO1lBQ1osS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBNkIsSUFBSyx3QkFBaUIsQ0FBRSxJQUFJLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxTQUFTLFFBQVE7UUFDYixJQUFJLFNBQVMsR0FBK0IsNENBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hFLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2RCxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUssUUFBUSx1Q0FBb0M7WUFDcEQsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxRQUFRLEVBQUUsTUFBTTtZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDL0IsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFnQyxJQUFLLGNBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUssUUFBUSxpQkFBYyxFQUFFLE1BQU0sRUFBRSx5Q0FBdUMsS0FBSyxDQUFDLFFBQVEsOEJBQXlCLElBQUksQ0FBQyxFQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQWpLLENBQWlLLENBQUMsQ0FBQztJQUNyTixDQUFDO0lBR0QsU0FBUyxhQUFhLENBQUMsTUFBa0M7UUFDckQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQUs7WUFDN0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUlELElBQUksa0JBQWtCLElBQUksSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzVDLE9BQU8sQ0FDSCw2REFBSyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQy9ILDZEQUFLLFNBQVMsRUFBQyxLQUFLO1lBQ2hCLDZEQUFLLFNBQVMsRUFBQyxLQUFLO2dCQUNoQjtvQkFBSyxLQUFLLENBQUMsUUFBUTs7b0JBQTZCLGtCQUFrQixDQUFDLGFBQWEsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsYUFBYSxDQUFNLENBQzdILENBQ0o7UUFHTiwrREFBTTtRQUNOLDREQUFJLFNBQVMsRUFBQyxjQUFjO1lBQ3hCLDREQUFJLFNBQVMsRUFBQyxVQUFVO2dCQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBTSxhQUFNLENBQUMsZUFBZSxDQUFDLEVBQXZCLENBQXVCLGlCQUFjLEtBQUssRUFBQyxJQUFJLEVBQUMsZ0JBQWdCLG9CQUFrQixDQUN0SztZQUNMLDREQUFJLFNBQVMsRUFBQyxVQUFVO2dCQUNwQiwyREFBRyxTQUFTLEVBQUUsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFNLGFBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUF4QixDQUF3QixpQkFBYyxLQUFLLEVBQUMsSUFBSSxFQUFDLGlCQUFpQixzQkFBb0IsQ0FDM0ssQ0FDSjtRQUVMLDZEQUFLLFNBQVMsRUFBQyxhQUFhLEVBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7WUFDM0YsNkRBQUssU0FBUyxFQUFFLFdBQVcsR0FBRyxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLGVBQWU7Z0JBQzNGLDZEQUFLLEVBQUUsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLEdBQVM7Z0JBQ3ZFLDZEQUFLLFNBQVMsRUFBQyxnQkFBZ0I7b0JBQzNCLGdFQUFRLFNBQVMsRUFBQyw0QkFBNEIsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLE9BQU8sZ0JBQW9CLENBQ3RHO2dCQUNOLDZEQUFLLFNBQVMsRUFBQyxnQkFBZ0I7b0JBQzNCLGdFQUFRLFNBQVMsRUFBQywyQkFBMkIsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLE9BQU8sWUFBZ0IsQ0FDaEcsQ0FDSjtZQUNOLDZEQUFLLFNBQVMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLGdCQUFnQjtnQkFDN0YsNkRBQUssS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO29CQUM5RiwrREFBTyxTQUFTLEVBQUMsT0FBTzt3QkFDcEI7NEJBQ0k7Z0NBQUksNEVBQWtCO2dDQUFBLGdGQUFzQixDQUFLLENBQzdDO3dCQUNSLG1FQUNLLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLG1FQUFJLEdBQUcsRUFBRSxDQUFDOzRCQUFFLGdFQUFLLENBQUMsQ0FBQyxRQUFRLENBQU07NEJBQUEsZ0VBQUssQ0FBQyxDQUFDLFlBQVksQ0FBTSxDQUFLLEVBQS9ELENBQStELENBQUMsQ0FDMUYsQ0FDSixDQUVOLENBQ0osQ0FDSixDQUNKLENBQ1Q7QUFDTCxDQUFDO0FBRWMsbUZBQW9CLEVBQUMiLCJmaWxlIjoiQ29uZmlndXJhdGlvbkhpc3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTWV0ZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMTksIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA4LzI3LzIwMTkgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgT3BlblhEQSB9IGZyb20gJy4uL2dsb2JhbCc7XHJcbmltcG9ydCB7IHVzZUhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuZGVjbGFyZSB2YXIgaG9tZVBhdGg6IHN0cmluZztcclxuZGVjbGFyZSB2YXIgYWNlOiBhbnk7XHJcblxyXG5mdW5jdGlvbiBDb25maWd1cmF0aW9uSGlzdG9yeShwcm9wczogeyBNZXRlckNvbmZpZ3VyYXRpb25JRDogbnVtYmVyLCBNZXRlcktleTogc3RyaW5nIH0pIHtcclxuICAgIGNvbnN0IGhpc3RvcnkgPSB1c2VIaXN0b3J5KCk7XHJcbiAgICBjb25zdCBbbWV0ZXJDb25maWd1cmF0aW9uLCBzZXRNZXRlckNvbmZpZ3VyYXRpb25dID0gUmVhY3QudXNlU3RhdGU8T3BlblhEQS5NZXRlckNvbmZpZ3VyYXRpb24+KG51bGwpO1xyXG4gICAgY29uc3QgW3RhYiwgc2V0VGFiXSA9IFJlYWN0LnVzZVN0YXRlPCdjb25maWd1cmF0aW9uJyB8ICdmaWxlc1Byb2Nlc3NlZCc+KCdjb25maWd1cmF0aW9uJyk7XHJcbiAgICBjb25zdCBbZmlsZXNQcm9jZXNzZWQsIHNldEZpbGVzUHJvY2Vzc2VkXSA9IFJlYWN0LnVzZVN0YXRlPEFycmF5PE9wZW5YREEuRGF0YUZpbGU+PihbXSk7XHJcbiAgICBjb25zdCBbY2hhbmdlZCwgc2V0Q2hhbmdlZF0gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XHJcbiAgICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4gZ2V0RGF0YSgpLCBbcHJvcHMuTWV0ZXJDb25maWd1cmF0aW9uSURdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gICAgICAgIGdldEZpbGVzUHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgZ2V0TWV0ZXJDb25maWd1cmF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TWV0ZXJDb25maWd1cmF0aW9uKCk6IFByb21pc2U8T3BlblhEQS5NZXRlckNvbmZpZ3VyYXRpb24+IHtcclxuICAgICAgIHJldHVybiAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL09wZW5YREEvTWV0ZXJDb25maWd1cmF0aW9uL09uZS8ke3Byb3BzLk1ldGVyQ29uZmlndXJhdGlvbklEfWAsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBhc3luYzogdHJ1ZVxyXG4gICAgICAgfSkuZG9uZSgocmVjb3JkKSA9PiB7XHJcbiAgICAgICAgICAgc2V0TWV0ZXJDb25maWd1cmF0aW9uKHJlY29yZClcclxuICAgICAgICAgICBpbml0aWFsaXplQWNlKHJlY29yZCk7XHJcblxyXG4gICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RmlsZXNQcm9jZXNzZWQoKTogdm9pZCB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBgJHtob21lUGF0aH1hcGkvT3BlblhEQS9NZXRlckNvbmZpZ3VyYXRpb24vJHtwcm9wcy5NZXRlckNvbmZpZ3VyYXRpb25JRH0vRmlsZXNQcm9jZXNzZWRgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChkYXRhOiBBcnJheTxPcGVuWERBLkRhdGFGaWxlPikgPT4gc2V0RmlsZXNQcm9jZXNzZWQoIGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzYXZlRWRpdCgpOiB2b2lke1xyXG4gICAgICAgIGxldCBuZXdSZWNvcmQ6IE9wZW5YREEuTWV0ZXJDb25maWd1cmF0aW9uID0gXy5jbG9uZShtZXRlckNvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgIG5ld1JlY29yZC5JRCA9IDA7XHJcbiAgICAgICAgbmV3UmVjb3JkLkNvbmZpZ1RleHQgPSBhY2UuZWRpdCgndGVtcGxhdGUnKS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIG5ld1JlY29yZC5EaWZmSUQgPSBudWxsO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IGAke2hvbWVQYXRofWFwaS9PcGVuWERBL01ldGVyQ29uZmlndXJhdGlvbi9BZGRgLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG5ld1JlY29yZCksXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXN5bmM6IHRydWVcclxuICAgICAgICB9KS5kb25lKChkYXRhOiBPcGVuWERBLk1ldGVyQ29uZmlndXJhdGlvbikgPT4gaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGAke2hvbWVQYXRofWluZGV4LmNzaHRtbGAsIHNlYXJjaDogYD9uYW1lPUNvbmZpZ3VyYXRpb25IaXN0b3J5Jk1ldGVyS2V5PSR7cHJvcHMuTWV0ZXJLZXl9Jk1ldGVyQ29uZmlndXJhdGlvbklEPSR7ZGF0YS5JRH1gLCBzdGF0ZToge30gfSkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplQWNlKHJlY29yZDogT3BlblhEQS5NZXRlckNvbmZpZ3VyYXRpb24pIHtcclxuICAgICAgICBsZXQgZWRpdG9yID0gYWNlLmVkaXQoXCJ0ZW1wbGF0ZVwiKTtcclxuICAgICAgICBlZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUoXCJhY2UvbW9kZS94bWxcIik7XHJcbiAgICAgICAgZWRpdG9yLnNldEZvbnRTaXplKFwiMTRweFwiKTtcclxuICAgICAgICBlZGl0b3Iuc2V0VmFsdWUocmVjb3JkLkNvbmZpZ1RleHQpO1xyXG4gICAgICAgIGVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgICAgIGVkaXRvci5nb3RvTGluZSgwKTtcclxuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5vZmYoJ2NoYW5nZScpO1xyXG4gICAgICAgIGVkaXRvci5zZXNzaW9uLm9uKCdjaGFuZ2UnLCBkZWx0YSA9PiB7XHJcbiAgICAgICAgICAgIHNldENoYW5nZWQocmVjb3JkLkNvbmZpZ1RleHQgIT0gZWRpdG9yLmdldFZhbHVlKCkpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIGlmIChtZXRlckNvbmZpZ3VyYXRpb24gPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2MywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2Mywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwYWRkaW5nOiAxNSB9fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgyPntwcm9wcy5NZXRlcktleX0gLSBDb25maWd1cmF0aW9uIFJldmlzaW9uOiB7bWV0ZXJDb25maWd1cmF0aW9uLlJldmlzaW9uTWFqb3IgKyAnLicgKyBtZXRlckNvbmZpZ3VyYXRpb24uUmV2aXNpb25NaW5vcn08L2gyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgPGhyIC8+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e1wibmF2LWxpbmtcIiArICh0YWIgPT0gXCJjb25maWd1cmF0aW9uXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2NvbmZpZ3VyYXRpb24nKX0gZGF0YS10b2dnbGU9XCJ0YWJcIiBocmVmPVwiI2NvbmZpZ3VyYXRpb25cIj5Db25maWd1cmF0aW9uPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17XCJuYXYtbGlua1wiICsgKHRhYiA9PSBcImZpbGVzUHJvY2Vzc2VkXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpfSBvbkNsaWNrPXsoKSA9PiBzZXRUYWIoJ2ZpbGVzUHJvY2Vzc2VkJyl9IGRhdGEtdG9nZ2xlPVwidGFiXCIgaHJlZj1cIiNmaWxlc1Byb2Nlc3NlZFwiPkZpbGVzIFByb2Nlc3NlZDwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCIgc3R5bGU9e3sgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMzUsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImNvbmZpZ3VyYXRpb25cIiA/IFwiIGFjdGl2ZVwiIDogXCJmYWRlXCIpfSBpZD1cImNvbmZpZ3VyYXRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidGVtcGxhdGVcIiBzdHlsZT17eyBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAtIDI3NSB9fSA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17c2F2ZUVkaXR9IGRpc2FibGVkPXshY2hhbmdlZH0+U2F2ZSBFZGl0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG4tZ3JvdXAgbXItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyIHB1bGwtcmlnaHRcIiBvbkNsaWNrPXtnZXREYXRhfSBkaXNhYmxlZD17IWNoYW5nZWR9PlJlc2V0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRhYi1wYW5lIFwiICsgKHRhYiA9PSBcImZpbGVzUHJvY2Vzc2VkXCIgPyBcIiBhY3RpdmVcIiA6IFwiZmFkZVwiKX0gaWQ9XCJmaWxlc1Byb2Nlc3NlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWF4SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyNzUsIHBhZGRpbmc6IDMwLCBvdmVyZmxvd1k6ICdhdXRvJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT0ndGFibGUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj48dGQ+RmlsZSBQYXRoPC90ZD48dGQ+Q3JlYXRpb24gVGltZTwvdGQ+PC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2ZpbGVzUHJvY2Vzc2VkLm1hcCgoYSwgaSkgPT4gPHRyIGtleT17aX0+PHRkPnthLkZpbGVQYXRofTwvdGQ+PHRkPnthLkNyZWF0aW9uVGltZX08L3RkPjwvdHI+KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRpb25IaXN0b3J5O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9