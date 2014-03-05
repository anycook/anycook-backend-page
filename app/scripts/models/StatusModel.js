define([
    'Backbone'
], function(Backbone){
    var StatusModel = Backbone.Model.extend({
        url: "http://10.1.0.200/backend/status"
    });
    return StatusModel;
});

