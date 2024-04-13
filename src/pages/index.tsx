import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteBook } from '../store/booksSlice';
import dynamic from 'next/dynamic';
import { Button } from '@mui/material';

const Modal = dynamic(() => import('../components/Modal'), { ssr: false });
const AddBook = dynamic(() => import('../components/AddBook'), { ssr: false });
const EditBook = dynamic(() => import('../components/EditBook'), { ssr: false });

interface Book {
  id: number;
  name: string;
  price: string;
  category: string;
  description?: string;
}

const Home = () => {
    const books = useSelector((state: RootState) => state.books.books);
    const dispatch = useDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [isEditing, setIsEditing] = useState(false);
  
    const handleOpenEditBook = (book: Book) => {
      setCurrentBook(book);
      setIsEditing(true);
    };
  
    const handleCloseEditBook = () => {
      setIsEditing(false);
      setCurrentBook(null);
    };
  
    return (
        <div style={{ padding: '20px' }}>
          <Button 
            style={{
              padding: '10px 20px',
              fontSize: '20px',
              cursor: 'pointer',
              margin: '20px auto',
              display: 'block'
            }}
            onClick={() => setIsAdding(true)}
          >
            Add Book
          </Button>
          <Modal show={isAdding} onClose={() => setIsAdding(false)}>
            <AddBook onClose={() => setIsAdding(false)} />
          </Modal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 2fr 80px', gap: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
            <strong>Name</strong>
            <strong>Price</strong>
            <strong>Category</strong>
            <strong>Description</strong>
          </div>
          {books.map(book => (
            <div 
              key={book.id} 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr) 2fr 80px',
                gap: '10px',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                alignItems: 'start'
              }}
              onClick={() => handleOpenEditBook(book)}
            >
              <p style={{ margin: '0', overflowWrap: 'break-word' }}>{book.name}</p>
              <p style={{ margin: '0', overflowWrap: 'break-word' }}>{book.price}</p>
              <p style={{ margin: '0', overflowWrap: 'break-word' }}>{book.category}</p>
              <p style={{ margin: '0', overflowWrap: 'break-word' }}>{book.description}</p>
              <Button 
                  onClick={(e) => {
                    e.stopPropagation(); // Stop the click from triggering the row click
                    dispatch(deleteBook(book.id));
                  }}
                  style={{ padding: '5px 10px', cursor: 'pointer' }}
              >
                  Delete
              </Button>
            </div>
          ))}
          {isEditing && (
            <Modal show={isEditing} onClose={handleCloseEditBook}>
              <EditBook book={currentBook} onClose={handleCloseEditBook} />
            </Modal>
          )}
        </div>
      );
  };
    
  export default Home;