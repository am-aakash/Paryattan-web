const express = require('express');
app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
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

//Api Routes


// home route
app.use('/', (req, res) => {
    res.status(200).json({
        message: "Paryattan APIs working"
    })
})

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});