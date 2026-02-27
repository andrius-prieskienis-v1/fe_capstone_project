import React from 'react';
import './ReviewForm.css';
import { doctors } from '../../doctors';
const ReviewForm = () => {
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
                                <tr>
                                    <td>{doctor.id}</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.speciality}</td>
                                    <td><button className='btn-book'>Click Here</button></td>
                                    <td>&nbsp;</td>
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