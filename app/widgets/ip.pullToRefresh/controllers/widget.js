$.lastUpdated.text = L('update') + String.formatDate(new Date()) + " " + String.formatTime(new Date());
var readyToPull = false;
var loading = false;

$.startLoading = function() {
	loading = 1;
	$.status.text = L('loading');
	$.arrow.hide();
	if (OS_IOS)
		$.ai.show();
};

$.endLoading = function() {
	loading = 0;
	readyToPull = 0;
	$.status.text = L('pull_to_update');
	$.lastUpdated.text = L('update') + String.formatDate(new Date()) + " " + String.formatTime(new Date());
	if (OS_IOS)
		$.ai.hide();
	$.arrow.show();
	$.arrow.animate({
		transform : Ti.UI.create2DMatrix({
			rotate : 0
		}),
		duration : 0
	});
};

$.onScroll = function(e) {
	if (loading) {
		return;
	}
	if (e.contentOffset.y < -65 && !readyToPull) {
		readyToPull = 1;
		$.arrow.animate({
			transform : Ti.UI.create2DMatrix({
				rotate : -180
			}),
			duration : 200
		});
		$.status.text = L('release_to_update');
	}
	if (e.contentOffset.y > -65 && readyToPull) {
		readyToPull = 0;
		$.arrow.animate({
			transform : Ti.UI.create2DMatrix({
				rotate : 0
			}),
			duration : 200
		});
		$.status.text = L('pull_to_update');
	}
}

$.isReadyToPull= function(){
	return readyToPull;
}
