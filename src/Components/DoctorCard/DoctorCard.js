import React, { useState } from  'react';
import './DoctorCard.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { v4 as uuidv4 } from 'uuid';
import AppointmentForm from '../AppointmentForm/AppointmentForm';

const DoctorCard = ({name, experience, ratings, speciality, photo}) => {
    const [ showModal, setShowModal ] = useState(false);
    const [ appointments, setAppointments ] = useState([]);

    const handleSubmit = (appointment) => {
        const newAppointment = {
            id: uuidv4(),
            ...appointment,
        };
        const _appointments = [...appointments, newAppointment];
        setAppointments(_appointments);
        localStorage.setItem('appointmentData', JSON.stringify(newAppointment));
        setShowModal(false);
        window.dispatchEvent(new Event("new_appointment"));
    }

    const handleCancel = (id) => {
        const _appointments = appointments.filter((appointment) => appointment.id !== id);
        setAppointments(_appointments);
        localStorage.removeItem('appointmentData');
        window.dispatchEvent(new Event("cancel_appointment"));
    }

    return (
        <div class="doctor-card">
            <div class="doctor-image">
                <img src={`images/${photo}`} alt="{name}"/>
            </div>
            <div class="doctor-info">
                <h3 class="doctor-name">{name}</h3>
                <p class="doctor-speciality">{speciality}</p>
                <div class="doctor-details">
                    <span class="experience">
                        <strong>Experience:</strong> {experience} years
                    </span>
                    <span class="rating">
                        <strong>Rating:</strong> ⭐ {ratings}/5
                    </span>
                </div>
                <Popup
                    style={{ backgroundColor: '#FFFFFF', width: '300px' }}
                    trigger={
                        <button className={`btn-book book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment-btn' : ''}`}>
                        {appointments.length > 0 ? (
                            <div>Cancel Appointment</div>
                        ) : (
                            <div>Book Appointment</div>
                        )}
                        <div>No Booking Fee</div>
                        </button>
                    }
                    modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    >
                    {(close) => (
                        <>
                            <AppointmentForm
                                appointments={appointments}
                                doctorName={name}
                                doctorExperience={experience}
                                doctorRatings={ratings}
                                doctorSpeciality={speciality}
                                onSubmit={handleSubmit}
                                onCancel={handleCancel}
                            />
                        </>
                    )}
                </Popup> 
            </div>
            
        </div>
    )
}

export default DoctorCard;