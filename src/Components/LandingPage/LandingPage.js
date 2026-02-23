import React from "react";
import './LandingPage.css';

const LandingPage = () => {
    return (
        <main className="container">
            <section className="hero">
                <h1>Welcome to StayHealthy Inc</h1>
                <p>Your trusted partner for healthcare management and wellness</p>
            </section>

            <section id="appointments" className="content-section">
                <h2>Appointments</h2>
                <p>Schedule and manage your medical appointments with our easy-to-use booking system.</p>
            </section>

            <section id="blog" className="content-section">
                <h2>Health Blog</h2>
                <p>Read the latest articles and tips on health and wellness from our expert contributors.</p>
            </section>

            <section id="reviews" className="content-section">
                <h2>Reviews</h2>
                <p>See what our satisfied patients have to say about our services.</p>
            </section>
        </main>
    )
}

export default LandingPage;