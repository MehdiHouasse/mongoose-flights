
const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

// Define the route for creating a new ticket
router.post('/flights/:id/tickets', ticketsController.createTicket);

module.exports = router;
