'use strict';
define([
    'jquery',
    'underscore',
    'Backbone',
    'AnycookAPI',
    'models/StatusModel',
    'tpl!templates/homeView'
], function($, _, Backbone, AnycookAPI, StatusModel, homeViewTemplate){
    var HomeView = Backbone.View.extend({
        id      : 'home',
        events  : {
            'click #rebuildIndex'   : 'rebuildIndex',
            'click #sitemapButton'  : 'generateSitemaps'
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
            $.post('backend/index', function(){
                /* global alert */
                alert('index neu generiert');
            });
        },
        generateSitemaps : function(){
            $.post(AnycookAPI._settings().baseUrl+'/backend/site_map', function(){
                /* global alert */
                alert('sitemaps neu generiert');
            });
        }
    });
    return HomeView;
});
