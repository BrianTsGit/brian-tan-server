const mongoose = require('mongoose');
const { Schema } = mongoose; //same as: const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String 
});

//use mongoose.model to create a collection (name of collection, schema)
mongoose.model('users', userSchema);