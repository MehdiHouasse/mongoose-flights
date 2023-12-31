const Flight = require('../models/flight');

// Controller function for listing all flights
async function listFlights(req, res) {
  try {
    const flights = await Flight.find();
    const updatedFlights = flights.map(f => ({
      departs: formatDateTime(f.departs),
      _id: f._id,
      airline: f.airline,
      airport: f.airport,
    }));
    console.log(updatedFlights);
    res.render('index', { flights: updatedFlights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
}

// Controller function for displaying the form to add a new flight
function showAddFlightForm(req, res) {
  // Render 'new' view
  res.render('new');
}

// Controller function for handling the submission of a new flight
async function addFlight(req, res) {
  try {
    // Extract flight data from the request body
    const { airline, airport, flightNo, departs } = req.body;

    // Create a new Flight instance with the extracted data
    const newFlight = new Flight({
      airline,
      airport,
      flightNo,
      departs,
    });

    // Save the new flight to the database
    await newFlight.save();

    // Redirect to the list of flights after successfully adding a new flight
    res.redirect('/flights');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
}

// Controller function for displaying flightdetails
async function showFlightDetails(req, res) {
  try {
    const flightId = req.params.id;
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).render('not-found');
    }

    res.render('flight-details', { flight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function formatDateTime(dateTimeStr) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateTimeStr).toLocaleDateString(undefined, options);
}

module.exports = {
  listFlights,
  showAddFlightForm,
  addFlight,
  showFlightDetails,
};
