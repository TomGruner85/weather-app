const request = require('postman-request')

const forecast = (lat, long) => {
    return new Promise((resolve, reject) => {
        const url = 'http://api.weatherstack.com/current?access_key=816c20584235121110997aae393e61cd&query='+ lat + ','+ long +'&units=f'

        request({url, json:true},(error, { body } = {} ) =>{
            if (error) {
                reject('Currently unable to reach weather service.')
            }
            else if(body.error){
                reject('Unable to find location.')
            }
            else{
                resolve({
                    temperature: body.current.temperature,
                    feelslike: body.current.feelslike,
                    humidity: body.current.humidity,
                    weather_descriptions: body.current.weather_descriptions
                })
            }
        })
    })
}

// const forecast = (lat, long, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=816c20584235121110997aae393e61cd&query='+ lat + ','+ long +'&units=f'

//     request({url, json:true},(error, { body }) =>{
//         if (error) {
//             callback('Currently unable to reach weather service.', undefined)
//         }
//         else if(body.error){
//             callback('Unable to find location.', undefined)
//         }
//         else{
//             callback(undefined,{
//                 temperature: body.current.temperature,
//                 feelslike: body.current.feelslike,
//                 humidity: body.current.humidity,
//                 weather_descriptions: body.current.weather_descriptions
//             })
//         }
//     })
// }

module.exports = forecast