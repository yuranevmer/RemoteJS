//var measurement = require('alloy/measurement');
var android = (Ti.Platform.osname == 'android') ? 1 : 0;
function px2dip(ThePixels) {
    return android ? (ThePixels / (Titanium.Platform.displayCaps.dpi / 160)) : ThePixels;
};

function dip2px(TheDPUnits) {
    return android ? (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160)) : ThePixels;
};

//$.win.width = px2dip(Ti.Platform.displayCaps.platformWidth);
//$.innerwin.width = px2dip(Ti.Platform.displayCaps.platformWidth);
//$.tableView.separatorStyle = OS_IOS ? Titanium.UI.iPhone.TableViewSeparatorStyle.NONE : null;
var shadowsize = 9;

var Draggable = require('ti.draggable');
$.win = Draggable.createView({
    left:-shadowsize,
    top:0,
    bottom:0,
    width:Ti.Platform.displayCaps.platformWidth+shadowsize,
    minLeft:-shadowsize,
    maxLeft:Ti.Platform.displayCaps.platformWidth-80-shadowsize,
    axis:'x',
    zIndex: 10,
});
$.wroot.add($.win);
$.shadow = Ti.UI.createView({
    touchEnabled: false,
    left:0,
    top:0,
    bottom:0,
    width: shadowsize,
    opacity: 0.4,
    visible:true,
    backgroundImage: WPATH("shadow.png"),
    zIndex: 10,
});
$.win.add($.shadow);
$.innerwin = Ti.UI.createView({
    left:shadowsize,
    top:0,
    bottom:0,
    visible:true,
    //bubbleParent: true,
    right:0,
    zIndex: 10,
});

$.win.add($.innerwin);
$.clickKiller = Ti.UI.createView({
    left:shadowsize,
    right: 0,
    backgroundColor : 'transparent',
    visible: false,
    zIndex : 50,
    bubbleParent: true,
    id : "clickKiller"
});
$.win.add($.clickKiller);

var hasSlided = false;
var animateLeft = Ti.UI.createAnimation({
    left : 240-shadowsize,
    //right : -240,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 250
});

animateLeft.addEventListener("complete2", function() {
    //hasSlided = true;
    Ti.API.info('FINISHED ' + hasSlided)
});

var animateRight = Ti.UI.createAnimation({
    left : -shadowsize,
    //right : 0,
    curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration : 250
});
animateRight.addEventListener("complete1", function() {
    //hasSlided = false;
    Ti.API.info('FINISHED ' + hasSlided)
});

function hideMenu() {
    Ti.API.info('HIDE MENU');
    if (!hasSlided) return;
    hasSlided = false;
    $.clickKiller.hide();
    $.win.animate(animateRight);
    Ti.App.fireEvent("ip.slideMenu:hide");
}

function showMenu() {
    Ti.API.info('SHOW MENU');
    if (hasSlided) return;
    hasSlided = true;
    $.clickKiller.show();
    $.win.animate(animateLeft);
    Ti.App.fireEvent("ip.slideMenu:show");
}


$.clickKiller.addEventListener('singletap', function(e) {
    Ti.API.info('CLICK KILLER HIDE MENU');
    hideMenu();
});

var hasSlided = false;
exports.toggleSlider = function() {
    Ti.API.info('HAS SLIDER? : ' + hasSlided);
    if (!hasSlided) {
        showMenu();
    } else {
        hideMenu()
    }
};

exports.showMenu = function() {
    showMenu();
};

exports.hideMenu = function() {
    hideMenu();
};


$.win.addEventListener("end", function(){
    if ($.win.rect.left > Ti.Platform.displayCaps.platformWidth / 3) {
        hasSlided = false;
        $.win.left = $.win.rect.left;
        showMenu();
    } else {
        hasSlided = true;
        $.win.left = $.win.rect.left;
        hideMenu();
    }
});