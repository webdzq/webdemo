/**
 * @fileOverview Blob Html实现
 */



var Html5Runtime = require('./runtime');
var Blob = require('../../lib/blob');
module.exports = Html5Runtime.register('Blob', {
    slice: function (start, end) {
        var blob = this.owner.source, slice = blob.slice || blob.webkitSlice || blob.mozSlice;
        blob = slice.call(blob, start, end);
        return new Blob(this.getRuid(), blob);
    }
}) || module.exports;;