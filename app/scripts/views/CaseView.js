define([
    'jquery',
    'underscore',
    'AnycookAPI',
    'Backbone',
    'tpl!templates/caseView',
], function($, _, AnycookAPI, Backbone, caseViewTemplate){
    'use strict';
    return Backbone.View.extend({
        className   : 'case',
        tagName     : 'tr',
        events      : {
            'click .change'   : 'enableChangeMode',
            'click .delete'   : 'delete',
            'click .save'     : 'save',
            'click .cancel'   : 'disableChangeMode'
        },
        initialize: function(){
            var self = this;
            _.bindAll(this, 'render', 'changeVisibility');
            this.collection = this.model.collection;
            this.model.on('change:visible', this.changeVisibility);
                /*.on('sync', function(){
                    AnycookAPI.recipe.tag(false, function(models){
                        self.collection.reset(models);
                    });
                });*/
            this.render();
        },
        render: function(){
            var model = this.model;
            var $el = this.$el;
            var variables = model.toJSON();
            $.extend(variables, {
                orderBy : this.model.collection.orderBy
            });
            $el.html(caseViewTemplate(variables));
        },
        changeVisibility : function(){
            this.$el.toggle(this.model.get('visible'));
        },
        enableChangeMode : function() {
            this.$('.syntax').html('<input type="text" class="form-control input-sm" value="' + this.model.get('syntax') + '">');
            this.$('.change-delete').hide();
            this.$('.save-cancel').show();
        },
        disableChangeMode : function() {
            this.$('.syntax').text(this.model.get('syntax'));
            this.$('.change-delete').show();
            this.$('.save-cancel').hide();
        },
        save : function() {
            var name = this.$('.name input').val();
            var syntax = this.$('.syntax input').val();
            this.model.set('syntax', syntax);
            this.model.save();
            this.disableChangeMode();
        },
        delete : function() {
            this.collection.remove(this.model);
            this.model.destroy();
        }
    });
});
