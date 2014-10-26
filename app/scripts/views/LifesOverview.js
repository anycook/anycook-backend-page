define([
    'bootstrap.modal',
    'underscore',
    'AnycookAPI.case',
    'Backbone',
    'models/CaseCollection',
    'models/CaseModel',
    'views/CaseView',
    'tpl!templates/lifesOverview'
], function ($, _, AnycookAPI, Backbone, CaseCollection, CaseModel, CaseView, lifesOverviewTemplate) {
    'use strict';
    return Backbone.View.extend({
        id: 'lifesOverview',
        events : {
            'keyup #search' : 'changeSearch',
            'click #addCase': 'showAddCaseDialog',
            'click #saveCaseButton' : 'addCase'
        },
        initialize : function(){
            _.bindAll(this, 'render');
            var self = this;
            AnycookAPI.case(function(cases) {
                var caseCollection =  new CaseCollection(cases);
                self.collection = caseCollection;
                self.collection.bind('sync', self.render);
                self.collection.bind('change', self.render);
                self.collection.bind('remove', self.render);
                self.render();
            });
        },
        render : function(){
            var self = this;
            var collection = this.collection;
            this.$el.html(lifesOverviewTemplate({
                invertOrder : collection.invertOrder,
                numCases : collection.length,
                orderBy : collection.orderBy
            }));

            collection.each(function(model) {
                self.addCaseView(model);
            });

            this.$('#addCaseModal').modal({
                show : false
            });
        },
        addCaseView : function(model) {
            var cAse = new CaseView({model: model});
            this.$('table').append(cAse.$el);
        },
        showAddCaseDialog : function() {
            this.$('#addCaseModal input').val('');
            this.$('#addCaseModal').modal('show');
        },
        addCase : function() {
            this.$('#addCaseModal').modal('hide');
            var name = this.$('#inputName').val();
            var syntax = this.$('#inputSyntax').val();
            var newModel = new CaseModel({
                name : name,
                syntax : syntax
            });
            newModel.save();
            this.collection.add(newModel);
        }
    });
});
