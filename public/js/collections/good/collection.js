define([
    'Backbone',
    'Underscore',
    'models/good'
],function(Backbone,_,GoodModel) {
    var GoodCollection = Backbone.Collection.extend({
        model: GoodModel,
        url: '/good',

        initialize: function (opts) {
            var page = opts.page || 1;
            var count = opts.count || 5;
            this.fetch({
                data:{
                    page:page,
                    count:count
                },
                reset: true
            })
        }
    });
    return GoodCollection;

});