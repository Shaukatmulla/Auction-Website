// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});

// Auction Schema
const AuctionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    highestBid: { type: Number, default: 0 },
    highestBidder: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    duration: { type: Number, required: true }, // Duration in minutes
    endTime: { type: Date } // End time of the auction
});

// Model Declarations
const User = mongoose.model('User ', UserSchema);
const Auction = mongoose.model('Auction', AuctionSchema);

// Register
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.sendStatus(201);
});

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.sendStatus(401);
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
});

// Create Admin (Admin)
app.post('/api/admins', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role: 'admin' });
    await user.save();
    res.sendStatus(201);
});

// Create Auction (Admin)
app.post('/api/auctions', async (req, res) => {
    const { title, startingPrice, duration } = req.body;

    // Validate input
    if (!title || !startingPrice || !duration) {
        return res.status(400).json({ message: 'Title, starting price, and duration are required.' });
    }

    // Calculate end time based on duration
    const endTime = new Date(Date.now() + duration * 60000); // Duration in minutes

    // Create a new auction
    const auction = new Auction({
        title,
        startingPrice,
        highestBid: startingPrice,
        duration,
        endTime
    });

    try {
        await auction.save(); // Save the auction to the database
        res.status(201).json({ message: 'Auction created successfully!', auction });
    } catch (error) {
        console.error('Error creating auction:', error);
        res.status(500).json({ message: 'Failed to create auction.' });
    }
});
// Get Auctions
app.get('/api/auctions', async (req, res) => {
    const auctions = await Auction.find();
    const currentTime = new Date();
    const activeAuctions = auctions.filter(auction => auction.endTime > currentTime); // Filter active auctions
    res.json(activeAuctions);
});

// Bid on Auction
app.post('/api/auctions/:id/bid', async (req, res) => {
    const { bidAmount, username } = req.body;
    const auction = await Auction.findById(req.params.id);
    if (bidAmount > auction.highestBid && auction.endTime > new Date()) {
        auction.highestBid = bidAmount;
        auction.highestBidder = username;
        await auction.save();
        res.sendStatus(200);
    } else {
        res.sendStatus(400); // Bid is too low or auction has ended
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});