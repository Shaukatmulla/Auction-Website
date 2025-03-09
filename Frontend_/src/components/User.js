// src/components/User.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        const fetchAuctions = async () => {
            const response = await axios.get('http://localhost:5000/auctions');
            setAuctions(response.data);
        };
        fetchAuctions();
    }, []);

    return (
        <div className="container">
            <h2>User Dashboard</h2>
            <h3>Available Auctions</h3>
            <ul className="list-group">
                {auctions.map((auction) => (
                    <li key={auction._id} className="list-group-item">
                        {auction.title} - Starting Price: ${auction.startingPrice} - Highest Bid: ${auction.highestBid || auction.startingPrice}
                        {/* Add bidding functionality here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default User;