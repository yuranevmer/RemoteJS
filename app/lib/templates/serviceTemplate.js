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
            touchEnabled: false,
            backgroundColor : "#efeff1",
            left:10,
            right: 0,
        },
        childTemplates : [{
            type : 'Ti.UI.Label',
            bindId : 'label',
            properties : {
                verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
                textAlign: "center",
                touchEnabled: false,
                color: "gray",
                text: "loading",
                left:0,
                right: 0,
                height: Ti.UI.SIZE,
                font : {
                    fontFamily: fontFamily,
                    fontWeight : 'bold',
                    fontSize : 11
                }
            }
        }]
    }]
}
