'use strict';
define([
    'jquery',
    'underscore',
    'Backbone',
    'tpl!templates/recipeView'
], function($, _, Backbone, recipeViewTemplate){
    var RecipeView = Backbone.View.extend({
        className   : 'recipe',
        tagName     : 'tr',
        events      : {
            'click .arrow'      : 'toggleVersions',
            'click .deactivate' : 'deactivate',
            'click .delete'     : 'delete'
        },

        initialize : function(){
            this.render();
            _.bindAll(this, 'render', 'changeVisibility');
            this.model.on('change:visible', this.changeVisibility);
        },

        render : function(){
            var $el = this.$el;
            var recipe = this.model;

            var recipeURI = 'http://anycook.de/#/recipe/'+encodeURIComponent(recipe.get('name'));

            var variables = this.model.toJSON();
            $.extend(variables, {
                recipeURI: recipeURI,
                created : new Date(variables.created),
                orderBy : this.model.collection.orderBy
            });

            $el.html(recipeViewTemplate(variables));

            if(recipe.get('active_id') === -1){ $el.addClass('warning'); }
        },
        changeVisibility : function(){
            this.$el.toggle(this.model.get('visible'));
        }
        /*deactivate : function(event){
            var recipe = this.model;
            var attributes = {
                active_id   : -1
            }
            recipe.save(attributes);
        },
        delete : function(event){
            var self = this;
            var recipe = this.model;
            if(confirm('Wirklich "'+recipe.get('name')+'" löschen?')){
                self.$el.remove();
                recipe.destroy();
            }
        }*/
    });

    return RecipeView;
});
