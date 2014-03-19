'use strict';
define([
    'Backbone',
    'AnycookAPI'
], function(Backbone, AnycookAPI){
    var UserModel = Backbone.Model.extend({
        idAttribute : 'id',
        defaults : {
            visible : true
        },
        urlRoot: function(){
            return AnycookAPI._settings().baseUrl+'/user';
        }
    });
    return UserModel;
});
