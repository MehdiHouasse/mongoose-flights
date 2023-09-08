const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');
const Flight = require('../models/flight'); // Import Flight Model

// Route for listing all flights
router.get('/', flightsController.listFlights);

// Route for displaying the form to add a new flight
router.get('/new', flightsController.showAddFlightForm);
// Route for displaying flight details
router.get('/:id', flightsController.showFlightDetails);
// Route for handling the submission of a new flight
router.post('/', flightsController.addFlight);


module.exports = router;
