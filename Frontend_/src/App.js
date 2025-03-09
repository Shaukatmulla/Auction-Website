// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Auctions from './components/Auctions';
import Auction from './components/Auction';
import CreateAuction from './components/CreateAuction';
import AddAdmin from './components/AddAdmin';
import Navbar from './components/Navbar'; // Import the new component
import Footer from './components/Footer';
const App = () => {
    return (
        <Router>
            
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auctions" element={<Auctions />} />
                <Route path="/auctions/:id" element={<Auction />} />
                <Route path="/create-auction" element={<CreateAuction />} />
                <Route path="/add-admin" element={<AddAdmin />} /> {/* Add the new route */}
            </Routes>
            <Footer/>
        </Router>
    );
};

export default App;