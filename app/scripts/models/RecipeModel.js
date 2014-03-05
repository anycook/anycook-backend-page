'use strict';
define([
    'Backbone'
], function(Backbone){
    var RecipeModel = Backbone.Model.extend({
        idAttribute : 'name',
    });
    return RecipeModel;
});
