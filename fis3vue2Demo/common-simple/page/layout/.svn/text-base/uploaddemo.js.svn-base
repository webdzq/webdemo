var WebUploader = require("/widget/uploader/uploader.js");
var $ = require("jquery");
var $con = $("#files-container");

$('<div id="pick-a-file">选择文件</div>').appendTo(document.body);

WebUploader.initConfig({
	from: 7,
	shareType: 2
});
var uploader = WebUploader.Uploader.create({
	pick: "#pick-a-file",
	auto: true,
	fileNumLimit: 3,
	runtimeOrder: 'flash'
});


uploader.on("fileQueued", function(file){
	var fileView = $('<div class="file" data-id="'+file.id+'">'+file.name+' <span class="progress"></span> <span class="res">未取得resid</span><button class="mark">打标签</button><button class="del">X</button></div>');
	$con.append(fileView);
	
});
uploader.on("uploadProgress", function(file, percent){
	var fileView = $con.find('[data-id="'+file.id+'"]');
	
	fileView.find(".progress").text( percent.toFixed(2) * 100 );
});	

uploader.on("md5fileProgress", function(file, percent){
	var fileView = $con.find('[data-id="'+file.id+'"]');
	
	fileView.find(".progress").text("md5:"+(percent.toFixed(2) * 100) );
});

uploader.on("uploadFileFinish", function(file){
	var fileView = $con.find('[data-id="'+file.id+'"]');
	fileView.append("已完成");
});
uploader.on("uploadFinished", function(file){
	var files = uploader.getFiles();
	var status = uploader.getStats();
	// do sth with the file or stats
	alert("已选择文件都传完了");
});
uploader.on("uploadError", function(file, res){
	if(res == "FILE_EXIST"){
		//do nothing
		// 注意这个，其实不是失败了，而是文件存在的秒传
	} else {
		alert("uploadError "+res);
	}
});
uploader.on("fileDequeued", function(file){
	var fileView = $con.find('[data-id="'+file.id+'"]');
	fileView.remove();
});

uploader.on("reset", function(){
	$con.empty();
});
uploader.on("error", function(res){
	if(res == "Q_TYPE_DENIED"){
		var file = arguments[1];
		alert(file.name +("文件类型不符或者是空文件"));

	} else {
		var file = arguments[2];
		var max = arguments[1];
		alert(file.name + "最多只能选择"+max+"个，已超出");
	}
});

$con.delegate(".del", "click", function(e){
	var fileView = $(e.target).parent();
	var fileid = fileView.data("id");
	uploader.removeFile(fileid);
});

$con.delegate(".mark", "click", function(e){
	var fileView = $(e.target).parent();
	var fileid = fileView.data("id");
	uploader.markFile(fileid, {
		from: 1,
		testdata: "anydata"
	}).then(function(file, res){
		console.log("====", file, res);
		fileView.find(".res").text(file.resId);
	}).fail(function(){
		fileView.find(".res").text("打标签失败了");

	});
});

$("#reset-uploader").click(function(){
	uploader.reset();
});


// this code is just for test all event names uploader triggers
uploader.on("all", function(){
	console.log("all",arguments);
});

window.uploader = uploader;
