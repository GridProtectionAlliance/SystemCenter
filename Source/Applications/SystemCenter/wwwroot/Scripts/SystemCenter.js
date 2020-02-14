/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"SystemCenter": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61":"vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61","Asset~ByAsset~ByLocation~Customer~Location~Meter~NewMeterWizard":"Asset~ByAsset~ByLocation~Customer~Location~Meter~NewMeterWizard","Asset~ByAsset~Location~Meter~NewMeterWizard":"Asset~ByAsset~Location~Meter~NewMeterWizard","Asset~Customer~Location~Meter":"Asset~Customer~Location~Meter","Asset":"Asset","Location":"Location","Meter":"Meter","ByAsset":"ByAsset","NewMeterWizard":"NewMeterWizard","Customer":"Customer","ByLocation":"ByLocation","ByCustomer":"ByCustomer","ByMeter":"ByMeter","ByUser~User":"ByUser~User","ByUser":"ByUser","User":"User","ConfigurationHistory":"ConfigurationHistory","UserStatistics":"UserStatistics"}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "C:\\Users\\bernest\\Source\\Repos\\SystemCenter\\Source\\Applications\\SystemCenter\\wwwroot\\Scripts";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./TSX/SystemCenter/SystemCenter.tsx","vendors~SystemCenter"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./TSX/SystemCenter/SystemCenter.tsx":
/*!*******************************************!*\
  !*** ./TSX/SystemCenter/SystemCenter.tsx ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! querystring */ "../../node_modules/querystring-es3/index.js");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! history */ "../../node_modules/history/es/index.js");
//******************************************************************************************************
//  SystemCenter.tsx - Gbtc
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
//  08/22/2019 - Billy Ernest
//       Generated original version of source code.
//
//******************************************************************************************************
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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





