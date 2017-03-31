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
//引入项目中用到的js
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXZhbG9uMi9kaXN0L2F2YWxvbi5qcyIsIi9Vc2Vycy9zcnQvbXlkZW1vL2F2YWxvbl9kZW1vL3NyYy9hcHAuanMiLCIvVXNlcnMvc3J0L215ZGVtby9hdmFsb25fZGVtby9zcmMvY2hlY2tJbmZvL3ZpZXcvdmlldy5qcyIsIi9Vc2Vycy9zcnQvbXlkZW1vL2F2YWxvbl9kZW1vL3NyYy9sb2dpbi92aWV3L3ZpZXcuanMiLCIvVXNlcnMvc3J0L215ZGVtby9hdmFsb25fZGVtby9zcmMvcmVnaXN0ZXJFbmQvdmlldy92aWV3LmpzIiwiL1VzZXJzL3NydC9teWRlbW8vYXZhbG9uX2RlbW8vc3JjL3JlZ2lzdGVySW5mby92aWV3L3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3grUUEsWUFBWTtBQUNaLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQixPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNoQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUNwQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN2QyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUN0Qzs7QUNOQSxxQkFBcUI7QUFDckIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQixHQUFHLEVBQUUsV0FBVztJQUNoQixJQUFJLEVBQUUsV0FBVztJQUNqQixLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztDQUN2QixDQUFDOzs7QUNMRixxQkFBcUI7QUFDckIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNuQixHQUFHLEVBQUUsT0FBTztJQUNaLElBQUksRUFBRSxPQUFPO0lBQ2IsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7Q0FDdkIsQ0FBQzs7O0FDTEYscUJBQXFCO0FBQ3JCLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbkIsR0FBRyxFQUFFLGFBQWE7SUFDbEIsSUFBSSxFQUFFLGFBQWE7SUFDbkIsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Q0FDdEIsQ0FBQzs7O0FDTEYscUJBQXFCO0FBQ3JCLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbkIsR0FBRyxFQUFFLGNBQWM7SUFDbkIsSUFBSSxFQUFFLGNBQWM7SUFDcEIsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Q0FDdEIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAqIGJ1aWx0IGluIDIwMTYtOC04OjExIHZlcnNpb24gMi4xMTEgYnkg5Y+45b6S5q2j576OXG4gKiDkv67mraMgbXMtY2xpY2sg5ZyoIG1zLWlmIOS4i+WkseaViOeahOmXrumimCAjMTY1MlxuICog5L+u5q2jIGxpbWl0QnkgQlVHXG4gKiDkv67mraMg6IqC54K55a+56b2Q566X5rOVIEJVR1xuICog5LyY5YyWIG1lZGlhdG9yRmFjdG9yeVxuICog5L+u5q2jIGRhdGEtZm9yLXJlbmRlcmVkIEJVR1xuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhdmFsb25cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYXZhbG9uXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFxuXHR2YXIgYXZhbG9uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKSAvL+i/meS4queJiOacrOWFvOWuuUlFNlxuXG5cdF9fd2VicGFja19yZXF1aXJlX18oOClcblx0X193ZWJwYWNrX3JlcXVpcmVfXygxNClcblx0X193ZWJwYWNrX3JlcXVpcmVfXygxOSlcblx0X193ZWJwYWNrX3JlcXVpcmVfXygzNSlcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg2Nilcblx0YXZhbG9uLm9uQ29tcG9uZW50RGlzcG9zZSA9IF9fd2VicGFja19yZXF1aXJlX18oNzQpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNzYpXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdmFsb25cblxuXG5cblxuLyoqKi8gfSxcbi8qIDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDIpXG5cdHZhciBhdmFsb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpXG5cdHZhciBicm93c2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KVxuXG5cdGF2YWxvbi5zaGFkb3dDb3B5KGF2YWxvbiwgYnJvd3NlcilcblxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDUpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNilcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg3KVxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXZhbG9uXG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcblx0LyoqXG5cdCAqIOatpOaooeWdl+S4jeS+nei1luS7u+S9leaooeWdlyznlKjkuo7kv67lpI3or63oqIDnmoTlupXlsYLnvLrpmbdcblx0ICovXG5cblx0dmFyIG9oYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5cblx0aWYgKCEn5Y+45b6S5q2j576OJy50cmltKSB7XG5cdCAgICB2YXIgcnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2dcblx0ICAgIFN0cmluZy5wcm90b3R5cGUudHJpbSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKHJ0cmltLCAnJylcblx0ICAgIH1cblx0fVxuXHR2YXIgaGFzRG9udEVudW1CdWcgPSAhKHtcblx0ICAgICd0b1N0cmluZyc6IG51bGxcblx0fSkucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyksXG5cdCAgICAgICAgaGFzUHJvdG9FbnVtQnVnID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB9KS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgncHJvdG90eXBlJyksXG5cdCAgICAgICAgZG9udEVudW1zID0gW1xuXHQgICAgICAgICAgICAndG9TdHJpbmcnLFxuXHQgICAgICAgICAgICAndG9Mb2NhbGVTdHJpbmcnLFxuXHQgICAgICAgICAgICAndmFsdWVPZicsXG5cdCAgICAgICAgICAgICdoYXNPd25Qcm9wZXJ0eScsXG5cdCAgICAgICAgICAgICdpc1Byb3RvdHlwZU9mJyxcblx0ICAgICAgICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0ICAgICAgICAgICAgJ2NvbnN0cnVjdG9yJ1xuXHQgICAgICAgIF0sXG5cdCAgICAgICAgZG9udEVudW1zTGVuZ3RoID0gZG9udEVudW1zLmxlbmd0aDtcblx0aWYgKCFPYmplY3Qua2V5cykge1xuXHQgICAgT2JqZWN0LmtleXMgPSBmdW5jdGlvbiAob2JqZWN0KSB7IC8vZWNtYTI2MnY1IDE1LjIuMy4xNFxuXHQgICAgICAgIHZhciB0aGVLZXlzID0gW11cblx0ICAgICAgICB2YXIgc2tpcFByb3RvID0gaGFzUHJvdG9FbnVtQnVnICYmIHR5cGVvZiBvYmplY3QgPT09ICdmdW5jdGlvbidcblx0ICAgICAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgfHwgKG9iamVjdCAmJiBvYmplY3QuY2FsbGVlKSkge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7ICsraSkge1xuXHQgICAgICAgICAgICAgICAgdGhlS2V5cy5wdXNoKFN0cmluZyhpKSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gb2JqZWN0KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIShza2lwUHJvdG8gJiYgbmFtZSA9PT0gJ3Byb3RvdHlwZScpICYmXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG9oYXNPd24uY2FsbChvYmplY3QsIG5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhlS2V5cy5wdXNoKFN0cmluZyhuYW1lKSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmIChoYXNEb250RW51bUJ1Zykge1xuXHQgICAgICAgICAgICB2YXIgY3RvciA9IG9iamVjdC5jb25zdHJ1Y3Rvcixcblx0ICAgICAgICAgICAgICAgICAgICBza2lwQ29uc3RydWN0b3IgPSBjdG9yICYmIGN0b3IucHJvdG90eXBlID09PSBvYmplY3Rcblx0ICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb250RW51bXNMZW5ndGg7IGorKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGRvbnRFbnVtID0gZG9udEVudW1zW2pdXG5cdCAgICAgICAgICAgICAgICBpZiAoIShza2lwQ29uc3RydWN0b3IgJiYgZG9udEVudW0gPT09ICdjb25zdHJ1Y3RvcicpICYmIG9oYXNPd24uY2FsbChvYmplY3QsIGRvbnRFbnVtKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoZUtleXMucHVzaChkb250RW51bSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdGhlS2V5c1xuXHQgICAgfVxuXHR9XG5cdGlmICghQXJyYXkuaXNBcnJheSkge1xuXHQgICAgQXJyYXkuaXNBcnJheSA9IGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKCFBcnJheS5pc0FycmF5LmJpbmQpIHtcblx0ICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKHNjb3BlKSB7XG5cdCAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyICYmIHNjb3BlID09PSB2b2lkIDApXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzXG5cdCAgICAgICAgdmFyIGZuID0gdGhpcyxcblx0ICAgICAgICAgICAgICAgIGFyZ3YgPSBhcmd1bWVudHNcblx0ICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgYXJncyA9IFtdLFxuXHQgICAgICAgICAgICAgICAgICAgIGlcblx0ICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8IGFyZ3YubGVuZ3RoOyBpKyspXG5cdCAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJndltpXSlcblx0ICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcblx0ICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pXG5cdCAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShzY29wZSwgYXJncylcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblx0Ly9odHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9zbGljZVxuXHQvKipcblx0KiBTaGltIGZvciBcImZpeGluZ1wiIElFJ3MgbGFjayBvZiBzdXBwb3J0IChJRSA8IDkpIGZvciBhcHBseWluZyBzbGljZVxuXHQqIG9uIGhvc3Qgb2JqZWN0cyBsaWtlIE5hbWVkTm9kZU1hcCwgTm9kZUxpc3QsIGFuZCBIVE1MQ29sbGVjdGlvblxuXHQqICh0ZWNobmljYWxseSwgc2luY2UgaG9zdCBvYmplY3RzIGhhdmUgYmVlbiBpbXBsZW1lbnRhdGlvbi1kZXBlbmRlbnQsXG5cdCogYXQgbGVhc3QgYmVmb3JlIEVTNiwgSUUgaGFzbid0IG5lZWRlZCB0byB3b3JrIHRoaXMgd2F5KS5cblx0KiBBbHNvIHdvcmtzIG9uIHN0cmluZ3MsIGZpeGVzIElFIDwgOSB0byBhbGxvdyBhbiBleHBsaWNpdCB1bmRlZmluZWRcblx0KiBmb3IgdGhlIDJuZCBhcmd1bWVudCAoYXMgaW4gRmlyZWZveCksIGFuZCBwcmV2ZW50cyBlcnJvcnMgd2hlblxuXHQqIGNhbGxlZCBvbiBvdGhlciBET00gb2JqZWN0cy5cblx0Ki9cblxuXHR2YXIgX3NsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cdHRyeSB7XG5cdCAgICAvLyBDYW4ndCBiZSB1c2VkIHdpdGggRE9NIGVsZW1lbnRzIGluIElFIDwgOVxuXHQgICAgX3NsaWNlLmNhbGwoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuXHR9IGNhdGNoIChlKSB7IC8vIEZhaWxzIGluIElFIDwgOVxuXHQgICAgLy8gVGhpcyB3aWxsIHdvcmsgZm9yIGdlbnVpbmUgYXJyYXlzLCBhcnJheS1saWtlIG9iamVjdHMsXG5cdCAgICAvLyBOYW1lZE5vZGVNYXAgKGF0dHJpYnV0ZXMsIGVudGl0aWVzLCBub3RhdGlvbnMpLFxuXHQgICAgLy8gTm9kZUxpc3QgKGUuZy4sIGdldEVsZW1lbnRzQnlUYWdOYW1lKSwgSFRNTENvbGxlY3Rpb24gKGUuZy4sIGNoaWxkTm9kZXMpLFxuXHQgICAgLy8gYW5kIHdpbGwgbm90IGZhaWwgb24gb3RoZXIgRE9NIG9iamVjdHMgKGFzIGRvIERPTSBlbGVtZW50cyBpbiBJRSA8IDkpXG5cdCAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoYmVnaW4sIGVuZCkge1xuXHQgICAgICAgIC8vIElFIDwgOSBnZXRzIHVuaGFwcHkgd2l0aCBhbiB1bmRlZmluZWQgZW5kIGFyZ3VtZW50XG5cdCAgICAgICAgZW5kID0gKHR5cGVvZiBlbmQgIT09ICd1bmRlZmluZWQnKSA/IGVuZCA6IHRoaXMubGVuZ3RoXG5cblx0ICAgICAgICAvLyBGb3IgbmF0aXZlIEFycmF5IG9iamVjdHMsIHdlIHVzZSB0aGUgbmF0aXZlIHNsaWNlIGZ1bmN0aW9uXG5cdCAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcykgKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBfc2xpY2UuY2FsbCh0aGlzLCBiZWdpbiwgZW5kKVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIC8vIEZvciBhcnJheSBsaWtlIG9iamVjdCB3ZSBoYW5kbGUgaXQgb3Vyc2VsdmVzLlxuXHQgICAgICAgIHZhciBpLCBjbG9uZWQgPSBbXSxcblx0ICAgICAgICAgICAgICAgIHNpemUsIGxlbiA9IHRoaXMubGVuZ3RoXG5cblx0ICAgICAgICAvLyBIYW5kbGUgbmVnYXRpdmUgdmFsdWUgZm9yIFwiYmVnaW5cIlxuXHQgICAgICAgIHZhciBzdGFydCA9IGJlZ2luIHx8IDBcblx0ICAgICAgICBzdGFydCA9IChzdGFydCA+PSAwKSA/IHN0YXJ0IDogbGVuICsgc3RhcnRcblxuXHQgICAgICAgIC8vIEhhbmRsZSBuZWdhdGl2ZSB2YWx1ZSBmb3IgXCJlbmRcIlxuXHQgICAgICAgIHZhciB1cFRvID0gKGVuZCkgPyBlbmQgOiBsZW5cblx0ICAgICAgICBpZiAoZW5kIDwgMCkge1xuXHQgICAgICAgICAgICB1cFRvID0gbGVuICsgZW5kXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgLy8gQWN0dWFsIGV4cGVjdGVkIHNpemUgb2YgdGhlIHNsaWNlXG5cdCAgICAgICAgc2l6ZSA9IHVwVG8gLSBzdGFydFxuXG5cdCAgICAgICAgaWYgKHNpemUgPiAwKSB7XG5cdCAgICAgICAgICAgIGNsb25lZCA9IG5ldyBBcnJheShzaXplKVxuXHQgICAgICAgICAgICBpZiAodGhpcy5jaGFyQXQpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICBjbG9uZWRbaV0gPSB0aGlzLmNoYXJBdChzdGFydCArIGkpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY2xvbmVkW2ldID0gdGhpc1tzdGFydCArIGldXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICByZXR1cm4gY2xvbmVkXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBpdGVyYXRvcih2YXJzLCBib2R5LCByZXQpIHtcblx0ICAgIHZhciBmdW4gPSAnZm9yKHZhciAnICsgdmFycyArICdpPTAsbiA9IHRoaXMubGVuZ3RoOyBpIDwgbjsgaSsrKXsnICtcblx0ICAgICAgICAgICAgYm9keS5yZXBsYWNlKCdfJywgJygoaSBpbiB0aGlzKSAmJiBmbi5jYWxsKHNjb3BlLHRoaXNbaV0saSx0aGlzKSknKSArXG5cdCAgICAgICAgICAgICd9JyArIHJldFxuXHQgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXHQgICAgcmV0dXJuIEZ1bmN0aW9uKCdmbixzY29wZScsIGZ1bilcblx0ICAgIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG5cdH1cblxuXHR2YXIgYXAgPSBBcnJheS5wcm90b3R5cGVcblx0aWYgKCEvXFxbbmF0aXZlIGNvZGVcXF0vLnRlc3QoYXAubWFwKSkge1xuXHQgICAgdmFyIHNoaW0gPSB7XG5cdCAgICAgICAgLy/lrprkvY3mk43kvZzvvIzov5Tlm57mlbDnu4TkuK3nrKzkuIDkuKrnrYnkuo7nu5nlrprlj4LmlbDnmoTlhYPntKDnmoTntKLlvJXlgLzjgIJcblx0ICAgICAgICBpbmRleE9mOiBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcblx0ICAgICAgICAgICAgdmFyIG4gPSB0aGlzLmxlbmd0aCxcblx0ICAgICAgICAgICAgICAgICAgICBpID0gfn5pbmRleFxuXHQgICAgICAgICAgICBpZiAoaSA8IDApXG5cdCAgICAgICAgICAgICAgICBpICs9IG5cblx0ICAgICAgICAgICAgZm9yICg7IGkgPCBuOyBpKyspXG5cdCAgICAgICAgICAgICAgICBpZiAodGhpc1tpXSA9PT0gaXRlbSlcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gaVxuXHQgICAgICAgICAgICByZXR1cm4gLTFcblx0ICAgICAgICB9LFxuXHQgICAgICAgIC8v5a6a5L2N5pON5L2c77yM5ZCM5LiK77yM5LiN6L+H5piv5LuO5ZCO6YGN5Y6G44CCXG5cdCAgICAgICAgbGFzdEluZGV4T2Y6IGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuXHQgICAgICAgICAgICB2YXIgbiA9IHRoaXMubGVuZ3RoLFxuXHQgICAgICAgICAgICAgICAgICAgIGkgPSBpbmRleCA9PSBudWxsID8gbiAtIDEgOiBpbmRleFxuXHQgICAgICAgICAgICBpZiAoaSA8IDApXG5cdCAgICAgICAgICAgICAgICBpID0gTWF0aC5tYXgoMCwgbiArIGkpXG5cdCAgICAgICAgICAgIGZvciAoOyBpID49IDA7IGktLSlcblx0ICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBpdGVtKVxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBpXG5cdCAgICAgICAgICAgIHJldHVybiAtMVxuXHQgICAgICAgIH0sXG5cdCAgICAgICAgLy/ov63ku6Pmk43kvZzvvIzlsIbmlbDnu4TnmoTlhYPntKDmjKjkuKrlhL/kvKDlhaXkuIDkuKrlh73mlbDkuK3miafooYzjgIJQcm90b3R5cGUuanPnmoTlr7nlupTlkI3lrZfkuLplYWNo44CCXG5cdCAgICAgICAgZm9yRWFjaDogaXRlcmF0b3IoJycsICdfJywgJycpLFxuXHQgICAgICAgIC8v6L+t5Luj57G7IOWcqOaVsOe7hOS4reeahOavj+S4qumhueS4iui/kOihjOS4gOS4quWHveaVsO+8jOWmguaenOatpOWHveaVsOeahOWAvOS4uuecn++8jOWImeatpOWFg+e0oOS9nOS4uuaWsOaVsOe7hOeahOWFg+e0oOaUtumbhui1t+adpe+8jOW5tui/lOWbnuaWsOaVsOe7hFxuXHQgICAgICAgIGZpbHRlcjogaXRlcmF0b3IoJ3I9W10saj0wLCcsICdpZihfKXJbaisrXT10aGlzW2ldJywgJ3JldHVybiByJyksXG5cdCAgICAgICAgLy/mlLbpm4bmk43kvZzvvIzlsIbmlbDnu4TnmoTlhYPntKDmjKjkuKrlhL/kvKDlhaXkuIDkuKrlh73mlbDkuK3miafooYzvvIznhLblkI7miorlroPku6znmoTov5Tlm57lgLznu4TmiJDkuIDkuKrmlrDmlbDnu4Tov5Tlm57jgIJQcm90b3R5cGUuanPnmoTlr7nlupTlkI3lrZfkuLpjb2xsZWN044CCXG5cdCAgICAgICAgbWFwOiBpdGVyYXRvcigncj1bXSwnLCAncltpXT1fJywgJ3JldHVybiByJyksXG5cdCAgICAgICAgLy/lj6ropoHmlbDnu4TkuK3mnInkuIDkuKrlhYPntKDmu6HotrPmnaHku7bvvIjmlL7ov5vnu5nlrprlh73mlbDov5Tlm550cnVl77yJ77yM6YKj5LmI5a6D5bCx6L+U5ZuedHJ1ZeOAglByb3RvdHlwZS5qc+eahOWvueW6lOWQjeWtl+S4umFueeOAglxuXHQgICAgICAgIHNvbWU6IGl0ZXJhdG9yKCcnLCAnaWYoXylyZXR1cm4gdHJ1ZScsICdyZXR1cm4gZmFsc2UnKSxcblx0ICAgICAgICAvL+WPquacieaVsOe7hOS4reeahOWFg+e0oOmDvea7oei2s+adoeS7tu+8iOaUvui/m+e7meWumuWHveaVsOi/lOWbnnRydWXvvInvvIzlroPmiY3ov5Tlm550cnVl44CCUHJvdG90eXBlLmpz55qE5a+55bqU5ZCN5a2X5Li6YWxs44CCXG5cdCAgICAgICAgZXZlcnk6IGl0ZXJhdG9yKCcnLCAnaWYoIV8pcmV0dXJuIGZhbHNlJywgJ3JldHVybiB0cnVlJylcblx0ICAgIH1cblxuXHQgICAgZm9yICh2YXIgaSBpbiBzaGltKSB7XG5cdCAgICAgICAgYXBbaV0gPSBzaGltW2ldXG5cdCAgICB9XG5cdH1cblx0bW9kdWxlLmV4cG9ydHMgPSB7fVxuXG4vKioqLyB9LFxuLyogMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKGdsb2JhbCkgey8vYXZhbG9u55qE5qC45b+DLOi/memHjOmDveaYr+S4gOS6m+S4jeWtmOWcqOW8guiurueahCrmoLjlv4Mq5pa55rOV5LiO5bGe5oCnXG5cdGZ1bmN0aW9uIGF2YWxvbihlbCkge1xuXHQgICAgcmV0dXJuIG5ldyBhdmFsb24uaW5pdChlbClcblx0fVxuXG5cdGdsb2JhbC5hdmFsb24gPSBhdmFsb25cblx0aWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpe1xuXHQgICAgd2luZG93LmF2YWxvbiA9IGF2YWxvblxuXHR9XG5cblx0YXZhbG9uLmluaXQgPSBmdW5jdGlvbiAoZWwpIHtcblx0ICAgIHRoaXNbMF0gPSB0aGlzLmVsZW1lbnQgPSBlbFxuXHR9XG5cblx0YXZhbG9uLmZuID0gYXZhbG9uLnByb3RvdHlwZSA9IGF2YWxvbi5pbml0LnByb3RvdHlwZVxuXG5cblx0YXZhbG9uLnNoYWRvd0NvcHkgPSBmdW5jdGlvbiAoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuXHQgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gc291cmNlKSB7XG5cdCAgICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGRlc3RpbmF0aW9uXG5cdH1cblxuXHR2YXIgcndvcmQgPSAvW14sIF0rL2dcblxuXHR2YXIgaGFzQ29uc29sZSA9IGdsb2JhbC5jb25zb2xlXG5cblx0YXZhbG9uLnNoYWRvd0NvcHkoYXZhbG9uLCB7XG5cdCAgICBub29wOiBmdW5jdGlvbiAoKSB7XG5cdCAgICB9LFxuXHQgICAgLy/liIflibLlrZfnrKbkuLLkuLrkuIDkuKrkuKrlsI/lnZfvvIzku6XnqbrmoLzmiJbpgJflj7fliIblvIDlroPku6zvvIznu5PlkIhyZXBsYWNl5a6e546w5a2X56ym5Liy55qEZm9yRWFjaFxuXHQgICAgcndvcmQ6IHJ3b3JkLFxuXHQgICAgaW5zcGVjdDogKHt9KS50b1N0cmluZyxcblx0ICAgIG9oYXNPd246ICh7fSkuaGFzT3duUHJvcGVydHksXG5cdCAgICBsb2c6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoaGFzQ29uc29sZSAmJiBhdmFsb24uY29uZmlnLmRlYnVnKSB7XG5cdCAgICAgICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODc4NTYyNC9ob3ctdG8tc2FmZWx5LXdyYXAtY29uc29sZS1sb2dcblx0ICAgICAgICAgICAgRnVuY3Rpb24uYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB3YXJuOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKGhhc0NvbnNvbGUgJiYgYXZhbG9uLmNvbmZpZy5kZWJ1Zykge1xuXHQgICAgICAgICAgICB2YXIgbWV0aG9kID0gY29uc29sZS53YXJuIHx8IGNvbnNvbGUubG9nXG5cdCAgICAgICAgICAgIC8vIGh0dHA6Ly9xaWFuZzEwNi5pdGV5ZS5jb20vYmxvZy8xNzIxNDI1XG5cdCAgICAgICAgICAgIEZ1bmN0aW9uLmFwcGx5LmNhbGwobWV0aG9kLCBjb25zb2xlLCBhcmd1bWVudHMpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGVycm9yOiBmdW5jdGlvbiAoc3RyLCBlKSB7XG5cdCAgICAgICAgdGhyb3cgKGUgfHwgRXJyb3IpKHN0cilcblx0ICAgIH0sXG5cdCAgICAvL+WwhuS4gOS4quS7peepuuagvOaIlumAl+WPt+malOW8gOeahOWtl+espuS4suaIluaVsOe7hCzovazmjaLmiJDkuIDkuKrplK7lgLzpg73kuLox55qE5a+56LGhXG5cdCAgICBvbmVPYmplY3Q6IGZ1bmN0aW9uIChhcnJheSwgdmFsKSB7XG5cdCAgICAgICAgaWYgKHR5cGVvZiBhcnJheSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgYXJyYXkgPSBhcnJheS5tYXRjaChyd29yZCkgfHwgW11cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IHt9LFxuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWwgIT09IHZvaWQgMCA/IHZhbCA6IDFcblx0ICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IGFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHQgICAgICAgICAgICByZXN1bHRbYXJyYXlbaV1dID0gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfVxuXG5cdH0pXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdmFsb25cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0oKSkpKVxuXG4vKioqLyB9LFxuLyogNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKGdsb2JhbCkge3ZhciB3aW5kb3cgPSBnbG9iYWxcblx0dmFyIGJyb3dzZXIgPSB7XG5cdCAgICB3aW5kb3c6IHdpbmRvdyxcblx0ICAgIGRvY3VtZW50OiB7Ly/mlrnkvr/lnKhub2RlanPnjq/looPkuI3kvJrmiqXplJlcblx0ICAgICAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHJldHVybiB7fVxuXHQgICAgICAgIH0sXG5cdCAgICAgICAgY3JlYXRlRWxlbWVudE5TOiBmdW5jdGlvbigpe1xuXHQgICAgICAgICAgICByZXR1cm4ge31cblx0ICAgICAgICB9LFxuXHQgICAgICAgIGNvbnRhaW5zOiBCb29sZWFuXG5cdCAgICB9LFxuXHQgICAgcm9vdDoge1xuXHQgICAgICAgIG91dGVySFRNTDogJ3gnXG5cdCAgICB9LFxuXHQgICAgbXNpZTogTmFOLFxuXHQgICAgbW9kZXJuOiB0cnVlLFxuXHQgICAgYXZhbG9uRGl2OiB7fSxcblx0ICAgIGF2YWxvbkZyYWdtZW50OiBudWxsXG5cdH1cblxuXHRpZih3aW5kb3cubG9jYXRpb24gJiYgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cud2luZG93KXtcblx0ICAgIHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudFxuXHQgICAgYnJvd3Nlci5kb2N1bWVudCA9IGRvY3VtZW50XG5cdCAgICBicm93c2VyLm1vZGVybiA9IHdpbmRvdy5kaXNwYXRjaEV2ZW50XG5cdCAgICBicm93c2VyLnJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblx0ICAgIGJyb3dzZXIuYXZhbG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0ICAgIGJyb3dzZXIuYXZhbG9uRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0ICAgIGlmICh3aW5kb3cuVkJBcnJheSkge1xuXHQgICAgICAgIGJyb3dzZXIubXNpZSA9IGRvY3VtZW50LmRvY3VtZW50TW9kZSB8fCAod2luZG93LlhNTEh0dHBSZXF1ZXN0ID8gNyA6IDYpXG5cdCAgICB9XG5cdH1cblxuXG5cdG1vZHVsZS5leHBvcnRzID0gYnJvd3NlclxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwoZXhwb3J0cywgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSgpKSkpXG5cbi8qKiovIH0sXG4vKiA1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvL+i/memHjOaUvue9ruWtmOWcqOW8guiurueahOaWueazlVxuXG5cdHZhciBzZXJpYWxpemUgPSBhdmFsb24uaW5zcGVjdFxuXHR2YXIgcndpbmRvdyA9IC9eXFxbb2JqZWN0ICg/OldpbmRvd3xET01XaW5kb3d8Z2xvYmFsKVxcXSQvXG5cdHZhciBybmF0aXZlID0gL1xcW25hdGl2ZSBjb2RlXFxdLyAvL+WIpOWumuaYr+WQpuWOn+eUn+WHveaVsFxuXHR2YXIgcmFycmF5bGlrZSA9IC8oQXJyYXl8TGlzdHxDb2xsZWN0aW9ufE1hcHxBcmd1bWVudHMpXFxdJC9cblx0dmFyIG9oYXNPd24gPSBhdmFsb24ub2hhc093blxuXHQvLyBhdmFsb24ucXVvdGVcblx0Ly9odHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvanNvbjMvYmxvYi9tYXN0ZXIvbGliL2pzb24zLmpzXG5cdHZhciBFc2NhcGVzID0ge1xuXHQgICAgOTI6IFwiXFxcXFxcXFxcIixcblx0ICAgIDM0OiAnXFxcXFwiJyxcblx0ICAgIDg6IFwiXFxcXGJcIixcblx0ICAgIDEyOiBcIlxcXFxmXCIsXG5cdCAgICAxMDogXCJcXFxcblwiLFxuXHQgICAgMTM6IFwiXFxcXHJcIixcblx0ICAgIDk6IFwiXFxcXHRcIlxuXHR9XG5cblx0Ly8gSW50ZXJuYWw6IENvbnZlcnRzIGB2YWx1ZWAgaW50byBhIHplcm8tcGFkZGVkIHN0cmluZyBzdWNoIHRoYXQgaXRzXG5cdC8vIGxlbmd0aCBpcyBhdCBsZWFzdCBlcXVhbCB0byBgd2lkdGhgLiBUaGUgYHdpZHRoYCBtdXN0IGJlIDw9IDYuXG5cdHZhciBsZWFkaW5nWmVyb2VzID0gXCIwMDAwMDBcIlxuXHR2YXIgdG9QYWRkZWRTdHJpbmcgPSBmdW5jdGlvbiAod2lkdGgsIHZhbHVlKSB7XG5cdCAgICAvLyBUaGUgYHx8IDBgIGV4cHJlc3Npb24gaXMgbmVjZXNzYXJ5IHRvIHdvcmsgYXJvdW5kIGEgYnVnIGluXG5cdCAgICAvLyBPcGVyYSA8PSA3LjU0dTIgd2hlcmUgYDAgPT0gLTBgLCBidXQgYFN0cmluZygtMCkgIT09IFwiMFwiYC5cblx0ICAgIHJldHVybiAobGVhZGluZ1plcm9lcyArICh2YWx1ZSB8fCAwKSkuc2xpY2UoLXdpZHRoKVxuXHR9O1xuXHR2YXIgdW5pY29kZVByZWZpeCA9IFwiXFxcXHUwMFwiXG5cdHZhciBlc2NhcGVDaGFyID0gZnVuY3Rpb24gKGNoYXJhY3Rlcikge1xuXHQgICAgdmFyIGNoYXJDb2RlID0gY2hhcmFjdGVyLmNoYXJDb2RlQXQoMCksIGVzY2FwZWQgPSBFc2NhcGVzW2NoYXJDb2RlXVxuXHQgICAgaWYgKGVzY2FwZWQpIHtcblx0ICAgICAgICByZXR1cm4gZXNjYXBlZFxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHVuaWNvZGVQcmVmaXggKyB0b1BhZGRlZFN0cmluZygyLCBjaGFyQ29kZS50b1N0cmluZygxNikpXG5cdH07XG5cdHZhciByZUVzY2FwZSA9IC9bXFx4MDAtXFx4MWZcXHgyMlxceDVjXS9nXG5cdGZ1bmN0aW9uIHF1b3RlKHZhbHVlKSB7XG5cdCAgICByZUVzY2FwZS5sYXN0SW5kZXggPSAwXG5cdCAgICByZXR1cm4gJ1wiJyArICggcmVFc2NhcGUudGVzdCh2YWx1ZSk/IFN0cmluZyh2YWx1ZSkucmVwbGFjZShyZUVzY2FwZSwgZXNjYXBlQ2hhcikgOiB2YWx1ZSApICsgJ1wiJ1xuXHR9XG5cblx0YXZhbG9uLnF1b3RlID0gdHlwZW9mIEpTT04gIT09ICd1bmRlZmluZWQnID8gSlNPTi5zdHJpbmdpZnkgOiBxdW90ZVxuXG5cdC8vIGF2YWxvbi50eXBlXG5cdHZhciBjbGFzczJ0eXBlID0ge31cblx0J0Jvb2xlYW4gTnVtYmVyIFN0cmluZyBGdW5jdGlvbiBBcnJheSBEYXRlIFJlZ0V4cCBPYmplY3QgRXJyb3InLnJlcGxhY2UoYXZhbG9uLnJ3b3JkLCBmdW5jdGlvbiAobmFtZSkge1xuXHQgICAgY2xhc3MydHlwZVsnW29iamVjdCAnICsgbmFtZSArICddJ10gPSBuYW1lLnRvTG93ZXJDYXNlKClcblx0fSlcblxuXHRhdmFsb24udHlwZSA9IGZ1bmN0aW9uIChvYmopIHsgLy/lj5blvpfnm67moIfnmoTnsbvlnotcblx0ICAgIGlmIChvYmogPT0gbnVsbCkge1xuXHQgICAgICAgIHJldHVybiBTdHJpbmcob2JqKVxuXHQgICAgfVxuXHQgICAgLy8g5pep5pyf55qEd2Via2l05YaF5qC45rWP6KeI5Zmo5a6e546w5LqG5bey5bqf5byD55qEZWNtYTI2MnY05qCH5YeG77yM5Y+v5Lul5bCG5q2j5YiZ5a2X6Z2i6YeP5b2T5L2c5Ye95pWw5L2/55So77yM5Zug5q2kdHlwZW9m5Zyo5Yik5a6a5q2j5YiZ5pe25Lya6L+U5ZueZnVuY3Rpb25cblx0ICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nID9cblx0ICAgICAgICAgICAgY2xhc3MydHlwZVtzZXJpYWxpemUuY2FsbChvYmopXSB8fCAnb2JqZWN0JyA6XG5cdCAgICAgICAgICAgIHR5cGVvZiBvYmpcblx0fVxuXG5cdHZhciByZnVuY3Rpb24gPSAvXlxccypcXGJmdW5jdGlvblxcYi9cblxuXHRhdmFsb24uaXNGdW5jdGlvbiA9IHR5cGVvZiBhbGVydCA9PT0gJ29iamVjdCcgPyBmdW5jdGlvbiAoZm4pIHtcblx0ICAgIHRyeSB7XG5cdCAgICAgICAgcmV0dXJuIHJmdW5jdGlvbi50ZXN0KGZuICsgJycpXG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9XG5cdH0gOiBmdW5jdGlvbiAoZm4pIHtcblx0ICAgIHJldHVybiBzZXJpYWxpemUuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSdcblx0fVxuXG5cdGF2YWxvbi5pc1dpbmRvdyA9IGZ1bmN0aW9uIChvYmopIHtcblx0ICAgIGlmICghb2JqKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgLy8g5Yip55SoSUU2Nzggd2luZG93ID09IGRvY3VtZW505Li6dHJ1ZSxkb2N1bWVudCA9PSB3aW5kb3fnq5/nhLbkuLpmYWxzZeeahOelnuWlh+eJueaAp1xuXHQgICAgLy8g5qCH5YeG5rWP6KeI5Zmo5Y+KSUU577yMSUUxMOetieS9v+eUqCDmraPliJnmo4DmtYtcblx0ICAgIHJldHVybiBvYmogPT0gb2JqLmRvY3VtZW50ICYmIG9iai5kb2N1bWVudCAhPSBvYmogLy9qc2hpbnQgaWdub3JlOmxpbmVcblx0fVxuXG5cblx0ZnVuY3Rpb24gaXNXaW5kb3cob2JqKSB7XG5cdCAgICByZXR1cm4gcndpbmRvdy50ZXN0KHNlcmlhbGl6ZS5jYWxsKG9iaikpXG5cdH1cblxuXHRpZiAoaXNXaW5kb3coYXZhbG9uLndpbmRvdykpIHtcblx0ICAgIGF2YWxvbi5pc1dpbmRvdyA9IGlzV2luZG93XG5cdH1cblxuXHR2YXIgZW51LCBlbnVtZXJhdGVCVUdcblx0Zm9yIChlbnUgaW4gYXZhbG9uKHt9KSkge1xuXHQgICAgYnJlYWtcblx0fVxuXHRlbnVtZXJhdGVCVUcgPSBlbnUgIT09ICcwJyAvL0lFNuS4i+S4unRydWUsIOWFtuS7luS4umZhbHNlXG5cblx0LyrliKTlrprmmK/lkKbmmK/kuIDkuKrmnLTntKDnmoRqYXZhc2NyaXB05a+56LGh77yIT2JqZWN077yJ77yM5LiN5pivRE9N5a+56LGh77yM5LiN5pivQk9N5a+56LGh77yM5LiN5piv6Ieq5a6a5LmJ57G755qE5a6e5L6LKi9cblx0YXZhbG9uLmlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiAob2JqLCBrZXkpIHtcblx0ICAgIGlmICghb2JqIHx8IGF2YWxvbi50eXBlKG9iaikgIT09ICdvYmplY3QnIHx8IG9iai5ub2RlVHlwZSB8fCBhdmFsb24uaXNXaW5kb3cob2JqKSkge1xuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgfVxuXHQgICAgdHJ5IHsgLy9JReWGhee9ruWvueixoeayoeaciWNvbnN0cnVjdG9yXG5cdCAgICAgICAgaWYgKG9iai5jb25zdHJ1Y3RvciAmJlxuXHQgICAgICAgICAgICAgICAgIW9oYXNPd24uY2FsbChvYmosICdjb25zdHJ1Y3RvcicpICYmXG5cdCAgICAgICAgICAgICAgICAhb2hhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgfHwge30sICdpc1Byb3RvdHlwZU9mJykpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgfVxuXHQgICAgfSBjYXRjaCAoZSkgeyAvL0lFOCA55Lya5Zyo6L+Z6YeM5oqb6ZSZXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9XG5cdCAgICBpZiAoZW51bWVyYXRlQlVHKSB7XG5cdCAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBvaGFzT3duLmNhbGwob2JqLCBrZXkpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgZm9yIChrZXkgaW4gb2JqKSB7XG5cdCAgICB9XG5cdCAgICByZXR1cm4ga2V5ID09PSB2b2lkIDAgfHwgb2hhc093bi5jYWxsKG9iaiwga2V5KVxuXHR9XG5cblxuXHRpZiAocm5hdGl2ZS50ZXN0KE9iamVjdC5nZXRQcm90b3R5cGVPZikpIHtcblx0ICAgIGF2YWxvbi5pc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICAgIC8vIOeugOWNleeahCB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J+ajgOa1i++8jOS8muiHtOS9v+eUqGlzUGxhaW5PYmplY3Qod2luZG93KeWcqG9wZXJh5LiL6YCa5LiN6L+HXG5cdCAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZS5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nICYmXG5cdCAgICAgICAgICAgICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PT0gT2JqZWN0LnByb3RvdHlwZVxuXHQgICAgfVxuXHR9XG5cblx0Ly/kuI5qUXVlcnkuZXh0ZW5k5pa55rOV77yM5Y+v55So5LqO5rWF5ou36LSd77yM5rex5ou36LSdXG5cdGF2YWxvbi5taXggPSBhdmFsb24uZm4ubWl4ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY29weUlzQXJyYXksIGNsb25lLFxuXHQgICAgICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG5cdCAgICAgICAgICAgIGkgPSAxLFxuXHQgICAgICAgICAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHQgICAgICAgICAgICBkZWVwID0gZmFsc2VcblxuXHQgICAgLy8g5aaC5p6c56ys5LiA5Liq5Y+C5pWw5Li65biD5bCULOWIpOWumuaYr+WQpua3seaLt+i0nVxuXHQgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuXHQgICAgICAgIGRlZXAgPSB0YXJnZXRcblx0ICAgICAgICB0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge31cblx0ICAgICAgICBpKytcblx0ICAgIH1cblxuXHQgICAgLy/noa7kv53mjqXlj5fmlrnkuLrkuIDkuKrlpI3mnYLnmoTmlbDmja7nsbvlnotcblx0ICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiAhYXZhbG9uLmlzRnVuY3Rpb24odGFyZ2V0KSkge1xuXHQgICAgICAgIHRhcmdldCA9IHt9XG5cdCAgICB9XG5cblx0ICAgIC8v5aaC5p6c5Y+q5pyJ5LiA5Liq5Y+C5pWw77yM6YKj5LmI5paw5oiQ5ZGY5re75Yqg5LqObWl45omA5Zyo55qE5a+56LGh5LiKXG5cdCAgICBpZiAoaSA9PT0gbGVuZ3RoKSB7XG5cdCAgICAgICAgdGFyZ2V0ID0gdGhpc1xuXHQgICAgICAgIGktLVxuXHQgICAgfVxuXG5cdCAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgLy/lj6rlpITnkIbpnZ7nqbrlj4LmlbBcblx0ICAgICAgICBpZiAoKG9wdGlvbnMgPSBhcmd1bWVudHNbaV0pICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgZm9yIChuYW1lIGluIG9wdGlvbnMpIHtcblx0ICAgICAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3JjID0gdGFyZ2V0W25hbWVdXG5cdCAgICAgICAgICAgICAgICAgICAgY29weSA9IG9wdGlvbnNbbmFtZV0gLy/lvZNvcHRpb25z5Li6VkJT5a+56LGh5pe25oql6ZSZXG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8g6Ziy5q2i546v5byV55SoXG5cdCAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBjb3B5KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmIChkZWVwICYmIGNvcHkgJiYgKGF2YWxvbi5pc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IEFycmF5LmlzQXJyYXkoY29weSkpKSkge1xuXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHlJc0FycmF5KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlJc0FycmF5ID0gZmFsc2Vcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgQXJyYXkuaXNBcnJheShzcmMpID8gc3JjIDogW11cblxuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lID0gc3JjICYmIGF2YWxvbi5pc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IGF2YWxvbi5taXgoZGVlcCwgY2xvbmUsIGNvcHkpXG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvcHkgIT09IHZvaWQgMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IGNvcHlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiB0YXJnZXRcblx0fVxuXG5cdC8q5Yik5a6a5piv5ZCm57G75pWw57uE77yM5aaC6IqC54K56ZuG5ZCI77yM57qv5pWw57uE77yMYXJndW1lbnRz5LiO5oul5pyJ6Z2e6LSf5pW05pWw55qEbGVuZ3Ro5bGe5oCn55qE57qvSlPlr7nosaEqL1xuXHRmdW5jdGlvbiBpc0FycmF5TGlrZShvYmopIHtcblx0ICAgIGlmICghb2JqKVxuXHQgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgdmFyIG4gPSBvYmoubGVuZ3RoXG5cdCAgICBpZiAobiA9PT0gKG4gPj4+IDApKSB7IC8v5qOA5rWLbGVuZ3Ro5bGe5oCn5piv5ZCm5Li66Z2e6LSf5pW05pWwXG5cdCAgICAgICAgdmFyIHR5cGUgPSBzZXJpYWxpemUuY2FsbChvYmopLnNsaWNlKDgsIC0xKVxuXHQgICAgICAgIGlmIChyYXJyYXlsaWtlLnRlc3QodHlwZSkpXG5cdCAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgICAgIGlmICh0eXBlID09PSAnQXJyYXknKVxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIGlmICh7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgJ2xlbmd0aCcpID09PSBmYWxzZSkgeyAvL+WmguaenOaYr+WOn+eUn+WvueixoVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHJmdW5jdGlvbi50ZXN0KG9iai5pdGVtIHx8IG9iai5jYWxsZWUpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIHRydWVcblx0ICAgICAgICB9IGNhdGNoIChlKSB7IC8vSUXnmoROb2RlTGlzdOebtOaOpeaKm+mUmVxuXHQgICAgICAgICAgICByZXR1cm4gIW9iai53aW5kb3cgLy9JRTYtOCB3aW5kb3dcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gZmFsc2Vcblx0fVxuXG5cblx0YXZhbG9uLmVhY2ggPSBmdW5jdGlvbiAob2JqLCBmbikge1xuXHQgICAgaWYgKG9iaikgeyAvL+aOkumZpG51bGwsIHVuZGVmaW5lZFxuXHQgICAgICAgIHZhciBpID0gMFxuXHQgICAgICAgIGlmIChpc0FycmF5TGlrZShvYmopKSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIG4gPSBvYmoubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoZm4oaSwgb2JqW2ldKSA9PT0gZmFsc2UpXG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGZvciAoaSBpbiBvYmopIHtcblx0ICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkgJiYgZm4oaSwgb2JqW2ldKSA9PT0gZmFsc2UpIHtcblx0ICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICBhdmFsb246IGF2YWxvbixcblx0ICAgIGlzQXJyYXlMaWtlOiBpc0FycmF5TGlrZVxuXHR9XG5cblxuXG4vKioqLyB9LFxuLyogNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIGNzc0hvb2tzID0ge31cblx0dmFyIHJoeXBoZW4gPSAvKFthLXpcXGRdKShbQS1aXSspL2dcblx0dmFyIHJjYW1lbGl6ZSA9IC9bLV9dW14tX10vZ1xuXHR2YXIgcmhhc2hjb2RlID0gL1xcZFxcLlxcZHs0fS9cblx0dmFyIHJlc2NhcGUgPSAvWy0uKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nXG5cblx0dmFyIF9zbGljZSA9IFtdLnNsaWNlXG5cdGZ1bmN0aW9uIGRlZmF1bHRQYXJzZShjdXIsIHByZSwgYmluZGluZykge1xuXHQgICAgICAgY3VyW2JpbmRpbmcubmFtZV0gPSBhdmFsb24ucGFyc2VFeHByKGJpbmRpbmcpXG5cdH1cblx0YXZhbG9uLnNoYWRvd0NvcHkoYXZhbG9uLCB7XG5cdCAgICBjYWNoZXM6IHt9LCAvL2F2YWxvbjIuMCDmlrDlop5cblx0ICAgIHZtb2RlbHM6IHt9LFxuXHQgICAgZmlsdGVyczoge30sXG5cdCAgICBjb21wb25lbnRzOiB7fSwvL+aUvue9rue7hOS7tueahOexu1xuXHQgICAgZGlyZWN0aXZlczoge30sXG5cdCAgICBldmVudEhvb2tzOiB7fSxcblx0ICAgIGV2ZW50TGlzdGVuZXJzOiB7fSxcblx0ICAgIHZhbGlkYXRvcnM6IHt9LFxuXHQgICAgc2NvcGVzOiB7fSxcblx0ICAgIGNzc0hvb2tzOiBjc3NIb29rcyxcblx0ICAgIHBhcnNlcnM6IHtcblx0ICAgICAgICBudW1iZXI6IGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBhID09PSAnJyA/ICcnIDogL1xcZFxcLiQvLnRlc3QoYSkgPyBhIDogcGFyc2VGbG9hdChhKSB8fCAwXG5cdCAgICAgICAgfSxcblx0ICAgICAgICBzdHJpbmc6IGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBhID09PSBudWxsIHx8IGEgPT09IHZvaWQgMCA/ICcnIDogYSArICcnXG5cdCAgICAgICAgfSxcblx0ICAgICAgICBib29sZWFuOiBmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgICAgICBpZihhID09PSAnJylcblx0ICAgICAgICAgICAgICAgIHJldHVybiBhXG5cdCAgICAgICAgICAgIHJldHVybiBhID09PSAndHJ1ZSd8fCBhID09ICcxJ1xuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB2ZXJzaW9uOiBcIjIuMTExXCIsXG5cdCAgICBzbGljZTogZnVuY3Rpb24gKG5vZGVzLCBzdGFydCwgZW5kKSB7XG5cdCAgICAgICAgcmV0dXJuIF9zbGljZS5jYWxsKG5vZGVzLCBzdGFydCwgZW5kKVxuXHQgICAgfSxcblx0ICAgIGNzczogZnVuY3Rpb24gKG5vZGUsIG5hbWUsIHZhbHVlLCBmbikge1xuXHQgICAgICAgIC8v6K+75YaZ5Yig6Zmk5YWD57Sg6IqC54K555qE5qC35byPXG5cdCAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBhdmFsb24pIHtcblx0ICAgICAgICAgICAgbm9kZSA9IG5vZGVbMF1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYobm9kZS5ub2RlVHlwZSAhPT0xKXtcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBwcm9wID0gYXZhbG9uLmNhbWVsaXplKG5hbWUpXG5cdCAgICAgICAgbmFtZSA9IGF2YWxvbi5jc3NOYW1lKHByb3ApIHx8IHByb3Bcblx0ICAgICAgICBpZiAodmFsdWUgPT09IHZvaWQgMCB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykgeyAvL+iOt+WPluagt+W8j1xuXHQgICAgICAgICAgICBmbiA9IGNzc0hvb2tzW3Byb3AgKyAnOmdldCddIHx8IGNzc0hvb2tzWydAOmdldCddXG5cdCAgICAgICAgICAgIGlmIChuYW1lID09PSAnYmFja2dyb3VuZCcpIHtcblx0ICAgICAgICAgICAgICAgIG5hbWUgPSAnYmFja2dyb3VuZENvbG9yJ1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciB2YWwgPSBmbihub2RlLCBuYW1lKVxuXHQgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgPyBwYXJzZUZsb2F0KHZhbCkgfHwgMCA6IHZhbFxuXHQgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnKSB7IC8v6K+36Zmk5qC35byPXG5cdCAgICAgICAgICAgIG5vZGUuc3R5bGVbbmFtZV0gPSAnJ1xuXHQgICAgICAgIH0gZWxzZSB7IC8v6K6+572u5qC35byPXG5cdCAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlICE9PSB2YWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGlzRmluaXRlKHZhbHVlKSAmJiAhYXZhbG9uLmNzc051bWJlcltwcm9wXSkge1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgKz0gJ3B4J1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGZuID0gY3NzSG9va3NbcHJvcCArICc6c2V0J10gfHwgY3NzSG9va3NbJ0A6c2V0J11cblx0ICAgICAgICAgICAgZm4obm9kZSwgbmFtZSwgdmFsdWUpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGRpcmVjdGl2ZTogZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcblx0ICAgICAgICBkZWZpbml0aW9uLnBhcnNlID0gZGVmaW5pdGlvbi5wYXJzZSB8fCBkZWZhdWx0UGFyc2Vcblx0ICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3RpdmVzW25hbWVdID0gZGVmaW5pdGlvblxuXHQgICAgfSxcblx0ICAgIGlzT2JqZWN0OiBmdW5jdGlvbiAoYSkgey8vMS425paw5aKeXG5cdCAgICAgICAgcmV0dXJuIGEgIT09IG51bGwgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnXG5cdCAgICB9LFxuXHQgICAgLyogYXZhbG9uLnJhbmdlKDEwKVxuXHQgICAgID0+IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XVxuXHQgICAgIGF2YWxvbi5yYW5nZSgxLCAxMSlcblx0ICAgICA9PiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdXG5cdCAgICAgYXZhbG9uLnJhbmdlKDAsIDMwLCA1KVxuXHQgICAgID0+IFswLCA1LCAxMCwgMTUsIDIwLCAyNV1cblx0ICAgICBhdmFsb24ucmFuZ2UoMCwgLTEwLCAtMSlcblx0ICAgICA9PiBbMCwgLTEsIC0yLCAtMywgLTQsIC01LCAtNiwgLTcsIC04LCAtOV1cblx0ICAgICBhdmFsb24ucmFuZ2UoMClcblx0ICAgICA9PiBbXSovXG5cdCAgICByYW5nZTogZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHN0ZXApIHsgLy8g55So5LqO55Sf5oiQ5pW05pWw5pWw57uEXG5cdCAgICAgICAgc3RlcCB8fCAoc3RlcCA9IDEpXG5cdCAgICAgICAgaWYgKGVuZCA9PSBudWxsKSB7XG5cdCAgICAgICAgICAgIGVuZCA9IHN0YXJ0IHx8IDBcblx0ICAgICAgICAgICAgc3RhcnQgPSAwXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBpbmRleCA9IC0xLFxuXHQgICAgICAgICAgICAgICAgbGVuZ3RoID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKChlbmQgLSBzdGFydCkgLyBzdGVwKSksXG5cdCAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgQXJyYXkobGVuZ3RoKVxuXHQgICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIHJlc3VsdFtpbmRleF0gPSBzdGFydFxuXHQgICAgICAgICAgICBzdGFydCArPSBzdGVwXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHRcblx0ICAgIH0sXG5cdCAgICBoeXBoZW46IGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0ICAgICAgICAvL+i9rOaNouS4uui/nuWtl+espue6v+mjjuagvFxuXHQgICAgICAgIHJldHVybiB0YXJnZXQucmVwbGFjZShyaHlwaGVuLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpXG5cdCAgICB9LFxuXHQgICAgY2FtZWxpemU6IGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0ICAgICAgICAvL+aPkOWJjeWIpOaWre+8jOaPkOmrmGdldFN0eWxl562J55qE5pWI546HXG5cdCAgICAgICAgaWYgKCF0YXJnZXQgfHwgdGFyZ2V0LmluZGV4T2YoJy0nKSA8IDAgJiYgdGFyZ2V0LmluZGV4T2YoJ18nKSA8IDApIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRhcmdldFxuXHQgICAgICAgIH1cblx0ICAgICAgICAvL+i9rOaNouS4uumpvOWzsOmjjuagvFxuXHQgICAgICAgIHJldHVybiB0YXJnZXQucmVwbGFjZShyY2FtZWxpemUsIGZ1bmN0aW9uIChtYXRjaCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbWF0Y2guY2hhckF0KDEpLnRvVXBwZXJDYXNlKClcblx0ICAgICAgICB9KVxuXHQgICAgfSxcblx0ICAgIC8v55Sf5oiQVVVJRCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9ob3ctdG8tY3JlYXRlLWEtZ3VpZC11dWlkLWluLWphdmFzY3JpcHRcblx0ICAgIG1ha2VIYXNoQ29kZTogZnVuY3Rpb24gKHByZWZpeCkge1xuXHQgICAgICAgIHByZWZpeCA9IHByZWZpeCB8fCAnYXZhbG9uJ1xuXHQgICAgICAgIHJldHVybiBTdHJpbmcoTWF0aC5yYW5kb20oKSArIE1hdGgucmFuZG9tKCkpLnJlcGxhY2Uocmhhc2hjb2RlLCBwcmVmaXgpXG5cdCAgICB9LFxuXHQgICAgZXNjYXBlUmVnRXhwOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdCAgICAgICAgLy9odHRwOi8vc3RldmVubGV2aXRoYW4uY29tL3JlZ2V4L3hyZWdleHAvXG5cdCAgICAgICAgLy/lsIblrZfnrKbkuLLlronlhajmoLzlvI/ljJbkuLrmraPliJnooajovr7lvI/nmoTmupDnoIFcblx0ICAgICAgICByZXR1cm4gKHRhcmdldCArICcnKS5yZXBsYWNlKHJlc2NhcGUsICdcXFxcJCYnKVxuXHQgICAgfSxcblx0ICAgIEFycmF5OiB7XG5cdCAgICAgICAgbWVyZ2U6IGZ1bmN0aW9uICh0YXJnZXQsIG90aGVyKSB7XG5cdCAgICAgICAgICAgIC8v5ZCI5bm25Lik5Liq5pWw57uEIGF2YWxvbjLmlrDlop5cblx0ICAgICAgICAgICAgdGFyZ2V0LnB1c2guYXBwbHkodGFyZ2V0LCBvdGhlcilcblx0ICAgICAgICB9LFxuXHQgICAgICAgIGVuc3VyZTogZnVuY3Rpb24gKHRhcmdldCwgaXRlbSkge1xuXHQgICAgICAgICAgICAvL+WPquacieW9k+WJjeaVsOe7hOS4jeWtmOWcqOatpOWFg+e0oOaXtuWPqua3u+WKoOWug1xuXHQgICAgICAgICAgICBpZiAodGFyZ2V0LmluZGV4T2YoaXRlbSkgPT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0LnB1c2goaXRlbSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cdCAgICAgICAgcmVtb3ZlQXQ6IGZ1bmN0aW9uICh0YXJnZXQsIGluZGV4KSB7XG5cdCAgICAgICAgICAgIC8v56e76Zmk5pWw57uE5Lit5oyH5a6a5L2N572u55qE5YWD57Sg77yM6L+U5Zue5biD5bCU6KGo56S65oiQ5Yqf5LiO5ZCmXG5cdCAgICAgICAgICAgIHJldHVybiAhIXRhcmdldC5zcGxpY2UoaW5kZXgsIDEpLmxlbmd0aFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAodGFyZ2V0LCBpdGVtKSB7XG5cdCAgICAgICAgICAgIC8v56e76Zmk5pWw57uE5Lit56ys5LiA5Liq5Yy56YWN5Lyg5Y+C55qE6YKj5Liq5YWD57Sg77yM6L+U5Zue5biD5bCU6KGo56S65oiQ5Yqf5LiO5ZCmXG5cdCAgICAgICAgICAgIHZhciBpbmRleCA9IHRhcmdldC5pbmRleE9mKGl0ZW0pXG5cdCAgICAgICAgICAgIGlmICh+aW5kZXgpXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYXZhbG9uLkFycmF5LnJlbW92ZUF0KHRhcmdldCwgaW5kZXgpXG5cdCAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fSlcblxuXHRpZih0eXBlb2YgcGVyZm9ybWFuY2UgIT09ICd1bmRlZmluZWQnICYmIHBlcmZvcm1hbmNlLm5vdyl7XG5cdCAgICBhdmFsb24ubWFrZUhhc2hDb2RlID0gZnVuY3Rpb24gKHByZWZpeCkge1xuXHQgICAgICAgIHByZWZpeCA9IHByZWZpeCB8fCAnYXZhbG9uJ1xuXHQgICAgICAgIHJldHVybiAocHJlZml4ICsgcGVyZm9ybWFuY2Uubm93KCkpLnJlcGxhY2UoJy4nLCAnJylcblx0ICAgIH1cblx0fVxuXG5cdHZhciBVVUlEID0gMVxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIC8v55Sf5oiQ5LqL5Lu25Zue6LCD55qEVVVJRCjnlKjmiLfpgJrov4dtcy1vbuaMh+S7pClcblx0ICAgIGF2YWxvbjogYXZhbG9uLFxuXHQgICAgZ2V0TG9uZ0lEOiBmdW5jdGlvbiAoZm4pIHtcblx0ICAgICAgICByZXR1cm4gZm4udXVpZCB8fCAoZm4udXVpZCA9IGF2YWxvbi5tYWtlSGFzaENvZGUoJ2UnKSlcblx0ICAgIH0sXG5cdCAgICAvL+eUn+aIkOS6i+S7tuWbnuiwg+eahFVVSUQo55So5oi36YCa6L+HYXZhbG9uLmJpbmQpXG5cdCAgICBnZXRTaG9ydElEOiBmdW5jdGlvbiAoZm4pIHtcblx0ICAgICAgICByZXR1cm4gZm4udXVpZCB8fCAoZm4udXVpZCA9ICdfJyArICgrK1VVSUQpKVxuXHQgICAgfVxuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFxuXHRmdW5jdGlvbiBrZXJuZWwoc2V0dGluZ3MpIHtcblx0ICAgIGZvciAodmFyIHAgaW4gc2V0dGluZ3MpIHtcblx0ICAgICAgICBpZiAoIWF2YWxvbi5vaGFzT3duLmNhbGwoc2V0dGluZ3MsIHApKVxuXHQgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgIHZhciB2YWwgPSBzZXR0aW5nc1twXVxuXHQgICAgICAgIGlmICh0eXBlb2Yga2VybmVsLnBsdWdpbnNbcF0gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAga2VybmVsLnBsdWdpbnNbcF0odmFsKVxuXHQgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGtlcm5lbFtwXSA9PT0gJ29iamVjdCcpIHtcblx0ICAgICAgICAgICAgYXZhbG9uLnNoYWRvd0NvcHkoa2VybmVsW3BdLCB2YWwpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAga2VybmVsW3BdID0gdmFsXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRoaXNcblx0fVxuXG5cdGF2YWxvbi5jb25maWcgPSBrZXJuZWxcblxuXHR2YXIgcGx1Z2lucyA9IHtcblx0ICAgIGludGVycG9sYXRlOiBmdW5jdGlvbiAoYXJyYXkpIHtcblx0ICAgICAgICB2YXIgb3BlblRhZyA9IGFycmF5WzBdXG5cdCAgICAgICAgdmFyIGNsb3NlVGFnID0gYXJyYXlbMV1cblx0ICAgICAgICAvKmVzbGludC1kaXNhYmxlICovXG5cdCAgICAgICAgaWYgKG9wZW5UYWcgPT09IGNsb3NlVGFnKSB7XG5cdCAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignb3BlblRhZyE9PWNsb3NlVGFnJylcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHRlc3QgPSBvcGVuVGFnICsgJ3Rlc3QnICsgY2xvc2VUYWdcblx0ICAgICAgICB2YXIgZGl2ID0gYXZhbG9uLmF2YWxvbkRpdlxuXHQgICAgICAgIGRpdi5pbm5lckhUTUwgPSB0ZXN0XG5cdCAgICAgICAgaWYgKGRpdi5pbm5lckhUTUwgIT09IHRlc3QgJiYgZGl2LmlubmVySFRNTC5pbmRleE9mKCcmbHQ7JykgPiAtMSkge1xuXHQgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ+atpOWumueVjOespuS4jeWQiOazlScpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRpdi5pbm5lckhUTUwgPSAnJ1xuXHQgICAgICAgIC8qZXNsaW50LWVuYWJsZSAqL1xuXHQgICAgICAgIGtlcm5lbC5vcGVuVGFnID0gb3BlblRhZ1xuXHQgICAgICAgIGtlcm5lbC5jbG9zZVRhZyA9IGNsb3NlVGFnXG5cdCAgICAgICAgdmFyIG8gPSBhdmFsb24uZXNjYXBlUmVnRXhwKG9wZW5UYWcpXG5cdCAgICAgICAgdmFyIGMgPSBhdmFsb24uZXNjYXBlUmVnRXhwKGNsb3NlVGFnKVxuXHQgICAgICAgIGtlcm5lbC5yZXhwciA9IG5ldyBSZWdFeHAobyArICcoW1xcXFxzXFxcXFNdKiknICsgYylcblx0ICAgICAgICBrZXJuZWwucmV4cHJnID0gbmV3IFJlZ0V4cChvICsgJyhbXFxcXHNcXFxcU10qKScgKyBjLCAnZycpXG5cdCAgICAgICAga2VybmVsLnJiaW5kID0gbmV3IFJlZ0V4cChvICsgJ1tcXFxcc1xcXFxTXSonICsgYyArICd8XFxcXGJtcy18XFxcXGJzbG90XFxcXGInKVxuXHQgICAgfVxuXHR9XG5cdGtlcm5lbC5wbHVnaW5zID0gcGx1Z2luc1xuXHRhdmFsb24uY29uZmlnKHtcblx0ICAgIGludGVycG9sYXRlOiBbJ3t7JywgJ319J10sXG5cdCAgICBkZWJ1ZzogdHJ1ZVxuXHR9KVxuXG5cbi8qKiovIH0sXG4vKiA4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcblx0dmFyIG51bWJlciA9IF9fd2VicGFja19yZXF1aXJlX18oOSlcblx0dmFyIHNhbml0aXplID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMClcblx0dmFyIGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKVxuXHR2YXIgYXJyYXlGaWx0ZXJzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMilcblx0dmFyIGV2ZW50RmlsdGVycyA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpXG5cdHZhciBmaWx0ZXJzID0gYXZhbG9uLmZpbHRlcnNcblxuXHRmdW5jdGlvbiBLKGEpIHtcblx0ICAgIHJldHVybiBhXG5cdH1cblxuXHRhdmFsb24uX19mb3JtYXRfXyA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdCAgICB2YXIgZm4gPSBmaWx0ZXJzW25hbWVdXG5cdCAgICBpZiAoZm4pIHtcblx0ICAgICAgICByZXR1cm4gZm4uZ2V0ID8gZm4uZ2V0IDogZm5cblx0ICAgIH1cblx0ICAgIHJldHVybiBLXG5cdH1cblxuXG5cdGF2YWxvbi5taXgoZmlsdGVycywge1xuXHQgICAgdXBwZXJjYXNlOiBmdW5jdGlvbiAoc3RyKSB7XG5cdCAgICAgICAgcmV0dXJuIFN0cmluZyhzdHIpLnRvVXBwZXJDYXNlKClcblx0ICAgIH0sXG5cdCAgICBsb3dlcmNhc2U6IGZ1bmN0aW9uIChzdHIpIHtcblx0ICAgICAgICByZXR1cm4gU3RyaW5nKHN0cikudG9Mb3dlckNhc2UoKVxuXHQgICAgfSxcblx0ICAgIHRydW5jYXRlOiBmdW5jdGlvbiAoc3RyLCBsZW5ndGgsIHRydW5jYXRpb24pIHtcblx0ICAgICAgICAvL2xlbmd0aO+8jOaWsOWtl+espuS4sumVv+W6pu+8jHRydW5jYXRpb27vvIzmlrDlrZfnrKbkuLLnmoTnu5PlsL7nmoTlrZfmrrUs6L+U5Zue5paw5a2X56ym5LiyXG5cdCAgICAgICAgbGVuZ3RoID0gbGVuZ3RoIHx8IDMwXG5cdCAgICAgICAgdHJ1bmNhdGlvbiA9IHR5cGVvZiB0cnVuY2F0aW9uID09PSBcInN0cmluZ1wiID8gdHJ1bmNhdGlvbiA6IFwiLi4uXCJcblx0ICAgICAgICByZXR1cm4gc3RyLmxlbmd0aCA+IGxlbmd0aCA/XG5cdCAgICAgICAgICAgICAgICBzdHIuc2xpY2UoMCwgbGVuZ3RoIC0gdHJ1bmNhdGlvbi5sZW5ndGgpICsgdHJ1bmNhdGlvbiA6XG5cdCAgICAgICAgICAgICAgICBTdHJpbmcoc3RyKVxuXHQgICAgfSxcblx0ICAgIGNhbWVsaXplOiBhdmFsb24uY2FtZWxpemUsXG5cdCAgICBkYXRlOiBkYXRlLFxuXHQgICAgZXNjYXBlOiBhdmFsb24uZXNjYXBlSHRtbCxcblx0ICAgIHNhbml0aXplOiBzYW5pdGl6ZSxcblx0ICAgIG51bWJlcjogbnVtYmVyLFxuXHQgICAgY3VycmVuY3k6IGZ1bmN0aW9uIChhbW91bnQsIHN5bWJvbCwgZnJhY3Rpb25TaXplKSB7XG5cdCAgICAgICAgcmV0dXJuIChzeW1ib2wgfHwgXCJcXHVGRkU1XCIpICtcblx0ICAgICAgICAgICAgICAgIG51bWJlcihhbW91bnQsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlzRmluaXRlKGZyYWN0aW9uU2l6ZSkgPyBmcmFjdGlvblNpemUgOiAyKVxuXHQgICAgfVxuXHR9LCBhcnJheUZpbHRlcnMsIGV2ZW50RmlsdGVycylcblxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXZhbG9uXG5cbi8qKiovIH0sXG4vKiA5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRmdW5jdGlvbiBudW1iZXIobnVtYmVyLCBkZWNpbWFscywgcG9pbnQsIHRob3VzYW5kcykge1xuXHQgICAgLy9mb3JtIGh0dHA6Ly9waHBqcy5vcmcvZnVuY3Rpb25zL251bWJlcl9mb3JtYXQvXG5cdCAgICAvL251bWJlciDlv4XpnIDvvIzopoHmoLzlvI/ljJbnmoTmlbDlrZdcblx0ICAgIC8vZGVjaW1hbHMg5Y+v6YCJ77yM6KeE5a6a5aSa5bCR5Liq5bCP5pWw5L2N44CCXG5cdCAgICAvL3BvaW50IOWPr+mAie+8jOinhOWumueUqOS9nOWwj+aVsOeCueeahOWtl+espuS4su+8iOm7mOiupOS4uiAuIO+8ieOAglxuXHQgICAgLy90aG91c2FuZHMg5Y+v6YCJ77yM6KeE5a6a55So5L2c5Y2D5L2N5YiG6ZqU56ym55qE5a2X56ym5Liy77yI6buY6K6k5Li6ICwg77yJ77yM5aaC5p6c6K6+572u5LqG6K+l5Y+C5pWw77yM6YKj5LmI5omA5pyJ5YW25LuW5Y+C5pWw6YO95piv5b+F6ZyA55qE44CCXG5cdCAgICBudW1iZXIgPSAobnVtYmVyICsgJycpXG5cdCAgICAgICAgICAgIC5yZXBsYWNlKC9bXjAtOStcXC1FZS5dL2csICcnKVxuXHQgICAgdmFyIG4gPSAhaXNGaW5pdGUoK251bWJlcikgPyAwIDogK251bWJlcixcblx0ICAgICAgICAgICAgcHJlYyA9ICFpc0Zpbml0ZSgrZGVjaW1hbHMpID8gMyA6IE1hdGguYWJzKGRlY2ltYWxzKSxcblx0ICAgICAgICAgICAgc2VwID0gdGhvdXNhbmRzIHx8IFwiLFwiLFxuXHQgICAgICAgICAgICBkZWMgPSBwb2ludCB8fCBcIi5cIixcblx0ICAgICAgICAgICAgcyA9ICcnLFxuXHQgICAgICAgICAgICB0b0ZpeGVkRml4ID0gZnVuY3Rpb24gKG4sIHByZWMpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBrID0gTWF0aC5wb3coMTAsIHByZWMpXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gJycgKyAoTWF0aC5yb3VuZChuICogaykgLyBrKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAudG9GaXhlZChwcmVjKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAvLyBGaXggZm9yIElFIHBhcnNlRmxvYXQoMC41NSkudG9GaXhlZCgwKSA9IDA7XG5cdCAgICBzID0gKHByZWMgPyB0b0ZpeGVkRml4KG4sIHByZWMpIDogJycgKyBNYXRoLnJvdW5kKG4pKVxuXHQgICAgICAgICAgICAuc3BsaXQoJy4nKVxuXHQgICAgaWYgKHNbMF0ubGVuZ3RoID4gMykge1xuXHQgICAgICAgIHNbMF0gPSBzWzBdLnJlcGxhY2UoL1xcQig/PSg/OlxcZHszfSkrKD8hXFxkKSkvZywgc2VwKVxuXHQgICAgfVxuXHQgICAgaWYgKChzWzFdIHx8ICcnKVxuXHQgICAgICAgICAgICAubGVuZ3RoIDwgcHJlYykge1xuXHQgICAgICAgIHNbMV0gPSBzWzFdIHx8ICcnXG5cdCAgICAgICAgc1sxXSArPSBuZXcgQXJyYXkocHJlYyAtIHNbMV0ubGVuZ3RoICsgMSlcblx0ICAgICAgICAgICAgICAgIC5qb2luKCcwJylcblx0ICAgIH1cblx0ICAgIHJldHVybiBzLmpvaW4oZGVjKVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBudW1iZXJcblxuXHQvL+WkhOeQhiDotKfluIEgaHR0cDovL29wZW5leGNoYW5nZXJhdGVzLmdpdGh1Yi5pby9hY2NvdW50aW5nLmpzL1xuXG4vKioqLyB9LFxuLyogMTAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdHZhciByc2NyaXB0cyA9IC88c2NyaXB0W14+XSo+KFtcXFNcXHNdKj8pPFxcL3NjcmlwdFxccyo+L2dpbVxuXHR2YXIgcm9uID0gL1xccysob25bXj1cXHNdKykoPzo9KFwiW15cIl0qXCJ8J1teJ10qJ3xbXlxccz5dKykpPy9nXG5cdHZhciByb3BlbiA9IC88XFx3K1xcYig/OihbXCInXSlbXlwiXSo/KFxcMSl8W14+XSkqPi9pZ1xuXHR2YXIgcnNhbml0aXplID0ge1xuXHQgICAgYTogL1xcYihocmVmKVxcPShcImphdmFzY3JpcHRbXlwiXSpcInwnamF2YXNjcmlwdFteJ10qJykvaWcsXG5cdCAgICBpbWc6IC9cXGIoc3JjKVxcPShcImphdmFzY3JpcHRbXlwiXSpcInwnamF2YXNjcmlwdFteJ10qJykvaWcsXG5cdCAgICBmb3JtOiAvXFxiKGFjdGlvbilcXD0oXCJqYXZhc2NyaXB0W15cIl0qXCJ8J2phdmFzY3JpcHRbXiddKicpL2lnXG5cdH1cblxuXG5cdC8vaHR0cHM6Ly93d3cub3dhc3Aub3JnL2luZGV4LnBocC9YU1NfRmlsdGVyX0V2YXNpb25fQ2hlYXRfU2hlZXRcblx0Ly8gICAgPGEgaHJlZj1cImphdmFzYyZOZXdMaW5lO3JpcHQmY29sb247YWxlcnQoJ1hTUycpXCI+Y2hyb21lPC9hPiBcblx0Ly8gICAgPGEgaHJlZj1cImRhdGE6dGV4dC9odG1sO2Jhc2U2NCwgUEdsdFp5QnpjbU05ZUNCdmJtVnljbTl5UFdGc1pYSjBLREVwUGc9PVwiPmNocm9tZTwvYT5cblx0Ly8gICAgPGEgaHJlZj1cImphdlx0YXNjcmlwdDphbGVydCgnWFNTJyk7XCI+SUU2N2Nocm9tZTwvYT5cblx0Ly8gICAgPGEgaHJlZj1cImphdiYjeDA5O2FzY3JpcHQ6YWxlcnQoJ1hTUycpO1wiPklFNjdjaHJvbWU8L2E+XG5cdC8vICAgIDxhIGhyZWY9XCJqYXYmI3gwQTthc2NyaXB0OmFsZXJ0KCdYU1MnKTtcIj5JRTY3Y2hyb21lPC9hPlxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNhbml0aXplKHN0cikge1xuXHQgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJzY3JpcHRzLCBcIlwiKS5yZXBsYWNlKHJvcGVuLCBmdW5jdGlvbiAoYSwgYikge1xuXHQgICAgICAgIHZhciBtYXRjaCA9IGEudG9Mb3dlckNhc2UoKS5tYXRjaCgvPChcXHcrKVxccy8pXG5cdCAgICAgICAgaWYgKG1hdGNoKSB7IC8v5aSE55CGYeagh+etvueahGhyZWblsZ7mgKfvvIxpbWfmoIfnrb7nmoRzcmPlsZ7mgKfvvIxmb3Jt5qCH562+55qEYWN0aW9u5bGe5oCnXG5cdCAgICAgICAgICAgIHZhciByZWcgPSByc2FuaXRpemVbbWF0Y2hbMV1dXG5cdCAgICAgICAgICAgIGlmIChyZWcpIHtcblx0ICAgICAgICAgICAgICAgIGEgPSBhLnJlcGxhY2UocmVnLCBmdW5jdGlvbiAocywgbmFtZSwgdmFsdWUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcXVvdGUgPSB2YWx1ZS5jaGFyQXQoMClcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZSArIFwiPVwiICsgcXVvdGUgKyBcImphdmFzY3JpcHQ6dm9pZCgwKVwiICsgcXVvdGUvLyBqc2hpbnQgaWdub3JlOmxpbmVcblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGEucmVwbGFjZShyb24sIFwiIFwiKS5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKSAvL+enu+mZpG9uWFhY5LqL5Lu2XG5cdCAgICB9KVxuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDExICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKlxuXHQgJ3l5eXknOiA0IGRpZ2l0IHJlcHJlc2VudGF0aW9uIG9mIHllYXIgKGUuZy4gQUQgMSA9PiAwMDAxLCBBRCAyMDEwID0+IDIwMTApXG5cdCAneXknOiAyIGRpZ2l0IHJlcHJlc2VudGF0aW9uIG9mIHllYXIsIHBhZGRlZCAoMDAtOTkpLiAoZS5nLiBBRCAyMDAxID0+IDAxLCBBRCAyMDEwID0+IDEwKVxuXHQgJ3knOiAxIGRpZ2l0IHJlcHJlc2VudGF0aW9uIG9mIHllYXIsIGUuZy4gKEFEIDEgPT4gMSwgQUQgMTk5ID0+IDE5OSlcblx0ICdNTU1NJzogTW9udGggaW4geWVhciAoSmFudWFyeS1EZWNlbWJlcilcblx0ICdNTU0nOiBNb250aCBpbiB5ZWFyIChKYW4tRGVjKVxuXHQgJ01NJzogTW9udGggaW4geWVhciwgcGFkZGVkICgwMS0xMilcblx0ICdNJzogTW9udGggaW4geWVhciAoMS0xMilcblx0ICdkZCc6IERheSBpbiBtb250aCwgcGFkZGVkICgwMS0zMSlcblx0ICdkJzogRGF5IGluIG1vbnRoICgxLTMxKVxuXHQgJ0VFRUUnOiBEYXkgaW4gV2VlaywoU3VuZGF5LVNhdHVyZGF5KVxuXHQgJ0VFRSc6IERheSBpbiBXZWVrLCAoU3VuLVNhdClcblx0ICdISCc6IEhvdXIgaW4gZGF5LCBwYWRkZWQgKDAwLTIzKVxuXHQgJ0gnOiBIb3VyIGluIGRheSAoMC0yMylcblx0ICdoaCc6IEhvdXIgaW4gYW0vcG0sIHBhZGRlZCAoMDEtMTIpXG5cdCAnaCc6IEhvdXIgaW4gYW0vcG0sICgxLTEyKVxuXHQgJ21tJzogTWludXRlIGluIGhvdXIsIHBhZGRlZCAoMDAtNTkpXG5cdCAnbSc6IE1pbnV0ZSBpbiBob3VyICgwLTU5KVxuXHQgJ3NzJzogU2Vjb25kIGluIG1pbnV0ZSwgcGFkZGVkICgwMC01OSlcblx0ICdzJzogU2Vjb25kIGluIG1pbnV0ZSAoMC01OSlcblx0ICdhJzogYW0vcG0gbWFya2VyXG5cdCAnWic6IDQgZGlnaXQgKCtzaWduKSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdGltZXpvbmUgb2Zmc2V0ICgtMTIwMC0rMTIwMClcblx0IGZvcm1hdCBzdHJpbmcgY2FuIGFsc28gYmUgb25lIG9mIHRoZSBmb2xsb3dpbmcgcHJlZGVmaW5lZCBsb2NhbGl6YWJsZSBmb3JtYXRzOlxuXHQgXG5cdCAnbWVkaXVtJzogZXF1aXZhbGVudCB0byAnTU1NIGQsIHkgaDptbTpzcyBhJyBmb3IgZW5fVVMgbG9jYWxlIChlLmcuIFNlcCAzLCAyMDEwIDEyOjA1OjA4IHBtKVxuXHQgJ3Nob3J0JzogZXF1aXZhbGVudCB0byAnTS9kL3l5IGg6bW0gYScgZm9yIGVuX1VTIGxvY2FsZSAoZS5nLiA5LzMvMTAgMTI6MDUgcG0pXG5cdCAnZnVsbERhdGUnOiBlcXVpdmFsZW50IHRvICdFRUVFLCBNTU1NIGQseScgZm9yIGVuX1VTIGxvY2FsZSAoZS5nLiBGcmlkYXksIFNlcHRlbWJlciAzLCAyMDEwKVxuXHQgJ2xvbmdEYXRlJzogZXF1aXZhbGVudCB0byAnTU1NTSBkLCB5JyBmb3IgZW5fVVMgbG9jYWxlIChlLmcuIFNlcHRlbWJlciAzLCAyMDEwXG5cdCAnbWVkaXVtRGF0ZSc6IGVxdWl2YWxlbnQgdG8gJ01NTSBkLCB5JyBmb3IgZW5fVVMgbG9jYWxlIChlLmcuIFNlcCAzLCAyMDEwKVxuXHQgJ3Nob3J0RGF0ZSc6IGVxdWl2YWxlbnQgdG8gJ00vZC95eScgZm9yIGVuX1VTIGxvY2FsZSAoZS5nLiA5LzMvMTApXG5cdCAnbWVkaXVtVGltZSc6IGVxdWl2YWxlbnQgdG8gJ2g6bW06c3MgYScgZm9yIGVuX1VTIGxvY2FsZSAoZS5nLiAxMjowNTowOCBwbSlcblx0ICdzaG9ydFRpbWUnOiBlcXVpdmFsZW50IHRvICdoOm1tIGEnIGZvciBlbl9VUyBsb2NhbGUgKGUuZy4gMTI6MDUgcG0pXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHRvSW50KHN0cikge1xuXHQgICAgcmV0dXJuIHBhcnNlSW50KHN0ciwgMTApIHx8IDBcblx0fVxuXG5cdGZ1bmN0aW9uIHBhZE51bWJlcihudW0sIGRpZ2l0cywgdHJpbSkge1xuXHQgICAgdmFyIG5lZyA9ICcnXG5cdCAgICBpZiAobnVtIDwgMCkge1xuXHQgICAgICAgIG5lZyA9ICctJ1xuXHQgICAgICAgIG51bSA9IC1udW1cblx0ICAgIH1cblx0ICAgIG51bSA9ICcnICsgbnVtXG5cdCAgICB3aGlsZSAobnVtLmxlbmd0aCA8IGRpZ2l0cylcblx0ICAgICAgICBudW0gPSAnMCcgKyBudW1cblx0ICAgIGlmICh0cmltKVxuXHQgICAgICAgIG51bSA9IG51bS5zdWJzdHIobnVtLmxlbmd0aCAtIGRpZ2l0cylcblx0ICAgIHJldHVybiBuZWcgKyBudW1cblx0fVxuXG5cdGZ1bmN0aW9uIGRhdGVHZXR0ZXIobmFtZSwgc2l6ZSwgb2Zmc2V0LCB0cmltKSB7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGUpIHtcblx0ICAgICAgICB2YXIgdmFsdWUgPSBkYXRlW1wiZ2V0XCIgKyBuYW1lXSgpXG5cdCAgICAgICAgaWYgKG9mZnNldCA+IDAgfHwgdmFsdWUgPiAtb2Zmc2V0KVxuXHQgICAgICAgICAgICB2YWx1ZSArPSBvZmZzZXRcblx0ICAgICAgICBpZiAodmFsdWUgPT09IDAgJiYgb2Zmc2V0ID09PSAtMTIpIHtcblx0ICAgICAgICAgICAgdmFsdWUgPSAxMlxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcGFkTnVtYmVyKHZhbHVlLCBzaXplLCB0cmltKVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gZGF0ZVN0ckdldHRlcihuYW1lLCBzaG9ydEZvcm0pIHtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAoZGF0ZSwgZm9ybWF0cykge1xuXHQgICAgICAgIHZhciB2YWx1ZSA9IGRhdGVbXCJnZXRcIiArIG5hbWVdKClcblx0ICAgICAgICB2YXIgZ2V0ID0gKHNob3J0Rm9ybSA/IChcIlNIT1JUXCIgKyBuYW1lKSA6IG5hbWUpLnRvVXBwZXJDYXNlKClcblx0ICAgICAgICByZXR1cm4gZm9ybWF0c1tnZXRdW3ZhbHVlXVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gdGltZVpvbmVHZXR0ZXIoZGF0ZSkge1xuXHQgICAgdmFyIHpvbmUgPSAtMSAqIGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKVxuXHQgICAgdmFyIHBhZGRlZFpvbmUgPSAoem9uZSA+PSAwKSA/IFwiK1wiIDogXCJcIlxuXHQgICAgcGFkZGVkWm9uZSArPSBwYWROdW1iZXIoTWF0aFt6b25lID4gMCA/IFwiZmxvb3JcIiA6IFwiY2VpbFwiXSh6b25lIC8gNjApLCAyKSArIHBhZE51bWJlcihNYXRoLmFicyh6b25lICUgNjApLCAyKVxuXHQgICAgcmV0dXJuIHBhZGRlZFpvbmVcblx0fVxuXHQvL+WPluW+l+S4iuWNiOS4i+WNiFxuXG5cdGZ1bmN0aW9uIGFtcG1HZXR0ZXIoZGF0ZSwgZm9ybWF0cykge1xuXHQgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSA8IDEyID8gZm9ybWF0cy5BTVBNU1swXSA6IGZvcm1hdHMuQU1QTVNbMV1cblx0fVxuXHR2YXIgREFURV9GT1JNQVRTID0ge1xuXHQgICAgeXl5eTogZGF0ZUdldHRlcihcIkZ1bGxZZWFyXCIsIDQpLFxuXHQgICAgeXk6IGRhdGVHZXR0ZXIoXCJGdWxsWWVhclwiLCAyLCAwLCB0cnVlKSxcblx0ICAgIHk6IGRhdGVHZXR0ZXIoXCJGdWxsWWVhclwiLCAxKSxcblx0ICAgIE1NTU06IGRhdGVTdHJHZXR0ZXIoXCJNb250aFwiKSxcblx0ICAgIE1NTTogZGF0ZVN0ckdldHRlcihcIk1vbnRoXCIsIHRydWUpLFxuXHQgICAgTU06IGRhdGVHZXR0ZXIoXCJNb250aFwiLCAyLCAxKSxcblx0ICAgIE06IGRhdGVHZXR0ZXIoXCJNb250aFwiLCAxLCAxKSxcblx0ICAgIGRkOiBkYXRlR2V0dGVyKFwiRGF0ZVwiLCAyKSxcblx0ICAgIGQ6IGRhdGVHZXR0ZXIoXCJEYXRlXCIsIDEpLFxuXHQgICAgSEg6IGRhdGVHZXR0ZXIoXCJIb3Vyc1wiLCAyKSxcblx0ICAgIEg6IGRhdGVHZXR0ZXIoXCJIb3Vyc1wiLCAxKSxcblx0ICAgIGhoOiBkYXRlR2V0dGVyKFwiSG91cnNcIiwgMiwgLTEyKSxcblx0ICAgIGg6IGRhdGVHZXR0ZXIoXCJIb3Vyc1wiLCAxLCAtMTIpLFxuXHQgICAgbW06IGRhdGVHZXR0ZXIoXCJNaW51dGVzXCIsIDIpLFxuXHQgICAgbTogZGF0ZUdldHRlcihcIk1pbnV0ZXNcIiwgMSksXG5cdCAgICBzczogZGF0ZUdldHRlcihcIlNlY29uZHNcIiwgMiksXG5cdCAgICBzOiBkYXRlR2V0dGVyKFwiU2Vjb25kc1wiLCAxKSxcblx0ICAgIHNzczogZGF0ZUdldHRlcihcIk1pbGxpc2Vjb25kc1wiLCAzKSxcblx0ICAgIEVFRUU6IGRhdGVTdHJHZXR0ZXIoXCJEYXlcIiksXG5cdCAgICBFRUU6IGRhdGVTdHJHZXR0ZXIoXCJEYXlcIiwgdHJ1ZSksXG5cdCAgICBhOiBhbXBtR2V0dGVyLFxuXHQgICAgWjogdGltZVpvbmVHZXR0ZXJcblx0fVxuXHR2YXIgcmRhdGVGb3JtYXQgPSAvKCg/OlteeU1kSGhtc2FaRSddKyl8KD86Jyg/OlteJ118JycpKicpfCg/OkUrfHkrfE0rfGQrfEgrfGgrfG0rfHMrfGF8WikpKC4qKS9cblx0dmFyIHJhc3BuZXRqc29uID0gL15cXC9EYXRlXFwoKFxcZCspXFwpXFwvJC9cblx0ZnVuY3Rpb24gZGF0ZUZpbHRlcihkYXRlLCBmb3JtYXQpIHtcblx0ICAgIHZhciBsb2NhdGUgPSBkYXRlRmlsdGVyLmxvY2F0ZSxcblx0ICAgICAgICAgICAgdGV4dCA9IFwiXCIsXG5cdCAgICAgICAgICAgIHBhcnRzID0gW10sXG5cdCAgICAgICAgICAgIGZuLCBtYXRjaFxuXHQgICAgZm9ybWF0ID0gZm9ybWF0IHx8IFwibWVkaXVtRGF0ZVwiXG5cdCAgICBmb3JtYXQgPSBsb2NhdGVbZm9ybWF0XSB8fCBmb3JtYXRcblx0ICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gXCJzdHJpbmdcIikge1xuXHQgICAgICAgIGlmICgvXlxcZCskLy50ZXN0KGRhdGUpKSB7XG5cdCAgICAgICAgICAgIGRhdGUgPSB0b0ludChkYXRlKVxuXHQgICAgICAgIH0gZWxzZSBpZiAocmFzcG5ldGpzb24udGVzdChkYXRlKSkge1xuXHQgICAgICAgICAgICBkYXRlID0gK1JlZ0V4cC4kMVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHZhciB0cmltRGF0ZSA9IGRhdGUudHJpbSgpXG5cdCAgICAgICAgICAgIHZhciBkYXRlQXJyYXkgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMF1cblx0ICAgICAgICAgICAgdmFyIG9EYXRlID0gbmV3IERhdGUoMClcblx0ICAgICAgICAgICAgLy/lj5blvpflubTmnIjml6Vcblx0ICAgICAgICAgICAgdHJpbURhdGUgPSB0cmltRGF0ZS5yZXBsYWNlKC9eKFxcZCspXFxEKFxcZCspXFxEKFxcZCspLywgZnVuY3Rpb24gKF8sIGEsIGIsIGMpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IGMubGVuZ3RoID09PSA0ID8gW2MsIGEsIGJdIDogW2EsIGIsIGNdXG5cdCAgICAgICAgICAgICAgICBkYXRlQXJyYXlbMF0gPSB0b0ludChhcnJheVswXSkgICAgIC8v5bm0XG5cdCAgICAgICAgICAgICAgICBkYXRlQXJyYXlbMV0gPSB0b0ludChhcnJheVsxXSkgLSAxIC8v5pyIXG5cdCAgICAgICAgICAgICAgICBkYXRlQXJyYXlbMl0gPSB0b0ludChhcnJheVsyXSkgICAgIC8v5pelXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gXCJcIlxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICB2YXIgZGF0ZVNldHRlciA9IG9EYXRlLnNldEZ1bGxZZWFyXG5cdCAgICAgICAgICAgIHZhciB0aW1lU2V0dGVyID0gb0RhdGUuc2V0SG91cnNcblx0ICAgICAgICAgICAgdHJpbURhdGUgPSB0cmltRGF0ZS5yZXBsYWNlKC9bVFxcc10oXFxkKyk6KFxcZCspOj8oXFxkKyk/XFwuPyhcXGQpPy8sIGZ1bmN0aW9uIChfLCBhLCBiLCBjLCBkKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRlQXJyYXlbM10gPSB0b0ludChhKSAvL+Wwj+aXtlxuXHQgICAgICAgICAgICAgICAgZGF0ZUFycmF5WzRdID0gdG9JbnQoYikgLy/liIbpkp9cblx0ICAgICAgICAgICAgICAgIGRhdGVBcnJheVs1XSA9IHRvSW50KGMpIC8v56eSXG5cdCAgICAgICAgICAgICAgICBpZiAoZCkgeyAgICAgICAgICAgICAgICAvL+avq+enklxuXHQgICAgICAgICAgICAgICAgICAgIGRhdGVBcnJheVs2XSA9IE1hdGgucm91bmQocGFyc2VGbG9hdChcIjAuXCIgKyBkKSAqIDEwMDApXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gXCJcIlxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICB2YXIgdHpIb3VyID0gMFxuXHQgICAgICAgICAgICB2YXIgdHpNaW4gPSAwXG5cdCAgICAgICAgICAgIHRyaW1EYXRlID0gdHJpbURhdGUucmVwbGFjZSgvWnwoWystXSkoXFxkXFxkKTo/KFxcZFxcZCkvLCBmdW5jdGlvbiAoeiwgc3ltYm9sLCBjLCBkKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRlU2V0dGVyID0gb0RhdGUuc2V0VVRDRnVsbFllYXJcblx0ICAgICAgICAgICAgICAgIHRpbWVTZXR0ZXIgPSBvRGF0ZS5zZXRVVENIb3Vyc1xuXHQgICAgICAgICAgICAgICAgaWYgKHN5bWJvbCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHR6SG91ciA9IHRvSW50KHN5bWJvbCArIGMpXG5cdCAgICAgICAgICAgICAgICAgICAgdHpNaW4gPSB0b0ludChzeW1ib2wgKyBkKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuICcnXG5cdCAgICAgICAgICAgIH0pXG5cblx0ICAgICAgICAgICAgZGF0ZUFycmF5WzNdIC09IHR6SG91clxuXHQgICAgICAgICAgICBkYXRlQXJyYXlbNF0gLT0gdHpNaW5cblx0ICAgICAgICAgICAgZGF0ZVNldHRlci5hcHBseShvRGF0ZSwgZGF0ZUFycmF5LnNsaWNlKDAsIDMpKVxuXHQgICAgICAgICAgICB0aW1lU2V0dGVyLmFwcGx5KG9EYXRlLCBkYXRlQXJyYXkuc2xpY2UoMykpXG5cdCAgICAgICAgICAgIGRhdGUgPSBvRGF0ZVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGlmICh0eXBlb2YgZGF0ZSA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSlcblx0ICAgIH1cblx0ICAgIGlmIChhdmFsb24udHlwZShkYXRlKSAhPT0gJ2RhdGUnKSB7XG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICB3aGlsZSAoZm9ybWF0KSB7XG5cdCAgICAgICAgbWF0Y2ggPSByZGF0ZUZvcm1hdC5leGVjKGZvcm1hdClcblx0ICAgICAgICBpZiAobWF0Y2gpIHtcblx0ICAgICAgICAgICAgcGFydHMgPSBwYXJ0cy5jb25jYXQobWF0Y2guc2xpY2UoMSkpXG5cdCAgICAgICAgICAgIGZvcm1hdCA9IHBhcnRzLnBvcCgpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcGFydHMucHVzaChmb3JtYXQpXG5cdCAgICAgICAgICAgIGZvcm1hdCA9IG51bGxcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBwYXJ0cy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgICAgIGZuID0gREFURV9GT1JNQVRTW3ZhbHVlXVxuXHQgICAgICAgIHRleHQgKz0gZm4gPyBmbihkYXRlLCBsb2NhdGUpIDogdmFsdWUucmVwbGFjZSgvKF4nfCckKS9nLCBcIlwiKS5yZXBsYWNlKC8nJy9nLCBcIidcIilcblx0ICAgIH0pXG5cdCAgICByZXR1cm4gdGV4dFxuXHR9XG5cblxuXHR2YXIgbG9jYXRlID0ge1xuXHQgICAgQU1QTVM6IHtcblx0ICAgICAgICAwOiAn5LiK5Y2IJyxcblx0ICAgICAgICAxOiAn5LiL5Y2IJ1xuXHQgICAgfSxcblx0ICAgIERBWToge1xuXHQgICAgICAgIDA6ICfmmJ/mnJ/ml6UnLFxuXHQgICAgICAgIDE6ICfmmJ/mnJ/kuIAnLFxuXHQgICAgICAgIDI6ICfmmJ/mnJ/kuownLFxuXHQgICAgICAgIDM6ICfmmJ/mnJ/kuIknLFxuXHQgICAgICAgIDQ6ICfmmJ/mnJ/lm5snLFxuXHQgICAgICAgIDU6ICfmmJ/mnJ/kupQnLFxuXHQgICAgICAgIDY6ICfmmJ/mnJ/lha0nXG5cdCAgICB9LFxuXHQgICAgTU9OVEg6IHtcblx0ICAgICAgICAwOiAnMeaciCcsXG5cdCAgICAgICAgMTogJzLmnIgnLFxuXHQgICAgICAgIDI6ICcz5pyIJyxcblx0ICAgICAgICAzOiAnNOaciCcsXG5cdCAgICAgICAgNDogJzXmnIgnLFxuXHQgICAgICAgIDU6ICc25pyIJyxcblx0ICAgICAgICA2OiAnN+aciCcsXG5cdCAgICAgICAgNzogJzjmnIgnLFxuXHQgICAgICAgIDg6ICc55pyIJyxcblx0ICAgICAgICA5OiAnMTDmnIgnLFxuXHQgICAgICAgIDEwOiAnMTHmnIgnLFxuXHQgICAgICAgIDExOiAnMTLmnIgnXG5cdCAgICB9LFxuXHQgICAgU0hPUlREQVk6IHtcblx0ICAgICAgICAnMCc6ICflkajml6UnLFxuXHQgICAgICAgICcxJzogJ+WRqOS4gCcsXG5cdCAgICAgICAgJzInOiAn5ZGo5LqMJyxcblx0ICAgICAgICAnMyc6ICflkajkuIknLFxuXHQgICAgICAgICc0JzogJ+WRqOWbmycsXG5cdCAgICAgICAgJzUnOiAn5ZGo5LqUJyxcblx0ICAgICAgICAnNic6ICflkajlha0nXG5cdCAgICB9LFxuXHQgICAgZnVsbERhdGU6ICd55bm0TeaciGTml6VFRUVFJyxcblx0ICAgIGxvbmdEYXRlOiAneeW5tE3mnIhk5pelJyxcblx0ICAgIG1lZGl1bTogJ3l5eXktTS1kIEg6bW06c3MnLFxuXHQgICAgbWVkaXVtRGF0ZTogJ3l5eXktTS1kJyxcblx0ICAgIG1lZGl1bVRpbWU6ICdIOm1tOnNzJyxcblx0ICAgICdzaG9ydCc6ICd5eS1NLWQgYWg6bW0nLFxuXHQgICAgc2hvcnREYXRlOiAneXktTS1kJyxcblx0ICAgIHNob3J0VGltZTogJ2FoOm1tJ1xuXHR9XG5cdGxvY2F0ZS5TSE9SVE1PTlRIID0gbG9jYXRlLk1PTlRIXG5cdGRhdGVGaWx0ZXIubG9jYXRlID0gbG9jYXRlXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBkYXRlRmlsdGVyXG5cbi8qKiovIH0sXG4vKiAxMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XG5cdGZ1bmN0aW9uIG9yZGVyQnkoYXJyYXksIGNyaXRlcmlhLCByZXZlcnNlKSB7XG5cdCAgICB2YXIgdHlwZSA9IGF2YWxvbi50eXBlKGFycmF5KVxuXHQgICAgaWYgKHR5cGUgIT09ICdhcnJheScgJiYgdHlwZSAhPT0gJ29iamVjdCcpXG5cdCAgICAgICAgdGhyb3cgJ29yZGVyQnnlj6rog73lpITnkIblr7nosaHmiJbmlbDnu4QnXG5cdCAgICB2YXIgb3JkZXIgPSAocmV2ZXJzZSAmJiByZXZlcnNlIDwgMCkgPyAtMSA6IDFcblxuXHQgICAgaWYgKHR5cGVvZiBjcml0ZXJpYSA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICB2YXIga2V5ID0gY3JpdGVyaWFcblx0ICAgICAgICBjcml0ZXJpYSA9IGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBhICYmIGFba2V5XVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGFycmF5ID0gY29udmVydEFycmF5KGFycmF5KVxuXHQgICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcblx0ICAgICAgICBlbC5vcmRlciA9IGNyaXRlcmlhKGVsLnZhbHVlLCBlbC5rZXkpXG5cdCAgICB9KVxuXHQgICAgYXJyYXkuc29ydChmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcblx0ICAgICAgICB2YXIgYSA9IGxlZnQub3JkZXJcblx0ICAgICAgICB2YXIgYiA9IHJpZ2h0Lm9yZGVyXG5cdCAgICAgICAgaWYgKE51bWJlci5pc05hTihhKSAmJiBOdW1iZXIuaXNOYU4oYikpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIDBcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGEgPT09IGIgPyAwIDogYSA+IGIgPyBvcmRlciA6IC1vcmRlclxuXHQgICAgfSlcblx0ICAgIHZhciBpc0FycmF5ID0gdHlwZSA9PT0gJ2FycmF5J1xuXHQgICAgdmFyIHRhcmdldCA9IGlzQXJyYXkgPyBbXSA6IHt9XG5cdCAgICByZXR1cm4gcmVjb3ZlcnkodGFyZ2V0LCBhcnJheSwgZnVuY3Rpb24gKGVsKSB7XG5cdCAgICAgICAgaWYgKGlzQXJyYXkpIHtcblx0ICAgICAgICAgICAgdGFyZ2V0LnB1c2goZWwudmFsdWUpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdGFyZ2V0W2VsLmtleV0gPSBlbC52YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdH1cblxuXHRmdW5jdGlvbiBmaWx0ZXJCeShhcnJheSwgc2VhcmNoKSB7XG5cdCAgICB2YXIgdHlwZSA9IGF2YWxvbi50eXBlKGFycmF5KVxuXHQgICAgaWYgKHR5cGUgIT09ICdhcnJheScgJiYgdHlwZSAhPT0gJ29iamVjdCcpXG5cdCAgICAgICAgdGhyb3cgJ2ZpbHRlckJ55Y+q6IO95aSE55CG5a+56LGh5oiW5pWw57uEJ1xuXHQgICAgdmFyIGFyZ3MgPSBhdmFsb24uc2xpY2UoYXJndW1lbnRzLCAyKVxuXHQgICAgdmFyIHN0eXBlID0gYXZhbG9uLnR5cGUoc2VhcmNoKVxuXHQgICAgaWYgKHN0eXBlID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdmFyIGNyaXRlcmlhID0gc2VhcmNoXG5cdCAgICB9IGVsc2UgaWYgKHN0eXBlID09PSAnc3RyaW5nJyB8fCBzdHlwZSA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgICBpZiAoc2VhcmNoID09PSAnJykge1xuXHQgICAgICAgICAgICByZXR1cm4gYXJyYXlcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChhdmFsb24uZXNjYXBlUmVnRXhwKHNlYXJjaCksICdpJylcblx0ICAgICAgICAgICAgY3JpdGVyaWEgPSBmdW5jdGlvbiAoZWwpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiByZWcudGVzdChlbClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcmV0dXJuIGFycmF5XG5cdCAgICB9XG5cblx0ICAgIGFycmF5ID0gY29udmVydEFycmF5KGFycmF5KS5maWx0ZXIoZnVuY3Rpb24gKGVsLCBpKSB7XG5cdCAgICAgICAgcmV0dXJuICEhY3JpdGVyaWEuYXBwbHkoZWwsIFtlbC52YWx1ZSwgaV0uY29uY2F0KGFyZ3MpKVxuXHQgICAgfSlcblx0ICAgIHZhciBpc0FycmF5ID0gdHlwZSA9PT0gJ2FycmF5J1xuXHQgICAgdmFyIHRhcmdldCA9IGlzQXJyYXkgPyBbXSA6IHt9XG5cdCAgICByZXR1cm4gcmVjb3ZlcnkodGFyZ2V0LCBhcnJheSwgZnVuY3Rpb24gKGVsKSB7XG5cdCAgICAgICAgaWYgKGlzQXJyYXkpIHtcblx0ICAgICAgICAgICAgdGFyZ2V0LnB1c2goZWwudmFsdWUpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdGFyZ2V0W2VsLmtleV0gPSBlbC52YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdH1cblxuXHRmdW5jdGlvbiBzZWxlY3RCeShkYXRhLCBhcnJheSwgZGVmYXVsdHMpIHtcblx0ICAgIGlmIChhdmFsb24uaXNPYmplY3QoZGF0YSkgJiYgIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0ICAgICAgICB2YXIgdGFyZ2V0ID0gW11cblx0ICAgICAgICByZXR1cm4gcmVjb3ZlcnkodGFyZ2V0LCBhcnJheSwgZnVuY3Rpb24gKG5hbWUpIHtcblx0ICAgICAgICAgICAgdGFyZ2V0LnB1c2goZGF0YS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IGRhdGFbbmFtZV0gOiBkZWZhdWx0cyA/IGRlZmF1bHRzW25hbWVdIDogJycpXG5cdCAgICAgICAgfSlcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcmV0dXJuIGRhdGFcblx0ICAgIH1cblx0fVxuXG5cdE51bWJlci5pc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiAoYSkge1xuXHQgICAgcmV0dXJuIGEgIT09IGFcblx0fVxuXG5cdGZ1bmN0aW9uIGxpbWl0QnkoaW5wdXQsIGxpbWl0LCBiZWdpbikge1xuXHQgICAgdmFyIHR5cGUgPSBhdmFsb24udHlwZShpbnB1dClcblx0ICAgIGlmICh0eXBlICE9PSAnYXJyYXknICYmIHR5cGUgIT09ICdvYmplY3QnKVxuXHQgICAgICAgIHRocm93ICdsaW1pdEJ55Y+q6IO95aSE55CG5a+56LGh5oiW5pWw57uEJ1xuXHQgICAgLy/lv4XpobvmmK/mlbDlgLxcblx0ICAgIGlmICh0eXBlb2YgbGltaXQgIT09ICdudW1iZXInKSB7XG5cdCAgICAgICAgcmV0dXJuIGlucHV0XG5cdCAgICB9XG5cdCAgICAvL+S4jeiDveS4uk5hTlxuXHQgICAgaWYgKE51bWJlci5pc05hTihsaW1pdCkpIHtcblx0ICAgICAgICByZXR1cm4gaW5wdXRcblx0ICAgIH1cblx0ICAgIC8v5bCG55uu5qCH6L2s5o2i5Li65pWw57uEXG5cdCAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcblx0ICAgICAgICBpbnB1dCA9IGNvbnZlcnRBcnJheShpbnB1dClcblx0ICAgIH1cblx0ICAgIHZhciBuID0gaW5wdXQubGVuZ3RoXG5cdCAgICBsaW1pdCA9IE1hdGgubWluKG4sIGxpbWl0KVxuXHQgICAgYmVnaW4gPSB0eXBlb2YgYmVnaW4gPT09ICdudW1iZXInID8gYmVnaW4gOiAwXG5cdCAgICBpZiAoYmVnaW4gPCAwKSB7XG5cdCAgICAgICAgYmVnaW4gPSBNYXRoLm1heCgwLCBuICsgYmVnaW4pXG5cdCAgICB9XG5cblx0ICAgIHZhciBkYXRhID0gW11cblx0ICAgIGZvciAodmFyIGkgPSBiZWdpbjsgaSA8IG47IGkrKykge1xuXHQgICAgICAgIGRhdGEucHVzaChpbnB1dFtpXSlcblx0ICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IGxpbWl0KSB7XG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgdmFyIGlzQXJyYXkgPSB0eXBlID09PSAnYXJyYXknXG5cdCAgICBpZiAoaXNBcnJheSkge1xuXHQgICAgICAgIHJldHVybiBkYXRhXG5cdCAgICB9XG5cdCAgICB2YXIgdGFyZ2V0ID0ge31cblx0ICAgIHJldHVybiByZWNvdmVyeSh0YXJnZXQsIGRhdGEsIGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgIHRhcmdldFtlbC5rZXldID0gZWwudmFsdWVcblx0ICAgIH0pXG5cdH1cblxuXHRmdW5jdGlvbiByZWNvdmVyeShyZXQsIGFycmF5LCBjYWxsYmFjaykge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcnJheS5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0ICAgICAgICBjYWxsYmFjayhhcnJheVtpXSlcblx0ICAgIH1cblx0ICAgIHJldHVybiByZXRcblx0fVxuXG5cblx0ZnVuY3Rpb24gY29udmVydEFycmF5KGFycmF5KSB7XG5cdCAgICB2YXIgcmV0ID0gW10sIGkgPSAwXG5cdCAgICBhdmFsb24uZWFjaChhcnJheSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0ICAgICAgICByZXRbaSsrXSA9IHtcblx0ICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuXHQgICAgICAgICAgICBrZXk6IGtleVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdCAgICByZXR1cm4gcmV0XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIGxpbWl0Qnk6IGxpbWl0QnksXG5cdCAgICBvcmRlckJ5OiBvcmRlckJ5LFxuXHQgICAgc2VsZWN0Qnk6IHNlbGVjdEJ5LFxuXHQgICAgZmlsdGVyQnk6IGZpbHRlckJ5XG5cdH1cblxuLyoqKi8gfSxcbi8qIDEzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcblx0dmFyIGV2ZW50RmlsdGVycyA9IHtcblx0ICAgIHN0b3A6IGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXHQgICAgICAgIHJldHVybiBlXG5cdCAgICB9LFxuXHQgICAgcHJldmVudDogZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblx0ICAgICAgICByZXR1cm4gZVxuXHQgICAgfVxuXHR9XG5cdHZhciBrZXlDb2RlID0ge1xuXHQgICAgZXNjOiAyNyxcblx0ICAgIHRhYjogOSxcblx0ICAgIGVudGVyOiAxMyxcblx0ICAgIHNwYWNlOiAzMixcblx0ICAgIGRlbDogNDYsXG5cdCAgICB1cDogMzgsXG5cdCAgICBsZWZ0OiAzNyxcblx0ICAgIHJpZ2h0OiAzOSxcblx0ICAgIGRvd246IDQwXG5cdH1cblxuXHRhdmFsb24uZWFjaChrZXlDb2RlLCBmdW5jdGlvbiAobmFtZSwga2V5Q29kZSkge1xuXHQgICAgZXZlbnRGaWx0ZXJzW25hbWVdID0gZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgICBpZiAoZS53aGljaCAhPT0ga2V5Q29kZSkge1xuXHQgICAgICAgICAgICBlLiRyZXR1cm4gPSB0cnVlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBlXG5cdCAgICB9XG5cdH0pXG5cblx0bW9kdWxlLmV4cG9ydHMgPSBldmVudEZpbHRlcnNcblxuLyoqKi8gfSxcbi8qIDE0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICog6Jma5oufRE9N55qEM+Wkp+aehOmAoOWZqFxuXHQgKi9cblx0dmFyIFZUZXh0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSlcblx0dmFyIFZDb21tZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNylcblx0dmFyIFZFbGVtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOClcblxuXHRhdmFsb24udmRvbUFkYXB0b3IgPSBmdW5jdGlvbiAob2JqLCBtZXRob2QpIHtcblx0ICAgIGlmICghb2JqKSB7Ly9vYmrlnKhtcy1mb3Llvqrnjq/ph4zpnaLlj6/og73mmK9udWxsXG5cdCAgICAgICAgcmV0dXJuIChtZXRob2QgPT09IFwidG9IVE1MXCIgPyAnJyA6XG5cdCAgICAgICAgICAgIGF2YWxvbi5hdmFsb25GcmFnbWVudC5jbG9uZU5vZGUoZmFsc2UpKVxuXHQgICAgfVxuXHQgICAgc3dpdGNoIChvYmoubm9kZVR5cGUpIHtcblx0ICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgICAgIHJldHVybiBWVGV4dC5wcm90b3R5cGVbbWV0aG9kXS5jYWxsKG9iailcblx0ICAgICAgICBjYXNlIDg6XG5cdCAgICAgICAgICAgIHJldHVybiBWQ29tbWVudC5wcm90b3R5cGVbbWV0aG9kXS5jYWxsKG9iailcblx0ICAgICAgICBjYXNlIDE6XG5cdCAgICAgICAgICAgIHJldHVybiBWRWxlbWVudC5wcm90b3R5cGVbbWV0aG9kXS5jYWxsKG9iailcblx0ICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSBcInRvSFRNTFwiKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iai5tYXAoZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF2YWxvbi52ZG9tQWRhcHRvcihhLCAndG9IVE1MJylcblx0ICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcnKVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZiA9IGF2YWxvbi5hdmFsb25GcmFnbWVudC5jbG9uZU5vZGUoZmFsc2UpXG5cdCAgICAgICAgICAgICAgICAgICAgb2JqLmZvckVhY2goZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZi5hcHBlbmRDaGlsZChhdmFsb24udmRvbUFkYXB0b3IoYSwgJ3RvRE9NJykpXG5cdCAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gZlxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICAgIFZUZXh0OiBWVGV4dCxcblx0ICAgIFZDb21tZW50OiBWQ29tbWVudCxcblx0ICAgIFZFbGVtZW50OiBWRWxlbWVudFxuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDE1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgcmV4cHIgPSBhdmFsb24uY29uZmlnLnJleHByXG5cdHZhciBkZWNvZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KVxuXHRmdW5jdGlvbiBWVGV4dCh0ZXh0KSB7XG5cdCAgICBpZiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gJyN0ZXh0J1xuXHQgICAgICAgIHRoaXMubm9kZVZhbHVlID0gdGV4dFxuXHQgICAgICAgIHRoaXMuc2tpcENvbnRlbnQgPSAhcmV4cHIudGVzdCh0ZXh0KVxuXHQgICAgICAgIHRoaXMubm9kZVR5cGUgPSAzXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGZvciAodmFyIGkgaW4gdGV4dCkge1xuXHQgICAgICAgICAgICB0aGlzW2ldID0gdGV4dFtpXVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdFZUZXh0LnByb3RvdHlwZSA9IHtcblx0ICAgIGNvbnN0cnVjdG9yOiBWVGV4dCxcblx0ICAgIHRvRE9NOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICB2YXIgdiA9IGRlY29kZSh0aGlzLm5vZGVWYWx1ZSlcblx0ICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2KVxuXHQgICAgfSxcblx0ICAgIHRvSFRNTDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiB0aGlzLm5vZGVWYWx1ZVxuXHQgICAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBWVGV4dFxuXG4vKioqLyB9LFxuLyogMTYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qIFxuXHQgKiDlr7lodG1s5a6e5L2T6L+b6KGM6L2s5LmJXG5cdCAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zdWJzdGFjay9ub2RlLWVudFxuXHQgKiBodHRwOi8vd3d3LmNuYmxvZ3MuY29tL3hkcC1nYWNsL3AvMzcyMjY0Mi5odG1sXG5cdCAqIGh0dHA6Ly93d3cuc3RlZmFua3JhdXNlLm5ldC9qcy1mcmFtZXdvcmtzLWJlbmNobWFyazIvd2ViZHJpdmVyLWphdmEvdGFibGUuaHRtbFxuXHQgKi9cblxuXHR2YXIgcmVudGl0aWVzID0gLyZbYS16MC05I117MiwxMH07L1xuXHR2YXIgdGVtcCA9IGF2YWxvbi5hdmFsb25EaXZcblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdCAgICBpZiAocmVudGl0aWVzLnRlc3Qoc3RyKSkge1xuXHQgICAgICAgIHRlbXAuaW5uZXJIVE1MID0gc3RyXG5cdCAgICAgICAgcmV0dXJuIHRlbXAuaW5uZXJUZXh0IHx8IHRlbXAudGV4dENvbnRlbnRcblx0ICAgIH1cblx0ICAgIHJldHVybiBzdHJcblx0fVxuXG4vKioqLyB9LFxuLyogMTcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFxuXHRmdW5jdGlvbiBWQ29tbWVudCh0ZXh0KSB7XG5cdCAgICBpZiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgdGhpcy50eXBlID0gJyNjb21tZW50J1xuXHQgICAgICAgIHRoaXMubm9kZVZhbHVlID0gdGV4dFxuXHQgICAgICAgIHRoaXMuc2tpcENvbnRlbnQgPSB0cnVlXG5cdCAgICAgICAgdGhpcy5ub2RlVHlwZSA9IDhcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiB0ZXh0KSB7XG5cdCAgICAgICAgICAgIHRoaXNbaV0gPSB0ZXh0W2ldXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cdFZDb21tZW50LnByb3RvdHlwZSA9IHtcblx0ICAgIGNvbnN0cnVjdG9yOiBWQ29tbWVudCxcblx0ICAgIHRvRE9NOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodGhpcy5ub2RlVmFsdWUpXG5cdCAgICB9LFxuXHQgICAgdG9IVE1MOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgcmV0dXJuICc8IS0tJyArIHRoaXMubm9kZVZhbHVlICsgJy0tPicrKHRoaXMudGVtcGxhdGV8fFwiXCIpXG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IFZDb21tZW50XG5cbi8qKiovIH0sXG4vKiAxOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XG5cdGZ1bmN0aW9uIFZFbGVtZW50KHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuXHQgICAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuXHQgICAgICAgIGZvciAodmFyIGkgaW4gdHlwZSkge1xuXHQgICAgICAgICAgICB0aGlzW2ldID0gdHlwZVtpXVxuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5ub2RlVHlwZSA9IDFcblx0ICAgICAgICB0aGlzLnR5cGUgPSB0eXBlXG5cdCAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzXG5cdCAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuXG5cdCAgICB9XG5cdH1cblx0ZnVuY3Rpb24gc2tpcEZhbHNlQW5kRnVuY3Rpb24oYSkge1xuXHQgICAgcmV0dXJuIGEgIT09IGZhbHNlICYmIChPYmplY3QoYSkgIT09IGEpXG5cdH1cblx0dmFyIHNwZWNhbCA9IHtcblx0ICAgIFwiY2xhc3NcIjogZnVuY3Rpb24gKGRvbSwgdmFsKSB7XG5cdCAgICAgICAgZG9tLmNsYXNzTmFtZSA9IHZhbFxuXHQgICAgfSxcblx0ICAgIHN0eWxlOiBmdW5jdGlvbiAoZG9tLCB2YWwpIHtcblx0ICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCA9IHZhbFxuXHQgICAgfSxcblx0ICAgICdmb3InOiBmdW5jdGlvbiAoZG9tLCB2YWwpIHtcblx0ICAgICAgICBkb20uaHRtbEZvciA9IHZhbFxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlVk1MKHR5cGUpIHtcblx0ICAgIGlmIChkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGggPCAzMSkge1xuXHQgICAgICAgIGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQoKS5hZGRSdWxlKFwiLnJ2bWxcIiwgXCJiZWhhdmlvcjp1cmwoI2RlZmF1bHQjVk1MKVwiKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgLy8gbm8gbW9yZSByb29tLCBhZGQgdG8gdGhlIGV4aXN0aW5nIG9uZVxuXHQgICAgICAgIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMTE5NCUyOFZTLjg1JTI5LmFzcHhcblx0ICAgICAgICBkb2N1bWVudC5zdHlsZVNoZWV0c1swXS5hZGRSdWxlKFwiLnJ2bWxcIiwgXCJiZWhhdmlvcjp1cmwoI2RlZmF1bHQjVk1MKVwiKTtcblx0ICAgIH1cblx0ICAgIHZhciBhcnIgPSB0eXBlLnNwbGl0KCc6Jylcblx0ICAgIGlmIChhcnIubGVuZ3RoID09PSAxKSB7XG5cdCAgICAgICAgYXJyLnVuc2hpZnQoJ3YnKVxuXHQgICAgfVxuXHQgICAgdmFyIHRhZyA9IGFyclsxXVxuXHQgICAgdmFyIG5zID0gYXJyWzBdXG5cdCAgICBpZiAoIWRvY3VtZW50Lm5hbWVzcGFjZXNbbnNdKSB7XG5cdCAgICAgICAgZG9jdW1lbnQubmFtZXNwYWNlcy5hZGQobnMsIFwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTp2bWxcIilcblx0ICAgIH1cblx0ICAgIHJldHVybiAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnPCcgKyBucyArICc6JyArIHRhZyArICcgY2xhc3M9XCJydm1sXCI+Jyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVTVkcodHlwZSkge1xuXHQgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0eXBlKVxuXHR9XG5cdHZhciBzdmdUYWdzID0gYXZhbG9uLm9uZU9iamVjdCgnY2lyY2xlLGRlZnMsZWxsaXBzZSxpbWFnZSxsaW5lLCcgK1xuXHQgICAgICAgICdwYXRoLHBvbHlnb24scG9seWxpbmUscmVjdCxzeW1ib2wsdGV4dCx1c2UsZyxzdmcnKVxuXHR2YXIgVk1MVGFncyA9IGF2YWxvbi5vbmVPYmplY3QoJ3NoYXBlLGxpbmUscG9seWxpbmUscmVjdCxyb3VuZHJlY3Qsb3ZhbCxhcmMsJyArXG5cdCAgICAgICAgJ2N1cnZlLGJhY2tncm91bmQsaW1hZ2Usc2hhcGV0eXBlLGdyb3VwLGZpbGwsJyArXG5cdCAgICAgICAgJ3N0cm9rZSxzaGFkb3csIGV4dHJ1c2lvbiwgdGV4dGJveCwgaW1hZ2VkYXRhLCB0ZXh0cGF0aCcpXG5cblx0dmFyIHJ2bWwgPSAvXlxcdytcXDpcXHcrL1xuXG5cdFZFbGVtZW50LnByb3RvdHlwZSA9IHtcblx0ICAgIGNvbnN0cnVjdG9yOiBWRWxlbWVudCxcblx0ICAgIHRvRE9NOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGRvbSwgdGFnTmFtZSA9IHRoaXMudHlwZVxuXHQgICAgICAgIGlmIChhdmFsb24ubW9kZXJuICYmIHN2Z1RhZ3NbdGFnTmFtZV0pIHtcblx0ICAgICAgICAgICAgZG9tID0gY3JlYXRlU1ZHKHRhZ05hbWUpXG5cdCAgICAgICAgfSBlbHNlIGlmICghYXZhbG9uLm1vZGVybiAmJiAoVk1MVGFnc1t0YWdOYW1lXSB8fCBydm1sLnRlc3QodGFnTmFtZSkpKSB7XG5cdCAgICAgICAgICAgIGRvbSA9IGNyZWF0ZVZNTCh0YWdOYW1lKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHdpZCA9IHRoaXMucHJvcHNbJ21zLWltcG9ydGFudCddIHx8XG5cdCAgICAgICAgICAgICAgICB0aGlzLnByb3BzWydtcy1jb250cm9sbGVyJ10gfHwgdGhpcy53aWRcblx0ICAgICAgICBpZiAod2lkKSB7XG5cdCAgICAgICAgICAgIHZhciBzY29wZSA9IGF2YWxvbi5zY29wZXNbd2lkXVxuXHQgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHNjb3BlICYmIHNjb3BlLnZtb2RlbCAmJiBzY29wZS52bW9kZWwuJGVsZW1lbnRcblx0ICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBvbGRWZG9tID0gZWxlbWVudC52dHJlZVswXVxuXHQgICAgICAgICAgICAgICAgaWYgKG9sZFZkb20uY2hpbGRyZW4pIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gb2xkVmRvbS5jaGlsZHJlblxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMucHJvcHMpIHtcblx0ICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXMucHJvcHNbaV1cblx0ICAgICAgICAgICAgaWYgKHNraXBGYWxzZUFuZEZ1bmN0aW9uKHZhbCkpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChzcGVjYWxbaV0gJiYgYXZhbG9uLm1zaWUgPCA4KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3BlY2FsW2ldKGRvbSwgdmFsKVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKGksIHZhbCArICcnKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBjID0gdGhpcy5jaGlsZHJlbiB8fCBbXVxuXHQgICAgICAgIHZhciB0ZW1wbGF0ZSA9IGNbMF0gPyBjWzBdLm5vZGVWYWx1ZSA6ICcnXG5cdCAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcblx0ICAgICAgICAgICAgY2FzZSAnc2NyaXB0Jzpcblx0ICAgICAgICAgICAgICAgIGRvbS50ZXh0ID0gdGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgJ3N0eWxlJzpcblx0ICAgICAgICAgICAgICAgIGlmICgnc3R5bGVTaGVldCcgaW4gZG9tKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpXG5cdCAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHRlbXBsYXRlXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGRvbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAneG1wJzovL0lFNi04LFhNUOWFg+e0oOmHjOmdouWPquiDveacieaWh+acrOiKgueCuSzkuI3og73kvb/nlKhpbm5lckhUTUxcblx0ICAgICAgICAgICAgY2FzZSAnbm9zY3JpcHQnOlxuXHQgICAgICAgICAgICAgICAgZG9tLmlubmVyVGV4dCA9IGRvbS50ZXh0Q29udGVudCA9IHRlbXBsYXRlXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBjYXNlICd0ZW1wbGF0ZSc6XG5cdCAgICAgICAgICAgICAgICBkb20uaW5uZXJIVE1MID0gdGVtcGxhdGVcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWb2lkVGFnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGMgJiYgZG9tLmFwcGVuZENoaWxkKGF2YWxvbi52ZG9tQWRhcHRvcihjLCAndG9ET00nKSlcblx0ICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGRvbVxuXHQgICAgfSxcblx0ICAgIHRvSFRNTDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBhcnIgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5wcm9wcykge1xuXHQgICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5wcm9wc1tpXVxuXHQgICAgICAgICAgICBpZiAoc2tpcEZhbHNlQW5kRnVuY3Rpb24odmFsKSkge1xuXHQgICAgICAgICAgICAgICAgYXJyLnB1c2goaSArICc9JyArIGF2YWxvbi5xdW90ZSh0aGlzLnByb3BzW2ldICsgJycpKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGFyciA9IGFyci5sZW5ndGggPyAnICcgKyBhcnIuam9pbignICcpIDogJydcblx0ICAgICAgICB2YXIgc3RyID0gJzwnICsgdGhpcy50eXBlICsgYXJyXG5cdCAgICAgICAgaWYgKHRoaXMuaXNWb2lkVGFnKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBzdHIgKyAnLz4nXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHN0ciArPSAnPidcblx0ICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgc3RyICs9IHRoaXMuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChjKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYyA/IGF2YWxvbi52ZG9tQWRhcHRvcihjLCAndG9IVE1MJykgOiAnJ1xuXHQgICAgICAgICAgICB9KS5qb2luKCcnKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gc3RyICsgJzwvJyArIHRoaXMudHlwZSArICc+J1xuXHQgICAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBWRWxlbWVudFxuXG4vKioqLyB9LFxuLyogMTkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8qKlxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgIERPTSBBcGlcblx0ICogc2hpbSxjbGFzcyxkYXRhLGNzcyx2YWwsaHRtbCxldmVudCxyZWFkeSAgXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblx0X193ZWJwYWNrX3JlcXVpcmVfXygyMClcblx0X193ZWJwYWNrX3JlcXVpcmVfXygyMSlcblx0X193ZWJwYWNrX3JlcXVpcmVfXygyMilcblx0X193ZWJwYWNrX3JlcXVpcmVfXygyNSlcblx0X193ZWJwYWNrX3JlcXVpcmVfXygyNilcblx0X193ZWJwYWNrX3JlcXVpcmVfXygyNylcblx0X193ZWJwYWNrX3JlcXVpcmVfXygzMClcblx0X193ZWJwYWNrX3JlcXVpcmVfXygzMilcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF2YWxvblxuXG4vKioqLyB9LFxuLyogMjAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdGZ1bmN0aW9uIGZpeENvbnRhaW5zKHJvb3QsIGVsKSB7XG5cdCAgICB0cnkgeyAvL0lFNi04LOa4uOemu+S6jkRPTeagkeWklueahOaWh+acrOiKgueCue+8jOiuv+mXrnBhcmVudE5vZGXmnInml7bkvJrmipvplJlcblx0ICAgICAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50Tm9kZSkpXG5cdCAgICAgICAgICAgIGlmIChlbCA9PT0gcm9vdClcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9XG5cdH1cblxuXHRhdmFsb24uY29udGFpbnMgPSBmaXhDb250YWluc1xuXHQvL0lFNi0xMeeahOaWh+aho+WvueixoeayoeaciWNvbnRhaW5zXG5cdGlmICghYXZhbG9uLmRvY3VtZW50LmNvbnRhaW5zKSB7XG5cdCAgICBhdmFsb24uZG9jdW1lbnQuY29udGFpbnMgPSBmdW5jdGlvbiAoYikge1xuXHQgICAgICAgIHJldHVybiBmaXhDb250YWlucyhkb2N1bWVudCwgYilcblx0ICAgIH1cblx0fVxuXG5cdGlmICh3aW5kb3cuTm9kZSAmJiAhZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ3gnKS5jb250YWlucykge1xuXHQgICAgTm9kZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoYXJnKSB7Ly9JRTYtOOayoeaciU5vZGXlr7nosaFcblx0ICAgICAgICByZXR1cm4gISEodGhpcy5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihhcmcpICYgMTYpXG5cdCAgICB9XG5cdH1cblxuXHQvL2ZpcmVmb3gg5YiwMTHml7bmiY3mnIlvdXRlckhUTUxcblx0aWYgKHdpbmRvdy5IVE1MRWxlbWVudCAmJiAhYXZhbG9uLnJvb3Qub3V0ZXJIVE1MKSB7XG5cdCAgICBIVE1MRWxlbWVudC5wcm90b3R5cGUuX19kZWZpbmVHZXR0ZXJfXygnb3V0ZXJIVE1MJywgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHQgICAgICAgIGRpdi5hcHBlbmRDaGlsZCh0aGlzKVxuXHQgICAgICAgIHJldHVybiBkaXYuaW5uZXJIVE1MXG5cdCAgICB9KVxuXHR9XG5cblxuXG5cbi8qKiovIH0sXG4vKiAyMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIHJub3doaXRlID0gL1xcUysvZ1xuXHR2YXIgZmFrZUNsYXNzTGlzdE1ldGhvZHMgPSB7XG5cdCAgICBfdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZVxuXHQgICAgICAgIHZhciBjbHMgPSBub2RlLmNsYXNzTmFtZVxuXHQgICAgICAgIHZhciBzdHIgPSB0eXBlb2YgY2xzID09PSAnc3RyaW5nJyA/IGNscyA6IGNscy5iYXNlVmFsXG5cdCAgICAgICAgdmFyIG1hdGNoID0gc3RyLm1hdGNoKHJub3doaXRlKVxuXHQgICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoLmpvaW4oJyAnKSA6ICcnXG5cdCAgICB9LFxuXHQgICAgX2NvbnRhaW5zOiBmdW5jdGlvbiAoY2xzKSB7XG5cdCAgICAgICAgcmV0dXJuICgnICcgKyB0aGlzICsgJyAnKS5pbmRleE9mKCcgJyArIGNscyArICcgJykgPiAtMVxuXHQgICAgfSxcblx0ICAgIF9hZGQ6IGZ1bmN0aW9uIChjbHMpIHtcblx0ICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMoY2xzKSkge1xuXHQgICAgICAgICAgICB0aGlzLl9zZXQodGhpcyArICcgJyArIGNscylcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgX3JlbW92ZTogZnVuY3Rpb24gKGNscykge1xuXHQgICAgICAgIHRoaXMuX3NldCgoJyAnICsgdGhpcyArICcgJykucmVwbGFjZSgnICcgKyBjbHMgKyAnICcsICcgJykpXG5cdCAgICB9LFxuXHQgICAgX19zZXQ6IGZ1bmN0aW9uIChjbHMpIHtcblx0ICAgICAgICBjbHMgPSBjbHMudHJpbSgpXG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVcblx0ICAgICAgICBpZiAodHlwZW9mIG5vZGUuY2xhc3NOYW1lID09PSAnb2JqZWN0Jykge1xuXHQgICAgICAgICAgICAvL1NWR+WFg+e0oOeahGNsYXNzTmFtZeaYr+S4gOS4quWvueixoSBTVkdBbmltYXRlZFN0cmluZyB7IGJhc2VWYWw9JycsIGFuaW1WYWw9Jyd977yM5Y+q6IO96YCa6L+Hc2V0L2dldEF0dHJpYnV0ZeaTjeS9nFxuXHQgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbHMpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSBjbHNcblx0ICAgICAgICB9XG5cdCAgICB9IC8vdG9nZ2xl5a2Y5Zyo54mI5pys5beu5byC77yM5Zug5q2k5LiN5L2/55So5a6DXG5cdH1cblxuXHRmdW5jdGlvbiBmYWtlQ2xhc3NMaXN0KG5vZGUpIHtcblx0ICAgIGlmICghKCdjbGFzc0xpc3QnIGluIG5vZGUpKSB7XG5cdCAgICAgICAgbm9kZS5jbGFzc0xpc3QgPSB7XG5cdCAgICAgICAgICAgIG5vZGU6IG5vZGVcblx0ICAgICAgICB9XG5cdCAgICAgICAgZm9yICh2YXIgayBpbiBmYWtlQ2xhc3NMaXN0TWV0aG9kcykge1xuXHQgICAgICAgICAgICBub2RlLmNsYXNzTGlzdFtrLnNsaWNlKDEpXSA9IGZha2VDbGFzc0xpc3RNZXRob2RzW2tdXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIG5vZGUuY2xhc3NMaXN0XG5cdH1cblxuXG5cdCdhZGQscmVtb3ZlJy5yZXBsYWNlKGF2YWxvbi5yd29yZCwgZnVuY3Rpb24gKG1ldGhvZCkge1xuXHQgICAgYXZhbG9uLmZuW21ldGhvZCArICdDbGFzcyddID0gZnVuY3Rpb24gKGNscykge1xuXHQgICAgICAgIHZhciBlbCA9IHRoaXNbMF0gfHwge31cblx0ICAgICAgICAvL2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvTW96aWxsYS9GaXJlZm94L1JlbGVhc2VzLzI2XG5cdCAgICAgICAgaWYgKGNscyAmJiB0eXBlb2YgY2xzID09PSAnc3RyaW5nJyAmJiBlbC5ub2RlVHlwZSA9PT0gMSkge1xuXHQgICAgICAgICAgICBjbHMucmVwbGFjZShybm93aGl0ZSwgZnVuY3Rpb24gKGMpIHtcblx0ICAgICAgICAgICAgICAgIGZha2VDbGFzc0xpc3QoZWwpW21ldGhvZF0oYylcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXNcblx0ICAgIH1cblx0fSlcblxuXHRhdmFsb24uZm4ubWl4KHtcblx0ICAgIGhhc0NsYXNzOiBmdW5jdGlvbiAoY2xzKSB7XG5cdCAgICAgICAgdmFyIGVsID0gdGhpc1swXSB8fCB7fVxuXHQgICAgICAgIHJldHVybiBlbC5ub2RlVHlwZSA9PT0gMSAmJiBmYWtlQ2xhc3NMaXN0KGVsKS5jb250YWlucyhjbHMpXG5cdCAgICB9LFxuXHQgICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uICh2YWx1ZSwgc3RhdGVWYWwpIHtcblx0ICAgICAgICB2YXIgaXNCb29sID0gdHlwZW9mIHN0YXRlVmFsID09PSAnYm9vbGVhbidcblx0ICAgICAgICB2YXIgbWUgPSB0aGlzXG5cdCAgICAgICAgU3RyaW5nKHZhbHVlKS5yZXBsYWNlKHJub3doaXRlLCBmdW5jdGlvbiAoYykge1xuXHQgICAgICAgICAgICB2YXIgc3RhdGUgPSBpc0Jvb2wgPyBzdGF0ZVZhbCA6ICFtZS5oYXNDbGFzcyhjKVxuXHQgICAgICAgICAgICBtZVtzdGF0ZSA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXShjKVxuXHQgICAgICAgIH0pXG5cdCAgICAgICAgcmV0dXJuIHRoaXNcblx0ICAgIH1cblx0fSlcblxuXG5cbi8qKiovIH0sXG4vKiAyMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XG5cdHZhciBwcm9wTWFwID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMylcblx0dmFyIGlzVk1MID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNClcblx0dmFyIHJzdmcgPS9eXFxbb2JqZWN0IFNWR1xcdypFbGVtZW50XFxdJC9cblx0dmFyIHJhbXAgPSAvJmFtcDsvZ1xuXG5cdGZ1bmN0aW9uIGF0dHJVcGRhdGUobm9kZSwgdm5vZGUpIHtcblx0ICAgIHZhciBhdHRycyA9IHZub2RlLmNoYW5nZUF0dHJcblx0ICAgIGlmICghbm9kZSB8fCBub2RlLm5vZGVUeXBlICE9PSAxICkge1xuXHQgICAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICAgaWYgKGF0dHJzKSB7XG5cdCAgICAgICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gYXR0cnMpIHtcblx0ICAgICAgICAgICAgdmFyIHZhbCA9IGF0dHJzW2F0dHJOYW1lXVxuXHQgICAgICAgICAgICAvLyDlpITnkIbot6/lvoTlsZ7mgKdcblx0ICAgICAgICAgICAgaWYgKGF0dHJOYW1lID09PSAnaHJlZicgfHwgYXR0ck5hbWUgPT09ICdzcmMnKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIW5vZGUuaGFzQXR0cmlidXRlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFsID0gU3RyaW5nKHZhbCkucmVwbGFjZShyYW1wLCAnJicpIC8v5aSE55CGSUU2N+iHquWKqOi9rOS5ieeahOmXrumimFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgbm9kZVthdHRyTmFtZV0gPSB2YWxcblx0ICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuY2hyb21lICYmIG5vZGUudGFnTmFtZSA9PT0gJ0VNQkVEJykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGUgLy8jNTI1ICBjaHJvbWUxLTM35LiLZW1iZWTmoIfnrb7liqjmgIHorr7nva5zcmPkuI3og73lj5HnlJ/or7fmsYJcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ21zLXNyYycpXG5cdCAgICAgICAgICAgICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChjb21tZW50LCBub2RlKVxuXHQgICAgICAgICAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobm9kZSwgY29tbWVudClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIC8v5aSE55CGSFRNTDUgZGF0YS0q5bGe5oCnXG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0ck5hbWUuaW5kZXhPZignZGF0YS0nKSA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbClcblxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gcHJvcE1hcFthdHRyTmFtZV0gfHwgYXR0ck5hbWVcblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZVtwcm9wTmFtZV0gPT09ICdib29sZWFuJykge1xuXHQgICAgICAgICAgICAgICAgICAgIG5vZGVbcHJvcE5hbWVdID0gISF2YWxcblx0ICAgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAgICAgLy/luIPlsJTlsZ7mgKflv4Xpobvkvb/nlKhlbC54eHggPSB0cnVlfGZhbHNl5pa55byP6K6+5YC8XG5cdCAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzkuLpmYWxzZSwgSUXlhajns7vliJfkuIvnm7jlvZPkuo5zZXRBdHRyaWJ1dGUoeHh4LCcnKSxcblx0ICAgICAgICAgICAgICAgICAgICAvL+S8muW9seWTjeWIsOagt+W8jyzpnIDopoHov5vkuIDmraXlpITnkIZcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gZmFsc2UgKSB7Ly/np7vpmaTlsZ7mgKdcblx0ICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShwcm9wTmFtZSlcblx0ICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgLy9TVkflj6rog73kvb/nlKhzZXRBdHRyaWJ1dGUoeHh4LCB5eXkpLCBWTUzlj6rog73kvb/nlKhub2RlLnh4eCA9IHl5eSAsXG5cdCAgICAgICAgICAgICAgICAvL0hUTUznmoTlm7rmnInlsZ7mgKflv4Xpobtub2RlLnh4eCA9IHl5eVxuXHQgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICB2YXIgaXNJbm5hdGUgPSByc3ZnLnRlc3Qobm9kZSkgPyBmYWxzZSA6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICghYXZhbG9uLm1vZGVybiAmJiBpc1ZNTChub2RlKSkgPyB0cnVlIDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck5hbWUgaW4gbm9kZS5jbG9uZU5vZGUoZmFsc2UpXG5cdCAgICAgICAgICAgICAgICBpZiAoaXNJbm5hdGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICBub2RlW3Byb3BOYW1lXSA9IHZhbCArICcnXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCB2YWwpXG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZub2RlLmNoYW5nZUF0dHIgPSBudWxsXG5cdCAgICB9XG5cdH1cblxuXHR2YXIgcnZhbGlkY2hhcnMgPSAvXltcXF0sOnt9XFxzXSokLyxcblx0ICAgIHJ2YWxpZGJyYWNlcyA9IC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZyxcblx0ICAgIHJ2YWxpZGVzY2FwZSA9IC9cXFxcKD86W1wiXFxcXFxcL2JmbnJ0XXx1W1xcZGEtZkEtRl17NH0pL2csXG5cdCAgICBydmFsaWR0b2tlbnMgPSAvXCJbXlwiXFxcXFxcclxcbl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/KD86XFxkK1xcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS9nXG5cblx0YXZhbG9uLnBhcnNlSlNPTiA9IGF2YWxvbi53aW5kb3cuSlNPTiA/IEpTT04ucGFyc2UgOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuXHQgICAgICAgIGRhdGEgPSBkYXRhLnRyaW0oKVxuXHQgICAgICAgIGlmIChkYXRhKSB7XG5cdCAgICAgICAgICAgIGlmIChydmFsaWRjaGFycy50ZXN0KGRhdGEucmVwbGFjZShydmFsaWRlc2NhcGUsICdAJylcblx0ICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShydmFsaWR0b2tlbnMsICddJylcblx0ICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShydmFsaWRicmFjZXMsICcnKSkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiAobmV3IEZ1bmN0aW9uKCdyZXR1cm4gJyArIGRhdGEpKSgpIC8vIGpzaGludCBpZ25vcmU6bGluZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGF2YWxvbi5lcnJvcignSW52YWxpZCBKU09OOiAnICsgZGF0YSlcblx0ICAgIH1cblx0ICAgIHJldHVybiBkYXRhXG5cdH1cblxuXG5cdGF2YWxvbi5mbi5hdHRyID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG5cdCAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuXHQgICAgICAgIHRoaXNbMF0uc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKVxuXHQgICAgICAgIHJldHVybiB0aGlzXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJldHVybiB0aGlzWzBdLmdldEF0dHJpYnV0ZShuYW1lKVxuXHQgICAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdHRyVXBkYXRlXG5cbi8qKiovIH0sXG4vKiAyMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIHByb3BNYXAgPSB7Ly/kuI3op4TliJnnmoTlsZ7mgKflkI3mmKDlsIRcblx0ICAgICdhY2NlcHQtY2hhcnNldCc6ICdhY2NlcHRDaGFyc2V0Jyxcblx0ICAgICdjaGFyJzogJ2NoJyxcblx0ICAgIGNoYXJvZmY6ICdjaE9mZicsXG5cdCAgICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcblx0ICAgICdmb3InOiAnaHRtbEZvcicsXG5cdCAgICAnaHR0cC1lcXVpdic6ICdodHRwRXF1aXYnXG5cdH1cblx0Lypcblx0Y29udGVudGVkaXRhYmxl5LiN5piv5biD5bCU5bGe5oCnXG5cdGh0dHA6Ly93d3cuemhhbmd4aW54dS5jb20vd29yZHByZXNzLzIwMTYvMDEvY29udGVudGVkaXRhYmxlLXBsYWludGV4dC1vbmx5L1xuXHRjb250ZW50ZWRpdGFibGU9Jydcblx0Y29udGVudGVkaXRhYmxlPSdldmVudHMnXG5cdGNvbnRlbnRlZGl0YWJsZT0nY2FyZXQnXG5cdGNvbnRlbnRlZGl0YWJsZT0ncGxhaW50ZXh0LW9ubHknXG5cdGNvbnRlbnRlZGl0YWJsZT0ndHJ1ZSdcblx0Y29udGVudGVkaXRhYmxlPSdmYWxzZSdcblx0ICovXG5cdHZhciBib29scyA9IFsnYXV0b2ZvY3VzLGF1dG9wbGF5LGFzeW5jLGFsbG93VHJhbnNwYXJlbmN5LGNoZWNrZWQsY29udHJvbHMnLFxuXHQgICAgJ2RlY2xhcmUsZGlzYWJsZWQsZGVmZXIsZGVmYXVsdENoZWNrZWQsZGVmYXVsdFNlbGVjdGVkLCcsXG5cdCAgICAnaXNNYXAsbG9vcCxtdWx0aXBsZSxub0hyZWYsbm9SZXNpemUsbm9TaGFkZScsXG5cdCAgICAnb3BlbixyZWFkT25seSxzZWxlY3RlZCdcblx0XS5qb2luKCcsJylcblxuXHRib29scy5yZXBsYWNlKC9cXHcrL2csIGZ1bmN0aW9uIChuYW1lKSB7XG5cdCAgICBwcm9wTWFwW25hbWUudG9Mb3dlckNhc2UoKV0gPSBuYW1lXG5cdH0pXG5cblx0dmFyIGFub21hbHkgPSBbJ2FjY2Vzc0tleSxiZ0NvbG9yLGNlbGxQYWRkaW5nLGNlbGxTcGFjaW5nLGNvZGVCYXNlLGNvZGVUeXBlLGNvbFNwYW4nLFxuXHQgICAgJ2RhdGVUaW1lLGRlZmF1bHRWYWx1ZSxjb250ZW50RWRpdGFibGUsZnJhbWVCb3JkZXIsbG9uZ0Rlc2MsbWF4TGVuZ3RoLCcrXG5cdCAgICAnbWFyZ2luV2lkdGgsbWFyZ2luSGVpZ2h0LHJvd1NwYW4sdGFiSW5kZXgsdXNlTWFwLHZTcGFjZSx2YWx1ZVR5cGUsdkFsaWduJ1xuXHRdLmpvaW4oJywnKVxuXG5cdGFub21hbHkucmVwbGFjZSgvXFx3Ky9nLCBmdW5jdGlvbiAobmFtZSkge1xuXHQgICAgcHJvcE1hcFtuYW1lLnRvTG93ZXJDYXNlKCldID0gbmFtZVxuXHR9KVxuXG5cdG1vZHVsZS5leHBvcnRzID0gcHJvcE1hcFxuXG5cbi8qKiovIH0sXG4vKiAyNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0ZnVuY3Rpb24gaXNWTUwoc3JjKSB7XG5cdCAgICB2YXIgbm9kZU5hbWUgPSBzcmMubm9kZU5hbWVcblx0ICAgIHJldHVybiBub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZSAmJiBzcmMuc2NvcGVOYW1lICYmIHNyYy5vdXRlclRleHQgPT09ICcnXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGlzVk1MXG5cbi8qKiovIH0sXG4vKiAyNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIHJvb3QgPSBhdmFsb24ucm9vdFxuXHR2YXIgd2luZG93ID0gYXZhbG9uLndpbmRvd1xuXHR2YXIgY2FtZWxpemUgPSBhdmFsb24uY2FtZWxpemVcblx0dmFyIGNzc0hvb2tzID0gYXZhbG9uLmNzc0hvb2tzXG5cblx0dmFyIHByZWZpeGVzID0gWycnLCAnLXdlYmtpdC0nLCAnLW8tJywgJy1tb3otJywgJy1tcy0nXVxuXHR2YXIgY3NzTWFwID0ge1xuXHQgICAgJ2Zsb2F0Jzogd2luZG93LlJhbmdlID8gJ2Nzc0Zsb2F0JyA6ICdzdHlsZUZsb2F0J1xuXHR9XG5cdGF2YWxvbi5jc3NOdW1iZXIgPSBhdmFsb24ub25lT2JqZWN0KCdhbmltYXRpb25JdGVyYXRpb25Db3VudCxjb2x1bW5Db3VudCxvcmRlcixmbGV4LGZsZXhHcm93LGZsZXhTaHJpbmssZmlsbE9wYWNpdHksZm9udFdlaWdodCxsaW5lSGVpZ2h0LG9wYWNpdHksb3JwaGFucyx3aWRvd3MsekluZGV4LHpvb20nKVxuXG5cdGF2YWxvbi5jc3NOYW1lID0gZnVuY3Rpb24gKG5hbWUsIGhvc3QsIGNhbWVsQ2FzZSkge1xuXHQgICAgaWYgKGNzc01hcFtuYW1lXSkge1xuXHQgICAgICAgIHJldHVybiBjc3NNYXBbbmFtZV1cblx0ICAgIH1cblx0ICAgIGhvc3QgPSBob3N0IHx8IHJvb3Quc3R5bGUgfHwge31cblx0ICAgIGZvciAodmFyIGkgPSAwLCBuID0gcHJlZml4ZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdCAgICAgICAgY2FtZWxDYXNlID0gY2FtZWxpemUocHJlZml4ZXNbaV0gKyBuYW1lKVxuXHQgICAgICAgIGlmIChjYW1lbENhc2UgaW4gaG9zdCkge1xuXHQgICAgICAgICAgICByZXR1cm4gKGNzc01hcFtuYW1lXSA9IGNhbWVsQ2FzZSlcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gbnVsbFxuXHR9XG5cblxuXHRhdmFsb24uZm4uY3NzID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG5cdCAgICBpZiAoYXZhbG9uLmlzUGxhaW5PYmplY3QobmFtZSkpIHtcblx0ICAgICAgICBmb3IgKHZhciBpIGluIG5hbWUpIHtcblx0ICAgICAgICAgICAgYXZhbG9uLmNzcyh0aGlzLCBpLCBuYW1lW2ldKVxuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdmFyIHJldCA9IGF2YWxvbi5jc3ModGhpcywgbmFtZSwgdmFsdWUpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gcmV0ICE9PSB2b2lkIDAgPyByZXQgOiB0aGlzXG5cdH1cblxuXHRhdmFsb24uZm4ucG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgb2Zmc2V0UGFyZW50LCBvZmZzZXQsXG5cdCAgICAgICAgICAgIGVsZW0gPSB0aGlzWzBdLFxuXHQgICAgICAgICAgICBwYXJlbnRPZmZzZXQgPSB7XG5cdCAgICAgICAgICAgICAgICB0b3A6IDAsXG5cdCAgICAgICAgICAgICAgICBsZWZ0OiAwXG5cdCAgICAgICAgICAgIH1cblx0ICAgIGlmICghZWxlbSkge1xuXHQgICAgICAgIHJldHVybiBwYXJlbnRPZmZzZXRcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLmNzcygncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJykge1xuXHQgICAgICAgIG9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQoKSAvL+W+l+WIsOecn+ato+eahG9mZnNldFBhcmVudFxuXHQgICAgICAgIG9mZnNldCA9IHRoaXMub2Zmc2V0KCkgLy8g5b6X5Yiw5q2j56Gu55qEb2Zmc2V0UGFyZW50XG5cdCAgICAgICAgaWYgKG9mZnNldFBhcmVudFswXS50YWdOYW1lICE9PSAnSFRNTCcpIHtcblx0ICAgICAgICAgICAgcGFyZW50T2Zmc2V0ID0gb2Zmc2V0UGFyZW50Lm9mZnNldCgpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHBhcmVudE9mZnNldC50b3AgKz0gYXZhbG9uLmNzcyhvZmZzZXRQYXJlbnRbMF0sICdib3JkZXJUb3BXaWR0aCcsIHRydWUpXG5cdCAgICAgICAgcGFyZW50T2Zmc2V0LmxlZnQgKz0gYXZhbG9uLmNzcyhvZmZzZXRQYXJlbnRbMF0sICdib3JkZXJMZWZ0V2lkdGgnLCB0cnVlKVxuXG5cdCAgICAgICAgLy8gU3VidHJhY3Qgb2Zmc2V0UGFyZW50IHNjcm9sbCBwb3NpdGlvbnNcblx0ICAgICAgICBwYXJlbnRPZmZzZXQudG9wIC09IG9mZnNldFBhcmVudC5zY3JvbGxUb3AoKVxuXHQgICAgICAgIHBhcmVudE9mZnNldC5sZWZ0IC09IG9mZnNldFBhcmVudC5zY3JvbGxMZWZ0KClcblx0ICAgIH1cblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgdG9wOiBvZmZzZXQudG9wIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGF2YWxvbi5jc3MoZWxlbSwgJ21hcmdpblRvcCcsIHRydWUpLFxuXHQgICAgICAgIGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQgLSBhdmFsb24uY3NzKGVsZW0sICdtYXJnaW5MZWZ0JywgdHJ1ZSlcblx0ICAgIH1cblx0fVxuXHRhdmFsb24uZm4ub2Zmc2V0UGFyZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgdmFyIG9mZnNldFBhcmVudCA9IHRoaXNbMF0ub2Zmc2V0UGFyZW50XG5cdCAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGF2YWxvbi5jc3Mob2Zmc2V0UGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0ICAgICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50XG5cdCAgICB9XG5cdCAgICByZXR1cm4gYXZhbG9uKG9mZnNldFBhcmVudCB8fCByb290KVxuXHR9XG5cblx0Y3NzSG9va3NbJ0A6c2V0J10gPSBmdW5jdGlvbiAobm9kZSwgbmFtZSwgdmFsdWUpIHtcblx0ICAgIHRyeSB7XG5cdCAgICAgICAgLy9ub2RlLnN0eWxlLndpZHRoID0gTmFOO25vZGUuc3R5bGUud2lkdGggPSAneHh4eHh4eCc7XG5cdCAgICAgICAgLy9ub2RlLnN0eWxlLndpZHRoID0gdW5kZWZpbmUg5Zyo5pen5byPSUXkuIvkvJrmipvlvILluLhcblx0ICAgICAgICBub2RlLnN0eWxlW25hbWVdID0gdmFsdWVcblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIH1cblx0fVxuXG5cdGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuXHQgICAgY3NzSG9va3NbJ0A6Z2V0J10gPSBmdW5jdGlvbiAobm9kZSwgbmFtZSkge1xuXHQgICAgICAgIGlmICghbm9kZSB8fCAhbm9kZS5zdHlsZSkge1xuXHQgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldENvbXB1dGVkU3R5bGXopoHmsYLkvKDlhaXkuIDkuKroioLngrkgJyArIG5vZGUpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciByZXQsIHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSwgbnVsbClcblx0ICAgICAgICBpZiAoc3R5bGVzKSB7XG5cdCAgICAgICAgICAgIHJldCA9IG5hbWUgPT09ICdmaWx0ZXInID8gc3R5bGVzLmdldFByb3BlcnR5VmFsdWUobmFtZSkgOiBzdHlsZXNbbmFtZV1cblx0ICAgICAgICAgICAgaWYgKHJldCA9PT0gJycpIHtcblx0ICAgICAgICAgICAgICAgIHJldCA9IG5vZGUuc3R5bGVbbmFtZV0gLy/lhbbku5bmtY/op4jlmajpnIDopoHmiJHku6zmiYvliqjlj5blhoXogZTmoLflvI9cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmV0XG5cdCAgICB9XG5cdCAgICBjc3NIb29rc1snb3BhY2l0eTpnZXQnXSA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdCAgICAgICAgdmFyIHJldCA9IGNzc0hvb2tzWydAOmdldCddKG5vZGUsICdvcGFjaXR5Jylcblx0ICAgICAgICByZXR1cm4gcmV0ID09PSAnJyA/ICcxJyA6IHJldFxuXHQgICAgfVxuXHR9IGVsc2Uge1xuXHQgICAgdmFyIHJudW1ub25weCA9IC9eLT8oPzpcXGQqXFwuKT9cXGQrKD8hcHgpW15cXGRcXHNdKyQvaVxuXHQgICAgdmFyIHJwb3NpdGlvbiA9IC9eKHRvcHxyaWdodHxib3R0b218bGVmdCkkL1xuXHQgICAgdmFyIHJhbHBoYSA9IC9hbHBoYVxcKFteKV0qXFwpL2lcblx0ICAgIHZhciBpZTggPSAhIXdpbmRvdy5YRG9tYWluUmVxdWVzdFxuXHQgICAgdmFyIHNhbHBoYSA9ICdEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5BbHBoYSdcblx0ICAgIHZhciBib3JkZXIgPSB7XG5cdCAgICAgICAgdGhpbjogaWU4ID8gJzFweCcgOiAnMnB4Jyxcblx0ICAgICAgICBtZWRpdW06IGllOCA/ICczcHgnIDogJzRweCcsXG5cdCAgICAgICAgdGhpY2s6IGllOCA/ICc1cHgnIDogJzZweCdcblx0ICAgIH1cblx0ICAgIGNzc0hvb2tzWydAOmdldCddID0gZnVuY3Rpb24gKG5vZGUsIG5hbWUpIHtcblx0ICAgICAgICAvL+WPluW+l+eyvuehruWAvO+8jOS4jei/h+Wug+acieWPr+iDveaYr+W4pmVtLHBjLG1tLHB0LCXnrYnljZXkvY1cblx0ICAgICAgICB2YXIgY3VycmVudFN0eWxlID0gbm9kZS5jdXJyZW50U3R5bGVcblx0ICAgICAgICB2YXIgcmV0ID0gY3VycmVudFN0eWxlW25hbWVdXG5cdCAgICAgICAgaWYgKChybnVtbm9ucHgudGVzdChyZXQpICYmICFycG9zaXRpb24udGVzdChyZXQpKSkge1xuXHQgICAgICAgICAgICAvL+KRoO+8jOS/neWtmOWOn+acieeahHN0eWxlLmxlZnQsIHJ1bnRpbWVTdHlsZS5sZWZ0LFxuXHQgICAgICAgICAgICB2YXIgc3R5bGUgPSBub2RlLnN0eWxlLFxuXHQgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBzdHlsZS5sZWZ0LFxuXHQgICAgICAgICAgICAgICAgICAgIHJzTGVmdCA9IG5vZGUucnVudGltZVN0eWxlLmxlZnRcblx0ICAgICAgICAgICAgLy/ikaHnlLHkuo7ikaLlpITnmoRzdHlsZS5sZWZ0ID0geHh45Lya5b2x5ZON5YiwY3VycmVudFN0eWxlLmxlZnTvvIxcblx0ICAgICAgICAgICAgLy/lm6DmraTmiorlroNjdXJyZW50U3R5bGUubGVmdOaUvuWIsHJ1bnRpbWVTdHlsZS5sZWZ077yMXG5cdCAgICAgICAgICAgIC8vcnVudGltZVN0eWxlLmxlZnTmi6XmnInmnIDpq5jkvJjlhYjnuqfvvIzkuI3kvJpzdHlsZS5sZWZ05b2x5ZONXG5cdCAgICAgICAgICAgIG5vZGUucnVudGltZVN0eWxlLmxlZnQgPSBjdXJyZW50U3R5bGUubGVmdFxuXHQgICAgICAgICAgICAvL+KRouWwhueyvuehruWAvOi1i+e7meWIsHN0eWxlLmxlZnTvvIznhLblkI7pgJrov4dJReeahOWPpuS4gOS4quengeacieWxnuaApyBzdHlsZS5waXhlbExlZnRcblx0ICAgICAgICAgICAgLy/lvpfliLDljZXkvY3kuLpweOeahOe7k+aenO+8m2ZvbnRTaXpl55qE5YiG5pSv6KeBaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvNzYwXG5cdCAgICAgICAgICAgIHN0eWxlLmxlZnQgPSBuYW1lID09PSAnZm9udFNpemUnID8gJzFlbScgOiAocmV0IHx8IDApXG5cdCAgICAgICAgICAgIHJldCA9IHN0eWxlLnBpeGVsTGVmdCArICdweCdcblx0ICAgICAgICAgICAgLy/ikaPov5jljp8gc3R5bGUubGVmdO+8jHJ1bnRpbWVTdHlsZS5sZWZ0XG5cdCAgICAgICAgICAgIHN0eWxlLmxlZnQgPSBsZWZ0XG5cdCAgICAgICAgICAgIG5vZGUucnVudGltZVN0eWxlLmxlZnQgPSByc0xlZnRcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHJldCA9PT0gJ21lZGl1bScpIHtcblx0ICAgICAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgnV2lkdGgnLCAnU3R5bGUnKVxuXHQgICAgICAgICAgICAvL2JvcmRlciB3aWR0aCDpu5jorqTlgLzkuLptZWRpdW3vvIzljbPkvb/lhbbkuLowJ1xuXHQgICAgICAgICAgICBpZiAoY3VycmVudFN0eWxlW25hbWVdID09PSAnbm9uZScpIHtcblx0ICAgICAgICAgICAgICAgIHJldCA9ICcwcHgnXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJldCA9PT0gJycgPyAnYXV0bycgOiBib3JkZXJbcmV0XSB8fCByZXRcblx0ICAgIH1cblx0ICAgIGNzc0hvb2tzWydvcGFjaXR5OnNldCddID0gZnVuY3Rpb24gKG5vZGUsIG5hbWUsIHZhbHVlKSB7XG5cdCAgICAgICAgdmFyIHN0eWxlID0gbm9kZS5zdHlsZVxuXHQgICAgICAgIHZhciBvcGFjaXR5ID0gaXNGaW5pdGUodmFsdWUpICYmIHZhbHVlIDw9IDEgPyAnYWxwaGEob3BhY2l0eT0nICsgdmFsdWUgKiAxMDAgKyAnKScgOiAnJ1xuXHQgICAgICAgIHZhciBmaWx0ZXIgPSBzdHlsZS5maWx0ZXIgfHwgJydcblx0ICAgICAgICBzdHlsZS56b29tID0gMVxuXHQgICAgICAgIC8v5LiN6IO95L2/55So5Lul5LiL5pa55byP6K6+572u6YCP5piO5bqmXG5cdCAgICAgICAgLy9ub2RlLmZpbHRlcnMuYWxwaGEub3BhY2l0eSA9IHZhbHVlICogMTAwXG5cdCAgICAgICAgc3R5bGUuZmlsdGVyID0gKHJhbHBoYS50ZXN0KGZpbHRlcikgP1xuXHQgICAgICAgICAgICAgICAgZmlsdGVyLnJlcGxhY2UocmFscGhhLCBvcGFjaXR5KSA6XG5cdCAgICAgICAgICAgICAgICBmaWx0ZXIgKyAnICcgKyBvcGFjaXR5KS50cmltKClcblx0ICAgICAgICBpZiAoIXN0eWxlLmZpbHRlcikge1xuXHQgICAgICAgICAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ2ZpbHRlcicpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgY3NzSG9va3NbJ29wYWNpdHk6Z2V0J10gPSBmdW5jdGlvbiAobm9kZSkge1xuXHQgICAgICAgIC8v6L+Z5piv5pyA5b+r55qE6I635Y+WSUXpgI/mmI7lgLznmoTmlrnlvI/vvIzkuI3pnIDopoHliqjnlKjmraPliJnkuobvvIFcblx0ICAgICAgICB2YXIgYWxwaGEgPSBub2RlLmZpbHRlcnMuYWxwaGEgfHwgbm9kZS5maWx0ZXJzW3NhbHBoYV0sXG5cdCAgICAgICAgICAgICAgICBvcCA9IGFscGhhICYmIGFscGhhLmVuYWJsZWQgPyBhbHBoYS5vcGFjaXR5IDogMTAwXG5cdCAgICAgICAgcmV0dXJuIChvcCAvIDEwMCkgKyAnJyAvL+ehruS/nei/lOWbnueahOaYr+Wtl+espuS4slxuXHQgICAgfVxuXHR9XG5cblx0J3RvcCxsZWZ0Jy5yZXBsYWNlKGF2YWxvbi5yd29yZCwgZnVuY3Rpb24gKG5hbWUpIHtcblx0ICAgIGNzc0hvb2tzW25hbWUgKyAnOmdldCddID0gZnVuY3Rpb24gKG5vZGUpIHtcblx0ICAgICAgICB2YXIgY29tcHV0ZWQgPSBjc3NIb29rc1snQDpnZXQnXShub2RlLCBuYW1lKVxuXHQgICAgICAgIHJldHVybiAvcHgkLy50ZXN0KGNvbXB1dGVkKSA/IGNvbXB1dGVkIDpcblx0ICAgICAgICAgICAgICAgIGF2YWxvbihub2RlKS5wb3NpdGlvbigpW25hbWVdICsgJ3B4J1xuXHQgICAgfVxuXHR9KVxuXG5cdHZhciBjc3NTaG93ID0ge1xuXHQgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdCAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcblx0ICAgIGRpc3BsYXk6ICdibG9jaydcblx0fVxuXG5cdHZhciByZGlzcGxheXN3YXAgPSAvXihub25lfHRhYmxlKD8hLWNbZWFdKS4rKS9cblxuXHRmdW5jdGlvbiBzaG93SGlkZGVuKG5vZGUsIGFycmF5KSB7XG5cdCAgICAvL2h0dHA6Ly93d3cuY25ibG9ncy5jb20vcnVieWxvdXZyZS9hcmNoaXZlLzIwMTIvMTAvMjcvMjc0MjUyOS5odG1sXG5cdCAgICBpZiAobm9kZS5vZmZzZXRXaWR0aCA8PSAwKSB7IC8vb3BlcmEub2Zmc2V0V2lkdGjlj6/og73lsI/kuo4wXG5cdCAgICAgICAgaWYgKHJkaXNwbGF5c3dhcC50ZXN0KGNzc0hvb2tzWydAOmdldCddKG5vZGUsICdkaXNwbGF5JykpKSB7XG5cdCAgICAgICAgICAgIHZhciBvYmogPSB7XG5cdCAgICAgICAgICAgICAgICBub2RlOiBub2RlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBjc3NTaG93KSB7XG5cdCAgICAgICAgICAgICAgICBvYmpbbmFtZV0gPSBub2RlLnN0eWxlW25hbWVdXG5cdCAgICAgICAgICAgICAgICBub2RlLnN0eWxlW25hbWVdID0gY3NzU2hvd1tuYW1lXVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGFycmF5LnB1c2gob2JqKVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlXG5cdCAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgPT09IDEpIHtcblx0ICAgICAgICAgICAgc2hvd0hpZGRlbihwYXJlbnQsIGFycmF5KVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXHRhdmFsb24uZWFjaCh7XG5cdCAgICBXaWR0aDogJ3dpZHRoJyxcblx0ICAgIEhlaWdodDogJ2hlaWdodCdcblx0fSwgZnVuY3Rpb24gKG5hbWUsIG1ldGhvZCkge1xuXHQgICAgdmFyIGNsaWVudFByb3AgPSAnY2xpZW50JyArIG5hbWUsXG5cdCAgICAgICAgICAgIHNjcm9sbFByb3AgPSAnc2Nyb2xsJyArIG5hbWUsXG5cdCAgICAgICAgICAgIG9mZnNldFByb3AgPSAnb2Zmc2V0JyArIG5hbWVcblx0ICAgIGNzc0hvb2tzW21ldGhvZCArICc6Z2V0J10gPSBmdW5jdGlvbiAobm9kZSwgd2hpY2gsIG92ZXJyaWRlKSB7XG5cdCAgICAgICAgdmFyIGJveFNpemluZyA9IC00XG5cdCAgICAgICAgaWYgKHR5cGVvZiBvdmVycmlkZSA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgICAgICAgYm94U2l6aW5nID0gb3ZlcnJpZGVcblx0ICAgICAgICB9XG5cdCAgICAgICAgd2hpY2ggPSBuYW1lID09PSAnV2lkdGgnID8gWydMZWZ0JywgJ1JpZ2h0J10gOiBbJ1RvcCcsICdCb3R0b20nXVxuXHQgICAgICAgIHZhciByZXQgPSBub2RlW29mZnNldFByb3BdIC8vIGJvcmRlci1ib3ggMFxuXHQgICAgICAgIGlmIChib3hTaXppbmcgPT09IDIpIHsgLy8gbWFyZ2luLWJveCAyXG5cdCAgICAgICAgICAgIHJldHVybiByZXQgKyBhdmFsb24uY3NzKG5vZGUsICdtYXJnaW4nICsgd2hpY2hbMF0sIHRydWUpICsgYXZhbG9uLmNzcyhub2RlLCAnbWFyZ2luJyArIHdoaWNoWzFdLCB0cnVlKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoYm94U2l6aW5nIDwgMCkgeyAvLyBwYWRkaW5nLWJveCAgLTJcblx0ICAgICAgICAgICAgcmV0ID0gcmV0IC0gYXZhbG9uLmNzcyhub2RlLCAnYm9yZGVyJyArIHdoaWNoWzBdICsgJ1dpZHRoJywgdHJ1ZSkgLSBhdmFsb24uY3NzKG5vZGUsICdib3JkZXInICsgd2hpY2hbMV0gKyAnV2lkdGgnLCB0cnVlKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoYm94U2l6aW5nID09PSAtNCkgeyAvLyBjb250ZW50LWJveCAtNFxuXHQgICAgICAgICAgICByZXQgPSByZXQgLSBhdmFsb24uY3NzKG5vZGUsICdwYWRkaW5nJyArIHdoaWNoWzBdLCB0cnVlKSAtIGF2YWxvbi5jc3Mobm9kZSwgJ3BhZGRpbmcnICsgd2hpY2hbMV0sIHRydWUpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXRcblx0ICAgIH1cblx0ICAgIGNzc0hvb2tzW21ldGhvZCArICcmZ2V0J10gPSBmdW5jdGlvbiAobm9kZSkge1xuXHQgICAgICAgIHZhciBoaWRkZW4gPSBbXVxuXHQgICAgICAgIHNob3dIaWRkZW4obm9kZSwgaGlkZGVuKVxuXHQgICAgICAgIHZhciB2YWwgPSBjc3NIb29rc1ttZXRob2QgKyAnOmdldCddKG5vZGUpXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDAsIG9iajsgb2JqID0gaGlkZGVuW2krK107ICkge1xuXHQgICAgICAgICAgICBub2RlID0gb2JqLm5vZGVcblx0ICAgICAgICAgICAgZm9yICh2YXIgbiBpbiBvYmopIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW25dID09PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGVbbl0gPSBvYmpbbl1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gdmFsXG5cdCAgICB9XG5cdCAgICBhdmFsb24uZm5bbWV0aG9kXSA9IGZ1bmN0aW9uICh2YWx1ZSkgeyAvL+S8muW/veinhuWFtmRpc3BsYXlcblx0ICAgICAgICB2YXIgbm9kZSA9IHRoaXNbMF1cblx0ICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgICAgICBpZiAobm9kZS5zZXRUaW1lb3V0KSB7IC8v5Y+W5b6X56qX5Y+j5bC65a+4XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVsnaW5uZXInICsgbmFtZV0gfHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbY2xpZW50UHJvcF0gfHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kb2N1bWVudC5ib2R5W2NsaWVudFByb3BdIC8vSUU25LiL5YmN5Lik5Liq5YiG5Yir5Li6dW5kZWZpbmVkLDBcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gOSkgeyAvL+WPluW+l+mhtemdouWwuuWvuFxuXHQgICAgICAgICAgICAgICAgdmFyIGRvYyA9IG5vZGUuZG9jdW1lbnRFbGVtZW50XG5cdCAgICAgICAgICAgICAgICAvL0ZGIGNocm9tZSAgICBodG1sLnNjcm9sbEhlaWdodDwgYm9keS5zY3JvbGxIZWlnaHRcblx0ICAgICAgICAgICAgICAgIC8vSUUg5qCH5YeG5qih5byPIDogaHRtbC5zY3JvbGxIZWlnaHQ+IGJvZHkuc2Nyb2xsSGVpZ2h0XG5cdCAgICAgICAgICAgICAgICAvL0lFIOaAquW8guaooeW8jyA6IGh0bWwuc2Nyb2xsSGVpZ2h0IOacgOWkp+etieS6juWPr+inhueql+WPo+WkmuS4gOeCue+8n1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KG5vZGUuYm9keVtzY3JvbGxQcm9wXSwgZG9jW3Njcm9sbFByb3BdLCBub2RlLmJvZHlbb2Zmc2V0UHJvcF0sIGRvY1tvZmZzZXRQcm9wXSwgZG9jW2NsaWVudFByb3BdKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBjc3NIb29rc1ttZXRob2QgKyAnJmdldCddKG5vZGUpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3NzKG1ldGhvZCwgdmFsdWUpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgYXZhbG9uLmZuWydpbm5lcicgKyBuYW1lXSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gY3NzSG9va3NbbWV0aG9kICsgJzpnZXQnXSh0aGlzWzBdLCB2b2lkIDAsIC0yKVxuXHQgICAgfVxuXHQgICAgYXZhbG9uLmZuWydvdXRlcicgKyBuYW1lXSA9IGZ1bmN0aW9uIChpbmNsdWRlTWFyZ2luKSB7XG5cdCAgICAgICAgcmV0dXJuIGNzc0hvb2tzW21ldGhvZCArICc6Z2V0J10odGhpc1swXSwgdm9pZCAwLCBpbmNsdWRlTWFyZ2luID09PSB0cnVlID8gMiA6IDApXG5cdCAgICB9XG5cdH0pXG5cblx0YXZhbG9uLmZuLm9mZnNldCA9IGZ1bmN0aW9uICgpIHsgLy/lj5blvpfot53nprvpobXpnaLlt6blj7Pop5LnmoTlnZDmoIdcblx0ICAgIHZhciBub2RlID0gdGhpc1swXSxcblx0ICAgICAgICAgICAgYm94ID0ge1xuXHQgICAgICAgICAgICAgICAgbGVmdDogMCxcblx0ICAgICAgICAgICAgICAgIHRvcDogMFxuXHQgICAgICAgICAgICB9XG5cdCAgICBpZiAoIW5vZGUgfHwgIW5vZGUudGFnTmFtZSB8fCAhbm9kZS5vd25lckRvY3VtZW50KSB7XG5cdCAgICAgICAgcmV0dXJuIGJveFxuXHQgICAgfVxuXHQgICAgdmFyIGRvYyA9IG5vZGUub3duZXJEb2N1bWVudCxcblx0ICAgICAgICAgICAgYm9keSA9IGRvYy5ib2R5LFxuXHQgICAgICAgICAgICByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCxcblx0ICAgICAgICAgICAgd2luID0gZG9jLmRlZmF1bHRWaWV3IHx8IGRvYy5wYXJlbnRXaW5kb3dcblx0ICAgIGlmICghYXZhbG9uLmNvbnRhaW5zKHJvb3QsIG5vZGUpKSB7XG5cdCAgICAgICAgcmV0dXJuIGJveFxuXHQgICAgfVxuXHQgICAgLy9odHRwOi8vaGtvbS5ibG9nMS5mYzIuY29tLz9tb2RlPW0mbm89NzUwIGJvZHnnmoTlgY/np7vph4/mmK/kuI3ljIXlkKttYXJnaW7nmoRcblx0ICAgIC8v5oiR5Lus5Y+v5Lul6YCa6L+HZ2V0Qm91bmRpbmdDbGllbnRSZWN05p2l6I635b6X5YWD57Sg55u45a+55LqOY2xpZW5055qEcmVjdC5cblx0ICAgIC8vaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTM2NDMzLmFzcHhcblx0ICAgIGlmIChub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuXHQgICAgICAgIGJveCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgLy8gQmxhY2tCZXJyeSA1LCBpT1MgMyAob3JpZ2luYWwgaVBob25lKVxuXHQgICAgfVxuXHQgICAgLy9jaHJvbWUvSUU2OiBib2R5LnNjcm9sbFRvcCwgZmlyZWZveC9vdGhlcjogcm9vdC5zY3JvbGxUb3Bcblx0ICAgIHZhciBjbGllbnRUb3AgPSByb290LmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCxcblx0ICAgICAgICAgICAgY2xpZW50TGVmdCA9IHJvb3QuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQsXG5cdCAgICAgICAgICAgIHNjcm9sbFRvcCA9IE1hdGgubWF4KHdpbi5wYWdlWU9mZnNldCB8fCAwLCByb290LnNjcm9sbFRvcCwgYm9keS5zY3JvbGxUb3ApLFxuXHQgICAgICAgICAgICBzY3JvbGxMZWZ0ID0gTWF0aC5tYXgod2luLnBhZ2VYT2Zmc2V0IHx8IDAsIHJvb3Quc2Nyb2xsTGVmdCwgYm9keS5zY3JvbGxMZWZ0KVxuXHQgICAgLy8g5oqK5rua5Yqo6Led56a75Yqg5YiwbGVmdCx0b3DkuK3ljrvjgIJcblx0ICAgIC8vIElF5LiA5Lqb54mI5pys5Lit5Lya6Ieq5Yqo5Li6SFRNTOWFg+e0oOWKoOS4ijJweOeahGJvcmRlcu+8jOaIkeS7rOmcgOimgeWOu+aOieWug1xuXHQgICAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMzNTY0KFZTLjg1KS5hc3B4XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICAgIHRvcDogYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcblx0ICAgICAgICBsZWZ0OiBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0XG5cdCAgICB9XG5cdH1cblxuXHQvL+eUn+aIkGF2YWxvbi5mbi5zY3JvbGxMZWZ0LCBhdmFsb24uZm4uc2Nyb2xsVG9w5pa55rOVXG5cdGF2YWxvbi5lYWNoKHtcblx0ICAgIHNjcm9sbExlZnQ6ICdwYWdlWE9mZnNldCcsXG5cdCAgICBzY3JvbGxUb3A6ICdwYWdlWU9mZnNldCdcblx0fSwgZnVuY3Rpb24gKG1ldGhvZCwgcHJvcCkge1xuXHQgICAgYXZhbG9uLmZuW21ldGhvZF0gPSBmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSB0aGlzWzBdIHx8IHt9LFxuXHQgICAgICAgICAgICAgICAgd2luID0gZ2V0V2luZG93KG5vZGUpLFxuXHQgICAgICAgICAgICAgICAgdG9wID0gbWV0aG9kID09PSAnc2Nyb2xsVG9wJ1xuXHQgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHQgICAgICAgICAgICByZXR1cm4gd2luID8gKHByb3AgaW4gd2luKSA/IHdpbltwcm9wXSA6IHJvb3RbbWV0aG9kXSA6IG5vZGVbbWV0aG9kXVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGlmICh3aW4pIHtcblx0ICAgICAgICAgICAgICAgIHdpbi5zY3JvbGxUbyghdG9wID8gdmFsIDogYXZhbG9uKHdpbikuc2Nyb2xsTGVmdCgpLCB0b3AgPyB2YWwgOiBhdmFsb24od2luKS5zY3JvbGxUb3AoKSlcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIG5vZGVbbWV0aG9kXSA9IHZhbFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9KVxuXG5cdGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG5cdCAgICByZXR1cm4gbm9kZS53aW5kb3cgfHwgbm9kZS5kZWZhdWx0VmlldyB8fCBub2RlLnBhcmVudFdpbmRvdyB8fCBmYWxzZVxuXHR9XG5cbi8qKiovIH0sXG4vKiAyNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0ZnVuY3Rpb24gZ2V0VmFsVHlwZShlbGVtKSB7XG5cdCAgICB2YXIgcmV0ID0gZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKClcblx0ICAgIHJldHVybiByZXQgPT09ICdpbnB1dCcgJiYgL2NoZWNrYm94fHJhZGlvLy50ZXN0KGVsZW0udHlwZSkgPyAnY2hlY2tlZCcgOiByZXRcblx0fVxuXHR2YXIgcm9wdGlvbiA9IC9ePG9wdGlvbig/OlxccytcXHcrKD86XFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzPl0rKSk/KSpcXHMrdmFsdWVbXFxzPV0vaVxuXHR2YXIgdmFsSG9va3MgPSB7XG5cdCAgICAnb3B0aW9uOmdldCc6IGF2YWxvbi5tc2llID8gZnVuY3Rpb24gKG5vZGUpIHtcblx0ICAgICAgICAvL+WcqElFMTHlj4pXM0PvvIzlpoLmnpzmsqHmnInmjIflrpp2YWx1Ze+8jOmCo+S5iG5vZGUudmFsdWXpu5jorqTkuLpub2RlLnRleHTvvIjlrZjlnKh0cmlt5L2c77yJ77yM5L2GSUU5LTEw5YiZ5piv5Y+WaW5uZXJIVE1MKOayoXRyaW3mk43kvZwpXG5cdCAgICAgICAgLy9zcGVjaWZpZWTlubbkuI3lj6/pnaDvvIzlm6DmraTpgJrov4fliIbmnpBvdXRlckhUTUzliKTlrprnlKjmiLfmnInmsqHmnInmmL7npLrlrprkuYl2YWx1ZVxuXHQgICAgICAgIHJldHVybiByb3B0aW9uLnRlc3Qobm9kZS5vdXRlckhUTUwpID8gbm9kZS52YWx1ZSA6IG5vZGUudGV4dC50cmltKClcblx0ICAgIH0gOiBmdW5jdGlvbiAobm9kZSkge1xuXHQgICAgICAgIHJldHVybiBub2RlLnZhbHVlXG5cdCAgICB9LFxuXHQgICAgJ3NlbGVjdDpnZXQnOiBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcblx0ICAgICAgICB2YXIgb3B0aW9uLCBvcHRpb25zID0gbm9kZS5vcHRpb25zLFxuXHQgICAgICAgICAgICAgICAgaW5kZXggPSBub2RlLnNlbGVjdGVkSW5kZXgsXG5cdCAgICAgICAgICAgICAgICBnZXR0ZXIgPSB2YWxIb29rc1snb3B0aW9uOmdldCddLFxuXHQgICAgICAgICAgICAgICAgb25lID0gbm9kZS50eXBlID09PSAnc2VsZWN0LW9uZScgfHwgaW5kZXggPCAwLFxuXHQgICAgICAgICAgICAgICAgdmFsdWVzID0gb25lID8gbnVsbCA6IFtdLFxuXHQgICAgICAgICAgICAgICAgbWF4ID0gb25lID8gaW5kZXggKyAxIDogb3B0aW9ucy5sZW5ndGgsXG5cdCAgICAgICAgICAgICAgICBpID0gaW5kZXggPCAwID8gbWF4IDogb25lID8gaW5kZXggOiAwXG5cdCAgICAgICAgZm9yICg7IGkgPCBtYXg7IGkrKykge1xuXHQgICAgICAgICAgICBvcHRpb24gPSBvcHRpb25zW2ldXG5cdCAgICAgICAgICAgIC8vSUU2LTnlnKhyZXNldOWQjuS4jeS8muaUueWPmHNlbGVjdGVk77yM6ZyA6KaB5pS555SoaSA9PT0gaW5kZXjliKTlrppcblx0ICAgICAgICAgICAgLy/miJHku6zov4fmu6TmiYDmnIlkaXNhYmxlZOeahG9wdGlvbuWFg+e0oO+8jOS9huWcqHNhZmFyaTXkuIvvvIxcblx0ICAgICAgICAgICAgLy/lpoLmnpzorr7nva5vcHRncm91cOS4umRpc2FibGXvvIzpgqPkuYjlhbbmiYDmnInlranlrZDpg71kaXNhYmxlXG5cdCAgICAgICAgICAgIC8v5Zug5q2k5b2T5LiA5Liq5YWD57Sg5Li6ZGlzYWJsZe+8jOmcgOimgeajgOa1i+WFtuaYr+WQpuaYvuW8j+iuvue9ruS6hmRpc2FibGXlj4rlhbbniLboioLngrnnmoRkaXNhYmxl5oOF5Ya1XG5cdCAgICAgICAgICAgIGlmICgob3B0aW9uLnNlbGVjdGVkIHx8IGkgPT09IGluZGV4KSAmJiAhb3B0aW9uLmRpc2FibGVkICYmXG5cdCAgICAgICAgICAgICAgICAgICAgKCFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fCBvcHRpb24ucGFyZW50Tm9kZS50YWdOYW1lICE9PSAnT1BUR1JPVVAnKVxuXHQgICAgICAgICAgICAgICAgICAgICkge1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSBnZXR0ZXIob3B0aW9uKVxuXHQgICAgICAgICAgICAgICAgaWYgKG9uZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgLy/mlLbpm4bmiYDmnIlzZWxlY3RlZOWAvOe7hOaIkOaVsOe7hOi/lOWbnlxuXHQgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHZhbHVlc1xuXHQgICAgfSxcblx0ICAgICdzZWxlY3Q6c2V0JzogZnVuY3Rpb24gKG5vZGUsIHZhbHVlcywgb3B0aW9uU2V0KSB7XG5cdCAgICAgICAgdmFsdWVzID0gW10uY29uY2F0KHZhbHVlcykgLy/lvLrliLbovazmjaLkuLrmlbDnu4Rcblx0ICAgICAgICB2YXIgZ2V0dGVyID0gdmFsSG9va3NbJ29wdGlvbjpnZXQnXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSBub2RlLm9wdGlvbnNbaSsrXTsgKSB7XG5cdCAgICAgICAgICAgIGlmICgoZWwuc2VsZWN0ZWQgPSB2YWx1ZXMuaW5kZXhPZihnZXR0ZXIoZWwpKSA+IC0xKSkge1xuXHQgICAgICAgICAgICAgICAgb3B0aW9uU2V0ID0gdHJ1ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghb3B0aW9uU2V0KSB7XG5cdCAgICAgICAgICAgIG5vZGUuc2VsZWN0ZWRJbmRleCA9IC0xXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0YXZhbG9uLmZuLnZhbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHQgICAgdmFyIG5vZGUgPSB0aGlzWzBdXG5cdCAgICBpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAxKSB7XG5cdCAgICAgICAgdmFyIGdldCA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDBcblx0ICAgICAgICB2YXIgYWNjZXNzID0gZ2V0ID8gJzpnZXQnIDogJzpzZXQnXG5cdCAgICAgICAgdmFyIGZuID0gdmFsSG9va3NbZ2V0VmFsVHlwZShub2RlKSArIGFjY2Vzc11cblx0ICAgICAgICBpZiAoZm4pIHtcblx0ICAgICAgICAgICAgdmFyIHZhbCA9IGZuKG5vZGUsIHZhbHVlKVxuXHQgICAgICAgIH0gZWxzZSBpZiAoZ2V0KSB7XG5cdCAgICAgICAgICAgIHJldHVybiAobm9kZS52YWx1ZSB8fCAnJykucmVwbGFjZSgvXFxyL2csICcnKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBnZXQgPyB2YWwgOiB0aGlzXG5cdH1cblxuLyoqKi8gfSxcbi8qIDI3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuXG5cdHZhciBmaXhDbG9uZU5vZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KVxuXG5cdHZhciByaHRtbCA9IC88fCYjP1xcdys7L1xuXHR2YXIgaHRtbENhY2hlID0gbmV3IENhY2hlKDEyOClcblx0dmFyIHJ4aHRtbCA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9pZ1xuXG5cdGF2YWxvbi5wYXJzZUhUTUwgPSBmdW5jdGlvbiAoaHRtbCkge1xuXHQgICAgdmFyIGZyYWdtZW50ID0gYXZhbG9uLmF2YWxvbkZyYWdtZW50LmNsb25lTm9kZShmYWxzZSlcblx0ICAgIC8v5aSE55CG6Z2e5a2X56ym5LiyXG5cdCAgICBpZiAodHlwZW9mIGh0bWwgIT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgcmV0dXJuIGZyYWdtZW50XG5cdCAgICB9XG5cdCAgICAvL+WkhOeQhumdnkhUTUzlrZfnrKbkuLJcblx0ICAgIGlmICghcmh0bWwudGVzdChodG1sKSkge1xuXHQgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShodG1sKVxuXHQgICAgfVxuXG5cdCAgICBodG1sID0gaHRtbC5yZXBsYWNlKHJ4aHRtbCwgJzwkMT48LyQyPicpLnRyaW0oKVxuXHQgICAgdmFyIGhhc0NhY2hlID0gaHRtbENhY2hlLmdldChodG1sKVxuXHQgICAgaWYgKGhhc0NhY2hlKSB7XG5cdCAgICAgICAgcmV0dXJuIGZpeENsb25lTm9kZShoYXNDYWNoZSlcblx0ICAgIH1cblx0ICAgIHZhciB2bm9kZXMgPSBhdmFsb24ubGV4ZXIoaHRtbClcblx0ICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSB2bm9kZXNbaSsrXTsgKSB7XG5cdCAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYXZhbG9uLnZkb21BZGFwdG9yKGVsLCAndG9ET00nKSlcblx0ICAgIH1cblx0ICAgIGlmIChodG1sLmxlbmd0aCA8IDEwMjQpIHtcblx0ICAgICAgICBodG1sQ2FjaGUucHV0KGh0bWwsIGZpeENsb25lTm9kZShmcmFnbWVudCkpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gZnJhZ21lbnRcblx0fVxuXG5cdGF2YWxvbi5pbm5lckhUTUwgPSBmdW5jdGlvbiAobm9kZSwgaHRtbCkge1xuXHQgICAgaWYgKCFhdmFsb24ubW9kZXJuICYmICghcmNyZWF0ZS50ZXN0KGh0bWwpICYmICFybmVzdC50ZXN0KGh0bWwpKSkge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIG5vZGUuaW5uZXJIVE1MID0gaHRtbFxuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgdmFyIHBhcnNlZCA9IHRoaXMucGFyc2VIVE1MKGh0bWwpXG5cdCAgICB0aGlzLmNsZWFySFRNTChub2RlKS5hcHBlbmRDaGlsZChwYXJzZWQpXG5cdH1cblxuXHR2YXIgcmV1bmVzY2FwZUhUTUwgPSAvJig/OmFtcHxsdHxndHxxdW90fCMzOXwjOTYpOy9nXG5cdHZhciBodG1sVW5lc2NhcGVzID0ge1xuXHQgICAgJyZhbXA7JzogJyYnLFxuXHQgICAgJyZsdDsnOiAnPCcsXG5cdCAgICAnJmd0Oyc6ICc+Jyxcblx0ICAgICcmcXVvdDsnOiAnXCInLFxuXHQgICAgJyYjMzk7JzogXCInXCIsXG5cdCAgICAnJiM5NjsnOiAnYCdcblx0fVxuXHRhdmFsb24udW5lc2NhcGVIVE1MID0gZnVuY3Rpb24gKHN0cmluZykge1xuXHQgICAgdmFyIHN0ciA9ICcnICsgc3RyaW5nXG5cdCAgICByZXR1cm4gc3RyLnJlcGxhY2UocmV1bmVzY2FwZUhUTUwsIGZ1bmN0aW9uIChjKSB7XG5cdCAgICAgICAgcmV0dXJuIGh0bWxVbmVzY2FwZXNbY11cblx0ICAgIH0pXG5cdH1cblxuXHR2YXIgcmVzY2FwZUhUTUwgPSAvW1wiJyY8Pl0vXG5cdC8vaHR0cHM6Ly9naXRodWIuY29tL250aHRyYW4vdmRvbS10by1odG1sXG5cdC8v5bCG5a2X56ym5Liy57uP6L+HIHN0ciDovazkuYnlvpfliLDpgILlkIjlnKjpobXpnaLkuK3mmL7npLrnmoTlhoXlrrksIOS+i+Wmguabv+aNoiA8IOS4uiAmbHQgXG5cdGF2YWxvbi5lc2NhcGVIVE1MID0gZnVuY3Rpb24gKHN0cmluZykge1xuXHQgICAgdmFyIHN0ciA9ICcnICsgc3RyaW5nXG5cdCAgICB2YXIgbWF0Y2ggPSByZXNjYXBlSFRNTC5leGVjKHN0cilcblxuXHQgICAgaWYgKCFtYXRjaCkge1xuXHQgICAgICAgIHJldHVybiBzdHJcblx0ICAgIH1cblxuXHQgICAgdmFyIGVzY2FwZVxuXHQgICAgdmFyIGh0bWwgPSAnJ1xuXHQgICAgdmFyIGluZGV4ID0gMFxuXHQgICAgdmFyIGxhc3RJbmRleCA9IDBcblxuXHQgICAgZm9yIChpbmRleCA9IG1hdGNoLmluZGV4OyBpbmRleCA8IHN0ci5sZW5ndGg7IGluZGV4KyspIHtcblx0ICAgICAgICBzd2l0Y2ggKHN0ci5jaGFyQ29kZUF0KGluZGV4KSkge1xuXHQgICAgICAgICAgICBjYXNlIDM0OiAvLyBcIlxuXHQgICAgICAgICAgICAgICAgZXNjYXBlID0gJyZxdW90Oydcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgMzg6IC8vICZcblx0ICAgICAgICAgICAgICAgIGVzY2FwZSA9ICcmYW1wOydcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgMzk6IC8vICdcblx0ICAgICAgICAgICAgICAgIGVzY2FwZSA9ICcmIzM5Oydcblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgICAgIGNhc2UgNjA6IC8vIDxcblx0ICAgICAgICAgICAgICAgIGVzY2FwZSA9ICcmbHQ7J1xuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSA2MjogLy8gPlxuXHQgICAgICAgICAgICAgICAgZXNjYXBlID0gJyZndDsnXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAobGFzdEluZGV4ICE9PSBpbmRleCkge1xuXHQgICAgICAgICAgICBodG1sICs9IHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleClcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBsYXN0SW5kZXggPSBpbmRleCArIDFcblx0ICAgICAgICBodG1sICs9IGVzY2FwZVxuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gbGFzdEluZGV4ICE9PSBpbmRleFxuXHQgICAgICAgICAgICA/IGh0bWwgKyBzdHIuc3Vic3RyaW5nKGxhc3RJbmRleCwgaW5kZXgpXG5cdCAgICAgICAgICAgIDogaHRtbFxuXHR9XG5cblx0YXZhbG9uLmNsZWFySFRNTCA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdCAgICBub2RlLnRleHRDb250ZW50ID0gJydcblx0ICAgIHdoaWxlIChub2RlLmxhc3RDaGlsZCkge1xuXHQgICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5sYXN0Q2hpbGQpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gbm9kZVxuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDI4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vcnNtcy9qcy1scnVcblx0ZnVuY3Rpb24gTFJVKG1heExlbmd0aCkge1xuXHQgICAgdGhpcy5zaXplID0gMFxuXHQgICAgdGhpcy5saW1pdCA9IG1heExlbmd0aFxuXHQgICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gdm9pZCAwXG5cdCAgICB0aGlzLl9rZXltYXAgPSB7fVxuXHR9XG5cblx0dmFyIHAgPSBMUlUucHJvdG90eXBlXG5cblx0cC5wdXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHQgICAgdmFyIGVudHJ5ID0ge1xuXHQgICAgICAgIGtleToga2V5LFxuXHQgICAgICAgIHZhbHVlOiB2YWx1ZVxuXHQgICAgfVxuXHQgICAgdGhpcy5fa2V5bWFwW2tleV0gPSBlbnRyeVxuXHQgICAgaWYgKHRoaXMudGFpbCkge1xuXHQgICAgICAgIHRoaXMudGFpbC5uZXdlciA9IGVudHJ5XG5cdCAgICAgICAgZW50cnkub2xkZXIgPSB0aGlzLnRhaWxcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5oZWFkID0gZW50cnlcblx0ICAgIH1cblx0ICAgIHRoaXMudGFpbCA9IGVudHJ5XG5cdCAgICBpZiAodGhpcy5zaXplID09PSB0aGlzLmxpbWl0KSB7XG5cdCAgICAgICAgdGhpcy5zaGlmdCgpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuc2l6ZSsrXG5cdCAgICB9XG5cdCAgICByZXR1cm4gdmFsdWVcblx0fVxuXG5cdHAuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICB2YXIgZW50cnkgPSB0aGlzLmhlYWRcblx0ICAgIGlmIChlbnRyeSkge1xuXHQgICAgICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5uZXdlclxuXHQgICAgICAgIHRoaXMuaGVhZC5vbGRlciA9XG5cdCAgICAgICAgICAgICAgICBlbnRyeS5uZXdlciA9XG5cdCAgICAgICAgICAgICAgICBlbnRyeS5vbGRlciA9XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9rZXltYXBbZW50cnkua2V5XSA9IHZvaWQgMFxuXHQgICAgICAgIGRlbGV0ZSB0aGlzLl9rZXltYXBbZW50cnkua2V5XSAvLyMxMDI5XG5cdCAgICB9XG5cdH1cblx0cC5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG5cdCAgICB2YXIgZW50cnkgPSB0aGlzLl9rZXltYXBba2V5XVxuXHQgICAgaWYgKGVudHJ5ID09PSB2b2lkIDApXG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICBpZiAoZW50cnkgPT09IHRoaXMudGFpbCkge1xuXHQgICAgICAgIHJldHVybiAgZW50cnkudmFsdWVcblx0ICAgIH1cblx0ICAgIC8vIEhFQUQtLS0tLS0tLS0tLS0tLVRBSUxcblx0ICAgIC8vICAgPC5vbGRlciAgIC5uZXdlcj5cblx0ICAgIC8vICA8LS0tIGFkZCBkaXJlY3Rpb24gLS1cblx0ICAgIC8vICAgQSAgQiAgQyAgPEQ+ICBFXG5cdCAgICBpZiAoZW50cnkubmV3ZXIpIHtcblx0ICAgICAgICBpZiAoZW50cnkgPT09IHRoaXMuaGVhZCkge1xuXHQgICAgICAgICAgICB0aGlzLmhlYWQgPSBlbnRyeS5uZXdlclxuXHQgICAgICAgIH1cblx0ICAgICAgICBlbnRyeS5uZXdlci5vbGRlciA9IGVudHJ5Lm9sZGVyIC8vIEMgPC0tIEUuXG5cdCAgICB9XG5cdCAgICBpZiAoZW50cnkub2xkZXIpIHtcblx0ICAgICAgICBlbnRyeS5vbGRlci5uZXdlciA9IGVudHJ5Lm5ld2VyIC8vIEMuIC0tPiBFXG5cdCAgICB9XG5cdCAgICBlbnRyeS5uZXdlciA9IHZvaWQgMCAvLyBEIC0teFxuXHQgICAgZW50cnkub2xkZXIgPSB0aGlzLnRhaWwgLy8gRC4gLS0+IEVcblx0ICAgIGlmICh0aGlzLnRhaWwpIHtcblx0ICAgICAgICB0aGlzLnRhaWwubmV3ZXIgPSBlbnRyeSAvLyBFLiA8LS0gRFxuXHQgICAgfVxuXHQgICAgdGhpcy50YWlsID0gZW50cnlcblx0ICAgIHJldHVybiBlbnRyeS52YWx1ZVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBMUlVcblxuXG4vKioqLyB9LFxuLyogMjkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdHZhciByY2hlY2tlZFR5cGUgPSAvcmFkaW98Y2hlY2tib3gvXG5cblx0ZnVuY3Rpb24gZml4KGRlc3QsIHNyYykge1xuXHQgICAgaWYgKGRlc3Qubm9kZVR5cGUgIT09IDEpIHtcblx0ICAgICAgICByZXR1cm5cblx0ICAgIH1cblx0ICAgIHZhciBub2RlTmFtZSA9IGRlc3Qubm9kZU5hbWUudG9Mb3dlckNhc2UoKVxuXHQgICAgaWYgKG5vZGVOYW1lID09PSAnb2JqZWN0Jykge1xuXHQgICAgICAgIGlmIChkZXN0LnBhcmVudE5vZGUpIHtcblx0ICAgICAgICAgICAgZGVzdC5vdXRlckhUTUwgPSBzcmMub3V0ZXJIVE1MXG5cdCAgICAgICAgfVxuXG5cdCAgICB9IGVsc2UgaWYgKG5vZGVOYW1lID09PSAnaW5wdXQnICYmIHJjaGVja2VkVHlwZS50ZXN0KHNyYy50eXBlKSkge1xuXG5cdCAgICAgICAgZGVzdC5kZWZhdWx0Q2hlY2tlZCA9IGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkXG5cblx0ICAgICAgICBpZiAoZGVzdC52YWx1ZSAhPT0gc3JjLnZhbHVlKSB7XG5cdCAgICAgICAgICAgIGRlc3QudmFsdWUgPSBzcmMudmFsdWVcblx0ICAgICAgICB9XG5cblx0ICAgIH0gZWxzZSBpZiAobm9kZU5hbWUgPT09ICdvcHRpb24nKSB7XG5cdCAgICAgICAgZGVzdC5kZWZhdWx0U2VsZWN0ZWQgPSBkZXN0LnNlbGVjdGVkID0gc3JjLmRlZmF1bHRTZWxlY3RlZFxuXHQgICAgfSBlbHNlIGlmIChub2RlTmFtZSA9PT0gJ2lucHV0JyB8fCBub2RlTmFtZSA9PT0gJ3RleHRhcmVhJykge1xuXHQgICAgICAgIGRlc3QuZGVmYXVsdFZhbHVlID0gc3JjLmRlZmF1bHRWYWx1ZVxuXHQgICAgfVxuXHR9XG5cblxuXHRmdW5jdGlvbiBnZXRBbGwoY29udGV4dCkge1xuXHQgICAgcmV0dXJuIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiID9cblx0ICAgICAgICAgICAgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikgOlxuXHQgICAgICAgICAgICB0eXBlb2YgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsICE9PSBcInVuZGVmaW5lZFwiID9cblx0ICAgICAgICAgICAgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSA6IFtdXG5cdH1cblxuXHRmdW5jdGlvbiBmaXhDbG9uZU5vZGUoc3JjKSB7XG5cdCAgICB2YXIgdGFyZ2V0ID0gc3JjLmNsb25lTm9kZSh0cnVlKVxuXHQgICAgaWYgKGF2YWxvbi5tb2Rlcm4pXG5cdCAgICAgICAgcmV0dXJuIHRhcmdldFxuXHQgICAgdmFyIHQgPSBnZXRBbGwodGFyZ2V0KVxuXHQgICAgdmFyIHMgPSBnZXRBbGwoc3JjKVxuXHQgICAgYXZhbG9uLmVhY2gocywgZnVuY3Rpb24gKGkpIHtcblx0ICAgICAgICBmaXgodFtpXSwgc1tpXSlcblx0ICAgIH0pXG5cdCAgICByZXR1cm4gdGFyZ2V0XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZpeENsb25lTm9kZVxuXG4vKioqLyB9LFxuLyogMzAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBkb2N1bWVudCA9IGF2YWxvbi5kb2N1bWVudFxuXHR2YXIgd2luZG93ID0gYXZhbG9uLndpbmRvd1xuXHR2YXIgcm9vdCA9IGF2YWxvbi5yb290XG5cdHZhciBXM0MgPSBhdmFsb24ubW9kZXJuXG5cblx0dmFyIGdldFNob3J0SUQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLmdldFNob3J0SURcblx0Ly9odHRwOi8vd3d3LmZlaWVzb2Z0LmNvbS9odG1sL2V2ZW50cy5odG1sXG5cdC8vaHR0cDovL3NlZ21lbnRmYXVsdC5jb20vcS8xMDEwMDAwMDAwNjg3OTc3L2EtMTAyMDAwMDAwMDY4ODc1N1xuXHR2YXIgY2FuQnViYmxlVXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKVxuXG5cdGlmICghVzNDKSB7XG5cdCAgICBkZWxldGUgY2FuQnViYmxlVXAuY2hhbmdlXG5cdCAgICBkZWxldGUgY2FuQnViYmxlVXAuc2VsZWN0XG5cdH1cblxuXHR2YXIgZXZlbnRIb29rcyA9IGF2YWxvbi5ldmVudEhvb2tzXG5cdC8q57uR5a6a5LqL5Lu2Ki9cblx0YXZhbG9uLmJpbmQgPSBmdW5jdGlvbiAoZWxlbSwgdHlwZSwgZm4pIHtcblx0ICAgIGlmIChlbGVtLm5vZGVUeXBlID09PSAxKSB7XG5cdCAgICAgICAgdmFyIHZhbHVlID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2F2YWxvbi1ldmVudHMnKSB8fCAnJ1xuXHQgICAgICAgIC8v5aaC5p6c5piv5L2/55SobXMtb24tKue7keWumueahOWbnuiwgyzlhbZ1dWlk5qC85byP5Li6ZTEyMTIyMzI0LFxuXHQgICAgICAgIC8v5aaC5p6c5piv5L2/55SoYmluZOaWueazlee7keWumueahOWbnuiwgyzlhbZ1dWlk5qC85byP5Li6XzEyXG5cdCAgICAgICAgdmFyIHV1aWQgPSBnZXRTaG9ydElEKGZuKVxuXHQgICAgICAgIHZhciBob29rID0gZXZlbnRIb29rc1t0eXBlXVxuXHQgICAgICAgIGlmIChob29rKSB7XG5cdCAgICAgICAgICAgIHR5cGUgPSBob29rLnR5cGUgfHwgdHlwZVxuXHQgICAgICAgICAgICBpZiAoaG9vay5maXgpIHtcblx0ICAgICAgICAgICAgICAgIGZuID0gaG9vay5maXgoZWxlbSwgZm4pXG5cdCAgICAgICAgICAgICAgICBmbi51dWlkID0gdXVpZFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBrZXkgPSB0eXBlICsgJzonICsgdXVpZFxuXHQgICAgICAgIGF2YWxvbi5ldmVudExpc3RlbmVyc1tmbi51dWlkXSA9IGZuXG5cdCAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YodHlwZSArICc6JykgPT09IC0xKSB7Ly/lkIzkuIDnp43kuovku7blj6rnu5HlrprkuIDmrKFcblx0ICAgICAgICAgICAgaWYgKGNhbkJ1YmJsZVVwW3R5cGVdIHx8IChhdmFsb24ubW9kZXJuICYmIGZvY3VzQmx1clt0eXBlXSkpIHtcblx0ICAgICAgICAgICAgICAgIGRlbGVnYXRlRXZlbnQodHlwZSlcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIG5hdGl2ZUJpbmQoZWxlbSwgdHlwZSwgZGlzcGF0Y2gpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGtleXMgPSB2YWx1ZS5zcGxpdCgnLCcpXG5cdCAgICAgICAgaWYgKGtleXNbMF0gPT09ICcnKSB7XG5cdCAgICAgICAgICAgIGtleXMuc2hpZnQoKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoa2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG5cdCAgICAgICAgICAgIGtleXMucHVzaChrZXkpXG5cdCAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdhdmFsb24tZXZlbnRzJywga2V5cy5qb2luKCcsJykpXG5cdCAgICAgICAgICAgIC8v5bCG5Luk54mM5pS+6L+bYXZhbG9uLWV2ZW50c+WxnuaAp+S4rVxuXHQgICAgICAgIH1cblxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBuYXRpdmVCaW5kKGVsZW0sIHR5cGUsIGZuKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGZuIC8v5YW85a655LmL5YmN55qE54mI5pysXG5cdH1cblxuXHRhdmFsb24udW5iaW5kID0gZnVuY3Rpb24gKGVsZW0sIHR5cGUsIGZuKSB7XG5cdCAgICBpZiAoZWxlbS5ub2RlVHlwZSA9PT0gMSkge1xuXHQgICAgICAgIHZhciB2YWx1ZSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdhdmFsb24tZXZlbnRzJykgfHwgJydcblx0ICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgY2FzZSAxOlxuXHQgICAgICAgICAgICAgICAgbmF0aXZlVW5CaW5kKGVsZW0sIHR5cGUsIGRpc3BhdGNoKVxuXHQgICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2F2YWxvbi1ldmVudHMnKVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAyOlxuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnLCcpLmZpbHRlcihmdW5jdGlvbiAoc3RyKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKHR5cGUgKyAnOicpID09PSAtMVxuXHQgICAgICAgICAgICAgICAgfSkuam9pbignLCcpXG5cdCAgICAgICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZSgnYXZhbG9uLWV2ZW50cycsIHZhbHVlKVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIHZhciBzZWFyY2ggPSB0eXBlICsgJzonICsgZm4udXVpZFxuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnLCcpLmZpbHRlcihmdW5jdGlvbiAoc3RyKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ciAhPT0gc2VhcmNoXG5cdCAgICAgICAgICAgICAgICB9KS5qb2luKCcsJylcblx0ICAgICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdhdmFsb24tZXZlbnRzJywgdmFsdWUpXG5cdCAgICAgICAgICAgICAgICBkZWxldGUgYXZhbG9uLmV2ZW50TGlzdGVuZXJzW2ZuLnV1aWRdXG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgbmF0aXZlVW5CaW5kKGVsZW0sIHR5cGUsIGZuKVxuXHQgICAgfVxuXHR9XG5cblx0dmFyIHR5cGVSZWdFeHAgPSB7fVxuXHRmdW5jdGlvbiBjb2xsZWN0SGFuZGxlcnMoZWxlbSwgdHlwZSwgaGFuZGxlcnMpIHtcblx0ICAgIHZhciB2YWx1ZSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdhdmFsb24tZXZlbnRzJylcblx0ICAgIGlmICh2YWx1ZSAmJiAoZWxlbS5kaXNhYmxlZCAhPT0gdHJ1ZSB8fCB0eXBlICE9PSAnY2xpY2snKSkge1xuXHQgICAgICAgIHZhciB1dWlkcyA9IFtdXG5cdCAgICAgICAgdmFyIHJlZyA9IHR5cGVSZWdFeHBbdHlwZV0gfHwgKHR5cGVSZWdFeHBbdHlwZV0gPSBuZXcgUmVnRXhwKFwiXFxcXGJcIiArIHR5cGUgKyAnXFxcXDooW14sXFxcXHNdKyknLCAnZycpKVxuXHQgICAgICAgIHZhbHVlLnJlcGxhY2UocmVnLCBmdW5jdGlvbiAoYSwgYikge1xuXHQgICAgICAgICAgICB1dWlkcy5wdXNoKGIpXG5cdCAgICAgICAgICAgIHJldHVybiBhXG5cdCAgICAgICAgfSlcblx0ICAgICAgICBpZiAodXVpZHMubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIGhhbmRsZXJzLnB1c2goe1xuXHQgICAgICAgICAgICAgICAgZWxlbTogZWxlbSxcblx0ICAgICAgICAgICAgICAgIHV1aWRzOiB1dWlkc1xuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGVcblx0ICAgIHZhciBnID0gYXZhbG9uLmdlc3R1cmVFdmVudHMgfHwge31cblx0ICAgIGlmIChlbGVtICYmIGVsZW0uZ2V0QXR0cmlidXRlICYmIChjYW5CdWJibGVVcFt0eXBlXSB8fCBnW3R5cGVdKSkge1xuXHQgICAgICAgIGNvbGxlY3RIYW5kbGVycyhlbGVtLCB0eXBlLCBoYW5kbGVycylcblx0ICAgIH1cblxuXHR9XG5cdHZhciByaGFuZGxlSGFzVm0gPSAvXmUvXG5cdHZhciBzdG9wSW1tZWRpYXRlID0gZmFsc2Vcblx0ZnVuY3Rpb24gZGlzcGF0Y2goZXZlbnQpIHtcblx0ICAgIGV2ZW50ID0gbmV3IGF2RXZlbnQoZXZlbnQpXG5cdCAgICB2YXIgdHlwZSA9IGV2ZW50LnR5cGVcblx0ICAgIHZhciBlbGVtID0gZXZlbnQudGFyZ2V0XG5cdCAgICB2YXIgaGFuZGxlcnMgPSBbXVxuXHQgICAgY29sbGVjdEhhbmRsZXJzKGVsZW0sIHR5cGUsIGhhbmRsZXJzKVxuXHQgICAgdmFyIGkgPSAwLCBqLCB1dWlkLCBoYW5kbGVyXG5cdCAgICB3aGlsZSAoKGhhbmRsZXIgPSBoYW5kbGVyc1tpKytdKSAmJiAhZXZlbnQuY2FuY2VsQnViYmxlKSB7XG5cdCAgICAgICAgdmFyIGhvc3QgPSBldmVudC5jdXJyZW50VGFyZ2V0ID0gaGFuZGxlci5lbGVtXG5cdCAgICAgICAgaiA9IDBcblx0ICAgICAgICB3aGlsZSAoKHV1aWQgPSBoYW5kbGVyLnV1aWRzWyBqKysgXSkpIHtcblx0ICAgICAgICAgICAgaWYgKHN0b3BJbW1lZGlhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHN0b3BJbW1lZGlhdGUgPSBmYWxzZVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgZm4gPSBhdmFsb24uZXZlbnRMaXN0ZW5lcnNbdXVpZF1cblx0ICAgICAgICAgICAgaWYgKGZuKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgdm0gPSByaGFuZGxlSGFzVm0udGVzdCh1dWlkKSA/IGhhbmRsZXIuZWxlbS5fbXNfY29udGV4dF8gOiAwXG5cdCAgICAgICAgICAgICAgICBpZiAodm0gJiYgdm0uJGhhc2hjb2RlID09PSBmYWxzZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdmFsb24udW5iaW5kKGVsZW0sIHR5cGUsIGZuKVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgcmV0ID0gZm4uY2FsbCh2bSB8fCBlbGVtLCBldmVudCwgaG9zdC5fbXNfbG9jYWwpXG5cblx0ICAgICAgICAgICAgICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHR2YXIgZm9jdXNCbHVyID0ge1xuXHQgICAgZm9jdXM6IHRydWUsXG5cdCAgICBibHVyOiB0cnVlXG5cdH1cblx0dmFyIG5hdGl2ZUJpbmQgPSBXM0MgPyBmdW5jdGlvbiAoZWwsIHR5cGUsIGZuLCBjYXB0dXJlKSB7XG5cdCAgICBlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBjYXB0dXJlKVxuXHR9IDogZnVuY3Rpb24gKGVsLCB0eXBlLCBmbikge1xuXHQgICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGZuKVxuXHR9XG5cdHZhciBuYXRpdmVVbkJpbmQgPSBXM0MgPyBmdW5jdGlvbiAoZWwsIHR5cGUsIGZuKSB7XG5cdCAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuKVxuXHR9IDogZnVuY3Rpb24gKGVsLCB0eXBlLCBmbikge1xuXHQgICAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGZuKVxuXHR9XG5cblx0ZnVuY3Rpb24gZGVsZWdhdGVFdmVudCh0eXBlKSB7XG5cdCAgICB2YXIgdmFsdWUgPSByb290LmdldEF0dHJpYnV0ZSgnZGVsZWdhdGUtZXZlbnRzJykgfHwgJydcblx0ICAgIGlmICh2YWx1ZS5pbmRleE9mKHR5cGUpID09PSAtMSkge1xuXHQgICAgICAgIHZhciBhcnIgPSB2YWx1ZS5tYXRjaChhdmFsb24ucndvcmQpIHx8IFtdXG5cdCAgICAgICAgYXJyLnB1c2godHlwZSlcblx0ICAgICAgICByb290LnNldEF0dHJpYnV0ZSgnZGVsZWdhdGUtZXZlbnRzJywgYXJyLmpvaW4oJywnKSlcblx0ICAgICAgICBuYXRpdmVCaW5kKHJvb3QsIHR5cGUsIGRpc3BhdGNoLCAhIWZvY3VzQmx1clt0eXBlXSlcblx0ICAgIH1cblx0fVxuXG5cdGF2YWxvbi5maXJlRG9tID0gZnVuY3Rpb24gKGVsZW0sIHR5cGUsIG9wdHMpIHtcblx0ICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuXHQgICAgICAgIHZhciBoYWNrRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnRzJylcblx0ICAgICAgICBoYWNrRXZlbnQuaW5pdEV2ZW50KHR5cGUsIHRydWUsIHRydWUsIG9wdHMpXG5cdCAgICAgICAgYXZhbG9uLnNoYWRvd0NvcHkoaGFja0V2ZW50LCBvcHRzKVxuXG5cdCAgICAgICAgZWxlbS5kaXNwYXRjaEV2ZW50KGhhY2tFdmVudClcblx0ICAgIH0gZWxzZSBpZiAocm9vdC5jb250YWlucyhlbGVtKSkgey8vSUU2LTjop6blj5Hkuovku7blv4Xpobvkv53or4HlnKhET03moJHkuK0s5ZCm5YiZ5oqlJ1NDUklQVDE2Mzg5OiDmnKrmjIfmmI7nmoTplJnor68nXG5cdCAgICAgICAgaGFja0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKVxuXHQgICAgICAgIGF2YWxvbi5zaGFkb3dDb3B5KGhhY2tFdmVudCwgb3B0cylcblx0ICAgICAgICBlbGVtLmZpcmVFdmVudCgnb24nICsgdHlwZSwgaGFja0V2ZW50KVxuXHQgICAgfVxuXHR9XG5cblx0dmFyIHJtb3VzZUV2ZW50ID0gL14oPzptb3VzZXxjb250ZXh0bWVudXxkcmFnKXxjbGljay9cblx0dmFyIHJjb25zdGFudCA9IC9eW0EtWl9dKyQvXG5cdGZ1bmN0aW9uIGF2RXZlbnQoZXZlbnQpIHtcblx0ICAgIGlmIChldmVudC5vcmlnaW5hbEV2ZW50KSB7XG5cdCAgICAgICAgcmV0dXJuIHRoaXNcblx0ICAgIH1cblx0ICAgIGZvciAodmFyIGkgaW4gZXZlbnQpIHtcblx0ICAgICAgICBpZiAoIXJjb25zdGFudC50ZXN0KGkpICYmIHR5cGVvZiBldmVudFtpXSAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICB0aGlzW2ldID0gZXZlbnRbaV1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBpZiAoIXRoaXMudGFyZ2V0KSB7XG5cdCAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC5zcmNFbGVtZW50XG5cdCAgICB9XG5cdCAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXRcblx0ICAgIGlmICh0aGlzLndoaWNoID09IG51bGwgJiYgZXZlbnQudHlwZS5pbmRleE9mKCdrZXknKSA9PT0gMCkge1xuXHQgICAgICAgIHRoaXMud2hpY2ggPSBldmVudC5jaGFyQ29kZSAhPSBudWxsID8gZXZlbnQuY2hhckNvZGUgOiBldmVudC5rZXlDb2RlXG5cdCAgICB9IGVsc2UgaWYgKHJtb3VzZUV2ZW50LnRlc3QoZXZlbnQudHlwZSkgJiYgISgncGFnZVgnIGluIHRoaXMpKSB7XG5cdCAgICAgICAgdmFyIGRvYyA9IHRhcmdldC5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50XG5cdCAgICAgICAgdmFyIGJveCA9IGRvYy5jb21wYXRNb2RlID09PSAnQmFja0NvbXBhdCcgPyBkb2MuYm9keSA6IGRvYy5kb2N1bWVudEVsZW1lbnRcblx0ICAgICAgICB0aGlzLnBhZ2VYID0gZXZlbnQuY2xpZW50WCArIChib3guc2Nyb2xsTGVmdCA+PiAwKSAtIChib3guY2xpZW50TGVmdCA+PiAwKVxuXHQgICAgICAgIHRoaXMucGFnZVkgPSBldmVudC5jbGllbnRZICsgKGJveC5zY3JvbGxUb3AgPj4gMCkgLSAoYm94LmNsaWVudFRvcCA+PiAwKVxuXHQgICAgICAgIHRoaXMud2hlZWxEZWx0YVkgPSB0aGlzLndoZWVsRGVsdGFcblx0ICAgICAgICB0aGlzLndoZWVsRGVsdGFYID0gMFxuXHQgICAgfVxuXHQgICAgdGhpcy50aW1lU3RhbXAgPSBuZXcgRGF0ZSgpIC0gMFxuXHQgICAgdGhpcy5vcmlnaW5hbEV2ZW50ID0gZXZlbnRcblx0fVxuXHRhdkV2ZW50LnByb3RvdHlwZSA9IHtcblx0ICAgIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQgfHwge31cblx0ICAgICAgICBlLnJldHVyblZhbHVlID0gdGhpcy5yZXR1cm5WYWx1ZSA9IGZhbHNlXG5cdCAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHtcblx0ICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50IHx8IHt9XG5cdCAgICAgICAgZS5jYW5jZWxCdWJibGUgPSB0aGlzLmNhbmNlbEJ1YmJsZSA9IHRydWVcblx0ICAgICAgICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHtcblx0ICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBzdG9wSW1tZWRpYXRlID0gdHJ1ZTtcblx0ICAgICAgICB0aGlzLnN0b3BQcm9wYWdhdGlvbigpXG5cdCAgICB9LFxuXHQgICAgdG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gJ1tvYmplY3QgRXZlbnRdJy8vIzE2MTlcblx0ICAgIH1cblx0fVxuXG5cdC8v6ZKI5a+5ZmlyZWZveCwgY2hyb21l5L+u5q2jbW91c2VlbnRlciwgbW91c2VsZWF2ZVxuXHRpZiAoISgnb25tb3VzZWVudGVyJyBpbiByb290KSkge1xuXHQgICAgYXZhbG9uLmVhY2goe1xuXHQgICAgICAgIG1vdXNlZW50ZXI6ICdtb3VzZW92ZXInLFxuXHQgICAgICAgIG1vdXNlbGVhdmU6ICdtb3VzZW91dCdcblx0ICAgIH0sIGZ1bmN0aW9uIChvcmlnVHlwZSwgZml4VHlwZSkge1xuXHQgICAgICAgIGV2ZW50SG9va3Nbb3JpZ1R5cGVdID0ge1xuXHQgICAgICAgICAgICB0eXBlOiBmaXhUeXBlLFxuXHQgICAgICAgICAgICBmaXg6IGZ1bmN0aW9uIChlbGVtLCBmbikge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBlLnJlbGF0ZWRUYXJnZXRcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoIXQgfHwgKHQgIT09IGVsZW0gJiYgIShlbGVtLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKHQpICYgMTYpKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZS50eXBlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGUudHlwZSA9IG9yaWdUeXBlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSlcblx0fVxuXHQvL+mSiOWvuUlFOSssIHczY+S/ruato2FuaW1hdGlvbmVuZFxuXHRhdmFsb24uZWFjaCh7XG5cdCAgICBBbmltYXRpb25FdmVudDogJ2FuaW1hdGlvbmVuZCcsXG5cdCAgICBXZWJLaXRBbmltYXRpb25FdmVudDogJ3dlYmtpdEFuaW1hdGlvbkVuZCdcblx0fSwgZnVuY3Rpb24gKGNvbnN0cnVjdCwgZml4VHlwZSkge1xuXHQgICAgaWYgKHdpbmRvd1tjb25zdHJ1Y3RdICYmICFldmVudEhvb2tzLmFuaW1hdGlvbmVuZCkge1xuXHQgICAgICAgIGV2ZW50SG9va3MuYW5pbWF0aW9uZW5kID0ge1xuXHQgICAgICAgICAgICB0eXBlOiBmaXhUeXBlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9KVxuXHQvL+mSiOWvuUlFNi045L+u5q2jaW5wdXRcblx0aWYgKCEoJ29uaW5wdXQnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykpKSB7XG5cdCAgICBldmVudEhvb2tzLmlucHV0ID0ge1xuXHQgICAgICAgIHR5cGU6ICdwcm9wZXJ0eWNoYW5nZScsXG5cdCAgICAgICAgZml4OiBmdW5jdGlvbiAoZWxlbSwgZm4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoZS5wcm9wZXJ0eU5hbWUgPT09ICd2YWx1ZScpIHtcblx0ICAgICAgICAgICAgICAgICAgICBlLnR5cGUgPSAnaW5wdXQnXG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXHRpZiAoZG9jdW1lbnQub25tb3VzZXdoZWVsID09PSB2b2lkIDApIHtcblx0ICAgIC8qIElFNi0xMSBjaHJvbWUgbW91c2V3aGVlbCB3aGVlbERldGxhIOS4iyAtMTIwIOS4iiAxMjBcblx0ICAgICBmaXJlZm94IERPTU1vdXNlU2Nyb2xsIGRldGFpbCDkuIszIOS4ii0zXG5cdCAgICAgZmlyZWZveCB3aGVlbCBkZXRsYVkg5LiLMyDkuIotM1xuXHQgICAgIElFOS0xMSB3aGVlbCBkZWx0YVkg5LiLNDAg5LiKLTQwXG5cdCAgICAgY2hyb21lIHdoZWVsIGRlbHRhWSDkuIsxMDAg5LiKLTEwMCAqL1xuXHQgICAgdmFyIGZpeFdoZWVsVHlwZSA9IGRvY3VtZW50Lm9ud2hlZWwgIT09IHZvaWQgMCA/ICd3aGVlbCcgOiAnRE9NTW91c2VTY3JvbGwnXG5cdCAgICB2YXIgZml4V2hlZWxEZWx0YSA9IGZpeFdoZWVsVHlwZSA9PT0gJ3doZWVsJyA/ICdkZWx0YVknIDogJ2RldGFpbCdcblx0ICAgIGV2ZW50SG9va3MubW91c2V3aGVlbCA9IHtcblx0ICAgICAgICB0eXBlOiBmaXhXaGVlbFR5cGUsXG5cdCAgICAgICAgZml4OiBmdW5jdGlvbiAoZWxlbSwgZm4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgZGVsdGEgPSBlW2ZpeFdoZWVsRGVsdGFdID4gMCA/IC0xMjAgOiAxMjBcblx0ICAgICAgICAgICAgICAgIGUud2hlZWxEZWx0YSA9IH5+ZWxlbS5fbXNfd2hlZWxfICsgZGVsdGFcblx0ICAgICAgICAgICAgICAgIGVsZW0uX21zX3doZWVsXyA9IGUud2hlZWxEZWx0YVkgPSBlLndoZWVsRGVsdGFcblxuXHQgICAgICAgICAgICAgICAgZS53aGVlbERlbHRhWCA9IDBcblx0ICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcblx0ICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgJ3R5cGUnLCB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnbW91c2V3aGVlbCdcblx0ICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdGF2YWxvbi5mbi5iaW5kID0gZnVuY3Rpb24gKHR5cGUsIGZuLCBwaGFzZSkge1xuXHQgICAgaWYgKHRoaXNbMF0pIHsgLy/mraTmlrnms5XkuI3kvJrpk75cblx0ICAgICAgICByZXR1cm4gYXZhbG9uLmJpbmQodGhpc1swXSwgdHlwZSwgZm4sIHBoYXNlKVxuXHQgICAgfVxuXHR9XG5cblx0YXZhbG9uLmZuLnVuYmluZCA9IGZ1bmN0aW9uICh0eXBlLCBmbiwgcGhhc2UpIHtcblx0ICAgIGlmICh0aGlzWzBdKSB7XG5cdCAgICAgICAgYXZhbG9uLnVuYmluZCh0aGlzWzBdLCB0eXBlLCBmbiwgcGhhc2UpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpc1xuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDMxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvL2h0dHA6Ly93d3cuZmVpZXNvZnQuY29tL2h0bWwvZXZlbnRzLmh0bWxcblx0Ly9odHRwOi8vc2VnbWVudGZhdWx0LmNvbS9xLzEwMTAwMDAwMDA2ODc5NzcvYS0xMDIwMDAwMDAwNjg4NzU3XG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgY2xpY2s6IHRydWUsXG5cdCAgICBkYmxjbGljazogdHJ1ZSxcblx0ICAgIGtleWRvd246IHRydWUsXG5cdCAgICBrZXlwcmVzczogdHJ1ZSxcblx0ICAgIGtleXVwOiB0cnVlLFxuXHQgICAgbW91c2Vkb3duOiB0cnVlLFxuXHQgICAgbW91c2Vtb3ZlOiB0cnVlLFxuXHQgICAgbW91c2V1cDogdHJ1ZSxcblx0ICAgIG1vdXNlb3ZlcjogdHJ1ZSxcblx0ICAgIG1vdXNlb3V0OiB0cnVlLFxuXHQgICAgd2hlZWw6IHRydWUsXG5cdCAgICBtb3VzZXdoZWVsOiB0cnVlLFxuXHQgICAgaW5wdXQ6IHRydWUsXG5cdCAgICBjaGFuZ2U6IHRydWUsXG5cdCAgICBiZWZvcmVpbnB1dDogdHJ1ZSxcblx0ICAgIGNvbXBvc2l0aW9uc3RhcnQ6IHRydWUsXG5cdCAgICBjb21wb3NpdGlvbnVwZGF0ZTogdHJ1ZSxcblx0ICAgIGNvbXBvc2l0aW9uZW5kOiB0cnVlLFxuXHQgICAgc2VsZWN0OiB0cnVlLFxuXHQgICAgLy9odHRwOi8vYmxvZy5jc2RuLm5ldC9sZWVfbWFnbnVtL2FydGljbGUvZGV0YWlscy8xNzc2MTQ0MVxuXHQgICAgY3V0OiB0cnVlLFxuXHQgICAgY29weTogdHJ1ZSxcblx0ICAgIHBhc3RlOiB0cnVlLFxuXHQgICAgYmVmb3JlY3V0OiB0cnVlLFxuXHQgICAgYmVmb3JlY29weTogdHJ1ZSxcblx0ICAgIGJlZm9yZXBhc3RlOiB0cnVlLFxuXHQgICAgZm9jdXNpbjogdHJ1ZSxcblx0ICAgIGZvY3Vzb3V0OiB0cnVlLFxuXHQgICAgRE9NRm9jdXNJbjogdHJ1ZSxcblx0ICAgIERPTUZvY3VzT3V0OiB0cnVlLFxuXHQgICAgRE9NQWN0aXZhdGU6IHRydWUsXG5cdCAgICBkcmFnZW5kOiB0cnVlLFxuXHQgICAgZGF0YXNldGNoYW5nZWQ6IHRydWVcblx0fVxuXG4vKioqLyB9LFxuLyogMzIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBzY2FuID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMylcblx0c2Nhbi5odG1sZnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KVxuXHR2YXIgZG9jdW1lbnQgPSBhdmFsb24uZG9jdW1lbnRcblx0dmFyIHdpbmRvdyA9IGF2YWxvbi53aW5kb3dcblx0dmFyIHJvb3QgPSBhdmFsb24ucm9vdFxuXG5cdHZhciByZWFkeUxpc3QgPSBbXSwgaXNSZWFkeVxuXHR2YXIgZmlyZVJlYWR5ID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgICBpc1JlYWR5ID0gdHJ1ZVxuXG5cdCAgICB3aGlsZSAoZm4gPSByZWFkeUxpc3Quc2hpZnQoKSkge1xuXHQgICAgICAgIGZuKGF2YWxvbilcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGRvU2Nyb2xsQ2hlY2soKSB7XG5cdCAgICB0cnkgeyAvL0lF5LiL6YCa6L+HZG9TY3JvbGxDaGVja+ajgOa1i0RPTeagkeaYr+WQpuW7uuWujFxuXHQgICAgICAgIHJvb3QuZG9TY3JvbGwoJ2xlZnQnKVxuXHQgICAgICAgIGZpcmVSZWFkeSgpXG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgc2V0VGltZW91dChkb1Njcm9sbENoZWNrKVxuXHQgICAgfVxuXHR9XG5cblx0aWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcblx0ICAgIHNldFRpbWVvdXQoZmlyZVJlYWR5KSAvL+WmguaenOWcqGRvbVJlYWR55LmL5aSW5Yqg6L29XG5cdH0gZWxzZSBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHQgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZpcmVSZWFkeSlcblx0fSBlbHNlIGlmIChkb2N1bWVudC5hdHRhY2hFdmVudCkge1xuXHQgICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoJ29ucmVhZHlzdGF0ZWNoYW5nZScsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuXHQgICAgICAgICAgICBmaXJlUmVhZHkoKVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdCAgICB0cnkge1xuXHQgICAgICAgIHZhciBpc1RvcCA9IHdpbmRvdy5mcmFtZUVsZW1lbnQgPT09IG51bGxcblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIH1cblx0ICAgIGlmIChyb290LmRvU2Nyb2xsICYmIGlzVG9wICYmIHdpbmRvdy5leHRlcm5hbCkgey8vZml4IElFIGlmcmFtZSBCVUdcblx0ICAgICAgICBkb1Njcm9sbENoZWNrKClcblx0ICAgIH1cblx0fVxuXHRpZiAod2luZG93LmRvY3VtZW50KSB7XG5cdCAgICBhdmFsb24uYmluZCh3aW5kb3csICdsb2FkJywgZmlyZVJlYWR5KVxuXHR9XG5cdGF2YWxvbi5yZWFkeSA9IGZ1bmN0aW9uIChmbikge1xuXHQgICAgaWYgKCFpc1JlYWR5KSB7XG5cdCAgICAgICAgcmVhZHlMaXN0LnB1c2goZm4pXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGZuKGF2YWxvbilcblx0ICAgIH1cblx0fVxuXG5cdGF2YWxvbi5yZWFkeShmdW5jdGlvbigpe1xuXHQgICAgc2Nhbihkb2N1bWVudC5ib2R5KVxuXHR9KVxuXG5cblxuLyoqKi8gfSxcbi8qIDMzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgb25jZVdhcm4gPSB0cnVlIC8v5Y+q6K2m5ZGK5LiA5qyhXG5cdGZ1bmN0aW9uIHNjYW4obm9kZXMpIHtcblx0ICAgIHZhciBnZXRIVE1MID0gYXZhbG9uLnNjYW4uaHRtbGZ5XG5cdCAgICBmb3IgKHZhciBpID0gMCwgZWxlbTsgZWxlbSA9IG5vZGVzW2krK107ICkge1xuXHQgICAgICAgIGlmIChlbGVtLm5vZGVUeXBlID09PSAxKSB7XG5cdCAgICAgICAgICAgIHZhciAkaWQgPSBnZXRDb250cm9sbGVyKGVsZW0pXG5cblx0ICAgICAgICAgICAgdmFyIHZtID0gYXZhbG9uLnZtb2RlbHNbJGlkXVxuXHQgICAgICAgICAgICBpZiAodm0gJiYgIXZtLiRlbGVtZW50KSB7XG5cdCAgICAgICAgICAgICAgICBhdmFsb24oZWxlbSkucmVtb3ZlQ2xhc3MoJ21zLWNvbnRyb2xsZXInKVxuXHQgICAgICAgICAgICAgICAgdm0uJGVsZW1lbnQgPSBlbGVtXG5cdCAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIC8vSUU2LTjkuIvlhYPntKDnmoRvdXRlckhUTUzliY3pnaLkvJrmnInnqbrnmb1cblx0ICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gZ2V0SFRNTChlbGVtKS8vZWxlbS5vdXRlckhUTUxcblx0ICBcblx0ICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpXG5cdCAgICAgICAgICAgICAgICBlbGVtLnZ0cmVlID0gYXZhbG9uLnNwZWVkVXAoYXZhbG9uLmxleGVyKHRleHQpKSBcblx0ICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgdmFyIG5vdzIgPSBuZXcgRGF0ZSgpXG5cdCAgICAgICAgICAgICAgICBvbmNlV2FybiAmJiBhdmFsb24ubG9nKCfmnoTlu7romZrmi59ET03ogJfml7YnLCBub3cyIC0gbm93LCAnbXMnKVxuXHQgICAgICAgICAgICAgICAgdm0uJHJlbmRlciA9IGF2YWxvbi5yZW5kZXIoZWxlbS52dHJlZSlcblx0ICAgICAgICAgICAgICAgIGF2YWxvbi5zY29wZXNbdm0uJGlkXSA9IHtcblx0ICAgICAgICAgICAgICAgICAgICB2bW9kZWw6IHZtLFxuXHQgICAgICAgICAgICAgICAgICAgIGxvY2FsOiB7fSxcblx0ICAgICAgICAgICAgICAgICAgICBpc1RlbXA6IHRydWVcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHZhciBub3czID0gbmV3IERhdGUoKVxuXHQgICAgICAgICAgICAgICAgb25jZVdhcm4gJiYgYXZhbG9uLmxvZygn5p6E5bu65b2T5YmNdm3nmoQkcmVuZGVy5pa55rOV6ICX5pe2ICcsIG5vdzMgLSBub3cyLCAnbXNcXG4nLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAn5aaC5p6c5q2k5pe26Ze05aSq6ZW/LOi+vjEwMG1z5Lul5LiKXFxuJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ+W7uuiuruWwhuW9k+WJjW1zLWNvbnRyb2xsZXLmi4bliIbmiJDlpJrkuKptcy1jb250cm9sbGVyLOWHj+Wwkeavj+S4qnZt566h6L6W55qE5Yy65Z+fJylcblx0ICAgICAgICAgICAgICAgIGF2YWxvbi5yZXJlbmRlclN0YXJ0ID0gbm93M1xuXHQgICAgICAgICAgICAgICAgb25jZVdhcm4gPSBmYWxzZVxuXHQgICAgICAgICAgICAgICAgYXZhbG9uLmJhdGNoKCRpZClcblxuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKCEkaWQpIHtcblx0ICAgICAgICAgICAgICAgIHNjYW4oZWxlbS5jaGlsZE5vZGVzKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdmFsb24uc2NhbiA9IGZ1bmN0aW9uIChhKSB7XG5cdCAgICBpZiAoIWEgfHwgIWEubm9kZVR5cGUpIHtcblx0ICAgICAgICBhdmFsb24ud2FybignW2F2YWxvbi5zY2FuXSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGVsZW1lbnQgLCBkb2N1bWVudEZyYWdtZW50LCBvciBkb2N1bWVudCcpXG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICBzY2FuKFthXSlcblx0fVxuXG5cdGZ1bmN0aW9uIGdldENvbnRyb2xsZXIoYSkge1xuXHQgICAgcmV0dXJuIGEuZ2V0QXR0cmlidXRlKCdtcy1jb250cm9sbGVyJykgfHwgXG5cdCAgICAgICAgICAgIGEuZ2V0QXR0cmlidXRlKCc6Y29udHJvbGxlcicpIFxuXHR9XG5cbi8qKiovIH0sXG4vKiAzNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIG5vQ2hpbGQgPSBhdmFsb24ub25lT2JqZWN0KFwiYXJlYSxiYXNlLGJhc2Vmb250LGJyLGNvbCxjb21tYW5kLGVtYmVkLGhyLGltZyxpbnB1dCxsaW5rLG1ldGEscGFyYW0sc291cmNlLHRyYWNrLHdiclwiKVxuXG5cdGZ1bmN0aW9uIGdldEhUTUwoZWwpIHtcblx0ICAgIHN3aXRjaCAoZWwubm9kZVR5cGUpIHtcblx0ICAgICAgICBjYXNlIDE6XG5cdCAgICAgICAgICAgIHZhciB0eXBlID0gZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKVxuXHQgICAgICAgICAgICByZXR1cm4gJzwnICsgdHlwZSArIGdldEF0dHJpYnV0ZXMoZWwuYXR0cmlidXRlcykgK1xuXHQgICAgICAgICAgICAgICAgICAgIChub0NoaWxkW3R5cGVdID8gJy8+JyA6ICgnPicgKyBnZXRDaGlsZChlbCkgKyAnPC8nICsgdHlwZSArICc+JykpXG5cdCAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICByZXR1cm4gYXZhbG9uLmVzY2FwZUhUTUwoZWwubm9kZVZhbHVlKS8vIzE1OTJcblx0ICAgICAgICBjYXNlIDg6XG5cdCAgICAgICAgICAgIHJldHVybiAnPCEtLScgKyBlbC5ub2RlVmFsdWUgKyAnLS0+J1xuXHQgICAgfVxuXHR9XG5cblxuXHRmdW5jdGlvbiBnZXRBdHRyaWJ1dGVzKGFycmF5KSB7XG5cdCAgICB2YXIgcmV0ID0gW11cblx0ICAgIGZvciAodmFyIGkgPSAwLCBhdHRyOyBhdHRyID0gYXJyYXlbaSsrXTsgKSB7XG5cdCAgICAgICAgaWYgKGF0dHIuc3BlY2lmaWVkKSB7XG5cdCAgICAgICAgICAgIHJldC5wdXNoKGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpICsgJz1cIicgKyBhdmFsb24uZXNjYXBlSFRNTChhdHRyLnZhbHVlKSArICdcIicpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgdmFyIHN0ciA9IHJldC5qb2luKCcgJylcblx0ICAgIHJldHVybiBzdHIgPyAnICcgKyBzdHIgOiAnJ1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0Q2hpbGQoZWwpIHtcblx0ICAgIHZhciByZXQgPSAnJ1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIG5vZGU7IG5vZGUgPSBlbC5jaGlsZE5vZGVzW2krK107ICkge1xuXHQgICAgICAgIHJldCArPSBnZXRIVE1MKG5vZGUpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gcmV0XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsKXtcblx0ICAgIGlmKGF2YWxvbi5tc2llID4gOCB8fCAhYXZhbG9uLm1zaWUpe1xuXHQgICAgICAgIHJldHVybiBlbC5vdXRlckhUTUxcblx0ICAgIH1cblx0ICAgIHJldHVybiBnZXRIVE1MKGVsKVxuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDM1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDM2KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDM4KVxuXHQvL+WkhOeQhuWxnuaAp+agt+W8j1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKVxuXG5cdF9fd2VicGFja19yZXF1aXJlX18oNDEpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNDIpXG5cdC8vLy/lpITnkIblhoXlrrlcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg0Mylcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg0NClcblx0X193ZWJwYWNrX3JlcXVpcmVfXyg0NSlcblx0Ly8vL+mcgOimgeeUqOWIsOS6i+S7tueahFxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDQ4KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDU3KVxuXHRfX3dlYnBhY2tfcmVxdWlyZV9fKDU4KVxuXHQvL1xuXHQvLy8v5aSE55CG6YC76L6RXG5cdF9fd2VicGFja19yZXF1aXJlX18oNTkpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNjApXG5cdC8vXG5cdF9fd2VicGFja19yZXF1aXJlX18oNjEpXG5cdF9fd2VicGFja19yZXF1aXJlX18oNjQpXG5cdC8v5LyY5YWI57qnIG1zLWltcG9ydGFudCwgbXMtY29udHJvbGxlciwgbXMtZm9yLCBtcy13aWRnZXQsIG1zLWVmZmVjdCwgbXMtaWZcblx0Ly8uLi4uLi4uXG5cdC8vbXMtZHVwbGV4XG5cblxuLyoqKi8gfSxcbi8qIDM2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvLyDmir3nprvlh7rmnaXlhaznlKhcblx0dmFyIHVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cblx0YXZhbG9uLmRpcmVjdGl2ZSgnaW1wb3J0YW50Jywge1xuXHQgICAgcHJpb3JpdHk6IDEsXG5cdCAgICBwYXJzZTogZnVuY3Rpb24gKGNvcHksIHNyYywgYmluZGluZykge1xuXHQgICAgICAgIHZhciBxdW90ZWQgPSBhdmFsb24ucXVvdGUoYmluZGluZy5leHByKVxuXHQgICAgICAgIGNvcHlbYmluZGluZy5uYW1lXSA9IHF1b3RlZFxuXHQgICAgICAgIGNvcHkubG9jYWwgPSAne30nXG5cdCAgICAgICAgY29weS52bW9kZWwgPSAnKGZ1bmN0aW9uKCl7IHJldHVybiBfX3Ztb2RlbF9fID0gYXZhbG9uLnZtb2RlbHNbJyArIHF1b3RlZCArICddfSkoKSdcblx0ICAgICAgICBzcmMuJHByZXBlbmQgPSBbJyhmdW5jdGlvbihfX3Ztb2RlbF9fKXsnLFxuXHQgICAgICAgICAgICAndmFyIGltcG9ydGFudCA9IGF2YWxvbi5zY29wZXNbJyArIHF1b3RlZCArICddJyxcblx0ICAgICAgICAgICAgJ2lmKGltcG9ydGFudCl7YXZhbG9uLmxvZyhcIuS4jei/m+WFpVwiKycgKyBxdW90ZWQgKyAnKTtyZXR1cm4gfScsXG5cdCAgICAgICAgXS5qb2luKCdcXG4nKSArICdcXG4nXG5cdCAgICAgICAgc3JjLiRhcHBlbmQgPSAnXFxufSkoKTsnXG5cdCAgICB9LFxuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSkge1xuXHQgICAgICAgIGlmIChjb3B5ID09PSBzcmMgfHwgc3JjLnZtb2RlbCAhPT0gY29weS52bW9kZWwpIHtcblx0ICAgICAgICAgICAgc3JjWydtcy1jb250cm9sbGVyJ10gPSBjb3B5W25hbWVdXG5cdCAgICAgICAgICAgIHNyYy5sb2NhbCA9IGNvcHkubG9jYWxcblx0ICAgICAgICAgICAgc3JjLnZtb2RlbCA9IGNvcHkudm1vZGVsXG5cdCAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlKVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uIChkb20sIHZkb20sIHBhcmVudCkge1xuXHQgICAgICAgIGF2YWxvbi5kaXJlY3RpdmVzLmNvbnRyb2xsZXIudXBkYXRlKGRvbSwgdmRvbSwgcGFyZW50LCAnaW1wb3J0YW50Jylcblx0ICAgIH1cblx0fSlcblxuXG4vKioqLyB9LFxuLyogMzcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZkb20sIHVwZGF0ZSwgaG9va05hbWUpIHtcblx0ICAgIGlmIChob29rTmFtZSkge1xuXHQgICAgICAgIHZkb20uYWZ0ZXJDaGFuZ2UgPSB2ZG9tLmFmdGVyQ2hhbmdlIHx8IFtdXG5cdCAgICAgICAgYXZhbG9uLkFycmF5LmVuc3VyZSh2ZG9tLmFmdGVyQ2hhbmdlLCB1cGRhdGUpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZhciBkb20gPSB2ZG9tLmRvbVxuXHQgICAgICAgIHVwZGF0ZSh2ZG9tLmRvbSwgdmRvbSwgZG9tICYmIGRvbS5wYXJlbnROb2RlKVxuXHQgICAgfVxuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDM4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvLyDmir3nprvlh7rmnaXlhaznlKhcblx0dmFyIHVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cdHZhciByZWNvbmNpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KVxuXG5cdHZhciBjYWNoZSA9IHt9XG5cdGF2YWxvbi5tZWRpYXRvckZhY3RvcnlDYWNoZSA9IGZ1bmN0aW9uIChfX3Ztb2RlbF9fLCBfX3ByZXNlbnRfXykge1xuXHQgICAgdmFyIGEgPSBfX3Ztb2RlbF9fLiRoYXNoY29kZVxuXHQgICAgdmFyIGIgPSBfX3ByZXNlbnRfXy4kaGFzaGNvZGVcblx0ICAgIHZhciBpZCA9IGEgKyBiXG5cdCAgICBpZiAoY2FjaGVbaWRdKSB7XG5cdCAgICAgICAgcmV0dXJuIGNhY2hlW2lkXVxuXHQgICAgfVxuXHQgICAgdmFyIGMgPSBhdmFsb24ubWVkaWF0b3JGYWN0b3J5KF9fdm1vZGVsX18sIF9fcHJlc2VudF9fKVxuXHQgICAgcmV0dXJuICBjYWNoZVtpZF0gPSBjXG5cdH1cblx0YXZhbG9uLmRpcmVjdGl2ZSgnY29udHJvbGxlcicsIHtcblx0ICAgIHByaW9yaXR5OiAyLFxuXHQgICAgcGFyc2U6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIGJpbmRpbmcpIHtcblx0ICAgICAgICB2YXIgcXVvdGVkID0gYXZhbG9uLnF1b3RlKGJpbmRpbmcuZXhwcilcblx0ICAgICAgICBjb3B5W2JpbmRpbmcubmFtZV0gPSBxdW90ZWRcblx0ICAgICAgICBjb3B5LmxvY2FsID0gJ19fbG9jYWxfXydcblx0ICAgICAgICBjb3B5LnZtb2RlbCA9IFtcblx0ICAgICAgICAgICAgJyhmdW5jdGlvbigpeycsXG5cdCAgICAgICAgICAgICd2YXIgdm0gPSBhdmFsb24udm1vZGVsc1snICsgcXVvdGVkICsgJ10nLFxuXHQgICAgICAgICAgICAnaWYodm0gJiYgX192bW9kZWxfXyYmIHZtICE9PSBfX3Ztb2RlbF9fKXsnLFxuXHQgICAgICAgICAgICAncmV0dXJuIF9fdm1vZGVsX18gPSBhdmFsb24ubWVkaWF0b3JGYWN0b3J5Q2FjaGUoX192bW9kZWxfXywgdm0pJyxcblx0ICAgICAgICAgICAgJ31lbHNlIGlmKHZtKXsnLFxuXHQgICAgICAgICAgICAncmV0dXJuIF9fdm1vZGVsX18gPSB2bScsXG5cdCAgICAgICAgICAgICd9Jyxcblx0ICAgICAgICAgICAgJ30pKCknXG5cdCAgICAgICAgXS5qb2luKCdcXG4nKVxuXG5cdCAgICAgICAgc3JjLiRwcmVwZW5kID0gJyhmdW5jdGlvbihfX3Ztb2RlbF9fKXsnXG5cdCAgICAgICAgc3JjLiRhcHBlbmQgPSAnXFxufSkoX192bW9kZWxfXyk7J1xuXHQgICAgfSxcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIG5hbWUpIHtcblx0ICAgICAgICBpZiAoY29weSA9PT0gc3JjIHx8IHNyY1tuYW1lXSAhPT0gY29weVtuYW1lXSkge1xuXHQgICAgICAgICAgICBzcmNbbmFtZV0gPSBjb3B5W25hbWVdXG5cdCAgICAgICAgICAgIHNyYy5sb2NhbCA9IGNvcHkubG9jYWxcblx0ICAgICAgICAgICAgc3JjLnZtb2RlbCA9IGNvcHkudm1vZGVsXG5cdCAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlKVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uIChkb20sIHZkb20sIHBhcmVudCwgaW1wb3J0YW50KSB7XG5cdCAgICAgICAgdmFyIHZtb2RlbCA9IHZkb20udm1vZGVsXG5cdCAgICAgICAgdmFyIGxvY2FsID0gdmRvbS5sb2NhbFxuXHQgICAgICAgIHZhciBpZCA9IHZkb21bJ21zLWNvbnRyb2xsZXInXVxuXHQgICAgICAgIHZhciBzY29wZSA9IGF2YWxvbi5zY29wZXNbaWRdXG5cdCAgICAgICAgaWYgKHNjb3BlKSB7XG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH1cblx0ICAgICAgICBkZWxldGUgdmRvbS52bW9kZWxcblx0ICAgICAgICBkZWxldGUgdmRvbS5sb2NhbFxuXHQgICAgICAgIHZhciB0b3AgPSBhdmFsb24udm1vZGVsc1tpZF1cblx0ICAgICAgICBpZiAodm1vZGVsLiRlbGVtZW50ICYmIHZtb2RlbC4kZWxlbWVudC52dHJlZVswXSA9PT0gdmRvbSkge1xuXHQgICAgICAgICAgICB2YXIgcmVuZGVyID0gdm1vZGVsLiRyZW5kZXJcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZW5kZXIgPSBhdmFsb24ucmVuZGVyKFt2ZG9tXSwgbG9jYWwpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZtb2RlbC4kcmVuZGVyID0gcmVuZGVyXG5cdCAgICAgICAgdm1vZGVsLiRlbGVtZW50ID0gZG9tXG5cdCAgICAgIFxuXHQgICAgICAgIHJlY29uY2lsZShbZG9tXSwgW3Zkb21dLCBwYXJlbnQpXG5cdCAgICAgICAgZG9tLnZ0cmVlID0gW3Zkb21dXG5cdCAgICAgICAgaWYgKHRvcCAhPT0gdm1vZGVsKSB7XG5cdCAgICAgICAgICAgIHRvcC4kcmVuZGVyID0gdG9wLiRyZW5kZXIgfHwgcmVuZGVyXG5cdCAgICAgICAgICAgIHRvcC4kZWxlbWVudCA9IHRvcC4kZWxlbWVudCB8fCBkb21cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG5lZWRGaXJlID0gaW1wb3J0YW50ID8gdm1vZGVsIDogdG9wXG5cdCAgICAgICAgdmFyIHNjb3BlID0gYXZhbG9uLnNjb3Blc1tpZF0gPSB7XG5cdCAgICAgICAgICAgIHZtb2RlbDogdm1vZGVsLFxuXHQgICAgICAgICAgICBsb2NhbDogbG9jYWxcblx0ICAgICAgICB9XG5cdCAgICAgICAgdXBkYXRlKHZkb20sIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGV2ZW50cyA9IG5lZWRGaXJlLiRldmVudHNbXCJvblJlYWR5XCJdXG5cdCAgICAgICAgICAgIGlmIChldmVudHMpIHtcblx0ICAgICAgICAgICAgICAgIG5lZWRGaXJlLiRmaXJlKCdvblJlYWR5Jylcblx0ICAgICAgICAgICAgICAgIGRlbGV0ZSBuZWVkRmlyZS4kZXZlbnRzLm9uUmVhZHlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBzY29wZS5pc01vdW50ID0gdHJ1ZVxuXHQgICAgICAgIH0sICdhZnRlckNoYW5nZScpXG5cblx0ICAgIH1cblx0fSlcblxuXG4vKioqLyB9LFxuLyogMzkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8qXG5cdCAqIFxuXHQg6IqC54K55a+56b2Q566X5rOVXG5cdCDlhYPntKDoioLngrnmmK8x77yL5YW257G75Z6LXG5cdCDmlofmnKzoioLngrnmmK8z77yL5YW25piv5ZCm6IO956e76ZmkXG5cdCDms6jph4roioLngrnmmK8477yL5YW25YaF5a65XG5cdCDlj5HnjrDkuI3kuIDmoLfvvIzlsLHlr7nnnJ/lrp5ET03moJHmt7vliqDmiJbliKDpmaRcblx0IOa3u+WKoOeahOaYryBtcy1mb3IsbXMtZm9yLWVuZOWNoOS9jeeahOazqOmHiuiKgueCuVxuXHQg5Yig6Zmk55qE5piv5aSa5L2Z55qE56m655m95paH5pys6IqC54K5LOS4jklFNi0456eB5LiL5re75Yqg55qE5aWH5oCq6IqC54K5XG5cdCAqL1xuXHR2YXIgcmZvckhvbGRlciA9IC9ebXNcXC1mb3IvXG5cdHZhciByd2hpdGVSZXRhaW4gPSAvW1xcU1xceEEwXS9cblx0dmFyIHBsYWluVGFnID0gYXZhbG9uLm9uZU9iamVjdCgnc2NyaXB0LHN0eWxlLHhtcCx0ZW1wbGF0ZSxub3NjcmlwdCx0ZXh0YXJlYScpXG5cblx0ZnVuY3Rpb24gcmVjb25jaWxlKG5vZGVzLCB2bm9kZXMsIHBhcmVudCkge1xuXHQgICAgLy/pgY3lubPljJbomZrmi59ET03moJFcblx0ICAgIHZub2RlcyA9IGZsYXR0ZW4odm5vZGVzKVxuXHQgICAgdmFyIG1hcCA9IHt9XG5cdCAgICB2YXIgdm4gPSB2bm9kZXMubGVuZ3RoXG5cdCAgICBpZiAodm4gPT09IDApXG5cdCAgICAgICAgcmV0dXJuXG5cblx0ICAgIHZub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcblx0ICAgICAgICBtYXBbaW5kZXhdID0gZ2V0VHlwZShlbClcblx0ICAgIH0pXG5cdCAgICB2YXIgbmV3Tm9kZXMgPSBbXSwgY2hhbmdlID0gZmFsc2UsIGVsLCBpID0gMFxuXHQgICAgdmFyIGJyZWFrTG9vcCA9IDBcblx0ICAgIHdoaWxlICh0cnVlKSB7XG5cdCAgICAgICAgZWwgPSBub2Rlc1tpKytdXG5cdCAgICAgICAgaWYgKGJyZWFrTG9vcCsrID4gNTAwMCkge1xuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgdnR5cGUgPSBlbCAmJiBnZXRUeXBlKGVsKVxuXHQgICAgICAgIHZhciB2ID0gbmV3Tm9kZXMubGVuZ3RoLCBjaGVja1xuXHQgICAgICAgIGlmIChtYXBbdl0gPT09IHZ0eXBlKSB7XG5cdCAgICAgICAgICAgIGlmIChjaGVjayAmJiBlbC5ub2RlVHlwZSA9PT0gMSAmJiAoZWwuZ2V0QXR0cmlidXRlKCc6Zm9yJyl8fGVsLmdldEF0dHJpYnV0ZSgnbXMtZm9yJykpKSB7XG5cdCAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlXG5cdCAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG5ld05vZGVzLnB1c2goZWwpXG5cdCAgICAgICAgICAgIHZhciB2bm9kZSA9IHZub2Rlc1t2XVxuXG5cdCAgICAgICAgICAgIGlmICh2bm9kZS5keW5hbWljKSB7XG5cdCAgICAgICAgICAgICAgICB2bm9kZS5kb20gPSBlbFxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgaWYgKGVsLm5vZGVUeXBlID09PSAxICYmICF2bm9kZS5pc1ZvaWRUYWcgJiYgIXBsYWluVGFnW3Zub2RlLnR5cGVdKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1vbmUnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy/lnKhjaHJvbWXkuI5maXJlZm945LiL5Yig5o6Jc2VsZWN05Lit55qE56m655m96IqC54K577yM5Lya5b2x5ZON5Yiwc2VsZWN0ZWRJbmRleFxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBmaXhJbmRleCA9IGVsLnNlbGVjdGVkSW5kZXhcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHJlY29uY2lsZShlbC5jaGlsZE5vZGVzLCB2bm9kZS5jaGlsZHJlbiwgZWwpXG5cdCAgICAgICAgICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1vbmUnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZWwuc2VsZWN0ZWRJbmRleCA9IGZpeEluZGV4XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBjaGFuZ2UgPSB0cnVlXG5cdCAgICAgICAgICAgIGlmIChtYXBbdl0gPT09ICc4dHJ1ZScpIHtcblx0ICAgICAgICAgICAgICAgIHZhciB2diA9IHZub2Rlc1t2XVxuXHQgICAgICAgICAgICAgICAgdmFyIG5uID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCh2di5ub2RlVmFsdWUpXG5cdCAgICAgICAgICAgICAgICB2di5kb20gPSBublxuXHQgICAgICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChubilcblx0ICAgICAgICAgICAgICAgIGlmICh2di5keW5hbWljID09PSAnZm9yJykge1xuXHQgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaSA9IE1hdGgubWF4KDAsIC0taSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAobmV3Tm9kZXMubGVuZ3RoID09PSB2bikge1xuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGlmIChjaGFuZ2UpIHtcblx0ICAgICAgICB2YXIgZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSwgaSA9IDBcblx0ICAgICAgICB3aGlsZSAoZWwgPSBuZXdOb2Rlc1tpKytdKSB7XG5cdCAgICAgICAgICAgIGYuYXBwZW5kQ2hpbGQoZWwpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuXHQgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmZpcnN0Q2hpbGQpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChmKVxuXHQgICAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSByZWNvbmNpbGVcblxuXG5cdGZ1bmN0aW9uIGdldFR5cGUobm9kZSkge1xuXHQgICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XG5cdCAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICByZXR1cm4gJzMnICsgcndoaXRlUmV0YWluLnRlc3Qobm9kZS5ub2RlVmFsdWUpXG5cdCAgICAgICAgY2FzZSAxOlxuXHQgICAgICAgICAgICByZXR1cm4gJzEnICsgKG5vZGUubm9kZU5hbWUgfHwgbm9kZS50eXBlKS50b0xvd2VyQ2FzZSgpXG5cdCAgICAgICAgY2FzZSA4OlxuXHQgICAgICAgICAgICByZXR1cm4gJzgnICsgcmZvckhvbGRlci50ZXN0KG5vZGUubm9kZVZhbHVlKVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gZmxhdHRlbihub2Rlcykge1xuXHQgICAgdmFyIGFyciA9IFtdXG5cdCAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gbm9kZXNbaV07IGkrKykge1xuXHQgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSkge1xuXHQgICAgICAgICAgICBhcnIgPSBhcnIuY29uY2F0KGZsYXR0ZW4oZWwpKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGFyci5wdXNoKGVsKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBhcnJcblx0fVxuXG5cblxuLyoqKi8gfSxcbi8qIDQwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcblx0dmFyIGF0dHJVcGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblxuXHRhdmFsb24uZGlyZWN0aXZlKCdhdHRyJywge1xuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSkge1xuXHQgICAgICAgIHZhciBhID0gY29weVtuYW1lXVxuXHQgICAgICAgIHZhciBwID0gc3JjW25hbWVdXG5cdCAgICAgICAgaWYgKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgICAgIGEgPSBhLiRtb2RlbCB8fCBhIC8v5a6J5YWo55qE6YGN5Y6GVkJzY3JpcHRcblx0ICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHsvL+i9rOaNouaIkOWvueixoVxuXHQgICAgICAgICAgICAgICAgYSA9IGF2YWxvbi5taXguYXBwbHkoe30sIGEpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGNvcHkgPT09IHNyYyB8fCB0eXBlb2YgcCAhPT0gJ29iamVjdCcpIHsvL+WmguaenOS4gOW8gOWni+S4uuepulxuXHQgICAgICAgICAgICAgICAgc3JjLmNoYW5nZUF0dHIgPSBzcmNbbmFtZV0gPSBhXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcGF0Y2ggPSB7fVxuXHQgICAgICAgICAgICAgICAgdmFyIGhhc0NoYW5nZSA9IGZhbHNlXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGEpIHsvL2RpZmblt67lvILngrlcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoYVtpXSAhPT0gcFtpXSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBoYXNDaGFuZ2UgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoW2ldID0gYVtpXVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmIChoYXNDaGFuZ2UpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzcmNbbmFtZV0gPSBhXG5cdCAgICAgICAgICAgICAgICAgICAgc3JjLmNoYW5nZUF0dHIgPSBwYXRjaFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChzcmMuY2hhbmdlQXR0cikge1xuXHQgICAgICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUgKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmKGNvcHkgIT09IHNyYyl7XG5cdCAgICAgICAgICAgIGRlbGV0ZSBjb3B5W25hbWVdLy/ph4rmlL7lhoXlrZhcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgLy9kb20sIHZub2RlXG5cdCAgICB1cGRhdGU6IGF0dHJVcGRhdGVcblx0fSlcblxuXG4vKioqLyB9LFxuLyogNDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblxuXHRhdmFsb24uZGlyZWN0aXZlKCdjc3MnLCB7XG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgdmFyIGEgPSBjb3B5W25hbWVdXG5cdCAgICAgICAgdmFyIHAgPSBzcmNbbmFtZV1cblx0ICAgICAgICBpZiAoT2JqZWN0KGEpID09PSBhKSB7XG5cdCAgICAgICAgICAgIGEgPSBhLiRtb2RlbCB8fCBhLy/lronlhajnmoTpgY3ljoZWQnNjcmlwdFxuXHQgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhKSkgey8v6L2s5o2i5oiQ5a+56LGhXG5cdCAgICAgICAgICAgICAgICBhID0gYXZhbG9uLm1peC5hcHBseSh7fSwgYSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoY29weSA9PT0gc3JjIHx8IHR5cGVvZiBwICE9PSAnb2JqZWN0Jykgey8v5aaC5p6c5LiA5byA5aeL5Li656m6XG5cdCAgICAgICAgICAgICAgICBzcmMuY2hhbmdlU3R5bGUgPSBzcmNbbmFtZV0gPSBhXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgcGF0Y2ggPSB7fVxuXHQgICAgICAgICAgICAgICAgdmFyIGhhc0NoYW5nZSA9IGZhbHNlXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGEpIHsvL2RpZmblt67lvILngrlcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoYVtpXSAhPT0gcFtpXSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBoYXNDaGFuZ2UgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoW2ldID0gYVtpXVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmIChoYXNDaGFuZ2UpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzcmNbbmFtZV0gPSBhXG5cdCAgICAgICAgICAgICAgICAgICAgc3JjLmNoYW5nZVN0eWxlID0gcGF0Y2hcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoc3JjLmNoYW5nZVN0eWxlKSB7XG5cdCAgICAgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBkZWxldGUgY29weVtuYW1lXS8v6YeK5pS+5YaF5a2YXG5cdCAgICB9LFxuXHQgICAgdXBkYXRlOiBmdW5jdGlvbiAoZG9tLCB2ZG9tKSB7XG5cdCAgICAgICAgdmFyIGNoYW5nZSA9IHZkb20uY2hhbmdlU3R5bGVcblx0ICAgICAgICB2YXIgd3JhcCA9IGF2YWxvbihkb20pXG5cdCAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBjaGFuZ2UpIHtcblx0ICAgICAgICAgICAgd3JhcC5jc3MobmFtZSwgY2hhbmdlW25hbWVdKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBkZWxldGUgdmRvbS5jaGFuZ2VTdHlsZVxuXHQgICAgfVxuXHR9KVxuXG5cbi8qKiovIH0sXG4vKiA0MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cblx0dmFyIG5vbmUgPSAnbm9uZSdcblx0ZnVuY3Rpb24gcGFyc2VEaXNwbGF5KGVsZW0sIHZhbCkge1xuXHQgICAgLy/nlKjkuo7lj5blvpfmraTnsbvmoIfnrb7nmoTpu5jorqRkaXNwbGF55YC8XG5cdCAgICB2YXIgZG9jID0gZWxlbS5vd25lckRvY3VtZW50XG5cdCAgICB2YXIgbm9kZU5hbWUgPSBlbGVtLm5vZGVOYW1lXG5cdCAgICB2YXIga2V5ID0gJ18nICsgbm9kZU5hbWVcblx0ICAgIGlmICghcGFyc2VEaXNwbGF5W2tleV0pIHtcblx0ICAgICAgICB2YXIgdGVtcCA9IGRvYy5ib2R5LmFwcGVuZENoaWxkKGRvYy5jcmVhdGVFbGVtZW50KG5vZGVOYW1lKSlcblx0ICAgICAgICBpZiAoYXZhbG9uLm1vZGVybikge1xuXHQgICAgICAgICAgICB2YWwgPSBnZXRDb21wdXRlZFN0eWxlKHRlbXAsIG51bGwpLmRpc3BsYXlcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB2YWwgPSB0ZW1wLmN1cnJlbnRTdHlsZS5kaXNwbGF5XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKHRlbXApXG5cdCAgICAgICAgaWYgKHZhbCA9PT0gbm9uZSkge1xuXHQgICAgICAgICAgICB2YWwgPSAnYmxvY2snXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHBhcnNlRGlzcGxheVtrZXldID0gdmFsXG5cdCAgICB9XG5cdCAgICByZXR1cm4gcGFyc2VEaXNwbGF5W2tleV1cblx0fVxuXG5cdGF2YWxvbi5wYXJzZURpc3BsYXkgPSBwYXJzZURpc3BsYXlcblxuXHRhdmFsb24uZGlyZWN0aXZlKCd2aXNpYmxlJywge1xuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSkge1xuXHQgICAgICAgIHZhciBjID0gISFjb3B5W25hbWVdXG5cdCAgICAgICAgaWYgKGNvcHkgPT09IHNyYyB8fCBjICE9PSBzcmNbbmFtZV0pIHtcblx0ICAgICAgICAgICAgc3JjW25hbWVdID0gY1xuXHQgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSApXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSkgeyBcblx0ICAgICAgICBpZighZG9tIHx8IGRvbS5ub2RlVHlwZSAhPT0gMSl7XG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgc2hvdyA9IHZkb21bJ21zLXZpc2libGUnXVxuXHQgICAgICAgIHZhciBkaXNwbGF5ID0gZG9tLnN0eWxlLmRpc3BsYXlcblx0ICAgICAgICB2YXIgdmFsdWVcblx0ICAgICAgICBpZiAoc2hvdykge1xuXHQgICAgICAgICAgICBpZiAoZGlzcGxheSA9PT0gbm9uZSkge1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSB2ZG9tLmRpc3BsYXlWYWx1ZVxuXHQgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5kaXNwbGF5ID0gJydcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoZG9tLnN0eWxlLmRpc3BsYXkgPT09ICcnICYmIGF2YWxvbihkb20pLmNzcygnZGlzcGxheScpID09PSBub25lICYmXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gZml4IGZpcmVmb3ggQlVHLOW/hemhu+aMguWIsOmhtemdouS4ilxuXHQgICAgICAgICAgICAgICAgICAgIGF2YWxvbi5jb250YWlucyhkb20ub3duZXJEb2N1bWVudCwgZG9tKSkge1xuXG5cdCAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRGlzcGxheShkb20pXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBpZiAoZGlzcGxheSAhPT0gbm9uZSkge1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSBub25lXG5cdCAgICAgICAgICAgICAgICB2ZG9tLmRpc3BsYXlWYWx1ZSA9IGRpc3BsYXlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBmdW5jdGlvbiBjYigpe1xuXHQgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdm9pZCAwKSB7XG5cdCAgICAgICAgICAgICAgZG9tLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZVxuXHQgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgYXZhbG9uLmFwcGx5RWZmZWN0KGRvbSwgdmRvbSwge1xuXHQgICAgICAgICAgICBob29rOiBzaG93ID8gJ29uRW50ZXJEb25lJzogJ29uTGVhdmVEb25lJyxcblx0ICAgICAgICAgICAgY2I6IGNiXG5cdCAgICAgICAgfSlcblx0ICAgIH1cblx0fSlcblxuXG5cbi8qKiovIH0sXG4vKiA0MyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cblx0YXZhbG9uLmRpcmVjdGl2ZSgnZXhwcicsIHtcblx0ICAgIHBhcnNlOiBhdmFsb24ubm9vcCxcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIChjb3B5LCBzcmMpIHtcblx0ICAgICAgICB2YXIgY29weVZhbHVlID0gY29weS5ub2RlVmFsdWUgKyAnJ1xuXHQgICAgICAgIGlmIChjb3B5ID09PSBzcmMgfHwgY29weVZhbHVlICE9PSBzcmMubm9kZVZhbHVlKSB7XG5cdCAgICAgICAgICAgIHNyYy5ub2RlVmFsdWUgPSBjb3B5VmFsdWVcblx0ICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSkge1xuXHQgICAgICAgIGlmIChkb20pIHtcblx0ICAgICAgICAgICAgZG9tLm5vZGVWYWx1ZSA9IHZkb20ubm9kZVZhbHVlXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgYXZhbG9uLndhcm4oJ1snLCB2ZG9tLm5vZGVWYWx1ZSwgJ13mib7kuI3liLDlr7nlupTnmoTmlofmnKzoioLngrnotYvlgLwnKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fSlcblxuXG5cblxuLyoqKi8gfSxcbi8qIDQ0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvL+atpOaMh+S7pOWunumZheS4iuS4jeS8muaTjeS9nERPTSzkuqTnlLFleHBy5oyH5Luk5aSE55CGXG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ3RleHQnLCB7XG5cdCAgICBwYXJzZTogZnVuY3Rpb24gKGNvcHksIHNyYywgYmluZGluZykge1xuXHQgICAgICAgIGNvcHlbYmluZGluZy5uYW1lXSA9IDFcblx0ICAgICAgICBzcmMuY2hpbGRyZW4gPSBbXVxuXHQgICAgICAgIGNvcHkuY2hpbGRyZW4gPSAnW3tcXG5ub2RlVHlwZTozLFxcbnR5cGU6XCIjdGV4dFwiLFxcbmR5bmFtaWM6dHJ1ZSwnICtcblx0ICAgICAgICAgICAgICAgICdcXG5ub2RlVmFsdWU6YXZhbG9uLnBhcnNlcnMuc3RyaW5nKCcgK1xuXHQgICAgICAgICAgICAgICAgYXZhbG9uLnBhcnNlRXhwcihiaW5kaW5nKSArICcpfV0nXG5cdCAgICB9LFxuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYykge1xuXHQgICAgICAgIGlmKCFzcmMuY2hpbGRyZW4ubGVuZ3RoKXtcblx0ICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSlcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdXBkYXRlOiBmdW5jdGlvbihkb20sIHZkb20pe1xuXHQgICAgICAgIGlmIChkb20gJiYgIXZkb20uaXNWb2lkVGFnICkge1xuXHQgICAgICAgICAgICB2YXIgcGFyZW50ID0gZG9tXG5cdCAgICAgICAgICAgIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuXHQgICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgneCcpXG5cdCAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChkb20pXG5cdCAgICAgICAgICAgIHZhciBhID0ge25vZGVUeXBlOiAzLCB0eXBlOicjdGV4dCcsIGRvbTogZG9tfVxuXHQgICAgICAgICAgICB2ZG9tLmNoaWxkcmVuLnB1c2goYSlcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH0pXG5cbi8qKiovIH0sXG4vKiA0NSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cdHZhciByZWNvbmNpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KVxuXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ2h0bWwnLCB7XG5cdCAgICBwYXJzZTogZnVuY3Rpb24gKGNvcHksIHNyYywgYmluZGluZykge1xuXHQgICAgICAgIGlmICghc3JjLmlzVm9pZFRhZykge1xuXHQgICAgICAgICAgICAvL+Wwhua4suafk+WHveaVsOeahOafkOS4gOmDqOWIhuWtmOi1t+adpSzmuLLlnKhj5pa55rOV5Lit6L2s5o2i5Li65Ye95pWwXG5cdCAgICAgICAgICAgIGNvcHlbYmluZGluZy5uYW1lXSA9IGF2YWxvbi5wYXJzZUV4cHIoYmluZGluZylcblx0ICAgICAgICAgICAgY29weS52bW9kZWwgPSAnX192bW9kZWxfXydcblx0ICAgICAgICAgICAgY29weS5sb2NhbCA9ICdfX2xvY2FsX18nXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgY29weS5jaGlsZHJlbiA9ICdbXSdcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSkge1xuXHQgICAgICAgIHZhciBjb3B5VmFsdWUgPSBjb3B5W25hbWVdICsgJydcblx0ICAgICAgICBpZiAoY29weSA9PT0gc3JjIHx8ICFzcmMucmVuZGVyIHx8IGNvcHlWYWx1ZSAhPT0gc3JjW25hbWVdKSB7XG5cdCAgICAgICAgICAgIHNyY1tuYW1lXSA9IGNvcHlWYWx1ZVxuXHQgICAgICAgICAgICB2YXIgb2xkVHJlZSA9IGF2YWxvbi5zcGVlZFVwKGF2YWxvbi5sZXhlcihjb3B5VmFsdWUpKVxuXHQgICAgICAgICAgICBzcmMuY2hpbGRyZW4gPSBvbGRUcmVlXG5cdCAgICAgICAgICAgIHZhciByZW5kZXIgPSBhdmFsb24ucmVuZGVyKG9sZFRyZWUsIGNvcHkubG9jYWwpXG5cdCAgICAgICAgICAgIHNyYy5yZW5kZXIgPSByZW5kZXJcblx0ICAgICAgICAgICAgdmFyIG5ld1RyZWUgPSByZW5kZXIoY29weS52bW9kZWwsIGNvcHkubG9jYWwpXG5cdCAgICAgICAgICAgIGNvcHkuY2hpbGRyZW4gPSBuZXdUcmVlXG5cdCAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHZhciBuZXdUcmVlID0gc3JjLnJlbmRlcihjb3B5LnZtb2RlbCwgY29weS5sb2NhbClcblx0ICAgICAgICAgIGNvcHkuY2hpbGRyZW4gPSBuZXdUcmVlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSwgcGFyZW50KSB7XG5cdCAgICAgICAgYXZhbG9uLmNsZWFySFRNTChkb20pXG5cdCAgICAgICAgdmFyIGYgPSBhdmFsb24udmRvbUFkYXB0b3IodmRvbS5jaGlsZHJlbilcblx0ICAgICAgICByZWNvbmNpbGUoZi5jaGlsZE5vZGVzLCB2ZG9tLmNoaWxkcmVuLCBmKVxuXHQgICAgICAgIGRvbS5hcHBlbmRDaGlsZChmKVxuXHQgICAgfVxuXHR9KVxuXG5cbi8qKiovIH0sXG4vKiA0NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0Ly/moLnmja5WTeeahOWxnuaAp+WAvOaIluihqOi+vuW8j+eahOWAvOWIh+aNouexu+WQje+8jG1zLWNsYXNzPSd4eHggeXl5IHp6ejpmbGFnJ1xuXHQvL2h0dHA6Ly93d3cuY25ibG9ncy5jb20vcnVieWxvdXZyZS9hcmNoaXZlLzIwMTIvMTIvMTcvMjgxODU0MC5odG1sXG5cdHZhciBtYXJrSUQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLmdldExvbmdJRFxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuXHQgICAgdmFyIGNsYXNzZXMgPSBbXVxuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldXG5cdCAgICAgICAgdmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnXG5cdCAgICAgICAgaWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInIHx8IGFyZyA9PT0gdHJ1ZSkge1xuXHQgICAgICAgICAgICBjbGFzc2VzLnB1c2goYXJnKVxuXHQgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdCAgICAgICAgICAgIGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpXG5cdCAgICAgICAgfSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoYXJnLmhhc093blByb3BlcnR5KGtleSkgJiYgYXJnW2tleV0pIHtcblx0ICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goa2V5KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJylcblx0fVxuXG5cblxuXHR2YXIgZGlyZWN0aXZlcyA9IGF2YWxvbi5kaXJlY3RpdmVzXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ2NsYXNzJywge1xuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSkge1xuXHQgICAgICAgIHZhciB0eXBlID0gbmFtZS5zbGljZSgzKVxuXHQgICAgICAgIHZhciBjb3B5VmFsdWUgPSBjb3B5W25hbWVdXG5cdCAgICAgICAgdmFyIHNyY1ZhbHVlID0gc3JjW25hbWVdIHx8ICcnXG5cdCAgICAgICAgdmFyIGNsYXNzRXZlbnQgPSBzcmMuY2xhc3NFdmVudCB8fCB7fVxuXHQgICAgICAgIGlmICh0eXBlID09PSAnaG92ZXInKSB7Ly/lnKjnp7vlh7rnp7vlhaXml7bliIfmjaLnsbvlkI1cblx0ICAgICAgICAgICAgY2xhc3NFdmVudC5tb3VzZWVudGVyID0gYWN0aXZhdGVDbGFzc1xuXHQgICAgICAgICAgICBjbGFzc0V2ZW50Lm1vdXNlbGVhdmUgPSBhYmFuZG9uQ2xhc3Ncblx0ICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdhY3RpdmUnKSB7Ly/lnKjojrflvpfnhKbngrnml7bliIfmjaLnsbvlkI1cblx0ICAgICAgICAgICAgc3JjLnByb3BzLnRhYmluZGV4ID0gY29weS5wcm9wcy50YWJpbmRleCB8fCAtMVxuXHQgICAgICAgICAgICBjbGFzc0V2ZW50LnRhYkluZGV4ID0gc3JjLnByb3BzLnRhYmluZGV4XG5cdCAgICAgICAgICAgIGNsYXNzRXZlbnQubW91c2Vkb3duID0gYWN0aXZhdGVDbGFzc1xuXHQgICAgICAgICAgICBjbGFzc0V2ZW50Lm1vdXNldXAgPSBhYmFuZG9uQ2xhc3Ncblx0ICAgICAgICAgICAgY2xhc3NFdmVudC5tb3VzZWxlYXZlID0gYWJhbmRvbkNsYXNzXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHNyYy5jbGFzc0V2ZW50ID0gY2xhc3NFdmVudFxuXG5cdCAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoY29weVZhbHVlKVxuXHQgICAgICAgXG5cdCAgICAgICAgaWYgKGNvcHkgPT09IHNyYyB8fCBzcmNWYWx1ZSAhPT0gY2xhc3NOYW1lKSB7XG5cdCAgICAgICAgICAgIHNyY1tuYW1lXSA9IGNsYXNzTmFtZVxuXHQgICAgICAgICAgICBzcmNbJ2NoYW5nZS0nICsgdHlwZV0gPSBjbGFzc05hbWVcblx0ICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUsIHR5cGUpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSkge1xuXHQgICAgICAgIGlmICghZG9tIHx8IGRvbS5ub2RlVHlwZSAhPT0gMSlcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgdmFyIGNsYXNzRXZlbnQgPSB2ZG9tLmNsYXNzRXZlbnRcblx0ICAgICAgICBpZiAoY2xhc3NFdmVudCkge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpIGluIGNsYXNzRXZlbnQpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChpID09PSAndGFiSW5kZXgnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZG9tW2ldID0gY2xhc3NFdmVudFtpXVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBhdmFsb24uYmluZChkb20sIGksIGNsYXNzRXZlbnRbaV0pXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmRvbS5jbGFzc0V2ZW50ID0ge31cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIG5hbWVzID0gWydjbGFzcycsICdob3ZlcicsICdhY3RpdmUnXVxuXHQgICAgICAgIG5hbWVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcblx0ICAgICAgICAgICAgdmFyIG5hbWUgPSAnY2hhbmdlLScgKyB0eXBlXG5cdCAgICAgICAgICAgIHZhciB2YWx1ZSA9IHZkb21bbmFtZV1cblx0ICAgICAgICAgICAgaWYgKHZhbHVlID09PSB2b2lkIDApXG5cdCAgICAgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdjbGFzcycpIHtcblx0ICAgICAgICAgICAgICAgIGRvbSAmJiBzZXRDbGFzcyhkb20sIHZkb20pXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgb2xkVHlwZSA9IGRvbS5nZXRBdHRyaWJ1dGUoJ2NoYW5nZS0nICsgdHlwZSlcblx0ICAgICAgICAgICAgICAgIGlmIChvbGRUeXBlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYXZhbG9uKGRvbSkucmVtb3ZlQ2xhc3Mob2xkVHlwZSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KVxuXHQgICAgfVxuXHR9KVxuXG5cdGRpcmVjdGl2ZXMuYWN0aXZlID0gZGlyZWN0aXZlcy5ob3ZlciA9IGRpcmVjdGl2ZXNbJ2NsYXNzJ11cblxuXG5cdHZhciBjbGFzc01hcCA9IHtcblx0ICAgIG1vdXNlZW50ZXI6ICdjaGFuZ2UtaG92ZXInLFxuXHQgICAgbW91c2VsZWF2ZTogJ2NoYW5nZS1ob3ZlcicsXG5cdCAgICBtb3VzZWRvd246ICdjaGFuZ2UtYWN0aXZlJyxcblx0ICAgIG1vdXNldXA6ICdjaGFuZ2UtYWN0aXZlJ1xuXHR9XG5cblx0ZnVuY3Rpb24gYWN0aXZhdGVDbGFzcyhlKSB7XG5cdCAgICB2YXIgZWxlbSA9IGUudGFyZ2V0XG5cdCAgICBhdmFsb24oZWxlbSkuYWRkQ2xhc3MoZWxlbS5nZXRBdHRyaWJ1dGUoY2xhc3NNYXBbZS50eXBlXSkgfHwgJycpXG5cdH1cblxuXHRmdW5jdGlvbiBhYmFuZG9uQ2xhc3MoZSkge1xuXHQgICAgdmFyIGVsZW0gPSBlLnRhcmdldFxuXHQgICAgdmFyIG5hbWUgPSBjbGFzc01hcFtlLnR5cGVdXG5cdCAgICBhdmFsb24oZWxlbSkucmVtb3ZlQ2xhc3MoZWxlbS5nZXRBdHRyaWJ1dGUobmFtZSkgfHwgJycpXG5cdCAgICBpZiAobmFtZSAhPT0gJ2NoYW5nZS1hY3RpdmUnKSB7XG5cdCAgICAgICAgYXZhbG9uKGVsZW0pLnJlbW92ZUNsYXNzKGVsZW0uZ2V0QXR0cmlidXRlKCdjaGFuZ2UtYWN0aXZlJykgfHwgJycpXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRDbGFzcyhkb20sIHZkb20pIHtcblx0ICAgIHZhciBvbGQgPSBkb20uZ2V0QXR0cmlidXRlKCdvbGQtY2hhbmdlLWNsYXNzJylcblx0ICAgIHZhciBuZW8gPSB2ZG9tWydtcy1jbGFzcyddXG5cdCAgICBpZiAob2xkICE9PSBuZW8pIHtcblx0ICAgICAgICBhdmFsb24oZG9tKS5yZW1vdmVDbGFzcyhvbGQpLmFkZENsYXNzKG5lbylcblx0ICAgICAgICBkb20uc2V0QXR0cmlidXRlKCdvbGQtY2hhbmdlLWNsYXNzJywgbmVvKVxuXHQgICAgfVxuXG5cdH1cblxuXHRtYXJrSUQoYWN0aXZhdGVDbGFzcylcblx0bWFya0lEKGFiYW5kb25DbGFzcylcblxuXG5cblxuLyoqKi8gfSxcbi8qIDQ3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuXHR2YXIgZXZlbnRDYWNoZSA9IG5ldyBDYWNoZSgxMjgpXG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXHR2YXIgbWFya0lEID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KS5nZXRMb25nSURcblxuXHR2YXIgcmZpbHRlcnMgPSAvXFx8LisvZ1xuXHQvL1JlZjogaHR0cDovL2RldmVsb3BlcnMud2hhdHdnLm9yZy93ZWJhcHBhcGlzLmh0bWwjZXZlbnQtaGFuZGxlci1pZGwtYXR0cmlidXRlc1xuXHQvLyBUaGUgYXNzdW1wdGlvbiBpcyB0aGF0IGZ1dHVyZSBET00gZXZlbnQgYXR0cmlidXRlIG5hbWVzIHdpbGwgYmVnaW4gd2l0aFxuXHQvLyAnb24nIGFuZCBiZSBjb21wb3NlZCBvZiBvbmx5IEVuZ2xpc2ggbGV0dGVycy5cblx0dmFyIHJmaWx0ZXJzID0gL1xcfC4rL2dcblx0dmFyIHJ2YXIgPSAvKCg/OlxcQHxcXCR8XFwjXFwjKT9cXHcrKS9nXG5cdHZhciByc3RyaW5nID0gLyhbXCInXSkoXFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS9nXG5cblx0Ly/ln7rkuo7kuovku7bku6PnkIbnmoTpq5jmgKfog73kuovku7bnu5Hlrppcblx0YXZhbG9uLmRpcmVjdGl2ZSgnb24nLCB7XG5cdCAgICBwcmlvcml0eTogMzAwMCxcblx0ICAgIHBhcnNlOiBmdW5jdGlvbiAoY29weSwgc3JjLCBiaW5kaW5nKSB7XG5cdCAgICAgICAgdmFyIHVuZGVybGluZSA9IGJpbmRpbmcubmFtZS5yZXBsYWNlKCdtcy1vbi0nLCAnZScpLnJlcGxhY2UoJy0nLCAnXycpXG5cdCAgICAgICAgdmFyIHV1aWQgPSB1bmRlcmxpbmUgKyAnXycgKyBiaW5kaW5nLmV4cHIuXG5cdCAgICAgICAgICAgICAgICByZXBsYWNlKC9cXHMvZywgJycpLlxuXHQgICAgICAgICAgICAgICAgcmVwbGFjZSgvW14kYS16XS9pZywgZnVuY3Rpb24gKGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gZS5jaGFyQ29kZUF0KDApXG5cdCAgICAgICAgICAgICAgICB9KVxuXG5cdCAgICAgICAgdmFyIHF1b3RlZCA9IGF2YWxvbi5xdW90ZSh1dWlkKVxuXHQgICAgICAgIHZhciBmbiA9ICcoZnVuY3Rpb24oKXtcXG4nICtcblx0ICAgICAgICAgICAgICAgICd2YXIgZm42MTAgPSAnICtcblx0ICAgICAgICAgICAgICAgIGF2YWxvbi5wYXJzZUV4cHIoYmluZGluZywgJ29uJykgK1xuXHQgICAgICAgICAgICAgICAgJ1xcbmZuNjEwLnV1aWQgPScgKyBxdW90ZWQgKyAnO1xcbnJldHVybiBmbjYxMH0pKCknXG5cdCAgICAgICAgY29weS52bW9kZWwgPSAnX192bW9kZWxfXydcblx0ICAgICAgICBjb3B5LmxvY2FsID0gJ19fbG9jYWxfXydcblx0ICAgICAgICBjb3B5W2JpbmRpbmcubmFtZV0gPSBmblxuXG5cdCAgICB9LFxuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSkge1xuXHQgICAgICAgIHZhciBmbiA9IGNvcHlbbmFtZV1cblx0ICAgICAgICB2YXIgdXVpZCA9IGZuLnV1aWRcblx0ICAgICAgICB2YXIgdHlwZSA9IHV1aWQuc3BsaXQoJ18nKS5zaGlmdCgpXG5cdCAgICAgICAgdmFyIHNlYXJjaCA9IHR5cGUuc2xpY2UoMSkgKyAnOicgKyB1dWlkXG5cdCAgICAgICAgdmFyIHNyY0ZuID0gc3JjW25hbWVdXG5cdCAgICAgICAgdmFyIGhhc0NoYW5nZSA9IGZhbHNlXG5cdCAgICAgICAgdmFyIGluaXQgPSBjb3B5ID09PSBzcmNcblx0ICAgICAgICBpZiAoaW5pdCB8fCAhc3JjRm4gfHwgc3JjRm4udXVpZCAhPT0gdXVpZCkge1xuXHQgICAgICAgICAgICBzcmNbbmFtZV0gPSBmblxuXHQgICAgICAgICAgICBzcmMuYWRkRXZlbnRzID0gc3JjLmFkZEV2ZW50cyB8fCB7fVxuXHQgICAgICAgICAgICBzcmMuYWRkRXZlbnRzW3NlYXJjaF0gPSBmblxuXHQgICAgICAgICAgICBhdmFsb24uZXZlbnRMaXN0ZW5lcnMudXVpZCA9IGZuXG5cdCAgICAgICAgICAgIGhhc0NoYW5nZSA9IHRydWVcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGRpZmZPYmooc3JjLmxvY2FsfHwge30sIGNvcHkubG9jYWwpKSB7XG5cdCAgICAgICAgICAgIGhhc0NoYW5nZSA9IHRydWVcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGhhc0NoYW5nZSkge1xuXHQgICAgICAgICAgICBzcmMubG9jYWwgPSBjb3B5LmxvY2FsXG5cdCAgICAgICAgICAgIHNyYy52bW9kZWwgPSBjb3B5LnZtb2RlbFxuXHQgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSlcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdXBkYXRlOiBmdW5jdGlvbiAoZG9tLCB2ZG9tKSB7XG5cdCAgICAgICAgaWYgKCFkb20gfHwgZG9tLm5vZGVUeXBlID4gMSkgLy/lnKjlvqrnjq/nu5HlrprkuK3vvIzov5nph4zkuLpudWxsXG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIHZhciBrZXksIHR5cGUsIGxpc3RlbmVyXG5cdCAgICAgICAgZG9tLl9tc19jb250ZXh0XyA9IHZkb20udm1vZGVsXG5cdCAgICAgICAgZG9tLl9tc19sb2NhbCA9IHZkb20ubG9jYWxcblx0ICAgICAgICBmb3IgKGtleSBpbiB2ZG9tLmFkZEV2ZW50cykge1xuXHQgICAgICAgICAgICB0eXBlID0ga2V5LnNwbGl0KCc6Jykuc2hpZnQoKVxuXHQgICAgICAgICAgICBsaXN0ZW5lciA9IHZkb20uYWRkRXZlbnRzW2tleV1cblx0ICAgICAgICAgICAgYXZhbG9uLmJpbmQoZG9tLCB0eXBlLCBsaXN0ZW5lcilcblx0ICAgICAgICB9XG5cdCAgICAgICAgZGVsZXRlIHZkb20uYWRkRXZlbnRzXG5cdCAgICB9XG5cdH0pXG5cblx0ZnVuY3Rpb24gZGlmZk9iaihhLCBiKSB7XG5cdCAgICBmb3IgKHZhciBpIGluIGEpIHsvL2RpZmblt67lvILngrlcblx0ICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBmYWxzZVxuXHR9XG5cbi8qKiovIH0sXG4vKiA0OCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XG5cdHZhciB1cGRhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KVxuXHR2YXIgZXZhbHVhdG9yUG9vbCA9IF9fd2VicGFja19yZXF1aXJlX18oNDkpXG5cdHZhciBzdHJpbmdpZnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKVxuXG5cdHZhciByY2hhbmdlRmlsdGVyID0gL1xcfFxccypjaGFuZ2VcXGIvXG5cdHZhciByY2hlY2tlZFR5cGUgPSAvXig/OmNoZWNrYm94fHJhZGlvKSQvXG5cdHZhciByZGVib3VuY2VGaWx0ZXIgPSAvXFx8XFxzKmRlYm91bmNlKD86XFwoKFteKV0rKVxcKSk/L1xuXHR2YXIgdXBkYXRlTW9kZWxCeUV2ZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSlcblx0dmFyIHVwZGF0ZU1vZGVsQnlWYWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTQpXG5cdHZhciB1cGRhdGVNb2RlbCA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG5cdHZhciB1cGRhdGVWaWV3ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NSlcblx0dmFyIGFkZFZhbGlkYXRlRmllbGQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU2KVxuXG5cblx0YXZhbG9uLmRpcmVjdGl2ZSgnZHVwbGV4Jywge1xuXHQgICAgcHJpb3JpdHk6IDIwMDAsXG5cdCAgICBwYXJzZTogZnVuY3Rpb24gKGNvcHksIHNyYywgYmluZGluZykge1xuXHQgICAgICAgIHZhciBleHByID0gYmluZGluZy5leHByXG5cdCAgICAgICAgdmFyIGV0eXBlID0gc3JjLnByb3BzLnR5cGVcblx0ICAgICAgICAvL+WkhOeQhuaVsOaNrui9rOaNouWZqFxuXHQgICAgICAgIHZhciBwYXJzZXIgPSBiaW5kaW5nLnBhcmFtLCBkdHlwZVxuXHQgICAgICAgIHZhciBpc0NoZWNrZWQgPSBmYWxzZVxuXHQgICAgICAgIHBhcnNlciA9IHBhcnNlciA/IHBhcnNlci5zcGxpdCgnLScpLm1hcChmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgICAgICBpZiAoYSA9PT0gJ2NoZWNrZWQnKSB7XG5cdCAgICAgICAgICAgICAgICBpc0NoZWNrZWQgPSB0cnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGFcblx0ICAgICAgICB9KSA6IFtdXG5cblx0ICAgICAgICBpZiAocmNoZWNrZWRUeXBlLnRlc3QoZXR5cGUpICYmIGlzQ2hlY2tlZCkge1xuXHQgICAgICAgICAgICAvL+WmguaenOaYr3JhZGlvLCBjaGVja2JveCzliKTlrprnlKjmiLfkvb/nlKjkuoZjaGVja2Vk5qC85byP5Ye95pWw5rKh5pyJXG5cdCAgICAgICAgICAgIHBhcnNlciA9IFtdXG5cdCAgICAgICAgICAgIGR0eXBlID0gJ3JhZGlvJ1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGlmICghL2lucHV0fHRleHRhcmVhfHNlbGVjdC8udGVzdChzcmMudHlwZSkpIHtcblx0ICAgICAgICAgICAgaWYgKCdjb250ZW50ZWRpdGFibGUnIGluIHNyYy5wcm9wcykge1xuXHQgICAgICAgICAgICAgICAgZHR5cGUgPSAnY29udGVudGVkaXRhYmxlJ1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIGlmICghZHR5cGUpIHtcblx0ICAgICAgICAgICAgZHR5cGUgPSBzcmMudHlwZSA9PT0gJ3NlbGVjdCcgPyAnc2VsZWN0JyA6XG5cdCAgICAgICAgICAgICAgICAgICAgZXR5cGUgPT09ICdjaGVja2JveCcgPyAnY2hlY2tib3gnIDpcblx0ICAgICAgICAgICAgICAgICAgICBldHlwZSA9PT0gJ3JhZGlvJyA/ICdyYWRpbycgOlxuXHQgICAgICAgICAgICAgICAgICAgICdpbnB1dCdcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGlzQ2hhbmdlZCA9IGZhbHNlLCBkZWJvdW5jZVRpbWUgPSAwXG5cdCAgICAgICAgLy/liKTlrprmmK/lkKbkvb/nlKjkuoYgY2hhbmdlIGRlYm91bmNlIOi/h+a7pOWZqFxuXHQgICAgICAgIGlmIChkdHlwZSA9PT0gJ2lucHV0JyB8fCBkdHlwZSA9PT0gJ2NvbnRlbnRlZGl0YWJsZScpIHtcblx0ICAgICAgICAgICAgdmFyIGlzU3RyaW5nID0gdHJ1ZVxuXHQgICAgICAgICAgICBpZiAocmNoYW5nZUZpbHRlci50ZXN0KGV4cHIpKSB7XG5cdCAgICAgICAgICAgICAgICBpc0NoYW5nZWQgPSB0cnVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKCFpc0NoYW5nZWQpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IGV4cHIubWF0Y2gocmRlYm91bmNlRmlsdGVyKVxuXHQgICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKSB8fCAzMDBcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXG5cdCAgICAgICAgdmFyIGNoYW5nZWQgPSBjb3B5LnByb3BzWydkYXRhLWR1cGxleC1jaGFuZ2VkJ11cblx0ICAgICAgICBjb3B5LnBhcnNlciA9IGF2YWxvbi5xdW90ZShwYXJzZXIgKyBcIlwiKVxuXHQgICAgICAgIGNvcHkubW9kZWxWYWx1ZSA9ICcoJyArIGF2YWxvbi5wYXJzZUV4cHIoYmluZGluZywgJ2R1cGxleCcpICsgJykoX192bW9kZWxfXyknLy/CoOi+k+WHuuWOn+Wni+aVsOaNrlxuXHQgICAgICAgIHZhciBmb3JtYXQgPSBldmFsdWF0b3JQb29sLmdldCgnZHVwbGV4OmZvcm1hdDonICsgZXhwcilcblxuXHQgICAgICAgIGNvcHkuZHVwbGV4RGF0YSA9IHN0cmluZ2lmeSh7XG5cdCAgICAgICAgICAgIHR5cGU6IGR0eXBlLCAvL+i/meS4quWGs+Wumue7keWumuS7gOS5iOS6i+S7tlxuXHQgICAgICAgICAgICB2bW9kZWw6ICdfX3Ztb2RlbF9fJyxcblx0ICAgICAgICAgICAgbG9jYWw6ICdfX2xvY2FsX18nLFxuXHQgICAgICAgICAgICBpc0NoZWNrZWQ6IGlzQ2hlY2tlZCxcblx0ICAgICAgICAgICAgaXNTdHJpbmc6ICEhaXNTdHJpbmcsXG5cdCAgICAgICAgICAgIGlzQ2hhbmdlZDogaXNDaGFuZ2VkLCAvL+i/meS4quWGs+WumuWQjOatpeeahOmikeaVsFxuXHQgICAgICAgICAgICBkZWJvdW5jZVRpbWU6IGRlYm91bmNlVGltZSwgLy/ov5nkuKrlhrPlrprlkIzmraXnmoTpopHmlbBcblx0ICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQgfHwgJ2Z1bmN0aW9uKHZtLCBhKXtyZXR1cm4gYX0nLFxuXHQgICAgICAgICAgICBzZXQ6IGV2YWx1YXRvclBvb2wuZ2V0KCdkdXBsZXg6c2V0OicgKyBleHByKSxcblx0ICAgICAgICAgICAgY2FsbGJhY2s6IGNoYW5nZWQgPyBhdmFsb24ucGFyc2VFeHByKGNoYW5nZWQsICdvbicpIDogJ2F2YWxvbi5ub29wJ1xuXHQgICAgICAgIH0pXG5cblx0ICAgIH0sXG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjKSB7XG5cdCAgIFxuXHQgICAgICAgIGlmIChjb3B5ID09PSBzcmMgfHwgIXNyYy5kdXBsZXhEYXRhKSB7XG5cdCAgICAgICAgICAgIC8v56ys5LiA5qyh5Li65Y6f5aeL6Jma5oufRE9N5re75YqgZHVwbGV4RGF0YVxuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHNyYy5kdXBsZXhEYXRhID0gY29weS5kdXBsZXhEYXRhXG5cdCAgICAgICAgICAgIGRhdGEucGFyc2VyID0gY29weS5wYXJzZXIgPyBjb3B5LnBhcnNlci5zcGxpdCgnLCcpIDogW11cblx0ICAgICAgICAgICAgZGF0YS5wYXJzZSA9IHBhcnNlVmFsdWVcblx0ICAgICAgICAgICAgdmFyIGN1clZhbHVlID0gY29weS5tb2RlbFZhbHVlXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgZGF0YSA9IHNyYy5kdXBsZXhEYXRhXG5cdCAgICAgICAgICAgIHZhciBjdXJWYWx1ZSA9IGNvcHkubW9kZWxWYWx1ZVxuXHQgICAgICAgICAgICB2YXIgcHJlVmFsdWUgPSBkYXRhLm1vZGVsVmFsdWVcblx0ICAgICAgICAgICAgLy8jMTUwMlxuXHQgICAgICAgICAgICBjb3B5LmR1cGxleERhdGEgPSAwXG5cdCAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJWYWx1ZSkgJiZcblx0ICAgICAgICAgICAgICAgICAgICBjdXJWYWx1ZSA9PT0gcHJlVmFsdWUpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChkYXRhLmlzU3RyaW5nKSB7Ly/ovpPlh7rliLDpobXpnaLml7bopoHmoLzlvI/ljJZcblx0ICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YS5wYXJzZShjdXJWYWx1ZSlcblx0ICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBjdXJWYWx1ZSkge1xuXHQgICAgICAgICAgICAgICAgZGF0YS5zZXQoZGF0YS52bW9kZWwsIHZhbHVlKVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgY3VyVmFsdWUgPSB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBkYXRhLm1vZGVsVmFsdWUgPSBjdXJWYWx1ZVxuXHQgICAgICAgIGlmIChkYXRhLmlzU3RyaW5nKSB7Ly/ovpPlh7rliLDpobXpnaLml7bopoHmoLzlvI/ljJZcblx0ICAgICAgICAgICAgdmFsdWUgPSBkYXRhLmZvcm1hdChkYXRhLnZtb2RlbCwgY3VyVmFsdWUgKyAnJylcblx0ICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBjdXJWYWx1ZSArICcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNldChkYXRhLnZtb2RlbCwgdmFsdWUpXG5cdCAgICAgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjdXJWYWx1ZSA9IHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRhdGEudmlld1ZhbHVlID0gY3VyVmFsdWVcblx0ICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSwgJ2FmdGVyQ2hhbmdlJylcblx0ICAgIH0sXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uIChkb20sIHZkb20pIHtcblx0ICAgICAgICBpZiAoZG9tICYmIGRvbS5ub2RlVHlwZSA9PT0gMSkge1xuXHQgICAgICAgICAgICBpZiAoIWRvbS5fX21zX2R1cGxleF9fKSB7XG5cdCAgICAgICAgICAgICAgICBkb20uX19tc19kdXBsZXhfXyA9IHZkb20uZHVwbGV4RGF0YVxuXHQgICAgICAgICAgICAgICAgdXBkYXRlTW9kZWxCeUV2ZW50KGRvbSwgdmRvbSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IGRvbS5fX21zX2R1cGxleF9fXG5cblx0ICAgICAgICAgICAgZGF0YS5kb20gPSBkb21cblx0ICAgICAgICAgICAgYWRkVmFsaWRhdGVGaWVsZChkb20sIHZkb20pXG5cdCAgICAgICAgICAgIGlmIChkYXRhLmlzU3RyaW5nXG5cdCAgICAgICAgICAgICAgICAgICAgJiYgIWF2YWxvbi5tc2llXG5cdCAgICAgICAgICAgICAgICAgICAgJiYgdXBkYXRlTW9kZWxCeVZhbHVlID09PSBmYWxzZVxuXHQgICAgICAgICAgICAgICAgICAgICYmICFkb20udmFsdWVIaWphY2spIHtcblx0ICAgICAgICAgICAgICAgIC8vY2hyb21lIDQy5Y+K5Lul5LiL54mI5pys6ZyA6KaB6L+Z5LiqaGFja1xuXG5cdCAgICAgICAgICAgICAgICBkb20udmFsdWVIaWphY2sgPSB1cGRhdGVNb2RlbFxuXHQgICAgICAgICAgICAgICAgdmFyIGludGVydmFsSUQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCFhdmFsb24uY29udGFpbnMoYXZhbG9uLnJvb3QsIGRvbSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKVxuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGRvbS52YWx1ZUhpamFjaygpXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfSwgMzApXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICB1cGRhdGVWaWV3W2RhdGEudHlwZV0uY2FsbChkYXRhKVxuXG5cblx0ICAgICAgICB9XG5cblx0ICAgIH1cblx0fSlcblxuXHRmdW5jdGlvbiBwYXJzZVZhbHVlKHZhbCkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGs7IGsgPSB0aGlzLnBhcnNlcltpKytdOyApIHtcblx0ICAgICAgICB2YXIgZm4gPSBhdmFsb24ucGFyc2Vyc1trXVxuXHQgICAgICAgIGlmIChmbikge1xuXHQgICAgICAgICAgICB2YWwgPSBmbi5jYWxsKHRoaXMsIHZhbClcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdmFsXG5cdH1cblxuXHQvKlxuXHQgdm1bbXMtZHVwbGV4XSAg4oaSICDljp/lp4ttb2RlbFZhbHVlIOKGkiAg5qC85byP5YyW5ZCO5q+U6L6DICAg4oaSICAg6L6T5Ye66aG16Z2iXG5cdCDihpEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDihpNcblx0IOavlOi+g21vZGVsVmFsdWUgIOKGkCAgcGFyc2Vk5ZCO5b6X5YiwbW9kZWxWYWx1ZSAg4oaQIOagvOW8j+WMluWQjuavlOi+gyDihpAgIOWOn+Wni3ZpZXdWYWx1ZVxuXHQgKi9cblxuLyoqKi8gfSxcbi8qIDQ5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcblx0dmFyIENhY2hlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOClcblx0Ly/nvJPlrZjmsYLlgLzlh73mlbDvvIzku6Xkvr/lpJrmrKHliKnnlKhcblx0bW9kdWxlLmV4cG9ydHMgPSBuZXcgQ2FjaGUoNTEyKVxuXG5cbi8qKiovIH0sXG4vKiA1MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIGtleU1hcCA9IGF2YWxvbi5vbmVPYmplY3QoXCJicmVhayxjYXNlLGNhdGNoLGNvbnRpbnVlLGRlYnVnZ2VyLGRlZmF1bHQsZGVsZXRlLGRvLGVsc2UsZmFsc2UsXCIgK1xuXHQgICAgICAgIFwiZmluYWxseSxmb3IsZnVuY3Rpb24saWYsaW4saW5zdGFuY2VvZixuZXcsbnVsbCxyZXR1cm4sc3dpdGNoLHRoaXMsXCIgK1xuXHQgICAgICAgIFwidGhyb3csdHJ1ZSx0cnksdHlwZW9mLHZhcix2b2lkLHdoaWxlLHdpdGgsXCIgKyAvKiDlhbPplK7lrZcqL1xuXHQgICAgICAgIFwiYWJzdHJhY3QsYm9vbGVhbixieXRlLGNoYXIsY2xhc3MsY29uc3QsZG91YmxlLGVudW0sZXhwb3J0LGV4dGVuZHMsXCIgK1xuXHQgICAgICAgIFwiZmluYWwsZmxvYXQsZ290byxpbXBsZW1lbnRzLGltcG9ydCxpbnQsaW50ZXJmYWNlLGxvbmcsbmF0aXZlLFwiICtcblx0ICAgICAgICBcInBhY2thZ2UscHJpdmF0ZSxwcm90ZWN0ZWQscHVibGljLHNob3J0LHN0YXRpYyxzdXBlcixzeW5jaHJvbml6ZWQsXCIgK1xuXHQgICAgICAgIFwidGhyb3dzLHRyYW5zaWVudCx2b2xhdGlsZVwiKVxuXHRhdmFsb24ua2V5TWFwID0ga2V5TWFwXG5cdHZhciBxdW90ZWQgPSB7XG5cdCAgICB0eXBlOiAxLFxuXHQgICAgdGVtcGxhdGU6IDEsXG5cdCAgICBvcmRlcjogMSxcblx0ICAgIG5vZGVWYWx1ZTogMSxcblx0ICAgIGR5bmFtaWM6IDEsXG5cdCAgICBzaWduYXR1cmU6IDEsXG5cdCAgICB3aWQ6IDFcblx0fVxuXG5cdHZhciBybmVlZFF1b3RlID0gL1tXLV0vXG5cdHZhciBxdW90ZSA9IGF2YWxvbi5xdW90ZVxuXHRmdW5jdGlvbiBmaXhLZXkoaykge1xuXHQgICAgcmV0dXJuIChybmVlZFF1b3RlLnRlc3QoaykgfHwga2V5TWFwW2tdKSA/IHF1b3RlKGspIDoga1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RyaW5naWZ5KG9iaikge1xuXHQgICAgdmFyIGFycjEgPSBbXVxuXHQvL+Wtl+espuS4jeeUqOS4nOilv+WMhei1t+adpeWwseWPmOaIkOWPmOmHj1xuXHQgICAgZm9yICh2YXIgaSBpbiBvYmopIHtcblx0ICAgICAgICBpZiAoaSA9PT0gJ3Byb3BzJykge1xuXHQgICAgICAgICAgICB2YXIgYXJyMiA9IFtdXG5cdCAgICAgICAgICAgIGZvciAodmFyIGsgaW4gb2JqLnByb3BzKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIga3YgPSBvYmoucHJvcHNba11cblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga3YgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAga3YgPSBxdW90ZShrdilcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGFycjIucHVzaChmaXhLZXkoaykgKyAnOiAnICsga3YpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgYXJyMS5wdXNoKCdwcm9wczogeycgKyBhcnIyLmpvaW4oJyxcXG4nKSArICd9Jylcblx0ICAgICAgICB9IGVsc2UgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpICE9PSAnZG9tJykge1xuXHQgICAgICAgICAgICB2YXIgdiA9IG9ialtpXVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICB2ID0gcXVvdGVkW2ldID8gcXVvdGUodikgOiB2XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgYXJyMS5wdXNoKGZpeEtleShpKSArICc6JyArIHYpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuICd7XFxuJyArIGFycjEuam9pbignLFxcbicpICsgJ30nXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHN0cmluZ2lmeVxuXG5cbi8qKiovIH0sXG4vKiA1MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0LyogXG5cdCAqIOmAmui/h+e7keWumuS6i+S7tuWQjOatpXZtb2RlbFxuXHQgKiDmgLvlhbHmnInkuInnp43mlrnlvI/lkIzmraXop4blm75cblx0ICogMS4g5ZCE56eN5LqL5Lu2IGlucHV0LCBjaGFuZ2UsIGNsaWNrLCBwcm9wZXJ0eWNoYW5nZSwga2V5ZG93bi4uLlxuXHQgKiAyLiB2YWx1ZeWxnuaAp+mHjeWGmVxuXHQgKiAzLiDlrprml7blmajova7or6Jcblx0ICovXG5cdHZhciB1cGRhdGVNb2RlbCA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpXG5cdHZhciBtYXJrSUQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLmdldFNob3J0SURcblx0dmFyIG1zaWUgPSBhdmFsb24ubXNpZVxuXHR2YXIgd2luZG93ID0gYXZhbG9uLndpbmRvd1xuXHR2YXIgZG9jdW1lbnQgPSBhdmFsb24uZG9jdW1lbnRcblx0ZnVuY3Rpb24gdXBkYXRlTW9kZWxCeUV2ZW50KG5vZGUsIHZub2RlKSB7XG5cdCAgICB2YXIgZXZlbnRzID0ge31cblx0ICAgIHZhciBkYXRhID0gdm5vZGUuZHVwbGV4RGF0YVxuXHQgICAgZGF0YS51cGRhdGUgPSB1cGRhdGVNb2RlbFxuXHQgICAgLy/mt7vliqDpnIDopoHnm5HlkKznmoTkuovku7Zcblx0ICAgIHN3aXRjaCAoZGF0YS50eXBlKSB7XG5cdCAgICAgICAgY2FzZSAncmFkaW8nOlxuXHQgICAgICAgIGNhc2UgJ2NoZWNrYm94Jzpcblx0ICAgICAgICAgICAgZXZlbnRzLmNsaWNrID0gdXBkYXRlTW9kZWxcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICBjYXNlICdzZWxlY3QnOlxuXHQgICAgICAgICAgICBldmVudHMuY2hhbmdlID0gdXBkYXRlTW9kZWxcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICBjYXNlICdjb250ZW50ZWRpdGFibGUnOlxuXHQgICAgICAgICAgICBpZiAoZGF0YS5pc0NoYW5nZWQpIHtcblx0ICAgICAgICAgICAgICAgIGV2ZW50cy5ibHVyID0gdXBkYXRlTW9kZWxcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmIChhdmFsb24ubW9kZXJuKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy53ZWJraXRVUkwpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cDovL2NvZGUubWV0YWdlci5kZS9zb3VyY2UveHJlZi9XZWJLaXQvTGF5b3V0VGVzdHMvZmFzdC9ldmVudHMvXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMTA3NDJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLndlYmtpdEVkaXRhYmxlQ29udGVudENoYW5nZWQgPSB1cGRhdGVNb2RlbFxuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93Lk11dGF0aW9uRXZlbnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLkRPTUNoYXJhY3RlckRhdGFNb2RpZmllZCA9IHVwZGF0ZU1vZGVsXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5pbnB1dCA9IHVwZGF0ZU1vZGVsXG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5rZXlkb3duID0gdXBkYXRlTW9kZWxLZXlEb3duXG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnBhc3RlID0gdXBkYXRlTW9kZWxEZWxheVxuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5jdXQgPSB1cGRhdGVNb2RlbERlbGF5XG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmZvY3VzID0gY2xvc2VDb21wb3NpdGlvblxuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5ibHVyID0gb3BlbkNvbXBvc2l0aW9uXG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIGNhc2UgJ2lucHV0Jzpcblx0ICAgICAgICAgICAgaWYgKGRhdGEuaXNDaGFuZ2VkKSB7XG5cdCAgICAgICAgICAgICAgICBldmVudHMuY2hhbmdlID0gdXBkYXRlTW9kZWxcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vaHR0cDovL3d3dy5jbmJsb2dzLmNvbS9ydWJ5bG91dnJlL2FyY2hpdmUvMjAxMy8wMi8xNy8yOTE0NjA0Lmh0bWxcblx0ICAgICAgICAgICAgICAgIC8vaHR0cDovL3d3dy5tYXR0czQxMS5jb20vcG9zdC9pbnRlcm5ldC1leHBsb3Jlci05LW9uaW5wdXQvXG5cdCAgICAgICAgICAgICAgICBpZiAobXNpZSkgey8v5aSE55CG6L6T5YWl5rOV6Zeu6aKYXG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmtleXVwID0gdXBkYXRlTW9kZWxLZXlEb3duXG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIGlmIChtc2llIDwgOSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wcm9wZXJ0eWNoYW5nZSA9IHVwZGF0ZU1vZGVsSGFja1xuXHQgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wYXN0ZSA9IHVwZGF0ZU1vZGVsRGVsYXlcblx0ICAgICAgICAgICAgICAgICAgICBldmVudHMuY3V0ID0gdXBkYXRlTW9kZWxEZWxheVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBldmVudHMuaW5wdXQgPSB1cGRhdGVNb2RlbFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgLy9JRTYtOOeahHByb3BlcnR5Y2hhbmdl5pyJQlVHLOesrOS4gOasoeeUqEpT5L+u5pS55YC85pe25LiN5Lya6Kem5Y+RLOiAjOS4lOS9oOaYr+WFqOmDqOa4heepunZhbHVl5Lmf5LiN5Lya6Kem5Y+RXG5cdCAgICAgICAgICAgICAgICAvL0lFOeeahHByb3BlcnR5Y2hhbmdl5LiN5pSv5oyB6Ieq5Yqo5a6M5oiQLOmAgOagvCzliKDpmaQs5aSN5Yi2LOi0tOeymCzliarliIfmiJbngrnlh7vlj7PovrnnmoTlsI9Y55qE5riF56m65pON5L2cXG5cdCAgICAgICAgICAgICAgICAvL0lFMTHlvq7ova/mi7zpn7Plpb3lg4/miY3kvJrop6blj5Fjb21wb3NpdGlvbnN0YXJ0IOS4jeS8muinpuWPkWNvbXBvc2l0aW9uZW5kXG5cdCAgICAgICAgICAgICAgICAvL2h0dHBzOi8vZ2l0aHViLmNvbS9SdWJ5TG91dnJlL2F2YWxvbi9pc3N1ZXMvMTM2OCNpc3N1ZWNvbW1lbnQtMjIwNTAzMjg0XG5cdCAgICAgICAgICAgICAgICBpZighbXNpZSB8fCBtc2llID4gOSl7XG5cdCAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmNvbXBvc2l0aW9uc3RhcnQgPSBvcGVuQ29tcG9zaXRpb25cblx0ICAgICAgICAgICAgICAgICAgICBldmVudHMuY29tcG9zaXRpb25lbmQgPSBjbG9zZUNvbXBvc2l0aW9uXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBpZiAoIW1zaWUpIHtcblxuXHQgICAgICAgICAgICAgICAgICAgIC8vaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvVHlwZWRBcnJheVxuXHQgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5b2T5YmN5rWP6KeI5Zmo5pSv5oyBSW50OEFycmF5LOmCo+S5iOaIkeS7rOWwseS4jemcgOimgeS7peS4i+i/meS6m+S6i+S7tuadpeaJk+ihpeS4geS6hlxuXHQgICAgICAgICAgICAgICAgICAgIGlmICghL1xcW25hdGl2ZSBjb2RlXFxdLy50ZXN0KHdpbmRvdy5JbnQ4QXJyYXkpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5rZXlkb3duID0gdXBkYXRlTW9kZWxLZXlEb3duIC8vc2FmYXJpIDwgNSBvcGVyYSA8IDExXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5wYXN0ZSA9IHVwZGF0ZU1vZGVsRGVsYXkvL3NhZmFyaSA8IDVcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLmN1dCA9IHVwZGF0ZU1vZGVsRGVsYXkvL3NhZmFyaSA8IDUgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubmV0c2NhcGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggPD0gMy42IGRvZXNuJ3QgZmlyZSB0aGUgJ2lucHV0JyBldmVudCB3aGVuIHRleHQgaXMgZmlsbGVkIGluIHRocm91Z2ggYXV0b2NvbXBsZXRlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMuRE9NQXV0b0NvbXBsZXRlID0gdXBkYXRlTW9kZWxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgfVxuXG5cdCAgICBpZiAoL3Bhc3N3b3JkfHRleHQvLnRlc3Qodm5vZGUucHJvcHMudHlwZSkpIHtcblx0ICAgICAgICBldmVudHMuZm9jdXMgPSBvcGVuQ2FyZXQgLy/liKTlrprmmK/lkKbkvb/nlKjlhYnmoIfkv67mraPlip/og70gXG5cdCAgICAgICAgZXZlbnRzLmJsdXIgPSBjbG9zZUNhcmV0XG5cdCAgICAgICAgZGF0YS5nZXRDYXJldCA9IGdldENhcmV0XG5cdCAgICAgICAgZGF0YS5zZXRDYXJldCA9IHNldENhcmV0XG5cdCAgICB9XG5cblx0ICAgIGZvciAodmFyIG5hbWUgaW4gZXZlbnRzKSB7XG5cdCAgICAgICAgYXZhbG9uLmJpbmQobm9kZSwgbmFtZSwgZXZlbnRzW25hbWVdKVxuXHQgICAgfVxuXHR9XG5cblxuXHRmdW5jdGlvbiB1cGRhdGVNb2RlbEhhY2soZSkge1xuXHQgICAgaWYgKGUucHJvcGVydHlOYW1lID09PSAndmFsdWUnKSB7XG5cdCAgICAgICAgdXBkYXRlTW9kZWwuY2FsbCh0aGlzLCBlKVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gdXBkYXRlTW9kZWxEZWxheShlKSB7XG5cdCAgICB2YXIgZWxlbSA9IHRoaXNcblx0ICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHVwZGF0ZU1vZGVsLmNhbGwoZWxlbSwgZSlcblx0ICAgIH0sIDApXG5cdH1cblxuXG5cdGZ1bmN0aW9uIG9wZW5DYXJldCgpIHtcblx0ICAgIHRoaXMuY2FyZXQgPSB0cnVlXG5cdH1cblxuXHRmdW5jdGlvbiBjbG9zZUNhcmV0KCkge1xuXHQgICAgdGhpcy5jYXJldCA9IGZhbHNlXG5cdH1cblx0ZnVuY3Rpb24gb3BlbkNvbXBvc2l0aW9uKCkge1xuXHQgICAgdGhpcy5jb21wb3NpbmcgPSB0cnVlXG5cdH1cblxuXHRmdW5jdGlvbiBjbG9zZUNvbXBvc2l0aW9uKGUpIHtcblx0ICAgIHRoaXMuY29tcG9zaW5nID0gZmFsc2Vcblx0ICAgIHVwZGF0ZU1vZGVsRGVsYXkuY2FsbCh0aGlzLCBlKVxuXHR9XG5cblx0ZnVuY3Rpb24gdXBkYXRlTW9kZWxLZXlEb3duKGUpIHtcblx0ICAgIHZhciBrZXkgPSBlLmtleUNvZGVcblx0ICAgIC8vIGlnbm9yZVxuXHQgICAgLy8gICAgY29tbWFuZCAgICAgICAgICAgIG1vZGlmaWVycyAgICAgICAgICAgICAgICAgICBhcnJvd3Ncblx0ICAgIGlmIChrZXkgPT09IDkxIHx8ICgxNSA8IGtleSAmJiBrZXkgPCAxOSkgfHwgKDM3IDw9IGtleSAmJiBrZXkgPD0gNDApKVxuXHQgICAgICAgIHJldHVyblxuXHQgICAgdXBkYXRlTW9kZWwuY2FsbCh0aGlzLCBlKVxuXHR9XG5cblx0bWFya0lEKG9wZW5DYXJldClcblx0bWFya0lEKGNsb3NlQ2FyZXQpXG5cdG1hcmtJRChvcGVuQ29tcG9zaXRpb24pXG5cdG1hcmtJRChjbG9zZUNvbXBvc2l0aW9uKVxuXHRtYXJrSUQodXBkYXRlTW9kZWwpXG5cdG1hcmtJRCh1cGRhdGVNb2RlbEhhY2spXG5cdG1hcmtJRCh1cGRhdGVNb2RlbERlbGF5KVxuXHRtYXJrSUQodXBkYXRlTW9kZWxLZXlEb3duKVxuXG5cdC8vSUU2LTjopoHlpITnkIblhYnmoIfml7bpnIDopoHlvILmraVcblx0dmFyIG1heUJlQXN5bmMgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICAgIHNldFRpbWVvdXQoZm4sIDApXG5cdH1cblx0dmFyIHNldENhcmV0ID0gZnVuY3Rpb24gKHRhcmdldCwgY3Vyc29yUG9zaXRpb24pIHtcblx0ICAgIHZhciByYW5nZVxuXHQgICAgaWYgKHRhcmdldC5jcmVhdGVUZXh0UmFuZ2UpIHtcblx0ICAgICAgICBtYXlCZUFzeW5jKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGFyZ2V0LmZvY3VzKClcblx0ICAgICAgICAgICAgcmFuZ2UgPSB0YXJnZXQuY3JlYXRlVGV4dFJhbmdlKClcblx0ICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcblx0ICAgICAgICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgY3Vyc29yUG9zaXRpb24pXG5cdCAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgY3Vyc29yUG9zaXRpb24pXG5cdCAgICAgICAgICAgIHJhbmdlLnNlbGVjdCgpXG5cdCAgICAgICAgfSlcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGFyZ2V0LmZvY3VzKClcblx0ICAgICAgICBpZiAodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgdGFyZ2V0LnNldFNlbGVjdGlvblJhbmdlKGN1cnNvclBvc2l0aW9uLCBjdXJzb3JQb3NpdGlvbilcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHR2YXIgZ2V0Q2FyZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdCAgICB2YXIgc3RhcnQgPSAwXG5cdCAgICB2YXIgbm9ybWFsaXplZFZhbHVlXG5cdCAgICB2YXIgcmFuZ2Vcblx0ICAgIHZhciB0ZXh0SW5wdXRSYW5nZVxuXHQgICAgdmFyIGxlblxuXHQgICAgdmFyIGVuZFJhbmdlXG5cblx0ICAgIGlmICh0eXBlb2YgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHRhcmdldC5zZWxlY3Rpb25FbmQgPT0gXCJudW1iZXJcIikge1xuXHQgICAgICAgIHN0YXJ0ID0gdGFyZ2V0LnNlbGVjdGlvblN0YXJ0XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKClcblxuXHQgICAgICAgIGlmIChyYW5nZSAmJiByYW5nZS5wYXJlbnRFbGVtZW50KCkgPT0gdGFyZ2V0KSB7XG5cdCAgICAgICAgICAgIGxlbiA9IHRhcmdldC52YWx1ZS5sZW5ndGhcblx0ICAgICAgICAgICAgbm9ybWFsaXplZFZhbHVlID0gdGFyZ2V0LnZhbHVlLnJlcGxhY2UoL1xcclxcbi9nLCBcIlxcblwiKVxuXG5cdCAgICAgICAgICAgIHRleHRJbnB1dFJhbmdlID0gdGFyZ2V0LmNyZWF0ZVRleHRSYW5nZSgpXG5cdCAgICAgICAgICAgIHRleHRJbnB1dFJhbmdlLm1vdmVUb0Jvb2ttYXJrKHJhbmdlLmdldEJvb2ttYXJrKCkpXG5cblx0ICAgICAgICAgICAgZW5kUmFuZ2UgPSB0YXJnZXQuY3JlYXRlVGV4dFJhbmdlKClcblx0ICAgICAgICAgICAgZW5kUmFuZ2UuY29sbGFwc2UoZmFsc2UpXG5cblx0ICAgICAgICAgICAgaWYgKHRleHRJbnB1dFJhbmdlLmNvbXBhcmVFbmRQb2ludHMoXCJTdGFydFRvRW5kXCIsIGVuZFJhbmdlKSA+IC0xKSB7XG5cdCAgICAgICAgICAgICAgICBzdGFydCA9IGxlblxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgc3RhcnQgPSAtdGV4dElucHV0UmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIC1sZW4pXG5cdCAgICAgICAgICAgICAgICBzdGFydCArPSBub3JtYWxpemVkVmFsdWUuc2xpY2UoMCwgc3RhcnQpLnNwbGl0KFwiXFxuXCIpLmxlbmd0aCAtIDFcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHN0YXJ0XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZU1vZGVsQnlFdmVudFxuXG4vKioqLyB9LFxuLyogNTIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciB1cGRhdGVNb2RlbE1ldGhvZHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUzKVxuXG5cdGZ1bmN0aW9uIHVwZGF0ZU1vZGVsSGFuZGxlKGUpIHtcblx0ICAgIHZhciBlbGVtID0gdGhpc1xuXHQgICAgdmFyIGZpZWxkID0gdGhpcy5fX21zX2R1cGxleF9fXG5cdCAgICBpZiAoZWxlbS5jb21wb3NpbmcgfHwgZmllbGQucGFyc2UoZWxlbS52YWx1ZSkgPT09IGZpZWxkLmxhc3RWaWV3VmFsdWUpe1xuXHQgICAgICAgIC8v6Ziy5q2ib25wcm9wZXJ0eWNoYW5nZeW8leWPkeeIhuagiFxuXHQgICAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgICBpZiAoZWxlbS5jYXJldCkge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIHZhciBwb3MgPSBmaWVsZC5nZXRDYXJldChlbGVtKVxuXHQgICAgICAgICAgICBmaWVsZC5wb3MgPSBwb3Ncblx0ICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgIGF2YWxvbi53YXJuKCdmaXhDYXJldCBlcnJvcicsIGUpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgaWYgKGZpZWxkLmRlYm91bmNlVGltZSA+IDQpIHtcblx0ICAgICAgICB2YXIgdGltZXN0YW1wID0gbmV3IERhdGUoKVxuXHQgICAgICAgIHZhciBsZWZ0ID0gdGltZXN0YW1wIC0gZmllbGQudGltZSB8fCAwXG5cdCAgICAgICAgZmllbGQudGltZSA9IHRpbWVzdGFtcFxuXHQgICAgICAgIGlmIChsZWZ0ID49IGZpZWxkLmRlYm91bmNlVGltZSkge1xuXHQgICAgICAgICAgICB1cGRhdGVNb2RlbE1ldGhvZHNbZmllbGQudHlwZV0uY2FsbChmaWVsZClcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBjbGVhclRpbWVvdXQoZmllbGQuZGVib3VuY2VJRClcblx0ICAgICAgICAgICAgZmllbGQuZGVib3VuY2VJRCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdXBkYXRlTW9kZWxNZXRob2RzW2ZpZWxkLnR5cGVdLmNhbGwoZmllbGQpXG5cdCAgICAgICAgICAgIH0sIGxlZnQpXG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB1cGRhdGVNb2RlbE1ldGhvZHNbZmllbGQudHlwZV0uY2FsbChmaWVsZClcblx0ICAgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gdXBkYXRlTW9kZWxIYW5kbGVcblxuLyoqKi8gfSxcbi8qIDUzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHR2YXIgdXBkYXRlTW9kZWxNZXRob2RzID0ge1xuXHQgICAgaW5wdXQ6IGZ1bmN0aW9uIChwcm9wKSB7Ly/lpITnkIbljZXkuKp2YWx1ZeWAvOWkhOeQhlxuXHQgICAgICAgIHZhciBkYXRhID0gdGhpc1xuXHQgICAgICAgIHByb3AgPSBwcm9wIHx8ICd2YWx1ZSdcblx0ICAgICAgICB2YXIgZG9tID0gZGF0YS5kb21cblx0ICAgICAgICB2YXIgcmF3VmFsdWUgPSBkb21bcHJvcF1cblx0ICAgICAgICB2YXIgcGFyc2VkVmFsdWUgPSBkYXRhLnBhcnNlKHJhd1ZhbHVlKVxuXHQgICAgICAgIHZhciBmb3JtYXRlZFZhbHVlID0gZGF0YS5mb3JtYXQoZGF0YS52bW9kZWwsIHBhcnNlZFZhbHVlKVxuXHQgICAgICAgIGRhdGEubGFzdFZpZXdWYWx1ZSA9IGZvcm1hdGVkVmFsdWVcblx0ICAgICAgICAvL+acieaXtuWAmXBhcnNl5ZCO5LiA6Ie0LHZt5LiN5Lya5pS55Y+YLOS9hmlucHV06YeM6Z2i55qE5YC8XG5cdCAgICAgICAgaWYgKHBhcnNlZFZhbHVlICE9PSBkYXRhLm1vZGVsVmFsdWUpIHtcblx0ICAgICAgICAgICAgZGF0YS5zZXQoZGF0YS52bW9kZWwsIHBhcnNlZFZhbHVlKVxuXHQgICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxuXHQgICAgICAgIH1cblx0ICAgICAgIFxuXHQgICAgICAgIGRvbVtwcm9wXSA9IGZvcm1hdGVkVmFsdWVcblx0ICAgICAgXG5cdCAgICAgICAgdmFyIHBvcyA9IGRhdGEucG9zXG5cdCAgICAgICAgaWYgKGRvbS5jYXJldCApIHtcblx0ICAgICAgICAgICAgZGF0YS5zZXRDYXJldChkb20sIHBvcylcblx0ICAgICAgICAgfVxuXHQgICAgICAgIC8vdm0uYWFhID0gJzEyMzQ1Njc4OTAnXG5cdCAgICAgICAgLy/lpITnkIYgPGlucHV0IG1zLWR1cGxleD0nQGFhYXxsaW1pdEJ5KDgpJy8+e3tAYWFhfX0g6L+Z56eN5qC85byP5YyW5ZCM5q2l5LiN5LiA6Ie055qE5oOF5Ya1IFxuXG5cdCAgICB9LFxuXHQgICAgcmFkaW86IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgZGF0YSA9IHRoaXNcblx0ICAgICAgICBpZiAoZGF0YS5pc0NoZWNrZWQpIHtcblx0ICAgICAgICAgICAgdmFyIHZhbCA9ICFkYXRhLm1vZGVsVmFsdWVcblx0ICAgICAgICAgICAgZGF0YS5zZXQoZGF0YS52bW9kZWwsIHZhbClcblx0ICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB1cGRhdGVNb2RlbE1ldGhvZHMuaW5wdXQuY2FsbChkYXRhKVxuXHQgICAgICAgICAgICBkYXRhLmxhc3RWaWV3VmFsdWUgPSBOYU5cblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgY2hlY2tib3g6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgZGF0YSA9IHRoaXNcblx0ICAgICAgICB2YXIgYXJyYXkgPSBkYXRhLm1vZGVsVmFsdWVcblx0ICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG5cdCAgICAgICAgICAgIGF2YWxvbi53YXJuKCdtcy1kdXBsZXjlupTnlKjkuo5jaGVja2JveOS4iuimgeWvueW6lOS4gOS4quaVsOe7hCcpXG5cdCAgICAgICAgICAgIGFycmF5ID0gW2FycmF5XVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgbWV0aG9kID0gZGF0YS5kb20uY2hlY2tlZCA/ICdlbnN1cmUnIDogJ3JlbW92ZSdcblx0ICAgICAgICBcblx0ICAgICAgICBpZiAoYXJyYXlbbWV0aG9kXSkge1xuXHQgICAgICAgICAgICB2YXIgdmFsID0gZGF0YS5wYXJzZShkYXRhLmRvbS52YWx1ZSlcblx0ICAgICAgICAgICAgYXJyYXlbbWV0aG9kXSh2YWwpXG5cdCAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXG5cdCAgICAgICAgfVxuXG5cdCAgICB9LFxuXHQgICAgc2VsZWN0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGRhdGEgPSB0aGlzXG5cdCAgICAgICAgdmFyIHZhbCA9IGF2YWxvbihkYXRhLmRvbSkudmFsKCkgLy/lrZfnrKbkuLLmiJblrZfnrKbkuLLmlbDnu4Rcblx0ICAgICAgICBpZiAodmFsICsgJycgIT09IHRoaXMubW9kZWxWYWx1ZSArICcnKSB7XG5cdCAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHsgLy/ovazmjaLluIPlsJTmlbDnu4TmiJblhbbku5Zcblx0ICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5tYXAoZnVuY3Rpb24gKHYpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5wYXJzZSh2KVxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHZhbCA9IGRhdGEucGFyc2UodmFsKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGRhdGEuc2V0KGRhdGEudm1vZGVsLCB2YWwpXG5cdCAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGNvbnRlbnRlZGl0YWJsZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHVwZGF0ZU1vZGVsTWV0aG9kcy5pbnB1dC5jYWxsKHRoaXMsICdpbm5lckhUTUwnKVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gY2FsbGJhY2soZGF0YSkge1xuXHQgICAgaWYgKGRhdGEuY2FsbGJhY2spIHtcblx0ICAgICAgICBkYXRhLmNhbGxiYWNrLmNhbGwoZGF0YS52bW9kZWwsIHtcblx0ICAgICAgICAgICAgdHlwZTogJ2NoYW5nZWQnLFxuXHQgICAgICAgICAgICB0YXJnZXQ6IGRhdGEuZG9tXG5cdCAgICAgICAgfSlcblx0ICAgIH1cblx0fVxuXG5cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZU1vZGVsTWV0aG9kc1xuXG5cbi8qKiovIH0sXG4vKiA1NCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIHZhbHVlSGlqYWNrID0gZmFsc2Vcblx0dHJ5IHsgLy8jMjcyIElFOS1JRTExLCBmaXJlZm94XG5cdCAgICB2YXIgc2V0dGVycyA9IHt9XG5cdCAgICB2YXIgYXByb3RvID0gSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGVcblx0ICAgIHZhciBicHJvdG8gPSBIVE1MVGV4dEFyZWFFbGVtZW50LnByb3RvdHlwZVxuXHQgICAgZnVuY3Rpb24gbmV3U2V0dGVyKHZhbHVlKSB7IC8vIGpzaGludCBpZ25vcmU6bGluZVxuXHQgICAgICAgIHNldHRlcnNbdGhpcy50YWdOYW1lXS5jYWxsKHRoaXMsIHZhbHVlKVxuXHQgICAgICAgIGlmICghdGhpcy5jYXJldCAmJiB0aGlzLl9fbXNfZHVwbGV4X18pIHtcblx0ICAgICAgICAgICAgdGhpcy5fX21zX2R1cGxleF9fLnVwZGF0ZS5jYWxsKHRoaXMpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgdmFyIGlucHV0UHJvdG8gPSBIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZVxuXHQgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5wdXRQcm90bykgLy/mlYXmhI/lvJXlj5FJRTYtOOetiea1j+iniOWZqOaKpemUmVxuXHQgICAgc2V0dGVyc1snSU5QVVQnXSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXByb3RvLCAndmFsdWUnKS5zZXRcblxuXHQgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFwcm90bywgJ3ZhbHVlJywge1xuXHQgICAgICAgIHNldDogbmV3U2V0dGVyXG5cdCAgICB9KVxuXHQgICAgc2V0dGVyc1snVEVYVEFSRUEnXSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYnByb3RvLCAndmFsdWUnKS5zZXRcblx0ICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShicHJvdG8sICd2YWx1ZScsIHtcblx0ICAgICAgICBzZXQ6IG5ld1NldHRlclxuXHQgICAgfSlcblx0ICAgIHZhbHVlSGlqYWNrID0gdHJ1ZVxuXHR9IGNhdGNoIChlKSB7XG5cdCAgICAvL+WcqGNocm9tZSA0M+S4rSBtcy1kdXBsZXjnu4jkuo7kuI3pnIDopoHkvb/nlKjlrprml7blmajlrp7njrDlj4zlkJHnu5HlrprkuoZcblx0ICAgIC8vIGh0dHA6Ly91cGRhdGVzLmh0bWw1cm9ja3MuY29tLzIwMTUvMDQvRE9NLWF0dHJpYnV0ZXMtbm93LW9uLXRoZS1wcm90b3R5cGVcblx0ICAgIC8vIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMWp3QThtdENsd3hJLVFKdUhUNzg3MlowcHhwWno4UEJrZjJiR0Fic1V0cXMvZWRpdD9wbGk9MVxuXHR9XG5cdG1vZHVsZS5leHBvcnRzID0gdmFsdWVIaWphY2tcblxuLyoqKi8gfSxcbi8qIDU1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcblx0dmFyIHVwZGF0ZVZpZXcgPSB7XG5cdCAgICBpbnB1dDogZnVuY3Rpb24gKCkgey8v5aSE55CG5Y2V5LiqdmFsdWXlgLzlpITnkIZcblx0ICAgICAgICB0aGlzLmRvbS52YWx1ZSA9IHRoaXMudmlld1ZhbHVlXG5cdCAgICB9LFxuXHQgICAgcmFkaW86IGZ1bmN0aW9uICgpIHsvL+WkhOeQhuWNleS4qmNoZWNrZWTlsZ7mgKdcblx0ICAgICAgICB2YXIgY2hlY2tlZFxuXHQgICAgICAgIGlmICh0aGlzLmlzQ2hlY2tlZCkge1xuXHQgICAgICAgICAgICBjaGVja2VkID0gISF0aGlzLm1vZGVsVmFsdWVcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBjaGVja2VkID0gdGhpcy52aWV3VmFsdWUgKyAnJyA9PT0gdGhpcy5kb20udmFsdWVcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGRvbSA9IHRoaXMuZG9tXG5cdCAgICAgICAgaWYgKGF2YWxvbi5tc2llID09PSA2KSB7XG5cdCAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgLy9JRTggY2hlY2tib3gsIHJhZGlv5piv5L2/55SoZGVmYXVsdENoZWNrZWTmjqfliLbpgInkuK3nirbmgIHvvIxcblx0ICAgICAgICAgICAgICAgIC8v5bm25LiU6KaB5YWI6K6+572uZGVmYXVsdENoZWNrZWTlkI7orr7nva5jaGVja2VkXG5cdCAgICAgICAgICAgICAgICAvL+W5tuS4lOW/hemhu+iuvue9ruW7tui/n1xuXHQgICAgICAgICAgICAgICAgZG9tLmRlZmF1bHRDaGVja2VkID0gY2hlY2tlZFxuXHQgICAgICAgICAgICAgICAgZG9tLmNoZWNrZWQgPSBjaGVja2VkXG5cdCAgICAgICAgICAgIH0sIDMxKVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGRvbS5jaGVja2VkID0gY2hlY2tlZFxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBjaGVja2JveDogZnVuY3Rpb24gKCkgey8v5aSE55CG5aSa5LiqY2hlY2tlZOWxnuaAp1xuXHQgICAgICAgIHZhciBjaGVja2VkID0gZmFsc2Vcblx0ICAgICAgICB2YXIgZG9tID0gdGhpcy5kb21cblx0ICAgICAgICB2YXIgdmFsdWUgPSBkb20udmFsdWVcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubW9kZWxWYWx1ZS5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICB2YXIgZWwgPSB0aGlzLm1vZGVsVmFsdWVbaV1cblx0ICAgICAgICAgICAgaWYgKGVsICsgJycgPT09IHZhbHVlKSB7XG5cdCAgICAgICAgICAgICAgICBjaGVja2VkID0gdHJ1ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRvbS5jaGVja2VkID0gY2hlY2tlZFxuXHQgICAgfSxcblx0ICAgIHNlbGVjdDogZnVuY3Rpb24gKCkgey8v5aSE55CG5a2Q57qn55qEc2VsZWN0ZWTlsZ7mgKdcblx0ICAgICAgICB2YXIgYSA9IEFycmF5LmlzQXJyYXkodGhpcy52aWV3VmFsdWUpID9cblx0ICAgICAgICAgICAgICAgIHRoaXMudmlld1ZhbHVlLm1hcChTdHJpbmcpIDogdGhpcy52aWV3VmFsdWUgKyAnJ1xuXHQgICAgICAgIGF2YWxvbih0aGlzLmRvbSkudmFsKGEpXG5cdCAgICB9LFxuXHQgICAgY29udGVudGVkaXRhYmxlOiBmdW5jdGlvbiAoKSB7Ly/lpITnkIbljZXkuKppbm5lckhUTUxcblx0ICAgICAgICB0aGlzLmRvbS5pbm5lckhUTUwgPSB0aGlzLnZpZXdWYWx1ZVxuXHQgICAgICAgIHRoaXMudXBkYXRlLmNhbGwodGhpcy5kb20pXG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZVZpZXdcblxuXG4vKioqLyB9LFxuLyogNTYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFkZEZpZWxkKG5vZGUsIHZub2RlKSB7XG5cdCAgICB2YXIgZmllbGQgPSBub2RlLl9fbXNfZHVwbGV4X19cblx0ICAgIHZhciBydWxlcyA9IHZub2RlWydtcy1ydWxlcyddXG5cdCAgICBpZiAocnVsZXMgJiYgIWZpZWxkLnZhbGlkYXRvcikge1xuXHQgICAgICAgIHdoaWxlIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IDEpIHtcblx0ICAgICAgICAgICAgdmFyIHZhbGlkYXRvciA9IG5vZGUuX21zX3ZhbGlkYXRvcl9cblx0ICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xuXHQgICAgICAgICAgICAgICAgZmllbGQucnVsZXMgPSBydWxlc1xuXHQgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdG9yID0gdmFsaWRhdG9yXG5cdCAgICAgICAgICAgICAgICBpZihhdmFsb24uQXJyYXkuZW5zdXJlKHZhbGlkYXRvci5maWVsZHMsIGZpZWxkKSl7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yLmFkZEZpZWxkKGZpZWxkKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDU3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblxuXHR2YXIgZGlyID0gYXZhbG9uLmRpcmVjdGl2ZSgndmFsaWRhdGUnLCB7XG5cdC8v6aqM6K+B5Y2V5Liq6KGo5Y2V5YWD57SgXG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgdmFyIHZhbGlkYXRvciA9IGNvcHlbbmFtZV1cblx0ICAgICAgICB2YXIgcCA9IHNyY1tuYW1lXVxuXHQgICAgICAgIGlmIChwICYmIHAub25FcnJvciAmJiBwLmFkZEZpZWxkKSB7XG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0KHZhbGlkYXRvcikgPT09IHZhbGlkYXRvcikge1xuXHQgICAgICAgICAgICBzcmMudm1WYWxpZGF0b3IgPSB2YWxpZGF0b3Jcblx0ICAgICAgICAgICAgaWYgKHZhbGlkYXRvci4kaWQpIHsvL+i9rOaNouS4uuaZrumAmuWvueixoVxuXHQgICAgICAgICAgICAgICAgdmFsaWRhdG9yID0gdmFsaWRhdG9yLiRtb2RlbFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgXG5cdCAgICAgICAgICAgIHNyY1tuYW1lXSA9IHZhbGlkYXRvclxuXHQgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGRpci5kZWZhdWx0cykge1xuXHQgICAgICAgICAgICAgICAgaWYgKCF2YWxpZGF0b3IuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JbbmFtZV0gPSBkaXIuZGVmYXVsdHNbbmFtZV1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YWxpZGF0b3IuZmllbGRzID0gdmFsaWRhdG9yLmZpZWxkcyB8fCBbXVxuXHQgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnVwZGF0ZSlcblxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uIChkb20sIHZkb20pIHtcblx0ICAgICAgICB2YXIgdmFsaWRhdG9yID0gdmRvbVsnbXMtdmFsaWRhdGUnXVxuXHQgICAgICAgIGRvbS5fbXNfdmFsaWRhdG9yXyA9IHZhbGlkYXRvclxuXHQgICAgICAgIHZhbGlkYXRvci5kb20gPSBkb21cblx0ICAgICAgICB2YXIgdiA9IHZkb20udm1WYWxpZGF0b3IgXG5cdCAgICAgICAgdHJ5e1xuXHQgICAgICAgICAgIHYub25NYW51YWwgPSBvbk1hbnVhbFxuXHQgICAgICAgIH1jYXRjaChlKXt9XG5cdCAgICAgICAgZGVsZXRlIHZkb20udm1WYWxpZGF0b3IgXG5cdCAgICAgICAgZG9tLnNldEF0dHJpYnV0ZShcIm5vdmFsaWRhdGVcIiwgXCJub3ZhbGlkYXRlXCIpXG5cdCAgICAgICAgZnVuY3Rpb24gb25NYW51YWwoKSB7XG5cdCAgICAgICAgICAgIGRpci52YWxpZGF0ZUFsbC5jYWxsKHZhbGlkYXRvciwgdmFsaWRhdG9yLm9uVmFsaWRhdGVBbGwpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh2YWxpZGF0b3IudmFsaWRhdGVBbGxJblN1Ym1pdCkge1xuXHQgICAgICAgICAgICBhdmFsb24uYmluZChkb20sIFwic3VibWl0XCIsIGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblx0ICAgICAgICAgICAgICAgIG9uTWFudWFsKClcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICB9XG5cdCAgICAgICBcblx0ICAgICAgICBpZiAodHlwZW9mIHZhbGlkYXRvci5vbkluaXQgPT09IFwiZnVuY3Rpb25cIikgeyAvL3Ztb2RlbHPmmK/kuI3ljIXmi6x2bW9kZWznmoRcblx0ICAgICAgICAgICAgdmFsaWRhdG9yLm9uSW5pdC5jYWxsKGRvbSwge1xuXHQgICAgICAgICAgICAgICAgdHlwZTogJ2luaXQnLFxuXHQgICAgICAgICAgICAgICAgdGFyZ2V0OiBkb20sXG5cdCAgICAgICAgICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvclxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICB2YWxpZGF0ZUFsbDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdCAgICAgICAgdmFyIHZhbGlkYXRvciA9IHRoaXNcblx0ICAgICAgICB2YXIgZm4gPSB0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIiA/IGNhbGxiYWNrIDogdmFsaWRhdG9yLm9uVmFsaWRhdGVBbGxcblx0ICAgICAgICB2YXIgcHJvbWlzZSA9IHZhbGlkYXRvci5maWVsZHMuZmlsdGVyKGZ1bmN0aW9uIChmaWVsZCkge1xuXHQgICAgICAgICAgICB2YXIgZWwgPSBmaWVsZC5kb21cblx0ICAgICAgICAgICAgcmV0dXJuIGVsICYmICFlbC5kaXNhYmxlZCAmJiB2YWxpZGF0b3IuZG9tLmNvbnRhaW5zKGVsKVxuXHQgICAgICAgIH0pLm1hcChmdW5jdGlvbiAoZmllbGQpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGRpci52YWxpZGF0ZShmaWVsZCwgdHJ1ZSlcblx0ICAgICAgICB9KVxuXHQgICAgICAgIHZhciByZWFzb25zID0gW11cblx0ICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlKS50aGVuKGZ1bmN0aW9uIChhcnJheSkge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gYXJyYXlbaSsrXTsgKSB7XG5cdCAgICAgICAgICAgICAgICByZWFzb25zID0gcmVhc29ucy5jb25jYXQoZWwpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKHZhbGlkYXRvci5kZWR1cGxpY2F0ZUluVmFsaWRhdGVBbGwpIHtcblx0ICAgICAgICAgICAgICAgIHZhciB1bmlxID0ge31cblx0ICAgICAgICAgICAgICAgIHJlYXNvbnMgPSByZWFzb25zLmZpbHRlcihmdW5jdGlvbiAoZmllbGQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSBmaWVsZC5kb21cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IGVsLnVuaXF1ZUlEIHx8IChlbC51bmlxdWVJRCA9IHNldFRpbWVvdXQoXCIxXCIpKVxuXHQgICAgICAgICAgICAgICAgICAgIGlmICh1bmlxW3V1aWRdKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHVuaXFbdXVpZF0gPSB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBmbi5jYWxsKHZhbGlkYXRvci5kb20sIHJlYXNvbnMpIC8v6L+Z6YeM5Y+q5pS+572u5pyq6YCa6L+H6aqM6K+B55qE57uE5Lu2XG5cdCAgICAgICAgfSlcblx0ICAgIH0sXG5cdCAgICBhZGRGaWVsZDogZnVuY3Rpb24gKGZpZWxkKSB7XG5cdCAgICAgICAgdmFyIHZhbGlkYXRvciA9IHRoaXNcblx0ICAgICAgICB2YXIgbm9kZSA9IGZpZWxkLmRvbVxuXHQgICAgICAgIGlmICh2YWxpZGF0b3IudmFsaWRhdGVJbktleXVwICYmICghZmllbGQuaXNDaGFuZ2VkICYmICFmaWVsZC5kZWJvdW5jZVRpbWUpKSB7XG5cdCAgICAgICAgICAgIGF2YWxvbi5iaW5kKG5vZGUsICdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XG5cdCAgICAgICAgICAgICAgICBkaXIudmFsaWRhdGUoZmllbGQsIDAsIGUpXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh2YWxpZGF0b3IudmFsaWRhdGVJbkJsdXIpIHtcblx0ICAgICAgICAgICAgYXZhbG9uLmJpbmQobm9kZSwgJ2JsdXInLCBmdW5jdGlvbiAoZSkge1xuXHQgICAgICAgICAgICAgICAgZGlyLnZhbGlkYXRlKGZpZWxkLCAwLCBlKVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodmFsaWRhdG9yLnJlc2V0SW5Gb2N1cykge1xuXHQgICAgICAgICAgICBhdmFsb24uYmluZChub2RlLCAnZm9jdXMnLCBmdW5jdGlvbiAoZSkge1xuXHQgICAgICAgICAgICAgICAgdmFsaWRhdG9yLm9uUmVzZXQuY2FsbChub2RlLCBlLCBmaWVsZClcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIChmaWVsZCwgaXNWYWxpZGF0ZUFsbCwgZXZlbnQpIHtcblx0ICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXVxuXHQgICAgICAgIHZhciB2YWx1ZSA9IGZpZWxkLm1vZGVsVmFsdWVcblx0ICAgICAgICB2YXIgZWxlbSA9IGZpZWxkLmRvbVxuXHQgICAgICAgIHZhciB2YWxpZGF0b3IgPSBmaWVsZC52YWxpZGF0b3Jcblx0ICAgICAgICBpZiAoZWxlbS5kaXNhYmxlZClcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgZm9yICh2YXIgcnVsZU5hbWUgaW4gZmllbGQucnVsZXMpIHtcblx0ICAgICAgICAgICAgdmFyIHJ1bGVWYWx1ZSA9IGZpZWxkLnJ1bGVzW3J1bGVOYW1lXVxuXHQgICAgICAgICAgICBpZiAocnVsZVZhbHVlID09PSBmYWxzZSlcblx0ICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgIHZhciBob29rID0gYXZhbG9uLnZhbGlkYXRvcnNbcnVsZU5hbWVdXG5cdCAgICAgICAgICAgIHZhciByZXNvbHZlLCByZWplY3Rcblx0ICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikge1xuXHQgICAgICAgICAgICAgICAgcmVzb2x2ZSA9IGFcblx0ICAgICAgICAgICAgICAgIHJlamVjdCA9IGJcblx0ICAgICAgICAgICAgfSkpXG5cdCAgICAgICAgICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChmaWVsZC5ub3JlcXVpcmVkICYmIHZhbHVlID09PSBcIlwiKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYSA9IHRydWVcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmIChhKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmVhc29uID0ge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBmaWVsZC5kYXRhLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtXCIgKyBydWxlTmFtZSArIFwiLW1lc3NhZ2VcIikgfHwgZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1lc3NhZ2VcIikgfHwgaG9vay5tZXNzYWdlLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZVJ1bGU6IHJ1bGVOYW1lLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBnZXRNZXNzYWdlOiBnZXRNZXNzYWdlXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVhc29uKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGZpZWxkLmRhdGEgPSB7fVxuXHQgICAgICAgICAgICBmaWVsZC5kYXRhW3J1bGVOYW1lXSA9IHJ1bGVWYWx1ZVxuXHQgICAgICAgICAgICBob29rLmdldCh2YWx1ZSwgZmllbGQsIG5leHQpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciByZWFzb25zID0gW11cblx0ICAgICAgICAvL+WmguaenHByb21pc2Vz5LiN5Li656m677yM6K+05piO57uP6L+H6aqM6K+B5oum5oiq5ZmoXG5cdCAgICAgICAgdmFyIGxhc3RQcm9taXNlID0gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKGFycmF5KSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSBhcnJheVtpKytdOyApIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZWwgPT09IFwib2JqZWN0XCIpIHtcblx0ICAgICAgICAgICAgICAgICAgICByZWFzb25zLnB1c2goZWwpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKCFpc1ZhbGlkYXRlQWxsKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAocmVhc29ucy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3Iub25FcnJvci5jYWxsKGVsZW0sIHJlYXNvbnMsIGV2ZW50KVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3Iub25TdWNjZXNzLmNhbGwoZWxlbSwgcmVhc29ucywgZXZlbnQpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB2YWxpZGF0b3Iub25Db21wbGV0ZS5jYWxsKGVsZW0sIHJlYXNvbnMsIGV2ZW50KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiByZWFzb25zXG5cdCAgICAgICAgfSlcblx0ICAgICAgICByZXR1cm4gbGFzdFByb21pc2Vcblx0ICAgIH1cblx0fSlcblxuXHR2YXIgcmZvcm1hdCA9IC9cXFxcP3t7KFtee31dKylcXH19L2dtXG5cblx0ZnVuY3Rpb24gZ2V0TWVzc2FnZSgpIHtcblx0ICAgIHZhciBkYXRhID0gdGhpcy5kYXRhIHx8IHt9XG5cdCAgICByZXR1cm4gdGhpcy5tZXNzYWdlLnJlcGxhY2UocmZvcm1hdCwgZnVuY3Rpb24gKF8sIG5hbWUpIHtcblx0ICAgICAgICByZXR1cm4gZGF0YVtuYW1lXSA9PSBudWxsID8gXCJcIiA6IGRhdGFbbmFtZV1cblx0ICAgIH0pXG5cdH1cblx0ZGlyLmRlZmF1bHRzID0ge1xuXHQgICAgYWRkRmllbGQ6IGRpci5hZGRGaWVsZCwvL+S+m+WGhemDqOS9v+eUqCzmlLbpm4bmraTlhYPntKDlupXkuIvnmoTmiYDmnIltcy1kdXBsZXjnmoTln5/lr7nosaFcblx0ICAgIG9uRXJyb3I6IGF2YWxvbi5ub29wLFxuXHQgICAgb25TdWNjZXNzOiBhdmFsb24ubm9vcCxcblx0ICAgIG9uQ29tcGxldGU6IGF2YWxvbi5ub29wLFxuXHQgICAgb25NYW51YWw6IGF2YWxvbi5ub29wLFxuXHQgICAgb25SZXNldDogYXZhbG9uLm5vb3AsXG5cdCAgICBvblZhbGlkYXRlQWxsOiBhdmFsb24ubm9vcCxcblx0ICAgIHZhbGlkYXRlSW5CbHVyOiB0cnVlLCAvL0Bjb25maWcge0Jvb2xlYW59IHRydWXvvIzlnKhibHVy5LqL5Lu25Lit6L+b6KGM6aqM6K+BLOinpuWPkW9uU3VjY2Vzcywgb25FcnJvciwgb25Db21wbGV0ZeWbnuiwg1xuXHQgICAgdmFsaWRhdGVJbktleXVwOiB0cnVlLCAvL0Bjb25maWcge0Jvb2xlYW59IHRydWXvvIzlnKhrZXl1cOS6i+S7tuS4rei/m+ihjOmqjOivgSzop6blj5FvblN1Y2Nlc3MsIG9uRXJyb3IsIG9uQ29tcGxldGXlm57osINcblx0ICAgIHZhbGlkYXRlQWxsSW5TdWJtaXQ6IHRydWUsIC8vQGNvbmZpZyB7Qm9vbGVhbn0gdHJ1Ze+8jOWcqHN1Ym1pdOS6i+S7tuS4reaJp+ihjG9uVmFsaWRhdGVBbGzlm57osINcblx0ICAgIHJlc2V0SW5Gb2N1czogdHJ1ZSwgLy9AY29uZmlnIHtCb29sZWFufSB0cnVl77yM5ZyoZm9jdXPkuovku7bkuK3miafooYxvblJlc2V05Zue6LCDLFxuXHQgICAgZGVkdXBsaWNhdGVJblZhbGlkYXRlQWxsOiBmYWxzZSAvL0Bjb25maWcge0Jvb2xlYW59IGZhbHNl77yM5ZyodmFsaWRhdGVBbGzlm57osIPkuK3lr7lyZWFzb27mlbDnu4TmoLnmja7lhYPntKDoioLngrnov5vooYzljrvph41cblx0fVxuXG4vKioqLyB9LFxuLyogNTggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ3J1bGVzJywge1xuXHQgICAgcGFyc2U6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIGJpbmRpbmcpIHtcblx0ICAgICAgICB2YXIgcnVsZXMgPSBiaW5kaW5nLmV4cHJcblx0ICAgICAgICBpZiAoL3suK30vLnRlc3QocnVsZXMpKSB7XG5cdCAgICAgICAgICAgIGNvcHlbYmluZGluZy5uYW1lXSA9IGF2YWxvbi5wYXJzZUV4cHIoYmluZGluZylcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgZGlmZjogZnVuY3Rpb24gKGNvcHksIHNyYywgbmFtZSkge1xuXHQgICAgICAgIHNyY1tuYW1lXSA9IGNvcHlbbmFtZV1cblx0ICAgICAgICB2YXIgZmllbGQgPSBzcmMuZG9tICYmIHNyYy5kb20uX19tc19kdXBsZXhfX1xuXHQgICAgICAgIGlmIChmaWVsZCkge1xuXHQgICAgICAgICAgICBmaWVsZC5ydWxlcyA9IGNvcHlbbmFtZV1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH0pXG5cdGZ1bmN0aW9uIGlzUmVnRXhwKHZhbHVlKSB7XG5cdCAgICByZXR1cm4gYXZhbG9uLnR5cGUodmFsdWUpID09PSAncmVnZXhwJ1xuXHR9XG5cdHZhciBybWFpbCA9IC9eXFx3KyhbLSsuXVxcdyspKkBcXHcrKFstLl1cXHcrKSpcXC5cXHcrKFstLl1cXHcrKSokL2lcblx0dmFyIHJ1cmwgPSAvXihmdHB8aHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqQCk/KFxcUyspKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiVAIVxcLVxcL10pKT8kL1xuXHRmdW5jdGlvbiBpc0NvcnJlY3REYXRlKHZhbHVlKSB7XG5cdCAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlKSB7IC8v5piv5a2X56ym5Liy5L2G5LiN6IO95piv56m65a2X56ymXG5cdCAgICAgICAgdmFyIGFyciA9IHZhbHVlLnNwbGl0KFwiLVwiKSAvL+WPr+S7peiiqy3liIfmiJAz5Lu977yM5bm25LiU56ysMeS4quaYrzTkuKrlrZfnrKZcblx0ICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMyAmJiBhcnJbMF0ubGVuZ3RoID09PSA0KSB7XG5cdCAgICAgICAgICAgIHZhciB5ZWFyID0gfn5hcnJbMF0gLy/lhajpg6jovazmjaLkuLrpnZ7otJ/mlbTmlbBcblx0ICAgICAgICAgICAgdmFyIG1vbnRoID0gfn5hcnJbMV0gLSAxXG5cdCAgICAgICAgICAgIHZhciBkYXRlID0gfn5hcnJbMl1cblx0ICAgICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSlcblx0ICAgICAgICAgICAgcmV0dXJuIGQuZ2V0RnVsbFllYXIoKSA9PT0geWVhciAmJiBkLmdldE1vbnRoKCkgPT09IG1vbnRoICYmIGQuZ2V0RGF0ZSgpID09PSBkYXRlXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGZhbHNlXG5cdH1cblx0YXZhbG9uLnNoYWRvd0NvcHkoYXZhbG9uLnZhbGlkYXRvcnMsIHtcblx0ICAgIHBhdHRlcm46IHtcblx0ICAgICAgICBtZXNzYWdlOiAn5b+F6aG75Yy56YWNe3twYXR0ZXJufX3ov5nmoLfnmoTmoLzlvI8nLFxuXHQgICAgICAgIGdldDogZnVuY3Rpb24gKHZhbHVlLCBmaWVsZCwgbmV4dCkge1xuXHQgICAgICAgICAgICB2YXIgZWxlbSA9IGZpZWxkLmVsZW1lbnRcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSBmaWVsZC5kYXRhXG5cdCAgICAgICAgICAgIGlmICghaXNSZWdFeHAoZGF0YS5wYXR0ZXJuKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGg1cGF0dGVybiA9IGVsZW0uZ2V0QXR0cmlidXRlKFwicGF0dGVyblwiKVxuXHQgICAgICAgICAgICAgICAgZGF0YS5wYXR0ZXJuID0gbmV3IFJlZ0V4cCgnXig/OicgKyBoNXBhdHRlcm4gKyAnKSQnKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG5leHQoZGF0YS5wYXR0ZXJuLnRlc3QodmFsdWUpKVxuXHQgICAgICAgICAgICByZXR1cm4gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgZGlnaXRzOiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ+W/hemhu+aVtOaVsCcsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7Ly/mlbTmlbBcblx0ICAgICAgICAgICAgbmV4dCgvXlxcLT9cXGQrJC8udGVzdCh2YWx1ZSkpXG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBudW1iZXI6IHtcblx0ICAgICAgICBtZXNzYWdlOiAn5b+F6aG75pWw5a2XJyxcblx0ICAgICAgICBnZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQsIG5leHQpIHsvL+aVsOWAvFxuXHQgICAgICAgICAgICBuZXh0KGlzRmluaXRlKHZhbHVlKSlcblx0ICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHJlcXVpcmVkOiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ+W/hemhu+Whq+WGmScsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7XG5cdCAgICAgICAgICAgIG5leHQodmFsdWUgIT09IFwiXCIpXG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBlcXVhbHRvOiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ+Wvhueggei+k+WFpeS4jeS4gOiHtCcsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7XG5cdCAgICAgICAgICAgIHZhciBpZCA9IFN0cmluZyhmaWVsZC5kYXRhLmVxdWFsdG8pXG5cdCAgICAgICAgICAgIHZhciBvdGhlciA9IGF2YWxvbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpLnZhbCgpIHx8IFwiXCJcblx0ICAgICAgICAgICAgbmV4dCh2YWx1ZSA9PT0gb3RoZXIpXG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBkYXRlOiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ+aXpeacn+agvOW8j+S4jeato+ehricsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7XG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gZmllbGQuZGF0YVxuXHQgICAgICAgICAgICBpZiAoYXZhbG9uLnR5cGUoZGF0YS5kYXRlKSA9PT0gJ3JlZ2V4cCcpIHtcblx0ICAgICAgICAgICAgICAgIG5leHQoZGF0YS5kYXRlLnRlc3QodmFsdWUpKVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgbmV4dChpc0NvcnJlY3REYXRlKHZhbHVlKSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdXJsOiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ1VSTOagvOW8j+S4jeato+ehricsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7XG5cdCAgICAgICAgICAgIG5leHQocnVybC50ZXN0KHZhbHVlKSlcblx0ICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGVtYWlsOiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ2VtYWls5qC85byP5LiN5q2j56GuJyxcblx0ICAgICAgICBnZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQsIG5leHQpIHtcblx0ICAgICAgICAgICAgbmV4dChybWFpbC50ZXN0KHZhbHVlKSlcblx0ICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIG1pbmxlbmd0aDoge1xuXHQgICAgICAgIG1lc3NhZ2U6ICfmnIDlsJHovpPlhaV7e21pbmxlbmd0aH195Liq5a2XJyxcblx0ICAgICAgICBnZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZmllbGQsIG5leHQpIHtcblx0ICAgICAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KGZpZWxkLmRhdGEubWlubGVuZ3RoLCAxMClcblx0ICAgICAgICAgICAgbmV4dCh2YWx1ZS5sZW5ndGggPj0gbnVtKVxuXHQgICAgICAgICAgICByZXR1cm4gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgbWF4bGVuZ3RoOiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ+acgOWkmui+k+WFpXt7bWF4bGVuZ3RofX3kuKrlrZcnLFxuXHQgICAgICAgIGdldDogZnVuY3Rpb24gKHZhbHVlLCBmaWVsZCwgbmV4dCkge1xuXHQgICAgICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQoZmllbGQuZGF0YS5tYXhsZW5ndGgsIDEwKVxuXHQgICAgICAgICAgICBuZXh0KHZhbHVlLmxlbmd0aCA8PSBudW0pXG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBtaW46IHtcblx0ICAgICAgICBtZXNzYWdlOiAn6L6T5YWl5YC85LiN6IO95bCP5LqOe3ttaW59fScsXG5cdCAgICAgICAgZ2V0OiBmdW5jdGlvbiAodmFsdWUsIGZpZWxkLCBuZXh0KSB7XG5cdCAgICAgICAgICAgIHZhciBudW0gPSBwYXJzZUludChmaWVsZC5kYXRhLm1pbiwgMTApXG5cdCAgICAgICAgICAgIG5leHQocGFyc2VGbG9hdCh2YWx1ZSkgPj0gbnVtKVxuXHQgICAgICAgICAgICByZXR1cm4gdmFsdWVcblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgbWF4OiB7XG5cdCAgICAgICAgbWVzc2FnZTogJ+i+k+WFpeWAvOS4jeiDveWkp+S6jnt7bWF4fX0nLFxuXHQgICAgICAgIGdldDogZnVuY3Rpb24gKHZhbHVlLCBmaWVsZCwgbmV4dCkge1xuXHQgICAgICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQoZmllbGQuZGF0YS5tYXgsIDEwKVxuXHQgICAgICAgICAgICBuZXh0KHBhcnNlRmxvYXQodmFsdWUpIDw9IG51bSlcblx0ICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGNoczoge1xuXHQgICAgICAgIG1lc3NhZ2U6ICflv4XpobvmmK/kuK3mloflrZfnrKYnLFxuXHQgICAgICAgIGdldDogZnVuY3Rpb24gKHZhbHVlLCBmaWVsZCwgbmV4dCkge1xuXHQgICAgICAgICAgICBuZXh0KC9eW1xcdTRlMDAtXFx1OWZhNV0rJC8udGVzdCh2YWx1ZSkpXG5cdCAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fSlcblxuLyoqKi8gfSxcbi8qIDU5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblx0Ly9tcy1pbXBvcmFudCBtcy1jb250cm9sbGVyIG1zLWZvciBtcy13aWRnZXQgbXMtZWZmZWN0IG1zLWlmICAgLi4uXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ2lmJywge1xuXHQgICAgcHJpb3JpdHk6IDYsXG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBuYW1lKSB7XG5cdCAgICAgICAgdmFyIGN1ciA9ICEhY29weVtuYW1lXVxuXHQgICAgICAgIHZhciBvbGQgPSBzcmNbbmFtZV1cblx0ICAgICAgICBzcmNbbmFtZV0gPSBjdXJcblx0ICAgICAgICBpZiAoc3JjLmV4ZWNJZikge1xuXHQgICAgICAgICAgICBpZiAoIWN1cikge1xuXHQgICAgICAgICAgICAgICAgY29weS5ub2RlVHlwZSA9IDhcblx0ICAgICAgICAgICAgICAgIGNvcHkub3JkZXIgPSAnJyAvL+S4jeWGjeaJp+ihjOWtkOWtmeiKgueCueeahOaTjeS9nFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChjb3B5ID09PSBzcmMgfHwgY3VyICE9PSBvbGQpIHtcblx0ICAgICAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGUsICdhZnRlckNoYW5nZScpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRvbSwgdmRvbSwgcGFyZW50KSB7XG5cdCAgICAgICAgdmFyIHNob3cgPSB2ZG9tWydtcy1pZiddXG5cdCAgICAgICAgdmRvbS5leGVjSWYgPSB0cnVlXG5cdCAgICAgICAgaWYgKHNob3cpIHtcblx0ICAgICAgICAgICAgLy/opoHnp7vpmaTlhYPntKDoioLngrks5Zyo5a+55bqU5L2N572u5LiK5o+S5YWl5rOo6YeK6IqC54K5XG5cdCAgICAgICAgICAgIHZkb20ubm9kZVR5cGUgPSAxXG5cdCAgICAgICAgICAgIHZkb20ubm9kZVZhbHVlID0gbnVsbFxuXHQgICAgICAgICAgICB2YXIgY29tbWVudCA9IHZkb20uY29tbWVudFxuXHQgICAgICAgICAgICBpZiAoIWNvbW1lbnQpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHBhcmVudCA9IGNvbW1lbnQucGFyZW50Tm9kZVxuXHQgICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGRvbSwgY29tbWVudClcblx0ICAgICAgICAgICAgYXZhbG9uLmFwcGx5RWZmZWN0KGRvbSwgdmRvbSwge1xuXHQgICAgICAgICAgICAgICAgaG9vazogJ29uRW50ZXJEb25lJ1xuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGF2YWxvbi5hcHBseUVmZmVjdChkb20sIHZkb20sIHtcblx0ICAgICAgICAgICAgICAgIGhvb2s6ICdvbkxlYXZlRG9uZScsXG5cdCAgICAgICAgICAgICAgICBjYjogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBjb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnbXMtaWYnKVxuXHQgICAgICAgICAgICAgICAgICAgIC8v5Y675o6J5rOo6YeK6IqC54K55Li05pe25re75Yqg55qEbXMtZWZmZWN0XG5cdCAgICAgICAgICAgICAgICAgICAgLy9odHRwczovL2dpdGh1Yi5jb20vUnVieUxvdXZyZS9hdmFsb24vaXNzdWVzLzE1Nzdcblx0ICAgICAgICAgICAgICAgICAgICAvL+i/memHjOW/hemhu+iuvue9rm5vZGVWYWx1ZeS4um1zLWlmLOWQpuWImeS8muWcqOiKgueCueWvuem9kOeul+azleS4reWHuueOsOS5seWIoOiKgueCueeahEJVR1xuXHQgICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudCB8fCBkb20ucGFyZW50Tm9kZVxuXHQgICAgICAgICAgICAgICAgICAgIHZkb20ubm9kZVZhbHVlID0gJ21zLWlmJ1xuXHQgICAgICAgICAgICAgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoY29tbWVudCwgZG9tKVxuXHQgICAgICAgICAgICAgICAgICAgIHZkb20ubm9kZVR5cGUgPSA4XG5cdCAgICAgICAgICAgICAgICAgICAgdmRvbS5jb21tZW50ID0gY29tbWVudFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fSlcblxuXG5cbi8qKiovIH0sXG4vKiA2MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHVwZGF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpXG5cblx0dmFyIHJmb3JQcmVmaXggPSAvbXMtZm9yXFw6XFxzKi9cblx0dmFyIHJmb3JMZWZ0ID0gL15cXHMqXFwoXFxzKi9cblx0dmFyIHJmb3JSaWdodCA9IC9cXHMqXFwpXFxzKiQvXG5cdHZhciByZm9yU3BsaXQgPSAvXFxzKixcXHMqL1xuXHR2YXIgcmZvckFzID0gL1xccythc1xccysoWyRcXHddKykvXG5cdHZhciByaWRlbnQgPSAvXlskYS16QS1aX11bJGEtekEtWjAtOV9dKiQvXG5cdHZhciByaW52YWxpZCA9IC9eKG51bGx8dW5kZWZpbmVkfE5hTnx3aW5kb3d8dGhpc3xcXCRpbmRleHxcXCRpZCkkL1xuXHR2YXIgcmVjb25jaWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSlcblx0dmFyIHN0cmluZ2lmeSA9IF9fd2VicGFja19yZXF1aXJlX18oNTApXG5cblx0Ly92YXIgQ2FjaGUgPSByZXF1aXJlKCcuLi9zZWVkL2NhY2hlJylcblx0Ly92YXIgY2FjaGUgPSBuZXcgQ2FjaGUoMzEyKVxuXG5cblx0ZnVuY3Rpb24gZ2V0VHJhY2VLZXkoaXRlbSkge1xuXHQgICAgdmFyIHR5cGUgPSB0eXBlb2YgaXRlbVxuXHQgICAgcmV0dXJuIGl0ZW0gJiYgdHlwZSA9PT0gJ29iamVjdCcgPyBpdGVtLiRoYXNoY29kZSA6IHR5cGUgKyAnOicgKyBpdGVtXG5cdH1cblx0Ly9JRTYtOCxmdW5jdGlvbuWQjumdouayoeacieepuuagvFxuXHR2YXIgcmZ1bmN0aW9uID0gL15cXHMqZnVuY3Rpb25cXHMqXFwoKFteXFwpXSspXFwpL1xuXHRhdmFsb24uX2VhY2ggPSBmdW5jdGlvbiAob2JqLCBmbiwgbG9jYWwsIHZub2Rlcykge1xuXHQgICAgdmFyIHJlcGVhdCA9IFtdXG5cdCAgICB2bm9kZXMucHVzaChyZXBlYXQpXG5cdCAgICB2YXIgc3RyID0gKGZuICsgXCJcIikubWF0Y2gocmZ1bmN0aW9uKVxuXHQgICAgdmFyIGFyZ3MgPSBzdHJbMV1cblx0ICAgIHZhciBhcnIgPSBhcmdzLm1hdGNoKGF2YWxvbi5yd29yZClcblx0ICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBpdGVyYXRvcihpLCBvYmpbaV0sIGxvY2FsLCBmbiwgYXJyWzBdLCBhcnJbMV0sIHJlcGVhdCwgdHJ1ZSlcblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XG5cdCAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcblx0ICAgICAgICAgICAgICAgIGl0ZXJhdG9yKGksIG9ialtpXSwgbG9jYWwsIGZuLCBhcnJbMF0sIGFyclsxXSwgcmVwZWF0KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gaXRlcmF0b3IoaW5kZXgsIGl0ZW0sIHZhcnMsIGZuLCBrMSwgazIsIHJlcGVhdCwgaXNBcnJheSkge1xuXHQgICAgdmFyIGtleSA9IGlzQXJyYXkgPyBnZXRUcmFjZUtleShpdGVtKSA6IGluZGV4XG5cdCAgICB2YXIgbG9jYWwgPSB7fVxuXHQgICAgbG9jYWxbazFdID0gaW5kZXhcblx0ICAgIGxvY2FsW2syXSA9IGl0ZW1cblx0ICAgIGZvciAodmFyIGsgaW4gdmFycykge1xuXHQgICAgICAgIGlmICghKGsgaW4gbG9jYWwpKSB7XG5cdCAgICAgICAgICAgIGxvY2FsW2tdID0gdmFyc1trXVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGZuKGluZGV4LCBpdGVtLCBrZXksIGxvY2FsLCByZXBlYXQpXG5cdH1cblxuXG5cdGF2YWxvbi5kaXJlY3RpdmUoJ2ZvcicsIHtcblx0ICAgIHByaW9yaXR5OiAzLFxuXHQgICAgcGFyc2U6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIGJpbmRpbmcpIHtcblx0ICAgICAgICB2YXIgc3RyID0gc3JjLm5vZGVWYWx1ZSwgYWxpYXNBc1xuXHQgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHJmb3JBcywgZnVuY3Rpb24gKGEsIGIpIHtcblx0ICAgICAgICAgICAgaWYgKCFyaWRlbnQudGVzdChiKSB8fCByaW52YWxpZC50ZXN0KGIpKSB7XG5cdCAgICAgICAgICAgICAgICBhdmFsb24uZXJyb3IoJ2FsaWFzICcgKyBiICsgJyBpcyBpbnZhbGlkIC0tLSBtdXN0IGJlIGEgdmFsaWQgSlMgaWRlbnRpZmllciB3aGljaCBpcyBub3QgYSByZXNlcnZlZCBuYW1lLicpXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBhbGlhc0FzID0gYlxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiAnJ1xuXHQgICAgICAgIH0pXG5cblx0ICAgICAgICB2YXIgYXJyID0gc3RyLnJlcGxhY2UocmZvclByZWZpeCwgJycpLnNwbGl0KCcgaW4gJylcblx0ICAgICAgICB2YXIgYXNzaWduID0gJ3ZhciBsb29wID0gJyArIGF2YWxvbi5wYXJzZUV4cHIoYXJyWzFdKSArICcgXFxuJ1xuXHQgICAgICAgIHZhciBhbGlhcyA9IGFsaWFzQXMgPyAndmFyICcgKyBhbGlhc0FzICsgJyA9IGxvb3BcXG4nIDogJydcblx0ICAgICAgICB2YXIga3YgPSBhcnJbMF0ucmVwbGFjZShyZm9yTGVmdCwgJycpLnJlcGxhY2UocmZvclJpZ2h0LCAnJykuc3BsaXQocmZvclNwbGl0KVxuXG5cdCAgICAgICAgaWYgKGt2Lmxlbmd0aCA9PT0gMSkgey8v56Gu5L+dYXZhbG9uLl9lYWNo55qE5Zue6LCD5pyJ5LiJ5Liq5Y+C5pWwXG5cdCAgICAgICAgICAgIGt2LnVuc2hpZnQoJyRrZXknKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBrdi5wdXNoKCd0cmFjZUtleScpXG5cdCAgICAgICAga3YucHVzaCgnX19sb2NhbF9fJylcblx0ICAgICAgICBrdi5wdXNoKCd2bm9kZXMnKVxuXHQgICAgICAgIHNyYy4kYXBwZW5kID0gYXNzaWduICsgYWxpYXMgKyAnYXZhbG9uLl9lYWNoKGxvb3AsZnVuY3Rpb24oJ1xuXHQgICAgICAgICAgICAgICAgKyBrdi5qb2luKCcsICcpICsgJyl7XFxuJ1xuXHQgICAgICAgICAgICAgICAgKyAoYWxpYXNBcyA/ICdfX2xvY2FsX19bJyArIGF2YWxvbi5xdW90ZShhbGlhc0FzKSArICddPWxvb3BcXG4nIDogJycpXG5cblx0ICAgIH0sXG5cdCAgICBkaWZmOiBmdW5jdGlvbiAoY29weSwgc3JjLCBjcExpc3QsIHNwTGlzdCwgaW5kZXgpIHtcblx0ICAgICAgICAvL+WwhmN1clJlcGVhdOi9rOaNouaIkOS4gOS4quS4quWPr+S7peavlOi+g+eahGNvbXBvbmVudCzlubbmsYLlvpdjb21wYXJlVGV4dFxuXHQgICAgICAgIHZhciBwcmVSZXBlYXQgPSBzcExpc3RbaW5kZXggKyAxXVxuXHQgICAgICAgIHZhciBjdXJQZXBlYXQgPSBjcExpc3RbaW5kZXggKyAxXVxuXHQgICAgICAgIHZhciBlbmQgPSBzcExpc3RbaW5kZXggKyAyXVxuXHQgICAgICAgIC8vcHJlUmVwZWF05LiN5Li656m65pe2XG5cdCAgICAgICAgc3JjLnByZVJlcGVhdCA9IHByZVJlcGVhdFxuXHQgICAgICAgIHZhciBjYWNoZSA9IHNyYy5jYWNoZVxuXG5cdCAgICAgICAgaWYgKGNhY2hlICYmIHNyYyA9PT0gY29weSkge1xuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB9XG5cdCAgICAgICAgLy/lsIblvqrnjq/ljLrln5/ovazmjaLkuLrkuIDkuKrkuKrnu4Tku7Zcblx0ICAgICAgICB2YXIgY29tcyA9IHByZXBhcmVDb21wYXJlKGN1clBlcGVhdCwgY29weSlcblx0ICAgICAgICBpZiAoY2FjaGUgJiYgc3JjLmNvbXBhcmVUZXh0ID09PSBjb3B5LmNvbXBhcmVUZXh0KSB7XG5cdCAgICAgICAgICAgIC8v5aaC5p6c5Liq5pWw5LiOa2V55LiA6Ie0LOmCo+S5iOivtOaYjuatpOaVsOe7hOayoeacieWPkeeUn+aOkuW6jyznq4vljbPov5Tlm55cblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgfVxuXG5cblx0ICAgICAgICBzcmMuY29tcGFyZVRleHQgPSBjb3B5LmNvbXBhcmVUZXh0XG5cdCAgICAgICAgLy9mb3LmjIfku6Tlj6rlgZrmt7vliqDliKDpmaTmk43kvZxcblxuXHQgICAgICAgIHZhciBpLCBjLCBwXG5cdCAgICAgICAgdmFyIHJlbW92ZXMgPSBbXVxuXHQgICAgICAgIGlmICghcHJlUmVwZWF0Lmxlbmd0aCkgey8v5LiA57u05pWw57uE5pyA5byA5aeL5Yid5aeL5YyW5pe2XG5cdCAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG5cdCAgICAgICAgICAgIGNhY2hlID0ge31cblx0ICAgICAgICAgICAgc3JjLmNvbXMgPSBjb21zXG5cdCAgICAgICAgICAgIHNwTGlzdFtpbmRleCArIDFdID0gY3VyUGVwZWF0XG5cdCAgICAgICAgICAgIGZvciAoaSA9IDA7IGMgPSBjb21zW2ldOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIGMuYWN0aW9uID0gJ2VudGVyJ1xuXHQgICAgICAgICAgICAgICAgc2F2ZUluQ2FjaGUoY2FjaGUsIGMpXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBzcmMuY2FjaGUgPSBjYWNoZVxuXHQgICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG5cdCAgICAgICAgfSBlbHNlIGlmICghY2FjaGUpIHsvL+S6jOe7tOaVsOe7hOacgOW8gOWni+WIneWni+WMluaXtlxuXHQgICAgICAgICAgICB2YXIgY2FjaGUgPSB7fVxuXHQgICAgICAgICAgICBzcmMuY29tcyA9IGNvbXNcblx0ICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHNhdmVJbkNhY2hlKGNhY2hlLCBjb21zW2ldKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHNyYy5jYWNoZSA9IGNhY2hlXG5cdCAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHZhciBuZXdDYWNoZSA9IHt9XG5cdCAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG5cdCAgICAgICAgICAgIHZhciBmdXp6eSA9IFtdXG5cdCAgICAgICAgICAgIGZvciAoaSA9IDA7IGMgPSBjb21zW2krK107ICkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHAgPSBpc0luQ2FjaGUoY2FjaGUsIGMua2V5KVxuXHQgICAgICAgICAgICAgICAgaWYgKHApIHtcblx0ICAgICAgICAgICAgICAgICAgICBwLmFjdGlvbiA9ICdtb3ZlJ1xuXHQgICAgICAgICAgICAgICAgICAgIHAub2xkSW5kZXggPSBwLmluZGV4XG5cdCAgICAgICAgICAgICAgICAgICAgcC5pbmRleCA9IGMuaW5kZXhcblx0ICAgICAgICAgICAgICAgICAgICBzYXZlSW5DYWNoZShuZXdDYWNoZSwgcClcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzmib7kuI3liLDlsLHov5vooYzmqKHns4rmkJzntKJcblx0ICAgICAgICAgICAgICAgICAgICBmdXp6eS5wdXNoKGMpXG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoIXNyYy5jb21zKSB7XG5cdCAgICAgICAgICAgICAgICBzcmMuY29tcyA9IHByZXBhcmVDb21wYXJlKHByZVJlcGVhdCwgc3JjKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBjOyBjID0gZnV6enlbaSsrXTsgKSB7XG5cdCAgICAgICAgICAgICAgICBwID0gZnV6enlNYXRjaENhY2hlKGNhY2hlLCBjLmtleSlcblx0ICAgICAgICAgICAgICAgIGlmIChwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcC5hY3Rpb24gPSAnbW92ZSdcblx0ICAgICAgICAgICAgICAgICAgICBwLm9sZEluZGV4ID0gcC5pbmRleFxuXHQgICAgICAgICAgICAgICAgICAgIHAuaW5kZXggPSBjLmluZGV4XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIHAgPSBjXG5cdCAgICAgICAgICAgICAgICAgICAgcC5hY3Rpb24gPSAnZW50ZXInXG5cdCAgICAgICAgICAgICAgICAgICAgc3JjLmNvbXMucHVzaChwKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgc2F2ZUluQ2FjaGUobmV3Q2FjaGUsIHApXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgc3JjLmNvbXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGEuaW5kZXggLSBiLmluZGV4XG5cdCAgICAgICAgICAgIH0pXG5cblx0ICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuXHQgICAgICAgICAgICBzcmMuY2FjaGUgPSBuZXdDYWNoZVxuXHQgICAgICAgICAgICBmb3IgKHZhciBpIGluIGNhY2hlKSB7XG5cdCAgICAgICAgICAgICAgICBwID0gY2FjaGVbaV1cblx0ICAgICAgICAgICAgICAgIHAuYWN0aW9uID0gJ2xlYXZlJ1xuXHQgICAgICAgICAgICAgICAgcmVtb3Zlcy5wdXNoKHApXG5cdCAgICAgICAgICAgICAgICBpZiAocC5hcnIpIHtcblx0ICAgICAgICAgICAgICAgICAgICBwLmFyci5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG0uYWN0aW9uID0gJ2xlYXZlJ1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVzLnB1c2gobSlcblx0ICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwLmFyclxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICB9XG5cdCAgICAgICAgc3JjLnJlbW92ZXMgPSByZW1vdmVzXG5cdCAgICAgICAgdmFyIGNiID0gYXZhbG9uLmNhY2hlc1tzcmMud2lkXVxuXHQgICAgICAgIHZhciB2bSA9IGNvcHkudm1vZGVsXG5cdCAgICAgICAgaWYgKGVuZCAmJiBjYikge1xuXHQgICAgICAgICAgICBlbmQuYWZ0ZXJDaGFuZ2UgPSBbZnVuY3Rpb24gKGRvbSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGNiLmNhbGwodm0sIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3JlbmRlcmVkJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBkb20sXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZTogc3JjLnNpZ25hdHVyZVxuXHQgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICB9XVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlKVxuXHQgICAgICAgIHJldHVybiB0cnVlXG5cblx0ICAgIH0sXG5cdCAgICB1cGRhdGU6IGZ1bmN0aW9uIChkb20sIHZkb20sIHBhcmVudCkge1xuXHQgICAgICAgIHZhciBrZXkgPSB2ZG9tLnNpZ25hdHVyZVxuXHQgICAgICAgIHZhciByYW5nZSA9IGdldEVuZFJlcGVhdChkb20pXG5cdCAgICAgICAgdmFyIGRvbXMgPSByYW5nZS5zbGljZSgxLCAtMSkvL1xuXHQgICAgICAgIHJhbmdlLnBvcCgpXG5cdCAgICAgICAgdmFyIERPTXMgPSBzcGxpdERPTXMoZG9tcywga2V5KVxuXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDAsIGVsOyBlbCA9IHZkb20ucmVtb3Zlc1tpKytdOyApIHtcblx0ICAgICAgICAgICAgdmFyIHJlbW92ZU5vZGVzID0gRE9Nc1tlbC5pbmRleF1cblx0ICAgICAgICAgICAgaWYgKHJlbW92ZU5vZGVzKSB7XG5cdCAgICAgICAgICAgICAgICByZW1vdmVOb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChuLCBrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKG4ucGFyZW50Tm9kZSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBhdmFsb24uYXBwbHlFZmZlY3QobiwgZWwuY2hpbGRyZW5ba10sIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvb2s6ICdvbkxlYXZlRG9uZScsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYjogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdnZXJLZXk6IGtleSArICdsZWF2ZSdcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgZWwuY2hpbGRyZW4ubGVuZ3RoID0gMFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZkb20ucmVtb3ZlcyA9IFtdXG5cdCAgICAgICAgdmFyIGluc2VydFBvaW50ID0gZG9tXG5cdCAgICAgICAgdmFyIGZyYWdtZW50ID0gYXZhbG9uLmF2YWxvbkZyYWdtZW50XG5cdCAgICAgICAgdmFyIGRvbVRlbXBsYXRlXG5cdCAgICAgICAgdmFyIGtlZXAgPSBbXVxuXG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZG9tLmNvbXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgdmFyIGNvbSA9IHZkb20uY29tc1tpXVxuXHQgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBjb20uY2hpbGRyZW5cblxuXHQgICAgICAgICAgICBpZiAoY29tLmFjdGlvbiA9PT0gJ2xlYXZlJykge1xuXHQgICAgICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIGtlZXAucHVzaChjb20pXG5cdCAgICAgICAgICAgIGlmIChjb20uYWN0aW9uID09PSAnZW50ZXInKSB7XG5cdC8vICAgICAgICAgICAgICAgIGlmICghZG9tVGVtcGxhdGUpIHtcblx0Ly8gICAgICAgICAgICAgICAgICAgIC8v5Yib5bu655So5LqO5ou36LSd55qE5pWw5o2uLOWMheaLrOiZmuaLn0RPTeS4juecn+WunkRPTSBcblx0Ly8gICAgICAgICAgICAgICAgICBkb21UZW1wbGF0ZSA9IGF2YWxvbi52ZG9tQWRhcHRvcihjaGlsZHJlbiwgJ3RvRE9NJylcblx0Ly8gICAgICAgICAgICAgICAgfVxuXHQvLyAgICAgICAgICAgICAgICB2YXIgbmV3RnJhZ21lbnQgPSBkb21UZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSlcblx0ICAgICAgICAgICAgICAgIHZhciBuZXdGcmFnbWVudCA9IGF2YWxvbi52ZG9tQWRhcHRvcihjaGlsZHJlbiwgJ3RvRE9NJylcblx0ICAgICAgICAgICAgICAgIHZhciBjbm9kZXMgPSBhdmFsb24uc2xpY2UobmV3RnJhZ21lbnQuY2hpbGROb2Rlcylcblx0ICAgICAgICAgICAgICAgIHJlY29uY2lsZShjbm9kZXMsIGNoaWxkcmVuLCBwYXJlbnQpLy/lhbPogZTmlrDnmoTomZrmi59ET03kuI7nnJ/lrp5ET01cblx0ICAgICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobmV3RnJhZ21lbnQsIGluc2VydFBvaW50Lm5leHRTaWJsaW5nKVxuXHQgICAgICAgICAgICAgICAgYXBwbHlFZmZlY3RzKGNub2RlcywgY2hpbGRyZW4sIHtcblx0ICAgICAgICAgICAgICAgICAgICBob29rOiAnb25FbnRlckRvbmUnLFxuXHQgICAgICAgICAgICAgICAgICAgIHN0YWdnZXJLZXk6IGtleSArICdlbnRlcidcblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tLmFjdGlvbiA9PT0gJ21vdmUnKSB7XG5cblx0ICAgICAgICAgICAgICAgIHZhciBjbm9kZXMgPSBET01zW2NvbS5vbGRJbmRleF0gfHwgW11cblx0ICAgICAgICAgICAgICAgIGlmIChjb20uaW5kZXggIT09IGNvbS5vbGRJbmRleCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlRnJhZ21lbnQgPSBmcmFnbWVudC5jbG9uZU5vZGUoZmFsc2UpXG5cdCAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDAsIGNjOyBjYyA9IGNub2Rlc1trKytdOyApIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUZyYWdtZW50LmFwcGVuZENoaWxkKGNjKVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG1vdmVGcmFnbWVudCwgaW5zZXJ0UG9pbnQubmV4dFNpYmxpbmcpXG5cdCAgICAgICAgICAgICAgICAgICAgLy8gcmVjb25jaWxlKGNub2RlcywgY2hpbGRyZW4sIHBhcmVudClcblx0ICAgICAgICAgICAgICAgICAgICBhcHBseUVmZmVjdHMoY25vZGVzLCBjaGlsZHJlbiwge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBob29rOiAnb25Nb3ZlRG9uZScsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdnZXJLZXk6IGtleSArICdtb3ZlJ1xuXHQgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBpbnNlcnRQb2ludCA9IGNub2Rlc1tjbm9kZXMubGVuZ3RoIC0gMV1cblxuXHQgICAgICAgICAgICBpZiAoIWluc2VydFBvaW50KSB7XG5cdCAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdmRvbS5wcmVSZXBlYXQubGVuZ3RoID0gMFxuXHQgICAgICAgIHZkb20uY29tcy5sZW5ndGggPSAwXG5cdCAgICAgICAga2VlcC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgICAgICB2ZG9tLmNvbXMucHVzaChlbClcblx0ICAgICAgICAgICAgcmFuZ2UucHVzaC5hcHBseSh2ZG9tLnByZVJlcGVhdCwgZWwuY2hpbGRyZW4pXG5cdCAgICAgICAgfSlcblxuXHQgICAgfVxuXG5cdH0pXG5cblx0ZnVuY3Rpb24gaXNFbXB0eU9iamVjdChhKSB7XG5cdCAgICBmb3IgKHZhciBpIGluIGEpIHtcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIH1cblx0ICAgIHJldHVybiB0cnVlXG5cdH1cblx0ZnVuY3Rpb24gc3BsaXRET01zKG5vZGVzLCBzaWduYXR1cmUpIHtcblx0ICAgIHZhciBpdGVtcyA9IFtdXG5cdCAgICB2YXIgaXRlbSA9IFtdXG5cdCAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gbm9kZXNbaSsrXTsgKSB7XG5cdCAgICAgICAgaWYgKGVsLm5vZGVUeXBlID09PSA4ICYmIGVsLm5vZGVWYWx1ZSA9PT0gc2lnbmF0dXJlKSB7XG5cdCAgICAgICAgICAgIGl0ZW0ucHVzaChlbClcblx0ICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKVxuXHQgICAgICAgICAgICBpdGVtID0gW11cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBpdGVtLnB1c2goZWwpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGl0ZW1zXG5cdH1cblxuXHQvL+WwhuimgeW+queOr+eahOiKgueCueagueaNrumUmueCueWFg+e0oOWGjeWIhuaIkOS4gOS4quS4quabtOWkp+eahOWNleWFgyznlKjkuo5kaWZmXG5cdGZ1bmN0aW9uIHByZXBhcmVDb21wYXJlKG5vZGVzLCBjdXIpIHtcblx0ICAgIHZhciBzcGxpdFRleHQgPSBjdXIuc2lnbmF0dXJlXG5cdCAgICB2YXIgaXRlbXMgPSBbXVxuXHQgICAgdmFyIGtleXMgPSBbXVxuXHQgICAgdmFyIGNvbSA9IHtcblx0ICAgICAgICBjaGlsZHJlbjogW11cblx0ICAgIH1cblxuXHQgICAgZm9yICh2YXIgaSA9IDAsIGVsOyBlbCA9IG5vZGVzW2ldOyBpKyspIHtcblx0ICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IDggJiYgZWwubm9kZVZhbHVlID09PSBzcGxpdFRleHQpIHtcblx0ICAgICAgICAgICAgY29tLmNoaWxkcmVuLnB1c2goZWwpXG5cdCAgICAgICAgICAgIGNvbS5rZXkgPSBlbC5rZXlcblx0ICAgICAgICAgICAga2V5cy5wdXNoKGVsLmtleSlcblx0ICAgICAgICAgICAgY29tLmluZGV4ID0gaXRlbXMubGVuZ3RoXG5cdCAgICAgICAgICAgIGl0ZW1zLnB1c2goY29tKVxuXHQgICAgICAgICAgICBjb20gPSB7XG5cdCAgICAgICAgICAgICAgICBjaGlsZHJlbjogW11cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGNvbS5jaGlsZHJlbi5wdXNoKGVsKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgY3VyLmNvbXBhcmVUZXh0ID0ga2V5cy5sZW5ndGggKyAnfCcgKyBrZXlzLmpvaW4oJzs7Jylcblx0ICAgIHJldHVybiBpdGVtc1xuXHR9XG5cblxuXHRmdW5jdGlvbiBnZXRFbmRSZXBlYXQobm9kZSkge1xuXHQgICAgdmFyIGlzQnJlYWsgPSAwLCByZXQgPSBbXVxuXHQgICAgd2hpbGUgKG5vZGUpIHtcblx0ICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gOCkge1xuXHQgICAgICAgICAgICBpZiAobm9kZS5ub2RlVmFsdWUuaW5kZXhPZignbXMtZm9yOicpID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICArK2lzQnJlYWtcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGVWYWx1ZS5pbmRleE9mKCdtcy1mb3ItZW5kOicpID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICAtLWlzQnJlYWtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXQucHVzaChub2RlKVxuXHQgICAgICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nXG5cdCAgICAgICAgaWYgKGlzQnJlYWsgPT09IDApIHtcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gcmV0XG5cdH1cblxuXG5cdHZhciByZnV6enkgPSAvXihzdHJpbmd8bnVtYmVyfGJvb2xlYW4pL1xuXHR2YXIgcmtmdXp6eSA9IC9eXyooc3RyaW5nfG51bWJlcnxib29sZWFuKS9cblx0ZnVuY3Rpb24gZnV6enlNYXRjaENhY2hlKGNhY2hlLCBpZCkge1xuXHQgICAgdmFyIG0gPSBpZC5tYXRjaChyZnV6enkpXG5cdCAgICBpZiAobSkge1xuXHQgICAgICAgIHZhciBmaWQgPSBtWzFdXG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiBjYWNoZSkge1xuXHQgICAgICAgICAgICB2YXIgbiA9IGkubWF0Y2gocmtmdXp6eSlcblx0ICAgICAgICAgICAgaWYgKG4gJiYgblsxXSA9PT0gZmlkKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaXNJbkNhY2hlKGNhY2hlLCBpKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0Ly8g5paw5L2N572uOiDml6fkvY3nva5cblx0ZnVuY3Rpb24gaXNJbkNhY2hlKGNhY2hlLCBpZCkge1xuXHQgICAgdmFyIGMgPSBjYWNoZVtpZF1cblx0ICAgIGlmIChjKSB7XG5cdCAgICAgICAgdmFyIGFyciA9IGMuYXJyXG5cdCAgICAgICAgaWYgKGFycikge1xuXHQgICAgICAgICAgICB2YXIgciA9IGFyci5wb3AoKVxuXHQgICAgICAgICAgICBpZiAoIWFyci5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgIGMuYXJyID0gMFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiByXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGRlbGV0ZSBjYWNoZVtpZF1cblx0ICAgICAgICByZXR1cm4gY1xuXHQgICAgfVxuXHR9XG5cdC8vWzEsMSwxXSBudW1iZXIxIG51bWJlcjFfIG51bWJlcjFfX1xuXHRmdW5jdGlvbiBzYXZlSW5DYWNoZShjYWNoZSwgY29tcG9uZW50KSB7XG5cdCAgICB2YXIgdHJhY2tJZCA9IGNvbXBvbmVudC5rZXlcblx0ICAgIGlmICghY2FjaGVbdHJhY2tJZF0pIHtcblx0ICAgICAgICBjYWNoZVt0cmFja0lkXSA9IGNvbXBvbmVudFxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB2YXIgYyA9IGNhY2hlW3RyYWNrSWRdXG5cdCAgICAgICAgdmFyIGFyciA9IGMuYXJyIHx8IChjLmFyciA9IFtdKVxuXHQgICAgICAgIGFyci5wdXNoKGNvbXBvbmVudClcblx0ICAgIH1cblx0fVxuXHR2YXIgYXBwbHlFZmZlY3RzID0gZnVuY3Rpb24gKG5vZGVzLCB2bm9kZXMsIG9wdHMpIHtcblx0ICAgIHZub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaSkge1xuXHQgICAgICAgIGF2YWxvbi5hcHBseUVmZmVjdChub2Rlc1tpXSwgdm5vZGVzW2ldLCBvcHRzKVxuXHQgICAgfSlcblx0fVxuXG5cblxuLyoqKi8gfSxcbi8qIDYxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblx0dmFyIHJlY29uY2lsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG5cdHZhciB0cnlJbml0Q29tcG9uZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2MilcblxuXHRhdmFsb24uY29tcG9uZW50ID0gZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcblx0ICAgIC8v6L+Z5piv5a6a5LmJ57uE5Lu255qE5YiG5pSvLOW5tuWwhuWIl+mYn+S4reeahOWQjOexu+Wei+Wvueixoeenu+mZpFxuXHQgICAgaWYgKCFhdmFsb24uY29tcG9uZW50c1tuYW1lXSkge1xuXHQgICAgICAgIGF2YWxvbi5jb21wb25lbnRzW25hbWVdID0gZGVmaW5pdGlvblxuXHQgICAgfS8v6L+Z6YeM5rKh5pyJ6L+U5Zue5YC8XG5cdH1cblx0YXZhbG9uLmRpcmVjdGl2ZSgnd2lkZ2V0Jywge1xuXHQgICAgcHJpb3JpdHk6IDQsXG5cdCAgICBwYXJzZTogZnVuY3Rpb24gKGNvcHksIHNyYywgYmluZGluZykge1xuXHQgICAgICAgIHNyYy5wcm9wcy53aWQgPSBzcmMucHJvcHMud2lkIHx8IGF2YWxvbi5tYWtlSGFzaENvZGUoJ3cnKVxuXHQgICAgICAgIC8v5bCG5riy5p+T5Ye95pWw55qE5p+Q5LiA6YOo5YiG5a2Y6LW35p2lLOa4suWcqGPmlrnms5XkuK3ovazmjaLkuLrlh73mlbBcblx0ICAgICAgICBjb3B5W2JpbmRpbmcubmFtZV0gPSBhdmFsb24ucGFyc2VFeHByKGJpbmRpbmcpXG5cdCAgICAgICAgY29weS50ZW1wbGF0ZSA9IHNyYy50ZW1wbGF0ZVxuXHQgICAgICAgIGNvcHkudm1vZGVsID0gJ19fdm1vZGVsX18nXG5cdCAgICAgICAgY29weS5sb2NhbCA9ICdfX2xvY2FsX18nXG5cdCAgICB9LFxuXHQgICAgZGVmaW5lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgcmV0dXJuIGF2YWxvbi5tZWRpYXRvckZhY3RvcnkuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHQgICAgfSxcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIG5hbWUsIGNvcHlMaXN0LCBzcmNMaXN0LCBpbmRleCkge1xuXHQgICAgICAgIHZhciBhID0gY29weVtuYW1lXVxuXG5cdCAgICAgICAgaWYgKE9iamVjdChhKSA9PT0gYSkge1xuXHQgICAgICAgICAgICAvL+acieS4ieS4quWcsOaWueWPr+S7peiuvue9rmlzLCDlsZ7mgKcs5qCH562+5ZCNLOmFjee9ruWvueixoVxuXG5cdCAgICAgICAgICAgIHZhciBpcyA9IHNyYy5wcm9wcy5pcyB8fCAoL15tc1xcLS8udGVzdChzcmMudHlwZSkgPyBzcmMudHlwZSA6IDApXG5cblx0ICAgICAgICAgICAgaWYgKCFpcykgey8v5byA5aeL5aSn6LS55ZGo56ug5Zyw6I635Y+W57uE5Lu255qE57G75Z6LXG5cdCAgICAgICAgICAgICAgICBhID0gYS4kbW9kZWwgfHwgYS8v5a6J5YWo55qE6YGN5Y6GVkJzY3JpcHRcblx0ICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGEpKSB7Ly/ovazmjaLmiJDlr7nosaFcblx0ICAgICAgICAgICAgICAgICAgICBhLnVuc2hpZnQoe30pLy8g6Ziy5q2i5rGh5p+T5pen5pWw5o2uXG5cdCAgICAgICAgICAgICAgICAgICAgYXZhbG9uLm1peC5hcHBseSgwLCBhKVxuXHQgICAgICAgICAgICAgICAgICAgIGEgPSBhLnNoaWZ0KClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlzID0gYS5pc1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciB2bU5hbWUgPSAnY29tcG9uZW50LXZtOicgKyBpc1xuXG5cdCAgICAgICAgICAgIHNyYy5wcm9wcy5pcyA9IGlzXG5cdCAgICAgICAgICAgIHNyYy52bW9kZWwgPSBjb3B5LnZtb2RlbFxuXHQgICAgICAgICAgICAvL+WmguaenOe7hOS7tuayoeacieWIneWni+WMlizpgqPkuYjlhYjliJ3lp4vljJYo55Sf5oiQ5a+55bqU55qEdm0sJHJlbmRlcilcblx0ICAgICAgICAgICAgaWYgKCFzcmNbdm1OYW1lXSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKCF0cnlJbml0Q29tcG9uZW50KHNyYywgY29weVtuYW1lXSwgY29weS5sb2NhbCwgY29weS50ZW1wbGF0ZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvL+abv+aNouaIkOazqOmHiuiKgueCuVxuXHQgICAgICAgICAgICAgICAgICAgIHNyYy5ub2RlVHlwZSA9IDhcblx0ICAgICAgICAgICAgICAgICAgICBzcmMubm9kZVZhbHVlID0gJ3VucmVzb2x2ZWQgY29tcG9uZW50IHBsYWNlaG9sZGVyJ1xuXHQgICAgICAgICAgICAgICAgICAgIGNvcHlMaXN0W2luZGV4XSA9IHNyY1xuXG5cdCAgICAgICAgICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy5tb3VudENvbW1lbnQpXG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvL+WmguaenOW3sue7j+WtmOWcqOS6jmF2YWxvbi5zY29wZXNcblx0ICAgICAgICAgICAgdmFyIGNvbVZtID0gc3JjW3ZtTmFtZV1cblx0ICAgICAgICAgICAgdmFyIHNjb3BlID0gYXZhbG9uLnNjb3Blc1tjb21WbS4kaWRdXG5cdCAgICAgICAgICAgIGlmIChzY29wZSAmJiBzY29wZS52bW9kZWwpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjb20gPSBzY29wZS52bW9kZWwuJGVsZW1lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChzcmMuZG9tICE9PSBjb20pIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gY29tLnZ0cmVlWzBdXG5cdCAgICAgICAgICAgICAgICAgICAgc3JjTGlzdFtpbmRleF0gPSBjb3B5TGlzdFtpbmRleF0gPSBjb21wb25lbnRcblx0ICAgICAgICAgICAgICAgICAgICBzcmMuY29tID0gY29tXG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKCFjb21wb25lbnQuc2tpcENvbnRlbnQpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LnNraXBDb250ZW50ID0gJ29wdGltaXplJ1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLnJlcGxhY2VDYWNoZWRDb21wb25lbnQpXG5cdCAgICAgICAgICAgICAgICAgICAgdXBkYXRlKGNvbXBvbmVudCwgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LnNraXBDb250ZW50ID09PSAnb3B0aW1pemUnKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuc2tpcENvbnRlbnQgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9LCAnYWZ0ZXJDaGFuZ2UnKVxuXHQgICAgICAgICAgICAgICAgICAgIHJldHVyblxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciByZW5kZXIgPSBjb21WbS4kcmVuZGVyXG5cdCAgICAgICAgICAgIHZhciB0cmVlID0gcmVuZGVyKGNvbVZtLCBjb3B5LmxvY2FsKVxuXHQgICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gdHJlZVswXVxuXHQgICAgICAgICAgICBpZiAoY29tcG9uZW50ICYmIGlzQ29tcG9uZW50UmVhZHkoY29tcG9uZW50KSkge1xuXHQgICAgICAgICAgICAgICAgY29tcG9uZW50LmxvY2FsID0gY29weS5sb2NhbFxuXHQgICAgICAgICAgICAgICAgc3JjLmR5bmFtaWMgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICBBcnJheShcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdm1OYW1lLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnY29tcG9uZW50LWh0bWw6JyArIGlzLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnY29tcG9uZW50LXJlYWR5OicgKyBpcyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ2RvbScsICdkeW5hbWljJ1xuXHQgICAgICAgICAgICAgICAgICAgICAgICApLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0ICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRbbmFtZV0gPSBzcmNbbmFtZV1cblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICBjb21wb25lbnQudm1vZGVsID0gY29tVm1cblx0ICAgICAgICAgICAgICAgIGNvcHlMaXN0W2luZGV4XSA9IGNvbXBvbmVudFxuXHQgICAgICAgICAgICAgICAgaWYgKHNyYy5ub2RlVHlwZSA9PT0gOCAmJiBzcmMuY29tbWVudCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5kb20gPSBzcmMuY29tbWVudFxuXHQgICAgICAgICAgICAgICAgICAgIHNyYy50eXBlID0gJyNjb21tZW50J1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKHNyYy50eXBlICE9PSBjb21wb25lbnQudHlwZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHNyY0xpc3RbaW5kZXhdID0gY29tcG9uZW50XG5cdCAgICAgICAgICAgICAgICAgICAgdXBkYXRlKGNvbXBvbmVudCwgdGhpcy5tb3VudENvbXBvbmVudClcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdXBkYXRlKHNyYywgdGhpcy51cGRhdGVDb21wb25lbnQpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBzcmMubm9kZVR5cGUgPSA4XG5cdCAgICAgICAgICAgICAgICBzcmMubm9kZVZhbHVlID0gJ3VucmVzb2x2ZWQgY29tcG9uZW50IHBsYWNlaG9sZGVyJ1xuXHQgICAgICAgICAgICAgICAgY29weUxpc3RbaW5kZXhdID0gc3JjXG5cdCAgICAgICAgICAgICAgICB1cGRhdGUoc3JjLCB0aGlzLm1vdW50Q29tbWVudClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGlmIChzcmMucHJvcHMuaXMgPT09IGNvcHkucHJvcHMuaXMpIHtcblx0ICAgICAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlQ29tcG9uZW50KVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIHJlcGxhY2VDYWNoZWRDb21wb25lbnQ6IGZ1bmN0aW9uIChkb20sIHZkb20sIHBhcmVudCkge1xuXHQgICAgICAgIHZhciBjb20gPSB2ZG9tLmNvbVxuXHQgICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoY29tLCBkb20pXG5cdCAgICAgICAgZGVsZXRlIHZkb20uY29tXG5cdCAgICB9LFxuXHQgICAgbW91bnRDb21tZW50OiBmdW5jdGlvbiAoZG9tLCB2ZG9tLCBwYXJlbnQpIHtcblx0ICAgICAgICB2YXIgY29tbWVudCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodmRvbS5ub2RlVmFsdWUpXG5cdCAgICAgICAgdmRvbS5kb20gPSBjb21tZW50XG5cdCAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChjb21tZW50LCBkb20pXG5cdCAgICB9LFxuXHQgICAgdXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoZG9tLCB2ZG9tKSB7XG5cdCAgICAgICAgdmFyIHZtID0gdmRvbVtcImNvbXBvbmVudC12bTpcIiArIHZkb20ucHJvcHMuaXNdXG5cdCAgICAgICAgdmFyIHZpZXdDaGFuZ2VPYnNlcnZlcnMgPSB2bS4kZXZlbnRzLm9uVmlld0NoYW5nZVxuXHQgICAgICAgIGlmICh2aWV3Q2hhbmdlT2JzZXJ2ZXJzICYmIHZpZXdDaGFuZ2VPYnNlcnZlcnMubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgIHVwZGF0ZSh2ZG9tLCB2aWV3Q2hhbmdlSGFuZGxlLCAnYWZ0ZXJDaGFuZ2UnKVxuXHQgICAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGRvbSwgdmRvbSwgcGFyZW50KSB7XG5cdCAgICAgICAgdmFyIGNvbSA9IGF2YWxvbi52ZG9tQWRhcHRvcih2ZG9tLCAndG9ET00nKVxuXHQgICAgICAgIHZhciBpcyA9IHZkb20ucHJvcHMuaXNcblx0ICAgICAgICB2YXIgdm0gPSB2ZG9tWydjb21wb25lbnQtdm06JyArIGlzXVxuXHQgICAgICAgIHZtLiRmaXJlKCdvbkluaXQnLCB7XG5cdCAgICAgICAgICAgIHR5cGU6ICdpbml0Jyxcblx0ICAgICAgICAgICAgdm1vZGVsOiB2bSxcblx0ICAgICAgICAgICAgaXM6IGlzXG5cdCAgICAgICAgfSlcblx0ICAgICAgICByZWNvbmNpbGUoW2NvbV0sIFt2ZG9tXSlcblx0ICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGNvbSwgZG9tKVxuXHQgICAgICAgIHZkb20uZG9tID0gdm0uJGVsZW1lbnQgPSBjb21cblx0ICAgICAgICBjb20udnRyZWUgPSBbdmRvbV1cblx0ICAgICAgICBhdmFsb24ub25Db21wb25lbnREaXNwb3NlKGNvbSlcblx0ICAgICAgICB2ZG9tWydjb21wb25lbnQtcmVhZHk6JyArIGlzXSA9IHRydWVcblx0ICAgICAgICAvLy0tLS0tLS0tLS0tLS0tXG5cdCAgICAgICAgYXZhbG9uLnNjb3Blc1t2bS4kaWRdID0ge1xuXHQgICAgICAgICAgICB2bW9kZWw6IHZtLFxuXHQgICAgICAgICAgICB0b3A6IHZkb20udm1vZGVsLFxuXHQgICAgICAgICAgICBsb2NhbDogdmRvbS5sb2NhbFxuXHQgICAgICAgIH1cblx0ICAgICAgICAvLy0tLS0tLS0tLS0tLS0tXG5cdCAgICAgICAgdXBkYXRlKHZkb20sIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdm0uJGZpcmUoJ29uUmVhZHknLCB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiAncmVhZHknLFxuXHQgICAgICAgICAgICAgICAgdGFyZ2V0OiBjb20sXG5cdCAgICAgICAgICAgICAgICB2bW9kZWw6IHZtLFxuXHQgICAgICAgICAgICAgICAgaXM6IGlzXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgfSwgJ2FmdGVyQ2hhbmdlJylcblxuXHQgICAgICAgIHVwZGF0ZSh2ZG9tLCBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZkb21bICdjb21wb25lbnQtaHRtbDonICsgaXNdID0gYXZhbG9uLnZkb21BZGFwdG9yKHZkb20sICd0b0hUTUwnKVxuXHQgICAgICAgIH0sICdhZnRlckNoYW5nZScpXG5cdCAgICB9XG5cdH0pXG5cblxuXG5cdGZ1bmN0aW9uIHZpZXdDaGFuZ2VIYW5kbGUoZG9tLCB2ZG9tKSB7XG5cdCAgICB2YXIgaXMgPSB2ZG9tLnByb3BzLmlzXG5cdCAgICB2YXIgdm0gPSB2ZG9tWydjb21wb25lbnQtdm06JyArIGlzXVxuXHQgICAgdmFyIGh0bWwgPSAnY29tcG9uZW50LWh0bWw6JyArIGlzXG5cdCAgICB2YXIgcHJlSFRNTCA9IHZkb21baHRtbF1cblx0ICAgIHZhciBjdXJIVE1MID0gYXZhbG9uLnZkb21BZGFwdG9yKHZkb20sICd0b0hUTUwnKVxuXHQgICAgaWYgKHByZUhUTUwgIT09IGN1ckhUTUwpIHtcblx0ICAgICAgICB2ZG9tW2h0bWxdID0gY3VySFRNTFxuXHQgICAgICAgIHZtLiRmaXJlKCdvblZpZXdDaGFuZ2UnLCB7XG5cdCAgICAgICAgICAgIHR5cGU6ICd2aWV3Y2hhbmdlJyxcblx0ICAgICAgICAgICAgdGFyZ2V0OiBkb20sXG5cdCAgICAgICAgICAgIHZtb2RlbDogdm0sXG5cdCAgICAgICAgICAgIGlzOiBpc1xuXHQgICAgICAgIH0pXG5cdCAgICB9XG5cdH1cblxuXG5cblx0ZnVuY3Rpb24gaXNDb21wb25lbnRSZWFkeSh2bm9kZSkge1xuXHQgICAgdmFyIGlzUmVhZHkgPSB0cnVlXG5cdCAgICB0cnkge1xuXHQgICAgICAgIGhhc1VucmVzb2x2ZWRDb21wb25lbnQodm5vZGUpXG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgaXNSZWFkeSA9IGZhbHNlXG5cdCAgICB9XG5cdCAgICByZXR1cm4gaXNSZWFkeVxuXHR9XG5cblx0ZnVuY3Rpb24gaGFzVW5yZXNvbHZlZENvbXBvbmVudCh2bm9kZSkge1xuXHQgICAgdm5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcblx0ICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IDgpIHtcblx0ICAgICAgICAgICAgaWYgKGVsLm5vZGVWYWx1ZSA9PT0gJ3VucmVzb2x2ZWQgY29tcG9uZW50IHBsYWNlaG9sZGVyJykge1xuXHQgICAgICAgICAgICAgICAgdGhyb3cgJ3VucmVzb2x2ZWQnXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2UgaWYgKGVsLmNoaWxkcmVuKSB7XG5cdCAgICAgICAgICAgIGhhc1VucmVzb2x2ZWRDb21wb25lbnQoZWwpXG5cdCAgICAgICAgfVxuXHQgICAgfSlcblx0fVxuXG4vKioqLyB9LFxuLyogNjIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBza2lwQXJyYXkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYzKVxuXG5cdHZhciBsZWdhbFRhZ3MgPSB7d2JyOiAxLCB4bXA6IDEsIHRlbXBsYXRlOiAxfVxuXHR2YXIgZXZlbnRzID0gJ29uSW5pdCxvblJlYWR5LG9uVmlld0NoYW5nZSxvbkRpc3Bvc2UnXG5cdHZhciBjb21wb25lbnRFdmVudHMgPSBhdmFsb24ub25lT2JqZWN0KGV2ZW50cylcblx0dmFyIGltbXVuaXR5ID0gZXZlbnRzLnNwbGl0KCcsJykuY29uY2F0KCdpcycsICdkZWZpbmUnKVxuXHR2YXIgb25jZVdhcm4gPSB0cnVlXG5cdGZ1bmN0aW9uIGluaXRDb21wb25lbnQoc3JjLCByYXdPcHRpb24sIGxvY2FsLCB0ZW1wbGF0ZSkge1xuXHQgICAgdmFyIHRhZyA9IHNyYy50eXBlXG5cdCAgICB2YXIgaXMgPSBzcmMucHJvcHMuaXNcblx0ICAgIC8v5Yik5a6a55So5oi35Lyg5YWl55qE5qCH562+5ZCN5piv5ZCm56ym5ZCI6KeE5qC8XG5cdCAgICBpZiAoIWxlZ2FsVGFnc1t0YWddICYmICFpc0N1c3RvbVRhZyh0YWcpKSB7XG5cdCAgICAgICAgYXZhbG9uLndhcm4odGFnICsgJ+S4jeWQiOmAguWBmue7hOS7tueahOagh+etvicpXG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdCAgICAvL+W8gOWni+WIneWni+WMlue7hOS7tlxuXHQgICAgdmFyIGhvb2tzID0ge31cblx0ICAgIC8v55So5oi35Y+q6IO95pON5L2c6aG25bGCVk1cblx0ICAgIC8v5Y+q5pyJJGlkLGlz55qE5a+56LGh5bCx5pivZW1wdHlPcHRpb25cblx0ICAgIGlmICghcmF3T3B0aW9uKSB7XG5cdCAgICAgICAgb3B0aW9ucyA9IFtdXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZhciBvcHRpb25zID0gW10uY29uY2F0KHJhd09wdGlvbilcblx0ICAgICAgICBvcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICAgICAgaWYgKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgICAgICAgICBtaXhpbkhvb2tzKGhvb2tzLCAoYS4kbW9kZWwgfHwgYSksIHRydWUpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KVxuXHQgICAgfVxuXHQgICAgdmFyIGRlZmluaXRpb24gPSBhdmFsb24uY29tcG9uZW50c1tpc11cblx0ICAgIC8v5aaC5p6c6L+e57uE5Lu255qE5a6a5LmJ6YO95rKh5pyJ5Yqg6L295Zue5p2lLOW6lOivpeeri+WNs+i/lOWbniBcblx0ICAgIGlmICghZGVmaW5pdGlvbikge1xuXHQgICAgICAgIHJldHVyblxuXHQgICAgfVxuXHQgIFxuXG5cdCAgICAvL+W+l+WIsOe7hOS7tuWcqOmhtuWxgnZt55qE6YWN572u5a+56LGh5ZCNXG5cdCAgICBpZiAoIWhvb2tzLiRpZCAmJiBvbmNlV2Fybikge1xuXHQgICAgICAgIGF2YWxvbi53YXJuKCd3YXJuaW5nIScsIGlzLCAn57uE5Lu25pyA5aW95ZyobXMtd2lkZ2V06YWN572u5a+56LGh5Lit5oyH5a6a5YWo5bGA5LiN6YeN5aSN55qEJGlk5Lul5o+Q6auY5oCn6IO9IVxcbicsXG5cdCAgICAgICAgICAgICAgICAn6Iul5ZyobXMtZm9y5b6q546v5Lit5Y+v5Lul5Yip55SoICgkaW5kZXgsZWwpIGluIEBhcnJheSDkuK3nmoQkaW5kZXjmi7zlhpnkvaDnmoQkaWRcXG4nLFxuXHQgICAgICAgICAgICAgICAgJ+WmgiBtcy13aWRnZXQ9XCJ7aXM6XFwnbXMtYnV0dG9uXFwnLCRpZDpcXCdidG5cXCcrJGluZGV4fVwiJ1xuXHQgICAgICAgICAgICAgICAgKVxuXHQgICAgICAgIG9uY2VXYXJuID0gZmFsc2Vcblx0ICAgIH1cblx0ICAgIHZhciBkZWZpbmUgPSBob29rcy5kZWZpbmVcblx0ICAgIGRlZmluZSA9IGRlZmluZSB8fCBhdmFsb24uZGlyZWN0aXZlcy53aWRnZXQuZGVmaW5lXG5cdCAgICAvL+eUn+aIkOe7hOS7tlZNXG5cdCAgICB2YXIgJGlkID0gaG9va3MuJGlkIHx8IHNyYy5wcm9wcy53aWQgfHwgJ3cnICsgKG5ldyBEYXRlIC0gMClcblx0ICAgIHZhciBkZWZhdWx0cyA9IGF2YWxvbi5taXgodHJ1ZSwge30sIGRlZmluaXRpb24uZGVmYXVsdHMpXG5cdCAgICBtaXhpbkhvb2tzKCBob29rcywgZGVmYXVsdHMsIGZhbHNlKS8vc3JjLnZtb2RlbCxcblx0ICAgIHZhciBza2lwUHJvcHMgPSBpbW11bml0eS5jb25jYXQoKVxuXHQgICAgZnVuY3Rpb24gc3dlZXBlcihhLCBiKSB7XG5cdCAgICAgICAgc2tpcFByb3BzLmZvckVhY2goZnVuY3Rpb24gKGspIHtcblx0ICAgICAgICAgICAgZGVsZXRlIGFba11cblx0ICAgICAgICAgICAgZGVsZXRlIGJba11cblx0ICAgICAgICB9KVxuXHQgICAgfVxuXG5cdCAgICBzd2VlcGVyLmlzV2lkZ2V0ID0gdHJ1ZVxuXHQgICAgdmFyIHZtb2RlbCA9IGRlZmluZS5hcHBseShzd2VlcGVyLCBbc3JjLnZtb2RlbCxkZWZhdWx0c10uY29uY2F0KG9wdGlvbnMpKVxuXHQgICAgaWYgKCFhdmFsb24ubW9kZXJuKSB7Ly/lop7lvLrlr7lJReeahOWFvOWuuVxuXHQgICAgICAgIGZvciAodmFyIGkgaW4gdm1vZGVsKSB7XG5cdCAgICAgICAgICAgIGlmICghc2tpcEFycmF5W2ldICYmIHR5cGVvZiB2bW9kZWxbaV0gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgIHZtb2RlbFtpXSA9IHZtb2RlbFtpXS5iaW5kKHZtb2RlbClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgXG5cdCAgICB2bW9kZWwuJGlkID0gJGlkXG5cdCAgICBhdmFsb24udm1vZGVsc1skaWRdID0gdm1vZGVsXG5cblx0ICAgIC8v57uR5a6a57uE5Lu255qE55Sf5ZG95ZGo5pyf6ZKp5a2QXG5cdCAgICBmb3IgKHZhciBlIGluIGNvbXBvbmVudEV2ZW50cykge1xuXHQgICAgICAgIGlmIChob29rc1tlXSkge1xuXHQgICAgICAgICAgICBob29rc1tlXS5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuXHQgICAgICAgICAgICAgICAgdm1vZGVsLiR3YXRjaChlLCBmbilcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIC8vIOeUn+aIkOWklumDqOeahOa4suafk+WHveaVsFxuXHQgICAgLy8gdGVtcGxhdGXkv53lrZjnnYDmnIDljp/lp4vnmoTnu4Tku7blrrnlmajkv6Hmga9cblx0ICAgIC8vIOaIkeS7rOWFiOWwhuWug+i9rOaNouaIkOiZmuaLn0RPTSzlpoLmnpzmmK94bXAsIHRlbXBsYXRlLFxuXHQgICAgLy8g5a6D5Lus5YaF6YOo5piv5LiA5Liq57qv5paH5pys6IqC54K5LCDpnIDopoHnu6fnu63ovazmjaLkuLromZrmi59ET01cblx0ICAgIHZhciBzaGVsbCA9IGF2YWxvbi5sZXhlcih0ZW1wbGF0ZSlcblx0ICAgIHZhciBzaGVsbFJvb3QgPSBzaGVsbFswXVxuXHQgICAgdmFyIHNjID0gc2hlbGxSb290LmNoaWxkcmVuXG5cdCAgICBpZiAoc2MgJiYgc2MubGVuZ3RoID09PSAxICYmIHNjWzBdLm5vZGVWYWx1ZSkge1xuXHQgICAgICAgIHNoZWxsUm9vdC5jaGlsZHJlbiA9IGF2YWxvbi5sZXhlcihzY1swXS5ub2RlVmFsdWUpXG5cdCAgICB9XG5cblx0ICAgIGRlbGV0ZSBzaGVsbFJvb3QuaXNWb2lkVGFnXG5cdCAgICBkZWxldGUgc2hlbGxSb290LnRlbXBsYXRlXG5cdCAgICBkZWxldGUgc2hlbGxSb290LnNraXBDb250ZW50XG5cdCAgICBkZWxldGUgc2hlbGxSb290LnByb3BzWydtcy13aWRnZXQnXVxuXHQgICAgc2hlbGxSb290LnR5cGUgPSAnY2hlbmc3J1xuXHQgICAgc2hlbGxSb290LmNoaWxkcmVuID0gc2hlbGxSb290LmNoaWxkcmVuIHx8IFtdXG5cdCAgICBzaGVsbFJvb3QucHJvcHMuaXMgPSBpc1xuXHQgICAgc2hlbGxSb290LnByb3BzLndpZCA9ICRpZFxuXHQgICAgYXZhbG9uLnNwZWVkVXAoc2hlbGwpXG5cdCAgICB2YXIgcmVuZGVyID0gYXZhbG9uLnJlbmRlcihzaGVsbCwgbG9jYWwpXG5cdCAgICBcblx0ICAgIC8v55Sf5oiQ5YaF6YOo55qE5riy5p+T5Ye95pWwXG5cdCAgICB2YXIgZmluYWxUZW1wbGF0ZSA9IGRlZmluaXRpb24udGVtcGxhdGUudHJpbSgpXG5cdCAgICBpZiAodHlwZW9mIGRlZmluaXRpb24uZ2V0VGVtcGxhdGUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICBmaW5hbFRlbXBsYXRlID0gZGVmaW5pdGlvbi5nZXRUZW1wbGF0ZSh2bW9kZWwsIGZpbmFsVGVtcGxhdGUpXG5cdCAgICB9XG5cdCAgICB2YXIgdnRyZWUgPSBhdmFsb24ubGV4ZXIoZmluYWxUZW1wbGF0ZSlcblxuXHQgICAgaWYgKHZ0cmVlLmxlbmd0aCA+IDEpIHtcblx0ICAgICAgICBhdmFsb24uZXJyb3IoJ+e7hOS7tuW/hemhu+eUqOS4gOS4quWFg+e0oOWMhei1t+adpScpXG5cdCAgICB9XG5cdCAgICB2YXIgc29sZVNsb3QgPSBkZWZpbml0aW9uLnNvbGVTbG90XG5cdCAgICByZXBsYWNlU2xvdCh2dHJlZSwgc29sZVNsb3QpXG5cdCAgICBhdmFsb24uc3BlZWRVcCh2dHJlZSlcblxuXHQgICAgdmFyIHJlbmRlcjIgPSBhdmFsb24ucmVuZGVyKHZ0cmVlKVxuXG5cdCAgICAvL+eUn+aIkOacgOe7iOeahOe7hOS7tua4suafk+WHveaVsFxuXHQgICAgdmFyIHN0ciA9IGZuVGVtcGxhdGUgKyAnJ1xuXHQgICAgdmFyIHp6enp6ID0gc29sZVNsb3QgPyBhdmFsb24ucXVvdGUoc29sZVNsb3QpIDogXCJudWxsXCJcblx0ICAgIHN0ciA9IHN0ci5cblx0ICAgICAgICAgICAgcmVwbGFjZSgnWFhYWFgnLCBzdHJpbmdpZnlBbm9ueW1vdXMocmVuZGVyKSkuXG5cdCAgICAgICAgICAgIHJlcGxhY2UoJ1lZWVlZJywgc3RyaW5naWZ5QW5vbnltb3VzKHJlbmRlcjIpKS5cblx0ICAgICAgICAgICAgcmVwbGFjZSgnWlpaWlonLCB6enp6eilcblxuXHQgICAgdmFyIGJlZ2luID0gc3RyLmluZGV4T2YoJ3snKSArIDFcblx0ICAgIHZhciBlbmQgPSBzdHIubGFzdEluZGV4T2YoXCJ9XCIpXG5cblx0ICAgIHZhciBsYXN0Rm4gPSBGdW5jdGlvbigndm0nLCAnbG9jYWwnLCBzdHIuc2xpY2UoYmVnaW4sIGVuZCkpXG5cdCAgICB2bW9kZWwuJHJlbmRlciA9IGxhc3RGblxuXHQgICAgc3JjWydjb21wb25lbnQtdm06JyArIGlzXSA9IHZtb2RlbFxuXG5cdCAgICByZXR1cm4gIHZtb2RlbC4kcmVuZGVyID0gbGFzdEZuXG5cblx0fVxuXHRtb2R1bGUuZXhwb3J0cyA9IGluaXRDb21wb25lbnRcblxuXHRmdW5jdGlvbiBzdHJpbmdpZnlBbm9ueW1vdXMoZm4pIHtcblx0ICAgIHJldHVybiBmbi50b1N0cmluZygpLnJlcGxhY2UoJ2Fub255bW91cycsICcnKVxuXHQgICAgICAgICAgICAucmVwbGFjZSgvXFxzKlxcL1xcKlxcKlxcLy9nLCAnJylcblx0fVxuXG5cblx0ZnVuY3Rpb24gZm5UZW1wbGF0ZSgpIHtcblx0ICAgIHZhciBzaGVsbCA9IChYWFhYWCkodm0sIGxvY2FsKTtcblx0ICAgIHZhciBzaGVsbFJvb3QgPSBzaGVsbFswXVxuXHQgICAgdmFyIHZ0cmVlID0gKFlZWVlZKSh2bSwgbG9jYWwpO1xuXHQgICAgdmFyIGNvbXBvbmVudCA9IHZ0cmVlWzBdXG5cblx0ICAgIC8v5aSE55CGZGlmZlxuXHQgICAgdmFyIG9yZGVyVW5pcSA9IHt9XG5cdCAgIFxuXHQgICAgU3RyaW5nKCdtcy13aWRnZXQsJytzaGVsbFJvb3Qub3JkZXIgKyAnLCcgKyBjb21wb25lbnQub3JkZXIpLlxuXHQgICAgICAgICAgICByZXBsYWNlKGF2YWxvbi5yd29yZCwgZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChhICE9PSAndW5kZWZpbmVkJylcblx0ICAgICAgICAgICAgICAgICAgICBvcmRlclVuaXFbYV0gPSBhXG5cdCAgICAgICAgICAgIH0pXG5cblx0ICAgIHNoZWxsUm9vdC5vcmRlciA9IE9iamVjdC5rZXlzKG9yZGVyVW5pcSkuam9pbignLCcpXG5cblx0ICAgIGZvciAodmFyIGkgaW4gc2hlbGxSb290KSB7XG5cdCAgICAgICAgaWYgKGkgIT09ICdjaGlsZHJlbicgJiYgaSAhPT0gJ3R5cGUnKSB7XG5cdCAgICAgICAgICAgIGlmIChpID09PSAncHJvcHMnKSB7XG5cdCAgICAgICAgICAgICAgICBhdmFsb24ubWl4KGNvbXBvbmVudC5wcm9wcywgc2hlbGxSb290LnByb3BzKVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgY29tcG9uZW50W2ldID0gc2hlbGxSb290W2ldXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cblxuXHQgICAgdmFyIHNvbGVTbG90ID0gWlpaWlpcblx0ICAgIHZhciBzbG90cyA9IGF2YWxvbi5jb2xsZWN0U2xvdHMoc2hlbGxSb290LCBzb2xlU2xvdClcblx0ICAgIGlmIChzb2xlU2xvdCAmJiAoIXNsb3RzW3NvbGVTbG90XSB8fCAhc2xvdHNbc29sZVNsb3RdLmxlbmd0aCkpIHtcblx0ICAgICAgICBzbG90c1tzb2xlU2xvdF0gPSBbe1xuXHQgICAgICAgICAgICAgICAgbm9kZVR5cGU6IDMsXG5cdCAgICAgICAgICAgICAgICB0eXBlOiAnI3RleHQnLFxuXHQgICAgICAgICAgICAgICAgbm9kZVZhbHVlOiB2bVtzb2xlU2xvdF0sXG5cdCAgICAgICAgICAgICAgICBkeW5hbWljOiB0cnVlXG5cdCAgICAgICAgICAgIH1dXG5cdCAgICB9XG5cdCAgICBhdmFsb24uaW5zZXJ0U2xvdHModnRyZWUsIHNsb3RzKVxuXG5cdCAgICBkZWxldGUgY29tcG9uZW50LnNraXBBdHRyc1xuXHQgICAgZGVsZXRlIGNvbXBvbmVudC5za2lwQ29udGVudFxuXHQgICAgcmV0dXJuIHZ0cmVlXG5cblx0fVxuXG5cdGZ1bmN0aW9uIHJlcGxhY2VTbG90KHZ0cmVlLCBzbG90TmFtZSkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGVsOyBlbCA9IHZ0cmVlW2ldOyBpKyspIHtcblx0ICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ3Nsb3QnKSB7XG5cdCAgICAgICAgICAgIHZ0cmVlLnNwbGljZShpLCAxLCB7XG5cdCAgICAgICAgICAgICAgICB0eXBlOiAnI2NvbW1lbnQnLFxuXHQgICAgICAgICAgICAgICAgbm9kZVZhbHVlOiAnc2xvdDonICsgKGVsLnByb3BzLm5hbWUgfHwgc2xvdE5hbWUpLFxuXHQgICAgICAgICAgICAgICAgbm9kZVR5cGU6IDgsXG5cdCAgICAgICAgICAgICAgICBkeW5hbWljOiAoZWwucHJvcHMubmFtZSB8fCBzbG90TmFtZSlcblx0ICAgICAgICAgICAgfSwge1xuXHQgICAgICAgICAgICAgICAgdHlwZTogJyNjb21tZW50Jyxcblx0ICAgICAgICAgICAgICAgIG5vZGVWYWx1ZTogJ3Nsb3QtZW5kOicsXG5cdCAgICAgICAgICAgICAgICBub2RlVHlwZTogOFxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICBpKytcblx0ICAgICAgICB9IGVsc2UgaWYgKGVsLm5vZGVUeXBlID09PSAxICYmIGVsLmNoaWxkcmVuKSB7XG5cdCAgICAgICAgICAgIHJlcGxhY2VTbG90KGVsLmNoaWxkcmVuLCBzbG90TmFtZSlcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRhdmFsb24uaW5zZXJ0U2xvdHMgPSBmdW5jdGlvbiAodnRyZWUsIHNsb3RzKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gdnRyZWVbaV07IGkrKykge1xuXHQgICAgICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gOCAmJiBzbG90c1tlbC5keW5hbWljXSkge1xuXHQgICAgICAgICAgICB2YXIgYXJncyA9IFtpICsgMSwgMF0uY29uY2F0KHNsb3RzW2VsLmR5bmFtaWNdKVxuXHQgICAgICAgICAgICB2dHJlZS5zcGxpY2UuYXBwbHkodnRyZWUsIGFyZ3MpXG5cdCAgICAgICAgICAgIGkgKz0gc2xvdHNbZWwuZHluYW1pY10ubGVuZ3RoXG5cdCAgICAgICAgfSBlbHNlIGlmIChlbC5ub2RlVHlwZSA9PT0gMSAmJiBlbC5jaGlsZHJlbikge1xuXHQgICAgICAgICAgICBhdmFsb24uaW5zZXJ0U2xvdHMoZWwuY2hpbGRyZW4sIHNsb3RzKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdGF2YWxvbi5jb2xsZWN0U2xvdHMgPSBmdW5jdGlvbiAobm9kZSwgc29sZVNsb3QpIHtcblx0ICAgIHZhciBzbG90cyA9IHt9XG5cdCAgICBpZiAoc29sZVNsb3QpIHtcblx0ICAgICAgICBzbG90c1tzb2xlU2xvdF0gPSBub2RlLmNoaWxkcmVuXG5cdCAgICAgICAgc2xvdHMuX19zb2xlX18gPSBzb2xlU2xvdFxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpKSB7XG5cdCAgICAgICAgICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gMSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBlbC5wcm9wcy5zbG90XG5cdCAgICAgICAgICAgICAgICBpZiAobmFtZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBlbC5wcm9wcy5zbG90XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2xvdHNbbmFtZV0pKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RzW25hbWVdLnB1c2goZWwpXG5cdCAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc2xvdHNbbmFtZV0gPSBbZWxdXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKGVsLmR5bmFtaWMgPT09ICdmb3InICYmIC9zbG90PVsnXCJdKFxcdyspLy50ZXN0KGVsLnRlbXBsYXRlKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGEgPSBSZWdFeHAuJDFcblx0ICAgICAgICAgICAgICAgIHNsb3RzW2FdID0gbm9kZS5jaGlsZHJlbi5zbGljZShpLCBpICsgMilcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pXG5cdCAgICB9XG5cdCAgICByZXR1cm4gc2xvdHNcblx0fVxuXG5cblx0Ly/lv4Xpobvku6XlrZfmr43lvIDlpLQs57uT5bC+5Lul5a2X5q+N5oiW5pWw5a2X57uT5p2fLOS4remXtOiHs+WwkeWHuueOsOS4gOasoVwiLVwiLFxuXHQvL+W5tuS4lOS4jeiDveWkp+WGmeWtl+avjSznibnmrornrKblj7csXCJfXCIsXCIkXCIs5rGJ5a2XXG5cdHZhciByY3VzdG9tVGFnID0gL15bYS16XShbYS16XFxkXStcXC0pK1thLXpcXGRdKyQvXG5cblx0ZnVuY3Rpb24gaXNDdXN0b21UYWcodHlwZSkge1xuXHQgICAgcmV0dXJuIHJjdXN0b21UYWcudGVzdCh0eXBlKSB8fCBhdmFsb24uY29tcG9uZW50c1t0eXBlXVxuXHR9XG5cblx0ZnVuY3Rpb24gbWl4aW5Ib29rcyh0YXJnZXQsIG9wdGlvbiwgb3ZlcndyaXRlKSB7XG5cdCAgICBmb3IgKHZhciBrIGluIG9wdGlvbikge1xuXHQgICAgICAgIHZhciB2ID0gb3B0aW9uW2tdXG5cdCAgICAgICAgLy/lpoLmnpzmmK/nlJ/lkb3lkajmnJ/pkqnlrZAs5oC75piv5LiN5pat5pS26ZuGXG5cdCAgICAgICAgaWYgKGNvbXBvbmVudEV2ZW50c1trXSkge1xuXHQgICAgICAgICAgICBpZiAoayBpbiB0YXJnZXQpIHtcblx0ICAgICAgICAgICAgICAgIHRhcmdldFtrXS5wdXNoKHYpXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0YXJnZXRba10gPSBbb3B0aW9uW2tdXVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgaWYgKG92ZXJ3cml0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGFyZ2V0W2tdID0gdlxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cbi8qKiovIH0sXG4vKiA2MyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyoqXG5cdCAqIFxuXHQkJHNraXBBcnJheTrmmK/ns7vnu5/nuqfpgJrnlKjnmoTkuI3lj6/nm5HlkKzlsZ7mgKdcblx0JHNraXBBcnJheTog5piv5b2T5YmN5a+56LGh54m55pyJ55qE5LiN5Y+v55uR5ZCs5bGe5oCnXG5cblx0IOS4jeWQjOeCueaYr1xuXHQgJCRza2lwQXJyYXnooqtoYXNPd25Qcm9wZXJ0eeWQjui/lOWbnmZhbHNlXG5cdCAkc2tpcEFycmF56KKraGFzT3duUHJvcGVydHnlkI7ov5Tlm550cnVlXG5cdCAqL1xuXG5cdG1vZHVsZS5leHBvcnRzID0gYXZhbG9uLm9uZU9iamVjdCgnJGlkLCRyZW5kZXIsJHRyYWNrLCRlbGVtZW50LCR3YXRjaCwkZmlyZSwkZXZlbnRzLCRtb2RlbCwkc2tpcEFycmF5LCRhY2Nlc3NvcnMsJGhhc2hjb2RlLCRydW4sJHdhaXQsX19wcm94eV9fLF9fZGF0YV9fLF9fY29uc3RfXycpXG5cbi8qKiovIH0sXG4vKiA2NCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHN1cHBvcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY1KVxuXHR2YXIgQ2FjaGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KVxuXHR2YXIgdXBkYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNylcblxuXHRhdmFsb24uZGlyZWN0aXZlKCdlZmZlY3QnLCB7XG5cdCAgICBwcmlvcml0eTogNSxcblx0ICAgIGRpZmY6IGZ1bmN0aW9uIChjb3B5LCBzcmMsIG5hbWUpIHtcblx0ICAgICAgICB2YXIgY29weU9iaiA9IGNvcHlbbmFtZV1cblx0ICAgICAgICBjb3B5T2JqID0gY29weS4kbW9kZWwgfHwgY29weU9ialxuXHQgICAgICAgIGlmICh0eXBlb2YgY29weU9iaiA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgdmFyIGlzID0gY29weU9ialxuXHQgICAgICAgICAgICBjb3B5T2JqID0ge1xuXHQgICAgICAgICAgICAgICAgaXM6IGlzXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjb3B5T2JqKSkge1xuXHQgICAgICAgICAgICBjb3B5T2JqID0gYXZhbG9uLm1peC5hcHBseSh7fSwgY29weU9iailcblx0ICAgICAgICB9XG5cblx0ICAgICAgICBjb3B5T2JqLmFjdGlvbiA9IGNvcHlPYmouYWN0aW9uIHx8ICdlbnRlcidcblxuXHQgICAgICAgIGlmIChPYmplY3QoY29weU9iaikgPT09IGNvcHlPYmopIHtcblx0ICAgICAgICAgICAgaWYgKGNvcHkgPT09IHNyYyB8fCBkaWZmT2JqKGNvcHlPYmosIHNyY1tuYW1lXSB8fCB7fSkpIHtcblx0ICAgICAgICAgICAgICAgIHNyY1tuYW1lXSA9IGNvcHlPYmpcblx0ICAgICAgICAgICAgICAgIHVwZGF0ZShzcmMsIHRoaXMudXBkYXRlLCAnYWZ0ZXJDaGFuZ2UnKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChjb3B5ICE9PSBzcmMpIHtcblx0ICAgICAgICAgICAgZGVsZXRlIGNvcHlbbmFtZV1cblx0ICAgICAgICB9XG5cdCAgICB9LFxuXHQgICAgdXBkYXRlOiBmdW5jdGlvbiAoZG9tLCB2bm9kZSwgcGFyZW50LCBvcHRpb24pIHtcblx0ICAgICAgICBpZiAoZG9tLmFuaW1hdGluZykge1xuXHQgICAgICAgICAgICByZXR1cm5cblx0ICAgICAgICB9XG5cdCAgICAgICAgZG9tLmFuaW1hdGluZyA9IHRydWVcblx0ICAgICAgICB2YXIgbG9jYWxlT3B0aW9uID0gdm5vZGVbJ21zLWVmZmVjdCddXG5cdCAgICAgICAgdmFyIHR5cGUgPSBsb2NhbGVPcHRpb24uaXNcblx0ICAgICAgICBvcHRpb24gPSBvcHRpb24gfHwge31cblx0ICAgICAgICBpZiAoIXR5cGUpIHsvL+WmguaenOayoeacieaMh+Wumuexu+Wei1xuXHQgICAgICAgICAgICByZXR1cm4gYXZhbG9uLndhcm4oJ25lZWQgaXMgb3B0aW9uJylcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgZWZmZWN0cyA9IGF2YWxvbi5lZmZlY3RzXG5cdCAgICAgICAgaWYgKHN1cHBvcnQuY3NzICYmICFlZmZlY3RzW3R5cGVdKSB7XG5cdCAgICAgICAgICAgIGF2YWxvbi5lZmZlY3QodHlwZSwge30pXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBnbG9iYWxPcHRpb24gPSBlZmZlY3RzW3R5cGVdXG5cdCAgICAgICAgaWYgKCFnbG9iYWxPcHRpb24pIHsvL+WmguaenOayoeacieWumuS5ieeJueaViFxuXHQgICAgICAgICAgICByZXR1cm4gYXZhbG9uLndhcm4odHlwZSArICcgZWZmZWN0IGlzIHVuZGVmaW5lZCcpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBhY3Rpb24gPSBvcHRpb24uYWN0aW9uIHx8IGxvY2FsZU9wdGlvbi5hY3Rpb25cblx0ICAgICAgICB2YXIgRWZmZWN0ID0gYXZhbG9uLkVmZmVjdFxuXHQgICAgICAgIGlmICh0eXBlb2YgRWZmZWN0LnByb3RvdHlwZVthY3Rpb25dICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBhdmFsb24ud2FybihhY3Rpb24gKyAnIGFjdGlvbiBpcyB1bmRlZmluZWQnKVxuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgZWZmZWN0ID0gbmV3IEVmZmVjdChkb20pXG5cdCAgICAgICAgdmFyIGZpbmFsT3B0aW9uID0gYXZhbG9uLm1peChvcHRpb24sIGdsb2JhbE9wdGlvbiwgbG9jYWxlT3B0aW9uKVxuXHQgICAgICAgIGlmIChmaW5hbE9wdGlvbi5xdWV1ZSkge1xuXHQgICAgICAgICAgICBhbmltYXRpb25RdWV1ZS5wdXNoKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIGVmZmVjdFthY3Rpb25dKGZpbmFsT3B0aW9uKVxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICBjYWxsTmV4dEFuaW1hdGlvbigpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICBlZmZlY3RbYWN0aW9uXShmaW5hbE9wdGlvbilcblx0ICAgICAgICAgICAgfSwgNClcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH0pXG5cdGZ1bmN0aW9uIGRpZmZPYmooYSwgYikge1xuXHQgICAgZm9yICh2YXIgaSBpbiBhKSB7XG5cdCAgICAgICAgaWYgKGFbaV0gIT09IGJbaV0pXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICB9XG5cdCAgICByZXR1cm4gZmFsc2Vcblx0fVxuXG5cdHZhciBhbmltYXRpb25RdWV1ZSA9IFtdXG5cdGZ1bmN0aW9uIGNhbGxOZXh0QW5pbWF0aW9uKCkge1xuXHQgICAgaWYgKGFuaW1hdGlvblF1ZXVlLmxvY2spXG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICB2YXIgZm4gPSBhbmltYXRpb25RdWV1ZVswXVxuXHQgICAgaWYgKGZuKSB7XG5cdCAgICAgICAgY2FsbE5leHRBbmltYXRpb24ubG9jayA9IHRydWVcblx0ICAgICAgICBmbigpXG5cdCAgICB9XG5cdH1cblxuXHRhdmFsb24uZWZmZWN0cyA9IHt9XG5cdC8v6L+Z6YeM5a6a5LmJQ1NT5Yqo55S7XG5cblxuXHRhdmFsb24uZWZmZWN0ID0gZnVuY3Rpb24gKG5hbWUsIGRlZmluaXRpb24pIHtcblx0ICAgIGF2YWxvbi5lZmZlY3RzW25hbWVdID0gZGVmaW5pdGlvbiB8fCB7fVxuXHQgICAgaWYgKHN1cHBvcnQuY3NzKSB7XG5cdCAgICAgICAgaWYgKCFkZWZpbml0aW9uLmVudGVyQ2xhc3MpIHtcblx0ICAgICAgICAgICAgZGVmaW5pdGlvbi5lbnRlckNsYXNzID0gbmFtZSArICctZW50ZXInXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghZGVmaW5pdGlvbi5lbnRlckFjdGl2ZUNsYXNzKSB7XG5cdCAgICAgICAgICAgIGRlZmluaXRpb24uZW50ZXJBY3RpdmVDbGFzcyA9IGRlZmluaXRpb24uZW50ZXJDbGFzcyArICctYWN0aXZlJ1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoIWRlZmluaXRpb24ubGVhdmVDbGFzcykge1xuXHQgICAgICAgICAgICBkZWZpbml0aW9uLmxlYXZlQ2xhc3MgPSBuYW1lICsgJy1sZWF2ZSdcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCFkZWZpbml0aW9uLmxlYXZlQWN0aXZlQ2xhc3MpIHtcblx0ICAgICAgICAgICAgZGVmaW5pdGlvbi5sZWF2ZUFjdGl2ZUNsYXNzID0gZGVmaW5pdGlvbi5sZWF2ZUNsYXNzICsgJy1hY3RpdmUnXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgaWYgKCFkZWZpbml0aW9uLmFjdGlvbikge1xuXHQgICAgICAgIGRlZmluaXRpb24uYWN0aW9uID0gJ2VudGVyJ1xuXHQgICAgfVxuXHR9XG5cblxuXHR2YXIgRWZmZWN0ID0gZnVuY3Rpb24gKGVsKSB7XG5cdCAgICB0aGlzLmVsID0gZWxcblx0fVxuXHRhdmFsb24uRWZmZWN0ID0gRWZmZWN0XG5cdEVmZmVjdC5wcm90b3R5cGUgPSB7XG5cdCAgICBlbnRlcjogY3JlYXRlQWN0aW9uKCdFbnRlcicpLFxuXHQgICAgbGVhdmU6IGNyZWF0ZUFjdGlvbignTGVhdmUnKSxcblx0ICAgIG1vdmU6IGNyZWF0ZUFjdGlvbignTW92ZScpXG5cdH1cblxuXHR2YXIgcnNlY29uZCA9IC9cXGQrcyQvXG5cdGZ1bmN0aW9uIHRvTWlsbGlzZWNvbmQoc3RyKSB7XG5cdCAgICB2YXIgcmF0aW8gPSByc2Vjb25kLnRlc3Qoc3RyKSA/IDEwMDAgOiAxXG5cdCAgICByZXR1cm4gcGFyc2VGbG9hdChzdHIpICogcmF0aW9cblx0fVxuXG5cdGZ1bmN0aW9uIGV4ZWNIb29rcyhvcHRpb25zLCBuYW1lLCBlbCkge1xuXHQgICAgdmFyIGxpc3QgPSBvcHRpb25zW25hbWVdXG5cdCAgICBsaXN0ID0gQXJyYXkuaXNBcnJheShsaXN0KSA/IGxpc3QgOiB0eXBlb2YgbGlzdCA9PT0gJ2Z1bmN0aW9uJyA/IFtsaXN0XSA6IFtdXG5cdCAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG5cdCAgICAgICAgZm4gJiYgZm4oZWwpXG5cdCAgICB9KVxuXHR9XG5cdHZhciBzdGFnZ2VyQ2FjaGUgPSBuZXcgQ2FjaGUoMTI4KVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbihhY3Rpb24pIHtcblx0ICAgIHZhciBsb3dlciA9IGFjdGlvbi50b0xvd2VyQ2FzZSgpXG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKG9wdGlvbikge1xuXHQgICAgICAgIHZhciBlbGVtID0gdGhpcy5lbFxuXHQgICAgICAgIHZhciAkZWwgPSBhdmFsb24oZWxlbSlcblx0ICAgICAgICB2YXIgZW50ZXJBbmltYXRlRG9uZVxuXHQgICAgICAgIHZhciBzdGFnZ2VyVGltZSA9IGlzRmluaXRlKG9wdGlvbi5zdGFnZ2VyKSA/IG9wdGlvbi5zdGFnZ2VyICogMTAwMCA6IDBcblx0ICAgICAgICBpZiAoc3RhZ2dlclRpbWUpIHtcblx0ICAgICAgICAgICAgaWYgKG9wdGlvbi5zdGFnZ2VyS2V5KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgc3RhZ2dlciA9IHN0YWdnZXJDYWNoZS5nZXQob3B0aW9uLnN0YWdnZXJLZXkpIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdnZXJDYWNoZS5wdXQob3B0aW9uLnN0YWdnZXJLZXksIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiAwLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIHN0YWdnZXIuY291bnQrK1xuXHQgICAgICAgICAgICAgICAgc3RhZ2dlci5pdGVtcysrXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHN0YWdnZXJJbmRleCA9IHN0YWdnZXIgJiYgc3RhZ2dlci5jb3VudCB8fCAwXG5cdCAgICAgICAgdmFyIGFuaW1hdGlvbkRvbmUgPSBmdW5jdGlvbiAoZSkge1xuXHQgICAgICAgICAgICB2YXIgaXNPayA9IGUgIT09IGZhbHNlXG5cdCAgICAgICAgICAgIGVsZW0uYW5pbWF0aW5nID0gdm9pZCAwXG5cdCAgICAgICAgICAgIGVudGVyQW5pbWF0ZURvbmUgPSB0cnVlXG5cdCAgICAgICAgICAgIHZhciBkaXJXb3JkID0gaXNPayA/ICdEb25lJyA6ICdBYm9ydCdcblx0ICAgICAgICAgICAgZXhlY0hvb2tzKG9wdGlvbiwgJ29uJyArIGFjdGlvbiArIGRpcldvcmQsIGVsZW0pXG5cdCAgICAgICAgICAgIGF2YWxvbi51bmJpbmQoZWxlbSwgc3VwcG9ydC50cmFuc2l0aW9uRW5kRXZlbnQpXG5cdCAgICAgICAgICAgIGF2YWxvbi51bmJpbmQoZWxlbSwgc3VwcG9ydC5hbmltYXRpb25FbmRFdmVudClcblx0ICAgICAgICAgICAgaWYgKHN0YWdnZXIpIHtcblx0ICAgICAgICAgICAgICAgIGlmICgtLXN0YWdnZXIuaXRlbXMgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdGFnZ2VyLmNvdW50ID0gMFxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChvcHRpb24ucXVldWUpIHtcblx0ICAgICAgICAgICAgICAgIGFuaW1hdGlvblF1ZXVlLmxvY2sgPSBmYWxzZVxuXHQgICAgICAgICAgICAgICAgYW5pbWF0aW9uUXVldWUuc2hpZnQoKVxuXHQgICAgICAgICAgICAgICAgY2FsbE5leHRBbmltYXRpb24oKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGV4ZWNIb29rcyhvcHRpb24sICdvbkJlZm9yZScgKyBhY3Rpb24sIGVsZW0pXG5cblx0ICAgICAgICBpZiAob3B0aW9uW2xvd2VyXSkge1xuXHQgICAgICAgICAgICBvcHRpb25bbG93ZXJdKGVsZW0sIGZ1bmN0aW9uIChvaykge1xuXHQgICAgICAgICAgICAgICAgYW5pbWF0aW9uRG9uZShvayAhPT0gZmFsc2UpXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmNzcykge1xuXG5cdCAgICAgICAgICAgICRlbC5hZGRDbGFzcyhvcHRpb25bbG93ZXIgKyAnQ2xhc3MnXSlcblx0ICAgICAgICAgICAgaWYgKGxvd2VyID09PSAnbGVhdmUnKSB7XG5cdCAgICAgICAgICAgICAgICAkZWwucmVtb3ZlQ2xhc3Mob3B0aW9uLmVudGVyQ2xhc3MgKyAnICcgKyBvcHRpb24uZW50ZXJBY3RpdmVDbGFzcylcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChsb3dlciA9PT0gJ2VudGVyJykge1xuXHQgICAgICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKG9wdGlvbi5sZWF2ZUNsYXNzICsgJyAnICsgb3B0aW9uLmxlYXZlQWN0aXZlQ2xhc3MpXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAkZWwuYmluZChzdXBwb3J0LnRyYW5zaXRpb25FbmRFdmVudCwgYW5pbWF0aW9uRG9uZSlcblx0ICAgICAgICAgICAgJGVsLmJpbmQoc3VwcG9ydC5hbmltYXRpb25FbmRFdmVudCwgYW5pbWF0aW9uRG9uZSlcblx0ICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICBlbnRlckFuaW1hdGVEb25lID0gYXZhbG9uLnJvb3Qub2Zmc2V0V2lkdGggPT09IE5hTlxuXHQgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKG9wdGlvbltsb3dlciArICdBY3RpdmVDbGFzcyddKVxuXHQgICAgICAgICAgICAgICAgdmFyIGNvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSlcblx0ICAgICAgICAgICAgICAgIHZhciB0cmFuRHVyYXRpb24gPSBjb21wdXRlZFN0eWxlc1tzdXBwb3J0LnRyYW5zaXRpb25EdXJhdGlvbl1cblx0ICAgICAgICAgICAgICAgIHZhciBhbmltRHVyYXRpb24gPSBjb21wdXRlZFN0eWxlc1tzdXBwb3J0LmFuaW1hdGlvbkR1cmF0aW9uXVxuXHQgICAgICAgICAgICAgICAgdmFyIHRpbWUgPSB0b01pbGxpc2Vjb25kKHRyYW5EdXJhdGlvbikgfHwgdG9NaWxsaXNlY29uZChhbmltRHVyYXRpb24pXG5cdCAgICAgICAgICAgICAgICBpZiAoIXRpbWUgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25Eb25lKGZhbHNlKVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc3RhZ2dlclRpbWUpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbnRlckFuaW1hdGVEb25lKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25Eb25lKGZhbHNlKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfSwgdGltZSArIDEzMClcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSwgMTcgKyBzdGFnZ2VyVGltZSAqIHN0YWdnZXJJbmRleCkvLyA9IDEwMDAvNjBcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRhdmFsb24uYXBwbHlFZmZlY3QgPSBmdW5jdGlvbiAobm9kZSwgdm5vZGUsIG9wdHMpIHtcblx0ICAgIHZhciBjYiA9IG9wdHMuY2Jcblx0ICAgIHZhciBob29rID0gb3B0cy5ob29rXG5cdCAgICB2YXIgY3VyRWZmZWN0ID0gdm5vZGVbJ21zLWVmZmVjdCddXG5cdCAgICBpZiAoY3VyRWZmZWN0ICYmICFhdmFsb24uZG9jdW1lbnQuaGlkZGVuKSB7XG5cdCAgICAgICAgdmFyIG9sZCA9IGN1ckVmZmVjdFtob29rXVxuXHQgICAgICAgIGlmIChjYikge1xuXHQgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvbGQpKSB7XG5cdCAgICAgICAgICAgICAgICBvbGQucHVzaChjYilcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChvbGQpIHtcblx0ICAgICAgICAgICAgICAgIGN1ckVmZmVjdFtob29rXSA9IFtvbGQsIGNiXVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgY3VyRWZmZWN0W2hvb2tdID0gW2NiXVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGdldEFjdGlvbihvcHRzKVxuXHQgICAgICAgIG5vZGUuYW5pbWF0ZSA9IHRydWVcblx0ICAgICAgICBhdmFsb24uZGlyZWN0aXZlcy5lZmZlY3QudXBkYXRlKG5vZGUsIHZub2RlLCAwLCBhdmFsb24uc2hhZG93Q29weSh7fSwgb3B0cykpXG5cblx0ICAgIH0gZWxzZSBpZiAoY2IpIHtcblx0ICAgICAgICBjYigpXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRBY3Rpb24ob3B0cykge1xuXHQgICAgaWYgKCFvcHRzLmFjdG9uKSB7XG5cdCAgICAgICAgb3B0cy5hY3Rpb24gPSBvcHRzLmhvb2sucmVwbGFjZSgvXm9uLywgJycpLnJlcGxhY2UoL0RvbmUkLywgJycpLnRvTG93ZXJDYXNlKClcblx0ICAgIH1cblx0fVxuXG5cblxuLyoqKi8gfSxcbi8qIDY1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqIOajgOa1i+a1j+iniOWZqOWvuUNTU+WKqOeUu+eahOaUr+aMgeS4jkFQSeWQjVxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cdHZhciBzdXBwb3J0VHJhbnNpdGlvbiA9IGZhbHNlXG5cdHZhciBzdXBwb3J0QW5pbWF0aW9uID0gZmFsc2Vcblx0dmFyIHN1cHBvcnRDU1MgPSBmYWxzZVxuXHR2YXIgdHJhbnNpdGlvbkVuZEV2ZW50XG5cdHZhciBhbmltYXRpb25FbmRFdmVudFxuXHR2YXIgdHJhbnNpdGlvbkR1cmF0aW9uID0gYXZhbG9uLmNzc05hbWUoJ3RyYW5zaXRpb24tZHVyYXRpb24nKVxuXHR2YXIgYW5pbWF0aW9uRHVyYXRpb24gPSBhdmFsb24uY3NzTmFtZSgnYW5pbWF0aW9uLWR1cmF0aW9uJylcblxuXHR2YXIgY2hlY2tlciA9IHtcblx0ICAgIFRyYW5zaXRpb25FdmVudDogJ3RyYW5zaXRpb25lbmQnLFxuXHQgICAgV2ViS2l0VHJhbnNpdGlvbkV2ZW50OiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG5cdCAgICBPVHJhbnNpdGlvbkV2ZW50OiAnb1RyYW5zaXRpb25FbmQnLFxuXHQgICAgb3RyYW5zaXRpb25FdmVudDogJ290cmFuc2l0aW9uRW5kJ1xuXHR9XG5cdHZhciB3aW5kb3cgPSBhdmFsb24ud2luZG93XG5cdHZhciB0cmFuXG5cdC8v5pyJ55qE5rWP6KeI5Zmo5ZCM5pe25pSv5oyB56eB5pyJ5a6e546w5LiO5qCH5YeG5YaZ5rOV77yM5q+U5aaCd2Via2l05pSv5oyB5YmN5Lik56eN77yMT3BlcmHmlK/mjIEx44CBM+OAgTRcblx0Zm9yICh2YXIgbmFtZSBpbiBjaGVja2VyKSB7XG5cdCAgICBpZiAod2luZG93W25hbWVdKSB7XG5cdCAgICAgICAgdHJhbiA9IGNoZWNrZXJbbmFtZV1cblx0ICAgICAgICBicmVha1xuXHQgICAgfVxuXHQgICAgdHJ5IHtcblx0ICAgICAgICB2YXIgYSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KG5hbWUpXG5cdCAgICAgICAgdHJhbiA9IGNoZWNrZXJbbmFtZV1cblx0ICAgICAgICBicmVha1xuXHQgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgfVxuXHR9XG5cdGlmICh0eXBlb2YgdHJhbiA9PT0gJ3N0cmluZycpIHtcblx0ICAgIHN1cHBvcnRUcmFuc2l0aW9uID0gdHJ1ZVxuXHQgICAgc3VwcG9ydENTUyA9IHRydWVcblx0ICAgIHRyYW5zaXRpb25FbmRFdmVudCA9IHRyYW5cblx0fVxuXG5cdC8vYW5pbWF0aW9uZW5k5pyJ5Lik5Liq5Y+v55So5b2i5oCBXG5cdC8vSUUxMCssIEZpcmVmb3ggMTYrICYgT3BlcmEgMTIuMSs6IGFuaW1hdGlvbmVuZFxuXHQvL0Nocm9tZS9TYWZhcmk6IHdlYmtpdEFuaW1hdGlvbkVuZFxuXHQvL2h0dHA6Ly9ibG9ncy5tc2RuLmNvbS9iL2RhdnJvdXMvYXJjaGl2ZS8yMDExLzEyLzA2L2ludHJvZHVjdGlvbi10by1jc3MzLWFuaW1hdCBpb25zLmFzcHhcblx0Ly9JRTEw5Lmf5Y+v5Lul5L2/55SoTVNBbmltYXRpb25FbmTnm5HlkKzvvIzkvYbmmK/lm57osIPph4znmoTkuovku7YgdHlwZeS+neeEtuS4umFuaW1hdGlvbmVuZFxuXHQvLyAgZWwuYWRkRXZlbnRMaXN0ZW5lcignTVNBbmltYXRpb25FbmQnLCBmdW5jdGlvbihlKSB7XG5cdC8vICAgICBhbGVydChlLnR5cGUpLy8gYW5pbWF0aW9uZW5k77yB77yB77yBXG5cdC8vIH0pXG5cdGNoZWNrZXIgPSB7XG5cdCAgICAnQW5pbWF0aW9uRXZlbnQnOiAnYW5pbWF0aW9uZW5kJyxcblx0ICAgICdXZWJLaXRBbmltYXRpb25FdmVudCc6ICd3ZWJraXRBbmltYXRpb25FbmQnXG5cdH1cblx0dmFyIGFuaVxuXHRmb3IgKG5hbWUgaW4gY2hlY2tlcikge1xuXHQgICAgaWYgKHdpbmRvd1tuYW1lXSkge1xuXHQgICAgICAgIGFuaSA9IGNoZWNrZXJbbmFtZV1cblx0ICAgICAgICBicmVha1xuXHQgICAgfVxuXHR9XG5cdGlmICh0eXBlb2YgYW5pID09PSAnc3RyaW5nJykge1xuXHQgICAgc3VwcG9ydEFuaW1hdGlvbiA9IHRydWVcblx0ICAgIHN1cHBvcnRDU1MgPSB0cnVlXG5cdCAgICBhbmltYXRpb25FbmRFdmVudCA9IGFuaVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgICB0cmFuc2l0aW9uOiBzdXBwb3J0VHJhbnNpdGlvbixcblx0ICAgIGFuaW1hdGlvbjogc3VwcG9ydEFuaW1hdGlvbixcblx0ICAgIGNzczogc3VwcG9ydENTUyxcblx0ICAgIHRyYW5zaXRpb25FbmRFdmVudDogdHJhbnNpdGlvbkVuZEV2ZW50LFxuXHQgICAgYW5pbWF0aW9uRW5kRXZlbnQ6IGFuaW1hdGlvbkVuZEV2ZW50LFxuXHQgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiB0cmFuc2l0aW9uRHVyYXRpb24sXG5cdCAgICBhbmltYXRpb25EdXJhdGlvbjogYW5pbWF0aW9uRHVyYXRpb25cblx0fVxuXG4vKioqLyB9LFxuLyogNjYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFxuXHRhdmFsb24ubGV4ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY3KVxuXHRhdmFsb24uZGlmZiA9IF9fd2VicGFja19yZXF1aXJlX18oNjkpXG5cdGF2YWxvbi5iYXRjaCA9IF9fd2VicGFja19yZXF1aXJlX18oNzApXG5cdC8vIGRpc3BhdGNo5LiOcGF0Y2gg5Li65YaF572u5qih5Z2XXG5cdHZhciBwYXJzZVZpZXcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcxKVxuXG5cdGZ1bmN0aW9uIHJlbmRlcih2dHJlZSwgbG9jYWwpIHtcblx0ICAgIHZhciBfYm9keSA9IEFycmF5LmlzQXJyYXkodnRyZWUpID8gcGFyc2VWaWV3KHZ0cmVlKSA6IHZ0cmVlXG5cdCAgICB2YXIgX2xvY2FsID0gW11cblx0ICAgIGlmIChsb2NhbCkge1xuXHQgICAgICAgIGZvciAodmFyIGkgaW4gbG9jYWwpIHtcblx0ICAgICAgICAgICAgX2xvY2FsLnB1c2goJ3ZhciAnICsgaSArICcgPSBfX2xvY2FsX19bJythdmFsb24ucXVvdGUoaSkrJ10nKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHZhciBib2R5ID0gJ19fbG9jYWxfXyA9IF9fbG9jYWxfXyB8fCB7fTtcXG4nICtcblx0ICAgICAgICAgICAgX2xvY2FsLmpvaW4oJztcXG4nKSsnXFxuJyArIF9ib2R5XG5cdCAgICB0cnl7XG5cdCAgICB2YXIgZm4gPSBGdW5jdGlvbignX192bW9kZWxfXycsICdfX2xvY2FsX18nLCBib2R5KVxuXHQgICAgfWNhdGNoKGUpe1xuXHQgICAgICAgIGF2YWxvbi53YXJuKF9ib2R5LCAncGFyc2UgZXJyb3InKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGZuXG5cdH1cblx0YXZhbG9uLnJlbmRlciA9IHJlbmRlclxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXZhbG9uXG5cblxuLyoqKi8gfSxcbi8qIDY3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqIGF2YWxvbjIuMS4x55qE5paw5byPbGV4ZXJcblx0ICog5bCG5a2X56ym5Liy5Y+Y5oiQ5LiA5Liq6Jma5oufRE9N5qCRLOaWueS+v+S7peWQjui/m+S4gOatpeWPmOaIkOaooeadv+WHveaVsFxuXHQgKiDmraTpmLbmrrXlj6rkvJrnlJ/miJBWRWxlbWVudCxWVGV4dCxWQ29tbWVudFxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cdHZhciByb3BlblRhZyA9IC9ePChbLUEtWmEtejAtOV9dKylcXHMqKFtePl0qPykoXFwvPyk+L1xuXHR2YXIgcmVuZFRhZyA9IC9ePFxcLyhbXj5dKyk+L1xuXHR2YXIgcm1zRm9yU3RhcnQgPSAvXlxccyptc1xcLWZvclxcOi9cblx0dmFyIHJtc0ZvckVuZCA9IC9eXFxzKm1zXFwtZm9yXFwtZW5kL1xuXHQvL2h0dHBzOi8vZ2l0aHViLmNvbS9ydmlzY29taS90cnVuazgvYmxvYi9tYXN0ZXIvdHJ1bms4LmpzXG5cdC8v5Yik5a6a6YeM6Z2i5pyJ5rKh5pyJ5YaF5a65XG5cdHZhciByY29udGVudCA9IC9cXFMvXG5cdHZhciB2b2lkVGFnID0gYXZhbG9uLm9uZU9iamVjdCgnYXJlYSxiYXNlLGJhc2Vmb250LGJnc291bmQsYnIsY29sLGNvbW1hbmQsZW1iZWQsJyArXG5cdCAgICAgICAgJ2ZyYW1lLGhyLGltZyxpbnB1dCxrZXlnZW4sbGluayxtZXRhLHBhcmFtLHNvdXJjZSx0cmFjayx3YnInKVxuXHR2YXIgcGxhaW5UYWcgPSBhdmFsb24ub25lT2JqZWN0KCdzY3JpcHQsc3R5bGUsdGV4dGFyZWEseG1wLG5vc2NyaXB0LG9wdGlvbix0ZW1wbGF0ZScpXG5cdHZhciBzdHJpbmdQb29sID0ge31cblx0X193ZWJwYWNrX3JlcXVpcmVfXyg2OClcblxuXHRmdW5jdGlvbiBsZXhlcihzdHIpIHtcblx0ICAgIHN0cmluZ1Bvb2wgPSB7fVxuXHQgICAgc3RyID0gY2xlYXJTdHJpbmcoc3RyKVxuXHQgICAgdmFyIHN0YWNrID0gW11cblx0ICAgIHN0YWNrLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgcmV0dXJuICBzdGFja1tzdGFjay5sZW5ndGggLSAxXVxuXHQgICAgfVxuXHQgICAgdmFyIHJldCA9IFtdXG5cblx0ICAgIHZhciBicmVha0luZGV4ID0gMTAwMDAwXG5cdCAgICBkbyB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSBmYWxzZVxuXHQgICAgICAgIGlmIChzdHIuY2hhckF0KDApICE9PSAnPCcpIHtcblx0ICAgICAgICAgICAgdmFyIGkgPSBzdHIuaW5kZXhPZignPCcpXG5cdCAgICAgICAgICAgIGkgPSBpID09PSAtMSA/IHN0ci5sZW5ndGggOiBpXG5cdCAgICAgICAgICAgIHZhciBub2RlVmFsdWUgPSBzdHIuc2xpY2UoMCwgaSkucmVwbGFjZShyZmlsbCwgZmlsbClcblx0ICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKGkpLy/lpITnkIbmlofmnKzoioLngrlcblx0ICAgICAgICAgICAgbm9kZSA9IHt0eXBlOiBcIiN0ZXh0XCIsIG5vZGVUeXBlOiAzLCBub2RlVmFsdWU6IG5vZGVWYWx1ZX1cblx0ICAgICAgICAgICAgaWYgKHJjb250ZW50LnRlc3Qobm9kZVZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgY29sbGVjdE5vZGVzKG5vZGUsIHN0YWNrLCByZXQpLy/kuI3mlLbpm4bnqbrnmb3oioLngrlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoIW5vZGUpIHtcblx0ICAgICAgICAgICAgdmFyIGkgPSBzdHIuaW5kZXhPZignPCEtLScpXG5cdCAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbCA9IHN0ci5pbmRleE9mKCctLT4nKVxuXHQgICAgICAgICAgICAgICAgaWYgKGwgPT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYXZhbG9uLmVycm9yKFwi5rOo6YeK6IqC54K55rKh5pyJ6Zet5ZCIXCIgKyBzdHIpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB2YXIgbm9kZVZhbHVlID0gc3RyLnNsaWNlKDQsIGwpLnJlcGxhY2UocmZpbGwsIGZpbGwpXG5cdCAgICAgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UobCArIDMpXG5cdCAgICAgICAgICAgICAgICBub2RlID0ge3R5cGU6IFwiI2NvbW1lbnRcIiwgbm9kZVR5cGU6IDgsIG5vZGVWYWx1ZTogbm9kZVZhbHVlfVxuXHQgICAgICAgICAgICAgICAgY29sbGVjdE5vZGVzKG5vZGUsIHN0YWNrLCByZXQpXG5cdCAgICAgICAgICAgICAgICBpZiAocm1zRm9yRW5kLnRlc3Qobm9kZVZhbHVlKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBwID0gc3RhY2subGFzdCgpXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gcCA/IHAuY2hpbGRyZW4gOiByZXRcblx0ICAgICAgICAgICAgICAgICAgICBtYXJrZVJlcGVhdFJhbmdlKG5vZGVzLCBub2Rlcy5wb3AoKSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghbm9kZSkge1xuXHQgICAgICAgICAgICB2YXIgbWF0Y2ggPSBzdHIubWF0Y2gocm9wZW5UYWcpXG5cdCAgICAgICAgICAgIGlmIChtYXRjaCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpXG5cdCAgICAgICAgICAgICAgICB2YXIgaXNWb2lkVGFnID0gdm9pZFRhZ1t0eXBlXSB8fCBtYXRjaFszXSA9PT0gJ1xcLydcblx0ICAgICAgICAgICAgICAgIG5vZGUgPSB7dHlwZTogdHlwZSwgbm9kZVR5cGU6IDEsIHByb3BzOiB7fSwgY2hpbGRyZW46IFtdLCBpc1ZvaWRUYWc6IGlzVm9pZFRhZ31cblx0ICAgICAgICAgICAgICAgIHZhciBhdHRycyA9IG1hdGNoWzJdXG5cdCAgICAgICAgICAgICAgICBpZiAoYXR0cnMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBjb2xsZWN0UHJvcHMoYXR0cnMsIG5vZGUucHJvcHMpXG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIGNvbGxlY3ROb2Rlcyhub2RlLCBzdGFjaywgcmV0KVxuXHQgICAgICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKG1hdGNoWzBdLmxlbmd0aClcblx0ICAgICAgICAgICAgICAgIGlmIChpc1ZvaWRUYWcpIHtcblx0ICAgICAgICAgICAgICAgICAgICBub2RlLmZpcmUgPSBub2RlLmlzVm9pZFRhZyA9IHRydWVcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChub2RlKVxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChwbGFpblRhZ1t0eXBlXSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBzdHIuaW5kZXhPZihcIjwvXCIgKyB0eXBlICsgJz4nKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5uZXJIVE1MID0gc3RyLnNsaWNlKDAsIGluZGV4KS50cmltKClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKGluZGV4KVxuXHQgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5uZXJIVE1MKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHlsZSc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2NyaXB0Jzpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdub3NjcmlwdCc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndGVtcGxhdGUnOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3htcCc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2tpcENvbnRlbnQgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbm5lckhUTUwpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4ucHVzaCh7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVR5cGU6IDMsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJyN0ZXh0Jyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwQ29udGVudDogdHJ1ZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlVmFsdWU6IG5vbWFsU3RyaW5nKGlubmVySFRNTClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0ZXh0YXJlYSc6XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2tpcENvbnRlbnQgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucHJvcHMudHlwZSA9ICd0ZXh0YXJlYSdcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wcm9wcy52YWx1ZSA9IG5vbWFsU3RyaW5nKGlubmVySFRNTClcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcHRpb24nOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goe1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVR5cGU6IDMsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnI3RleHQnLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVZhbHVlOiBub21hbFN0cmluZyh0cmltSFRNTChpbm5lckhUTUwpKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICghbm9kZSkge1xuXHQgICAgICAgICAgICB2YXIgbWF0Y2ggPSBzdHIubWF0Y2gocmVuZFRhZylcblx0ICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKClcblx0ICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gc3RhY2subGFzdCgpXG5cdCAgICAgICAgICAgICAgICBpZiAoIWxhc3QpIHtcblx0ICAgICAgICAgICAgICAgICAgICBhdmFsb24uZXJyb3IobWF0Y2hbMF0gKyAn5YmN6Z2i57y65bCRPCcgKyB0eXBlICsgJz4nKVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0LnR5cGUgIT09IHR5cGUpIHtcblx0ICAgICAgICAgICAgICAgICAgICBhdmFsb24uZXJyb3IobGFzdC50eXBlICsgJ+ayoeaciemXreWQiCcpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBub2RlID0gc3RhY2sucG9wKClcblx0ICAgICAgICAgICAgICAgIG5vZGUuZmlyZSA9IHRydWVcblx0ICAgICAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZShtYXRjaFswXS5sZW5ndGgpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICBpZiAoIW5vZGUgfHwgLS1icmVha0luZGV4ID09PSAwKSB7XG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChub2RlLmZpcmUpIHtcblx0ICAgICAgICAgICAgZmlyZUVuZChub2RlLCBzdGFjaywgcmV0KVxuXHQgICAgICAgICAgICBkZWxldGUgbm9kZS5maXJlXG5cdCAgICAgICAgfVxuXG5cdCAgICB9IHdoaWxlIChzdHIubGVuZ3RoKTtcblxuXHQgICAgcmV0dXJuIHJldFxuXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGxleGVyXG5cblx0ZnVuY3Rpb24gZmlyZUVuZChub2RlLCBzdGFjaywgcmV0KSB7XG5cdCAgICB2YXIgdHlwZSA9IG5vZGUudHlwZVxuXHQgICAgdmFyIHByb3BzID0gbm9kZS5wcm9wc1xuXHQgICAgc3dpdGNoICh0eXBlKSB7XG5cdCAgICAgICAgY2FzZSAnaW5wdXQnOlxuXHQgICAgICAgICAgICBpZiAoIXByb3BzLnR5cGUpIHtcblx0ICAgICAgICAgICAgICAgIHByb3BzLnR5cGUgPSAndGV4dCdcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBicmVha1xuXHQgICAgICAgIGNhc2UgJ3NlbGVjdCc6XG5cdCAgICAgICAgICAgIHByb3BzLnR5cGUgPSB0eXBlICsgJy0nICsgcHJvcHMuaGFzT3duUHJvcGVydHkoJ211bHRpcGxlJykgPyAnbXVsdGlwbGUnIDogJ29uZSdcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICBjYXNlICd0YWJsZSc6XG5cdCAgICAgICAgICAgIGFkZFRib2R5KG5vZGUuY2hpbGRyZW4pXG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgaWYgKHR5cGUuaW5kZXhPZignbXMtJykgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgIHByb3BzLmlzID0gdHlwZVxuXHQgICAgICAgICAgICAgICAgaWYgKCFwcm9wc1snbXMtd2lkZ2V0J10pIHtcblx0ICAgICAgICAgICAgICAgICAgICBwcm9wc1snbXMtd2lkZ2V0J10gPSAne2lzOicgKyBhdmFsb24ucXVvdGUodHlwZSkgKyAnfSdcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAocHJvcHNbJ21zLXdpZGdldCddKSB7XG5cdCAgICAgICAgICAgICAgICBub2RlLnRlbXBsYXRlID0gYXZhbG9uLnZkb21BZGFwdG9yKG5vZGUsICd0b0hUTUwnKVxuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgIH1cblx0ICAgIHZhciBmb3JFeHByID0gcHJvcHNbJ21zLWZvciddXG5cdCAgICBpZiAoZm9yRXhwcikge1xuXHQgICAgICAgIGRlbGV0ZSBwcm9wc1snbXMtZm9yJ11cblx0ICAgICAgICB2YXIgcCA9IHN0YWNrLmxhc3QoKVxuXHQgICAgICAgIHZhciBhcnIgPSBwID8gcC5jaGlsZHJlbiA6IHJldFxuXHQgICAgICAgIGFyci5zcGxpY2UoYXJyLmxlbmd0aCAtIDEsIDAsIHtcblx0ICAgICAgICAgICAgbm9kZVR5cGU6IDgsXG5cdCAgICAgICAgICAgIHR5cGU6ICcjY29tbWVudCcsXG5cdCAgICAgICAgICAgIG5vZGVWYWx1ZTogJ21zLWZvcjonICsgZm9yRXhwclxuXHQgICAgICAgIH0pXG5cblx0ICAgICAgICBtYXJrZVJlcGVhdFJhbmdlKGFyciwge1xuXHQgICAgICAgICAgICBub2RlVHlwZTogOCxcblx0ICAgICAgICAgICAgdHlwZTogJyNjb21tZW50Jyxcblx0ICAgICAgICAgICAgbm9kZVZhbHVlOiAnbXMtZm9yLWVuZDonXG5cdCAgICAgICAgfSlcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIG1hcmtlUmVwZWF0UmFuZ2Uobm9kZXMsIGVuZCkge1xuXHQgICAgZW5kLmR5bmFtaWMgPSB0cnVlXG5cdCAgICBlbmQuc2lnbmF0dXJlID0gYXZhbG9uLm1ha2VIYXNoQ29kZSgnZm9yJylcblx0ICAgIHZhciBhcnJheSA9IFtdLCBzdGFydCwgZGVlcCA9IDFcblx0ICAgIHdoaWxlIChzdGFydCA9IG5vZGVzLnBvcCgpKSB7XG5cdCAgICAgICAgaWYgKHN0YXJ0Lm5vZGVUeXBlID09PSA4KSB7XG5cdCAgICAgICAgICAgIGlmIChybXNGb3JFbmQudGVzdChzdGFydC5ub2RlVmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICArK2RlZXBcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChybXNGb3JTdGFydC50ZXN0KHN0YXJ0Lm5vZGVWYWx1ZSkpIHtcblx0ICAgICAgICAgICAgICAgIC0tZGVlcFxuXHQgICAgICAgICAgICAgICAgaWYgKGRlZXAgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdGFydC5ub2RlVmFsdWUgPSBzdGFydC5ub2RlVmFsdWUucmVwbGFjZShyZmlsbCwgZmlsbCkgICAgICAgIC8vbm9tYWxTdHJpbmcoc3RhcnQubm9kZVZhbHVlKVxuXHQgICAgICAgICAgICAgICAgICAgIHN0YXJ0LnNpZ25hdHVyZSA9IGVuZC5zaWduYXR1cmVcblx0ICAgICAgICAgICAgICAgICAgICBzdGFydC5keW5hbWljID0gJ2Zvcidcblx0ICAgICAgICAgICAgICAgICAgICBzdGFydC50ZW1wbGF0ZSA9IGFycmF5Lm1hcChmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXZhbG9uLnZkb21BZGFwdG9yKGEsICd0b0hUTUwnKVxuXHQgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpXG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBhcnJheVswXVxuXHQgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnByb3BzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYiA9IGVsZW1lbnQucHJvcHNbJ2RhdGEtZm9yLXJlbmRlcmVkJ11cblx0ICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2lkID0gY2IgKyAnOmNiJ1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhdmFsb24uY2FjaGVzW3dpZF0pIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmFsb24uY2FjaGVzW3dpZF0gPSBGdW5jdGlvbigncmV0dXJuICcgKyBhdmFsb24ucGFyc2VFeHByKGNiLCAnb24nKSkoKVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQud2lkID0gd2lkXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaChzdGFydCwgW10sIGVuZClcblx0ICAgICAgICAgICAgICAgICAgICBicmVha1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGFycmF5LnVuc2hpZnQoc3RhcnQpXG5cdCAgICB9XG5cblx0fVxuXG5cblx0ZnVuY3Rpb24gY29sbGVjdE5vZGVzKG5vZGUsIHN0YWNrLCByZXQpIHtcblx0ICAgIHZhciBwID0gc3RhY2subGFzdCgpXG5cdCAgICBpZiAocCkge1xuXHQgICAgICAgIHAuY2hpbGRyZW4ucHVzaChub2RlKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICByZXQucHVzaChub2RlKVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gY29sbGVjdFByb3BzKGF0dHJzLCBwcm9wcykge1xuXHQgICAgYXR0cnMucmVwbGFjZShybm93aGl0ZSwgZnVuY3Rpb24gKHByb3ApIHtcblx0ICAgICAgICB2YXIgYXJyID0gcHJvcC5zcGxpdCgnPScpXG5cdCAgICAgICAgdmFyIG5hbWUgPSBhcnJbMF1cblx0ICAgICAgICB2YXIgdmFsdWUgPSBhcnJbMV0gfHwgJydcblx0ICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09ICc6Jykge1xuXHQgICAgICAgICAgICBuYW1lID0gJ21zLScgKyBuYW1lLnNsaWNlKDEpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmICh2YWx1ZSkge1xuXHQgICAgICAgICAgICBpZiAodmFsdWUuaW5kZXhPZignPz8nKSA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgdmFsdWUgPSBub21hbFN0cmluZyh2YWx1ZSkuXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2UocmxpbmVTcCwgJycpLlxuXHQgICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKC9cXFwiL2csIFwiJ1wiKS5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UoMSwgLTEpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKCEobmFtZSBpbiBwcm9wcykpIHtcblx0ICAgICAgICAgICAgcHJvcHNbbmFtZV0gPSB2YWx1ZVxuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cblx0fVxuXHRmdW5jdGlvbiBub21hbFN0cmluZyhzdHIpIHtcblx0ICAgIHJldHVybiBhdmFsb24udW5lc2NhcGVIVE1MKHN0ci5yZXBsYWNlKHJmaWxsLCBmaWxsKSlcblx0fVxuXG5cdGZ1bmN0aW9uIGNsZWFyU3RyaW5nKHN0cikge1xuXHQgICAgdmFyIGFycmF5ID0gcmVhZFN0cmluZyhzdHIpXG5cdCAgICBmb3IgKHZhciBpID0gMCwgbiA9IGFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHQgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKGFycmF5W2ldLCBkaWcpXG5cdCAgICB9XG5cdCAgICByZXR1cm4gc3RyXG5cdH1cblx0ZnVuY3Rpb24gcmVhZFN0cmluZyhzdHIpIHtcblx0ICAgIHZhciBlbmQsIHMgPSAwXG5cdCAgICB2YXIgcmV0ID0gW11cblx0ICAgIGZvciAodmFyIGkgPSAwLCBuID0gc3RyLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHQgICAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKVxuXHQgICAgICAgIGlmICghZW5kKSB7XG5cdCAgICAgICAgICAgIGlmIChjID09PSBcIidcIikge1xuXHQgICAgICAgICAgICAgICAgZW5kID0gXCInXCJcblx0ICAgICAgICAgICAgICAgIHMgPSBpXG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJ1wiJykge1xuXHQgICAgICAgICAgICAgICAgZW5kID0gJ1wiJ1xuXHQgICAgICAgICAgICAgICAgcyA9IGlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGlmIChjID09PSAnXFxcXCcpIHtcblx0ICAgICAgICAgICAgICAgIGkgKz0gMVxuXHQgICAgICAgICAgICAgICAgY29udGludWVcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoYyA9PT0gZW5kKSB7XG5cdCAgICAgICAgICAgICAgICByZXQucHVzaChzdHIuc2xpY2UocywgaSArIDEpKVxuXHQgICAgICAgICAgICAgICAgZW5kID0gZmFsc2Vcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiByZXRcblx0fVxuXG5cdHZhciByZmlsbCA9IC9cXD9cXD9cXGQrL2dcblx0dmFyIHJsaW5lU3AgPSAvXFxuXFxzKi9nXG5cdHZhciBybm93aGl0ZSA9IC9cXFMrL2dcblx0dmFyIG51bWJlciA9IDFcblx0ZnVuY3Rpb24gZGlnKGEpIHtcblx0ICAgIHZhciBrZXkgPSAnPz8nICsgbnVtYmVyKytcblx0ICAgIHN0cmluZ1Bvb2xba2V5XSA9IGFcblx0ICAgIHJldHVybiBrZXlcblx0fVxuXHRmdW5jdGlvbiBmaWxsKGEpIHtcblx0ICAgIHZhciB2YWwgPSBzdHJpbmdQb29sW2FdXG5cdCAgICByZXR1cm4gdmFsXG5cdH1cblx0Ly/kuJPpl6jnlKjkuo7lpITnkIZvcHRpb27moIfnrb7ph4zpnaLnmoTmoIfnrb5cblx0dmFyIHJ0cmltSFRNTCA9IC88XFx3KyhcXHMrKFwiW15cIl0qXCJ8J1teJ10qJ3xbXj5dKSspPz58PFxcL1xcdys+L2dpXG5cdGZ1bmN0aW9uIHRyaW1IVE1MKHYpIHtcblx0ICAgIHJldHVybiBTdHJpbmcodikucmVwbGFjZShydHJpbUhUTUwsICcnKS50cmltKClcblx0fVxuXG5cdC8v5aaC5p6c55u05o6l5bCGdHLlhYPntKDlhpl0YWJsZeS4i+mdoizpgqPkuYjmtY/op4jlmajlsIblsIblroPku6wo55u46YK755qE6YKj5Yeg5LiqKSzmlL7liLDkuIDkuKrliqjmgIHliJvlu7rnmoR0Ym9keeW6leS4i1xuXHRmdW5jdGlvbiBhZGRUYm9keShub2Rlcykge1xuXHQgICAgdmFyIHRib2R5LCBuZWVkQWRkVGJvZHkgPSBmYWxzZSwgY291bnQgPSAwLCBzdGFydCA9IDAsIG4gPSBub2Rlcy5sZW5ndGhcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG5cdCAgICAgICAgdmFyIG5vZGUgPSBub2Rlc1tpXVxuXHQgICAgICAgIGlmICghdGJvZHkpIHtcblx0ICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ3RyJykge1xuXHQgICAgICAgICAgICAgICAgdGJvZHkgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbm9kZVR5cGU6IDEsXG5cdCAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Rib2R5Jyxcblx0ICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW10sXG5cdCAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHt9XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB0Ym9keS5jaGlsZHJlbi5wdXNoKG5vZGUpXG5cdCAgICAgICAgICAgICAgICBuZWVkQWRkVGJvZHkgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICBpZiAoc3RhcnQgPT09IDApXG5cdCAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBpXG5cdCAgICAgICAgICAgICAgICBub2Rlc1tpXSA9IHRib2R5XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBpZiAobm9kZS50eXBlICE9PSAndHInICYmIG5vZGUubm9kZVR5cGUgPT09IDEpIHtcblx0ICAgICAgICAgICAgICAgIHRib2R5ID0gZmFsc2Vcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRib2R5LmNoaWxkcmVuLnB1c2gobm9kZSlcblx0ICAgICAgICAgICAgICAgIGNvdW50Kytcblx0ICAgICAgICAgICAgICAgIG5vZGVzW2ldID0gMFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBpZiAobmVlZEFkZFRib2R5KSB7XG5cdCAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPCBuOyBpKyspIHtcblx0ICAgICAgICAgICAgaWYgKG5vZGVzW2ldID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSlcblx0ICAgICAgICAgICAgICAgIGktLVxuXHQgICAgICAgICAgICAgICAgY291bnQtLVxuXHQgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cblxuLyoqKi8gfSxcbi8qIDY4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRhdmFsb24uc3BlZWRVcCA9IGZ1bmN0aW9uIChhcnIpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgaGFzRGlyZWN0aXZlKGFycltpXSlcblx0ICAgIH1cblx0ICAgIHJldHVybiBhcnJcblx0fVxuXG5cdGZ1bmN0aW9uIGhhc0RpcmVjdGl2ZShhKSB7XG5cdCAgICBzd2l0Y2ggKGEubm9kZVR5cGUpIHtcblx0ICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgICAgIGlmIChhdmFsb24uY29uZmlnLnJiaW5kLnRlc3QoYS5ub2RlVmFsdWUpKSB7XG5cdCAgICAgICAgICAgICAgICBhLmR5bmFtaWMgPSAnZXhwcidcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBhLnNraXBDb250ZW50ID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICBjYXNlIDg6XG5cdCAgICAgICAgICAgIGlmIChhLmR5bmFtaWMpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBhLnNraXBDb250ZW50ID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICBjYXNlIDE6XG5cdCAgICAgICAgICAgIGlmIChhLnByb3BzWydtcy1za2lwJ10pIHtcblx0ICAgICAgICAgICAgICAgIGEuc2tpcEF0dHJzID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgYS5za2lwQ29udGVudCA9IHRydWVcblx0ICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICgvXm1zXFwtLy50ZXN0KGEudHlwZSkgfHwgaGFzRGlyZWN0aXZlQXR0cnMoYS5wcm9wcykpIHtcblx0ICAgICAgICAgICAgICAgIGEuZHluYW1pYyA9IHRydWVcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGEuc2tpcEF0dHJzID0gdHJ1ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChhLmlzVm9pZFRhZyAmJiAhYS5keW5hbWljKSB7XG5cdCAgICAgICAgICAgICAgICBhLnNraXBDb250ZW50ID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIGhhc0RpcmVjdGl2ZSA9IGNoaWxkcmVuSGFzRGlyZWN0aXZlKGEuY2hpbGRyZW4pXG5cdCAgICAgICAgICAgIGlmICghaGFzRGlyZWN0aXZlICYmICFhLmR5bmFtaWMpIHtcblx0ICAgICAgICAgICAgICAgIGEuc2tpcENvbnRlbnQgPSB0cnVlXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRyZW5IYXNEaXJlY3RpdmUoYSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gY2hpbGRyZW5IYXNEaXJlY3RpdmUoYXJyKSB7XG5cdCAgICB2YXIgcmV0ID0gZmFsc2Vcblx0ICAgIGZvciAodmFyIGkgPSAwLCBlbDsgZWwgPSBhcnJbaSsrXTsgKSB7XG5cdCAgICAgICAgaWYgKGhhc0RpcmVjdGl2ZShlbCkpIHtcblx0ICAgICAgICAgICAgcmV0ID0gdHJ1ZVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiByZXRcblx0fVxuXHR2YXIgcmRpckF0dHIgPSAvXihcXDp8bXNcXC0pXFx3L1xuXHRmdW5jdGlvbiBoYXNEaXJlY3RpdmVBdHRycyhwcm9wcykge1xuXHQgICAgaWYgKCdtcy1za2lwJyBpbiBwcm9wcylcblx0ICAgICAgICByZXR1cm4gZmFsc2Vcblx0ICAgIGZvciAodmFyIGkgaW4gcHJvcHMpIHtcblx0ICAgICAgICBpZiAocmRpckF0dHIudGVzdChpKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBmYWxzZVxuXHR9XG5cblxuLyoqKi8gfSxcbi8qIDY5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQvKipcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqIGRpZmYg5a+55q+U5paw5pen5Lik5Liq6Jma5oufRE9N5qCRLOagueaNrmRpcmVjdGl2ZeS4reeahGRpZmbmlrnms5XkuLrmlrDomZrmi59ET03moJFcblx0ICog5re75YqgY2hhbmdlLCBhZnRlckNoYW5nZeabtOaWsOmSqeWtkFxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cdHZhciBlbXB0eUFyciA9IFtdXG5cdC8vIOmYsuatouiiq+W8leeUqFxuXHR2YXIgZW1wdHlPYmogPSBmdW5jdGlvbiAoKSB7XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICAgIGNoaWxkcmVuOiBbXSwgcHJvcHM6IHt9XG5cdCAgICB9XG5cdH1cblx0dmFyIGRpcmVjdGl2ZXMgPSBhdmFsb24uZGlyZWN0aXZlc1xuXHR2YXIgcmJpbmRpbmcgPSAvXm1zLShcXHcrKS0/KC4qKS9cblxuXHRmdW5jdGlvbiBkaWZmKGNvcHlzLCBzb3VyY2VzKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcHlzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgdmFyIGNvcHkgPSBjb3B5c1tpXVxuXHQgICAgICAgIHZhciBzcmMgPSBzb3VyY2VzW2ldIHx8IGVtcHR5T2JqKClcblxuXHQgICAgICAgIHN3aXRjaCAoY29weS5ub2RlVHlwZSkge1xuXHQgICAgICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgICAgICAgICBpZiAoY29weS5keW5hbWljKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlcy5leHByLmRpZmYoY29weSwgc3JjKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSA4OlxuXHQgICAgICAgICAgICAgICAgaWYgKGNvcHkuZHluYW1pYyA9PT0gJ2ZvcicpIHsvL+avlOi+g+W+queOr+WMuuWfn+eahOWFg+e0oOS9jee9rlxuXHQgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXNbJ2ZvciddLmRpZmYoY29weSwgc3JjLCBjb3B5cywgc291cmNlcywgaSlcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3JjLmFmdGVyQ2hhbmdlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZXhlY0hvb2tzKHNyYywgc3JjLmFmdGVyQ2hhbmdlKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgY2FzZSAxOlxuXHQgICAgICAgICAgICAgICAgaWYgKGNvcHkub3JkZXIpIHtcblx0ICAgICAgICAgICAgICAgICAgICBkaWZmUHJvcHMoY29weXMsIHNvdXJjZXMsIGkpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBjb3B5ID0gY29weXNbaV1cblx0ICAgICAgICAgICAgICAgIHNyYyA9IHNvdXJjZXNbaV1cblx0ICAgICAgICAgICAgICAgIGlmIChjb3B5Lm5vZGVUeXBlID09PSAxICYmICFjb3B5LnNraXBDb250ZW50ICYmICFjb3B5LmlzVm9pZFRhZykge1xuXHQgICAgICAgICAgICAgICAgICAgIGRpZmYoY29weS5jaGlsZHJlbiwgc3JjICYmIHNyYy5jaGlsZHJlbiB8fCBbXSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmIChzcmMgJiYgc3JjLmFmdGVyQ2hhbmdlKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZXhlY0hvb2tzKHNyYywgc3JjLmFmdGVyQ2hhbmdlKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICAgICAgZGVmYXVsdDpcblx0ICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvcHkpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZGlmZihjb3B5LCBzcmMpLy/mr5TovoPlvqrnjq/ljLrln5/nmoTlhoXlrrlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGJyZWFrXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gZXhlY0hvb2tzKGVsLCBob29rcykge1xuXHQgICAgaWYgKGhvb2tzLmxlbmd0aCkge1xuXHQgICAgICAgIGZvciAodmFyIGhvb2ssIGkgPSAwOyBob29rID0gaG9va3NbaSsrXTsgKSB7XG5cdCAgICAgICAgICAgIGhvb2soZWwuZG9tLCBlbClcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBkZWxldGUgZWwuYWZ0ZXJDaGFuZ2Vcblx0fVxuXG5cdGZ1bmN0aW9uIGRpZmZQcm9wcyhjb3B5cywgc291cmNlcywgaW5kZXgpIHtcblx0ICAgIHZhciBvcmRlciA9IGNvcHlzW2luZGV4XS5vcmRlclxuXHQgICAgaWYgKG9yZGVyKSB7XG5cdCAgICAgICAgdmFyIG9sZE9yZGVyID0gb3JkZXJcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICB2YXIgYXJyID0gb3JkZXIubWF0Y2goYXZhbG9uLnJ3b3JkKVxuXHQgICAgICAgICAgICB2YXIgY2hlY2tlZCA9IHt9XG5cdCAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspe1xuXHQgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBhcnJbaV1cblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgaWYgKGNoZWNrZWRbbmFtZV0pIHtcblx0ICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICBjaGVja2VkW25hbWVdID0gMVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gbmFtZS5tYXRjaChyYmluZGluZylcblx0ICAgICAgICAgICAgICAgIHZhciB0eXBlID0gbWF0Y2ggJiYgbWF0Y2hbMV1cblx0ICAgICAgICAgICAgICAgIGlmIChkaXJlY3RpdmVzW3R5cGVdKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlc1t0eXBlXS5kaWZmKGNvcHlzW2luZGV4XSwgc291cmNlc1tpbmRleF0gfHwgZW1wdHlPYmooKSwgbmFtZSwgY29weXMsIHNvdXJjZXMsIGluZGV4KVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgdmFyIG5ld09yZGVyID0gY29weXNbaW5kZXhdLm9yZGVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIW5ld09yZGVyKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZSgwLCBhcnIubGVuZ3RoKVxuXHQgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdPcmRlciAhPT0gb2xkT3JkZXIpIHtcblx0ICAgICAgICAgICAgICAgICAgICBhcnIucHVzaC5hcHBseShhcnIsIG5ld09yZGVyLm1hdGNoKGF2YWxvbi5yd29yZCkpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgYXZhbG9uLndhcm4odHlwZSwgZSwgZS5zdGFjayB8fCBlLm1lc3NhZ2UsICdkaWZmUHJvcHMgZXJyb3InKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXHRhdmFsb24uZGlmZlByb3BzID0gZGlmZlByb3BzXG5cdG1vZHVsZS5leHBvcnRzID0gZGlmZlxuXG5cbi8qKiovIH0sXG4vKiA3MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XG5cdC8qKlxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICogYmF0Y2gg5ZCM5pe25a+5TuS4quinhuWbvui/m+ihjOWFqOmHj+abtOaWsFxuXHQgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0ICovXG5cblx0dmFyIHJlY29uY2lsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpXG5cblx0Ly/lpoLmnpzmraPlnKjmm7TmlrDkuIDkuKrlrZDmoJEs6YKj5LmI5bCG5a6D5pS+5YiwXG5cdHZhciBuZWVkUmVuZGVySWRzID0gW11cblx0dmFyIHJlbmRlcmluZ0lEID0gZmFsc2Vcblx0YXZhbG9uLnN1c3BlbmRVcGRhdGUgPSAwXG5cblxuXHRmdW5jdGlvbiBiYXRjaFVwZGF0ZShpZCkge1xuXHQgICAgaWYgKHJlbmRlcmluZ0lEKSB7XG5cdCAgICAgICAgcmV0dXJuIGF2YWxvbi5BcnJheS5lbnN1cmUobmVlZFJlbmRlcklkcywgaWQpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJlbmRlcmluZ0lEID0gaWRcblx0ICAgIH1cblx0ICAgIHZhciBzY29wZSA9IGF2YWxvbi5zY29wZXNbaWRdXG5cdCAgICBpZiAoIXNjb3BlIHx8ICFkb2N1bWVudC5ub2RlTmFtZSB8fCBhdmFsb24uc3VzcGVuZFVwZGF0ZSkge1xuXHQgICAgICAgIHJldHVybiByZW5kZXJpbmdJRCA9IG51bGxcblx0ICAgIH1cblx0ICAgIHZhciB2bSA9IHNjb3BlLnZtb2RlbFxuXHQgICAgdmFyIGRvbSA9IHZtLiRlbGVtZW50XG5cdCAgICB2YXIgc291cmNlID0gZG9tLnZ0cmVlIHx8IFtdXG5cdCAgICB2YXIgcmVuZGVyRm4gPSB2bS4kcmVuZGVyXG5cdCAgICB2YXIgY29weSA9IHJlbmRlckZuKHNjb3BlLnZtb2RlbCwgc2NvcGUubG9jYWwpXG5cdCAgICBpZiAoc2NvcGUuaXNUZW1wKSB7XG5cdCAgICAgICAgLy/lnKjmnIDlvIDlp4vml7Ys5pu/5o2i5L2c55So5Z+f55qE5omA5pyJ6IqC54K5LOehruS/neiZmuaLn0RPTeS4juecn+WunkRPTeaYr+Wvuem9kOeahFxuXHQgICAgICAgIHJlY29uY2lsZShbZG9tXSwgc291cmNlLCBkb20ucGFyZW50Tm9kZSlcblx0ICAgICAgICBkZWxldGUgYXZhbG9uLnNjb3Blc1tpZF1cblx0ICAgIH1cblx0ICAgIGF2YWxvbi5kaWZmKGNvcHksIHNvdXJjZSlcblxuXG5cdCAgICB2YXIgaW5kZXggPSBuZWVkUmVuZGVySWRzLmluZGV4T2YocmVuZGVyaW5nSUQpXG5cdCAgICByZW5kZXJpbmdJRCA9IDBcblx0ICAgIGlmIChpbmRleCA+IC0xKSB7XG5cdCAgICAgICAgdmFyIHJlbW92ZWQgPSBuZWVkUmVuZGVySWRzLnNwbGljZShpbmRleCwgMSlcblx0ICAgICAgICByZXR1cm4gYmF0Y2hVcGRhdGUocmVtb3ZlZFswXSlcblx0ICAgIH1cblxuXHQgICAgdmFyIG1vcmUgPSBuZWVkUmVuZGVySWRzLnNoaWZ0KClcblx0ICAgIGlmIChtb3JlKSB7XG5cdCAgICAgICAgYmF0Y2hVcGRhdGUobW9yZSlcblx0ICAgIH1cblx0fVxuXG5cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF2YWxvbi5iYXRjaCA9IGJhdGNoVXBkYXRlXG5cblxuLyoqKi8gfSxcbi8qIDcxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKlxuXHQgKiDmnKzmqKHlnZfmmK/nlKjkuo7lsIbomZrmi59ET03lj5jmiJDkuIDkuKrlh73mlbBcblx0ICovXG5cblx0dmFyIGV4dHJhY3RCaW5kaW5ncyA9IF9fd2VicGFja19yZXF1aXJlX18oNzIpXG5cdHZhciBzdHJpbmdpZnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKVxuXHR2YXIgcGFyc2VFeHByID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3Mylcblx0dmFyIGRlY29kZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpXG5cdHZhciBjb25maWcgPSBhdmFsb24uY29uZmlnXG5cdHZhciBxdW90ZSA9IGF2YWxvbi5xdW90ZVxuXHR2YXIgcmlkZW50ID0gL15bJGEtekEtWl9dWyRhLXpBLVowLTlfXSokL1xuXHR2YXIgcnN0YXRlbWVudCA9IC9eXFxzKnZhclxccysoWyRcXHddKylcXHMqXFw9XFxzKlxcUysvXG5cdHZhciBza2lwcyA9IHtfX2xvY2FsX186IDEsIHZtb2RlOiAxLCBkb206IDF9XG5cblxuXHRmdW5jdGlvbiBwYXJzZU5vZGVzKHNvdXJjZSwgaW5uZXIpIHtcblx0ICAgIC8vbXMtaW1wb3J0YW5077yMIG1zLWNvbnRyb2xsZXIg77yMIG1zLWZvciDkuI3lj6/lpI3liLbvvIznnIHlvpfmrbvlvqrnjq9cblx0ICAgIC8vbXMtaW1wb3J0YW50IC0tPiBtcy1jb250cm9sbGVyIC0tPiBtcy1mb3IgLS0+IG1zLXdpZGdldCAtLT4gbXMtZWZmZWN0IC0tPiBtcy1pZlxuXHQgICAgdmFyIGJ1ZmZlciA9IGlubmVyID8gW10gOiBbJ1xcbnZhciB2bm9kZXMgPSBbXTsnXVxuXG5cdCAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gc291cmNlW2krK107ICkge1xuXHQgICAgICAgIHZhciB2bm9kZSA9IHBhcnNlTm9kZShlbClcblx0ICAgICAgICBpZiAoZWwuJHByZXBlbmQpIHtcblx0ICAgICAgICAgICAgYnVmZmVyLnB1c2goZWwuJHByZXBlbmQpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBhcHBlbmQgPSBlbC4kYXBwZW5kXG5cdCAgICAgICAgZGVsZXRlIGVsLiRhcHBlbmRcblx0ICAgICAgICBkZWxldGUgZWwuJHByZXBlbmRcblx0ICAgICAgICBpZiAodm5vZGUpIHtcblx0ICAgICAgICAgICAgYnVmZmVyLnB1c2godm5vZGUgKyAnXFxuJylcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGFwcGVuZCkge1xuXHQgICAgICAgICAgICBidWZmZXIucHVzaChhcHBlbmQpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgaWYgKCFpbm5lcikge1xuXHQgICAgICAgIGJ1ZmZlci5wdXNoKCdyZXR1cm4gdm5vZGVzXFxuJylcblx0ICAgIH1cblx0ICAgIHJldHVybiBidWZmZXIuam9pbignXFxuJylcblx0fVxuXG5cblxuXHRmdW5jdGlvbiBwYXJzZU5vZGUodmRvbSkge1xuXHQgICAgc3dpdGNoICh2ZG9tLm5vZGVUeXBlKSB7XG5cdCAgICAgICAgY2FzZSAzOlxuXHQgICAgICAgICAgICBpZiAoY29uZmlnLnJleHByLnRlc3QodmRvbS5ub2RlVmFsdWUpICYmICF2ZG9tLnNraXBDb250ZW50ICkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGFkZChwYXJzZVRleHQodmRvbSkpXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYWRkKGNyZWF0ZUNhY2hlZE5vZGUodmRvbSkpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICBjYXNlIDE6XG5cblx0ICAgICAgICAgICAgaWYgKHZkb20uc2tpcENvbnRlbnQgJiYgdmRvbS5za2lwQXR0cnMpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBhZGQoY3JlYXRlQ2FjaGVkTm9kZSh2ZG9tKSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgY29weSA9IHtcblx0ICAgICAgICAgICAgICAgIHByb3BzOiB7fSxcblx0ICAgICAgICAgICAgICAgIHR5cGU6IHZkb20udHlwZSxcblx0ICAgICAgICAgICAgICAgIG5vZGVUeXBlOiAxXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIGJpbmRpbmdzID0gZXh0cmFjdEJpbmRpbmdzKGNvcHksIHZkb20ucHJvcHMpXG5cdCAgICAgICAgICAgIHZhciBvcmRlciA9IGJpbmRpbmdzLm1hcChmdW5jdGlvbiAoYikge1xuXHQgICAgICAgICAgICAgICAgLy/lsIZtcy0q55qE5YC85Y+Y5oiQ5Ye95pWwLOW5tui1i+e7mWNvcHkucHJvcHNbbXMtKl1cblx0ICAgICAgICAgICAgICAgIC8v5aaC5p6c5raJ5Y+K5Yiw5L+u5pS557uT5p6ELOWImeWcqHNvdXJjZea3u+WKoCRhcHBlbmQsJHByZXBlbmRcblx0ICAgICAgICAgICAgICAgIGF2YWxvbi5kaXJlY3RpdmVzW2IudHlwZV0ucGFyc2UoY29weSwgdmRvbSwgYilcblx0ICAgICAgICAgICAgICAgIHJldHVybiBiLm5hbWVcblx0ICAgICAgICAgICAgfSkuam9pbignLCcpXG5cdCAgICAgICAgICAgIGlmIChvcmRlcikge1xuXHQgICAgICAgICAgICAgICAgY29weS5vcmRlciA9IG9yZGVyXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKHZkb20uaXNWb2lkVGFnKSB7XG5cdCAgICAgICAgICAgICAgICBjb3B5LmlzVm9pZFRhZyA9IHRydWVcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmICghKCdjaGlsZHJlbicgaW4gY29weSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHZkb20uY2hpbGRyZW5cblx0ICAgICAgICAgICAgICAgICAgICBpZiAoYy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29weS5jaGlsZHJlbiA9ICcoZnVuY3Rpb24oKXsnICsgcGFyc2VOb2RlcyhjKSArICd9KSgpJ1xuXHQgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNvcHkuY2hpbGRyZW4gPSAnW10nXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICh2ZG9tLnRlbXBsYXRlKVxuXHQgICAgICAgICAgICAgICAgY29weS50ZW1wbGF0ZSA9IHZkb20udGVtcGxhdGVcblx0ICAgICAgICAgICAgaWYgKHZkb20uc2tpcENvbnRlbnQpXG5cdCAgICAgICAgICAgICAgICBjb3B5LnNraXBDb250ZW50ID0gdHJ1ZVxuXHQgICAgICAgICAgICBpZiAodmRvbS5za2lwQXR0cnMpIHtcblx0ICAgICAgICAgICAgICAgIGNvcHkuc2tpcEF0dHJzID0gdHJ1ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICh2ZG9tLmR5bmFtaWMpIHtcblx0ICAgICAgICAgICAgICAgIGNvcHkuZHluYW1pYyA9IHRydWVcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gYWRkVGFnKGNvcHkpXG5cdCAgICAgICAgY2FzZSA4OlxuXHQgICAgICAgICAgICB2YXIgbm9kZVZhbHVlID0gdmRvbS5ub2RlVmFsdWVcblx0ICAgICAgICAgICAgaWYgKHZkb20uZHluYW1pYyA9PT0gJ2ZvcicpIHsvL8Kg5aSE55CGbXMtZm9y5oyH5LukXG5cdCAgICAgICAgICAgICAgICBpZiAobm9kZVZhbHVlLmluZGV4T2YoJ21zLWZvcjonKSAhPT0gMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGF2YWxvbi5lcnJvcignbXMtZm9y5oyH5Luk5YmN5LiN6IO95pyJ56m65qC8Jylcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICB2YXIgY29weSA9IHtcblx0ICAgICAgICAgICAgICAgICAgICBkeW5hbWljOiAnZm9yJyxcblx0ICAgICAgICAgICAgICAgICAgICB2bW9kZWw6ICdfX3Ztb2RlbF9fJ1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2ZG9tKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHZkb20uaGFzT3duUHJvcGVydHkoaSkgJiYgIXNraXBzW2ldKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlbaV0gPSB2ZG9tW2ldXG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICBhdmFsb24uZGlyZWN0aXZlc1snZm9yJ10ucGFyc2UoY29weSwgdmRvbSwgdmRvbSlcblx0ICAgICAgICAgICAgICAgIHZkb20uJGFwcGVuZCArPSBwYXJzZU5vZGVzKGF2YWxvbi5zcGVlZFVwKGF2YWxvbi5sZXhlcih2ZG9tLnRlbXBsYXRlKSksdHJ1ZSlcblx0ICAgICAgICAgICAgICAgIHJldHVybiBhZGRUYWcoY29weSkgXG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZVZhbHVlID09PSAnbXMtZm9yLWVuZDonKSB7XG5cdCAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICB2ZG9tLiRhcHBlbmQgPSBhZGRUYWcoe1xuXHQgICAgICAgICAgICAgICAgICAgIG5vZGVUeXBlOiA4LFxuXHQgICAgICAgICAgICAgICAgICAgIHR5cGU6ICcjY29tbWVudCcsXG5cdCAgICAgICAgICAgICAgICAgICAgbm9kZVZhbHVlOiB2ZG9tLnNpZ25hdHVyZSxcblx0ICAgICAgICAgICAgICAgICAgICBrZXk6ICd0cmFjZUtleSdcblx0ICAgICAgICAgICAgICAgIH0pICsgJ1xcbn0sX19sb2NhbF9fLHZub2RlcylcXG4nICtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgYWRkVGFnKHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVUeXBlOiA4LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCIjY29tbWVudFwiLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlOiB2ZG9tLnNpZ25hdHVyZSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVWYWx1ZTogXCJtcy1mb3ItZW5kOlwiXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIH0pICsgJ1xcbidcblx0ICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuXG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZVZhbHVlLmluZGV4T2YoJ21zLWpzOicpID09PSAwKSB7Ly/mj5LlhaVKU+WjsOaYjuivreWPpVxuXHQgICAgICAgICAgICAgICAgdmFyIHN0YXRlbWVudCA9IHBhcnNlRXhwcihub2RlVmFsdWUucmVwbGFjZSgnbXMtanM6JywgJycpLCAnanMnKSArICdcXG4nXG5cdCAgICAgICAgICAgICAgICB2YXIgcmV0ID0gYWRkVGFnKHZkb20pXG5cdCAgICAgICAgICAgICAgICB2YXIgbWF0Y2ggPSBzdGF0ZW1lbnQubWF0Y2gocnN0YXRlbWVudClcblx0ICAgICAgICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHZkb20uJGFwcGVuZCA9ICh2ZG9tLiRhcHBlbmQgfHwgJycpICsgc3RhdGVtZW50ICtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuX19sb2NhbF9fLlwiICsgbWF0Y2hbMV0gKyAnID0gJyArIG1hdGNoWzFdICsgJ1xcbidcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgYXZhbG9uLndhcm4obm9kZVZhbHVlICsgJyBwYXJzZSBmYWlsIScpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gcmV0XG5cdCAgICAgICAgICAgIH0gZWxzZSBpZih2ZG9tLmR5bmFtaWMpe1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGFkZFRhZyh2ZG9tKVxuXHQgICAgICAgICAgICB9ZWxzZXtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBhZGQoY3JlYXRlQ2FjaGVkTm9kZSh2ZG9tKSlcblx0ICAgICAgICAgICAgfVxuXHQgICAvLyAgICAgZGVmYXVsdDpcblx0Ly8gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2ZG9tKSkge1xuXHQvLyAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh2ZG9tKVxuXHQvLyAgICAgICAgICAgICAgICB2ZG9tLiRhcHBlbmQgPSBwYXJzZU5vZGVzKHZkb20sIHRydWUpXG5cdC8vICAgICAgICAgICAgfVxuXHQgICAgfVxuXG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHBhcnNlTm9kZXNcblxuXHRmdW5jdGlvbiB3cmFwRGVsaW1pdGVyKGV4cHIpIHtcblx0ICAgIHJldHVybiByaWRlbnQudGVzdChleHByKSA/IGV4cHIgOiBwYXJzZUV4cHIoZXhwciwgJ3RleHQnKVxuXHR9XG5cblx0ZnVuY3Rpb24gYWRkKGEpIHtcblx0ICAgIHJldHVybiAndm5vZGVzLnB1c2goJyArIGEgKyAnKTsnXG5cdH1cblx0ZnVuY3Rpb24gYWRkVGFnKG9iaikge1xuXHQgICAgcmV0dXJuIGFkZChzdHJpbmdpZnkob2JqKSlcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlVGV4dChlbCkge1xuXHQgICAgdmFyIGFycmF5ID0gZXh0cmFjdEV4cHIoZWwubm9kZVZhbHVlKS8v6L+U5Zue5LiA5Liq5pWw57uEXG5cdCAgICB2YXIgbm9kZVZhbHVlID0gJydcblx0ICAgIGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcblx0ICAgICAgICBub2RlVmFsdWUgPSB3cmFwRGVsaW1pdGVyKGFycmF5WzBdLmV4cHIpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZhciB0b2tlbiA9IGFycmF5Lm1hcChmdW5jdGlvbiAoZWwpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGVsLnR5cGUgPyB3cmFwRGVsaW1pdGVyKGVsLmV4cHIpIDogcXVvdGUoZWwuZXhwcilcblx0ICAgICAgICB9KS5qb2luKCcgKyAnKVxuXHQgICAgICAgIG5vZGVWYWx1ZSA9ICdTdHJpbmcoJyArIHRva2VuICsgJyknXG5cdCAgICB9XG5cdCAgICByZXR1cm4gJ3tcXG50eXBlOiBcIiN0ZXh0XCIsXFxubm9kZVR5cGU6MyxcXG5keW5hbWljOnRydWUsXFxubm9kZVZhbHVlOiAnICsgbm9kZVZhbHVlICsgJ1xcbn0nXG5cdH1cblxuXHR2YXIgcmxpbmVTcCA9IC9cXG5cXHMqL2dcblxuXHRmdW5jdGlvbiBleHRyYWN0RXhwcihzdHIpIHtcblx0ICAgIHZhciByZXQgPSBbXVxuXHQgICAgZG8gey8vYWFhe3tAYmJifX1jY2Ncblx0ICAgICAgICB2YXIgaW5kZXggPSBzdHIuaW5kZXhPZihjb25maWcub3BlblRhZylcblx0ICAgICAgICBpbmRleCA9IGluZGV4ID09PSAtMSA/IHN0ci5sZW5ndGggOiBpbmRleFxuXHQgICAgICAgIHZhciB2YWx1ZSA9IHN0ci5zbGljZSgwLCBpbmRleClcblx0ICAgICAgICBpZiAoL1xcUy8udGVzdCh2YWx1ZSkpIHtcblx0ICAgICAgICAgICAgcmV0LnB1c2goe2V4cHI6IGRlY29kZSh2YWx1ZSl9KVxuXHQgICAgICAgIH1cblx0ICAgICAgICBzdHIgPSBzdHIuc2xpY2UoaW5kZXggKyBjb25maWcub3BlblRhZy5sZW5ndGgpXG5cdCAgICAgICAgaWYgKHN0cikge1xuXHQgICAgICAgICAgICBpbmRleCA9IHN0ci5pbmRleE9mKGNvbmZpZy5jbG9zZVRhZylcblx0ICAgICAgICAgICAgdmFyIHZhbHVlID0gc3RyLnNsaWNlKDAsIGluZGV4KVxuXHQgICAgICAgICAgICByZXQucHVzaCh7XG5cdCAgICAgICAgICAgICAgICBleHByOiBhdmFsb24udW5lc2NhcGVIVE1MKHZhbHVlLnJlcGxhY2UocmxpbmVTcCwgJycpKSxcblx0ICAgICAgICAgICAgICAgIHR5cGU6ICd7e319J1xuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2UoaW5kZXggKyBjb25maWcuY2xvc2VUYWcubGVuZ3RoKVxuXHQgICAgICAgIH1cblx0ICAgIH0gd2hpbGUgKHN0ci5sZW5ndGgpXG5cdCAgICByZXR1cm4gcmV0XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVDYWNoZWROb2RlKHZkb20pIHtcblx0ICAgIHZhciB1dWlkXG5cdCAgICBzd2l0Y2ggKHZkb20ubm9kZVR5cGUpIHtcblx0ICAgICAgICBjYXNlIDE6XG5cdCAgICAgICAgICAgIHV1aWQgPSB2ZG9tLnR5cGUgKyAnOycgKyBPYmplY3Qua2V5cyh2ZG9tLnByb3BzKS5zb3J0KCkubWFwKGZ1bmN0aW9uIChrKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gayArICctJyArIHZkb20ucHJvcHNba11cblx0ICAgICAgICAgICAgfSkuam9pbignOycpICsgJzsnICsgYXZhbG9uLnZkb21BZGFwdG9yKHZkb20sICd0b0hUTUwnKS5sZW5ndGhcblx0ICAgICAgICAgICAgYnJlYWtcblx0ICAgICAgICBjYXNlIDM6XG5cdCAgICAgICAgY2FzZSA4OlxuXHQgICAgICAgICAgICB1dWlkID0gdmRvbS5ub2RlVHlwZSArICc7JyArIHZkb20ubm9kZVZhbHVlXG5cdCAgICAgICAgICAgIGJyZWFrXG5cdCAgICB9XG5cblx0ICAgIGF2YWxvbi5jYWNoZXNbdXVpZF0gPSB2ZG9tXG5cblx0ICAgIHJldHVybiAnYXZhbG9uLmdldENhY2hlZE5vZGUoJyArIHF1b3RlKHV1aWQpICsgJyknXG5cdH1cblxuXHRhdmFsb24uZ2V0Q2FjaGVkTm9kZSA9IGZ1bmN0aW9uICh1dWlkKSB7XG5cdCAgICByZXR1cm4gYXZhbG9uLmNhY2hlc1t1dWlkXVxuXHR9XG5cbi8qKiovIH0sXG4vKiA3MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0dmFyIGRpcmVjdGl2ZXMgPSBhdmFsb24uZGlyZWN0aXZlc1xuXHR2YXIgcmJpbmRpbmcgPSAvXm1zLShcXHcrKS0/KC4qKS9cblx0dmFyIGV2ZW50TWFwID0gYXZhbG9uLm9uZU9iamVjdCgnYW5pbWF0aW9uZW5kLGJsdXIsY2hhbmdlLGlucHV0LGNsaWNrLGRibGNsaWNrLGZvY3VzLGtleWRvd24sa2V5cHJlc3Msa2V5dXAsbW91c2Vkb3duLG1vdXNlZW50ZXIsbW91c2VsZWF2ZSxtb3VzZW1vdmUsbW91c2VvdXQsbW91c2VvdmVyLG1vdXNldXAsc2NhbixzY3JvbGwsc3VibWl0JylcblxuXHRmdW5jdGlvbiBleHRyYWN0QmluZGluZ3MoY3VyLCBwcm9wcykge1xuXHQgICAgdmFyIGJpbmRpbmdzID0gW11cblx0ICAgIHZhciBza2lwID0gJ21zLXNraXAnIGluIHByb3BzXG5cdCAgICB2YXIgdW5pcSA9IHt9XG5cdCAgICBmb3IgKHZhciBpIGluIHByb3BzKSB7XG5cdCAgICAgICAgdmFyIHZhbHVlID0gcHJvcHNbaV0sIG1hdGNoXG5cblx0ICAgICAgICBpZiAoIXNraXAgJiYgKG1hdGNoID0gaS5tYXRjaChyYmluZGluZykpKSB7XG5cdCAgICAgICAgICAgIHZhciB0eXBlID0gbWF0Y2hbMV1cblx0ICAgICAgICAgICAgdmFyIHBhcmFtID0gbWF0Y2hbMl0gfHwgJydcblx0ICAgICAgICAgICAgdmFyIG5hbWUgPSBpXG5cdCAgICAgICAgICAgIGlmIChldmVudE1hcFt0eXBlXSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG9yZGVyID0gcGFyc2VGbG9hdChwYXJhbSkgfHwgMFxuXHQgICAgICAgICAgICAgICAgcGFyYW0gPSB0eXBlXG5cdCAgICAgICAgICAgICAgICB0eXBlID0gJ29uJ1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG5hbWUgPSAnbXMtJyArIHR5cGUgKyAocGFyYW0gPyAnLScgKyBwYXJhbSA6ICcnKVxuXHQgICAgICAgICAgICBpZiAoaSAhPT0gbmFtZSkge1xuXHQgICAgICAgICAgICAgICAgZGVsZXRlIHByb3BzW2ldXG5cdCAgICAgICAgICAgICAgICBwcm9wc1tuYW1lXSA9IHZhbHVlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZXNbdHlwZV0pIHtcblxuXHQgICAgICAgICAgICAgICAgdmFyIGJpbmRpbmcgPSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcblx0ICAgICAgICAgICAgICAgICAgICBwYXJhbTogcGFyYW0sXG5cdCAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcblx0ICAgICAgICAgICAgICAgICAgICBleHByOiB2YWx1ZSxcblx0ICAgICAgICAgICAgICAgICAgICBwcmlvcml0eTogZGlyZWN0aXZlc1t0eXBlXS5wcmlvcml0eSB8fCB0eXBlLmNoYXJDb2RlQXQoMCkgKiAxMDBcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnb24nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgb3JkZXIgPSBvcmRlciB8fCAwXG5cdCAgICAgICAgICAgICAgICAgICAgYmluZGluZy5uYW1lICs9ICctJyArIG9yZGVyXG5cdCAgICAgICAgICAgICAgICAgICAgYmluZGluZy5wcmlvcml0eSA9IHBhcmFtLmNoYXJDb2RlQXQoMCkgKiAxMDAgKyBvcmRlclxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgaWYgKCF1bmlxW2JpbmRpbmcubmFtZV0pIHtcblx0ICAgICAgICAgICAgICAgICAgICB1bmlxW2JpbmRpbmcubmFtZV0gPSAxXG5cdCAgICAgICAgICAgICAgICAgICAgYmluZGluZ3MucHVzaChiaW5kaW5nKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgY3VyLnByb3BzW2ldID0gcHJvcHNbaV1cblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBiaW5kaW5ncy5zb3J0KGJ5UHJpb3JpdHkpXG5cblx0ICAgIHJldHVybiBiaW5kaW5nc1xuXHR9XG5cblx0ZnVuY3Rpb24gYnlQcmlvcml0eShhLCBiKSB7XG5cdCAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHlcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gZXh0cmFjdEJpbmRpbmdzXG5cblxuLyoqKi8gfSxcbi8qIDczICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcblxuXHQvL+e8k+WtmOaxguWAvOWHveaVsO+8jOS7peS+v+WkmuasoeWIqeeUqFxuXHR2YXIgZXZhbHVhdG9yUG9vbCA9IF9fd2VicGFja19yZXF1aXJlX18oNDkpXG5cblx0dmFyIHJyZWdleHAgPSAvKF58W14vXSlcXC8oPyFcXC8pKFxcWy4rP118XFxcXC58W14vXFxcXFxcclxcbl0pK1xcL1tnaW15dV17MCw1fSg/PVxccyooJHxbXFxyXFxuLC47fSldKSkvZ1xuXHR2YXIgcnN0cmluZyA9IC8oW1wiJ10pKFxcXFwoPzpcXHJcXG58W1xcc1xcU10pfCg/IVxcMSlbXlxcXFxcXHJcXG5dKSpcXDEvZ1xuXHR2YXIgcmZpbGwgPSAvXFw/XFw/XFxkKy9nXG5cdHZhciBicmFja2V0cyA9IC9cXCgoW14pXSopXFwpL1xuXG5cdHZhciByc2hvcnRDaXJjdWl0ID0gL1xcfFxcfC9nXG5cdHZhciBycGlwZWxpbmUgPSAvXFx8KD89XFx3KS9cblx0dmFyIHJ1c2VsZXNzU3AgPSAvXFxzKihcXC58XFx8KVxccyovZ1xuXG5cdHZhciByQXQgPSAvKF58W15cXHdcXHUwMGMwLVxcdUZGRkZfXSkoQHwjIykoPz1bJFxcd10pL2dcblx0dmFyIHJoYW5kbGVOYW1lID0gL14oPzpcXEB8IyMpWyRcXHdcXC5dKyQvaVxuXG5cdHZhciByZmlsdGVycyA9IC9cXHwuKy9nXG5cdHZhciBydmFyID0gLygoPzpcXEB8XFwkfFxcI1xcIyk/XFx3KykvZ1xuXG5cdGZ1bmN0aW9uIGNvbGxlY3RMb2NhbChzdHIsIHJldCkge1xuXHQgICAgdmFyIGFyciA9IHN0ci5yZXBsYWNlKHJmaWx0ZXJzLCAnJykubWF0Y2gocnZhcilcblx0ICAgIGlmIChhcnIpIHtcblx0ICAgICAgICBhcnIuZmlsdGVyKGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgICAgICBpZiAoIS9eW0BcXGRcXC1dLy50ZXN0KGVsKSAmJlxuXHQgICAgICAgICAgICAgICAgICAgIGVsLnNsaWNlKDAsIDIpICE9PSAnIyMnICYmXG5cdCAgICAgICAgICAgICAgICAgICAgZWwgIT09ICckZXZlbnQnICYmICFhdmFsb24ua2V5TWFwW2VsXSkge1xuXHQgICAgICAgICAgICAgICAgcmV0W2VsXSA9IDFcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiBleHRMb2NhbChyZXQpIHtcblx0ICAgIHZhciBhcnIgPSBbXVxuXHQgICAgZm9yICh2YXIgaSBpbiByZXQpIHtcblx0ICAgICAgICBhcnIucHVzaCgndmFyICcgKyBpICsgJyA9IF9fbG9jYWxfX1snICsgYXZhbG9uLnF1b3RlKGkpICsgJ10nKVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGFyclxuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VFeHByKHN0ciwgY2F0ZWdvcnkpIHtcblx0ICAgIHZhciBiaW5kaW5nID0ge31cblx0ICAgIGNhdGVnb3J5ID0gY2F0ZWdvcnkgfHwgJ290aGVyJ1xuXHQgICAgaWYgKHR5cGVvZiBzdHIgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgY2F0ZWdvcnkgPSBzdHIudHlwZVxuXHQgICAgICAgIGJpbmRpbmcgPSBzdHJcblx0ICAgICAgICBzdHIgPSBiaW5kaW5nLmV4cHJcblx0ICAgIH1cblx0ICAgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJylcblx0ICAgICAgICByZXR1cm4gJydcblx0ICAgIHZhciBjYWNoZUlEID0gc3RyXG5cdCAgICB2YXIgY2FjaGVTdHIgPSBldmFsdWF0b3JQb29sLmdldChjYXRlZ29yeSArICc6JyArIGNhY2hlSUQpXG5cblx0ICAgIGlmIChjYWNoZVN0cikge1xuXHQgICAgICAgIHJldHVybiBjYWNoZVN0clxuXHQgICAgfVxuXG5cdCAgICB2YXIgbnVtYmVyID0gMVxuXHQvL+ebuOWQjOeahOihqOi+vuW8j+eUn+aIkOebuOWQjOeahOWHveaVsFxuXHQgICAgdmFyIG1hcHMgPSB7fVxuXHQgICAgZnVuY3Rpb24gZGlnKGEpIHtcblx0ICAgICAgICB2YXIga2V5ID0gJz8/JyArIG51bWJlcisrXG5cdCAgICAgICAgbWFwc1trZXldID0gYVxuXHQgICAgICAgIHJldHVybiBrZXlcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gZmlsbChhKSB7XG5cdCAgICAgICAgcmV0dXJuIG1hcHNbYV1cblx0ICAgIH1cblxuXHQgICAgdmFyIGlucHV0ID0gc3RyLnJlcGxhY2UocnJlZ2V4cCwgZGlnKS4vL+enu+mZpOaJgOacieato+WImVxuXHQgICAgICAgICAgICByZXBsYWNlKHJzdHJpbmcsIGRpZykuLy/np7vpmaTmiYDmnInlrZfnrKbkuLJcblx0ICAgICAgICAgICAgXG5cdCAgIC8vIGlucHV0ID0gYXZhbG9uLnVuZXNjYXBlSFRNTChpbnB1dCkuXG5cdCAgICAgICAgICAgIHJlcGxhY2UocnNob3J0Q2lyY3VpdCwgZGlnKS4vL+enu+mZpOaJgOacieefrei3r+aIllxuXHQgICAgICAgICAgICByZXBsYWNlKHJ1c2VsZXNzU3AsICckMScpLi8v56e76ZmkLiB85Lik56uv56m655m9XG5cdCAgICAgICAgICAgIHNwbGl0KHJwaXBlbGluZSkgLy/kvb/nlKjnrqHpgZPnrKbliIbnprvmiYDmnInov4fmu6Tlmajlj4rooajovr7lvI/nmoTmraPkvZNcblx0ICAgIC8v6L+Y5Y6fYm9keVxuXHQgICAgdmFyIF9ib2R5ID0gaW5wdXQuc2hpZnQoKVxuXHQgICAgdmFyIGxvY2FsID0ge31cblx0ICAgIHZhciBib2R5ID0gX2JvZHkucmVwbGFjZShyZmlsbCwgZmlsbCkudHJpbSgpXG5cdCAgICBpZiAoY2F0ZWdvcnkgPT09ICdvbicgJiYgcmhhbmRsZU5hbWUudGVzdChib2R5KSkge1xuXHQgICAgICAgIGJvZHkgPSBib2R5ICsgJygkZXZlbnQpJ1xuXHQgICAgfVxuXG5cdCAgICBib2R5ID0gYm9keS5yZXBsYWNlKHJBdCwgJyQxX192bW9kZWxfXy4nKVxuXHQgICAgaWYgKGNhdGVnb3J5ID09PSAnanMnKSB7XG5cdCAgICAgICAgcmV0dXJuIGV2YWx1YXRvclBvb2wucHV0KGNhdGVnb3J5ICsgJzonICsgY2FjaGVJRCwgYm9keSlcblx0ICAgIH0gZWxzZSBpZiAoY2F0ZWdvcnkgPT09ICdvbicpIHtcblx0ICAgICAgICBjb2xsZWN0TG9jYWwoX2JvZHksIGxvY2FsKVxuXHQgICAgfVxuXG5cdC8v5aSE55CG6KGo6L6+5byP55qE6L+H5ruk5Zmo6YOo5YiGXG5cblx0ICAgIHZhciBmaWx0ZXJzID0gaW5wdXQubWFwKGZ1bmN0aW9uIChzdHIpIHtcblx0ICAgICAgICBjb2xsZWN0TG9jYWwoc3RyLnJlcGxhY2UoL15cXHcrL2csIFwiXCIpLCBsb2NhbClcblx0ICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShyZmlsbCwgZmlsbCkucmVwbGFjZShyQXQsICckMV9fdm1vZGVsX18uJykgLy/ov5jljp9cblx0ICAgICAgICB2YXIgaGFzQnJhY2tldCA9IGZhbHNlXG5cdCAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoYnJhY2tldHMsIGZ1bmN0aW9uIChhLCBiKSB7XG5cdCAgICAgICAgICAgIGhhc0JyYWNrZXQgPSB0cnVlXG5cdCAgICAgICAgICAgIHJldHVybiAvXFxTLy50ZXN0KGIpID9cblx0ICAgICAgICAgICAgICAgICAgICAnKF9fdmFsdWVfXywnICsgYiArICcpOycgOlxuXHQgICAgICAgICAgICAgICAgICAgICcoX192YWx1ZV9fKTsnXG5cdCAgICAgICAgfSlcblx0ICAgICAgICBpZiAoIWhhc0JyYWNrZXQpIHtcblx0ICAgICAgICAgICAgc3RyICs9ICcoX192YWx1ZV9fKTsnXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8oXFx3KykvLCAnYXZhbG9uLl9fZm9ybWF0X18oXCIkMVwiKScpXG5cdCAgICAgICAgcmV0dXJuICdfX3ZhbHVlX18gPSAnICsgc3RyXG5cdCAgICB9KVxuXHQgICAgdmFyIHJldCA9IFtdXG5cdCAgICBpZiAoY2F0ZWdvcnkgPT09ICdvbicpIHtcblx0ICAgICAgICBmaWx0ZXJzID0gZmlsdGVycy5tYXAoZnVuY3Rpb24gKGVsKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBlbC5yZXBsYWNlKC9fX3ZhbHVlX18vZywgJyRldmVudCcpXG5cdCAgICAgICAgfSlcblx0ICAgICAgICBpZiAoZmlsdGVycy5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgZmlsdGVycy5wdXNoKCdpZigkZXZlbnQuJHJldHVybil7XFxuXFx0cmV0dXJuO1xcbn0nKVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoIWF2YWxvbi5tb2Rlcm4pIHtcblx0ICAgICAgICAgICAgYm9keSA9IGJvZHkucmVwbGFjZSgvX192bW9kZWxfX1xcLihbXihdKylcXCgoW14pXSopXFwpLywgZnVuY3Rpb24gKGEsIGIsIGMpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiAnX192bW9kZWxfXy4nICsgYiArIFwiLmNhbGwoX192bW9kZWxfX1wiICsgKC9cXFMvLnRlc3QoYykgPyAnLCcgKyBjIDogXCJcIikgKyBcIilcIlxuXHQgICAgICAgICAgICB9KVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHJldCA9IFsnZnVuY3Rpb24gbXNfb24oJGV2ZW50LCBfX2xvY2FsX18peycsXG5cdCAgICAgICAgICAgICd0cnl7Jyxcblx0ICAgICAgICAgICAgZXh0TG9jYWwobG9jYWwpLmpvaW4oJ1xcbicpLFxuXHQgICAgICAgICAgICAnXFx0dmFyIF9fdm1vZGVsX18gPSB0aGlzOycsXG5cdCAgICAgICAgICAgICdcXHQnICsgYm9keSxcblx0ICAgICAgICAgICAgJ31jYXRjaChlKXsnLFxuXHQgICAgICAgICAgICBxdW90ZUVycm9yKHN0ciwgY2F0ZWdvcnkpLFxuXHQgICAgICAgICAgICAnfScsXG5cdCAgICAgICAgICAgICd9J11cblx0ICAgICAgICBmaWx0ZXJzLnVuc2hpZnQoMiwgMClcblx0ICAgIH0gZWxzZSBpZiAoY2F0ZWdvcnkgPT09ICdkdXBsZXgnKSB7XG5cblx0Ly/ku452beS4reW+l+WIsOW9k+WJjeWxnuaAp+eahOWAvFxuXHQgICAgICAgIHZhciBnZXR0ZXJCb2R5ID0gW1xuXHQgICAgICAgICAgICAnZnVuY3Rpb24gKF9fdm1vZGVsX18peycsXG5cdCAgICAgICAgICAgICd0cnl7Jyxcblx0ICAgICAgICAgICAgJ3JldHVybiAnICsgYm9keSArICdcXG4nLFxuXHQgICAgICAgICAgICAnfWNhdGNoKGUpeycsXG5cdCAgICAgICAgICAgIHF1b3RlRXJyb3Ioc3RyLCBjYXRlZ29yeSkucmVwbGFjZSgncGFyc2UnLCAnZ2V0JyksXG5cdCAgICAgICAgICAgICd9Jyxcblx0ICAgICAgICAgICAgJ30nXVxuXHQgICAgICAgIGV2YWx1YXRvclBvb2wucHV0KCdkdXBsZXg6JyArIGNhY2hlSUQsIGdldHRlckJvZHkuam9pbignXFxuJykpXG5cdCAgICAgICAgLy/nu5l2beWQjOatpeafkOS4quWxnuaAp1xuXHQgICAgICAgIHZhciBzZXR0ZXJCb2R5ID0gW1xuXHQgICAgICAgICAgICAnZnVuY3Rpb24gKF9fdm1vZGVsX18sX192YWx1ZV9fKXsnLFxuXHQgICAgICAgICAgICAndHJ5eycsXG5cdCAgICAgICAgICAgICdcXHQnICsgYm9keSArICcgPSBfX3ZhbHVlX18nLFxuXHQgICAgICAgICAgICAnfWNhdGNoKGUpeycsXG5cdCAgICAgICAgICAgIHF1b3RlRXJyb3Ioc3RyLCBjYXRlZ29yeSkucmVwbGFjZSgncGFyc2UnLCAnc2V0JyksXG5cdCAgICAgICAgICAgICd9Jyxcblx0ICAgICAgICAgICAgJ30nXVxuXHQgICAgICAgIGV2YWx1YXRvclBvb2wucHV0KCdkdXBsZXg6c2V0OicgKyBjYWNoZUlELCBzZXR0ZXJCb2R5LmpvaW4oJ1xcbicpKVxuXHQgICAgICAgIC8v5a+55p+Q5Liq5YC86L+b6KGM5qC85byP5YyWXG5cdCAgICAgICAgaWYgKGlucHV0Lmxlbmd0aCkge1xuXHQgICAgICAgICAgICB2YXIgZm9ybWF0Qm9keSA9IFtcblx0ICAgICAgICAgICAgICAgICdmdW5jdGlvbiAoX192bW9kZWxfXywgX192YWx1ZV9fKXsnLFxuXHQgICAgICAgICAgICAgICAgJ3RyeXsnLFxuXHQgICAgICAgICAgICAgICAgZmlsdGVycy5qb2luKCdcXG4nKSxcblx0ICAgICAgICAgICAgICAgICdyZXR1cm4gX192YWx1ZV9fXFxuJyxcblx0ICAgICAgICAgICAgICAgICd9Y2F0Y2goZSl7Jyxcblx0ICAgICAgICAgICAgICAgIHF1b3RlRXJyb3Ioc3RyLCBjYXRlZ29yeSkucmVwbGFjZSgncGFyc2UnLCAnZm9ybWF0JyksXG5cdCAgICAgICAgICAgICAgICAnfScsXG5cdCAgICAgICAgICAgICAgICAnfSddXG5cdCAgICAgICAgICAgIGV2YWx1YXRvclBvb2wucHV0KCdkdXBsZXg6Zm9ybWF0OicgKyBjYWNoZUlELCBmb3JtYXRCb2R5LmpvaW4oJ1xcbicpKVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gIGV2YWx1YXRvclBvb2wuZ2V0KCdkdXBsZXg6JyArIGNhY2hlSUQpXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJldCA9IFtcblx0ICAgICAgICAgICAgJyhmdW5jdGlvbigpeycsXG5cdCAgICAgICAgICAgICd0cnl7Jyxcblx0ICAgICAgICAgICAgJ3ZhciBfX3ZhbHVlX18gPSAnICsgYm9keSxcblx0ICAgICAgICAgICAgKGNhdGVnb3J5ID09PSAndGV4dCcgP1xuXHQgICAgICAgICAgICAgICAgICAgICdyZXR1cm4gYXZhbG9uLnBhcnNlcnMuc3RyaW5nKF9fdmFsdWVfXyknIDpcblx0ICAgICAgICAgICAgICAgICAgICAncmV0dXJuIF9fdmFsdWVfXycpLFxuXHQgICAgICAgICAgICAnfWNhdGNoKGUpeycsXG5cdCAgICAgICAgICAgIHF1b3RlRXJyb3Ioc3RyLCBjYXRlZ29yeSksXG5cdCAgICAgICAgICAgICdcXHRyZXR1cm4gXCJcIicsXG5cdCAgICAgICAgICAgICd9Jyxcblx0ICAgICAgICAgICAgJ30pKCknXG5cdCAgICAgICAgXVxuXHQgICAgICAgIGZpbHRlcnMudW5zaGlmdCgzLCAwKVxuXHQgICAgfVxuXHQgICAgcmV0LnNwbGljZS5hcHBseShyZXQsIGZpbHRlcnMpXG5cdCAgICBjYWNoZVN0ciA9IHJldC5qb2luKCdcXG4nKVxuXHQgICAgZXZhbHVhdG9yUG9vbC5wdXQoY2F0ZWdvcnkgKyAnOicgKyBjYWNoZUlELCBjYWNoZVN0cilcblx0ICAgIHJldHVybiBjYWNoZVN0clxuXG5cdH1cblxuXHRmdW5jdGlvbiBxdW90ZUVycm9yKHN0ciwgdHlwZSkge1xuXHQgICAgcmV0dXJuICdcXHRhdmFsb24ud2FybihlLCAnICtcblx0ICAgICAgICAgICAgYXZhbG9uLnF1b3RlKCdwYXJzZSAnICsgdHlwZSArICcgYmluZGluZ+OAkCAnICsgc3RyICsgJyDjgJFmYWlsJylcblx0ICAgICAgICAgICAgKyAnKSdcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXZhbG9uLnBhcnNlRXhwciA9IHBhcnNlRXhwclxuXG5cblxuXG4vKioqLyB9LFxuLyogNzQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciByZXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc1KVxuXHR2YXIgZmlyZURpc3Bvc2VIb29rID0gcmV0LmZpcmVEaXNwb3NlSG9va1xuXHR2YXIgZmlyZURpc3Bvc2VIb29rcyA9IHJldC5maXJlRGlzcG9zZUhvb2tzXG5cdHZhciBmaXJlRGlzcG9zZUhvb2tEZWxheSA9IHJldC5maXJlRGlzcG9zZUhvb2tEZWxheVxuXG5cblx0Ly9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExNDI1MjA5L2FyZS1kb20tbXV0YXRpb24tb2JzZXJ2ZXJzLXNsb3dlci10aGFuLWRvbS1tdXRhdGlvbi1ldmVudHNcblx0Ly9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMxNzk4ODE2L3NpbXBsZS1tdXRhdGlvbm9ic2VydmVyLXZlcnNpb24tb2YtZG9tbm9kZXJlbW92ZWRmcm9tZG9jdW1lbnRcblx0ZnVuY3Rpb24gYnlNdXRhdGlvbkV2ZW50KGRvbSkge1xuXHQgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Ob2RlUmVtb3ZlZEZyb21Eb2N1bWVudFwiLCBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZmlyZURpc3Bvc2VIb29rRGVsYXkoZG9tKVxuXHQgICAgfSlcblx0fVxuXHQvL+eUqOS6jklFOCssIGZpcmVmb3hcblx0ZnVuY3Rpb24gYnlSZXdyaXRlUHJvdG90eXBlKCkge1xuXHQgICAgaWYgKGJ5UmV3cml0ZVByb3RvdHlwZS5leGVjdXRlKSB7XG5cdCAgICAgICAgcmV0dXJuXG5cdCAgICB9XG5cdC8vaHR0cHM6Ly93d3cud2ViLXRpbmtlci5jb20vYXJ0aWNsZS8yMDYxOC5odG1sP3V0bV9zb3VyY2U9dHVpY29vbCZ1dG1fbWVkaXVtPXJlZmVycmFsXG5cdC8vSUU2LTjomb3nhLbmmrTpnLLkuoZFbGVtZW50LnByb3RvdHlwZSzkvYbml6Dms5Xph43lhpnlt7LmnInnmoRET00gQVBJXG5cdCAgICBieVJld3JpdGVQcm90b3R5cGUuZXhlY3V0ZSA9IHRydWVcblx0ICAgIHZhciBwID0gTm9kZS5wcm90b3R5cGVcblx0ICAgIGZ1bmN0aW9uIHJld2l0ZShuYW1lLCBmbikge1xuXHQgICAgICAgIHZhciBjYiA9IHBbbmFtZV1cblx0ICAgICAgICBwW25hbWVdID0gZnVuY3Rpb24gKGEsIGIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuICBmbi5jYWxsKHRoaXMsIGNiLCBhLCBiKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJld2l0ZSgncmVtb3ZlQ2hpbGQnLCBmdW5jdGlvbiAoZm4sIGEsIGIpIHtcblx0ICAgICAgICBmbi5jYWxsKHRoaXMsIGEsIGIpXG5cdCAgICAgICAgaWYgKGEubm9kZVR5cGUgPT09IDEpIHtcblx0ICAgICAgICAgICAgZmlyZURpc3Bvc2VIb29rRGVsYXkoYSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGFcblx0ICAgIH0pXG5cblx0ICAgIHJld2l0ZSgncmVwbGFjZUNoaWxkJywgZnVuY3Rpb24gKGZuLCBhLCBiKSB7XG5cdCAgICAgICAgZm4uY2FsbCh0aGlzLCBhLCBiKVxuXHQgICAgICAgIGlmIChhLm5vZGVUeXBlID09PSAxKSB7XG5cdCAgICAgICAgICAgIGZpcmVEaXNwb3NlSG9va0RlbGF5KGEpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBhXG5cdCAgICB9KVxuXHQgICAgLy/orr/pl67lmajlsZ7mgKfpnIDopoHnlKhnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3LlpITnkIZcblx0ICAgIHZhciBlcCA9IEVsZW1lbnQucHJvdG90eXBlLCBvbGRTZXR0ZXJcblx0ICAgIGZ1bmN0aW9uIG5ld1NldHRlcihodG1sKSB7XG5cdCAgICAgICAgdmFyIGFsbCA9IGF2YWxvbi5zbGljZSh0aGlzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJykpXG5cdCAgICAgICAgb2xkU2V0dGVyLmNhbGwodGhpcywgaHRtbClcblx0ICAgICAgICBmaXJlRGlzcG9zZUhvb2tzKGFsbClcblx0ICAgIH1cblx0ICAgIGlmICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcikge1xuXHQgICAgICAgIG9sZFNldHRlciA9IGVwLl9fbG9va3VwU2V0dGVyX18oJ2lubmVySFRNTCcpXG5cdCAgICAgICAgZXAuX19kZWZpbmVTZXR0ZXJfXygnaW5uZXJIVE1MJywgbmV3U2V0dGVyKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB2YXIgb2JqID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlcCwgJ2lubmVySFRNTCcpXG5cdCAgICAgICAgb2xkU2V0dGVyID0gb2JqLnNldFxuXHQgICAgICAgIG9iai5zZXQgPSBuZXdTZXR0ZXJcblx0ICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXAsICdpbm5lckhUTUwnLCBvYmopXG5cdCAgICB9XG5cblx0ICAgIHJld2l0ZSgnYXBwZW5kQ2hpbGQnLCBmdW5jdGlvbiAoZm4sIGEpIHtcblx0ICAgICAgICBmbi5jYWxsKHRoaXMsIGEpXG5cdCAgICAgICAgaWYgKGEubm9kZVR5cGUgPT09IDEgJiYgdGhpcy5ub2RlVHlwZSA9PT0gMTEpIHtcblx0ICAgICAgICAgICAgZmlyZURpc3Bvc2VIb29rRGVsYXkoYSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGFcblx0ICAgIH0pXG5cblx0ICAgIHJld2l0ZSgnaW5zZXJ0QmVmb3JlJywgZnVuY3Rpb24gKGZuLCBhLCBiKSB7XG5cdCAgICAgICAgZm4uY2FsbCh0aGlzLCBhLCBiKVxuXHQgICAgICAgIGlmIChhLm5vZGVUeXBlID09PSAxICYmIHRoaXMubm9kZVR5cGUgPT09IDExKSB7XG5cdCAgICAgICAgICAgIGZpcmVEaXNwb3NlSG9va0RlbGF5KGEpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBhXG5cdCAgICB9KVxuXHR9XG5cblx0Ly/nlKjkuo5JRTZ+OFxuXHR2YXIgY2hlY2tEaXNwb3NlTm9kZXMgPSBbXVxuXHR2YXIgY2hlY2tJRCA9IDBcblx0ZnVuY3Rpb24gYnlQb2xsaW5nKGRvbSkge1xuXHQgICAgYXZhbG9uLkFycmF5LmVuc3VyZShjaGVja0Rpc3Bvc2VOb2RlcywgZG9tKVxuXHQgICAgaWYgKCFjaGVja0lEKSB7XG5cdCAgICAgICAgY2hlY2tJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGVsOyBlbCA9IGNoZWNrRGlzcG9zZU5vZGVzW2ldOyApIHtcblx0ICAgICAgICAgICAgICAgIGlmIChmYWxzZSA9PT0gZmlyZURpc3Bvc2VIb29rKGVsKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIGF2YWxvbi5BcnJheS5yZW1vdmVBdChjaGVja0Rpc3Bvc2VOb2RlcywgaSlcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaSsrXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGNoZWNrRGlzcG9zZU5vZGVzLmxlbmd0aCA9PSAwKSB7XG5cdCAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNoZWNrSUQpXG5cdCAgICAgICAgICAgICAgICBjaGVja0lEID0gMFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSwgNzAwKVxuXHQgICAgfVxuXHR9XG5cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9uQ29tcG9uZW50RGlzcG9zZShkb20pIHtcblx0ICAgIGlmICh3aW5kb3cuY2hyb21lICYmIHdpbmRvdy5NdXRhdGlvbkV2ZW50KSB7XG5cdCAgICAgICAgYnlNdXRhdGlvbkV2ZW50KGRvbSlcblx0ICAgIH0gZWxzZSBpZiAoYXZhbG9uLm1vZGVybiAmJiB0eXBlb2Ygd2luZG93Lk5vZGUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICBieVJld3JpdGVQcm90b3R5cGUoZG9tKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBieVBvbGxpbmcoZG9tKVxuXHQgICAgfVxuXHR9XG5cblxuXG4vKioqLyB9LFxuLyogNzUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdGZ1bmN0aW9uIGluRG9tVHJlZShlbCkge1xuXHQgICAgd2hpbGUgKGVsKSB7XG5cdCAgICAgICAgaWYgKGVsLm5vZGVUeXBlID09PSA5KSB7XG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlXG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVsID0gZWwucGFyZW50Tm9kZVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGZhbHNlXG5cdH1cblxuXHRmdW5jdGlvbiBmaXJlRGlzcG9zZUhvb2soZWwpIHtcblx0ICAgIGlmIChlbC5ub2RlVHlwZSA9PT0gMSAmJiBlbC5nZXRBdHRyaWJ1dGUoJ3dpZCcpICYmICFpbkRvbVRyZWUoZWwpKSB7XG5cdCAgICAgICAgdmFyIHdpZCA9IGVsLmdldEF0dHJpYnV0ZSgnd2lkJylcblx0ICAgICAgICB2YXIgZG9ja2VyID0gYXZhbG9uLnNjb3Blc1sgd2lkIF1cblx0ICAgICAgICBpZiAoIWRvY2tlcilcblx0ICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgdmFyIHZtID0gZG9ja2VyLnZtb2RlbFxuXHQgICAgICAgIGRvY2tlci52bW9kZWwuJGZpcmUoXCJvbkRpc3Bvc2VcIiwge1xuXHQgICAgICAgICAgICB0eXBlOiAnZGlzcG9zZScsXG5cdCAgICAgICAgICAgIHRhcmdldDogZWwsXG5cdCAgICAgICAgICAgIHZtb2RlbDogdm1cblx0ICAgICAgICB9KVxuXHQgICAgICAgIGlmIChkb2NrZXIgJiYgIWVsLmdldEF0dHJpYnV0ZSgnY2FjaGVkJykpIHtcblx0ICAgICAgICAgICAgZGVsZXRlIGRvY2tlci52bW9kZWxcblx0ICAgICAgICAgICAgZGVsZXRlIGF2YWxvbi5zY29wZXNbIHdpZCBdXG5cdCAgICAgICAgICAgIHZhciBpcyA9IGVsLmdldEF0dHJpYnV0ZSgnaXMnKVxuXHQgICAgICAgICAgICB2YXIgdiA9IGVsLnZ0cmVlXG5cdCAgICAgICAgICAgIGRldGFjaEV2ZW50cyh2KVxuXHQgICAgICAgICAgICBpZiAodikge1xuXHQgICAgICAgICAgICAgICAgdlswXVtpcyArICctbW91bnQnXSA9IGZhbHNlXG5cdCAgICAgICAgICAgICAgICB2WzBdWydjb21wb25lbnQtcmVhZHk6JyArIGlzXSA9IGZhbHNlXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGZhbHNlXG5cdCAgICB9XG5cdH1cblx0ZnVuY3Rpb24gZGV0YWNoRXZlbnRzKGFycikge1xuXHQgICAgZm9yICh2YXIgaSBpbiBhcnIpIHtcblx0ICAgICAgICB2YXIgZWwgPSBhcnJbaV1cblx0ICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IDEpIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBlbCkge1xuXHQgICAgICAgICAgICAgICAgaWYgKGkuaW5kZXhPZignbXMtb24nKSA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlbFtpXVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChlbC5jaGlsZHJlbikge1xuXHQgICAgICAgICAgICAgICAgZGV0YWNoRXZlbnRzKGVsLmNoaWxkcmVuKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cdGZ1bmN0aW9uIGZpcmVEaXNwb3NlSG9va0RlbGF5KGEpIHtcblx0ICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZpcmVEaXNwb3NlSG9vayhhKVxuXHQgICAgfSwgNClcblx0fVxuXHRmdW5jdGlvbiBmaXJlRGlzcG9zZUhvb2tzKG5vZGVzKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgZWw7IGVsID0gbm9kZXNbaSsrXTsgKSB7XG5cdCAgICAgICAgZmlyZURpc3Bvc2VIb29rKGVsKVxuXHQgICAgfVxuXHR9XG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgZmlyZURpc3Bvc2VIb29rRGVsYXk6IGZpcmVEaXNwb3NlSG9va0RlbGF5LFxuXHQgICAgZmlyZURpc3Bvc2VIb29rczogZmlyZURpc3Bvc2VIb29rcyxcblx0ICAgIGZpcmVEaXNwb3NlSG9vazogZmlyZURpc3Bvc2VIb29rXG5cdH1cblxuLyoqKi8gfSxcbi8qIDc2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQvKipcblx0ICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCAqIGF2YWxvbuWfuuS6jue6r+WHgOeahE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVz55qEdm3lt6XljoIgXG5cdCAqIG1hc3RlckZhY3Rvcnksc2xhdmVGYWN0b3J5LG1lZGlhdG9yRmFjdG9yeSwgQXJyYXlGYWN0b3J5XG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblxuXHR2YXIgc2hhcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc3KVxuXHR2YXIgY3JlYXRlVmlld01vZGVsID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MSlcblxuXHR2YXIgaXNTa2lwID0gc2hhcmUuaXNTa2lwXG5cdHZhciB0b0pzb24gPSBzaGFyZS50b0pzb25cblx0dmFyICQkbWlkd2F5ID0gc2hhcmUuJCRtaWR3YXlcblx0dmFyICQkc2tpcEFycmF5ID0gc2hhcmUuJCRza2lwQXJyYXlcblxuXHR2YXIgbWFrZUFjY2Vzc29yID0gc2hhcmUubWFrZUFjY2Vzc29yXG5cdHZhciBpbml0Vmlld01vZGVsID0gc2hhcmUuaW5pdFZpZXdNb2RlbFxuXHR2YXIgbW9kZWxBY2Nlc3NvciA9IHNoYXJlLm1vZGVsQWNjZXNzb3Jcblx0dmFyIG1vZGVsQWRhcHRvciA9IHNoYXJlLm1vZGVsQWRhcHRvclxuXHR2YXIgbWFrZUhhc2hDb2RlID0gYXZhbG9uLm1ha2VIYXNoQ29kZVxuXG5cblx0Ly/kuIDkuKp2beaAu+aYr+S4uk9ic2VydmVy55qE5a6e5L6LXG5cdGZ1bmN0aW9uIE9ic2VydmVyKCkge1xuXHR9XG5cblx0ZnVuY3Rpb24gbWFzdGVyRmFjdG9yeShkZWZpbml0aW9uLCBoZWlybG9vbSwgb3B0aW9ucykge1xuXG5cdCAgICB2YXIgJHNraXBBcnJheSA9IHt9XG5cdCAgICBpZiAoZGVmaW5pdGlvbi4kc2tpcEFycmF5KSB7Ly/mlLbpm4bmiYDmnInkuI3lj6/nm5HlkKzlsZ7mgKdcblx0ICAgICAgICAkc2tpcEFycmF5ID0gYXZhbG9uLm9uZU9iamVjdChkZWZpbml0aW9uLiRza2lwQXJyYXkpXG5cdCAgICAgICAgZGVsZXRlIGRlZmluaXRpb24uJHNraXBBcnJheVxuXHQgICAgfVxuXG5cdCAgICB2YXIga2V5cyA9IHt9XG5cdCAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXHQgICAgaGVpcmxvb20gPSBoZWlybG9vbSB8fCB7fVxuXHQgICAgdmFyIGFjY2Vzc29ycyA9IHt9XG5cdCAgICB2YXIgaGFzaGNvZGUgPSBtYWtlSGFzaENvZGUoJyQnKVxuXHQgICAgdmFyIHBhdGhuYW1lID0gb3B0aW9ucy5wYXRobmFtZSB8fCAnJ1xuXHQgICAgb3B0aW9ucy5pZCA9IG9wdGlvbnMuaWQgfHwgaGFzaGNvZGVcblx0ICAgIG9wdGlvbnMuaGFzaGNvZGUgPSBvcHRpb25zLmhhc2hjb2RlIHx8IGhhc2hjb2RlXG5cdCAgICB2YXIga2V5LCBzaWQsIHNwYXRoXG5cdCAgICBmb3IgKGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdCAgICAgICAgaWYgKCQkc2tpcEFycmF5W2tleV0pXG5cdCAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgdmFyIHZhbCA9IGtleXNba2V5XSA9IGRlZmluaXRpb25ba2V5XVxuXHQgICAgICAgIGlmICghaXNTa2lwKGtleSwgdmFsLCAkc2tpcEFycmF5KSkge1xuXHQgICAgICAgICAgICBzaWQgPSBvcHRpb25zLmlkICsgJy4nICsga2V5XG5cdCAgICAgICAgICAgIHNwYXRoID0gcGF0aG5hbWUgPyBwYXRobmFtZSArICcuJyArIGtleSA6IGtleVxuXHQgICAgICAgICAgICBhY2Nlc3NvcnNba2V5XSA9IG1ha2VBY2Nlc3NvcihzaWQsIHNwYXRoLCBoZWlybG9vbSlcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIGFjY2Vzc29ycy4kbW9kZWwgPSBtb2RlbEFjY2Vzc29yXG5cdCAgICB2YXIgJHZtb2RlbCA9IG5ldyBPYnNlcnZlcigpXG5cdCAgICAkdm1vZGVsID0gY3JlYXRlVmlld01vZGVsKCR2bW9kZWwsIGFjY2Vzc29ycywgZGVmaW5pdGlvbilcblxuXHQgICAgZm9yIChrZXkgaW4ga2V5cykge1xuXHQgICAgICAgIC8v5a+55pmu6YCa55uR5o6n5bGe5oCn5oiW6K6/6Zeu5Zmo5bGe5oCn6L+b6KGM6LWL5YC8XG5cdCAgICAgICAgJHZtb2RlbFtrZXldID0ga2V5c1trZXldXG5cblx0ICAgICAgICAvL+WIoOmZpOezu+e7n+WxnuaAp1xuXHQgICAgICAgIGlmIChrZXkgaW4gJHNraXBBcnJheSkge1xuXHQgICAgICAgICAgICBkZWxldGUga2V5c1trZXldXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAga2V5c1trZXldID0gdHJ1ZVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGluaXRWaWV3TW9kZWwoJHZtb2RlbCwgaGVpcmxvb20sIGtleXMsIGFjY2Vzc29ycywgb3B0aW9ucylcblxuXHQgICAgcmV0dXJuICR2bW9kZWxcblx0fVxuXG5cdCQkbWlkd2F5Lm1hc3RlckZhY3RvcnkgPSBtYXN0ZXJGYWN0b3J5XG5cdHZhciBlbXB0eSA9IHt9XG5cdGZ1bmN0aW9uIHNsYXZlRmFjdG9yeShiZWZvcmUsIGFmdGVyLCBoZWlybG9vbSwgb3B0aW9ucykge1xuXHQgICAgdmFyIGtleXMgPSB7fVxuXHQgICAgdmFyIHNraXBzID0ge31cblx0ICAgIHZhciBhY2Nlc3NvcnMgPSB7fVxuXHQgICAgaGVpcmxvb20gPSBoZWlybG9vbSB8fCB7fVxuXHQgICAgdmFyIHBhdGhuYW1lID0gb3B0aW9ucy5wYXRobmFtZVxuXHQgICAgdmFyIHJlc3VlID0gYmVmb3JlLiRhY2Nlc3NvcnMgfHwge31cblx0ICAgIHZhciBrZXksIHNpZCwgc3BhdGhcblx0ICAgIGZvciAoa2V5IGluIGFmdGVyKSB7XG5cdCAgICAgICAgaWYgKCQkc2tpcEFycmF5W2tleV0pXG5cdCAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAga2V5c1trZXldID0gdHJ1ZS8v5YyF5ous5Y+v55uR5o6n5LiO5LiN5Y+v55uR5o6n55qEXG5cdCAgICAgICAgaWYgKCFpc1NraXAoa2V5LCBhZnRlcltrZXldLCBlbXB0eSkpIHtcblx0ICAgICAgICAgICAgaWYgKHJlc3VlW2tleV0pIHtcblx0ICAgICAgICAgICAgICAgIGFjY2Vzc29yc1trZXldID0gcmVzdWVba2V5XVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgc2lkID0gb3B0aW9ucy5pZCArICcuJyArIGtleVxuXHQgICAgICAgICAgICAgICAgc3BhdGggPSBwYXRobmFtZSA/IHBhdGhuYW1lICsgJy4nICsga2V5IDoga2V5XG5cdCAgICAgICAgICAgICAgICBhY2Nlc3NvcnNba2V5XSA9IG1ha2VBY2Nlc3NvcihzaWQsIHNwYXRoLCBoZWlybG9vbSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHNraXBzW2tleV0gPSBhZnRlcltrZXldXG5cdCAgICAgICAgICAgIGRlbGV0ZSBhZnRlcltrZXldXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBvcHRpb25zLmhhc2hjb2RlID0gYmVmb3JlLiRoYXNoY29kZSB8fCBtYWtlSGFzaENvZGUoJyQnKVxuXHQgICAgYWNjZXNzb3JzLiRtb2RlbCA9IG1vZGVsQWNjZXNzb3Jcblx0ICAgIHZhciAkdm1vZGVsID0gbmV3IE9ic2VydmVyKClcblx0ICAgICR2bW9kZWwgPSBjcmVhdGVWaWV3TW9kZWwoJHZtb2RlbCwgYWNjZXNzb3JzLCBza2lwcylcblxuXHQgICAgZm9yIChrZXkgaW4gc2tpcHMpIHtcblx0ICAgICAgICAkdm1vZGVsW2tleV0gPSBza2lwc1trZXldXG5cdCAgICB9XG5cblx0ICAgIGluaXRWaWV3TW9kZWwoJHZtb2RlbCwgaGVpcmxvb20sIGtleXMsIGFjY2Vzc29ycywgb3B0aW9ucylcblxuXHQgICAgcmV0dXJuICR2bW9kZWxcblx0fVxuXG5cdCQkbWlkd2F5LnNsYXZlRmFjdG9yeSA9IHNsYXZlRmFjdG9yeVxuXG5cdGZ1bmN0aW9uIG1lZGlhdG9yRmFjdG9yeShiZWZvcmUsIGFmdGVyKSB7XG5cdCAgICB2YXIga2V5cyA9IHt9LCBrZXlcblx0ICAgIHZhciBhY2Nlc3NvcnMgPSB7fS8v5pawdm3nmoTorr/pl67lmahcblx0ICAgIHZhciB1bnJlc29sdmUgPSB7fS8v6ZyA6KaB6L2s5o2i55qE5bGe5oCn6ZuG5ZCIXG5cdCAgICB2YXIgaGVpcmxvb20gPSB7fVxuXHQgICAgdmFyIGFyciA9IGF2YWxvbi5zbGljZShhcmd1bWVudHMpXG5cdCAgICB2YXIgJHNraXBBcnJheSA9IHt9XG5cdCAgICB2YXIgaXNXaWRnZXQgPSB0eXBlb2YgdGhpcyA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLmlzV2lkZ2V0XG5cdCAgICB2YXIgY29uZmlnXG5cdCAgICB2YXIgY29uZmlnTmFtZVxuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICB2YXIgb2JqID0gYXJyW2ldXG5cdCAgICAgICAgLy/mlLbpm4bmiYDmnInplK7lgLzlr7nlj4rorr/pl67lmajlsZ7mgKdcblx0ICAgICAgICB2YXIgJGFjY2Vzc29ycyA9IG9iai4kYWNjZXNzb3JzXG5cdCAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuXHQgICAgICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdCAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBjdXIgPSBvYmpba2V5XVxuXHQgICAgICAgICAgICBpZiAoa2V5ID09PSAnJHNraXBBcnJheScpIHsvL+WkhOeQhiRza2lwQXJyYXlcblx0ICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cikpIHtcblx0ICAgICAgICAgICAgICAgICAgICBjdXIuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJHNraXBBcnJheVtlbF0gPSAxXG5cdCAgICAgICAgICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICBpZiAoaXNXaWRnZXQgJiYgYXJyLmluZGV4T2YoY3VyKSAhPT0gLTEpIHsvL+WkhOeQhumFjee9ruWvueixoVxuXHQgICAgICAgICAgICAgICAgY29uZmlnID0gY3VyXG5cdCAgICAgICAgICAgICAgICBjb25maWdOYW1lID0ga2V5XG5cdCAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAga2V5c1trZXldID0gY3VyXG5cdCAgICAgICAgICAgIGlmIChhY2Nlc3NvcnNba2V5XSAmJiBhdmFsb24uaXNPYmplY3QoY3VyKSkgey8v5aSE55CG5a2Qdm1cblx0ICAgICAgICAgICAgICAgIGRlbGV0ZSBhY2Nlc3NvcnNba2V5XVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICgkYWNjZXNzb3JzICYmICRhY2Nlc3NvcnNba2V5XSkge1xuXHQgICAgICAgICAgICAgICAgYWNjZXNzb3JzW2tleV0gPSAkYWNjZXNzb3JzW2tleV1cblx0ICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Yga2V5c1trZXldICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB1bnJlc29sdmVba2V5XSA9IDFcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblxuXG5cdCAgICBpZiAodHlwZW9mIHRoaXMgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0aGlzKGtleXMsIHVucmVzb2x2ZSlcblx0ICAgIH1cblx0ICAgIGZvciAoa2V5IGluIHVucmVzb2x2ZSkge1xuXHQgICAgICAgIC8v57O757uf5bGe5oCn6Lez6L+HLOW3sue7j+acieiuv+mXruWZqOeahOWxnuaAp+i3s+i/h1xuXHQgICAgICAgIGlmICgkJHNraXBBcnJheVtrZXldIHx8IGFjY2Vzc29yc1trZXldKVxuXHQgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgIGlmICghaXNTa2lwKGtleSwga2V5c1trZXldLCAkc2tpcEFycmF5KSkge1xuXHQgICAgICAgICBcblx0ICAgICAgICAgICAgYWNjZXNzb3JzW2tleV0gPSBtYWtlQWNjZXNzb3IoYmVmb3JlLiRpZCwga2V5LCBoZWlybG9vbSlcblx0ICAgICAgICAgICAgYWNjZXNzb3JzW2tleV0uc2V0KGtleXNba2V5XSlcblx0ICAgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHZhciAkdm1vZGVsID0gbmV3IE9ic2VydmVyKClcblx0ICAgICR2bW9kZWwgPSBjcmVhdGVWaWV3TW9kZWwoJHZtb2RlbCwgYWNjZXNzb3JzLCBrZXlzKVxuXHQgICAgZm9yIChrZXkgaW4ga2V5cykge1xuXHQgICAgICAgIGlmICghYWNjZXNzb3JzW2tleV0pIHsvL+a3u+WKoOS4jeWPr+ebkeaOp+eahOWxnuaAp1xuXHQgICAgICAgICAgIFxuXHQgICAgICAgICAgICAkdm1vZGVsW2tleV0gPSBrZXlzW2tleV1cblx0ICAgICAgICB9XG5cdCAgICAgICAgLy/nlKjkuo7pgJrov4fphY3nva7lr7nosaHop6blj5Hnu4Tku7bnmoQkd2F0Y2jlm57osINcblx0ICAgICAgICBpZiAoaXNXaWRnZXQgJiYgY29uZmlnICYmIGFjY2Vzc29yc1trZXldICYmIGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdCAgICAgICAgICAgIHZhciBHRVQgPSBhY2Nlc3NvcnNba2V5XS5nZXRcblx0ICAgICAgICAgIC8vICBHRVQuaGVpcmxvb20gPSBoZWlybG9vbVxuXHQgICAgICAgICAgICBpZiAoIUdFVC4kZGVjb21wb3NlKSB7XG5cdCAgICAgICAgICAgICAgICBHRVQuJGRlY29tcG9zZSA9IHt9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgR0VULiRkZWNvbXBvc2VbY29uZmlnTmFtZSArICcuJyArIGtleV0gPSAkdm1vZGVsXG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgaWYgKGtleSBpbiAkJHNraXBBcnJheSkge1xuXHQgICAgICAgICAgICBkZWxldGUga2V5c1trZXldXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAga2V5c1trZXldID0gdHJ1ZVxuXHQgICAgICAgIH1cblxuXHQgICAgfVxuXG5cdCAgICBpbml0Vmlld01vZGVsKCR2bW9kZWwsIGhlaXJsb29tLCBrZXlzLCBhY2Nlc3NvcnMsIHtcblx0ICAgICAgICBpZDogYmVmb3JlLiRpZCxcblx0ICAgICAgICBoYXNoY29kZTogbWFrZUhhc2hDb2RlKCckJyksXG5cdCAgICAgICAgbWFzdGVyOiB0cnVlXG5cdCAgICB9KVxuXG5cdCAgICByZXR1cm4gJHZtb2RlbFxuXHR9XG5cblxuXHQkJG1pZHdheS5tZWRpYXRvckZhY3RvcnkgPSBhdmFsb24ubWVkaWF0b3JGYWN0b3J5ID0gbWVkaWF0b3JGYWN0b3J5XG5cblx0dmFyIF9fYXJyYXlfXyA9IHNoYXJlLl9fYXJyYXlfX1xuXG5cblx0dmFyIGFwID0gQXJyYXkucHJvdG90eXBlXG5cdHZhciBfc3BsaWNlID0gYXAuc3BsaWNlXG5cdGZ1bmN0aW9uIG5vdGlmeVNpemUoYXJyYXksIHNpemUpIHtcblx0ICAgIGlmIChhcnJheS5sZW5ndGggIT09IHNpemUpIHtcblx0ICAgICAgICBhcnJheS5ub3RpZnkoJ2xlbmd0aCcsIGFycmF5Lmxlbmd0aCwgc2l6ZSwgdHJ1ZSlcblx0ICAgIH1cblx0fVxuXG5cdF9fYXJyYXlfXy5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoYWxsKSB7IC8v56e76ZmkTuS4quWFg+e0oFxuXHQgICAgdmFyIHNpemUgPSB0aGlzLmxlbmd0aFxuXHQgICAgaWYgKEFycmF5LmlzQXJyYXkoYWxsKSkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdCAgICAgICAgICAgIGlmIChhbGwuaW5kZXhPZih0aGlzW2ldKSAhPT0gLTEpIHtcblx0ICAgICAgICAgICAgICAgIF9zcGxpY2UuY2FsbCh0aGlzLCBpLCAxKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIGlmICh0eXBlb2YgYWxsID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgZm9yIChpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHQgICAgICAgICAgICB2YXIgZWwgPSB0aGlzW2ldXG5cdCAgICAgICAgICAgIGlmIChhbGwoZWwsIGkpKSB7XG5cdCAgICAgICAgICAgICAgICBfc3BsaWNlLmNhbGwodGhpcywgaSwgMSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgX3NwbGljZS5jYWxsKHRoaXMsIDAsIHRoaXMubGVuZ3RoKVxuXG5cdCAgICB9XG5cdCAgICBpZiAoIWF2YWxvbi5tb2Rlcm4pIHtcblx0ICAgICAgICB0aGlzLiRtb2RlbCA9IHRvSnNvbih0aGlzKVxuXHQgICAgfVxuXHQgICAgbm90aWZ5U2l6ZSh0aGlzLCBzaXplKVxuXHQgICAgdGhpcy5ub3RpZnkoKVxuXHR9XG5cblxuXHR2YXIgX19tZXRob2RfXyA9IFsncHVzaCcsICdwb3AnLCAnc2hpZnQnLCAndW5zaGlmdCcsICdzcGxpY2UnXVxuXG5cdF9fbWV0aG9kX18uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG5cdCAgICB2YXIgb3JpZ2luYWwgPSBhcFttZXRob2RdXG5cdCAgICBfX2FycmF5X19bbWV0aG9kXSA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cdCAgICAgICAgLy8g57un57ut5bCd6K+V5Yqr5oyB5pWw57uE5YWD57Sg55qE5bGe5oCnXG5cdCAgICAgICAgdmFyIGFyZ3MgPSBbXSwgc2l6ZSA9IHRoaXMubGVuZ3RoXG5cblx0ICAgICAgICBpZiAobWV0aG9kID09PSAnc3BsaWNlJyAmJiBPYmplY3QodGhpc1swXSkgPT09IHRoaXNbMF0pIHtcblx0ICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuc2xpY2UoYSwgYilcblx0ICAgICAgICAgICAgdmFyIG5lbyA9IGFwLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuXHQgICAgICAgICAgICB2YXIgYXJncyA9IFthLCBiXVxuXHQgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgam4gPSBuZW8ubGVuZ3RoOyBqIDwgam47IGorKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBvbGRbal1cblxuXHQgICAgICAgICAgICAgICAgYXJnc1tqICsgMl0gPSBtb2RlbEFkYXB0b3IobmVvW2pdLCBpdGVtLCAoaXRlbSAmJiBpdGVtLiRldmVudHMgfHwge30pLCB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuJGlkICsgJy4qJyxcblx0ICAgICAgICAgICAgICAgICAgICBtYXN0ZXI6IHRydWVcblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHQgICAgICAgICAgICAgICAgYXJnc1tpXSA9IG1vZGVsQWRhcHRvcihhcmd1bWVudHNbaV0sIDAsIHt9LCB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuJGlkICsgJy4qJyxcblx0ICAgICAgICAgICAgICAgICAgICBtYXN0ZXI6IHRydWVcblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHJlc3VsdCA9IG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpXG5cdCAgICAgICAgaWYgKCFhdmFsb24ubW9kZXJuKSB7XG5cdCAgICAgICAgICAgIHRoaXMuJG1vZGVsID0gdG9Kc29uKHRoaXMpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIG5vdGlmeVNpemUodGhpcywgc2l6ZSlcblx0ICAgICAgICB0aGlzLm5vdGlmeSgpXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdFxuXHQgICAgfVxuXHR9KVxuXG5cdCdzb3J0LHJldmVyc2UnLnJlcGxhY2UoYXZhbG9uLnJ3b3JkLCBmdW5jdGlvbiAobWV0aG9kKSB7XG5cdCAgICBfX2FycmF5X19bbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBhcFttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0ICAgICAgICBpZiAoIWF2YWxvbi5tb2Rlcm4pIHtcblx0ICAgICAgICAgICAgdGhpcy4kbW9kZWwgPSB0b0pzb24odGhpcylcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5ub3RpZnkoKVxuXHQgICAgICAgIHJldHVybiB0aGlzXG5cdCAgICB9XG5cdH0pXG5cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF2YWxvblxuXHQvL+S9v+eUqOi/meS4quadpeaJgeW5s+WMluaVsOaNriAgaHR0cHM6Ly9naXRodWIuY29tL2dhZWFyb24vbm9ybWFsaXpyXG5cdC8v5L2/55SoUHJvbWlzZSAgaHR0cHM6Ly9naXRodWIuY29tL3N0ZWZhbnBlbm5lci9lczYtcHJvbWlzZVxuXHQvL+S9v+eUqOi/meS4qkFKQVjlupMgaHR0cHM6Ly9naXRodWIuY29tL21hdHRoZXctYW5kcmV3cy9pc29tb3JwaGljLWZldGNoXG5cbi8qKiovIH0sXG4vKiA3NyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0dmFyIHNoYXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3OClcblx0dmFyIGNhbkhpZGVQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oODApXG5cdHZhciBpbml0RXZlbnRzID0gc2hhcmUuaW5pdEV2ZW50c1xuXG5cdC8qXG5cdCAqIHRvSnNvblxuXHQgKiBoaWRlUHJvcGVydHlcblx0ICogaW5pdFZpZXdNb2RlbFxuXHQgKi9cblxuXHRmdW5jdGlvbiB0b0pzb24odmFsKSB7XG5cdCAgICB2YXIgeHR5cGUgPSBhdmFsb24udHlwZSh2YWwpXG5cdCAgICBpZiAoeHR5cGUgPT09ICdhcnJheScpIHtcblx0ICAgICAgICB2YXIgYXJyYXkgPSBbXVxuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIGFycmF5W2ldID0gdG9Kc29uKHZhbFtpXSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGFycmF5XG5cdCAgICB9IGVsc2UgaWYgKHh0eXBlID09PSAnb2JqZWN0Jykge1xuXHQgICAgICAgIHZhciBvYmogPSB7fVxuXHQgICAgICAgIGZvciAoaSBpbiB2YWwpIHtcblx0ICAgICAgICAgICAgaWYgKGkgPT09ICdfX3Byb3h5X18nIHx8IGkgPT09ICdfX2RhdGFfXycgfHwgaSA9PT0gJ19fY29uc3RfXycpXG5cdCAgICAgICAgICAgICAgICBjb250aW51ZVxuXHQgICAgICAgICAgICBpZiAodmFsLmhhc093blByb3BlcnR5KGkpKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB2YWxbaV1cblx0ICAgICAgICAgICAgICAgIG9ialtpXSA9IHZhbHVlICYmIHZhbHVlLm5vZGVUeXBlID8gdmFsdWUgOiB0b0pzb24odmFsdWUpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIG9ialxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHZhbFxuXHR9XG5cblx0ZnVuY3Rpb24gaGlkZVByb3BlcnR5KGhvc3QsIG5hbWUsIHZhbHVlKSB7XG5cdCAgICBpZiAoY2FuSGlkZVByb3BlcnR5KSB7XG5cdCAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGhvc3QsIG5hbWUsIHtcblx0ICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuXHQgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcblx0ICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG5cdCAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHQgICAgICAgIH0pXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGhvc3RbbmFtZV0gPSB2YWx1ZVxuXHQgICAgfVxuXHR9XG5cblx0dmFyIG1vZGVsQWNjZXNzb3IgPSB7XG5cdCAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gdG9Kc29uKHRoaXMpXG5cdCAgICB9LFxuXHQgICAgc2V0OiBhdmFsb24ubm9vcCxcblx0ICAgIGVudW1lcmFibGU6IGZhbHNlLFxuXHQgICAgY29uZmlndXJhYmxlOiB0cnVlXG5cdH1cblxuXHRmdW5jdGlvbiBpbml0Vmlld01vZGVsKCR2bW9kZWwsIGhlaXJsb29tLCBrZXlzLCBhY2Nlc3NvcnMsIG9wdGlvbnMpIHtcblxuXHQgICAgaWYgKG9wdGlvbnMuYXJyYXkpIHtcblx0ICAgICAgICBpZiAoYXZhbG9uLm1vZGVybikge1xuXHQgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoJHZtb2RlbCwgJyRtb2RlbCcsIG1vZGVsQWNjZXNzb3IpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgJHZtb2RlbC4kbW9kZWwgPSB0b0pzb24oJHZtb2RlbClcblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGZ1bmN0aW9uIGhhc093bktleShrZXkpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGtleXNba2V5XSA9PT0gdHJ1ZVxuXHQgICAgICAgIH1cblx0ICAgICAgICBoaWRlUHJvcGVydHkoJHZtb2RlbCwgJyRhY2Nlc3NvcnMnLCBhY2Nlc3NvcnMpXG5cdCAgICAgICAgaGlkZVByb3BlcnR5KCR2bW9kZWwsICdoYXNPd25Qcm9wZXJ0eScsIGhhc093bktleSlcblx0ICAgICAgICBoaWRlUHJvcGVydHkoJHZtb2RlbCwgJyR0cmFjaycsIE9iamVjdC5rZXlzKGtleXMpLnNvcnQoKS5qb2luKCc7OycpKVxuXHQgICAgfVxuXHQgICAgaGlkZVByb3BlcnR5KCR2bW9kZWwsICckaWQnLCBvcHRpb25zLmlkKVxuXHQgICAgaGlkZVByb3BlcnR5KCR2bW9kZWwsICckaGFzaGNvZGUnLCBvcHRpb25zLmhhc2hjb2RlKVxuXHQgICAgaWYgKG9wdGlvbnMubWFzdGVyID09PSB0cnVlKSB7XG5cdCAgICAgICAgaGlkZVByb3BlcnR5KCR2bW9kZWwsICckcnVuJywgZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICBydW4uY2FsbCgkdm1vZGVsKVxuXHQgICAgICAgIH0pXG5cdCAgICAgICAgaGlkZVByb3BlcnR5KCR2bW9kZWwsICckd2FpdCcsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgd2FpdC5jYWxsKCR2bW9kZWwpXG5cdCAgICAgICAgfSlcblx0ICAgICAgICBoaWRlUHJvcGVydHkoJHZtb2RlbCwgJyRlbGVtZW50JywgbnVsbClcblx0ICAgICAgICBoaWRlUHJvcGVydHkoJHZtb2RlbCwgJyRyZW5kZXInLCAwKVxuXHQgICAgICAgIGluaXRFdmVudHMoJHZtb2RlbCwgaGVpcmxvb20pXG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiB3YWl0KCkge1xuXHQgICAgdGhpcy4kZXZlbnRzLiQkd2FpdCQkID0gdHJ1ZVxuXHR9XG5cblx0ZnVuY3Rpb24gcnVuKCkge1xuXHQgICAgdmFyIGhvc3QgPSB0aGlzLiRldmVudHNcblx0ICAgIGRlbGV0ZSBob3N0LiQkd2FpdCQkXG5cdCAgICBpZiAoaG9zdC4kJGRpcnR5JCQpIHtcblx0ICAgICAgICBkZWxldGUgaG9zdC4kJGRpcnR5JCRcblx0ICAgICAgICBhdmFsb24ucmVyZW5kZXJTdGFydCA9IG5ldyBEYXRlXG5cdCAgICAgICAgdmFyIGlkID0gdGhpcy4kaWRcblx0ICAgICAgICB2YXIgZG90SW5kZXggPSBpZC5pbmRleE9mKCcuJylcblx0ICAgICAgICBpZiAoZG90SW5kZXggPiAwKSB7XG5cdCAgICAgICAgICAgIGF2YWxvbi5iYXRjaChpZC5zbGljZSgwLCBkb3RJbmRleCkpXG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgYXZhbG9uLmJhdGNoKGlkKVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdHNoYXJlLiQkbWlkd2F5LmluaXRWaWV3TW9kZWwgPSBpbml0Vmlld01vZGVsXG5cblx0c2hhcmUuJCRtaWR3YXkuaGlkZVByb3BlcnR5ID0gaGlkZVByb3BlcnR5XG5cblx0dmFyIG1peGluID0ge1xuXHQgICAgdG9Kc29uOiB0b0pzb24sXG5cdCAgICBpbml0Vmlld01vZGVsOiBpbml0Vmlld01vZGVsLFxuXHQgICAgbW9kZWxBY2Nlc3NvcjogbW9kZWxBY2Nlc3NvclxuXHR9XG5cdGZvciAodmFyIGkgaW4gc2hhcmUpIHtcblx0ICAgIG1peGluW2ldID0gc2hhcmVbaV1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gbWl4aW5cblxuXG4vKioqLyB9LFxuLyogNzggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFxuXHR2YXIgJCRtaWR3YXkgPSB7fVxuXHR2YXIgJCRza2lwQXJyYXkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYzKVxuXHR2YXIgZGlzcGF0Y2ggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc5KVxuXHR2YXIgJGVtaXQgPSBkaXNwYXRjaC4kZW1pdFxuXHR2YXIgJHdhdGNoID0gZGlzcGF0Y2guJHdhdGNoXG5cdC8qXG5cdCAqIGluaXRFdmVudHNcblx0ICogaXNTa2lwXG5cdCAqIG1vZGVsQWRhcHRvclxuXHQgKiBtYWtlQWNjZXNzb3Jcblx0ICovXG5cblx0ZnVuY3Rpb24gaW5pdEV2ZW50cygkdm1vZGVsLCBoZWlybG9vbSkge1xuXHQgICAgaGVpcmxvb20uX192bW9kZWxfXyA9ICR2bW9kZWxcblx0ICAgIHZhciBoaWRlID0gJCRtaWR3YXkuaGlkZVByb3BlcnR5XG5cblx0ICAgIGhpZGUoJHZtb2RlbCwgJyRldmVudHMnLCBoZWlybG9vbSlcblx0ICAgIGhpZGUoJHZtb2RlbCwgJyR3YXRjaCcsIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuXHQgICAgICAgICAgICByZXR1cm4gJHdhdGNoLmFwcGx5KCR2bW9kZWwsIGFyZ3VtZW50cylcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB0aHJvdyAnJHdhdGNo5pa55rOV5Y+C5pWw5LiN5a+5J1xuXHQgICAgICAgIH1cblx0ICAgIH0pXG5cdCAgICBoaWRlKCR2bW9kZWwsICckZmlyZScsIGZ1bmN0aW9uIChleHByLCBhLCBiKSB7XG5cdCAgICAgICAgdmFyIGxpc3QgPSAkdm1vZGVsLiRldmVudHNbZXhwcl1cblx0ICAgICAgICAkZW1pdChsaXN0LCAkdm1vZGVsLCBleHByLCBhLCBiKVxuXHQgICAgfSlcblx0fVxuXG5cdHZhciByc2tpcCA9IC9mdW5jdGlvbnx3aW5kb3d8ZGF0ZXxyZWdleHB8ZWxlbWVudC9pXG5cblx0ZnVuY3Rpb24gaXNTa2lwKGtleSwgdmFsdWUsIHNraXBBcnJheSkge1xuXHQgICAgLy8g5Yik5a6a5q2k5bGe5oCn6IO95ZCm6L2s5o2i6K6/6Zeu5ZmoXG5cdCAgICByZXR1cm4ga2V5LmNoYXJBdCgwKSA9PT0gJyQnIHx8XG5cdCAgICAgICAgICAgIHNraXBBcnJheVtrZXldIHx8XG5cdCAgICAgICAgICAgIChyc2tpcC50ZXN0KGF2YWxvbi50eXBlKHZhbHVlKSkpIHx8XG5cdCAgICAgICAgICAgICh2YWx1ZSAmJiB2YWx1ZS5ub2RlTmFtZSAmJiB2YWx1ZS5ub2RlVHlwZSA+IDApXG5cdH1cblxuXHRmdW5jdGlvbiBtb2RlbEFkYXB0b3IoZGVmaW5pdGlvbiwgb2xkLCBoZWlybG9vbSwgb3B0aW9ucykge1xuXHQgICAgLy/lpoLmnpzmlbDnu4TovazmjaLkuLrnm5HmjqfmlbDnu4Rcblx0ICAgIGlmIChBcnJheS5pc0FycmF5KGRlZmluaXRpb24pKSB7XG5cdCAgICAgICAgcmV0dXJuICQkbWlkd2F5LmFycmF5RmFjdG9yeShkZWZpbml0aW9uLCBvbGQsIGhlaXJsb29tLCBvcHRpb25zKVxuXHQgICAgfSBlbHNlIGlmIChPYmplY3QoZGVmaW5pdGlvbikgPT09IGRlZmluaXRpb24gJiYgdHlwZW9mIGRlZmluaXRpb24gIT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAvL+WmguaenOatpOWxnuaAp+WOn+adpeWwseaYr+S4gOS4qlZNLOaLhuWIhumHjOmdoueahOiuv+mXruWZqOWxnuaAp1xuXHQgICAgICAgIGlmIChvbGQgJiYgb2xkLiRpZCkge1xuXHQgICAgICAgICAgICArK2F2YWxvbi5zdXNwZW5kVXBkYXRlXG5cdCAgICAgICAgICAgIC8vMS415bim5p2l55qE5LyY5YyW5pa55qGIXG5cdCAgICAgICAgICAgIGlmIChvbGQuJHRyYWNrICE9PSBPYmplY3Qua2V5cyhkZWZpbml0aW9uKS5zb3J0KCkuam9pbignOzsnKSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHZtID0gJCRtaWR3YXkuc2xhdmVGYWN0b3J5KG9sZCwgZGVmaW5pdGlvbiwgaGVpcmxvb20sIG9wdGlvbnMpXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB2bSA9IG9sZFxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgaW4gZGVmaW5pdGlvbikge1xuXHQgICAgICAgICAgICAgICAgaWYgKCQkc2tpcEFycmF5W2ldKVxuXHQgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cdCAgICAgICAgICAgICAgICB2bVtpXSA9IGRlZmluaXRpb25baV1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAtLWF2YWxvbi5zdXNwZW5kVXBkYXRlXG5cdCAgICAgICAgICAgIHJldHVybiB2bVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHZtID0gJCRtaWR3YXkubWFzdGVyRmFjdG9yeShkZWZpbml0aW9uLCBoZWlybG9vbSwgb3B0aW9ucylcblx0ICAgICAgICAgICAgcmV0dXJuIHZtXG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICByZXR1cm4gZGVmaW5pdGlvblxuXHQgICAgfVxuXHR9XG5cdCQkbWlkd2F5Lm1vZGVsQWRhcHRvciA9IG1vZGVsQWRhcHRvclxuXG5cblx0ZnVuY3Rpb24gbWFrZUFjY2Vzc29yKHNpZCwgc3BhdGgsIGhlaXJsb29tKSB7XG5cdCAgICB2YXIgb2xkID0gTmFOXG5cdCAgICBmdW5jdGlvbiBnZXQoKSB7XG5cdCAgICAgICAgcmV0dXJuIG9sZFxuXHQgICAgfVxuXHQgICAgZ2V0LmhlaXJsb29tID0gaGVpcmxvb21cblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgZ2V0OiBnZXQsXG5cdCAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG5cdCAgICAgICAgICAgIGlmIChvbGQgPT09IHZhbCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIHZtID0gaGVpcmxvb20uX192bW9kZWxfX1xuXHQgICAgICAgICAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG5cdCAgICAgICAgICAgICAgICB2YWwgPSAkJG1pZHdheS5tb2RlbEFkYXB0b3IodmFsLCBvbGQsIGhlaXJsb29tLCB7XG5cdCAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IHNwYXRoLFxuXHQgICAgICAgICAgICAgICAgICAgIGlkOiBzaWRcblx0ICAgICAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIG9sZGVyID0gb2xkXG5cdCAgICAgICAgICAgIG9sZCA9IHZhbFxuXHQgICAgICAgICAgICBpZiAodGhpcy4kaGFzaGNvZGUgJiYgdm0gKSB7XG5cdCAgICAgICAgICAgICAgICB2bS4kZXZlbnRzLiQkZGlydHkkJCA9IHRydWVcblx0ICAgICAgICAgICAgICAgIGlmKHZtLiRldmVudHMuJCR3YWl0JCQpXG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG5cdCAgICAgICAgICAgICAgICAvL+KYheKYheehruS/neWIh+aNouWIsOaWsOeahGV2ZW50c+S4rSjov5nkuKpldmVudHPlj6/og73mmK/mnaXoh6pvbGRQcm94eSkgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIGlmIChoZWlybG9vbSAhPT0gdm0uJGV2ZW50cykge1xuXHQgICAgICAgICAgICAgICAgICAgIGdldC5oZWlybG9vbSA9IHZtLiRldmVudHNcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICAvL+WmguaenOi/meS4quWxnuaAp+aYr+e7hOS7tumFjee9ruWvueixoeS4reeahOWxnuaApyzpgqPkuYjlroPpnIDopoHop6blj5Hnu4Tku7bnmoTlm57osINcblx0ICAgICAgICAgICAgICAgIGVtaXRXaWRnZXQoZ2V0LiRkZWNvbXBvc2UsIHNwYXRoLCB2YWwsIG9sZGVyKVxuXHQgICAgICAgICAgICAgICAgLy/op6blj5Hmma7pgJrlsZ7mgKfnmoTlm57osINcblx0ICAgICAgICAgICAgICAgIGlmIChzcGF0aC5pbmRleE9mKCcqJykgPT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgJGVtaXQoZ2V0LmhlaXJsb29tW3NwYXRoXSwgdm0sIHNwYXRoLCB2YWwsIG9sZGVyKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgLy/lpoLmnpzov5nkuKrlsZ7mgKfmmK/mlbDnu4TlhYPntKDkuIrnmoTlsZ7mgKdcblx0ICAgICAgICAgICAgICAgIGVtaXRBcnJheShzaWQrJycsIHZtLCBzcGF0aCwgdmFsLCBvbGRlcilcblx0ICAgICAgICAgICAgICAgIC8v5aaC5p6c6L+Z5Liq5bGe5oCn5a2Y5Zyo6YCa6YWN56ymXG5cdCAgICAgICAgICAgICAgICBlbWl0V2lsZGNhcmQoZ2V0LmhlaXJsb29tLCB2bSwgc3BhdGgsIHZhbCwgb2xkZXIpXG5cdCAgICAgICAgICAgICAgICB2bS4kZXZlbnRzLiQkZGlydHkkJCA9IGZhbHNlXG5cdCAgICAgICAgICAgICAgICBiYXRjaFVwZGF0ZVZpZXcodm0uJGlkKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblx0ICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXHQgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gYmF0Y2hVcGRhdGVWaWV3KGlkKSB7XG5cdCAgICBhdmFsb24ucmVyZW5kZXJTdGFydCA9IG5ldyBEYXRlXG5cdCAgICB2YXIgZG90SW5kZXggPSBpZC5pbmRleE9mKCcuJylcblx0ICAgIGlmIChkb3RJbmRleCA+IDApIHtcblx0ICAgICAgICBhdmFsb24uYmF0Y2goaWQuc2xpY2UoMCwgZG90SW5kZXgpKVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBhdmFsb24uYmF0Y2goaWQpXG5cdCAgICB9XG5cdH1cblxuXHR2YXIgcnRvcHN1YiA9IC8oW14uXSspXFwuKC4rKS9cblx0ZnVuY3Rpb24gZW1pdEFycmF5KHNpZCwgdm0sIHNwYXRoLCB2YWwsIG9sZGVyKSB7XG5cdCAgICBpZiAoc2lkLmluZGV4T2YoJy4qLicpID4gMCkge1xuXHQgICAgICAgIHZhciBhcnIgPSBzaWQubWF0Y2gocnRvcHN1Yilcblx0ICAgICAgICB2YXIgdG9wID0gYXZhbG9uLnZtb2RlbHNbIGFyclsxXSBdXG5cdCAgICAgICAgaWYgKHRvcCkge1xuXHQgICAgICAgICAgICB2YXIgcGF0aCA9IGFyclsyXVxuXHQgICAgICAgICAgICAkZW1pdCh0b3AuJGV2ZW50c1sgcGF0aCBdLCB2bSwgc3BhdGgsIHZhbCwgb2xkZXIpXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gZW1pdFdpZGdldCh3aG9sZSwgc3BhdGgsIHZhbCwgb2xkZXIpIHtcblx0ICAgIGlmICh3aG9sZSAmJiB3aG9sZVtzcGF0aF0pIHtcblx0ICAgICAgICB2YXIgd3ZtID0gd2hvbGVbc3BhdGhdXG5cdCAgICAgICAgaWYgKCF3dm0uJGhhc2hjb2RlKSB7XG5cdCAgICAgICAgICAgIGRlbGV0ZSB3aG9sZVtzcGF0aF1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB2YXIgd3BhdGggPSBzcGF0aC5yZXBsYWNlKC9eW14uXStcXC4vLCAnJylcblx0ICAgICAgICAgICAgaWYgKHdwYXRoICE9PSBzcGF0aCkge1xuXHQgICAgICAgICAgICAgICAgJGVtaXQod3ZtLiRldmVudHNbd3BhdGhdLCB3dm0sIHdwYXRoLCB2YWwsIG9sZGVyKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gZW1pdFdpbGRjYXJkKG9iaiwgdm0sIHNwYXRoLCB2YWwsIG9sZGVyKSB7XG5cdCAgICBpZiAob2JqLl9fZnV6enlfXykge1xuXHQgICAgICAgIG9iai5fX2Z1enp5X18ucmVwbGFjZShhdmFsb24ucndvcmQsIGZ1bmN0aW9uIChleHByKSB7XG5cdCAgICAgICAgICAgIHZhciBsaXN0ID0gb2JqW2V4cHJdXG5cdCAgICAgICAgICAgIHZhciByZWcgPSBsaXN0LnJlZ1xuXHQgICAgICAgICAgICBpZiAocmVnICYmIHJlZy50ZXN0KHNwYXRoKSkge1xuXHQgICAgICAgICAgICAgICAgJGVtaXQobGlzdCwgdm0sIHNwYXRoLCB2YWwsIG9sZGVyKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBleHByXG5cdCAgICAgICAgfSlcblx0ICAgIH1cblx0fVxuXG5cblx0ZnVuY3Rpb24gZGVmaW5lKGRlZmluaXRpb24pIHtcblx0ICAgIHZhciAkaWQgPSBkZWZpbml0aW9uLiRpZFxuXHQgICAgaWYgKCEkaWQgJiYgYXZhbG9uLmNvbmZpZy5kZWJ1Zykge1xuXHQgICAgICAgIGF2YWxvbi53YXJuKCd2bS4kaWQgbXVzdCBiZSBzcGVjaWZpZWQnKVxuXHQgICAgfVxuXHQgICAgaWYgKGF2YWxvbi52bW9kZWxzWyRpZF0pIHtcblx0ICAgICAgICB0aHJvdyBFcnJvcignZXJyb3I6WycgKyAkaWQgKyAnXSBoYWQgZGVmaW5lZCEnKVxuXHQgICAgfVxuXHQgICAgdmFyIHZtID0gJCRtaWR3YXkubWFzdGVyRmFjdG9yeShkZWZpbml0aW9uLCB7fSwge1xuXHQgICAgICAgIHBhdGhuYW1lOiAnJyxcblx0ICAgICAgICBpZDogJGlkLFxuXHQgICAgICAgIG1hc3RlcjogdHJ1ZVxuXHQgICAgfSlcblxuXHQgICAgcmV0dXJuIGF2YWxvbi52bW9kZWxzWyRpZF0gPSB2bVxuXG5cdH1cblxuXHRmdW5jdGlvbiBhcnJheUZhY3RvcnkoYXJyYXksIG9sZCwgaGVpcmxvb20sIG9wdGlvbnMpIHtcblx0ICAgIGlmIChvbGQgJiYgb2xkLnNwbGljZSkge1xuXHQgICAgICAgIHZhciBhcmdzID0gWzAsIG9sZC5sZW5ndGhdLmNvbmNhdChhcnJheSlcblx0ICAgICAgICArK2F2YWxvbi5zdXNwZW5kVXBkYXRlXG5cdCAgICAgICAgb2xkLnNwbGljZS5hcHBseShvbGQsIGFyZ3MpXG5cdCAgICAgICAgLS1hdmFsb24uc3VzcGVuZFVwZGF0ZVxuXHQgICAgICAgIHJldHVybiBvbGRcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSBpbiBfX2FycmF5X18pIHtcblx0ICAgICAgICAgICAgYXJyYXlbaV0gPSBfX2FycmF5X19baV1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICBhcnJheS5ub3RpZnkgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCkge1xuXHQgICAgICAgICAgICB2YXIgdm0gPSBoZWlybG9vbS5fX3Ztb2RlbF9fXG5cdCAgICAgICAgICAgIGlmICh2bSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBhID09PSBudWxsIHx8IGEgPT09IHZvaWQgMCA/XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGF0aG5hbWUgOlxuXHQgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnBhdGhuYW1lICsgJy4nICsgYVxuXHQgICAgICAgICAgICAgICAgdm0uJGZpcmUocGF0aCwgYiwgYylcblx0ICAgICAgICAgICAgICAgIGlmICghZCAmJiAhaGVpcmxvb20uJCR3YWl0JCQgJiYgIWF2YWxvbi5zdXNwZW5kVXBkYXRlICkge1xuXHQgICAgICAgICAgICAgICAgICAgIGJhdGNoVXBkYXRlVmlldyh2bS4kaWQpXG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgaGFzaGNvZGUgPSBhdmFsb24ubWFrZUhhc2hDb2RlKCckJylcblx0ICAgICAgICBvcHRpb25zLmFycmF5ID0gdHJ1ZVxuXHQgICAgICAgIG9wdGlvbnMuaGFzaGNvZGUgPSBoYXNoY29kZVxuXHQgICAgICAgIG9wdGlvbnMuaWQgPSBvcHRpb25zLmlkIHx8IGhhc2hjb2RlXG5cdCAgICAgICAgJCRtaWR3YXkuaW5pdFZpZXdNb2RlbChhcnJheSwgaGVpcmxvb20sIHt9LCB7fSwgb3B0aW9ucylcblxuXHQgICAgICAgIGZvciAodmFyIGogPSAwLCBuID0gYXJyYXkubGVuZ3RoOyBqIDwgbjsgaisrKSB7XG5cdCAgICAgICAgICAgIGFycmF5W2pdID0gbW9kZWxBZGFwdG9yKGFycmF5W2pdLCAwLCB7fSwge1xuXHQgICAgICAgICAgICAgICAgaWQ6IGFycmF5LiRpZCArICcuKicsXG5cdCAgICAgICAgICAgICAgICBtYXN0ZXI6IHRydWVcblx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGFycmF5XG5cdCAgICB9XG5cdH1cblx0JCRtaWR3YXkuYXJyYXlGYWN0b3J5ID0gYXJyYXlGYWN0b3J5XG5cblx0dmFyIF9fYXJyYXlfXyA9IHtcblx0ICAgIHNldDogZnVuY3Rpb24gKGluZGV4LCB2YWwpIHtcblx0ICAgICAgICBpZiAoKChpbmRleCA+Pj4gMCkgPT09IGluZGV4KSAmJiB0aGlzW2luZGV4XSAhPT0gdmFsKSB7XG5cdCAgICAgICAgICAgIGlmIChpbmRleCA+IHRoaXMubGVuZ3RoKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihpbmRleCArICdzZXTmlrnms5XnmoTnrKzkuIDkuKrlj4LmlbDkuI3og73lpKfkuo7ljp/mlbDnu4Tplb/luqYnKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxLCB2YWwpXG5cdCAgICAgICAgfVxuXHQgICAgfSxcblx0ICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAoZWwpIHsgLy/liKTlrprmmK/lkKbljIXlkKtcblx0ICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKGVsKSAhPT0gLTFcblx0ICAgIH0sXG5cdCAgICBlbnN1cmU6IGZ1bmN0aW9uIChlbCkge1xuXHQgICAgICAgIGlmICghdGhpcy5jb250YWlucyhlbCkpIHsgLy/lj6rmnInkuI3lrZjlnKjmiY1wdXNoXG5cdCAgICAgICAgICAgIHRoaXMucHVzaChlbClcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHRoaXNcblx0ICAgIH0sXG5cdCAgICBwdXNoQXJyYXk6IGZ1bmN0aW9uIChhcnIpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5wdXNoLmFwcGx5KHRoaXMsIGFycilcblx0ICAgIH0sXG5cdCAgICByZW1vdmU6IGZ1bmN0aW9uIChlbCkgeyAvL+enu+mZpOesrOS4gOS4quetieS6jue7meWumuWAvOeahOWFg+e0oFxuXHQgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUF0KHRoaXMuaW5kZXhPZihlbCkpXG5cdCAgICB9LFxuXHQgICAgcmVtb3ZlQXQ6IGZ1bmN0aW9uIChpbmRleCkgeyAvL+enu+mZpOaMh+Wumue0ouW8leS4iueahOWFg+e0oFxuXHQgICAgICAgIGlmICgoaW5kZXggPj4+IDApID09PSBpbmRleCkge1xuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEpXG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBbXVxuXHQgICAgfSxcblx0ICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdGhpcy5yZW1vdmVBbGwoKVxuXHQgICAgICAgIHJldHVybiB0aGlzXG5cdCAgICB9XG5cdH1cblx0YXZhbG9uLmRlZmluZSA9IGRlZmluZVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgJCRtaWR3YXk6ICQkbWlkd2F5LFxuXHQgICAgJCRza2lwQXJyYXk6ICQkc2tpcEFycmF5LFxuXHQgICAgaXNTa2lwOiBpc1NraXAsXG5cdCAgICBfX2FycmF5X186IF9fYXJyYXlfXyxcblx0ICAgIGluaXRFdmVudHM6IGluaXRFdmVudHMsXG5cdCAgICBtYWtlQWNjZXNzb3I6IG1ha2VBY2Nlc3Nvcixcblx0ICAgIG1vZGVsQWRhcHRvcjogbW9kZWxBZGFwdG9yXG5cdH1cblxuLyoqKi8gfSxcbi8qIDc5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcblx0LyoqXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKiDlsZ7mgKfnm5HlkKzns7vnu58gXG5cdCAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQgKi9cblxuXHRmdW5jdGlvbiBhZGp1c3RWbSh2bSwgZXhwcikge1xuXHQgICAgdmFyIHRvcHBhdGggPSBleHByLnNwbGl0KFwiLlwiKVswXSwgb3RoZXJcblx0ICAgIHRyeSB7XG5cdCAgICAgICAgaWYgKHZtLmhhc093blByb3BlcnR5KHRvcHBhdGgpKSB7XG5cdCAgICAgICAgICAgIGlmICh2bS4kYWNjZXNzb3JzKSB7XG5cdCAgICAgICAgICAgICAgICBvdGhlciA9IHZtLiRhY2Nlc3NvcnNbdG9wcGF0aF0uZ2V0LmhlaXJsb29tLl9fdm1vZGVsX19cblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIG90aGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2bSwgdG9wcGF0aCkuZ2V0LmhlaXJsb29tLl9fdm1vZGVsX19cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgfVxuXHQgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIG90aGVyIHx8IHZtXG5cdH1cblxuXHRmdW5jdGlvbiB0b1JlZ0V4cChleHByKSB7XG5cdCAgICB2YXIgYXJyID0gZXhwci5zcGxpdCgnLicpXG5cdCAgICByZXR1cm4gbmV3IFJlZ0V4cChcIl5cIiArIGFyci5tYXAoZnVuY3Rpb24gKGVsKSB7XG5cdCAgICAgICAgcmV0dXJuIGVsID09PSAnKicgPyAnKD86W14uXSspJyA6IGVsXG5cdCAgICB9KS5qb2luKCdcXFxcLicpICsgJyQnLCAnaScpXG5cdH1cblx0ZnVuY3Rpb24gYWRkRnV6enkoYWRkLCBvYmosIGV4cHIpIHtcblx0ICAgIGlmIChhZGQpIHtcblx0ICAgICAgICBpZiAob2JqLl9fZnV6enlfXykge1xuXHQgICAgICAgICAgICBpZiAob2JqLl9fZnV6enlfXy5pbmRleE9mKCcsJyArIGV4cHIpID09PSAtMSkge1xuXHQgICAgICAgICAgICAgICAgb2JqLl9fZnV6enlfXyArPSAnLCcgKyBleHByXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBvYmouX19mdXp6eV9fID0gZXhwclxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uICR3YXRjaChleHByLCBjYWxsYmFjaykge1xuXHQgICAgdmFyIGZ1enp5ID0gZXhwci5pbmRleE9mKCcuKicpID4gMCB8fCBleHByID09PSAnKidcblx0ICAgIHZhciB2bSA9IGZ1enp5ID8gdGhpcyA6ICR3YXRjaC5hZGp1c3QodGhpcywgZXhwcilcblx0ICAgIHZhciBoaXZlID0gdGhpcy4kZXZlbnRzXG5cdCAgICB2YXIgbGlzdCA9IGhpdmVbZXhwcl0gfHwgKGhpdmVbZXhwcl0gPSBbXSlcblx0ICAgIGlmIChmdXp6eSkge1xuXHQgICAgICAgIGxpc3QucmVnID0gbGlzdC5yZWcgfHwgdG9SZWdFeHAoZXhwcilcblx0ICAgIH1cblx0ICAgIGFkZEZ1enp5KGZ1enp5LCBoaXZlLCBleHByKVxuXHQgICAgaWYgKHZtICE9PSB0aGlzKSB7XG5cdCAgICAgICAgYWRkRnV6enkoZnV6enksIHRoaXMuJGV2ZW50cywgZXhwcilcblx0ICAgIH1cblxuXHQgICAgYXZhbG9uLkFycmF5LmVuc3VyZShsaXN0LCBjYWxsYmFjaylcblxuXHQgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBhdmFsb24uQXJyYXkucmVtb3ZlKGxpc3QsIGNhbGxiYWNrKVxuXHQgICAgfVxuXHR9XG5cblx0JHdhdGNoLmFkanVzdCA9IGFkanVzdFZtXG5cdC8qKlxuXHQgKiAkZmlyZSDmlrnms5XnmoTlhoXpg6jlrp7njrBcblx0ICogXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGxpc3Qg6K6i6ZiF6ICF5pWw57uEXG5cdCAqIEBwYXJhbSB7Q29tcG9uZW50fSB2bVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCDnm5HlkKzlsZ7mgKflkI3miJbot6/lvoRcblx0ICogQHBhcmFtIHtBbnl9IGEg5b2T5YmN5YC8IFxuXHQgKiBAcGFyYW0ge0FueX0gYiDov4fljrvlgLxcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGkg5aaC5p6c5oqb6ZSZLOiuqeS4i+S4gOS4que7p+e7reaJp+ihjFxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0ZnVuY3Rpb24gJGVtaXQobGlzdCwgdm0sIHBhdGgsIGEsIGIsIGkpIHtcblx0ICAgIGlmIChsaXN0ICYmIGxpc3QubGVuZ3RoKSB7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgZm9yIChpID0gaSB8fCBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBsaXN0W2ldXG5cdCAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHZtLCBhLCBiLCBwYXRoKVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgICAgICBpZiAoaSAtIDEgPiAwKVxuXHQgICAgICAgICAgICAgICAgJGVtaXQobGlzdCwgdm0sIHBhdGgsIGEsIGIsIGkgLSAxKVxuXHQgICAgICAgICAgICBhdmFsb24ubG9nKGUsIHBhdGgpXG5cdCAgICAgICAgfVxuXG5cdCAgICB9XG5cdH1cblxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgICAgJGVtaXQ6ICRlbWl0LFxuXHQgICAgJHdhdGNoOiAkd2F0Y2gsXG5cdCAgICBhZGp1c3RWbTogYWRqdXN0Vm1cblx0fVxuXG5cbi8qKiovIH0sXG4vKiA4MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Ly/lpoLmnpzmtY/op4jlmajkuI3mlK/mjIFlY21hMjYydjXnmoRPYmplY3QuZGVmaW5lUHJvcGVydGllc+aIluiAheWtmOWcqEJVR++8jOavlOWmgklFOFxuXHQvL+agh+WHhua1j+iniOWZqOS9v+eUqF9fZGVmaW5lR2V0dGVyX18sIF9fZGVmaW5lU2V0dGVyX1/lrp7njrBcblx0dmFyIGZsYWcgPSB0cnVlXG5cdHRyeSB7XG5cdCAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdfJywge1xuXHQgICAgICAgIHZhbHVlOiAneCdcblx0ICAgIH0pXG5cdH0gY2F0Y2ggKGUpIHtcblx0ICAgIGZsYWcgPSBmYWxzZVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmbGFnXG5cbi8qKiovIH0sXG4vKiA4MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XG5cdHZhciBjYW5IaWRlUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgwKVxuXHR2YXIgJCRza2lwQXJyYXkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYzKVxuXG5cblx0dmFyIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuXHR2YXIgZGVmaW5lUHJvcGVydHlcblxuXHR2YXIgZXhwb3NlID0gbmV3IERhdGUoKSAtIDBcblxuXHRpZiAoIWNhbkhpZGVQcm9wZXJ0eSkge1xuXHQgICAgaWYgKCdfX2RlZmluZUdldHRlcl9fJyBpbiBhdmFsb24pIHtcblx0ICAgICAgICBkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIGRlc2MpIHtcblx0ICAgICAgICAgICAgaWYgKCd2YWx1ZScgaW4gZGVzYykge1xuXHQgICAgICAgICAgICAgICAgb2JqW3Byb3BdID0gZGVzYy52YWx1ZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICgnZ2V0JyBpbiBkZXNjKSB7XG5cdCAgICAgICAgICAgICAgICBvYmouX19kZWZpbmVHZXR0ZXJfXyhwcm9wLCBkZXNjLmdldClcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoJ3NldCcgaW4gZGVzYykge1xuXHQgICAgICAgICAgICAgICAgb2JqLl9fZGVmaW5lU2V0dGVyX18ocHJvcCwgZGVzYy5zZXQpXG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIG9ialxuXHQgICAgICAgIH1cblx0ICAgICAgICBkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwgZGVzY3MpIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBkZXNjcykge1xuXHQgICAgICAgICAgICAgICAgaWYgKGRlc2NzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBkZXNjc1twcm9wXSlcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gb2JqXG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgaWYgKGF2YWxvbi5tc2llKSB7XG5cdCAgICAgICAgdmFyIFZCQ2xhc3NQb29sID0ge31cblx0ICAgICAgICB3aW5kb3cuZXhlY1NjcmlwdChbLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cdCAgICAgICAgICAgICdGdW5jdGlvbiBwYXJzZVZCKGNvZGUpJyxcblx0ICAgICAgICAgICAgJ1xcdEV4ZWN1dGVHbG9iYWwoY29kZSknLFxuXHQgICAgICAgICAgICAnRW5kIEZ1bmN0aW9uJyAvL+i9rOaNouS4gOauteaWh+acrOS4ulZC5Luj56CBXG5cdCAgICAgICAgXS5qb2luKCdcXG4nKSwgJ1ZCU2NyaXB0Jyk7XG5cdCAgICAgICAgXG5cdCAgICAgICAgZnVuY3Rpb24gVkJNZWRpYXRvcihpbnN0YW5jZSwgYWNjZXNzb3JzLCBuYW1lLCB2YWx1ZSkgey8vIGpzaGludCBpZ25vcmU6bGluZVxuXHQgICAgICAgICAgICB2YXIgYWNjZXNzb3IgPSBhY2Nlc3NvcnNbbmFtZV1cblx0ICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcblx0ICAgICAgICAgICAgICAgIGFjY2Vzc29yLnNldC5jYWxsKGluc3RhbmNlLCB2YWx1ZSlcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBhY2Nlc3Nvci5nZXQuY2FsbChpbnN0YW5jZSlcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG5hbWUsIGFjY2Vzc29ycywgcHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblx0ICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IFtdXG5cdCAgICAgICAgICAgIGJ1ZmZlci5wdXNoKFxuXHQgICAgICAgICAgICAgICAgICAgICdcXHJcXG5cXHRQcml2YXRlIFtfX2RhdGFfX10sIFtfX3Byb3h5X19dJyxcblx0ICAgICAgICAgICAgICAgICAgICAnXFx0UHVibGljIERlZmF1bHQgRnVuY3Rpb24gW19fY29uc3RfX10oZCcgKyBleHBvc2UgKyAnLCBwJyArIGV4cG9zZSArICcpJyxcblx0ICAgICAgICAgICAgICAgICAgICAnXFx0XFx0U2V0IFtfX2RhdGFfX10gPSBkJyArIGV4cG9zZSArICc6IHNldCBbX19wcm94eV9fXSA9IHAnICsgZXhwb3NlLFxuXHQgICAgICAgICAgICAgICAgICAgICdcXHRcXHRTZXQgW19fY29uc3RfX10gPSBNZScsIC8v6ZO+5byP6LCD55SoXG5cdCAgICAgICAgICAgICAgICAgICAgJ1xcdEVuZCBGdW5jdGlvbicpXG5cdCAgICAgICAgICAgIC8v5re75Yqg5pmu6YCa5bGe5oCnLOWboOS4ulZCU2NyaXB05a+56LGh5LiN6IO95YOPSlPpgqPmoLfpmo/mhI/lop7liKDlsZ7mgKfvvIzlv4XpobvlnKjov5nph4zpooTlhYjlrprkuYnlpb1cblx0ICAgICAgICAgICAgdmFyIHVuaXEgPSB7XG5cdCAgICAgICAgICAgICAgIF9fcHJveHlfXzogdHJ1ZSxcblx0ICAgICAgICAgICAgICAgX19kYXRhX186IHRydWUsXG5cdCAgICAgICAgICAgICAgIF9fY29uc3RfXzogdHJ1ZVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy/mt7vliqDorr/pl67lmajlsZ7mgKcgXG5cdCAgICAgICAgICAgIGZvciAobmFtZSBpbiBhY2Nlc3NvcnMpIHtcblx0ICAgICAgICAgICAgICAgIHVuaXFbbmFtZV0gPSB0cnVlXG5cdCAgICAgICAgICAgICAgICBidWZmZXIucHVzaChcblx0ICAgICAgICAgICAgICAgICAgICAgICAgLy/nlLHkuo7kuI3nn6Xlr7nmlrnkvJrkvKDlhaXku4DkuYgs5Zug5q2kc2V0LCBsZXTpg73nlKjkuIpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdFB1YmxpYyBQcm9wZXJ0eSBMZXQgWycgKyBuYW1lICsgJ10odmFsJyArIGV4cG9zZSArICcpJywgLy9zZXR0ZXJcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdFxcdENhbGwgW19fcHJveHlfX10oTWUsW19fZGF0YV9fXSwgXCInICsgbmFtZSArICdcIiwgdmFsJyArIGV4cG9zZSArICcpJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdEVuZCBQcm9wZXJ0eScsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdcXHRQdWJsaWMgUHJvcGVydHkgU2V0IFsnICsgbmFtZSArICddKHZhbCcgKyBleHBvc2UgKyAnKScsIC8vc2V0dGVyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdcXHRcXHRDYWxsIFtfX3Byb3h5X19dKE1lLFtfX2RhdGFfX10sIFwiJyArIG5hbWUgKyAnXCIsIHZhbCcgKyBleHBvc2UgKyAnKScsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdcXHRFbmQgUHJvcGVydHknLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnXFx0UHVibGljIFByb3BlcnR5IEdldCBbJyArIG5hbWUgKyAnXScsIC8vZ2V0dGVyXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdcXHRPbiBFcnJvciBSZXN1bWUgTmV4dCcsIC8v5b+F6aG75LyY5YWI5L2/55Soc2V06K+t5Y+lLOWQpuWImeWug+S8muivr+WwhuaVsOe7hOW9k+Wtl+espuS4sui/lOWbnlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnXFx0XFx0U2V0WycgKyBuYW1lICsgJ10gPSBbX19wcm94eV9fXShNZSxbX19kYXRhX19dLFwiJyArIG5hbWUgKyAnXCIpJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdElmIEVyci5OdW1iZXIgPD4gMCBUaGVuJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdFxcdFsnICsgbmFtZSArICddID0gW19fcHJveHlfX10oTWUsW19fZGF0YV9fXSxcIicgKyBuYW1lICsgJ1wiKScsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICdcXHRFbmQgSWYnLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAnXFx0T24gRXJyb3IgR290byAwJyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgJ1xcdEVuZCBQcm9wZXJ0eScpXG5cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBmb3IgKG5hbWUgaW4gcHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgaWYgKHVuaXFbbmFtZV0gIT09IHRydWUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB1bmlxW25hbWVdID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKCdcXHRQdWJsaWMgWycgKyBuYW1lICsgJ10nKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGZvciAobmFtZSBpbiAkJHNraXBBcnJheSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHVuaXFbbmFtZV0gIT09IHRydWUpIHtcblx0ICAgICAgICAgICAgICAgICAgICB1bmlxW25hbWVdID0gdHJ1ZVxuXHQgICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKCdcXHRQdWJsaWMgWycgKyBuYW1lICsgJ10nKVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGJ1ZmZlci5wdXNoKCdcXHRQdWJsaWMgWycgKyAnaGFzT3duUHJvcGVydHknICsgJ10nKVxuXHQgICAgICAgICAgICBidWZmZXIucHVzaCgnRW5kIENsYXNzJylcblx0ICAgICAgICAgICAgdmFyIGJvZHkgPSBidWZmZXIuam9pbignXFxyXFxuJylcblx0ICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IFZCQ2xhc3NQb29sW2JvZHldXG5cdCAgICAgICAgICAgIGlmICghY2xhc3NOYW1lKSB7XG5cdCAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBhdmFsb24ubWFrZUhhc2hDb2RlKCdWQkNsYXNzJylcblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgd2luZG93LnBhcnNlVkIoJ0NsYXNzICcgKyBjbGFzc05hbWUgKyBib2R5KVxuXHQgICAgICAgICAgICAgICAgd2luZG93LnBhcnNlVkIoW1xuXHQgICAgICAgICAgICAgICAgICAgICdGdW5jdGlvbiAnICsgY2xhc3NOYW1lICsgJ0ZhY3RvcnkoYSwgYiknLCAvL+WIm+W7uuWunuS+i+W5tuS8oOWFpeS4pOS4quWFs+mUrueahOWPguaVsFxuXHQgICAgICAgICAgICAgICAgICAgICdcXHREaW0gbycsXG5cdCAgICAgICAgICAgICAgICAgICAgJ1xcdFNldCBvID0gKE5ldyAnICsgY2xhc3NOYW1lICsgJykoYSwgYiknLFxuXHQgICAgICAgICAgICAgICAgICAgICdcXHRTZXQgJyArIGNsYXNzTmFtZSArICdGYWN0b3J5ID0gbycsXG5cdCAgICAgICAgICAgICAgICAgICAgJ0VuZCBGdW5jdGlvbidcblx0ICAgICAgICAgICAgICAgIF0uam9pbignXFxyXFxuJykpXG5cdCAgICAgICAgICAgICAgICBWQkNsYXNzUG9vbFtib2R5XSA9IGNsYXNzTmFtZVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciByZXQgPSB3aW5kb3dbY2xhc3NOYW1lICsgJ0ZhY3RvcnknXShhY2Nlc3NvcnMsIFZCTWVkaWF0b3IpIC8v5b6X5Yiw5YW25Lqn5ZOBXG5cdCAgICAgICAgICAgIHJldHVybiByZXQgLy/lvpfliLDlhbbkuqflk4Fcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGRlZmluZVByb3BlcnRpZXNcblxuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG47IiwiLy/lvJXlhaXpobnnm67kuK3nlKjliLDnmoRqc1xucmVxdWlyZSgnYXZhbG9uMicpO1xucmVxdWlyZSgnLi9sb2dpbi92aWV3L3ZpZXcuanMnKTtcbnJlcXVpcmUoJy4vY2hlY2tJbmZvL3ZpZXcvdmlldy5qcycpO1xucmVxdWlyZSgnLi9yZWdpc3RlckluZm8vdmlldy92aWV3LmpzJyk7XG5yZXF1aXJlKCcuL3JlZ2lzdGVyRW5kL3ZpZXcvdmlldy5qcycpO1xuXG5cbiIsIi8vcmVxdWlyZSgnYXZhbG9uMicpO1xudmFyIHZtID0gYXZhbG9uLmRlZmluZSh7XG4gICAgJGlkOiBcImNoZWNrSW5mb1wiLFxuICAgIG5hbWU6IFwiY2hlY2tJbmZvXCIsXG4gICAgYXJyYXk6IFsxMSwgMjIsIDMzM11cbn0pOyIsIi8vcmVxdWlyZSgnYXZhbG9uMicpO1xudmFyIHZtID0gYXZhbG9uLmRlZmluZSh7XG4gICAgJGlkOiBcImxvZ0luXCIsXG4gICAgbmFtZTogXCJsb2dpblwiLFxuICAgIGFycmF5OiBbMTEsIDIyLCAzMzNdXG59KTsiLCIvL3JlcXVpcmUoJ2F2YWxvbjInKTtcbnZhciB2bSA9IGF2YWxvbi5kZWZpbmUoe1xuICAgICRpZDogXCJyZWdpc3RlckVuZFwiLFxuICAgIG5hbWU6IFwicmVnaXN0ZXJFbmRcIixcbiAgICBhcnJheTogWzExLCAyMiwgMzNdXG59KTsiLCIvL3JlcXVpcmUoJ2F2YWxvbjInKTtcbnZhciB2bSA9IGF2YWxvbi5kZWZpbmUoe1xuICAgICRpZDogXCJyZWdpc3RlckluZm9cIixcbiAgICBuYW1lOiBcInJlZ2lzdGVySW5mb1wiLFxuICAgIGFycmF5OiBbMTEsIDIyLCAzM11cbn0pOyJdfQ==
