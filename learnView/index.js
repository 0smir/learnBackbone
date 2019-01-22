    var Person = Backbone.Model.extend({

        defaults: {
            name: 'Dima',
            age: 23,
            job: 'developer'
        }

    });

    var PersonView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-item',
        template: '#person',

        initialize:function () {
            // console.log('PersonView.model', this.model);
        },
        
        render: function () {
            var template = _.template($(this.template).html());
                this.$el.html(template(this.model.toJSON()));
            console.log(this.$el.html(template(this.model.toJSON())));
        }
    });

    var person = new Person;
    var personView = new PersonView({
        model: person
    });

    personView.render();
    $('body').append(personView.el);

