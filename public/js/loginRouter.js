define([
    'Backbone',
    'jQuery',
    'Underscore',
    'views/login/loginView'
],function (Backbone,$,_,LoginView){
    var LoginRouter = Backbone.Router.extend({
        routes:{
            ':any': 'loginUser'
        },
        loginUser:function () {
            var loginView;
            loginView = new LoginView();
            this.changeView(loginView);
        },
        initialize:function () {

        },
        changeView:function (contentView) {
            if(this.contentView){
                this.contentView.undelegateEvents()
            }
            this.contentView = contentView;
        }
    });
    return LoginRouter;
});