var myModule = {};

(function init() {
	//define some vars
	
	var win = Ti.UI.createWindow({
		backgroundColor: "blue"
	});
	win.addEventListener('singletap', function(){
		win.close();
	});
	//sdfas
	
	
	function open(params){
		win.open(params);
	}
	
	
	
	
	
	
	
	//exports
	myModule = {
		open : open
	};
})();
Ti.API.info('module loaded');
