define(['Backbone',
        'jQuery',
        'Underscore',
        'views/user/listItemView',
        'views/user/editView',
        'models/user',
        'collections/user/collection',
        'text!templates/user/header.html'
    ],
    function (Backbone, $, _, ListItemView, EditView, Model, Collection, headerTemplate) {
        var View = Backbone.View.extend({
            el: '#contentHolder',
            contentType: 'user',
            template: _.template(headerTemplate),

            events: {
                'click #delete_button': 'deleteUser',
                'click #edit_button': 'editUser',
                'click #create_user': "addUser",
                'click #change_role_button': 'changeRoleUser',
                'click #filter_button': 'filter',
                'click #page_button': 'goToPage'
            },
            initialize: function (options) {
                var self = this;
                this.collection = options.collection;

                this.collection.on("reset change", function () {
                    self.showMoreContent()
                });
            },
            editUser: function (e) {
                var $targetEl = $(e.target);
                var $targetRow = $targetEl.closest('tr');
                var $checkbox = $targetRow.find('input');
                var id = $checkbox.attr('id');
                var model = this.collection.get(id);
                if (this.editView) {
                    this.editView.undelegateEvents();
                }
                this.editView = new EditView({
                    model: model,
                    collection: this.collection
                });
            },
            deleteUser: function (e) {
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
            addUser: function () {
                var model = new Model();
                if (this.editView) {
                    this.editView.undelegateEvents();
                }
                this.collection.add(model);
                this.editView = new EditView({
                    model: model,
                    collection: this.collection
                });
            },
            changeRoleUser: function (e) {
                var self = this;
                var newRole;
                var $targetEl = $(e.target);
                var $targetRow = $targetEl.closest('tr');
                var $checkbox = $targetRow.find('input');
                var id = $checkbox.attr('id');
                var model = this.collection.get(id);
                newRole = prompt('Please, set role:');
                if ($.inArray(newRole, ['user', 'admin']) < 0) {
                    alert('bad role');
                    return;
                }
                var saveData = {
                    role: newRole
                };
                model.save(saveData, {
                    patch: true,
                    wait: true,
                    success: function (model) {
                        alert('ROLE SUCCESSFULLY CHANGED');
                    },
                    error: function (err) {
                        alert(err.responseText);
                    }
                });

            },
            filter: function () {
                var self = this;
                var model;
                var login = $(".filter").val();
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3030/user/by_id/',// + id,
                    data: {login: login},
                    success: function (user) {
                        var id = user[0]._id;
                        model = self.collection.get(id);
                        self.model = model.attributes;
                        self.showMoreContentFilter();
                    },
                    error: function (err) {
                        alert(err.responseText);
                    }
                });
                //this.showMoreContentFilter();
            },
            goToPage: function () {
                var page = this.$el.find('#page').val() || 1;
                var count = this.$el.find('#count').val() || 5;
                var url = '#startView/user/page=' + page + '/count=' + count;
                //this.collection.fetch({data:{page:page,count:count},reset:true});
                Backbone.history.navigate(url, {trigger: true});
                //this.showMoreContent();

            },
            showMoreContent: function () {
                var $currentEl = this.$el;
                this.$itemsEl = $currentEl.find('.listTable');
                if (this.listItemView) {
                    this.listItemView.undelegateEvents();
                }
                this.listItemView = new ListItemView({
                    el: this.$itemsEl,
                    collection: this.collection
                });
            },
            showMoreContentFilter: function () {
                var $currentEl = this.$el;
                //$currentEl.html('');
                this.$itemsEl = $currentEl.find('.listTable');
                if (this.listItemView) {
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
                if (this.listItemView) {
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
