'use strict';
define([
    'Backbone',
    'AnycookAPI',
    'models/VersionModel'
], function(Backbone, AnycookAPI, VersionModel){
    var versionCollection = Backbone.Collection.extend({
        model: VersionModel,
        initialize : function(models, options){
            this.options = options;
        },
        comparator : function(model1, model2){
            var id1 = model1.get('id');
            var id2 = model2.get('id');
            return id1 === id2 ? 0 : id1 < id2 ? 1 : -1;
        },
        url: function(){
            return AnycookAPI._settings().baseUrl+'/recipe/'+this.options.recipeName+'/version';
        }
    });

    return versionCollection;
});
