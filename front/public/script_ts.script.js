"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksnake_game"] = self["webpackChunksnake_game"] || []).push([["script_ts"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./styles.css":
/*!**********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./styles.css ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n\\tbox-sizing: border-box;\\n\\tmargin: 0;\\n}\\n.content-wrapper {\\n\\ttop: 5%;\\n\\tleft: 0;\\n\\twidth: 100%;\\n\\theight: 80%;\\n\\tposition: absolute;\\n\\tdisplay: flex;\\n\\talign-items: center;\\n\\tjustify-content: center;\\n\\tflex-direction: column;\\n}\\n\\n.content-wrapper span {\\n\\tfont-family: \\\"Pacifico\\\";\\n\\tfont-size: 20px;\\n}\\n\\n.game-panel {\\n\\tmargin-bottom: 20px;\\n}\\n\\n.flex {\\n\\tdisplay: flex;\\n\\tmargin-left: 10px;\\n}\\n.label {\\n\\tmargin-right: 10px;\\n\\tfont-weight: bold;\\n}\\n\\nh1{\\n\\tfont-family: cursive;\\n\\tcolor: rgb(3, 30, 105);\\n\\tfont-weight: bold;\\n\\ttext-align: end;\\n\\tmargin-right: 50px;\\n\\tmargin-top: 5px;\\n}\\n\\n.bg {\\n  animation: slide 3s ease-in-out infinite alternate;\\n  background-image: linear-gradient(-65deg, #586f58 50%, #39341c 50%);\\n}\\n\\n.bg:nth-child(2) {\\n  animation-direction:alternate-reverse;\\n  animation-duration:4s;\\n}\\n\\n.bg:nth-child(3) {\\n  animation-duration:5s;\\n}\\n\\n@keyframes slide {\\n  0% {\\n\\ttransform:translateX(-25%);\\n  }\\n  100% {\\n\\ttransform:translateX(25%);\\n  }\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://snake_game/./styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://snake_game/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://snake_game/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./styles.css":
/*!********************!*\
  !*** ./styles.css ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\n;\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_5__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_5__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_5__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_5__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://snake_game/./styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://snake_game/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://snake_game/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://snake_game/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://snake_game/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js":
/*!************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js ***!
  \************************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join(\"\\n\");\n  };\n}();\n\n/* istanbul ignore next  */\nfunction apply(styleElement, index, remove, obj) {\n  var css;\n  if (remove) {\n    css = \"\";\n  } else {\n    css = \"\";\n    if (obj.supports) {\n      css += \"@supports (\".concat(obj.supports, \") {\");\n    }\n    if (obj.media) {\n      css += \"@media \".concat(obj.media, \" {\");\n    }\n    var needLayer = typeof obj.layer !== \"undefined\";\n    if (needLayer) {\n      css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n    }\n    css += obj.css;\n    if (needLayer) {\n      css += \"}\";\n    }\n    if (obj.media) {\n      css += \"}\";\n    }\n    if (obj.supports) {\n      css += \"}\";\n    }\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = styleElement.childNodes;\n    if (childNodes[index]) {\n      styleElement.removeChild(childNodes[index]);\n    }\n    if (childNodes.length) {\n      styleElement.insertBefore(cssNode, childNodes[index]);\n    } else {\n      styleElement.appendChild(cssNode);\n    }\n  }\n}\nvar singletonData = {\n  singleton: null,\n  singletonCounter: 0\n};\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") return {\n    update: function update() {},\n    remove: function remove() {}\n  };\n\n  // eslint-disable-next-line no-undef,no-use-before-define\n  var styleIndex = singletonData.singletonCounter++;\n  var styleElement =\n  // eslint-disable-next-line no-undef,no-use-before-define\n  singletonData.singleton || (\n  // eslint-disable-next-line no-undef,no-use-before-define\n  singletonData.singleton = options.insertStyleElement(options));\n  return {\n    update: function update(obj) {\n      apply(styleElement, styleIndex, false, obj);\n    },\n    remove: function remove(obj) {\n      apply(styleElement, styleIndex, true, obj);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://snake_game/./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js?");

/***/ }),

/***/ "./script.ts":
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./styles.css\");\n/* harmony import */ var snake_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! snake_game */ \"../pkg/snake_game.js\");\n\n\n(0,snake_game__WEBPACK_IMPORTED_MODULE_1__[\"default\"])().then(function (wasmObj) {\n    var canvas = document.getElementById(\"snake-game-canvas\");\n    var gameControlBtn = document.getElementById(\"game-control-btn\");\n    var gameStatusContainer = document.getElementById(\"game-status\");\n    var gamePointsContainer = document.getElementById(\"game-points\");\n    var gameStepsContainer = document.getElementById(\"snake-steps\");\n    var gameBonusesContainer = document.getElementById(\"extra-bonuses\");\n    var ctx = canvas.getContext(\"2d\");\n    var CELL_SIZE = 100; // px\n    var MAP_SIZE = 8;\n    var snakeSpawnIdx = Date.now() % (MAP_SIZE * MAP_SIZE);\n    var SPEED = 1500; // ms\n    var map = snake_game__WEBPACK_IMPORTED_MODULE_1__.WorldMap[\"new\"](MAP_SIZE, snakeSpawnIdx);\n    var lineLength = MAP_SIZE * CELL_SIZE;\n    canvas.height = lineLength;\n    canvas.width = lineLength;\n    document.addEventListener(\"keyup\", function (e) {\n        var gameStatus = map.game_status();\n        if (gameStatus === undefined) {\n            map.start_game();\n            start();\n            gameControlBtn.textContent = \"Reload\";\n        }\n        switch (e.code) {\n            case \"KeyW\":\n            case \"ArrowUp\":\n                map.change_snake_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Up);\n                break;\n            case \"KeyS\":\n            case \"ArrowDown\":\n                map.change_snake_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Down);\n                break;\n            case \"KeyA\":\n            case \"ArrowLeft\":\n                map.change_snake_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Left);\n                break;\n            case \"KeyD\":\n            case \"ArrowRight\":\n                map.change_snake_direction(snake_game__WEBPACK_IMPORTED_MODULE_1__.Direction.Right);\n                break;\n            default:\n                break;\n        }\n    });\n    gameControlBtn.addEventListener(\"click\", function () {\n        var gameStatus = map.game_status();\n        gameControlBtn.textContent = \"Reload\";\n        if (gameStatus === undefined) {\n            map.start_game();\n            start();\n        }\n        else {\n            location.reload();\n        }\n    });\n    function drawMap() {\n        ctx.beginPath();\n        // drow columns\n        for (var x = 0; x < MAP_SIZE + 1; x++) {\n            var line = CELL_SIZE * x;\n            ctx.moveTo(line, 0);\n            ctx.lineTo(line, lineLength);\n        }\n        // drow rows\n        for (var y = 0; y < MAP_SIZE + 1; y++) {\n            var line = CELL_SIZE * y;\n            ctx.moveTo(0, line);\n            ctx.lineTo(lineLength, line);\n        }\n        ctx.stroke();\n    }\n    function drawSnake() {\n        var snakeBodyColors = [\n            { color: \"lightgreen\", xFactor: 0.75, yFactor: 0.7, radius: 0.09 },\n            { color: \"pink\", xFactor: 0.25, yFactor: 0.33, radius: 0.1 },\n            { color: \"yellow\", xFactor: 0.5, yFactor: 0.5, radius: 0.04 },\n            { color: \"lightblue\", xFactor: 0.71, yFactor: 0.4, radius: 0.13 },\n            { color: \"gray\", xFactor: 0.33, yFactor: 0.7, radius: 0.09 }\n        ];\n        var snakeCellPointer = map.snake_cells();\n        var snakeLength = map.snake_length();\n        var snakeCells = new Uint32Array(wasmObj.memory.buffer, snakeCellPointer, // offset\n        snakeLength // length\n        );\n        snakeCells\n            .slice() // copy array\n            .reverse() // mutate array in memory\n            .forEach(function (cell, i) {\n            ctx.beginPath();\n            var xCoord = (cell % MAP_SIZE) * CELL_SIZE;\n            var yCoord = Math.floor(cell / MAP_SIZE) * CELL_SIZE;\n            ctx.fillStyle = i === snakeLength - 1 ? \"#7878db\" : map.game_status() == snake_game__WEBPACK_IMPORTED_MODULE_1__.GameStatus.Lost ? \"black\" : \"#9100db\";\n            ctx.fillRect(xCoord, yCoord, CELL_SIZE, CELL_SIZE); // will draw starting from (x,y) coord\n            ctx.stroke();\n            ctx.beginPath();\n            // Draw circles on top of rectangles\n            snakeBodyColors.forEach(function (el) {\n                ctx.fillStyle = el.color;\n                ctx.beginPath();\n                ctx.arc(xCoord + CELL_SIZE * el.xFactor, yCoord + CELL_SIZE * el.yFactor, CELL_SIZE * el.radius, 0, 2 * Math.PI);\n                ctx.fill();\n            });\n        });\n    }\n    function drawReward() {\n        var rewardIdx = map.reward_cell_idx();\n        var col = rewardIdx % MAP_SIZE;\n        var row = Math.floor(rewardIdx / MAP_SIZE);\n        var text = map.get_reward_points().toString() + \"p\";\n        var bonusP = map.comming_bonus_by_steps();\n        var text2 = bonusP ? \"+\" + bonusP.toString() + \"p\" : \"\";\n        ctx.beginPath();\n        ctx.fillStyle = map.get_reward_color() || \"#FFEAAE\";\n        ctx.arc(col * CELL_SIZE + .5 * CELL_SIZE, row * CELL_SIZE + .5 * CELL_SIZE, CELL_SIZE / 2, 0, 2 * Math.PI);\n        ctx.fill();\n        ctx.fillStyle = \"white\";\n        ctx.font = \"15px Arial\";\n        ctx.fillText(text, col * CELL_SIZE + CELL_SIZE * 0.35, row * CELL_SIZE + CELL_SIZE * 0.50);\n        ctx.fillText(text2, col * CELL_SIZE + CELL_SIZE * 0.25, row * CELL_SIZE + CELL_SIZE * 0.65);\n    }\n    function drawGameStatus() {\n        gameStatusContainer.textContent = map.game_status_text();\n        gamePointsContainer.textContent = map.points().toString();\n        gameStepsContainer.textContent = \"Points reduce after (\".concat(map.get_steps(), \") steps.\");\n        gameBonusesContainer.textContent = map.bonus_stat().toString();\n    }\n    function paint() {\n        drawMap();\n        drawSnake();\n        drawReward();\n        drawGameStatus();\n    }\n    function defineFPS() {\n        var snakeLength = map.snake_length();\n        switch (true) {\n            case snakeLength <= 6:\n                return 3;\n            case snakeLength > 6 && snakeLength <= 9:\n                return 4;\n            case snakeLength > 9 && snakeLength <= 12:\n                return 5;\n            case snakeLength > 12 && snakeLength <= 15:\n                return 6;\n            case snakeLength > 15 && snakeLength <= 18:\n                return 7;\n            case snakeLength > 18 && snakeLength <= 25:\n                return 8;\n            case snakeLength > 25 && snakeLength <= 30:\n                return 9;\n            case snakeLength > 30 && snakeLength <= 35:\n                return 10;\n            case snakeLength > 35 && snakeLength <= 40:\n                return 11;\n            default:\n                return 5;\n        }\n    }\n    function start() {\n        var fps = defineFPS();\n        setTimeout(function () {\n            ctx.clearRect(0, 0, canvas.width, canvas.height); // cleaning canvas\n            map.update();\n            paint();\n            if (map.game_status() !== snake_game__WEBPACK_IMPORTED_MODULE_1__.GameStatus.Played)\n                return;\n            requestAnimationFrame(start);\n        }, SPEED / fps);\n    }\n    paint();\n});\n// HEX to Decimal converter\n// https://www.rapidtables.com/convert/number/hex-to-decimal.html\n// webassembly sandbox\n// https://webassembly.github.io/wabt/demo/wat2wasm/\n// binary instructions definition\n// https://webassembly.github.io/spec/core/binary/instructions.html\n\n\n//# sourceURL=webpack://snake_game/./script.ts?");

/***/ }),

