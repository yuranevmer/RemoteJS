module.exports = {
    init: function() {
        Ti.API.info("init");
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("lolka", exports.definition, []);

collection = Alloy.C("lolka", exports.definition, model);

exports.Model = model;

exports.Collection = collection;