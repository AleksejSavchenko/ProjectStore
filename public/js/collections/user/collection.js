define([
    'Backbone',
    'Underscore',
    'models/user'
],function(Backbone,_,UserModel) {
    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
        url: '/user',

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
    return UserCollection;

});