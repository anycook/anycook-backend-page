define([
    'jquery',
    'Backbone',
    'models/StatusModel',
    'tpl!templates/homeView'
], function($, Backbone, StatusModel, homeViewTemplate){
    var HomeView = Backbone.View.extend({
        id      : "home",
        events  : {
            "click #copymysql"      : "copymysql",
            "click #rebuildIndex"   : "rebuildIndex"
        },
        initialize : function(){
            $("#content").empty().append(this.$el);
            var model = this.model;
            _.bindAll(this, "render");
            this.render();
            model.on("change", this.render);

            var $el = this.$el;
            model.fetch();

            /*var i = setInterval(function() {
                if(!$el.parent())
                    clearInterval(i);
                else
                    model.fetch();
            }, 10000);*/
        },
        render: function(){
            var $el = this.$el;
            var model = this.model;

            var variables = {
                dailyrecipe : model.get("dailyDish"),
                recipes     : model.get("recipes"),
                users       : model.get("users"),
                ingredients : model.get("ingredients"),
                tags        : model.get("tags"),
                active      : 0,
                maxActive   : 0,
                idle        : 0,
                maxIdle     : 0
            }

            var connectionStatus = model.get("connectionStatus");
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
        copymysql   : function(event){
            if(confirm("Wirklich kopieren? Die aktuelle Datenbank geht dabei verloren!")){
                $.get("anycook-backend/copymysql", function(){
                    alert("DB wurde vollständig kopiert");
                });
            }
        },
        rebuildIndex : function(event){
            $.post("anycook-backend/index", function(){
                alert("index neu generiert");
            })
        }
    });
    return HomeView;
});
