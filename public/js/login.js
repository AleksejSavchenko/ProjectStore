define([
    'Backbone',
    'jQuery',
    'loginRouter'
],function(Backbone,$,LoginRouter){

    var initialize = function(){
        var router = new LoginRouter;
        var url;
        Backbone.history.start({silent:true});
        url = window.location.hash;
        if(url !='login'){
            url = 'login';
        }
        Backbone.history.fragment = '';
        Backbone.history.navigate(url,{trigger:true});
    };
    return {
        initialize:initialize
    }
});