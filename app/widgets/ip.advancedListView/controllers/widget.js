var options = arguments[0] || {};
var loadingFlag = false;
var limit = options.limit || Alloy.isTablet ? 20 : 10;
var offset = options.offset || 0;
var loadOffset = options.loadOffset || 2;
var noPullToRefresh = options.noPullToRefresh || false;
var noDynamicLoading = options.noDynamicLoading || false;
if (OS_ANDROID) {
    noPullToRefresh = true;
}

$.headerTitle = '';

// -----LISTVIEW-----
var section = Ti.UI.createListSection({items:[]});
if ($.headerTitle) {
    section.headerTitle = $.headerTitle; 
}
if (options.root) {
    $.root.applyProperties(options.root);
}
$.listView = Alloy.CFG.AdvancedListView.createListView(_.extend({
	sections : [section],
	separatorColor:"transparent",
	stopImageLoaderOnScroll: true
}, options.listview));
$.root.add($.listView);

// -----PULL TO REFRESH-----
if (!noPullToRefresh) {
	var ptr = Alloy.createWidget('ip.pullToRefresh', 'widget');
	$.listView.headerPullView = ptr.getView();
}

// -----EVENTS-----
if (!noPullToRefresh || !noDynamicLoading) {
	$.listView.addEventListener('scroll', function(e) {
		if (e.source != $.listView)
			return;
		if (!noPullToRefresh) {
			ptr.onScroll(e);
		}
		if (loadingFlag) {
			return;
		}
		if (noDynamicLoading) {
		    return;
		}
		if (OS_IOS) {
    		if (e.contentOffset.y > e.contentSize.height - e.size.height * loadOffset) {
    			$.loadMoreData();
    		}
		} else {
		    e.source = null;
		    if (e.firstVisibleItem > e.totalItemCount - e.firstVisibleItem -  e.visibleItemCount * 1.5) {
                $.loadMoreData();
		    }
		}
	});

	$.listView.addEventListener('dragend', function(e) {
		if (noPullToRefresh) {
			return;
		}
		if (ptr.isReadyToPull()) {
			$.reloadData();
		}
	});
}

$.listView.addEventListener('itemclick', function(e) {
	var item = e.section.getItemAt(e.itemIndex);
	if (item.type && item.type == 'loading') {
		return;
	}
	if (item.type && item.type == 'error') {
		$.reloadData();
		return;
	}
	if (item.type && item.type == 'noneData') {
		return;
	}
	if (!item.no_feedback) {
		var bg = item.bg;
		e.section.updateItemAt(e.itemIndex, _.extend(item, {
			root : {
				backgroundColor : '#fff'
			}
		}));
	}
	options.clickFunc(item, e);
	if (!item.no_feedback) {
		setTimeout(function() {
			e.section.updateItemAt(e.itemIndex, _.extend(item, {
				root : {
					backgroundColor : bg
				}
			}));
		}, 300);
	}
});

// -----INTERFACE-----
$.startLoading = function() {
	loadingFlag = true;
	if (!noPullToRefresh) {
		ptr.startLoading();
	}
	if (section.items.length > 0) {
		section.appendItems([{
			template : 'templateService',
			label : {
				text : L('loading')
			},
			type : 'loading'
		}]);
	} else {
	    /*$.listView.setContentInsets({top:60},{animated:false});
	    $.listView.setSections([]);
	    $.ai = 1;
	    return;
        section = Ti.UI.createListSection({items:[{
                template : 'templateService',
                label : {
                    text : L('loading')
                },
                type : 'loading'
            }]});
        
        $.listView.setSections([section]);
        return;*/
       //return;
        if (!$.ai) {
            $.ai = Ti.UI.createActivityIndicator({
                id: "ai",
    			//style : OS_IOS ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : undefined,
    			message : L('loading'),
    			color : 'gray',
    			font : {
    				fontSize : Alloy.CFG.headSize || '14dp'
    			}
    		});
    		if (OS_IOS) {
    		    $.ai.style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    		}
    	    $.root.add($.ai);
    	    
    		$.ai.show();
    		
        }
	}
};

$.removeAI = function() {
	if ($.ai) {
	    //$.listView.setContentInsets({top:0},{animated:true});
	    //return;
		$.ai.hide();
    	$.root.remove($.ai);
	    $.ai = null;
	}
};

$.endLoading = function() {
	setTimeout(function() {
	    Ti.API.info('END LOADING');
		loadingFlag = false;
	}, 300);
    $.removeAI();
    if (!noPullToRefresh) {
        ptr.endLoading();
    }
};

$.stopLoading = function() {
    Ti.API.info('STOP LOADING');
	loadingFlag = true;
	$.removeAI();
	if (!noPullToRefresh) {
		ptr.endLoading();
	}
};

$.showError = function(index, _text, _type) {
	loadingFlag = true;
	$.removeAI();
	if (!noPullToRefresh) {
		ptr.endLoading();
	}
	var t = _text || L('error_retry');
	var ty = _type || 'error';
	Ti.API.info('ERROR : ' + t);
	$.replaceItemsAt(index, 1, [{
		template : 'templateService',
		label : {
			text : t
		},
		type : 'error'
	}]);
};

$.reloadData = function() {
	loadingFlag = false;
	section = null;
	section = Ti.UI.createListSection({items:[]});
	if ($.headerTitle) {
	    section.headerTitle = $.headerTitle; 
	}
	$.listView.setSections([section]);
	offset = 0;
	$.params.offset = 0;
	$.loadMoreData();
};

$.replaceItemsAt = function(offset, count, items) {
    if (offset == 0) {
        section = Ti.UI.createListSection({items:items});
        if ($.headerTitle) {
            section.headerTitle = $.headerTitle; 
        }
        $.listView.setSections([section]);
    } else {
        if ($.listView && section) {
	       section.replaceItemsAt(offset, count, items);
	    }
	}
};

$.incOffset = function(inc) {
	offset += inc;
	$.params.offset = offset;
};
$.params = {offset:0, limit:10};
$.setParams  = function(p) {
    _.extend($.params, p);
    limit = $.params.limit || limit || 10;
    offset = $.params.offset || offset || 10;
};

$.loadMoreData = function() {
    Ti.API.info('LOAD DATA ', $.params, loadingFlag);
	if (loadingFlag)
		return;
    $.startLoading(offset, limit);
    var sql = _.pick($.params, "offset", "limit");
    var where = _.pick($.params, ["category_id"]);
    if (_.values(where).length > 0) {
        sql.where = where;
   	}
   	Ti.API.info('heroes',options.heroes);
   	if (options.heroes) {
   	    urlparams.heroes = options.heroes;
   	}
   	if (options.keywords) {
   	    urlparams.keywords = options.keywords;
   	}
    options.collection.fetch({
    	localOnly:false,
    	remoteOnly: true,       //Когда будет возващать category_id, вернуть обратно sql запрос
        urlparams: $.params,
        //sql: sql,
        success: function(data) {
            var items = [];
            data.each(function(rec, i) {
                items.push(rec.list_transform());
            });
            $.replaceItemsAt(offset, 1, items);
            Ti.API.info(data.toJSON());
            if (data.length >= limit) {
                $.endLoading();
            } else {
                $.stopLoading();
            }

            $.incOffset(data.length);
        },
        error: function(err) {
            $.showError(offset, err);
        }
    });
};

$.setSectionName = function(headerName) {
	section.headerTitle = headerName;
	$.headerTitle = headerName;

};

