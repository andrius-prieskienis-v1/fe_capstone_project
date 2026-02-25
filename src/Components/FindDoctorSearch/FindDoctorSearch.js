import React from 'react';
import './FindDoctorSearch.css';

const FindDoctorSearch = () => {
    const specialties = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
    ]
    const [doctorResultsVisible, setDoctorResultsVisible] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    return (
        <div className='find-doctor-search'>
            <h2>Find a Doctor</h2>
            <input 
                type="text" 
                placeholder="Search for doctors, specialties, or locations..." 
                value={searchInput} 
                onChange={(e) => setSearchInput(e.target.value)} 
            />
            <button onClick={() => setDoctorResultsVisible(true)}>Search</button>
            <div className="doctor-results" style={{ display: doctorResultsVisible ? 'block' : 'none' }}>
                {specialties.filter(specialty => specialty.toLowerCase().includes(searchInput.toLowerCase())).map((specialty, index) => (
                    <div key={index} className="doctor-result-item">
                        <h3>{specialty}</h3>
                        <p>Find top {specialty} in your area.</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindDoctorSearch;