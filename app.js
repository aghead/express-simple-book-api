const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')

// mongodb connection
let db;
if (process.env.ENV === 'Test')
    db = mongoose.connect('mongodb://localhost/bookAPI_test')
else
    db = mongoose.connect('mongodb://localhost/bookAPI')

// import our models
const Book = require('./models/bookModel')

// start express app
const app = express()

// check env port
const port = process.env.PORT || 3000

// use body parser for POST requests
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// init routes
bookRouter = require('./Routes/bookRoutes')(Book)

app.use('/api/books', bookRouter)

app.get('/', (req, res) => {
    res.send('welcome to my API')
})

app.listen(port, () => {
    console.log('Running on PORT :' + port)
})

module.exports = app