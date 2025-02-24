const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = require('./src/app.js');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
