const express = require('express')
const app = express()
const authRoutes = require('../src/routes/authRoute');
const userRoutes = require('./routes/userRoutes');
const bookingsRoutes = require('./routes/bookingRoutes');
const carRoutes = require('./routes/carRoute');
const paymentRoutes = require('./routes/paymentRoutes');
const contactUs = require('./routes/contactUsRoutes');


app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/booking', bookingsRoutes)
app.use('/car', carRoutes )
app.use('/payment', paymentRoutes )
app.use('/contact-us', contactUs )

module.exports = app
