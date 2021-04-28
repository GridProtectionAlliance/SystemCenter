(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~Asset~ByCompany~ByMeter~Company~Customer~Location"],{

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/ArrayCheckBoxes.js":
/*!*******************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/ArrayCheckBoxes.js ***!
  \*******************************************************************************************************************************/
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
/*!********************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/ArrayMultiSelect.js ***!
  \********************************************************************************************************************************/
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
/*!************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/CheckBox.js ***!
  \************************************************************************************************************************/
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
/*!**************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/DatePicker.js ***!
  \**************************************************************************************************************************/
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
/*!*******************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/DateRangePicker.js ***!
  \*******************************************************************************************************************************/
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
    var _b = React.useState(ToDate(props.Record[props.FromField])), Tstart = _b[0], setTstart = _b[1];
    var _c = React.useState(ToDate(props.Record[props.ToField])), Tend = _c[0], setTend = _c[1];
    var _d = React.useState(Tstart != null ? ToString(Tstart) : ''), StartInput = _d[0], setStartInput = _d[1];
    var _e = React.useState(Tend != null ? ToString(Tend) : ''), EndInput = _e[0], setEndInput = _e[1];
    React.useEffect(function () {
        var propsStart = ToDate(props.Record[props.FromField]);
        var propsEnd = ToDate(props.Record[props.ToField]);
        if (propsStart == null || Tstart == null) {
            if (!(propsStart == null && Tstart == null))
                setTstart(propsStart);
        }
        else if (propsStart.getTime() !== Tstart.getTime())
            setTstart(propsStart);
        if (propsEnd == null || Tend == null) {
            if (!(propsEnd == null && Tend == null))
                setTstart(propsEnd);
        }
        else if (propsEnd.getTime() !== Tend.getTime())
            setTend(propsEnd);
    }, [props.Record]);
    React.useEffect(function () {
        var days = (Tstart != null && Tend != null ? Math.round((Tend.getTime() - Tstart.getTime()) / (1000 * 60 * 60 * 24)) : 0);
        if (ToRange(days) !== range)
            setRange(ToRange(days));
        UpdateTime();
    }, [Tstart, Tend]);
    React.useEffect(function () {
        var days = GetDays(range);
        if (days > 0) {
            if (Tstart != null)
                setTend(new Date(Tstart.valueOf() + 1000 * 24 * 60 * 60 * days));
            else if (Tend != null)
                setTstart(new Date(Tend.valueOf() - 1000 * 24 * 60 * 60 * days));
            else {
                setTstart(new Date(new Date().valueOf() - 1000 * 24 * 60 * 60 * days));
                setTend(new Date());
            }
        }
    }, [range]);
    function GetDays(val) {
        if (val === '1 Day')
            return 1;
        if (val === '7 Days')
            return 7;
        if (val === '30 Days')
            return 30;
        if (val === '90 Days')
            return 90;
        if (val === '180 Days')
            return 180;
        if (val === '365 Days')
            return 365;
        return 0;
    }
    function ToDate(str) {
        if (str === null)
            return null;
        var dt = new Date(str);
        if (isNaN(dt.getTime()))
            return null;
        return dt;
    }
    React.useEffect(function () {
        if (Tstart != null)
            setStartInput(ToString(Tstart));
    }, [Tstart]);
    React.useEffect(function () {
        // only if InputStart is a valid ToString
        if (StartInput.match('^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-2][0-9])') != null)
            setTstart(ToDate(StartInput));
        else
            setTstart(null);
    }, [StartInput]);
    React.useEffect(function () {
        if (Tend != null)
            setEndInput(ToString(Tend));
    }, [Tend]);
    React.useEffect(function () {
        // only if EndInput is a valid ToString
        if (EndInput.match('^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-2][0-9])') != null)
            setTend(ToDate(EndInput));
        else
            setTend(null);
    }, [EndInput]);
    function UpdateTime() {
        var _a;
        var to = (Tend !== null ? ToString(Tend) : '');
        var from = (Tstart !== null ? ToString(Tstart) : '');
        var record = __assign(__assign({}, props.Record), (_a = {}, _a[props.ToField] = to, _a[props.FromField] = from, _a));
        props.Setter(record);
    }
    function ToString(dt) {
        return dt.getUTCFullYear() + "-" + (dt.getUTCMonth() + 1).toString()
            .padStart(2, '0') + "-" + dt.getUTCDate().toString().padStart(2, '0');
    }
    function ToRange(days) {
        if (days === 1)
            return ('1 Day');
        else if (days === 7)
            return ('7 Days');
        else if (days === 30)
            return ('30 Days');
        else if (days === 90)
            return ('90 Days');
        else if (days === 180)
            return ('180 Days');
        else if (days === 365)
            return ('365 Days');
        else
            return ('Custom');
    }
    var startValid = (Tstart !== null) && (!isNaN(Tstart.getTime()));
    var endValid = (Tend !== null) && (!isNaN(Tend.getTime())) && (!startValid || ((Tstart !== null) && (Tstart.getTime() < Tend.getTime())));
    startValid = (props.Valid === undefined ? startValid : props.Valid);
    endValid = (props.Valid === undefined ? endValid : props.Valid);
    return (React.createElement("div", { className: "form-group" },
        React.createElement("label", null, props.Label),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col" },
                React.createElement("select", { className: "form-control", value: range, onChange: function (evt) { return setRange(evt.target.value); } },
                    React.createElement("option", { value: "Custom" }, "Custom"),
                    React.createElement("option", { value: "1 Day" }, "1 Day"),
                    React.createElement("option", { value: "7 Days" }, "7 Days"),
                    React.createElement("option", { value: "30 Days" }, "30 Days"),
                    React.createElement("option", { value: "90 Days" }, "90 Days"),
                    React.createElement("option", { value: "180 Days" }, "180 Days"),
                    React.createElement("option", { value: "365 Days" }, "365 Days"))),
            React.createElement("div", { className: "col" },
                React.createElement("input", { className: "form-control" + (startValid ? '' : ' is-invalid'), type: "date", onChange: function (evt) { setStartInput(evt.target.value); }, value: StartInput, disabled: props.Disabled == null ? false : props.Disabled })),
            React.createElement("div", { className: "col" },
                React.createElement("input", { className: "form-control" + (endValid ? '' : ' is-invalid'), type: "date", onChange: function (evt) { setEndInput(evt.target.value); }, value: EndInput, disabled: props.Disabled == null ? false : props.Disabled })))));
}
exports.default = DateRangePicker;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/EnumCheckBoxes.js":
/*!******************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/EnumCheckBoxes.js ***!
  \******************************************************************************************************************************/
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
/*!*********************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/Input.js ***!
  \*********************************************************************************************************************/
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

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/MutliCheckBoxSelect.js":
/*!***********************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/MutliCheckBoxSelect.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  MultiCheckBoxSelect.tsx - Gbtc
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
//  07/17/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var MultiSelect = function (props) {
    var _a = React.useState(false), show = _a[0], setShow = _a[1];
    var multiSelect = React.useRef(null);
    function HandleShow(evt) {
        if (multiSelect.current === null)
            setShow(!show);
        else if (!multiSelect.current.contains(evt.target))
            setShow(false);
        else
            setShow(true);
    }
    React.useEffect(function () {
        document.addEventListener('mousedown', HandleShow, false);
        return function () {
            document.removeEventListener('mousedown', HandleShow, false);
        };
    }, []);
    return (React.createElement("div", { ref: multiSelect, style: { position: 'relative', display: 'inline-block', width: 'inherit' } },
        React.createElement("button", { style: { border: '1px solid #ced4da', padding: '.375rem .75rem', fontSize: '1rem', borderRadius: '.25rem' }, className: "btn form-control dropdown-toggle", onClick: HandleShow },
            props.Options.filter(function (x) { return x.Selected; }).length !== props.Options.length
                ? props.Options.filter(function (x) { return x.Selected; }).length
                : 'All ',
            ' ',
            "Selected"),
        React.createElement("div", { style: {
                maxHeight: window.innerHeight * 0.75,
                overflowY: 'auto',
                padding: '10 5',
                display: show ? 'block' : 'none',
                position: 'absolute',
                backgroundColor: '#fff',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                zIndex: 401,
                minWidth: '100%',
            } },
            React.createElement("table", { className: "table", style: { margin: 0 } },
                React.createElement("tbody", null,
                    React.createElement("tr", { onClick: function (evt) {
                            evt.preventDefault();
                            props.OnChange(evt, props.Options.filter(function (x) { return x.Selected === (props.Options.filter(function (o) { return o.Selected; }).length === props.Options.length); }));
                        } },
                        React.createElement("td", null,
                            React.createElement("input", { type: "checkbox", checked: props.Options.filter(function (x) { return x.Selected; }).length === props.Options.length, onChange: function () { return null; } })),
                        React.createElement("td", null, "All")),
                    props.Options.map(function (f, i) { return (React.createElement("tr", { key: i, onClick: function (evt) { return props.OnChange(evt, [f]); } },
                        React.createElement("td", null,
                            React.createElement("input", { type: "checkbox", checked: f.Selected, onChange: function () { return null; } })),
                        React.createElement("td", null, f.Text))); }))))));
};
exports.default = MultiSelect;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/Select.js":
/*!**********************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/Select.js ***!
  \**********************************************************************************************************************/
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
            props.EmptyOption ? React.createElement("option", { value: "" }, props.EmptyLabel !== undefined ? props.EmptyLabel : '') : null,
            props.Options.map(function (a, i) { return (React.createElement("option", { key: i, value: a.Value }, a.Label)); }))));
}
exports.default = Select;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-forms/lib/TextArea.js":
/*!************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/TextArea.js ***!
  \************************************************************************************************************************/
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
/*!*********************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-forms/lib/index.js ***!
  \*********************************************************************************************************************/
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
exports.MultiCheckBoxSelect = exports.ArrayCheckBoxes = exports.ArrayMultiSelect = exports.EnumCheckBoxes = exports.DateRangePicker = exports.TextArea = exports.Select = exports.DatePicker = exports.Input = exports.CheckBox = void 0;
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
var MutliCheckBoxSelect_1 = __webpack_require__(/*! ./MutliCheckBoxSelect */ "../../node_modules/@gpa-gemstone/react-forms/lib/MutliCheckBoxSelect.js");
exports.MultiCheckBoxSelect = MutliCheckBoxSelect_1.default;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9BcnJheUNoZWNrQm94ZXMuanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1mb3Jtcy9saWIvQXJyYXlNdWx0aVNlbGVjdC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9DaGVja0JveC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9EYXRlUGlja2VyLmpzIiwid2VicGFjazovLy9EOi9Qcm9qZWN0cy9TeXN0ZW1DZW50ZXIvU291cmNlL0FwcGxpY2F0aW9ucy9TeXN0ZW1DZW50ZXIvbm9kZV9tb2R1bGVzL0BncGEtZ2Vtc3RvbmUvcmVhY3QtZm9ybXMvbGliL0RhdGVSYW5nZVBpY2tlci5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9FbnVtQ2hlY2tCb3hlcy5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9JbnB1dC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9NdXRsaUNoZWNrQm94U2VsZWN0LmpzIiwid2VicGFjazovLy9EOi9Qcm9qZWN0cy9TeXN0ZW1DZW50ZXIvU291cmNlL0FwcGxpY2F0aW9ucy9TeXN0ZW1DZW50ZXIvbm9kZV9tb2R1bGVzL0BncGEtZ2Vtc3RvbmUvcmVhY3QtZm9ybXMvbGliL1NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9UZXh0QXJlYS5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxRQUFRO0FBQ3pELHdDQUF3QyxRQUFRO0FBQ2hELHdEQUF3RCxRQUFRO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELFlBQVksbUJBQU8sQ0FBQyxvQkFBTztBQUMzQjtBQUNBO0FB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QUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLGlCQUFpQixtQkFBTyxDQUFDLGdGQUFZO0FBQ3JDO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLDBFQUFTO0FBQy9CO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsb0ZBQWM7QUFDekM7QUFDQSxlQUFlLG1CQUFPLENBQUMsNEVBQVU7QUFDakM7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyxnRkFBWTtBQUNyQztBQUNBLHdCQUF3QixtQkFBTyxDQUFDLDhGQUFtQjtBQUNuRDtBQUNBLHVCQUF1QixtQkFBTyxDQUFDLDRGQUFrQjtBQUNqRDtBQUNBLHlCQUF5QixtQkFBTyxDQUFDLGdHQUFvQjtBQUNyRDtBQUNBLHdCQUF3QixtQkFBTyxDQUFDLDhGQUFtQjtBQUNuRDtBQUNBLDRCQUE0QixtQkFBTyxDQUFDLHNHQUF1QjtBQUMzRCIsImZpbGUiOiJ2ZW5kb3JzfkFzc2V0fkJ5Q29tcGFueX5CeU1ldGVyfkNvbXBhbnl+Q3VzdG9tZXJ+TG9jYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBBcnJheUNoZWNrQm94ZXMudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzIyLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XHJcbnZhciBfX3NwcmVhZEFycmF5cyA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheXMpIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcclxuZnVuY3Rpb24gQXJyYXlDaGVja0JveGVzKHByb3BzKSB7XHJcbiAgICB2YXIgUmVtb3ZlID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICAgICAgdmFyIGEgPSBfX3NwcmVhZEFycmF5cyhwcm9wcy5SZWNvcmRbcHJvcHMuRmllbGRdKTtcclxuICAgICAgICB2YXIgaSA9IGEuaW5kZXhPZihjYi5JRCk7XHJcbiAgICAgICAgYS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9O1xyXG4gICAgdmFyIEFkZCA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgICAgIHZhciBhID0gX19zcHJlYWRBcnJheXMocHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXSk7XHJcbiAgICAgICAgdmFyIGkgPSBhLmluZGV4T2YoY2IuSUQpO1xyXG4gICAgICAgIGlmIChpIDwgMClcclxuICAgICAgICAgICAgYS5wdXNoKGNiLklEKTtcclxuICAgICAgICBhLnNvcnQoKTtcclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1ncm91cFwiIH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHByb3BzLkxhYmVsID09IG51bGwgPyBwcm9wcy5GaWVsZCA6IHByb3BzLkxhYmVsKSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnJcIiwgbnVsbCksXHJcbiAgICAgICAgcHJvcHMuQ2hlY2tib3hlcy5tYXAoZnVuY3Rpb24gKGNiLCBpKSB7IHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGtleTogaSwgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2sgZm9ybS1jaGVjay1pbmxpbmVcIiB9LFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jaGVjay1pbnB1dFwiLCB0eXBlOiBcImNoZWNrYm94XCIsIGNoZWNrZWQ6IHByb3BzLlJlY29yZFtwcm9wcy5GaWVsZF0uZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4gY2IuSUQgPT09IHg7IH0pICE9PSB1bmRlZmluZWQsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9wcy5TZXR0ZXIoX19hc3NpZ24oX19hc3NpZ24oe30sIHByb3BzLlJlY29yZCksIChfYSA9IHt9LCBfYVtwcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LmNoZWNrZWQgPyBBZGQoY2IpIDogUmVtb3ZlKGNiKSwgX2EpKSk7XHJcbiAgICAgICAgICAgICAgICB9IH0pLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jaGVjay1sYWJlbFwiIH0sIGNiLkxhYmVsKSkpOyB9KSkpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEFycmF5Q2hlY2tCb3hlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgQXJyYXlNdWx0aVNlbGVjdC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjIvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbmZ1bmN0aW9uIEFycmF5TXVsdGlTZWxlY3QocHJvcHMpIHtcclxuICAgIHZhciBfYTtcclxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWdyb3VwXCIgfSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgcHJvcHMuTGFiZWwgPT0gbnVsbCA/IHByb3BzLkZpZWxkIDogcHJvcHMuTGFiZWwpLFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgeyBtdWx0aXBsZTogdHJ1ZSwgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwiLCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcm9wcy5SZWNvcmQpLCAoX2EgPSB7fSwgX2FbcHJvcHMuRmllbGRdID0gQXJyYXkuZnJvbShldnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKGZ1bmN0aW9uIChhKSB7IHJldHVybiBwYXJzZUludChhLnZhbHVlLCAxMCk7IH0pLCBfYSkpO1xyXG4gICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgICAgIH0sIHZhbHVlOiAoX2EgPSBwcm9wcy5SZWNvcmRbcHJvcHMuRmllbGRdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSwgZGlzYWJsZWQ6IHByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHByb3BzLkRpc2FibGVkLCBzdHlsZTogcHJvcHMuU3R5bGUgfSwgcHJvcHMuT3B0aW9ucy5tYXAoZnVuY3Rpb24gKGEsIGkpIHsgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsga2V5OiBpLCB2YWx1ZTogYS5WYWx1ZSB9LCBhLkxhYmVsKSk7IH0pKSkpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEFycmF5TXVsdGlTZWxlY3Q7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIENoZWNrQm94LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbnZhciBDaGVja0JveCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhDaGVja0JveCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIENoZWNrQm94KCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIENoZWNrQm94LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jaGVja1wiIH0sXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2staW5wdXRcIiwgc3R5bGU6IHsgekluZGV4OiAxIH0sIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlY29yZCA9IF9fYXNzaWduKHt9LCBfdGhpcy5wcm9wcy5SZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY29yZFtfdGhpcy5wcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICB9LCB2YWx1ZTogdGhpcy5wcm9wcy5SZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPyAnb24nIDogJ29mZicsIGNoZWNrZWQ6IHRoaXMucHJvcHMuUmVjb3JkW3RoaXMucHJvcHMuRmllbGRdID8gdHJ1ZSA6IGZhbHNlLCBkaXNhYmxlZDogdGhpcy5wcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiB0aGlzLnByb3BzLkRpc2FibGVkIH0pLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jaGVjay1sYWJlbFwiIH0sIHRoaXMucHJvcHMuTGFiZWwgPT0gbnVsbCA/IHRoaXMucHJvcHMuRmllbGQgOiB0aGlzLnByb3BzLkxhYmVsKSkpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDaGVja0JveDtcclxufShSZWFjdC5Db21wb25lbnQpKTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gQ2hlY2tCb3g7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIERhdGVQaWNrZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAyLzA1LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcclxudmFyIERhdGVQaWNrZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoRGF0ZVBpY2tlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIERhdGVQaWNrZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgRGF0ZVBpY2tlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIiB9LFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgdGhpcy5wcm9wcy5MYWJlbCA9PSBudWxsID8gdGhpcy5wcm9wcy5GaWVsZCA6IHRoaXMucHJvcHMuTGFiZWwpLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sXCIsIHR5cGU6IFwiZGF0ZVwiLCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBfX2Fzc2lnbih7fSwgX3RoaXMucHJvcHMuUmVjb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPT0gJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZFtfdGhpcy5wcm9wcy5GaWVsZF0gPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkW190aGlzLnByb3BzLkZpZWxkXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucHJvcHMuU2V0dGVyKHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICB9LCB2YWx1ZTogdGhpcy5wcm9wcy5SZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0gPT0gbnVsbCA/ICcnIDogdGhpcy5wcm9wcy5SZWNvcmRbdGhpcy5wcm9wcy5GaWVsZF0udG9TdHJpbmcoKSwgZGlzYWJsZWQ6IHRoaXMucHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogdGhpcy5wcm9wcy5EaXNhYmxlZCB9KSkpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBEYXRlUGlja2VyO1xyXG59KFJlYWN0LkNvbXBvbmVudCkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBEYXRlUGlja2VyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBEYXRlUmFuZ2VQaWNrZXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAyLzA1LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG5mdW5jdGlvbiBEYXRlUmFuZ2VQaWNrZXIocHJvcHMpIHtcclxuICAgIHZhciBfYSA9IFJlYWN0LnVzZVN0YXRlKCdDdXN0b20nKSwgcmFuZ2UgPSBfYVswXSwgc2V0UmFuZ2UgPSBfYVsxXTtcclxuICAgIHZhciBfYiA9IFJlYWN0LnVzZVN0YXRlKFRvRGF0ZShwcm9wcy5SZWNvcmRbcHJvcHMuRnJvbUZpZWxkXSkpLCBUc3RhcnQgPSBfYlswXSwgc2V0VHN0YXJ0ID0gX2JbMV07XHJcbiAgICB2YXIgX2MgPSBSZWFjdC51c2VTdGF0ZShUb0RhdGUocHJvcHMuUmVjb3JkW3Byb3BzLlRvRmllbGRdKSksIFRlbmQgPSBfY1swXSwgc2V0VGVuZCA9IF9jWzFdO1xyXG4gICAgdmFyIF9kID0gUmVhY3QudXNlU3RhdGUoVHN0YXJ0ICE9IG51bGwgPyBUb1N0cmluZyhUc3RhcnQpIDogJycpLCBTdGFydElucHV0ID0gX2RbMF0sIHNldFN0YXJ0SW5wdXQgPSBfZFsxXTtcclxuICAgIHZhciBfZSA9IFJlYWN0LnVzZVN0YXRlKFRlbmQgIT0gbnVsbCA/IFRvU3RyaW5nKFRlbmQpIDogJycpLCBFbmRJbnB1dCA9IF9lWzBdLCBzZXRFbmRJbnB1dCA9IF9lWzFdO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcHJvcHNTdGFydCA9IFRvRGF0ZShwcm9wcy5SZWNvcmRbcHJvcHMuRnJvbUZpZWxkXSk7XHJcbiAgICAgICAgdmFyIHByb3BzRW5kID0gVG9EYXRlKHByb3BzLlJlY29yZFtwcm9wcy5Ub0ZpZWxkXSk7XHJcbiAgICAgICAgaWYgKHByb3BzU3RhcnQgPT0gbnVsbCB8fCBUc3RhcnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoIShwcm9wc1N0YXJ0ID09IG51bGwgJiYgVHN0YXJ0ID09IG51bGwpKVxyXG4gICAgICAgICAgICAgICAgc2V0VHN0YXJ0KHByb3BzU3RhcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwcm9wc1N0YXJ0LmdldFRpbWUoKSAhPT0gVHN0YXJ0LmdldFRpbWUoKSlcclxuICAgICAgICAgICAgc2V0VHN0YXJ0KHByb3BzU3RhcnQpO1xyXG4gICAgICAgIGlmIChwcm9wc0VuZCA9PSBudWxsIHx8IFRlbmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoIShwcm9wc0VuZCA9PSBudWxsICYmIFRlbmQgPT0gbnVsbCkpXHJcbiAgICAgICAgICAgICAgICBzZXRUc3RhcnQocHJvcHNFbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwcm9wc0VuZC5nZXRUaW1lKCkgIT09IFRlbmQuZ2V0VGltZSgpKVxyXG4gICAgICAgICAgICBzZXRUZW5kKHByb3BzRW5kKTtcclxuICAgIH0sIFtwcm9wcy5SZWNvcmRdKTtcclxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRheXMgPSAoVHN0YXJ0ICE9IG51bGwgJiYgVGVuZCAhPSBudWxsID8gTWF0aC5yb3VuZCgoVGVuZC5nZXRUaW1lKCkgLSBUc3RhcnQuZ2V0VGltZSgpKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSkgOiAwKTtcclxuICAgICAgICBpZiAoVG9SYW5nZShkYXlzKSAhPT0gcmFuZ2UpXHJcbiAgICAgICAgICAgIHNldFJhbmdlKFRvUmFuZ2UoZGF5cykpO1xyXG4gICAgICAgIFVwZGF0ZVRpbWUoKTtcclxuICAgIH0sIFtUc3RhcnQsIFRlbmRdKTtcclxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRheXMgPSBHZXREYXlzKHJhbmdlKTtcclxuICAgICAgICBpZiAoZGF5cyA+IDApIHtcclxuICAgICAgICAgICAgaWYgKFRzdGFydCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgc2V0VGVuZChuZXcgRGF0ZShUc3RhcnQudmFsdWVPZigpICsgMTAwMCAqIDI0ICogNjAgKiA2MCAqIGRheXMpKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoVGVuZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgc2V0VHN0YXJ0KG5ldyBEYXRlKFRlbmQudmFsdWVPZigpIC0gMTAwMCAqIDI0ICogNjAgKiA2MCAqIGRheXMpKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUc3RhcnQobmV3IERhdGUobmV3IERhdGUoKS52YWx1ZU9mKCkgLSAxMDAwICogMjQgKiA2MCAqIDYwICogZGF5cykpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGVuZChuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtyYW5nZV0pO1xyXG4gICAgZnVuY3Rpb24gR2V0RGF5cyh2YWwpIHtcclxuICAgICAgICBpZiAodmFsID09PSAnMSBEYXknKVxyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICBpZiAodmFsID09PSAnNyBEYXlzJylcclxuICAgICAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gJzMwIERheXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gMzA7XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gJzkwIERheXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gOTA7XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gJzE4MCBEYXlzJylcclxuICAgICAgICAgICAgcmV0dXJuIDE4MDtcclxuICAgICAgICBpZiAodmFsID09PSAnMzY1IERheXMnKVxyXG4gICAgICAgICAgICByZXR1cm4gMzY1O1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gVG9EYXRlKHN0cikge1xyXG4gICAgICAgIGlmIChzdHIgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBkdCA9IG5ldyBEYXRlKHN0cik7XHJcbiAgICAgICAgaWYgKGlzTmFOKGR0LmdldFRpbWUoKSkpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBkdDtcclxuICAgIH1cclxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKFRzdGFydCAhPSBudWxsKVxyXG4gICAgICAgICAgICBzZXRTdGFydElucHV0KFRvU3RyaW5nKFRzdGFydCkpO1xyXG4gICAgfSwgW1RzdGFydF0pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBvbmx5IGlmIElucHV0U3RhcnQgaXMgYSB2YWxpZCBUb1N0cmluZ1xyXG4gICAgICAgIGlmIChTdGFydElucHV0Lm1hdGNoKCdeKFswLTldWzAtOV1bMC05XVswLTldKS0oWzAtOV1bMC05XSktKFswLTJdWzAtOV0pJykgIT0gbnVsbClcclxuICAgICAgICAgICAgc2V0VHN0YXJ0KFRvRGF0ZShTdGFydElucHV0KSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzZXRUc3RhcnQobnVsbCk7XHJcbiAgICB9LCBbU3RhcnRJbnB1dF0pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoVGVuZCAhPSBudWxsKVxyXG4gICAgICAgICAgICBzZXRFbmRJbnB1dChUb1N0cmluZyhUZW5kKSk7XHJcbiAgICB9LCBbVGVuZF0pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBvbmx5IGlmIEVuZElucHV0IGlzIGEgdmFsaWQgVG9TdHJpbmdcclxuICAgICAgICBpZiAoRW5kSW5wdXQubWF0Y2goJ14oWzAtOV1bMC05XVswLTldWzAtOV0pLShbMC05XVswLTldKS0oWzAtMl1bMC05XSknKSAhPSBudWxsKVxyXG4gICAgICAgICAgICBzZXRUZW5kKFRvRGF0ZShFbmRJbnB1dCkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2V0VGVuZChudWxsKTtcclxuICAgIH0sIFtFbmRJbnB1dF0pO1xyXG4gICAgZnVuY3Rpb24gVXBkYXRlVGltZSgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgdmFyIHRvID0gKFRlbmQgIT09IG51bGwgPyBUb1N0cmluZyhUZW5kKSA6ICcnKTtcclxuICAgICAgICB2YXIgZnJvbSA9IChUc3RhcnQgIT09IG51bGwgPyBUb1N0cmluZyhUc3RhcnQpIDogJycpO1xyXG4gICAgICAgIHZhciByZWNvcmQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJvcHMuUmVjb3JkKSwgKF9hID0ge30sIF9hW3Byb3BzLlRvRmllbGRdID0gdG8sIF9hW3Byb3BzLkZyb21GaWVsZF0gPSBmcm9tLCBfYSkpO1xyXG4gICAgICAgIHByb3BzLlNldHRlcihyZWNvcmQpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gVG9TdHJpbmcoZHQpIHtcclxuICAgICAgICByZXR1cm4gZHQuZ2V0VVRDRnVsbFllYXIoKSArIFwiLVwiICsgKGR0LmdldFVUQ01vbnRoKCkgKyAxKS50b1N0cmluZygpXHJcbiAgICAgICAgICAgIC5wYWRTdGFydCgyLCAnMCcpICsgXCItXCIgKyBkdC5nZXRVVENEYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gVG9SYW5nZShkYXlzKSB7XHJcbiAgICAgICAgaWYgKGRheXMgPT09IDEpXHJcbiAgICAgICAgICAgIHJldHVybiAoJzEgRGF5Jyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZGF5cyA9PT0gNylcclxuICAgICAgICAgICAgcmV0dXJuICgnNyBEYXlzJyk7XHJcbiAgICAgICAgZWxzZSBpZiAoZGF5cyA9PT0gMzApXHJcbiAgICAgICAgICAgIHJldHVybiAoJzMwIERheXMnKTtcclxuICAgICAgICBlbHNlIGlmIChkYXlzID09PSA5MClcclxuICAgICAgICAgICAgcmV0dXJuICgnOTAgRGF5cycpO1xyXG4gICAgICAgIGVsc2UgaWYgKGRheXMgPT09IDE4MClcclxuICAgICAgICAgICAgcmV0dXJuICgnMTgwIERheXMnKTtcclxuICAgICAgICBlbHNlIGlmIChkYXlzID09PSAzNjUpXHJcbiAgICAgICAgICAgIHJldHVybiAoJzM2NSBEYXlzJyk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gKCdDdXN0b20nKTtcclxuICAgIH1cclxuICAgIHZhciBzdGFydFZhbGlkID0gKFRzdGFydCAhPT0gbnVsbCkgJiYgKCFpc05hTihUc3RhcnQuZ2V0VGltZSgpKSk7XHJcbiAgICB2YXIgZW5kVmFsaWQgPSAoVGVuZCAhPT0gbnVsbCkgJiYgKCFpc05hTihUZW5kLmdldFRpbWUoKSkpICYmICghc3RhcnRWYWxpZCB8fCAoKFRzdGFydCAhPT0gbnVsbCkgJiYgKFRzdGFydC5nZXRUaW1lKCkgPCBUZW5kLmdldFRpbWUoKSkpKTtcclxuICAgIHN0YXJ0VmFsaWQgPSAocHJvcHMuVmFsaWQgPT09IHVuZGVmaW5lZCA/IHN0YXJ0VmFsaWQgOiBwcm9wcy5WYWxpZCk7XHJcbiAgICBlbmRWYWxpZCA9IChwcm9wcy5WYWxpZCA9PT0gdW5kZWZpbmVkID8gZW5kVmFsaWQgOiBwcm9wcy5WYWxpZCk7XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1ncm91cFwiIH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHByb3BzLkxhYmVsKSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInJvd1wiIH0sXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiY29sXCIgfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sXCIsIHZhbHVlOiByYW5nZSwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHsgcmV0dXJuIHNldFJhbmdlKGV2dC50YXJnZXQudmFsdWUpOyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIkN1c3RvbVwiIH0sIFwiQ3VzdG9tXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogXCIxIERheVwiIH0sIFwiMSBEYXlcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIjcgRGF5c1wiIH0sIFwiNyBEYXlzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogXCIzMCBEYXlzXCIgfSwgXCIzMCBEYXlzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogXCI5MCBEYXlzXCIgfSwgXCI5MCBEYXlzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogXCIxODAgRGF5c1wiIH0sIFwiMTgwIERheXNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIjM2NSBEYXlzXCIgfSwgXCIzNjUgRGF5c1wiKSkpLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImNvbFwiIH0sXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sXCIgKyAoc3RhcnRWYWxpZCA/ICcnIDogJyBpcy1pbnZhbGlkJyksIHR5cGU6IFwiZGF0ZVwiLCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkgeyBzZXRTdGFydElucHV0KGV2dC50YXJnZXQudmFsdWUpOyB9LCB2YWx1ZTogU3RhcnRJbnB1dCwgZGlzYWJsZWQ6IHByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHByb3BzLkRpc2FibGVkIH0pKSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJjb2xcIiB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwiICsgKGVuZFZhbGlkID8gJycgOiAnIGlzLWludmFsaWQnKSwgdHlwZTogXCJkYXRlXCIsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7IHNldEVuZElucHV0KGV2dC50YXJnZXQudmFsdWUpOyB9LCB2YWx1ZTogRW5kSW5wdXQsIGRpc2FibGVkOiBwcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiBwcm9wcy5EaXNhYmxlZCB9KSkpKSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRGF0ZVJhbmdlUGlja2VyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBFbnVtQ2hlY2tCb3hlcy50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjIvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbmZ1bmN0aW9uIEVudW1DaGVja0JveGVzKHByb3BzKSB7XHJcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZSAqL1xyXG4gICAgdmFyIEVxdWF0ZUZsYWcgPSBmdW5jdGlvbiAoaW5kZXgpIHsgcmV0dXJuICgocHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXSAvIE1hdGgucG93KDIsIGluZGV4KSkgJiAxKSAhPT0gMDsgfTtcclxuICAgIHZhciBEZWNyZW1lbnRGbGFnID0gZnVuY3Rpb24gKGluZGV4KSB7IHJldHVybiBwcm9wcy5SZWNvcmRbcHJvcHMuRmllbGRdIC0gTWF0aC5wb3coMiwgaW5kZXgpOyB9O1xyXG4gICAgdmFyIEluY3JlbWVudEZsYWcgPSBmdW5jdGlvbiAoaW5kZXgpIHsgcmV0dXJuIHByb3BzLlJlY29yZFtwcm9wcy5GaWVsZF0gKyBNYXRoLnBvdygyLCBpbmRleCk7IH07XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1ncm91cFwiIH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIHByb3BzLkxhYmVsID09IG51bGwgPyBwcm9wcy5GaWVsZCA6IHByb3BzLkxhYmVsKSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnJcIiwgbnVsbCksXHJcbiAgICAgICAgcHJvcHMuRW51bS5tYXAoZnVuY3Rpb24gKGZsYWcsIGkpIHsgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsga2V5OiBpLCBjbGFzc05hbWU6IFwiZm9ybS1jaGVjayBmb3JtLWNoZWNrLWlubGluZVwiIH0sXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWNoZWNrLWlucHV0XCIsIHR5cGU6IFwiY2hlY2tib3hcIiwgY2hlY2tlZDogRXF1YXRlRmxhZyhpKSwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzLlNldHRlcihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJvcHMuUmVjb3JkKSwgKF9hID0ge30sIF9hW3Byb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQuY2hlY2tlZCA/IEluY3JlbWVudEZsYWcoaSkgOiBEZWNyZW1lbnRGbGFnKGkpLCBfYSkpKTtcclxuICAgICAgICAgICAgICAgIH0gfSksXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWNoZWNrLWxhYmVsXCIgfSwgZmxhZykpKTsgfSkpKTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBFbnVtQ2hlY2tCb3hlcztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgSW5wdXQudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzIyLzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG5mdW5jdGlvbiBJbnB1dChwcm9wcykge1xyXG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIiB9LFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBwcm9wcy5MYWJlbCA9PSBudWxsID8gcHJvcHMuRmllbGQgOiBwcm9wcy5MYWJlbCksXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogcHJvcHMuVHlwZSA9PT0gdW5kZWZpbmVkID8gJ3RleHQnIDogcHJvcHMuVHlwZSwgY2xhc3NOYW1lOiBwcm9wcy5WYWxpZChwcm9wcy5GaWVsZCkgPyAnZm9ybS1jb250cm9sJyA6ICdmb3JtLWNvbnRyb2wgaXMtaW52YWxpZCcsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHMuU2V0dGVyKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcm9wcy5SZWNvcmQpLCAoX2EgPSB7fSwgX2FbcHJvcHMuRmllbGRdID0gZXZ0LnRhcmdldC52YWx1ZSAhPT0gJycgPyBldnQudGFyZ2V0LnZhbHVlIDogbnVsbCwgX2EpKSk7XHJcbiAgICAgICAgICAgIH0sIHZhbHVlOiBwcm9wcy5SZWNvcmRbcHJvcHMuRmllbGRdID09IG51bGwgPyAnJyA6IHByb3BzLlJlY29yZFtwcm9wcy5GaWVsZF0udG9TdHJpbmcoKSwgZGlzYWJsZWQ6IHByb3BzLkRpc2FibGVkID09IG51bGwgPyBmYWxzZSA6IHByb3BzLkRpc2FibGVkIH0pLFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW52YWxpZC1mZWVkYmFja1wiIH0sIHByb3BzLkZlZWRiYWNrID09IG51bGwgPyBwcm9wcy5GaWVsZCArICcgaXMgYSByZXF1aXJlZCBmaWVsZC4nIDogcHJvcHMuRmVlZGJhY2spKSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gSW5wdXQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIE11bHRpQ2hlY2tCb3hTZWxlY3QudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA3LzE3LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcclxudmFyIE11bHRpU2VsZWN0ID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICB2YXIgX2EgPSBSZWFjdC51c2VTdGF0ZShmYWxzZSksIHNob3cgPSBfYVswXSwgc2V0U2hvdyA9IF9hWzFdO1xyXG4gICAgdmFyIG11bHRpU2VsZWN0ID0gUmVhY3QudXNlUmVmKG51bGwpO1xyXG4gICAgZnVuY3Rpb24gSGFuZGxlU2hvdyhldnQpIHtcclxuICAgICAgICBpZiAobXVsdGlTZWxlY3QuY3VycmVudCA9PT0gbnVsbClcclxuICAgICAgICAgICAgc2V0U2hvdyghc2hvdyk7XHJcbiAgICAgICAgZWxzZSBpZiAoIW11bHRpU2VsZWN0LmN1cnJlbnQuY29udGFpbnMoZXZ0LnRhcmdldCkpXHJcbiAgICAgICAgICAgIHNldFNob3coZmFsc2UpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc2V0U2hvdyh0cnVlKTtcclxuICAgIH1cclxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgSGFuZGxlU2hvdywgZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIEhhbmRsZVNob3csIGZhbHNlKTtcclxuICAgICAgICB9O1xyXG4gICAgfSwgW10pO1xyXG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgcmVmOiBtdWx0aVNlbGVjdCwgc3R5bGU6IHsgcG9zaXRpb246ICdyZWxhdGl2ZScsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCB3aWR0aDogJ2luaGVyaXQnIH0gfSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgc3R5bGU6IHsgYm9yZGVyOiAnMXB4IHNvbGlkICNjZWQ0ZGEnLCBwYWRkaW5nOiAnLjM3NXJlbSAuNzVyZW0nLCBmb250U2l6ZTogJzFyZW0nLCBib3JkZXJSYWRpdXM6ICcuMjVyZW0nIH0sIGNsYXNzTmFtZTogXCJidG4gZm9ybS1jb250cm9sIGRyb3Bkb3duLXRvZ2dsZVwiLCBvbkNsaWNrOiBIYW5kbGVTaG93IH0sXHJcbiAgICAgICAgICAgIHByb3BzLk9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LlNlbGVjdGVkOyB9KS5sZW5ndGggIT09IHByb3BzLk9wdGlvbnMubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICA/IHByb3BzLk9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LlNlbGVjdGVkOyB9KS5sZW5ndGhcclxuICAgICAgICAgICAgICAgIDogJ0FsbCAnLFxyXG4gICAgICAgICAgICAnICcsXHJcbiAgICAgICAgICAgIFwiU2VsZWN0ZWRcIiksXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuNzUsXHJcbiAgICAgICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMCA1JyxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IHNob3cgPyAnYmxvY2snIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzBweCA4cHggMTZweCAwcHggcmdiYSgwLDAsMCwwLjIpJyxcclxuICAgICAgICAgICAgICAgIHpJbmRleDogNDAxLFxyXG4gICAgICAgICAgICAgICAgbWluV2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgfSB9LFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgeyBjbGFzc05hbWU6IFwidGFibGVcIiwgc3R5bGU6IHsgbWFyZ2luOiAwIH0gfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCB7IG9uQ2xpY2s6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuT25DaGFuZ2UoZXZ0LCBwcm9wcy5PcHRpb25zLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5TZWxlY3RlZCA9PT0gKHByb3BzLk9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChvKSB7IHJldHVybiBvLlNlbGVjdGVkOyB9KS5sZW5ndGggPT09IHByb3BzLk9wdGlvbnMubGVuZ3RoKTsgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBjaGVja2VkOiBwcm9wcy5PcHRpb25zLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5TZWxlY3RlZDsgfSkubGVuZ3RoID09PSBwcm9wcy5PcHRpb25zLmxlbmd0aCwgb25DaGFuZ2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH0gfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCwgXCJBbGxcIikpLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLk9wdGlvbnMubWFwKGZ1bmN0aW9uIChmLCBpKSB7IHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHsga2V5OiBpLCBvbkNsaWNrOiBmdW5jdGlvbiAoZXZ0KSB7IHJldHVybiBwcm9wcy5PbkNoYW5nZShldnQsIFtmXSk7IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNoZWNrZWQ6IGYuU2VsZWN0ZWQsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBudWxsOyB9IH0pKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsIGYuVGV4dCkpKTsgfSkpKSkpKTtcclxufTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gTXVsdGlTZWxlY3Q7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFNlbGVjdC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMjgvMjAyMCAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbmZ1bmN0aW9uIFNlbGVjdChwcm9wcykge1xyXG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIiB9LFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBwcm9wcy5MYWJlbCA9PSBudWxsID8gcHJvcHMuRmllbGQgOiBwcm9wcy5MYWJlbCksXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIiwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWNvcmQgPSBfX2Fzc2lnbih7fSwgcHJvcHMuUmVjb3JkKTtcclxuICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LnZhbHVlICE9PSAnJylcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbcHJvcHMuRmllbGRdID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRbcHJvcHMuRmllbGRdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihyZWNvcmQpO1xyXG4gICAgICAgICAgICB9LCB2YWx1ZTogcHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXSA9PSBudWxsID8gJycgOiBwcm9wcy5SZWNvcmRbcHJvcHMuRmllbGRdLnRvU3RyaW5nKCksIGRpc2FibGVkOiBwcm9wcy5EaXNhYmxlZCA9PSBudWxsID8gZmFsc2UgOiBwcm9wcy5EaXNhYmxlZCB9LFxyXG4gICAgICAgICAgICBwcm9wcy5FbXB0eU9wdGlvbiA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogXCJcIiB9LCBwcm9wcy5FbXB0eUxhYmVsICE9PSB1bmRlZmluZWQgPyBwcm9wcy5FbXB0eUxhYmVsIDogJycpIDogbnVsbCxcclxuICAgICAgICAgICAgcHJvcHMuT3B0aW9ucy5tYXAoZnVuY3Rpb24gKGEsIGkpIHsgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsga2V5OiBpLCB2YWx1ZTogYS5WYWx1ZSB9LCBhLkxhYmVsKSk7IH0pKSkpO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFNlbGVjdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFRleHRBcmVhLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8yMi8yMDIwIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG5mdW5jdGlvbiBUZXh0QXJlYShwcm9wcykge1xyXG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIiB9LFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBwcm9wcy5MYWJlbCA9PSBudWxsID8gcHJvcHMuRmllbGQgOiBwcm9wcy5MYWJlbCksXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIsIHsgcm93czogcHJvcHMuUm93cywgY2xhc3NOYW1lOiBwcm9wcy5WYWxpZChwcm9wcy5GaWVsZCkgPyAnZm9ybS1jb250cm9sJyA6ICdmb3JtLWNvbnRyb2wgaXMtaW52YWxpZCcsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVjb3JkID0gX19hc3NpZ24oe30sIHByb3BzLlJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldC52YWx1ZSAhPT0gJycpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkW3Byb3BzLkZpZWxkXSA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkW3Byb3BzLkZpZWxkXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIocmVjb3JkKTtcclxuICAgICAgICAgICAgfSwgdmFsdWU6IHByb3BzLlJlY29yZFtwcm9wcy5GaWVsZF0gPT0gbnVsbCA/ICcnIDogcHJvcHMuUmVjb3JkW3Byb3BzLkZpZWxkXS50b1N0cmluZygpLCBkaXNhYmxlZDogcHJvcHMuRGlzYWJsZWQgPT0gbnVsbCA/IGZhbHNlIDogcHJvcHMuRGlzYWJsZWQgfSksXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbnZhbGlkLWZlZWRiYWNrXCIgfSwgcHJvcHMuRmVlZGJhY2sgPT0gbnVsbCA/IHByb3BzLkZpZWxkICsgJyBpcyBhIHJlcXVpcmVkIGZpZWxkLicgOiBwcm9wcy5GZWVkYmFjaykpKTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBUZXh0QXJlYTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgaW5kZXgudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDA5LzI1LzIwMjAgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTXVsdGlDaGVja0JveFNlbGVjdCA9IGV4cG9ydHMuQXJyYXlDaGVja0JveGVzID0gZXhwb3J0cy5BcnJheU11bHRpU2VsZWN0ID0gZXhwb3J0cy5FbnVtQ2hlY2tCb3hlcyA9IGV4cG9ydHMuRGF0ZVJhbmdlUGlja2VyID0gZXhwb3J0cy5UZXh0QXJlYSA9IGV4cG9ydHMuU2VsZWN0ID0gZXhwb3J0cy5EYXRlUGlja2VyID0gZXhwb3J0cy5JbnB1dCA9IGV4cG9ydHMuQ2hlY2tCb3ggPSB2b2lkIDA7XHJcbnZhciBDaGVja0JveF8xID0gcmVxdWlyZShcIi4vQ2hlY2tCb3hcIik7XHJcbmV4cG9ydHMuQ2hlY2tCb3ggPSBDaGVja0JveF8xLmRlZmF1bHQ7XHJcbnZhciBJbnB1dF8xID0gcmVxdWlyZShcIi4vSW5wdXRcIik7XHJcbmV4cG9ydHMuSW5wdXQgPSBJbnB1dF8xLmRlZmF1bHQ7XHJcbnZhciBEYXRlUGlja2VyXzEgPSByZXF1aXJlKFwiLi9EYXRlUGlja2VyXCIpO1xyXG5leHBvcnRzLkRhdGVQaWNrZXIgPSBEYXRlUGlja2VyXzEuZGVmYXVsdDtcclxudmFyIFNlbGVjdF8xID0gcmVxdWlyZShcIi4vU2VsZWN0XCIpO1xyXG5leHBvcnRzLlNlbGVjdCA9IFNlbGVjdF8xLmRlZmF1bHQ7XHJcbnZhciBUZXh0QXJlYV8xID0gcmVxdWlyZShcIi4vVGV4dEFyZWFcIik7XHJcbmV4cG9ydHMuVGV4dEFyZWEgPSBUZXh0QXJlYV8xLmRlZmF1bHQ7XHJcbnZhciBEYXRlUmFuZ2VQaWNrZXJfMSA9IHJlcXVpcmUoXCIuL0RhdGVSYW5nZVBpY2tlclwiKTtcclxuZXhwb3J0cy5EYXRlUmFuZ2VQaWNrZXIgPSBEYXRlUmFuZ2VQaWNrZXJfMS5kZWZhdWx0O1xyXG52YXIgRW51bUNoZWNrQm94ZXNfMSA9IHJlcXVpcmUoXCIuL0VudW1DaGVja0JveGVzXCIpO1xyXG5leHBvcnRzLkVudW1DaGVja0JveGVzID0gRW51bUNoZWNrQm94ZXNfMS5kZWZhdWx0O1xyXG52YXIgQXJyYXlNdWx0aVNlbGVjdF8xID0gcmVxdWlyZShcIi4vQXJyYXlNdWx0aVNlbGVjdFwiKTtcclxuZXhwb3J0cy5BcnJheU11bHRpU2VsZWN0ID0gQXJyYXlNdWx0aVNlbGVjdF8xLmRlZmF1bHQ7XHJcbnZhciBBcnJheUNoZWNrQm94ZXNfMSA9IHJlcXVpcmUoXCIuL0FycmF5Q2hlY2tCb3hlc1wiKTtcclxuZXhwb3J0cy5BcnJheUNoZWNrQm94ZXMgPSBBcnJheUNoZWNrQm94ZXNfMS5kZWZhdWx0O1xyXG52YXIgTXV0bGlDaGVja0JveFNlbGVjdF8xID0gcmVxdWlyZShcIi4vTXV0bGlDaGVja0JveFNlbGVjdFwiKTtcclxuZXhwb3J0cy5NdWx0aUNoZWNrQm94U2VsZWN0ID0gTXV0bGlDaGVja0JveFNlbGVjdF8xLmRlZmF1bHQ7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=