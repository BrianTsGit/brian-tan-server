const mongoose = require('mongoose');
const { Schema } = mongoose;

const fashionSectionSchema = new Schema({
    name: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'FashionArticle' }]
});

mongoose.model('FashionSection', fashionSectionSchema);