const express = require('express');
app = express();
const path = require('path');
const db = require('../models/index'); //db sequelize
const Location = require('../models/location.model');
const response = require("../helpers/response.helper");


//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

exports.GetAllLocations = async (req, res) => {
    const loc = await Location.find();

    if (loc) {
        // res.render('locations/index', {
        //     loc
        // })
        return response.responseHelper(
            res,
            true, {
                loc,
            },
            "Successfully fetched all locations"
        );
    } else {
        return response.responseHelper(
            res,
            true,
            [],
            "No locations to show"
        );
    }
}

exports.NewLocationForm = async (req, res) => {
    res.render('locations/new');
}

exports.PostLocation = async (req, res) => {
    const loc = new Location();
    loc.title = req.body.title;
    loc.location = req.body.location;
    await loc.save();

    if (loc) {
        res.redirect(`locationone/${loc.id}`)
        return response.responseHelper(
            res,
            true, {
                loc,
            },
            "Successfully posted new locations"
        );
    } else {
        return response.responseHelper(
            res,
            false,
            "Location not posted",
            "Location not posted"
        );
    }
}

exports.LocationById = async (req, res) => {
    const loc = await Location.findById(req.body.id);

    if (loc) {
        // res.render('locations/show', {
        //     loc
        // });
        return response.responseHelper(
            res,
            true, {
                loc,
            },
            "Successfully fetched location"
        );
    } else {
        // res.render('locations/show', {
        //     loc
        // });
        return response.responseHelper(
            res,
            true,
            [],
            "No location to show"
        );
    }
}