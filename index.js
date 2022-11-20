const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
dotenv.config()

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
    console.log('Connected to MongoDB')
});

//Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

//Endpoints
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/posts', postRoute)


app.listen(5000, () => {
    console.log("Backend server is running on port 5000 ")
})