/**
 * @fileOverview  Md5 flash实现
 */



var FlashRuntime = require('./runtime');
module.exports = FlashRuntime.register('Md5', {
    init: function () {
    },
    loadFromBlob: function (blob) {
        return this.flashExec('Md5', 'loadFromBlob', blob.uid);
    }
}) || module.exports;;