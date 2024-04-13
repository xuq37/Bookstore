import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteBook } from '../store/booksSlice';
import dynamic from 'next/dynamic';

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
        <button 
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
        </button>
        <Modal show={isAdding} onClose={() => setIsAdding(false)}>
          <AddBook onClose={() => setIsAdding(false)} />
        </Modal>
        {books.map(book => (
          <div 
            key={book.id} 
            onClick={() => handleOpenEditBook(book)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <p style={{ margin: '0 10px', flex: 1 }}>{book.name}</p>
              <p style={{ margin: '0 10px', flex: 1 }}>{book.price}</p>
              <p style={{ margin: '0 10px', flex: 1 }}>{book.category}</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteBook(book.id));
                }}
                style={{ padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
            {book.description && <p style={{ margin: '10px' }}>{book.description}</p>}
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