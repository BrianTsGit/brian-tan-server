const mongoose = require('mongoose');
const { Schema } = mongoose;

const topRestaurantSchema = new Schema ({
    name: String,
    imagE_url: String,
    year: Number
});

mongoose.model('topRestaurants', topRestaurantSchema);