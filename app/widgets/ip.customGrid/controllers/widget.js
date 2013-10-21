var opt = arguments[0] || {};

$.gridItems = opt.items || [];
$.itemWidth = opt.itemWidth || Alloy.CFG.baseItemWidth || 150;
$.columns = opt.columns || 'auto';
var props = JSON.parse(JSON.stringify(opt));
delete props["id"];
$.view.applyProperties(props);

if ($.columns !== 'auto') {
	$.cols = $.columns;
}

$.itemHeight = opt.itemHeight || Alloy.CFG.baseItemHeight || 150;
$.marginLeft = opt.marginLeft || 0;
$.marginRight = opt.marginRight || 0;
$.marginTop = opt.marginTop || 0;
$.marginBottom = opt.marginBottom || 0;
$.marginHeader = 0;

var tableHeader;
if (opt.pullToRefresh) {

}

//$.ptr.getView().hide();

$.calcSpaces = function() {
	$.xSpace = Math.round(($.holderWidth - ($.cols * $.itemWidth) - $.marginLeft - $.marginRight) / ($.cols + 1));
	$.xSpace = $.xSpace < 0 ? 0 : $.xSpace;
	$.ySpace = typeof $.ySpace == 'undefined' ? $.xSpace : $.ySpace;
	//$.ySpace = $.ySpace > 40 ? 25 : $.ySpace;
	$.marginTop = $.headerLeft ? $.itemWidth * 1.33333 + $.ySpace : 0;
};

$.calcCols = function() {

	var width = $.view.size.width;
	if (!width) {
		width = Ti.Platform.displayCaps.platformWidth;
		if (Ti.Android) {
			var dpi = Ti.Platform.displayCaps.dpi;
			width = width / dpi * 160;
		}
	} else {
		$.savedWidth = width;
	}
	if (Ti.Android) {
		var w = width;
		Ti.API.info('Check layout2 ' + w)
		if (w >= 570 && w <= 720) {
			$.itemWidth = 280;
			$.itemHeight = 280;
		} else if (w > 320 && w < 500) {
			$.itemWidth = 337;
			$.itemHeight = 337;
		} else if (w > 720 && w < 900) {
			$.itemWidth = 256;
			$.itemHeight = 256;
		} else {
			$.itemWidth = 300;
			$.itemHeight = 300;
		}
	}
	$.holderWidth = width;
	$.cols = Math.floor((width - $.marginLeft - $.marginRight) / ($.itemWidth));
	if ($.cols == 0)
		$.cols = 1;
};

$.holder.applyProperties({
	left : $.marginLeft,
	top : $.marginTop + $.marginHeader,
	right : $.marginRight,
	height : 1200,
});

//only vertical scroll

$.addGridItems = function(list, rand, hidden) {
	for (var i = 0; i < list.length; i++) {
		$.addGridItem(list[i], rand, hidden);
	}
};

