const fetchData = (address) => {
    return new Promise((resolve, reject) => {
        fetch('/weather?address=' + address).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    reject(data.error);
                }
                
                resolve(data);
            })
        })
    })
}

// const fetchData = (address, callback) => {
    // fetch('/weather?address=' + address).then((response) => {
    //     response.json().then((data) => {
    //         if(data.error){
    //             return callback(data.error, undefined);
    //         }
            
    //         callback(undefined, data);
    //     })
    // })
// }


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    try{
        const {location, weather} = await fetchData(location)
        messageOne.textContent = location
        messageTwo.textContent = weather.weather_descriptions[0] + ". It is " + weather.temperature + " degrees, with " + weather.humidity + "% humidity. But it feels like " + weather.feelslike + " degrees"

    }catch(e){
        messageOne.textContent = e
    }
    
    // fetchData(location,(error, {location, weather} = {}) => {
    //     if(error){
    //         return messageOne.textContent = error
    //     }
    //     messageOne.textContent = location
    //     messageTwo.textContent = weather.weather_descriptions[0] + ". It is " + weather.temperature + " degrees, with " + weather.humidity + "% humidity. But it feels like " + weather.feelslike + " degrees"
    // })
})