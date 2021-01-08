const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup HandlerBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Default page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather API',
        name: 'Amar Mandal',
    })
})


// Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'From here you will get FAQs',
        title: 'Help',
        name: 'Amar Mandal'
    })
})

// About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name: 'Amar Mandal',
    })
})


// Weather Page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide Address!'
        })
    }

    const address = req.query.address

    geocode(address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        // Weather Stack API
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log('Error:', error)
            }
            res.send({
                location: data.location,
                forecast: forecastData
            })
        })
    })
})

// help/*
app.get('/help/*', (req, res) => {
    res.render("404", {
        title: '404',
        message:'Help Page not found',
        name: 'Amar Mandal'
    })
})

// 404 Page
app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        message:'Page not Found',
        name: 'Amar Mandal'
    })
})

// Creating Server
app.listen(port, () => {
    console.log('Server is UP and Running!')
})