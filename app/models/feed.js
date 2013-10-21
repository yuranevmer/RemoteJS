var Decoder = require("htmlentities");
exports.definition = {

    config : {
        columns : {
            "id" : "integer primary key",
            "category_id": "integer",
            "image_url" : "text",
            "title" : "text",
            "desc" : "text",
            "html" : "text",
            "timestamp" : "text",
            "has_video" : "integer",
            "has_photos" : "integer",
            "videos" : "text",
            "photos" : "text",
            "url" : "text",
        },
        json_columns : ['videos', 'photos'],
        "URL" : "http://viva.ua/api/v1/feeds",
        "debug" : 1,
        "adapter" : {
            "type" : "sqlrest",
            "collection_name" : "feed",
            "idAttribute" : "id",

        },
        "headers" : {// your custom headers
            "Content-Type" : "application/json",
            "Accept" : "application/json"

            //  "Accept": "application/vnd.stackmob+json; version=0",
            //  "X-StackMob-API-Key": "your-stackmob-key"
        },
        "parentNode" : "responses.feeds",
        //"useStrictValidation":true
        //your root node
    },

    extendModel : function(Model) {
        _.extend(Model.prototype, {
            get : function(name) {
                var o = this.toJSON();
                var result = o[name];
                if (this.config.json_columns && this.config.json_columns.indexOf(name) > -1 && typeof result == "string" && (result.charAt(0) == "{" || result.charAt(0) == "[")) {
                    result = JSON.parse(result);
                }
                if (name == "title" || name == "desc") return Decoder.decode(result);
                return result;
            },
            list_transform: function() {
                var template = 'baseTemplate';
                var rec = this.toJSON();
                return {
                    template : template,
                    title : {
                        text : Decoder.decode(rec.title)
                    },
                    date : {
                        text : rec.timestamp
                    },
                    desc : {
                        text : rec.desc == null ? "" : Decoder.decode("                                " + rec.desc)
                    },
                    image : {
                        image : rec.image_url
                    },
                    full_data : _.clone(rec)
                };
            }
        });
        return Model;
    },
    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {
            comparator : function(m) {
                Ti.API.info('--',m.get('timestamp'))
                return String.fromCharCode.apply(String, _.map(m.get("timestamp").split(""), function(c) {
					return 0xffff - c.charCodeAt();
				}));
                //return m.get('timestamp');
            }
            
        });
        
        return Collection;
    }
}