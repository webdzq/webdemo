/**
 * @wiki http://wiki.yanxiu.com/pages/viewpage.action?pageId=7213632
 *  /resource/create
 *
 * typeId 类型ID（备课和良师通用。备课：1001：教学设计；1002：课件；1003：习题；1004：素材 ）（放入reserve字段）
 * shareType	0:完全公开 2:社区公开 3:协作组公开 6:个人私有（放入reserve字段）
 * from	1:良师通,2:媒资库,3:课件外部导入,4:备课工具,5:研修网,6:教研网（放入reserve字段）
 *
 *
 *
 *
 * =====================how to use ===================
 * 1, require this file as WebUploader
 * 2, init the globalConfig
 * 3, upload the file plz ref the WebUploader document,
 * 	  [Notice] the diff is: event with name "uploadFileFinish" means that the file
 * 	  		   was upload success, including skip a file which uploaded before
 *
 * 4, mark the file with info
 *
 * 	  var promise = uploader.markFile(file, info);
 * 	  	  //or
 * 	  var promise = file.mark(info);
 * 	  promise.then(function(file, res){
 * 	  	//now the file has a resId
 * 	  });
 */

var utils = require("/widget/base/utils/utils.js");
var WebUploader = require("webuploader");
var File = require("/components/webuploader/file.js");
var Uploader = WebUploader.Uploader;
var $ = require("jquery");
var md5 = utils.md5;

var console = window.console || {log:function(){}};

var userInfo = {
	userId: "123456",
	userName: "yanxiu"
};
var defaultArgs = {
	dtype: "web",
	typeId: 1000,
	shareType: 0,
	from: 0
};

var defaultWebUploaderOptions = $.extend(WebUploader.Uploader.options, {
    swf: __uri("/components/webuploader/webuploader.swf"),
    server: "http://newupload.yanxiu.com/fileUpload",
    resize: false,
    disableGlobalDnd: true,
    runtimeOrder: "html5,flash",
    compress: false,
    prepareNextFile: true,
    chunked: true,
    chunkSize: 5 * 1000 * 1024,
    fileNumLimit: 1,
    fileSingleSizeLimit: 1024 * 1024 * 1024,
    duplicate: true
});

