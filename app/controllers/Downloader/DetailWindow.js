var args = arguments[0] || {};

args = {
	url : "",
	filename: "myModule"
}

/*
$.root.addEventListener("singletap", function(){
	$.root.close({animated:true});
})
*/

function download(){
	var Data = require("Data");
	Data.downloadModule("http://yura-nevmer.pp.ua/uploads/myModule.zip");
	
	
}

function start(e) {
	/*var MyModule =*/ Ti.include('../Documents/downloadedItems/' + args.filename + "/myModule.js");
	myModule = new MyModule();
	myModule.open();
	
}
