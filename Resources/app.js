var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

(function() {
    var oldFile = Ti.Filesystem.getFile("myModule.js");
    Ti.API.info("file", oldFile, oldFile.exists());
    var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "downloaded");
    dir.exists() || dir.createDirectory();
    var newFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "downloaded/myModule.js");
    newFile.exists() || newFile.createFile();
    newFile.write(oldFile.read);
})();

Alloy.createController("index");