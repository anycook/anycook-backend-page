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
        save: function(attrs, options) {
            options = options || {};

            // Filter the data to send to the server
            delete attrs.visible;

            options.data = JSON.stringify(attrs);

            // Proxy the call to the original save function
            Backbone.Model.prototype.save.call(this, attrs, options);
        },
        urlRoot: function(){
            return AnycookAPI._settings().baseUrl+'/user';
        }
    });
    return UserModel;
});
