(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * built in 2016-8-8:11 version 2.111 by 司徒正美
 * 修正 ms-click 在 ms-if 下失效的问题 #1652
 * 修正 limitBy BUG
 * 修正 节点对齐算法 BUG
 * 优化 mediatorFactory
 * 修正 data-for-rendered BUG
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["avalon"] = factory();
	else
		root["avalon"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var avalon = __webpack_require__(1) //这个版本兼容IE6

	__webpack_require__(8)
	__webpack_require__(14)
	__webpack_require__(19)
	__webpack_require__(35)
	__webpack_require__(66)
	avalon.onComponentDispose = __webpack_require__(74)
	__webpack_require__(76)

	module.exports = avalon




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	__webpack_require__(2)
	var avalon = __webpack_require__(3)
	var browser = __webpack_require__(4)

	avalon.shadowCopy(avalon, browser)

	__webpack_require__(5)
	__webpack_require__(6)
	__webpack_require__(7)

	module.exports = avalon

/***/ },
/* 2 */
/***/ function(module, exports) {

	
	/**
	 * 此模块不依赖任何模块,用于修复语言的底层缺陷
	 */

	var ohasOwn = Object.prototype.hasOwnProperty

	if (!'司徒正美'.trim) {
	    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	    String.prototype.trim = function () {
	        return this.replace(rtrim, '')
	    }
	}
	var hasDontEnumBug = !({
	    'toString': null
	}).propertyIsEnumerable('toString'),
	        hasProtoEnumBug = (function () {
	        }).propertyIsEnumerable('prototype'),
	        dontEnums = [
	            'toString',
	            'toLocaleString',
	            'valueOf',
	            'hasOwnProperty',
	            'isPrototypeOf',
	            'propertyIsEnumerable',
	            'constructor'
	        ],
	        dontEnumsLength = dontEnums.length;
	if (!Object.keys) {
	    Object.keys = function (object) { //ecma262v5 15.2.3.14
	        var theKeys = []
	        var skipProto = hasProtoEnumBug && typeof object === 'function'
	        if (typeof object === 'string' || (object && object.callee)) {
	            for (var i = 0; i < object.length; ++i) {
	                theKeys.push(String(i))
	            }
	        } else {
	            for (var name in object) {
	                if (!(skipProto && name === 'prototype') &&
	                        ohasOwn.call(object, name)) {
	                    theKeys.push(String(name))
	                }
	            }
	        }

	        if (hasDontEnumBug) {
	            var ctor = object.constructor,
	                    skipConstructor = ctor && ctor.prototype === object
	            for (var j = 0; j < dontEnumsLength; j++) {
	                var dontEnum = dontEnums[j]
	                if (!(skipConstructor && dontEnum === 'constructor') && ohasOwn.call(object, dontEnum)) {
	                    theKeys.push(dontEnum)
	                }
	            }
	        }
	        return theKeys
	    }
	}
	if (!Array.isArray) {
	    Array.isArray = function (a) {
	        return Object.prototype.toString.call(a) === '[object Array]'
	    }
	}

	if (!Array.isArray.bind) {
	    Function.prototype.bind = function (scope) {
	        if (arguments.length < 2 && scope === void 0)
	            return this
	        var fn = this,
	                argv = arguments
	        return function () {
	            var args = [],
	                    i
	            for (i = 1; i < argv.length; i++)
	                args.push(argv[i])
	            for (i = 0; i < arguments.length; i++)
	                args.push(arguments[i])
	            return fn.apply(scope, args)
	        }
	    }
	}
	//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
	/**
	* Shim for "fixing" IE's lack of support (IE < 9) for applying slice
	* on host objects like NamedNodeMap, NodeList, and HTMLCollection
	* (technically, since host objects have been implementation-dependent,
	* at least before ES6, IE hasn't needed to work this way).
	* Also works on strings, fixes IE < 9 to allow an explicit undefined
	* for the 2nd argument (as in Firefox), and prevents errors when
	* called on other DOM objects.
	*/

	var _slice = Array.prototype.slice
	try {
	    // Can't be used with DOM elements in IE < 9
	    _slice.call(document.documentElement)
	} catch (e) { // Fails in IE < 9
	    // This will work for genuine arrays, array-like objects,
	    // NamedNodeMap (attributes, entities, notations),
	    // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
	    // and will not fail on other DOM objects (as do DOM elements in IE < 9)
	    Array.prototype.slice = function (begin, end) {
	        // IE < 9 gets unhappy with an undefined end argument
	        end = (typeof end !== 'undefined') ? end : this.length

	        // For native Array objects, we use the native slice function
	        if (Array.isArray(this) ) {
	            return _slice.call(this, begin, end)
	        }

	        // For array like object we handle it ourselves.
	        var i, cloned = [],
	                size, len = this.length

	        // Handle negative value for "begin"
	        var start = begin || 0
	        start = (start >= 0) ? start : len + start

	        // Handle negative value for "end"
	        var upTo = (end) ? end : len
	        if (end < 0) {
	            upTo = len + end
	        }

	        // Actual expected size of the slice
	        size = upTo - start

	        if (size > 0) {
	            cloned = new Array(size)
	            if (this.charAt) {
	                for (i = 0; i < size; i++) {
	                    cloned[i] = this.charAt(start + i)
	                }
	            } else {
	                for (i = 0; i < size; i++) {
	                    cloned[i] = this[start + i]
	                }
	            }
	        }

	        return cloned
	    }
	}

	function iterator(vars, body, ret) {
	    var fun = 'for(var ' + vars + 'i=0,n = this.length; i < n; i++){' +
	            body.replace('_', '((i in this) && fn.call(scope,this[i],i,this))') +
	            '}' + ret
	    /* jshint ignore:start */
	    return Function('fn,scope', fun)
	    /* jshint ignore:end */
	}

	var ap = Array.prototype
	if (!/\[native code\]/.test(ap.map)) {
	    var shim = {
	        //定位操作，返回数组中第一个等于给定参数的元素的索引值。
	        indexOf: function (item, index) {
	            var n = this.length,
	                    i = ~~index
	            if (i < 0)
	                i += n
	            for (; i < n; i++)
	                if (this[i] === item)
	                    return i
	            return -1
	        },
	        //定位操作，同上，不过是从后遍历。
	        lastIndexOf: function (item, index) {
	            var n = this.length,
	                    i = index == null ? n - 1 : index
	            if (i < 0)
	                i = Math.max(0, n + i)
	            for (; i >= 0; i--)
	                if (this[i] === item)
	                    return i
	            return -1
	        },
	        //迭代操作，将数组的元素挨个儿传入一个函数中执行。Prototype.js的对应名字为each。
	        forEach: iterator('', '_', ''),
	        //迭代类 在数组中的每个项上运行一个函数，如果此函数的值为真，则此元素作为新数组的元素收集起来，并返回新数组
	        filter: iterator('r=[],j=0,', 'if(_)r[j++]=this[i]', 'return r'),
	        //收集操作，将数组的元素挨个儿传入一个函数中执行，然后把它们的返回值组成一个新数组返回。Prototype.js的对应名字为collect。
	        map: iterator('r=[],', 'r[i]=_', 'return r'),
	        //只要数组中有一个元素满足条件（放进给定函数返回true），那么它就返回true。Prototype.js的对应名字为any。
	        some: iterator('', 'if(_)return true', 'return false'),
	        //只有数组中的元素都满足条件（放进给定函数返回true），它才返回true。Prototype.js的对应名字为all。
	        every: iterator('', 'if(!_)return false', 'return true')
	    }

	    for (var i in shim) {
	        ap[i] = shim[i]
	    }
	}
	module.exports = {}

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {//avalon的核心,这里都是一些不存在异议的*核心*方法与属性
	function avalon(el) {
	    return new avalon.init(el)
	}

	global.avalon = avalon
	if(typeof window !== 'undefined'){
	    window.avalon = avalon
	}

	avalon.init = function (el) {
	    this[0] = this.element = el
	}

	avalon.fn = avalon.prototype = avalon.init.prototype


	avalon.shadowCopy = function (destination, source) {
	    for (var property in source) {
	        destination[property] = source[property]
	    }
	    return destination
	}

	var rword = /[^, ]+/g

	var hasConsole = global.console

	avalon.shadowCopy(avalon, {
	    noop: function () {
	    },
	    //切割字符串为一个个小块，以空格或逗号分开它们，结合replace实现字符串的forEach
	    rword: rword,
	    inspect: ({}).toString,
	    ohasOwn: ({}).hasOwnProperty,
	    log: function () {
	        if (hasConsole && avalon.config.debug) {
	            // http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
	            Function.apply.call(console.log, console, arguments)
	        }
	    },
	    warn: function () {
	        if (hasConsole && avalon.config.debug) {
	            var method = console.warn || console.log
	            // http://qiang106.iteye.com/blog/1721425
	            Function.apply.call(method, console, arguments)
	        }
	    },
	    error: function (str, e) {
	        throw (e || Error)(str)
	    },
	    //将一个以空格或逗号隔开的字符串或数组,转换成一个键值都为1的对象
	    oneObject: function (array, val) {
	        if (typeof array === 'string') {
	            array = array.match(rword) || []
	        }
	        var result = {},
	                value = val !== void 0 ? val : 1
	        for (var i = 0, n = array.length; i < n; i++) {
	            result[array[i]] = value
	        }
	        return result
	    }

	})

	module.exports = avalon
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var window = global
	var browser = {
	    window: window,
	    document: {//方便在nodejs环境不会报错
	        createElement: function () {
	            return {}
	        },
	        createElementNS: function(){
	            return {}
	        },
	        contains: Boolean
	    },
	    root: {
	        outerHTML: 'x'
	    },
	    msie: NaN,
	    modern: true,
	    avalonDiv: {},
	    avalonFragment: null
	}

	if(window.location && window.navigator && window.window){
	    var document = window.document
	    browser.document = document
	    browser.modern = window.dispatchEvent
	    browser.root = document.documentElement
	    browser.avalonDiv = document.createElement('div')
	    browser.avalonFragment = document.createDocumentFragment()
	    if (window.VBArray) {
	        browser.msie = document.documentMode || (window.XMLHttpRequest ? 7 : 6)
	    }
	}


	module.exports = browser
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	//这里放置存在异议的方法

	var serialize = avalon.inspect
	var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
	var rnative = /\[native code\]/ //判定是否原生函数
	var rarraylike = /(Array|List|Collection|Map|Arguments)\]$/
	var ohasOwn = avalon.ohasOwn
	// avalon.quote
	//https://github.com/bestiejs/json3/blob/master/lib/json3.js
	var Escapes = {
	    92: "\\\\",
	    34: '\\"',
	    8: "\\b",
	    12: "\\f",
	    10: "\\n",
	    13: "\\r",
	    9: "\\t"
	}

	// Internal: Converts `value` into a zero-padded string such that its
	// length is at least equal to `width`. The `width` must be <= 6.
	var leadingZeroes = "000000"
	var toPaddedString = function (width, value) {
	    // The `|| 0` expression is necessary to work around a bug in
	    // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	    return (leadingZeroes + (value || 0)).slice(-width)
	};
	var unicodePrefix = "\\u00"
	var escapeChar = function (character) {
	    var charCode = character.charCodeAt(0), escaped = Escapes[charCode]
	    if (escaped) {
	        return escaped
	    }
	    return unicodePrefix + toPaddedString(2, charCode.toString(16))
	};
	var reEscape = /[\x00-\x1f\x22\x5c]/g
	function quote(value) {
	    reEscape.lastIndex = 0
	    return '"' + ( reEscape.test(value)? String(value).replace(reEscape, escapeChar) : value ) + '"'
	}

	avalon.quote = typeof JSON !== 'undefined' ? JSON.stringify : quote

	// avalon.type
	var class2type = {}
	'Boolean Number String Function Array Date RegExp Object Error'.replace(avalon.rword, function (name) {
	    class2type['[object ' + name + ']'] = name.toLowerCase()
	})

	avalon.type = function (obj) { //取得目标的类型
	    if (obj == null) {
	        return String(obj)
	    }
	    // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
	    return typeof obj === 'object' || typeof obj === 'function' ?
	            class2type[serialize.call(obj)] || 'object' :
	            typeof obj
	}

	var rfunction = /^\s*\bfunction\b/

	avalon.isFunction = typeof alert === 'object' ? function (fn) {
	    try {
	        return rfunction.test(fn + '')
	    } catch (e) {
	        return false
	    }
	} : function (fn) {
	    return serialize.call(fn) === '[object Function]'
	}

	avalon.isWindow = function (obj) {
	    if (!obj)
	        return false
	    // 利用IE678 window == document为true,document == window竟然为false的神奇特性
	    // 标准浏览器及IE9，IE10等使用 正则检测
	    return obj == obj.document && obj.document != obj //jshint ignore:line
	}


	function isWindow(obj) {
	    return rwindow.test(serialize.call(obj))
	}

	if (isWindow(avalon.window)) {
	    avalon.isWindow = isWindow
	}

	var enu, enumerateBUG
	for (enu in avalon({})) {
	    break
	}
	enumerateBUG = enu !== '0' //IE6下为true, 其他为false

	/*判定是否是一个朴素的javascript对象（Object），不是DOM对象，不是BOM对象，不是自定义类的实例*/
	avalon.isPlainObject = function (obj, key) {
	    if (!obj || avalon.type(obj) !== 'object' || obj.nodeType || avalon.isWindow(obj)) {
	        return false
	    }
	    try { //IE内置对象没有constructor
	        if (obj.constructor &&
	                !ohasOwn.call(obj, 'constructor') &&
	                !ohasOwn.call(obj.constructor.prototype || {}, 'isPrototypeOf')) {
	            return false
	        }
	    } catch (e) { //IE8 9会在这里抛错
	        return false
	    }
	    if (enumerateBUG) {
	        for (key in obj) {
	            return ohasOwn.call(obj, key)
	        }
	    }
	    for (key in obj) {
	    }
	    return key === void 0 || ohasOwn.call(obj, key)
	}


	if (rnative.test(Object.getPrototypeOf)) {
	    avalon.isPlainObject = function (obj) {
	        // 简单的 typeof obj === 'object'检测，会致使用isPlainObject(window)在opera下通不过
	        return serialize.call(obj) === '[object Object]' &&
	                Object.getPrototypeOf(obj) === Object.prototype
	    }
	}

	//与jQuery.extend方法，可用于浅拷贝，深拷贝
	avalon.mix = avalon.fn.mix = function () {
	    var options, name, src, copy, copyIsArray, clone,
	            target = arguments[0] || {},
	            i = 1,
	            length = arguments.length,
	            deep = false

	    // 如果第一个参数为布尔,判定是否深拷贝
	    if (typeof target === 'boolean') {
	        deep = target
	        target = arguments[1] || {}
	        i++
	    }

	    //确保接受方为一个复杂的数据类型
	    if (typeof target !== 'object' && !avalon.isFunction(target)) {
	        target = {}
	    }

	    //如果只有一个参数，那么新成员添加于mix所在的对象上
	    if (i === length) {
	        target = this
	        i--
	    }

	    for (; i < length; i++) {
	        //只处理非空参数
	        if ((options = arguments[i]) != null) {
	            for (name in options) {
	                try {
	                    src = target[name]
	                    copy = options[name] //当options为VBS对象时报错
	                } catch (e) {
	                    continue
	                }

	                // 防止环引用
	                if (target === copy) {
	                    continue
	                }
	                if (deep && copy && (avalon.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

	                    if (copyIsArray) {
	                        copyIsArray = false
	                        clone = src && Array.isArray(src) ? src : []

	                    } else {
	                        clone = src && avalon.isPlainObject(src) ? src : {}
	                    }

	                    target[name] = avalon.mix(deep, clone, copy)
	                } else if (copy !== void 0) {
	                    target[name] = copy
	                }
	            }
	        }
	    }
	    return target
	}

	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	function isArrayLike(obj) {
	    if (!obj)
	        return false
	    var n = obj.length
	    if (n === (n >>> 0)) { //检测length属性是否为非负整数
	        var type = serialize.call(obj).slice(8, -1)
	        if (rarraylike.test(type))
	            return false
	        if (type === 'Array')
	            return true
	        try {
	            if ({}.propertyIsEnumerable.call(obj, 'length') === false) { //如果是原生对象
	                return rfunction.test(obj.item || obj.callee)
	            }
	            return true
	        } catch (e) { //IE的NodeList直接抛错
	            return !obj.window //IE6-8 window
	        }
	    }
	    return false
	}


	avalon.each = function (obj, fn) {
	    if (obj) { //排除null, undefined
	        var i = 0
	        if (isArrayLike(obj)) {
	            for (var n = obj.length; i < n; i++) {
	                if (fn(i, obj[i]) === false)
	                    break
	            }
	        } else {
	            for (i in obj) {
	                if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
	                    break
	                }
	            }
	        }
	    }
	}

	module.exports = {
	    avalon: avalon,
	    isArrayLike: isArrayLike
	}



/***/ },
/* 6 */
/***/ function(module, exports) {

	var cssHooks = {}
	var rhyphen = /([a-z\d])([A-Z]+)/g
	var rcamelize = /[-_][^-_]/g
	var rhashcode = /\d\.\d{4}/
	var rescape = /[-.*+?^${}()|[\]\/\\]/g

	var _slice = [].slice
	function defaultParse(cur, pre, binding) {
	       cur[binding.name] = avalon.parseExpr(binding)
	}
	avalon.shadowCopy(avalon, {
	    caches: {}, //avalon2.0 新增
	    vmodels: {},
	    filters: {},
	    components: {},//放置组件的类
	    directives: {},
	    eventHooks: {},
	    eventListeners: {},
	    validators: {},
	    scopes: {},
	    cssHooks: cssHooks,
	    parsers: {
	        number: function (a) {
	            return a === '' ? '' : /\d\.$/.test(a) ? a : parseFloat(a) || 0
	        },
	        string: function (a) {
	            return a === null || a === void 0 ? '' : a + ''
	        },
	        boolean: function (a) {
	            if(a === '')
	                return a
	            return a === 'true'|| a == '1'
	        }
	    },
	    version: "2.111",
	    slice: function (nodes, start, end) {
	        return _slice.call(nodes, start, end)
	    },
	    css: function (node, name, value, fn) {
	        //读写删除元素节点的样式
	        if (node instanceof avalon) {
	            node = node[0]
	        }
	        if(node.nodeType !==1){
	            return
	        }
	        var prop = avalon.camelize(name)
	        name = avalon.cssName(prop) || prop
	        if (value === void 0 || typeof value === 'boolean') { //获取样式
	            fn = cssHooks[prop + ':get'] || cssHooks['@:get']
	            if (name === 'background') {
	                name = 'backgroundColor'
	            }
	            var val = fn(node, name)
	            return value === true ? parseFloat(val) || 0 : val
	        } else if (value === '') { //请除样式
	            node.style[name] = ''
	        } else { //设置样式
	            if (value == null || value !== value) {
	                return
	            }
	            if (isFinite(value) && !avalon.cssNumber[prop]) {
	                value += 'px'
	            }
	            fn = cssHooks[prop + ':set'] || cssHooks['@:set']
	            fn(node, name, value)
	        }
	    },
	    directive: function (name, definition) {
	        definition.parse = definition.parse || defaultParse
	        return this.directives[name] = definition
	    },
	    isObject: function (a) {//1.6新增
	        return a !== null && typeof a === 'object'
	    },
	    /* avalon.range(10)
	     => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	     avalon.range(1, 11)
	     => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	     avalon.range(0, 30, 5)
	     => [0, 5, 10, 15, 20, 25]
	     avalon.range(0, -10, -1)
	     => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
	     avalon.range(0)
	     => []*/
	    range: function (start, end, step) { // 用于生成整数数组
	        step || (step = 1)
	        if (end == null) {
	            end = start || 0
	            start = 0
	        }
	        var index = -1,
	                length = Math.max(0, Math.ceil((end - start) / step)),
	                result = new Array(length)
	        while (++index < length) {
	            result[index] = start
	            start += step
	        }
	        return result
	    },
	    hyphen: function (target) {
	        //转换为连字符线风格
	        return target.replace(rhyphen, '$1-$2').toLowerCase()
	    },
	    camelize: function (target) {
	        //提前判断，提高getStyle等的效率
	        if (!target || target.indexOf('-') < 0 && target.indexOf('_') < 0) {
	            return target
	        }
	        //转换为驼峰风格
	        return target.replace(rcamelize, function (match) {
	            return match.charAt(1).toUpperCase()
	        })
	    },
	    //生成UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	    makeHashCode: function (prefix) {
	        prefix = prefix || 'avalon'
	        return String(Math.random() + Math.random()).replace(rhashcode, prefix)
	    },
	    escapeRegExp: function (target) {
	        //http://stevenlevithan.com/regex/xregexp/
	        //将字符串安全格式化为正则表达式的源码
	        return (target + '').replace(rescape, '\\$&')
	    },
	    Array: {
	        merge: function (target, other) {
	            //合并两个数组 avalon2新增
	            target.push.apply(target, other)
	        },
	        ensure: function (target, item) {
	            //只有当前数组不存在此元素时只添加它
	            if (target.indexOf(item) === -1) {
	                return target.push(item)
	            }
	        },
	        removeAt: function (target, index) {
	            //移除数组中指定位置的元素，返回布尔表示成功与否
	            return !!target.splice(index, 1).length
	        },
	        remove: function (target, item) {
	            //移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否
	            var index = target.indexOf(item)
	            if (~index)
	                return avalon.Array.removeAt(target, index)
	            return false
	        }
	    }
	})

	if(typeof performance !== 'undefined' && performance.now){
	    avalon.makeHashCode = function (prefix) {
	        prefix = prefix || 'avalon'
	        return (prefix + performance.now()).replace('.', '')
	    }
	}

	var UUID = 1
	module.exports = {
	    //生成事件回调的UUID(用户通过ms-on指令)
	    avalon: avalon,
	    getLongID: function (fn) {
	        return fn.uuid || (fn.uuid = avalon.makeHashCode('e'))
	    },
	    //生成事件回调的UUID(用户通过avalon.bind)
	    getShortID: function (fn) {
	        return fn.uuid || (fn.uuid = '_' + (++UUID))
	    }
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	
	function kernel(settings) {
	    for (var p in settings) {
	        if (!avalon.ohasOwn.call(settings, p))
	            continue
	        var val = settings[p]
	        if (typeof kernel.plugins[p] === 'function') {
	            kernel.plugins[p](val)
	        } else if (typeof kernel[p] === 'object') {
	            avalon.shadowCopy(kernel[p], val)
	        } else {
	            kernel[p] = val
	        }
	    }
	    return this
	}

	avalon.config = kernel

	var plugins = {
	    interpolate: function (array) {
	        var openTag = array[0]
	        var closeTag = array[1]
	        /*eslint-disable */
	        if (openTag === closeTag) {
	            throw new SyntaxError('openTag!==closeTag')
	        }
	        var test = openTag + 'test' + closeTag
	        var div = avalon.avalonDiv
	        div.innerHTML = test
	        if (div.innerHTML !== test && div.innerHTML.indexOf('&lt;') > -1) {
	            throw new SyntaxError('此定界符不合法')
	        }
	        div.innerHTML = ''
	        /*eslint-enable */
	        kernel.openTag = openTag
	        kernel.closeTag = closeTag
	        var o = avalon.escapeRegExp(openTag)
	        var c = avalon.escapeRegExp(closeTag)
	        kernel.rexpr = new RegExp(o + '([\\s\\S]*)' + c)
	        kernel.rexprg = new RegExp(o + '([\\s\\S]*)' + c, 'g')
	        kernel.rbind = new RegExp(o + '[\\s\\S]*' + c + '|\\bms-|\\bslot\\b')
	    }
	}
	kernel.plugins = plugins
	avalon.config({
	    interpolate: ['{{', '}}'],
	    debug: true
	})


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	var number = __webpack_require__(9)
	var sanitize = __webpack_require__(10)
	var date = __webpack_require__(11)
	var arrayFilters = __webpack_require__(12)
	var eventFilters = __webpack_require__(13)
	var filters = avalon.filters

	function K(a) {
	    return a
	}

	avalon.__format__ = function (name) {
	    var fn = filters[name]
	    if (fn) {
	        return fn.get ? fn.get : fn
	    }
	    return K
	}


	avalon.mix(filters, {
	    uppercase: function (str) {
	        return String(str).toUpperCase()
	    },
	    lowercase: function (str) {
	        return String(str).toLowerCase()
	    },
	    truncate: function (str, length, truncation) {
	        //length，新字符串长度，truncation，新字符串的结尾的字段,返回新字符串
	        length = length || 30
	        truncation = typeof truncation === "string" ? truncation : "..."
	        return str.length > length ?
	                str.slice(0, length - truncation.length) + truncation :
	                String(str)
	    },
	    camelize: avalon.camelize,
	    date: date,
	    escape: avalon.escapeHtml,
	    sanitize: sanitize,
	    number: number,
	    currency: function (amount, symbol, fractionSize) {
	        return (symbol || "\uFFE5") +
	                number(amount,
	                        isFinite(fractionSize) ? fractionSize : 2)
	    }
	}, arrayFilters, eventFilters)


	module.exports = avalon

/***/ },
/* 9 */
/***/ function(module, exports) {

	function number(number, decimals, point, thousands) {
	    //form http://phpjs.org/functions/number_format/
	    //number 必需，要格式化的数字
	    //decimals 可选，规定多少个小数位。
	    //point 可选，规定用作小数点的字符串（默认为 . ）。
	    //thousands 可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
	    number = (number + '')
	            .replace(/[^0-9+\-Ee.]/g, '')
	    var n = !isFinite(+number) ? 0 : +number,
	            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
	            sep = thousands || ",",
	            dec = point || ".",
	            s = '',
	            toFixedFix = function (n, prec) {
	                var k = Math.pow(10, prec)
	                return '' + (Math.round(n * k) / k)
	                        .toFixed(prec)
	            }
	    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
	            .split('.')
	    if (s[0].length > 3) {
	        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
	    }
	    if ((s[1] || '')
	            .length < prec) {
	        s[1] = s[1] || ''
	        s[1] += new Array(prec - s[1].length + 1)
	                .join('0')
	    }
	    return s.join(dec)
	}

	module.exports = number

	//处理 货币 http://openexchangerates.github.io/accounting.js/

/***/ },
/* 10 */
/***/ function(module, exports) {

	var rscripts = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim
	var ron = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g
	var ropen = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig
	var rsanitize = {
	    a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
	    img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
	    form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
	}


	//https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	//    <a href="javasc&NewLine;ript&colon;alert('XSS')">chrome</a> 
	//    <a href="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg==">chrome</a>
	//    <a href="jav	ascript:alert('XSS');">IE67chrome</a>
	//    <a href="jav&#x09;ascript:alert('XSS');">IE67chrome</a>
	//    <a href="jav&#x0A;ascript:alert('XSS');">IE67chrome</a>
	module.exports = function sanitize(str) {
	    return str.replace(rscripts, "").replace(ropen, function (a, b) {
	        var match = a.toLowerCase().match(/<(\w+)\s/)
	        if (match) { //处理a标签的href属性，img标签的src属性，form标签的action属性
	            var reg = rsanitize[match[1]]
	            if (reg) {
	                a = a.replace(reg, function (s, name, value) {
	                    var quote = value.charAt(0)
	                    return name + "=" + quote + "javascript:void(0)" + quote// jshint ignore:line
	                })
	            }
	        }
	        return a.replace(ron, " ").replace(/\s+/g, " ") //移除onXXX事件
	    })
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
	 'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
	 'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
	 'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
	 'MMMM': Month in year (January-December)
	 'MMM': Month in year (Jan-Dec)
	 'MM': Month in year, padded (01-12)
	 'M': Month in year (1-12)
	 'dd': Day in month, padded (01-31)
	 'd': Day in month (1-31)
	 'EEEE': Day in Week,(Sunday-Saturday)
	 'EEE': Day in Week, (Sun-Sat)
	 'HH': Hour in day, padded (00-23)
	 'H': Hour in day (0-23)
	 'hh': Hour in am/pm, padded (01-12)
	 'h': Hour in am/pm, (1-12)
	 'mm': Minute in hour, padded (00-59)
	 'm': Minute in hour (0-59)
	 'ss': Second in minute, padded (00-59)
	 's': Second in minute (0-59)
	 'a': am/pm marker
	 'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)
	 format string can also be one of the following predefined localizable formats:
	 
	 'medium': equivalent to 'MMM d, y h:mm:ss a' for en_US locale (e.g. Sep 3, 2010 12:05:08 pm)
	 'short': equivalent to 'M/d/yy h:mm a' for en_US locale (e.g. 9/3/10 12:05 pm)
	 'fullDate': equivalent to 'EEEE, MMMM d,y' for en_US locale (e.g. Friday, September 3, 2010)
	 'longDate': equivalent to 'MMMM d, y' for en_US locale (e.g. September 3, 2010
	 'mediumDate': equivalent to 'MMM d, y' for en_US locale (e.g. Sep 3, 2010)
	 'shortDate': equivalent to 'M/d/yy' for en_US locale (e.g. 9/3/10)
	 'mediumTime': equivalent to 'h:mm:ss a' for en_US locale (e.g. 12:05:08 pm)
	 'shortTime': equivalent to 'h:mm a' for en_US locale (e.g. 12:05 pm)
	 */

	function toInt(str) {
	    return parseInt(str, 10) || 0
	}

	function padNumber(num, digits, trim) {
	    var neg = ''
	    if (num < 0) {
	        neg = '-'
	        num = -num
	    }
	    num = '' + num
	    while (num.length < digits)
	        num = '0' + num
	    if (trim)
	        num = num.substr(num.length - digits)
	    return neg + num
	}

	function dateGetter(name, size, offset, trim) {
	    return function (date) {
	        var value = date["get" + name]()
	        if (offset > 0 || value > -offset)
	            value += offset
	        if (value === 0 && offset === -12) {
	            value = 12
	        }
	        return padNumber(value, size, trim)
	    }
	}

	function dateStrGetter(name, shortForm) {
	    return function (date, formats) {
	        var value = date["get" + name]()
	        var get = (shortForm ? ("SHORT" + name) : name).toUpperCase()
	        return formats[get][value]
	    }
	}

	function timeZoneGetter(date) {
	    var zone = -1 * date.getTimezoneOffset()
	    var paddedZone = (zone >= 0) ? "+" : ""
	    paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
	    return paddedZone
	}
	//取得上午下午

	function ampmGetter(date, formats) {
	    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
	}
	var DATE_FORMATS = {
	    yyyy: dateGetter("FullYear", 4),
	    yy: dateGetter("FullYear", 2, 0, true),
	    y: dateGetter("FullYear", 1),
	    MMMM: dateStrGetter("Month"),
	    MMM: dateStrGetter("Month", true),
	    MM: dateGetter("Month", 2, 1),
	    M: dateGetter("Month", 1, 1),
	    dd: dateGetter("Date", 2),
	    d: dateGetter("Date", 1),
	    HH: dateGetter("Hours", 2),
	    H: dateGetter("Hours", 1),
	    hh: dateGetter("Hours", 2, -12),
	    h: dateGetter("Hours", 1, -12),
	    mm: dateGetter("Minutes", 2),
	    m: dateGetter("Minutes", 1),
	    ss: dateGetter("Seconds", 2),
	    s: dateGetter("Seconds", 1),
	    sss: dateGetter("Milliseconds", 3),
	    EEEE: dateStrGetter("Day"),
	    EEE: dateStrGetter("Day", true),
	    a: ampmGetter,
	    Z: timeZoneGetter
	}
	var rdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/
	var raspnetjson = /^\/Date\((\d+)\)\/$/
	function dateFilter(date, format) {
	    var locate = dateFilter.locate,
	            text = "",
	            parts = [],
	            fn, match
	    format = format || "mediumDate"
	    format = locate[format] || format
	    if (typeof date === "string") {
	        if (/^\d+$/.test(date)) {
	            date = toInt(date)
	        } else if (raspnetjson.test(date)) {
	            date = +RegExp.$1
	        } else {
	            var trimDate = date.trim()
	            var dateArray = [0, 0, 0, 0, 0, 0, 0]
	            var oDate = new Date(0)
	            //取得年月日
	            trimDate = trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/, function (_, a, b, c) {
	                var array = c.length === 4 ? [c, a, b] : [a, b, c]
	                dateArray[0] = toInt(array[0])     //年
	                dateArray[1] = toInt(array[1]) - 1 //月
	                dateArray[2] = toInt(array[2])     //日
	                return ""
	            })
	            var dateSetter = oDate.setFullYear
	            var timeSetter = oDate.setHours
	            trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (_, a, b, c, d) {
	                dateArray[3] = toInt(a) //小时
	                dateArray[4] = toInt(b) //分钟
	                dateArray[5] = toInt(c) //秒
	                if (d) {                //毫秒
	                    dateArray[6] = Math.round(parseFloat("0." + d) * 1000)
	                }
	                return ""
	            })
	            var tzHour = 0
	            var tzMin = 0
	            trimDate = trimDate.replace(/Z|([+-])(\d\d):?(\d\d)/, function (z, symbol, c, d) {
	                dateSetter = oDate.setUTCFullYear
	                timeSetter = oDate.setUTCHours
	                if (symbol) {
	                    tzHour = toInt(symbol + c)
	                    tzMin = toInt(symbol + d)
	                }
	                return ''
	            })

	            dateArray[3] -= tzHour
	            dateArray[4] -= tzMin
	            dateSetter.apply(oDate, dateArray.slice(0, 3))
	            timeSetter.apply(oDate, dateArray.slice(3))
	            date = oDate
	        }
	    }
	    if (typeof date === 'number') {
	        date = new Date(date)
	    }
	    if (avalon.type(date) !== 'date') {
	        return
	    }
	    while (format) {
	        match = rdateFormat.exec(format)
	        if (match) {
	            parts = parts.concat(match.slice(1))
	            format = parts.pop()
	        } else {
	            parts.push(format)
	            format = null
	        }
	    }
	    parts.forEach(function (value) {
	        fn = DATE_FORMATS[value]
	        text += fn ? fn(date, locate) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
	    })
	    return text
	}


	var locate = {
	    AMPMS: {
	        0: '上午',
	        1: '下午'
	    },
	    DAY: {
	        0: '星期日',
	        1: '星期一',
	        2: '星期二',
	        3: '星期三',
	        4: '星期四',
	        5: '星期五',
	        6: '星期六'
	    },
	    MONTH: {
	        0: '1月',
	        1: '2月',
	        2: '3月',
	        3: '4月',
	        4: '5月',
	        5: '6月',
	        6: '7月',
	        7: '8月',
	        8: '9月',
	        9: '10月',
	        10: '11月',
	        11: '12月'
	    },
	    SHORTDAY: {
	        '0': '周日',
	        '1': '周一',
	        '2': '周二',
	        '3': '周三',
	        '4': '周四',
	        '5': '周五',
	        '6': '周六'
	    },
	    fullDate: 'y年M月d日EEEE',
	    longDate: 'y年M月d日',
	    medium: 'yyyy-M-d H:mm:ss',
	    mediumDate: 'yyyy-M-d',
	    mediumTime: 'H:mm:ss',
	    'short': 'yy-M-d ah:mm',
	    shortDate: 'yy-M-d',
	    shortTime: 'ah:mm'
	}
	locate.SHORTMONTH = locate.MONTH
	dateFilter.locate = locate

	module.exports = dateFilter

/***/ },
/* 12 */
/***/ function(module, exports) {

	
	function orderBy(array, criteria, reverse) {
	    var type = avalon.type(array)
	    if (type !== 'array' && type !== 'object')
	        throw 'orderBy只能处理对象或数组'
	    var order = (reverse && reverse < 0) ? -1 : 1

	    if (typeof criteria === 'string') {
	        var key = criteria
	        criteria = function (a) {
	            return a && a[key]
	        }
	    }
	    array = convertArray(array)
	    array.forEach(function (el) {
	        el.order = criteria(el.value, el.key)
	    })
	    array.sort(function (left, right) {
	        var a = left.order
	        var b = right.order
	        if (Number.isNaN(a) && Number.isNaN(b)) {
	            return 0
	        }
	        return a === b ? 0 : a > b ? order : -order
	    })
	    var isArray = type === 'array'
	    var target = isArray ? [] : {}
	    return recovery(target, array, function (el) {
	        if (isArray) {
	            target.push(el.value)
	        } else {
	            target[el.key] = el.value
	        }
	    })
	}

	function filterBy(array, search) {
	    var type = avalon.type(array)
	    if (type !== 'array' && type !== 'object')
	        throw 'filterBy只能处理对象或数组'
	    var args = avalon.slice(arguments, 2)
	    var stype = avalon.type(search)
	    if (stype === 'function') {
	        var criteria = search
	    } else if (stype === 'string' || stype === 'number') {
	        if (search === '') {
	            return array
	        } else {
	            var reg = new RegExp(avalon.escapeRegExp(search), 'i')
	            criteria = function (el) {
	                return reg.test(el)
	            }
	        }
	    } else {
	        return array
	    }

	    array = convertArray(array).filter(function (el, i) {
	        return !!criteria.apply(el, [el.value, i].concat(args))
	    })
	    var isArray = type === 'array'
	    var target = isArray ? [] : {}
	    return recovery(target, array, function (el) {
	        if (isArray) {
	            target.push(el.value)
	        } else {
	            target[el.key] = el.value
	        }
	    })
	}

	function selectBy(data, array, defaults) {
	    if (avalon.isObject(data) && !Array.isArray(data)) {
	        var target = []
	        return recovery(target, array, function (name) {
	            target.push(data.hasOwnProperty(name) ? data[name] : defaults ? defaults[name] : '')
	        })
	    } else {
	        return data
	    }
	}

	Number.isNaN = Number.isNaN || function (a) {
	    return a !== a
	}

	function limitBy(input, limit, begin) {
	    var type = avalon.type(input)
	    if (type !== 'array' && type !== 'object')
	        throw 'limitBy只能处理对象或数组'
	    //必须是数值
	    if (typeof limit !== 'number') {
	        return input
	    }
	    //不能为NaN
	    if (Number.isNaN(limit)) {
	        return input
	    }
	    //将目标转换为数组
	    if (type === 'object') {
	        input = convertArray(input)
	    }
	    var n = input.length
	    limit = Math.min(n, limit)
	    begin = typeof begin === 'number' ? begin : 0
	    if (begin < 0) {
	        begin = Math.max(0, n + begin)
	    }

	    var data = []
	    for (var i = begin; i < n; i++) {
	        data.push(input[i])
	        if (data.length === limit) {
	            break
	        }
	    }
	    var isArray = type === 'array'
	    if (isArray) {
	        return data
	    }
	    var target = {}
	    return recovery(target, data, function (el) {
	        target[el.key] = el.value
	    })
	}

	function recovery(ret, array, callback) {
	    for (var i = 0, n = array.length; i < n; i++) {
	        callback(array[i])
	    }
	    return ret
	}


	function convertArray(array) {
	    var ret = [], i = 0
	    avalon.each(array, function (key, value) {
	        ret[i++] = {
	            value: value,
	            key: key
	        }
	    })
	    return ret
	}

	module.exports = {
	    limitBy: limitBy,
	    orderBy: orderBy,
	    selectBy: selectBy,
	    filterBy: filterBy
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	
	var eventFilters = {
	    stop: function (e) {
	        e.stopPropagation()
	        return e
	    },
	    prevent: function (e) {
	        e.preventDefault()
	        return e
	    }
	}
	var keyCode = {
	    esc: 27,
	    tab: 9,
	    enter: 13,
	    space: 32,
	    del: 46,
	    up: 38,
	    left: 37,
	    right: 39,
	    down: 40
	}

	avalon.each(keyCode, function (name, keyCode) {
	    eventFilters[name] = function (e) {
	        if (e.which !== keyCode) {
	            e.$return = true
	        }
	        return e
	    }
	})

	module.exports = eventFilters

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 虚拟DOM的3大构造器
	 */
	var VText = __webpack_require__(15)
	var VComment = __webpack_require__(17)
	var VElement = __webpack_require__(18)

	avalon.vdomAdaptor = function (obj, method) {
	    if (!obj) {//obj在ms-for循环里面可能是null
	        return (method === "toHTML" ? '' :
	            avalon.avalonFragment.cloneNode(false))
	    }
	    switch (obj.nodeType) {
	        case 3:
	            return VText.prototype[method].call(obj)
	        case 8:
	            return VComment.prototype[method].call(obj)
	        case 1:
	            return VElement.prototype[method].call(obj)
	        default:
	            if (Array.isArray(obj)) {
	                if (method === "toHTML") {
	                    return obj.map(function (a) {
	                        return avalon.vdomAdaptor(a, 'toHTML')
	                    }).join('')
	                } else {
	                    var f = avalon.avalonFragment.cloneNode(false)
	                    obj.forEach(function (a) {
	                        f.appendChild(avalon.vdomAdaptor(a, 'toDOM'))
	                    })
	                    return f
	                }
	            }
	    }
	}

	module.exports = {
	    VText: VText,
	    VComment: VComment,
	    VElement: VElement
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var rexpr = avalon.config.rexpr
	var decode = __webpack_require__(16)
	function VText(text) {
	    if (typeof text === 'string') {
	        this.type = '#text'
	        this.nodeValue = text
	        this.skipContent = !rexpr.test(text)
	        this.nodeType = 3
	    } else {
	        for (var i in text) {
	            this[i] = text[i]
	        }
	    }
	}

	VText.prototype = {
	    constructor: VText,
	    toDOM: function () {
	       var v = decode(this.nodeValue)
	       return document.createTextNode(v)
	    },
	    toHTML: function () {
	        return this.nodeValue
	    }
	}

	module.exports = VText

/***/ },
/* 16 */
/***/ function(module, exports) {

	/* 
	 * 对html实体进行转义
	 * https://github.com/substack/node-ent
	 * http://www.cnblogs.com/xdp-gacl/p/3722642.html
	 * http://www.stefankrause.net/js-frameworks-benchmark2/webdriver-java/table.html
	 */

	var rentities = /&[a-z0-9#]{2,10};/
	var temp = avalon.avalonDiv
	module.exports = function (str) {
	    if (rentities.test(str)) {
	        temp.innerHTML = str
	        return temp.innerText || temp.textContent
	    }
	    return str
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	
	function VComment(text) {
	    if (typeof text === 'string') {
	        this.type = '#comment'
	        this.nodeValue = text
	        this.skipContent = true
	        this.nodeType = 8
	    } else {
	        for (var i in text) {
	            this[i] = text[i]
	        }
	    }
	}
	VComment.prototype = {
	    constructor: VComment,
	    toDOM: function () {
	        return document.createComment(this.nodeValue)
	    },
	    toHTML: function () {
	        return '<!--' + this.nodeValue + '-->'+(this.template||"")
	    }
	}

	module.exports = VComment

/***/ },
/* 18 */
/***/ function(module, exports) {

	
	function VElement(type, props, children) {
	    if (typeof type === 'object') {
	        for (var i in type) {
	            this[i] = type[i]
	        }
	    } else {
	        this.nodeType = 1
	        this.type = type
	        this.props = props
	        this.children = children
	    }
	}
	function skipFalseAndFunction(a) {
	    return a !== false && (Object(a) !== a)
	}
	var specal = {
	    "class": function (dom, val) {
	        dom.className = val
	    },
	    style: function (dom, val) {
	        dom.style.cssText = val
	    },
	    'for': function (dom, val) {
	        dom.htmlFor = val
	    }
	}

	function createVML(type) {
	    if (document.styleSheets.length < 31) {
	        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
	    } else {
	        // no more room, add to the existing one
	        // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx
	        document.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
	    }
	    var arr = type.split(':')
	    if (arr.length === 1) {
	        arr.unshift('v')
	    }
	    var tag = arr[1]
	    var ns = arr[0]
	    if (!document.namespaces[ns]) {
	        document.namespaces.add(ns, "urn:schemas-microsoft-com:vml")
	    }
	    return  document.createElement('<' + ns + ':' + tag + ' class="rvml">');
	}

	function createSVG(type) {
	    return document.createElementNS('http://www.w3.org/2000/svg', type)
	}
	var svgTags = avalon.oneObject('circle,defs,ellipse,image,line,' +
	        'path,polygon,polyline,rect,symbol,text,use,g,svg')
	var VMLTags = avalon.oneObject('shape,line,polyline,rect,roundrect,oval,arc,' +
	        'curve,background,image,shapetype,group,fill,' +
	        'stroke,shadow, extrusion, textbox, imagedata, textpath')

	var rvml = /^\w+\:\w+/

	VElement.prototype = {
	    constructor: VElement,
	    toDOM: function () {
	        var dom, tagName = this.type
	        if (avalon.modern && svgTags[tagName]) {
	            dom = createSVG(tagName)
	        } else if (!avalon.modern && (VMLTags[tagName] || rvml.test(tagName))) {
	            dom = createVML(tagName)
	        } else {
	            dom = document.createElement(tagName)
	        }
	        var wid = this.props['ms-important'] ||
	                this.props['ms-controller'] || this.wid
	        if (wid) {
	            var scope = avalon.scopes[wid]
	            var element = scope && scope.vmodel && scope.vmodel.$element
	            if (element) {
	                var oldVdom = element.vtree[0]
	                if (oldVdom.children) {
	                    this.children = oldVdom.children
	                }
	                return element
	            }
	        }
	        for (var i in this.props) {
	            var val = this.props[i]
	            if (skipFalseAndFunction(val)) {
	                if (specal[i] && avalon.msie < 8) {
	                    specal[i](dom, val)
	                } else {
	                    dom.setAttribute(i, val + '')
	                }
	            }
	        }
	        var c = this.children || []
	        var template = c[0] ? c[0].nodeValue : ''
	        switch (this.type) {
	            case 'script':
	                dom.text = template
	                break
	            case 'style':
	                if ('styleSheet' in dom) {
	                    dom.setAttribute('type', 'text/css')
	                    dom.styleSheet.cssText = template
	                } else {
	                    dom.innerHTML = template
	                }
	                break
	            case 'xmp'://IE6-8,XMP元素里面只能有文本节点,不能使用innerHTML
	            case 'noscript':
	                dom.innerText = dom.textContent = template
	                break
	            case 'template':
	                dom.innerHTML = template
	                break
	            default:
	                if (!this.isVoidTag) {
	                    this.children.forEach(function (c) {
	                        c && dom.appendChild(avalon.vdomAdaptor(c, 'toDOM'))
	                    })
	                }
	                break
	        }
	        return dom
	    },
	    toHTML: function () {
	        var arr = []
	        for (var i in this.props) {
	            var val = this.props[i]
	            if (skipFalseAndFunction(val)) {
	                arr.push(i + '=' + avalon.quote(this.props[i] + ''))
	            }
	        }
	        arr = arr.length ? ' ' + arr.join(' ') : ''
	        var str = '<' + this.type + arr
	        if (this.isVoidTag) {
	            return str + '/>'
	        }
	        str += '>'
	        if (this.children.length) {
	            str += this.children.map(function (c) {
	                return c ? avalon.vdomAdaptor(c, 'toHTML') : ''
	            }).join('')
	        }
	        return str + '</' + this.type + '>'
	    }
	}

	module.exports = VElement

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 *                          DOM Api
	 * shim,class,data,css,val,html,event,ready  
	 * ------------------------------------------------------------
	 */
	__webpack_require__(20)
	__webpack_require__(21)
	__webpack_require__(22)
	__webpack_require__(25)
	__webpack_require__(26)
	__webpack_require__(27)
	__webpack_require__(30)
	__webpack_require__(32)

	module.exports = avalon

/***/ },
/* 20 */
/***/ function(module, exports) {

	function fixContains(root, el) {
	    try { //IE6-8,游离于DOM树外的文本节点，访问parentNode有时会抛错
	        while ((el = el.parentNode))
	            if (el === root)
	                return true
	        return false
	    } catch (e) {
	        return false
	    }
	}

	avalon.contains = fixContains
	//IE6-11的文档对象没有contains
	if (!avalon.document.contains) {
	    avalon.document.contains = function (b) {
	        return fixContains(document, b)
	    }
	}

	if (window.Node && !document.createTextNode('x').contains) {
	    Node.prototype.contains = function (arg) {//IE6-8没有Node对象
	        return !!(this.compareDocumentPosition(arg) & 16)
	    }
	}

	//firefox 到11时才有outerHTML
	if (window.HTMLElement && !avalon.root.outerHTML) {
	    HTMLElement.prototype.__defineGetter__('outerHTML', function () {
	        var div = document.createElement('div')
	        div.appendChild(this)
	        return div.innerHTML
	    })
	}




/***/ },
/* 21 */
/***/ function(module, exports) {

	var rnowhite = /\S+/g
	var fakeClassListMethods = {
	    _toString: function () {
	        var node = this.node
	        var cls = node.className
	        var str = typeof cls === 'string' ? cls : cls.baseVal
	        var match = str.match(rnowhite)
	        return match ? match.join(' ') : ''
	    },
	    _contains: function (cls) {
	        return (' ' + this + ' ').indexOf(' ' + cls + ' ') > -1
	    },
	    _add: function (cls) {
	        if (!this.contains(cls)) {
	            this._set(this + ' ' + cls)
	        }
	    },
	    _remove: function (cls) {
	        this._set((' ' + this + ' ').replace(' ' + cls + ' ', ' '))
	    },
	    __set: function (cls) {
	        cls = cls.trim()
	        var node = this.node
	        if (typeof node.className === 'object') {
	            //SVG元素的className是一个对象 SVGAnimatedString { baseVal='', animVal=''}，只能通过set/getAttribute操作
	            node.setAttribute('class', cls)
	        } else {
	            node.className = cls
	        }
	    } //toggle存在版本差异，因此不使用它
	}

	function fakeClassList(node) {
	    if (!('classList' in node)) {
	        node.classList = {
	            node: node
	        }
	        for (var k in fakeClassListMethods) {
	            node.classList[k.slice(1)] = fakeClassListMethods[k]
	        }
	    }
	    return node.classList
	}


	'add,remove'.replace(avalon.rword, function (method) {
	    avalon.fn[method + 'Class'] = function (cls) {
	        var el = this[0] || {}
	        //https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/26
	        if (cls && typeof cls === 'string' && el.nodeType === 1) {
	            cls.replace(rnowhite, function (c) {
	                fakeClassList(el)[method](c)
	            })
	        }
	        return this
	    }
	})

	avalon.fn.mix({
	    hasClass: function (cls) {
	        var el = this[0] || {}
	        return el.nodeType === 1 && fakeClassList(el).contains(cls)
	    },
	    toggleClass: function (value, stateVal) {
	        var isBool = typeof stateVal === 'boolean'
	        var me = this
	        String(value).replace(rnowhite, function (c) {
	            var state = isBool ? stateVal : !me.hasClass(c)
	            me[state ? 'addClass' : 'removeClass'](c)
	        })
	        return this
	    }
	})



/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	
	var propMap = __webpack_require__(23)
	var isVML = __webpack_require__(24)
	var rsvg =/^\[object SVG\w*Element\]$/
	var ramp = /&amp;/g

	function attrUpdate(node, vnode) {
	    var attrs = vnode.changeAttr
	    if (!node || node.nodeType !== 1 ) {
	        return
	    }
	    if (attrs) {
	        for (var attrName in attrs) {
	            var val = attrs[attrName]
	            // 处理路径属性
	            if (attrName === 'href' || attrName === 'src') {
	                if (!node.hasAttribute) {
	                    val = String(val).replace(ramp, '&') //处理IE67自动转义的问题
	                }
	                node[attrName] = val
	                if (window.chrome && node.tagName === 'EMBED') {
	                    var parent = node.parentNode //#525  chrome1-37下embed标签动态设置src不能发生请求
	                    var comment = document.createComment('ms-src')
	                    parent.replaceChild(comment, node)
	                    parent.replaceChild(node, comment)
	                }
	                //处理HTML5 data-*属性
	            } else if (attrName.indexOf('data-') === 0) {
	                node.setAttribute(attrName, val)

	            } else {
	                var propName = propMap[attrName] || attrName
	                if (typeof node[propName] === 'boolean') {
	                    node[propName] = !!val
	                  
	                    //布尔属性必须使用el.xxx = true|false方式设值
	                    //如果为false, IE全系列下相当于setAttribute(xxx,''),
	                    //会影响到样式,需要进一步处理
	                }

	                if (val === false ) {//移除属性
	                    node.removeAttribute(propName)
	                    continue
	                }
	                //SVG只能使用setAttribute(xxx, yyy), VML只能使用node.xxx = yyy ,
	                //HTML的固有属性必须node.xxx = yyy
	             
	                var isInnate = rsvg.test(node) ? false :
	                        (!avalon.modern && isVML(node)) ? true :
	                        attrName in node.cloneNode(false)
	                if (isInnate) {
	                    node[propName] = val + ''
	                } else {
	                    node.setAttribute(attrName, val)
	                }

	            }

	        }
	        vnode.changeAttr = null
	    }
	}

	var rvalidchars = /^[\],:{}\s]*$/,
	    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g

	avalon.parseJSON = avalon.window.JSON ? JSON.parse : function (data) {
	    if (typeof data === 'string') {
	        data = data.trim()
	        if (data) {
	            if (rvalidchars.test(data.replace(rvalidescape, '@')
	                    .replace(rvalidtokens, ']')
	                    .replace(rvalidbraces, ''))) {
	                return (new Function('return ' + data))() // jshint ignore:line
	            }
	        }
	        avalon.error('Invalid JSON: ' + data)
	    }
	    return data
	}


	avalon.fn.attr = function (name, value) {
	    if (arguments.length === 2) {
	        this[0].setAttribute(name, value)
	        return this
	    } else {
	        return this[0].getAttribute(name)
	    }
	}

	module.exports = attrUpdate

/***/ },
/* 23 */
/***/ function(module, exports) {

	var propMap = {//不规则的属性名映射
	    'accept-charset': 'acceptCharset',
	    'char': 'ch',
	    charoff: 'chOff',
	    'class': 'className',
	    'for': 'htmlFor',
	    'http-equiv': 'httpEquiv'
	}
	/*
	contenteditable不是布尔属性
	http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/
	contenteditable=''
	contenteditable='events'
	contenteditable='caret'
	contenteditable='plaintext-only'
	contenteditable='true'
	contenteditable='false'
	 */
	var bools = ['autofocus,autoplay,async,allowTransparency,checked,controls',
	    'declare,disabled,defer,defaultChecked,defaultSelected,',
	    'isMap,loop,multiple,noHref,noResize,noShade',
	    'open,readOnly,selected'
	].join(',')

	bools.replace(/\w+/g, function (name) {
	    propMap[name.toLowerCase()] = name
	})

	var anomaly = ['accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan',
	    'dateTime,defaultValue,contentEditable,frameBorder,longDesc,maxLength,'+
	    'marginWidth,marginHeight,rowSpan,tabIndex,useMap,vSpace,valueType,vAlign'
	].join(',')

	anomaly.replace(/\w+/g, function (name) {
	    propMap[name.toLowerCase()] = name
	})

	module.exports = propMap


/***/ },
/* 24 */
/***/ function(module, exports) {

	function isVML(src) {
	    var nodeName = src.nodeName
	    return nodeName.toLowerCase() === nodeName && src.scopeName && src.outerText === ''
	}

	module.exports = isVML

/***/ },
/* 25 */
/***/ function(module, exports) {

	var root = avalon.root
	var window = avalon.window
	var camelize = avalon.camelize
	var cssHooks = avalon.cssHooks

	var prefixes = ['', '-webkit-', '-o-', '-moz-', '-ms-']
	var cssMap = {
	    'float': window.Range ? 'cssFloat' : 'styleFloat'
	}
	avalon.cssNumber = avalon.oneObject('animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom')

	avalon.cssName = function (name, host, camelCase) {
	    if (cssMap[name]) {
	        return cssMap[name]
	    }
	    host = host || root.style || {}
	    for (var i = 0, n = prefixes.length; i < n; i++) {
	        camelCase = camelize(prefixes[i] + name)
	        if (camelCase in host) {
	            return (cssMap[name] = camelCase)
	        }
	    }
	    return null
	}


	avalon.fn.css = function (name, value) {
	    if (avalon.isPlainObject(name)) {
	        for (var i in name) {
	            avalon.css(this, i, name[i])
	        }
	    } else {
	        var ret = avalon.css(this, name, value)
	    }
	    return ret !== void 0 ? ret : this
	}

	avalon.fn.position = function () {
	    var offsetParent, offset,
	            elem = this[0],
	            parentOffset = {
	                top: 0,
	                left: 0
	            }
	    if (!elem) {
	        return parentOffset
	    }
	    if (this.css('position') === 'fixed') {
	        offset = elem.getBoundingClientRect()
	    } else {
	        offsetParent = this.offsetParent() //得到真正的offsetParent
	        offset = this.offset() // 得到正确的offsetParent
	        if (offsetParent[0].tagName !== 'HTML') {
	            parentOffset = offsetParent.offset()
	        }
	        parentOffset.top += avalon.css(offsetParent[0], 'borderTopWidth', true)
	        parentOffset.left += avalon.css(offsetParent[0], 'borderLeftWidth', true)

	        // Subtract offsetParent scroll positions
	        parentOffset.top -= offsetParent.scrollTop()
	        parentOffset.left -= offsetParent.scrollLeft()
	    }
	    return {
	        top: offset.top - parentOffset.top - avalon.css(elem, 'marginTop', true),
	        left: offset.left - parentOffset.left - avalon.css(elem, 'marginLeft', true)
	    }
	}
	avalon.fn.offsetParent = function () {
	    var offsetParent = this[0].offsetParent
	    while (offsetParent && avalon.css(offsetParent, 'position') === 'static') {
	        offsetParent = offsetParent.offsetParent
	    }
	    return avalon(offsetParent || root)
	}

	cssHooks['@:set'] = function (node, name, value) {
	    try {
	        //node.style.width = NaN;node.style.width = 'xxxxxxx';
	        //node.style.width = undefine 在旧式IE下会抛异常
	        node.style[name] = value
	    } catch (e) {
	    }
	}

	if (window.getComputedStyle) {
	    cssHooks['@:get'] = function (node, name) {
	        if (!node || !node.style) {
	            throw new Error('getComputedStyle要求传入一个节点 ' + node)
	        }
	        var ret, styles = getComputedStyle(node, null)
	        if (styles) {
	            ret = name === 'filter' ? styles.getPropertyValue(name) : styles[name]
	            if (ret === '') {
	                ret = node.style[name] //其他浏览器需要我们手动取内联样式
	            }
	        }
	        return ret
	    }
	    cssHooks['opacity:get'] = function (node) {
	        var ret = cssHooks['@:get'](node, 'opacity')
	        return ret === '' ? '1' : ret
	    }
	} else {
	    var rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i
	    var rposition = /^(top|right|bottom|left)$/
	    var ralpha = /alpha\([^)]*\)/i
	    var ie8 = !!window.XDomainRequest
	    var salpha = 'DXImageTransform.Microsoft.Alpha'
	    var border = {
	        thin: ie8 ? '1px' : '2px',
	        medium: ie8 ? '3px' : '4px',
	        thick: ie8 ? '5px' : '6px'
	    }
	    cssHooks['@:get'] = function (node, name) {
	        //取得精确值，不过它有可能是带em,pc,mm,pt,%等单位
	        var currentStyle = node.currentStyle
	        var ret = currentStyle[name]
	        if ((rnumnonpx.test(ret) && !rposition.test(ret))) {
	            //①，保存原有的style.left, runtimeStyle.left,
	            var style = node.style,
	                    left = style.left,
	                    rsLeft = node.runtimeStyle.left
	            //②由于③处的style.left = xxx会影响到currentStyle.left，
	            //因此把它currentStyle.left放到runtimeStyle.left，
	            //runtimeStyle.left拥有最高优先级，不会style.left影响
	            node.runtimeStyle.left = currentStyle.left
	            //③将精确值赋给到style.left，然后通过IE的另一个私有属性 style.pixelLeft
	            //得到单位为px的结果；fontSize的分支见http://bugs.jquery.com/ticket/760
	            style.left = name === 'fontSize' ? '1em' : (ret || 0)
	            ret = style.pixelLeft + 'px'
	            //④还原 style.left，runtimeStyle.left
	            style.left = left
	            node.runtimeStyle.left = rsLeft
	        }
	        if (ret === 'medium') {
	            name = name.replace('Width', 'Style')
	            //border width 默认值为medium，即使其为0'
	            if (currentStyle[name] === 'none') {
	                ret = '0px'
	            }
	        }
	        return ret === '' ? 'auto' : border[ret] || ret
	    }
	    cssHooks['opacity:set'] = function (node, name, value) {
	        var style = node.style
	        var opacity = isFinite(value) && value <= 1 ? 'alpha(opacity=' + value * 100 + ')' : ''
	        var filter = style.filter || ''
	        style.zoom = 1
	        //不能使用以下方式设置透明度
	        //node.filters.alpha.opacity = value * 100
	        style.filter = (ralpha.test(filter) ?
	                filter.replace(ralpha, opacity) :
	                filter + ' ' + opacity).trim()
	        if (!style.filter) {
	            style.removeAttribute('filter')
	        }
	    }
	    cssHooks['opacity:get'] = function (node) {
	        //这是最快的获取IE透明值的方式，不需要动用正则了！
	        var alpha = node.filters.alpha || node.filters[salpha],
	                op = alpha && alpha.enabled ? alpha.opacity : 100
	        return (op / 100) + '' //确保返回的是字符串
	    }
	}

	'top,left'.replace(avalon.rword, function (name) {
	    cssHooks[name + ':get'] = function (node) {
	        var computed = cssHooks['@:get'](node, name)
	        return /px$/.test(computed) ? computed :
	                avalon(node).position()[name] + 'px'
	    }
	})

	var cssShow = {
	    position: 'absolute',
	    visibility: 'hidden',
	    display: 'block'
	}

	var rdisplayswap = /^(none|table(?!-c[ea]).+)/

	function showHidden(node, array) {
	    //http://www.cnblogs.com/rubylouvre/archive/2012/10/27/2742529.html
	    if (node.offsetWidth <= 0) { //opera.offsetWidth可能小于0
	        if (rdisplayswap.test(cssHooks['@:get'](node, 'display'))) {
	            var obj = {
	                node: node
	            }
	            for (var name in cssShow) {
	                obj[name] = node.style[name]
	                node.style[name] = cssShow[name]
	            }
	            array.push(obj)
	        }
	        var parent = node.parentNode
	        if (parent && parent.nodeType === 1) {
	            showHidden(parent, array)
	        }
	    }
	}
	avalon.each({
	    Width: 'width',
	    Height: 'height'
	}, function (name, method) {
	    var clientProp = 'client' + name,
	            scrollProp = 'scroll' + name,
	            offsetProp = 'offset' + name
	    cssHooks[method + ':get'] = function (node, which, override) {
	        var boxSizing = -4
	        if (typeof override === 'number') {
	            boxSizing = override
	        }
	        which = name === 'Width' ? ['Left', 'Right'] : ['Top', 'Bottom']
	        var ret = node[offsetProp] // border-box 0
	        if (boxSizing === 2) { // margin-box 2
	            return ret + avalon.css(node, 'margin' + which[0], true) + avalon.css(node, 'margin' + which[1], true)
	        }
	        if (boxSizing < 0) { // padding-box  -2
	            ret = ret - avalon.css(node, 'border' + which[0] + 'Width', true) - avalon.css(node, 'border' + which[1] + 'Width', true)
	        }
	        if (boxSizing === -4) { // content-box -4
	            ret = ret - avalon.css(node, 'padding' + which[0], true) - avalon.css(node, 'padding' + which[1], true)
	        }
	        return ret
	    }
	    cssHooks[method + '&get'] = function (node) {
	        var hidden = []
	        showHidden(node, hidden)
	        var val = cssHooks[method + ':get'](node)
	        for (var i = 0, obj; obj = hidden[i++]; ) {
	            node = obj.node
	            for (var n in obj) {
	                if (typeof obj[n] === 'string') {
	                    node.style[n] = obj[n]
	                }
	            }
	        }
	        return val
	    }
	    avalon.fn[method] = function (value) { //会忽视其display
	        var node = this[0]
	        if (arguments.length === 0) {
	            if (node.setTimeout) { //取得窗口尺寸
	                return node['inner' + name] ||
	                        node.document.documentElement[clientProp] ||
	                        node.document.body[clientProp] //IE6下前两个分别为undefined,0
	            }
	            if (node.nodeType === 9) { //取得页面尺寸
	                var doc = node.documentElement
	                //FF chrome    html.scrollHeight< body.scrollHeight
	                //IE 标准模式 : html.scrollHeight> body.scrollHeight
	                //IE 怪异模式 : html.scrollHeight 最大等于可视窗口多一点？
	                return Math.max(node.body[scrollProp], doc[scrollProp], node.body[offsetProp], doc[offsetProp], doc[clientProp])
	            }
	            return cssHooks[method + '&get'](node)
	        } else {
	            return this.css(method, value)
	        }
	    }
	    avalon.fn['inner' + name] = function () {
	        return cssHooks[method + ':get'](this[0], void 0, -2)
	    }
	    avalon.fn['outer' + name] = function (includeMargin) {
	        return cssHooks[method + ':get'](this[0], void 0, includeMargin === true ? 2 : 0)
	    }
	})

	avalon.fn.offset = function () { //取得距离页面左右角的坐标
	    var node = this[0],
	            box = {
	                left: 0,
	                top: 0
	            }
	    if (!node || !node.tagName || !node.ownerDocument) {
	        return box
	    }
	    var doc = node.ownerDocument,
	            body = doc.body,
	            root = doc.documentElement,
	            win = doc.defaultView || doc.parentWindow
	    if (!avalon.contains(root, node)) {
	        return box
	    }
	    //http://hkom.blog1.fc2.com/?mode=m&no=750 body的偏移量是不包含margin的
	    //我们可以通过getBoundingClientRect来获得元素相对于client的rect.
	    //http://msdn.microsoft.com/en-us/library/ms536433.aspx
	    if (node.getBoundingClientRect) {
	        box = node.getBoundingClientRect() // BlackBerry 5, iOS 3 (original iPhone)
	    }
	    //chrome/IE6: body.scrollTop, firefox/other: root.scrollTop
	    var clientTop = root.clientTop || body.clientTop,
	            clientLeft = root.clientLeft || body.clientLeft,
	            scrollTop = Math.max(win.pageYOffset || 0, root.scrollTop, body.scrollTop),
	            scrollLeft = Math.max(win.pageXOffset || 0, root.scrollLeft, body.scrollLeft)
	    // 把滚动距离加到left,top中去。
	    // IE一些版本中会自动为HTML元素加上2px的border，我们需要去掉它
	    // http://msdn.microsoft.com/en-us/library/ms533564(VS.85).aspx
	    return {
	        top: box.top + scrollTop - clientTop,
	        left: box.left + scrollLeft - clientLeft
	    }
	}

	//生成avalon.fn.scrollLeft, avalon.fn.scrollTop方法
	avalon.each({
	    scrollLeft: 'pageXOffset',
	    scrollTop: 'pageYOffset'
	}, function (method, prop) {
	    avalon.fn[method] = function (val) {
	        var node = this[0] || {},
	                win = getWindow(node),
	                top = method === 'scrollTop'
	        if (!arguments.length) {
	            return win ? (prop in win) ? win[prop] : root[method] : node[method]
	        } else {
	            if (win) {
	                win.scrollTo(!top ? val : avalon(win).scrollLeft(), top ? val : avalon(win).scrollTop())
	            } else {
	                node[method] = val
	            }
	        }
	    }
	})

	function getWindow(node) {
	    return node.window || node.defaultView || node.parentWindow || false
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	function getValType(elem) {
	    var ret = elem.tagName.toLowerCase()
	    return ret === 'input' && /checkbox|radio/.test(elem.type) ? 'checked' : ret
	}
	var roption = /^<option(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s+value[\s=]/i
	var valHooks = {
	    'option:get': avalon.msie ? function (node) {
	        //在IE11及W3C，如果没有指定value，那么node.value默认为node.text（存在trim作），但IE9-10则是取innerHTML(没trim操作)
	        //specified并不可靠，因此通过分析outerHTML判定用户有没有显示定义value
	        return roption.test(node.outerHTML) ? node.value : node.text.trim()
	    } : function (node) {
	        return node.value
	    },
	    'select:get': function (node, value) {
	        var option, options = node.options,
	                index = node.selectedIndex,
	                getter = valHooks['option:get'],
	                one = node.type === 'select-one' || index < 0,
	                values = one ? null : [],
	                max = one ? index + 1 : options.length,
	                i = index < 0 ? max : one ? index : 0
	        for (; i < max; i++) {
	            option = options[i]
	            //IE6-9在reset后不会改变selected，需要改用i === index判定
	            //我们过滤所有disabled的option元素，但在safari5下，
	            //如果设置optgroup为disable，那么其所有孩子都disable
	            //因此当一个元素为disable，需要检测其是否显式设置了disable及其父节点的disable情况
	            if ((option.selected || i === index) && !option.disabled &&
	                    (!option.parentNode.disabled || option.parentNode.tagName !== 'OPTGROUP')
	                    ) {
	                value = getter(option)
	                if (one) {
	                    return value
	                }
	                //收集所有selected值组成数组返回
	                values.push(value)
	            }
	        }
	        return values
	    },
	    'select:set': function (node, values, optionSet) {
	        values = [].concat(values) //强制转换为数组
	        var getter = valHooks['option:get']
	        for (var i = 0, el; el = node.options[i++]; ) {
	            if ((el.selected = values.indexOf(getter(el)) > -1)) {
	                optionSet = true
	            }
	        }
	        if (!optionSet) {
	            node.selectedIndex = -1
	        }
	    }
	}

	avalon.fn.val = function (value) {
	    var node = this[0]
	    if (node && node.nodeType === 1) {
	        var get = arguments.length === 0
	        var access = get ? ':get' : ':set'
	        var fn = valHooks[getValType(node) + access]
	        if (fn) {
	            var val = fn(node, value)
	        } else if (get) {
	            return (node.value || '').replace(/\r/g, '')
	        } else {
	            node.value = value
	        }
	    }
	    return get ? val : this
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(28)

	var fixCloneNode = __webpack_require__(29)

	var rhtml = /<|&#?\w+;/
	var htmlCache = new Cache(128)
	var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig

	avalon.parseHTML = function (html) {
	    var fragment = avalon.avalonFragment.cloneNode(false)
	    //处理非字符串
	    if (typeof html !== 'string') {
	        return fragment
	    }
	    //处理非HTML字符串
	    if (!rhtml.test(html)) {
	        return document.createTextNode(html)
	    }

	    html = html.replace(rxhtml, '<$1></$2>').trim()
	    var hasCache = htmlCache.get(html)
	    if (hasCache) {
	        return fixCloneNode(hasCache)
	    }
	    var vnodes = avalon.lexer(html)
	    for (var i = 0, el; el = vnodes[i++]; ) {
	        fragment.appendChild(avalon.vdomAdaptor(el, 'toDOM'))
	    }
	    if (html.length < 1024) {
	        htmlCache.put(html, fixCloneNode(fragment))
	    }
	    return fragment
	}

	avalon.innerHTML = function (node, html) {
	    if (!avalon.modern && (!rcreate.test(html) && !rnest.test(html))) {
	        try {
	            node.innerHTML = html
	            return
	        } catch (e) {
	        }
	    }
	    var parsed = this.parseHTML(html)
	    this.clearHTML(node).appendChild(parsed)
	}

	var reunescapeHTML = /&(?:amp|lt|gt|quot|#39|#96);/g
	var htmlUnescapes = {
	    '&amp;': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&#39;': "'",
	    '&#96;': '`'
	}
	avalon.unescapeHTML = function (string) {
	    var str = '' + string
	    return str.replace(reunescapeHTML, function (c) {
	        return htmlUnescapes[c]
	    })
	}

	var rescapeHTML = /["'&<>]/
	//https://github.com/nthtran/vdom-to-html
	//将字符串经过 str 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt 
	avalon.escapeHTML = function (string) {
	    var str = '' + string
	    var match = rescapeHTML.exec(str)

	    if (!match) {
	        return str
	    }

	    var escape
	    var html = ''
	    var index = 0
	    var lastIndex = 0

	    for (index = match.index; index < str.length; index++) {
	        switch (str.charCodeAt(index)) {
	            case 34: // "
	                escape = '&quot;'
	                break
	            case 38: // &
	                escape = '&amp;'
	                break
	            case 39: // '
	                escape = '&#39;'
	                break
	            case 60: // <
	                escape = '&lt;'
	                break
	            case 62: // >
	                escape = '&gt;'
	                break
	            default:
	                continue
	        }

	        if (lastIndex !== index) {
	            html += str.substring(lastIndex, index)
	        }

	        lastIndex = index + 1
	        html += escape
	    }

	    return lastIndex !== index
	            ? html + str.substring(lastIndex, index)
	            : html
	}

	avalon.clearHTML = function (node) {
	    node.textContent = ''
	    while (node.lastChild) {
	        node.removeChild(node.lastChild)
	    }
	    return node
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	// https://github.com/rsms/js-lru
	function LRU(maxLength) {
	    this.size = 0
	    this.limit = maxLength
	    this.head = this.tail = void 0
	    this._keymap = {}
	}

	var p = LRU.prototype

	p.put = function (key, value) {
	    var entry = {
	        key: key,
	        value: value
	    }
	    this._keymap[key] = entry
	    if (this.tail) {
	        this.tail.newer = entry
	        entry.older = this.tail
	    } else {
	        this.head = entry
	    }
	    this.tail = entry
	    if (this.size === this.limit) {
	        this.shift()
	    } else {
	        this.size++
	    }
	    return value
	}

	p.shift = function () {
	    var entry = this.head
	    if (entry) {
	        this.head = this.head.newer
	        this.head.older =
	                entry.newer =
	                entry.older =
	                this._keymap[entry.key] = void 0
	        delete this._keymap[entry.key] //#1029
	    }
	}
	p.get = function (key) {
	    var entry = this._keymap[key]
	    if (entry === void 0)
	        return
	    if (entry === this.tail) {
	        return  entry.value
	    }
	    // HEAD--------------TAIL
	    //   <.older   .newer>
	    //  <--- add direction --
	    //   A  B  C  <D>  E
	    if (entry.newer) {
	        if (entry === this.head) {
	            this.head = entry.newer
	        }
	        entry.newer.older = entry.older // C <-- E.
	    }
	    if (entry.older) {
	        entry.older.newer = entry.newer // C. --> E
	    }
	    entry.newer = void 0 // D --x
	    entry.older = this.tail // D. --> E
	    if (this.tail) {
	        this.tail.newer = entry // E. <-- D
	    }
	    this.tail = entry
	    return entry.value
	}

	module.exports = LRU


/***/ },
/* 29 */
/***/ function(module, exports) {

	var rcheckedType = /radio|checkbox/

	function fix(dest, src) {
	    if (dest.nodeType !== 1) {
	        return
	    }
	    var nodeName = dest.nodeName.toLowerCase()
	    if (nodeName === 'object') {
	        if (dest.parentNode) {
	            dest.outerHTML = src.outerHTML
	        }

	    } else if (nodeName === 'input' && rcheckedType.test(src.type)) {

	        dest.defaultChecked = dest.checked = src.checked

	        if (dest.value !== src.value) {
	            dest.value = src.value
	        }

	    } else if (nodeName === 'option') {
	        dest.defaultSelected = dest.selected = src.defaultSelected
	    } else if (nodeName === 'input' || nodeName === 'textarea') {
	        dest.defaultValue = src.defaultValue
	    }
	}


	function getAll(context) {
	    return typeof context.getElementsByTagName !== "undefined" ?
	            context.getElementsByTagName("*") :
	            typeof context.querySelectorAll !== "undefined" ?
	            context.querySelectorAll("*") : []
	}

	function fixCloneNode(src) {
	    var target = src.cloneNode(true)
	    if (avalon.modern)
	        return target
	    var t = getAll(target)
	    var s = getAll(src)
	    avalon.each(s, function (i) {
	        fix(t[i], s[i])
	    })
	    return target
	}

	module.exports = fixCloneNode

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var document = avalon.document
	var window = avalon.window
	var root = avalon.root
	var W3C = avalon.modern

	var getShortID = __webpack_require__(6).getShortID
	//http://www.feiesoft.com/html/events.html
	//http://segmentfault.com/q/1010000000687977/a-1020000000688757
	var canBubbleUp = __webpack_require__(31)

	if (!W3C) {
	    delete canBubbleUp.change
	    delete canBubbleUp.select
	}

	var eventHooks = avalon.eventHooks
	/*绑定事件*/
	avalon.bind = function (elem, type, fn) {
	    if (elem.nodeType === 1) {
	        var value = elem.getAttribute('avalon-events') || ''
	        //如果是使用ms-on-*绑定的回调,其uuid格式为e12122324,
	        //如果是使用bind方法绑定的回调,其uuid格式为_12
	        var uuid = getShortID(fn)
	        var hook = eventHooks[type]
	        if (hook) {
	            type = hook.type || type
	            if (hook.fix) {
	                fn = hook.fix(elem, fn)
	                fn.uuid = uuid
	            }
	        }
	        var key = type + ':' + uuid
	        avalon.eventListeners[fn.uuid] = fn
	        if (value.indexOf(type + ':') === -1) {//同一种事件只绑定一次
	            if (canBubbleUp[type] || (avalon.modern && focusBlur[type])) {
	                delegateEvent(type)
	            } else {
	                nativeBind(elem, type, dispatch)
	            }
	        }
	        var keys = value.split(',')
	        if (keys[0] === '') {
	            keys.shift()
	        }
	        if (keys.indexOf(key) === -1) {
	            keys.push(key)
	            elem.setAttribute('avalon-events', keys.join(','))
	            //将令牌放进avalon-events属性中
	        }

	    } else {
	        nativeBind(elem, type, fn)
	    }
	    return fn //兼容之前的版本
	}

	avalon.unbind = function (elem, type, fn) {
	    if (elem.nodeType === 1) {
	        var value = elem.getAttribute('avalon-events') || ''
	        switch (arguments.length) {
	            case 1:
	                nativeUnBind(elem, type, dispatch)
	                elem.removeAttribute('avalon-events')
	                break
	            case 2:
	                value = value.split(',').filter(function (str) {
	                    return str.indexOf(type + ':') === -1
	                }).join(',')
	                elem.setAttribute('avalon-events', value)
	                break
	            default:
	                var search = type + ':' + fn.uuid
	                value = value.split(',').filter(function (str) {
	                    return str !== search
	                }).join(',')
	                elem.setAttribute('avalon-events', value)
	                delete avalon.eventListeners[fn.uuid]
	                break
	        }
	    } else {
	        nativeUnBind(elem, type, fn)
	    }
	}

	var typeRegExp = {}
	function collectHandlers(elem, type, handlers) {
	    var value = elem.getAttribute('avalon-events')
	    if (value && (elem.disabled !== true || type !== 'click')) {
	        var uuids = []
	        var reg = typeRegExp[type] || (typeRegExp[type] = new RegExp("\\b" + type + '\\:([^,\\s]+)', 'g'))
	        value.replace(reg, function (a, b) {
	            uuids.push(b)
	            return a
	        })
	        if (uuids.length) {
	            handlers.push({
	                elem: elem,
	                uuids: uuids
	            })
	        }
	    }
	    elem = elem.parentNode
	    var g = avalon.gestureEvents || {}
	    if (elem && elem.getAttribute && (canBubbleUp[type] || g[type])) {
	        collectHandlers(elem, type, handlers)
	    }

	}
	var rhandleHasVm = /^e/
	var stopImmediate = false
	function dispatch(event) {
	    event = new avEvent(event)
	    var type = event.type
	    var elem = event.target
	    var handlers = []
	    collectHandlers(elem, type, handlers)
	    var i = 0, j, uuid, handler
	    while ((handler = handlers[i++]) && !event.cancelBubble) {
	        var host = event.currentTarget = handler.elem
	        j = 0
	        while ((uuid = handler.uuids[ j++ ])) {
	            if (stopImmediate) {
	                stopImmediate = false
	                break
	            }
	            var fn = avalon.eventListeners[uuid]
	            if (fn) {
	                var vm = rhandleHasVm.test(uuid) ? handler.elem._ms_context_ : 0
	                if (vm && vm.$hashcode === false) {
	                    return avalon.unbind(elem, type, fn)
	                }

	                var ret = fn.call(vm || elem, event, host._ms_local)

	                if (ret === false) {
	                    event.preventDefault()
	                    event.stopPropagation()
	                }
	            }
	        }
	    }
	}

	var focusBlur = {
	    focus: true,
	    blur: true
	}
	var nativeBind = W3C ? function (el, type, fn, capture) {
	    el.addEventListener(type, fn, capture)
	} : function (el, type, fn) {
	    el.attachEvent('on' + type, fn)
	}
	var nativeUnBind = W3C ? function (el, type, fn) {
	    el.removeEventListener(type, fn)
	} : function (el, type, fn) {
	    el.detachEvent('on' + type, fn)
	}

	function delegateEvent(type) {
	    var value = root.getAttribute('delegate-events') || ''
	    if (value.indexOf(type) === -1) {
	        var arr = value.match(avalon.rword) || []
	        arr.push(type)
	        root.setAttribute('delegate-events', arr.join(','))
	        nativeBind(root, type, dispatch, !!focusBlur[type])
	    }
	}

	avalon.fireDom = function (elem, type, opts) {
	    if (document.createEvent) {
	        var hackEvent = document.createEvent('Events')
	        hackEvent.initEvent(type, true, true, opts)
	        avalon.shadowCopy(hackEvent, opts)

	        elem.dispatchEvent(hackEvent)
	    } else if (root.contains(elem)) {//IE6-8触发事件必须保证在DOM树中,否则报'SCRIPT16389: 未指明的错误'
	        hackEvent = document.createEventObject()
	        avalon.shadowCopy(hackEvent, opts)
	        elem.fireEvent('on' + type, hackEvent)
	    }
	}

	var rmouseEvent = /^(?:mouse|contextmenu|drag)|click/
	var rconstant = /^[A-Z_]+$/
	function avEvent(event) {
	    if (event.originalEvent) {
	        return this
	    }
	    for (var i in event) {
	        if (!rconstant.test(i) && typeof event[i] !== 'function') {
	            this[i] = event[i]
	        }
	    }
	    if (!this.target) {
	        this.target = event.srcElement
	    }
	    var target = this.target
	    if (this.which == null && event.type.indexOf('key') === 0) {
	        this.which = event.charCode != null ? event.charCode : event.keyCode
	    } else if (rmouseEvent.test(event.type) && !('pageX' in this)) {
	        var doc = target.ownerDocument || document
	        var box = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement
	        this.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0)
	        this.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0)
	        this.wheelDeltaY = this.wheelDelta
	        this.wheelDeltaX = 0
	    }
	    this.timeStamp = new Date() - 0
	    this.originalEvent = event
	}
	avEvent.prototype = {
	    preventDefault: function () {
	        var e = this.originalEvent || {}
	        e.returnValue = this.returnValue = false
	        if (e.preventDefault) {
	            e.preventDefault()
	        }
	    },
	    stopPropagation: function () {
	        var e = this.originalEvent || {}
	        e.cancelBubble = this.cancelBubble = true
	        if (e.stopPropagation) {
	            e.stopPropagation()
	        }
	    },
	    stopImmediatePropagation: function () {
	        stopImmediate = true;
	        this.stopPropagation()
	    },
	    toString: function () {
	        return '[object Event]'//#1619
	    }
	}

	//针对firefox, chrome修正mouseenter, mouseleave
	if (!('onmouseenter' in root)) {
	    avalon.each({
	        mouseenter: 'mouseover',
	        mouseleave: 'mouseout'
	    }, function (origType, fixType) {
	        eventHooks[origType] = {
	            type: fixType,
	            fix: function (elem, fn) {
	                return function (e) {
	                    var t = e.relatedTarget
	                    if (!t || (t !== elem && !(elem.compareDocumentPosition(t) & 16))) {
	                        delete e.type
	                        e.type = origType
	                        return fn.apply(this, arguments)
	                    }
	                }
	            }
	        }
	    })
	}
	//针对IE9+, w3c修正animationend
	avalon.each({
	    AnimationEvent: 'animationend',
	    WebKitAnimationEvent: 'webkitAnimationEnd'
	}, function (construct, fixType) {
	    if (window[construct] && !eventHooks.animationend) {
	        eventHooks.animationend = {
	            type: fixType
	        }
	    }
	})
	//针对IE6-8修正input
	if (!('oninput' in document.createElement('input'))) {
	    eventHooks.input = {
	        type: 'propertychange',
	        fix: function (elem, fn) {
	            return function (e) {
	                if (e.propertyName === 'value') {
	                    e.type = 'input'
	                    return fn.apply(this, arguments)
	                }
	            }
	        }
	    }
	}
	if (document.onmousewheel === void 0) {
	    /* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
	     firefox DOMMouseScroll detail 下3 上-3
	     firefox wheel detlaY 下3 上-3
	     IE9-11 wheel deltaY 下40 上-40
	     chrome wheel deltaY 下100 上-100 */
	    var fixWheelType = document.onwheel !== void 0 ? 'wheel' : 'DOMMouseScroll'
	    var fixWheelDelta = fixWheelType === 'wheel' ? 'deltaY' : 'detail'
	    eventHooks.mousewheel = {
	        type: fixWheelType,
	        fix: function (elem, fn) {
	            return function (e) {
	                var delta = e[fixWheelDelta] > 0 ? -120 : 120
	                e.wheelDelta = ~~elem._ms_wheel_ + delta
	                elem._ms_wheel_ = e.wheelDeltaY = e.wheelDelta

	                e.wheelDeltaX = 0
	                if (Object.defineProperty) {
	                    Object.defineProperty(e, 'type', {
	                        value: 'mousewheel'
	                    })
	                }
	                return fn.apply(this, arguments)
	            }
	        }
	    }
	}

	avalon.fn.bind = function (type, fn, phase) {
	    if (this[0]) { //此方法不会链
	        return avalon.bind(this[0], type, fn, phase)
	    }
	}

	avalon.fn.unbind = function (type, fn, phase) {
	    if (this[0]) {
	        avalon.unbind(this[0], type, fn, phase)
	    }
	    return this
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	//http://www.feiesoft.com/html/events.html
	//http://segmentfault.com/q/1010000000687977/a-1020000000688757
	module.exports = {
	    click: true,
	    dblclick: true,
	    keydown: true,
	    keypress: true,
	    keyup: true,
	    mousedown: true,
	    mousemove: true,
	    mouseup: true,
	    mouseover: true,
	    mouseout: true,
	    wheel: true,
	    mousewheel: true,
	    input: true,
	    change: true,
	    beforeinput: true,
	    compositionstart: true,
	    compositionupdate: true,
	    compositionend: true,
	    select: true,
	    //http://blog.csdn.net/lee_magnum/article/details/17761441
	    cut: true,
	    copy: true,
	    paste: true,
	    beforecut: true,
	    beforecopy: true,
	    beforepaste: true,
	    focusin: true,
	    focusout: true,
	    DOMFocusIn: true,
	    DOMFocusOut: true,
	    DOMActivate: true,
	    dragend: true,
	    datasetchanged: true
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var scan = __webpack_require__(33)
	scan.htmlfy = __webpack_require__(34)
	var document = avalon.document
	var window = avalon.window
	var root = avalon.root

	var readyList = [], isReady
	var fireReady = function (fn) {
	    isReady = true

	    while (fn = readyList.shift()) {
	        fn(avalon)
	    }
	}

	function doScrollCheck() {
	    try { //IE下通过doScrollCheck检测DOM树是否建完
	        root.doScroll('left')
	        fireReady()
	    } catch (e) {
	        setTimeout(doScrollCheck)
	    }
	}

	if (document.readyState === 'complete') {
	    setTimeout(fireReady) //如果在domReady之外加载
	} else if (document.addEventListener) {
	    document.addEventListener('DOMContentLoaded', fireReady)
	} else if (document.attachEvent) {
	    document.attachEvent('onreadystatechange', function () {
	        if (document.readyState === 'complete') {
	            fireReady()
	        }
	    })
	    try {
	        var isTop = window.frameElement === null
	    } catch (e) {
	    }
	    if (root.doScroll && isTop && window.external) {//fix IE iframe BUG
	        doScrollCheck()
	    }
	}
	if (window.document) {
	    avalon.bind(window, 'load', fireReady)
	}
	avalon.ready = function (fn) {
	    if (!isReady) {
	        readyList.push(fn)
	    } else {
	        fn(avalon)
	    }
	}

	avalon.ready(function(){
	    scan(document.body)
	})



/***/ },
/* 33 */
/***/ function(module, exports) {

	var onceWarn = true //只警告一次
	function scan(nodes) {
	    var getHTML = avalon.scan.htmlfy
	    for (var i = 0, elem; elem = nodes[i++]; ) {
	        if (elem.nodeType === 1) {
	            var $id = getController(elem)

	            var vm = avalon.vmodels[$id]
	            if (vm && !vm.$element) {
	                avalon(elem).removeClass('ms-controller')
	                vm.$element = elem
	             
	                //IE6-8下元素的outerHTML前面会有空白
	                var text = getHTML(elem)//elem.outerHTML
	  
	                var now = new Date()
	                elem.vtree = avalon.speedUp(avalon.lexer(text)) 
	             
	                var now2 = new Date()
	                onceWarn && avalon.log('构建虚拟DOM耗时', now2 - now, 'ms')
	                vm.$render = avalon.render(elem.vtree)
	                avalon.scopes[vm.$id] = {
	                    vmodel: vm,
	                    local: {},
	                    isTemp: true
	                }
	                var now3 = new Date()
	                onceWarn && avalon.log('构建当前vm的$render方法耗时 ', now3 - now2, 'ms\n',
	                        '如果此时间太长,达100ms以上\n',
	                        '建议将当前ms-controller拆分成多个ms-controller,减少每个vm管辖的区域')
	                avalon.rerenderStart = now3
	                onceWarn = false
	                avalon.batch($id)

	            } else if (!$id) {
	                scan(elem.childNodes)
	            }
	        }
	    }
	}

	module.exports = avalon.scan = function (a) {
	    if (!a || !a.nodeType) {
	        avalon.warn('[avalon.scan] first argument must be element , documentFragment, or document')
	        return
	    }
	    scan([a])
	}

	function getController(a) {
	    return a.getAttribute('ms-controller') || 
	            a.getAttribute(':controller') 
	}

/***/ },
/* 34 */
/***/ function(module, exports) {

	var noChild = avalon.oneObject("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr")

	function getHTML(el) {
	    switch (el.nodeType) {
	        case 1:
	            var type = el.nodeName.toLowerCase()
	            return '<' + type + getAttributes(el.attributes) +
	                    (noChild[type] ? '/>' : ('>' + getChild(el) + '</' + type + '>'))
	        case 3:
	            return avalon.escapeHTML(el.nodeValue)//#1592
	        case 8:
	            return '<!--' + el.nodeValue + '-->'
	    }
	}


	function getAttributes(array) {
	    var ret = []
	    for (var i = 0, attr; attr = array[i++]; ) {
	        if (attr.specified) {
	            ret.push(attr.name.toLowerCase() + '="' + avalon.escapeHTML(attr.value) + '"')
	        }
	    }
	    var str = ret.join(' ')
	    return str ? ' ' + str : ''
	}

	function getChild(el) {
	    var ret = ''
	    for (var i = 0, node; node = el.childNodes[i++]; ) {
	        ret += getHTML(node)
	    }
	    return ret
	}

	module.exports = function(el){
	    if(avalon.msie > 8 || !avalon.msie){
	        return el.outerHTML
	    }
	    return getHTML(el)
	}


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(36)
	__webpack_require__(38)
	//处理属性样式
	__webpack_require__(40)

	__webpack_require__(41)
	__webpack_require__(42)
	////处理内容
	__webpack_require__(43)
	__webpack_require__(44)
	__webpack_require__(45)
	////需要用到事件的
	__webpack_require__(46)
	__webpack_require__(47)
	__webpack_require__(48)
	__webpack_require__(57)
	__webpack_require__(58)
	//
	////处理逻辑
	__webpack_require__(59)
	__webpack_require__(60)
	//
	__webpack_require__(61)
	__webpack_require__(64)
	//优先级 ms-important, ms-controller, ms-for, ms-widget, ms-effect, ms-if
	//.......
	//ms-duplex


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// 抽离出来公用
	var update = __webpack_require__(37)

	avalon.directive('important', {
	    priority: 1,
	    parse: function (copy, src, binding) {
	        var quoted = avalon.quote(binding.expr)
	        copy[binding.name] = quoted
	        copy.local = '{}'
	        copy.vmodel = '(function(){ return __vmodel__ = avalon.vmodels[' + quoted + ']})()'
	        src.$prepend = ['(function(__vmodel__){',
	            'var important = avalon.scopes[' + quoted + ']',
	            'if(important){avalon.log("不进入"+' + quoted + ');return }',
	        ].join('\n') + '\n'
	        src.$append = '\n})();'
	    },
	    diff: function (copy, src, name) {
	        if (copy === src || src.vmodel !== copy.vmodel) {
	            src['ms-controller'] = copy[name]
	            src.local = copy.local
	            src.vmodel = copy.vmodel
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom, parent) {
	        avalon.directives.controller.update(dom, vdom, parent, 'important')
	    }
	})


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function (vdom, update, hookName) {
	    if (hookName) {
	        vdom.afterChange = vdom.afterChange || []
	        avalon.Array.ensure(vdom.afterChange, update)
	    } else {
	        var dom = vdom.dom
	        update(vdom.dom, vdom, dom && dom.parentNode)
	    }
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 抽离出来公用
	var update = __webpack_require__(37)
	var reconcile = __webpack_require__(39)

	var cache = {}
	avalon.mediatorFactoryCache = function (__vmodel__, __present__) {
	    var a = __vmodel__.$hashcode
	    var b = __present__.$hashcode
	    var id = a + b
	    if (cache[id]) {
	        return cache[id]
	    }
	    var c = avalon.mediatorFactory(__vmodel__, __present__)
	    return  cache[id] = c
	}
	avalon.directive('controller', {
	    priority: 2,
	    parse: function (copy, src, binding) {
	        var quoted = avalon.quote(binding.expr)
	        copy[binding.name] = quoted
	        copy.local = '__local__'
	        copy.vmodel = [
	            '(function(){',
	            'var vm = avalon.vmodels[' + quoted + ']',
	            'if(vm && __vmodel__&& vm !== __vmodel__){',
	            'return __vmodel__ = avalon.mediatorFactoryCache(__vmodel__, vm)',
	            '}else if(vm){',
	            'return __vmodel__ = vm',
	            '}',
	            '})()'
	        ].join('\n')

	        src.$prepend = '(function(__vmodel__){'
	        src.$append = '\n})(__vmodel__);'
	    },
	    diff: function (copy, src, name) {
	        if (copy === src || src[name] !== copy[name]) {
	            src[name] = copy[name]
	            src.local = copy.local
	            src.vmodel = copy.vmodel
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom, parent, important) {
	        var vmodel = vdom.vmodel
	        var local = vdom.local
	        var id = vdom['ms-controller']
	        var scope = avalon.scopes[id]
	        if (scope) {
	            return
	        }
	        delete vdom.vmodel
	        delete vdom.local
	        var top = avalon.vmodels[id]
	        if (vmodel.$element && vmodel.$element.vtree[0] === vdom) {
	            var render = vmodel.$render
	        } else {
	            render = avalon.render([vdom], local)
	        }
	        vmodel.$render = render
	        vmodel.$element = dom
	      
	        reconcile([dom], [vdom], parent)
	        dom.vtree = [vdom]
	        if (top !== vmodel) {
	            top.$render = top.$render || render
	            top.$element = top.$element || dom
	        }
	        var needFire = important ? vmodel : top
	        var scope = avalon.scopes[id] = {
	            vmodel: vmodel,
	            local: local
	        }
	        update(vdom, function () {
	            var events = needFire.$events["onReady"]
	            if (events) {
	                needFire.$fire('onReady')
	                delete needFire.$events.onReady
	            }
	            scope.isMount = true
	        }, 'afterChange')

	    }
	})


/***/ },
/* 39 */
/***/ function(module, exports) {

	/*
	 * 
	 节点对齐算法
	 元素节点是1＋其类型
	 文本节点是3＋其是否能移除
	 注释节点是8＋其内容
	 发现不一样，就对真实DOM树添加或删除
	 添加的是 ms-for,ms-for-end占位的注释节点
	 删除的是多余的空白文本节点,与IE6-8私下添加的奇怪节点
	 */
	var rforHolder = /^ms\-for/
	var rwhiteRetain = /[\S\xA0]/
	var plainTag = avalon.oneObject('script,style,xmp,template,noscript,textarea')

	function reconcile(nodes, vnodes, parent) {
	    //遍平化虚拟DOM树
	    vnodes = flatten(vnodes)
	    var map = {}
	    var vn = vnodes.length
	    if (vn === 0)
	        return

	    vnodes.forEach(function (el, index) {
	        map[index] = getType(el)
	    })
	    var newNodes = [], change = false, el, i = 0
	    var breakLoop = 0
	    while (true) {
	        el = nodes[i++]
	        if (breakLoop++ > 5000) {
	            break
	        }
	        var vtype = el && getType(el)
	        var v = newNodes.length, check
	        if (map[v] === vtype) {
	            if (check && el.nodeType === 1 && (el.getAttribute(':for')||el.getAttribute('ms-for'))) {
	                check = false
	                continue
	            }
	            newNodes.push(el)
	            var vnode = vnodes[v]

	            if (vnode.dynamic) {
	                vnode.dom = el
	            }

	            if (el.nodeType === 1 && !vnode.isVoidTag && !plainTag[vnode.type]) {
	                if (el.type === 'select-one') {
	                    //在chrome与firefox下删掉select中的空白节点，会影响到selectedIndex
	                    var fixIndex = el.selectedIndex
	                }
	                reconcile(el.childNodes, vnode.children, el)
	                if (el.type === 'select-one') {
	                    el.selectedIndex = fixIndex
	                }
	            }
	        } else {
	            change = true
	            if (map[v] === '8true') {
	                var vv = vnodes[v]
	                var nn = document.createComment(vv.nodeValue)
	                vv.dom = nn
	                newNodes.push(nn)
	                if (vv.dynamic === 'for') {
	                    check = true
	                }
	                i = Math.max(0, --i)
	            }
	        }
	        if (newNodes.length === vn) {
	            break
	        }
	    }
	    if (change) {
	        var f = document.createDocumentFragment(), i = 0
	        while (el = newNodes[i++]) {
	            f.appendChild(el)
	        }
	        while (parent.firstChild) {
	            parent.removeChild(parent.firstChild)
	        }
	        parent.appendChild(f)
	    }
	}

	module.exports = reconcile


	function getType(node) {
	    switch (node.nodeType) {
	        case 3:
	            return '3' + rwhiteRetain.test(node.nodeValue)
	        case 1:
	            return '1' + (node.nodeName || node.type).toLowerCase()
	        case 8:
	            return '8' + rforHolder.test(node.nodeValue)
	    }
	}

	function flatten(nodes) {
	    var arr = []
	    for (var i = 0, el; el = nodes[i]; i++) {
	        if (Array.isArray(el)) {
	            arr = arr.concat(flatten(el))
	        } else {
	            arr.push(el)
	        }
	    }
	    return arr
	}



/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	
	var attrUpdate = __webpack_require__(22)
	var update = __webpack_require__(37)

	avalon.directive('attr', {
	    diff: function (copy, src, name) {
	        var a = copy[name]
	        var p = src[name]
	        if (a && typeof a === 'object') {
	            a = a.$model || a //安全的遍历VBscript
	            if (Array.isArray(a)) {//转换成对象
	                a = avalon.mix.apply({}, a)
	            }
	            if (copy === src || typeof p !== 'object') {//如果一开始为空
	                src.changeAttr = src[name] = a
	            } else {
	                var patch = {}
	                var hasChange = false
	                for (var i in a) {//diff差异点
	                    if (a[i] !== p[i]) {
	                        hasChange = true
	                        patch[i] = a[i]
	                    }
	                }
	                if (hasChange) {
	                    src[name] = a
	                    src.changeAttr = patch
	                }
	            }
	            if (src.changeAttr) {
	                update(src, this.update )
	            }
	        }
	        if(copy !== src){
	            delete copy[name]//释放内存
	        }
	    },
	    //dom, vnode
	    update: attrUpdate
	})


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	
	var update = __webpack_require__(37)

	avalon.directive('css', {
	    diff: function (copy, src, name) {
	        var a = copy[name]
	        var p = src[name]
	        if (Object(a) === a) {
	            a = a.$model || a//安全的遍历VBscript
	            if (Array.isArray(a)) {//转换成对象
	                a = avalon.mix.apply({}, a)
	            }
	            if (copy === src || typeof p !== 'object') {//如果一开始为空
	                src.changeStyle = src[name] = a
	            } else {
	                var patch = {}
	                var hasChange = false
	                for (var i in a) {//diff差异点
	                    if (a[i] !== p[i]) {
	                        hasChange = true
	                        patch[i] = a[i]
	                    }
	                }
	                if (hasChange) {
	                    src[name] = a
	                    src.changeStyle = patch
	                }
	            }
	            if (src.changeStyle) {
	                update(src, this.update)
	            }
	        }
	        delete copy[name]//释放内存
	    },
	    update: function (dom, vdom) {
	        var change = vdom.changeStyle
	        var wrap = avalon(dom)
	        for (var name in change) {
	            wrap.css(name, change[name])
	        }
	        delete vdom.changeStyle
	    }
	})


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(37)

	var none = 'none'
	function parseDisplay(elem, val) {
	    //用于取得此类标签的默认display值
	    var doc = elem.ownerDocument
	    var nodeName = elem.nodeName
	    var key = '_' + nodeName
	    if (!parseDisplay[key]) {
	        var temp = doc.body.appendChild(doc.createElement(nodeName))
	        if (avalon.modern) {
	            val = getComputedStyle(temp, null).display
	        } else {
	            val = temp.currentStyle.display
	        }
	        doc.body.removeChild(temp)
	        if (val === none) {
	            val = 'block'
	        }
	        parseDisplay[key] = val
	    }
	    return parseDisplay[key]
	}

	avalon.parseDisplay = parseDisplay

	avalon.directive('visible', {
	    diff: function (copy, src, name) {
	        var c = !!copy[name]
	        if (copy === src || c !== src[name]) {
	            src[name] = c
	            update(src, this.update )
	        }
	    },
	    update: function (dom, vdom) { 
	        if(!dom || dom.nodeType !== 1){
	            return
	        }
	        var show = vdom['ms-visible']
	        var display = dom.style.display
	        var value
	        if (show) {
	            if (display === none) {
	                value = vdom.displayValue
	                if (!value) {
	                    dom.style.display = ''
	                }
	            }
	            if (dom.style.display === '' && avalon(dom).css('display') === none &&
	                    // fix firefox BUG,必须挂到页面上
	                    avalon.contains(dom.ownerDocument, dom)) {

	                value = parseDisplay(dom)
	            }
	        } else {
	            if (display !== none) {
	                value = none
	                vdom.displayValue = display
	            }
	        }
	        function cb(){
	           if (value !== void 0) {
	              dom.style.display = value
	           }
	        }
	        avalon.applyEffect(dom, vdom, {
	            hook: show ? 'onEnterDone': 'onLeaveDone',
	            cb: cb
	        })
	    }
	})



/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(37)

	avalon.directive('expr', {
	    parse: avalon.noop,
	    diff: function (copy, src) {
	        var copyValue = copy.nodeValue + ''
	        if (copy === src || copyValue !== src.nodeValue) {
	            src.nodeValue = copyValue
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom) {
	        if (dom) {
	            dom.nodeValue = vdom.nodeValue
	        } else {
	            avalon.warn('[', vdom.nodeValue, ']找不到对应的文本节点赋值')
	        }
	    }
	})




/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	//此指令实际上不会操作DOM,交由expr指令处理
	var update = __webpack_require__(37)

	avalon.directive('text', {
	    parse: function (copy, src, binding) {
	        copy[binding.name] = 1
	        src.children = []
	        copy.children = '[{\nnodeType:3,\ntype:"#text",\ndynamic:true,' +
	                '\nnodeValue:avalon.parsers.string(' +
	                avalon.parseExpr(binding) + ')}]'
	    },
	    diff: function (copy, src) {
	        if(!src.children.length){
	           update(src, this.update)
	        }
	    },
	    update: function(dom, vdom){
	        if (dom && !vdom.isVoidTag ) {
	            var parent = dom
	            while (parent.firstChild) {
	                parent.removeChild(parent.firstChild)
	            }
	            var dom = document.createTextNode('x')
	            parent.appendChild(dom)
	            var a = {nodeType: 3, type:'#text', dom: dom}
	            vdom.children.push(a)
	        }
	    }
	})

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(37)
	var reconcile = __webpack_require__(39)

	avalon.directive('html', {
	    parse: function (copy, src, binding) {
	        if (!src.isVoidTag) {
	            //将渲染函数的某一部分存起来,渲在c方法中转换为函数
	            copy[binding.name] = avalon.parseExpr(binding)
	            copy.vmodel = '__vmodel__'
	            copy.local = '__local__'
	        } else {
	            copy.children = '[]'
	        }
	    },
	    diff: function (copy, src, name) {
	        var copyValue = copy[name] + ''
	        if (copy === src || !src.render || copyValue !== src[name]) {
	            src[name] = copyValue
	            var oldTree = avalon.speedUp(avalon.lexer(copyValue))
	            src.children = oldTree
	            var render = avalon.render(oldTree, copy.local)
	            src.render = render
	            var newTree = render(copy.vmodel, copy.local)
	            copy.children = newTree
	            update(src, this.update)
	        } else {
	            var newTree = src.render(copy.vmodel, copy.local)
	          copy.children = newTree
	        }
	    },
	    update: function (dom, vdom, parent) {
	        avalon.clearHTML(dom)
	        var f = avalon.vdomAdaptor(vdom.children)
	        reconcile(f.childNodes, vdom.children, f)
	        dom.appendChild(f)
	    }
	})


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	//根据VM的属性值或表达式的值切换类名，ms-class='xxx yyy zzz:flag'
	//http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
	var markID = __webpack_require__(6).getLongID
	var update = __webpack_require__(37)

	function classNames() {
	    var classes = []
	    for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i]
	        var argType = typeof arg
	        if (argType === 'string' || argType === 'number' || arg === true) {
	            classes.push(arg)
	        } else if (Array.isArray(arg)) {
	            classes.push(classNames.apply(null, arg))
	        } else if (argType === 'object') {
	            for (var key in arg) {
	                if (arg.hasOwnProperty(key) && arg[key]) {
	                    classes.push(key)
	                }
	            }
	        }
	    }

	    return classes.join(' ')
	}



	var directives = avalon.directives
	avalon.directive('class', {
	    diff: function (copy, src, name) {
	        var type = name.slice(3)
	        var copyValue = copy[name]
	        var srcValue = src[name] || ''
	        var classEvent = src.classEvent || {}
	        if (type === 'hover') {//在移出移入时切换类名
	            classEvent.mouseenter = activateClass
	            classEvent.mouseleave = abandonClass
	        } else if (type === 'active') {//在获得焦点时切换类名
	            src.props.tabindex = copy.props.tabindex || -1
	            classEvent.tabIndex = src.props.tabindex
	            classEvent.mousedown = activateClass
	            classEvent.mouseup = abandonClass
	            classEvent.mouseleave = abandonClass
	        }
	        src.classEvent = classEvent

	        var className = classNames(copyValue)
	       
	        if (copy === src || srcValue !== className) {
	            src[name] = className
	            src['change-' + type] = className
	            update(src, this.update, type)
	        }
	    },
	    update: function (dom, vdom) {
	        if (!dom || dom.nodeType !== 1)
	            return
	        var classEvent = vdom.classEvent
	        if (classEvent) {
	            for (var i in classEvent) {
	                if (i === 'tabIndex') {
	                    dom[i] = classEvent[i]
	                } else {
	                    avalon.bind(dom, i, classEvent[i])
	                }
	            }
	            vdom.classEvent = {}
	        }
	        var names = ['class', 'hover', 'active']
	        names.forEach(function (type) {
	            var name = 'change-' + type
	            var value = vdom[name]
	            if (value === void 0)
	                return
	            if (type === 'class') {
	                dom && setClass(dom, vdom)
	            } else {
	                var oldType = dom.getAttribute('change-' + type)
	                if (oldType) {
	                    avalon(dom).removeClass(oldType)
	                }
	                dom.setAttribute(name, value)
	            }
	        })
	    }
	})

	directives.active = directives.hover = directives['class']


	var classMap = {
	    mouseenter: 'change-hover',
	    mouseleave: 'change-hover',
	    mousedown: 'change-active',
	    mouseup: 'change-active'
	}

	function activateClass(e) {
	    var elem = e.target
	    avalon(elem).addClass(elem.getAttribute(classMap[e.type]) || '')
	}

	function abandonClass(e) {
	    var elem = e.target
	    var name = classMap[e.type]
	    avalon(elem).removeClass(elem.getAttribute(name) || '')
	    if (name !== 'change-active') {
	        avalon(elem).removeClass(elem.getAttribute('change-active') || '')
	    }
	}

	function setClass(dom, vdom) {
	    var old = dom.getAttribute('old-change-class')
	    var neo = vdom['ms-class']
	    if (old !== neo) {
	        avalon(dom).removeClass(old).addClass(neo)
	        dom.setAttribute('old-change-class', neo)
	    }

	}

	markID(activateClass)
	markID(abandonClass)




/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(28)
	var eventCache = new Cache(128)
	var update = __webpack_require__(37)
	var markID = __webpack_require__(6).getLongID

	var rfilters = /\|.+/g
	//Ref: http://developers.whatwg.org/webappapis.html#event-handler-idl-attributes
	// The assumption is that future DOM event attribute names will begin with
	// 'on' and be composed of only English letters.
	var rfilters = /\|.+/g
	var rvar = /((?:\@|\$|\#\#)?\w+)/g
	var rstring = /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g

	//基于事件代理的高性能事件绑定
	avalon.directive('on', {
	    priority: 3000,
	    parse: function (copy, src, binding) {
	        var underline = binding.name.replace('ms-on-', 'e').replace('-', '_')
	        var uuid = underline + '_' + binding.expr.
	                replace(/\s/g, '').
	                replace(/[^$a-z]/ig, function (e) {
	                    return e.charCodeAt(0)
	                })

	        var quoted = avalon.quote(uuid)
	        var fn = '(function(){\n' +
	                'var fn610 = ' +
	                avalon.parseExpr(binding, 'on') +
	                '\nfn610.uuid =' + quoted + ';\nreturn fn610})()'
	        copy.vmodel = '__vmodel__'
	        copy.local = '__local__'
	        copy[binding.name] = fn

	    },
	    diff: function (copy, src, name) {
	        var fn = copy[name]
	        var uuid = fn.uuid
	        var type = uuid.split('_').shift()
	        var search = type.slice(1) + ':' + uuid
	        var srcFn = src[name]
	        var hasChange = false
	        var init = copy === src
	        if (init || !srcFn || srcFn.uuid !== uuid) {
	            src[name] = fn
	            src.addEvents = src.addEvents || {}
	            src.addEvents[search] = fn
	            avalon.eventListeners.uuid = fn
	            hasChange = true
	        }
	        if (diffObj(src.local|| {}, copy.local)) {
	            hasChange = true
	        }
	        if (hasChange) {
	            src.local = copy.local
	            src.vmodel = copy.vmodel
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom) {
	        if (!dom || dom.nodeType > 1) //在循环绑定中，这里为null
	            return
	        var key, type, listener
	        dom._ms_context_ = vdom.vmodel
	        dom._ms_local = vdom.local
	        for (key in vdom.addEvents) {
	            type = key.split(':').shift()
	            listener = vdom.addEvents[key]
	            avalon.bind(dom, type, listener)
	        }
	        delete vdom.addEvents
	    }
	})

	function diffObj(a, b) {
	    for (var i in a) {//diff差异点
	        if (a[i] !== b[i]) {
	            return true
	        }
	    }
	    return false
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	
	var update = __webpack_require__(37)
	var evaluatorPool = __webpack_require__(49)
	var stringify = __webpack_require__(50)

	var rchangeFilter = /\|\s*change\b/
	var rcheckedType = /^(?:checkbox|radio)$/
	var rdebounceFilter = /\|\s*debounce(?:\(([^)]+)\))?/
	var updateModelByEvent = __webpack_require__(51)
	var updateModelByValue = __webpack_require__(54)
	var updateModel = __webpack_require__(52)
	var updateView = __webpack_require__(55)
	var addValidateField = __webpack_require__(56)


	avalon.directive('duplex', {
	    priority: 2000,
	    parse: function (copy, src, binding) {
	        var expr = binding.expr
	        var etype = src.props.type
	        //处理数据转换器
	        var parser = binding.param, dtype
	        var isChecked = false
	        parser = parser ? parser.split('-').map(function (a) {
	            if (a === 'checked') {
	                isChecked = true
	            }
	            return a
	        }) : []

	        if (rcheckedType.test(etype) && isChecked) {
	            //如果是radio, checkbox,判定用户使用了checked格式函数没有
	            parser = []
	            dtype = 'radio'
	        }

	        if (!/input|textarea|select/.test(src.type)) {
	            if ('contenteditable' in src.props) {
	                dtype = 'contenteditable'
	            }
	        } else if (!dtype) {
	            dtype = src.type === 'select' ? 'select' :
	                    etype === 'checkbox' ? 'checkbox' :
	                    etype === 'radio' ? 'radio' :
	                    'input'
	        }
	        var isChanged = false, debounceTime = 0
	        //判定是否使用了 change debounce 过滤器
	        if (dtype === 'input' || dtype === 'contenteditable') {
	            var isString = true
	            if (rchangeFilter.test(expr)) {
	                isChanged = true
	            }
	            if (!isChanged) {
	                var match = expr.match(rdebounceFilter)
	                if (match) {
	                    debounceTime = parseInt(match[1], 10) || 300
	                }
	            }
	        }


	        var changed = copy.props['data-duplex-changed']
	        copy.parser = avalon.quote(parser + "")
	        copy.modelValue = '(' + avalon.parseExpr(binding, 'duplex') + ')(__vmodel__)'// 输出原始数据
	        var format = evaluatorPool.get('duplex:format:' + expr)

	        copy.duplexData = stringify({
	            type: dtype, //这个决定绑定什么事件
	            vmodel: '__vmodel__',
	            local: '__local__',
	            isChecked: isChecked,
	            isString: !!isString,
	            isChanged: isChanged, //这个决定同步的频数
	            debounceTime: debounceTime, //这个决定同步的频数
	            format: format || 'function(vm, a){return a}',
	            set: evaluatorPool.get('duplex:set:' + expr),
	            callback: changed ? avalon.parseExpr(changed, 'on') : 'avalon.noop'
	        })

	    },
	    diff: function (copy, src) {
	   
	        if (copy === src || !src.duplexData) {
	            //第一次为原始虚拟DOM添加duplexData
	            var data = src.duplexData = copy.duplexData
	            data.parser = copy.parser ? copy.parser.split(',') : []
	            data.parse = parseValue
	            var curValue = copy.modelValue
	        } else {
	            data = src.duplexData
	            var curValue = copy.modelValue
	            var preValue = data.modelValue
	            //#1502
	            copy.duplexData = 0
	            if (!Array.isArray(curValue) &&
	                    curValue === preValue) {
	                return
	            }
	        }
	        if (data.isString) {//输出到页面时要格式化
	            var value = data.parse(curValue)
	            if (value !== curValue) {
	                data.set(data.vmodel, value)
	                return
	            }
	            curValue = value
	        }
	        data.modelValue = curValue
	        if (data.isString) {//输出到页面时要格式化
	            value = data.format(data.vmodel, curValue + '')
	            if (value !== curValue + '') {
	                data.set(data.vmodel, value)
	                return
	            }
	            curValue = value
	        }
	        data.viewValue = curValue
	        update(src, this.update, 'afterChange')
	    },
	    update: function (dom, vdom) {
	        if (dom && dom.nodeType === 1) {
	            if (!dom.__ms_duplex__) {
	                dom.__ms_duplex__ = vdom.duplexData
	                updateModelByEvent(dom, vdom)
	            }
	            var data = dom.__ms_duplex__

	            data.dom = dom
	            addValidateField(dom, vdom)
	            if (data.isString
	                    && !avalon.msie
	                    && updateModelByValue === false
	                    && !dom.valueHijack) {
	                //chrome 42及以下版本需要这个hack

	                dom.valueHijack = updateModel
	                var intervalID = setInterval(function () {
	                    if (!avalon.contains(avalon.root, dom)) {
	                        clearInterval(intervalID)
	                    } else {
	                        dom.valueHijack()
	                    }
	                }, 30)
	            }

	            updateView[data.type].call(data)


	        }

	    }
	})

	function parseValue(val) {
	    for (var i = 0, k; k = this.parser[i++]; ) {
	        var fn = avalon.parsers[k]
	        if (fn) {
	            val = fn.call(this, val)
	        }
	    }
	    return val
	}

	/*
	 vm[ms-duplex]  →  原始modelValue →  格式化后比较   →   输出页面
	 ↑                                                ↓
	 比较modelValue  ←  parsed后得到modelValue  ← 格式化后比较 ←  原始viewValue
	 */

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	
	var Cache = __webpack_require__(28)
	//缓存求值函数，以便多次利用
	module.exports = new Cache(512)


/***/ },
/* 50 */
/***/ function(module, exports) {

	var keyMap = avalon.oneObject("break,case,catch,continue,debugger,default,delete,do,else,false," +
	        "finally,for,function,if,in,instanceof,new,null,return,switch,this," +
	        "throw,true,try,typeof,var,void,while,with," + /* 关键字*/
	        "abstract,boolean,byte,char,class,const,double,enum,export,extends," +
	        "final,float,goto,implements,import,int,interface,long,native," +
	        "package,private,protected,public,short,static,super,synchronized," +
	        "throws,transient,volatile")
	avalon.keyMap = keyMap
	var quoted = {
	    type: 1,
	    template: 1,
	    order: 1,
	    nodeValue: 1,
	    dynamic: 1,
	    signature: 1,
	    wid: 1
	}

	var rneedQuote = /[W-]/
	var quote = avalon.quote
	function fixKey(k) {
	    return (rneedQuote.test(k) || keyMap[k]) ? quote(k) : k
	}

	function stringify(obj) {
	    var arr1 = []
	//字符不用东西包起来就变成变量
	    for (var i in obj) {
	        if (i === 'props') {
	            var arr2 = []
	            for (var k in obj.props) {
	                var kv = obj.props[k]
	                if (typeof kv === 'string') {
	                    kv = quote(kv)
	                }
	                arr2.push(fixKey(k) + ': ' + kv)
	            }
	            arr1.push('props: {' + arr2.join(',\n') + '}')
	        } else if (obj.hasOwnProperty(i) && i !== 'dom') {
	            var v = obj[i]
	            if (typeof v === 'string') {
	                v = quoted[i] ? quote(v) : v
	            }
	            arr1.push(fixKey(i) + ':' + v)
	        }
	    }
	    return '{\n' + arr1.join(',\n') + '}'
	}

	module.exports = stringify


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* 
	 * 通过绑定事件同步vmodel
	 * 总共有三种方式同步视图
	 * 1. 各种事件 input, change, click, propertychange, keydown...
	 * 2. value属性重写
	 * 3. 定时器轮询
	 */
	var updateModel = __webpack_require__(52)
	var markID = __webpack_require__(6).getShortID
	var msie = avalon.msie
	var window = avalon.window
	var document = avalon.document
	function updateModelByEvent(node, vnode) {
	    var events = {}
	    var data = vnode.duplexData
	    data.update = updateModel
	    //添加需要监听的事件
	    switch (data.type) {
	        case 'radio':
	        case 'checkbox':
	            events.click = updateModel
	            break
	        case 'select':
	            events.change = updateModel
	            break
	        case 'contenteditable':
	            if (data.isChanged) {
	                events.blur = updateModel
	            } else {
	                if (avalon.modern) {
	                    if (window.webkitURL) {
	                        // http://code.metager.de/source/xref/WebKit/LayoutTests/fast/events/
	                        // https://bugs.webkit.org/show_bug.cgi?id=110742
	                        events.webkitEditableContentChanged = updateModel
	                    } else if (window.MutationEvent) {
	                        events.DOMCharacterDataModified = updateModel
	                    }
	                    events.input = updateModel
	                } else {
	                    events.keydown = updateModelKeyDown
	                    events.paste = updateModelDelay
	                    events.cut = updateModelDelay
	                    events.focus = closeComposition
	                    events.blur = openComposition
	                }

	            }
	            break
	        case 'input':
	            if (data.isChanged) {
	                events.change = updateModel
	            } else {
	                //http://www.cnblogs.com/rubylouvre/archive/2013/02/17/2914604.html
	                //http://www.matts411.com/post/internet-explorer-9-oninput/
	                if (msie) {//处理输入法问题
	                    events.keyup = updateModelKeyDown
	                }

	                if (msie < 9) {
	                    events.propertychange = updateModelHack
	                    events.paste = updateModelDelay
	                    events.cut = updateModelDelay
	                } else {
	                    events.input = updateModel
	                }
	                //IE6-8的propertychange有BUG,第一次用JS修改值时不会触发,而且你是全部清空value也不会触发
	                //IE9的propertychange不支持自动完成,退格,删除,复制,贴粘,剪切或点击右边的小X的清空操作
	                //IE11微软拼音好像才会触发compositionstart 不会触发compositionend
	                //https://github.com/RubyLouvre/avalon/issues/1368#issuecomment-220503284
	                if(!msie || msie > 9){
	                    events.compositionstart = openComposition
	                    events.compositionend = closeComposition
	                }
	                if (!msie) {

	                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
	                    //如果当前浏览器支持Int8Array,那么我们就不需要以下这些事件来打补丁了
	                    if (!/\[native code\]/.test(window.Int8Array)) {
	                        events.keydown = updateModelKeyDown //safari < 5 opera < 11
	                        events.paste = updateModelDelay//safari < 5
	                        events.cut = updateModelDelay//safari < 5 
	                        if (window.netscape) {
	                            // Firefox <= 3.6 doesn't fire the 'input' event when text is filled in through autocomplete
	                            events.DOMAutoComplete = updateModel
	                        }
	                    }
	                }
	            }
	            break
	    }

	    if (/password|text/.test(vnode.props.type)) {
	        events.focus = openCaret //判定是否使用光标修正功能 
	        events.blur = closeCaret
	        data.getCaret = getCaret
	        data.setCaret = setCaret
	    }

	    for (var name in events) {
	        avalon.bind(node, name, events[name])
	    }
	}


	function updateModelHack(e) {
	    if (e.propertyName === 'value') {
	        updateModel.call(this, e)
	    }
	}

	function updateModelDelay(e) {
	    var elem = this
	    setTimeout(function () {
	        updateModel.call(elem, e)
	    }, 0)
	}


	function openCaret() {
	    this.caret = true
	}

	function closeCaret() {
	    this.caret = false
	}
	function openComposition() {
	    this.composing = true
	}

	function closeComposition(e) {
	    this.composing = false
	    updateModelDelay.call(this, e)
	}

	function updateModelKeyDown(e) {
	    var key = e.keyCode
	    // ignore
	    //    command            modifiers                   arrows
	    if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40))
	        return
	    updateModel.call(this, e)
	}

	markID(openCaret)
	markID(closeCaret)
	markID(openComposition)
	markID(closeComposition)
	markID(updateModel)
	markID(updateModelHack)
	markID(updateModelDelay)
	markID(updateModelKeyDown)

	//IE6-8要处理光标时需要异步
	var mayBeAsync = function (fn) {
	    setTimeout(fn, 0)
	}
	var setCaret = function (target, cursorPosition) {
	    var range
	    if (target.createTextRange) {
	        mayBeAsync(function () {
	            target.focus()
	            range = target.createTextRange()
	            range.collapse(true)
	            range.moveEnd('character', cursorPosition)
	            range.moveStart('character', cursorPosition)
	            range.select()
	        })
	    } else {
	        target.focus()
	        if (target.selectionStart !== undefined) {
	            target.setSelectionRange(cursorPosition, cursorPosition)
	        }
	    }
	}

	var getCaret = function (target) {
	    var start = 0
	    var normalizedValue
	    var range
	    var textInputRange
	    var len
	    var endRange

	    if (typeof target.selectionStart == "number" && typeof target.selectionEnd == "number") {
	        start = target.selectionStart
	    } else {
	        range = document.selection.createRange()

	        if (range && range.parentElement() == target) {
	            len = target.value.length
	            normalizedValue = target.value.replace(/\r\n/g, "\n")

	            textInputRange = target.createTextRange()
	            textInputRange.moveToBookmark(range.getBookmark())

	            endRange = target.createTextRange()
	            endRange.collapse(false)

	            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
	                start = len
	            } else {
	                start = -textInputRange.moveStart("character", -len)
	                start += normalizedValue.slice(0, start).split("\n").length - 1
	            }
	        }
	    }

	    return start
	}

	module.exports = updateModelByEvent

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var updateModelMethods = __webpack_require__(53)

	function updateModelHandle(e) {
	    var elem = this
	    var field = this.__ms_duplex__
	    if (elem.composing || field.parse(elem.value) === field.lastViewValue){
	        //防止onpropertychange引发爆栈
	        return
	    }
	   if (elem.caret) {
	        try {
	            var pos = field.getCaret(elem)
	            field.pos = pos
	        } catch (e) {
	            avalon.warn('fixCaret error', e)
	        }
	    }
	    if (field.debounceTime > 4) {
	        var timestamp = new Date()
	        var left = timestamp - field.time || 0
	        field.time = timestamp
	        if (left >= field.debounceTime) {
	            updateModelMethods[field.type].call(field)
	        } else {
	            clearTimeout(field.debounceID)
	            field.debounceID = setTimeout(function () {
	                updateModelMethods[field.type].call(field)
	            }, left)
	        }
	    } else {
	        updateModelMethods[field.type].call(field)
	    }
	}

	module.exports = updateModelHandle

/***/ },
/* 53 */
/***/ function(module, exports) {

	var updateModelMethods = {
	    input: function (prop) {//处理单个value值处理
	        var data = this
	        prop = prop || 'value'
	        var dom = data.dom
	        var rawValue = dom[prop]
	        var parsedValue = data.parse(rawValue)
	        var formatedValue = data.format(data.vmodel, parsedValue)
	        data.lastViewValue = formatedValue
	        //有时候parse后一致,vm不会改变,但input里面的值
	        if (parsedValue !== data.modelValue) {
	            data.set(data.vmodel, parsedValue)
	            callback(data)
	        }
	       
	        dom[prop] = formatedValue
	      
	        var pos = data.pos
	        if (dom.caret ) {
	            data.setCaret(dom, pos)
	         }
	        //vm.aaa = '1234567890'
	        //处理 <input ms-duplex='@aaa|limitBy(8)'/>{{@aaa}} 这种格式化同步不一致的情况 

	    },
	    radio: function () {
	        var data = this
	        if (data.isChecked) {
	            var val = !data.modelValue
	            data.set(data.vmodel, val)
	            callback(data)
	        } else {
	            updateModelMethods.input.call(data)
	            data.lastViewValue = NaN
	        }
	    },
	    checkbox: function () {
	        var data = this
	        var array = data.modelValue
	        if (!Array.isArray(array)) {
	            avalon.warn('ms-duplex应用于checkbox上要对应一个数组')
	            array = [array]
	        }
	        var method = data.dom.checked ? 'ensure' : 'remove'
	        
	        if (array[method]) {
	            var val = data.parse(data.dom.value)
	            array[method](val)
	            callback(data)
	        }

	    },
	    select: function () {
	        var data = this
	        var val = avalon(data.dom).val() //字符串或字符串数组
	        if (val + '' !== this.modelValue + '') {
	            if (Array.isArray(val)) { //转换布尔数组或其他
	                val = val.map(function (v) {
	                    return data.parse(v)
	                })
	            } else {
	                val = data.parse(val)
	            }
	            data.set(data.vmodel, val)
	            callback(data)
	        }
	    },
	    contenteditable: function () {
	        updateModelMethods.input.call(this, 'innerHTML')
	    }
	}

	function callback(data) {
	    if (data.callback) {
	        data.callback.call(data.vmodel, {
	            type: 'changed',
	            target: data.dom
	        })
	    }
	}



	module.exports = updateModelMethods


/***/ },
/* 54 */
/***/ function(module, exports) {

	var valueHijack = false
	try { //#272 IE9-IE11, firefox
	    var setters = {}
	    var aproto = HTMLInputElement.prototype
	    var bproto = HTMLTextAreaElement.prototype
	    function newSetter(value) { // jshint ignore:line
	        setters[this.tagName].call(this, value)
	        if (!this.caret && this.__ms_duplex__) {
	            this.__ms_duplex__.update.call(this)
	        }
	    }
	    var inputProto = HTMLInputElement.prototype
	    Object.getOwnPropertyNames(inputProto) //故意引发IE6-8等浏览器报错
	    setters['INPUT'] = Object.getOwnPropertyDescriptor(aproto, 'value').set

	    Object.defineProperty(aproto, 'value', {
	        set: newSetter
	    })
	    setters['TEXTAREA'] = Object.getOwnPropertyDescriptor(bproto, 'value').set
	    Object.defineProperty(bproto, 'value', {
	        set: newSetter
	    })
	    valueHijack = true
	} catch (e) {
	    //在chrome 43中 ms-duplex终于不需要使用定时器实现双向绑定了
	    // http://updates.html5rocks.com/2015/04/DOM-attributes-now-on-the-prototype
	    // https://docs.google.com/document/d/1jwA8mtClwxI-QJuHT7872Z0pxpZz8PBkf2bGAbsUtqs/edit?pli=1
	}
	module.exports = valueHijack

/***/ },
/* 55 */
/***/ function(module, exports) {

	
	var updateView = {
	    input: function () {//处理单个value值处理
	        this.dom.value = this.viewValue
	    },
	    radio: function () {//处理单个checked属性
	        var checked
	        if (this.isChecked) {
	            checked = !!this.modelValue
	        } else {
	            checked = this.viewValue + '' === this.dom.value
	        }
	        var dom = this.dom
	        if (avalon.msie === 6) {
	            setTimeout(function () {
	                //IE8 checkbox, radio是使用defaultChecked控制选中状态，
	                //并且要先设置defaultChecked后设置checked
	                //并且必须设置延迟
	                dom.defaultChecked = checked
	                dom.checked = checked
	            }, 31)
	        } else {
	            dom.checked = checked
	        }
	    },
	    checkbox: function () {//处理多个checked属性
	        var checked = false
	        var dom = this.dom
	        var value = dom.value
	        for (var i = 0; i < this.modelValue.length; i++) {
	            var el = this.modelValue[i]
	            if (el + '' === value) {
	                checked = true
	            }
	        }
	        dom.checked = checked
	    },
	    select: function () {//处理子级的selected属性
	        var a = Array.isArray(this.viewValue) ?
	                this.viewValue.map(String) : this.viewValue + ''
	        avalon(this.dom).val(a)
	    },
	    contenteditable: function () {//处理单个innerHTML
	        this.dom.innerHTML = this.viewValue
	        this.update.call(this.dom)
	    }
	}

	module.exports = updateView


/***/ },
/* 56 */
/***/ function(module, exports) {

	
	module.exports = function addField(node, vnode) {
	    var field = node.__ms_duplex__
	    var rules = vnode['ms-rules']
	    if (rules && !field.validator) {
	        while (node && node.nodeType === 1) {
	            var validator = node._ms_validator_
	            if (validator) {
	                field.rules = rules
	                field.validator = validator
	                if(avalon.Array.ensure(validator.fields, field)){
	                    validator.addField(field)
	                }
	                break
	            }
	            node = node.parentNode
	        }
	    }
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(37)

	var dir = avalon.directive('validate', {
	//验证单个表单元素
	    diff: function (copy, src, name) {
	        var validator = copy[name]
	        var p = src[name]
	        if (p && p.onError && p.addField) {
	            return
	        } else if (Object(validator) === validator) {
	            src.vmValidator = validator
	            if (validator.$id) {//转换为普通对象
	                validator = validator.$model
	            }
	           
	            src[name] = validator
	            for (var name in dir.defaults) {
	                if (!validator.hasOwnProperty(name)) {
	                    validator[name] = dir.defaults[name]
	                }
	            }
	            validator.fields = validator.fields || []
	            update(src, this.update)

	        }
	    },
	    update: function (dom, vdom) {
	        var validator = vdom['ms-validate']
	        dom._ms_validator_ = validator
	        validator.dom = dom
	        var v = vdom.vmValidator 
	        try{
	           v.onManual = onManual
	        }catch(e){}
	        delete vdom.vmValidator 
	        dom.setAttribute("novalidate", "novalidate")
	        function onManual() {
	            dir.validateAll.call(validator, validator.onValidateAll)
	        }
	        if (validator.validateAllInSubmit) {
	            avalon.bind(dom, "submit", function (e) {
	                e.preventDefault()
	                onManual()
	            })
	        }
	       
	        if (typeof validator.onInit === "function") { //vmodels是不包括vmodel的
	            validator.onInit.call(dom, {
	                type: 'init',
	                target: dom,
	                validator: validator
	            })
	        }
	    },
	    validateAll: function (callback) {
	        var validator = this
	        var fn = typeof callback === "function" ? callback : validator.onValidateAll
	        var promise = validator.fields.filter(function (field) {
	            var el = field.dom
	            return el && !el.disabled && validator.dom.contains(el)
	        }).map(function (field) {
	            return dir.validate(field, true)
	        })
	        var reasons = []
	        Promise.all(promise).then(function (array) {
	            for (var i = 0, el; el = array[i++]; ) {
	                reasons = reasons.concat(el)
	            }
	            if (validator.deduplicateInValidateAll) {
	                var uniq = {}
	                reasons = reasons.filter(function (field) {
	                    var el = field.dom
	                    var uuid = el.uniqueID || (el.uniqueID = setTimeout("1"))
	                    if (uniq[uuid]) {
	                        return false
	                    } else {
	                        uniq[uuid] = true
	                        return true
	                    }
	                })
	            }
	            fn.call(validator.dom, reasons) //这里只放置未通过验证的组件
	        })
	    },
	    addField: function (field) {
	        var validator = this
	        var node = field.dom
	        if (validator.validateInKeyup && (!field.isChanged && !field.debounceTime)) {
	            avalon.bind(node, 'keyup', function (e) {
	                dir.validate(field, 0, e)
	            })
	        }
	        if (validator.validateInBlur) {
	            avalon.bind(node, 'blur', function (e) {
	                dir.validate(field, 0, e)
	            })
	        }
	        if (validator.resetInFocus) {
	            avalon.bind(node, 'focus', function (e) {
	                validator.onReset.call(node, e, field)
	            })
	        }
	    },
	    validate: function (field, isValidateAll, event) {
	        var promises = []
	        var value = field.modelValue
	        var elem = field.dom
	        var validator = field.validator
	        if (elem.disabled)
	            return
	        for (var ruleName in field.rules) {
	            var ruleValue = field.rules[ruleName]
	            if (ruleValue === false)
	                continue
	            var hook = avalon.validators[ruleName]
	            var resolve, reject
	            promises.push(new Promise(function (a, b) {
	                resolve = a
	                reject = b
	            }))
	            var next = function (a) {
	                if (field.norequired && value === "") {
	                    a = true
	                }
	                if (a) {
	                    resolve(true)
	                } else {
	                    var reason = {
	                        element: elem,
	                        data: field.data,
	                        message: elem.getAttribute("data-" + ruleName + "-message") || elem.getAttribute("data-message") || hook.message,
	                        validateRule: ruleName,
	                        getMessage: getMessage
	                    }
	                    resolve(reason)
	                }
	            }
	            field.data = {}
	            field.data[ruleName] = ruleValue
	            hook.get(value, field, next)
	        }
	        var reasons = []
	        //如果promises不为空，说明经过验证拦截器
	        var lastPromise = Promise.all(promises).then(function (array) {
	            for (var i = 0, el; el = array[i++]; ) {
	                if (typeof el === "object") {
	                    reasons.push(el)
	                }
	            }
	            if (!isValidateAll) {
	                if (reasons.length) {
	                    validator.onError.call(elem, reasons, event)
	                } else {
	                    validator.onSuccess.call(elem, reasons, event)
	                }
	                validator.onComplete.call(elem, reasons, event)
	            }
	            return reasons
	        })
	        return lastPromise
	    }
	})

	var rformat = /\\?{{([^{}]+)\}}/gm

	function getMessage() {
	    var data = this.data || {}
	    return this.message.replace(rformat, function (_, name) {
	        return data[name] == null ? "" : data[name]
	    })
	}
	dir.defaults = {
	    addField: dir.addField,//供内部使用,收集此元素底下的所有ms-duplex的域对象
	    onError: avalon.noop,
	    onSuccess: avalon.noop,
	    onComplete: avalon.noop,
	    onManual: avalon.noop,
	    onReset: avalon.noop,
	    onValidateAll: avalon.noop,
	    validateInBlur: true, //@config {Boolean} true，在blur事件中进行验证,触发onSuccess, onError, onComplete回调
	    validateInKeyup: true, //@config {Boolean} true，在keyup事件中进行验证,触发onSuccess, onError, onComplete回调
	    validateAllInSubmit: true, //@config {Boolean} true，在submit事件中执行onValidateAll回调
	    resetInFocus: true, //@config {Boolean} true，在focus事件中执行onReset回调,
	    deduplicateInValidateAll: false //@config {Boolean} false，在validateAll回调中对reason数组根据元素节点进行去重
	}

/***/ },
/* 58 */
/***/ function(module, exports) {

	avalon.directive('rules', {
	    parse: function (copy, src, binding) {
	        var rules = binding.expr
	        if (/{.+}/.test(rules)) {
	            copy[binding.name] = avalon.parseExpr(binding)
	        }
	    },
	    diff: function (copy, src, name) {
	        src[name] = copy[name]
	        var field = src.dom && src.dom.__ms_duplex__
	        if (field) {
	            field.rules = copy[name]
	        }
	    }
	})
	function isRegExp(value) {
	    return avalon.type(value) === 'regexp'
	}
	var rmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i
	var rurl = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
	function isCorrectDate(value) {
	    if (typeof value === "string" && value) { //是字符串但不能是空字符
	        var arr = value.split("-") //可以被-切成3份，并且第1个是4个字符
	        if (arr.length === 3 && arr[0].length === 4) {
	            var year = ~~arr[0] //全部转换为非负整数
	            var month = ~~arr[1] - 1
	            var date = ~~arr[2]
	            var d = new Date(year, month, date)
	            return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date
	        }
	    }
	    return false
	}
	avalon.shadowCopy(avalon.validators, {
	    pattern: {
	        message: '必须匹配{{pattern}}这样的格式',
	        get: function (value, field, next) {
	            var elem = field.element
	            var data = field.data
	            if (!isRegExp(data.pattern)) {
	                var h5pattern = elem.getAttribute("pattern")
	                data.pattern = new RegExp('^(?:' + h5pattern + ')$')
	            }
	            next(data.pattern.test(value))
	            return value
	        }
	    },
	    digits: {
	        message: '必须整数',
	        get: function (value, field, next) {//整数
	            next(/^\-?\d+$/.test(value))
	            return value
	        }
	    },
	    number: {
	        message: '必须数字',
	        get: function (value, field, next) {//数值
	            next(isFinite(value))
	            return value
	        }
	    },
	    required: {
	        message: '必须填写',
	        get: function (value, field, next) {
	            next(value !== "")
	            return value
	        }
	    },
	    equalto: {
	        message: '密码输入不一致',
	        get: function (value, field, next) {
	            var id = String(field.data.equalto)
	            var other = avalon(document.getElementById(id)).val() || ""
	            next(value === other)
	            return value
	        }
	    },
	    date: {
	        message: '日期格式不正确',
	        get: function (value, field, next) {
	            var data = field.data
	            if (avalon.type(data.date) === 'regexp') {
	                next(data.date.test(value))
	            } else {
	                next(isCorrectDate(value))
	            }
	            return value
	        }
	    },
	    url: {
	        message: 'URL格式不正确',
	        get: function (value, field, next) {
	            next(rurl.test(value))
	            return value
	        }
	    },
	    email: {
	        message: 'email格式不正确',
	        get: function (value, field, next) {
	            next(rmail.test(value))
	            return value
	        }
	    },
	    minlength: {
	        message: '最少输入{{minlength}}个字',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.minlength, 10)
	            next(value.length >= num)
	            return value
	        }
	    },
	    maxlength: {
	        message: '最多输入{{maxlength}}个字',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.maxlength, 10)
	            next(value.length <= num)
	            return value
	        }
	    },
	    min: {
	        message: '输入值不能小于{{min}}',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.min, 10)
	            next(parseFloat(value) >= num)
	            return value
	        }
	    },
	    max: {
	        message: '输入值不能大于{{max}}',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.max, 10)
	            next(parseFloat(value) <= num)
	            return value
	        }
	    },
	    chs: {
	        message: '必须是中文字符',
	        get: function (value, field, next) {
	            next(/^[\u4e00-\u9fa5]+$/.test(value))
	            return value
	        }
	    }
	})

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(37)
	//ms-imporant ms-controller ms-for ms-widget ms-effect ms-if   ...
	avalon.directive('if', {
	    priority: 6,
	    diff: function (copy, src, name) {
	        var cur = !!copy[name]
	        var old = src[name]
	        src[name] = cur
	        if (src.execIf) {
	            if (!cur) {
	                copy.nodeType = 8
	                copy.order = '' //不再执行子孙节点的操作
	            }
	            if (copy === src || cur !== old) {
	                update(src, this.update)
	            }
	        } else {
	            update(src, this.update, 'afterChange')
	        }
	    },
	    update: function (dom, vdom, parent) {
	        var show = vdom['ms-if']
	        vdom.execIf = true
	        if (show) {
	            //要移除元素节点,在对应位置上插入注释节点
	            vdom.nodeType = 1
	            vdom.nodeValue = null
	            var comment = vdom.comment
	            if (!comment) {
	                return
	            }
	            parent = comment.parentNode
	            parent.replaceChild(dom, comment)
	            avalon.applyEffect(dom, vdom, {
	                hook: 'onEnterDone'
	            })
	        } else {
	            avalon.applyEffect(dom, vdom, {
	                hook: 'onLeaveDone',
	                cb: function () {
	                    var comment = document.createComment('ms-if')
	                    //去掉注释节点临时添加的ms-effect
	                    //https://github.com/RubyLouvre/avalon/issues/1577
	                    //这里必须设置nodeValue为ms-if,否则会在节点对齐算法中出现乱删节点的BUG
	                    parent = parent || dom.parentNode
	                    vdom.nodeValue = 'ms-if'
	                    parent.replaceChild(comment, dom)
	                    vdom.nodeType = 8
	                    vdom.comment = comment
	                }
	            })
	        }
	    }
	})



/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(37)

	var rforPrefix = /ms-for\:\s*/
	var rforLeft = /^\s*\(\s*/
	var rforRight = /\s*\)\s*$/
	var rforSplit = /\s*,\s*/
	var rforAs = /\s+as\s+([$\w]+)/
	var rident = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
	var rinvalid = /^(null|undefined|NaN|window|this|\$index|\$id)$/
	var reconcile = __webpack_require__(39)
	var stringify = __webpack_require__(50)

	//var Cache = require('../seed/cache')
	//var cache = new Cache(312)


	function getTraceKey(item) {
	    var type = typeof item
	    return item && type === 'object' ? item.$hashcode : type + ':' + item
	}
	//IE6-8,function后面没有空格
	var rfunction = /^\s*function\s*\(([^\)]+)\)/
	avalon._each = function (obj, fn, local, vnodes) {
	    var repeat = []
	    vnodes.push(repeat)
	    var str = (fn + "").match(rfunction)
	    var args = str[1]
	    var arr = args.match(avalon.rword)
	    if (Array.isArray(obj)) {
	        for (var i = 0; i < obj.length; i++) {
	            iterator(i, obj[i], local, fn, arr[0], arr[1], repeat, true)
	        }
	    } else {
	        for (var i in obj) {
	            if (obj.hasOwnProperty(i)) {
	                iterator(i, obj[i], local, fn, arr[0], arr[1], repeat)
	            }
	        }
	    }
	}

	function iterator(index, item, vars, fn, k1, k2, repeat, isArray) {
	    var key = isArray ? getTraceKey(item) : index
	    var local = {}
	    local[k1] = index
	    local[k2] = item
	    for (var k in vars) {
	        if (!(k in local)) {
	            local[k] = vars[k]
	        }
	    }
	    fn(index, item, key, local, repeat)
	}


	avalon.directive('for', {
	    priority: 3,
	    parse: function (copy, src, binding) {
	        var str = src.nodeValue, aliasAs
	        str = str.replace(rforAs, function (a, b) {
	            if (!rident.test(b) || rinvalid.test(b)) {
	                avalon.error('alias ' + b + ' is invalid --- must be a valid JS identifier which is not a reserved name.')
	            } else {
	                aliasAs = b
	            }
	            return ''
	        })

	        var arr = str.replace(rforPrefix, '').split(' in ')
	        var assign = 'var loop = ' + avalon.parseExpr(arr[1]) + ' \n'
	        var alias = aliasAs ? 'var ' + aliasAs + ' = loop\n' : ''
	        var kv = arr[0].replace(rforLeft, '').replace(rforRight, '').split(rforSplit)

	        if (kv.length === 1) {//确保avalon._each的回调有三个参数
	            kv.unshift('$key')
	        }
	        kv.push('traceKey')
	        kv.push('__local__')
	        kv.push('vnodes')
	        src.$append = assign + alias + 'avalon._each(loop,function('
	                + kv.join(', ') + '){\n'
	                + (aliasAs ? '__local__[' + avalon.quote(aliasAs) + ']=loop\n' : '')

	    },
	    diff: function (copy, src, cpList, spList, index) {
	        //将curRepeat转换成一个个可以比较的component,并求得compareText
	        var preRepeat = spList[index + 1]
	        var curPepeat = cpList[index + 1]
	        var end = spList[index + 2]
	        //preRepeat不为空时
	        src.preRepeat = preRepeat
	        var cache = src.cache

	        if (cache && src === copy) {
	            return
	        }
	        //将循环区域转换为一个个组件
	        var coms = prepareCompare(curPepeat, copy)
	        if (cache && src.compareText === copy.compareText) {
	            //如果个数与key一致,那么说明此数组没有发生排序,立即返回
	            return
	        }


	        src.compareText = copy.compareText
	        //for指令只做添加删除操作

	        var i, c, p
	        var removes = []
	        if (!preRepeat.length) {//一维数组最开始初始化时
	            /* eslint-disable no-cond-assign */
	            cache = {}
	            src.coms = coms
	            spList[index + 1] = curPepeat
	            for (i = 0; c = coms[i]; i++) {
	                c.action = 'enter'
	                saveInCache(cache, c)
	            }

	            src.cache = cache
	            /* eslint-enable no-cond-assign */
	        } else if (!cache) {//二维数组最开始初始化时
	            var cache = {}
	            src.coms = coms
	            for (i = 0; i < coms.length; i++) {
	                saveInCache(cache, coms[i])
	            }
	            src.cache = cache
	            return
	        } else {
	            var newCache = {}
	            /* eslint-disable no-cond-assign */
	            var fuzzy = []
	            for (i = 0; c = coms[i++]; ) {
	                var p = isInCache(cache, c.key)
	                if (p) {
	                    p.action = 'move'
	                    p.oldIndex = p.index
	                    p.index = c.index
	                    saveInCache(newCache, p)
	                } else {
	                    //如果找不到就进行模糊搜索
	                    fuzzy.push(c)
	                }

	            }
	            if (!src.coms) {
	                src.coms = prepareCompare(preRepeat, src)
	            }
	            for (var i = 0, c; c = fuzzy[i++]; ) {
	                p = fuzzyMatchCache(cache, c.key)
	                if (p) {
	                    p.action = 'move'
	                    p.oldIndex = p.index
	                    p.index = c.index
	                } else {
	                    p = c
	                    p.action = 'enter'
	                    src.coms.push(p)
	                }
	                saveInCache(newCache, p)
	            }
	            src.coms.sort(function (a, b) {
	                return a.index - b.index
	            })

	            /* eslint-enable no-cond-assign */
	            src.cache = newCache
	            for (var i in cache) {
	                p = cache[i]
	                p.action = 'leave'
	                removes.push(p)
	                if (p.arr) {
	                    p.arr.forEach(function (m) {
	                        m.action = 'leave'
	                        removes.push(m)
	                    })
	                    delete p.arr
	                }
	            }

	        }
	        src.removes = removes
	        var cb = avalon.caches[src.wid]
	        var vm = copy.vmodel
	        if (end && cb) {
	            end.afterChange = [function (dom) {
	                    cb.call(vm, {
	                        type: 'rendered',
	                        target: dom,
	                        signature: src.signature
	                    })
	                }]
	        }

	        update(src, this.update)
	        return true

	    },
	    update: function (dom, vdom, parent) {
	        var key = vdom.signature
	        var range = getEndRepeat(dom)
	        var doms = range.slice(1, -1)//
	        range.pop()
	        var DOMs = splitDOMs(doms, key)

	        for (var i = 0, el; el = vdom.removes[i++]; ) {
	            var removeNodes = DOMs[el.index]
	            if (removeNodes) {
	                removeNodes.forEach(function (n, k) {
	                    if (n.parentNode) {
	                        avalon.applyEffect(n, el.children[k], {
	                            hook: 'onLeaveDone',
	                            cb: function () {
	                                n.parentNode.removeChild(n)
	                            },
	                            staggerKey: key + 'leave'
	                        })
	                    }
	                })
	                el.children.length = 0
	            }
	        }
	        vdom.removes = []
	        var insertPoint = dom
	        var fragment = avalon.avalonFragment
	        var domTemplate
	        var keep = []

	        for (var i = 0; i < vdom.coms.length; i++) {
	            var com = vdom.coms[i]
	            var children = com.children

	            if (com.action === 'leave') {
	                continue
	            }

	            keep.push(com)
	            if (com.action === 'enter') {
	//                if (!domTemplate) {
	//                    //创建用于拷贝的数据,包括虚拟DOM与真实DOM 
	//                  domTemplate = avalon.vdomAdaptor(children, 'toDOM')
	//                }
	//                var newFragment = domTemplate.cloneNode(true)
	                var newFragment = avalon.vdomAdaptor(children, 'toDOM')
	                var cnodes = avalon.slice(newFragment.childNodes)
	                reconcile(cnodes, children, parent)//关联新的虚拟DOM与真实DOM
	                parent.insertBefore(newFragment, insertPoint.nextSibling)
	                applyEffects(cnodes, children, {
	                    hook: 'onEnterDone',
	                    staggerKey: key + 'enter'
	                })
	            } else if (com.action === 'move') {

	                var cnodes = DOMs[com.oldIndex] || []
	                if (com.index !== com.oldIndex) {
	                    var moveFragment = fragment.cloneNode(false)
	                    for (var k = 0, cc; cc = cnodes[k++]; ) {
	                        moveFragment.appendChild(cc)
	                    }
	                    parent.insertBefore(moveFragment, insertPoint.nextSibling)
	                    // reconcile(cnodes, children, parent)
	                    applyEffects(cnodes, children, {
	                        hook: 'onMoveDone',
	                        staggerKey: key + 'move'
	                    })
	                }
	            }

	            insertPoint = cnodes[cnodes.length - 1]

	            if (!insertPoint) {
	                break
	            }
	        }

	        vdom.preRepeat.length = 0
	        vdom.coms.length = 0
	        keep.forEach(function (el) {
	            vdom.coms.push(el)
	            range.push.apply(vdom.preRepeat, el.children)
	        })

	    }

	})

	function isEmptyObject(a) {
	    for (var i in a) {
	        return false
	    }
	    return true
	}
	function splitDOMs(nodes, signature) {
	    var items = []
	    var item = []
	    for (var i = 0, el; el = nodes[i++]; ) {
	        if (el.nodeType === 8 && el.nodeValue === signature) {
	            item.push(el)
	            items.push(item)
	            item = []
	        } else {
	            item.push(el)
	        }
	    }
	    return items
	}

	//将要循环的节点根据锚点元素再分成一个个更大的单元,用于diff
	function prepareCompare(nodes, cur) {
	    var splitText = cur.signature
	    var items = []
	    var keys = []
	    var com = {
	        children: []
	    }

	    for (var i = 0, el; el = nodes[i]; i++) {
	        if (el.nodeType === 8 && el.nodeValue === splitText) {
	            com.children.push(el)
	            com.key = el.key
	            keys.push(el.key)
	            com.index = items.length
	            items.push(com)
	            com = {
	                children: []
	            }
	        } else {
	            com.children.push(el)
	        }
	    }

	    cur.compareText = keys.length + '|' + keys.join(';;')
	    return items
	}


	function getEndRepeat(node) {
	    var isBreak = 0, ret = []
	    while (node) {
	        if (node.nodeType === 8) {
	            if (node.nodeValue.indexOf('ms-for:') === 0) {
	                ++isBreak
	            } else if (node.nodeValue.indexOf('ms-for-end:') === 0) {
	                --isBreak
	            }
	        }
	        ret.push(node)
	        node = node.nextSibling
	        if (isBreak === 0) {
	            break
	        }
	    }
	    return ret
	}


	var rfuzzy = /^(string|number|boolean)/
	var rkfuzzy = /^_*(string|number|boolean)/
	function fuzzyMatchCache(cache, id) {
	    var m = id.match(rfuzzy)
	    if (m) {
	        var fid = m[1]
	        for (var i in cache) {
	            var n = i.match(rkfuzzy)
	            if (n && n[1] === fid) {
	                return isInCache(cache, i)
	            }
	        }
	    }
	}

	// 新位置: 旧位置
	function isInCache(cache, id) {
	    var c = cache[id]
	    if (c) {
	        var arr = c.arr
	        if (arr) {
	            var r = arr.pop()
	            if (!arr.length) {
	                c.arr = 0
	            }
	            return r
	        }
	        delete cache[id]
	        return c
	    }
	}
	//[1,1,1] number1 number1_ number1__
	function saveInCache(cache, component) {
	    var trackId = component.key
	    if (!cache[trackId]) {
	        cache[trackId] = component
	    } else {
	        var c = cache[trackId]
	        var arr = c.arr || (c.arr = [])
	        arr.push(component)
	    }
	}
	var applyEffects = function (nodes, vnodes, opts) {
	    vnodes.forEach(function (el, i) {
	        avalon.applyEffect(nodes[i], vnodes[i], opts)
	    })
	}



/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(37)
	var reconcile = __webpack_require__(39)
	var tryInitComponent = __webpack_require__(62)

	avalon.component = function (name, definition) {
	    //这是定义组件的分支,并将列队中的同类型对象移除
	    if (!avalon.components[name]) {
	        avalon.components[name] = definition
	    }//这里没有返回值
	}
	avalon.directive('widget', {
	    priority: 4,
	    parse: function (copy, src, binding) {
	        src.props.wid = src.props.wid || avalon.makeHashCode('w')
	        //将渲染函数的某一部分存起来,渲在c方法中转换为函数
	        copy[binding.name] = avalon.parseExpr(binding)
	        copy.template = src.template
	        copy.vmodel = '__vmodel__'
	        copy.local = '__local__'
	    },
	    define: function () {
	        return avalon.mediatorFactory.apply(this, arguments)
	    },
	    diff: function (copy, src, name, copyList, srcList, index) {
	        var a = copy[name]

	        if (Object(a) === a) {
	            //有三个地方可以设置is, 属性,标签名,配置对象

	            var is = src.props.is || (/^ms\-/.test(src.type) ? src.type : 0)

	            if (!is) {//开始大费周章地获取组件的类型
	                a = a.$model || a//安全的遍历VBscript
	                if (Array.isArray(a)) {//转换成对象
	                    a.unshift({})// 防止污染旧数据
	                    avalon.mix.apply(0, a)
	                    a = a.shift()
	                }
	                is = a.is
	            }
	            var vmName = 'component-vm:' + is

	            src.props.is = is
	            src.vmodel = copy.vmodel
	            //如果组件没有初始化,那么先初始化(生成对应的vm,$render)
	            if (!src[vmName]) {
	                if (!tryInitComponent(src, copy[name], copy.local, copy.template)) {
	                    //替换成注释节点
	                    src.nodeType = 8
	                    src.nodeValue = 'unresolved component placeholder'
	                    copyList[index] = src

	                    update(src, this.mountComment)
	                    return
	                }
	            }

	            //如果已经存在于avalon.scopes
	            var comVm = src[vmName]
	            var scope = avalon.scopes[comVm.$id]
	            if (scope && scope.vmodel) {
	                var com = scope.vmodel.$element
	                if (src.dom !== com) {
	                    var component = com.vtree[0]
	                    srcList[index] = copyList[index] = component
	                    src.com = com
	                    if (!component.skipContent) {
	                        component.skipContent = 'optimize'
	                    }
	                    update(src, this.replaceCachedComponent)
	                    update(component, function () {
	                        if (component.skipContent === 'optimize') {
	                            component.skipContent = true
	                        }
	                    }, 'afterChange')
	                    return
	                }
	            }
	            var render = comVm.$render
	            var tree = render(comVm, copy.local)
	            var component = tree[0]
	            if (component && isComponentReady(component)) {
	                component.local = copy.local
	                src.dynamic = true
	                Array(
	                        vmName,
	                        'component-html:' + is,
	                        'component-ready:' + is,
	                        'dom', 'dynamic'
	                        ).forEach(function (name) {
	                    component[name] = src[name]
	                })
	                component.vmodel = comVm
	                copyList[index] = component
	                if (src.nodeType === 8 && src.comment) {
	                    component.dom = src.comment
	                    src.type = '#comment'
	                }
	                if (src.type !== component.type) {
	                    srcList[index] = component
	                    update(component, this.mountComponent)
	                } else {
	                    update(src, this.updateComponent)
	                }
	            } else {
	                src.nodeType = 8
	                src.nodeValue = 'unresolved component placeholder'
	                copyList[index] = src
	                update(src, this.mountComment)
	            }
	        } else {
	            if (src.props.is === copy.props.is) {
	                update(src, this.updateComponent)
	            }
	        }
	    },
	    replaceCachedComponent: function (dom, vdom, parent) {
	        var com = vdom.com
	        parent.replaceChild(com, dom)
	        delete vdom.com
	    },
	    mountComment: function (dom, vdom, parent) {
	        var comment = document.createComment(vdom.nodeValue)
	        vdom.dom = comment
	        parent.replaceChild(comment, dom)
	    },
	    updateComponent: function (dom, vdom) {
	        var vm = vdom["component-vm:" + vdom.props.is]
	        var viewChangeObservers = vm.$events.onViewChange
	        if (viewChangeObservers && viewChangeObservers.length) {
	            update(vdom, viewChangeHandle, 'afterChange')
	        }
	    },
	    mountComponent: function (dom, vdom, parent) {
	        var com = avalon.vdomAdaptor(vdom, 'toDOM')
	        var is = vdom.props.is
	        var vm = vdom['component-vm:' + is]
	        vm.$fire('onInit', {
	            type: 'init',
	            vmodel: vm,
	            is: is
	        })
	        reconcile([com], [vdom])
	        parent.replaceChild(com, dom)
	        vdom.dom = vm.$element = com
	        com.vtree = [vdom]
	        avalon.onComponentDispose(com)
	        vdom['component-ready:' + is] = true
	        //--------------
	        avalon.scopes[vm.$id] = {
	            vmodel: vm,
	            top: vdom.vmodel,
	            local: vdom.local
	        }
	        //--------------
	        update(vdom, function () {
	            vm.$fire('onReady', {
	                type: 'ready',
	                target: com,
	                vmodel: vm,
	                is: is
	            })
	        }, 'afterChange')

	        update(vdom, function () {
	            vdom[ 'component-html:' + is] = avalon.vdomAdaptor(vdom, 'toHTML')
	        }, 'afterChange')
	    }
	})



	function viewChangeHandle(dom, vdom) {
	    var is = vdom.props.is
	    var vm = vdom['component-vm:' + is]
	    var html = 'component-html:' + is
	    var preHTML = vdom[html]
	    var curHTML = avalon.vdomAdaptor(vdom, 'toHTML')
	    if (preHTML !== curHTML) {
	        vdom[html] = curHTML
	        vm.$fire('onViewChange', {
	            type: 'viewchange',
	            target: dom,
	            vmodel: vm,
	            is: is
	        })
	    }
	}



	function isComponentReady(vnode) {
	    var isReady = true
	    try {
	        hasUnresolvedComponent(vnode)
	    } catch (e) {
	        isReady = false
	    }
	    return isReady
	}

	function hasUnresolvedComponent(vnode) {
	    vnode.children.forEach(function (el) {
	        if (el.nodeType === 8) {
	            if (el.nodeValue === 'unresolved component placeholder') {
	                throw 'unresolved'
	            }
	        } else if (el.children) {
	            hasUnresolvedComponent(el)
	        }
	    })
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var skipArray = __webpack_require__(63)

	var legalTags = {wbr: 1, xmp: 1, template: 1}
	var events = 'onInit,onReady,onViewChange,onDispose'
	var componentEvents = avalon.oneObject(events)
	var immunity = events.split(',').concat('is', 'define')
	var onceWarn = true
	function initComponent(src, rawOption, local, template) {
	    var tag = src.type
	    var is = src.props.is
	    //判定用户传入的标签名是否符合规格
	    if (!legalTags[tag] && !isCustomTag(tag)) {
	        avalon.warn(tag + '不合适做组件的标签')
	        return
	    }
	    //开始初始化组件
	    var hooks = {}
	    //用户只能操作顶层VM
	    //只有$id,is的对象就是emptyOption
	    if (!rawOption) {
	        options = []
	    } else {
	        var options = [].concat(rawOption)
	        options.forEach(function (a) {
	            if (a && typeof a === 'object') {
	                mixinHooks(hooks, (a.$model || a), true)
	            }
	        })
	    }
	    var definition = avalon.components[is]
	    //如果连组件的定义都没有加载回来,应该立即返回 
	    if (!definition) {
	        return
	    }
	  

	    //得到组件在顶层vm的配置对象名
	    if (!hooks.$id && onceWarn) {
	        avalon.warn('warning!', is, '组件最好在ms-widget配置对象中指定全局不重复的$id以提高性能!\n',
	                '若在ms-for循环中可以利用 ($index,el) in @array 中的$index拼写你的$id\n',
	                '如 ms-widget="{is:\'ms-button\',$id:\'btn\'+$index}"'
	                )
	        onceWarn = false
	    }
	    var define = hooks.define
	    define = define || avalon.directives.widget.define
	    //生成组件VM
	    var $id = hooks.$id || src.props.wid || 'w' + (new Date - 0)
	    var defaults = avalon.mix(true, {}, definition.defaults)
	    mixinHooks( hooks, defaults, false)//src.vmodel,
	    var skipProps = immunity.concat()
	    function sweeper(a, b) {
	        skipProps.forEach(function (k) {
	            delete a[k]
	            delete b[k]
	        })
	    }

	    sweeper.isWidget = true
	    var vmodel = define.apply(sweeper, [src.vmodel,defaults].concat(options))
	    if (!avalon.modern) {//增强对IE的兼容
	        for (var i in vmodel) {
	            if (!skipArray[i] && typeof vmodel[i] === 'function') {
	                vmodel[i] = vmodel[i].bind(vmodel)
	            }
	        }
	    }
	   
	    vmodel.$id = $id
	    avalon.vmodels[$id] = vmodel

	    //绑定组件的生命周期钩子
	    for (var e in componentEvents) {
	        if (hooks[e]) {
	            hooks[e].forEach(function (fn) {
	                vmodel.$watch(e, fn)
	            })
	        }
	    }

	    // 生成外部的渲染函数
	    // template保存着最原始的组件容器信息
	    // 我们先将它转换成虚拟DOM,如果是xmp, template,
	    // 它们内部是一个纯文本节点, 需要继续转换为虚拟DOM
	    var shell = avalon.lexer(template)
	    var shellRoot = shell[0]
	    var sc = shellRoot.children
	    if (sc && sc.length === 1 && sc[0].nodeValue) {
	        shellRoot.children = avalon.lexer(sc[0].nodeValue)
	    }

	    delete shellRoot.isVoidTag
	    delete shellRoot.template
	    delete shellRoot.skipContent
	    delete shellRoot.props['ms-widget']
	    shellRoot.type = 'cheng7'
	    shellRoot.children = shellRoot.children || []
	    shellRoot.props.is = is
	    shellRoot.props.wid = $id
	    avalon.speedUp(shell)
	    var render = avalon.render(shell, local)
	    
	    //生成内部的渲染函数
	    var finalTemplate = definition.template.trim()
	    if (typeof definition.getTemplate === 'function') {
	        finalTemplate = definition.getTemplate(vmodel, finalTemplate)
	    }
	    var vtree = avalon.lexer(finalTemplate)

	    if (vtree.length > 1) {
	        avalon.error('组件必须用一个元素包起来')
	    }
	    var soleSlot = definition.soleSlot
	    replaceSlot(vtree, soleSlot)
	    avalon.speedUp(vtree)

	    var render2 = avalon.render(vtree)

	    //生成最终的组件渲染函数
	    var str = fnTemplate + ''
	    var zzzzz = soleSlot ? avalon.quote(soleSlot) : "null"
	    str = str.
	            replace('XXXXX', stringifyAnonymous(render)).
	            replace('YYYYY', stringifyAnonymous(render2)).
	            replace('ZZZZZ', zzzzz)

	    var begin = str.indexOf('{') + 1
	    var end = str.lastIndexOf("}")

	    var lastFn = Function('vm', 'local', str.slice(begin, end))
	    vmodel.$render = lastFn
	    src['component-vm:' + is] = vmodel

	    return  vmodel.$render = lastFn

	}
	module.exports = initComponent

	function stringifyAnonymous(fn) {
	    return fn.toString().replace('anonymous', '')
	            .replace(/\s*\/\*\*\//g, '')
	}


	function fnTemplate() {
	    var shell = (XXXXX)(vm, local);
	    var shellRoot = shell[0]
	    var vtree = (YYYYY)(vm, local);
	    var component = vtree[0]

	    //处理diff
	    var orderUniq = {}
	   
	    String('ms-widget,'+shellRoot.order + ',' + component.order).
	            replace(avalon.rword, function (a) {
	                if (a !== 'undefined')
	                    orderUniq[a] = a
	            })

	    shellRoot.order = Object.keys(orderUniq).join(',')

	    for (var i in shellRoot) {
	        if (i !== 'children' && i !== 'type') {
	            if (i === 'props') {
	                avalon.mix(component.props, shellRoot.props)
	            } else {
	                component[i] = shellRoot[i]
	            }
	        }
	    }


	    var soleSlot = ZZZZZ
	    var slots = avalon.collectSlots(shellRoot, soleSlot)
	    if (soleSlot && (!slots[soleSlot] || !slots[soleSlot].length)) {
	        slots[soleSlot] = [{
	                nodeType: 3,
	                type: '#text',
	                nodeValue: vm[soleSlot],
	                dynamic: true
	            }]
	    }
	    avalon.insertSlots(vtree, slots)

	    delete component.skipAttrs
	    delete component.skipContent
	    return vtree

	}

	function replaceSlot(vtree, slotName) {
	    for (var i = 0, el; el = vtree[i]; i++) {
	        if (el.type === 'slot') {
	            vtree.splice(i, 1, {
	                type: '#comment',
	                nodeValue: 'slot:' + (el.props.name || slotName),
	                nodeType: 8,
	                dynamic: (el.props.name || slotName)
	            }, {
	                type: '#comment',
	                nodeValue: 'slot-end:',
	                nodeType: 8
	            })
	            i++
	        } else if (el.nodeType === 1 && el.children) {
	            replaceSlot(el.children, slotName)
	        }
	    }
	}

	avalon.insertSlots = function (vtree, slots) {
	    for (var i = 0, el; el = vtree[i]; i++) {
	        if (el.nodeType === 8 && slots[el.dynamic]) {
	            var args = [i + 1, 0].concat(slots[el.dynamic])
	            vtree.splice.apply(vtree, args)
	            i += slots[el.dynamic].length
	        } else if (el.nodeType === 1 && el.children) {
	            avalon.insertSlots(el.children, slots)
	        }
	    }
	}

	avalon.collectSlots = function (node, soleSlot) {
	    var slots = {}
	    if (soleSlot) {
	        slots[soleSlot] = node.children
	        slots.__sole__ = soleSlot
	    } else {
	        node.children.forEach(function (el, i) {
	            if (el.nodeType === 1) {
	                var name = el.props.slot
	                if (name) {
	                    // delete el.props.slot
	                    if (Array.isArray(slots[name])) {
	                        slots[name].push(el)
	                    } else {
	                        slots[name] = [el]
	                    }
	                }
	            } else if (el.dynamic === 'for' && /slot=['"](\w+)/.test(el.template)) {
	                var a = RegExp.$1
	                slots[a] = node.children.slice(i, i + 2)
	            }
	        })
	    }
	    return slots
	}


	//必须以字母开头,结尾以字母或数字结束,中间至少出现一次"-",
	//并且不能大写字母,特殊符号,"_","$",汉字
	var rcustomTag = /^[a-z]([a-z\d]+\-)+[a-z\d]+$/

	function isCustomTag(type) {
	    return rcustomTag.test(type) || avalon.components[type]
	}

	function mixinHooks(target, option, overwrite) {
	    for (var k in option) {
	        var v = option[k]
	        //如果是生命周期钩子,总是不断收集
	        if (componentEvents[k]) {
	            if (k in target) {
	                target[k].push(v)
	            } else {
	                target[k] = [option[k]]
	            }
	        } else {
	            if (overwrite) {
	                target[k] = v
	            }
	        }
	    }
	}

/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * 
	$$skipArray:是系统级通用的不可监听属性
	$skipArray: 是当前对象特有的不可监听属性

	 不同点是
	 $$skipArray被hasOwnProperty后返回false
	 $skipArray被hasOwnProperty后返回true
	 */

	module.exports = avalon.oneObject('$id,$render,$track,$element,$watch,$fire,$events,$model,$skipArray,$accessors,$hashcode,$run,$wait,__proxy__,__data__,__const__')

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var support = __webpack_require__(65)
	var Cache = __webpack_require__(28)
	var update = __webpack_require__(37)

	avalon.directive('effect', {
	    priority: 5,
	    diff: function (copy, src, name) {
	        var copyObj = copy[name]
	        copyObj = copy.$model || copyObj
	        if (typeof copyObj === 'string') {
	            var is = copyObj
	            copyObj = {
	                is: is
	            }

	        } else if (Array.isArray(copyObj)) {
	            copyObj = avalon.mix.apply({}, copyObj)
	        }

	        copyObj.action = copyObj.action || 'enter'

	        if (Object(copyObj) === copyObj) {
	            if (copy === src || diffObj(copyObj, src[name] || {})) {
	                src[name] = copyObj
	                update(src, this.update, 'afterChange')
	            }
	        }
	        if (copy !== src) {
	            delete copy[name]
	        }
	    },
	    update: function (dom, vnode, parent, option) {
	        if (dom.animating) {
	            return
	        }
	        dom.animating = true
	        var localeOption = vnode['ms-effect']
	        var type = localeOption.is
	        option = option || {}
	        if (!type) {//如果没有指定类型
	            return avalon.warn('need is option')
	        }

	        var effects = avalon.effects
	        if (support.css && !effects[type]) {
	            avalon.effect(type, {})
	        }
	        var globalOption = effects[type]
	        if (!globalOption) {//如果没有定义特效
	            return avalon.warn(type + ' effect is undefined')
	        }
	        var action = option.action || localeOption.action
	        var Effect = avalon.Effect
	        if (typeof Effect.prototype[action] !== 'function') {
	            return avalon.warn(action + ' action is undefined')
	        }
	        var effect = new Effect(dom)
	        var finalOption = avalon.mix(option, globalOption, localeOption)
	        if (finalOption.queue) {
	            animationQueue.push(function () {
	                effect[action](finalOption)
	            })
	            callNextAnimation()
	        } else {
	            setTimeout(function () {
	                effect[action](finalOption)
	            }, 4)
	        }
	    }
	})
	function diffObj(a, b) {
	    for (var i in a) {
	        if (a[i] !== b[i])
	            return true
	    }
	    return false
	}

	var animationQueue = []
	function callNextAnimation() {
	    if (animationQueue.lock)
	        return
	    var fn = animationQueue[0]
	    if (fn) {
	        callNextAnimation.lock = true
	        fn()
	    }
	}

	avalon.effects = {}
	//这里定义CSS动画


	avalon.effect = function (name, definition) {
	    avalon.effects[name] = definition || {}
	    if (support.css) {
	        if (!definition.enterClass) {
	            definition.enterClass = name + '-enter'
	        }
	        if (!definition.enterActiveClass) {
	            definition.enterActiveClass = definition.enterClass + '-active'
	        }
	        if (!definition.leaveClass) {
	            definition.leaveClass = name + '-leave'
	        }
	        if (!definition.leaveActiveClass) {
	            definition.leaveActiveClass = definition.leaveClass + '-active'
	        }
	    }
	    if (!definition.action) {
	        definition.action = 'enter'
	    }
	}


	var Effect = function (el) {
	    this.el = el
	}
	avalon.Effect = Effect
	Effect.prototype = {
	    enter: createAction('Enter'),
	    leave: createAction('Leave'),
	    move: createAction('Move')
	}

	var rsecond = /\d+s$/
	function toMillisecond(str) {
	    var ratio = rsecond.test(str) ? 1000 : 1
	    return parseFloat(str) * ratio
	}

	function execHooks(options, name, el) {
	    var list = options[name]
	    list = Array.isArray(list) ? list : typeof list === 'function' ? [list] : []
	    list.forEach(function (fn) {
	        fn && fn(el)
	    })
	}
	var staggerCache = new Cache(128)

	function createAction(action) {
	    var lower = action.toLowerCase()
	    return function (option) {
	        var elem = this.el
	        var $el = avalon(elem)
	        var enterAnimateDone
	        var staggerTime = isFinite(option.stagger) ? option.stagger * 1000 : 0
	        if (staggerTime) {
	            if (option.staggerKey) {
	                var stagger = staggerCache.get(option.staggerKey) ||
	                        staggerCache.put(option.staggerKey, {
	                            count: 0,
	                            items: 0
	                        })
	                stagger.count++
	                stagger.items++
	            }
	        }
	        var staggerIndex = stagger && stagger.count || 0
	        var animationDone = function (e) {
	            var isOk = e !== false
	            elem.animating = void 0
	            enterAnimateDone = true
	            var dirWord = isOk ? 'Done' : 'Abort'
	            execHooks(option, 'on' + action + dirWord, elem)
	            avalon.unbind(elem, support.transitionEndEvent)
	            avalon.unbind(elem, support.animationEndEvent)
	            if (stagger) {
	                if (--stagger.items === 0) {
	                    stagger.count = 0
	                }
	            }
	            if (option.queue) {
	                animationQueue.lock = false
	                animationQueue.shift()
	                callNextAnimation()
	            }
	        }
	        execHooks(option, 'onBefore' + action, elem)

	        if (option[lower]) {
	            option[lower](elem, function (ok) {
	                animationDone(ok !== false)
	            })
	        } else if (support.css) {

	            $el.addClass(option[lower + 'Class'])
	            if (lower === 'leave') {
	                $el.removeClass(option.enterClass + ' ' + option.enterActiveClass)
	            } else if (lower === 'enter') {
	                $el.removeClass(option.leaveClass + ' ' + option.leaveActiveClass)
	            }

	            $el.bind(support.transitionEndEvent, animationDone)
	            $el.bind(support.animationEndEvent, animationDone)
	            setTimeout(function () {
	                enterAnimateDone = avalon.root.offsetWidth === NaN
	                $el.addClass(option[lower + 'ActiveClass'])
	                var computedStyles = window.getComputedStyle(elem)
	                var tranDuration = computedStyles[support.transitionDuration]
	                var animDuration = computedStyles[support.animationDuration]
	                var time = toMillisecond(tranDuration) || toMillisecond(animDuration)
	                if (!time === 0) {
	                    animationDone(false)
	                } else if (!staggerTime) {
	                    setTimeout(function () {
	                        if (!enterAnimateDone) {
	                            animationDone(false)
	                        }
	                    }, time + 130)
	                }
	            }, 17 + staggerTime * staggerIndex)// = 1000/60
	        }
	    }
	}

	avalon.applyEffect = function (node, vnode, opts) {
	    var cb = opts.cb
	    var hook = opts.hook
	    var curEffect = vnode['ms-effect']
	    if (curEffect && !avalon.document.hidden) {
	        var old = curEffect[hook]
	        if (cb) {
	            if (Array.isArray(old)) {
	                old.push(cb)
	            } else if (old) {
	                curEffect[hook] = [old, cb]
	            } else {
	                curEffect[hook] = [cb]
	            }
	        }
	        getAction(opts)
	        node.animate = true
	        avalon.directives.effect.update(node, vnode, 0, avalon.shadowCopy({}, opts))

	    } else if (cb) {
	        cb()
	    }
	}

	function getAction(opts) {
	    if (!opts.acton) {
	        opts.action = opts.hook.replace(/^on/, '').replace(/Done$/, '').toLowerCase()
	    }
	}



/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * ------------------------------------------------------------
	 * 检测浏览器对CSS动画的支持与API名
	 * ------------------------------------------------------------
	 */
	var supportTransition = false
	var supportAnimation = false
	var supportCSS = false
	var transitionEndEvent
	var animationEndEvent
	var transitionDuration = avalon.cssName('transition-duration')
	var animationDuration = avalon.cssName('animation-duration')

	var checker = {
	    TransitionEvent: 'transitionend',
	    WebKitTransitionEvent: 'webkitTransitionEnd',
	    OTransitionEvent: 'oTransitionEnd',
	    otransitionEvent: 'otransitionEnd'
	}
	var window = avalon.window
	var tran
	//有的浏览器同时支持私有实现与标准写法，比如webkit支持前两种，Opera支持1、3、4
	for (var name in checker) {
	    if (window[name]) {
	        tran = checker[name]
	        break
	    }
	    try {
	        var a = document.createEvent(name)
	        tran = checker[name]
	        break
	    } catch (e) {
	    }
	}
	if (typeof tran === 'string') {
	    supportTransition = true
	    supportCSS = true
	    transitionEndEvent = tran
	}

	//animationend有两个可用形态
	//IE10+, Firefox 16+ & Opera 12.1+: animationend
	//Chrome/Safari: webkitAnimationEnd
	//http://blogs.msdn.com/b/davrous/archive/2011/12/06/introduction-to-css3-animat ions.aspx
	//IE10也可以使用MSAnimationEnd监听，但是回调里的事件 type依然为animationend
	//  el.addEventListener('MSAnimationEnd', function(e) {
	//     alert(e.type)// animationend！！！
	// })
	checker = {
	    'AnimationEvent': 'animationend',
	    'WebKitAnimationEvent': 'webkitAnimationEnd'
	}
	var ani
	for (name in checker) {
	    if (window[name]) {
	        ani = checker[name]
	        break
	    }
	}
	if (typeof ani === 'string') {
	    supportAnimation = true
	    supportCSS = true
	    animationEndEvent = ani
	}

	module.exports = {
	    transition: supportTransition,
	    animation: supportAnimation,
	    css: supportCSS,
	    transitionEndEvent: transitionEndEvent,
	    animationEndEvent: animationEndEvent,
	    transitionDuration: transitionDuration,
	    animationDuration: animationDuration
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	
	avalon.lexer = __webpack_require__(67)
	avalon.diff = __webpack_require__(69)
	avalon.batch = __webpack_require__(70)
	// dispatch与patch 为内置模块
	var parseView = __webpack_require__(71)

	function render(vtree, local) {
	    var _body = Array.isArray(vtree) ? parseView(vtree) : vtree
	    var _local = []
	    if (local) {
	        for (var i in local) {
	            _local.push('var ' + i + ' = __local__['+avalon.quote(i)+']')
	        }
	    }
	    var body = '__local__ = __local__ || {};\n' +
	            _local.join(';\n')+'\n' + _body
	    try{
	    var fn = Function('__vmodel__', '__local__', body)
	    }catch(e){
	        avalon.warn(_body, 'parse error')
	    }
	    return fn
	}
	avalon.render = render

	module.exports = avalon


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * avalon2.1.1的新式lexer
	 * 将字符串变成一个虚拟DOM树,方便以后进一步变成模板函数
	 * 此阶段只会生成VElement,VText,VComment
	 * ------------------------------------------------------------
	 */
	var ropenTag = /^<([-A-Za-z0-9_]+)\s*([^>]*?)(\/?)>/
	var rendTag = /^<\/([^>]+)>/
	var rmsForStart = /^\s*ms\-for\:/
	var rmsForEnd = /^\s*ms\-for\-end/
	//https://github.com/rviscomi/trunk8/blob/master/trunk8.js
	//判定里面有没有内容
	var rcontent = /\S/
	var voidTag = avalon.oneObject('area,base,basefont,bgsound,br,col,command,embed,' +
	        'frame,hr,img,input,keygen,link,meta,param,source,track,wbr')
	var plainTag = avalon.oneObject('script,style,textarea,xmp,noscript,option,template')
	var stringPool = {}
	__webpack_require__(68)

	function lexer(str) {
	    stringPool = {}
	    str = clearString(str)
	    var stack = []
	    stack.last = function () {
	        return  stack[stack.length - 1]
	    }
	    var ret = []

	    var breakIndex = 100000
	    do {
	        var node = false
	        if (str.charAt(0) !== '<') {
	            var i = str.indexOf('<')
	            i = i === -1 ? str.length : i
	            var nodeValue = str.slice(0, i).replace(rfill, fill)
	            str = str.slice(i)//处理文本节点
	            node = {type: "#text", nodeType: 3, nodeValue: nodeValue}
	            if (rcontent.test(nodeValue)) {
	                collectNodes(node, stack, ret)//不收集空白节点
	            }
	        }
	        if (!node) {
	            var i = str.indexOf('<!--')
	            if (i === 0) {
	                var l = str.indexOf('-->')
	                if (l === -1) {
	                    avalon.error("注释节点没有闭合" + str)
	                }
	                var nodeValue = str.slice(4, l).replace(rfill, fill)
	                str = str.slice(l + 3)
	                node = {type: "#comment", nodeType: 8, nodeValue: nodeValue}
	                collectNodes(node, stack, ret)
	                if (rmsForEnd.test(nodeValue)) {
	                    var p = stack.last()
	                    var nodes = p ? p.children : ret
	                    markeRepeatRange(nodes, nodes.pop())
	                }
	            }

	        }
	        if (!node) {
	            var match = str.match(ropenTag)
	            if (match) {
	                var type = match[1].toLowerCase()
	                var isVoidTag = voidTag[type] || match[3] === '\/'
	                node = {type: type, nodeType: 1, props: {}, children: [], isVoidTag: isVoidTag}
	                var attrs = match[2]
	                if (attrs) {
	                    collectProps(attrs, node.props)
	                }

	                collectNodes(node, stack, ret)
	                str = str.slice(match[0].length)
	                if (isVoidTag) {
	                    node.fire = node.isVoidTag = true
	                } else {
	                    stack.push(node)
	                    if (plainTag[type]) {
	                        var index = str.indexOf("</" + type + '>')
	                        var innerHTML = str.slice(0, index).trim()
	                        str = str.slice(index)
	                        if (innerHTML) {
	                            switch (type) {
	                                case 'style':
	                                case 'script':
	                                case 'noscript':
	                                case 'template':
	                                case 'xmp':
	                                    node.skipContent = true
	                                    if (innerHTML) {
	                                        node.children.push({
	                                            nodeType: 3,
	                                            type: '#text',
	                                            skipContent: true,
	                                            nodeValue: nomalString(innerHTML)
	                                        })
	                                    }
	                                    break
	                                case 'textarea':
	                                    node.skipContent = true
	                                    node.props.type = 'textarea'
	                                    node.props.value = nomalString(innerHTML)
	                                    break
	                                case 'option':
	                                    node.children.push({
	                                        nodeType: 3,
	                                        type: '#text',
	                                        nodeValue: nomalString(trimHTML(innerHTML))
	                                    })
	                                    break
	                            }
	                        }
	                    }
	                }
	            }
	        }
	        if (!node) {
	            var match = str.match(rendTag)
	            if (match) {
	                var type = match[1].toLowerCase()
	                var last = stack.last()
	                if (!last) {
	                    avalon.error(match[0] + '前面缺少<' + type + '>')
	                } else if (last.type !== type) {
	                    avalon.error(last.type + '没有闭合')
	                }
	                node = stack.pop()
	                node.fire = true
	                str = str.slice(match[0].length)
	            }
	        }

	        if (!node || --breakIndex === 0) {
	            break
	        }
	        if (node.fire) {
	            fireEnd(node, stack, ret)
	            delete node.fire
	        }

	    } while (str.length);

	    return ret

	}

	module.exports = lexer

	function fireEnd(node, stack, ret) {
	    var type = node.type
	    var props = node.props
	    switch (type) {
	        case 'input':
	            if (!props.type) {
	                props.type = 'text'
	            }
	            break
	        case 'select':
	            props.type = type + '-' + props.hasOwnProperty('multiple') ? 'multiple' : 'one'
	            break
	        case 'table':
	            addTbody(node.children)
	            break
	        default:
	            if (type.indexOf('ms-') === 0) {
	                props.is = type
	                if (!props['ms-widget']) {
	                    props['ms-widget'] = '{is:' + avalon.quote(type) + '}'
	                }
	            }
	            if (props['ms-widget']) {
	                node.template = avalon.vdomAdaptor(node, 'toHTML')

	            }
	            break
	    }
	    var forExpr = props['ms-for']
	    if (forExpr) {
	        delete props['ms-for']
	        var p = stack.last()
	        var arr = p ? p.children : ret
	        arr.splice(arr.length - 1, 0, {
	            nodeType: 8,
	            type: '#comment',
	            nodeValue: 'ms-for:' + forExpr
	        })

	        markeRepeatRange(arr, {
	            nodeType: 8,
	            type: '#comment',
	            nodeValue: 'ms-for-end:'
	        })
	    }
	}

	function markeRepeatRange(nodes, end) {
	    end.dynamic = true
	    end.signature = avalon.makeHashCode('for')
	    var array = [], start, deep = 1
	    while (start = nodes.pop()) {
	        if (start.nodeType === 8) {
	            if (rmsForEnd.test(start.nodeValue)) {
	                ++deep
	            } else if (rmsForStart.test(start.nodeValue)) {
	                --deep
	                if (deep === 0) {
	                    start.nodeValue = start.nodeValue.replace(rfill, fill)        //nomalString(start.nodeValue)
	                    start.signature = end.signature
	                    start.dynamic = 'for'
	                    start.template = array.map(function (a) {
	                        return avalon.vdomAdaptor(a, 'toHTML')
	                    }).join('')
	                    var element = array[0]
	                    if (element.props) {
	                        var cb = element.props['data-for-rendered']
	                        if (cb) {
	                            var wid = cb + ':cb'
	                            if (!avalon.caches[wid]) {
	                                avalon.caches[wid] = Function('return ' + avalon.parseExpr(cb, 'on'))()
	                            }
	                            start.wid = wid
	                        }
	                    }
	                    nodes.push(start, [], end)
	                    break
	                }
	            }
	        }
	        array.unshift(start)
	    }

	}


	function collectNodes(node, stack, ret) {
	    var p = stack.last()
	    if (p) {
	        p.children.push(node)
	    } else {
	        ret.push(node)
	    }
	}

	function collectProps(attrs, props) {
	    attrs.replace(rnowhite, function (prop) {
	        var arr = prop.split('=')
	        var name = arr[0]
	        var value = arr[1] || ''
	        if (name.charAt(0) === ':') {
	            name = 'ms-' + name.slice(1)
	        }
	        if (value) {
	            if (value.indexOf('??') === 0) {
	                value = nomalString(value).
	                        replace(rlineSp, '').
	                        replace(/\"/g, "'").
	                        slice(1, -1)
	            }
	        }
	        if (!(name in props)) {
	            props[name] = value
	        }
	    })

	}
	function nomalString(str) {
	    return avalon.unescapeHTML(str.replace(rfill, fill))
	}

	function clearString(str) {
	    var array = readString(str)
	    for (var i = 0, n = array.length; i < n; i++) {
	        str = str.replace(array[i], dig)
	    }
	    return str
	}
	function readString(str) {
	    var end, s = 0
	    var ret = []
	    for (var i = 0, n = str.length; i < n; i++) {
	        var c = str.charAt(i)
	        if (!end) {
	            if (c === "'") {
	                end = "'"
	                s = i
	            } else if (c === '"') {
	                end = '"'
	                s = i
	            }
	        } else {
	            if (c === '\\') {
	                i += 1
	                continue
	            }
	            if (c === end) {
	                ret.push(str.slice(s, i + 1))
	                end = false
	            }
	        }
	    }
	    return ret
	}

	var rfill = /\?\?\d+/g
	var rlineSp = /\n\s*/g
	var rnowhite = /\S+/g
	var number = 1
	function dig(a) {
	    var key = '??' + number++
	    stringPool[key] = a
	    return key
	}
	function fill(a) {
	    var val = stringPool[a]
	    return val
	}
	//专门用于处理option标签里面的标签
	var rtrimHTML = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi
	function trimHTML(v) {
	    return String(v).replace(rtrimHTML, '').trim()
	}

	//如果直接将tr元素写table下面,那么浏览器将将它们(相邻的那几个),放到一个动态创建的tbody底下
	function addTbody(nodes) {
	    var tbody, needAddTbody = false, count = 0, start = 0, n = nodes.length
	    for (var i = 0; i < n; i++) {
	        var node = nodes[i]
	        if (!tbody) {
	            if (node.type === 'tr') {
	                tbody = {
	                    nodeType: 1,
	                    type: 'tbody',
	                    children: [],
	                    props: {}
	                }
	                tbody.children.push(node)
	                needAddTbody = true
	                if (start === 0)
	                    start = i
	                nodes[i] = tbody
	            }
	        } else {
	            if (node.type !== 'tr' && node.nodeType === 1) {
	                tbody = false
	            } else {
	                tbody.children.push(node)
	                count++
	                nodes[i] = 0
	            }
	        }
	    }

	    if (needAddTbody) {
	        for (i = start; i < n; i++) {
	            if (nodes[i] === 0) {
	                nodes.splice(i, 1)
	                i--
	                count--
	                if (count === 0) {
	                    break
	                }
	            }
	        }
	    }
	}



/***/ },
/* 68 */
/***/ function(module, exports) {

	avalon.speedUp = function (arr) {
	    for (var i = 0; i < arr.length; i++) {
	        hasDirective(arr[i])
	    }
	    return arr
	}

	function hasDirective(a) {
	    switch (a.nodeType) {
	        case 3:
	            if (avalon.config.rbind.test(a.nodeValue)) {
	                a.dynamic = 'expr'
	                return true
	            } else {
	                a.skipContent = true
	                return false
	            }
	        case 8:
	            if (a.dynamic) {
	                return true
	            } else {
	                a.skipContent = true
	                return false
	            }
	        case 1:
	            if (a.props['ms-skip']) {
	                a.skipAttrs = true
	                a.skipContent = true
	                return false
	            }
	            if (/^ms\-/.test(a.type) || hasDirectiveAttrs(a.props)) {
	                a.dynamic = true
	            } else {
	                a.skipAttrs = true
	            }
	            if (a.isVoidTag && !a.dynamic) {
	                a.skipContent = true
	                return false
	            }
	            var hasDirective = childrenHasDirective(a.children)
	            if (!hasDirective && !a.dynamic) {
	                a.skipContent = true
	                return false
	            }
	            return true
	        default:
	            if (Array.isArray(a)) {
	                return childrenHasDirective(a)
	            }
	    }
	}

	function childrenHasDirective(arr) {
	    var ret = false
	    for (var i = 0, el; el = arr[i++]; ) {
	        if (hasDirective(el)) {
	            ret = true
	        }
	    }
	    return ret
	}
	var rdirAttr = /^(\:|ms\-)\w/
	function hasDirectiveAttrs(props) {
	    if ('ms-skip' in props)
	        return false
	    for (var i in props) {
	        if (rdirAttr.test(i)) {
	            return true
	        }
	    }
	    return false
	}


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * ------------------------------------------------------------
	 * diff 对比新旧两个虚拟DOM树,根据directive中的diff方法为新虚拟DOM树
	 * 添加change, afterChange更新钩子
	 * ------------------------------------------------------------
	 */
	var emptyArr = []
	// 防止被引用
	var emptyObj = function () {
	    return {
	        children: [], props: {}
	    }
	}
	var directives = avalon.directives
	var rbinding = /^ms-(\w+)-?(.*)/

	function diff(copys, sources) {
	    for (var i = 0; i < copys.length; i++) {
	        var copy = copys[i]
	        var src = sources[i] || emptyObj()

	        switch (copy.nodeType) {
	            case 3:
	                if (copy.dynamic) {
	                    directives.expr.diff(copy, src)
	                }
	                break
	            case 8:
	                if (copy.dynamic === 'for') {//比较循环区域的元素位置
	                    directives['for'].diff(copy, src, copys, sources, i)
	                } else if (src.afterChange) {
	                    execHooks(src, src.afterChange)
	                }
	                break
	            case 1:
	                if (copy.order) {
	                    diffProps(copys, sources, i)
	                }
	                copy = copys[i]
	                src = sources[i]
	                if (copy.nodeType === 1 && !copy.skipContent && !copy.isVoidTag) {
	                    diff(copy.children, src && src.children || [])
	                }
	                if (src && src.afterChange) {
	                    execHooks(src, src.afterChange)
	                }
	                break
	            default:
	                if (Array.isArray(copy)) {
	                    diff(copy, src)//比较循环区域的内容
	                }
	                break
	        }
	    }
	}

	function execHooks(el, hooks) {
	    if (hooks.length) {
	        for (var hook, i = 0; hook = hooks[i++]; ) {
	            hook(el.dom, el)
	        }
	    }
	    delete el.afterChange
	}

	function diffProps(copys, sources, index) {
	    var order = copys[index].order
	    if (order) {
	        var oldOrder = order
	        try {
	            var arr = order.match(avalon.rword)
	            var checked = {}
	            for(var i = 0; i < arr.length; i++){
	                var name = arr[i]
	                
	                if (checked[name]) {
	                    continue
	                } else {
	                    checked[name] = 1
	                }
	                var match = name.match(rbinding)
	                var type = match && match[1]
	                if (directives[type]) {
	                    directives[type].diff(copys[index], sources[index] || emptyObj(), name, copys, sources, index)
	                }
	                var newOrder = copys[index].order
	                if (!newOrder) {
	                    arr.splice(0, arr.length)
	                } else if (newOrder !== oldOrder) {
	                    arr.push.apply(arr, newOrder.match(avalon.rword))
	                }
	            }

	        } catch (e) {
	            avalon.warn(type, e, e.stack || e.message, 'diffProps error')
	        }
	    }
	}
	avalon.diffProps = diffProps
	module.exports = diff


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * ------------------------------------------------------------
	 * batch 同时对N个视图进行全量更新
	 * ------------------------------------------------------------
	 */

	var reconcile = __webpack_require__(39)

	//如果正在更新一个子树,那么将它放到
	var needRenderIds = []
	var renderingID = false
	avalon.suspendUpdate = 0


	function batchUpdate(id) {
	    if (renderingID) {
	        return avalon.Array.ensure(needRenderIds, id)
	    } else {
	        renderingID = id
	    }
	    var scope = avalon.scopes[id]
	    if (!scope || !document.nodeName || avalon.suspendUpdate) {
	        return renderingID = null
	    }
	    var vm = scope.vmodel
	    var dom = vm.$element
	    var source = dom.vtree || []
	    var renderFn = vm.$render
	    var copy = renderFn(scope.vmodel, scope.local)
	    if (scope.isTemp) {
	        //在最开始时,替换作用域的所有节点,确保虚拟DOM与真实DOM是对齐的
	        reconcile([dom], source, dom.parentNode)
	        delete avalon.scopes[id]
	    }
	    avalon.diff(copy, source)


	    var index = needRenderIds.indexOf(renderingID)
	    renderingID = 0
	    if (index > -1) {
	        var removed = needRenderIds.splice(index, 1)
	        return batchUpdate(removed[0])
	    }

	    var more = needRenderIds.shift()
	    if (more) {
	        batchUpdate(more)
	    }
	}



	module.exports = avalon.batch = batchUpdate


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * 本模块是用于将虚拟DOM变成一个函数
	 */

	var extractBindings = __webpack_require__(72)
	var stringify = __webpack_require__(50)
	var parseExpr = __webpack_require__(73)
	var decode = __webpack_require__(16)
	var config = avalon.config
	var quote = avalon.quote
	var rident = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
	var rstatement = /^\s*var\s+([$\w]+)\s*\=\s*\S+/
	var skips = {__local__: 1, vmode: 1, dom: 1}


	function parseNodes(source, inner) {
	    //ms-important， ms-controller ， ms-for 不可复制，省得死循环
	    //ms-important --> ms-controller --> ms-for --> ms-widget --> ms-effect --> ms-if
	    var buffer = inner ? [] : ['\nvar vnodes = [];']

	    for (var i = 0, el; el = source[i++]; ) {
	        var vnode = parseNode(el)
	        if (el.$prepend) {
	            buffer.push(el.$prepend)
	        }
	        var append = el.$append
	        delete el.$append
	        delete el.$prepend
	        if (vnode) {
	            buffer.push(vnode + '\n')
	        }
	        if (append) {
	            buffer.push(append)
	        }
	    }
	    if (!inner) {
	        buffer.push('return vnodes\n')
	    }
	    return buffer.join('\n')
	}



	function parseNode(vdom) {
	    switch (vdom.nodeType) {
	        case 3:
	            if (config.rexpr.test(vdom.nodeValue) && !vdom.skipContent ) {
	                return add(parseText(vdom))
	            } else {
	                return add(createCachedNode(vdom))
	            }
	        case 1:

	            if (vdom.skipContent && vdom.skipAttrs) {
	                return add(createCachedNode(vdom))
	            }
	            var copy = {
	                props: {},
	                type: vdom.type,
	                nodeType: 1
	            }
	            var bindings = extractBindings(copy, vdom.props)
	            var order = bindings.map(function (b) {
	                //将ms-*的值变成函数,并赋给copy.props[ms-*]
	                //如果涉及到修改结构,则在source添加$append,$prepend
	                avalon.directives[b.type].parse(copy, vdom, b)
	                return b.name
	            }).join(',')
	            if (order) {
	                copy.order = order
	            }
	            if (vdom.isVoidTag) {
	                copy.isVoidTag = true
	            } else {
	                if (!('children' in copy)) {
	                    var c = vdom.children
	                    if (c.length) {
	                        copy.children = '(function(){' + parseNodes(c) + '})()'
	                    } else {
	                        copy.children = '[]'
	                    }
	                }
	            }
	            if (vdom.template)
	                copy.template = vdom.template
	            if (vdom.skipContent)
	                copy.skipContent = true
	            if (vdom.skipAttrs) {
	                copy.skipAttrs = true
	            }
	            if (vdom.dynamic) {
	                copy.dynamic = true
	            }
	            return addTag(copy)
	        case 8:
	            var nodeValue = vdom.nodeValue
	            if (vdom.dynamic === 'for') {// 处理ms-for指令
	                if (nodeValue.indexOf('ms-for:') !== 0) {
	                    avalon.error('ms-for指令前不能有空格')
	                }
	               
	                var copy = {
	                    dynamic: 'for',
	                    vmodel: '__vmodel__'
	                }
	                for (var i in vdom) {
	                    if (vdom.hasOwnProperty(i) && !skips[i]) {
	                        copy[i] = vdom[i]
	                    }
	                }

	                avalon.directives['for'].parse(copy, vdom, vdom)
	                vdom.$append += parseNodes(avalon.speedUp(avalon.lexer(vdom.template)),true)
	                return addTag(copy) 
	            } else if (nodeValue === 'ms-for-end:') {
	              
	                vdom.$append = addTag({
	                    nodeType: 8,
	                    type: '#comment',
	                    nodeValue: vdom.signature,
	                    key: 'traceKey'
	                }) + '\n},__local__,vnodes)\n' +
	                        addTag({
	                            nodeType: 8,
	                            type: "#comment",
	                            signature: vdom.signature,
	                            nodeValue: "ms-for-end:"
	                        }) + '\n'
	                return ''

	            } else if (nodeValue.indexOf('ms-js:') === 0) {//插入JS声明语句
	                var statement = parseExpr(nodeValue.replace('ms-js:', ''), 'js') + '\n'
	                var ret = addTag(vdom)
	                var match = statement.match(rstatement)
	                if (match && match[1]) {
	                    vdom.$append = (vdom.$append || '') + statement +
	                            "\n__local__." + match[1] + ' = ' + match[1] + '\n'
	                } else {
	                    avalon.warn(nodeValue + ' parse fail!')
	                }
	                return ret
	            } else if(vdom.dynamic){
	                return addTag(vdom)
	            }else{
	                return add(createCachedNode(vdom))
	            }
	   //     default:
	//            if (Array.isArray(vdom)) {
	//                console.log(vdom)
	//                vdom.$append = parseNodes(vdom, true)
	//            }
	    }

	}

	module.exports = parseNodes

	function wrapDelimiter(expr) {
	    return rident.test(expr) ? expr : parseExpr(expr, 'text')
	}

	function add(a) {
	    return 'vnodes.push(' + a + ');'
	}
	function addTag(obj) {
	    return add(stringify(obj))
	}

	function parseText(el) {
	    var array = extractExpr(el.nodeValue)//返回一个数组
	    var nodeValue = ''
	    if (array.length === 1) {
	        nodeValue = wrapDelimiter(array[0].expr)
	    } else {
	        var token = array.map(function (el) {
	            return el.type ? wrapDelimiter(el.expr) : quote(el.expr)
	        }).join(' + ')
	        nodeValue = 'String(' + token + ')'
	    }
	    return '{\ntype: "#text",\nnodeType:3,\ndynamic:true,\nnodeValue: ' + nodeValue + '\n}'
	}

	var rlineSp = /\n\s*/g

	function extractExpr(str) {
	    var ret = []
	    do {//aaa{{@bbb}}ccc
	        var index = str.indexOf(config.openTag)
	        index = index === -1 ? str.length : index
	        var value = str.slice(0, index)
	        if (/\S/.test(value)) {
	            ret.push({expr: decode(value)})
	        }
	        str = str.slice(index + config.openTag.length)
	        if (str) {
	            index = str.indexOf(config.closeTag)
	            var value = str.slice(0, index)
	            ret.push({
	                expr: avalon.unescapeHTML(value.replace(rlineSp, '')),
	                type: '{{}}'
	            })
	            str = str.slice(index + config.closeTag.length)
	        }
	    } while (str.length)
	    return ret
	}

	function createCachedNode(vdom) {
	    var uuid
	    switch (vdom.nodeType) {
	        case 1:
	            uuid = vdom.type + ';' + Object.keys(vdom.props).sort().map(function (k) {
	                return k + '-' + vdom.props[k]
	            }).join(';') + ';' + avalon.vdomAdaptor(vdom, 'toHTML').length
	            break
	        case 3:
	        case 8:
	            uuid = vdom.nodeType + ';' + vdom.nodeValue
	            break
	    }

	    avalon.caches[uuid] = vdom

	    return 'avalon.getCachedNode(' + quote(uuid) + ')'
	}

	avalon.getCachedNode = function (uuid) {
	    return avalon.caches[uuid]
	}

/***/ },
/* 72 */
/***/ function(module, exports) {

	var directives = avalon.directives
	var rbinding = /^ms-(\w+)-?(.*)/
	var eventMap = avalon.oneObject('animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit')

	function extractBindings(cur, props) {
	    var bindings = []
	    var skip = 'ms-skip' in props
	    var uniq = {}
	    for (var i in props) {
	        var value = props[i], match

	        if (!skip && (match = i.match(rbinding))) {
	            var type = match[1]
	            var param = match[2] || ''
	            var name = i
	            if (eventMap[type]) {
	                var order = parseFloat(param) || 0
	                param = type
	                type = 'on'
	            }
	            name = 'ms-' + type + (param ? '-' + param : '')
	            if (i !== name) {
	                delete props[i]
	                props[name] = value
	            }
	            if (directives[type]) {

	                var binding = {
	                    type: type,
	                    param: param,
	                    name: name,
	                    expr: value,
	                    priority: directives[type].priority || type.charCodeAt(0) * 100
	                }
	                if (type === 'on') {
	                    order = order || 0
	                    binding.name += '-' + order
	                    binding.priority = param.charCodeAt(0) * 100 + order
	                }
	                if (!uniq[binding.name]) {
	                    uniq[binding.name] = 1
	                    bindings.push(binding)
	                }
	            }
	        } else {
	            cur.props[i] = props[i]
	        }
	    }
	    bindings.sort(byPriority)

	    return bindings
	}

	function byPriority(a, b) {
	    return a.priority - b.priority
	}

	module.exports = extractBindings


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	

	//缓存求值函数，以便多次利用
	var evaluatorPool = __webpack_require__(49)

	var rregexp = /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/g
	var rstring = /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g
	var rfill = /\?\?\d+/g
	var brackets = /\(([^)]*)\)/

	var rshortCircuit = /\|\|/g
	var rpipeline = /\|(?=\w)/
	var ruselessSp = /\s*(\.|\|)\s*/g

	var rAt = /(^|[^\w\u00c0-\uFFFF_])(@|##)(?=[$\w])/g
	var rhandleName = /^(?:\@|##)[$\w\.]+$/i

	var rfilters = /\|.+/g
	var rvar = /((?:\@|\$|\#\#)?\w+)/g

	function collectLocal(str, ret) {
	    var arr = str.replace(rfilters, '').match(rvar)
	    if (arr) {
	        arr.filter(function (el) {
	            if (!/^[@\d\-]/.test(el) &&
	                    el.slice(0, 2) !== '##' &&
	                    el !== '$event' && !avalon.keyMap[el]) {
	                ret[el] = 1
	            }
	        })
	    }
	}

	function extLocal(ret) {
	    var arr = []
	    for (var i in ret) {
	        arr.push('var ' + i + ' = __local__[' + avalon.quote(i) + ']')
	    }
	    return arr
	}

	function parseExpr(str, category) {
	    var binding = {}
	    category = category || 'other'
	    if (typeof str === 'object') {
	        category = str.type
	        binding = str
	        str = binding.expr
	    }
	    if (typeof str !== 'string')
	        return ''
	    var cacheID = str
	    var cacheStr = evaluatorPool.get(category + ':' + cacheID)

	    if (cacheStr) {
	        return cacheStr
	    }

	    var number = 1
	//相同的表达式生成相同的函数
	    var maps = {}
	    function dig(a) {
	        var key = '??' + number++
	        maps[key] = a
	        return key
	    }

	    function fill(a) {
	        return maps[a]
	    }

	    var input = str.replace(rregexp, dig).//移除所有正则
	            replace(rstring, dig).//移除所有字符串
	            
	   // input = avalon.unescapeHTML(input).
	            replace(rshortCircuit, dig).//移除所有短路或
	            replace(ruselessSp, '$1').//移除. |两端空白
	            split(rpipeline) //使用管道符分离所有过滤器及表达式的正体
	    //还原body
	    var _body = input.shift()
	    var local = {}
	    var body = _body.replace(rfill, fill).trim()
	    if (category === 'on' && rhandleName.test(body)) {
	        body = body + '($event)'
	    }

	    body = body.replace(rAt, '$1__vmodel__.')
	    if (category === 'js') {
	        return evaluatorPool.put(category + ':' + cacheID, body)
	    } else if (category === 'on') {
	        collectLocal(_body, local)
	    }

	//处理表达式的过滤器部分

	    var filters = input.map(function (str) {
	        collectLocal(str.replace(/^\w+/g, ""), local)
	        str = str.replace(rfill, fill).replace(rAt, '$1__vmodel__.') //还原
	        var hasBracket = false
	        str = str.replace(brackets, function (a, b) {
	            hasBracket = true
	            return /\S/.test(b) ?
	                    '(__value__,' + b + ');' :
	                    '(__value__);'
	        })
	        if (!hasBracket) {
	            str += '(__value__);'
	        }
	        str = str.replace(/(\w+)/, 'avalon.__format__("$1")')
	        return '__value__ = ' + str
	    })
	    var ret = []
	    if (category === 'on') {
	        filters = filters.map(function (el) {
	            return el.replace(/__value__/g, '$event')
	        })
	        if (filters.length) {
	            filters.push('if($event.$return){\n\treturn;\n}')
	        }
	        if (!avalon.modern) {
	            body = body.replace(/__vmodel__\.([^(]+)\(([^)]*)\)/, function (a, b, c) {
	                return '__vmodel__.' + b + ".call(__vmodel__" + (/\S/.test(c) ? ',' + c : "") + ")"
	            })
	        }

	        ret = ['function ms_on($event, __local__){',
	            'try{',
	            extLocal(local).join('\n'),
	            '\tvar __vmodel__ = this;',
	            '\t' + body,
	            '}catch(e){',
	            quoteError(str, category),
	            '}',
	            '}']
	        filters.unshift(2, 0)
	    } else if (category === 'duplex') {

	//从vm中得到当前属性的值
	        var getterBody = [
	            'function (__vmodel__){',
	            'try{',
	            'return ' + body + '\n',
	            '}catch(e){',
	            quoteError(str, category).replace('parse', 'get'),
	            '}',
	            '}']
	        evaluatorPool.put('duplex:' + cacheID, getterBody.join('\n'))
	        //给vm同步某个属性
	        var setterBody = [
	            'function (__vmodel__,__value__){',
	            'try{',
	            '\t' + body + ' = __value__',
	            '}catch(e){',
	            quoteError(str, category).replace('parse', 'set'),
	            '}',
	            '}']
	        evaluatorPool.put('duplex:set:' + cacheID, setterBody.join('\n'))
	        //对某个值进行格式化
	        if (input.length) {
	            var formatBody = [
	                'function (__vmodel__, __value__){',
	                'try{',
	                filters.join('\n'),
	                'return __value__\n',
	                '}catch(e){',
	                quoteError(str, category).replace('parse', 'format'),
	                '}',
	                '}']
	            evaluatorPool.put('duplex:format:' + cacheID, formatBody.join('\n'))
	        }
	        return  evaluatorPool.get('duplex:' + cacheID)
	    } else {
	        ret = [
	            '(function(){',
	            'try{',
	            'var __value__ = ' + body,
	            (category === 'text' ?
	                    'return avalon.parsers.string(__value__)' :
	                    'return __value__'),
	            '}catch(e){',
	            quoteError(str, category),
	            '\treturn ""',
	            '}',
	            '})()'
	        ]
	        filters.unshift(3, 0)
	    }
	    ret.splice.apply(ret, filters)
	    cacheStr = ret.join('\n')
	    evaluatorPool.put(category + ':' + cacheID, cacheStr)
	    return cacheStr

	}

	function quoteError(str, type) {
	    return '\tavalon.warn(e, ' +
	            avalon.quote('parse ' + type + ' binding【 ' + str + ' 】fail')
	            + ')'
	}

	module.exports = avalon.parseExpr = parseExpr




/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var ret = __webpack_require__(75)
	var fireDisposeHook = ret.fireDisposeHook
	var fireDisposeHooks = ret.fireDisposeHooks
	var fireDisposeHookDelay = ret.fireDisposeHookDelay


	//http://stackoverflow.com/questions/11425209/are-dom-mutation-observers-slower-than-dom-mutation-events
	//http://stackoverflow.com/questions/31798816/simple-mutationobserver-version-of-domnoderemovedfromdocument
	function byMutationEvent(dom) {
	    dom.addEventListener("DOMNodeRemovedFromDocument", function () {
	        fireDisposeHookDelay(dom)
	    })
	}
	//用于IE8+, firefox
	function byRewritePrototype() {
	    if (byRewritePrototype.execute) {
	        return
	    }
	//https://www.web-tinker.com/article/20618.html?utm_source=tuicool&utm_medium=referral
	//IE6-8虽然暴露了Element.prototype,但无法重写已有的DOM API
	    byRewritePrototype.execute = true
	    var p = Node.prototype
	    function rewite(name, fn) {
	        var cb = p[name]
	        p[name] = function (a, b) {
	            return  fn.call(this, cb, a, b)
	        }
	    }
	    rewite('removeChild', function (fn, a, b) {
	        fn.call(this, a, b)
	        if (a.nodeType === 1) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })

	    rewite('replaceChild', function (fn, a, b) {
	        fn.call(this, a, b)
	        if (a.nodeType === 1) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })
	    //访问器属性需要用getOwnPropertyDescriptor处理
	    var ep = Element.prototype, oldSetter
	    function newSetter(html) {
	        var all = avalon.slice(this.getElementsByTagName('*'))
	        oldSetter.call(this, html)
	        fireDisposeHooks(all)
	    }
	    if (!Object.getOwnPropertyDescriptor) {
	        oldSetter = ep.__lookupSetter__('innerHTML')
	        ep.__defineSetter__('innerHTML', newSetter)
	    } else {
	        var obj = Object.getOwnPropertyDescriptor(ep, 'innerHTML')
	        oldSetter = obj.set
	        obj.set = newSetter
	        Object.defineProperty(ep, 'innerHTML', obj)
	    }

	    rewite('appendChild', function (fn, a) {
	        fn.call(this, a)
	        if (a.nodeType === 1 && this.nodeType === 11) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })

	    rewite('insertBefore', function (fn, a, b) {
	        fn.call(this, a, b)
	        if (a.nodeType === 1 && this.nodeType === 11) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })
	}

	//用于IE6~8
	var checkDisposeNodes = []
	var checkID = 0
	function byPolling(dom) {
	    avalon.Array.ensure(checkDisposeNodes, dom)
	    if (!checkID) {
	        checkID = setInterval(function () {
	            for (var i = 0, el; el = checkDisposeNodes[i]; ) {
	                if (false === fireDisposeHook(el)) {
	                    avalon.Array.removeAt(checkDisposeNodes, i)
	                } else {
	                    i++
	                }
	            }
	            if (checkDisposeNodes.length == 0) {
	                clearInterval(checkID)
	                checkID = 0
	            }
	        }, 700)
	    }
	}


	module.exports = function onComponentDispose(dom) {
	    if (window.chrome && window.MutationEvent) {
	        byMutationEvent(dom)
	    } else if (avalon.modern && typeof window.Node === 'function') {
	        byRewritePrototype(dom)
	    } else {
	        byPolling(dom)
	    }
	}



/***/ },
/* 75 */
/***/ function(module, exports) {

	function inDomTree(el) {
	    while (el) {
	        if (el.nodeType === 9) {
	            return true
	        }
	        el = el.parentNode
	    }
	    return false
	}

	function fireDisposeHook(el) {
	    if (el.nodeType === 1 && el.getAttribute('wid') && !inDomTree(el)) {
	        var wid = el.getAttribute('wid')
	        var docker = avalon.scopes[ wid ]
	        if (!docker)
	            return
	        var vm = docker.vmodel
	        docker.vmodel.$fire("onDispose", {
	            type: 'dispose',
	            target: el,
	            vmodel: vm
	        })
	        if (docker && !el.getAttribute('cached')) {
	            delete docker.vmodel
	            delete avalon.scopes[ wid ]
	            var is = el.getAttribute('is')
	            var v = el.vtree
	            detachEvents(v)
	            if (v) {
	                v[0][is + '-mount'] = false
	                v[0]['component-ready:' + is] = false
	            }
	        }
	        return false
	    }
	}
	function detachEvents(arr) {
	    for (var i in arr) {
	        var el = arr[i]
	        if (el.nodeType === 1) {
	            for (var i in el) {
	                if (i.indexOf('ms-on') === 0) {
	                    delete el[i]
	                }
	            }
	            if (el.children) {
	                detachEvents(el.children)
	            }
	        }
	    }
	}
	function fireDisposeHookDelay(a) {
	    setTimeout(function () {
	        fireDisposeHook(a)
	    }, 4)
	}
	function fireDisposeHooks(nodes) {
	    for (var i = 0, el; el = nodes[i++]; ) {
	        fireDisposeHook(el)
	    }
	}
	module.exports = {
	    fireDisposeHookDelay: fireDisposeHookDelay,
	    fireDisposeHooks: fireDisposeHooks,
	    fireDisposeHook: fireDisposeHook
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * avalon基于纯净的Object.defineProperties的vm工厂 
	 * masterFactory,slaveFactory,mediatorFactory, ArrayFactory
	 * ------------------------------------------------------------
	 */

	var share = __webpack_require__(77)
	var createViewModel = __webpack_require__(81)

	var isSkip = share.isSkip
	var toJson = share.toJson
	var $$midway = share.$$midway
	var $$skipArray = share.$$skipArray

	var makeAccessor = share.makeAccessor
	var initViewModel = share.initViewModel
	var modelAccessor = share.modelAccessor
	var modelAdaptor = share.modelAdaptor
	var makeHashCode = avalon.makeHashCode


	//一个vm总是为Observer的实例
	function Observer() {
	}

	function masterFactory(definition, heirloom, options) {

	    var $skipArray = {}
	    if (definition.$skipArray) {//收集所有不可监听属性
	        $skipArray = avalon.oneObject(definition.$skipArray)
	        delete definition.$skipArray
	    }

	    var keys = {}
	    options = options || {}
	    heirloom = heirloom || {}
	    var accessors = {}
	    var hashcode = makeHashCode('$')
	    var pathname = options.pathname || ''
	    options.id = options.id || hashcode
	    options.hashcode = options.hashcode || hashcode
	    var key, sid, spath
	    for (key in definition) {
	        if ($$skipArray[key])
	            continue
	        var val = keys[key] = definition[key]
	        if (!isSkip(key, val, $skipArray)) {
	            sid = options.id + '.' + key
	            spath = pathname ? pathname + '.' + key : key
	            accessors[key] = makeAccessor(sid, spath, heirloom)
	        }
	    }

	    accessors.$model = modelAccessor
	    var $vmodel = new Observer()
	    $vmodel = createViewModel($vmodel, accessors, definition)

	    for (key in keys) {
	        //对普通监控属性或访问器属性进行赋值
	        $vmodel[key] = keys[key]

	        //删除系统属性
	        if (key in $skipArray) {
	            delete keys[key]
	        } else {
	            keys[key] = true
	        }
	    }
	    initViewModel($vmodel, heirloom, keys, accessors, options)

	    return $vmodel
	}

	$$midway.masterFactory = masterFactory
	var empty = {}
	function slaveFactory(before, after, heirloom, options) {
	    var keys = {}
	    var skips = {}
	    var accessors = {}
	    heirloom = heirloom || {}
	    var pathname = options.pathname
	    var resue = before.$accessors || {}
	    var key, sid, spath
	    for (key in after) {
	        if ($$skipArray[key])
	            continue
	        keys[key] = true//包括可监控与不可监控的
	        if (!isSkip(key, after[key], empty)) {
	            if (resue[key]) {
	                accessors[key] = resue[key]
	            } else {
	                sid = options.id + '.' + key
	                spath = pathname ? pathname + '.' + key : key
	                accessors[key] = makeAccessor(sid, spath, heirloom)
	            }
	        } else {
	            skips[key] = after[key]
	            delete after[key]
	        }
	    }

	    options.hashcode = before.$hashcode || makeHashCode('$')
	    accessors.$model = modelAccessor
	    var $vmodel = new Observer()
	    $vmodel = createViewModel($vmodel, accessors, skips)

	    for (key in skips) {
	        $vmodel[key] = skips[key]
	    }

	    initViewModel($vmodel, heirloom, keys, accessors, options)

	    return $vmodel
	}

	$$midway.slaveFactory = slaveFactory

	function mediatorFactory(before, after) {
	    var keys = {}, key
	    var accessors = {}//新vm的访问器
	    var unresolve = {}//需要转换的属性集合
	    var heirloom = {}
	    var arr = avalon.slice(arguments)
	    var $skipArray = {}
	    var isWidget = typeof this === 'function' && this.isWidget
	    var config
	    var configName
	    for (var i = 0; i < arr.length; i++) {
	        var obj = arr[i]
	        //收集所有键值对及访问器属性
	        var $accessors = obj.$accessors
	        for (var key in obj) {
	            if (!obj.hasOwnProperty(key)) {
	                continue
	            }
	            var cur = obj[key]
	            if (key === '$skipArray') {//处理$skipArray
	                if (Array.isArray(cur)) {
	                    cur.forEach(function (el) {
	                        $skipArray[el] = 1
	                    })
	                }
	                continue
	            }

	            if (isWidget && arr.indexOf(cur) !== -1) {//处理配置对象
	                config = cur
	                configName = key
	                continue
	            }

	            keys[key] = cur
	            if (accessors[key] && avalon.isObject(cur)) {//处理子vm
	                delete accessors[key]
	            }
	            if ($accessors && $accessors[key]) {
	                accessors[key] = $accessors[key]
	            } else if (typeof keys[key] !== 'function') {
	                unresolve[key] = 1
	            }
	        }
	    }


	    if (typeof this === 'function') {
	        this(keys, unresolve)
	    }
	    for (key in unresolve) {
	        //系统属性跳过,已经有访问器的属性跳过
	        if ($$skipArray[key] || accessors[key])
	            continue
	        if (!isSkip(key, keys[key], $skipArray)) {
	         
	            accessors[key] = makeAccessor(before.$id, key, heirloom)
	            accessors[key].set(keys[key])
	        }
	    }

	    var $vmodel = new Observer()
	    $vmodel = createViewModel($vmodel, accessors, keys)
	    for (key in keys) {
	        if (!accessors[key]) {//添加不可监控的属性
	           
	            $vmodel[key] = keys[key]
	        }
	        //用于通过配置对象触发组件的$watch回调
	        if (isWidget && config && accessors[key] && config.hasOwnProperty(key)) {
	            var GET = accessors[key].get
	          //  GET.heirloom = heirloom
	            if (!GET.$decompose) {
	                GET.$decompose = {}
	            }
	            GET.$decompose[configName + '.' + key] = $vmodel
	        }

	        if (key in $$skipArray) {
	            delete keys[key]
	        } else {
	            keys[key] = true
	        }

	    }

	    initViewModel($vmodel, heirloom, keys, accessors, {
	        id: before.$id,
	        hashcode: makeHashCode('$'),
	        master: true
	    })

	    return $vmodel
	}


	$$midway.mediatorFactory = avalon.mediatorFactory = mediatorFactory

	var __array__ = share.__array__


	var ap = Array.prototype
	var _splice = ap.splice
	function notifySize(array, size) {
	    if (array.length !== size) {
	        array.notify('length', array.length, size, true)
	    }
	}

	__array__.removeAll = function (all) { //移除N个元素
	    var size = this.length
	    if (Array.isArray(all)) {
	        for (var i = this.length - 1; i >= 0; i--) {
	            if (all.indexOf(this[i]) !== -1) {
	                _splice.call(this, i, 1)
	            }
	        }
	    } else if (typeof all === 'function') {
	        for (i = this.length - 1; i >= 0; i--) {
	            var el = this[i]
	            if (all(el, i)) {
	                _splice.call(this, i, 1)
	            }
	        }
	    } else {
	        _splice.call(this, 0, this.length)

	    }
	    if (!avalon.modern) {
	        this.$model = toJson(this)
	    }
	    notifySize(this, size)
	    this.notify()
	}


	var __method__ = ['push', 'pop', 'shift', 'unshift', 'splice']

	__method__.forEach(function (method) {
	    var original = ap[method]
	    __array__[method] = function (a, b) {
	        // 继续尝试劫持数组元素的属性
	        var args = [], size = this.length

	        if (method === 'splice' && Object(this[0]) === this[0]) {
	            var old = this.slice(a, b)
	            var neo = ap.slice.call(arguments, 2)
	            var args = [a, b]
	            for (var j = 0, jn = neo.length; j < jn; j++) {
	                var item = old[j]

	                args[j + 2] = modelAdaptor(neo[j], item, (item && item.$events || {}), {
	                    id: this.$id + '.*',
	                    master: true
	                })
	            }

	        } else {
	            for (var i = 0, n = arguments.length; i < n; i++) {
	                args[i] = modelAdaptor(arguments[i], 0, {}, {
	                    id: this.$id + '.*',
	                    master: true
	                })
	            }
	        }
	        var result = original.apply(this, args)
	        if (!avalon.modern) {
	            this.$model = toJson(this)
	        }
	        notifySize(this, size)
	        this.notify()
	        return result
	    }
	})

	'sort,reverse'.replace(avalon.rword, function (method) {
	    __array__[method] = function () {
	        ap[method].apply(this, arguments)
	        if (!avalon.modern) {
	            this.$model = toJson(this)
	        }
	        this.notify()
	        return this
	    }
	})


	module.exports = avalon
	//使用这个来扁平化数据  https://github.com/gaearon/normalizr
	//使用Promise  https://github.com/stefanpenner/es6-promise
	//使用这个AJAX库 https://github.com/matthew-andrews/isomorphic-fetch

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var share = __webpack_require__(78)
	var canHideProperty = __webpack_require__(80)
	var initEvents = share.initEvents

	/*
	 * toJson
	 * hideProperty
	 * initViewModel
	 */

	function toJson(val) {
	    var xtype = avalon.type(val)
	    if (xtype === 'array') {
	        var array = []
	        for (var i = 0; i < val.length; i++) {
	            array[i] = toJson(val[i])
	        }
	        return array
	    } else if (xtype === 'object') {
	        var obj = {}
	        for (i in val) {
	            if (i === '__proxy__' || i === '__data__' || i === '__const__')
	                continue
	            if (val.hasOwnProperty(i)) {
	                var value = val[i]
	                obj[i] = value && value.nodeType ? value : toJson(value)
	            }
	        }
	        return obj
	    }
	    return val
	}

	function hideProperty(host, name, value) {
	    if (canHideProperty) {
	        Object.defineProperty(host, name, {
	            value: value,
	            writable: true,
	            enumerable: false,
	            configurable: true
	        })
	    } else {
	        host[name] = value
	    }
	}

	var modelAccessor = {
	    get: function () {
	        return toJson(this)
	    },
	    set: avalon.noop,
	    enumerable: false,
	    configurable: true
	}

	function initViewModel($vmodel, heirloom, keys, accessors, options) {

	    if (options.array) {
	        if (avalon.modern) {
	            Object.defineProperty($vmodel, '$model', modelAccessor)
	        } else {
	            $vmodel.$model = toJson($vmodel)
	        }
	    } else {
	        function hasOwnKey(key) {
	            return keys[key] === true
	        }
	        hideProperty($vmodel, '$accessors', accessors)
	        hideProperty($vmodel, 'hasOwnProperty', hasOwnKey)
	        hideProperty($vmodel, '$track', Object.keys(keys).sort().join(';;'))
	    }
	    hideProperty($vmodel, '$id', options.id)
	    hideProperty($vmodel, '$hashcode', options.hashcode)
	    if (options.master === true) {
	        hideProperty($vmodel, '$run', function () {
	            run.call($vmodel)
	        })
	        hideProperty($vmodel, '$wait', function () {
	            wait.call($vmodel)
	        })
	        hideProperty($vmodel, '$element', null)
	        hideProperty($vmodel, '$render', 0)
	        initEvents($vmodel, heirloom)
	    }
	}

	function wait() {
	    this.$events.$$wait$$ = true
	}

	function run() {
	    var host = this.$events
	    delete host.$$wait$$
	    if (host.$$dirty$$) {
	        delete host.$$dirty$$
	        avalon.rerenderStart = new Date
	        var id = this.$id
	        var dotIndex = id.indexOf('.')
	        if (dotIndex > 0) {
	            avalon.batch(id.slice(0, dotIndex))
	        } else {
	            avalon.batch(id)
	        }
	    }
	}

	share.$$midway.initViewModel = initViewModel

	share.$$midway.hideProperty = hideProperty

	var mixin = {
	    toJson: toJson,
	    initViewModel: initViewModel,
	    modelAccessor: modelAccessor
	}
	for (var i in share) {
	    mixin[i] = share[i]
	}

	module.exports = mixin


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	
	var $$midway = {}
	var $$skipArray = __webpack_require__(63)
	var dispatch = __webpack_require__(79)
	var $emit = dispatch.$emit
	var $watch = dispatch.$watch
	/*
	 * initEvents
	 * isSkip
	 * modelAdaptor
	 * makeAccessor
	 */

	function initEvents($vmodel, heirloom) {
	    heirloom.__vmodel__ = $vmodel
	    var hide = $$midway.hideProperty

	    hide($vmodel, '$events', heirloom)
	    hide($vmodel, '$watch', function () {
	        if (arguments.length === 2) {
	            return $watch.apply($vmodel, arguments)
	        } else {
	            throw '$watch方法参数不对'
	        }
	    })
	    hide($vmodel, '$fire', function (expr, a, b) {
	        var list = $vmodel.$events[expr]
	        $emit(list, $vmodel, expr, a, b)
	    })
	}

	var rskip = /function|window|date|regexp|element/i

	function isSkip(key, value, skipArray) {
	    // 判定此属性能否转换访问器
	    return key.charAt(0) === '$' ||
	            skipArray[key] ||
	            (rskip.test(avalon.type(value))) ||
	            (value && value.nodeName && value.nodeType > 0)
	}

	function modelAdaptor(definition, old, heirloom, options) {
	    //如果数组转换为监控数组
	    if (Array.isArray(definition)) {
	        return $$midway.arrayFactory(definition, old, heirloom, options)
	    } else if (Object(definition) === definition && typeof definition !== 'function') {
	        //如果此属性原来就是一个VM,拆分里面的访问器属性
	        if (old && old.$id) {
	            ++avalon.suspendUpdate
	            //1.5带来的优化方案
	            if (old.$track !== Object.keys(definition).sort().join(';;')) {
	                var vm = $$midway.slaveFactory(old, definition, heirloom, options)
	            } else {
	                vm = old
	            }
	            for (var i in definition) {
	                if ($$skipArray[i])
	                    continue
	                vm[i] = definition[i]
	            }
	            --avalon.suspendUpdate
	            return vm
	        } else {
	            vm = $$midway.masterFactory(definition, heirloom, options)
	            return vm
	        }
	    } else {
	        return definition
	    }
	}
	$$midway.modelAdaptor = modelAdaptor


	function makeAccessor(sid, spath, heirloom) {
	    var old = NaN
	    function get() {
	        return old
	    }
	    get.heirloom = heirloom
	    return {
	        get: get,
	        set: function (val) {
	            if (old === val) {
	                return
	            }
	            var vm = heirloom.__vmodel__
	            if (val && typeof val === 'object') {
	                val = $$midway.modelAdaptor(val, old, heirloom, {
	                    pathname: spath,
	                    id: sid
	                })
	            }
	            var older = old
	            old = val
	            if (this.$hashcode && vm ) {
	                vm.$events.$$dirty$$ = true
	                if(vm.$events.$$wait$$)
	                    return
	                //★★确保切换到新的events中(这个events可能是来自oldProxy)               
	                if (heirloom !== vm.$events) {
	                    get.heirloom = vm.$events
	                }
	               
	                //如果这个属性是组件配置对象中的属性,那么它需要触发组件的回调
	                emitWidget(get.$decompose, spath, val, older)
	                //触发普通属性的回调
	                if (spath.indexOf('*') === -1) {
	                    $emit(get.heirloom[spath], vm, spath, val, older)
	                }
	                //如果这个属性是数组元素上的属性
	                emitArray(sid+'', vm, spath, val, older)
	                //如果这个属性存在通配符
	                emitWildcard(get.heirloom, vm, spath, val, older)
	                vm.$events.$$dirty$$ = false
	                batchUpdateView(vm.$id)
	            }
	        },
	        enumerable: true,
	        configurable: true
	    }
	}

	function batchUpdateView(id) {
	    avalon.rerenderStart = new Date
	    var dotIndex = id.indexOf('.')
	    if (dotIndex > 0) {
	        avalon.batch(id.slice(0, dotIndex))
	    } else {
	        avalon.batch(id)
	    }
	}

	var rtopsub = /([^.]+)\.(.+)/
	function emitArray(sid, vm, spath, val, older) {
	    if (sid.indexOf('.*.') > 0) {
	        var arr = sid.match(rtopsub)
	        var top = avalon.vmodels[ arr[1] ]
	        if (top) {
	            var path = arr[2]
	            $emit(top.$events[ path ], vm, spath, val, older)
	        }
	    }
	}

	function emitWidget(whole, spath, val, older) {
	    if (whole && whole[spath]) {
	        var wvm = whole[spath]
	        if (!wvm.$hashcode) {
	            delete whole[spath]
	        } else {
	            var wpath = spath.replace(/^[^.]+\./, '')
	            if (wpath !== spath) {
	                $emit(wvm.$events[wpath], wvm, wpath, val, older)
	            }
	        }
	    }
	}

	function emitWildcard(obj, vm, spath, val, older) {
	    if (obj.__fuzzy__) {
	        obj.__fuzzy__.replace(avalon.rword, function (expr) {
	            var list = obj[expr]
	            var reg = list.reg
	            if (reg && reg.test(spath)) {
	                $emit(list, vm, spath, val, older)
	            }
	            return expr
	        })
	    }
	}


	function define(definition) {
	    var $id = definition.$id
	    if (!$id && avalon.config.debug) {
	        avalon.warn('vm.$id must be specified')
	    }
	    if (avalon.vmodels[$id]) {
	        throw Error('error:[' + $id + '] had defined!')
	    }
	    var vm = $$midway.masterFactory(definition, {}, {
	        pathname: '',
	        id: $id,
	        master: true
	    })

	    return avalon.vmodels[$id] = vm

	}

	function arrayFactory(array, old, heirloom, options) {
	    if (old && old.splice) {
	        var args = [0, old.length].concat(array)
	        ++avalon.suspendUpdate
	        old.splice.apply(old, args)
	        --avalon.suspendUpdate
	        return old
	    } else {
	        for (var i in __array__) {
	            array[i] = __array__[i]
	        }

	        array.notify = function (a, b, c, d) {
	            var vm = heirloom.__vmodel__
	            if (vm) {
	                var path = a === null || a === void 0 ?
	                        options.pathname :
	                        options.pathname + '.' + a
	                vm.$fire(path, b, c)
	                if (!d && !heirloom.$$wait$$ && !avalon.suspendUpdate ) {
	                    batchUpdateView(vm.$id)
	                }
	            }
	        }

	        var hashcode = avalon.makeHashCode('$')
	        options.array = true
	        options.hashcode = hashcode
	        options.id = options.id || hashcode
	        $$midway.initViewModel(array, heirloom, {}, {}, options)

	        for (var j = 0, n = array.length; j < n; j++) {
	            array[j] = modelAdaptor(array[j], 0, {}, {
	                id: array.$id + '.*',
	                master: true
	            })
	        }
	        return array
	    }
	}
	$$midway.arrayFactory = arrayFactory

	var __array__ = {
	    set: function (index, val) {
	        if (((index >>> 0) === index) && this[index] !== val) {
	            if (index > this.length) {
	                throw Error(index + 'set方法的第一个参数不能大于原数组长度')
	            }
	            this.splice(index, 1, val)
	        }
	    },
	    contains: function (el) { //判定是否包含
	        return this.indexOf(el) !== -1
	    },
	    ensure: function (el) {
	        if (!this.contains(el)) { //只有不存在才push
	            this.push(el)
	        }
	        return this
	    },
	    pushArray: function (arr) {
	        return this.push.apply(this, arr)
	    },
	    remove: function (el) { //移除第一个等于给定值的元素
	        return this.removeAt(this.indexOf(el))
	    },
	    removeAt: function (index) { //移除指定索引上的元素
	        if ((index >>> 0) === index) {
	            return this.splice(index, 1)
	        }
	        return []
	    },
	    clear: function () {
	        this.removeAll()
	        return this
	    }
	}
	avalon.define = define

	module.exports = {
	    $$midway: $$midway,
	    $$skipArray: $$skipArray,
	    isSkip: isSkip,
	    __array__: __array__,
	    initEvents: initEvents,
	    makeAccessor: makeAccessor,
	    modelAdaptor: modelAdaptor
	}

/***/ },
/* 79 */
/***/ function(module, exports) {

	
	/**
	 * ------------------------------------------------------------
	 * 属性监听系统 
	 * ------------------------------------------------------------
	 */

	function adjustVm(vm, expr) {
	    var toppath = expr.split(".")[0], other
	    try {
	        if (vm.hasOwnProperty(toppath)) {
	            if (vm.$accessors) {
	                other = vm.$accessors[toppath].get.heirloom.__vmodel__
	            } else {
	                other = Object.getOwnPropertyDescriptor(vm, toppath).get.heirloom.__vmodel__
	            }

	        }
	    } catch (e) {
	    }
	    return other || vm
	}

	function toRegExp(expr) {
	    var arr = expr.split('.')
	    return new RegExp("^" + arr.map(function (el) {
	        return el === '*' ? '(?:[^.]+)' : el
	    }).join('\\.') + '$', 'i')
	}
	function addFuzzy(add, obj, expr) {
	    if (add) {
	        if (obj.__fuzzy__) {
	            if (obj.__fuzzy__.indexOf(',' + expr) === -1) {
	                obj.__fuzzy__ += ',' + expr
	            }
	        } else {
	            obj.__fuzzy__ = expr
	        }
	    }
	}

	function $watch(expr, callback) {
	    var fuzzy = expr.indexOf('.*') > 0 || expr === '*'
	    var vm = fuzzy ? this : $watch.adjust(this, expr)
	    var hive = this.$events
	    var list = hive[expr] || (hive[expr] = [])
	    if (fuzzy) {
	        list.reg = list.reg || toRegExp(expr)
	    }
	    addFuzzy(fuzzy, hive, expr)
	    if (vm !== this) {
	        addFuzzy(fuzzy, this.$events, expr)
	    }

	    avalon.Array.ensure(list, callback)

	    return function () {
	        avalon.Array.remove(list, callback)
	    }
	}

	$watch.adjust = adjustVm
	/**
	 * $fire 方法的内部实现
	 * 
	 * @param {Array} list 订阅者数组
	 * @param {Component} vm
	 * @param {String} path 监听属性名或路径
	 * @param {Any} a 当前值 
	 * @param {Any} b 过去值
	 * @param {Number} i 如果抛错,让下一个继续执行
	 * @returns {undefined}
	 */
	function $emit(list, vm, path, a, b, i) {
	    if (list && list.length) {
	        try {
	            for (i = i || list.length - 1; i >= 0; i--) {
	                var callback = list[i]
	                callback.call(vm, a, b, path)
	            }
	        } catch (e) {
	            if (i - 1 > 0)
	                $emit(list, vm, path, a, b, i - 1)
	            avalon.log(e, path)
	        }

	    }
	}


	module.exports = {
	    $emit: $emit,
	    $watch: $watch,
	    adjustVm: adjustVm
	}


/***/ },
/* 80 */
/***/ function(module, exports) {

	//如果浏览器不支持ecma262v5的Object.defineProperties或者存在BUG，比如IE8
	//标准浏览器使用__defineGetter__, __defineSetter__实现
	var flag = true
	try {
	    Object.defineProperty({}, '_', {
	        value: 'x'
	    })
	} catch (e) {
	    flag = false
	}

	module.exports = flag

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	
	var canHideProperty = __webpack_require__(80)
	var $$skipArray = __webpack_require__(63)


	var defineProperties = Object.defineProperties
	var defineProperty

	var expose = new Date() - 0

	if (!canHideProperty) {
	    if ('__defineGetter__' in avalon) {
	        defineProperty = function (obj, prop, desc) {
	            if ('value' in desc) {
	                obj[prop] = desc.value
	            }
	            if ('get' in desc) {
	                obj.__defineGetter__(prop, desc.get)
	            }
	            if ('set' in desc) {
	                obj.__defineSetter__(prop, desc.set)
	            }
	            return obj
	        }
	        defineProperties = function (obj, descs) {
	            for (var prop in descs) {
	                if (descs.hasOwnProperty(prop)) {
	                    defineProperty(obj, prop, descs[prop])
	                }
	            }
	            return obj
	        }
	    }
	    if (avalon.msie) {
	        var VBClassPool = {}
	        window.execScript([// jshint ignore:line
	            'Function parseVB(code)',
	            '\tExecuteGlobal(code)',
	            'End Function' //转换一段文本为VB代码
	        ].join('\n'), 'VBScript');
	        
	        function VBMediator(instance, accessors, name, value) {// jshint ignore:line
	            var accessor = accessors[name]
	            if (arguments.length === 4) {
	                accessor.set.call(instance, value)
	            } else {
	                return accessor.get.call(instance)
	            }
	        }
	        defineProperties = function (name, accessors, properties) {
	            // jshint ignore:line
	            var buffer = []
	            buffer.push(
	                    '\r\n\tPrivate [__data__], [__proxy__]',
	                    '\tPublic Default Function [__const__](d' + expose + ', p' + expose + ')',
	                    '\t\tSet [__data__] = d' + expose + ': set [__proxy__] = p' + expose,
	                    '\t\tSet [__const__] = Me', //链式调用
	                    '\tEnd Function')
	            //添加普通属性,因为VBScript对象不能像JS那样随意增删属性，必须在这里预先定义好
	            var uniq = {
	               __proxy__: true,
	               __data__: true,
	               __const__: true
	            }

	            //添加访问器属性 
	            for (name in accessors) {
	                uniq[name] = true
	                buffer.push(
	                        //由于不知对方会传入什么,因此set, let都用上
	                        '\tPublic Property Let [' + name + '](val' + expose + ')', //setter
	                        '\t\tCall [__proxy__](Me,[__data__], "' + name + '", val' + expose + ')',
	                        '\tEnd Property',
	                        '\tPublic Property Set [' + name + '](val' + expose + ')', //setter
	                        '\t\tCall [__proxy__](Me,[__data__], "' + name + '", val' + expose + ')',
	                        '\tEnd Property',
	                        '\tPublic Property Get [' + name + ']', //getter
	                        '\tOn Error Resume Next', //必须优先使用set语句,否则它会误将数组当字符串返回
	                        '\t\tSet[' + name + '] = [__proxy__](Me,[__data__],"' + name + '")',
	                        '\tIf Err.Number <> 0 Then',
	                        '\t\t[' + name + '] = [__proxy__](Me,[__data__],"' + name + '")',
	                        '\tEnd If',
	                        '\tOn Error Goto 0',
	                        '\tEnd Property')

	            }
	            for (name in properties) {
	                if (uniq[name] !== true) {
	                    uniq[name] = true
	                    buffer.push('\tPublic [' + name + ']')
	                }
	            }
	            for (name in $$skipArray) {
	                if (uniq[name] !== true) {
	                    uniq[name] = true
	                    buffer.push('\tPublic [' + name + ']')
	                }
	            }
	            buffer.push('\tPublic [' + 'hasOwnProperty' + ']')
	            buffer.push('End Class')
	            var body = buffer.join('\r\n')
	            var className = VBClassPool[body]
	            if (!className) {
	                className = avalon.makeHashCode('VBClass')
	                
	                window.parseVB('Class ' + className + body)
	                window.parseVB([
	                    'Function ' + className + 'Factory(a, b)', //创建实例并传入两个关键的参数
	                    '\tDim o',
	                    '\tSet o = (New ' + className + ')(a, b)',
	                    '\tSet ' + className + 'Factory = o',
	                    'End Function'
	                ].join('\r\n'))
	                VBClassPool[body] = className
	            }
	            var ret = window[className + 'Factory'](accessors, VBMediator) //得到其产品
	            return ret //得到其产品
	        }
	    }
	}

	module.exports = defineProperties


/***/ }
/******/ ])
});
;
},{}],2:[function(require,module,exports){
require('avalon2');
require('./login/view/view.js');
require('./checkInfo/view/view.js');
require('./registerInfo/view/view.js');
require('./registerEnd/view/view.js');

},{"./checkInfo/view/view.js":3,"./login/view/view.js":4,"./registerEnd/view/view.js":5,"./registerInfo/view/view.js":6,"avalon2":1}],3:[function(require,module,exports){
//require('avalon2');
var vm = avalon.define({
    $id: "checkInfo",
    name: "checkInfo",
    array: [11, 22, 333]
});

},{}],4:[function(require,module,exports){
//require('avalon2');
var vm = avalon.define({
    $id: "logIn",
    name: "login",
    array: [11, 22, 333]
});

},{}],5:[function(require,module,exports){
//require('avalon2');
var vm = avalon.define({
    $id: "registerEnd",
    name: "registerEnd",
    array: [11, 22, 33]
});

},{}],6:[function(require,module,exports){
//require('avalon2');
var vm = avalon.define({
    $id: "registerInfo",
    name: "registerInfo",
    array: [11, 22, 33]
});

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXZhbG9uMi9kaXN0L2F2YWxvbi5qcyIsIi9Vc2Vycy9zcnQvbXlkZW1vL2F2YWxvbl9kZW1vL3NyYy9hcHAuanMiLCIvVXNlcnMvc3J0L215ZGVtby9hdmFsb25fZGVtby9zcmMvY2hlY2tJbmZvL3ZpZXcvdmlldy5qcyIsIi9Vc2Vycy9zcnQvbXlkZW1vL2F2YWxvbl9kZW1vL3NyYy9sb2dpbi92aWV3L3ZpZXcuanMiLCIvVXNlcnMvc3J0L215ZGVtby9hdmFsb25fZGVtby9zcmMvcmVnaXN0ZXJFbmQvdmlldy92aWV3LmpzIiwiL1VzZXJzL3NydC9teWRlbW8vYXZhbG9uX2RlbW8vc3JjL3JlZ2lzdGVySW5mby92aWV3L3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3grUUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25CLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2hDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3BDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3ZDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQ3RDOztBQ0xBLHFCQUFxQjtBQUNyQixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ25CLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLElBQUksRUFBRSxXQUFXO0lBQ2pCLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO0NBQ3ZCLENBQUM7OztBQ0xGLHFCQUFxQjtBQUNyQixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ25CLEdBQUcsRUFBRSxPQUFPO0lBQ1osSUFBSSxFQUFFLE9BQU87SUFDYixLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztDQUN2QixDQUFDOzs7QUNMRixxQkFBcUI7QUFDckIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQixHQUFHLEVBQUUsYUFBYTtJQUNsQixJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztDQUN0QixDQUFDOzs7QUNMRixxQkFBcUI7QUFDckIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQixHQUFHLEVBQUUsY0FBYztJQUNuQixJQUFJLEVBQUUsY0FBYztJQUNwQixLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztDQUN0QixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIVxuICogYnVpbHQgaW4gMjAxNi04LTg6MTEgdmVyc2lvbiAyLjExMSBieSDlj7jlvpLmraPnvo5cbiAqIOS/ruatoyBtcy1jbGljayDlnKggbXMtaWYg5LiL5aSx5pWI55qE6Zeu6aKYICMxNjUyXG4gKiDkv67mraMgbGltaXRCeSBCVUdcbiAqIOS/ruatoyDoioLngrnlr7npvZDnrpfms5UgQlVHXG4gKiDkvJjljJYgbWVkaWF0b3JGYWN0b3J5XG4gKiDkv67mraMgZGF0YS1mb3ItcmVuZGVyZWQgQlVHXG4gKi9cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImF2YWxvblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhdmFsb25cIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuXG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XG5cdHZhciBhdmFsb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpIC8v6L+Z5Liq54mI5pys5YW85a65SUU2XG5cblx0X193ZWJwYWNrX3JlcXVpcmVfXyg4KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDM1KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDY2KVxuXHRhdmFsb24ub25Db21wb25lbnREaXNwb3NlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3NClcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg3NilcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF2YWxvblxuXG5cblxuXG4vKioqLyB9LFxuLyogMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XG5cdF9fd2VicGFja19yZXF1aXJlX18oMilcblx0dmFyIGF2YWxvbiA9IF9fd2VicGFja19yZXF1aXJlX18oMylcblx0dmFyIGJyb3dzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpXG5cblx0YXZhbG9uLnNoYWRvd0NvcHkoYXZhbG9uLCBicm93c2VyKVxuXG5cdF9fd2VicGFja19yZXF1aXJlX18oNSlcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg2KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDcpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdmFsb25cblxuLyoqKi8gfSxcbi8qIDIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFxuXHQvKipcblx0ICog5q2k5qih5Z2X5LiN5L6d6LWW5Lu75L2V5qih5Z2XLOeUqOS6juS/ruWkjeivreiogOeahOW6leWxgue8uumZt1xuXHQgKi9cblxuXHR2YXIgb2hhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcblxuXHRpZiAoISflj7jlvpLmraPnvo4nLnRyaW0pIHtcblx0ICAgIHZhciBydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZ1xuXHQgICAgU3RyaW5nLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UocnRyaW0sICcnKVxuXHQgICAgfVxuXHR9XG5cdHZhciBoYXNEb250RW51bUJ1ZyA9ICEoe1xuXHQgICAgJ3RvU3RyaW5nJzogbnVsbFxuXHR9KS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKSxcblx0ICAgICAgICBoYXNQcm90b0VudW1CdWcgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIH0pLnByb3BlcnR5SXNFbnVtZXJhYmxlKCdwcm90b3R5cGUnKSxcblx0ICAgICAgICBkb250RW51bXMgPSBbXG5cdCAgICAgICAgICAgICd0b1N0cmluZycsXG5cdCAgICAgICAgICAgICd0b0xvY2FsZVN0cmluZycsXG5cdCAgICAgICAgICAgICd2YWx1ZU9mJyxcblx0ICAgICAgICAgICAgJ2hhc093blByb3BlcnR5Jyxcblx0ICAgICAgICAgICAgJ2lzUHJvdG90eXBlT2YnLFxuXHQgICAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuXHQgICAgICAgICAgICAnY29uc3RydWN0b3InXG5cdCAgICAgICAgXSxcblx0ICAgICAgICBkb250RW51bXNMZW5ndGggPSBkb250RW51bXMubGVuZ3RoO1xuXHRpZiAoIU9iamVjdC5rZXlzKSB7XG5cdCAgICBPYmplY3Qua2V5cyA9IGZ1bmN0aW9uIChvYmplY3QpIHsgLy9lY21hMjYydjUgMTUuMi4zLjE0XG5cdCAgICAgICAgdmFyIHRoZUtleXMgPSBbXVxuXHQgICAgICAgIHZhciBza2lwUHJvdG8gPSBoYXNQcm90b0VudW1CdWcgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJ1xuXHQgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnc3RyaW5nJyB8fCAob2JqZWN0ICYmIG9iamVjdC5jYWxsZWUpKSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgICAgICAgICB0aGVLZXlzLnB1c2goU3RyaW5nKGkpKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcblx0ICAgICAgICAgICAgICAgIGlmICghKHNraXBQcm90byAmJiBuYW1lID09PSAncHJvdG90eXBlJykgJiZcblx0ICAgICAgICAgICAgICAgICAgICAgICAgb2hhc093bi5jYWxsKG9iamVjdCwgbmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGVLZXlzLnB1c2goU3RyaW5nKG5hbWUpKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKGhhc0RvbnRFbnVtQnVnKSB7XG5cdCAgICAgICAgICAgIHZhciBjdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuXHQgICAgICAgICAgICAgICAgICAgIHNraXBDb25zdHJ1Y3RvciA9IGN0b3IgJiYgY3Rvci5wcm90b3R5cGUgPT09IG9iamVjdFxuXHQgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbnRFbnVtc0xlbmd0aDsgaisrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgZG9udEVudW0gPSBkb250RW51bXNbal1cblx0ICAgICAgICAgICAgICAgIGlmICghKHNraXBDb25zdHJ1Y3RvciAmJiBkb250RW51bSA9PT0gJ2NvbnN0cnVjdG9yJykgJiYgb2hhc093bi5jYWxsKG9iamVjdCwgZG9udEVudW0pKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhlS2V5cy5wdXNoKGRvbnRFbnVtKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB0aGVLZXlzXG5cdCAgICB9XG5cdH1cblx0aWYgKCFBcnJheS5pc0FycmF5KSB7XG5cdCAgICBBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpID09PSAnW29iamVjdCBBcnJheV0nXG5cdCAgICB9XG5cdH1cblxuXHRpZiAoIUFycmF5LmlzQXJyYXkuYmluZCkge1xuXHQgICAgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoc2NvcGUpIHtcblx0ICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIgJiYgc2NvcGUgPT09IHZvaWQgMClcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXNcblx0ICAgICAgICB2YXIgZm4gPSB0aGlzLFxuXHQgICAgICAgICAgICAgICAgYXJndiA9IGFyZ3VtZW50c1xuXHQgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBhcmdzID0gW10sXG5cdCAgICAgICAgICAgICAgICAgICAgaVxuXHQgICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJndi5sZW5ndGg7IGkrKylcblx0ICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhcmd2W2ldKVxuXHQgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuXHQgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSlcblx0ICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHNjb3BlLCBhcmdzKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXHQvL2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3NsaWNlXG5cdC8qKlxuXHQqIFNoaW0gZm9yIFwiZml4aW5nXCIgSUUncyBsYWNrIG9mIHN1cHBvcnQgKElFIDwgOSkgZm9yIGFwcGx5aW5nIHNsaWNlXG5cdCogb24gaG9zdCBvYmplY3RzIGxpa2UgTmFtZWROb2RlTWFwLCBOb2RlTGlzdCwgYW5kIEhUTUxDb2xsZWN0aW9uXG5cdCogKHRlY2huaWNhbGx5LCBzaW5jZSBob3N0IG9iamVjdHMgaGF2ZSBiZWVuIGltcGxlbWVudGF0aW9uLWRlcGVuZGVudCxcblx0KiBhdCBsZWFzdCBiZWZvcmUgRVM2LCBJRSBoYXNuJ3QgbmVlZGVkIHRvIHdvcmsgdGhpcyB3YXkpLlxuXHQqIEFsc28gd29ya3Mgb24gc3RyaW5ncywgZml4ZXMgSUUgPCA5IHRvIGFsbG93IGFuIGV4cGxpY2l0IHVuZGVmaW5lZFxuXHQqIGZvciB0aGUgMm5kIGFyZ3VtZW50IChhcyBpbiBGaXJlZm94KSwgYW5kIHByZXZlbnRzIGVycm9ycyB3aGVuXG5cdCogY2FsbGVkIG9uIG90aGVyIERPTSBvYmplY3RzLlxuXHQqL1xuXG5cdHZhciBfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2Vcblx0dHJ5IHtcblx0ICAgIC8vIENhbid0IGJlIHVzZWQgd2l0aCBET00gZWxlbWVudHMgaW4gSUUgPCA5XG5cdCAgICBfc2xpY2UuY2FsbChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG5cdH0gY2F0Y2ggKGUpIHsgLy8gRmFpbHMgaW4gSUUgPCA5XG5cdCAgICAvLyBUaGlzIHdpbGwgd29yayBmb3IgZ2VudWluZSBhcnJheXMsIGFycmF5LWxpa2Ugb2JqZWN0cyxcblx0ICAgIC8vIE5hbWVkTm9kZU1hcCAoYXR0cmlidXRlcywgZW50aXRpZXMsIG5vdGF0aW9ucyksXG5cdCAgICAvLyBOb2RlTGlzdCAoZS5nLiwgZ2V0RWxlbWVudHNCeVRhZ05hbWUpLCBIVE1MQ29sbGVjdGlvbiAoZS5nLiwgY2hpbGROb2RlcyksXG5cdCAgICAvLyBhbmQgd2lsbCBub3QgZmFpbCBvbiBvdGhlciBET00gb2JqZWN0cyAoYXMgZG8gRE9NIGVsZW1lbnRzIGluIElFIDwgOSlcblx0ICAgIEFycmF5LnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChiZWdpbiwgZW5kKSB7XG5cdCAgICAgICAgLy8gSUUgPCA5IGdldHMgdW5oYXBweSB3aXRoIGFuIHVuZGVmaW5lZCBlbmQgYXJndW1lbnRcblx0ICAgICAgICBlbmQgPSAodHlwZW9mIGVuZCAhPT0gJ3VuZGVmaW5lZCcpID8gZW5kIDogdGhpcy5sZW5ndGhcblxuXHQgICAgICAgIC8vIEZvciBuYXRpdmUgQXJyYXkgb2JqZWN0cywgd2UgdXNlIHRoZSBuYXRpdmUgc2xpY2UgZnVuY3Rpb25cblx0ICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzKSApIHtcblx0ICAgICAgICAgICAgcmV0dXJuIF9zbGljZS5jYWxsKHRoaXMsIGJlZ2luLCBlbmQpXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gRm9yIGFycmF5IGxpa2Ugb2JqZWN0IHdlIGhhbmRsZSBpdCBvdXJzZWx2ZXMuXG5cdCAgICAgICAgdmFyIGksIGNsb25lZCA9IFtdLFxuXHQgICAgICAgICAgICAgICAgc2l6ZSwgbGVuID0gdGhpcy5sZW5ndGhcblxuXHQgICAgICAgIC8vIEhhbmRsZSBuZWdhdGl2ZSB2YWx1ZSBmb3IgXCJiZWdpblwiXG5cdCAgICAgICAgdmFyIHN0YXJ0ID0gYmVnaW4gfHwgMFxuXHQgICAgICAgIHN0YXJ0ID0gKHN0YXJ0ID49IDApID8gc3RhcnQgOiBsZW4gKyBzdGFydFxuXG5cdCAgICAgICAgLy8gSGFuZGxlIG5lZ2F0aXZlIHZhbHVlIGZvciBcImVuZFwiXG5cdCAgICAgICAgdmFyIHVwVG8gPSAoZW5kKSA/IGVuZCA6IGxlblxuXHQgICAgICAgIGlmIChlbmQgPCAwKSB7XG5cdCAgICAgICAgICAgIHVwVG8gPSBsZW4gKyBlbmRcblx0ICAgICAgICB9XG5cblx0ICAgICAgICAvLyBBY3R1YWwgZXhwZWN0ZWQgc2l6ZSBvZiB0aGUgc2xpY2Vcblx0ICAgICAgICBzaXplID0gdXBUbyAtIHN0YXJ0XG5cblx0ICAgICAgICBpZiAoc2l6ZSA+IDApIHtcblx0ICAgICAgICAgICAgY2xvbmVkID0gbmV3IEFycmF5KHNpemUpXG5cdCAgICAgICAgICAgIGlmICh0aGlzLmNoYXJBdCkge1xuXHQgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNpemU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIGNsb25lZFtpXSA9IHRoaXMuY2hhckF0KHN0YXJ0ICsgaSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBjbG9uZWRbaV0gPSB0aGlzW3N0YXJ0ICsgaV1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldHVybiBjbG9uZWRcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGl0ZXJhdG9yKHZhcnMsIGJvZHksIHJldCkge1xuXHQgICAgdmFyIGZ1biA9ICdmb3IodmFyICcgKyB2YXJzICsgJ2k9MCxuID0gdGhpcy5sZW5ndGg7IGkgPCBuOyBpKyspeycgK1xuXHQgICAgICAgICAgICBib2R5LnJlcGxhY2UoJ18nLCAnKChpIGluIHRoaXMpICYmIGZuLmNhbGwoc2NvcGUsdGhpc1tpXSxpLHRoaXMpKScpICtcblx0ICAgICAgICAgICAgJ30nICsgcmV0XG5cdCAgICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cdCAgICByZXR1cm4gRnVuY3Rpb24oJ2ZuLHNjb3BlJywgZnVuKVxuXHQgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cblx0fVxuXG5cdHZhciBhcCA9IEFycmF5LnByb3RvdHlwZVxuXHRpZiAoIS9cXFtuYXRpdmUgY29kZVxcXS8udGVzdChhcC5tYXApKSB7XG5cdCAgICB2YXIgc2hpbSA9IHtcblx0ICAgICAgICAvL+WumuS9jeaTjeS9nO+8jOi/lOWbnuaVsOe7hOS4reesrOS4gOS4quetieS6jue7meWumuWPguaVsOeahOWFg+e0oOeahOe0ouW8leWAvOOAglxuXHQgICAgICAgIGluZGV4T2Y6IGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuXHQgICAgICAgICAgICB2YXIgbiA9IHRoaXMubGVuZ3RoLFxuXHQgICAgICAgICAgICAgICAgICAgIGkgPSB+fmluZGV4XG5cdCAgICAgICAgICAgIGlmIChpIDwgMClcblx0ICAgICAgICAgICAgICAgIGkgKz0gblxuXHQgICAgICAgICAgICBmb3IgKDsgaSA8IG47IGkrKylcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBpdGVtKVxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBpXG5cdCAgICAgICAgICAgIHJldHVybiAtMVxuXHQgICAgICAgIH0sXG5cdCAgICAgICAgLy/lrprkvY3mk43kvZzvvIzlkIzkuIrvvIzkuI3ov4fmmK/ku47lkI7pgY3ljobjgIJcblx0ICAgICAgICBsYXN0SW5kZXhPZjogZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG5cdCAgICAgICAgICAgIHZhciBuID0gdGhpcy5sZW5ndGgsXG5cdCAgICAgICAgICAgICAgICAgICAgaSA9IGluZGV4ID09IG51bGwgPyBuIC0gMSA6IGluZGV4XG5cdCAgICAgICAgICAgIGlmIChpIDwgMClcblx0ICAgICAgICAgICAgICAgIGkgPSBNYXRoLm1heCgwLCBuICsgaSlcblx0ICAgICAgICAgICAgZm9yICg7IGkgPj0gMDsgaS0tKVxuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXNbaV0gPT09IGl0ZW0pXG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlcblx0ICAgICAgICAgICAgcmV0dXJuIC0xXG5cdCAgICAgICAgfSxcblx0ICAgICAgICAvL+i/reS7o+aTjeS9nO+8jOWwhuaVsOe7hOeahOWFg+e0oOaMqOS4quWEv+S8oOWFpeS4gOS4quWHveaVsOS4reaJp+ihjOOAglByb3RvdHlwZS5qc+eahOWvueW6lOWQjeWtl+S4umVhY2jjgIJcblx0ICAgICAgICBmb3JFYWNoOiBpdGVyYXRvcignJywgJ18nLCAnJyksXG5cdCAgICAgICAgLy/ov63ku6Pnsbsg5Zyo5pWw57uE5Lit55qE5q+P5Liq6aG55LiK6L+Q6KGM5LiA5Liq5Ye95pWw77yM5aaC5p6c5q2k5Ye95pWw55qE5YC85Li655yf77yM5YiZ5q2k5YWD57Sg5L2c5Li65paw5pWw57uE55qE5YWD57Sg5pS26ZuG6LW35p2l77yM5bm26L+U5Zue5paw5pWw57uEXG5cdCAgICAgICAgZmlsdGVyOiBpdGVyYXRvcigncj1bXSxqPTAsJywgJ2lmKF8pcltqKytdPXRoaXNbaV0nLCAncmV0dXJuIHInKSxcblx0ICAgICAgICAvL+aUtumbhuaTjeS9nO+8jOWwhuaVsOe7hOeahOWFg+e0oOaMqOS4quWEv+S8oOWFpeS4gOS4quWHveaVsOS4reaJp+ihjO+8jOeEtuWQjuaKiuWug+S7rOeahOi/lOWbnuWAvOe7hOaIkOS4gOS4quaWsOaVsOe7hOi/lOWbnuOAglByb3RvdHlwZS5qc+eahOWvueW6lOWQjeWtl+S4umNvbGxlY3TjgIJcblx0ICAgICAgICBtYXA6IGl0ZXJhdG9yKCdyPVtdLCcsICdyW2ldPV8nLCAncmV0dXJuIHInKSxcblx0ICAgICAgICAvL+WPquimgeaVsOe7hOS4reacieS4gOS4quWFg+e0oOa7oei2s+adoeS7tu+8iOaUvui/m+e7meWumuWHveaVsOi/lOWbnnRydWXvvInvvIzpgqPkuYjlroPlsLHov5Tlm550cnVl44CCUHJvdG90eXBlLmpz55qE5a+55bqU5ZCN5a2X5Li6YW5544CCXG5cdCAgICAgICAgc29tZTogaXRlcmF0b3IoJycsICdpZihfKXJldHVybiB0cnVlJywgJ3JldHVybiBmYWxzZScpLFxuXHQgICAgICAgIC8v5Y+q5pyJ5pWw57uE5Lit55qE5YWD57Sg6YO95ruh6Laz5p2h5Lu277yI5pS+6L+b57uZ5a6a5Ye95pWw6L+U5ZuedHJ1Ze+8ie+8jOWug+aJjei/lOWbnnRydWXjgIJQcm90b3R5cGUuanPnmoTlr7nlupTlkI3lrZfkuLphbGzjgIJcblx0ICAgICAgICBldmVyeTogaXRlcmF0b3IoJycsICdpZighXylyZXR1cm4gZmFsc2UnLCAncmV0dXJuIHRydWUnKVxuXHQgICAgfVxuXG5cdCAgICBmb3IgKHZhciBpIGluIHNoaW0pIHtcblx0ICAgICAgICBhcFtpXSA9IHNoaW1baV1cblx0ICAgIH1cblx0fVxuXHRtb2R1bGUuZXhwb3J0cyA9IHt9XG5cbi8qKiovIH0sXG4vKiAzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7Ly9hdmFsb27nmoTmoLjlv4Ms6L+Z6YeM6YO95piv5LiA5Lqb5LiN5a2Y5Zyo5byC6K6u55qEKuaguOW/gyrmlrnms5XkuI7lsZ7mgKdcblx0ZnVuY3Rpb24gYXZhbG9uKGVsKSB7XG5cdCAgICByZXR1cm4gbmV3IGF2YWxvbi5pbml0KGVsKVxuXHR9XG5cblx0Z2xvYmFsLmF2YWxvbiA9IGF2YWxvblxuXHRpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XG5cdCAgICB3aW5kb3cuYXZhbG9uID0gYXZhbG9uXG5cdH1cblxuXHRhdmFsb24uaW5pdCA9IGZ1bmN0aW9uIChlbCkge1xuXHQgICAgdGhpc1swXSA9IHRoaXMuZWxlbWVudCA9IGVsXG5cdH1cblxuXHRhdmFsb24uZm4gPSBhdmFsb24ucHJvdG90eXBlID0gYXZhbG9uLmluaXQucHJvdG90eXBlXG5cblxuXHRhdmFsb24uc2hhZG93Q29weSA9IGZ1bmN0aW9uIChkZXN0aW5hdGlvbiwgc291cmNlKSB7XG5cdCAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcblx0ICAgICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldXG5cdCAgICB9XG5cdCAgICByZXR1cm4gZGVzdGluYXRpb25cblx0fVxuXG5cdHZhciByd29yZCA9IC9bXiwgXSsvZ1xuXG5cdHZhciBoYXNDb25zb2xlID0gZ2xvYmFsLmNvbnNvbGVcblxuXHRhdmFsb24uc2hhZG93Q29weShhdmFsb24sIHtcblx0ICAgIG5vb3A6IGZ1bmN0aW9uICgpIHtcblx0ICAgIH0sXG5cdCAgICAvL+WIh+WJsuWtl+espuS4suS4uuS4gOS4quS4quWwj+Wdl++8jOS7peepuuagvOaIlumAl+WPt+WIhuW8gOWug+S7rO+8jOe7k+WQiHJlcGxhY2Xlrp7njrDlrZfnrKbkuLLnmoRmb3JFYWNoXG5cdCAgICByd29yZDogcndvcmQsXG5cdCAgICBpbnNwZWN0OiAoe30pLnRvU3RyaW5nLFxuXHQgICAgb2hhc093bjogKHt9KS5oYXNPd25Qcm9wZXJ0eSxcblx0ICAgIGxvZzogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmIChoYXNDb25zb2xlICYmIGF2YWxvbi5jb25maWcuZGVidWcpIHtcblx0ICAgICAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84Nzg1NjI0L2hvdy10by1zYWZlbHktd3JhcC1jb25zb2xlLWxvZ1xuXHQgICAgICAgICAgICBGdW5jdGlvbi5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHdhcm46IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoaGFzQ29uc29sZSAmJiBhdmFsb24uY29uZmlnLmRlYnVnKSB7XG5cdCAgICAgICAgICAgIHZhciBtZXRob2QgPSBjb25zb2xlLndhcm4gfHwgY29uc29sZS5sb2dcblx0ICAgICAgICAgICAgLy8gaHR0cDovL3FpYW5nMTA2Lml0ZXllLmNvbS9ibG9nLzE3MjE0MjVcblx0ICAgICAgICAgICAgRnVuY3Rpb24uYXBwbHkuY2FsbChtZXRob2QsIGNvbnNvbGUsIGFyZ3VtZW50cylcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgZXJyb3I6IGZ1bmN0aW9uIChzdHIsIGUpIHtcblx0ICAgICAgICB0aHJvdyAoZSB8fCBFcnJvcikoc3RyKVxuXHQgICAgfSxcblx0ICAgIC8v5bCG5LiA5Liq5Lul56m65qC85oiW6YCX5Y+36ZqU5byA55qE5a2X56ym5Liy5oiW5pWw57uELOi9rOaNouaIkOS4gOS4qumUruWAvOmDveS4ujHnmoTlr7nosaFcblx0ICAgIG9uZU9iamVjdDogZnVuY3Rpb24gKGFycmF5LCB2YWwpIHtcblx0ICAgICAgICBpZiAodHlwZW9mIGFycmF5ID09PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICBhcnJheSA9IGFycmF5Lm1hdGNoKHJ3b3JkKSB8fCBbXVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcmVzdWx0ID0ge30sXG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbCAhPT0gdm9pZCAwID8gdmFsIDogMVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gYXJyYXkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdFthcnJheVtpXV0gPSB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9XG5cblx0fSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF2YWxvblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwoZXhwb3J0cywgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSgpKSkpXG5cbi8qKiovIH0sXG4vKiA0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7dmFyIHdpbmRvdyA9IGdsb2JhbFxuXHR2YXIgYnJvd3NlciA9IHtcblx0ICAgIHdpbmRvdzogd2luZG93LFxuXHQgICAgZG9jdW1lbnQ6IHsvL+aWueS+v+WcqG5vZGVqc+eOr+Wig+S4jeS8muaKpemUmVxuXHQgICAgICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHt9XG5cdCAgICAgICAgfSxcblx0ICAgICAgICBjcmVhdGVFbGVtZW50TlM6IGZ1bmN0aW9uKCl7XG5cdCAgICAgICAgICAgIHJldHVybiB7fVxuXHQgICAgICAgIH0sXG5cdCAgICAgICAgY29udGFpbnM6IEJvb2xlYW5cblx0ICAgIH0sXG5cdCAgICByb290OiB7XG5cdCAgICAgICAgb3V0ZXJIVE1MOiAneCdcblx0ICAgIH0sXG5cdCAgICBtc2llOiBOYU4sXG5cdCAgICBtb2Rlcm46IHRydWUsXG5cdCAgICBhdmFsb25EaXY6IHt9LFxuXHQgICAgYXZhbG9uRnJhZ21lbnQ6IG51bGxcblx0fVxuXG5cdGlmKHdpbmRvdy5sb2NhdGlvbiAmJiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy53aW5kb3cpe1xuXHQgICAgdmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50XG5cdCAgICBicm93c2VyLmRvY3VtZW50ID0gZG9jdW1lbnRcblx0ICAgIGJyb3dzZXIubW9kZXJuID0gd2luZG93LmRpc3BhdGNoRXZlbnRcblx0ICAgIGJyb3dzZXIucm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuXHQgICAgYnJvd3Nlci5hdmFsb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHQgICAgYnJvd3Nlci5hdmFsb25GcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHQgICAgaWYgKHdpbmRvdy5WQkFycmF5KSB7XG5cdCAgICAgICAgYnJvd3Nlci5tc2llID0gZG9jdW1lbnQuZG9jdW1lbnRNb2RlIHx8ICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPyA3IDogNilcblx0ICAgIH1cblx0fVxuXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBicm93c2VyXG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KCkpKSlcblxuLyoqKi8gfSxcbi8qIDUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8v6L+Z6YeM5pS+572u5a2Y5Zyo5byC6K6u55qE5pa55rOVXG5cblx0dmFyIHNlcmlhbGl6ZSA9IGF2YWxvbi5pbnNwZWN0XG5cdHZhciByd2luZG93ID0gL15cXFtvYmplY3QgKD86V2luZG93fERPTVdpbmRvd3xnbG9iYWwpXFxdJC9cblx0dmFyIHJuYXRpdmUgPSAvXFxbbmF0aXZlIGNvZGVcXF0vIC8v5Yik5a6a5piv5ZCm5Y6f55Sf5Ye95pWwXG5cdHZhciByYXJyYXlsaWtlID0gLyhBcnJheXxMaXN0fENvbGxlY3Rpb258TWFwfEFyZ3VtZW50cylcXF0kL1xuXHR2YXIgb2hhc093biA9IGF2YWxvbi5vaGFzT3duXG5cdC8vIGF2YWxvbi5xdW90ZVxuXHQvL2h0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9qc29uMy9ibG9iL21hc3Rlci9saWIvanNvbjMuanNcblx0dmFyIEVzY2FwZXMgPSB7XG5cdCAgICA5MjogXCJcXFxcXFxcXFwiLFxuXHQgICAgMzQ6ICdcXFxcXCInLFxuXHQgICAgODogXCJcXFxcYlwiLFxuXHQgICAgMTI6IFwiXFxcXGZcIixcblx0ICAgIDEwOiBcIlxcXFxuXCIsXG5cdCAgICAxMzogXCJcXFxcclwiLFxuXHQgICAgOTogXCJcXFxcdFwiXG5cdH1cblxuXHQvLyBJbnRlcm5hbDogQ29udmVydHMgYHZhbHVlYCBpbnRvIGEgemVyby1wYWRkZWQgc3RyaW5nIHN1Y2ggdGhhdCBpdHNcblx0Ly8gbGVuZ3RoIGlzIGF0IGxlYXN0IGVxdWFsIHRvIGB3aWR0aGAuIFRoZSBgd2lkdGhgIG11c3QgYmUgPD0gNi5cblx0dmFyIGxlYWRpbmdaZXJvZXMgPSBcIjAwMDAwMFwiXG5cdHZhciB0b1BhZGRlZFN0cmluZyA9IGZ1bmN0aW9uICh3aWR0aCwgdmFsdWUpIHtcblx0ICAgIC8vIFRoZSBgfHwgMGAgZXhwcmVzc2lvbiBpcyBuZWNlc3NhcnkgdG8gd29yayBhcm91bmQgYSBidWcgaW5cblx0ICAgIC8vIE9wZXJhIDw9IDcuNTR1MiB3aGVyZSBgMCA9PSAtMGAsIGJ1dCBgU3RyaW5nKC0wKSAhPT0gXCIwXCJgLlxuXHQgICAgcmV0dXJuIChsZWFkaW5nWmVyb2VzICsgKHZhbHVlIHx8IDApKS5zbGljZSgtd2lkdGgpXG5cdH07XG5cdHZhciB1bmljb2RlUHJlZml4ID0gXCJcXFxcdTAwXCJcblx0dmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbiAoY2hhcmFjdGVyKSB7XG5cdCAgICB2YXIgY2hhckNvZGUgPSBjaGFyYWN0ZXIuY2hhckNvZGVBdCgwKSwgZXNjYXBlZCA9IEVzY2FwZXNbY2hhckNvZGVdXG5cdCAgICBpZiAoZXNjYXBlZCkge1xuXHQgICAgICAgIHJldHVybiBlc2NhcGVkXG5cdCAgICB9XG5cdCAgICByZXR1cm4gdW5pY29kZVByZWZpeCArIHRvUGFkZGVkU3RyaW5nKDIsIGNoYXJDb2RlLnRvU3RyaW5nKDE2KSlcblx0fTtcblx0dmFyIHJlRXNjYXBlID0gL1tcXHgwMC1cXHgxZlxceDIyXFx4NWNdL2dcblx0ZnVuY3Rpb24gcXVvdGUodmFsdWUpIHtcblx0ICAgIHJlRXNjYXBlLmxhc3RJbmRleCA9IDBcblx0ICAgIHJldHVybiAnXCInICsgKCByZUVzY2FwZS50ZXN0KHZhbHVlKT8gU3RyaW5nKHZhbHVlKS5yZXBsYWNlKHJlRXNjYXBlLCBlc2NhcGVDaGFyKSA6IHZhbHVlICkgKyAnXCInXG5cdH1cblxuXHRhdmFsb24ucXVvdGUgPSB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCcgPyBKU09OLnN0cmluZ2lmeSA6IHF1b3RlXG5cblx0Ly8gYXZhbG9uLnR5cGVcblx0dmFyIGNsYXNzMnR5cGUgPSB7fVxuXHQnQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvcicucmVwbGFjZShhdmFsb24ucndvcmQsIGZ1bmN0aW9uIChuYW1lKSB7XG5cdCAgICBjbGFzczJ0eXBlWydbb2JqZWN0ICcgKyBuYW1lICsgJ10nXSA9IG5hbWUudG9Mb3dlckNhc2UoKVxuXHR9KVxuXG5cdGF2YWxvbi50eXBlID0gZnVuY3Rpb24gKG9iaikgeyAvL+WPluW+l+ebruagh+eahOexu+Wei1xuXHQgICAgaWYgKG9iaiA9PSBudWxsKSB7XG5cdCAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopXG5cdCAgICB9XG5cdCAgICAvLyDml6nmnJ/nmoR3ZWJraXTlhoXmoLjmtY/op4jlmajlrp7njrDkuoblt7Llup/lvIPnmoRlY21hMjYydjTmoIflh4bvvIzlj6/ku6XlsIbmraPliJnlrZfpnaLph4/lvZPkvZzlh73mlbDkvb/nlKjvvIzlm6DmraR0eXBlb2blnKjliKTlrprmraPliJnml7bkvJrov5Tlm55mdW5jdGlvblxuXHQgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicgP1xuXHQgICAgICAgICAgICBjbGFzczJ0eXBlW3NlcmlhbGl6ZS5jYWxsKG9iaildIHx8ICdvYmplY3QnIDpcblx0ICAgICAgICAgICAgdHlwZW9mIG9ialxuXHR9XG5cblx0dmFyIHJmdW5jdGlvbiA9IC9eXFxzKlxcYmZ1bmN0aW9uXFxiL1xuXG5cdGF2YWxvbi5pc0Z1bmN0aW9uID0gdHlwZW9mIGFsZXJ0ID09PSAnb2JqZWN0JyA/IGZ1bmN0aW9uIChmbikge1xuXHQgICAgdHJ5IHtcblx0ICAgICAgICByZXR1cm4gcmZ1bmN0aW9uLnRlc3QoZm4gKyAnJylcblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH1cblx0fSA6IGZ1bmN0aW9uIChmbikge1xuXHQgICAgcmV0dXJuIHNlcmlhbGl6ZS5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJ1xuXHR9XG5cblx0YXZhbG9uLmlzV2luZG93ID0gZnVuY3Rpb24gKG9iaikge1xuXHQgICAgaWYgKCFvYmopXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICAvLyDliKnnlKhJRTY3OCB3aW5kb3cgPT0gZG9jdW1lbnTkuLp0cnVlLGRvY3VtZW50ID09IHdpbmRvd+ern+eEtuS4umZhbHNl55qE56We5aWH54m55oCnXG5cdCAgICAvLyDmoIflh4bmtY/op4jlmajlj4pJRTnvvIxJRTEw562J5L2/55SoIOato+WImeajgOa1i1xuXHQgICAgcmV0dXJuIG9iaiA9PSBvYmouZG9jdW1lbnQgJiYgb2JqLmRvY3VtZW50ICE9IG9iaiAvL2pzaGludCBpZ25vcmU6bGluZVxuXHR9XG5cblxuXHRmdW5jdGlvbiBpc1dpbmRvdyhvYmopIHtcblx0ICAgIHJldHVybiByd2luZG93LnRlc3Qoc2VyaWFsaXplLmNhbGwob2JqKSlcblx0fVxuXG5cdGlmIChpc1dpbmRvdyhhdmFsb24ud2luZG93KSkge1xuXHQgICAgYXZhbG9uLmlzV2luZG93ID0gaXNXaW5kb3dcblx0fVxuXG5cdHZhciBlbnUsIGVudW1lcmF0ZUJVR1xuXHRmb3IgKGVudSBpbiBhdmFsb24oe30pKSB7XG5cdCAgICBicmVha1xuXHR9XG5cdGVudW1lcmF0ZUJVRyA9IGVudSAhPT0gJzAnIC8vSUU25LiL5Li6dHJ1ZSwg5YW25LuW5Li6ZmFsc2VcblxuXHQvKuWIpOWumuaYr+WQpuaYr+S4gOS4quactOe0oOeahGphdmFzY3JpcHTlr7nosaHvvIhPYmplY3TvvInvvIzkuI3mmK9ET03lr7nosaHvvIzkuI3mmK9CT03lr7nosaHvvIzkuI3mmK/oh6rlrprkuYnnsbvnmoTlrp7kvosqL1xuXHRhdmFsb24uaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIChvYmosIGtleSkge1xuXHQgICAgaWYgKCFvYmogfHwgYXZhbG9uLnR5cGUob2JqKSAhPT0gJ29iamVjdCcgfHwgb2JqLm5vZGVUeXBlIHx8IGF2YWxvbi5pc1dpbmRvdyhvYmopKSB7XG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9XG5cdCAgICB0cnkgeyAvL0lF5YaF572u5a+56LGh5rKh5pyJY29uc3RydWN0b3Jcblx0ICAgICAgICBpZiAob2JqLmNvbnN0cnVjdG9yICYmXG5cdCAgICAgICAgICAgICAgICAhb2hhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJykgJiZcblx0ICAgICAgICAgICAgICAgICFvaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSB8fCB7fSwgJ2lzUHJvdG90eXBlT2YnKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgICAgICB9XG5cdCAgICB9IGNhdGNoIChlKSB7IC8vSUU4IDnkvJrlnKjov5nph4zmipvplJlcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH1cblx0ICAgIGlmIChlbnVtZXJhdGVCVUcpIHtcblx0ICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG9oYXNPd24uY2FsbChvYmosIGtleSlcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBmb3IgKGtleSBpbiBvYmopIHtcblx0ICAgIH1cblx0ICAgIHJldHVybiBrZXkgPT09IHZvaWQgMCB8fCBvaGFzT3duLmNhbGwob2JqLCBrZXkpXG5cdH1cblxuXG5cdGlmIChybmF0aXZlLnRlc3QoT2JqZWN0LmdldFByb3RvdHlwZU9mKSkge1xuXHQgICAgYXZhbG9uLmlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cdCAgICAgICAgLy8g566A5Y2V55qEIHR5cGVvZiBvYmogPT09ICdvYmplY3Qn5qOA5rWL77yM5Lya6Ie05L2/55SoaXNQbGFpbk9iamVjdCh3aW5kb3cp5Zyob3BlcmHkuIvpgJrkuI3ov4dcblx0ICAgICAgICByZXR1cm4gc2VyaWFsaXplLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgJiZcblx0ICAgICAgICAgICAgICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBPYmplY3QucHJvdG90eXBlXG5cdCAgICB9XG5cdH1cblxuXHQvL+S4jmpRdWVyeS5leHRlbmTmlrnms5XvvIzlj6/nlKjkuo7mtYXmi7fotJ3vvIzmt7Hmi7fotJ1cblx0YXZhbG9uLm1peCA9IGF2YWxvbi5mbi5taXggPSBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdCAgICAgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSxcblx0ICAgICAgICAgICAgaSA9IDEsXG5cdCAgICAgICAgICAgIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdCAgICAgICAgICAgIGRlZXAgPSBmYWxzZVxuXG5cdCAgICAvLyDlpoLmnpznrKzkuIDkuKrlj4LmlbDkuLrluIPlsJQs5Yik5a6a5piv5ZCm5rex5ou36LSdXG5cdCAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdCAgICAgICAgZGVlcCA9IHRhcmdldFxuXHQgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1sxXSB8fCB7fVxuXHQgICAgICAgIGkrK1xuXHQgICAgfVxuXG5cdCAgICAvL+ehruS/neaOpeWPl+aWueS4uuS4gOS4quWkjeadgueahOaVsOaNruexu+Wei1xuXHQgICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnICYmICFhdmFsb24uaXNGdW5jdGlvbih0YXJnZXQpKSB7XG5cdCAgICAgICAgdGFyZ2V0ID0ge31cblx0ICAgIH1cblxuXHQgICAgLy/lpoLmnpzlj6rmnInkuIDkuKrlj4LmlbDvvIzpgqPkuYjmlrDmiJDlkZjmt7vliqDkuo5taXjmiYDlnKjnmoTlr7nosaHkuIpcblx0ICAgIGlmIChpID09PSBsZW5ndGgpIHtcblx0ICAgICAgICB0YXJnZXQgPSB0aGlzXG5cdCAgICAgICAgaS0tXG5cdCAgICB9XG5cblx0ICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAvL+WPquWkhOeQhumdnuepuuWPguaVsFxuXHQgICAgICAgIGlmICgob3B0aW9ucyA9IGFyZ3VtZW50c1tpXSkgIT0gbnVsbCkge1xuXHQgICAgICAgICAgICBmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICBzcmMgPSB0YXJnZXRbbmFtZV1cblx0ICAgICAgICAgICAgICAgICAgICBjb3B5ID0gb3B0aW9uc1tuYW1lXSAvL+W9k29wdGlvbnPkuLpWQlPlr7nosaHml7bmiqXplJlcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyDpmLLmraLnjq/lvJXnlKhcblx0ICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGNvcHkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGRlZXAgJiYgY29weSAmJiAoYXZhbG9uLmlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0gQXJyYXkuaXNBcnJheShjb3B5KSkpKSB7XG5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoY29weUlzQXJyYXkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29weUlzQXJyYXkgPSBmYWxzZVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZSA9IHNyYyAmJiBBcnJheS5pc0FycmF5KHNyYykgPyBzcmMgOiBbXVxuXG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgYXZhbG9uLmlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gYXZhbG9uLm1peChkZWVwLCBjbG9uZSwgY29weSlcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29weSAhPT0gdm9pZCAwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gY29weVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRhcmdldFxuXHR9XG5cblx0LyrliKTlrprmmK/lkKbnsbvmlbDnu4TvvIzlpoLoioLngrnpm4blkIjvvIznuq/mlbDnu4TvvIxhcmd1bWVudHPkuI7mi6XmnInpnZ7otJ/mlbTmlbDnmoRsZW5ndGjlsZ7mgKfnmoTnuq9KU+WvueixoSovXG5cdGZ1bmN0aW9uIGlzQXJyYXlMaWtlKG9iaikge1xuXHQgICAgaWYgKCFvYmopXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB2YXIgbiA9IG9iai5sZW5ndGhcblx0ICAgIGlmIChuID09PSAobiA+Pj4gMCkpIHsgLy/mo4DmtYtsZW5ndGjlsZ7mgKfmmK/lkKbkuLrpnZ7otJ/mlbTmlbBcblx0ICAgICAgICB2YXIgdHlwZSA9IHNlcmlhbGl6ZS5jYWxsKG9iaikuc2xpY2UoOCwgLTEpXG5cdCAgICAgICAgaWYgKHJhcnJheWxpa2UudGVzdCh0eXBlKSlcblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgaWYgKHR5cGUgPT09ICdBcnJheScpXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgaWYgKHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCAnbGVuZ3RoJykgPT09IGZhbHNlKSB7IC8v5aaC5p6c5piv5Y6f55Sf5a+56LGhXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gcmZ1bmN0aW9uLnRlc3Qob2JqLml0ZW0gfHwgb2JqLmNhbGxlZSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIH0gY2F0Y2ggKGUpIHsgLy9JReeahE5vZGVMaXN055u05o6l5oqb6ZSZXG5cdCAgICAgICAgICAgIHJldHVybiAhb2JqLndpbmRvdyAvL0lFNi04IHdpbmRvd1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBmYWxzZVxuXHR9XG5cblxuXHRhdmFsb24uZWFjaCA9IGZ1bmN0aW9uIChvYmosIGZuKSB7XG5cdCAgICBpZiAob2JqKSB7IC8v5o6S6ZmkbnVsbCwgdW5kZWZpbmVkXG5cdCAgICAgICAgdmFyIGkgPSAwXG5cdCAgICAgICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIgbiA9IG9iai5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmIChmbihpLCBvYmpbaV0pID09PSBmYWxzZSlcblx0ICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgZm9yIChpIGluIG9iaikge1xuXHQgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSAmJiBmbihpLCBvYmpbaV0pID09PSBmYWxzZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIGF2YWxvbjogYXZhbG9uLFxuXHQgICAgaXNBcnJheUxpa2U6IGlzQXJyYXlMaWtlXG5cdH1cblxuXG5cbi8qKiovIH0sXG4vKiA2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgY3NzSG9va3MgPSB7fVxuXHR2YXIgcmh5cGhlbiA9IC8oW2EtelxcZF0pKFtBLVpdKykvZ1xuXHR2YXIgcmNhbWVsaXplID0gL1stX11bXi1fXS9nXG5cdHZhciByaGFzaGNvZGUgPSAvXFxkXFwuXFxkezR9L1xuXHR2YXIgcmVzY2FwZSA9IC9bLS4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2dcblxuXHR2YXIgX3NsaWNlID0gW10uc2xpY2Vcblx0ZnVuY3Rpb24gZGVmYXVsdFBhcnNlKGN1ciwgcHJlLCBiaW5kaW5nKSB7XG5cdCAgICAgICBjdXJbYmluZGluZy5uYW1lXSA9IGF2YWxvbi5wYXJzZUV4cHIoYmluZGluZylcblx0fVxuXHRhdmFsb24uc2hhZG93Q29weShhdmFsb24sIHtcblx0ICAgIGNhY2hlczoge30sIC8vYXZhbG9uMi4wIOaWsOWinlxuXHQgICAgdm1vZGVsczoge30sXG5cdCAgICBmaWx0ZXJzOiB7fSxcblx0ICAgIGNvbXBvbmVudHM6IHt9LC8v5pS+572u57uE5Lu255qE57G7XG5cdCAgICBkaXJlY3RpdmVzOiB7fSxcblx0ICAgIGV2ZW50SG9va3M6IHt9LFxuXHQgICAgZXZlbnRMaXN0ZW5lcnM6IHt9LFxuXHQgICAgdmFsaWRhdG9yczoge30sXG5cdCAgICBzY29wZXM6IHt9LFxuXHQgICAgY3NzSG9va3M6IGNzc0hvb2tzLFxuXHQgICAgcGFyc2Vyczoge1xuXHQgICAgICAgIG51bWJlcjogZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGEgPT09ICcnID8gJycgOiAvXFxkXFwuJC8udGVzdChhKSA/IGEgOiBwYXJzZUZsb2F0KGEpIHx8IDBcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHN0cmluZzogZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGEgPT09IG51bGwgfHwgYSA9PT0gdm9pZCAwID8gJycgOiBhICsgJydcblx0ICAgICAgICB9LFxuXHQgICAgICAgIGJvb2xlYW46IGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgICAgIGlmKGEgPT09ICcnKVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGFcblx0ICAgICAgICAgICAgcmV0dXJuIGEgPT09ICd0cnVlJ3x8IGEgPT0gJzEnXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHZlcnNpb246IFwiMi4xMTFcIixcblx0ICAgIHNsaWNlOiBmdW5jdGlvbiAobm9kZXMsIHN0YXJ0LCBlbmQpIHtcblx0ICAgICAgICByZXR1cm4gX3NsaWNlLmNhbGwobm9kZXMsIHN0YXJ0LCBlbmQpXG5cdCAgICB9LFxuXHQgICAgY3NzOiBmdW5jdGlvbiAobm9kZSwgbmFtZSwgdmFsdWUsIGZuKSB7XG5cdCAgICAgICAgLy/or7vlhpnliKDpmaTlhYPntKDoioLngrnnmoTmoLflvI9cblx0ICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIGF2YWxvbikge1xuXHQgICAgICAgICAgICBub2RlID0gbm9kZVswXVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZihub2RlLm5vZGVUeXBlICE9PTEpe1xuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHByb3AgPSBhdmFsb24uY2FtZWxpemUobmFtZSlcblx0ICAgICAgICBuYW1lID0gYXZhbG9uLmNzc05hbWUocHJvcCkgfHwgcHJvcFxuXHQgICAgICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7IC8v6I635Y+W5qC35byPXG5cdCAgICAgICAgICAgIGZuID0gY3NzSG9va3NbcHJvcCArICc6Z2V0J10gfHwgY3NzSG9va3NbJ0A6Z2V0J11cblx0ICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdiYWNrZ3JvdW5kJykge1xuXHQgICAgICAgICAgICAgICAgbmFtZSA9ICdiYWNrZ3JvdW5kQ29sb3InXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIHZhbCA9IGZuKG5vZGUsIG5hbWUpXG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSA/IHBhcnNlRmxvYXQodmFsKSB8fCAwIDogdmFsXG5cdCAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycpIHsgLy/or7fpmaTmoLflvI9cblx0ICAgICAgICAgICAgbm9kZS5zdHlsZVtuYW1lXSA9ICcnXG5cdCAgICAgICAgfSBlbHNlIHsgLy/orr7nva7moLflvI9cblx0ICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgIT09IHZhbHVlKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoaXNGaW5pdGUodmFsdWUpICYmICFhdmFsb24uY3NzTnVtYmVyW3Byb3BdKSB7XG5cdCAgICAgICAgICAgICAgICB2YWx1ZSArPSAncHgnXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZm4gPSBjc3NIb29rc1twcm9wICsgJzpzZXQnXSB8fCBjc3NIb29rc1snQDpzZXQnXVxuXHQgICAgICAgICAgICBmbihub2RlLCBuYW1lLCB2YWx1ZSlcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgZGlyZWN0aXZlOiBmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXHQgICAgICAgIGRlZmluaXRpb24ucGFyc2UgPSBkZWZpbml0aW9uLnBhcnNlIHx8IGRlZmF1bHRQYXJzZVxuXHQgICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGl2ZXNbbmFtZV0gPSBkZWZpbml0aW9uXG5cdCAgICB9LFxuXHQgICAgaXNPYmplY3Q6IGZ1bmN0aW9uIChhKSB7Ly8xLjbmlrDlop5cblx0ICAgICAgICByZXR1cm4gYSAhPT0gbnVsbCAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCdcblx0ICAgIH0sXG5cdCAgICAvKiBhdmFsb24ucmFuZ2UoMTApXG5cdCAgICAgPT4gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldXG5cdCAgICAgYXZhbG9uLnJhbmdlKDEsIDExKVxuXHQgICAgID0+IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF1cblx0ICAgICBhdmFsb24ucmFuZ2UoMCwgMzAsIDUpXG5cdCAgICAgPT4gWzAsIDUsIDEwLCAxNSwgMjAsIDI1XVxuXHQgICAgIGF2YWxvbi5yYW5nZSgwLCAtMTAsIC0xKVxuXHQgICAgID0+IFswLCAtMSwgLTIsIC0zLCAtNCwgLTUsIC02LCAtNywgLTgsIC05XVxuXHQgICAgIGF2YWxvbi5yYW5nZSgwKVxuXHQgICAgID0+IFtdKi9cblx0ICAgIHJhbmdlOiBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgc3RlcCkgeyAvLyDnlKjkuo7nlJ/miJDmlbTmlbDmlbDnu4Rcblx0ICAgICAgICBzdGVwIHx8IChzdGVwID0gMSlcblx0ICAgICAgICBpZiAoZW5kID09IG51bGwpIHtcblx0ICAgICAgICAgICAgZW5kID0gc3RhcnQgfHwgMFxuXHQgICAgICAgICAgICBzdGFydCA9IDBcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGluZGV4ID0gLTEsXG5cdCAgICAgICAgICAgICAgICBsZW5ndGggPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSxcblx0ICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShsZW5ndGgpXG5cdCAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcblx0ICAgICAgICAgICAgcmVzdWx0W2luZGV4XSA9IHN0YXJ0XG5cdCAgICAgICAgICAgIHN0YXJ0ICs9IHN0ZXBcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfSxcblx0ICAgIGh5cGhlbjogZnVuY3Rpb24gKHRhcmdldCkge1xuXHQgICAgICAgIC8v6L2s5o2i5Li66L+e5a2X56ym57q/6aOO5qC8XG5cdCAgICAgICAgcmV0dXJuIHRhcmdldC5yZXBsYWNlKHJoeXBoZW4sICckMS0kMicpLnRvTG93ZXJDYXNlKClcblx0ICAgIH0sXG5cdCAgICBjYW1lbGl6ZTogZnVuY3Rpb24gKHRhcmdldCkge1xuXHQgICAgICAgIC8v5o+Q5YmN5Yik5pat77yM5o+Q6auYZ2V0U3R5bGXnrYnnmoTmlYjnjodcblx0ICAgICAgICBpZiAoIXRhcmdldCB8fCB0YXJnZXQuaW5kZXhPZignLScpIDwgMCAmJiB0YXJnZXQuaW5kZXhPZignXycpIDwgMCkge1xuXHQgICAgICAgICAgICByZXR1cm4gdGFyZ2V0XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8v6L2s5o2i5Li66am85bOw6aOO5qC8XG5cdCAgICAgICAgcmV0dXJuIHRhcmdldC5yZXBsYWNlKHJjYW1lbGl6ZSwgZnVuY3Rpb24gKG1hdGNoKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBtYXRjaC5jaGFyQXQoMSkudG9VcHBlckNhc2UoKVxuXHQgICAgICAgIH0pXG5cdCAgICB9LFxuXHQgICAgLy/nlJ/miJBVVUlEIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWQtaW4tamF2YXNjcmlwdFxuXHQgICAgbWFrZUhhc2hDb2RlOiBmdW5jdGlvbiAocHJlZml4KSB7XG5cdCAgICAgICAgcHJlZml4ID0gcHJlZml4IHx8ICdhdmFsb24nXG5cdCAgICAgICAgcmV0dXJuIFN0cmluZyhNYXRoLnJhbmRvbSgpICsgTWF0aC5yYW5kb20oKSkucmVwbGFjZShyaGFzaGNvZGUsIHByZWZpeClcblx0ICAgIH0sXG5cdCAgICBlc2NhcGVSZWdFeHA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0ICAgICAgICAvL2h0dHA6Ly9zdGV2ZW5sZXZpdGhhbi5jb20vcmVnZXgveHJlZ2V4cC9cblx0ICAgICAgICAvL+WwhuWtl+espuS4suWuieWFqOagvOW8j+WMluS4uuato+WImeihqOi+vuW8j+eahOa6kOeggVxuXHQgICAgICAgIHJldHVybiAodGFyZ2V0ICsgJycpLnJlcGxhY2UocmVzY2FwZSwgJ1xcXFwkJicpXG5cdCAgICB9LFxuXHQgICAgQXJyYXk6IHtcblx0ICAgICAgICBtZXJnZTogZnVuY3Rpb24gKHRhcmdldCwgb3RoZXIpIHtcblx0ICAgICAgICAgICAgLy/lkIjlubbkuKTkuKrmlbDnu4QgYXZhbG9uMuaWsOWinlxuXHQgICAgICAgICAgICB0YXJnZXQucHVzaC5hcHBseSh0YXJnZXQsIG90aGVyKVxuXHQgICAgICAgIH0sXG5cdCAgICAgICAgZW5zdXJlOiBmdW5jdGlvbiAodGFyZ2V0LCBpdGVtKSB7XG5cdCAgICAgICAgICAgIC8v5Y+q5pyJ5b2T5YmN5pWw57uE5LiN5a2Y5Zyo5q2k5YWD57Sg5pe25Y+q5re75Yqg5a6DXG5cdCAgICAgICAgICAgIGlmICh0YXJnZXQuaW5kZXhPZihpdGVtKSA9PT0gLTEpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQucHVzaChpdGVtKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblx0ICAgICAgICByZW1vdmVBdDogZnVuY3Rpb24gKHRhcmdldCwgaW5kZXgpIHtcblx0ICAgICAgICAgICAgLy/np7vpmaTmlbDnu4TkuK3mjIflrprkvY3nva7nmoTlhYPntKDvvIzov5Tlm57luIPlsJTooajnpLrmiJDlip/kuI7lkKZcblx0ICAgICAgICAgICAgcmV0dXJuICEhdGFyZ2V0LnNwbGljZShpbmRleCwgMSkubGVuZ3RoXG5cdCAgICAgICAgfSxcblx0ICAgICAgICByZW1vdmU6IGZ1bmN0aW9uICh0YXJnZXQsIGl0ZW0pIHtcblx0ICAgICAgICAgICAgLy/np7vpmaTmlbDnu4TkuK3nrKzkuIDkuKrljLnphY3kvKDlj4LnmoTpgqPkuKrlhYPntKDvvIzov5Tlm57luIPlsJTooajnpLrmiJDlip/kuI7lkKZcblx0ICAgICAgICAgICAgdmFyIGluZGV4ID0gdGFyZ2V0LmluZGV4T2YoaXRlbSlcblx0ICAgICAgICAgICAgaWYgKH5pbmRleClcblx0ICAgICAgICAgICAgICAgIHJldHVybiBhdmFsb24uQXJyYXkucmVtb3ZlQXQodGFyZ2V0LCBpbmRleClcblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9KVxuXG5cdGlmKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGVyZm9ybWFuY2Uubm93KXtcblx0ICAgIGF2YWxvbi5tYWtlSGFzaENvZGUgPSBmdW5jdGlvbiAocHJlZml4KSB7XG5cdCAgICAgICAgcHJlZml4ID0gcHJlZml4IHx8ICdhdmFsb24nXG5cdCAgICAgICAgcmV0dXJuIChwcmVmaXggKyBwZXJmb3JtYW5jZS5ub3coKSkucmVwbGFjZSgnLicsICcnKVxuXHQgICAgfVxuXHR9XG5cblx0dmFyIFVVSUQgPSAxXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgLy/nlJ/miJDkuovku7blm57osIPnmoRVVUlEKOeUqOaIt+mAmui/h21zLW9u5oyH5LukKVxuXHQgICAgYXZhbG9uOiBhdmFsb24sXG5cdCAgICBnZXRMb25nSUQ6IGZ1bmN0aW9uIChmbikge1xuXHQgICAgICAgIHJldHVybiBmbi51dWlkIHx8IChmbi51dWlkID0gYXZhbG9uLm1ha2VIYXNoQ29kZSgnZScpKVxuXHQgICAgfSxcblx0ICAgIC8v55Sf5oiQ5LqL5Lu25Zue6LCD55qEVVVJRCjnlKjmiLfpgJrov4dhdmFsb24uYmluZClcblx0ICAgIGdldFNob3J0SUQ6IGZ1bmN0aW9uIChmbikge1xuXHQgICAgICAgIHJldHVybiBmbi51dWlkIHx8IChmbi51dWlkID0gJ18nICsgKCsrVVVJRCkpXG5cdCAgICB9XG5cdH1cblxuXG4vKioqLyB9LFxuLyogNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XG5cdGZ1bmN0aW9uIGtlcm5lbChzZXR0aW5ncykge1xuXHQgICAgZm9yICh2YXIgcCBpbiBzZXR0aW5ncykge1xuXHQgICAgICAgIGlmICghYXZhbG9uLm9oYXNPd24uY2FsbChzZXR0aW5ncywgcCkpXG5cdCAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgdmFyIHZhbCA9IHNldHRpbmdzW3BdXG5cdCAgICAgICAgaWYgKHR5cGVvZiBrZXJuZWwucGx1Z2luc1twXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICBrZXJuZWwucGx1Z2luc1twXSh2YWwpXG5cdCAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Yga2VybmVsW3BdID09PSAnb2JqZWN0Jykge1xuXHQgICAgICAgICAgICBhdmFsb24uc2hhZG93Q29weShrZXJuZWxbcF0sIHZhbClcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBrZXJuZWxbcF0gPSB2YWxcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpc1xuXHR9XG5cblx0YXZhbG9uLmNvbmZpZyA9IGtlcm5lbFxuXG5cdHZhciBwbHVnaW5zID0ge1xuXHQgICAgaW50ZXJwb2xhdGU6IGZ1bmN0aW9uIChhcnJheSkge1xuXHQgICAgICAgIHZhciBvcGVuVGFnID0gYXJyYXlbMF1cblx0ICAgICAgICB2YXIgY2xvc2VUYWcgPSBhcnJheVsxXVxuXHQgICAgICAgIC8qZXNsaW50LWRpc2FibGUgKi9cblx0ICAgICAgICBpZiAob3BlblRhZyA9PT0gY2xvc2VUYWcpIHtcblx0ICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdvcGVuVGFnIT09Y2xvc2VUYWcnKVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgdGVzdCA9IG9wZW5UYWcgKyAndGVzdCcgKyBjbG9zZVRhZ1xuXHQgICAgICAgIHZhciBkaXYgPSBhdmFsb24uYXZhbG9uRGl2XG5cdCAgICAgICAgZGl2LmlubmVySFRNTCA9IHRlc3Rcblx0ICAgICAgICBpZiAoZGl2LmlubmVySFRNTCAhPT0gdGVzdCAmJiBkaXYuaW5uZXJIVE1MLmluZGV4T2YoJyZsdDsnKSA+IC0xKSB7XG5cdCAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcign5q2k5a6a55WM56ym5LiN5ZCI5rOVJylcblx0ICAgICAgICB9XG5cdCAgICAgICAgZGl2LmlubmVySFRNTCA9ICcnXG5cdCAgICAgICAgLyplc2xpbnQtZW5hYmxlICovXG5cdCAgICAgICAga2VybmVsLm9wZW5UYWcgPSBvcGVuVGFnXG5cdCAgICAgICAga2VybmVsLmNsb3NlVGFnID0gY2xvc2VUYWdcblx0ICAgICAgICB2YXIgbyA9IGF2YWxvbi5lc2NhcGVSZWdFeHAob3BlblRhZylcblx0ICAgICAgICB2YXIgYyA9IGF2YWxvbi5lc2NhcGVSZWdFeHAoY2xvc2VUYWcpXG5cdCAgICAgICAga2VybmVsLnJleHByID0gbmV3IFJlZ0V4cChvICsgJyhbXFxcXHNcXFxcU10qKScgKyBjKVxuXHQgICAgICAgIGtlcm5lbC5yZXhwcmcgPSBuZXcgUmVnRXhwKG8gKyAnKFtcXFxcc1xcXFxTXSopJyArIGMsICdnJylcblx0ICAgICAgICBrZXJuZWwucmJpbmQgPSBuZXcgUmVnRXhwKG8gKyAnW1xcXFxzXFxcXFNdKicgKyBjICsgJ3xcXFxcYm1zLXxcXFxcYnNsb3RcXFxcYicpXG5cdCAgICB9XG5cdH1cblx0a2VybmVsLnBsdWdpbnMgPSBwbHVnaW5zXG5cdGF2YWxvbi5jb25maWcoe1xuXHQgICAgaW50ZXJwb2xhdGU6IFsne3snLCAnfX0nXSxcblx0ICAgIGRlYnVnOiB0cnVlXG5cdH0pXG5cblxuLyoqKi8gfSxcbi8qIDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFxuXHR2YXIgbnVtYmVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KVxuXHR2YXIgc2FuaXRpemUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKVxuXHR2YXIgZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpXG5cdHZhciBhcnJheUZpbHRlcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKVxuXHR2YXIgZXZlbnRGaWx0ZXJzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMylcblx0dmFyIGZpbHRlcnMgPSBhdmFsb24uZmlsdGVyc1xuXG5cdGZ1bmN0aW9uIEsoYSkge1xuXHQgICAgcmV0dXJuIGFcblx0fVxuXG5cdGF2YWxvbi5fX2Zvcm1hdF9fID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0ICAgIHZhciBmbiA9IGZpbHRlcnNbbmFtZV1cblx0ICAgIGlmIChmbikge1xuXHQgICAgICAgIHJldHVybiBmbi5nZXQgPyBmbi5nZXQgOiBmblxuXHQgICAgfVxuXHQgICAgcmV0dXJuIEtcblx0fVxuXG5cblx0YXZhbG9uLm1peChmaWx0ZXJzLCB7XG5cdCAgICB1cHBlcmNhc2U6IGZ1bmN0aW9uIChzdHIpIHtcblx0ICAgICAgICByZXR1cm4gU3RyaW5nKHN0cikudG9VcHBlckNhc2UoKVxuXHQgICAgfSxcblx0ICAgIGxvd2VyY2FzZTogZnVuY3Rpb24gKHN0cikge1xuXHQgICAgICAgIHJldHVybiBTdHJpbmcoc3RyKS50b0xvd2VyQ2FzZSgpXG5cdCAgICB9LFxuXHQgICAgdHJ1bmNhdGU6IGZ1bmN0aW9uIChzdHIsIGxlbmd0aCwgdHJ1bmNhdGlvbikge1xuXHQgICAgICAgIC8vbGVuZ3Ro77yM5paw5a2X56ym5Liy6ZW/5bqm77yMdHJ1bmNhdGlvbu+8jOaWsOWtl+espuS4sueahOe7k+WwvueahOWtl+autSzov5Tlm57mlrDlrZfnrKbkuLJcblx0ICAgICAgICBsZW5ndGggPSBsZW5ndGggfHwgMzBcblx0ICAgICAgICB0cnVuY2F0aW9uID0gdHlwZW9mIHRydW5jYXRpb24gPT09IFwic3RyaW5nXCIgPyB0cnVuY2F0aW9uIDogXCIuLi5cIlxuXHQgICAgICAgIHJldHVybiBzdHIubGVuZ3RoID4gbGVuZ3RoID9cblx0ICAgICAgICAgICAgICAgIHN0ci5zbGljZSgwLCBsZW5ndGggLSB0cnVuY2F0aW9uLmxlbmd0aCkgKyB0cnVuY2F0aW9uIDpcblx0ICAgICAgICAgICAgICAgIFN0cmluZyhzdHIpXG5cdCAgICB9LFxuXHQgICAgY2FtZWxpemU6IGF2YWxvbi5jYW1lbGl6ZSxcblx0ICAgIGRhdGU6IGRhdGUsXG5cdCAgICBlc2NhcGU6IGF2YWxvbi5lc2NhcGVIdG1sLFxuXHQgICAgc2FuaXRpemU6IHNhbml0aXplLFxuXHQgICAgbnVtYmVyOiBudW1iZXIsXG5cdCAgICBjdXJyZW5jeTogZnVuY3Rpb24gKGFtb3VudCwgc3ltYm9sLCBmcmFjdGlvblNpemUpIHtcblx0ICAgICAgICByZXR1cm4gKHN5bWJvbCB8fCBcIlxcdUZGRTVcIikgK1xuXHQgICAgICAgICAgICAgICAgbnVtYmVyKGFtb3VudCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaXNGaW5pdGUoZnJhY3Rpb25TaXplKSA/IGZyYWN0aW9uU2l6ZSA6IDIpXG5cdCAgICB9XG5cdH0sIGFycmF5RmlsdGVycywgZXZlbnRGaWx0ZXJzKVxuXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdmFsb25cblxuLyoqKi8gfSxcbi8qIDkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdGZ1bmN0aW9uIG51bWJlcihudW1iZXIsIGRlY2ltYWxzLCBwb2ludCwgdGhvdXNhbmRzKSB7XG5cdCAgICAvL2Zvcm0gaHR0cDovL3BocGpzLm9yZy9mdW5jdGlvbnMvbnVtYmVyX2Zvcm1hdC9cblx0ICAgIC8vbnVtYmVyIOW/hemcgO+8jOimgeagvOW8j+WMlueahOaVsOWtl1xuXHQgICAgLy9kZWNpbWFscyDlj6/pgInvvIzop4TlrprlpJrlsJHkuKrlsI/mlbDkvY3jgIJcblx0ICAgIC8vcG9pbnQg5Y+v6YCJ77yM6KeE5a6a55So5L2c5bCP5pWw54K555qE5a2X56ym5Liy77yI6buY6K6k5Li6IC4g77yJ44CCXG5cdCAgICAvL3Rob3VzYW5kcyDlj6/pgInvvIzop4TlrprnlKjkvZzljYPkvY3liIbpmpTnrKbnmoTlrZfnrKbkuLLvvIjpu5jorqTkuLogLCDvvInvvIzlpoLmnpzorr7nva7kuobor6Xlj4LmlbDvvIzpgqPkuYjmiYDmnInlhbbku5blj4LmlbDpg73mmK/lv4XpnIDnmoTjgIJcblx0ICAgIG51bWJlciA9IChudW1iZXIgKyAnJylcblx0ICAgICAgICAgICAgLnJlcGxhY2UoL1teMC05K1xcLUVlLl0vZywgJycpXG5cdCAgICB2YXIgbiA9ICFpc0Zpbml0ZSgrbnVtYmVyKSA/IDAgOiArbnVtYmVyLFxuXHQgICAgICAgICAgICBwcmVjID0gIWlzRmluaXRlKCtkZWNpbWFscykgPyAzIDogTWF0aC5hYnMoZGVjaW1hbHMpLFxuXHQgICAgICAgICAgICBzZXAgPSB0aG91c2FuZHMgfHwgXCIsXCIsXG5cdCAgICAgICAgICAgIGRlYyA9IHBvaW50IHx8IFwiLlwiLFxuXHQgICAgICAgICAgICBzID0gJycsXG5cdCAgICAgICAgICAgIHRvRml4ZWRGaXggPSBmdW5jdGlvbiAobiwgcHJlYykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGsgPSBNYXRoLnBvdygxMCwgcHJlYylcblx0ICAgICAgICAgICAgICAgIHJldHVybiAnJyArIChNYXRoLnJvdW5kKG4gKiBrKSAvIGspXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC50b0ZpeGVkKHByZWMpXG5cdCAgICAgICAgICAgIH1cblx0ICAgIC8vIEZpeCBmb3IgSUUgcGFyc2VGbG9hdCgwLjU1KS50b0ZpeGVkKDApID0gMDtcblx0ICAgIHMgPSAocHJlYyA/IHRvRml4ZWRGaXgobiwgcHJlYykgOiAnJyArIE1hdGgucm91bmQobikpXG5cdCAgICAgICAgICAgIC5zcGxpdCgnLicpXG5cdCAgICBpZiAoc1swXS5sZW5ndGggPiAzKSB7XG5cdCAgICAgICAgc1swXSA9IHNbMF0ucmVwbGFjZSgvXFxCKD89KD86XFxkezN9KSsoPyFcXGQpKS9nLCBzZXApXG5cdCAgICB9XG5cdCAgICBpZiAoKHNbMV0gfHwgJycpXG5cdCAgICAgICAgICAgIC5sZW5ndGggPCBwcmVjKSB7XG5cdCAgICAgICAgc1sxXSA9IHNbMV0gfHwgJydcblx0ICAgICAgICBzWzFdICs9IG5ldyBBcnJheShwcmVjIC0gc1sxXS5sZW5ndGggKyAxKVxuXHQgICAgICAgICAgICAgICAgLmpvaW4oJzAnKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHMuam9pbihkZWMpXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IG51bWJlclxuXG5cdC8v5aSE55CGIOi0p+W4gSBodHRwOi8vb3BlbmV4Y2hhbmdlcmF0ZXMuZ2l0aHViLmlvL2FjY291bnRpbmcuanMvXG5cbi8qKiovIH0sXG4vKiAxMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIHJzY3JpcHRzID0gLzxzY3JpcHRbXj5dKj4oW1xcU1xcc10qPyk8XFwvc2NyaXB0XFxzKj4vZ2ltXG5cdHZhciByb24gPSAvXFxzKyhvbltePVxcc10rKSg/Oj0oXCJbXlwiXSpcInwnW14nXSonfFteXFxzPl0rKSk/L2dcblx0dmFyIHJvcGVuID0gLzxcXHcrXFxiKD86KFtcIiddKVteXCJdKj8oXFwxKXxbXj5dKSo+L2lnXG5cdHZhciByc2FuaXRpemUgPSB7XG5cdCAgICBhOiAvXFxiKGhyZWYpXFw9KFwiamF2YXNjcmlwdFteXCJdKlwifCdqYXZhc2NyaXB0W14nXSonKS9pZyxcblx0ICAgIGltZzogL1xcYihzcmMpXFw9KFwiamF2YXNjcmlwdFteXCJdKlwifCdqYXZhc2NyaXB0W14nXSonKS9pZyxcblx0ICAgIGZvcm06IC9cXGIoYWN0aW9uKVxcPShcImphdmFzY3JpcHRbXlwiXSpcInwnamF2YXNjcmlwdFteJ10qJykvaWdcblx0fVxuXG5cblx0Ly9odHRwczovL3d3dy5vd2FzcC5vcmcvaW5kZXgucGhwL1hTU19GaWx0ZXJfRXZhc2lvbl9DaGVhdF9TaGVldFxuXHQvLyAgICA8YSBocmVmPVwiamF2YXNjJk5ld0xpbmU7cmlwdCZjb2xvbjthbGVydCgnWFNTJylcIj5jaHJvbWU8L2E+IFxuXHQvLyAgICA8YSBocmVmPVwiZGF0YTp0ZXh0L2h0bWw7YmFzZTY0LCBQR2x0WnlCemNtTTllQ0J2Ym1WeWNtOXlQV0ZzWlhKMEtERXBQZz09XCI+Y2hyb21lPC9hPlxuXHQvLyAgICA8YSBocmVmPVwiamF2XHRhc2NyaXB0OmFsZXJ0KCdYU1MnKTtcIj5JRTY3Y2hyb21lPC9hPlxuXHQvLyAgICA8YSBocmVmPVwiamF2JiN4MDk7YXNjcmlwdDphbGVydCgnWFNTJyk7XCI+SUU2N2Nocm9tZTwvYT5cblx0Ly8gICAgPGEgaHJlZj1cImphdiYjeDBBO2FzY3JpcHQ6YWxlcnQoJ1hTUycpO1wiPklFNjdjaHJvbWU8L2E+XG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2FuaXRpemUoc3RyKSB7XG5cdCAgICByZXR1cm4gc3RyLnJlcGxhY2UocnNjcmlwdHMsIFwiXCIpLnJlcGxhY2Uocm9wZW4sIGZ1bmN0aW9uIChhLCBiKSB7XG5cdCAgICAgICAgdmFyIG1hdGNoID0gYS50b0xvd2VyQ2FzZSgpLm1hdGNoKC88KFxcdyspXFxzLylcblx0ICAgICAgICBpZiAobWF0Y2gpIHsgLy/lpITnkIZh5qCH562+55qEaHJlZuWxnuaAp++8jGltZ+agh+etvueahHNyY+WxnuaAp++8jGZvcm3moIfnrb7nmoRhY3Rpb27lsZ7mgKdcblx0ICAgICAgICAgICAgdmFyIHJlZyA9IHJzYW5pdGl6ZVttYXRjaFsxXV1cblx0ICAgICAgICAgICAgaWYgKHJlZykge1xuXHQgICAgICAgICAgICAgICAgYSA9IGEucmVwbGFjZShyZWcsIGZ1bmN0aW9uIChzLCBuYW1lLCB2YWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBxdW90ZSA9IHZhbHVlLmNoYXJBdCgwKVxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBuYW1lICsgXCI9XCIgKyBxdW90ZSArIFwiamF2YXNjcmlwdDp2b2lkKDApXCIgKyBxdW90ZS8vIGpzaGludCBpZ25vcmU6bGluZVxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYS5yZXBsYWNlKHJvbiwgXCIgXCIpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpIC8v56e76Zmkb25YWFjkuovku7Zcblx0ICAgIH0pXG5cdH1cblxuXG4vKioqLyB9LFxuLyogMTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAneXl5eSc6IDQgZGlnaXQgcmVwcmVzZW50YXRpb24gb2YgeWVhciAoZS5nLiBBRCAxID0+IDAwMDEsIEFEIDIwMTAgPT4gMjAxMClcblx0ICd5eSc6IDIgZGlnaXQgcmVwcmVzZW50YXRpb24gb2YgeWVhciwgcGFkZGVkICgwMC05OSkuIChlLmcuIEFEIDIwMDEgPT4gMDEsIEFEIDIwMTAgPT4gMTApXG5cdCAneSc6IDEgZGlnaXQgcmVwcmVzZW50YXRpb24gb2YgeWVhciwgZS5nLiAoQUQgMSA9PiAxLCBBRCAxOTkgPT4gMTk5KVxuXHQgJ01NTU0nOiBNb250aCBpbiB5ZWFyIChKYW51YXJ5LURlY2VtYmVyKVxuXHQgJ01NTSc6IE1vbnRoIGluIHllYXIgKEphbi1EZWMpXG5cdCAnTU0nOiBNb250aCBpbiB5ZWFyLCBwYWRkZWQgKDAxLTEyKVxuXHQgJ00nOiBNb250aCBpbiB5ZWFyICgxLTEyKVxuXHQgJ2RkJzogRGF5IGluIG1vbnRoLCBwYWRkZWQgKDAxLTMxKVxuXHQgJ2QnOiBEYXkgaW4gbW9udGggKDEtMzEpXG5cdCAnRUVFRSc6IERheSBpbiBXZWVrLChTdW5kYXktU2F0dXJkYXkpXG5cdCAnRUVFJzogRGF5IGluIFdlZWssIChTdW4tU2F0KVxuXHQgJ0hIJzogSG91ciBpbiBkYXksIHBhZGRlZCAoMDAtMjMpXG5cdCAnSCc6IEhvdXIgaW4gZGF5ICgwLTIzKVxuXHQgJ2hoJzogSG91ciBpbiBhbS9wbSwgcGFkZGVkICgwMS0xMilcblx0ICdoJzogSG91ciBpbiBhbS9wbSwgKDEtMTIpXG5cdCAnbW0nOiBNaW51dGUgaW4gaG91ciwgcGFkZGVkICgwMC01OSlcblx0ICdtJzogTWludXRlIGluIGhvdXIgKDAtNTkpXG5cdCAnc3MnOiBTZWNvbmQgaW4gbWludXRlLCBwYWRkZWQgKDAwLTU5KVxuXHQgJ3MnOiBTZWNvbmQgaW4gbWludXRlICgwLTU5KVxuXHQgJ2EnOiBhbS9wbSBtYXJrZXJcblx0ICdaJzogNCBkaWdpdCAoK3NpZ24pIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0aW1lem9uZSBvZmZzZXQgKC0xMjAwLSsxMjAwKVxuXHQgZm9ybWF0IHN0cmluZyBjYW4gYWxzbyBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZyBwcmVkZWZpbmVkIGxvY2FsaXphYmxlIGZvcm1hdHM6XG5cdCBcblx0ICdtZWRpdW0nOiBlcXVpdmFsZW50IHRvICdNTU0gZCwgeSBoOm1tOnNzIGEnIGZvciBlbl9VUyBsb2NhbGUgKGUuZy4gU2VwIDMsIDIwMTAgMTI6MDU6MDggcG0pXG5cdCAnc2hvcnQnOiBlcXVpdmFsZW50IHRvICdNL2QveXkgaDptbSBhJyBmb3IgZW5fVVMgbG9jYWxlIChlLmcuIDkvMy8xMCAxMjowNSBwbSlcblx0ICdmdWxsRGF0ZSc6IGVxdWl2YWxlbnQgdG8gJ0VFRUUsIE1NTU0gZCx5JyBmb3IgZW5fVVMgbG9jYWxlIChlLmcuIEZyaWRheSwgU2VwdGVtYmVyIDMsIDIwMTApXG5cdCAnbG9uZ0RhdGUnOiBlcXVpdmFsZW50IHRvICdNTU1NIGQsIHknIGZvciBlbl9VUyBsb2NhbGUgKGUuZy4gU2VwdGVtYmVyIDMsIDIwMTBcblx0ICdtZWRpdW1EYXRlJzogZXF1aXZhbGVudCB0byAnTU1NIGQsIHknIGZvciBlbl9VUyBsb2NhbGUgKGUuZy4gU2VwIDMsIDIwMTApXG5cdCAnc2hvcnREYXRlJzogZXF1aXZhbGVudCB0byAnTS9kL3l5JyBmb3IgZW5fVVMgbG9jYWxlIChlLmcuIDkvMy8xMClcblx0ICdtZWRpdW1UaW1lJzogZXF1aXZhbGVudCB0byAnaDptbTpzcyBhJyBmb3IgZW5fVVMgbG9jYWxlIChlLmcuIDEyOjA1OjA4IHBtKVxuXHQgJ3Nob3J0VGltZSc6IGVxdWl2YWxlbnQgdG8gJ2g6bW0gYScgZm9yIGVuX1VTIGxvY2FsZSAoZS5nLiAxMjowNSBwbSlcblx0ICovXG5cblx0ZnVuY3Rpb24gdG9JbnQoc3RyKSB7XG5cdCAgICByZXR1cm4gcGFyc2VJbnQoc3RyLCAxMCkgfHwgMFxuXHR9XG5cblx0ZnVuY3Rpb24gcGFkTnVtYmVyKG51bSwgZGlnaXRzLCB0cmltKSB7XG5cdCAgICB2YXIgbmVnID0gJydcblx0ICAgIGlmIChudW0gPCAwKSB7XG5cdCAgICAgICAgbmVnID0gJy0nXG5cdCAgICAgICAgbnVtID0gLW51bVxuXHQgICAgfVxuXHQgICAgbnVtID0gJycgKyBudW1cblx0ICAgIHdoaWxlIChudW0ubGVuZ3RoIDwgZGlnaXRzKVxuXHQgICAgICAgIG51bSA9ICcwJyArIG51bVxuXHQgICAgaWYgKHRyaW0pXG5cdCAgICAgICAgbnVtID0gbnVtLnN1YnN0cihudW0ubGVuZ3RoIC0gZGlnaXRzKVxuXHQgICAgcmV0dXJuIG5lZyArIG51bVxuXHR9XG5cblx0ZnVuY3Rpb24gZGF0ZUdldHRlcihuYW1lLCBzaXplLCBvZmZzZXQsIHRyaW0pIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAoZGF0ZSkge1xuXHQgICAgICAgIHZhciB2YWx1ZSA9IGRhdGVbXCJnZXRcIiArIG5hbWVdKClcblx0ICAgICAgICBpZiAob2Zmc2V0ID4gMCB8fCB2YWx1ZSA+IC1vZmZzZXQpXG5cdCAgICAgICAgICAgIHZhbHVlICs9IG9mZnNldFxuXHQgICAgICAgIGlmICh2YWx1ZSA9PT0gMCAmJiBvZmZzZXQgPT09IC0xMikge1xuXHQgICAgICAgICAgICB2YWx1ZSA9IDEyXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBwYWROdW1iZXIodmFsdWUsIHNpemUsIHRyaW0pXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBkYXRlU3RyR2V0dGVyKG5hbWUsIHNob3J0Rm9ybSkge1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlLCBmb3JtYXRzKSB7XG5cdCAgICAgICAgdmFyIHZhbHVlID0gZGF0ZVtcImdldFwiICsgbmFtZV0oKVxuXHQgICAgICAgIHZhciBnZXQgPSAoc2hvcnRGb3JtID8gKFwiU0hPUlRcIiArIG5hbWUpIDogbmFtZSkudG9VcHBlckNhc2UoKVxuXHQgICAgICAgIHJldHVybiBmb3JtYXRzW2dldF1bdmFsdWVdXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiB0aW1lWm9uZUdldHRlcihkYXRlKSB7XG5cdCAgICB2YXIgem9uZSA9IC0xICogZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpXG5cdCAgICB2YXIgcGFkZGVkWm9uZSA9ICh6b25lID49IDApID8gXCIrXCIgOiBcIlwiXG5cdCAgICBwYWRkZWRab25lICs9IHBhZE51bWJlcihNYXRoW3pvbmUgPiAwID8gXCJmbG9vclwiIDogXCJjZWlsXCJdKHpvbmUgLyA2MCksIDIpICsgcGFkTnVtYmVyKE1hdGguYWJzKHpvbmUgJSA2MCksIDIpXG5cdCAgICByZXR1cm4gcGFkZGVkWm9uZVxuXHR9XG5cdC8v5Y+W5b6X5LiK5Y2I5LiL5Y2IXG5cblx0ZnVuY3Rpb24gYW1wbUdldHRlcihkYXRlLCBmb3JtYXRzKSB7XG5cdCAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyBmb3JtYXRzLkFNUE1TWzBdIDogZm9ybWF0cy5BTVBNU1sxXVxuXHR9XG5cdHZhciBEQVRFX0ZPUk1BVFMgPSB7XG5cdCAgICB5eXl5OiBkYXRlR2V0dGVyKFwiRnVsbFllYXJcIiwgNCksXG5cdCAgICB5eTogZGF0ZUdldHRlcihcIkZ1bGxZZWFyXCIsIDIsIDAsIHRydWUpLFxuXHQgICAgeTogZGF0ZUdldHRlcihcIkZ1bGxZZWFyXCIsIDEpLFxuXHQgICAgTU1NTTogZGF0ZVN0ckdldHRlcihcIk1vbnRoXCIpLFxuXHQgICAgTU1NOiBkYXRlU3RyR2V0dGVyKFwiTW9udGhcIiwgdHJ1ZSksXG5cdCAgICBNTTogZGF0ZUdldHRlcihcIk1vbnRoXCIsIDIsIDEpLFxuXHQgICAgTTogZGF0ZUdldHRlcihcIk1vbnRoXCIsIDEsIDEpLFxuXHQgICAgZGQ6IGRhdGVHZXR0ZXIoXCJEYXRlXCIsIDIpLFxuXHQgICAgZDogZGF0ZUdldHRlcihcIkRhdGVcIiwgMSksXG5cdCAgICBISDogZGF0ZUdldHRlcihcIkhvdXJzXCIsIDIpLFxuXHQgICAgSDogZGF0ZUdldHRlcihcIkhvdXJzXCIsIDEpLFxuXHQgICAgaGg6IGRhdGVHZXR0ZXIoXCJIb3Vyc1wiLCAyLCAtMTIpLFxuXHQgICAgaDogZGF0ZUdldHRlcihcIkhvdXJzXCIsIDEsIC0xMiksXG5cdCAgICBtbTogZGF0ZUdldHRlcihcIk1pbnV0ZXNcIiwgMiksXG5cdCAgICBtOiBkYXRlR2V0dGVyKFwiTWludXRlc1wiLCAxKSxcblx0ICAgIHNzOiBkYXRlR2V0dGVyKFwiU2Vjb25kc1wiLCAyKSxcblx0ICAgIHM6IGRhdGVHZXR0ZXIoXCJTZWNvbmRzXCIsIDEpLFxuXHQgICAgc3NzOiBkYXRlR2V0dGVyKFwiTWlsbGlzZWNvbmRzXCIsIDMpLFxuXHQgICAgRUVFRTogZGF0ZVN0ckdldHRlcihcIkRheVwiKSxcblx0ICAgIEVFRTogZGF0ZVN0ckdldHRlcihcIkRheVwiLCB0cnVlKSxcblx0ICAgIGE6IGFtcG1HZXR0ZXIsXG5cdCAgICBaOiB0aW1lWm9uZUdldHRlclxuXHR9XG5cdHZhciByZGF0ZUZvcm1hdCA9IC8oKD86W155TWRIaG1zYVpFJ10rKXwoPzonKD86W14nXXwnJykqJyl8KD86RSt8eSt8TSt8ZCt8SCt8aCt8bSt8cyt8YXxaKSkoLiopL1xuXHR2YXIgcmFzcG5ldGpzb24gPSAvXlxcL0RhdGVcXCgoXFxkKylcXClcXC8kL1xuXHRmdW5jdGlvbiBkYXRlRmlsdGVyKGRhdGUsIGZvcm1hdCkge1xuXHQgICAgdmFyIGxvY2F0ZSA9IGRhdGVGaWx0ZXIubG9jYXRlLFxuXHQgICAgICAgICAgICB0ZXh0ID0gXCJcIixcblx0ICAgICAgICAgICAgcGFydHMgPSBbXSxcblx0ICAgICAgICAgICAgZm4sIG1hdGNoXG5cdCAgICBmb3JtYXQgPSBmb3JtYXQgfHwgXCJtZWRpdW1EYXRlXCJcblx0ICAgIGZvcm1hdCA9IGxvY2F0ZVtmb3JtYXRdIHx8IGZvcm1hdFxuXHQgICAgaWYgKHR5cGVvZiBkYXRlID09PSBcInN0cmluZ1wiKSB7XG5cdCAgICAgICAgaWYgKC9eXFxkKyQvLnRlc3QoZGF0ZSkpIHtcblx0ICAgICAgICAgICAgZGF0ZSA9IHRvSW50KGRhdGUpXG5cdCAgICAgICAgfSBlbHNlIGlmIChyYXNwbmV0anNvbi50ZXN0KGRhdGUpKSB7XG5cdCAgICAgICAgICAgIGRhdGUgPSArUmVnRXhwLiQxXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIHRyaW1EYXRlID0gZGF0ZS50cmltKClcblx0ICAgICAgICAgICAgdmFyIGRhdGVBcnJheSA9IFswLCAwLCAwLCAwLCAwLCAwLCAwXVxuXHQgICAgICAgICAgICB2YXIgb0RhdGUgPSBuZXcgRGF0ZSgwKVxuXHQgICAgICAgICAgICAvL+WPluW+l+W5tOaciOaXpVxuXHQgICAgICAgICAgICB0cmltRGF0ZSA9IHRyaW1EYXRlLnJlcGxhY2UoL14oXFxkKylcXEQoXFxkKylcXEQoXFxkKykvLCBmdW5jdGlvbiAoXywgYSwgYiwgYykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGFycmF5ID0gYy5sZW5ndGggPT09IDQgPyBbYywgYSwgYl0gOiBbYSwgYiwgY11cblx0ICAgICAgICAgICAgICAgIGRhdGVBcnJheVswXSA9IHRvSW50KGFycmF5WzBdKSAgICAgLy/lubRcblx0ICAgICAgICAgICAgICAgIGRhdGVBcnJheVsxXSA9IHRvSW50KGFycmF5WzFdKSAtIDEgLy/mnIhcblx0ICAgICAgICAgICAgICAgIGRhdGVBcnJheVsyXSA9IHRvSW50KGFycmF5WzJdKSAgICAgLy/ml6Vcblx0ICAgICAgICAgICAgICAgIHJldHVybiBcIlwiXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIHZhciBkYXRlU2V0dGVyID0gb0RhdGUuc2V0RnVsbFllYXJcblx0ICAgICAgICAgICAgdmFyIHRpbWVTZXR0ZXIgPSBvRGF0ZS5zZXRIb3Vyc1xuXHQgICAgICAgICAgICB0cmltRGF0ZSA9IHRyaW1EYXRlLnJlcGxhY2UoL1tUXFxzXShcXGQrKTooXFxkKyk6PyhcXGQrKT9cXC4/KFxcZCk/LywgZnVuY3Rpb24gKF8sIGEsIGIsIGMsIGQpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGVBcnJheVszXSA9IHRvSW50KGEpIC8v5bCP5pe2XG5cdCAgICAgICAgICAgICAgICBkYXRlQXJyYXlbNF0gPSB0b0ludChiKSAvL+WIhumSn1xuXHQgICAgICAgICAgICAgICAgZGF0ZUFycmF5WzVdID0gdG9JbnQoYykgLy/np5Jcblx0ICAgICAgICAgICAgICAgIGlmIChkKSB7ICAgICAgICAgICAgICAgIC8v5q+r56eSXG5cdCAgICAgICAgICAgICAgICAgICAgZGF0ZUFycmF5WzZdID0gTWF0aC5yb3VuZChwYXJzZUZsb2F0KFwiMC5cIiArIGQpICogMTAwMClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHJldHVybiBcIlwiXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIHZhciB0ekhvdXIgPSAwXG5cdCAgICAgICAgICAgIHZhciB0ek1pbiA9IDBcblx0ICAgICAgICAgICAgdHJpbURhdGUgPSB0cmltRGF0ZS5yZXBsYWNlKC9afChbKy1dKShcXGRcXGQpOj8oXFxkXFxkKS8sIGZ1bmN0aW9uICh6LCBzeW1ib2wsIGMsIGQpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGVTZXR0ZXIgPSBvRGF0ZS5zZXRVVENGdWxsWWVhclxuXHQgICAgICAgICAgICAgICAgdGltZVNldHRlciA9IG9EYXRlLnNldFVUQ0hvdXJzXG5cdCAgICAgICAgICAgICAgICBpZiAoc3ltYm9sKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdHpIb3VyID0gdG9JbnQoc3ltYm9sICsgYylcblx0ICAgICAgICAgICAgICAgICAgICB0ek1pbiA9IHRvSW50KHN5bWJvbCArIGQpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gJydcblx0ICAgICAgICAgICAgfSlcblxuXHQgICAgICAgICAgICBkYXRlQXJyYXlbM10gLT0gdHpIb3VyXG5cdCAgICAgICAgICAgIGRhdGVBcnJheVs0XSAtPSB0ek1pblxuXHQgICAgICAgICAgICBkYXRlU2V0dGVyLmFwcGx5KG9EYXRlLCBkYXRlQXJyYXkuc2xpY2UoMCwgMykpXG5cdCAgICAgICAgICAgIHRpbWVTZXR0ZXIuYXBwbHkob0RhdGUsIGRhdGVBcnJheS5zbGljZSgzKSlcblx0ICAgICAgICAgICAgZGF0ZSA9IG9EYXRlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgaWYgKHR5cGVvZiBkYXRlID09PSAnbnVtYmVyJykge1xuXHQgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKVxuXHQgICAgfVxuXHQgICAgaWYgKGF2YWxvbi50eXBlKGRhdGUpICE9PSAnZGF0ZScpIHtcblx0ICAgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIHdoaWxlIChmb3JtYXQpIHtcblx0ICAgICAgICBtYXRjaCA9IHJkYXRlRm9ybWF0LmV4ZWMoZm9ybWF0KVxuXHQgICAgICAgIGlmIChtYXRjaCkge1xuXHQgICAgICAgICAgICBwYXJ0cyA9IHBhcnRzLmNvbmNhdChtYXRjaC5zbGljZSgxKSlcblx0ICAgICAgICAgICAgZm9ybWF0ID0gcGFydHMucG9wKClcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBwYXJ0cy5wdXNoKGZvcm1hdClcblx0ICAgICAgICAgICAgZm9ybWF0ID0gbnVsbFxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHBhcnRzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICAgICAgZm4gPSBEQVRFX0ZPUk1BVFNbdmFsdWVdXG5cdCAgICAgICAgdGV4dCArPSBmbiA/IGZuKGRhdGUsIGxvY2F0ZSkgOiB2YWx1ZS5yZXBsYWNlKC8oXid8JyQpL2csIFwiXCIpLnJlcGxhY2UoLycnL2csIFwiJ1wiKVxuXHQgICAgfSlcblx0ICAgIHJldHVybiB0ZXh0XG5cdH1cblxuXG5cdHZhciBsb2NhdGUgPSB7XG5cdCAgICBBTVBNUzoge1xuXHQgICAgICAgIDA6ICfkuIrljYgnLFxuXHQgICAgICAgIDE6ICfkuIvljYgnXG5cdCAgICB9LFxuXHQgICAgREFZOiB7XG5cdCAgICAgICAgMDogJ+aYn+acn+aXpScsXG5cdCAgICAgICAgMTogJ+aYn+acn+S4gCcsXG5cdCAgICAgICAgMjogJ+aYn+acn+S6jCcsXG5cdCAgICAgICAgMzogJ+aYn+acn+S4iScsXG5cdCAgICAgICAgNDogJ+aYn+acn+WbmycsXG5cdCAgICAgICAgNTogJ+aYn+acn+S6lCcsXG5cdCAgICAgICAgNjogJ+aYn+acn+WFrSdcblx0ICAgIH0sXG5cdCAgICBNT05USDoge1xuXHQgICAgICAgIDA6ICcx5pyIJyxcblx0ICAgICAgICAxOiAnMuaciCcsXG5cdCAgICAgICAgMjogJzPmnIgnLFxuXHQgICAgICAgIDM6ICc05pyIJyxcblx0ICAgICAgICA0OiAnNeaciCcsXG5cdCAgICAgICAgNTogJzbmnIgnLFxuXHQgICAgICAgIDY6ICc35pyIJyxcblx0ICAgICAgICA3OiAnOOaciCcsXG5cdCAgICAgICAgODogJznmnIgnLFxuXHQgICAgICAgIDk6ICcxMOaciCcsXG5cdCAgICAgICAgMTA6ICcxMeaciCcsXG5cdCAgICAgICAgMTE6ICcxMuaciCdcblx0ICAgIH0sXG5cdCAgICBTSE9SVERBWToge1xuXHQgICAgICAgICcwJzogJ+WRqOaXpScsXG5cdCAgICAgICAgJzEnOiAn5ZGo5LiAJyxcblx0ICAgICAgICAnMic6ICflkajkuownLFxuXHQgICAgICAgICczJzogJ+WRqOS4iScsXG5cdCAgICAgICAgJzQnOiAn5ZGo5ZubJyxcblx0ICAgICAgICAnNSc6ICflkajkupQnLFxuXHQgICAgICAgICc2JzogJ+WRqOWFrSdcblx0ICAgIH0sXG5cdCAgICBmdWxsRGF0ZTogJ3nlubRN5pyIZOaXpUVFRUUnLFxuXHQgICAgbG9uZ0RhdGU6ICd55bm0TeaciGTml6UnLFxuXHQgICAgbWVkaXVtOiAneXl5eS1NLWQgSDptbTpzcycsXG5cdCAgICBtZWRpdW1EYXRlOiAneXl5eS1NLWQnLFxuXHQgICAgbWVkaXVtVGltZTogJ0g6bW06c3MnLFxuXHQgICAgJ3Nob3J0JzogJ3l5LU0tZCBhaDptbScsXG5cdCAgICBzaG9ydERhdGU6ICd5eS1NLWQnLFxuXHQgICAgc2hvcnRUaW1lOiAnYWg6bW0nXG5cdH1cblx0bG9jYXRlLlNIT1JUTU9OVEggPSBsb2NhdGUuTU9OVEhcblx0ZGF0ZUZpbHRlci5sb2NhdGUgPSBsb2NhdGVcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGRhdGVGaWx0ZXJcblxuLyoqKi8gfSxcbi8qIDEyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcblx0ZnVuY3Rpb24gb3JkZXJCeShhcnJheSwgY3JpdGVyaWEsIHJldmVyc2UpIHtcblx0ICAgIHZhciB0eXBlID0gYXZhbG9uLnR5cGUoYXJyYXkpXG5cdCAgICBpZiAodHlwZSAhPT0gJ2FycmF5JyAmJiB0eXBlICE9PSAnb2JqZWN0Jylcblx0ICAgICAgICB0aHJvdyAnb3JkZXJCeeWPquiDveWkhOeQhuWvueixoeaIluaVsOe7hCdcblx0ICAgIHZhciBvcmRlciA9IChyZXZlcnNlICYmIHJldmVyc2UgPCAwKSA/IC0xIDogMVxuXG5cdCAgICBpZiAodHlwZW9mIGNyaXRlcmlhID09PSAnc3RyaW5nJykge1xuXHQgICAgICAgIHZhciBrZXkgPSBjcml0ZXJpYVxuXHQgICAgICAgIGNyaXRlcmlhID0gZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGEgJiYgYVtrZXldXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgYXJyYXkgPSBjb252ZXJ0QXJyYXkoYXJyYXkpXG5cdCAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgIGVsLm9yZGVyID0gY3JpdGVyaWEoZWwudmFsdWUsIGVsLmtleSlcblx0ICAgIH0pXG5cdCAgICBhcnJheS5zb3J0KGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuXHQgICAgICAgIHZhciBhID0gbGVmdC5vcmRlclxuXHQgICAgICAgIHZhciBiID0gcmlnaHQub3JkZXJcblx0ICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGEpICYmIE51bWJlci5pc05hTihiKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gMFxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYSA9PT0gYiA/IDAgOiBhID4gYiA/IG9yZGVyIDogLW9yZGVyXG5cdCAgICB9KVxuXHQgICAgdmFyIGlzQXJyYXkgPSB0eXBlID09PSAnYXJyYXknXG5cdCAgICB2YXIgdGFyZ2V0ID0gaXNBcnJheSA/IFtdIDoge31cblx0ICAgIHJldHVybiByZWNvdmVyeSh0YXJnZXQsIGFycmF5LCBmdW5jdGlvbiAoZWwpIHtcblx0ICAgICAgICBpZiAoaXNBcnJheSkge1xuXHQgICAgICAgICAgICB0YXJnZXQucHVzaChlbC52YWx1ZSlcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB0YXJnZXRbZWwua2V5XSA9IGVsLnZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSlcblx0fVxuXG5cdGZ1bmN0aW9uIGZpbHRlckJ5KGFycmF5LCBzZWFyY2gpIHtcblx0ICAgIHZhciB0eXBlID0gYXZhbG9uLnR5cGUoYXJyYXkpXG5cdCAgICBpZiAodHlwZSAhPT0gJ2FycmF5JyAmJiB0eXBlICE9PSAnb2JqZWN0Jylcblx0ICAgICAgICB0aHJvdyAnZmlsdGVyQnnlj6rog73lpITnkIblr7nosaHmiJbmlbDnu4QnXG5cdCAgICB2YXIgYXJncyA9IGF2YWxvbi5zbGljZShhcmd1bWVudHMsIDIpXG5cdCAgICB2YXIgc3R5cGUgPSBhdmFsb24udHlwZShzZWFyY2gpXG5cdCAgICBpZiAoc3R5cGUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB2YXIgY3JpdGVyaWEgPSBzZWFyY2hcblx0ICAgIH0gZWxzZSBpZiAoc3R5cGUgPT09ICdzdHJpbmcnIHx8IHN0eXBlID09PSAnbnVtYmVyJykge1xuXHQgICAgICAgIGlmIChzZWFyY2ggPT09ICcnKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBhcnJheVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKGF2YWxvbi5lc2NhcGVSZWdFeHAoc2VhcmNoKSwgJ2knKVxuXHQgICAgICAgICAgICBjcml0ZXJpYSA9IGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHJlZy50ZXN0KGVsKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICByZXR1cm4gYXJyYXlcblx0ICAgIH1cblxuXHQgICAgYXJyYXkgPSBjb252ZXJ0QXJyYXkoYXJyYXkpLmZpbHRlcihmdW5jdGlvbiAoZWwsIGkpIHtcblx0ICAgICAgICByZXR1cm4gISFjcml0ZXJpYS5hcHBseShlbCwgW2VsLnZhbHVlLCBpXS5jb25jYXQoYXJncykpXG5cdCAgICB9KVxuXHQgICAgdmFyIGlzQXJyYXkgPSB0eXBlID09PSAnYXJyYXknXG5cdCAgICB2YXIgdGFyZ2V0ID0gaXNBcnJheSA/IFtdIDoge31cblx0ICAgIHJldHVybiByZWNvdmVyeSh0YXJnZXQsIGFycmF5LCBmdW5jdGlvbiAoZWwpIHtcblx0ICAgICAgICBpZiAoaXNBcnJheSkge1xuXHQgICAgICAgICAgICB0YXJnZXQucHVzaChlbC52YWx1ZSlcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB0YXJnZXRbZWwua2V5XSA9IGVsLnZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSlcblx0fVxuXG5cdGZ1bmN0aW9uIHNlbGVjdEJ5KGRhdGEsIGFycmF5LCBkZWZhdWx0cykge1xuXHQgICAgaWYgKGF2YWxvbi5pc09iamVjdChkYXRhKSAmJiAhQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHQgICAgICAgIHZhciB0YXJnZXQgPSBbXVxuXHQgICAgICAgIHJldHVybiByZWNvdmVyeSh0YXJnZXQsIGFycmF5LCBmdW5jdGlvbiAobmFtZSkge1xuXHQgICAgICAgICAgICB0YXJnZXQucHVzaChkYXRhLmhhc093blByb3BlcnR5KG5hbWUpID8gZGF0YVtuYW1lXSA6IGRlZmF1bHRzID8gZGVmYXVsdHNbbmFtZV0gOiAnJylcblx0ICAgICAgICB9KVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICByZXR1cm4gZGF0YVxuXHQgICAgfVxuXHR9XG5cblx0TnVtYmVyLmlzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIChhKSB7XG5cdCAgICByZXR1cm4gYSAhPT0gYVxuXHR9XG5cblx0ZnVuY3Rpb24gbGltaXRCeShpbnB1dCwgbGltaXQsIGJlZ2luKSB7XG5cdCAgICB2YXIgdHlwZSA9IGF2YWxvbi50eXBlKGlucHV0KVxuXHQgICAgaWYgKHR5cGUgIT09ICdhcnJheScgJiYgdHlwZSAhPT0gJ29iamVjdCcpXG5cdCAgICAgICAgdGhyb3cgJ2xpbWl0Qnnlj6rog73lpITnkIblr7nosaHmiJbmlbDnu4QnXG5cdCAgICAvL+W/hemhu+aYr+aVsOWAvFxuXHQgICAgaWYgKHR5cGVvZiBsaW1pdCAhPT0gJ251bWJlcicpIHtcblx0ICAgICAgICByZXR1cm4gaW5wdXRcblx0ICAgIH1cblx0ICAgIC8v5LiN6IO95Li6TmFOXG5cdCAgICBpZiAoTnVtYmVyLmlzTmFOKGxpbWl0KSkge1xuXHQgICAgICAgIHJldHVybiBpbnB1dFxuXHQgICAgfVxuXHQgICAgLy/lsIbnm67moIfovazmjaLkuLrmlbDnu4Rcblx0ICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuXHQgICAgICAgIGlucHV0ID0gY29udmVydEFycmF5KGlucHV0KVxuXHQgICAgfVxuXHQgICAgdmFyIG4gPSBpbnB1dC5sZW5ndGhcblx0ICAgIGxpbWl0ID0gTWF0aC5taW4obiwgbGltaXQpXG5cdCAgICBiZWdpbiA9IHR5cGVvZiBiZWdpbiA9PT0gJ251bWJlcicgPyBiZWdpbiA6IDBcblx0ICAgIGlmIChiZWdpbiA8IDApIHtcblx0ICAgICAgICBiZWdpbiA9IE1hdGgubWF4KDAsIG4gKyBiZWdpbilcblx0ICAgIH1cblxuXHQgICAgdmFyIGRhdGEgPSBbXVxuXHQgICAgZm9yICh2YXIgaSA9IGJlZ2luOyBpIDwgbjsgaSsrKSB7XG5cdCAgICAgICAgZGF0YS5wdXNoKGlucHV0W2ldKVxuXHQgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gbGltaXQpIHtcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICB2YXIgaXNBcnJheSA9IHR5cGUgPT09ICdhcnJheSdcblx0ICAgIGlmIChpc0FycmF5KSB7XG5cdCAgICAgICAgcmV0dXJuIGRhdGFcblx0ICAgIH1cblx0ICAgIHZhciB0YXJnZXQgPSB7fVxuXHQgICAgcmV0dXJuIHJlY292ZXJ5KHRhcmdldCwgZGF0YSwgZnVuY3Rpb24gKGVsKSB7XG5cdCAgICAgICAgdGFyZ2V0W2VsLmtleV0gPSBlbC52YWx1ZVxuXHQgICAgfSlcblx0fVxuXG5cdGZ1bmN0aW9uIHJlY292ZXJ5KHJldCwgYXJyYXksIGNhbGxiYWNrKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgbiA9IGFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHQgICAgICAgIGNhbGxiYWNrKGFycmF5W2ldKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHJldFxuXHR9XG5cblxuXHRmdW5jdGlvbiBjb252ZXJ0QXJyYXkoYXJyYXkpIHtcblx0ICAgIHZhciByZXQgPSBbXSwgaSA9IDBcblx0ICAgIGF2YWxvbi5lYWNoKGFycmF5LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHQgICAgICAgIHJldFtpKytdID0ge1xuXHQgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG5cdCAgICAgICAgICAgIGtleToga2V5XG5cdCAgICAgICAgfVxuXHQgICAgfSlcblx0ICAgIHJldHVybiByZXRcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgbGltaXRCeTogbGltaXRCeSxcblx0ICAgIG9yZGVyQnk6IG9yZGVyQnksXG5cdCAgICBzZWxlY3RCeTogc2VsZWN0QnksXG5cdCAgICBmaWx0ZXJCeTogZmlsdGVyQnlcblx0fVxuXG4vKioqLyB9LFxuLyogMTMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFxuXHR2YXIgZXZlbnRGaWx0ZXJzID0ge1xuXHQgICAgc3RvcDogZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cdCAgICAgICAgcmV0dXJuIGVcblx0ICAgIH0sXG5cdCAgICBwcmV2ZW50OiBmdW5jdGlvbiAoZSkge1xuXHQgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXHQgICAgICAgIHJldHVybiBlXG5cdCAgICB9XG5cdH1cblx0dmFyIGtleUNvZGUgPSB7XG5cdCAgICBlc2M6IDI3LFxuXHQgICAgdGFiOiA5LFxuXHQgICAgZW50ZXI6IDEzLFxuXHQgICAgc3BhY2U6IDMyLFxuXHQgICAgZGVsOiA0Nixcblx0ICAgIHVwOiAzOCxcblx0ICAgIGxlZnQ6IDM3LFxuXHQgICAgcmlnaHQ6IDM5LFxuXHQgICAgZG93bjogNDBcblx0fVxuXG5cdGF2YWxvbi5lYWNoKGtleUNvZGUsIGZ1bmN0aW9uIChuYW1lLCBrZXlDb2RlKSB7XG5cdCAgICBldmVudEZpbHRlcnNbbmFtZV0gPSBmdW5jdGlvbiAoZSkge1xuXHQgICAgICAgIGlmIChlLndoaWNoICE9PSBrZXlDb2RlKSB7XG5cdCAgICAgICAgICAgIGUuJHJldHVybiA9IHRydWVcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGVcblx0ICAgIH1cblx0fSlcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGV2ZW50RmlsdGVyc1xuXG4vKioqLyB9LFxuLyogMTQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiDomZrmi59ET03nmoQz5aSn5p6E6YCg5ZmoXG5cdCAqL1xuXHR2YXIgVlRleHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KVxuXHR2YXIgVkNvbW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KVxuXHR2YXIgVkVsZW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KVxuXG5cdGF2YWxvbi52ZG9tQWRhcHRvciA9IGZ1bmN0aW9uIChvYmosIG1ldGhvZCkge1xuXHQgICAgaWYgKCFvYmopIHsvL29iauWcqG1zLWZvcuW+queOr+mHjOmdouWPr+iDveaYr251bGxcblx0ICAgICAgICByZXR1cm4gKG1ldGhvZCA9PT0gXCJ0b0hUTUxcIiA/ICcnIDpcblx0ICAgICAgICAgICAgYXZhbG9uLmF2YWxvbkZyYWdtZW50LmNsb25lTm9kZShmYWxzZSkpXG5cdCAgICB9XG5cdCAgICBzd2l0Y2ggKG9iai5ub2RlVHlwZSkge1xuXHQgICAgICAgIGNhc2UgMzpcblx0ICAgICAgICAgICAgcmV0dXJuIFZUZXh0LnByb3RvdHlwZVttZXRob2RdLmNhbGwob2JqKVxuXHQgICAgICAgIGNhc2UgODpcblx0ICAgICAgICAgICAgcmV0dXJuIFZDb21tZW50LnByb3RvdHlwZVttZXRob2RdLmNhbGwob2JqKVxuXHQgICAgICAgIGNhc2UgMTpcblx0ICAgICAgICAgICAgcmV0dXJuIFZFbGVtZW50LnByb3RvdHlwZVttZXRob2RdLmNhbGwob2JqKVxuXHQgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwidG9IVE1MXCIpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqLm1hcChmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXZhbG9uLnZkb21BZGFwdG9yKGEsICd0b0hUTUwnKVxuXHQgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBmID0gYXZhbG9uLmF2YWxvbkZyYWdtZW50LmNsb25lTm9kZShmYWxzZSlcblx0ICAgICAgICAgICAgICAgICAgICBvYmouZm9yRWFjaChmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmLmFwcGVuZENoaWxkKGF2YWxvbi52ZG9tQWRhcHRvcihhLCAndG9ET00nKSlcblx0ICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBmXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgVlRleHQ6IFZUZXh0LFxuXHQgICAgVkNvbW1lbnQ6IFZDb21tZW50LFxuXHQgICAgVkVsZW1lbnQ6IFZFbGVtZW50XG5cdH1cblxuXG4vKioqLyB9LFxuLyogMTUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciByZXhwciA9IGF2YWxvbi5jb25maWcucmV4cHJcblx0dmFyIGRlY29kZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpXG5cdGZ1bmN0aW9uIFZUZXh0KHRleHQpIHtcblx0ICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSAnI3RleHQnXG5cdCAgICAgICAgdGhpcy5ub2RlVmFsdWUgPSB0ZXh0XG5cdCAgICAgICAgdGhpcy5za2lwQ29udGVudCA9ICFyZXhwci50ZXN0KHRleHQpXG5cdCAgICAgICAgdGhpcy5ub2RlVHlwZSA9IDNcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiB0ZXh0KSB7XG5cdCAgICAgICAgICAgIHRoaXNbaV0gPSB0ZXh0W2ldXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0VlRleHQucHJvdG90eXBlID0ge1xuXHQgICAgY29uc3RydWN0b3I6IFZUZXh0LFxuXHQgICAgdG9ET006IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgIHZhciB2ID0gZGVjb2RlKHRoaXMubm9kZVZhbHVlKVxuXHQgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHYpXG5cdCAgICB9LFxuXHQgICAgdG9IVE1MOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMubm9kZVZhbHVlXG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IFZUZXh0XG5cbi8qKiovIH0sXG4vKiAxNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyogXG5cdCAqIOWvuWh0bWzlrp7kvZPov5vooYzovazkuYlcblx0ICogaHR0cHM6Ly9naXRodWIuY29tL3N1YnN0YWNrL25vZGUtZW50XG5cdCAqIGh0dHA6Ly93d3cuY25ibG9ncy5jb20veGRwLWdhY2wvcC8zNzIyNjQyLmh0bWxcblx0ICogaHR0cDovL3d3dy5zdGVmYW5rcmF1c2UubmV0L2pzLWZyYW1ld29ya3MtYmVuY2htYXJrMi93ZWJkcml2ZXItamF2YS90YWJsZS5odG1sXG5cdCAqL1xuXG5cdHZhciByZW50aXRpZXMgPSAvJlthLXowLTkjXXsyLDEwfTsvXG5cdHZhciB0ZW1wID0gYXZhbG9uLmF2YWxvbkRpdlxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcblx0ICAgIGlmIChyZW50aXRpZXMudGVzdChzdHIpKSB7XG5cdCAgICAgICAgdGVtcC5pbm5lckhUTUwgPSBzdHJcblx0ICAgICAgICByZXR1cm4gdGVtcC5pbm5lclRleHQgfHwgdGVtcC50ZXh0Q29udGVudFxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHN0clxuXHR9XG5cbi8qKiovIH0sXG4vKiAxNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XG5cdGZ1bmN0aW9uIFZDb21tZW50KHRleHQpIHtcblx0ICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICB0aGlzLnR5cGUgPSAnI2NvbW1lbnQnXG5cdCAgICAgICAgdGhpcy5ub2RlVmFsdWUgPSB0ZXh0XG5cdCAgICAgICAgdGhpcy5za2lwQ29udGVudCA9IHRydWVcblx0ICAgICAgICB0aGlzLm5vZGVUeXBlID0gOFxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBmb3IgKHZhciBpIGluIHRleHQpIHtcblx0ICAgICAgICAgICAgdGhpc1tpXSA9IHRleHRbaV1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblx0VkNvbW1lbnQucHJvdG90eXBlID0ge1xuXHQgICAgY29uc3RydWN0b3I6IFZDb21tZW50LFxuXHQgICAgdG9ET006IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh0aGlzLm5vZGVWYWx1ZSlcblx0ICAgIH0sXG5cdCAgICB0b0hUTUw6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gJzwhLS0nICsgdGhpcy5ub2RlVmFsdWUgKyAnLS0+JysodGhpcy50ZW1wbGF0ZXx8XCJcIilcblx0ICAgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gVkNvbW1lbnRcblxuLyoqKi8gfSxcbi8qIDE4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcblx0ZnVuY3Rpb24gVkVsZW1lbnQodHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG5cdCAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiB0eXBlKSB7XG5cdCAgICAgICAgICAgIHRoaXNbaV0gPSB0eXBlW2ldXG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLm5vZGVUeXBlID0gMVxuXHQgICAgICAgIHRoaXMudHlwZSA9IHR5cGVcblx0ICAgICAgICB0aGlzLnByb3BzID0gcHJvcHNcblx0ICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW5cblx0ICAgIH1cblx0fVxuXHRmdW5jdGlvbiBza2lwRmFsc2VBbmRGdW5jdGlvbihhKSB7XG5cdCAgICByZXR1cm4gYSAhPT0gZmFsc2UgJiYgKE9iamVjdChhKSAhPT0gYSlcblx0fVxuXHR2YXIgc3BlY2FsID0ge1xuXHQgICAgXCJjbGFzc1wiOiBmdW5jdGlvbiAoZG9tLCB2YWwpIHtcblx0ICAgICAgICBkb20uY2xhc3NOYW1lID0gdmFsXG5cdCAgICB9LFxuXHQgICAgc3R5bGU6IGZ1bmN0aW9uIChkb20sIHZhbCkge1xuXHQgICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ID0gdmFsXG5cdCAgICB9LFxuXHQgICAgJ2Zvcic6IGZ1bmN0aW9uIChkb20sIHZhbCkge1xuXHQgICAgICAgIGRvbS5odG1sRm9yID0gdmFsXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVWTUwodHlwZSkge1xuXHQgICAgaWYgKGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCA8IDMxKSB7XG5cdCAgICAgICAgZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCgpLmFkZFJ1bGUoXCIucnZtbFwiLCBcImJlaGF2aW9yOnVybCgjZGVmYXVsdCNWTUwpXCIpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICAvLyBubyBtb3JlIHJvb20sIGFkZCB0byB0aGUgZXhpc3Rpbmcgb25lXG5cdCAgICAgICAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMxMTk0JTI4VlMuODUlMjkuYXNweFxuXHQgICAgICAgIGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdLmFkZFJ1bGUoXCIucnZtbFwiLCBcImJlaGF2aW9yOnVybCgjZGVmYXVsdCNWTUwpXCIpO1xuXHQgICAgfVxuXHQgICAgdmFyIGFyciA9IHR5cGUuc3BsaXQoJzonKVxuXHQgICAgaWYgKGFyci5sZW5ndGggPT09IDEpIHtcblx0ICAgICAgICBhcnIudW5zaGlmdCgndicpXG5cdCAgICB9XG5cdCAgICB2YXIgdGFnID0gYXJyWzFdXG5cdCAgICB2YXIgbnMgPSBhcnJbMF1cblx0ICAgIGlmICghZG9jdW1lbnQubmFtZXNwYWNlc1tuc10pIHtcblx0ICAgICAgICBkb2N1bWVudC5uYW1lc3BhY2VzLmFkZChucywgXCJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOnZtbFwiKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8JyArIG5zICsgJzonICsgdGFnICsgJyBjbGFzcz1cInJ2bWxcIj4nKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVNWRyh0eXBlKSB7XG5cdCAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHR5cGUpXG5cdH1cblx0dmFyIHN2Z1RhZ3MgPSBhdmFsb24ub25lT2JqZWN0KCdjaXJjbGUsZGVmcyxlbGxpcHNlLGltYWdlLGxpbmUsJyArXG5cdCAgICAgICAgJ3BhdGgscG9seWdvbixwb2x5bGluZSxyZWN0LHN5bWJvbCx0ZXh0LHVzZSxnLHN2ZycpXG5cdHZhciBWTUxUYWdzID0gYXZhbG9uLm9uZU9iamVjdCgnc2hhcGUsbGluZSxwb2x5bGluZSxyZWN0LHJvdW5kcmVjdCxvdmFsLGFyYywnICtcblx0ICAgICAgICAnY3VydmUsYmFja2dyb3VuZCxpbWFnZSxzaGFwZXR5cGUsZ3JvdXAsZmlsbCwnICtcblx0ICAgICAgICAnc3Ryb2tlLHNoYWRvdywgZXh0cnVzaW9uLCB0ZXh0Ym94LCBpbWFnZWRhdGEsIHRleHRwYXRoJylcblxuXHR2YXIgcnZtbCA9IC9eXFx3K1xcOlxcdysvXG5cblx0VkVsZW1lbnQucHJvdG90eXBlID0ge1xuXHQgICAgY29uc3RydWN0b3I6IFZFbGVtZW50LFxuXHQgICAgdG9ET006IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgZG9tLCB0YWdOYW1lID0gdGhpcy50eXBlXG5cdCAgICAgICAgaWYgKGF2YWxvbi5tb2Rlcm4gJiYgc3ZnVGFnc1t0YWdOYW1lXSkge1xuXHQgICAgICAgICAgICBkb20gPSBjcmVhdGVTVkcodGFnTmFtZSlcblx0ICAgICAgICB9IGVsc2UgaWYgKCFhdmFsb24ubW9kZXJuICYmIChWTUxUYWdzW3RhZ05hbWVdIHx8IHJ2bWwudGVzdCh0YWdOYW1lKSkpIHtcblx0ICAgICAgICAgICAgZG9tID0gY3JlYXRlVk1MKHRhZ05hbWUpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgd2lkID0gdGhpcy5wcm9wc1snbXMtaW1wb3J0YW50J10gfHxcblx0ICAgICAgICAgICAgICAgIHRoaXMucHJvcHNbJ21zLWNvbnRyb2xsZXInXSB8fCB0aGlzLndpZFxuXHQgICAgICAgIGlmICh3aWQpIHtcblx0ICAgICAgICAgICAgdmFyIHNjb3BlID0gYXZhbG9uLnNjb3Blc1t3aWRdXG5cdCAgICAgICAgICAgIHZhciBlbGVtZW50ID0gc2NvcGUgJiYgc2NvcGUudm1vZGVsICYmIHNjb3BlLnZtb2RlbC4kZWxlbWVudFxuXHQgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG9sZFZkb20gPSBlbGVtZW50LnZ0cmVlWzBdXG5cdCAgICAgICAgICAgICAgICBpZiAob2xkVmRvbS5jaGlsZHJlbikge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBvbGRWZG9tLmNoaWxkcmVuXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5wcm9wcykge1xuXHQgICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5wcm9wc1tpXVxuXHQgICAgICAgICAgICBpZiAoc2tpcEZhbHNlQW5kRnVuY3Rpb24odmFsKSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHNwZWNhbFtpXSAmJiBhdmFsb24ubXNpZSA8IDgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzcGVjYWxbaV0oZG9tLCB2YWwpXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoaSwgdmFsICsgJycpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGMgPSB0aGlzLmNoaWxkcmVuIHx8IFtdXG5cdCAgICAgICAgdmFyIHRlbXBsYXRlID0gY1swXSA/IGNbMF0ubm9kZVZhbHVlIDogJydcblx0ICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlICdzY3JpcHQnOlxuXHQgICAgICAgICAgICAgICAgZG9tLnRleHQgPSB0ZW1wbGF0ZVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAnc3R5bGUnOlxuXHQgICAgICAgICAgICAgICAgaWYgKCdzdHlsZVNoZWV0JyBpbiBkb20pIHtcblx0ICAgICAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJylcblx0ICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGVTaGVldC5jc3NUZXh0ID0gdGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZG9tLmlubmVySFRNTCA9IHRlbXBsYXRlXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlICd4bXAnOi8vSUU2LTgsWE1Q5YWD57Sg6YeM6Z2i5Y+q6IO95pyJ5paH5pys6IqC54K5LOS4jeiDveS9v+eUqGlubmVySFRNTFxuXHQgICAgICAgICAgICBjYXNlICdub3NjcmlwdCc6XG5cdCAgICAgICAgICAgICAgICBkb20uaW5uZXJUZXh0ID0gZG9tLnRleHRDb250ZW50ID0gdGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgJ3RlbXBsYXRlJzpcblx0ICAgICAgICAgICAgICAgIGRvbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZvaWRUYWcpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYyAmJiBkb20uYXBwZW5kQ2hpbGQoYXZhbG9uLnZkb21BZGFwdG9yKGMsICd0b0RPTScpKVxuXHQgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZG9tXG5cdCAgICB9LFxuXHQgICAgdG9IVE1MOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGFyciA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnByb3BzKSB7XG5cdCAgICAgICAgICAgIHZhciB2YWwgPSB0aGlzLnByb3BzW2ldXG5cdCAgICAgICAgICAgIGlmIChza2lwRmFsc2VBbmRGdW5jdGlvbih2YWwpKSB7XG5cdCAgICAgICAgICAgICAgICBhcnIucHVzaChpICsgJz0nICsgYXZhbG9uLnF1b3RlKHRoaXMucHJvcHNbaV0gKyAnJykpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgYXJyID0gYXJyLmxlbmd0aCA/ICcgJyArIGFyci5qb2luKCcgJykgOiAnJ1xuXHQgICAgICAgIHZhciBzdHIgPSAnPCcgKyB0aGlzLnR5cGUgKyBhcnJcblx0ICAgICAgICBpZiAodGhpcy5pc1ZvaWRUYWcpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHN0ciArICcvPidcblx0ICAgICAgICB9XG5cdCAgICAgICAgc3RyICs9ICc+J1xuXHQgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xuXHQgICAgICAgICAgICBzdHIgKz0gdGhpcy5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGMpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBjID8gYXZhbG9uLnZkb21BZGFwdG9yKGMsICd0b0hUTUwnKSA6ICcnXG5cdCAgICAgICAgICAgIH0pLmpvaW4oJycpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBzdHIgKyAnPC8nICsgdGhpcy50eXBlICsgJz4nXG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IFZFbGVtZW50XG5cbi8qKiovIH0sXG4vKiAxOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyoqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgRE9NIEFwaVxuXHQgKiBzaGltLGNsYXNzLGRhdGEsY3NzLHZhbCxodG1sLGV2ZW50LHJlYWR5ICBcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqL1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKVxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXZhbG9uXG5cbi8qKiovIH0sXG4vKiAyMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0ZnVuY3Rpb24gZml4Q29udGFpbnMocm9vdCwgZWwpIHtcblx0ICAgIHRyeSB7IC8vSUU2LTgs5ri456a75LqORE9N5qCR5aSW55qE5paH5pys6IqC54K577yM6K6/6ZeucGFyZW50Tm9kZeacieaXtuS8muaKm+mUmVxuXHQgICAgICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnROb2RlKSlcblx0ICAgICAgICAgICAgaWYgKGVsID09PSByb290KVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH1cblx0fVxuXG5cdGF2YWxvbi5jb250YWlucyA9IGZpeENvbnRhaW5zXG5cdC8vSUU2LTEx55qE5paH5qGj5a+56LGh5rKh5pyJY29udGFpbnNcblx0aWYgKCFhdmFsb24uZG9jdW1lbnQuY29udGFpbnMpIHtcblx0ICAgIGF2YWxvbi5kb2N1bWVudC5jb250YWlucyA9IGZ1bmN0aW9uIChiKSB7XG5cdCAgICAgICAgcmV0dXJuIGZpeENvbnRhaW5zKGRvY3VtZW50LCBiKVxuXHQgICAgfVxuXHR9XG5cblx0aWYgKHdpbmRvdy5Ob2RlICYmICFkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgneCcpLmNvbnRhaW5zKSB7XG5cdCAgICBOb2RlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChhcmcpIHsvL0lFNi045rKh5pyJTm9kZeWvueixoVxuXHQgICAgICAgIHJldHVybiAhISh0aGlzLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGFyZykgJiAxNilcblx0ICAgIH1cblx0fVxuXG5cdC8vZmlyZWZveCDliLAxMeaXtuaJjeaciW91dGVySFRNTFxuXHRpZiAod2luZG93LkhUTUxFbGVtZW50ICYmICFhdmFsb24ucm9vdC5vdXRlckhUTUwpIHtcblx0ICAgIEhUTUxFbGVtZW50LnByb3RvdHlwZS5fX2RlZmluZUdldHRlcl9fKCdvdXRlckhUTUwnLCBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdCAgICAgICAgZGl2LmFwcGVuZENoaWxkKHRoaXMpXG5cdCAgICAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUxcblx0ICAgIH0pXG5cdH1cblxuXG5cblxuLyoqKi8gfSxcbi8qIDIxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgcm5vd2hpdGUgPSAvXFxTKy9nXG5cdHZhciBmYWtlQ2xhc3NMaXN0TWV0aG9kcyA9IHtcblx0ICAgIF90b1N0cmluZzogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlXG5cdCAgICAgICAgdmFyIGNscyA9IG5vZGUuY2xhc3NOYW1lXG5cdCAgICAgICAgdmFyIHN0ciA9IHR5cGVvZiBjbHMgPT09ICdzdHJpbmcnID8gY2xzIDogY2xzLmJhc2VWYWxcblx0ICAgICAgICB2YXIgbWF0Y2ggPSBzdHIubWF0Y2gocm5vd2hpdGUpXG5cdCAgICAgICAgcmV0dXJuIG1hdGNoID8gbWF0Y2guam9pbignICcpIDogJydcblx0ICAgIH0sXG5cdCAgICBfY29udGFpbnM6IGZ1bmN0aW9uIChjbHMpIHtcblx0ICAgICAgICByZXR1cm4gKCcgJyArIHRoaXMgKyAnICcpLmluZGV4T2YoJyAnICsgY2xzICsgJyAnKSA+IC0xXG5cdCAgICB9LFxuXHQgICAgX2FkZDogZnVuY3Rpb24gKGNscykge1xuXHQgICAgICAgIGlmICghdGhpcy5jb250YWlucyhjbHMpKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX3NldCh0aGlzICsgJyAnICsgY2xzKVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBfcmVtb3ZlOiBmdW5jdGlvbiAoY2xzKSB7XG5cdCAgICAgICAgdGhpcy5fc2V0KCgnICcgKyB0aGlzICsgJyAnKS5yZXBsYWNlKCcgJyArIGNscyArICcgJywgJyAnKSlcblx0ICAgIH0sXG5cdCAgICBfX3NldDogZnVuY3Rpb24gKGNscykge1xuXHQgICAgICAgIGNscyA9IGNscy50cmltKClcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZVxuXHQgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5jbGFzc05hbWUgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgICAgIC8vU1ZH5YWD57Sg55qEY2xhc3NOYW1l5piv5LiA5Liq5a+56LGhIFNWR0FuaW1hdGVkU3RyaW5nIHsgYmFzZVZhbD0nJywgYW5pbVZhbD0nJ33vvIzlj6rog73pgJrov4dzZXQvZ2V0QXR0cmlidXRl5pON5L2cXG5cdCAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNscylcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IGNsc1xuXHQgICAgICAgIH1cblx0ICAgIH0gLy90b2dnbGXlrZjlnKjniYjmnKzlt67lvILvvIzlm6DmraTkuI3kvb/nlKjlroNcblx0fVxuXG5cdGZ1bmN0aW9uIGZha2VDbGFzc0xpc3Qobm9kZSkge1xuXHQgICAgaWYgKCEoJ2NsYXNzTGlzdCcgaW4gbm9kZSkpIHtcblx0ICAgICAgICBub2RlLmNsYXNzTGlzdCA9IHtcblx0ICAgICAgICAgICAgbm9kZTogbm9kZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBmb3IgKHZhciBrIGluIGZha2VDbGFzc0xpc3RNZXRob2RzKSB7XG5cdCAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0W2suc2xpY2UoMSldID0gZmFrZUNsYXNzTGlzdE1ldGhvZHNba11cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gbm9kZS5jbGFzc0xpc3Rcblx0fVxuXG5cblx0J2FkZCxyZW1vdmUnLnJlcGxhY2UoYXZhbG9uLnJ3b3JkLCBmdW5jdGlvbiAobWV0aG9kKSB7XG5cdCAgICBhdmFsb24uZm5bbWV0aG9kICsgJ0NsYXNzJ10gPSBmdW5jdGlvbiAoY2xzKSB7XG5cdCAgICAgICAgdmFyIGVsID0gdGhpc1swXSB8fCB7fVxuXHQgICAgICAgIC8vaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvemgtQ04vZG9jcy9Nb3ppbGxhL0ZpcmVmb3gvUmVsZWFzZXMvMjZcblx0ICAgICAgICBpZiAoY2xzICYmIHR5cGVvZiBjbHMgPT09ICdzdHJpbmcnICYmIGVsLm5vZGVUeXBlID09PSAxKSB7XG5cdCAgICAgICAgICAgIGNscy5yZXBsYWNlKHJub3doaXRlLCBmdW5jdGlvbiAoYykge1xuXHQgICAgICAgICAgICAgICAgZmFrZUNsYXNzTGlzdChlbClbbWV0aG9kXShjKVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpc1xuXHQgICAgfVxuXHR9KVxuXG5cdGF2YWxvbi5mbi5taXgoe1xuXHQgICAgaGFzQ2xhc3M6IGZ1bmN0aW9uIChjbHMpIHtcblx0ICAgICAgICB2YXIgZWwgPSB0aGlzWzBdIHx8IHt9XG5cdCAgICAgICAgcmV0dXJuIGVsLm5vZGVUeXBlID09PSAxICYmIGZha2VDbGFzc0xpc3QoZWwpLmNvbnRhaW5zKGNscylcblx0ICAgIH0sXG5cdCAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24gKHZhbHVlLCBzdGF0ZVZhbCkge1xuXHQgICAgICAgIHZhciBpc0Jvb2wgPSB0eXBlb2Ygc3RhdGVWYWwgPT09ICdib29sZWFuJ1xuXHQgICAgICAgIHZhciBtZSA9IHRoaXNcblx0ICAgICAgICBTdHJpbmcodmFsdWUpLnJlcGxhY2Uocm5vd2hpdGUsIGZ1bmN0aW9uIChjKSB7XG5cdCAgICAgICAgICAgIHZhciBzdGF0ZSA9IGlzQm9vbCA/IHN0YXRlVmFsIDogIW1lLmhhc0NsYXNzKGMpXG5cdCAgICAgICAgICAgIG1lW3N0YXRlID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKGMpXG5cdCAgICAgICAgfSlcblx0ICAgICAgICByZXR1cm4gdGhpc1xuXHQgICAgfVxuXHR9KVxuXG5cblxuLyoqKi8gfSxcbi8qIDIyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcblx0dmFyIHByb3BNYXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKVxuXHR2YXIgaXNWTUwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KVxuXHR2YXIgcnN2ZyA9L15cXFtvYmplY3QgU1ZHXFx3KkVsZW1lbnRcXF0kL1xuXHR2YXIgcmFtcCA9IC8mYW1wOy9nXG5cblx0ZnVuY3Rpb24gYXR0clVwZGF0ZShub2RlLCB2bm9kZSkge1xuXHQgICAgdmFyIGF0dHJzID0gdm5vZGUuY2hhbmdlQXR0clxuXHQgICAgaWYgKCFub2RlIHx8IG5vZGUubm9kZVR5cGUgIT09IDEgKSB7XG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICBpZiAoYXR0cnMpIHtcblx0ICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBhdHRycykge1xuXHQgICAgICAgICAgICB2YXIgdmFsID0gYXR0cnNbYXR0ck5hbWVdXG5cdCAgICAgICAgICAgIC8vIOWkhOeQhui3r+W+hOWxnuaAp1xuXHQgICAgICAgICAgICBpZiAoYXR0ck5hbWUgPT09ICdocmVmJyB8fCBhdHRyTmFtZSA9PT0gJ3NyYycpIHtcblx0ICAgICAgICAgICAgICAgIGlmICghbm9kZS5oYXNBdHRyaWJ1dGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YWwgPSBTdHJpbmcodmFsKS5yZXBsYWNlKHJhbXAsICcmJykgLy/lpITnkIZJRTY36Ieq5Yqo6L2s5LmJ55qE6Zeu6aKYXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBub2RlW2F0dHJOYW1lXSA9IHZhbFxuXHQgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5jaHJvbWUgJiYgbm9kZS50YWdOYW1lID09PSAnRU1CRUQnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZSAvLyM1MjUgIGNocm9tZTEtMzfkuItlbWJlZOagh+etvuWKqOaAgeiuvue9rnNyY+S4jeiDveWPkeeUn+ivt+axglxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBjb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnbXMtc3JjJylcblx0ICAgICAgICAgICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGNvbW1lbnQsIG5vZGUpXG5cdCAgICAgICAgICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChub2RlLCBjb21tZW50KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgLy/lpITnkIZIVE1MNSBkYXRhLSrlsZ7mgKdcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChhdHRyTmFtZS5pbmRleE9mKCdkYXRhLScpID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgdmFsKVxuXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcHJvcE5hbWUgPSBwcm9wTWFwW2F0dHJOYW1lXSB8fCBhdHRyTmFtZVxuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlW3Byb3BOYW1lXSA9PT0gJ2Jvb2xlYW4nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbm9kZVtwcm9wTmFtZV0gPSAhIXZhbFxuXHQgICAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgICAgICAvL+W4g+WwlOWxnuaAp+W/hemhu+S9v+eUqGVsLnh4eCA9IHRydWV8ZmFsc2XmlrnlvI/orr7lgLxcblx0ICAgICAgICAgICAgICAgICAgICAvL+WmguaenOS4umZhbHNlLCBJReWFqOezu+WIl+S4i+ebuOW9k+S6jnNldEF0dHJpYnV0ZSh4eHgsJycpLFxuXHQgICAgICAgICAgICAgICAgICAgIC8v5Lya5b2x5ZON5Yiw5qC35byPLOmcgOimgei/m+S4gOatpeWkhOeQhlxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBpZiAodmFsID09PSBmYWxzZSApIHsvL+enu+mZpOWxnuaAp1xuXHQgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKHByb3BOYW1lKVxuXHQgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvL1NWR+WPquiDveS9v+eUqHNldEF0dHJpYnV0ZSh4eHgsIHl5eSksIFZNTOWPquiDveS9v+eUqG5vZGUueHh4ID0geXl5ICxcblx0ICAgICAgICAgICAgICAgIC8vSFRNTOeahOWbuuacieWxnuaAp+W/hemhu25vZGUueHh4ID0geXl5XG5cdCAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIHZhciBpc0lubmF0ZSA9IHJzdmcudGVzdChub2RlKSA/IGZhbHNlIDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgKCFhdmFsb24ubW9kZXJuICYmIGlzVk1MKG5vZGUpKSA/IHRydWUgOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBhdHRyTmFtZSBpbiBub2RlLmNsb25lTm9kZShmYWxzZSlcblx0ICAgICAgICAgICAgICAgIGlmIChpc0lubmF0ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIG5vZGVbcHJvcE5hbWVdID0gdmFsICsgJydcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbClcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICB9XG5cdCAgICAgICAgdm5vZGUuY2hhbmdlQXR0ciA9IG51bGxcblx0ICAgIH1cblx0fVxuXG5cdHZhciBydmFsaWRjaGFycyA9IC9eW1xcXSw6e31cXHNdKiQvLFxuXHQgICAgcnZhbGlkYnJhY2VzID0gLyg/Ol58OnwsKSg/OlxccypcXFspKy9nLFxuXHQgICAgcnZhbGlkZXNjYXBlID0gL1xcXFwoPzpbXCJcXFxcXFwvYmZucnRdfHVbXFxkYS1mQS1GXXs0fSkvZyxcblx0ICAgIHJ2YWxpZHRva2VucyA9IC9cIlteXCJcXFxcXFxyXFxuXSpcInx0cnVlfGZhbHNlfG51bGx8LT8oPzpcXGQrXFwufClcXGQrKD86W2VFXVsrLV0/XFxkK3wpL2dcblxuXHRhdmFsb24ucGFyc2VKU09OID0gYXZhbG9uLndpbmRvdy5KU09OID8gSlNPTi5wYXJzZSA6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgZGF0YSA9IGRhdGEudHJpbSgpXG5cdCAgICAgICAgaWYgKGRhdGEpIHtcblx0ICAgICAgICAgICAgaWYgKHJ2YWxpZGNoYXJzLnRlc3QoZGF0YS5yZXBsYWNlKHJ2YWxpZGVzY2FwZSwgJ0AnKVxuXHQgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHJ2YWxpZHRva2VucywgJ10nKVxuXHQgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHJ2YWxpZGJyYWNlcywgJycpKSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgZGF0YSkpKCkgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgYXZhbG9uLmVycm9yKCdJbnZhbGlkIEpTT046ICcgKyBkYXRhKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGRhdGFcblx0fVxuXG5cblx0YXZhbG9uLmZuLmF0dHIgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0ICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG5cdCAgICAgICAgdGhpc1swXS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXG5cdCAgICAgICAgcmV0dXJuIHRoaXNcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXNbMF0uZ2V0QXR0cmlidXRlKG5hbWUpXG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF0dHJVcGRhdGVcblxuLyoqKi8gfSxcbi8qIDIzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgcHJvcE1hcCA9IHsvL+S4jeinhOWImeeahOWxnuaAp+WQjeaYoOWwhFxuXHQgICAgJ2FjY2VwdC1jaGFyc2V0JzogJ2FjY2VwdENoYXJzZXQnLFxuXHQgICAgJ2NoYXInOiAnY2gnLFxuXHQgICAgY2hhcm9mZjogJ2NoT2ZmJyxcblx0ICAgICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuXHQgICAgJ2Zvcic6ICdodG1sRm9yJyxcblx0ICAgICdodHRwLWVxdWl2JzogJ2h0dHBFcXVpdidcblx0fVxuXHQvKlxuXHRjb250ZW50ZWRpdGFibGXkuI3mmK/luIPlsJTlsZ7mgKdcblx0aHR0cDovL3d3dy56aGFuZ3hpbnh1LmNvbS93b3JkcHJlc3MvMjAxNi8wMS9jb250ZW50ZWRpdGFibGUtcGxhaW50ZXh0LW9ubHkvXG5cdGNvbnRlbnRlZGl0YWJsZT0nJ1xuXHRjb250ZW50ZWRpdGFibGU9J2V2ZW50cydcblx0Y29udGVudGVkaXRhYmxlPSdjYXJldCdcblx0Y29udGVudGVkaXRhYmxlPSdwbGFpbnRleHQtb25seSdcblx0Y29udGVudGVkaXRhYmxlPSd0cnVlJ1xuXHRjb250ZW50ZWRpdGFibGU9J2ZhbHNlJ1xuXHQgKi9cblx0dmFyIGJvb2xzID0gWydhdXRvZm9jdXMsYXV0b3BsYXksYXN5bmMsYWxsb3dUcmFuc3BhcmVuY3ksY2hlY2tlZCxjb250cm9scycsXG5cdCAgICAnZGVjbGFyZSxkaXNhYmxlZCxkZWZlcixkZWZhdWx0Q2hlY2tlZCxkZWZhdWx0U2VsZWN0ZWQsJyxcblx0ICAgICdpc01hcCxsb29wLG11bHRpcGxlLG5vSHJlZixub1Jlc2l6ZSxub1NoYWRlJyxcblx0ICAgICdvcGVuLHJlYWRPbmx5LHNlbGVjdGVkJ1xuXHRdLmpvaW4oJywnKVxuXG5cdGJvb2xzLnJlcGxhY2UoL1xcdysvZywgZnVuY3Rpb24gKG5hbWUpIHtcblx0ICAgIHByb3BNYXBbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IG5hbWVcblx0fSlcblxuXHR2YXIgYW5vbWFseSA9IFsnYWNjZXNzS2V5LGJnQ29sb3IsY2VsbFBhZGRpbmcsY2VsbFNwYWNpbmcsY29kZUJhc2UsY29kZVR5cGUsY29sU3BhbicsXG5cdCAgICAnZGF0ZVRpbWUsZGVmYXVsdFZhbHVlLGNvbnRlbnRFZGl0YWJsZSxmcmFtZUJvcmRlcixsb25nRGVzYyxtYXhMZW5ndGgsJytcblx0ICAgICdtYXJnaW5XaWR0aCxtYXJnaW5IZWlnaHQscm93U3Bhbix0YWJJbmRleCx1c2VNYXAsdlNwYWNlLHZhbHVlVHlwZSx2QWxpZ24nXG5cdF0uam9pbignLCcpXG5cblx0YW5vbWFseS5yZXBsYWNlKC9cXHcrL2csIGZ1bmN0aW9uIChuYW1lKSB7XG5cdCAgICBwcm9wTWFwW25hbWUudG9Mb3dlckNhc2UoKV0gPSBuYW1lXG5cdH0pXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBwcm9wTWFwXG5cblxuLyoqKi8gfSxcbi8qIDI0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRmdW5jdGlvbiBpc1ZNTChzcmMpIHtcblx0ICAgIHZhciBub2RlTmFtZSA9IHNyYy5ub2RlTmFtZVxuXHQgICAgcmV0dXJuIG5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lICYmIHNyYy5zY29wZU5hbWUgJiYgc3JjLm91dGVyVGV4dCA9PT0gJydcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gaXNWTUxcblxuLyoqKi8gfSxcbi8qIDI1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgcm9vdCA9IGF2YWxvbi5yb290XG5cdHZhciB3aW5kb3cgPSBhdmFsb24ud2luZG93XG5cdHZhciBjYW1lbGl6ZSA9IGF2YWxvbi5jYW1lbGl6ZVxuXHR2YXIgY3NzSG9va3MgPSBhdmFsb24uY3NzSG9va3NcblxuXHR2YXIgcHJlZml4ZXMgPSBbJycsICctd2Via2l0LScsICctby0nLCAnLW1vei0nLCAnLW1zLSddXG5cdHZhciBjc3NNYXAgPSB7XG5cdCAgICAnZmxvYXQnOiB3aW5kb3cuUmFuZ2UgPyAnY3NzRmxvYXQnIDogJ3N0eWxlRmxvYXQnXG5cdH1cblx0YXZhbG9uLmNzc051bWJlciA9IGF2YWxvbi5vbmVPYmplY3QoJ2FuaW1hdGlvbkl0ZXJhdGlvbkNvdW50LGNvbHVtbkNvdW50LG9yZGVyLGZsZXgsZmxleEdyb3csZmxleFNocmluayxmaWxsT3BhY2l0eSxmb250V2VpZ2h0LGxpbmVIZWlnaHQsb3BhY2l0eSxvcnBoYW5zLHdpZG93cyx6SW5kZXgsem9vbScpXG5cblx0YXZhbG9uLmNzc05hbWUgPSBmdW5jdGlvbiAobmFtZSwgaG9zdCwgY2FtZWxDYXNlKSB7XG5cdCAgICBpZiAoY3NzTWFwW25hbWVdKSB7XG5cdCAgICAgICAgcmV0dXJuIGNzc01hcFtuYW1lXVxuXHQgICAgfVxuXHQgICAgaG9zdCA9IGhvc3QgfHwgcm9vdC5zdHlsZSB8fCB7fVxuXHQgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBwcmVmaXhlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0ICAgICAgICBjYW1lbENhc2UgPSBjYW1lbGl6ZShwcmVmaXhlc1tpXSArIG5hbWUpXG5cdCAgICAgICAgaWYgKGNhbWVsQ2FzZSBpbiBob3N0KSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoY3NzTWFwW25hbWVdID0gY2FtZWxDYXNlKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBudWxsXG5cdH1cblxuXG5cdGF2YWxvbi5mbi5jc3MgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0ICAgIGlmIChhdmFsb24uaXNQbGFpbk9iamVjdChuYW1lKSkge1xuXHQgICAgICAgIGZvciAodmFyIGkgaW4gbmFtZSkge1xuXHQgICAgICAgICAgICBhdmFsb24uY3NzKHRoaXMsIGksIG5hbWVbaV0pXG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB2YXIgcmV0ID0gYXZhbG9uLmNzcyh0aGlzLCBuYW1lLCB2YWx1ZSlcblx0ICAgIH1cblx0ICAgIHJldHVybiByZXQgIT09IHZvaWQgMCA/IHJldCA6IHRoaXNcblx0fVxuXG5cdGF2YWxvbi5mbi5wb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBvZmZzZXRQYXJlbnQsIG9mZnNldCxcblx0ICAgICAgICAgICAgZWxlbSA9IHRoaXNbMF0sXG5cdCAgICAgICAgICAgIHBhcmVudE9mZnNldCA9IHtcblx0ICAgICAgICAgICAgICAgIHRvcDogMCxcblx0ICAgICAgICAgICAgICAgIGxlZnQ6IDBcblx0ICAgICAgICAgICAgfVxuXHQgICAgaWYgKCFlbGVtKSB7XG5cdCAgICAgICAgcmV0dXJuIHBhcmVudE9mZnNldFxuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuY3NzKCdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XG5cdCAgICAgICAgb2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBvZmZzZXRQYXJlbnQgPSB0aGlzLm9mZnNldFBhcmVudCgpIC8v5b6X5Yiw55yf5q2j55qEb2Zmc2V0UGFyZW50XG5cdCAgICAgICAgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoKSAvLyDlvpfliLDmraPnoa7nmoRvZmZzZXRQYXJlbnRcblx0ICAgICAgICBpZiAob2Zmc2V0UGFyZW50WzBdLnRhZ05hbWUgIT09ICdIVE1MJykge1xuXHQgICAgICAgICAgICBwYXJlbnRPZmZzZXQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0KClcblx0ICAgICAgICB9XG5cdCAgICAgICAgcGFyZW50T2Zmc2V0LnRvcCArPSBhdmFsb24uY3NzKG9mZnNldFBhcmVudFswXSwgJ2JvcmRlclRvcFdpZHRoJywgdHJ1ZSlcblx0ICAgICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBhdmFsb24uY3NzKG9mZnNldFBhcmVudFswXSwgJ2JvcmRlckxlZnRXaWR0aCcsIHRydWUpXG5cblx0ICAgICAgICAvLyBTdWJ0cmFjdCBvZmZzZXRQYXJlbnQgc2Nyb2xsIHBvc2l0aW9uc1xuXHQgICAgICAgIHBhcmVudE9mZnNldC50b3AgLT0gb2Zmc2V0UGFyZW50LnNjcm9sbFRvcCgpXG5cdCAgICAgICAgcGFyZW50T2Zmc2V0LmxlZnQgLT0gb2Zmc2V0UGFyZW50LnNjcm9sbExlZnQoKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgICB0b3A6IG9mZnNldC50b3AgLSBwYXJlbnRPZmZzZXQudG9wIC0gYXZhbG9uLmNzcyhlbGVtLCAnbWFyZ2luVG9wJywgdHJ1ZSksXG5cdCAgICAgICAgbGVmdDogb2Zmc2V0LmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdCAtIGF2YWxvbi5jc3MoZWxlbSwgJ21hcmdpbkxlZnQnLCB0cnVlKVxuXHQgICAgfVxuXHR9XG5cdGF2YWxvbi5mbi5vZmZzZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgb2Zmc2V0UGFyZW50ID0gdGhpc1swXS5vZmZzZXRQYXJlbnRcblx0ICAgIHdoaWxlIChvZmZzZXRQYXJlbnQgJiYgYXZhbG9uLmNzcyhvZmZzZXRQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuXHQgICAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5vZmZzZXRQYXJlbnRcblx0ICAgIH1cblx0ICAgIHJldHVybiBhdmFsb24ob2Zmc2V0UGFyZW50IHx8IHJvb3QpXG5cdH1cblxuXHRjc3NIb29rc1snQDpzZXQnXSA9IGZ1bmN0aW9uIChub2RlLCBuYW1lLCB2YWx1ZSkge1xuXHQgICAgdHJ5IHtcblx0ICAgICAgICAvL25vZGUuc3R5bGUud2lkdGggPSBOYU47bm9kZS5zdHlsZS53aWR0aCA9ICd4eHh4eHh4Jztcblx0ICAgICAgICAvL25vZGUuc3R5bGUud2lkdGggPSB1bmRlZmluZSDlnKjml6flvI9JReS4i+S8muaKm+W8guW4uFxuXHQgICAgICAgIG5vZGUuc3R5bGVbbmFtZV0gPSB2YWx1ZVxuXHQgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG5cdCAgICBjc3NIb29rc1snQDpnZXQnXSA9IGZ1bmN0aW9uIChub2RlLCBuYW1lKSB7XG5cdCAgICAgICAgaWYgKCFub2RlIHx8ICFub2RlLnN0eWxlKSB7XG5cdCAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0Q29tcHV0ZWRTdHlsZeimgeaxguS8oOWFpeS4gOS4quiKgueCuSAnICsgbm9kZSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHJldCwgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKVxuXHQgICAgICAgIGlmIChzdHlsZXMpIHtcblx0ICAgICAgICAgICAgcmV0ID0gbmFtZSA9PT0gJ2ZpbHRlcicgPyBzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKSA6IHN0eWxlc1tuYW1lXVxuXHQgICAgICAgICAgICBpZiAocmV0ID09PSAnJykge1xuXHQgICAgICAgICAgICAgICAgcmV0ID0gbm9kZS5zdHlsZVtuYW1lXSAvL+WFtuS7lua1j+iniOWZqOmcgOimgeaIkeS7rOaJi+WKqOWPluWGheiBlOagt+W8j1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXRcblx0ICAgIH1cblx0ICAgIGNzc0hvb2tzWydvcGFjaXR5OmdldCddID0gZnVuY3Rpb24gKG5vZGUpIHtcblx0ICAgICAgICB2YXIgcmV0ID0gY3NzSG9va3NbJ0A6Z2V0J10obm9kZSwgJ29wYWNpdHknKVxuXHQgICAgICAgIHJldHVybiByZXQgPT09ICcnID8gJzEnIDogcmV0XG5cdCAgICB9XG5cdH0gZWxzZSB7XG5cdCAgICB2YXIgcm51bW5vbnB4ID0gL14tPyg/OlxcZCpcXC4pP1xcZCsoPyFweClbXlxcZFxcc10rJC9pXG5cdCAgICB2YXIgcnBvc2l0aW9uID0gL14odG9wfHJpZ2h0fGJvdHRvbXxsZWZ0KSQvXG5cdCAgICB2YXIgcmFscGhhID0gL2FscGhhXFwoW14pXSpcXCkvaVxuXHQgICAgdmFyIGllOCA9ICEhd2luZG93LlhEb21haW5SZXF1ZXN0XG5cdCAgICB2YXIgc2FscGhhID0gJ0RYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkFscGhhJ1xuXHQgICAgdmFyIGJvcmRlciA9IHtcblx0ICAgICAgICB0aGluOiBpZTggPyAnMXB4JyA6ICcycHgnLFxuXHQgICAgICAgIG1lZGl1bTogaWU4ID8gJzNweCcgOiAnNHB4Jyxcblx0ICAgICAgICB0aGljazogaWU4ID8gJzVweCcgOiAnNnB4J1xuXHQgICAgfVxuXHQgICAgY3NzSG9va3NbJ0A6Z2V0J10gPSBmdW5jdGlvbiAobm9kZSwgbmFtZSkge1xuXHQgICAgICAgIC8v5Y+W5b6X57K+56Gu5YC877yM5LiN6L+H5a6D5pyJ5Y+v6IO95piv5bimZW0scGMsbW0scHQsJeetieWNleS9jVxuXHQgICAgICAgIHZhciBjdXJyZW50U3R5bGUgPSBub2RlLmN1cnJlbnRTdHlsZVxuXHQgICAgICAgIHZhciByZXQgPSBjdXJyZW50U3R5bGVbbmFtZV1cblx0ICAgICAgICBpZiAoKHJudW1ub25weC50ZXN0KHJldCkgJiYgIXJwb3NpdGlvbi50ZXN0KHJldCkpKSB7XG5cdCAgICAgICAgICAgIC8v4pGg77yM5L+d5a2Y5Y6f5pyJ55qEc3R5bGUubGVmdCwgcnVudGltZVN0eWxlLmxlZnQsXG5cdCAgICAgICAgICAgIHZhciBzdHlsZSA9IG5vZGUuc3R5bGUsXG5cdCAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHN0eWxlLmxlZnQsXG5cdCAgICAgICAgICAgICAgICAgICAgcnNMZWZ0ID0gbm9kZS5ydW50aW1lU3R5bGUubGVmdFxuXHQgICAgICAgICAgICAvL+KRoeeUseS6juKRouWkhOeahHN0eWxlLmxlZnQgPSB4eHjkvJrlvbHlk43liLBjdXJyZW50U3R5bGUubGVmdO+8jFxuXHQgICAgICAgICAgICAvL+WboOatpOaKiuWug2N1cnJlbnRTdHlsZS5sZWZ05pS+5YiwcnVudGltZVN0eWxlLmxlZnTvvIxcblx0ICAgICAgICAgICAgLy9ydW50aW1lU3R5bGUubGVmdOaLpeacieacgOmrmOS8mOWFiOe6p++8jOS4jeS8mnN0eWxlLmxlZnTlvbHlk41cblx0ICAgICAgICAgICAgbm9kZS5ydW50aW1lU3R5bGUubGVmdCA9IGN1cnJlbnRTdHlsZS5sZWZ0XG5cdCAgICAgICAgICAgIC8v4pGi5bCG57K+56Gu5YC86LWL57uZ5Yiwc3R5bGUubGVmdO+8jOeEtuWQjumAmui/h0lF55qE5Y+m5LiA5Liq56eB5pyJ5bGe5oCnIHN0eWxlLnBpeGVsTGVmdFxuXHQgICAgICAgICAgICAvL+W+l+WIsOWNleS9jeS4unB455qE57uT5p6c77ybZm9udFNpemXnmoTliIbmlK/op4FodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC83NjBcblx0ICAgICAgICAgICAgc3R5bGUubGVmdCA9IG5hbWUgPT09ICdmb250U2l6ZScgPyAnMWVtJyA6IChyZXQgfHwgMClcblx0ICAgICAgICAgICAgcmV0ID0gc3R5bGUucGl4ZWxMZWZ0ICsgJ3B4J1xuXHQgICAgICAgICAgICAvL+KRo+i/mOWOnyBzdHlsZS5sZWZ077yMcnVudGltZVN0eWxlLmxlZnRcblx0ICAgICAgICAgICAgc3R5bGUubGVmdCA9IGxlZnRcblx0ICAgICAgICAgICAgbm9kZS5ydW50aW1lU3R5bGUubGVmdCA9IHJzTGVmdFxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAocmV0ID09PSAnbWVkaXVtJykge1xuXHQgICAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKCdXaWR0aCcsICdTdHlsZScpXG5cdCAgICAgICAgICAgIC8vYm9yZGVyIHdpZHRoIOm7mOiupOWAvOS4um1lZGl1be+8jOWNs+S9v+WFtuS4ujAnXG5cdCAgICAgICAgICAgIGlmIChjdXJyZW50U3R5bGVbbmFtZV0gPT09ICdub25lJykge1xuXHQgICAgICAgICAgICAgICAgcmV0ID0gJzBweCdcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmV0ID09PSAnJyA/ICdhdXRvJyA6IGJvcmRlcltyZXRdIHx8IHJldFxuXHQgICAgfVxuXHQgICAgY3NzSG9va3NbJ29wYWNpdHk6c2V0J10gPSBmdW5jdGlvbiAobm9kZSwgbmFtZSwgdmFsdWUpIHtcblx0ICAgICAgICB2YXIgc3R5bGUgPSBub2RlLnN0eWxlXG5cdCAgICAgICAgdmFyIG9wYWNpdHkgPSBpc0Zpbml0ZSh2YWx1ZSkgJiYgdmFsdWUgPD0gMSA/ICdhbHBoYShvcGFjaXR5PScgKyB2YWx1ZSAqIDEwMCArICcpJyA6ICcnXG5cdCAgICAgICAgdmFyIGZpbHRlciA9IHN0eWxlLmZpbHRlciB8fCAnJ1xuXHQgICAgICAgIHN0eWxlLnpvb20gPSAxXG5cdCAgICAgICAgLy/kuI3og73kvb/nlKjku6XkuIvmlrnlvI/orr7nva7pgI/mmI7luqZcblx0ICAgICAgICAvL25vZGUuZmlsdGVycy5hbHBoYS5vcGFjaXR5ID0gdmFsdWUgKiAxMDBcblx0ICAgICAgICBzdHlsZS5maWx0ZXIgPSAocmFscGhhLnRlc3QoZmlsdGVyKSA/XG5cdCAgICAgICAgICAgICAgICBmaWx0ZXIucmVwbGFjZShyYWxwaGEsIG9wYWNpdHkpIDpcblx0ICAgICAgICAgICAgICAgIGZpbHRlciArICcgJyArIG9wYWNpdHkpLnRyaW0oKVxuXHQgICAgICAgIGlmICghc3R5bGUuZmlsdGVyKSB7XG5cdCAgICAgICAgICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgnZmlsdGVyJylcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBjc3NIb29rc1snb3BhY2l0eTpnZXQnXSA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdCAgICAgICAgLy/ov5nmmK/mnIDlv6vnmoTojrflj5ZJRemAj+aYjuWAvOeahOaWueW8j++8jOS4jemcgOimgeWKqOeUqOato+WImeS6hu+8gVxuXHQgICAgICAgIHZhciBhbHBoYSA9IG5vZGUuZmlsdGVycy5hbHBoYSB8fCBub2RlLmZpbHRlcnNbc2FscGhhXSxcblx0ICAgICAgICAgICAgICAgIG9wID0gYWxwaGEgJiYgYWxwaGEuZW5hYmxlZCA/IGFscGhhLm9wYWNpdHkgOiAxMDBcblx0ICAgICAgICByZXR1cm4gKG9wIC8gMTAwKSArICcnIC8v56Gu5L+d6L+U5Zue55qE5piv5a2X56ym5LiyXG5cdCAgICB9XG5cdH1cblxuXHQndG9wLGxlZnQnLnJlcGxhY2UoYXZhbG9uLnJ3b3JkLCBmdW5jdGlvbiAobmFtZSkge1xuXHQgICAgY3NzSG9va3NbbmFtZSArICc6Z2V0J10gPSBmdW5jdGlvbiAobm9kZSkge1xuXHQgICAgICAgIHZhciBjb21wdXRlZCA9IGNzc0hvb2tzWydAOmdldCddKG5vZGUsIG5hbWUpXG5cdCAgICAgICAgcmV0dXJuIC9weCQvLnRlc3QoY29tcHV0ZWQpID8gY29tcHV0ZWQgOlxuXHQgICAgICAgICAgICAgICAgYXZhbG9uKG5vZGUpLnBvc2l0aW9uKClbbmFtZV0gKyAncHgnXG5cdCAgICB9XG5cdH0pXG5cblx0dmFyIGNzc1Nob3cgPSB7XG5cdCAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0ICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuXHQgICAgZGlzcGxheTogJ2Jsb2NrJ1xuXHR9XG5cblx0dmFyIHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispL1xuXG5cdGZ1bmN0aW9uIHNob3dIaWRkZW4obm9kZSwgYXJyYXkpIHtcblx0ICAgIC8vaHR0cDovL3d3dy5jbmJsb2dzLmNvbS9ydWJ5bG91dnJlL2FyY2hpdmUvMjAxMi8xMC8yNy8yNzQyNTI5Lmh0bWxcblx0ICAgIGlmIChub2RlLm9mZnNldFdpZHRoIDw9IDApIHsgLy9vcGVyYS5vZmZzZXRXaWR0aOWPr+iDveWwj+S6jjBcblx0ICAgICAgICBpZiAocmRpc3BsYXlzd2FwLnRlc3QoY3NzSG9va3NbJ0A6Z2V0J10obm9kZSwgJ2Rpc3BsYXknKSkpIHtcblx0ICAgICAgICAgICAgdmFyIG9iaiA9IHtcblx0ICAgICAgICAgICAgICAgIG5vZGU6IG5vZGVcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGNzc1Nob3cpIHtcblx0ICAgICAgICAgICAgICAgIG9ialtuYW1lXSA9IG5vZGUuc3R5bGVbbmFtZV1cblx0ICAgICAgICAgICAgICAgIG5vZGUuc3R5bGVbbmFtZV0gPSBjc3NTaG93W25hbWVdXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgYXJyYXkucHVzaChvYmopXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGVcblx0ICAgICAgICBpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSA9PT0gMSkge1xuXHQgICAgICAgICAgICBzaG93SGlkZGVuKHBhcmVudCwgYXJyYXkpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cdGF2YWxvbi5lYWNoKHtcblx0ICAgIFdpZHRoOiAnd2lkdGgnLFxuXHQgICAgSGVpZ2h0OiAnaGVpZ2h0J1xuXHR9LCBmdW5jdGlvbiAobmFtZSwgbWV0aG9kKSB7XG5cdCAgICB2YXIgY2xpZW50UHJvcCA9ICdjbGllbnQnICsgbmFtZSxcblx0ICAgICAgICAgICAgc2Nyb2xsUHJvcCA9ICdzY3JvbGwnICsgbmFtZSxcblx0ICAgICAgICAgICAgb2Zmc2V0UHJvcCA9ICdvZmZzZXQnICsgbmFtZVxuXHQgICAgY3NzSG9va3NbbWV0aG9kICsgJzpnZXQnXSA9IGZ1bmN0aW9uIChub2RlLCB3aGljaCwgb3ZlcnJpZGUpIHtcblx0ICAgICAgICB2YXIgYm94U2l6aW5nID0gLTRcblx0ICAgICAgICBpZiAodHlwZW9mIG92ZXJyaWRlID09PSAnbnVtYmVyJykge1xuXHQgICAgICAgICAgICBib3hTaXppbmcgPSBvdmVycmlkZVxuXHQgICAgICAgIH1cblx0ICAgICAgICB3aGljaCA9IG5hbWUgPT09ICdXaWR0aCcgPyBbJ0xlZnQnLCAnUmlnaHQnXSA6IFsnVG9wJywgJ0JvdHRvbSddXG5cdCAgICAgICAgdmFyIHJldCA9IG5vZGVbb2Zmc2V0UHJvcF0gLy8gYm9yZGVyLWJveCAwXG5cdCAgICAgICAgaWYgKGJveFNpemluZyA9PT0gMikgeyAvLyBtYXJnaW4tYm94IDJcblx0ICAgICAgICAgICAgcmV0dXJuIHJldCArIGF2YWxvbi5jc3Mobm9kZSwgJ21hcmdpbicgKyB3aGljaFswXSwgdHJ1ZSkgKyBhdmFsb24uY3NzKG5vZGUsICdtYXJnaW4nICsgd2hpY2hbMV0sIHRydWUpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChib3hTaXppbmcgPCAwKSB7IC8vIHBhZGRpbmctYm94ICAtMlxuXHQgICAgICAgICAgICByZXQgPSByZXQgLSBhdmFsb24uY3NzKG5vZGUsICdib3JkZXInICsgd2hpY2hbMF0gKyAnV2lkdGgnLCB0cnVlKSAtIGF2YWxvbi5jc3Mobm9kZSwgJ2JvcmRlcicgKyB3aGljaFsxXSArICdXaWR0aCcsIHRydWUpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChib3hTaXppbmcgPT09IC00KSB7IC8vIGNvbnRlbnQtYm94IC00XG5cdCAgICAgICAgICAgIHJldCA9IHJldCAtIGF2YWxvbi5jc3Mobm9kZSwgJ3BhZGRpbmcnICsgd2hpY2hbMF0sIHRydWUpIC0gYXZhbG9uLmNzcyhub2RlLCAncGFkZGluZycgKyB3aGljaFsxXSwgdHJ1ZSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJldFxuXHQgICAgfVxuXHQgICAgY3NzSG9va3NbbWV0aG9kICsgJyZnZXQnXSA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdCAgICAgICAgdmFyIGhpZGRlbiA9IFtdXG5cdCAgICAgICAgc2hvd0hpZGRlbihub2RlLCBoaWRkZW4pXG5cdCAgICAgICAgdmFyIHZhbCA9IGNzc0hvb2tzW21ldGhvZCArICc6Z2V0J10obm9kZSlcblx0ICAgICAgICBmb3IgKHZhciBpID0gMCwgb2JqOyBvYmogPSBoaWRkZW5baSsrXTsgKSB7XG5cdCAgICAgICAgICAgIG5vZGUgPSBvYmoubm9kZVxuXHQgICAgICAgICAgICBmb3IgKHZhciBuIGluIG9iaikge1xuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbbl0gPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbm9kZS5zdHlsZVtuXSA9IG9ialtuXVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiB2YWxcblx0ICAgIH1cblx0ICAgIGF2YWxvbi5mblttZXRob2RdID0gZnVuY3Rpb24gKHZhbHVlKSB7IC8v5Lya5b+96KeG5YW2ZGlzcGxheVxuXHQgICAgICAgIHZhciBub2RlID0gdGhpc1swXVxuXHQgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG5cdCAgICAgICAgICAgIGlmIChub2RlLnNldFRpbWVvdXQpIHsgLy/lj5blvpfnqpflj6PlsLrlr7hcblx0ICAgICAgICAgICAgICAgIHJldHVybiBub2RlWydpbm5lcicgKyBuYW1lXSB8fFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtjbGllbnRQcm9wXSB8fFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmRvY3VtZW50LmJvZHlbY2xpZW50UHJvcF0gLy9JRTbkuIvliY3kuKTkuKrliIbliKvkuLp1bmRlZmluZWQsMFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSA5KSB7IC8v5Y+W5b6X6aG16Z2i5bC65a+4XG5cdCAgICAgICAgICAgICAgICB2YXIgZG9jID0gbm9kZS5kb2N1bWVudEVsZW1lbnRcblx0ICAgICAgICAgICAgICAgIC8vRkYgY2hyb21lICAgIGh0bWwuc2Nyb2xsSGVpZ2h0PCBib2R5LnNjcm9sbEhlaWdodFxuXHQgICAgICAgICAgICAgICAgLy9JRSDmoIflh4bmqKHlvI8gOiBodG1sLnNjcm9sbEhlaWdodD4gYm9keS5zY3JvbGxIZWlnaHRcblx0ICAgICAgICAgICAgICAgIC8vSUUg5oCq5byC5qih5byPIDogaHRtbC5zY3JvbGxIZWlnaHQg5pyA5aSn562J5LqO5Y+v6KeG56qX5Y+j5aSa5LiA54K577yfXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgobm9kZS5ib2R5W3Njcm9sbFByb3BdLCBkb2Nbc2Nyb2xsUHJvcF0sIG5vZGUuYm9keVtvZmZzZXRQcm9wXSwgZG9jW29mZnNldFByb3BdLCBkb2NbY2xpZW50UHJvcF0pXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGNzc0hvb2tzW21ldGhvZCArICcmZ2V0J10obm9kZSlcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5jc3MobWV0aG9kLCB2YWx1ZSlcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBhdmFsb24uZm5bJ2lubmVyJyArIG5hbWVdID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiBjc3NIb29rc1ttZXRob2QgKyAnOmdldCddKHRoaXNbMF0sIHZvaWQgMCwgLTIpXG5cdCAgICB9XG5cdCAgICBhdmFsb24uZm5bJ291dGVyJyArIG5hbWVdID0gZnVuY3Rpb24gKGluY2x1ZGVNYXJnaW4pIHtcblx0ICAgICAgICByZXR1cm4gY3NzSG9va3NbbWV0aG9kICsgJzpnZXQnXSh0aGlzWzBdLCB2b2lkIDAsIGluY2x1ZGVNYXJnaW4gPT09IHRydWUgPyAyIDogMClcblx0ICAgIH1cblx0fSlcblxuXHRhdmFsb24uZm4ub2Zmc2V0ID0gZnVuY3Rpb24gKCkgeyAvL+WPluW+l+i3neemu+mhtemdouW3puWPs+inkueahOWdkOagh1xuXHQgICAgdmFyIG5vZGUgPSB0aGlzWzBdLFxuXHQgICAgICAgICAgICBib3ggPSB7XG5cdCAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuXHQgICAgICAgICAgICAgICAgdG9wOiAwXG5cdCAgICAgICAgICAgIH1cblx0ICAgIGlmICghbm9kZSB8fCAhbm9kZS50YWdOYW1lIHx8ICFub2RlLm93bmVyRG9jdW1lbnQpIHtcblx0ICAgICAgICByZXR1cm4gYm94XG5cdCAgICB9XG5cdCAgICB2YXIgZG9jID0gbm9kZS5vd25lckRvY3VtZW50LFxuXHQgICAgICAgICAgICBib2R5ID0gZG9jLmJvZHksXG5cdCAgICAgICAgICAgIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuXHQgICAgICAgICAgICB3aW4gPSBkb2MuZGVmYXVsdFZpZXcgfHwgZG9jLnBhcmVudFdpbmRvd1xuXHQgICAgaWYgKCFhdmFsb24uY29udGFpbnMocm9vdCwgbm9kZSkpIHtcblx0ICAgICAgICByZXR1cm4gYm94XG5cdCAgICB9XG5cdCAgICAvL2h0dHA6Ly9oa29tLmJsb2cxLmZjMi5jb20vP21vZGU9bSZubz03NTAgYm9keeeahOWBj+enu+mHj+aYr+S4jeWMheWQq21hcmdpbueahFxuXHQgICAgLy/miJHku6zlj6/ku6XpgJrov4dnZXRCb3VuZGluZ0NsaWVudFJlY3TmnaXojrflvpflhYPntKDnm7jlr7nkuo5jbGllbnTnmoRyZWN0LlxuXHQgICAgLy9odHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzY0MzMuYXNweFxuXHQgICAgaWYgKG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG5cdCAgICAgICAgYm94ID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSAvLyBCbGFja0JlcnJ5IDUsIGlPUyAzIChvcmlnaW5hbCBpUGhvbmUpXG5cdCAgICB9XG5cdCAgICAvL2Nocm9tZS9JRTY6IGJvZHkuc2Nyb2xsVG9wLCBmaXJlZm94L290aGVyOiByb290LnNjcm9sbFRvcFxuXHQgICAgdmFyIGNsaWVudFRvcCA9IHJvb3QuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wLFxuXHQgICAgICAgICAgICBjbGllbnRMZWZ0ID0gcm9vdC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCxcblx0ICAgICAgICAgICAgc2Nyb2xsVG9wID0gTWF0aC5tYXgod2luLnBhZ2VZT2Zmc2V0IHx8IDAsIHJvb3Quc2Nyb2xsVG9wLCBib2R5LnNjcm9sbFRvcCksXG5cdCAgICAgICAgICAgIHNjcm9sbExlZnQgPSBNYXRoLm1heCh3aW4ucGFnZVhPZmZzZXQgfHwgMCwgcm9vdC5zY3JvbGxMZWZ0LCBib2R5LnNjcm9sbExlZnQpXG5cdCAgICAvLyDmiormu5rliqjot53nprvliqDliLBsZWZ0LHRvcOS4reWOu+OAglxuXHQgICAgLy8gSUXkuIDkupvniYjmnKzkuK3kvJroh6rliqjkuLpIVE1M5YWD57Sg5Yqg5LiKMnB455qEYm9yZGVy77yM5oiR5Lus6ZyA6KaB5Y675o6J5a6DXG5cdCAgICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzM1NjQoVlMuODUpLmFzcHhcblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgdG9wOiBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wLFxuXHQgICAgICAgIGxlZnQ6IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnRcblx0ICAgIH1cblx0fVxuXG5cdC8v55Sf5oiQYXZhbG9uLmZuLnNjcm9sbExlZnQsIGF2YWxvbi5mbi5zY3JvbGxUb3Dmlrnms5Vcblx0YXZhbG9uLmVhY2goe1xuXHQgICAgc2Nyb2xsTGVmdDogJ3BhZ2VYT2Zmc2V0Jyxcblx0ICAgIHNjcm9sbFRvcDogJ3BhZ2VZT2Zmc2V0J1xuXHR9LCBmdW5jdGlvbiAobWV0aG9kLCBwcm9wKSB7XG5cdCAgICBhdmFsb24uZm5bbWV0aG9kXSA9IGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXNbMF0gfHwge30sXG5cdCAgICAgICAgICAgICAgICB3aW4gPSBnZXRXaW5kb3cobm9kZSksXG5cdCAgICAgICAgICAgICAgICB0b3AgPSBtZXRob2QgPT09ICdzY3JvbGxUb3AnXG5cdCAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB3aW4gPyAocHJvcCBpbiB3aW4pID8gd2luW3Byb3BdIDogcm9vdFttZXRob2RdIDogbm9kZVttZXRob2RdXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgaWYgKHdpbikge1xuXHQgICAgICAgICAgICAgICAgd2luLnNjcm9sbFRvKCF0b3AgPyB2YWwgOiBhdmFsb24od2luKS5zY3JvbGxMZWZ0KCksIHRvcCA/IHZhbCA6IGF2YWxvbih3aW4pLnNjcm9sbFRvcCgpKVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgbm9kZVttZXRob2RdID0gdmFsXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH0pXG5cblx0ZnVuY3Rpb24gZ2V0V2luZG93KG5vZGUpIHtcblx0ICAgIHJldHVybiBub2RlLndpbmRvdyB8fCBub2RlLmRlZmF1bHRWaWV3IHx8IG5vZGUucGFyZW50V2luZG93IHx8IGZhbHNlXG5cdH1cblxuLyoqKi8gfSxcbi8qIDI2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRmdW5jdGlvbiBnZXRWYWxUeXBlKGVsZW0pIHtcblx0ICAgIHZhciByZXQgPSBlbGVtLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuXHQgICAgcmV0dXJuIHJldCA9PT0gJ2lucHV0JyAmJiAvY2hlY2tib3h8cmFkaW8vLnRlc3QoZWxlbS50eXBlKSA/ICdjaGVja2VkJyA6IHJldFxuXHR9XG5cdHZhciByb3B0aW9uID0gL148b3B0aW9uKD86XFxzK1xcdysoPzpcXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHM+XSspKT8pKlxccyt2YWx1ZVtcXHM9XS9pXG5cdHZhciB2YWxIb29rcyA9IHtcblx0ICAgICdvcHRpb246Z2V0JzogYXZhbG9uLm1zaWUgPyBmdW5jdGlvbiAobm9kZSkge1xuXHQgICAgICAgIC8v5ZyoSUUxMeWPilczQ++8jOWmguaenOayoeacieaMh+WumnZhbHVl77yM6YKj5LmIbm9kZS52YWx1Zem7mOiupOS4um5vZGUudGV4dO+8iOWtmOWcqHRyaW3kvZzvvInvvIzkvYZJRTktMTDliJnmmK/lj5Zpbm5lckhUTUwo5rKhdHJpbeaTjeS9nClcblx0ICAgICAgICAvL3NwZWNpZmllZOW5tuS4jeWPr+mdoO+8jOWboOatpOmAmui/h+WIhuaekG91dGVySFRNTOWIpOWumueUqOaIt+acieayoeacieaYvuekuuWumuS5iXZhbHVlXG5cdCAgICAgICAgcmV0dXJuIHJvcHRpb24udGVzdChub2RlLm91dGVySFRNTCkgPyBub2RlLnZhbHVlIDogbm9kZS50ZXh0LnRyaW0oKVxuXHQgICAgfSA6IGZ1bmN0aW9uIChub2RlKSB7XG5cdCAgICAgICAgcmV0dXJuIG5vZGUudmFsdWVcblx0ICAgIH0sXG5cdCAgICAnc2VsZWN0OmdldCc6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xuXHQgICAgICAgIHZhciBvcHRpb24sIG9wdGlvbnMgPSBub2RlLm9wdGlvbnMsXG5cdCAgICAgICAgICAgICAgICBpbmRleCA9IG5vZGUuc2VsZWN0ZWRJbmRleCxcblx0ICAgICAgICAgICAgICAgIGdldHRlciA9IHZhbEhvb2tzWydvcHRpb246Z2V0J10sXG5cdCAgICAgICAgICAgICAgICBvbmUgPSBub2RlLnR5cGUgPT09ICdzZWxlY3Qtb25lJyB8fCBpbmRleCA8IDAsXG5cdCAgICAgICAgICAgICAgICB2YWx1ZXMgPSBvbmUgPyBudWxsIDogW10sXG5cdCAgICAgICAgICAgICAgICBtYXggPSBvbmUgPyBpbmRleCArIDEgOiBvcHRpb25zLmxlbmd0aCxcblx0ICAgICAgICAgICAgICAgIGkgPSBpbmRleCA8IDAgPyBtYXggOiBvbmUgPyBpbmRleCA6IDBcblx0ICAgICAgICBmb3IgKDsgaSA8IG1heDsgaSsrKSB7XG5cdCAgICAgICAgICAgIG9wdGlvbiA9IG9wdGlvbnNbaV1cblx0ICAgICAgICAgICAgLy9JRTYtOeWcqHJlc2V05ZCO5LiN5Lya5pS55Y+Yc2VsZWN0ZWTvvIzpnIDopoHmlLnnlKhpID09PSBpbmRleOWIpOWumlxuXHQgICAgICAgICAgICAvL+aIkeS7rOi/h+a7pOaJgOaciWRpc2FibGVk55qEb3B0aW9u5YWD57Sg77yM5L2G5Zyoc2FmYXJpNeS4i++8jFxuXHQgICAgICAgICAgICAvL+WmguaenOiuvue9rm9wdGdyb3Vw5Li6ZGlzYWJsZe+8jOmCo+S5iOWFtuaJgOacieWtqeWtkOmDvWRpc2FibGVcblx0ICAgICAgICAgICAgLy/lm6DmraTlvZPkuIDkuKrlhYPntKDkuLpkaXNhYmxl77yM6ZyA6KaB5qOA5rWL5YW25piv5ZCm5pi+5byP6K6+572u5LqGZGlzYWJsZeWPiuWFtueItuiKgueCueeahGRpc2FibGXmg4XlhrVcblx0ICAgICAgICAgICAgaWYgKChvcHRpb24uc2VsZWN0ZWQgfHwgaSA9PT0gaW5kZXgpICYmICFvcHRpb24uZGlzYWJsZWQgJiZcblx0ICAgICAgICAgICAgICAgICAgICAoIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkIHx8IG9wdGlvbi5wYXJlbnROb2RlLnRhZ05hbWUgIT09ICdPUFRHUk9VUCcpXG5cdCAgICAgICAgICAgICAgICAgICAgKSB7XG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IGdldHRlcihvcHRpb24pXG5cdCAgICAgICAgICAgICAgICBpZiAob25lKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvL+aUtumbhuaJgOaciXNlbGVjdGVk5YC857uE5oiQ5pWw57uE6L+U5ZueXG5cdCAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh2YWx1ZSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdmFsdWVzXG5cdCAgICB9LFxuXHQgICAgJ3NlbGVjdDpzZXQnOiBmdW5jdGlvbiAobm9kZSwgdmFsdWVzLCBvcHRpb25TZXQpIHtcblx0ICAgICAgICB2YWx1ZXMgPSBbXS5jb25jYXQodmFsdWVzKSAvL+W8uuWItui9rOaNouS4uuaVsOe7hFxuXHQgICAgICAgIHZhciBnZXR0ZXIgPSB2YWxIb29rc1snb3B0aW9uOmdldCddXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDAsIGVsOyBlbCA9IG5vZGUub3B0aW9uc1tpKytdOyApIHtcblx0ICAgICAgICAgICAgaWYgKChlbC5zZWxlY3RlZCA9IHZhbHVlcy5pbmRleE9mKGdldHRlcihlbCkpID4gLTEpKSB7XG5cdCAgICAgICAgICAgICAgICBvcHRpb25TZXQgPSB0cnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCFvcHRpb25TZXQpIHtcblx0ICAgICAgICAgICAgbm9kZS5zZWxlY3RlZEluZGV4ID0gLTFcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRhdmFsb24uZm4udmFsID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdCAgICB2YXIgbm9kZSA9IHRoaXNbMF1cblx0ICAgIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IDEpIHtcblx0ICAgICAgICB2YXIgZ2V0ID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMFxuXHQgICAgICAgIHZhciBhY2Nlc3MgPSBnZXQgPyAnOmdldCcgOiAnOnNldCdcblx0ICAgICAgICB2YXIgZm4gPSB2YWxIb29rc1tnZXRWYWxUeXBlKG5vZGUpICsgYWNjZXNzXVxuXHQgICAgICAgIGlmIChmbikge1xuXHQgICAgICAgICAgICB2YXIgdmFsID0gZm4obm9kZSwgdmFsdWUpXG5cdCAgICAgICAgfSBlbHNlIGlmIChnZXQpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChub2RlLnZhbHVlIHx8ICcnKS5yZXBsYWNlKC9cXHIvZywgJycpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGdldCA/IHZhbCA6IHRoaXNcblx0fVxuXG4vKioqLyB9LFxuLyogMjcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpXG5cblx0dmFyIGZpeENsb25lTm9kZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjkpXG5cblx0dmFyIHJodG1sID0gLzx8JiM/XFx3KzsvXG5cdHZhciBodG1sQ2FjaGUgPSBuZXcgQ2FjaGUoMTI4KVxuXHR2YXIgcnhodG1sID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW1xcdzpdKylbXj5dKilcXC8+L2lnXG5cblx0YXZhbG9uLnBhcnNlSFRNTCA9IGZ1bmN0aW9uIChodG1sKSB7XG5cdCAgICB2YXIgZnJhZ21lbnQgPSBhdmFsb24uYXZhbG9uRnJhZ21lbnQuY2xvbmVOb2RlKGZhbHNlKVxuXHQgICAgLy/lpITnkIbpnZ7lrZfnrKbkuLJcblx0ICAgIGlmICh0eXBlb2YgaHRtbCAhPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICByZXR1cm4gZnJhZ21lbnRcblx0ICAgIH1cblx0ICAgIC8v5aSE55CG6Z2eSFRNTOWtl+espuS4slxuXHQgICAgaWYgKCFyaHRtbC50ZXN0KGh0bWwpKSB7XG5cdCAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGh0bWwpXG5cdCAgICB9XG5cblx0ICAgIGh0bWwgPSBodG1sLnJlcGxhY2UocnhodG1sLCAnPCQxPjwvJDI+JykudHJpbSgpXG5cdCAgICB2YXIgaGFzQ2FjaGUgPSBodG1sQ2FjaGUuZ2V0KGh0bWwpXG5cdCAgICBpZiAoaGFzQ2FjaGUpIHtcblx0ICAgICAgICByZXR1cm4gZml4Q2xvbmVOb2RlKGhhc0NhY2hlKVxuXHQgICAgfVxuXHQgICAgdmFyIHZub2RlcyA9IGF2YWxvbi5sZXhlcihodG1sKVxuXHQgICAgZm9yICh2YXIgaSA9IDAsIGVsOyBlbCA9IHZub2Rlc1tpKytdOyApIHtcblx0ICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChhdmFsb24udmRvbUFkYXB0b3IoZWwsICd0b0RPTScpKVxuXHQgICAgfVxuXHQgICAgaWYgKGh0bWwubGVuZ3RoIDwgMTAyNCkge1xuXHQgICAgICAgIGh0bWxDYWNoZS5wdXQoaHRtbCwgZml4Q2xvbmVOb2RlKGZyYWdtZW50KSlcblx0ICAgIH1cblx0ICAgIHJldHVybiBmcmFnbWVudFxuXHR9XG5cblx0YXZhbG9uLmlubmVySFRNTCA9IGZ1bmN0aW9uIChub2RlLCBodG1sKSB7XG5cdCAgICBpZiAoIWF2YWxvbi5tb2Rlcm4gJiYgKCFyY3JlYXRlLnRlc3QoaHRtbCkgJiYgIXJuZXN0LnRlc3QoaHRtbCkpKSB7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBodG1sXG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICB2YXIgcGFyc2VkID0gdGhpcy5wYXJzZUhUTUwoaHRtbClcblx0ICAgIHRoaXMuY2xlYXJIVE1MKG5vZGUpLmFwcGVuZENoaWxkKHBhcnNlZClcblx0fVxuXG5cdHZhciByZXVuZXNjYXBlSFRNTCA9IC8mKD86YW1wfGx0fGd0fHF1b3R8IzM5fCM5Nik7L2dcblx0dmFyIGh0bWxVbmVzY2FwZXMgPSB7XG5cdCAgICAnJmFtcDsnOiAnJicsXG5cdCAgICAnJmx0Oyc6ICc8Jyxcblx0ICAgICcmZ3Q7JzogJz4nLFxuXHQgICAgJyZxdW90Oyc6ICdcIicsXG5cdCAgICAnJiMzOTsnOiBcIidcIixcblx0ICAgICcmIzk2Oyc6ICdgJ1xuXHR9XG5cdGF2YWxvbi51bmVzY2FwZUhUTUwgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdCAgICB2YXIgc3RyID0gJycgKyBzdHJpbmdcblx0ICAgIHJldHVybiBzdHIucmVwbGFjZShyZXVuZXNjYXBlSFRNTCwgZnVuY3Rpb24gKGMpIHtcblx0ICAgICAgICByZXR1cm4gaHRtbFVuZXNjYXBlc1tjXVxuXHQgICAgfSlcblx0fVxuXG5cdHZhciByZXNjYXBlSFRNTCA9IC9bXCInJjw+XS9cblx0Ly9odHRwczovL2dpdGh1Yi5jb20vbnRodHJhbi92ZG9tLXRvLWh0bWxcblx0Ly/lsIblrZfnrKbkuLLnu4/ov4cgc3RyIOi9rOS5ieW+l+WIsOmAguWQiOWcqOmhtemdouS4reaYvuekuueahOWGheWuuSwg5L6L5aaC5pu/5o2iIDwg5Li6ICZsdCBcblx0YXZhbG9uLmVzY2FwZUhUTUwgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdCAgICB2YXIgc3RyID0gJycgKyBzdHJpbmdcblx0ICAgIHZhciBtYXRjaCA9IHJlc2NhcGVIVE1MLmV4ZWMoc3RyKVxuXG5cdCAgICBpZiAoIW1hdGNoKSB7XG5cdCAgICAgICAgcmV0dXJuIHN0clxuXHQgICAgfVxuXG5cdCAgICB2YXIgZXNjYXBlXG5cdCAgICB2YXIgaHRtbCA9ICcnXG5cdCAgICB2YXIgaW5kZXggPSAwXG5cdCAgICB2YXIgbGFzdEluZGV4ID0gMFxuXG5cdCAgICBmb3IgKGluZGV4ID0gbWF0Y2guaW5kZXg7IGluZGV4IDwgc3RyLmxlbmd0aDsgaW5kZXgrKykge1xuXHQgICAgICAgIHN3aXRjaCAoc3RyLmNoYXJDb2RlQXQoaW5kZXgpKSB7XG5cdCAgICAgICAgICAgIGNhc2UgMzQ6IC8vIFwiXG5cdCAgICAgICAgICAgICAgICBlc2NhcGUgPSAnJnF1b3Q7J1xuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAzODogLy8gJlxuXHQgICAgICAgICAgICAgICAgZXNjYXBlID0gJyZhbXA7J1xuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAzOTogLy8gJ1xuXHQgICAgICAgICAgICAgICAgZXNjYXBlID0gJyYjMzk7J1xuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSA2MDogLy8gPFxuXHQgICAgICAgICAgICAgICAgZXNjYXBlID0gJyZsdDsnXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDYyOiAvLyA+XG5cdCAgICAgICAgICAgICAgICBlc2NhcGUgPSAnJmd0Oydcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmIChsYXN0SW5kZXggIT09IGluZGV4KSB7XG5cdCAgICAgICAgICAgIGh0bWwgKz0gc3RyLnN1YnN0cmluZyhsYXN0SW5kZXgsIGluZGV4KVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgMVxuXHQgICAgICAgIGh0bWwgKz0gZXNjYXBlXG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBsYXN0SW5kZXggIT09IGluZGV4XG5cdCAgICAgICAgICAgID8gaHRtbCArIHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleClcblx0ICAgICAgICAgICAgOiBodG1sXG5cdH1cblxuXHRhdmFsb24uY2xlYXJIVE1MID0gZnVuY3Rpb24gKG5vZGUpIHtcblx0ICAgIG5vZGUudGV4dENvbnRlbnQgPSAnJ1xuXHQgICAgd2hpbGUgKG5vZGUubGFzdENoaWxkKSB7XG5cdCAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RDaGlsZClcblx0ICAgIH1cblx0ICAgIHJldHVybiBub2RlXG5cdH1cblxuXG4vKioqLyB9LFxuLyogMjggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yc21zL2pzLWxydVxuXHRmdW5jdGlvbiBMUlUobWF4TGVuZ3RoKSB7XG5cdCAgICB0aGlzLnNpemUgPSAwXG5cdCAgICB0aGlzLmxpbWl0ID0gbWF4TGVuZ3RoXG5cdCAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSB2b2lkIDBcblx0ICAgIHRoaXMuX2tleW1hcCA9IHt9XG5cdH1cblxuXHR2YXIgcCA9IExSVS5wcm90b3R5cGVcblxuXHRwLnB1dCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdCAgICB2YXIgZW50cnkgPSB7XG5cdCAgICAgICAga2V5OiBrZXksXG5cdCAgICAgICAgdmFsdWU6IHZhbHVlXG5cdCAgICB9XG5cdCAgICB0aGlzLl9rZXltYXBba2V5XSA9IGVudHJ5XG5cdCAgICBpZiAodGhpcy50YWlsKSB7XG5cdCAgICAgICAgdGhpcy50YWlsLm5ld2VyID0gZW50cnlcblx0ICAgICAgICBlbnRyeS5vbGRlciA9IHRoaXMudGFpbFxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLmhlYWQgPSBlbnRyeVxuXHQgICAgfVxuXHQgICAgdGhpcy50YWlsID0gZW50cnlcblx0ICAgIGlmICh0aGlzLnNpemUgPT09IHRoaXMubGltaXQpIHtcblx0ICAgICAgICB0aGlzLnNoaWZ0KClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5zaXplKytcblx0ICAgIH1cblx0ICAgIHJldHVybiB2YWx1ZVxuXHR9XG5cblx0cC5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIHZhciBlbnRyeSA9IHRoaXMuaGVhZFxuXHQgICAgaWYgKGVudHJ5KSB7XG5cdCAgICAgICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5ld2VyXG5cdCAgICAgICAgdGhpcy5oZWFkLm9sZGVyID1cblx0ICAgICAgICAgICAgICAgIGVudHJ5Lm5ld2VyID1cblx0ICAgICAgICAgICAgICAgIGVudHJ5Lm9sZGVyID1cblx0ICAgICAgICAgICAgICAgIHRoaXMuX2tleW1hcFtlbnRyeS5rZXldID0gdm9pZCAwXG5cdCAgICAgICAgZGVsZXRlIHRoaXMuX2tleW1hcFtlbnRyeS5rZXldIC8vIzEwMjlcblx0ICAgIH1cblx0fVxuXHRwLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcblx0ICAgIHZhciBlbnRyeSA9IHRoaXMuX2tleW1hcFtrZXldXG5cdCAgICBpZiAoZW50cnkgPT09IHZvaWQgMClcblx0ICAgICAgICByZXR1cm5cblx0ICAgIGlmIChlbnRyeSA9PT0gdGhpcy50YWlsKSB7XG5cdCAgICAgICAgcmV0dXJuICBlbnRyeS52YWx1ZVxuXHQgICAgfVxuXHQgICAgLy8gSEVBRC0tLS0tLS0tLS0tLS0tVEFJTFxuXHQgICAgLy8gICA8Lm9sZGVyICAgLm5ld2VyPlxuXHQgICAgLy8gIDwtLS0gYWRkIGRpcmVjdGlvbiAtLVxuXHQgICAgLy8gICBBICBCICBDICA8RD4gIEVcblx0ICAgIGlmIChlbnRyeS5uZXdlcikge1xuXHQgICAgICAgIGlmIChlbnRyeSA9PT0gdGhpcy5oZWFkKSB7XG5cdCAgICAgICAgICAgIHRoaXMuaGVhZCA9IGVudHJ5Lm5ld2VyXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVudHJ5Lm5ld2VyLm9sZGVyID0gZW50cnkub2xkZXIgLy8gQyA8LS0gRS5cblx0ICAgIH1cblx0ICAgIGlmIChlbnRyeS5vbGRlcikge1xuXHQgICAgICAgIGVudHJ5Lm9sZGVyLm5ld2VyID0gZW50cnkubmV3ZXIgLy8gQy4gLS0+IEVcblx0ICAgIH1cblx0ICAgIGVudHJ5Lm5ld2VyID0gdm9pZCAwIC8vIEQgLS14XG5cdCAgICBlbnRyeS5vbGRlciA9IHRoaXMudGFpbCAvLyBELiAtLT4gRVxuXHQgICAgaWYgKHRoaXMudGFpbCkge1xuXHQgICAgICAgIHRoaXMudGFpbC5uZXdlciA9IGVudHJ5IC8vIEUuIDwtLSBEXG5cdCAgICB9XG5cdCAgICB0aGlzLnRhaWwgPSBlbnRyeVxuXHQgICAgcmV0dXJuIGVudHJ5LnZhbHVlXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IExSVVxuXG5cbi8qKiovIH0sXG4vKiAyOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIHJjaGVja2VkVHlwZSA9IC9yYWRpb3xjaGVja2JveC9cblxuXHRmdW5jdGlvbiBmaXgoZGVzdCwgc3JjKSB7XG5cdCAgICBpZiAoZGVzdC5ub2RlVHlwZSAhPT0gMSkge1xuXHQgICAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgdmFyIG5vZGVOYW1lID0gZGVzdC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXG5cdCAgICBpZiAobm9kZU5hbWUgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgaWYgKGRlc3QucGFyZW50Tm9kZSkge1xuXHQgICAgICAgICAgICBkZXN0Lm91dGVySFRNTCA9IHNyYy5vdXRlckhUTUxcblx0ICAgICAgICB9XG5cblx0ICAgIH0gZWxzZSBpZiAobm9kZU5hbWUgPT09ICdpbnB1dCcgJiYgcmNoZWNrZWRUeXBlLnRlc3Qoc3JjLnR5cGUpKSB7XG5cblx0ICAgICAgICBkZXN0LmRlZmF1bHRDaGVja2VkID0gZGVzdC5jaGVja2VkID0gc3JjLmNoZWNrZWRcblxuXHQgICAgICAgIGlmIChkZXN0LnZhbHVlICE9PSBzcmMudmFsdWUpIHtcblx0ICAgICAgICAgICAgZGVzdC52YWx1ZSA9IHNyYy52YWx1ZVxuXHQgICAgICAgIH1cblxuXHQgICAgfSBlbHNlIGlmIChub2RlTmFtZSA9PT0gJ29wdGlvbicpIHtcblx0ICAgICAgICBkZXN0LmRlZmF1bHRTZWxlY3RlZCA9IGRlc3Quc2VsZWN0ZWQgPSBzcmMuZGVmYXVsdFNlbGVjdGVkXG5cdCAgICB9IGVsc2UgaWYgKG5vZGVOYW1lID09PSAnaW5wdXQnIHx8IG5vZGVOYW1lID09PSAndGV4dGFyZWEnKSB7XG5cdCAgICAgICAgZGVzdC5kZWZhdWx0VmFsdWUgPSBzcmMuZGVmYXVsdFZhbHVlXG5cdCAgICB9XG5cdH1cblxuXG5cdGZ1bmN0aW9uIGdldEFsbChjb250ZXh0KSB7XG5cdCAgICByZXR1cm4gdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgP1xuXHQgICAgICAgICAgICBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKSA6XG5cdCAgICAgICAgICAgIHR5cGVvZiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwgIT09IFwidW5kZWZpbmVkXCIgP1xuXHQgICAgICAgICAgICBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpIDogW11cblx0fVxuXG5cdGZ1bmN0aW9uIGZpeENsb25lTm9kZShzcmMpIHtcblx0ICAgIHZhciB0YXJnZXQgPSBzcmMuY2xvbmVOb2RlKHRydWUpXG5cdCAgICBpZiAoYXZhbG9uLm1vZGVybilcblx0ICAgICAgICByZXR1cm4gdGFyZ2V0XG5cdCAgICB2YXIgdCA9IGdldEFsbCh0YXJnZXQpXG5cdCAgICB2YXIgcyA9IGdldEFsbChzcmMpXG5cdCAgICBhdmFsb24uZWFjaChzLCBmdW5jdGlvbiAoaSkge1xuXHQgICAgICAgIGZpeCh0W2ldLCBzW2ldKVxuXHQgICAgfSlcblx0ICAgIHJldHVybiB0YXJnZXRcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gZml4Q2xvbmVOb2RlXG5cbi8qKiovIH0sXG4vKiAzMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIGRvY3VtZW50ID0gYXZhbG9uLmRvY3VtZW50XG5cdHZhciB3aW5kb3cgPSBhdmFsb24ud2luZG93XG5cdHZhciByb290ID0gYXZhbG9uLnJvb3Rcblx0dmFyIFczQyA9IGF2YWxvbi5tb2Rlcm5cblxuXHR2YXIgZ2V0U2hvcnRJRCA9IF9fd2VicGFja19yZXF1aXJlX18oNikuZ2V0U2hvcnRJRFxuXHQvL2h0dHA6Ly93d3cuZmVpZXNvZnQuY29tL2h0bWwvZXZlbnRzLmh0bWxcblx0Ly9odHRwOi8vc2VnbWVudGZhdWx0LmNvbS9xLzEwMTAwMDAwMDA2ODc5NzcvYS0xMDIwMDAwMDAwNjg4NzU3XG5cdHZhciBjYW5CdWJibGVVcCA9IF9fd2VicGFja19yZXF1aXJlX18oMzEpXG5cblx0aWYgKCFXM0MpIHtcblx0ICAgIGRlbGV0ZSBjYW5CdWJibGVVcC5jaGFuZ2Vcblx0ICAgIGRlbGV0ZSBjYW5CdWJibGVVcC5zZWxlY3Rcblx0fVxuXG5cdHZhciBldmVudEhvb2tzID0gYXZhbG9uLmV2ZW50SG9va3Ncblx0Lyrnu5Hlrprkuovku7YqL1xuXHRhdmFsb24uYmluZCA9IGZ1bmN0aW9uIChlbGVtLCB0eXBlLCBmbikge1xuXHQgICAgaWYgKGVsZW0ubm9kZVR5cGUgPT09IDEpIHtcblx0ICAgICAgICB2YXIgdmFsdWUgPSBlbGVtLmdldEF0dHJpYnV0ZSgnYXZhbG9uLWV2ZW50cycpIHx8ICcnXG5cdCAgICAgICAgLy/lpoLmnpzmmK/kvb/nlKhtcy1vbi0q57uR5a6a55qE5Zue6LCDLOWFtnV1aWTmoLzlvI/kuLplMTIxMjIzMjQsXG5cdCAgICAgICAgLy/lpoLmnpzmmK/kvb/nlKhiaW5k5pa55rOV57uR5a6a55qE5Zue6LCDLOWFtnV1aWTmoLzlvI/kuLpfMTJcblx0ICAgICAgICB2YXIgdXVpZCA9IGdldFNob3J0SUQoZm4pXG5cdCAgICAgICAgdmFyIGhvb2sgPSBldmVudEhvb2tzW3R5cGVdXG5cdCAgICAgICAgaWYgKGhvb2spIHtcblx0ICAgICAgICAgICAgdHlwZSA9IGhvb2sudHlwZSB8fCB0eXBlXG5cdCAgICAgICAgICAgIGlmIChob29rLmZpeCkge1xuXHQgICAgICAgICAgICAgICAgZm4gPSBob29rLmZpeChlbGVtLCBmbilcblx0ICAgICAgICAgICAgICAgIGZuLnV1aWQgPSB1dWlkXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGtleSA9IHR5cGUgKyAnOicgKyB1dWlkXG5cdCAgICAgICAgYXZhbG9uLmV2ZW50TGlzdGVuZXJzW2ZuLnV1aWRdID0gZm5cblx0ICAgICAgICBpZiAodmFsdWUuaW5kZXhPZih0eXBlICsgJzonKSA9PT0gLTEpIHsvL+WQjOS4gOenjeS6i+S7tuWPque7keWumuS4gOasoVxuXHQgICAgICAgICAgICBpZiAoY2FuQnViYmxlVXBbdHlwZV0gfHwgKGF2YWxvbi5tb2Rlcm4gJiYgZm9jdXNCbHVyW3R5cGVdKSkge1xuXHQgICAgICAgICAgICAgICAgZGVsZWdhdGVFdmVudCh0eXBlKVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgbmF0aXZlQmluZChlbGVtLCB0eXBlLCBkaXNwYXRjaClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIga2V5cyA9IHZhbHVlLnNwbGl0KCcsJylcblx0ICAgICAgICBpZiAoa2V5c1swXSA9PT0gJycpIHtcblx0ICAgICAgICAgICAga2V5cy5zaGlmdCgpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChrZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcblx0ICAgICAgICAgICAga2V5cy5wdXNoKGtleSlcblx0ICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ2F2YWxvbi1ldmVudHMnLCBrZXlzLmpvaW4oJywnKSlcblx0ICAgICAgICAgICAgLy/lsIbku6TniYzmlL7ov5thdmFsb24tZXZlbnRz5bGe5oCn5LitXG5cdCAgICAgICAgfVxuXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIG5hdGl2ZUJpbmQoZWxlbSwgdHlwZSwgZm4pXG5cdCAgICB9XG5cdCAgICByZXR1cm4gZm4gLy/lhbzlrrnkuYvliY3nmoTniYjmnKxcblx0fVxuXG5cdGF2YWxvbi51bmJpbmQgPSBmdW5jdGlvbiAoZWxlbSwgdHlwZSwgZm4pIHtcblx0ICAgIGlmIChlbGVtLm5vZGVUeXBlID09PSAxKSB7XG5cdCAgICAgICAgdmFyIHZhbHVlID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2F2YWxvbi1ldmVudHMnKSB8fCAnJ1xuXHQgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHQgICAgICAgICAgICBjYXNlIDE6XG5cdCAgICAgICAgICAgICAgICBuYXRpdmVVbkJpbmQoZWxlbSwgdHlwZSwgZGlzcGF0Y2gpXG5cdCAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnYXZhbG9uLWV2ZW50cycpXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDI6XG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCcsJykuZmlsdGVyKGZ1bmN0aW9uIChzdHIpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLmluZGV4T2YodHlwZSArICc6JykgPT09IC0xXG5cdCAgICAgICAgICAgICAgICB9KS5qb2luKCcsJylcblx0ICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdhdmFsb24tZXZlbnRzJywgdmFsdWUpXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgdmFyIHNlYXJjaCA9IHR5cGUgKyAnOicgKyBmbi51dWlkXG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCcsJykuZmlsdGVyKGZ1bmN0aW9uIChzdHIpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyICE9PSBzZWFyY2hcblx0ICAgICAgICAgICAgICAgIH0pLmpvaW4oJywnKVxuXHQgICAgICAgICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ2F2YWxvbi1ldmVudHMnLCB2YWx1ZSlcblx0ICAgICAgICAgICAgICAgIGRlbGV0ZSBhdmFsb24uZXZlbnRMaXN0ZW5lcnNbZm4udXVpZF1cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBuYXRpdmVVbkJpbmQoZWxlbSwgdHlwZSwgZm4pXG5cdCAgICB9XG5cdH1cblxuXHR2YXIgdHlwZVJlZ0V4cCA9IHt9XG5cdGZ1bmN0aW9uIGNvbGxlY3RIYW5kbGVycyhlbGVtLCB0eXBlLCBoYW5kbGVycykge1xuXHQgICAgdmFyIHZhbHVlID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2F2YWxvbi1ldmVudHMnKVxuXHQgICAgaWYgKHZhbHVlICYmIChlbGVtLmRpc2FibGVkICE9PSB0cnVlIHx8IHR5cGUgIT09ICdjbGljaycpKSB7XG5cdCAgICAgICAgdmFyIHV1aWRzID0gW11cblx0ICAgICAgICB2YXIgcmVnID0gdHlwZVJlZ0V4cFt0eXBlXSB8fCAodHlwZVJlZ0V4cFt0eXBlXSA9IG5ldyBSZWdFeHAoXCJcXFxcYlwiICsgdHlwZSArICdcXFxcOihbXixcXFxcc10rKScsICdnJykpXG5cdCAgICAgICAgdmFsdWUucmVwbGFjZShyZWcsIGZ1bmN0aW9uIChhLCBiKSB7XG5cdCAgICAgICAgICAgIHV1aWRzLnB1c2goYilcblx0ICAgICAgICAgICAgcmV0dXJuIGFcblx0ICAgICAgICB9KVxuXHQgICAgICAgIGlmICh1dWlkcy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgaGFuZGxlcnMucHVzaCh7XG5cdCAgICAgICAgICAgICAgICBlbGVtOiBlbGVtLFxuXHQgICAgICAgICAgICAgICAgdXVpZHM6IHV1aWRzXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZVxuXHQgICAgdmFyIGcgPSBhdmFsb24uZ2VzdHVyZUV2ZW50cyB8fCB7fVxuXHQgICAgaWYgKGVsZW0gJiYgZWxlbS5nZXRBdHRyaWJ1dGUgJiYgKGNhbkJ1YmJsZVVwW3R5cGVdIHx8IGdbdHlwZV0pKSB7XG5cdCAgICAgICAgY29sbGVjdEhhbmRsZXJzKGVsZW0sIHR5cGUsIGhhbmRsZXJzKVxuXHQgICAgfVxuXG5cdH1cblx0dmFyIHJoYW5kbGVIYXNWbSA9IC9eZS9cblx0dmFyIHN0b3BJbW1lZGlhdGUgPSBmYWxzZVxuXHRmdW5jdGlvbiBkaXNwYXRjaChldmVudCkge1xuXHQgICAgZXZlbnQgPSBuZXcgYXZFdmVudChldmVudClcblx0ICAgIHZhciB0eXBlID0gZXZlbnQudHlwZVxuXHQgICAgdmFyIGVsZW0gPSBldmVudC50YXJnZXRcblx0ICAgIHZhciBoYW5kbGVycyA9IFtdXG5cdCAgICBjb2xsZWN0SGFuZGxlcnMoZWxlbSwgdHlwZSwgaGFuZGxlcnMpXG5cdCAgICB2YXIgaSA9IDAsIGosIHV1aWQsIGhhbmRsZXJcblx0ICAgIHdoaWxlICgoaGFuZGxlciA9IGhhbmRsZXJzW2krK10pICYmICFldmVudC5jYW5jZWxCdWJibGUpIHtcblx0ICAgICAgICB2YXIgaG9zdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBoYW5kbGVyLmVsZW1cblx0ICAgICAgICBqID0gMFxuXHQgICAgICAgIHdoaWxlICgodXVpZCA9IGhhbmRsZXIudXVpZHNbIGorKyBdKSkge1xuXHQgICAgICAgICAgICBpZiAoc3RvcEltbWVkaWF0ZSkge1xuXHQgICAgICAgICAgICAgICAgc3RvcEltbWVkaWF0ZSA9IGZhbHNlXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBmbiA9IGF2YWxvbi5ldmVudExpc3RlbmVyc1t1dWlkXVxuXHQgICAgICAgICAgICBpZiAoZm4pIHtcblx0ICAgICAgICAgICAgICAgIHZhciB2bSA9IHJoYW5kbGVIYXNWbS50ZXN0KHV1aWQpID8gaGFuZGxlci5lbGVtLl9tc19jb250ZXh0XyA6IDBcblx0ICAgICAgICAgICAgICAgIGlmICh2bSAmJiB2bS4kaGFzaGNvZGUgPT09IGZhbHNlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF2YWxvbi51bmJpbmQoZWxlbSwgdHlwZSwgZm4pXG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIHZhciByZXQgPSBmbi5jYWxsKHZtIHx8IGVsZW0sIGV2ZW50LCBob3N0Ll9tc19sb2NhbClcblxuXHQgICAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcblx0ICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdHZhciBmb2N1c0JsdXIgPSB7XG5cdCAgICBmb2N1czogdHJ1ZSxcblx0ICAgIGJsdXI6IHRydWVcblx0fVxuXHR2YXIgbmF0aXZlQmluZCA9IFczQyA/IGZ1bmN0aW9uIChlbCwgdHlwZSwgZm4sIGNhcHR1cmUpIHtcblx0ICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmUpXG5cdH0gOiBmdW5jdGlvbiAoZWwsIHR5cGUsIGZuKSB7XG5cdCAgICBlbC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgZm4pXG5cdH1cblx0dmFyIG5hdGl2ZVVuQmluZCA9IFczQyA/IGZ1bmN0aW9uIChlbCwgdHlwZSwgZm4pIHtcblx0ICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZm4pXG5cdH0gOiBmdW5jdGlvbiAoZWwsIHR5cGUsIGZuKSB7XG5cdCAgICBlbC5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgZm4pXG5cdH1cblxuXHRmdW5jdGlvbiBkZWxlZ2F0ZUV2ZW50KHR5cGUpIHtcblx0ICAgIHZhciB2YWx1ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKCdkZWxlZ2F0ZS1ldmVudHMnKSB8fCAnJ1xuXHQgICAgaWYgKHZhbHVlLmluZGV4T2YodHlwZSkgPT09IC0xKSB7XG5cdCAgICAgICAgdmFyIGFyciA9IHZhbHVlLm1hdGNoKGF2YWxvbi5yd29yZCkgfHwgW11cblx0ICAgICAgICBhcnIucHVzaCh0eXBlKVxuXHQgICAgICAgIHJvb3Quc2V0QXR0cmlidXRlKCdkZWxlZ2F0ZS1ldmVudHMnLCBhcnIuam9pbignLCcpKVxuXHQgICAgICAgIG5hdGl2ZUJpbmQocm9vdCwgdHlwZSwgZGlzcGF0Y2gsICEhZm9jdXNCbHVyW3R5cGVdKVxuXHQgICAgfVxuXHR9XG5cblx0YXZhbG9uLmZpcmVEb20gPSBmdW5jdGlvbiAoZWxlbSwgdHlwZSwgb3B0cykge1xuXHQgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG5cdCAgICAgICAgdmFyIGhhY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudHMnKVxuXHQgICAgICAgIGhhY2tFdmVudC5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSwgb3B0cylcblx0ICAgICAgICBhdmFsb24uc2hhZG93Q29weShoYWNrRXZlbnQsIG9wdHMpXG5cblx0ICAgICAgICBlbGVtLmRpc3BhdGNoRXZlbnQoaGFja0V2ZW50KVxuXHQgICAgfSBlbHNlIGlmIChyb290LmNvbnRhaW5zKGVsZW0pKSB7Ly9JRTYtOOinpuWPkeS6i+S7tuW/hemhu+S/neivgeWcqERPTeagkeS4rSzlkKbliJnmiqUnU0NSSVBUMTYzODk6IOacquaMh+aYjueahOmUmeivrydcblx0ICAgICAgICBoYWNrRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpXG5cdCAgICAgICAgYXZhbG9uLnNoYWRvd0NvcHkoaGFja0V2ZW50LCBvcHRzKVxuXHQgICAgICAgIGVsZW0uZmlyZUV2ZW50KCdvbicgKyB0eXBlLCBoYWNrRXZlbnQpXG5cdCAgICB9XG5cdH1cblxuXHR2YXIgcm1vdXNlRXZlbnQgPSAvXig/Om1vdXNlfGNvbnRleHRtZW51fGRyYWcpfGNsaWNrL1xuXHR2YXIgcmNvbnN0YW50ID0gL15bQS1aX10rJC9cblx0ZnVuY3Rpb24gYXZFdmVudChldmVudCkge1xuXHQgICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQpIHtcblx0ICAgICAgICByZXR1cm4gdGhpc1xuXHQgICAgfVxuXHQgICAgZm9yICh2YXIgaSBpbiBldmVudCkge1xuXHQgICAgICAgIGlmICghcmNvbnN0YW50LnRlc3QoaSkgJiYgdHlwZW9mIGV2ZW50W2ldICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgIHRoaXNbaV0gPSBldmVudFtpXVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGlmICghdGhpcy50YXJnZXQpIHtcblx0ICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LnNyY0VsZW1lbnRcblx0ICAgIH1cblx0ICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldFxuXHQgICAgaWYgKHRoaXMud2hpY2ggPT0gbnVsbCAmJiBldmVudC50eXBlLmluZGV4T2YoJ2tleScpID09PSAwKSB7XG5cdCAgICAgICAgdGhpcy53aGljaCA9IGV2ZW50LmNoYXJDb2RlICE9IG51bGwgPyBldmVudC5jaGFyQ29kZSA6IGV2ZW50LmtleUNvZGVcblx0ICAgIH0gZWxzZSBpZiAocm1vdXNlRXZlbnQudGVzdChldmVudC50eXBlKSAmJiAhKCdwYWdlWCcgaW4gdGhpcykpIHtcblx0ICAgICAgICB2YXIgZG9jID0gdGFyZ2V0Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnRcblx0ICAgICAgICB2YXIgYm94ID0gZG9jLmNvbXBhdE1vZGUgPT09ICdCYWNrQ29tcGF0JyA/IGRvYy5ib2R5IDogZG9jLmRvY3VtZW50RWxlbWVudFxuXHQgICAgICAgIHRoaXMucGFnZVggPSBldmVudC5jbGllbnRYICsgKGJveC5zY3JvbGxMZWZ0ID4+IDApIC0gKGJveC5jbGllbnRMZWZ0ID4+IDApXG5cdCAgICAgICAgdGhpcy5wYWdlWSA9IGV2ZW50LmNsaWVudFkgKyAoYm94LnNjcm9sbFRvcCA+PiAwKSAtIChib3guY2xpZW50VG9wID4+IDApXG5cdCAgICAgICAgdGhpcy53aGVlbERlbHRhWSA9IHRoaXMud2hlZWxEZWx0YVxuXHQgICAgICAgIHRoaXMud2hlZWxEZWx0YVggPSAwXG5cdCAgICB9XG5cdCAgICB0aGlzLnRpbWVTdGFtcCA9IG5ldyBEYXRlKCkgLSAwXG5cdCAgICB0aGlzLm9yaWdpbmFsRXZlbnQgPSBldmVudFxuXHR9XG5cdGF2RXZlbnQucHJvdG90eXBlID0ge1xuXHQgICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudCB8fCB7fVxuXHQgICAgICAgIGUucmV0dXJuVmFsdWUgPSB0aGlzLnJldHVyblZhbHVlID0gZmFsc2Vcblx0ICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuXHQgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgc3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQgfHwge31cblx0ICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRoaXMuY2FuY2VsQnViYmxlID0gdHJ1ZVxuXHQgICAgICAgIGlmIChlLnN0b3BQcm9wYWdhdGlvbikge1xuXHQgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHN0b3BJbW1lZGlhdGUgPSB0cnVlO1xuXHQgICAgICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uKClcblx0ICAgIH0sXG5cdCAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiAnW29iamVjdCBFdmVudF0nLy8jMTYxOVxuXHQgICAgfVxuXHR9XG5cblx0Ly/pkojlr7lmaXJlZm94LCBjaHJvbWXkv67mraNtb3VzZWVudGVyLCBtb3VzZWxlYXZlXG5cdGlmICghKCdvbm1vdXNlZW50ZXInIGluIHJvb3QpKSB7XG5cdCAgICBhdmFsb24uZWFjaCh7XG5cdCAgICAgICAgbW91c2VlbnRlcjogJ21vdXNlb3ZlcicsXG5cdCAgICAgICAgbW91c2VsZWF2ZTogJ21vdXNlb3V0J1xuXHQgICAgfSwgZnVuY3Rpb24gKG9yaWdUeXBlLCBmaXhUeXBlKSB7XG5cdCAgICAgICAgZXZlbnRIb29rc1tvcmlnVHlwZV0gPSB7XG5cdCAgICAgICAgICAgIHR5cGU6IGZpeFR5cGUsXG5cdCAgICAgICAgICAgIGZpeDogZnVuY3Rpb24gKGVsZW0sIGZuKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGUucmVsYXRlZFRhcmdldFxuXHQgICAgICAgICAgICAgICAgICAgIGlmICghdCB8fCAodCAhPT0gZWxlbSAmJiAhKGVsZW0uY29tcGFyZURvY3VtZW50UG9zaXRpb24odCkgJiAxNikpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlLnR5cGVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZS50eXBlID0gb3JpZ1R5cGVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9KVxuXHR9XG5cdC8v6ZKI5a+5SUU5KywgdzNj5L+u5q2jYW5pbWF0aW9uZW5kXG5cdGF2YWxvbi5lYWNoKHtcblx0ICAgIEFuaW1hdGlvbkV2ZW50OiAnYW5pbWF0aW9uZW5kJyxcblx0ICAgIFdlYktpdEFuaW1hdGlvbkV2ZW50OiAnd2Via2l0QW5pbWF0aW9uRW5kJ1xuXHR9LCBmdW5jdGlvbiAoY29uc3RydWN0LCBmaXhUeXBlKSB7XG5cdCAgICBpZiAod2luZG93W2NvbnN0cnVjdF0gJiYgIWV2ZW50SG9va3MuYW5pbWF0aW9uZW5kKSB7XG5cdCAgICAgICAgZXZlbnRIb29rcy5hbmltYXRpb25lbmQgPSB7XG5cdCAgICAgICAgICAgIHR5cGU6IGZpeFR5cGVcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH0pXG5cdC8v6ZKI5a+5SUU2LTjkv67mraNpbnB1dFxuXHRpZiAoISgnb25pbnB1dCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSkpIHtcblx0ICAgIGV2ZW50SG9va3MuaW5wdXQgPSB7XG5cdCAgICAgICAgdHlwZTogJ3Byb3BlcnR5Y2hhbmdlJyxcblx0ICAgICAgICBmaXg6IGZ1bmN0aW9uIChlbGVtLCBmbikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChlLnByb3BlcnR5TmFtZSA9PT0gJ3ZhbHVlJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGUudHlwZSA9ICdpbnB1dCdcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cdGlmIChkb2N1bWVudC5vbm1vdXNld2hlZWwgPT09IHZvaWQgMCkge1xuXHQgICAgLyogSUU2LTExIGNocm9tZSBtb3VzZXdoZWVsIHdoZWVsRGV0bGEg5LiLIC0xMjAg5LiKIDEyMFxuXHQgICAgIGZpcmVmb3ggRE9NTW91c2VTY3JvbGwgZGV0YWlsIOS4izMg5LiKLTNcblx0ICAgICBmaXJlZm94IHdoZWVsIGRldGxhWSDkuIszIOS4ii0zXG5cdCAgICAgSUU5LTExIHdoZWVsIGRlbHRhWSDkuIs0MCDkuIotNDBcblx0ICAgICBjaHJvbWUgd2hlZWwgZGVsdGFZIOS4izEwMCDkuIotMTAwICovXG5cdCAgICB2YXIgZml4V2hlZWxUeXBlID0gZG9jdW1lbnQub253aGVlbCAhPT0gdm9pZCAwID8gJ3doZWVsJyA6ICdET01Nb3VzZVNjcm9sbCdcblx0ICAgIHZhciBmaXhXaGVlbERlbHRhID0gZml4V2hlZWxUeXBlID09PSAnd2hlZWwnID8gJ2RlbHRhWScgOiAnZGV0YWlsJ1xuXHQgICAgZXZlbnRIb29rcy5tb3VzZXdoZWVsID0ge1xuXHQgICAgICAgIHR5cGU6IGZpeFdoZWVsVHlwZSxcblx0ICAgICAgICBmaXg6IGZ1bmN0aW9uIChlbGVtLCBmbikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IGVbZml4V2hlZWxEZWx0YV0gPiAwID8gLTEyMCA6IDEyMFxuXHQgICAgICAgICAgICAgICAgZS53aGVlbERlbHRhID0gfn5lbGVtLl9tc193aGVlbF8gKyBkZWx0YVxuXHQgICAgICAgICAgICAgICAgZWxlbS5fbXNfd2hlZWxfID0gZS53aGVlbERlbHRhWSA9IGUud2hlZWxEZWx0YVxuXG5cdCAgICAgICAgICAgICAgICBlLndoZWVsRGVsdGFYID0gMFxuXHQgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuXHQgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAndHlwZScsIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdtb3VzZXdoZWVsJ1xuXHQgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0YXZhbG9uLmZuLmJpbmQgPSBmdW5jdGlvbiAodHlwZSwgZm4sIHBoYXNlKSB7XG5cdCAgICBpZiAodGhpc1swXSkgeyAvL+atpOaWueazleS4jeS8mumTvlxuXHQgICAgICAgIHJldHVybiBhdmFsb24uYmluZCh0aGlzWzBdLCB0eXBlLCBmbiwgcGhhc2UpXG5cdCAgICB9XG5cdH1cblxuXHRhdmFsb24uZm4udW5iaW5kID0gZnVuY3Rpb24gKHR5cGUsIGZuLCBwaGFzZSkge1xuXHQgICAgaWYgKHRoaXNbMF0pIHtcblx0ICAgICAgICBhdmFsb24udW5iaW5kKHRoaXNbMF0sIHR5cGUsIGZuLCBwaGFzZSlcblx0ICAgIH1cblx0ICAgIHJldHVybiB0aGlzXG5cdH1cblxuXG4vKioqLyB9LFxuLyogMzEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8vaHR0cDovL3d3dy5mZWllc29mdC5jb20vaHRtbC9ldmVudHMuaHRtbFxuXHQvL2h0dHA6Ly9zZWdtZW50ZmF1bHQuY29tL3EvMTAxMDAwMDAwMDY4Nzk3Ny9hLTEwMjAwMDAwMDA2ODg3NTdcblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICBjbGljazogdHJ1ZSxcblx0ICAgIGRibGNsaWNrOiB0cnVlLFxuXHQgICAga2V5ZG93bjogdHJ1ZSxcblx0ICAgIGtleXByZXNzOiB0cnVlLFxuXHQgICAga2V5dXA6IHRydWUsXG5cdCAgICBtb3VzZWRvd246IHRydWUsXG5cdCAgICBtb3VzZW1vdmU6IHRydWUsXG5cdCAgICBtb3VzZXVwOiB0cnVlLFxuXHQgICAgbW91c2VvdmVyOiB0cnVlLFxuXHQgICAgbW91c2VvdXQ6IHRydWUsXG5cdCAgICB3aGVlbDogdHJ1ZSxcblx0ICAgIG1vdXNld2hlZWw6IHRydWUsXG5cdCAgICBpbnB1dDogdHJ1ZSxcblx0ICAgIGNoYW5nZTogdHJ1ZSxcblx0ICAgIGJlZm9yZWlucHV0OiB0cnVlLFxuXHQgICAgY29tcG9zaXRpb25zdGFydDogdHJ1ZSxcblx0ICAgIGNvbXBvc2l0aW9udXBkYXRlOiB0cnVlLFxuXHQgICAgY29tcG9zaXRpb25lbmQ6IHRydWUsXG5cdCAgICBzZWxlY3Q6IHRydWUsXG5cdCAgICAvL2h0dHA6Ly9ibG9nLmNzZG4ubmV0L2xlZV9tYWdudW0vYXJ0aWNsZS9kZXRhaWxzLzE3NzYxNDQxXG5cdCAgICBjdXQ6IHRydWUsXG5cdCAgICBjb3B5OiB0cnVlLFxuXHQgICAgcGFzdGU6IHRydWUsXG5cdCAgICBiZWZvcmVjdXQ6IHRydWUsXG5cdCAgICBiZWZvcmVjb3B5OiB0cnVlLFxuXHQgICAgYmVmb3JlcGFzdGU6IHRydWUsXG5cdCAgICBmb2N1c2luOiB0cnVlLFxuXHQgICAgZm9jdXNvdXQ6IHRydWUsXG5cdCAgICBET01Gb2N1c0luOiB0cnVlLFxuXHQgICAgRE9NRm9jdXNPdXQ6IHRydWUsXG5cdCAgICBET01BY3RpdmF0ZTogdHJ1ZSxcblx0ICAgIGRyYWdlbmQ6IHRydWUsXG5cdCAgICBkYXRhc2V0Y2hhbmdlZDogdHJ1ZVxuXHR9XG5cbi8qKiovIH0sXG4vKiAzMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHNjYW4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMzKVxuXHRzY2FuLmh0bWxmeSA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpXG5cdHZhciBkb2N1bWVudCA9IGF2YWxvbi5kb2N1bWVudFxuXHR2YXIgd2luZG93ID0gYXZhbG9uLndpbmRvd1xuXHR2YXIgcm9vdCA9IGF2YWxvbi5yb290XG5cblx0dmFyIHJlYWR5TGlzdCA9IFtdLCBpc1JlYWR5XG5cdHZhciBmaXJlUmVhZHkgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICAgIGlzUmVhZHkgPSB0cnVlXG5cblx0ICAgIHdoaWxlIChmbiA9IHJlYWR5TGlzdC5zaGlmdCgpKSB7XG5cdCAgICAgICAgZm4oYXZhbG9uKVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gZG9TY3JvbGxDaGVjaygpIHtcblx0ICAgIHRyeSB7IC8vSUXkuIvpgJrov4dkb1Njcm9sbENoZWNr5qOA5rWLRE9N5qCR5piv5ZCm5bu65a6MXG5cdCAgICAgICAgcm9vdC5kb1Njcm9sbCgnbGVmdCcpXG5cdCAgICAgICAgZmlyZVJlYWR5KClcblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICBzZXRUaW1lb3V0KGRvU2Nyb2xsQ2hlY2spXG5cdCAgICB9XG5cdH1cblxuXHRpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuXHQgICAgc2V0VGltZW91dChmaXJlUmVhZHkpIC8v5aaC5p6c5ZyoZG9tUmVhZHnkuYvlpJbliqDovb1cblx0fSBlbHNlIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG5cdCAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZmlyZVJlYWR5KVxuXHR9IGVsc2UgaWYgKGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG5cdCAgICBkb2N1bWVudC5hdHRhY2hFdmVudCgnb25yZWFkeXN0YXRlY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG5cdCAgICAgICAgICAgIGZpcmVSZWFkeSgpXG5cdCAgICAgICAgfVxuXHQgICAgfSlcblx0ICAgIHRyeSB7XG5cdCAgICAgICAgdmFyIGlzVG9wID0gd2luZG93LmZyYW1lRWxlbWVudCA9PT0gbnVsbFxuXHQgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgfVxuXHQgICAgaWYgKHJvb3QuZG9TY3JvbGwgJiYgaXNUb3AgJiYgd2luZG93LmV4dGVybmFsKSB7Ly9maXggSUUgaWZyYW1lIEJVR1xuXHQgICAgICAgIGRvU2Nyb2xsQ2hlY2soKVxuXHQgICAgfVxuXHR9XG5cdGlmICh3aW5kb3cuZG9jdW1lbnQpIHtcblx0ICAgIGF2YWxvbi5iaW5kKHdpbmRvdywgJ2xvYWQnLCBmaXJlUmVhZHkpXG5cdH1cblx0YXZhbG9uLnJlYWR5ID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgICBpZiAoIWlzUmVhZHkpIHtcblx0ICAgICAgICByZWFkeUxpc3QucHVzaChmbilcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgZm4oYXZhbG9uKVxuXHQgICAgfVxuXHR9XG5cblx0YXZhbG9uLnJlYWR5KGZ1bmN0aW9uKCl7XG5cdCAgICBzY2FuKGRvY3VtZW50LmJvZHkpXG5cdH0pXG5cblxuXG4vKioqLyB9LFxuLyogMzMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdHZhciBvbmNlV2FybiA9IHRydWUgLy/lj6rorablkYrkuIDmrKFcblx0ZnVuY3Rpb24gc2Nhbihub2Rlcykge1xuXHQgICAgdmFyIGdldEhUTUwgPSBhdmFsb24uc2Nhbi5odG1sZnlcblx0ICAgIGZvciAodmFyIGkgPSAwLCBlbGVtOyBlbGVtID0gbm9kZXNbaSsrXTsgKSB7XG5cdCAgICAgICAgaWYgKGVsZW0ubm9kZVR5cGUgPT09IDEpIHtcblx0ICAgICAgICAgICAgdmFyICRpZCA9IGdldENvbnRyb2xsZXIoZWxlbSlcblxuXHQgICAgICAgICAgICB2YXIgdm0gPSBhdmFsb24udm1vZGVsc1skaWRdXG5cdCAgICAgICAgICAgIGlmICh2bSAmJiAhdm0uJGVsZW1lbnQpIHtcblx0ICAgICAgICAgICAgICAgIGF2YWxvbihlbGVtKS5yZW1vdmVDbGFzcygnbXMtY29udHJvbGxlcicpXG5cdCAgICAgICAgICAgICAgICB2bS4kZWxlbWVudCA9IGVsZW1cblx0ICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgLy9JRTYtOOS4i+WFg+e0oOeahG91dGVySFRNTOWJjemdouS8muacieepuueZvVxuXHQgICAgICAgICAgICAgICAgdmFyIHRleHQgPSBnZXRIVE1MKGVsZW0pLy9lbGVtLm91dGVySFRNTFxuXHQgIFxuXHQgICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKClcblx0ICAgICAgICAgICAgICAgIGVsZW0udnRyZWUgPSBhdmFsb24uc3BlZWRVcChhdmFsb24ubGV4ZXIodGV4dCkpIFxuXHQgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICB2YXIgbm93MiA9IG5ldyBEYXRlKClcblx0ICAgICAgICAgICAgICAgIG9uY2VXYXJuICYmIGF2YWxvbi5sb2coJ+aehOW7uuiZmuaLn0RPTeiAl+aXticsIG5vdzIgLSBub3csICdtcycpXG5cdCAgICAgICAgICAgICAgICB2bS4kcmVuZGVyID0gYXZhbG9uLnJlbmRlcihlbGVtLnZ0cmVlKVxuXHQgICAgICAgICAgICAgICAgYXZhbG9uLnNjb3Blc1t2bS4kaWRdID0ge1xuXHQgICAgICAgICAgICAgICAgICAgIHZtb2RlbDogdm0sXG5cdCAgICAgICAgICAgICAgICAgICAgbG9jYWw6IHt9LFxuXHQgICAgICAgICAgICAgICAgICAgIGlzVGVtcDogdHJ1ZVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdmFyIG5vdzMgPSBuZXcgRGF0ZSgpXG5cdCAgICAgICAgICAgICAgICBvbmNlV2FybiAmJiBhdmFsb24ubG9nKCfmnoTlu7rlvZPliY12beeahCRyZW5kZXLmlrnms5XogJfml7YgJywgbm93MyAtIG5vdzIsICdtc1xcbicsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICflpoLmnpzmraTml7bpl7TlpKrplb8s6L6+MTAwbXPku6XkuIpcXG4nLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAn5bu66K6u5bCG5b2T5YmNbXMtY29udHJvbGxlcuaLhuWIhuaIkOWkmuS4qm1zLWNvbnRyb2xsZXIs5YeP5bCR5q+P5Liqdm3nrqHovpbnmoTljLrln58nKVxuXHQgICAgICAgICAgICAgICAgYXZhbG9uLnJlcmVuZGVyU3RhcnQgPSBub3czXG5cdCAgICAgICAgICAgICAgICBvbmNlV2FybiA9IGZhbHNlXG5cdCAgICAgICAgICAgICAgICBhdmFsb24uYmF0Y2goJGlkKVxuXG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAoISRpZCkge1xuXHQgICAgICAgICAgICAgICAgc2NhbihlbGVtLmNoaWxkTm9kZXMpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF2YWxvbi5zY2FuID0gZnVuY3Rpb24gKGEpIHtcblx0ICAgIGlmICghYSB8fCAhYS5ub2RlVHlwZSkge1xuXHQgICAgICAgIGF2YWxvbi53YXJuKCdbYXZhbG9uLnNjYW5dIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgZWxlbWVudCAsIGRvY3VtZW50RnJhZ21lbnQsIG9yIGRvY3VtZW50Jylcblx0ICAgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIHNjYW4oW2FdKVxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0Q29udHJvbGxlcihhKSB7XG5cdCAgICByZXR1cm4gYS5nZXRBdHRyaWJ1dGUoJ21zLWNvbnRyb2xsZXInKSB8fCBcblx0ICAgICAgICAgICAgYS5nZXRBdHRyaWJ1dGUoJzpjb250cm9sbGVyJykgXG5cdH1cblxuLyoqKi8gfSxcbi8qIDM0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgbm9DaGlsZCA9IGF2YWxvbi5vbmVPYmplY3QoXCJhcmVhLGJhc2UsYmFzZWZvbnQsYnIsY29sLGNvbW1hbmQsZW1iZWQsaHIsaW1nLGlucHV0LGxpbmssbWV0YSxwYXJhbSxzb3VyY2UsdHJhY2ssd2JyXCIpXG5cblx0ZnVuY3Rpb24gZ2V0SFRNTChlbCkge1xuXHQgICAgc3dpdGNoIChlbC5ub2RlVHlwZSkge1xuXHQgICAgICAgIGNhc2UgMTpcblx0ICAgICAgICAgICAgdmFyIHR5cGUgPSBlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXG5cdCAgICAgICAgICAgIHJldHVybiAnPCcgKyB0eXBlICsgZ2V0QXR0cmlidXRlcyhlbC5hdHRyaWJ1dGVzKSArXG5cdCAgICAgICAgICAgICAgICAgICAgKG5vQ2hpbGRbdHlwZV0gPyAnLz4nIDogKCc+JyArIGdldENoaWxkKGVsKSArICc8LycgKyB0eXBlICsgJz4nKSlcblx0ICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgICAgIHJldHVybiBhdmFsb24uZXNjYXBlSFRNTChlbC5ub2RlVmFsdWUpLy8jMTU5MlxuXHQgICAgICAgIGNhc2UgODpcblx0ICAgICAgICAgICAgcmV0dXJuICc8IS0tJyArIGVsLm5vZGVWYWx1ZSArICctLT4nXG5cdCAgICB9XG5cdH1cblxuXG5cdGZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoYXJyYXkpIHtcblx0ICAgIHZhciByZXQgPSBbXVxuXHQgICAgZm9yICh2YXIgaSA9IDAsIGF0dHI7IGF0dHIgPSBhcnJheVtpKytdOyApIHtcblx0ICAgICAgICBpZiAoYXR0ci5zcGVjaWZpZWQpIHtcblx0ICAgICAgICAgICAgcmV0LnB1c2goYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCkgKyAnPVwiJyArIGF2YWxvbi5lc2NhcGVIVE1MKGF0dHIudmFsdWUpICsgJ1wiJylcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICB2YXIgc3RyID0gcmV0LmpvaW4oJyAnKVxuXHQgICAgcmV0dXJuIHN0ciA/ICcgJyArIHN0ciA6ICcnXG5cdH1cblxuXHRmdW5jdGlvbiBnZXRDaGlsZChlbCkge1xuXHQgICAgdmFyIHJldCA9ICcnXG5cdCAgICBmb3IgKHZhciBpID0gMCwgbm9kZTsgbm9kZSA9IGVsLmNoaWxkTm9kZXNbaSsrXTsgKSB7XG5cdCAgICAgICAgcmV0ICs9IGdldEhUTUwobm9kZSlcblx0ICAgIH1cblx0ICAgIHJldHVybiByZXRcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwpe1xuXHQgICAgaWYoYXZhbG9uLm1zaWUgPiA4IHx8ICFhdmFsb24ubXNpZSl7XG5cdCAgICAgICAgcmV0dXJuIGVsLm91dGVySFRNTFxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGdldEhUTUwoZWwpXG5cdH1cblxuXG4vKioqLyB9LFxuLyogMzUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdF9fd2VicGFja19yZXF1aXJlX18oMzYpXG5cdF9fd2VicGFja19yZXF1aXJlX18oMzgpXG5cdC8v5aSE55CG5bGe5oCn5qC35byPXG5cdF9fd2VicGFja19yZXF1aXJlX18oNDApXG5cblx0X193ZWJwYWNrX3JlcXVpcmVfXyg0MSlcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg0Milcblx0Ly8vL+WkhOeQhuWGheWuuVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDQ0KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDQ1KVxuXHQvLy8v6ZyA6KaB55So5Yiw5LqL5Lu255qEXG5cdF9fd2VicGFja19yZXF1aXJlX18oNDYpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNDcpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNDgpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNTcpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNTgpXG5cdC8vXG5cdC8vLy/lpITnkIbpgLvovpFcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg1OSlcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg2MClcblx0Ly9cblx0X193ZWJwYWNrX3JlcXVpcmVfXyg2MSlcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg2NClcblx0Ly/kvJjlhYjnuqcgbXMtaW1wb3J0YW50LCBtcy1jb250cm9sbGVyLCBtcy1mb3IsIG1zLXdpZGdldCwgbXMtZWZmZWN0LCBtcy1pZlxuXHQvLy4uLi4uLi5cblx0Ly9tcy1kdXBsZXhcblxuXG4vKioqLyB9LFxuLyogMzYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8vIOaKveemu+WHuuadpeWFrOeUqFxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblxuXHRhdmFsb24uZGlyZWN0aXZlKCdpbXBvcnRhbnQnLCB7XG5cdCAgICBwcmlvcml0eTogMSxcblx0ICAgIHBhcnNlOiBmdW5jdGlvbiAoY29weSwgc3JjLCBiaW5kaW5nKSB7XG5cdCAgICAgICAgdmFyIHF1b3RlZCA9IGF2YWxvbi5xdW90ZShiaW5kaW5nLmV4cHIpXG5cdCAgICAgICAgY29weVtiaW5kaW5nLm5hbWVdID0gcXVvdGVkXG5cdCAgICAgICAgY29weS5sb2NhbCA9ICd7fSdcblx0ICAgICAgICBjb3B5LnZtb2RlbCA9ICcoZnVuY3Rpb24oKXsgcmV0dXJuIF9fdm1vZGVsX18gPSBhdmFsb24udm1vZGVsc1snICsgcXVvdGVkICsgJ119KSgpJ1xuXHQgICAgICAgIHNyYy4kcHJlcGVuZCA9IFsnKGZ1bmN0aW9uKF9fdm1vZGVsX18peycsXG5cdCAgICAgICAgICAgICd2YXIgaW1wb3J0YW50ID0gYXZhbG9uLnNjb3Blc1snICsgcXVvdGVkICsgJ10nLFxuXHQgICAgICAgICAgICAnaWYoaW1wb3J0YW50KXthdmFsb24ubG9nKFwi5LiN6L+b5YWlXCIrJyArIHF1b3RlZCArICcpO3JldHVybiB9Jyxcblx0ICAgICAgICBdLmpvaW4oJ1xcbicpICsgJ1xcbidcblx0ICAgICAgICBzcmMuJGFwcGVuZCA9ICdcXG59KSgpOydcblx0ICAgIH0sXG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgaWYgKGNvcHkgPT09IHNyYyB8fCBzcmMudm1vZGVsICE9PSBjb3B5LnZtb2RlbCkge1xuXHQgICAgICAgICAgICBzcmNbJ21zLWNvbnRyb2xsZXInXSA9IGNvcHlbbmFtZV1cblx0ICAgICAgICAgICAgc3JjLmxvY2FsID0gY29weS5sb2NhbFxuXHQgICAgICAgICAgICBzcmMudm1vZGVsID0gY29weS52bW9kZWxcblx0ICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSwgcGFyZW50KSB7XG5cdCAgICAgICAgYXZhbG9uLmRpcmVjdGl2ZXMuY29udHJvbGxlci51cGRhdGUoZG9tLCB2ZG9tLCBwYXJlbnQsICdpbXBvcnRhbnQnKVxuXHQgICAgfVxuXHR9KVxuXG5cbi8qKiovIH0sXG4vKiAzNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmRvbSwgdXBkYXRlLCBob29rTmFtZSkge1xuXHQgICAgaWYgKGhvb2tOYW1lKSB7XG5cdCAgICAgICAgdmRvbS5hZnRlckNoYW5nZSA9IHZkb20uYWZ0ZXJDaGFuZ2UgfHwgW11cblx0ICAgICAgICBhdmFsb24uQXJyYXkuZW5zdXJlKHZkb20uYWZ0ZXJDaGFuZ2UsIHVwZGF0ZSlcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdmFyIGRvbSA9IHZkb20uZG9tXG5cdCAgICAgICAgdXBkYXRlKHZkb20uZG9tLCB2ZG9tLCBkb20gJiYgZG9tLnBhcmVudE5vZGUpXG5cdCAgICB9XG5cdH1cblxuXG4vKioqLyB9LFxuLyogMzggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8vIOaKveemu+WHuuadpeWFrOeUqFxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblx0dmFyIHJlY29uY2lsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG5cblx0dmFyIGNhY2hlID0ge31cblx0YXZhbG9uLm1lZGlhdG9yRmFjdG9yeUNhY2hlID0gZnVuY3Rpb24gKF9fdm1vZGVsX18sIF9fcHJlc2VudF9fKSB7XG5cdCAgICB2YXIgYSA9IF9fdm1vZGVsX18uJGhhc2hjb2RlXG5cdCAgICB2YXIgYiA9IF9fcHJlc2VudF9fLiRoYXNoY29kZVxuXHQgICAgdmFyIGlkID0gYSArIGJcblx0ICAgIGlmIChjYWNoZVtpZF0pIHtcblx0ICAgICAgICByZXR1cm4gY2FjaGVbaWRdXG5cdCAgICB9XG5cdCAgICB2YXIgYyA9IGF2YWxvbi5tZWRpYXRvckZhY3RvcnkoX192bW9kZWxfXywgX19wcmVzZW50X18pXG5cdCAgICByZXR1cm4gIGNhY2hlW2lkXSA9IGNcblx0fVxuXHRhdmFsb24uZGlyZWN0aXZlKCdjb250cm9sbGVyJywge1xuXHQgICAgcHJpb3JpdHk6IDIsXG5cdCAgICBwYXJzZTogZnVuY3Rpb24gKGNvcHksIHNyYywgYmluZGluZykge1xuXHQgICAgICAgIHZhciBxdW90ZWQgPSBhdmFsb24ucXVvdGUoYmluZGluZy5leHByKVxuXHQgICAgICAgIGNvcHlbYmluZGluZy5uYW1lXSA9IHF1b3RlZFxuXHQgICAgICAgIGNvcHkubG9jYWwgPSAnX19sb2NhbF9fJ1xuXHQgICAgICAgIGNvcHkudm1vZGVsID0gW1xuXHQgICAgICAgICAgICAnKGZ1bmN0aW9uKCl7Jyxcblx0ICAgICAgICAgICAgJ3ZhciB2bSA9IGF2YWxvbi52bW9kZWxzWycgKyBxdW90ZWQgKyAnXScsXG5cdCAgICAgICAgICAgICdpZih2bSAmJiBfX3Ztb2RlbF9fJiYgdm0gIT09IF9fdm1vZGVsX18peycsXG5cdCAgICAgICAgICAgICdyZXR1cm4gX192bW9kZWxfXyA9IGF2YWxvbi5tZWRpYXRvckZhY3RvcnlDYWNoZShfX3Ztb2RlbF9fLCB2bSknLFxuXHQgICAgICAgICAgICAnfWVsc2UgaWYodm0peycsXG5cdCAgICAgICAgICAgICdyZXR1cm4gX192bW9kZWxfXyA9IHZtJyxcblx0ICAgICAgICAgICAgJ30nLFxuXHQgICAgICAgICAgICAnfSkoKSdcblx0ICAgICAgICBdLmpvaW4oJ1xcbicpXG5cblx0ICAgICAgICBzcmMuJHByZXBlbmQgPSAnKGZ1bmN0aW9uKF9fdm1vZGVsX18peydcblx0ICAgICAgICBzcmMuJGFwcGVuZCA9ICdcXG59KShfX3Ztb2RlbF9fKTsnXG5cdCAgICB9LFxuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSkge1xuXHQgICAgICAgIGlmIChjb3B5ID09PSBzcmMgfHwgc3JjW25hbWVdICE9PSBjb3B5W25hbWVdKSB7XG5cdCAgICAgICAgICAgIHNyY1tuYW1lXSA9IGNvcHlbbmFtZV1cblx0ICAgICAgICAgICAgc3JjLmxvY2FsID0gY29weS5sb2NhbFxuXHQgICAgICAgICAgICBzcmMudm1vZGVsID0gY29weS52bW9kZWxcblx0ICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSwgcGFyZW50LCBpbXBvcnRhbnQpIHtcblx0ICAgICAgICB2YXIgdm1vZGVsID0gdmRvbS52bW9kZWxcblx0ICAgICAgICB2YXIgbG9jYWwgPSB2ZG9tLmxvY2FsXG5cdCAgICAgICAgdmFyIGlkID0gdmRvbVsnbXMtY29udHJvbGxlciddXG5cdCAgICAgICAgdmFyIHNjb3BlID0gYXZhbG9uLnNjb3Blc1tpZF1cblx0ICAgICAgICBpZiAoc2NvcGUpIHtcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRlbGV0ZSB2ZG9tLnZtb2RlbFxuXHQgICAgICAgIGRlbGV0ZSB2ZG9tLmxvY2FsXG5cdCAgICAgICAgdmFyIHRvcCA9IGF2YWxvbi52bW9kZWxzW2lkXVxuXHQgICAgICAgIGlmICh2bW9kZWwuJGVsZW1lbnQgJiYgdm1vZGVsLiRlbGVtZW50LnZ0cmVlWzBdID09PSB2ZG9tKSB7XG5cdCAgICAgICAgICAgIHZhciByZW5kZXIgPSB2bW9kZWwuJHJlbmRlclxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJlbmRlciA9IGF2YWxvbi5yZW5kZXIoW3Zkb21dLCBsb2NhbClcblx0ICAgICAgICB9XG5cdCAgICAgICAgdm1vZGVsLiRyZW5kZXIgPSByZW5kZXJcblx0ICAgICAgICB2bW9kZWwuJGVsZW1lbnQgPSBkb21cblx0ICAgICAgXG5cdCAgICAgICAgcmVjb25jaWxlKFtkb21dLCBbdmRvbV0sIHBhcmVudClcblx0ICAgICAgICBkb20udnRyZWUgPSBbdmRvbV1cblx0ICAgICAgICBpZiAodG9wICE9PSB2bW9kZWwpIHtcblx0ICAgICAgICAgICAgdG9wLiRyZW5kZXIgPSB0b3AuJHJlbmRlciB8fCByZW5kZXJcblx0ICAgICAgICAgICAgdG9wLiRlbGVtZW50ID0gdG9wLiRlbGVtZW50IHx8IGRvbVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbmVlZEZpcmUgPSBpbXBvcnRhbnQgPyB2bW9kZWwgOiB0b3Bcblx0ICAgICAgICB2YXIgc2NvcGUgPSBhdmFsb24uc2NvcGVzW2lkXSA9IHtcblx0ICAgICAgICAgICAgdm1vZGVsOiB2bW9kZWwsXG5cdCAgICAgICAgICAgIGxvY2FsOiBsb2NhbFxuXHQgICAgICAgIH1cblx0ICAgICAgICB1cGRhdGUodmRvbSwgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgZXZlbnRzID0gbmVlZEZpcmUuJGV2ZW50c1tcIm9uUmVhZHlcIl1cblx0ICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuXHQgICAgICAgICAgICAgICAgbmVlZEZpcmUuJGZpcmUoJ29uUmVhZHknKVxuXHQgICAgICAgICAgICAgICAgZGVsZXRlIG5lZWRGaXJlLiRldmVudHMub25SZWFkeVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHNjb3BlLmlzTW91bnQgPSB0cnVlXG5cdCAgICAgICAgfSwgJ2FmdGVyQ2hhbmdlJylcblxuXHQgICAgfVxuXHR9KVxuXG5cbi8qKiovIH0sXG4vKiAzOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Lypcblx0ICogXG5cdCDoioLngrnlr7npvZDnrpfms5Vcblx0IOWFg+e0oOiKgueCueaYrzHvvIvlhbbnsbvlnotcblx0IOaWh+acrOiKgueCueaYrzPvvIvlhbbmmK/lkKbog73np7vpmaRcblx0IOazqOmHiuiKgueCueaYrzjvvIvlhbblhoXlrrlcblx0IOWPkeeOsOS4jeS4gOagt++8jOWwseWvueecn+WunkRPTeagkea3u+WKoOaIluWIoOmZpFxuXHQg5re75Yqg55qE5pivIG1zLWZvcixtcy1mb3ItZW5k5Y2g5L2N55qE5rOo6YeK6IqC54K5XG5cdCDliKDpmaTnmoTmmK/lpJrkvZnnmoTnqbrnmb3mlofmnKzoioLngrks5LiOSUU2LTjnp4HkuIvmt7vliqDnmoTlpYfmgKroioLngrlcblx0ICovXG5cdHZhciByZm9ySG9sZGVyID0gL15tc1xcLWZvci9cblx0dmFyIHJ3aGl0ZVJldGFpbiA9IC9bXFxTXFx4QTBdL1xuXHR2YXIgcGxhaW5UYWcgPSBhdmFsb24ub25lT2JqZWN0KCdzY3JpcHQsc3R5bGUseG1wLHRlbXBsYXRlLG5vc2NyaXB0LHRleHRhcmVhJylcblxuXHRmdW5jdGlvbiByZWNvbmNpbGUobm9kZXMsIHZub2RlcywgcGFyZW50KSB7XG5cdCAgICAvL+mBjeW5s+WMluiZmuaLn0RPTeagkVxuXHQgICAgdm5vZGVzID0gZmxhdHRlbih2bm9kZXMpXG5cdCAgICB2YXIgbWFwID0ge31cblx0ICAgIHZhciB2biA9IHZub2Rlcy5sZW5ndGhcblx0ICAgIGlmICh2biA9PT0gMClcblx0ICAgICAgICByZXR1cm5cblxuXHQgICAgdm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xuXHQgICAgICAgIG1hcFtpbmRleF0gPSBnZXRUeXBlKGVsKVxuXHQgICAgfSlcblx0ICAgIHZhciBuZXdOb2RlcyA9IFtdLCBjaGFuZ2UgPSBmYWxzZSwgZWwsIGkgPSAwXG5cdCAgICB2YXIgYnJlYWtMb29wID0gMFxuXHQgICAgd2hpbGUgKHRydWUpIHtcblx0ICAgICAgICBlbCA9IG5vZGVzW2krK11cblx0ICAgICAgICBpZiAoYnJlYWtMb29wKysgPiA1MDAwKSB7XG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciB2dHlwZSA9IGVsICYmIGdldFR5cGUoZWwpXG5cdCAgICAgICAgdmFyIHYgPSBuZXdOb2Rlcy5sZW5ndGgsIGNoZWNrXG5cdCAgICAgICAgaWYgKG1hcFt2XSA9PT0gdnR5cGUpIHtcblx0ICAgICAgICAgICAgaWYgKGNoZWNrICYmIGVsLm5vZGVUeXBlID09PSAxICYmIChlbC5nZXRBdHRyaWJ1dGUoJzpmb3InKXx8ZWwuZ2V0QXR0cmlidXRlKCdtcy1mb3InKSkpIHtcblx0ICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2Vcblx0ICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChlbClcblx0ICAgICAgICAgICAgdmFyIHZub2RlID0gdm5vZGVzW3ZdXG5cblx0ICAgICAgICAgICAgaWYgKHZub2RlLmR5bmFtaWMpIHtcblx0ICAgICAgICAgICAgICAgIHZub2RlLmRvbSA9IGVsXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IDEgJiYgIXZub2RlLmlzVm9pZFRhZyAmJiAhcGxhaW5UYWdbdm5vZGUudHlwZV0pIHtcblx0ICAgICAgICAgICAgICAgIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW9uZScpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvL+WcqGNocm9tZeS4jmZpcmVmb3jkuIvliKDmjolzZWxlY3TkuK3nmoTnqbrnmb3oioLngrnvvIzkvJrlvbHlk43liLBzZWxlY3RlZEluZGV4XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGZpeEluZGV4ID0gZWwuc2VsZWN0ZWRJbmRleFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmVjb25jaWxlKGVsLmNoaWxkTm9kZXMsIHZub2RlLmNoaWxkcmVuLCBlbClcblx0ICAgICAgICAgICAgICAgIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW9uZScpIHtcblx0ICAgICAgICAgICAgICAgICAgICBlbC5zZWxlY3RlZEluZGV4ID0gZml4SW5kZXhcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGNoYW5nZSA9IHRydWVcblx0ICAgICAgICAgICAgaWYgKG1hcFt2XSA9PT0gJzh0cnVlJykge1xuXHQgICAgICAgICAgICAgICAgdmFyIHZ2ID0gdm5vZGVzW3ZdXG5cdCAgICAgICAgICAgICAgICB2YXIgbm4gPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KHZ2Lm5vZGVWYWx1ZSlcblx0ICAgICAgICAgICAgICAgIHZ2LmRvbSA9IG5uXG5cdCAgICAgICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5uKVxuXHQgICAgICAgICAgICAgICAgaWYgKHZ2LmR5bmFtaWMgPT09ICdmb3InKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpID0gTWF0aC5tYXgoMCwgLS1pKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChuZXdOb2Rlcy5sZW5ndGggPT09IHZuKSB7XG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgaWYgKGNoYW5nZSkge1xuXHQgICAgICAgIHZhciBmID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLCBpID0gMFxuXHQgICAgICAgIHdoaWxlIChlbCA9IG5ld05vZGVzW2krK10pIHtcblx0ICAgICAgICAgICAgZi5hcHBlbmRDaGlsZChlbClcblx0ICAgICAgICB9XG5cdCAgICAgICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG5cdCAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZClcblx0ICAgICAgICB9XG5cdCAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGYpXG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHJlY29uY2lsZVxuXG5cblx0ZnVuY3Rpb24gZ2V0VHlwZShub2RlKSB7XG5cdCAgICBzd2l0Y2ggKG5vZGUubm9kZVR5cGUpIHtcblx0ICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgICAgIHJldHVybiAnMycgKyByd2hpdGVSZXRhaW4udGVzdChub2RlLm5vZGVWYWx1ZSlcblx0ICAgICAgICBjYXNlIDE6XG5cdCAgICAgICAgICAgIHJldHVybiAnMScgKyAobm9kZS5ub2RlTmFtZSB8fCBub2RlLnR5cGUpLnRvTG93ZXJDYXNlKClcblx0ICAgICAgICBjYXNlIDg6XG5cdCAgICAgICAgICAgIHJldHVybiAnOCcgKyByZm9ySG9sZGVyLnRlc3Qobm9kZS5ub2RlVmFsdWUpXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBmbGF0dGVuKG5vZGVzKSB7XG5cdCAgICB2YXIgYXJyID0gW11cblx0ICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSBub2Rlc1tpXTsgaSsrKSB7XG5cdCAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpKSB7XG5cdCAgICAgICAgICAgIGFyciA9IGFyci5jb25jYXQoZmxhdHRlbihlbCkpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgYXJyLnB1c2goZWwpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGFyclxuXHR9XG5cblxuXG4vKioqLyB9LFxuLyogNDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFxuXHR2YXIgYXR0clVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpXG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ2F0dHInLCB7XG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgdmFyIGEgPSBjb3B5W25hbWVdXG5cdCAgICAgICAgdmFyIHAgPSBzcmNbbmFtZV1cblx0ICAgICAgICBpZiAoYSAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcblx0ICAgICAgICAgICAgYSA9IGEuJG1vZGVsIHx8IGEgLy/lronlhajnmoTpgY3ljoZWQnNjcmlwdFxuXHQgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhKSkgey8v6L2s5o2i5oiQ5a+56LGhXG5cdCAgICAgICAgICAgICAgICBhID0gYXZhbG9uLm1peC5hcHBseSh7fSwgYSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoY29weSA9PT0gc3JjIHx8IHR5cGVvZiBwICE9PSAnb2JqZWN0Jykgey8v5aaC5p6c5LiA5byA5aeL5Li656m6XG5cdCAgICAgICAgICAgICAgICBzcmMuY2hhbmdlQXR0ciA9IHNyY1tuYW1lXSA9IGFcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHZhciBwYXRjaCA9IHt9XG5cdCAgICAgICAgICAgICAgICB2YXIgaGFzQ2hhbmdlID0gZmFsc2Vcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYSkgey8vZGlmZuW3ruW8gueCuVxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChhW2ldICE9PSBwW2ldKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NoYW5nZSA9IHRydWVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hbaV0gPSBhW2ldXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGhhc0NoYW5nZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHNyY1tuYW1lXSA9IGFcblx0ICAgICAgICAgICAgICAgICAgICBzcmMuY2hhbmdlQXR0ciA9IHBhdGNoXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKHNyYy5jaGFuZ2VBdHRyKSB7XG5cdCAgICAgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSApXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYoY29weSAhPT0gc3JjKXtcblx0ICAgICAgICAgICAgZGVsZXRlIGNvcHlbbmFtZV0vL+mHiuaUvuWGheWtmFxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICAvL2RvbSwgdm5vZGVcblx0ICAgIHVwZGF0ZTogYXR0clVwZGF0ZVxuXHR9KVxuXG5cbi8qKiovIH0sXG4vKiA0MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ2NzcycsIHtcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIG5hbWUpIHtcblx0ICAgICAgICB2YXIgYSA9IGNvcHlbbmFtZV1cblx0ICAgICAgICB2YXIgcCA9IHNyY1tuYW1lXVxuXHQgICAgICAgIGlmIChPYmplY3QoYSkgPT09IGEpIHtcblx0ICAgICAgICAgICAgYSA9IGEuJG1vZGVsIHx8IGEvL+WuieWFqOeahOmBjeWOhlZCc2NyaXB0XG5cdCAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGEpKSB7Ly/ovazmjaLmiJDlr7nosaFcblx0ICAgICAgICAgICAgICAgIGEgPSBhdmFsb24ubWl4LmFwcGx5KHt9LCBhKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChjb3B5ID09PSBzcmMgfHwgdHlwZW9mIHAgIT09ICdvYmplY3QnKSB7Ly/lpoLmnpzkuIDlvIDlp4vkuLrnqbpcblx0ICAgICAgICAgICAgICAgIHNyYy5jaGFuZ2VTdHlsZSA9IHNyY1tuYW1lXSA9IGFcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHZhciBwYXRjaCA9IHt9XG5cdCAgICAgICAgICAgICAgICB2YXIgaGFzQ2hhbmdlID0gZmFsc2Vcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gYSkgey8vZGlmZuW3ruW8gueCuVxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChhW2ldICE9PSBwW2ldKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NoYW5nZSA9IHRydWVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hbaV0gPSBhW2ldXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGhhc0NoYW5nZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHNyY1tuYW1lXSA9IGFcblx0ICAgICAgICAgICAgICAgICAgICBzcmMuY2hhbmdlU3R5bGUgPSBwYXRjaFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChzcmMuY2hhbmdlU3R5bGUpIHtcblx0ICAgICAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRlbGV0ZSBjb3B5W25hbWVdLy/ph4rmlL7lhoXlrZhcblx0ICAgIH0sXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uIChkb20sIHZkb20pIHtcblx0ICAgICAgICB2YXIgY2hhbmdlID0gdmRvbS5jaGFuZ2VTdHlsZVxuXHQgICAgICAgIHZhciB3cmFwID0gYXZhbG9uKGRvbSlcblx0ICAgICAgICBmb3IgKHZhciBuYW1lIGluIGNoYW5nZSkge1xuXHQgICAgICAgICAgICB3cmFwLmNzcyhuYW1lLCBjaGFuZ2VbbmFtZV0pXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRlbGV0ZSB2ZG9tLmNoYW5nZVN0eWxlXG5cdCAgICB9XG5cdH0pXG5cblxuLyoqKi8gfSxcbi8qIDQyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblxuXHR2YXIgbm9uZSA9ICdub25lJ1xuXHRmdW5jdGlvbiBwYXJzZURpc3BsYXkoZWxlbSwgdmFsKSB7XG5cdCAgICAvL+eUqOS6juWPluW+l+atpOexu+agh+etvueahOm7mOiupGRpc3BsYXnlgLxcblx0ICAgIHZhciBkb2MgPSBlbGVtLm93bmVyRG9jdW1lbnRcblx0ICAgIHZhciBub2RlTmFtZSA9IGVsZW0ubm9kZU5hbWVcblx0ICAgIHZhciBrZXkgPSAnXycgKyBub2RlTmFtZVxuXHQgICAgaWYgKCFwYXJzZURpc3BsYXlba2V5XSkge1xuXHQgICAgICAgIHZhciB0ZW1wID0gZG9jLmJvZHkuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpKVxuXHQgICAgICAgIGlmIChhdmFsb24ubW9kZXJuKSB7XG5cdCAgICAgICAgICAgIHZhbCA9IGdldENvbXB1dGVkU3R5bGUodGVtcCwgbnVsbCkuZGlzcGxheVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHZhbCA9IHRlbXAuY3VycmVudFN0eWxlLmRpc3BsYXlcblx0ICAgICAgICB9XG5cdCAgICAgICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQodGVtcClcblx0ICAgICAgICBpZiAodmFsID09PSBub25lKSB7XG5cdCAgICAgICAgICAgIHZhbCA9ICdibG9jaydcblx0ICAgICAgICB9XG5cdCAgICAgICAgcGFyc2VEaXNwbGF5W2tleV0gPSB2YWxcblx0ICAgIH1cblx0ICAgIHJldHVybiBwYXJzZURpc3BsYXlba2V5XVxuXHR9XG5cblx0YXZhbG9uLnBhcnNlRGlzcGxheSA9IHBhcnNlRGlzcGxheVxuXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ3Zpc2libGUnLCB7XG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgdmFyIGMgPSAhIWNvcHlbbmFtZV1cblx0ICAgICAgICBpZiAoY29weSA9PT0gc3JjIHx8IGMgIT09IHNyY1tuYW1lXSkge1xuXHQgICAgICAgICAgICBzcmNbbmFtZV0gPSBjXG5cdCAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlIClcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdXBkYXRlOiBmdW5jdGlvbiAoZG9tLCB2ZG9tKSB7IFxuXHQgICAgICAgIGlmKCFkb20gfHwgZG9tLm5vZGVUeXBlICE9PSAxKXtcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBzaG93ID0gdmRvbVsnbXMtdmlzaWJsZSddXG5cdCAgICAgICAgdmFyIGRpc3BsYXkgPSBkb20uc3R5bGUuZGlzcGxheVxuXHQgICAgICAgIHZhciB2YWx1ZVxuXHQgICAgICAgIGlmIChzaG93KSB7XG5cdCAgICAgICAgICAgIGlmIChkaXNwbGF5ID09PSBub25lKSB7XG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IHZkb20uZGlzcGxheVZhbHVlXG5cdCAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLmRpc3BsYXkgPSAnJ1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChkb20uc3R5bGUuZGlzcGxheSA9PT0gJycgJiYgYXZhbG9uKGRvbSkuY3NzKCdkaXNwbGF5JykgPT09IG5vbmUgJiZcblx0ICAgICAgICAgICAgICAgICAgICAvLyBmaXggZmlyZWZveCBCVUcs5b+F6aG75oyC5Yiw6aG16Z2i5LiKXG5cdCAgICAgICAgICAgICAgICAgICAgYXZhbG9uLmNvbnRhaW5zKGRvbS5vd25lckRvY3VtZW50LCBkb20pKSB7XG5cblx0ICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VEaXNwbGF5KGRvbSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGlmIChkaXNwbGF5ICE9PSBub25lKSB7XG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IG5vbmVcblx0ICAgICAgICAgICAgICAgIHZkb20uZGlzcGxheVZhbHVlID0gZGlzcGxheVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGZ1bmN0aW9uIGNiKCl7XG5cdCAgICAgICAgICAgaWYgKHZhbHVlICE9PSB2b2lkIDApIHtcblx0ICAgICAgICAgICAgICBkb20uc3R5bGUuZGlzcGxheSA9IHZhbHVlXG5cdCAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBhdmFsb24uYXBwbHlFZmZlY3QoZG9tLCB2ZG9tLCB7XG5cdCAgICAgICAgICAgIGhvb2s6IHNob3cgPyAnb25FbnRlckRvbmUnOiAnb25MZWF2ZURvbmUnLFxuXHQgICAgICAgICAgICBjYjogY2Jcblx0ICAgICAgICB9KVxuXHQgICAgfVxuXHR9KVxuXG5cblxuLyoqKi8gfSxcbi8qIDQzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblxuXHRhdmFsb24uZGlyZWN0aXZlKCdleHByJywge1xuXHQgICAgcGFyc2U6IGF2YWxvbi5ub29wLFxuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYykge1xuXHQgICAgICAgIHZhciBjb3B5VmFsdWUgPSBjb3B5Lm5vZGVWYWx1ZSArICcnXG5cdCAgICAgICAgaWYgKGNvcHkgPT09IHNyYyB8fCBjb3B5VmFsdWUgIT09IHNyYy5ub2RlVmFsdWUpIHtcblx0ICAgICAgICAgICAgc3JjLm5vZGVWYWx1ZSA9IGNvcHlWYWx1ZVxuXHQgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSlcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdXBkYXRlOiBmdW5jdGlvbiAoZG9tLCB2ZG9tKSB7XG5cdCAgICAgICAgaWYgKGRvbSkge1xuXHQgICAgICAgICAgICBkb20ubm9kZVZhbHVlID0gdmRvbS5ub2RlVmFsdWVcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBhdmFsb24ud2FybignWycsIHZkb20ubm9kZVZhbHVlLCAnXeaJvuS4jeWIsOWvueW6lOeahOaWh+acrOiKgueCuei1i+WAvCcpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9KVxuXG5cblxuXG4vKioqLyB9LFxuLyogNDQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8v5q2k5oyH5Luk5a6e6ZmF5LiK5LiN5Lya5pON5L2cRE9NLOS6pOeUsWV4cHLmjIfku6TlpITnkIZcblx0dmFyIHVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cblx0YXZhbG9uLmRpcmVjdGl2ZSgndGV4dCcsIHtcblx0ICAgIHBhcnNlOiBmdW5jdGlvbiAoY29weSwgc3JjLCBiaW5kaW5nKSB7XG5cdCAgICAgICAgY29weVtiaW5kaW5nLm5hbWVdID0gMVxuXHQgICAgICAgIHNyYy5jaGlsZHJlbiA9IFtdXG5cdCAgICAgICAgY29weS5jaGlsZHJlbiA9ICdbe1xcbm5vZGVUeXBlOjMsXFxudHlwZTpcIiN0ZXh0XCIsXFxuZHluYW1pYzp0cnVlLCcgK1xuXHQgICAgICAgICAgICAgICAgJ1xcbm5vZGVWYWx1ZTphdmFsb24ucGFyc2Vycy5zdHJpbmcoJyArXG5cdCAgICAgICAgICAgICAgICBhdmFsb24ucGFyc2VFeHByKGJpbmRpbmcpICsgJyl9XSdcblx0ICAgIH0sXG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjKSB7XG5cdCAgICAgICAgaWYoIXNyYy5jaGlsZHJlbi5sZW5ndGgpe1xuXHQgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlKVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uKGRvbSwgdmRvbSl7XG5cdCAgICAgICAgaWYgKGRvbSAmJiAhdmRvbS5pc1ZvaWRUYWcgKSB7XG5cdCAgICAgICAgICAgIHZhciBwYXJlbnQgPSBkb21cblx0ICAgICAgICAgICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG5cdCAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmZpcnN0Q2hpbGQpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCd4Jylcblx0ICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGRvbSlcblx0ICAgICAgICAgICAgdmFyIGEgPSB7bm9kZVR5cGU6IDMsIHR5cGU6JyN0ZXh0JywgZG9tOiBkb219XG5cdCAgICAgICAgICAgIHZkb20uY2hpbGRyZW4ucHVzaChhKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fSlcblxuLyoqKi8gfSxcbi8qIDQ1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblx0dmFyIHJlY29uY2lsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG5cblx0YXZhbG9uLmRpcmVjdGl2ZSgnaHRtbCcsIHtcblx0ICAgIHBhcnNlOiBmdW5jdGlvbiAoY29weSwgc3JjLCBiaW5kaW5nKSB7XG5cdCAgICAgICAgaWYgKCFzcmMuaXNWb2lkVGFnKSB7XG5cdCAgICAgICAgICAgIC8v5bCG5riy5p+T5Ye95pWw55qE5p+Q5LiA6YOo5YiG5a2Y6LW35p2lLOa4suWcqGPmlrnms5XkuK3ovazmjaLkuLrlh73mlbBcblx0ICAgICAgICAgICAgY29weVtiaW5kaW5nLm5hbWVdID0gYXZhbG9uLnBhcnNlRXhwcihiaW5kaW5nKVxuXHQgICAgICAgICAgICBjb3B5LnZtb2RlbCA9ICdfX3Ztb2RlbF9fJ1xuXHQgICAgICAgICAgICBjb3B5LmxvY2FsID0gJ19fbG9jYWxfXydcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBjb3B5LmNoaWxkcmVuID0gJ1tdJ1xuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgdmFyIGNvcHlWYWx1ZSA9IGNvcHlbbmFtZV0gKyAnJ1xuXHQgICAgICAgIGlmIChjb3B5ID09PSBzcmMgfHwgIXNyYy5yZW5kZXIgfHwgY29weVZhbHVlICE9PSBzcmNbbmFtZV0pIHtcblx0ICAgICAgICAgICAgc3JjW25hbWVdID0gY29weVZhbHVlXG5cdCAgICAgICAgICAgIHZhciBvbGRUcmVlID0gYXZhbG9uLnNwZWVkVXAoYXZhbG9uLmxleGVyKGNvcHlWYWx1ZSkpXG5cdCAgICAgICAgICAgIHNyYy5jaGlsZHJlbiA9IG9sZFRyZWVcblx0ICAgICAgICAgICAgdmFyIHJlbmRlciA9IGF2YWxvbi5yZW5kZXIob2xkVHJlZSwgY29weS5sb2NhbClcblx0ICAgICAgICAgICAgc3JjLnJlbmRlciA9IHJlbmRlclxuXHQgICAgICAgICAgICB2YXIgbmV3VHJlZSA9IHJlbmRlcihjb3B5LnZtb2RlbCwgY29weS5sb2NhbClcblx0ICAgICAgICAgICAgY29weS5jaGlsZHJlbiA9IG5ld1RyZWVcblx0ICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIG5ld1RyZWUgPSBzcmMucmVuZGVyKGNvcHkudm1vZGVsLCBjb3B5LmxvY2FsKVxuXHQgICAgICAgICAgY29weS5jaGlsZHJlbiA9IG5ld1RyZWVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdXBkYXRlOiBmdW5jdGlvbiAoZG9tLCB2ZG9tLCBwYXJlbnQpIHtcblx0ICAgICAgICBhdmFsb24uY2xlYXJIVE1MKGRvbSlcblx0ICAgICAgICB2YXIgZiA9IGF2YWxvbi52ZG9tQWRhcHRvcih2ZG9tLmNoaWxkcmVuKVxuXHQgICAgICAgIHJlY29uY2lsZShmLmNoaWxkTm9kZXMsIHZkb20uY2hpbGRyZW4sIGYpXG5cdCAgICAgICAgZG9tLmFwcGVuZENoaWxkKGYpXG5cdCAgICB9XG5cdH0pXG5cblxuLyoqKi8gfSxcbi8qIDQ2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvL+agueaNrlZN55qE5bGe5oCn5YC85oiW6KGo6L6+5byP55qE5YC85YiH5o2i57G75ZCN77yMbXMtY2xhc3M9J3h4eCB5eXkgenp6OmZsYWcnXG5cdC8vaHR0cDovL3d3dy5jbmJsb2dzLmNvbS9ydWJ5bG91dnJlL2FyY2hpdmUvMjAxMi8xMi8xNy8yODE4NTQwLmh0bWxcblx0dmFyIG1hcmtJRCA9IF9fd2VicGFja19yZXF1aXJlX18oNikuZ2V0TG9uZ0lEXG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMoKSB7XG5cdCAgICB2YXIgY2xhc3NlcyA9IFtdXG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaV1cblx0ICAgICAgICB2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmdcblx0ICAgICAgICBpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicgfHwgYXJnID09PSB0cnVlKSB7XG5cdCAgICAgICAgICAgIGNsYXNzZXMucHVzaChhcmcpXG5cdCAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0ICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSlcblx0ICAgICAgICB9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChhcmcuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBhcmdba2V5XSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChrZXkpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKVxuXHR9XG5cblxuXG5cdHZhciBkaXJlY3RpdmVzID0gYXZhbG9uLmRpcmVjdGl2ZXNcblx0YXZhbG9uLmRpcmVjdGl2ZSgnY2xhc3MnLCB7XG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgdmFyIHR5cGUgPSBuYW1lLnNsaWNlKDMpXG5cdCAgICAgICAgdmFyIGNvcHlWYWx1ZSA9IGNvcHlbbmFtZV1cblx0ICAgICAgICB2YXIgc3JjVmFsdWUgPSBzcmNbbmFtZV0gfHwgJydcblx0ICAgICAgICB2YXIgY2xhc3NFdmVudCA9IHNyYy5jbGFzc0V2ZW50IHx8IHt9XG5cdCAgICAgICAgaWYgKHR5cGUgPT09ICdob3ZlcicpIHsvL+WcqOenu+WHuuenu+WFpeaXtuWIh+aNouexu+WQjVxuXHQgICAgICAgICAgICBjbGFzc0V2ZW50Lm1vdXNlZW50ZXIgPSBhY3RpdmF0ZUNsYXNzXG5cdCAgICAgICAgICAgIGNsYXNzRXZlbnQubW91c2VsZWF2ZSA9IGFiYW5kb25DbGFzc1xuXHQgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2FjdGl2ZScpIHsvL+WcqOiOt+W+l+eEpueCueaXtuWIh+aNouexu+WQjVxuXHQgICAgICAgICAgICBzcmMucHJvcHMudGFiaW5kZXggPSBjb3B5LnByb3BzLnRhYmluZGV4IHx8IC0xXG5cdCAgICAgICAgICAgIGNsYXNzRXZlbnQudGFiSW5kZXggPSBzcmMucHJvcHMudGFiaW5kZXhcblx0ICAgICAgICAgICAgY2xhc3NFdmVudC5tb3VzZWRvd24gPSBhY3RpdmF0ZUNsYXNzXG5cdCAgICAgICAgICAgIGNsYXNzRXZlbnQubW91c2V1cCA9IGFiYW5kb25DbGFzc1xuXHQgICAgICAgICAgICBjbGFzc0V2ZW50Lm1vdXNlbGVhdmUgPSBhYmFuZG9uQ2xhc3Ncblx0ICAgICAgICB9XG5cdCAgICAgICAgc3JjLmNsYXNzRXZlbnQgPSBjbGFzc0V2ZW50XG5cblx0ICAgICAgICB2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcyhjb3B5VmFsdWUpXG5cdCAgICAgICBcblx0ICAgICAgICBpZiAoY29weSA9PT0gc3JjIHx8IHNyY1ZhbHVlICE9PSBjbGFzc05hbWUpIHtcblx0ICAgICAgICAgICAgc3JjW25hbWVdID0gY2xhc3NOYW1lXG5cdCAgICAgICAgICAgIHNyY1snY2hhbmdlLScgKyB0eXBlXSA9IGNsYXNzTmFtZVxuXHQgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSwgdHlwZSlcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdXBkYXRlOiBmdW5jdGlvbiAoZG9tLCB2ZG9tKSB7XG5cdCAgICAgICAgaWYgKCFkb20gfHwgZG9tLm5vZGVUeXBlICE9PSAxKVxuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB2YXIgY2xhc3NFdmVudCA9IHZkb20uY2xhc3NFdmVudFxuXHQgICAgICAgIGlmIChjbGFzc0V2ZW50KSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY2xhc3NFdmVudCkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPT09ICd0YWJJbmRleCcpIHtcblx0ICAgICAgICAgICAgICAgICAgICBkb21baV0gPSBjbGFzc0V2ZW50W2ldXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGF2YWxvbi5iaW5kKGRvbSwgaSwgY2xhc3NFdmVudFtpXSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2ZG9tLmNsYXNzRXZlbnQgPSB7fVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbmFtZXMgPSBbJ2NsYXNzJywgJ2hvdmVyJywgJ2FjdGl2ZSddXG5cdCAgICAgICAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuXHQgICAgICAgICAgICB2YXIgbmFtZSA9ICdjaGFuZ2UtJyArIHR5cGVcblx0ICAgICAgICAgICAgdmFyIHZhbHVlID0gdmRvbVtuYW1lXVxuXHQgICAgICAgICAgICBpZiAodmFsdWUgPT09IHZvaWQgMClcblx0ICAgICAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2NsYXNzJykge1xuXHQgICAgICAgICAgICAgICAgZG9tICYmIHNldENsYXNzKGRvbSwgdmRvbSlcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHZhciBvbGRUeXBlID0gZG9tLmdldEF0dHJpYnV0ZSgnY2hhbmdlLScgKyB0eXBlKVxuXHQgICAgICAgICAgICAgICAgaWYgKG9sZFR5cGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICBhdmFsb24oZG9tKS5yZW1vdmVDbGFzcyhvbGRUeXBlKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pXG5cdCAgICB9XG5cdH0pXG5cblx0ZGlyZWN0aXZlcy5hY3RpdmUgPSBkaXJlY3RpdmVzLmhvdmVyID0gZGlyZWN0aXZlc1snY2xhc3MnXVxuXG5cblx0dmFyIGNsYXNzTWFwID0ge1xuXHQgICAgbW91c2VlbnRlcjogJ2NoYW5nZS1ob3ZlcicsXG5cdCAgICBtb3VzZWxlYXZlOiAnY2hhbmdlLWhvdmVyJyxcblx0ICAgIG1vdXNlZG93bjogJ2NoYW5nZS1hY3RpdmUnLFxuXHQgICAgbW91c2V1cDogJ2NoYW5nZS1hY3RpdmUnXG5cdH1cblxuXHRmdW5jdGlvbiBhY3RpdmF0ZUNsYXNzKGUpIHtcblx0ICAgIHZhciBlbGVtID0gZS50YXJnZXRcblx0ICAgIGF2YWxvbihlbGVtKS5hZGRDbGFzcyhlbGVtLmdldEF0dHJpYnV0ZShjbGFzc01hcFtlLnR5cGVdKSB8fCAnJylcblx0fVxuXG5cdGZ1bmN0aW9uIGFiYW5kb25DbGFzcyhlKSB7XG5cdCAgICB2YXIgZWxlbSA9IGUudGFyZ2V0XG5cdCAgICB2YXIgbmFtZSA9IGNsYXNzTWFwW2UudHlwZV1cblx0ICAgIGF2YWxvbihlbGVtKS5yZW1vdmVDbGFzcyhlbGVtLmdldEF0dHJpYnV0ZShuYW1lKSB8fCAnJylcblx0ICAgIGlmIChuYW1lICE9PSAnY2hhbmdlLWFjdGl2ZScpIHtcblx0ICAgICAgICBhdmFsb24oZWxlbSkucmVtb3ZlQ2xhc3MoZWxlbS5nZXRBdHRyaWJ1dGUoJ2NoYW5nZS1hY3RpdmUnKSB8fCAnJylcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNldENsYXNzKGRvbSwgdmRvbSkge1xuXHQgICAgdmFyIG9sZCA9IGRvbS5nZXRBdHRyaWJ1dGUoJ29sZC1jaGFuZ2UtY2xhc3MnKVxuXHQgICAgdmFyIG5lbyA9IHZkb21bJ21zLWNsYXNzJ11cblx0ICAgIGlmIChvbGQgIT09IG5lbykge1xuXHQgICAgICAgIGF2YWxvbihkb20pLnJlbW92ZUNsYXNzKG9sZCkuYWRkQ2xhc3MobmVvKVxuXHQgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoJ29sZC1jaGFuZ2UtY2xhc3MnLCBuZW8pXG5cdCAgICB9XG5cblx0fVxuXG5cdG1hcmtJRChhY3RpdmF0ZUNsYXNzKVxuXHRtYXJrSUQoYWJhbmRvbkNsYXNzKVxuXG5cblxuXG4vKioqLyB9LFxuLyogNDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpXG5cdHZhciBldmVudENhY2hlID0gbmV3IENhY2hlKDEyOClcblx0dmFyIHVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cdHZhciBtYXJrSUQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLmdldExvbmdJRFxuXG5cdHZhciByZmlsdGVycyA9IC9cXHwuKy9nXG5cdC8vUmVmOiBodHRwOi8vZGV2ZWxvcGVycy53aGF0d2cub3JnL3dlYmFwcGFwaXMuaHRtbCNldmVudC1oYW5kbGVyLWlkbC1hdHRyaWJ1dGVzXG5cdC8vIFRoZSBhc3N1bXB0aW9uIGlzIHRoYXQgZnV0dXJlIERPTSBldmVudCBhdHRyaWJ1dGUgbmFtZXMgd2lsbCBiZWdpbiB3aXRoXG5cdC8vICdvbicgYW5kIGJlIGNvbXBvc2VkIG9mIG9ubHkgRW5nbGlzaCBsZXR0ZXJzLlxuXHR2YXIgcmZpbHRlcnMgPSAvXFx8LisvZ1xuXHR2YXIgcnZhciA9IC8oKD86XFxAfFxcJHxcXCNcXCMpP1xcdyspL2dcblx0dmFyIHJzdHJpbmcgPSAvKFtcIiddKShcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxL2dcblxuXHQvL+WfuuS6juS6i+S7tuS7o+eQhueahOmrmOaAp+iDveS6i+S7tue7keWumlxuXHRhdmFsb24uZGlyZWN0aXZlKCdvbicsIHtcblx0ICAgIHByaW9yaXR5OiAzMDAwLFxuXHQgICAgcGFyc2U6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIGJpbmRpbmcpIHtcblx0ICAgICAgICB2YXIgdW5kZXJsaW5lID0gYmluZGluZy5uYW1lLnJlcGxhY2UoJ21zLW9uLScsICdlJykucmVwbGFjZSgnLScsICdfJylcblx0ICAgICAgICB2YXIgdXVpZCA9IHVuZGVybGluZSArICdfJyArIGJpbmRpbmcuZXhwci5cblx0ICAgICAgICAgICAgICAgIHJlcGxhY2UoL1xccy9nLCAnJykuXG5cdCAgICAgICAgICAgICAgICByZXBsYWNlKC9bXiRhLXpdL2lnLCBmdW5jdGlvbiAoZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBlLmNoYXJDb2RlQXQoMClcblx0ICAgICAgICAgICAgICAgIH0pXG5cblx0ICAgICAgICB2YXIgcXVvdGVkID0gYXZhbG9uLnF1b3RlKHV1aWQpXG5cdCAgICAgICAgdmFyIGZuID0gJyhmdW5jdGlvbigpe1xcbicgK1xuXHQgICAgICAgICAgICAgICAgJ3ZhciBmbjYxMCA9ICcgK1xuXHQgICAgICAgICAgICAgICAgYXZhbG9uLnBhcnNlRXhwcihiaW5kaW5nLCAnb24nKSArXG5cdCAgICAgICAgICAgICAgICAnXFxuZm42MTAudXVpZCA9JyArIHF1b3RlZCArICc7XFxucmV0dXJuIGZuNjEwfSkoKSdcblx0ICAgICAgICBjb3B5LnZtb2RlbCA9ICdfX3Ztb2RlbF9fJ1xuXHQgICAgICAgIGNvcHkubG9jYWwgPSAnX19sb2NhbF9fJ1xuXHQgICAgICAgIGNvcHlbYmluZGluZy5uYW1lXSA9IGZuXG5cblx0ICAgIH0sXG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgdmFyIGZuID0gY29weVtuYW1lXVxuXHQgICAgICAgIHZhciB1dWlkID0gZm4udXVpZFxuXHQgICAgICAgIHZhciB0eXBlID0gdXVpZC5zcGxpdCgnXycpLnNoaWZ0KClcblx0ICAgICAgICB2YXIgc2VhcmNoID0gdHlwZS5zbGljZSgxKSArICc6JyArIHV1aWRcblx0ICAgICAgICB2YXIgc3JjRm4gPSBzcmNbbmFtZV1cblx0ICAgICAgICB2YXIgaGFzQ2hhbmdlID0gZmFsc2Vcblx0ICAgICAgICB2YXIgaW5pdCA9IGNvcHkgPT09IHNyY1xuXHQgICAgICAgIGlmIChpbml0IHx8ICFzcmNGbiB8fCBzcmNGbi51dWlkICE9PSB1dWlkKSB7XG5cdCAgICAgICAgICAgIHNyY1tuYW1lXSA9IGZuXG5cdCAgICAgICAgICAgIHNyYy5hZGRFdmVudHMgPSBzcmMuYWRkRXZlbnRzIHx8IHt9XG5cdCAgICAgICAgICAgIHNyYy5hZGRFdmVudHNbc2VhcmNoXSA9IGZuXG5cdCAgICAgICAgICAgIGF2YWxvbi5ldmVudExpc3RlbmVycy51dWlkID0gZm5cblx0ICAgICAgICAgICAgaGFzQ2hhbmdlID0gdHJ1ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoZGlmZk9iaihzcmMubG9jYWx8fCB7fSwgY29weS5sb2NhbCkpIHtcblx0ICAgICAgICAgICAgaGFzQ2hhbmdlID0gdHJ1ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoaGFzQ2hhbmdlKSB7XG5cdCAgICAgICAgICAgIHNyYy5sb2NhbCA9IGNvcHkubG9jYWxcblx0ICAgICAgICAgICAgc3JjLnZtb2RlbCA9IGNvcHkudm1vZGVsXG5cdCAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlKVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uIChkb20sIHZkb20pIHtcblx0ICAgICAgICBpZiAoIWRvbSB8fCBkb20ubm9kZVR5cGUgPiAxKSAvL+WcqOW+queOr+e7keWumuS4re+8jOi/memHjOS4um51bGxcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgdmFyIGtleSwgdHlwZSwgbGlzdGVuZXJcblx0ICAgICAgICBkb20uX21zX2NvbnRleHRfID0gdmRvbS52bW9kZWxcblx0ICAgICAgICBkb20uX21zX2xvY2FsID0gdmRvbS5sb2NhbFxuXHQgICAgICAgIGZvciAoa2V5IGluIHZkb20uYWRkRXZlbnRzKSB7XG5cdCAgICAgICAgICAgIHR5cGUgPSBrZXkuc3BsaXQoJzonKS5zaGlmdCgpXG5cdCAgICAgICAgICAgIGxpc3RlbmVyID0gdmRvbS5hZGRFdmVudHNba2V5XVxuXHQgICAgICAgICAgICBhdmFsb24uYmluZChkb20sIHR5cGUsIGxpc3RlbmVyKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBkZWxldGUgdmRvbS5hZGRFdmVudHNcblx0ICAgIH1cblx0fSlcblxuXHRmdW5jdGlvbiBkaWZmT2JqKGEsIGIpIHtcblx0ICAgIGZvciAodmFyIGkgaW4gYSkgey8vZGlmZuW3ruW8gueCuVxuXHQgICAgICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGZhbHNlXG5cdH1cblxuLyoqKi8gfSxcbi8qIDQ4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcblx0dmFyIHVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cdHZhciBldmFsdWF0b3JQb29sID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OSlcblx0dmFyIHN0cmluZ2lmeSA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cblx0dmFyIHJjaGFuZ2VGaWx0ZXIgPSAvXFx8XFxzKmNoYW5nZVxcYi9cblx0dmFyIHJjaGVja2VkVHlwZSA9IC9eKD86Y2hlY2tib3h8cmFkaW8pJC9cblx0dmFyIHJkZWJvdW5jZUZpbHRlciA9IC9cXHxcXHMqZGVib3VuY2UoPzpcXCgoW14pXSspXFwpKT8vXG5cdHZhciB1cGRhdGVNb2RlbEJ5RXZlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUxKVxuXHR2YXIgdXBkYXRlTW9kZWxCeVZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NClcblx0dmFyIHVwZGF0ZU1vZGVsID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Milcblx0dmFyIHVwZGF0ZVZpZXcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU1KVxuXHR2YXIgYWRkVmFsaWRhdGVGaWVsZCA9IF9fd2VicGFja19yZXF1aXJlX18oNTYpXG5cblxuXHRhdmFsb24uZGlyZWN0aXZlKCdkdXBsZXgnLCB7XG5cdCAgICBwcmlvcml0eTogMjAwMCxcblx0ICAgIHBhcnNlOiBmdW5jdGlvbiAoY29weSwgc3JjLCBiaW5kaW5nKSB7XG5cdCAgICAgICAgdmFyIGV4cHIgPSBiaW5kaW5nLmV4cHJcblx0ICAgICAgICB2YXIgZXR5cGUgPSBzcmMucHJvcHMudHlwZVxuXHQgICAgICAgIC8v5aSE55CG5pWw5o2u6L2s5o2i5ZmoXG5cdCAgICAgICAgdmFyIHBhcnNlciA9IGJpbmRpbmcucGFyYW0sIGR0eXBlXG5cdCAgICAgICAgdmFyIGlzQ2hlY2tlZCA9IGZhbHNlXG5cdCAgICAgICAgcGFyc2VyID0gcGFyc2VyID8gcGFyc2VyLnNwbGl0KCctJykubWFwKGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgICAgIGlmIChhID09PSAnY2hlY2tlZCcpIHtcblx0ICAgICAgICAgICAgICAgIGlzQ2hlY2tlZCA9IHRydWVcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gYVxuXHQgICAgICAgIH0pIDogW11cblxuXHQgICAgICAgIGlmIChyY2hlY2tlZFR5cGUudGVzdChldHlwZSkgJiYgaXNDaGVja2VkKSB7XG5cdCAgICAgICAgICAgIC8v5aaC5p6c5pivcmFkaW8sIGNoZWNrYm94LOWIpOWumueUqOaIt+S9v+eUqOS6hmNoZWNrZWTmoLzlvI/lh73mlbDmsqHmnIlcblx0ICAgICAgICAgICAgcGFyc2VyID0gW11cblx0ICAgICAgICAgICAgZHR5cGUgPSAncmFkaW8nXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKCEvaW5wdXR8dGV4dGFyZWF8c2VsZWN0Ly50ZXN0KHNyYy50eXBlKSkge1xuXHQgICAgICAgICAgICBpZiAoJ2NvbnRlbnRlZGl0YWJsZScgaW4gc3JjLnByb3BzKSB7XG5cdCAgICAgICAgICAgICAgICBkdHlwZSA9ICdjb250ZW50ZWRpdGFibGUnXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2UgaWYgKCFkdHlwZSkge1xuXHQgICAgICAgICAgICBkdHlwZSA9IHNyYy50eXBlID09PSAnc2VsZWN0JyA/ICdzZWxlY3QnIDpcblx0ICAgICAgICAgICAgICAgICAgICBldHlwZSA9PT0gJ2NoZWNrYm94JyA/ICdjaGVja2JveCcgOlxuXHQgICAgICAgICAgICAgICAgICAgIGV0eXBlID09PSAncmFkaW8nID8gJ3JhZGlvJyA6XG5cdCAgICAgICAgICAgICAgICAgICAgJ2lucHV0J1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgaXNDaGFuZ2VkID0gZmFsc2UsIGRlYm91bmNlVGltZSA9IDBcblx0ICAgICAgICAvL+WIpOWumuaYr+WQpuS9v+eUqOS6hiBjaGFuZ2UgZGVib3VuY2Ug6L+H5ruk5ZmoXG5cdCAgICAgICAgaWYgKGR0eXBlID09PSAnaW5wdXQnIHx8IGR0eXBlID09PSAnY29udGVudGVkaXRhYmxlJykge1xuXHQgICAgICAgICAgICB2YXIgaXNTdHJpbmcgPSB0cnVlXG5cdCAgICAgICAgICAgIGlmIChyY2hhbmdlRmlsdGVyLnRlc3QoZXhwcikpIHtcblx0ICAgICAgICAgICAgICAgIGlzQ2hhbmdlZCA9IHRydWVcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoIWlzQ2hhbmdlZCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gZXhwci5tYXRjaChyZGVib3VuY2VGaWx0ZXIpXG5cdCAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcblx0ICAgICAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUgPSBwYXJzZUludChtYXRjaFsxXSwgMTApIHx8IDMwMFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cblx0ICAgICAgICB2YXIgY2hhbmdlZCA9IGNvcHkucHJvcHNbJ2RhdGEtZHVwbGV4LWNoYW5nZWQnXVxuXHQgICAgICAgIGNvcHkucGFyc2VyID0gYXZhbG9uLnF1b3RlKHBhcnNlciArIFwiXCIpXG5cdCAgICAgICAgY29weS5tb2RlbFZhbHVlID0gJygnICsgYXZhbG9uLnBhcnNlRXhwcihiaW5kaW5nLCAnZHVwbGV4JykgKyAnKShfX3Ztb2RlbF9fKScvL8Kg6L6T5Ye65Y6f5aeL5pWw5o2uXG5cdCAgICAgICAgdmFyIGZvcm1hdCA9IGV2YWx1YXRvclBvb2wuZ2V0KCdkdXBsZXg6Zm9ybWF0OicgKyBleHByKVxuXG5cdCAgICAgICAgY29weS5kdXBsZXhEYXRhID0gc3RyaW5naWZ5KHtcblx0ICAgICAgICAgICAgdHlwZTogZHR5cGUsIC8v6L+Z5Liq5Yaz5a6a57uR5a6a5LuA5LmI5LqL5Lu2XG5cdCAgICAgICAgICAgIHZtb2RlbDogJ19fdm1vZGVsX18nLFxuXHQgICAgICAgICAgICBsb2NhbDogJ19fbG9jYWxfXycsXG5cdCAgICAgICAgICAgIGlzQ2hlY2tlZDogaXNDaGVja2VkLFxuXHQgICAgICAgICAgICBpc1N0cmluZzogISFpc1N0cmluZyxcblx0ICAgICAgICAgICAgaXNDaGFuZ2VkOiBpc0NoYW5nZWQsIC8v6L+Z5Liq5Yaz5a6a5ZCM5q2l55qE6aKR5pWwXG5cdCAgICAgICAgICAgIGRlYm91bmNlVGltZTogZGVib3VuY2VUaW1lLCAvL+i/meS4quWGs+WumuWQjOatpeeahOmikeaVsFxuXHQgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCB8fCAnZnVuY3Rpb24odm0sIGEpe3JldHVybiBhfScsXG5cdCAgICAgICAgICAgIHNldDogZXZhbHVhdG9yUG9vbC5nZXQoJ2R1cGxleDpzZXQ6JyArIGV4cHIpLFxuXHQgICAgICAgICAgICBjYWxsYmFjazogY2hhbmdlZCA/IGF2YWxvbi5wYXJzZUV4cHIoY2hhbmdlZCwgJ29uJykgOiAnYXZhbG9uLm5vb3AnXG5cdCAgICAgICAgfSlcblxuXHQgICAgfSxcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIChjb3B5LCBzcmMpIHtcblx0ICAgXG5cdCAgICAgICAgaWYgKGNvcHkgPT09IHNyYyB8fCAhc3JjLmR1cGxleERhdGEpIHtcblx0ICAgICAgICAgICAgLy/nrKzkuIDmrKHkuLrljp/lp4vomZrmi59ET03mt7vliqBkdXBsZXhEYXRhXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gc3JjLmR1cGxleERhdGEgPSBjb3B5LmR1cGxleERhdGFcblx0ICAgICAgICAgICAgZGF0YS5wYXJzZXIgPSBjb3B5LnBhcnNlciA/IGNvcHkucGFyc2VyLnNwbGl0KCcsJykgOiBbXVxuXHQgICAgICAgICAgICBkYXRhLnBhcnNlID0gcGFyc2VWYWx1ZVxuXHQgICAgICAgICAgICB2YXIgY3VyVmFsdWUgPSBjb3B5Lm1vZGVsVmFsdWVcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBkYXRhID0gc3JjLmR1cGxleERhdGFcblx0ICAgICAgICAgICAgdmFyIGN1clZhbHVlID0gY29weS5tb2RlbFZhbHVlXG5cdCAgICAgICAgICAgIHZhciBwcmVWYWx1ZSA9IGRhdGEubW9kZWxWYWx1ZVxuXHQgICAgICAgICAgICAvLyMxNTAyXG5cdCAgICAgICAgICAgIGNvcHkuZHVwbGV4RGF0YSA9IDBcblx0ICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGN1clZhbHVlKSAmJlxuXHQgICAgICAgICAgICAgICAgICAgIGN1clZhbHVlID09PSBwcmVWYWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGRhdGEuaXNTdHJpbmcpIHsvL+i+k+WHuuWIsOmhtemdouaXtuimgeagvOW8j+WMllxuXHQgICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhLnBhcnNlKGN1clZhbHVlKVxuXHQgICAgICAgICAgICBpZiAodmFsdWUgIT09IGN1clZhbHVlKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNldChkYXRhLnZtb2RlbCwgdmFsdWUpXG5cdCAgICAgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjdXJWYWx1ZSA9IHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRhdGEubW9kZWxWYWx1ZSA9IGN1clZhbHVlXG5cdCAgICAgICAgaWYgKGRhdGEuaXNTdHJpbmcpIHsvL+i+k+WHuuWIsOmhtemdouaXtuimgeagvOW8j+WMllxuXHQgICAgICAgICAgICB2YWx1ZSA9IGRhdGEuZm9ybWF0KGRhdGEudm1vZGVsLCBjdXJWYWx1ZSArICcnKVxuXHQgICAgICAgICAgICBpZiAodmFsdWUgIT09IGN1clZhbHVlICsgJycpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2V0KGRhdGEudm1vZGVsLCB2YWx1ZSlcblx0ICAgICAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGN1clZhbHVlID0gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICAgICAgZGF0YS52aWV3VmFsdWUgPSBjdXJWYWx1ZVxuXHQgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlLCAnYWZ0ZXJDaGFuZ2UnKVxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSkge1xuXHQgICAgICAgIGlmIChkb20gJiYgZG9tLm5vZGVUeXBlID09PSAxKSB7XG5cdCAgICAgICAgICAgIGlmICghZG9tLl9fbXNfZHVwbGV4X18pIHtcblx0ICAgICAgICAgICAgICAgIGRvbS5fX21zX2R1cGxleF9fID0gdmRvbS5kdXBsZXhEYXRhXG5cdCAgICAgICAgICAgICAgICB1cGRhdGVNb2RlbEJ5RXZlbnQoZG9tLCB2ZG9tKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gZG9tLl9fbXNfZHVwbGV4X19cblxuXHQgICAgICAgICAgICBkYXRhLmRvbSA9IGRvbVxuXHQgICAgICAgICAgICBhZGRWYWxpZGF0ZUZpZWxkKGRvbSwgdmRvbSlcblx0ICAgICAgICAgICAgaWYgKGRhdGEuaXNTdHJpbmdcblx0ICAgICAgICAgICAgICAgICAgICAmJiAhYXZhbG9uLm1zaWVcblx0ICAgICAgICAgICAgICAgICAgICAmJiB1cGRhdGVNb2RlbEJ5VmFsdWUgPT09IGZhbHNlXG5cdCAgICAgICAgICAgICAgICAgICAgJiYgIWRvbS52YWx1ZUhpamFjaykge1xuXHQgICAgICAgICAgICAgICAgLy9jaHJvbWUgNDLlj4rku6XkuIvniYjmnKzpnIDopoHov5nkuKpoYWNrXG5cblx0ICAgICAgICAgICAgICAgIGRvbS52YWx1ZUhpamFjayA9IHVwZGF0ZU1vZGVsXG5cdCAgICAgICAgICAgICAgICB2YXIgaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIWF2YWxvbi5jb250YWlucyhhdmFsb24ucm9vdCwgZG9tKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSUQpXG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZG9tLnZhbHVlSGlqYWNrKClcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9LCAzMClcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHVwZGF0ZVZpZXdbZGF0YS50eXBlXS5jYWxsKGRhdGEpXG5cblxuXHQgICAgICAgIH1cblxuXHQgICAgfVxuXHR9KVxuXG5cdGZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgazsgayA9IHRoaXMucGFyc2VyW2krK107ICkge1xuXHQgICAgICAgIHZhciBmbiA9IGF2YWxvbi5wYXJzZXJzW2tdXG5cdCAgICAgICAgaWYgKGZuKSB7XG5cdCAgICAgICAgICAgIHZhbCA9IGZuLmNhbGwodGhpcywgdmFsKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiB2YWxcblx0fVxuXG5cdC8qXG5cdCB2bVttcy1kdXBsZXhdICDihpIgIOWOn+Wni21vZGVsVmFsdWUg4oaSICDmoLzlvI/ljJblkI7mr5TovoMgICDihpIgICDovpPlh7rpobXpnaJcblx0IOKGkSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKGk1xuXHQg5q+U6L6DbW9kZWxWYWx1ZSAg4oaQICBwYXJzZWTlkI7lvpfliLBtb2RlbFZhbHVlICDihpAg5qC85byP5YyW5ZCO5q+U6L6DIOKGkCAg5Y6f5aeLdmlld1ZhbHVlXG5cdCAqL1xuXG4vKioqLyB9LFxuLyogNDkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuXHQvL+e8k+WtmOaxguWAvOWHveaVsO+8jOS7peS+v+WkmuasoeWIqeeUqFxuXHRtb2R1bGUuZXhwb3J0cyA9IG5ldyBDYWNoZSg1MTIpXG5cblxuLyoqKi8gfSxcbi8qIDUwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIga2V5TWFwID0gYXZhbG9uLm9uZU9iamVjdChcImJyZWFrLGNhc2UsY2F0Y2gsY29udGludWUsZGVidWdnZXIsZGVmYXVsdCxkZWxldGUsZG8sZWxzZSxmYWxzZSxcIiArXG5cdCAgICAgICAgXCJmaW5hbGx5LGZvcixmdW5jdGlvbixpZixpbixpbnN0YW5jZW9mLG5ldyxudWxsLHJldHVybixzd2l0Y2gsdGhpcyxcIiArXG5cdCAgICAgICAgXCJ0aHJvdyx0cnVlLHRyeSx0eXBlb2YsdmFyLHZvaWQsd2hpbGUsd2l0aCxcIiArIC8qIOWFs+mUruWtlyovXG5cdCAgICAgICAgXCJhYnN0cmFjdCxib29sZWFuLGJ5dGUsY2hhcixjbGFzcyxjb25zdCxkb3VibGUsZW51bSxleHBvcnQsZXh0ZW5kcyxcIiArXG5cdCAgICAgICAgXCJmaW5hbCxmbG9hdCxnb3RvLGltcGxlbWVudHMsaW1wb3J0LGludCxpbnRlcmZhY2UsbG9uZyxuYXRpdmUsXCIgK1xuXHQgICAgICAgIFwicGFja2FnZSxwcml2YXRlLHByb3RlY3RlZCxwdWJsaWMsc2hvcnQsc3RhdGljLHN1cGVyLHN5bmNocm9uaXplZCxcIiArXG5cdCAgICAgICAgXCJ0aHJvd3MsdHJhbnNpZW50LHZvbGF0aWxlXCIpXG5cdGF2YWxvbi5rZXlNYXAgPSBrZXlNYXBcblx0dmFyIHF1b3RlZCA9IHtcblx0ICAgIHR5cGU6IDEsXG5cdCAgICB0ZW1wbGF0ZTogMSxcblx0ICAgIG9yZGVyOiAxLFxuXHQgICAgbm9kZVZhbHVlOiAxLFxuXHQgICAgZHluYW1pYzogMSxcblx0ICAgIHNpZ25hdHVyZTogMSxcblx0ICAgIHdpZDogMVxuXHR9XG5cblx0dmFyIHJuZWVkUXVvdGUgPSAvW1ctXS9cblx0dmFyIHF1b3RlID0gYXZhbG9uLnF1b3RlXG5cdGZ1bmN0aW9uIGZpeEtleShrKSB7XG5cdCAgICByZXR1cm4gKHJuZWVkUXVvdGUudGVzdChrKSB8fCBrZXlNYXBba10pID8gcXVvdGUoaykgOiBrXG5cdH1cblxuXHRmdW5jdGlvbiBzdHJpbmdpZnkob2JqKSB7XG5cdCAgICB2YXIgYXJyMSA9IFtdXG5cdC8v5a2X56ym5LiN55So5Lic6KW/5YyF6LW35p2l5bCx5Y+Y5oiQ5Y+Y6YePXG5cdCAgICBmb3IgKHZhciBpIGluIG9iaikge1xuXHQgICAgICAgIGlmIChpID09PSAncHJvcHMnKSB7XG5cdCAgICAgICAgICAgIHZhciBhcnIyID0gW11cblx0ICAgICAgICAgICAgZm9yICh2YXIgayBpbiBvYmoucHJvcHMpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrdiA9IG9iai5wcm9wc1trXVxuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrdiA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgICAgICBrdiA9IHF1b3RlKGt2KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYXJyMi5wdXNoKGZpeEtleShrKSArICc6ICcgKyBrdilcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBhcnIxLnB1c2goJ3Byb3BzOiB7JyArIGFycjIuam9pbignLFxcbicpICsgJ30nKVxuXHQgICAgICAgIH0gZWxzZSBpZiAob2JqLmhhc093blByb3BlcnR5KGkpICYmIGkgIT09ICdkb20nKSB7XG5cdCAgICAgICAgICAgIHZhciB2ID0gb2JqW2ldXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIHYgPSBxdW90ZWRbaV0gPyBxdW90ZSh2KSA6IHZcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBhcnIxLnB1c2goZml4S2V5KGkpICsgJzonICsgdilcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gJ3tcXG4nICsgYXJyMS5qb2luKCcsXFxuJykgKyAnfSdcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gc3RyaW5naWZ5XG5cblxuLyoqKi8gfSxcbi8qIDUxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKiBcblx0ICog6YCa6L+H57uR5a6a5LqL5Lu25ZCM5q2ldm1vZGVsXG5cdCAqIOaAu+WFseacieS4ieenjeaWueW8j+WQjOatpeinhuWbvlxuXHQgKiAxLiDlkITnp43kuovku7YgaW5wdXQsIGNoYW5nZSwgY2xpY2ssIHByb3BlcnR5Y2hhbmdlLCBrZXlkb3duLi4uXG5cdCAqIDIuIHZhbHVl5bGe5oCn6YeN5YaZXG5cdCAqIDMuIOWumuaXtuWZqOi9ruivolxuXHQgKi9cblx0dmFyIHVwZGF0ZU1vZGVsID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Milcblx0dmFyIG1hcmtJRCA9IF9fd2VicGFja19yZXF1aXJlX18oNikuZ2V0U2hvcnRJRFxuXHR2YXIgbXNpZSA9IGF2YWxvbi5tc2llXG5cdHZhciB3aW5kb3cgPSBhdmFsb24ud2luZG93XG5cdHZhciBkb2N1bWVudCA9IGF2YWxvbi5kb2N1bWVudFxuXHRmdW5jdGlvbiB1cGRhdGVNb2RlbEJ5RXZlbnQobm9kZSwgdm5vZGUpIHtcblx0ICAgIHZhciBldmVudHMgPSB7fVxuXHQgICAgdmFyIGRhdGEgPSB2bm9kZS5kdXBsZXhEYXRhXG5cdCAgICBkYXRhLnVwZGF0ZSA9IHVwZGF0ZU1vZGVsXG5cdCAgICAvL+a3u+WKoOmcgOimgeebkeWQrOeahOS6i+S7tlxuXHQgICAgc3dpdGNoIChkYXRhLnR5cGUpIHtcblx0ICAgICAgICBjYXNlICdyYWRpbyc6XG5cdCAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuXHQgICAgICAgICAgICBldmVudHMuY2xpY2sgPSB1cGRhdGVNb2RlbFxuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIGNhc2UgJ3NlbGVjdCc6XG5cdCAgICAgICAgICAgIGV2ZW50cy5jaGFuZ2UgPSB1cGRhdGVNb2RlbFxuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIGNhc2UgJ2NvbnRlbnRlZGl0YWJsZSc6XG5cdCAgICAgICAgICAgIGlmIChkYXRhLmlzQ2hhbmdlZCkge1xuXHQgICAgICAgICAgICAgICAgZXZlbnRzLmJsdXIgPSB1cGRhdGVNb2RlbFxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgaWYgKGF2YWxvbi5tb2Rlcm4pIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LndlYmtpdFVSTCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwOi8vY29kZS5tZXRhZ2VyLmRlL3NvdXJjZS94cmVmL1dlYktpdC9MYXlvdXRUZXN0cy9mYXN0L2V2ZW50cy9cblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTExMDc0MlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMud2Via2l0RWRpdGFibGVDb250ZW50Q2hhbmdlZCA9IHVwZGF0ZU1vZGVsXG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuTXV0YXRpb25FdmVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMuRE9NQ2hhcmFjdGVyRGF0YU1vZGlmaWVkID0gdXBkYXRlTW9kZWxcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmlucHV0ID0gdXBkYXRlTW9kZWxcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmtleWRvd24gPSB1cGRhdGVNb2RlbEtleURvd25cblx0ICAgICAgICAgICAgICAgICAgICBldmVudHMucGFzdGUgPSB1cGRhdGVNb2RlbERlbGF5XG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmN1dCA9IHVwZGF0ZU1vZGVsRGVsYXlcblx0ICAgICAgICAgICAgICAgICAgICBldmVudHMuZm9jdXMgPSBjbG9zZUNvbXBvc2l0aW9uXG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmJsdXIgPSBvcGVuQ29tcG9zaXRpb25cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgY2FzZSAnaW5wdXQnOlxuXHQgICAgICAgICAgICBpZiAoZGF0YS5pc0NoYW5nZWQpIHtcblx0ICAgICAgICAgICAgICAgIGV2ZW50cy5jaGFuZ2UgPSB1cGRhdGVNb2RlbFxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy9odHRwOi8vd3d3LmNuYmxvZ3MuY29tL3J1Ynlsb3V2cmUvYXJjaGl2ZS8yMDEzLzAyLzE3LzI5MTQ2MDQuaHRtbFxuXHQgICAgICAgICAgICAgICAgLy9odHRwOi8vd3d3Lm1hdHRzNDExLmNvbS9wb3N0L2ludGVybmV0LWV4cGxvcmVyLTktb25pbnB1dC9cblx0ICAgICAgICAgICAgICAgIGlmIChtc2llKSB7Ly/lpITnkIbovpPlhaXms5Xpl67pophcblx0ICAgICAgICAgICAgICAgICAgICBldmVudHMua2V5dXAgPSB1cGRhdGVNb2RlbEtleURvd25cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgaWYgKG1zaWUgPCA5KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnByb3BlcnR5Y2hhbmdlID0gdXBkYXRlTW9kZWxIYWNrXG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnBhc3RlID0gdXBkYXRlTW9kZWxEZWxheVxuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5jdXQgPSB1cGRhdGVNb2RlbERlbGF5XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5pbnB1dCA9IHVwZGF0ZU1vZGVsXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvL0lFNi0455qEcHJvcGVydHljaGFuZ2XmnIlCVUcs56ys5LiA5qyh55SoSlPkv67mlLnlgLzml7bkuI3kvJrop6blj5Es6ICM5LiU5L2g5piv5YWo6YOo5riF56m6dmFsdWXkuZ/kuI3kvJrop6blj5Fcblx0ICAgICAgICAgICAgICAgIC8vSUU555qEcHJvcGVydHljaGFuZ2XkuI3mlK/mjIHoh6rliqjlrozmiJAs6YCA5qC8LOWIoOmZpCzlpI3liLYs6LS057KYLOWJquWIh+aIlueCueWHu+WPs+i+ueeahOWwj1jnmoTmuIXnqbrmk43kvZxcblx0ICAgICAgICAgICAgICAgIC8vSUUxMeW+rui9r+aLvOmfs+WlveWDj+aJjeS8muinpuWPkWNvbXBvc2l0aW9uc3RhcnQg5LiN5Lya6Kem5Y+RY29tcG9zaXRpb25lbmRcblx0ICAgICAgICAgICAgICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL1J1YnlMb3V2cmUvYXZhbG9uL2lzc3Vlcy8xMzY4I2lzc3VlY29tbWVudC0yMjA1MDMyODRcblx0ICAgICAgICAgICAgICAgIGlmKCFtc2llIHx8IG1zaWUgPiA5KXtcblx0ICAgICAgICAgICAgICAgICAgICBldmVudHMuY29tcG9zaXRpb25zdGFydCA9IG9wZW5Db21wb3NpdGlvblxuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5jb21wb3NpdGlvbmVuZCA9IGNsb3NlQ29tcG9zaXRpb25cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmICghbXNpZSkge1xuXG5cdCAgICAgICAgICAgICAgICAgICAgLy9odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9UeXBlZEFycmF5XG5cdCAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzlvZPliY3mtY/op4jlmajmlK/mjIFJbnQ4QXJyYXks6YKj5LmI5oiR5Lus5bCx5LiN6ZyA6KaB5Lul5LiL6L+Z5Lqb5LqL5Lu25p2l5omT6KGl5LiB5LqGXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCEvXFxbbmF0aXZlIGNvZGVcXF0vLnRlc3Qod2luZG93LkludDhBcnJheSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmtleWRvd24gPSB1cGRhdGVNb2RlbEtleURvd24gLy9zYWZhcmkgPCA1IG9wZXJhIDwgMTFcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnBhc3RlID0gdXBkYXRlTW9kZWxEZWxheS8vc2FmYXJpIDwgNVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMuY3V0ID0gdXBkYXRlTW9kZWxEZWxheS8vc2FmYXJpIDwgNSBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5uZXRzY2FwZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlyZWZveCA8PSAzLjYgZG9lc24ndCBmaXJlIHRoZSAnaW5wdXQnIGV2ZW50IHdoZW4gdGV4dCBpcyBmaWxsZWQgaW4gdGhyb3VnaCBhdXRvY29tcGxldGVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5ET01BdXRvQ29tcGxldGUgPSB1cGRhdGVNb2RlbFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICB9XG5cblx0ICAgIGlmICgvcGFzc3dvcmR8dGV4dC8udGVzdCh2bm9kZS5wcm9wcy50eXBlKSkge1xuXHQgICAgICAgIGV2ZW50cy5mb2N1cyA9IG9wZW5DYXJldCAvL+WIpOWumuaYr+WQpuS9v+eUqOWFieagh+S/ruato+WKn+iDvSBcblx0ICAgICAgICBldmVudHMuYmx1ciA9IGNsb3NlQ2FyZXRcblx0ICAgICAgICBkYXRhLmdldENhcmV0ID0gZ2V0Q2FyZXRcblx0ICAgICAgICBkYXRhLnNldENhcmV0ID0gc2V0Q2FyZXRcblx0ICAgIH1cblxuXHQgICAgZm9yICh2YXIgbmFtZSBpbiBldmVudHMpIHtcblx0ICAgICAgICBhdmFsb24uYmluZChub2RlLCBuYW1lLCBldmVudHNbbmFtZV0pXG5cdCAgICB9XG5cdH1cblxuXG5cdGZ1bmN0aW9uIHVwZGF0ZU1vZGVsSGFjayhlKSB7XG5cdCAgICBpZiAoZS5wcm9wZXJ0eU5hbWUgPT09ICd2YWx1ZScpIHtcblx0ICAgICAgICB1cGRhdGVNb2RlbC5jYWxsKHRoaXMsIGUpXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiB1cGRhdGVNb2RlbERlbGF5KGUpIHtcblx0ICAgIHZhciBlbGVtID0gdGhpc1xuXHQgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdXBkYXRlTW9kZWwuY2FsbChlbGVtLCBlKVxuXHQgICAgfSwgMClcblx0fVxuXG5cblx0ZnVuY3Rpb24gb3BlbkNhcmV0KCkge1xuXHQgICAgdGhpcy5jYXJldCA9IHRydWVcblx0fVxuXG5cdGZ1bmN0aW9uIGNsb3NlQ2FyZXQoKSB7XG5cdCAgICB0aGlzLmNhcmV0ID0gZmFsc2Vcblx0fVxuXHRmdW5jdGlvbiBvcGVuQ29tcG9zaXRpb24oKSB7XG5cdCAgICB0aGlzLmNvbXBvc2luZyA9IHRydWVcblx0fVxuXG5cdGZ1bmN0aW9uIGNsb3NlQ29tcG9zaXRpb24oZSkge1xuXHQgICAgdGhpcy5jb21wb3NpbmcgPSBmYWxzZVxuXHQgICAgdXBkYXRlTW9kZWxEZWxheS5jYWxsKHRoaXMsIGUpXG5cdH1cblxuXHRmdW5jdGlvbiB1cGRhdGVNb2RlbEtleURvd24oZSkge1xuXHQgICAgdmFyIGtleSA9IGUua2V5Q29kZVxuXHQgICAgLy8gaWdub3JlXG5cdCAgICAvLyAgICBjb21tYW5kICAgICAgICAgICAgbW9kaWZpZXJzICAgICAgICAgICAgICAgICAgIGFycm93c1xuXHQgICAgaWYgKGtleSA9PT0gOTEgfHwgKDE1IDwga2V5ICYmIGtleSA8IDE5KSB8fCAoMzcgPD0ga2V5ICYmIGtleSA8PSA0MCkpXG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICB1cGRhdGVNb2RlbC5jYWxsKHRoaXMsIGUpXG5cdH1cblxuXHRtYXJrSUQob3BlbkNhcmV0KVxuXHRtYXJrSUQoY2xvc2VDYXJldClcblx0bWFya0lEKG9wZW5Db21wb3NpdGlvbilcblx0bWFya0lEKGNsb3NlQ29tcG9zaXRpb24pXG5cdG1hcmtJRCh1cGRhdGVNb2RlbClcblx0bWFya0lEKHVwZGF0ZU1vZGVsSGFjaylcblx0bWFya0lEKHVwZGF0ZU1vZGVsRGVsYXkpXG5cdG1hcmtJRCh1cGRhdGVNb2RlbEtleURvd24pXG5cblx0Ly9JRTYtOOimgeWkhOeQhuWFieagh+aXtumcgOimgeW8guatpVxuXHR2YXIgbWF5QmVBc3luYyA9IGZ1bmN0aW9uIChmbikge1xuXHQgICAgc2V0VGltZW91dChmbiwgMClcblx0fVxuXHR2YXIgc2V0Q2FyZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBjdXJzb3JQb3NpdGlvbikge1xuXHQgICAgdmFyIHJhbmdlXG5cdCAgICBpZiAodGFyZ2V0LmNyZWF0ZVRleHRSYW5nZSkge1xuXHQgICAgICAgIG1heUJlQXN5bmMoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0YXJnZXQuZm9jdXMoKVxuXHQgICAgICAgICAgICByYW5nZSA9IHRhcmdldC5jcmVhdGVUZXh0UmFuZ2UoKVxuXHQgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuXHQgICAgICAgICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBjdXJzb3JQb3NpdGlvbilcblx0ICAgICAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBjdXJzb3JQb3NpdGlvbilcblx0ICAgICAgICAgICAgcmFuZ2Uuc2VsZWN0KClcblx0ICAgICAgICB9KVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB0YXJnZXQuZm9jdXMoKVxuXHQgICAgICAgIGlmICh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICB0YXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yUG9zaXRpb24sIGN1cnNvclBvc2l0aW9uKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdHZhciBnZXRDYXJldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0ICAgIHZhciBzdGFydCA9IDBcblx0ICAgIHZhciBub3JtYWxpemVkVmFsdWVcblx0ICAgIHZhciByYW5nZVxuXHQgICAgdmFyIHRleHRJbnB1dFJhbmdlXG5cdCAgICB2YXIgbGVuXG5cdCAgICB2YXIgZW5kUmFuZ2VcblxuXHQgICAgaWYgKHR5cGVvZiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgPT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgdGFyZ2V0LnNlbGVjdGlvbkVuZCA9PSBcIm51bWJlclwiKSB7XG5cdCAgICAgICAgc3RhcnQgPSB0YXJnZXQuc2VsZWN0aW9uU3RhcnRcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKVxuXG5cdCAgICAgICAgaWYgKHJhbmdlICYmIHJhbmdlLnBhcmVudEVsZW1lbnQoKSA9PSB0YXJnZXQpIHtcblx0ICAgICAgICAgICAgbGVuID0gdGFyZ2V0LnZhbHVlLmxlbmd0aFxuXHQgICAgICAgICAgICBub3JtYWxpemVkVmFsdWUgPSB0YXJnZXQudmFsdWUucmVwbGFjZSgvXFxyXFxuL2csIFwiXFxuXCIpXG5cblx0ICAgICAgICAgICAgdGV4dElucHV0UmFuZ2UgPSB0YXJnZXQuY3JlYXRlVGV4dFJhbmdlKClcblx0ICAgICAgICAgICAgdGV4dElucHV0UmFuZ2UubW92ZVRvQm9va21hcmsocmFuZ2UuZ2V0Qm9va21hcmsoKSlcblxuXHQgICAgICAgICAgICBlbmRSYW5nZSA9IHRhcmdldC5jcmVhdGVUZXh0UmFuZ2UoKVxuXHQgICAgICAgICAgICBlbmRSYW5nZS5jb2xsYXBzZShmYWxzZSlcblxuXHQgICAgICAgICAgICBpZiAodGV4dElucHV0UmFuZ2UuY29tcGFyZUVuZFBvaW50cyhcIlN0YXJ0VG9FbmRcIiwgZW5kUmFuZ2UpID4gLTEpIHtcblx0ICAgICAgICAgICAgICAgIHN0YXJ0ID0gbGVuXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBzdGFydCA9IC10ZXh0SW5wdXRSYW5nZS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwgLWxlbilcblx0ICAgICAgICAgICAgICAgIHN0YXJ0ICs9IG5vcm1hbGl6ZWRWYWx1ZS5zbGljZSgwLCBzdGFydCkuc3BsaXQoXCJcXG5cIikubGVuZ3RoIC0gMVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gc3RhcnRcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gdXBkYXRlTW9kZWxCeUV2ZW50XG5cbi8qKiovIH0sXG4vKiA1MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHVwZGF0ZU1vZGVsTWV0aG9kcyA9IF9fd2VicGFja19yZXF1aXJlX18oNTMpXG5cblx0ZnVuY3Rpb24gdXBkYXRlTW9kZWxIYW5kbGUoZSkge1xuXHQgICAgdmFyIGVsZW0gPSB0aGlzXG5cdCAgICB2YXIgZmllbGQgPSB0aGlzLl9fbXNfZHVwbGV4X19cblx0ICAgIGlmIChlbGVtLmNvbXBvc2luZyB8fCBmaWVsZC5wYXJzZShlbGVtLnZhbHVlKSA9PT0gZmllbGQubGFzdFZpZXdWYWx1ZSl7XG5cdCAgICAgICAgLy/pmLLmraJvbnByb3BlcnR5Y2hhbmdl5byV5Y+R54iG5qCIXG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgIGlmIChlbGVtLmNhcmV0KSB7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgdmFyIHBvcyA9IGZpZWxkLmdldENhcmV0KGVsZW0pXG5cdCAgICAgICAgICAgIGZpZWxkLnBvcyA9IHBvc1xuXHQgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgYXZhbG9uLndhcm4oJ2ZpeENhcmV0IGVycm9yJywgZSlcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBpZiAoZmllbGQuZGVib3VuY2VUaW1lID4gNCkge1xuXHQgICAgICAgIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpXG5cdCAgICAgICAgdmFyIGxlZnQgPSB0aW1lc3RhbXAgLSBmaWVsZC50aW1lIHx8IDBcblx0ICAgICAgICBmaWVsZC50aW1lID0gdGltZXN0YW1wXG5cdCAgICAgICAgaWYgKGxlZnQgPj0gZmllbGQuZGVib3VuY2VUaW1lKSB7XG5cdCAgICAgICAgICAgIHVwZGF0ZU1vZGVsTWV0aG9kc1tmaWVsZC50eXBlXS5jYWxsKGZpZWxkKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGNsZWFyVGltZW91dChmaWVsZC5kZWJvdW5jZUlEKVxuXHQgICAgICAgICAgICBmaWVsZC5kZWJvdW5jZUlEID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICB1cGRhdGVNb2RlbE1ldGhvZHNbZmllbGQudHlwZV0uY2FsbChmaWVsZClcblx0ICAgICAgICAgICAgfSwgbGVmdClcblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHVwZGF0ZU1vZGVsTWV0aG9kc1tmaWVsZC50eXBlXS5jYWxsKGZpZWxkKVxuXHQgICAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB1cGRhdGVNb2RlbEhhbmRsZVxuXG4vKioqLyB9LFxuLyogNTMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdHZhciB1cGRhdGVNb2RlbE1ldGhvZHMgPSB7XG5cdCAgICBpbnB1dDogZnVuY3Rpb24gKHByb3ApIHsvL+WkhOeQhuWNleS4qnZhbHVl5YC85aSE55CGXG5cdCAgICAgICAgdmFyIGRhdGEgPSB0aGlzXG5cdCAgICAgICAgcHJvcCA9IHByb3AgfHwgJ3ZhbHVlJ1xuXHQgICAgICAgIHZhciBkb20gPSBkYXRhLmRvbVxuXHQgICAgICAgIHZhciByYXdWYWx1ZSA9IGRvbVtwcm9wXVxuXHQgICAgICAgIHZhciBwYXJzZWRWYWx1ZSA9IGRhdGEucGFyc2UocmF3VmFsdWUpXG5cdCAgICAgICAgdmFyIGZvcm1hdGVkVmFsdWUgPSBkYXRhLmZvcm1hdChkYXRhLnZtb2RlbCwgcGFyc2VkVmFsdWUpXG5cdCAgICAgICAgZGF0YS5sYXN0Vmlld1ZhbHVlID0gZm9ybWF0ZWRWYWx1ZVxuXHQgICAgICAgIC8v5pyJ5pe25YCZcGFyc2XlkI7kuIDoh7Qsdm3kuI3kvJrmlLnlj5gs5L2GaW5wdXTph4zpnaLnmoTlgLxcblx0ICAgICAgICBpZiAocGFyc2VkVmFsdWUgIT09IGRhdGEubW9kZWxWYWx1ZSkge1xuXHQgICAgICAgICAgICBkYXRhLnNldChkYXRhLnZtb2RlbCwgcGFyc2VkVmFsdWUpXG5cdCAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXG5cdCAgICAgICAgfVxuXHQgICAgICAgXG5cdCAgICAgICAgZG9tW3Byb3BdID0gZm9ybWF0ZWRWYWx1ZVxuXHQgICAgICBcblx0ICAgICAgICB2YXIgcG9zID0gZGF0YS5wb3Ncblx0ICAgICAgICBpZiAoZG9tLmNhcmV0ICkge1xuXHQgICAgICAgICAgICBkYXRhLnNldENhcmV0KGRvbSwgcG9zKVxuXHQgICAgICAgICB9XG5cdCAgICAgICAgLy92bS5hYWEgPSAnMTIzNDU2Nzg5MCdcblx0ICAgICAgICAvL+WkhOeQhiA8aW5wdXQgbXMtZHVwbGV4PSdAYWFhfGxpbWl0QnkoOCknLz57e0BhYWF9fSDov5nnp43moLzlvI/ljJblkIzmraXkuI3kuIDoh7TnmoTmg4XlhrUgXG5cblx0ICAgIH0sXG5cdCAgICByYWRpbzogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBkYXRhID0gdGhpc1xuXHQgICAgICAgIGlmIChkYXRhLmlzQ2hlY2tlZCkge1xuXHQgICAgICAgICAgICB2YXIgdmFsID0gIWRhdGEubW9kZWxWYWx1ZVxuXHQgICAgICAgICAgICBkYXRhLnNldChkYXRhLnZtb2RlbCwgdmFsKVxuXHQgICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHVwZGF0ZU1vZGVsTWV0aG9kcy5pbnB1dC5jYWxsKGRhdGEpXG5cdCAgICAgICAgICAgIGRhdGEubGFzdFZpZXdWYWx1ZSA9IE5hTlxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBjaGVja2JveDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBkYXRhID0gdGhpc1xuXHQgICAgICAgIHZhciBhcnJheSA9IGRhdGEubW9kZWxWYWx1ZVxuXHQgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcblx0ICAgICAgICAgICAgYXZhbG9uLndhcm4oJ21zLWR1cGxleOW6lOeUqOS6jmNoZWNrYm945LiK6KaB5a+55bqU5LiA5Liq5pWw57uEJylcblx0ICAgICAgICAgICAgYXJyYXkgPSBbYXJyYXldXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBtZXRob2QgPSBkYXRhLmRvbS5jaGVja2VkID8gJ2Vuc3VyZScgOiAncmVtb3ZlJ1xuXHQgICAgICAgIFxuXHQgICAgICAgIGlmIChhcnJheVttZXRob2RdKSB7XG5cdCAgICAgICAgICAgIHZhciB2YWwgPSBkYXRhLnBhcnNlKGRhdGEuZG9tLnZhbHVlKVxuXHQgICAgICAgICAgICBhcnJheVttZXRob2RdKHZhbClcblx0ICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcblx0ICAgICAgICB9XG5cblx0ICAgIH0sXG5cdCAgICBzZWxlY3Q6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgZGF0YSA9IHRoaXNcblx0ICAgICAgICB2YXIgdmFsID0gYXZhbG9uKGRhdGEuZG9tKS52YWwoKSAvL+Wtl+espuS4suaIluWtl+espuS4suaVsOe7hFxuXHQgICAgICAgIGlmICh2YWwgKyAnJyAhPT0gdGhpcy5tb2RlbFZhbHVlICsgJycpIHtcblx0ICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkgeyAvL+i9rOaNouW4g+WwlOaVsOe7hOaIluWFtuS7llxuXHQgICAgICAgICAgICAgICAgdmFsID0gdmFsLm1hcChmdW5jdGlvbiAodikge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnBhcnNlKHYpXG5cdCAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdmFsID0gZGF0YS5wYXJzZSh2YWwpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZGF0YS5zZXQoZGF0YS52bW9kZWwsIHZhbClcblx0ICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgY29udGVudGVkaXRhYmxlOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdXBkYXRlTW9kZWxNZXRob2RzLmlucHV0LmNhbGwodGhpcywgJ2lubmVySFRNTCcpXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBjYWxsYmFjayhkYXRhKSB7XG5cdCAgICBpZiAoZGF0YS5jYWxsYmFjaykge1xuXHQgICAgICAgIGRhdGEuY2FsbGJhY2suY2FsbChkYXRhLnZtb2RlbCwge1xuXHQgICAgICAgICAgICB0eXBlOiAnY2hhbmdlZCcsXG5cdCAgICAgICAgICAgIHRhcmdldDogZGF0YS5kb21cblx0ICAgICAgICB9KVxuXHQgICAgfVxuXHR9XG5cblxuXG5cdG1vZHVsZS5leHBvcnRzID0gdXBkYXRlTW9kZWxNZXRob2RzXG5cblxuLyoqKi8gfSxcbi8qIDU0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgdmFsdWVIaWphY2sgPSBmYWxzZVxuXHR0cnkgeyAvLyMyNzIgSUU5LUlFMTEsIGZpcmVmb3hcblx0ICAgIHZhciBzZXR0ZXJzID0ge31cblx0ICAgIHZhciBhcHJvdG8gPSBIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZVxuXHQgICAgdmFyIGJwcm90byA9IEhUTUxUZXh0QXJlYUVsZW1lbnQucHJvdG90eXBlXG5cdCAgICBmdW5jdGlvbiBuZXdTZXR0ZXIodmFsdWUpIHsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cdCAgICAgICAgc2V0dGVyc1t0aGlzLnRhZ05hbWVdLmNhbGwodGhpcywgdmFsdWUpXG5cdCAgICAgICAgaWYgKCF0aGlzLmNhcmV0ICYmIHRoaXMuX19tc19kdXBsZXhfXykge1xuXHQgICAgICAgICAgICB0aGlzLl9fbXNfZHVwbGV4X18udXBkYXRlLmNhbGwodGhpcylcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICB2YXIgaW5wdXRQcm90byA9IEhUTUxJbnB1dEVsZW1lbnQucHJvdG90eXBlXG5cdCAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhpbnB1dFByb3RvKSAvL+aVheaEj+W8leWPkUlFNi04562J5rWP6KeI5Zmo5oql6ZSZXG5cdCAgICBzZXR0ZXJzWydJTlBVVCddID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcHJvdG8sICd2YWx1ZScpLnNldFxuXG5cdCAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXByb3RvLCAndmFsdWUnLCB7XG5cdCAgICAgICAgc2V0OiBuZXdTZXR0ZXJcblx0ICAgIH0pXG5cdCAgICBzZXR0ZXJzWydURVhUQVJFQSddID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihicHJvdG8sICd2YWx1ZScpLnNldFxuXHQgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGJwcm90bywgJ3ZhbHVlJywge1xuXHQgICAgICAgIHNldDogbmV3U2V0dGVyXG5cdCAgICB9KVxuXHQgICAgdmFsdWVIaWphY2sgPSB0cnVlXG5cdH0gY2F0Y2ggKGUpIHtcblx0ICAgIC8v5ZyoY2hyb21lIDQz5LitIG1zLWR1cGxleOe7iOS6juS4jemcgOimgeS9v+eUqOWumuaXtuWZqOWunueOsOWPjOWQkee7keWumuS6hlxuXHQgICAgLy8gaHR0cDovL3VwZGF0ZXMuaHRtbDVyb2Nrcy5jb20vMjAxNS8wNC9ET00tYXR0cmlidXRlcy1ub3ctb24tdGhlLXByb3RvdHlwZVxuXHQgICAgLy8gaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xandBOG10Q2x3eEktUUp1SFQ3ODcyWjBweHBaejhQQmtmMmJHQWJzVXRxcy9lZGl0P3BsaT0xXG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSB2YWx1ZUhpamFja1xuXG4vKioqLyB9LFxuLyogNTUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFxuXHR2YXIgdXBkYXRlVmlldyA9IHtcblx0ICAgIGlucHV0OiBmdW5jdGlvbiAoKSB7Ly/lpITnkIbljZXkuKp2YWx1ZeWAvOWkhOeQhlxuXHQgICAgICAgIHRoaXMuZG9tLnZhbHVlID0gdGhpcy52aWV3VmFsdWVcblx0ICAgIH0sXG5cdCAgICByYWRpbzogZnVuY3Rpb24gKCkgey8v5aSE55CG5Y2V5LiqY2hlY2tlZOWxnuaAp1xuXHQgICAgICAgIHZhciBjaGVja2VkXG5cdCAgICAgICAgaWYgKHRoaXMuaXNDaGVja2VkKSB7XG5cdCAgICAgICAgICAgIGNoZWNrZWQgPSAhIXRoaXMubW9kZWxWYWx1ZVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGNoZWNrZWQgPSB0aGlzLnZpZXdWYWx1ZSArICcnID09PSB0aGlzLmRvbS52YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgZG9tID0gdGhpcy5kb21cblx0ICAgICAgICBpZiAoYXZhbG9uLm1zaWUgPT09IDYpIHtcblx0ICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAvL0lFOCBjaGVja2JveCwgcmFkaW/mmK/kvb/nlKhkZWZhdWx0Q2hlY2tlZOaOp+WItumAieS4reeKtuaAge+8jFxuXHQgICAgICAgICAgICAgICAgLy/lubbkuJTopoHlhYjorr7nva5kZWZhdWx0Q2hlY2tlZOWQjuiuvue9rmNoZWNrZWRcblx0ICAgICAgICAgICAgICAgIC8v5bm25LiU5b+F6aG76K6+572u5bu26L+fXG5cdCAgICAgICAgICAgICAgICBkb20uZGVmYXVsdENoZWNrZWQgPSBjaGVja2VkXG5cdCAgICAgICAgICAgICAgICBkb20uY2hlY2tlZCA9IGNoZWNrZWRcblx0ICAgICAgICAgICAgfSwgMzEpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgZG9tLmNoZWNrZWQgPSBjaGVja2VkXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGNoZWNrYm94OiBmdW5jdGlvbiAoKSB7Ly/lpITnkIblpJrkuKpjaGVja2Vk5bGe5oCnXG5cdCAgICAgICAgdmFyIGNoZWNrZWQgPSBmYWxzZVxuXHQgICAgICAgIHZhciBkb20gPSB0aGlzLmRvbVxuXHQgICAgICAgIHZhciB2YWx1ZSA9IGRvbS52YWx1ZVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tb2RlbFZhbHVlLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIHZhciBlbCA9IHRoaXMubW9kZWxWYWx1ZVtpXVxuXHQgICAgICAgICAgICBpZiAoZWwgKyAnJyA9PT0gdmFsdWUpIHtcblx0ICAgICAgICAgICAgICAgIGNoZWNrZWQgPSB0cnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZG9tLmNoZWNrZWQgPSBjaGVja2VkXG5cdCAgICB9LFxuXHQgICAgc2VsZWN0OiBmdW5jdGlvbiAoKSB7Ly/lpITnkIblrZDnuqfnmoRzZWxlY3RlZOWxnuaAp1xuXHQgICAgICAgIHZhciBhID0gQXJyYXkuaXNBcnJheSh0aGlzLnZpZXdWYWx1ZSkgP1xuXHQgICAgICAgICAgICAgICAgdGhpcy52aWV3VmFsdWUubWFwKFN0cmluZykgOiB0aGlzLnZpZXdWYWx1ZSArICcnXG5cdCAgICAgICAgYXZhbG9uKHRoaXMuZG9tKS52YWwoYSlcblx0ICAgIH0sXG5cdCAgICBjb250ZW50ZWRpdGFibGU6IGZ1bmN0aW9uICgpIHsvL+WkhOeQhuWNleS4qmlubmVySFRNTFxuXHQgICAgICAgIHRoaXMuZG9tLmlubmVySFRNTCA9IHRoaXMudmlld1ZhbHVlXG5cdCAgICAgICAgdGhpcy51cGRhdGUuY2FsbCh0aGlzLmRvbSlcblx0ICAgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gdXBkYXRlVmlld1xuXG5cbi8qKiovIH0sXG4vKiA1NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYWRkRmllbGQobm9kZSwgdm5vZGUpIHtcblx0ICAgIHZhciBmaWVsZCA9IG5vZGUuX19tc19kdXBsZXhfX1xuXHQgICAgdmFyIHJ1bGVzID0gdm5vZGVbJ21zLXJ1bGVzJ11cblx0ICAgIGlmIChydWxlcyAmJiAhZmllbGQudmFsaWRhdG9yKSB7XG5cdCAgICAgICAgd2hpbGUgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuXHQgICAgICAgICAgICB2YXIgdmFsaWRhdG9yID0gbm9kZS5fbXNfdmFsaWRhdG9yX1xuXHQgICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG5cdCAgICAgICAgICAgICAgICBmaWVsZC5ydWxlcyA9IHJ1bGVzXG5cdCAgICAgICAgICAgICAgICBmaWVsZC52YWxpZGF0b3IgPSB2YWxpZGF0b3Jcblx0ICAgICAgICAgICAgICAgIGlmKGF2YWxvbi5BcnJheS5lbnN1cmUodmFsaWRhdG9yLmZpZWxkcywgZmllbGQpKXtcblx0ICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3IuYWRkRmllbGQoZmllbGQpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGVcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXG4vKioqLyB9LFxuLyogNTcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXG5cdHZhciBkaXIgPSBhdmFsb24uZGlyZWN0aXZlKCd2YWxpZGF0ZScsIHtcblx0Ly/pqozor4HljZXkuKrooajljZXlhYPntKBcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIG5hbWUpIHtcblx0ICAgICAgICB2YXIgdmFsaWRhdG9yID0gY29weVtuYW1lXVxuXHQgICAgICAgIHZhciBwID0gc3JjW25hbWVdXG5cdCAgICAgICAgaWYgKHAgJiYgcC5vbkVycm9yICYmIHAuYWRkRmllbGQpIHtcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfSBlbHNlIGlmIChPYmplY3QodmFsaWRhdG9yKSA9PT0gdmFsaWRhdG9yKSB7XG5cdCAgICAgICAgICAgIHNyYy52bVZhbGlkYXRvciA9IHZhbGlkYXRvclxuXHQgICAgICAgICAgICBpZiAodmFsaWRhdG9yLiRpZCkgey8v6L2s5o2i5Li65pmu6YCa5a+56LGhXG5cdCAgICAgICAgICAgICAgICB2YWxpZGF0b3IgPSB2YWxpZGF0b3IuJG1vZGVsXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICBcblx0ICAgICAgICAgICAgc3JjW25hbWVdID0gdmFsaWRhdG9yXG5cdCAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gZGlyLmRlZmF1bHRzKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIXZhbGlkYXRvci5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcltuYW1lXSA9IGRpci5kZWZhdWx0c1tuYW1lXVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhbGlkYXRvci5maWVsZHMgPSB2YWxpZGF0b3IuZmllbGRzIHx8IFtdXG5cdCAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlKVxuXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSkge1xuXHQgICAgICAgIHZhciB2YWxpZGF0b3IgPSB2ZG9tWydtcy12YWxpZGF0ZSddXG5cdCAgICAgICAgZG9tLl9tc192YWxpZGF0b3JfID0gdmFsaWRhdG9yXG5cdCAgICAgICAgdmFsaWRhdG9yLmRvbSA9IGRvbVxuXHQgICAgICAgIHZhciB2ID0gdmRvbS52bVZhbGlkYXRvciBcblx0ICAgICAgICB0cnl7XG5cdCAgICAgICAgICAgdi5vbk1hbnVhbCA9IG9uTWFudWFsXG5cdCAgICAgICAgfWNhdGNoKGUpe31cblx0ICAgICAgICBkZWxldGUgdmRvbS52bVZhbGlkYXRvciBcblx0ICAgICAgICBkb20uc2V0QXR0cmlidXRlKFwibm92YWxpZGF0ZVwiLCBcIm5vdmFsaWRhdGVcIilcblx0ICAgICAgICBmdW5jdGlvbiBvbk1hbnVhbCgpIHtcblx0ICAgICAgICAgICAgZGlyLnZhbGlkYXRlQWxsLmNhbGwodmFsaWRhdG9yLCB2YWxpZGF0b3Iub25WYWxpZGF0ZUFsbClcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHZhbGlkYXRvci52YWxpZGF0ZUFsbEluU3VibWl0KSB7XG5cdCAgICAgICAgICAgIGF2YWxvbi5iaW5kKGRvbSwgXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXHQgICAgICAgICAgICAgICAgb25NYW51YWwoKVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgICAgIFxuXHQgICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdG9yLm9uSW5pdCA9PT0gXCJmdW5jdGlvblwiKSB7IC8vdm1vZGVsc+aYr+S4jeWMheaLrHZtb2RlbOeahFxuXHQgICAgICAgICAgICB2YWxpZGF0b3Iub25Jbml0LmNhbGwoZG9tLCB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiAnaW5pdCcsXG5cdCAgICAgICAgICAgICAgICB0YXJnZXQ6IGRvbSxcblx0ICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHZhbGlkYXRlQWxsOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0ICAgICAgICB2YXIgdmFsaWRhdG9yID0gdGhpc1xuXHQgICAgICAgIHZhciBmbiA9IHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiID8gY2FsbGJhY2sgOiB2YWxpZGF0b3Iub25WYWxpZGF0ZUFsbFxuXHQgICAgICAgIHZhciBwcm9taXNlID0gdmFsaWRhdG9yLmZpZWxkcy5maWx0ZXIoZnVuY3Rpb24gKGZpZWxkKSB7XG5cdCAgICAgICAgICAgIHZhciBlbCA9IGZpZWxkLmRvbVxuXHQgICAgICAgICAgICByZXR1cm4gZWwgJiYgIWVsLmRpc2FibGVkICYmIHZhbGlkYXRvci5kb20uY29udGFpbnMoZWwpXG5cdCAgICAgICAgfSkubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuXHQgICAgICAgICAgICByZXR1cm4gZGlyLnZhbGlkYXRlKGZpZWxkLCB0cnVlKVxuXHQgICAgICAgIH0pXG5cdCAgICAgICAgdmFyIHJlYXNvbnMgPSBbXVxuXHQgICAgICAgIFByb21pc2UuYWxsKHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKGFycmF5KSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSBhcnJheVtpKytdOyApIHtcblx0ICAgICAgICAgICAgICAgIHJlYXNvbnMgPSByZWFzb25zLmNvbmNhdChlbClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAodmFsaWRhdG9yLmRlZHVwbGljYXRlSW5WYWxpZGF0ZUFsbCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHVuaXEgPSB7fVxuXHQgICAgICAgICAgICAgICAgcmVhc29ucyA9IHJlYXNvbnMuZmlsdGVyKGZ1bmN0aW9uIChmaWVsZCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IGZpZWxkLmRvbVxuXHQgICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gZWwudW5pcXVlSUQgfHwgKGVsLnVuaXF1ZUlEID0gc2V0VGltZW91dChcIjFcIikpXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHVuaXFbdXVpZF0pIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdW5pcVt1dWlkXSA9IHRydWVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGZuLmNhbGwodmFsaWRhdG9yLmRvbSwgcmVhc29ucykgLy/ov5nph4zlj6rmlL7nva7mnKrpgJrov4fpqozor4HnmoTnu4Tku7Zcblx0ICAgICAgICB9KVxuXHQgICAgfSxcblx0ICAgIGFkZEZpZWxkOiBmdW5jdGlvbiAoZmllbGQpIHtcblx0ICAgICAgICB2YXIgdmFsaWRhdG9yID0gdGhpc1xuXHQgICAgICAgIHZhciBub2RlID0gZmllbGQuZG9tXG5cdCAgICAgICAgaWYgKHZhbGlkYXRvci52YWxpZGF0ZUluS2V5dXAgJiYgKCFmaWVsZC5pc0NoYW5nZWQgJiYgIWZpZWxkLmRlYm91bmNlVGltZSkpIHtcblx0ICAgICAgICAgICAgYXZhbG9uLmJpbmQobm9kZSwgJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgICAgICAgICAgIGRpci52YWxpZGF0ZShmaWVsZCwgMCwgZSlcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHZhbGlkYXRvci52YWxpZGF0ZUluQmx1cikge1xuXHQgICAgICAgICAgICBhdmFsb24uYmluZChub2RlLCAnYmx1cicsIGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgICAgICAgICBkaXIudmFsaWRhdGUoZmllbGQsIDAsIGUpXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh2YWxpZGF0b3IucmVzZXRJbkZvY3VzKSB7XG5cdCAgICAgICAgICAgIGF2YWxvbi5iaW5kKG5vZGUsICdmb2N1cycsIGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgICAgICAgICB2YWxpZGF0b3Iub25SZXNldC5jYWxsKG5vZGUsIGUsIGZpZWxkKVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKGZpZWxkLCBpc1ZhbGlkYXRlQWxsLCBldmVudCkge1xuXHQgICAgICAgIHZhciBwcm9taXNlcyA9IFtdXG5cdCAgICAgICAgdmFyIHZhbHVlID0gZmllbGQubW9kZWxWYWx1ZVxuXHQgICAgICAgIHZhciBlbGVtID0gZmllbGQuZG9tXG5cdCAgICAgICAgdmFyIHZhbGlkYXRvciA9IGZpZWxkLnZhbGlkYXRvclxuXHQgICAgICAgIGlmIChlbGVtLmRpc2FibGVkKVxuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICBmb3IgKHZhciBydWxlTmFtZSBpbiBmaWVsZC5ydWxlcykge1xuXHQgICAgICAgICAgICB2YXIgcnVsZVZhbHVlID0gZmllbGQucnVsZXNbcnVsZU5hbWVdXG5cdCAgICAgICAgICAgIGlmIChydWxlVmFsdWUgPT09IGZhbHNlKVxuXHQgICAgICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICAgICAgdmFyIGhvb2sgPSBhdmFsb24udmFsaWRhdG9yc1tydWxlTmFtZV1cblx0ICAgICAgICAgICAgdmFyIHJlc29sdmUsIHJlamVjdFxuXHQgICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7XG5cdCAgICAgICAgICAgICAgICByZXNvbHZlID0gYVxuXHQgICAgICAgICAgICAgICAgcmVqZWN0ID0gYlxuXHQgICAgICAgICAgICB9KSlcblx0ICAgICAgICAgICAgdmFyIG5leHQgPSBmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGZpZWxkLm5vcmVxdWlyZWQgJiYgdmFsdWUgPT09IFwiXCIpIHtcblx0ICAgICAgICAgICAgICAgICAgICBhID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKGEpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciByZWFzb24gPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW0sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGZpZWxkLmRhdGEsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVsZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIHJ1bGVOYW1lICsgXCItbWVzc2FnZVwiKSB8fCBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtbWVzc2FnZVwiKSB8fCBob29rLm1lc3NhZ2UsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlUnVsZTogcnVsZU5hbWUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGdldE1lc3NhZ2U6IGdldE1lc3NhZ2Vcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWFzb24pXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZmllbGQuZGF0YSA9IHt9XG5cdCAgICAgICAgICAgIGZpZWxkLmRhdGFbcnVsZU5hbWVdID0gcnVsZVZhbHVlXG5cdCAgICAgICAgICAgIGhvb2suZ2V0KHZhbHVlLCBmaWVsZCwgbmV4dClcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHJlYXNvbnMgPSBbXVxuXHQgICAgICAgIC8v5aaC5p6ccHJvbWlzZXPkuI3kuLrnqbrvvIzor7TmmI7nu4/ov4fpqozor4Hmi6bmiKrlmahcblx0ICAgICAgICB2YXIgbGFzdFByb21pc2UgPSBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbiAoYXJyYXkpIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGVsOyBlbCA9IGFycmF5W2krK107ICkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbCA9PT0gXCJvYmplY3RcIikge1xuXHQgICAgICAgICAgICAgICAgICAgIHJlYXNvbnMucHVzaChlbClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoIWlzVmFsaWRhdGVBbGwpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChyZWFzb25zLmxlbmd0aCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvci5vbkVycm9yLmNhbGwoZWxlbSwgcmVhc29ucywgZXZlbnQpXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvci5vblN1Y2Nlc3MuY2FsbChlbGVtLCByZWFzb25zLCBldmVudClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHZhbGlkYXRvci5vbkNvbXBsZXRlLmNhbGwoZWxlbSwgcmVhc29ucywgZXZlbnQpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIHJlYXNvbnNcblx0ICAgICAgICB9KVxuXHQgICAgICAgIHJldHVybiBsYXN0UHJvbWlzZVxuXHQgICAgfVxuXHR9KVxuXG5cdHZhciByZm9ybWF0ID0gL1xcXFw/e3soW157fV0rKVxcfX0vZ21cblxuXHRmdW5jdGlvbiBnZXRNZXNzYWdlKCkge1xuXHQgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGEgfHwge31cblx0ICAgIHJldHVybiB0aGlzLm1lc3NhZ2UucmVwbGFjZShyZm9ybWF0LCBmdW5jdGlvbiAoXywgbmFtZSkge1xuXHQgICAgICAgIHJldHVybiBkYXRhW25hbWVdID09IG51bGwgPyBcIlwiIDogZGF0YVtuYW1lXVxuXHQgICAgfSlcblx0fVxuXHRkaXIuZGVmYXVsdHMgPSB7XG5cdCAgICBhZGRGaWVsZDogZGlyLmFkZEZpZWxkLC8v5L6b5YaF6YOo5L2/55SoLOaUtumbhuatpOWFg+e0oOW6leS4i+eahOaJgOaciW1zLWR1cGxleOeahOWfn+WvueixoVxuXHQgICAgb25FcnJvcjogYXZhbG9uLm5vb3AsXG5cdCAgICBvblN1Y2Nlc3M6IGF2YWxvbi5ub29wLFxuXHQgICAgb25Db21wbGV0ZTogYXZhbG9uLm5vb3AsXG5cdCAgICBvbk1hbnVhbDogYXZhbG9uLm5vb3AsXG5cdCAgICBvblJlc2V0OiBhdmFsb24ubm9vcCxcblx0ICAgIG9uVmFsaWRhdGVBbGw6IGF2YWxvbi5ub29wLFxuXHQgICAgdmFsaWRhdGVJbkJsdXI6IHRydWUsIC8vQGNvbmZpZyB7Qm9vbGVhbn0gdHJ1Ze+8jOWcqGJsdXLkuovku7bkuK3ov5vooYzpqozor4Es6Kem5Y+Rb25TdWNjZXNzLCBvbkVycm9yLCBvbkNvbXBsZXRl5Zue6LCDXG5cdCAgICB2YWxpZGF0ZUluS2V5dXA6IHRydWUsIC8vQGNvbmZpZyB7Qm9vbGVhbn0gdHJ1Ze+8jOWcqGtleXVw5LqL5Lu25Lit6L+b6KGM6aqM6K+BLOinpuWPkW9uU3VjY2Vzcywgb25FcnJvciwgb25Db21wbGV0ZeWbnuiwg1xuXHQgICAgdmFsaWRhdGVBbGxJblN1Ym1pdDogdHJ1ZSwgLy9AY29uZmlnIHtCb29sZWFufSB0cnVl77yM5Zyoc3VibWl05LqL5Lu25Lit5omn6KGMb25WYWxpZGF0ZUFsbOWbnuiwg1xuXHQgICAgcmVzZXRJbkZvY3VzOiB0cnVlLCAvL0Bjb25maWcge0Jvb2xlYW59IHRydWXvvIzlnKhmb2N1c+S6i+S7tuS4reaJp+ihjG9uUmVzZXTlm57osIMsXG5cdCAgICBkZWR1cGxpY2F0ZUluVmFsaWRhdGVBbGw6IGZhbHNlIC8vQGNvbmZpZyB7Qm9vbGVhbn0gZmFsc2XvvIzlnKh2YWxpZGF0ZUFsbOWbnuiwg+S4reWvuXJlYXNvbuaVsOe7hOagueaNruWFg+e0oOiKgueCuei/m+ihjOWOu+mHjVxuXHR9XG5cbi8qKiovIH0sXG4vKiA1OCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0YXZhbG9uLmRpcmVjdGl2ZSgncnVsZXMnLCB7XG5cdCAgICBwYXJzZTogZnVuY3Rpb24gKGNvcHksIHNyYywgYmluZGluZykge1xuXHQgICAgICAgIHZhciBydWxlcyA9IGJpbmRpbmcuZXhwclxuXHQgICAgICAgIGlmICgvey4rfS8udGVzdChydWxlcykpIHtcblx0ICAgICAgICAgICAgY29weVtiaW5kaW5nLm5hbWVdID0gYXZhbG9uLnBhcnNlRXhwcihiaW5kaW5nKVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgc3JjW25hbWVdID0gY29weVtuYW1lXVxuXHQgICAgICAgIHZhciBmaWVsZCA9IHNyYy5kb20gJiYgc3JjLmRvbS5fX21zX2R1cGxleF9fXG5cdCAgICAgICAgaWYgKGZpZWxkKSB7XG5cdCAgICAgICAgICAgIGZpZWxkLnJ1bGVzID0gY29weVtuYW1lXVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fSlcblx0ZnVuY3Rpb24gaXNSZWdFeHAodmFsdWUpIHtcblx0ICAgIHJldHVybiBhdmFsb24udHlwZSh2YWx1ZSkgPT09ICdyZWdleHAnXG5cdH1cblx0dmFyIHJtYWlsID0gL15cXHcrKFstKy5dXFx3KykqQFxcdysoWy0uXVxcdyspKlxcLlxcdysoWy0uXVxcdyspKiQvaVxuXHR2YXIgcnVybCA9IC9eKGZ0cHxodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdypAKT8oXFxTKykoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJUAhXFwtXFwvXSkpPyQvXG5cdGZ1bmN0aW9uIGlzQ29ycmVjdERhdGUodmFsdWUpIHtcblx0ICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUpIHsgLy/mmK/lrZfnrKbkuLLkvYbkuI3og73mmK/nqbrlrZfnrKZcblx0ICAgICAgICB2YXIgYXJyID0gdmFsdWUuc3BsaXQoXCItXCIpIC8v5Y+v5Lul6KKrLeWIh+aIkDPku73vvIzlubbkuJTnrKwx5Liq5pivNOS4quWtl+esplxuXHQgICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAzICYmIGFyclswXS5sZW5ndGggPT09IDQpIHtcblx0ICAgICAgICAgICAgdmFyIHllYXIgPSB+fmFyclswXSAvL+WFqOmDqOi9rOaNouS4uumdnui0n+aVtOaVsFxuXHQgICAgICAgICAgICB2YXIgbW9udGggPSB+fmFyclsxXSAtIDFcblx0ICAgICAgICAgICAgdmFyIGRhdGUgPSB+fmFyclsyXVxuXHQgICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKVxuXHQgICAgICAgICAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpID09PSB5ZWFyICYmIGQuZ2V0TW9udGgoKSA9PT0gbW9udGggJiYgZC5nZXREYXRlKCkgPT09IGRhdGVcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gZmFsc2Vcblx0fVxuXHRhdmFsb24uc2hhZG93Q29weShhdmFsb24udmFsaWRhdG9ycywge1xuXHQgICAgcGF0dGVybjoge1xuXHQgICAgICAgIG1lc3NhZ2U6ICflv4XpobvljLnphY17e3BhdHRlcm59fei/meagt+eahOagvOW8jycsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7XG5cdCAgICAgICAgICAgIHZhciBlbGVtID0gZmllbGQuZWxlbWVudFxuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IGZpZWxkLmRhdGFcblx0ICAgICAgICAgICAgaWYgKCFpc1JlZ0V4cChkYXRhLnBhdHRlcm4pKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaDVwYXR0ZXJuID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJwYXR0ZXJuXCIpXG5cdCAgICAgICAgICAgICAgICBkYXRhLnBhdHRlcm4gPSBuZXcgUmVnRXhwKCdeKD86JyArIGg1cGF0dGVybiArICcpJCcpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgbmV4dChkYXRhLnBhdHRlcm4udGVzdCh2YWx1ZSkpXG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBkaWdpdHM6IHtcblx0ICAgICAgICBtZXNzYWdlOiAn5b+F6aG75pW05pWwJyxcblx0ICAgICAgICBnZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQsIG5leHQpIHsvL+aVtOaVsFxuXHQgICAgICAgICAgICBuZXh0KC9eXFwtP1xcZCskLy50ZXN0KHZhbHVlKSlcblx0ICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIG51bWJlcjoge1xuXHQgICAgICAgIG1lc3NhZ2U6ICflv4XpobvmlbDlrZcnLFxuXHQgICAgICAgIGdldDogZnVuY3Rpb24gKHZhbHVlLCBmaWVsZCwgbmV4dCkgey8v5pWw5YC8XG5cdCAgICAgICAgICAgIG5leHQoaXNGaW5pdGUodmFsdWUpKVxuXHQgICAgICAgICAgICByZXR1cm4gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgcmVxdWlyZWQ6IHtcblx0ICAgICAgICBtZXNzYWdlOiAn5b+F6aG75aGr5YaZJyxcblx0ICAgICAgICBnZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQsIG5leHQpIHtcblx0ICAgICAgICAgICAgbmV4dCh2YWx1ZSAhPT0gXCJcIilcblx0ICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGVxdWFsdG86IHtcblx0ICAgICAgICBtZXNzYWdlOiAn5a+G56CB6L6T5YWl5LiN5LiA6Ie0Jyxcblx0ICAgICAgICBnZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQsIG5leHQpIHtcblx0ICAgICAgICAgICAgdmFyIGlkID0gU3RyaW5nKGZpZWxkLmRhdGEuZXF1YWx0bylcblx0ICAgICAgICAgICAgdmFyIG90aGVyID0gYXZhbG9uKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSkudmFsKCkgfHwgXCJcIlxuXHQgICAgICAgICAgICBuZXh0KHZhbHVlID09PSBvdGhlcilcblx0ICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGRhdGU6IHtcblx0ICAgICAgICBtZXNzYWdlOiAn5pel5pyf5qC85byP5LiN5q2j56GuJyxcblx0ICAgICAgICBnZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQsIG5leHQpIHtcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSBmaWVsZC5kYXRhXG5cdCAgICAgICAgICAgIGlmIChhdmFsb24udHlwZShkYXRhLmRhdGUpID09PSAncmVnZXhwJykge1xuXHQgICAgICAgICAgICAgICAgbmV4dChkYXRhLmRhdGUudGVzdCh2YWx1ZSkpXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBuZXh0KGlzQ29ycmVjdERhdGUodmFsdWUpKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB1cmw6IHtcblx0ICAgICAgICBtZXNzYWdlOiAnVVJM5qC85byP5LiN5q2j56GuJyxcblx0ICAgICAgICBnZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQsIG5leHQpIHtcblx0ICAgICAgICAgICAgbmV4dChydXJsLnRlc3QodmFsdWUpKVxuXHQgICAgICAgICAgICByZXR1cm4gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgZW1haWw6IHtcblx0ICAgICAgICBtZXNzYWdlOiAnZW1haWzmoLzlvI/kuI3mraPnoa4nLFxuXHQgICAgICAgIGdldDogZnVuY3Rpb24gKHZhbHVlLCBmaWVsZCwgbmV4dCkge1xuXHQgICAgICAgICAgICBuZXh0KHJtYWlsLnRlc3QodmFsdWUpKVxuXHQgICAgICAgICAgICByZXR1cm4gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgbWlubGVuZ3RoOiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ+acgOWwkei+k+WFpXt7bWlubGVuZ3RofX3kuKrlrZcnLFxuXHQgICAgICAgIGdldDogZnVuY3Rpb24gKHZhbHVlLCBmaWVsZCwgbmV4dCkge1xuXHQgICAgICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQoZmllbGQuZGF0YS5taW5sZW5ndGgsIDEwKVxuXHQgICAgICAgICAgICBuZXh0KHZhbHVlLmxlbmd0aCA+PSBudW0pXG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBtYXhsZW5ndGg6IHtcblx0ICAgICAgICBtZXNzYWdlOiAn5pyA5aSa6L6T5YWle3ttYXhsZW5ndGh9feS4quWtlycsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7XG5cdCAgICAgICAgICAgIHZhciBudW0gPSBwYXJzZUludChmaWVsZC5kYXRhLm1heGxlbmd0aCwgMTApXG5cdCAgICAgICAgICAgIG5leHQodmFsdWUubGVuZ3RoIDw9IG51bSlcblx0ICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIG1pbjoge1xuXHQgICAgICAgIG1lc3NhZ2U6ICfovpPlhaXlgLzkuI3og73lsI/kuo57e21pbn19Jyxcblx0ICAgICAgICBnZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQsIG5leHQpIHtcblx0ICAgICAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KGZpZWxkLmRhdGEubWluLCAxMClcblx0ICAgICAgICAgICAgbmV4dChwYXJzZUZsb2F0KHZhbHVlKSA+PSBudW0pXG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBtYXg6IHtcblx0ICAgICAgICBtZXNzYWdlOiAn6L6T5YWl5YC85LiN6IO95aSn5LqOe3ttYXh9fScsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7XG5cdCAgICAgICAgICAgIHZhciBudW0gPSBwYXJzZUludChmaWVsZC5kYXRhLm1heCwgMTApXG5cdCAgICAgICAgICAgIG5leHQocGFyc2VGbG9hdCh2YWx1ZSkgPD0gbnVtKVxuXHQgICAgICAgICAgICByZXR1cm4gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgY2hzOiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ+W/hemhu+aYr+S4reaWh+Wtl+espicsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7XG5cdCAgICAgICAgICAgIG5leHQoL15bXFx1NGUwMC1cXHU5ZmE1XSskLy50ZXN0KHZhbHVlKSlcblx0ICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9KVxuXG4vKioqLyB9LFxuLyogNTkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXHQvL21zLWltcG9yYW50IG1zLWNvbnRyb2xsZXIgbXMtZm9yIG1zLXdpZGdldCBtcy1lZmZlY3QgbXMtaWYgICAuLi5cblx0YXZhbG9uLmRpcmVjdGl2ZSgnaWYnLCB7XG5cdCAgICBwcmlvcml0eTogNixcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIG5hbWUpIHtcblx0ICAgICAgICB2YXIgY3VyID0gISFjb3B5W25hbWVdXG5cdCAgICAgICAgdmFyIG9sZCA9IHNyY1tuYW1lXVxuXHQgICAgICAgIHNyY1tuYW1lXSA9IGN1clxuXHQgICAgICAgIGlmIChzcmMuZXhlY0lmKSB7XG5cdCAgICAgICAgICAgIGlmICghY3VyKSB7XG5cdCAgICAgICAgICAgICAgICBjb3B5Lm5vZGVUeXBlID0gOFxuXHQgICAgICAgICAgICAgICAgY29weS5vcmRlciA9ICcnIC8v5LiN5YaN5omn6KGM5a2Q5a2Z6IqC54K555qE5pON5L2cXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGNvcHkgPT09IHNyYyB8fCBjdXIgIT09IG9sZCkge1xuXHQgICAgICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSwgJ2FmdGVyQ2hhbmdlJylcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdXBkYXRlOiBmdW5jdGlvbiAoZG9tLCB2ZG9tLCBwYXJlbnQpIHtcblx0ICAgICAgICB2YXIgc2hvdyA9IHZkb21bJ21zLWlmJ11cblx0ICAgICAgICB2ZG9tLmV4ZWNJZiA9IHRydWVcblx0ICAgICAgICBpZiAoc2hvdykge1xuXHQgICAgICAgICAgICAvL+imgeenu+mZpOWFg+e0oOiKgueCuSzlnKjlr7nlupTkvY3nva7kuIrmj5LlhaXms6jph4roioLngrlcblx0ICAgICAgICAgICAgdmRvbS5ub2RlVHlwZSA9IDFcblx0ICAgICAgICAgICAgdmRvbS5ub2RlVmFsdWUgPSBudWxsXG5cdCAgICAgICAgICAgIHZhciBjb21tZW50ID0gdmRvbS5jb21tZW50XG5cdCAgICAgICAgICAgIGlmICghY29tbWVudCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcGFyZW50ID0gY29tbWVudC5wYXJlbnROb2RlXG5cdCAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoZG9tLCBjb21tZW50KVxuXHQgICAgICAgICAgICBhdmFsb24uYXBwbHlFZmZlY3QoZG9tLCB2ZG9tLCB7XG5cdCAgICAgICAgICAgICAgICBob29rOiAnb25FbnRlckRvbmUnXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgYXZhbG9uLmFwcGx5RWZmZWN0KGRvbSwgdmRvbSwge1xuXHQgICAgICAgICAgICAgICAgaG9vazogJ29uTGVhdmVEb25lJyxcblx0ICAgICAgICAgICAgICAgIGNiOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW1lbnQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCdtcy1pZicpXG5cdCAgICAgICAgICAgICAgICAgICAgLy/ljrvmjonms6jph4roioLngrnkuLTml7bmt7vliqDnmoRtcy1lZmZlY3Rcblx0ICAgICAgICAgICAgICAgICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9SdWJ5TG91dnJlL2F2YWxvbi9pc3N1ZXMvMTU3N1xuXHQgICAgICAgICAgICAgICAgICAgIC8v6L+Z6YeM5b+F6aG76K6+572ubm9kZVZhbHVl5Li6bXMtaWYs5ZCm5YiZ5Lya5Zyo6IqC54K55a+56b2Q566X5rOV5Lit5Ye6546w5Lmx5Yig6IqC54K555qEQlVHXG5cdCAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50IHx8IGRvbS5wYXJlbnROb2RlXG5cdCAgICAgICAgICAgICAgICAgICAgdmRvbS5ub2RlVmFsdWUgPSAnbXMtaWYnXG5cdCAgICAgICAgICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChjb21tZW50LCBkb20pXG5cdCAgICAgICAgICAgICAgICAgICAgdmRvbS5ub2RlVHlwZSA9IDhcblx0ICAgICAgICAgICAgICAgICAgICB2ZG9tLmNvbW1lbnQgPSBjb21tZW50XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9KVxuXG5cblxuLyoqKi8gfSxcbi8qIDYwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblxuXHR2YXIgcmZvclByZWZpeCA9IC9tcy1mb3JcXDpcXHMqL1xuXHR2YXIgcmZvckxlZnQgPSAvXlxccypcXChcXHMqL1xuXHR2YXIgcmZvclJpZ2h0ID0gL1xccypcXClcXHMqJC9cblx0dmFyIHJmb3JTcGxpdCA9IC9cXHMqLFxccyovXG5cdHZhciByZm9yQXMgPSAvXFxzK2FzXFxzKyhbJFxcd10rKS9cblx0dmFyIHJpZGVudCA9IC9eWyRhLXpBLVpfXVskYS16QS1aMC05X10qJC9cblx0dmFyIHJpbnZhbGlkID0gL14obnVsbHx1bmRlZmluZWR8TmFOfHdpbmRvd3x0aGlzfFxcJGluZGV4fFxcJGlkKSQvXG5cdHZhciByZWNvbmNpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KVxuXHR2YXIgc3RyaW5naWZ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MClcblxuXHQvL3ZhciBDYWNoZSA9IHJlcXVpcmUoJy4uL3NlZWQvY2FjaGUnKVxuXHQvL3ZhciBjYWNoZSA9IG5ldyBDYWNoZSgzMTIpXG5cblxuXHRmdW5jdGlvbiBnZXRUcmFjZUtleShpdGVtKSB7XG5cdCAgICB2YXIgdHlwZSA9IHR5cGVvZiBpdGVtXG5cdCAgICByZXR1cm4gaXRlbSAmJiB0eXBlID09PSAnb2JqZWN0JyA/IGl0ZW0uJGhhc2hjb2RlIDogdHlwZSArICc6JyArIGl0ZW1cblx0fVxuXHQvL0lFNi04LGZ1bmN0aW9u5ZCO6Z2i5rKh5pyJ56m65qC8XG5cdHZhciByZnVuY3Rpb24gPSAvXlxccypmdW5jdGlvblxccypcXCgoW15cXCldKylcXCkvXG5cdGF2YWxvbi5fZWFjaCA9IGZ1bmN0aW9uIChvYmosIGZuLCBsb2NhbCwgdm5vZGVzKSB7XG5cdCAgICB2YXIgcmVwZWF0ID0gW11cblx0ICAgIHZub2Rlcy5wdXNoKHJlcGVhdClcblx0ICAgIHZhciBzdHIgPSAoZm4gKyBcIlwiKS5tYXRjaChyZnVuY3Rpb24pXG5cdCAgICB2YXIgYXJncyA9IHN0clsxXVxuXHQgICAgdmFyIGFyciA9IGFyZ3MubWF0Y2goYXZhbG9uLnJ3b3JkKVxuXHQgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIGl0ZXJhdG9yKGksIG9ialtpXSwgbG9jYWwsIGZuLCBhcnJbMF0sIGFyclsxXSwgcmVwZWF0LCB0cnVlKVxuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiBvYmopIHtcblx0ICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHQgICAgICAgICAgICAgICAgaXRlcmF0b3IoaSwgb2JqW2ldLCBsb2NhbCwgZm4sIGFyclswXSwgYXJyWzFdLCByZXBlYXQpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBpdGVyYXRvcihpbmRleCwgaXRlbSwgdmFycywgZm4sIGsxLCBrMiwgcmVwZWF0LCBpc0FycmF5KSB7XG5cdCAgICB2YXIga2V5ID0gaXNBcnJheSA/IGdldFRyYWNlS2V5KGl0ZW0pIDogaW5kZXhcblx0ICAgIHZhciBsb2NhbCA9IHt9XG5cdCAgICBsb2NhbFtrMV0gPSBpbmRleFxuXHQgICAgbG9jYWxbazJdID0gaXRlbVxuXHQgICAgZm9yICh2YXIgayBpbiB2YXJzKSB7XG5cdCAgICAgICAgaWYgKCEoayBpbiBsb2NhbCkpIHtcblx0ICAgICAgICAgICAgbG9jYWxba10gPSB2YXJzW2tdXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgZm4oaW5kZXgsIGl0ZW0sIGtleSwgbG9jYWwsIHJlcGVhdClcblx0fVxuXG5cblx0YXZhbG9uLmRpcmVjdGl2ZSgnZm9yJywge1xuXHQgICAgcHJpb3JpdHk6IDMsXG5cdCAgICBwYXJzZTogZnVuY3Rpb24gKGNvcHksIHNyYywgYmluZGluZykge1xuXHQgICAgICAgIHZhciBzdHIgPSBzcmMubm9kZVZhbHVlLCBhbGlhc0FzXG5cdCAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UocmZvckFzLCBmdW5jdGlvbiAoYSwgYikge1xuXHQgICAgICAgICAgICBpZiAoIXJpZGVudC50ZXN0KGIpIHx8IHJpbnZhbGlkLnRlc3QoYikpIHtcblx0ICAgICAgICAgICAgICAgIGF2YWxvbi5lcnJvcignYWxpYXMgJyArIGIgKyAnIGlzIGludmFsaWQgLS0tIG11c3QgYmUgYSB2YWxpZCBKUyBpZGVudGlmaWVyIHdoaWNoIGlzIG5vdCBhIHJlc2VydmVkIG5hbWUuJylcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGFsaWFzQXMgPSBiXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuICcnXG5cdCAgICAgICAgfSlcblxuXHQgICAgICAgIHZhciBhcnIgPSBzdHIucmVwbGFjZShyZm9yUHJlZml4LCAnJykuc3BsaXQoJyBpbiAnKVxuXHQgICAgICAgIHZhciBhc3NpZ24gPSAndmFyIGxvb3AgPSAnICsgYXZhbG9uLnBhcnNlRXhwcihhcnJbMV0pICsgJyBcXG4nXG5cdCAgICAgICAgdmFyIGFsaWFzID0gYWxpYXNBcyA/ICd2YXIgJyArIGFsaWFzQXMgKyAnID0gbG9vcFxcbicgOiAnJ1xuXHQgICAgICAgIHZhciBrdiA9IGFyclswXS5yZXBsYWNlKHJmb3JMZWZ0LCAnJykucmVwbGFjZShyZm9yUmlnaHQsICcnKS5zcGxpdChyZm9yU3BsaXQpXG5cblx0ICAgICAgICBpZiAoa3YubGVuZ3RoID09PSAxKSB7Ly/noa7kv51hdmFsb24uX2VhY2jnmoTlm57osIPmnInkuInkuKrlj4LmlbBcblx0ICAgICAgICAgICAga3YudW5zaGlmdCgnJGtleScpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGt2LnB1c2goJ3RyYWNlS2V5Jylcblx0ICAgICAgICBrdi5wdXNoKCdfX2xvY2FsX18nKVxuXHQgICAgICAgIGt2LnB1c2goJ3Zub2RlcycpXG5cdCAgICAgICAgc3JjLiRhcHBlbmQgPSBhc3NpZ24gKyBhbGlhcyArICdhdmFsb24uX2VhY2gobG9vcCxmdW5jdGlvbignXG5cdCAgICAgICAgICAgICAgICArIGt2LmpvaW4oJywgJykgKyAnKXtcXG4nXG5cdCAgICAgICAgICAgICAgICArIChhbGlhc0FzID8gJ19fbG9jYWxfX1snICsgYXZhbG9uLnF1b3RlKGFsaWFzQXMpICsgJ109bG9vcFxcbicgOiAnJylcblxuXHQgICAgfSxcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIGNwTGlzdCwgc3BMaXN0LCBpbmRleCkge1xuXHQgICAgICAgIC8v5bCGY3VyUmVwZWF06L2s5o2i5oiQ5LiA5Liq5Liq5Y+v5Lul5q+U6L6D55qEY29tcG9uZW50LOW5tuaxguW+l2NvbXBhcmVUZXh0XG5cdCAgICAgICAgdmFyIHByZVJlcGVhdCA9IHNwTGlzdFtpbmRleCArIDFdXG5cdCAgICAgICAgdmFyIGN1clBlcGVhdCA9IGNwTGlzdFtpbmRleCArIDFdXG5cdCAgICAgICAgdmFyIGVuZCA9IHNwTGlzdFtpbmRleCArIDJdXG5cdCAgICAgICAgLy9wcmVSZXBlYXTkuI3kuLrnqbrml7Zcblx0ICAgICAgICBzcmMucHJlUmVwZWF0ID0gcHJlUmVwZWF0XG5cdCAgICAgICAgdmFyIGNhY2hlID0gc3JjLmNhY2hlXG5cblx0ICAgICAgICBpZiAoY2FjaGUgJiYgc3JjID09PSBjb3B5KSB7XG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH1cblx0ICAgICAgICAvL+WwhuW+queOr+WMuuWfn+i9rOaNouS4uuS4gOS4quS4que7hOS7tlxuXHQgICAgICAgIHZhciBjb21zID0gcHJlcGFyZUNvbXBhcmUoY3VyUGVwZWF0LCBjb3B5KVxuXHQgICAgICAgIGlmIChjYWNoZSAmJiBzcmMuY29tcGFyZVRleHQgPT09IGNvcHkuY29tcGFyZVRleHQpIHtcblx0ICAgICAgICAgICAgLy/lpoLmnpzkuKrmlbDkuI5rZXnkuIDoh7Qs6YKj5LmI6K+05piO5q2k5pWw57uE5rKh5pyJ5Y+R55Sf5o6S5bqPLOeri+WNs+i/lOWbnlxuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB9XG5cblxuXHQgICAgICAgIHNyYy5jb21wYXJlVGV4dCA9IGNvcHkuY29tcGFyZVRleHRcblx0ICAgICAgICAvL2ZvcuaMh+S7pOWPquWBmua3u+WKoOWIoOmZpOaTjeS9nFxuXG5cdCAgICAgICAgdmFyIGksIGMsIHBcblx0ICAgICAgICB2YXIgcmVtb3ZlcyA9IFtdXG5cdCAgICAgICAgaWYgKCFwcmVSZXBlYXQubGVuZ3RoKSB7Ly/kuIDnu7TmlbDnu4TmnIDlvIDlp4vliJ3lp4vljJbml7Zcblx0ICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cblx0ICAgICAgICAgICAgY2FjaGUgPSB7fVxuXHQgICAgICAgICAgICBzcmMuY29tcyA9IGNvbXNcblx0ICAgICAgICAgICAgc3BMaXN0W2luZGV4ICsgMV0gPSBjdXJQZXBlYXRcblx0ICAgICAgICAgICAgZm9yIChpID0gMDsgYyA9IGNvbXNbaV07IGkrKykge1xuXHQgICAgICAgICAgICAgICAgYy5hY3Rpb24gPSAnZW50ZXInXG5cdCAgICAgICAgICAgICAgICBzYXZlSW5DYWNoZShjYWNoZSwgYylcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHNyYy5jYWNoZSA9IGNhY2hlXG5cdCAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uZC1hc3NpZ24gKi9cblx0ICAgICAgICB9IGVsc2UgaWYgKCFjYWNoZSkgey8v5LqM57u05pWw57uE5pyA5byA5aeL5Yid5aeL5YyW5pe2XG5cdCAgICAgICAgICAgIHZhciBjYWNoZSA9IHt9XG5cdCAgICAgICAgICAgIHNyYy5jb21zID0gY29tc1xuXHQgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29tcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgc2F2ZUluQ2FjaGUoY2FjaGUsIGNvbXNbaV0pXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgc3JjLmNhY2hlID0gY2FjaGVcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdmFyIG5ld0NhY2hlID0ge31cblx0ICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cblx0ICAgICAgICAgICAgdmFyIGZ1enp5ID0gW11cblx0ICAgICAgICAgICAgZm9yIChpID0gMDsgYyA9IGNvbXNbaSsrXTsgKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcCA9IGlzSW5DYWNoZShjYWNoZSwgYy5rZXkpXG5cdCAgICAgICAgICAgICAgICBpZiAocCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHAuYWN0aW9uID0gJ21vdmUnXG5cdCAgICAgICAgICAgICAgICAgICAgcC5vbGRJbmRleCA9IHAuaW5kZXhcblx0ICAgICAgICAgICAgICAgICAgICBwLmluZGV4ID0gYy5pbmRleFxuXHQgICAgICAgICAgICAgICAgICAgIHNhdmVJbkNhY2hlKG5ld0NhY2hlLCBwKVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAvL+WmguaenOaJvuS4jeWIsOWwsei/m+ihjOaooeeziuaQnOe0olxuXHQgICAgICAgICAgICAgICAgICAgIGZ1enp5LnB1c2goYylcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICghc3JjLmNvbXMpIHtcblx0ICAgICAgICAgICAgICAgIHNyYy5jb21zID0gcHJlcGFyZUNvbXBhcmUocHJlUmVwZWF0LCBzcmMpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGM7IGMgPSBmdXp6eVtpKytdOyApIHtcblx0ICAgICAgICAgICAgICAgIHAgPSBmdXp6eU1hdGNoQ2FjaGUoY2FjaGUsIGMua2V5KVxuXHQgICAgICAgICAgICAgICAgaWYgKHApIHtcblx0ICAgICAgICAgICAgICAgICAgICBwLmFjdGlvbiA9ICdtb3ZlJ1xuXHQgICAgICAgICAgICAgICAgICAgIHAub2xkSW5kZXggPSBwLmluZGV4XG5cdCAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGMuaW5kZXhcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcCA9IGNcblx0ICAgICAgICAgICAgICAgICAgICBwLmFjdGlvbiA9ICdlbnRlcidcblx0ICAgICAgICAgICAgICAgICAgICBzcmMuY29tcy5wdXNoKHApXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBzYXZlSW5DYWNoZShuZXdDYWNoZSwgcClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBzcmMuY29tcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXhcblx0ICAgICAgICAgICAgfSlcblxuXHQgICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG5cdCAgICAgICAgICAgIHNyYy5jYWNoZSA9IG5ld0NhY2hlXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY2FjaGUpIHtcblx0ICAgICAgICAgICAgICAgIHAgPSBjYWNoZVtpXVxuXHQgICAgICAgICAgICAgICAgcC5hY3Rpb24gPSAnbGVhdmUnXG5cdCAgICAgICAgICAgICAgICByZW1vdmVzLnB1c2gocClcblx0ICAgICAgICAgICAgICAgIGlmIChwLmFycikge1xuXHQgICAgICAgICAgICAgICAgICAgIHAuYXJyLmZvckVhY2goZnVuY3Rpb24gKG0pIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbS5hY3Rpb24gPSAnbGVhdmUnXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZXMucHVzaChtKVxuXHQgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHAuYXJyXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgIH1cblx0ICAgICAgICBzcmMucmVtb3ZlcyA9IHJlbW92ZXNcblx0ICAgICAgICB2YXIgY2IgPSBhdmFsb24uY2FjaGVzW3NyYy53aWRdXG5cdCAgICAgICAgdmFyIHZtID0gY29weS52bW9kZWxcblx0ICAgICAgICBpZiAoZW5kICYmIGNiKSB7XG5cdCAgICAgICAgICAgIGVuZC5hZnRlckNoYW5nZSA9IFtmdW5jdGlvbiAoZG9tKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2IuY2FsbCh2bSwge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncmVuZGVyZWQnLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGRvbSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlOiBzcmMuc2lnbmF0dXJlXG5cdCAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIH1dXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUpXG5cdCAgICAgICAgcmV0dXJuIHRydWVcblxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSwgcGFyZW50KSB7XG5cdCAgICAgICAgdmFyIGtleSA9IHZkb20uc2lnbmF0dXJlXG5cdCAgICAgICAgdmFyIHJhbmdlID0gZ2V0RW5kUmVwZWF0KGRvbSlcblx0ICAgICAgICB2YXIgZG9tcyA9IHJhbmdlLnNsaWNlKDEsIC0xKS8vXG5cdCAgICAgICAgcmFuZ2UucG9wKClcblx0ICAgICAgICB2YXIgRE9NcyA9IHNwbGl0RE9Ncyhkb21zLCBrZXkpXG5cblx0ICAgICAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gdmRvbS5yZW1vdmVzW2krK107ICkge1xuXHQgICAgICAgICAgICB2YXIgcmVtb3ZlTm9kZXMgPSBET01zW2VsLmluZGV4XVxuXHQgICAgICAgICAgICBpZiAocmVtb3ZlTm9kZXMpIHtcblx0ICAgICAgICAgICAgICAgIHJlbW92ZU5vZGVzLmZvckVhY2goZnVuY3Rpb24gKG4sIGspIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAobi5wYXJlbnROb2RlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGF2YWxvbi5hcHBseUVmZmVjdChuLCBlbC5jaGlsZHJlbltrXSwge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9vazogJ29uTGVhdmVEb25lJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG4pXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhZ2dlcktleToga2V5ICsgJ2xlYXZlJ1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICBlbC5jaGlsZHJlbi5sZW5ndGggPSAwXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmRvbS5yZW1vdmVzID0gW11cblx0ICAgICAgICB2YXIgaW5zZXJ0UG9pbnQgPSBkb21cblx0ICAgICAgICB2YXIgZnJhZ21lbnQgPSBhdmFsb24uYXZhbG9uRnJhZ21lbnRcblx0ICAgICAgICB2YXIgZG9tVGVtcGxhdGVcblx0ICAgICAgICB2YXIga2VlcCA9IFtdXG5cblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZkb20uY29tcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICB2YXIgY29tID0gdmRvbS5jb21zW2ldXG5cdCAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGNvbS5jaGlsZHJlblxuXG5cdCAgICAgICAgICAgIGlmIChjb20uYWN0aW9uID09PSAnbGVhdmUnKSB7XG5cdCAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAga2VlcC5wdXNoKGNvbSlcblx0ICAgICAgICAgICAgaWYgKGNvbS5hY3Rpb24gPT09ICdlbnRlcicpIHtcblx0Ly8gICAgICAgICAgICAgICAgaWYgKCFkb21UZW1wbGF0ZSkge1xuXHQvLyAgICAgICAgICAgICAgICAgICAgLy/liJvlu7rnlKjkuo7mi7fotJ3nmoTmlbDmja4s5YyF5ous6Jma5oufRE9N5LiO55yf5a6eRE9NIFxuXHQvLyAgICAgICAgICAgICAgICAgIGRvbVRlbXBsYXRlID0gYXZhbG9uLnZkb21BZGFwdG9yKGNoaWxkcmVuLCAndG9ET00nKVxuXHQvLyAgICAgICAgICAgICAgICB9XG5cdC8vICAgICAgICAgICAgICAgIHZhciBuZXdGcmFnbWVudCA9IGRvbVRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKVxuXHQgICAgICAgICAgICAgICAgdmFyIG5ld0ZyYWdtZW50ID0gYXZhbG9uLnZkb21BZGFwdG9yKGNoaWxkcmVuLCAndG9ET00nKVxuXHQgICAgICAgICAgICAgICAgdmFyIGNub2RlcyA9IGF2YWxvbi5zbGljZShuZXdGcmFnbWVudC5jaGlsZE5vZGVzKVxuXHQgICAgICAgICAgICAgICAgcmVjb25jaWxlKGNub2RlcywgY2hpbGRyZW4sIHBhcmVudCkvL+WFs+iBlOaWsOeahOiZmuaLn0RPTeS4juecn+WunkRPTVxuXHQgICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShuZXdGcmFnbWVudCwgaW5zZXJ0UG9pbnQubmV4dFNpYmxpbmcpXG5cdCAgICAgICAgICAgICAgICBhcHBseUVmZmVjdHMoY25vZGVzLCBjaGlsZHJlbiwge1xuXHQgICAgICAgICAgICAgICAgICAgIGhvb2s6ICdvbkVudGVyRG9uZScsXG5cdCAgICAgICAgICAgICAgICAgICAgc3RhZ2dlcktleToga2V5ICsgJ2VudGVyJ1xuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChjb20uYWN0aW9uID09PSAnbW92ZScpIHtcblxuXHQgICAgICAgICAgICAgICAgdmFyIGNub2RlcyA9IERPTXNbY29tLm9sZEluZGV4XSB8fCBbXVxuXHQgICAgICAgICAgICAgICAgaWYgKGNvbS5pbmRleCAhPT0gY29tLm9sZEluZGV4KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmVGcmFnbWVudCA9IGZyYWdtZW50LmNsb25lTm9kZShmYWxzZSlcblx0ICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMCwgY2M7IGNjID0gY25vZGVzW2srK107ICkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlRnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2MpXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobW92ZUZyYWdtZW50LCBpbnNlcnRQb2ludC5uZXh0U2libGluZylcblx0ICAgICAgICAgICAgICAgICAgICAvLyByZWNvbmNpbGUoY25vZGVzLCBjaGlsZHJlbiwgcGFyZW50KVxuXHQgICAgICAgICAgICAgICAgICAgIGFwcGx5RWZmZWN0cyhjbm9kZXMsIGNoaWxkcmVuLCB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGhvb2s6ICdvbk1vdmVEb25lJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhZ2dlcktleToga2V5ICsgJ21vdmUnXG5cdCAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIGluc2VydFBvaW50ID0gY25vZGVzW2Nub2Rlcy5sZW5ndGggLSAxXVxuXG5cdCAgICAgICAgICAgIGlmICghaW5zZXJ0UG9pbnQpIHtcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2ZG9tLnByZVJlcGVhdC5sZW5ndGggPSAwXG5cdCAgICAgICAgdmRvbS5jb21zLmxlbmd0aCA9IDBcblx0ICAgICAgICBrZWVwLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG5cdCAgICAgICAgICAgIHZkb20uY29tcy5wdXNoKGVsKVxuXHQgICAgICAgICAgICByYW5nZS5wdXNoLmFwcGx5KHZkb20ucHJlUmVwZWF0LCBlbC5jaGlsZHJlbilcblx0ICAgICAgICB9KVxuXG5cdCAgICB9XG5cblx0fSlcblxuXHRmdW5jdGlvbiBpc0VtcHR5T2JqZWN0KGEpIHtcblx0ICAgIGZvciAodmFyIGkgaW4gYSkge1xuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRydWVcblx0fVxuXHRmdW5jdGlvbiBzcGxpdERPTXMobm9kZXMsIHNpZ25hdHVyZSkge1xuXHQgICAgdmFyIGl0ZW1zID0gW11cblx0ICAgIHZhciBpdGVtID0gW11cblx0ICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSBub2Rlc1tpKytdOyApIHtcblx0ICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IDggJiYgZWwubm9kZVZhbHVlID09PSBzaWduYXR1cmUpIHtcblx0ICAgICAgICAgICAgaXRlbS5wdXNoKGVsKVxuXHQgICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pXG5cdCAgICAgICAgICAgIGl0ZW0gPSBbXVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGl0ZW0ucHVzaChlbClcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gaXRlbXNcblx0fVxuXG5cdC8v5bCG6KaB5b6q546v55qE6IqC54K55qC55o2u6ZSa54K55YWD57Sg5YaN5YiG5oiQ5LiA5Liq5Liq5pu05aSn55qE5Y2V5YWDLOeUqOS6jmRpZmZcblx0ZnVuY3Rpb24gcHJlcGFyZUNvbXBhcmUobm9kZXMsIGN1cikge1xuXHQgICAgdmFyIHNwbGl0VGV4dCA9IGN1ci5zaWduYXR1cmVcblx0ICAgIHZhciBpdGVtcyA9IFtdXG5cdCAgICB2YXIga2V5cyA9IFtdXG5cdCAgICB2YXIgY29tID0ge1xuXHQgICAgICAgIGNoaWxkcmVuOiBbXVxuXHQgICAgfVxuXG5cdCAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gbm9kZXNbaV07IGkrKykge1xuXHQgICAgICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gOCAmJiBlbC5ub2RlVmFsdWUgPT09IHNwbGl0VGV4dCkge1xuXHQgICAgICAgICAgICBjb20uY2hpbGRyZW4ucHVzaChlbClcblx0ICAgICAgICAgICAgY29tLmtleSA9IGVsLmtleVxuXHQgICAgICAgICAgICBrZXlzLnB1c2goZWwua2V5KVxuXHQgICAgICAgICAgICBjb20uaW5kZXggPSBpdGVtcy5sZW5ndGhcblx0ICAgICAgICAgICAgaXRlbXMucHVzaChjb20pXG5cdCAgICAgICAgICAgIGNvbSA9IHtcblx0ICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgY29tLmNoaWxkcmVuLnB1c2goZWwpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBjdXIuY29tcGFyZVRleHQgPSBrZXlzLmxlbmd0aCArICd8JyArIGtleXMuam9pbignOzsnKVxuXHQgICAgcmV0dXJuIGl0ZW1zXG5cdH1cblxuXG5cdGZ1bmN0aW9uIGdldEVuZFJlcGVhdChub2RlKSB7XG5cdCAgICB2YXIgaXNCcmVhayA9IDAsIHJldCA9IFtdXG5cdCAgICB3aGlsZSAobm9kZSkge1xuXHQgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSA4KSB7XG5cdCAgICAgICAgICAgIGlmIChub2RlLm5vZGVWYWx1ZS5pbmRleE9mKCdtcy1mb3I6JykgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgICsraXNCcmVha1xuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVZhbHVlLmluZGV4T2YoJ21zLWZvci1lbmQ6JykgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgIC0taXNCcmVha1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldC5wdXNoKG5vZGUpXG5cdCAgICAgICAgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmdcblx0ICAgICAgICBpZiAoaXNCcmVhayA9PT0gMCkge1xuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiByZXRcblx0fVxuXG5cblx0dmFyIHJmdXp6eSA9IC9eKHN0cmluZ3xudW1iZXJ8Ym9vbGVhbikvXG5cdHZhciBya2Z1enp5ID0gL15fKihzdHJpbmd8bnVtYmVyfGJvb2xlYW4pL1xuXHRmdW5jdGlvbiBmdXp6eU1hdGNoQ2FjaGUoY2FjaGUsIGlkKSB7XG5cdCAgICB2YXIgbSA9IGlkLm1hdGNoKHJmdXp6eSlcblx0ICAgIGlmIChtKSB7XG5cdCAgICAgICAgdmFyIGZpZCA9IG1bMV1cblx0ICAgICAgICBmb3IgKHZhciBpIGluIGNhY2hlKSB7XG5cdCAgICAgICAgICAgIHZhciBuID0gaS5tYXRjaChya2Z1enp5KVxuXHQgICAgICAgICAgICBpZiAobiAmJiBuWzFdID09PSBmaWQpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBpc0luQ2FjaGUoY2FjaGUsIGkpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHQvLyDmlrDkvY3nva46IOaXp+S9jee9rlxuXHRmdW5jdGlvbiBpc0luQ2FjaGUoY2FjaGUsIGlkKSB7XG5cdCAgICB2YXIgYyA9IGNhY2hlW2lkXVxuXHQgICAgaWYgKGMpIHtcblx0ICAgICAgICB2YXIgYXJyID0gYy5hcnJcblx0ICAgICAgICBpZiAoYXJyKSB7XG5cdCAgICAgICAgICAgIHZhciByID0gYXJyLnBvcCgpXG5cdCAgICAgICAgICAgIGlmICghYXJyLmxlbmd0aCkge1xuXHQgICAgICAgICAgICAgICAgYy5hcnIgPSAwXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIHJcblx0ICAgICAgICB9XG5cdCAgICAgICAgZGVsZXRlIGNhY2hlW2lkXVxuXHQgICAgICAgIHJldHVybiBjXG5cdCAgICB9XG5cdH1cblx0Ly9bMSwxLDFdIG51bWJlcjEgbnVtYmVyMV8gbnVtYmVyMV9fXG5cdGZ1bmN0aW9uIHNhdmVJbkNhY2hlKGNhY2hlLCBjb21wb25lbnQpIHtcblx0ICAgIHZhciB0cmFja0lkID0gY29tcG9uZW50LmtleVxuXHQgICAgaWYgKCFjYWNoZVt0cmFja0lkXSkge1xuXHQgICAgICAgIGNhY2hlW3RyYWNrSWRdID0gY29tcG9uZW50XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZhciBjID0gY2FjaGVbdHJhY2tJZF1cblx0ICAgICAgICB2YXIgYXJyID0gYy5hcnIgfHwgKGMuYXJyID0gW10pXG5cdCAgICAgICAgYXJyLnB1c2goY29tcG9uZW50KVxuXHQgICAgfVxuXHR9XG5cdHZhciBhcHBseUVmZmVjdHMgPSBmdW5jdGlvbiAobm9kZXMsIHZub2Rlcywgb3B0cykge1xuXHQgICAgdm5vZGVzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG5cdCAgICAgICAgYXZhbG9uLmFwcGx5RWZmZWN0KG5vZGVzW2ldLCB2bm9kZXNbaV0sIG9wdHMpXG5cdCAgICB9KVxuXHR9XG5cblxuXG4vKioqLyB9LFxuLyogNjEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXHR2YXIgcmVjb25jaWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSlcblx0dmFyIHRyeUluaXRDb21wb25lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYyKVxuXG5cdGF2YWxvbi5jb21wb25lbnQgPSBmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXHQgICAgLy/ov5nmmK/lrprkuYnnu4Tku7bnmoTliIbmlK8s5bm25bCG5YiX6Zif5Lit55qE5ZCM57G75Z6L5a+56LGh56e76ZmkXG5cdCAgICBpZiAoIWF2YWxvbi5jb21wb25lbnRzW25hbWVdKSB7XG5cdCAgICAgICAgYXZhbG9uLmNvbXBvbmVudHNbbmFtZV0gPSBkZWZpbml0aW9uXG5cdCAgICB9Ly/ov5nph4zmsqHmnInov5Tlm57lgLxcblx0fVxuXHRhdmFsb24uZGlyZWN0aXZlKCd3aWRnZXQnLCB7XG5cdCAgICBwcmlvcml0eTogNCxcblx0ICAgIHBhcnNlOiBmdW5jdGlvbiAoY29weSwgc3JjLCBiaW5kaW5nKSB7XG5cdCAgICAgICAgc3JjLnByb3BzLndpZCA9IHNyYy5wcm9wcy53aWQgfHwgYXZhbG9uLm1ha2VIYXNoQ29kZSgndycpXG5cdCAgICAgICAgLy/lsIbmuLLmn5Plh73mlbDnmoTmn5DkuIDpg6jliIblrZjotbfmnaUs5riy5ZyoY+aWueazleS4rei9rOaNouS4uuWHveaVsFxuXHQgICAgICAgIGNvcHlbYmluZGluZy5uYW1lXSA9IGF2YWxvbi5wYXJzZUV4cHIoYmluZGluZylcblx0ICAgICAgICBjb3B5LnRlbXBsYXRlID0gc3JjLnRlbXBsYXRlXG5cdCAgICAgICAgY29weS52bW9kZWwgPSAnX192bW9kZWxfXydcblx0ICAgICAgICBjb3B5LmxvY2FsID0gJ19fbG9jYWxfXydcblx0ICAgIH0sXG5cdCAgICBkZWZpbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gYXZhbG9uLm1lZGlhdG9yRmFjdG9yeS5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdCAgICB9LFxuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSwgY29weUxpc3QsIHNyY0xpc3QsIGluZGV4KSB7XG5cdCAgICAgICAgdmFyIGEgPSBjb3B5W25hbWVdXG5cblx0ICAgICAgICBpZiAoT2JqZWN0KGEpID09PSBhKSB7XG5cdCAgICAgICAgICAgIC8v5pyJ5LiJ5Liq5Zyw5pa55Y+v5Lul6K6+572uaXMsIOWxnuaApyzmoIfnrb7lkI0s6YWN572u5a+56LGhXG5cblx0ICAgICAgICAgICAgdmFyIGlzID0gc3JjLnByb3BzLmlzIHx8ICgvXm1zXFwtLy50ZXN0KHNyYy50eXBlKSA/IHNyYy50eXBlIDogMClcblxuXHQgICAgICAgICAgICBpZiAoIWlzKSB7Ly/lvIDlp4vlpKfotLnlkajnq6DlnLDojrflj5bnu4Tku7bnmoTnsbvlnotcblx0ICAgICAgICAgICAgICAgIGEgPSBhLiRtb2RlbCB8fCBhLy/lronlhajnmoTpgY3ljoZWQnNjcmlwdFxuXHQgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHsvL+i9rOaNouaIkOWvueixoVxuXHQgICAgICAgICAgICAgICAgICAgIGEudW5zaGlmdCh7fSkvLyDpmLLmraLmsaHmn5Pml6fmlbDmja5cblx0ICAgICAgICAgICAgICAgICAgICBhdmFsb24ubWl4LmFwcGx5KDAsIGEpXG5cdCAgICAgICAgICAgICAgICAgICAgYSA9IGEuc2hpZnQoKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaXMgPSBhLmlzXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIHZtTmFtZSA9ICdjb21wb25lbnQtdm06JyArIGlzXG5cblx0ICAgICAgICAgICAgc3JjLnByb3BzLmlzID0gaXNcblx0ICAgICAgICAgICAgc3JjLnZtb2RlbCA9IGNvcHkudm1vZGVsXG5cdCAgICAgICAgICAgIC8v5aaC5p6c57uE5Lu25rKh5pyJ5Yid5aeL5YyWLOmCo+S5iOWFiOWIneWni+WMlijnlJ/miJDlr7nlupTnmoR2bSwkcmVuZGVyKVxuXHQgICAgICAgICAgICBpZiAoIXNyY1t2bU5hbWVdKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRyeUluaXRDb21wb25lbnQoc3JjLCBjb3B5W25hbWVdLCBjb3B5LmxvY2FsLCBjb3B5LnRlbXBsYXRlKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8v5pu/5o2i5oiQ5rOo6YeK6IqC54K5XG5cdCAgICAgICAgICAgICAgICAgICAgc3JjLm5vZGVUeXBlID0gOFxuXHQgICAgICAgICAgICAgICAgICAgIHNyYy5ub2RlVmFsdWUgPSAndW5yZXNvbHZlZCBjb21wb25lbnQgcGxhY2Vob2xkZXInXG5cdCAgICAgICAgICAgICAgICAgICAgY29weUxpc3RbaW5kZXhdID0gc3JjXG5cblx0ICAgICAgICAgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLm1vdW50Q29tbWVudClcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8v5aaC5p6c5bey57uP5a2Y5Zyo5LqOYXZhbG9uLnNjb3Blc1xuXHQgICAgICAgICAgICB2YXIgY29tVm0gPSBzcmNbdm1OYW1lXVxuXHQgICAgICAgICAgICB2YXIgc2NvcGUgPSBhdmFsb24uc2NvcGVzW2NvbVZtLiRpZF1cblx0ICAgICAgICAgICAgaWYgKHNjb3BlICYmIHNjb3BlLnZtb2RlbCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGNvbSA9IHNjb3BlLnZtb2RlbC4kZWxlbWVudFxuXHQgICAgICAgICAgICAgICAgaWYgKHNyYy5kb20gIT09IGNvbSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBjb20udnRyZWVbMF1cblx0ICAgICAgICAgICAgICAgICAgICBzcmNMaXN0W2luZGV4XSA9IGNvcHlMaXN0W2luZGV4XSA9IGNvbXBvbmVudFxuXHQgICAgICAgICAgICAgICAgICAgIHNyYy5jb20gPSBjb21cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5za2lwQ29udGVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuc2tpcENvbnRlbnQgPSAnb3B0aW1pemUnXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMucmVwbGFjZUNhY2hlZENvbXBvbmVudClcblx0ICAgICAgICAgICAgICAgICAgICB1cGRhdGUoY29tcG9uZW50LCBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuc2tpcENvbnRlbnQgPT09ICdvcHRpbWl6ZScpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5za2lwQ29udGVudCA9IHRydWVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIH0sICdhZnRlckNoYW5nZScpXG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIHJlbmRlciA9IGNvbVZtLiRyZW5kZXJcblx0ICAgICAgICAgICAgdmFyIHRyZWUgPSByZW5kZXIoY29tVm0sIGNvcHkubG9jYWwpXG5cdCAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSB0cmVlWzBdXG5cdCAgICAgICAgICAgIGlmIChjb21wb25lbnQgJiYgaXNDb21wb25lbnRSZWFkeShjb21wb25lbnQpKSB7XG5cdCAgICAgICAgICAgICAgICBjb21wb25lbnQubG9jYWwgPSBjb3B5LmxvY2FsXG5cdCAgICAgICAgICAgICAgICBzcmMuZHluYW1pYyA9IHRydWVcblx0ICAgICAgICAgICAgICAgIEFycmF5KFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB2bU5hbWUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdjb21wb25lbnQtaHRtbDonICsgaXMsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdjb21wb25lbnQtcmVhZHk6JyArIGlzLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnZG9tJywgJ2R5bmFtaWMnXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFtuYW1lXSA9IHNyY1tuYW1lXVxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIGNvbXBvbmVudC52bW9kZWwgPSBjb21WbVxuXHQgICAgICAgICAgICAgICAgY29weUxpc3RbaW5kZXhdID0gY29tcG9uZW50XG5cdCAgICAgICAgICAgICAgICBpZiAoc3JjLm5vZGVUeXBlID09PSA4ICYmIHNyYy5jb21tZW50KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmRvbSA9IHNyYy5jb21tZW50XG5cdCAgICAgICAgICAgICAgICAgICAgc3JjLnR5cGUgPSAnI2NvbW1lbnQnXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoc3JjLnR5cGUgIT09IGNvbXBvbmVudC50eXBlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3JjTGlzdFtpbmRleF0gPSBjb21wb25lbnRcblx0ICAgICAgICAgICAgICAgICAgICB1cGRhdGUoY29tcG9uZW50LCB0aGlzLm1vdW50Q29tcG9uZW50KVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZUNvbXBvbmVudClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHNyYy5ub2RlVHlwZSA9IDhcblx0ICAgICAgICAgICAgICAgIHNyYy5ub2RlVmFsdWUgPSAndW5yZXNvbHZlZCBjb21wb25lbnQgcGxhY2Vob2xkZXInXG5cdCAgICAgICAgICAgICAgICBjb3B5TGlzdFtpbmRleF0gPSBzcmNcblx0ICAgICAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMubW91bnRDb21tZW50KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgaWYgKHNyYy5wcm9wcy5pcyA9PT0gY29weS5wcm9wcy5pcykge1xuXHQgICAgICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGVDb21wb25lbnQpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgcmVwbGFjZUNhY2hlZENvbXBvbmVudDogZnVuY3Rpb24gKGRvbSwgdmRvbSwgcGFyZW50KSB7XG5cdCAgICAgICAgdmFyIGNvbSA9IHZkb20uY29tXG5cdCAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChjb20sIGRvbSlcblx0ICAgICAgICBkZWxldGUgdmRvbS5jb21cblx0ICAgIH0sXG5cdCAgICBtb3VudENvbW1lbnQ6IGZ1bmN0aW9uIChkb20sIHZkb20sIHBhcmVudCkge1xuXHQgICAgICAgIHZhciBjb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh2ZG9tLm5vZGVWYWx1ZSlcblx0ICAgICAgICB2ZG9tLmRvbSA9IGNvbW1lbnRcblx0ICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGNvbW1lbnQsIGRvbSlcblx0ICAgIH0sXG5cdCAgICB1cGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChkb20sIHZkb20pIHtcblx0ICAgICAgICB2YXIgdm0gPSB2ZG9tW1wiY29tcG9uZW50LXZtOlwiICsgdmRvbS5wcm9wcy5pc11cblx0ICAgICAgICB2YXIgdmlld0NoYW5nZU9ic2VydmVycyA9IHZtLiRldmVudHMub25WaWV3Q2hhbmdlXG5cdCAgICAgICAgaWYgKHZpZXdDaGFuZ2VPYnNlcnZlcnMgJiYgdmlld0NoYW5nZU9ic2VydmVycy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgdXBkYXRlKHZkb20sIHZpZXdDaGFuZ2VIYW5kbGUsICdhZnRlckNoYW5nZScpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIG1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoZG9tLCB2ZG9tLCBwYXJlbnQpIHtcblx0ICAgICAgICB2YXIgY29tID0gYXZhbG9uLnZkb21BZGFwdG9yKHZkb20sICd0b0RPTScpXG5cdCAgICAgICAgdmFyIGlzID0gdmRvbS5wcm9wcy5pc1xuXHQgICAgICAgIHZhciB2bSA9IHZkb21bJ2NvbXBvbmVudC12bTonICsgaXNdXG5cdCAgICAgICAgdm0uJGZpcmUoJ29uSW5pdCcsIHtcblx0ICAgICAgICAgICAgdHlwZTogJ2luaXQnLFxuXHQgICAgICAgICAgICB2bW9kZWw6IHZtLFxuXHQgICAgICAgICAgICBpczogaXNcblx0ICAgICAgICB9KVxuXHQgICAgICAgIHJlY29uY2lsZShbY29tXSwgW3Zkb21dKVxuXHQgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoY29tLCBkb20pXG5cdCAgICAgICAgdmRvbS5kb20gPSB2bS4kZWxlbWVudCA9IGNvbVxuXHQgICAgICAgIGNvbS52dHJlZSA9IFt2ZG9tXVxuXHQgICAgICAgIGF2YWxvbi5vbkNvbXBvbmVudERpc3Bvc2UoY29tKVxuXHQgICAgICAgIHZkb21bJ2NvbXBvbmVudC1yZWFkeTonICsgaXNdID0gdHJ1ZVxuXHQgICAgICAgIC8vLS0tLS0tLS0tLS0tLS1cblx0ICAgICAgICBhdmFsb24uc2NvcGVzW3ZtLiRpZF0gPSB7XG5cdCAgICAgICAgICAgIHZtb2RlbDogdm0sXG5cdCAgICAgICAgICAgIHRvcDogdmRvbS52bW9kZWwsXG5cdCAgICAgICAgICAgIGxvY2FsOiB2ZG9tLmxvY2FsXG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8vLS0tLS0tLS0tLS0tLS1cblx0ICAgICAgICB1cGRhdGUodmRvbSwgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2bS4kZmlyZSgnb25SZWFkeScsIHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6ICdyZWFkeScsXG5cdCAgICAgICAgICAgICAgICB0YXJnZXQ6IGNvbSxcblx0ICAgICAgICAgICAgICAgIHZtb2RlbDogdm0sXG5cdCAgICAgICAgICAgICAgICBpczogaXNcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICB9LCAnYWZ0ZXJDaGFuZ2UnKVxuXG5cdCAgICAgICAgdXBkYXRlKHZkb20sIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmRvbVsgJ2NvbXBvbmVudC1odG1sOicgKyBpc10gPSBhdmFsb24udmRvbUFkYXB0b3IodmRvbSwgJ3RvSFRNTCcpXG5cdCAgICAgICAgfSwgJ2FmdGVyQ2hhbmdlJylcblx0ICAgIH1cblx0fSlcblxuXG5cblx0ZnVuY3Rpb24gdmlld0NoYW5nZUhhbmRsZShkb20sIHZkb20pIHtcblx0ICAgIHZhciBpcyA9IHZkb20ucHJvcHMuaXNcblx0ICAgIHZhciB2bSA9IHZkb21bJ2NvbXBvbmVudC12bTonICsgaXNdXG5cdCAgICB2YXIgaHRtbCA9ICdjb21wb25lbnQtaHRtbDonICsgaXNcblx0ICAgIHZhciBwcmVIVE1MID0gdmRvbVtodG1sXVxuXHQgICAgdmFyIGN1ckhUTUwgPSBhdmFsb24udmRvbUFkYXB0b3IodmRvbSwgJ3RvSFRNTCcpXG5cdCAgICBpZiAocHJlSFRNTCAhPT0gY3VySFRNTCkge1xuXHQgICAgICAgIHZkb21baHRtbF0gPSBjdXJIVE1MXG5cdCAgICAgICAgdm0uJGZpcmUoJ29uVmlld0NoYW5nZScsIHtcblx0ICAgICAgICAgICAgdHlwZTogJ3ZpZXdjaGFuZ2UnLFxuXHQgICAgICAgICAgICB0YXJnZXQ6IGRvbSxcblx0ICAgICAgICAgICAgdm1vZGVsOiB2bSxcblx0ICAgICAgICAgICAgaXM6IGlzXG5cdCAgICAgICAgfSlcblx0ICAgIH1cblx0fVxuXG5cblxuXHRmdW5jdGlvbiBpc0NvbXBvbmVudFJlYWR5KHZub2RlKSB7XG5cdCAgICB2YXIgaXNSZWFkeSA9IHRydWVcblx0ICAgIHRyeSB7XG5cdCAgICAgICAgaGFzVW5yZXNvbHZlZENvbXBvbmVudCh2bm9kZSlcblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICBpc1JlYWR5ID0gZmFsc2Vcblx0ICAgIH1cblx0ICAgIHJldHVybiBpc1JlYWR5XG5cdH1cblxuXHRmdW5jdGlvbiBoYXNVbnJlc29sdmVkQ29tcG9uZW50KHZub2RlKSB7XG5cdCAgICB2bm9kZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gOCkge1xuXHQgICAgICAgICAgICBpZiAoZWwubm9kZVZhbHVlID09PSAndW5yZXNvbHZlZCBjb21wb25lbnQgcGxhY2Vob2xkZXInKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyAndW5yZXNvbHZlZCdcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSBpZiAoZWwuY2hpbGRyZW4pIHtcblx0ICAgICAgICAgICAgaGFzVW5yZXNvbHZlZENvbXBvbmVudChlbClcblx0ICAgICAgICB9XG5cdCAgICB9KVxuXHR9XG5cbi8qKiovIH0sXG4vKiA2MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHNraXBBcnJheSA9IF9fd2VicGFja19yZXF1aXJlX18oNjMpXG5cblx0dmFyIGxlZ2FsVGFncyA9IHt3YnI6IDEsIHhtcDogMSwgdGVtcGxhdGU6IDF9XG5cdHZhciBldmVudHMgPSAnb25Jbml0LG9uUmVhZHksb25WaWV3Q2hhbmdlLG9uRGlzcG9zZSdcblx0dmFyIGNvbXBvbmVudEV2ZW50cyA9IGF2YWxvbi5vbmVPYmplY3QoZXZlbnRzKVxuXHR2YXIgaW1tdW5pdHkgPSBldmVudHMuc3BsaXQoJywnKS5jb25jYXQoJ2lzJywgJ2RlZmluZScpXG5cdHZhciBvbmNlV2FybiA9IHRydWVcblx0ZnVuY3Rpb24gaW5pdENvbXBvbmVudChzcmMsIHJhd09wdGlvbiwgbG9jYWwsIHRlbXBsYXRlKSB7XG5cdCAgICB2YXIgdGFnID0gc3JjLnR5cGVcblx0ICAgIHZhciBpcyA9IHNyYy5wcm9wcy5pc1xuXHQgICAgLy/liKTlrprnlKjmiLfkvKDlhaXnmoTmoIfnrb7lkI3mmK/lkKbnrKblkIjop4TmoLxcblx0ICAgIGlmICghbGVnYWxUYWdzW3RhZ10gJiYgIWlzQ3VzdG9tVGFnKHRhZykpIHtcblx0ICAgICAgICBhdmFsb24ud2Fybih0YWcgKyAn5LiN5ZCI6YCC5YGa57uE5Lu255qE5qCH562+Jylcblx0ICAgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIC8v5byA5aeL5Yid5aeL5YyW57uE5Lu2XG5cdCAgICB2YXIgaG9va3MgPSB7fVxuXHQgICAgLy/nlKjmiLflj6rog73mk43kvZzpobblsYJWTVxuXHQgICAgLy/lj6rmnIkkaWQsaXPnmoTlr7nosaHlsLHmmK9lbXB0eU9wdGlvblxuXHQgICAgaWYgKCFyYXdPcHRpb24pIHtcblx0ICAgICAgICBvcHRpb25zID0gW11cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdmFyIG9wdGlvbnMgPSBbXS5jb25jYXQocmF3T3B0aW9uKVxuXHQgICAgICAgIG9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgICAgICBpZiAoYSAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcblx0ICAgICAgICAgICAgICAgIG1peGluSG9va3MoaG9va3MsIChhLiRtb2RlbCB8fCBhKSwgdHJ1ZSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pXG5cdCAgICB9XG5cdCAgICB2YXIgZGVmaW5pdGlvbiA9IGF2YWxvbi5jb21wb25lbnRzW2lzXVxuXHQgICAgLy/lpoLmnpzov57nu4Tku7bnmoTlrprkuYnpg73msqHmnInliqDovb3lm57mnaUs5bqU6K+l56uL5Y2z6L+U5ZueIFxuXHQgICAgaWYgKCFkZWZpbml0aW9uKSB7XG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgXG5cblx0ICAgIC8v5b6X5Yiw57uE5Lu25Zyo6aG25bGCdm3nmoTphY3nva7lr7nosaHlkI1cblx0ICAgIGlmICghaG9va3MuJGlkICYmIG9uY2VXYXJuKSB7XG5cdCAgICAgICAgYXZhbG9uLndhcm4oJ3dhcm5pbmchJywgaXMsICfnu4Tku7bmnIDlpb3lnKhtcy13aWRnZXTphY3nva7lr7nosaHkuK3mjIflrprlhajlsYDkuI3ph43lpI3nmoQkaWTku6Xmj5Dpq5jmgKfog70hXFxuJyxcblx0ICAgICAgICAgICAgICAgICfoi6XlnKhtcy1mb3Llvqrnjq/kuK3lj6/ku6XliKnnlKggKCRpbmRleCxlbCkgaW4gQGFycmF5IOS4reeahCRpbmRleOaLvOWGmeS9oOeahCRpZFxcbicsXG5cdCAgICAgICAgICAgICAgICAn5aaCIG1zLXdpZGdldD1cIntpczpcXCdtcy1idXR0b25cXCcsJGlkOlxcJ2J0blxcJyskaW5kZXh9XCInXG5cdCAgICAgICAgICAgICAgICApXG5cdCAgICAgICAgb25jZVdhcm4gPSBmYWxzZVxuXHQgICAgfVxuXHQgICAgdmFyIGRlZmluZSA9IGhvb2tzLmRlZmluZVxuXHQgICAgZGVmaW5lID0gZGVmaW5lIHx8IGF2YWxvbi5kaXJlY3RpdmVzLndpZGdldC5kZWZpbmVcblx0ICAgIC8v55Sf5oiQ57uE5Lu2Vk1cblx0ICAgIHZhciAkaWQgPSBob29rcy4kaWQgfHwgc3JjLnByb3BzLndpZCB8fCAndycgKyAobmV3IERhdGUgLSAwKVxuXHQgICAgdmFyIGRlZmF1bHRzID0gYXZhbG9uLm1peCh0cnVlLCB7fSwgZGVmaW5pdGlvbi5kZWZhdWx0cylcblx0ICAgIG1peGluSG9va3MoIGhvb2tzLCBkZWZhdWx0cywgZmFsc2UpLy9zcmMudm1vZGVsLFxuXHQgICAgdmFyIHNraXBQcm9wcyA9IGltbXVuaXR5LmNvbmNhdCgpXG5cdCAgICBmdW5jdGlvbiBzd2VlcGVyKGEsIGIpIHtcblx0ICAgICAgICBza2lwUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuXHQgICAgICAgICAgICBkZWxldGUgYVtrXVxuXHQgICAgICAgICAgICBkZWxldGUgYltrXVxuXHQgICAgICAgIH0pXG5cdCAgICB9XG5cblx0ICAgIHN3ZWVwZXIuaXNXaWRnZXQgPSB0cnVlXG5cdCAgICB2YXIgdm1vZGVsID0gZGVmaW5lLmFwcGx5KHN3ZWVwZXIsIFtzcmMudm1vZGVsLGRlZmF1bHRzXS5jb25jYXQob3B0aW9ucykpXG5cdCAgICBpZiAoIWF2YWxvbi5tb2Rlcm4pIHsvL+WinuW8uuWvuUlF55qE5YW85a65XG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiB2bW9kZWwpIHtcblx0ICAgICAgICAgICAgaWYgKCFza2lwQXJyYXlbaV0gJiYgdHlwZW9mIHZtb2RlbFtpXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdm1vZGVsW2ldID0gdm1vZGVsW2ldLmJpbmQodm1vZGVsKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICBcblx0ICAgIHZtb2RlbC4kaWQgPSAkaWRcblx0ICAgIGF2YWxvbi52bW9kZWxzWyRpZF0gPSB2bW9kZWxcblxuXHQgICAgLy/nu5Hlrprnu4Tku7bnmoTnlJ/lkb3lkajmnJ/pkqnlrZBcblx0ICAgIGZvciAodmFyIGUgaW4gY29tcG9uZW50RXZlbnRzKSB7XG5cdCAgICAgICAgaWYgKGhvb2tzW2VdKSB7XG5cdCAgICAgICAgICAgIGhvb2tzW2VdLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG5cdCAgICAgICAgICAgICAgICB2bW9kZWwuJHdhdGNoKGUsIGZuKVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgLy8g55Sf5oiQ5aSW6YOo55qE5riy5p+T5Ye95pWwXG5cdCAgICAvLyB0ZW1wbGF0ZeS/neWtmOedgOacgOWOn+Wni+eahOe7hOS7tuWuueWZqOS/oeaBr1xuXHQgICAgLy8g5oiR5Lus5YWI5bCG5a6D6L2s5o2i5oiQ6Jma5oufRE9NLOWmguaenOaYr3htcCwgdGVtcGxhdGUsXG5cdCAgICAvLyDlroPku6zlhoXpg6jmmK/kuIDkuKrnuq/mlofmnKzoioLngrksIOmcgOimgee7p+e7rei9rOaNouS4uuiZmuaLn0RPTVxuXHQgICAgdmFyIHNoZWxsID0gYXZhbG9uLmxleGVyKHRlbXBsYXRlKVxuXHQgICAgdmFyIHNoZWxsUm9vdCA9IHNoZWxsWzBdXG5cdCAgICB2YXIgc2MgPSBzaGVsbFJvb3QuY2hpbGRyZW5cblx0ICAgIGlmIChzYyAmJiBzYy5sZW5ndGggPT09IDEgJiYgc2NbMF0ubm9kZVZhbHVlKSB7XG5cdCAgICAgICAgc2hlbGxSb290LmNoaWxkcmVuID0gYXZhbG9uLmxleGVyKHNjWzBdLm5vZGVWYWx1ZSlcblx0ICAgIH1cblxuXHQgICAgZGVsZXRlIHNoZWxsUm9vdC5pc1ZvaWRUYWdcblx0ICAgIGRlbGV0ZSBzaGVsbFJvb3QudGVtcGxhdGVcblx0ICAgIGRlbGV0ZSBzaGVsbFJvb3Quc2tpcENvbnRlbnRcblx0ICAgIGRlbGV0ZSBzaGVsbFJvb3QucHJvcHNbJ21zLXdpZGdldCddXG5cdCAgICBzaGVsbFJvb3QudHlwZSA9ICdjaGVuZzcnXG5cdCAgICBzaGVsbFJvb3QuY2hpbGRyZW4gPSBzaGVsbFJvb3QuY2hpbGRyZW4gfHwgW11cblx0ICAgIHNoZWxsUm9vdC5wcm9wcy5pcyA9IGlzXG5cdCAgICBzaGVsbFJvb3QucHJvcHMud2lkID0gJGlkXG5cdCAgICBhdmFsb24uc3BlZWRVcChzaGVsbClcblx0ICAgIHZhciByZW5kZXIgPSBhdmFsb24ucmVuZGVyKHNoZWxsLCBsb2NhbClcblx0ICAgIFxuXHQgICAgLy/nlJ/miJDlhoXpg6jnmoTmuLLmn5Plh73mlbBcblx0ICAgIHZhciBmaW5hbFRlbXBsYXRlID0gZGVmaW5pdGlvbi50ZW1wbGF0ZS50cmltKClcblx0ICAgIGlmICh0eXBlb2YgZGVmaW5pdGlvbi5nZXRUZW1wbGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIGZpbmFsVGVtcGxhdGUgPSBkZWZpbml0aW9uLmdldFRlbXBsYXRlKHZtb2RlbCwgZmluYWxUZW1wbGF0ZSlcblx0ICAgIH1cblx0ICAgIHZhciB2dHJlZSA9IGF2YWxvbi5sZXhlcihmaW5hbFRlbXBsYXRlKVxuXG5cdCAgICBpZiAodnRyZWUubGVuZ3RoID4gMSkge1xuXHQgICAgICAgIGF2YWxvbi5lcnJvcign57uE5Lu25b+F6aG755So5LiA5Liq5YWD57Sg5YyF6LW35p2lJylcblx0ICAgIH1cblx0ICAgIHZhciBzb2xlU2xvdCA9IGRlZmluaXRpb24uc29sZVNsb3Rcblx0ICAgIHJlcGxhY2VTbG90KHZ0cmVlLCBzb2xlU2xvdClcblx0ICAgIGF2YWxvbi5zcGVlZFVwKHZ0cmVlKVxuXG5cdCAgICB2YXIgcmVuZGVyMiA9IGF2YWxvbi5yZW5kZXIodnRyZWUpXG5cblx0ICAgIC8v55Sf5oiQ5pyA57uI55qE57uE5Lu25riy5p+T5Ye95pWwXG5cdCAgICB2YXIgc3RyID0gZm5UZW1wbGF0ZSArICcnXG5cdCAgICB2YXIgenp6enogPSBzb2xlU2xvdCA/IGF2YWxvbi5xdW90ZShzb2xlU2xvdCkgOiBcIm51bGxcIlxuXHQgICAgc3RyID0gc3RyLlxuXHQgICAgICAgICAgICByZXBsYWNlKCdYWFhYWCcsIHN0cmluZ2lmeUFub255bW91cyhyZW5kZXIpKS5cblx0ICAgICAgICAgICAgcmVwbGFjZSgnWVlZWVknLCBzdHJpbmdpZnlBbm9ueW1vdXMocmVuZGVyMikpLlxuXHQgICAgICAgICAgICByZXBsYWNlKCdaWlpaWicsIHp6enp6KVxuXG5cdCAgICB2YXIgYmVnaW4gPSBzdHIuaW5kZXhPZigneycpICsgMVxuXHQgICAgdmFyIGVuZCA9IHN0ci5sYXN0SW5kZXhPZihcIn1cIilcblxuXHQgICAgdmFyIGxhc3RGbiA9IEZ1bmN0aW9uKCd2bScsICdsb2NhbCcsIHN0ci5zbGljZShiZWdpbiwgZW5kKSlcblx0ICAgIHZtb2RlbC4kcmVuZGVyID0gbGFzdEZuXG5cdCAgICBzcmNbJ2NvbXBvbmVudC12bTonICsgaXNdID0gdm1vZGVsXG5cblx0ICAgIHJldHVybiAgdm1vZGVsLiRyZW5kZXIgPSBsYXN0Rm5cblxuXHR9XG5cdG1vZHVsZS5leHBvcnRzID0gaW5pdENvbXBvbmVudFxuXG5cdGZ1bmN0aW9uIHN0cmluZ2lmeUFub255bW91cyhmbikge1xuXHQgICAgcmV0dXJuIGZuLnRvU3RyaW5nKCkucmVwbGFjZSgnYW5vbnltb3VzJywgJycpXG5cdCAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMqXFwvXFwqXFwqXFwvL2csICcnKVxuXHR9XG5cblxuXHRmdW5jdGlvbiBmblRlbXBsYXRlKCkge1xuXHQgICAgdmFyIHNoZWxsID0gKFhYWFhYKSh2bSwgbG9jYWwpO1xuXHQgICAgdmFyIHNoZWxsUm9vdCA9IHNoZWxsWzBdXG5cdCAgICB2YXIgdnRyZWUgPSAoWVlZWVkpKHZtLCBsb2NhbCk7XG5cdCAgICB2YXIgY29tcG9uZW50ID0gdnRyZWVbMF1cblxuXHQgICAgLy/lpITnkIZkaWZmXG5cdCAgICB2YXIgb3JkZXJVbmlxID0ge31cblx0ICAgXG5cdCAgICBTdHJpbmcoJ21zLXdpZGdldCwnK3NoZWxsUm9vdC5vcmRlciArICcsJyArIGNvbXBvbmVudC5vcmRlcikuXG5cdCAgICAgICAgICAgIHJlcGxhY2UoYXZhbG9uLnJ3b3JkLCBmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGEgIT09ICd1bmRlZmluZWQnKVxuXHQgICAgICAgICAgICAgICAgICAgIG9yZGVyVW5pcVthXSA9IGFcblx0ICAgICAgICAgICAgfSlcblxuXHQgICAgc2hlbGxSb290Lm9yZGVyID0gT2JqZWN0LmtleXMob3JkZXJVbmlxKS5qb2luKCcsJylcblxuXHQgICAgZm9yICh2YXIgaSBpbiBzaGVsbFJvb3QpIHtcblx0ICAgICAgICBpZiAoaSAhPT0gJ2NoaWxkcmVuJyAmJiBpICE9PSAndHlwZScpIHtcblx0ICAgICAgICAgICAgaWYgKGkgPT09ICdwcm9wcycpIHtcblx0ICAgICAgICAgICAgICAgIGF2YWxvbi5taXgoY29tcG9uZW50LnByb3BzLCBzaGVsbFJvb3QucHJvcHMpXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBjb21wb25lbnRbaV0gPSBzaGVsbFJvb3RbaV1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXG5cdCAgICB2YXIgc29sZVNsb3QgPSBaWlpaWlxuXHQgICAgdmFyIHNsb3RzID0gYXZhbG9uLmNvbGxlY3RTbG90cyhzaGVsbFJvb3QsIHNvbGVTbG90KVxuXHQgICAgaWYgKHNvbGVTbG90ICYmICghc2xvdHNbc29sZVNsb3RdIHx8ICFzbG90c1tzb2xlU2xvdF0ubGVuZ3RoKSkge1xuXHQgICAgICAgIHNsb3RzW3NvbGVTbG90XSA9IFt7XG5cdCAgICAgICAgICAgICAgICBub2RlVHlwZTogMyxcblx0ICAgICAgICAgICAgICAgIHR5cGU6ICcjdGV4dCcsXG5cdCAgICAgICAgICAgICAgICBub2RlVmFsdWU6IHZtW3NvbGVTbG90XSxcblx0ICAgICAgICAgICAgICAgIGR5bmFtaWM6IHRydWVcblx0ICAgICAgICAgICAgfV1cblx0ICAgIH1cblx0ICAgIGF2YWxvbi5pbnNlcnRTbG90cyh2dHJlZSwgc2xvdHMpXG5cblx0ICAgIGRlbGV0ZSBjb21wb25lbnQuc2tpcEF0dHJzXG5cdCAgICBkZWxldGUgY29tcG9uZW50LnNraXBDb250ZW50XG5cdCAgICByZXR1cm4gdnRyZWVcblxuXHR9XG5cblx0ZnVuY3Rpb24gcmVwbGFjZVNsb3QodnRyZWUsIHNsb3ROYW1lKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gdnRyZWVbaV07IGkrKykge1xuXHQgICAgICAgIGlmIChlbC50eXBlID09PSAnc2xvdCcpIHtcblx0ICAgICAgICAgICAgdnRyZWUuc3BsaWNlKGksIDEsIHtcblx0ICAgICAgICAgICAgICAgIHR5cGU6ICcjY29tbWVudCcsXG5cdCAgICAgICAgICAgICAgICBub2RlVmFsdWU6ICdzbG90OicgKyAoZWwucHJvcHMubmFtZSB8fCBzbG90TmFtZSksXG5cdCAgICAgICAgICAgICAgICBub2RlVHlwZTogOCxcblx0ICAgICAgICAgICAgICAgIGR5bmFtaWM6IChlbC5wcm9wcy5uYW1lIHx8IHNsb3ROYW1lKVxuXHQgICAgICAgICAgICB9LCB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiAnI2NvbW1lbnQnLFxuXHQgICAgICAgICAgICAgICAgbm9kZVZhbHVlOiAnc2xvdC1lbmQ6Jyxcblx0ICAgICAgICAgICAgICAgIG5vZGVUeXBlOiA4XG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIGkrK1xuXHQgICAgICAgIH0gZWxzZSBpZiAoZWwubm9kZVR5cGUgPT09IDEgJiYgZWwuY2hpbGRyZW4pIHtcblx0ICAgICAgICAgICAgcmVwbGFjZVNsb3QoZWwuY2hpbGRyZW4sIHNsb3ROYW1lKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdGF2YWxvbi5pbnNlcnRTbG90cyA9IGZ1bmN0aW9uICh2dHJlZSwgc2xvdHMpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSB2dHJlZVtpXTsgaSsrKSB7XG5cdCAgICAgICAgaWYgKGVsLm5vZGVUeXBlID09PSA4ICYmIHNsb3RzW2VsLmR5bmFtaWNdKSB7XG5cdCAgICAgICAgICAgIHZhciBhcmdzID0gW2kgKyAxLCAwXS5jb25jYXQoc2xvdHNbZWwuZHluYW1pY10pXG5cdCAgICAgICAgICAgIHZ0cmVlLnNwbGljZS5hcHBseSh2dHJlZSwgYXJncylcblx0ICAgICAgICAgICAgaSArPSBzbG90c1tlbC5keW5hbWljXS5sZW5ndGhcblx0ICAgICAgICB9IGVsc2UgaWYgKGVsLm5vZGVUeXBlID09PSAxICYmIGVsLmNoaWxkcmVuKSB7XG5cdCAgICAgICAgICAgIGF2YWxvbi5pbnNlcnRTbG90cyhlbC5jaGlsZHJlbiwgc2xvdHMpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0YXZhbG9uLmNvbGxlY3RTbG90cyA9IGZ1bmN0aW9uIChub2RlLCBzb2xlU2xvdCkge1xuXHQgICAgdmFyIHNsb3RzID0ge31cblx0ICAgIGlmIChzb2xlU2xvdCkge1xuXHQgICAgICAgIHNsb3RzW3NvbGVTbG90XSA9IG5vZGUuY2hpbGRyZW5cblx0ICAgICAgICBzbG90cy5fX3NvbGVfXyA9IHNvbGVTbG90XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoZWwsIGkpIHtcblx0ICAgICAgICAgICAgaWYgKGVsLm5vZGVUeXBlID09PSAxKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGVsLnByb3BzLnNsb3Rcblx0ICAgICAgICAgICAgICAgIGlmIChuYW1lKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gZGVsZXRlIGVsLnByb3BzLnNsb3Rcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzbG90c1tuYW1lXSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc2xvdHNbbmFtZV0ucHVzaChlbClcblx0ICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzbG90c1tuYW1lXSA9IFtlbF1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAoZWwuZHluYW1pYyA9PT0gJ2ZvcicgJiYgL3Nsb3Q9WydcIl0oXFx3KykvLnRlc3QoZWwudGVtcGxhdGUpKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYSA9IFJlZ0V4cC4kMVxuXHQgICAgICAgICAgICAgICAgc2xvdHNbYV0gPSBub2RlLmNoaWxkcmVuLnNsaWNlKGksIGkgKyAyKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSlcblx0ICAgIH1cblx0ICAgIHJldHVybiBzbG90c1xuXHR9XG5cblxuXHQvL+W/hemhu+S7peWtl+avjeW8gOWktCznu5PlsL7ku6XlrZfmr43miJbmlbDlrZfnu5PmnZ8s5Lit6Ze06Iez5bCR5Ye6546w5LiA5qyhXCItXCIsXG5cdC8v5bm25LiU5LiN6IO95aSn5YaZ5a2X5q+NLOeJueauiuespuWPtyxcIl9cIixcIiRcIizmsYnlrZdcblx0dmFyIHJjdXN0b21UYWcgPSAvXlthLXpdKFthLXpcXGRdK1xcLSkrW2EtelxcZF0rJC9cblxuXHRmdW5jdGlvbiBpc0N1c3RvbVRhZyh0eXBlKSB7XG5cdCAgICByZXR1cm4gcmN1c3RvbVRhZy50ZXN0KHR5cGUpIHx8IGF2YWxvbi5jb21wb25lbnRzW3R5cGVdXG5cdH1cblxuXHRmdW5jdGlvbiBtaXhpbkhvb2tzKHRhcmdldCwgb3B0aW9uLCBvdmVyd3JpdGUpIHtcblx0ICAgIGZvciAodmFyIGsgaW4gb3B0aW9uKSB7XG5cdCAgICAgICAgdmFyIHYgPSBvcHRpb25ba11cblx0ICAgICAgICAvL+WmguaenOaYr+eUn+WRveWRqOacn+mSqeWtkCzmgLvmmK/kuI3mlq3mlLbpm4Zcblx0ICAgICAgICBpZiAoY29tcG9uZW50RXZlbnRzW2tdKSB7XG5cdCAgICAgICAgICAgIGlmIChrIGluIHRhcmdldCkge1xuXHQgICAgICAgICAgICAgICAgdGFyZ2V0W2tdLnB1c2godilcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRhcmdldFtrXSA9IFtvcHRpb25ba11dXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG5cdCAgICAgICAgICAgICAgICB0YXJnZXRba10gPSB2XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuLyoqKi8gfSxcbi8qIDYzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogXG5cdCQkc2tpcEFycmF5OuaYr+ezu+e7n+e6p+mAmueUqOeahOS4jeWPr+ebkeWQrOWxnuaAp1xuXHQkc2tpcEFycmF5OiDmmK/lvZPliY3lr7nosaHnibnmnInnmoTkuI3lj6/nm5HlkKzlsZ7mgKdcblxuXHQg5LiN5ZCM54K55pivXG5cdCAkJHNraXBBcnJheeiiq2hhc093blByb3BlcnR55ZCO6L+U5ZueZmFsc2Vcblx0ICRza2lwQXJyYXnooqtoYXNPd25Qcm9wZXJ0eeWQjui/lOWbnnRydWVcblx0ICovXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdmFsb24ub25lT2JqZWN0KCckaWQsJHJlbmRlciwkdHJhY2ssJGVsZW1lbnQsJHdhdGNoLCRmaXJlLCRldmVudHMsJG1vZGVsLCRza2lwQXJyYXksJGFjY2Vzc29ycywkaGFzaGNvZGUsJHJ1biwkd2FpdCxfX3Byb3h5X18sX19kYXRhX18sX19jb25zdF9fJylcblxuLyoqKi8gfSxcbi8qIDY0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgc3VwcG9ydCA9IF9fd2VicGFja19yZXF1aXJlX18oNjUpXG5cdHZhciBDYWNoZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpXG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ2VmZmVjdCcsIHtcblx0ICAgIHByaW9yaXR5OiA1LFxuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSkge1xuXHQgICAgICAgIHZhciBjb3B5T2JqID0gY29weVtuYW1lXVxuXHQgICAgICAgIGNvcHlPYmogPSBjb3B5LiRtb2RlbCB8fCBjb3B5T2JqXG5cdCAgICAgICAgaWYgKHR5cGVvZiBjb3B5T2JqID09PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICB2YXIgaXMgPSBjb3B5T2JqXG5cdCAgICAgICAgICAgIGNvcHlPYmogPSB7XG5cdCAgICAgICAgICAgICAgICBpczogaXNcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvcHlPYmopKSB7XG5cdCAgICAgICAgICAgIGNvcHlPYmogPSBhdmFsb24ubWl4LmFwcGx5KHt9LCBjb3B5T2JqKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGNvcHlPYmouYWN0aW9uID0gY29weU9iai5hY3Rpb24gfHwgJ2VudGVyJ1xuXG5cdCAgICAgICAgaWYgKE9iamVjdChjb3B5T2JqKSA9PT0gY29weU9iaikge1xuXHQgICAgICAgICAgICBpZiAoY29weSA9PT0gc3JjIHx8IGRpZmZPYmooY29weU9iaiwgc3JjW25hbWVdIHx8IHt9KSkge1xuXHQgICAgICAgICAgICAgICAgc3JjW25hbWVdID0gY29weU9ialxuXHQgICAgICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUsICdhZnRlckNoYW5nZScpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGNvcHkgIT09IHNyYykge1xuXHQgICAgICAgICAgICBkZWxldGUgY29weVtuYW1lXVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uIChkb20sIHZub2RlLCBwYXJlbnQsIG9wdGlvbikge1xuXHQgICAgICAgIGlmIChkb20uYW5pbWF0aW5nKSB7XG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH1cblx0ICAgICAgICBkb20uYW5pbWF0aW5nID0gdHJ1ZVxuXHQgICAgICAgIHZhciBsb2NhbGVPcHRpb24gPSB2bm9kZVsnbXMtZWZmZWN0J11cblx0ICAgICAgICB2YXIgdHlwZSA9IGxvY2FsZU9wdGlvbi5pc1xuXHQgICAgICAgIG9wdGlvbiA9IG9wdGlvbiB8fCB7fVxuXHQgICAgICAgIGlmICghdHlwZSkgey8v5aaC5p6c5rKh5pyJ5oyH5a6a57G75Z6LXG5cdCAgICAgICAgICAgIHJldHVybiBhdmFsb24ud2FybignbmVlZCBpcyBvcHRpb24nKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBlZmZlY3RzID0gYXZhbG9uLmVmZmVjdHNcblx0ICAgICAgICBpZiAoc3VwcG9ydC5jc3MgJiYgIWVmZmVjdHNbdHlwZV0pIHtcblx0ICAgICAgICAgICAgYXZhbG9uLmVmZmVjdCh0eXBlLCB7fSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGdsb2JhbE9wdGlvbiA9IGVmZmVjdHNbdHlwZV1cblx0ICAgICAgICBpZiAoIWdsb2JhbE9wdGlvbikgey8v5aaC5p6c5rKh5pyJ5a6a5LmJ54m55pWIXG5cdCAgICAgICAgICAgIHJldHVybiBhdmFsb24ud2Fybih0eXBlICsgJyBlZmZlY3QgaXMgdW5kZWZpbmVkJylcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGFjdGlvbiA9IG9wdGlvbi5hY3Rpb24gfHwgbG9jYWxlT3B0aW9uLmFjdGlvblxuXHQgICAgICAgIHZhciBFZmZlY3QgPSBhdmFsb24uRWZmZWN0XG5cdCAgICAgICAgaWYgKHR5cGVvZiBFZmZlY3QucHJvdG90eXBlW2FjdGlvbl0gIT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGF2YWxvbi53YXJuKGFjdGlvbiArICcgYWN0aW9uIGlzIHVuZGVmaW5lZCcpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBlZmZlY3QgPSBuZXcgRWZmZWN0KGRvbSlcblx0ICAgICAgICB2YXIgZmluYWxPcHRpb24gPSBhdmFsb24ubWl4KG9wdGlvbiwgZ2xvYmFsT3B0aW9uLCBsb2NhbGVPcHRpb24pXG5cdCAgICAgICAgaWYgKGZpbmFsT3B0aW9uLnF1ZXVlKSB7XG5cdCAgICAgICAgICAgIGFuaW1hdGlvblF1ZXVlLnB1c2goZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgZWZmZWN0W2FjdGlvbl0oZmluYWxPcHRpb24pXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIGNhbGxOZXh0QW5pbWF0aW9uKClcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIGVmZmVjdFthY3Rpb25dKGZpbmFsT3B0aW9uKVxuXHQgICAgICAgICAgICB9LCA0KVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fSlcblx0ZnVuY3Rpb24gZGlmZk9iaihhLCBiKSB7XG5cdCAgICBmb3IgKHZhciBpIGluIGEpIHtcblx0ICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSlcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWVcblx0ICAgIH1cblx0ICAgIHJldHVybiBmYWxzZVxuXHR9XG5cblx0dmFyIGFuaW1hdGlvblF1ZXVlID0gW11cblx0ZnVuY3Rpb24gY2FsbE5leHRBbmltYXRpb24oKSB7XG5cdCAgICBpZiAoYW5pbWF0aW9uUXVldWUubG9jaylcblx0ICAgICAgICByZXR1cm5cblx0ICAgIHZhciBmbiA9IGFuaW1hdGlvblF1ZXVlWzBdXG5cdCAgICBpZiAoZm4pIHtcblx0ICAgICAgICBjYWxsTmV4dEFuaW1hdGlvbi5sb2NrID0gdHJ1ZVxuXHQgICAgICAgIGZuKClcblx0ICAgIH1cblx0fVxuXG5cdGF2YWxvbi5lZmZlY3RzID0ge31cblx0Ly/ov5nph4zlrprkuYlDU1PliqjnlLtcblxuXG5cdGF2YWxvbi5lZmZlY3QgPSBmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuXHQgICAgYXZhbG9uLmVmZmVjdHNbbmFtZV0gPSBkZWZpbml0aW9uIHx8IHt9XG5cdCAgICBpZiAoc3VwcG9ydC5jc3MpIHtcblx0ICAgICAgICBpZiAoIWRlZmluaXRpb24uZW50ZXJDbGFzcykge1xuXHQgICAgICAgICAgICBkZWZpbml0aW9uLmVudGVyQ2xhc3MgPSBuYW1lICsgJy1lbnRlcidcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCFkZWZpbml0aW9uLmVudGVyQWN0aXZlQ2xhc3MpIHtcblx0ICAgICAgICAgICAgZGVmaW5pdGlvbi5lbnRlckFjdGl2ZUNsYXNzID0gZGVmaW5pdGlvbi5lbnRlckNsYXNzICsgJy1hY3RpdmUnXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghZGVmaW5pdGlvbi5sZWF2ZUNsYXNzKSB7XG5cdCAgICAgICAgICAgIGRlZmluaXRpb24ubGVhdmVDbGFzcyA9IG5hbWUgKyAnLWxlYXZlJ1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoIWRlZmluaXRpb24ubGVhdmVBY3RpdmVDbGFzcykge1xuXHQgICAgICAgICAgICBkZWZpbml0aW9uLmxlYXZlQWN0aXZlQ2xhc3MgPSBkZWZpbml0aW9uLmxlYXZlQ2xhc3MgKyAnLWFjdGl2ZSdcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBpZiAoIWRlZmluaXRpb24uYWN0aW9uKSB7XG5cdCAgICAgICAgZGVmaW5pdGlvbi5hY3Rpb24gPSAnZW50ZXInXG5cdCAgICB9XG5cdH1cblxuXG5cdHZhciBFZmZlY3QgPSBmdW5jdGlvbiAoZWwpIHtcblx0ICAgIHRoaXMuZWwgPSBlbFxuXHR9XG5cdGF2YWxvbi5FZmZlY3QgPSBFZmZlY3Rcblx0RWZmZWN0LnByb3RvdHlwZSA9IHtcblx0ICAgIGVudGVyOiBjcmVhdGVBY3Rpb24oJ0VudGVyJyksXG5cdCAgICBsZWF2ZTogY3JlYXRlQWN0aW9uKCdMZWF2ZScpLFxuXHQgICAgbW92ZTogY3JlYXRlQWN0aW9uKCdNb3ZlJylcblx0fVxuXG5cdHZhciByc2Vjb25kID0gL1xcZCtzJC9cblx0ZnVuY3Rpb24gdG9NaWxsaXNlY29uZChzdHIpIHtcblx0ICAgIHZhciByYXRpbyA9IHJzZWNvbmQudGVzdChzdHIpID8gMTAwMCA6IDFcblx0ICAgIHJldHVybiBwYXJzZUZsb2F0KHN0cikgKiByYXRpb1xuXHR9XG5cblx0ZnVuY3Rpb24gZXhlY0hvb2tzKG9wdGlvbnMsIG5hbWUsIGVsKSB7XG5cdCAgICB2YXIgbGlzdCA9IG9wdGlvbnNbbmFtZV1cblx0ICAgIGxpc3QgPSBBcnJheS5pc0FycmF5KGxpc3QpID8gbGlzdCA6IHR5cGVvZiBsaXN0ID09PSAnZnVuY3Rpb24nID8gW2xpc3RdIDogW11cblx0ICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcblx0ICAgICAgICBmbiAmJiBmbihlbClcblx0ICAgIH0pXG5cdH1cblx0dmFyIHN0YWdnZXJDYWNoZSA9IG5ldyBDYWNoZSgxMjgpXG5cblx0ZnVuY3Rpb24gY3JlYXRlQWN0aW9uKGFjdGlvbikge1xuXHQgICAgdmFyIGxvd2VyID0gYWN0aW9uLnRvTG93ZXJDYXNlKClcblx0ICAgIHJldHVybiBmdW5jdGlvbiAob3B0aW9uKSB7XG5cdCAgICAgICAgdmFyIGVsZW0gPSB0aGlzLmVsXG5cdCAgICAgICAgdmFyICRlbCA9IGF2YWxvbihlbGVtKVxuXHQgICAgICAgIHZhciBlbnRlckFuaW1hdGVEb25lXG5cdCAgICAgICAgdmFyIHN0YWdnZXJUaW1lID0gaXNGaW5pdGUob3B0aW9uLnN0YWdnZXIpID8gb3B0aW9uLnN0YWdnZXIgKiAxMDAwIDogMFxuXHQgICAgICAgIGlmIChzdGFnZ2VyVGltZSkge1xuXHQgICAgICAgICAgICBpZiAob3B0aW9uLnN0YWdnZXJLZXkpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBzdGFnZ2VyID0gc3RhZ2dlckNhY2hlLmdldChvcHRpb24uc3RhZ2dlcktleSkgfHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RhZ2dlckNhY2hlLnB1dChvcHRpb24uc3RhZ2dlcktleSwge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IDAsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogMFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgc3RhZ2dlci5jb3VudCsrXG5cdCAgICAgICAgICAgICAgICBzdGFnZ2VyLml0ZW1zKytcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgc3RhZ2dlckluZGV4ID0gc3RhZ2dlciAmJiBzdGFnZ2VyLmNvdW50IHx8IDBcblx0ICAgICAgICB2YXIgYW5pbWF0aW9uRG9uZSA9IGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgICAgIHZhciBpc09rID0gZSAhPT0gZmFsc2Vcblx0ICAgICAgICAgICAgZWxlbS5hbmltYXRpbmcgPSB2b2lkIDBcblx0ICAgICAgICAgICAgZW50ZXJBbmltYXRlRG9uZSA9IHRydWVcblx0ICAgICAgICAgICAgdmFyIGRpcldvcmQgPSBpc09rID8gJ0RvbmUnIDogJ0Fib3J0J1xuXHQgICAgICAgICAgICBleGVjSG9va3Mob3B0aW9uLCAnb24nICsgYWN0aW9uICsgZGlyV29yZCwgZWxlbSlcblx0ICAgICAgICAgICAgYXZhbG9uLnVuYmluZChlbGVtLCBzdXBwb3J0LnRyYW5zaXRpb25FbmRFdmVudClcblx0ICAgICAgICAgICAgYXZhbG9uLnVuYmluZChlbGVtLCBzdXBwb3J0LmFuaW1hdGlvbkVuZEV2ZW50KVxuXHQgICAgICAgICAgICBpZiAoc3RhZ2dlcikge1xuXHQgICAgICAgICAgICAgICAgaWYgKC0tc3RhZ2dlci5pdGVtcyA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN0YWdnZXIuY291bnQgPSAwXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKG9wdGlvbi5xdWV1ZSkge1xuXHQgICAgICAgICAgICAgICAgYW5pbWF0aW9uUXVldWUubG9jayA9IGZhbHNlXG5cdCAgICAgICAgICAgICAgICBhbmltYXRpb25RdWV1ZS5zaGlmdCgpXG5cdCAgICAgICAgICAgICAgICBjYWxsTmV4dEFuaW1hdGlvbigpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZXhlY0hvb2tzKG9wdGlvbiwgJ29uQmVmb3JlJyArIGFjdGlvbiwgZWxlbSlcblxuXHQgICAgICAgIGlmIChvcHRpb25bbG93ZXJdKSB7XG5cdCAgICAgICAgICAgIG9wdGlvbltsb3dlcl0oZWxlbSwgZnVuY3Rpb24gKG9rKSB7XG5cdCAgICAgICAgICAgICAgICBhbmltYXRpb25Eb25lKG9rICE9PSBmYWxzZSlcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuY3NzKSB7XG5cblx0ICAgICAgICAgICAgJGVsLmFkZENsYXNzKG9wdGlvbltsb3dlciArICdDbGFzcyddKVxuXHQgICAgICAgICAgICBpZiAobG93ZXIgPT09ICdsZWF2ZScpIHtcblx0ICAgICAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcyhvcHRpb24uZW50ZXJDbGFzcyArICcgJyArIG9wdGlvbi5lbnRlckFjdGl2ZUNsYXNzKVxuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKGxvd2VyID09PSAnZW50ZXInKSB7XG5cdCAgICAgICAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3Mob3B0aW9uLmxlYXZlQ2xhc3MgKyAnICcgKyBvcHRpb24ubGVhdmVBY3RpdmVDbGFzcylcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICRlbC5iaW5kKHN1cHBvcnQudHJhbnNpdGlvbkVuZEV2ZW50LCBhbmltYXRpb25Eb25lKVxuXHQgICAgICAgICAgICAkZWwuYmluZChzdXBwb3J0LmFuaW1hdGlvbkVuZEV2ZW50LCBhbmltYXRpb25Eb25lKVxuXHQgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIGVudGVyQW5pbWF0ZURvbmUgPSBhdmFsb24ucm9vdC5vZmZzZXRXaWR0aCA9PT0gTmFOXG5cdCAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3Mob3B0aW9uW2xvd2VyICsgJ0FjdGl2ZUNsYXNzJ10pXG5cdCAgICAgICAgICAgICAgICB2YXIgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKVxuXHQgICAgICAgICAgICAgICAgdmFyIHRyYW5EdXJhdGlvbiA9IGNvbXB1dGVkU3R5bGVzW3N1cHBvcnQudHJhbnNpdGlvbkR1cmF0aW9uXVxuXHQgICAgICAgICAgICAgICAgdmFyIGFuaW1EdXJhdGlvbiA9IGNvbXB1dGVkU3R5bGVzW3N1cHBvcnQuYW5pbWF0aW9uRHVyYXRpb25dXG5cdCAgICAgICAgICAgICAgICB2YXIgdGltZSA9IHRvTWlsbGlzZWNvbmQodHJhbkR1cmF0aW9uKSB8fCB0b01pbGxpc2Vjb25kKGFuaW1EdXJhdGlvbilcblx0ICAgICAgICAgICAgICAgIGlmICghdGltZSA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkRvbmUoZmFsc2UpXG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzdGFnZ2VyVGltZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVudGVyQW5pbWF0ZURvbmUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkRvbmUoZmFsc2UpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9LCB0aW1lICsgMTMwKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LCAxNyArIHN0YWdnZXJUaW1lICogc3RhZ2dlckluZGV4KS8vID0gMTAwMC82MFxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdGF2YWxvbi5hcHBseUVmZmVjdCA9IGZ1bmN0aW9uIChub2RlLCB2bm9kZSwgb3B0cykge1xuXHQgICAgdmFyIGNiID0gb3B0cy5jYlxuXHQgICAgdmFyIGhvb2sgPSBvcHRzLmhvb2tcblx0ICAgIHZhciBjdXJFZmZlY3QgPSB2bm9kZVsnbXMtZWZmZWN0J11cblx0ICAgIGlmIChjdXJFZmZlY3QgJiYgIWF2YWxvbi5kb2N1bWVudC5oaWRkZW4pIHtcblx0ICAgICAgICB2YXIgb2xkID0gY3VyRWZmZWN0W2hvb2tdXG5cdCAgICAgICAgaWYgKGNiKSB7XG5cdCAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9sZCkpIHtcblx0ICAgICAgICAgICAgICAgIG9sZC5wdXNoKGNiKVxuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKG9sZCkge1xuXHQgICAgICAgICAgICAgICAgY3VyRWZmZWN0W2hvb2tdID0gW29sZCwgY2JdXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBjdXJFZmZlY3RbaG9va10gPSBbY2JdXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgZ2V0QWN0aW9uKG9wdHMpXG5cdCAgICAgICAgbm9kZS5hbmltYXRlID0gdHJ1ZVxuXHQgICAgICAgIGF2YWxvbi5kaXJlY3RpdmVzLmVmZmVjdC51cGRhdGUobm9kZSwgdm5vZGUsIDAsIGF2YWxvbi5zaGFkb3dDb3B5KHt9LCBvcHRzKSlcblxuXHQgICAgfSBlbHNlIGlmIChjYikge1xuXHQgICAgICAgIGNiKClcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGdldEFjdGlvbihvcHRzKSB7XG5cdCAgICBpZiAoIW9wdHMuYWN0b24pIHtcblx0ICAgICAgICBvcHRzLmFjdGlvbiA9IG9wdHMuaG9vay5yZXBsYWNlKC9eb24vLCAnJykucmVwbGFjZSgvRG9uZSQvLCAnJykudG9Mb3dlckNhc2UoKVxuXHQgICAgfVxuXHR9XG5cblxuXG4vKioqLyB9LFxuLyogNjUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qKlxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICog5qOA5rWL5rWP6KeI5Zmo5a+5Q1NT5Yqo55S755qE5pSv5oyB5LiOQVBJ5ZCNXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblx0dmFyIHN1cHBvcnRUcmFuc2l0aW9uID0gZmFsc2Vcblx0dmFyIHN1cHBvcnRBbmltYXRpb24gPSBmYWxzZVxuXHR2YXIgc3VwcG9ydENTUyA9IGZhbHNlXG5cdHZhciB0cmFuc2l0aW9uRW5kRXZlbnRcblx0dmFyIGFuaW1hdGlvbkVuZEV2ZW50XG5cdHZhciB0cmFuc2l0aW9uRHVyYXRpb24gPSBhdmFsb24uY3NzTmFtZSgndHJhbnNpdGlvbi1kdXJhdGlvbicpXG5cdHZhciBhbmltYXRpb25EdXJhdGlvbiA9IGF2YWxvbi5jc3NOYW1lKCdhbmltYXRpb24tZHVyYXRpb24nKVxuXG5cdHZhciBjaGVja2VyID0ge1xuXHQgICAgVHJhbnNpdGlvbkV2ZW50OiAndHJhbnNpdGlvbmVuZCcsXG5cdCAgICBXZWJLaXRUcmFuc2l0aW9uRXZlbnQ6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcblx0ICAgIE9UcmFuc2l0aW9uRXZlbnQ6ICdvVHJhbnNpdGlvbkVuZCcsXG5cdCAgICBvdHJhbnNpdGlvbkV2ZW50OiAnb3RyYW5zaXRpb25FbmQnXG5cdH1cblx0dmFyIHdpbmRvdyA9IGF2YWxvbi53aW5kb3dcblx0dmFyIHRyYW5cblx0Ly/mnInnmoTmtY/op4jlmajlkIzml7bmlK/mjIHnp4HmnInlrp7njrDkuI7moIflh4blhpnms5XvvIzmr5TlpoJ3ZWJraXTmlK/mjIHliY3kuKTnp43vvIxPcGVyYeaUr+aMgTHjgIEz44CBNFxuXHRmb3IgKHZhciBuYW1lIGluIGNoZWNrZXIpIHtcblx0ICAgIGlmICh3aW5kb3dbbmFtZV0pIHtcblx0ICAgICAgICB0cmFuID0gY2hlY2tlcltuYW1lXVxuXHQgICAgICAgIGJyZWFrXG5cdCAgICB9XG5cdCAgICB0cnkge1xuXHQgICAgICAgIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQobmFtZSlcblx0ICAgICAgICB0cmFuID0gY2hlY2tlcltuYW1lXVxuXHQgICAgICAgIGJyZWFrXG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICB9XG5cdH1cblx0aWYgKHR5cGVvZiB0cmFuID09PSAnc3RyaW5nJykge1xuXHQgICAgc3VwcG9ydFRyYW5zaXRpb24gPSB0cnVlXG5cdCAgICBzdXBwb3J0Q1NTID0gdHJ1ZVxuXHQgICAgdHJhbnNpdGlvbkVuZEV2ZW50ID0gdHJhblxuXHR9XG5cblx0Ly9hbmltYXRpb25lbmTmnInkuKTkuKrlj6/nlKjlvaLmgIFcblx0Ly9JRTEwKywgRmlyZWZveCAxNisgJiBPcGVyYSAxMi4xKzogYW5pbWF0aW9uZW5kXG5cdC8vQ2hyb21lL1NhZmFyaTogd2Via2l0QW5pbWF0aW9uRW5kXG5cdC8vaHR0cDovL2Jsb2dzLm1zZG4uY29tL2IvZGF2cm91cy9hcmNoaXZlLzIwMTEvMTIvMDYvaW50cm9kdWN0aW9uLXRvLWNzczMtYW5pbWF0IGlvbnMuYXNweFxuXHQvL0lFMTDkuZ/lj6/ku6Xkvb/nlKhNU0FuaW1hdGlvbkVuZOebkeWQrO+8jOS9huaYr+Wbnuiwg+mHjOeahOS6i+S7tiB0eXBl5L6d54S25Li6YW5pbWF0aW9uZW5kXG5cdC8vICBlbC5hZGRFdmVudExpc3RlbmVyKCdNU0FuaW1hdGlvbkVuZCcsIGZ1bmN0aW9uKGUpIHtcblx0Ly8gICAgIGFsZXJ0KGUudHlwZSkvLyBhbmltYXRpb25lbmTvvIHvvIHvvIFcblx0Ly8gfSlcblx0Y2hlY2tlciA9IHtcblx0ICAgICdBbmltYXRpb25FdmVudCc6ICdhbmltYXRpb25lbmQnLFxuXHQgICAgJ1dlYktpdEFuaW1hdGlvbkV2ZW50JzogJ3dlYmtpdEFuaW1hdGlvbkVuZCdcblx0fVxuXHR2YXIgYW5pXG5cdGZvciAobmFtZSBpbiBjaGVja2VyKSB7XG5cdCAgICBpZiAod2luZG93W25hbWVdKSB7XG5cdCAgICAgICAgYW5pID0gY2hlY2tlcltuYW1lXVxuXHQgICAgICAgIGJyZWFrXG5cdCAgICB9XG5cdH1cblx0aWYgKHR5cGVvZiBhbmkgPT09ICdzdHJpbmcnKSB7XG5cdCAgICBzdXBwb3J0QW5pbWF0aW9uID0gdHJ1ZVxuXHQgICAgc3VwcG9ydENTUyA9IHRydWVcblx0ICAgIGFuaW1hdGlvbkVuZEV2ZW50ID0gYW5pXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIHRyYW5zaXRpb246IHN1cHBvcnRUcmFuc2l0aW9uLFxuXHQgICAgYW5pbWF0aW9uOiBzdXBwb3J0QW5pbWF0aW9uLFxuXHQgICAgY3NzOiBzdXBwb3J0Q1NTLFxuXHQgICAgdHJhbnNpdGlvbkVuZEV2ZW50OiB0cmFuc2l0aW9uRW5kRXZlbnQsXG5cdCAgICBhbmltYXRpb25FbmRFdmVudDogYW5pbWF0aW9uRW5kRXZlbnQsXG5cdCAgICB0cmFuc2l0aW9uRHVyYXRpb246IHRyYW5zaXRpb25EdXJhdGlvbixcblx0ICAgIGFuaW1hdGlvbkR1cmF0aW9uOiBhbmltYXRpb25EdXJhdGlvblxuXHR9XG5cbi8qKiovIH0sXG4vKiA2NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XG5cdGF2YWxvbi5sZXhlciA9IF9fd2VicGFja19yZXF1aXJlX18oNjcpXG5cdGF2YWxvbi5kaWZmID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2OSlcblx0YXZhbG9uLmJhdGNoID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MClcblx0Ly8gZGlzcGF0Y2jkuI5wYXRjaCDkuLrlhoXnva7mqKHlnZdcblx0dmFyIHBhcnNlVmlldyA9IF9fd2VicGFja19yZXF1aXJlX18oNzEpXG5cblx0ZnVuY3Rpb24gcmVuZGVyKHZ0cmVlLCBsb2NhbCkge1xuXHQgICAgdmFyIF9ib2R5ID0gQXJyYXkuaXNBcnJheSh2dHJlZSkgPyBwYXJzZVZpZXcodnRyZWUpIDogdnRyZWVcblx0ICAgIHZhciBfbG9jYWwgPSBbXVxuXHQgICAgaWYgKGxvY2FsKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiBsb2NhbCkge1xuXHQgICAgICAgICAgICBfbG9jYWwucHVzaCgndmFyICcgKyBpICsgJyA9IF9fbG9jYWxfX1snK2F2YWxvbi5xdW90ZShpKSsnXScpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgdmFyIGJvZHkgPSAnX19sb2NhbF9fID0gX19sb2NhbF9fIHx8IHt9O1xcbicgK1xuXHQgICAgICAgICAgICBfbG9jYWwuam9pbignO1xcbicpKydcXG4nICsgX2JvZHlcblx0ICAgIHRyeXtcblx0ICAgIHZhciBmbiA9IEZ1bmN0aW9uKCdfX3Ztb2RlbF9fJywgJ19fbG9jYWxfXycsIGJvZHkpXG5cdCAgICB9Y2F0Y2goZSl7XG5cdCAgICAgICAgYXZhbG9uLndhcm4oX2JvZHksICdwYXJzZSBlcnJvcicpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gZm5cblx0fVxuXHRhdmFsb24ucmVuZGVyID0gcmVuZGVyXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdmFsb25cblxuXG4vKioqLyB9LFxuLyogNjcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICogYXZhbG9uMi4xLjHnmoTmlrDlvI9sZXhlclxuXHQgKiDlsIblrZfnrKbkuLLlj5jmiJDkuIDkuKromZrmi59ET03moJEs5pa55L6/5Lul5ZCO6L+b5LiA5q2l5Y+Y5oiQ5qih5p2/5Ye95pWwXG5cdCAqIOatpOmYtuauteWPquS8mueUn+aIkFZFbGVtZW50LFZUZXh0LFZDb21tZW50XG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblx0dmFyIHJvcGVuVGFnID0gL148KFstQS1aYS16MC05X10rKVxccyooW14+XSo/KShcXC8/KT4vXG5cdHZhciByZW5kVGFnID0gL148XFwvKFtePl0rKT4vXG5cdHZhciBybXNGb3JTdGFydCA9IC9eXFxzKm1zXFwtZm9yXFw6L1xuXHR2YXIgcm1zRm9yRW5kID0gL15cXHMqbXNcXC1mb3JcXC1lbmQvXG5cdC8vaHR0cHM6Ly9naXRodWIuY29tL3J2aXNjb21pL3RydW5rOC9ibG9iL21hc3Rlci90cnVuazguanNcblx0Ly/liKTlrprph4zpnaLmnInmsqHmnInlhoXlrrlcblx0dmFyIHJjb250ZW50ID0gL1xcUy9cblx0dmFyIHZvaWRUYWcgPSBhdmFsb24ub25lT2JqZWN0KCdhcmVhLGJhc2UsYmFzZWZvbnQsYmdzb3VuZCxicixjb2wsY29tbWFuZCxlbWJlZCwnICtcblx0ICAgICAgICAnZnJhbWUsaHIsaW1nLGlucHV0LGtleWdlbixsaW5rLG1ldGEscGFyYW0sc291cmNlLHRyYWNrLHdicicpXG5cdHZhciBwbGFpblRhZyA9IGF2YWxvbi5vbmVPYmplY3QoJ3NjcmlwdCxzdHlsZSx0ZXh0YXJlYSx4bXAsbm9zY3JpcHQsb3B0aW9uLHRlbXBsYXRlJylcblx0dmFyIHN0cmluZ1Bvb2wgPSB7fVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDY4KVxuXG5cdGZ1bmN0aW9uIGxleGVyKHN0cikge1xuXHQgICAgc3RyaW5nUG9vbCA9IHt9XG5cdCAgICBzdHIgPSBjbGVhclN0cmluZyhzdHIpXG5cdCAgICB2YXIgc3RhY2sgPSBbXVxuXHQgICAgc3RhY2subGFzdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdXG5cdCAgICB9XG5cdCAgICB2YXIgcmV0ID0gW11cblxuXHQgICAgdmFyIGJyZWFrSW5kZXggPSAxMDAwMDBcblx0ICAgIGRvIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IGZhbHNlXG5cdCAgICAgICAgaWYgKHN0ci5jaGFyQXQoMCkgIT09ICc8Jykge1xuXHQgICAgICAgICAgICB2YXIgaSA9IHN0ci5pbmRleE9mKCc8Jylcblx0ICAgICAgICAgICAgaSA9IGkgPT09IC0xID8gc3RyLmxlbmd0aCA6IGlcblx0ICAgICAgICAgICAgdmFyIG5vZGVWYWx1ZSA9IHN0ci5zbGljZSgwLCBpKS5yZXBsYWNlKHJmaWxsLCBmaWxsKVxuXHQgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UoaSkvL+WkhOeQhuaWh+acrOiKgueCuVxuXHQgICAgICAgICAgICBub2RlID0ge3R5cGU6IFwiI3RleHRcIiwgbm9kZVR5cGU6IDMsIG5vZGVWYWx1ZTogbm9kZVZhbHVlfVxuXHQgICAgICAgICAgICBpZiAocmNvbnRlbnQudGVzdChub2RlVmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICBjb2xsZWN0Tm9kZXMobm9kZSwgc3RhY2ssIHJldCkvL+S4jeaUtumbhuepuueZveiKgueCuVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghbm9kZSkge1xuXHQgICAgICAgICAgICB2YXIgaSA9IHN0ci5pbmRleE9mKCc8IS0tJylcblx0ICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgIHZhciBsID0gc3RyLmluZGV4T2YoJy0tPicpXG5cdCAgICAgICAgICAgICAgICBpZiAobCA9PT0gLTEpIHtcblx0ICAgICAgICAgICAgICAgICAgICBhdmFsb24uZXJyb3IoXCLms6jph4roioLngrnmsqHmnInpl63lkIhcIiArIHN0cilcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHZhciBub2RlVmFsdWUgPSBzdHIuc2xpY2UoNCwgbCkucmVwbGFjZShyZmlsbCwgZmlsbClcblx0ICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZShsICsgMylcblx0ICAgICAgICAgICAgICAgIG5vZGUgPSB7dHlwZTogXCIjY29tbWVudFwiLCBub2RlVHlwZTogOCwgbm9kZVZhbHVlOiBub2RlVmFsdWV9XG5cdCAgICAgICAgICAgICAgICBjb2xsZWN0Tm9kZXMobm9kZSwgc3RhY2ssIHJldClcblx0ICAgICAgICAgICAgICAgIGlmIChybXNGb3JFbmQudGVzdChub2RlVmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBzdGFjay5sYXN0KClcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZXMgPSBwID8gcC5jaGlsZHJlbiA6IHJldFxuXHQgICAgICAgICAgICAgICAgICAgIG1hcmtlUmVwZWF0UmFuZ2Uobm9kZXMsIG5vZGVzLnBvcCgpKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCFub2RlKSB7XG5cdCAgICAgICAgICAgIHZhciBtYXRjaCA9IHN0ci5tYXRjaChyb3BlblRhZylcblx0ICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKClcblx0ICAgICAgICAgICAgICAgIHZhciBpc1ZvaWRUYWcgPSB2b2lkVGFnW3R5cGVdIHx8IG1hdGNoWzNdID09PSAnXFwvJ1xuXHQgICAgICAgICAgICAgICAgbm9kZSA9IHt0eXBlOiB0eXBlLCBub2RlVHlwZTogMSwgcHJvcHM6IHt9LCBjaGlsZHJlbjogW10sIGlzVm9pZFRhZzogaXNWb2lkVGFnfVxuXHQgICAgICAgICAgICAgICAgdmFyIGF0dHJzID0gbWF0Y2hbMl1cblx0ICAgICAgICAgICAgICAgIGlmIChhdHRycykge1xuXHQgICAgICAgICAgICAgICAgICAgIGNvbGxlY3RQcm9wcyhhdHRycywgbm9kZS5wcm9wcylcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgY29sbGVjdE5vZGVzKG5vZGUsIHN0YWNrLCByZXQpXG5cdCAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UobWF0Y2hbMF0ubGVuZ3RoKVxuXHQgICAgICAgICAgICAgICAgaWYgKGlzVm9pZFRhZykge1xuXHQgICAgICAgICAgICAgICAgICAgIG5vZGUuZmlyZSA9IG5vZGUuaXNWb2lkVGFnID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5vZGUpXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWluVGFnW3R5cGVdKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHN0ci5pbmRleE9mKFwiPC9cIiArIHR5cGUgKyAnPicpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lckhUTUwgPSBzdHIuc2xpY2UoMCwgaW5kZXgpLnRyaW0oKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UoaW5kZXgpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lckhUTUwpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0eWxlJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzY3JpcHQnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vc2NyaXB0Jzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZW1wbGF0ZSc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAneG1wJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5za2lwQ29udGVudCA9IHRydWVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVySFRNTCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlVHlwZTogMyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnI3RleHQnLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNraXBDb250ZW50OiB0cnVlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVWYWx1ZTogbm9tYWxTdHJpbmcoaW5uZXJIVE1MKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RleHRhcmVhJzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5za2lwQ29udGVudCA9IHRydWVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wcm9wcy50eXBlID0gJ3RleHRhcmVhJ1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnByb3BzLnZhbHVlID0gbm9tYWxTdHJpbmcoaW5uZXJIVE1MKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wdGlvbic6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaCh7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlVHlwZTogMyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICcjdGV4dCcsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlVmFsdWU6IG5vbWFsU3RyaW5nKHRyaW1IVE1MKGlubmVySFRNTCkpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCFub2RlKSB7XG5cdCAgICAgICAgICAgIHZhciBtYXRjaCA9IHN0ci5tYXRjaChyZW5kVGFnKVxuXHQgICAgICAgICAgICBpZiAobWF0Y2gpIHtcblx0ICAgICAgICAgICAgICAgIHZhciB0eXBlID0gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKVxuXHQgICAgICAgICAgICAgICAgdmFyIGxhc3QgPSBzdGFjay5sYXN0KClcblx0ICAgICAgICAgICAgICAgIGlmICghbGFzdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGF2YWxvbi5lcnJvcihtYXRjaFswXSArICfliY3pnaLnvLrlsJE8JyArIHR5cGUgKyAnPicpXG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3QudHlwZSAhPT0gdHlwZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGF2YWxvbi5lcnJvcihsYXN0LnR5cGUgKyAn5rKh5pyJ6Zet5ZCIJylcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIG5vZGUgPSBzdGFjay5wb3AoKVxuXHQgICAgICAgICAgICAgICAgbm9kZS5maXJlID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKG1hdGNoWzBdLmxlbmd0aClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmICghbm9kZSB8fCAtLWJyZWFrSW5kZXggPT09IDApIHtcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKG5vZGUuZmlyZSkge1xuXHQgICAgICAgICAgICBmaXJlRW5kKG5vZGUsIHN0YWNrLCByZXQpXG5cdCAgICAgICAgICAgIGRlbGV0ZSBub2RlLmZpcmVcblx0ICAgICAgICB9XG5cblx0ICAgIH0gd2hpbGUgKHN0ci5sZW5ndGgpO1xuXG5cdCAgICByZXR1cm4gcmV0XG5cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gbGV4ZXJcblxuXHRmdW5jdGlvbiBmaXJlRW5kKG5vZGUsIHN0YWNrLCByZXQpIHtcblx0ICAgIHZhciB0eXBlID0gbm9kZS50eXBlXG5cdCAgICB2YXIgcHJvcHMgPSBub2RlLnByb3BzXG5cdCAgICBzd2l0Y2ggKHR5cGUpIHtcblx0ICAgICAgICBjYXNlICdpbnB1dCc6XG5cdCAgICAgICAgICAgIGlmICghcHJvcHMudHlwZSkge1xuXHQgICAgICAgICAgICAgICAgcHJvcHMudHlwZSA9ICd0ZXh0J1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgY2FzZSAnc2VsZWN0Jzpcblx0ICAgICAgICAgICAgcHJvcHMudHlwZSA9IHR5cGUgKyAnLScgKyBwcm9wcy5oYXNPd25Qcm9wZXJ0eSgnbXVsdGlwbGUnKSA/ICdtdWx0aXBsZScgOiAnb25lJ1xuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIGNhc2UgJ3RhYmxlJzpcblx0ICAgICAgICAgICAgYWRkVGJvZHkobm9kZS5jaGlsZHJlbilcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICBpZiAodHlwZS5pbmRleE9mKCdtcy0nKSA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgcHJvcHMuaXMgPSB0eXBlXG5cdCAgICAgICAgICAgICAgICBpZiAoIXByb3BzWydtcy13aWRnZXQnXSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHByb3BzWydtcy13aWRnZXQnXSA9ICd7aXM6JyArIGF2YWxvbi5xdW90ZSh0eXBlKSArICd9J1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChwcm9wc1snbXMtd2lkZ2V0J10pIHtcblx0ICAgICAgICAgICAgICAgIG5vZGUudGVtcGxhdGUgPSBhdmFsb24udmRvbUFkYXB0b3Iobm9kZSwgJ3RvSFRNTCcpXG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgfVxuXHQgICAgdmFyIGZvckV4cHIgPSBwcm9wc1snbXMtZm9yJ11cblx0ICAgIGlmIChmb3JFeHByKSB7XG5cdCAgICAgICAgZGVsZXRlIHByb3BzWydtcy1mb3InXVxuXHQgICAgICAgIHZhciBwID0gc3RhY2subGFzdCgpXG5cdCAgICAgICAgdmFyIGFyciA9IHAgPyBwLmNoaWxkcmVuIDogcmV0XG5cdCAgICAgICAgYXJyLnNwbGljZShhcnIubGVuZ3RoIC0gMSwgMCwge1xuXHQgICAgICAgICAgICBub2RlVHlwZTogOCxcblx0ICAgICAgICAgICAgdHlwZTogJyNjb21tZW50Jyxcblx0ICAgICAgICAgICAgbm9kZVZhbHVlOiAnbXMtZm9yOicgKyBmb3JFeHByXG5cdCAgICAgICAgfSlcblxuXHQgICAgICAgIG1hcmtlUmVwZWF0UmFuZ2UoYXJyLCB7XG5cdCAgICAgICAgICAgIG5vZGVUeXBlOiA4LFxuXHQgICAgICAgICAgICB0eXBlOiAnI2NvbW1lbnQnLFxuXHQgICAgICAgICAgICBub2RlVmFsdWU6ICdtcy1mb3ItZW5kOidcblx0ICAgICAgICB9KVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gbWFya2VSZXBlYXRSYW5nZShub2RlcywgZW5kKSB7XG5cdCAgICBlbmQuZHluYW1pYyA9IHRydWVcblx0ICAgIGVuZC5zaWduYXR1cmUgPSBhdmFsb24ubWFrZUhhc2hDb2RlKCdmb3InKVxuXHQgICAgdmFyIGFycmF5ID0gW10sIHN0YXJ0LCBkZWVwID0gMVxuXHQgICAgd2hpbGUgKHN0YXJ0ID0gbm9kZXMucG9wKCkpIHtcblx0ICAgICAgICBpZiAoc3RhcnQubm9kZVR5cGUgPT09IDgpIHtcblx0ICAgICAgICAgICAgaWYgKHJtc0ZvckVuZC50ZXN0KHN0YXJ0Lm5vZGVWYWx1ZSkpIHtcblx0ICAgICAgICAgICAgICAgICsrZGVlcFxuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKHJtc0ZvclN0YXJ0LnRlc3Qoc3RhcnQubm9kZVZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgLS1kZWVwXG5cdCAgICAgICAgICAgICAgICBpZiAoZGVlcCA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN0YXJ0Lm5vZGVWYWx1ZSA9IHN0YXJ0Lm5vZGVWYWx1ZS5yZXBsYWNlKHJmaWxsLCBmaWxsKSAgICAgICAgLy9ub21hbFN0cmluZyhzdGFydC5ub2RlVmFsdWUpXG5cdCAgICAgICAgICAgICAgICAgICAgc3RhcnQuc2lnbmF0dXJlID0gZW5kLnNpZ25hdHVyZVxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXJ0LmR5bmFtaWMgPSAnZm9yJ1xuXHQgICAgICAgICAgICAgICAgICAgIHN0YXJ0LnRlbXBsYXRlID0gYXJyYXkubWFwKGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdmFsb24udmRvbUFkYXB0b3IoYSwgJ3RvSFRNTCcpXG5cdCAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJylcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGFycmF5WzBdXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQucHJvcHMpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNiID0gZWxlbWVudC5wcm9wc1snZGF0YS1mb3ItcmVuZGVyZWQnXVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2IpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aWQgPSBjYiArICc6Y2InXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWF2YWxvbi5jYWNoZXNbd2lkXSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2YWxvbi5jYWNoZXNbd2lkXSA9IEZ1bmN0aW9uKCdyZXR1cm4gJyArIGF2YWxvbi5wYXJzZUV4cHIoY2IsICdvbicpKSgpXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydC53aWQgPSB3aWRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHN0YXJ0LCBbXSwgZW5kKVxuXHQgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgYXJyYXkudW5zaGlmdChzdGFydClcblx0ICAgIH1cblxuXHR9XG5cblxuXHRmdW5jdGlvbiBjb2xsZWN0Tm9kZXMobm9kZSwgc3RhY2ssIHJldCkge1xuXHQgICAgdmFyIHAgPSBzdGFjay5sYXN0KClcblx0ICAgIGlmIChwKSB7XG5cdCAgICAgICAgcC5jaGlsZHJlbi5wdXNoKG5vZGUpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJldC5wdXNoKG5vZGUpXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBjb2xsZWN0UHJvcHMoYXR0cnMsIHByb3BzKSB7XG5cdCAgICBhdHRycy5yZXBsYWNlKHJub3doaXRlLCBmdW5jdGlvbiAocHJvcCkge1xuXHQgICAgICAgIHZhciBhcnIgPSBwcm9wLnNwbGl0KCc9Jylcblx0ICAgICAgICB2YXIgbmFtZSA9IGFyclswXVxuXHQgICAgICAgIHZhciB2YWx1ZSA9IGFyclsxXSB8fCAnJ1xuXHQgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gJzonKSB7XG5cdCAgICAgICAgICAgIG5hbWUgPSAnbXMtJyArIG5hbWUuc2xpY2UoMSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHZhbHVlKSB7XG5cdCAgICAgICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCc/PycpID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IG5vbWFsU3RyaW5nKHZhbHVlKS5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShybGluZVNwLCAnJykuXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2UoL1xcXCIvZywgXCInXCIpLlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBzbGljZSgxLCAtMSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoIShuYW1lIGluIHByb3BzKSkge1xuXHQgICAgICAgICAgICBwcm9wc1tuYW1lXSA9IHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSlcblxuXHR9XG5cdGZ1bmN0aW9uIG5vbWFsU3RyaW5nKHN0cikge1xuXHQgICAgcmV0dXJuIGF2YWxvbi51bmVzY2FwZUhUTUwoc3RyLnJlcGxhY2UocmZpbGwsIGZpbGwpKVxuXHR9XG5cblx0ZnVuY3Rpb24gY2xlYXJTdHJpbmcoc3RyKSB7XG5cdCAgICB2YXIgYXJyYXkgPSByZWFkU3RyaW5nKHN0cilcblx0ICAgIGZvciAodmFyIGkgPSAwLCBuID0gYXJyYXkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdCAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoYXJyYXlbaV0sIGRpZylcblx0ICAgIH1cblx0ICAgIHJldHVybiBzdHJcblx0fVxuXHRmdW5jdGlvbiByZWFkU3RyaW5nKHN0cikge1xuXHQgICAgdmFyIGVuZCwgcyA9IDBcblx0ICAgIHZhciByZXQgPSBbXVxuXHQgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBzdHIubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdCAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpXG5cdCAgICAgICAgaWYgKCFlbmQpIHtcblx0ICAgICAgICAgICAgaWYgKGMgPT09IFwiJ1wiKSB7XG5cdCAgICAgICAgICAgICAgICBlbmQgPSBcIidcIlxuXHQgICAgICAgICAgICAgICAgcyA9IGlcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnXCInKSB7XG5cdCAgICAgICAgICAgICAgICBlbmQgPSAnXCInXG5cdCAgICAgICAgICAgICAgICBzID0gaVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgaWYgKGMgPT09ICdcXFxcJykge1xuXHQgICAgICAgICAgICAgICAgaSArPSAxXG5cdCAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChjID09PSBlbmQpIHtcblx0ICAgICAgICAgICAgICAgIHJldC5wdXNoKHN0ci5zbGljZShzLCBpICsgMSkpXG5cdCAgICAgICAgICAgICAgICBlbmQgPSBmYWxzZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHJldFxuXHR9XG5cblx0dmFyIHJmaWxsID0gL1xcP1xcP1xcZCsvZ1xuXHR2YXIgcmxpbmVTcCA9IC9cXG5cXHMqL2dcblx0dmFyIHJub3doaXRlID0gL1xcUysvZ1xuXHR2YXIgbnVtYmVyID0gMVxuXHRmdW5jdGlvbiBkaWcoYSkge1xuXHQgICAgdmFyIGtleSA9ICc/PycgKyBudW1iZXIrK1xuXHQgICAgc3RyaW5nUG9vbFtrZXldID0gYVxuXHQgICAgcmV0dXJuIGtleVxuXHR9XG5cdGZ1bmN0aW9uIGZpbGwoYSkge1xuXHQgICAgdmFyIHZhbCA9IHN0cmluZ1Bvb2xbYV1cblx0ICAgIHJldHVybiB2YWxcblx0fVxuXHQvL+S4k+mXqOeUqOS6juWkhOeQhm9wdGlvbuagh+etvumHjOmdoueahOagh+etvlxuXHR2YXIgcnRyaW1IVE1MID0gLzxcXHcrKFxccysoXCJbXlwiXSpcInwnW14nXSonfFtePl0pKyk/Pnw8XFwvXFx3Kz4vZ2lcblx0ZnVuY3Rpb24gdHJpbUhUTUwodikge1xuXHQgICAgcmV0dXJuIFN0cmluZyh2KS5yZXBsYWNlKHJ0cmltSFRNTCwgJycpLnRyaW0oKVxuXHR9XG5cblx0Ly/lpoLmnpznm7TmjqXlsIZ0cuWFg+e0oOWGmXRhYmxl5LiL6Z2iLOmCo+S5iOa1j+iniOWZqOWwhuWwhuWug+S7rCjnm7jpgrvnmoTpgqPlh6DkuKopLOaUvuWIsOS4gOS4quWKqOaAgeWIm+W7uueahHRib2R55bqV5LiLXG5cdGZ1bmN0aW9uIGFkZFRib2R5KG5vZGVzKSB7XG5cdCAgICB2YXIgdGJvZHksIG5lZWRBZGRUYm9keSA9IGZhbHNlLCBjb3VudCA9IDAsIHN0YXJ0ID0gMCwgbiA9IG5vZGVzLmxlbmd0aFxuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IG5vZGVzW2ldXG5cdCAgICAgICAgaWYgKCF0Ym9keSkge1xuXHQgICAgICAgICAgICBpZiAobm9kZS50eXBlID09PSAndHInKSB7XG5cdCAgICAgICAgICAgICAgICB0Ym9keSA9IHtcblx0ICAgICAgICAgICAgICAgICAgICBub2RlVHlwZTogMSxcblx0ICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGJvZHknLFxuXHQgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcblx0ICAgICAgICAgICAgICAgICAgICBwcm9wczoge31cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHRib2R5LmNoaWxkcmVuLnB1c2gobm9kZSlcblx0ICAgICAgICAgICAgICAgIG5lZWRBZGRUYm9keSA9IHRydWVcblx0ICAgICAgICAgICAgICAgIGlmIChzdGFydCA9PT0gMClcblx0ICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGlcblx0ICAgICAgICAgICAgICAgIG5vZGVzW2ldID0gdGJvZHlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGlmIChub2RlLnR5cGUgIT09ICd0cicgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuXHQgICAgICAgICAgICAgICAgdGJvZHkgPSBmYWxzZVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGJvZHkuY2hpbGRyZW4ucHVzaChub2RlKVxuXHQgICAgICAgICAgICAgICAgY291bnQrK1xuXHQgICAgICAgICAgICAgICAgbm9kZXNbaV0gPSAwXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIGlmIChuZWVkQWRkVGJvZHkpIHtcblx0ICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IG47IGkrKykge1xuXHQgICAgICAgICAgICBpZiAobm9kZXNbaV0gPT09IDApIHtcblx0ICAgICAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxKVxuXHQgICAgICAgICAgICAgICAgaS0tXG5cdCAgICAgICAgICAgICAgICBjb3VudC0tXG5cdCAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblxuXG4vKioqLyB9LFxuLyogNjggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdGF2YWxvbi5zcGVlZFVwID0gZnVuY3Rpb24gKGFycikge1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICBoYXNEaXJlY3RpdmUoYXJyW2ldKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGFyclxuXHR9XG5cblx0ZnVuY3Rpb24gaGFzRGlyZWN0aXZlKGEpIHtcblx0ICAgIHN3aXRjaCAoYS5ub2RlVHlwZSkge1xuXHQgICAgICAgIGNhc2UgMzpcblx0ICAgICAgICAgICAgaWYgKGF2YWxvbi5jb25maWcucmJpbmQudGVzdChhLm5vZGVWYWx1ZSkpIHtcblx0ICAgICAgICAgICAgICAgIGEuZHluYW1pYyA9ICdleHByJ1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGEuc2tpcENvbnRlbnQgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIGNhc2UgODpcblx0ICAgICAgICAgICAgaWYgKGEuZHluYW1pYykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGEuc2tpcENvbnRlbnQgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIGNhc2UgMTpcblx0ICAgICAgICAgICAgaWYgKGEucHJvcHNbJ21zLXNraXAnXSkge1xuXHQgICAgICAgICAgICAgICAgYS5za2lwQXR0cnMgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICBhLnNraXBDb250ZW50ID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKC9ebXNcXC0vLnRlc3QoYS50eXBlKSB8fCBoYXNEaXJlY3RpdmVBdHRycyhhLnByb3BzKSkge1xuXHQgICAgICAgICAgICAgICAgYS5keW5hbWljID0gdHJ1ZVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgYS5za2lwQXR0cnMgPSB0cnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGEuaXNWb2lkVGFnICYmICFhLmR5bmFtaWMpIHtcblx0ICAgICAgICAgICAgICAgIGEuc2tpcENvbnRlbnQgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgaGFzRGlyZWN0aXZlID0gY2hpbGRyZW5IYXNEaXJlY3RpdmUoYS5jaGlsZHJlbilcblx0ICAgICAgICAgICAgaWYgKCFoYXNEaXJlY3RpdmUgJiYgIWEuZHluYW1pYykge1xuXHQgICAgICAgICAgICAgICAgYS5za2lwQ29udGVudCA9IHRydWVcblx0ICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbkhhc0RpcmVjdGl2ZShhKVxuXHQgICAgICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBjaGlsZHJlbkhhc0RpcmVjdGl2ZShhcnIpIHtcblx0ICAgIHZhciByZXQgPSBmYWxzZVxuXHQgICAgZm9yICh2YXIgaSA9IDAsIGVsOyBlbCA9IGFycltpKytdOyApIHtcblx0ICAgICAgICBpZiAoaGFzRGlyZWN0aXZlKGVsKSkge1xuXHQgICAgICAgICAgICByZXQgPSB0cnVlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHJldFxuXHR9XG5cdHZhciByZGlyQXR0ciA9IC9eKFxcOnxtc1xcLSlcXHcvXG5cdGZ1bmN0aW9uIGhhc0RpcmVjdGl2ZUF0dHJzKHByb3BzKSB7XG5cdCAgICBpZiAoJ21zLXNraXAnIGluIHByb3BzKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgZm9yICh2YXIgaSBpbiBwcm9wcykge1xuXHQgICAgICAgIGlmIChyZGlyQXR0ci50ZXN0KGkpKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGZhbHNlXG5cdH1cblxuXG4vKioqLyB9LFxuLyogNjkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qKlxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICogZGlmZiDlr7nmr5TmlrDml6fkuKTkuKromZrmi59ET03moJEs5qC55o2uZGlyZWN0aXZl5Lit55qEZGlmZuaWueazleS4uuaWsOiZmuaLn0RPTeagkVxuXHQgKiDmt7vliqBjaGFuZ2UsIGFmdGVyQ2hhbmdl5pu05paw6ZKp5a2QXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblx0dmFyIGVtcHR5QXJyID0gW11cblx0Ly8g6Ziy5q2i6KKr5byV55SoXG5cdHZhciBlbXB0eU9iaiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgY2hpbGRyZW46IFtdLCBwcm9wczoge31cblx0ICAgIH1cblx0fVxuXHR2YXIgZGlyZWN0aXZlcyA9IGF2YWxvbi5kaXJlY3RpdmVzXG5cdHZhciByYmluZGluZyA9IC9ebXMtKFxcdyspLT8oLiopL1xuXG5cdGZ1bmN0aW9uIGRpZmYoY29weXMsIHNvdXJjZXMpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29weXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICB2YXIgY29weSA9IGNvcHlzW2ldXG5cdCAgICAgICAgdmFyIHNyYyA9IHNvdXJjZXNbaV0gfHwgZW1wdHlPYmooKVxuXG5cdCAgICAgICAgc3dpdGNoIChjb3B5Lm5vZGVUeXBlKSB7XG5cdCAgICAgICAgICAgIGNhc2UgMzpcblx0ICAgICAgICAgICAgICAgIGlmIChjb3B5LmR5bmFtaWMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzLmV4cHIuZGlmZihjb3B5LCBzcmMpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDg6XG5cdCAgICAgICAgICAgICAgICBpZiAoY29weS5keW5hbWljID09PSAnZm9yJykgey8v5q+U6L6D5b6q546v5Yy65Z+f55qE5YWD57Sg5L2N572uXG5cdCAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlc1snZm9yJ10uZGlmZihjb3B5LCBzcmMsIGNvcHlzLCBzb3VyY2VzLCBpKVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzcmMuYWZ0ZXJDaGFuZ2UpIHtcblx0ICAgICAgICAgICAgICAgICAgICBleGVjSG9va3Moc3JjLCBzcmMuYWZ0ZXJDaGFuZ2UpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlIDE6XG5cdCAgICAgICAgICAgICAgICBpZiAoY29weS5vcmRlcikge1xuXHQgICAgICAgICAgICAgICAgICAgIGRpZmZQcm9wcyhjb3B5cywgc291cmNlcywgaSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGNvcHkgPSBjb3B5c1tpXVxuXHQgICAgICAgICAgICAgICAgc3JjID0gc291cmNlc1tpXVxuXHQgICAgICAgICAgICAgICAgaWYgKGNvcHkubm9kZVR5cGUgPT09IDEgJiYgIWNvcHkuc2tpcENvbnRlbnQgJiYgIWNvcHkuaXNWb2lkVGFnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZGlmZihjb3B5LmNoaWxkcmVuLCBzcmMgJiYgc3JjLmNoaWxkcmVuIHx8IFtdKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKHNyYyAmJiBzcmMuYWZ0ZXJDaGFuZ2UpIHtcblx0ICAgICAgICAgICAgICAgICAgICBleGVjSG9va3Moc3JjLCBzcmMuYWZ0ZXJDaGFuZ2UpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29weSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBkaWZmKGNvcHksIHNyYykvL+avlOi+g+W+queOr+WMuuWfn+eahOWGheWuuVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBleGVjSG9va3MoZWwsIGhvb2tzKSB7XG5cdCAgICBpZiAoaG9va3MubGVuZ3RoKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaG9vaywgaSA9IDA7IGhvb2sgPSBob29rc1tpKytdOyApIHtcblx0ICAgICAgICAgICAgaG9vayhlbC5kb20sIGVsKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGRlbGV0ZSBlbC5hZnRlckNoYW5nZVxuXHR9XG5cblx0ZnVuY3Rpb24gZGlmZlByb3BzKGNvcHlzLCBzb3VyY2VzLCBpbmRleCkge1xuXHQgICAgdmFyIG9yZGVyID0gY29weXNbaW5kZXhdLm9yZGVyXG5cdCAgICBpZiAob3JkZXIpIHtcblx0ICAgICAgICB2YXIgb2xkT3JkZXIgPSBvcmRlclxuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIHZhciBhcnIgPSBvcmRlci5tYXRjaChhdmFsb24ucndvcmQpXG5cdCAgICAgICAgICAgIHZhciBjaGVja2VkID0ge31cblx0ICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyl7XG5cdCAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGFycltpXVxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZFtuYW1lXSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGNoZWNrZWRbbmFtZV0gPSAxXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBuYW1lLm1hdGNoKHJiaW5kaW5nKVxuXHQgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBtYXRjaCAmJiBtYXRjaFsxXVxuXHQgICAgICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZXNbdHlwZV0pIHtcblx0ICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzW3R5cGVdLmRpZmYoY29weXNbaW5kZXhdLCBzb3VyY2VzW2luZGV4XSB8fCBlbXB0eU9iaigpLCBuYW1lLCBjb3B5cywgc291cmNlcywgaW5kZXgpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB2YXIgbmV3T3JkZXIgPSBjb3B5c1tpbmRleF0ub3JkZXJcblx0ICAgICAgICAgICAgICAgIGlmICghbmV3T3JkZXIpIHtcblx0ICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKDAsIGFyci5sZW5ndGgpXG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5ld09yZGVyICE9PSBvbGRPcmRlcikge1xuXHQgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoLmFwcGx5KGFyciwgbmV3T3JkZXIubWF0Y2goYXZhbG9uLnJ3b3JkKSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgICAgICBhdmFsb24ud2Fybih0eXBlLCBlLCBlLnN0YWNrIHx8IGUubWVzc2FnZSwgJ2RpZmZQcm9wcyBlcnJvcicpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cdGF2YWxvbi5kaWZmUHJvcHMgPSBkaWZmUHJvcHNcblx0bW9kdWxlLmV4cG9ydHMgPSBkaWZmXG5cblxuLyoqKi8gfSxcbi8qIDcwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcblx0LyoqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKiBiYXRjaCDlkIzml7blr7lO5Liq6KeG5Zu+6L+b6KGM5YWo6YeP5pu05pawXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblxuXHR2YXIgcmVjb25jaWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSlcblxuXHQvL+WmguaenOato+WcqOabtOaWsOS4gOS4quWtkOagkSzpgqPkuYjlsIblroPmlL7liLBcblx0dmFyIG5lZWRSZW5kZXJJZHMgPSBbXVxuXHR2YXIgcmVuZGVyaW5nSUQgPSBmYWxzZVxuXHRhdmFsb24uc3VzcGVuZFVwZGF0ZSA9IDBcblxuXG5cdGZ1bmN0aW9uIGJhdGNoVXBkYXRlKGlkKSB7XG5cdCAgICBpZiAocmVuZGVyaW5nSUQpIHtcblx0ICAgICAgICByZXR1cm4gYXZhbG9uLkFycmF5LmVuc3VyZShuZWVkUmVuZGVySWRzLCBpZClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcmVuZGVyaW5nSUQgPSBpZFxuXHQgICAgfVxuXHQgICAgdmFyIHNjb3BlID0gYXZhbG9uLnNjb3Blc1tpZF1cblx0ICAgIGlmICghc2NvcGUgfHwgIWRvY3VtZW50Lm5vZGVOYW1lIHx8IGF2YWxvbi5zdXNwZW5kVXBkYXRlKSB7XG5cdCAgICAgICAgcmV0dXJuIHJlbmRlcmluZ0lEID0gbnVsbFxuXHQgICAgfVxuXHQgICAgdmFyIHZtID0gc2NvcGUudm1vZGVsXG5cdCAgICB2YXIgZG9tID0gdm0uJGVsZW1lbnRcblx0ICAgIHZhciBzb3VyY2UgPSBkb20udnRyZWUgfHwgW11cblx0ICAgIHZhciByZW5kZXJGbiA9IHZtLiRyZW5kZXJcblx0ICAgIHZhciBjb3B5ID0gcmVuZGVyRm4oc2NvcGUudm1vZGVsLCBzY29wZS5sb2NhbClcblx0ICAgIGlmIChzY29wZS5pc1RlbXApIHtcblx0ICAgICAgICAvL+WcqOacgOW8gOWni+aXtizmm7/mjaLkvZznlKjln5/nmoTmiYDmnInoioLngrks56Gu5L+d6Jma5oufRE9N5LiO55yf5a6eRE9N5piv5a+56b2Q55qEXG5cdCAgICAgICAgcmVjb25jaWxlKFtkb21dLCBzb3VyY2UsIGRvbS5wYXJlbnROb2RlKVxuXHQgICAgICAgIGRlbGV0ZSBhdmFsb24uc2NvcGVzW2lkXVxuXHQgICAgfVxuXHQgICAgYXZhbG9uLmRpZmYoY29weSwgc291cmNlKVxuXG5cblx0ICAgIHZhciBpbmRleCA9IG5lZWRSZW5kZXJJZHMuaW5kZXhPZihyZW5kZXJpbmdJRClcblx0ICAgIHJlbmRlcmluZ0lEID0gMFxuXHQgICAgaWYgKGluZGV4ID4gLTEpIHtcblx0ICAgICAgICB2YXIgcmVtb3ZlZCA9IG5lZWRSZW5kZXJJZHMuc3BsaWNlKGluZGV4LCAxKVxuXHQgICAgICAgIHJldHVybiBiYXRjaFVwZGF0ZShyZW1vdmVkWzBdKVxuXHQgICAgfVxuXG5cdCAgICB2YXIgbW9yZSA9IG5lZWRSZW5kZXJJZHMuc2hpZnQoKVxuXHQgICAgaWYgKG1vcmUpIHtcblx0ICAgICAgICBiYXRjaFVwZGF0ZShtb3JlKVxuXHQgICAgfVxuXHR9XG5cblxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXZhbG9uLmJhdGNoID0gYmF0Y2hVcGRhdGVcblxuXG4vKioqLyB9LFxuLyogNzEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qXG5cdCAqIOacrOaooeWdl+aYr+eUqOS6juWwhuiZmuaLn0RPTeWPmOaIkOS4gOS4quWHveaVsFxuXHQgKi9cblxuXHR2YXIgZXh0cmFjdEJpbmRpbmdzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3Milcblx0dmFyIHN0cmluZ2lmeSA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cdHZhciBwYXJzZUV4cHIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDczKVxuXHR2YXIgZGVjb2RlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNilcblx0dmFyIGNvbmZpZyA9IGF2YWxvbi5jb25maWdcblx0dmFyIHF1b3RlID0gYXZhbG9uLnF1b3RlXG5cdHZhciByaWRlbnQgPSAvXlskYS16QS1aX11bJGEtekEtWjAtOV9dKiQvXG5cdHZhciByc3RhdGVtZW50ID0gL15cXHMqdmFyXFxzKyhbJFxcd10rKVxccypcXD1cXHMqXFxTKy9cblx0dmFyIHNraXBzID0ge19fbG9jYWxfXzogMSwgdm1vZGU6IDEsIGRvbTogMX1cblxuXG5cdGZ1bmN0aW9uIHBhcnNlTm9kZXMoc291cmNlLCBpbm5lcikge1xuXHQgICAgLy9tcy1pbXBvcnRhbnTvvIwgbXMtY29udHJvbGxlciDvvIwgbXMtZm9yIOS4jeWPr+WkjeWItu+8jOecgeW+l+atu+W+queOr1xuXHQgICAgLy9tcy1pbXBvcnRhbnQgLS0+IG1zLWNvbnRyb2xsZXIgLS0+IG1zLWZvciAtLT4gbXMtd2lkZ2V0IC0tPiBtcy1lZmZlY3QgLS0+IG1zLWlmXG5cdCAgICB2YXIgYnVmZmVyID0gaW5uZXIgPyBbXSA6IFsnXFxudmFyIHZub2RlcyA9IFtdOyddXG5cblx0ICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSBzb3VyY2VbaSsrXTsgKSB7XG5cdCAgICAgICAgdmFyIHZub2RlID0gcGFyc2VOb2RlKGVsKVxuXHQgICAgICAgIGlmIChlbC4kcHJlcGVuZCkge1xuXHQgICAgICAgICAgICBidWZmZXIucHVzaChlbC4kcHJlcGVuZClcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGFwcGVuZCA9IGVsLiRhcHBlbmRcblx0ICAgICAgICBkZWxldGUgZWwuJGFwcGVuZFxuXHQgICAgICAgIGRlbGV0ZSBlbC4kcHJlcGVuZFxuXHQgICAgICAgIGlmICh2bm9kZSkge1xuXHQgICAgICAgICAgICBidWZmZXIucHVzaCh2bm9kZSArICdcXG4nKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoYXBwZW5kKSB7XG5cdCAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGFwcGVuZClcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBpZiAoIWlubmVyKSB7XG5cdCAgICAgICAgYnVmZmVyLnB1c2goJ3JldHVybiB2bm9kZXNcXG4nKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGJ1ZmZlci5qb2luKCdcXG4nKVxuXHR9XG5cblxuXG5cdGZ1bmN0aW9uIHBhcnNlTm9kZSh2ZG9tKSB7XG5cdCAgICBzd2l0Y2ggKHZkb20ubm9kZVR5cGUpIHtcblx0ICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgICAgIGlmIChjb25maWcucmV4cHIudGVzdCh2ZG9tLm5vZGVWYWx1ZSkgJiYgIXZkb20uc2tpcENvbnRlbnQgKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYWRkKHBhcnNlVGV4dCh2ZG9tKSlcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBhZGQoY3JlYXRlQ2FjaGVkTm9kZSh2ZG9tKSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIGNhc2UgMTpcblxuXHQgICAgICAgICAgICBpZiAodmRvbS5za2lwQ29udGVudCAmJiB2ZG9tLnNraXBBdHRycykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGFkZChjcmVhdGVDYWNoZWROb2RlKHZkb20pKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBjb3B5ID0ge1xuXHQgICAgICAgICAgICAgICAgcHJvcHM6IHt9LFxuXHQgICAgICAgICAgICAgICAgdHlwZTogdmRvbS50eXBlLFxuXHQgICAgICAgICAgICAgICAgbm9kZVR5cGU6IDFcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgYmluZGluZ3MgPSBleHRyYWN0QmluZGluZ3MoY29weSwgdmRvbS5wcm9wcylcblx0ICAgICAgICAgICAgdmFyIG9yZGVyID0gYmluZGluZ3MubWFwKGZ1bmN0aW9uIChiKSB7XG5cdCAgICAgICAgICAgICAgICAvL+Wwhm1zLSrnmoTlgLzlj5jmiJDlh73mlbAs5bm26LWL57uZY29weS5wcm9wc1ttcy0qXVxuXHQgICAgICAgICAgICAgICAgLy/lpoLmnpzmtonlj4rliLDkv67mlLnnu5PmnoQs5YiZ5Zyoc291cmNl5re75YqgJGFwcGVuZCwkcHJlcGVuZFxuXHQgICAgICAgICAgICAgICAgYXZhbG9uLmRpcmVjdGl2ZXNbYi50eXBlXS5wYXJzZShjb3B5LCB2ZG9tLCBiKVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGIubmFtZVxuXHQgICAgICAgICAgICB9KS5qb2luKCcsJylcblx0ICAgICAgICAgICAgaWYgKG9yZGVyKSB7XG5cdCAgICAgICAgICAgICAgICBjb3B5Lm9yZGVyID0gb3JkZXJcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAodmRvbS5pc1ZvaWRUYWcpIHtcblx0ICAgICAgICAgICAgICAgIGNvcHkuaXNWb2lkVGFnID0gdHJ1ZVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgaWYgKCEoJ2NoaWxkcmVuJyBpbiBjb3B5KSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBjID0gdmRvbS5jaGlsZHJlblxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChjLmxlbmd0aCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBjb3B5LmNoaWxkcmVuID0gJyhmdW5jdGlvbigpeycgKyBwYXJzZU5vZGVzKGMpICsgJ30pKCknXG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29weS5jaGlsZHJlbiA9ICdbXSdcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKHZkb20udGVtcGxhdGUpXG5cdCAgICAgICAgICAgICAgICBjb3B5LnRlbXBsYXRlID0gdmRvbS50ZW1wbGF0ZVxuXHQgICAgICAgICAgICBpZiAodmRvbS5za2lwQ29udGVudClcblx0ICAgICAgICAgICAgICAgIGNvcHkuc2tpcENvbnRlbnQgPSB0cnVlXG5cdCAgICAgICAgICAgIGlmICh2ZG9tLnNraXBBdHRycykge1xuXHQgICAgICAgICAgICAgICAgY29weS5za2lwQXR0cnMgPSB0cnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKHZkb20uZHluYW1pYykge1xuXHQgICAgICAgICAgICAgICAgY29weS5keW5hbWljID0gdHJ1ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBhZGRUYWcoY29weSlcblx0ICAgICAgICBjYXNlIDg6XG5cdCAgICAgICAgICAgIHZhciBub2RlVmFsdWUgPSB2ZG9tLm5vZGVWYWx1ZVxuXHQgICAgICAgICAgICBpZiAodmRvbS5keW5hbWljID09PSAnZm9yJykgey8vwqDlpITnkIZtcy1mb3LmjIfku6Rcblx0ICAgICAgICAgICAgICAgIGlmIChub2RlVmFsdWUuaW5kZXhPZignbXMtZm9yOicpICE9PSAwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYXZhbG9uLmVycm9yKCdtcy1mb3LmjIfku6TliY3kuI3og73mnInnqbrmoLwnKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIHZhciBjb3B5ID0ge1xuXHQgICAgICAgICAgICAgICAgICAgIGR5bmFtaWM6ICdmb3InLFxuXHQgICAgICAgICAgICAgICAgICAgIHZtb2RlbDogJ19fdm1vZGVsX18nXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHZkb20pIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAodmRvbS5oYXNPd25Qcm9wZXJ0eShpKSAmJiAhc2tpcHNbaV0pIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29weVtpXSA9IHZkb21baV1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIGF2YWxvbi5kaXJlY3RpdmVzWydmb3InXS5wYXJzZShjb3B5LCB2ZG9tLCB2ZG9tKVxuXHQgICAgICAgICAgICAgICAgdmRvbS4kYXBwZW5kICs9IHBhcnNlTm9kZXMoYXZhbG9uLnNwZWVkVXAoYXZhbG9uLmxleGVyKHZkb20udGVtcGxhdGUpKSx0cnVlKVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGFkZFRhZyhjb3B5KSBcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlVmFsdWUgPT09ICdtcy1mb3ItZW5kOicpIHtcblx0ICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIHZkb20uJGFwcGVuZCA9IGFkZFRhZyh7XG5cdCAgICAgICAgICAgICAgICAgICAgbm9kZVR5cGU6IDgsXG5cdCAgICAgICAgICAgICAgICAgICAgdHlwZTogJyNjb21tZW50Jyxcblx0ICAgICAgICAgICAgICAgICAgICBub2RlVmFsdWU6IHZkb20uc2lnbmF0dXJlLFxuXHQgICAgICAgICAgICAgICAgICAgIGtleTogJ3RyYWNlS2V5J1xuXHQgICAgICAgICAgICAgICAgfSkgKyAnXFxufSxfX2xvY2FsX18sdm5vZGVzKVxcbicgK1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBhZGRUYWcoe1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVR5cGU6IDgsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIiNjb21tZW50XCIsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmU6IHZkb20uc2lnbmF0dXJlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVZhbHVlOiBcIm1zLWZvci1lbmQ6XCJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfSkgKyAnXFxuJ1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuICcnXG5cblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlVmFsdWUuaW5kZXhPZignbXMtanM6JykgPT09IDApIHsvL+aPkuWFpUpT5aOw5piO6K+t5Y+lXG5cdCAgICAgICAgICAgICAgICB2YXIgc3RhdGVtZW50ID0gcGFyc2VFeHByKG5vZGVWYWx1ZS5yZXBsYWNlKCdtcy1qczonLCAnJyksICdqcycpICsgJ1xcbidcblx0ICAgICAgICAgICAgICAgIHZhciByZXQgPSBhZGRUYWcodmRvbSlcblx0ICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHN0YXRlbWVudC5tYXRjaChyc3RhdGVtZW50KVxuXHQgICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoWzFdKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmRvbS4kYXBwZW5kID0gKHZkb20uJGFwcGVuZCB8fCAnJykgKyBzdGF0ZW1lbnQgK1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG5fX2xvY2FsX18uXCIgKyBtYXRjaFsxXSArICcgPSAnICsgbWF0Y2hbMV0gKyAnXFxuJ1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBhdmFsb24ud2Fybihub2RlVmFsdWUgKyAnIHBhcnNlIGZhaWwhJylcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHJldHVybiByZXRcblx0ICAgICAgICAgICAgfSBlbHNlIGlmKHZkb20uZHluYW1pYyl7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYWRkVGFnKHZkb20pXG5cdCAgICAgICAgICAgIH1lbHNle1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGFkZChjcmVhdGVDYWNoZWROb2RlKHZkb20pKVxuXHQgICAgICAgICAgICB9XG5cdCAgIC8vICAgICBkZWZhdWx0OlxuXHQvLyAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZkb20pKSB7XG5cdC8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZkb20pXG5cdC8vICAgICAgICAgICAgICAgIHZkb20uJGFwcGVuZCA9IHBhcnNlTm9kZXModmRvbSwgdHJ1ZSlcblx0Ly8gICAgICAgICAgICB9XG5cdCAgICB9XG5cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gcGFyc2VOb2Rlc1xuXG5cdGZ1bmN0aW9uIHdyYXBEZWxpbWl0ZXIoZXhwcikge1xuXHQgICAgcmV0dXJuIHJpZGVudC50ZXN0KGV4cHIpID8gZXhwciA6IHBhcnNlRXhwcihleHByLCAndGV4dCcpXG5cdH1cblxuXHRmdW5jdGlvbiBhZGQoYSkge1xuXHQgICAgcmV0dXJuICd2bm9kZXMucHVzaCgnICsgYSArICcpOydcblx0fVxuXHRmdW5jdGlvbiBhZGRUYWcob2JqKSB7XG5cdCAgICByZXR1cm4gYWRkKHN0cmluZ2lmeShvYmopKVxuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VUZXh0KGVsKSB7XG5cdCAgICB2YXIgYXJyYXkgPSBleHRyYWN0RXhwcihlbC5ub2RlVmFsdWUpLy/ov5Tlm57kuIDkuKrmlbDnu4Rcblx0ICAgIHZhciBub2RlVmFsdWUgPSAnJ1xuXHQgICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMSkge1xuXHQgICAgICAgIG5vZGVWYWx1ZSA9IHdyYXBEZWxpbWl0ZXIoYXJyYXlbMF0uZXhwcilcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdmFyIHRva2VuID0gYXJyYXkubWFwKGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgICAgICByZXR1cm4gZWwudHlwZSA/IHdyYXBEZWxpbWl0ZXIoZWwuZXhwcikgOiBxdW90ZShlbC5leHByKVxuXHQgICAgICAgIH0pLmpvaW4oJyArICcpXG5cdCAgICAgICAgbm9kZVZhbHVlID0gJ1N0cmluZygnICsgdG9rZW4gKyAnKSdcblx0ICAgIH1cblx0ICAgIHJldHVybiAne1xcbnR5cGU6IFwiI3RleHRcIixcXG5ub2RlVHlwZTozLFxcbmR5bmFtaWM6dHJ1ZSxcXG5ub2RlVmFsdWU6ICcgKyBub2RlVmFsdWUgKyAnXFxufSdcblx0fVxuXG5cdHZhciBybGluZVNwID0gL1xcblxccyovZ1xuXG5cdGZ1bmN0aW9uIGV4dHJhY3RFeHByKHN0cikge1xuXHQgICAgdmFyIHJldCA9IFtdXG5cdCAgICBkbyB7Ly9hYWF7e0BiYmJ9fWNjY1xuXHQgICAgICAgIHZhciBpbmRleCA9IHN0ci5pbmRleE9mKGNvbmZpZy5vcGVuVGFnKVxuXHQgICAgICAgIGluZGV4ID0gaW5kZXggPT09IC0xID8gc3RyLmxlbmd0aCA6IGluZGV4XG5cdCAgICAgICAgdmFyIHZhbHVlID0gc3RyLnNsaWNlKDAsIGluZGV4KVxuXHQgICAgICAgIGlmICgvXFxTLy50ZXN0KHZhbHVlKSkge1xuXHQgICAgICAgICAgICByZXQucHVzaCh7ZXhwcjogZGVjb2RlKHZhbHVlKX0pXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHN0ciA9IHN0ci5zbGljZShpbmRleCArIGNvbmZpZy5vcGVuVGFnLmxlbmd0aClcblx0ICAgICAgICBpZiAoc3RyKSB7XG5cdCAgICAgICAgICAgIGluZGV4ID0gc3RyLmluZGV4T2YoY29uZmlnLmNsb3NlVGFnKVxuXHQgICAgICAgICAgICB2YXIgdmFsdWUgPSBzdHIuc2xpY2UoMCwgaW5kZXgpXG5cdCAgICAgICAgICAgIHJldC5wdXNoKHtcblx0ICAgICAgICAgICAgICAgIGV4cHI6IGF2YWxvbi51bmVzY2FwZUhUTUwodmFsdWUucmVwbGFjZShybGluZVNwLCAnJykpLFxuXHQgICAgICAgICAgICAgICAgdHlwZTogJ3t7fX0nXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZShpbmRleCArIGNvbmZpZy5jbG9zZVRhZy5sZW5ndGgpXG5cdCAgICAgICAgfVxuXHQgICAgfSB3aGlsZSAoc3RyLmxlbmd0aClcblx0ICAgIHJldHVybiByZXRcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUNhY2hlZE5vZGUodmRvbSkge1xuXHQgICAgdmFyIHV1aWRcblx0ICAgIHN3aXRjaCAodmRvbS5ub2RlVHlwZSkge1xuXHQgICAgICAgIGNhc2UgMTpcblx0ICAgICAgICAgICAgdXVpZCA9IHZkb20udHlwZSArICc7JyArIE9iamVjdC5rZXlzKHZkb20ucHJvcHMpLnNvcnQoKS5tYXAoZnVuY3Rpb24gKGspIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBrICsgJy0nICsgdmRvbS5wcm9wc1trXVxuXHQgICAgICAgICAgICB9KS5qb2luKCc7JykgKyAnOycgKyBhdmFsb24udmRvbUFkYXB0b3IodmRvbSwgJ3RvSFRNTCcpLmxlbmd0aFxuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIGNhc2UgMzpcblx0ICAgICAgICBjYXNlIDg6XG5cdCAgICAgICAgICAgIHV1aWQgPSB2ZG9tLm5vZGVUeXBlICsgJzsnICsgdmRvbS5ub2RlVmFsdWVcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgIH1cblxuXHQgICAgYXZhbG9uLmNhY2hlc1t1dWlkXSA9IHZkb21cblxuXHQgICAgcmV0dXJuICdhdmFsb24uZ2V0Q2FjaGVkTm9kZSgnICsgcXVvdGUodXVpZCkgKyAnKSdcblx0fVxuXG5cdGF2YWxvbi5nZXRDYWNoZWROb2RlID0gZnVuY3Rpb24gKHV1aWQpIHtcblx0ICAgIHJldHVybiBhdmFsb24uY2FjaGVzW3V1aWRdXG5cdH1cblxuLyoqKi8gfSxcbi8qIDcyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgZGlyZWN0aXZlcyA9IGF2YWxvbi5kaXJlY3RpdmVzXG5cdHZhciByYmluZGluZyA9IC9ebXMtKFxcdyspLT8oLiopL1xuXHR2YXIgZXZlbnRNYXAgPSBhdmFsb24ub25lT2JqZWN0KCdhbmltYXRpb25lbmQsYmx1cixjaGFuZ2UsaW5wdXQsY2xpY2ssZGJsY2xpY2ssZm9jdXMsa2V5ZG93bixrZXlwcmVzcyxrZXl1cCxtb3VzZWRvd24sbW91c2VlbnRlcixtb3VzZWxlYXZlLG1vdXNlbW92ZSxtb3VzZW91dCxtb3VzZW92ZXIsbW91c2V1cCxzY2FuLHNjcm9sbCxzdWJtaXQnKVxuXG5cdGZ1bmN0aW9uIGV4dHJhY3RCaW5kaW5ncyhjdXIsIHByb3BzKSB7XG5cdCAgICB2YXIgYmluZGluZ3MgPSBbXVxuXHQgICAgdmFyIHNraXAgPSAnbXMtc2tpcCcgaW4gcHJvcHNcblx0ICAgIHZhciB1bmlxID0ge31cblx0ICAgIGZvciAodmFyIGkgaW4gcHJvcHMpIHtcblx0ICAgICAgICB2YXIgdmFsdWUgPSBwcm9wc1tpXSwgbWF0Y2hcblxuXHQgICAgICAgIGlmICghc2tpcCAmJiAobWF0Y2ggPSBpLm1hdGNoKHJiaW5kaW5nKSkpIHtcblx0ICAgICAgICAgICAgdmFyIHR5cGUgPSBtYXRjaFsxXVxuXHQgICAgICAgICAgICB2YXIgcGFyYW0gPSBtYXRjaFsyXSB8fCAnJ1xuXHQgICAgICAgICAgICB2YXIgbmFtZSA9IGlcblx0ICAgICAgICAgICAgaWYgKGV2ZW50TWFwW3R5cGVdKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgb3JkZXIgPSBwYXJzZUZsb2F0KHBhcmFtKSB8fCAwXG5cdCAgICAgICAgICAgICAgICBwYXJhbSA9IHR5cGVcblx0ICAgICAgICAgICAgICAgIHR5cGUgPSAnb24nXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgbmFtZSA9ICdtcy0nICsgdHlwZSArIChwYXJhbSA/ICctJyArIHBhcmFtIDogJycpXG5cdCAgICAgICAgICAgIGlmIChpICE9PSBuYW1lKSB7XG5cdCAgICAgICAgICAgICAgICBkZWxldGUgcHJvcHNbaV1cblx0ICAgICAgICAgICAgICAgIHByb3BzW25hbWVdID0gdmFsdWVcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoZGlyZWN0aXZlc1t0eXBlXSkge1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgYmluZGluZyA9IHtcblx0ICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuXHQgICAgICAgICAgICAgICAgICAgIHBhcmFtOiBwYXJhbSxcblx0ICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuXHQgICAgICAgICAgICAgICAgICAgIGV4cHI6IHZhbHVlLFxuXHQgICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBkaXJlY3RpdmVzW3R5cGVdLnByaW9yaXR5IHx8IHR5cGUuY2hhckNvZGVBdCgwKSAqIDEwMFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdvbicpIHtcblx0ICAgICAgICAgICAgICAgICAgICBvcmRlciA9IG9yZGVyIHx8IDBcblx0ICAgICAgICAgICAgICAgICAgICBiaW5kaW5nLm5hbWUgKz0gJy0nICsgb3JkZXJcblx0ICAgICAgICAgICAgICAgICAgICBiaW5kaW5nLnByaW9yaXR5ID0gcGFyYW0uY2hhckNvZGVBdCgwKSAqIDEwMCArIG9yZGVyXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoIXVuaXFbYmluZGluZy5uYW1lXSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHVuaXFbYmluZGluZy5uYW1lXSA9IDFcblx0ICAgICAgICAgICAgICAgICAgICBiaW5kaW5ncy5wdXNoKGJpbmRpbmcpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBjdXIucHJvcHNbaV0gPSBwcm9wc1tpXVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGJpbmRpbmdzLnNvcnQoYnlQcmlvcml0eSlcblxuXHQgICAgcmV0dXJuIGJpbmRpbmdzXG5cdH1cblxuXHRmdW5jdGlvbiBieVByaW9yaXR5KGEsIGIpIHtcblx0ICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBleHRyYWN0QmluZGluZ3NcblxuXG4vKioqLyB9LFxuLyogNzMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFxuXG5cdC8v57yT5a2Y5rGC5YC85Ye95pWw77yM5Lul5L6/5aSa5qyh5Yip55SoXG5cdHZhciBldmFsdWF0b3JQb29sID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OSlcblxuXHR2YXIgcnJlZ2V4cCA9IC8oXnxbXi9dKVxcLyg/IVxcLykoXFxbLis/XXxcXFxcLnxbXi9cXFxcXFxyXFxuXSkrXFwvW2dpbXl1XXswLDV9KD89XFxzKigkfFtcXHJcXG4sLjt9KV0pKS9nXG5cdHZhciByc3RyaW5nID0gLyhbXCInXSkoXFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS9nXG5cdHZhciByZmlsbCA9IC9cXD9cXD9cXGQrL2dcblx0dmFyIGJyYWNrZXRzID0gL1xcKChbXildKilcXCkvXG5cblx0dmFyIHJzaG9ydENpcmN1aXQgPSAvXFx8XFx8L2dcblx0dmFyIHJwaXBlbGluZSA9IC9cXHwoPz1cXHcpL1xuXHR2YXIgcnVzZWxlc3NTcCA9IC9cXHMqKFxcLnxcXHwpXFxzKi9nXG5cblx0dmFyIHJBdCA9IC8oXnxbXlxcd1xcdTAwYzAtXFx1RkZGRl9dKShAfCMjKSg/PVskXFx3XSkvZ1xuXHR2YXIgcmhhbmRsZU5hbWUgPSAvXig/OlxcQHwjIylbJFxcd1xcLl0rJC9pXG5cblx0dmFyIHJmaWx0ZXJzID0gL1xcfC4rL2dcblx0dmFyIHJ2YXIgPSAvKCg/OlxcQHxcXCR8XFwjXFwjKT9cXHcrKS9nXG5cblx0ZnVuY3Rpb24gY29sbGVjdExvY2FsKHN0ciwgcmV0KSB7XG5cdCAgICB2YXIgYXJyID0gc3RyLnJlcGxhY2UocmZpbHRlcnMsICcnKS5tYXRjaChydmFyKVxuXHQgICAgaWYgKGFycikge1xuXHQgICAgICAgIGFyci5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7XG5cdCAgICAgICAgICAgIGlmICghL15bQFxcZFxcLV0vLnRlc3QoZWwpICYmXG5cdCAgICAgICAgICAgICAgICAgICAgZWwuc2xpY2UoMCwgMikgIT09ICcjIycgJiZcblx0ICAgICAgICAgICAgICAgICAgICBlbCAhPT0gJyRldmVudCcgJiYgIWF2YWxvbi5rZXlNYXBbZWxdKSB7XG5cdCAgICAgICAgICAgICAgICByZXRbZWxdID0gMVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSlcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGV4dExvY2FsKHJldCkge1xuXHQgICAgdmFyIGFyciA9IFtdXG5cdCAgICBmb3IgKHZhciBpIGluIHJldCkge1xuXHQgICAgICAgIGFyci5wdXNoKCd2YXIgJyArIGkgKyAnID0gX19sb2NhbF9fWycgKyBhdmFsb24ucXVvdGUoaSkgKyAnXScpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiBwYXJzZUV4cHIoc3RyLCBjYXRlZ29yeSkge1xuXHQgICAgdmFyIGJpbmRpbmcgPSB7fVxuXHQgICAgY2F0ZWdvcnkgPSBjYXRlZ29yeSB8fCAnb3RoZXInXG5cdCAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ29iamVjdCcpIHtcblx0ICAgICAgICBjYXRlZ29yeSA9IHN0ci50eXBlXG5cdCAgICAgICAgYmluZGluZyA9IHN0clxuXHQgICAgICAgIHN0ciA9IGJpbmRpbmcuZXhwclxuXHQgICAgfVxuXHQgICAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKVxuXHQgICAgICAgIHJldHVybiAnJ1xuXHQgICAgdmFyIGNhY2hlSUQgPSBzdHJcblx0ICAgIHZhciBjYWNoZVN0ciA9IGV2YWx1YXRvclBvb2wuZ2V0KGNhdGVnb3J5ICsgJzonICsgY2FjaGVJRClcblxuXHQgICAgaWYgKGNhY2hlU3RyKSB7XG5cdCAgICAgICAgcmV0dXJuIGNhY2hlU3RyXG5cdCAgICB9XG5cblx0ICAgIHZhciBudW1iZXIgPSAxXG5cdC8v55u45ZCM55qE6KGo6L6+5byP55Sf5oiQ55u45ZCM55qE5Ye95pWwXG5cdCAgICB2YXIgbWFwcyA9IHt9XG5cdCAgICBmdW5jdGlvbiBkaWcoYSkge1xuXHQgICAgICAgIHZhciBrZXkgPSAnPz8nICsgbnVtYmVyKytcblx0ICAgICAgICBtYXBzW2tleV0gPSBhXG5cdCAgICAgICAgcmV0dXJuIGtleVxuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBmaWxsKGEpIHtcblx0ICAgICAgICByZXR1cm4gbWFwc1thXVxuXHQgICAgfVxuXG5cdCAgICB2YXIgaW5wdXQgPSBzdHIucmVwbGFjZShycmVnZXhwLCBkaWcpLi8v56e76Zmk5omA5pyJ5q2j5YiZXG5cdCAgICAgICAgICAgIHJlcGxhY2UocnN0cmluZywgZGlnKS4vL+enu+mZpOaJgOacieWtl+espuS4slxuXHQgICAgICAgICAgICBcblx0ICAgLy8gaW5wdXQgPSBhdmFsb24udW5lc2NhcGVIVE1MKGlucHV0KS5cblx0ICAgICAgICAgICAgcmVwbGFjZShyc2hvcnRDaXJjdWl0LCBkaWcpLi8v56e76Zmk5omA5pyJ55+t6Lev5oiWXG5cdCAgICAgICAgICAgIHJlcGxhY2UocnVzZWxlc3NTcCwgJyQxJykuLy/np7vpmaQuIHzkuKTnq6/nqbrnmb1cblx0ICAgICAgICAgICAgc3BsaXQocnBpcGVsaW5lKSAvL+S9v+eUqOeuoemBk+espuWIhuemu+aJgOaciei/h+a7pOWZqOWPiuihqOi+vuW8j+eahOato+S9k1xuXHQgICAgLy/ov5jljp9ib2R5XG5cdCAgICB2YXIgX2JvZHkgPSBpbnB1dC5zaGlmdCgpXG5cdCAgICB2YXIgbG9jYWwgPSB7fVxuXHQgICAgdmFyIGJvZHkgPSBfYm9keS5yZXBsYWNlKHJmaWxsLCBmaWxsKS50cmltKClcblx0ICAgIGlmIChjYXRlZ29yeSA9PT0gJ29uJyAmJiByaGFuZGxlTmFtZS50ZXN0KGJvZHkpKSB7XG5cdCAgICAgICAgYm9keSA9IGJvZHkgKyAnKCRldmVudCknXG5cdCAgICB9XG5cblx0ICAgIGJvZHkgPSBib2R5LnJlcGxhY2UockF0LCAnJDFfX3Ztb2RlbF9fLicpXG5cdCAgICBpZiAoY2F0ZWdvcnkgPT09ICdqcycpIHtcblx0ICAgICAgICByZXR1cm4gZXZhbHVhdG9yUG9vbC5wdXQoY2F0ZWdvcnkgKyAnOicgKyBjYWNoZUlELCBib2R5KVxuXHQgICAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gJ29uJykge1xuXHQgICAgICAgIGNvbGxlY3RMb2NhbChfYm9keSwgbG9jYWwpXG5cdCAgICB9XG5cblx0Ly/lpITnkIbooajovr7lvI/nmoTov4fmu6Tlmajpg6jliIZcblxuXHQgICAgdmFyIGZpbHRlcnMgPSBpbnB1dC5tYXAoZnVuY3Rpb24gKHN0cikge1xuXHQgICAgICAgIGNvbGxlY3RMb2NhbChzdHIucmVwbGFjZSgvXlxcdysvZywgXCJcIiksIGxvY2FsKVxuXHQgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHJmaWxsLCBmaWxsKS5yZXBsYWNlKHJBdCwgJyQxX192bW9kZWxfXy4nKSAvL+i/mOWOn1xuXHQgICAgICAgIHZhciBoYXNCcmFja2V0ID0gZmFsc2Vcblx0ICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShicmFja2V0cywgZnVuY3Rpb24gKGEsIGIpIHtcblx0ICAgICAgICAgICAgaGFzQnJhY2tldCA9IHRydWVcblx0ICAgICAgICAgICAgcmV0dXJuIC9cXFMvLnRlc3QoYikgP1xuXHQgICAgICAgICAgICAgICAgICAgICcoX192YWx1ZV9fLCcgKyBiICsgJyk7JyA6XG5cdCAgICAgICAgICAgICAgICAgICAgJyhfX3ZhbHVlX18pOydcblx0ICAgICAgICB9KVxuXHQgICAgICAgIGlmICghaGFzQnJhY2tldCkge1xuXHQgICAgICAgICAgICBzdHIgKz0gJyhfX3ZhbHVlX18pOydcblx0ICAgICAgICB9XG5cdCAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLyhcXHcrKS8sICdhdmFsb24uX19mb3JtYXRfXyhcIiQxXCIpJylcblx0ICAgICAgICByZXR1cm4gJ19fdmFsdWVfXyA9ICcgKyBzdHJcblx0ICAgIH0pXG5cdCAgICB2YXIgcmV0ID0gW11cblx0ICAgIGlmIChjYXRlZ29yeSA9PT0gJ29uJykge1xuXHQgICAgICAgIGZpbHRlcnMgPSBmaWx0ZXJzLm1hcChmdW5jdGlvbiAoZWwpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGVsLnJlcGxhY2UoL19fdmFsdWVfXy9nLCAnJGV2ZW50Jylcblx0ICAgICAgICB9KVxuXHQgICAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCkge1xuXHQgICAgICAgICAgICBmaWx0ZXJzLnB1c2goJ2lmKCRldmVudC4kcmV0dXJuKXtcXG5cXHRyZXR1cm47XFxufScpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghYXZhbG9uLm1vZGVybikge1xuXHQgICAgICAgICAgICBib2R5ID0gYm9keS5yZXBsYWNlKC9fX3Ztb2RlbF9fXFwuKFteKF0rKVxcKChbXildKilcXCkvLCBmdW5jdGlvbiAoYSwgYiwgYykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuICdfX3Ztb2RlbF9fLicgKyBiICsgXCIuY2FsbChfX3Ztb2RlbF9fXCIgKyAoL1xcUy8udGVzdChjKSA/ICcsJyArIGMgOiBcIlwiKSArIFwiKVwiXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgcmV0ID0gWydmdW5jdGlvbiBtc19vbigkZXZlbnQsIF9fbG9jYWxfXyl7Jyxcblx0ICAgICAgICAgICAgJ3RyeXsnLFxuXHQgICAgICAgICAgICBleHRMb2NhbChsb2NhbCkuam9pbignXFxuJyksXG5cdCAgICAgICAgICAgICdcXHR2YXIgX192bW9kZWxfXyA9IHRoaXM7Jyxcblx0ICAgICAgICAgICAgJ1xcdCcgKyBib2R5LFxuXHQgICAgICAgICAgICAnfWNhdGNoKGUpeycsXG5cdCAgICAgICAgICAgIHF1b3RlRXJyb3Ioc3RyLCBjYXRlZ29yeSksXG5cdCAgICAgICAgICAgICd9Jyxcblx0ICAgICAgICAgICAgJ30nXVxuXHQgICAgICAgIGZpbHRlcnMudW5zaGlmdCgyLCAwKVxuXHQgICAgfSBlbHNlIGlmIChjYXRlZ29yeSA9PT0gJ2R1cGxleCcpIHtcblxuXHQvL+S7jnZt5Lit5b6X5Yiw5b2T5YmN5bGe5oCn55qE5YC8XG5cdCAgICAgICAgdmFyIGdldHRlckJvZHkgPSBbXG5cdCAgICAgICAgICAgICdmdW5jdGlvbiAoX192bW9kZWxfXyl7Jyxcblx0ICAgICAgICAgICAgJ3RyeXsnLFxuXHQgICAgICAgICAgICAncmV0dXJuICcgKyBib2R5ICsgJ1xcbicsXG5cdCAgICAgICAgICAgICd9Y2F0Y2goZSl7Jyxcblx0ICAgICAgICAgICAgcXVvdGVFcnJvcihzdHIsIGNhdGVnb3J5KS5yZXBsYWNlKCdwYXJzZScsICdnZXQnKSxcblx0ICAgICAgICAgICAgJ30nLFxuXHQgICAgICAgICAgICAnfSddXG5cdCAgICAgICAgZXZhbHVhdG9yUG9vbC5wdXQoJ2R1cGxleDonICsgY2FjaGVJRCwgZ2V0dGVyQm9keS5qb2luKCdcXG4nKSlcblx0ICAgICAgICAvL+e7mXZt5ZCM5q2l5p+Q5Liq5bGe5oCnXG5cdCAgICAgICAgdmFyIHNldHRlckJvZHkgPSBbXG5cdCAgICAgICAgICAgICdmdW5jdGlvbiAoX192bW9kZWxfXyxfX3ZhbHVlX18peycsXG5cdCAgICAgICAgICAgICd0cnl7Jyxcblx0ICAgICAgICAgICAgJ1xcdCcgKyBib2R5ICsgJyA9IF9fdmFsdWVfXycsXG5cdCAgICAgICAgICAgICd9Y2F0Y2goZSl7Jyxcblx0ICAgICAgICAgICAgcXVvdGVFcnJvcihzdHIsIGNhdGVnb3J5KS5yZXBsYWNlKCdwYXJzZScsICdzZXQnKSxcblx0ICAgICAgICAgICAgJ30nLFxuXHQgICAgICAgICAgICAnfSddXG5cdCAgICAgICAgZXZhbHVhdG9yUG9vbC5wdXQoJ2R1cGxleDpzZXQ6JyArIGNhY2hlSUQsIHNldHRlckJvZHkuam9pbignXFxuJykpXG5cdCAgICAgICAgLy/lr7nmn5DkuKrlgLzov5vooYzmoLzlvI/ljJZcblx0ICAgICAgICBpZiAoaW5wdXQubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIHZhciBmb3JtYXRCb2R5ID0gW1xuXHQgICAgICAgICAgICAgICAgJ2Z1bmN0aW9uIChfX3Ztb2RlbF9fLCBfX3ZhbHVlX18peycsXG5cdCAgICAgICAgICAgICAgICAndHJ5eycsXG5cdCAgICAgICAgICAgICAgICBmaWx0ZXJzLmpvaW4oJ1xcbicpLFxuXHQgICAgICAgICAgICAgICAgJ3JldHVybiBfX3ZhbHVlX19cXG4nLFxuXHQgICAgICAgICAgICAgICAgJ31jYXRjaChlKXsnLFxuXHQgICAgICAgICAgICAgICAgcXVvdGVFcnJvcihzdHIsIGNhdGVnb3J5KS5yZXBsYWNlKCdwYXJzZScsICdmb3JtYXQnKSxcblx0ICAgICAgICAgICAgICAgICd9Jyxcblx0ICAgICAgICAgICAgICAgICd9J11cblx0ICAgICAgICAgICAgZXZhbHVhdG9yUG9vbC5wdXQoJ2R1cGxleDpmb3JtYXQ6JyArIGNhY2hlSUQsIGZvcm1hdEJvZHkuam9pbignXFxuJykpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiAgZXZhbHVhdG9yUG9vbC5nZXQoJ2R1cGxleDonICsgY2FjaGVJRClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcmV0ID0gW1xuXHQgICAgICAgICAgICAnKGZ1bmN0aW9uKCl7Jyxcblx0ICAgICAgICAgICAgJ3RyeXsnLFxuXHQgICAgICAgICAgICAndmFyIF9fdmFsdWVfXyA9ICcgKyBib2R5LFxuXHQgICAgICAgICAgICAoY2F0ZWdvcnkgPT09ICd0ZXh0JyA/XG5cdCAgICAgICAgICAgICAgICAgICAgJ3JldHVybiBhdmFsb24ucGFyc2Vycy5zdHJpbmcoX192YWx1ZV9fKScgOlxuXHQgICAgICAgICAgICAgICAgICAgICdyZXR1cm4gX192YWx1ZV9fJyksXG5cdCAgICAgICAgICAgICd9Y2F0Y2goZSl7Jyxcblx0ICAgICAgICAgICAgcXVvdGVFcnJvcihzdHIsIGNhdGVnb3J5KSxcblx0ICAgICAgICAgICAgJ1xcdHJldHVybiBcIlwiJyxcblx0ICAgICAgICAgICAgJ30nLFxuXHQgICAgICAgICAgICAnfSkoKSdcblx0ICAgICAgICBdXG5cdCAgICAgICAgZmlsdGVycy51bnNoaWZ0KDMsIDApXG5cdCAgICB9XG5cdCAgICByZXQuc3BsaWNlLmFwcGx5KHJldCwgZmlsdGVycylcblx0ICAgIGNhY2hlU3RyID0gcmV0LmpvaW4oJ1xcbicpXG5cdCAgICBldmFsdWF0b3JQb29sLnB1dChjYXRlZ29yeSArICc6JyArIGNhY2hlSUQsIGNhY2hlU3RyKVxuXHQgICAgcmV0dXJuIGNhY2hlU3RyXG5cblx0fVxuXG5cdGZ1bmN0aW9uIHF1b3RlRXJyb3Ioc3RyLCB0eXBlKSB7XG5cdCAgICByZXR1cm4gJ1xcdGF2YWxvbi53YXJuKGUsICcgK1xuXHQgICAgICAgICAgICBhdmFsb24ucXVvdGUoJ3BhcnNlICcgKyB0eXBlICsgJyBiaW5kaW5n44CQICcgKyBzdHIgKyAnIOOAkWZhaWwnKVxuXHQgICAgICAgICAgICArICcpJ1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdmFsb24ucGFyc2VFeHByID0gcGFyc2VFeHByXG5cblxuXG5cbi8qKiovIH0sXG4vKiA3NCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHJldCA9IF9fd2VicGFja19yZXF1aXJlX18oNzUpXG5cdHZhciBmaXJlRGlzcG9zZUhvb2sgPSByZXQuZmlyZURpc3Bvc2VIb29rXG5cdHZhciBmaXJlRGlzcG9zZUhvb2tzID0gcmV0LmZpcmVEaXNwb3NlSG9va3Ncblx0dmFyIGZpcmVEaXNwb3NlSG9va0RlbGF5ID0gcmV0LmZpcmVEaXNwb3NlSG9va0RlbGF5XG5cblxuXHQvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTE0MjUyMDkvYXJlLWRvbS1tdXRhdGlvbi1vYnNlcnZlcnMtc2xvd2VyLXRoYW4tZG9tLW11dGF0aW9uLWV2ZW50c1xuXHQvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzE3OTg4MTYvc2ltcGxlLW11dGF0aW9ub2JzZXJ2ZXItdmVyc2lvbi1vZi1kb21ub2RlcmVtb3ZlZGZyb21kb2N1bWVudFxuXHRmdW5jdGlvbiBieU11dGF0aW9uRXZlbnQoZG9tKSB7XG5cdCAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcihcIkRPTU5vZGVSZW1vdmVkRnJvbURvY3VtZW50XCIsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmaXJlRGlzcG9zZUhvb2tEZWxheShkb20pXG5cdCAgICB9KVxuXHR9XG5cdC8v55So5LqOSUU4KywgZmlyZWZveFxuXHRmdW5jdGlvbiBieVJld3JpdGVQcm90b3R5cGUoKSB7XG5cdCAgICBpZiAoYnlSZXdyaXRlUHJvdG90eXBlLmV4ZWN1dGUpIHtcblx0ICAgICAgICByZXR1cm5cblx0ICAgIH1cblx0Ly9odHRwczovL3d3dy53ZWItdGlua2VyLmNvbS9hcnRpY2xlLzIwNjE4Lmh0bWw/dXRtX3NvdXJjZT10dWljb29sJnV0bV9tZWRpdW09cmVmZXJyYWxcblx0Ly9JRTYtOOiZveeEtuaatOmcsuS6hkVsZW1lbnQucHJvdG90eXBlLOS9huaXoOazlemHjeWGmeW3suacieeahERPTSBBUElcblx0ICAgIGJ5UmV3cml0ZVByb3RvdHlwZS5leGVjdXRlID0gdHJ1ZVxuXHQgICAgdmFyIHAgPSBOb2RlLnByb3RvdHlwZVxuXHQgICAgZnVuY3Rpb24gcmV3aXRlKG5hbWUsIGZuKSB7XG5cdCAgICAgICAgdmFyIGNiID0gcFtuYW1lXVxuXHQgICAgICAgIHBbbmFtZV0gPSBmdW5jdGlvbiAoYSwgYikge1xuXHQgICAgICAgICAgICByZXR1cm4gIGZuLmNhbGwodGhpcywgY2IsIGEsIGIpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV3aXRlKCdyZW1vdmVDaGlsZCcsIGZ1bmN0aW9uIChmbiwgYSwgYikge1xuXHQgICAgICAgIGZuLmNhbGwodGhpcywgYSwgYilcblx0ICAgICAgICBpZiAoYS5ub2RlVHlwZSA9PT0gMSkge1xuXHQgICAgICAgICAgICBmaXJlRGlzcG9zZUhvb2tEZWxheShhKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYVxuXHQgICAgfSlcblxuXHQgICAgcmV3aXRlKCdyZXBsYWNlQ2hpbGQnLCBmdW5jdGlvbiAoZm4sIGEsIGIpIHtcblx0ICAgICAgICBmbi5jYWxsKHRoaXMsIGEsIGIpXG5cdCAgICAgICAgaWYgKGEubm9kZVR5cGUgPT09IDEpIHtcblx0ICAgICAgICAgICAgZmlyZURpc3Bvc2VIb29rRGVsYXkoYSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGFcblx0ICAgIH0pXG5cdCAgICAvL+iuv+mXruWZqOWxnuaAp+mcgOimgeeUqGdldE93blByb3BlcnR5RGVzY3JpcHRvcuWkhOeQhlxuXHQgICAgdmFyIGVwID0gRWxlbWVudC5wcm90b3R5cGUsIG9sZFNldHRlclxuXHQgICAgZnVuY3Rpb24gbmV3U2V0dGVyKGh0bWwpIHtcblx0ICAgICAgICB2YXIgYWxsID0gYXZhbG9uLnNsaWNlKHRoaXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKSlcblx0ICAgICAgICBvbGRTZXR0ZXIuY2FsbCh0aGlzLCBodG1sKVxuXHQgICAgICAgIGZpcmVEaXNwb3NlSG9va3MoYWxsKVxuXHQgICAgfVxuXHQgICAgaWYgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKSB7XG5cdCAgICAgICAgb2xkU2V0dGVyID0gZXAuX19sb29rdXBTZXR0ZXJfXygnaW5uZXJIVE1MJylcblx0ICAgICAgICBlcC5fX2RlZmluZVNldHRlcl9fKCdpbm5lckhUTUwnLCBuZXdTZXR0ZXIpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZhciBvYmogPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGVwLCAnaW5uZXJIVE1MJylcblx0ICAgICAgICBvbGRTZXR0ZXIgPSBvYmouc2V0XG5cdCAgICAgICAgb2JqLnNldCA9IG5ld1NldHRlclxuXHQgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcCwgJ2lubmVySFRNTCcsIG9iailcblx0ICAgIH1cblxuXHQgICAgcmV3aXRlKCdhcHBlbmRDaGlsZCcsIGZ1bmN0aW9uIChmbiwgYSkge1xuXHQgICAgICAgIGZuLmNhbGwodGhpcywgYSlcblx0ICAgICAgICBpZiAoYS5ub2RlVHlwZSA9PT0gMSAmJiB0aGlzLm5vZGVUeXBlID09PSAxMSkge1xuXHQgICAgICAgICAgICBmaXJlRGlzcG9zZUhvb2tEZWxheShhKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYVxuXHQgICAgfSlcblxuXHQgICAgcmV3aXRlKCdpbnNlcnRCZWZvcmUnLCBmdW5jdGlvbiAoZm4sIGEsIGIpIHtcblx0ICAgICAgICBmbi5jYWxsKHRoaXMsIGEsIGIpXG5cdCAgICAgICAgaWYgKGEubm9kZVR5cGUgPT09IDEgJiYgdGhpcy5ub2RlVHlwZSA9PT0gMTEpIHtcblx0ICAgICAgICAgICAgZmlyZURpc3Bvc2VIb29rRGVsYXkoYSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGFcblx0ICAgIH0pXG5cdH1cblxuXHQvL+eUqOS6jklFNn44XG5cdHZhciBjaGVja0Rpc3Bvc2VOb2RlcyA9IFtdXG5cdHZhciBjaGVja0lEID0gMFxuXHRmdW5jdGlvbiBieVBvbGxpbmcoZG9tKSB7XG5cdCAgICBhdmFsb24uQXJyYXkuZW5zdXJlKGNoZWNrRGlzcG9zZU5vZGVzLCBkb20pXG5cdCAgICBpZiAoIWNoZWNrSUQpIHtcblx0ICAgICAgICBjaGVja0lEID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gY2hlY2tEaXNwb3NlTm9kZXNbaV07ICkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGZhbHNlID09PSBmaXJlRGlzcG9zZUhvb2soZWwpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYXZhbG9uLkFycmF5LnJlbW92ZUF0KGNoZWNrRGlzcG9zZU5vZGVzLCBpKVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBpKytcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoY2hlY2tEaXNwb3NlTm9kZXMubGVuZ3RoID09IDApIHtcblx0ICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2tJRClcblx0ICAgICAgICAgICAgICAgIGNoZWNrSUQgPSAwXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LCA3MDApXG5cdCAgICB9XG5cdH1cblxuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb25Db21wb25lbnREaXNwb3NlKGRvbSkge1xuXHQgICAgaWYgKHdpbmRvdy5jaHJvbWUgJiYgd2luZG93Lk11dGF0aW9uRXZlbnQpIHtcblx0ICAgICAgICBieU11dGF0aW9uRXZlbnQoZG9tKVxuXHQgICAgfSBlbHNlIGlmIChhdmFsb24ubW9kZXJuICYmIHR5cGVvZiB3aW5kb3cuTm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIGJ5UmV3cml0ZVByb3RvdHlwZShkb20pXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGJ5UG9sbGluZyhkb20pXG5cdCAgICB9XG5cdH1cblxuXG5cbi8qKiovIH0sXG4vKiA3NSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0ZnVuY3Rpb24gaW5Eb21UcmVlKGVsKSB7XG5cdCAgICB3aGlsZSAoZWwpIHtcblx0ICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IDkpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWVcblx0ICAgICAgICB9XG5cdCAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlXG5cdCAgICB9XG5cdCAgICByZXR1cm4gZmFsc2Vcblx0fVxuXG5cdGZ1bmN0aW9uIGZpcmVEaXNwb3NlSG9vayhlbCkge1xuXHQgICAgaWYgKGVsLm5vZGVUeXBlID09PSAxICYmIGVsLmdldEF0dHJpYnV0ZSgnd2lkJykgJiYgIWluRG9tVHJlZShlbCkpIHtcblx0ICAgICAgICB2YXIgd2lkID0gZWwuZ2V0QXR0cmlidXRlKCd3aWQnKVxuXHQgICAgICAgIHZhciBkb2NrZXIgPSBhdmFsb24uc2NvcGVzWyB3aWQgXVxuXHQgICAgICAgIGlmICghZG9ja2VyKVxuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB2YXIgdm0gPSBkb2NrZXIudm1vZGVsXG5cdCAgICAgICAgZG9ja2VyLnZtb2RlbC4kZmlyZShcIm9uRGlzcG9zZVwiLCB7XG5cdCAgICAgICAgICAgIHR5cGU6ICdkaXNwb3NlJyxcblx0ICAgICAgICAgICAgdGFyZ2V0OiBlbCxcblx0ICAgICAgICAgICAgdm1vZGVsOiB2bVxuXHQgICAgICAgIH0pXG5cdCAgICAgICAgaWYgKGRvY2tlciAmJiAhZWwuZ2V0QXR0cmlidXRlKCdjYWNoZWQnKSkge1xuXHQgICAgICAgICAgICBkZWxldGUgZG9ja2VyLnZtb2RlbFxuXHQgICAgICAgICAgICBkZWxldGUgYXZhbG9uLnNjb3Blc1sgd2lkIF1cblx0ICAgICAgICAgICAgdmFyIGlzID0gZWwuZ2V0QXR0cmlidXRlKCdpcycpXG5cdCAgICAgICAgICAgIHZhciB2ID0gZWwudnRyZWVcblx0ICAgICAgICAgICAgZGV0YWNoRXZlbnRzKHYpXG5cdCAgICAgICAgICAgIGlmICh2KSB7XG5cdCAgICAgICAgICAgICAgICB2WzBdW2lzICsgJy1tb3VudCddID0gZmFsc2Vcblx0ICAgICAgICAgICAgICAgIHZbMF1bJ2NvbXBvbmVudC1yZWFkeTonICsgaXNdID0gZmFsc2Vcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH1cblx0fVxuXHRmdW5jdGlvbiBkZXRhY2hFdmVudHMoYXJyKSB7XG5cdCAgICBmb3IgKHZhciBpIGluIGFycikge1xuXHQgICAgICAgIHZhciBlbCA9IGFycltpXVxuXHQgICAgICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gMSkge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpIGluIGVsKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaS5pbmRleE9mKCdtcy1vbicpID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVsW2ldXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGVsLmNoaWxkcmVuKSB7XG5cdCAgICAgICAgICAgICAgICBkZXRhY2hFdmVudHMoZWwuY2hpbGRyZW4pXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblx0ZnVuY3Rpb24gZmlyZURpc3Bvc2VIb29rRGVsYXkoYSkge1xuXHQgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZmlyZURpc3Bvc2VIb29rKGEpXG5cdCAgICB9LCA0KVxuXHR9XG5cdGZ1bmN0aW9uIGZpcmVEaXNwb3NlSG9va3Mobm9kZXMpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSBub2Rlc1tpKytdOyApIHtcblx0ICAgICAgICBmaXJlRGlzcG9zZUhvb2soZWwpXG5cdCAgICB9XG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICBmaXJlRGlzcG9zZUhvb2tEZWxheTogZmlyZURpc3Bvc2VIb29rRGVsYXksXG5cdCAgICBmaXJlRGlzcG9zZUhvb2tzOiBmaXJlRGlzcG9zZUhvb2tzLFxuXHQgICAgZmlyZURpc3Bvc2VIb29rOiBmaXJlRGlzcG9zZUhvb2tcblx0fVxuXG4vKioqLyB9LFxuLyogNzYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICogYXZhbG9u5Z+65LqO57qv5YeA55qET2JqZWN0LmRlZmluZVByb3BlcnRpZXPnmoR2beW3peWOgiBcblx0ICogbWFzdGVyRmFjdG9yeSxzbGF2ZUZhY3RvcnksbWVkaWF0b3JGYWN0b3J5LCBBcnJheUZhY3Rvcnlcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqL1xuXG5cdHZhciBzaGFyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNzcpXG5cdHZhciBjcmVhdGVWaWV3TW9kZWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgxKVxuXG5cdHZhciBpc1NraXAgPSBzaGFyZS5pc1NraXBcblx0dmFyIHRvSnNvbiA9IHNoYXJlLnRvSnNvblxuXHR2YXIgJCRtaWR3YXkgPSBzaGFyZS4kJG1pZHdheVxuXHR2YXIgJCRza2lwQXJyYXkgPSBzaGFyZS4kJHNraXBBcnJheVxuXG5cdHZhciBtYWtlQWNjZXNzb3IgPSBzaGFyZS5tYWtlQWNjZXNzb3Jcblx0dmFyIGluaXRWaWV3TW9kZWwgPSBzaGFyZS5pbml0Vmlld01vZGVsXG5cdHZhciBtb2RlbEFjY2Vzc29yID0gc2hhcmUubW9kZWxBY2Nlc3NvclxuXHR2YXIgbW9kZWxBZGFwdG9yID0gc2hhcmUubW9kZWxBZGFwdG9yXG5cdHZhciBtYWtlSGFzaENvZGUgPSBhdmFsb24ubWFrZUhhc2hDb2RlXG5cblxuXHQvL+S4gOS4qnZt5oC75piv5Li6T2JzZXJ2ZXLnmoTlrp7kvotcblx0ZnVuY3Rpb24gT2JzZXJ2ZXIoKSB7XG5cdH1cblxuXHRmdW5jdGlvbiBtYXN0ZXJGYWN0b3J5KGRlZmluaXRpb24sIGhlaXJsb29tLCBvcHRpb25zKSB7XG5cblx0ICAgIHZhciAkc2tpcEFycmF5ID0ge31cblx0ICAgIGlmIChkZWZpbml0aW9uLiRza2lwQXJyYXkpIHsvL+aUtumbhuaJgOacieS4jeWPr+ebkeWQrOWxnuaAp1xuXHQgICAgICAgICRza2lwQXJyYXkgPSBhdmFsb24ub25lT2JqZWN0KGRlZmluaXRpb24uJHNraXBBcnJheSlcblx0ICAgICAgICBkZWxldGUgZGVmaW5pdGlvbi4kc2tpcEFycmF5XG5cdCAgICB9XG5cblx0ICAgIHZhciBrZXlzID0ge31cblx0ICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cdCAgICBoZWlybG9vbSA9IGhlaXJsb29tIHx8IHt9XG5cdCAgICB2YXIgYWNjZXNzb3JzID0ge31cblx0ICAgIHZhciBoYXNoY29kZSA9IG1ha2VIYXNoQ29kZSgnJCcpXG5cdCAgICB2YXIgcGF0aG5hbWUgPSBvcHRpb25zLnBhdGhuYW1lIHx8ICcnXG5cdCAgICBvcHRpb25zLmlkID0gb3B0aW9ucy5pZCB8fCBoYXNoY29kZVxuXHQgICAgb3B0aW9ucy5oYXNoY29kZSA9IG9wdGlvbnMuaGFzaGNvZGUgfHwgaGFzaGNvZGVcblx0ICAgIHZhciBrZXksIHNpZCwgc3BhdGhcblx0ICAgIGZvciAoa2V5IGluIGRlZmluaXRpb24pIHtcblx0ICAgICAgICBpZiAoJCRza2lwQXJyYXlba2V5XSlcblx0ICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICB2YXIgdmFsID0ga2V5c1trZXldID0gZGVmaW5pdGlvbltrZXldXG5cdCAgICAgICAgaWYgKCFpc1NraXAoa2V5LCB2YWwsICRza2lwQXJyYXkpKSB7XG5cdCAgICAgICAgICAgIHNpZCA9IG9wdGlvbnMuaWQgKyAnLicgKyBrZXlcblx0ICAgICAgICAgICAgc3BhdGggPSBwYXRobmFtZSA/IHBhdGhuYW1lICsgJy4nICsga2V5IDoga2V5XG5cdCAgICAgICAgICAgIGFjY2Vzc29yc1trZXldID0gbWFrZUFjY2Vzc29yKHNpZCwgc3BhdGgsIGhlaXJsb29tKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgYWNjZXNzb3JzLiRtb2RlbCA9IG1vZGVsQWNjZXNzb3Jcblx0ICAgIHZhciAkdm1vZGVsID0gbmV3IE9ic2VydmVyKClcblx0ICAgICR2bW9kZWwgPSBjcmVhdGVWaWV3TW9kZWwoJHZtb2RlbCwgYWNjZXNzb3JzLCBkZWZpbml0aW9uKVxuXG5cdCAgICBmb3IgKGtleSBpbiBrZXlzKSB7XG5cdCAgICAgICAgLy/lr7nmma7pgJrnm5HmjqflsZ7mgKfmiJborr/pl67lmajlsZ7mgKfov5vooYzotYvlgLxcblx0ICAgICAgICAkdm1vZGVsW2tleV0gPSBrZXlzW2tleV1cblxuXHQgICAgICAgIC8v5Yig6Zmk57O757uf5bGe5oCnXG5cdCAgICAgICAgaWYgKGtleSBpbiAkc2tpcEFycmF5KSB7XG5cdCAgICAgICAgICAgIGRlbGV0ZSBrZXlzW2tleV1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBrZXlzW2tleV0gPSB0cnVlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgaW5pdFZpZXdNb2RlbCgkdm1vZGVsLCBoZWlybG9vbSwga2V5cywgYWNjZXNzb3JzLCBvcHRpb25zKVxuXG5cdCAgICByZXR1cm4gJHZtb2RlbFxuXHR9XG5cblx0JCRtaWR3YXkubWFzdGVyRmFjdG9yeSA9IG1hc3RlckZhY3Rvcnlcblx0dmFyIGVtcHR5ID0ge31cblx0ZnVuY3Rpb24gc2xhdmVGYWN0b3J5KGJlZm9yZSwgYWZ0ZXIsIGhlaXJsb29tLCBvcHRpb25zKSB7XG5cdCAgICB2YXIga2V5cyA9IHt9XG5cdCAgICB2YXIgc2tpcHMgPSB7fVxuXHQgICAgdmFyIGFjY2Vzc29ycyA9IHt9XG5cdCAgICBoZWlybG9vbSA9IGhlaXJsb29tIHx8IHt9XG5cdCAgICB2YXIgcGF0aG5hbWUgPSBvcHRpb25zLnBhdGhuYW1lXG5cdCAgICB2YXIgcmVzdWUgPSBiZWZvcmUuJGFjY2Vzc29ycyB8fCB7fVxuXHQgICAgdmFyIGtleSwgc2lkLCBzcGF0aFxuXHQgICAgZm9yIChrZXkgaW4gYWZ0ZXIpIHtcblx0ICAgICAgICBpZiAoJCRza2lwQXJyYXlba2V5XSlcblx0ICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICBrZXlzW2tleV0gPSB0cnVlLy/ljIXmi6zlj6/nm5HmjqfkuI7kuI3lj6/nm5HmjqfnmoRcblx0ICAgICAgICBpZiAoIWlzU2tpcChrZXksIGFmdGVyW2tleV0sIGVtcHR5KSkge1xuXHQgICAgICAgICAgICBpZiAocmVzdWVba2V5XSkge1xuXHQgICAgICAgICAgICAgICAgYWNjZXNzb3JzW2tleV0gPSByZXN1ZVtrZXldXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBzaWQgPSBvcHRpb25zLmlkICsgJy4nICsga2V5XG5cdCAgICAgICAgICAgICAgICBzcGF0aCA9IHBhdGhuYW1lID8gcGF0aG5hbWUgKyAnLicgKyBrZXkgOiBrZXlcblx0ICAgICAgICAgICAgICAgIGFjY2Vzc29yc1trZXldID0gbWFrZUFjY2Vzc29yKHNpZCwgc3BhdGgsIGhlaXJsb29tKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgc2tpcHNba2V5XSA9IGFmdGVyW2tleV1cblx0ICAgICAgICAgICAgZGVsZXRlIGFmdGVyW2tleV1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIG9wdGlvbnMuaGFzaGNvZGUgPSBiZWZvcmUuJGhhc2hjb2RlIHx8IG1ha2VIYXNoQ29kZSgnJCcpXG5cdCAgICBhY2Nlc3NvcnMuJG1vZGVsID0gbW9kZWxBY2Nlc3NvclxuXHQgICAgdmFyICR2bW9kZWwgPSBuZXcgT2JzZXJ2ZXIoKVxuXHQgICAgJHZtb2RlbCA9IGNyZWF0ZVZpZXdNb2RlbCgkdm1vZGVsLCBhY2Nlc3NvcnMsIHNraXBzKVxuXG5cdCAgICBmb3IgKGtleSBpbiBza2lwcykge1xuXHQgICAgICAgICR2bW9kZWxba2V5XSA9IHNraXBzW2tleV1cblx0ICAgIH1cblxuXHQgICAgaW5pdFZpZXdNb2RlbCgkdm1vZGVsLCBoZWlybG9vbSwga2V5cywgYWNjZXNzb3JzLCBvcHRpb25zKVxuXG5cdCAgICByZXR1cm4gJHZtb2RlbFxuXHR9XG5cblx0JCRtaWR3YXkuc2xhdmVGYWN0b3J5ID0gc2xhdmVGYWN0b3J5XG5cblx0ZnVuY3Rpb24gbWVkaWF0b3JGYWN0b3J5KGJlZm9yZSwgYWZ0ZXIpIHtcblx0ICAgIHZhciBrZXlzID0ge30sIGtleVxuXHQgICAgdmFyIGFjY2Vzc29ycyA9IHt9Ly/mlrB2beeahOiuv+mXruWZqFxuXHQgICAgdmFyIHVucmVzb2x2ZSA9IHt9Ly/pnIDopoHovazmjaLnmoTlsZ7mgKfpm4blkIhcblx0ICAgIHZhciBoZWlybG9vbSA9IHt9XG5cdCAgICB2YXIgYXJyID0gYXZhbG9uLnNsaWNlKGFyZ3VtZW50cylcblx0ICAgIHZhciAkc2tpcEFycmF5ID0ge31cblx0ICAgIHZhciBpc1dpZGdldCA9IHR5cGVvZiB0aGlzID09PSAnZnVuY3Rpb24nICYmIHRoaXMuaXNXaWRnZXRcblx0ICAgIHZhciBjb25maWdcblx0ICAgIHZhciBjb25maWdOYW1lXG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgIHZhciBvYmogPSBhcnJbaV1cblx0ICAgICAgICAvL+aUtumbhuaJgOaciemUruWAvOWvueWPiuiuv+mXruWZqOWxnuaAp1xuXHQgICAgICAgIHZhciAkYWNjZXNzb3JzID0gb2JqLiRhY2Nlc3NvcnNcblx0ICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdCAgICAgICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0ICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIGN1ciA9IG9ialtrZXldXG5cdCAgICAgICAgICAgIGlmIChrZXkgPT09ICckc2tpcEFycmF5Jykgey8v5aSE55CGJHNraXBBcnJheVxuXHQgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3VyKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGN1ci5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAkc2tpcEFycmF5W2VsXSA9IDFcblx0ICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIGlmIChpc1dpZGdldCAmJiBhcnIuaW5kZXhPZihjdXIpICE9PSAtMSkgey8v5aSE55CG6YWN572u5a+56LGhXG5cdCAgICAgICAgICAgICAgICBjb25maWcgPSBjdXJcblx0ICAgICAgICAgICAgICAgIGNvbmZpZ05hbWUgPSBrZXlcblx0ICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBrZXlzW2tleV0gPSBjdXJcblx0ICAgICAgICAgICAgaWYgKGFjY2Vzc29yc1trZXldICYmIGF2YWxvbi5pc09iamVjdChjdXIpKSB7Ly/lpITnkIblrZB2bVxuXHQgICAgICAgICAgICAgICAgZGVsZXRlIGFjY2Vzc29yc1trZXldXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKCRhY2Nlc3NvcnMgJiYgJGFjY2Vzc29yc1trZXldKSB7XG5cdCAgICAgICAgICAgICAgICBhY2Nlc3NvcnNba2V5XSA9ICRhY2Nlc3NvcnNba2V5XVxuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBrZXlzW2tleV0gIT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgIHVucmVzb2x2ZVtrZXldID0gMVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cblx0ICAgIGlmICh0eXBlb2YgdGhpcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRoaXMoa2V5cywgdW5yZXNvbHZlKVxuXHQgICAgfVxuXHQgICAgZm9yIChrZXkgaW4gdW5yZXNvbHZlKSB7XG5cdCAgICAgICAgLy/ns7vnu5/lsZ7mgKfot7Pov4cs5bey57uP5pyJ6K6/6Zeu5Zmo55qE5bGe5oCn6Lez6L+HXG5cdCAgICAgICAgaWYgKCQkc2tpcEFycmF5W2tleV0gfHwgYWNjZXNzb3JzW2tleV0pXG5cdCAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgaWYgKCFpc1NraXAoa2V5LCBrZXlzW2tleV0sICRza2lwQXJyYXkpKSB7XG5cdCAgICAgICAgIFxuXHQgICAgICAgICAgICBhY2Nlc3NvcnNba2V5XSA9IG1ha2VBY2Nlc3NvcihiZWZvcmUuJGlkLCBrZXksIGhlaXJsb29tKVxuXHQgICAgICAgICAgICBhY2Nlc3NvcnNba2V5XS5zZXQoa2V5c1trZXldKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgdmFyICR2bW9kZWwgPSBuZXcgT2JzZXJ2ZXIoKVxuXHQgICAgJHZtb2RlbCA9IGNyZWF0ZVZpZXdNb2RlbCgkdm1vZGVsLCBhY2Nlc3NvcnMsIGtleXMpXG5cdCAgICBmb3IgKGtleSBpbiBrZXlzKSB7XG5cdCAgICAgICAgaWYgKCFhY2Nlc3NvcnNba2V5XSkgey8v5re75Yqg5LiN5Y+v55uR5o6n55qE5bGe5oCnXG5cdCAgICAgICAgICAgXG5cdCAgICAgICAgICAgICR2bW9kZWxba2V5XSA9IGtleXNba2V5XVxuXHQgICAgICAgIH1cblx0ICAgICAgICAvL+eUqOS6jumAmui/h+mFjee9ruWvueixoeinpuWPkee7hOS7tueahCR3YXRjaOWbnuiwg1xuXHQgICAgICAgIGlmIChpc1dpZGdldCAmJiBjb25maWcgJiYgYWNjZXNzb3JzW2tleV0gJiYgY29uZmlnLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0ICAgICAgICAgICAgdmFyIEdFVCA9IGFjY2Vzc29yc1trZXldLmdldFxuXHQgICAgICAgICAgLy8gIEdFVC5oZWlybG9vbSA9IGhlaXJsb29tXG5cdCAgICAgICAgICAgIGlmICghR0VULiRkZWNvbXBvc2UpIHtcblx0ICAgICAgICAgICAgICAgIEdFVC4kZGVjb21wb3NlID0ge31cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBHRVQuJGRlY29tcG9zZVtjb25maWdOYW1lICsgJy4nICsga2V5XSA9ICR2bW9kZWxcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAoa2V5IGluICQkc2tpcEFycmF5KSB7XG5cdCAgICAgICAgICAgIGRlbGV0ZSBrZXlzW2tleV1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBrZXlzW2tleV0gPSB0cnVlXG5cdCAgICAgICAgfVxuXG5cdCAgICB9XG5cblx0ICAgIGluaXRWaWV3TW9kZWwoJHZtb2RlbCwgaGVpcmxvb20sIGtleXMsIGFjY2Vzc29ycywge1xuXHQgICAgICAgIGlkOiBiZWZvcmUuJGlkLFxuXHQgICAgICAgIGhhc2hjb2RlOiBtYWtlSGFzaENvZGUoJyQnKSxcblx0ICAgICAgICBtYXN0ZXI6IHRydWVcblx0ICAgIH0pXG5cblx0ICAgIHJldHVybiAkdm1vZGVsXG5cdH1cblxuXG5cdCQkbWlkd2F5Lm1lZGlhdG9yRmFjdG9yeSA9IGF2YWxvbi5tZWRpYXRvckZhY3RvcnkgPSBtZWRpYXRvckZhY3RvcnlcblxuXHR2YXIgX19hcnJheV9fID0gc2hhcmUuX19hcnJheV9fXG5cblxuXHR2YXIgYXAgPSBBcnJheS5wcm90b3R5cGVcblx0dmFyIF9zcGxpY2UgPSBhcC5zcGxpY2Vcblx0ZnVuY3Rpb24gbm90aWZ5U2l6ZShhcnJheSwgc2l6ZSkge1xuXHQgICAgaWYgKGFycmF5Lmxlbmd0aCAhPT0gc2l6ZSkge1xuXHQgICAgICAgIGFycmF5Lm5vdGlmeSgnbGVuZ3RoJywgYXJyYXkubGVuZ3RoLCBzaXplLCB0cnVlKVxuXHQgICAgfVxuXHR9XG5cblx0X19hcnJheV9fLnJlbW92ZUFsbCA9IGZ1bmN0aW9uIChhbGwpIHsgLy/np7vpmaRO5Liq5YWD57SgXG5cdCAgICB2YXIgc2l6ZSA9IHRoaXMubGVuZ3RoXG5cdCAgICBpZiAoQXJyYXkuaXNBcnJheShhbGwpKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0ICAgICAgICAgICAgaWYgKGFsbC5pbmRleE9mKHRoaXNbaV0pICE9PSAtMSkge1xuXHQgICAgICAgICAgICAgICAgX3NwbGljZS5jYWxsKHRoaXMsIGksIDEpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2UgaWYgKHR5cGVvZiBhbGwgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICBmb3IgKGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdCAgICAgICAgICAgIHZhciBlbCA9IHRoaXNbaV1cblx0ICAgICAgICAgICAgaWYgKGFsbChlbCwgaSkpIHtcblx0ICAgICAgICAgICAgICAgIF9zcGxpY2UuY2FsbCh0aGlzLCBpLCAxKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBfc3BsaWNlLmNhbGwodGhpcywgMCwgdGhpcy5sZW5ndGgpXG5cblx0ICAgIH1cblx0ICAgIGlmICghYXZhbG9uLm1vZGVybikge1xuXHQgICAgICAgIHRoaXMuJG1vZGVsID0gdG9Kc29uKHRoaXMpXG5cdCAgICB9XG5cdCAgICBub3RpZnlTaXplKHRoaXMsIHNpemUpXG5cdCAgICB0aGlzLm5vdGlmeSgpXG5cdH1cblxuXG5cdHZhciBfX21ldGhvZF9fID0gWydwdXNoJywgJ3BvcCcsICdzaGlmdCcsICd1bnNoaWZ0JywgJ3NwbGljZSddXG5cblx0X19tZXRob2RfXy5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcblx0ICAgIHZhciBvcmlnaW5hbCA9IGFwW21ldGhvZF1cblx0ICAgIF9fYXJyYXlfX1ttZXRob2RdID0gZnVuY3Rpb24gKGEsIGIpIHtcblx0ICAgICAgICAvLyDnu6fnu63lsJ3or5XliqvmjIHmlbDnu4TlhYPntKDnmoTlsZ7mgKdcblx0ICAgICAgICB2YXIgYXJncyA9IFtdLCBzaXplID0gdGhpcy5sZW5ndGhcblxuXHQgICAgICAgIGlmIChtZXRob2QgPT09ICdzcGxpY2UnICYmIE9iamVjdCh0aGlzWzBdKSA9PT0gdGhpc1swXSkge1xuXHQgICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5zbGljZShhLCBiKVxuXHQgICAgICAgICAgICB2YXIgbmVvID0gYXAuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG5cdCAgICAgICAgICAgIHZhciBhcmdzID0gW2EsIGJdXG5cdCAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBqbiA9IG5lby5sZW5ndGg7IGogPCBqbjsgaisrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IG9sZFtqXVxuXG5cdCAgICAgICAgICAgICAgICBhcmdzW2ogKyAyXSA9IG1vZGVsQWRhcHRvcihuZW9bal0sIGl0ZW0sIChpdGVtICYmIGl0ZW0uJGV2ZW50cyB8fCB7fSksIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy4kaWQgKyAnLionLFxuXHQgICAgICAgICAgICAgICAgICAgIG1hc3RlcjogdHJ1ZVxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBhcmdzW2ldID0gbW9kZWxBZGFwdG9yKGFyZ3VtZW50c1tpXSwgMCwge30sIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy4kaWQgKyAnLionLFxuXHQgICAgICAgICAgICAgICAgICAgIG1hc3RlcjogdHJ1ZVxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcmVzdWx0ID0gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncylcblx0ICAgICAgICBpZiAoIWF2YWxvbi5tb2Rlcm4pIHtcblx0ICAgICAgICAgICAgdGhpcy4kbW9kZWwgPSB0b0pzb24odGhpcylcblx0ICAgICAgICB9XG5cdCAgICAgICAgbm90aWZ5U2l6ZSh0aGlzLCBzaXplKVxuXHQgICAgICAgIHRoaXMubm90aWZ5KClcblx0ICAgICAgICByZXR1cm4gcmVzdWx0XG5cdCAgICB9XG5cdH0pXG5cblx0J3NvcnQscmV2ZXJzZScucmVwbGFjZShhdmFsb24ucndvcmQsIGZ1bmN0aW9uIChtZXRob2QpIHtcblx0ICAgIF9fYXJyYXlfX1ttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGFwW21ldGhvZF0uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHQgICAgICAgIGlmICghYXZhbG9uLm1vZGVybikge1xuXHQgICAgICAgICAgICB0aGlzLiRtb2RlbCA9IHRvSnNvbih0aGlzKVxuXHQgICAgICAgIH1cblx0ICAgICAgICB0aGlzLm5vdGlmeSgpXG5cdCAgICAgICAgcmV0dXJuIHRoaXNcblx0ICAgIH1cblx0fSlcblxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXZhbG9uXG5cdC8v5L2/55So6L+Z5Liq5p2l5omB5bmz5YyW5pWw5o2uICBodHRwczovL2dpdGh1Yi5jb20vZ2FlYXJvbi9ub3JtYWxpenJcblx0Ly/kvb/nlKhQcm9taXNlICBodHRwczovL2dpdGh1Yi5jb20vc3RlZmFucGVubmVyL2VzNi1wcm9taXNlXG5cdC8v5L2/55So6L+Z5LiqQUpBWOW6kyBodHRwczovL2dpdGh1Yi5jb20vbWF0dGhldy1hbmRyZXdzL2lzb21vcnBoaWMtZmV0Y2hcblxuLyoqKi8gfSxcbi8qIDc3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgc2hhcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc4KVxuXHR2YXIgY2FuSGlkZVByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MClcblx0dmFyIGluaXRFdmVudHMgPSBzaGFyZS5pbml0RXZlbnRzXG5cblx0Lypcblx0ICogdG9Kc29uXG5cdCAqIGhpZGVQcm9wZXJ0eVxuXHQgKiBpbml0Vmlld01vZGVsXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHRvSnNvbih2YWwpIHtcblx0ICAgIHZhciB4dHlwZSA9IGF2YWxvbi50eXBlKHZhbClcblx0ICAgIGlmICh4dHlwZSA9PT0gJ2FycmF5Jykge1xuXHQgICAgICAgIHZhciBhcnJheSA9IFtdXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgYXJyYXlbaV0gPSB0b0pzb24odmFsW2ldKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYXJyYXlcblx0ICAgIH0gZWxzZSBpZiAoeHR5cGUgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgdmFyIG9iaiA9IHt9XG5cdCAgICAgICAgZm9yIChpIGluIHZhbCkge1xuXHQgICAgICAgICAgICBpZiAoaSA9PT0gJ19fcHJveHlfXycgfHwgaSA9PT0gJ19fZGF0YV9fJyB8fCBpID09PSAnX19jb25zdF9fJylcblx0ICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgIGlmICh2YWwuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0ICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHZhbFtpXVxuXHQgICAgICAgICAgICAgICAgb2JqW2ldID0gdmFsdWUgJiYgdmFsdWUubm9kZVR5cGUgPyB2YWx1ZSA6IHRvSnNvbih2YWx1ZSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gb2JqXG5cdCAgICB9XG5cdCAgICByZXR1cm4gdmFsXG5cdH1cblxuXHRmdW5jdGlvbiBoaWRlUHJvcGVydHkoaG9zdCwgbmFtZSwgdmFsdWUpIHtcblx0ICAgIGlmIChjYW5IaWRlUHJvcGVydHkpIHtcblx0ICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaG9zdCwgbmFtZSwge1xuXHQgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG5cdCAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuXHQgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcblx0ICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG5cdCAgICAgICAgfSlcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgaG9zdFtuYW1lXSA9IHZhbHVlXG5cdCAgICB9XG5cdH1cblxuXHR2YXIgbW9kZWxBY2Nlc3NvciA9IHtcblx0ICAgIGdldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiB0b0pzb24odGhpcylcblx0ICAgIH0sXG5cdCAgICBzZXQ6IGF2YWxvbi5ub29wLFxuXHQgICAgZW51bWVyYWJsZTogZmFsc2UsXG5cdCAgICBjb25maWd1cmFibGU6IHRydWVcblx0fVxuXG5cdGZ1bmN0aW9uIGluaXRWaWV3TW9kZWwoJHZtb2RlbCwgaGVpcmxvb20sIGtleXMsIGFjY2Vzc29ycywgb3B0aW9ucykge1xuXG5cdCAgICBpZiAob3B0aW9ucy5hcnJheSkge1xuXHQgICAgICAgIGlmIChhdmFsb24ubW9kZXJuKSB7XG5cdCAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkdm1vZGVsLCAnJG1vZGVsJywgbW9kZWxBY2Nlc3Nvcilcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAkdm1vZGVsLiRtb2RlbCA9IHRvSnNvbigkdm1vZGVsKVxuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgZnVuY3Rpb24gaGFzT3duS2V5KGtleSkge1xuXHQgICAgICAgICAgICByZXR1cm4ga2V5c1trZXldID09PSB0cnVlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGhpZGVQcm9wZXJ0eSgkdm1vZGVsLCAnJGFjY2Vzc29ycycsIGFjY2Vzc29ycylcblx0ICAgICAgICBoaWRlUHJvcGVydHkoJHZtb2RlbCwgJ2hhc093blByb3BlcnR5JywgaGFzT3duS2V5KVxuXHQgICAgICAgIGhpZGVQcm9wZXJ0eSgkdm1vZGVsLCAnJHRyYWNrJywgT2JqZWN0LmtleXMoa2V5cykuc29ydCgpLmpvaW4oJzs7JykpXG5cdCAgICB9XG5cdCAgICBoaWRlUHJvcGVydHkoJHZtb2RlbCwgJyRpZCcsIG9wdGlvbnMuaWQpXG5cdCAgICBoaWRlUHJvcGVydHkoJHZtb2RlbCwgJyRoYXNoY29kZScsIG9wdGlvbnMuaGFzaGNvZGUpXG5cdCAgICBpZiAob3B0aW9ucy5tYXN0ZXIgPT09IHRydWUpIHtcblx0ICAgICAgICBoaWRlUHJvcGVydHkoJHZtb2RlbCwgJyRydW4nLCBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHJ1bi5jYWxsKCR2bW9kZWwpXG5cdCAgICAgICAgfSlcblx0ICAgICAgICBoaWRlUHJvcGVydHkoJHZtb2RlbCwgJyR3YWl0JywgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB3YWl0LmNhbGwoJHZtb2RlbClcblx0ICAgICAgICB9KVxuXHQgICAgICAgIGhpZGVQcm9wZXJ0eSgkdm1vZGVsLCAnJGVsZW1lbnQnLCBudWxsKVxuXHQgICAgICAgIGhpZGVQcm9wZXJ0eSgkdm1vZGVsLCAnJHJlbmRlcicsIDApXG5cdCAgICAgICAgaW5pdEV2ZW50cygkdm1vZGVsLCBoZWlybG9vbSlcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIHdhaXQoKSB7XG5cdCAgICB0aGlzLiRldmVudHMuJCR3YWl0JCQgPSB0cnVlXG5cdH1cblxuXHRmdW5jdGlvbiBydW4oKSB7XG5cdCAgICB2YXIgaG9zdCA9IHRoaXMuJGV2ZW50c1xuXHQgICAgZGVsZXRlIGhvc3QuJCR3YWl0JCRcblx0ICAgIGlmIChob3N0LiQkZGlydHkkJCkge1xuXHQgICAgICAgIGRlbGV0ZSBob3N0LiQkZGlydHkkJFxuXHQgICAgICAgIGF2YWxvbi5yZXJlbmRlclN0YXJ0ID0gbmV3IERhdGVcblx0ICAgICAgICB2YXIgaWQgPSB0aGlzLiRpZFxuXHQgICAgICAgIHZhciBkb3RJbmRleCA9IGlkLmluZGV4T2YoJy4nKVxuXHQgICAgICAgIGlmIChkb3RJbmRleCA+IDApIHtcblx0ICAgICAgICAgICAgYXZhbG9uLmJhdGNoKGlkLnNsaWNlKDAsIGRvdEluZGV4KSlcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBhdmFsb24uYmF0Y2goaWQpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0c2hhcmUuJCRtaWR3YXkuaW5pdFZpZXdNb2RlbCA9IGluaXRWaWV3TW9kZWxcblxuXHRzaGFyZS4kJG1pZHdheS5oaWRlUHJvcGVydHkgPSBoaWRlUHJvcGVydHlcblxuXHR2YXIgbWl4aW4gPSB7XG5cdCAgICB0b0pzb246IHRvSnNvbixcblx0ICAgIGluaXRWaWV3TW9kZWw6IGluaXRWaWV3TW9kZWwsXG5cdCAgICBtb2RlbEFjY2Vzc29yOiBtb2RlbEFjY2Vzc29yXG5cdH1cblx0Zm9yICh2YXIgaSBpbiBzaGFyZSkge1xuXHQgICAgbWl4aW5baV0gPSBzaGFyZVtpXVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBtaXhpblxuXG5cbi8qKiovIH0sXG4vKiA3OCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XG5cdHZhciAkJG1pZHdheSA9IHt9XG5cdHZhciAkJHNraXBBcnJheSA9IF9fd2VicGFja19yZXF1aXJlX18oNjMpXG5cdHZhciBkaXNwYXRjaCA9IF9fd2VicGFja19yZXF1aXJlX18oNzkpXG5cdHZhciAkZW1pdCA9IGRpc3BhdGNoLiRlbWl0XG5cdHZhciAkd2F0Y2ggPSBkaXNwYXRjaC4kd2F0Y2hcblx0Lypcblx0ICogaW5pdEV2ZW50c1xuXHQgKiBpc1NraXBcblx0ICogbW9kZWxBZGFwdG9yXG5cdCAqIG1ha2VBY2Nlc3NvclxuXHQgKi9cblxuXHRmdW5jdGlvbiBpbml0RXZlbnRzKCR2bW9kZWwsIGhlaXJsb29tKSB7XG5cdCAgICBoZWlybG9vbS5fX3Ztb2RlbF9fID0gJHZtb2RlbFxuXHQgICAgdmFyIGhpZGUgPSAkJG1pZHdheS5oaWRlUHJvcGVydHlcblxuXHQgICAgaGlkZSgkdm1vZGVsLCAnJGV2ZW50cycsIGhlaXJsb29tKVxuXHQgICAgaGlkZSgkdm1vZGVsLCAnJHdhdGNoJywgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAkd2F0Y2guYXBwbHkoJHZtb2RlbCwgYXJndW1lbnRzKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHRocm93ICckd2F0Y2jmlrnms5Xlj4LmlbDkuI3lr7knXG5cdCAgICAgICAgfVxuXHQgICAgfSlcblx0ICAgIGhpZGUoJHZtb2RlbCwgJyRmaXJlJywgZnVuY3Rpb24gKGV4cHIsIGEsIGIpIHtcblx0ICAgICAgICB2YXIgbGlzdCA9ICR2bW9kZWwuJGV2ZW50c1tleHByXVxuXHQgICAgICAgICRlbWl0KGxpc3QsICR2bW9kZWwsIGV4cHIsIGEsIGIpXG5cdCAgICB9KVxuXHR9XG5cblx0dmFyIHJza2lwID0gL2Z1bmN0aW9ufHdpbmRvd3xkYXRlfHJlZ2V4cHxlbGVtZW50L2lcblxuXHRmdW5jdGlvbiBpc1NraXAoa2V5LCB2YWx1ZSwgc2tpcEFycmF5KSB7XG5cdCAgICAvLyDliKTlrprmraTlsZ7mgKfog73lkKbovazmjaLorr/pl67lmahcblx0ICAgIHJldHVybiBrZXkuY2hhckF0KDApID09PSAnJCcgfHxcblx0ICAgICAgICAgICAgc2tpcEFycmF5W2tleV0gfHxcblx0ICAgICAgICAgICAgKHJza2lwLnRlc3QoYXZhbG9uLnR5cGUodmFsdWUpKSkgfHxcblx0ICAgICAgICAgICAgKHZhbHVlICYmIHZhbHVlLm5vZGVOYW1lICYmIHZhbHVlLm5vZGVUeXBlID4gMClcblx0fVxuXG5cdGZ1bmN0aW9uIG1vZGVsQWRhcHRvcihkZWZpbml0aW9uLCBvbGQsIGhlaXJsb29tLCBvcHRpb25zKSB7XG5cdCAgICAvL+WmguaenOaVsOe7hOi9rOaNouS4uuebkeaOp+aVsOe7hFxuXHQgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbikpIHtcblx0ICAgICAgICByZXR1cm4gJCRtaWR3YXkuYXJyYXlGYWN0b3J5KGRlZmluaXRpb24sIG9sZCwgaGVpcmxvb20sIG9wdGlvbnMpXG5cdCAgICB9IGVsc2UgaWYgKE9iamVjdChkZWZpbml0aW9uKSA9PT0gZGVmaW5pdGlvbiAmJiB0eXBlb2YgZGVmaW5pdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIC8v5aaC5p6c5q2k5bGe5oCn5Y6f5p2l5bCx5piv5LiA5LiqVk0s5ouG5YiG6YeM6Z2i55qE6K6/6Zeu5Zmo5bGe5oCnXG5cdCAgICAgICAgaWYgKG9sZCAmJiBvbGQuJGlkKSB7XG5cdCAgICAgICAgICAgICsrYXZhbG9uLnN1c3BlbmRVcGRhdGVcblx0ICAgICAgICAgICAgLy8xLjXluKbmnaXnmoTkvJjljJbmlrnmoYhcblx0ICAgICAgICAgICAgaWYgKG9sZC4kdHJhY2sgIT09IE9iamVjdC5rZXlzKGRlZmluaXRpb24pLnNvcnQoKS5qb2luKCc7OycpKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgdm0gPSAkJG1pZHdheS5zbGF2ZUZhY3Rvcnkob2xkLCBkZWZpbml0aW9uLCBoZWlybG9vbSwgb3B0aW9ucylcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHZtID0gb2xkXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkZWZpbml0aW9uKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoJCRza2lwQXJyYXlbaV0pXG5cdCAgICAgICAgICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICAgICAgICAgIHZtW2ldID0gZGVmaW5pdGlvbltpXVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC0tYXZhbG9uLnN1c3BlbmRVcGRhdGVcblx0ICAgICAgICAgICAgcmV0dXJuIHZtXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdm0gPSAkJG1pZHdheS5tYXN0ZXJGYWN0b3J5KGRlZmluaXRpb24sIGhlaXJsb29tLCBvcHRpb25zKVxuXHQgICAgICAgICAgICByZXR1cm4gdm1cblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJldHVybiBkZWZpbml0aW9uXG5cdCAgICB9XG5cdH1cblx0JCRtaWR3YXkubW9kZWxBZGFwdG9yID0gbW9kZWxBZGFwdG9yXG5cblxuXHRmdW5jdGlvbiBtYWtlQWNjZXNzb3Ioc2lkLCBzcGF0aCwgaGVpcmxvb20pIHtcblx0ICAgIHZhciBvbGQgPSBOYU5cblx0ICAgIGZ1bmN0aW9uIGdldCgpIHtcblx0ICAgICAgICByZXR1cm4gb2xkXG5cdCAgICB9XG5cdCAgICBnZXQuaGVpcmxvb20gPSBoZWlybG9vbVxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgICBnZXQ6IGdldCxcblx0ICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcblx0ICAgICAgICAgICAgaWYgKG9sZCA9PT0gdmFsKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgdm0gPSBoZWlybG9vbS5fX3Ztb2RlbF9fXG5cdCAgICAgICAgICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcblx0ICAgICAgICAgICAgICAgIHZhbCA9ICQkbWlkd2F5Lm1vZGVsQWRhcHRvcih2YWwsIG9sZCwgaGVpcmxvb20sIHtcblx0ICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogc3BhdGgsXG5cdCAgICAgICAgICAgICAgICAgICAgaWQ6IHNpZFxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgb2xkZXIgPSBvbGRcblx0ICAgICAgICAgICAgb2xkID0gdmFsXG5cdCAgICAgICAgICAgIGlmICh0aGlzLiRoYXNoY29kZSAmJiB2bSApIHtcblx0ICAgICAgICAgICAgICAgIHZtLiRldmVudHMuJCRkaXJ0eSQkID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgaWYodm0uJGV2ZW50cy4kJHdhaXQkJClcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICAgICAgICAgIC8v4piF4piF56Gu5L+d5YiH5o2i5Yiw5paw55qEZXZlbnRz5LitKOi/meS4qmV2ZW50c+WPr+iDveaYr+adpeiHqm9sZFByb3h5KSAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgaWYgKGhlaXJsb29tICE9PSB2bS4kZXZlbnRzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZ2V0LmhlaXJsb29tID0gdm0uJGV2ZW50c1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIC8v5aaC5p6c6L+Z5Liq5bGe5oCn5piv57uE5Lu26YWN572u5a+56LGh5Lit55qE5bGe5oCnLOmCo+S5iOWug+mcgOimgeinpuWPkee7hOS7tueahOWbnuiwg1xuXHQgICAgICAgICAgICAgICAgZW1pdFdpZGdldChnZXQuJGRlY29tcG9zZSwgc3BhdGgsIHZhbCwgb2xkZXIpXG5cdCAgICAgICAgICAgICAgICAvL+inpuWPkeaZrumAmuWxnuaAp+eahOWbnuiwg1xuXHQgICAgICAgICAgICAgICAgaWYgKHNwYXRoLmluZGV4T2YoJyonKSA9PT0gLTEpIHtcblx0ICAgICAgICAgICAgICAgICAgICAkZW1pdChnZXQuaGVpcmxvb21bc3BhdGhdLCB2bSwgc3BhdGgsIHZhbCwgb2xkZXIpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAvL+WmguaenOi/meS4quWxnuaAp+aYr+aVsOe7hOWFg+e0oOS4iueahOWxnuaAp1xuXHQgICAgICAgICAgICAgICAgZW1pdEFycmF5KHNpZCsnJywgdm0sIHNwYXRoLCB2YWwsIG9sZGVyKVxuXHQgICAgICAgICAgICAgICAgLy/lpoLmnpzov5nkuKrlsZ7mgKflrZjlnKjpgJrphY3nrKZcblx0ICAgICAgICAgICAgICAgIGVtaXRXaWxkY2FyZChnZXQuaGVpcmxvb20sIHZtLCBzcGF0aCwgdmFsLCBvbGRlcilcblx0ICAgICAgICAgICAgICAgIHZtLiRldmVudHMuJCRkaXJ0eSQkID0gZmFsc2Vcblx0ICAgICAgICAgICAgICAgIGJhdGNoVXBkYXRlVmlldyh2bS4kaWQpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXHQgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cdCAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBiYXRjaFVwZGF0ZVZpZXcoaWQpIHtcblx0ICAgIGF2YWxvbi5yZXJlbmRlclN0YXJ0ID0gbmV3IERhdGVcblx0ICAgIHZhciBkb3RJbmRleCA9IGlkLmluZGV4T2YoJy4nKVxuXHQgICAgaWYgKGRvdEluZGV4ID4gMCkge1xuXHQgICAgICAgIGF2YWxvbi5iYXRjaChpZC5zbGljZSgwLCBkb3RJbmRleCkpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGF2YWxvbi5iYXRjaChpZClcblx0ICAgIH1cblx0fVxuXG5cdHZhciBydG9wc3ViID0gLyhbXi5dKylcXC4oLispL1xuXHRmdW5jdGlvbiBlbWl0QXJyYXkoc2lkLCB2bSwgc3BhdGgsIHZhbCwgb2xkZXIpIHtcblx0ICAgIGlmIChzaWQuaW5kZXhPZignLiouJykgPiAwKSB7XG5cdCAgICAgICAgdmFyIGFyciA9IHNpZC5tYXRjaChydG9wc3ViKVxuXHQgICAgICAgIHZhciB0b3AgPSBhdmFsb24udm1vZGVsc1sgYXJyWzFdIF1cblx0ICAgICAgICBpZiAodG9wKSB7XG5cdCAgICAgICAgICAgIHZhciBwYXRoID0gYXJyWzJdXG5cdCAgICAgICAgICAgICRlbWl0KHRvcC4kZXZlbnRzWyBwYXRoIF0sIHZtLCBzcGF0aCwgdmFsLCBvbGRlcilcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBlbWl0V2lkZ2V0KHdob2xlLCBzcGF0aCwgdmFsLCBvbGRlcikge1xuXHQgICAgaWYgKHdob2xlICYmIHdob2xlW3NwYXRoXSkge1xuXHQgICAgICAgIHZhciB3dm0gPSB3aG9sZVtzcGF0aF1cblx0ICAgICAgICBpZiAoIXd2bS4kaGFzaGNvZGUpIHtcblx0ICAgICAgICAgICAgZGVsZXRlIHdob2xlW3NwYXRoXVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHZhciB3cGF0aCA9IHNwYXRoLnJlcGxhY2UoL15bXi5dK1xcLi8sICcnKVxuXHQgICAgICAgICAgICBpZiAod3BhdGggIT09IHNwYXRoKSB7XG5cdCAgICAgICAgICAgICAgICAkZW1pdCh3dm0uJGV2ZW50c1t3cGF0aF0sIHd2bSwgd3BhdGgsIHZhbCwgb2xkZXIpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBlbWl0V2lsZGNhcmQob2JqLCB2bSwgc3BhdGgsIHZhbCwgb2xkZXIpIHtcblx0ICAgIGlmIChvYmouX19mdXp6eV9fKSB7XG5cdCAgICAgICAgb2JqLl9fZnV6enlfXy5yZXBsYWNlKGF2YWxvbi5yd29yZCwgZnVuY3Rpb24gKGV4cHIpIHtcblx0ICAgICAgICAgICAgdmFyIGxpc3QgPSBvYmpbZXhwcl1cblx0ICAgICAgICAgICAgdmFyIHJlZyA9IGxpc3QucmVnXG5cdCAgICAgICAgICAgIGlmIChyZWcgJiYgcmVnLnRlc3Qoc3BhdGgpKSB7XG5cdCAgICAgICAgICAgICAgICAkZW1pdChsaXN0LCB2bSwgc3BhdGgsIHZhbCwgb2xkZXIpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGV4cHJcblx0ICAgICAgICB9KVxuXHQgICAgfVxuXHR9XG5cblxuXHRmdW5jdGlvbiBkZWZpbmUoZGVmaW5pdGlvbikge1xuXHQgICAgdmFyICRpZCA9IGRlZmluaXRpb24uJGlkXG5cdCAgICBpZiAoISRpZCAmJiBhdmFsb24uY29uZmlnLmRlYnVnKSB7XG5cdCAgICAgICAgYXZhbG9uLndhcm4oJ3ZtLiRpZCBtdXN0IGJlIHNwZWNpZmllZCcpXG5cdCAgICB9XG5cdCAgICBpZiAoYXZhbG9uLnZtb2RlbHNbJGlkXSkge1xuXHQgICAgICAgIHRocm93IEVycm9yKCdlcnJvcjpbJyArICRpZCArICddIGhhZCBkZWZpbmVkIScpXG5cdCAgICB9XG5cdCAgICB2YXIgdm0gPSAkJG1pZHdheS5tYXN0ZXJGYWN0b3J5KGRlZmluaXRpb24sIHt9LCB7XG5cdCAgICAgICAgcGF0aG5hbWU6ICcnLFxuXHQgICAgICAgIGlkOiAkaWQsXG5cdCAgICAgICAgbWFzdGVyOiB0cnVlXG5cdCAgICB9KVxuXG5cdCAgICByZXR1cm4gYXZhbG9uLnZtb2RlbHNbJGlkXSA9IHZtXG5cblx0fVxuXG5cdGZ1bmN0aW9uIGFycmF5RmFjdG9yeShhcnJheSwgb2xkLCBoZWlybG9vbSwgb3B0aW9ucykge1xuXHQgICAgaWYgKG9sZCAmJiBvbGQuc3BsaWNlKSB7XG5cdCAgICAgICAgdmFyIGFyZ3MgPSBbMCwgb2xkLmxlbmd0aF0uY29uY2F0KGFycmF5KVxuXHQgICAgICAgICsrYXZhbG9uLnN1c3BlbmRVcGRhdGVcblx0ICAgICAgICBvbGQuc3BsaWNlLmFwcGx5KG9sZCwgYXJncylcblx0ICAgICAgICAtLWF2YWxvbi5zdXNwZW5kVXBkYXRlXG5cdCAgICAgICAgcmV0dXJuIG9sZFxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBmb3IgKHZhciBpIGluIF9fYXJyYXlfXykge1xuXHQgICAgICAgICAgICBhcnJheVtpXSA9IF9fYXJyYXlfX1tpXVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGFycmF5Lm5vdGlmeSA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7XG5cdCAgICAgICAgICAgIHZhciB2bSA9IGhlaXJsb29tLl9fdm1vZGVsX19cblx0ICAgICAgICAgICAgaWYgKHZtKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGEgPT09IG51bGwgfHwgYSA9PT0gdm9pZCAwID9cblx0ICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wYXRobmFtZSA6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGF0aG5hbWUgKyAnLicgKyBhXG5cdCAgICAgICAgICAgICAgICB2bS4kZmlyZShwYXRoLCBiLCBjKVxuXHQgICAgICAgICAgICAgICAgaWYgKCFkICYmICFoZWlybG9vbS4kJHdhaXQkJCAmJiAhYXZhbG9uLnN1c3BlbmRVcGRhdGUgKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYmF0Y2hVcGRhdGVWaWV3KHZtLiRpZClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBoYXNoY29kZSA9IGF2YWxvbi5tYWtlSGFzaENvZGUoJyQnKVxuXHQgICAgICAgIG9wdGlvbnMuYXJyYXkgPSB0cnVlXG5cdCAgICAgICAgb3B0aW9ucy5oYXNoY29kZSA9IGhhc2hjb2RlXG5cdCAgICAgICAgb3B0aW9ucy5pZCA9IG9wdGlvbnMuaWQgfHwgaGFzaGNvZGVcblx0ICAgICAgICAkJG1pZHdheS5pbml0Vmlld01vZGVsKGFycmF5LCBoZWlybG9vbSwge30sIHt9LCBvcHRpb25zKVxuXG5cdCAgICAgICAgZm9yICh2YXIgaiA9IDAsIG4gPSBhcnJheS5sZW5ndGg7IGogPCBuOyBqKyspIHtcblx0ICAgICAgICAgICAgYXJyYXlbal0gPSBtb2RlbEFkYXB0b3IoYXJyYXlbal0sIDAsIHt9LCB7XG5cdCAgICAgICAgICAgICAgICBpZDogYXJyYXkuJGlkICsgJy4qJyxcblx0ICAgICAgICAgICAgICAgIG1hc3RlcjogdHJ1ZVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYXJyYXlcblx0ICAgIH1cblx0fVxuXHQkJG1pZHdheS5hcnJheUZhY3RvcnkgPSBhcnJheUZhY3RvcnlcblxuXHR2YXIgX19hcnJheV9fID0ge1xuXHQgICAgc2V0OiBmdW5jdGlvbiAoaW5kZXgsIHZhbCkge1xuXHQgICAgICAgIGlmICgoKGluZGV4ID4+PiAwKSA9PT0gaW5kZXgpICYmIHRoaXNbaW5kZXhdICE9PSB2YWwpIHtcblx0ICAgICAgICAgICAgaWYgKGluZGV4ID4gdGhpcy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGluZGV4ICsgJ3NldOaWueazleeahOesrOS4gOS4quWPguaVsOS4jeiDveWkp+S6juWOn+aVsOe7hOmVv+W6picpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEsIHZhbClcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgY29udGFpbnM6IGZ1bmN0aW9uIChlbCkgeyAvL+WIpOWumuaYr+WQpuWMheWQq1xuXHQgICAgICAgIHJldHVybiB0aGlzLmluZGV4T2YoZWwpICE9PSAtMVxuXHQgICAgfSxcblx0ICAgIGVuc3VyZTogZnVuY3Rpb24gKGVsKSB7XG5cdCAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKGVsKSkgeyAvL+WPquacieS4jeWtmOWcqOaJjXB1c2hcblx0ICAgICAgICAgICAgdGhpcy5wdXNoKGVsKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhpc1xuXHQgICAgfSxcblx0ICAgIHB1c2hBcnJheTogZnVuY3Rpb24gKGFycikge1xuXHQgICAgICAgIHJldHVybiB0aGlzLnB1c2guYXBwbHkodGhpcywgYXJyKVxuXHQgICAgfSxcblx0ICAgIHJlbW92ZTogZnVuY3Rpb24gKGVsKSB7IC8v56e76Zmk56ys5LiA5Liq562J5LqO57uZ5a6a5YC855qE5YWD57SgXG5cdCAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQXQodGhpcy5pbmRleE9mKGVsKSlcblx0ICAgIH0sXG5cdCAgICByZW1vdmVBdDogZnVuY3Rpb24gKGluZGV4KSB7IC8v56e76Zmk5oyH5a6a57Si5byV5LiK55qE5YWD57SgXG5cdCAgICAgICAgaWYgKChpbmRleCA+Pj4gMCkgPT09IGluZGV4KSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIFtdXG5cdCAgICB9LFxuXHQgICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB0aGlzLnJlbW92ZUFsbCgpXG5cdCAgICAgICAgcmV0dXJuIHRoaXNcblx0ICAgIH1cblx0fVxuXHRhdmFsb24uZGVmaW5lID0gZGVmaW5lXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAkJG1pZHdheTogJCRtaWR3YXksXG5cdCAgICAkJHNraXBBcnJheTogJCRza2lwQXJyYXksXG5cdCAgICBpc1NraXA6IGlzU2tpcCxcblx0ICAgIF9fYXJyYXlfXzogX19hcnJheV9fLFxuXHQgICAgaW5pdEV2ZW50czogaW5pdEV2ZW50cyxcblx0ICAgIG1ha2VBY2Nlc3NvcjogbWFrZUFjY2Vzc29yLFxuXHQgICAgbW9kZWxBZGFwdG9yOiBtb2RlbEFkYXB0b3Jcblx0fVxuXG4vKioqLyB9LFxuLyogNzkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFxuXHQvKipcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqIOWxnuaAp+ebkeWQrOezu+e7nyBcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIGFkanVzdFZtKHZtLCBleHByKSB7XG5cdCAgICB2YXIgdG9wcGF0aCA9IGV4cHIuc3BsaXQoXCIuXCIpWzBdLCBvdGhlclxuXHQgICAgdHJ5IHtcblx0ICAgICAgICBpZiAodm0uaGFzT3duUHJvcGVydHkodG9wcGF0aCkpIHtcblx0ICAgICAgICAgICAgaWYgKHZtLiRhY2Nlc3NvcnMpIHtcblx0ICAgICAgICAgICAgICAgIG90aGVyID0gdm0uJGFjY2Vzc29yc1t0b3BwYXRoXS5nZXQuaGVpcmxvb20uX192bW9kZWxfX1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgb3RoZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZtLCB0b3BwYXRoKS5nZXQuaGVpcmxvb20uX192bW9kZWxfX1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICB9XG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gb3RoZXIgfHwgdm1cblx0fVxuXG5cdGZ1bmN0aW9uIHRvUmVnRXhwKGV4cHIpIHtcblx0ICAgIHZhciBhcnIgPSBleHByLnNwbGl0KCcuJylcblx0ICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXlwiICsgYXJyLm1hcChmdW5jdGlvbiAoZWwpIHtcblx0ICAgICAgICByZXR1cm4gZWwgPT09ICcqJyA/ICcoPzpbXi5dKyknIDogZWxcblx0ICAgIH0pLmpvaW4oJ1xcXFwuJykgKyAnJCcsICdpJylcblx0fVxuXHRmdW5jdGlvbiBhZGRGdXp6eShhZGQsIG9iaiwgZXhwcikge1xuXHQgICAgaWYgKGFkZCkge1xuXHQgICAgICAgIGlmIChvYmouX19mdXp6eV9fKSB7XG5cdCAgICAgICAgICAgIGlmIChvYmouX19mdXp6eV9fLmluZGV4T2YoJywnICsgZXhwcikgPT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICBvYmouX19mdXp6eV9fICs9ICcsJyArIGV4cHJcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIG9iai5fX2Z1enp5X18gPSBleHByXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gJHdhdGNoKGV4cHIsIGNhbGxiYWNrKSB7XG5cdCAgICB2YXIgZnV6enkgPSBleHByLmluZGV4T2YoJy4qJykgPiAwIHx8IGV4cHIgPT09ICcqJ1xuXHQgICAgdmFyIHZtID0gZnV6enkgPyB0aGlzIDogJHdhdGNoLmFkanVzdCh0aGlzLCBleHByKVxuXHQgICAgdmFyIGhpdmUgPSB0aGlzLiRldmVudHNcblx0ICAgIHZhciBsaXN0ID0gaGl2ZVtleHByXSB8fCAoaGl2ZVtleHByXSA9IFtdKVxuXHQgICAgaWYgKGZ1enp5KSB7XG5cdCAgICAgICAgbGlzdC5yZWcgPSBsaXN0LnJlZyB8fCB0b1JlZ0V4cChleHByKVxuXHQgICAgfVxuXHQgICAgYWRkRnV6enkoZnV6enksIGhpdmUsIGV4cHIpXG5cdCAgICBpZiAodm0gIT09IHRoaXMpIHtcblx0ICAgICAgICBhZGRGdXp6eShmdXp6eSwgdGhpcy4kZXZlbnRzLCBleHByKVxuXHQgICAgfVxuXG5cdCAgICBhdmFsb24uQXJyYXkuZW5zdXJlKGxpc3QsIGNhbGxiYWNrKVxuXG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGF2YWxvbi5BcnJheS5yZW1vdmUobGlzdCwgY2FsbGJhY2spXG5cdCAgICB9XG5cdH1cblxuXHQkd2F0Y2guYWRqdXN0ID0gYWRqdXN0Vm1cblx0LyoqXG5cdCAqICRmaXJlIOaWueazleeahOWGhemDqOWunueOsFxuXHQgKiBcblx0ICogQHBhcmFtIHtBcnJheX0gbGlzdCDorqLpmIXogIXmlbDnu4Rcblx0ICogQHBhcmFtIHtDb21wb25lbnR9IHZtXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIOebkeWQrOWxnuaAp+WQjeaIlui3r+W+hFxuXHQgKiBAcGFyYW0ge0FueX0gYSDlvZPliY3lgLwgXG5cdCAqIEBwYXJhbSB7QW55fSBiIOi/h+WOu+WAvFxuXHQgKiBAcGFyYW0ge051bWJlcn0gaSDlpoLmnpzmipvplJks6K6p5LiL5LiA5Liq57un57ut5omn6KGMXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRmdW5jdGlvbiAkZW1pdChsaXN0LCB2bSwgcGF0aCwgYSwgYiwgaSkge1xuXHQgICAgaWYgKGxpc3QgJiYgbGlzdC5sZW5ndGgpIHtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICBmb3IgKGkgPSBpIHx8IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGxpc3RbaV1cblx0ICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodm0sIGEsIGIsIHBhdGgpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgIGlmIChpIC0gMSA+IDApXG5cdCAgICAgICAgICAgICAgICAkZW1pdChsaXN0LCB2bSwgcGF0aCwgYSwgYiwgaSAtIDEpXG5cdCAgICAgICAgICAgIGF2YWxvbi5sb2coZSwgcGF0aClcblx0ICAgICAgICB9XG5cblx0ICAgIH1cblx0fVxuXG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICAkZW1pdDogJGVtaXQsXG5cdCAgICAkd2F0Y2g6ICR3YXRjaCxcblx0ICAgIGFkanVzdFZtOiBhZGp1c3RWbVxuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDgwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvL+WmguaenOa1j+iniOWZqOS4jeaUr+aMgWVjbWEyNjJ2NeeahE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVz5oiW6ICF5a2Y5ZyoQlVH77yM5q+U5aaCSUU4XG5cdC8v5qCH5YeG5rWP6KeI5Zmo5L2/55SoX19kZWZpbmVHZXR0ZXJfXywgX19kZWZpbmVTZXR0ZXJfX+WunueOsFxuXHR2YXIgZmxhZyA9IHRydWVcblx0dHJ5IHtcblx0ICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ18nLCB7XG5cdCAgICAgICAgdmFsdWU6ICd4J1xuXHQgICAgfSlcblx0fSBjYXRjaCAoZSkge1xuXHQgICAgZmxhZyA9IGZhbHNlXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZsYWdcblxuLyoqKi8gfSxcbi8qIDgxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcblx0dmFyIGNhbkhpZGVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oODApXG5cdHZhciAkJHNraXBBcnJheSA9IF9fd2VicGFja19yZXF1aXJlX18oNjMpXG5cblxuXHR2YXIgZGVmaW5lUHJvcGVydGllcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzXG5cdHZhciBkZWZpbmVQcm9wZXJ0eVxuXG5cdHZhciBleHBvc2UgPSBuZXcgRGF0ZSgpIC0gMFxuXG5cdGlmICghY2FuSGlkZVByb3BlcnR5KSB7XG5cdCAgICBpZiAoJ19fZGVmaW5lR2V0dGVyX18nIGluIGF2YWxvbikge1xuXHQgICAgICAgIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgZGVzYykge1xuXHQgICAgICAgICAgICBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7XG5cdCAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSBkZXNjLnZhbHVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKCdnZXQnIGluIGRlc2MpIHtcblx0ICAgICAgICAgICAgICAgIG9iai5fX2RlZmluZUdldHRlcl9fKHByb3AsIGRlc2MuZ2V0KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICgnc2V0JyBpbiBkZXNjKSB7XG5cdCAgICAgICAgICAgICAgICBvYmouX19kZWZpbmVTZXR0ZXJfXyhwcm9wLCBkZXNjLnNldClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gb2JqXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqLCBkZXNjcykge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGRlc2NzKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoZGVzY3MuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlc2NzW3Byb3BdKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBvYmpcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBpZiAoYXZhbG9uLm1zaWUpIHtcblx0ICAgICAgICB2YXIgVkJDbGFzc1Bvb2wgPSB7fVxuXHQgICAgICAgIHdpbmRvdy5leGVjU2NyaXB0KFsvLyBqc2hpbnQgaWdub3JlOmxpbmVcblx0ICAgICAgICAgICAgJ0Z1bmN0aW9uIHBhcnNlVkIoY29kZSknLFxuXHQgICAgICAgICAgICAnXFx0RXhlY3V0ZUdsb2JhbChjb2RlKScsXG5cdCAgICAgICAgICAgICdFbmQgRnVuY3Rpb24nIC8v6L2s5o2i5LiA5q615paH5pys5Li6VkLku6PnoIFcblx0ICAgICAgICBdLmpvaW4oJ1xcbicpLCAnVkJTY3JpcHQnKTtcblx0ICAgICAgICBcblx0ICAgICAgICBmdW5jdGlvbiBWQk1lZGlhdG9yKGluc3RhbmNlLCBhY2Nlc3NvcnMsIG5hbWUsIHZhbHVlKSB7Ly8ganNoaW50IGlnbm9yZTpsaW5lXG5cdCAgICAgICAgICAgIHZhciBhY2Nlc3NvciA9IGFjY2Vzc29yc1tuYW1lXVxuXHQgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuXHQgICAgICAgICAgICAgICAgYWNjZXNzb3Iuc2V0LmNhbGwoaW5zdGFuY2UsIHZhbHVlKVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGFjY2Vzc29yLmdldC5jYWxsKGluc3RhbmNlKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAobmFtZSwgYWNjZXNzb3JzLCBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXHQgICAgICAgICAgICB2YXIgYnVmZmVyID0gW11cblx0ICAgICAgICAgICAgYnVmZmVyLnB1c2goXG5cdCAgICAgICAgICAgICAgICAgICAgJ1xcclxcblxcdFByaXZhdGUgW19fZGF0YV9fXSwgW19fcHJveHlfX10nLFxuXHQgICAgICAgICAgICAgICAgICAgICdcXHRQdWJsaWMgRGVmYXVsdCBGdW5jdGlvbiBbX19jb25zdF9fXShkJyArIGV4cG9zZSArICcsIHAnICsgZXhwb3NlICsgJyknLFxuXHQgICAgICAgICAgICAgICAgICAgICdcXHRcXHRTZXQgW19fZGF0YV9fXSA9IGQnICsgZXhwb3NlICsgJzogc2V0IFtfX3Byb3h5X19dID0gcCcgKyBleHBvc2UsXG5cdCAgICAgICAgICAgICAgICAgICAgJ1xcdFxcdFNldCBbX19jb25zdF9fXSA9IE1lJywgLy/pk77lvI/osIPnlKhcblx0ICAgICAgICAgICAgICAgICAgICAnXFx0RW5kIEZ1bmN0aW9uJylcblx0ICAgICAgICAgICAgLy/mt7vliqDmma7pgJrlsZ7mgKcs5Zug5Li6VkJTY3JpcHTlr7nosaHkuI3og73lg49KU+mCo+agt+maj+aEj+WinuWIoOWxnuaAp++8jOW/hemhu+WcqOi/memHjOmihOWFiOWumuS5ieWlvVxuXHQgICAgICAgICAgICB2YXIgdW5pcSA9IHtcblx0ICAgICAgICAgICAgICAgX19wcm94eV9fOiB0cnVlLFxuXHQgICAgICAgICAgICAgICBfX2RhdGFfXzogdHJ1ZSxcblx0ICAgICAgICAgICAgICAgX19jb25zdF9fOiB0cnVlXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvL+a3u+WKoOiuv+mXruWZqOWxnuaApyBcblx0ICAgICAgICAgICAgZm9yIChuYW1lIGluIGFjY2Vzc29ycykge1xuXHQgICAgICAgICAgICAgICAgdW5pcVtuYW1lXSA9IHRydWVcblx0ICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAvL+eUseS6juS4jeefpeWvueaWueS8muS8oOWFpeS7gOS5iCzlm6DmraRzZXQsIGxldOmDveeUqOS4ilxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnXFx0UHVibGljIFByb3BlcnR5IExldCBbJyArIG5hbWUgKyAnXSh2YWwnICsgZXhwb3NlICsgJyknLCAvL3NldHRlclxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnXFx0XFx0Q2FsbCBbX19wcm94eV9fXShNZSxbX19kYXRhX19dLCBcIicgKyBuYW1lICsgJ1wiLCB2YWwnICsgZXhwb3NlICsgJyknLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnXFx0RW5kIFByb3BlcnR5Jyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdFB1YmxpYyBQcm9wZXJ0eSBTZXQgWycgKyBuYW1lICsgJ10odmFsJyArIGV4cG9zZSArICcpJywgLy9zZXR0ZXJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdFxcdENhbGwgW19fcHJveHlfX10oTWUsW19fZGF0YV9fXSwgXCInICsgbmFtZSArICdcIiwgdmFsJyArIGV4cG9zZSArICcpJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdEVuZCBQcm9wZXJ0eScsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdcXHRQdWJsaWMgUHJvcGVydHkgR2V0IFsnICsgbmFtZSArICddJywgLy9nZXR0ZXJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdE9uIEVycm9yIFJlc3VtZSBOZXh0JywgLy/lv4XpobvkvJjlhYjkvb/nlKhzZXTor63lj6Us5ZCm5YiZ5a6D5Lya6K+v5bCG5pWw57uE5b2T5a2X56ym5Liy6L+U5ZueXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdcXHRcXHRTZXRbJyArIG5hbWUgKyAnXSA9IFtfX3Byb3h5X19dKE1lLFtfX2RhdGFfX10sXCInICsgbmFtZSArICdcIiknLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnXFx0SWYgRXJyLk51bWJlciA8PiAwIFRoZW4nLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnXFx0XFx0WycgKyBuYW1lICsgJ10gPSBbX19wcm94eV9fXShNZSxbX19kYXRhX19dLFwiJyArIG5hbWUgKyAnXCIpJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdEVuZCBJZicsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdcXHRPbiBFcnJvciBHb3RvIDAnLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnXFx0RW5kIFByb3BlcnR5JylcblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGZvciAobmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodW5pcVtuYW1lXSAhPT0gdHJ1ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHVuaXFbbmFtZV0gPSB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goJ1xcdFB1YmxpYyBbJyArIG5hbWUgKyAnXScpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZm9yIChuYW1lIGluICQkc2tpcEFycmF5KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodW5pcVtuYW1lXSAhPT0gdHJ1ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHVuaXFbbmFtZV0gPSB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goJ1xcdFB1YmxpYyBbJyArIG5hbWUgKyAnXScpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgYnVmZmVyLnB1c2goJ1xcdFB1YmxpYyBbJyArICdoYXNPd25Qcm9wZXJ0eScgKyAnXScpXG5cdCAgICAgICAgICAgIGJ1ZmZlci5wdXNoKCdFbmQgQ2xhc3MnKVxuXHQgICAgICAgICAgICB2YXIgYm9keSA9IGJ1ZmZlci5qb2luKCdcXHJcXG4nKVxuXHQgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gVkJDbGFzc1Bvb2xbYm9keV1cblx0ICAgICAgICAgICAgaWYgKCFjbGFzc05hbWUpIHtcblx0ICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IGF2YWxvbi5tYWtlSGFzaENvZGUoJ1ZCQ2xhc3MnKVxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICB3aW5kb3cucGFyc2VWQignQ2xhc3MgJyArIGNsYXNzTmFtZSArIGJvZHkpXG5cdCAgICAgICAgICAgICAgICB3aW5kb3cucGFyc2VWQihbXG5cdCAgICAgICAgICAgICAgICAgICAgJ0Z1bmN0aW9uICcgKyBjbGFzc05hbWUgKyAnRmFjdG9yeShhLCBiKScsIC8v5Yib5bu65a6e5L6L5bm25Lyg5YWl5Lik5Liq5YWz6ZSu55qE5Y+C5pWwXG5cdCAgICAgICAgICAgICAgICAgICAgJ1xcdERpbSBvJyxcblx0ICAgICAgICAgICAgICAgICAgICAnXFx0U2V0IG8gPSAoTmV3ICcgKyBjbGFzc05hbWUgKyAnKShhLCBiKScsXG5cdCAgICAgICAgICAgICAgICAgICAgJ1xcdFNldCAnICsgY2xhc3NOYW1lICsgJ0ZhY3RvcnkgPSBvJyxcblx0ICAgICAgICAgICAgICAgICAgICAnRW5kIEZ1bmN0aW9uJ1xuXHQgICAgICAgICAgICAgICAgXS5qb2luKCdcXHJcXG4nKSlcblx0ICAgICAgICAgICAgICAgIFZCQ2xhc3NQb29sW2JvZHldID0gY2xhc3NOYW1lXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIHJldCA9IHdpbmRvd1tjbGFzc05hbWUgKyAnRmFjdG9yeSddKGFjY2Vzc29ycywgVkJNZWRpYXRvcikgLy/lvpfliLDlhbbkuqflk4Fcblx0ICAgICAgICAgICAgcmV0dXJuIHJldCAvL+W+l+WIsOWFtuS6p+WTgVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gZGVmaW5lUHJvcGVydGllc1xuXG5cbi8qKiovIH1cbi8qKioqKiovIF0pXG59KTtcbjsiLCJyZXF1aXJlKCdhdmFsb24yJyk7XG5yZXF1aXJlKCcuL2xvZ2luL3ZpZXcvdmlldy5qcycpO1xucmVxdWlyZSgnLi9jaGVja0luZm8vdmlldy92aWV3LmpzJyk7XG5yZXF1aXJlKCcuL3JlZ2lzdGVySW5mby92aWV3L3ZpZXcuanMnKTtcbnJlcXVpcmUoJy4vcmVnaXN0ZXJFbmQvdmlldy92aWV3LmpzJyk7XG5cblxuIiwiLy9yZXF1aXJlKCdhdmFsb24yJyk7XG52YXIgdm0gPSBhdmFsb24uZGVmaW5lKHtcbiAgICAkaWQ6IFwiY2hlY2tJbmZvXCIsXG4gICAgbmFtZTogXCJjaGVja0luZm9cIixcbiAgICBhcnJheTogWzExLCAyMiwgMzMzXVxufSk7IiwiLy9yZXF1aXJlKCdhdmFsb24yJyk7XG52YXIgdm0gPSBhdmFsb24uZGVmaW5lKHtcbiAgICAkaWQ6IFwibG9nSW5cIixcbiAgICBuYW1lOiBcImxvZ2luXCIsXG4gICAgYXJyYXk6IFsxMSwgMjIsIDMzM11cbn0pOyIsIi8vcmVxdWlyZSgnYXZhbG9uMicpO1xudmFyIHZtID0gYXZhbG9uLmRlZmluZSh7XG4gICAgJGlkOiBcInJlZ2lzdGVyRW5kXCIsXG4gICAgbmFtZTogXCJyZWdpc3RlckVuZFwiLFxuICAgIGFycmF5OiBbMTEsIDIyLCAzM11cbn0pOyIsIi8vcmVxdWlyZSgnYXZhbG9uMicpO1xudmFyIHZtID0gYXZhbG9uLmRlZmluZSh7XG4gICAgJGlkOiBcInJlZ2lzdGVySW5mb1wiLFxuICAgIG5hbWU6IFwicmVnaXN0ZXJJbmZvXCIsXG4gICAgYXJyYXk6IFsxMSwgMjIsIDMzXVxufSk7Il19
