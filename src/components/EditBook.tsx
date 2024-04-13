import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBook } from '../store/booksSlice';
import { Button } from '@mui/material';

const EditBook = ({ book, onClose }: { book: any, onClose: () => void }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(book.name);
  const [price, setPrice] = useState(book.price.toString());  // Convert price to string for controlled input compatibility
  const [category, setCategory] = useState(book.category);
  const [description, setDescription] = useState(book.description);

  const handleSubmit = () => {
    dispatch(updateBook({
      id: book.id,
      name,
      price: parseFloat(price).toFixed(2), // Convert string to number and format to 2 decimal places
      category,
      description,
    }));
    onClose();
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <input
        type="text"
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
      <Button onClick={handleSubmit}>Update</Button>
    </div>
  );
};

export default EditBook;







