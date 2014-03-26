
define([
    'jquery',
    'underscore',
    'Backbone',
    'tpl!templates/tagView',
], function($, _, Backbone, tagViewTemplate){
    'use strict';
    return Backbone.View.extend({
        className   : 'tag',
        tagName     : 'tr',
        events : {
            'click .accept' : 'accept',
            'click .refuse' : 'refuse'
        },
        initialize: function(){
            var self = this;
            _.bindAll(this, 'render', 'changeVisibility');
            this.collection = this.model.collection;
            this.model.on('change:visible', this.changeVisibility)
                .on('sync', function(){
                    AnycookAPI.recipe.tag(false, function(models){
                        self.collection.reset(models);
                    })
                });
        },
        render: function(){
            var model = this.model;
            var $el = this.$el;
            var variables = model.toJSON();
            $.extend(variables, {
                orderBy : this.model.collection.orderBy
            });
            $el.html(tagViewTemplate(variables));
        },
        changeVisibility : function(){
            this.$el.toggle(this.model.get('visible'));
        },
        accept : function(){
            this.model.set('active', true);
            this.model.save();
        },
        refuse : function(){
            this.model.destroy({wait : true});
        }
    });
});
