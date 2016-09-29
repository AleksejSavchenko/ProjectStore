define(['Backbone',
        'jQuery',
        'Underscore',
        'views/cart/listItemView',
        'models/cart',
        'collections/cart/collection',
        'text!templates/cart/header.html'
    ],
    function (Backbone, $, _, ListItemView, Model, Collection, headerTemplate) {
        var View = Backbone.View.extend({
            el: '#contentHolder',
            contentType: 'cart',
            template: _.template(headerTemplate),
            events:{
                'click #save':'changeCart',
                'click #delete':'deleteFromCart',
                'click #checkout':'checkout'
            },
            initialize: function (options) {
                var self = this;
                this.collection = options.collection;
                this.collection.on("reset change", function(){
                    self.showMoreContent()
                });
            },
            changeCart:function (e) {
                var $targetEl = $(e.target);
                var $targetRow = $targetEl.closest('tr');
                var $checkbox = $targetRow.find('input[type="checkbox"]');
                var id = $checkbox.attr('id');
                var $checkbox = $targetRow.find('input[type="text"]');
                var $newQuantity = $checkbox.val();
                
                var saveData = {
                    quantity:$newQuantity
                };
                
                $.ajax({
                    type: 'PATCH',
                    patch:true,
                    data: saveData,
                    url: 'http://localhost:3030/good/cart/'+id,
                    success: function (model) {

                    },
                    error:function(xhr,err){
                        alert(err.message);
                    }
                });
            },
            deleteFromCart:function (e) {
                var $targetEl = $(e.target);
                var $targetRow = $targetEl.closest('tr');
                var $checkbox = $targetRow.find('input[type="checkbox"]');
                var id = $checkbox.attr('id');
                var model = this.collection.get(id);
                this.collection.remove(model);
                model.destroy({
                    wait:true,
                    success:function(){
                        alert('success');
                    },
                    error:function(xhr,err){
                        alert(err.responseText);
                    }
                });
                this.showMoreContent();

            },
            checkout:function () {
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3030/user/purchases',
                    success: function () {
                        alert('SUCCESSED BOUGHT');
                    },
                    error:function(err){
                        alert(err.responseText);
                    }

                });
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
