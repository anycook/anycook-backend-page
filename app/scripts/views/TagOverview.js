define([
    'jquery',
    'underscore',
    'AnycookAPI.tag',
    'Backbone',
    'models/TagCollection',
    'views/TagList',
    'views/TagSuggestedView',
    'tpl!templates/tagOverview'
], function ($, _, AnycookAPI, Backbone, TagCollection, TagList, TagSuggestedView, tagOverviewTemplate) {
    'use strict';
    return Backbone.View.extend({
        id: 'tagOverview',
        events : {
            'keyup #search' : 'changeSearch'
        },
        initialize : function(){
            _.bindAll(this, 'render');
        },
        render : function(){
            var self = this;
            this.$el.html(tagOverviewTemplate());

            AnycookAPI.tag(function(tags){
                var tagCollection = new TagCollection(tags);
                self.tagList = new TagList({model: tagCollection, el : self.$('#tagList')[0]});
                //self.$('#tagList').html(tagList.$el);
                self.tagList.render();
            });

            AnycookAPI.recipe.tag(false, function(tags){
                var tagCollection = new TagCollection(tags);
                tagCollection.orderBy = 'name';
                tagCollection.invertOrder = false;
                self.tagSuggestedView = new TagSuggestedView({model : tagCollection, el : self.$('#tagSuggestedView')});
                self.tagSuggestedView.render();
            });

            /*this.model.each(function(model){
                self.addRecipeView(model);
            });*/
        },
        changeSearch : function(){
            var value = $('#search').val().toLowerCase();
            this.tagList.filter(value);
            this.tagSuggestedView.filter(value);
        }
    });
});
