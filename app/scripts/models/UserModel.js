'use strict';
define([
    'Backbone',
    'AnycookAPI'
], function(Backbone, AnycookAPI){
    var UserModel = Backbone.Model.extend({
        idAttribute : 'id',
        urlRoot: function(){
            return AnycookAPI._settings().baseUrl+'/user';
        }
    });
    return UserModel;
});
