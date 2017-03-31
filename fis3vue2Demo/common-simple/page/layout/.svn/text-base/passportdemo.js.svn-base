var passport = require("/widget/passport/passport.js");
var $ = require("jquery");

passport.init({
	appKey: "5469c67b-8ba7-4deb-903a-702207e78f22"
});

passport.on("change:status", function(){
	console.log("status",passport.get("status"));
});

$(".submit-btn").click(function(){

	passport.login({
		//passport: "18510623956",
		//password: "123456",
		//keepCookie: "1"
		passport: $(".passport").val(),
		password: $(".password").val(),
		keepCookie: $(".keepCookie").prop("checked"),
		backUrl: window.location.href
	}).then(function(err, results){
		console.log(err);
		if(err) {
			alert(err.msg);
		}  else {
			alert("登陆成功");
		}
		
	});


});



$(".logout-btn").click(function(){
	passport.logout().then(
		function(err, results){
			console.log(err);
			if(err) {
				alert(err.msg);
			} else {
				alert("退出成功");

			}
		}

	);
});



$(".popup-btn").click(function(){
	passport.showPopup();
});

passport.on("popup.login:success", function(){
	passport.hidePopup();
	window.location.reload();
});