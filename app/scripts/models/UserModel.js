'use strict';
define([
    'Backbone',
], function(Backbone){
    var UserModel = Backbone.Model.extend({
        idAttribute : 'id',
        urlRoot: function(){
            return AnycookAPI._settings().baseUrl+'/user';
        }
    });
    return UserModel;
});
