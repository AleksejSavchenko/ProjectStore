define(['Backbone',
        'jQuery',
        'Underscore',
        'views/purchases/listItemView',
        'views/user/editView',
        '../header/admin_header',
        'models/purchases',
        'collections/purchases/collection',
        'text!templates/purchases/header.html'
    ],
    function (Backbone, $, _, ListItemView, EditView,HeaderView, Model, Collection, headerTemplate) {
        var View = Backbone.View.extend({
            el: '#contentHolder',
            contentType: 'good',
            template: _.template(headerTemplate),

            events: {
                'click #add_to_cart':'addToCart'
            },
            initialize: function (options) {
                this.collection = options.collection;
            },
            addToCart:function (e) {
                var quantity;
                var $targetEl = $(e.target);
                var $targetRow = $targetEl.closest('tr');
                var $checkbox = $targetRow.find('input');
                var id = $checkbox.attr('id');
                var model = this.collection.get(id);
                console.log(model);

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
            render: function () {
                var $currentEl = this.$el;
                $currentEl.html('');
                $currentEl.append(this.template());

                this.$itemsEl = $currentEl.find('.listTable');
                this.listItemView = new ListItemView({
                    el: this.$itemsEl,
                    collection: this.collection
                });

                $currentEl.append(this.listItemView.render());
                return this;
            }
        });
        return View;
    });

