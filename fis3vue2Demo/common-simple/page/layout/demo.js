var $ = require("/widget/datetimepicker/datetimepicker.js");

$("#datetimepicker").datetimepicker({
	minDate: "2016-2-6",
	maxDate: "+1970-1-5"
});


var GroupView = require("/widget/base/groupview/groupview.js");
var view = new GroupView();
var nolimit_callback = function(eventName, supposeArgs, origArguments){
	console.log("nolimit_callback",eventName, supposeArgs, origArguments);
};

var limit_callback = function(eventName, supposeArgs, origArguments){
	console.log("limit_callback",eventName, supposeArgs, origArguments);
};
view.deepOn("testEvent", nolimit_callback);
view.deepOn("testEvent", limit_callback, null, 3); // limit it to 0-3 layers

view.trigger("testEvent");
view.trigger("children.testEvent");
view.trigger("children.children.testEvent");
view.trigger("children.children.children.testEvent");

view.trigger("children.children.children.children.testEvent"); // limit_callback will not be fired

view.deepOff("testEvent", nolimit_callback); 
view.trigger("children.testEvent"); // nolimit_callback will not be fired


view.deepOff("testEvent");
view.trigger("children.testEvent"); // all callbacks will not be fired

