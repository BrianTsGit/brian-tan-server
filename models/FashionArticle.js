const mongoose = require('mongoose');
const { Schema } = mongoose;

const fashionArticleSchema = new Schema({
    title: String,
    image_url: String,
    creator: { type: Schema.Types.ObjectId, ref: 'FashionCreator' },
    section: { type: Schema.Types.ObjectId, ref: 'FashionSection' },
    category: String,
    article_url: String,
    created_on: Date,
    updated_on: Date
});

mongoose.model('FashionArticle', fashionArticleSchema);