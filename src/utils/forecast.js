// https://api.darksky.net/forecast/d2316edde4b5b6d3b436958a443c1b2a/37.8267,-122.4233
const request = require ('request')

const forecast = (longitude, latitude, callback) =>{
  const url = 'https://api.darksky.net/forecast/d2316edde4b5b6d3b436958a443c1b2a/' + encodeURIComponent(latitude) + ',' +  encodeURIComponent(longitude) +
              '?units=si&lang=he'
  request ({url, json: true}, (error, {body}) =>{
    if (error){
      callback('Unable to connect to forecast services !', undefined)
    }else if (body.error){
      callback ('Unable to find location', undefined)
    }
    else{
      callback(undefined,  body.currently.summary + ', It is currently ' + body.currently.temperature + ' degrees' +
        ', Today\'s minimum: ' +  body.daily.data[0].temperatureLow + 
        ', Today\'s maximum: ' +  body.daily.data[0].temperatureHigh )
      }
  })
}

module.exports = forecast
