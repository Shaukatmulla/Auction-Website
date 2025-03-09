// src/components/Admin.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [auctions, setAuctions] = useState([]);
    const [title, setTitle] = useState('');
    const [startingPrice, setStartingPrice] = useState('');

    useEffect(() => {
        const fetchAuctions = async () => {
            const response = await axios.get('http://localhost:5000/auctions');
            setAuctions(response.data);
        };
        fetchAuctions();
    }, []);

    const handleCreateAuction = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/auction', { title, startingPrice });
        setTitle('');
        setStartingPrice('');
        const response = await axios.get('http://localhost:5000/auctions');
        setAuctions(response.data);
    };

    return (
        <div className="container">
            <h2>Admin Dashboard</h2>
            <form onSubmit={handleCreateAuction}>
                <div className="form-group">
                    <label>Auction Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Starting Price</label>
                    <input type="number" className="form-control" value={startingPrice} onChange={(e) => setStartingPrice (e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Create Auction</button>
            </form>
            <h3>Current Auctions</h3>
            <ul className="list-group">
                {auctions.map((auction) => (
                    <li key={auction._id} className="list-group-item">
                        {auction.title} - Starting Price: ${auction.startingPrice} - Highest Bid: ${auction.highestBid || auction.startingPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;