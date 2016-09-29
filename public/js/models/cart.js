
define([
    'Backbone'
], function(Backbone){
    var CartModel = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: 'good/cart',

        initialize: function () {

        }
    });
    return CartModel;
});
