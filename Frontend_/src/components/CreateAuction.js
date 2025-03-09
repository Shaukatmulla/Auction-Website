// frontend/src/components/CreateAuction.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAuction = () => {
    const [title, setTitle] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [duration, setDuration] = useState(''); // New state for duration
    const navigate = useNavigate();

    const handleCreateAuction = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auctions', { title, startingPrice, duration });
            alert('Auction created successfully!');
            navigate('/auctions'); // Redirect to auctions page after creation
        } catch (error) {
            alert('Failed to create auction');
        }
    };

    return (
        <div>
            <h2>Create New Auction</h2>
            <form onSubmit={handleCreateAuction}>
                <input
                    type="text"
                    placeholder="Auction Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Starting Price"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Duration (in minutes)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
                <button type="submit">Create Auction</button>
            </form>
        </div>
    );
};

export default CreateAuction;