// frontend/src/components/Auctions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const Auctions = () => {
    const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // Get the user role from localStorage

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auctions');
                setAuctions(response.data);
            } catch (error) {
                console.error('Error fetching auctions:', error);
            }
        };
        fetchAuctions();
    }, []);

    const handleBid = async (auctionId) => {
        const bidAmount = prompt("Enter your bid amount:");
        const username = localStorage.getItem('username'); // Assuming you store username in localStorage
        if (bidAmount) {
            try {
                await axios.post(`http://localhost:5000/api/auctions/${auctionId}/bid`, { bidAmount, username });
                window.location.reload(); // Refresh the page to see updated bids
            } catch (error) {
                alert('Failed to place bid. Make sure your bid is higher than the current highest bid and the auction is still active.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Active Auctions</h2>
            {role === 'admin' && (
                <div className="text-center mb-4">
                    <button className="btn btn-primary mx-2" onClick={() => navigate('/create-auction')}>Create New Auction</button>
                    <button className="btn btn-secondary mx-2" onClick={() => navigate('/add-admin')}>Add New Admin</button>
                </div>
            )}
            <div className="row">
                {auctions.map(auction => {
                    const remainingTime = auction.endTime ? Math.max(0, new Date(auction.endTime) - new Date()) : 0; // Ensure endTime is a Date object
                    const minutesRemaining = Math.floor((remainingTime / 1000) / 60);
                    return (
                        <div className="col-md-4 mb-4" key={auction._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{auction.title}</h5>
                                    <p className="card-text">Starting Price: <strong>${auction.startingPrice}</strong></p>
                                    <p className="card-text">
                                        Highest Bid: <strong>${auction.highestBid > 0 ? auction.highestBid : 'No bids yet'}</strong>
                                        {auction.highestBidder ? ` by ${auction.highestBidder}` : ''}
                                    </p>
                                    <p className="card-text">Time Remaining: <strong>{minutesRemaining} minutes</strong></p>
                                    {role === 'user' && (
                                        <button className="btn btn-success" onClick={() => handleBid(auction._id)}>Place Bid</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Auctions;