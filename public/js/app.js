console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const myLocationButton = document.querySelector('#button-my-location')

myLocationButton.addEventListener ('click', (e) => {
  if (!navigator.geolocation){
    return alert('Geolocation is not supported by your browser')
  }
  navigator.geolocation.getCurrentPosition ((position)=>{
  
    console.log (position)  
    msg1.textContent = 'Loading ...'
    msg2.textContent = ''
    fetch ('/weather-by-coordinates?longitude='+ position.coords.longitude + '&latitude='+ position.coords.latitude).then ( (response) =>{
      response.json().then( (data) => {
        if (data.error){
          msg1.textContent = data.error
          msg2.textContent = ''
        }
        else{
           msg1.textContent = 'longitude: ' + position.coords.longitude + ', latitude: ' + position.coords.latitude
           msg2.textContent = data.forecast
        }
      }) 
    })
  })
})


weatherForm.addEventListener ('submit', (e)=> {
  e.preventDefault()
  msg1.textContent = 'Loading ...'
  msg2.textContent = ''

  fetch ('/weather-by-text?address=' + search.value).then ((response) =>{
    response.json().then( (data) => {
      if (data.error){
        // console.log(data.error)

        msg1.textContent = data.error
        msg2.textContent = ''
      }
      else{
        // console.log(data.location)
        // console.log(data.forecast)
        msg1.textContent = data.location
        msg2.textContent = data.forecast

      }
    })
  } )
})
