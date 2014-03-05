'use strict';
define([
    'jquery',
    'AnycookAPI.recipe',
    'Backbone',
    'views/VersionView',
    'tpl!templates/versionOverview'
], function($, AnycookAPI, Backbone, VersionView, versionOverviewTemplate){
    var VersionOverview = Backbone.View.extend({
        id: 'versions',
        initialize : function(options){
            this.recipeName = options.recipeName;
            this.render();
        },
        render : function(){
            var self = this;
            var $el = this.$el;
            $('#content').empty().append($el);
            $el.html(versionOverviewTemplate({
                name: this.recipeName,
                numVersions: this.model.length
            }));

            AnycookAPI.recipe.tags(this.recipeName, function(tags){
                self.$('.numTags').text(tags.length);
            });

            this.model.each(function(model){
                self.addVersionView(model);
            });
        },

        addVersionView : function(data){
            var versionView = new VersionView({model: data});
            versionView.render();
            this.$('ul').append(versionView.$el);
        }
    });
    return VersionOverview;
});
