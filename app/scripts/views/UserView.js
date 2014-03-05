'use strict';
define([
    'jquery',
    'underscore',
    'Backbone',
    'tpl!templates/userView'
], function($, _, Backbone, userViewTemplate){
    var UserView = Backbone.View.extend({
        className   : 'user',
        tagName     : 'tr',
        initialize: function(){
            this.render();
            _.bindAll(this, 'render');
            this.model.on('change', this.render);
        },
        render: function(){
            var model = this.model;
            var $el = this.$el;
            var variables = model.toJSON();
            $el.html(userViewTemplate(variables));
        }
    });
    return UserView;
});
