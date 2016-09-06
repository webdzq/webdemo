/**
canvas  核心逻辑代码 ,需要依赖具体环境.本项目建立在backbone+jello的基础之上
 支持浏览器:chrome,ff,edge等,不支持所有ie浏览器（8-11）

 调用逻辑:
 var CanvasView = require('../canvasUtil/view.js');


 function test(evt){
     var $target = $(evt.currentTarget);
     var imgsrc = $target.attr('src');
     var ptid = $target.data('ptid');
     var uid = $target.data('uid');
     var imgid = $target.data('imgid');
     var $curEl = $target.parents('.answers').find(".answer-bigimags");
     //console.log("$curEl", $curEl);
     var canvasView = new CanvasView({

                    el: $curEl,
                    $target: $target,
                    $parents: $target.parents('.answers'),
                    'imgsrc': imgsrc,
                    'ptid': ptid,
                    'uid': uid,
                    'imgid': imgid
                });
     $curEl.show();
 }
**/
var $ = require("common:components/jquery/jquery.js");
var Tip = require("/widget/plugins/tip/tip.js");

require('./simpleToolTip/simpletooltip.css');
var SimpleToolTip = require('./simpleToolTip/simpletooltip.js');
var Alert = require("/widget/plugins/alert/alert.js");
var GroupView = require("common:widget/base/groupview/groupview.js");
var canvasView = GroupView.extend({
    template: __inline("_view.tmpl"),
    injectModel: true,
    initialize: function(args) {
        GroupView.prototype.initialize.apply(this, arguments);
        var imgsrc = args.imgsrc;
        //imgsrc = "http://scc.jsyxw.cn/answer/images/2016/0905/file_57ccd9b798553.jpg";
        //console.log("args.....", args);
        this.g_params = args;
        this.$el = args.el;
        this.$parentModel = args.$parents;
        this.$target = args.$target; //当前图片
        this.initAttr(imgsrc);
        this.bindEvents();
        $(args.el).css({
            //'height': document.body.clientHeight,
            'minHeight': document.body.offsetHeight
        });
        $('body').addClass('bodybg');
        this.model.set('ptid', this.g_params.ptid);
        $('html, body').animate({
            scrollTop: 0

        }, 'slow');
    },
    initAttr: function(imgsrc) {
        //初始化属性
        this.canvas = null;
        this.tempContext = null; // global variable 2d context
        this.initImgsrc = imgsrc; //原图
        this.started = false;
        this.constH = 900; //工作区最大高度
        this.constW = 1000; //工作区最大宽度
        this.nd = 1; //操作的类型
        //this.$el = $('#my_painter');
        //this.$parentModel = this.$el.find(".answer-bigimags"); //图片弹窗model
        this.$button = this.$el.find('.button-group button'); //所有按钮
        this.$input = this.$el.find('.canvas_my_input'); //输入框
        this.drawX = 0; //当前图片绘制起点,旋转的时候会改变
        this.drawY = 0; //当前图片绘制起点,旋转的时候会改变
        this.degree = 0; //旋转的时候会改变
        this.step = 0; //决定当前画布的宽高情况
        this.historyArr = []; //保存每次操作后的图片的url
        this.historyStatus = 0; //首次撤销是0;historyArr的push过程中始终是0
        this.recoverArr = []; //保存每次撤销操作后的图片的url
        this.recoverStatus = 0; //撤销操作后首次点击是0
        this.changeAreaCount = 0; //放大缩小的次数.原图的基础上,最多放大3次.原图的基础上,最多缩小3次.
        this.initComponents(imgsrc);
    },
    initComponents: function(imgsrc) {
        this.$button.simpletooltip();
        var id = "event_canvas" + this.cid;
        //console.log(id);
        this.canvas = document.getElementById(id);
        if (!this.canvas.getContext) {
            console.log("Canvas not supported. Please install a HTML5 compatible browser.");
            return;
        }
        //console.log("initcmpt..", this.canvas.parentNode.clientWidth - 100, this.canvas.parentNode.clientHeight);
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.tempContext = this.canvas.getContext("2d");
        this.tempContext.fillStyle = "blue";
        this.canvas.focus();
        this.events();
        this.initImage(imgsrc);
    },
    bindEvents: function() {
        //this.model.on("change:id", this.changeHandler, this);
    },
    changeHandler: function() {
        //this.rerender();
        //this.initComponents();
    },
    initImage: function(imgsrc) {
        //画一张图片在canvas上
        var image = this.image;
        var scope = this;
        if (!image) {
            image = new Image();
        }
        image.crossOrigin = "Anonymous";
        image.onload = function() {
            //console.log("src...", image.src);
            //将坐标中心作为起启点
            scope.canvas.width = image.width;
            scope.canvas.height = image.height;
            //console.log("width...", scope.canvas.width, scope.canvas.height, image.width, image.height);
            scope.drawX = 0;
            scope.drawY = 0;
            //setTimeout(function() {
            scope.tempContext.drawImage(image, scope.drawX, scope.drawY, image.width, image.height);
            //}, 1000);

        };
        // 设置src属性，浏览器会自动加载。
        // 记住必须先绑定事件，才能设置src属性，否则会出同步问题。
        image.src = imgsrc;
        image.id = "my_image_" + Math.random();
        this.image = image;
        this.historyArr.push(image.src);
        scope.historyStatus = 0;
        return imgsrc;
    },

    historyImage: function(imgUrl) {
        //更新当前canvas的图片this.image
        var scope = this;
        scope.image.src = imgUrl;
    },
    addEventHandler: function(oTarget, sEventType, fnHandler) {
        //绑定事件工具函数
        var scope = this;
        if (!oTarget) {
            return;
        }
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, function(event) {
                fnHandler(event, scope);
            }, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, function(event) {
                fnHandler(event, scope);
            });
        } else {
            oTarget["on" + sEventType] = function(event) {
                fnHandler(event, scope);
            };
        }
    },
    events: function() {
        this.$button.unbind();
        //绑定事件
        this.$button.on('click', this.opationHandler.bind(this));
        this.addEventHandler(this.canvas, "mousedown", this.doMouseDown);
        this.addEventHandler(this.canvas, "keydown", this.doKeyDown);
        this.addEventHandler(this.canvas, "mousemove", this.doMouseMove);
        this.addEventHandler(this.canvas, "mouseup", this.doMouseUp);

    },
    opationHandler: function(event) {
        //确定操作的中央控制中心
        var scope = this;
        var $target = $(event.currentTarget);
        var nd = $target.data('nd');
        this.nd = nd;
        this.$input.hide();
        if ((scope.nd + "") == '1') {
            //铅笔
            this.$button.filter('.fill_line').addClass('cur_line');
            this.$button.filter('.fill_text').removeClass('cur_text');
        } else {
            this.$button.filter('.fill_line').removeClass('cur_line');
            //this.$button.filter('.fill_text').removeClass('cur_text');
        }
        if ((scope.nd + "") == '2') {
            //文本
            this.$button.filter('.fill_line').removeClass('cur_line');
            this.$button.filter('.fill_text').addClass('cur_text');
        } else {
            this.$button.filter('.fill_text').removeClass('cur_text');
            //this.$button.filter('.fill_text').removeClass('cur_text');
        }
        switch (scope.nd + "") {
            case '1':
                //画线
                break;
            case '2':
                //写文本
                break;
            case '3':
                //撤销上一步操作
                scope.reset_pre();
                break;
            case '4':
                //恢复撤销的操作
                scope.recover_next();
                break;
            case '5':
                //还原--最初学生作业的图
                scope.recoverCanvas();
                break;
            case '6':
                //放大
                scope.changeArea(1);
                break;
            case '7':
                //缩小
                scope.changeArea(2);
                break;
            case '8':
                //还原放大，缩小，旋转的图片
                //scope.imageRotate('rev');
                scope.revert();
                break;
            case '9':
                //左转
                scope.imageRotate('left');
                break;
            case '10':
                //右转
                scope.imageRotate('right');
                break;
            case '11':
                //保存
                scope.imageCloseAndSave();
                break;
            case '12':
                //关闭
                scope.imageClose();
                break;
            default:
                break;
        }
    },
    revert: function() {
        //还原到放大操作，旋转操作前的图片
        var scope = this;
        var len = scope.historyArr.length;
        var imgUrl = scope.historyArr[len - 1];
        scope.historyImage(imgUrl);
        scope.changeAreaCount = 0;
    },
    doMouseDown: function(event, scope) {
        if (!scope) {
            return;
        }
        var x = event.pageX;
        var y = event.pageY;
        var canvas = event.target;
        var loc = scope.getPointOnCanvas(canvas, x, y);
        if (scope.nd + "" == '1') {
            //画线
            scope.tempContext.moveTo(loc.x, loc.y);
            scope.started = true;
        } else if (scope.nd + "" == '2') {
            //写文本
            scope.writeTextOption(x, y);
        } else {
            //其他无鼠标事件
        }

    },
    doMouseMove: function(event, scope) {
        if (!scope) {
            return;
        }
        var x = event.pageX;
        var y = event.pageY;
        var canvas = event.target;
        var loc = scope.getPointOnCanvas(canvas, x, y);
        if (scope.nd + "" == '1') {
            if (scope.started) {
                scope.tempContext.lineTo(loc.x, loc.y);
                scope.tempContext.strokeStyle = 'rgba(255,0,0,0.5)';
                scope.tempContext.stroke();
            }
        }

    },
    doMouseUp: function(event, scope) {
        if (scope.started) {
            scope.doMouseMove(event, scope);
            scope.started = false;
            //console.log("scope.canvas...", scope.canvas);
            //var img = $("#my_images");
            var imgUrl = scope.canvas.toDataURL("image/png");
            scope.historyArr.push(imgUrl);
            scope.historyStatus = 0;
            scope.historyImage(imgUrl);
        }
    },
    getPointOnCanvas: function(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        var sx = window.scrollX;
        var sy = window.scrollY;
        return {
            x: x - sx - bbox.left * (canvas.width / bbox.width),
            y: y - sy - bbox.top * (canvas.height / bbox.height)
        };
    },
    writeTextOption: function(x, y) {
        //单击显示输入框
        var scope = this;
        var loc = scope.getPointOnCanvas(scope.canvas, x, y);
        //console.log('fillInputText...', posObj.x, posObj.y, loc.x, loc.y);
        //scope.tempContext.fillText(val, loc.x, loc.y);
        this.$input.focus();
        this.$input.unbind();
        this.$input.val('');
        this.$input.css({
            'left': x,
            'top': y
        });
        this.$input.show();
        this.$input.keydown(function(event) {
            if (event.keyCode == 13) {
                scope.fillInputText({
                    'x': x,
                    'y': y
                });
            }
        });

    },
    fillInputText: function(posObj) {
        //将输入框的文本绘制到canvas上
        //console.log('fillInputText...');
        var scope = this;
        var val = this.$input.val();
        if (!!val) {
            // scope.tempContext.shadowOffsetX = 2;
            // scope.tempContext.shadowOffsetY = 2;
            // scope.tempContext.shadowBlur = 2;
            // scope.tempContext.shadowColor = "rgba(0, 0, 0, 0.5)";

            scope.tempContext.font = "20px Times New Roman";
            scope.tempContext.fillStyle = "red";
            var loc = scope.getPointOnCanvas(scope.canvas, posObj.x, posObj.y);
            //console.log('fillInputText...', posObj.x, posObj.y, loc.x, loc.y);
            scope.tempContext.fillText(val, loc.x, loc.y + 10);
            this.$input.hide();

            var imgUrl = scope.canvas.toDataURL("image/png");
            scope.historyArr.push(imgUrl);
            scope.historyStatus = 0;
            scope.historyImage(imgUrl);
        }
    },
    changeArea: function(v_kind) {
        //放大,缩小
        var scope = this;
        var kind = v_kind || '0'; //1,放大,2,缩小
        var width = 0;
        var height = 0;
        var ctx = this.tempContext;
        if ((kind == 1 && scope.changeAreaCount > 3) || (kind == 2 && scope.changeAreaCount < -3)) {
            return;
        }
        //console.log("kind...", kind, scope.canvas.width, scope.canvas.height);
        if (kind == 1) {
            //放大
            scope.canvas.height += 1 * 50;
            scope.canvas.width += 1 * 50;
            scope.changeAreaCount++;
        } else if (kind == 2) {
            if (scope.canvas.width <= 50 || scope.canvas.height <= 50) {
                return;
            }
            scope.canvas.width -= 1 * 50;
            scope.canvas.height -= 1 * 50;
            scope.changeAreaCount--;

        }
        switch (this.step) {
            case 0:
                height = scope.canvas.height;
                width = scope.canvas.width;
                break;
            case 1:

                height = scope.canvas.width;
                width = scope.canvas.height;
                ctx.rotate(this.degree);
                scope.drawX = 0;
                scope.drawY = -height;
                break;
            case 2:

                height = scope.canvas.height;
                width = scope.canvas.width;
                ctx.rotate(this.degree);
                scope.drawX = -width;
                scope.drawY = -height;
                break;
            case 3:

                height = scope.canvas.width;
                width = scope.canvas.height;
                ctx.rotate(this.degree);
                scope.drawX = -width;
                scope.drawY = 0;
                break;
        }
        //绘制图片
        scope.tempContext.drawImage(scope.image, scope.drawX, scope.drawY, width, height);

    },
    recoverCanvas: function() {
        //恢复原图
        var scope = this;
        var imgUrl = scope.initImgsrc;
        var url = "/pc/HWKHistory/getAnswerOriImg.do?";
        var requeststr = {
            ptid: scope.g_params.ptid,
            uid: scope.g_params.uid,
            newUrl: imgUrl
        };
        var vdata = {
            requeststr: JSON.stringify(requeststr)
        };
        $.get(url, vdata).then(function(pdata) {
            var data = pdata || {};
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }

            if (data.status.code == 0) {

                var curUrl = data.data[0].oriUrl;
                scope.historyImage(curUrl);
                scope.changeAreaCount = 0;
                scope.historyArr.push(curUrl);
                scope.recoverStatus = 1;
            } else {
                alert('获取失败!');
            }
        });


    },
    clearCanvas: function() {
        // canvas清屏
        var scope = this;
        var ctx = scope.tempContext;
        ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
    },
    imageRotate: function(angle) {
        //旋转 .遗留问题;翻转时,图片恢复了原来的大小.不是放大后的大小
        //console.log( "imageRotate...");
        var scope = this;


        var img = this.image;
        var canvas = this.canvas;
        var ctx = this.tempContext;
        var direction = angle || "right";
        //最小与最大旋转方向，图片旋转4次后回到原方向
        var min_step = 0;
        var max_step = 3;

        if (img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        var height = img.height;
        var width = img.width;
        var step = img.getAttribute('step');
        if (step == null) {
            step = min_step;
        }
        step = Number(step);
        if (direction == 'right') {
            step++;
            //旋转到原位置，即超过最大值
            step > max_step && (step = min_step);
        } else if (direction == 'left') {
            step--;
            step < min_step && (step = max_step);
        } else {
            //step--;
            //step < min_step && (step = max_step);
        }
        img.setAttribute('step', step);
        //旋转角度以弧度值为参数
        var degree = step * 90 * Math.PI / 180;
        this.degree = degree;
        this.step = step;
        //console.log("degree...step...", this.degree, this.step);
        //step = 1;
        switch (step) {
            case 0:

                scope.canvas.width = width;
                scope.canvas.height = height;
                scope.drawX = 0;
                scope.drawY = 0;

                ctx.drawImage(img, scope.drawX, scope.drawY);
                break;
            case 1:

                scope.canvas.width = height;
                scope.canvas.height = width;
                ctx.rotate(degree);
                scope.drawX = 0;
                scope.drawY = -height;
                ctx.drawImage(img, scope.drawX, scope.drawY);
                break;
            case 2:

                scope.canvas.width = width;
                scope.canvas.height = height;
                ctx.rotate(degree);
                scope.drawX = -width;
                scope.drawY = -height;
                ctx.drawImage(img, scope.drawX, scope.drawY);
                break;
            case 3:

                scope.canvas.width = height;
                scope.canvas.height = width;
                ctx.rotate(degree);
                scope.drawX = -width;
                scope.drawY = 0;
                ctx.drawImage(img, scope.drawX, scope.drawY);
                break;
        }

    },
    reset_pre: function() {
        //撤销上一步的操作
        var scope = this;
        //console.log("historyArr=", scope.historyArr);
        if (scope.historyArr.length < 1) {
            return;
        }
        if (scope.historyStatus == 0 && scope.historyArr.length > 2) {
            scope.recoverArr.push(scope.historyArr.pop());
            scope.historyStatus = 1;
        }
        //console.log("recoverArr=", scope.recoverArr);
        var imgUrl = scope.historyArr.pop();
        scope.recoverArr.push(imgUrl);
        scope.recoverStatus = 0;
        scope.historyImage(imgUrl);
        if (scope.historyArr.length == 0) {
            scope.historyArr.push(scope.image.src);
            scope.historyStatus = 0;
        }

    },
    recover_next: function() {
        //恢复撤销的操作
        var scope = this;
        if (scope.recoverArr.length < 1) {
            return;
        }
        if (scope.recoverStatus == 0) {
            scope.historyArr.push(scope.recoverArr.pop());
            scope.recoverStatus = 1;
        }
        var imgUrl = scope.recoverArr.pop();
        scope.historyArr.push(imgUrl);
        scope.historyStatus = 0;
        scope.historyImage(imgUrl);
    },
    imageClose: function() {
        //关闭
        this.$el.hide();
        $('body').removeClass('bodybg');
    },
    imageCloseAndSave: function() {
        //关闭和保存
        //console.log("imageCloseAndSave...");

        var scope = this;
        var imgid = scope.g_params.imgid;
        var headerStr = "data:image/png;base64,";
        var url = "/pc/HWKHistory/submitAnswerImg.do?";
        var dataurl_p = scope.canvas.toDataURL("image/png");
        var dataurl = dataurl_p.split(headerStr)[1];
        var imagedata = encodeURIComponent(dataurl);
        var oriUrl = scope.g_params.imgsrc;
        if (oriUrl.indexOf(headerStr) != -1) {
            oriUrl = oriUrl.split(headerStr)[1];
        }
        var requeststr = {
            ptid: scope.g_params.ptid,
            uid: scope.g_params.uid,
            oriUrl: oriUrl,
            image: imagedata

        };
        var vdata = {
            requeststr: JSON.stringify(requeststr)
        };

        //test 用
        // this.$parentModel.hide();
        // $('[data-imgid=' + imgid + ']').attr('src', dataurl_p);
        $.post(url, vdata).then(function(pdata) {
            var data = pdata || {};
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
            //console.log(data.status.code);
            if (data.status.code == 0) {
                if (!data.data) {
                    alert('上传失败!');
                    return;
                }
                var curUrl = data.data[0].newUrl;
                //console.log("img..", scope.$target);
                //scope.$parentModel.find('#answersimgs_' + imgid).attr('src', curUrl);
                scope.$target.attr('src', curUrl);
                scope.g_params.imgsrc = curUrl;
                scope.$el.hide();
                $('body').removeClass('bodybg');
            } else {
                alert('上传失败!');
            }
        });

        //return this;
    }
});

return canvasView;
