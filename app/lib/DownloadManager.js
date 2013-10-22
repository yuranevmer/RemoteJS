function DownloadManager() {
	var callee = arguments.callee;
	if (callee.instance) {
		return callee.instance;
	}
	var self = this;
	self.queue = [];


	self.startDownload = function(url, onProgress, onComplete, fileName) {
		
		if (self.getDownload(url)){
			return self.getDownload(url);
		}
		
		var newDownload = new Download();
		self.queue.push(newDownload);
		newDownload.start(url, onProgress, onComplete, fileName);
				
		return newDownload;
	}
	
	Ti.App.addEventListener("complete_download", function(e) {
		Ti.API.info('COMPLETE DOWNLOAD', e.url);
		self.queue.splice(self.queue.indexOf(self.getDownload(e.url)),1);
	});
	
	self.stopDownload = function(url){
		var download = self.getDownload(url);
		if (download) {
			download.stop();
			self.queue.splice(self.queue.indexOf(download),1);		
		}
	}
	
	self.getDownload = function(url) {
		for(var i=0,j=self.queue.length; i<j; i++){
		  	if(self.queue[i].url == url) {
		  		return self.queue[i];
		  	}
		} 
		return false;
	}

	callee.instance = self;
}

function Download() {
	this.start = function(url, onProgress, oncomplete, fileName) {
		Ti.API.info('filename', fileName)
		this.url = url;
		this.xhr = Titanium.Network.createHTTPClient({
			onload : function() {
				/*
				var lastIndex = url.lastIndexOf("/");
				var fileName = url.substring(lastIndex+1);
				var directoryName = url.substring(url.lastIndexOf("/",lastIndex-1)+1, lastIndex);
				var directory = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, directoryName);
				directory.createDirectory();
				*/
				var f = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, fileName);
				f.write(this.responseData);
				
				if (oncomplete) {
					oncomplete();
				}
				Ti.App.fireEvent("complete_download", {
					filepath : f.nativePath,
					url: url,
				});
			},
			onerror:function(e) {
				alert("NO INTERNET CONNECTION");
			},
			timeout : 10000
		});
		if (onProgress) {
			this.xhr.ondatastream = onProgress;
		}
		this.xhr.open('GET', url);
		this.xhr.send();
		Ti.API.info('START NEW' + url);
	}
	this.stop = function() {
		this.xhr.abort();
	}
	this.clear = function(){
		this.xhr = null;
	}
}

module.exports.sharedDownloadManager = function() {
	return new DownloadManager();
}