var log = require("/widget/log/log.js");

log.init({
	serverUrl: "http://statistics.yixueyilian.com/logup",
	globalData: {
		appkey: "10001",
		namespace: "10"
	},
	parseDomEvents: true
});

var count = 0;

setInterval(function(){
	log.log({
		eventID: "timeinterval",
		data: count ++
	});
}, 30 * 1000);
