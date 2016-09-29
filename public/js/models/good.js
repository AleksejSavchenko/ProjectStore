
define([
    'Backbone'
], function(Backbone){
    var GoodModel = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/good',

        initialize: function () {
            
        }
    });
    return GoodModel;
});
