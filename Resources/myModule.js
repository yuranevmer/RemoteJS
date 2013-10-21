var myModule = {};

(function() {
    function open(params) {
        win.open(params);
    }
    var win = Ti.UI.createWindow({
        backgroundColor: "blue"
    });
    win.addEventListener("singletap", function() {
        win.close();
    });
    myModule = {
        open: open
    };
})();

Ti.API.info("module loaded");