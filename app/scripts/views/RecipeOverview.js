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
        events : {
            'click th.name ' : 'clickName',
            'click th.created ' : 'clickCreated',
            'click th.views ' : 'clickViews'
        },
        initialize : function(){
            _.bindAll(this, 'addRecipeView', 'render');

            var recipes = this.model;
            recipes.on('add', this.addRecipeView);
            recipes.on('sort', this.render);

            this.render();
        },

        render : function(){
            var self = this;
            var $el = this.$el;
            $el.html(recipeOverviewTemplate({
                numRecipes: this.model.length,
                orderBy : this.model.orderBy,
                invertOrder : this.model.invertOrder
            }));

            this.model.each(function(model){
                self.addRecipeView(model);
            });
        },
        clickCreated : function(){
            if(this.model.orderBy === 'created'){
                this.model.invertOrder = !this.model.invertOrder
            }else {
                this.model.orderBy = 'created';
                this.model.invertOrder = true;
            }
            this.model.sort();
        },
        clickName : function(){
            if(this.model.orderBy === 'name'){
                this.model.invertOrder = !this.model.invertOrder
            }else {
                this.model.orderBy = 'name';
                this.model.invertOrder = false;
            }
            this.model.sort();
        },
        clickViews : function(){
            if(this.model.orderBy === 'views'){
                this.model.invertOrder = !this.model.invertOrder
            }else {
                this.model.orderBy = 'views';
                this.model.invertOrder = true;
            }
            this.model.sort();
        },
        addRecipeView : function(data){
            var recipe = new RecipeView({model: data});
            this.$('table').append(recipe.$el);
        }
    });
    return RecipeOverview;
});