$.addGridItem = function(item, rand, hidden) {
	if (rand || hidden)
		item.hide();
	$.gridItems.push(item);
	if (rand) {
		$.moveItem(item, 1);
		var t = Math.round(Math.random() * 200);
		var l = Math.round(Math.random() * 200);
		item.applyProperties({
			top : item.toY + t * (Math.random() * 2 > 1 ? -1 : 1),
			left : item.toX + l * (Math.random() * 2 > 1 ? -1 : 1),
			width : $.itemWidth,
			height : $.itemHeight,
		});
	} else {
		$.moveItem(item);
	}
	$.holder.add(item);
};
$.insertGridItem = function(index, item, rand, hidden) {
	if (rand || hidden)
		item.hide();
	$.gridItems.splice(index, 0, item);
	$.moveItem(item, rand || hidden);
	$.holder.add(item);
	if (rand) {
		var t = Math.round(Math.random() * 200);
		item.top = item.toY + t * (Math.random() * 2 > 1 ? -1 : 1);
		var l = Math.round(Math.random() * 200);
		item.left = item.toX + l * (Math.random() * 2 > 1 ? -1 : 1);
	}
	if (hidden) {
		item.applyProperties({
			top : 0,
			left : $.itemWidth - $.xSpace * 2,
			width : $.itemWidth,
			height : $.itemHeight,
		});
	}
};
$.removeAllGridItems = function() {
	$.holder.hide();
	$.gridItems = [];
	$.removeLeftHeader();
	$.removeRightHeader();
	$.holder.removeAllChildren();
	$.marginTop = 0;
	$.holder.top = $.marginHeader;
	$.holder.show();
};
$.removeGridItem = function(item) {
	var ind = $.gridItems.indexOf(item);
	if (ind > -1) {
		$.gridItems[ind] = null;
		Ti.API.info('REMOVE ITEM ' + ind);
		$.gridItems.splice(ind, 1);
		$.holder.remove(item);
	}
};
$.moveItem = function(item, fake) {
	if ( typeof $.cols == 'undefined')
		$.calcCols();
	if ( typeof $.xSpace == 'undefined')
		$.calcSpaces();
	var ind = $.gridItems.indexOf(item);
	var row = Math.floor(ind / $.cols);
	var col = ind - row * $.cols;
	var x = $.xSpace + ($.itemWidth + $.xSpace) * col;
	var y = ($.itemHeight + $.ySpace) * row;
	item.toX = x;
	item.toY = y;
	//Ti.API.info('MOVE ' + ind + ' y:' + y);
	if (!fake) {
		var props = {};
		props.left = x;
		props.top = y;
		props.width = $.itemWidth;
		props.height = $.itemHeight;
		item.applyProperties(props);
	}
};
$.rearrange = function(animate, onlyFirstN, resize, newWidth) {
	if (!onlyFirstN)
		onlyFirstN = $.gridItems.length;
	delete $.xSpace;
	delete $.ySpace;
	if ($.columns == 'auto')
		delete $.cols;
	if (resize) {
		$.itemWidth = newWidth;
	}
	for (var i = 0; i < $.gridItems.length; i++) {
		var item = $.gridItems[i];
		if (animate && i < onlyFirstN) {
			//randomize
			$.moveItem(item, 1);
			var t = Math.round(Math.random() * 200);
			var l = Math.round(Math.random() * 200);
			item.applyProperties({
				top : item.toY + t * (Math.random() * 2 > 1 ? -1 : 1),
				left : item.toX + l * (Math.random() * 2 > 1 ? -1 : 1),
				width : $.itemWidth,
				height : $.itemHeight,
			});
			item.show();
			item.animate({
				left : item.toX,
				top : item.toY,
				duration : 200
			});
		} else {
			$.moveItem(item, 0);
		}
	};
	for (var i = 0; i < $.gridItems.length; i++) {
		$.gridItems[i].show();
	}
	//    $.view.setContentOffset({x:0, y:0});
	$.arrangeHeaders();
	$.update();

};
$.arrange = function(animate, onlyFirstN) {
	if (!onlyFirstN)
		onlyFirstN = $.gridItems.length;
	for (var i = 0; i < $.gridItems.length; i++) {
		var item = $.gridItems[i];
		$.moveItem(item, animate && i < onlyFirstN);
		item.show();
		if (animate && i < onlyFirstN) {
			item.animate({
				left : item.toX,
				top : item.toY,
				duration : 200
			});
		}
	};
	for (var i = 0; i < $.gridItems.length; i++) {
		$.gridItems[i].show();
	}
	$.arrangeHeaders();
	$.update();
};
$.update = function() {
	if ($.gridItems.length > 0) {
		var h = parseInt($.gridItems[$.gridItems.length - 1].toY) + parseInt($.itemHeight) + parseInt($.ySpace) + parseInt($.marginBottom);
		$.holder.applyProperties({
			height : h + "dp",
			top : $.marginTop + $.marginHeader,
		});

		$.view.contentHeight = 'auto';
		//(h + parseInt($.marginTop)) + "dp";
		Ti.API.info(h + " ---- " + (h + parseInt($.marginTop)) + "dp");
	}
}

