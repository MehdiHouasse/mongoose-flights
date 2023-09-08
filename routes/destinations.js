const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinationsController');


// Route for listing all flights
router.post('/flights/:id/destinations', destinationsController.addDestination);

module.exports = router;
