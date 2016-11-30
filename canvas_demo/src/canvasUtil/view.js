/**
canvas
**/
var $ = require("common:components/jquery/jquery.js");
var Tip = require("/widget/plugins/tip/tip.js");
var AbsView = require("common:widget/base/absview/absview.js");
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
        this.g_params = args;
        this.$el = args.el;
        this.index = args.index;
        this.$parentModel = args.$parents;
        this.$target = args.$target; //当前图片

        this.initAttr(imgsrc);
        //this.bindEvents();
        $(args.el).css({
            //'height': document.body.clientHeight,
            'minHeight': document.body.clientHeight
        });
        $('body').addClass('bodybg');
        this.model.set('ptid', this.g_params.ptid);

        $("html,body").animate({
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
        this.domid = this.cid;
        //this.$el = $('#my_painter');
        //this.$parentModel = this.$el.find(".answer-bigimags"); //图片弹窗model
        this.$button = this.$el.find('.button-group button'); //所有按钮
        this.$input = this.$el.find('.canvas_my_input'); //输入框
        this.drawX = 0; //当前图片绘制起点,旋转的时候会改变
        this.drawY = 0; //当前图片绘制起点,旋转的时候会改变
        this.degree = 0; //旋转的时候会改变
        this.step = 0; //决定当前画布的宽高情况
        this.historyArr = []; //保存每次操作后的图片的url
        this.historyStatus = 0; //0-可撤销；1-不可撤销，如放大之类
        this.recoverArr = []; //保存每次撤销操作后的图片的url，如果做过图片修改，就清空
        this.recoverStatus = 0; //撤销操作后首次点击是0，push是0，pop是1
        this.changeAreaCount = 0; //放大缩小的次数.原图的基础上,最多放大3次.原图的基础上,最多缩小3次.
        this.rectStartX = 0;
        this.rectStartY = 0;
        this.rectEndX = 0;
        this.rectEndY = 0;
        this.rectIndex = 0;
        this.rectWid = 'rect_';
        this.startX = 0;
        this.startY = 0;
        this.retcLeft = "0px";
        this.retcTop = "0px";
        this.retcHeight = "0px";
        this.retcWidth = "0px";
        this.ellipseStartX = 0;
        this.ellipseStartY = 0;
        this.ellipseStartpX = 0;
        this.ellipseStartpY = 0;
        this.nd = 1; //操作的类型 ,默认矩形，主要是鼠标事件
        this.optnd = 0; //功能按钮操作的类型
        this.focusObj = {
            dom: '.fill_rect',
            css: 'cur_rect'
        };
        this.initComponents(imgsrc);
    },
    initComponents: function(imgsrc) {
        this.$button.simpletooltip();
        this.id = "event_canvas" + this.cid;
        //console.log(id);
        this.canvas = document.getElementById(this.id);
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
        //console.log("width..height..",this.canvas.width,this.canvas.height);
        //console.log("offsetLeft...",this.canvas.width,this.canvas.left,this.canvas.offsetLeft,this.canvas.offsetHeight);
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
            scope.tempContext.drawImage(image, scope.drawX, scope.drawY, image.width, image.height);
        };
        // 设置src属性，浏览器会自动加载。
        // 记住必须先绑定事件，才能设置src属性，否则会出同步问题。
        image.src = imgsrc;
        image.id = "my_image_" + Math.random();
        this.image = image;
        this.historyArr.push(image.src);
        //scope.historyStatus = 0;

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
        var $canvas = $('#canvas_my_painter' + this.domid).find('canvas');
        this.$button.unbind();
        $canvas.off();
        //绑定事件
        this.$button.on('click', this.opationHandler.bind(this));
        $canvas.on('click', this.doclick.bind(this));
        this.addEventHandler(this.canvas, "mouseout", this.doMouseOut);
        this.addEventHandler(this.canvas, "mousedown", this.doMouseDown);
        this.addEventHandler(this.canvas, "keydown", this.doKeyDown);
        this.addEventHandler(this.canvas, "mousemove", this.doMouseMove);
        this.addEventHandler(this.canvas, "mouseup", this.doMouseUp);

    },
    focusCtrl: function(curdom, foucscss) {
        var scope = this;
        var obj = scope.focusObj;
        $(obj.dom).removeClass(obj.css);

        scope.focusObj.dom = curdom;
        scope.focusObj.css = foucscss;
        $(obj.dom).addClass(obj.css);
    },
    changeHandler: function() {
        //this.rerender();
        //this.initComponents();
    },
    doclick: function(event) {
        var scope = this;

        if (this.focusObj) {
            scope.nd = $(this.focusObj.dom).data('nd');
        }
        //console.log("doclick..");
    },
    opationHandler: function(event) {
        //确定操作的中央控制中心

        var scope = this;
        var $target = $(event.currentTarget);
        var nd = $target.data('nd');
        var optnd = $target.data('optnd');
        this.$input.hide();
        if (!!nd) {
            scope.nd = nd;
        }
        if (!optnd) {
            optnd = scope.optnd;
        }
        //console.log("scope.nd...optnd..", scope.nd, scope.optnd);
        switch (scope.nd + "") {
            case '1':
                //矩形
                scope.focusCtrl('.fill_rect', 'cur_rect');
                break;
            case '2':
                //椭圆
                scope.focusCtrl('.fill_ellipse', 'cur_ellipse');
                break;
            case '3':
                //画线
                scope.focusCtrl('.fill_line', 'cur_line');
                break;
            case '4':
                //写文本
                scope.focusCtrl('.fill_text', 'cur_text');
                break;

            default:
                break;
        }
        //console.log("optnd...", optnd);
        switch (optnd + "") {
            case '1':
                //撤销上一步操作

                scope.reset_pre();
                break;
            case '2':
                //恢复撤销的操作
                scope.historyStatus = 0;
                scope.recover_next();
                break;
            case '3':
                //还原--最初学生作业的图
                scope.historyStatus = 0;
                scope.recoverCanvas();
                break;
            case '4':
                //关闭
                scope.imageClose();
                break;
            case '5':
                //放大
                scope.historyStatus = 1;
                scope.changeArea(1);
                break;
            case '6':
                //缩小
                scope.historyStatus = 1;
                scope.changeArea(2);
                break;
            case '7':
                //还原放大，缩小，旋转的图片
                //scope.imageRotate('rev');
                scope.revert();
                scope.historyStatus = 1;
                break;
            case '8':
                //左转
                scope.imageRotate('left');
                scope.historyStatus = 1;
                break;
            case '9':
                //右转
                scope.historyStatus = 1;
                scope.imageRotate('right');
                break;
            case '10':
                //保存
                scope.imageCloseAndSave();
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
    doMouseOut: function(event, scope) {
        //console.log('doMouseOut。。。',scope.nd + "");
        if (!scope) {
            return;
        }
        if (scope.nd + "" == '3') {
            scope.started = false;
        }

    },
    doMouseDown: function(event, scope) {
        if (!scope) {
            return;
        }
        var x = event.pageX;
        var y = event.pageY;
        var canvas = event.target;
        var loc = scope.getPointOnCanvas(canvas, x, y);
        scope.recoverArr = []; //有画线操作就清空
        scope.historyStatus = 0;
        switch (scope.nd + "") {
            case "1":
                //矩形
                scope.tempContext.moveTo(loc.x, loc.y);
                scope.started = true;
                scope.rectStartX = loc.x;
                scope.rectStartY = loc.y;

                scope.startX = x;
                scope.startY = y;
                //scope.rectIndex = 0;
                scope.rectIndex++;
                var div = document.createElement("div");
                div.id = scope.rectWid + scope.rectIndex;
                div.className = "rect";
                div.style.left = x + "px";
                div.style.top = y + "px";
                //console.log($('#canvas_my_painter' + scope.domid));
                $('#canvas_my_painter' + scope.domid).append(div);
                $('#' + div.id).on({
                    'mousemove': function(evt) {
                        scope.doMouseMove(evt, scope);
                    },
                    'mouseup': function(evt) {
                        scope.doMouseUp(evt, scope);
                    }
                });
                break;
            case "2":
                //椭圆
                //scope.tempContext.moveTo(loc.x, loc.y);
                scope.started = true;
                scope.ellipseStartX = loc.x;
                scope.ellipseStartY = loc.y;
                scope.ellipseStartpX = x;
                scope.ellipseStartyY = y;
                break;
            case "3":
                //画线
                scope.tempContext.moveTo(loc.x, loc.y);
                scope.started = true;
                break;
            case "4":
                //写文本
                scope.writeTextOption(x, y);
                break;
            default:
                break;
        }


    },
    doMouseMove: function(event, scope) {
        if (!scope) {
            return;
        }
        if (!scope.started) {
            return;
        }
        var x = event.pageX;
        var y = event.pageY;
        var canvas = event.target;
        var tcx = scope.tempContext;

        var loc = scope.getPointOnCanvas(canvas, x, y);
        switch (scope.nd + "") {
            case "1":
                //矩形
                scope.rectEndX = loc.x;
                scope.rectEndY = loc.Y;

                scope.retcLeft = (scope.startX - x > 0 ? x : scope.startX) + "px";
                scope.retcTop = (scope.startY - y > 0 ? y : scope.startY) + "px";
                scope.retcHeight = Math.abs(scope.startY - y) + "px";
                scope.retcWidth = Math.abs(scope.startX - x) + "px";

                scope.getId(scope.rectWid + scope.rectIndex).style.left = scope.retcLeft;
                scope.getId(scope.rectWid + scope.rectIndex).style.top = scope.retcTop;
                scope.getId(scope.rectWid + scope.rectIndex).style.width = scope.retcWidth;
                scope.getId(scope.rectWid + scope.rectIndex).style.height = scope.retcHeight;
                break;
            case "2":
                //椭圆 有问题，没有固定的起点
                //var x=300,y=300,a=200,b=100,du=360;
                $('.abellipse').remove();
                $('#canvas_my_painter' + scope.domid).off();
                var a = (scope.ellipseStartX - loc.x) * 1.2;
                var b = (scope.ellipseStartY - loc.y) * 1.2;

                var width = scope.canvas.width;
                var height = scope.canvas.height;

                for (var i = 0; i < 360; i++) {
                    var divs = document.createElement("div"),
                        hudu = (Math.PI / 180) * i,
                        x1 = a * Math.sin(hudu) + x,
                        y1 = y - (b * Math.cos(hudu));
                    //console.log(a,b,x1,y1);
                    //console.log((loc.x + a * Math.sin(hudu)) < width && (loc.y + (b * Math.cos(hudu))) < height);
                    divs.className = "abellipse";
                    var lx = (loc.x + (a * Math.sin(hudu))); //x坐标边界
                    var ly = (loc.y - (b * Math.cos(hudu))); //y轴边界

                    if (lx < 0 || lx > width) {
                        //边界就是透明的背景
                        //console.log("lx...", a * Math.sin(hudu), loc.x, width, x1);
                        divs.className = "abellipse_1";
                    }
                    if (ly < 0 || ly > height) {
                        //边界就是透明的背景
                        //console.log("ly...", b * Math.cos(hudu), loc.y, height, y1);
                        divs.className = "abellipse_1";
                    }

                    divs.style = "left:" + x1 + "px;" + "top:" + y1 + "px;";

                    $('#canvas_my_painter' + scope.domid).append(divs);
                }
                $('#canvas_my_painter' + scope.domid).on({
                    'mousemove': function(evt) {
                        scope.doMouseMove(evt, scope);
                    },
                    'mouseup': function(evt) {
                        scope.doMouseUp(evt, scope);
                    }
                });
                break;
            case "3":
                //铅笔
                tcx.lineTo(loc.x, loc.y);
                tcx.strokeStyle = 'rgba(255,0,0,1)';
                tcx.stroke();
                break;
            case "4":
                break;
            default:
                break;
        }
    },
    doMouseUp: function(event, scope) {
        var x = event.pageX;
        var y = event.pageY;
        var loc = scope.getPointOnCanvas(scope.canvas, x, y);

        if (scope.started) {
            if (scope.nd + "" == '1') {
                //绘制矩形
                scope.drawRect(loc);
                //移除动态添加的dom

                $('.rect').off();
                $('.rect').remove();

            } else if (scope.nd + "" == '2') {
                //绘制椭圆
                $('.abellipse').remove();
                $('#canvas_my_painter' + scope.domid).off();

                var width = (loc.x - scope.ellipseStartX);
                var height = (loc.y - scope.ellipseStartY);
                scope.drawEllipse(scope.ellipseStartX + width, scope.ellipseStartY + height, width, height);
            }
            //scope.doMouseMove(event, scope);

            scope.started = false;
            var imgUrl = scope.canvas.toDataURL("image/png");
            scope.historyArr.push(imgUrl);
            //scope.historyStatus = 0;
            scope.historyImage(imgUrl);
        }
    },
    drawRect: function(loc) {
        //绘制矩形
        var scope = this;
        var tcxt = scope.tempContext;
        tcxt.lineTo(scope.rectStartX, loc.y);
        tcxt.lineTo(loc.x, loc.y);
        tcxt.lineTo(loc.x, scope.rectStartY);
        tcxt.lineTo(scope.rectStartX, scope.rectStartY);
        tcxt.strokeStyle = 'rgba(255,0,0,1)';
        tcxt.lineWidth = 2; /*边框的宽度*/
        tcxt.stroke();
    },
    drawEllipse: function(x, y, width, height) {
        //绘制椭圆  ---正方向绘制。反方向有问题
        var scope = this;
        //console.log("drawEllipse...",scope);
        var tcxt = scope.tempContext;
        var k = (width / 0.3) / 2, //贝塞尔控制点x=(椭圆宽度/0.75)/2
            w = width * 5,
            h = height * 1.2;
        tcxt.moveTo(x, y - h);
        tcxt.bezierCurveTo(x + k, y - h, x + k, y + h, x, y + h);
        tcxt.bezierCurveTo(x - k, y + h, x - k, y - h, x, y - h);
        tcxt.strokeStyle = 'rgba(255,0,0,1)';
        tcxt.lineWidth = 2; /*边框的宽度*/
        tcxt.stroke();
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
            scope.tempContext.font = "20px Times New Roman";
            scope.tempContext.fillStyle = "red";
            var loc = scope.getPointOnCanvas(scope.canvas, posObj.x, posObj.y);
            //console.log('fillInputText...', posObj.x, posObj.y, loc.x, loc.y);
            scope.tempContext.fillText(val, loc.x, loc.y + 10);
            this.$input.hide();

            var imgUrl = scope.canvas.toDataURL("image/png");
            scope.historyArr.push(imgUrl);
            //scope.historyStatus = 0;
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
        //撤销上一步的操作：矩形，圆形，铅笔，文本，清除。
        var scope = this;
        var imgUrl = "";
        var len = 0;
        //console.log("reset_pre...scope.historyStatus..=", scope.historyStatus)
        if (scope.historyStatus == 1) {
            return;
        }
        if (scope.historyArr.length < 2) {
            return;
        } else {
            scope.recoverArr.push(scope.historyArr.pop());
            //scope.historyStatus = 1;
            len = scope.historyArr.length;
            imgUrl = scope.historyArr[len - 1];
        }
        scope.historyImage(imgUrl);
    },
    recover_next: function() {
        //恢复撤销的操作：只针对撤销操作。
        var scope = this;
        if (scope.recoverArr.length < 1) {
            return;
        }
        var imgUrl = scope.recoverArr.pop();
        scope.historyArr.push(imgUrl);
        //scope.historyStatus = 0;
        scope.historyImage(imgUrl);
    },
    imageClose: function() {
        //关闭
        this.$el.hide();
        $('body').removeClass('bodybg');
    },
    getId: function(id) {
        return document.getElementById(id);
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
                scope.$target.attr('src', curUrl);
                scope.g_params.imgsrc = curUrl;
                scope.trigger('change:image', {
                    index: scope.index,
                    url: curUrl
                });

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
