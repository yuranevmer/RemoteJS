var fontFamily = "Arial";
exports = {
    bindId : 'root',
    properties : {
        height : 77,
        backgroundColor : "#efeff1",

    },
    childTemplates : [{
        type : 'Ti.UI.View',
        bindId : 'bg',
        properties : {
            touchEnabled : false,
            selectedBackgroundImage : "/images/menu/rowBG.png",
            backgroundImage : "/images/menu/rowBG.png",
            left : 0,
            right : 0,
        },
        childTemplates : [{
            type : "Ti.UI.View",
            bindId : "icon",
            properties : {
                touchEnabled : false,
                width : 44,
                height : 44,
                left : 0,
                id : "icon"
            }
        }, {
            type : "Ti.UI.Label",
            bindId : "title",
            properties : {
                touchEnabled : false,
                color : "#5e5e5e",
                shadowColor : "#ffffff",
                shadowOffset : {
                    x : 0,
                    y : 1
                },
                left : 44,
                height : 20,
                font : {
                    fontFamily : "Arial",
                    fontWeight : "bold",
                    fontSize : "14dp"
                },
                id : "title"
            }
        }, {
            type : "Ti.UI.View",
            bindId : "has_child",
            properties : {
                bubbleParent : false,
                backgroundImage : "/images/icons/arrowRight.png",
                width : 31,
                height : 44,
                right : 0,
                id : "has_child"
            },
        }]
    }]
}
