

function downloadModule(url) {
	downloadTourZIP(url, function(success) {
		Ti.API.info('!!!!!')
	}, true);
}

function cancelDownloadingModule(url) {
	Alloy.Globals.DownloadManager.stopDownload(url);
}


function downloadTourZIP(url, callback, autoextracting) {
	var filename = "myModule";
	var DownloadManager = require("DownloadManager").sharedDownloadManager();
	DownloadManager.startDownload(url, function(e) {
		//progress
		Ti.API.trace('e=', e.progress);
		if (e.progress <= 1) {
			Ti.API.info('progress', e.progress);
			Ti.App.fireEvent("Downloading", {
				progress : e.progress,
			});
		}
	}, function() {
		//success
		Ti.API.info('COMPLETE TOUR DOWNLOAD');
		if (autoextracting) {
			if (unZip(filename)) {
				callback(true);
			};
		} else {
			callback(true);
		}
	}, filename + ".zip");
}

function unZip(filename) {
	var Compression = require('ti.compression');
	var inputDirectory = Ti.Filesystem.tempDirectory + "/";
	var downloadedItems = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "downloadedItems");
	if (!downloadedItems.exists()) {
		downloadedItems.createDirectory({
			remoteBackup : false
		});
	}
	var outputDirectory = Ti.Filesystem.applicationDataDirectory + "downloadedItems/";
	var zipFileName = inputDirectory + filename + '.zip';
	var result = Compression.unzip(outputDirectory, zipFileName, true);
	if (result == 'success') {
		var zipFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filename + ".zip");
		zipFile.deleteFile();
	}
	return (result == "success");
}

module.exports = {
	downloadModule : downloadModule,
	cancelDownloadingModule : cancelDownloadingModule
}

