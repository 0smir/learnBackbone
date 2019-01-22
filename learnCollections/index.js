    var Person = Backbone.Model.extend({

        defaults: {
            name: 'Dima',
            age: 23,
            job: 'developer'
        }

    });

    var PersonsCollection = Backbone.Collection.extend({
        model: Person,
    });

    var PersonView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-item',
        template: '#person',

        initialize:function () {
            this.render()
        },

        render: function () {
            var template = _.template($(this.template).html());
            this.$el.html(template(this.model.toJSON()));
            // console.log(this.$el.html(template(this.model.toJSON())));
        }
    });

    var person = new Person({name: 'Andrew', age: 29});
    var personView = new PersonView({
    model: person
    });

    var personTwo = new Person({name: 'Taras', age: 20, job: 'Manager'});
    var personViewTwo = new PersonView({
        model: personTwo
    });

   var personsCollection = new PersonsCollection();


    personsCollection.add(person);
    personsCollection.add(personTwo);