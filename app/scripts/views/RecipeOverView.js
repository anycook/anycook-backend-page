define([
    'jquery',
    'Backbone',
    'views/RecipeView',
    'tpl!templates/recipeOverview'
], function ($, Backbone, RecipeView, recipeOverviewTemplate) {
    var RecipeOverview = Backbone.View.extend({
        id: "recipes",
        initialize : function(){
            _.bindAll(this, 'addRecipeView');

            var recipes = this.model;
            recipes.on("add", this.addRecipeView);

            //recipes.fetch();
            this.render();
            //var $el = this.$el;
            //recipes.fetch();

            /*var i = setInterval(function() {
                if(!$el.parent())
                    clearInterval(i);
                else
                    recipes.fetch();
            }, 10000);*/
        },

        render : function(){
            var self = this;
            var $el = this.$el;
            $el.html(recipeOverviewTemplate({
                numRecipes: this.model.length
            }));

            this.model.each(function(model){
                self.addRecipeView(model);
            });
        },

        addRecipeView : function(data){
            var recipe = new RecipeView({model: data});
            this.$('table').append(recipe.$el);
        }
    });
    return RecipeOverview;
});
