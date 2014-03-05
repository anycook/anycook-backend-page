define([
    'jquery',
    'tpl!templates/recipeView'
], function($, recipeViewTemplate){
    var RecipeView = Backbone.View.extend({
        className   : "recipe",
        tagName     : "tr",
        events      : {
            "click .arrow"      : "toggleVersions",
            "click .deactivate" : "deactivate",
            "click .delete"     : "delete"
        },

        initialize : function(){
            var $el = this.$el;
            $("#recipelist").append($el);
            this.render();
            _.bindAll(this, "render");
            this.model.on("change", this.render);
        },

        render : function(){
            var self = this;
            var $el = this.$el;
            var recipe = this.model;

            var recipeURI = "http://anycook.de/#/recipe/"+encodeURIComponent(recipe.get("name"));

            var variables = this.model.toJSON();
            $.extend(variables, {
                recipeURI: recipeURI
            });

            $el.html(recipeViewTemplate(variables));

            if(recipe.get("active_id") === -1){ $el.addClass("warning"); }

            //self.renderVersions();
        },

        renderVersions : function(){
            var self = this;
            var $el = this.$el;
            var $ul = $el.find("ul");
            var versions = this.model.versions;
            _.each(versions.models, function(version){
                var $versionLi = $("<li></li>").addClass("version").appendTo($ul);
                var versionView = new VersionView({
                    el  : $versionLi[0],
                    model   : version
                });

                var active_id = self.model.get("active_id");
                if(version.id == active_id)
                    versionView.setActive();
                versionView.render();
            });
        },

        toggleVersions : function(event){
            var self = this;
            var $el = this.$el;
            $el.toggleClass("open");
        },

        deactivate : function(event){
            var recipe = this.model;
            var attributes = {
                active_id   : -1
            }
            recipe.save(attributes);
        },

        delete : function(event){
            var self = this;
            var recipe = this.model;
            if(confirm("Wirklich \""+recipe.get("name")+"\" löschen?")){
                self.$el.remove();
                recipe.destroy();
            }
        }
    });

    return RecipeView;
});
