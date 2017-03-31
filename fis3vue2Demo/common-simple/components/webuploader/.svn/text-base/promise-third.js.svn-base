/**
 * @fileOverview 使用jQuery的Promise
 */



var $ = require('./dollar');
module.exports = {
    Deferred: $.Deferred,
    when: $.when,
    isPromise: function (anything) {
        return anything && typeof anything.then === 'function';
    }
} || module.exports;;