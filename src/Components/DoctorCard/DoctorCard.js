import React from  'react';
import './DoctorCard.css';

const DoctorCard = ({name, experience, ratings, specialty, photo}) => {
    return (
        <div class="doctor-card">
            <div class="doctor-image">
                <img src={`images/${photo}`} alt="{name}"/>
            </div>
            <div class="doctor-info">
                <h3 class="doctor-name">{name}</h3>
                <p class="doctor-specialty">{specialty}</p>
                <div class="doctor-details">
                    <span class="experience">
                        <strong>Experience:</strong> {experience} years
                    </span>
                    <span class="rating">
                        <strong>Rating:</strong> ⭐ {ratings}/5
                    </span>
                </div>
                <button class="btn-book">
                    Book Appointment<br/>
                    No Booking Fee
                </button>
            </div>
        </div>
    )
}

export default DoctorCard;