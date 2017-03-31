var win = window;
var doc = win.document;
var input = doc.createElement ("input");

var ie = (function (){
//"!win.ActiveXObject" is evaluated to true in IE11
    if (win.ActiveXObject === undefined) return null;
    if (!win.XMLHttpRequest) return 6;
    if (!doc.querySelector) return 7;
    if (!doc.addEventListener) return 8;
    if (!win.atob) return 9;
//"!doc.body.dataset" is faster but the body is null when the DOM is not
//ready. Anyway, an input tag needs to be created to check if IE is being
//emulated
    if (!input.dataset) return 10;
    return 11;
})();

if(ie){
    document.body.className = "ie-"+ie;
}else{
    document.body.className = "not-ie";
}
