define(['Backbone',
        'jQuery',
        'Underscore',
        'text!templates/edit/userEdit.html'
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
                var self = this;
                var name = this.$el.find('#name').val().trim();
                var login = this.$el.find('#login').val().trim();
                var password = this.$el.find('#password').val().trim();

                var saveData = {
                    name:name,
                    login:login,
                    password:password
                };
                this.model.save(saveData,{
                    patch:true,
                    wait:true,
                    success:function(model){
                        alert('success');
                        $('.edit_space').html('')
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
