define([
    'Backbone',
    'models/UserModel'
], function(Backbone, UserModel){
    'use strict';
    var UserCollection = Backbone.Collection.extend({
        orderBy : 'id',
        invertOrder : false,
        model: UserModel,
        comparator : function(model1, model2){
            var result;
            var data1 = model1.get(this.orderBy);
            var data2 = model2.get(this.orderBy);

            if(this.orderBy === 'level'){
                if(data1 === data2){
                    var id1 = model1.get('id');
                    var id2 = model2.get('id');
                    result = -1 * (id1 === id2 ? 0 : id1 < id2 ? -1 : 1);
                }
                else {
                    result = data1 < data2 ? -1 : 1;
                }
            }
            else if(typeof data1 === 'string'){
                result = data1.localeCompare(data2);
            }
            else {
                result = data1 === data2 ? 0 : data1 < data2 ? -1 : 1;
            }
            return this.invertOrder ? -1 * result : result;
        }

    });

    return UserCollection;
});
