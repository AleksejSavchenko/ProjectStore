
define(['Backbone',
        'jQuery',
        'Underscore',
        'views/category/listItemView',
        'views/category/editView',
        'models/category',
        'collections/category/collection',
        'text!templates/category/header.html'
    ],
    function (Backbone, $, _, ListItemView, EditView, Model, Collection, headerTemplate) {
        var View = Backbone.View.extend({
            el: '#contentHolder',
            contentType: 'category',
            template: _.template(headerTemplate),

            events: {
                'click #edit_button':'editCategory',
                'click #delete_button':'deleteCategory',
                'click #create_category':'createCategory',
                'click #page_button':'goToPage'
            },
            initialize: function (options) {
                var self = this;
                this.collection = options.collection;

                this.collection.on("reset change", function(){
                    self.showMoreContent()
                });  
            },
            editCategory: function (e) {
                var $targetEl = $(e.target);
                var $targetRow = $targetEl.closest('tr');
                var $checkbox = $targetRow.find('input');
                var id = $checkbox.attr('id');
                var model = this.collection.get(id);
                if(this.editView){
                    this.editView.undelegateEvents();
                }
                this.editView = new EditView({
                    model:model,
                    collection:this.collection

                });

            },
            deleteCategory: function (e) {
                var $targetEl = $(e.target);
                var $targetRow = $targetEl.closest('tr');
                var $checkbox = $targetRow.find('input');
                var id = $checkbox.attr('id');
                var model = this.collection.get(id);
                this.collection.remove(model);
                model.destroy({
                    wait: true,
                    success: function (model) {
                        alert('DELETED SUCCESSFULLY');
                    },
                    error: function (err) {
                        alert(err.responseText);
                    }
                });
                this.showMoreContent();
            },
            createCategory:function () {
                var model = new Model();
                if(this.editView){
                    this.editView.undelegateEvents();
                }
                this.collection.add(model);
                this.editView = new EditView({
                    model:model,
                    collection:this.collection
                });
            },
            goToPage:function () {
                var page = this.$el.find('#page').val() || 1;
                var count = this.$el.find('#count').val() || 5;
                var url = '#startView/category/page=' + page + '/count=' + count;
                //this.collection.fetch({data:{page:page,count:count},reset:true});
                Backbone.history.navigate(url,{trigger:true});
            },
            showMoreContent:function () {
                var $currentEl = this.$el;
                this.$itemsEl = $currentEl.find('.listTable');
                if(this.listItemView){
                    this.listItemView.undelegateEvents();
                }
                this.listItemView = new ListItemView({
                    el: this.$itemsEl,
                    collection: this.collection
                });
            },

            render: function () {
                var $currentEl = this.$el;
                $currentEl.html('');
                $currentEl.append(this.template());

                this.$itemsEl = $currentEl.find('.listTable');
                this.$itemsEl.html('');
                if(this.listItemView){
                    this.listItemView.undelegateEvents();
                }
                this.listItemView = new ListItemView({
                    el: this.$itemsEl,
                    collection: this.collection
                });

                return this;
            }
        });
        return View;
    });
