const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

// Define Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        myName: 'Tom Gruner'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        myName: 'Tom Gruner'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'FAQs, Contact, Chat, Telefon, etc.',
        title: 'Help',
        myName: 'Tom Gruner'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, response) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                location,
                weather: response
            })
        })
    })
    
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page',{
        errorMsg: 'Help article not found.',
        myName: 'Tom Gruner',
        title: '404'
    })
})

app.get('*',(req, res) => {
    res.render('404page', {
        errorMsg: 'Page not found',
        myName: 'Tom Gruner',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})