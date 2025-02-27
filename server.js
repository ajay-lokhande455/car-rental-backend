const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = require('./src/app.js');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

app.use(cors());

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
}));

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to car rental app....' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
