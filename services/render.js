const express = require('express');
app = express();
const axios = require('axios');
const db = require('../models/index'); //db sequelize
const Location = require('../models/location.model');

exports.GetAllLocations = async(req, res) => {
    const loc = await Location.find();
    axios.get('http://localhost:3000/location/all-locations')
    if (loc) {
        res.render('locations/index', {
            loc
        })
    } else {
        return response.responseHelper(
            res,
            true, [],
            "No locations to show"
        );
    }
}

// exports.NewLocationForm = async(req, res) => {
//     res.render('locations/new');
// }

// exports.PostLocation = async(req, res) => {
//     const loc = new Location();
//     loc.title = req.body.title;
//     loc.location = req.body.location;
//     await loc.save();

//     if (loc) {
//         res.redirect(`location/location-by-id/${loc.id}`)
//     } else {
//         return response.responseHelper(
//             res,
//             false,
//             "Location not posted",
//             "Location not posted"
//         );
//     }
// }



// exports.LocationById = async(req, res) => {
//     const loc = await Location.findById(req.params.id);
//     if (loc) {
//         return res.render('locations/show', {
//             loc
//         });
//     } else {
//         return response.responseHelper(
//             res,
//             true, [],
//             "No location to show"
//         );
//     }
// }

// exports.EditById = async(req, res) => {
//     const loc = await Location.findById(req.params.id);
//     res.render('locations/edit', { loc })
// }


// // exports.UpdateById = async(req, res) => {
// //     const { id } = req.params;
// //     const loc = await Location.findByIdAndUpdate(id, {...req.body.Campground })
// //     res.redirect(`location/location-by-id/${loc.id}`)
// // }

// exports.DeleteById = async(req, res) => {
//     const { id } = req.params;
//     const loc = await Location.findByIdAndDelete(id)
//     res.redirect(`location/all-locations}`)

// }