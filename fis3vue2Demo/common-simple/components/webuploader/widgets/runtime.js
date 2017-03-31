/**
 * @fileOverview 添加获取Runtime相关信息的方法。
 */



var Uploader = require('../uploader');
var Runtime = require('../runtime/runtime');
require('./widget');
Uploader.support = function () {
    return Runtime.hasRuntime.apply(Runtime, arguments);
};
module.exports = Uploader.register({
    name: 'runtime',
    init: function () {
        if (!this.predictRuntimeType()) {
            throw Error('Runtime Error');
        }
    },
    /**
         * 预测Uploader将采用哪个`Runtime`
         * @grammar predictRuntimeType() => String
         * @method predictRuntimeType
         * @for  Uploader
         */
    predictRuntimeType: function () {
        var orders = this.options.runtimeOrder || Runtime.orders, type = this.type, i, len;
        if (!type) {
            orders = orders.split(/\s*,\s*/g);
            for (i = 0, len = orders.length; i < len; i++) {
                if (Runtime.hasRuntime(orders[i])) {
                    this.type = type = orders[i];
                    break;
                }
            }
        }
        return type;
    }
}) || module.exports;;