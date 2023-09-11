const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

// Render the ticket creation form
async function renderNewTicketForm(req, res) {
  try {
    const flightId = req.params.id;
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).render('not-found');
    }

    res.render('tickets.ejs', { flight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Handle the submission of the ticket creation form
async function createTicket(req, res) {
  try {
    const flightId = req.params.id;
    const { ticketNumber, passengerName } = req.body;

    // Create a new ticket with the flight ID
    const newTicket = new Ticket({
      flight: flightId,
      ticketNumber,
      passengerName,
    });

    // Save the new ticket to the database
    await newTicket.save();

    // Redirect back to the flight's show view
    res.redirect(`/flights/${flightId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  renderNewTicketForm,
  createTicket,
};
