var $ = require("/widget/jplayer/jquery.jplayer.js");
require("/widget/jplayer/skin/blue.monday/css/jplayer.blue.monday.css");

$("#jquery_jplayer_demo").jPlayer({
	ready: function (event) {
		$(this).jPlayer("setMedia", {
			m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a"
		});
	},
	supplied: "m4a, oga",
	cssSelectorAncestor: "#jp_container_demo",
	useStateClassSkin: true,
	autoBlur: false
});