(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~ByCompany"],{

/***/ "../../node_modules/@gpa-gemstone/common-pages/lib/Setting.js":
/*!************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/common-pages/lib/Setting.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  Setting.tsx - Gbtc
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
//  04/28/2021 - C. Lackner
//       Generated original version of source code.
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var react_forms_1 = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
var react_table_1 = __webpack_require__(/*! @gpa-gemstone/react-table */ "../../node_modules/@gpa-gemstone/react-table/lib/index.js");
var gpa_symbols_1 = __webpack_require__(/*! @gpa-gemstone/gpa-symbols */ "../../node_modules/@gpa-gemstone/gpa-symbols/lib/index.js");
var react_interactive_1 = __webpack_require__(/*! @gpa-gemstone/react-interactive */ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js");
function Setting(props) {
    var _a = React.useState([]), search = _a[0], setSearch = _a[1];
    var _b = React.useState('Idle'), searchState = _b[0], setSearchState = _b[1];
    var _c = React.useState([]), data = _c[0], setData = _c[1];
    var _d = React.useState('Name'), sortField = _d[0], setSortField = _d[1];
    var _e = React.useState(true), ascending = _e[0], setAscending = _e[1];
    var _f = React.useState(props.getNewSetting()), editnewSetting = _f[0], setEditNewSetting = _f[1];
    var _g = React.useState('New'), editNew = _g[0], setEditNew = _g[1];
    var _h = React.useState(false), showModal = _h[0], setShowModal = _h[1];
    var _j = React.useState(false), showWarning = _j[0], setShowWarning = _j[1];
    var _k = React.useState(false), hasChanged = _k[0], setHasChanged = _k[1];
    var _l = React.useState(0), triggerReload = _l[0], setTriggerReload = _l[1];
    React.useEffect(function () {
        setEditNewSetting(props.getNewSetting());
    }, []);
    React.useEffect(function () {
        setSearchState('Loading');
        var handle = props.searchSetting(search, ascending, sortField);
        handle.done(function (d) { setData(JSON.parse(d)); setSearchState('Idle'); });
        handle.fail(function (msg) { return setSearchState('Error'); });
        return function () { if (handle != null && handle.abort != null)
            handle.abort(); };
    }, [search, ascending, sortField, triggerReload]);
    React.useEffect(function () { setHasChanged(false); }, [showModal]);
    function isValidSetting() {
        return editnewSetting != null && editnewSetting.Name != null && editnewSetting.Name.length > 0
            && editnewSetting.Value != null && editnewSetting.Value.length > 0;
    }
    var searchFields = [
        { key: 'Name', label: 'Name', type: 'string' },
        { key: 'DefaultValue', label: 'Default Value', type: 'string' },
        { key: 'Value', label: 'Value', type: 'string' }
    ];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { width: '100%', height: '100%' } },
            React.createElement(react_interactive_1.SearchBar, { CollumnList: searchFields, SetFilter: function (flds) { return setSearch(flds); }, Direction: 'left', defaultCollumn: { key: 'Name', label: 'Name', type: 'string' }, Width: '50%', Label: 'Search', ShowLoading: searchState === 'Loading', ResultNote: searchState === 'Error' ? 'Could not complete Search' : 'Found ' + data.length + ' Settings', GetEnum: function (setOptions, field) {
                    return function () {
                        // do nothing.
                    };
                } },
                React.createElement("li", { className: "nav-item", style: { width: '15%', paddingRight: 10 } },
                    React.createElement("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                        React.createElement("legend", { className: "w-auto", style: { fontSize: 'large' } }, "Actions:"),
                        React.createElement("form", null,
                            React.createElement("button", { className: "btn btn-primary", onClick: function (event) { setEditNewSetting(props.getNewSetting()); setEditNew('New'); setShowModal(true); event.preventDefault(); } }, "Add Setting"))))),
            React.createElement("div", { style: { width: '100%', height: 'calc( 100% - 136px)' } },
                React.createElement(react_table_1.default, { cols: [
                        { key: 'Name', label: 'Setting Name', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'Value', label: 'Current Value', headerStyle: { width: '10%' }, rowStyle: { width: '10%' } },
                        { key: 'DefaultValue', label: 'Default Value', headerStyle: { width: '20%' }, rowStyle: { width: '20%' } },
                        { key: null, label: '', headerStyle: { width: 17, padding: 0 }, rowStyle: { width: 0, padding: 0 } },
                    ], tableClass: "table table-hover", data: data, sortField: sortField, ascending: ascending, onSort: function (d) {
                        if (d.col === sortField)
                            setAscending(!ascending);
                        else {
                            setAscending(true);
                            setSortField(d.col);
                        }
                    }, onClick: function (item) { setEditNewSetting(item.row); setShowModal(true); setEditNew('Edit'); }, theadStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, tbodyStyle: { display: 'block', overflowY: 'scroll', maxHeight: window.innerHeight - 300, width: '100%' }, rowStyle: { fontSize: 'smaller', display: 'table', tableLayout: 'fixed', width: '100%' }, selected: function (item) { return false; } }))),
        React.createElement(react_interactive_1.Modal, { Title: editNew === 'Edit' ? editnewSetting.Name + ' - Setting' : 'Add New Setting', Show: showModal, ShowX: true, Size: 'lg', ShowCancel: editNew === 'Edit', ConfirmText: 'Save', CallBack: function (conf, isBtn) {
                if (conf && editNew === 'New')
                    props.addSetting(editnewSetting).then(function (d) { return setTriggerReload(function (x) { return x + 1; }); });
                if (conf && editNew === 'Edit')
                    props.updateSetting(editnewSetting).then(function (d) { return setTriggerReload(function (x) { return x + 1; }); });
                if (!conf && isBtn)
                    setShowWarning(true);
                setShowModal(false);
            }, DisableConfirm: (editNew === 'Edit' && !hasChanged) || !isValidSetting(), ConfirmShowToolTip: !isValidSetting(), ConfirmToolTipContent: [
                editnewSetting.Name == null || editnewSetting.Name.length === 0 ? React.createElement("p", { key: 1 },
                    gpa_symbols_1.CrossMark,
                    " A Name is required.") : null,
                editnewSetting.Value == null || editnewSetting.Value.length === 0 ? React.createElement("p", { key: 2 },
                    gpa_symbols_1.CrossMark,
                    " A Value is required. ") : null,
            ] },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col" },
                    React.createElement(react_forms_1.Input, { Record: editnewSetting, Field: 'Name', Label: 'Setting Name', Feedback: 'A unique Name is required.', Valid: function (field) { return editnewSetting.Name != null && editnewSetting.Name.length > 0; }, Setter: function (record) { setEditNewSetting(record); setHasChanged(true); } }),
                    React.createElement(react_forms_1.Input, { Record: editnewSetting, Field: 'Value', Label: 'Value', Feedback: 'Value is required.', Valid: function (field) { return editnewSetting.Value != null && editnewSetting.Value.length > 0; }, Setter: function (record) { setEditNewSetting(record); setHasChanged(true); } }),
                    React.createElement(react_forms_1.Input, { Record: editnewSetting, Field: 'DefaultValue', Label: 'Default Value', Valid: function (field) { return true; }, Setter: function (record) { setEditNewSetting(record); setHasChanged(true); } })))),
        React.createElement(react_interactive_1.Warning, { Title: 'Delete Setting', Message: 'This will Delete this Setting from the System. this can have unintended consequences and cause the System to crash are you Sure you want to continue?.', Show: showWarning, CallBack: function (conf) { if (conf)
                props.deleteSetting(editnewSetting).then(function (d) { return setTriggerReload(function (x) { return x + 1; }); }); setShowWarning(false); } })));
}
exports.default = Setting;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/common-pages/lib/index.js":
/*!**********************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/common-pages/lib/index.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  index.tsx - Gbtc
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
//  12/29/2020 - C. Lackner Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
var Setting_1 = __webpack_require__(/*! ./Setting */ "../../node_modules/@gpa-gemstone/common-pages/lib/Setting.js");
exports.Setting = Setting_1.default;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/gpa-symbols/lib/index.js":
/*!*********************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/gpa-symbols/lib/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RightArrow = exports.LeftArrow = exports.PlayButton = exports.Scroll = exports.FourWayArrow = exports.House = exports.MagnifyingGlass = exports.InputNumbers = exports.DNA = exports.DownArrow = exports.UpArrow = exports.Flag = exports.Wrench = exports.Spinner = exports.Warning = exports.Plus = exports.CrossMark = exports.TrashCan = exports.Pencil = exports.HeavyCheckMark = void 0;
// ******************************************************************************************************
//  index.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
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
//  09/30/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var HeavyCheckMark = '✔️';
exports.HeavyCheckMark = HeavyCheckMark;
var Pencil = '✏️';
exports.Pencil = Pencil;
var TrashCan = '🗑️';
exports.TrashCan = TrashCan;
var CrossMark = '❌';
exports.CrossMark = CrossMark;
var Plus = '➕';
exports.Plus = Plus;
var Warning = '⚠️';
exports.Warning = Warning;
var Spinner = '🔄';
exports.Spinner = Spinner;
var Wrench = '🔧';
exports.Wrench = Wrench;
var Flag = '🚩';
exports.Flag = Flag;
var UpArrow = '⬆️';
exports.UpArrow = UpArrow;
var LeftArrow = '⬅';
exports.LeftArrow = LeftArrow;
var RightArrow = '➡';
exports.RightArrow = RightArrow;
var DownArrow = '⬇️';
exports.DownArrow = DownArrow;
var DNA = '🧬';
exports.DNA = DNA;
var InputNumbers = '🔢';
exports.InputNumbers = InputNumbers;
var FourWayArrow = '☩';
exports.FourWayArrow = FourWayArrow;
var MagnifyingGlass = '🔍';
exports.MagnifyingGlass = MagnifyingGlass;
var House = '🏠';
exports.House = House;
var Scroll = '📜';
exports.Scroll = Scroll;
var PlayButton = '▶️';
exports.PlayButton = PlayButton;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2NvbW1vbi1wYWdlcy9saWIvU2V0dGluZy5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2NvbW1vbi1wYWdlcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9ncGEtc3ltYm9scy9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxZQUFZLG1CQUFPLENBQUMsb0JBQU87QUFDM0Isb0JBQW9CLG1CQUFPLENBQUMsNEZBQTJCO0FBQ3ZELG9CQUFvQixtQkFBTyxDQUFDLDRGQUEyQjtBQUN2RCxvQkFBb0IsbUJBQU8sQ0FBQyw0RkFBMkI7QUFDdkQsMEJBQTBCLG1CQUFPLENBQUMsd0dBQWlDO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHdCQUF3Qix3QkFBd0IsRUFBRTtBQUNwRixvQ0FBb0MsZ0NBQWdDLEVBQUU7QUFDdEUsNEJBQTRCO0FBQzVCLDJCQUEyQjtBQUMz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OiJ2ZW5kb3JzfkJ5Q29tcGFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFNldHRpbmcudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA0LzI4LzIwMjEgLSBDLiBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbnZhciByZWFjdF9mb3Jtc18xID0gcmVxdWlyZShcIkBncGEtZ2Vtc3RvbmUvcmVhY3QtZm9ybXNcIik7XHJcbnZhciByZWFjdF90YWJsZV8xID0gcmVxdWlyZShcIkBncGEtZ2Vtc3RvbmUvcmVhY3QtdGFibGVcIik7XHJcbnZhciBncGFfc3ltYm9sc18xID0gcmVxdWlyZShcIkBncGEtZ2Vtc3RvbmUvZ3BhLXN5bWJvbHNcIik7XHJcbnZhciByZWFjdF9pbnRlcmFjdGl2ZV8xID0gcmVxdWlyZShcIkBncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmVcIik7XHJcbmZ1bmN0aW9uIFNldHRpbmcocHJvcHMpIHtcclxuICAgIHZhciBfYSA9IFJlYWN0LnVzZVN0YXRlKFtdKSwgc2VhcmNoID0gX2FbMF0sIHNldFNlYXJjaCA9IF9hWzFdO1xyXG4gICAgdmFyIF9iID0gUmVhY3QudXNlU3RhdGUoJ0lkbGUnKSwgc2VhcmNoU3RhdGUgPSBfYlswXSwgc2V0U2VhcmNoU3RhdGUgPSBfYlsxXTtcclxuICAgIHZhciBfYyA9IFJlYWN0LnVzZVN0YXRlKFtdKSwgZGF0YSA9IF9jWzBdLCBzZXREYXRhID0gX2NbMV07XHJcbiAgICB2YXIgX2QgPSBSZWFjdC51c2VTdGF0ZSgnTmFtZScpLCBzb3J0RmllbGQgPSBfZFswXSwgc2V0U29ydEZpZWxkID0gX2RbMV07XHJcbiAgICB2YXIgX2UgPSBSZWFjdC51c2VTdGF0ZSh0cnVlKSwgYXNjZW5kaW5nID0gX2VbMF0sIHNldEFzY2VuZGluZyA9IF9lWzFdO1xyXG4gICAgdmFyIF9mID0gUmVhY3QudXNlU3RhdGUocHJvcHMuZ2V0TmV3U2V0dGluZygpKSwgZWRpdG5ld1NldHRpbmcgPSBfZlswXSwgc2V0RWRpdE5ld1NldHRpbmcgPSBfZlsxXTtcclxuICAgIHZhciBfZyA9IFJlYWN0LnVzZVN0YXRlKCdOZXcnKSwgZWRpdE5ldyA9IF9nWzBdLCBzZXRFZGl0TmV3ID0gX2dbMV07XHJcbiAgICB2YXIgX2ggPSBSZWFjdC51c2VTdGF0ZShmYWxzZSksIHNob3dNb2RhbCA9IF9oWzBdLCBzZXRTaG93TW9kYWwgPSBfaFsxXTtcclxuICAgIHZhciBfaiA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKSwgc2hvd1dhcm5pbmcgPSBfalswXSwgc2V0U2hvd1dhcm5pbmcgPSBfalsxXTtcclxuICAgIHZhciBfayA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKSwgaGFzQ2hhbmdlZCA9IF9rWzBdLCBzZXRIYXNDaGFuZ2VkID0gX2tbMV07XHJcbiAgICB2YXIgX2wgPSBSZWFjdC51c2VTdGF0ZSgwKSwgdHJpZ2dlclJlbG9hZCA9IF9sWzBdLCBzZXRUcmlnZ2VyUmVsb2FkID0gX2xbMV07XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNldEVkaXROZXdTZXR0aW5nKHByb3BzLmdldE5ld1NldHRpbmcoKSk7XHJcbiAgICB9LCBbXSk7XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNldFNlYXJjaFN0YXRlKCdMb2FkaW5nJyk7XHJcbiAgICAgICAgdmFyIGhhbmRsZSA9IHByb3BzLnNlYXJjaFNldHRpbmcoc2VhcmNoLCBhc2NlbmRpbmcsIHNvcnRGaWVsZCk7XHJcbiAgICAgICAgaGFuZGxlLmRvbmUoZnVuY3Rpb24gKGQpIHsgc2V0RGF0YShKU09OLnBhcnNlKGQpKTsgc2V0U2VhcmNoU3RhdGUoJ0lkbGUnKTsgfSk7XHJcbiAgICAgICAgaGFuZGxlLmZhaWwoZnVuY3Rpb24gKG1zZykgeyByZXR1cm4gc2V0U2VhcmNoU3RhdGUoJ0Vycm9yJyk7IH0pO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IGlmIChoYW5kbGUgIT0gbnVsbCAmJiBoYW5kbGUuYWJvcnQgIT0gbnVsbClcclxuICAgICAgICAgICAgaGFuZGxlLmFib3J0KCk7IH07XHJcbiAgICB9LCBbc2VhcmNoLCBhc2NlbmRpbmcsIHNvcnRGaWVsZCwgdHJpZ2dlclJlbG9hZF0pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHsgc2V0SGFzQ2hhbmdlZChmYWxzZSk7IH0sIFtzaG93TW9kYWxdKTtcclxuICAgIGZ1bmN0aW9uIGlzVmFsaWRTZXR0aW5nKCkge1xyXG4gICAgICAgIHJldHVybiBlZGl0bmV3U2V0dGluZyAhPSBudWxsICYmIGVkaXRuZXdTZXR0aW5nLk5hbWUgIT0gbnVsbCAmJiBlZGl0bmV3U2V0dGluZy5OYW1lLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgJiYgZWRpdG5ld1NldHRpbmcuVmFsdWUgIT0gbnVsbCAmJiBlZGl0bmV3U2V0dGluZy5WYWx1ZS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG4gICAgdmFyIHNlYXJjaEZpZWxkcyA9IFtcclxuICAgICAgICB7IGtleTogJ05hbWUnLCBsYWJlbDogJ05hbWUnLCB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgIHsga2V5OiAnRGVmYXVsdFZhbHVlJywgbGFiZWw6ICdEZWZhdWx0IFZhbHVlJywgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB7IGtleTogJ1ZhbHVlJywgbGFiZWw6ICdWYWx1ZScsIHR5cGU6ICdzdHJpbmcnIH1cclxuICAgIF07XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH0gfSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChyZWFjdF9pbnRlcmFjdGl2ZV8xLlNlYXJjaEJhciwgeyBDb2xsdW1uTGlzdDogc2VhcmNoRmllbGRzLCBTZXRGaWx0ZXI6IGZ1bmN0aW9uIChmbGRzKSB7IHJldHVybiBzZXRTZWFyY2goZmxkcyk7IH0sIERpcmVjdGlvbjogJ2xlZnQnLCBkZWZhdWx0Q29sbHVtbjogeyBrZXk6ICdOYW1lJywgbGFiZWw6ICdOYW1lJywgdHlwZTogJ3N0cmluZycgfSwgV2lkdGg6ICc1MCUnLCBMYWJlbDogJ1NlYXJjaCcsIFNob3dMb2FkaW5nOiBzZWFyY2hTdGF0ZSA9PT0gJ0xvYWRpbmcnLCBSZXN1bHROb3RlOiBzZWFyY2hTdGF0ZSA9PT0gJ0Vycm9yJyA/ICdDb3VsZCBub3QgY29tcGxldGUgU2VhcmNoJyA6ICdGb3VuZCAnICsgZGF0YS5sZW5ndGggKyAnIFNldHRpbmdzJywgR2V0RW51bTogZnVuY3Rpb24gKHNldE9wdGlvbnMsIGZpZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZy5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsgY2xhc3NOYW1lOiBcIm5hdi1pdGVtXCIsIHN0eWxlOiB7IHdpZHRoOiAnMTUlJywgcGFkZGluZ1JpZ2h0OiAxMCB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIsIHsgY2xhc3NOYW1lOiBcImJvcmRlclwiLCBzdHlsZTogeyBwYWRkaW5nOiAnMTBweCcsIGhlaWdodDogJzEwMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxlZ2VuZFwiLCB7IGNsYXNzTmFtZTogXCJ3LWF1dG9cIiwgc3R5bGU6IHsgZm9udFNpemU6ICdsYXJnZScgfSB9LCBcIkFjdGlvbnM6XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJidG4gYnRuLXByaW1hcnlcIiwgb25DbGljazogZnVuY3Rpb24gKGV2ZW50KSB7IHNldEVkaXROZXdTZXR0aW5nKHByb3BzLmdldE5ld1NldHRpbmcoKSk7IHNldEVkaXROZXcoJ05ldycpOyBzZXRTaG93TW9kYWwodHJ1ZSk7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH0gfSwgXCJBZGQgU2V0dGluZ1wiKSkpKSksXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICdjYWxjKCAxMDAlIC0gMTM2cHgpJyB9IH0sXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KHJlYWN0X3RhYmxlXzEuZGVmYXVsdCwgeyBjb2xzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnTmFtZScsIGxhYmVsOiAnU2V0dGluZyBOYW1lJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAnMTAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiAnVmFsdWUnLCBsYWJlbDogJ0N1cnJlbnQgVmFsdWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzEwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcxMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6ICdEZWZhdWx0VmFsdWUnLCBsYWJlbDogJ0RlZmF1bHQgVmFsdWUnLCBoZWFkZXJTdHlsZTogeyB3aWR0aDogJzIwJScgfSwgcm93U3R5bGU6IHsgd2lkdGg6ICcyMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG51bGwsIGxhYmVsOiAnJywgaGVhZGVyU3R5bGU6IHsgd2lkdGg6IDE3LCBwYWRkaW5nOiAwIH0sIHJvd1N0eWxlOiB7IHdpZHRoOiAwLCBwYWRkaW5nOiAwIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICBdLCB0YWJsZUNsYXNzOiBcInRhYmxlIHRhYmxlLWhvdmVyXCIsIGRhdGE6IGRhdGEsIHNvcnRGaWVsZDogc29ydEZpZWxkLCBhc2NlbmRpbmc6IGFzY2VuZGluZywgb25Tb3J0OiBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5jb2wgPT09IHNvcnRGaWVsZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFzY2VuZGluZyghYXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBc2NlbmRpbmcodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTb3J0RmllbGQoZC5jb2wpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgb25DbGljazogZnVuY3Rpb24gKGl0ZW0pIHsgc2V0RWRpdE5ld1NldHRpbmcoaXRlbS5yb3cpOyBzZXRTaG93TW9kYWwodHJ1ZSk7IHNldEVkaXROZXcoJ0VkaXQnKTsgfSwgdGhlYWRTdHlsZTogeyBmb250U2l6ZTogJ3NtYWxsZXInLCBkaXNwbGF5OiAndGFibGUnLCB0YWJsZUxheW91dDogJ2ZpeGVkJywgd2lkdGg6ICcxMDAlJyB9LCB0Ym9keVN0eWxlOiB7IGRpc3BsYXk6ICdibG9jaycsIG92ZXJmbG93WTogJ3Njcm9sbCcsIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gMzAwLCB3aWR0aDogJzEwMCUnIH0sIHJvd1N0eWxlOiB7IGZvbnRTaXplOiAnc21hbGxlcicsIGRpc3BsYXk6ICd0YWJsZScsIHRhYmxlTGF5b3V0OiAnZml4ZWQnLCB3aWR0aDogJzEwMCUnIH0sIHNlbGVjdGVkOiBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gZmFsc2U7IH0gfSkpKSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KHJlYWN0X2ludGVyYWN0aXZlXzEuTW9kYWwsIHsgVGl0bGU6IGVkaXROZXcgPT09ICdFZGl0JyA/IGVkaXRuZXdTZXR0aW5nLk5hbWUgKyAnIC0gU2V0dGluZycgOiAnQWRkIE5ldyBTZXR0aW5nJywgU2hvdzogc2hvd01vZGFsLCBTaG93WDogdHJ1ZSwgU2l6ZTogJ2xnJywgU2hvd0NhbmNlbDogZWRpdE5ldyA9PT0gJ0VkaXQnLCBDb25maXJtVGV4dDogJ1NhdmUnLCBDYWxsQmFjazogZnVuY3Rpb24gKGNvbmYsIGlzQnRuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZiAmJiBlZGl0TmV3ID09PSAnTmV3JylcclxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5hZGRTZXR0aW5nKGVkaXRuZXdTZXR0aW5nKS50aGVuKGZ1bmN0aW9uIChkKSB7IHJldHVybiBzZXRUcmlnZ2VyUmVsb2FkKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICsgMTsgfSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmYgJiYgZWRpdE5ldyA9PT0gJ0VkaXQnKVxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLnVwZGF0ZVNldHRpbmcoZWRpdG5ld1NldHRpbmcpLnRoZW4oZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHNldFRyaWdnZXJSZWxvYWQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggKyAxOyB9KTsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbmYgJiYgaXNCdG4pXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0U2hvd1dhcm5pbmcodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRTaG93TW9kYWwoZmFsc2UpO1xyXG4gICAgICAgICAgICB9LCBEaXNhYmxlQ29uZmlybTogKGVkaXROZXcgPT09ICdFZGl0JyAmJiAhaGFzQ2hhbmdlZCkgfHwgIWlzVmFsaWRTZXR0aW5nKCksIENvbmZpcm1TaG93VG9vbFRpcDogIWlzVmFsaWRTZXR0aW5nKCksIENvbmZpcm1Ub29sVGlwQ29udGVudDogW1xyXG4gICAgICAgICAgICAgICAgZWRpdG5ld1NldHRpbmcuTmFtZSA9PSBudWxsIHx8IGVkaXRuZXdTZXR0aW5nLk5hbWUubGVuZ3RoID09PSAwID8gUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgeyBrZXk6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICBncGFfc3ltYm9sc18xLkNyb3NzTWFyayxcclxuICAgICAgICAgICAgICAgICAgICBcIiBBIE5hbWUgaXMgcmVxdWlyZWQuXCIpIDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGVkaXRuZXdTZXR0aW5nLlZhbHVlID09IG51bGwgfHwgZWRpdG5ld1NldHRpbmcuVmFsdWUubGVuZ3RoID09PSAwID8gUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgeyBrZXk6IDIgfSxcclxuICAgICAgICAgICAgICAgICAgICBncGFfc3ltYm9sc18xLkNyb3NzTWFyayxcclxuICAgICAgICAgICAgICAgICAgICBcIiBBIFZhbHVlIGlzIHJlcXVpcmVkLiBcIikgOiBudWxsLFxyXG4gICAgICAgICAgICBdIH0sXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicm93XCIgfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiY29sXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KHJlYWN0X2Zvcm1zXzEuSW5wdXQsIHsgUmVjb3JkOiBlZGl0bmV3U2V0dGluZywgRmllbGQ6ICdOYW1lJywgTGFiZWw6ICdTZXR0aW5nIE5hbWUnLCBGZWVkYmFjazogJ0EgdW5pcXVlIE5hbWUgaXMgcmVxdWlyZWQuJywgVmFsaWQ6IGZ1bmN0aW9uIChmaWVsZCkgeyByZXR1cm4gZWRpdG5ld1NldHRpbmcuTmFtZSAhPSBudWxsICYmIGVkaXRuZXdTZXR0aW5nLk5hbWUubGVuZ3RoID4gMDsgfSwgU2V0dGVyOiBmdW5jdGlvbiAocmVjb3JkKSB7IHNldEVkaXROZXdTZXR0aW5nKHJlY29yZCk7IHNldEhhc0NoYW5nZWQodHJ1ZSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChyZWFjdF9mb3Jtc18xLklucHV0LCB7IFJlY29yZDogZWRpdG5ld1NldHRpbmcsIEZpZWxkOiAnVmFsdWUnLCBMYWJlbDogJ1ZhbHVlJywgRmVlZGJhY2s6ICdWYWx1ZSBpcyByZXF1aXJlZC4nLCBWYWxpZDogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiBlZGl0bmV3U2V0dGluZy5WYWx1ZSAhPSBudWxsICYmIGVkaXRuZXdTZXR0aW5nLlZhbHVlLmxlbmd0aCA+IDA7IH0sIFNldHRlcjogZnVuY3Rpb24gKHJlY29yZCkgeyBzZXRFZGl0TmV3U2V0dGluZyhyZWNvcmQpOyBzZXRIYXNDaGFuZ2VkKHRydWUpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3RfZm9ybXNfMS5JbnB1dCwgeyBSZWNvcmQ6IGVkaXRuZXdTZXR0aW5nLCBGaWVsZDogJ0RlZmF1bHRWYWx1ZScsIExhYmVsOiAnRGVmYXVsdCBWYWx1ZScsIFZhbGlkOiBmdW5jdGlvbiAoZmllbGQpIHsgcmV0dXJuIHRydWU7IH0sIFNldHRlcjogZnVuY3Rpb24gKHJlY29yZCkgeyBzZXRFZGl0TmV3U2V0dGluZyhyZWNvcmQpOyBzZXRIYXNDaGFuZ2VkKHRydWUpOyB9IH0pKSkpLFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3RfaW50ZXJhY3RpdmVfMS5XYXJuaW5nLCB7IFRpdGxlOiAnRGVsZXRlIFNldHRpbmcnLCBNZXNzYWdlOiAnVGhpcyB3aWxsIERlbGV0ZSB0aGlzIFNldHRpbmcgZnJvbSB0aGUgU3lzdGVtLiB0aGlzIGNhbiBoYXZlIHVuaW50ZW5kZWQgY29uc2VxdWVuY2VzIGFuZCBjYXVzZSB0aGUgU3lzdGVtIHRvIGNyYXNoIGFyZSB5b3UgU3VyZSB5b3Ugd2FudCB0byBjb250aW51ZT8uJywgU2hvdzogc2hvd1dhcm5pbmcsIENhbGxCYWNrOiBmdW5jdGlvbiAoY29uZikgeyBpZiAoY29uZilcclxuICAgICAgICAgICAgICAgIHByb3BzLmRlbGV0ZVNldHRpbmcoZWRpdG5ld1NldHRpbmcpLnRoZW4oZnVuY3Rpb24gKGQpIHsgcmV0dXJuIHNldFRyaWdnZXJSZWxvYWQoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggKyAxOyB9KTsgfSk7IHNldFNob3dXYXJuaW5nKGZhbHNlKTsgfSB9KSkpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFNldHRpbmc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIGluZGV4LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAxMi8yOS8yMDIwIC0gQy4gTGFja25lciBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuU2V0dGluZyA9IHZvaWQgMDtcclxudmFyIFNldHRpbmdfMSA9IHJlcXVpcmUoXCIuL1NldHRpbmdcIik7XHJcbmV4cG9ydHMuU2V0dGluZyA9IFNldHRpbmdfMS5kZWZhdWx0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmlnaHRBcnJvdyA9IGV4cG9ydHMuTGVmdEFycm93ID0gZXhwb3J0cy5QbGF5QnV0dG9uID0gZXhwb3J0cy5TY3JvbGwgPSBleHBvcnRzLkZvdXJXYXlBcnJvdyA9IGV4cG9ydHMuSG91c2UgPSBleHBvcnRzLk1hZ25pZnlpbmdHbGFzcyA9IGV4cG9ydHMuSW5wdXROdW1iZXJzID0gZXhwb3J0cy5ETkEgPSBleHBvcnRzLkRvd25BcnJvdyA9IGV4cG9ydHMuVXBBcnJvdyA9IGV4cG9ydHMuRmxhZyA9IGV4cG9ydHMuV3JlbmNoID0gZXhwb3J0cy5TcGlubmVyID0gZXhwb3J0cy5XYXJuaW5nID0gZXhwb3J0cy5QbHVzID0gZXhwb3J0cy5Dcm9zc01hcmsgPSBleHBvcnRzLlRyYXNoQ2FuID0gZXhwb3J0cy5QZW5jaWwgPSBleHBvcnRzLkhlYXZ5Q2hlY2tNYXJrID0gdm9pZCAwO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgaW5kZXgudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDkvMzAvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG52YXIgSGVhdnlDaGVja01hcmsgPSAn4pyU77iPJztcbmV4cG9ydHMuSGVhdnlDaGVja01hcmsgPSBIZWF2eUNoZWNrTWFyaztcbnZhciBQZW5jaWwgPSAn4pyP77iPJztcbmV4cG9ydHMuUGVuY2lsID0gUGVuY2lsO1xudmFyIFRyYXNoQ2FuID0gJ/Cfl5HvuI8nO1xuZXhwb3J0cy5UcmFzaENhbiA9IFRyYXNoQ2FuO1xudmFyIENyb3NzTWFyayA9ICfinYwnO1xuZXhwb3J0cy5Dcm9zc01hcmsgPSBDcm9zc01hcms7XG52YXIgUGx1cyA9ICfinpUnO1xuZXhwb3J0cy5QbHVzID0gUGx1cztcbnZhciBXYXJuaW5nID0gJ+KaoO+4jyc7XG5leHBvcnRzLldhcm5pbmcgPSBXYXJuaW5nO1xudmFyIFNwaW5uZXIgPSAn8J+UhCc7XG5leHBvcnRzLlNwaW5uZXIgPSBTcGlubmVyO1xudmFyIFdyZW5jaCA9ICfwn5SnJztcbmV4cG9ydHMuV3JlbmNoID0gV3JlbmNoO1xudmFyIEZsYWcgPSAn8J+aqSc7XG5leHBvcnRzLkZsYWcgPSBGbGFnO1xudmFyIFVwQXJyb3cgPSAn4qyG77iPJztcbmV4cG9ydHMuVXBBcnJvdyA9IFVwQXJyb3c7XG52YXIgTGVmdEFycm93ID0gJ+KshSc7XG5leHBvcnRzLkxlZnRBcnJvdyA9IExlZnRBcnJvdztcbnZhciBSaWdodEFycm93ID0gJ+KeoSc7XG5leHBvcnRzLlJpZ2h0QXJyb3cgPSBSaWdodEFycm93O1xudmFyIERvd25BcnJvdyA9ICfirIfvuI8nO1xuZXhwb3J0cy5Eb3duQXJyb3cgPSBEb3duQXJyb3c7XG52YXIgRE5BID0gJ/Cfp6wnO1xuZXhwb3J0cy5ETkEgPSBETkE7XG52YXIgSW5wdXROdW1iZXJzID0gJ/CflKInO1xuZXhwb3J0cy5JbnB1dE51bWJlcnMgPSBJbnB1dE51bWJlcnM7XG52YXIgRm91cldheUFycm93ID0gJ+KYqSc7XG5leHBvcnRzLkZvdXJXYXlBcnJvdyA9IEZvdXJXYXlBcnJvdztcbnZhciBNYWduaWZ5aW5nR2xhc3MgPSAn8J+UjSc7XG5leHBvcnRzLk1hZ25pZnlpbmdHbGFzcyA9IE1hZ25pZnlpbmdHbGFzcztcbnZhciBIb3VzZSA9ICfwn4+gJztcbmV4cG9ydHMuSG91c2UgPSBIb3VzZTtcbnZhciBTY3JvbGwgPSAn8J+TnCc7XG5leHBvcnRzLlNjcm9sbCA9IFNjcm9sbDtcbnZhciBQbGF5QnV0dG9uID0gJ+KWtu+4jyc7XG5leHBvcnRzLlBsYXlCdXR0b24gPSBQbGF5QnV0dG9uO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==