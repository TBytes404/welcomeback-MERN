const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const Hotel = require('./models/hotels'); // Make sure this path is correct!

// Middleware
app.use(bodyParser.json()); 
app.use(cors());

// Connect to MongoDB 
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes 

// **Remove the duplicate route!**
// app.get('/hotels', async (req, res) => { 
//    ... 
// });

// Use consistent `/api` prefix for clarity:

// Get all hotels
app.get('/api/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single hotel by ID
app.get('/api/hotels/:id', async (req, res) => { 
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (err) {
    // Handle potential CastError for invalid ObjectId 
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid hotel ID' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Create a new hotel
app.post('/api/hotels', async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    // More specific error handling (e.g., for validation errors)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors }); 
    }
    res.status(500).json({ error: err.message });
  }
});

// Update a hotel by ID
app.put('/api/hotels/:id', async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(updatedHotel);
  } catch (err) {
    // Similar error handling to POST route (CastError, ValidationError)
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid hotel ID' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors }); 
    }
    res.status(500).json({ error: err.message });
  }
});

// Delete a hotel by ID
app.delete('/api/hotels/:id', async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (err) {
    // Similar error handling to other routes
    res.status(500).json({ error: err.message });
  }
});

// Create the Mayfair hotel
app.post('/api/featured-hotels', async (req, res) => {
    try {
      const mayfairHotel = new Hotel({
        name: 'Mayfair Resort',
        location: 'Darjeeling',
        description: 'Enjoy the royalty.',
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/269695977.jpg?k=ab88e6e54cb430771bad9ea693e420439dbd9b4af5d1106bc345c8a5f0aea43e&o=&hp=1',
        rooms: [
          {
            type: 'Standard',
            price: 100,
            availability: true,
          },
          {
            type: 'Deluxe',
            price: 150,
            availability: true,
          },
        ],
      });
  
      await mayfairHotel.save();
      res.status(201).json(mayfairHotel);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// Start the server
const PORT = process.env.PORT || 3003; 
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));