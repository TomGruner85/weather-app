console.log('Client side javascript file is loaded')

const fetchData = (address, callback) => {
    fetch('http://127.0.0.1:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return callback(data.error, undefined);
            }
            
            callback(undefined, data);
        })
    })
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetchData(location,(error, {location, weather} = {}) => {
        if(error){
            return messageOne.textContent = error
        }
        messageOne.textContent = location
        messageTwo.textContent = weather.weather_descriptions[0] + ". It is " + weather.temperature + " degrees out. But it feels like " + weather.feelslike + " degrees"
    })
})