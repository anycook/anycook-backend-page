'use strict';
define([
    'jquery',
    'underscore',
    'Backbone',
    'models/StatusModel',
    'tpl!templates/homeView'
], function($, _, Backbone, StatusModel, homeViewTemplate){
    var HomeView = Backbone.View.extend({
        id      : 'home',
        events  : {
            'click #rebuildIndex'   : 'rebuildIndex'
        },
        initialize : function(){
            $('#content').empty().append(this.$el);
            _.bindAll(this, 'render');
            this.render();
        },
        render: function(){
            var $el = this.$el;
            var model = this.model;

            var variables = {
                dailyrecipe : model.get('dailyDish'),
                recipes     : model.get('recipes'),
                users       : model.get('users'),
                ingredients : model.get('ingredients'),
                tags        : model.get('tags'),
                active      : 0,
                maxActive   : 0,
                idle        : 0,
                maxIdle     : 0
            };

            var connectionStatus = model.get('connectionStatus');
            if(connectionStatus){
                _.extend(variables, {
                    active      : connectionStatus.numactive,
                    maxActive   : connectionStatus.maxactive,
                    idle        : connectionStatus.numidle,
                    maxIdle     : connectionStatus.maxidle
                });
            }

            $el.html(homeViewTemplate(variables));
        },
        rebuildIndex : function(){
            $.post('anycook-backend/index', function(){
                /* global alert */
                alert('index neu generiert');
            });
        }
    });
    return HomeView;
});
