'use strict';
define([
    'jquery',
    'underscore',
    'Backbone',
    'views/UserView',
    'tpl!templates/userOverview'
], function($, _, Backbone, UserView, userOverviewTemplate){
    var UserOverview = Backbone.View.extend({
        id: 'users',
        className: 'panel panel-default',
        events : {
            'click th.id' : 'clickId',
            'click th.name' : 'clickName',
            'click th.createDate' : 'clickCreateDate',
            'click th.lastLogin' : 'clickLastLogin',
            'click th.level' : 'clickStatus'
        },
        initialize : function(){
            _.bindAll(this, 'addUserView', 'render');
            this.render();
            var users = this.model;
            users.on('add', this.addUserView);
            users.on('sort', this.render);
        },
        render : function(){
            this.$el.html(userOverviewTemplate({
                numUsers : this.model.length,
                orderBy : this.model.orderBy,
                invertOrder : this.model.invertOrder
            }));

            this.model.each(this.addUserView);
        },
        addUserView : function(data){
            var userView = new UserView({model: data});
            this.$('table').append(userView.$el);
        },
        clickId : function(){
            if(this.model.orderBy === 'id'){
                this.model.invertOrder = !this.model.invertOrder;
            }else {
                this.model.orderBy = 'id';
                this.model.invertOrder = false;
            }
            this.model.sort();
        },
        clickName : function(){
            if(this.model.orderBy === 'name'){
                this.model.invertOrder = !this.model.invertOrder;
            }else {
                this.model.orderBy = 'name';
                this.model.invertOrder = false;
            }
            this.model.sort();
        },
        clickCreateDate : function(){
            if(this.model.orderBy === 'createDate'){
                this.model.invertOrder = !this.model.invertOrder;
            }else {
                this.model.orderBy = 'createDate';
                this.model.invertOrder = true;
            }
            this.model.sort();
        },
        clickLastLogin : function(){
            if(this.model.orderBy === 'lastLogin'){
                this.model.invertOrder = !this.model.invertOrder;
            }else {
                this.model.orderBy = 'lastLogin';
                this.model.invertOrder = false;
            }
            this.model.sort();
        },
        clickStatus : function(){
            if(this.model.orderBy === 'level'){
                this.model.invertOrder = !this.model.invertOrder;
            }else {
                this.model.orderBy = 'level';
                this.model.invertOrder = true;
            }
            this.model.sort();
        }
    });
    return UserOverview;
});
