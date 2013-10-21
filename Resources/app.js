var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

<<<<<<< HEAD
=======
(function() {
    var oldFile = Ti.Filesystem.getFile("myModule.js");
    Ti.API.info("file", oldFile, oldFile.exists());
    var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "downloaded");
    dir.exists() || dir.createDirectory();
    var newFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "downloaded/myModule.js");
    newFile.exists() || newFile.createFile();
    newFile.write(oldFile.read);
})();

>>>>>>> 83b75ae7b8a56e74fae6f064f00276260a8dfb98
Alloy.createController("index");