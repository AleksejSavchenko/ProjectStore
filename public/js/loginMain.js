require.config({
    paths: {
        jQuery : './libs/jquery/dist/jquery',
        Underscore : './libs/underscore/underscore',
        Backbone : './libs/backbone/backbone',
        templates : '../templates',
        text : './libs/text/text'
    },
    shim : {
        'login' : ['Backbone'],
        'Backbone' : ['Underscore', 'jQuery'],
        'Underscore' : {
            exports: '_'
        },
        'jQuery' : {
            exports : '$'
        }
    }
});
require(['jQuery', 'login'], function($, login){
    login.initialize();
});
