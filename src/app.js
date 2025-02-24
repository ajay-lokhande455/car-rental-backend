const express = require('express')
const app = express()
const authRoutes = require('../src/routes/authRoute');
const userRoutes = require('./routes/userRoutes');
const bookingsRoutes = require('./routes/bookingRoutes');
const carRoutes = require('./routes/carRoute')


app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/booking', bookingsRoutes)
app.use('/car', carRoutes )


module.exports = app
