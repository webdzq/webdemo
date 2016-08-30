//var $ = require("common:components/jquery/jquery.js");
var _ = require("common:components/underscore/underscore.js");
var Ajax = require('/widget/comm/ajax/cajax.js');
var App = {
    init: function(tplData) {
        //console.log("hello checkInfo app", tplData);
        this.initVm(tplData);
        //this.initpageData(tplData);
        this.$el = $('.checkInfo-block');
        this.$el.show();
    },
    initpageData: function(tplData) {
        return {
            activecode: tplData.activecode,
            cnname: tplData.cnname,
            idcard: tplData.idcard,
            mobileverifycode: tplData.mobileverifycode,
            mobile: tplData.mobile,
            uid: ''

        };
    },
    testData: function() {
        var list = [{
            "uid": 1111,
            "cnname": "某某1",
            "mobile": "136*****123",
            "idcard": "111***********1234",
            "segment": 10,
            "segmentname": "小学",
            "study": 10,
            "studyname": "语文",
            "areacode": 140101,
            "areaname": "山西省太原市市直属",
            "schoolid": 111111,
            "schoolname": "学校名称"
        }, {
            "uid": 1111,
            "cnname": "某某1",
            "mobile": "136*****123",
            "idcard": "111***********1234",
            "segment": 10,
            "segmentname": "小学",
            "study": 10,
            "studyname": "语文",
            "areacode": 140101,
            "areaname": "山西省太原市市直属",
            "schoolid": 111111,
            "schoolname": "学校名称"
        }, {
            "uid": 1111,
            "cnname": "某某1",
            "mobile": "136*****123",
            "idcard": "111***********1234",
            "segment": 10,
            "segmentname": "小学",
            "study": 10,
            "studyname": "语文",
            "areacode": 140101,
            "areaname": "山西省太原市市直属",
            "schoolid": 111111,
            "schoolname": "学校名称"
        }];
        return list;
    },
    initVm: function(tplData) {
        var scope = this;
        var v_userlist = tplData.userlist;
        // var v_userlist = this.testData(); //testdzq
        // tplData = {
        //     idcard: ''
        //
        // };
        var userItems = this.reduceUserlist(v_userlist);
        avalon.filters.defauleVal = function(a) {
            //console.log("a...", a);
            return !a ? '无' : a;
        };
        var idcard = tplData.idcard || '';
        //var idcard='1234567890123456';

        //idcard=idcard.replace(/^(\d{3})\d*(\d{4})$/,'$1*$2');
        var mobile = tplData.mobile || '';
        var cnname = tplData.cnname || '';

        var len = idcard.length - 7;
        var str = "";
        for (var i = 0; i < len; i++) {
            str += '*';
        }

        idcard = idcard.replace(/^(\d{3})\d*(\d{4})$/, '$1' + str + '$2');
        var molen = mobile.length - 7;
        var mostr = "";
        for (var j = 0; j < molen; j++) {
            mostr += '*';
        }
        mobile = mobile.replace(/^(\d{3})\d*(\d{4})$/, '$1' + mostr + '$2');
        //console.log(idcard,len,mobile,molen);
        var checkInfovm = avalon.define({
            $id: "checkInfo-block",
            liindex: 0,
            vidcard: idcard,
            vmobile: mobile,
            vcnname: cnname,
            userItems: userItems.concat(),
            loopClick: function(index, evt) {
                //选择li
                checkInfovm.liindex = index;
                var $el = $(evt.currentTarget);
                $el.parents('ul').find('li').removeClass('cur');
                $el.removeClass('plain');
                $el.addClass('cur');

            },
            goback: function(evt) {
                //回到首页
                //console.log('goback...');
                window.location.href = "/uft/sign/signIn.vm";
            },
            sumbitNext: function(evt) {
                //提交信息

                var data = checkInfovm.userItems[checkInfovm.liindex].$model;
                var paramsObj = scope.initpageData(tplData);
                paramsObj.uid = data.uid;
                if (data.uid == '-1') {
                    alert('请选择正确的帐号或者新建');
                    return false;
                }
                var params = $.param(paramsObj);
                window.location.href = "/uft/sign/registerInfo.vm?" + params;
            },
            create: function(evt) {
                //新建账户
                //console.log('create...', scope.initpageData(tplData));
                var paramsObj = scope.initpageData(tplData);
                var params = $.param(paramsObj);
                window.location.href = "/uft/sign/registerInfo.vm?" + params;
            }

        });
    },
    reduceUserlist: function(v_userlist) {
        var userlist = v_userlist || [];

        userlist.push({
            "uid": -1
        });
        userlist.push({
            "uid": -1
        });
        userlist.push({
            "uid": -1
        });
        //console.log("userlist..", userlist.$model);
        return userlist;
    },
    checkIsExistsProject: function(v_uid, callback) {
        //检查是否存在国培项目-----不检查
        var uid = v_uid || '';
        new Ajax({
            url: ' /register/checkIsExistsProject.tc?uid=' + uid,
            type: 'get',
            data: {},
            success: function(data) {
                var code = data.code || 0;
                var msg = data.msg || '';
                if (code == 0) {
                    //不存在国培项目，进入修改页面
                    //window.location.href = "";
                    callback();
                } else if (code == 1) {
                    //存在国培项目，联系客服电话
                    //window.location.href = "";
                    alert(msg);
                } else {
                    //请求失败
                    alert(msg);

                }
            }
        });
    }


};
return App;
