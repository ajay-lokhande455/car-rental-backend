const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = require('./src/app.js');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

app.use(cors())

const PORT = process.env.PORT || 3000;

app.use(express.json());



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
