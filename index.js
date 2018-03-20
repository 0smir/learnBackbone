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
    },

    getPriceInRUB: function(rate) {
        return this.get('price') * rate;
    }

});

var ad = new Advertisement({

    make: 'Mazda',
    model: 'Atenza',
    year: 2007,
    price: 1700000

});



console.log('ad price: ', ad.get('price'));
console.log('ad make: ', ad.get('make'));
console.log('ad year', ad.get('year'));

ad.set('year', 2016, {silent: true});

console.log('ad year after update: ', ad.get('year'));


var  attrAD = ad.toJSON();

console.log('attrAD: ', attrAD);

ad.set('price', 120000);
console.log('ad price update: ', ad.get('price'));
ad.set('year', 2017);
console.log('ad year update again: ', ad.get('year'));