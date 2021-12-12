const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    title: String,
    price: String,
    description: String,
});

module.exports = mongoose.model('Location', LocationSchema);