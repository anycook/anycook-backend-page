'use strict';
define([
    'Backbone'
], function(Backbone){
    return Backbone.Model.extend({
        //idAttribute : 'name',
        initialize : function(){
            var id;
            if(this.get('recipeName')) { id =  this.get('recipeName')+'/'+this.get('name'); }
            else { id = this.get('name'); }
            this.set('id', id);
        },
        defaults : {
            name : null,
            recipeNumber : null,
            recipeName : null,
            suggester : null,
            active : null,
            visible : true
        },
        url : function(){
            if(this.get("recipeName")) {
                return AnycookAPI._settings().baseUrl+'/recipe/'+this.get('recipeName')+'/tags/'+this.get('name');
            }
        }
    });
});
