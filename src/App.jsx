import React, { useState } from 'react';
import './App.css';
import FeedbackModal from './components/FeedbackModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Feedback Modal</h1>
      <p>Click the button below to rate our product</p>
      <button className="feedback-btn" onClick={openModal}>Give Feedback</button>
      
      {isModalOpen && (
        <FeedbackModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default App;