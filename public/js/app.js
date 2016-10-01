var App = {};
define([
    'Backbone',
    'jQuery',
    'appRouter',
    'views/mainView/mainView'
],function(Backbone,$,AppRouter,MainView){
    
    var initialize = function() {
        $.ajax({
            type: 'GET',
            wait:true,
            url: 'http://localhost:3030/user/current_user',
            success: function (model) {
                App = {
                    name:model.name,
                    login: model.login,
                    id:model._id,
                    role:model.role
                };
                var router = new AppRouter;
                var url;
                Backbone.history.start();
                url = window.location.hash;
                if (url == '') {
                    url = 'startView'
                }
                Backbone.history.fragment = '';
                Backbone.history.navigate(url, {trigger: true});
                var mainView = new MainView();
                mainView.render();
            },
            error: function (err) {
                return (err.responseText);
            }
        })
    };
    
    return {
        initialize:initialize
    }
});