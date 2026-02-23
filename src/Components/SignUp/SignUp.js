import React, { useState } from "react";
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const SignUp = () => {

// State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router
// Function to handle form submission
    
const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };
    return (
        <main className="container">
            <section className="form-section">
                <div className="form-container">
                    <h1>Create Your Account</h1>
                    <p className="form-subtitle">Join StayHealthy Inc today</p>

                    <form className="auth-form" onSubmit={register} method="POST">
                        <div className="form-group">
                            <label htmlFor="role">Role *</label>
                            <select id="role" name="role" required>
                                <option value="">-- Select your role --</option>
                                <option value="doctor">Doctor</option>
                                <option value="patient">Patient</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="Enter your full name" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}      
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number *</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                placeholder="Enter your phone number" 
                                pattern="^[0-9]{10}$"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email address" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Enter your password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary">Create Account</button>
                    </form>

                    <p className="form-footer">
                        Already have an account? 
                        <a href="../login/login.html" className="form-link">Login here</a>
                    </p>
                </div>
            </section>
        </main>
    )
}

export default SignUp;