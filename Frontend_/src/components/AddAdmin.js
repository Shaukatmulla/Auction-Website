// frontend/src/components/AddAdmin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admins', { username, password });
            alert('Admin added successfully!');
            navigate('/auctions'); // Redirect to auctions page after adding admin
        } catch (error) {
            alert('Failed to add admin');
        }
    };

    return (
        <div>
            <h2>Add New Admin</h2>
            <form onSubmit={handleAddAdmin}>
                <input
                    type="text"
                    placeholder="Admin Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Add Admin</button>
            </form>
        </div>
    );
};

export default AddAdmin;
