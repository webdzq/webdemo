//待优化的地方比较多！
//var $ = require("common:components/jquery/jquery.js");
var _ = require("common:components/underscore/underscore.js");
var Ajax = require('/widget/comm/ajax/cajax.js');
var App = {
    init: function (tplData) {
        //console.log("hello registerInfo app", tplData);
        this.$el = $('.registerInfo-block');
        //tplData = this.testData(); //dzqtest
        this.initVm(tplData);
        this.$el.show();

    },
    testData: function () {
        var data = {
            activecode: "LL12852146735",
            cnname: "荔枝",
            code: 2,
            idcard: "110256196502130004",
            mobile: "13512345678",
            mobileverifycode: "123456",
            msg: "",
            areas: {
                citys: [{
                    areacode: 140100,
                    name: "太原市"
                }],
                countys: [{
                    areacode: 140101,
                    name: "市辖区"
                }],
                schools: [{
                    id: 10112930,
                    name: "郝庄中学"
                }]
            },
            segments: {
                10: "小学",
                20: "初中",
                30: "高中",
                40: "学前",
                60: "中职",
                92: "班主任",
                93: "校长",
                99: "其他"
            },
            studys: {
                10: {
                    c: {
                        10: "语文",
                        11: "数学",
                        12: "英语",
                        19: "音乐",
                    },
                    g: {}
                },
                20: {
                    c: {
                        10: "语文",
                        11: "数学",
                        12: "英语",
                        19: "音乐",
                    },
                    g: {}
                },
                30: {
                    c: {
                        10: "语文",
                        11: "数学",
                        12: "英语",
                        19: "音乐",
                    },
                    g: {}
                },
                40: {
                    c: {
                        10: "语文",
                        11: "数学",
                        12: "英语",
                        19: "音乐",
                    },
                    g: {}
                },
                60: {
                    c: {
                        10: "语文",
                        11: "数学",
                        12: "英语",
                        19: "音乐",
                    },
                    g: {}
                },
                92: {
                    c: {
                        10: "语文",
                        11: "数学",
                        12: "英语",
                        19: "音乐",
                    },
                    g: {}
                },
                93: {
                    c: {
                        10: "语文",
                        11: "数学",
                        12: "英语",
                        19: "音乐",
                    },
                    g: {}
                },
                99: {
                    c: {
                        10: "语文",
                        11: "数学",
                        12: "英语",
                        19: "音乐",
                    },
                    g: {}
                }
            },
            user: {
                areacode: 140106,
                cnname: "荔枝",
                idcard: "110256196502130004",
                mobile: "13512345678",
                passport: "LL12240449138@shanxi.yanxiu.com",
                schoolid: 10115494,
                schoolname: "迎泽区并州路小学校",
                segment: 10,
                study: 10,
                uid: 22473558
            }

        };
        return data;
    },
    initSegmentMap: function (tplData) {
        //初始化年级，学段信息
        var segments = tplData.segments || {};
        var studys = tplData.studys || {};
        var segmentMap = {};
        var segmentArr = [];
        for (var seg in studys) {
            var item = studys[seg].c;
            segmentArr.push({
                code: seg,
                name: segments[seg]
            });
            var tmplArr = [];
            for (var key in item) {
                tmplArr.push({
                    code: key,
                    name: item[key]
                });
            }
            segmentMap[seg] = tmplArr;
        }
        return {
            segment: segmentArr,
            map: segmentMap
        };
    },
    initVm: function (tplData) {
        var scope = this;
        var tpluser = tplData.user;
        //var tplsegments = tplData.segments;
        var segmentObj = this.initSegmentMap(tplData);
        var segmentMap = segmentObj.map;
        var segment = tpluser.segment || segmentObj.segment[0].code;
        var segmentName = '';
        var study = tpluser.study || segmentMap[segment][0].code;
        var studyName = '';
        var areacodeName = '';
        var areacodechildName = '';
        var segmentArr = segmentObj.segment;
        var studyArr = segmentMap[segment];
        var area = tplData.areas || {};
        var citys = area.citys;
        var countys = area.countys;
        var schoolidArr = area.schools;
        var code = tplData.code || '0';
        var titleMsg = '填写您的注册信息';
        var pwdLabel = '设置密码';

        var mobile = tplData.mobile || '';
        var idcard = tplData.idcard || '';
        var cnname = tplData.cnname || '';
        // var schoolid = tpluser.schoolid || '';
        // var schoolname = tpluser.schoolname || '';
        var schoolid = '';
        var schoolname = '';
        var areacodechild = tpluser.areacode || countys[0].areacode;
        var areacode = (areacodechild + "").substr(0, 4) + "00";
        var activecode = tplData.activecode || '';
        var mobileverifycode = tplData.mobileverifycode || '';
        var uid = tpluser.uid || '';
        if (code == 2) {
            titleMsg = '您可以修改账户信息';
        } else if (code == 1) {
            titleMsg = '系统中已有与您信息匹配的帐号，您可以修改帐号信息';
            pwdLabel = '重置密码';
        }
        //console.log("areacode..", areacode);
        var registerInfoVm = avalon.define({
            $id: 'registerInfo-block',
            titleMsg: titleMsg,
            pwdLabel: pwdLabel,
            mobile: mobile,
            mobileverifycode: mobileverifycode,
            idcard: idcard,
            cnname: cnname,
            segment: segment,
            segmentName: segmentName,
            segmentArr: segmentArr.concat(), //不用concat会有bug，初始值无法刷新联动
            study: study,
            studyName: studyName,
            studyArr: studyArr.concat(),
            areacode: areacode,
            areacodeName: areacodeName,
            areacodeArr: citys.concat(),
            areacodechild: areacodechild,
            areacodechildName: areacodechildName,
            areacodechildArr: countys,
            schoolid: schoolid,
            schoolName: schoolname,
            schoolData: schoolidArr,
            schoolidArr: [],
            dropdownTimer: '',
            drapdownToggle: false,
            jjcode: '', //选填
            password: '',
            confirmpwd: '',
            topWindow: false, //注册成功modal
            popmodalFlag: false, //确认modal
            golearnUrl: '',
            uid: uid,
            activecode: activecode,
            btnText: '',
            ulFlag: false,
            validate: {},
            refirmSmt: function (evt) {
                //确认提交信息
                //console.log('refirmSmt.....');
                var $el = $(".registerInfo-block");
                if ($el.find('.refirmSmt').hasClass('on')) {
                    //console.log('refirmSmt....sumbit.');
                    registerInfoVm.sumbitHandle();
                }


            },
            cannel: function (evt) {
                //确认提交信息
                //console.log('cannel.....');
                registerInfoVm.popmodalFlag = false;
            },
            finish: function (evt) {
                //console.log("finish");
                //提交校验
                var errcount = 0;
                var $el = $(".registerInfo-block");


                if ('' == registerInfoVm.cnname) {
                    alert('姓名不能为空');
                    registerInfoVm.onerrValidShow(".registerInfo-cnname", {
                        regex: /^.{3,50}$/,
                        val: registerInfoVm.cnname

                    });
                    return false;
                }

                if ('' == registerInfoVm.schoolid) {
                    alert('请选择正确的学校名称');
                    registerInfoVm.onerrValidShow(".combo-input", {
                        regex: /^.{100}$/,
                        val: registerInfoVm.schoolName

                    });
                    return false;

                }
                var arr = registerInfoVm.schoolData;
                var schoolnameFlag = false;
                for (var i = 0, len = arr.length; i < len; i++) {
                    var item = arr[i];

                    if (registerInfoVm.schoolName == item.$model.name) {
                        //  console.log(registerInfoVm.schoolname, item.$model.name);
                        schoolnameFlag = true;
                        break;
                    }
                }
                //console.log(registerInfoVm.schoolid, schoolnameFlag);
                if (!schoolnameFlag) {
                    alert('请选择正确的学校名称');
                    registerInfoVm.onerrValidShow(".combo-input", {
                        regex: /^.{100}$/,
                        val: registerInfoVm.schoolName

                    });
                    return false;
                }
                if (registerInfoVm.password == '') {
                    alert('密码不能为空');
                    registerInfoVm.onerrValidShow(".registerInfo-password", {
                        regex: /^.{100}$/,
                        val: registerInfoVm.password

                    });
                    return false;
                }
                if (registerInfoVm.password != registerInfoVm.confirmpwd) {
                    alert('密码与确认密码不匹配');
                    registerInfoVm.onerrValidShow(".registerInfo-confirmpwd", {
                        regex: /^.{100}$/,
                        val: registerInfoVm.confirmpwd

                    });
                    registerInfoVm.onerrValidShow(".registerInfo-password", {
                        regex: /^.{100}$/,
                        val: registerInfoVm.password

                    });
                    return false;
                } else {
                    $el.find('.registerInfo-password').removeClass('errclass');
                    $el.find('.registerInfo-confirmpwd').removeClass('errclass');
                }

                $el.find('input').each(function (i, elem) {
                    if ($(elem).hasClass('errclass')) {
                        errcount++;
                    }
                });
                if (errcount == 0) {
                    //console.log('全部通过,提交表单');
                    //console.log(signvm.activecode);

                    registerInfoVm.popmodalFlag = true;
                    registerInfoVm.segmentName = $el.find('.grade').find("option:selected").text();
                    registerInfoVm.studyName = $el.find('.subject').find("option:selected").text();
                    registerInfoVm.areacodeName = $el.find('.area').find("option:selected").text();
                    registerInfoVm.areacodechildName = $el.find('.school').find("option:selected").text();

                    var count = 5;
                    clearInterval(registerInfoVm.timeid);
                    registerInfoVm.btnText = "确定";
                    $el.find('.refirmSmt').removeClass('on');
                    registerInfoVm.timeid = setInterval(function () {
                        count--;
                        registerInfoVm.btnText = "确定（" + count + "）";
                        if (count == 0) {
                            clearInterval(registerInfoVm.timeid);
                            registerInfoVm.btnText = "确定";
                            $el.find('.refirmSmt').addClass('on');
                        }
                    }, 1000);

                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');

                }
            },
            goback: function (evt) {
                //回到首页
                //console.log('goback...');
                window.location.replace("/uft/sign/signIn.vm");
            },
            golearn: function () {
                //回到首页
                //console.log('golearn...', registerInfoVm.golearnUrl);
                window.location.replace(registerInfoVm.golearnUrl);
            },
            sumbitHandle: function () {
                //表单提交
                var data = {
                    activecode: registerInfoVm.activecode,
                    mobileverifycode: registerInfoVm.mobileverifycode,
                    mobile: registerInfoVm.mobile,
                    idcard: registerInfoVm.idcard,
                    cnname: registerInfoVm.cnname,
                    segment: registerInfoVm.segment,
                    study: registerInfoVm.study,
                    areacode: registerInfoVm.areacodechild,
                    //areacodechild: registerInfoVm.areacodechild,
                    schoolid: registerInfoVm.schoolid,
                    jjcode: registerInfoVm.jjcode,
                    password: registerInfoVm.password,
                    uid: registerInfoVm.uid,

                };
                new Ajax({
                    url: '/register/saveInfo.tc',
                    type: 'post',
                    data: data,
                    success: function (data) {
                        var code = data.code || 0;
                        var msg = data.msg || "注册异常";
                        //code = 0;
                        if (code == 0) {
                            //注册成功
                            //window.location.replace = data.index;
                            registerInfoVm.popmodalFlag = false;
                            registerInfoVm.topWindow = true;

                            registerInfoVm.golearnUrl = data.index;
                        } else {
                            //注册异常，联系客服
                            alert(msg);
                        }
                    }
                });
            },
            onerrValidShow: function (elem, v_obj) {
                //err时显示红边框
                var obj = v_obj || null;
                var $el = $(elem);
                if (obj != null) {
                    var regex = obj.regex;
                    var val = obj.val;
                    //console.log(regex.test(val));
                    if (!regex.test(val)) {
                        $el.addClass('errclass');

                    } else {
                        $el.removeClass('errclass');
                        return false;
                    }
                } else {
                    $el.addClass('errclass');
                }
                $el.on('focus', function () {
                    $el.removeClass('errclass');
                });
                return true;
            },
            dropdownHander: function (evt) {
                //下拉框
                //console.log(1111);
                var $el = $(evt.target);
                registerInfoVm.drapdownToggle = false;
                registerInfoVm.ulFlag = true;
                //console.log("dropdownHander...", $el);
                if ($el.attr('datavalue') == -1) {
                    registerInfoVm.schoolid = "";
                    registerInfoVm.schoolName = "";
                    return;
                }
                registerInfoVm.schoolid = $el.attr('datavalue');
                registerInfoVm.schoolName = $el.attr('dataname');
            }
        });
        registerInfoVm.$watch("segment", function (a, oldval) {
            //学科学段联动

            registerInfoVm.studyArr = segmentMap[a];
            //console.log("key", key, studyArr);
            registerInfoVm.study = registerInfoVm.studyArr[0].code;
            //console.log("a...", a, segmentMap, registerInfoVm.studyArr.$model, registerInfoVm.study);
        });

        registerInfoVm.$watch("areacode", function (a) {
            //学校地区联动 ，
            scope.getareaList(a, function (dataList) {
                //console.log("dataList", dataList);
                registerInfoVm.areacodechildArr = dataList;
                registerInfoVm.areacodechild = registerInfoVm.areacodechildArr[0].areacode;
            });

        });
        registerInfoVm.$watch("areacodechild", function (a) {
            //学校地区联动学校名称 ，
            scope.getschoolList(a, function (schoolList) {
                //console.log("schoolList", schoolList);
                registerInfoVm.schoolidArr = schoolList;
                registerInfoVm.schoolData = schoolList;
                registerInfoVm.schoolName = "";
                registerInfoVm.schoolid = "";

            });

        });
        registerInfoVm.$watch("schoolName", function (v_val) {
            //学校名称
            var val = v_val || '';
            var tmpArr = [];
            var arr = registerInfoVm.schoolData.$model;
            //console.log("arr", arr);
            if (!!registerInfoVm.ulFlag) {
                registerInfoVm.ulFlag = false;
                return;
            }
            registerInfoVm.drapdownToggle = true;
            registerInfoVm.schoolidArr = [];
            if (val == '') {
                return;
            }
            for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i];
                var name = item.name;
                //console.log("val...", val, name);
                if (name.indexOf(val) != -1) {
                    tmpArr.push(item);
                }
            }
            if (tmpArr.length == 0) {
                //无结果
                tmpArr.push({
                    id: '-1',
                    name: '无结果'
                });
            }
            //console.log("tmpArr...", tmpArr);
            registerInfoVm.schoolidArr = tmpArr;
            clearTimeout(registerInfoVm.dropdownTimer);
            registerInfoVm.dropdownTimer = setTimeout(function () {
                registerInfoVm.drapdownToggle = false;
            }, 60 * 1000);

        });

        this.$el.find('.combo-input').blur(function () {
            //console.log('2222');

            setTimeout(function () {
                clearTimeout(registerInfoVm.dropdownTimer);
                registerInfoVm.drapdownToggle = false;
            }, 1000);

        });
        this.$el.find('.combo-input').focus(function () {
            //console.log('0000');
            if ('' != registerInfoVm.schoolName) {
                registerInfoVm.drapdownToggle = true;
            }

        });
    },
    getareaList: function (v_areacode, callback) {
        //获取区域信息
        var areacode = v_areacode || '140000';
        //var areaList = [];
        new Ajax({
            url: '/register/getAreaList.tc?areacode=' + areacode,
            type: 'get',
            data: {},
            success: function (data) {
                var code = data.code || 0;
                var msg = data.msg || '';
                if (code == 0) {
                    //areaList = data.list;
                    callback(data.list);
                } else {
                    //console.log('获取失败');
                    alert(msg);
                }
            }
        });
    },
    getschoolList: function (v_areacode, callback) {
        //获取学校名称信息
        var areacode = v_areacode || '140105';
        var schoolList = [];
        new Ajax({
            url: '/register/getSchoolList.tc?areacode=' + areacode,
            type: 'get',
            data: {},
            success: function (data) {
                var code = data.code || 0;
                var msg = data.msg || '';
                if (code == 0) {
                    schoolList = data.list;
                    callback(schoolList);
                } else {
                    alert(msg);
                    //console.log('获取失败');
                }
            }
        });
    }

};

return App;