var handlers = {
	/*秒传验证*/
	beforeSendFile: function(file){

        var task = new $.Deferred();
        var start = new Date().getTime();
        var me = this;

        this.owner.md5File(file, 0, 10*1024*1024).progress(function(percentage){
            console.log("计算md5", (percentage * 100).toFixed(2)+"%" );
            me.owner.trigger("md5fileProgress", file, percentage);
        }).then(function(val){
            console.log("计算md5总耗时: "+((new Date().getTime()) - start)/1000);

            file.md5 = md5(val +"|"+ file.type + "|" + file.size);

            me.owner.trigger("md5fileFinish", file);

            $.ajax({
                type: "GET",
                url: me.owner.option('server'),
                data: {
                    status: "md5Check",
                    md5: file.md5,
                    type: file.type,
                    size: file.size,
                    name: file.name,
                    lastModifiedDate: file.lastModifiedDate.getTime(),
                    dtype: defaultArgs.dtype
                },
                cache: false,
                timeout: 1000,
                dataType: "jsonp",
                jsonp: "callback"
            }).then(function(data, textStatus, jqXHR){
                data = data || {};
                file.ifExist = data.ifExist || 0;
                if(!data.uid) {
                    task.reject("NOT_LOGIN");
                    // TODO 未登录
                    return false;
                }

                userInfo.userId = data.uid;
                userInfo.userName = data.uname;

                console.log("md5check result", data.ifExist);
                if(data.ifExist){   //若存在，这返回失败给WebUploader，表明该文件不需要上传
                	console.log("文件存在", data);
                    task.reject("FILE_EXIST");
                    me.owner.skipFile(file);
                    me.owner.finishUploadFile(file);

                }else{
                	console.log("文件不存在，需要上传");

                    //拿到上传文件的唯一名称，用于断点续传
                    file.uniqueFileName = md5(''+userInfo.userId+file.name+file.type+file.lastModifiedDate.getTime()+file.size);
                    task.resolve();

                }

            }, function(jqXHR, textStatus, errorThrown){    //任何形式的验证失败，都触发重新上传
            	console.log("验证失败，需要上传");
                //拿到上传文件的唯一名称，用于断点续传
                file.ifExist = 0;
                // 用户名和用户id服务端处理，异常时不考虑
                file.uniqueFileName = md5(''+userInfo.userId+file.name+file.type+file.lastModifiedDate.getTime()+file.size);
                task.resolve();

            });
			console.log("md5check start", file);
        });
        return $.when(task);
	},
    beforeSend: function(block){
	    //分片验证是否已传过，用于断点续传
	    var task = new $.Deferred();
	    var file = block.file;
	    var me = this;
	    $.ajax({
	        type: "GET",
	        url: me.owner.option('server'),
	        data: {
	            status: "chunkCheck",
	            name: file.uniqueFileName,
	            chunkIndex: block.chunk,
	            size: block.end - block.start,
	            dtype: defaultArgs.dtype

	        },
	        cache: false,
	        timeout: 1000, //todo 超时的话，只能认为该分片未上传过,
	        dataType: "jsonp",
	        jsonp: "callback"

	    }).then(function(data, textStatus, jqXHR){
	        console.log("分片验证结果", data.ifExist);
	        if(data.ifExist){   //若存在，返回失败给WebUploader，表明该分块不需要上传
	        	console.log("分片存在，不需要上传");
	            task.reject();
	        }else{
	        	console.log("分片不存在，需要上传");
	            task.resolve();
	        }
	    }, function(jqXHR, textStatus, errorThrown){    //任何形式的验证失败，都触发重新上传
	        task.resolve();
	    });
	    console.log("分片验证开始", file);
	    return $.when(task);
	},
	afterSendFile: function(file){
        console.log("上传完成", file);
        var me = this;
        var chunksTotal = Math.ceil( file.size/me.owner.option("chunkSize") );
        if(chunksTotal > 1){
            //合并请求
            console.log("大文件，合并请求",file);
            var task = new $.Deferred();
            $.ajax({
                type: "GET",
                url: me.owner.option('server'),
                data: {
                    status: "chunksMerge",
                    name: file.uniqueFileName,
                    chunks: chunksTotal,
                    ext: file.ext,
                    md5: file.md5,
                    dtype: defaultArgs.dtype

                },
                cache: false,
                dataType: "jsonp",
                jsonp: "callback"

            }).then(function(data, textStatus, jqXHR){

                if(data.status ==1 ) {

                    console.log("合并完成", file, data);
                    task.resolve();

                    me.owner.finishUploadFile(file);
                } else {
                    task.reject("MERGE_ERROR");
                }


            }, function(jqXHR, textStatus, errorThrown){
                task.reject("MERGE_ERROR");
            });

            return $.when(task);
        }else{
        	console.log("小文件，无需合并",file);
            me.owner.finishUploadFile(file);

        }
    }
};

WebUploader.Uploader.register({
    "before-send-file": "beforeSendFile",
    "before-send": "beforeSend",
    "after-send-file": "afterSendFile"
}, handlers);


