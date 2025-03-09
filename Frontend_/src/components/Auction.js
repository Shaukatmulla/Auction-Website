// frontend/src/components/Auction.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Auction = () => {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);

    useEffect(() => {
        const fetchAuction = async () => {
            const response = await axios.get(`http://localhost:5000/api/auctions/${id}`);
            setAuction(response.data);
        };
        fetchAuction();
    }, [id]);

    if (!auction) return <div>Loading...</div>;

    return (
        <div>
            <h2>{auction.title}</h2>
            <p>Starting Price: ${auction.startingPrice}</p>
            <p>Current Highest Bid: ${auction.highestBid} by {auction.highestBidder || 'No bids yet'}</p>
        </div>
    );
};

export default Auction;