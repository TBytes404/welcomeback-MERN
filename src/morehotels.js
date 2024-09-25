// App.js
import React, { useState } from 'react';
import HotelList from './components/HotelList';

const demoHotels = [
  {
    id: 1,
    name: 'Grand Hyatt',
    address: '123 Main St, New York, NY',
    rating: 4.5,
    price: 250,
  },
  {
    id: 2,
    name: 'The Ritz-Carlton',
    address: '456 Elm St, Chicago, IL',
    rating: 5,
    price: 300,
  },
  // ... add more hotels
  {
    id: 20,
    name: 'Hyatt Regency',
    address: '789 Oak St, San Francisco, CA',
    rating: 4,
    price: 200,
  },
];

const App = () => {
  const [hotels, setHotels] = useState(demoHotels);
  const [filteredHotels, setFilteredHotels] = useState(demoHotels);
  const [sortBy, setSortBy] = useState(null);

  const handleSortChange = (e) => {
    const sortByValue = e.target.value;
    setSortBy(sortByValue);
    if (sortByValue === 'priceLowToHigh') {
      setFilteredHotels([...hotels].sort((a, b) => a.price - b.price));
    } else if (sortByValue === 'priceHighToLow') {
      setFilteredHotels([...hotels].sort((a, b) => b.price - a.price));
    } else if (sortByValue === 'rating') {
      setFilteredHotels([...hotels].sort((a, b) => b.rating - a.rating));
    } else {
      setFilteredHotels(hotels);
    }
  };

  return (
    <div className="App">
      <h1>Hotel Booking App</h1>
      <div className="selection-filter">
        <label for="filter">Sort by: </label>
        <select onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="priceHighToLow">Price High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <HotelList hotels={filteredHotels} />
    </div>
  );
};

export default App;