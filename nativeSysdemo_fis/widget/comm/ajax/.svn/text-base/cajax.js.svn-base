var $ = require("common:components/jquery/jquery.js");
var options = {
    url: window.location.href,
    type: 'get',
    data: {
        test: 'test'
    },
    cache: false,
    dataType: 'json',
    success: function(data) {
        //console.log(data.toString());
    },
    error: function(e) {
        //console.log('request failute');
    }
};
var aj = function(opts) {
    var opt = $.extend(options, opts);
    $.ajax(opt);
};
return aj;
