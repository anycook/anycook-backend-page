define([
    'Backbone',
    'AnycookAPI'
], function(Backbone, AnycookAPI){
    'use strict';
    return Backbone.Model.extend({
        idAttribute : 'name',
        defaults : {
            visible : true
        },
        urlRoot: function(){
            return AnycookAPI._settings().baseUrl+'/case';
        }
    });
});
