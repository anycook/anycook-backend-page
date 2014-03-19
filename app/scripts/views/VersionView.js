'use strict';
define([
    'jquery',
    'underscore',
    'AnycookAPI.recipe',
    'Backbone',
    'tpl!templates/versionView'
],
function($, _, AnycookAPI, Backbone, versionViewTemplate){
    return Backbone.View.extend({
        className : 'list-group-item',
        tagName : 'li',
        events: {
            'click .activate' : 'activate',
            'click .deactivate' : 'deactivate'
        },
        initialize : function(){
            var self = this;
            this.model.on('sync', function(){
                self.model.collection.fetch();
            });
            this.model.on('change', this.render, this);
        },
        render : function(){
            var self = this;
            var data = this.model.toJSON();
            this.$el.html(versionViewTemplate(data));
            var name = this.model.get('name');
            AnycookAPI.recipe.ingredients(name, this.model.get('id'), function(ingredients){
                self.$('.numIngredients').text(ingredients.length);
            });

            AnycookAPI.recipe.steps(name, this.model.get('id'), function(steps){
                self.$('.numSteps').text(steps.length);
            });

            return this;
        },
        activate : function(){
            console.log('activate');
            this.model.set('active', true);
            this.model.save();
        },
        deactivate : function(){
            console.log('deactivate');
            this.model.set('active', false);
            this.model.save();
        }
    });
});
