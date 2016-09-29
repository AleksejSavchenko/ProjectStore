define([
    'Backbone',
    'jQuery',
    'Underscore'
],function (Backbone,$,_){
    var AppRouter = Backbone.Router.extend({
        routes:{
            'startView/:contentType(/page=:page)(/count=:count)':'getContent'
        },
        initialize:function () {
        },
        getContent:function(contentType,page,count){
            var self = this;
            var currentCT = contentType;
            var viewUrl = 'views/' + currentCT + '/listView';
            var collectionUrl = 'collections/' + currentCT + '/collection';
             
            page = page || 1;
            count = count || 5;
            
            require([
                collectionUrl,
                viewUrl
            ],function (Collection,View) {
                
                var collectionOptions = {
                    page:page,
                    count:count
                };
                
                var collection = new Collection(collectionOptions);

                var viewOptions = {
                    contentType:currentCT,
                    page:page,
                    count:count,
                    collection:collection
                };
                
                collection.bind('reset', _.bind(function () {
                    var contentView;
                    collection.unbind('reset');
                    contentView = new View(viewOptions);
                    self.changeView(contentView);
                    contentView.render();
                }))
            })
        },
        changeView:function (contentView) {
            if(this.contentView){
                this.contentView.undelegateEvents()
            }
            this.contentView = contentView;
        }
    });
    return AppRouter;

});