function doClick(e) {
	
	
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + "ss/"+"file.js");
	var contents = file.read();
	Ti.API.info('file',contents);
	
<<<<<<< HEAD
	Ti.include('../Documents/ss/file.js')
	Ti.API.info('module', MyModule);
	MyModule.open()
=======
	Ti.include('../Documents/downloaded/myModule.js');
	
	myModule.open()
>>>>>>> 83b75ae7b8a56e74fae6f064f00276260a8dfb98
//	require('../Documents/ss/file')
    //alert($.label.text);
}

$.index.open();
