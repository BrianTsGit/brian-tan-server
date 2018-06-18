const mongoose = require('mongoose');
const { Schema } = mongoose; 

const yelpBusinessSchema = new Schema({
    yelp_id: String,
    name: String,
    image_url: String,
    url: String,
    review_count: Number,
    rating: Number,
    price: String,
    categories: [String],
    location: {
        address1: String,
        address2: String,
        address3: String,
        city: String,
        zip_code: String,
        country: String,
        state: String,
        display_address: [String]
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    } 
});

mongoose.model('yelpBusinesses', yelpBusinessSchema);