define([
    'Backbone'
], function(Backbone){
    var UserModel = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/user',
        
        initialize: function () {

        }
    });
    return UserModel;
});
