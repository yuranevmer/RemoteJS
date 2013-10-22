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



function t() {
    var t = Ti.UI.createListView();
} 


Alloy.CFG.AdvancedListView = OS_ANDROID ? Ti.UI : require("ti.advanced.list.view");

if (OS_ANDROID&&0) {
    Alloy.CFG.AdvancedListView = require("ti.advanced.list.view");
    var ListView = Alloy.CFG.AdvancedListView.ListView;
    var Ti = Titanium;
    function createListView(scopeVars, options) {
        Ti.API.info('CREATEQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ')
        if (options !== void 0) {
            var templates = options.templates;
            if (templates !== void 0) {
                for (var binding in templates) {
                    var currentTemplate = templates[binding];
                    //process template
                    processTemplate(currentTemplate);
                    //process child templates
                    processChildTemplates(currentTemplate);
                }
            }
        }
        var listView = new ListView(options);
        
        return listView;
    }
    
    //Create ListItemProxy, add events, then store it in 'tiProxy' property
    function processTemplate(properties) {
        var cellProxy = Alloy.CFG.AdvancedListView.createListItem();
        properties.tiProxy = cellProxy;
        var events = properties.events;
        addEventListeners(events, cellProxy);
    }

    //Recursive function that process childTemplates and append corresponding proxies to
    //property 'tiProxy'. I.e: type: "Titanium.UI.Label" -> tiProxy: LabelProxy object
    function processChildTemplates(properties) {
        if (!properties.hasOwnProperty('childTemplates')) return;
        
        var childProperties = properties.childTemplates;
        if (childProperties === void 0 || childProperties === null) return;
        
        for (var i = 0; i < childProperties.length; i++) {
            var child = childProperties[i];
            var proxyType = child.type;
            if (proxyType !== void 0) {
                var creationProperties = child.properties;
                var creationFunction = lookup(proxyType);
                var childProxy;
                //create the proxy
                if (creationProperties !== void 0) {
                    childProxy = creationFunction(creationProperties);
                } else {
                    childProxy = creationFunction();
                }
                //add event listeners
                var events = child.events;
                addEventListeners(events, childProxy);
                //append proxy to tiProxy property
                child.tiProxy = childProxy;
            }

            processChildTemplates(child);
            
        }
        
        
    }
    
    //add event listeners
    function addEventListeners(events, proxy) {
        if (events !== void 0) {
            for (var eventName in events) {
                proxy.addEventListener(eventName, events[eventName]);
            }
        }
    }
    
    //convert name of UI elements into a constructor function.
    //I.e: lookup("Titanium.UI.Label") returns Titanium.UI.createLabel function
    function lookup(name) {
        Ti.API.info(name);
        var lastDotIndex = name.lastIndexOf('.');
        var proxy = eval(name.substring(0, lastDotIndex));
        if (typeof(proxy) == undefined) return;

        var proxyName = name.slice(lastDotIndex + 1);
        return proxy['create' + proxyName];
    }

    //overwrite list view constructor function with our own.
    Alloy.CFG.AdvancedListView.createListView = createListView;

}

Alloy.CFG.baseItemHeight = 150;
Alloy.CFG.baseItemWidth = 150;

Alloy.CFG.templates = {
	baseTemplate : require('templates/baseTemplate')
};
