/**
 * Terms:
 *
 * Uint8Array, FileReader, BlobBuilder, atob, ArrayBuffer
 * @fileOverview Image控件
 */



var Util = require('./util');
var api;
api = {
    parsers: { 65505: [] },
    maxMetaDataSize: 262144,
    parse: function (blob, cb) {
        var me = this, fr = new FileReader();
        fr.onload = function () {
            cb(false, me._parse(this.result));
            fr = fr.onload = fr.onerror = null;
        };
        fr.onerror = function (e) {
            cb(e.message);
            fr = fr.onload = fr.onerror = null;
        };
        blob = blob.slice(0, me.maxMetaDataSize);
        fr.readAsArrayBuffer(blob.getSource());
    },
    _parse: function (buffer, noParse) {
        if (buffer.byteLength < 6) {
            return;
        }
        var dataview = new DataView(buffer), offset = 2, maxOffset = dataview.byteLength - 4, headLength = offset, ret = {}, markerBytes, markerLength, parsers, i;
        if (dataview.getUint16(0) === 65496) {
            while (offset < maxOffset) {
                markerBytes = dataview.getUint16(offset);
                if (markerBytes >= 65504 && markerBytes <= 65519 || markerBytes === 65534) {
                    markerLength = dataview.getUint16(offset + 2) + 2;
                    if (offset + markerLength > dataview.byteLength) {
                        break;
                    }
                    parsers = api.parsers[markerBytes];
                    if (!noParse && parsers) {
                        for (i = 0; i < parsers.length; i += 1) {
                            parsers[i].call(api, dataview, offset, markerLength, ret);
                        }
                    }
                    offset += markerLength;
                    headLength = offset;
                } else {
                    break;
                }
            }
            if (headLength > 6) {
                if (buffer.slice) {
                    ret.imageHead = buffer.slice(2, headLength);
                } else {
                    // Workaround for IE10, which does not yet
                    // support ArrayBuffer.slice:
                    ret.imageHead = new Uint8Array(buffer).subarray(2, headLength);
                }
            }
        }
        return ret;
    },
    updateImageHead: function (buffer, head) {
        var data = this._parse(buffer, true), buf1, buf2, bodyoffset;
        bodyoffset = 2;
        if (data.imageHead) {
            bodyoffset = 2 + data.imageHead.byteLength;
        }
        if (buffer.slice) {
            buf2 = buffer.slice(bodyoffset);
        } else {
            buf2 = new Uint8Array(buffer).subarray(bodyoffset);
        }
        buf1 = new Uint8Array(head.byteLength + 2 + buf2.byteLength);
        buf1[0] = 255;
        buf1[1] = 216;
        buf1.set(new Uint8Array(head), 2);
        buf1.set(new Uint8Array(buf2), head.byteLength + 2);
        return buf1.buffer;
    }
};
Util.parseMeta = function () {
    return api.parse.apply(api, arguments);
};
Util.updateImageHead = function () {
    return api.updateImageHead.apply(api, arguments);
};
module.exports = api || module.exports;;