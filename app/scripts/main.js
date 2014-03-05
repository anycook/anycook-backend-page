/**
 * @license This file is part of anycook. The new internet cookbook
 * Copyright (C) 2014 Jan Graßegger
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see [http://www.gnu.org/licenses/].
 *
 * @author Jan Graßegger <jan@anycook.de>
 */
'use strict';
// Require.js allows us to configure shortcut alias
require.config({
    baseUrl : 'scripts',
    paths : {
        'AnycookAPI': '../bower_components/anycook-api-js/src/anycookapi',
        'AnycookAPI.autocomplete': '../bower_components/anycook-api-js/src/anycookapi.autocomplete',
        'AnycookAPI.backend': '../bower_components/anycook-api-js/src/anycookapi.backend',
        'AnycookAPI.category': '../bower_components/anycook-api-js/src/anycookapi.category',
        'AnycookAPI.discover': '../bower_components/anycook-api-js/src/anycookapi.discover',
        'AnycookAPI.discussion': '../bower_components/anycook-api-js/src/anycookapi.discussion',
        'AnycookAPI.ingredient': '../bower_components/anycook-api-js/src/anycookapi.ingredient',
        'AnycookAPI.life': '../bower_components/anycook-api-js/src/anycookapi.life',
        'AnycookAPI.message': '../bower_components/anycook-api-js/src/anycookapi.message',
        'AnycookAPI.recipe': '../bower_components/anycook-api-js/src/anycookapi.recipe',
        'AnycookAPI.registration': '../bower_components/anycook-api-js/src/anycookapi.registration',
        'AnycookAPI.search': '../bower_components/anycook-api-js/src/anycookapi.search',
        'AnycookAPI.session': '../bower_components/anycook-api-js/src/anycookapi.session',
        'AnycookAPI.setting': '../bower_components/anycook-api-js/src/anycookapi.setting',
        'AnycookAPI.tag': '../bower_components/anycook-api-js/src/anycookapi.tag',
        'AnycookAPI.upload': '../bower_components/anycook-api-js/src/anycookapi.upload',
        'AnycookAPI.user': '../bower_components/anycook-api-js/src/anycookapi.user',
        'Backbone': '../bower_components/backbone/backbone',
        'jquery' : '../bower_components/jquery/jquery',
        'text' : '../bower_components/requirejs-text/text',
        'templates' : '../templates',
        'tpl': '../bower_components/requirejs-tpl-jfparadis/tpl',
        'underscore' : '../bower_components/underscore/underscore'
    },
    shim : {
        'AnycookAPI' : {
            deps : ['jquery'],
            exports : 'AnycookAPI'
        },
        'AnycookAPI.autocomplete' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.backend' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.category' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.discover' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.discussion' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.ingredient' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.life' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.message' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.recipe' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.registration' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.search' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.session' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.setting' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.tag' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.upload' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'AnycookAPI.user' : {
            deps : ['AnycookAPI'],
            exports: 'AnycookAPI'
        },
        'jquery': {
            exports: '$'
        },
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        'underscore' : {
            exports : '_'
        }
    },
    tpl: {
        extension: '.erb' // default = '.html'
    }
});

require([
    'jquery',
    'AnycookAPI',
    'Backbone',
    'Backend',
    'AnycookAPI.session'
], function($, AnycookAPI, Backbone, Backend){
    $.support.cors = true;

    $.ajaxSetup({
        global:true,
        scriptCharset: "utf8" ,
        contentType: "application/x-www-form-urlencoded; charset=utf8"
    });

    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.xhrFields = {
          withCredentials: true
        };
    });

    $.when(AnycookAPI.init({appid:1, baseUrl: "http://10.1.0.200"})).then(function(){
        AnycookAPI.session(function(response){
            console.log('logged in as '+response.name);
            //initialize routers
            new Backend();
            Backbone.history.start({pushState: false});
        },
        function(response){
            window.location.href = 'http://localhost:9000';
        });
    });



    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router.  If the link has a data-bypass
    // attribute, bypass the delegation completely.
    $(document).on("click", "a:not([data-bypass])", function(evt) {
        // Get the anchor href and protcol
        var href = $(this).attr("href");
        var protocol = this.protocol + "//";

        // Ensure the protocol is not part of URL, meaning its relative.
        if (href && href.slice(0, protocol.length) !== protocol &&
            href.indexOf("javascript:") !== 0) {
          // Stop the default event to ensure the link will not cause a page
          // refresh.
          evt.preventDefault();

          // `Backbone.history.navigate` is sufficient for all Routers and will
          // trigger the correct events.  The Router's internal `navigate` method
          // calls this anyways.
          Backbone.history.navigate(href, true);
        }
    });

});
