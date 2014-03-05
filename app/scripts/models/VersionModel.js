define([
    'Backbone'
], function(Backbone){
    var RecipeModel = Backbone.Model.extend({
        idAttribute : "id"
    });
    return RecipeModel;
});
