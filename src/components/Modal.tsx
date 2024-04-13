import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px'
      }}>
        {children}
        <button onClick={onClose} style={{ marginTop: '20px', alignSelf: 'center' }}>Close</button>
      </div>
    </div>
  );
};

export default Modal;