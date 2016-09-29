
define([
    'Backbone'
], function(Backbone){
    var CategoryModel = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/category',

        initialize: function () {
        }
    });
    return CategoryModel;
});
