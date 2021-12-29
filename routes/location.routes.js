const express = require("express")
const router = express.Router()
const controller = require("../controllers/location.controller");
//const services = require("../services/render");


//                    CONTROLLER

//get list of all the locations
router.get('/all-locations', controller.GetAllLocations);

//get form to add new location
router.get('/new-location-form', controller.NewLocationForm);

//post new location
router.post('/post-location', controller.PostLocation);

//get single location by id
router.post('/location-by-id', controller.LocationById);

//edit location
router.post('/update-location/:id', controller.UpdateById);

//delete location
router.post('/delete-by-id', controller.DeleteById);

module.exports = router;