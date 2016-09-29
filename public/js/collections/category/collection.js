define([
    'Backbone',
    'Underscore',
    'models/category'
],function(Backbone,_,CategoryModel) {
    var CategoryCollection = Backbone.Collection.extend({
        model: CategoryModel,
        url: '/category',

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
    return CategoryCollection;

});