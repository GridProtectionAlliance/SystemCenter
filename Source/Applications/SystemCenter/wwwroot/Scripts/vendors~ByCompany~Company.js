(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~ByCompany~Company"],{

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/ArrayCheckBoxes.js":
/*!*************************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/ArrayCheckBoxes.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  ArrayCheckBoxes.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var __assign = (this && this.__assign) || function () {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
function ArrayCheckBoxes(props) {
    var Remove = function (cb) {
        var a = __spreadArrays(props.Record[props.Field]);
        var i = a.indexOf(cb.ID);
        a.splice(i, 1);
        return a;
    };
    var Add = function (cb) {
        var a = __spreadArrays(props.Record[props.Field]);
        var i = a.indexOf(cb.ID);
        if (i < 0)
            a.push(cb.ID);
        a.sort();
        return a;
    };
    return (React.createElement("div", { className: "form-group" },
        React.createElement("label", null, props.Label == null ? props.Field : props.Label),
        React.createElement("br", null),
        props.Checkboxes.map(function (cb, i) { return (React.createElement("div", { key: i, className: "form-check form-check-inline" },
            React.createElement("input", { className: "form-check-input", type: "checkbox", checked: props.Record[props.Field].find(function (x) { return cb.ID === x; }) !== undefined, onChange: function (evt) {
                    var _a;
                    return props.Setter(__assign(__assign({}, props.Record), (_a = {}, _a[props.Field] = evt.target.checked ? Add(cb) : Remove(cb), _a)));
                } }),
            React.createElement("label", { className: "form-check-label" }, cb.Label))); })));
}
exports.default = ArrayCheckBoxes;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/ArrayMultiSelect.js":
/*!**************************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/ArrayMultiSelect.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  ArrayMultiSelect.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
function ArrayMultiSelect(props) {
    var _a;
    return (React.createElement("div", { className: "form-group" },
        React.createElement("label", null, props.Label == null ? props.Field : props.Label),
        React.createElement("select", { multiple: true, className: "form-control", onChange: function (evt) {
                var _a;
                var record = __assign(__assign({}, props.Record), (_a = {}, _a[props.Field] = Array.from(evt.target.selectedOptions).map(function (a) { return parseInt(a.value, 10); }), _a));
                props.Setter(record);
            }, value: (_a = props.Record[props.Field]) !== null && _a !== void 0 ? _a : [], disabled: props.Disabled == null ? false : props.Disabled, style: props.Style }, props.Options.map(function (a, i) { return (React.createElement("option", { key: i, value: a.Value }, a.Label)); }))));
}
exports.default = ArrayMultiSelect;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/CheckBox.js":
/*!******************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/CheckBox.js ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  CheckBox.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var __extends = (this && this.__extends) || (function () {
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
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var CheckBox = /** @class */ (function (_super) {
    __extends(CheckBox, _super);
    function CheckBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckBox.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "form-check" },
            React.createElement("input", { type: "checkbox", className: "form-check-input", style: { zIndex: 1 }, onChange: function (evt) {
                    var record = __assign({}, _this.props.Record);
                    record[_this.props.Field] = evt.target.checked;
                    _this.props.Setter(record);
                }, value: this.props.Record[this.props.Field] ? 'on' : 'off', checked: this.props.Record[this.props.Field] ? true : false, disabled: this.props.Disabled == null ? false : this.props.Disabled }),
            React.createElement("label", { className: "form-check-label" }, this.props.Label == null ? this.props.Field : this.props.Label)));
    };
    return CheckBox;
}(React.Component));
exports.default = CheckBox;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/DatePicker.js":
/*!********************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/DatePicker.js ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  DatePicker.tsx - Gbtc
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
//  02/05/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var __extends = (this && this.__extends) || (function () {
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
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePicker.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "form-group" },
            React.createElement("label", null, this.props.Label == null ? this.props.Field : this.props.Label),
            React.createElement("input", { className: "form-control", type: "date", onChange: function (evt) {
                    var record = __assign({}, _this.props.Record);
                    if (evt.target.value !== '')
                        record[_this.props.Field] = evt.target.value;
                    else
                        record[_this.props.Field] = null;
                    _this.props.Setter(record);
                }, value: this.props.Record[this.props.Field] == null ? '' : this.props.Record[this.props.Field].toString(), disabled: this.props.Disabled == null ? false : this.props.Disabled })));
    };
    return DatePicker;
}(React.Component));
exports.default = DatePicker;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/DateRangePicker.js":
/*!*************************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/DateRangePicker.js ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  DateRangePicker.tsx - Gbtc
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
//  02/05/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
function DateRangePicker(props) {
    var _a = React.useState('Custom'), range = _a[0], setRange = _a[1];
    function UpdateRange(evt) {
        var _a;
        setRange(evt.target.value);
        var days = 0;
        if (evt.target.value === 'Custom')
            return;
        else if (evt.target.value === '1 Day')
            days = 1;
        else if (evt.target.value === '7 Days')
            days = 7;
        else if (evt.target.value === '30 Days')
            days = 30;
        else if (evt.target.value === '90 Days')
            days = 90;
        else if (evt.target.value === '180 Days')
            days = 180;
        else if (evt.target.value === '365 Days')
            days = 365;
        var f = new Date();
        f.setDate(f.getDate() - days);
        props.Setter(__assign(__assign({}, props.Record), (_a = {}, _a[props.FromField] = f.getFullYear() + "-" + (f.getMonth() + 1)
            .toString()
            .padStart(2, '0') + "-" + f.getDate().toString().padStart(2, '0'), _a[props.ToField] = new Date().getFullYear() + "-" + (new Date().getMonth() + 1)
            .toString()
            .padStart(2, '0') + "-" + new Date().getDate().toString().padStart(2, '0'), _a)));
    }
    return (React.createElement("div", { className: "form-group" },
        React.createElement("label", null, props.Label),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col" },
                React.createElement("select", { className: "form-control", value: range, onChange: UpdateRange },
                    React.createElement("option", { value: "Custom" }, "Custom"),
                    React.createElement("option", { value: "1 Day" }, "1 Day"),
                    React.createElement("option", { value: "7 Days" }, "7 Days"),
                    React.createElement("option", { value: "30 Days" }, "30 Days"),
                    React.createElement("option", { value: "90 Days" }, "90 Days"),
                    React.createElement("option", { value: "180 Days" }, "180 Days"),
                    React.createElement("option", { value: "365 Days" }, "365 Days"))),
            React.createElement("div", { className: "col" },
                React.createElement("input", { className: "form-control", type: "date", onChange: function (evt) {
                        var _a;
                        var record = __assign(__assign({}, props.Record), (_a = {}, _a[props.FromField] = evt.target.value !== '' ? evt.target.value : null, _a));
                        props.Setter(record);
                    }, value: props.Record[props.FromField] == null ? '' : props.Record[props.FromField].toString(), disabled: props.Disabled == null ? false : props.Disabled })),
            React.createElement("div", { className: "col" },
                React.createElement("input", { className: "form-control", type: "date", onChange: function (evt) {
                        var _a;
                        var record = __assign(__assign({}, props.Record), (_a = {}, _a[props.ToField] = evt.target.value !== '' ? evt.target.value : null, _a));
                        props.Setter(record);
                    }, value: props.Record[props.ToField] == null ? '' : props.Record[props.ToField].toString(), disabled: props.Disabled == null ? false : props.Disabled })))));
}
exports.default = DateRangePicker;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/EnumCheckBoxes.js":
/*!************************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/EnumCheckBoxes.js ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  EnumCheckBoxes.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
function EnumCheckBoxes(props) {
    /* tslint:disable-next-line:no-bitwise */
    var EquateFlag = function (index) { return ((props.Record[props.Field] / Math.pow(2, index)) & 1) !== 0; };
    var DecrementFlag = function (index) { return props.Record[props.Field] - Math.pow(2, index); };
    var IncrementFlag = function (index) { return props.Record[props.Field] + Math.pow(2, index); };
    return (React.createElement("div", { className: "form-group" },
        React.createElement("label", null, props.Label == null ? props.Field : props.Label),
        React.createElement("br", null),
        props.Enum.map(function (flag, i) { return (React.createElement("div", { key: i, className: "form-check form-check-inline" },
            React.createElement("input", { className: "form-check-input", type: "checkbox", checked: EquateFlag(i), onChange: function (evt) {
                    var _a;
                    return props.Setter(__assign(__assign({}, props.Record), (_a = {}, _a[props.Field] = evt.target.checked ? IncrementFlag(i) : DecrementFlag(i), _a)));
                } }),
            React.createElement("label", { className: "form-check-label" }, flag))); })));
}
exports.default = EnumCheckBoxes;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/Input.js":
/*!***************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/Input.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  Input.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
function Input(props) {
    return (React.createElement("div", { className: "form-group" },
        React.createElement("label", null, props.Label == null ? props.Field : props.Label),
        React.createElement("input", { type: props.Type === undefined ? 'text' : props.Type, className: props.Valid(props.Field) ? 'form-control' : 'form-control is-invalid', onChange: function (evt) {
                var _a;
                return props.Setter(__assign(__assign({}, props.Record), (_a = {}, _a[props.Field] = evt.target.value !== '' ? evt.target.value : null, _a)));
            }, value: props.Record[props.Field] == null ? '' : props.Record[props.Field].toString(), disabled: props.Disabled == null ? false : props.Disabled }),
        React.createElement("div", { className: "invalid-feedback" }, props.Feedback == null ? props.Field + ' is a required field.' : props.Feedback)));
}
exports.default = Input;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/Select.js":
/*!****************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/Select.js ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  Select.tsx - Gbtc
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
//  01/28/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
function Select(props) {
    return (React.createElement("div", { className: "form-group" },
        React.createElement("label", null, props.Label == null ? props.Field : props.Label),
        React.createElement("select", { className: "form-control", onChange: function (evt) {
                var record = __assign({}, props.Record);
                if (evt.target.value !== '')
                    record[props.Field] = evt.target.value;
                else
                    record[props.Field] = null;
                props.Setter(record);
            }, value: props.Record[props.Field] == null ? '' : props.Record[props.Field].toString(), disabled: props.Disabled == null ? false : props.Disabled },
            props.EmptyOption ? React.createElement("option", { value: "" }) : null,
            props.Options.map(function (a, i) { return (React.createElement("option", { key: i, value: a.Value }, a.Label)); }))));
}
exports.default = Select;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/TextArea.js":
/*!******************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/TextArea.js ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
// ******************************************************************************************************
//  TextArea.tsx - Gbtc
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
//  01/22/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var React = __webpack_require__(/*! react */ "react");
function TextArea(props) {
    return (React.createElement("div", { className: "form-group" },
        React.createElement("label", null, props.Label == null ? props.Field : props.Label),
        React.createElement("textarea", { rows: props.Rows, className: props.Valid(props.Field) ? 'form-control' : 'form-control is-invalid', onChange: function (evt) {
                var record = __assign({}, props.Record);
                if (evt.target.value !== '')
                    record[props.Field] = evt.target.value;
                else
                    record[props.Field] = null;
                props.Setter(record);
            }, value: props.Record[props.Field] == null ? '' : props.Record[props.Field].toString(), disabled: props.Disabled == null ? false : props.Disabled }),
        React.createElement("div", { className: "invalid-feedback" }, props.Feedback == null ? props.Field + ' is a required field.' : props.Feedback)));
}
exports.default = TextArea;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js":
/*!***************************************************************************************************************************************!*\
  !*** C:/Users/bernest/Source/Repos/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/index.js ***!
  \***************************************************************************************************************************************/
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
//  09/25/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayCheckBoxes = exports.ArrayMultiSelect = exports.EnumCheckBoxes = exports.DateRangePicker = exports.TextArea = exports.Select = exports.DatePicker = exports.Input = exports.CheckBox = void 0;
var CheckBox_1 = __webpack_require__(/*! ./CheckBox */ "../../node_modules/@gpa-gemstone/react-forms/lib/CheckBox.js");
exports.CheckBox = CheckBox_1.default;
var Input_1 = __webpack_require__(/*! ./Input */ "../../node_modules/@gpa-gemstone/react-forms/lib/Input.js");
exports.Input = Input_1.default;
var DatePicker_1 = __webpack_require__(/*! ./DatePicker */ "../../node_modules/@gpa-gemstone/react-forms/lib/DatePicker.js");
exports.DatePicker = DatePicker_1.default;
var Select_1 = __webpack_require__(/*! ./Select */ "../../node_modules/@gpa-gemstone/react-forms/lib/Select.js");
exports.Select = Select_1.default;
var TextArea_1 = __webpack_require__(/*! ./TextArea */ "../../node_modules/@gpa-gemstone/react-forms/lib/TextArea.js");
exports.TextArea = TextArea_1.default;
var DateRangePicker_1 = __webpack_require__(/*! ./DateRangePicker */ "../../node_modules/@gpa-gemstone/react-forms/lib/DateRangePicker.js");
exports.DateRangePicker = DateRangePicker_1.default;
var EnumCheckBoxes_1 = __webpack_require__(/*! ./EnumCheckBoxes */ "../../node_modules/@gpa-gemstone/react-forms/lib/EnumCheckBoxes.js");
exports.EnumCheckBoxes = EnumCheckBoxes_1.default;
var ArrayMultiSelect_1 = __webpack_require__(/*! ./ArrayMultiSelect */ "../../node_modules/@gpa-gemstone/react-forms/lib/ArrayMultiSelect.js");
exports.ArrayMultiSelect = ArrayMultiSelect_1.default;
var ArrayCheckBoxes_1 = __webpack_require__(/*! ./ArrayCheckBoxes */ "../../node_modules/@gpa-gemstone/react-forms/lib/ArrayCheckBoxes.js");
exports.ArrayCheckBoxes = ArrayCheckBoxes_1.default;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vQzovVXNlcnMvYmVybmVzdC9Tb3VyY2UvUmVwb3MvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9BcnJheUNoZWNrQm94ZXMuanMiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL2Jlcm5lc3QvU291cmNlL1JlcG9zL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1mb3Jtcy9saWIvQXJyYXlNdWx0aVNlbGVjdC5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvYmVybmVzdC9Tb3VyY2UvUmVwb3MvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9DaGVja0JveC5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvYmVybmVzdC9Tb3VyY2UvUmVwb3MvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9EYXRlUGlja2VyLmpzIiwid2VicGFjazovLy9DOi9Vc2Vycy9iZXJuZXN0L1NvdXJjZS9SZXBvcy9TeXN0ZW1DZW50ZXIvU291cmNlL0FwcGxpY2F0aW9ucy9TeXN0ZW1DZW50ZXIvbm9kZV9tb2R1bGVzL0BncGEtZ2Vtc3RvbmUvcmVhY3QtZm9ybXMvbGliL0RhdGVSYW5nZVBpY2tlci5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvYmVybmVzdC9Tb3VyY2UvUmVwb3MvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9FbnVtQ2hlY2tCb3hlcy5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvYmVybmVzdC9Tb3VyY2UvUmVwb3MvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9JbnB1dC5qcyIsIndlYnBhY2s6Ly8vQzovVXNlcnMvYmVybmVzdC9Tb3VyY2UvUmVwb3MvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9TZWxlY3QuanMiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL2Jlcm5lc3QvU291cmNlL1JlcG9zL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1mb3Jtcy9saWIvVGV4dEFyZWEuanMiLCJ3ZWJwYWNrOi8vL0M6L1VzZXJzL2Jlcm5lc3QvU291cmNlL1JlcG9zL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1mb3Jtcy9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsUUFBUTtBQUN6RCx3Q0FBd0MsUUFBUTtBQUNoRCx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FB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QUNqQztBQUNBLGlCQUFpQixtQkFBTyxDQUFDLGdGQUFZO0FBQ3JDO0FBQ0Esd0JBQXdCLG1CQUFPLENBQUMsOEZBQW1CO0FBQ25EO0FBQ0EsdUJBQXVCLG1CQUFPLENBQUMsNEZBQWtCO0FBQ2pEO0FBQ0EseUJBQXlCLG1CQUFPLENBQUMsZ0dBQW9CO0FBQ3JEO0FBQ0Esd0JBQXdCLG1CQUFPLENBQUMsOEZBQW1CO0FBQ25EIiwiZmlsZSI6InZlbmRvcnN+QnlDb21wYW55fkNvbXBhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIEFycmF5Q2hlY2tCb3hlcy50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX19zcHJlYWRBcnJheXMgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXlzKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xuICAgIHJldHVybiByO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmZ1bmN0aW9uIEFycmF5Q2hlY2tCb3hlcyhwcm9wcykge1xuICAgIHZhciBSZW1vdmUgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdmFyIGEgPSBfX3NwcmVhZEFycmF5cyhwcm9wcy5SZWNvcmRbcHJvcHMuRmllbGRdKTtcbiAgICAgICAgdmFyIGkgPSBhLmluZGV4T2YoY2IuSUQpO1xuICAgICAgICBhLnNwbGljZShpLCAxKTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfTtcbiAgICB2YXIgQWRkID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHZhciBhID0gX19zcHJlYWRBcnJheXMocHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXSk7XG4gICAgICAgIHZhciBpID0gYS5pbmRleE9mKGNiLklEKTtcbiAgICAgICAgaWYgKGkgPCAwKVxuICAgICAgICAgICAgYS5wdXNoKGNiLklEKTtcbiAgICAgICAgYS5zb3J0KCk7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgcHJvcHMuTGFiZWwgPT0gbnVsbCA/IHByb3BzLkZpZWxkIDogcHJvcHMuTGFiZWwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnJcIiwgbnVsbCksXG4gICAgICAgIHByb3BzLkNoZWNrYm94ZXMubWFwKGZ1bmN0aW9uIChjYiwgaSkgeyByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBrZXk6IGksIGNsYXNzTmFtZTogXCJmb3JtLWNoZWNrIGZvcm0tY2hlY2staW5saW5lXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWNoZWNrLWlucHV0XCIsIHR5cGU6IFwiY2hlY2tib3hcIiwgY2hlY2tlZDogcHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXS5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiBjYi5JRCA9PT0geDsgfSkgIT09IHVuZGVmaW5lZCwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHMuU2V0dGVyKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcm9wcy5SZWNvcmQpLCAoX2EgPSB7fSwgX2FbcHJvcHMuRmllbGRdID0gZXZ0LnRhcmdldC5jaGVja2VkID8gQWRkKGNiKSA6IFJlbW92ZShjYiksIF9hKSkpO1xuICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jaGVjay1sYWJlbFwiIH0sIGNiLkxhYmVsKSkpOyB9KSkpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gQXJyYXlDaGVja0JveGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBBcnJheU11bHRpU2VsZWN0LnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzIyLzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmZ1bmN0aW9uIEFycmF5TXVsdGlTZWxlY3QocHJvcHMpIHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgcHJvcHMuTGFiZWwgPT0gbnVsbCA/IHByb3BzLkZpZWxkIDogcHJvcHMuTGFiZWwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHsgbXVsdGlwbGU6IHRydWUsIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIiwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcm9wcy5SZWNvcmQpLCAoX2EgPSB7fSwgX2FbcHJvcHMuRmllbGRdID0gQXJyYXkuZnJvbShldnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKGZ1bmN0aW9uIChhKSB7IHJldHVybiBwYXJzZUludChhLnZhbHVlLCAxMCk7IH0pLCBfYSkpO1xuICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihyZWNvcmQpO1xuICAgICAgICAgICAgfSwgdmFsdWU6IChfYSA9IHByb3BzLlJlY29yZFtwcm9wcy5GaWVsZF0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdLCBkaXNhYmxlZDogcHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogcHJvcHMuRGlzYWJsZWQsIHN0eWxlOiBwcm9wcy5TdHlsZSB9LCBwcm9wcy5PcHRpb25zLm1hcChmdW5jdGlvbiAoYSwgaSkgeyByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyBrZXk6IGksIHZhbHVlOiBhLlZhbHVlIH0sIGEuTGFiZWwpKTsgfSkpKSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBBcnJheU11bHRpU2VsZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBDaGVja0JveC50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBDaGVja0JveCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ2hlY2tCb3gsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2hlY2tCb3goKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgQ2hlY2tCb3gucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2tcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjbGFzc05hbWU6IFwiZm9ybS1jaGVjay1pbnB1dFwiLCBzdHlsZTogeyB6SW5kZXg6IDEgfSwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9fYXNzaWduKHt9LCBfdGhpcy5wcm9wcy5SZWNvcmQpO1xuICAgICAgICAgICAgICAgICAgICByZWNvcmRbX3RoaXMucHJvcHMuRmllbGRdID0gZXZ0LnRhcmdldC5jaGVja2VkO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcm9wcy5TZXR0ZXIocmVjb3JkKTtcbiAgICAgICAgICAgICAgICB9LCB2YWx1ZTogdGhpcy5wcm9wcy5SZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPyAnb24nIDogJ29mZicsIGNoZWNrZWQ6IHRoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID8gdHJ1ZSA6IGZhbHNlLCBkaXNhYmxlZDogdGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkIH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2stbGFiZWxcIiB9LCB0aGlzLnByb3BzLkxhYmVsID09IG51bGwgPyB0aGlzLnByb3BzLkZpZWxkIDogdGhpcy5wcm9wcy5MYWJlbCkpKTtcbiAgICB9O1xuICAgIHJldHVybiBDaGVja0JveDtcbn0oUmVhY3QuQ29tcG9uZW50KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBDaGVja0JveDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgRGF0ZVBpY2tlci50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMi8wNS8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBEYXRlUGlja2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEYXRlUGlja2VyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERhdGVQaWNrZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgRGF0ZVBpY2tlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1ncm91cFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy5MYWJlbCA9PSBudWxsID8gdGhpcy5wcm9wcy5GaWVsZCA6IHRoaXMucHJvcHMuTGFiZWwpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwiLCB0eXBlOiBcImRhdGVcIiwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9fYXNzaWduKHt9LCBfdGhpcy5wcm9wcy5SZWNvcmQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRbX3RoaXMucHJvcHMuRmllbGRdID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkW190aGlzLnByb3BzLkZpZWxkXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnByb3BzLlNldHRlcihyZWNvcmQpO1xuICAgICAgICAgICAgICAgIH0sIHZhbHVlOiB0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXSA9PSBudWxsID8gJycgOiB0aGlzLnByb3BzLlJlY29yZFt0aGlzLnByb3BzLkZpZWxkXS50b1N0cmluZygpLCBkaXNhYmxlZDogdGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkIH0pKSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGF0ZVBpY2tlcjtcbn0oUmVhY3QuQ29tcG9uZW50KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBEYXRlUGlja2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBEYXRlUmFuZ2VQaWNrZXIudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDIvMDUvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuZnVuY3Rpb24gRGF0ZVJhbmdlUGlja2VyKHByb3BzKSB7XG4gICAgdmFyIF9hID0gUmVhY3QudXNlU3RhdGUoJ0N1c3RvbScpLCByYW5nZSA9IF9hWzBdLCBzZXRSYW5nZSA9IF9hWzFdO1xuICAgIGZ1bmN0aW9uIFVwZGF0ZVJhbmdlKGV2dCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHNldFJhbmdlKGV2dC50YXJnZXQudmFsdWUpO1xuICAgICAgICB2YXIgZGF5cyA9IDA7XG4gICAgICAgIGlmIChldnQudGFyZ2V0LnZhbHVlID09PSAnQ3VzdG9tJylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZSBpZiAoZXZ0LnRhcmdldC52YWx1ZSA9PT0gJzEgRGF5JylcbiAgICAgICAgICAgIGRheXMgPSAxO1xuICAgICAgICBlbHNlIGlmIChldnQudGFyZ2V0LnZhbHVlID09PSAnNyBEYXlzJylcbiAgICAgICAgICAgIGRheXMgPSA3O1xuICAgICAgICBlbHNlIGlmIChldnQudGFyZ2V0LnZhbHVlID09PSAnMzAgRGF5cycpXG4gICAgICAgICAgICBkYXlzID0gMzA7XG4gICAgICAgIGVsc2UgaWYgKGV2dC50YXJnZXQudmFsdWUgPT09ICc5MCBEYXlzJylcbiAgICAgICAgICAgIGRheXMgPSA5MDtcbiAgICAgICAgZWxzZSBpZiAoZXZ0LnRhcmdldC52YWx1ZSA9PT0gJzE4MCBEYXlzJylcbiAgICAgICAgICAgIGRheXMgPSAxODA7XG4gICAgICAgIGVsc2UgaWYgKGV2dC50YXJnZXQudmFsdWUgPT09ICczNjUgRGF5cycpXG4gICAgICAgICAgICBkYXlzID0gMzY1O1xuICAgICAgICB2YXIgZiA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGYuc2V0RGF0ZShmLmdldERhdGUoKSAtIGRheXMpO1xuICAgICAgICBwcm9wcy5TZXR0ZXIoX19hc3NpZ24oX19hc3NpZ24oe30sIHByb3BzLlJlY29yZCksIChfYSA9IHt9LCBfYVtwcm9wcy5Gcm9tRmllbGRdID0gZi5nZXRGdWxsWWVhcigpICsgXCItXCIgKyAoZi5nZXRNb250aCgpICsgMSlcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAucGFkU3RhcnQoMiwgJzAnKSArIFwiLVwiICsgZi5nZXREYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpLCBfYVtwcm9wcy5Ub0ZpZWxkXSA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArIFwiLVwiICsgKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnBhZFN0YXJ0KDIsICcwJykgKyBcIi1cIiArIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKSwgX2EpKSk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWdyb3VwXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHByb3BzLkxhYmVsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyb3dcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJjb2xcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sXCIsIHZhbHVlOiByYW5nZSwgb25DaGFuZ2U6IFVwZGF0ZVJhbmdlIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJDdXN0b21cIiB9LCBcIkN1c3RvbVwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIjEgRGF5XCIgfSwgXCIxIERheVwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIjcgRGF5c1wiIH0sIFwiNyBEYXlzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6IFwiMzAgRGF5c1wiIH0sIFwiMzAgRGF5c1wiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIjkwIERheXNcIiB9LCBcIjkwIERheXNcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogXCIxODAgRGF5c1wiIH0sIFwiMTgwIERheXNcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogXCIzNjUgRGF5c1wiIH0sIFwiMzY1IERheXNcIikpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiY29sXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sXCIsIHR5cGU6IFwiZGF0ZVwiLCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcm9wcy5SZWNvcmQpLCAoX2EgPSB7fSwgX2FbcHJvcHMuRnJvbUZpZWxkXSA9IGV2dC50YXJnZXQudmFsdWUgIT09ICcnID8gZXZ0LnRhcmdldC52YWx1ZSA6IG51bGwsIF9hKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIocmVjb3JkKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdmFsdWU6IHByb3BzLlJlY29yZFtwcm9wcy5Gcm9tRmllbGRdID09IG51bGwgPyAnJyA6IHByb3BzLlJlY29yZFtwcm9wcy5Gcm9tRmllbGRdLnRvU3RyaW5nKCksIGRpc2FibGVkOiBwcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiBwcm9wcy5EaXNhYmxlZCB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImNvbFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwiLCB0eXBlOiBcImRhdGVcIiwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJvcHMuUmVjb3JkKSwgKF9hID0ge30sIF9hW3Byb3BzLlRvRmllbGRdID0gZXZ0LnRhcmdldC52YWx1ZSAhPT0gJycgPyBldnQudGFyZ2V0LnZhbHVlIDogbnVsbCwgX2EpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihyZWNvcmQpO1xuICAgICAgICAgICAgICAgICAgICB9LCB2YWx1ZTogcHJvcHMuUmVjb3JkW3Byb3BzLlRvRmllbGRdID09IG51bGwgPyAnJyA6IHByb3BzLlJlY29yZFtwcm9wcy5Ub0ZpZWxkXS50b1N0cmluZygpLCBkaXNhYmxlZDogcHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogcHJvcHMuRGlzYWJsZWQgfSkpKSkpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gRGF0ZVJhbmdlUGlja2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBFbnVtQ2hlY2tCb3hlcy50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5mdW5jdGlvbiBFbnVtQ2hlY2tCb3hlcyhwcm9wcykge1xuICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlICovXG4gICAgdmFyIEVxdWF0ZUZsYWcgPSBmdW5jdGlvbiAoaW5kZXgpIHsgcmV0dXJuICgocHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXSAvIE1hdGgucG93KDIsIGluZGV4KSkgJiAxKSAhPT0gMDsgfTtcbiAgICB2YXIgRGVjcmVtZW50RmxhZyA9IGZ1bmN0aW9uIChpbmRleCkgeyByZXR1cm4gcHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXSAtIE1hdGgucG93KDIsIGluZGV4KTsgfTtcbiAgICB2YXIgSW5jcmVtZW50RmxhZyA9IGZ1bmN0aW9uIChpbmRleCkgeyByZXR1cm4gcHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXSArIE1hdGgucG93KDIsIGluZGV4KTsgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1ncm91cFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBwcm9wcy5MYWJlbCA9PSBudWxsID8gcHJvcHMuRmllbGQgOiBwcm9wcy5MYWJlbCksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJiclwiLCBudWxsKSxcbiAgICAgICAgcHJvcHMuRW51bS5tYXAoZnVuY3Rpb24gKGZsYWcsIGkpIHsgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsga2V5OiBpLCBjbGFzc05hbWU6IFwiZm9ybS1jaGVjayBmb3JtLWNoZWNrLWlubGluZVwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jaGVjay1pbnB1dFwiLCB0eXBlOiBcImNoZWNrYm94XCIsIGNoZWNrZWQ6IEVxdWF0ZUZsYWcoaSksIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLlNldHRlcihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJvcHMuUmVjb3JkKSwgKF9hID0ge30sIF9hW3Byb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQuY2hlY2tlZCA/IEluY3JlbWVudEZsYWcoaSkgOiBEZWNyZW1lbnRGbGFnKGkpLCBfYSkpKTtcbiAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2stbGFiZWxcIiB9LCBmbGFnKSkpOyB9KSkpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gRW51bUNoZWNrQm94ZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIElucHV0LnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzIyLzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmZ1bmN0aW9uIElucHV0KHByb3BzKSB7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgcHJvcHMuTGFiZWwgPT0gbnVsbCA/IHByb3BzLkZpZWxkIDogcHJvcHMuTGFiZWwpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiBwcm9wcy5UeXBlID09PSB1bmRlZmluZWQgPyAndGV4dCcgOiBwcm9wcy5UeXBlLCBjbGFzc05hbWU6IHByb3BzLlZhbGlkKHByb3BzLkZpZWxkKSA/ICdmb3JtLWNvbnRyb2wnIDogJ2Zvcm0tY29udHJvbCBpcy1pbnZhbGlkJywgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLlNldHRlcihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJvcHMuUmVjb3JkKSwgKF9hID0ge30sIF9hW3Byb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQudmFsdWUgIT09ICcnID8gZXZ0LnRhcmdldC52YWx1ZSA6IG51bGwsIF9hKSkpO1xuICAgICAgICAgICAgfSwgdmFsdWU6IHByb3BzLlJlY29yZFtwcm9wcy5GaWVsZF0gPT0gbnVsbCA/ICcnIDogcHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXS50b1N0cmluZygpLCBkaXNhYmxlZDogcHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogcHJvcHMuRGlzYWJsZWQgfSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW52YWxpZC1mZWVkYmFja1wiIH0sIHByb3BzLkZlZWRiYWNrID09IG51bGwgPyBwcm9wcy5GaWVsZCArICcgaXMgYSByZXF1aXJlZCBmaWVsZC4nIDogcHJvcHMuRmVlZGJhY2spKSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBJbnB1dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgU2VsZWN0LnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzI4LzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmZ1bmN0aW9uIFNlbGVjdChwcm9wcykge1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWdyb3VwXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHByb3BzLkxhYmVsID09IG51bGwgPyBwcm9wcy5GaWVsZCA6IHByb3BzLkxhYmVsKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIiwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gX19hc3NpZ24oe30sIHByb3BzLlJlY29yZCk7XG4gICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQudmFsdWUgIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbcHJvcHMuRmllbGRdID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFtwcm9wcy5GaWVsZF0gPSBudWxsO1xuICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihyZWNvcmQpO1xuICAgICAgICAgICAgfSwgdmFsdWU6IHByb3BzLlJlY29yZFtwcm9wcy5GaWVsZF0gPT0gbnVsbCA/ICcnIDogcHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXS50b1N0cmluZygpLCBkaXNhYmxlZDogcHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogcHJvcHMuRGlzYWJsZWQgfSxcbiAgICAgICAgICAgIHByb3BzLkVtcHR5T3B0aW9uID8gUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiIH0pIDogbnVsbCxcbiAgICAgICAgICAgIHByb3BzLk9wdGlvbnMubWFwKGZ1bmN0aW9uIChhLCBpKSB7IHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IGtleTogaSwgdmFsdWU6IGEuVmFsdWUgfSwgYS5MYWJlbCkpOyB9KSkpKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNlbGVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIFRleHRBcmVhLnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDAxLzIyLzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuZnVuY3Rpb24gVGV4dEFyZWEocHJvcHMpIHtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1ncm91cFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBwcm9wcy5MYWJlbCA9PSBudWxsID8gcHJvcHMuRmllbGQgOiBwcm9wcy5MYWJlbCksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiLCB7IHJvd3M6IHByb3BzLlJvd3MsIGNsYXNzTmFtZTogcHJvcHMuVmFsaWQocHJvcHMuRmllbGQpID8gJ2Zvcm0tY29udHJvbCcgOiAnZm9ybS1jb250cm9sIGlzLWludmFsaWQnLCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBfX2Fzc2lnbih7fSwgcHJvcHMuUmVjb3JkKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPT0gJycpXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFtwcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkW3Byb3BzLkZpZWxkXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKHJlY29yZCk7XG4gICAgICAgICAgICB9LCB2YWx1ZTogcHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXSA9PSBudWxsID8gJycgOiBwcm9wcy5SZWNvcmRbcHJvcHMuRmllbGRdLnRvU3RyaW5nKCksIGRpc2FibGVkOiBwcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiBwcm9wcy5EaXNhYmxlZCB9KSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbnZhbGlkLWZlZWRiYWNrXCIgfSwgcHJvcHMuRmVlZGJhY2sgPT0gbnVsbCA/IHByb3BzLkZpZWxkICsgJyBpcyBhIHJlcXVpcmVkIGZpZWxkLicgOiBwcm9wcy5GZWVkYmFjaykpKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFRleHRBcmVhO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBpbmRleC50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOS8yNS8yMDIwIC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXJyYXlDaGVja0JveGVzID0gZXhwb3J0cy5BcnJheU11bHRpU2VsZWN0ID0gZXhwb3J0cy5FbnVtQ2hlY2tCb3hlcyA9IGV4cG9ydHMuRGF0ZVJhbmdlUGlja2VyID0gZXhwb3J0cy5UZXh0QXJlYSA9IGV4cG9ydHMuU2VsZWN0ID0gZXhwb3J0cy5EYXRlUGlja2VyID0gZXhwb3J0cy5JbnB1dCA9IGV4cG9ydHMuQ2hlY2tCb3ggPSB2b2lkIDA7XG52YXIgQ2hlY2tCb3hfMSA9IHJlcXVpcmUoXCIuL0NoZWNrQm94XCIpO1xuZXhwb3J0cy5DaGVja0JveCA9IENoZWNrQm94XzEuZGVmYXVsdDtcbnZhciBJbnB1dF8xID0gcmVxdWlyZShcIi4vSW5wdXRcIik7XG5leHBvcnRzLklucHV0ID0gSW5wdXRfMS5kZWZhdWx0O1xudmFyIERhdGVQaWNrZXJfMSA9IHJlcXVpcmUoXCIuL0RhdGVQaWNrZXJcIik7XG5leHBvcnRzLkRhdGVQaWNrZXIgPSBEYXRlUGlja2VyXzEuZGVmYXVsdDtcbnZhciBTZWxlY3RfMSA9IHJlcXVpcmUoXCIuL1NlbGVjdFwiKTtcbmV4cG9ydHMuU2VsZWN0ID0gU2VsZWN0XzEuZGVmYXVsdDtcbnZhciBUZXh0QXJlYV8xID0gcmVxdWlyZShcIi4vVGV4dEFyZWFcIik7XG5leHBvcnRzLlRleHRBcmVhID0gVGV4dEFyZWFfMS5kZWZhdWx0O1xudmFyIERhdGVSYW5nZVBpY2tlcl8xID0gcmVxdWlyZShcIi4vRGF0ZVJhbmdlUGlja2VyXCIpO1xuZXhwb3J0cy5EYXRlUmFuZ2VQaWNrZXIgPSBEYXRlUmFuZ2VQaWNrZXJfMS5kZWZhdWx0O1xudmFyIEVudW1DaGVja0JveGVzXzEgPSByZXF1aXJlKFwiLi9FbnVtQ2hlY2tCb3hlc1wiKTtcbmV4cG9ydHMuRW51bUNoZWNrQm94ZXMgPSBFbnVtQ2hlY2tCb3hlc18xLmRlZmF1bHQ7XG52YXIgQXJyYXlNdWx0aVNlbGVjdF8xID0gcmVxdWlyZShcIi4vQXJyYXlNdWx0aVNlbGVjdFwiKTtcbmV4cG9ydHMuQXJyYXlNdWx0aVNlbGVjdCA9IEFycmF5TXVsdGlTZWxlY3RfMS5kZWZhdWx0O1xudmFyIEFycmF5Q2hlY2tCb3hlc18xID0gcmVxdWlyZShcIi4vQXJyYXlDaGVja0JveGVzXCIpO1xuZXhwb3J0cy5BcnJheUNoZWNrQm94ZXMgPSBBcnJheUNoZWNrQm94ZXNfMS5kZWZhdWx0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==