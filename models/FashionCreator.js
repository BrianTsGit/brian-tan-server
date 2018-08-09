const mongoose = require('mongoose');
const { Schema } = mongoose;

const fashionCreatorSchema = new Schema({
    name: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'FashionArticle' }]
});

mongoose.model('FashionCreator', fashionCreatorSchema);