var App = {};
require.config({
    paths: {
        jQuery : './libs/jquery/dist/jquery',
        Underscore : './libs/underscore/underscore',
        Backbone : './libs/backbone/backbone',
        templates : '../templates',
        text : './libs/text/text'
    },
    shim : {
        'app' : ['Backbone'],
        'Backbone' : ['Underscore', 'jQuery'],
        'Underscore' : {
            exports: '_'
        },
        'jQuery' : {
            exports : '$'
        }
    }
});
require(['jQuery', 'app'], function($, app){
    app.initialize();
});
