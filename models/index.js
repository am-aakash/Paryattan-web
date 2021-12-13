//connecting with mongoose
const mongoose = require('mongoose');
const config = require('../config/db.config.js')

mongoose.connect(`mongodb+srv://ritika:${config.PASSWORD}@cluster0.1o0kd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log("Database connected")
})


db.location = require('./location.model');

module.exports = db