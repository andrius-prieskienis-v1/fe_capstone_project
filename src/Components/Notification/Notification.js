import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = () => {
    const [appointmentData, setAppointmentData] = useState(null);

    useEffect(() => {
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));
        setAppointmentData(storedAppointmentData);

        window.addEventListener("new_appointment", handleNewNotification);
        window.addEventListener("cancel_appointment", handleCancelNotification);
        return () => {
            window.removeEventListener("new_appointment", handleNewNotification);
            window.removeEventListener("cancel_appointment", handleCancelNotification);
        }
    }, []);

    const handleNewNotification = () => {
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));
        setAppointmentData(storedAppointmentData);
    }

    const handleCancelNotification = () => {
        setAppointmentData("");
    }
    return (
        <div className='notification' hidden={!appointmentData}>
            {appointmentData && (
                <div>
                    <h4>Appointment Details</h4>
                    <strong>Doctor: </strong>{appointmentData.doctorName}<br />
                    <strong>Speciality: </strong>{appointmentData.doctorSpeciality}<br />
                    <strong>Name: </strong>{appointmentData.name}<br />
                    <strong>Phone Number: </strong>{appointmentData.phoneNumber}<br />
                    <strong>Date of Appointment: </strong>{appointmentData.date}<br />
                    <strong>Time Slot: </strong>{appointmentData.time}<br />
                </div>
                )}
        </div>
    )
}

export default Notification;
