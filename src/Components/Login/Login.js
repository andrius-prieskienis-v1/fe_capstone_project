import React, { useState, useEffect } from "react";
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
          navigate("/");
        }
    }, []);

    const login = async (e) => {
        e.preventDefault();
        // Send a POST request to the login API endpoint
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        // Parse the response JSON
        const json = await res.json();
        if (json.authtoken) {
          // If authentication token is received, store it in session storage
          sessionStorage.setItem('auth-token', json.authtoken);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('email', email);
          // Redirect to home page and reload the window
          navigate('/');
          window.location.reload();
        } else {
          // Handle errors if authentication fails
          if (json.errors) {
            for (const error of json.errors) {
              alert(error.msg);
            }
          } else {
            alert(json.error);
          }
        }
    };

    return (
        <main className="container">
            <section className="form-section">
                <div className="form-container">
                    <h1>Welcome Back</h1>
                    <p className="form-subtitle">Login to your account</p>

                    <form className="auth-form" onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email address" 
                                required
                                value={email}
                                onChange = {(e) => setEmail(e.target.value)}
                            />
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
                                onChange = {(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group checkbox-group">
                            <input 
                                type="checkbox" 
                                id="remember" 
                                name="remember"
                            />
                            <label htmlFor="remember" className="checkbox-label">Remember me</label>
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>

                    <p className="form-footer">
                        <a href="#" className="form-link">Forgot password?</a>
                    </p>
                    <p className="form-footer">
                        Don't have an account? 
                        <a href="/signup" className="form-link">Sign-up here</a>
                    </p>
                </div>
            </section>
        </main>
    ) 
}

export default Login;