define([
    'jquery',
    'underscore',
    'Backbone',
    'tpl!templates/mailProviderView'
], function($, _, Backbone, mailProviderViewTemplate){
    'use strict';
    return Backbone.View.extend({
        tagName : 'tr',
        className : 'mailProvider',
        events      : {
            'click .change'   : 'enableChangeMode',
            'click .delete'   : 'delete',
            'click .save'     : 'save',
            'click .cancel'   : 'disableChangeMode'
        },
        initialize : function() {
            this.render();
        },
        render : function() {
            var data = this.model.toJSON();
            this.$el.html(mailProviderViewTemplate(data));
        },
        enableChangeMode : function() {
            this.$('.shortName').html('<input type="text" class="form-control input-sm" value="' + this.model.get('shortName') + '">');
            this.$('.fullName').html('<input type="text" class="form-control input-sm" value="' + this.model.get('fullName') + '">');
            this.$('.redirect').html('<input type="text" class="form-control input-sm" value="' + this.model.get('redirect') + '">');
            this.$('.change-delete').hide();
            this.$('.save-cancel').show();
        },
        disableChangeMode : function() {
            this.$('.shortName').text(this.model.get('shortName'));
            this.$('.fullName').text(this.model.get('fullName'));
            var redirect = this.model.get('redirect');
            this.$('.redirect').html('<a href="'+redirect+'">'+redirect+'</a>');
            this.$('.change-delete').show();
            this.$('.save-cancel').hide();
        },
        save : function() {
            var shortName = this.$('.shortName input').val();
            var fullName = this.$('.fullName input').val();
            var redirect = this.$('.redirect input').val();
            this.model.set('shortName', shortName);
            this.model.set('fullName', fullName);
            this.model.set('redirect', redirect);
            this.model.save();
            this.disableChangeMode();
        },
        delete : function() {
            this.model.collection.remove(this.model);
            this.model.destroy();
            this.$el.remove();
        }
    });
});
