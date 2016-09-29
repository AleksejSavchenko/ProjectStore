define(['Backbone',
        'jQuery',
        'Underscore',
        'text!templates/login/login.html',
        'models/user'
],
    function (Backbone, $, _, loginTemplate, Model) {
        var View = Backbone.View.extend({
            el: '#body',
            contentType: 'login',
            template: _.template(loginTemplate),

            events: {
                "click #submit_register" : "createUser",
                "click #submit_login" : "loginUser"
            },

            initialize: function () {
                 this.render();
            },
            createUser:function () {
                var self = this;
                this.model = new Model();
                var name = this.$el.find('#form_reg_name').val().trim();
                var login = this.$el.find('#form_reg_login').val().trim();
                var password = this.$el.find('#form_reg_pass').val().trim();
                var saveData = {
                    name:name,
                    login:login,
                    password:password
                };
                this.model.save(saveData, {
                    wait: true,
                    success: function () {
                        alert('SUCCESSFULLY CREATED');
                       location.reload();
                    },
                    error: function (err) {
                        alert(err.responseText);
                    }
                });
            },
            loginUser:function () {
                var login;
                var password;
                var saveData;
          
                login = this.$el.find('#form_login').val().trim();
                password = this.$el.find('#form_pass').val().trim();
          
                saveData = {
                    login:login,
                    password:password
                };
                
                $.ajax({
                    type: 'POST',
                    data: saveData,
                    url: 'http://localhost:3030/user/login',
                    success: function (user) {
                        alert('You login as ' + user.login);
                        location.reload();
                    },
                    error:function(err){
                        console.log(err);
                        alert(err.responseText);
                    }
                });
            },
            render: function () {
                var $currentEl = this.$el;
                $currentEl.html('');
                $currentEl.append(this.template());

                return this;
            }
        });
        return View;
    });
