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

        initialize:function () {
            // console.log('PersonView.model', this.model);
        },
        
        render: function () {
            console.log(this.$el.html(this.model.get('name') + '(age:' + this.model.get('age') + ', job:' + this.model.get('job') +')'));
        }
    });

    var person = new Person;
    var personView = new PersonView({
        model: person
    });

    personView.render();
