'use strict';
define([
    'Backbone',
    'text!../../anycook-credentials.json'
], function(Backbone, anycookCredentials){
    var UserModel = Backbone.Model.extend({
        idAttribute : 'id',
        urlRoot: function(){
            if(!this.credentials){
                this.credentials = JSON.parse(anycookCredentials);
            }
            return this.credentials.baseUrl+'/user';
        }
    });
    return UserModel;
});
