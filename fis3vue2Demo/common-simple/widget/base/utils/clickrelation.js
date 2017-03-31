var AbsView = require("/widget/base/absview/absview.js");
var $ = require("jquery");
var _ = require("underscore");


var start = function(){
	$(document).on("click", clickHandler);
};

var clickHandler = function(e){
	var $target = $(e.target);

	_.each(relation, function(views){
		var isClickIn = _.some(views, function(view){
			var $el = null;
			if(view instanceof AbsView) {
				$el = view.getElement();
			} else {
				$el = $(view);
			}

			if($el && $target.closest($el).length > 0) {
				return true;
			}
		});
		_.each(views, function(view){
			if(isClickIn && view && view.clickInHandler) {
				view.clickInHandler();
			}
			if(!isClickIn && view && view.clickOutHandler) {
				view.clickOutHandler();
			}

		});
	});

};

var relation = {

};

var ClickRelation = {
	addRelation: function(id, viewOrEls){
		relation[id] = relation[id] || [];
		relation[id] = relation[id].concat(viewOrEls || []);
		return this;
	},
	removeRelation: function(id){
		relation[id] = [];
		return this;
	}

};
start();
return ClickRelation;