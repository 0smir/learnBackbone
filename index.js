var Advertisement = Backbone.Model.extend({
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




var ad = new Advertisement({

    make: 'Mazda',
    model: 'Atenza',
    year: 2007,
    price: 1700000,
    odometer:70000,


});

// ad.set('price', -120000, {validate: true});

var carCollection = Backbone.Collection.extend({
    model: Advertisement
});


var Element = Backbone.View.extend({

    parent: 'ol',

    tagName: 'li',
    className: 'list-item',
    template: _.template($('#ad_template').html()),
    
    initialize: function () {
        // this.listenTo(this.model, 'run', this.render);
        // this.model.trigger('run');
        this.render();
    },

    render: function () {
        console.log('render');
        this.$el.html( this.template(this.model.toJSON()));
    }

});

var carItem = new Element({
    model: ad,
    initialize: function () {
        console.log('model:', this.model);
    },
    render: function () {

    }
});
// console.log('carItem', carItem);



var adList = new carCollection([
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





// var  attrAD = ad.toJSON();
//
// console.log('attrAD: ', attrAD);
// //
// // ad.set('price', -120000, {validate: true});
// // console.log('ad price update: ', ad.get('price'));
// // ad.set('year', 2017);
// // console.log('ad year update again: ', ad.get('year'));
//
// var RUBJPY = 0.32;
// console.log('price in RUB: ', ad.getPriceInRUB(RUBJPY));
//
//
//
// var AdvertisementViev = Backbone.View.extend({
//     tagName: 'li',
//
//     template: _.template("Продам <%= make %> <%= model %> за <%= price %> иен"),
//
//     initialize: function () {
//       this.render();
//     },
//
//     render: function () {
//         this.$el.html(this.template(this.model.toJSON()));
//         return this;
//     }
// });
//
// var advertismentView = new AdvertisementViev({ model: ad });
// // advertismentView.render();
// console.log('advertismentView: ', advertismentView.model.get('make'));
//
// console.log('advertismentView odometr', advertismentView.model.getPricePerKilometerTravelled());
// console.log('attention: ', advertismentView.el);