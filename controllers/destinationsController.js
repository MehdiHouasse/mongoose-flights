const Flight = require('../models/flight');
async function addDestination(req, res) {
  try {
    const flightId = req.params.id;
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).render('not-found');
    }
    const { airport, arrival } = req.body;
    const newDestination = {
      airport,
      arrival,
    };
    flight.destinations.push(newDestination);
    await flight.save();
    res.redirect(`/flights/${flightId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
}
module.exports = {
  addDestination,
};
