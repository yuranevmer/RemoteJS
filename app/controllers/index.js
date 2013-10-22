//include exports = myModule
/*var MyModule =*/ Ti.include('../Documents/downloaded/myModule.js');

Ti.App.tabGroup = $.index;



function doClick(e) {
	
	myModule = new MyModule();
	myModule.open()
//	require('../Documents/ss/file')
    //alert($.label.text);
}

$.index.open();