var SystemCenter = function (props) {
    var history = Object(history__WEBPACK_IMPORTED_MODULE_4__["createBrowserHistory"])();
    var ByMeter = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | ByMeter */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("ByMeter")]).then(__webpack_require__.bind(null, /*! ./Meter/ByMeter */ "./TSX/SystemCenter/Meter/ByMeter.tsx")); });
    var ByLocation = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | ByLocation */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("Asset~ByAsset~ByLocation~Customer~Location~Meter~NewMeterWizard"), __webpack_require__.e("ByLocation")]).then(__webpack_require__.bind(null, /*! ./Location/ByLocation */ "./TSX/SystemCenter/Location/ByLocation.tsx")); });
    var ByAsset = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | ByAsset */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("Asset~ByAsset~ByLocation~Customer~Location~Meter~NewMeterWizard"), __webpack_require__.e("Asset~ByAsset~Location~Meter~NewMeterWizard"), __webpack_require__.e("ByAsset")]).then(__webpack_require__.bind(null, /*! ./Asset/ByAsset */ "./TSX/SystemCenter/Asset/ByAsset.tsx")); });
    var ByCustomer = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | ByCustomer */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("ByCustomer")]).then(__webpack_require__.bind(null, /*! ./Customer/ByCustomer */ "./TSX/SystemCenter/Customer/ByCustomer.tsx")); });
    var ByUser = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | ByUser */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("ByUser~User"), __webpack_require__.e("ByUser")]).then(__webpack_require__.bind(null, /*! ./User/ByUser */ "./TSX/SystemCenter/User/ByUser.tsx")); });
    var UserStatistics = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | UserStatistics */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("UserStatistics")]).then(__webpack_require__.bind(null, /*! ./UserStatistics/UserStatistics */ "./TSX/SystemCenter/UserStatistics/UserStatistics.tsx")); });
    var Customer = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | Customer */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("Asset~ByAsset~ByLocation~Customer~Location~Meter~NewMeterWizard"), __webpack_require__.e("Asset~Customer~Location~Meter"), __webpack_require__.e("Customer")]).then(__webpack_require__.bind(null, /*! ./Customer/Customer */ "./TSX/SystemCenter/Customer/Customer.tsx")); });
    var User = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | User */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("ByUser~User"), __webpack_require__.e("User")]).then(__webpack_require__.bind(null, /*! ./User/User */ "./TSX/SystemCenter/User/User.tsx")); });
    var Asset = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | Asset */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("Asset~ByAsset~ByLocation~Customer~Location~Meter~NewMeterWizard"), __webpack_require__.e("Asset~ByAsset~Location~Meter~NewMeterWizard"), __webpack_require__.e("Asset~Customer~Location~Meter"), __webpack_require__.e("Asset")]).then(__webpack_require__.bind(null, /*! ./Asset/Asset */ "./TSX/SystemCenter/Asset/Asset.tsx")); });
    var NewMeterWizard = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | NewMeterWizard */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("Asset~ByAsset~ByLocation~Customer~Location~Meter~NewMeterWizard"), __webpack_require__.e("Asset~ByAsset~Location~Meter~NewMeterWizard"), __webpack_require__.e("NewMeterWizard")]).then(__webpack_require__.bind(null, /*! ./NewMeterWizard/NewMeterWizard */ "./TSX/SystemCenter/NewMeterWizard/NewMeterWizard.tsx")); });
    var ConfigurationHistory = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | ConfigurationHistory */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("ConfigurationHistory")]).then(__webpack_require__.bind(null, /*! ./ConfigurationHistory/ConfigurationHistory */ "./TSX/SystemCenter/ConfigurationHistory/ConfigurationHistory.tsx")); });
    var Meter = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | Meter */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("Asset~ByAsset~ByLocation~Customer~Location~Meter~NewMeterWizard"), __webpack_require__.e("Asset~ByAsset~Location~Meter~NewMeterWizard"), __webpack_require__.e("Asset~Customer~Location~Meter"), __webpack_require__.e("Meter")]).then(__webpack_require__.bind(null, /*! ./Meter/Meter */ "./TSX/SystemCenter/Meter/Meter.tsx")); });
    var Location = react__WEBPACK_IMPORTED_MODULE_0__["lazy"](function () { return Promise.all(/*! import() | Location */[__webpack_require__.e("vendors~Asset~ByAsset~ByCustomer~ByLocation~ByMeter~ByUser~ConfigurationHistory~Customer~Location~Me~e4468d61"), __webpack_require__.e("Asset~ByAsset~ByLocation~Customer~Location~Meter~NewMeterWizard"), __webpack_require__.e("Asset~ByAsset~Location~Meter~NewMeterWizard"), __webpack_require__.e("Asset~Customer~Location~Meter"), __webpack_require__.e("Location")]).then(__webpack_require__.bind(null, /*! ./Location/Location */ "./TSX/SystemCenter/Location/Location.tsx")); });
    var _a = __read(react__WEBPACK_IMPORTED_MODULE_0__["useState"]([]), 2), roles = _a[0], setRoles = _a[1];
    react__WEBPACK_IMPORTED_MODULE_0__["useEffect"](function () {
        var handle = getRoles();
        handle.done(function (rs) { return setRoles(rs); });
        return function cleanup() {
            if (handle.abort != null)
                handle.abort();
        };
    }, []);
    function getRoles() {
        return $.ajax({
            type: "GET",
            url: homePath + "api/SystemCenter/SecurityRoles",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            cache: false,
            async: true
        });
    }
    if (Object.keys(querystring__WEBPACK_IMPORTED_MODULE_3___default.a.parse(history.location.search)).length == 0)
        history.push({ pathname: homePath + 'index.cshtml', search: 'name=Meters', state: {} });
    return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("nav", { className: "navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow", style: { height: 75 } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "col-sm-3 col-md-2 mr-0", style: { textAlign: 'center' }, href: "https://www.gridprotectionalliance.org" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { style: { width: '100%', margin: -5 }, src: "../Images/SystemCenter-TopLeft.png" })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { className: "navbar-nav px-3" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item text-nowrap" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { className: "nav-link", href: "#" }, "Sign out")))),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "container-fluid", style: { top: 75, position: 'absolute', width: '100%', height: 'calc(100% - 75px)', overflow: 'hidden' } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "row", style: { height: '100%' } },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("nav", { className: "col bg-light sidebar", style: { maxWidth: 250 } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "sidebar-sticky" },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', marginTop: 5, textAlign: 'center' } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h3", null, "System Center")),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h6", { style: { fontWeight: 'bold', marginLeft: 10 }, className: "sidebar-heading" }, "Monitors and Assets"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { marginLeft: 10 }, className: "nav flex-column" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], { activeClassName: 'nav-link active', className: "nav-link", isActive: function (match, location) { return location.pathname + location.search == controllerViewPath + "?name=Meters"; }, to: controllerViewPath + "?name=Meters" }, "Meters")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], { activeClassName: 'nav-link active', className: "nav-link", isActive: function (match, location) { return location.pathname + location.search == controllerViewPath + "?name=Locations"; }, to: controllerViewPath + "?name=Locations" }, "Substations")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], { activeClassName: 'nav-link active', className: "nav-link", isActive: function (match, location) { return location.pathname + location.search == controllerViewPath + "?name=Assets"; }, to: controllerViewPath + "?name=Assets" }, "Transmission Assets"))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h6", { style: { fontWeight: 'bold', marginLeft: 10 }, className: "sidebar-heading" }, "External Links"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { marginLeft: 10 }, className: "nav flex-column" },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], { activeClassName: 'nav-link active', className: "nav-link", isActive: function (match, location) { return location.pathname + location.search == controllerViewPath + "?name=PQViewCustomers"; }, to: controllerViewPath + "?name=PQViewCustomers" }, "PQView Customer Access")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], { activeClassName: 'nav-link active', className: "nav-link", isActive: function (match, location) { return location.pathname + location.search == controllerViewPath + "?name=PQViewSites"; }, to: controllerViewPath + "?name=PQViewSites" }, "PQView Sites"))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h6", { style: { fontWeight: 'bold', marginLeft: 10 }, className: "sidebar-heading", hidden: roles.indexOf('Administrator') < 0 }, "System Settings"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { marginLeft: 10 }, className: "nav flex-column", hidden: roles.indexOf('Administrator') < 0 },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], { activeClassName: 'nav-link active', className: "nav-link", isActive: function (match, location) { return location.pathname + location.search == controllerViewPath + "?name=ValueLists"; }, to: controllerViewPath + "?name=ValueLists" }, "Value Lists"))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("hr", null),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h6", { style: { fontWeight: 'bold', marginLeft: 10 }, className: "sidebar-heading", hidden: roles.indexOf('Administrator') < 0 }, "User Settings"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", { style: { marginLeft: 10 }, className: "nav flex-column", hidden: roles.indexOf('Administrator') < 0 },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], { activeClassName: 'nav-link active', className: "nav-link", isActive: function (match, location) { return location.pathname + location.search == controllerViewPath + "?name=UserStatistics"; }, to: controllerViewPath + "?name=UserStatistics" }, "User Statistics")),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", { className: "nav-item" },
                                react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], { activeClassName: 'nav-link active', className: "nav-link", isActive: function (match, location) { return location.pathname + location.search == controllerViewPath + "?name=Users"; }, to: controllerViewPath + "?name=Users" }, "Users"))),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { width: '100%', textAlign: 'center', position: 'absolute', bottom: 50 } },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "Version 0.1"),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null)))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "col", style: { width: '100%', height: 'inherit', padding: '0 0 0 0', overflow: 'hidden' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], { fallback: react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, "Loading...") },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], { children: function (_a) {
                                var match = _a.match, rest = __rest(_a, ["match"]);
                                var qs = querystring__WEBPACK_IMPORTED_MODULE_3___default.a.parse(rest.location.search);
                                if (qs['?name'] == undefined || qs['?name'] == "Meters") {
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ByMeter, { Roles: roles });
                                }
                                else if (qs['?name'] == "Locations") {
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ByLocation, { Roles: roles });
                                }
                                else if (qs['?name'] == "Assets")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ByAsset, { Roles: roles });
                                else if (qs['?name'] == "Users")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ByUser, { Roles: roles });
                                else if (qs['?name'] == "User")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](User, { UserID: qs.UserAccountID });
                                else if (qs['?name'] == "UserStatistics")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](UserStatistics, { Roles: roles });
                                else if (qs['?name'] == "Meter")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Meter, { MeterID: parseInt(qs.MeterID) });
                                else if (qs['?name'] == "Location")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Location, { LocationID: parseInt(qs.LocationID) });
                                else if (qs['?name'] == "Asset")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Asset, { AssetID: parseInt(qs.AssetID) });
                                else if (qs['?name'] == "Customer")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Customer, { CustomerID: parseInt(qs.CustomerID) });
                                else if (qs['?name'] == "PQViewSites")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("iframe", { style: { width: '100%', height: '100%' }, src: homePath + 'PQViewDataLoader.cshtml' });
                                else if (qs['?name'] == "PQViewCustomers")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ByCustomer, { Roles: roles });
                                else if (qs['?name'] == "NewMeterWizard")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](NewMeterWizard, null);
                                else
                                    return null;
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], { children: function (_a) {
                                var match = _a.match, rest = __rest(_a, ["match"]);
                                if (roles.indexOf('Administrator') < 0)
                                    return null;
                                else if (querystring__WEBPACK_IMPORTED_MODULE_3___default.a.parse(rest.location.search)['?name'] == "ValueLists")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("iframe", { style: { width: '100%', height: '100%' }, src: homePath + 'ValueListGroups.cshtml' });
                                else
                                    return null;
                            } }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], { children: function (_a) {
                                var match = _a.match, rest = __rest(_a, ["match"]);
                                if (roles.indexOf('Administrator') < 0 && roles.indexOf('Transmission SME') < 0)
                                    return null;
                                else if (querystring__WEBPACK_IMPORTED_MODULE_3___default.a.parse(rest.location.search)['?name'] == "ConfigurationHistory")
                                    return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](ConfigurationHistory, { MeterConfigurationID: parseInt(querystring__WEBPACK_IMPORTED_MODULE_3___default.a.parse(rest.location.search).MeterConfigurationID), MeterKey: querystring__WEBPACK_IMPORTED_MODULE_3___default.a.parse(rest.location.search).MeterKey });
                                else
                                    return null;
                            } })))))));
};
react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](SystemCenter, null), document.getElementById('window'));


