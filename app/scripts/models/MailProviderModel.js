define([
    'Backbone',
    'AnycookAPI'
], function(Backbone, AnycookAPI){
    'use strict';
    return Backbone.Model.extend({
        idAttribute : 'shortName',
        defaults : {
            visible : true
        },
        urlRoot: function(){
            return AnycookAPI._settings().baseUrl+'/mailproviders';
        }
    });
});
