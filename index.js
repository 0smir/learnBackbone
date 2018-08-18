(function () {

    window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    window.template = function (id) {
        return _.template($('#' + id).html());
    };


    //модель рекламного объявления
    App.Models.Advertisement = Backbone.Model.extend({
        defaults: {
            make: 'Toyota',
            model: 'Corolla',
            year: 2010,
            price: 2000000
        },


        initialize: function () {
            // console.log('Create a new copy of Advertisement model!');

            this.on('change:price', function () {
                console.log('New price was set!' + this.get('price'));
            });

            this.on('change:year', function () {
                console.log('New year was set!' + this.get('year'));
            });
            this.on('invalid', function (model, error) {
                console.log(error);
            });
        },

        validate: function(attrs) {
            if (attrs.price < 0) {
                return 'Цена не может быть отрицательной';
            }
        },

        getPriceInRUB: function(rate) {
            return this.get('price') * rate;
        },
        getPricePerKilometerTravelled: function () {
           return (this.get('price')/this.get('odometer')).toFixed(2);
        },

        setError: function (model, error) {
            console.log(error);
        },

    });

    //экземпляр объявления
    var ad = new App.Models.Advertisement();



    //коллекция объявлений
    App.Collections.CarCollection = Backbone.Collection.extend({
        model: App.Models.Advertisement
    });

    //вид одного объявдения
    App.Views.adElement = Backbone.View.extend({
        tagName: 'li',

        className: 'list-item',

        template: template('ad_template'),

        initialize: function () {
            // this.listenTo(this.model, 'run', this.render);
            // this.model.trigger('run');
            this.render();
        },

        render: function () {
            // console.log('render');
            this.$el.html( this.template(this.model.toJSON()));

            return this;
        }

    });

    //вид списка объявлений
    App.Views.CarList = Backbone.View.extend({
        tagName: 'ul',

        initialize: function () {
            // console.log('this.collection', this.collection);
            // this.render();
        },
        render: function () {
            this.collection.each(function (modelItem) {
                var item = new App.Views.adElement({ model: modelItem});

                this.$el.append(item.render().el);
            }, this);

            return this;
        }
    });


    //экземпляр коллекции
    var adList = new App.Collections.CarCollection([
        {
            make: 'Toyota',
            model: 'Camry',
            year: 2017,
            price: 8000000
        },
        {
            make: 'Mercedes',
            model: 'Smart',
            year: 2015,
            price: 19000000
        },
        {
            model: 'Lexus',
            year: 2015,
            price: 45000000
        }
    ]);


    //экземпляр вида списка объявлений
    var carListView = new App.Views.CarList({
        collection: adList
    });


    $(document.body).append(carListView.render().el);

})();
