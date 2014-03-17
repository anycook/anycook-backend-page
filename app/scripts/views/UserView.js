'use strict';
define([
    'jquery',
    'underscore',
    'Backbone',
    'tpl!templates/userView',
], function($, _, Backbone, userViewTemplate){
    var UserView = Backbone.View.extend({
        className   : 'user',
        tagName     : 'tr',
        initialize: function(){
            _.bindAll(this, 'render');
            this.model.on('change', this.render);
            this.render();
        },
        render: function(){
            var model = this.model;
            var $el = this.$el;
            var variables = model.toJSON();
            $.extend(variables, {
                createDate : new Date(variables.createDate),
                orderBy : this.model.collection.orderBy
            });
            $el.html(userViewTemplate(variables));
        }
    });
    return UserView;
});
