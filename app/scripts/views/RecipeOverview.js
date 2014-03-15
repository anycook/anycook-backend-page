'use strict';
define([
    'jquery',
    'underscore',
    'Backbone',
    'views/RecipeView',
    'tpl!templates/recipeOverview'
], function ($, _, Backbone, RecipeView, recipeOverviewTemplate) {
    var RecipeOverview = Backbone.View.extend({
        id: 'recipes',
        initialize : function(){
            _.bindAll(this, 'addRecipeView');

            var recipes = this.model;
            recipes.on('add', this.addRecipeView);

            this.render();
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
