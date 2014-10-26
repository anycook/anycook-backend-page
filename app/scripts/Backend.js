'use strict';
define([
    'AnycookAPI',
    'Backbone',
    'models/RecipeCollection',
    'models/UserCollection',
    'models/StatusModel',
    'models/UserModel',
    'models/VersionCollection',
    'views/HomeView',
    'views/RecipeOverview',
    'views/TagOverview',
    'views/LifesOverview',
    'views/UserDetailview',
    'views/UserOverview',
    'views/VersionOverview',
    'AnycookAPI.recipe',
    'AnycookAPI.user'
], function(AnycookAPI, Backbone, RecipeCollection, UserCollection, StatusModel, UserModel, VersionCollection,
    HomeView, RecipeOverview, TagOverview, LifesOverview, UserDetailview, UserOverview, VersionOverview){
    var Backend = Backbone.Router.extend({
        routes : {
            '': 'home',
            'lifes': 'lifes',
            'messages': 'messages',
            'recipe': 'recipes',
            'recipe/:recipeName': 'versions',
            'tag': 'tags',
            'user': 'users',
            'user/:userId': 'user'
        },
        initialize : function(){
            //this.credentials = JSON.parse(anycookCredentials);
        },
        home: function(){
            $('.nav li').removeClass('active');
            $('#nav_home').addClass('active');
            console.log('loading home');
            AnycookAPI._get('/backend/status', {}, function(status){
                AnycookAPI._get('/backend/conf', {}, function(conf){
                    new HomeView({conf:conf, status:status});
                });
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
                var versionCollection = new VersionCollection(versions, {recipeName : recipeName});
                var versionOverview = new VersionOverview({model:versionCollection});
                $('#content').html(versionOverview.$el);
                versionOverview.render();
            });
        },
        tags : function(){
            $('.nav li').removeClass('active');
            $('#nav_tags').addClass('active');
            var tagOverview = new TagOverview();
            $('#content').html(tagOverview.el);
            tagOverview.render();
        },
        lifes : function() {
            $('.nav li').removeClass('active');
            $('#nav_lifes').addClass('active');
            var lifesOverview = new LifesOverview();
            $('#content').html(lifesOverview.el);
        },
        users  : function(){
            $('.nav li').removeClass('active');
            $('#nav_users').addClass('active');
            AnycookAPI.user(true, function(users){
                var userCollection = new UserCollection(users);
                var userView = new UserOverview({model:userCollection});
                $('#content').empty().append(userView.$el);
            });
        },
        user : function(userId){
            $('.nav li').removeClass('active');
            $('#nav_users').addClass('active');
            AnycookAPI.user(userId, true, function(user){
                var userModel = new UserModel(user);
                var userView = new UserDetailview({model:userModel});
                $('#content').empty().append(userView.$el);
            });
        }
    });
    return Backend;
});

