define([
    'jquery',
    'AnycookAPI.recipe',
    'Backbone',
    'views/VersionView',
    'tpl!templates/versionOverview'
], function($, AnycookAPI, Backbone, VersionView, versionOverviewTemplate){
    var VersionOverview = Backbone.View.extend({
        id: "versions",
        initialize : function(options){

            var versions = this.model;
            this.recipeName = options.recipeName;
            //recipes.fetch();
            this.render();
            //var $el = this.$el;
            //recipes.fetch();

            /*var i = setInterval(function() {
                if(!$el.parent())
                    clearInterval(i);
                else
                    recipes.fetch();
            }, 10000);*/
        },

        render : function(){
            var self = this;
            var $el = this.$el;
            $("#content").empty().append($el);
            $el.html(versionOverviewTemplate({
                name: this.recipeName,
                numVersions: this.model.length
            }));

            AnycookAPI.recipe.tags(this.recipeName, function(tags){
                self.$('.numTags').text(tags.length);
            });

            this.model.each(function(model){
                self.addVersionView(model);
            });
        },

        addVersionView : function(data){
            var versionView = new VersionView({model: data});
            versionView.render();
            this.$('ul').append(versionView.$el);
        }
    });
    return VersionOverview;
});
