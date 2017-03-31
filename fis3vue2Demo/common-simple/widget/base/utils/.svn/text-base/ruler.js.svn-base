/**
 * Created by alter on 2016/7/28.
 */
var _ = require("underscore");
var ruler = {
    fileSizeFriendlyFormat: function(fromSize) {
        var rs = 1024;
        var b = fromSize;
        if (b < rs) return b.toFixed(1) + "B";
        var kb = b / rs;
        if (kb < rs) return kb.toFixed(1) + "KB";
        var m = kb / rs;
        if (m < rs) return m.toFixed(1) + "M";
        return m / rs;
    }
};
return ruler;