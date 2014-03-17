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

            if(typeof data1 === 'string'){
                result = model1.get(this.orderBy).localeCompare(model2.get(this.orderBy));
            }
            else {
                result = data1 === data2 ? 0 : data1 < data2 ? -1 : 1;
            }
            return this.invertOrder ? -1 * result : result;
        }

    });

    return UserCollection;
});
