define(['Backbone',
        'jQuery',
        'Underscore',
        'text!templates/user/body.html'
    ],
    function (Backbone, $, _, bodyTemplate){
        var View = Backbone.View.extend({

            template: _.template(bodyTemplate),

            initialize: function (options){
                this.collection = options.collection;
                if(options.model){
                    this.collection = options.model;
                }
                this.render();
            },
            render: function(){
                var jsonCollection = this.collection.toJSON();
                var thisTemplate = this.template({collection: jsonCollection});
                this.$el.html(thisTemplate);
            }
        });
        return View;
    });
