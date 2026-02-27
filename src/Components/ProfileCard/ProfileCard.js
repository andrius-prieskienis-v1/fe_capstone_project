import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
    const [userDetails, setUserDetails] = useState({});
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
          navigate("/login");
        } else {
          fetchUserProfile();
        }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email"); // Get the email from session storage
        
            if (!authtoken) {
                navigate("/login");
            } else {
                const response = await fetch(`${API_URL}/api/auth/user`, {
                    headers: {
                        "Authorization": `Bearer ${authtoken}`,
                        "Email": email, 
                    },
                });
                if (response.ok) {
                    const user = await response.json();
                    setUserDetails(user);
                    setUpdatedDetails(user);
                } else {
                    throw new Error("Failed to fetch user profile");
                }
            }
        } catch (error) {
        console.error(error);
        }
    };

    const handleEditMode = () => {
        setEditMode(true);
    };

    const handleFormChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email"); 

            if (!authtoken || !email) {
                navigate("/login");
                return;
            }
        
            const payload = { ...updatedDetails };
            const response = await fetch(`${API_URL}/api/auth/user`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${authtoken}`,
                        "Content-Type": "application/json",
                        "Email": email,
                    },
                    body: JSON.stringify(payload),
            });
        
            if (response.ok) {
                    sessionStorage.setItem("name", updatedDetails.name);
                    sessionStorage.setItem("phone", updatedDetails.phone);
            
                    setUserDetails(updatedDetails);
                    setEditMode(false);

                    alert(`Profile Updated Successfully!`);
                    navigate("/");
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="container">
            <section className="form-section">
                <div className='form-container' style={{ 'maxWidth': '100%', 'textAlign': 'center'}}>
                    <h1>Your Profile</h1>
                    {editMode ? (
                        <form onSubmit={handleFormSubmit}>

                        </form>
                    ) : (
                        <div className="profile-details">
                            <button onClick={handleEditMode} className='btn-book'>Edit</button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default ProfileCard;