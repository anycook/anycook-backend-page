define([
    'jquery',
    'underscore',
    'Backbone',
    'views/UserView',
    'tpl!templates/userOverview'
], function($, _, Backbone, UserView, userOverviewTemplate){
    var UserOverview = Backbone.View.extend({
        id: "users",
        className: 'panel panel-default',
        initialize : function(){
            _.bindAll(this, "addUserView");
            this.render();
            var model = this.model;
            model.each(this.addUserView);
        },

        render : function(){
            this.$el.html(userOverviewTemplate({
                numUsers : this.model.length
            }));
        },
        addUserView : function(data){
            var userView = new UserView({model: data});
            this.$('table').append(userView.$el);
        }
    });
    return UserOverview;
});
