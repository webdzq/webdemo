/**
 * @bref:导航页面
 **/

var _ = require("common:components/underscore/underscore.js");

var Ajax = require('/widget/comm/ajax/cajax.js');
var App = {
    init: function() {
        //console.log("hello signIn app");
        this.initVm();

        // this.$el = $('.sign-guide');
        // this.$el.show();
        //tplData = this.testData(); //dzqtest
    },
    initVm: function() {
        var signGuide = avalon.define({
            $id: "sign-guide",
            guideFlag: false,
            sxsignGuide: function(evt) {
                window.location.href = 'http://i.yanxiu.com/uft/sign/signIn.vm';
            },
            sxsignzxschool: function() {
                window.location.href = 'http://px.yanxiu.com/2016sx_1910/index.html';
            },
            sxsignyeyschool: function() {
                window.location.href = 'http://px.yanxiu.com/2016sx_1911/index.html';
            }
        });


    },
    initTmpl: function() {
        //demo ,没有使用
        var html = viewTmpl({
            name: 1
        });
        $("#tmpl").html(html);
    }


};
return App;
