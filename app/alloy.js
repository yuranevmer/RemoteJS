// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
<<<<<<< HEAD
=======


(function copyFile(){
	var oldFile = Ti.Filesystem.getFile("myModule.js");
	Ti.API.info('file',oldFile, oldFile.exists());
	
	//mkdir
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "downloaded");
	if (!dir.exists()) {
		dir.createDirectory();
	}
	
	//mkFile 
	
	var newFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "downloaded/" + "myModule.js")
	if (!newFile.exists()) {
		newFile.createFile();
	}
	newFile.write(oldFile.read);
	
	
})();
>>>>>>> 83b75ae7b8a56e74fae6f064f00276260a8dfb98
