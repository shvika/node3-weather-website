const path = require ('path')
const express = require ('express')
const hbs = require ('hbs')
const geocode = require ('./utils/geocode.js')
const forecast = require ('./utils/forecast.js')

const app = express()

const port = process.env.PORT || 3000

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
const viewsPath = path.join (__dirname, '../templates/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Mead'
  })
})

app.get('/about', (req,res) => {
    res.render ('about', {
      title: 'About me',
      name: 'Andrew Mead'
    })
})

app.get('/help', (req,res) => {
    res.render ('help', {
      text: 'Help text using hbs is rendered correctly!',
      title: 'Help',
      name: 'Andrew Mead'
    })
})

app.get('/weather-by-coordinates', (req, res) =>{
  if (!req.query.longitude || !req.query.latitude){
    return res.send({
      error: 'You must provide longitude and latitude'
    })
  }

  forecast(req.query.longitude, req.query.latitude, (error, forecastData) => {
    if (error)
    {
      return res.send({
        error: 'Error occured while trying to fetch forecast  for the given location' 
      })
    }

    return res.send({
      forecast: forecastData,
    })
  })
})


app.get('/weather-by-text', (req, res) =>{
  if (!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if (error)
    {
      return res.send({
        error: 'Error occured while trying to fetch geocode data for ' + req.query.address
      })
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error)
      {
        return res.send({
          error: 'Error occured while trying to fetch forecast  for ' + req.query.address
        })
      }

      return res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req,res) => {
  if (!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send ({
    products:[]
  })
})


app.get('/help/*', (req,res) => {
  res.render ('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name:'Andrew Mead'
  })
})

app.get('*', (req,res) => {
  res.render ('404', {
    title: '404',
    errorMessage: 'Page not found',
    name:'Andrew Mead'
  })
})


app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
