define([
    'Backbone',
    'Underscore',
    'models/cart'
],function(Backbone,_,CartModel) {
    var CartCollection = Backbone.Collection.extend({
        model: CartModel,
        url: 'good/cart',

        initialize: function (opts) {
            this.fetch({
                reset: true
            })
        }
    });
    return CartCollection;

});