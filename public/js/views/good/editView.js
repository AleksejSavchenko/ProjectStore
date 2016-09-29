define(['Backbone',
        'jQuery',
        'Underscore',
        'text!templates/edit/goodEdit.html'
    ],
    function (Backbone, $, _,EditUser) {
        var EditView = Backbone.View.extend({
            el:"#editHolder",
            template:_.template(EditUser),
            initialize: function () {
                this.render();
            },
            events:{
                'click #userSave':'saveUser'
            },
            saveUser:function () {
                var name = this.$el.find('#name').val().trim();
                var price = this.$el.find('#price').val().trim();
                var category_id = this.$el.find('#category_id').val().trim();

                var saveData = {
                    name:name,
                    price:price,
                    category_id:category_id
                };
                this.model.save(saveData,{
                    patch:true,
                    wait:true,
                    success:function(model){
                        alert('success');
                    },
                    error:function(err){
                        alert(err.responseText);
                    }
                });
            },
            render: function () {
                var userData = this.model.toJSON();
                this.$el.html(this.template({user:userData}));
                return this;
            }
        });
        return EditView;
    });
