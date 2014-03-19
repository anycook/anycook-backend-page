'use strict';
define([
    'jquery',
    'underscore',
    'AnycookAPI.recipe',
    'Backbone',
    'views/VersionView',
    'tpl!templates/versionOverview'
], function($, _, AnycookAPI, Backbone, VersionView, versionOverviewTemplate){
    var VersionOverview = Backbone.View.extend({
        id: 'versions',
        initialize : function(){
            _.bindAll(this, 'render', 'addVersionView');
        },
        render : function(){
            var self = this;
            var $el = this.$el;
            $('#content').empty().append($el);
            $el.html(versionOverviewTemplate({
                name: this.model.options.recipeName,
                numVersions: this.model.length
            }));

            AnycookAPI.recipe.tags(this.recipeName, function(tags){
                self.$('.numTags').text(tags.length);
            });

            this.model.each(this.addVersionView);
        },

        addVersionView : function(data){
            var versionView = new VersionView({model: data});
            this.$('ul').append(versionView.el);
            versionView.render();
        }
    });
    return VersionOverview;
});
