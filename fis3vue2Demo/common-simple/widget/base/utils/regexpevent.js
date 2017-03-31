var _ = require("underscore");
var Backbone = require("backbone");

var cache = {};

function produceUniqEventName(){
	return _.uniqueId("event_proxy_");
}

function produceUniqConnector(){
	var uid = produceUniqEventName();
	var connector = function(eventName){
		var cacheInfo = cache[uid],
			eventRegExp = cacheInfo.eventRegExp,
			context = cacheInfo.context,
			callback = cacheInfo.callback;

		var OrigParams = Array.prototype.slice.apply(arguments);
		var supposeTriggerArgs = OrigParams.length > 0 ? OrigParams[OrigParams.length -1] : null;

		if(eventRegExp.test(eventName)) {
			callback.apply(context, [eventName, supposeTriggerArgs, OrigParams]);
		}
	};
	connector._uid = uid;

	return connector;
};

var eventProxy = {
	register: function(target, eventRegExp, callback, context){
		var params = Array.prototype.slice.apply(arguments);
		if(params.length < 3) {
			throw new Error("reg events helper need more than 3 args, there is only "+ params.length +", check it!");
		}

		if(_.isString(eventRegExp)) {
			eventRegExp = new  RegExp(eventRegExp);
		}

		if(!_.isRegExp(eventRegExp)) {
			throw new Error("eventName must be an instance of String or RegExp");
		}

		if(!(target.on && target.off)) {
			throw new Error("target must be events trigger");
		}


		var connector = produceUniqConnector();
		var uid = connector._uid;

		target.on("all", connector);

		cache[uid] = {
			target: target,
			eventRegExp: eventRegExp,
			callback: callback,
			context: context || null,
			connector: connector
		};
		return uid;
	},
	clear: function(uid){
		var cacheInfo = cache[uid];
		if(!cacheInfo) {
			return;
		}

		var target = cacheInfo.target;
		var connector = cacheInfo.connector;
		target.off("all", connector);

		delete cache[uid];
	}
};
_.extend(eventProxy, Backbone.Events);
return eventProxy;