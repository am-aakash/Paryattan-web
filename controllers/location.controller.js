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
    // res.render('locations/index', {
    //     loc
    // })
    if (loc) {
        // res.render('locations/index', {
        //         loc
        //     })
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
        //res.redirect(`location/location-by-id/${loc.id}`)
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



exports.LocationById = async(req, res) => {
    const loc = await Location.findById(req.body.id);
    if (loc) {
        // return res.render('locations/show', {
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
        return response.responseHelper(
            res,
            true, [],
            "No location to show"
        );
    }
}


//UPDATE 
exports.UpdateById = async(req, res) => {
    const event_id = req.params.id;
    const location = req.body.location;
    const price = req.body.price;
    const description = req.body.description;

    if (location == null || location === "") {
        return response.responseHelper(res, false, "location can not be empty", "Field required");
    }

    try {
        let event = await Location.findOne({
            where: {
                id: event_id
            }
        })
        if (!event) {
            return response.responseHelper(res, false, "Error", "Event not found");
        }
        let updateEvent = await event.update({
            location: location,
            price: price,
            description: description
        })

        return response.responseHelper(res, true, updateEvent, "Update Success");
    } catch (error) {
        console.log(error);
        return response.responseHelper(res, false, "Error", "Something went wrong");
    }
}

//DELETE
exports.DeleteById = async(req, res) => {
    const { id } = req.params;
    const loc = await Location.findByIdAndDelete(id)
        //res.redirect(`location/all-locations}`)
}