const express = require('express');
app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');


//db sequelize
const db = require('./models/index')


//using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Api Routes


// home route
app.get('/', (req, res) => {
    res.render('home');
})

//campground route
app.get('/makecampground', async(req, res) => {
    const camp = new campground({
        title: 'My backyard',
        description: "cheap "
    })
    await camp.save();
    res.send(camp);
})

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});