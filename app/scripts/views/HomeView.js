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

            $el.html(homeViewTemplate(model.toJSON()));
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
