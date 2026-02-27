import React, { useState } from 'react';
import './ReviewForm.css';
import { doctors as doctorData } from '../../doctors';
import Popup from 'reactjs-popup';
import GiveReviewForm from './GiveReviewForm';

const ReviewForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [ doctors, setDoctors ] = useState(doctorData);

    const handleReviewSubmit = (updatedDoctor) => {
        let _doctors = doctors.map(
            (doctor) => doctor.id === updatedDoctor.id ? updatedDoctor : doctor
        );
        setDoctors(_doctors);
        setShowModal(false);
    }
    return (
        <main className="container">
            <section className="form-section">
                <div className='form-container' style={{ 'maxWidth': '100%', 'textAlign': 'center'}}>
                    <h1>Reviews</h1>
                    <table className='reviews-table'>
                        <thead>
                            <tr>
                                <th>Serial Nuumber</th>
                                <th>Doctor Name</th>
                                <th>Doctor Speciality</th>
                                <th>Provide Feedback</th>
                                <th>Review Given</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>{doctor.id}</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.speciality}</td>
                                    <td>
                                    <Popup
                                        style={{ backgroundColor: "#FFFFFF" }}
                                        trigger={
                                            <button
                                                className={`btn-book ${
                                                    doctor.reviews.length > 0 ? "reviewed" : ""
                                                }`}
                                                disabled={doctor.reviews.length > 0}
                                            >
                                                Give Review
                                            </button>
                                        }
                                        modal
                                        open={showModal}
                                        onClose={() => setShowModal(false)}
                                    >
                                        {(close) => (
                                        <div style={{ padding: "1rem", overflow: "auto" }}>
                                            {doctor.reviews.length > 0 ? (
                                            <>
                                                <div>
                                                <h3>Submitted Message:</h3>
                                                <p>{doctor.reviews[0].review}</p>
                                                <h3>Rating:</h3>
                                                <p className="star-rating">
                                                    {new Array(doctor.reviews[0].rating)
                                                    .fill(0)
                                                    .map((a, i) => {
                                                        return (
                                                        <i
                                                            key={i}
                                                            className="bi bi-star-fill on"
                                                        ></i>
                                                        );
                                                    })}
                                                </p>
                                                </div>
                                            </>
                                            ) : (
                                            <GiveReviewForm
                                                doctor={doctor}
                                                onSubmit={handleReviewSubmit}
                                            />
                                            )}
                                        </div>
                                        )}
                                    </Popup>
                                    </td>
                                    <td>{doctor.reviews.length > 0 && doctor.reviews[0].review}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default ReviewForm;