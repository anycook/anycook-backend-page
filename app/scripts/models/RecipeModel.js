define([
    'Backbone'
], function(Backbone){
    var RecipeModel = Backbone.Model.extend({
        idAttribute : "name",

        /* Parses versions into own collection with version models
        */
        parse       : function(response, options){
            this.versions = new VersionCollection(response.versions);
            this.versions.livesIn = this;
            delete response.versions;
            return response;
        },
        getURI      : function(){
            var name = this.get("name");
            return  "http://test.anycook.de/#/recipe/"+encodeURIComponent(name);
        }
    });
    return RecipeModel;
});



/*
VersionModel = Backbone.Model.extend({
    idAttribute : "id"
})

VersionCollection = Backbone.Collection.extend({
    model : VersionModel
});*/

