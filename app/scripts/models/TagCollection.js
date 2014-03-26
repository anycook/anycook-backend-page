define([
    'Backbone',
    'AnycookAPI',
    'models/TagModel'
], function(Backbone, AnycookAPI, TagModel){
    'use strict';
    return Backbone.Collection.extend({
        orderBy : 'recipeNumber',
        invertOrder : true,
        model: TagModel,
        url : function(){
            return AnycookAPI._settings().baseUrl+'/recipe/tag?active=false';
        },
        comparator : function(model1, model2){
            var orderBy = this.orderBy;

            if(orderBy === 'suggester') { orderBy = 'suggester.name'; }

            var result;
            var data1 = model1.get(this.orderBy);
            var data2 = model2.get(this.orderBy);

            if(orderBy === 'activeId'){
                if(data1 >= 0) { data1 = 0; }
                if(data2 >= 0) { data2 = 0; }
                if(data1 === data2) { result = model1.get('name').localeCompare(model2.get('name')); }
                else { result = data1 < data2 ? -1 : 1; }
            }
            else if(typeof data1 === 'string'){
                result = model1.get(orderBy).localeCompare(model2.get(orderBy));
            }
            else {
                result = data1 === data2 ? 0 : data1 < data2 ? -1 : 1;
            }
            return this.invertOrder ? -1 * result : result;
        }

    });
});
