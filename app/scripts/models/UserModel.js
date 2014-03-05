'use strict';
define([
    'Backbone'
], function(Backbone){
    var UserModel = Backbone.Model.extend({
        idAttribute : 'id'
    });
    return UserModel;
});
