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
        initialize : function() {
            this.render();
        },
        render : function() {
            var data = this.model.toJSON();
            this.$el.html(mailProviderViewTemplate(data));
        }
    });
});
