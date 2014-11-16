define([
    'jquery',
    'underscore',
    'AnycookAPI.mailproviders',
    'Backbone',
    'views/MailProviderView',
    'tpl!templates/mailProvidersOverview'
], function($, _, AnycookAPI, Backbone, MailProviderView, mailProvidersOverviewTemplate) {
    'use strict';
    return Backbone.View.extend({
        id : 'mailprovidersOverview',
        initialize : function() {
            this.render();
        },
        render : function() {
            var self = this;
            this.$el.html(mailProvidersOverviewTemplate({
                orderBy : this.model.orderBy,
                invertOrder : this.model.invertOrder
            }));

            this.model.each(function(model){
                self.addMailProviderView(model);
            });
        },
        addMailProviderView : function(model) {
            var mailProviderView = new MailProviderView({model: model});
            this.$('table').append(mailProviderView.$el);
        }
    });
});
