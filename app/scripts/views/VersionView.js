define([
    'jquery',
    'AnycookAPI.recipe',
    'Backbone',
    'tpl!templates/versionView'
],
function($, AnycookAPI, Backbone, versionViewTemplate){
    var VersionView = Backbone.View.extend({
        tagName : 'li',
        className : 'list-group-item',
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
        }
    });
    return VersionView;
});
