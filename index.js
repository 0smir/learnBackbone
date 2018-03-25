var Advertisement = Backbone.Model.extend({
    defaults: {
        make: 'Toyota',
        model: 'Corolla',
        year: 2010,
        price: 2000000
    },

    initialize: function () {
        console.log('Create a new copy of Advertisement model!');

        this.on('change:price', function () {
            alert('New price was set!' + this.get('price'));
        });

        this.on('change:year', function () {
            alert('New year was set!' + this.get('year'));
        });
        this.on('invalid', function (model, error) {
            alert(error);
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
    }

});

var ad = new Advertisement({

    make: 'Mazda',
    model: 'Atenza',
    year: 2007,
    price: 1700000,
    odometer:70000

});





console.log('ad price: ', ad.get('price'));
console.log('ad make: ', ad.get('make'));
console.log('ad year', ad.get('year'));

// ad.set('year', 2016, {silent: true});

// console.log('ad year after update: ', ad.get('year'));


var  attrAD = ad.toJSON();

console.log('attrAD: ', attrAD);
//
// ad.set('price', -120000, {validate: true});
// console.log('ad price update: ', ad.get('price'));
// ad.set('year', 2017);
// console.log('ad year update again: ', ad.get('year'));

var RUBJPY = 0.32;
console.log('price in RUB: ', ad.getPriceInRUB(RUBJPY));



var AdvertisementViev = Backbone.View.extend({
    tagName: 'li',

    template: _.template("Продам <%= make %> <%= model %> за <%= price %> иен"),

    initialize: function () {
      this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var advertismentView = new AdvertisementViev({ model: ad });
// advertismentView.render();
console.log('advertismentView: ', advertismentView.model.get('make'));

console.log('advertismentView odometr', advertismentView.model.getPricePerKilometerTravelled());
console.log('attention: ', advertismentView.el);