/***/ }),

/***/ "d3":
/*!*********************!*\
  !*** external "d3" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = d3;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ "react-router-dom":
/*!*********************************!*\
  !*** external "ReactRouterDOM" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactRouterDOM;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vVFNYL1N5c3RlbUNlbnRlci9TeXN0ZW1DZW50ZXIudHN4Iiwid2VicGFjazovLy9leHRlcm5hbCBcImQzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdERPTVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0Um91dGVyRE9NXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSx5Q0FBeUMsczFCQUFzMUI7UUFDLzNCOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7O1FBRUE7UUFDQSxpQ0FBaUM7O1FBRWpDO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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SUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxvQkFBOEIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxrREFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQWtCLEdBQUc7O29DQUU1TSxPQUFPLElBQUksQ0FBQzs0QkFDcEIsQ0FBQyxHQUFJLENBQ1EsQ0FDZixDQUVKLENBQ0osQ0FDRCxDQUNaO0FBQ0wsQ0FBQztBQUVELGdEQUFlLENBQUMsb0RBQUMsWUFBWSxPQUFHLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNyTnJFLG9COzs7Ozs7Ozs7OztBQ0FBLHVCOzs7Ozs7Ozs7OztBQ0FBLDBCOzs7Ozs7Ozs7OztBQ0FBLGdDIiwiZmlsZSI6IlN5c3RlbUNlbnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiU3lzdGVtQ2VudGVyXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1widmVuZG9yc35Bc3NldH5CeUFzc2V0fkJ5Q3VzdG9tZXJ+QnlMb2NhdGlvbn5CeU1ldGVyfkJ5VXNlcn5Db25maWd1cmF0aW9uSGlzdG9yeX5DdXN0b21lcn5Mb2NhdGlvbn5NZX5lNDQ2OGQ2MVwiOlwidmVuZG9yc35Bc3NldH5CeUFzc2V0fkJ5Q3VzdG9tZXJ+QnlMb2NhdGlvbn5CeU1ldGVyfkJ5VXNlcn5Db25maWd1cmF0aW9uSGlzdG9yeX5DdXN0b21lcn5Mb2NhdGlvbn5NZX5lNDQ2OGQ2MVwiLFwiQXNzZXR+QnlBc3NldH5CeUxvY2F0aW9ufkN1c3RvbWVyfkxvY2F0aW9ufk1ldGVyfk5ld01ldGVyV2l6YXJkXCI6XCJBc3NldH5CeUFzc2V0fkJ5TG9jYXRpb25+Q3VzdG9tZXJ+TG9jYXRpb25+TWV0ZXJ+TmV3TWV0ZXJXaXphcmRcIixcIkFzc2V0fkJ5QXNzZXR+TG9jYXRpb25+TWV0ZXJ+TmV3TWV0ZXJXaXphcmRcIjpcIkFzc2V0fkJ5QXNzZXR+TG9jYXRpb25+TWV0ZXJ+TmV3TWV0ZXJXaXphcmRcIixcIkFzc2V0fkN1c3RvbWVyfkxvY2F0aW9ufk1ldGVyXCI6XCJBc3NldH5DdXN0b21lcn5Mb2NhdGlvbn5NZXRlclwiLFwiQXNzZXRcIjpcIkFzc2V0XCIsXCJMb2NhdGlvblwiOlwiTG9jYXRpb25cIixcIk1ldGVyXCI6XCJNZXRlclwiLFwiQnlBc3NldFwiOlwiQnlBc3NldFwiLFwiTmV3TWV0ZXJXaXphcmRcIjpcIk5ld01ldGVyV2l6YXJkXCIsXCJDdXN0b21lclwiOlwiQ3VzdG9tZXJcIixcIkJ5TG9jYXRpb25cIjpcIkJ5TG9jYXRpb25cIixcIkJ5Q3VzdG9tZXJcIjpcIkJ5Q3VzdG9tZXJcIixcIkJ5TWV0ZXJcIjpcIkJ5TWV0ZXJcIixcIkJ5VXNlcn5Vc2VyXCI6XCJCeVVzZXJ+VXNlclwiLFwiQnlVc2VyXCI6XCJCeVVzZXJcIixcIlVzZXJcIjpcIlVzZXJcIixcIkNvbmZpZ3VyYXRpb25IaXN0b3J5XCI6XCJDb25maWd1cmF0aW9uSGlzdG9yeVwiLFwiVXNlclN0YXRpc3RpY3NcIjpcIlVzZXJTdGF0aXN0aWNzXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmJ1bmRsZS5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcignTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKScpO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJDOlxcXFxVc2Vyc1xcXFxiZXJuZXN0XFxcXFNvdXJjZVxcXFxSZXBvc1xcXFxTeXN0ZW1DZW50ZXJcXFxcU291cmNlXFxcXEFwcGxpY2F0aW9uc1xcXFxTeXN0ZW1DZW50ZXJcXFxcd3d3cm9vdFxcXFxTY3JpcHRzXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL1RTWC9TeXN0ZW1DZW50ZXIvU3lzdGVtQ2VudGVyLnRzeFwiLFwidmVuZG9yc35TeXN0ZW1DZW50ZXJcIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgU3lzdGVtQ2VudGVyLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDE5LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwOC8yMi8yMDE5IC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIGFzIFJvdXRlciwgUm91dGUsIE5hdkxpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuXHJcbmltcG9ydCBxdWVyeVN0cmluZyBmcm9tIFwicXVlcnlzdHJpbmdcIjtcbmltcG9ydCB7IGNyZWF0ZUJyb3dzZXJIaXN0b3J5IH0gZnJvbSBcImhpc3RvcnlcIlxuaW1wb3J0IHsgU3lzdGVtQ2VudGVyIH0gZnJvbSAnLi9nbG9iYWwnO1xyXG5cclxuLy9pbXBvcnQgQXNzZXQgZnJvbSAnLi9Bc3NldC9Bc3NldCc7XHJcblxyXG5kZWNsYXJlIHZhciBob21lUGF0aDogc3RyaW5nO1xyXG5kZWNsYXJlIHZhciBjb250cm9sbGVyVmlld1BhdGg6IHN0cmluZztcclxuXHJcbmNvbnN0IFN5c3RlbUNlbnRlcjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQgPSAocHJvcHM6IHt9KSA9PiB7XHJcbiAgICBjb25zdCBoaXN0b3J5ID0gY3JlYXRlQnJvd3Nlckhpc3RvcnkoKTtcclxuICAgIGNvbnN0IEJ5TWV0ZXIgPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgvKndlYnBhY2tDaHVua05hbWU6IFwiQnlNZXRlclwiKi8nLi9NZXRlci9CeU1ldGVyJykpO1xyXG4gICAgY29uc3QgQnlMb2NhdGlvbiA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiQnlMb2NhdGlvblwiICovICcuL0xvY2F0aW9uL0J5TG9jYXRpb24nKSk7XHJcbiAgICBjb25zdCBCeUFzc2V0ID0gUmVhY3QubGF6eSgoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJCeUFzc2V0XCIgKi8gJy4vQXNzZXQvQnlBc3NldCcpKTtcclxuICAgIGNvbnN0IEJ5Q3VzdG9tZXIgPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIkJ5Q3VzdG9tZXJcIiAqLyAnLi9DdXN0b21lci9CeUN1c3RvbWVyJykpO1xyXG4gICAgY29uc3QgQnlVc2VyID0gUmVhY3QubGF6eSgoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJCeVVzZXJcIiAqLyAnLi9Vc2VyL0J5VXNlcicpKTtcclxuXHJcbiAgICBjb25zdCBVc2VyU3RhdGlzdGljcyA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiVXNlclN0YXRpc3RpY3NcIiAqLyAnLi9Vc2VyU3RhdGlzdGljcy9Vc2VyU3RhdGlzdGljcycpKTtcclxuXHJcbiAgICBjb25zdCBDdXN0b21lciA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiQ3VzdG9tZXJcIiAqLyAnLi9DdXN0b21lci9DdXN0b21lcicpKTtcclxuICAgIGNvbnN0IFVzZXIgPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIlVzZXJcIiAqLyAnLi9Vc2VyL1VzZXInKSk7XHJcblxyXG4gICAgY29uc3QgQXNzZXQgPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIkFzc2V0XCIgKi8gJy4vQXNzZXQvQXNzZXQnKSk7XHJcbiAgICBjb25zdCBOZXdNZXRlcldpemFyZCA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KCAvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIk5ld01ldGVyV2l6YXJkXCIgKi8gJy4vTmV3TWV0ZXJXaXphcmQvTmV3TWV0ZXJXaXphcmQnKSk7XHJcbiAgICBjb25zdCBDb25maWd1cmF0aW9uSGlzdG9yeSA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiQ29uZmlndXJhdGlvbkhpc3RvcnlcIiAqLyAnLi9Db25maWd1cmF0aW9uSGlzdG9yeS9Db25maWd1cmF0aW9uSGlzdG9yeScpKTtcclxuICAgIGNvbnN0IE1ldGVyID0gUmVhY3QubGF6eSgoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJNZXRlclwiICovICcuL01ldGVyL01ldGVyJykpO1xyXG4gICAgY29uc3QgTG9jYXRpb24gPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIkxvY2F0aW9uXCIgKi8gJy4vTG9jYXRpb24vTG9jYXRpb24nKSk7XHJcblxyXG4gICAgY29uc3QgW3JvbGVzLCBzZXRSb2xlc10gPSBSZWFjdC51c2VTdGF0ZTxBcnJheTxTeXN0ZW1DZW50ZXIuU3lzdGVtQ2VuZXRlclNlY3VyaXR5Um9sZU5hbWU+PihbXSk7XHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgaGFuZGxlID0gZ2V0Um9sZXMoKTtcclxuICAgICAgICBoYW5kbGUuZG9uZShycyA9PiBzZXRSb2xlcyhycykpO1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY2xlYW51cCgpIHtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZS5hYm9ydCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlLmFib3J0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRSb2xlcygpOiBKUXVlcnkuanFYSFI8QXJyYXk8U3lzdGVtQ2VudGVyLlN5c3RlbUNlbmV0ZXJTZWN1cml0eVJvbGVOYW1lPj4ge1xyXG4gICAgICAgcmV0dXJuICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogYCR7aG9tZVBhdGh9YXBpL1N5c3RlbUNlbnRlci9TZWN1cml0eVJvbGVzYCxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE9iamVjdC5rZXlzKHF1ZXJ5U3RyaW5nLnBhcnNlKGhpc3RvcnkubG9jYXRpb24uc2VhcmNoKSkubGVuZ3RoID09IDApXHJcbiAgICAgICAgaGlzdG9yeS5wdXNoKHsgcGF0aG5hbWU6IGhvbWVQYXRoICsgJ2luZGV4LmNzaHRtbCcsIHNlYXJjaDogJ25hbWU9TWV0ZXJzJywgc3RhdGU6IHt9IH0pXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Um91dGVyPlxyXG4gICAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZGFyayBmaXhlZC10b3AgYmctZGFyayBmbGV4LW1kLW5vd3JhcCBwLTAgc2hhZG93XCIgc3R5bGU9e3toZWlnaHQ6IDc1fX0+XHJcbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJjb2wtc20tMyBjb2wtbWQtMiBtci0wXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2NlbnRlcid9fWhyZWY9XCJodHRwczovL3d3dy5ncmlkcHJvdGVjdGlvbmFsbGlhbmNlLm9yZ1wiPjxpbWcgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWFyZ2luOiAtNSB9fSBzcmM9e1wiLi4vSW1hZ2VzL1N5c3RlbUNlbnRlci1Ub3BMZWZ0LnBuZ1wifSAvPjwvYT5cclxuICAgICAgICAgICAgICAgIHsvKjxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLWRhcmsgdy0xMDBcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCIgYXJpYS1sYWJlbD1cIlNlYXJjaFwiLz4qL31cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXZiYXItbmF2IHB4LTNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW0gdGV4dC1ub3dyYXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBocmVmPVwiI1wiPlNpZ24gb3V0PC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L25hdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItZmx1aWRcIiBzdHlsZT17eyB0b3A6IDc1LCAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJ2NhbGMoMTAwJSAtIDc1cHgpJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT17e2hlaWdodDogJzEwMCUnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJjb2wgYmctbGlnaHQgc2lkZWJhclwiIHN0eWxlPXt7IG1heFdpZHRoOiAyNTAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZWJhci1zdGlja3lcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgbWFyZ2luVG9wOiA1LCB0ZXh0QWxpZ246ICdjZW50ZXInIH19PjxoMz5TeXN0ZW0gQ2VudGVyPC9oMz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxociAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNiBzdHlsZT17eyBmb250V2VpZ2h0OiAnYm9sZCcsIG1hcmdpbkxlZnQ6IDEwIH19IGNsYXNzTmFtZT1cInNpZGViYXItaGVhZGluZ1wiPk1vbml0b3JzIGFuZCBBc3NldHM8L2g2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IDEwIH19IGNsYXNzTmFtZT1cIm5hdiBmbGV4LWNvbHVtblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBhY3RpdmVDbGFzc05hbWU9J25hdi1saW5rIGFjdGl2ZScgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBpc0FjdGl2ZT17KG1hdGNoLCBsb2NhdGlvbikgPT4gbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2ggPT0gY29udHJvbGxlclZpZXdQYXRoICsgXCI/bmFtZT1NZXRlcnNcIn0gdG89e2NvbnRyb2xsZXJWaWV3UGF0aCArIFwiP25hbWU9TWV0ZXJzXCJ9Pk1ldGVyczwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBhY3RpdmVDbGFzc05hbWU9J25hdi1saW5rIGFjdGl2ZScgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBpc0FjdGl2ZT17KG1hdGNoLCBsb2NhdGlvbikgPT4gbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2ggPT0gY29udHJvbGxlclZpZXdQYXRoICsgXCI/bmFtZT1Mb2NhdGlvbnNcIn0gdG89e2NvbnRyb2xsZXJWaWV3UGF0aCArIFwiP25hbWU9TG9jYXRpb25zXCJ9PlN1YnN0YXRpb25zPC9OYXZMaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGFjdGl2ZUNsYXNzTmFtZT0nbmF2LWxpbmsgYWN0aXZlJyBjbGFzc05hbWU9XCJuYXYtbGlua1wiIGlzQWN0aXZlPXsobWF0Y2gsIGxvY2F0aW9uKSA9PiBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCA9PSBjb250cm9sbGVyVmlld1BhdGggKyBcIj9uYW1lPUFzc2V0c1wifSB0bz17Y29udHJvbGxlclZpZXdQYXRoICsgXCI/bmFtZT1Bc3NldHNcIn0+VHJhbnNtaXNzaW9uIEFzc2V0czwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNiBzdHlsZT17eyBmb250V2VpZ2h0OiAnYm9sZCcsIG1hcmdpbkxlZnQ6IDEwIH19IGNsYXNzTmFtZT1cInNpZGViYXItaGVhZGluZ1wiPkV4dGVybmFsIExpbmtzPC9oNj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyBtYXJnaW5MZWZ0OiAxMCB9fSBjbGFzc05hbWU9XCJuYXYgZmxleC1jb2x1bW5cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgYWN0aXZlQ2xhc3NOYW1lPSduYXYtbGluayBhY3RpdmUnIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaXNBY3RpdmU9eyhtYXRjaCwgbG9jYXRpb24pID0+IGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoID09IGNvbnRyb2xsZXJWaWV3UGF0aCArIFwiP25hbWU9UFFWaWV3Q3VzdG9tZXJzXCJ9IHRvPXtjb250cm9sbGVyVmlld1BhdGggKyBcIj9uYW1lPVBRVmlld0N1c3RvbWVyc1wifT5QUVZpZXcgQ3VzdG9tZXIgQWNjZXNzPC9OYXZMaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGFjdGl2ZUNsYXNzTmFtZT0nbmF2LWxpbmsgYWN0aXZlJyBjbGFzc05hbWU9XCJuYXYtbGlua1wiIGlzQWN0aXZlPXsobWF0Y2gsIGxvY2F0aW9uKSA9PiBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCA9PSBjb250cm9sbGVyVmlld1BhdGggKyBcIj9uYW1lPVBRVmlld1NpdGVzXCJ9IHRvPXtjb250cm9sbGVyVmlld1BhdGggKyBcIj9uYW1lPVBRVmlld1NpdGVzXCJ9PlBRVmlldyBTaXRlczwvTmF2TGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aHIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNiBzdHlsZT17e2ZvbnRXZWlnaHQ6ICdib2xkJywgbWFyZ2luTGVmdDogMTB9fSBjbGFzc05hbWU9XCJzaWRlYmFyLWhlYWRpbmdcIiBoaWRkZW49e3JvbGVzLmluZGV4T2YoJ0FkbWluaXN0cmF0b3InKSA8IDB9PlN5c3RlbSBTZXR0aW5nczwvaDY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgc3R5bGU9e3sgbWFyZ2luTGVmdDogMTAgfX0gY2xhc3NOYW1lPVwibmF2IGZsZXgtY29sdW1uXCIgaGlkZGVuPXtyb2xlcy5pbmRleE9mKCdBZG1pbmlzdHJhdG9yJykgPCAwfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5hdkxpbmsgYWN0aXZlQ2xhc3NOYW1lPSduYXYtbGluayBhY3RpdmUnIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgaXNBY3RpdmU9eyhtYXRjaCwgbG9jYXRpb24pID0+IGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoID09IGNvbnRyb2xsZXJWaWV3UGF0aCArIFwiP25hbWU9VmFsdWVMaXN0c1wifSB0bz17Y29udHJvbGxlclZpZXdQYXRoICsgXCI/bmFtZT1WYWx1ZUxpc3RzXCJ9PlZhbHVlIExpc3RzPC9OYXZMaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxociAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg2IHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICdib2xkJywgbWFyZ2luTGVmdDogMTAgfX0gY2xhc3NOYW1lPVwic2lkZWJhci1oZWFkaW5nXCIgaGlkZGVuPXtyb2xlcy5pbmRleE9mKCdBZG1pbmlzdHJhdG9yJykgPCAwfT5Vc2VyIFNldHRpbmdzPC9oNj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBzdHlsZT17eyBtYXJnaW5MZWZ0OiAxMCB9fSBjbGFzc05hbWU9XCJuYXYgZmxleC1jb2x1bW5cIiBoaWRkZW49e3JvbGVzLmluZGV4T2YoJ0FkbWluaXN0cmF0b3InKSA8IDB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TmF2TGluayBhY3RpdmVDbGFzc05hbWU9J25hdi1saW5rIGFjdGl2ZScgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBpc0FjdGl2ZT17KG1hdGNoLCBsb2NhdGlvbikgPT4gbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2ggPT0gY29udHJvbGxlclZpZXdQYXRoICsgXCI/bmFtZT1Vc2VyU3RhdGlzdGljc1wifSB0bz17Y29udHJvbGxlclZpZXdQYXRoICsgXCI/bmFtZT1Vc2VyU3RhdGlzdGljc1wifT5Vc2VyIFN0YXRpc3RpY3M8L05hdkxpbms+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxOYXZMaW5rIGFjdGl2ZUNsYXNzTmFtZT0nbmF2LWxpbmsgYWN0aXZlJyBjbGFzc05hbWU9XCJuYXYtbGlua1wiIGlzQWN0aXZlPXsobWF0Y2gsIGxvY2F0aW9uKSA9PiBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCA9PSBjb250cm9sbGVyVmlld1BhdGggKyBcIj9uYW1lPVVzZXJzXCJ9IHRvPXtjb250cm9sbGVyVmlld1BhdGggKyBcIj9uYW1lPVVzZXJzXCJ9PlVzZXJzPC9OYXZMaW5rPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnY2VudGVyJywgcG9zaXRpb246J2Fic29sdXRlJywgYm90dG9tOiA1MCB9fT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VmVyc2lvbiAwLjE8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L25hdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJ2luaGVyaXQnLCBwYWRkaW5nOiAnMCAwIDAgMCcsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFJlYWN0LlN1c3BlbnNlIGZhbGxiYWNrPXs8ZGl2PkxvYWRpbmcuLi48L2Rpdj59PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvdXRlIGNoaWxkcmVuPXsoeyBtYXRjaCwgLi4ucmVzdCB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHFzID0gcXVlcnlTdHJpbmcucGFyc2UocmVzdC5sb2NhdGlvbi5zZWFyY2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxc1snP25hbWUnXSA9PSB1bmRlZmluZWQgfHwgcXNbJz9uYW1lJ10gPT0gXCJNZXRlcnNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEJ5TWV0ZXIgUm9sZXM9e3JvbGVzfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChxc1snP25hbWUnXSA9PSBcIkxvY2F0aW9uc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QnlMb2NhdGlvbiBSb2xlcz17cm9sZXN9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHFzWyc/bmFtZSddID09IFwiQXNzZXRzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QnlBc3NldCBSb2xlcz17cm9sZXN9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocXNbJz9uYW1lJ10gPT0gXCJVc2Vyc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEJ5VXNlciBSb2xlcz17cm9sZXN9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocXNbJz9uYW1lJ10gPT0gXCJVc2VyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8VXNlciBVc2VySUQ9e3FzLlVzZXJBY2NvdW50SUQgYXMgc3RyaW5nfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHFzWyc/bmFtZSddID09IFwiVXNlclN0YXRpc3RpY3NcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxVc2VyU3RhdGlzdGljcyBSb2xlcz17cm9sZXN9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocXNbJz9uYW1lJ10gPT0gXCJNZXRlclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1ldGVyIE1ldGVySUQ9e3BhcnNlSW50KHFzLk1ldGVySUQgYXMgc3RyaW5nKX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChxc1snP25hbWUnXSA9PSBcIkxvY2F0aW9uXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8TG9jYXRpb24gTG9jYXRpb25JRD17cGFyc2VJbnQocXMuTG9jYXRpb25JRCBhcyBzdHJpbmcpfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHFzWyc/bmFtZSddID09IFwiQXNzZXRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBc3NldCBBc3NldElEPXtwYXJzZUludChxcy5Bc3NldElEIGFzIHN0cmluZyl9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocXNbJz9uYW1lJ10gPT0gXCJDdXN0b21lclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEN1c3RvbWVyIEN1c3RvbWVySUQ9e3BhcnNlSW50KHFzLkN1c3RvbWVySUQgYXMgc3RyaW5nKX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChxc1snP25hbWUnXSA9PSBcIlBRVmlld1NpdGVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8aWZyYW1lIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH19IHNyYz17aG9tZVBhdGggKyAnUFFWaWV3RGF0YUxvYWRlci5jc2h0bWwnfT48L2lmcmFtZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChxc1snP25hbWUnXSA9PSBcIlBRVmlld0N1c3RvbWVyc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEJ5Q3VzdG9tZXIgUm9sZXM9e3JvbGVzfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHFzWyc/bmFtZSddID09IFwiTmV3TWV0ZXJXaXphcmRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxOZXdNZXRlcldpemFyZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBjaGlsZHJlbj17KHsgbWF0Y2gsIC4uLnJlc3QgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb2xlcy5pbmRleE9mKCdBZG1pbmlzdHJhdG9yJykgPCAwKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChxdWVyeVN0cmluZy5wYXJzZShyZXN0LmxvY2F0aW9uLnNlYXJjaClbJz9uYW1lJ10gPT0gXCJWYWx1ZUxpc3RzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8aWZyYW1lIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnIH19IHNyYz17aG9tZVBhdGggKyAnVmFsdWVMaXN0R3JvdXBzLmNzaHRtbCd9PjwvaWZyYW1lPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBjaGlsZHJlbj17KHsgbWF0Y2gsIC4uLnJlc3QgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb2xlcy5pbmRleE9mKCdBZG1pbmlzdHJhdG9yJykgPCAwICYmIHJvbGVzLmluZGV4T2YoJ1RyYW5zbWlzc2lvbiBTTUUnKSA8IDApIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHF1ZXJ5U3RyaW5nLnBhcnNlKHJlc3QubG9jYXRpb24uc2VhcmNoKVsnP25hbWUnXSA9PSBcIkNvbmZpZ3VyYXRpb25IaXN0b3J5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8Q29uZmlndXJhdGlvbkhpc3RvcnkgTWV0ZXJDb25maWd1cmF0aW9uSUQ9e3BhcnNlSW50KHF1ZXJ5U3RyaW5nLnBhcnNlKHJlc3QubG9jYXRpb24uc2VhcmNoKS5NZXRlckNvbmZpZ3VyYXRpb25JRCBhcyBzdHJpbmcpfSBNZXRlcktleT17cXVlcnlTdHJpbmcucGFyc2UocmVzdC5sb2NhdGlvbi5zZWFyY2gpLk1ldGVyS2V5IGFzIHN0cmluZ30vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1JlYWN0LlN1c3BlbnNlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L1JvdXRlcj5cclxuICAgIClcclxufVxyXG5cclxuUmVhY3RET00ucmVuZGVyKDxTeXN0ZW1DZW50ZXIgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5kb3cnKSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZDM7IiwibW9kdWxlLmV4cG9ydHMgPSBSZWFjdDsiLCJtb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NOyIsIm1vZHVsZS5leHBvcnRzID0gUmVhY3RSb3V0ZXJET007Il0sInNvdXJjZVJvb3QiOiIifQ==