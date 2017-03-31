var _ = require("underscore");
var time = {
    friendlyFormat: function(timestamp, option) {
        option = _.extend({
            min: 1,
            max: 4, // minutes, if less than one min, return "刚刚"
            now: null

        }, option);
        if (_.isString(timestamp)) {
			timestamp = timestamp.replace(/-/g,"/");
            timestamp = new Date(timestamp).getTime();
        }
        var now = option.now || new Date().getTime(),
            delta = now - timestamp,
            tailChar = delta > 0 ? "前" : (delta == 0 ? "刚刚" : "后");

        delta = Math.abs(delta);

        // "yyyy-MM-dd h:m:s"

        var s = delta / 1000,
            m = s / 60,
            h = m / 60,
            d = h / 24,
            M = d / 30,
            y = M / 12;
        var queue = [{
                unit: "年",
                number: y >> 0
            }, {
                unit: "个月",
                number: M >> 0
            }, {
                unit: "天",
                number: d >> 0
            }, {
                unit: "小时",
                number: h >> 0
            }, {
                unit: "分钟",
                number: m >> 0
            }, {
                unit: "秒",
                number: s >> 0
            }

        ];
        /*
			find the unit witch is'not zero by seq
		 */
        var config = _.find(queue, function(config) {
            return config.number > 0;
        });
        var index = _.indexOf(queue, config);

        if (!config || index > option.max) {
            return "刚刚";
        } else {
            if (index > option.min) {
                return config.number + config.unit + tailChar;
            } else {
                return new Date(timestamp).toLocaleString();
            }
        }
    },
    //转化为 yyyy-mm-dd hh-mm-ss
    transformYMDHMS: function(timestamp) {
        var date = new Date(timestamp);
        var y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        return y + "-" + m + "-" + d + " " + h + ":" + m + ":" + s;
    }
};
return time;