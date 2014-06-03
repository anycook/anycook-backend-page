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
        initialize : function(options){
            $('#content').empty().append(this.$el);
            _.bindAll(this, 'render');
            this.model = {
                status : options.status,
                conf   : options.conf
            };
            this.render();
        },
        render: function(){
            var $el = this.$el;

            $el.html(homeViewTemplate(this.model));
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
