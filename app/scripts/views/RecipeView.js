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
            _.bindAll(this, 'render');
            this.model.on('change', this.render);
        },

        render : function(){
            var $el = this.$el;
            var recipe = this.model;

            var recipeURI = 'http://anycook.de/#/recipe/'+encodeURIComponent(recipe.get('name'));

            var variables = this.model.toJSON();
            $.extend(variables, {
                recipeURI: recipeURI
            });

            $el.html(recipeViewTemplate(variables));

            if(recipe.get('active_id') === -1){ $el.addClass('warning'); }
        },
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
