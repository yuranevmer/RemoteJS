var fontFamily = "Arial";
exports = {
    bindId : 'root',
    properties : {
        height : 88,
        backgroundColor : "#efeff1",
		//selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
    },
    childTemplates : [{
        type : 'Ti.UI.View',
        bindId : 'bg',
        properties : {
            touchEnabled : false,
            backgroundColor : "#efeff1",
            left : 6,
            right : 0,
        },
        childTemplates : [{
            type : 'Ti.UI.Label',
            bindId : 'title',
            properties : {
                verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                touchEnabled : false,
                height : 27,
                top : 6,
                left : 0,
                right : 104,
                font : {
                    fontFamily : fontFamily,
                    fontWeight : 'bold',
                    fontSize : 12
                }
            }
        }, {
            type : 'Ti.UI.Label',
            bindId : 'date',
            properties : {
                touchEnabled : false,
                top : 38,
                verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                left : 0,
                right : 104,
                bottom : 6,
                color : 'red',
                font : {
                    fontFamily : fontFamily,
                    fontSize : 12
                }
            }
        }, {
            type : 'Ti.UI.Label',
            bindId : 'desc',
            properties : {
                touchEnabled : false,
                top : 39,
                bottom : 6,
                verticalAlign : Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
                left : 0,
                right : 104,
                font : {
                    fontFamily : fontFamily,
                    fontSize : 12
                }
            }
        }, {
            type : 'Ti.UI.View',
            properties : {
                touchEnabled : false,
                right : 15 + 6,
                width : 77,
                height : 77,
                backgroundColor: "white",
                borderColor: "silver",
                borderWidth: 1,
            },
            childTemplates : [{
                type : 'Ti.UI.ImageView',
                bindId : 'image',
                properties : {
                    touchEnabled : false,
                    width : 71,
                    height : 71
                }
            }]
        }, {
            type : 'Ti.UI.View',
            bindId : 'disclosure',
            properties : {
                touchEnabled : false,
                backgroundImage : "/images/list/arrow.png",
                height : 14,
                width : 10,
                right : 6
            }
        },{
        	type: 'Ti.UI.View',
        	bindId : 'separator',
        	properties:{
        		backgroundImage:"images/common/separator.png",
        		height:1,
        		bottom:0,
        		left:4,
        		right:10
        	}
        }]
    }]
}
