const mongoose = require('mongoose');
const { Schema } = mongoose;

const miscInterestSchema = new Schema({
    image_url: String,
    text: String,
    category: String
});

mongoose.model('miscInterests', miscInterestSchema);