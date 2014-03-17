'use strict';
define([
    'AnycookAPI',
    'Backbone',
    'models/RecipeCollection',
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
], function(AnycookAPI, Backbone, RecipeCollection, RecipeModel, StatusModel, UserModel, VersionModel, HomeView, RecipeOverview, UserOverview, VersionOverview){
    var Backend = Backbone.Router.extend({
        routes : {
            '': 'home',
            'messages': 'messages',
            'recipe': 'recipes',
            'recipe/:recipeName': 'versions',
            'users': 'users'
        },
        home: function(){
            $('.nav li').removeClass('active');
            $('#nav_home').addClass('active');
            console.log('loading home');
            AnycookAPI._get('/backend/status', {}, function(json){
                var status = new StatusModel(json);
                new HomeView({model:status});
            });
        },
        recipes : function(){
            $('.nav li').removeClass('active');
            $('#nav_recipes').addClass('active');
            console.log('loading recipes');
            AnycookAPI.recipe(true, function(recipes){
                var recipeCollection = new RecipeCollection(recipes);
                var recipeOverview = new RecipeOverview({model:recipeCollection});
                $('#content').empty().append(recipeOverview.$el);
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
                $('#content').empty().append(versionOverview.$el);
            });
        },
        users  : function(){
            $('.nav li').removeClass('active');
            $('#nav_users').addClass('active');
            AnycookAPI.user(function(users){
                var userCollection = new Backbone.Collection(users,{
                    model: UserModel,
                });
                var userView = new UserOverview({model:userCollection});
                $('#content').empty().append(userView.$el);
            });

        }
    });
    return Backend;
});

