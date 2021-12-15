const express = require('express');
app = express();
const path = require('path');
const db = require('../models/index'); //db sequelize
const Location = require('../models/location.model');
const response = require("../helpers/response.helper");
var methodOverride = require('method-override')

//using body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'))

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

exports.GetAllLocations = async(req, res) => {
    const loc = await Location.find();

    if (loc) {
        res.render('locations/index', {
                loc
            })
            // return response.responseHelper(
            //     res,
            //     true, {
            //         loc,
            //     },
            //     "Successfully fetched all locations"
            // );
    } else {
        return response.responseHelper(
            res,
            true, [],
            "No locations to show"
        );
    }
}

exports.NewLocationForm = async(req, res) => {
    res.render('locations/new');
}

exports.PostLocation = async(req, res) => {
    const loc = new Location();
    loc.title = req.body.title;
    loc.location = req.body.location;
    await loc.save();

    if (loc) {
        res.redirect(`location/location-by-id/${loc.id}`)
            // return response.responseHelper(
            //     res,
            //     true, {
            //         loc,
            //     },
            //     "Successfully posted new locations"
            // );
    } else {
        return response.responseHelper(
            res,
            false,
            "Location not posted",
            "Location not posted"
        );
    }
}



exports.LocationById = async(req, res) => {
    const loc = await Location.findById(req.params.id);
    if (loc) {
        return res.render('locations/show', {
            loc
        });
        // return response.responseHelper(
        //     res,
        //     true, {
        //         loc,
        //     },
        //     "Successfully fetched location"
        // );
    } else {
        return response.responseHelper(
            res,
            true, [],
            "No location to show"
        );
    }
}

exports.EditById = async(req, res, next) => {
    const loc = await Location.findById(req.params.id);
    res.render('locations/edit', { loc })
}


// exports.UpdateById = async(req, res) => {
//     const { id } = req.params;
//     const loc = await Location.findByIdAndUpdate(id, {...req.body.Campground })
//     res.redirect(`location/location-by-id/${loc.id}`)
// }