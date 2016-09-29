define(['Backbone',
        'jQuery',
        'Underscore',
        'text!templates/purchases/body.html'
    ],
    function (Backbone, $, _, bodyTemplate){
        var View = Backbone.View.extend({

            template: _.template(bodyTemplate),

            initialize: function (options){
                this.collection = options.collection;
            },

            render: function(){
                var jsonCollection = this.collection.toJSON();
                var thisTemplate = this.template({collection: jsonCollection});
                this.$el.append(thisTemplate);
            }
        });
        return View;
    });
