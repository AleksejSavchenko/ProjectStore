define(['Backbone',
        'jQuery',
        'Underscore',
        'models/user',
        'collections/user/collection',
        'text!templates/header/user_header.html',
        'text!templates/header/admin_header.html'
 ],
    function (Backbone, $, _, Model,Collection, userTemplate, adminTemplate) {
        var theTemplate = adminTemplate;
        var View = Backbone.View.extend({
            el: '#headerHolder',
            contentType: 'headerView',
            template: _.template(theTemplate),
            events:{
                'click #logout_button':'logout',
                'click #user_good_button':'userGoods',
                'click #cart_button':'cart',
                'click #profile_button':'profile',
                'click #purchases_button':'purchases',
                'click #users_button':'users',
                'click #admin_good_button':'userGoods',
                'click #categories_button':'categories'
            },
            initialize: function () {
                if(App.role == 'admin'){
                    this.template = _.template(adminTemplate);
                }else{
                    if(App.role == 'user'){
                        this.template = _.template(userTemplate);
                    }
                }
            },
            logout:function () {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:3030/user/logout',
                    success: function () {
                        alert('You loged out');
                        location.reload();
                    },
                    error:function(err){
                        alert(err.responseText);
                    }
                });
            },
            userGoods:function () {
                Backbone.history.navigate('#startView/good',{trigger:true});
            },
            cart:function () {
                Backbone.history.navigate('#startView/cart',{trigger:true});
            },
            profile:function () {
                Backbone.history.navigate('#startView/profile',{trigger:true});
            },
            purchases:function () {
                Backbone.history.navigate('#startView/purchases',{trigger:true});
            },
            users:function () {
                Backbone.history.navigate('#startView/user',{trigger:true});
            },
            categories:function () {
                Backbone.history.navigate('#startView/category',{trigger:true});
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
