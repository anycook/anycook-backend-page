define([
    'jquery',
    'underscore',
    'Backbone',
    'views/TagView',
    'tpl!templates/tagList'
], function ($, _, Backbone, TagView, tagListTemplate) {
    'use strict';
    return Backbone.View.extend({
        events : {
            'click th.name' : 'clickName',
            'click th.recipeNumber' : 'clickRecipeNumber'
        },
        initialize : function(){
            _.bindAll(this, 'render');
            this.model.on('sort', this.render);
        },
        render : function(){
            var self = this;
            this.$el.html(tagListTemplate({
                numTags : this.model.length,
                orderBy : this.model.orderBy,
                invertOrder : this.model.invertOrder
            }));

            this.model.each(function(model){
                self.addTagView(model);
            });
        },
        addTagView : function(model){
            var tagView = new TagView({model: model});
            this.$('table').append(tagView.el);
            tagView.render();
        },
        clickName : function(){
            if(this.model.orderBy === 'name'){
                this.model.invertOrder = !this.model.invertOrder;
            }else {
                this.model.orderBy = 'name';
                this.model.invertOrder = false;
            }
            this.model.sort();
        },
        clickRecipeNumber : function(){
            if(this.model.orderBy === 'recipeNumber'){
                this.model.invertOrder = !this.model.invertOrder;
            }else {
                this.model.orderBy = 'recipeNumber';
                this.model.invertOrder = true;
            }
            this.model.sort();
        },
        filter : function(query){
            this.model.each(function(model){
                if(query.length === 0) { model.set('visible', true); }
                else {
                    var name = model.get('name').toLowerCase();
                    model.set('visible', name.indexOf(query) !== -1);
                }
            });
        }
    });
});

