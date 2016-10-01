define(['Backbone',
        'jQuery',
        'Underscore',
        'views/good/listItemView',
        'views/good/editView',
        'models/good',
        'collections/good/collection',
        'text!templates/good/userHeader.html',
        'text!templates/good/adminHeader.html'

    ],
    function (Backbone, $, _, ListItemView, EditView, Model, Collection, userTemplate, adminTemplate) {
        var View = Backbone.View.extend({
            el: '#contentHolder',
            contentType: 'good',

            events: {
                'click #add_to_cart':'addToCart',
                'click #admin_delete_button':'deleteGood',
                'click #admin_edit_button':'editGood',
                'click #create_good':'addGood',
                'click #page_button':'goToPage'

            },

            initialize: function (options) {
                var self =this;
                if(App.role == 'admin'){
                    this.template = _.template(adminTemplate);
                }else{
                    if(App.role == 'user'){
                        this.template = _.template(userTemplate);
                    }
                }
                this.collection = options.collection;
                this.collection.on('reset change', function(){
                    self.showMoreContent();
                });
            },
            addToCart:function (e) {
                var quantity;
                var $targetEl = $(e.target);
                var $targetRow = $targetEl.closest('tr');
                var $checkbox = $targetRow.find('input');
                var id = $checkbox.attr('id');

                quantity = prompt('Please, set quantity:');
                var saveData = {
                    quantity:quantity
                };
                    $.ajax({
                        type: 'PATCH',
                        patch:true,
                        wait:true,
                        data: saveData,
                        url: 'http://localhost:3030/good/cart/' + id,
                        success: function (cart) {

                    },
                        error:function(err){
                            alert(err.responseText);
                    }

                });
            },
            deleteGood: function (e) {
                var $targetEl = $(e.target);
                var $targetRow = $targetEl.closest('tr');
                var $checkbox = $targetRow.find('input');
                var id = $checkbox.attr('id');
                var model = this.collection.get(id);
                this.collection.remove(model);
                model.destroy({
                    success:function(model){
                        alert('DELETED SUCCESSFULLY');
                    },
                    error:function (err) {
                        alert(err.responseText)
                    }
                });
                this.showMoreContent();

            },  
            editGood: function (e) {
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
            addGood:function () {
                var model = new Model;
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
                var url = '#startView/good/page=' + page + '/count=' + count;
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
            }
        });
        return View;
    });
