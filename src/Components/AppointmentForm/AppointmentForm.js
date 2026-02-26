import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({
    appointments,
    doctorName, 
    doctorSpeciality, 
    doctorExperience, 
    doctorRatings,
    onSubmit,
    onCancel
}) => {
    const [ name, setName ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ date, setDate ] = useState('');
    const [ time, setTime ] = useState('');
    const [ errors, setErrors ] = useState({});

    const generateTimes = () => {
        const times = [];
        let start = 8 * 60;   // 08:00 in minutes
        const end = 17 * 60;  // 17:00 in minutes

        while (start <= end) {
        const hours = Math.floor(start / 60);
        const minutes = start % 60;

        times.push(
            `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`
        );

        start += 30; // step by 30 minutes
        }

        return times;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let _errors = {};
        let cnt = 0;
        if (name?.length == 0) {
            _errors.name = 'Name is required';
            cnt++;
        }
        if (phoneNumber?.length == 0) {
            _errors.phoneNumber = 'Phone number is required';
            cnt++;
        }
        if (date?.length == 0) {
            _errors.date = 'Date of Appointment is required';
            cnt++;
        }
        if (time?.length == 0) {
            _errors.time = 'Book Time Slot is required';
            cnt++;
        }
        setErrors(_errors);
        if (cnt == 0) {
            onSubmit({
                name, date, time, phoneNumber
            });
        }
    }

    const handleCancel = (id) => {
        onCancel(id);
    }

    const timeOptions = generateTimes();

    return (
        <div className='appointment-container'>
            <div class="doctor-info">
                <h3 class="doctor-name">{doctorName}</h3>
                <p class="doctor-speciality">{doctorSpeciality}</p>
                <div class="doctor-details">
                    <span class="experience">
                        <strong>Experience:</strong> {doctorExperience} years
                    </span>
                    <span class="rating">
                        <strong>Rating:</strong> ⭐ {doctorRatings}/5
                    </span>
                </div>
            </div>
            {appointments.length == 0 ? (
            <form onSubmit={handleFormSubmit} className="appointment-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors?.name && <div className='error'>{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    {errors?.phoneNumber && <div className='error'>{errors.phoneNumber}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date of Appointment:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    {errors?.date && <div className='error'>{errors.date}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="date">Book Time Slot:</label>
                    <select
                        id='time'
                        value={time}   
                        onChange={(e) => setTime(e.target.value)}
                        required 
                    >
                        <option
                            value=""
                        >
                            Select a time slot
                        </option>
                        
                        {timeOptions.map((time, index) => (
                                <option key={index} value={time}>
                                {time}
                                </option>
                            ))}

                    </select>
                    {errors?.time && <div className='error'>{errors.time}</div>}
                </div>
                <button type="submit" className='btn-book'>Book Now</button>
            </form>
            ) : (
                <>
                    <h3>Appointments booked</h3>
                    {appointments.map((appointment) => (
                    <div className="appointment-info" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date: {appointment.date}</p>
                      <p>Time: {appointment.time}</p>
                      <button className="btn-book cancel-appointment-btn" onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                </>
            )}
        </div>
    )
}

export default AppointmentForm;