

var UE = require("/widget/ueditor/ueditor.js");
require("/widget/ueditor/kityformula-plugin/kityformula-plugin.js");
UE.initConfig({
	UEDITOR_VIEW_HOME_URL: "/common/widget/ueditor",
	serverUrl: "/static/js/public/ueditor/jsp/controller.jsp",
	actionUrlMap:{
        'uploadimage': '/pc/common/uploadImg.do',
        'uploadscrawl':  '/pc/common/base64convert.do'
    },
	toolbars: [['bold', 'italic', 'underline', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload','insertimage', 'inserttable','kityformula']]
});


UE.getEditor("ueditor", {
	autoClearinitialContent:true,
    wordCount:false,
    elementPathEnabled:false,
    initialFrameWidth:728,
    initialFrameHeight:258
});