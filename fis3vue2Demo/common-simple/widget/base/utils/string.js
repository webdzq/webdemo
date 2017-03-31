return {
    getLength: function (str) {
        var text = str.replace(/[^\x00-\xff]/g, "**");
        return text.length;
    },
    ellipsis: function (str, len, alt) {
        var tempStr = str;
        if (this.getLength(str) > len) {
            if (!alt) {
                alt = "…";
            }
            var i = 0;
            for (var z = 0; z < len; z++) {
                if (tempStr.charCodeAt(z) > 255) {
                    i = i + 2;
                } else {
                    i = i + 1;
                }
                if (i >= len) {
                    tempStr = tempStr.slice(0, (z + 1)) + alt;
                    break;
                }
            }
            return tempStr;
        } else {
            return str + "";
        }
    },
    GetStringbybyteLength: function (val, num) {
        for (var i = 0; i < val.length; i++) {
            var text = val.substring(0, i).replace(/[^\x00-\xff]/g, "**");
            if (text.length == num) {
                return val.substring(0, i);
            }
        }
        return val;
    },
    //普通字符转换成转意符
    html2Escape: function (sHtml) {
        return sHtml.replace(/[<>&"]/g, function (c) {
            return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'}[c];
        });
    },
    //转意符换成普通字符
    escape2Html: function (str) {
        var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
            return arrEntities[t];
        });
    }
};