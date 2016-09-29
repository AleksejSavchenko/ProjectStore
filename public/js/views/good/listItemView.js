define(['Backbone',
        'jQuery',
        'Underscore',
        'text!templates/good/userBody.html',
        'text!templates/good/adminBody.html'

    ],
    function (Backbone, $, _, userTemplate, adminTemplate){
        var View = Backbone.View.extend({

            initialize: function (options){
                if(App.role == 'admin'){
                    this.template = _.template(adminTemplate);
                }else{
                    if(App.role == 'user'){
                        this.template = _.template(userTemplate);
                    }
                }
                this.collection = options.collection;
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

