define([
    'Backbone',
    'Underscore',
    'models/purchases'
],function(Backbone,_,PurchaseModel) {
    var UserCollection = Backbone.Collection.extend({
        model: PurchaseModel,
        url: 'user/purchases',

        initialize: function (opts) {
            this.fetch({
                reset: true
            })
        }
    });
    return UserCollection;

});