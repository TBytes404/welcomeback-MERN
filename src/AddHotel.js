import React, { useState } from 'react';

const AddHotel = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const newHotel = {
        name,
        location,
        description,
        imageUrl,
      };

      // Send POST request to your backend API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/hotels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHotel),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // If successful, clear the form fields
      setName('');
      setLocation('');
      setDescription('');
      setImageUrl('');

      // Optionally: Fetch the updated list of hotels
      // ... (see 'Updating Hotel List' below)

      console.log('Hotel added successfully!');
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Hotel</button>
    </form>
  );
};

export default AddHotel;