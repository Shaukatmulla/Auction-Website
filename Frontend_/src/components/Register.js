// frontend/src/components/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register', { username, password });
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleRegister} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Register</button>
                <p className="mt-3">Already have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    );
};

export default Register;