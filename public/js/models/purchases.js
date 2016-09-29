
define([
    'Backbone'
], function(Backbone){
    var PurchModel = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: 'user/purchases',

        initialize: function () {
           
        }
    });
    return PurchModel;
});
