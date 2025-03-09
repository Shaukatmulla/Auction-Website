// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);