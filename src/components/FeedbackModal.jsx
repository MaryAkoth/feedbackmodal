// components/FeedbackModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import './FeedbackModal.css';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [comment, setComment] = useState('');
  const modalRef = useRef(null);

  // Handle click outside of modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedRating === null) {
      alert('Please select a rating before submitting');
      return;
    }
    
    // Here you would typically send this data to your backend
    console.log('Submitted feedback:', {
      rating: selectedRating,
      comment: comment
    });
    
    // Show thank you message or handle submission as needed
    alert(`Thank you for your feedback! You rated us ${selectedRating}/10.`);
    
    // Close the modal
    onClose();
  };

  // Create array of rating buttons from 1 to 10
  const ratingButtons = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <div className="modal-header">
          <h2>How likely are you to recommend FrontendPro to someone you know?</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="rating-container">
            <div className="rating-scale">
              {ratingButtons.map((rating) => (
                <button
                  key={rating}
                  className={`rating-btn ${selectedRating === rating ? 'selected' : ''}`}
                  onClick={() => handleRatingClick(rating)}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="rating-labels">
              <span>Not satisfied</span>
              <span>Very satisfied</span>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn cancel-btn" onClick={onClose}>Cancel</button>
          <button className="btn submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;