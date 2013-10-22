var myModule = {};

	function MyModule() {
		//define some vars
		var self = this;
		
		
		var win = Ti.UI.createWindow({
			backgroundColor: "blue"
		});
		win.addEventListener('singletap', function(){
			win.close();
		});
		//sdfas
		
		
		function open(params){
			Ti.App.tabGroup.activeTab.open(win, {animated:true});
			//win.open(params);
		}
		
		this.open = open;
		
		
		
		
		
		//exports
		myModule = {
			open : open
		};
		
		return self;
	};

Ti.API.info('module loaded');
