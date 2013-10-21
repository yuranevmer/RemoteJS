function doClick(e) {
	
	
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + "ss/"+"file.js");
	var contents = file.read();
	Ti.API.info('file',contents);
	
	Ti.include('../Documents/ss/file.js')
	Ti.API.info('module', MyModule);
	MyModule.open()
//	require('../Documents/ss/file')
    //alert($.label.text);
}

$.index.open();
