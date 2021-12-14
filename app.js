const express = require('express');
app = express();
const path = require('path');
const cors = require('cors');

//db sequelize
const db = require('./models/index')
const Location = require('./models/location.model')


//using body-parser
const bodyParser = require('body-parser');
const { resolveAny } = require('dns');
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


//get  home route
app.get('/', (req, res) => {
    res.render('home');
})


//get list of all the locations
app.get('/location', async(req, res) => {
    const loc = await Location.find();
    res.render('locations/index', { loc })
})

//get form to add new location
app.get('/location/new', async(req, res) => {
    res.render('locations/new');
})

//post location
app.post('/location', async(req, res) => {
    const loc = new Location();
    loc.title = req.body.title;
    loc.location = req.body.location;
    await loc.save();
    res.redirect(`locationone/${loc.id}`)

})

//get single user by id
app.get('/locationone/:id', async(req, res) => {
    const loc = await Location.findById(req.params.id);
    res.render('locations/show', { loc });
})



// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});