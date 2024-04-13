import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../store/booksSlice';
import { Button } from '@mui/material';

const AddBook = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');  // Maintaining price as a string for controlled input compatibility
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (price) {
      dispatch(addBook({
        id: Math.random(), // Simple unique ID for demonstration purposes
        name,
        price: parseFloat(price).toFixed(2), // Convert string to number and format to 2 decimal places
        category,
        description,
      }));
      onClose();
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <input
        type="text" // Start with 'text' to control input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number" // Ensures only numerical entries
        placeholder="Price"
        value={price}
        onChange={(e) => {
          const inputPrice = e.target.value;
          if (/^\d*\.?\d*$/.test(inputPrice)) {
            setPrice(inputPrice);
          }
        }}
        min="0.01"  // Ensures positive values only
        step="0.01"  // Allows decimal places
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddBook;