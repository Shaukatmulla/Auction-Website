// frontend/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="display-4">Welcome to the Auction Website</h1>
                <p className="lead">Join us to bid on exciting items and become the highest bidder!</p>
                <div className="mt-4">
                    <Link to="/login">
                        <button className="btn btn-primary btn-lg mx-2">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-success btn-lg mx-2">Register</button>
                    </Link>
                </div>
            </div>

            
        </div>
    );
};

export default Home;