'use strict';
define([
    'AnycookAPI',
    'Backbone',
    'models/RecipeModel',
    'models/StatusModel',
    'models/UserModel',
    'models/VersionModel',
    'views/HomeView',
    'views/RecipeOverview',
    'views/UserOverview',
    'views/VersionOverview',
    'AnycookAPI.recipe',
    'AnycookAPI.user'
], function(AnycookAPI, Backbone, RecipeModel, StatusModel, UserModel, VersionModel, HomeView, RecipeOverview, UserOverview, VersionOverview){
    var Backend = Backbone.Router.extend({
        routes : {
            "": "home",
            'messages': 'messages',
            "recipe": "recipes",
            "recipe/:recipeName": "versions",
            "users": "users"
        },
        home: function(){
            $('.nav li').removeClass('active');
            $('#nav_home').addClass('active');
            console.log("loading home");
            var status = new StatusModel();
            new HomeView({model:status});
        },
        recipes : function(){
            $('.nav li').removeClass('active');
            $('#nav_recipes').addClass('active');
            console.log("loading recipes");
            AnycookAPI.recipe(function(recipes){
                var recipeCollection = new Backbone.Collection(recipes,{
                    model: RecipeModel,
                    url : "http://10.1.0.200/backend/recipe"
                });
                var recipeOverview = new RecipeOverview({model:recipeCollection});
                $("#content").empty().append(recipeOverview.$el);
            });

        },
        versions : function(recipeName){
            $('.nav li').removeClass('active');
            $('#nav_recipes').addClass('active');
            console.log('loading versions for '+recipeName);
            AnycookAPI.recipe.version(recipeName, function(versions){
                var versionCollection = new Backbone.Collection(versions,{
                    model: VersionModel
                });

                var versionOverview = new VersionOverview({model:versionCollection, recipeName: recipeName});
                $("#content").empty().append(versionOverview.$el);
            });
        },
        users  : function(){
            $('.nav li').removeClass('active');
            $('#nav_users').addClass('active');
            AnycookAPI.user(function(users){
                var userCollection = new Backbone.Collection(users,{
                    model: UserModel,
                    url : "/anycook-backend/users"
                });
                var userView = new UserOverview({model:userCollection});
                $("#content").empty().append(userView.$el);
            });

        }
    });
    return Backend;
});

