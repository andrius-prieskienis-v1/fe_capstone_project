import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => { 
        const storedEmail = sessionStorage.getItem("email");
        const storedName = sessionStorage.getItem("name");

        if (storedEmail && storedEmail) {
            setIsLoggedIn(true);
            setUserName(storedEmail);
            setName(storedName);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <a href="../../index.html">StayHealthy Inc</a>
                </div>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="../index.html" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/appointments" className="nav-link">Appointments</a>
                    </li>
                    <li className="nav-item">
                        <a href="#blog" className="nav-link">Health Blog</a>
                    </li>
                    <li className="nav-item">
                        <a href="/reviews" className="nav-link">Reviews</a>
                    </li>
                    { !isLoggedIn? (
                        <>
                            <li className="nav-item auth-item">
                                <a href="/signup" className="nav-link auth-link">Sign-up</a>
                            </li>
                            <li className="nav-item auth-item">
                                <a href="/login" className="nav-link auth-link">Login</a>
                            </li>
                        </>
                    )  : (
                        <>
                            <li className="nav-item user-dropdown">
                                <span className="welcome-text">
                                    Welcome, {email.split("@")[0] || userName.split("@")[0]}
                                </span>
                                <div className="dropdown-content">
                                    <a href="/profile">Your Profile</a>
                                </div>
                            </li>
                            <li className="nav-item auth-item">
                                <a href="/logout" className="nav-link auth-link" onClick={(e) => handleLogout(e)}>Logout</a>
                            </li>
                        </>
                    )
                    } 
                </ul>
            </div>
        </nav>
    )    
}

export default Navbar;