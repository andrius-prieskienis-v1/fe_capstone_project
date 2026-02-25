import React, { useState } from 'react';
import './FindDoctorSearch.css';

const FindDoctorSearch = () => {
    const specialties = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
    ]
    const [doctorResultsVisible, setDoctorResultsVisible] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    return (
        <main className="container">
            <section className="form-section">
                <div className="form-container" style={{ 'maxWidth': '100%', 'textAlign': 'center'}}>
                    <div className='find-doctor-search'>
                        <h1>Find a Doctor</h1>
                        <div className="doctor-search-box">
                            <div className='search-input-block'>
                                <input 
                                    type="text" 
                                    className='search-doctor-input-box'
                                    placeholder="Search for doctors, specialties, or locations..." 
                                    value={searchInput} 
                                    onChange={(e) => setSearchInput(e.target.value)} 
                                    onFocus={() => setDoctorResultsVisible(true)}
                                    onBlur={() => setDoctorResultsVisible(false)}
                                />
                                <button 
                                    className="search-btn" 
                                    onClick={() => setDoctorResultsVisible(true)}
                                >
                                    Search
                                </button>
                            </div>

                            <div className="search-doctor-results" style={{ display: doctorResultsVisible ? 'block' : 'none' }}>
                                {specialties.filter(specialty => specialty.toLowerCase().includes(searchInput.toLowerCase())).map((specialty, index) => (
                                    <div key={index} className="search-doctor-result-item">
                                        <h3>{specialty}</h3>
                                        <p>Find top {specialty} in your area.</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FindDoctorSearch;