$.addTopHeader = function(el) {
	$.topHeader = el;
	$.marginHeader = 88;
	$.view.add($.topHeader);
}

$.addLeftHeader = function(el) {
	if ($.headerLeft) {
		$.view.remove($.headerLeft);
		$.headerLeft = null;
	}
	$.headerLeft = el;
	$.marginTop = $.itemWidth * 1.33333 + $.ySpace;
	$.headerLeft.applyProperties({
		left : $.marginLeft + $.xSpace,
		top : $.marginHeader,
		width : $.itemWidth,
		height : $.itemWidth * 1.33333
	});
	$.view.add($.headerLeft);
}

$.arrangeHeaders = function() {
	if ($.headerLeft) {
		$.marginTop = Math.round($.itemWidth * 1.33333 + $.ySpace)
		Ti.API.info('margin fixed ' + $.itemWidth + " y:" + $.ySpace);
		Ti.API.info($.marginTop);
		$.headerLeft.applyProperties({
			left : $.marginLeft + $.xSpace,
			width : $.itemWidth,
			height : Math.round($.itemWidth * 1.33333),
			top : $.marginHeader,
		});
	} else {
		$.marginTop = 0;
	}
	if ($.headerRight) {
		$.headerRight.applyProperties({
			visible : $.cols > 1,
			right : $.marginRight + $.xSpace,
			left : $.marginLeft + $.itemWidth + $.xSpace + $.xSpace,
			height : Math.round($.itemWidth * 1.33333),
			top : $.marginHeader
		});
		if ($.cols > 1 && !$.headerRight.isLoaded) {
			$.headerRight.loadData();
		}
	}
	if ($.arrangeCallback) {
		Ti.API.info('ARANGE CALLBACK')
		$.arrangeCallback();
	}
}

$.addRightHeader = function(el) {
	if ($.headerRight) {
		$.view.remove($.headerRight);
		$.headerRight = null;
	}
	$.headerRight = el;
	$.marginTop = $.itemWidth * 1.33333 + $.ySpace;
	$.headerRight.applyProperties({
		right : $.marginRight + $.xSpace,
		left : $.marginLeft + $.itemWidth + $.xSpace + $.xSpace,
		top : $.marginHeader,
		height : $.itemWidth * 1.33333

	});
	$.view.add($.headerRight);

}
$.removeLeftHeader = function(el) {
	if ($.headerLeft) {
		$.view.remove($.headerLeft);
		$.headerLeft = null;
	}
}

$.removeRightHeader = function(el) {
	if ($.headerRight) {
		$.view.remove($.headerRight);
		$.headerRight = null;
	}

}

$.scrollToTop = function() {
	$.view.setContentOffset({
		x : 0,
		y : 0
	});
}

$.waitForRearrange = 0;

$.checkLayout = function() {
	var w = $.view.size.width;
	if (!w) {
		w = Ti.Platform.displayCaps.platformWidth;
		if (Ti.Android) {
			var dpi = Ti.Platform.displayCaps.dpi;
			w = w / dpi * 160;
		}
	}
	//Ti.API.info('Check layout ')
	if (w && $.savedWidth != w) {
		delete $.xSpace;
		delete $.ySpace;
		$.calcCols();
		$.calcSpaces();

		//if ($.gridItems.length > 0) {
		Ti.API.info('REARRANGE w:' + w + " for: " + $.itemWidth + "x" + $.itemHeight);
		$.arrange();
		//}
		//$.arrangeHeaders();
	}
	setTimeout($.checkLayout, 500);
}

$.checkLayout();

exports.getView = function() {
	return $.view
}