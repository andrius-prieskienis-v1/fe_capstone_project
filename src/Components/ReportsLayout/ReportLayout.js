import React, { useEffect, useState } from "react";
import './ReportsLayout.css';
import { doctors } from "../../doctors";
import { useNavigate } from "react-router-dom";

const ReportsLayout = () => {
    const navigate = useNavigate();

    const [ doctorData, setDoctorData ] = useState(doctors);

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
          navigate("/login");
        } 
    }, [navigate]);

    const openReport = (id) => {
        const reportUrl = `/reports/doctor_${id}.pdf`;
        window.open(reportUrl, "_blank", "noopener,noreferrer")
    }

    return (
        <main className="container">
            <section className="form-section">
                <div className="form-container" style={{ 'maxWidth': '100%', 'textAlign': 'center'}}>
                    <div className='find-doctor-search'>
                        <h1>Reports</h1>
                        <table className='reports-table'>
                            <thead>
                                <tr>
                                    <th>Serial Nuumber</th>
                                    <th>Doctor Name</th>
                                    <th>Doctor Speciality</th>
                                    <th>View Report</th>
                                    <th>Download Report</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doctor) => (
                                    <tr key={doctor.id}>
                                        <td>{doctor.id}</td>
                                        <td>{doctor.name}</td>
                                        <td>{doctor.speciality}</td>
                                        <td>
                                            <button
                                                className="btn-book"
                                                disabled={doctor.reports.length === 0}
                                                onClick={() => openReport(doctor.id)}
                                            >
                                                {doctor.reports.length > 0 ? 'View Report' : 'No Reports'}
                                            </button>  
                                        </td>
                                        <td>
                                            <button
                                                className="btn-book"
                                                disabled={doctor.reports.length === 0}
                                                onClick={() => openReport(doctor.id)}
                                            >
                                                {doctor.reports.length > 0 ? 'Download Report' : 'No Reports'}                                            </button>  
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ReportsLayout;