/***/ "../pkg/snake_game.js":
/*!****************************!*\
  !*** ../pkg/snake_game.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Direction\": () => (/* binding */ Direction),\n/* harmony export */   \"GameStatus\": () => (/* binding */ GameStatus),\n/* harmony export */   \"RewardCell\": () => (/* binding */ RewardCell),\n/* harmony export */   \"RewardType\": () => (/* binding */ RewardType),\n/* harmony export */   \"WorldMap\": () => (/* binding */ WorldMap),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"initSync\": () => (/* binding */ initSync)\n/* harmony export */ });\n/* harmony import */ var _snippets_snake_game_027f5cd2d64d2885_front_utils_rnd_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snippets/snake_game-027f5cd2d64d2885/front/utils/rnd.js */ \"../pkg/snippets/snake_game-027f5cd2d64d2885/front/utils/rnd.js\");\n\n\nlet wasm;\n\nconst cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachedUint8Memory0 = null;\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nlet cachedInt32Memory0 = null;\n\nfunction getInt32Memory0() {\n    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {\n        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);\n    }\n    return cachedInt32Memory0;\n}\n/**\n*/\nconst Direction = Object.freeze({ Up:0,\"0\":\"Up\",Right:1,\"1\":\"Right\",Down:2,\"2\":\"Down\",Left:3,\"3\":\"Left\", });\n/**\n*/\nconst GameStatus = Object.freeze({ Won:0,\"0\":\"Won\",Lost:1,\"1\":\"Lost\",Played:2,\"2\":\"Played\", });\n/**\n*/\nconst RewardType = Object.freeze({ Yellow:0,\"0\":\"Yellow\",Red:1,\"1\":\"Red\",Blue:2,\"2\":\"Blue\",Black:3,\"3\":\"Black\", });\n/**\n*/\nclass RewardCell {\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_rewardcell_free(ptr);\n    }\n}\n/**\n*/\nclass WorldMap {\n\n    static __wrap(ptr) {\n        const obj = Object.create(WorldMap.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_worldmap_free(ptr);\n    }\n    /**\n    * @param {number} size\n    * @param {number} snake_idx\n    * @returns {WorldMap}\n    */\n    static new(size, snake_idx) {\n        const ret = wasm.worldmap_new(size, snake_idx);\n        return WorldMap.__wrap(ret);\n    }\n    /**\n    * @returns {number}\n    */\n    points() {\n        const ret = wasm.worldmap_points(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    bonus_stat() {\n        const ret = wasm.worldmap_bonus_stat(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    comming_bonus_by_steps() {\n        const ret = wasm.worldmap_comming_bonus_by_steps(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {string}\n    */\n    get_reward_color() {\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            wasm.worldmap_get_reward_color(retptr, this.ptr);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            return getStringFromWasm0(r0, r1);\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n            wasm.__wbindgen_free(r0, r1);\n        }\n    }\n    /**\n    * @returns {number}\n    */\n    get_reward_points() {\n        const ret = wasm.worldmap_get_reward_points(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    */\n    add_points() {\n        wasm.worldmap_add_points(this.ptr);\n    }\n    /**\n    */\n    start_game() {\n        wasm.worldmap_start_game(this.ptr);\n    }\n    /**\n    * @returns {number | undefined}\n    */\n    game_status() {\n        const ret = wasm.worldmap_game_status(this.ptr);\n        return ret === 3 ? undefined : ret;\n    }\n    /**\n    * @returns {string}\n    */\n    game_status_text() {\n        try {\n            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);\n            wasm.worldmap_game_status_text(retptr, this.ptr);\n            var r0 = getInt32Memory0()[retptr / 4 + 0];\n            var r1 = getInt32Memory0()[retptr / 4 + 1];\n            return getStringFromWasm0(r0, r1);\n        } finally {\n            wasm.__wbindgen_add_to_stack_pointer(16);\n            wasm.__wbindgen_free(r0, r1);\n        }\n    }\n    /**\n    * @returns {number}\n    */\n    reward_cell_idx() {\n        const ret = wasm.worldmap_reward_cell_idx(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    size() {\n        const ret = wasm.worldmap_size(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    get_2d_size() {\n        const ret = wasm.worldmap_get_2d_size(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @param {number} new_size\n    */\n    set_size(new_size) {\n        wasm.worldmap_set_size(this.ptr, new_size);\n    }\n    /**\n    * @returns {number}\n    */\n    snake_head_index() {\n        const ret = wasm.worldmap_snake_head_index(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @returns {number}\n    */\n    get_steps() {\n        const ret = wasm.worldmap_get_steps(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    * @param {number} direction\n    */\n    change_snake_direction(direction) {\n        wasm.worldmap_change_snake_direction(this.ptr, direction);\n    }\n    /**\n    * @returns {number}\n    */\n    snake_cells() {\n        const ret = wasm.worldmap_snake_cells(this.ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    snake_length() {\n        const ret = wasm.worldmap_snake_length(this.ptr);\n        return ret >>> 0;\n    }\n    /**\n    */\n    update() {\n        wasm.worldmap_update(this.ptr);\n    }\n}\n\nasync function load(module, imports) {\n    if (typeof Response === 'function' && module instanceof Response) {\n        if (typeof WebAssembly.instantiateStreaming === 'function') {\n            try {\n                return await WebAssembly.instantiateStreaming(module, imports);\n\n            } catch (e) {\n                if (module.headers.get('Content-Type') != 'application/wasm') {\n                    console.warn(\"`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n\", e);\n\n                } else {\n                    throw e;\n                }\n            }\n        }\n\n        const bytes = await module.arrayBuffer();\n        return await WebAssembly.instantiate(bytes, imports);\n\n    } else {\n        const instance = await WebAssembly.instantiate(module, imports);\n\n        if (instance instanceof WebAssembly.Instance) {\n            return { instance, module };\n\n        } else {\n            return instance;\n        }\n    }\n}\n\nfunction getImports() {\n    const imports = {};\n    imports.wbg = {};\n    imports.wbg.__wbg_rnd_39d30fd1bca76314 = function(arg0) {\n        const ret = (0,_snippets_snake_game_027f5cd2d64d2885_front_utils_rnd_js__WEBPACK_IMPORTED_MODULE_0__.rnd)(arg0 >>> 0);\n        return ret;\n    };\n    imports.wbg.__wbindgen_throw = function(arg0, arg1) {\n        throw new Error(getStringFromWasm0(arg0, arg1));\n    };\n\n    return imports;\n}\n\nfunction initMemory(imports, maybe_memory) {\n\n}\n\nfunction finalizeInit(instance, module) {\n    wasm = instance.exports;\n    init.__wbindgen_wasm_module = module;\n    cachedInt32Memory0 = null;\n    cachedUint8Memory0 = null;\n\n\n    return wasm;\n}\n\nfunction initSync(module) {\n    const imports = getImports();\n\n    initMemory(imports);\n\n    if (!(module instanceof WebAssembly.Module)) {\n        module = new WebAssembly.Module(module);\n    }\n\n    const instance = new WebAssembly.Instance(module, imports);\n\n    return finalizeInit(instance, module);\n}\n\nasync function init(input) {\n    if (typeof input === 'undefined') {\n        input = new URL(/* asset import */ __webpack_require__(/*! snake_game_bg.wasm */ \"../pkg/snake_game_bg.wasm\"), __webpack_require__.b);\n    }\n    const imports = getImports();\n\n    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {\n        input = fetch(input);\n    }\n\n    initMemory(imports);\n\n    const { instance, module } = await load(await input, imports);\n\n    return finalizeInit(instance, module);\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);\n\n\n//# sourceURL=webpack://snake_game/../pkg/snake_game.js?");

/***/ }),

/***/ "../pkg/snippets/snake_game-027f5cd2d64d2885/front/utils/rnd.js":
/*!**********************************************************************!*\
  !*** ../pkg/snippets/snake_game-027f5cd2d64d2885/front/utils/rnd.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"now\": () => (/* binding */ now),\n/* harmony export */   \"rnd\": () => (/* binding */ rnd)\n/* harmony export */ });\nconst now = Date.now; // for webassembly \nfunction rnd(max) {\n\treturn Math.floor(Math.random() * max);\n}\n\n//# sourceURL=webpack://snake_game/../pkg/snippets/snake_game-027f5cd2d64d2885/front/utils/rnd.js?");

/***/ }),

/***/ "../pkg/snake_game_bg.wasm":
/*!*********************************!*\
  !*** ../pkg/snake_game_bg.wasm ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"e9fd5ab7de70d081d590.wasm\";\n\n//# sourceURL=webpack://snake_game/../pkg/snake_game_bg.wasm?");

/***/ })

}]);