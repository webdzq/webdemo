var $ = require("jquery");
var Base64 = require("./base64.js");
var md5 = require("./md5.js");
var cookie = require("./cookie.js");
var string = require("./string.js");
var flash = require("./flash.js");
var clickRelation = require("./clickrelation.js");
var moment = require("./moment.js");
var regExpEvent = require("./regexpevent.js");
var time = require("./time.js");
var ruler=require("./ruler.js");
var extend=require("./extend.js")
var utils = {
	md5: md5,
	base64: new Base64(),
	cookie: cookie,
	string: string,
	flash: flash,
	clickRelation: clickRelation,
	moment: moment,
	regExpEvent: regExpEvent,
	time: time,
	ruler:ruler,
	extend:extend,
	blockTextSelection: function() {
		document.body.focus();
		document.onselectstart = function() {
			return false;
		};
	},

	// Turn off text selection blocking
	unblockTextSelection: function() {
		document.onselectstart = function() {
			return true;
		};
	},
	jsonToQuery: function(json){
		var arr = [];
		for(var i in json) {
			arr.push(i+"="+ encodeURIComponent(json[i]) );
		}
		return arr.join("&");
	},
	queryToJson: function(queryStr){
		var tmpArr = queryStr.replace(/^(\?|#)/,"").split("&");
		var result = {};
		for(var i in tmpArr) {
			if(tmpArr[i]) {
				var tt = tmpArr[i].split("=");
				result[tt[0]] = decodeURIComponent(tt[1] || "");
			}
		}
		return result;
	}
};
return utils;
