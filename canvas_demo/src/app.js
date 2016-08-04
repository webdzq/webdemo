/**
 *
 * @title:canvas 项目
 * @author:doing
 */
require("./style/index.less");
//var $=require("jquery");
var d3 = require('d3');
function CanvasDemo() {
    this.canvas = null;
    this.tempContext = null; // global variable 2d context
    this.started = false;
    this.nd = 1;//操作的类型
    this.$el = $('#my_painter');
    this.$button = $('.button-group button');//所有按钮
    this.$input = $('#my_input');//输入框
    this.drawX = 0;//当前图片绘制起点,旋转的时候会改变
    this.drawY = 0;//当前图片绘制起点,旋转的时候会改变
    this.degree = 0;//旋转的时候会改变
    this.step = 0;//决定当前画布的宽高情况
    this.historyArr = [];//保存每次操作后的图片的url
    this.historyStatus = 0;//首次撤销是0;historyArr的push过程中始终是0
    this.recoverArr = [];//保存每次撤销操作后的图片的url
    this.recoverStatus = 0;//撤销操作后首次点击是0
    this.changeAreaCount = 0;//放大缩小的次数.原图的基础上,最多放大3次.原图的基础上,最多缩小3次.
}
CanvasDemo.prototype = {
    constructor: CanvasDemo,
    init: function () {
        this.canvas = document.getElementById("event_canvas");
        if (!this.canvas.getContext) {
            console.log("Canvas not supported. Please install a HTML5 compatible browser.");
            return;
        }
        this.canvas.width = this.canvas.parentNode.clientWidth - 100;
        this.canvas.height = this.canvas.parentNode.clientHeight;
        this.tempContext = this.canvas.getContext("2d");
        this.tempContext.fillStyle = "blue";
        this.canvas.focus();
        this.events();
        //this.initD3svg();//d3示例
        this.initImage();
    },
    initImage: function () {
        //画一张图片在canvas上
        var image = this.image;
        var scope = this;
        if (!image) {
            image = new Image();
        }
        image.onload = function () {
            //将坐标中心作为起启点
            scope.canvas.width = image.width;
            scope.canvas.height = image.height;
            scope.drawX = 0;
            scope.drawY = 0;
            scope.tempContext.drawImage(image, scope.drawX, scope.drawY, image.width, image.height);
        };
        // 设置src属性，浏览器会自动加载。
        // 记住必须先绑定事件，才能设置src属性，否则会出同步问题。
        image.src = './img/ff.jpg';
        image.id = "my_image";
        this.image = image;
        this.historyArr.push(image.src);
        scope.historyStatus = 0;
    },
    historyImage: function (imgUrl) {
        //更新当前canvas的图片this.image
        var scope = this;
        scope.image.src = imgUrl;
    },
    addEventHandler: function (oTarget, sEventType, fnHandler) {
        //绑定事件工具函数
        var scope = this;
        if (!oTarget) {
            return;
        }
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, function (event) {
                fnHandler(event, scope);
            }, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, function (event) {
                fnHandler(event, scope);
            });
        } else {
            oTarget["on" + sEventType] = function (event) {
                fnHandler(event, scope);
            };
        }
    },
    events: function () {
        //绑定事件
        this.$button.on('click', this.opationHandler.bind(this));
        this.addEventHandler(this.canvas, "mousedown", this.doMouseDown);
        this.addEventHandler(this.canvas, "keydown", this.doKeyDown);
        this.addEventHandler(this.canvas, "mousemove", this.doMouseMove);
        this.addEventHandler(this.canvas, "mouseup", this.doMouseUp);

    },
    opationHandler: function (event) {
        //确定操作的中央控制中心
        var scope = this;
        var $target = $(event.currentTarget);
        var nd = $target.data('nd');
        this.nd = nd;
        this.$input.hide();
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
                //还原
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
                //翻转
                scope.imageRotate('rev');
                break;
            case '9':
                //左转
                scope.imageRotate('left');
                break;
            case '10':
                //右转
                scope.imageRotate('right');
            case '11':
                //关闭保存
                scope.imageCloseAndSave();
                break;
            default:
                break;
        }
    },
    doMouseDown: function (event, scope) {
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
    doMouseMove: function (event, scope) {
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
    doMouseUp: function (event, scope) {
        if (scope.started) {
            scope.doMouseMove(event, scope);
            scope.started = false;
            var imgUrl = scope.canvas.toDataURL("image/png");
            scope.historyArr.push(imgUrl);
            scope.historyStatus = 0;
            scope.historyImage(imgUrl);
        }
    },
    getPointOnCanvas: function (canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    },
    doKeyDown: function (e, scope) {
        //console.log("doKeyDown...");
        //var scope = this;
        //var keyID = e.keyCode ? e.keyCode : e.which;
        //if (keyID === 38 || keyID === 87) { // up arrow and W
        //    scope.clearCanvas();
        //    scope.y = scope.y - 10;
        //    scope.tempContext.fillRect(scope.x, scope.y, 80, 40);
        //    e.preventDefault();
        //}
        //if (keyID === 39 || keyID === 68) { // right arrow and D
        //    scope.clearCanvas();
        //    scope.x = scope.x + 10;
        //    scope.tempContext.fillRect(scope.x, scope.y, 80, 40);
        //    e.preventDefault();
        //}
        //if (keyID === 40 || keyID === 83) { // down arrow and S
        //    scope.clearCanvas();
        //    scope.y = scope.y + 10;
        //    scope.tempContext.fillRect(scope.x, scope.y, 80, 40);
        //    e.preventDefault();
        //}
        //if (keyID === 37 || keyID === 65) { // left arrow and A
        //    scope.clearCanvas();
        //    scope.x = scope.x - 10;
        //    scope.tempContext.fillRect(scope.x, scope.y, 80, 40);
        //    e.preventDefault();
        //}
    },
    writeTextOption: function (x, y) {
        //单击显示输入框
        var scope = this;
        this.$input.focus();
        this.$input.unbind();
        this.$input.val('');
        this.$input.css({
            'left': x,
            'top': y
        });
        this.$input.show();
        this.$input.keydown(function (event) {
            if (event.keyCode == 13) {
                scope.fillInputText({
                    'x': x,
                    'y': y
                });
            }
        });

    },
    fillInputText: function (posObj) {
        //将输入框的文本绘制到canvas上
        //console.log('fillInputText...');
        var scope = this;
        var val = this.$input.val();
        if (!!val) {
            scope.tempContext.shadowOffsetX = 2;
            scope.tempContext.shadowOffsetY = 2;
            scope.tempContext.shadowBlur = 2;
            scope.tempContext.shadowColor = "rgba(0, 0, 0, 0.5)";

            scope.tempContext.font = "20px Times New Roman";
            scope.tempContext.fillStyle = "red";
            scope.tempContext.fillText(val, posObj.x, posObj.y);
            this.$input.hide();

            var imgUrl = scope.canvas.toDataURL("image/png");
            scope.historyArr.push(imgUrl);
            scope.historyStatus = 0;
            scope.historyImage(imgUrl);
        }
    },
    changeArea: function (v_kind) {
        //放大,缩小
        var scope = this;
        var kind = v_kind || 1;//1,放大,2,缩小
        var width = 0;
        var height = 0;
        if (kind == 1 && scope.changeAreaCount >= 3 || kind == 2 && scope.changeAreaCount <= -3) {
            return;
        }
        scope.canvas.width = this.image.width;
        scope.canvas.height = this.image.height;
        if (kind == 1) {
            //放大
            scope.canvas.width += 50;
            scope.canvas.height += 50;
            scope.changeAreaCount++;
        } else {
            scope.canvas.width -= 50;
            scope.canvas.height -= 50;
            scope.changeAreaCount--;
        }
        height = scope.canvas.height;
        width = scope.canvas.width;
        scope.tempContext.drawImage(this.image, scope.drawX, scope.drawY, width, height);
        var imgUrl = scope.canvas.toDataURL("image/png");
        scope.historyArr.push(imgUrl);
        scope.historyStatus = 0;
        scope.historyImage(imgUrl);
    },
    recoverCanvas: function () {
        //恢复原图
        var scope = this;
        var imgUrl = './img/ff.jpg';
        scope.historyArr.push(imgUrl);
        scope.historyStatus = 0;
        scope.historyImage(imgUrl);

    },
    clearCanvas: function () {
        // canvas清屏
        var scope = this;
        var ctx = scope.tempContext;
        ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
    },
    imageRotate: function (angle) {
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

        if (img == null)return;
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
        } else if (direction == 'rev') {
            //翻转
            step += 2;
            step > max_step && (step = min_step);
        } else {
            step--;
            step < min_step && (step = max_step);
        }
        img.setAttribute('step', step);
        //旋转角度以弧度值为参数
        var degree = step * 90 * Math.PI / 180;
        this.degree = degree;
        this.step = step;
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
        var imgUrl = scope.canvas.toDataURL("image/png");
        scope.historyArr.push(imgUrl);
        scope.historyStatus = 0;
        scope.historyImage(imgUrl);
    },
    initD3svg: function () {

        var demo1 = function () {
            var p = d3.select("#d3_demo").selectAll("p").text("www.ourd3js.com");
        };
        var demo2 = function () {
            var str = "China";
            var body = d3.select("body");
            var p = body.selectAll("p");
            p.datum(str);
            p.text(function (d, i) {
                return "第 " + i + " 个元素绑定的数据是 " + d;
            });
        };
        var demo3 = function () {
            var dataset = ["I like dogs", "I like cats", "I like snakes"];
            var body = d3.select("body");
            var p = body.selectAll("p");
            p.data(dataset)
                .text(function (d, i) {
                    return d;
                });
        };
        var demo4 = function () {
            var width = 300;  //画布的宽度
            var height = 300;   //画布的高度

            var svg = d3.select("body")     //选择文档中的body元素
                .append("svg")          //添加一个svg元素
                .attr("width", width)       //设定宽度
                .attr("height", height);    //设定高度

            var dataset = [250, 210, 170, 130, 90];  //数据（表示矩形的宽度)
            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x", 20)
                .attr("y", function (d, i) {
                    return i * rectHeight;
                })
                .attr("width", function (d) {
                    return d;
                })
                .attr("height", rectHeight - 2)
                .attr("fill", "steelblue");
        };
        var demo5 = function () {
            var width = 300;  //画布的宽度
            var height = 300;   //画布的高度

            var svg = d3.select("body")     //选择文档中的body元素
                .append("svg")          //添加一个svg元素
                .attr("width", width)       //设定宽度
                .attr("height", height)
                .style("background-color", '#ccc');    //设定高度


            var rect = svg.append("rect");

            rect.attr("x", 20)
                .attr("y", function (d, i) {
                    return i * height;
                })
                .attr("width", function (d) {
                    return 100;
                })
                .attr("height", 100)
                .attr("fill", "steelblue");

            svg.on("click", function () {
                //在这里添加交互内容
                var evt = d3.event;
                //console.log(evt.pageX, evt.pageY);
                //svg.remove('input');

            });


        };
        var demo6 = function () {
            //d3 创建canvas
            d3.select("#d3_demo").append('canvas')
                .attr("id", 'd3_canvas')
                .attr("width", 300)       //设定宽度
                .attr("height", 300)
                .style("background-color", '#ccc');    //设定高度
            var canvas = document.getElementById("d3_canvas");
            //console.log(canvas.getContext);
        };
        // demo6();
    },
    reset_pre: function () {
        //撤销上一步的操作
        var scope = this;
        if (scope.historyArr.length < 2) {
            return;
        }
        if (scope.historyStatus == 0) {
            scope.recoverArr.push(scope.historyArr.pop());
            scope.historyStatus = 1;
        }
        var imgUrl = scope.historyArr.pop();
        scope.recoverArr.push(imgUrl);
        scope.recoverStatus = 0;
        scope.historyImage(imgUrl);
        if (scope.historyArr.length == 0) {
            scope.historyArr.push(scope.image.src);
            scope.historyStatus = 0;
        }

    },
    recover_next: function () {
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
    imageCloseAndSave: function () {
        //关闭和保存
        var scope = this;
        var headerStr = "data:image/png;base64,";
        var url = "http://localhost:8090/";
        var dataurl = scope.canvas.toDataURL("image/png");
        dataurl = dataurl.split(headerStr)[1];
        var imagedata = encodeURIComponent(dataurl);
        var data = {
            imagename: "myImage.png",
            imagedata: imagedata
        };
        $.ajax({
            url: url,
            data: data,
            type: "POST",
            // 期待的返回值类型
            dataType: "json",
            complete: function (xhr, result) {
                //console.log(xhr.responseText);
                var $tip2 = $("#tip2");
                if (!xhr) {
                    $tip2.text('网络连接失败!');
                    return false;
                }

                var text = xhr.responseText;
                if (!text) {
                    $tip2.text('网络错误!');
                    return false;
                }

                //var json = eval("(" + text + ")");
                var json = text;
                if (!json) {
                    $tip2.text('解析错误!');
                    return false;
                } else {
                    $tip2.text(json.message);
                }
            }
        });

    }
};

//实例化
var canvasDemo = new CanvasDemo();
canvasDemo.init();