$.extend(File.prototype, {
	/**
	 * mark a file with info, return a promise , resolve with the resId
	 * @param  {Object} info the info to mark the file
	 * @return {Promise}      return a promise
	 */
	mark: function(info){
		var status = this.getStatus();
		var file = this;
		if(status == this.constructor.Status.COMPLETE) {
			// 已经上传完成
			return this._mark(info);
		} else {
			var task = new $.Deferred();
			var statusHandler = function(status){
				if(status == file.constructor.Status.COMPLETE){
					// 上传完成
					file._mark(info).then(function(file, data){
						task.resolve(file, data);
					}).fail(function(res){
						task.resolve(res);
					});
					// off the handler when complate, so use 'once' is not ok
					file.off("statuschange", statusHandler);
				}
			};

			file.on("statuschange", statusHandler);
			return task;
		}
	},
	setResId: function(resId){
		if(resId != this.resId){
			var oldResId = this.resId;
			this.resId = resId;
			this.trigger("resIdChange", this.resId, oldResId);
		}

	},
	getResId: function(){
		return this.resId;
	},
	_mark: function(info){

		var task = new $.Deferred();
		var file = this;
        $.ajax({
            type: "GET",
            url: defaultWebUploaderOptions.server,
            data: {
                status: "upinfo",
                md5: this.md5,
                dtype: defaultArgs.dtype,
                domain: window.location.hostname || "yanxiu.com",
                isexist: file.ifExist,
                filename: file.name,
                reserve: JSON.stringify($.extend({
                        typeId: defaultArgs.typeId || 0,
                        title: file.name,
                        username: userInfo.userName,
                        uid: userInfo.userId,
                        shareType: defaultArgs.shareType || 0,
                        from: defaultArgs.from || 0,
                        source: "pc",
                        description: ""

                    }, info) )

            },
            cache: false,
            dataType: "jsonp",
            jsonp: "callback"

        }).done(function(data){
            if(data && data.code == 0) {
                console.log("resid", file, data.result);
                file.setResId(data.result.resid);
                task.resolve(file, data.result);
            } else{
                console.log("upinfo fail",file, data);
                task.reject("upinfo fail");
            }
        }).fail(function(){
            console.log("upinfo fail", file);
            task.reject("upinfo fail");

        });

        return task.promise();
	}
});


var oldInit = WebUploader.Uploader.prototype._init;
$.extend(WebUploader.Uploader.prototype, {
	_oldInit: oldInit,
	/**
	 * replace the init sth but the default init not done
	 * @param  {[type]} opts [description]
	 * @return {[type]}      [description]
	 */
	_init: function(opts){
		var me = this;
		this._oldInit(opts);
	    this.on("uploadBeforeSend", function(obj, data, header){
        	console.log("before upload send",obj, data, header);
        	var file = obj.file;
            data.lastModifiedDate = data.lastModifiedDate instanceof Date ? data.lastModifiedDate.getTime(): (new Date(data.lastModifiedDate).getTime());
            data.userId = userInfo.userId;
            data.md5 = file.md5;
            data.chunkSize = obj.end - obj.start;

        });
        this.on("uploadAccept", function(obj, data){

            if(data && data.md5 && obj && obj.file && data.md5 == obj.file.md5) {
                return true;
            } else {
                return false;
            }
        });
	},
	markFile: function(fileOrId, info){
		var file = fileOrId;
		if(typeof fileOrId == "string") {
			file = this.getFile(fileOrId);
		}

		return file.mark(info);
	},
	finishUploadFile: function(file){
		// uploadSkip, uploadSuccess 等
		this.trigger("uploadFileFinish", file);
	}
});

/**
 * init the global config for webuploader , default args, options and userinfos
 * @param  {Object?} _defaultArgs                        the default args for apis
 * @param  {Object?} _defaultWebUploaderOptions          the default options for create Webuploader instance
 * @param  {Object?} _userInfo){		$.extend(defaultArgs, _defaultArgs);	 the userinfo
 *
 */
$.extend(WebUploader, {
	initConfig: function(_defaultArgs, _defaultWebUploaderOptions, _userInfo){
		$.extend(defaultArgs, _defaultArgs);
		Uploader.options = $.extend(defaultWebUploaderOptions, _defaultWebUploaderOptions);
		$.extend(userInfo, _userInfo);
	}
});

return WebUploader;
