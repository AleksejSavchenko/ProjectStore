define(['Backbone',
        'jQuery',
        'Underscore',
        'text!templates/header/admin_header.html'
    ],
    function (Backbone, $, _, headerTemplates) {
        var View = Backbone.View.extend({
            el: '#header',
            contentType: 'admin_header',
            template: _.template(headerTemplates),

            render: function () {
                var $currentEl = this.$el;
                $currentEl.html('');
                $currentEl.append(this.template());

                return this;
            }
        });
        return View;
    });
