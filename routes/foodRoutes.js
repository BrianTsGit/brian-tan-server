const mongoose = require('mongoose');

const YelpBusiness = mongoose.model('yelpBusinesses');

const mapBusiness = (business) => {
    return {
        yelp_id: business.yelp_id,
        name: business.name,
        image_url: business.image_url,
        url: business.url,
        review_count: business.review_count,
        rating: business.rating,
        price: business.price,
        categories: business.categories,
        location: {
            address1: business.location ? business.location.address1 : '',
            address2: business.location ? business.location.address2 : '',
            address3: business.location ? business.location.address3 : '',
            city: business.location ? business.location.city : '',
            zip_code: business.location ? business.location.zip_code : '',
            country: business.location ? business.location.country : '',
            state: business.location ? business.location.state : '',
            display_address: business.location ? business.location.display_address : ''
        } 
    };
}

module.exports = (app) => {
    app.route('/food/yelpBusinesses')
        .get((req, res) => {
            YelpBusiness.find()
                .then(businesses => res.send(businesses));
        })
        .post((req, res) => {
            YelpBusiness.findOne({ yelp_id: req.body.id })
                .then(business => {
                    if (business) {
                        //return message that object already exists
                        res.send({ error: 'Erorr: This business already exists in the database.'});
                    } else {
                        new YelpBusiness(mapBusiness(req.body)).save()
                            .then(business => res.send(business));
                    }
                })
        });
}