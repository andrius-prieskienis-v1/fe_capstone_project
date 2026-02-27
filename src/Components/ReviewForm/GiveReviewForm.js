import React, { useState } from 'react';

function GiveReviewForm({doctor, onSubmit}) {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  const [ hoverIndex, setHoverIndex ] = useState(0);
  const [ rating, setRating ] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMessage(formData);
    if (formData.name && formData.review && formData.rating >= 0) {
      setShowWarning(false);
      setFormData({
        name: '',
        review: '',
        rating: 0
      });
      onSubmit(
        {
            ...doctor,
            reviews: [
                {
                    ...formData
                }
            ]
        }
      );
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className='review-container'>
        <h2>Give Your Feedback for {doctor.name}</h2>
        <form onSubmit={handleSubmit} className='review-form'>
            {showWarning && <p className="warning">Please fill out all fields.</p>}
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="review">Review:</label>
                <textarea id="review" rows="4" name="review" value={formData.review} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <div className="star-rating">
                    <label>Rating: </label>
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                        <button
                            type="button"
                            key={index}
                            data-value={index}
                            className={index <= (hoverIndex || rating) ? "on" : "off"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(rating)}
                        >
                            <span className="star">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                            </span>
                        </button>
                        );
                    })}
                </div>
            </div>
            {/* Submit button for form submission */}
            <button type="submit" className='btn-book'>Submit</button>
        </form>
    </div>
  );
}

export default GiveReviewForm;