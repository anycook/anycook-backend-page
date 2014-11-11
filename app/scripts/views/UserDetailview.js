'use strict';
define([
    'jquery',
    'underscore',
    'Backbone',
    'AnycookAPI',
    'tpl!templates/userDetailview',
    'bootstrap.dropdown'
], function($, _, Backbone, AnycookAPI, userDetailviewTemplate){
    var UserView = Backbone.View.extend({
        id   : 'userDetailview',
        events: {
            'click #activate' : 'activateUser',
            'click #resendActivation' : 'resendActivationMail',
            'click #deactivate' : 'deactivateUser',
            'click #giveAdminRights': 'giveAdminRights',
            'click #refuseAdminRights': 'activateUser'
        },
        initialize: function(){
            this.render();
            _.bindAll(this, 'render');
            this.model.on('change', this.render);
            this.render();
        },
        render: function(){
            var model = this.model;
            var $el = this.$el;
            var data = {
                text : '',
                place : ''
            };
            $.extend(data, model.toJSON());
            $el.html(userDetailviewTemplate(data));
            //this.$('.dropdown').dropdown();
        },
        activateUser: function(){
            this.model.set('level', 0);
            this.model.save();
        },
        deactivateUser: function(){
            this.model.set('level', -1);
            this.model.save();
        },
        giveAdminRights:function(){
            this.model.set('level', 2);
            this.model.save();
        },
        resendActivationMail: function(){
            var userId = this.model.get('id');
            $.post(AnycookAPI._settings().baseUrl+'/user/'+userId+'/resendActivationId');
        }
    });
    return UserView;
});
